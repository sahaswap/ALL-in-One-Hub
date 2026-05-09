document.addEventListener('DOMContentLoaded', function () {
  var menuButton = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-site-nav]');

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var isOpen = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!isOpen));
      menuButton.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  var cards = document.querySelectorAll('.glass-card, .resource-card, .metric-card, .document-card, .guidance-change-panel');
  cards.forEach(function (card, index) {
    card.style.setProperty('--reveal-delay', String(index * 70) + 'ms');
    card.classList.add('is-revealed');
  });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-site-nav] .nav-link[href*="#"]'));
  var sectionLinks = navLinks.map(function (link) {
    var hash = new URL(link.getAttribute('href'), window.location.href).hash;
    return {
      hash: hash,
      link: link,
      section: hash ? document.querySelector(hash) : null
    };
  }).filter(function (item) {
    return item.section;
  });

  var pageLinks = Array.prototype.slice.call(document.querySelectorAll('[data-site-nav] .nav-link:not([href*="#"])'));

  function updatePageActiveLink() {
    if (sectionLinks.length || !pageLinks.length) {
      return;
    }

    var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    pageLinks.forEach(function (link) {
      var linkPath = new URL(link.getAttribute('href'), window.location.href).pathname.replace(/\/$/, '') || '/';
      link.classList.toggle('is-active', linkPath === currentPath);
    });
  }

  function setActiveLink(hash) {
    navLinks.forEach(function (link) {
      link.classList.remove('is-active');
    });

    sectionLinks.forEach(function (item) {
      if (item.hash === hash) {
        item.link.classList.add('is-active');
      }
    });
  }

  function updateActiveLink() {
    if (!sectionLinks.length) {
      return;
    }

    var navHeight = document.querySelector('.site-nav') ? document.querySelector('.site-nav').offsetHeight : 0;
    var marker = window.scrollY + navHeight + Math.min(window.innerHeight * 0.24, 180);
    var activeHash = sectionLinks[0].hash;

    sectionLinks.forEach(function (item) {
      if (item.section.offsetTop <= marker) {
        activeHash = item.hash;
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      activeHash = sectionLinks[sectionLinks.length - 1].hash;
    }

    setActiveLink(activeHash);
  }

  updateActiveLink();
  updatePageActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink);
});
