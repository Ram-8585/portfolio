// ===== Portfolio interactions =====

// 1. Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuBtn.classList.toggle('open');
});

// Close the mobile menu when a link is tapped
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.classList.remove('open');
  });
});

// 2. Scroll-reveal animations (IntersectionObserver adds .visible when a section enters view)
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 3. Highlight the nav link for the section currently in view
const sections = document.querySelectorAll('.section, .hero');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id)
        );
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));

// 4. Back-to-top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 600);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 5. Footer year (always current, no manual updates)
document.getElementById('year').textContent = new Date().getFullYear();
