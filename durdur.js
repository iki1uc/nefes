// durdur.js — der Halt (veranlasst)
// Türkçe: durdur = veranlasst den Halt
//         dur    = halt (besetzt, bleibt besetzt)
//         durdu  = es hält an (Wirkung)
//
// Maya:  kan = vier · Form · der Punkt, wo etwas stehenbleibt
// Inka:  sayay = anhalten, stehen bleiben

(function () {
  'use strict';

  // ============================================================
  // HALTE — alle Halte, die veranlasst wurden
  // ============================================================
  const halte = [];

  // ============================================================
  // DURDUR — veranlasst den Halt
  // Ursache: durdur wird gerufen
  // Wirkung: es hält an
  // ============================================================
  function durdur(neden) {
    const eintrag = {
      neden: neden || 'bilinmiyor',     // Ursache (Türkçe)
      sonuç: (neden || 'her şey') + ' durdu', // Wirkung
      maya: 'kan',                       // Form
      inka: 'sayay',                     // anhalten
      zaman: Date.now()
    };
    halte.push(eintrag);
    return {
      durdu: true,
      neden: eintrag.neden,
      sonuç: eintrag.sonuç,
      maya: eintrag.maya,
      inka: eintrag.inka
    };
  }

  // ============================================================
  // NEDEN — nur die Ursache erfragen
  // ============================================================
  function neden(was) {
    return {
      neden: was || 'bilinmiyor',
      maya: 'kan',
      inka: 'sayay'
    };
  }

  // ============================================================
  // SONUÇ — nur die Wirkung
  // ============================================================
  function sonuç(n, w) {
    return {
      neden: n || 'bilinmiyor',
      sonuç: w || 'durdu',
      maya: 'kan',
      inka: 'sayay'
    };
  }

  // ============================================================
  // LISTE — alle bisherigen Halte
  // ============================================================
  function liste() {
    return halte.slice();
  }

  // ============================================================
  // TEMIZLE — alle Halte löschen
  // ============================================================
  function temizle() {
    halte.length = 0;
    return liste();
  }

  // ============================================================
  // DURUM — aktueller Zustand des Halts
  // ============================================================
  function durum() {
    const n = halte.length;

    if (n === 0) {
      return {
        durum: 'serbest',       // frei, kein Halt
        klar: false,
        maya: 'ma\'',
        inka: 'mana',
        hinweis: 'henüz durdurulmadı'  // noch nicht angehalten
      };
    }

    return {
      durum: 'durdu',           // angehalten
      klar: true,
      sayi: n,                  // Anzahl
      son: halte[n - 1],        // letzter Halt
      maya: 'kan',
      inka: 'sayay',
      hinweis: n + ' durdurma'  // n Halte
    };
  }

  // ============================================================
  // ERKLÄRUNG — die Datei erklärt sich selbst
  // ============================================================
  durdur.erklaerung = function () {
    return 'durdur — veranlasst den Halt. ' +
           'Ursache: neden. Wirkung: sonuç. ' +
           'Maya: kan. Inka: sayay.';
  };

  // ============================================================
  // ÖFFENTLICH — beide Welten
  // ============================================================
  const api = {
    durdur,
    neden,
    sonuç,
    liste,
    temizle,
    durum,
    erklaerung: durdur.erklaerung
  };

  if (typeof window !== 'undefined') {
    window.durdur = durdur;
    window.dur = api;   // ganzer Zugriff unter window.dur (Zustand)
  }

  // Für Node / Module
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})();

// ============================================================
// Anwendung
// ============================================================
// durdur('gürültü');       // Lärm hat angehalten → alles hält an
// durdur('yorgunluk');     // Müdigkeit
// durdur();                // ohne Ursache → alles hält an
//
// durdur.durum();          // Zustand
// durdur.liste();          // alle Halte
// durdur.temizle();        // alle löschen
