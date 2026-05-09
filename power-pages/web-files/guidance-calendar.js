document.addEventListener('DOMContentLoaded', function () {
  var guidanceModal = document.querySelector('[data-guidance-modal]');
  var guidanceCloseButton = document.querySelector('[data-guidance-close]');
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function closeGuidanceModal() {
    if (!guidanceModal) {
      return;
    }

    guidanceModal.hidden = true;
    document.body.style.overflow = '';
  }

  function openGuidanceModal(guidance) {
    if (!guidanceModal) {
      return;
    }

    var title = guidanceModal.querySelector('[data-guidance-modal-title]');
    var date = guidanceModal.querySelector('[data-guidance-modal-date]');
    var owner = guidanceModal.querySelector('[data-guidance-modal-owner]');
    var body = guidanceModal.querySelector('[data-guidance-modal-body]');

    if (title) {
      title.textContent = guidance.title || '';
    }

    if (date) {
      date.textContent = guidance.displayDate || '';
    }

    if (owner) {
      owner.textContent = 'Owner: ' + (guidance.owner || '');
    }

    if (body) {
      body.textContent = guidance.fullGuidance || guidance.summary || '';
    }

    guidanceModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  if (guidanceCloseButton) {
    guidanceCloseButton.addEventListener('click', closeGuidanceModal);
  }

  if (guidanceModal) {
    guidanceModal.addEventListener('click', function (event) {
      if (event.target === guidanceModal) {
        closeGuidanceModal();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeGuidanceModal();
    }
  });

  function parseCsv(csv) {
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;

    for (var index = 0; index < csv.length; index += 1) {
      var char = csv[index];
      var nextChar = csv[index + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(field);
        field = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          index += 1;
        }
        row.push(field);
        if (row.some(function (value) { return value.trim() !== ''; })) {
          rows.push(row);
        }
        row = [];
        field = '';
      } else {
        field += char;
      }
    }

    if (field || row.length) {
      row.push(field);
      rows.push(row);
    }

    if (!rows.length) {
      return [];
    }

    var headers = rows.shift().map(function (header) {
      return header.trim();
    });

    return rows.map(function (values) {
      return headers.reduce(function (record, header, index) {
        record[header] = values[index] ? values[index].trim() : '';
        return record;
      }, {});
    });
  }

  function parseLocalDate(value) {
    var parts = value.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function formatDisplayDate(date) {
    return monthNames[date.getMonth()] + ' ' + String(date.getDate()).padStart(2, '0') + ', ' + date.getFullYear();
  }

  function formatIsoDate(date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-');
  }

  function getWeekStart(date) {
    var weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    return weekStart;
  }

  function uniqueValues(values) {
    return Array.from(new Set(values));
  }

  function setOptions(select, options, value) {
    select.innerHTML = '';
    options.forEach(function (option) {
      var element = document.createElement('option');
      element.value = option.value;
      element.textContent = option.label;
      select.appendChild(element);
    });
    select.value = value;
  }

  function getFilteredGuidance(records, filters) {
    return records.filter(function (record) {
      var matchesYear = !filters.year || record.year === filters.year;
      var matchesMonth = !filters.month || record.month === filters.month;
      var matchesWeek = !filters.week || record.weekStart === filters.week;
      return matchesYear && matchesMonth && matchesWeek;
    });
  }

  function createGuidanceItem(record) {
    var button = document.createElement('button');
    button.className = 'guidance-update-item';
    button.type = 'button';

    var date = document.createElement('span');
    date.className = 'doc-type';
    date.textContent = record.displayDate;

    var title = document.createElement('h4');
    title.className = 'card-title';
    title.textContent = record.title;

    var summary = document.createElement('p');
    summary.className = 'card-text';
    summary.textContent = record.summary;

    var meta = document.createElement('div');
    meta.className = 'doc-meta';
    var owner = document.createElement('span');
    owner.textContent = 'Owner: ' + record.owner;
    var status = document.createElement('span');
    status.textContent = 'Status: ' + record.status;
    meta.append(owner, status);

    button.append(date, title, summary, meta);
    button.addEventListener('click', function () {
      openGuidanceModal(record);
    });

    return button;
  }

  function openGuidanceRecords(records) {
    if (records.length === 1) {
      openGuidanceModal(records[0]);
      return;
    }

    openGuidanceModal({
      title: records.length + ' guidance updates',
      displayDate: records[0].displayDate,
      owner: 'Multiple owners',
      fullGuidance: records.map(function (record) {
        return record.title + '\n' + record.fullGuidance;
      }).join('\n\n')
    });
  }

  function initGuidanceCalendar(section) {
    var source = section.getAttribute('data-guidance-source');
    var yearSelect = section.querySelector('[data-guidance-year]');
    var monthSelect = section.querySelector('[data-guidance-month]');
    var weekSelect = section.querySelector('[data-guidance-week]');
    var title = section.querySelector('[data-guidance-calendar-title]');
    var grid = section.querySelector('[data-guidance-month-grid]');
    var resultsTitle = section.querySelector('[data-guidance-results-title]');
    var results = section.querySelector('[data-guidance-results]');
    var previous = section.querySelector('[data-guidance-prev]');
    var next = section.querySelector('[data-guidance-next]');
    var records = [];
    var calendarDate = new Date();
    var selectedDate = '';

    if (!source || !yearSelect || !monthSelect || !weekSelect || !grid || !results) {
      return;
    }

    function getFilters() {
      return {
        year: yearSelect.value,
        month: monthSelect.value,
        week: weekSelect.value
      };
    }

    function populateFilters() {
      var selectedYear = yearSelect.value;
      var selectedMonth = monthSelect.value;
      var selectedWeek = weekSelect.value;
      var years = uniqueValues(records.map(function (record) { return record.year; })).sort().reverse();

      if (!selectedYear || !years.includes(selectedYear)) {
        selectedYear = years[0] || '';
      }

      var monthRecords = records.filter(function (record) {
        return record.year === selectedYear;
      });
      var months = uniqueValues(monthRecords.map(function (record) { return record.month; })).sort();
      var monthOptions = [{ value: '', label: 'All months' }].concat(months.map(function (month) {
        return { value: month, label: fullMonthNames[Number(month) - 1] };
      }));

      if (selectedMonth && !months.includes(selectedMonth)) {
        selectedMonth = '';
      }

      var weekRecords = monthRecords.filter(function (record) {
        return !selectedMonth || record.month === selectedMonth;
      });
      var weeks = uniqueValues(weekRecords.map(function (record) { return record.weekStart; })).sort().reverse();
      var weekOptions = [{ value: '', label: 'All weeks' }].concat(weeks.map(function (week) {
        return { value: week, label: 'Week of ' + formatDisplayDate(parseLocalDate(week)) };
      }));

      if (selectedWeek && !weeks.includes(selectedWeek)) {
        selectedWeek = '';
      }

      setOptions(yearSelect, years.map(function (year) {
        return { value: year, label: year };
      }), selectedYear);
      setOptions(monthSelect, monthOptions, selectedMonth);
      setOptions(weekSelect, weekOptions, selectedWeek);
    }

    function renderResults() {
      var filteredRecords = getFilteredGuidance(records, getFilters());

      if (selectedDate) {
        filteredRecords = filteredRecords.filter(function (record) {
          return record.date === selectedDate;
        });
      }

      filteredRecords.sort(function (a, b) {
        return b.sortDate - a.sortDate;
      });

      results.innerHTML = '';

      if (resultsTitle) {
        resultsTitle.textContent = filteredRecords.length + ' guidance update' + (filteredRecords.length === 1 ? '' : 's') + ' found';
      }

      if (!filteredRecords.length) {
        var empty = document.createElement('p');
        empty.className = 'card-text';
        empty.textContent = 'No guidance updates found for this selection.';
        results.appendChild(empty);
        return;
      }

      filteredRecords.forEach(function (record) {
        results.appendChild(createGuidanceItem(record));
      });
    }

    function renderCalendar() {
      var year = calendarDate.getFullYear();
      var month = calendarDate.getMonth();
      var firstDay = new Date(year, month, 1);
      var startDate = new Date(firstDay);
      var calendarRecords = getFilteredGuidance(records, getFilters());
      var recordsByDate = calendarRecords.reduce(function (groups, record) {
        groups[record.date] = groups[record.date] || [];
        groups[record.date].push(record);
        return groups;
      }, {});

      startDate.setDate(firstDay.getDate() - firstDay.getDay());

      if (title) {
        title.textContent = fullMonthNames[month] + ' ' + year;
      }

      grid.innerHTML = '';

      for (var dayIndex = 0; dayIndex < 42; dayIndex += 1) {
        var day = new Date(startDate);
        day.setDate(startDate.getDate() + dayIndex);
        var isoDate = formatIsoDate(day);
        var dayRecords = recordsByDate[isoDate] || [];
        var dayButton = document.createElement('button');

        dayButton.className = 'calendar-day';
        dayButton.type = 'button';
        dayButton.textContent = String(day.getDate());
        dayButton.dataset.hasGuidance = String(dayRecords.length > 0);

        if (day.getMonth() !== month) {
          dayButton.classList.add('is-muted');
        }

        if (selectedDate === isoDate) {
          dayButton.classList.add('is-selected');
        }

        if (dayRecords.length) {
          dayButton.setAttribute('aria-label', dayRecords.length + ' guidance update' + (dayRecords.length === 1 ? '' : 's') + ' on ' + formatDisplayDate(day));
          dayButton.addEventListener('click', function (dateValue, recordsForDate) {
            return function () {
              selectedDate = dateValue;
              renderCalendar();
              renderResults();
              openGuidanceRecords(recordsForDate);
            };
          }(isoDate, dayRecords));
        }

        grid.appendChild(dayButton);
      }
    }

    function refresh() {
      selectedDate = '';
      populateFilters();
      var filterMonth = monthSelect.value;

      if (filterMonth) {
        calendarDate = new Date(Number(yearSelect.value), Number(filterMonth) - 1, 1);
      } else {
        var filteredRecords = getFilteredGuidance(records, { year: yearSelect.value, month: '', week: weekSelect.value });
        var latest = filteredRecords.sort(function (a, b) { return b.sortDate - a.sortDate; })[0] || records[0];
        if (latest) {
          calendarDate = new Date(latest.sortDate.getFullYear(), latest.sortDate.getMonth(), 1);
        }
      }

      renderCalendar();
      renderResults();
    }

    fetch(source)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Unable to load guidance updates.');
        }
        return response.text();
      })
      .then(function (csv) {
        records = parseCsv(csv).map(function (record) {
          var date = parseLocalDate(record.date);
          return Object.assign({}, record, {
            sortDate: date,
            displayDate: formatDisplayDate(date),
            year: String(date.getFullYear()),
            month: String(date.getMonth() + 1).padStart(2, '0'),
            weekStart: formatIsoDate(getWeekStart(date))
          });
        }).filter(function (record) {
          return (record.status || '').toLowerCase() === 'published';
        }).sort(function (a, b) {
          return b.sortDate - a.sortDate;
        });

        if (records.length) {
          calendarDate = new Date(records[0].sortDate.getFullYear(), records[0].sortDate.getMonth(), 1);
        }

        refresh();
      })
      .catch(function () {
        if (title) {
          title.textContent = 'Guidance calendar unavailable';
        }
        if (resultsTitle) {
          resultsTitle.textContent = 'Unable to load updates';
        }
      });

    yearSelect.addEventListener('change', refresh);
    monthSelect.addEventListener('change', refresh);
    weekSelect.addEventListener('change', refresh);

    if (previous) {
      previous.addEventListener('click', function () {
        selectedDate = '';
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        renderCalendar();
        renderResults();
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        selectedDate = '';
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        renderCalendar();
        renderResults();
      });
    }
  }

  document.querySelectorAll('[data-guidance-calendar]').forEach(function (section) {
    initGuidanceCalendar(section);
  });
});
