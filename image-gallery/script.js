// ============================================
//  IMAGE GALLERY — script.js
//  Features: Filter, Lightbox, Search
// ============================================

// ── All cards collect karo ──
const cards      = document.querySelectorAll('.card');
const tabs       = document.querySelectorAll('.tab');
const gallery    = document.getElementById('gallery');
const emptyState = document.getElementById('emptyState');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbTitle  = document.getElementById('lbTitle');

// Visible cards track karne ke liye (lightbox prev/next ke liye)
let visibleCards = [];
let currentIndex = 0;


// ── 1. FILTER TABS ──
tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    // Active tab highlight
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');
    filterGallery(filter);
  });
});

function filterGallery(filter) {
  let count = 0;
  visibleCards = [];

  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    const match = filter === 'all' || category === filter;

    if (match) {
      card.classList.remove('hidden');
      card.classList.add('show');
      visibleCards.push(card);
      count++;
    } else {
      card.classList.add('hidden');
      card.classList.remove('show');
    }
  });

  // Empty state show/hide
  emptyState.style.display = count === 0 ? 'block' : 'none';
}

// Page load pe sab show karo
filterGallery('all');


// ── 2. LIGHTBOX ──
// Card click pe lightbox kholo
cards.forEach((card) => {
  card.addEventListener('click', () => {
    // Sirf visible cards mein se dhundho
    const idx = visibleCards.indexOf(card);
    if (idx === -1) return;
    openLightbox(idx);
  });
});

function openLightbox(index) {
  currentIndex = index;
  const card  = visibleCards[currentIndex];
  const img   = card.querySelector('img');
  const title = card.getAttribute('data-title');

  lbImg.src       = img.src.replace('w=400', 'w=800'); // badi image load karo
  lbImg.alt       = title;
  lbTitle.textContent = title;

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden'; // scroll band karo jab lightbox khula ho
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// Close button
document.getElementById('lbClose').addEventListener('click', closeLightbox);

// Background click pe band karo
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Next image
document.getElementById('lbNext').addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleCards.length;
  openLightbox(currentIndex);
});

// Previous image
document.getElementById('lbPrev').addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  openLightbox(currentIndex);
});

// Keyboard support — arrow keys se navigate karo
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
  if (e.key === 'ArrowLeft')  document.getElementById('lbPrev').click();
  if (e.key === 'Escape')     closeLightbox();
});

// Touch swipe support (mobile ke liye)
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
lightbox.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) document.getElementById('lbNext').click(); // left swipe = next
    else          document.getElementById('lbPrev').click(); // right swipe = prev
  }
});


// ── 3. SEARCH ──
const searchToggle = document.getElementById('searchToggle');
const searchBar    = document.getElementById('searchBar');
const searchInput  = document.getElementById('searchInput');

searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) {
    searchInput.focus();
  } else {
    searchInput.value = '';
    filterGallery(document.querySelector('.tab.active').getAttribute('data-filter'));
  }
});

function closeSearch() {
  searchBar.classList.remove('open');
  searchInput.value = '';
  filterGallery(document.querySelector('.tab.active').getAttribute('data-filter'));
}

// Real-time search
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  visibleCards = [];
  let count = 0;

  cards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    const match = title.includes(query);

    if (match) {
      card.classList.remove('hidden');
      card.classList.add('show');
      visibleCards.push(card);
      count++;
    } else {
      card.classList.add('hidden');
      card.classList.remove('show');
    }
  });

  emptyState.style.display = count === 0 ? 'block' : 'none';
});