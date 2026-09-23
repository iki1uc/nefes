// run.js — der Lauf
// Türkçe: koş = lauf · çalış = arbeite
// Maya:   ok = gehen
// Inka:   puriy = gehen
//
// Ein Lauf. Führt. Öffnet. Schließt.

(function () {
  'use strict';

  const lauf = {
    start: Date.now(),
    schritte: [],
    zustand: 'bereit'
  };

  function schritt(name, fn) {
    lauf.schritte.push(name);
    try {
      const r = typeof fn === 'function' ? fn() : fn;
      return { ok: true, name: name, r: r };
    } catch (e) {
      return { ok: false, name: name, hata: e.message };
    }
  }

  function alle() {
    const reihe = [
      { id: 'bu',      was: '21 sayı' },
      { id: 'su',      was: 'anhängsel' },
      { id: 'nefes',   was: 'atem' },
      { id: 'iki',     was: 'gegenstück' },
      { id: 'üç',      was: 'raum' },
      { id: 'ki',      was: 'wer' },
      { id: 'klar',    was: 'klärung' },
      { id: 'dur',     was: 'halt' },
      { id: 'durdur',  was: 'veranlassen' },
      { id: 'ikilem',  was: 'dilemma' },
      { id: 'hal',     was: 'lage' },
      { id: 'kaygıyı', was: 'sorge' },
      { id: 'birden',  was: 'sequenziell' },
      { id: 'fal',     was: 'orakel' },
      { id: 'sor',     was: 'frage' }
    ];

    return reihe.map(function (e) {
      const obj = window[e.id];
      const da = (typeof obj === 'object' && obj !== null) || typeof obj === 'function';
      return { id: e.id, was: e.was, da: da, obj: obj };
    });
  }

  function zustandNeu() {
    const alle = window.run.alle();
    const da = alle.filter(function (x) { return x.da; }).length;
    lauf.zustand = da === alle.length ? 'rund' : 'teilweise';
    return {
      zustand: lauf.zustand,
      da: da,
      gesamt: alle.length,
      dauer: Date.now() - lauf.start,
      schritte: lauf.schritte.length
    };
  }

  window.run = {
    lauf: lauf,
    schritt: schritt,
    alle: alle,
    zustand: zustandNeu
  };
})();
