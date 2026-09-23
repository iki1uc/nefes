// dur.js — der Halt
// dur ist besetzt.
// Also: durdur() — veranlasst den Halt.
// Ursache: durdur wird gerufen.
// Wirkung: es hält an.

function durdur(neden) {
  if (!neden) {
    return { durdu: true, neden: null, sonuç: 'alles hält an' };
  }
  return { durdu: true, neden: neden, sonuç: neden + ' hält an' };
}

durdur.erklaerung = function() {
  return 'durdur() veranlasst den Halt. Ursache: neden. Wirkung: sonuç.';
};

if (typeof window !== 'undefined') {
  window.durdur = durdur;
}
