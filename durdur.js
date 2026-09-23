<canvas id="c"></canvas>
<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');
function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, c.width, c.height);
}
async function online() {...}
window.addEventListener('online', online);
window.addEventListener('offline', () => {});
draw();
</script>
