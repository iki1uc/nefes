NEFES.registriere("axle", (phase, richtung, t) => {
  if (richtung === "ein" && phase < 0.02) {
    // ein atemzug beginnt — die achse merkt es
    ACHSE.notiere({ was: "atem.ein", warum: "takt", fürWen: "raum" });
  }
  if (richtung === "aus" && phase > 0.52 && phase < 0.54) {
    ACHSE.notiere({ was: "atem.aus", warum: "takt", fürWen: "raum" });
  }
});
