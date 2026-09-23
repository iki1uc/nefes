// ikilem.js — das Dilemma
// Wenn dur nicht greift oder nicht ausreicht,
// zieht durdur das Dilemma raus.
// Aufgelöst durch:
//   arka bant   — Hinterbandkontrolle
//   çoban matı  — Schäferzug (4 Züge)
//   satranç     — Schach (das ganze Brett)
//   hastalık    — Krankheit (Diagnose)
//   önlem       — Maßnahme (Handlung)
// Rund.

(function() {
  'use strict';

  // 1. Greift dur?
  function greift() {
    if (typeof window.dur === 'object' && window.dur.sachverhalt) {
      const d = window.dur.sachverhalt();
      return d.klar === true;
    }
    return false;
  }

  // 2. Arka bant — Hinterbandkontrolle
  function arkaBant() {
    // Schau zurück
    if (typeof window.iki === 'object' && window.iki.nawi) {
      return window.iki.nawi();
    }
    return { avg: 0, spread: 0, leer: true };
  }

  // 3. Çoban matı — Schäferzug (4 Züge)
  function cobanMati() {
    return {
      zug1: 'açılış',      // natürlicher Anfang
      zug2: 'kurulum',     // Aufbau
      zug3: 'tehdit',      // Drohung
      zug4: 'mat',         // Matt
      maya: 'kan',         // 4 = Form
      inka: 'tawa'         // 4 = vier
    };
  }

  // 4. Satranç — Schach
  function satranc() {
    const teile = {};
    if (typeof window.üç === 'object') teile.uc = true;
    if (typeof window.klar === 'object') teile.klar = true;
    if (typeof window.ki === 'object') teile.ki = true;
    if (typeof window.dur === 'object') teile.dur = true;
    return {
      brett: Object.keys(teile),
      sayi: Object.keys(teile).length,
      maya: 'ox',
      inka: 'kimsa'
    };
  }

  // 5. Hastalık — Krankheit
  function hastalik(neden) {
    // Ein Faktor oder viele?
    const n = neden ? [].concat(neden).length : 0;
    if (n === 0) return { tani: 'bilinmiyor', faktor: 0 };
    if (n === 1) return { tani: 'tek', faktor: 1, hinweis: 'bir etken' };
    return { tani: 'çoklu', faktor: n, hinweis: n + ' etken' };
  }

  // 6. Önlem — Maßnahme
  function onlem(tani) {
    if (tani === 'bilinmiyor') return { yap: 'arka bandı oku', maya: 'hun', inka: 'huk' };
    if (tani === 'tek') return { yap: 'tek önlem', maya: 'hun', inka: 'huk' };
    return { yap: 'çoklu önlem', maya: 'ka', inka: 'iskay' };
  }

  // IKILEM — alles zusammen
  function ikilem(neden) {
    // Greift dur?
    if (greift()) {
      return { cozuldu: true, yolu: 'dur', hinweis: 'dur yetti' };
    }

    // Dilemma auflösen
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
      hinweis: 'dilemma çözüldü — rund'
    };
  }

  // ÖFFENTLICH
  const api = { greift, arkaBant, cobanMati, satranc, hastalik, onlem, ikilem };
  if (typeof window !== 'undefined') window.ikilem = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
