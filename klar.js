// klar.js — Klärung
// Türkçe: klar = açık, net, berrak
// Maya:  sak = klar, weiß · 12 = anlama (Verstehen)
// Inka:  sut'i = klar, rein · yuyay = Verstand
//
// Es kann nur türkçe funktionieren.
// Maya und Inka sind der Hauch.

(function () {
  'use strict';

  const set = new Set();

  // ============================================================
  // Türkçe — die Arbeitssprache
  // Maya — der Hauch (Zeit, Zyklus)
  // Inka — der Hauch (Raum, Ordnung)
  // ============================================================

  // Zustandsnamen in drei Sprachen
  const ZUSTAND = {
    leer:     { tr: 'boş',     maya: 'ma\'',  inka: 'mana'   },
    allein:   { tr: 'yalnız',  maya: 'hun',   inka: 'huk'    },
    zusammen: { tr: 'birlikte', maya: 'ka',   inka: 'iskay'  },
    drei:     { tr: 'üçlü',    maya: 'ox',    inka: 'kimsa'  }
  };

  function zustandName(key) {
    return ZUSTAND[key] || { tr: key, maya: key, inka: key };
  }

  // ============================================================
  // Türkçe Funktionsnamen — die Basis
  // ============================================================

  function ekle(id) {          // ekle = hinzufügen
    if (id === null || id === undefined) return liste();
    set.add(id);
    return liste();
  }

  function cikar(id) {         // çıkar = entfernen
    set.delete(id);
    return liste();
  }

  function temizle() {         // temizle = leeren
    set.clear();
    return liste();
  }

  function liste() {           // liste = Liste
    return [...set];
  }

  // ============================================================
  // Türkçe Stand — mit Maya und Inka
  // ============================================================

  function durum() {           // durum = Zustand
    const n = set.size;

    if (n === 0) {
      const z = zustandName('leer');
      return {
        durum: 'boş',
        klar: false,
        maya: z.maya,
        inka: z.inka,
        hinweis: 'henüz bir şey yok'   // noch nichts
      };
    }

    if (n === 1) {
      const z = zustandName('allein');
      return {
        durum: 'yalnız',
        klar: true,
        was: liste()[0],
        maya: z.maya,
        inka: z.inka,
        hinweis: 'yalnız — yetebilir. çok şey olabilir.'
      };
    }

    if (n === 2) {
      const z = zustandName('zusammen');
      return {
        durum: 'birlikte',
        klar: true,
        was: liste(),
        maya: z.maya,
        inka: z.inka,
        yanantin: true,        // Inka: zwei Gleiche
        hinweis: 'birlikte — başka bir açıklık. ne fazla ne eksik.'
      };
    }

    // n >= 3
    const z = zustandName('drei');
    return {
      durum: 'üçlü',
      klar: true,
      was: liste(),
      maya: z.maya,
      inka: z.inka,
      masintin: true,          // Inka: das Dritte entsteht
      hinweis: 'üçlü — üçüncü doğar. artık başka bir şey.'
    };
  }

  // ============================================================
  // Kompatibilität — alte Namen bleiben
  // ============================================================
  const hin = ekle;
  const weg = cikar;
  const leer = temizle;
  const stand = durum;

  // ============================================================
  // Öffentlich — beide Welten
  // ============================================================
  window.klar = {
    // Türkçe
    ekle, cikar, temizle, liste, durum,
    // Kompatibilität
    hin, weg, leer, stand,
    // Direkter Zugriff
    set
  };

  // Kleines Geschenk: Selbsterklärung
  window.klar.erklaerung = function () {
    return 'klar — açıklık. Türkçe çalışır. Maya ve İnka fısıldar.';
  };
})();

// ============================================================
// Anwendung
// ============================================================
klar.ekle('ateş');          // Fieber
klar.ekle('ağrı');          // Schmerz
klar.durum();               // birlikte · ka · iskay · yanantin

klar.ekle('yer');           // Ort
klar.durum();               // üçlü · ox · kimsa · masintin

klar.temizle();
klar.durum();               // boş · ma' · mana
