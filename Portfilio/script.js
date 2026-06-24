// ============================================
//  AFTAB RAZA — PORTFOLIO SCRIPT
// ============================================


// ── 1. TYPEWRITER EFFECT (Hero section) ──
const roles = [
  "Web Developer",
  "Frontend Developer",
  "BCA Student",
  "Quick Learner",
  "AI Enthusiast"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Type characters
    typeEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // Pause then start deleting
      setTimeout(() => { isDeleting = true; typeWriter(); }, 1800);
      return;
    }
  } else {
    // Delete characters
    typeEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeWriter, speed);
}

typeWriter();


// ── 2. NAVBAR — shrink on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ── 3. HAMBURGER MENU (mobile) ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ── 4. ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= offset && scrollY < offset + height) {
        link.style.color = 'var(--orange)';
      } else {
        link.style.color = '';
      }
    }
  });
});


// ── 5. SCROLL REVEAL ANIMATION ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Apply to cards
document.querySelectorAll('.skill-card, .project-card, .info-card, .stat-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease';
  observer.observe(el);
});


// ── 6. CONTACT FORM ──
// Note: Ye form EmailJS ya Formspree se connect kar sakte ho
// Abhi ye simulation hai — real emails ke liye README padho
function sendMessage() {
  const name    = document.getElementById('formName').value.trim();
  const email   = document.getElementById('formEmail').value.trim();
  const subject = document.getElementById('formSubject').value.trim();
  const message = document.getElementById('formMessage').value.trim();
  const status  = document.getElementById('formStatus');

  // Basic validation
  if (!name || !email || !message) {
    status.style.color = '#ff4444';
    status.textContent = '⚠️ Please fill all required fields.';
    return;
  }

  if (!email.includes('@')) {
    status.style.color = '#ff4444';
    status.textContent = '⚠️ Please enter a valid email.';
    return;
  }

  // Simulate send (replace with EmailJS or Formspree for real emails)
  status.style.color = 'var(--orange)';
  status.textContent = '✅ Message sent! I\'ll get back to you soon.';

  // Clear form
  document.getElementById('formName').value    = '';
  document.getElementById('formEmail').value   = '';
  document.getElementById('formSubject').value = '';
  document.getElementById('formMessage').value = '';

  setTimeout(() => { status.textContent = ''; }, 4000);
}