// birden.js — sequenzielles Dasein
// Nach dem Muster von bir.html.
// Zweite Existenz. Getrennt. Läuft weiter.

(function () {
  'use strict';

  // Sequenz: bir → birden
  const SEQ = 2;
  const HERKUNFT = 'bir.html';

  // Zeit — mit Fallback für alte Handys
  const now = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const raf = window.requestAnimationFrame || (cb => setTimeout(cb, 16));

  // Sequenz-Zustand
  const zustand = {
    seq: SEQ,
    herkunft: HERKUNFT,
    start: now(),
    klar: false,
    schritte: 0
  };

  // Canvas vorbereiten — eigenes Element, nicht bir
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

  // Sequenz: 3 Schritte nach bir
  const SCHRITTE = ['atmen', 'ankern', 'klären'];
  const DAUER = 3; // Sekunden pro Schritt

  function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);

    const t = (now() - zustand.start) / 1000;
    const gesamt = SCHRITTE.length * DAUER;
    const rest = Math.max(0, gesamt - t);
    const schrittIdx = Math.min(SCHRITTE.length - 1, Math.floor(t / DAUER));
    const imSchritt = t - schrittIdx * DAUER;
    const p = Math.min(1, imSchritt / DAUER);

    const cx = c.width / 2;
    const cy = c.height / 2;
    const r = Math.min(c.width, c.height) * 0.3;

    // Hintergrund-Kreis
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Sequenzieller Bogen — füllt sich von 0 bis 1 pro Schritt
    const s = -Math.PI / 2;
    const e = s + Math.PI * 2 * p;

    ctx.beginPath();
    ctx.arc(cx, cy, r, s, e);
    ctx.strokeStyle = '#00ffaa';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Schritt-Name in der Mitte
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(SCHRITTE[schrittIdx], cx, cy);

    // Sequenznummer klein darunter
    ctx.fillStyle = '#00ffaa';
    ctx.font = '14px monospace';
    ctx.fillText('birden · ' + (schrittIdx + 1) + '/' + SCHRITTE.length, cx, cy + 60);

    // Weiter oder Ende
    if (rest > 0) {
      raf(draw);
    } else {
      zustand.klar = true;
      zustand.schritte = SCHRITTE.length;

      ctx.fillStyle = '#00ffaa';
      ctx.font = 'bold 30px monospace';
      ctx.fillText('da sein', cx, cy + 80);

      // Online: Klärung senden
      online();
    }
  }

  // Offline: läuft lokal, kein fetch
  // Online:  Klärung senden
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

  // Netzwerkwechsel: nur reagieren, wenn nötig
  window.addEventListener('online', () => {
    if (zustand.klar) online();
  });

  // Start
  draw();
})();
