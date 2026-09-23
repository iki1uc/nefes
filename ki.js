// ki.js — Klärung durch Kombination
// ki = wer (Türkçe)
//
// Maya — máak = wer · hun, ka, ox = 1, 2, 3
// Inka — pi   = wer · huk, iskay, kimsa = 1, 2, 3
//
// 1 allein = Sein
// 1+2, 1+3, 2+3 = Beziehungen
// Kombination klärt das Ausmaß

const ki = (() => {
  const zustand = new Map();

  // Zahlen — beide Welten
  const ZAHLEN = {
    1: { maya: 'hun',   inka: 'huk'   },
    2: { maya: 'ka',    inka: 'iskay' },
    3: { maya: 'ox',    inka: 'kimsa' },
  };

  function zahlName(n) {
    return ZAHLEN[n] || { maya: String(n), inka: String(n) };
  }

  // Einzelzustand setzen
  function set(id, wert) {
    zustand.set(id, wert);
    return id;
  }

  // Kombination prüfen
  function klar(...ids) {
    const aktiv = ids.filter(i => zustand.has(i));

    if (aktiv.length === 0) {
      return {
        klar: false,
        grund: 'nichts',
        maya: 'ma\'',
        inka: 'mana',
        hinweis: 'nichts — nicht einmal ein Zeichen'
      };
    }

    if (aktiv.length === 1) {
      const z = zahlName(aktiv.length);
      return {
        klar: true,
        art: 'einzel',
        id: aktiv[0],
        maya: z.maya,
        inka: z.inka,
        hinweis: 'ein Zeichen — kann reichen, kann viel sein'
      };
    }

    // 2 oder 3 — Kombination
    const z = zahlName(aktiv.length);
    return {
      klar: true,
      art: 'kombination',
      ids: aktiv,
      maya: z.maya,
      inka: z.inka,
      yanantin: aktiv.length === 2, // zwei Gleiche
      masintin: aktiv.length >= 2, // das Dritte entsteht
      hinweis: 'mehrere Zeichen zusammen — enger'
    };
  }

  // Alles anzeigen
  function band() {
    return Array.from(zustand.entries());
  }

  return { set, klar, band, zustand, ZAHLEN, zahlName };
})();

// Anwendung
ki.set('fieber', 1);
ki.set('schmerz', 1);

ki.klar('fieber');                   // hun · huk · einzel
ki.klar('fieber', 'schmerz');        // ka · iskay · yanantin
ki.klar('fieber', 'schmerz', 'ort'); // ox · kimsa · masintin
