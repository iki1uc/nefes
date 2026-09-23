// iki.js — die Zwei
// Alles, was bir NICHT ist.
// Mit Hinterbandkontrolle: hört sich selbst zu.

(function () {
  'use strict';

  // Fallbacks für alte Handys
  const now = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const raf = window.requestAnimationFrame || (cb => setTimeout(cb, 16));

  // Eigener Canvas — nicht #c (das ist bir)
  function mount() {
    if (document.getElementById('c2')) return document.getElementById('c2');
    const c = document.createElement('canvas');
    c.id = 'c2';
    c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;background:#eee';
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

  // Zustand: kein Countdown. Läuft endlos.
  const start = now();

  // HINTERBANDKONTROLLE
  // Ein Ringpuffer. Speichert die letzten N Zustände.
  // Wird während des Zeichnens gefüllt und zurückgelesen.
  const BAND = 240;         // "Bandlänge"
  const band = new Float32Array(BAND);
  let bandIdx = 0;

  // Eine "Spur" pro Sekunde — leer, aber da.
  const spuren = [];

  function pushBand(v) {
    band[bandIdx] = v;
    bandIdx = (bandIdx + 1) % BAND;
  }

  function readBand(i) {
    // i = 0 → ältester Wert, i = BAND-1 → neuester
    return band[(bandIdx + i) % BAND];
  }

  // Kontrolle: prüft, ob das Band "gesund" bleibt.
  // Kein Countdown. Immerwährend.
  function hinterband() {
    let sum = 0, min = Infinity, max = -Infinity;
    for (let i = 0; i < BAND; i++) {
      const v = readBand(i);
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    const avg = sum / BAND;
    const spread = max - min;
    return { avg, min, max, spread };
  }

  function draw() {
    const t = (now() - start) / 1000;

    // 1. HINTERGRUND: hell (Gegenstück zu schwarz)
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, c.width, c.height);

    // 2. Zustand erzeugen — kein Countdown, sondern eine Welle
    //    die nie endet.
    const v = (Math.sin(t * 1.2) + Math.sin(t * 0.7) * 0.5) / 1.5;
    pushBand(v);

    // 3. HINTERBANDKONTROLLE lesen
    const h = hinterband();

    // 4. Band zeichnen — von links nach rechts, als Linie
    //    Nicht Kreis. Nicht Mitte. Über den ganzen Bildschirm.
    const y0 = c.height / 2;
    ctx.beginPath();
    for (let i = 0; i < BAND; i++) {
      const x = (i / (BAND - 1)) * c.width;
      const y = y0 + readBand(i) * c.height * 0.35;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#ff0066';   // Gegenfarbe zu #00ffaa
    ctx.lineWidth = 2;
    ctx.stroke();

    // 5. Mehrere Spuren (Gegenstück zu "single")
    //    Jede Spur läuft mit anderer Frequenz.
    const freqs = [0.4, 0.9, 1.6, 2.3];
    freqs.forEach((f, idx) => {
      ctx.beginPath();
      for (let i = 0; i < BAND; i++) {
        const x = (i / (BAND - 1)) * c.width;
        const wave = Math.sin(i * 0.05 + t * f) * 0.08;
        const y = y0 + readBand(i) * c.height * 0.35 + wave * c.height + (idx - 1.5) * 12;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,0,102,' + (0.15 + idx * 0.1) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // 6. Text: nicht Mitte, nicht monospace
    //    Rand. Sans.
    ctx.fillStyle = '#111';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.fillText('iki · hinterband', 20, 20);
    ctx.fillText('t  ' + t.toFixed(2) + ' s', 20, 40);
    ctx.fillText('avg ' + h.avg.toFixed(3), 20, 60);
    ctx.fillText('spread ' + h.spread.toFixed(3), 20, 80);

    // 7. Kontrolle: Vergleich alt vs. neu
    //    Wenn spread zu groß → Warnung. Immerwährend.
    const warn = h.spread > 1.6;
    ctx.fillStyle = warn ? '#c00' : '#090';
    ctx.fillText(warn ? '⚠ kontrolle: unruhig' : '✓ kontrolle: ruhig', 20, 105);

    // 8. Kein Ende. Immer weiter.
    raf(draw);
  }

  // Online/Offline: iki lebt lokal.
  // Online: sendet den Hinterband-Befund.
  async function sende() {
    if (!navigator.onLine) return;
    try {
      const h = hinterband();
      await fetch('/api/hinterband', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: (now() - start) / 1000, h })
      });
    } catch (e) { /* still bleiben */ }
  }

  // Alle 5 Sekunden Kontrolle senden
  setInterval(sende, 5000);

  // Start
  draw();

  // Öffentlich machen (ohne Zwang)
  window.iki = { hinterband, band: () => Array.from(band) };
})();
