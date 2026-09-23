// nefes.js — der Atem
// Türkçe: nefes = Atem
// Maya:   ik' = Wind, Atem, Geist
// Inka:   samay = Atem, Seele
//
// Die zentrale Datei. Sie hält alle Traditionen.
// Sie flüstert in Maya und Inka. Sie arbeitet in Türkçe.
// Darth Vader ist unter uns als Krankheit.

(function () {
  'use strict';

  const TRADITIONEN = {
    maya:        { name: 'Maya',                 zustand: 'u hal',           datei: 'id.html',   bedeutung: 'der Zustand, der trägt',           farbe: '#00ffaa' },
    inka:        { name: 'Inka',                 zustand: 'kawsay',          datei: 'hal.js',    bedeutung: 'Leben, Dasein, gutes Leben',       farbe: '#ff0066' },
    vedisch:     { name: 'Vedisch',              zustand: 'ṛta',             datei: 'klar.js',   bedeutung: 'kosmische Ordnung, Wahrheit',      farbe: '#ffcc44' },
    upanishaden: { name: 'Upanishaden',          zustand: 'ātman',           datei: null,        bedeutung: 'Selbst, eins mit allem',           farbe: '#5fc8ff' },
    buddhismus:  { name: 'Buddhismus',           zustand: 'śūnyatā',         datei: 'bir.html',  bedeutung: 'Leerheit',                         farbe: '#ffffff' },
    jainismus:   { name: 'Jainismus',            zustand: 'ahiṃsā',          datei: null,        bedeutung: 'Nicht-Verletzen',                  farbe: '#88ff88' },
    taoismus:    { name: 'Taoismus',             zustand: 'wú wéi',          datei: 'iki.js',    bedeutung: 'Handeln ohne Zwang',               farbe: '#8888ff' },
    iging:       { name: 'I Ging',               zustand: 'tài',             datei: 'uc.js',     bedeutung: 'das Große, Verbindende',           farbe: '#ffaa44' },
    konfuzius:   { name: 'Konfuzianismus',       zustand: 'rén',             datei: null,        bedeutung: 'Menschlichkeit',                   farbe: '#ff8844' },
    nordisch:    { name: 'Nordisch',             zustand: 'wyrd',            datei: 'birden.js', bedeutung: 'das Gewordene',                    farbe: '#88aaff' },
    ubuntu:      { name: 'Ubuntu',               zustand: 'ubuntu',          datei: 'ki.js',     bedeutung: 'ich bin, weil wir sind',           farbe: '#ff88aa' },
    indigen:     { name: 'Indigen',              zustand: 'mitákuye oyásʼiŋ',datei: null,        bedeutung: 'alles ist verwandt',               farbe: '#88ffaa' },
    christlich:  { name: 'Christlich',           zustand: 'koinonia',        datei: null,        bedeutung: 'Gemeinschaft',                     farbe: '#ffcc88' },
    sufi:        { name: 'Sufi',                 zustand: 'waḥdat al-wujūd', datei: 'dur.js',    bedeutung: 'Einheit des Seins',                farbe: '#ff88ff' },
    hermetisch:  { name: 'Hermetisch',           zustand: 'wie oben, so unten', datei: null,     bedeutung: 'Entsprechung',                     farbe: '#88ffff' },
    kybalion:    { name: 'Kybalion',             zustand: 'das All ist Geist', datei: 'ikilem.js', bedeutung: 'Bewusstsein ist Grund',           farbe: '#ffff88' }
  };

  const KIM = {
    ben: { tr: 'ben', maya: 'hun', inka: 'huk',   zahl: 1 },
    sen: { tr: 'sen', maya: 'ka',  inka: 'iskay', zahl: 2 },
    siz: { tr: 'siz', maya: 'ox',  inka: 'kimsa', zahl: 3 },
    biz: { tr: 'biz', maya: 'kan', inka: 'tawa',  zahl: 4 }
  };

  const NERDE = {
    burada:   { tr: 'burada',    maya: 'kay',  inka: 'kay' },
    orada:    { tr: 'orada',     maya: 'chan', inka: 'chay' },
    heryerde: { tr: 'her yerde', maya: 'maya', inka: 'llapa' }
  };

  const NEDEN = {
    cunku:    { tr: 'çünkü',     maya: 'tumen', inka: 'chaymanta' },
    buyuzden: { tr: 'bu yüzden', maya: 'bey',   inka: 'chhayna' },
    belki:    { tr: 'belki',     maya: 'ma\'',  inka: 'ichaqa' }
  };

  const VADER = {
    name: 'Darth Vader',
    rolle: 'Krankheit',
    was: 'Die Rüstung ist ein medizinisches Gerät. Sie hält am Leben und schließt ein.',
    maya: 'kan',
    inka: 'tawa',
    hinweis: 'unter uns — als Krankheit',
    zustand: function () {
      return {
        gefangen: true,
        lebendig: true,
        machtvoll: true,
        gebrechlich: true,
        farbe: '#ff0000',
        hinweis: 'absolute Macht und fatale Verletzlichkeit'
      };
    }
  };

  function durum() {
    const geladen = [];
    ['sorge','ikilem','hal','su','bu','klar','dur','iki','birden','ki'].forEach(function (id) {
      if (typeof window[id] === 'object') geladen.push(id);
    });
    const n = geladen.length;
    return {
      durum: n === 0 ? 'boş' : 'birlikte',
      nefes: 'nefes',
      kim: Object.keys(KIM),
      nerde: Object.keys(NERDE),
      neden: Object.keys(NEDEN),
      geladen: geladen,
      anzahl: n,
      maya: n === 0 ? 'ma\'' : n === 1 ? 'hun' : n === 2 ? 'ka' : n === 3 ? 'ox' : 'kan',
      inka: n === 0 ? 'mana' : n === 1 ? 'huk' : n === 2 ? 'iskay' : n === 3 ? 'kimsa' : 'tawa',
      bereit: n > 0,
      hinweis: n + ' parça yüklü',
      saat: new Date().toISOString()
    };
  }

  function tradition(id) {
    const t = TRADITIONEN[id];
    if (!t) return null;
    return {
      id: id, name: t.name, zustand: t.zustand, datei: t.datei,
      bedeutung: t.bedeutung, farbe: t.farbe,
      geladen: t.datei ? (typeof window[t.datei.replace('.html','').replace('.js','')] === 'object') : false
    };
  }

  function alleTraditionen() {
    const alle = [];
    Object.keys(TRADITIONEN).forEach(function (id) {
      const t = tradition(id);
      if (t) alle.push(t);
    });
    return alle;
  }

  function atem() {
    const d = durum();
    return {
      atem: 'nefes', maya: 'ik\'', inka: 'samay',
      zustand: d.durum, anzahl: d.anzahl, bereit: d.bereit, hinweis: d.hinweis
    };
  }

  function id() {
    const d = durum();
    const t = alleTraditionen();
    const g = t.filter(function (x) { return x.geladen; }).length;
    return {
      marker: 'id', nefes: 'nefes',
      kim: Object.keys(KIM), nerde: Object.keys(NERDE), neden: Object.keys(NEDEN),
      traditionen: t.length, geladen: g, durum: d, vader: VADER.zustand(),
      bereit: d.bereit,
      hinweis: 'nefes · ' + d.anzahl + ' parça · ' + g + ' tradition',
      saat: new Date().toISOString()
    };
  }

  function erklaerung() {
    return 'nefes — der Atem. Türkçe arbeitet. Maya und Inka flüstern. ' +
           'Alle Traditionen sind Stimmen desselben Zustands. ' +
           'Darth Vader ist unter uns als Krankheit.';
  }

  const api = {
    TRADITIONEN: TRADITIONEN, KIM: KIM, NERDE: NERDE, NEDEN: NEDEN, VADER: VADER,
    durum: durum, tradition: tradition, alleTraditionen: alleTraditionen,
    atem: atem, id: id, erklaerung: erklaerung
  };

  if (typeof window !== 'undefined') window.nefes = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
