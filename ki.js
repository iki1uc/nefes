// ki.js — Klärung durch Kombination
// ki = wer (Türkçe)
// Maya — hun, ka, ox
// Inka — huk, iskay, kimsa

(function () {
  'use strict';

  const zustand = new Map();

  const ZAHLEN = {
    1: { maya: 'hun', inka: 'huk' },
    2: { maya: 'ka',  inka: 'iskay' },
    3: { maya: 'ox',  inka: 'kimsa' }
  };

  function zahlName(n) {
    return ZAHLEN[n] || { maya: String(n), inka: String(n) };
  }

  function set(id, wert) {
    zustand.set(id, wert);
    return id;
  }

  function klar() {
    const ids = Array.prototype.slice.call(arguments);
    const aktiv = ids.filter(function (i) { return zustand.has(i); });

    if (aktiv.length === 0) {
      return { klar: false, grund: 'nichts', maya: 'ma\'', inka: 'mana', hinweis: 'nichts' };
    }
    if (aktiv.length === 1) {
      const z = zahlName(aktiv.length);
      return {
        klar: true, art: 'einzel', id: aktiv[0],
        maya: z.maya, inka: z.inka,
        hinweis: 'ein Zeichen — kann reichen'
      };
    }
    const z = zahlName(aktiv.length);
    return {
      klar: true, art: 'kombination', ids: aktiv,
      maya: z.maya, inka: z.inka,
      yanantin: aktiv.length === 2,
      masintin: aktiv.length >= 2,
      hinweis: 'mehrere Zeichen — enger'
    };
  }

  function band() {
    return Array.from(zustand.entries());
  }

  const ki = { set: set, klar: klar, band: band, zustand: zustand, ZAHLEN: ZAHLEN, zahlName: zahlName };

  if (typeof window !== 'undefined') window.ki = ki;
  if (typeof module !== 'undefined' && module.exports) module.exports = ki;
})();
