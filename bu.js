// bu.js — dies
// Türkçe: bu = dies (nah)
// Maya:   hun = eins
// Inka:   huk = eins
//
// Die Zahlen 1 bis 21. Der Kern.
// Jede Zahl ein Zustand. Jede Zahl ein Name.
// Türkçe arbeitet. Maya und Inka flüstern.

(function () {
  'use strict';

  // ============================================================
  // SAYILAR — die Zahlen 1 bis 21
  // tr = Türkçe · maya = Maya-Ton · inka = Quechua
  // ============================================================
  const SAYILAR = {
     1: { tr: 'bir',        maya: 'hun',          inka: 'huk',         anlam: 'nokta' },
     2: { tr: 'iki',        maya: 'ka',           inka: 'iskay',       anlam: 'karşıt' },
     3: { tr: 'üç',         maya: 'ox',           inka: 'kimsa',       anlam: 'uzam' },
     4: { tr: 'dört',       maya: 'kan',          inka: 'tawa',        anlam: 'form' },
     5: { tr: 'beş',        maya: 'ho',           inka: 'pichqa',      anlam: 'ışıma' },
     6: { tr: 'altı',       maya: 'uac',          inka: 'suqta',       anlam: 'akış' },
     7: { tr: 'yedi',       maya: 'uuc',          inka: 'qanchis',     anlam: 'ayna' },
     8: { tr: 'sekiz',      maya: 'uaxac',        inka: 'pusaq',       anlam: 'uyum' },
     9: { tr: 'dokuz',      maya: 'bolon',        inka: 'isqun',       anlam: 'sabır' },
    10: { tr: 'on',         maya: 'lahun',        inka: 'chunka',      anlam: 'tezahür' },
    11: { tr: 'on bir',     maya: 'buluc',        inka: 'chunka huk',  anlam: 'özgürlük' },
    12: { tr: 'on iki',     maya: 'lahca',        inka: 'chunka iskay',anlam: 'anlayış' },
    13: { tr: 'on üç',      maya: 'oxlahun',      inka: 'chunka kimsa',anlam: 'yükseliş' },
    14: { tr: 'on dört',    maya: 'kan',          inka: 'chunka tawa', anlam: 'ikinci form' },
    15: { tr: 'on beş',     maya: 'ho',           inka: 'chunka pichqa',anlam: 'ikinci ışıma' },
    16: { tr: 'on altı',    maya: 'uac',          inka: 'chunka suqta',anlam: 'ikinci akış' },
    17: { tr: 'on yedi',    maya: 'uuc',          inka: 'chunka qanchis',anlam: 'ikinci ayna' },
    18: { tr: 'on sekiz',   maya: 'uaxac',        inka: 'chunka pusaq',anlam: 'ikinci uyum' },
    19: { tr: 'on dokuz',   maya: 'bolon',        inka: 'chunka isqun',anlam: 'ikinci sabır' },
    20: { tr: 'yirmi',      maya: 'lahun',        inka: 'iskay chunka',anlam: 'tam' },
    21: { tr: 'yirmi bir',  maya: 'hun',          inka: 'huk',         anlam: 'yeniden' }
  };

  // ============================================================
  // BAK — die Zahl lesen
  // ============================================================
  function bak(n) {
    const s = SAYILAR[n];
    if (!s) return null;
    return {
      sayi: n,
      tr: s.tr,
      maya: s.maya,
      inka: s.inka,
      anlam: s.anlam,
      // Rund: 1 → 21 → 1
      rund: n === 21,
      // Wo sind wir?
      naechste: n < 21 ? n + 1 : 1
    };
  }

  // ============================================================
  // HEP — alle Zahlen
  // ============================================================
  function hep() {
    const liste = [];
    for (let i = 1; i <= 21; i++) {
      liste.push(bak(i));
    }
    return liste;
  }

  // ============================================================
  // RUND — der Kreis: 1 → 21 → 1
  // ============================================================
  function rund(n) {
    let i = n || 1;
    const ergebnis = [];
    for (let k = 0; k < 21; k++) {
      ergebnis.push(bak(i));
      i = i < 21 ? i + 1 : 1;
    }
    return ergebnis;
  }

  // ============================================================
  // DURUM — Zustand
  // ============================================================
  function durum() {
    const geladen = typeof window.nefes === 'object';
    return {
      dosya: 'bu.js',
      anlam: 'dies',
      sayi: 21,
      maya: 'hun',
      inka: 'huk',
      nefes: geladen,
      bereit: geladen,
      hinweis: '1 → 21 · rund'
    };
  }

  // ============================================================
  // ERKLÄRUNG
  // ============================================================
  function erklaerung() {
    return 'bu — dies. 21 sayı. Türkçe, Maya, İnka. ' +
           '1 → 21 → 1. Rund.';
  }

  // ============================================================
  // ÖFFENTLICH
  // ============================================================
  const api = {
    SAYILAR,
    bak,
    hep,
    rund,
    durum,
    erklaerung
  };

  if (typeof window !== 'undefined') window.bu = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();

// ============================================================
// Anwendung
// ============================================================
// bu.bak(1);      // → bir · hun · huk · nokta
// bu.bak(21);     // → yirmi bir · hun · huk · yeniden
// bu.hep();       // → alle 21
// bu.rund();      // → 1 → 21 → 1
// bu.durum();     // → Zustand
