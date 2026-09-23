// hal.js — die Lage
// Türkçe: hal = Zustand, Lage, Befinden
// Maya:  u hal = der Zustand (Maya-Sprache)
// Inka:  kawsay = Leben, Dasein
//
// hal ist die Summe.
// Es liest bir · iki · uc · ki · klar · dur.
// Es fügt nichts hinzu. Es zeigt nur.
// Ein Blick. Alles.

(function () {
  'use strict';

  // ============================================================
  // LAGE — die Summe aller Zustände
  // ============================================================
  function lage() {
    const teile = {};

    // bir — aus window.üç? nein, bir ist HTML
    // wir lesen, was da ist
    if (typeof window.üç === 'object' && window.üç.klar) {
      const k = window.üç.klar();
      teile.uc = {
        klar: k.art || 'boş',
        maya: k.maya || 'ma\'',
        inka: k.inka || 'mana',
        knoten: Object.keys(window.üç.knoten || {}).length,
        bez: (window.üç.beziehungen || []).filter(b => b.aktiv).length
      };
    }

    if (typeof window.klar === 'object' && window.klar.durum) {
      const k = window.klar.durum();
      teile.klar = {
        durum: k.durum || 'boş',
        maya: k.maya || 'ma\'',
        inka: k.inka || 'mana',
        was: k.was || null
      };
    }

    if (typeof window.dur === 'object' && window.dur.sachverhalt) {
      const d = window.dur.sachverhalt();
      teile.dur = {
        sachverhalt: d.sachverhalt || 'serbest',
        maya: d.maya || 'ma\'',
        inka: d.inka || 'mana',
        halte: d.sayi || 0
      };
    }

    // ============================================================
    // GESAMTLAGE — alles zusammen
    // ============================================================
    const anzahl = Object.keys(teile).length;

    if (anzahl === 0) {
      return {
        hal: 'boş',
        klar: false,
        maya: 'ma\'',
        inka: 'mana',
        hinweis: 'hiçbir şey yok — nichts da'
      };
    }

    return {
      hal: 'birlikte',
      klar: true,
      anzahl: anzahl,
      teile: teile,
      maya: anzahl === 1 ? 'hun' : anzahl === 2 ? 'ka' : 'ox',
      inka: anzahl === 1 ? 'huk' : anzahl === 2 ? 'iskay' : 'kimsa',
      hinweis: anzahl + ' parça — ' + anzahl + ' Teile'
    };
  }

  // ============================================================
  // VE — das "und" · Verbinder
  // Wie in dur.js, aber hier für die ganze Lage
  // ============================================================
  function ve() {
    const alle = [];
    const l = lage();
    if (l.teile) {
      Object.keys(l.teile).forEach(k => alle.push(k));
    }
    return {
      ve: alle,
      maya: alle.length === 1 ? 'hun' : alle.length === 2 ? 'ka' : 'ox',
      inka: alle.length === 1 ? 'huk' : alle.length === 2 ? 'iskay' : 'kimsa',
      hinweis: alle.length === 0 ? 'hiçbir şey' : alle.join(' ve ')
    };
  }

  // ============================================================
  // BILD — zeichnet die Lage auf einen Canvas
  // Nur wenn es einen Canvas mit id="ch" gibt
  // ============================================================
  function bild() {
    const c = document.getElementById('ch');
    if (!c) return null;
    const ctx = c.getContext('2d');
    const l = lage();

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, c.width, c.height);

    // Titel
    ctx.fillStyle = '#ffcc44';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('hal · ' + l.hal, c.width / 2, 40);

    ctx.fillStyle = '#5fc8ff';
    ctx.font = '13px sans-serif';
    ctx.fillText('maya ' + l.maya + ' · inka ' + l.inka, c.width / 2, 75);

    // Teile als Liste
    if (l.teile) {
      let y = 130;
      Object.entries(l.teile).forEach(([name, wert]) => {
        ctx.fillStyle = '#ffcc44';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(name, 60, y);

        ctx.fillStyle = '#eee';
        ctx.font = '12px sans-serif';
        const text = Object.entries(wert)
          .map(([k, v]) => k + ':' + JSON.stringify(v))
          .join(' · ');
        ctx.fillText(text, 130, y);

        y += 30;
      });
    }

    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(l.hinweis, c.width - 20, c.height - 20);

    return l;
  }

  // ============================================================
  // ERKLÄRUNG
  // ============================================================
  const erklaerung = function () {
    return 'hal — die Lage. Liest bir, iki, uc, ki, klar, dur. ' +
           'Fügt nichts hinzu. Zeigt nur. ' +
           'Maya: u hal. Inka: kawsay. Türkçe: hal.';
  };

  // ============================================================
  // ÖFFENTLICH
  // ============================================================
  const hal = {
    lage,
    ve,
    bild,
    erklaerung
  };

  if (typeof window !== 'undefined') {
    window.hal = hal;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = hal;
  }

  // Wenn ein Canvas #ch da ist, einmal zeichnen
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bild);
    } else {
      bild();
    }
  }
})();

// ============================================================
// Anwendung
// ============================================================
//
// hal.lage();       // → gesamte Lage
// hal.ve();         // → was ist alles da, verbunden
// hal.bild();       // → zeichnet auf #ch
// hal.erklaerung(); // → erklärt sich selbst
