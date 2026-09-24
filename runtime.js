<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<meta name="theme-color" content="#0a0a0f">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>nefes · index</title>
<style>
  :root {
    --bg:#0a0a0f; --fg:#e8e8f0; --dim:#6a6a7a; --linie:#1a1a25;
    --safe-top: env(safe-area-inset-top, 0px);
    --safe-bottom: env(safe-area-inset-bottom, 0px);
    --safe-left: env(safe-area-inset-left, 0px);
    --safe-right: env(safe-area-inset-right, 0px);
  }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html, body {
    margin: 0; padding: 0;
    overscroll-behavior: none;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  body {
    min-height: 100vh;
    min-height: 100dvh;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    background: var(--bg); color: var(--fg);
    display: flex; flex-direction: column;
    transition: background .8s ease;
    padding-top: var(--safe-top);
    padding-bottom: var(--safe-bottom);
    padding-left: var(--safe-left);
    padding-right: var(--safe-right);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
  header {
    padding: 1rem; display: flex; justify-content: space-between;
    align-items: baseline; border-bottom: 1px solid var(--linie);
  }
  header h1 { margin: 0; font-size: 1.1rem; font-weight: 500; letter-spacing: .1em; }
  header .meta { color: var(--dim); font-size: .75rem; font-variant-numeric: tabular-nums; }

  #bühne {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 1.5rem 1rem; gap: 1.25rem;
    min-height: 0;
  }

  #spieler {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 1rem; width: min(100%, 24rem);
  }
  .slot {
    aspect-ratio: 1; border-radius: 1rem;
    background: #12121a; border: 2px solid var(--linie);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: .75rem; text-align: center; cursor: pointer;
    transition: border-color .3s, opacity .3s, transform .1s;
    position: relative;
    touch-action: manipulation;
  }
  .slot:active { transform: scale(.97); }
  .slot.aktiv { border-color: currentColor; }
  .slot .name { font-size: .7rem; color: var(--dim); letter-spacing: .1em; text-transform: uppercase; }
  .slot .wert { font-size: 2rem; margin: .25rem 0; font-weight: 300; font-variant-numeric: tabular-nums; }
  .slot .methode { font-size: .65rem; color: var(--dim); }
  .slot.leer { opacity: .45; }
  .slot .pfeil {
    position: absolute; top: .5rem; right: .6rem;
    font-size: .7rem; color: var(--dim); opacity: 0;
    transition: opacity .3s;
  }
  .slot:not(.leer) .pfeil { opacity: .6; }

  #nenner {
    text-align: center; padding: 1rem 0;
    border-top: 1px solid var(--linie); border-bottom: 1px solid var(--linie);
    width: 100%;
  }
  #nenner .label { font-size: .7rem; color: var(--dim); letter-spacing: .15em; text-transform: uppercase; }
  #nenner .zahl { font-size: 3rem; font-weight: 200; margin: .25rem 0; font-variant-numeric: tabular-nums; }
  #nenner .eins { font-size: .85rem; color: var(--dim); font-variant-numeric: tabular-nums; }

  #überführung {
    text-align: center; padding: .6rem;
    font-size: .8rem; color: var(--dim);
  }
  #überführung .stand { font-size: 1.2rem; color: var(--fg); font-weight: 300; letter-spacing: .1em; }
  #überführung .führt { opacity: .7; }

  #protokoll {
    padding: .6rem 1rem; font-size: .75rem; color: var(--dim);
    height: 5rem; overflow-y: auto;
    border-top: 1px solid var(--linie); border-bottom: 1px solid var(--linie);
    -webkit-overflow-scrolling: touch;
    user-select: text; -webkit-user-select: text;
  }
  #protokoll div { padding: .15rem 0; }

  #achsen {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: var(--linie);
    border-bottom: 1px solid var(--linie);
  }
  .achse-box { background: var(--bg); padding: .6rem .9rem; min-height: 5rem; }
  .achse-box .titel { font-size: .6rem; color: var(--dim); letter-spacing: .15em; text-transform: uppercase; margin-bottom: .35rem; }
  .achse-box .zeile { font-size: .7rem; color: var(--fg); padding: .1rem 0; font-variant-numeric: tabular-nums; }
  .achse-box .zeile .marke { color: var(--dim); }

  #regler { display: flex; gap: .5rem; padding: .75rem 1rem; }
  #regler button {
    flex: 1; padding: .85rem; border: 1px solid var(--linie);
    background: #12121a; color: var(--fg);
    border-radius: .5rem; font-family: inherit; font-size: .8rem;
    cursor: pointer; touch-action: manipulation;
    transition: background .15s, transform .1s;
    -webkit-appearance: none; appearance: none;
  }
  #regler button:active { background: var(--linie); transform: scale(.98); }
