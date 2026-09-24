NEFES.registriere("bitki", (phase, richtung, t) => {
  // bei jeder Bewegung: Lage lesen
  BITKI.fühle(phase, richtung);   // fühlt den Takt
});
// ============================================================
// bitki.js — BITKI · die hand
// fühlt: bewegung · lage · erschütterung
// ============================================================
const BITKI = (() => {
  const bewegungen = [];
  const MAX = 100;
  let letzteBeschleunigung = { x: 0, y: 0, z: 0 };

  function starte() {
    window.addEventListener("devicemotion", (e) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const dx = a.x - letzteBeschleunigung.x;
      const dy = a.y - letzteBeschleunigung.y;
      const dz = a.z - letzteBeschleunigung.z;
      const stärke = Math.sqrt(dx*dx + dy*dy + dz*dz);
      letzteBeschleunigung = { x: a.x, y: a.y, z: a.z };
      bewegungen.push({ zeit: Date.now(), stärke });
      if (bewegungen.length > MAX) bewegungen.shift();
    });
  }

  function fühle(phase, richtung) {
    // die hand fühlt den takt — auch ohne sensor
    const letzte = bewegungen[bewegungen.length - 1];
    return { phase, richtung, stärke: letzte ? letzte.stärke : 0 };
  }

  return { starte, fühle, get bewegungen() { return [...bewegungen]; } };
})();

NEFES.registriere("bitki", (phase, richtung, t) => {
  BITKI.fühle(phase, richtung);
});

if (typeof window !== "undefined") window.BITKI = BITKI;
