const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
const text = "HAPPY NEW YEAR 2026";

// Vẽ chữ ra canvas ẩn
const textCanvas = document.createElement("canvas");
const tctx = textCanvas.getContext("2d");

textCanvas.width = canvas.width;
textCanvas.height = canvas.height;

tctx.fillStyle = "white";
tctx.font = "bold 90px Arial";
tctx.textAlign = "center";
tctx.textBaseline = "middle";
tctx.fillText(text, canvas.width / 2, canvas.height / 2);

// Lấy pixel tạo pháo hoa
const imageData = tctx.getImageData(0, 0, canvas.width, canvas.height).data;

for (let y = 0; y < canvas.height; y += 6) {
  for (let x = 0; x < canvas.width; x += 6) {
    const index = (y * canvas.width + x) * 4;
    if (imageData[index + 3] > 150) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        tx: x,
        ty: y,
        vx: 0,
        vy: 0,
        alpha: Math.random(),
        color: `hsl(${Math.random() * 360},100%,60%)`
      });
    }
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.vx += (p.tx - p.x) * 0.01;
    p.vy += (p.ty - p.y) * 0.01;
    p.vx *= 0.85;
    p.vy *= 0.85;

    p.x += p.vx;
    p.y += p.vy;

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 2, 2);
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}

animate();
