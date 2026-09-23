// dur.js — der Halt (Zustand)
// Türkçe: dur = halt
// Maya:   kan = 4 · Form
// Inka:   sayay = anhalten
//
// NUR window.dur. Kein window.durdur.
// durdur ist eine andere Datei.

(function () {
  'use strict';

  const zustand = new Map();

  function sachverhalt() {
    const n = zustand.size;
    if (n === 0) return {
      sachverhalt: 'serbest', klar: false,
      maya: 'ma\'', inka: 'mana',
      hinweis: 'hiçbir şey durmuş değil'
    };
    return {
      sachverhalt: 'durdu', klar: true, sayi: n,
      maya: 'kan', inka: 'sayay',
      hinweis: n + ' şey durmuş'
    };
  }

  function liste() { return Array.from(zustand.entries()); }
  function temizle() { zustand.clear(); return sachverhalt(); }

  function ekle(neden) {
    const n = neden || 'bilinmiyor';
    zustand.set(n, n + ' durdu');
    return sachverhalt();
  }

  function ve(a, b) {
    if (a === undefined) return { ve: null };
    if (b === undefined) return { ve: [a] };
    return {
      ve: [a, b], maya: 'ka', inka: 'iskay',
      hinweis: 'ikisi de · beide'
    };
  }

  function erklaerung() {
    return 'dur — der Halt. Zustand. ' +
           'Maya: kan. Inka: sayay. Türkçe: dur.';
  }

  // NUR window.dur
  window.dur = {
    zustand: zustand,
    sachverhalt: sachverhalt,
    liste: liste,
    temizle: temizle,
    ekle: ekle,
    ve: ve,
    erklaerung: erklaerung
  };
})();
