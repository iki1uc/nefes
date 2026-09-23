// üç.js — der Raum
// Nicht die dritte Datei.
// Der Raum zwischen bir und iki.
//
// Türkçe: üç = drei · ilişki = Beziehung
// Maya:   ox = drei · u k'ab = zwei Hände
// Inka:   kimsa = drei · yanantin = Paar · masintin = das Dritte
//
// Beziehung. Symbiose. Gegensymbiose.

(function () {
  'use strict';

  const now = () => (window.performance && performance.now) ? performance.now() : Date.now();
  const raf = window.requestAnimationFrame || (cb => setTimeout(cb, 16));

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
  // KNOTEN — varlık · das Sein
  // Türkçe: bir, iki
  // Maya:   hun, ka
  // Inka:   huk, iskay
  // ============================================================
  const knoten = {
    1: { name: 'bir', maya: 'hun',  inka: 'huk',   x: 0.25, y: 0.5 },
    2: { name: 'iki', maya: 'ka',   inka: 'iskay', x: 0.75, y: 0.5 }
  };

  // ============================================================
  // BEZIEHUNGEN — ilişkiler
  // Türkçe: ortakyaşam (symbiose), karşıt (gegen)
  // Maya:   u k'ab (zwei Hände)
  // Inka:   yanantin (Paar), masintin (das Dritte)
  // ============================================================
  const beziehungen = [
    {
      von: 1, nach: 2,
      art: 'ortakyaşam',        // Türkçe: Symbiose
      maya: 'u k\'ab',          // zwei Hände
      inka: 'yanantin',         // zwei Gleiche
      aktiv: true
    },
    {
      von: 2, nach: 1,
      art: 'ortakyaşam',
      maya: 'u k\'ab',
      inka: 'yanantin',
      aktiv: true
    },
    {
      von: 1, nach: 1,
      art: 'kendilik',          // Türkçe: Selbst
      maya: 'hun',
      inka: 'huk',
      aktiv: false
    },
    {
      von: 2, nach: 2,
      art: 'kendilik',
      maya: 'ka',
      inka: 'iskay',
      aktiv: false
    }
  ];

  const start = now();

  // ============================================================
  // KLAR — açıklık
  // Üç dilde cevap verir.
  // ============================================================
  function klar() {
    const aktiveKnoten = Object.keys(knoten).length;
    const aktiveBez = beziehungen.filter(b => b.aktiv);

    if (aktiveKnoten === 1) {
      return {
        art: 'yalnız',
        maya: 'hun',
        inka: 'huk',
        hinweis: 'tek işaret — her şey olabilir'
      };
    }

    if (aktiveBez.length > 0) {
      const yanantin = aktiveBez.every(b => b.inka === 'yanantin');
      return {
        art: 'birlikte',
        maya: 'ox',
        inka: yanantin ? 'yanantin' : 'kimsa',
        yanantin: yanantin,
        masintin: true,
        hinweis: 'iki işaret — daha dar'
      };
    }

    return {
      art: 'boş',
      maya: 'ma\'',
      inka: 'mana',
      hinweis: 'hiçbir şey'
    };
  }

  // ============================================================
  // ÇİZ — zeichnen
  // ============================================================
  function draw() {
    const t = (now() - start) / 1000;

    // Hintergrund — dunkelblau
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, c.width, c.height);

    // BEZIEHUNGEN
    beziehungen.forEach(b => {
      if (!b.aktiv) return;
      const von = knoten[b.von];
      const nach = knoten[b.nach];
      if (!von || !nach) return;

      const x1 = c.width * von.x,  y1 = c.height * von.y;
      const x2 = c.width * nach.x, y2 = c.height * nach.y;

      const puls = 0.5 + 0.5 * Math.sin(t * 1.5);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      if (b.art === 'ortakyaşam') {
        ctx.strokeStyle = 'rgba(255, 200, 0, ' + (0.3 + puls * 0.5) + ')';
        ctx.lineWidth = 2 + puls * 2;
      } else if (b.art === 'kendilik') {
        ctx.strokeStyle = 'rgba(255, 0, 100, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
      }

      ctx.stroke();
      ctx.setLineDash([]);
    });

    // KNOTEN
    Object.entries(knoten).forEach(([id, k]) => {
      const x = c.width * k.x;
      const y = c.height * k.y;

      const p = 0.5 + 0.5 * Math.sin(t * 1.2 + Number(id));

      ctx.beginPath();
      ctx.arc(x, y, 30 + p * 8, 0, Math.PI * 2);
      ctx.fillStyle = id === '1'
        ? 'rgba(0, 255, 170, ' + (0.3 + p * 0.3) + ')'
        : 'rgba(255, 0, 102, ' + (0.3 + p * 0.3) + ')';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = id === '1' ? '#00ffaa' : '#ff0066';
      ctx.fill();

      // Türkçe Name — groß
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(k.name, x, y + 50);

      // Maya · Inka — klein
      ctx.fillStyle = '#5fc8ff';
      ctx.font = '11px sans-serif';
      ctx.fillText(k.maya + ' · ' + k.inka, x, y + 70);
    });

    // KLAR anzeigen — mittig oben, dreisprachig
    const k = klar();
    ctx.fillStyle = '#ffcc44';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('üç · ox · kimsa', c.width / 2, 25);

    ctx.fillStyle = '#fff';
    ctx.font = '13px sans-serif';
    ctx.fillText(k.art + ' · ' + k.hinweis, c.width / 2, 45);

    ctx.fillStyle = '#5fc8ff';
    ctx.font = '11px sans-serif';
    ctx.fillText('maya ' + k.maya + ' · inka ' + k.inka, c.width / 2, 63);

    // Zeit — dezent
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
          beziehungen: beziehungen
            .filter(b => b.aktiv)
            .map(b => ({ art: b.art, maya: b.maya, inka: b.inka }))
        })
      });
    } catch (e) { /* still */ }
  }

  setInterval(sende, 5000);

  // ============================================================
  // ÖFFENTLICH — üç dilli
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

  draw();
})();
