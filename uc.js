// üç.js — der Raum
// Nicht die dritte Datei.
// Der Raum zwischen bir und iki.
// Beziehung. Symbiose. Gegensymbiose.
// Alles, was zwischen zwei Dingen entsteht.

(function () {
  'use strict';

  // Fallbacks
  const now = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const raf = window.requestAnimationFrame || (cb => setTimeout(cb, 16));

  // Eigener Canvas — nicht #c (bir), nicht #c2 (iki)
  function mount() {
    if (document.getElementById('c3')) return document.getElementById('c3');
    const c = document.createElement('canvas');
    c.id = 'c3';
    c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;background:#0a0a14';
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
  // KNOTEN — das Sein. Einzelne Punkte. Jeder eine Nummer.
  // ============================================================
  const knoten = {
    1: { name: 'bir',  x: 0.25, y: 0.5 },
    2: { name: 'iki',  x: 0.75, y: 0.5 }
  };

  // ============================================================
  // BEZIEHUNGEN — das, was zwischen Knoten entsteht.
  // Symbiose = beide werden mehr.
  // Gegensymbiose = beide stoßen sich ab.
  // ============================================================
  const beziehungen = [
    { von: 1, nach: 2, art: 'symbiose',    aktiv: true  },
    { von: 2, nach: 1, art: 'symbiose',    aktiv: true  },
    { von: 1, nach: 1, art: 'selbst',      aktiv: false },
    { von: 2, nach: 2, art: 'selbst',      aktiv: false }
  ];

  // ============================================================
  // ZEIT — kein Countdown. Kein Ende. Nur Verlauf.
  // ============================================================
  const start = now();

  // ============================================================
  // KLÄRUNG — was ist gerade? Einzeln oder zusammen?
  // ============================================================
  function klar() {
    const aktiveKnoten = Object.keys(knoten).length;
    const aktiveBez = beziehungen.filter(b => b.aktiv).length;

    if (aktiveKnoten === 1) {
      return { art: 'einzel', hinweis: 'ein Zeichen — kann alles sein' };
    }
    if (aktiveBez > 0) {
      return { art: 'beziehung', hinweis: 'zwei Zeichen — enger' };
    }
    return { art: 'leer', hinweis: 'nichts' };
  }

  // ============================================================
  // ZEICHNEN
  // ============================================================
  function draw() {
    const t = (now() - start) / 1000;

    // Hintergrund — dunkelblau, dritte Farbe
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, c.width, c.height);

    // Knoten-Positionen
    const k1 = { x: c.width * knoten[1].x, y: c.height * knoten[1].y };
    const k2 = { x: c.width * knoten[2].x, y: c.height * knoten[2].y };

    // BEZIEHUNGEN zeichnen — als Linien
    beziehungen.forEach(b => {
      if (!b.aktiv) return;
      const von = knoten[b.von];
      const nach = knoten[b.nach];
      if (!von || !nach) return;

      const x1 = c.width * von.x,  y1 = c.height * von.y;
      const x2 = c.width * nach.x, y2 = c.height * nach.y;

      // Puls — die Beziehung lebt
      const puls = 0.5 + 0.5 * Math.sin(t * 1.5);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      if (b.art === 'symbiose') {
        ctx.strokeStyle = 'rgba(255, 200, 0, ' + (0.3 + puls * 0.5) + ')';
        ctx.lineWidth = 2 + puls * 2;
      } else if (b.art === 'gegensymbiose') {
        ctx.strokeStyle = 'rgba(255, 0, 100, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
      }

      ctx.stroke();
      ctx.setLineDash([]);
    });

    // KNOTEN zeichnen — als Kreise
    Object.entries(knoten).forEach(([id, k]) => {
      const x = c.width * k.x;
      const y = c.height * k.y;

      // Puls je Knoten leicht versetzt
      const p = 0.5 + 0.5 * Math.sin(t * 1.2 + Number(id));

      ctx.beginPath();
      ctx.arc(x, y, 30 + p * 8, 0, Math.PI * 2);
      ctx.fillStyle = id === '1' ? 'rgba(0, 255, 170, ' + (0.3 + p * 0.3) + ')'
                                 : 'rgba(255, 0, 102, ' + (0.3 + p * 0.3) + ')';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = id === '1' ? '#00ffaa' : '#ff0066';
      ctx.fill();

      // Name
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(k.name, x, y + 50);
    });

    // KLÄRUNG anzeigen — mittig oben
    const k = klar();
    ctx.fillStyle = '#fff';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('üç · ' + k.art + ' · ' + k.hinweis, c.width / 2, 30);

    // Zeit — dezent unten
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('t ' + t.toFixed(1) + ' s', c.width - 20, c.height - 20);

    raf(draw);
  }

  // ============================================================
  // OFFLINE / ONLINE
  // ============================================================
  async function sende() {
    if (!navigator.onLine) return;
    try {
      await fetch('/api/uec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          t: (now() - start) / 1000,
          klar: klar(),
          knoten: Object.keys(knoten),
          beziehungen: beziehungen.filter(b => b.aktiv).map(b => b.art)
        })
      });
    } catch (e) { /* still */ }
  }

  setInterval(sende, 5000);

  // ============================================================
  // ÖFFENTLICH — damit andere Dateien es nutzen können
  // ============================================================
  window.üç = {
    knoten,
    beziehungen,
    klar,
    setKnoten(id, x, y) {
      if (knoten[id]) { knoten[id].x = x; knoten[id].y = y; }
    },
    setBeziehung(von, nach, aktiv) {
      const b = beziehungen.find(b => b.von === von && b.nach === nach);
      if (b) b.aktiv = aktiv;
    }
  };

  // Start
  draw();
})();
