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
      ['fecha_microchip', 'fecha_vacuna', 'fecha_desparasitacion'].forEach(id => { $(`#${id}`).disabled = true; });
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
      desparasitacion: { tiene: f.desparasitacion.value === 'si', fecha: f.desparasitacion.value === 'si' && f.fecha_desparasitacion.value ? new Date(f.fecha_desparasitacion.value + 'T12:00:00') : null }
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
        ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
        ejeE.issues.push({
          severity: 'yellow',
          msg: `Puce absente. ${dest.codigo_iso} l'exige comme condition bloquante. Implantation immédiate requise.`,
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
      const diasEsperaFAVN = dest.titer_test.dias_antes_viaje_minimo || reglas.favn_dias_espera_general;
      const especieLabel = d.especie === 'perro' ? 'Pour les chiens' : d.especie === 'gato' ? 'Pour les chats' : '';
      if (diasAlViaje < diasEsperaFAVN) {
        ejeC.status = 'fail';
        ejeC.issues.push({
          severity: 'red',
          msg: `${dest.codigo_iso} exige le test FAVN/sérologique avec un délai d'attente de ${diasEsperaFAVN} jours depuis le prélèvement. Il ne reste que ${diasAlViaje} jours. Bloquant temporel.`,
          topic: 'favn'
        });
      } else if (diasAlViaje < (diasEsperaFAVN + 30)) {
        ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
        ejeC.issues.push({
          severity: 'yellow',
          msg: `Délai FAVN serré${especieLabel ? ' (' + especieLabel + ')' : ''}. Prélever AUJOURD'HUI (${fmtDate(today())}) — l'échantillon doit partir, les résultats revenir et être visés.`,
          topic: 'favn-justo'
        });
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

    if (dest.titer_test && dest.titer_test.es_bloqueante) {
      const diasEspera = dest.titer_test.dias_antes_viaje_minimo;
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
    const colorMap = { green: ['#10b981', 'VERT', '✓ VOYAGE RÉALISABLE'], yellow: ['#f59e0b', 'ORANGE', '⚠ ZONE GRISE — DÉCISION OFFICIELLE'], red: ['#dc2626', 'ROUGE', '⛔ NON RÉALISABLE — ACTION URGENTE'] };
    const [colorHex, colorLabel, colorTitle] = colorMap[r.color];
    const allIssues = [...r.ejes.E.issues, ...r.ejes.C.issues, ...r.ejes.P.issues];

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 80],
      info: {
        title: `Plan de voyage · ${d.nombre} → ${destinoLabel}`,
        author: 'Carlos Eduardo Ravello Joo',
        subject: 'Plan zoosanitaire d\'exportation internationale d\'animal',
        creator: 'Planificateur de Voyage pour Animaux · Zoovet Travel'
      },
      footer: (currentPage, pageCount) => ({
        margin: [40, 20, 40, 0],
        stack: [
          { text: 'Informations indicatives. Ne remplace pas un avis vétérinaire ni une décision officielle. Vérifier toujours auprès du SENASA Pérou et de l\'autorité du pays de destination avant de voyager.', fontSize: 7, color: '#666', alignment: 'center', margin: [0,0,0,4] },
          { columns: [
            { text: `Généré le ${fmtDate(today())} · Planificateur v${VERSION}`, fontSize: 7, color: '#999' },
            { text: `Page ${currentPage} sur ${pageCount}`, fontSize: 7, color: '#999', alignment: 'center' },
            { text: 'Conception : Carlos Ravello Joo · carlosravello.com', fontSize: 7, color: '#999', alignment: 'right' }
          ]}
        ]
      }),
      content: buildPDFContent(d, r, destinoLabel, colorHex, colorLabel, colorTitle, allIssues),
      defaultStyle: { font: 'Roboto', fontSize: 10, color: '#1a2e35' },
      styles: {
        h1: { fontSize: 22, bold: true, color: '#1a2e35', margin: [0, 0, 0, 8] },
        h2: { fontSize: 14, bold: true, color: '#0C789E', margin: [0, 16, 0, 8] },
        small: { fontSize: 8, color: '#666' },
        label: { fontSize: 8, color: '#999', bold: true }
      }
    };

    pdfMake.createPdf(docDefinition).download(`plan-voyage-${slug(d.nombre)}-${slug(destinoLabel)}.pdf`);
  }

  function buildPDFContent(d, r, destinoLabel, colorHex, colorLabel, colorTitle, allIssues) {
    const content = [];

    content.push(
      { text: 'ZOOVET TRAVEL', fontSize: 18, bold: true, color: '#1a2e35', characterSpacing: 4, alignment: 'center', margin: [0, 0, 0, 4] },
      { text: 'Centre médical vétérinaire · 12+ ans d\'exportation internationale d\'animaux', fontSize: 9, color: '#666', alignment: 'center', margin: [0, 0, 0, 30] },
      { text: 'PLAN DE VOYAGE INTERNATIONAL', fontSize: 12, bold: true, color: '#0C789E', characterSpacing: 2, alignment: 'center', margin: [0, 0, 0, 16] },
      { canvas: [{ type: 'rect', x: 80, y: 0, w: 360, h: 90, color: colorHex }], margin: [0, 0, 0, -90] },
      { text: colorTitle, fontSize: 18, bold: true, color: 'white', alignment: 'center', margin: [0, 36, 0, 0] },
      { text: `Feu de signalisation : ${colorLabel}`, fontSize: 10, color: 'white', alignment: 'center', margin: [0, 0, 0, 30] },
      { text: ' ', margin: [0, 12, 0, 0] },
      { table: {
        widths: ['*', '*'],
        body: [
          [{ text: 'ANIMAL', style: 'label' }, { text: 'DESTINATION', style: 'label' }],
          [{ text: `${d.nombre} (${d.especie}, ${d.raza})`, fontSize: 12, bold: true }, { text: destinoLabel, fontSize: 12, bold: true }],
          [{ text: 'ÂGE AU VOYAGE', style: 'label', margin: [0,8,0,0] }, { text: 'DATE DE VOYAGE', style: 'label', margin: [0,8,0,0] }],
          [{ text: `${r.edadAlViaje} semaines`, fontSize: 11 }, { text: fmtDate(d.fecha_viaje), fontSize: 11 }],
          [{ text: 'POIDS', style: 'label', margin: [0,8,0,0] }, { text: 'JOURS AVANT LE VOYAGE', style: 'label', margin: [0,8,0,0] }],
          [{ text: `${d.peso} kg`, fontSize: 11 }, { text: `${r.diasAlViaje} jours`, fontSize: 11 }]
        ]
      }, layout: 'noBorders', margin: [0, 16, 0, 16] },
      { text: 'INDICE DE COHÉRENCE DYNAMIQUE (ICD-Travel)', style: 'label', alignment: 'center' },
      { text: `${r.icdScore.total}/100`, fontSize: 32, bold: true, color: colorHex, alignment: 'center' },
      { text: `Axe E (Physiologique) : ${r.icdScore.E}  ·  Axe C (Information) : ${r.icdScore.C}  ·  Axe P (Directionnel) : ${r.icdScore.P}`, fontSize: 9, color: '#666', alignment: 'center', margin: [0, 0, 0, 16] }
    );

    if (r.color !== 'red') {
      content.push({ text: '', pageBreak: 'after' });
      content.push({ text: 'CALENDRIER INVERSÉ', style: 'h2' });
      content.push({ text: 'Actions à exécuter dans l\'ordre, comptées à rebours depuis la date de voyage :', fontSize: 9, color: '#666', margin: [0,0,0,12] });
      const tableBody = [
        [{ text: 'DATE', style: 'label', fillColor: '#F8FAFC' }, { text: 'ACTION', style: 'label', fillColor: '#F8FAFC' }, { text: 'AUTORITÉ', style: 'label', fillColor: '#F8FAFC' }]
      ];
      r.timeline.forEach(t => {
        tableBody.push([
          { text: fmtDate(t.date), fontSize: 9, color: '#0C789E', bold: true },
          { text: t.task, fontSize: 9 },
          { text: t.org, fontSize: 8, color: '#666' }
        ]);
      });
      content.push({ table: { widths: ['auto', '*', 'auto'], body: tableBody }, layout: 'lightHorizontalLines' });

      content.push({ text: '', pageBreak: 'after' });
      content.push({ text: 'LISTE DE CONTRÔLE DOCUMENTAIRE', style: 'h2' });
      content.push({ text: 'Cocher au fur et à mesure de l\'obtention :', fontSize: 9, color: '#666', margin: [0,0,0,12] });
      const checklist = [
        '☐ Puce ISO 11784/11785 implantée et fonctionnelle',
        '☐ Vaccin antirabique valide (minimum 30 jours avant le voyage)',
        '☐ Carnet de vaccinations complet, signé par un vétérinaire agréé'
      ];
      if (r.destinoData.titer_test && r.destinoData.titer_test.es_bloqueante) {
        checklist.push('☐ Test FAVN/sérologique en laboratoire agréé (≥0,5 UI/ml)');
      }
      if (r.destinoData.desparasitacion && r.destinoData.desparasitacion.es_bloqueante) {
        checklist.push(`☐ Déparasitage documenté (${r.destinoData.desparasitacion.producto_especifico || 'standard'})`);
      }
      checklist.push(
        '☐ Certificat de santé émis par vétérinaire agréé (valable 5 jours)',
        '☐ CZE visé par SENASA Pérou',
        '☐ Réservation de voyage confirmée'
      );
      if (r.destinoData.permiso_importacion && r.destinoData.permiso_importacion.es_bloqueante) {
        checklist.push(`☐ Permis d'importation obtenu (${r.destinoData.permiso_importacion.producto_especifico || ''})`);
      }
      if (r.destinoData.cuarentena && r.destinoData.cuarentena.es_bloqueante) {
        checklist.push(`☐ Quarantaine à l'arrivée réservée (${r.destinoData.cuarentena.producto_especifico || ''})`);
      }
      checklist.forEach(item => content.push({ text: item, fontSize: 10, margin: [0, 4, 0, 0] }));

      content.push({ text: 'SOURCE OFFICIELLE DU PAYS DE DESTINATION', style: 'h2' });
      content.push({ text: r.destinoData.fuente_oficial.nombre, fontSize: 10, bold: true });
      content.push({ text: r.destinoData.fuente_oficial.url, fontSize: 9, color: '#0C789E' });
      content.push({ text: `Consulté le : ${r.destinoData.fuente_oficial.fecha_consulta}`, style: 'small' });
    }

    content.push({ text: '', pageBreak: 'after' });
    content.push({ text: 'DIAGNOSTIC', style: 'h2' });
    if (allIssues.length === 0) {
      content.push({ text: 'Aucune observation critique. Votre voyage satisfait à toutes les exigences.', fontSize: 10, color: '#10b981' });
    } else {
      allIssues.forEach(i => {
        const c = i.severity === 'red' ? '#dc2626' : i.severity === 'yellow' ? '#f59e0b' : '#1a2e35';
        content.push({ text: `• ${i.msg}`, fontSize: 9, color: c, margin: [0, 4, 0, 0] });
      });
    }

    content.push({ text: r.color === 'red' ? '⚠ ACTION URGENTE' : '📞 PROCHAINE ÉTAPE', style: 'h2' });
    if (r.color === 'red') {
      content.push({ text: 'Ne prenez pas de décision sans nous. Contactez-nous MAINTENANT et nous évaluerons les options réelles : reporter la date, changer de destination, ajuster le plan.', fontSize: 11, color: '#dc2626', bold: true, margin: [0, 0, 0, 8] });
      content.push({ text: 'WhatsApp urgence : +51 922 083 707', fontSize: 14, color: '#0C789E', bold: true });
    } else {
      content.push({ text: 'Coordonnez l\'exécution de votre plan avec notre équipe :', fontSize: 11, margin: [0, 0, 0, 8] });
      content.push({ text: 'WhatsApp consultations : +51 979 620 402', fontSize: 14, color: '#0C789E', bold: true });
    }
    content.push({ text: 'Calle Cuba 241, Trujillo · Lun–Sam 09h00–19h00 · contacto@zoovettravel.com', style: 'small', margin: [0, 4, 0, 0] });

    content.push({ text: 'AVERTISSEMENT JURIDIQUE', style: 'h2' });
    content.push({ text: 'Cet outil est strictement informatif et indicatif. Il ne constitue pas un avis vétérinaire, ne remplace pas la consultation d\'un vétérinaire agréé et ne se substitue pas à la vérification directe auprès du SENASA Pérou et de l\'autorité sanitaire du pays de destination. Les réglementations zoosanitaires internationales peuvent changer sans préavis et la décision finale concernant l\'admission de tout animal appartient exclusivement aux officiels sanitaires et douaniers du pays de destination.', fontSize: 8, color: '#666', alignment: 'justify' });

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
    if (p.get('mc') === '1') { f.microchip.value = 'si'; $('#fecha_microchip').disabled = false; $('#fecha_microchip').value = p.get('fmc') || ''; }
    if (p.get('vc') === '1') { f.vacuna.value = 'si'; $('#fecha_vacuna').disabled = false; $('#fecha_vacuna').value = p.get('fvc') || ''; }
    if (p.get('dp') === '1') { f.desparasitacion.value = 'si'; $('#fecha_desparasitacion').disabled = false; $('#fecha_desparasitacion').value = p.get('fdp') || ''; }
  }

  function sharePlan() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Mon plan de voyage · Zoovet Travel', url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('URL du plan copiée dans le presse-papiers.');
      });
    }
  }

})();
