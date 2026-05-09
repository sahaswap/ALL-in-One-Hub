document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-org-search-form]').forEach(function (form) {
    var input = form.querySelector('[data-org-search-input]');
    var feedback = document.querySelector('[data-org-search-feedback]');
    var panels = Array.prototype.slice.call(document.querySelectorAll('.page-panel'));
    var cards = Array.prototype.slice.call(document.querySelectorAll('.pod-card'));

    if (!input || !cards.length) {
      return;
    }

    function clearMatches() {
      cards.forEach(function (card) {
        card.classList.remove('is-search-match');
        card.hidden = false;
        card.querySelectorAll('.is-search-match').forEach(function (item) {
          item.classList.remove('is-search-match');
        });
      });
      panels.forEach(function (panel) {
        panel.hidden = false;
      });
    }

    function updateFeedback(message) {
      if (feedback) {
        feedback.textContent = message;
      }
    }

    function getPodName(card) {
      var podId = card.querySelector('.pod-id');
      var podLead = card.querySelector('.pod-lead');
      return [podId ? podId.textContent.trim() : '', podLead ? podLead.textContent.trim() : ''].filter(Boolean).join(' — ');
    }

    function runSearch() {
      var query = input.value.trim().toLowerCase();
      var matches = [];

      if (!query) {
        clearMatches();
        updateFeedback('Search a name to locate the POD it belongs to.');
        return;
      }

      cards.forEach(function (card) {
        var cardMatches = card.textContent.toLowerCase().indexOf(query) !== -1;
        card.hidden = !cardMatches;
        card.classList.toggle('is-search-match', cardMatches);

        card.querySelectorAll('.pod-id, .pod-lead, .pod-member').forEach(function (item) {
          item.classList.toggle('is-search-match', item.textContent.toLowerCase().indexOf(query) !== -1);
        });

        if (cardMatches) {
          matches.push(card);
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = !panel.querySelector('.pod-card:not([hidden])');
      });

      if (!matches.length) {
        updateFeedback('No POD found for “' + input.value.trim() + '”.');
        return;
      }

      if (matches.length === 1) {
        updateFeedback('Showing ' + getPodName(matches[0]) + ' for “' + input.value.trim() + '”.');
        return;
      }

      updateFeedback('Showing ' + matches.length + ' PODs for “' + input.value.trim() + '”.');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      runSearch();
    });

    input.addEventListener('input', runSearch);
    runSearch();
  });
});
