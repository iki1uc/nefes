// ki.js — Klärung durch Kombination
// 1 allein = Sein
// 1+2, 1+3, 2+3 = Beziehungen
// Kombination klärt das Ausmaß

const ki = (() => {
  const zustand = new Map();

  // Einzelzustand setzen
  function set(id, wert) {
    zustand.set(id, wert);
    return id;
  }

  // Kombination prüfen
  function klar(...ids) {
    const aktiv = ids.filter(i => zustand.has(i));
    if (aktiv.length === 0) return { klar: false, grund: 'nichts' };
    if (aktiv.length === 1) return {
      klar: true,
      art: 'einzel',
      id: aktiv[0],
      hinweis: 'ein Zeichen — kann reichen, kann viel sein'
    };
    return {
      klar: true,
      art: 'kombination',
      ids: aktiv,
      hinweis: 'mehrere Zeichen zusammen — enger'
    };
  }

  // Alles anzeigen
  function band() {
    return Array.from(zustand.entries());
  }

  return { set, klar, band, zustand };
})();

// Anwendung
ki.set('fieber', 1);
ki.set('schmerz', 1);

ki.klar('fieber');                  // einzel
ki.klar('fieber', 'schmerz');       // kombination
ki.klar('fieber', 'schmerz', 'ort'); // enger, wenn ort gesetzt
