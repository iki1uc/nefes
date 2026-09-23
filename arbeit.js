<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>wirklichkeit · 3 9 81 3 · funktion im funktion</title>
<style>
  *{box-sizing:border-box}
  html,body{margin:0;min-height:100%;background:#05050c;color:#eee;
            font-family:monospace;font-size:13px;line-height:1.6}
  #buehne{max-width:700px;margin:0 auto;padding:24px 18px 60px}
  h1{color:#ffcc44;font-size:16px;text-align:center;
     font-weight:normal;letter-spacing:3px;margin:0 0 4px}
  .hauch{color:#5fc8ff;font-size:10px;text-align:center;
         margin-bottom:24px}
  .hauch .maya{color:#00ffaa}
  .hauch .inka{color:#ff0066}

  .ring{display:flex;justify-content:center;
        gap:6px;flex-wrap:wrap;margin-bottom:20px}
  .stufe{padding:6px 14px;border:1px solid #1a1a2a;
         border-radius:20px;font-size:11px;color:#555;
         transition:all .3s}
  .stufe.aktiv{color:#ffcc44;border-color:#ffcc44;
               background:rgba(255,204,68,0.08)}
  .stufe.fertig{color:#00ffaa;border-color:#00ffaa;
                background:rgba(0,255,170,0.05)}

  .feld{display:flex;gap:8px;margin-bottom:16px}
  .feld input{flex:1;padding:10px;background:#020208;
              color:#00ffaa;border:1px solid #1a3a2a;
              border-radius:4px;font-family:monospace;font-size:13px}
  .feld input:focus{outline:none;border-color:#00ffaa}
  .feld button{padding:10px 20px;background:rgba(0,255,170,0.05);
               color:#00ffaa;border:1px solid #00ffaa;
               border-radius:4px;cursor:pointer;
               font-family:monospace;font-size:12px;
               letter-spacing:1px;transition:all .2s}
  .feld button:hover{background:rgba(0,255,170,0.15)}

  .log{background:#020208;border:1px solid #1a3a2a;
       border-radius:6px;padding:14px;min-height:200px;
       font-size:12px;line-height:1.7;white-space:pre-wrap;
       color:#7ce0a8;max-height:400px;overflow-y:auto}
  .log .tr{color:#ffcc44}
  .log .dim{color:#555}
  .log .ok{color:#00ffaa}
  .log .no{color:#ff0066}
  .log .kopf{color:#5fc8ff}

  .knopf{display:block;width:100%;padding:12px;margin-top:12px;
         background:rgba(0,255,170,0.05);color:#00ffaa;
         border:1px solid #00ffaa;border-radius:6px;
         cursor:pointer;font-family:monospace;font-size:13px;
         letter-spacing:2px;transition:all .3s}
  .knopf:hover{background:rgba(0,255,170,0.15)}

  #status{position:fixed;bottom:16px;right:16px;
          padding:8px 14px;background:rgba(5,5,12,0.85);
          border:1px solid #1a1a2a;border-radius:4px;
          font-size:10px;color:#666}
  #status b{color:#ffcc44}
</style>
</head>
<body>

<div id="buehne">
  <h1>wirklichkeit</h1>
  <div class="hauch">
    <span class="maya">3 · neun · einundachtzig · drei</span> ·
    <span class="inka">funktion im funktion</span>
  </div>

  <div class="ring" id="ring">
    <div class="stufe" data-s="empfang">empfang</div>
    <div class="stufe" data-s="3">3</div>
    <div class="stufe" data-s="9">9</div>
    <div class="stufe" data-s="81">81</div>
    <div class="stufe" data-s="3zurueck">3 ↺</div>
    <div class="stufe" data-s="versand">versand</div>
  </div>

  <div class="feld">
    <input id="in" placeholder="gib was ein — zahl, wort, gefühl…"
           value="7">
    <button onclick="lauf.start()">start · lauf</button>
  </div>

  <div class="log" id="log">
    <span class="dim">warte auf eingabe…</span>
  </div>

  <button class="knopf" onclick="lauf.reset()">reset</button>
</div>

<div id="status">
  stufe: <b id="st-s">–</b> ·
  durchlauf: <b id="st-d">0</b>
</div>

<script>
(function(){
'use strict';

const $ = function(id){ return document.getElementById(id); };
const log = $('log');
const stS = $('st-s');
const stD = $('st-d');

let durchlauf = 0;

// ============================================================
// AUSGABE
// ============================================================
function aus(html, klasse){
  const d = document.createElement('div');
  if(klasse) d.className = klasse;
  d.innerHTML = html;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}
function linie(){ aus('─'.repeat(40), 'dim'); }

// ============================================================
// STUFEN MARKIEREN
// ============================================================
function markiere(name, zustand){
  document.querySelectorAll('.stufe').forEach(function(el){
    if(el.getAttribute('data-s') === name){
      el.classList.remove('aktiv', 'fertig');
      if(zustand) el.classList.add(zustand);
    }
  });
  stS.textContent = name;
}
function markiereAlleFertig(){
  document.querySelectorAll('.stufe').forEach(function(el){
    el.classList.add('fertig');
  });
}
function markiereAlleLeer(){
  document.querySelectorAll('.stufe').forEach(function(el){
    el.classList.remove('aktiv', 'fertig');
  });
}

// ============================================================
// FUNKTION IM FUNKTION — die 3-9-81-3 Kette
// ============================================================
// Jede Stufe ruft die nächste auf und gibt zurück.
// ============================================================

function empfang(raw){
  markiere('empfang', 'aktiv');
  aus('<span class="kopf">▸ empfang</span>  von außen', 'kopf');
  aus('  eingang: <span class="tr">' + JSON.stringify(raw) + '</span>');

  const wert = typeof raw === 'string' ? raw : String(raw);
  const zahl = isNaN(parseFloat(wert)) ? wert.length : parseFloat(wert);

  aus('  erkannt: <span class="ok">' + zahl + '</span>');

  return drei(zahl, wert);
}

function drei(zahl, original){
  markiere('3', 'aktiv');
  aus('');
  aus('<span class="kopf">▸ 3 · startpunkt</span>');
  aus('  was ist da? <span class="tr">' + original + '</span>');

  // Drei Basiswerte ableiten
  const a = zahl;
  const b = zahl * 3;
  const c = zahl * 9;

  aus('  3 fäden: <span class="ok">' + a + ' · ' + b + ' · ' + c + '</span>');

  return neun(a, b, c, original);
}

function neun(a, b, c, original){
  markiere('9', 'aktiv');
  aus('');
  aus('<span class="kopf">▸ 9 · verdichtung</span>');
  aus('  3 × 3 · jede kombination');

  // Neun Felder: jede mit jeder
  const felder = [];
  [a, b, c].forEach(function(x, i){
    [a, b, c].forEach(function(y, j){
      felder.push({
        nr: i*3 + j + 1,
        von: x,
        nach: y,
        wert: (x + y) % 999
      });
    });
  });

  felder.forEach(function(f){
    aus('  ' + String(f.nr).padStart(2, '0') + '. ' +
        f.von + ' × ' + f.nach + ' → <span class="ok">' + f.wert + '</span>');
  });

  return einundachtzig(felder, original);
}

function einundachtzig(felder, original){
  markiere('81', 'aktiv');
  aus('');
  aus('<span class="kopf">▸ 81 · vollmatrix</span>');
  aus('  9 × 9 · das ganze netz');

  // Aus 9 Feldern 81 machen: jedes Feld × 9 Positionen
  const knoten = [];
  for(let i = 0; i < 81; i++){
    const f = felder[i % 9];
    const pos = Math.floor(i / 9) + 1;
    knoten.push({
      nr: i + 1,
      pos: pos,
      basis: f.wert,
      wert: (f.wert * pos) % 999
    });
  }

  // Zeige nur Zusammenfassung + Beispiele
  aus('  knoten gesamt: <span class="ok">' + knoten.length + '</span>');
  aus('  beispiele:');
  [0, 8, 40, 80].forEach(function(i){
    const k = knoten[i];
    aus('    #' + String(k.nr).padStart(2, '0') +
        ' (pos ' + k.pos + ') ' +
        'basis ' + k.basis + ' → <span class="ok">' + k.wert + '</span>');
  });

  return dreiZurueck(knoten, original);
}

function dreiZurueck(knoten, original){
  markiere('3zurueck', 'aktiv');
  aus('');
  aus('<span class="kopf">▸ 3 ↺ · rückkehr</span>');

  // Aus 81 Knoten: 3 Werte extrahieren (Summe, Mittel, Maximum)
  let summe = 0, max = 0;
  knoten.forEach(function(k){
    summe += k.wert;
    if(k.wert > max) max = k.wert;
  });
  const mittel = Math.round(summe / knoten.length);

  aus('  summe: <span class="ok">' + summe + '</span>');
  aus('  mittel: <span class="ok">' + mittel + '</span>');
  aus('  max: <span class="ok">' + max + '</span>');
  aus('  <span class="tr">zurück zu 3 werten.</span>');

  return versand({
    original: original,
    summe: summe,
    mittel: mittel,
    max: max,
    knoten: knoten.length
  });
}

function versand(ergebnis){
  markiere('versand', 'aktiv');
  aus('');
  aus('<span class="kopf">▸ versand</span>  nach außen');
  aus('  summe:  <span class="ok">' + ergebnis.summe + '</span>');
  aus('  mittel: <span class="ok">' + ergebnis.mittel + '</span>');
  aus('  max:    <span class="ok">' + ergebnis.max + '</span>');
  aus('');
  aus('<span class="tr">→ wirklichkeit: ' +
      ergebnis.original + ' ist durchgelaufen.</span>');

  markiereAlleFertig();

  return {
    eingang: ergebnis.original,
    ausgang: {
      summe: ergebnis.summe,
      mittel: ergebnis.mittel,
      max: ergebnis.max
    }
  };
}

// ============================================================
// LAUF — der Führer
// ============================================================
const lauf = {
  start: function(){
    log.innerHTML = '';
    markiereAlleLeer();
    durchlauf++;
    stD.textContent = durchlauf;

    const raw = $('in').value.trim() || '7';

    linie();
    aus('<span class="tr">durchlauf #' + durchlauf + '</span>  ' +
        '<span class="dim">' + new Date().toLocaleTimeString() + '</span>');
    linie();
    aus('');

    // HIER PASSIERT DER LAUF
    const ergebnis = empfang(raw);

    aus('');
    linie();
    aus('<span class="kopf">ergebnis:</span>');
    aus('  eingang:  <span class="tr">' + ergebnis.eingang + '</span>');
    aus('  ausgang:  ' +
        '<span class="ok">summe=' + ergebnis.ausgang.summe +
        ' mittel=' + ergebnis.ausgang.mittel +
        ' max=' + ergebnis.ausgang.max + '</span>');
    linie();
  },

  reset: function(){
    log.innerHTML = '<span class="dim">warte auf eingabe…</span>';
    markiereAlleLeer();
    durchlauf = 0;
    stD.textContent = 0;
    stS.textContent = '–';
  }
};

// ============================================================
// START
// ============================================================
window.lauf = lauf;

})();
</script>
</body>
</html>
