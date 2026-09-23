// sorge.js — Sorge · Umsorge · gerechtfertigter Zustand
// Türkçe: sorge = kaygı · umsorge = kaygıyı çözme
//         marker = işaret · nutzung = kullanım
//
// Maya:  kan = 4 · Form
// Inka:  tawa = 4 · vier
//
// Die Logik unterstützt sich selbst, während sie läuft.

(function () {
  'use strict';

  // ============================================================
  // SORGE — etwas ist nicht in Ordnung
  // ============================================================
  const sorgen = new Map();

  function sorge(id, grund) {
    sorgen.set(id, {
      id: id,
      grund: grund || 'bilinmiyor',
      zustand: 'sorge',       // offen
      seit: Date.now()
    });
    return marker();
  }

  // ============================================================
  // UMSORGE — die Sorge wird bearbeitet
  // ============================================================
  function umsorge(id, grund) {
    const s = sorgen.get(id);
    if (!s) return marker();
    s.zustand = 'umsorge';    // in Bearbeitung
    s.umsorge = grund || 'bearbeitet';
    return marker();
  }

  // ============================================================
  // GERECHTFERTIGT — der Zustand ist geklärt
  // ============================================================
  function rechtfertigen(id, warum) {
    const s = sorgen.get(id);
    if (!s) return marker();
    s.zustand = 'gerechtfertigt';
    s.rechtfertigung = warum || 'geklärt';
    return marker();
  }

  // ============================================================
  // MARKER — der gerechtfertigte Zustand
  // Wird von anderen Dateien genutzt
  // ============================================================
  function marker() {
    const alle = Array.from(sorgen.values());
    const offen = alle.filter(s => s.zustand === 'sorge').length;
    const bearbeitet = alle.filter(s => s.zustand === 'umsorge').length;
    const gerecht = alle.filter(s => s.zustand === 'gerechtfertigt').length;

    return {
      marker: 'sorge',
      anzahl: alle.length,
      offen: offen,
      bearbeitet: bearbeitet,
      gerechtfertigt: gerecht,
      bereit: offen === 0,
      maya: alle.length === 0 ? 'ma\'' : alle.length === 1 ? 'hun' : 'ka',
      inka: alle.length === 0 ? 'mana' : alle.length === 1 ? 'huk' : 'iskay',
      hinweis: offen === 0
        ? 'hepsi gerechtfertigt'
        : offen + ' offen · ' + bearbeitet + ' bearbeitet'
    };
  }

  // ============================================================
  // NUTZUNG — andere Dateien nutzen den Marker
  // ============================================================
  function nutzen() {
    const m = marker();
    if (!m.bereit) {
      return { nutzbar: false, grund: 'sorge offen', marker: m };
    }
    return { nutzbar: true, marker: m };
  }

  // ============================================================
  // WÄHREND — die Logik unterstützt sich selbst
  // ============================================================
  function waehrend() {
    return setInterval(function () {
      const m = marker();
      if (typeof window.console !== 'undefined') {
        console.log('[sorge]', m.marker, m.hinweis);
      }
    }, 5000);
  }

  // ============================================================
  // ERKLÄRUNG
  // ============================================================
  function erklaerung() {
    return 'sorge → umsorge → gerechtfertigt → marker → nutzung. ' +
           'Die Logik trägt sich selbst, während sie läuft. ' +
           'Maya: kan. Inka: tawa.';
  }

  // ============================================================
  // ÖFFENTLICH
  // ============================================================
  const api = {
    sorge, umsorge, rechtfertigen,
    marker, nutzen, waehrend, erklaerung,
    sorgen
  };

  if (typeof window !== 'undefined') window.sorge = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
