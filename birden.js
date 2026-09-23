// birden.js — sequenzielles Dasein
// Maya — die Zeit, der Atem (ik')
// Inka — der Raum, die Welten (uku · kay · hanan)

(function () {
  'use strict';

  const now = (window.performance && performance.now)
    ? function () { return performance.now(); }
    : function () { return Date.now(); };
  const raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };

  const zustand = {
    seq: 2, herkunft: 'bir.html', start: now(), klar: false, schritte: 0
  };

  function mount() {
    if (document.getElementById('cb')) return document.getElementById('cb');
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

  const SCHRITTE = [
    { maya: 'hun', inka: 'huk',   name: 'atmen'  },
    { maya: 'ka',  inka: 'iskay', name: 'ankern' },
    { maya: 'ox',  inka: 'kimsa', name: 'klären' }
  ];
  const DAUER = 3;

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

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 20;
    ctx.stroke();

    const s = -Math.PI / 2;
    const e = s + Math.PI * 2 * p;

    ctx.beginPath();
    ctx.arc(cx, cy, r, s, e);
    ctx.strokeStyle = '#00ffaa';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(schritt.name, cx, cy);

    ctx.fillStyle = '#00ffaa';
    ctx.font = '14px monospace';
    ctx.fillText('maya · ' + schritt.maya, cx, cy + 50);

    ctx.fillStyle = '#5fc8ff';
    ctx.fillText('inka · ' + schritt.inka, cx, cy + 70);

    ctx.fillStyle = '#888';
    ctx.font = '12px monospace';
    ctx.fillText('birden · ' + (schrittIdx + 1) + '/' + SCHRITTE.length, cx, cy - 60);

    if (rest > 0) {
      raf(draw);
    } else {
      zustand.klar = true;
      zustand.schritte = SCHRITTE.length;

      ctx.fillStyle = '#00ffaa';
      ctx.font = 'bold 30px monospace';
      ctx.fillText('da sein', cx, cy + 90);

      ctx.fillStyle = '#5fc8ff';
      ctx.font = '13px monospace';
      ctx.fillText('maya 13 · aufstieg', cx, cy + 120);
      ctx.fillText('inka · kay pacha · hier', cx, cy + 138);
    }
  }

  draw();

  const birden = {
    zustand: zustand,
    SCHRITTE: SCHRITTE,
    erklaerung: function () {
      return 'birden — sequenzielles Dasein. atmen · ankern · klären.';
    }
  };

  if (typeof window !== 'undefined') window.birden = birden;
  if (typeof module !== 'undefined' && module.exports) module.exports = birden;
})();
