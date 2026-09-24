// ============================================================
// GRUNDGESETZ: jedes Themengebiet gibt nur seine WIRKUNG preis
// ============================================================

// Soccer – innen: Tore, Taktik, Spieler. Außen: nur Wirkung.
const Soccer = {
  name: "soccer",
  farbe: "#3a9a4a",
  // Ursache (privat): was im Soccer passiert
  _tore: 0,
  _pässe: 0,
  schiessen() { this._tore++; this._pässe += 3; },
  // Wirkung (öffentlich): nur eine Zahl 0..1
  wirkung() {
    return Math.min(1, (this._tore * 2 + this._pässe) / 30);
  },
};

// Schach – innen: Figuren, Züge, Matt. Außen: nur Wirkung.
const Schach = {
  name: "schach",
  farbe: "#3a5a9a",
  _figuren: 16,
  _züge: 0,
  ziehen() { this._züge++; this._figuren -= 0.3; },
  wirkung() {
    return Math.min(1, this._züge / 40 + (16 - this._figuren) / 16);
  },
};

// Wetter – innen: Druck, Wind, Regen. Außen: nur Wirkung.
const Wetter = {
  name: "wetter",
  farbe: "#9a9a3a",
  _druck: 1013,
  _wind: 0,
  wehen() { this._wind += 0.4; this._druck -= 1; },
  wirkung() {
    const sturm = Math.min(1, this._wind / 20);
    const tief = Math.min(1, (1013 - this._druck) / 30);
    return (sturm + tief) / 2;
  },
};

// Wette – innen: Quote, Einsatz, Risiko. Außen: nur Wirkung.
const Wette = {
  name: "wette",
  farbe: "#9a3a3a",
  _quote: 2.0,
  _einsatz: 0,
  setzen() { this._einsatz += 1; this._quote = 2 + this._einsatz * 0.1; },
  wirkung() {
    return Math.min(1, Math.log(this._quote) / 3);
  },
};

// Slide – innen: Position, Bewegung, Fläche. Außen: nur Wirkung.
const Slide = {
  name: "slide",
  farbe: "#9a3a9a",
  _position: 0,
  _tempo: 0,
  bewegen(dt) { this._tempo += 0.2 * dt; this._position += this._tempo * dt; },
  wirkung() {
    return Math.min(1, Math.abs(this._tempo) / 5);
  },
};
