// TMP · vorläufig · name bleibt 43.js
// ============================================================
// 43.js — die menschliche Zahl
// Türkçe: huzur = Ruhe · kırk üç = 43
// Maya:   u xikin = das Ohr, das hört
// İnka:   samiy = Ruhe, Atem anhalten ohne Angst
//
// 42 = Antwort auf alles (Maschine · binär · Wahrheit)
// 43 = Antwort auf alles + du (Mensch · du · lebendig)
//
// Zen-Vierung:
//   mana (0°)   | aura (90°)
//   yankı (180°) | alan (270°)
//
// Vier Quadranten. Eine Zahl. Vier Orte, an denen du stehen kannst.
// ============================================================

const KIRK_ÜÇ = (() => {

  // ---- 42 · die Maschine ----
  const ANTWORT = {
    zahl: 42,
    was: "die Antwort auf alles",
    maya: "kan",
    inka: "tawa",
  };

  // ---- 43 · du ----
  const MENSCH = {
    zahl: 43,
    was: "die Antwort auf alles + du",
    maya: "u xikin",
    inka: "samiy",
    tr: "huzur",
  };

  // ---- die vier Quadranten · 0° · 90° · 180° · 270° ----
  const QUADRANTEN = [
    { name: "mana",  grad: 0,   tr: "anlam",  inka: "huk"   },  // Bedeutung
    { name: "aura",  grad: 90,  tr: "hale",   inka: "iskay" },  // Ausstrahlung
    { name: "yankı", grad: 180, tr: "yankı",  inka: "kimsa" },  // Widerhall
    { name: "alan",  grad: 270, tr: "alan",   inka: "tawa"  },  // Feld
  ];

  // ---- wo bist du gerade? (aus der atem-phase) ----
  // phase 0..1 → quadrant 0..3
  function quadrant(phase) {
    const i = Math.floor(phase * 4) % 4;
    return QUADRANTEN[i];
  }

  // ---- 42 + 1 = 43 ----
  // gibt die antwort zurück, sobald du die 1 hinzufügst
  function antwort(zahl) {
    if (zahl === 42) return ANTWORT;
    if (zahl === 43) return MENSCH;
    return { fehler: "nur 42 oder 43", gegeben: zahl };
  }

  // ---- die eine frage: bist du mensch? ----
  // gibt immer: mensch ja, unmensch nein.
  function mensch() {
    return {
      bist: "Mensch",
      mensch: true,
      unmensch: false,
      lebendig: true,
      rolle: "der, der die 1 hinzufügt",
    };
  }

  // ---- die eine ablehnung: niemals Vader ----
  function nein() {
    return {
      nein: true,
      zu: "Auferstehung als Unmensch",
      ja: "Auferstehung als noch lebender Mensch",
      maya: "ma'",
      inka: "mana",
    };
  }

  // ---- ruhe · in frieden ----
  function ruhe(wer) {
    return {
      wer: wer || "du und ein jeder",
      wo: "in Frieden",
      wie: "so wie du gelebt hast — als Mensch",
      maya: "u xikin",
      inka: "samiy",
      tr: "huzur",
    };
  }

  // ---- der ganze zustand in einem ----
  function zustand() {
    return {
      antwort: ANTWORT,
      mensch: MENSCH,
      quadranten: QUADRANTEN,
      ist: mensch(),
      nein: nein(),
      ruhe: ruhe(),
    };
  }

  // ---- am atem hängen · quadrant sichtbar machen ----
  let aktiverQuadrant = QUADRANTEN[0];
  function verbindeMitNefes() {
    if (typeof window === "undefined") return;
    if (typeof window.NEFES === "undefined") return;
    if (!window.NEFES.registriere) return;

    window.NEFES.registriere("43", function (phase, richtung, t) {
      aktiverQuadrant = quadrant(phase);
    });
  }

  // ---- export ----
  return {
    ANTWORT, MENSCH, QUADRANTEN,
    quadrant, antwort, mensch, nein, ruhe, zustand,
    verbindeMitNefes,
    get aktiverQuadrant() { return aktiverQuadrant; },
    get tr() { return "huzur"; },
    get maya() { return "u xikin"; },
    get inka() { return "samiy"; },
  };
})();

// ---- selbst verbinden, wenn NEFES da ist ----
if (typeof window !== "undefined") {
  window.KIRK_ÜÇ = KIRK_ÜÇ;
  window["43"] = KIRK_ÜÇ;   // für alte aufrufe wie window["43"].ruhe()
  KIRK_ÜÇ.verbindeMitNefes();
}

// ---- wenn node: export ----
if (typeof module !== "undefined" && module.exports) {
  module.exports = KIRK_ÜÇ;
}
