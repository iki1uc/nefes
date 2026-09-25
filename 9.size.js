// TMP · vorläufig · name bleibt 9.size.js
// ============================================================
// 9.size.js — die größe der 9
// Türkçe: dokuz · boyut = neun · größe
// Maya:   ox · u nich' = drei · maß
// İnka:   kimsa · tupu = drei · fassung
//
// 9 ist der ARBEITSRAUM. Das Volumen.
// Was man im Manöver tragen kann. Nicht mehr, nicht weniger.
//
// Der Name sagt: größe. Also misst die Datei größe.
// Sie LÄUFT nicht. Sie REchnet nur.
// Sie dient run.js und runtime.js. Sie schreibt ihnen nichts vor.
// ============================================================

const NEUN = (() => {

  const FELDER = 9;   // 3 × 3 · das fassungsvermögen

  // ---- was ist im raum? ----
  // eingang: eine liste von dingen, die im arbeitsraum liegen
  // z.B. [{ wer: "p1", was: 3 }, ...]
  function zustand(dinge) {
    const belegt = Array.isArray(dinge) ? dinge.length : 0;
    const frei   = FELDER - belegt;
    return {
      felder:  FELDER,
      belegt:  Math.min(belegt, FELDER),
      frei:    Math.max(0, frei),
      voll:    belegt >= FELDER,
      überlauf: Math.max(0, belegt - FELDER),
    };
  }

  // ---- passt es rein? ----
  // ja, wenn frei >= 1
  function passt(dinge, anzahl) {
    const n = anzahl || 1;
    const z = zustand(dinge);
    return z.frei >= n;
  }

  // ---- wie viel ist noch zu tragen? ----
  // maß in 9er-einheiten: 0..1
  function last(dinge) {
    const z = zustand(dinge);
    return z.belegt / FELDER;
  }

  // ---- welche form hat die ladung? ----
  // 3×3 raster: wie viele reihen sind voll, wie viele spalten?
  function raster(dinge) {
    const z = zustand(dinge);
    const voll = Math.floor(z.belegt / 3);
    const rest = z.belegt % 3;
    return {
      reihen: voll,
      letzteReihe: rest,
      spalten: Math.min(3, z.belegt),
    };
  }

  // ---- die größe in zahlen ----
  // für run.js: ein kurzer bericht, nicht mehr
  function größe(dinge) {
    const z = zustand(dinge);
    const l = last(dinge);
    const r = raster(dinge);
    return {
      felder: FELDER,
      belegt: z.belegt,
      frei:   z.frei,
      voll:   z.voll,
      last:   Math.round(l * 100) / 100,   // 0..1
      raster: r,
      tr:     "dokuz · boyut",
      maya:   "ox · u nich'",
      inka:   "kimsa · tupu",
    };
  }

  return {
    FELDER,
    zustand,
    passt,
    last,
    raster,
    größe,
  };
})();

// ---- am atem hängen, wenn NEFES da ist ----
// dienlich, nicht führend. 9.size sagt nur: hier ist ein arbeitsraum.
if (typeof window !== "undefined" && window.NEFES && window.NEFES.registriere) {
  window.NEFES.registriere("9size", function (phase, richtung, t) {
    // 9.size tut im takt NICHTS.
    // Sie ist kein hörer. Sie ist ein maß.
    // Sie wird gerufen, wenn jemand sie braucht.
    // Dieser eintrag existiert nur, damit NEFES weiß: 9.size ist da.
  });
}

if (typeof window !== "undefined") window.NEUN = NEUN;
