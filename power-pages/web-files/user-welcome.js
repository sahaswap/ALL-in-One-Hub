document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-user-display-name]').forEach(function (target) {
    var name = target.getAttribute('data-user-name') || '';

    if (!name && window.portalUser && window.portalUser.fullname) {
      name = window.portalUser.fullname;
    }

    if (!name && window.Microsoft && window.Microsoft.Dynamic365 && window.Microsoft.Dynamic365.PortalUser) {
      name = window.Microsoft.Dynamic365.PortalUser.fullname || window.Microsoft.Dynamic365.PortalUser.name || '';
    }

    if (name.trim()) {
      target.textContent = ', ' + name.trim();
    }
  });
});
