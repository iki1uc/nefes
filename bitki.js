NEFES.registriere("bitki", (phase, richtung, t) => {
  // bei jeder Bewegung: Lage lesen
  BITKI.fühle(phase, richtung);   // fühlt den Takt
});