</style>
</head>
<body>

<header>
  <h1>nefes · index</h1>
  <span class="meta" id="uhr">—</span>
</header>

<main id="bühne">
  <div id="spieler"></div>

  <div id="nenner">
    <div class="label">gemeinsamer nenner</div>
    <div class="zahl" id="nenner-zahl">—</div>
    <div class="eins" id="nenner-eins">warte auf spieler</div>
  </div>

  <div id="überführung">
    <div class="stand" id="stand">leer</div>
    <div class="führt" id="führt">—</div>
  </div>
</main>

<div id="protokoll"></div>

<div id="achsen">
  <div class="achse-box">
    <div class="titel">axle · achse</div>
    <div id="axle-zeilen"></div>
  </div>
  <div class="achse-box">
    <div class="titel">ayle · familie</div>
    <div id="ayle-zeilen"></div>
  </div>
</div>

<div id="regler">
  <button id="btn-würfle" type="button">würfle</button>
  <button id="btn-reset" type="button">reset</button>
</div>

<script>
"use strict";

// ============================================================
// axle.js — die achse (männlich, technisch)
// weiß: wann, warum, für wen, wie oft, warum es deckt
// ============================================================
const ACHSE = (() => {
  let log = [];
  let zähler = new Map();
  let personen = new Map();
  let kombinationen = new Set();

  function notiere({ was, warum, fürWen, wert = null, thema = null, nenner = null, deckt = null }) {
    const eintrag = { zeit: Date.now(), was, warum, fürWen, wert, thema, nenner, deckt };
    log.push(eintrag);
    const k = String(was);
    zähler.set(k, (zähler.get(k) || 0) + 1);
    if (!personen.has(fürWen)) personen.set(fürWen, new Map());
    const pm = personen.get(fürWen);
    pm.set(was, (pm.get(was) || 0) + 1);
    if (deckt) kombinationen.add(deckt);
    return eintrag;
  }

  function wann(was) {
    const treffer = log.filter(e => e.was === was);
    return treffer.length ? treffer.map(e => e.zeit) : null;
  }
  function warum(was) {
    return [...new Set(log.filter(e => e.was === was).map(e => e.warum))];
  }
  function fürWen(person) {
    if (!personen.has(person)) return null;
    return Object.fromEntries(personen.get(person));
  }
  function wieOft(was) { return zähler.get(String(was)) || 0; }

  function deckung(alleThemen) {
    const N = alleThemen.length;
    const möglich = Math.max(1, Math.pow(2, N) - 1);
    const gesehen = kombinationen.size;
    const quote = gesehen / möglich;
    return {
      möglich, gesehen,
      quote: quote.toFixed(3),
      grund: quote >= 0.5 ? "mehr als die hälfte der ecken erreicht"
           : quote >= 0.25 ? "ein viertel der ecken erreicht"
           : "noch nicht genug ecken",
    };
  }

  function bericht() {
    return {
      anzahl: log.length,
      häufigkeit: Object.fromEntries(zähler),
      personen: Object.fromEntries([...personen].map(([k, v]) => [k, Object.fromEntries(v)])),
      kombinationen: [...kombinationen],
      letzte: log.slice(-5),
    };
  }

  function reset() {
    log = [];
    zähler = new Map();
    personen = new Map();
    kombinationen = new Set();
  }

  return {
    notiere, wann, warum, fürWen, wieOft, deckung, bericht, reset,
    get log() { return [...log]; },
  };
})();

