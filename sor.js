// sor.js — die Frage
// Türkçe: sor = fragen · soru = Frage
// Maya:   k'ati = fragen
// Inka:   tapuy = fragen
//
// dur ist die Brücke.
// sor ist, was auf der anderen Seite wartet.
// Kemal Sunal: "Dur kaptan dur."
// Önce dur. Sonra dur. Hep dur.

(function () {
  'use strict';

  const fragen = [];

  function sor(was) {
    const f = {
      was: was || 'bilinmiyor',
      maya: 'uac',
      inka: 'suqta',
      zaman: Date.now()
    };
    fragen.push(f);
    return f;
  }

  // ((((sor)))) — vier Richtungen
  function vier(was) {
    const w = was || 'bilinmiyor';
    return {
      was: w,
      mana:  sor(w + ' · içimde'),
      aura:  sor(w + ' · dışıma'),
      yankı: sor(w + ' · geri'),
      alan:  sor(w + ' · arada'),
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
           'Maya: k\'ati. Inka: tapuy. Türkçe: sor. ' +
           'Kemal Sunal: dur kaptan dur.';
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
