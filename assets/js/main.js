/**
 * Groves Electric — Main JavaScript
 * Features: Scroll animations, year, active nav
 */

'use strict';

// ---- Current Year in Footer ----
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ---- Scroll Animations (Intersection Observer) ----
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('[data-animate]').forEach(el => {
  animateObserver.observe(el);
});

// ---- Active Nav Link (scroll-based for index.html) ----
function setActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    } else if (link.getAttribute('aria-current') === 'page' && href !== currentPath) {
      // Don't remove if already set in HTML for this page
    }
  });
}
setActiveNav();

// ---- Navbar scroll shadow enhancement ----
const navbar = document.querySelector('.navbar');
if (navbar) {
  let lastScrollY = 0;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 10) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ---- Phone link tracking (console log for analytics hook) ----
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Phone call initiated:', link.href);
    // Add analytics tracking here (e.g., gtag event)
  });
});