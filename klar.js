// klar.js — Unfug, so weit mathematisiert wie nötig
(function () {
  'use strict';

  const set = new Set();

  function hin(id) {
    if (id === null || id === undefined) return;
    set.add(id);
    return liste();
  }

  function weg(id) {
    set.delete(id);
    return liste();
  }

  function leer() {
    set.clear();
    return liste();
  }

  function liste() {
    return [...set];
  }

  function stand() {
    const n = set.size;

    if (n === 0) {
      return {
        stand: 'leer',
        klar: false,
        hinweis: 'noch nichts'
      };
    }

    if (n === 1) {
      return {
        stand: 'allein',
        klar: true,
        was: liste()[0],
        hinweis: 'allein — kann reichen. kann vieles sein.'
      };
    }

    // n >= 2
    return {
      stand: 'zusammen',
      klar: true,
      was: liste(),
      hinweis: 'zusammen — andere Klärung. nicht mehr, nicht weniger.'
    };
  }

  window.klar = { hin, weg, leer, liste, stand };
})();
