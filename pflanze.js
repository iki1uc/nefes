// ============================================================
// pflanze.js — bewertung einer pflanze
// egal ob garten oder supermarkt
// sagt: 3 bis 7, jetzt und später, gift und aroma
// ============================================================

const PFLANZE = (() => {

  // --- 1. die skala ------------------------------------------------
  // 3 = grenze (kippt bald / wird giftig)
  // 4 = schwach (taugt nur noch für bestimmte dinge)
  // 5 = mittel (normal)
  // 6 = gut (volle tauglichkeit)
  // 7 = voll (ideal, jetzt verzehren)
  const SKALA = {
    3: { name: "kippt",      farbe: "#8a2020", tat: "nicht mehr roh" },
    4: { name: "schwach",    farbe: "#8a5a20", tat: "nur noch garen" },
    5: { name: "mittel",     farbe: "#8a8a20", tat: "taugt" },
    6: { name: "gut",        farbe: "#5a8a20", tat: "taugt gut" },
    7: { name: "voll",       farbe: "#208a20", tat: "jetzt verzehren" },
  };

  // --- 2. die wahrheiten ------------------------------------------
  // Jede Pflanze hat drei Wahrheiten:
  //   gift   — was schädlich ist
  //   aroma  — was wertvoll ist (geschmack, duft, wirkung)
  //   taugt  — wofür sie jetzt taugt
  const WAHRHEIT = {
    gift:  [],   // z.B. ["roh giftig", "solanin", "oxalsäure"]
    aroma: [],   // z.B. ["ätherisches öl", "bitterstoff", "vitamin c"]
    taugt: [],   // z.B. ["salat", "tee", "suppe"]
  };

  // --- 3. eine pflanze bewerten -----------------------------------
  // zustand = {
  //   lagerung:   "garten" | "kühlschrank" | "regal" | "tiefkühl"
  //   tage:       wie viele tage liegt sie schon
  //   reife:      0..1  (wie reif ist sie)
  //   wasser:     0..1  (wasseranteil, sinkt beim welken)
  //   geruch:     0..1  (aroma-stärke)
  //   druck:      0..1  (0=fest, 1=matschig)
  //   farbe:      0..1  (0=verblasst, 1=leuchtend)
  // }
  function bewerte(pflanze, zustand) {
    // --- 3a. wie lange noch? (3..7) ---
    // je älter, je welker, desto niedriger
    const lagerBonus = {
      "garten":      2,
      "kühlschrank": 1,
      "tiefkühl":    2,
      "regal":       0,
    }[zustand.lagerung] ?? 0;

    // formel: reife + wasser + farbe + geruch - tage - druck
    const roh =
      (zustand.reife   * 1.5) +
      (zustand.wasser  * 1.0) +
      (zustand.farbe   * 1.0) +
      (zustand.geruch  * 0.5) +
      lagerBonus -
      (zustand.tage * 0.15) -
      (zustand.druck * 2.0);

    // auf 3..7 abbilden
    const zahl = Math.max(3, Math.min(7, Math.round(roh)));

    // --- 3b. was ist jetzt? ---
    const jetzt = {
      essbar:   zahl >= 5,
      rohOK:    zahl >= 6 && !pflanze.gift.includes("roh giftig"),
      garenOK:  zahl >= 4,
      aroma:    zustand.geruch >= 0.5,
      giftig:   pflanze.gift.length > 0 && zahl <= 3,
    };

    // --- 3c. was ist später? ---
    // vorhersage: wenn nichts getan wird
    const tageBisKipp = Math.max(0, Math.floor((zahl - 3) * 2));
    const später = {
      tage:      tageBisKipp,
      wird:      tageBisKipp === 0 ? "jetzt oder nie"
               : tageBisKipp <= 1  ? "kippt morgen"
               : tageBisKipp <= 3  ? "hält noch kurz"
               : "hält"
    };

    // --- 3d. was ist gift, was ist aroma? ---
    // gift wächst, aroma schwindet — beide mit dem zustand
    const giftStärke  = pflanze.gift.length  * (1 - zahl / 7);
    const aromaStärke = pflanze.aroma.length * (zahl / 7);

    return {
      zahl,                          // 3..7
      name: SKALA[zahl].name,
      farbe: SKALA[zahl].farbe,
      tat: SKALA[zahl].tat,
      jetzt,
      später,
      gift:  giftStärke  >= 0.4 ? "achtung" : "keins",
      aroma: aromaStärke >= 0.4 ? "vorhanden" : "schwach",
      taugt: pflanze.taugt.filter(t =>
        t !== "roh" || jetzt.rohOK
      ),
    };
  }

  // --- 4. gift und aroma pro pflanze definieren -------------------
  // Wahrheiten als daten — für jede pflanze
  const BEISPIELE = {
    "Brennnessel": {
      gift:  [],
      aroma: ["kieselsäure", "eisen", "chlorophyll"],
      taugt: ["salat", "suppe", "tee", "pesto"],
    },
    "Rhabarber": {
      gift:  ["oxalsäure in blättern", "roh giftig in blättern"],
      aroma: ["säure", "vitamin c"],
      taugt: ["kuchen", "kompott", "saft"],
    },
    "Tomate": {
      gift:  ["solanin in grünen stellen"],
      aroma: ["lycopin", "umami", "säure"],
      taugt: ["salat", "sauce", "roh"],
    },
    "Kartoffel": {
      gift:  ["solanin in keimen", "grüne stellen giftig"],
      aroma: ["stärke", "kartoffelgeschmack"],
      taugt: ["kochen", "braten", "püree"],
    },
    "Fenchel": {
      gift:  [],
      aroma: ["anethol", "süße"],
      taugt: ["salat", "tee", "gemüse", "roh"],
    },
    "Kamille": {
      gift:  [],
      aroma: ["ätherisches öl", "bisabolol"],
      taugt: ["tee", "tinktur", "umschlag"],
    },
    "Pfefferminze": {
      gift:  [],
      aroma: ["menthol", "ätherisches öl"],
      taugt: ["tee", "salat", "dessert"],
    },
    "Bärlauch": {
      gift:  ["verwechslung mit maiglöckchen"],
      aroma: ["knoblauchöl", "schwefel"],
      taugt: ["pesto", "suppe", "butter", "roh"],
    },
    "Holunder": {
      gift:  ["rohe beeren giftig", "cyanid in rohen kernen"],
      aroma: ["sambunigrin", "säure"],
      taugt: ["saft", "gelee", "mus"],
    },
  };

  // --- 5. beispiele bewerten --------------------------------------
  function bewerteAlle(beispiele) {
    const aus = {};
    for (const [name, p] of Object.entries(beispiele)) {
      aus[name] = bewerte(p, {
        lagerung: "garten",
        tage: 0,
        reife: 0.8,
        wasser: 0.8,
        geruch: 0.7,
        druck: 0.1,
        farbe: 0.9,
      });
    }
    return aus;
  }

  return { SKALA, WAHRHEIT, BEISPIELE, bewerte, bewerteAlle };
})();

if (typeof window !== "undefined") window.PFLANZE = PFLANZE;
