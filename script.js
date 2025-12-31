let userName = "";
let count = 5;

/* MUSIC AUTOPLAY */
const music = document.getElementById("bgMusic");
document.body.addEventListener("click", () => {
  music.play().catch(()=>{});
}, { once: true });

/* START */
function startWish() {
  const input = document.getElementById("nameInput").value.trim();
  if (!input) return alert("Please enter your name");

  userName = input;
  document.getElementById("namePage").classList.add("hidden");
  document.getElementById("countdownPage").classList.remove("hidden");
  startCountdown();
}

/* COUNTDOWN */
function startCountdown() {
  const text = document.getElementById("countText");
  text.innerText = count;

  const interval = setInterval(() => {
    count--;
    text.innerText = count;

    if (count === 0) {
      clearInterval(interval);
      showWish();
      bigBoom();
    }
  }, 1000);
}

/* SHOW WISH */
function showWish() {
  document.getElementById("countdownPage").classList.add("hidden");
  document.getElementById("wishPage").classList.remove("hidden");

  const title = document.getElementById("wishTitle");
  const msg = document.getElementById("wishMsg");
  const wisher = document.getElementById("wisher");

  msg.innerText = `🎉 A New Year’s Spark
A brand new year, a page so bright,
Filled with dreams and morning light.
Leave behind what made you blue,
Embrace the joy that’s fresh and new.

May laughter, love, and hope appear,
Wishing you a Happy New Year!, ${userName}! 🎉`;

  setTimeout(() => title.classList.add("show"), 300);
  setTimeout(() => msg.classList.add("show"), 1100);
  setTimeout(() => wisher.classList.add("show"), 1800);
}

/* WHATSAPP SHARE */
function shareWhatsApp() {
  const text =
    `🎉 Happy New Year 2026 🎉%0A` +
    `✨ Happy New Year, ${userName}! ✨%0A` +
    `From Kapishan 💖`;

  window.open(`https://wa.me/?text=${text}`, "_blank");
}

/* SNOW */
const snowContainer = document.getElementById("snowContainer");
function createSnow() {
  const snow = document.createElement("div");
  snow.className = "snowflake";
  snow.innerText = "❄";
  snow.style.left = Math.random() * window.innerWidth + "px";
  snow.style.fontSize = 10 + Math.random() * 20 + "px";

  let y = -10;
  let drift = (Math.random() - 0.5) * 0.6;

  function fall() {
    y += 0.6;
    snow.style.top = y + "px";
    snow.style.left = parseFloat(snow.style.left) + drift + "px";
    if (y < window.innerHeight) requestAnimationFrame(fall);
    else snow.remove();
  }

  snowContainer.appendChild(snow);
  fall();
}
setInterval(createSnow, 350);

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.exploded = false;
    this.particles = [];
  }
  explode() {
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4 + 2,
        life: 60
      });
    }
  }
  update() {
    if (!this.exploded) {
      this.y -= 4;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    } else {
      this.particles.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
      });
    }
  }
  draw() {
    ctx.fillStyle = "gold";
    if (!this.exploded) {
      ctx.fillRect(this.x, this.y, 2, 8);
    } else {
      this.particles.forEach(p => {
        ctx.globalAlpha = p.life / 60;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }
  }
}

let fireworks = [];
function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.03) fireworks.push(new Firework());

  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.exploded && f.particles.every(p => p.life <= 0)) {
      fireworks.splice(i, 1);
    }
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

/* BIG BOOM */
function bigBoom() {
  for (let i = 0; i < 8; i++) fireworks.push(new Firework());
}