// ============================================================
// ayle.js — die familie (weiblich, nährend)
// aus notizen wird zusammenhalt
// ============================================================
const AYLE = (() => {
  let familie = new Map();

  function aufnehmen(person, rolle = "kind") {
    if (!familie.has(person)) {
      familie.set(person, { rolle, seit: Date.now(), mit: new Set() });
    }
    return familie.get(person);
  }

  function verbinden(a, b, wie = "geschwister") {
    aufnehmen(a); aufnehmen(b);
    const fa = familie.get(a);
    const fb = familie.get(b);
    if (fa.mit.has(b)) return false;
    fa.mit.add(b);
    fb.mit.add(a);
    ACHSE.notiere({
      was: "verwandt." + wie,
      warum: "familie wächst",
      fürWen: a + "+" + b,
      deckt: [a, b].sort().join("+"),
    });
    return true;
  }

  function geschlossen() { return familie.size >= 4; }

  function stammbaum() {
    const out = {};
    for (const [name, info] of familie) {
      out[name] = { rolle: info.rolle, mit: [...info.mit], seit: info.seit };
    }
    return out;
  }

  function überführung() {
    const n = familie.size;
    if (n === 0) return { stand: 0, name: "leer", führt: "—" };
    if (n === 1) return { stand: 1, name: "punkt", führt: "axle" };
    if (n === 2) return { stand: 2, name: "paar", führt: "ayle" };
    if (n === 3) return { stand: 3, name: "raum", führt: "axle+ayle" };
    return         { stand: 4, name: "kreis", führt: "ayle" };
  }

  function lauf() {
    return {
      achse: ACHSE.bericht(),
      familie: stammbaum(),
      überführung: überführung(),
    };
  }

  function reset() { familie = new Map(); }

  return {
    aufnehmen, verbinden, geschlossen, stammbaum, überführung, lauf, reset,
    get familie() { return [...familie]; },
  };
})();

// ============================================================
// index.html — die bühne
// ============================================================

// --- 1. das wissen ---
const WISSEN = {
  "bir.html": "der punkt · atmet", "birden.js": "sequenz · 3 schritte",
  "iki.js": "gegenstück · hinterband", "uc.js": "raum · beziehung",
  "ki.js": "klärung · kombination", "klar.js": "klärung · drei sprachen",
  "dur.js": "halt · ursache→wirkung", "ikilem.js": "dilemma · löst auf",
  "id.html": "marker · wer, wo, warum", "3.html": "bühne · lädt uc",
  "nefes.js": "atem · fluss", "wetter.html": "beobachtung",
  "wind.html": "bewegung · luft", "foto.js": "licht · bild",
  "echo.html": "antwort · widerhall", "erwachen.js": "beginn",
  "uyan.js": "aufwachen", "213.html": "das neue · sim salabim",
  "run.js": "lauf", "su.js": "wasser", "sor.js": "frage",
  "sunar.md": "darbietung", "kaygıyı.js": "sorge", "laune.js": "stimmung",
  "colleckt.js": "sammlung",
};

// --- 2. die methoden ---
const METHODEN = [
  { name: "schach",  farbe: "#3a5a9a", zahl: 2, beschreibung: "denken" },
  { name: "soccer",  farbe: "#3a9a4a", zahl: 3, beschreibung: "bewegung" },
  { name: "wetter",  farbe: "#9a9a3a", zahl: 4, beschreibung: "beobachtung" },
  { name: "eigenes", farbe: "#9a3a9a", zahl: 5, beschreibung: "freiheit" },
];

// Wirkung pro Methode (0..1). Echte Hardware-Werte später.
function wirkungVon(name) {
  switch (name) {
    case "schach":  return 0.5 + Math.random() * 0.5;
    case "soccer":  return 0.3 + Math.random() * 0.7;
    case "wetter":  return 0.2 + Math.random() * 0.6;
    case "eigenes": return Math.random();
    default:        return Math.random();
  }
}

let spieler = [
  { id: "p1", methode: null, zähler: 0, aktiv: false },
  { id: "p2", methode: null, zähler: 0, aktiv: false },
  { id: "p3", methode: null, zähler: 0, aktiv: false },
  { id: "p4", methode: null, zähler: 0, aktiv: false },
];

let letzteKombi = null;

// --- 3. mathematik ---
function ggT(a, b) { while (b) { const t = b; b = a % b; a = t; } return a; }
function kgV(a, b) { return a / ggT(a, b) * b; }

