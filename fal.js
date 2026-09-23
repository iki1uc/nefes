// fal.js — das Orakel
// Türkçe: fal = Orakel, Wahrsagerei
// Maya:   il = sehen, schauen
// Inka:   qhaway = schauen, deuten
//
// 21 Konsequenzen des Lebens.
// Jede in drei Lesungen: mana · aura · zen.
// Wie ein Horoskop — damit man das Ernste sagen kann,
// ohne die bösen Namen zu benutzen.
//
// mana = innen → innen   (Kreislauf)
// aura = innen → außen   (Strahlung)
// zen  = Boden           (Stille, die trägt)

(function () {
  'use strict';

  // ============================================================
  // DREI LESUNGEN — mana · aura · zen
  // ============================================================
  const LESUNGEN = ['mana', 'aura', 'zen'];

  // ============================================================
  // 21 KONSEQUENZEN — jede fragmentiert, jede allein
  // ============================================================
  const KONSEQUENZEN = {
    1: {
      tr: 'doğum', maya: 'hun', inka: 'huk',
      was: 'der erste Atemzug',
      mana: 'Etwas zieht sich zusammen. Wärme, die nicht fragt.',
      aura: 'Ein Ruf in den Raum. Jemand antwortet.',
      zen: 'Nichts war vorher. Jetzt ist Etwas. Kein Grund.'
    },
    2: {
      tr: 'nefes', maya: 'ka', inka: 'iskay',
      was: 'Atem',
      mana: 'Ein-aus. Ein-aus. Immer weiter.',
      aura: 'Der Atem berührt die Luft. Sie antwortet.',
      zen: 'Atmen ohne zu wollen. Es atmet.'
    },
    3: {
      tr: 'açlık', maya: 'ox', inka: 'kimsa',
      was: 'Hunger',
      mana: 'Etwas fehlt. Der Körper ruft.',
      aura: 'Der Ruf geht hinaus. Jemand hört oder nicht.',
      zen: 'Hunger ist auch nur ein Atem. Kommt. Geht.'
    },
    4: {
      tr: 'acı', maya: 'kan', inka: 'tawa',
      was: 'Schmerz — der Name, den wir nicht sagen',
      mana: 'Es reißt. Es brennt. Es bleibt.',
      aura: 'Man sieht es mir an. Ich kann es nicht verbergen.',
      zen: 'Schmerz sitzt still. Er wartet. Er geht nicht weg.'
    },
    5: {
      tr: 'korku', maya: 'ho', inka: 'pichqa',
      was: 'Angst — der Name, den wir nicht sagen',
      mana: 'Etwas zieht sich zusammen. Der Atem wird kurz.',
      aura: 'Man riecht es. Man hört es. Man sieht es.',
      zen: 'Angst hat keinen Boden. Sie schwebt. Sie lässt los, wenn man zusieht.'
    },
    6: {
      tr: 'bağ', maya: 'uac', inka: 'suqta',
      was: 'Bindung',
      mana: 'Ein Faden wächst. Man merkt es nicht.',
      aura: 'Man sieht zwei, die zusammengehören.',
      zen: 'Bindung ist ein Atem, der zwei teilt.'
    },
    7: {
      tr: 'kayıp', maya: 'uuc', inka: 'qanchis',
      was: 'Verlust — der Name, den wir nicht sagen',
      mana: 'Etwas fehlt. Die Stelle bleibt leer.',
      aura: 'Die Leere ist sichtbar. Man kann sie nicht füllen.',
      zen: 'Verlust ist Atem, der nirgendwo ankommt.'
    },
    8: {
      tr: 'hastalık', maya: 'uaxac', inka: 'pusaq',
      was: 'Krankheit — Darth Vaders Reich',
      mana: 'Der Körper kämpft. Man merkt es spät.',
      aura: 'Man sieht die Rüstung. Sie ist kein Mensch.',
      zen: 'Krankheit sitzt. Sie wartet. Sie ist geduldig.'
    },
    9: {
      tr: 'iyileşme', maya: 'bolon', inka: 'isqun',
      was: 'Heilung',
      mana: 'Der Körper zieht sich zurück ins Eigene.',
      aura: 'Man sieht eine Wunde, die zugeht. Langsam.',
      zen: 'Heilung ist Atem, der nichts mehr will.'
    },
    10: {
      tr: 'iş', maya: 'lahun', inka: 'chunka',
      was: 'Arbeit',
      mana: 'Die Hände tun. Der Kopf folgt.',
      aura: 'Man sieht Spuren. Auf einem Tisch, im Boden.',
      zen: 'Arbeit ist Atem, der etwas hinterlässt.'
    },
    11: {
      tr: 'sevgi', maya: 'buluc', inka: 'chunka huk',
      was: 'Liebe',
      mana: 'Etwas wird warm. Es bleibt warm.',
      aura: 'Man sieht zwei, die sich ansehen. Man sieht es.',
      zen: 'Liebe ist Atem, der sich freut.'
    },
    12: {
      tr: 'ihanet', maya: 'lahca', inka: 'chunka iskay',
      was: 'Verrat — der Name, den wir nicht sagen',
      mana: 'Ein Faden reißt. Man hört es erst später.',
      aura: 'Man sieht es nicht. Bis man es sieht.',
      zen: 'Verrat ist Atem, der woanders hingeht.'
    },
    13: {
      tr: 'ayrılık', maya: 'oxlahun', inka: 'chunka kimsa',
      was: 'Trennung',
      mana: 'Die Hälfte geht weg. Man merkt es sofort.',
      aura: 'Man sieht zwei, die nicht mehr zwei sind.',
      zen: 'Trennung ist Atem, der den Boden sucht.'
    },
    14: {
      tr: 'yeni başlangıç', maya: 'kan', inka: 'chunka tawa',
      was: 'Neuanfang',
      mana: 'Ein neuer Atem. Er fängt klein an.',
      aura: 'Man sieht jemanden, der zum ersten Mal atmet.',
      zen: 'Anfang ist Atem, der noch nichts weiß.'
    },
    15: {
      tr: 'tekrar', maya: 'ho', inka: 'chunka pichqa',
      was: 'Wiederholung',
      mana: 'Es kommt wieder. Es ist nicht neu.',
      aura: 'Man sieht das Muster. Man will es nicht sehen.',
      zen: 'Wiederholung ist Atem, der sich erinnert.'
    },
    16: {
      tr: 'soru', maya: 'uac', inka: 'chunka suqta',
      was: 'Frage',
      mana: 'Etwas fragt. Es fragt nicht laut.',
      aura: 'Man hört eine Frage, die keiner stellt.',
      zen: 'Frage ist Atem, der noch nicht antwortet.'
    },
    17: {
      tr: 'cevap', maya: 'uuc', inka: 'chunka qanchis',
      was: 'Antwort',
      mana: 'Etwas antwortet. Es antwortet leise.',
      aura: 'Man sieht eine Antwort, die keiner wollte.',
      zen: 'Antwort ist Atem, der angekommen ist.'
    },
    18: {
      tr: 'huzur', maya: 'uaxac', inka: 'chunka pusaq',
      was: 'Ruhe — die symbolische Zahl',
      mana: 'Alles wird langsam. Es bleibt langsam.',
      aura: 'Man sieht jemanden, der sitzt. Nur sitzt.',
      zen: 'Ruhe ist Atem, der nichts muss.'
    },
    19: {
      tr: 'ölüm', maya: 'bolon', inka: 'chunka isqun',
      was: 'Tod — der Name, den wir nicht sagen',
      mana: 'Der Atem geht. Er kommt nicht zurück.',
      aura: 'Man sieht eine Stelle, wo Atem war.',
      zen: 'Tod ist Atem, der sich erinnert.'
    },
    20: {
      tr: 'hatıra', maya: 'lahun', inka: 'iskay chunka',
      was: 'Erinnerung',
      mana: 'Etwas bleibt. Man weiß nicht wo.',
      aura: 'Man sieht jemanden, der woanders ist.',
      zen: 'Erinnerung ist Atem, der niemandem gehört.'
    },
    21: {
      tr: 'dönüş', maya: 'hun', inka: 'huk',
      was: 'Wiederkehr — nicht als Unmensch',
      mana: 'Der Atem kommt zurück. Als ein anderer.',
      aura: 'Man sieht jemanden, der schonmal da war.',
      zen: 'Wiederkehr ist Atem, der sich nicht wiederholt.'
    }
  };

  // ============================================================
  // BAK — eine Konsequenz lesen
  // ============================================================
  function bak(n, lesung) {
    const k = KONSEQUENZEN[n];
    if (!k) return null;
    const l = lesung || 'mana';
    return {
      sayi: n,
      tr: k.tr,
      maya: k.maya,
      inka: k.inka,
      was: k.was,
      lesung: l,
      text: k[l],
      // 18 ist symbolisch — die Ruhe
      symbolisch: n === 18,
      // 21 — Wiederkehr, aber nicht als Unmensch
      dönüş: n === 21,
      hinweis: n === 18
        ? 'die symbolische 18 — huzur'
        : n === 21
          ? 'Wiederkehr — nicht als Unmensch'
          : k.tr
    };
  }

  // ============================================================
  // HEP — alle 21
  // ============================================================
  function hep(lesung) {
    const liste = [];
    for (let i = 1; i <= 21; i++) {
      liste.push(bak(i, lesung));
    }
    return liste;
  }

  // ============================================================
  // DREI — eine Zahl in allen drei Lesungen
  // ============================================================
  function drei(n) {
    const k = KONSEQUENZEN[n];
    if (!k) return null;
    return {
      sayi: n,
      tr: k.tr,
      maya: k.maya,
      inka: k.inka,
      was: k.was,
      mana: k.mana,
      aura: k.aura,
      zen: k.zen,
      hinweis: n === 18 ? 'huzur — symbolisch' : k.tr
    };
  }

  // ============================================================
  // RUHE — die 18, in drei Lesungen
  // ============================================================
  function ruhe() {
    return drei(18);
  }

  // ============================================================
  // DÖNÜŞ — die 21, in drei Lesungen
  // ============================================================
  function dönüs() {
    return drei(21);
  }

  // ============================================================
  // ERKLÄRUNG
  // ============================================================
  function erklaerung() {
    return 'fal — Orakel. 21 Konsequenzen des Lebens. ' +
           'Jede in drei Lesungen: mana · aura · zen. ' +
           'Wie ein Horoskop — damit man das Ernste sagen kann, ' +
           'ohne die bösen Namen zu benutzen.';
  }

  // ============================================================
  // ÖFFENTLICH
  // ============================================================
  const api = {
    KONSEQUENZEN: KONSEQUENZEN,
    LESUNGEN: LESUNGEN,
    bak: bak,
    hep: hep,
    drei: drei,
    ruhe: ruhe,
    dönüs: dönüs,
    erklaerung: erklaerung
  };

  if (typeof window !== 'undefined') window.fal = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();

// ============================================================
// Anwendung
// ============================================================
//
// fal.bak(4);           // acı · mana · 'Es reißt. Es brennt.'
// fal.bak(4, 'aura');   // acı · aura · 'Man sieht es mir an.'
// fal.bak(4, 'zen');    // acı · zen  · 'Schmerz sitzt still.'
//
// fal.drei(4);          // alle drei Lesungen auf einmal
// fal.ruhe();           // die 18 — huzur
// fal.dönüs();          // die 21 — Wiederkehr, nicht als Unmensch
// fal.hep();            // alle 21 in mana
// fal.hep('zen');       // alle 21 in zen
