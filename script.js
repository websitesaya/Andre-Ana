// ===================================
// WEDDING INVITATION SCRIPTS
// Andrianus & Ana Verawati
// ===================================

// ===== READ URL PARAMS (from generator) =====
(function () {
  const params = new URLSearchParams(window.location.search);
  const tamu = params.get('tamu');
  if (tamu) {
    localStorage.setItem('weddingGuest', tamu);
  }
})();

// ===== OPENING SCREEN =====
function initOpening() {
  const opening = document.getElementById('opening');
  const guestName = localStorage.getItem('weddingGuest') || '';
  const nameDisplay = document.getElementById('guest-name-display');

  if (guestName && nameDisplay) {
    nameDisplay.textContent = 'Kepada Yth. ' + guestName;
  } else if (nameDisplay) {
    nameDisplay.textContent = '';
  }

  if (opening) opening.classList.add('show');
}

function openInvitation() {
  const opening = document.getElementById('opening');
  if (opening) {
    opening.style.animation = 'fadeOut 0.8s ease forwards';
    setTimeout(() => { opening.classList.remove('show'); }, 800);
  }
  startMusic();
}

// ===== MUSIC =====
let musicStarted = false;
let isPlaying = false;

function startMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  if (!musicStarted) {
    audio.volume = 0.5;
    audio.loop = true;
    audio.play().catch(() => { });
    musicStarted = true;
    isPlaying = true;
    updateMusicBtn();
  }
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  if (!musicStarted) { startMusic(); return; }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(() => { });
    isPlaying = true;
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  const btn = document.getElementById('music-btn');
  if (!btn) return;
  if (isPlaying) {
    btn.classList.add('playing');
    btn.innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
  } else {
    btn.classList.remove('playing');
    btn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>`;
  }
}

// ===== SNOW ANIMATION =====
function initSnow() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  const flakes = [];
  const count = Math.min(80, Math.floor(W / 15));

  for (let i = 0; i < count; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 3 + 0.5,
      speed: Math.random() * 1.2 + 0.3,
      wind: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
      ctx.shadowColor = 'rgba(201, 168, 76, 0.3)';
      ctx.shadowBlur = 4;
      ctx.fill();

      f.y += f.speed;
      f.wobble += f.wobbleSpeed;
      f.x += f.wind + Math.sin(f.wobble) * 0.4;

      if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W; }
      if (f.x > W + 10) { f.x = -10; }
      if (f.x < -10) { f.x = W + 10; }
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });
}

// ===== DOVE ANIMATION =====
function initDoves() {
  const canvas = document.getElementById('dove-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  canvas.width = W; canvas.height = H;

  class Dove {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = init ? Math.random() * W : (Math.random() < 0.5 ? -100 : W + 100);
      this.y = Math.random() * H * 0.6 + 50;
      this.size = Math.random() * 18 + 12;
      this.speed = Math.random() * 0.8 + 0.4;
      this.dir = this.x < 0 ? 1 : -1;
      this.wingAngle = 0;
      this.wingSpeed = Math.random() * 0.08 + 0.05;
      this.opacity = Math.random() * 0.4 + 0.25;
      this.yDrift = (Math.random() - 0.5) * 0.3;
      this.phase = Math.random() * Math.PI * 2;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y + Math.sin(this.phase) * 10);
      if (this.dir < 0) ctx.scale(-1, 1);

      const s = this.size;
      const wing = Math.sin(this.wingAngle) * 0.8;

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.7, s * 0.3, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(s * 0.6, -s * 0.15, s * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();

      // Beak
      ctx.beginPath();
      ctx.moveTo(s * 0.8, -s * 0.15);
      ctx.lineTo(s * 1.05, -s * 0.08);
      ctx.lineTo(s * 0.82, -s * 0.05);
      ctx.fillStyle = 'rgba(230,180,80,0.9)';
      ctx.fill();

      // Upper wing
      ctx.save();
      ctx.rotate(-wing * 0.6);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s * 0.2, -s * (0.8 + wing * 0.4), s * 0.2, -s * (1.2 + wing * 0.5), s * 0.5, -s * 0.2);
      ctx.bezierCurveTo(s * 0.2, -s * 0.1, -s * 0.1, 0, 0, 0);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fill();
      ctx.restore();

      // Lower wing
      ctx.save();
      ctx.rotate(wing * 0.4);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s * 0.2, s * (0.5 + wing * 0.3), s * 0.3, s * (0.9 + wing * 0.4), s * 0.5, s * 0.2);
      ctx.bezierCurveTo(s * 0.2, s * 0.1, -s * 0.1, 0, 0, 0);
      ctx.fillStyle = 'rgba(245,245,245,0.8)';
      ctx.fill();
      ctx.restore();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-s * 0.65, 0);
      ctx.bezierCurveTo(-s * 0.9, -s * 0.25, -s * 1.1, s * 0.1, -s * 0.8, s * 0.15);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fill();

      ctx.restore();
    }
    update() {
      this.x += this.speed * this.dir;
      this.y += this.yDrift;
      this.wingAngle += this.wingSpeed;
      this.phase += 0.012;
      if (this.x > W + 150 || this.x < -150) this.reset();
    }
  }

  const doves = Array.from({ length: 4 }, () => new Dove());

  function animateDoves() {
    ctx.clearRect(0, 0, W, H);
    doves.forEach(d => { d.update(); d.draw(); });
    requestAnimationFrame(animateDoves);
  }
  animateDoves();

  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W; canvas.height = H;
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section, .verse-box, .couple-card, .couple-center, .event-card, .gallery-item, .countdown-item, .atm-card, .wishes-form, .wish-item, .timeline-item, .protocol-item').forEach(el => {
    observer.observe(el);
  });
}

// ===== COUNTDOWN =====
function initCountdown() {
  const target = new Date('2026-06-23T08:00:00');

  function update() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
        const el = document.getElementById('ct-' + id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    const els = { days, hours, minutes, seconds };
    Object.entries(els).forEach(([k, v]) => {
      const el = document.getElementById('ct-' + k);
      if (el) {
        const padded = pad(v);
        if (el.textContent !== padded) {
          el.style.animation = 'none';
          el.offsetHeight;
          el.style.animation = 'flipNum 0.3s ease';
          el.textContent = padded;
        }
      }
    });
  }
  update();
  setInterval(update, 1000);
}

// ===== GALLERY LIGHTBOX =====
let currentLightboxIndex = 0;
const totalPhotos = 20;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = `Foto${index + 1}.jpg`;
  lb.classList.add('active');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
}

function prevPhoto() {
  currentLightboxIndex = (currentLightboxIndex - 1 + totalPhotos) % totalPhotos;
  const img = document.getElementById('lightbox-img');
  if (img) img.src = `Foto${currentLightboxIndex + 1}.jpg`;
}

function nextPhoto() {
  currentLightboxIndex = (currentLightboxIndex + 1) % totalPhotos;
  const img = document.getElementById('lightbox-img');
  if (img) img.src = `Foto${currentLightboxIndex + 1}.jpg`;
}

// ===== COPY REKENING =====
function copyRek(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} berhasil disalin ✓`);
  }).catch(() => {
    // Fallback
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(`${label} berhasil disalin ✓`);
  });
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== ESCAPE HTML =====
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ===== WISHES - SHARED via JSONBin =====
const BIN_ID = '6a01fd3bc0954111d80a5992';
const API_KEY = '$2a$10$pMgmo/J9/toX3b3vmuGOROWMlo.aNll0p4Onhy4K2fmb8Li.YD80a';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

