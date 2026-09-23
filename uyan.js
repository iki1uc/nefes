// uyan.js — das Erwachen
// Türkçe: uyan = wach werden (Tun)
//         uyanık = wach (Sein)
// Maya:   yahal kab
// Inka:   rikch'ay
//
// Trennung:
//   window.uyan     = Tun (Funktion)
//   window.erwacht  = Sein (Zustand)

(function () {
  'use strict';

  const REIHE = [
    { id: 'bir',     maya: 'hun',  inka: 'huk'    },
    { id: 'bu',      maya: 'hun',  inka: 'huk'    },
    { id: 'su',      maya: 'ka',   inka: 'iskay'  },
    { id: 'nefes',   maya: 'ik\'', inka: 'samay'  },
    { id: 'iki',     maya: 'ka',   inka: 'iskay'  },
    { id: 'üç',      maya: 'ox',   inka: 'kimsa'  },
    { id: 'ki',      maya: 'hun',  inka: 'huk'    },
    { id: 'klar',    maya: 'ma\'', inka: 'mana'   },
    { id: 'dur',     maya: 'kan',  inka: 'sayay'  },
    { id: 'durdur',  maya: 'kan',  inka: 'sayay'  },
    { id: 'ikilem',  maya: 'kan',  inka: 'tawa'   },
    { id: 'hal',     maya: 'u hal', inka: 'kawsay' },
    { id: 'kaygıyı', maya: 'kan',  inka: 'tawa'   },
    { id: 'birden',  maya: 'ka',   inka: 'iskay'  },
    { id: 'fal',     maya: 'il',   inka: 'qhaway' }
  ];

  function lies(e) {
    if (e.id === 'bir') return { id: e.id, da: window.__bir === true };
    const obj = window[e.id] || null;
    return {
      id: e.id,
      da: (typeof obj === 'object' && obj !== null) || typeof obj === 'function'
    };
  }

  function uyan() {
    const da = [];
    const fehlt = [];
    REIHE.forEach(function (e) {
      const r = lies(e);
      if (r.da) da.push(r.id);
      else fehlt.push(r.id);
    });

    const n = da.length;
    const g = REIHE.length;
    const fertig = fehlt.length === 0;

    // SEIN — eigene Variable
    window.erwacht = {
      wach: fertig,
      lauf: 1,
      da: da,
      fehlt: fehlt,
      anzahl: n,
      gesamt: g,
      maya: n === 0 ? 'ma\'' : n === 1 ? 'hun' : n === 2 ? 'ka' : n === 3 ? 'ox' : n === g ? 'kan' : 'ho',
      inka: n === 0 ? 'mana' : n === 1 ? 'huk' : n === 2 ? 'iskay' : n === 3 ? 'kimsa' : n === g ? 'tawa' : 'pichqa',
      hinweis: fertig ? 'erwacht · ' + n + '/' + g
                      : 'noch nicht · ' + n + '/' + g + ' · fehlt: ' + fehlt.join(', ')
    };

    if (window.console) console.log('[uyan]', window.erwacht.hinweis);

    const el = document.getElementById('erwachen');
    if (el) {
      el.textContent = window.erwacht.hinweis;
      el.style.color = window.erwacht.wach ? '#00ffaa' : '#ffcc44';
    }

    return window.erwacht;
  }

  // TUN — window.uyan
  window.uyan = uyan;

  // Automatisch einmal
  let einmal = false;
  function automatisch() {
    if (einmal) return window.erwacht;
    einmal = true;
    return uyan();
  }

  window.uyan.automatisch = automatisch;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', automatisch);
  } else {
    automatisch();
  }
})();
