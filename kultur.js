// ============================================================
// kultur.js — KULTUR · der mund
// spricht: tradition · sprache · farbe
// ============================================================
const KULTUR = (() => {
  const TRADITIONEN = {
    türkisch: { farbe: "#9a3a3a", pflanzen: ["Brennnessel", "Minze", "Fenchel", "Thymian"] },
    deutsch: { farbe: "#9a9a3a", pflanzen: ["Kamille", "Bärlauch", "Löwenzahn", "Spitzwegerich"] },
    keltisch: { farbe: "#3a5a9a", pflanzen: ["Holunder", "Salbei", "Rosmarin", "Pfefferminze"] },
  };

  function fürPflanze(name) {
    const out = [];
    for (const [k, v] of Object.entries(TRADITIONEN)) {
      if (v.pflanzen.includes(name)) out.push({ name: k, farbe: v.farbe });
    }
    return out;
  }

  function sprich(phase, richtung) {
    // der mund spricht im takt — bei "ein" die eine stimme, bei "aus" die andere
    const stimme = richtung === "ein" ? "maya" : "inka";
    document.body.dataset.stimme = stimme;
  }

  return { TRADITIONEN, fürPflanze, sprich };
})();

NEFES.registriere("kultur", (phase, richtung, t) => {
  if (phase < 0.05) KULTUR.sprich(phase, richtung);
});

if (typeof window !== "undefined") window.KULTUR = KULTUR;