async function loadWishes() {
  const container = document.getElementById('wishes-list');
  if (!container) return;

  try {
    const res = await fetch(BIN_URL + '/latest', {
      headers: { 'X-Access-Key': API_KEY }
    });
    const data = await res.json();
    const wishes = Array.isArray(data.record) ? data.record : [];
    renderWishes(wishes, container);
  } catch {
    container.innerHTML = `<p style="text-align:center; color:rgba(201,168,76,0.4); font-style:italic; font-family:'Cormorant Garamond',serif;">Jadilah yang pertama memberikan ucapan...</p>`;
  }
}

function renderWishes(wishes, container) {
  if (!wishes || wishes.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:rgba(201,168,76,0.4); font-style:italic; font-family:'Cormorant Garamond',serif;">Jadilah yang pertama memberikan ucapan...</p>`;
    return;
  }
  container.innerHTML = wishes.slice().reverse().map(w => `
    <div class="wish-item">
      <div class="wish-header">
        <span class="wish-name">${escapeHtml(w.name)}</span>
        <span class="wish-attendance ${w.attendance === 'Hadir' ? 'hadir' : w.attendance === 'Tidak Hadir' ? 'tidak' : 'mungkin'}">${escapeHtml(w.attendance)}</span>
      </div>
      <p class="wish-text">"${escapeHtml(w.message)}"</p>
      <span class="wish-time">${w.time}</span>
    </div>
  `).join('');
}

async function submitWish() {
  const nameEl = document.getElementById('wish-name');
  const msgEl = document.getElementById('wish-message');
  const attendEl = document.getElementById('wish-attendance');
  const btn = document.getElementById('wish-submit');

  const name = nameEl?.value.trim();
  const message = msgEl?.value.trim();
  const attendance = attendEl?.value || 'Mungkin';

  if (!name || !message) { showToast('Mohon isi nama dan ucapan Anda ✦'); return; }
  if (btn) { btn.disabled = true; btn.textContent = 'Mengirim...'; }

  const newWish = {
    name,
    message,
    attendance,
    time: new Date().toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  };

  try {
    // Ambil data lama dulu
    const res = await fetch(BIN_URL + '/latest', {
      headers: { 'X-Access-Key': API_KEY }
    });
    const data = await res.json();
    const wishes = Array.isArray(data.record) ? data.record : [];

    // Tambahkan ucapan baru
    wishes.push(newWish);

    // Simpan kembali
    await fetch(BIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': API_KEY
      },
      body: JSON.stringify(wishes)
    });

    if (nameEl) nameEl.value = '';
    if (msgEl) msgEl.value = '';
    setTimeout(async () => {
      await loadWishes();
    }, 1000);
    showToast('Ucapan Anda telah terkirim ♥');
  } catch {
    showToast('Gagal mengirim, coba lagi ✦');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Kirim Ucapan'; }
  }
}

// ===== SCROLL TO SECTION =====
function scrollDown() {
  const verse = document.getElementById('verse');
  if (verse) verse.scrollIntoView({ behavior: 'smooth' });
}

// ===== KEYBOARD LIGHTBOX =====
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initOpening();
  initSnow();
  initDoves();
  initScrollAnimations();
  initCountdown();
  loadWishes();

  // Reload wishes every 30 seconds
  setInterval(loadWishes, 30000);

  // Fadeout animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
    @keyframes flipNum { 0% { transform: translateY(-10px); opacity: 0; } 100% { transform: none; opacity: 1; } }
  `;
  document.head.appendChild(style);
});
