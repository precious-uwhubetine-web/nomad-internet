document.addEventListener("DOMContentLoaded", function() {
  const menuButton = document.getElementById('remote-worker-membership-bundle-header-content-menu-button');
  const mobileMenu = document.getElementById('remote-worker-membership-bundle-header-mobile-menu');

  const closeIcon = document.getElementById('remote-worker-membership-bundle-header-mobile-menu-close-icon');
  const hamburgerIcon = document.getElementById('remote-worker-membership-bundle-header-mobile-menu-hamburger-icon');

  menuButton.addEventListener('click', function() {
    if (mobileMenu.style.display === 'flex') {
      mobileMenu.style.display = 'none';
      hamburgerIcon.style.display = 'inline';
      closeIcon.style.display = 'none';
    } else {
      mobileMenu.style.display = 'flex';
      hamburgerIcon.style.display = 'none';
      closeIcon.style.display = 'inline';
    }
  });
});

window.addEventListener("resize", function() {
  const mobileMenu = document.getElementById('remote-worker-membership-bundle-header-mobile-menu');
  if (window.innerWidth > 768) {
    mobileMenu.style.display = 'none';
    const hamburgerIcon = document.getElementById('remote-worker-membership-bundle-header-mobile-menu-hamburger-icon');
    const closeIcon = document.getElementById('remote-worker-membership-bundle-header-mobile-menu-close-icon');
    hamburgerIcon.style.display = 'inline';
    closeIcon.style.display = 'none';
  }
});
