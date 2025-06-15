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



// Existing year tabs code (unchanged)
  const years = [2025, 2024, 2023, 2022];
  let currentIndex = 1;
  const yearScrollbar = document.querySelector('.year-scrollbar');
  const leftArrow = document.querySelector('.year-scrollbar-arrow.left');
  const rightArrow = document.querySelector('.year-scrollbar-arrow.right');
  triggerWelcomeAnimation();

  function renderYearTabs() {
    if (!yearScrollbar) return;
    yearScrollbar.innerHTML = '';
    let visibleYears = [];
    if (years.length <= 3) {
      visibleYears = years;
    } else {
      visibleYears = currentIndex === 0 ? years.slice(0, 3) :
        currentIndex === years.length - 1 ? years.slice(-3) :
        years.slice(currentIndex - 1, currentIndex + 2);
    }
    visibleYears.forEach(y => {
      const btn = document.createElement('button');
      btn.className = 'year-tab' + (y === years[currentIndex] ? ' selected' : '');
      btn.setAttribute('data-year', y);
      btn.textContent = y;
      yearScrollbar.appendChild(btn);
    });
    if (leftArrow) leftArrow.disabled = (currentIndex === 0);
    if (rightArrow) rightArrow.disabled = (currentIndex === years.length - 1);
  }

  function updateMembersList() {
    document.querySelectorAll('.members-list').forEach(list => {
      list.classList.remove('active');
    });
    const activeList = document.querySelector(`.members-list[data-year="${years[currentIndex]}"]`);
    if (activeList) activeList.classList.add('active');
  }

  // Initial render
  renderYearTabs();
  updateMembersList();

  // Year tab interactions
  if (yearScrollbar) {
    yearScrollbar.addEventListener('click', function(e) {
      if (e.target.classList.contains('year-tab') && !e.target.classList.contains('selected')) {
        const year = Number(e.target.getAttribute('data-year'));
        currentIndex = years.indexOf(year);
        renderYearTabs();
        updateMembersList();
      }
    });
  }

  // Arrow controls
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderYearTabs();
        updateMembersList();
      }
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      if (currentIndex < years.length - 1) {
        currentIndex++;
        renderYearTabs();
        updateMembersList();
      }
    });
  }

  // Welcome animation
  function triggerWelcomeAnimation() {
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
      setTimeout(() => welcomeMessage.classList.add('loaded'), 200);
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


