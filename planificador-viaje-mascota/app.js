/* ════════════════════════════════════════════════════════════════════
   Planificador de Viaje para Mascotas — Lógica vanilla JS
   Diseño y arquitectura: Carlos Eduardo Ravello Joo · carlosravello.com
   Aplicación de campo del Modelo de Coherencia Dinámica (MCD)
   ICD-Travel = Índice de Coherencia Dinámica aplicado a viaje zoosanitario
   ════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── Estado global ───
  let RULES = null;
  let CURRENT_RESULT = null;

  // ─── Constantes ───
  const WA_URGENT = '51922083707';   // Rojo
  const WA_DEFAULT = '51979620402';  // Verde/Ámbar
  const VERSION = '1.0.0';
  const PLANNER_URL = 'https://zoovettravel.com/planificador-viaje-mascota/';
  const ZOOVET_LOGO_URL = 'https://zoovettravel.com/images/zoovet-logo.png';

  // ─── Utils ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const fmtDate = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return '—';
    return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const fmtDateISO = (d) => d.toISOString().split('T')[0];
  const daysBetween = (a, b) => Math.round((b - a) / (1000 * 60 * 60 * 24));
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
  const subDays = (d, n) => addDays(d, -n);
  const today = () => { const t = new Date(); t.setHours(0,0,0,0); return t; };
  const slug = (s) => s.toLowerCase().replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i').replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  // ═════════════════════════════════════════════════════════════════
  // CARGA INICIAL
  // ═════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('./rules.json?v=1.1.1');
      RULES = await res.json();
      populateDestinos();
      setupForm();
      restoreFromURL();
    } catch (err) {
      console.error('No se pudo cargar rules.json:', err);
      $('#planner-form').innerHTML = '<p class="text-red-600 text-sm">Error: no se pudo cargar la base de reglas. Por favor recarga la página o contacta a Zoovet Travel.</p>';
    }
  });

  // ─── Poblar select de destinos (alfabético, con label legible) ───
  function populateDestinos() {
    const sel = $('#destino');
    const labels = {
      'Alemania': 'Alemania', 'Argentina': 'Argentina', 'Australia': 'Australia',
      'Brasil': 'Brasil', 'Canadá': 'Canadá', 'Chile': 'Chile', 'China': 'China',
      'Colombia': 'Colombia', 'Corea_del_Sur': 'Corea del Sur', 'EAU': 'Emiratos Árabes Unidos',
      'España': 'España', 'Estados_Unidos': 'Estados Unidos', 'Francia': 'Francia',
      'India': 'India', 'Italia': 'Italia', 'Japón': 'Japón', 'México': 'México',
      'Nueva_Zelanda': 'Nueva Zelanda', 'Reino_Unido': 'Reino Unido', 'Rusia': 'Rusia',
      'Singapur': 'Singapur', 'Sudáfrica': 'Sudáfrica'
    };
    const claves = Object.keys(RULES.destinos).sort((a, b) => labels[a].localeCompare(labels[b]));
    claves.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = labels[k] || k;
      sel.appendChild(opt);
    });
  }

  // ─── Setup form: condicional de fechas + submit ───
  function setupForm() {
    // microchip/vacuna/desparasitacion: habilitar fecha si "sí"
    ['microchip', 'vacuna', 'desparasitacion'].forEach(name => {
      $$(`input[name="${name}"]`).forEach(r => r.addEventListener('change', e => {
        const fechaInput = $(`#fecha_${name === 'desparasitacion' ? 'desparasitacion' : name}`);
        if (fechaInput) {
          fechaInput.disabled = e.target.value !== 'si';
          if (e.target.value !== 'si') fechaInput.value = '';
        }
      }));
    });

    // FAVN: mostrar/ocultar sección de detalle
    $$('input[name="favn"]').forEach(r => r.addEventListener('change', e => {
      const detail = document.getElementById('favn-detail');
      const fechaInput = document.getElementById('fecha_muestra_favn');
      if (e.target.value === 'si') {
        detail.style.display = '';
        fechaInput.disabled = false;
      } else {
        detail.style.display = 'none';
        fechaInput.disabled = true;
        fechaInput.value = '';
        $$('input[name="resultado_favn"]').forEach(rb => { rb.checked = false; });
      }
    }));

    // Submit
    $('#planner-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = collectFormData();
      if (!validateForm(data)) return;
      const result = computeSemaforo(data);
      CURRENT_RESULT = { data, result };
      renderResult(data, result);
      updateURL(data);
      window.scrollTo({ top: $('#result-section').offsetTop - 80, behavior: 'smooth' });
    });

    // Reset
    $('#planner-form').addEventListener('reset', () => {
      $('#result-section').classList.add('hidden');
      ['fecha_microchip', 'fecha_vacuna', 'fecha_desparasitacion', 'fecha_muestra_favn'].forEach(id => { $(`#${id}`).disabled = true; });
      const fd = document.getElementById('favn-detail'); if (fd) fd.style.display = 'none';
      history.replaceState(null, '', PLANNER_URL);
    });

    // Min date para fecha viaje = hoy
    $('#fecha_viaje').min = fmtDateISO(today());
  }

  // ─── Recolectar form ───
  function collectFormData() {
    const f = $('#planner-form');
    return {
      nombre: f.nombre_mascota.value.trim(),
      especie: f.especie.value,
      raza: f.raza.value.trim(),
      peso: parseFloat(f.peso.value),
      edad_meses: parseInt(f.edad_meses.value, 10),
      destino: f.destino.value,
      fecha_viaje: new Date(f.fecha_viaje.value + 'T12:00:00'),
      microchip: { tiene: f.microchip.value === 'si', fecha: f.microchip.value === 'si' && f.fecha_microchip.value ? new Date(f.fecha_microchip.value + 'T12:00:00') : null },
      vacuna: { tiene: f.vacuna.value === 'si', fecha: f.vacuna.value === 'si' && f.fecha_vacuna.value ? new Date(f.fecha_vacuna.value + 'T12:00:00') : null },
      desparasitacion: { tiene: f.desparasitacion.value === 'si', fecha: f.desparasitacion.value === 'si' && f.fecha_desparasitacion.value ? new Date(f.fecha_desparasitacion.value + 'T12:00:00') : null },
      favn: {
        tiene: f.favn ? f.favn.value === 'si' : false,
        fecha_muestra: (f.favn && f.favn.value === 'si' && f.fecha_muestra_favn && f.fecha_muestra_favn.value) ? new Date(f.fecha_muestra_favn.value + 'T12:00:00') : null,
        resultado: (f.favn && f.favn.value === 'si' && f.resultado_favn) ? (f.resultado_favn.value || null) : null
      }
    };
  }

  function validateForm(d) {
    if (!d.nombre || !d.especie || !d.raza || isNaN(d.peso) || isNaN(d.edad_meses) || !d.destino || isNaN(d.fecha_viaje.getTime())) {
      alert('Por favor completa todos los campos obligatorios.');
      return false;
    }
    if (d.fecha_viaje < today()) {
      alert('La fecha de viaje no puede ser anterior a hoy.');
      return false;
    }
    return true;
  }

  // ═════════════════════════════════════════════════════════════════
  // CÁLCULO DEL SEMÁFORO — ICD-Travel (MCD aplicado)
  // Tres ejes:
  //  E (Energía/Fisiológico): edad legal + microchip + vacuna en plazo
  //  C (Cognición/Información): documentos + cert salud + endoso SENASA factibles
  //  P (Propósito/Direccional): destino + fecha = factibilidad temporal global
  // Semáforo final = peor color de los tres (con override rojo absoluto si edad)
  // ═════════════════════════════════════════════════════════════════
  function computeSemaforo(d) {
    const dest = RULES.destinos[d.destino];
    const reglas = RULES.metadata.reglas_origen_peru;
    const diasAlViaje = daysBetween(today(), d.fecha_viaje);
    const edadSemanas = d.edad_meses * 4.345;
    const edadAlViaje = edadSemanas + (diasAlViaje / 7);

    // ── EJE E: Energía / Fisiológico ──
    const ejeE = { issues: [], status: 'ok' };

    // Edad legal (bloqueante absoluto)
    if (edadAlViaje < dest.edad_minima_semanas) {
      ejeE.status = 'fail';
      ejeE.issues.push({
        severity: 'red',
        msg: `Su mascota tendrá ${edadAlViaje.toFixed(1)} semanas el día del viaje. ${dest.codigo_iso} exige mínimo ${dest.edad_minima_semanas} semanas. Edad insuficiente: bloqueante biológico.`,
        topic: 'edad'
      });
    }

    // Microchip
    if (dest.microchip.es_bloqueante && !d.microchip.tiene) {
      // Si vacuna ya aplicada y destino exige orden microchip→vacuna
      if (d.vacuna.tiene && diasAlViaje < (reglas.vacuna_dias_antes_viaje_minimo + 14)) {
        ejeE.status = 'fail';
        ejeE.issues.push({
          severity: 'red',
          msg: `Microchip ausente y vacuna ya aplicada. ${dest.codigo_iso} exige microchip ANTES de la vacuna: hay que revacunar y no hay tiempo.`,
          topic: 'microchip-orden'
        });
      } else {
        ejeE.status = 'fail';
        ejeE.issues.push({
          severity: 'red',
          msg: `Microchip ausente. ${dest.codigo_iso} lo exige como bloqueante para TODAS las modalidades de ingreso. Sin chip no es posible entrar, ni por vía FAVN ni por cuarentena. Instalación inmediata requerida.`,
          topic: 'microchip'
        });
      }
    }

    // Vacuna antirrábica
    if (dest.vacuna_antirrabica.es_bloqueante) {
      if (!d.vacuna.tiene) {
        if (diasAlViaje < 21) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vacuna antirrábica no aplicada. Faltan ${diasAlViaje} días al viaje (mínimo 21 absoluto, recomendado 30).`, topic: 'vacuna' });
        } else if (diasAlViaje < 30) {
          ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
          ejeE.issues.push({ severity: 'yellow', msg: `Vacuna no aplicada y faltan ${diasAlViaje} días. Zona ámbar: queda a criterio del oficial.`, topic: 'vacuna-zona-ambar' });
        } else {
          ejeE.issues.push({ severity: 'info', msg: `Vacuna pendiente. Aplicar ANTES de ${fmtDate(subDays(d.fecha_viaje, 30))} para cumplir 30 días.`, topic: 'vacuna-pendiente' });
        }
      } else {
        const diasDesdeVacuna = daysBetween(d.vacuna.fecha, d.fecha_viaje);
        if (diasDesdeVacuna < 21) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vacuna aplicada hace muy pocos días respecto al viaje (${diasDesdeVacuna} días). SENASA exige 30 días mínimo.`, topic: 'vacuna-tarde' });
        } else if (diasDesdeVacuna < 30) {
          ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
          ejeE.issues.push({ severity: 'yellow', msg: `Vacuna aplicada hace ${diasDesdeVacuna} días. Zona gris (21-29): queda a criterio del oficial — en la práctica casi siempre es NO.`, topic: 'vacuna-gris' });
        }
        if (diasDesdeVacuna > (dest.vacuna_antirrabica.dias_vigencia_maxima || 365)) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vacuna vencida (${diasDesdeVacuna} días). Vigencia máxima: ${dest.vacuna_antirrabica.dias_vigencia_maxima} días.`, topic: 'vacuna-vencida' });
        }
      }
    }

    // ── EJE C: Cognición / Información ──
    const ejeC = { issues: [], status: 'ok' };

    // Australia — importación directa desde Perú no permitida
    if (dest.importacion_directa_desde_peru === false) {
      ejeC.status = 'fail';
      ejeC.issues.push({
        severity: 'red',
        msg: `Australia NO acepta importación directa desde Perú. Perú es país no aprobado por DAFF. Se requiere residencia previa ≥6 meses en un país Grupo 3 aprobado (EE.UU., UK, Alemania, etc.). Proceso total: mínimo 12 meses. Consulta con Zoovet Travel para evaluar rutas alternativas.`,
        topic: 'australia-no-directo'
      });
    }

    // Aeropuertos válidos (EE.UU., Japón, Nueva Zelanda)
    if (dest.aeropuertos_validos && dest.aeropuertos_validos.length > 0) {
      ejeC.issues.push({
        severity: 'info',
        msg: `${dest.codigo_iso} solo acepta mascotas por estos aeropuertos: ${dest.aeropuertos_validos.join(', ')}. Verifica tu vuelo antes de comprar boletos.`,
        topic: 'aeropuerto'
      });
    }

    // FAVN/Titer — con diferenciación por especie
    const favcBloqueante = (() => {
      if (!dest.titer_test) return false;
      if (d.especie === 'perro' && dest.titer_test.es_bloqueante_perro !== undefined) return dest.titer_test.es_bloqueante_perro;
      if (d.especie === 'gato' && dest.titer_test.es_bloqueante_gato !== undefined) return dest.titer_test.es_bloqueante_gato;
      return dest.titer_test.es_bloqueante;
    })();
    if (dest.titer_test && favcBloqueante) {
      const diasEsperaFAVN = dest.titer_test.dias_antes_viaje_minimo ?? reglas.favn_dias_espera_general;
      const especieLabel = d.especie === 'perro' ? 'Para perros' : d.especie === 'gato' ? 'Para gatos' : '';

      if (d.favn && d.favn.tiene) {
        // Usuario declara tener FAVN — evaluar resultado y orden
        if (d.favn.resultado === 'fallido') {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: 'FAVN/RNATT fallido (resultado < 0.5 IU/mL). Se requiere revacunación y nueva toma de muestra. Contactar Zoovet Travel para nuevo protocolo.', topic: 'favn-fallido' });
        } else if (!d.microchip.tiene) {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: 'FAVN declarado pero sin microchip registrado. La CDC exige que el chip esté implantado ANTES de la toma de muestra. Sin chip el test es inválido.', topic: 'favn-sin-chip' });
        } else if (d.favn.fecha_muestra && d.microchip.fecha && d.favn.fecha_muestra < d.microchip.fecha) {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: `La toma de muestra FAVN (${fmtDate(d.favn.fecha_muestra)}) es anterior al microchip (${fmtDate(d.microchip.fecha)}). El test no es válido sin chip previo.`, topic: 'favn-orden-chip' });
        } else {
          const renovadaDespues = d.vacuna.fecha && d.favn.fecha_muestra && d.vacuna.fecha > d.favn.fecha_muestra;
          const infoMsg = renovadaDespues
            ? `FAVN/RNATT aprobado (≥0.5 IU/mL). Vacunación renovada el ${fmtDate(d.vacuna.fecha)}, posterior a la toma de muestra. Válido mientras la vacuna esté vigente.`
            : `FAVN/RNATT aprobado (≥0.5 IU/mL)${d.favn.fecha_muestra ? '. Toma de muestra: ' + fmtDate(d.favn.fecha_muestra) : ''}.`;
          ejeC.issues.push({ severity: 'info', msg: infoMsg, topic: 'favn-ok' });
        }
      } else {
        // FAVN no declarado — lógica temporal
        if (diasAlViaje < diasEsperaFAVN) {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: `${dest.codigo_iso} exige FAVN/RNATT con espera de ${diasEsperaFAVN} días desde la toma de muestra. Faltan solo ${diasAlViaje} días al viaje. Bloqueante temporal.`, topic: 'favn' });
        } else if (diasAlViaje < (diasEsperaFAVN + 30)) {
          ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
          ejeC.issues.push({ severity: 'yellow', msg: `Plazo justo para FAVN${especieLabel ? ' (' + especieLabel + ')' : ''}. Tomar muestra HOY mismo (${fmtDate(today())}) — debe ir al laboratorio, regresar el resultado y endosarse.`, topic: 'favn-justo' });
        } else {
          ejeC.issues.push({ severity: 'info', msg: `FAVN/RNATT requerido${especieLabel ? ' — ' + especieLabel : ''}. Programar toma de muestra antes del ${fmtDate(subDays(d.fecha_viaje, diasEsperaFAVN))}. Laboratorio aprobado: KSVDL (Kansas State).`, topic: 'favn-pendiente' });
        }
      }
    }

    // Permiso de importación
    if (dest.permiso_importacion && dest.permiso_importacion.es_bloqueante) {
      const diasNecesarios = dest.permiso_importacion.dias_antes_viaje_minimo || 30;
      if (diasAlViaje < diasNecesarios) {
        ejeC.status = 'fail';
        ejeC.issues.push({
          severity: 'red',
          msg: `${dest.codigo_iso} exige Permiso de Importación oficial (${dest.permiso_importacion.producto_especifico || ''}). Tiempo insuficiente para tramitar (${diasNecesarios} días requeridos).`,
          topic: 'permiso'
        });
      }
    }

    // Cuarentena obligatoria
    if (dest.cuarentena && dest.cuarentena.es_bloqueante) {
      ejeC.issues.push({
        severity: 'info',
        msg: `${dest.codigo_iso} exige cuarentena post-arrival: ${dest.cuarentena.producto_especifico || 'plazo variable'}. Reservar facility con anticipación.`,
        topic: 'cuarentena'
      });
    }

    // Desparasitación
    if (dest.desparasitacion && dest.desparasitacion.es_bloqueante) {
      const diasReq = dest.desparasitacion.dias_antes_viaje_minimo || 0;
      if (!d.desparasitacion.tiene && diasAlViaje < diasReq) {
        ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
        ejeC.issues.push({ severity: 'yellow', msg: `Desparasitación pendiente y plazo justo (${dest.desparasitacion.producto_especifico || 'estándar'}).`, topic: 'desparasitacion' });
      }
    }

    // ── EJE P: Propósito / Direccional ──
    const ejeP = { issues: [], status: 'ok' };

    if (diasAlViaje < 30) {
      ejeP.status = 'warn';
      ejeP.issues.push({ severity: 'yellow', msg: `Solo ${diasAlViaje} días al viaje. Cualquier contratiempo será irrecuperable.`, topic: 'tiempo' });
    }
    if (diasAlViaje < 7) {
      ejeP.status = 'fail';
      ejeP.issues.push({ severity: 'red', msg: `Solo ${diasAlViaje} días al viaje. Imposible completar trámites SENASA + endoso.`, topic: 'tiempo-critico' });
    }

    // ── Color final del semáforo ──
    const status = [ejeE.status, ejeC.status, ejeP.status];
    let color;
    if (status.includes('fail')) color = 'red';
    else if (status.includes('warn')) color = 'yellow';
    else color = 'green';

    return {
      color,
      diasAlViaje,
      edadAlViaje: edadAlViaje.toFixed(1),
      ejes: { E: ejeE, C: ejeC, P: ejeP },
      destino: d.destino,
      destinoData: dest,
      timeline: generarTimeline(d, dest, reglas),
      icdScore: computeICDScore(ejeE, ejeC, ejeP)
    };
  }

  function computeICDScore(E, C, P) {
    const scoreOf = (eje) => eje.status === 'ok' ? 100 : eje.status === 'warn' ? 50 : 0;
    const e = scoreOf(E), c = scoreOf(C), p = scoreOf(P);
    return { E: e, C: c, P: p, total: Math.round((e + c + p) / 3) };
  }

  // ═════════════════════════════════════════════════════════════════
  // TIMELINE INVERSO
  // ═════════════════════════════════════════════════════════════════
  function generarTimeline(d, dest, reglas) {
    const fv = d.fecha_viaje;
    const tasks = [];

    tasks.push({ date: fv, task: `✈ Viaje a ${d.destino.replace(/_/g, ' ')}`, org: 'Aeropuerto', status: 'final' });
    tasks.push({ date: subDays(fv, 1), task: 'Endoso del CZE en SENASA Perú', org: 'SENASA Perú', status: 'pendiente' });
    tasks.push({ date: subDays(fv, reglas.certificado_salud_dias_vigencia), task: `Emisión del Certificado de Salud (vence en ${reglas.certificado_salud_dias_vigencia} días)`, org: 'Médico Veterinario Colegiado', status: 'pendiente' });

    if (dest.desparasitacion && dest.desparasitacion.es_bloqueante && dest.desparasitacion.dias_antes_viaje_minimo) {
      tasks.push({ date: subDays(fv, dest.desparasitacion.dias_antes_viaje_minimo), task: `Desparasitación obligatoria (${dest.desparasitacion.producto_especifico || 'estándar'})`, org: 'Médico Veterinario', status: 'pendiente' });
    }

    const favcBloqueanteTimeline = (() => {
      if (!dest.titer_test) return false;
      if (d.especie === 'perro' && dest.titer_test.es_bloqueante_perro !== undefined) return dest.titer_test.es_bloqueante_perro;
      if (d.especie === 'gato' && dest.titer_test.es_bloqueante_gato !== undefined) return dest.titer_test.es_bloqueante_gato;
      return dest.titer_test.es_bloqueante;
    })();
    if (dest.titer_test && favcBloqueanteTimeline) {
      const diasEspera = dest.titer_test.dias_antes_viaje_minimo ?? 0;
      tasks.push({ date: subDays(fv, diasEspera), task: `FAVN/RNATT — toma de muestra (debe esperar ${diasEspera} días)`, org: 'Zoovet Travel + KSVDL', status: 'pendiente' });
    }

    tasks.push({ date: subDays(fv, reglas.vacuna_dias_antes_viaje_minimo), task: 'Vacuna antirrábica (mínimo 30 días antes del viaje)', org: 'Médico Veterinario', status: 'pendiente' });

    if (dest.microchip.es_bloqueante) {
      tasks.push({ date: subDays(fv, reglas.vacuna_dias_antes_viaje_minimo + 1), task: 'Instalación de microchip ISO (antes de la vacuna)', org: 'Médico Veterinario', status: 'pendiente' });
    }

    if (dest.permiso_importacion && dest.permiso_importacion.es_bloqueante) {
      tasks.push({ date: subDays(fv, dest.permiso_importacion.dias_antes_viaje_minimo), task: `Solicitar Permiso de Importación (${dest.permiso_importacion.producto_especifico || ''})`, org: dest.fuente_oficial.nombre, status: 'pendiente' });
    }

    return tasks.sort((a, b) => a.date - b.date);
  }

  // ═════════════════════════════════════════════════════════════════
  // RENDER RESULT
  // ═════════════════════════════════════════════════════════════════
  function renderResult(d, r) {
    const c = $('#semaforo-container');
    c.className = `border-2 p-6 sm:p-8 shadow-md ${r.color}-result bg-white`;

    // Actualizar botón flotante WhatsApp según semáforo
    const floatBtn = document.getElementById('whatsapp-float');
    if (floatBtn) {
      floatBtn.href = r.color === 'red'
        ? `https://wa.me/${WA_URGENT}`
        : `https://wa.me/${WA_DEFAULT}`;
      floatBtn.setAttribute('aria-label',
        r.color === 'red' ? 'WhatsApp emergencias Zoovet Travel' : 'WhatsApp consultas Zoovet Travel');
    }

    const colorMap = { green: 'verde', yellow: 'ámbar', red: 'rojo' };
    const colorLabel = colorMap[r.color];
    const destinoLabel = $('#destino').options[$('#destino').selectedIndex].text;

    let html = `
      <div class="text-center mb-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-[#1a2e35]/60 mb-2">Resultado para ${d.nombre} → ${destinoLabel}</p>
        <h3 class="text-2xl sm:text-3xl font-bold text-[#1a2e35] mb-4">Viaje en ${r.diasAlViaje} días — Fecha: ${fmtDate(d.fecha_viaje)}</h3>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
        <div class="text-center">
          <div class="semaforo-light red ${r.color === 'red' ? 'active' : ''}">!</div>
          <p class="text-xs mt-2 ${r.color === 'red' ? 'font-bold text-red-700' : 'text-[#1a2e35]/40'}">ROJO</p>
        </div>
        <div class="text-center">
          <div class="semaforo-light yellow ${r.color === 'yellow' ? 'active' : ''}">⚠</div>
          <p class="text-xs mt-2 ${r.color === 'yellow' ? 'font-bold text-yellow-700' : 'text-[#1a2e35]/40'}">ÁMBAR</p>
        </div>
        <div class="text-center">
          <div class="semaforo-light green ${r.color === 'green' ? 'active' : ''}">✓</div>
          <p class="text-xs mt-2 ${r.color === 'green' ? 'font-bold text-green-700' : 'text-[#1a2e35]/40'}">VERDE</p>
        </div>
      </div>

      <div class="text-center mb-6">
        <p class="icd-score" style="color: ${r.color === 'red' ? '#dc2626' : r.color === 'yellow' ? '#f59e0b' : '#10b981'}">${r.icdScore.total}<span class="text-lg text-[#1a2e35]/40 font-normal">/100</span></p>
        <p class="text-xs uppercase tracking-widest text-[#1a2e35]/50 mt-1">Índice de Coherencia Dinámica · ICD-Travel · Semáforo ${colorLabel.toUpperCase()}</p>
      </div>

      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="icd-eje">
          <div class="icd-eje-label">Eje E · Fisiológico</div>
          <div class="icd-eje-value">${r.icdScore.E}</div>
          <div class="icd-eje-status ${r.ejes.E.status === 'ok' ? 'ok' : r.ejes.E.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.E.status === 'ok' ? 'OK' : r.ejes.E.status === 'warn' ? 'ATENCIÓN' : 'FALLA'}</div>
        </div>
        <div class="icd-eje">
          <div class="icd-eje-label">Eje C · Información</div>
          <div class="icd-eje-value">${r.icdScore.C}</div>
          <div class="icd-eje-status ${r.ejes.C.status === 'ok' ? 'ok' : r.ejes.C.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.C.status === 'ok' ? 'OK' : r.ejes.C.status === 'warn' ? 'ATENCIÓN' : 'FALLA'}</div>
        </div>
        <div class="icd-eje">
          <div class="icd-eje-label">Eje P · Direccional</div>
          <div class="icd-eje-value">${r.icdScore.P}</div>
          <div class="icd-eje-status ${r.ejes.P.status === 'ok' ? 'ok' : r.ejes.P.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.P.status === 'ok' ? 'OK' : r.ejes.P.status === 'warn' ? 'ATENCIÓN' : 'FALLA'}</div>
        </div>
      </div>
    `;

    // Issues por eje
    const allIssues = [...r.ejes.E.issues, ...r.ejes.C.issues, ...r.ejes.P.issues];
    if (allIssues.length) {
      html += `<div class="bg-[#F8FAFC] border border-[#1a2e35]/10 p-4 mb-6"><p class="text-xs font-bold uppercase tracking-widest text-[#1a2e35]/60 mb-3">Diagnóstico</p><ul class="space-y-2">`;
      allIssues.forEach(i => {
        const icon = i.severity === 'red' ? '🔴' : i.severity === 'yellow' ? '🟡' : 'ℹ️';
        html += `<li class="text-sm text-[#1a2e35]/85 flex gap-2"><span>${icon}</span><span>${i.msg}</span></li>`;
      });
      html += '</ul></div>';
    }

    // Banner nota adicional (ej. ACF reservation EE.UU.)
    if (r.destinoData.nota_adicional) {
      const na = r.destinoData.nota_adicional;
      html += `
        <div class="border-l-4 border-[#0C789E] bg-[#dceef5] p-5 mb-6 flex gap-4 items-start">
          <span class="text-2xl leading-none mt-0.5">📋</span>
          <div>
            <p class="text-sm font-bold text-[#0C789E] uppercase tracking-wider mb-1">${na.titulo}</p>
            <p class="text-sm text-[#1a2e35]/85 leading-relaxed">${na.texto}</p>
          </div>
        </div>
      `;
    }

    // CTA según color
    if (r.color === 'red') {
      html += `
        <div class="urgent-cta">
          <h3>⚠ Acción urgente requerida</h3>
          <p class="mb-4 text-sm">El timeline de ${d.nombre} hacia ${destinoLabel} tiene bloqueantes que NO se pueden resolver con improvisación. Llámenos AHORA para evaluar opciones reales: postergar fecha, cambiar destino o ajustar plan.</p>
          <a href="https://wa.me/${WA_URGENT}?text=${encodeURIComponent(`Hola Zoovet Travel, necesito ayuda urgente. Mi mascota ${d.nombre} (${d.especie}) tiene previsto viajar a ${destinoLabel} el ${fmtDate(d.fecha_viaje)} y el planificador me dio luz roja.`)}" target="_blank" rel="noopener noreferrer" class="btn">Llamar al +51 922 083 707</a>
          <a href="https://wa.me/${WA_URGENT}?text=${encodeURIComponent(`Quiero conversar con un especialista de Zoovet Travel sobre el caso de ${d.nombre} → ${destinoLabel}.`)}" target="_blank" rel="noopener noreferrer" class="btn">WhatsApp directo</a>
          <p class="text-xs mt-3 opacity-90">Equipo médico veterinario disponible L-S 09:00-19:00</p>
        </div>
      `;
    } else {
      // Verde o ámbar: timeline + acciones
      html += `<h4 class="text-lg font-bold text-[#1a2e35] mt-6 mb-3">Timeline inverso</h4>`;
      html += `<div class="bg-white border border-[#1a2e35]/10 p-4">`;
      r.timeline.forEach(t => {
        html += `<div class="timeline-row">
          <div class="date">${fmtDate(t.date)}</div>
          <div>
            <div class="task">${t.task}</div>
            <div class="org">${t.org}</div>
          </div>
        </div>`;
      });
      html += `</div>`;

      html += `
        <div class="mt-6 flex flex-wrap gap-3 justify-center">
          <button id="btn-pdf" class="bg-[#0C789E] text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#0a6a8a] transition-colors">📄 Descargar plan en PDF</button>
          <a href="https://wa.me/${WA_DEFAULT}?text=${encodeURIComponent(`Hola Zoovet Travel, quiero coordinar el viaje de ${d.nombre} a ${destinoLabel} (${fmtDate(d.fecha_viaje)}).`)}" target="_blank" rel="noopener noreferrer" class="bg-[#25D366] text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#22b85b] transition-colors">💬 Coordinar por WhatsApp</a>
          <button id="btn-share" class="border border-[#0C789E] text-[#0C789E] font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#0C789E] hover:text-white transition-colors">🔗 Copiar URL del plan</button>
        </div>
      `;
    }

    // Disclaimer compacto
    html += `<p class="text-xs text-[#1a2e35]/50 text-center mt-6 leading-relaxed">Resultado generado por el Planificador v${VERSION} · ${fmtDate(today())}. Información orientativa. Validar con autoridad oficial antes de viajar.</p>`;

    c.innerHTML = html;
    $('#result-section').classList.remove('hidden');

    // Listeners post-render
    $('#btn-pdf')?.addEventListener('click', () => generarPDF(d, r));
    $('#btn-share')?.addEventListener('click', sharePlan);
  }

  // ═════════════════════════════════════════════════════════════════
  // PDF (pdfmake)
  // ═════════════════════════════════════════════════════════════════
  function generarPDF(d, r) {
    const destinoLabel = $('#destino').options[$('#destino').selectedIndex].text;

    const sem = {
      green:  { bg: '#E8F5E9', fg: '#1E4620', title: 'AUTORIZADO PARA MANIFIESTO (VERDE)',    sub: 'TODOS LOS REQUISITOS ZOOSANITARIOS CUMPLIDOS' },
      yellow: { bg: '#FEFCBF', fg: '#B7791F', title: 'ZONA GRIS — CRITERIO DEL OFICIAL',      sub: 'ÁMBAR · REVISIÓN REQUERIDA'                   },
      red:    { bg: '#FFF5F5', fg: '#63171D', title: 'NO VIABLE — ACCIÓN URGENTE',             sub: 'ROJO · BLOQUEADORES CRÍTICOS'                 }
    };
    const col = sem[r.color];

    const fmtU = (dt) => {
      if (!dt || isNaN(dt)) return '—';
      return dt.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    };

    const refYear = new Date().getFullYear();
    const refId   = `ZVT-BC-${refYear}-${Math.random().toString(36).substr(2,4).toUpperCase()}`;

    const pageHeader = {
      margin: [0, 0, 0, 0],
      table: {
        widths: ['auto', '*', 'auto'],
        body: [[
          {
            stack: [
              { text: 'ZOOVET TRAVEL', fontSize: 22, bold: true, color: '#FFFFFF' },
              { text: 'BorderCheck · Sistema de Autorización Internacional para Mascotas', fontSize: 8, bold: true, color: '#A99260', margin: [0, 2, 0, 0] },
              { text: 'MANIFIESTO INTERNACIONAL DE AUTORIZACIÓN PARA MASCOTAS', fontSize: 6.5, color: '#D1D5DB', margin: [0, 3, 0, 0] }
            ],
            margin: [24, 12, 0, 12],
            border: [false, false, false, false]
          },
          { text: '', border: [false, false, false, false] },
          {
            stack: [
              { text: `REF: ${refId}`,            fontSize: 7, color: '#FFFFFF' },
              { text: `FECHA: ${fmtU(today())}`,  fontSize: 7, color: '#FFFFFF' },
              { text: 'ESTADO: MANIFIESTO OFICIAL', fontSize: 7, color: '#FFFFFF' },
              { text: `DESTINO: ${destinoLabel.toUpperCase()}`, fontSize: 7, color: '#FFFFFF' }
            ],
            alignment: 'right',
            margin: [0, 12, 24, 12],
            border: [false, false, false, false]
          }
        ]]
      },
      layout: {
        fillColor:     () => '#0F1E36',
        hLineWidth:    () => 0,
        vLineWidth:    () => 0,
        paddingTop:    () => 0,
        paddingBottom: () => 0,
        paddingLeft:   () => 0,
        paddingRight:  () => 0
      }
    };

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [24, 84, 24, 44],
      info: {
        title:   `BorderCheck · ${d.nombre} → ${destinoLabel}`,
        author:  'Zoovet Travel',
        subject: 'Manifiesto Internacional de Autorización para Mascotas',
        creator: 'BorderCheck by Zoovet Travel'
      },
      header: () => pageHeader,
      footer: (pg, total) => ({
        margin: [24, 6, 24, 0],
        stack: [
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 547, y2: 0, lineWidth: 1, lineColor: '#A99260' }] },
          { margin: [0, 3, 0, 0], columns: [
            { text: 'Solo guía orientativa. Confirme con aerolinea y autoridad veterinaria del destino. zoovettravel.com', fontSize: 6, color: '#64748B' },
            { text: `ZVT-BC-${refYear} // PÁGINA ${pg} DE ${total}`, fontSize: 7, bold: true, color: '#111827', alignment: 'center' },
            { text: 'zoovettravel.com | +51 922 083 707', fontSize: 7, bold: true, color: '#111827', alignment: 'right' }
          ]}
        ]
      }),
      content: buildPDFContent(d, r, destinoLabel, col, fmtU),
      defaultStyle: { font: 'Roboto', fontSize: 9, color: '#111827' }
    };

    pdfMake.createPdf(docDefinition).download(`BorderCheck-${slug(d.nombre)}-${slug(destinoLabel)}.pdf`);
  }

  function buildPDFContent(d, r, destinoLabel, col, fmtU) {
    const dest    = r.destinoData;
    const content = [];

    const vacClear = d.vacuna.tiene && !r.ejes.E.issues.some(i =>
      ['vacuna', 'vacuna-tarde', 'vacuna-vencida'].includes(i.topic) && i.severity === 'red'
    );
    const favsRequired = !!(dest.titer_test && (
      dest.titer_test.es_bloqueante ||
      dest.titer_test.es_bloqueante_perro ||
      dest.titer_test.es_bloqueante_gato
    ));
    const favsBlocked = r.ejes.C.issues.some(i =>
      ['favn', 'favn-fallido', 'favn-orden-chip'].includes(i.topic) && i.severity === 'red'
    );
    const favsDeclaredOk = !!(d.favn && d.favn.tiene && d.favn.resultado === 'aprobado' && !favsBlocked);

    const secTitle = (txt, mt) => ({ text: txt, fontSize: 10, bold: true, color: '#A99260', margin: [0, mt !== undefined ? mt : 14, 0, 5] });
    const lbl      = (txt)     => ({ text: txt, fontSize: 7, bold: true, color: '#A99260' });
    const val      = (txt)     => ({ text: txt, fontSize: 10, bold: true, color: '#111827', margin: [0, 2, 0, 0] });

    // 1 · STATUS
    content.push({
      table: {
        widths: ['*', 'auto'],
        body: [[
          { text: `ESTADO: ${col.title}`, fontSize: 13, bold: true, color: col.fg, margin: [10, 12, 0, 12] },
          { text: col.sub, fontSize: 7, bold: true, color: col.fg, alignment: 'right', margin: [0, 14, 10, 12] }
        ]]
      },
      layout: {
        fillColor:  () => col.bg,
        hLineWidth: () => 0.5,
        vLineWidth: (i) => i === 0 ? 4 : 0,
        hLineColor: () => '#E2E8F0',
        vLineColor: (i) => i === 0 ? col.fg : 'transparent'
      },
      margin: [0, 0, 0, 10]
    });

    // 2 · Disclaimer
    content.push({
      table: {
        widths: ['*'],
        body: [[{
          text: 'Este documento es una guía orientativa. Los requisitos pueden cambiar sin previo aviso — confirme siempre con su aerolínea y la autoridad veterinaria oficial del país destino.',
          fontSize: 8, color: '#64748B', margin: [10, 8, 10, 8]
        }]]
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: (i) => i === 0 ? 2 : 0,
        vLineColor: () => '#A99260'
      },
      margin: [0, 0, 0, 10]
    });

    // 3 · DATOS DEL PASAJERO
    content.push(secTitle('DATOS DEL PASAJERO'));
    content.push({
      table: {
        widths: ['*', '*', '*'],
        body: [
          [lbl('NOMBRE / ESPECIE / RAZA'), lbl('EDAD / PESO'), lbl('MICROCHIP ISO (15 DÍGITOS)')],
          [val(`${d.nombre.toUpperCase()} / ${d.especie.toUpperCase()} / ${d.raza.toUpperCase()}`),
           val(`${d.edad_meses} MESES / ${d.peso} KG`),
           val(d.microchip.tiene ? '✓ IMPLANTADO' : 'NO REGISTRADO')]
        ]
      },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 4 · RUTA Y DESTINO
    content.push(secTitle('RUTA Y DESTINO'));
    content.push({
      table: {
        widths: ['*', '*', '*'],
        body: [
          [lbl('ORIGEN (PUERTO DE SALIDA)'), lbl('DESTINO (PUERTO DE ENTRADA)'), lbl('FECHA DE VUELO PREVISTA')],
          [val('PERÚ (LIM)'), val(destinoLabel.toUpperCase()), val(fmtU(d.fecha_viaje))]
        ]
      },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 5 · CRONOGRAMA DE CUMPLIMIENTO
    content.push(secTitle('CRONOGRAMA DE CUMPLIMIENTO'));

    const statusCell = (ok) => ({ text: ok ? 'AUTORIZADO' : 'PENDIENTE', fontSize: 8, bold: true, color: ok ? '#1E4620' : '#B7791F' });

    const compRows = [[
      { text: 'REQUISITO',        fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'ESTADO',           fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'ACCIÓN / DETALLE', fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'FECHA',            fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] }
    ]];

    let ri = 0;
    const addRow = (req, ok, action, date) => {
      const bg = ri++ % 2 === 0 ? '#FFFFFF' : '#F8F9FA';
      compRows.push([
        { text: req,    fontSize: 8, bold: true, fillColor: bg, margin: [4,6,4,6] },
        { ...statusCell(ok),          fillColor: bg, margin: [4,6,4,6] },
        { text: action, fontSize: 7,  fillColor: bg, margin: [4,6,4,6] },
        { text: date,   fontSize: 8,  fillColor: bg, margin: [4,6,4,6] }
      ]);
    };

    if (dest.microchip && dest.microchip.es_bloqueante) {
      addRow('IMPLANTACIÓN DE MICROCHIP', d.microchip.tiene,
        d.microchip.tiene ? 'PREVIO A VACUNACIÓN' : 'IMPLANTACIÓN REQUERIDA',
        d.microchip.fecha ? fmtU(d.microchip.fecha) : '—');
    }
    addRow('VACUNA ANTIRRÁBICA', vacClear,
      vacClear ? 'VIGENTE >30D, <1A' : d.vacuna.tiene ? 'VERIFICAR VALIDEZ' : 'APLICACIÓN REQUERIDA',
      d.vacuna.fecha ? fmtU(d.vacuna.fecha) : '—');
    if (favsRequired) {
      const favStatusMsg = favsDeclaredOk ? 'TÍTULO: ≥0.5 IU/ML' : (favsBlocked ? 'MUESTRA REQUERIDA URGENTE' : 'PENDIENTE — NO DECLARADO');
      addRow('TEST FAVN RNATT TITULACIÓN', favsDeclaredOk, favStatusMsg, d.favn && d.favn.fecha_muestra ? fmtU(d.favn.fecha_muestra) : '—');
      if (dest.titer_test.dias_antes_viaje_minimo >= 90) {
        addRow(`PERIODO DE ESPERA ${dest.titer_test.dias_antes_viaje_minimo} DÍAS UE`,
          r.diasAlViaje > dest.titer_test.dias_antes_viaje_minimo,
          'MÍNIMO TRANSCURRIDO POST-TÍTULO', '—');
      }
    }
    addRow('CERTIFICADO OFICIAL DE SALUD', false,
      'CONSULTA VET / EMISIÓN D-5', fmtU(subDays(d.fecha_viaje, 5)));
    addRow('ENDOSO DE EXPORTACIÓN SENASA', false,
      'CITA CON SELLO GUBERNAMENTAL', fmtU(subDays(d.fecha_viaje, 2)));

    content.push({
      table: { widths: ['33%', '15%', '32%', '20%'], body: compRows },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 6 · PRÓXIMOS PASOS OBLIGATORIOS
    content.push(secTitle('PRÓXIMOS PASOS OBLIGATORIOS'));
    content.push({
      table: {
        widths: ['*', 96],
        body: [[
          {
            stack: [
              { text: '1. CERTIFICADO OFICIAL DE SALUD', fontSize: 8, bold: true, margin: [0, 0, 0, 3] },
              { text: `DEBE SER EMITIDO POR UN VETERINARIO REGISTRADO NO ANTES DEL ${fmtU(subDays(d.fecha_viaje, 5))} (D-5).`, fontSize: 7, margin: [0, 0, 0, 8] },
              { text: '2. ENDOSO CZE DE SENASA', fontSize: 8, bold: true, margin: [0, 0, 0, 3] },
              { text: `SOLICITAR CITA EN SENASA PERÚ ENTRE EL ${fmtU(subDays(d.fecha_viaje, 2))} Y EL ${fmtU(subDays(d.fecha_viaje, 1))}.`, fontSize: 7 }
            ],
            margin: [10, 10, 8, 10]
          },
          {
            stack: [
              { text: '¿ALGUNA PREGUNTA?',                        fontSize: 8, bold: true, color: '#111827', alignment: 'center' },
              { text: 'ESCÍBE NOS 24H · CUALQUIER IDIOMA', fontSize: 7, bold: true, color: '#111827', alignment: 'center', margin: [0, 2, 0, 4] },
              { image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAIAAADb+IFwAAACeElEQVR4nO3dwVHEMAxGYZahADqgDPo/bhl0QAfh6osGaaQXe+B9R8hms/9oxOLYzuO6rhcxXndfwF9muCDDBRkuyHBBhgsyXNBb9Iv3j8/xN/v+ev76XtExkepr7/xcVi7IcEGGCwp77qraB1fVHhf10Og81WMyP8/IfC4rF2S4IMMFpXruKtNrOt83ox5a7Y+d78tT57RyQYYLMlxQuefSMr0v6sVT/XqKlQsyXJDhgo7ruZ3xhKj/7mLlggwXZLigcs+9s5fR47nVY6qsXJDhggwXlOq5xL3+VXVMIHN8dYyCYOWCDBdkuKDHrjURnfkJ1XPuYuWCDBdkuKCw53a+P0am5ucS88kynLdwEMMFGS4o1XMz6LUMxHmmen3EygUZLshwQeWxheo81upYQWeeLPE9t/NZrFyQ4YIMFzR2D6261ou+f1V9r+rcBtehbWa4IMMFIeO59PHV1955/SsrF2S4IMMFlcdz6fkAmTHTqWvL/F3prG2zckGGCzJcUGuPG2IOwGljwZFM/7VyQYYLMlxQa4+bzv/1xB5g9P44jucexHBBhgsaW/tbnXs7te8tvWduZz8HKxdkuCDDBR29Dm1qjS/d0yNWLshwQYYL2vaciM7/+537bJ39HDLXtrJyQYYLMlzQtudEdPbAnZpbFpla92zlggwXZLigbc+JyJyzM0acOX9k6l6clQsyXJDhgo7bs3w19fyeqTkVrv09iOGCDBd0RM+t3isjxhOI9WxWLshwQYYL2vaciM55Or2YmPMQsXJBhgsyXNDYXo4Zu/Ymv/M5FysrF2S4IMMFbZuf+x9YuSDDBRkuyHBBhgsyXJDhgn4Aj8SgKqWneXAAAAAASUVORK5CYII=', width: 50, height: 50, alignment: 'center' },
              { text: 'WA: +51 922 083 707', fontSize: 7, bold: true, color: '#111827', alignment: 'center', margin: [0, 4, 0, 0] }
            ],
            margin: [4, 8, 10, 8]
          }
        ]]
      },
      layout: {
        hLineWidth: () => 0.5,
        vLineWidth: (i) => i === 0 ? 4 : 0.5,
        hLineColor: () => '#E2E8F0',
        vLineColor: (i) => i === 0 ? '#A99260' : '#E2E8F0'
      }
    });

    // PÁGINA 2
    content.push({ text: '', pageBreak: 'before' });

    // 7 · CHECKLIST DÍA DE VIAJE
    content.push(secTitle('CHECKLIST DÍA DE VIAJE', 0));
    content.push({
      table: {
        widths: ['33.3%', '33.3%', '33.4%'],
        body: [[
          {
            stack: [
              { text: 'DOCUMENTOS (ORIGINALES + COPIAS)', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '■  Certificado oficial de salud / exportación', fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Cartilla de vacunación completa',            fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Certificado de implantación de microchip',   fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Resultados test de titulación FAVN',         fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Pasaporte o permiso de exportación',         fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '       (según exigencia del destino)',               fontSize: 6.5, color: '#64748B' }
            ],
            margin: [8, 8, 8, 8]
          },
          {
            stack: [
              { text: 'TRANSPORTADOR — NORMATIVA IATA', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '■  Jaula IATA con ventilación adecuada',         fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Lecho absorbente dentro de la jaula',             fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Dispensador de agua antivuelco',                  fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Ayuno 4–6 horas antes de la salida',         fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Sin objetos sueltos dentro de la jaula',          fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Jaula etiquetada con datos del dueño',       fontSize: 6.5, margin: [0, 2, 0, 0] }
            ],
            margin: [8, 8, 8, 8]
          },
          {
            stack: [
              { text: 'CONSEJOS', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '→  Llegar al aeropuerto 4–5 h antes',           fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  Confirmar política de animales vivos 48h',    fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  Verificar clima en destino',                      fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  Visitar al veterinario 24–48h antes',        fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  No sedar sin aprobación veterinaria',        fontSize: 6.5, margin: [0, 2, 0, 0] }
            ],
            margin: [8, 8, 8, 8]
          }
        ]]
      },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 14]
    });

    // 8 · CRONOGRAMA VISUAL
    content.push(secTitle('CRONOGRAMA DE CUMPLIMIENTO — RESUMEN VISUAL'));

    const nodes = [];
    if (dest.microchip && dest.microchip.es_bloqueante) {
      nodes.push({ label: 'MICROCHIP',               date: d.microchip.fecha ? fmtU(d.microchip.fecha) : '—', status: d.microchip.tiene ? 'cleared' : 'pending' });
    }
    nodes.push({ label: 'VACUNA ANTIRRÁBICA',         date: d.vacuna.fecha   ? fmtU(d.vacuna.fecha)    : '—', status: vacClear     ? 'cleared' : 'pending' });
    if (favsRequired) {
      nodes.push({ label: 'TEST FAVN', date: d.favn && d.favn.fecha_muestra ? fmtU(d.favn.fecha_muestra) : '—', status: favsDeclaredOk ? 'cleared' : 'pending' });
    }
    nodes.push({ label: 'CERTIFICADO VET.',           date: fmtU(subDays(d.fecha_viaje, 5)), status: 'pending' });
    nodes.push({ label: 'DÍA DE VIAJE',          date: fmtU(d.fecha_viaje),             status: 'flight'  });

    const cw        = 547;
    const pad       = 28;
    const lineY     = 20;
    const n         = nodes.length;
    const nodeX     = nodes.map((_, i) => pad + (i / (n - 1)) * (cw - 2 * pad));
    const firstPend = nodes.findIndex(nd => nd.status !== 'cleared');

    const shapes = [];
    shapes.push({ type: 'line', x1: 0, y1: 0, x2: 0.1, y2: 40, lineWidth: 0.1, lineColor: 'white' });
    for (let i = 0; i < n - 1; i++) {
      const dashed = firstPend >= 0 && i >= firstPend;
      shapes.push({
        type: 'line', x1: nodeX[i], y1: lineY, x2: nodeX[i + 1], y2: lineY,
        lineWidth: 2, lineColor: '#0F1E36',
        ...(dashed ? { dash: { length: 6, space: 3 } } : {})
      });
    }
    nodes.forEach((nd, i) => {
      if (nd.status === 'cleared') {
        shapes.push({ type: 'ellipse', x: nodeX[i], y: lineY, r1: 8, r2: 8, color: '#1E4620' });
      } else if (nd.status === 'pending') {
        shapes.push({ type: 'ellipse', x: nodeX[i], y: lineY, r1: 8, r2: 8, color: '#FFFFFF', lineColor: '#B7791F', lineWidth: 1.5 });
        shapes.push({ type: 'ellipse', x: nodeX[i], y: lineY, r1: 4, r2: 4, color: '#B7791F' });
      } else {
        shapes.push({ type: 'ellipse', x: nodeX[i], y: lineY, r1: 10, r2: 10, color: '#0F1E36' });
      }
    });

    content.push({
      columns: nodes.map((nd, i) => ({
        text: nd.label, fontSize: 7, bold: true, color: '#111827',
        alignment: i === 0 ? 'left' : i === n - 1 ? 'right' : 'center'
      })),
      margin: [0, 0, 0, 2]
    });
    content.push({ canvas: shapes, margin: [0, 2, 0, 2] });
    content.push({
      columns: nodes.map((nd, i) => ({
        text: nd.date, fontSize: 7, color: '#64748B',
        alignment: i === 0 ? 'left' : i === n - 1 ? 'right' : 'center'
      })),
      margin: [0, 2, 0, 16]
    });

    // 9 · Attribution
    content.push({
      table: {
        widths: ['*'],
        body: [[{
          text: 'DOCUMENTO GENERADO POR EL ALGORITMO BORDERCHECK · ZOOVET TRAVEL · zoovettravel.com',
          fontSize: 8, bold: true, alignment: 'center', color: '#111827', margin: [0, 8, 0, 8]
        }]]
      },
      layout: {
        hLineWidth: () => 1, vLineWidth: () => 1,
        hLineColor: () => '#A99260', vLineColor: () => '#A99260',
        fillColor:  () => '#F8F9FA'
      }
    });

    return content;
  }

  function updateURL(d) {
    const params = new URLSearchParams({
      n: d.nombre, e: d.especie, r: d.raza, p: d.peso, ed: d.edad_meses,
      d: d.destino, fv: fmtDateISO(d.fecha_viaje),
      mc: d.microchip.tiene ? '1' : '0',
      ...(d.microchip.fecha && { fmc: fmtDateISO(d.microchip.fecha) }),
      vc: d.vacuna.tiene ? '1' : '0',
      ...(d.vacuna.fecha && { fvc: fmtDateISO(d.vacuna.fecha) }),
      dp: d.desparasitacion.tiene ? '1' : '0',
      ...(d.desparasitacion.fecha && { fdp: fmtDateISO(d.desparasitacion.fecha) }),
      fa: d.favn && d.favn.tiene ? '1' : '0',
      ...(d.favn && d.favn.fecha_muestra && { ffa: fmtDateISO(d.favn.fecha_muestra) }),
      ...(d.favn && d.favn.resultado && { rfa: d.favn.resultado })
    });
    history.replaceState(null, '', `${PLANNER_URL}?${params.toString()}`);
  }

  function restoreFromURL() {
    const p = new URLSearchParams(window.location.search);
    if (!p.has('d')) return;
    const f = $('#planner-form');
    f.nombre_mascota.value = p.get('n') || '';
    f.especie.value = p.get('e') || '';
    f.raza.value = p.get('r') || '';
    f.peso.value = p.get('p') || '';
    f.edad_meses.value = p.get('ed') || '';
    f.destino.value = p.get('d') || '';
    f.fecha_viaje.value = p.get('fv') || '';
    if (p.get('mc') === '1') {
      f.microchip.value = 'si';
      $('#fecha_microchip').disabled = false;
      $('#fecha_microchip').value = p.get('fmc') || '';
    }
    if (p.get('vc') === '1') {
      f.vacuna.value = 'si';
      $('#fecha_vacuna').disabled = false;
      $('#fecha_vacuna').value = p.get('fvc') || '';
    }
    if (p.get('dp') === '1') {
      f.desparasitacion.value = 'si';
      $('#fecha