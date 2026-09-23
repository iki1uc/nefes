// dur.js — der Halt
// Türkçe: dur = halt · ve = und
// dur ve = halt und ... → klärt
//
// Maya:  kan = 4 · Form · der Punkt
// Inka:  sayay = anhalten · huk = eins
//
// dur ist besetzt (Wort).
// Also: durdur() — veranlasst den Halt.
// Aber dur als Zustand bleibt.
//
// Ergänzung zu "und": "und" verbindet.
//                      "dur" hält an.
//                      Zusammen klärt sich der Sachverhalt.

(function () {
  'use strict';

  // ============================================================
  // DUR — der Zustand (das Wort dur ist besetzt, aber hier lebt es)
  // ============================================================

  // Zustandsspeicher — was gerade angehalten ist
  const zustand = new Map();

  // ============================================================
  // DURDUR — die Funktion
  // Ursache: durdur wird gerufen
  // Wirkung: es hält an
  // ============================================================
  function durdur(neden) {
    const n = neden || 'bilinmiyor';   // Ursache (Türkçe)
    const s = n + ' durdu';            // Wirkung (Türkçe)

    zustand.set(n, s);

    return {
      durdu: true,
      neden: n,
      sonuç: s,
      maya: 'kan',
      inka: 'sayay',
      ve: 'dur ve ' + n          // die "und"-Verbindung
    };
  }

  // ============================================================
  // VE — das "und" · Verbinder
  // "und" ergänzt dur
  // ve(a, b) → beide
  // ============================================================
  function ve(a, b) {
    if (a === undefined) return { ve: null };
    if (b === undefined) return { ve: [a] };

    // Wenn beide da sind, verbinden
    const v = [].concat(a, b);

    return {
      ve: v,
      maya: 'ka',                  // 2 · Dualität
      inka: 'iskay',               // 2 · zwei
      hinweis: 'ikisi de · beide',
      dur: zustand.has(a) || zustand.has(b)   // ist eines angehalten?
    };
  }

  // ============================================================
  // SACHLAGE — der Sachverhalt
  // Was ist? Und was hält?
  // ============================================================
  function sachverhalt() {
    const n = zustand.size;

    if (n === 0) {
      return {
        sachverhalt: 'serbest',      // frei
        klar: false,
        ve: null,
        maya: 'ma\'',
        inka: 'mana',
        hinweis: 'hiçbir şey durmuş değil'   // nichts ist angehalten
      };
    }

    const halte = Array.from(zustand.entries());

    return {
      sachverhalt: 'durdu',          // angehalten
      klar: true,
      sayi: n,
      halte: halte,                  // welche Halte
      ve: halte.map(h => h[0]),      // die Ursachen, verbunden
      maya: 'kan',
      inka: 'sayay',
      hinweis: n + ' şey durmuş'     // n Dinge angehalten
    };
  }

  // ============================================================
  // TEMIZLE — alles löschen
  // ============================================================
  function temizle() {
    zustand.clear();
    return sachverhalt();
  }

  // ============================================================
  // LISTE — alle Halte
  // ============================================================
  function liste() {
    return Array.from(zustand.entries());
  }

  // ============================================================
  // ERKLÄRUNG — die Datei erklärt sich selbst
  // ============================================================
  durdur.erklaerung = function () {
    return 'dur durur — der Zustand hält an. ' +
           'durdur() — die Funktion veranlasst den Halt. ' +
           've() — das "und" verbindet. ' +
           'Zusammen klärt sich der Sachverhalt. ' +
           'Maya: kan. Inka: sayay. Türkçe: dur · ve · sonuç.';
  };

  // ============================================================
  // DUR — als Objekt (Zustand + Funktion)
  // ============================================================
  const dur = {
    // Zustand
    zustand,
    sachverhalt,
    liste,
    temizle,
    // Funktion
    durdur,
    // Verbindung
    ve,
    // Selbsterklärung
    erklaerung: durdur.erklaerung
  };

  // ============================================================
  // ÖFFENTLICH
  // ============================================================
  if (typeof window !== 'undefined') {
    window.durdur = durdur;      // die Funktion direkt
    window.dur = dur;            // dur als Objekt: Zustand + Funktion
  }

  // Für Node / Module
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dur, durdur, ve, sachverhalt };
  }
})();

// ============================================================
// Anwendung
// ============================================================
//
// // Ursache → Wirkung
// durdur('gürültü');             // → 'gürültü durdu'
// durdur('yorgunluk');           // → 'yorgunluk durdu'
//
// // "und" — Verbindung
// dur.ve('a', 'b');              // → beide, kennzeichnet ob angehalten
//
// // Sachverhalt
// dur.sachverhalt();
// // → serbest · ma' · mana      (wenn nichts angehalten)
// // → durdu · kan · sayay       (wenn etwas angehalten)
//
// // Alles löschen
// dur.temizle();
//
// // Erklären
// dur.erklaerung();
