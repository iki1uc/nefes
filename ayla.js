NEFES.registriere("ayle", (phase, richtung, t) => {
  // jede 8 sekunden: ein atemzug, ein band zwischen zwei personen
  if (t < 16) {
    const personen = AYLE.familie.map(([n]) => n);
    if (personen.length >= 2) {
      AYLE.verbinden(personen[0], personen[1], "atem");
    }
  }
});
