document.addEventListener("DOMContentLoaded", function () {
  const sidenav = document.getElementById('mobileSidenav');
  const overlay = document.getElementById('sidenavOverlay');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.getElementById('sidenavClose');
  const dropdownBtns = sidenav.querySelectorAll('.sidenav-dropdown-btn');

  // When opening the side nav
hamburger.addEventListener('click', function() {
  this.classList.toggle('active');
  sidenav.classList.toggle('open');
  overlay.classList.toggle('open');
});

// When closing the side nav (via overlay or close button)
function closeSidenav() {
  sidenav.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('active');
}
if (closeBtn) closeBtn.addEventListener('click', closeSidenav);
if (overlay) overlay.addEventListener('click', closeSidenav);

  // Dropdown toggling
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Collapse all first
      dropdownBtns.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.style.display = 'none';
      });
      // Expand if not already open
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.style.display = 'flex';
      }
    });
  });

  // Keyboard: ESC to close
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && sidenav.classList.contains('open')) {
      closeSidenav();
    }
  });
});
// Read More/Less for About
document.addEventListener('DOMContentLoaded', function() {
    const aboutToggle = document.getElementById('about-toggle');
    const aboutMore = document.getElementById('about-more');
    let expanded = false;

    aboutToggle.addEventListener('click', function() {
        expanded = !expanded;
        aboutMore.style.display = expanded ? 'block' : 'none';
        aboutToggle.textContent = expanded ? 'Read Less' : 'Read More';
    });

    // FAQ Animation
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = btn.closest('.faq-item');
            item.classList.toggle('open');
        });
    });

    // Marquee Pause on Hover
    const marquee = document.getElementById('marquee');
    marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.hero-dots');
    const prevBtn = document.querySelector('.hero-arrow-left');
    const nextBtn = document.querySelector('.hero-arrow-right');
    let current = 0;
    let autoScroll = true;
    let interval;
  
    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.hero-dot');
  
    function showSlide(idx) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
  
    function nextSlide() { showSlide(current + 1); }
    function prevSlide() { showSlide(current - 1); }
  
    nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
  
    function autoPlay() {
      interval = setInterval(() => { if (autoScroll) nextSlide(); }, 5000);
    }
    function resetInterval() {
      clearInterval(interval);
      autoPlay();
    }
  
    // Pause on hover
    document.querySelector('.hero-slider').addEventListener('mouseenter', () => autoScroll = false);
    document.querySelector('.hero-slider').addEventListener('mouseleave', () => autoScroll = true);
  
    autoPlay();
  });
  
