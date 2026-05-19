/* ════════════════════════════════════════════════════════════════════
   Pet Travel Planner — Vanilla JS logic (EN)
   Architecture & design: Carlos Eduardo Ravello Joo · carlosravello.com
   Field application of the Dynamic Coherence Model (MCD)
   ICD-Travel = Dynamic Coherence Index applied to zoosanitary travel
   ════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── Global state ───
  let RULES = null;
  let CURRENT_RESULT = null;

  // ─── Constants ───
  const WA_URGENT = '51922083707';   // Red
  const WA_DEFAULT = '51979620402';  // Green/Amber
  const VERSION = '1.0.0';
  const PLANNER_URL = 'https://zoovettravel.com/pet-travel-planner/';
  const ZOOVET_LOGO_URL = 'https://zoovettravel.com/images/zoovet-logo.png';

  // ─── Utils ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const fmtDate = (d) => {
    if (!(d instanceof Date) || isNaN(d)) return '—';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  const fmtDateISO = (d) => d.toISOString().split('T')[0];
  const daysBetween = (a, b) => Math.round((b - a) / (1000 * 60 * 60 * 24));
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
  const subDays = (d, n) => addDays(d, -n);
  const today = () => { const t = new Date(); t.setHours(0,0,0,0); return t; };
  const slug = (s) => s.toLowerCase().replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i').replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

  // ═════════════════════════════════════════════════════════════════
  // INITIAL LOAD
  // ═════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const res = await fetch('../planificador-viaje-mascota/rules.json?v=1.1.1');
      RULES = await res.json();
      populateDestinos();
      setupForm();
      restoreFromURL();
    } catch (err) {
      console.error('Could not load rules.json:', err);
      $('#planner-form').innerHTML = '<p class="text-red-600 text-sm">Error: could not load the rules database. Please reload the page or contact Zoovet Travel.</p>';
    }
  });

  // ─── Populate destination select (alphabetical, readable labels) ───
  function populateDestinos() {
    const sel = $('#destino');
    const labels = {
      'Alemania': 'Germany', 'Argentina': 'Argentina', 'Australia': 'Australia',
      'Brasil': 'Brazil', 'Canadá': 'Canada', 'Chile': 'Chile', 'China': 'China',
      'Colombia': 'Colombia', 'Corea_del_Sur': 'South Korea', 'EAU': 'United Arab Emirates',
      'España': 'Spain', 'Estados_Unidos': 'United States', 'Francia': 'France',
      'India': 'India', 'Italia': 'Italy', 'Japón': 'Japan', 'México': 'Mexico',
      'Nueva_Zelanda': 'New Zealand', 'Reino_Unido': 'United Kingdom', 'Rusia': 'Russia',
      'Singapur': 'Singapore', 'Sudáfrica': 'South Africa'
    };
    const keys = Object.keys(RULES.destinos).sort((a, b) => labels[a].localeCompare(labels[b]));
    keys.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = labels[k] || k;
      sel.appendChild(opt);
    });
  }

  // ─── Form setup: conditional dates + submit ───
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

  // ─── Collect form data ───
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
      alert('Please fill in all required fields.');
      return false;
    }
    if (d.fecha_viaje < today()) {
      alert('Travel date cannot be in the past.');
      return false;
    }
    return true;
  }

  // ═════════════════════════════════════════════════════════════════
  // TRAFFIC LIGHT COMPUTATION — ICD-Travel (MCD applied)
  // Three axes:
  //  E (Energy/Physiological): legal age + microchip + vaccine within deadline
  //  C (Cognition/Information): documents + health cert + SENASA endorsement feasible
  //  P (Purpose/Directional): destination + date = global temporal feasibility
  // Final color = worst of the three (absolute red override if age)
  // ═════════════════════════════════════════════════════════════════
  function computeSemaforo(d) {
    const dest = RULES.destinos[d.destino];
    const reglas = RULES.metadata.reglas_origen_peru;
    const diasAlViaje = daysBetween(today(), d.fecha_viaje);
    const edadSemanas = d.edad_meses * 4.345;
    const edadAlViaje = edadSemanas + (diasAlViaje / 7);

    // ── AXIS E: Energy / Physiological ──
    const ejeE = { issues: [], status: 'ok' };

    if (edadAlViaje < dest.edad_minima_semanas) {
      ejeE.status = 'fail';
      ejeE.issues.push({
        severity: 'red',
        msg: `Your pet will be ${edadAlViaje.toFixed(1)} weeks old on travel day. ${dest.codigo_iso} requires a minimum of ${dest.edad_minima_semanas} weeks. Insufficient age: biological blocker.`,
        topic: 'edad'
      });
    }

    if (dest.microchip.es_bloqueante && !d.microchip.tiene) {
      if (d.vacuna.tiene && diasAlViaje < (reglas.vacuna_dias_antes_viaje_minimo + 14)) {
        ejeE.status = 'fail';
        ejeE.issues.push({
          severity: 'red',
          msg: `Microchip absent and vaccine already applied. ${dest.codigo_iso} requires microchip BEFORE vaccine: re-vaccination needed but no time available.`,
          topic: 'microchip-orden'
        });
      } else {
        ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
        ejeE.issues.push({
          severity: 'yellow',
          msg: `Microchip absent. ${dest.codigo_iso} requires it as a blocker. Immediate implantation required.`,
          topic: 'microchip'
        });
      }
    }

    if (dest.vacuna_antirrabica.es_bloqueante) {
      if (!d.vacuna.tiene) {
        if (diasAlViaje < 21) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Rabies vaccine not applied. Only ${diasAlViaje} days to travel (absolute minimum: 21 days, recommended: 30).`, topic: 'vacuna' });
        } else if (diasAlViaje < 30) {
          ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
          ejeE.issues.push({ severity: 'yellow', msg: `Vaccine not applied and only ${diasAlViaje} days left. Amber zone: subject to the officer's discretion.`, topic: 'vacuna-zona-ambar' });
        } else {
          ejeE.issues.push({ severity: 'info', msg: `Vaccine pending. Apply BEFORE ${fmtDate(subDays(d.fecha_viaje, 30))} to meet the 30-day requirement.`, topic: 'vacuna-pendiente' });
        }
      } else {
        const diasDesdeVacuna = daysBetween(d.vacuna.fecha, d.fecha_viaje);
        if (diasDesdeVacuna < 21) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vaccine applied too recently relative to travel date (${diasDesdeVacuna} days). SENASA requires at least 30 days.`, topic: 'vacuna-tarde' });
        } else if (diasDesdeVacuna < 30) {
          ejeE.status = ejeE.status === 'fail' ? 'fail' : 'warn';
          ejeE.issues.push({ severity: 'yellow', msg: `Vaccine applied ${diasDesdeVacuna} days ago. Grey zone (21-29): subject to officer's discretion — in practice, almost always NO.`, topic: 'vacuna-gris' });
        }
        if (diasDesdeVacuna > (dest.vacuna_antirrabica.dias_vigencia_maxima || 365)) {
          ejeE.status = 'fail';
          ejeE.issues.push({ severity: 'red', msg: `Vaccine expired (${diasDesdeVacuna} days elapsed). Maximum validity: ${dest.vacuna_antirrabica.dias_vigencia_maxima} days.`, topic: 'vacuna-vencida' });
        }
      }
    }

    // ── AXIS C: Cognition / Information ──
    const ejeC = { issues: [], status: 'ok' };

    // Australia — direct import from Peru not allowed
    if (dest.importacion_directa_desde_peru === false) {
      ejeC.status = 'fail';
      ejeC.issues.push({
        severity: 'red',
        msg: `Australia does NOT accept direct import from Peru. Peru is a non-approved country under DAFF rules. Prior residence of at least 6 months in an approved Group 3 country (USA, UK, Germany, etc.) is required. Total process: minimum 12 months. Contact Zoovet Travel to explore alternative routes.`,
        topic: 'australia-no-directo'
      });
    }

    // Valid entry airports (USA, Japan, New Zealand)
    if (dest.aeropuertos_validos && dest.aeropuertos_validos.length > 0) {
      ejeC.issues.push({
        severity: 'info',
        msg: `${dest.codigo_iso} only accepts pets through these airports: ${dest.aeropuertos_validos.join(', ')}. Verify your flight before purchasing tickets.`,
        topic: 'aeropuerto'
      });
    }

    // FAVN/Titer — species-aware
    const favcBloqueante = (() => {
      if (!dest.titer_test) return false;
      if (d.especie === 'perro' && dest.titer_test.es_bloqueante_perro !== undefined) return dest.titer_test.es_bloqueante_perro;
      if (d.especie === 'gato' && dest.titer_test.es_bloqueante_gato !== undefined) return dest.titer_test.es_bloqueante_gato;
      return dest.titer_test.es_bloqueante;
    })();
    if (dest.titer_test && favcBloqueante) {
      const diasEsperaFAVN = dest.titer_test.dias_antes_viaje_minimo || reglas.favn_dias_espera_general;
      const especieLabel = d.especie === 'perro' ? 'For dogs' : d.especie === 'gato' ? 'For cats' : '';
      if (diasAlViaje < diasEsperaFAVN) {
        ejeC.status = 'fail';
        ejeC.issues.push({
          severity: 'red',
          msg: `${dest.codigo_iso} requires FAVN/titer test with a ${diasEsperaFAVN}-day waiting period from sample collection. Only ${diasAlViaje} days remain. Temporal blocker.`,
          topic: 'favn'
        });
      } else if (diasAlViaje < (diasEsperaFAVN + 30)) {
        ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
        ejeC.issues.push({
          severity: 'yellow',
          msg: `Tight FAVN deadline${especieLabel ? ' (' + especieLabel + ')' : ''}. Collect sample TODAY (${fmtDate(today())}) — sample must be sent, results returned and endorsed.`,
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
          msg: `${dest.codigo_iso} requires an official Import Permit (${dest.permiso_importacion.producto_especifico || ''}). Insufficient time to process (${diasNecesarios} days required).`,
          topic: 'permiso'
        });
      }
    }

    if (dest.cuarentena && dest.cuarentena.es_bloqueante) {
      ejeC.issues.push({
        severity: 'info',
        msg: `${dest.codigo_iso} requires post-arrival quarantine: ${dest.cuarentena.producto_especifico || 'variable duration'}. Book facility well in advance.`,
        topic: 'cuarentena'
      });
    }

    if (dest.desparasitacion && dest.desparasitacion.es_bloqueante) {
      const diasReq = dest.desparasitacion.dias_antes_viaje_minimo || 0;
      if (!d.desparasitacion.tiene && diasAlViaje < diasReq) {
        ejeC.status = ejeC.status === 'fail' ? 'fail' : 'warn';
        ejeC.issues.push({ severity: 'yellow', msg: `Deworming pending and timeline is tight (${dest.desparasitacion.producto_especifico || 'standard'}).`, topic: 'desparasitacion' });
      }
    }

    // ── AXIS P: Purpose / Directional ──
    const ejeP = { issues: [], status: 'ok' };

    if (diasAlViaje < 30) {
      ejeP.status = 'warn';
      ejeP.issues.push({ severity: 'yellow', msg: `Only ${diasAlViaje} days to travel. Any setback will be unrecoverable.`, topic: 'tiempo' });
    }
    if (diasAlViaje < 7) {
      ejeP.status = 'fail';
      ejeP.issues.push({ severity: 'red', msg: `Only ${diasAlViaje} days to travel. Impossible to complete SENASA paperwork + endorsement.`, topic: 'tiempo-critico' });
    }

    // ── Final traffic light color ──
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
  // REVERSE TIMELINE
  // ═════════════════════════════════════════════════════════════════
  function generarTimeline(d, dest, reglas) {
    const fv = d.fecha_viaje;
    const tasks = [];

    tasks.push({ date: fv, task: `✈ Travel to ${d.destino.replace(/_/g, ' ')}`, org: 'Airport', status: 'final' });
    tasks.push({ date: subDays(fv, 1), task: 'CZE endorsement at SENASA Peru', org: 'SENASA Peru', status: 'pending' });
    tasks.push({ date: subDays(fv, reglas.certificado_salud_dias_vigencia), task: `Health Certificate issued (valid for ${reglas.certificado_salud_dias_vigencia} days)`, org: 'Licensed Veterinarian', status: 'pending' });

    if (dest.desparasitacion && dest.desparasitacion.es_bloqueante && dest.desparasitacion.dias_antes_viaje_minimo) {
      tasks.push({ date: subDays(fv, dest.desparasitacion.dias_antes_viaje_minimo), task: `Mandatory deworming (${dest.desparasitacion.producto_especifico || 'standard'})`, org: 'Veterinarian', status: 'pending' });
    }

    if (dest.titer_test && dest.titer_test.es_bloqueante) {
      const diasEspera = dest.titer_test.dias_antes_viaje_minimo;
      tasks.push({ date: subDays(fv, diasEspera), task: `FAVN/Titer test — sample collection (${diasEspera}-day wait required)`, org: 'Zoovet Travel + KSVDL', status: 'pending' });
    }

    tasks.push({ date: subDays(fv, reglas.vacuna_dias_antes_viaje_minimo), task: 'Rabies vaccine (minimum 30 days before travel)', org: 'Veterinarian', status: 'pending' });

    if (dest.microchip.es_bloqueante) {
      tasks.push({ date: subDays(fv, reglas.vacuna_dias_antes_viaje_minimo + 1), task: 'ISO microchip implantation (before vaccine)', org: 'Veterinarian', status: 'pending' });
    }

    if (dest.permiso_importacion && dest.permiso_importacion.es_bloqueante) {
      tasks.push({ date: subDays(fv, dest.permiso_importacion.dias_antes_viaje_minimo), task: `Request Import Permit (${dest.permiso_importacion.producto_especifico || ''})`, org: dest.fuente_oficial.nombre, status: 'pending' });
    }

    return tasks.sort((a, b) => a.date - b.date);
  }

  // ═════════════════════════════════════════════════════════════════
  // RENDER RESULT
  // ═════════════════════════════════════════════════════════════════
  function renderResult(d, r) {
    const c = $('#semaforo-container');
    c.className = `border-2 p-6 sm:p-8 shadow-md ${r.color}-result bg-white`;

    // Update floating WhatsApp button based on traffic light
    const floatBtn = document.getElementById('whatsapp-float');
    if (floatBtn) {
      floatBtn.href = r.color === 'red'
        ? `https://wa.me/${WA_URGENT}`
        : `https://wa.me/${WA_DEFAULT}`;
      floatBtn.setAttribute('aria-label',
        r.color === 'red' ? 'WhatsApp emergency Zoovet Travel' : 'WhatsApp consultation Zoovet Travel');
    }

    const colorMap = { green: 'GREEN', yellow: 'AMBER', red: 'RED' };
    const colorLabel = colorMap[r.color];
    const destinoLabel = $('#destino').options[$('#destino').selectedIndex].text;

    let html = `
      <div class="text-center mb-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-[#1a2e35]/60 mb-2">Result for ${d.nombre} → ${destinoLabel}</p>
        <h3 class="text-2xl sm:text-3xl font-bold text-[#1a2e35] mb-4">Travel in ${r.diasAlViaje} days — Date: ${fmtDate(d.fecha_viaje)}</h3>
      </div>
      <div class="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
        <div class="text-center">
          <div class="semaforo-light red ${r.color === 'red' ? 'active' : ''}">!</div>
          <p class="text-xs mt-2 ${r.color === 'red' ? 'font-bold text-red-700' : 'text-[#1a2e35]/40'}">RED</p>
        </div>
        <div class="text-center">
          <div class="semaforo-light yellow ${r.color === 'yellow' ? 'active' : ''}">⚠</div>
          <p class="text-xs mt-2 ${r.color === 'yellow' ? 'font-bold text-yellow-700' : 'text-[#1a2e35]/40'}">AMBER</p>
        </div>
        <div class="text-center">
          <div class="semaforo-light green ${r.color === 'green' ? 'active' : ''}">✓</div>
          <p class="text-xs mt-2 ${r.color === 'green' ? 'font-bold text-green-700' : 'text-[#1a2e35]/40'}">GREEN</p>
        </div>
      </div>

      <div class="text-center mb-6">
        <p class="icd-score" style="color: ${r.color === 'red' ? '#dc2626' : r.color === 'yellow' ? '#f59e0b' : '#10b981'}">${r.icdScore.total}<span class="text-lg text-[#1a2e35]/40 font-normal">/100</span></p>
        <p class="text-xs uppercase tracking-widest text-[#1a2e35]/50 mt-1">Dynamic Coherence Index · ICD-Travel · ${colorLabel} Light</p>
      </div>

      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="icd-eje">
          <div class="icd-eje-label">Axis E · Physiological</div>
          <div class="icd-eje-value">${r.icdScore.E}</div>
          <div class="icd-eje-status ${r.ejes.E.status === 'ok' ? 'ok' : r.ejes.E.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.E.status === 'ok' ? 'OK' : r.ejes.E.status === 'warn' ? 'WARNING' : 'FAIL'}</div>
        </div>
        <div class="icd-eje">
          <div class="icd-eje-label">Axis C · Information</div>
          <div class="icd-eje-value">${r.icdScore.C}</div>
          <div class="icd-eje-status ${r.ejes.C.status === 'ok' ? 'ok' : r.ejes.C.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.C.status === 'ok' ? 'OK' : r.ejes.C.status === 'warn' ? 'WARNING' : 'FAIL'}</div>
        </div>
        <div class="icd-eje">
          <div class="icd-eje-label">Axis P · Directional</div>
          <div class="icd-eje-value">${r.icdScore.P}</div>
          <div class="icd-eje-status ${r.ejes.P.status === 'ok' ? 'ok' : r.ejes.P.status === 'warn' ? 'warn' : 'fail'}">${r.ejes.P.status === 'ok' ? 'OK' : r.ejes.P.status === 'warn' ? 'WARNING' : 'FAIL'}</div>
        </div>
      </div>
    `;

    const allIssues = [...r.ejes.E.issues, ...r.ejes.C.issues, ...r.ejes.P.issues];
    if (allIssues.length) {
      html += `<div class="bg-[#F8FAFC] border border-[#1a2e35]/10 p-4 mb-6"><p class="text-xs font-bold uppercase tracking-widest text-[#1a2e35]/60 mb-3">Diagnosis</p><ul class="space-y-2">`;
      allIssues.forEach(i => {
        const icon = i.severity === 'red' ? '🔴' : i.severity === 'yellow' ? '🟡' : 'ℹ️';
        html += `<li class="text-sm text-[#1a2e35]/85 flex gap-2"><span>${icon}</span><span>${i.msg}</span></li>`;
      });
      html += '</ul></div>';
    }

    if (r.color === 'red') {
      html += `
        <div class="urgent-cta">
          <h3>⚠ Urgent action required</h3>
          <p class="mb-4 text-sm">${d.nombre}'s timeline to ${destinoLabel} has blockers that CANNOT be solved by improvisation. Contact us NOW to evaluate real options: postpone date, change destination, or adjust the plan.</p>
          <a href="https://wa.me/${WA_URGENT}?text=${encodeURIComponent(`Hello Zoovet Travel, I need urgent help. My pet ${d.nombre} (${d.especie}) is scheduled to travel to ${destinoLabel} on ${fmtDate(d.fecha_viaje)} and the planner gave me a red light.`)}" target="_blank" rel="noopener noreferrer" class="btn">Call +51 922 083 707</a>
          <a href="https://wa.me/${WA_URGENT}?text=${encodeURIComponent(`I want to speak with a Zoovet Travel specialist about ${d.nombre}'s case → ${destinoLabel}.`)}" target="_blank" rel="noopener noreferrer" class="btn">Direct WhatsApp</a>
          <p class="text-xs mt-3 opacity-90">Veterinary team available Mon–Sat 09:00–19:00 (Peru)</p>
        </div>
      `;
    } else {
      html += `<h4 class="text-lg font-bold text-[#1a2e35] mt-6 mb-3">Reverse timeline</h4>`;
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
          <button id="btn-pdf" class="bg-[#0C789E] text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#0a6a8a] transition-colors">📄 Download PDF plan</button>
          <a href="https://wa.me/${WA_DEFAULT}?text=${encodeURIComponent(`Hello Zoovet Travel, I want to coordinate ${d.nombre}'s travel to ${destinoLabel} (${fmtDate(d.fecha_viaje)}).`)}" target="_blank" rel="noopener noreferrer" class="bg-[#25D366] text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#22b85b] transition-colors">💬 Coordinate via WhatsApp</a>
          <button id="btn-share" class="border border-[#0C789E] text-[#0C789E] font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-[#0C789E] hover:text-white transition-colors">🔗 Copy plan URL</button>
        </div>
      `;
    }

    html += `<p class="text-xs text-[#1a2e35]/50 text-center mt-6 leading-relaxed">Result generated by Planner v${VERSION} · ${fmtDate(today())}. Informational only. Always verify with official authority before traveling.</p>`;

    c.innerHTML = html;
    $('#result-section').classList.remove('hidden');

    $('#btn-pdf')?.addEventListener('click', () => generarPDF(d, r));
    $('#btn-share')?.addEventListener('click', sharePlan);
  }

  // ═════════════════════════════════════════════════════════════════
  // PDF (pdfmake) — BorderCheck Aeronautical Design v2
  // Spec: pdfmake_spec.txt · Design: Antigravity / Carlos Ravello
  // ═════════════════════════════════════════════════════════════════
  function generarPDF(d, r) {
    const destinoLabel = $('#destino').options[$('#destino').selectedIndex].text;

    // ── Spec colour palette ──
    const sem = {
      green:  { bg: '#E8F5E9', fg: '#1E4620', title: 'CLEARED FOR MANIFEST (GREEN)',       sub: 'ALL ZOOSANITARY REQS MET'   },
      yellow: { bg: '#FEFCBF', fg: '#B7791F', title: 'GREY ZONE — OFFICER\'S DISCRETION', sub: 'AMBER · REVIEW REQUIRED'     },
      red:    { bg: '#FFF5F5', fg: '#63171D', title: 'NOT VIABLE — URGENT ACTION',         sub: 'RED · CRITICAL BLOCKERS'    }
    };
    const col = sem[r.color];

    // ── Date formatter: "10 JAN 2024" ──
    const fmtU = (dt) => {
      if (!dt || isNaN(dt)) return '—';
      return dt.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    };

    const refYear = new Date().getFullYear();
    const refId   = `ZVT-BC-${refYear}-${Math.random().toString(36).substr(2,4).toUpperCase()}`;

    // ── Full-width navy header (repeats on every page) ──
    const pageHeader = {
      margin: [0, 0, 0, 0],
      table: {
        widths: ['auto', '*', 'auto'],
        body: [[
          {
            stack: [
              { text: 'ZOOVET TRAVEL', fontSize: 22, bold: true, color: '#FFFFFF' },
              { text: 'BorderCheck · International Pet Relocation Clearance System', fontSize: 8, bold: true, color: '#A99260', margin: [0, 2, 0, 0] },
              { text: 'INTERNATIONAL PET RELOCATION CLEARANCE MANIFEST', fontSize: 6.5, color: '#D1D5DB', margin: [0, 3, 0, 0] }
            ],
            margin: [24, 12, 0, 12],
            border: [false, false, false, false]
          },
          { text: '', border: [false, false, false, false] },
          {
            stack: [
              { text: `REF: ${refId}`,            fontSize: 7, color: '#FFFFFF' },
              { text: `DATE: ${fmtU(today())}`,   fontSize: 7, color: '#FFFFFF' },
              { text: 'STATUS: OFFICIAL MANIFEST',fontSize: 7, color: '#FFFFFF' },
              { text: `DEST: ${destinoLabel.toUpperCase()}`, fontSize: 7, color: '#FFFFFF' }
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
        subject: 'International Pet Relocation Clearance Manifest',
        creator: 'BorderCheck by Zoovet Travel'
      },
      header: () => pageHeader,
      footer: (pg, total) => ({
        margin: [24, 6, 24, 0],
        stack: [
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 547, y2: 0, lineWidth: 1, lineColor: '#A99260' }] },
          { margin: [0, 3, 0, 0], columns: [
            { text: 'Advisory guide only. Confirm with airline and destination authority. zoovettravel.com', fontSize: 6, color: '#64748B' },
            { text: `ZVT-BC-${refYear} // PAGE ${pg} OF ${total}`, fontSize: 7, bold: true, color: '#111827', alignment: 'center' },
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

    // ── Derived status flags (used in both pages) ──
    const vacClear = d.vacuna.tiene && !r.ejes.E.issues.some(i =>
      ['vacuna', 'vacuna-tarde', 'vacuna-vencida'].includes(i.topic) && i.severity === 'red'
    );
    const favsRequired = !!(dest.titer_test && (
      dest.titer_test.es_bloqueante ||
      dest.titer_test.es_bloqueante_perro ||
      dest.titer_test.es_bloqueante_gato
    ));
    const favsBlocked = r.ejes.C.issues.some(i => i.topic === 'favn' && i.severity === 'red');

    // ── Mini helpers ──
    const secTitle = (txt, mt) => ({ text: txt, fontSize: 10, bold: true, color: '#A99260', margin: [0, mt !== undefined ? mt : 14, 0, 5] });
    const lbl      = (txt)     => ({ text: txt, fontSize: 7, bold: true, color: '#A99260' });
    const val      = (txt)     => ({ text: txt, fontSize: 10, bold: true, color: '#111827', margin: [0, 2, 0, 0] });

    // ═══════════════════════════════════
    // PAGE 1
    // ═══════════════════════════════════

    // 1 · STATUS box
    content.push({
      table: {
        widths: ['*', 'auto'],
        body: [[
          { text: `STATUS: ${col.title}`, fontSize: 13, bold: true, color: col.fg, margin: [10, 12, 0, 12] },
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
          text: 'This document is an advisory guide only. Requirements may change without notice — always confirm with your airline and the official veterinary authority of the destination country.',
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

    // 3 · PASSENGER DETAILS
    content.push(secTitle('PASSENGER DETAILS'));
    content.push({
      table: {
        widths: ['*', '*', '*'],
        body: [
          [lbl('NAME / SPECIES / BREED'), lbl('AGE / WEIGHT'), lbl('MICROCHIP ISO (15 DIGITS)')],
          [val(`${d.nombre.toUpperCase()} / ${d.especie.toUpperCase()} / ${d.raza.toUpperCase()}`),
           val(`${d.edad_meses} MONTHS / ${d.peso} KG`),
           val(d.microchip.tiene ? '✓ IMPLANTED' : 'NOT REGISTERED')]
        ]
      },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 4 · ROUTING & DESTINATION
    content.push(secTitle('ROUTING & DESTINATION'));
    content.push({
      table: {
        widths: ['*', '*', '*'],
        body: [
          [lbl('ORIGIN (PORT OF EXIT)'), lbl('DESTINATION (PORT OF ENTRY)'), lbl('INTENDED FLIGHT DATE')],
          [val('PERU (LIM)'), val(destinoLabel.toUpperCase()), val(fmtU(d.fecha_viaje))]
        ]
      },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 5 · COMPLIANCE TIMELINE TABLE
    content.push(secTitle('COMPLIANCE TIMELINE'));

    const statusCell = (ok) => ({ text: ok ? 'CLEARED' : 'PENDING', fontSize: 8, bold: true, color: ok ? '#1E4620' : '#B7791F' });

    const compRows = [[
      { text: 'REQUIREMENT',   fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'STATUS',        fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'ACTION / DETAIL', fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] },
      { text: 'DATE',          fontSize: 7, bold: true, color: '#FFFFFF', fillColor: '#0F1E36', margin: [4,6,4,6] }
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
      addRow('MICROCHIP IMPLANTATION', d.microchip.tiene,
        d.microchip.tiene ? 'PRIOR TO VAX' : 'IMPLANTATION REQUIRED',
        d.microchip.fecha ? fmtU(d.microchip.fecha) : '—');
    }
    addRow('RABIES VACCINATION', vacClear,
      vacClear ? 'VALID >30D, <1Y' : d.vacuna.tiene ? 'CHECK VALIDITY' : 'APPLICATION REQUIRED',
      d.vacuna.fecha ? fmtU(d.vacuna.fecha) : '—');
    if (favsRequired) {
      addRow('FAVN RNATT TITER TEST', !favsBlocked,
        !favsBlocked ? 'TITER: ≥0.5 IU/ML' : 'SAMPLE REQUIRED URGENTLY', '—');
      if (dest.titer_test.dias_antes_viaje_minimo >= 90) {
        addRow(`EU ${dest.titer_test.dias_antes_viaje_minimo}-DAY WAITING PERIOD`,
          r.diasAlViaje > dest.titer_test.dias_antes_viaje_minimo,
          'MIN. ELAPSED POST-TITER', '—');
      }
    }
    addRow('OFFICIAL HEALTH CERTIFICATE', false,
      'VET CONSULT / ISSUE D-5', fmtU(subDays(d.fecha_viaje, 5)));
    addRow('SENASA EXPORT ENDORSEMENT', false,
      'GOV SEAL APPOINTMENT', fmtU(subDays(d.fecha_viaje, 2)));

    content.push({
      table: { widths: ['33%', '15%', '32%', '20%'], body: compRows },
      layout: {
        hLineWidth: () => 0.5, vLineWidth: () => 0.5,
        hLineColor: () => '#E2E8F0', vLineColor: () => '#E2E8F0'
      },
      margin: [0, 0, 0, 10]
    });

    // 6 · MANDATORY NEXT STEPS + QR
    content.push(secTitle('MANDATORY NEXT STEPS'));
    content.push({
      table: {
        widths: ['*', 96],
        body: [[
          {
            stack: [
              { text: '1. OFFICIAL HEALTH CERTIFICATE', fontSize: 8, bold: true, margin: [0, 0, 0, 3] },
              { text: `MUST BE ISSUED BY A REGISTERED VET NO EARLIER THAN ${fmtU(subDays(d.fecha_viaje, 5))} (D-5).`, fontSize: 7, margin: [0, 0, 0, 8] },
              { text: '2. SENASA CZE ENDORSEMENT', fontSize: 8, bold: true, margin: [0, 0, 0, 3] },
              { text: `BOOK APPOINTMENT WITH SENASA PERU BETWEEN ${fmtU(subDays(d.fecha_viaje, 2))} AND ${fmtU(subDays(d.fecha_viaje, 1))}.`, fontSize: 7 }
            ],
            margin: [10, 10, 8, 10]
          },
          {
            stack: [
              { text: 'ANY QUESTION?',                   fontSize: 8, bold: true, color: '#111827', alignment: 'center' },
              { text: 'WRITE TO US 24H · ANY LANGUAGE', fontSize: 7, bold: true, color: '#111827', alignment: 'center', margin: [0, 2, 0, 4] },
              { canvas: [
                { type: 'rect', x: 18, y: 0,  w: 50, h: 50, lineWidth: 1.5, lineColor: '#0F1E36', color: '#F8F9FA' },
                { type: 'rect', x: 23, y: 5,  w: 9,  h: 9,  color: '#0F1E36' },
                { type: 'rect', x: 24, y: 6,  w: 7,  h: 7,  color: '#FFFFFF' },
                { type: 'rect', x: 25, y: 7,  w: 5,  h: 5,  color: '#0F1E36' },
                { type: 'rect', x: 37, y: 5,  w: 3,  h: 3,  color: '#0F1E36' },
                { type: 'rect', x: 41, y: 5,  w: 2,  h: 2,  color: '#0F1E36' },
                { type: 'rect', x: 54, y: 5,  w: 9,  h: 9,  color: '#0F1E36' },
                { type: 'rect', x: 55, y: 6,  w: 7,  h: 7,  color: '#FFFFFF' },
                { type: 'rect', x: 56, y: 7,  w: 5,  h: 5,  color: '#0F1E36' },
                { type: 'rect', x: 23, y: 36, w: 9,  h: 9,  color: '#0F1E36' },
                { type: 'rect', x: 24, y: 37, w: 7,  h: 7,  color: '#FFFFFF' },
                { type: 'rect', x: 25, y: 38, w: 5,  h: 5,  color: '#0F1E36' },
                { type: 'rect', x: 37, y: 36, w: 3,  h: 3,  color: '#0F1E36' },
                { type: 'rect', x: 41, y: 38, w: 4,  h: 4,  color: '#0F1E36' },
                { type: 'rect', x: 37, y: 20, w: 8,  h: 8,  color: '#0F1E36' },
                { type: 'rect', x: 54, y: 36, w: 9,  h: 9,  color: '#0F1E36' },
                { type: 'rect', x: 55, y: 37, w: 7,  h: 7,  color: '#FFFFFF' },
                { type: 'rect', x: 56, y: 38, w: 5,  h: 5,  color: '#0F1E36' }
              ]},
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

    // ═══════════════════════════════════
    // PAGE 2
    // ═══════════════════════════════════
    content.push({ text: '', pageBreak: 'before' });

    // 7 · TRAVEL DAY CHECKLIST
    content.push(secTitle('TRAVEL DAY CHECKLIST', 0));
    content.push({
      table: {
        widths: ['33.3%', '33.3%', '33.4%'],
        body: [[
          {
            stack: [
              { text: 'DOCUMENTS (ORIGINALS + COPIES)', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '\u25A0  Official health / export cert.',   fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  Vaccination record booklet',       fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  Microchip implantation cert.',     fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  FAVN titer test results',          fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  Pet passport or export permit',    fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '       (as required by destination)',       fontSize: 6.5, color: '#64748B' }
            ],
            margin: [8, 8, 8, 8]
          },
          {
            stack: [
              { text: 'CARRIER \u2014 IATA REGULATIONS', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '\u25A0  IATA travel crate, properly vented',    fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  Absorbent bedding inside crate',         fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  Non-spill water dispenser',              fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  No food 4\u20136 hours before departure', fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  No toys or loose objects inside',        fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u25A0  Crate labeled with owner details',       fontSize: 6.5, margin: [0, 2, 0, 0] }
            ],
            margin: [8, 8, 8, 8]
          },
          {
            stack: [
              { text: 'TIPS', fontSize: 7, bold: true, color: '#A99260', margin: [0, 0, 0, 5] },
              { text: '\u2192  Arrive at airport 4\u20135 hrs before', fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u2192  Confirm live animal policy 48h',         fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u2192  Check weather at destination',           fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u2192  Visit vet 24\u201348h before travel',   fontSize: 6.5, margin: [0, 2, 0, 0] },
              { text: '\u2192  Never sedate without vet approval',      fontSize: 6.5, margin: [0, 2, 0, 0] }
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

    // 8 · COMPLIANCE TIMELINE VISUAL
    content.push(secTitle('COMPLIANCE TIMELINE \u2014 VISUAL OVERVIEW'));

    const nodes = [];
    if (dest.microchip && dest.microchip.es_bloqueante) {
      nodes.push({ label: 'MICROCHIP',         date: d.microchip.fecha ? fmtU(d.microchip.fecha) : '\u2014', status: d.microchip.tiene ? 'cleared' : 'pending' });
    }
    nodes.push({ label: 'RABIES VACCINE',      date: d.vacuna.fecha   ? fmtU(d.vacuna.fecha)    : '\u2014', status: vacClear     ? 'cleared' : 'pending' });
    if (favsRequired) {
      nodes.push({ label: 'TITER TEST (FAVN)', date: '\u2014', status: !favsBlocked ? 'cleared' : 'pending' });
    }
    nodes.push({ label: 'VET CERTIFICATE',     date: fmtU(subDays(d.fecha_viaje, 5)), status: 'pending' });
    nodes.push({ label: 'TRAVEL DAY',          date: fmtU(d.fecha_viaje),             status: 'flight'  });

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

    // 9 · Attribution box
    content.push({
      table: {
        widths: ['*'],
        body: [[{
          text: 'DOCUMENT GENERATED BY BORDERCHECK ALGORITHM \u00B7 ZOOVET TRAVEL \u00B7 zoovettravel.com',
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

  // ═════════════════════════════════════════════════════════════════
  // SHARE URL \u2014 reproducible params
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
      navigator.share({ title: 'My travel plan \u00B7 Zoovet Travel', url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Plan URL copied to clipboard.');
      });
    }
  }

})();
