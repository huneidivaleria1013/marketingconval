// ── FADE-UP ANIMATIONS ──
// Staggered delays via CSS custom property --d (set inline on elements)
const applyDelay = (el) => {
  const d = el.style.getPropertyValue('--d') || '0ms';
  el.style.transitionDelay = d;
};

// Hero: trigger immediately on load
const heroEls = document.querySelectorAll('.hero-left .fade-up, .hero-right .fade-up');
heroEls.forEach(el => {
  applyDelay(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
});

// All other fade-up elements: trigger on scroll into view
const scrollEls = document.querySelectorAll('.fade-up:not(.visible)');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      applyDelay(entry.target);
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

scrollEls.forEach(el => observer.observe(el));

// ── TOPBAR SCROLL SHADOW ──
const topbar = document.querySelector('.topbar');
if (topbar) {
  window.addEventListener('scroll', () => {
    topbar.style.boxShadow = window.scrollY > 8
      ? '0 1px 24px rgba(0,0,0,0.07)'
      : 'none';
  }, { passive: true });
}
