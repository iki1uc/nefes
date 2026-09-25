// ============================================================
// run.js — der Lauf
// Türkçe: koş = lauf · çalış = arbeite
// Maya:   ok = gehen
// Inka:   puriy = gehen
//
// Ein Lauf. Führt. Öffnet. Schließt.
// VORLÄUFIG. Die 3 Kabel sind drin.
// Die 9 Ergänzungen sind markiert, aber leer.
// ============================================================

(function () {
  'use strict';

  const lauf = {
    start: Date.now(),
    schritte: [],
    zustand: 'bereit'
  };

  // ---- KABEL 1 · Namens-Brücke ----
  // sucht den Namen einmal in jeder Schreibweise
  // window.NEFES · window.Nefes · window.nefes
  function finde(id) {
    const varianten = [
      id,
      id.toUpperCase(),
      id.charAt(0).toUpperCase() + id.slice(1),
    ];
    for (const v of varianten) {
      const obj = window[v];
      if (obj !== undefined && obj !== null) return obj;
    }
    return undefined;
  }

  // ---- KABEL 2 · Ausführung ----
  // schritt() wird wirklich gerufen — und gezählt
  function schritt(name, fn) {
    lauf.schritte.push(name);
    try {
      const r = typeof fn === 'function' ? fn() : fn;
      return { ok: true, name: name, r: r };
    } catch (e) {
      return { ok: false, name: name, hata: e.message };
    }
  }

  function alle() {
    const reihe = [
      { id: 'bu',      was: '21 sayı' },
      { id: 'su',      was: 'anhängsel' },
      { id: 'nefes',   was: 'atem' },
      { id: 'iki',     was: 'gegenstück' },
      { id: 'üç',      was: 'raum' },
      { id: 'ki',      was: 'wer' },
      { id: 'klar',    was: 'klärung' },
      { id: 'dur',     was: 'halt' },
      { id: 'durdur',  was: 'veranlassen' },
      { id: 'ikilem',  was: 'dilemma' },
      { id: 'hal',     was: 'lage' },
      { id: 'kaygıyı', was: 'sorge' },
      { id: 'birden',  was: 'sequenziell' },
      { id: 'fal',     was: 'orakel' },
      { id: 'sor',     was: 'frage' }
    ];

    return reihe.map(function (e) {
      const obj = finde(e.id);   // ← KABEL 1 wirkt hier
      const da = (typeof obj === 'object' && obj !== null) || typeof obj === 'function';

      // ─── 9.1 · resonanz ─────────────────────────────────────
      // später: wer mit wem schwingt
      // resonanz: []

      // ─── 9.2 · wert 3-7 ─────────────────────────────────────
      // später: statt nur true/false ein reifegrad
      // wert: null

      return { id: e.id, was: e.was, da: da, obj: obj };
    });
  }

  function zustandNeu() {
    const alleListe = window.run.alle();
    const da = alleListe.filter(function (x) { return x.da; }).length;
    lauf.zustand = da === alleListe.length ? 'rund' : 'teilweise';

    // ─── 9.3 · atem-hörer ───────────────────────────────────
    // später: NEFES.registriere("run", ...) in der tick-funktion
    // status: passiv

    // ─── 9.4 · fehler-zähler ────────────────────────────────
    // später: wie viele schritte sind fehlgeschlagen
    // fehler: 0

    // ─── 9.5 · zeit pro schritt ─────────────────────────────
    // später: jeder schritt bekommt dauer in ms
    // zeiten: {}

    // ─── 9.6 · türkçe namen ─────────────────────────────────
    // später: koş() und çalış() als aliase
    // aliase: false

    // ─── 9.7 · maya / inka antworten ────────────────────────
    // später: bei jedem schritt eine antwort aus zwei stimmen
    // stimmen: []

    // ─── 9.8 · bericht nach außen ───────────────────────────
    // später: window.run.bericht() liefert das ganze bild
    // bericht: null

    // ─── 9.9 · resonanz-matrix ──────────────────────────────
    // später: 15 × 15 felder, was schwingt zusammen
    // matrix: null

    return {
      zustand: lauf.zustand,
      da: da,
      gesamt: alleListe.length,
      dauer: Date.now() - lauf.start,
      schritte: lauf.schritte.length
    };
  }

  // ---- KABEL 3 · Anschluss an den Atem ----
  // wenn NEFES existiert: run hört mit
  // wenn nicht: läuft nur einmal (alter zustand, kompatibel)
  if (typeof window.NEFES !== 'undefined' && window.NEFES.registriere) {
    window.NEFES.registriere('run', function (phase, richtung, t) {
      // ─── 9.3 wird hier aktiv, wenn 9.3 gefüllt ist ────────
      if (richtung === 'ein' && phase < 0.05) {
        // zustandNeu();   // ← später aktivieren
      }
    });
  }

  window.run = {
    lauf: lauf,
    schritt: schritt,
    alle: alle,
    zustand: zustandNeu
  };
})();
