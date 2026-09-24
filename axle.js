// ============================================================
// DER GEMEINSAME NENNER
// ============================================================
const themen = [Soccer, Schach, Wetter, Wette, Slide];

// Jeder wählt SEIN Themengebiet – nicht alle dasselbe.
function raum(gewählt) {
  // gewählt z. B. ["soccer", "schach", "wetter", "slide"]
  const aktiv = themen.filter(t => gewählt.includes(t.name));

  // Mathematik: der gemeinsame Nenner ist das Produkt der Anzahlen.
  // Physik: die Wirkungen interferieren.
  const wirkungen = aktiv.map(t => t.wirkung());
  const summe = wirkungen.reduce((a, b) => a + b, 0);
  const mittel = summe / wirkungen.length;

  // Phase: nicht nur Stärke, sondern Ausrichtung.
  // Zwei Wirkungen, die gleich stark sind, aber entgegengesetzt,
  // heben sich auf. Das ist Physik.
  const phase = wirkungen.reduce((a, b) => a * b, 1); // 0..1

  return {
    nenner: aktiv.length,
    summe: summe.toFixed(2),
    mittel: mittel.toFixed(2),
    phase: phase.toFixed(3),
    farbe: mischeFarben(aktiv.map(t => t.farbe)),
  };
}
