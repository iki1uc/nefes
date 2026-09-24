NEFES.registriere("achse", (phase, richtung, t) => {
  // alle 2 sekunden: ein Schnappschuss vom Canvas
  if (richtung === "ein" && phase < 0.05) {
    ACHSE.sehe(phase);   // sieht die Phase, speichert sie
  }
});
// ============================================================
// axle.js — ACHSE · das auge
// sieht: foto · bild · schnappschuss
// ============================================================
const ACHSE = (() => {
  const bilder = [];        // gespeicherte schnappschüsse
  const MAX = 12;           // nur die letzten 12

  // ---- sehen ----
  function sehe(phase) {
    const canvas = document.getElementById("bühne-canvas");
    if (!canvas) return;
    const bild = canvas.toDataURL("image/png");
    bilder.push({ zeit: Date.now(), phase, bild });
    if (bilder.length > MAX) bilder.shift();
  }

  // ---- schnappschuss von der kamera ----
  async function schnappschuss() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    video.srcObject = stream;
    await video.play();
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    stream.getTracks().forEach(t => t.stop());
    return canvas.toDataURL("image/png");
  }

  return { sehe, schnappschuss, get bilder() { return [...bilder]; } };
})();

NEFES.registriere("achse", (phase, richtung, t) => {
  if (richtung === "ein" && phase < 0.05) {
    ACHSE.sehe(phase);
  }
});

if (typeof window !== "undefined") window.ACHSE = ACHSE;
