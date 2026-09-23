// su.js — das
// Türkçe: şu = das (fern)
// Maya:   chan = dort
// Inka:   chay = dort
//
// Die Anhängsel. Was nicht in die 21 passt.
// ki · klar · dur · ikilem · hal · id · sorge · kaygı

(function () {
  'use strict';

  const EK = {
    ki:      { was: 'wer',        sprache: 'tr', rolle: 'frage' },
    klar:    { was: 'klar',       sprache: 'tr', rolle: 'klärung' },
    dur:     { was: 'halt',       sprache: 'tr', rolle: 'zustand' },
    durdur:  { was: 'veranlasst', sprache: 'tr', rolle: 'funktion' },
    ikilem:  { was: 'dilemma',    sprache: 'tr', rolle: 'auflösung' },
    hal:     { was: 'lage',       sprache: 'tr', rolle: 'summe' },
    id:      { was: 'marker',     sprache: 'tr', rolle: 'zeiger' },
    sorge:   { was: 'sorge',      sprache: 'de', rolle: 'warnung' },
    kaygi:   { was: 'angst',      sprache: 'tr', rolle: 'grund' },
    nefes:   { was: 'atem',       sprache: 'tr', rolle: 'alles' }
  };

  function bak(id) {
    const e = EK[id];
    if (!e) return null;
    const geladen =
      typeof window[id] === 'object' || typeof window[id] === 'function';
    return {
      id: id,
      was: e.was,
      rolle: e.rolle,
      geladen: geladen,
      maya: 'ka',
      inka: 'iskay'
    };
  }

  function hep() {
    const liste = [];
    Object.keys(EK).forEach(function (id) { liste.push(bak(id)); });
    return liste;
  }

  function geladen() { return hep().filter(function (e) { return e.geladen; }); }
  function fehlt()   { return hep().filter(function (e) { return !e.geladen; }); }

  function durum() {
    const g = geladen().length;
    const f = fehlt().length;
    const gesamt = g + f;
    return {
      dosya: 'su.js',
      anlam: 'das',
      ek: gesamt,
      geladen: g,
      fehlt: f,
      maya: g === 0 ? 'ma\'' : g === gesamt ? 'kan' : 'ox',
      inka: g === 0 ? 'mana' : g === gesamt ? 'tawa' : 'kimsa',
      hinweis: g + '/' + gesamt + ' yüklü'
    };
  }

  function erklaerung() {
    return 'su — das. Anhängsel zu bu (dies). Türkçe, Maya, İnka.';
  }

  const api = { EK: EK, bak: bak, hep: hep, geladen: geladen, fehlt: fehlt, durum: durum, erklaerung: erklaerung };
  if (typeof window !== 'undefined') window.su = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
