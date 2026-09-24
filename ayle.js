NEFES.registriere("ayle", (phase, richtung, t) => {
  // bei jedem Atemzug: Pegel vom Mikrofon lesen
  if (richtung === "ein" && phase < 0.05) {
    AYLE.höre(phase);    // hört die Phase, speichert sie
  }
});
