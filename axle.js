// ============================================================
// axle.js — ACHSE · das auge
// sieht: foto · bild · schnappschuss
// ============================================================
const ACHSE = (() => {
  const bilder = [];        // gespeicherte schnappschüsse
  const MAX = 12;           // nur die letzten 12

  // ---- canvas finden, egal wie er heißt ----
  function findeCanvas() {
    const namen = ["bühne-canvas", "c", "canvas"];
    for (const n of namen) {
      const el = document.getElementById(n);
      if (el && el.tagName === "CANVAS") return el;
    }
    // letzter versuch: irgendein canvas auf der seite
    return document.querySelector("canvas");
  }

  // ---- sehen ----
  function sehe(phase) {
    const canvas = findeCanvas();
    if (!canvas) return;
    try {
      const bild = canvas.toDataURL("image/png");
      bilder.push({ zeit: Date.now(), phase, bild });
      if (bilder.length > MAX) bilder.shift();
    } catch (e) {
      // canvas kann "tainted" sein — dann nicht lesbar
      // kein fehler, nur ein leerer blick
    }
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

  return {
    sehe,
    schnappschuss,
    get bilder() { return [...bilder]; }
  };
})();

// ---- EINE registrierung. genau eine. ----
if (typeof window.NEFES !== "undefined" && window.NEFES.registriere) {
  window.NEFES.registriere("achse", function (phase, richtung, t) {
    if (richtung === "ein" && phase < 0.05) {
      ACHSE.sehe(phase);
    }
  });
}

if (typeof window !== "undefined") window.ACHSE = ACHSE;
