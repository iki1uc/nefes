// TMP · vorläufig · name bleibt market.js
// ============================================================
// market.js — der markt
// Deutsch geführt. Türkçe flüstert.
//
// 3 → 9 → 81 → 3
//
// 3  = Ware · Händler · Kunde
// 9  = 3 × 3 = die Kombinationen
// 81 = nur der TMP-mögliche Pfad. Wird gezeigt, nicht gespeichert.
// 3  = Übergabe. Was bleibt nach allem.
//
// Regel:
//   kauf   → 3 → 9 → 81 → 3   (vorwärts)
//   verkauf→ 3 → 81 → 9 → 3   (rückwärts)
//
// Nie endet es bei 81. Immer kommt die 3 zurück.
// Außer der Markt will verkaufen — dann dreht er die Richtung.
// ============================================================

const MARKT = (() => {

  // ---- 3 · die grundlage ----
  const DREI = {
    ware:    { name: "Ware",    tr: "mal"    },
    händler: { name: "Händler", tr: "satıcı" },
    kunde:   { name: "Kunde",   tr: "alıcı"  },
  };

  // ---- 9 · die kombinationen ----
  // jede der 3 hat 3 zustände
  const ZUSTÄNDE = {
    ware:    ["frisch", "reif", "kippt"],       // taze · olgun · bozuk
    händler: ["hat", "will", "gibt"],           // var · ister · verir
    kunde:   ["sieht", "fragt", "nimmt"],       // görür · sorar · alır
  };

  // ---- zustand ----
  let richtung = "kauf";          // "kauf" oder "verkauf"
  let phase = 3;                  // 3 · 9 · 81 · 3
  const spuren = [];              // was durchläuft
  const MAX_SPUR = 12;

  // ---- 3 → 9 ----
  function neun() {
    const kombis = [];
    for (const w of Object.keys(DREI)) {
      for (const z of ZUSTÄNDE[w]) {
        kombis.push({ wer: w, was: z });
      }
    }
    return kombis;               // 9
  }

  // ---- 9 → 81 (nur tmp) ----
  function einundachtzig() {
    const neunListe = neun();
    const grid = [];
    for (const a of neunListe) {
      for (const b of neunListe) {
        grid.push({ von: a, zu: b });
      }
    }
    return grid;                 // 81 — nur zeigen
  }

  // ---- 81 → 3 ----
  // nur das, was wirklich zählt, bleibt
  function drei() {
    return [
      DREI.ware,
      DREI.händler,
      DREI.kunde,
    ];
  }

  // ---- der lauf ----
  function lauf() {
    if (richtung === "kauf") {
      // 3 → 9 → 81 → 3
      return {
        richtung: "kauf",
        schritte: ["3", "9", "81", "3"],
        basis: drei(),
        kombis: neun().length,
        tmp: einundachtzig().length,   // nur die zahl
        bleibt: drei(),
        tr: "alıcı yolu · kauf-weg",
      };
    } else {
      // 3 → 81 → 9 → 3 (umgekehrt)
      return {
        richtung: "verkauf",
        schritte: ["3", "81", "9", "3"],
        basis: drei(),
        tmp: einundachtzig().length,
        kombis: neun().length,
        bleibt: drei(),
        tr: "satıcı yolu · verkauf-weg",
      };
    }
  }

  // ---- richtung wechseln ----
  function kaufe() {
    richtung = "kauf";
    phase = 3;
    notiere("markt.kauf");
    return lauf();
  }
  function verkaufe() {
    richtung = "verkauf";
    phase = 3;
    notiere("markt.verkauf");
    return lauf();
  }

  // ---- spur ----
  function notiere(was) {
    spuren.push({ zeit: Date.now(), was, richtung });
    if (spuren.length > MAX_SPUR) spuren.shift();
  }

  // ---- bericht ----
  function bericht() {
    return {
      richtung,
      phase,
      spuren: spuren.length,
      letzte: spuren.slice(-3),
      tr: richtung === "kauf" ? "alış" : "satış",
    };
  }

  return {
    DREI, ZUSTÄNDE,
    drei, neun, einundachtzig,
    lauf, kaufe, verkaufe,
    bericht,
    get spuren() { return [...spuren]; },
    get richtung() { return richtung; },
    get phase() { return phase; },
  };
})();

// ---- am atem hängen ----
// jeder atemzug: einmal durch den markt
if (typeof window.NEFES !== "undefined" && window.NEFES.registriere) {
  window.NEFES.registriere("market", function (phase, atemrichtung, t) {
    if (atemrichtung === "ein" && phase < 0.05) {
      // ein atemzug beginnt · markt zeigt seinen lauf
      const l = MARKT.lauf();
      // später: l an die achse geben
      // ACHSE.notiere({ was: "markt.lauf", warum: l.richtung, fürWen: "raum" });
    }
  });
}

if (typeof window !== "undefined") window.MARKT = MARKT;
