// birden.js — sequenzielles Dasein
// Nach dem Muster von bir.html.
// Zweite Existenz. Getrennt. Läuft weiter.
//
// Maya — die Zeit, der Atem (ik')
// Inka — der Raum, die Welten (hanan · kay · uku)

(function () {
  'use strict';

  const SEQ = 2;
  const HERKUNFT = 'bir.html';

  const now = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const raf = window.requestAnimationFrame || (cb => setTimeout(cb, 16));

  const zustand = {
    seq: SEQ,
    herkunft: HERKUNFT,
    start: now(),
    klar: false,
    schritte: 0
  };

  function mount() {
    if (document.getElementById('cb')) return;
    const c = document.createElement('canvas');
    c.id = 'cb';
    c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;background:#000';
    document.body.appendChild(c);
    return c;
  }

  const c = mount();
  if (!c) return;
  const ctx = c.getContext('2d');

  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // ============================================================
  // Drei Schritte — Maya und Inka zusammen
  //
  // Maya:  1 = Einheit · 2 = Dualität · 3 = Bewegung
  // Inka:  Uku (unten) · Kay (hier) · Hanan (oben)
  // ============================================================
  const SCHRITTE = [
    { maya: 'einheit',  inka: 'uku',   name: 'atmen'  },
    { maya: 'dualität', inka: 'kay',   name: 'ankern' },
    { maya: 'bewegung', inka: 'hanan', name: 'klären' }
  ];
  const DAUER = 3; // Sekunden pro Schritt

  // Atem (ik') — der Wind in jedem Schritt
  const ATEM = 2000;

  function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);

    const t = (now() - zustand.start) / 1000;
    const gesamt = SCHRITTE.length * DAUER;
    const rest = Math.max(0, gesamt - t);
    const schrittIdx = Math.min(SCHRITTE.length - 1, Math.floor(t / DAUER));
    const imSchritt = t - schrittIdx * DAUER;
    const p = Math.min(1, imSchritt / DAUER);
    const schritt = SCHRITTE[schrittIdx];

    const cx = c.width / 2;
    const cy = c.height / 2;
    const r = Math.min(c.width, c.height) * 0.3;

    // Atem — Puls
    const atemPhase = (now() % (ATEM * 2)) / (ATEM * 2);
    const atem = (Math.sin(atemPhase * Math.PI * 2) + 1) / 2;

    // Hintergrund-Kreis (Inka: der Raum, der trägt)
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Sequenzieller Bogen (Maya: der Zyklus)
    const s = -Math.PI / 2;
    const e = s + Math.PI * 2 * p;

    ctx.beginPath();
    ctx.arc(cx, cy, r, s, e);
    ctx.strokeStyle = '#00ffaa';
    ctx.lineWidth = 20 + atem * 4; // Atem verstärkt die Linie
    ctx.lineCap = 'round';
    ctx.stroke();

    // Schritt-Name in der Mitte (Maya-Ton)
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(schritt.name, cx, cy);

    // Maya · Inka — klein darunter
    ctx.fillStyle = '#00ffaa';
    ctx.font = '14px monospace';
    ctx.fillText('maya · ' + schritt.maya, cx, cy + 50);
    ctx.fillStyle = '#5fc8ff';
    ctx.fillText('inka · ' + schritt.inka, cx, cy + 70);

    // Sequenznummer
    ctx.fillStyle = '#888';
    ctx.font = '12px monospace';
    ctx.fillText('birden · ' + (schrittIdx + 1) + '/' + SCHRITTE.length, cx, cy - 60);

    // Weiter oder Ende
    if (rest > 0) {
      raf(draw);
    } else {
      zustand.klar = true;
      zustand.schritte = SCHRITTE.length;

      // "Da sein" — Maya 13 · Inka Kay Pacha
      ctx.fillStyle = '#00ffaa';
      ctx.font = 'bold 30px monospace';
      ctx.fillText('da sein', cx, cy + 90);

      ctx.fillStyle = '#5fc8ff';
      ctx.font = '13px monospace';
      ctx.fillText('maya 13 · aufstieg', cx, cy + 120);
      ctx.fillText('inka · kay pacha · hier', cx, cy + 138);

      online();
    }
  }

  async function online() {
    if (!navigator.onLine) return;
    try {
      const r = await fetch('/api/klarung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(zustand)
      });
      if (!r.ok) return;
      const d = await r.json();
      if (window.console) console.log('[birden]', d);
    } catch (e) {
      // still bleiben. Kein Lärm.
    }
  }

  window.addEventListener('online', () => {
    if (zustand.klar) online();
  });

  draw();
})();
