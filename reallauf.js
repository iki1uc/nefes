// ============================================================
// runtime.js — der eine atem
// alles andere hängt hier dran. eine datei. ein takt.
// ============================================================

const NEFES = (() => {

  // ---- der takt ----
  // 4 sekunden ein. 4 sekunden aus. 8 sekunden ein atem.
  const TAKT = 8000;
  const HÄLFTE = TAKT / 2;

  // ---- was hängt dran ----
  const hörer = new Map();   // name → funktion(phase, t)
  let phase = 0;             // 0..1 im takt
  let richtung = "ein";      // "ein" oder "aus"
  let start = performance.now();
  let läuft = true;

  // ---- anmelden ----
  // Jede datei, die etwas tun will, ruft das hier auf.
  // name  = "axle", "bitki", "kultur", ...
  // funktion(phase, richtung, t) wird bei jedem frame gerufen.
  function registriere(name, funktion) {
    hörer.set(name, funktion);
    return () => hörer.delete(name);   // abmelden
  }

  // ---- der eine loop ----
  function tick(now) {
    if (!läuft) return;

    const t = (now - start) % TAKT;
    phase = t / TAKT;
    richtung = t < HÄLFTE ? "ein" : "aus";

    // alle hörer rufen
    for (const [name, fn] of hörer) {
      try { fn(phase, richtung, t); }
      catch (e) { console.error(name, e); }
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ---- steuerung ----
  function halt() { läuft = false; }
  function weiter() { if (!läuft) { läuft = true; start = performance.now(); requestAnimationFrame(tick); } }
  function zurücksetzen() { start = performance.now(); phase = 0; }

  // ---- export ----
  return {
    registriere,
    halt, weiter, zurücksetzen,
    get phase() { return phase; },
    get richtung() { return richtung; },
    get hörer() { return [...hörer.keys()]; },
    TAKT, HÄLFTE,
  };
})();

if (typeof window !== "undefined") window.NEFES = NEFES;
