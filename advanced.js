// The exact fibonacci function required by the lab
function fibonacci(n) {
  const sequence = [0, 1];
  if (n === 0) return 0;
  if (n === 1) return 1;
  for (let i = 2; i <= n; i++) {
    const nextNum = sequence[i - 2] + sequence[i - 1];
    sequence.push(nextNum);
  }
  return sequence[n];
}

// Canvas hero spiral
const heroCanvas = document.getElementById("hero-canvas");
const hCtx = heroCanvas.getContext("2d");
let heroTime = 0;

function resizeHero() {
  heroCanvas.width = window.innerWidth;
  heroCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeHero);
resizeHero();

function drawHeroSpiral() {
  hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
  const cx = heroCanvas.width / 2;
  const cy = heroCanvas.height / 2;
  hCtx.strokeStyle = "rgba(212, 175, 119, 0.15)";
  hCtx.lineWidth = 2;
  for (let i = 0; i < 18; i++) {
    const radius = 80 + i * 28 + Math.sin(heroTime + i) * 12;
    hCtx.beginPath();
    hCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    hCtx.stroke();
  }
  heroTime += 0.018;
  requestAnimationFrame(drawHeroSpiral);
}
drawHeroSpiral();

// Main calculator
const nInput = document.getElementById("n-input");
const computeBtn = document.getElementById("compute-btn");
const fibResult = document.getElementById("fib-result");
const sequenceContainer = document.getElementById("sequence-container");

function animateValue(start, end, duration, callback) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    callback(value);
    if (progress < 1) requestAnimationFrame(step);
    else callback(end);
  };
  requestAnimationFrame(step);
}

function renderSequence(n) {
  sequenceContainer.innerHTML = "";
  const seq = [0, 1];
  for (let i = 2; i <= n; i++) {
    seq.push(seq[i - 2] + seq[i - 1]);
  }
  seq.forEach((num, index) => {
    const el = document.createElement("div");
    el.className = "sequence-item";
    el.textContent = num;
    el.style.animationDelay = `${index * 28}ms`;
    if (index === n) el.style.boxShadow = "0 0 40px 12px #d4af77";
    sequenceContainer.appendChild(el);
  });
}

function compute() {
  const n = parseInt(nInput.value);
  if (isNaN(n) || n < 0) return;

  const result = fibonacci(n);

  // Animate the big number
  const current = parseInt(fibResult.textContent) || 0;
  animateValue(current, result, 1200, (val) => {
    fibResult.textContent = val;
  });

  // Render live sequence
  renderSequence(n);

  // Update spiral canvas
  drawSpiral(n);
}

// Spiral canvas (Fibonacci squares + quarter arcs)
const spiralCanvas = document.getElementById("spiral-canvas");
const sCtx = spiralCanvas.getContext("2d");

function drawSpiral(maxN) {
  sCtx.clearRect(0, 0, spiralCanvas.width, spiralCanvas.height);
  let seq = [1, 1];
  for (let i = 2; i <= maxN; i++) seq.push(seq[i - 2] + seq[i - 1]);

  let x = spiralCanvas.width * 0.52;
  let y = spiralCanvas.height * 0.55;
  let dirIndex = 0;
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ];
  const totalExtent = seq.reduce((a, b) => a + b, 0);
  const scale =
    (Math.min(spiralCanvas.width, spiralCanvas.height) * 0.78) / totalExtent;

  sCtx.shadowBlur = 25;
  sCtx.shadowColor = "#d4af77";
  sCtx.lineWidth = 7;
  sCtx.strokeStyle = "#d4af77";

  for (let i = 0; i < seq.length; i++) {
    const size = seq[i] * scale;
    sCtx.strokeRect(x, y, size, size);

    // Quarter arc for the spiral feel
    const startAngle = (dirIndex * Math.PI) / 2;
    sCtx.beginPath();
    sCtx.arc(
      x + size / 2,
      y + size / 2,
      size / 2,
      startAngle,
      startAngle + Math.PI / 2,
      false
    );
    sCtx.stroke();

    // Move to next position
    x += directions[dirIndex][0] * size;
    y += directions[dirIndex][1] * size;
    dirIndex = (dirIndex + 1) % 4;
  }
}

computeBtn.addEventListener("click", compute);
nInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") compute();
});

// Tab system for code showcase
const tabBtns = document.querySelectorAll(".tab-btn");
const codeContent = document.getElementById("code-content");

const implementations = {
  js: `function fibonacci(n) {
    const sequence = [0, 1];
    if (n === 0) return 0;
    if (n === 1) return 1;
    for (let i = 2; i <= n; i++) {
        const nextNum = sequence[i-2] + sequence[i-1];
        sequence.push(nextNum);
    }
    return sequence[n];
}`,
  py: `def fibonacci(n):
    sequence = [0, 1]
    if n == 0: return 0
    if n == 1: return 1
    for i in range(2, n + 1):
        next_num = sequence[i-2] + sequence[i-1]
        sequence.append(next_num)
    return sequence[n]`,
  java: `public static int fibonacci(int n) {
    int[] sequence = new int[n + 1];
    if (n >= 0) sequence[0] = 0;
    if (n >= 1) sequence[1] = 1;
    for (int i = 2; i <= n; i++) {
        sequence[i] = sequence[i-2] + sequence[i-1];
    }
    return sequence[n];
}`
};

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const lang = btn.dataset.lang;
    codeContent.textContent = implementations[lang];
  });
});

// Initial load
window.onload = () => {
  compute();
  drawSpiral(15);
};
