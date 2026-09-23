<canvas id="c"></canvas>
<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');

// Passe die Größe des Canvas an das Fenster an (wichtig für Handys)
function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- Konfiguration ---
const totalDuration = 10; // Gesamtdauer des Countdowns in Sekunden
const startTime = performance.now(); // Startzeitpunkt

function draw() {
    // 1. Hintergrund zeichnen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);

    // 2. Zeit berechnen
    const now = performance.now();
    const elapsed = (now - startTime) / 1000; // Vergangene Zeit in Sekunden
    const remaining = Math.max(0, totalDuration - elapsed);
    const progress = remaining / totalDuration; // 0 bis 1

    // 3. Kreis als "Führung" zeichnen
    const centerX = c.width / 2;
    const centerY = c.height / 2;
    const radius = Math.min(c.width, c.height) * 0.3;

    // Zeichne den Hintergrund-Kreis (optional)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#333'; // Dunkelgrau für den "leeren" Teil
    ctx.lineWidth = 20;
    ctx.stroke();

    // Zeichne den sich füllenden Bogen (die Führung)
    // Startwinkel: -90 Grad (oben), um im Uhrzeigersinn zu füllen
    const startAngle = -Math.PI / 2;
    // Endwinkel basierend auf dem Fortschritt
    const endAngle = startAngle + (Math.PI * 2 * (1 - progress));

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#00ffaa'; // Deine "Nefes"-Farbe
    ctx.lineWidth = 20;
    ctx.lineCap = 'round'; // Abgerundete Enden für einen weicheren Look
    ctx.stroke();

    // 4. Text in der Mitte zeichnen (optional)
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 40px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.ceil(remaining), centerX, centerY);

    // 5. Loop
    if (remaining > 0) {
        requestAnimationFrame(draw);
    } else {
        // Countdown beendet
        ctx.fillStyle = '#00ffaa';
        ctx.font = 'bold 30px monospace';
        ctx.fillText('Klärung', centerX, centerY + 80);
    }
}

draw();
</script>
