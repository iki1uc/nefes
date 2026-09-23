// ikilem.js — das Dilemma
// Wenn dur nicht greift oder nicht ausreicht,
// zieht durdur das Dilemma raus.
//
// Türkçe: ikilem = Dilemma
// Maya:   kan = 4 · Form
// Inka:   tawa = 4 · vier
//
// Aufgelöst durch:
//   arka bant   — Hinterbandkontrolle (zurückschauen)
//   çoban matı  — Schäferzug (4 Züge zum Matt)
//   satranç     — Schach (das ganze Brett)
//   hastalık    — Krankheit (Diagnose)
//   önlem       — Maßnahme (Handlung)
//
// Rund.

(function () {
  'use strict';

  // 1. GREIFT — greift dur?
  function greift() {
    if (typeof window.dur === 'object' && window.dur.sachverhalt) {
      const d = window.dur.sachverhalt();
      return { greift: d.klar === true, sachverhalt: d };
    }
    return { greift: false, sachverhalt: null };
  }

  // 2. ARKA BANT — Hinterbandkontrolle
  function arkaBant() {
    if (typeof window.iki === 'object' && window.iki.nawi) {
      const n = window.iki.nawi();
      return {
        avg: n.avg,
        spread: n.spread,
        maya: 'ox',      // 3 · Bewegung
        inka: 'kimsa',   // 3 · drei
        hinweis: 'bant okundu'
      };
    }
    return { avg: 0, spread: 0, maya: 'ma\'', inka: 'mana', hinweis: 'bant yok' };
  }

  // 3. ÇOBAN MATI — Schäferzug (4 Züge)
  function cobanMati() {
    return {
      zug1: { tr: 'açılış',  de: 'natürlicher Anfang' },
      zug2: { tr: 'kurulum', de: 'Aufbau' },
      zug3: { tr: 'tehdit',  de: 'Drohung' },
      zug4: { tr: 'mat',     de: 'Matt' },
      maya: 'kan',           // 4 · Form
      inka: 'tawa',          // 4 · vier
      hinweis: 'dört hamle · vier Züge'
    };
  }

  // 4. SATRANÇ — Schach (das ganze Brett)
  function satranc() {
    const brett = [];
    if (typeof window.üç === 'object') brett.push('uc');
    if (typeof window.klar === 'object') brett.push('klar');
    if (typeof window.ki === 'object') brett.push('ki');
    if (typeof window.dur === 'object') brett.push('dur');
    if (typeof window.iki === 'object') brett.push('iki');

    return {
      brett: brett,
      sayi: brett.length,
      maya: brett.length === 1 ? 'hun' : brett.length === 2 ? 'ka' : 'ox',
      inka: brett.length === 1 ? 'huk' : brett.length === 2 ? 'iskay' : 'kimsa',
      hinweis: brett.length + ' taş · ' + brett.length + ' Steine'
    };
  }

  // 5. HASTALIK — Krankheit
  function hastalik(neden) {
    if (!neden) return {
      tani: 'bilinmiyor',
      faktor: 0,
      maya: 'ma\'',
      inka: 'mana',
      hinweis: 'neden bilinmiyor'
    };

    const liste = [].concat(neden);

    if (liste.length === 1) return {
      tani: 'tek',
      faktor: 1,
      neden: liste[0],
      maya: 'hun',
      inka: 'huk',
      hinweis: 'bir etken · ein Faktor'
    };

    return {
      tani: 'çoklu',
      faktor: liste.length,
      neden: liste,
      maya: 'ka',
      inka: 'iskay',
      hinweis: liste.length + ' etken · ' + liste.length + ' Faktoren'
    };
  }

  // 6. ÖNLEM — Maßnahme
  function onlem(tani) {
    if (!tani) return { yap: 'arka bandı oku', maya: 'hun', inka: 'huk' };
    if (tani === 'tek') return { yap: 'tek önlem', maya: 'hun', inka: 'huk' };
    if (tani === 'çoklu') return { yap: 'çoklu önlem', maya: 'ka', inka: 'iskay' };
    return { yap: 'bilinmiyor', maya: 'ma\'', inka: 'mana' };
  }

  // IKILEM — alles zusammen
  function ikilem(neden) {
    // 1. Greift dur?
    const g = greift();
    if (g.greift) {
      return {
        cozuldu: true,
        yolu: 'dur',
        maya: 'hun',
        inka: 'huk',
        hinweis: 'dur yetti · dur reichte'
      };
    }

    // 2. Dilemma auflösen
    const bant = arkaBant();
    const coban = cobanMati();
    const tahta = satranc();
    const tani = hastalik(neden);
    const tedbir = onlem(tani.tani);

    return {
      cozuldu: true,
      yolu: 'ikilem',
      arkaBant: bant,
      coban: coban,
      satranc: tahta,
      hastalik: tani,
      onlem: tedbir,
      maya: 'kan',
      inka: 'tawa',
      hinweis: 'ikilem çözüldü · rund'
    };
  }

  // ERKLÄRUNG
  function erklaerung() {
    return 'ikilem — das Dilemma. ' +
           'Wenn dur nicht greift, löst ikilem auf: ' +
           'arka bant · çoban matı · satranç · hastalık · önlem. ' +
           'Maya: kan. Inka: tawa. Türkçe: ikilem.';
  }

  // ÖFFENTLICH
  const api = {
    greift, arkaBant, cobanMati, satranc, hastalik, onlem, ikilem, erklaerung
  };

  if (typeof window !== 'undefined') window.ikilem = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