function gemeinsamerNenner() {
  const aktive = spieler.filter(s => s.aktiv);
  if (aktive.length === 0) return null;
  return aktive.reduce((acc, s) => kgV(acc, s.methode.zahl), 1);
}

function aufNenner(zähler, vonNenner, aufNenner) {
  return Math.round(zähler * (aufNenner / vonNenner) * 1000) / 1000;
}

// --- 4. darstellung ---
function hexZuRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function zeichne() {
  const box = document.getElementById("spieler");
  box.innerHTML = "";
  spieler.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "slot" + (s.aktiv ? " aktiv" : " leer");
    el.style.color = s.methode ? s.methode.farbe : "#6a6a7a";

    if (s.aktiv) {
      el.innerHTML =
        '<div class="pfeil">›</div>' +
        '<div class="name">' + s.methode.name + '</div>' +
        '<div class="wert" style="color:' + s.methode.farbe + '">' +
          s.zähler + '/' + s.methode.zahl + '</div>' +
        '<div class="methode">' + s.methode.beschreibung + '</div>';
    } else {
      el.innerHTML =
        '<div class="name">slot ' + (i + 1) + '</div>' +
        '<div class="wert">—</div>' +
        '<div class="methode">tap für methode</div>';
    }

    const handler = (ev) => {
      ev.preventDefault();
      tippeSlot(s);
    };
    el.addEventListener("pointerdown", handler, { passive: false });

    box.appendChild(el);
  });
}

function tippeSlot(s) {
  if (!s.aktiv) {
    const benutzt = new Set(spieler.filter(x => x.aktiv).map(x => x.methode.name));
    const frei = METHODEN.find(m => !benutzt.has(m.name));
    if (!frei) return;
    s.methode = frei;
    s.zähler = Math.floor(Math.random() * frei.zahl) + 1;
    s.aktiv = true;

    ACHSE.notiere({
      was: "wahl." + frei.name,
      warum: "spieler wollte " + frei.beschreibung,
      fürWen: s.id,
      thema: frei.name,
      nenner: frei.zahl,
      deckt: frei.name,
    });
    AYLE.aufnehmen(s.id, "kind");
    protokoll(s.id + " wählt " + frei.name + " → " + s.zähler + "/" + frei.zahl);
  } else {
    s.zähler = (s.zähler % s.methode.zahl) + 1;
    ACHSE.notiere({
      was: "zug." + s.methode.name,
      warum: "figur bewegt",
      fürWen: s.id,
      wert: wirkungVon(s.methode.name),
      thema: s.methode.name,
      nenner: s.methode.zahl,
      deckt: s.methode.name,
    });
    protokoll(s.id + " → " + s.zähler + "/" + s.methode.zahl);
  }
  zeichne(); berechne(); zeichneAchsen();
}

function berechne() {
  const aktive = spieler.filter(s => s.aktiv);
  const n = gemeinsamerNenner();
  const zahlEl = document.getElementById("nenner-zahl");
  const einsEl = document.getElementById("nenner-eins");

  if (n === null) {
    zahlEl.textContent = "—";
    einsEl.textContent = "warte auf spieler";
    document.getElementById("stand").textContent = "leer";
    document.getElementById("führt").textContent = "—";
    document.body.style.background = "";
    letzteKombi = null;
    return;
  }

  const summe = aktive.reduce((acc, s) => acc + aufNenner(s.zähler, s.methode.zahl, n), 0);
  zahlEl.textContent = n;
  einsEl.textContent = summe + "/" + n + " · " + aktive.map(s => s.methode.name).join(" + ");

  // berührung nur bei echter änderung
  const kombi = aktive.map(s => s.methode.name).sort().join("+");
  if (kombi !== letzteKombi) {
    letzteKombi = kombi;
    const wirkungen = aktive.map(s => wirkungVon(s.methode.name));
    const mittel = wirkungen.reduce((a, b) => a + b, 0) / wirkungen.length;
    ACHSE.notiere({
      was: "berührung",
      warum: "zwei wirkungen treffen sich",
      fürWen: "raum",
      wert: Math.round(mittel * 1000) / 1000,
      thema: "alle",
      deckt: kombi,
    });
  }

  // familie verbinden (idempotent)
  for (let i = 0; i < aktive.length; i++) {
    for (let j = i + 1; j < aktive.length; j++) {
      AYLE.verbinden(aktive[i].id, aktive[j].id, "geschwister");
    }
  }

  // farbe mischen
  const rgb = aktive.map(s => hexZuRgb(s.methode.farbe));
  const avg = rgb.reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]], [0, 0, 0])
                 .map(v => Math.round(v / rgb.length));
  document.body.style.background =
    "rgb(" + Math.round(avg[0] * 0.18) + "," +
              Math.round(avg[1] * 0.18) + "," +
              Math.round(avg[2] * 0.18) + ")";

  // überführung
  const ü = AYLE.überführung();
  document.getElementById("stand").textContent = ü.name;
  document.getElementById("führt").textContent = "führt: " + ü.führt;
}

