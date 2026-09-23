// kaygıyı.js — die Sorge
// Türkçe: kaygı = Sorge, Angst
// Maya:   kan = Form
// Inka:   tawa = vier
//
// Sorge → Umsorge → gerechtfertigt → Marker → Nutzung.
// Die Logik trägt sich selbst, während sie läuft.

(function () {
  'use strict';

  const kaygilar = new Map();

  function kaygı(id, grund) {
    kaygilar.set(id, {
      id: id,
      grund: grund || 'bilinmiyor',
      zustand: 'kaygı',
      seit: Date.now()
    });
    return marker();
  }

  function umsorge(id, grund) {
    const k = kaygilar.get(id);
    if (!k) return marker();
    k.zustand = 'umsorge';
    k.umsorge = grund || 'bearbeitet';
    return marker();
  }

  function rechtfertigen(id, warum) {
    const k = kaygilar.get(id);
    if (!k) return marker();
    k.zustand = 'gerechtfertigt';
    k.rechtfertigung = warum || 'geklärt';
    return marker();
  }

  function marker() {
    const alle = Array.from(kaygilar.values());
    const offen = alle.filter(function (k) { return k.zustand === 'kaygı'; }).length;
    const bearbeitet = alle.filter(function (k) { return k.zustand === 'umsorge'; }).length;
    const gerecht = alle.filter(function (k) { return k.zustand === 'gerechtfertigt'; }).length;
    return {
      marker: 'kaygıyı',
      anzahl: alle.length,
      offen: offen,
      bearbeitet: bearbeitet,
      gerechtfertigt: gerecht,
      bereit: offen === 0,
      maya: alle.length === 0 ? 'ma\'' : alle.length === 1 ? 'hun' : 'ka',
      inka: alle.length === 0 ? 'mana' : alle.length === 1 ? 'huk' : 'iskay',
      hinweis: offen === 0 ? 'hepsi gerechtfertigt' : offen + ' offen'
    };
  }

  function nutzen() {
    const m = marker();
    if (!m.bereit) return { nutzbar: false, grund: 'sorge offen', marker: m };
    return { nutzbar: true, marker: m };
  }

  function waehrend() {
    return setInterval(function () {
      const m = marker();
      if (typeof window.console !== 'undefined') {
        console.log('[kaygıyı]', m.marker, m.hinweis);
      }
    }, 5000);
  }

  function erklaerung() {
    return 'kaygıyı — Sorge → Umsorge → gerechtfertigt → Marker. ' +
           'Türkçe, Maya, İnka.';
  }

  const kaygıyı = {
    kaygı: kaygı, umsorge: umsorge, rechtfertigen: rechtfertigen,
    marker: marker, nutzen: nutzen, waehrend: waehrend,
    erklaerung: erklaerung, kaygilar: kaygilar
  };

  if (typeof window !== 'undefined') window.kaygıyı = kaygıyı;
  if (typeof module !== 'undefined' && module.exports) module.exports = kaygıyı;
})();
