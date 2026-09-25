const JUSTICE = (() => {
  const tafel = [
    { farbe: "blau",    zahl: 2, name: "schach"  },
    { farbe: "grün",    zahl: 3, name: "soccer"  },
    { farbe: "gelb",    zahl: 4, name: "wetter"  },
    { farbe: "violett", zahl: 5, name: "eigenes" },
  ];

  function farbe(zahl)  { return tafel.find(t => t.zahl === zahl); }
  function zahl(name)   { return tafel.find(t => t.name === name); }
  function alle()       { return [...tafel]; }

  return { farbe, zahl, alle, tafel };
})();

if (typeof window !== "undefined") window.JUSTICE = JUSTICE;
