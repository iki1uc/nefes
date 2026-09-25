<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>bahçe · bahçe ve market</title>
<style>
  body{
    background:#0d1410; color:#d8e8d8;
    font-family:Georgia,serif;
    margin:0; padding:24px; min-height:100vh;
  }
  .kap{max-width:560px;margin:0 auto}
  h1{color:#c8e0b8;font-size:20px;letter-spacing:3px;
     text-align:center;font-weight:normal;margin-bottom:6px}
  .alt{text-align:center;color:#7a9a7a;font-size:11px;
       letter-spacing:2px;margin-bottom:24px;font-family:monospace}

  .sahne{
    background:#0a1008;border:1px solid #1e3018;border-radius:14px;
    padding:30px 20px;text-align:center;margin-bottom:18px;
  }
  .sahne .sache{font-size:52px;margin-bottom:8px}
  .sahne .adi{color:#c8e0b8;font-size:15px;letter-spacing:2px}
  .sahne .soru{color:#e8d8a8;font-size:14px;margin-top:14px;
               font-style:italic;line-height:1.7}

  .wechsel{text-align:center;margin-bottom:16px}
  .wechsel button{
    background:transparent;color:#7a9a7a;
    border:1px solid #2a3a28;padding:6px 16px;border-radius:20px;
    font-family:inherit;font-size:12px;letter-spacing:1px;
    cursor:pointer;margin:0 4px;
  }
  .wechsel button.an{color:#e8d8a8;border-color:#e8d8a8}

  .paar{display:grid;grid-template-columns:1fr 1fr;gap:10px;
        margin-bottom:16px}
  .seite{
    background:#0a1008;border:1px solid #1e3018;border-radius:10px;
    padding:14px;
  }
  .seite .wer{color:#7a9a7a;font-size:10px;letter-spacing:2px;
              margin-bottom:8px;font-family:monospace}
  .seite textarea{
    width:100%;background:transparent;border:none;outline:none;
    color:#d8e8d8;font-family:inherit;font-size:14px;
    resize:none;min-height:60px;line-height:1.6;
  }
  .seite textarea::placeholder{color:#3a4a38}

  .wort{
    text-align:center;color:#7a9a7a;font-size:11px;
    letter-spacing:2px;font-family:monospace;margin-top:8px;
  }
</style>
</head>
<body>
<div class="kap">

  <h1>bahçe</h1>
  <div class="alt">aynı şey · iki bakış · tek masa</div>

  <div class="sahne">
    <div class="sache" id="sacheEmoji">🍅</div>
    <div class="adi" id="sacheAd">Domates</div>
    <div class="soru" id="soru">
      Ne görüyorsun?
    </div>
  </div>

  <div class="wechsel">
    <button id="btnGarten" class="an">bahçe · garten</button>
    <button id="btnMarket">market · supermarkt</button>
  </div>

  <div class="paar">
    <div class="seite">
      <div class="wer">BEN · ICH</div>
      <textarea id="ich" placeholder="ne görüyorum…"></textarea>
    </div>
    <div class="seite">
      <div class="wer">SEN · DU</div>
      <textarea id="du" placeholder="ne görüyorsun…"></textarea>
    </div>
  </div>

  <div class="wort" id="wort">—</div>

</div>

<script>
"use strict";

// ── die sachen ────────────────────────────────────────────
const SACHEN = [
  { emoji:"🍅", ad:"Domates",   frage:"Ne görüyorsun?" },
  { emoji:"🥔", ad:"Patates",   frage:"Elle tutulur mu, gözle görülür mü?" },
  { emoji:"🍎", ad:"Elma",      frage:"Kaç gün sonra yerim?" },
  { emoji:"🌿", ad:"Nane",      frage:"Kokladın mı, tattın mı?" },
  { emoji:"🧄", ad:"Sarımsak",  frage:"Sessiz mi, kokulu mu?" },
  { emoji:"🥕", ad:"Havuç",     frage:"Turuncu mu, tatlı mı?" },
  { emoji:"🌾", ad:"Buğday",    frage:"Yer mi, eker mi?" },
];

// ── zwei orte ─────────────────────────────────────────────
const ORTE = {
  bahçe:  { ad:"bahçe · garten",    wort:"burada büyür · hier wächst es" },
  market: { ad:"market · supermarkt", wort:"buraya gelir · hier kommt es an" },
};

// ── zustand ───────────────────────────────────────────────
let sacheIdx = 0;
let ort = "bahçe";

// ── zeichnen ──────────────────────────────────────────────
function zeichne(){
  const s = SACHEN[sacheIdx];
  document.getElementById("sacheEmoji").textContent = s.emoji;
  document.getElementById("sacheAd").textContent = s.ad;
  document.getElementById("soru").textContent = s.frage;
  document.getElementById("wort").textContent = ORTE[ort].wort;
}

// ── sache wechseln: alle 8 sekunden, wie nefes ────────────
setInterval(() => {
  sacheIdx = (sacheIdx + 1) % SACHEN.length;
  zeichne();
}, 8000);

// ── ort wechseln ──────────────────────────────────────────
document.getElementById("btnGarten").addEventListener("click", () => {
  ort = "bahçe";
  document.getElementById("btnGarten").classList.add("an");
  document.getElementById("btnMarket").classList.remove("an");
  zeichne();
});
document.getElementById("btnMarket").addEventListener("click", () => {
  ort = "market";
  document.getElementById("btnMarket").classList.add("an");
  document.getElementById("btnGarten").classList.remove("an");
  zeichne();
});

// ── boot ─────────────────────────────────────────────────
zeichne();
</script>
</body>
</html>
