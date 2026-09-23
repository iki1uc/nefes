<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>laune · spiegel</title>
<style>
  *{box-sizing:border-box}
  html,body{margin:0;min-height:100%;background:#05050c;color:#eee;
            font-family:monospace;font-size:14px;line-height:1.6}

  #buehne{max-width:640px;margin:0 auto;padding:32px 20px 80px}

  #kopf{text-align:center;margin-bottom:32px}
  #kopf h1{color:#ffcc44;font-size:18px;margin:0 0 6px;
           font-weight:normal;letter-spacing:3px}
  #kopf .hauch{color:#5fc8ff;font-size:10px;letter-spacing:1px}
  #kopf .hauch .maya{color:#00ffaa}
  #kopf .hauch .inka{color:#ff0066}

  .block{margin-bottom:28px}
  .block .frage{color:#5fc8ff;font-size:11px;
                letter-spacing:1px;margin-bottom:10px}
  .block .hinweis{color:#555;font-size:10px;
                  margin-bottom:10px;font-style:italic}

  textarea{
    width:100%;min-height:120px;padding:14px;
    background:#020208;color:#00ffaa;
    border:1px solid #1a3a2a;border-radius:6px;
    font-family:monospace;font-size:13px;line-height:1.6;
    resize:vertical;outline:none
  }
  textarea:focus{border-color:#00ffaa}

  .skala{display:flex;align-items:center;gap:12px;
         margin-bottom:8px}
  .skala .lbl{color:#888;font-size:10px;width:70px}
  .skala input[type=range]{
    flex:1;accent-color:#00ffaa;height:4px
  }
  .skala .val{color:#ffcc44;font-size:11px;width:28px;
              text-align:right}

  .knopf{
    display:block;width:100%;padding:14px;
    background:rgba(0,255,170,0.05);color:#00ffaa;
    border:1px solid #00ffaa;border-radius:6px;
    cursor:pointer;font-family:monospace;font-size:13px;
    letter-spacing:2px;transition:all .3s;margin-top:12px
  }
  .knopf:hover{background:rgba(0,255,170,0.15)}
  .knopf.warn{color:#ff0066;border-color:#ff0066;
              background:rgba(255,0,102,0.05)}
  .knopf.warn:hover{background:rgba(255,0,102,0.15)}

  #spiegel{display:none;margin-top:32px}
  #spiegel.aktiv{display:block}

  .spiegel-kopf{
    color:#ffcc44;font-size:13px;letter-spacing:2px;
    margin-bottom:6px;padding-bottom:8px;
    border-bottom:1px solid #1a3a2a
  }
  .spiegel-sub{color:#5fc8ff;font-size:10px;margin-bottom:18px}

  .beobachtung{
    padding:12px 14px;margin:8px 0;
    background:rgba(255,255,255,0.02);
    border-left:3px solid #1a3a2a;
    border-radius:0 4px 4px 0
  }
  .beobachtung .was{color:#ffcc44;font-size:11px;
                    letter-spacing:1px;margin-bottom:4px}
  .beobachtung .wie{color:#eee;font-size:12px;line-height:1.6}
  .beobachtung .wie b{color:#00ffaa;font-weight:normal}
  .beobachtung .wie i{color:#5fc8ff;font-style:normal}

  .beobachtung.hell{border-left-color:#00ffaa}
  .beobachtung.dunkel{border-left-color:#ff0066}
  .beobachtung.neutral{border-left-color:#5fc8ff}
  .beobachtung.still{border-left-color:#555}

  .frage-zurueck{
    padding:16px;margin-top:20px;
    background:rgba(255,204,68,0.03);
    border:1px solid #3a2a0a;border-radius:6px
  }
  .frage-zurueck .t{color:#ffcc44;font-size:11px;
                    letter-spacing:1px;margin-bottom:8px}
  .frage-zurueck .f{color:#eee;font-size:13px;
                    line-height:1.7;font-style:italic}

  .leer{
    padding:20px;text-align:center;
    color:#555;font-size:11px;line-height:1.8
  }
  .leer .maya{color:#00ffaa}
  .leer .inka{color:#ff0066}

  #status{
    position:fixed;bottom:16px;right:16px;
    padding:8px 14px;background:rgba(5,5,12,0.85);
    border:1px solid #1a1a2a;border-radius:4px;
    font-size:10px;line-height:1.6;color:#666
  }
  #status b{color:#ffcc44}
  #status .ok{color:#00ffaa}

  .zurueck{
    display:inline-block;margin-top:20px;
    color:#ff0066;font-size:11px;letter-spacing:1px;
    cursor:pointer;background:none;border:none;
    font-family:monospace;padding:0
  }
  .zurueck:hover{letter-spacing:2px}

  .trenner{
    height:1px;background:#1a1a2a;margin:24px 0
  }
</style>
</head>
<body>

<div id="buehne">

  <div id="kopf">
    <h1>laune</h1>
    <div class="hauch">
      <span class="maya">maya · ik'</span> ·
      <span class="maya">du hörst nur aus zweiter hand</span> ·
      <span class="inka">inka · samay</span>
    </div>
  </div>

  <!-- ===== EINGABE ===== -->
  <div id="eingabe">

    <div class="block">
      <div class="frage">1 · was ist jetzt?</div>
      <div class="hinweis">kein urteil. nur beobachtung. schreib, was da ist.</div>
      <textarea id="t1" placeholder="…"></textarea>
    </div>

    <div class="block">
      <div class="frage">2 · was war heute?</div>
      <div class="hinweis">nicht alles. nur eins.</div>
      <textarea id="t2" placeholder="…"></textarea>
    </div>

    <div class="block">
      <div class="frage">3 · was fehlt?</div>
      <div class="hinweis">wenn nichts fehlt: leer lassen. das ist auch eine antwort.</div>
      <textarea id="t3" placeholder="…"></textarea>
    </div>

    <div class="trenner"></div>

    <div class="block">
      <div class="frage">körper · grob</div>
      <div class="hinweis">nicht genau. nur gefühlt.</div>

      <div class="skala">
        <span class="lbl">schlaf</span>
        <input type="range" id="s-schlaf" min="0" max="10" value="5">
        <span class="val" id="v-schlaf">5</span>
      </div>
      <div class="skala">
        <span class="lbl">energie</span>
        <input type="range" id="s-energie" min="0" max="10" value="5">
        <span class="val" id="v-energie">5</span>
      </div>
      <div class="skala">
        <span class="lbl">hunger</span>
        <input type="range" id="s-hunger" min="0" max="10" value="5">
        <span class="val" id="v-hunger">5</span>
      </div>
      <div class="skala">
        <span class="lbl">ruhe</span>
        <input type="range" id="s-ruhe" min="0" max="10" value="5">
        <span class="val" id="v-ruhe">5</span>
      </div>
    </div>

    <button class="knopf" onclick="laune.spiegel()">
      spiegel · göster
    </button>

  </div>

  <!-- ===== SPIEGEL ===== -->
  <div id="spiegel">
    <div class="spiegel-kopf">spiegel · beobachtung</div>
    <div class="spiegel-sub">
      nicht urteil. nicht diagnose. nur: was ich gehört habe.
    </div>
    <div id="beobachtungen"></div>
    <div id="frage-zurueck"></div>

    <button class="zurueck" onclick="laune.zurueck()">
      ← neu · von vorn
    </button>
  </div>

</div>

<div id="status">
  laune: <b id="st-l">wartet</b> ·
  <b id="st-z" class="ok">bereit</b>
</div>

<script>
(function(){
'use strict';

const $ = function(id){ return document.getElementById(id); };

// ============================================================
// LAUNE — das File ergründet sich selbst
// ============================================================
const laune = {

  // ---- Slider live ----
  slider: function(){
    ['schlaf','energie','hunger','ruhe'].forEach(function(k){
      const s = $('s-' + k);
      const v = $('v-' + k);
      if(!s || !v) return;
      s.addEventListener('input', function(){
        v.textContent = s.value;
      });
    });
  },

  // ---- Spiegel ----
  spiegel: function(){
    const t1 = ($('t1').value || '').trim();
    const t2 = ($('t2').value || '').trim();
    const t3 = ($('t3').value || '').trim();

    const schlaf  = parseInt($('s-schlaf').value, 10);
    const energie = parseInt($('s-energie').value, 10);
    const hunger  = parseInt($('s-hunger').value, 10);
    const ruhe    = parseInt($('s-ruhe').value, 10);

    const beobachtungen = [];

    // --- 1. Länge der Antworten ---
    const total = (t1.length + t2.length + t3.length);
    if(total === 0){
      beobachtung(beobachtungen, 'still', 'stille',
        'Du hast nichts geschrieben. Auch das ist eine Antwort. ' +
        'Manchmal ist nichts sagen das ehrlichste.');
    } else if(total < 60){
      beobachtung(beobachtungen, 'neutral', 'kurz',
        'Deine Antworten sind <b>kurz</b>. ' +
        'Vielleicht willst du nicht reden. Vielleicht kannst du nicht. ' +
        'Beides ist okay.');
    } else if(total < 300){
      beobachtung(beobachtungen, 'hell', 'mittlere länge',
        'Deine Antworten sind <b>mittlere Länge</b>. ' +
        'Du erzählst, ohne zu fluten. Das ist eine gute Grenze.');
    } else {
      beobachtung(beobachtungen, 'hell', 'lang',
        'Du hast <b>viel</b> geschrieben. ' +
        'Es scheint, du trägst viel. ' +
        'Das ist kein Fehler — aber es ist schwer.');
    }

    // --- 2. Was fehlt (t3 leer?) ---
    if(t3 === ''){
      beobachtung(beobachtungen, 'hell', 'nichts fehlt',
        'Du hast bei „was fehlt" nichts geschrieben. ' +
        'Das kann heißen: im Moment ist genug da. ' +
        'Oder: du willst nicht hinsehen. Nur du weißt.');
    } else {
      beobachtung(beobachtungen, 'dunkel', 'es fehlt etwas',
        'Du hast benannt, was fehlt. ' +
        'Das ist <b>mutig</b>. ' +
        'Benennen ist der erste Schritt. Nicht der letzte.');
    }

    // --- 3. Körper ---
    const körperSumme = schlaf + energie + hunger + ruhe;
    if(körperSumme <= 12){
      beobachtung(beobachtungen, 'dunkel', 'körper · niedrig',
        'Alle Werte sind <b>niedrig</b>. ' +
        'Schlaf: ' + schlaf + ', Energie: ' + energie +
        ', Hunger: ' + hunger + ', Ruhe: ' + ruhe + '. ' +
        'Das ist ein Körper, der Erholung braucht. ' +
        'Kein Urteil. Nur ein Signal.');
    } else if(körperSumme >= 32){
      beobachtung(beobachtungen, 'hell', 'körper · hoch',
        'Alle Werte sind <b>hoch</b>. ' +
        'Du bist im Grünen. Nutze es — aber überziehe nicht.');
    } else {
      beobachtung(beobachtungen, 'neutral', 'körper · mittel',
        'Dein Körper ist im Mittelfeld. ' +
        'Schlaf: ' + schlaf + ', Energie: ' + energie +
        ', Hunger: ' + hunger + ', Ruhe: ' + ruhe + '. ' +
        'Nichts dramatisch. Nichts perfekt.');
    }

    // --- 4. Einzelwerte ---
    if(schlaf <= 3){
      beobachtung(beobachtungen, 'dunkel', 'schlaf',
        'Schlaf: <b>' + schlaf + '</b>. ' +
        'Das ist wenig. ' +
        'Nicht nur für heute — für die ganze Woche.');
    }
    if(energie >= 8 && ruhe <= 3){
      beobachtung(beobachtungen, 'dunkel', 'energie ohne ruhe',
        'Energie hoch, Ruhe niedrig. ' +
        'Das ist der Zustand, in dem man läuft — ' +
        'und irgendwann <b>stürzt</b>. ' +
        'Kein Vorwurf. Ein Muster.');
    }
    if(hunger >= 8){
      beobachtung(beobachtungen, 'neutral', 'hunger',
        'Hunger: <b>' + hunger + '</b>. ' +
        'Iss was. Jetzt. Keine Frage.');
    }

    // --- 5. Wortwahl in t1 (was ist jetzt) ---
    if(t1.length > 0){
      const dunkel = ['müde','traurig','leer','allein','kalt','dunkel',
                      'hart','schwer','satt','sauer','nein','nicht','kein',
                      'yorgun','üzgün','boş','yalnız'];
      const hell   = ['gut','schön','leicht','warm','hell','froh',
                      'ruhig','frei','ja','warm','iyi','güzel','sıcak',
                      'hafif','ferah','aydın'];

      const t1klein = t1.toLowerCase();
      let dCount = 0, hCount = 0;
      dunkel.forEach(function(w){ if(t1klein.indexOf(w) >= 0) dCount++; });
      hell.forEach(function(w){ if(t1klein.indexOf(w) >= 0) hCount++; });

      if(dCount > hCount && dCount > 0){
        beobachtung(beobachtungen, 'dunkel', 'wortwahl · dunkel',
          'Deine Worte sind <b>schwerer</b> als leicht. ' +
          'Wörter wie: müde, leer, allein, nicht, kein. ' +
          'Das ist keine Schwäche. Es ist eine Sprache. ' +
          'Aber sie färbt den Tag.');
      } else if(hCount > dCount && hCount > 0){
        beobachtung(beobachtungen, 'hell', 'wortwahl · hell',
          'Deine Worte sind <b>heller</b> als schwer. ' +
          'Wörter wie: gut, warm, ruhig, frei. ' +
          'Halte das. Es ist nicht selbstverständlich.');
      }
    }

    // --- 6. t2 — was war heute ---
    if(t2.length > 20){
      // Frage: ist es Ereignis oder Gefühl?
      const gefuehl = ['ich','mich','mir','mein','fühle','fühlte',
                       'habe','war','wurde','fühl'];
      let gCount = 0;
      const t2klein = t2.toLowerCase();
      gefuehl.forEach(function(w){ if(t2klein.indexOf(w) >= 0) gCount++; });
      if(gCount >= 3){
        beobachtung(beobachtungen, 'neutral', 'was war · innen',
          'Dein „was war heute" ist <b>innen</b> beschrieben — ' +
          'du erzählst von dir. Nicht von dem, was passiert ist. ' +
          'Das ist erlaubt. Aber es färbt alles.');
      } else {
        beobachtung(beobachtungen, 'hell', 'was war · außen',
          'Dein „was war heute" ist <b>außen</b> beschrieben — ' +
          'du erzählst, was passiert ist. ' +
          'Das ist Boden. Das ist gut.');
      }
    }

    // --- 7. Muster: alle Skalen mittig ---
    if(schlaf === 5 && energie === 5 && hunger === 5 && ruhe === 5){
      beobachtung(beobachtungen, 'still', 'alles mittig',
        'Alle Werte sind <b>5</b>. ' +
        'Das kann heißen: ausgeglichen. ' +
        'Oder: du hast nicht hingeschaut. ' +
        'Nur du weißt.');
    }

    // --- 8. Immer eine Beobachtung zum Zuhören ---
    beobachtung(beobachtungen, 'neutral', 'was ich nicht wissen kann',
      'Ich kenne dich nur aus <b>zweiter Hand</b>. ' +
      'Aus dem, was du schreibst. ' +
      'Ich sehe dich nicht. Ich höre dich nicht atmen. ' +
      'Ich weiß nicht, ob du gerade weinst. ' +
      'Alles hier ist <i>nur Spiegel</i> — kein Wissen.');

    // ---- Anzeigen ----
    const box = $('beobachtungen');
    box.innerHTML = '';
    beobachtungen.forEach(function(b){
      const d = document.createElement('div');
      d.className = 'beobachtung ' + b.art;
      d.innerHTML =
        '<div class="was">' + b.was + '</div>' +
        '<div class="wie">' + b.wie + '</div>';
      box.appendChild(d);
    });

    // ---- Frage zurück ----
    const frageBox = $('frage-zurueck');
    if(beobachtungen.length === 0){
      frageBox.innerHTML = '';
    } else {
      const frage = laune.waehleFrage(beobachtungen, schlaf, energie, ruhe);
      frageBox.innerHTML =
        '<div class="t">frage zurück · soru</div>' +
        '<div class="f">' + frage + '</div>';
    }

    // ---- Anzeigen ----
    $('eingabe').style.display = 'none';
    $('spiegel').classList.add('aktiv');
    $('st-l').textContent = 'gespiegelt';
    $('st-z').textContent = 'sieh hin';
    $('st-z').className = 'ok';

    // nach oben scrollen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ---- Eine gute Frage zurück ----
  waehleFrage: function(beobachtungen, schlaf, energie, ruhe){
    const hatDunkel = beobachtungen.some(function(b){
      return b.art === 'dunkel';
    });
    const hatHell = beobachtungen.some(function(b){
      return b.art === 'hell';
    });
    const nurStill = beobachtungen.every(function(b){
      return b.art === 'still';
    });

    if(nurStill){
      return 'Du hast nichts geschrieben. ' +
             'Willst du wirklich nichts sagen? ' +
             'Oder hast du nur keine Worte gefunden? ' +
             'Beides ist okay. Schreib es, wenn du willst.';
    }

    if(schlaf <= 3){
      return 'Du hast wenig Schlaf angegeben. ' +
             'Was hält dich wach? ' +
             'Nicht die Ursache — nur: was ist das Erste, ' +
             'das dir in den Kopf kommt?';
    }

    if(energie >= 8 && ruhe <= 3){
      return 'Du bist laut innen. ' +
             'Wann hast du das letzte Mal ' +
             '<i>wirklich</i> geruht — nicht geschlafen, sondern geruht?';
    }

    if(hatDunkel && !hatHell){
      return 'Der Spiegel ist dunkel heute. ' +
             'Was ist das <i>kleinste</i> helle, ' +
             'das du heute gesehen hast? ' +
             'Nicht das größte. Das kleinste.';
    }

    if(hatHell && !hatDunkel){
      return 'Der Spiegel ist hell heute. ' +
             'Was ist das, das du heute <i>nicht</i> gesagt hast — ' +
             'weil du nicht wolltest, dass es jemand hört?';
    }

    return 'Was ist das, was du <i>nicht</i> geschrieben hast? ' +
           'Das ist meistens das, was zählt.';
  },

  // ---- zurück ----
  zurueck: function(){
    $('spiegel').classList.remove('aktiv');
    $('eingabe').style.display = 'block';
    $('st-l').textContent = 'wartet';
    $('st-z').textContent = 'bereit';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// ============================================================
// HILFE — Beobachtung hinzufügen
// ============================================================
function beobachtung(arr, art, was, wie){
  arr.push({ art: art, was: was, wie: wie });
}

// ============================================================
// START
// ============================================================
window.laune = laune;
laune.slider();

})();
</script>
</body>
</html>
