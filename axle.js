// ============================================================
// axle.js · die achse
// weiß: wann, warum, für wen, wie oft, und warum es deckt
// ============================================================

const ACHSE = (() => {

  // --- 1. das gedächtnis ---
  const log = [];              // alle ereignisse in reihenfolge
  const zähler = new Map();    // was → wie oft
  const personen = new Map();  // fürWen → { was: n }
  const kombinationen = new Set(); // welche teilmengen wurden gesehen
  const gründe = new Map();    // was → Set von warum

  // --- 2. notiere ---
  function notiere({ was, warum, fürWen, wert = null, thema = null, nenner = null, deckt = null }) {
    const eintrag = {
      zeit: Date.now(),
      was,      // z.B. "wirkung.soccer" oder "würfle"
      warum,    // z.B. "spieler wollte bewegung"
      fürWen,   // z.B. "p1" oder "raum"
      wert,     // z.B. 0.42
      thema,    // z.B. "soccer"
      nenner,   // z.B. 3
      deckt,    // z.B. "soccer+schach" — was diese handlung abdeckt
    };
    log.push(eintrag);

    // häufigkeit
    zähler.set(was, (zähler.get(was) || 0) + 1);

    // für wen
    if (!personen.has(fürWen)) personen.set(fürWen, new Map());
    const pm = personen.get(fürWen);
    pm.set(was, (pm.get(was) || 0) + 1);

    // warum
    if (!gründe.has(was)) gründe.set(was, new Set());
    gründe.get(was).add(warum);

    // deckung
    if (deckt) kombinationen.add(deckt);

    return eintrag;
  }

  // --- 3. wann ---
  function wann(was) {
    const treffer = log.filter(e => e.was === was);
    if (!treffer.length) return null;
    return treffer.map(e => e.zeit);
  }

  // --- 4. warum ---
  function warum(was) {
    return gründe.has(was) ? [...gründe.get(was)] : [];
  }

  // --- 5. für wen ---
  function fürWen(person) {
    if (!personen.has(person)) return null;
    return Object.fromEntries(personen.get(person));
  }

  // --- 6. wie oft ---
  function wieOft(was) {
    return zähler.get(was) || 0;
  }

  // --- 7. deckung: warum es deckt ---
  // Bei N themen gibt es 2^N - 1 mögliche kombinationen.
  // Deckung sagt: wie viele davon wurden erreicht?
  // Und: warum reicht eine kombination, um einen raum zu decken?
  function deckung(alleThemen) {
    const N = alleThemen.length;
    const möglich = Math.pow(2, N) - 1;
    const gesehen = kombinationen.size;
    const quote = gesehen / möglich;
    return {
      möglich,
      gesehen,
      quote: quote.toFixed(3),
      grund: quote >= 0.5
        ? "mehr als die hälfte der ecken erreicht — der raum trägt"
        : quote >= 0.25
          ? "ein viertel der ecken erreicht — der raum beginnt zu tragen"
          : "noch nicht genug ecken — der raum trägt noch nicht",
    };
  }

  // --- 8. bericht ---
  function bericht() {
    return {
      anzahl: log.length,
      häufigkeit: Object.fromEntries(zähler),
      personen: Object.fromEntries(
        [...personen].map(([k, v]) => [k, Object.fromEntries(v)])
      ),
      kombinationen: [...kombinationen],
      letzte: log.slice(-5),
    };
  }

  // --- 9. export ---
  return {
    notiere,
    wann, warum, fürWen, wieOft, deckung, bericht,
    get log() { return [...log]; },
  };
})();

if (typeof window !== "undefined") window.ACHSE = ACHSE;
