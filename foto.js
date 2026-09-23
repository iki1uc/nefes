// foto.js — Kamera & Foto
(function () {
  'use strict';

  // 1. Kamera anfordern
  async function kameraAn() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Rückkamera
      });
      const video = document.getElementById('video');
      video.srcObject = stream;
      video.play();
      return stream;
    } catch (err) {
      console.error('Kamera-Fehler:', err);
      return null;
    }
  }

  // 2. Foto aufnehmen
  function fotoMachen() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('foto');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/png'); // Base64-Bild
  }

  // 3. Kamera aus
  function kameraAus(stream) {
    if (stream) stream.getTracks().forEach(t => t.stop());
  }

  window.foto = { kameraAn, fotoMachen, kameraAus };
})();
