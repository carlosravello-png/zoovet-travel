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
      ['fecha_microchip', 'fecha_vacuna', 'fecha_desparasitacion'].forEach(id => { $(`#${id}`).disabled = true; });
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
      desparasitacion: { tiene: f.desparasitacion.value === 'si', fecha: f.desparasitacion.value === 'si' && f.fecha_desparasitacion.value ? new Date(f.fecha_desparasitacion.value + 'T12:00:00') : null }
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
        ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
        ejeE.issues.push({
          severity: 'yellow',
          msg: `Microchip ausente. ${dest.codigo_iso} lo exige como bloqueante. Instalación inmediata requerida.`,
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
      const diasEsperaFAVN = dest.titer_test.dias_antes_viaje_minimo || reglas.favn_dias_espera_general;
      const especieLabel = d.especie === 'perro' ? 'Para perros' : d.especie === 'gato' ? 'Para gatos' : '';
      if (diasAlViaje < diasEsperaFAVN) {
        ejeC.status = 'fail';
        ejeC.issues.push({
          severity: 'red',
          msg: `${dest.codigo_iso} exige FAVN/RNATT con espera de ${diasEsperaFAVN} días desde la toma de muestra. Faltan solo ${diasAlViaje} días al viaje. Bloqueante temporal.`,
          topic: 'favn'
        });
      } else if (diasAlViaje < (diasEsperaFAVN + 30)) {
        ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
        ejeC.issues.push({
          severity: 'yellow',
          msg: `Plazo justo para FAVN${especieLabel ? ' (' + especieLabel + ')' : ''}. Tomar muestra HOY mismo (${fmtDate(today())}) — debe ir al laboratorio, regresar el resultado y endosarse.`,
          topic: 'favn-justo'
        });
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

    if (dest.titer_test && dest.titer_test.es_bloqueante) {
      const diasEspera = dest.titer_test.dias_antes_viaje_minimo;
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
    const colorMap = { green: ['#10b981', 'VERDE', '✓ VIAJE VIABLE'], yellow: ['#f59e0b', 'ÁMBAR', '⚠ ZONA GRIS — CRITERIO OFICIAL'], red: ['#dc2626', 'ROJO', '⛔ NO VIABLE — ACCIÓN URGENTE'] };
    const [colorHex, colorLabel, colorTitle] = colorMap[r.color];

    const allIssues = [...r.ejes.E.issues, ...r.ejes.C.issues, ...r.ejes.P.issues];

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 80],
      info: {
        title: `Plan de viaje · ${d.nombre} → ${destinoLabel}`,
        author: 'Carlos Eduardo Ravello Joo',
        subject: 'Plan zoosanitario de exportación de mascota',
        creator: 'Planificador de Viaje para Mascotas · Zoovet Travel'
      },
      footer: (currentPage, pageCount) => ({
        margin: [40, 20, 40, 0],
        stack: [
          { text: 'Información orientativa. No reemplaza consulta veterinaria ni dictamen oficial. Verificar siempre con SENASA Perú y autoridad del país destino antes de viajar.', fontSize: 7, color: '#666', alignment: 'center', margin: [0,0,0,4] },
          { columns: [
            { text: `Generado el ${fmtDate(today())} · Planner v${VERSION}`, fontSize: 7, color: '#999' },
            { text: `Página ${currentPage} de ${pageCount}`, fontSize: 7, color: '#999', alignment: 'center' },
            { text: 'Diseño: Carlos Ravello Joo · carlosravello.com', fontSize: 7, color: '#999', alignment: 'right' }
          ]}
        ]
      }),
      content: buildPDFContent(d, r, destinoLabel, colorHex, colorLabel, colorTitle, allIssues),
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10,
        color: '#1a2e35'
      },
      styles: {
        h1: { fontSize: 22, bold: true, color: '#1a2e35', margin: [0, 0, 0, 8] },
        h2: { fontSize: 14, bold: true, color: '#0C789E', margin: [0, 16, 0, 8] },
        small: { fontSize: 8, color: '#666' },
        label: { fontSize: 8, color: '#999', bold: true }
      }
    };

    pdfMake.createPdf(docDefinition).download(`plan-viaje-${slug(d.nombre)}-${slug(destinoLabel)}.pdf`);
  }

  function buildPDFContent(d, r, destinoLabel, colorHex, colorLabel, colorTitle, allIssues) {
    const content = [];

    // PORTADA
    content.push(
      { text: 'ZOOVET TRAVEL', fontSize: 18, bold: true, color: '#1a2e35', characterSpacing: 4, alignment: 'center', margin: [0, 0, 0, 4] },
      { text: 'Centro Médico Veterinario · 12+ años en exportación internacional de mascotas', fontSize: 9, color: '#666', alignment: 'center', margin: [0, 0, 0, 30] },
      { text: 'PLAN DE VIAJE INTERNACIONAL', fontSize: 12, bold: true, color: '#0C789E', characterSpacing: 2, alignment: 'center', margin: [0, 0, 0, 16] },

      { canvas: [{ type: 'rect', x: 80, y: 0, w: 360, h: 90, color: colorHex }], margin: [0, 0, 0, -90] },
      { text: colorTitle, fontSize: 18, bold: true, color: 'white', alignment: 'center', margin: [0, 36, 0, 0] },
      { text: `Semáforo ${colorLabel}`, fontSize: 10, color: 'white', alignment: 'center', margin: [0, 0, 0, 30] },

      { text: ' ', margin: [0, 12, 0, 0] },

      { table: {
        widths: ['*', '*'],
        body: [
          [{ text: 'MASCOTA', style: 'label' }, { text: 'DESTINO', style: 'label' }],
          [{ text: `${d.nombre} (${d.especie}, ${d.raza})`, fontSize: 12, bold: true }, { text: destinoLabel, fontSize: 12, bold: true }],
          [{ text: 'EDAD AL VIAJE', style: 'label', margin: [0,8,0,0] }, { text: 'FECHA DE VIAJE', style: 'label', margin: [0,8,0,0] }],
          [{ text: `${r.edadAlViaje} semanas`, fontSize: 11 }, { text: fmtDate(d.fecha_viaje), fontSize: 11 }],
          [{ text: 'PESO', style: 'label', margin: [0,8,0,0] }, { text: 'DÍAS AL VIAJE', style: 'label', margin: [0,8,0,0] }],
          [{ text: `${d.peso} kg`, fontSize: 11 }, { text: `${r.diasAlViaje} días`, fontSize: 11 }]
        ]
      }, layout: 'noBorders', margin: [0, 16, 0, 16] },

      { text: 'ÍNDICE DE COHERENCIA DINÁMICA (ICD-Travel)', style: 'label', alignment: 'center' },
      { text: `${r.icdScore.total}/100`, fontSize: 32, bold: true, color: colorHex, alignment: 'center' },
      { text: `Eje E (Fisiológico): ${r.icdScore.E}  ·  Eje C (Información): ${r.icdScore.C}  ·  Eje P (Direccional): ${r.icdScore.P}`, fontSize: 9, color: '#666', alignment: 'center', margin: [0, 0, 0, 16] }
    );

    // Página 2: TIMELINE
    if (r.color !== 'red') {
      content.push({ text: '', pageBreak: 'after' });
      content.push({ text: 'TIMELINE INVERSO', style: 'h2' });
      content.push({ text: 'Acciones a ejecutar en orden, contadas hacia atrás desde la fecha de viaje:', fontSize: 9, color: '#666', margin: [0,0,0,12] });

      const tableBody = [
        [{ text: 'FECHA', style: 'label', fillColor: '#F8FAFC' }, { text: 'ACCIÓN', style: 'label', fillColor: '#F8FAFC' }, { text: 'ORGANISMO', style: 'label', fillColor: '#F8FAFC' }]
      ];
      r.timeline.forEach(t => {
        tableBody.push([
          { text: fmtDate(t.date), fontSize: 9, color: '#0C789E', bold: true },
          { text: t.task, fontSize: 9 },
          { text: t.org, fontSize: 8, color: '#666' }
        ]);
      });
      content.push({ table: { widths: ['auto', '*', 'auto'], body: tableBody }, layout: 'lightHorizontalLines' });

      // Página 3: CHECKLIST
      content.push({ text: '', pageBreak: 'after' });
      content.push({ text: 'CHECKLIST DE DOCUMENTOS', style: 'h2' });
      content.push({ text: 'Marcar conforme se vayan obteniendo:', fontSize: 9, color: '#666', margin: [0,0,0,12] });
      const checklist = [
        '☐ Microchip ISO 11784/11785 instalado y funcional',
        '☐ Vacuna antirrábica vigente (mínimo 30 días antes del viaje)',
        '☐ Carnet de vacunas completo y firmado por veterinario colegiado'
      ];
      if (r.destinoData.titer_test && r.destinoData.titer_test.es_bloqueante) {
        checklist.push('☐ FAVN/RNATT realizado en laboratorio autorizado (≥0.5 IU/ml)');
      }
      if (r.destinoData.desparasitacion && r.destinoData.desparasitacion.es_bloqueante) {
        checklist.push(`☐ Desparasitación documentada (${r.destinoData.desparasitacion.producto_especifico || 'estándar'})`);
      }
      checklist.push(
        '☐ Certificado de salud emitido por veterinario colegiado (vence en 5 días)',
        '☐ CZE endosado por SENASA Perú',
        '☐ Reserva de viaje confirmada'
      );
      if (r.destinoData.permiso_importacion && r.destinoData.permiso_importacion.es_bloqueante) {
        checklist.push(`☐ Permiso de importación obtenido (${r.destinoData.permiso_importacion.producto_especifico || ''})`);
      }
      if (r.destinoData.cuarentena && r.destinoData.cuarentena.es_bloqueante) {
        checklist.push(`☐ Cuarentena post-arrival reservada (${r.destinoData.cuarentena.producto_especifico || ''})`);
      }
      checklist.forEach(item => content.push({ text: item, fontSize: 10, margin: [0, 4, 0, 0] }));

      // Fuente oficial
      content.push({ text: 'FUENTE OFICIAL DEL DESTINO', style: 'h2' });
      content.push({ text: r.destinoData.fuente_oficial.nombre, fontSize: 10, bold: true });
      content.push({ text: r.destinoData.fuente_oficial.url, fontSize: 9, color: '#0C789E' });
      content.push({ text: `Consultado: ${r.destinoData.fuente_oficial.fecha_consulta}`, style: 'small' });
    }

    // Página final: CTA + diagnóstico + disclaimer
    content.push({ text: '', pageBreak: 'after' });
    content.push({ text: 'DIAGNÓSTICO', style: 'h2' });
    if (allIssues.length === 0) {
      content.push({ text: 'Sin observaciones críticas. Su viaje cumple los requisitos en regla.', fontSize: 10, color: '#10b981' });
    } else {
      allIssues.forEach(i => {
        const c = i.severity === 'red' ? '#dc2626' : i.severity === 'yellow' ? '#f59e0b' : '#1a2e35';
        content.push({ text: `• ${i.msg}`, fontSize: 9, color: c, margin: [0, 4, 0, 0] });
      });
    }

    content.push({ text: r.color === 'red' ? '⚠ ACCIÓN URGENTE' : '📞 SIGUIENTE PASO', style: 'h2' });
    if (r.color === 'red') {
      content.push({ text: 'No tome decisiones sin nosotros. Llámenos AHORA y evaluemos opciones reales: postergar fecha, cambiar destino, ajustar plan.', fontSize: 11, color: '#dc2626', bold: true, margin: [0, 0, 0, 8] });
      content.push({ text: 'WhatsApp emergencias: +51 922 083 707', fontSize: 14, color: '#0C789E', bold: true });
    } else {
      content.push({ text: 'Coordine la ejecución de su plan con nuestro equipo:', fontSize: 11, margin: [0, 0, 0, 8] });
      content.push({ text: 'WhatsApp consultas: +51 979 620 402', fontSize: 14, color: '#0C789E', bold: true });
    }
    content.push({ text: 'Calle Cuba 241, Trujillo · L-S 09:00-19:00 · contacto@zoovettravel.com', style: 'small', margin: [0, 4, 0, 0] });

    content.push({ text: 'AVISO LEGAL', style: 'h2' });
    content.push({ text: 'Esta herramienta es estrictamente informativa y orientativa. No constituye consejo veterinario, no reemplaza la consulta con un médico veterinario colegiado ni sustituye la verificación directa con SENASA Perú y con la autoridad sanitaria del país destino. Las normativas zoosanitarias internacionales pueden cambiar sin previo aviso y la decisión final sobre la admisión de cualquier animal corresponde exclusivamente a los oficiales sanitarios y de aduana del país destino. El uso de este planificador no genera responsabilidad de Carlos Eduardo Ravello Joo ni de Zoovet Travel sobre decisiones tomadas únicamente con base en este resultado.', fontSize: 8, color: '#666', alignment: 'justify' });

    return content;
  }

  // ═════════════════════════════════════════════════════════════════
  // SHARE URL — params reproducibles
  // ═════════════════════════════════════════════════════════════════
  function updateURL(d) {
    const params = new URLSearchParams({
      n: d.nombre, e: d.especie, r: d.raza, p: d.peso, ed: d.edad_meses,
      d: d.destino, fv: fmtDateISO(d.fecha_viaje),
      mc: d.microchip.tiene ? '1' : '0',
      ...(d.microchip.fecha && { fmc: fmtDateISO(d.microchip.fecha) }),
      vc: d.vacuna.tiene ? '1' : '0',
      ...(d.vacuna.fecha && { fvc: fmtDateISO(d.vacuna.fecha) }),
      dp: d.desparasitacion.tiene ? '1' : '0',
      ...(d.desparasitacion.fecha && { fdp: fmtDateISO(d.desparasitacion.fecha) })
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
      $('#fecha_desparasitacion').disabled = false;
      $('#fecha_desparasitacion').value = p.get('fdp') || '';
    }
  }

  function sharePlan() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Mi plan de viaje · Zoovet Travel', url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('URL del plan copiada al portapapeles.');
      });
    }
  }

})(); 