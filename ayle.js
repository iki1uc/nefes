// ============================================================
// ayle.js — die familie
// aus notizen wird zusammenhalt
// ============================================================

const AYLE = (() => {

  // --- 1. die familie ---
  // Jede Person hat: eine Rolle, eine Zeit des Eintritts, eine Verbindung
  const familie = new Map();
  // fürWen → { rolle, seit, mit: Set(), reihenfolge }

  // --- 2. aufnehmen ---
  // Wer kommt dazu? Aus 1 wird 2, aus 2 wird 3, aus 3 wird 4.
  function aufnehmen(person, rolle = "kind") {
    if (!familie.has(person)) {
      familie.set(person, {
        rolle,           // "mutter", "vater", "kind", "gast"
        seit: Date.now(),
        mit: new Set(),  // mit wem ist diese person verbunden
      });
    }
    return familie.get(person);
  }

  // --- 3. verbinden ---
  // Zwei Personen werden verwandt. Aus 2 wird ein Paar.
  function verbinden(a, b, wie = "geschwister") {
    aufnehmen(a); aufnehmen(b);
    familie.get(a).mit.add(b);
    familie.get(b).mit.add(a);
    // die achse soll es wissen
    if (typeof ACHSE !== "undefined") {
      ACHSE.notiere({
        was: "verwandt." + wie,
        warum: "familie wächst",
        fürWen: a + "+" + b,
        deckt: [a, b].sort().join("+"),
      });
    }
  }

  // --- 4. der kreis ---
  // Bei 4 personen ist die familie geschlossen.
  function geschlossen() {
    return familie.size >= 4;
  }

  // --- 5. wer gehört zu wem ---
  function stammbaum() {
    return Object.fromEntries(
      [...familie].map(([name, info]) => [name, {
        rolle: info.rolle,
        mit: [...info.mit],
        seit: info.seit,
      }])
    );
  }

  // --- 6. die überführung ---
  // 1 → 2 → 3 → 4. Jeder schritt ist eine überführung.
  function überführung() {
    const n = familie.size;
    if (n === 0) return { stand: 0, name: "leer",     führt: null };
    if (n === 1) return { stand: 1, name: "punkt",    führt: "axle" };
    if (n === 2) return { stand: 2, name: "paar",     führt: "ayle" };
    if (n === 3) return { stand: 3, name: "raum",     führt: "axle+ayle" };
    return         { stand: 4, name: "kreis",        führt: "ayle" };
  }

  // --- 7. der eine lauf ---
  // axle und ayle laufen zusammen. Einer trägt, einer verbindet.
  function lauf() {
    return {
      achse: typeof ACHSE !== "undefined" ? ACHSE.bericht() : null,
      familie: stammbaum(),
      überführung: überführung(),
    };
  }

  return { aufnehmen, verbinden, geschlossen, stammbaum, überführung, lauf,
           get familie() { return [...familie]; } };
})();

if (typeof window !== "undefined") window.AYLE = AYLE;
