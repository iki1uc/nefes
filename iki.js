// iki.js — die Zwei
// Alles, was bir NICHT ist.
// Mit Hinterbandkontrolle: hört sich selbst zu.
//
// Maya — kaxtik' · das Paar · 2 = Dualität
// Inka — yanantin · zwei Gleiche · ñawi = Auge

(function () {
  'use strict';

  const now = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const raf = window.requestAnimationFrame || (cb => setTimeout(cb, 16));

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

  const start = now();

  // ============================================================
  // HINTERBANDKONTROLLE
  // Inka: ñawi — das Auge, das zurückschaut
  // Maya: 7 — der Spiegel
  // ============================================================
  const BAND = 240;
  const band = new Float32Array(BAND);
  let bandIdx = 0;

  function pushBand(v) {
    band[bandIdx] = v;
    bandIdx = (bandIdx + 1) % BAND;
  }

  function readBand(i) {
    return band[(bandIdx + i) % BAND];
  }

  // ñawi — das Auge der Kontrolle
  function nawi() {
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

  // Beibehaltener Name für Kompatibilität
  const hinterband = nawi;

  function draw() {
    const t = (now() - start) / 1000;

    // Hintergrund: hell
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, c.width, c.height);

    // ============================================================
    // Zwei Wellen — yanantin · kaxtik'
    // Nicht eine. Zwei. Gleiche. Komplementär.
    // ============================================================
    const v1 = Math.sin(t * 1.2);
    const v2 = Math.sin(t * 0.7) * 0.5;
    const v = (v1 + v2) / 1.5;
    pushBand(v);

    const h = nawi();

    const y0 = c.height / 2;

    // yanantin — die eine Hälfte
    ctx.beginPath();
    for (let i = 0; i < BAND; i++) {
      const x = (i / (BAND - 1)) * c.width;
      const y = y0 + readBand(i) * c.height * 0.35;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#ff0066';
    ctx.lineWidth = 2;
    ctx.stroke();

    // yanantin — die andere Hälfte (gespiegelt)
    ctx.beginPath();
    for (let i = 0; i < BAND; i++) {
      const x = (i / (BAND - 1)) * c.width;
      const y = y0 - readBand(i) * c.height * 0.35;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(255,0,102,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // tawa — die vier Spuren (Inka: vier)
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

    // Text — Rand, sans
    ctx.fillStyle = '#111';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.fillText('iki · die Zwei', 20, 20);
    ctx.fillStyle = '#5fc8ff';
    ctx.font = '11px sans-serif';
    ctx.fillText('maya · kaxtik\' · 2 = dualität', 20, 40);
    ctx.fillText('inka · yanantin · zwei gleiche', 20, 56);

    ctx.fillStyle = '#111';
    ctx.font = '13px sans-serif';
    ctx.fillText('t  ' + t.toFixed(2) + ' s', 20, 80);
    ctx.fillText('ñawi avg ' + h.avg.toFixed(3), 20, 100);
    ctx.fillText('ñawi spread ' + h.spread.toFixed(3), 20, 120);

    // Kontrolle
    const warn = h.spread > 1.6;
    ctx.fillStyle = warn ? '#c00' : '#090';
    ctx.fillText(
      warn ? '⚠ ñawi: unruhig' : '✓ ñawi: ruhig',
      20, 145
    );

    // wiñay — immer
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('wiñay · immer', c.width - 20, c.height - 20);

    raf(draw);
  }

  async function sende() {
    if (!navigator.onLine) return;
    try {
      const h = nawi();
      await fetch('/api/hinterband', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          t: (now() - start) / 1000,
          h,
          maya: 'kaxtik\'',
          inka: 'yanantin'
        })
      });
    } catch (e) { /* still */ }
  }

  setInterval(sende, 5000);

  draw();

  // Öffentlich — alter Name bleibt, neuer dazu
  window.iki = {
    hinterband: nawi,
    nawi: nawi,
    band: () => Array.from(band)
  };
})();
