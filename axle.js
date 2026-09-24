NEFES.registriere("achse", (phase, richtung, t) => {
  // alle 2 sekunden: ein Schnappschuss vom Canvas
  if (richtung === "ein" && phase < 0.05) {
    ACHSE.sehe(phase);   // sieht die Phase, speichert sie
  }
});
