/* ════════════════════════════════════════════════════════════════════
   Planificateur de Voyage pour Animaux — Logique vanilla JS (FR)
   Architecture et conception : Carlos Eduardo Ravello Joo · carlosravello.com
   Application terrain du Modèle de Cohérence Dynamique (MCD)
   ICD-Travel = Indice de Cohérence Dynamique appliqué au voyage zoosanitaire
   ════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  let RULES = null;
  let CURRENT_RESULT = null;

  const WA_URGENT = '51922083707';
  const WA_DEFAULT = '51979620402';
  const VERSION = '1.0.0';
  const PLANNER_URL = 'https://zoovettravel.com/planificateur-voyage-animal/';
  const ZOOVET_LOGO_URL = 'https://zoovettravel.com/images/zoovet-logo.png';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const fmtDate = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return '—';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const fmtDateISO = (d) => d.toISOString().split('T')[0];
  const daysBetween = (a, b) => Math.round((b - a) / (1000 * 60 * 60 * 24));
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
  const subDays = (d, n) => addDays(d, -n);
  const today = () => { const t = new Date(); t.setHours(0,0,0,0); return t; };
  const slug = (s) => s.toLowerCase().replace(/[áàäâ]/g,'a').replace(/[éèëê]/g,'e').replace(/[íìïî]/g,'i').replace(/[óòöô]/g,'o').replace(/[úùüû]/g,'u').replace(/[ñ]/g,'n').replace(/[ç]/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('../planificador-viaje-mascota/rules.json?v=1.1.1');
      RULES = await res.json();
      populateDestinos();
      setupForm();
      restoreFromURL();
    } catch (err) {
      console.error('Impossible de charger rules.json :', err);
      $('#planner-form').innerHTML = '<p class="text-red-600 text-sm">Erreur : impossible de charger la base de règles. Veuillez recharger la page ou contacter Zoovet Travel.</p>';
    }
  });

  function populateDestinos() {
    const sel = $('#destino');
    const labels = {
      'Alemania': 'Allemagne', 'Argentina': 'Argentine', 'Australia': 'Australie',
      'Brasil': 'Brésil', 'Canadá': 'Canada', 'Chile': 'Chili', 'China': 'Chine',
      'Colombia': 'Colombie', 'Corea_del_Sur': 'Corée du Sud', 'EAU': 'Émirats Arabes Unis',
      'España': 'Espagne', 'Estados_Unidos': 'États-Unis', 'Francia': 'France',
      'India': 'Inde', 'Italia': 'Italie', 'Japón': 'Japon', 'México': 'Mexique',
      'Nueva_Zelanda': 'Nouvelle-Zélande', 'Reino_Unido': 'Royaume-Uni', 'Rusia': 'Russie',
      'Singapur': 'Singapour', 'Sudáfrica': 'Afrique du Sud'
    };
    const keys = Object.keys(RULES.destinos).sort((a, b) => labels[a].localeCompare(labels[b], 'fr'));
    keys.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = labels[k] || k;
      sel.appendChild(opt);
    });
  }

  function setupForm() {
    ['microchip', 'vacuna', 'desparasitacion'].forEach(name => {
      $$(`input[name="${name}"]`).forEach(r => r.addEventListener('change', e => {
        const fechaInput = $(`#fecha_${name}`);
        if (fechaInput) {
          fechaInput.disabled = e.target.value !== 'si';
          if (e.target.value !== 'si') fechaInput.value = '';
        }
      }));
    });

    // FAVN : afficher/masquer la section de détail
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

    $('#planner-form').addEventListener('reset', () => {
      $('#result-section').classList.add('hidden');
      ['fecha_microchip', 'fecha_vacuna', 'fecha_desparasitacion', 'fecha_muestra_favn'].forEach(id => { $(`#${id}`).disabled = true; });
      const fd = document.getElementById('favn-detail'); if (fd) fd.style.display = 'none';
      history.replaceState(null, '', PLANNER_URL);
    });

    $('#fecha_viaje').min = fmtDateISO(today());
  }

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
      alert('Veuillez remplir tous les champs obligatoires.');
      return false;
    }
    if (d.fecha_viaje < today()) {
      alert('La date de voyage ne peut pas être dans le passé.');
      return false;
    }
    return true;
  }

  function computeSemaforo(d) {
    const dest = RULES.destinos[d.destino];
    const reglas = RULES.metadata.reglas_origen_peru;
    const diasAlViaje = daysBetween(today(), d.fecha_viaje);
    const edadSemanas = d.edad_meses * 4.345;
    const edadAlViaje = edadSemanas + (diasAlViaje / 7);

    const ejeE = { issues: [], status: 'ok' };

    if (edadAlViaje < dest.edad_minima_semanas) {
      ejeE.status = 'fail';
      ejeE.issues.push({
        severity: 'red',
        msg: `Votre animal aura ${edadAlViaje.toFixed(1)} semaines le jour du voyage. ${dest.codigo_iso} exige un minimum de ${dest.edad_minima_semanas} semaines. Âge insuffisant : bloquant biologique.`,
        topic: 'edad'
      });
    }

    if (dest.microchip.es_bloqueante && !d.microchip.tiene) {
      if (d.vacuna.tiene && diasAlViaje < (reglas.vacuna_dias_antes_viaje_minimo + 14)) {
        ejeE.status = 'fail';
        ejeE.issues.push({
          severity: 'red',
          msg: `Puce absente et vaccin déjà appliqué. ${dest.codigo_iso} exige la puce AVANT le vaccin : re-vaccination nécessaire mais délai insuffisant.`,
          topic: 'microchip-orden'
        });
      } else {
        ejeE.status = 'fail';
        ejeE.issues.push({
          severity: 'red',
          msg: `Puce absente. ${dest.codigo_iso} l'exige comme condition bloquante pour TOUTES les modalités d'entrée. Sans puce, l'entrée est impossible — ni via FAVN ni via quarantaine. Implantation immédiate requise.`,
          topic: 'microchip'
        });
      }
    }

    if (dest.vacuna_antirrabica.es_bloqueante) {
      if (!d.vacuna.tiene) {
        if (diasAlViaje < 21) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vaccin antirabique non appliqué. Il reste ${diasAlViaje} jours avant le voyage (minimum absolu : 21 jours, recommandé : 30).`, topic: 'vacuna' });
        } else if (diasAlViaje < 30) {
          ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
          ejeE.issues.push({ severity: 'yellow', msg: `Vaccin non appliqué et seulement ${diasAlViaje} jours restants. Zone orange : soumis à l'appréciation de l'officiel.`, topic: 'vacuna-zona-ambar' });
        } else {
          ejeE.issues.push({ severity: 'info', msg: `Vaccin en attente. Appliquer AVANT le ${fmtDate(subDays(d.fecha_viaje, 30))} pour respecter le délai de 30 jours.`, topic: 'vacuna-pendiente' });
        }
      } else {
        const diasDesdeVacuna = daysBetween(d.vacuna.fecha, d.fecha_viaje);
        if (diasDesdeVacuna < 21) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vaccin appliqué trop récemment par rapport à la date de voyage (${diasDesdeVacuna} jours). SENASA exige au moins 30 jours.`, topic: 'vacuna-tarde' });
        } else if (diasDesdeVacuna < 30) {
          ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
          ejeE.issues.push({ severity: 'yellow', msg: `Vaccin appliqué il y a ${diasDesdeVacuna} jours. Zone grise (21-29) : soumis à l'appréciation de l'officiel — en pratique presque toujours NON.`, topic: 'vacuna-gris' });
        }
        if (diasDesdeVacuna > (dest.vacuna_antirrabica.dias_vigencia_maxima || 365)) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vaccin périmé (${diasDesdeVacuna} jours écoulés). Validité maximale : ${dest.vacuna_antirrabica.dias_vigencia_maxima} jours.`, topic: 'vacuna-vencida' });
        }
      }
    }

    const ejeC = { issues: [], status: 'ok' };

    // Australie — importation directe depuis le Pérou non autorisée
    if (dest.importacion_directa_desde_peru === false) {
      ejeC.status = 'fail';
      ejeC.issues.push({
        severity: 'red',
        msg: `L'Australie N'ACCEPTE PAS l'importation directe depuis le Pérou. Le Pérou est un pays non approuvé par le DAFF. Une résidence préalable d'au moins 6 mois dans un pays du Groupe 3 approuvé (États-Unis, Royaume-Uni, Allemagne, etc.) est requise. Processus total : minimum 12 mois. Contactez Zoovet Travel pour évaluer des itinéraires alternatifs.`,
        topic: 'australia-no-directo'
      });
    }

    // Aéroports valides (États-Unis, Japon, Nouvelle-Zélande)
    if (dest.aeropuertos_validos && dest.aeropuertos_validos.length > 0) {
      ejeC.issues.push({
        severity: 'info',
        msg: `${dest.codigo_iso} n'accepte les animaux que par ces aéroports : ${dest.aeropuertos_validos.join(', ')}. Vérifiez votre vol avant d'acheter les billets.`,
        topic: 'aeropuerto'
      });
    }

    // FAVN/Titre — avec différenciation par espèce
    const favcBloqueante = (() => {
      if (!dest.titer_test) return false;
      if (d.especie === 'perro' && dest.titer_test.es_bloqueante_perro !== undefined) return dest.titer_test.es_bloqueante_perro;
      if (d.especie === 'gato' && dest.titer_test.es_bloqueante_gato !== undefined) return dest.titer_test.es_bloqueante_gato;
      return dest.titer_test.es_bloqueante;
    })();
    if (dest.titer_test && favcBloqueante) {
      const diasEsperaFAVN = dest.titer_test.dias_antes_viaje_minimo ?? reglas.favn_dias_espera_general;
      const especieLabel = d.especie === 'perro' ? 'Pour les chiens' : d.especie === 'gato' ? 'Pour les chats' : '';

      if (d.favn && d.favn.tiene) {
        if (d.favn.resultado === 'échoué') {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: 'FAVN/RNATT échoué (résultat < 0,5 UI/mL). Revaccination et nouveau prélèvement requis. Contactez Zoovet Travel pour un nouveau protocole.', topic: 'favn-fallido' });
        } else if (!d.microchip.tiene) {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: 'FAVN déclaré mais aucune puce enregistrée. La CDC exige que la puce soit implantée AVANT le prélèvement sanguin. Sans puce, le test est invalide.', topic: 'favn-sin-chip' });
        } else if (d.favn.fecha_muestra && d.microchip.fecha && d.favn.fecha_muestra < d.microchip.fecha) {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: `Le prélèvement FAVN (${fmtDate(d.favn.fecha_muestra)}) est antérieur à la puce (${fmtDate(d.microchip.fecha)}). Le test n'est pas valide sans puce préalable.`, topic: 'favn-orden-chip' });
        } else {
          const renovadaDespues = d.vacuna.fecha && d.favn.fecha_muestra && d.vacuna.fecha > d.favn.fecha_muestra;
          const infoMsg = renovadaDespues
            ? `FAVN/RNATT approuvé (≥0,5 UI/mL). Vaccination renouvelée le ${fmtDate(d.vacuna.fecha)}, postérieure au prélèvement. Valide tant que le vaccin est en vigueur.`
            : `FAVN/RNATT approuvé (≥0,5 UI/mL)${d.favn.fecha_muestra ? '. Prélèvement : ' + fmtDate(d.favn.fecha_muestra) : ''}.`;
          ejeC.issues.push({ severity: 'info', msg: infoMsg, topic: 'favn-ok' });
        }
      } else {
        if (diasAlViaje < diasEsperaFAVN) {
          ejeC.status = 'fail';
          ejeC.issues.push({ severity: 'red', msg: `${dest.codigo_iso} exige le test FAVN/sérologique avec un délai d'attente de ${diasEsperaFAVN} jours depuis le prélèvement. Il ne reste que ${diasAlViaje} jours. Bloquant temporel.`, topic: 'favn' });
        } else if (diasAlViaje < (diasEsperaFAVN + 30)) {
          ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
          ejeC.issues.push({ severity: 'yellow', msg: `Délai FAVN serré${especieLabel ? ' (' + especieLabel + ')' : ''}. Prélever AUJOURD'HUI (${fmtDate(today())}) — l'échantillon doit partir, les résultats revenir et être visés.`, topic: 'favn-justo' });
        } else {
          ejeC.issues.push({ severity: 'info', msg: `Test FAVN/sérologique requis${especieLabel ? ' — ' + especieLabel : ''}. Planifier le prélèvement avant le ${fmtDate(subDays(d.fecha_viaje, diasEsperaFAVN))}. Laboratoire agréé : KSVDL (Kansas State).`, topic: 'favn-pendiente' });
        }
      }
    }

    if (dest.permiso_importacion && dest.permiso_importacion.es_bloqueante) {
      const diasNecesarios = dest.permiso_importacion.dias_antes_viaje_minimo || 30;
      if (diasAlViaje < diasNecesarios) {
        ejeC.status = 'fail';
        ejeC.issues.push({
          severity: 'red',
          msg: `${dest.codigo_iso} exige un Permis d'importation officiel (${dest.permiso_importacion.producto_especifico || ''}). Délai insuffisant pour l'obtenir (${diasNecesarios} jours requis).`,
          topic: 'permiso'
        });
      }
    }

    if (dest.cuarentena && dest.cuarentena.es_bloqueante) {
      ejeC.issues.push({
        severity: 'info',
        msg: `${dest.codigo_iso} impose une quarantaine à l'arrivée : ${dest.cuarentena.producto_especifico || 'durée variable'}. Réserver la structure bien à l'avance.`,
        topic: 'cuarentena'
      });
    }

    if (dest.desparasitacion && dest.desparasitacion.es_bloqueante) {
      const diasReq = dest.desparasitacion.dias_antes_viaje_minimo || 0;
      if (!d.desparasitacion.tiene && diasAlViaje < diasReq) {
        ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
        ejeC.issues.push({ severity: 'yellow', msg: `Déparasitage en attente et délai serré (${dest.desparasitacion.producto_especifico || 'standard'}).`, topic: 'desparasitacion' });
      }
    }

    const ejeP = { issues: [], status: 'ok' };

    if (diasAlViaje < 30) {
      ejeP.status = 'warn';
      ejeP.issues.push({ severity: 'yellow', msg: `Seulement ${diasAlViaje} jours avant le voyage. Tout contretemps sera irrécupérable.`, topic: 'tiempo' });
    }
    if (diasAlViaje < 7) {
      ejeP.status = 'fail';
      ejeP.issues.push({ severity: 'red', msg: `Seulement ${diasAlViaje} jours avant le voyage. Impossible de compléter les formalités SENASA + visa.`, topic: 'tiempo-critico' });
    }

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

  function generarTimeline(d, dest, reglas) {
    const fv = d.fecha_viaje;
    const tasks = [];

    tasks.push({ date: fv, task: `✈ Voyage vers ${d.destino.replace(/_/g, ' ')}`, org: 'Aéroport', status: 'final' });
    tasks.push({ date: subDays(fv, 1), task: 'Visa du CZE par SENASA Pérou', org: 'SENASA Pérou', status: 'pending' });
    tasks.push({ date: subDays(fv, reglas.certificado_salud_dias_vigencia), task: `Certificat de santé émis (valable ${reglas.certificado_salud_dias_vigencia} jours)`, org: 'Vétérinaire agréé', status: 'pending' });

    if (dest.desparasitacion && dest.desparasitacion.es_bloqueante && dest.desparasitacion.dias_antes_viaje_minimo) {
      tasks.push({ date: subDays(fv, dest.desparasitacion.dias_antes_viaje_minimo), task: `Déparasitage obligatoire (${dest.desparasitacion.producto_especifico || 'standard'})`, org: 'Vétérinaire', status: 'pending' });
    }

    const favcBloqueanteTimeline = (() => {
      if (!dest.titer_test) return false;
      if (d.especie === 'perro' && dest.titer_test.es_bloqueante_perro !== undefined) return dest.titer_test.es_bloqueante_perro;
      if (d.especie === 'gato' && dest.titer_test.es_bloqueante_gato !== undefined) return dest.titer_test.es_bloqueante_gato;
      return dest.titer_test.es_bloqueante;
    })();
    if (dest.titer_test && favcBloqueanteTimeline) {
      const diasEspera = dest.titer_test.dias_antes_viaje_minimo ?? 0;
      tasks.push({ date: subDays(fv, diasEspera), task: `Test FAVN/sérologique — prélèvement (attente de ${diasEspera} jours requise)`, org: 'Zoovet Travel + KSVDL', status: 'pending' });
    }

    tasks.push({ date: subDays(fv, reglas.vacuna_dias_antes_viaje_minimo), task: 'Vaccin antirabique (minimum 30 jours avant le voyage)', org: 'Vétérinaire', status: 'pending' });

    if (dest.microchip.es_bloqueante) {
      tasks.push({ date: subDays(fv, reglas.vacuna_dias_antes_viaje_minimo + 1), task: 'Implantation de la puce ISO (avant le vaccin)', org: 'Vétérinaire', status: 'pending' });
    }

    if (dest.permiso_importacion && dest.permiso_importacion.es_bloqueante) {
      tasks.push({ date: subDays(fv, dest.permiso_importacion.dias_antes_viaje_minimo), task: `Demande de Permis d'importation (${dest.permiso_importacion.producto_especifico || ''})`, org: dest.fuente_oficial.nombre, status: 'pending' });
    }

    return tasks.sort((a, b) => a.date - b.date);
  }

  function renderResult(d, r) {
    const c = $('#semaforo-container');
    c.className = `border-2 p-6 sm:p-8 shadow-md ${r.color}-result bg-white`;

    const floatBtn = document.getElementById('whatsapp-float');
    if (floatBtn) {
      floatBtn.href = r.color === 'red'
        ? `https://wa.me/${WA_URGENT}`
        : `https://wa.me/${WA_DEFAULT}`;
      floatBtn.setAttribute('aria-label',
        r.color === 'red' ? 'WhatsApp urgence Zoovet Travel' : 'WhatsApp consultation Zoovet Travel');
    }

    const colorMap = { green: 'VERT', yellow: 'ORANGE', red: 'ROUGE' };
    const colorLabel = colorMap[r.color];
    const destinoLabel = $('#destino').options[$('#destino').selectedIndex].text;

    let html = `
      <div class="text-center mb-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-[#1a2e35]/60 mb-2">Résultat pour ${d.nombre} → ${destinoLabel}</p>
        <h3 class="text-2xl sm:text-3xl font-bold text-[#1a2e35] mb-4">Voyage dans ${r.diasAlViaje} jours — Date : ${fmtDate(d.fecha_viaje)}</h3>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
        <div class="text-center">
          <div class="semaforo-light red ${r.color === 'red' ? 'active' : ''}">!</div>
          <p class="text-xs mt-2 ${r.color === 'red' ? 'font-bold text-red-700' : 'text-[#1a2e35]/40'}">ROUGE</p>
        </div>
        <div class="text-center">
          <div class="semaforo-light yellow ${r.color === 'yellow' ? 'active' : ''}">⚠</div>
          <p class="text-xs mt-2 ${r.color === 'yellow' ? 'font-bold text-yellow-700' : 'text-[#1a2e35]/40'}">ORANGE</p>
        </div>
        <div class="text-center">
          <div class="semaforo-light green ${r.color === 'green' ? 'active' : ''}">✓</div>
          <p class="text-xs mt-2 ${r.color === 'green' ? 'font-bold text-green-700' : 'text-[#1a2e35]/40'}">VERT</p>
        </div>
      </div>

      <div class="text-center mb-6">
        <p class="icd-score" style="color: ${r.color === 'red' ? '#dc2626' : r.color === 'yellow' ? '#f59e0b' : '#10b981'}">${r.icdScore.total}<span class="text-lg text-[#1a2e35]/40 font-normal">/100</span></p>
        <p class="text-xs uppercase tracking-widest text-[#1a2e35]/50 mt-1">Indice de Cohérence Dynamique · ICD-Travel · Feu ${colorLabel}</p>
      </div>

      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="icd-eje">
          <div class="icd-eje-label">Axe E · Physiologique</div>
          <div class="icd-eje-value">${r.icdScore.E}</div>
          <div class="icd-eje-status ${r.ejes.E.status === 'ok' ? 'ok' : r.ejes.E.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.E.status === 'ok' ? 'OK' : r.ejes.E.status === 'warn' ? 'ATTENTION' : 'ÉCHEC'}</div>
        </div>
        <div class="icd-eje">
          <div class="icd-eje-label">Axe C · Information</div>
          <div class="icd-eje-value">${r.icdScore.C}</div>
          <div class="icd-eje-status ${r.ejes.C.status === 'ok' ? 'ok' : r.ejes.C.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.C.status === 'ok' ? 'OK' : r.ejes.C.status === 'warn' ? 'ATTENTION' : 'ÉCHEC'}</div>
        </div>
        <div class="icd-eje">
          <div class="icd-eje-label">Axe P · Directionnel</div>
          <div class="icd-eje-value">${r.icdScore.P}</div>
          <div class="icd-eje-status ${r.ejes.P.status === 'ok' ? 'ok' : r.ejes.P.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.P.status === 'ok' ? 'OK' : r.ejes.P.status === 'warn' ? 'ATTENTION' : 'ÉCHEC'}</div>
        </div>
      </div>
    `;

    const allIssues = [...r.ejes.E.issues, ...r.ejes.C.issues, ...r.ejes.P.issues];
    if (allIssues.length) {
      html += `<div class="bg-[#F8FAFC] border border-[#1a2e35]/10 p-4 mb-6"><p class="text-xs font-bold uppercase tracking-widest text-[#1a2e35]/60 mb-3">Diagnostic</p><ul class="space-y-2">`;
      allIssues.forEach(i => {
        const icon = i.severity === 'red' ? '🔴' : i.severity === 'yellow' ? '🟡' : 'ℹ️';
        html += `<li class="text-sm text-[#1a2e35]/85 flex gap-2"><span>${icon}</span><span>${i.msg}</span></li>`;
      });
      html += '</ul></div>';
    }

    // Bandeau note additionnelle (ex. réservation ACF pour les États-Unis)
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

    if (r.color === 'red') {
      html += `
        <div class="urgent-cta">
          <h3>⚠ Action urgente requise</h3>
          <p class="mb-4 text-sm">Le planning de ${d.nombre} vers ${destinoLabel} présente des blocages qui NE PEUVENT PAS être résolus par improvisation. Contactez-nous MAINTENANT pour évaluer les options réelles : reporter la date, changer de destination ou ajuster le plan.</p>
          <a href="https://wa.me/${WA_URGENT}?text=${encodeURIComponent(`Bonjour Zoovet Travel, j'ai besoin d'aide urgente. Mon animal ${d.nombre} (${d.especie}) est prévu pour voyager vers ${destinoLabel} le ${fmtDate(d.fecha_viaje)} et le planificateur m'a donné un feu rouge.`)}" target="_blank" rel="noopener noreferrer" class="btn">Appeler le +51 922 083 707</a>
          <a href="https://wa.me/${WA_URGENT}?text=${encodeURIComponent(`Je souhaite parler avec un spécialiste de Zoovet Travel pour le cas de ${d.nombre} → ${destinoLabel}.`)}" target="_blank" rel="noopener noreferrer" class="btn">WhatsApp direct</a>
          <p class="text-xs mt-3 opacity-90">Équipe vétérinaire disponible lun–sam 09h00–19h00 (heure du Pérou)</p>
        </div>
      `;
    } else {
      html += `<h4 class="text-lg font-bold text-[#1a2e35] mt-6 mb-3">Calendrier inversé</h4>`;
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
          <button id="btn-pdf" class="bg-[#0C789E] text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#0a6a8a] transition-colors">📄 Télécharger le plan PDF</button>
          <a href="https://wa.me/${WA_DEFAULT}?text=${encodeURIComponent(`Bonjour Zoovet Travel, je souhaite coordonner le voyage de ${d.nombre} vers ${destinoLabel} (${fmtDate(d.fecha_viaje)}).`)}" target="_blank" rel="noopener noreferrer" class="bg-[#25D366] text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#22b85b] transition-colors">💬 Coordonner par WhatsApp</a>
          <button id="btn-share" class="border border-[#0C789E] text-[#0C789E] font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#0C789E] hover:text-white transition-colors">🔗 Copier l'URL du plan</button>
        </div>
      `;
    }

    html += `<p class="text-xs text-[#1a2e35]/50 text-center mt-6 leading-relaxed">Résultat généré par le Planificateur v${VERSION} · ${fmtDate(today())}. Informations indicatives. Vérifier auprès des autorités officielles avant de voyager.</p>`;

    c.innerHTML = html;
    $('#result-section').classList.remove('hidden');

    $('#btn-pdf')?.addEventListener('click', () => generarPDF(d, r));
    $('#btn-share')?.addEventListener('click', sharePlan);
  }

  function generarPDF(d, r) {
    const destinoLabel = $('#destino').options[$('#destino').selectedIndex].text;

    const sem = {
      green:  { bg: '#E8F5E9', fg: '#1E4620', title: 'AUTORISÉ POUR MANIFESTE (VERT)',        sub: 'TOUTES LES EXIGENCES ZOOSANITAIRES SATISFAITES' },
      yellow: { bg: '#FEFCBF', fg: '#B7791F', title: 'ZONE GRISE — DÉCISION DE L\'AGENT', sub: 'AMBRE · RÉVISION REQUISE'               },
      red:    { bg: '#FFF5F5', fg: '#63171D', title: 'NON VIABLE — ACTION URGENTE',             sub: 'ROUGE · BLOCAGES CRITIQUES'                 }
    };
    const col = sem[r.color];

    const fmtU = (dt) => {
      if (!dt || isNaN(dt)) return '—';
      return dt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
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
              { text: 'BorderCheck · Système International d\'Autorisation pour Animaux', fontSize: 8, bold: true, color: '#A99260', margin: [0, 2, 0, 0] },
              { text: 'MANIFESTE INTERNATIONAL D\'AUTORISATION POUR ANIMAUX', fontSize: 6.5, color: '#D1D5DB', margin: [0, 3, 0, 0] }
            ],
            margin: [24, 12, 0, 12],
            border: [false, false, false, false]
          },
          { text: '', border: [false, false, false, false] },
          {
            stack: [
              { text: `RÉFÉRENCE: ${refId}`,            fontSize: 7, color: '#FFFFFF' },
              { text: `DATE: ${fmtU(today())}`,                    fontSize: 7, color: '#FFFFFF' },
              { text: 'ÉTAT: MANIFESTE OFFICIEL',             fontSize: 7, color: '#FFFFFF' },
              { text: `DESTINATION: ${destinoLabel.toUpperCase()}`, fontSize: 7, color: '#FFFFFF' }
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
        subject: 'Manifeste International d\'Autorisation pour Animaux',
        creator: 'BorderCheck by Zoovet Travel'
      },
      header: () => pageHeader,
      footer: (pg, total) => ({
        margin: [24, 6, 24, 0],
        stack: [
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 547, y2: 0, lineWidth: 1, lineColor: '#A99260' }] },
          { margin: [0, 3, 0, 0], columns: [
            { text: 'Guide indicatif uniquement. Confirmez auprès de la compagnie et de l\'autorité vétérinaire. zoovettravel.com', fontSize: 6, color: '#64748B' },
            { text: `ZVT-BC-${refYear} // PAGE ${pg} SUR ${total}`, fontSize: 7, bold: true, color: '#111827', alignment: 'center' },
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
    const favsDeclaredOk = !!(d.favn && d.favn.tiene && d.favn.resultado === 'approuvé' && !favsBlocked);

    const secTitle = (txt, mt) => ({ text: txt, fontSize: 10, bold: true, color: '#A99260', margin: [0, mt !== undefined ? mt : 14, 0, 5] });
    const lbl      = (txt)     => ({ text: txt, fontSize: 7, bold: true, color: '#A99260' });
    const val      = (txt)     => ({ text: txt, fontSize: 10, bold: true, color: '#111827', margin: [0, 2, 0, 0] });

    // 1 · ÉTAT
    content.push({
      table: {
        widths: ['*', 'auto'],
        body: [[
          { text: `ÉTAT: ${col.title}`, fontSize: 13, bold: true, color: col.fg, margin: [10, 12, 0, 12] },
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

    // 2 · Avertissement
    content.push({
      table: {
        widths: ['*'],
        body: [[{
          text: 'Ce document est un guide indicatif uniquement. Les exigences peuvent changer sans préavis — confirmez toujours auprès de votre compagnie aérienne et de l\'autorité vétérinaire officielle du pays de destination.',
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

    // 3 · DONNÉES DU PASSAGER
    content.push(secTitle('DONNÉES DU PASSAGER'));
    content.push({
      table: {
        widths: ['*', '*', '*'],
        body: [
          [lbl('NOM / ESPÈCE / RACE'), lbl('ÂGE / POIDS'), lbl('MICROPUCE ISO (15 CHIFFRES)')],
          [val(`${d.nombre.toUpperCase()} / ${d.especie.toUpperCase()} / ${d.raza.toUpperCase()}`),
           val(`${d.edad_meses} MOIS / ${d.peso} KG`),
           val(d.microchip.tiene ? '✓ IMPLANTÉE' : 'NON ENREGISTRÉE')]
        ]
      },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 4 · ITINÉRAIRE ET DESTINATION
    content.push(secTitle('ITINÉRAIRE ET DESTINATION'));
    content.push({
      table: {
        widths: ['*', '*', '*'],
        body: [
          [lbl('ORIGINE (PORT DE DÉPART)'), lbl('DESTINATION (PORT D\'ENTRÉE)'), lbl('DATE DE VOL PRÉVUE')],
          [val('PÉROU (LIM)'), val(destinoLabel.toUpperCase()), val(fmtU(d.fecha_viaje))]
        ]
      },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 5 · CALENDRIER DE CONFORMITÉ
    content.push(secTitle('CALENDRIER DE CONFORMITÉ'));

    const statusCell = (ok) => ({ text: ok ? 'AUTORISÉ' : 'EN ATTENTE', fontSize: 8, bold: true, color: ok ? '#1E4620' : '#B7791F' });

    const compRows = [[
      { text: 'EXIGENCE',        fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'ÉTAT',       fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'ACTION / DÉTAIL', fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'DATE',            fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] }
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
      addRow('IMPLANTATION MICROPUCE', d.microchip.tiene,
        d.microchip.tiene ? 'AVANT VACCINATION' : 'IMPLANTATION REQUISE',
        d.microchip.fecha ? fmtU(d.microchip.fecha) : '—');
    }
    addRow('VACCIN ANTIRABIQUE', vacClear,
      vacClear ? 'VALIDE >30J, <1AN' : d.vacuna.tiene ? 'VÉRIFIER VALIDITÉ' : 'APPLICATION REQUISE',
      d.vacuna.fecha ? fmtU(d.vacuna.fecha) : '—');
    if (favsRequired) {
      const favStatusMsg = favsDeclaredOk ? 'TITRE: ≥0,5 UI/ML' : (favsBlocked ? 'PRÉLÈVEMENT REQUIS EN URGENCE' : 'EN ATTENTE — NON DÉCLARÉ');
      addRow('TEST TITRATION FAVN RNATT', favsDeclaredOk, favStatusMsg, d.favn && d.favn.fecha_muestra ? fmtU(d.favn.fecha_muestra) : '—');
      if (dest.titer_test.dias_antes_viaje_minimo >= 90) {
        addRow(`PÉRIODE D\'ATTENTE UE ${dest.titer_test.dias_antes_viaje_minimo} JOURS`,
          r.diasAlViaje > dest.titer_test.dias_antes_viaje_minimo,
          'DÉLAI MINIMUM POST-TITRATION', '—');
      }
    }
    addRow('CERTIFICAT SANITAIRE OFFICIEL', false,
      'CONSULTATION VÉT / ÉMISSION J-5', fmtU(subDays(d.fecha_viaje, 5)));
    addRow('ENDOSSEMENT SENASA EXPORT', false,
      'RENDEZ-VOUS CACHET OFFICIEL', fmtU(subDays(d.fecha_viaje, 2)));

    content.push({
      table: { widths: ['33%', '15%', '32%', '20%'], body: compRows },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 6 · PROCHAINES ÉTAPES OBLIGATOIRES
    content.push(secTitle('PROCHAINES ÉTAPES OBLIGATOIRES'));
    content.push({
      table: {
        widths: ['*', 96],
        body: [[
          {
            stack: [
              { text: '1. CERTIFICAT SANITAIRE OFFICIEL', fontSize: 8, bold: true, margin: [0, 0, 0, 3] },
              { text: `DOIT ÊTRE DÉLIV RÉ PAR UN VÉTÉRINAIRE AGRÉÉ AU PLUS TÔT LE ${fmtU(subDays(d.fecha_viaje, 5))} (J-5).`, fontSize: 7, margin: [0, 0, 0, 8] },
              { text: '2. ENDOSSEMENT CZE SENASA', fontSize: 8, bold: true, margin: [0, 0, 0, 3] },
              { text: `PRENDRE RDV AUPRÈS DE SENASA PÉROU ENTRE LE ${fmtU(subDays(d.fecha_viaje, 2))} ET LE ${fmtU(subDays(d.fecha_viaje, 1))}.`, fontSize: 7 }
            ],
            margin: [10, 10, 8, 10]
          },
          {
            stack: [
              { text: 'UNE QUESTION?',                              fontSize: 8, bold: true, color: '#111827', alignment: 'center' },
              { text: 'ÉCRIVEZ-NOUS 24H · TOUTE LANGUE', fontSize: 7, bold: true, color: '#111827', alignment: 'center', margin: [0, 2, 0, 4] },
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

    // PAGE 2
    content.push({ text: '', pageBreak: 'before' });

    // 7 · CHECKLIST DU JOUR DU VOYAGE
    content.push(secTitle('CHECKLIST DU JOUR DU VOYAGE', 0));
    content.push({
      table: {
        widths: ['33.3%', '33.3%', '33.4%'],
        body: [[
          {
            stack: [
              { text: 'DOCUMENTS (ORIGINAUX + COPIES)', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '■  Certificat sanitaire / d\'exportation',     fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Carnet de vaccination complet',             fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Certificat d\'implantation micropuce',      fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Résultats test de titration FAVN',     fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Passeport ou permis d\'exportation',        fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '       (selon exigence de destination)',            fontSize: 6.5, color: '#64748B' }
            ],
            margin: [8, 8, 8, 8]
          },
          {
            stack: [
              { text: 'TRANSPORTEUR — RÈGLES IATA', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '■  Caisse IATA correctement ventilée',      fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Literie absorbante dans la caisse',          fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Distributeur d\'eau anti-renversement',      fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Jeûne 4–6 h avant le départ', fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Aucun objet en vrac dans la caisse',         fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '■  Caisse étiquetée avec les coordonnées', fontSize: 6.5, margin: [0, 2, 0, 0] }
            ],
            margin: [8, 8, 8, 8]
          },
          {
            stack: [
              { text: 'CONSEILS', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '→  Arriver à l\'aéroport 4–5 h avant',  fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  Confirmer la politique animaux 48h',          fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  Vérifier la météo à destination', fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  Consulter le vétérinaire 24–48h avant', fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '→  Ne jamais séder sans accord vét.',  fontSize: 6.5, margin: [0, 2, 0, 0] }
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

    // 8 · CALENDRIER VISUEL
    content.push(secTitle('CALENDRIER DE CONFORMITÉ — VUE D\'ENSEMBLE'));

    const nodes = [];
    if (dest.microchip && dest.microchip.es_bloqueante) {
      nodes.push({ label: 'MICROPUCE',                  date: d.microchip.fecha ? fmtU(d.microchip.fecha) : '—', status: d.microchip.tiene ? 'cleared' : 'pending' });
    }
    nodes.push({ label: 'VACCIN ANTIRABIQUE',           date: d.vacuna.fecha   ? fmtU(d.vacuna.fecha)    : '—', status: vacClear     ? 'cleared' : 'pending' });
    if (favsRequired) {
      nodes.push({ label: 'TEST FAVN',                  date: '—', status: !favsBlocked ? 'cleared' : 'pending' });
    }
    nodes.push({ label: 'CERTIFICAT VÉT.',         date: fmtU(subDays(d.fecha_viaje, 5)), status: 'pending' });
    nodes.push({ label: 'JOUR DU VOYAGE',               date: fmtU(d.fecha_viaje),             status: 'flight'  });

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
          text: 'DOCUMENT GÉNÉRÉ PAR L\'ALGORITHME BORDERCHECK · ZOOVET TRAVEL · zoovettravel.com',
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
    if (p.get('mc') === '1') { f.microchip.value = 'si'; $('#fecha_microchip').disabled = false; $('#fecha_microchip').value = p.get('fmc') || ''; }
    if (p.get('vc') === '1') { f.vacuna.value = 'si'; $('#fecha_vacuna').disabled = false; $('#fecha_vacuna').value = p.get('fvc') || ''; }
    if (p.get('dp') === '1') { f.desparasi