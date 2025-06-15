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
document.addEventListener('DOMContentLoaded', function() {
    // Faculty Group Selection
    const facultyOptions = document.querySelectorAll('.faculty-tab'); // Changed to .faculty-tab
    const facultyGroups = document.querySelectorAll('.faculty-group');

    triggerWelcomeAnimation();

    facultyOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options and groups
            facultyOptions.forEach(opt => opt.classList.remove('active'));
            facultyGroups.forEach(group => group.classList.remove('active'));

            // Add active class to clicked option and corresponding group
            this.classList.add('active');
            const facultyType = this.getAttribute('data-faculty');
            document.querySelector(`.faculty-group[data-faculty="${facultyType}"]`).classList.add('active');
        });
    });

    function triggerWelcomeAnimation() {
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            setTimeout(() => {
                welcomeMessage.classList.add('loaded');
            }, 200);
        }
    }

    // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 200);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
