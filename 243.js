// TMP · vorläufig · name bleibt 243.js
// ============================================================
// 243.js — der kern
// nur das rechnen. kein DOM. keine anzeige. keine taste.
//
// Türkçe: yalnız hesap — sadece matematik
// Maya:   hun/ka/ox — üç sayı, bir payda
// İnka:   huk/iskay/kimsa — üç, bir bütün
// ============================================================

const KERN = (() => {

  // ---- ggT · größter gemeinsamer teiler · Euklid ----
  function ggT(a, b) {
    while (b) { const t = b; b = a % b; a = t; }
    return a;
  }

  // ---- kgV · kleinstes gemeinsames vielfaches ----
  function kgV(a, b) {
    return a / ggT(a, b) * b;
  }

  // ---- gemeinsamer nenner · ortak payda ----
  // nimmt eine liste von zahlen, gibt das kgV
  function gemeinsamerNenner(zahlen) {
    if (!zahlen || zahlen.length === 0) return null;
    return zahlen.reduce((acc, z) => kgV(acc, z), 1);
  }

  // ---- bruch auf anderen nenner bringen ----
  function aufNenner(zähler, von, auf) {
    return zähler * (auf / von);
  }

  // ---- summe mehrerer brüche auf gemeinsamen nenner ----
  // brüche = [{ zähler, nenner }, ...]
  function summeAufNenner(brüche) {
    if (!brüche || brüche.length === 0) return null;
    const n = gemeinsamerNenner(brüche.map(b => b.nenner));
    const summe = brüche.reduce(
      (acc, b) => acc + aufNenner(b.zähler, b.nenner, n), 0
    );
    return { summe, nenner: n };
  }

  // ---- alles in einem: aus spielern das reine ergebnis ----
  // spieler = [{ methode: { zahl }, zähler, aktiv }, ...]
  function ausSpielern(spieler) {
    const aktive = spieler.filter(s => s.aktiv);
    if (aktive.length === 0) {
      return { nenner: null, summe: null, anzahl: 0 };
    }
    const brüche = aktive.map(s => ({
      zähler: s.zähler,
      nenner: s.methode.zahl,
    }));
    const { summe, nenner } = summeAufNenner(brüche);
    return { nenner, summe, anzahl: aktive.length };
  }

  return {
    ggT,
    kgV,
    gemeinsamerNenner,
    aufNenner,
    summeAufNenner,
    ausSpielern,
  };
})();

// ---- am atem hängen, wenn NEFES da ist ----
// (kein eigener takt. nur hörer.)
if (typeof window.NEFES !== "undefined" && window.NEFES.registriere) {
  window.NEFES.registriere("kern", function (phase, richtung, t) {
    // 243 ist still. es rechnet nur, wenn man es ruft.
    // hörer bleibt trotzdem dran, damit NEFES weiß: 243 existiert.
  });
}

if (typeof window !== "undefined") window.KERN = KERN;
