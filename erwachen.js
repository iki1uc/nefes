// erwachen.js — das Erwachen
// Türkçe: uyanmak = erwachen
// Maya:   yahal kab = erwachen
// Inka:   rikch'ay = erwachen
//
// EIN Lauf. Automatisiert.
// Wie ein Einlauf: einmal durch alle Dateien.
// Am Ende: erwacht oder nicht.
// Kein zweiter Lauf. Kein Reloop. Nur: wach.

(function () {
  'use strict';

  // ============================================================
  // REIHENFOLGE — der eine Lauf
  // Jede Datei wird einmal gelesen. In dieser Ordnung.
  // ============================================================
  const REIHE = [
    { id: 'bir',     tr: 'bir',     maya: 'hun',  inka: 'huk'    },
    { id: 'bu',      tr: 'bu',      maya: 'hun',  inka: 'huk'    },
    { id: 'su',      tr: 'şu',      maya: 'ka',   inka: 'iskay'  },
    { id: 'nefes',   tr: 'nefes',   maya: 'ik\'', inka: 'samay'  },
    { id: 'iki',     tr: 'iki',     maya: 'ka',   inka: 'iskay'  },
    { id: 'üç',      tr: 'üç',      maya: 'ox',   inka: 'kimsa'  },
    { id: 'ki',      tr: 'ki',      maya: 'hun',  inka: 'huk'    },
    { id: 'klar',    tr: 'klar',    maya: 'ma\'', inka: 'mana'   },
    { id: 'dur',     tr: 'dur',     maya: 'kan',  inka: 'sayay'  },
    { id: 'durdur',  tr: 'durdur',  maya: 'kan',  inka: 'sayay'  },
    { id: 'ikilem',  tr: 'ikilem',  maya: 'kan',  inka: 'tawa'   },
    { id: 'hal',     tr: 'hal',     maya: 'u hal', inka: 'kawsay' },
    { id: 'kaygıyı', tr: 'kaygıyı', maya: 'kan',  inka: 'tawa'   },
    { id: 'birden',  tr: 'birden',  maya: 'ka',   inka: 'iskay'  },
    { id: 'fal',     tr: 'fal',     maya: 'il',   inka: 'qhaway' }
  ];

  // ============================================================
  // LIES — eine Datei lesen (nur prüfen, nicht starten)
  // ============================================================
  function lies(eintrag) {
    // HTML: über fetch-Marker (wird von index.html gesetzt)
    if (eintrag.id === 'bir') {
      return {
        id: eintrag.id,
        da: window.__bir === true,
        maya: eintrag.maya,
        inka: eintrag.inka,
        tr: eintrag.tr
      };
    }
    // JS: über window.<id>
    const obj = window[eintrag.id] || null;
    return {
      id: eintrag.id,
      da: (typeof obj === 'object' && obj !== null) || typeof obj === 'function',
      maya: eintrag.maya,
      inka: eintrag.inka,
      tr: eintrag.tr,
      obj: obj
    };
  }

  // ============================================================
  // ERWACHEN — der eine Lauf
  // ============================================================
  function erwachen() {
    const start = Date.now();
    const gelesen = [];
    const da = [];
    const fehlt = [];

    // Einmal durch die ganze Reihe
    REIHE.forEach(function (eintrag) {
      const r = lies(eintrag);
      gelesen.push(r);
      if (r.da) da.push(r);
      else fehlt.push(r);
    });

    const n = da.length;
    const gesamt = REIHE.length;
    const fertig = fehlt.length === 0;

    // Maya/Inka-Zustand
    const maya = n === 0 ? 'ma\''
                : n === 1 ? 'hun'
                : n === 2 ? 'ka'
                : n === 3 ? 'ox'
                : n === gesamt ? 'kan'
                : 'ho';
    const inka = n === 0 ? 'mana'
                : n === 1 ? 'huk'
                : n === 2 ? 'iskay'
                : n === 3 ? 'kimsa'
                : n === gesamt ? 'tawa'
                : 'pichqa';

    return {
      erwacht: fertig,
      lauf: 1,
      gelesen: gelesen.length,
      da: da.map(function (r) { return r.id; }),
      fehlt: fehlt.map(function (r) { return r.id; }),
      anzahl: n,
      gesamt: gesamt,
      maya: maya,
      inka: inka,
      dauer: Date.now() - start,
      hinweis: fertig
        ? 'erwacht · ' + n + '/' + gesamt
        : 'noch nicht · ' + n + '/' + gesamt + ' · fehlt: ' + fehlt.map(function (r) { return r.id; }).join(', ')
    };
  }

  // ============================================================
  // AUTOMATISCH — der Lauf startet von selbst
  // Kein zweiter. Kein Reloop. Einmal.
  // ============================================================
  let einmal = null;

  function automatisch() {
    if (einmal) return einmal;   // schon gelaufen → nichts tun
    einmal = erwachen();

    if (window.console) {
      console.log('[erwachen]', einmal.hinweis);
      if (einmal.fehlte && einmal.fehlte.length) {
        console.log('[erwachen] fehlt:', einmal.fehlt);
      }
    }

    // Ergebnis sichtbar machen, wenn ein Element #erwachen da ist
    const el = document.getElementById('erwachen');
    if (el) {
      el.textContent = einmal.hinweis;
      el.style.color = einmal.erwacht ? '#00ffaa' : '#ffcc44';
    }

    return einmal;
  }

  // ============================================================
  // ÖFFENTLICH
  // ============================================================
  window.erwachen = erwachen;        // Funktion (kann manuell gerufen werden)
  window.erwachen.automatisch = automatisch;

  // ============================================================
  // START — automatisch beim Laden
  // Einmal. Nicht zweimal.
  // ============================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', automatisch);
  } else {
    automatisch();
  }
})();
