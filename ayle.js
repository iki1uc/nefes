// ============================================================
// ayle.js — AYLE · das ohr
// hört: ton · mikrofon · stimme
// ============================================================
const AYLE = (() => {
  let audioCtx = null;
  let analyser = null;
  const pegel = [];       // letzte 100 pegelwerte
  const MAX = 100;

  async function starte() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
  }

  function höre(phase) {
    if (!analyser) return;
    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    pegel.push({ zeit: Date.now(), phase, rms });
    if (pegel.length > MAX) pegel.shift();
  }

  return { starte, höre, get pegel() { return [...pegel]; } };
})();

NEFES.registriere("ayle", (phase, richtung, t) => {
  if (richtung === "ein" && phase < 0.05) {
    AYLE.höre(phase);
  }
});

if (typeof window !== "undefined") window.AYLE = AYLE;
