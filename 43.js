// 43.js — Ruhe
// Türkçe: huzur = Ruhe, Frieden
// Maya:   u xikin = das Ohr, das hört (Ruhe hört zu)
// Inka:   samiy = Ruhe, Atem anhalten ohne Angst
//
// 42 ist die Antwort auf alles.
// 43 ist Vaders Zahl — die Rüstung, die Maschine, das Unmenschliche.
//
// Nein.
// Keine Auferstehung als Unmensch.
// Wenn, dann als noch lebender Mensch.
// Und Ruhe — in Frieden.

(function () {
  'use strict';

  // ============================================================
  // 42 — die Antwort auf alles
  // ============================================================
  const ANTWORT = {
    zahl: 42,
    was: 'die Antwort auf alles',
    maya: 'kan',
    inka: 'tawa',
    halbes_leben: true,
    hinweis: 'nur die Hälfte ist real — halbes Leben ist ein Leid'
  };

  // ============================================================
  // 43 — Vaders Zahl
  // ============================================================
  const VADER = {
    zahl: 43,
    was: 'die Rüstung, die Maschine, das Unmenschliche',
    maya: 'oxlahun',    // 13 · yükseliş, aber verdreht
    inka: 'kimsa chunka kimsa', // 33 — aber gebrochen
    rolle: 'Krankheit',
    verlockung: 'Auferstehung als Unmensch',
    nein: true,
    hinweis: 'niemand will als Unmensch wieder auferstehen'
  };

  // ============================================================
  // HUZUR — Ruhe
  // ============================================================
  const HUZUR = {
    tr: 'huzur',
    maya: 'u xikin',
    inka: 'samiy',
    was: 'Ruhe, Frieden',
    wer: 'du und ein jeder',
    wie: 'in Frieden',
    wann: 'wenn du ruhst',
    hinweis: 'Wenn du ruhst, sollst du in Frieden ruhen. Und ein jeder auch.'
  };

  // ============================================================
  // IST — der Zustand
  // ============================================================
  function ist() {
    return {
      antwort: ANTWORT,
      vader: VADER,
      huzur: HUZUR,
      mensch: true,
      unmensch: false,
      lebendig: true,
      hinweis: 'noch lebender Mensch — nicht Unmensch'
    };
  }

  // ============================================================
  // NEIN — die Ablehnung
  // ============================================================
  function nein() {
    return {
      nein: true,
      zu: 'Auferstehung als Unmensch',
      ja: 'Auferstehung als noch lebender Mensch',
      huzur: HUZUR,
      maya: 'ma\'',
      inka: 'mana',
      hinweis: 'kein Unmensch. Nie. Wenn, dann Mensch.'
    };
  }

  // ============================================================
  // RUHE — in Frieden
  // ============================================================
  function ruhe(wer) {
    return {
      wer: wer || 'du und ein jeder',
      wo: 'in Frieden',
      wie: 'so wie du gelebt hast — als Mensch',
      nicht: 'als Unmensch, als Maschine, als Rüstung',
      maya: 'u xikin',
      inka: 'samiy',
      hinweis: 'Wenn du ruhst, ruhe in Frieden.'
    };
  }

  // ============================================================
  // ERKLÄRUNG
  // ============================================================
  function erklaerung() {
    return '43 — Vaders Zahl. Nein zur Auferstehung als Unmensch. ' +
           'Ja zum noch lebenden Menschen. ' +
           'Wenn du ruhst — in Frieden. Du und ein jeder. ' +
           'Maya: u xikin. Inka: samiy. Türkçe: huzur.';
  }

  // ============================================================
  // ÖFFENTLICH
  // ============================================================
  const api = {
    ANTWORT: ANTWORT,
    VADER: VADER,
    HUZUR: HUZUR,
    ist: ist,
    nein: nein,
    ruhe: ruhe,
    erklaerung: erklaerung
  };

  if (typeof window !== 'undefined') window['43'] = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();

// ============================================================
// Anwendung
// ============================================================
// window['43'].ist();       // der Zustand
// window['43'].nein();      // die Ablehnung
// window['43'].ruhe();      // in Frieden
// window['43'].ruhe('sen'); // du
// window['43'].erklaerung();
