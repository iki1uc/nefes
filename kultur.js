{
  zahl: 4,
  name: "schwach",
  farbe: "#8a5a20",
  tat: "nur noch garen",
  jetzt: {
    essbar:  false,      // 4 < 5
    rohOK:   false,
    garenOK: true,       // 4 >= 4
    aroma:   false,      // geruch 0.4 < 0.5
    giftig:  false,
  },
  später: {
    tage: 2,
    wird: "hält noch kurz",
  },
  gift:  "keins",
  aroma: "schwach",
  taugt: ["sauce", "kochen"],   // "roh" fällt weg, weil rohOK=false
}
