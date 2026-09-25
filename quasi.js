<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#050508">
<title>nefes · dash · 3 · 9 · 81 · 3</title>
<style>
  *{box-sizing:border-box}
  html,body{margin:0;min-height:100%;background:#050508;color:#e8e8f0;
    font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:1.5;
    overflow-x:hidden;-webkit-tap-highlight-color:transparent}
  #dash{max-width:480px;margin:0 auto;padding:16px;
    display:flex;flex-direction:column;min-height:100dvh}
  header{text-align:center;padding:8px 0 16px;
    border-bottom:1px solid #1a1a25;
    color:#666;letter-spacing:6px;font-size:12px}
  header b{color:#ffcc44;font-weight:normal}
  #phase{text-align:center;padding:16px 8px;
    color:#888;font-size:11px;letter-spacing:2px;
    min-height:40px}
  #phase b{color:#fff;font-weight:normal}
  #bühne{flex:1;display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    gap:12px;padding:16px 0}
  .gitter{display:grid;gap:4px;transition:all .6s ease}
  .gitter.g3{grid-template-columns:repeat(3,48px)}
  .gitter.g9{grid-template-columns:repeat(9,1fr);width:100%;max-width:360px}
  .zelle{aspect-ratio:1;border-radius:4px;
    background:#0a0a15;border:1px solid #1a1a25;
    transition:all .5s ease}
  .zelle.an{background:#0a2a1a;border-color:#00ffaa;
    box-shadow:0 0 6px rgba(0,255,170,0.4)}
  .zelle.familie{background:#0a1a2a;border-color:#5fc8ff;
    box-shadow:0 0 6px rgba(95,200,255,0.4)}
  .zelle.kolonie{background:#2a0a1a;border-color:#ff44aa;
    box-shadow:0 0 6px rgba(255,68,170,0.4)}
  .zelle.übergabe{background:#2a1a0a;border-color:#ffcc44;
    box-shadow:0 0 16px rgba(255,204,68,0.6);
    animation:puls 0.9s ease-in-out}
  @keyframes puls{
    0%,100%{transform:scale(1);opacity:1}
    50%{transform:scale(0.65);opacity:0.4}
  }
  #regler{padding:12px 0;display:flex;gap:8px;
    border-top:1px solid #1a1a25}
  button{flex:1;padding:14px;background:transparent;
    color:#00ffaa;border:1px solid #00ffaa;
    border-radius:6px;font:inherit;font-size:13px;
    letter-spacing:2px;cursor:pointer;
    transition:background .15s, opacity .15s;
    -webkit-appearance:none;appearance:none}
  button:active:not(:disabled){background:rgba(0,255,170,0.1)}
  button:disabled{opacity:0.25;cursor:not-allowed}
  button.handover{color:#ffcc44;border-color:#ffcc44}
  button.handover:active:not(:disabled){background:rgba(255,204,68,0.1)}
  #log{padding:8px 0;font-size:10px;color:#555;
    text-align:center;letter-spacing:1px}
</style>
</head>
<body>
<div id="dash">
  <header><b>3</b> · <b>9</b> · <b>81</b> · <b>3</b></header>
  <div id="phase">–</div>
  <main id="bühne">
    <div id="gitter" class="gitter g3"></div>
  </main>
  <div id="regler">
    <button id="btn-wachse" type="button">wachse</button>
    <button id="btn-überführe" type="button" class="handover" disabled>überführe</button>
  </div>
  <div id="log">zyklus 1 · drei · die atome</div>
</div>
<script>
"use strict";
(function(){

  // ============================================================
  // DASH · 3 · 9 · 81 · 3
  // ein atem · vier zustände · ein takt
  // ============================================================

  const z = { phase: "drei", zyklus: 1 };

  const PHASE = {
    drei:      { n: 3,  grid: "g3", cls: "an",       text: "drei · die atome" },
    neun:      { n: 9,  grid: "g3", cls: "familie",  text: "neun · 3×3 · die familien" },
    "81":      { n: 81, grid: "g9", cls: "kolonie",  text: "81 · 9×9 · die kolonie" },
    übergabe:  { n: 3,  grid: "g3", cls: "übergabe", text: "übergabe · das alte wird zu drei" },
    neuanfang: { n: 3,  grid: "g3", cls: "an",       text: "neuanfang · drei neue atome" },
  };

  const $gitter = document.getElementById("gitter");
  const $phase  = document.getElementById("phase");
  const $log    = document.getElementById("log");
  const $wachse = document.getElementById("btn-wachse");
  const $über   = document.getElementById("btn-überführe");

  function zeichne() {
    const p = PHASE[z.phase];
    $gitter.className = "gitter " + p.grid;
    $gitter.innerHTML = "";
    for (let i = 0; i < p.n; i++) {
      const zelle = document.createElement("div");
      zelle.className = "zelle " + p.cls;
      $gitter.appendChild(zelle);
    }
    $phase.innerHTML = "<b>" + z.zyklus + "</b> · " + p.text;
    $wachse.disabled = (z.phase === "81" || z.phase === "übergabe" || z.phase === "neuanfang");
    $über.disabled   = (z.phase !== "81");
    $log.textContent = "zyklus " + z.zyklus + " · " + p.text;
  }

  function wachse() {
    if (z.phase === "drei") z.phase = "neun";
    else if (z.phase === "neun") z.phase = "81";
    zeichne();
  }

  function überführe() {
    if (z.phase !== "81") return;
    z.phase = "übergabe";
    zeichne();
    setTimeout(() => {
      z.zyklus += 1;
      z.phase = "neuanfang";
      zeichne();
      setTimeout(() => {
        z.phase = "drei";
        zeichne();
      }, 900);
    }, 900);
  }

  $wachse.addEventListener("click", wachse);
  $über.addEventListener("click", überführe);

  zeichne();

})();
</script>
</body>
</html>
