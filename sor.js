// sor.js — die Frage
// Türkçe: sor = fragen · soru = Frage
// Maya:   k'ati = fragen
// Inka:   tapuy = fragen
//
// dur ist die Brücke.
// sor ist, was auf der anderen Seite wartet.
//
// ((((sor)))) — vierfach, wie die Achse.

(function () {
  'use strict';

  const fragen = [];

  function sor(was) {
    const f = {
      was: was || 'bilinmiyor',
      maya: 'uac',       // 6 · akış
      inka: 'suqta',     // 6 · sechs
      zaman: Date.now()
    };
    fragen.push(f);
    return f;
  }

  // ((((sor)))) — vier Richtungen
  function vier(was) {
    return {
      was: was || 'bilinmiyor',
      mana:  sor(was + ' · içimde'),
      aura:  sor(was + ' · dışıma'),
      yankı: sor(was + ' · geri'),
      alan:  sor(was + ' · arada'),
      zen:   'sessizlik · die Stille'
    };
  }

  function liste() { return fragen.slice(); }
  function temizle() { fragen.length = 0; return liste(); }

  function durum() {
    const n = fragen.length;
    if (n === 0) return {
      durum: 'sessiz', klar: false,
      maya: 'ma\'', inka: 'mana',
      hinweis: 'henüz soru yok · noch keine Frage'
    };
    return {
      durum: 'soruluyor', klar: true, sayi: n,
      maya: 'uac', inka: 'suqta',
      hinweis: n + ' soru · ' + n + ' Fragen'
    };
  }

  function erklaerung() {
    return 'sor — die Frage. dur ist die Brücke. ' +
           'Maya: k\'ati. Inka: tapuy. Türkçe: sor.';
  }

  window.sor = {
    sor: sor,
    vier: vier,
    liste: liste,
    temizle: temizle,
    durum: durum,
    erklaerung: erklaerung
  };
})();
