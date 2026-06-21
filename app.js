/* ============================================================
   B KISHORE RAJA — Designer Portfolio — script.js
============================================================ */

'use strict';

/* ---- Credentials ---- */
const VALID_USER = 'kishore';
const VALID_PASS = 'design123';

/* ============================================================
   CANVAS BACKGROUND — floating particles
============================================================ */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.05,
      color: Math.random() > 0.5 ? '168,85,247' : Math.random() > 0.5 ? '236,72,153' : '99,102,241'
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 120 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init(); draw();
})();

/* ============================================================
   CUSTOM CURSOR
============================================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const glow   = document.getElementById('cursor-glow');
  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    if (glow)   { glow.style.left   = gx + 'px'; glow.style.top   = gy + 'px'; }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, input, textarea, select, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; cursor.style.opacity = '0.5'; }
      if (glow)   { glow.style.transform = 'translate(-50%,-50%) scale(1.5)'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.opacity = '1'; }
      if (glow)   { glow.style.transform = 'translate(-50%,-50%) scale(1)'; }
    });
  });
})();

/* ============================================================
   LOGIN LOGIC
============================================================ */
(function initLogin() {
  const loginScreen = document.getElementById('login-screen');
  const portfolio   = document.getElementById('portfolio');
  const form        = document.getElementById('login-form');
  const btn         = document.getElementById('login-btn');
  const errBox      = document.getElementById('login-error');
  const eyeBtn      = document.getElementById('eye-btn');
  const eyeOpen     = document.getElementById('eye-open');
  const eyeClosed   = document.getElementById('eye-closed');
  const guestBtn    = document.getElementById('guest-btn');
  const logoutBtn   = document.getElementById('logout-btn');
  const pwdInput    = document.getElementById('password');

  /* eye toggle */
  eyeBtn.addEventListener('click', () => {
    const isText = pwdInput.type === 'text';
    pwdInput.type = isText ? 'password' : 'text';
    eyeOpen.style.display   = isText ? 'block' : 'none';
    eyeClosed.style.display = isText ? 'none'  : 'block';
  });

  function showPortfolio() {
    loginScreen.classList.add('exit');
    setTimeout(() => {
      loginScreen.style.display = 'none';
      portfolio.style.display   = 'block';
      initPortfolio();
    }, 800);
  }

  /* form submit */
  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;

    btn.classList.add('loading');
    errBox.classList.remove('show');

    setTimeout(() => {
      btn.classList.remove('loading');
      if (user === VALID_USER && pass === VALID_PASS) {
        showPortfolio();
      } else {
        errBox.classList.add('show');
        const card = document.getElementById('login-card');
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'shake 0.4s ease';
      }
    }, 1200);
  });

  /* guest */
  guestBtn.addEventListener('click', () => showPortfolio());

  /* logout */
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      portfolio.style.display   = 'none';
      loginScreen.style.display = 'flex';
      loginScreen.classList.remove('exit');
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      errBox.classList.remove('show');
      window.scrollTo(0, 0);
    });
  }

  /* shake animation */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60%  { transform: translateX(-8px); }
      40%,80%  { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   PORTFOLIO INIT (after login)
============================================================ */
function initPortfolio() {
  initNavbar();
  initScrollSpy();
  initFadeIn();
  initCounters();
  initSkillBars();
  initProjectFilters();
  initContactForm();
  initNavToggle();
}

/* ============================================================
   NAVBAR SCROLL
============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ============================================================
   SCROLL SPY
============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}

/* ============================================================
   FADE-IN ON SCROLL
============================================================ */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ============================================================
   ANIMATED COUNTERS
============================================================ */
function initCounters() {
  const nums = document.querySelectorAll('.h-num');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const end = +el.dataset.target;
        let cur   = 0;
        const step = Math.ceil(end / 40);
        const interval = setInterval(() => {
          cur += step;
          if (cur >= end) { cur = end; clearInterval(interval); }
          el.textContent = cur;
        }, 30);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

/* ============================================================
   SKILL BARS ANIMATION
============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.sb-fill');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const w    = fill.dataset.width;
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ============================================================
   PROJECT FILTERS
============================================================ */
function initProjectFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.cat;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInCard 0.4s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   CONTACT FORM
============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const successMsg = document.getElementById('cf-success');
  const submitBtn  = document.getElementById('cf-submit-btn');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const originalText = submitBtn.querySelector('span').textContent;
    submitBtn.querySelector('span').textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.querySelector('span').textContent = originalText;
      submitBtn.disabled = false;
      successMsg.classList.add('show');
      form.reset();
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }, 1500);
  });
}

/* ============================================================
   NAV TOGGLE (mobile)
============================================================ */
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ============================================================
   SMOOTH ANCHOR SCROLL
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
