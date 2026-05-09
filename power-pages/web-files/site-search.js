document.addEventListener('DOMContentLoaded', function () {
  var forms = Array.prototype.slice.call(document.querySelectorAll('form.search-panel[role="search"]')).filter(function (form) {
    return !form.hasAttribute('data-org-search-form');
  });
  var pageCache = {};

  if (!forms.length) {
    return;
  }

  function normalize(value) {
    return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function isVisible(element) {
    return !element.hidden && !element.closest('[hidden]');
  }

  function cleanText(value) {
    return (value || '').replace(/\s+/g, ' ').trim();
  }

  function getTitle(element) {
    var podId = element.querySelector('.pod-id');
    var podLead = element.querySelector('.pod-lead');
    var title = element.querySelector('.card-title, .section-title, .page-title, .hero-title, .team-label, .doc-type, .eyebrow');

    if (podId || podLead) {
      return cleanText([podId ? podId.textContent : '', podLead ? podLead.textContent : ''].filter(Boolean).join(' — '));
    }

    if (title) {
      return cleanText(title.textContent);
    }

    return cleanText(element.textContent).slice(0, 72);
  }

  function getCategory(element) {
    if (element.matches('.pod-card')) {
      return 'POD Structure';
    }
    if (element.matches('.document-card')) {
      return 'Document Library';
    }
    if (element.matches('.team-card')) {
      return 'Meet the Team';
    }
    if (element.matches('.guidance-change-panel')) {
      return 'Guidance Calendar';
    }
    if (element.matches('.resource-card')) {
      return 'Resource';
    }
    return 'Page';
  }

  function getUrl(element, baseUrl) {
    var link = element.matches('a[href]') ? element : element.querySelector('a[href]');
    var section = element.id ? element : element.closest('section[id]');

    if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
      return new URL(link.getAttribute('href'), baseUrl).href;
    }

    if (section && section.id) {
      return new URL('#' + section.id, baseUrl).href;
    }

    return new URL(baseUrl).href;
  }

  function getExcerpt(text, query) {
    var clean = cleanText(text);
    var lower = clean.toLowerCase();
    var index = lower.indexOf(query.toLowerCase());
    var start = index > 42 ? index - 42 : 0;
    var excerpt = clean.slice(start, start + 170);

    if (start > 0) {
      excerpt = '…' + excerpt;
    }

    if (start + 170 < clean.length) {
      excerpt += '…';
    }

    return excerpt;
  }

  function collectRecords(root, baseUrl) {
    var selector = '.document-card, .team-card, .pod-card, .resource-card, .guidance-change-panel, section.hero, section.page-panel';
    return Array.prototype.slice.call(root.querySelectorAll(selector)).filter(function (element) {
      if (!isVisible(element)) {
        return false;
      }
      if (element.matches('section.page-panel') && element.querySelector('.document-card, .team-card, .pod-card, .resource-card')) {
        return false;
      }
      return cleanText(element.textContent).length > 24;
    }).map(function (element) {
      var text = cleanText(element.textContent);
      return {
        title: getTitle(element),
        category: getCategory(element),
        text: text,
        normalizedText: normalize(text),
        url: getUrl(element, baseUrl),
        element: root === document ? element : null
      };
    });
  }

  function getPageUrls() {
    var urls = Array.prototype.slice.call(document.querySelectorAll('[data-site-nav] .nav-link[href]')).map(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.indexOf('#') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) {
        return '';
      }
      return new URL(href, window.location.href).href.split('#')[0];
    }).filter(Boolean);

    return Array.from(new Set(urls)).filter(function (url) {
      return new URL(url).origin === window.location.origin && url !== window.location.href.split('#')[0];
    });
  }

  function fetchPageRecords(url) {
    if (pageCache[url]) {
      return pageCache[url];
    }

    pageCache[url] = fetch(url, { credentials: 'same-origin' }).then(function (response) {
      if (!response.ok) {
        return [];
      }
      return response.text();
    }).then(function (html) {
      var parsed = new DOMParser().parseFromString(html, 'text/html');
      return collectRecords(parsed, url);
    }).catch(function () {
      return [];
    });

    return pageCache[url];
  }

  function getRecords() {
    var localRecords = collectRecords(document, window.location.href);
    var pageUrls = getPageUrls();

    if (!pageUrls.length) {
      return Promise.resolve(localRecords);
    }

    return Promise.all(pageUrls.map(fetchPageRecords)).then(function (remoteGroups) {
      var allRecords = localRecords.concat.apply(localRecords, remoteGroups);
      var seen = {};
      return allRecords.filter(function (record) {
        var key = record.url + '|' + record.title + '|' + record.text.slice(0, 60);
        if (seen[key]) {
          return false;
        }
        seen[key] = true;
        return true;
      });
    });
  }

  function scoreRecord(record, query) {
    var normalizedQuery = normalize(query);
    var tokens = normalizedQuery.split(' ').filter(Boolean);
    var score = 0;

    if (!tokens.length) {
      return 0;
    }

    if (normalize(record.title).indexOf(normalizedQuery) !== -1) {
      score += 8;
    }

    if (normalize(record.category).indexOf(normalizedQuery) !== -1) {
      score += 4;
    }

    if (record.normalizedText.indexOf(normalizedQuery) !== -1) {
      score += 5;
    }

    tokens.forEach(function (token) {
      if (record.normalizedText.indexOf(token) !== -1) {
        score += 1;
      }
    });

    return score;
  }

  function ensureResults(form) {
    var panel = form.parentElement.querySelector('[data-site-search-results]');
    var feedback;
    var list;

    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'site-search-panel';
      panel.setAttribute('data-site-search-results', '');
      feedback = document.createElement('p');
      feedback.className = 'site-search-feedback';
      list = document.createElement('div');
      list.className = 'site-search-results';
      panel.append(feedback, list);
      form.insertAdjacentElement('afterend', panel);
    }

    return {
      panel: panel,
      feedback: panel.querySelector('.site-search-feedback'),
      list: panel.querySelector('.site-search-results')
    };
  }

  function renderResults(form, matches, query) {
    var ui = ensureResults(form);
    ui.list.innerHTML = '';

    if (!matches.length) {
      ui.feedback.textContent = 'No results found for “' + query + '”.';
      return;
    }

    ui.feedback.textContent = matches.length + ' result' + (matches.length === 1 ? '' : 's') + ' found for “' + query + '”.';

    matches.slice(0, 8).forEach(function (record) {
      var result = document.createElement('a');
      var category = document.createElement('span');
      var title = document.createElement('strong');
      var excerpt = document.createElement('span');

      result.className = 'site-search-result';
      result.href = record.url;
      category.className = 'site-search-category';
      category.textContent = record.category;
      title.textContent = record.title;
      excerpt.textContent = getExcerpt(record.text, query);
      result.append(category, title, excerpt);
      ui.list.appendChild(result);
    });

    if (matches[0] && matches[0].element) {
      matches[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function runSearch(form) {
    var input = form.querySelector('input[type="search"], input[name="q"]');
    var ui = ensureResults(form);
    var query = input ? input.value.trim() : '';

    if (!query) {
      ui.feedback.textContent = 'Enter a keyword to search this hub.';
      ui.list.innerHTML = '';
      return;
    }

    ui.feedback.textContent = 'Searching for “' + query + '”…';
    ui.list.innerHTML = '';

    getRecords().then(function (records) {
      var matches = records.map(function (record) {
        return Object.assign({}, record, { score: scoreRecord(record, query) });
      }).filter(function (record) {
        return record.score > 0;
      }).sort(function (a, b) {
        return b.score - a.score;
      });

      renderResults(form, matches, query);
    });
  }

  forms.forEach(function (form, index) {
    var input = form.querySelector('input[type="search"], input[name="q"]');
    var initialQuery = new URLSearchParams(window.location.search).get('q');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      runSearch(form);
    });

    if (input) {
      input.addEventListener('input', function () {
        if (!input.value.trim()) {
          ensureResults(form).panel.remove();
        }
      });

      if (index === 0 && initialQuery && !input.value) {
        input.value = initialQuery;
        runSearch(form);
      }
    }
  });
});