function zeichneAchsen() {
  const a = ACHSE.bericht();

  const ax = document.getElementById("axle-zeilen");
  let axHtml = '<div class="zeile"><span class="marke">ereignisse:</span> ' + a.anzahl + '</div>';
  const top = Object.entries(a.häufigkeit).sort((x, y) => y[1] - x[1]).slice(0, 3);
  top.forEach(([was, n]) => {
    axHtml += '<div class="zeile"><span class="marke">' + was + ':</span> ' + n + '×</div>';
  });
  const d = ACHSE.deckung(METHODEN.map(m => m.name));
  axHtml += '<div class="zeile"><span class="marke">deckung:</span> ' + d.gesehen + '/' + d.möglich + ' (' + d.quote + ')</div>';
  ax.innerHTML = axHtml;

  const ay = document.getElementById("ayle-zeilen");
  const stamm = AYLE.stammbaum();
  const namen = Object.keys(stamm);
  let ayHtml = '<div class="zeile"><span class="marke">mitglieder:</span> ' + namen.length + '</div>';
  namen.forEach(name => {
    const info = stamm[name];
    ayHtml += '<div class="zeile"><span class="marke">' + name + ':</span> ' + info.rolle + ' · mit ' + info.mit.length + '</div>';
  });
  const ü = AYLE.überführung();
  ayHtml += '<div class="zeile"><span class="marke">überführung:</span> ' + ü.name + ' (' + ü.stand + ')</div>';
  ay.innerHTML = ayHtml;
}

function protokoll(text) {
  const p = document.getElementById("protokoll");
  const d = document.createElement("div");
  d.textContent = "› " + text;
  p.appendChild(d);
  p.scrollTop = p.scrollHeight;
}

function würfle() {
  const aktive = spieler.filter(s => s.aktiv);
  if (aktive.length === 0) { protokoll("keine spieler"); return; }
  aktive.forEach(s => {
    s.zähler = Math.floor(Math.random() * s.methode.zahl) + 1;
    ACHSE.notiere({
      was: "würfel." + s.methode.name,
      warum: "zufall",
      fürWen: s.id,
      wert: wirkungVon(s.methode.name),
      thema: s.methode.name,
      nenner: s.methode.zahl,
      deckt: s.methode.name,
    });
  });
  protokoll("würfel gefallen");
  zeichne(); berechne(); zeichneAchsen();
}

function zurücksetzen() {
  spieler = spieler.map(s => ({ id: s.id, methode: null, zähler: 0, aktiv: false }));
  ACHSE.reset();
  AYLE.reset();
  letzteKombi = null;
  document.getElementById("protokoll").innerHTML = "";
  document.body.style.background = "";
  protokoll("zurückgesetzt — neuer lauf");
  zeichne(); berechne(); zeichneAchsen();
}

// --- 5. start ---
function tick() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  document.getElementById("uhr").textContent = hh + ":" + mm + ":" + ss;
}
setInterval(tick, 1000); tick();

document.getElementById("btn-würfle").addEventListener("click", würfle);
document.getElementById("btn-reset").addEventListener("click", zurücksetzen);

// Doppeltipp-Zoom verhindern (iOS)
document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });

zeichne(); berechne(); zeichneAchsen();
protokoll("index kennt " + Object.keys(WISSEN).length + " dateien");
protokoll("wähle 3 oder 4 methoden");
</script>
</body>
</html>
