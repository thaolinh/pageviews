(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Configuration for Pageviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

const templates = require('./templates');

/**
 * Configuration for Pageviews application.
 * This includes selectors, defaults, and other constants specific to Pageviews
 * @type {Object}
 */
const config = {
  agentSelector: '#agent-select',
  chart: '.aqs-chart',
  chartLegend: templates.chartLegend,
  dateRangeSelector: '.aqs-date-range-selector',
  defaults: {
    dateRange: 'latest-20'
  },
  logarithmicCheckbox: '.logarithmic-scale-option',
  platformSelector: '#platform-select',
  projectInput: '.aqs-project-input',
  select2Input: '.aqs-select2-selector',
  validateParams: ['project', 'platform', 'agent']
};

module.exports = config;

},{"./templates":7}],2:[function(require,module,exports){
/**
 * Pageviews Analysis tool
 * @file Main file for Pageviews application
 * @author MusikAnimal, Kaldari, Marcelrf
 * @copyright 2016 MusikAnimal, Kaldari, Marcelrf
 * @license MIT License: https://opensource.org/licenses/MIT
 */

const config = require('./config');
const Pv = require('./shared/pv');
const ChartHelpers = require('./shared/chart_helpers');

/** Main PageViews class */
class PageViews extends mix(Pv).with(ChartHelpers) {
  constructor() {
    super(config);
    this.app = 'pageviews';

    this.entityInfo = false; /** let's us know if we've gotten the page info from API yet */
    this.specialRange = null;
    this.initialQuery = false;
    this.sort = 'title';
    this.direction = '-1';

    /**
     * Select2 library prints "Uncaught TypeError: XYZ is not a function" errors
     * caused by race conditions between consecutive ajax calls. They are actually
     * not critical and can be avoided with this empty function.
     */
    window.articleSuggestionCallback = $.noop;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */
  initialize() {
    this.setupDateRangeSelector();
    this.setupSelect2();
    this.setupSelect2Colors();
    this.popParams();
    this.setupListeners();
    this.updateInterAppLinks();
  }

  /**
   * Query musikanimal API to get edit data about page within date range
   * @param {Array} pages - page names
   * @returns {Deferred} Promise resolving with editing data
   */
  getEditData(pages) {
    const dfd = $.Deferred();

    if (metaRoot) {
      $.ajax({
        url: `//${ metaRoot }/article_analysis/basic_info`,
        data: {
          pages: pages.join('|'),
          project: this.project,
          start: this.daterangepicker.startDate.format('YYYY-MM-DD'),
          end: this.daterangepicker.endDate.format('YYYY-MM-DD')
        }
      }).then(data => dfd.resolve(data));
    } else {
      dfd.resolve({
        num_edits: 0,
        num_users: 0
      });
    }

    return dfd;
  }

  /**
   * Link to /langviews for given page and chosen daterange
   * @param {String} page - page title
   * @returns {String} URL
   */
  getLangviewsURL(page) {
    return `/langviews?${ $.param(this.getParams()) }&page=${ page.replace(/[&%]/g, escape).score() }`;
  }

  /**
   * Link to /redirectviews for given page and chosen daterange
   * @param {String} page - page title
   * @returns {String} URL
   */
  getRedirectviewsURL(page) {
    return `/redirectviews?${ $.param(this.getParams()) }&page=${ page.replace(/[&%]/g, escape).score() }`;
  }

  /**
   * Construct query for API based on what type of search we're doing
   * @param {Object} query - as returned from Select2 input
   * @returns {Object} query params to be handed off to API
   */
  getSearchParams(query) {
    if (this.autocomplete === 'autocomplete') {
      return {
        action: 'query',
        list: 'prefixsearch',
        format: 'json',
        pssearch: query || '',
        cirrusUseCompletionSuggester: 'yes'
      };
    } else if (this.autocomplete === 'autocomplete_redirects') {
      return {
        action: 'query',
        generator: 'prefixsearch',
        format: 'json',
        gpssearch: query || '',
        gpslimit: '10',
        redirects: 'true',
        cirrusUseCompletionSuggester: 'no'
      };
    }
  }

  /**
   * Parses the URL query string and sets all the inputs accordingly
   * Should only be called on initial page load, until we decide to support pop states (probably never)
   * @returns {null} nothing
   */
  popParams() {
    /** show loading indicator and add error handling for timeouts */
    setTimeout(this.startSpinny.bind(this)); // use setTimeout to force rendering threads to catch up

    let params = this.validateParams(this.parseQueryString('pages'));

    $(this.config.projectInput).val(params.project);
    $(this.config.platformSelector).val(params.platform);
    $(this.config.agentSelector).val(params.agent);

    this.patchUsage();
    this.validateDateRange(params);

    this.resetSelect2();

    /**
     * Sets the Select2 defaults, which triggers the Select2 listener and calls this.processInput
     * @param {Array} pages - pages to query
     * @return {null} nothing
     */
    const getPageInfoAndSetDefaults = pages => {
      this.getPageAndEditInfo(pages).then(pageInfo => {
        this.initialQuery = true;
        const normalizedPageNames = Object.keys(pageInfo);
        this.setSelect2Defaults(this.underscorePageNames(normalizedPageNames));
      });
    };

    // set up default pages if none were passed in
    if (!params.pages || !params.pages.length) {
      // only set default of Cat and Dog for enwiki
      if (this.project === 'en.wikipedia') {
        params.pages = ['Cat', 'Dog'];
        this.setInitialChartType(params.pages.length);
        getPageInfoAndSetDefaults(params.pages);
      } else {
        // leave Select2 empty and put focus on it so they can type in pages
        this.focusSelect2();
        // manually hide spinny since we aren't drawing the chart,
        // again using setTimeout to let everything catch up
        setTimeout(this.stopSpinny.bind(this));
        this.setInitialChartType();
      }
      // If there's more than 10 articles attempt to create a PagePile and open it in Massviews
    } else if (params.pages.length > 10) {
        // If a PagePile is successfully created we are redirected to Massviews and the promise is never resolved,
        //   otherwise we just take the first 10 and process as we would normally
        this.massviewsRedirectWithPagePile(params.pages).then(getPageInfoAndSetDefaults);
      } else {
        this.setInitialChartType(params.pages.length);
        getPageInfoAndSetDefaults(params.pages);
      }
  }

  /**
   * Processes Mediawiki API results into Select2 format based on settings
   * @param {Object} data - data as received from the API
   * @returns {Object} data ready to handed over to Select2
   */
  processSearchResults(data) {
    const query = data ? data.query : {};
    let results = [];

    if (!query) return { results };

    if (this.autocomplete === 'autocomplete') {
      if (query.prefixsearch.length) {
        results = query.prefixsearch.map(function (elem) {
          return {
            id: elem.title.score(),
            text: elem.title
          };
        });
      }
    } else if (this.autocomplete === 'autocomplete_redirects') {
      /** first merge in redirects */
      if (query.redirects) {
        results = query.redirects.map(red => {
          return {
            id: red.from.score(),
            text: red.from
          };
        });
      }

      Object.keys(query.pages).forEach(pageId => {
        const pageData = query.pages[pageId];
        results.push({
          id: pageData.title.score(),
          text: pageData.title
        });
      });
    }

    return { results: results };
  }

  /**
   * Get all user-inputted parameters except the pages
   * @param {boolean} [specialRange] whether or not to include the special range instead of start/end, if applicable
   * @return {Object} project, platform, agent, etc.
   */
  getParams(specialRange = true) {
    let params = {
      project: $(this.config.projectInput).val(),
      platform: $(this.config.platformSelector).val(),
      agent: $(this.config.agentSelector).val()
    };

    /**
     * Override start and end with custom range values, if configured (set by URL params or setupDateRangeSelector)
     * Valid values are those defined in config.specialRanges, constructed like `{range: 'last-month'}`,
     *   or a relative range like `{range: 'latest-N'}` where N is the number of days.
     */
    if (this.specialRange && specialRange) {
      params.range = this.specialRange.range;
    } else {
      params.start = this.daterangepicker.startDate.format('YYYY-MM-DD');
      params.end = this.daterangepicker.endDate.format('YYYY-MM-DD');
    }

    /** add autolog param only if it was passed in originally, and only if it was false (true would be default) */
    if (this.noLogScale) params.autolog = 'false';

    return params;
  }

  /**
   * Replaces history state with new URL query string representing current user input
   * Called whenever we go to update the chart
   * @returns {null} nothing
   */
  pushParams() {
    const pages = $(this.config.select2Input).select2('val') || [],
          escapedPages = pages.join('|').replace(/[&%]/g, escape);

    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, `?${ $.param(this.getParams()) }&pages=${ escapedPages }`);
    }

    $('.permalink').prop('href', `?${ $.param(this.getPermaLink()) }&pages=${ escapedPages }`);
  }

  /**
   * Sets up the article selector and adds listener to update chart
   * @returns {null} - nothing
   */
  setupSelect2() {
    const $select2Input = $(this.config.select2Input);

    let params = {
      ajax: this.getArticleSelectorAjax(),
      tags: this.autocomplete === 'no_autocomplete',
      placeholder: $.i18n('article-placeholder'),
      maximumSelectionLength: 10,
      minimumInputLength: 1
    };

    $select2Input.select2(params);
    $select2Input.on('change', this.processInput.bind(this));
    $select2Input.on('select2:open', e => {
      if ($(e.target).val() && $(e.target).val().length === 10) {
        $('.select2-search__field').one('keyup', () => {
          const message = $.i18n('massviews-notice', 10, `<strong><a href='/massviews/'>${ $.i18n('massviews') }</a></strong>`);
          this.writeMessage(message, 'info', 10000);
        });
      }
    });
  }

  /**
   * Get ajax parameters to be used in setupSelect2, based on this.autocomplete
   * @return {object|null} to be passed in as the value for `ajax` in setupSelect2
   */
  getArticleSelectorAjax() {
    if (this.autocomplete !== 'no_autocomplete') {
      /**
       * This ajax call queries the Mediawiki API for article name
       * suggestions given the search term inputed in the selector.
       * We ultimately want to make the endpoint configurable based on whether they want redirects
       */
      return {
        url: `https://${ this.project }.org/w/api.php`,
        dataType: 'jsonp',
        delay: 200,
        jsonpCallback: 'articleSuggestionCallback',
        data: search => this.getSearchParams(search.term),
        processResults: this.processSearchResults.bind(this),
        cache: true
      };
    } else {
      return null;
    }
  }

  /**
   * Calls parent setupProjectInput and updates the view if validations passed
   *   reverting to the old value if the new one is invalid
   * @returns {null} nothing
   * @override
   */
  validateProject() {
    if (super.validateProject()) {
      this.resetView(true);
      this.focusSelect2();
    }
  }

  /**
   * General place to add page-wide listeners
   * @override
   * @returns {null} - nothing
   */
  setupListeners() {
    super.setupListeners();
    $('#platform-select, #agent-select').on('change', this.processInput.bind(this));
    $('.sort-link').on('click', e => {
      const sortType = $(e.currentTarget).data('type');
      this.direction = this.sort === sortType ? -this.direction : 1;
      this.sort = sortType;
      this.updateTable();
    });
  }

  /**
   * Query the API for each page, building up the datasets and then calling renderData
   * @param {boolean} force - whether to force the chart to re-render, even if no params have changed
   * @returns {null} - nothin
   */
  processInput(force) {
    this.pushParams();

    /** prevent duplicate querying due to conflicting listeners */
    if (!force && location.search === this.params && this.prevChartType === this.chartType) {
      return;
    }

    this.params = location.search;

    const entities = $(config.select2Input).select2('val') || [];

    if (!entities.length) {
      return this.resetView();
    }

    this.setInitialChartType(entities.length);

    // clear out old error messages unless the is the first time rendering the chart
    this.clearMessages();

    this.prevChartType = this.chartType;
    this.destroyChart();
    this.startSpinny(); // show spinny and capture against fatal errors

    // We've already gotten data about the intial set of pages
    // This is because we need any page names given to be normalized when the app first loads
    if (this.initialQuery) {
      this.getPageViewsData(entities).done(xhrData => this.updateChart(xhrData));
      // set back to false so we get page and edit info for any newly entered pages
      this.initialQuery = false;
    } else {
      this.getPageAndEditInfo(entities).then(() => {
        this.getPageViewsData(entities).done(xhrData => this.updateChart(xhrData));
      });
    }
  }

  updateTable() {
    if (this.outputData.length === 1) return $('.table-view').hide();

    $('.output-list').html('');

    /** sort ascending by current sort setting */
    const datasets = this.outputData.sort((a, b) => {
      const before = this.getSortProperty(a, this.sort),
            after = this.getSortProperty(b, this.sort);

      if (before < after) {
        return this.direction;
      } else if (before > after) {
        return -this.direction;
      } else {
        return 0;
      }
    });

    $('.sort-link span').removeClass('glyphicon-sort-by-alphabet-alt glyphicon-sort-by-alphabet').addClass('glyphicon-sort');
    const newSortClassName = parseInt(this.direction, 10) === 1 ? 'glyphicon-sort-by-alphabet-alt' : 'glyphicon-sort-by-alphabet';
    $(`.sort-link--${ this.sort } span`).addClass(newSortClassName).removeClass('glyphicon-sort');

    let hasProtection = false;
    datasets.forEach((item, index) => {
      if (item.protection !== $.i18n('none')) hasProtection = true;

      $('.output-list').append(`<tr>
         <td class='table-view--color-col'>
          <span class='table-view--color-block' style="background:${ item.color }"></span>
         </td>
         <td>${ this.getPageLink(item.label) }</td>
         <td>${ this.formatNumber(item.sum) }</td>
         <td>${ this.formatNumber(item.average) }</td>
         <td>${ this.formatNumber(item.num_edits) }</td>
         <td>${ this.formatNumber(item.num_users) }</td>
         <td>${ this.formatNumber(item.length) }</td>
         <td>${ item.protection }</td>
         <td>${ this.formatNumber(item.watchers) }</td>
         <td>
          <a href="${ this.getLangviewsURL(item.label) }" target="_blank">${ $.i18n('all-languages') }</a>
          &bull;
          <a href="${ this.getRedirectviewsURL(item.label) }" target="_blank">${ $.i18n('redirects') }</a>
         </td>
         </tr>`);
    });

    // hide protection column if no pages are protected
    $('.table-view--protection').toggle(hasProtection);

    $('.table-view').show();
  }

  /**
   * Get value of given page for the purposes of column sorting in table view
   * @param  {object} item - page name
   * @param  {String} type - type of property to get
   * @return {String|Number} - value
   */
  getSortProperty(item, type) {
    switch (type) {
      case 'title':
        return item.label;
      case 'views':
        return Number(item.sum);
      case 'average':
        return Number(item.average);
      case 'edits':
        return Number(item.num_edits);
      case 'editors':
        return Number(item.num_users);
      case 'size':
        return Number(item.length);
      case 'watchers':
        return Number(item.watchers);
    }
  }

  /**
   * Get page info and editing info of given pages.
   * Also sets this.entityInfo
   * @param  {Array} pages - page names
   * @return {Deferred} Promise resolving with this.entityInfo
   */
  getPageAndEditInfo(pages) {
    const dfd = $.Deferred();

    this.getPageInfo(pages).done(data => {
      this.entityInfo = data;
      // use Object.keys(data) to get normalized page names
      this.getEditData(Object.keys(data)).done(editData => {
        for (let page in editData.pages) {
          Object.assign(this.entityInfo[page.descore()], editData.pages[page]);
        }
        dfd.resolve(this.entityInfo);
      }).fail(() => {
        dfd.resolve(this.entityInfo); // treat as if successful, simply won't show the data
      });
    }).fail(() => {
      dfd.resolve({}); // same, simply won't show the data if it failed
    });

    return dfd;
  }

  /**
   * Create a PagePile with given pages using the API and redirect to Massviews.
   * This is used when the user passes in more than 10 pages
   * @param {Array} pages - pages to convert to a PagePile and open in Massviews
   * @returns {Deferred} promise resolved only if creation of PagePile failed
   */
  massviewsRedirectWithPagePile(pages) {
    const dfd = $.Deferred();

    $.ajax({
      url: '//tools.wmflabs.org/pagepile/api.php',
      data: {
        action: 'create_pile_with_data',
        wiki: this.dbName(this.project),
        data: pages.join('\n')
      }
    }).success(pileData => {
      const params = this.getParams();
      delete params.project;
      document.location = `/massviews?overflow=1&${ $.param(params) }&source=pagepile&target=${ pileData.pile.id }`;
    }).fail(() => {
      // just grab first 10 pages and throw an error
      this.writeMessage($.i18n('auto-pagepile-error', 'PagePile', 10), 'error');
      dfd.resolve(pages.slice(0, 10));
    });

    return dfd;
  }
}

$(document).ready(() => {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new PageViews();
});

},{"./config":1,"./shared/chart_helpers":3,"./shared/pv":4}],3:[function(require,module,exports){
/**
 * @file Shared chart-specific logic
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

/**
 * Shared chart-specific logic, used in all apps except Topviews
 * @param {class} superclass - base class
 * @returns {null} class extending superclass
 */
const ChartHelpers = superclass => class extends superclass {
  constructor(appConfig) {
    super(appConfig);

    this.chartObj = null;
    this.prevChartType = null;
    this.autoChartType = true; // will become false when they manually change the chart type

    /** ensure we have a valid chart type in localStorage, result of Chart.js 1.0 to 2.0 migration */
    const storedChartType = this.getFromLocalStorage('pageviews-chart-preference');
    if (!this.config.linearCharts.includes(storedChartType) && !this.config.circularCharts.includes(storedChartType)) {
      this.setLocalStorage('pageviews-chart-preference', this.config.defaults.chartType());
    }

    // leave if there's no chart configured
    if (!this.config.chart) return;

    /** @type {Boolean} add ability to disable auto-log detection */
    this.noLogScale = location.search.includes('autolog=false');

    /** copy over app-specific chart templates */
    this.config.linearCharts.forEach(linearChart => {
      this.config.chartConfig[linearChart].opts.legendTemplate = this.config.linearLegend;
    });
    this.config.circularCharts.forEach(circularChart => {
      this.config.chartConfig[circularChart].opts.legendTemplate = this.config.circularLegend;
    });

    Object.assign(Chart.defaults.global, { animation: false, responsive: true });

    /** changing of chart types */
    $('.modal-chart-type a').on('click', e => {
      this.chartType = $(e.currentTarget).data('type');
      this.autoChartType = false;

      $('.logarithmic-scale').toggle(this.isLogarithmicCapable());
      $('.begin-at-zero').toggle(this.config.linearCharts.includes(this.chartType));

      if (this.rememberChart === 'true') {
        this.setLocalStorage('pageviews-chart-preference', this.chartType);
      }

      this.isChartApp() ? this.updateChart(this.pageViewsData) : this.renderData();
    });

    $(this.config.logarithmicCheckbox).on('click', () => {
      this.autoLogDetection = 'false';
      this.isChartApp() ? this.updateChart(this.pageViewsData) : this.renderData();
    });

    /**
     * disabled/enable begin at zero checkbox accordingly,
     * but don't update chart since the log scale value can change pragmatically and not from user input
     */
    $(this.config.logarithmicCheckbox).on('change', () => {
      $('.begin-at-zero').toggleClass('disabled', this.checked);
    });

    if (this.beginAtZero === 'true') {
      $('.begin-at-zero-option').prop('checked', true);
    }

    $('.begin-at-zero-option').on('click', () => {
      this.isChartApp() ? this.updateChart(this.pageViewsData) : this.renderData();
    });

    /** chart download listeners */
    $('.download-png').on('click', this.exportPNG.bind(this));
    $('.print-chart').on('click', this.printChart.bind(this));
  }

  /**
   * Set the default chart type or the one from localStorage, based on settings
   * @param {Number} [numDatasets] - number of datasets
   * @returns {null} nothing
   */
  setInitialChartType(numDatasets = 1) {
    if (this.rememberChart === 'true') {
      this.chartType = this.getFromLocalStorage('pageviews-chart-preference') || this.config.defaults.chartType(numDatasets);
    } else {
      this.chartType = this.config.defaults.chartType(numDatasets);
    }
  }

  /**
   * Destroy previous chart, if needed.
   * @returns {null} nothing
   */
  destroyChart() {
    if (this.chartObj) {
      this.chartObj.destroy();
      $('.chart-legend').html('');
    }
  }

  /**
   * Exports current chart data to CSV format and loads it in a new tab
   * With the prepended data:text/csv this should cause the browser to download the data
   * @returns {null} Nothing
   */
  exportCSV() {
    let csvContent = 'data:text/csv;charset=utf-8,Date,';
    let titles = [];
    let dataRows = [];
    let dates = this.getDateHeadings(false);

    // Begin constructing the dataRows array by populating it with the dates
    dates.forEach((date, index) => {
      dataRows[index] = [date];
    });

    this.chartObj.data.datasets.forEach(site => {
      // Build an array of site titles for use in the CSV header
      let siteTitle = '"' + site.label.replace(/"/g, '""') + '"';
      titles.push(siteTitle);

      // Populate the dataRows array with the data for this site
      dates.forEach((date, index) => {
        dataRows[index].push(site.data[index]);
      });
    });

    // Finish the CSV header
    csvContent = csvContent + titles.join(',') + '\n';

    // Add the rows to the CSV
    dataRows.forEach(data => {
      csvContent += data.join(',') + '\n';
    });

    this.downloadData(csvContent, 'csv');
  }

  /**
   * Exports current chart data to JSON format and loads it in a new tab
   * @returns {null} Nothing
   */
  exportJSON() {
    let data = [];

    this.chartObj.data.datasets.forEach((page, index) => {
      let entry = {
        page: page.label.replace(/"/g, '\"').replace(/'/g, "\'"),
        color: page.strokeColor,
        sum: page.sum,
        daily_average: Math.round(page.sum / this.numDaysInRange())
      };

      this.getDateHeadings(false).forEach((heading, index) => {
        entry[heading.replace(/\\/, '')] = page.data[index];
      });

      data.push(entry);
    });

    const jsonContent = 'data:text/json;charset=utf-8,' + JSON.stringify(data);
    this.downloadData(jsonContent, 'json');
  }

  /**
   * Exports current data as PNG image, opening it in a new tab
   * @returns {null} nothing
   */
  exportPNG() {
    this.downloadData(this.chartObj.toBase64Image(), 'png');
  }

  /**
   * Fills in zero value to a timeseries, see:
   * https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageview_API#Gotchas
   *
   * @param {object} data fetched from API
   * @param {moment} startDate - start date of range to filter through
   * @param {moment} endDate - end date of range
   * @returns {object} dataset with zeros where nulls where
   */
  fillInZeros(data, startDate, endDate) {
    /** Extract the dates that are already in the timeseries */
    let alreadyThere = {};
    data.items.forEach(elem => {
      let date = moment(elem.timestamp, this.config.timestampFormat);
      alreadyThere[date] = elem;
    });
    data.items = [];

    /** Reconstruct with zeros instead of nulls */
    for (let date = moment(startDate); date <= endDate; date.add(1, 'd')) {
      if (alreadyThere[date]) {
        data.items.push(alreadyThere[date]);
      } else {
        const edgeCase = date.isSame(this.config.maxDate) || date.isSame(moment(this.config.maxDate).subtract(1, 'days'));
        data.items.push({
          timestamp: date.format(this.config.timestampFormat),
          [this.isPageviews() ? 'views' : 'devices']: edgeCase ? null : 0
        });
      }
    }

    return data;
  }

  /**
   * Get data formatted for Chart.js and the legend templates
   * @param {Array} datasets - as retrieved by getPageViewsData
   * @returns {object} - ready for chart rendering
   */
  buildChartData(datasets) {
    const labels = $(this.config.select2Input).val();

    /** preserve order of datasets due to async calls */
    return datasets.map((dataset, index) => {
      /** Build the article's dataset. */
      const values = dataset.map(elem => this.isPageviews() ? elem.views : elem.devices),
            sum = values.reduce((a, b) => a + b),
            average = Math.round(sum / values.length),
            max = Math.max(...values),
            min = Math.min(...values),
            color = this.config.colors[index % 10],
            label = labels[index].descore();

      const entityInfo = this.entityInfo ? this.entityInfo[label] : {};

      dataset = Object.assign({
        label,
        data: values,
        value: sum, // duplicated because Chart.js wants a single `value` for circular charts
        sum,
        average,
        max,
        min,
        color
      }, this.config.chartConfig[this.chartType].dataset(color), entityInfo);

      if (this.isLogarithmic()) {
        dataset.data = dataset.data.map(view => view || null);
      }

      return dataset;
    });
  }

  /**
   * Get url to query the API based on app and options
   * @param {String} entity - name of entity we're querying for (page name or project name)
   * @param {moment} startDate - start date
   * @param {moment} endDate - end date
   * @return {String} the URL
   */
  getApiUrl(entity, startDate, endDate) {
    const uriEncodedEntityName = encodeURIComponent(entity);

    if (this.app === 'siteviews') {
      return this.isPageviews() ? `https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/${ uriEncodedEntityName }` + `/${ $(this.config.platformSelector).val() }/${ $(this.config.agentSelector).val() }/daily` + `/${ startDate.format(this.config.timestampFormat) }/${ endDate.format(this.config.timestampFormat) }` : `https://wikimedia.org/api/rest_v1/metrics/unique-devices/${ uriEncodedEntityName }/${ $(this.config.platformSelector).val() }/daily` + `/${ startDate.format(this.config.timestampFormat) }/${ endDate.format(this.config.timestampFormat) }`;
    } else {
      return `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${ this.project }` + `/${ $(this.config.platformSelector).val() }/${ $(this.config.agentSelector).val() }/${ uriEncodedEntityName }/daily` + `/${ startDate.format(this.config.timestampFormat) }/${ endDate.format(this.config.timestampFormat) }`;
    }
  }

  /**
   * Mother function for querying the API and processing data
   * @param  {Array}  entities - list of page names, or projects for Siteviews
   * @return {Deferred} Promise resolving with pageviews data and errors, if present
   */
  getPageViewsData(entities) {
    let dfd = $.Deferred(),
        count = 0,
        failureRetries = {},
        totalRequestCount = entities.length,
        failedEntities = [];

    /** @type {Object} everything we need to keep track of for the promises */
    let xhrData = {
      entities,
      labels: [], // Labels (dates) for the x-axis.
      datasets: [], // Data for each article timeseries
      errors: [], // Queue up errors to show after all requests have been made
      fatalErrors: [], // Unrecoverable JavaScript errors
      promises: []
    };

    const makeRequest = (entity, index) => {
      const startDate = this.daterangepicker.startDate.startOf('day'),
            endDate = this.daterangepicker.endDate.startOf('day'),
            url = this.getApiUrl(entity, startDate, endDate),
            promise = $.ajax({ url, dataType: 'json' });

      xhrData.promises.push(promise);

      promise.done(successData => {
        try {
          successData = this.fillInZeros(successData, startDate, endDate);

          xhrData.datasets.push(successData.items);

          /** fetch the labels for the x-axis on success if we haven't already */
          if (successData.items && !xhrData.labels.length) {
            xhrData.labels = successData.items.map(elem => {
              return moment(elem.timestamp, this.config.timestampFormat).format(this.dateFormat);
            });
          }
        } catch (err) {
          return xhrData.fatalErrors.push(err);
        }
      }).fail(errorData => {
        /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
        const cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend';

        if (cassandraError) {
          if (failureRetries[entity]) {
            failureRetries[entity]++;
          } else {
            failureRetries[entity] = 1;
          }

          /** maximum of 3 retries */
          if (failureRetries[entity] < 3) {
            totalRequestCount++;
            return this.rateLimit(makeRequest, this.config.apiThrottle, this)(entity, index);
          }
        }

        // remove this article from the list of entities to analyze
        xhrData.entities = xhrData.entities.filter(el => el !== entity);

        if (cassandraError) {
          failedEntities.push(entity);
        } else {
          let link = this.app === 'siteviews' ? this.getSiteLink(entity) : this.getPageLink(entity, this.project);
          xhrData.errors.push(`${ link }: ${ $.i18n('api-error', 'Pageviews API') } - ${ errorData.responseJSON.title }`);
        }
      }).always(() => {
        if (++count === totalRequestCount) {
          this.pageViewsData = xhrData;
          dfd.resolve(xhrData);

          if (failedEntities.length) {
            this.writeMessage($.i18n('api-error-timeout', '<ul>' + failedEntities.map(failedEntity => `<li>${ this.getPageLink(failedEntity, this.project.escape()) }</li>`).join('') + '</ul>'));
          }
        }
      });
    };

    entities.forEach((entity, index) => makeRequest(entity, index));

    return dfd;
  }

  /**
   * Get params needed to create a permanent link of visible data
   * @return {Object} hash of params
   */
  getPermaLink() {
    let params = this.getParams(false);
    delete params.range;
    return params;
  }

  /**
   * Are we currently in logarithmic mode?
   * @returns {Boolean} true or false
   */
  isLogarithmic() {
    return $(this.config.logarithmicCheckbox).is(':checked') && this.isLogarithmicCapable();
  }

  /**
   * Test if the current chart type supports a logarithmic scale
   * @returns {Boolean} log-friendly or not
   */
  isLogarithmicCapable() {
    return ['line', 'bar'].includes(this.chartType);
  }

  /**
   * Are we trying to show data on pageviews (as opposed to unique devices)?
   * @return {Boolean} true or false
   */
  isPageviews() {
    return this.app === 'pageviews' || $(this.config.dataSourceSelector).val() === 'pageviews';
  }

  /**
   * Are we trying to show data on pageviews (as opposed to unique devices)?
   * @return {Boolean} true or false
   */
  isUniqueDevices() {
    return !this.isPageviews();
  }

  /**
   * Print the chart!
   * @returns {null} Nothing
   */
  printChart() {
    let tab = window.open();
    tab.document.write(`<img src="${ this.chartObj.toBase64Image() }" />`);
    tab.print();
    tab.close();
  }

  /**
   * Removes chart, messages, and resets site selections
   * @param {boolean} [select2] whether or not to clear the Select2 input
   * @returns {null} nothing
   */
  resetView(select2 = false) {
    try {
      /** these can fail sometimes */
      this.destroyChart();
      if (select2) this.resetSelect2();
    } catch (e) {// nothing
    } finally {
      this.stopSpinny();
      $('.data-links').addClass('invisible');
      $(this.config.chart).hide();
      this.clearMessages();
    }
  }

  /**
   * Attempt to fine-tune the pointer detection spacing based on how cluttered the chart is
   * @returns {Number} radius
   */
  setChartPointDetectionRadius() {
    if (this.chartType !== 'line') return;

    if (this.numDaysInRange() > 50) {
      Chart.defaults.global.elements.point.hitRadius = 3;
    } else if (this.numDaysInRange() > 30) {
      Chart.defaults.global.elements.point.hitRadius = 5;
    } else if (this.numDaysInRange() > 20) {
      Chart.defaults.global.elements.point.hitRadius = 10;
    } else {
      Chart.defaults.global.elements.point.hitRadius = 30;
    }
  }

  /**
   * Determine if we should show a logarithmic chart for the given dataset, based on Theil index
   * @param  {Array} datasets - pageviews
   * @return {Boolean} yes or no
   */
  shouldBeLogarithmic(datasets) {
    if (!this.isLogarithmicCapable() || this.noLogScale) {
      return false;
    }

    let sets = [];
    // convert NaNs and nulls to zeros
    datasets.forEach(dataset => {
      sets.push(dataset.map(val => val || 0));
    });

    // overall max value
    const maxValue = Math.max(...[].concat(...sets));

    if (maxValue <= 10) return false;

    let logarithmicNeeded = false;

    sets.forEach(set => {
      set.push(maxValue);

      const sum = set.reduce((a, b) => a + b),
            average = sum / set.length;
      let theil = 0;
      set.forEach(v => theil += v ? v * Math.log(v / average) : 0);

      if (theil / sum > 0.5) {
        return logarithmicNeeded = true;
      }
    });

    return logarithmicNeeded;
  }

  /**
   * sets up the daterange selector and adds listeners
   * @returns {null} - nothing
   */
  setupDateRangeSelector() {
    super.setupDateRangeSelector();

    /** prevent duplicate setup since the list view apps also use charts */
    if (!this.isChartApp()) return;

    const dateRangeSelector = $(this.config.dateRangeSelector);

    /** the "Latest N days" links */
    $('.date-latest a').on('click', e => {
      this.setSpecialRange(`latest-${ $(e.target).data('value') }`);
    });

    dateRangeSelector.on('change', e => {
      this.setChartPointDetectionRadius();
      this.processInput();

      /** clear out specialRange if it doesn't match our input */
      if (this.specialRange && this.specialRange.value !== e.target.value) {
        this.specialRange = null;
      }
    });
  }

  /**
   * Update the chart with data provided by processInput()
   * @param {Object} xhrData - data as constructed by processInput()
   * @returns {null} - nothin
   */
  updateChart(xhrData) {
    $('.chart-legend').html(''); // clear old chart legend

    // show pending error messages if present, exiting if fatal
    if (this.showErrors(xhrData)) return;

    if (!xhrData.entities.length) {
      return this.stopSpinny();
    } else if (xhrData.entities.length === 1) {
      $('.multi-page-chart-node').hide();
    } else {
      $('.multi-page-chart-node').show();
    }

    this.outputData = this.buildChartData(xhrData.datasets, xhrData.entities);

    if (this.autoLogDetection === 'true') {
      const shouldBeLogarithmic = this.shouldBeLogarithmic(this.outputData.map(set => set.data));
      $(this.config.logarithmicCheckbox).prop('checked', shouldBeLogarithmic);
      $('.begin-at-zero').toggleClass('disabled', shouldBeLogarithmic);
    }

    let options = Object.assign({ scales: {} }, this.config.chartConfig[this.chartType].opts, this.config.globalChartOpts);

    if (this.isLogarithmic()) {
      options.scales = Object.assign({}, options.scales, {
        yAxes: [{
          type: 'logarithmic',
          ticks: {
            callback: (value, index, arr) => {
              const remain = value / Math.pow(10, Math.floor(Chart.helpers.log10(value)));

              if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                return this.formatNumber(value);
              } else {
                return '';
              }
            }
          }
        }]
      });
    }

    this.stopSpinny();

    try {
      $('.chart-container').html('').append("<canvas class='aqs-chart'>");
      this.setChartPointDetectionRadius();
      const context = $(this.config.chart)[0].getContext('2d');

      if (this.config.linearCharts.includes(this.chartType)) {
        const linearData = { labels: xhrData.labels, datasets: this.outputData };

        if (this.chartType === 'radar') {
          options.scale.ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
        } else {
          options.scales.yAxes[0].ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
        }

        this.chartObj = new Chart(context, {
          type: this.chartType,
          data: linearData,
          options
        });
      } else {
        this.chartObj = new Chart(context, {
          type: this.chartType,
          data: {
            labels: this.outputData.map(d => d.label),
            datasets: [{
              data: this.outputData.map(d => d.value),
              backgroundColor: this.outputData.map(d => d.backgroundColor),
              hoverBackgroundColor: this.outputData.map(d => d.hoverBackgroundColor),
              averages: this.outputData.map(d => d.average)
            }]
          },
          options
        });
      }
    } catch (err) {
      return this.showErrors({
        errors: [],
        fatalErrors: [err]
      });
    }

    $('.chart-legend').html(this.chartObj.generateLegend());
    $('.data-links').removeClass('invisible');

    if (this.app === 'pageviews') this.updateTable();
  }

  /**
   * Show errors built in this.processInput
   * @param {object} xhrData - as built by this.processInput, like `{ errors: [], fatalErrors: [] }`
   * @returns {boolean} whether or not fatal errors occured
   */
  showErrors(xhrData) {
    if (xhrData.fatalErrors.length) {
      this.resetView(true);
      const fatalErrors = xhrData.fatalErrors.unique();
      this.showFatalErrors(fatalErrors);

      return true;
    }

    if (xhrData.errors.length) {
      // if everything failed, reset the view, clearing out space taken up by empty chart
      if (xhrData.entities && (xhrData.errors.length === xhrData.entities.length || !xhrData.entities.length)) {
        this.resetView();
      }

      xhrData.errors.unique().forEach(error => this.writeMessage(error));
    }

    return false;
  }
};

module.exports = ChartHelpers;

},{}],4:[function(require,module,exports){
/**
 * @file Shared code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views)
 * @author MusikAnimal, Kaldari
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

const PvConfig = require('./pv_config');
const siteMap = require('./site_map');
const siteDomains = Object.keys(siteMap).map(key => siteMap[key]);

/** Pv class, contains code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views) */
class Pv extends PvConfig {
  constructor(appConfig) {
    super(appConfig);

    /** assign initial class properties */
    const defaults = this.config.defaults,
          validParams = this.config.validParams;
    this.config = Object.assign({}, this.config, appConfig);
    this.config.defaults = Object.assign({}, defaults, appConfig.defaults);
    this.config.validParams = Object.assign({}, validParams, appConfig.validParams);

    this.colorsStyleEl = undefined;
    this.storage = {}; // used as fallback when localStorage is not supported

    ['localizeDateFormat', 'numericalFormatting', 'bezierCurve', 'autocomplete', 'autoLogDetection', 'beginAtZero', 'rememberChart'].forEach(setting => {
      this[setting] = this.getFromLocalStorage(`pageviews-settings-${ setting }`) || this.config.defaults[setting];
    });
    this.setupSettingsModal();

    this.params = null;
    this.siteInfo = {};

    /** @type {null|Date} tracking of elapsed time */
    this.processStart = null;

    /** assign app instance to window for debugging on local environment */
    if (location.host === 'localhost') {
      window.app = this;
    } else {
      this.splash();
    }

    this.debug = location.search.includes('debug=true') || location.host === 'localhost';

    /** show notice if on staging environment */
    if (/-test/.test(location.pathname)) {
      const actualPathName = location.pathname.replace(/-test\/?/, '');
      this.addSiteNotice('warning', `This is a staging environment. For the actual ${ document.title },
         see <a href='${ actualPathName }'>${ location.hostname }${ actualPathName }</a>`);
    }

    /**
     * Load translations then initialize the app.
     * Each app has it's own initialize method.
     * Make sure we load 'en.json' as a fallback
     */
    let messagesToLoad = {
      [i18nLang]: `/pageviews/messages/${ i18nLang }.json`
    };
    if (i18nLang !== 'en') {
      messagesToLoad.en = '/pageviews/messages/en.json';
    }
    $.i18n({
      locale: i18nLang
    }).load(messagesToLoad).then(this.initialize.bind(this));

    /** set up toastr config. The duration may be overriden later */
    toastr.options = {
      closeButton: true,
      debug: location.host === 'localhost',
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '3000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
      toastClass: 'alert',
      iconClasses: {
        error: 'alert-danger',
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning'
      }
    };
  }

  /**
   * Add a site notice (Bootstrap alert)
   * @param {String} level - one of 'success', 'info', 'warning' or 'error'
   * @param {String} message - message to show
   * @param {String} [title] - will appear in bold and in front of the message
   * @param {Boolean} [dismissable] - whether or not to add a X
   *   that allows the user to dismiss the notice
   * @returns {null} nothing
   */
  addSiteNotice(level, message, title, dismissable) {
    title = title ? `<strong>${ title }</strong> ` : '';

    let markup = title + message;

    this.writeMessage(markup, level, dismissable ? 10000 : 0);
  }

  /**
   * Add site notice for invalid parameter
   * @param {String} param - name of parameter
   * @returns {null} nothing
   */
  addInvalidParamNotice(param) {
    const docLink = `<a href='/${ this.app }/url_structure'>${ $.i18n('documentation') }</a>`;
    this.addSiteNotice('error', $.i18n('param-error-3', param, docLink), $.i18n('invalid-params'), true);
  }

  /**
   * Validate the date range of given params
   *   and throw errors as necessary and/or set defaults
   * @param {Object} params - as returned by this.parseQueryString()
   * @returns {Boolean} true if there were no errors, false otherwise
   */
  validateDateRange(params) {
    if (params.range) {
      if (!this.setSpecialRange(params.range)) {
        this.addInvalidParamNotice('range');
        this.setSpecialRange(this.config.defaults.dateRange);
      }
    } else if (params.start) {
      const dateRegex = /\d{4}-\d{2}-\d{2}$/;

      // first set defaults
      let startDate, endDate;

      // then check format of start and end date
      if (params.start && dateRegex.test(params.start)) {
        startDate = moment(params.start);
      } else {
        this.addInvalidParamNotice('start');
        return false;
      }
      if (params.end && dateRegex.test(params.end)) {
        endDate = moment(params.end);
      } else {
        this.addInvalidParamNotice('end');
        return false;
      }

      // check if they are outside the valid range or if in the wrong order
      if (startDate < this.config.minDate || endDate < this.config.minDate) {
        this.addSiteNotice('error', $.i18n('param-error-1', moment(this.config.minDate).format(this.dateFormat)), $.i18n('invalid-params'), true);
        return false;
      } else if (startDate > endDate) {
        this.addSiteNotice('error', $.i18n('param-error-2'), $.i18n('invalid-params'), true);
        return false;
      }

      /** directly assign startDate before calling setEndDate so events will be fired once */
      this.daterangepicker.startDate = startDate;
      this.daterangepicker.setEndDate(endDate);
    } else {
      this.setSpecialRange(this.config.defaults.dateRange);
    }

    return true;
  }

  clearSiteNotices() {
    $('.site-notice').html('');
  }

  clearMessages() {
    $('.message-container').html('');
  }

  /**
   * Get date format to use based on settings
   * @returns {string} date format to passed to parser
   */
  get dateFormat() {
    if (this.localizeDateFormat === 'true') {
      return this.getLocaleDateString();
    } else {
      return this.config.defaults.dateFormat;
    }
  }

  /**
   * Get the daterangepicker instance. Plain and simple.
   * @return {Object} daterange picker
   */
  get daterangepicker() {
    return $(this.config.dateRangeSelector).data('daterangepicker');
  }

  /**
   * Get the database name of the given projet
   * @param  {String} project - with or without .org
   * @return {String} database name
   */
  dbName(project) {
    return Object.keys(siteMap).find(key => siteMap[key] === `${ project.replace(/\.org$/, '') }.org`);
  }

  /**
   * Force download of given data, or open in a new tab if HTML5 <a> download attribute is not supported
   * @param {String} data - Raw data prepended with data type, e.g. "data:text/csv;charset=utf-8,my data..."
   * @param {String} extension - the file extension to use
   * @returns {null} Nothing
   */
  downloadData(data, extension) {
    const encodedUri = encodeURI(data);

    // create HTML5 download element and force click so we can specify a filename
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body

      const filename = `${ this.getExportFilename() }.${ extension }`;
      link.download = filename;
      link.href = encodedUri;
      link.click();

      document.body.removeChild(link); // remove the link when done
    } else {
        window.open(encodedUri); // open in new tab if download isn't supported (*cough* Safari)
      }
  }

  /**
   * Fill in values within settings modal with what's in the session object
   * @returns {null} nothing
   */
  fillInSettings() {
    $.each($('#settings-modal input'), (index, el) => {
      if (el.type === 'checkbox') {
        el.checked = this[el.name] === 'true';
      } else {
        el.checked = this[el.name] === el.value;
      }
    });
  }

  /**
   * Add focus to Select2 input field
   * @returns {null} nothing
   */
  focusSelect2() {
    $('.select2-selection').trigger('click');
    $('.select2-search__field').focus();
  }

  /**
   * Format number based on current settings, e.g. localize with comma delimeters
   * @param {number|string} num - number to format
   * @returns {string} formatted number
   */
  formatNumber(num) {
    const numericalFormatting = this.getFromLocalStorage('pageviews-settings-numericalFormatting') || this.config.defaults.numericalFormatting;
    if (numericalFormatting === 'true') {
      return this.n(num);
    } else {
      return num;
    }
  }

  formatYAxisNumber(num) {
    if (num % 1 === 0) {
      return this.formatNumber(num);
    } else {
      return null;
    }
  }

  /**
   * Gets the date headings as strings - i18n compliant
   * @param {boolean} localized - whether the dates should be localized per browser language
   * @returns {Array} the date headings as strings
   */
  getDateHeadings(localized) {
    const dateHeadings = [],
          endDate = moment(this.daterangepicker.endDate).add(1, 'd');

    for (let date = moment(this.daterangepicker.startDate); date.isBefore(endDate); date.add(1, 'd')) {
      if (localized) {
        dateHeadings.push(date.format(this.dateFormat));
      } else {
        dateHeadings.push(date.format('YYYY-MM-DD'));
      }
    }
    return dateHeadings;
  }

  /**
   * Get the explanded wiki URL given the page name
   * This should be used instead of getPageURL when you want to chain query string parameters
   *
   * @param {string} page name
   * @returns {string} URL for the page
   */
  getExpandedPageURL(page) {
    return `//${ this.project }.org/w/index.php?title=${ encodeURIComponent(page.score()).replace(/'/, escape) }`;
  }

  /**
   * Get informative filename without extension to be used for export options
   * @return {string} filename without an extension
   */
  getExportFilename() {
    const startDate = this.daterangepicker.startDate.startOf('day').format('YYYYMMDD'),
          endDate = this.daterangepicker.endDate.startOf('day').format('YYYYMMDD');
    return `${ this.app }-${ startDate }-${ endDate }`;
  }

  /**
   * Get a full link for the given page and project
   * @param  {string} page - page to link to
   * @param  {string} [project] - project link, defaults to `this.project`
   * @return {string} HTML markup
   */
  getPageLink(page, project) {
    return `<a target="_blank" href="${ this.getPageURL(page, project) }">${ page.descore().escape() }</a>`;
  }

  /**
   * Get the wiki URL given the page name
   *
   * @param {string} page - page name
   * @returns {string} URL for the page
   */
  getPageURL(page, project = this.project) {
    return `//${ project.replace(/\.org$/, '').escape() }.org/wiki/${ page.score().replace(/'/, escape) }`;
  }

  /**
   * Get the wiki URL given the page name
   *
   * @param {string} site - site name (e.g. en.wikipedia.org)
   * @returns {string} URL for the site
   */
  getSiteLink(site) {
    return `<a target="_blank" href="//${ site }.org">${ site }</a>`;
  }

  /**
   * Get the project name (without the .org)
   *
   * @returns {boolean} lang.projectname
   */
  get project() {
    const project = $(this.config.projectInput).val();
    /** Get the first 2 characters from the project code to get the language */
    return project ? project.toLowerCase().replace(/.org$/, '') : null;
  }

  getLocaleDateString() {
    if (!navigator.language) {
      return this.config.defaults.dateFormat;
    }

    const formats = {
      'ar-sa': 'DD/MM/YY',
      'bg-bg': 'DD.M.YYYY',
      'ca-es': 'DD/MM/YYYY',
      'zh-tw': 'YYYY/M/D',
      'cs-cz': 'D.M.YYYY',
      'da-dk': 'DD-MM-YYYY',
      'de-de': 'DD.MM.YYYY',
      'el-gr': 'D/M/YYYY',
      'en-us': 'M/D/YYYY',
      'fi-fi': 'D.M.YYYY',
      'fr-fr': 'DD/MM/YYYY',
      'he-il': 'DD/MM/YYYY',
      'hu-hu': 'YYYY. MM. DD.',
      'is-is': 'D.M.YYYY',
      'it-it': 'DD/MM/YYYY',
      'ja-jp': 'YYYY/MM/DD',
      'ko-kr': 'YYYY-MM-DD',
      'nl-nl': 'D-M-YYYY',
      'nb-no': 'DD.MM.YYYY',
      'pl-pl': 'YYYY-MM-DD',
      'pt-br': 'D/M/YYYY',
      'ro-ro': 'DD.MM.YYYY',
      'ru-ru': 'DD.MM.YYYY',
      'hr-hr': 'D.M.YYYY',
      'sk-sk': 'D. M. YYYY',
      'sq-al': 'YYYY-MM-DD',
      'sv-se': 'YYYY-MM-DD',
      'th-th': 'D/M/YYYY',
      'tr-tr': 'DD.MM.YYYY',
      'ur-pk': 'DD/MM/YYYY',
      'id-id': 'DD/MM/YYYY',
      'uk-ua': 'DD.MM.YYYY',
      'be-by': 'DD.MM.YYYY',
      'sl-si': 'D.M.YYYY',
      'et-ee': 'D.MM.YYYY',
      'lv-lv': 'YYYY.MM.DD.',
      'lt-lt': 'YYYY.MM.DD',
      'fa-ir': 'MM/DD/YYYY',
      'vi-vn': 'DD/MM/YYYY',
      'hy-am': 'DD.MM.YYYY',
      'az-latn-az': 'DD.MM.YYYY',
      'eu-es': 'YYYY/MM/DD',
      'mk-mk': 'DD.MM.YYYY',
      'af-za': 'YYYY/MM/DD',
      'ka-ge': 'DD.MM.YYYY',
      'fo-fo': 'DD-MM-YYYY',
      'hi-in': 'DD-MM-YYYY',
      'ms-my': 'DD/MM/YYYY',
      'kk-kz': 'DD.MM.YYYY',
      'ky-kg': 'DD.MM.YY',
      'sw-ke': 'M/d/YYYY',
      'uz-latn-uz': 'DD/MM YYYY',
      'tt-ru': 'DD.MM.YYYY',
      'pa-in': 'DD-MM-YY',
      'gu-in': 'DD-MM-YY',
      'ta-in': 'DD-MM-YYYY',
      'te-in': 'DD-MM-YY',
      'kn-in': 'DD-MM-YY',
      'mr-in': 'DD-MM-YYYY',
      'sa-in': 'DD-MM-YYYY',
      'mn-mn': 'YY.MM.DD',
      'gl-es': 'DD/MM/YY',
      'kok-in': 'DD-MM-YYYY',
      'syr-sy': 'DD/MM/YYYY',
      'dv-mv': 'DD/MM/YY',
      'ar-iq': 'DD/MM/YYYY',
      'zh-cn': 'YYYY/M/D',
      'de-ch': 'DD.MM.YYYY',
      'en-gb': 'DD/MM/YYYY',
      'es-mx': 'DD/MM/YYYY',
      'fr-be': 'D/MM/YYYY',
      'it-ch': 'DD.MM.YYYY',
      'nl-be': 'D/MM/YYYY',
      'nn-no': 'DD.MM.YYYY',
      'pt-pt': 'DD-MM-YYYY',
      'sr-latn-cs': 'D.M.YYYY',
      'sv-fi': 'D.M.YYYY',
      'az-cyrl-az': 'DD.MM.YYYY',
      'ms-bn': 'DD/MM/YYYY',
      'uz-cyrl-uz': 'DD.MM.YYYY',
      'ar-eg': 'DD/MM/YYYY',
      'zh-hk': 'D/M/YYYY',
      'de-at': 'DD.MM.YYYY',
      'en-au': 'D/MM/YYYY',
      'es-es': 'DD/MM/YYYY',
      'fr-ca': 'YYYY-MM-DD',
      'sr-cyrl-cs': 'D.M.YYYY',
      'ar-ly': 'DD/MM/YYYY',
      'zh-sg': 'D/M/YYYY',
      'de-lu': 'DD.MM.YYYY',
      'en-ca': 'DD/MM/YYYY',
      'es-gt': 'DD/MM/YYYY',
      'fr-ch': 'DD.MM.YYYY',
      'ar-dz': 'DD-MM-YYYY',
      'zh-mo': 'D/M/YYYY',
      'de-li': 'DD.MM.YYYY',
      'en-nz': 'D/MM/YYYY',
      'es-cr': 'DD/MM/YYYY',
      'fr-lu': 'DD/MM/YYYY',
      'ar-ma': 'DD-MM-YYYY',
      'en-ie': 'DD/MM/YYYY',
      'es-pa': 'MM/DD/YYYY',
      'fr-mc': 'DD/MM/YYYY',
      'ar-tn': 'DD-MM-YYYY',
      'en-za': 'YYYY/MM/DD',
      'es-do': 'DD/MM/YYYY',
      'ar-om': 'DD/MM/YYYY',
      'en-jm': 'DD/MM/YYYY',
      'es-ve': 'DD/MM/YYYY',
      'ar-ye': 'DD/MM/YYYY',
      'en-029': 'MM/DD/YYYY',
      'es-co': 'DD/MM/YYYY',
      'ar-sy': 'DD/MM/YYYY',
      'en-bz': 'DD/MM/YYYY',
      'es-pe': 'DD/MM/YYYY',
      'ar-jo': 'DD/MM/YYYY',
      'en-tt': 'DD/MM/YYYY',
      'es-ar': 'DD/MM/YYYY',
      'ar-lb': 'DD/MM/YYYY',
      'en-zw': 'M/D/YYYY',
      'es-ec': 'DD/MM/YYYY',
      'ar-kw': 'DD/MM/YYYY',
      'en-ph': 'M/D/YYYY',
      'es-cl': 'DD-MM-YYYY',
      'ar-ae': 'DD/MM/YYYY',
      'es-uy': 'DD/MM/YYYY',
      'ar-bh': 'DD/MM/YYYY',
      'es-py': 'DD/MM/YYYY',
      'ar-qa': 'DD/MM/YYYY',
      'es-bo': 'DD/MM/YYYY',
      'es-sv': 'DD/MM/YYYY',
      'es-hn': 'DD/MM/YYYY',
      'es-ni': 'DD/MM/YYYY',
      'es-pr': 'DD/MM/YYYY',
      'am-et': 'D/M/YYYY',
      'tzm-latn-dz': 'DD-MM-YYYY',
      'iu-latn-ca': 'D/MM/YYYY',
      'sma-no': 'DD.MM.YYYY',
      'mn-mong-cn': 'YYYY/M/D',
      'gd-gb': 'DD/MM/YYYY',
      'en-my': 'D/M/YYYY',
      'prs-af': 'DD/MM/YY',
      'bn-bd': 'DD-MM-YY',
      'wo-sn': 'DD/MM/YYYY',
      'rw-rw': 'M/D/YYYY',
      'qut-gt': 'DD/MM/YYYY',
      'sah-ru': 'MM.DD.YYYY',
      'gsw-fr': 'DD/MM/YYYY',
      'co-fr': 'DD/MM/YYYY',
      'oc-fr': 'DD/MM/YYYY',
      'mi-nz': 'DD/MM/YYYY',
      'ga-ie': 'DD/MM/YYYY',
      'se-se': 'YYYY-MM-DD',
      'br-fr': 'DD/MM/YYYY',
      'smn-fi': 'D.M.YYYY',
      'moh-ca': 'M/D/YYYY',
      'arn-cl': 'DD-MM-YYYY',
      'ii-cn': 'YYYY/M/D',
      'dsb-de': 'D. M. YYYY',
      'ig-ng': 'D/M/YYYY',
      'kl-gl': 'DD-MM-YYYY',
      'lb-lu': 'DD/MM/YYYY',
      'ba-ru': 'DD.MM.YY',
      'nso-za': 'YYYY/MM/DD',
      'quz-bo': 'DD/MM/YYYY',
      'yo-ng': 'D/M/YYYY',
      'ha-latn-ng': 'D/M/YYYY',
      'fil-ph': 'M/D/YYYY',
      'ps-af': 'DD/MM/YY',
      'fy-nl': 'D-M-YYYY',
      'ne-np': 'M/D/YYYY',
      'se-no': 'DD.MM.YYYY',
      'iu-cans-ca': 'D/M/YYYY',
      'sr-latn-rs': 'D.M.YYYY',
      'si-lk': 'YYYY-MM-DD',
      'sr-cyrl-rs': 'D.M.YYYY',
      'lo-la': 'DD/MM/YYYY',
      'km-kh': 'YYYY-MM-DD',
      'cy-gb': 'DD/MM/YYYY',
      'bo-cn': 'YYYY/M/D',
      'sms-fi': 'D.M.YYYY',
      'as-in': 'DD-MM-YYYY',
      'ml-in': 'DD-MM-YY',
      'en-in': 'DD-MM-YYYY',
      'or-in': 'DD-MM-YY',
      'bn-in': 'DD-MM-YY',
      'tk-tm': 'DD.MM.YY',
      'bs-latn-ba': 'D.M.YYYY',
      'mt-mt': 'DD/MM/YYYY',
      'sr-cyrl-me': 'D.M.YYYY',
      'se-fi': 'D.M.YYYY',
      'zu-za': 'YYYY/MM/DD',
      'xh-za': 'YYYY/MM/DD',
      'tn-za': 'YYYY/MM/DD',
      'hsb-de': 'D. M. YYYY',
      'bs-cyrl-ba': 'D.M.YYYY',
      'tg-cyrl-tj': 'DD.MM.yy',
      'sr-latn-ba': 'D.M.YYYY',
      'smj-no': 'DD.MM.YYYY',
      'rm-ch': 'DD/MM/YYYY',
      'smj-se': 'YYYY-MM-DD',
      'quz-ec': 'DD/MM/YYYY',
      'quz-pe': 'DD/MM/YYYY',
      'hr-ba': 'D.M.YYYY.',
      'sr-latn-me': 'D.M.YYYY',
      'sma-se': 'YYYY-MM-DD',
      'en-sg': 'D/M/YYYY',
      'ug-cn': 'YYYY-M-D',
      'sr-cyrl-ba': 'D.M.YYYY',
      'es-us': 'M/D/YYYY'
    };

    const key = navigator.language.toLowerCase();
    return formats[key] || this.config.defaults.dateFormat;
  }

  /**
   * Get a value from localStorage, using a temporary storage if localStorage is not supported
   * @param {string} key - key for the value to retrieve
   * @returns {Mixed} stored value
   */
  getFromLocalStorage(key) {
    // See if localStorage is supported and enabled
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return storage[key];
    }
  }

  /**
   * Get URL to file a report on Meta, preloaded with permalink
   * @param {String} [phabPaste] URL to auto-generated error report on Phabricator
   * @return {String} URL
   */
  getBugReportURL(phabPaste) {
    const reportURL = 'https://meta.wikimedia.org/w/index.php?title=Talk:Pageviews_Analysis&action=edit' + `&section=new&preloadtitle=${ this.app.upcase() } bug report`;

    if (phabPaste) {
      return `${ reportURL }&preload=Talk:Pageviews_Analysis/Preload&preloadparams[]=${ phabPaste }`;
    } else {
      return reportURL;
    }
  }

  /**
   * Get general information about a project, such as namespaces, title of the main page, etc.
   * Data returned by the api is also stored in this.siteInfo
   * @param {String} project - project such as en.wikipedia (with or without .org)
   * @returns {Deferred} promise resolving with siteinfo,
   *   along with any other cached siteinfo for other projects
   */
  fetchSiteInfo(project) {
    project = project.replace(/\.org$/, '');
    const dfd = $.Deferred(),
          cacheKey = `pageviews-siteinfo-${ project }`;

    if (this.siteInfo[project]) return dfd.resolve(this.siteInfo);

    // use cached site info if present
    if (simpleStorage.hasKey(cacheKey)) {
      this.siteInfo[project] = simpleStorage.get(cacheKey);
      dfd.resolve(this.siteInfo);
    } else {
      // otherwise fetch siteinfo and store in cache
      $.ajax({
        url: `https://${ project }.org/w/api.php`,
        data: {
          action: 'query',
          meta: 'siteinfo',
          siprop: 'general|namespaces',
          format: 'json'
        },
        dataType: 'jsonp'
      }).done(data => {
        this.siteInfo[project] = data.query;

        // cache for one week (TTL is in milliseconds)
        simpleStorage.set(cacheKey, this.siteInfo[project], { TTL: 1000 * 60 * 60 * 24 * 7 });

        dfd.resolve(this.siteInfo);
      }).fail(data => {
        dfd.reject(data);
      });
    }

    return dfd;
  }

  /**
   * Helper to get siteinfo from this.siteInfo for given project, with or without .org
   * @param {String} project - project name, with or without .org
   * @returns {Object|undefined} site information if present
   */
  getSiteInfo(project) {
    return this.siteInfo[project.replace(/\.org$/, '')];
  }

  /**
   * Get user agent, if supported
   * @returns {string} user-agent
   */
  getUserAgent() {
    return navigator.userAgent ? navigator.userAgent : 'Unknown';
  }

  /**
   * Set a value to localStorage, using a temporary storage if localStorage is not supported
   * @param {string} key - key for the value to set
   * @param {Mixed} value - value to store
   * @returns {Mixed} stored value
   */
  setLocalStorage(key, value) {
    // See if localStorage is supported and enabled
    try {
      return localStorage.setItem(key, value);
    } catch (err) {
      return storage[key] = value;
    }
  }

  /**
   * Generate a unique hash code from given string
   * @param  {String} str - to be hashed
   * @return {String} the hash
   */
  hashCode(str) {
    return str.split('').reduce((prevHash, currVal) => (prevHash << 5) - prevHash + currVal.charCodeAt(0), 0);
  }

  /**
   * Is this one of the chart-view apps (that does not have a list view)?
   * @return {Boolean} true or false
   */
  isChartApp() {
    return !this.isListApp();
  }

  /**
   * Is this one of the list-view apps?
   * @return {Boolean} true or false
   */
  isListApp() {
    return ['langviews', 'massviews', 'redirectviews'].includes(this.app);
  }

  /**
   * Test if the current project is a multilingual project
   * @returns {Boolean} is multilingual or not
   */
  isMultilangProject() {
    return new RegExp(`.*?\\.(${ Pv.multilangProjects.join('|') })`).test(this.project);
  }

  /**
   * Map normalized pages from API into a string of page names
   * Used in normalizePageNames()
   *
   * @param {array} pages - array of page names
   * @param {array} normalizedPages - array of normalized mappings returned by the API
   * @returns {array} pages with the new normalized names, if given
   */
  mapNormalizedPageNames(pages, normalizedPages) {
    normalizedPages.forEach(normalPage => {
      /** do it this way to preserve ordering of pages */
      pages = pages.map(page => {
        if (normalPage.from === page) {
          return normalPage.to;
        } else {
          return page;
        }
      });
    });
    return pages;
  }

  /**
   * List of valid multilingual projects
   * @return {Array} base projects, without the language
   */
  static get multilangProjects() {
    return ['wikipedia', 'wikibooks', 'wikinews', 'wikiquote', 'wikisource', 'wikiversity', 'wikivoyage'];
  }

  /**
   * Make mass requests to MediaWiki API
   * The API normally limits to 500 pages, but gives you a 'continue' value
   *   to finish iterating through the resource.
   * @param {Object} params - parameters to pass to the API
   * @param {String} project - project to query, e.g. en.wikipedia (.org is optional)
   * @param {String} [continueKey] - the key to look in the continue hash, if present (e.g. cmcontinue for API:Categorymembers)
   * @param {String|Function} [dataKey] - the key for the main chunk of data, in the query hash (e.g. categorymembers for API:Categorymembers)
   *   If this is a function it is given the response data, and expected to return the data we want to concatentate.
   * @param {Number} [limit] - max number of pages to fetch
   * @return {Deferred} promise resolving with data
   */
  massApi(params, project, continueKey = 'continue', dataKey, limit = this.config.apiLimit) {
    if (!/\.org$/.test(project)) project += '.org';

    const dfd = $.Deferred();
    let resolveData = {
      pages: []
    };

    const makeRequest = continueValue => {
      let requestData = Object.assign({
        action: 'query',
        format: 'json',
        formatversion: '2'
      }, params);

      if (continueValue) requestData[continueKey] = continueValue;

      const promise = $.ajax({
        url: `https://${ project }/w/api.php`,
        jsonp: 'callback',
        dataType: 'jsonp',
        data: requestData
      });

      promise.done(data => {
        // some failures come back as 200s, so we still resolve and let the local app handle it
        if (data.error) return dfd.resolve(data);

        let isFinished;

        // allow custom function to parse the data we want, if provided
        if (typeof dataKey === 'function') {
          resolveData.pages = resolveData.pages.concat(dataKey(data.query));
          isFinished = resolveData.pages.length >= limit;
        } else {
          // append new data to data from last request. We might want both 'pages' and dataKey
          if (data.query.pages) {
            resolveData.pages = resolveData.pages.concat(data.query.pages);
          }
          if (data.query[dataKey]) {
            resolveData[dataKey] = (resolveData[dataKey] || []).concat(data.query[dataKey]);
          }
          // If pages is not the collection we want, it will be either an empty array or one entry with basic page info
          //   depending on what API we're hitting. So resolveData[dataKey] will hit the limit
          isFinished = resolveData.pages.length >= limit || resolveData[dataKey].length >= limit;
        }

        // make recursive call if needed, waiting 100ms
        if (!isFinished && data.continue && data.continue[continueKey]) {
          setTimeout(() => {
            makeRequest(data.continue[continueKey]);
          }, 100);
        } else {
          // indicate there were more entries than the limit
          if (data.continue) resolveData.continue = true;
          dfd.resolve(resolveData);
        }
      }).fail(data => {
        dfd.reject(data);
      });
    };

    makeRequest();

    return dfd;
  }

  /**
   * Localize Number object with delimiters
   *
   * @param {Number} value - the Number, e.g. 1234567
   * @returns {string} - with locale delimiters, e.g. 1,234,567 (en-US)
   */
  n(value) {
    return new Number(value).toLocaleString();
  }

  /**
   * Get basic info on given pages, including the normalized page names.
   * E.g. masculine versus feminine namespaces on dewiki
   * @param {array} pages - array of page names
   * @returns {Deferred} promise with data fetched from API
   */
  getPageInfo(pages) {
    let dfd = $.Deferred();

    return $.ajax({
      url: `https://${ this.project }.org/w/api.php?action=query&prop=info&inprop=protection|watchers` + `&formatversion=2&format=json&titles=${ pages.join('|') }`,
      dataType: 'jsonp'
    }).then(data => {
      let pageData = {};
      data.query.pages.forEach(page => {
        pageData[page.title] = page;
      });
      return dfd.resolve(pageData);
    });
  }

  /**
   * Compute how many days are in the selected date range
   * @returns {integer} number of days
   */
  numDaysInRange() {
    return this.daterangepicker.endDate.diff(this.daterangepicker.startDate, 'days') + 1;
  }

  /**
   * Generate key/value pairs of URL query string
   * @param {string} [multiParam] - parameter whose values needs to split by pipe character
   * @returns {Object} key/value pairs representation of query string
   */
  parseQueryString(multiParam) {
    const uri = decodeURI(location.search.slice(1)),
          chunks = uri.split('&');
    let params = {};

    for (let i = 0; i < chunks.length; i++) {
      let chunk = chunks[i].split('=');

      if (multiParam && chunk[0] === multiParam) {
        params[multiParam] = chunk[1].split('|').filter(param => !!param).unique();
      } else {
        params[chunk[0]] = chunk[1];
      }
    }

    return params;
  }

  /**
   * Simple metric to see how many use it (pageviews of the pageview, a meta-pageview, if you will :)
   * @param {string} app - one of: pv, lv, tv, sv, ms
   * @return {null} nothing
   */
  patchUsage(app) {
    if (metaRoot) {
      $.ajax({
        url: `//${ metaRoot }/usage/${ this.app }/${ this.project || i18nLang }`,
        method: 'PATCH'
      });
    }
  }

  /**
   * Set timestamp of when process started
   * @return {moment} start time
   */
  processStarted() {
    return this.processStart = moment();
  }

  /**
   * Get elapsed time from this.processStart, and show it
   * @return {moment} Elapsed time from `this.processStart` in milliseconds
   */
  processEnded() {
    const endTime = moment(),
          elapsedTime = endTime.diff(this.processStart, 'milliseconds');

    /** FIXME: report this bug: some languages don't parse PLURAL correctly ('he' for example) with the English fallback message */
    try {
      $('.elapsed-time').attr('datetime', endTime.format()).text($.i18n('elapsed-time', elapsedTime / 1000));
    } catch (e) {
      // intentionall nothing, everything will still show
    }

    return elapsedTime;
  }

  /**
   * Adapted from http://jsfiddle.net/dandv/47cbj/ courtesy of dandv
   *
   * Same as _.debounce but queues and executes all function calls
   * @param  {Function} fn - function to debounce
   * @param  {delay} delay - delay duration of milliseconds
   * @param  {object} context - scope the function should refer to
   * @return {Function} rate-limited function to call instead of your function
   */
  rateLimit(fn, delay, context) {
    let queue = [],
        timer;

    const processQueue = () => {
      const item = queue.shift();
      if (item) {
        fn.apply(item.context, item.arguments);
      }
      if (queue.length === 0) {
        clearInterval(timer), timer = null;
      }
    };

    return function limited() {
      queue.push({
        context: context || this,
        arguments: [].slice.call(arguments)
      });

      if (!timer) {
        processQueue(); // start immediately on the first invocation
        timer = setInterval(processQueue, delay);
      }
    };
  }

  /**
   * Removes all Select2 related stuff then adds it back
   * Also might result in the chart being re-rendered
   * @returns {null} nothing
   */
  resetSelect2() {
    const select2Input = $(this.config.select2Input);
    select2Input.off('change');
    select2Input.select2('val', null);
    select2Input.select2('data', null);
    select2Input.select2('destroy');
    this.setupSelect2();
  }

  /**
   * Change alpha level of an rgba value
   *
   * @param {string} value - rgba value
   * @param {float|string} alpha - transparency as float value
   * @returns {string} rgba value
   */
  rgba(value, alpha) {
    return value.replace(/,\s*\d\)/, `, ${ alpha })`);
  }

  /**
   * Save a particular setting to session and localStorage
   *
   * @param {string} key - settings key
   * @param {string|boolean} value - value to save
   * @returns {null} nothing
   */
  saveSetting(key, value) {
    this[key] = value;
    this.setLocalStorage(`pageviews-settings-${ key }`, value);
  }

  /**
   * Save the selected settings within the settings modal
   * Prefer this implementation over a large library like serializeObject or serializeJSON
   * @returns {null} nothing
   */
  saveSettings() {
    /** track if we're changing to no_autocomplete mode */
    const wasAutocomplete = this.autocomplete === 'no_autocomplete';

    $.each($('#settings-modal input'), (index, el) => {
      if (el.type === 'checkbox') {
        this.saveSetting(el.name, el.checked ? 'true' : 'false');
      } else if (el.checked) {
        this.saveSetting(el.name, el.value);
      }
    });

    if (this.app !== 'topviews') {
      this.daterangepicker.locale.format = this.dateFormat;
      this.daterangepicker.updateElement();

      this.setupSelect2Colors();

      /**
       * If we changed to/from no_autocomplete we have to reset Select2 entirely
       *   as setSelect2Defaults is super buggy due to Select2 constraints
       * So let's only reset if we have to
       */
      if (this.autocomplete === 'no_autocomplete' !== wasAutocomplete) {
        this.resetSelect2();
      }

      if (this.beginAtZero === 'true') {
        $('.begin-at-zero-option').prop('checked', true);
      }
    }

    this.processInput(true);
  }

  /**
   * Directly set items in Select2
   * Currently is not able to remove underscores from page names
   *
   * @param {array} items - page titles
   * @returns {array} - untouched array of items
   */
  setSelect2Defaults(items) {
    items.forEach(item => {
      const escapedText = $('<div>').text(item).html();
      $('<option>' + escapedText + '</option>').appendTo(this.config.select2Input);
    });
    $(this.config.select2Input).select2('val', items);
    $(this.config.select2Input).select2('close');

    return items;
  }

  /**
   * Sets the daterange picker values and this.specialRange based on provided special range key
   * WARNING: not to be called on daterange picker GUI events (e.g. special range buttons)
   *
   * @param {string} type - one of special ranges defined in this.config.specialRanges,
   *   including dynamic latest range, such as `latest-15` for latest 15 days
   * @returns {object|null} updated this.specialRange object or null if type was invalid
   */
  setSpecialRange(type) {
    const rangeIndex = Object.keys(this.config.specialRanges).indexOf(type);
    let startDate, endDate;

    if (type.includes('latest-')) {
      const offset = parseInt(type.replace('latest-', ''), 10) || 20; // fallback of 20
      [startDate, endDate] = this.config.specialRanges.latest(offset);
    } else if (rangeIndex >= 0) {
      /** treat 'latest' as a function */
      [startDate, endDate] = type === 'latest' ? this.config.specialRanges.latest() : this.config.specialRanges[type];
      $('.daterangepicker .ranges li').eq(rangeIndex).trigger('click');
    } else {
      return;
    }

    this.specialRange = {
      range: type,
      value: `${ startDate.format(this.dateFormat) } - ${ endDate.format(this.dateFormat) }`
    };

    /** directly assign startDate then use setEndDate so that the events will be fired once */
    this.daterangepicker.startDate = startDate;
    this.daterangepicker.setEndDate(endDate);

    return this.specialRange;
  }

  /**
   * Setup colors for Select2 entries so we can dynamically change them
   * This is a necessary evil, as we have to mark them as !important
   *   and since there are any number of entires, we need to use nth-child selectors
   * @returns {CSSStylesheet} our new stylesheet
   */
  setupSelect2Colors() {
    /** first delete old stylesheet, if present */
    if (this.colorsStyleEl) this.colorsStyleEl.remove();

    /** create new stylesheet */
    this.colorsStyleEl = document.createElement('style');
    this.colorsStyleEl.appendChild(document.createTextNode('')); // WebKit hack :(
    document.head.appendChild(this.colorsStyleEl);

    /** add color rules */
    this.config.colors.forEach((color, index) => {
      this.colorsStyleEl.sheet.insertRule(`.select2-selection__choice:nth-of-type(${ index + 1 }) { background: ${ color } !important }`, 0);
    });

    return this.colorsStyleEl.sheet;
  }

  /**
   * Cross-application listeners
   * Each app has it's own setupListeners() that should call super.setupListeners()
   * @return {null} nothing
   */
  setupListeners() {
    /** prevent browser's default behaviour for any link with href="#" */
    $("a[href='#']").on('click', e => e.preventDefault());

    /** download listeners */
    $('.download-csv').on('click', this.exportCSV.bind(this));
    $('.download-json').on('click', this.exportJSON.bind(this));

    /** project input listeners, saving and restoring old value if new one is invalid */
    $(this.config.projectInput).on('focusin', function () {
      this.dataset.value = this.value;
    });
    $(this.config.projectInput).on('change', e => this.validateProject(e));
  }

  /**
   * Set values of form based on localStorage or defaults, add listeners
   * @returns {null} nothing
   */
  setupSettingsModal() {
    /** fill in values, everything is either a checkbox or radio */
    this.fillInSettings();

    /** add listener */
    $('.save-settings-btn').on('click', this.saveSettings.bind(this));
    $('.cancel-settings-btn').on('click', this.fillInSettings.bind(this));
  }

  /**
   * sets up the daterange selector and adds listeners
   * @returns {null} - nothing
   */
  setupDateRangeSelector() {
    const dateRangeSelector = $(this.config.dateRangeSelector);

    /**
     * Transform this.config.specialRanges to have i18n as keys
     * This is what is shown as the special ranges (Last month, etc.) in the datepicker menu
     * @type {Object}
     */
    let ranges = {};
    Object.keys(this.config.specialRanges).forEach(key => {
      if (key === 'latest') return; // this is a function, not meant to be in the list of special ranges
      ranges[$.i18n(key)] = this.config.specialRanges[key];
    });

    let datepickerOptions = {
      locale: {
        format: this.dateFormat,
        applyLabel: $.i18n('apply'),
        cancelLabel: $.i18n('cancel'),
        customRangeLabel: $.i18n('custom-range'),
        daysOfWeek: [$.i18n('su'), $.i18n('mo'), $.i18n('tu'), $.i18n('we'), $.i18n('th'), $.i18n('fr'), $.i18n('sa')],
        monthNames: [$.i18n('january'), $.i18n('february'), $.i18n('march'), $.i18n('april'), $.i18n('may'), $.i18n('june'), $.i18n('july'), $.i18n('august'), $.i18n('september'), $.i18n('october'), $.i18n('november'), $.i18n('december')]
      },
      startDate: moment().subtract(this.config.daysAgo, 'days'),
      minDate: this.config.minDate,
      maxDate: this.config.maxDate,
      ranges: ranges
    };

    if (this.config.dateLimit) datepickerOptions.dateLimit = { days: this.config.dateLimit };

    dateRangeSelector.daterangepicker(datepickerOptions);

    /** so people know why they can't query data older than July 2015 */
    $('.daterangepicker').append($('<div>').addClass('daterange-notice').html($.i18n('date-notice', document.title, "<a href='http://stats.grok.se' target='_blank'>stats.grok.se</a>", `${ $.i18n('july') } 2015`)));

    /**
     * The special date range options (buttons the right side of the daterange picker)
     *
     * WARNING: we're unable to add class names or data attrs to the range options,
     * so checking which was clicked is hardcoded based on the index of the LI,
     * as defined in this.config.specialRanges
     */
    $('.daterangepicker .ranges li').on('click', e => {
      const index = $('.daterangepicker .ranges li').index(e.target),
            container = this.daterangepicker.container,
            inputs = container.find('.daterangepicker_input input');
      this.specialRange = {
        range: Object.keys(this.config.specialRanges)[index],
        value: `${ inputs[0].value } - ${ inputs[1].value }`
      };
    });

    $(this.config.dateRangeSelector).on('apply.daterangepicker', (e, action) => {
      if (action.chosenLabel === $.i18n('custom-range')) {
        this.specialRange = null;

        /** force events to re-fire since apply.daterangepicker occurs before 'change' event */
        this.daterangepicker.updateElement();
      }
    });
  }

  showFatalErrors(errors) {
    this.clearMessages();
    errors.forEach(error => {
      this.writeMessage(`<strong>${ $.i18n('fatal-error') }</strong>: <code>${ error }</code>`, 'error');
    });

    if (this.debug) {
      throw errors[0];
    } else if (errors && errors[0] && errors[0].stack) {
      $.ajax({
        method: 'POST',
        url: '//tools.wmflabs.org/musikanimal/paste',
        data: {
          content: '' + `\ndate:      ${ moment().utc().format() }` + `\ntool:      ${ this.app }` + `\nlanguage:  ${ i18nLang }` + `\nchart:     ${ this.chartType }` + `\nurl:       ${ document.location.href }` + `\nuserAgent: ${ this.getUserAgent() }` + `\ntrace:     ${ errors[0].stack }`,

          title: `Pageviews Analysis error report: ${ errors[0] }`
        }
      }).done(data => {
        if (data && data.result && data.result.objectName) {
          this.writeMessage($.i18n('error-please-report', this.getBugReportURL(data.result.objectName)), 'error');
        } else {
          this.writeMessage($.i18n('error-please-report', this.getBugReportURL()), 'error');
        }
      }).fail(() => {
        this.writeMessage($.i18n('error-please-report', this.getBugReportURL()), 'error');
      });
    }
  }

  /**
   * Splash in console, just for fun
   * @returns {String} output
   */
  splash() {
    const style = 'background: #eee; color: #555; padding: 4px; font-family:monospace';
    console.log('%c      ___            __ _                     _                             ', style);
    console.log('%c     | _ \\  __ _    / _` |   ___    __ __    (_)     ___   __ __ __  ___    ', style);
    console.log('%c     |  _/ / _` |   \\__, |  / -_)   \\ V /    | |    / -_)  \\ V  V / (_-<    ', style);
    console.log('%c    _|_|_  \\__,_|   |___/   \\___|   _\\_/_   _|_|_   \\___|   \\_/\\_/  /__/_   ', style);
    console.log('%c  _| """ |_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|  ', style);
    console.log('%c  "`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'  ', style);
    console.log('%c              ___                     _  _     _               _            ', style);
    console.log('%c      o O O  /   \\   _ _     __ _    | || |   | |     ___     (_)     ___   ', style);
    console.log('%c     o       | - |  | \' \\   / _` |    \\_, |   | |    (_-<     | |    (_-<   ', style);
    console.log('%c    TS__[O]  |_|_|  |_||_|  \\__,_|   _|__/   _|_|_   /__/_   _|_|_   /__/_  ', style);
    console.log('%c   {======|_|"""""|_|"""""|_|"""""|_| """"|_|"""""|_|"""""|_|"""""|_|"""""| ', style);
    console.log('%c  ./o--000\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\'"`-0-0-\' ', style);
    console.log('%c                                                                            ', style);
    console.log(`%c  Copyright © ${ new Date().getFullYear() } MusikAnimal, Kaldari, Marcel Ruiz Forns                  `, style);
  }

  /**
   * Add the loading indicator class and set the safeguard timeout
   * @returns {null} nothing
   */
  startSpinny() {
    $('.chart-container').addClass('loading');
    clearTimeout(this.timeout);

    this.timeout = setTimeout(err => {
      this.resetView();
      this.writeMessage(`<strong>${ $.i18n('fatal-error') }</strong>:
        ${ $.i18n('error-timed-out') }
        ${ $.i18n('error-please-report', this.getBugReportURL()) }
      `, 'error', 0);
    }, 20 * 1000);
  }

  /**
   * Remove loading indicator class and clear the safeguard timeout
   * @returns {null} nothing
   */
  stopSpinny() {
    $('.chart-container').removeClass('loading');
    clearTimeout(this.timeout);
  }

  /**
   * Replace spaces with underscores
   *
   * @param {array} pages - array of page names
   * @returns {array} page names with underscores
   */
  underscorePageNames(pages) {
    return pages.map(page => {
      return decodeURIComponent(page).score();
    });
  }

  /**
   * Update hrefs of inter-app links to load currently selected project
   * @return {null} nuttin'
   */
  updateInterAppLinks() {
    $('.interapp-link').each((i, link) => {
      let url = link.href.split('?')[0];

      if (link.classList.contains('interapp-link--siteviews')) {
        link.href = `${ url }?sites=${ this.project.escape() }.org`;
      } else {
        link.href = `${ url }?project=${ this.project.escape() }.org`;
      }
    });
  }

  /**
   * Validate basic params against what is defined in the config,
   *   and if they are invalid set the default
   * @param {Object} params - params as fetched by this.parseQueryString()
   * @returns {Object} same params with some invalid parameters correted, as necessary
   */
  validateParams(params) {
    this.config.validateParams.forEach(paramKey => {
      if (paramKey === 'project' && params.project) {
        params.project = params.project.replace(/^www\./, '');
      }

      const defaultValue = this.config.defaults[paramKey],
            paramValue = params[paramKey];

      if (defaultValue && !this.config.validParams[paramKey].includes(paramValue)) {
        // only throw error if they tried to provide an invalid value
        if (!!paramValue) {
          this.addInvalidParamNotice(paramKey);
        }

        params[paramKey] = defaultValue;
      }
    });

    return params;
  }

  /**
   * Adds listeners to the project input for validations against the site map,
   *   reverting to the old value if the new one is invalid
   * @param {Boolean} [multilingual] - whether we should check if it is a multilingual project
   * @returns {Boolean} whether or not validations passed
   */
  validateProject(multilingual = false) {
    const projectInput = $(this.config.projectInput)[0];
    let project = projectInput.value.replace(/^www\./, ''),
        valid = false;

    if (multilingual && !this.isMultilangProject()) {
      this.writeMessage($.i18n('invalid-lang-project', `<a href='//${ project.escape() }'>${ project.escape() }</a>`), 'warning');
      project = projectInput.dataset.value;
    } else if (siteDomains.includes(project)) {
      this.clearMessages();
      this.updateInterAppLinks();
      valid = true;
    } else {
      this.writeMessage($.i18n('invalid-project', `<a href='//${ project.escape() }'>${ project.escape() }</a>`), 'warning');
      project = projectInput.dataset.value;
    }

    projectInput.value = project;

    return valid;
  }

  // FIXME: restore writeMessage to the way it used to be,
  // and make addSiteNotice do the toastr, and change instances of this.writeMessage
  // accordingly
  /**
   * Writes message just below the chart
   * @param {string} message - message to write
   * @param {Number} timeout - num seconds to show
   * @returns {jQuery} - jQuery object of message container
   */
  writeMessage(message, level = 'warning', timeout = 5000) {
    toastr.options.timeOut = timeout;
    toastr[level](message);
  }
}

module.exports = Pv;

},{"./pv_config":5,"./site_map":6}],5:[function(require,module,exports){
/**
 * @file Shared config amongst all apps
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

const siteMap = require('./site_map');
const siteDomains = Object.keys(siteMap).map(key => siteMap[key]);

/**
 * Configuration for all Pageviews applications.
 * Some properties may be overriden by app-specific configs
 */
class PvConfig {
  constructor() {
    let self = this;
    const formatXAxisTick = value => {
      const dayOfWeek = moment(value, this.dateFormat).weekday();
      if (dayOfWeek % 7) {
        return value;
      } else {
        return `• ${ value }`;
      }
    };

    this.config = {
      apiLimit: 5000,
      apiThrottle: 20,
      apps: ['pageviews', 'topviews', 'langviews', 'siteviews', 'massviews', 'redirectviews'],
      chartConfig: {
        line: {
          opts: {
            scales: {
              yAxes: [{
                ticks: {
                  callback: value => this.formatYAxisNumber(value)
                }
              }],
              xAxes: [{
                ticks: {
                  callback: value => {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.linearTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: 'rgba(0,0,0,0)',
              borderWidth: 2,
              borderColor: color,
              pointColor: color,
              pointBackgroundColor: color,
              pointBorderColor: self.rgba(color, 0.2),
              pointHoverBackgroundColor: color,
              pointHoverBorderColor: color,
              pointHoverBorderWidth: 2,
              pointHoverRadius: 5,
              tension: self.bezierCurve === 'true' ? 0.4 : 0
            };
          }
        },
        bar: {
          opts: {
            scales: {
              yAxes: [{
                ticks: {
                  callback: value => this.formatYAxisNumber(value)
                }
              }],
              xAxes: [{
                barPercentage: 1.0,
                categoryPercentage: 0.85,
                ticks: {
                  callback: value => {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.linearTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: self.rgba(color, 0.6),
              borderColor: self.rgba(color, 0.9),
              borderWidth: 2,
              hoverBackgroundColor: self.rgba(color, 0.75),
              hoverBorderColor: color
            };
          }
        },
        radar: {
          opts: {
            scale: {
              ticks: {
                callback: value => this.formatNumber(value)
              }
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.linearTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: self.rgba(color, 0.1),
              borderColor: color,
              borderWidth: 2,
              pointBackgroundColor: color,
              pointBorderColor: self.rgba(color, 0.8),
              pointHoverBackgroundColor: color,
              pointHoverBorderColor: color,
              pointHoverRadius: 5
            };
          }
        },
        pie: {
          opts: {
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.circularTooltips
          },
          dataset(color) {
            return {
              color,
              backgroundColor: color,
              hoverBackgroundColor: self.rgba(color, 0.8)
            };
          }
        },
        doughnut: {
          opts: {
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.circularTooltips
          },
          dataset(color) {
            return {
              color: color,
              backgroundColor: color,
              hoverBackgroundColor: self.rgba(color, 0.8)
            };
          }
        },
        polarArea: {
          opts: {
            scale: {
              ticks: {
                beginAtZero: true,
                callback: value => this.formatNumber(value)
              }
            },
            legendCallback: chart => this.config.chartLegend(self),
            tooltips: this.circularTooltips
          },
          dataset(color) {
            return {
              color: color,
              backgroundColor: self.rgba(color, 0.7),
              hoverBackgroundColor: self.rgba(color, 0.9)
            };
          }
        }
      },
      circularCharts: ['pie', 'doughnut', 'polarArea'],
      colors: ['rgba(171, 212, 235, 1)', 'rgba(178, 223, 138, 1)', 'rgba(251, 154, 153, 1)', 'rgba(253, 191, 111, 1)', 'rgba(202, 178, 214, 1)', 'rgba(207, 182, 128, 1)', 'rgba(141, 211, 199, 1)', 'rgba(252, 205, 229, 1)', 'rgba(255, 247, 161, 1)', 'rgba(217, 217, 217, 1)'],
      defaults: {
        autocomplete: 'autocomplete',
        chartType: numDatasets => numDatasets > 1 ? 'line' : 'bar',
        dateFormat: 'YYYY-MM-DD',
        localizeDateFormat: 'true',
        numericalFormatting: 'true',
        bezierCurve: 'false',
        autoLogDetection: 'true',
        beginAtZero: 'false',
        rememberChart: 'true',
        agent: 'user',
        platform: 'all-access',
        project: 'en.wikipedia.org'
      },
      globalChartOpts: {
        animation: {
          duration: 500,
          easing: 'easeInOutQuart'
        },
        hover: {
          animationDuration: 0
        },
        legend: {
          display: false
        }
      },
      linearCharts: ['line', 'bar', 'radar'],
      linearOpts: {
        scales: {
          yAxes: [{
            ticks: {
              callback: value => this.formatNumber(value)
            }
          }]
        },
        legendCallback: chart => this.config.chartLegend(chart.data.datasets, self)
      },
      daysAgo: 20,
      minDate: moment('2015-07-01').startOf('day'),
      maxDate: moment().subtract(1, 'days').startOf('day'),
      specialRanges: {
        'last-week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
        'this-month': [moment().startOf('month'), moment().subtract(1, 'days').startOf('day')],
        'last-month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        latest(offset = self.config.daysAgo) {
          return [moment().subtract(offset, 'days').startOf('day'), self.config.maxDate];
        }
      },
      timestampFormat: 'YYYYMMDD00',
      validParams: {
        agent: ['all-agents', 'user', 'spider', 'bot'],
        platform: ['all-access', 'desktop', 'mobile-app', 'mobile-web'],
        project: siteDomains
      }
    };
  }

  get linearTooltips() {
    return {
      mode: 'label',
      callbacks: {
        label: tooltipItem => {
          if (Number.isNaN(tooltipItem.yLabel)) {
            return ' ' + $.i18n('unknown');
          } else {
            return ' ' + this.formatNumber(tooltipItem.yLabel);
          }
        }
      },
      bodyFontSize: 14,
      bodySpacing: 7,
      caretSize: 0,
      titleFontSize: 14
    };
  }

  get circularTooltips() {
    return {
      callbacks: {
        label: (tooltipItem, chartInstance) => {
          const value = chartInstance.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                label = chartInstance.labels[tooltipItem.index];

          if (Number.isNaN(value)) {
            return `${ label }: ${ $.i18n('unknown') }`;
          } else {
            return `${ label }: ${ this.formatNumber(value) }`;
          }
        }
      },
      bodyFontSize: 14,
      bodySpacing: 7,
      caretSize: 0,
      titleFontSize: 14
    };
  }
}

module.exports = PvConfig;

},{"./site_map":6}],6:[function(require,module,exports){
/**
 * @file WMF [site matrix](https://www.mediawiki.org/w/api.php?action=sitematrix), with some unsupported wikis removed
 */

/**
 * Sitematrix of all supported WMF wikis
 * @type {Object}
 */
const siteMap = {
  'aawiki': 'aa.wikipedia.org',
  'aawiktionary': 'aa.wiktionary.org',
  'aawikibooks': 'aa.wikibooks.org',
  'abwiki': 'ab.wikipedia.org',
  'abwiktionary': 'ab.wiktionary.org',
  'acewiki': 'ace.wikipedia.org',
  'adywiki': 'ady.wikipedia.org',
  'afwiki': 'af.wikipedia.org',
  'afwiktionary': 'af.wiktionary.org',
  'afwikibooks': 'af.wikibooks.org',
  'afwikiquote': 'af.wikiquote.org',
  'akwiki': 'ak.wikipedia.org',
  'akwiktionary': 'ak.wiktionary.org',
  'akwikibooks': 'ak.wikibooks.org',
  'alswiki': 'als.wikipedia.org',
  'alswiktionary': 'als.wiktionary.org',
  'alswikibooks': 'als.wikibooks.org',
  'alswikiquote': 'als.wikiquote.org',
  'amwiki': 'am.wikipedia.org',
  'amwiktionary': 'am.wiktionary.org',
  'amwikiquote': 'am.wikiquote.org',
  'anwiki': 'an.wikipedia.org',
  'anwiktionary': 'an.wiktionary.org',
  'angwiki': 'ang.wikipedia.org',
  'angwiktionary': 'ang.wiktionary.org',
  'angwikibooks': 'ang.wikibooks.org',
  'angwikiquote': 'ang.wikiquote.org',
  'angwikisource': 'ang.wikisource.org',
  'arwiki': 'ar.wikipedia.org',
  'arwiktionary': 'ar.wiktionary.org',
  'arwikibooks': 'ar.wikibooks.org',
  'arwikinews': 'ar.wikinews.org',
  'arwikiquote': 'ar.wikiquote.org',
  'arwikisource': 'ar.wikisource.org',
  'arwikiversity': 'ar.wikiversity.org',
  'arcwiki': 'arc.wikipedia.org',
  'arzwiki': 'arz.wikipedia.org',
  'aswiki': 'as.wikipedia.org',
  'aswiktionary': 'as.wiktionary.org',
  'aswikibooks': 'as.wikibooks.org',
  'aswikisource': 'as.wikisource.org',
  'astwiki': 'ast.wikipedia.org',
  'astwiktionary': 'ast.wiktionary.org',
  'astwikibooks': 'ast.wikibooks.org',
  'astwikiquote': 'ast.wikiquote.org',
  'avwiki': 'av.wikipedia.org',
  'avwiktionary': 'av.wiktionary.org',
  'aywiki': 'ay.wikipedia.org',
  'aywiktionary': 'ay.wiktionary.org',
  'aywikibooks': 'ay.wikibooks.org',
  'azwiki': 'az.wikipedia.org',
  'azwiktionary': 'az.wiktionary.org',
  'azwikibooks': 'az.wikibooks.org',
  'azwikiquote': 'az.wikiquote.org',
  'azwikisource': 'az.wikisource.org',
  'azbwiki': 'azb.wikipedia.org',
  'bawiki': 'ba.wikipedia.org',
  'bawikibooks': 'ba.wikibooks.org',
  'barwiki': 'bar.wikipedia.org',
  'bat_smgwiki': 'bat-smg.wikipedia.org',
  'bclwiki': 'bcl.wikipedia.org',
  'bewiki': 'be.wikipedia.org',
  'bewiktionary': 'be.wiktionary.org',
  'bewikibooks': 'be.wikibooks.org',
  'bewikiquote': 'be.wikiquote.org',
  'bewikisource': 'be.wikisource.org',
  'be_x_oldwiki': 'be-tarask.wikipedia.org',
  'bgwiki': 'bg.wikipedia.org',
  'bgwiktionary': 'bg.wiktionary.org',
  'bgwikibooks': 'bg.wikibooks.org',
  'bgwikinews': 'bg.wikinews.org',
  'bgwikiquote': 'bg.wikiquote.org',
  'bgwikisource': 'bg.wikisource.org',
  'bhwiki': 'bh.wikipedia.org',
  'bhwiktionary': 'bh.wiktionary.org',
  'biwiki': 'bi.wikipedia.org',
  'biwiktionary': 'bi.wiktionary.org',
  'biwikibooks': 'bi.wikibooks.org',
  'bjnwiki': 'bjn.wikipedia.org',
  'bmwiki': 'bm.wikipedia.org',
  'bmwiktionary': 'bm.wiktionary.org',
  'bmwikibooks': 'bm.wikibooks.org',
  'bmwikiquote': 'bm.wikiquote.org',
  'bnwiki': 'bn.wikipedia.org',
  'bnwiktionary': 'bn.wiktionary.org',
  'bnwikibooks': 'bn.wikibooks.org',
  'bnwikisource': 'bn.wikisource.org',
  'bowiki': 'bo.wikipedia.org',
  'bowiktionary': 'bo.wiktionary.org',
  'bowikibooks': 'bo.wikibooks.org',
  'bpywiki': 'bpy.wikipedia.org',
  'brwiki': 'br.wikipedia.org',
  'brwiktionary': 'br.wiktionary.org',
  'brwikiquote': 'br.wikiquote.org',
  'brwikisource': 'br.wikisource.org',
  'bswiki': 'bs.wikipedia.org',
  'bswiktionary': 'bs.wiktionary.org',
  'bswikibooks': 'bs.wikibooks.org',
  'bswikinews': 'bs.wikinews.org',
  'bswikiquote': 'bs.wikiquote.org',
  'bswikisource': 'bs.wikisource.org',
  'bugwiki': 'bug.wikipedia.org',
  'bxrwiki': 'bxr.wikipedia.org',
  'cawiki': 'ca.wikipedia.org',
  'cawiktionary': 'ca.wiktionary.org',
  'cawikibooks': 'ca.wikibooks.org',
  'cawikinews': 'ca.wikinews.org',
  'cawikiquote': 'ca.wikiquote.org',
  'cawikisource': 'ca.wikisource.org',
  'cbk_zamwiki': 'cbk-zam.wikipedia.org',
  'cdowiki': 'cdo.wikipedia.org',
  'cewiki': 'ce.wikipedia.org',
  'cebwiki': 'ceb.wikipedia.org',
  'chwiki': 'ch.wikipedia.org',
  'chwiktionary': 'ch.wiktionary.org',
  'chwikibooks': 'ch.wikibooks.org',
  'chowiki': 'cho.wikipedia.org',
  'chrwiki': 'chr.wikipedia.org',
  'chrwiktionary': 'chr.wiktionary.org',
  'chywiki': 'chy.wikipedia.org',
  'ckbwiki': 'ckb.wikipedia.org',
  'cowiki': 'co.wikipedia.org',
  'cowiktionary': 'co.wiktionary.org',
  'cowikibooks': 'co.wikibooks.org',
  'cowikiquote': 'co.wikiquote.org',
  'crwiki': 'cr.wikipedia.org',
  'crwiktionary': 'cr.wiktionary.org',
  'crwikiquote': 'cr.wikiquote.org',
  'crhwiki': 'crh.wikipedia.org',
  'cswiki': 'cs.wikipedia.org',
  'cswiktionary': 'cs.wiktionary.org',
  'cswikibooks': 'cs.wikibooks.org',
  'cswikinews': 'cs.wikinews.org',
  'cswikiquote': 'cs.wikiquote.org',
  'cswikisource': 'cs.wikisource.org',
  'cswikiversity': 'cs.wikiversity.org',
  'csbwiki': 'csb.wikipedia.org',
  'csbwiktionary': 'csb.wiktionary.org',
  'cuwiki': 'cu.wikipedia.org',
  'cvwiki': 'cv.wikipedia.org',
  'cvwikibooks': 'cv.wikibooks.org',
  'cywiki': 'cy.wikipedia.org',
  'cywiktionary': 'cy.wiktionary.org',
  'cywikibooks': 'cy.wikibooks.org',
  'cywikiquote': 'cy.wikiquote.org',
  'cywikisource': 'cy.wikisource.org',
  'dawiki': 'da.wikipedia.org',
  'dawiktionary': 'da.wiktionary.org',
  'dawikibooks': 'da.wikibooks.org',
  'dawikiquote': 'da.wikiquote.org',
  'dawikisource': 'da.wikisource.org',
  'dewiki': 'de.wikipedia.org',
  'dewiktionary': 'de.wiktionary.org',
  'dewikibooks': 'de.wikibooks.org',
  'dewikinews': 'de.wikinews.org',
  'dewikiquote': 'de.wikiquote.org',
  'dewikisource': 'de.wikisource.org',
  'dewikiversity': 'de.wikiversity.org',
  'dewikivoyage': 'de.wikivoyage.org',
  'diqwiki': 'diq.wikipedia.org',
  'dsbwiki': 'dsb.wikipedia.org',
  'dvwiki': 'dv.wikipedia.org',
  'dvwiktionary': 'dv.wiktionary.org',
  'dzwiki': 'dz.wikipedia.org',
  'dzwiktionary': 'dz.wiktionary.org',
  'eewiki': 'ee.wikipedia.org',
  'elwiki': 'el.wikipedia.org',
  'elwiktionary': 'el.wiktionary.org',
  'elwikibooks': 'el.wikibooks.org',
  'elwikinews': 'el.wikinews.org',
  'elwikiquote': 'el.wikiquote.org',
  'elwikisource': 'el.wikisource.org',
  'elwikiversity': 'el.wikiversity.org',
  'elwikivoyage': 'el.wikivoyage.org',
  'emlwiki': 'eml.wikipedia.org',
  'enwiki': 'en.wikipedia.org',
  'enwiktionary': 'en.wiktionary.org',
  'enwikibooks': 'en.wikibooks.org',
  'enwikinews': 'en.wikinews.org',
  'enwikiquote': 'en.wikiquote.org',
  'enwikisource': 'en.wikisource.org',
  'enwikiversity': 'en.wikiversity.org',
  'enwikivoyage': 'en.wikivoyage.org',
  'eowiki': 'eo.wikipedia.org',
  'eowiktionary': 'eo.wiktionary.org',
  'eowikibooks': 'eo.wikibooks.org',
  'eowikinews': 'eo.wikinews.org',
  'eowikiquote': 'eo.wikiquote.org',
  'eowikisource': 'eo.wikisource.org',
  'eswiki': 'es.wikipedia.org',
  'eswiktionary': 'es.wiktionary.org',
  'eswikibooks': 'es.wikibooks.org',
  'eswikinews': 'es.wikinews.org',
  'eswikiquote': 'es.wikiquote.org',
  'eswikisource': 'es.wikisource.org',
  'eswikiversity': 'es.wikiversity.org',
  'eswikivoyage': 'es.wikivoyage.org',
  'etwiki': 'et.wikipedia.org',
  'etwiktionary': 'et.wiktionary.org',
  'etwikibooks': 'et.wikibooks.org',
  'etwikiquote': 'et.wikiquote.org',
  'etwikisource': 'et.wikisource.org',
  'euwiki': 'eu.wikipedia.org',
  'euwiktionary': 'eu.wiktionary.org',
  'euwikibooks': 'eu.wikibooks.org',
  'euwikiquote': 'eu.wikiquote.org',
  'extwiki': 'ext.wikipedia.org',
  'fawiki': 'fa.wikipedia.org',
  'fawiktionary': 'fa.wiktionary.org',
  'fawikibooks': 'fa.wikibooks.org',
  'fawikinews': 'fa.wikinews.org',
  'fawikiquote': 'fa.wikiquote.org',
  'fawikisource': 'fa.wikisource.org',
  'fawikivoyage': 'fa.wikivoyage.org',
  'ffwiki': 'ff.wikipedia.org',
  'fiwiki': 'fi.wikipedia.org',
  'fiwiktionary': 'fi.wiktionary.org',
  'fiwikibooks': 'fi.wikibooks.org',
  'fiwikinews': 'fi.wikinews.org',
  'fiwikiquote': 'fi.wikiquote.org',
  'fiwikisource': 'fi.wikisource.org',
  'fiwikiversity': 'fi.wikiversity.org',
  'fiu_vrowiki': 'fiu-vro.wikipedia.org',
  'fjwiki': 'fj.wikipedia.org',
  'fjwiktionary': 'fj.wiktionary.org',
  'fowiki': 'fo.wikipedia.org',
  'fowiktionary': 'fo.wiktionary.org',
  'fowikisource': 'fo.wikisource.org',
  'frwiki': 'fr.wikipedia.org',
  'frwiktionary': 'fr.wiktionary.org',
  'frwikibooks': 'fr.wikibooks.org',
  'frwikinews': 'fr.wikinews.org',
  'frwikiquote': 'fr.wikiquote.org',
  'frwikisource': 'fr.wikisource.org',
  'frwikiversity': 'fr.wikiversity.org',
  'frwikivoyage': 'fr.wikivoyage.org',
  'frpwiki': 'frp.wikipedia.org',
  'frrwiki': 'frr.wikipedia.org',
  'furwiki': 'fur.wikipedia.org',
  'fywiki': 'fy.wikipedia.org',
  'fywiktionary': 'fy.wiktionary.org',
  'fywikibooks': 'fy.wikibooks.org',
  'gawiki': 'ga.wikipedia.org',
  'gawiktionary': 'ga.wiktionary.org',
  'gawikibooks': 'ga.wikibooks.org',
  'gawikiquote': 'ga.wikiquote.org',
  'gagwiki': 'gag.wikipedia.org',
  'ganwiki': 'gan.wikipedia.org',
  'gdwiki': 'gd.wikipedia.org',
  'gdwiktionary': 'gd.wiktionary.org',
  'glwiki': 'gl.wikipedia.org',
  'glwiktionary': 'gl.wiktionary.org',
  'glwikibooks': 'gl.wikibooks.org',
  'glwikiquote': 'gl.wikiquote.org',
  'glwikisource': 'gl.wikisource.org',
  'glkwiki': 'glk.wikipedia.org',
  'gnwiki': 'gn.wikipedia.org',
  'gnwiktionary': 'gn.wiktionary.org',
  'gnwikibooks': 'gn.wikibooks.org',
  'gomwiki': 'gom.wikipedia.org',
  'gotwiki': 'got.wikipedia.org',
  'gotwikibooks': 'got.wikibooks.org',
  'guwiki': 'gu.wikipedia.org',
  'guwiktionary': 'gu.wiktionary.org',
  'guwikibooks': 'gu.wikibooks.org',
  'guwikiquote': 'gu.wikiquote.org',
  'guwikisource': 'gu.wikisource.org',
  'gvwiki': 'gv.wikipedia.org',
  'gvwiktionary': 'gv.wiktionary.org',
  'hawiki': 'ha.wikipedia.org',
  'hawiktionary': 'ha.wiktionary.org',
  'hakwiki': 'hak.wikipedia.org',
  'hawwiki': 'haw.wikipedia.org',
  'hewiki': 'he.wikipedia.org',
  'hewiktionary': 'he.wiktionary.org',
  'hewikibooks': 'he.wikibooks.org',
  'hewikinews': 'he.wikinews.org',
  'hewikiquote': 'he.wikiquote.org',
  'hewikisource': 'he.wikisource.org',
  'hewikivoyage': 'he.wikivoyage.org',
  'hiwiki': 'hi.wikipedia.org',
  'hiwiktionary': 'hi.wiktionary.org',
  'hiwikibooks': 'hi.wikibooks.org',
  'hiwikiquote': 'hi.wikiquote.org',
  'hifwiki': 'hif.wikipedia.org',
  'howiki': 'ho.wikipedia.org',
  'hrwiki': 'hr.wikipedia.org',
  'hrwiktionary': 'hr.wiktionary.org',
  'hrwikibooks': 'hr.wikibooks.org',
  'hrwikiquote': 'hr.wikiquote.org',
  'hrwikisource': 'hr.wikisource.org',
  'hsbwiki': 'hsb.wikipedia.org',
  'hsbwiktionary': 'hsb.wiktionary.org',
  'htwiki': 'ht.wikipedia.org',
  'htwikisource': 'ht.wikisource.org',
  'huwiki': 'hu.wikipedia.org',
  'huwiktionary': 'hu.wiktionary.org',
  'huwikibooks': 'hu.wikibooks.org',
  'huwikinews': 'hu.wikinews.org',
  'huwikiquote': 'hu.wikiquote.org',
  'huwikisource': 'hu.wikisource.org',
  'hywiki': 'hy.wikipedia.org',
  'hywiktionary': 'hy.wiktionary.org',
  'hywikibooks': 'hy.wikibooks.org',
  'hywikiquote': 'hy.wikiquote.org',
  'hywikisource': 'hy.wikisource.org',
  'hzwiki': 'hz.wikipedia.org',
  'iawiki': 'ia.wikipedia.org',
  'iawiktionary': 'ia.wiktionary.org',
  'iawikibooks': 'ia.wikibooks.org',
  'idwiki': 'id.wikipedia.org',
  'idwiktionary': 'id.wiktionary.org',
  'idwikibooks': 'id.wikibooks.org',
  'idwikiquote': 'id.wikiquote.org',
  'idwikisource': 'id.wikisource.org',
  'iewiki': 'ie.wikipedia.org',
  'iewiktionary': 'ie.wiktionary.org',
  'iewikibooks': 'ie.wikibooks.org',
  'igwiki': 'ig.wikipedia.org',
  'iiwiki': 'ii.wikipedia.org',
  'ikwiki': 'ik.wikipedia.org',
  'ikwiktionary': 'ik.wiktionary.org',
  'ilowiki': 'ilo.wikipedia.org',
  'iowiki': 'io.wikipedia.org',
  'iowiktionary': 'io.wiktionary.org',
  'iswiki': 'is.wikipedia.org',
  'iswiktionary': 'is.wiktionary.org',
  'iswikibooks': 'is.wikibooks.org',
  'iswikiquote': 'is.wikiquote.org',
  'iswikisource': 'is.wikisource.org',
  'itwiki': 'it.wikipedia.org',
  'itwiktionary': 'it.wiktionary.org',
  'itwikibooks': 'it.wikibooks.org',
  'itwikinews': 'it.wikinews.org',
  'itwikiquote': 'it.wikiquote.org',
  'itwikisource': 'it.wikisource.org',
  'itwikiversity': 'it.wikiversity.org',
  'itwikivoyage': 'it.wikivoyage.org',
  'iuwiki': 'iu.wikipedia.org',
  'iuwiktionary': 'iu.wiktionary.org',
  'jawiki': 'ja.wikipedia.org',
  'jawiktionary': 'ja.wiktionary.org',
  'jawikibooks': 'ja.wikibooks.org',
  'jawikinews': 'ja.wikinews.org',
  'jawikiquote': 'ja.wikiquote.org',
  'jawikisource': 'ja.wikisource.org',
  'jawikiversity': 'ja.wikiversity.org',
  'jbowiki': 'jbo.wikipedia.org',
  'jbowiktionary': 'jbo.wiktionary.org',
  'jvwiki': 'jv.wikipedia.org',
  'jvwiktionary': 'jv.wiktionary.org',
  'kawiki': 'ka.wikipedia.org',
  'kawiktionary': 'ka.wiktionary.org',
  'kawikibooks': 'ka.wikibooks.org',
  'kawikiquote': 'ka.wikiquote.org',
  'kaawiki': 'kaa.wikipedia.org',
  'kabwiki': 'kab.wikipedia.org',
  'kbdwiki': 'kbd.wikipedia.org',
  'kgwiki': 'kg.wikipedia.org',
  'kiwiki': 'ki.wikipedia.org',
  'kjwiki': 'kj.wikipedia.org',
  'kkwiki': 'kk.wikipedia.org',
  'kkwiktionary': 'kk.wiktionary.org',
  'kkwikibooks': 'kk.wikibooks.org',
  'kkwikiquote': 'kk.wikiquote.org',
  'klwiki': 'kl.wikipedia.org',
  'klwiktionary': 'kl.wiktionary.org',
  'kmwiki': 'km.wikipedia.org',
  'kmwiktionary': 'km.wiktionary.org',
  'kmwikibooks': 'km.wikibooks.org',
  'knwiki': 'kn.wikipedia.org',
  'knwiktionary': 'kn.wiktionary.org',
  'knwikibooks': 'kn.wikibooks.org',
  'knwikiquote': 'kn.wikiquote.org',
  'knwikisource': 'kn.wikisource.org',
  'kowiki': 'ko.wikipedia.org',
  'kowiktionary': 'ko.wiktionary.org',
  'kowikibooks': 'ko.wikibooks.org',
  'kowikinews': 'ko.wikinews.org',
  'kowikiquote': 'ko.wikiquote.org',
  'kowikisource': 'ko.wikisource.org',
  'kowikiversity': 'ko.wikiversity.org',
  'koiwiki': 'koi.wikipedia.org',
  'krwiki': 'kr.wikipedia.org',
  'krwikiquote': 'kr.wikiquote.org',
  'krcwiki': 'krc.wikipedia.org',
  'kswiki': 'ks.wikipedia.org',
  'kswiktionary': 'ks.wiktionary.org',
  'kswikibooks': 'ks.wikibooks.org',
  'kswikiquote': 'ks.wikiquote.org',
  'kshwiki': 'ksh.wikipedia.org',
  'kuwiki': 'ku.wikipedia.org',
  'kuwiktionary': 'ku.wiktionary.org',
  'kuwikibooks': 'ku.wikibooks.org',
  'kuwikiquote': 'ku.wikiquote.org',
  'kvwiki': 'kv.wikipedia.org',
  'kwwiki': 'kw.wikipedia.org',
  'kwwiktionary': 'kw.wiktionary.org',
  'kwwikiquote': 'kw.wikiquote.org',
  'kywiki': 'ky.wikipedia.org',
  'kywiktionary': 'ky.wiktionary.org',
  'kywikibooks': 'ky.wikibooks.org',
  'kywikiquote': 'ky.wikiquote.org',
  'lawiki': 'la.wikipedia.org',
  'lawiktionary': 'la.wiktionary.org',
  'lawikibooks': 'la.wikibooks.org',
  'lawikiquote': 'la.wikiquote.org',
  'lawikisource': 'la.wikisource.org',
  'ladwiki': 'lad.wikipedia.org',
  'lbwiki': 'lb.wikipedia.org',
  'lbwiktionary': 'lb.wiktionary.org',
  'lbwikibooks': 'lb.wikibooks.org',
  'lbwikiquote': 'lb.wikiquote.org',
  'lbewiki': 'lbe.wikipedia.org',
  'lezwiki': 'lez.wikipedia.org',
  'lgwiki': 'lg.wikipedia.org',
  'liwiki': 'li.wikipedia.org',
  'liwiktionary': 'li.wiktionary.org',
  'liwikibooks': 'li.wikibooks.org',
  'liwikiquote': 'li.wikiquote.org',
  'liwikisource': 'li.wikisource.org',
  'lijwiki': 'lij.wikipedia.org',
  'lmowiki': 'lmo.wikipedia.org',
  'lnwiki': 'ln.wikipedia.org',
  'lnwiktionary': 'ln.wiktionary.org',
  'lnwikibooks': 'ln.wikibooks.org',
  'lowiki': 'lo.wikipedia.org',
  'lowiktionary': 'lo.wiktionary.org',
  'lrcwiki': 'lrc.wikipedia.org',
  'ltwiki': 'lt.wikipedia.org',
  'ltwiktionary': 'lt.wiktionary.org',
  'ltwikibooks': 'lt.wikibooks.org',
  'ltwikiquote': 'lt.wikiquote.org',
  'ltwikisource': 'lt.wikisource.org',
  'ltgwiki': 'ltg.wikipedia.org',
  'lvwiki': 'lv.wikipedia.org',
  'lvwiktionary': 'lv.wiktionary.org',
  'lvwikibooks': 'lv.wikibooks.org',
  'maiwiki': 'mai.wikipedia.org',
  'map_bmswiki': 'map-bms.wikipedia.org',
  'mdfwiki': 'mdf.wikipedia.org',
  'mgwiki': 'mg.wikipedia.org',
  'mgwiktionary': 'mg.wiktionary.org',
  'mgwikibooks': 'mg.wikibooks.org',
  'mhwiki': 'mh.wikipedia.org',
  'mhwiktionary': 'mh.wiktionary.org',
  'mhrwiki': 'mhr.wikipedia.org',
  'miwiki': 'mi.wikipedia.org',
  'miwiktionary': 'mi.wiktionary.org',
  'miwikibooks': 'mi.wikibooks.org',
  'minwiki': 'min.wikipedia.org',
  'mkwiki': 'mk.wikipedia.org',
  'mkwiktionary': 'mk.wiktionary.org',
  'mkwikibooks': 'mk.wikibooks.org',
  'mkwikisource': 'mk.wikisource.org',
  'mlwiki': 'ml.wikipedia.org',
  'mlwiktionary': 'ml.wiktionary.org',
  'mlwikibooks': 'ml.wikibooks.org',
  'mlwikiquote': 'ml.wikiquote.org',
  'mlwikisource': 'ml.wikisource.org',
  'mnwiki': 'mn.wikipedia.org',
  'mnwiktionary': 'mn.wiktionary.org',
  'mnwikibooks': 'mn.wikibooks.org',
  'mowiki': 'mo.wikipedia.org',
  'mowiktionary': 'mo.wiktionary.org',
  'mrwiki': 'mr.wikipedia.org',
  'mrwiktionary': 'mr.wiktionary.org',
  'mrwikibooks': 'mr.wikibooks.org',
  'mrwikiquote': 'mr.wikiquote.org',
  'mrwikisource': 'mr.wikisource.org',
  'mrjwiki': 'mrj.wikipedia.org',
  'mswiki': 'ms.wikipedia.org',
  'mswiktionary': 'ms.wiktionary.org',
  'mswikibooks': 'ms.wikibooks.org',
  'mtwiki': 'mt.wikipedia.org',
  'mtwiktionary': 'mt.wiktionary.org',
  'muswiki': 'mus.wikipedia.org',
  'mwlwiki': 'mwl.wikipedia.org',
  'mywiki': 'my.wikipedia.org',
  'mywiktionary': 'my.wiktionary.org',
  'mywikibooks': 'my.wikibooks.org',
  'myvwiki': 'myv.wikipedia.org',
  'mznwiki': 'mzn.wikipedia.org',
  'nawiki': 'na.wikipedia.org',
  'nawiktionary': 'na.wiktionary.org',
  'nawikibooks': 'na.wikibooks.org',
  'nawikiquote': 'na.wikiquote.org',
  'nahwiki': 'nah.wikipedia.org',
  'nahwiktionary': 'nah.wiktionary.org',
  'nahwikibooks': 'nah.wikibooks.org',
  'napwiki': 'nap.wikipedia.org',
  'ndswiki': 'nds.wikipedia.org',
  'ndswiktionary': 'nds.wiktionary.org',
  'ndswikibooks': 'nds.wikibooks.org',
  'ndswikiquote': 'nds.wikiquote.org',
  'nds_nlwiki': 'nds-nl.wikipedia.org',
  'newiki': 'ne.wikipedia.org',
  'newiktionary': 'ne.wiktionary.org',
  'newikibooks': 'ne.wikibooks.org',
  'newwiki': 'new.wikipedia.org',
  'ngwiki': 'ng.wikipedia.org',
  'nlwiki': 'nl.wikipedia.org',
  'nlwiktionary': 'nl.wiktionary.org',
  'nlwikibooks': 'nl.wikibooks.org',
  'nlwikinews': 'nl.wikinews.org',
  'nlwikiquote': 'nl.wikiquote.org',
  'nlwikisource': 'nl.wikisource.org',
  'nlwikivoyage': 'nl.wikivoyage.org',
  'nnwiki': 'nn.wikipedia.org',
  'nnwiktionary': 'nn.wiktionary.org',
  'nnwikiquote': 'nn.wikiquote.org',
  'nowiki': 'no.wikipedia.org',
  'nowiktionary': 'no.wiktionary.org',
  'nowikibooks': 'no.wikibooks.org',
  'nowikinews': 'no.wikinews.org',
  'nowikiquote': 'no.wikiquote.org',
  'nowikisource': 'no.wikisource.org',
  'novwiki': 'nov.wikipedia.org',
  'nrmwiki': 'nrm.wikipedia.org',
  'nsowiki': 'nso.wikipedia.org',
  'nvwiki': 'nv.wikipedia.org',
  'nywiki': 'ny.wikipedia.org',
  'ocwiki': 'oc.wikipedia.org',
  'ocwiktionary': 'oc.wiktionary.org',
  'ocwikibooks': 'oc.wikibooks.org',
  'omwiki': 'om.wikipedia.org',
  'omwiktionary': 'om.wiktionary.org',
  'orwiki': 'or.wikipedia.org',
  'orwiktionary': 'or.wiktionary.org',
  'orwikisource': 'or.wikisource.org',
  'oswiki': 'os.wikipedia.org',
  'pawiki': 'pa.wikipedia.org',
  'pawiktionary': 'pa.wiktionary.org',
  'pawikibooks': 'pa.wikibooks.org',
  'pagwiki': 'pag.wikipedia.org',
  'pamwiki': 'pam.wikipedia.org',
  'papwiki': 'pap.wikipedia.org',
  'pcdwiki': 'pcd.wikipedia.org',
  'pdcwiki': 'pdc.wikipedia.org',
  'pflwiki': 'pfl.wikipedia.org',
  'piwiki': 'pi.wikipedia.org',
  'piwiktionary': 'pi.wiktionary.org',
  'pihwiki': 'pih.wikipedia.org',
  'plwiki': 'pl.wikipedia.org',
  'plwiktionary': 'pl.wiktionary.org',
  'plwikibooks': 'pl.wikibooks.org',
  'plwikinews': 'pl.wikinews.org',
  'plwikiquote': 'pl.wikiquote.org',
  'plwikisource': 'pl.wikisource.org',
  'plwikivoyage': 'pl.wikivoyage.org',
  'pmswiki': 'pms.wikipedia.org',
  'pnbwiki': 'pnb.wikipedia.org',
  'pnbwiktionary': 'pnb.wiktionary.org',
  'pntwiki': 'pnt.wikipedia.org',
  'pswiki': 'ps.wikipedia.org',
  'pswiktionary': 'ps.wiktionary.org',
  'pswikibooks': 'ps.wikibooks.org',
  'ptwiki': 'pt.wikipedia.org',
  'ptwiktionary': 'pt.wiktionary.org',
  'ptwikibooks': 'pt.wikibooks.org',
  'ptwikinews': 'pt.wikinews.org',
  'ptwikiquote': 'pt.wikiquote.org',
  'ptwikisource': 'pt.wikisource.org',
  'ptwikiversity': 'pt.wikiversity.org',
  'ptwikivoyage': 'pt.wikivoyage.org',
  'quwiki': 'qu.wikipedia.org',
  'quwiktionary': 'qu.wiktionary.org',
  'quwikibooks': 'qu.wikibooks.org',
  'quwikiquote': 'qu.wikiquote.org',
  'rmwiki': 'rm.wikipedia.org',
  'rmwiktionary': 'rm.wiktionary.org',
  'rmwikibooks': 'rm.wikibooks.org',
  'rmywiki': 'rmy.wikipedia.org',
  'rnwiki': 'rn.wikipedia.org',
  'rnwiktionary': 'rn.wiktionary.org',
  'rowiki': 'ro.wikipedia.org',
  'rowiktionary': 'ro.wiktionary.org',
  'rowikibooks': 'ro.wikibooks.org',
  'rowikinews': 'ro.wikinews.org',
  'rowikiquote': 'ro.wikiquote.org',
  'rowikisource': 'ro.wikisource.org',
  'rowikivoyage': 'ro.wikivoyage.org',
  'roa_rupwiki': 'roa-rup.wikipedia.org',
  'roa_rupwiktionary': 'roa-rup.wiktionary.org',
  'roa_tarawiki': 'roa-tara.wikipedia.org',
  'ruwiki': 'ru.wikipedia.org',
  'ruwiktionary': 'ru.wiktionary.org',
  'ruwikibooks': 'ru.wikibooks.org',
  'ruwikinews': 'ru.wikinews.org',
  'ruwikiquote': 'ru.wikiquote.org',
  'ruwikisource': 'ru.wikisource.org',
  'ruwikiversity': 'ru.wikiversity.org',
  'ruwikivoyage': 'ru.wikivoyage.org',
  'ruewiki': 'rue.wikipedia.org',
  'rwwiki': 'rw.wikipedia.org',
  'rwwiktionary': 'rw.wiktionary.org',
  'sawiki': 'sa.wikipedia.org',
  'sawiktionary': 'sa.wiktionary.org',
  'sawikibooks': 'sa.wikibooks.org',
  'sawikiquote': 'sa.wikiquote.org',
  'sawikisource': 'sa.wikisource.org',
  'sahwiki': 'sah.wikipedia.org',
  'sahwikisource': 'sah.wikisource.org',
  'scwiki': 'sc.wikipedia.org',
  'scwiktionary': 'sc.wiktionary.org',
  'scnwiki': 'scn.wikipedia.org',
  'scnwiktionary': 'scn.wiktionary.org',
  'scowiki': 'sco.wikipedia.org',
  'sdwiki': 'sd.wikipedia.org',
  'sdwiktionary': 'sd.wiktionary.org',
  'sdwikinews': 'sd.wikinews.org',
  'sewiki': 'se.wikipedia.org',
  'sewikibooks': 'se.wikibooks.org',
  'sgwiki': 'sg.wikipedia.org',
  'sgwiktionary': 'sg.wiktionary.org',
  'shwiki': 'sh.wikipedia.org',
  'shwiktionary': 'sh.wiktionary.org',
  'siwiki': 'si.wikipedia.org',
  'siwiktionary': 'si.wiktionary.org',
  'siwikibooks': 'si.wikibooks.org',
  'simplewiki': 'simple.wikipedia.org',
  'simplewiktionary': 'simple.wiktionary.org',
  'simplewikibooks': 'simple.wikibooks.org',
  'simplewikiquote': 'simple.wikiquote.org',
  'skwiki': 'sk.wikipedia.org',
  'skwiktionary': 'sk.wiktionary.org',
  'skwikibooks': 'sk.wikibooks.org',
  'skwikiquote': 'sk.wikiquote.org',
  'skwikisource': 'sk.wikisource.org',
  'slwiki': 'sl.wikipedia.org',
  'slwiktionary': 'sl.wiktionary.org',
  'slwikibooks': 'sl.wikibooks.org',
  'slwikiquote': 'sl.wikiquote.org',
  'slwikisource': 'sl.wikisource.org',
  'slwikiversity': 'sl.wikiversity.org',
  'smwiki': 'sm.wikipedia.org',
  'smwiktionary': 'sm.wiktionary.org',
  'snwiki': 'sn.wikipedia.org',
  'snwiktionary': 'sn.wiktionary.org',
  'sowiki': 'so.wikipedia.org',
  'sowiktionary': 'so.wiktionary.org',
  'sqwiki': 'sq.wikipedia.org',
  'sqwiktionary': 'sq.wiktionary.org',
  'sqwikibooks': 'sq.wikibooks.org',
  'sqwikinews': 'sq.wikinews.org',
  'sqwikiquote': 'sq.wikiquote.org',
  'srwiki': 'sr.wikipedia.org',
  'srwiktionary': 'sr.wiktionary.org',
  'srwikibooks': 'sr.wikibooks.org',
  'srwikinews': 'sr.wikinews.org',
  'srwikiquote': 'sr.wikiquote.org',
  'srwikisource': 'sr.wikisource.org',
  'srnwiki': 'srn.wikipedia.org',
  'sswiki': 'ss.wikipedia.org',
  'sswiktionary': 'ss.wiktionary.org',
  'stwiki': 'st.wikipedia.org',
  'stwiktionary': 'st.wiktionary.org',
  'stqwiki': 'stq.wikipedia.org',
  'suwiki': 'su.wikipedia.org',
  'suwiktionary': 'su.wiktionary.org',
  'suwikibooks': 'su.wikibooks.org',
  'suwikiquote': 'su.wikiquote.org',
  'svwiki': 'sv.wikipedia.org',
  'svwiktionary': 'sv.wiktionary.org',
  'svwikibooks': 'sv.wikibooks.org',
  'svwikinews': 'sv.wikinews.org',
  'svwikiquote': 'sv.wikiquote.org',
  'svwikisource': 'sv.wikisource.org',
  'svwikiversity': 'sv.wikiversity.org',
  'svwikivoyage': 'sv.wikivoyage.org',
  'swwiki': 'sw.wikipedia.org',
  'swwiktionary': 'sw.wiktionary.org',
  'swwikibooks': 'sw.wikibooks.org',
  'szlwiki': 'szl.wikipedia.org',
  'tawiki': 'ta.wikipedia.org',
  'tawiktionary': 'ta.wiktionary.org',
  'tawikibooks': 'ta.wikibooks.org',
  'tawikinews': 'ta.wikinews.org',
  'tawikiquote': 'ta.wikiquote.org',
  'tawikisource': 'ta.wikisource.org',
  'tewiki': 'te.wikipedia.org',
  'tewiktionary': 'te.wiktionary.org',
  'tewikibooks': 'te.wikibooks.org',
  'tewikiquote': 'te.wikiquote.org',
  'tewikisource': 'te.wikisource.org',
  'tetwiki': 'tet.wikipedia.org',
  'tgwiki': 'tg.wikipedia.org',
  'tgwiktionary': 'tg.wiktionary.org',
  'tgwikibooks': 'tg.wikibooks.org',
  'thwiki': 'th.wikipedia.org',
  'thwiktionary': 'th.wiktionary.org',
  'thwikibooks': 'th.wikibooks.org',
  'thwikinews': 'th.wikinews.org',
  'thwikiquote': 'th.wikiquote.org',
  'thwikisource': 'th.wikisource.org',
  'tiwiki': 'ti.wikipedia.org',
  'tiwiktionary': 'ti.wiktionary.org',
  'tkwiki': 'tk.wikipedia.org',
  'tkwiktionary': 'tk.wiktionary.org',
  'tkwikibooks': 'tk.wikibooks.org',
  'tkwikiquote': 'tk.wikiquote.org',
  'tlwiki': 'tl.wikipedia.org',
  'tlwiktionary': 'tl.wiktionary.org',
  'tlwikibooks': 'tl.wikibooks.org',
  'tnwiki': 'tn.wikipedia.org',
  'tnwiktionary': 'tn.wiktionary.org',
  'towiki': 'to.wikipedia.org',
  'towiktionary': 'to.wiktionary.org',
  'tpiwiki': 'tpi.wikipedia.org',
  'tpiwiktionary': 'tpi.wiktionary.org',
  'trwiki': 'tr.wikipedia.org',
  'trwiktionary': 'tr.wiktionary.org',
  'trwikibooks': 'tr.wikibooks.org',
  'trwikinews': 'tr.wikinews.org',
  'trwikiquote': 'tr.wikiquote.org',
  'trwikisource': 'tr.wikisource.org',
  'tswiki': 'ts.wikipedia.org',
  'tswiktionary': 'ts.wiktionary.org',
  'ttwiki': 'tt.wikipedia.org',
  'ttwiktionary': 'tt.wiktionary.org',
  'ttwikibooks': 'tt.wikibooks.org',
  'ttwikiquote': 'tt.wikiquote.org',
  'tumwiki': 'tum.wikipedia.org',
  'twwiki': 'tw.wikipedia.org',
  'twwiktionary': 'tw.wiktionary.org',
  'tywiki': 'ty.wikipedia.org',
  'tyvwiki': 'tyv.wikipedia.org',
  'udmwiki': 'udm.wikipedia.org',
  'ugwiki': 'ug.wikipedia.org',
  'ugwiktionary': 'ug.wiktionary.org',
  'ugwikibooks': 'ug.wikibooks.org',
  'ugwikiquote': 'ug.wikiquote.org',
  'ukwiki': 'uk.wikipedia.org',
  'ukwiktionary': 'uk.wiktionary.org',
  'ukwikibooks': 'uk.wikibooks.org',
  'ukwikinews': 'uk.wikinews.org',
  'ukwikiquote': 'uk.wikiquote.org',
  'ukwikisource': 'uk.wikisource.org',
  'ukwikivoyage': 'uk.wikivoyage.org',
  'urwiki': 'ur.wikipedia.org',
  'urwiktionary': 'ur.wiktionary.org',
  'urwikibooks': 'ur.wikibooks.org',
  'urwikiquote': 'ur.wikiquote.org',
  'uzwiki': 'uz.wikipedia.org',
  'uzwiktionary': 'uz.wiktionary.org',
  'uzwikibooks': 'uz.wikibooks.org',
  'uzwikiquote': 'uz.wikiquote.org',
  'vewiki': 've.wikipedia.org',
  'vecwiki': 'vec.wikipedia.org',
  'vecwiktionary': 'vec.wiktionary.org',
  'vecwikisource': 'vec.wikisource.org',
  'vepwiki': 'vep.wikipedia.org',
  'viwiki': 'vi.wikipedia.org',
  'viwiktionary': 'vi.wiktionary.org',
  'viwikibooks': 'vi.wikibooks.org',
  'viwikiquote': 'vi.wikiquote.org',
  'viwikisource': 'vi.wikisource.org',
  'viwikivoyage': 'vi.wikivoyage.org',
  'vlswiki': 'vls.wikipedia.org',
  'vowiki': 'vo.wikipedia.org',
  'vowiktionary': 'vo.wiktionary.org',
  'vowikibooks': 'vo.wikibooks.org',
  'vowikiquote': 'vo.wikiquote.org',
  'wawiki': 'wa.wikipedia.org',
  'wawiktionary': 'wa.wiktionary.org',
  'wawikibooks': 'wa.wikibooks.org',
  'warwiki': 'war.wikipedia.org',
  'wowiki': 'wo.wikipedia.org',
  'wowiktionary': 'wo.wiktionary.org',
  'wowikiquote': 'wo.wikiquote.org',
  'wuuwiki': 'wuu.wikipedia.org',
  'xalwiki': 'xal.wikipedia.org',
  'xhwiki': 'xh.wikipedia.org',
  'xhwiktionary': 'xh.wiktionary.org',
  'xhwikibooks': 'xh.wikibooks.org',
  'xmfwiki': 'xmf.wikipedia.org',
  'yiwiki': 'yi.wikipedia.org',
  'yiwiktionary': 'yi.wiktionary.org',
  'yiwikisource': 'yi.wikisource.org',
  'yowiki': 'yo.wikipedia.org',
  'yowiktionary': 'yo.wiktionary.org',
  'yowikibooks': 'yo.wikibooks.org',
  'zawiki': 'za.wikipedia.org',
  'zawiktionary': 'za.wiktionary.org',
  'zawikibooks': 'za.wikibooks.org',
  'zawikiquote': 'za.wikiquote.org',
  'zeawiki': 'zea.wikipedia.org',
  'zhwiki': 'zh.wikipedia.org',
  'zhwiktionary': 'zh.wiktionary.org',
  'zhwikibooks': 'zh.wikibooks.org',
  'zhwikinews': 'zh.wikinews.org',
  'zhwikiquote': 'zh.wikiquote.org',
  'zhwikisource': 'zh.wikisource.org',
  'zhwikivoyage': 'zh.wikivoyage.org',
  'zh_classicalwiki': 'zh-classical.wikipedia.org',
  'zh_min_nanwiki': 'zh-min-nan.wikipedia.org',
  'zh_min_nanwiktionary': 'zh-min-nan.wiktionary.org',
  'zh_min_nanwikibooks': 'zh-min-nan.wikibooks.org',
  'zh_min_nanwikiquote': 'zh-min-nan.wikiquote.org',
  'zh_min_nanwikisource': 'zh-min-nan.wikisource.org',
  'zh_yuewiki': 'zh-yue.wikipedia.org',
  'zuwiki': 'zu.wikipedia.org',
  'zuwiktionary': 'zu.wiktionary.org',
  'zuwikibooks': 'zu.wikibooks.org',
  'advisorywiki': 'advisory.wikimedia.org',
  'arwikimedia': 'ar.wikimedia.org',
  'arbcom_dewiki': 'arbcom-de.wikipedia.org',
  'arbcom_enwiki': 'arbcom-en.wikipedia.org',
  'arbcom_fiwiki': 'arbcom-fi.wikipedia.org',
  'arbcom_nlwiki': 'arbcom-nl.wikipedia.org',
  'auditcomwiki': 'auditcom.wikimedia.org',
  'bdwikimedia': 'bd.wikimedia.org',
  'bewikimedia': 'be.wikimedia.org',
  'betawikiversity': 'beta.wikiversity.org',
  'boardwiki': 'board.wikimedia.org',
  'boardgovcomwiki': 'boardgovcom.wikimedia.org',
  'brwikimedia': 'br.wikimedia.org',
  'cawikimedia': 'ca.wikimedia.org',
  'chairwiki': 'chair.wikimedia.org',
  'chapcomwiki': 'affcom.wikimedia.org',
  'checkuserwiki': 'checkuser.wikimedia.org',
  'cnwikimedia': 'cn.wikimedia.org',
  'cowikimedia': 'co.wikimedia.org',
  'collabwiki': 'collab.wikimedia.org',
  'commonswiki': 'commons.wikimedia.org',
  'dkwikimedia': 'dk.wikimedia.org',
  'donatewiki': 'donate.wikimedia.org',
  'etwikimedia': 'ee.wikimedia.org',
  'execwiki': 'exec.wikimedia.org',
  'fdcwiki': 'fdc.wikimedia.org',
  'fiwikimedia': 'fi.wikimedia.org',
  'foundationwiki': 'wikimediafoundation.org',
  'grantswiki': 'grants.wikimedia.org',
  'iegcomwiki': 'iegcom.wikimedia.org',
  'ilwikimedia': 'il.wikimedia.org',
  'incubatorwiki': 'incubator.wikimedia.org',
  'internalwiki': 'internal.wikimedia.org',
  'labswiki': 'wikitech.wikimedia.org',
  'labtestwiki': 'labtestwikitech.wikimedia.org',
  'legalteamwiki': 'legalteam.wikimedia.org',
  'loginwiki': 'login.wikimedia.org',
  'mediawikiwiki': 'mediawiki.org',
  'metawiki': 'meta.wikimedia.org',
  'mkwikimedia': 'mk.wikimedia.org',
  'movementroleswiki': 'movementroles.wikimedia.org',
  'mxwikimedia': 'mx.wikimedia.org',
  'nlwikimedia': 'nl.wikimedia.org',
  'nowikimedia': 'no.wikimedia.org',
  'noboard_chapterswikimedia': 'noboard-chapters.wikimedia.org',
  'nostalgiawiki': 'nostalgia.wikipedia.org',
  'nycwikimedia': 'nyc.wikimedia.org',
  'nzwikimedia': 'nz.wikimedia.org',
  'officewiki': 'office.wikimedia.org',
  'ombudsmenwiki': 'ombudsmen.wikimedia.org',
  'otrs_wikiwiki': 'otrs-wiki.wikimedia.org',
  'outreachwiki': 'outreach.wikimedia.org',
  'pa_uswikimedia': 'pa-us.wikimedia.org',
  'plwikimedia': 'pl.wikimedia.org',
  'qualitywiki': 'quality.wikimedia.org',
  'rswikimedia': 'rs.wikimedia.org',
  'ruwikimedia': 'ru.wikimedia.org',
  'sewikimedia': 'se.wikimedia.org',
  'searchcomwiki': 'searchcom.wikimedia.org',
  'sourceswiki': 'wikisource.org',
  'spcomwiki': 'spcom.wikimedia.org',
  'specieswiki': 'species.wikimedia.org',
  'stewardwiki': 'steward.wikimedia.org',
  'strategywiki': 'strategy.wikimedia.org',
  'tenwiki': 'ten.wikipedia.org',
  'testwiki': 'test.wikipedia.org',
  'test2wiki': 'test2.wikipedia.org',
  'testwikidatawiki': 'test.wikidata.org',
  'trwikimedia': 'tr.wikimedia.org',
  'transitionteamwiki': 'transitionteam.wikimedia.org',
  'uawikimedia': 'ua.wikimedia.org',
  'ukwikimedia': 'uk.wikimedia.org',
  'usabilitywiki': 'usability.wikimedia.org',
  'votewiki': 'vote.wikimedia.org',
  'wg_enwiki': 'wg-en.wikipedia.org',
  'wikidatawiki': 'wikidata.org',
  'wikimania2005wiki': 'wikimania2005.wikimedia.org',
  'wikimania2006wiki': 'wikimania2006.wikimedia.org',
  'wikimania2007wiki': 'wikimania2007.wikimedia.org',
  'wikimania2008wiki': 'wikimania2008.wikimedia.org',
  'wikimania2009wiki': 'wikimania2009.wikimedia.org',
  'wikimania2010wiki': 'wikimania2010.wikimedia.org',
  'wikimania2011wiki': 'wikimania2011.wikimedia.org',
  'wikimania2012wiki': 'wikimania2012.wikimedia.org',
  'wikimania2013wiki': 'wikimania2013.wikimedia.org',
  'wikimania2014wiki': 'wikimania2014.wikimedia.org',
  'wikimania2015wiki': 'wikimania2015.wikimedia.org',
  'wikimania2016wiki': 'wikimania2016.wikimedia.org',
  'wikimania2017wiki': 'wikimania2017.wikimedia.org',
  'wikimaniateamwiki': 'wikimaniateam.wikimedia.org',
  'zerowiki': 'zero.wikimedia.org'
};

module.exports = siteMap;

},{}],7:[function(require,module,exports){
/**
 * @file Templates used by Chart.js for Pageviews app
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

/**
 * Templates used by Chart.js.
 * Functions used within our app must be in the global scope.
 * All quotations must be double-quotes or properly escaped.
 * @type {Object}
 */
const templates = {
  chartLegend(scope) {
    const dataList = (entity, multiEntity = false) => {
      let editsLink;

      if (multiEntity) {
        editsLink = scope.formatNumber(entity.num_edits);
      } else {
        editsLink = `<a href="${ scope.getExpandedPageURL(entity.label) }&action=history" target="_blank" class="pull-right">
            ${ scope.formatNumber(entity.num_edits) }
          </a>`;
      }

      let infoHash = {
        'Pageviews': {
          'Pageviews': scope.formatNumber(entity.sum),
          'Daily average': scope.formatNumber(entity.average)
        },
        'Revisions': {
          'Edits': editsLink,
          'Editors': scope.formatNumber(entity.num_users)
        },
        'Basic information': {
          'Watchers': entity.watchers ? scope.formatNumber(entity.watchers) : $.i18n('unknown')
        }
      };

      if (!multiEntity) {
        Object.assign(infoHash['Basic information'], {
          'Size': entity.length ? scope.formatNumber(entity.length) : '',
          'Protection': entity.protection
        });
      }

      let markup = '';

      for (let block in infoHash) {
        markup += `<div class='legend-block'><h5>${ block }</h5><hr/>`;
        for (let key in infoHash[block]) {
          const value = infoHash[block][key];
          if (!value) continue;
          markup += `
            <div class="linear-legend--counts">
              ${ key }:
              <span class='pull-right'>
                ${ value }
              </span>
            </div>`;
        }
        markup += '</div>';
      }

      if (!multiEntity) {
        markup += `
          <div class="linear-legend--links">
            <a href="${ scope.getLangviewsURL(entity.label) }" target="_blank">${ $.i18n('all-languages') }</a>
            &bullet;
            <a href="${ scope.getRedirectviewsURL(entity.label) }" target="_blank">${ $.i18n('redirects') }</a>
          </div>`;
      }

      return markup;
    };

    // map out edit protection level for each entity
    const entities = scope.outputData.map(entity => {
      const protection = (entity.protection || []).find(prot => prot.type === 'edit');
      entity.protection = protection ? protection.level : $.i18n('none').toLowerCase();
      return entity;
    });

    if (scope.outputData.length === 1) {
      return dataList(entities[0]);
    }

    const sum = entities.reduce((a, b) => a + b.sum, 0);
    const totals = {
      sum,
      average: Math.round(sum / entities.length),
      num_edits: entities.reduce((a, b) => a + b.num_edits, 0),
      num_users: entities.reduce((a, b) => a + b.num_users, 0),
      watchers: entities.reduce((a, b) => a + b.watchers || 0, 0)
    };

    return dataList(totals, true);
  }
};

module.exports = templates;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9wYWdldmlld3MuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvY2hhcnRfaGVscGVycy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdi5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdl9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvc2l0ZV9tYXAuanMiLCJqYXZhc2NyaXB0cy90ZW1wbGF0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNNQSxNQUFNLFlBQVksUUFBUSxhQUFSLENBQWxCOzs7Ozs7O0FBT0EsTUFBTSxTQUFTO0FBQ2IsaUJBQWUsZUFERjtBQUViLFNBQU8sWUFGTTtBQUdiLGVBQWEsVUFBVSxXQUhWO0FBSWIscUJBQW1CLDBCQUpOO0FBS2IsWUFBVTtBQUNSLGVBQVc7QUFESCxHQUxHO0FBUWIsdUJBQXFCLDJCQVJSO0FBU2Isb0JBQWtCLGtCQVRMO0FBVWIsZ0JBQWMsb0JBVkQ7QUFXYixnQkFBYyx1QkFYRDtBQVliLGtCQUFnQixDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLE9BQXhCO0FBWkgsQ0FBZjs7QUFlQSxPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7Ozs7Ozs7O0FDcEJBLE1BQU0sU0FBUyxRQUFRLFVBQVIsQ0FBZjtBQUNBLE1BQU0sS0FBSyxRQUFRLGFBQVIsQ0FBWDtBQUNBLE1BQU0sZUFBZSxRQUFRLHdCQUFSLENBQXJCOzs7QUFHQSxNQUFNLFNBQU4sU0FBd0IsSUFBSSxFQUFKLEVBQVEsSUFBUixDQUFhLFlBQWIsQ0FBeEIsQ0FBbUQ7QUFDakQsZ0JBQWM7QUFDWixVQUFNLE1BQU47QUFDQSxTQUFLLEdBQUwsR0FBVyxXQUFYOztBQUVBLFNBQUssVUFBTCxHQUFrQixLQUFsQixDO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsU0FBSyxZ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QUFvQyxDQUFwQyxDQUFaO0FBQ0EsVUFBTSxTQUFTO0FBQ2IsU0FEYTtBQUViLGVBQVMsS0FBSyxLQUFMLENBQVcsTUFBTSxTQUFTLE1BQTFCLENBRkk7QUFHYixpQkFBVyxTQUFTLE1BQVQsQ0FBZ0IsQ0FBQyxDQUFELEVBQUksQ0FBSixLQUFVLElBQUksRUFBRSxTQUFoQyxFQUEyQyxDQUEzQyxDQUhFO0FBSWIsaUJBQVcsU0FBUyxNQUFULENBQWdCLENBQUMsQ0FBRCxFQUFJLENBQUosS0FBVSxJQUFJLEVBQUUsU0FBaEMsRUFBMkMsQ0FBM0MsQ0FKRTtBQUtiLGdCQUFVLFNBQVMsTUFBVCxDQUFnQixDQUFDLENBQUQsRUFBSSxDQUFKLEtBQVUsSUFBSSxFQUFFLFFBQU4sSUFBa0IsQ0FBNUMsRUFBK0MsQ0FBL0M7QUFMRyxLQUFmOztBQVFBLFdBQU8sU0FBUyxNQUFULEVBQWlCLElBQWpCLENBQVA7QUFDRDtBQXJGZSxDQUFsQjs7QUF3RkEsT0FBTyxPQUFQLEdBQWlCLFNBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGUgQ29uZmlndXJhdGlvbiBmb3IgUGFnZXZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqL1xuXG5jb25zdCB0ZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3RlbXBsYXRlcycpO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIFBhZ2V2aWV3cyBhcHBsaWNhdGlvbi5cbiAqIFRoaXMgaW5jbHVkZXMgc2VsZWN0b3JzLCBkZWZhdWx0cywgYW5kIG90aGVyIGNvbnN0YW50cyBzcGVjaWZpYyB0byBQYWdldmlld3NcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNvbmZpZyA9IHtcbiAgYWdlbnRTZWxlY3RvcjogJyNhZ2VudC1zZWxlY3QnLFxuICBjaGFydDogJy5hcXMtY2hhcnQnLFxuICBjaGFydExlZ2VuZDogdGVtcGxhdGVzLmNoYXJ0TGVnZW5kLFxuICBkYXRlUmFuZ2VTZWxlY3RvcjogJy5hcXMtZGF0ZS1yYW5nZS1zZWxlY3RvcicsXG4gIGRlZmF1bHRzOiB7XG4gICAgZGF0ZVJhbmdlOiAnbGF0ZXN0LTIwJ1xuICB9LFxuICBsb2dhcml0aG1pY0NoZWNrYm94OiAnLmxvZ2FyaXRobWljLXNjYWxlLW9wdGlvbicsXG4gIHBsYXRmb3JtU2VsZWN0b3I6ICcjcGxhdGZvcm0tc2VsZWN0JyxcbiAgcHJvamVjdElucHV0OiAnLmFxcy1wcm9qZWN0LWlucHV0JyxcbiAgc2VsZWN0MklucHV0OiAnLmFxcy1zZWxlY3QyLXNlbGVjdG9yJyxcbiAgdmFsaWRhdGVQYXJhbXM6IFsncHJvamVjdCcsICdwbGF0Zm9ybScsICdhZ2VudCddXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZztcbiIsIi8qKlxuICogUGFnZXZpZXdzIEFuYWx5c2lzIHRvb2xcbiAqIEBmaWxlIE1haW4gZmlsZSBmb3IgUGFnZXZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWxyZlxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWxyZlxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmNvbnN0IFB2ID0gcmVxdWlyZSgnLi9zaGFyZWQvcHYnKTtcbmNvbnN0IENoYXJ0SGVscGVycyA9IHJlcXVpcmUoJy4vc2hhcmVkL2NoYXJ0X2hlbHBlcnMnKTtcblxuLyoqIE1haW4gUGFnZVZpZXdzIGNsYXNzICovXG5jbGFzcyBQYWdlVmlld3MgZXh0ZW5kcyBtaXgoUHYpLndpdGgoQ2hhcnRIZWxwZXJzKSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgdGhpcy5hcHAgPSAncGFnZXZpZXdzJztcblxuICAgIHRoaXMuZW50aXR5SW5mbyA9IGZhbHNlOyAvKiogbGV0J3MgdXMga25vdyBpZiB3ZSd2ZSBnb3R0ZW4gdGhlIHBhZ2UgaW5mbyBmcm9tIEFQSSB5ZXQgKi9cbiAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IG51bGw7XG4gICAgdGhpcy5pbml0aWFsUXVlcnkgPSBmYWxzZTtcbiAgICB0aGlzLnNvcnQgPSAndGl0bGUnO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gJy0xJztcblxuICAgIC8qKlxuICAgICAqIFNlbGVjdDIgbGlicmFyeSBwcmludHMgXCJVbmNhdWdodCBUeXBlRXJyb3I6IFhZWiBpcyBub3QgYSBmdW5jdGlvblwiIGVycm9yc1xuICAgICAqIGNhdXNlZCBieSByYWNlIGNvbmRpdGlvbnMgYmV0d2VlbiBjb25zZWN1dGl2ZSBhamF4IGNhbGxzLiBUaGV5IGFyZSBhY3R1YWxseVxuICAgICAqIG5vdCBjcml0aWNhbCBhbmQgY2FuIGJlIGF2b2lkZWQgd2l0aCB0aGlzIGVtcHR5IGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHdpbmRvdy5hcnRpY2xlU3VnZ2VzdGlvbkNhbGxiYWNrID0gJC5ub29wO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGFwcGxpY2F0aW9uLlxuICAgKiBDYWxsZWQgaW4gYHB2LmpzYCBhZnRlciB0cmFuc2xhdGlvbnMgaGF2ZSBsb2FkZWRcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLnNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICAgIHRoaXMuc2V0dXBTZWxlY3QyQ29sb3JzKCk7XG4gICAgdGhpcy5wb3BQYXJhbXMoKTtcbiAgICB0aGlzLnNldHVwTGlzdGVuZXJzKCk7XG4gICAgdGhpcy51cGRhdGVJbnRlckFwcExpbmtzKCk7XG4gIH1cblxuICAvKipcbiAgICogUXVlcnkgbXVzaWthbmltYWwgQVBJIHRvIGdldCBlZGl0IGRhdGEgYWJvdXQgcGFnZSB3aXRoaW4gZGF0ZSByYW5nZVxuICAgKiBAcGFyYW0ge0FycmF5fSBwYWdlcyAtIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIGVkaXRpbmcgZGF0YVxuICAgKi9cbiAgZ2V0RWRpdERhdGEocGFnZXMpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICBpZiAobWV0YVJvb3QpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC8vJHttZXRhUm9vdH0vYXJ0aWNsZV9hbmFseXNpcy9iYXNpY19pbmZvYCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHBhZ2VzOiBwYWdlcy5qb2luKCd8JyksXG4gICAgICAgICAgcHJvamVjdDogdGhpcy5wcm9qZWN0LFxuICAgICAgICAgIHN0YXJ0OiB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gICAgICAgICAgZW5kOiB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4oZGF0YSA9PiBkZmQucmVzb2x2ZShkYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRmZC5yZXNvbHZlKHtcbiAgICAgICAgbnVtX2VkaXRzOiAwLFxuICAgICAgICBudW1fdXNlcnM6IDBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogTGluayB0byAvbGFuZ3ZpZXdzIGZvciBnaXZlbiBwYWdlIGFuZCBjaG9zZW4gZGF0ZXJhbmdlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSB0aXRsZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldExhbmd2aWV3c1VSTChwYWdlKSB7XG4gICAgcmV0dXJuIGAvbGFuZ3ZpZXdzPyR7JC5wYXJhbSh0aGlzLmdldFBhcmFtcygpKX0mcGFnZT0ke3BhZ2UucmVwbGFjZSgvWyYlXS9nLCBlc2NhcGUpLnNjb3JlKCl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rIHRvIC9yZWRpcmVjdHZpZXdzIGZvciBnaXZlbiBwYWdlIGFuZCBjaG9zZW4gZGF0ZXJhbmdlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSB0aXRsZVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldFJlZGlyZWN0dmlld3NVUkwocGFnZSkge1xuICAgIHJldHVybiBgL3JlZGlyZWN0dmlld3M/JHskLnBhcmFtKHRoaXMuZ2V0UGFyYW1zKCkpfSZwYWdlPSR7cGFnZS5yZXBsYWNlKC9bJiVdL2csIGVzY2FwZSkuc2NvcmUoKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdCBxdWVyeSBmb3IgQVBJIGJhc2VkIG9uIHdoYXQgdHlwZSBvZiBzZWFyY2ggd2UncmUgZG9pbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IHF1ZXJ5IC0gYXMgcmV0dXJuZWQgZnJvbSBTZWxlY3QyIGlucHV0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHF1ZXJ5IHBhcmFtcyB0byBiZSBoYW5kZWQgb2ZmIHRvIEFQSVxuICAgKi9cbiAgZ2V0U2VhcmNoUGFyYW1zKHF1ZXJ5KSB7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlID09PSAnYXV0b2NvbXBsZXRlJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICBsaXN0OiAncHJlZml4c2VhcmNoJyxcbiAgICAgICAgZm9ybWF0OiAnanNvbicsXG4gICAgICAgIHBzc2VhcmNoOiBxdWVyeSB8fCAnJyxcbiAgICAgICAgY2lycnVzVXNlQ29tcGxldGlvblN1Z2dlc3RlcjogJ3llcydcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ2F1dG9jb21wbGV0ZV9yZWRpcmVjdHMnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGdlbmVyYXRvcjogJ3ByZWZpeHNlYXJjaCcsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBncHNzZWFyY2g6IHF1ZXJ5IHx8ICcnLFxuICAgICAgICBncHNsaW1pdDogJzEwJyxcbiAgICAgICAgcmVkaXJlY3RzOiAndHJ1ZScsXG4gICAgICAgIGNpcnJ1c1VzZUNvbXBsZXRpb25TdWdnZXN0ZXI6ICdubydcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgVVJMIHF1ZXJ5IHN0cmluZyBhbmQgc2V0cyBhbGwgdGhlIGlucHV0cyBhY2NvcmRpbmdseVxuICAgKiBTaG91bGQgb25seSBiZSBjYWxsZWQgb24gaW5pdGlhbCBwYWdlIGxvYWQsIHVudGlsIHdlIGRlY2lkZSB0byBzdXBwb3J0IHBvcCBzdGF0ZXMgKHByb2JhYmx5IG5ldmVyKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcG9wUGFyYW1zKCkge1xuICAgIC8qKiBzaG93IGxvYWRpbmcgaW5kaWNhdG9yIGFuZCBhZGQgZXJyb3IgaGFuZGxpbmcgZm9yIHRpbWVvdXRzICovXG4gICAgc2V0VGltZW91dCh0aGlzLnN0YXJ0U3Bpbm55LmJpbmQodGhpcykpOyAvLyB1c2Ugc2V0VGltZW91dCB0byBmb3JjZSByZW5kZXJpbmcgdGhyZWFkcyB0byBjYXRjaCB1cFxuXG4gICAgbGV0IHBhcmFtcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoXG4gICAgICB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoJ3BhZ2VzJylcbiAgICApO1xuXG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbChwYXJhbXMucHJvamVjdCk7XG4gICAgJCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwocGFyYW1zLnBsYXRmb3JtKTtcbiAgICAkKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbChwYXJhbXMuYWdlbnQpO1xuXG4gICAgdGhpcy5wYXRjaFVzYWdlKCk7XG4gICAgdGhpcy52YWxpZGF0ZURhdGVSYW5nZShwYXJhbXMpO1xuXG4gICAgdGhpcy5yZXNldFNlbGVjdDIoKTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIFNlbGVjdDIgZGVmYXVsdHMsIHdoaWNoIHRyaWdnZXJzIHRoZSBTZWxlY3QyIGxpc3RlbmVyIGFuZCBjYWxscyB0aGlzLnByb2Nlc3NJbnB1dFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhZ2VzIC0gcGFnZXMgdG8gcXVlcnlcbiAgICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAgICovXG4gICAgY29uc3QgZ2V0UGFnZUluZm9BbmRTZXREZWZhdWx0cyA9IHBhZ2VzID0+IHtcbiAgICAgIHRoaXMuZ2V0UGFnZUFuZEVkaXRJbmZvKHBhZ2VzKS50aGVuKHBhZ2VJbmZvID0+IHtcbiAgICAgICAgdGhpcy5pbml0aWFsUXVlcnkgPSB0cnVlO1xuICAgICAgICBjb25zdCBub3JtYWxpemVkUGFnZU5hbWVzID0gT2JqZWN0LmtleXMocGFnZUluZm8pO1xuICAgICAgICB0aGlzLnNldFNlbGVjdDJEZWZhdWx0cyhcbiAgICAgICAgICB0aGlzLnVuZGVyc2NvcmVQYWdlTmFtZXMobm9ybWFsaXplZFBhZ2VOYW1lcylcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBzZXQgdXAgZGVmYXVsdCBwYWdlcyBpZiBub25lIHdlcmUgcGFzc2VkIGluXG4gICAgaWYgKCFwYXJhbXMucGFnZXMgfHwgIXBhcmFtcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIC8vIG9ubHkgc2V0IGRlZmF1bHQgb2YgQ2F0IGFuZCBEb2cgZm9yIGVud2lraVxuICAgICAgaWYgKHRoaXMucHJvamVjdCA9PT0gJ2VuLndpa2lwZWRpYScpIHtcbiAgICAgICAgcGFyYW1zLnBhZ2VzID0gWydDYXQnLCAnRG9nJ107XG4gICAgICAgIHRoaXMuc2V0SW5pdGlhbENoYXJ0VHlwZShwYXJhbXMucGFnZXMubGVuZ3RoKTtcbiAgICAgICAgZ2V0UGFnZUluZm9BbmRTZXREZWZhdWx0cyhwYXJhbXMucGFnZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbGVhdmUgU2VsZWN0MiBlbXB0eSBhbmQgcHV0IGZvY3VzIG9uIGl0IHNvIHRoZXkgY2FuIHR5cGUgaW4gcGFnZXNcbiAgICAgICAgdGhpcy5mb2N1c1NlbGVjdDIoKTtcbiAgICAgICAgLy8gbWFudWFsbHkgaGlkZSBzcGlubnkgc2luY2Ugd2UgYXJlbid0IGRyYXdpbmcgdGhlIGNoYXJ0LFxuICAgICAgICAvLyBhZ2FpbiB1c2luZyBzZXRUaW1lb3V0IHRvIGxldCBldmVyeXRoaW5nIGNhdGNoIHVwXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5zdG9wU3Bpbm55LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnNldEluaXRpYWxDaGFydFR5cGUoKTtcbiAgICAgIH1cbiAgICAvLyBJZiB0aGVyZSdzIG1vcmUgdGhhbiAxMCBhcnRpY2xlcyBhdHRlbXB0IHRvIGNyZWF0ZSBhIFBhZ2VQaWxlIGFuZCBvcGVuIGl0IGluIE1hc3N2aWV3c1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLnBhZ2VzLmxlbmd0aCA+IDEwKSB7XG4gICAgICAvLyBJZiBhIFBhZ2VQaWxlIGlzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIHdlIGFyZSByZWRpcmVjdGVkIHRvIE1hc3N2aWV3cyBhbmQgdGhlIHByb21pc2UgaXMgbmV2ZXIgcmVzb2x2ZWQsXG4gICAgICAvLyAgIG90aGVyd2lzZSB3ZSBqdXN0IHRha2UgdGhlIGZpcnN0IDEwIGFuZCBwcm9jZXNzIGFzIHdlIHdvdWxkIG5vcm1hbGx5XG4gICAgICB0aGlzLm1hc3N2aWV3c1JlZGlyZWN0V2l0aFBhZ2VQaWxlKHBhcmFtcy5wYWdlcykudGhlbihnZXRQYWdlSW5mb0FuZFNldERlZmF1bHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKHBhcmFtcy5wYWdlcy5sZW5ndGgpO1xuICAgICAgZ2V0UGFnZUluZm9BbmRTZXREZWZhdWx0cyhwYXJhbXMucGFnZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgTWVkaWF3aWtpIEFQSSByZXN1bHRzIGludG8gU2VsZWN0MiBmb3JtYXQgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBkYXRhIGFzIHJlY2VpdmVkIGZyb20gdGhlIEFQSVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkYXRhIHJlYWR5IHRvIGhhbmRlZCBvdmVyIHRvIFNlbGVjdDJcbiAgICovXG4gIHByb2Nlc3NTZWFyY2hSZXN1bHRzKGRhdGEpIHtcbiAgICBjb25zdCBxdWVyeSA9IGRhdGEgPyBkYXRhLnF1ZXJ5IDoge307XG4gICAgbGV0IHJlc3VsdHMgPSBbXTtcblxuICAgIGlmICghcXVlcnkpIHJldHVybiB7cmVzdWx0c307XG5cbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGUgPT09ICdhdXRvY29tcGxldGUnKSB7XG4gICAgICBpZiAocXVlcnkucHJlZml4c2VhcmNoLmxlbmd0aCkge1xuICAgICAgICByZXN1bHRzID0gcXVlcnkucHJlZml4c2VhcmNoLm1hcChmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBlbGVtLnRpdGxlLnNjb3JlKCksXG4gICAgICAgICAgICB0ZXh0OiBlbGVtLnRpdGxlXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ2F1dG9jb21wbGV0ZV9yZWRpcmVjdHMnKSB7XG4gICAgICAvKiogZmlyc3QgbWVyZ2UgaW4gcmVkaXJlY3RzICovXG4gICAgICBpZiAocXVlcnkucmVkaXJlY3RzKSB7XG4gICAgICAgIHJlc3VsdHMgPSBxdWVyeS5yZWRpcmVjdHMubWFwKHJlZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiByZWQuZnJvbS5zY29yZSgpLFxuICAgICAgICAgICAgdGV4dDogcmVkLmZyb21cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmtleXMocXVlcnkucGFnZXMpLmZvckVhY2gocGFnZUlkID0+IHtcbiAgICAgICAgY29uc3QgcGFnZURhdGEgPSBxdWVyeS5wYWdlc1twYWdlSWRdO1xuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIGlkOiBwYWdlRGF0YS50aXRsZS5zY29yZSgpLFxuICAgICAgICAgIHRleHQ6IHBhZ2VEYXRhLnRpdGxlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtyZXN1bHRzOiByZXN1bHRzfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHVzZXItaW5wdXR0ZWQgcGFyYW1ldGVycyBleGNlcHQgdGhlIHBhZ2VzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NwZWNpYWxSYW5nZV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgc3BlY2lhbCByYW5nZSBpbnN0ZWFkIG9mIHN0YXJ0L2VuZCwgaWYgYXBwbGljYWJsZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHByb2plY3QsIHBsYXRmb3JtLCBhZ2VudCwgZXRjLlxuICAgKi9cbiAgZ2V0UGFyYW1zKHNwZWNpYWxSYW5nZSA9IHRydWUpIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgcHJvamVjdDogJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpLFxuICAgICAgcGxhdGZvcm06ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCksXG4gICAgICBhZ2VudDogJCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBzdGFydCBhbmQgZW5kIHdpdGggY3VzdG9tIHJhbmdlIHZhbHVlcywgaWYgY29uZmlndXJlZCAoc2V0IGJ5IFVSTCBwYXJhbXMgb3Igc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcilcbiAgICAgKiBWYWxpZCB2YWx1ZXMgYXJlIHRob3NlIGRlZmluZWQgaW4gY29uZmlnLnNwZWNpYWxSYW5nZXMsIGNvbnN0cnVjdGVkIGxpa2UgYHtyYW5nZTogJ2xhc3QtbW9udGgnfWAsXG4gICAgICogICBvciBhIHJlbGF0aXZlIHJhbmdlIGxpa2UgYHtyYW5nZTogJ2xhdGVzdC1OJ31gIHdoZXJlIE4gaXMgdGhlIG51bWJlciBvZiBkYXlzLlxuICAgICAqL1xuICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiBzcGVjaWFsUmFuZ2UpIHtcbiAgICAgIHBhcmFtcy5yYW5nZSA9IHRoaXMuc3BlY2lhbFJhbmdlLnJhbmdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMuc3RhcnQgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICBwYXJhbXMuZW5kID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICB9XG5cbiAgICAvKiogYWRkIGF1dG9sb2cgcGFyYW0gb25seSBpZiBpdCB3YXMgcGFzc2VkIGluIG9yaWdpbmFsbHksIGFuZCBvbmx5IGlmIGl0IHdhcyBmYWxzZSAodHJ1ZSB3b3VsZCBiZSBkZWZhdWx0KSAqL1xuICAgIGlmICh0aGlzLm5vTG9nU2NhbGUpIHBhcmFtcy5hdXRvbG9nID0gJ2ZhbHNlJztcblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgaGlzdG9yeSBzdGF0ZSB3aXRoIG5ldyBVUkwgcXVlcnkgc3RyaW5nIHJlcHJlc2VudGluZyBjdXJyZW50IHVzZXIgaW5wdXRcbiAgICogQ2FsbGVkIHdoZW5ldmVyIHdlIGdvIHRvIHVwZGF0ZSB0aGUgY2hhcnRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHB1c2hQYXJhbXMoKSB7XG4gICAgY29uc3QgcGFnZXMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MigndmFsJykgfHwgW10sXG4gICAgICBlc2NhcGVkUGFnZXMgPSBwYWdlcy5qb2luKCd8JykucmVwbGFjZSgvWyYlXS9nLCBlc2NhcGUpO1xuXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgYD8keyQucGFyYW0odGhpcy5nZXRQYXJhbXMoKSl9JnBhZ2VzPSR7ZXNjYXBlZFBhZ2VzfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgPyR7JC5wYXJhbSh0aGlzLmdldFBlcm1hTGluaygpKX0mcGFnZXM9JHtlc2NhcGVkUGFnZXN9YCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgYXJ0aWNsZSBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lciB0byB1cGRhdGUgY2hhcnRcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBTZWxlY3QyKCkge1xuICAgIGNvbnN0ICRzZWxlY3QySW5wdXQgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG5cbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgYWpheDogdGhpcy5nZXRBcnRpY2xlU2VsZWN0b3JBamF4KCksXG4gICAgICB0YWdzOiB0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZScsXG4gICAgICBwbGFjZWhvbGRlcjogJC5pMThuKCdhcnRpY2xlLXBsYWNlaG9sZGVyJyksXG4gICAgICBtYXhpbXVtU2VsZWN0aW9uTGVuZ3RoOiAxMCxcbiAgICAgIG1pbmltdW1JbnB1dExlbmd0aDogMVxuICAgIH07XG5cbiAgICAkc2VsZWN0MklucHV0LnNlbGVjdDIocGFyYW1zKTtcbiAgICAkc2VsZWN0MklucHV0Lm9uKCdjaGFuZ2UnLCB0aGlzLnByb2Nlc3NJbnB1dC5iaW5kKHRoaXMpKTtcbiAgICAkc2VsZWN0MklucHV0Lm9uKCdzZWxlY3QyOm9wZW4nLCBlID0+IHtcbiAgICAgIGlmICgkKGUudGFyZ2V0KS52YWwoKSAmJiAkKGUudGFyZ2V0KS52YWwoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICQoJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnKS5vbmUoJ2tleXVwJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAkLmkxOG4oXG4gICAgICAgICAgICAnbWFzc3ZpZXdzLW5vdGljZScsXG4gICAgICAgICAgICAxMCxcbiAgICAgICAgICAgIGA8c3Ryb25nPjxhIGhyZWY9Jy9tYXNzdmlld3MvJz4keyQuaTE4bignbWFzc3ZpZXdzJyl9PC9hPjwvc3Ryb25nPmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKG1lc3NhZ2UsICdpbmZvJywgMTAwMDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWpheCBwYXJhbWV0ZXJzIHRvIGJlIHVzZWQgaW4gc2V0dXBTZWxlY3QyLCBiYXNlZCBvbiB0aGlzLmF1dG9jb21wbGV0ZVxuICAgKiBAcmV0dXJuIHtvYmplY3R8bnVsbH0gdG8gYmUgcGFzc2VkIGluIGFzIHRoZSB2YWx1ZSBmb3IgYGFqYXhgIGluIHNldHVwU2VsZWN0MlxuICAgKi9cbiAgZ2V0QXJ0aWNsZVNlbGVjdG9yQWpheCgpIHtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGUgIT09ICdub19hdXRvY29tcGxldGUnKSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoaXMgYWpheCBjYWxsIHF1ZXJpZXMgdGhlIE1lZGlhd2lraSBBUEkgZm9yIGFydGljbGUgbmFtZVxuICAgICAgICogc3VnZ2VzdGlvbnMgZ2l2ZW4gdGhlIHNlYXJjaCB0ZXJtIGlucHV0ZWQgaW4gdGhlIHNlbGVjdG9yLlxuICAgICAgICogV2UgdWx0aW1hdGVseSB3YW50IHRvIG1ha2UgdGhlIGVuZHBvaW50IGNvbmZpZ3VyYWJsZSBiYXNlZCBvbiB3aGV0aGVyIHRoZXkgd2FudCByZWRpcmVjdHNcbiAgICAgICAqL1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICBkZWxheTogMjAwLFxuICAgICAgICBqc29ucENhbGxiYWNrOiAnYXJ0aWNsZVN1Z2dlc3Rpb25DYWxsYmFjaycsXG4gICAgICAgIGRhdGE6IHNlYXJjaCA9PiB0aGlzLmdldFNlYXJjaFBhcmFtcyhzZWFyY2gudGVybSksXG4gICAgICAgIHByb2Nlc3NSZXN1bHRzOiB0aGlzLnByb2Nlc3NTZWFyY2hSZXN1bHRzLmJpbmQodGhpcyksXG4gICAgICAgIGNhY2hlOiB0cnVlXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgcGFyZW50IHNldHVwUHJvamVjdElucHV0IGFuZCB1cGRhdGVzIHRoZSB2aWV3IGlmIHZhbGlkYXRpb25zIHBhc3NlZFxuICAgKiAgIHJldmVydGluZyB0byB0aGUgb2xkIHZhbHVlIGlmIHRoZSBuZXcgb25lIGlzIGludmFsaWRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB2YWxpZGF0ZVByb2plY3QoKSB7XG4gICAgaWYgKHN1cGVyLnZhbGlkYXRlUHJvamVjdCgpKSB7XG4gICAgICB0aGlzLnJlc2V0Vmlldyh0cnVlKTtcbiAgICAgIHRoaXMuZm9jdXNTZWxlY3QyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYWwgcGxhY2UgdG8gYWRkIHBhZ2Utd2lkZSBsaXN0ZW5lcnNcbiAgICogQG92ZXJyaWRlXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwTGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldHVwTGlzdGVuZXJzKCk7XG4gICAgJCgnI3BsYXRmb3JtLXNlbGVjdCwgI2FnZW50LXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCB0aGlzLnByb2Nlc3NJbnB1dC5iaW5kKHRoaXMpKTtcbiAgICAkKCcuc29ydC1saW5rJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zdCBzb3J0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuc29ydCA9PT0gc29ydFR5cGUgPyAtdGhpcy5kaXJlY3Rpb24gOiAxO1xuICAgICAgdGhpcy5zb3J0ID0gc29ydFR5cGU7XG4gICAgICB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUXVlcnkgdGhlIEFQSSBmb3IgZWFjaCBwYWdlLCBidWlsZGluZyB1cCB0aGUgZGF0YXNldHMgYW5kIHRoZW4gY2FsbGluZyByZW5kZXJEYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2UgLSB3aGV0aGVyIHRvIGZvcmNlIHRoZSBjaGFydCB0byByZS1yZW5kZXIsIGV2ZW4gaWYgbm8gcGFyYW1zIGhhdmUgY2hhbmdlZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHByb2Nlc3NJbnB1dChmb3JjZSkge1xuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHF1ZXJ5aW5nIGR1ZSB0byBjb25mbGljdGluZyBsaXN0ZW5lcnMgKi9cbiAgICBpZiAoIWZvcmNlICYmIChsb2NhdGlvbi5zZWFyY2ggPT09IHRoaXMucGFyYW1zICYmIHRoaXMucHJldkNoYXJ0VHlwZSA9PT0gdGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wYXJhbXMgPSBsb2NhdGlvbi5zZWFyY2g7XG5cbiAgICBjb25zdCBlbnRpdGllcyA9ICQoY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MigndmFsJykgfHwgW107XG5cbiAgICBpZiAoIWVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVzZXRWaWV3KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKGVudGl0aWVzLmxlbmd0aCk7XG5cbiAgICAvLyBjbGVhciBvdXQgb2xkIGVycm9yIG1lc3NhZ2VzIHVubGVzcyB0aGUgaXMgdGhlIGZpcnN0IHRpbWUgcmVuZGVyaW5nIHRoZSBjaGFydFxuICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuXG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gdGhpcy5jaGFydFR5cGU7XG4gICAgdGhpcy5kZXN0cm95Q2hhcnQoKTtcbiAgICB0aGlzLnN0YXJ0U3Bpbm55KCk7IC8vIHNob3cgc3Bpbm55IGFuZCBjYXB0dXJlIGFnYWluc3QgZmF0YWwgZXJyb3JzXG5cbiAgICAvLyBXZSd2ZSBhbHJlYWR5IGdvdHRlbiBkYXRhIGFib3V0IHRoZSBpbnRpYWwgc2V0IG9mIHBhZ2VzXG4gICAgLy8gVGhpcyBpcyBiZWNhdXNlIHdlIG5lZWQgYW55IHBhZ2UgbmFtZXMgZ2l2ZW4gdG8gYmUgbm9ybWFsaXplZCB3aGVuIHRoZSBhcHAgZmlyc3QgbG9hZHNcbiAgICBpZiAodGhpcy5pbml0aWFsUXVlcnkpIHtcbiAgICAgIHRoaXMuZ2V0UGFnZVZpZXdzRGF0YShlbnRpdGllcykuZG9uZSh4aHJEYXRhID0+IHRoaXMudXBkYXRlQ2hhcnQoeGhyRGF0YSkpO1xuICAgICAgLy8gc2V0IGJhY2sgdG8gZmFsc2Ugc28gd2UgZ2V0IHBhZ2UgYW5kIGVkaXQgaW5mbyBmb3IgYW55IG5ld2x5IGVudGVyZWQgcGFnZXNcbiAgICAgIHRoaXMuaW5pdGlhbFF1ZXJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0UGFnZUFuZEVkaXRJbmZvKGVudGl0aWVzKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZXRQYWdlVmlld3NEYXRhKGVudGl0aWVzKS5kb25lKHhockRhdGEgPT4gdGhpcy51cGRhdGVDaGFydCh4aHJEYXRhKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVUYWJsZSgpIHtcbiAgICBpZiAodGhpcy5vdXRwdXREYXRhLmxlbmd0aCA9PT0gMSkgcmV0dXJuICQoJy50YWJsZS12aWV3JykuaGlkZSgpO1xuXG4gICAgJCgnLm91dHB1dC1saXN0JykuaHRtbCgnJyk7XG5cbiAgICAvKiogc29ydCBhc2NlbmRpbmcgYnkgY3VycmVudCBzb3J0IHNldHRpbmcgKi9cbiAgICBjb25zdCBkYXRhc2V0cyA9IHRoaXMub3V0cHV0RGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBiZWZvcmUgPSB0aGlzLmdldFNvcnRQcm9wZXJ0eShhLCB0aGlzLnNvcnQpLFxuICAgICAgICBhZnRlciA9IHRoaXMuZ2V0U29ydFByb3BlcnR5KGIsIHRoaXMuc29ydCk7XG5cbiAgICAgIGlmIChiZWZvcmUgPCBhZnRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb247XG4gICAgICB9IGVsc2UgaWYgKGJlZm9yZSA+IGFmdGVyKSB7XG4gICAgICAgIHJldHVybiAtdGhpcy5kaXJlY3Rpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJy5zb3J0LWxpbmsgc3BhbicpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldC1hbHQgZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQnKS5hZGRDbGFzcygnZ2x5cGhpY29uLXNvcnQnKTtcbiAgICBjb25zdCBuZXdTb3J0Q2xhc3NOYW1lID0gcGFyc2VJbnQodGhpcy5kaXJlY3Rpb24sIDEwKSA9PT0gMSA/ICdnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldC1hbHQnIDogJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0JztcbiAgICAkKGAuc29ydC1saW5rLS0ke3RoaXMuc29ydH0gc3BhbmApLmFkZENsYXNzKG5ld1NvcnRDbGFzc05hbWUpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tc29ydCcpO1xuXG4gICAgbGV0IGhhc1Byb3RlY3Rpb24gPSBmYWxzZTtcbiAgICBkYXRhc2V0cy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGl0ZW0ucHJvdGVjdGlvbiAhPT0gJC5pMThuKCdub25lJykpIGhhc1Byb3RlY3Rpb24gPSB0cnVlO1xuXG4gICAgICAkKCcub3V0cHV0LWxpc3QnKS5hcHBlbmQoXG4gICAgICAgIGA8dHI+XG4gICAgICAgICA8dGQgY2xhc3M9J3RhYmxlLXZpZXctLWNvbG9yLWNvbCc+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9J3RhYmxlLXZpZXctLWNvbG9yLWJsb2NrJyBzdHlsZT1cImJhY2tncm91bmQ6JHtpdGVtLmNvbG9yfVwiPjwvc3Bhbj5cbiAgICAgICAgIDwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmdldFBhZ2VMaW5rKGl0ZW0ubGFiZWwpfTwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihpdGVtLnN1bSl9PC90ZD5cbiAgICAgICAgIDx0ZD4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0uYXZlcmFnZSl9PC90ZD5cbiAgICAgICAgIDx0ZD4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0ubnVtX2VkaXRzKX08L3RkPlxuICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS5udW1fdXNlcnMpfTwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihpdGVtLmxlbmd0aCl9PC90ZD5cbiAgICAgICAgIDx0ZD4ke2l0ZW0ucHJvdGVjdGlvbn08L3RkPlxuICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS53YXRjaGVycyl9PC90ZD5cbiAgICAgICAgIDx0ZD5cbiAgICAgICAgICA8YSBocmVmPVwiJHt0aGlzLmdldExhbmd2aWV3c1VSTChpdGVtLmxhYmVsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4keyQuaTE4bignYWxsLWxhbmd1YWdlcycpfTwvYT5cbiAgICAgICAgICAmYnVsbDtcbiAgICAgICAgICA8YSBocmVmPVwiJHt0aGlzLmdldFJlZGlyZWN0dmlld3NVUkwoaXRlbS5sYWJlbCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHskLmkxOG4oJ3JlZGlyZWN0cycpfTwvYT5cbiAgICAgICAgIDwvdGQ+XG4gICAgICAgICA8L3RyPmBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBoaWRlIHByb3RlY3Rpb24gY29sdW1uIGlmIG5vIHBhZ2VzIGFyZSBwcm90ZWN0ZWRcbiAgICAkKCcudGFibGUtdmlldy0tcHJvdGVjdGlvbicpLnRvZ2dsZShoYXNQcm90ZWN0aW9uKTtcblxuICAgICQoJy50YWJsZS12aWV3Jykuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBnaXZlbiBwYWdlIGZvciB0aGUgcHVycG9zZXMgb2YgY29sdW1uIHNvcnRpbmcgaW4gdGFibGUgdmlld1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0gLSBwYWdlIG5hbWVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlIC0gdHlwZSBvZiBwcm9wZXJ0eSB0byBnZXRcbiAgICogQHJldHVybiB7U3RyaW5nfE51bWJlcn0gLSB2YWx1ZVxuICAgKi9cbiAgZ2V0U29ydFByb3BlcnR5KGl0ZW0sIHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd0aXRsZSc6XG4gICAgICByZXR1cm4gaXRlbS5sYWJlbDtcbiAgICBjYXNlICd2aWV3cyc6XG4gICAgICByZXR1cm4gTnVtYmVyKGl0ZW0uc3VtKTtcbiAgICBjYXNlICdhdmVyYWdlJzpcbiAgICAgIHJldHVybiBOdW1iZXIoaXRlbS5hdmVyYWdlKTtcbiAgICBjYXNlICdlZGl0cyc6XG4gICAgICByZXR1cm4gTnVtYmVyKGl0ZW0ubnVtX2VkaXRzKTtcbiAgICBjYXNlICdlZGl0b3JzJzpcbiAgICAgIHJldHVybiBOdW1iZXIoaXRlbS5udW1fdXNlcnMpO1xuICAgIGNhc2UgJ3NpemUnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLmxlbmd0aCk7XG4gICAgY2FzZSAnd2F0Y2hlcnMnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLndhdGNoZXJzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhZ2UgaW5mbyBhbmQgZWRpdGluZyBpbmZvIG9mIGdpdmVuIHBhZ2VzLlxuICAgKiBBbHNvIHNldHMgdGhpcy5lbnRpdHlJbmZvXG4gICAqIEBwYXJhbSAge0FycmF5fSBwYWdlcyAtIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IFByb21pc2UgcmVzb2x2aW5nIHdpdGggdGhpcy5lbnRpdHlJbmZvXG4gICAqL1xuICBnZXRQYWdlQW5kRWRpdEluZm8ocGFnZXMpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICB0aGlzLmdldFBhZ2VJbmZvKHBhZ2VzKS5kb25lKGRhdGEgPT4ge1xuICAgICAgdGhpcy5lbnRpdHlJbmZvID0gZGF0YTtcbiAgICAgIC8vIHVzZSBPYmplY3Qua2V5cyhkYXRhKSB0byBnZXQgbm9ybWFsaXplZCBwYWdlIG5hbWVzXG4gICAgICB0aGlzLmdldEVkaXREYXRhKE9iamVjdC5rZXlzKGRhdGEpKS5kb25lKGVkaXREYXRhID0+IHtcbiAgICAgICAgZm9yIChsZXQgcGFnZSBpbiBlZGl0RGF0YS5wYWdlcykge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5lbnRpdHlJbmZvW3BhZ2UuZGVzY29yZSgpXSwgZWRpdERhdGEucGFnZXNbcGFnZV0pO1xuICAgICAgICB9XG4gICAgICAgIGRmZC5yZXNvbHZlKHRoaXMuZW50aXR5SW5mbyk7XG4gICAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICAgZGZkLnJlc29sdmUodGhpcy5lbnRpdHlJbmZvKTsgLy8gdHJlYXQgYXMgaWYgc3VjY2Vzc2Z1bCwgc2ltcGx5IHdvbid0IHNob3cgdGhlIGRhdGFcbiAgICAgIH0pO1xuICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgZGZkLnJlc29sdmUoe30pOyAvLyBzYW1lLCBzaW1wbHkgd29uJ3Qgc2hvdyB0aGUgZGF0YSBpZiBpdCBmYWlsZWRcbiAgICB9KTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgUGFnZVBpbGUgd2l0aCBnaXZlbiBwYWdlcyB1c2luZyB0aGUgQVBJIGFuZCByZWRpcmVjdCB0byBNYXNzdmlld3MuXG4gICAqIFRoaXMgaXMgdXNlZCB3aGVuIHRoZSB1c2VyIHBhc3NlcyBpbiBtb3JlIHRoYW4gMTAgcGFnZXNcbiAgICogQHBhcmFtIHtBcnJheX0gcGFnZXMgLSBwYWdlcyB0byBjb252ZXJ0IHRvIGEgUGFnZVBpbGUgYW5kIG9wZW4gaW4gTWFzc3ZpZXdzXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSByZXNvbHZlZCBvbmx5IGlmIGNyZWF0aW9uIG9mIFBhZ2VQaWxlIGZhaWxlZFxuICAgKi9cbiAgbWFzc3ZpZXdzUmVkaXJlY3RXaXRoUGFnZVBpbGUocGFnZXMpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnLy90b29scy53bWZsYWJzLm9yZy9wYWdlcGlsZS9hcGkucGhwJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgYWN0aW9uOiAnY3JlYXRlX3BpbGVfd2l0aF9kYXRhJyxcbiAgICAgICAgd2lraTogdGhpcy5kYk5hbWUodGhpcy5wcm9qZWN0KSxcbiAgICAgICAgZGF0YTogcGFnZXMuam9pbignXFxuJylcbiAgICAgIH1cbiAgICB9KS5zdWNjZXNzKHBpbGVEYXRhID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKCk7XG4gICAgICBkZWxldGUgcGFyYW1zLnByb2plY3Q7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbiA9IGAvbWFzc3ZpZXdzP292ZXJmbG93PTEmJHskLnBhcmFtKHBhcmFtcyl9JnNvdXJjZT1wYWdlcGlsZSZ0YXJnZXQ9JHtwaWxlRGF0YS5waWxlLmlkfWA7XG4gICAgfSkuZmFpbCgoKSA9PiB7XG4gICAgICAvLyBqdXN0IGdyYWIgZmlyc3QgMTAgcGFnZXMgYW5kIHRocm93IGFuIGVycm9yXG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdhdXRvLXBhZ2VwaWxlLWVycm9yJywgJ1BhZ2VQaWxlJywgMTApLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgICAgZGZkLnJlc29sdmUocGFnZXMuc2xpY2UoMCwgMTApKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAvKiogYXNzdW1lIGhhc2ggcGFyYW1zIGFyZSBzdXBwb3NlZCB0byBiZSBxdWVyeSBwYXJhbXMgKi9cbiAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2ggJiYgIWRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5yZXBsYWNlKCcjJywgJz8nKTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1xcIy4qLywgJycpO1xuICB9XG5cbiAgbmV3IFBhZ2VWaWV3cygpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpYywgdXNlZCBpbiBhbGwgYXBwcyBleGNlcHQgVG9wdmlld3NcbiAqIEBwYXJhbSB7Y2xhc3N9IHN1cGVyY2xhc3MgLSBiYXNlIGNsYXNzXG4gKiBAcmV0dXJucyB7bnVsbH0gY2xhc3MgZXh0ZW5kaW5nIHN1cGVyY2xhc3NcbiAqL1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgdGhpcy5jaGFydE9iaiA9IG51bGw7XG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gbnVsbDtcbiAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSB0cnVlOyAvLyB3aWxsIGJlY29tZSBmYWxzZSB3aGVuIHRoZXkgbWFudWFsbHkgY2hhbmdlIHRoZSBjaGFydCB0eXBlXG5cbiAgICAvKiogZW5zdXJlIHdlIGhhdmUgYSB2YWxpZCBjaGFydCB0eXBlIGluIGxvY2FsU3RvcmFnZSwgcmVzdWx0IG9mIENoYXJ0LmpzIDEuMCB0byAyLjAgbWlncmF0aW9uICovXG4gICAgY29uc3Qgc3RvcmVkQ2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpO1xuICAgIGlmICghdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkgJiYgIXRoaXMuY29uZmlnLmNpcmN1bGFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkpIHtcbiAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZSgpKTtcbiAgICB9XG5cbiAgICAvLyBsZWF2ZSBpZiB0aGVyZSdzIG5vIGNoYXJ0IGNvbmZpZ3VyZWRcbiAgICBpZiAoIXRoaXMuY29uZmlnLmNoYXJ0KSByZXR1cm47XG5cbiAgICAvKiogQHR5cGUge0Jvb2xlYW59IGFkZCBhYmlsaXR5IHRvIGRpc2FibGUgYXV0by1sb2cgZGV0ZWN0aW9uICovXG4gICAgdGhpcy5ub0xvZ1NjYWxlID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdhdXRvbG9nPWZhbHNlJyk7XG5cbiAgICAvKiogY29weSBvdmVyIGFwcC1zcGVjaWZpYyBjaGFydCB0ZW1wbGF0ZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuZm9yRWFjaChsaW5lYXJDaGFydCA9PiB7XG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1tsaW5lYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmxpbmVhckxlZ2VuZDtcbiAgICB9KTtcbiAgICB0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5mb3JFYWNoKGNpcmN1bGFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbY2lyY3VsYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmNpcmN1bGFyTGVnZW5kO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbihDaGFydC5kZWZhdWx0cy5nbG9iYWwsIHthbmltYXRpb246IGZhbHNlLCByZXNwb25zaXZlOiB0cnVlfSk7XG5cbiAgICAvKiogY2hhbmdpbmcgb2YgY2hhcnQgdHlwZXMgKi9cbiAgICAkKCcubW9kYWwtY2hhcnQtdHlwZSBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSBmYWxzZTtcblxuICAgICAgJCgnLmxvZ2FyaXRobWljLXNjYWxlJykudG9nZ2xlKHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZSh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKTtcblxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY2hhcnRUeXBlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc0NoYXJ0QXBwKCkgPyB0aGlzLnVwZGF0ZUNoYXJ0KHRoaXMucGFnZVZpZXdzRGF0YSkgOiB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvTG9nRGV0ZWN0aW9uID0gJ2ZhbHNlJztcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlZC9lbmFibGUgYmVnaW4gYXQgemVybyBjaGVja2JveCBhY2NvcmRpbmdseSxcbiAgICAgKiBidXQgZG9uJ3QgdXBkYXRlIGNoYXJ0IHNpbmNlIHRoZSBsb2cgc2NhbGUgdmFsdWUgY2FuIGNoYW5nZSBwcmFnbWF0aWNhbGx5IGFuZCBub3QgZnJvbSB1c2VyIGlucHV0XG4gICAgICovXG4gICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCB0aGlzLmNoZWNrZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH1cblxuICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKiogY2hhcnQgZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLXBuZycpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0UE5HLmJpbmQodGhpcykpO1xuICAgICQoJy5wcmludC1jaGFydCcpLm9uKCdjbGljaycsIHRoaXMucHJpbnRDaGFydC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgY2hhcnQgdHlwZSBvciB0aGUgb25lIGZyb20gbG9jYWxTdG9yYWdlLCBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW251bURhdGFzZXRzXSAtIG51bWJlciBvZiBkYXRhc2V0c1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0SW5pdGlhbENoYXJ0VHlwZShudW1EYXRhc2V0cyA9IDEpIHtcbiAgICBpZiAodGhpcy5yZW1lbWJlckNoYXJ0ID09PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5jb25maWcuZGVmYXVsdHMuY2hhcnRUeXBlKG51bURhdGFzZXRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBwcmV2aW91cyBjaGFydCwgaWYgbmVlZGVkLlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZGVzdHJveUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLmNoYXJ0T2JqKSB7XG4gICAgICB0aGlzLmNoYXJ0T2JqLmRlc3Ryb3koKTtcbiAgICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKCcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGNoYXJ0IGRhdGEgdG8gQ1NWIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIFdpdGggdGhlIHByZXBlbmRlZCBkYXRhOnRleHQvY3N2IHRoaXMgc2hvdWxkIGNhdXNlIHRoZSBicm93c2VyIHRvIGRvd25sb2FkIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRDU1YoKSB7XG4gICAgbGV0IGNzdkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LERhdGUsJztcbiAgICBsZXQgdGl0bGVzID0gW107XG4gICAgbGV0IGRhdGFSb3dzID0gW107XG4gICAgbGV0IGRhdGVzID0gdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpO1xuXG4gICAgLy8gQmVnaW4gY29uc3RydWN0aW5nIHRoZSBkYXRhUm93cyBhcnJheSBieSBwb3B1bGF0aW5nIGl0IHdpdGggdGhlIGRhdGVzXG4gICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgIGRhdGFSb3dzW2luZGV4XSA9IFtkYXRlXTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgLy8gQnVpbGQgYW4gYXJyYXkgb2Ygc2l0ZSB0aXRsZXMgZm9yIHVzZSBpbiB0aGUgQ1NWIGhlYWRlclxuICAgICAgbGV0IHNpdGVUaXRsZSA9ICdcIicgKyBzaXRlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInO1xuICAgICAgdGl0bGVzLnB1c2goc2l0ZVRpdGxlKTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGRhdGFSb3dzIGFycmF5IHdpdGggdGhlIGRhdGEgZm9yIHRoaXMgc2l0ZVxuICAgICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgZGF0YVJvd3NbaW5kZXhdLnB1c2goc2l0ZS5kYXRhW2luZGV4XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEZpbmlzaCB0aGUgQ1NWIGhlYWRlclxuICAgIGNzdkNvbnRlbnQgPSBjc3ZDb250ZW50ICsgdGl0bGVzLmpvaW4oJywnKSArICdcXG4nO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICBkYXRhUm93cy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgY3N2Q29udGVudCArPSBkYXRhLmpvaW4oJywnKSArICdcXG4nO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZERhdGEoY3N2Q29udGVudCwgJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIEpTT04gZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGV4cG9ydEpTT04oKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge1xuICAgICAgICBwYWdlOiBwYWdlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcXFwiJykucmVwbGFjZSgvJy9nLCBcIlxcJ1wiKSxcbiAgICAgICAgY29sb3I6IHBhZ2Uuc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN1bTogcGFnZS5zdW0sXG4gICAgICAgIGRhaWx5X2F2ZXJhZ2U6IE1hdGgucm91bmQocGFnZS5zdW0gLyB0aGlzLm51bURheXNJblJhbmdlKCkpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuZm9yRWFjaCgoaGVhZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgZW50cnlbaGVhZGluZy5yZXBsYWNlKC9cXFxcLywnJyldID0gcGFnZS5kYXRhW2luZGV4XTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhLnB1c2goZW50cnkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2pzb247Y2hhcnNldD11dGYtOCwnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgdGhpcy5kb3dubG9hZERhdGEoanNvbkNvbnRlbnQsICdqc29uJyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGRhdGEgYXMgUE5HIGltYWdlLCBvcGVuaW5nIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZXhwb3J0UE5HKCkge1xuICAgIHRoaXMuZG93bmxvYWREYXRhKHRoaXMuY2hhcnRPYmoudG9CYXNlNjRJbWFnZSgpLCAncG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgaW4gemVybyB2YWx1ZSB0byBhIHRpbWVzZXJpZXMsIHNlZTpcbiAgICogaHR0cHM6Ly93aWtpdGVjaC53aWtpbWVkaWEub3JnL3dpa2kvQW5hbHl0aWNzL0FRUy9QYWdldmlld19BUEkjR290Y2hhc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlIG9mIHJhbmdlIHRvIGZpbHRlciB0aHJvdWdoXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGUgb2YgcmFuZ2VcbiAgICogQHJldHVybnMge29iamVjdH0gZGF0YXNldCB3aXRoIHplcm9zIHdoZXJlIG51bGxzIHdoZXJlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhkYXRhLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICAvKiogRXh0cmFjdCB0aGUgZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgdGltZXNlcmllcyAqL1xuICAgIGxldCBhbHJlYWR5VGhlcmUgPSB7fTtcbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBsZXQgZGF0ZSA9IG1vbWVudChlbGVtLnRpbWVzdGFtcCwgdGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KTtcbiAgICAgIGFscmVhZHlUaGVyZVtkYXRlXSA9IGVsZW07XG4gICAgfSk7XG4gICAgZGF0YS5pdGVtcyA9IFtdO1xuXG4gICAgLyoqIFJlY29uc3RydWN0IHdpdGggemVyb3MgaW5zdGVhZCBvZiBudWxscyAqL1xuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQoc3RhcnREYXRlKTsgZGF0ZSA8PSBlbmREYXRlOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAoYWxyZWFkeVRoZXJlW2RhdGVdKSB7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaChhbHJlYWR5VGhlcmVbZGF0ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIFt0aGlzLmlzUGFnZXZpZXdzKCkgPyAndmlld3MnIDogJ2RldmljZXMnXTogZWRnZUNhc2UgPyBudWxsIDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBmb3JtYXR0ZWQgZm9yIENoYXJ0LmpzIGFuZCB0aGUgbGVnZW5kIHRlbXBsYXRlc1xuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhc2V0cyAtIGFzIHJldHJpZXZlZCBieSBnZXRQYWdlVmlld3NEYXRhXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gcmVhZHkgZm9yIGNoYXJ0IHJlbmRlcmluZ1xuICAgKi9cbiAgYnVpbGRDaGFydERhdGEoZGF0YXNldHMpIHtcbiAgICBjb25zdCBsYWJlbHMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkudmFsKCk7XG5cbiAgICAvKiogcHJlc2VydmUgb3JkZXIgb2YgZGF0YXNldHMgZHVlIHRvIGFzeW5jIGNhbGxzICovXG4gICAgcmV0dXJuIGRhdGFzZXRzLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcbiAgICAgIC8qKiBCdWlsZCB0aGUgYXJ0aWNsZSdzIGRhdGFzZXQuICovXG4gICAgICBjb25zdCB2YWx1ZXMgPSBkYXRhc2V0Lm1hcChlbGVtID0+IHRoaXMuaXNQYWdldmlld3MoKSA/IGVsZW0udmlld3MgOiBlbGVtLmRldmljZXMpLFxuICAgICAgICBzdW0gPSB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBNYXRoLnJvdW5kKHN1bSAvIHZhbHVlcy5sZW5ndGgpLFxuICAgICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpLFxuICAgICAgICBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1tpbmRleCAlIDEwXSxcbiAgICAgICAgbGFiZWwgPSBsYWJlbHNbaW5kZXhdLmRlc2NvcmUoKTtcblxuICAgICAgY29uc3QgZW50aXR5SW5mbyA9IHRoaXMuZW50aXR5SW5mbyA/IHRoaXMuZW50aXR5SW5mb1tsYWJlbF0gOiB7fTtcblxuICAgICAgZGF0YXNldCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICB2YWx1ZTogc3VtLCAvLyBkdXBsaWNhdGVkIGJlY2F1c2UgQ2hhcnQuanMgd2FudHMgYSBzaW5nbGUgYHZhbHVlYCBmb3IgY2lyY3VsYXIgY2hhcnRzXG4gICAgICAgIHN1bSxcbiAgICAgICAgYXZlcmFnZSxcbiAgICAgICAgbWF4LFxuICAgICAgICBtaW4sXG4gICAgICAgIGNvbG9yXG4gICAgICB9LCB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0uZGF0YXNldChjb2xvciksIGVudGl0eUluZm8pO1xuXG4gICAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gZGF0YXNldC5kYXRhLm1hcCh2aWV3ID0+IHZpZXcgfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1cmwgdG8gcXVlcnkgdGhlIEFQSSBiYXNlZCBvbiBhcHAgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eSAtIG5hbWUgb2YgZW50aXR5IHdlJ3JlIHF1ZXJ5aW5nIGZvciAocGFnZSBuYW1lIG9yIHByb2plY3QgbmFtZSlcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBVUkxcbiAgICovXG4gIGdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgIGNvbnN0IHVyaUVuY29kZWRFbnRpdHlOYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudGl0eSk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdzaXRldmlld3MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1BhZ2V2aWV3cygpID8gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL2FnZ3JlZ2F0ZS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKSA6IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3VuaXF1ZS1kZXZpY2VzLyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9LyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy9wYWdldmlld3MvcGVyLWFydGljbGUvJHt0aGlzLnByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3RoZXIgZnVuY3Rpb24gZm9yIHF1ZXJ5aW5nIHRoZSBBUEkgYW5kIHByb2Nlc3NpbmcgZGF0YVxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGVudGl0aWVzIC0gbGlzdCBvZiBwYWdlIG5hbWVzLCBvciBwcm9qZWN0cyBmb3IgU2l0ZXZpZXdzXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHBhZ2V2aWV3cyBkYXRhIGFuZCBlcnJvcnMsIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEoZW50aXRpZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IGVudGl0aWVzLmxlbmd0aCwgZmFpbGVkRW50aXRpZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSBldmVyeXRoaW5nIHdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBmb3IgdGhlIHByb21pc2VzICovXG4gICAgbGV0IHhockRhdGEgPSB7XG4gICAgICBlbnRpdGllcyxcbiAgICAgIGxhYmVsczogW10sIC8vIExhYmVscyAoZGF0ZXMpIGZvciB0aGUgeC1heGlzLlxuICAgICAgZGF0YXNldHM6IFtdLCAvLyBEYXRhIGZvciBlYWNoIGFydGljbGUgdGltZXNlcmllc1xuICAgICAgZXJyb3JzOiBbXSwgLy8gUXVldWUgdXAgZXJyb3JzIHRvIHNob3cgYWZ0ZXIgYWxsIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlXG4gICAgICBmYXRhbEVycm9yczogW10sIC8vIFVucmVjb3ZlcmFibGUgSmF2YVNjcmlwdCBlcnJvcnNcbiAgICAgIHByb21pc2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IChlbnRpdHksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICB1cmwgPSB0aGlzLmdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSksXG4gICAgICAgIHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG5cbiAgICAgIHhockRhdGEucHJvbWlzZXMucHVzaChwcm9taXNlKTtcblxuICAgICAgcHJvbWlzZS5kb25lKHN1Y2Nlc3NEYXRhID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdWNjZXNzRGF0YSA9IHRoaXMuZmlsbEluWmVyb3Moc3VjY2Vzc0RhdGEsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgICB4aHJEYXRhLmRhdGFzZXRzLnB1c2goc3VjY2Vzc0RhdGEuaXRlbXMpO1xuXG4gICAgICAgICAgLyoqIGZldGNoIHRoZSBsYWJlbHMgZm9yIHRoZSB4LWF4aXMgb24gc3VjY2VzcyBpZiB3ZSBoYXZlbid0IGFscmVhZHkgKi9cbiAgICAgICAgICBpZiAoc3VjY2Vzc0RhdGEuaXRlbXMgJiYgIXhockRhdGEubGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgeGhyRGF0YS5sYWJlbHMgPSBzdWNjZXNzRGF0YS5pdGVtcy5tYXAoZWxlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiB4aHJEYXRhLmZhdGFsRXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCc7XG5cbiAgICAgICAgaWYgKGNhc3NhbmRyYUVycm9yKSB7XG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0pIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbZW50aXR5XSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqIG1heGltdW0gb2YgMyByZXRyaWVzICovXG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPCAzKSB7XG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RDb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcykoZW50aXR5LCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgYXJ0aWNsZSBmcm9tIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIGFuYWx5emVcbiAgICAgICAgeGhyRGF0YS5lbnRpdGllcyA9IHhockRhdGEuZW50aXRpZXMuZmlsdGVyKGVsID0+IGVsICE9PSBlbnRpdHkpO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGZhaWxlZEVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbGluayA9IHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJyA/IHRoaXMuZ2V0U2l0ZUxpbmsoZW50aXR5KSA6IHRoaXMuZ2V0UGFnZUxpbmsoZW50aXR5LCB0aGlzLnByb2plY3QpO1xuICAgICAgICAgIHhockRhdGEuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICBgJHtsaW5rfTogJHskLmkxOG4oJ2FwaS1lcnJvcicsICdQYWdldmlld3MgQVBJJyl9IC0gJHtlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAoKytjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VWaWV3c0RhdGEgPSB4aHJEYXRhO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHhockRhdGEpO1xuXG4gICAgICAgICAgaWYgKGZhaWxlZEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKFxuICAgICAgICAgICAgICAnYXBpLWVycm9yLXRpbWVvdXQnLFxuICAgICAgICAgICAgICAnPHVsPicgK1xuICAgICAgICAgICAgICBmYWlsZWRFbnRpdGllcy5tYXAoZmFpbGVkRW50aXR5ID0+IGA8bGk+JHt0aGlzLmdldFBhZ2VMaW5rKGZhaWxlZEVudGl0eSwgdGhpcy5wcm9qZWN0LmVzY2FwZSgpKX08L2xpPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICAgJzwvdWw+J1xuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5LCBpbmRleCkgPT4gbWFrZVJlcXVlc3QoZW50aXR5LCBpbmRleCkpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIG5lZWRlZCB0byBjcmVhdGUgYSBwZXJtYW5lbnQgbGluayBvZiB2aXNpYmxlIGRhdGFcbiAgICogQHJldHVybiB7T2JqZWN0fSBoYXNoIG9mIHBhcmFtc1xuICAgKi9cbiAgZ2V0UGVybWFMaW5rKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhmYWxzZSk7XG4gICAgZGVsZXRlIHBhcmFtcy5yYW5nZTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSBjdXJyZW50bHkgaW4gbG9nYXJpdGhtaWMgbW9kZT9cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTG9nYXJpdGhtaWMoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkuaXMoJzpjaGVja2VkJykgJiYgdGhpcy5pc0xvZ2FyaXRobWljQ2FwYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgY2hhcnQgdHlwZSBzdXBwb3J0cyBhIGxvZ2FyaXRobWljIHNjYWxlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBsb2ctZnJpZW5kbHkgb3Igbm90XG4gICAqL1xuICBpc0xvZ2FyaXRobWljQ2FwYWJsZSgpIHtcbiAgICByZXR1cm4gWydsaW5lJywgJ2JhciddLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgdHJ5aW5nIHRvIHNob3cgZGF0YSBvbiBwYWdldmlld3MgKGFzIG9wcG9zZWQgdG8gdW5pcXVlIGRldmljZXMpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc1BhZ2V2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5hcHAgPT09ICdwYWdldmlld3MnIHx8ICQodGhpcy5jb25maWcuZGF0YVNvdXJjZVNlbGVjdG9yKS52YWwoKSA9PT0gJ3BhZ2V2aWV3cyc7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNVbmlxdWVEZXZpY2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1BhZ2V2aWV3cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaW50IHRoZSBjaGFydCFcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHByaW50Q2hhcnQoKSB7XG4gICAgbGV0IHRhYiA9IHdpbmRvdy5vcGVuKCk7XG4gICAgdGFiLmRvY3VtZW50LndyaXRlKFxuICAgICAgYDxpbWcgc3JjPVwiJHt0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKX1cIiAvPmBcbiAgICApO1xuICAgIHRhYi5wcmludCgpO1xuICAgIHRhYi5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hhcnQsIG1lc3NhZ2VzLCBhbmQgcmVzZXRzIHNpdGUgc2VsZWN0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZWxlY3QyXSB3aGV0aGVyIG9yIG5vdCB0byBjbGVhciB0aGUgU2VsZWN0MiBpbnB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRWaWV3KHNlbGVjdDIgPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICAvKiogdGhlc2UgY2FuIGZhaWwgc29tZXRpbWVzICovXG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuICAgICAgaWYgKHNlbGVjdDIpIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvLyBub3RoaW5nXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAkKHRoaXMuY29uZmlnLmNoYXJ0KS5oaWRlKCk7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdCB0byBmaW5lLXR1bmUgdGhlIHBvaW50ZXIgZGV0ZWN0aW9uIHNwYWNpbmcgYmFzZWQgb24gaG93IGNsdXR0ZXJlZCB0aGUgY2hhcnQgaXNcbiAgICogQHJldHVybnMge051bWJlcn0gcmFkaXVzXG4gICAqL1xuICBzZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCkge1xuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSAhPT0gJ2xpbmUnKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gNTApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMzApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSA1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMjApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmhpdFJhZGl1cyA9IDMwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBsb2dhcml0aG1pYyBjaGFydCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQsIGJhc2VkIG9uIFRoZWlsIGluZGV4XG4gICAqIEBwYXJhbSAge0FycmF5fSBkYXRhc2V0cyAtIHBhZ2V2aWV3c1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIHNob3VsZEJlTG9nYXJpdGhtaWMoZGF0YXNldHMpIHtcbiAgICBpZiAoIXRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSB8fCB0aGlzLm5vTG9nU2NhbGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2V0cyA9IFtdO1xuICAgIC8vIGNvbnZlcnQgTmFOcyBhbmQgbnVsbHMgdG8gemVyb3NcbiAgICBkYXRhc2V0cy5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgc2V0cy5wdXNoKGRhdGFzZXQubWFwKHZhbCA9PiB2YWwgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gb3ZlcmFsbCBtYXggdmFsdWVcbiAgICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KC4uLltdLmNvbmNhdCguLi5zZXRzKSk7XG5cbiAgICBpZiAobWF4VmFsdWUgPD0gMTApIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBsb2dhcml0aG1pY05lZWRlZCA9IGZhbHNlO1xuXG4gICAgc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICBzZXQucHVzaChtYXhWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IHN1bSA9IHNldC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSxcbiAgICAgICAgYXZlcmFnZSA9IHN1bSAvIHNldC5sZW5ndGg7XG4gICAgICBsZXQgdGhlaWwgPSAwO1xuICAgICAgc2V0LmZvckVhY2godiA9PiB0aGVpbCArPSB2ID8gdiAqIE1hdGgubG9nKHYgLyBhdmVyYWdlKSA6IDApO1xuXG4gICAgICBpZiAodGhlaWwgLyBzdW0gPiAwLjUpIHtcbiAgICAgICAgcmV0dXJuIGxvZ2FyaXRobWljTmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgc3VwZXIuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHNldHVwIHNpbmNlIHRoZSBsaXN0IHZpZXcgYXBwcyBhbHNvIHVzZSBjaGFydHMgKi9cbiAgICBpZiAoIXRoaXMuaXNDaGFydEFwcCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqIHRoZSBcIkxhdGVzdCBOIGRheXNcIiBsaW5rcyAqL1xuICAgICQoJy5kYXRlLWxhdGVzdCBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZShgbGF0ZXN0LSR7JChlLnRhcmdldCkuZGF0YSgndmFsdWUnKX1gKTtcbiAgICB9KTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgdGhpcy5wcm9jZXNzSW5wdXQoKTtcblxuICAgICAgLyoqIGNsZWFyIG91dCBzcGVjaWFsUmFuZ2UgaWYgaXQgZG9lc24ndCBtYXRjaCBvdXIgaW5wdXQgKi9cbiAgICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiB0aGlzLnNwZWNpYWxSYW5nZS52YWx1ZSAhPT0gZS50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2hhcnQgd2l0aCBkYXRhIHByb3ZpZGVkIGJ5IHByb2Nlc3NJbnB1dCgpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB4aHJEYXRhIC0gZGF0YSBhcyBjb25zdHJ1Y3RlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHVwZGF0ZUNoYXJ0KHhockRhdGEpIHtcbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7IC8vIGNsZWFyIG9sZCBjaGFydCBsZWdlbmRcblxuICAgIC8vIHNob3cgcGVuZGluZyBlcnJvciBtZXNzYWdlcyBpZiBwcmVzZW50LCBleGl0aW5nIGlmIGZhdGFsXG4gICAgaWYgKHRoaXMuc2hvd0Vycm9ycyh4aHJEYXRhKSkgcmV0dXJuO1xuXG4gICAgaWYgKCF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgIH0gZWxzZSBpZiAoeGhyRGF0YS5lbnRpdGllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vdXRwdXREYXRhID0gdGhpcy5idWlsZENoYXJ0RGF0YSh4aHJEYXRhLmRhdGFzZXRzLCB4aHJEYXRhLmVudGl0aWVzKTtcblxuICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgY29uc3Qgc2hvdWxkQmVMb2dhcml0aG1pYyA9IHRoaXMuc2hvdWxkQmVMb2dhcml0aG1pYyh0aGlzLm91dHB1dERhdGEubWFwKHNldCA9PiBzZXQuZGF0YSkpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5wcm9wKCdjaGVja2VkJywgc2hvdWxkQmVMb2dhcml0aG1pYyk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtzY2FsZXM6IHt9fSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5vcHRzLFxuICAgICAgdGhpcy5jb25maWcuZ2xvYmFsQ2hhcnRPcHRzXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzTG9nYXJpdGhtaWMoKSkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnNjYWxlcywge1xuICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICB0eXBlOiAnbG9nYXJpdGhtaWMnLFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbWFpbiA9IHZhbHVlIC8gKE1hdGgucG93KDEwLCBNYXRoLmZsb29yKENoYXJ0LmhlbHBlcnMubG9nMTAodmFsdWUpKSkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZW1haW4gPT09IDEgfHwgcmVtYWluID09PSAyIHx8IHJlbWFpbiA9PT0gNSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICQoJy5jaGFydC1jb250YWluZXInKS5odG1sKCcnKS5hcHBlbmQoXCI8Y2FudmFzIGNsYXNzPSdhcXMtY2hhcnQnPlwiKTtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgY29uc3QgY29udGV4dCA9ICQodGhpcy5jb25maWcuY2hhcnQpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGxpbmVhckRhdGEgPSB7bGFiZWxzOiB4aHJEYXRhLmxhYmVscywgZGF0YXNldHM6IHRoaXMub3V0cHV0RGF0YX07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlID09PSAncmFkYXInKSB7XG4gICAgICAgICAgb3B0aW9ucy5zY2FsZS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzWzBdLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiBsaW5lYXJEYXRhLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBsYWJlbHM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmxhYmVsKSxcbiAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICBkYXRhOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC52YWx1ZSksXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQuYmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmhvdmVyQmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgYXZlcmFnZXM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmF2ZXJhZ2UpXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvcnMoe1xuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICBmYXRhbEVycm9yczogW2Vycl1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKHRoaXMuY2hhcnRPYmouZ2VuZXJhdGVMZWdlbmQoKSk7XG4gICAgJCgnLmRhdGEtbGlua3MnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdwYWdldmlld3MnKSB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBlcnJvcnMgYnVpbHQgaW4gdGhpcy5wcm9jZXNzSW5wdXRcbiAgICogQHBhcmFtIHtvYmplY3R9IHhockRhdGEgLSBhcyBidWlsdCBieSB0aGlzLnByb2Nlc3NJbnB1dCwgbGlrZSBgeyBlcnJvcnM6IFtdLCBmYXRhbEVycm9yczogW10gfWBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGZhdGFsIGVycm9ycyBvY2N1cmVkXG4gICAqL1xuICBzaG93RXJyb3JzKHhockRhdGEpIHtcbiAgICBpZiAoeGhyRGF0YS5mYXRhbEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KHRydWUpO1xuICAgICAgY29uc3QgZmF0YWxFcnJvcnMgPSB4aHJEYXRhLmZhdGFsRXJyb3JzLnVuaXF1ZSgpO1xuICAgICAgdGhpcy5zaG93RmF0YWxFcnJvcnMoZmF0YWxFcnJvcnMpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoeGhyRGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBldmVyeXRoaW5nIGZhaWxlZCwgcmVzZXQgdGhlIHZpZXcsIGNsZWFyaW5nIG91dCBzcGFjZSB0YWtlbiB1cCBieSBlbXB0eSBjaGFydFxuICAgICAgaWYgKHhockRhdGEuZW50aXRpZXMgJiYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCA9PT0geGhyRGF0YS5lbnRpdGllcy5sZW5ndGggfHwgIXhockRhdGEuZW50aXRpZXMubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgfVxuXG4gICAgICB4aHJEYXRhLmVycm9ycy51bmlxdWUoKS5mb3JFYWNoKGVycm9yID0+IHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0SGVscGVycztcbiIsIi8qKlxuICogQGZpbGUgU2hhcmVkIGNvZGUgYW1vbmdzdCBhbGwgYXBwcyAoUGFnZXZpZXdzLCBUb3B2aWV3cywgTGFuZ3ZpZXdzLCBTaXRldmlld3MsIE1hc3N2aWV3cywgUmVkaXJlY3QgVmlld3MpXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsLCBLYWxkYXJpXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmNvbnN0IFB2Q29uZmlnID0gcmVxdWlyZSgnLi9wdl9jb25maWcnKTtcbmNvbnN0IHNpdGVNYXAgPSByZXF1aXJlKCcuL3NpdGVfbWFwJyk7XG5jb25zdCBzaXRlRG9tYWlucyA9IE9iamVjdC5rZXlzKHNpdGVNYXApLm1hcChrZXkgPT4gc2l0ZU1hcFtrZXldKTtcblxuLyoqIFB2IGNsYXNzLCBjb250YWlucyBjb2RlIGFtb25nc3QgYWxsIGFwcHMgKFBhZ2V2aWV3cywgVG9wdmlld3MsIExhbmd2aWV3cywgU2l0ZXZpZXdzLCBNYXNzdmlld3MsIFJlZGlyZWN0IFZpZXdzKSAqL1xuY2xhc3MgUHYgZXh0ZW5kcyBQdkNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGFwcENvbmZpZykge1xuICAgIHN1cGVyKGFwcENvbmZpZyk7XG5cbiAgICAvKiogYXNzaWduIGluaXRpYWwgY2xhc3MgcHJvcGVydGllcyAqL1xuICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5jb25maWcuZGVmYXVsdHMsXG4gICAgICB2YWxpZFBhcmFtcyA9IHRoaXMuY29uZmlnLnZhbGlkUGFyYW1zO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcsIGFwcENvbmZpZyk7XG4gICAgdGhpcy5jb25maWcuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgYXBwQ29uZmlnLmRlZmF1bHRzKTtcbiAgICB0aGlzLmNvbmZpZy52YWxpZFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbGlkUGFyYW1zLCBhcHBDb25maWcudmFsaWRQYXJhbXMpO1xuXG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RvcmFnZSA9IHt9OyAvLyB1c2VkIGFzIGZhbGxiYWNrIHdoZW4gbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcblxuICAgIFsnbG9jYWxpemVEYXRlRm9ybWF0JywgJ251bWVyaWNhbEZvcm1hdHRpbmcnLCAnYmV6aWVyQ3VydmUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9Mb2dEZXRlY3Rpb24nLCAnYmVnaW5BdFplcm8nLCAncmVtZW1iZXJDaGFydCddLmZvckVhY2goc2V0dGluZyA9PiB7XG4gICAgICB0aGlzW3NldHRpbmddID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKGBwYWdldmlld3Mtc2V0dGluZ3MtJHtzZXR0aW5nfWApIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzW3NldHRpbmddO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0dXBTZXR0aW5nc01vZGFsKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IG51bGw7XG4gICAgdGhpcy5zaXRlSW5mbyA9IHt9O1xuXG4gICAgLyoqIEB0eXBlIHtudWxsfERhdGV9IHRyYWNraW5nIG9mIGVsYXBzZWQgdGltZSAqL1xuICAgIHRoaXMucHJvY2Vzc1N0YXJ0ID0gbnVsbDtcblxuICAgIC8qKiBhc3NpZ24gYXBwIGluc3RhbmNlIHRvIHdpbmRvdyBmb3IgZGVidWdnaW5nIG9uIGxvY2FsIGVudmlyb25tZW50ICovXG4gICAgaWYgKGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnKSB7XG4gICAgICB3aW5kb3cuYXBwID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGxhc2goKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlYnVnID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdkZWJ1Zz10cnVlJykgfHwgbG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCc7XG5cbiAgICAvKiogc2hvdyBub3RpY2UgaWYgb24gc3RhZ2luZyBlbnZpcm9ubWVudCAqL1xuICAgIGlmICgvLXRlc3QvLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpKSB7XG4gICAgICBjb25zdCBhY3R1YWxQYXRoTmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoLy10ZXN0XFwvPy8sICcnKTtcbiAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnd2FybmluZycsXG4gICAgICAgIGBUaGlzIGlzIGEgc3RhZ2luZyBlbnZpcm9ubWVudC4gRm9yIHRoZSBhY3R1YWwgJHtkb2N1bWVudC50aXRsZX0sXG4gICAgICAgICBzZWUgPGEgaHJlZj0nJHthY3R1YWxQYXRoTmFtZX0nPiR7bG9jYXRpb24uaG9zdG5hbWV9JHthY3R1YWxQYXRoTmFtZX08L2E+YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRyYW5zbGF0aW9ucyB0aGVuIGluaXRpYWxpemUgdGhlIGFwcC5cbiAgICAgKiBFYWNoIGFwcCBoYXMgaXQncyBvd24gaW5pdGlhbGl6ZSBtZXRob2QuXG4gICAgICogTWFrZSBzdXJlIHdlIGxvYWQgJ2VuLmpzb24nIGFzIGEgZmFsbGJhY2tcbiAgICAgKi9cbiAgICBsZXQgbWVzc2FnZXNUb0xvYWQgPSB7XG4gICAgICBbaTE4bkxhbmddOiBgL3BhZ2V2aWV3cy9tZXNzYWdlcy8ke2kxOG5MYW5nfS5qc29uYFxuICAgIH07XG4gICAgaWYgKGkxOG5MYW5nICE9PSAnZW4nKSB7XG4gICAgICBtZXNzYWdlc1RvTG9hZC5lbiA9ICcvcGFnZXZpZXdzL21lc3NhZ2VzL2VuLmpzb24nO1xuICAgIH1cbiAgICAkLmkxOG4oe1xuICAgICAgbG9jYWxlOiBpMThuTGFuZ1xuICAgIH0pLmxvYWQobWVzc2FnZXNUb0xvYWQpLnRoZW4odGhpcy5pbml0aWFsaXplLmJpbmQodGhpcykpO1xuXG4gICAgLyoqIHNldCB1cCB0b2FzdHIgY29uZmlnLiBUaGUgZHVyYXRpb24gbWF5IGJlIG92ZXJyaWRlbiBsYXRlciAqL1xuICAgIHRvYXN0ci5vcHRpb25zID0ge1xuICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICBkZWJ1ZzogbG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCcsXG4gICAgICBuZXdlc3RPblRvcDogZmFsc2UsXG4gICAgICBwcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtdG9wLWNlbnRlcicsXG4gICAgICBwcmV2ZW50RHVwbGljYXRlczogdHJ1ZSxcbiAgICAgIG9uY2xpY2s6IG51bGwsXG4gICAgICBzaG93RHVyYXRpb246ICczMDAnLFxuICAgICAgaGlkZUR1cmF0aW9uOiAnMTAwMCcsXG4gICAgICB0aW1lT3V0OiAnNTAwMCcsXG4gICAgICBleHRlbmRlZFRpbWVPdXQ6ICczMDAwJyxcbiAgICAgIHNob3dFYXNpbmc6ICdzd2luZycsXG4gICAgICBoaWRlRWFzaW5nOiAnbGluZWFyJyxcbiAgICAgIHNob3dNZXRob2Q6ICdmYWRlSW4nLFxuICAgICAgaGlkZU1ldGhvZDogJ2ZhZGVPdXQnLFxuICAgICAgdG9hc3RDbGFzczogJ2FsZXJ0JyxcbiAgICAgIGljb25DbGFzc2VzOiB7XG4gICAgICAgIGVycm9yOiAnYWxlcnQtZGFuZ2VyJyxcbiAgICAgICAgaW5mbzogJ2FsZXJ0LWluZm8nLFxuICAgICAgICBzdWNjZXNzOiAnYWxlcnQtc3VjY2VzcycsXG4gICAgICAgIHdhcm5pbmc6ICdhbGVydC13YXJuaW5nJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgc2l0ZSBub3RpY2UgKEJvb3RzdHJhcCBhbGVydClcbiAgICogQHBhcmFtIHtTdHJpbmd9IGxldmVsIC0gb25lIG9mICdzdWNjZXNzJywgJ2luZm8nLCAnd2FybmluZycgb3IgJ2Vycm9yJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gc2hvd1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3RpdGxlXSAtIHdpbGwgYXBwZWFyIGluIGJvbGQgYW5kIGluIGZyb250IG9mIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2Rpc21pc3NhYmxlXSAtIHdoZXRoZXIgb3Igbm90IHRvIGFkZCBhIFhcbiAgICogICB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBkaXNtaXNzIHRoZSBub3RpY2VcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGFkZFNpdGVOb3RpY2UobGV2ZWwsIG1lc3NhZ2UsIHRpdGxlLCBkaXNtaXNzYWJsZSkge1xuICAgIHRpdGxlID0gdGl0bGUgPyBgPHN0cm9uZz4ke3RpdGxlfTwvc3Ryb25nPiBgIDogJyc7XG5cbiAgICBsZXQgbWFya3VwID0gdGl0bGUgKyBtZXNzYWdlO1xuXG4gICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICBtYXJrdXAsXG4gICAgICBsZXZlbCxcbiAgICAgIGRpc21pc3NhYmxlID8gMTAwMDAgOiAwXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2l0ZSBub3RpY2UgZm9yIGludmFsaWQgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSAtIG5hbWUgb2YgcGFyYW1ldGVyXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRJbnZhbGlkUGFyYW1Ob3RpY2UocGFyYW0pIHtcbiAgICBjb25zdCBkb2NMaW5rID0gYDxhIGhyZWY9Jy8ke3RoaXMuYXBwfS91cmxfc3RydWN0dXJlJz4keyQuaTE4bignZG9jdW1lbnRhdGlvbicpfTwvYT5gO1xuICAgIHRoaXMuYWRkU2l0ZU5vdGljZShcbiAgICAgICdlcnJvcicsXG4gICAgICAkLmkxOG4oJ3BhcmFtLWVycm9yLTMnLCBwYXJhbSwgZG9jTGluayksXG4gICAgICAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgZGF0ZSByYW5nZSBvZiBnaXZlbiBwYXJhbXNcbiAgICogICBhbmQgdGhyb3cgZXJyb3JzIGFzIG5lY2Vzc2FyeSBhbmQvb3Igc2V0IGRlZmF1bHRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBhcyByZXR1cm5lZCBieSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGVyZSB3ZXJlIG5vIGVycm9ycywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICB2YWxpZGF0ZURhdGVSYW5nZShwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnJhbmdlKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0U3BlY2lhbFJhbmdlKHBhcmFtcy5yYW5nZSkpIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ3JhbmdlJyk7XG4gICAgICAgIHRoaXMuc2V0U3BlY2lhbFJhbmdlKHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVSYW5nZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgIGNvbnN0IGRhdGVSZWdleCA9IC9cXGR7NH0tXFxkezJ9LVxcZHsyfSQvO1xuXG4gICAgICAvLyBmaXJzdCBzZXQgZGVmYXVsdHNcbiAgICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XG5cbiAgICAgIC8vIHRoZW4gY2hlY2sgZm9ybWF0IG9mIHN0YXJ0IGFuZCBlbmQgZGF0ZVxuICAgICAgaWYgKHBhcmFtcy5zdGFydCAmJiBkYXRlUmVnZXgudGVzdChwYXJhbXMuc3RhcnQpKSB7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG1vbWVudChwYXJhbXMuc3RhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ3N0YXJ0Jyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMuZW5kICYmIGRhdGVSZWdleC50ZXN0KHBhcmFtcy5lbmQpKSB7XG4gICAgICAgIGVuZERhdGUgPSBtb21lbnQocGFyYW1zLmVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZSgnZW5kJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgdGhleSBhcmUgb3V0c2lkZSB0aGUgdmFsaWQgcmFuZ2Ugb3IgaWYgaW4gdGhlIHdyb25nIG9yZGVyXG4gICAgICBpZiAoc3RhcnREYXRlIDwgdGhpcy5jb25maWcubWluRGF0ZSB8fCBlbmREYXRlIDwgdGhpcy5jb25maWcubWluRGF0ZSkge1xuICAgICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ2Vycm9yJyxcbiAgICAgICAgICAkLmkxOG4oJ3BhcmFtLWVycm9yLTEnLCBtb21lbnQodGhpcy5jb25maWcubWluRGF0ZSkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCkpLFxuICAgICAgICAgICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnREYXRlID4gZW5kRGF0ZSkge1xuICAgICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ2Vycm9yJywgJC5pMThuKCdwYXJhbS1lcnJvci0yJyksICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyoqIGRpcmVjdGx5IGFzc2lnbiBzdGFydERhdGUgYmVmb3JlIGNhbGxpbmcgc2V0RW5kRGF0ZSBzbyBldmVudHMgd2lsbCBiZSBmaXJlZCBvbmNlICovXG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zZXRFbmREYXRlKGVuZERhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZSh0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlUmFuZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2xlYXJTaXRlTm90aWNlcygpIHtcbiAgICAkKCcuc2l0ZS1ub3RpY2UnKS5odG1sKCcnKTtcbiAgfVxuXG4gIGNsZWFyTWVzc2FnZXMoKSB7XG4gICAgJCgnLm1lc3NhZ2UtY29udGFpbmVyJykuaHRtbCgnJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGUgZm9ybWF0IHRvIHVzZSBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkYXRlIGZvcm1hdCB0byBwYXNzZWQgdG8gcGFyc2VyXG4gICAqL1xuICBnZXQgZGF0ZUZvcm1hdCgpIHtcbiAgICBpZiAodGhpcy5sb2NhbGl6ZURhdGVGb3JtYXQgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9jYWxlRGF0ZVN0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZUZvcm1hdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRlcmFuZ2VwaWNrZXIgaW5zdGFuY2UuIFBsYWluIGFuZCBzaW1wbGUuXG4gICAqIEByZXR1cm4ge09iamVjdH0gZGF0ZXJhbmdlIHBpY2tlclxuICAgKi9cbiAgZ2V0IGRhdGVyYW5nZXBpY2tlcigpIHtcbiAgICByZXR1cm4gJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3RvcikuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRhYmFzZSBuYW1lIG9mIHRoZSBnaXZlbiBwcm9qZXRcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9qZWN0IC0gd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHJldHVybiB7U3RyaW5nfSBkYXRhYmFzZSBuYW1lXG4gICAqL1xuICBkYk5hbWUocHJvamVjdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzaXRlTWFwKS5maW5kKGtleSA9PiBzaXRlTWFwW2tleV0gPT09IGAke3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sJycpfS5vcmdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSBkb3dubG9hZCBvZiBnaXZlbiBkYXRhLCBvciBvcGVuIGluIGEgbmV3IHRhYiBpZiBIVE1MNSA8YT4gZG93bmxvYWQgYXR0cmlidXRlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgLSBSYXcgZGF0YSBwcmVwZW5kZWQgd2l0aCBkYXRhIHR5cGUsIGUuZy4gXCJkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsbXkgZGF0YS4uLlwiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHRlbnNpb24gLSB0aGUgZmlsZSBleHRlbnNpb24gdG8gdXNlXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBkb3dubG9hZERhdGEoZGF0YSwgZXh0ZW5zaW9uKSB7XG4gICAgY29uc3QgZW5jb2RlZFVyaSA9IGVuY29kZVVSSShkYXRhKTtcblxuICAgIC8vIGNyZWF0ZSBIVE1MNSBkb3dubG9hZCBlbGVtZW50IGFuZCBmb3JjZSBjbGljayBzbyB3ZSBjYW4gc3BlY2lmeSBhIGZpbGVuYW1lXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpZiAodHlwZW9mIGxpbmsuZG93bmxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspOyAvLyBGaXJlZm94IHJlcXVpcmVzIHRoZSBsaW5rIHRvIGJlIGluIHRoZSBib2R5XG5cbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7dGhpcy5nZXRFeHBvcnRGaWxlbmFtZSgpfS4ke2V4dGVuc2lvbn1gO1xuICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgICAgbGluay5ocmVmID0gZW5jb2RlZFVyaTtcbiAgICAgIGxpbmsuY2xpY2soKTtcblxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTsgLy8gcmVtb3ZlIHRoZSBsaW5rIHdoZW4gZG9uZVxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub3BlbihlbmNvZGVkVXJpKTsgLy8gb3BlbiBpbiBuZXcgdGFiIGlmIGRvd25sb2FkIGlzbid0IHN1cHBvcnRlZCAoKmNvdWdoKiBTYWZhcmkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbGwgaW4gdmFsdWVzIHdpdGhpbiBzZXR0aW5ncyBtb2RhbCB3aXRoIHdoYXQncyBpbiB0aGUgc2Vzc2lvbiBvYmplY3RcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGZpbGxJblNldHRpbmdzKCkge1xuICAgICQuZWFjaCgkKCcjc2V0dGluZ3MtbW9kYWwgaW5wdXQnKSwgKGluZGV4LCBlbCkgPT4ge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHRoaXNbZWwubmFtZV0gPT09ICd0cnVlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0aGlzW2VsLm5hbWVdID09PSBlbC52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZm9jdXMgdG8gU2VsZWN0MiBpbnB1dCBmaWVsZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZm9jdXNTZWxlY3QyKCkge1xuICAgICQoJy5zZWxlY3QyLXNlbGVjdGlvbicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgJCgnLnNlbGVjdDItc2VhcmNoX19maWVsZCcpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IG51bWJlciBiYXNlZCBvbiBjdXJyZW50IHNldHRpbmdzLCBlLmcuIGxvY2FsaXplIHdpdGggY29tbWEgZGVsaW1ldGVyc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG51bSAtIG51bWJlciB0byBmb3JtYXRcbiAgICogQHJldHVybnMge3N0cmluZ30gZm9ybWF0dGVkIG51bWJlclxuICAgKi9cbiAgZm9ybWF0TnVtYmVyKG51bSkge1xuICAgIGNvbnN0IG51bWVyaWNhbEZvcm1hdHRpbmcgPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoJ3BhZ2V2aWV3cy1zZXR0aW5ncy1udW1lcmljYWxGb3JtYXR0aW5nJykgfHwgdGhpcy5jb25maWcuZGVmYXVsdHMubnVtZXJpY2FsRm9ybWF0dGluZztcbiAgICBpZiAobnVtZXJpY2FsRm9ybWF0dGluZyA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5uKG51bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudW07XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0WUF4aXNOdW1iZXIobnVtKSB7XG4gICAgaWYgKG51bSAlIDEgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdE51bWJlcihudW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGF0ZSBoZWFkaW5ncyBhcyBzdHJpbmdzIC0gaTE4biBjb21wbGlhbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBsb2NhbGl6ZWQgLSB3aGV0aGVyIHRoZSBkYXRlcyBzaG91bGQgYmUgbG9jYWxpemVkIHBlciBicm93c2VyIGxhbmd1YWdlXG4gICAqIEByZXR1cm5zIHtBcnJheX0gdGhlIGRhdGUgaGVhZGluZ3MgYXMgc3RyaW5nc1xuICAgKi9cbiAgZ2V0RGF0ZUhlYWRpbmdzKGxvY2FsaXplZCkge1xuICAgIGNvbnN0IGRhdGVIZWFkaW5ncyA9IFtdLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlKS5hZGQoMSwgJ2QnKTtcblxuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQodGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlKTsgZGF0ZS5pc0JlZm9yZShlbmREYXRlKTsgZGF0ZS5hZGQoMSwgJ2QnKSkge1xuICAgICAgaWYgKGxvY2FsaXplZCkge1xuICAgICAgICBkYXRlSGVhZGluZ3MucHVzaChkYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGVIZWFkaW5ncy5wdXNoKGRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0ZUhlYWRpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwbGFuZGVkIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICogVGhpcyBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkIG9mIGdldFBhZ2VVUkwgd2hlbiB5b3Ugd2FudCB0byBjaGFpbiBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHBhZ2VcbiAgICovXG4gIGdldEV4cGFuZGVkUGFnZVVSTChwYWdlKSB7XG4gICAgcmV0dXJuIGAvLyR7dGhpcy5wcm9qZWN0fS5vcmcvdy9pbmRleC5waHA/dGl0bGU9JHtlbmNvZGVVUklDb21wb25lbnQocGFnZS5zY29yZSgpKS5yZXBsYWNlKC8nLywgZXNjYXBlKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbmZvcm1hdGl2ZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvbiB0byBiZSB1c2VkIGZvciBleHBvcnQgb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGZpbGVuYW1lIHdpdGhvdXQgYW4gZXh0ZW5zaW9uXG4gICAqL1xuICBnZXRFeHBvcnRGaWxlbmFtZSgpIHtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JykuZm9ybWF0KCdZWVlZTU1ERCcpLFxuICAgICAgZW5kRGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuc3RhcnRPZignZGF5JykuZm9ybWF0KCdZWVlZTU1ERCcpO1xuICAgIHJldHVybiBgJHt0aGlzLmFwcH0tJHtzdGFydERhdGV9LSR7ZW5kRGF0ZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGZ1bGwgbGluayBmb3IgdGhlIGdpdmVuIHBhZ2UgYW5kIHByb2plY3RcbiAgICogQHBhcmFtICB7c3RyaW5nfSBwYWdlIC0gcGFnZSB0byBsaW5rIHRvXG4gICAqIEBwYXJhbSAge3N0cmluZ30gW3Byb2plY3RdIC0gcHJvamVjdCBsaW5rLCBkZWZhdWx0cyB0byBgdGhpcy5wcm9qZWN0YFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IEhUTUwgbWFya3VwXG4gICAqL1xuICBnZXRQYWdlTGluayhwYWdlLCBwcm9qZWN0KSB7XG4gICAgcmV0dXJuIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt0aGlzLmdldFBhZ2VVUkwocGFnZSwgcHJvamVjdCl9XCI+JHtwYWdlLmRlc2NvcmUoKS5lc2NhcGUoKX08L2E+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2UgLSBwYWdlIG5hbWVcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgcGFnZVxuICAgKi9cbiAgZ2V0UGFnZVVSTChwYWdlLCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0KSB7XG4gICAgcmV0dXJuIGAvLyR7cHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpLmVzY2FwZSgpfS5vcmcvd2lraS8ke3BhZ2Uuc2NvcmUoKS5yZXBsYWNlKC8nLywgZXNjYXBlKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgd2lraSBVUkwgZ2l2ZW4gdGhlIHBhZ2UgbmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2l0ZSAtIHNpdGUgbmFtZSAoZS5nLiBlbi53aWtpcGVkaWEub3JnKVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBzaXRlXG4gICAqL1xuICBnZXRTaXRlTGluayhzaXRlKSB7XG4gICAgcmV0dXJuIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiLy8ke3NpdGV9Lm9yZ1wiPiR7c2l0ZX08L2E+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByb2plY3QgbmFtZSAod2l0aG91dCB0aGUgLm9yZylcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGxhbmcucHJvamVjdG5hbWVcbiAgICovXG4gIGdldCBwcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3QgPSAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkudmFsKCk7XG4gICAgLyoqIEdldCB0aGUgZmlyc3QgMiBjaGFyYWN0ZXJzIGZyb20gdGhlIHByb2plY3QgY29kZSB0byBnZXQgdGhlIGxhbmd1YWdlICovXG4gICAgcmV0dXJuIHByb2plY3QgPyBwcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLm9yZyQvLCAnJykgOiBudWxsO1xuICB9XG5cbiAgZ2V0TG9jYWxlRGF0ZVN0cmluZygpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5sYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybWF0cyA9IHtcbiAgICAgICdhci1zYSc6ICdERC9NTS9ZWScsXG4gICAgICAnYmctYmcnOiAnREQuTS5ZWVlZJyxcbiAgICAgICdjYS1lcyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC10dyc6ICdZWVlZL00vRCcsXG4gICAgICAnY3MtY3onOiAnRC5NLllZWVknLFxuICAgICAgJ2RhLWRrJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2RlLWRlJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VsLWdyJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdlbi11cyc6ICdNL0QvWVlZWScsXG4gICAgICAnZmktZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2ZyLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2hlLWlsJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2h1LWh1JzogJ1lZWVkuIE1NLiBERC4nLFxuICAgICAgJ2lzLWlzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdpdC1pdCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdqYS1qcCc6ICdZWVlZL01NL0REJyxcbiAgICAgICdrby1rcic6ICdZWVlZLU1NLUREJyxcbiAgICAgICdubC1ubCc6ICdELU0tWVlZWScsXG4gICAgICAnbmItbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncGwtcGwnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAncHQtYnInOiAnRC9NL1lZWVknLFxuICAgICAgJ3JvLXJvJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3J1LXJ1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2hyLWhyJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzay1zayc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdzcS1hbCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzdi1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICd0aC10aCc6ICdEL00vWVlZWScsXG4gICAgICAndHItdHInOiAnREQuTU0uWVlZWScsXG4gICAgICAndXItcGsnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaWQtaWQnOiAnREQvTU0vWVlZWScsXG4gICAgICAndWstdWEnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYmUtYnknOiAnREQuTU0uWVlZWScsXG4gICAgICAnc2wtc2knOiAnRC5NLllZWVknLFxuICAgICAgJ2V0LWVlJzogJ0QuTU0uWVlZWScsXG4gICAgICAnbHYtbHYnOiAnWVlZWS5NTS5ERC4nLFxuICAgICAgJ2x0LWx0JzogJ1lZWVkuTU0uREQnLFxuICAgICAgJ2ZhLWlyJzogJ01NL0REL1lZWVknLFxuICAgICAgJ3ZpLXZuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2h5LWFtJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2F6LWxhdG4tYXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnZXUtZXMnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnbWstbWsnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYWYtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAna2EtZ2UnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZm8tZm8nOiAnREQtTU0tWVlZWScsXG4gICAgICAnaGktaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbXMtbXknOiAnREQvTU0vWVlZWScsXG4gICAgICAna2sta3onOiAnREQuTU0uWVlZWScsXG4gICAgICAna3kta2cnOiAnREQuTU0uWVknLFxuICAgICAgJ3N3LWtlJzogJ00vZC9ZWVlZJyxcbiAgICAgICd1ei1sYXRuLXV6JzogJ0REL01NIFlZWVknLFxuICAgICAgJ3R0LXJ1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ3BhLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdndS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAndGEtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAndGUtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2tuLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdtci1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzYS1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtbi1tbic6ICdZWS5NTS5ERCcsXG4gICAgICAnZ2wtZXMnOiAnREQvTU0vWVknLFxuICAgICAgJ2tvay1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzeXItc3knOiAnREQvTU0vWVlZWScsXG4gICAgICAnZHYtbXYnOiAnREQvTU0vWVknLFxuICAgICAgJ2FyLWlxJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdkZS1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1teCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1iZSc6ICdEL01NL1lZWVknLFxuICAgICAgJ2l0LWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ25sLWJlJzogJ0QvTU0vWVlZWScsXG4gICAgICAnbm4tbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncHQtcHQnOiAnREQtTU0tWVlZWScsXG4gICAgICAnc3ItbGF0bi1jcyc6ICdELk0uWVlZWScsXG4gICAgICAnc3YtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2F6LWN5cmwtYXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnbXMtYm4nOiAnREQvTU0vWVlZWScsXG4gICAgICAndXotY3lybC11eic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhci1lZyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1oayc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtYXQnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tYXUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdlcy1lcyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1jYSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzci1jeXJsLWNzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhci1seSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1zZyc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtbHUnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tY2EnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtZ3QnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXItZHonOiAnREQtTU0tWVlZWScsXG4gICAgICAnemgtbW8nOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWxpJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLW56JzogJ0QvTU0vWVlZWScsXG4gICAgICAnZXMtY3InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItbHUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItbWEnOiAnREQtTU0tWVlZWScsXG4gICAgICAnZW4taWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcGEnOiAnTU0vREQvWVlZWScsXG4gICAgICAnZnItbWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItdG4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnZW4temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnZXMtZG8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItb20nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tam0nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtdmUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXIteWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tMDI5JzogJ01NL0REL1lZWVknLFxuICAgICAgJ2VzLWNvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXN5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLWJ6JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXBlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWpvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXR0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWFyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWxiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXp3JzogJ00vRC9ZWVlZJyxcbiAgICAgICdlcy1lYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1rdyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1waCc6ICdNL0QvWVlZWScsXG4gICAgICAnZXMtY2wnOiAnREQtTU0tWVlZWScsXG4gICAgICAnYXItYWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtdXknOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItYmgnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcHknOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItcWEnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtYm8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtc3YnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtaG4nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtbmknOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcHInOiAnREQvTU0vWVlZWScsXG4gICAgICAnYW0tZXQnOiAnRC9NL1lZWVknLFxuICAgICAgJ3R6bS1sYXRuLWR6JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2l1LWxhdG4tY2EnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdzbWEtbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAnbW4tbW9uZy1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZ2QtZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tbXknOiAnRC9NL1lZWVknLFxuICAgICAgJ3Bycy1hZic6ICdERC9NTS9ZWScsXG4gICAgICAnYm4tYmQnOiAnREQtTU0tWVknLFxuICAgICAgJ3dvLXNuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3J3LXJ3JzogJ00vRC9ZWVlZJyxcbiAgICAgICdxdXQtZ3QnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc2FoLXJ1JzogJ01NLkRELllZWVknLFxuICAgICAgJ2dzdy1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdjby1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdvYy1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdtaS1ueic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdnYS1pZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzZS1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdici1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzbW4tZmknOiAnRC5NLllZWVknLFxuICAgICAgJ21vaC1jYSc6ICdNL0QvWVlZWScsXG4gICAgICAnYXJuLWNsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2lpLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdkc2ItZGUnOiAnRC4gTS4gWVlZWScsXG4gICAgICAnaWctbmcnOiAnRC9NL1lZWVknLFxuICAgICAgJ2tsLWdsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2xiLWx1JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2JhLXJ1JzogJ0RELk1NLllZJyxcbiAgICAgICduc28temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAncXV6LWJvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3lvLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdoYS1sYXRuLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdmaWwtcGgnOiAnTS9EL1lZWVknLFxuICAgICAgJ3BzLWFmJzogJ0REL01NL1lZJyxcbiAgICAgICdmeS1ubCc6ICdELU0tWVlZWScsXG4gICAgICAnbmUtbnAnOiAnTS9EL1lZWVknLFxuICAgICAgJ3NlLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2l1LWNhbnMtY2EnOiAnRC9NL1lZWVknLFxuICAgICAgJ3NyLWxhdG4tcnMnOiAnRC5NLllZWVknLFxuICAgICAgJ3NpLWxrJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3NyLWN5cmwtcnMnOiAnRC5NLllZWVknLFxuICAgICAgJ2xvLWxhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ttLWtoJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ2N5LWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2JvLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdzbXMtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2FzLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21sLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdlbi1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdvci1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnYm4taW4nOiAnREQtTU0tWVknLFxuICAgICAgJ3RrLXRtJzogJ0RELk1NLllZJyxcbiAgICAgICdicy1sYXRuLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdtdC1tdCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzci1jeXJsLW1lJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzZS1maSc6ICdELk0uWVlZWScsXG4gICAgICAnenUtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAneGgtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAndG4temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnaHNiLWRlJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ2JzLWN5cmwtYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ3RnLWN5cmwtdGonOiAnREQuTU0ueXknLFxuICAgICAgJ3NyLWxhdG4tYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ3Ntai1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdybS1jaCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzbWotc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAncXV6LWVjJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3F1ei1wZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoci1iYSc6ICdELk0uWVlZWS4nLFxuICAgICAgJ3NyLWxhdG4tbWUnOiAnRC5NLllZWVknLFxuICAgICAgJ3NtYS1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdlbi1zZyc6ICdEL00vWVlZWScsXG4gICAgICAndWctY24nOiAnWVlZWS1NLUQnLFxuICAgICAgJ3NyLWN5cmwtYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ2VzLXVzJzogJ00vRC9ZWVlZJ1xuICAgIH07XG5cbiAgICBjb25zdCBrZXkgPSBuYXZpZ2F0b3IubGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gZm9ybWF0c1trZXldIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmFsdWUgZnJvbSBsb2NhbFN0b3JhZ2UsIHVzaW5nIGEgdGVtcG9yYXJ5IHN0b3JhZ2UgaWYgbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGtleSBmb3IgdGhlIHZhbHVlIHRvIHJldHJpZXZlXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gc3RvcmVkIHZhbHVlXG4gICAqL1xuICBnZXRGcm9tTG9jYWxTdG9yYWdlKGtleSkge1xuICAgIC8vIFNlZSBpZiBsb2NhbFN0b3JhZ2UgaXMgc3VwcG9ydGVkIGFuZCBlbmFibGVkXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFVSTCB0byBmaWxlIGEgcmVwb3J0IG9uIE1ldGEsIHByZWxvYWRlZCB3aXRoIHBlcm1hbGlua1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3BoYWJQYXN0ZV0gVVJMIHRvIGF1dG8tZ2VuZXJhdGVkIGVycm9yIHJlcG9ydCBvbiBQaGFicmljYXRvclxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IFVSTFxuICAgKi9cbiAgZ2V0QnVnUmVwb3J0VVJMKHBoYWJQYXN0ZSkge1xuICAgIGNvbnN0IHJlcG9ydFVSTCA9ICdodHRwczovL21ldGEud2lraW1lZGlhLm9yZy93L2luZGV4LnBocD90aXRsZT1UYWxrOlBhZ2V2aWV3c19BbmFseXNpcyZhY3Rpb249ZWRpdCcgK1xuICAgICAgYCZzZWN0aW9uPW5ldyZwcmVsb2FkdGl0bGU9JHt0aGlzLmFwcC51cGNhc2UoKX0gYnVnIHJlcG9ydGA7XG5cbiAgICBpZiAocGhhYlBhc3RlKSB7XG4gICAgICByZXR1cm4gYCR7cmVwb3J0VVJMfSZwcmVsb2FkPVRhbGs6UGFnZXZpZXdzX0FuYWx5c2lzL1ByZWxvYWQmcHJlbG9hZHBhcmFtc1tdPSR7cGhhYlBhc3RlfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXBvcnRVUkw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBnZW5lcmFsIGluZm9ybWF0aW9uIGFib3V0IGEgcHJvamVjdCwgc3VjaCBhcyBuYW1lc3BhY2VzLCB0aXRsZSBvZiB0aGUgbWFpbiBwYWdlLCBldGMuXG4gICAqIERhdGEgcmV0dXJuZWQgYnkgdGhlIGFwaSBpcyBhbHNvIHN0b3JlZCBpbiB0aGlzLnNpdGVJbmZvXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCBzdWNoIGFzIGVuLndpa2lwZWRpYSAod2l0aCBvciB3aXRob3V0IC5vcmcpXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSByZXNvbHZpbmcgd2l0aCBzaXRlaW5mbyxcbiAgICogICBhbG9uZyB3aXRoIGFueSBvdGhlciBjYWNoZWQgc2l0ZWluZm8gZm9yIG90aGVyIHByb2plY3RzXG4gICAqL1xuICBmZXRjaFNpdGVJbmZvKHByb2plY3QpIHtcbiAgICBwcm9qZWN0ID0gcHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpO1xuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgIGNhY2hlS2V5ID0gYHBhZ2V2aWV3cy1zaXRlaW5mby0ke3Byb2plY3R9YDtcblxuICAgIGlmICh0aGlzLnNpdGVJbmZvW3Byb2plY3RdKSByZXR1cm4gZGZkLnJlc29sdmUodGhpcy5zaXRlSW5mbyk7XG5cbiAgICAvLyB1c2UgY2FjaGVkIHNpdGUgaW5mbyBpZiBwcmVzZW50XG4gICAgaWYgKHNpbXBsZVN0b3JhZ2UuaGFzS2V5KGNhY2hlS2V5KSkge1xuICAgICAgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSA9IHNpbXBsZVN0b3JhZ2UuZ2V0KGNhY2hlS2V5KTtcbiAgICAgIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlcndpc2UgZmV0Y2ggc2l0ZWluZm8gYW5kIHN0b3JlIGluIGNhY2hlXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovLyR7cHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgICAgbWV0YTogJ3NpdGVpbmZvJyxcbiAgICAgICAgICBzaXByb3A6ICdnZW5lcmFsfG5hbWVzcGFjZXMnLFxuICAgICAgICAgIGZvcm1hdDogJ2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnNpdGVJbmZvW3Byb2plY3RdID0gZGF0YS5xdWVyeTtcblxuICAgICAgICAvLyBjYWNoZSBmb3Igb25lIHdlZWsgKFRUTCBpcyBpbiBtaWxsaXNlY29uZHMpXG4gICAgICAgIHNpbXBsZVN0b3JhZ2Uuc2V0KGNhY2hlS2V5LCB0aGlzLnNpdGVJbmZvW3Byb2plY3RdLCB7VFRMOiAxMDAwICogNjAgKiA2MCAqIDI0ICogN30pO1xuXG4gICAgICAgIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuICAgICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgICAgZGZkLnJlamVjdChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIHRvIGdldCBzaXRlaW5mbyBmcm9tIHRoaXMuc2l0ZUluZm8gZm9yIGdpdmVuIHByb2plY3QsIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCBuYW1lLCB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH0gc2l0ZSBpbmZvcm1hdGlvbiBpZiBwcmVzZW50XG4gICAqL1xuICBnZXRTaXRlSW5mbyhwcm9qZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2l0ZUluZm9bcHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdXNlciBhZ2VudCwgaWYgc3VwcG9ydGVkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHVzZXItYWdlbnRcbiAgICovXG4gIGdldFVzZXJBZ2VudCgpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudCA/IG5hdmlnYXRvci51c2VyQWdlbnQgOiAnVW5rbm93bic7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgdmFsdWUgdG8gbG9jYWxTdG9yYWdlLCB1c2luZyBhIHRlbXBvcmFyeSBzdG9yYWdlIGlmIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgZm9yIHRoZSB2YWx1ZSB0byBzZXRcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSB2YWx1ZSB0byBzdG9yZVxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IHN0b3JlZCB2YWx1ZVxuICAgKi9cbiAgc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpIHtcbiAgICAvLyBTZWUgaWYgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBhbmQgZW5hYmxlZFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgdW5pcXVlIGhhc2ggY29kZSBmcm9tIGdpdmVuIHN0cmluZ1xuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0ciAtIHRvIGJlIGhhc2hlZFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBoYXNoXG4gICAqL1xuICBoYXNoQ29kZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZWR1Y2UoKHByZXZIYXNoLCBjdXJyVmFsKSA9PlxuICAgICAgKChwcmV2SGFzaCA8PCA1KSAtIHByZXZIYXNoKSArIGN1cnJWYWwuY2hhckNvZGVBdCgwKSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogSXMgdGhpcyBvbmUgb2YgdGhlIGNoYXJ0LXZpZXcgYXBwcyAodGhhdCBkb2VzIG5vdCBoYXZlIGEgbGlzdCB2aWV3KT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNDaGFydEFwcCgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNMaXN0QXBwKCk7XG4gIH1cblxuICAvKipcbiAgICogSXMgdGhpcyBvbmUgb2YgdGhlIGxpc3QtdmlldyBhcHBzP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc0xpc3RBcHAoKSB7XG4gICAgcmV0dXJuIFsnbGFuZ3ZpZXdzJywgJ21hc3N2aWV3cycsICdyZWRpcmVjdHZpZXdzJ10uaW5jbHVkZXModGhpcy5hcHApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgcHJvamVjdCBpcyBhIG11bHRpbGluZ3VhbCBwcm9qZWN0XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBpcyBtdWx0aWxpbmd1YWwgb3Igbm90XG4gICAqL1xuICBpc011bHRpbGFuZ1Byb2plY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYC4qP1xcXFwuKCR7UHYubXVsdGlsYW5nUHJvamVjdHMuam9pbignfCcpfSlgKS50ZXN0KHRoaXMucHJvamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTWFwIG5vcm1hbGl6ZWQgcGFnZXMgZnJvbSBBUEkgaW50byBhIHN0cmluZyBvZiBwYWdlIG5hbWVzXG4gICAqIFVzZWQgaW4gbm9ybWFsaXplUGFnZU5hbWVzKClcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEBwYXJhbSB7YXJyYXl9IG5vcm1hbGl6ZWRQYWdlcyAtIGFycmF5IG9mIG5vcm1hbGl6ZWQgbWFwcGluZ3MgcmV0dXJuZWQgYnkgdGhlIEFQSVxuICAgKiBAcmV0dXJucyB7YXJyYXl9IHBhZ2VzIHdpdGggdGhlIG5ldyBub3JtYWxpemVkIG5hbWVzLCBpZiBnaXZlblxuICAgKi9cbiAgbWFwTm9ybWFsaXplZFBhZ2VOYW1lcyhwYWdlcywgbm9ybWFsaXplZFBhZ2VzKSB7XG4gICAgbm9ybWFsaXplZFBhZ2VzLmZvckVhY2gobm9ybWFsUGFnZSA9PiB7XG4gICAgICAvKiogZG8gaXQgdGhpcyB3YXkgdG8gcHJlc2VydmUgb3JkZXJpbmcgb2YgcGFnZXMgKi9cbiAgICAgIHBhZ2VzID0gcGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgICBpZiAobm9ybWFsUGFnZS5mcm9tID09PSBwYWdlKSB7XG4gICAgICAgICAgcmV0dXJuIG5vcm1hbFBhZ2UudG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBwYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIHZhbGlkIG11bHRpbGluZ3VhbCBwcm9qZWN0c1xuICAgKiBAcmV0dXJuIHtBcnJheX0gYmFzZSBwcm9qZWN0cywgd2l0aG91dCB0aGUgbGFuZ3VhZ2VcbiAgICovXG4gIHN0YXRpYyBnZXQgbXVsdGlsYW5nUHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICd3aWtpcGVkaWEnLFxuICAgICAgJ3dpa2lib29rcycsXG4gICAgICAnd2lraW5ld3MnLFxuICAgICAgJ3dpa2lxdW90ZScsXG4gICAgICAnd2lraXNvdXJjZScsXG4gICAgICAnd2lraXZlcnNpdHknLFxuICAgICAgJ3dpa2l2b3lhZ2UnXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIG1hc3MgcmVxdWVzdHMgdG8gTWVkaWFXaWtpIEFQSVxuICAgKiBUaGUgQVBJIG5vcm1hbGx5IGxpbWl0cyB0byA1MDAgcGFnZXMsIGJ1dCBnaXZlcyB5b3UgYSAnY29udGludWUnIHZhbHVlXG4gICAqICAgdG8gZmluaXNoIGl0ZXJhdGluZyB0aHJvdWdoIHRoZSByZXNvdXJjZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIHBhcmFtZXRlcnMgdG8gcGFzcyB0byB0aGUgQVBJXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCB0byBxdWVyeSwgZS5nLiBlbi53aWtpcGVkaWEgKC5vcmcgaXMgb3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29udGludWVLZXldIC0gdGhlIGtleSB0byBsb29rIGluIHRoZSBjb250aW51ZSBoYXNoLCBpZiBwcmVzZW50IChlLmcuIGNtY29udGludWUgZm9yIEFQSTpDYXRlZ29yeW1lbWJlcnMpXG4gICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBbZGF0YUtleV0gLSB0aGUga2V5IGZvciB0aGUgbWFpbiBjaHVuayBvZiBkYXRhLCBpbiB0aGUgcXVlcnkgaGFzaCAoZS5nLiBjYXRlZ29yeW1lbWJlcnMgZm9yIEFQSTpDYXRlZ29yeW1lbWJlcnMpXG4gICAqICAgSWYgdGhpcyBpcyBhIGZ1bmN0aW9uIGl0IGlzIGdpdmVuIHRoZSByZXNwb25zZSBkYXRhLCBhbmQgZXhwZWN0ZWQgdG8gcmV0dXJuIHRoZSBkYXRhIHdlIHdhbnQgdG8gY29uY2F0ZW50YXRlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpbWl0XSAtIG1heCBudW1iZXIgb2YgcGFnZXMgdG8gZmV0Y2hcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggZGF0YVxuICAgKi9cbiAgbWFzc0FwaShwYXJhbXMsIHByb2plY3QsIGNvbnRpbnVlS2V5ID0gJ2NvbnRpbnVlJywgZGF0YUtleSwgbGltaXQgPSB0aGlzLmNvbmZpZy5hcGlMaW1pdCkge1xuICAgIGlmICghL1xcLm9yZyQvLnRlc3QocHJvamVjdCkpIHByb2plY3QgKz0gJy5vcmcnO1xuXG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpO1xuICAgIGxldCByZXNvbHZlRGF0YSA9IHtcbiAgICAgIHBhZ2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IGNvbnRpbnVlVmFsdWUgPT4ge1xuICAgICAgbGV0IHJlcXVlc3REYXRhID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGFjdGlvbjogJ3F1ZXJ5JyxcbiAgICAgICAgZm9ybWF0OiAnanNvbicsXG4gICAgICAgIGZvcm1hdHZlcnNpb246ICcyJ1xuICAgICAgfSwgcGFyYW1zKTtcblxuICAgICAgaWYgKGNvbnRpbnVlVmFsdWUpIHJlcXVlc3REYXRhW2NvbnRpbnVlS2V5XSA9IGNvbnRpbnVlVmFsdWU7XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovLyR7cHJvamVjdH0vdy9hcGkucGhwYCxcbiAgICAgICAganNvbnA6ICdjYWxsYmFjaycsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICBkYXRhOiByZXF1ZXN0RGF0YVxuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShkYXRhID0+IHtcbiAgICAgICAgLy8gc29tZSBmYWlsdXJlcyBjb21lIGJhY2sgYXMgMjAwcywgc28gd2Ugc3RpbGwgcmVzb2x2ZSBhbmQgbGV0IHRoZSBsb2NhbCBhcHAgaGFuZGxlIGl0XG4gICAgICAgIGlmIChkYXRhLmVycm9yKSByZXR1cm4gZGZkLnJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgbGV0IGlzRmluaXNoZWQ7XG5cbiAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGZ1bmN0aW9uIHRvIHBhcnNlIHRoZSBkYXRhIHdlIHdhbnQsIGlmIHByb3ZpZGVkXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YUtleSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJlc29sdmVEYXRhLnBhZ2VzID0gcmVzb2x2ZURhdGEucGFnZXMuY29uY2F0KGRhdGFLZXkoZGF0YS5xdWVyeSkpO1xuICAgICAgICAgIGlzRmluaXNoZWQgPSByZXNvbHZlRGF0YS5wYWdlcy5sZW5ndGggPj0gbGltaXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYXBwZW5kIG5ldyBkYXRhIHRvIGRhdGEgZnJvbSBsYXN0IHJlcXVlc3QuIFdlIG1pZ2h0IHdhbnQgYm90aCAncGFnZXMnIGFuZCBkYXRhS2V5XG4gICAgICAgICAgaWYgKGRhdGEucXVlcnkucGFnZXMpIHtcbiAgICAgICAgICAgIHJlc29sdmVEYXRhLnBhZ2VzID0gcmVzb2x2ZURhdGEucGFnZXMuY29uY2F0KGRhdGEucXVlcnkucGFnZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGF0YS5xdWVyeVtkYXRhS2V5XSkge1xuICAgICAgICAgICAgcmVzb2x2ZURhdGFbZGF0YUtleV0gPSAocmVzb2x2ZURhdGFbZGF0YUtleV0gfHwgW10pLmNvbmNhdChkYXRhLnF1ZXJ5W2RhdGFLZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWYgcGFnZXMgaXMgbm90IHRoZSBjb2xsZWN0aW9uIHdlIHdhbnQsIGl0IHdpbGwgYmUgZWl0aGVyIGFuIGVtcHR5IGFycmF5IG9yIG9uZSBlbnRyeSB3aXRoIGJhc2ljIHBhZ2UgaW5mb1xuICAgICAgICAgIC8vICAgZGVwZW5kaW5nIG9uIHdoYXQgQVBJIHdlJ3JlIGhpdHRpbmcuIFNvIHJlc29sdmVEYXRhW2RhdGFLZXldIHdpbGwgaGl0IHRoZSBsaW1pdFxuICAgICAgICAgIGlzRmluaXNoZWQgPSByZXNvbHZlRGF0YS5wYWdlcy5sZW5ndGggPj0gbGltaXQgfHwgcmVzb2x2ZURhdGFbZGF0YUtleV0ubGVuZ3RoID49IGxpbWl0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSByZWN1cnNpdmUgY2FsbCBpZiBuZWVkZWQsIHdhaXRpbmcgMTAwbXNcbiAgICAgICAgaWYgKCFpc0ZpbmlzaGVkICYmIGRhdGEuY29udGludWUgJiYgZGF0YS5jb250aW51ZVtjb250aW51ZUtleV0pIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG1ha2VSZXF1ZXN0KGRhdGEuY29udGludWVbY29udGludWVLZXldKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGluZGljYXRlIHRoZXJlIHdlcmUgbW9yZSBlbnRyaWVzIHRoYW4gdGhlIGxpbWl0XG4gICAgICAgICAgaWYgKGRhdGEuY29udGludWUpIHJlc29sdmVEYXRhLmNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICBkZmQucmVzb2x2ZShyZXNvbHZlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIGRmZC5yZWplY3QoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbWFrZVJlcXVlc3QoKTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogTG9jYWxpemUgTnVtYmVyIG9iamVjdCB3aXRoIGRlbGltaXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gdGhlIE51bWJlciwgZS5nLiAxMjM0NTY3XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gd2l0aCBsb2NhbGUgZGVsaW1pdGVycywgZS5nLiAxLDIzNCw1NjcgKGVuLVVTKVxuICAgKi9cbiAgbih2YWx1ZSkge1xuICAgIHJldHVybiAobmV3IE51bWJlcih2YWx1ZSkpLnRvTG9jYWxlU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGJhc2ljIGluZm8gb24gZ2l2ZW4gcGFnZXMsIGluY2x1ZGluZyB0aGUgbm9ybWFsaXplZCBwYWdlIG5hbWVzLlxuICAgKiBFLmcuIG1hc2N1bGluZSB2ZXJzdXMgZmVtaW5pbmUgbmFtZXNwYWNlcyBvbiBkZXdpa2lcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSB3aXRoIGRhdGEgZmV0Y2hlZCBmcm9tIEFQSVxuICAgKi9cbiAgZ2V0UGFnZUluZm8ocGFnZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICB1cmw6IGBodHRwczovLyR7dGhpcy5wcm9qZWN0fS5vcmcvdy9hcGkucGhwP2FjdGlvbj1xdWVyeSZwcm9wPWluZm8maW5wcm9wPXByb3RlY3Rpb258d2F0Y2hlcnNgICtcbiAgICAgICAgYCZmb3JtYXR2ZXJzaW9uPTImZm9ybWF0PWpzb24mdGl0bGVzPSR7cGFnZXMuam9pbignfCcpfWAsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBsZXQgcGFnZURhdGEgPSB7fTtcbiAgICAgIGRhdGEucXVlcnkucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgICAgcGFnZURhdGFbcGFnZS50aXRsZV0gPSBwYWdlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGZkLnJlc29sdmUocGFnZURhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgaG93IG1hbnkgZGF5cyBhcmUgaW4gdGhlIHNlbGVjdGVkIGRhdGUgcmFuZ2VcbiAgICogQHJldHVybnMge2ludGVnZXJ9IG51bWJlciBvZiBkYXlzXG4gICAqL1xuICBudW1EYXlzSW5SYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5kaWZmKHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSwgJ2RheXMnKSArIDE7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUga2V5L3ZhbHVlIHBhaXJzIG9mIFVSTCBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFttdWx0aVBhcmFtXSAtIHBhcmFtZXRlciB3aG9zZSB2YWx1ZXMgbmVlZHMgdG8gc3BsaXQgYnkgcGlwZSBjaGFyYWN0ZXJcbiAgICogQHJldHVybnMge09iamVjdH0ga2V5L3ZhbHVlIHBhaXJzIHJlcHJlc2VudGF0aW9uIG9mIHF1ZXJ5IHN0cmluZ1xuICAgKi9cbiAgcGFyc2VRdWVyeVN0cmluZyhtdWx0aVBhcmFtKSB7XG4gICAgY29uc3QgdXJpID0gZGVjb2RlVVJJKGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSksXG4gICAgICBjaHVua3MgPSB1cmkuc3BsaXQoJyYnKTtcbiAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNodW5rID0gY2h1bmtzW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgIGlmIChtdWx0aVBhcmFtICYmIGNodW5rWzBdID09PSBtdWx0aVBhcmFtKSB7XG4gICAgICAgIHBhcmFtc1ttdWx0aVBhcmFtXSA9IGNodW5rWzFdLnNwbGl0KCd8JykuZmlsdGVyKHBhcmFtID0+ICEhcGFyYW0pLnVuaXF1ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zW2NodW5rWzBdXSA9IGNodW5rWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogU2ltcGxlIG1ldHJpYyB0byBzZWUgaG93IG1hbnkgdXNlIGl0IChwYWdldmlld3Mgb2YgdGhlIHBhZ2V2aWV3LCBhIG1ldGEtcGFnZXZpZXcsIGlmIHlvdSB3aWxsIDopXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBvbmUgb2Y6IHB2LCBsdiwgdHYsIHN2LCBtc1xuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwYXRjaFVzYWdlKGFwcCkge1xuICAgIGlmIChtZXRhUm9vdCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgLy8ke21ldGFSb290fS91c2FnZS8ke3RoaXMuYXBwfS8ke3RoaXMucHJvamVjdCB8fCBpMThuTGFuZ31gLFxuICAgICAgICBtZXRob2Q6ICdQQVRDSCdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGltZXN0YW1wIG9mIHdoZW4gcHJvY2VzcyBzdGFydGVkXG4gICAqIEByZXR1cm4ge21vbWVudH0gc3RhcnQgdGltZVxuICAgKi9cbiAgcHJvY2Vzc1N0YXJ0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1N0YXJ0ID0gbW9tZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVsYXBzZWQgdGltZSBmcm9tIHRoaXMucHJvY2Vzc1N0YXJ0LCBhbmQgc2hvdyBpdFxuICAgKiBAcmV0dXJuIHttb21lbnR9IEVsYXBzZWQgdGltZSBmcm9tIGB0aGlzLnByb2Nlc3NTdGFydGAgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICBwcm9jZXNzRW5kZWQoKSB7XG4gICAgY29uc3QgZW5kVGltZSA9IG1vbWVudCgpLFxuICAgICAgZWxhcHNlZFRpbWUgPSBlbmRUaW1lLmRpZmYodGhpcy5wcm9jZXNzU3RhcnQsICdtaWxsaXNlY29uZHMnKTtcblxuICAgIC8qKiBGSVhNRTogcmVwb3J0IHRoaXMgYnVnOiBzb21lIGxhbmd1YWdlcyBkb24ndCBwYXJzZSBQTFVSQUwgY29ycmVjdGx5ICgnaGUnIGZvciBleGFtcGxlKSB3aXRoIHRoZSBFbmdsaXNoIGZhbGxiYWNrIG1lc3NhZ2UgKi9cbiAgICB0cnkge1xuICAgICAgJCgnLmVsYXBzZWQtdGltZScpLmF0dHIoJ2RhdGV0aW1lJywgZW5kVGltZS5mb3JtYXQoKSlcbiAgICAgICAgLnRleHQoJC5pMThuKCdlbGFwc2VkLXRpbWUnLCBlbGFwc2VkVGltZSAvIDEwMDApKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpbnRlbnRpb25hbGwgbm90aGluZywgZXZlcnl0aGluZyB3aWxsIHN0aWxsIHNob3dcbiAgICB9XG5cbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XG4gIH1cblxuICAvKipcbiAgICogQWRhcHRlZCBmcm9tIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZGFuZHYvNDdjYmovIGNvdXJ0ZXN5IG9mIGRhbmR2XG4gICAqXG4gICAqIFNhbWUgYXMgXy5kZWJvdW5jZSBidXQgcXVldWVzIGFuZCBleGVjdXRlcyBhbGwgZnVuY3Rpb24gY2FsbHNcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIC0gZnVuY3Rpb24gdG8gZGVib3VuY2VcbiAgICogQHBhcmFtICB7ZGVsYXl9IGRlbGF5IC0gZGVsYXkgZHVyYXRpb24gb2YgbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSAge29iamVjdH0gY29udGV4dCAtIHNjb3BlIHRoZSBmdW5jdGlvbiBzaG91bGQgcmVmZXIgdG9cbiAgICogQHJldHVybiB7RnVuY3Rpb259IHJhdGUtbGltaXRlZCBmdW5jdGlvbiB0byBjYWxsIGluc3RlYWQgb2YgeW91ciBmdW5jdGlvblxuICAgKi9cbiAgcmF0ZUxpbWl0KGZuLCBkZWxheSwgY29udGV4dCkge1xuICAgIGxldCBxdWV1ZSA9IFtdLCB0aW1lcjtcblxuICAgIGNvbnN0IHByb2Nlc3NRdWV1ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgZm4uYXBwbHkoaXRlbS5jb250ZXh0LCBpdGVtLmFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpLCB0aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBsaW1pdGVkKCkge1xuICAgICAgcXVldWUucHVzaCh7XG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQgfHwgdGhpcyxcbiAgICAgICAgYXJndW1lbnRzOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHByb2Nlc3NRdWV1ZSgpOyAvLyBzdGFydCBpbW1lZGlhdGVseSBvbiB0aGUgZmlyc3QgaW52b2NhdGlvblxuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKHByb2Nlc3NRdWV1ZSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgU2VsZWN0MiByZWxhdGVkIHN0dWZmIHRoZW4gYWRkcyBpdCBiYWNrXG4gICAqIEFsc28gbWlnaHQgcmVzdWx0IGluIHRoZSBjaGFydCBiZWluZyByZS1yZW5kZXJlZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRTZWxlY3QyKCkge1xuICAgIGNvbnN0IHNlbGVjdDJJbnB1dCA9ICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcbiAgICBzZWxlY3QySW5wdXQub2ZmKCdjaGFuZ2UnKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MigndmFsJywgbnVsbCk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2RhdGEnLCBudWxsKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MignZGVzdHJveScpO1xuICAgIHRoaXMuc2V0dXBTZWxlY3QyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIGFscGhhIGxldmVsIG9mIGFuIHJnYmEgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gcmdiYSB2YWx1ZVxuICAgKiBAcGFyYW0ge2Zsb2F0fHN0cmluZ30gYWxwaGEgLSB0cmFuc3BhcmVuY3kgYXMgZmxvYXQgdmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ30gcmdiYSB2YWx1ZVxuICAgKi9cbiAgcmdiYSh2YWx1ZSwgYWxwaGEpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLFxccypcXGRcXCkvLCBgLCAke2FscGhhfSlgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGEgcGFydGljdWxhciBzZXR0aW5nIHRvIHNlc3Npb24gYW5kIGxvY2FsU3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gc2V0dGluZ3Mga2V5XG4gICAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW59IHZhbHVlIC0gdmFsdWUgdG8gc2F2ZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2F2ZVNldHRpbmcoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKGBwYWdldmlld3Mtc2V0dGluZ3MtJHtrZXl9YCwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIHNlbGVjdGVkIHNldHRpbmdzIHdpdGhpbiB0aGUgc2V0dGluZ3MgbW9kYWxcbiAgICogUHJlZmVyIHRoaXMgaW1wbGVtZW50YXRpb24gb3ZlciBhIGxhcmdlIGxpYnJhcnkgbGlrZSBzZXJpYWxpemVPYmplY3Qgb3Igc2VyaWFsaXplSlNPTlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2F2ZVNldHRpbmdzKCkge1xuICAgIC8qKiB0cmFjayBpZiB3ZSdyZSBjaGFuZ2luZyB0byBub19hdXRvY29tcGxldGUgbW9kZSAqL1xuICAgIGNvbnN0IHdhc0F1dG9jb21wbGV0ZSA9IHRoaXMuYXV0b2NvbXBsZXRlID09PSAnbm9fYXV0b2NvbXBsZXRlJztcblxuICAgICQuZWFjaCgkKCcjc2V0dGluZ3MtbW9kYWwgaW5wdXQnKSwgKGluZGV4LCBlbCkgPT4ge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZyhlbC5uYW1lLCBlbC5jaGVja2VkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZyhlbC5uYW1lLCBlbC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hcHAgIT09ICd0b3B2aWV3cycpIHtcbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLmxvY2FsZS5mb3JtYXQgPSB0aGlzLmRhdGVGb3JtYXQ7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci51cGRhdGVFbGVtZW50KCk7XG5cbiAgICAgIHRoaXMuc2V0dXBTZWxlY3QyQ29sb3JzKCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogSWYgd2UgY2hhbmdlZCB0by9mcm9tIG5vX2F1dG9jb21wbGV0ZSB3ZSBoYXZlIHRvIHJlc2V0IFNlbGVjdDIgZW50aXJlbHlcbiAgICAgICAqICAgYXMgc2V0U2VsZWN0MkRlZmF1bHRzIGlzIHN1cGVyIGJ1Z2d5IGR1ZSB0byBTZWxlY3QyIGNvbnN0cmFpbnRzXG4gICAgICAgKiBTbyBsZXQncyBvbmx5IHJlc2V0IGlmIHdlIGhhdmUgdG9cbiAgICAgICAqL1xuICAgICAgaWYgKCh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZScpICE9PSB3YXNBdXRvY29tcGxldGUpIHtcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdDIoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgICAkKCcuYmVnaW4tYXQtemVyby1vcHRpb24nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzSW5wdXQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRGlyZWN0bHkgc2V0IGl0ZW1zIGluIFNlbGVjdDJcbiAgICogQ3VycmVudGx5IGlzIG5vdCBhYmxlIHRvIHJlbW92ZSB1bmRlcnNjb3JlcyBmcm9tIHBhZ2UgbmFtZXNcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gaXRlbXMgLSBwYWdlIHRpdGxlc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gdW50b3VjaGVkIGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXRTZWxlY3QyRGVmYXVsdHMoaXRlbXMpIHtcbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgZXNjYXBlZFRleHQgPSAkKCc8ZGl2PicpLnRleHQoaXRlbSkuaHRtbCgpO1xuICAgICAgJCgnPG9wdGlvbj4nICsgZXNjYXBlZFRleHQgKyAnPC9vcHRpb24+JykuYXBwZW5kVG8odGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcbiAgICB9KTtcbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MigndmFsJywgaXRlbXMpO1xuICAgICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KS5zZWxlY3QyKCdjbG9zZScpO1xuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRhdGVyYW5nZSBwaWNrZXIgdmFsdWVzIGFuZCB0aGlzLnNwZWNpYWxSYW5nZSBiYXNlZCBvbiBwcm92aWRlZCBzcGVjaWFsIHJhbmdlIGtleVxuICAgKiBXQVJOSU5HOiBub3QgdG8gYmUgY2FsbGVkIG9uIGRhdGVyYW5nZSBwaWNrZXIgR1VJIGV2ZW50cyAoZS5nLiBzcGVjaWFsIHJhbmdlIGJ1dHRvbnMpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gb25lIG9mIHNwZWNpYWwgcmFuZ2VzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcyxcbiAgICogICBpbmNsdWRpbmcgZHluYW1pYyBsYXRlc3QgcmFuZ2UsIHN1Y2ggYXMgYGxhdGVzdC0xNWAgZm9yIGxhdGVzdCAxNSBkYXlzXG4gICAqIEByZXR1cm5zIHtvYmplY3R8bnVsbH0gdXBkYXRlZCB0aGlzLnNwZWNpYWxSYW5nZSBvYmplY3Qgb3IgbnVsbCBpZiB0eXBlIHdhcyBpbnZhbGlkXG4gICAqL1xuICBzZXRTcGVjaWFsUmFuZ2UodHlwZSkge1xuICAgIGNvbnN0IHJhbmdlSW5kZXggPSBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKS5pbmRleE9mKHR5cGUpO1xuICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XG5cbiAgICBpZiAodHlwZS5pbmNsdWRlcygnbGF0ZXN0LScpKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBwYXJzZUludCh0eXBlLnJlcGxhY2UoJ2xhdGVzdC0nLCAnJyksIDEwKSB8fCAyMDsgLy8gZmFsbGJhY2sgb2YgMjBcbiAgICAgIFtzdGFydERhdGUsIGVuZERhdGVdID0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcy5sYXRlc3Qob2Zmc2V0KTtcbiAgICB9IGVsc2UgaWYgKHJhbmdlSW5kZXggPj0gMCkge1xuICAgICAgLyoqIHRyZWF0ICdsYXRlc3QnIGFzIGEgZnVuY3Rpb24gKi9cbiAgICAgIFtzdGFydERhdGUsIGVuZERhdGVdID0gdHlwZSA9PT0gJ2xhdGVzdCcgPyB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLmxhdGVzdCgpIDogdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1t0eXBlXTtcbiAgICAgICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLmVxKHJhbmdlSW5kZXgpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IHtcbiAgICAgIHJhbmdlOiB0eXBlLFxuICAgICAgdmFsdWU6IGAke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KX0gLSAke2VuZERhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCl9YFxuICAgIH07XG5cbiAgICAvKiogZGlyZWN0bHkgYXNzaWduIHN0YXJ0RGF0ZSB0aGVuIHVzZSBzZXRFbmREYXRlIHNvIHRoYXQgdGhlIGV2ZW50cyB3aWxsIGJlIGZpcmVkIG9uY2UgKi9cbiAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc2V0RW5kRGF0ZShlbmREYXRlKTtcblxuICAgIHJldHVybiB0aGlzLnNwZWNpYWxSYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBjb2xvcnMgZm9yIFNlbGVjdDIgZW50cmllcyBzbyB3ZSBjYW4gZHluYW1pY2FsbHkgY2hhbmdlIHRoZW1cbiAgICogVGhpcyBpcyBhIG5lY2Vzc2FyeSBldmlsLCBhcyB3ZSBoYXZlIHRvIG1hcmsgdGhlbSBhcyAhaW1wb3J0YW50XG4gICAqICAgYW5kIHNpbmNlIHRoZXJlIGFyZSBhbnkgbnVtYmVyIG9mIGVudGlyZXMsIHdlIG5lZWQgdG8gdXNlIG50aC1jaGlsZCBzZWxlY3RvcnNcbiAgICogQHJldHVybnMge0NTU1N0eWxlc2hlZXR9IG91ciBuZXcgc3R5bGVzaGVldFxuICAgKi9cbiAgc2V0dXBTZWxlY3QyQ29sb3JzKCkge1xuICAgIC8qKiBmaXJzdCBkZWxldGUgb2xkIHN0eWxlc2hlZXQsIGlmIHByZXNlbnQgKi9cbiAgICBpZiAodGhpcy5jb2xvcnNTdHlsZUVsKSB0aGlzLmNvbG9yc1N0eWxlRWwucmVtb3ZlKCk7XG5cbiAgICAvKiogY3JlYXRlIG5ldyBzdHlsZXNoZWV0ICovXG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0aGlzLmNvbG9yc1N0eWxlRWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTsgLy8gV2ViS2l0IGhhY2sgOihcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRoaXMuY29sb3JzU3R5bGVFbCk7XG5cbiAgICAvKiogYWRkIGNvbG9yIHJ1bGVzICovXG4gICAgdGhpcy5jb25maWcuY29sb3JzLmZvckVhY2goKGNvbG9yLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5jb2xvcnNTdHlsZUVsLnNoZWV0Lmluc2VydFJ1bGUoYC5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlOm50aC1vZi10eXBlKCR7aW5kZXggKyAxfSkgeyBiYWNrZ3JvdW5kOiAke2NvbG9yfSAhaW1wb3J0YW50IH1gLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNvbG9yc1N0eWxlRWwuc2hlZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3Jvc3MtYXBwbGljYXRpb24gbGlzdGVuZXJzXG4gICAqIEVhY2ggYXBwIGhhcyBpdCdzIG93biBzZXR1cExpc3RlbmVycygpIHRoYXQgc2hvdWxkIGNhbGwgc3VwZXIuc2V0dXBMaXN0ZW5lcnMoKVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzZXR1cExpc3RlbmVycygpIHtcbiAgICAvKiogcHJldmVudCBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvdXIgZm9yIGFueSBsaW5rIHdpdGggaHJlZj1cIiNcIiAqL1xuICAgICQoXCJhW2hyZWY9JyMnXVwiKS5vbignY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICAvKiogZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLWNzdicpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0Q1NWLmJpbmQodGhpcykpO1xuICAgICQoJy5kb3dubG9hZC1qc29uJykub24oJ2NsaWNrJywgdGhpcy5leHBvcnRKU09OLmJpbmQodGhpcykpO1xuXG4gICAgLyoqIHByb2plY3QgaW5wdXQgbGlzdGVuZXJzLCBzYXZpbmcgYW5kIHJlc3RvcmluZyBvbGQgdmFsdWUgaWYgbmV3IG9uZSBpcyBpbnZhbGlkICovXG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLm9uKCdmb2N1c2luJywgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRhdGFzZXQudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH0pO1xuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS5vbignY2hhbmdlJywgZSA9PiB0aGlzLnZhbGlkYXRlUHJvamVjdChlKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlcyBvZiBmb3JtIGJhc2VkIG9uIGxvY2FsU3RvcmFnZSBvciBkZWZhdWx0cywgYWRkIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBTZXR0aW5nc01vZGFsKCkge1xuICAgIC8qKiBmaWxsIGluIHZhbHVlcywgZXZlcnl0aGluZyBpcyBlaXRoZXIgYSBjaGVja2JveCBvciByYWRpbyAqL1xuICAgIHRoaXMuZmlsbEluU2V0dGluZ3MoKTtcblxuICAgIC8qKiBhZGQgbGlzdGVuZXIgKi9cbiAgICAkKCcuc2F2ZS1zZXR0aW5ncy1idG4nKS5vbignY2xpY2snLCB0aGlzLnNhdmVTZXR0aW5ncy5iaW5kKHRoaXMpKTtcbiAgICAkKCcuY2FuY2VsLXNldHRpbmdzLWJ0bicpLm9uKCdjbGljaycsIHRoaXMuZmlsbEluU2V0dGluZ3MuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0cyB1cCB0aGUgZGF0ZXJhbmdlIHNlbGVjdG9yIGFuZCBhZGRzIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cERhdGVSYW5nZVNlbGVjdG9yKCkge1xuICAgIGNvbnN0IGRhdGVSYW5nZVNlbGVjdG9yID0gJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3Rvcik7XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcyB0byBoYXZlIGkxOG4gYXMga2V5c1xuICAgICAqIFRoaXMgaXMgd2hhdCBpcyBzaG93biBhcyB0aGUgc3BlY2lhbCByYW5nZXMgKExhc3QgbW9udGgsIGV0Yy4pIGluIHRoZSBkYXRlcGlja2VyIG1lbnVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGxldCByYW5nZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSAnbGF0ZXN0JykgcmV0dXJuOyAvLyB0aGlzIGlzIGEgZnVuY3Rpb24sIG5vdCBtZWFudCB0byBiZSBpbiB0aGUgbGlzdCBvZiBzcGVjaWFsIHJhbmdlc1xuICAgICAgcmFuZ2VzWyQuaTE4bihrZXkpXSA9IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNba2V5XTtcbiAgICB9KTtcblxuICAgIGxldCBkYXRlcGlja2VyT3B0aW9ucyA9IHtcbiAgICAgIGxvY2FsZToge1xuICAgICAgICBmb3JtYXQ6IHRoaXMuZGF0ZUZvcm1hdCxcbiAgICAgICAgYXBwbHlMYWJlbDogJC5pMThuKCdhcHBseScpLFxuICAgICAgICBjYW5jZWxMYWJlbDogJC5pMThuKCdjYW5jZWwnKSxcbiAgICAgICAgY3VzdG9tUmFuZ2VMYWJlbDogJC5pMThuKCdjdXN0b20tcmFuZ2UnKSxcbiAgICAgICAgZGF5c09mV2VlazogW1xuICAgICAgICAgICQuaTE4bignc3UnKSxcbiAgICAgICAgICAkLmkxOG4oJ21vJyksXG4gICAgICAgICAgJC5pMThuKCd0dScpLFxuICAgICAgICAgICQuaTE4bignd2UnKSxcbiAgICAgICAgICAkLmkxOG4oJ3RoJyksXG4gICAgICAgICAgJC5pMThuKCdmcicpLFxuICAgICAgICAgICQuaTE4bignc2EnKVxuICAgICAgICBdLFxuICAgICAgICBtb250aE5hbWVzOiBbXG4gICAgICAgICAgJC5pMThuKCdqYW51YXJ5JyksXG4gICAgICAgICAgJC5pMThuKCdmZWJydWFyeScpLFxuICAgICAgICAgICQuaTE4bignbWFyY2gnKSxcbiAgICAgICAgICAkLmkxOG4oJ2FwcmlsJyksXG4gICAgICAgICAgJC5pMThuKCdtYXknKSxcbiAgICAgICAgICAkLmkxOG4oJ2p1bmUnKSxcbiAgICAgICAgICAkLmkxOG4oJ2p1bHknKSxcbiAgICAgICAgICAkLmkxOG4oJ2F1Z3VzdCcpLFxuICAgICAgICAgICQuaTE4bignc2VwdGVtYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdvY3RvYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdub3ZlbWJlcicpLFxuICAgICAgICAgICQuaTE4bignZGVjZW1iZXInKVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCh0aGlzLmNvbmZpZy5kYXlzQWdvLCAnZGF5cycpLFxuICAgICAgbWluRGF0ZTogdGhpcy5jb25maWcubWluRGF0ZSxcbiAgICAgIG1heERhdGU6IHRoaXMuY29uZmlnLm1heERhdGUsXG4gICAgICByYW5nZXM6IHJhbmdlc1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25maWcuZGF0ZUxpbWl0KSBkYXRlcGlja2VyT3B0aW9ucy5kYXRlTGltaXQgPSB7IGRheXM6IHRoaXMuY29uZmlnLmRhdGVMaW1pdCB9O1xuXG4gICAgZGF0ZVJhbmdlU2VsZWN0b3IuZGF0ZXJhbmdlcGlja2VyKGRhdGVwaWNrZXJPcHRpb25zKTtcblxuICAgIC8qKiBzbyBwZW9wbGUga25vdyB3aHkgdGhleSBjYW4ndCBxdWVyeSBkYXRhIG9sZGVyIHRoYW4gSnVseSAyMDE1ICovXG4gICAgJCgnLmRhdGVyYW5nZXBpY2tlcicpLmFwcGVuZChcbiAgICAgICQoJzxkaXY+JylcbiAgICAgICAgLmFkZENsYXNzKCdkYXRlcmFuZ2Utbm90aWNlJylcbiAgICAgICAgLmh0bWwoJC5pMThuKCdkYXRlLW5vdGljZScsIGRvY3VtZW50LnRpdGxlLFxuICAgICAgICAgIFwiPGEgaHJlZj0naHR0cDovL3N0YXRzLmdyb2suc2UnIHRhcmdldD0nX2JsYW5rJz5zdGF0cy5ncm9rLnNlPC9hPlwiLFxuICAgICAgICAgIGAkeyQuaTE4bignanVseScpfSAyMDE1YFxuICAgICAgICApKVxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3BlY2lhbCBkYXRlIHJhbmdlIG9wdGlvbnMgKGJ1dHRvbnMgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGRhdGVyYW5nZSBwaWNrZXIpXG4gICAgICpcbiAgICAgKiBXQVJOSU5HOiB3ZSdyZSB1bmFibGUgdG8gYWRkIGNsYXNzIG5hbWVzIG9yIGRhdGEgYXR0cnMgdG8gdGhlIHJhbmdlIG9wdGlvbnMsXG4gICAgICogc28gY2hlY2tpbmcgd2hpY2ggd2FzIGNsaWNrZWQgaXMgaGFyZGNvZGVkIGJhc2VkIG9uIHRoZSBpbmRleCBvZiB0aGUgTEksXG4gICAgICogYXMgZGVmaW5lZCBpbiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzXG4gICAgICovXG4gICAgJCgnLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9ICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLmluZGV4KGUudGFyZ2V0KSxcbiAgICAgICAgY29udGFpbmVyID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuY29udGFpbmVyLFxuICAgICAgICBpbnB1dHMgPSBjb250YWluZXIuZmluZCgnLmRhdGVyYW5nZXBpY2tlcl9pbnB1dCBpbnB1dCcpO1xuICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSB7XG4gICAgICAgIHJhbmdlOiBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKVtpbmRleF0sXG4gICAgICAgIHZhbHVlOiBgJHtpbnB1dHNbMF0udmFsdWV9IC0gJHtpbnB1dHNbMV0udmFsdWV9YFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLm9uKCdhcHBseS5kYXRlcmFuZ2VwaWNrZXInLCAoZSwgYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLmNob3NlbkxhYmVsID09PSAkLmkxOG4oJ2N1c3RvbS1yYW5nZScpKSB7XG4gICAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0gbnVsbDtcblxuICAgICAgICAvKiogZm9yY2UgZXZlbnRzIHRvIHJlLWZpcmUgc2luY2UgYXBwbHkuZGF0ZXJhbmdlcGlja2VyIG9jY3VycyBiZWZvcmUgJ2NoYW5nZScgZXZlbnQgKi9cbiAgICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIudXBkYXRlRWxlbWVudCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0ZhdGFsRXJyb3JzKGVycm9ycykge1xuICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgIGVycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICBgPHN0cm9uZz4keyQuaTE4bignZmF0YWwtZXJyb3InKX08L3N0cm9uZz46IDxjb2RlPiR7ZXJyb3J9PC9jb2RlPmAsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgdGhyb3cgZXJyb3JzWzBdO1xuICAgIH0gZWxzZSBpZiAoZXJyb3JzICYmIGVycm9yc1swXSAmJiBlcnJvcnNbMF0uc3RhY2spIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvL3Rvb2xzLndtZmxhYnMub3JnL211c2lrYW5pbWFsL3Bhc3RlJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvbnRlbnQ6ICcnICtcbiAgICAgICAgICAgIGBcXG5kYXRlOiAgICAgICR7bW9tZW50KCkudXRjKCkuZm9ybWF0KCl9YCArXG4gICAgICAgICAgICBgXFxudG9vbDogICAgICAke3RoaXMuYXBwfWAgK1xuICAgICAgICAgICAgYFxcbmxhbmd1YWdlOiAgJHtpMThuTGFuZ31gICtcbiAgICAgICAgICAgIGBcXG5jaGFydDogICAgICR7dGhpcy5jaGFydFR5cGV9YCArXG4gICAgICAgICAgICBgXFxudXJsOiAgICAgICAke2RvY3VtZW50LmxvY2F0aW9uLmhyZWZ9YCArXG4gICAgICAgICAgICBgXFxudXNlckFnZW50OiAke3RoaXMuZ2V0VXNlckFnZW50KCl9YCArXG4gICAgICAgICAgICBgXFxudHJhY2U6ICAgICAke2Vycm9yc1swXS5zdGFja31gXG4gICAgICAgICAgLFxuICAgICAgICAgIHRpdGxlOiBgUGFnZXZpZXdzIEFuYWx5c2lzIGVycm9yIHJlcG9ydDogJHtlcnJvcnNbMF19YFxuICAgICAgICB9XG4gICAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5vYmplY3ROYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTChkYXRhLnJlc3VsdC5vYmplY3ROYW1lKSksXG4gICAgICAgICAgICAnZXJyb3InXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAgICQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpLFxuICAgICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKSxcbiAgICAgICAgICAnZXJyb3InXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3BsYXNoIGluIGNvbnNvbGUsIGp1c3QgZm9yIGZ1blxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBvdXRwdXRcbiAgICovXG4gIHNwbGFzaCgpIHtcbiAgICBjb25zdCBzdHlsZSA9ICdiYWNrZ3JvdW5kOiAjZWVlOyBjb2xvcjogIzU1NTsgcGFkZGluZzogNHB4OyBmb250LWZhbWlseTptb25vc3BhY2UnO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgIF9fXyAgICAgICAgICAgIF9fIF8gICAgICAgICAgICAgICAgICAgICBfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICB8IF8gXFxcXCAgX18gXyAgICAvIF9gIHwgICBfX18gICAgX18gX18gICAgKF8pICAgICBfX18gICBfXyBfXyBfXyAgX19fICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgIHwgIF8vIC8gX2AgfCAgIFxcXFxfXywgfCAgLyAtXykgICBcXFxcIFYgLyAgICB8IHwgICAgLyAtXykgIFxcXFwgViAgViAvIChfLTwgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICBffF98XyAgXFxcXF9fLF98ICAgfF9fXy8gICBcXFxcX19ffCAgIF9cXFxcXy9fICAgX3xffF8gICBcXFxcX19ffCAgIFxcXFxfL1xcXFxfLyAgL19fL18gICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICBffCBcIlwiXCIgfF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8ICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICBcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCcgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICAgICAgICAgIF9fXyAgICAgICAgICAgICAgICAgICAgIF8gIF8gICAgIF8gICAgICAgICAgICAgICBfICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgIG8gTyBPICAvICAgXFxcXCAgIF8gXyAgICAgX18gXyAgICB8IHx8IHwgICB8IHwgICAgIF9fXyAgICAgKF8pICAgICBfX18gICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICBvICAgICAgIHwgLSB8ICB8IFxcJyBcXFxcICAgLyBfYCB8ICAgIFxcXFxfLCB8ICAgfCB8ICAgIChfLTwgICAgIHwgfCAgICAoXy08ICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICBUU19fW09dICB8X3xffCAgfF98fF98ICBcXFxcX18sX3wgICBffF9fLyAgIF98X3xfICAgL19fL18gICBffF98XyAgIC9fXy9fICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgez09PT09PXxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffCBcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8ICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgIC4vby0tMDAwXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJyAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZyhgJWMgIENvcHlyaWdodCDCqSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gTXVzaWtBbmltYWwsIEthbGRhcmksIE1hcmNlbCBSdWl6IEZvcm5zICAgICAgICAgICAgICAgICAgYCwgc3R5bGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgbG9hZGluZyBpbmRpY2F0b3IgY2xhc3MgYW5kIHNldCB0aGUgc2FmZWd1YXJkIHRpbWVvdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHN0YXJ0U3Bpbm55KCkge1xuICAgICQoJy5jaGFydC1jb250YWluZXInKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChlcnIgPT4ge1xuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKGA8c3Ryb25nPiR7JC5pMThuKCdmYXRhbC1lcnJvcicpfTwvc3Ryb25nPjpcbiAgICAgICAgJHskLmkxOG4oJ2Vycm9yLXRpbWVkLW91dCcpfVxuICAgICAgICAkeyQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpfVxuICAgICAgYCwgJ2Vycm9yJywgMCk7XG4gICAgfSwgMjAgKiAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbG9hZGluZyBpbmRpY2F0b3IgY2xhc3MgYW5kIGNsZWFyIHRoZSBzYWZlZ3VhcmQgdGltZW91dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc3RvcFNwaW5ueSgpIHtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIHNwYWNlcyB3aXRoIHVuZGVyc2NvcmVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IHBhZ2UgbmFtZXMgd2l0aCB1bmRlcnNjb3Jlc1xuICAgKi9cbiAgdW5kZXJzY29yZVBhZ2VOYW1lcyhwYWdlcykge1xuICAgIHJldHVybiBwYWdlcy5tYXAocGFnZSA9PiB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhZ2UpLnNjb3JlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGhyZWZzIG9mIGludGVyLWFwcCBsaW5rcyB0byBsb2FkIGN1cnJlbnRseSBzZWxlY3RlZCBwcm9qZWN0XG4gICAqIEByZXR1cm4ge251bGx9IG51dHRpbidcbiAgICovXG4gIHVwZGF0ZUludGVyQXBwTGlua3MoKSB7XG4gICAgJCgnLmludGVyYXBwLWxpbmsnKS5lYWNoKChpLCBsaW5rKSA9PiB7XG4gICAgICBsZXQgdXJsID0gbGluay5ocmVmLnNwbGl0KCc/JylbMF07XG5cbiAgICAgIGlmIChsaW5rLmNsYXNzTGlzdC5jb250YWlucygnaW50ZXJhcHAtbGluay0tc2l0ZXZpZXdzJykpIHtcbiAgICAgICAgbGluay5ocmVmID0gYCR7dXJsfT9zaXRlcz0ke3RoaXMucHJvamVjdC5lc2NhcGUoKX0ub3JnYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsuaHJlZiA9IGAke3VybH0/cHJvamVjdD0ke3RoaXMucHJvamVjdC5lc2NhcGUoKX0ub3JnYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBiYXNpYyBwYXJhbXMgYWdhaW5zdCB3aGF0IGlzIGRlZmluZWQgaW4gdGhlIGNvbmZpZyxcbiAgICogICBhbmQgaWYgdGhleSBhcmUgaW52YWxpZCBzZXQgdGhlIGRlZmF1bHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIHBhcmFtcyBhcyBmZXRjaGVkIGJ5IHRoaXMucGFyc2VRdWVyeVN0cmluZygpXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNhbWUgcGFyYW1zIHdpdGggc29tZSBpbnZhbGlkIHBhcmFtZXRlcnMgY29ycmV0ZWQsIGFzIG5lY2Vzc2FyeVxuICAgKi9cbiAgdmFsaWRhdGVQYXJhbXMocGFyYW1zKSB7XG4gICAgdGhpcy5jb25maWcudmFsaWRhdGVQYXJhbXMuZm9yRWFjaChwYXJhbUtleSA9PiB7XG4gICAgICBpZiAocGFyYW1LZXkgPT09ICdwcm9qZWN0JyAmJiBwYXJhbXMucHJvamVjdCkge1xuICAgICAgICBwYXJhbXMucHJvamVjdCA9IHBhcmFtcy5wcm9qZWN0LnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuY29uZmlnLmRlZmF1bHRzW3BhcmFtS2V5XSxcbiAgICAgICAgcGFyYW1WYWx1ZSA9IHBhcmFtc1twYXJhbUtleV07XG5cbiAgICAgIGlmIChkZWZhdWx0VmFsdWUgJiYgIXRoaXMuY29uZmlnLnZhbGlkUGFyYW1zW3BhcmFtS2V5XS5pbmNsdWRlcyhwYXJhbVZhbHVlKSkge1xuICAgICAgICAvLyBvbmx5IHRocm93IGVycm9yIGlmIHRoZXkgdHJpZWQgdG8gcHJvdmlkZSBhbiBpbnZhbGlkIHZhbHVlXG4gICAgICAgIGlmICghIXBhcmFtVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZShwYXJhbUtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXNbcGFyYW1LZXldID0gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGxpc3RlbmVycyB0byB0aGUgcHJvamVjdCBpbnB1dCBmb3IgdmFsaWRhdGlvbnMgYWdhaW5zdCB0aGUgc2l0ZSBtYXAsXG4gICAqICAgcmV2ZXJ0aW5nIHRvIHRoZSBvbGQgdmFsdWUgaWYgdGhlIG5ldyBvbmUgaXMgaW52YWxpZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttdWx0aWxpbmd1YWxdIC0gd2hldGhlciB3ZSBzaG91bGQgY2hlY2sgaWYgaXQgaXMgYSBtdWx0aWxpbmd1YWwgcHJvamVjdFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gd2hldGhlciBvciBub3QgdmFsaWRhdGlvbnMgcGFzc2VkXG4gICAqL1xuICB2YWxpZGF0ZVByb2plY3QobXVsdGlsaW5ndWFsID0gZmFsc2UpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dClbMF07XG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0SW5wdXQudmFsdWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKSxcbiAgICAgIHZhbGlkID0gZmFsc2U7XG5cbiAgICBpZiAobXVsdGlsaW5ndWFsICYmICF0aGlzLmlzTXVsdGlsYW5nUHJvamVjdCgpKSB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdpbnZhbGlkLWxhbmctcHJvamVjdCcsIGA8YSBocmVmPScvLyR7cHJvamVjdC5lc2NhcGUoKX0nPiR7cHJvamVjdC5lc2NhcGUoKX08L2E+YCksXG4gICAgICAgICd3YXJuaW5nJ1xuICAgICAgKTtcbiAgICAgIHByb2plY3QgPSBwcm9qZWN0SW5wdXQuZGF0YXNldC52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHNpdGVEb21haW5zLmluY2x1ZGVzKHByb2plY3QpKSB7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMudXBkYXRlSW50ZXJBcHBMaW5rcygpO1xuICAgICAgdmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdpbnZhbGlkLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgICAnd2FybmluZydcbiAgICAgICk7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdElucHV0LmRhdGFzZXQudmFsdWU7XG4gICAgfVxuXG4gICAgcHJvamVjdElucHV0LnZhbHVlID0gcHJvamVjdDtcblxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIC8vIEZJWE1FOiByZXN0b3JlIHdyaXRlTWVzc2FnZSB0byB0aGUgd2F5IGl0IHVzZWQgdG8gYmUsXG4gIC8vIGFuZCBtYWtlIGFkZFNpdGVOb3RpY2UgZG8gdGhlIHRvYXN0ciwgYW5kIGNoYW5nZSBpbnN0YW5jZXMgb2YgdGhpcy53cml0ZU1lc3NhZ2VcbiAgLy8gYWNjb3JkaW5nbHlcbiAgLyoqXG4gICAqIFdyaXRlcyBtZXNzYWdlIGp1c3QgYmVsb3cgdGhlIGNoYXJ0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gbWVzc2FnZSB0byB3cml0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtIG51bSBzZWNvbmRzIHRvIHNob3dcbiAgICogQHJldHVybnMge2pRdWVyeX0gLSBqUXVlcnkgb2JqZWN0IG9mIG1lc3NhZ2UgY29udGFpbmVyXG4gICAqL1xuICB3cml0ZU1lc3NhZ2UobWVzc2FnZSwgbGV2ZWwgPSAnd2FybmluZycsIHRpbWVvdXQgPSA1MDAwKSB7XG4gICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IHRpbWVvdXQ7XG4gICAgdG9hc3RyW2xldmVsXShtZXNzYWdlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFB2O1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgY29uZmlnIGFtb25nc3QgYWxsIGFwcHNcbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4vc2l0ZV9tYXAnKTtcbmNvbnN0IHNpdGVEb21haW5zID0gT2JqZWN0LmtleXMoc2l0ZU1hcCkubWFwKGtleSA9PiBzaXRlTWFwW2tleV0pO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGFsbCBQYWdldmlld3MgYXBwbGljYXRpb25zLlxuICogU29tZSBwcm9wZXJ0aWVzIG1heSBiZSBvdmVycmlkZW4gYnkgYXBwLXNwZWNpZmljIGNvbmZpZ3NcbiAqL1xuY2xhc3MgUHZDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgZm9ybWF0WEF4aXNUaWNrID0gdmFsdWUgPT4ge1xuICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbW9tZW50KHZhbHVlLCB0aGlzLmRhdGVGb3JtYXQpLndlZWtkYXkoKTtcbiAgICAgIGlmIChkYXlPZldlZWsgJSA3KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBg4oCiICR7dmFsdWV9YDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBhcGlMaW1pdDogNTAwMCxcbiAgICAgIGFwaVRocm90dGxlOiAyMCxcbiAgICAgIGFwcHM6IFsncGFnZXZpZXdzJywgJ3RvcHZpZXdzJywgJ2xhbmd2aWV3cycsICdzaXRldmlld3MnLCAnbWFzc3ZpZXdzJywgJ3JlZGlyZWN0dmlld3MnXSxcbiAgICAgIGNoYXJ0Q29uZmlnOiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdFlBeGlzTnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIHhBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0WEF4aXNUaWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDApJyxcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRCb3JkZXJDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjIpLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyUmFkaXVzOiA1LFxuICAgICAgICAgICAgICB0ZW5zaW9uOiBzZWxmLmJlemllckN1cnZlID09PSAndHJ1ZScgPyAwLjQgOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYmFyOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXRZQXhpc051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICBiYXJQZXJjZW50YWdlOiAxLjAsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlQZXJjZW50YWdlOiAwLjg1LFxuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0WEF4aXNUaWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC42KSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC45KSxcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNzUpLFxuICAgICAgICAgICAgICBob3ZlckJvcmRlckNvbG9yOiBjb2xvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJhZGFyOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5saW5lYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjEpLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Qm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KSxcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJSYWRpdXM6IDVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwaWU6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRvdWdobnV0OiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9sYXJBcmVhOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjcpLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjkpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNpcmN1bGFyQ2hhcnRzOiBbJ3BpZScsICdkb3VnaG51dCcsICdwb2xhckFyZWEnXSxcbiAgICAgIGNvbG9yczogWydyZ2JhKDE3MSwgMjEyLCAyMzUsIDEpJywgJ3JnYmEoMTc4LCAyMjMsIDEzOCwgMSknLCAncmdiYSgyNTEsIDE1NCwgMTUzLCAxKScsICdyZ2JhKDI1MywgMTkxLCAxMTEsIDEpJywgJ3JnYmEoMjAyLCAxNzgsIDIxNCwgMSknLCAncmdiYSgyMDcsIDE4MiwgMTI4LCAxKScsICdyZ2JhKDE0MSwgMjExLCAxOTksIDEpJywgJ3JnYmEoMjUyLCAyMDUsIDIyOSwgMSknLCAncmdiYSgyNTUsIDI0NywgMTYxLCAxKScsICdyZ2JhKDIxNywgMjE3LCAyMTcsIDEpJ10sXG4gICAgICBkZWZhdWx0czoge1xuICAgICAgICBhdXRvY29tcGxldGU6ICdhdXRvY29tcGxldGUnLFxuICAgICAgICBjaGFydFR5cGU6IG51bURhdGFzZXRzID0+IG51bURhdGFzZXRzID4gMSA/ICdsaW5lJyA6ICdiYXInLFxuICAgICAgICBkYXRlRm9ybWF0OiAnWVlZWS1NTS1ERCcsXG4gICAgICAgIGxvY2FsaXplRGF0ZUZvcm1hdDogJ3RydWUnLFxuICAgICAgICBudW1lcmljYWxGb3JtYXR0aW5nOiAndHJ1ZScsXG4gICAgICAgIGJlemllckN1cnZlOiAnZmFsc2UnLFxuICAgICAgICBhdXRvTG9nRGV0ZWN0aW9uOiAndHJ1ZScsXG4gICAgICAgIGJlZ2luQXRaZXJvOiAnZmFsc2UnLFxuICAgICAgICByZW1lbWJlckNoYXJ0OiAndHJ1ZScsXG4gICAgICAgIGFnZW50OiAndXNlcicsXG4gICAgICAgIHBsYXRmb3JtOiAnYWxsLWFjY2VzcycsXG4gICAgICAgIHByb2plY3Q6ICdlbi53aWtpcGVkaWEub3JnJ1xuICAgICAgfSxcbiAgICAgIGdsb2JhbENoYXJ0T3B0czoge1xuICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YXJ0J1xuICAgICAgICB9LFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsaW5lYXJDaGFydHM6IFsnbGluZScsICdiYXInLCAncmFkYXInXSxcbiAgICAgIGxpbmVhck9wdHM6IHtcbiAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKGNoYXJ0LmRhdGEuZGF0YXNldHMsIHNlbGYpXG4gICAgICB9LFxuICAgICAgZGF5c0FnbzogMjAsXG4gICAgICBtaW5EYXRlOiBtb21lbnQoJzIwMTUtMDctMDEnKS5zdGFydE9mKCdkYXknKSxcbiAgICAgIG1heERhdGU6IG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5JyksXG4gICAgICBzcGVjaWFsUmFuZ2VzOiB7XG4gICAgICAgICdsYXN0LXdlZWsnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWsnKS5zdGFydE9mKCd3ZWVrJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrJykuZW5kT2YoJ3dlZWsnKV0sXG4gICAgICAgICd0aGlzLW1vbnRoJzogW21vbWVudCgpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5JyldLFxuICAgICAgICAnbGFzdC1tb250aCc6IFttb21lbnQoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5lbmRPZignbW9udGgnKV0sXG4gICAgICAgIGxhdGVzdChvZmZzZXQgPSBzZWxmLmNvbmZpZy5kYXlzQWdvKSB7XG4gICAgICAgICAgcmV0dXJuIFttb21lbnQoKS5zdWJ0cmFjdChvZmZzZXQsICdkYXlzJykuc3RhcnRPZignZGF5JyksIHNlbGYuY29uZmlnLm1heERhdGVdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdGltZXN0YW1wRm9ybWF0OiAnWVlZWU1NREQwMCcsXG4gICAgICB2YWxpZFBhcmFtczoge1xuICAgICAgICBhZ2VudDogWydhbGwtYWdlbnRzJywgJ3VzZXInLCAnc3BpZGVyJywgJ2JvdCddLFxuICAgICAgICBwbGF0Zm9ybTogWydhbGwtYWNjZXNzJywgJ2Rlc2t0b3AnLCAnbW9iaWxlLWFwcCcsICdtb2JpbGUtd2ViJ10sXG4gICAgICAgIHByb2plY3Q6IHNpdGVEb21haW5zXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBsaW5lYXJUb29sdGlwcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbW9kZTogJ2xhYmVsJyxcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbDogdG9vbHRpcEl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4odG9vbHRpcEl0ZW0ueUxhYmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuICcgJyArICQuaTE4bigndW5rbm93bicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyAnICsgdGhpcy5mb3JtYXROdW1iZXIodG9vbHRpcEl0ZW0ueUxhYmVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib2R5Rm9udFNpemU6IDE0LFxuICAgICAgYm9keVNwYWNpbmc6IDcsXG4gICAgICBjYXJldFNpemU6IDAsXG4gICAgICB0aXRsZUZvbnRTaXplOiAxNFxuICAgIH07XG4gIH1cblxuICBnZXQgY2lyY3VsYXJUb29sdGlwcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGxhYmVsOiAodG9vbHRpcEl0ZW0sIGNoYXJ0SW5zdGFuY2UpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNoYXJ0SW5zdGFuY2UuZGF0YXNldHNbdG9vbHRpcEl0ZW0uZGF0YXNldEluZGV4XS5kYXRhW3Rvb2x0aXBJdGVtLmluZGV4XSxcbiAgICAgICAgICAgIGxhYmVsID0gY2hhcnRJbnN0YW5jZS5sYWJlbHNbdG9vbHRpcEl0ZW0uaW5kZXhdO1xuXG4gICAgICAgICAgaWYgKE51bWJlci5pc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtsYWJlbH06ICR7JC5pMThuKCd1bmtub3duJyl9YDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke2xhYmVsfTogJHt0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSl9YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib2R5Rm9udFNpemU6IDE0LFxuICAgICAgYm9keVNwYWNpbmc6IDcsXG4gICAgICBjYXJldFNpemU6IDAsXG4gICAgICB0aXRsZUZvbnRTaXplOiAxNFxuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdkNvbmZpZztcbiIsIi8qKlxuICogQGZpbGUgV01GIFtzaXRlIG1hdHJpeF0oaHR0cHM6Ly93d3cubWVkaWF3aWtpLm9yZy93L2FwaS5waHA/YWN0aW9uPXNpdGVtYXRyaXgpLCB3aXRoIHNvbWUgdW5zdXBwb3J0ZWQgd2lraXMgcmVtb3ZlZFxuICovXG5cbi8qKlxuICogU2l0ZW1hdHJpeCBvZiBhbGwgc3VwcG9ydGVkIFdNRiB3aWtpc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3Qgc2l0ZU1hcCA9IHtcbiAgJ2Fhd2lraSc6ICdhYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Fhd2lrdGlvbmFyeSc6ICdhYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdhYXdpa2lib29rcyc6ICdhYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Fid2lraSc6ICdhYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fid2lrdGlvbmFyeSc6ICdhYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhY2V3aWtpJzogJ2FjZS53aWtpcGVkaWEub3JnJyxcbiAgJ2FkeXdpa2knOiAnYWR5Lndpa2lwZWRpYS5vcmcnLFxuICAnYWZ3aWtpJzogJ2FmLndpa2lwZWRpYS5vcmcnLFxuICAnYWZ3aWt0aW9uYXJ5JzogJ2FmLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fmd2lraWJvb2tzJzogJ2FmLndpa2lib29rcy5vcmcnLFxuICAnYWZ3aWtpcXVvdGUnOiAnYWYud2lraXF1b3RlLm9yZycsXG4gICdha3dpa2knOiAnYWsud2lraXBlZGlhLm9yZycsXG4gICdha3dpa3Rpb25hcnknOiAnYWsud2lrdGlvbmFyeS5vcmcnLFxuICAnYWt3aWtpYm9va3MnOiAnYWsud2lraWJvb2tzLm9yZycsXG4gICdhbHN3aWtpJzogJ2Fscy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fsc3dpa3Rpb25hcnknOiAnYWxzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fsc3dpa2lib29rcyc6ICdhbHMud2lraWJvb2tzLm9yZycsXG4gICdhbHN3aWtpcXVvdGUnOiAnYWxzLndpa2lxdW90ZS5vcmcnLFxuICAnYW13aWtpJzogJ2FtLndpa2lwZWRpYS5vcmcnLFxuICAnYW13aWt0aW9uYXJ5JzogJ2FtLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Ftd2lraXF1b3RlJzogJ2FtLndpa2lxdW90ZS5vcmcnLFxuICAnYW53aWtpJzogJ2FuLndpa2lwZWRpYS5vcmcnLFxuICAnYW53aWt0aW9uYXJ5JzogJ2FuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FuZ3dpa2knOiAnYW5nLndpa2lwZWRpYS5vcmcnLFxuICAnYW5nd2lrdGlvbmFyeSc6ICdhbmcud2lrdGlvbmFyeS5vcmcnLFxuICAnYW5nd2lraWJvb2tzJzogJ2FuZy53aWtpYm9va3Mub3JnJyxcbiAgJ2FuZ3dpa2lxdW90ZSc6ICdhbmcud2lraXF1b3RlLm9yZycsXG4gICdhbmd3aWtpc291cmNlJzogJ2FuZy53aWtpc291cmNlLm9yZycsXG4gICdhcndpa2knOiAnYXIud2lraXBlZGlhLm9yZycsXG4gICdhcndpa3Rpb25hcnknOiAnYXIud2lrdGlvbmFyeS5vcmcnLFxuICAnYXJ3aWtpYm9va3MnOiAnYXIud2lraWJvb2tzLm9yZycsXG4gICdhcndpa2luZXdzJzogJ2FyLndpa2luZXdzLm9yZycsXG4gICdhcndpa2lxdW90ZSc6ICdhci53aWtpcXVvdGUub3JnJyxcbiAgJ2Fyd2lraXNvdXJjZSc6ICdhci53aWtpc291cmNlLm9yZycsXG4gICdhcndpa2l2ZXJzaXR5JzogJ2FyLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdhcmN3aWtpJzogJ2FyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fyendpa2knOiAnYXJ6Lndpa2lwZWRpYS5vcmcnLFxuICAnYXN3aWtpJzogJ2FzLndpa2lwZWRpYS5vcmcnLFxuICAnYXN3aWt0aW9uYXJ5JzogJ2FzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fzd2lraWJvb2tzJzogJ2FzLndpa2lib29rcy5vcmcnLFxuICAnYXN3aWtpc291cmNlJzogJ2FzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2FzdHdpa2knOiAnYXN0Lndpa2lwZWRpYS5vcmcnLFxuICAnYXN0d2lrdGlvbmFyeSc6ICdhc3Qud2lrdGlvbmFyeS5vcmcnLFxuICAnYXN0d2lraWJvb2tzJzogJ2FzdC53aWtpYm9va3Mub3JnJyxcbiAgJ2FzdHdpa2lxdW90ZSc6ICdhc3Qud2lraXF1b3RlLm9yZycsXG4gICdhdndpa2knOiAnYXYud2lraXBlZGlhLm9yZycsXG4gICdhdndpa3Rpb25hcnknOiAnYXYud2lrdGlvbmFyeS5vcmcnLFxuICAnYXl3aWtpJzogJ2F5Lndpa2lwZWRpYS5vcmcnLFxuICAnYXl3aWt0aW9uYXJ5JzogJ2F5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F5d2lraWJvb2tzJzogJ2F5Lndpa2lib29rcy5vcmcnLFxuICAnYXp3aWtpJzogJ2F6Lndpa2lwZWRpYS5vcmcnLFxuICAnYXp3aWt0aW9uYXJ5JzogJ2F6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F6d2lraWJvb2tzJzogJ2F6Lndpa2lib29rcy5vcmcnLFxuICAnYXp3aWtpcXVvdGUnOiAnYXoud2lraXF1b3RlLm9yZycsXG4gICdhendpa2lzb3VyY2UnOiAnYXoud2lraXNvdXJjZS5vcmcnLFxuICAnYXpid2lraSc6ICdhemIud2lraXBlZGlhLm9yZycsXG4gICdiYXdpa2knOiAnYmEud2lraXBlZGlhLm9yZycsXG4gICdiYXdpa2lib29rcyc6ICdiYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jhcndpa2knOiAnYmFyLndpa2lwZWRpYS5vcmcnLFxuICAnYmF0X3NtZ3dpa2knOiAnYmF0LXNtZy53aWtpcGVkaWEub3JnJyxcbiAgJ2JjbHdpa2knOiAnYmNsLndpa2lwZWRpYS5vcmcnLFxuICAnYmV3aWtpJzogJ2JlLndpa2lwZWRpYS5vcmcnLFxuICAnYmV3aWt0aW9uYXJ5JzogJ2JlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jld2lraWJvb2tzJzogJ2JlLndpa2lib29rcy5vcmcnLFxuICAnYmV3aWtpcXVvdGUnOiAnYmUud2lraXF1b3RlLm9yZycsXG4gICdiZXdpa2lzb3VyY2UnOiAnYmUud2lraXNvdXJjZS5vcmcnLFxuICAnYmVfeF9vbGR3aWtpJzogJ2JlLXRhcmFzay53aWtpcGVkaWEub3JnJyxcbiAgJ2Jnd2lraSc6ICdiZy53aWtpcGVkaWEub3JnJyxcbiAgJ2Jnd2lrdGlvbmFyeSc6ICdiZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdiZ3dpa2lib29rcyc6ICdiZy53aWtpYm9va3Mub3JnJyxcbiAgJ2Jnd2lraW5ld3MnOiAnYmcud2lraW5ld3Mub3JnJyxcbiAgJ2Jnd2lraXF1b3RlJzogJ2JnLndpa2lxdW90ZS5vcmcnLFxuICAnYmd3aWtpc291cmNlJzogJ2JnLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jod2lraSc6ICdiaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Jod2lrdGlvbmFyeSc6ICdiaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdiaXdpa2knOiAnYmkud2lraXBlZGlhLm9yZycsXG4gICdiaXdpa3Rpb25hcnknOiAnYmkud2lrdGlvbmFyeS5vcmcnLFxuICAnYml3aWtpYm9va3MnOiAnYmkud2lraWJvb2tzLm9yZycsXG4gICdiam53aWtpJzogJ2Jqbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jtd2lraSc6ICdibS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jtd2lrdGlvbmFyeSc6ICdibS53aWt0aW9uYXJ5Lm9yZycsXG4gICdibXdpa2lib29rcyc6ICdibS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jtd2lraXF1b3RlJzogJ2JtLndpa2lxdW90ZS5vcmcnLFxuICAnYm53aWtpJzogJ2JuLndpa2lwZWRpYS5vcmcnLFxuICAnYm53aWt0aW9uYXJ5JzogJ2JuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jud2lraWJvb2tzJzogJ2JuLndpa2lib29rcy5vcmcnLFxuICAnYm53aWtpc291cmNlJzogJ2JuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jvd2lraSc6ICdiby53aWtpcGVkaWEub3JnJyxcbiAgJ2Jvd2lrdGlvbmFyeSc6ICdiby53aWt0aW9uYXJ5Lm9yZycsXG4gICdib3dpa2lib29rcyc6ICdiby53aWtpYm9va3Mub3JnJyxcbiAgJ2JweXdpa2knOiAnYnB5Lndpa2lwZWRpYS5vcmcnLFxuICAnYnJ3aWtpJzogJ2JyLndpa2lwZWRpYS5vcmcnLFxuICAnYnJ3aWt0aW9uYXJ5JzogJ2JyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jyd2lraXF1b3RlJzogJ2JyLndpa2lxdW90ZS5vcmcnLFxuICAnYnJ3aWtpc291cmNlJzogJ2JyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jzd2lraSc6ICdicy53aWtpcGVkaWEub3JnJyxcbiAgJ2Jzd2lrdGlvbmFyeSc6ICdicy53aWt0aW9uYXJ5Lm9yZycsXG4gICdic3dpa2lib29rcyc6ICdicy53aWtpYm9va3Mub3JnJyxcbiAgJ2Jzd2lraW5ld3MnOiAnYnMud2lraW5ld3Mub3JnJyxcbiAgJ2Jzd2lraXF1b3RlJzogJ2JzLndpa2lxdW90ZS5vcmcnLFxuICAnYnN3aWtpc291cmNlJzogJ2JzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2J1Z3dpa2knOiAnYnVnLndpa2lwZWRpYS5vcmcnLFxuICAnYnhyd2lraSc6ICdieHIud2lraXBlZGlhLm9yZycsXG4gICdjYXdpa2knOiAnY2Eud2lraXBlZGlhLm9yZycsXG4gICdjYXdpa3Rpb25hcnknOiAnY2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnY2F3aWtpYm9va3MnOiAnY2Eud2lraWJvb2tzLm9yZycsXG4gICdjYXdpa2luZXdzJzogJ2NhLndpa2luZXdzLm9yZycsXG4gICdjYXdpa2lxdW90ZSc6ICdjYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Nhd2lraXNvdXJjZSc6ICdjYS53aWtpc291cmNlLm9yZycsXG4gICdjYmtfemFtd2lraSc6ICdjYmstemFtLndpa2lwZWRpYS5vcmcnLFxuICAnY2Rvd2lraSc6ICdjZG8ud2lraXBlZGlhLm9yZycsXG4gICdjZXdpa2knOiAnY2Uud2lraXBlZGlhLm9yZycsXG4gICdjZWJ3aWtpJzogJ2NlYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Nod2lraSc6ICdjaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Nod2lrdGlvbmFyeSc6ICdjaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdjaHdpa2lib29rcyc6ICdjaC53aWtpYm9va3Mub3JnJyxcbiAgJ2Nob3dpa2knOiAnY2hvLndpa2lwZWRpYS5vcmcnLFxuICAnY2hyd2lraSc6ICdjaHIud2lraXBlZGlhLm9yZycsXG4gICdjaHJ3aWt0aW9uYXJ5JzogJ2Noci53aWt0aW9uYXJ5Lm9yZycsXG4gICdjaHl3aWtpJzogJ2NoeS53aWtpcGVkaWEub3JnJyxcbiAgJ2NrYndpa2knOiAnY2tiLndpa2lwZWRpYS5vcmcnLFxuICAnY293aWtpJzogJ2NvLndpa2lwZWRpYS5vcmcnLFxuICAnY293aWt0aW9uYXJ5JzogJ2NvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nvd2lraWJvb2tzJzogJ2NvLndpa2lib29rcy5vcmcnLFxuICAnY293aWtpcXVvdGUnOiAnY28ud2lraXF1b3RlLm9yZycsXG4gICdjcndpa2knOiAnY3Iud2lraXBlZGlhLm9yZycsXG4gICdjcndpa3Rpb25hcnknOiAnY3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnY3J3aWtpcXVvdGUnOiAnY3Iud2lraXF1b3RlLm9yZycsXG4gICdjcmh3aWtpJzogJ2NyaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Nzd2lraSc6ICdjcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Nzd2lrdGlvbmFyeSc6ICdjcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdjc3dpa2lib29rcyc6ICdjcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Nzd2lraW5ld3MnOiAnY3Mud2lraW5ld3Mub3JnJyxcbiAgJ2Nzd2lraXF1b3RlJzogJ2NzLndpa2lxdW90ZS5vcmcnLFxuICAnY3N3aWtpc291cmNlJzogJ2NzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Nzd2lraXZlcnNpdHknOiAnY3Mud2lraXZlcnNpdHkub3JnJyxcbiAgJ2NzYndpa2knOiAnY3NiLndpa2lwZWRpYS5vcmcnLFxuICAnY3Nid2lrdGlvbmFyeSc6ICdjc2Iud2lrdGlvbmFyeS5vcmcnLFxuICAnY3V3aWtpJzogJ2N1Lndpa2lwZWRpYS5vcmcnLFxuICAnY3Z3aWtpJzogJ2N2Lndpa2lwZWRpYS5vcmcnLFxuICAnY3Z3aWtpYm9va3MnOiAnY3Yud2lraWJvb2tzLm9yZycsXG4gICdjeXdpa2knOiAnY3kud2lraXBlZGlhLm9yZycsXG4gICdjeXdpa3Rpb25hcnknOiAnY3kud2lrdGlvbmFyeS5vcmcnLFxuICAnY3l3aWtpYm9va3MnOiAnY3kud2lraWJvb2tzLm9yZycsXG4gICdjeXdpa2lxdW90ZSc6ICdjeS53aWtpcXVvdGUub3JnJyxcbiAgJ2N5d2lraXNvdXJjZSc6ICdjeS53aWtpc291cmNlLm9yZycsXG4gICdkYXdpa2knOiAnZGEud2lraXBlZGlhLm9yZycsXG4gICdkYXdpa3Rpb25hcnknOiAnZGEud2lrdGlvbmFyeS5vcmcnLFxuICAnZGF3aWtpYm9va3MnOiAnZGEud2lraWJvb2tzLm9yZycsXG4gICdkYXdpa2lxdW90ZSc6ICdkYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Rhd2lraXNvdXJjZSc6ICdkYS53aWtpc291cmNlLm9yZycsXG4gICdkZXdpa2knOiAnZGUud2lraXBlZGlhLm9yZycsXG4gICdkZXdpa3Rpb25hcnknOiAnZGUud2lrdGlvbmFyeS5vcmcnLFxuICAnZGV3aWtpYm9va3MnOiAnZGUud2lraWJvb2tzLm9yZycsXG4gICdkZXdpa2luZXdzJzogJ2RlLndpa2luZXdzLm9yZycsXG4gICdkZXdpa2lxdW90ZSc6ICdkZS53aWtpcXVvdGUub3JnJyxcbiAgJ2Rld2lraXNvdXJjZSc6ICdkZS53aWtpc291cmNlLm9yZycsXG4gICdkZXdpa2l2ZXJzaXR5JzogJ2RlLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdkZXdpa2l2b3lhZ2UnOiAnZGUud2lraXZveWFnZS5vcmcnLFxuICAnZGlxd2lraSc6ICdkaXEud2lraXBlZGlhLm9yZycsXG4gICdkc2J3aWtpJzogJ2RzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2R2d2lraSc6ICdkdi53aWtpcGVkaWEub3JnJyxcbiAgJ2R2d2lrdGlvbmFyeSc6ICdkdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdkendpa2knOiAnZHoud2lraXBlZGlhLm9yZycsXG4gICdkendpa3Rpb25hcnknOiAnZHoud2lrdGlvbmFyeS5vcmcnLFxuICAnZWV3aWtpJzogJ2VlLndpa2lwZWRpYS5vcmcnLFxuICAnZWx3aWtpJzogJ2VsLndpa2lwZWRpYS5vcmcnLFxuICAnZWx3aWt0aW9uYXJ5JzogJ2VsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vsd2lraWJvb2tzJzogJ2VsLndpa2lib29rcy5vcmcnLFxuICAnZWx3aWtpbmV3cyc6ICdlbC53aWtpbmV3cy5vcmcnLFxuICAnZWx3aWtpcXVvdGUnOiAnZWwud2lraXF1b3RlLm9yZycsXG4gICdlbHdpa2lzb3VyY2UnOiAnZWwud2lraXNvdXJjZS5vcmcnLFxuICAnZWx3aWtpdmVyc2l0eSc6ICdlbC53aWtpdmVyc2l0eS5vcmcnLFxuICAnZWx3aWtpdm95YWdlJzogJ2VsLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2VtbHdpa2knOiAnZW1sLndpa2lwZWRpYS5vcmcnLFxuICAnZW53aWtpJzogJ2VuLndpa2lwZWRpYS5vcmcnLFxuICAnZW53aWt0aW9uYXJ5JzogJ2VuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vud2lraWJvb2tzJzogJ2VuLndpa2lib29rcy5vcmcnLFxuICAnZW53aWtpbmV3cyc6ICdlbi53aWtpbmV3cy5vcmcnLFxuICAnZW53aWtpcXVvdGUnOiAnZW4ud2lraXF1b3RlLm9yZycsXG4gICdlbndpa2lzb3VyY2UnOiAnZW4ud2lraXNvdXJjZS5vcmcnLFxuICAnZW53aWtpdmVyc2l0eSc6ICdlbi53aWtpdmVyc2l0eS5vcmcnLFxuICAnZW53aWtpdm95YWdlJzogJ2VuLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2Vvd2lraSc6ICdlby53aWtpcGVkaWEub3JnJyxcbiAgJ2Vvd2lrdGlvbmFyeSc6ICdlby53aWt0aW9uYXJ5Lm9yZycsXG4gICdlb3dpa2lib29rcyc6ICdlby53aWtpYm9va3Mub3JnJyxcbiAgJ2Vvd2lraW5ld3MnOiAnZW8ud2lraW5ld3Mub3JnJyxcbiAgJ2Vvd2lraXF1b3RlJzogJ2VvLndpa2lxdW90ZS5vcmcnLFxuICAnZW93aWtpc291cmNlJzogJ2VvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vzd2lraSc6ICdlcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Vzd2lrdGlvbmFyeSc6ICdlcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdlc3dpa2lib29rcyc6ICdlcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Vzd2lraW5ld3MnOiAnZXMud2lraW5ld3Mub3JnJyxcbiAgJ2Vzd2lraXF1b3RlJzogJ2VzLndpa2lxdW90ZS5vcmcnLFxuICAnZXN3aWtpc291cmNlJzogJ2VzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vzd2lraXZlcnNpdHknOiAnZXMud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vzd2lraXZveWFnZSc6ICdlcy53aWtpdm95YWdlLm9yZycsXG4gICdldHdpa2knOiAnZXQud2lraXBlZGlhLm9yZycsXG4gICdldHdpa3Rpb25hcnknOiAnZXQud2lrdGlvbmFyeS5vcmcnLFxuICAnZXR3aWtpYm9va3MnOiAnZXQud2lraWJvb2tzLm9yZycsXG4gICdldHdpa2lxdW90ZSc6ICdldC53aWtpcXVvdGUub3JnJyxcbiAgJ2V0d2lraXNvdXJjZSc6ICdldC53aWtpc291cmNlLm9yZycsXG4gICdldXdpa2knOiAnZXUud2lraXBlZGlhLm9yZycsXG4gICdldXdpa3Rpb25hcnknOiAnZXUud2lrdGlvbmFyeS5vcmcnLFxuICAnZXV3aWtpYm9va3MnOiAnZXUud2lraWJvb2tzLm9yZycsXG4gICdldXdpa2lxdW90ZSc6ICdldS53aWtpcXVvdGUub3JnJyxcbiAgJ2V4dHdpa2knOiAnZXh0Lndpa2lwZWRpYS5vcmcnLFxuICAnZmF3aWtpJzogJ2ZhLndpa2lwZWRpYS5vcmcnLFxuICAnZmF3aWt0aW9uYXJ5JzogJ2ZhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zhd2lraWJvb2tzJzogJ2ZhLndpa2lib29rcy5vcmcnLFxuICAnZmF3aWtpbmV3cyc6ICdmYS53aWtpbmV3cy5vcmcnLFxuICAnZmF3aWtpcXVvdGUnOiAnZmEud2lraXF1b3RlLm9yZycsXG4gICdmYXdpa2lzb3VyY2UnOiAnZmEud2lraXNvdXJjZS5vcmcnLFxuICAnZmF3aWtpdm95YWdlJzogJ2ZhLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2Zmd2lraSc6ICdmZi53aWtpcGVkaWEub3JnJyxcbiAgJ2Zpd2lraSc6ICdmaS53aWtpcGVkaWEub3JnJyxcbiAgJ2Zpd2lrdGlvbmFyeSc6ICdmaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmaXdpa2lib29rcyc6ICdmaS53aWtpYm9va3Mub3JnJyxcbiAgJ2Zpd2lraW5ld3MnOiAnZmkud2lraW5ld3Mub3JnJyxcbiAgJ2Zpd2lraXF1b3RlJzogJ2ZpLndpa2lxdW90ZS5vcmcnLFxuICAnZml3aWtpc291cmNlJzogJ2ZpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zpd2lraXZlcnNpdHknOiAnZmkud2lraXZlcnNpdHkub3JnJyxcbiAgJ2ZpdV92cm93aWtpJzogJ2ZpdS12cm8ud2lraXBlZGlhLm9yZycsXG4gICdmandpa2knOiAnZmoud2lraXBlZGlhLm9yZycsXG4gICdmandpa3Rpb25hcnknOiAnZmoud2lrdGlvbmFyeS5vcmcnLFxuICAnZm93aWtpJzogJ2ZvLndpa2lwZWRpYS5vcmcnLFxuICAnZm93aWt0aW9uYXJ5JzogJ2ZvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zvd2lraXNvdXJjZSc6ICdmby53aWtpc291cmNlLm9yZycsXG4gICdmcndpa2knOiAnZnIud2lraXBlZGlhLm9yZycsXG4gICdmcndpa3Rpb25hcnknOiAnZnIud2lrdGlvbmFyeS5vcmcnLFxuICAnZnJ3aWtpYm9va3MnOiAnZnIud2lraWJvb2tzLm9yZycsXG4gICdmcndpa2luZXdzJzogJ2ZyLndpa2luZXdzLm9yZycsXG4gICdmcndpa2lxdW90ZSc6ICdmci53aWtpcXVvdGUub3JnJyxcbiAgJ2Zyd2lraXNvdXJjZSc6ICdmci53aWtpc291cmNlLm9yZycsXG4gICdmcndpa2l2ZXJzaXR5JzogJ2ZyLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdmcndpa2l2b3lhZ2UnOiAnZnIud2lraXZveWFnZS5vcmcnLFxuICAnZnJwd2lraSc6ICdmcnAud2lraXBlZGlhLm9yZycsXG4gICdmcnJ3aWtpJzogJ2Zyci53aWtpcGVkaWEub3JnJyxcbiAgJ2Z1cndpa2knOiAnZnVyLndpa2lwZWRpYS5vcmcnLFxuICAnZnl3aWtpJzogJ2Z5Lndpa2lwZWRpYS5vcmcnLFxuICAnZnl3aWt0aW9uYXJ5JzogJ2Z5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2Z5d2lraWJvb2tzJzogJ2Z5Lndpa2lib29rcy5vcmcnLFxuICAnZ2F3aWtpJzogJ2dhLndpa2lwZWRpYS5vcmcnLFxuICAnZ2F3aWt0aW9uYXJ5JzogJ2dhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dhd2lraWJvb2tzJzogJ2dhLndpa2lib29rcy5vcmcnLFxuICAnZ2F3aWtpcXVvdGUnOiAnZ2Eud2lraXF1b3RlLm9yZycsXG4gICdnYWd3aWtpJzogJ2dhZy53aWtpcGVkaWEub3JnJyxcbiAgJ2dhbndpa2knOiAnZ2FuLndpa2lwZWRpYS5vcmcnLFxuICAnZ2R3aWtpJzogJ2dkLndpa2lwZWRpYS5vcmcnLFxuICAnZ2R3aWt0aW9uYXJ5JzogJ2dkLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dsd2lraSc6ICdnbC53aWtpcGVkaWEub3JnJyxcbiAgJ2dsd2lrdGlvbmFyeSc6ICdnbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbHdpa2lib29rcyc6ICdnbC53aWtpYm9va3Mub3JnJyxcbiAgJ2dsd2lraXF1b3RlJzogJ2dsLndpa2lxdW90ZS5vcmcnLFxuICAnZ2x3aWtpc291cmNlJzogJ2dsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2dsa3dpa2knOiAnZ2xrLndpa2lwZWRpYS5vcmcnLFxuICAnZ253aWtpJzogJ2duLndpa2lwZWRpYS5vcmcnLFxuICAnZ253aWt0aW9uYXJ5JzogJ2duLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dud2lraWJvb2tzJzogJ2duLndpa2lib29rcy5vcmcnLFxuICAnZ29td2lraSc6ICdnb20ud2lraXBlZGlhLm9yZycsXG4gICdnb3R3aWtpJzogJ2dvdC53aWtpcGVkaWEub3JnJyxcbiAgJ2dvdHdpa2lib29rcyc6ICdnb3Qud2lraWJvb2tzLm9yZycsXG4gICdndXdpa2knOiAnZ3Uud2lraXBlZGlhLm9yZycsXG4gICdndXdpa3Rpb25hcnknOiAnZ3Uud2lrdGlvbmFyeS5vcmcnLFxuICAnZ3V3aWtpYm9va3MnOiAnZ3Uud2lraWJvb2tzLm9yZycsXG4gICdndXdpa2lxdW90ZSc6ICdndS53aWtpcXVvdGUub3JnJyxcbiAgJ2d1d2lraXNvdXJjZSc6ICdndS53aWtpc291cmNlLm9yZycsXG4gICdndndpa2knOiAnZ3Yud2lraXBlZGlhLm9yZycsXG4gICdndndpa3Rpb25hcnknOiAnZ3Yud2lrdGlvbmFyeS5vcmcnLFxuICAnaGF3aWtpJzogJ2hhLndpa2lwZWRpYS5vcmcnLFxuICAnaGF3aWt0aW9uYXJ5JzogJ2hhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hha3dpa2knOiAnaGFrLndpa2lwZWRpYS5vcmcnLFxuICAnaGF3d2lraSc6ICdoYXcud2lraXBlZGlhLm9yZycsXG4gICdoZXdpa2knOiAnaGUud2lraXBlZGlhLm9yZycsXG4gICdoZXdpa3Rpb25hcnknOiAnaGUud2lrdGlvbmFyeS5vcmcnLFxuICAnaGV3aWtpYm9va3MnOiAnaGUud2lraWJvb2tzLm9yZycsXG4gICdoZXdpa2luZXdzJzogJ2hlLndpa2luZXdzLm9yZycsXG4gICdoZXdpa2lxdW90ZSc6ICdoZS53aWtpcXVvdGUub3JnJyxcbiAgJ2hld2lraXNvdXJjZSc6ICdoZS53aWtpc291cmNlLm9yZycsXG4gICdoZXdpa2l2b3lhZ2UnOiAnaGUud2lraXZveWFnZS5vcmcnLFxuICAnaGl3aWtpJzogJ2hpLndpa2lwZWRpYS5vcmcnLFxuICAnaGl3aWt0aW9uYXJ5JzogJ2hpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hpd2lraWJvb2tzJzogJ2hpLndpa2lib29rcy5vcmcnLFxuICAnaGl3aWtpcXVvdGUnOiAnaGkud2lraXF1b3RlLm9yZycsXG4gICdoaWZ3aWtpJzogJ2hpZi53aWtpcGVkaWEub3JnJyxcbiAgJ2hvd2lraSc6ICdoby53aWtpcGVkaWEub3JnJyxcbiAgJ2hyd2lraSc6ICdoci53aWtpcGVkaWEub3JnJyxcbiAgJ2hyd2lrdGlvbmFyeSc6ICdoci53aWt0aW9uYXJ5Lm9yZycsXG4gICdocndpa2lib29rcyc6ICdoci53aWtpYm9va3Mub3JnJyxcbiAgJ2hyd2lraXF1b3RlJzogJ2hyLndpa2lxdW90ZS5vcmcnLFxuICAnaHJ3aWtpc291cmNlJzogJ2hyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2hzYndpa2knOiAnaHNiLndpa2lwZWRpYS5vcmcnLFxuICAnaHNid2lrdGlvbmFyeSc6ICdoc2Iud2lrdGlvbmFyeS5vcmcnLFxuICAnaHR3aWtpJzogJ2h0Lndpa2lwZWRpYS5vcmcnLFxuICAnaHR3aWtpc291cmNlJzogJ2h0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h1d2lraSc6ICdodS53aWtpcGVkaWEub3JnJyxcbiAgJ2h1d2lrdGlvbmFyeSc6ICdodS53aWt0aW9uYXJ5Lm9yZycsXG4gICdodXdpa2lib29rcyc6ICdodS53aWtpYm9va3Mub3JnJyxcbiAgJ2h1d2lraW5ld3MnOiAnaHUud2lraW5ld3Mub3JnJyxcbiAgJ2h1d2lraXF1b3RlJzogJ2h1Lndpa2lxdW90ZS5vcmcnLFxuICAnaHV3aWtpc291cmNlJzogJ2h1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h5d2lraSc6ICdoeS53aWtpcGVkaWEub3JnJyxcbiAgJ2h5d2lrdGlvbmFyeSc6ICdoeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoeXdpa2lib29rcyc6ICdoeS53aWtpYm9va3Mub3JnJyxcbiAgJ2h5d2lraXF1b3RlJzogJ2h5Lndpa2lxdW90ZS5vcmcnLFxuICAnaHl3aWtpc291cmNlJzogJ2h5Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h6d2lraSc6ICdoei53aWtpcGVkaWEub3JnJyxcbiAgJ2lhd2lraSc6ICdpYS53aWtpcGVkaWEub3JnJyxcbiAgJ2lhd2lrdGlvbmFyeSc6ICdpYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdpYXdpa2lib29rcyc6ICdpYS53aWtpYm9va3Mub3JnJyxcbiAgJ2lkd2lraSc6ICdpZC53aWtpcGVkaWEub3JnJyxcbiAgJ2lkd2lrdGlvbmFyeSc6ICdpZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdpZHdpa2lib29rcyc6ICdpZC53aWtpYm9va3Mub3JnJyxcbiAgJ2lkd2lraXF1b3RlJzogJ2lkLndpa2lxdW90ZS5vcmcnLFxuICAnaWR3aWtpc291cmNlJzogJ2lkLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2lld2lraSc6ICdpZS53aWtpcGVkaWEub3JnJyxcbiAgJ2lld2lrdGlvbmFyeSc6ICdpZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdpZXdpa2lib29rcyc6ICdpZS53aWtpYm9va3Mub3JnJyxcbiAgJ2lnd2lraSc6ICdpZy53aWtpcGVkaWEub3JnJyxcbiAgJ2lpd2lraSc6ICdpaS53aWtpcGVkaWEub3JnJyxcbiAgJ2lrd2lraSc6ICdpay53aWtpcGVkaWEub3JnJyxcbiAgJ2lrd2lrdGlvbmFyeSc6ICdpay53aWt0aW9uYXJ5Lm9yZycsXG4gICdpbG93aWtpJzogJ2lsby53aWtpcGVkaWEub3JnJyxcbiAgJ2lvd2lraSc6ICdpby53aWtpcGVkaWEub3JnJyxcbiAgJ2lvd2lrdGlvbmFyeSc6ICdpby53aWt0aW9uYXJ5Lm9yZycsXG4gICdpc3dpa2knOiAnaXMud2lraXBlZGlhLm9yZycsXG4gICdpc3dpa3Rpb25hcnknOiAnaXMud2lrdGlvbmFyeS5vcmcnLFxuICAnaXN3aWtpYm9va3MnOiAnaXMud2lraWJvb2tzLm9yZycsXG4gICdpc3dpa2lxdW90ZSc6ICdpcy53aWtpcXVvdGUub3JnJyxcbiAgJ2lzd2lraXNvdXJjZSc6ICdpcy53aWtpc291cmNlLm9yZycsXG4gICdpdHdpa2knOiAnaXQud2lraXBlZGlhLm9yZycsXG4gICdpdHdpa3Rpb25hcnknOiAnaXQud2lrdGlvbmFyeS5vcmcnLFxuICAnaXR3aWtpYm9va3MnOiAnaXQud2lraWJvb2tzLm9yZycsXG4gICdpdHdpa2luZXdzJzogJ2l0Lndpa2luZXdzLm9yZycsXG4gICdpdHdpa2lxdW90ZSc6ICdpdC53aWtpcXVvdGUub3JnJyxcbiAgJ2l0d2lraXNvdXJjZSc6ICdpdC53aWtpc291cmNlLm9yZycsXG4gICdpdHdpa2l2ZXJzaXR5JzogJ2l0Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdpdHdpa2l2b3lhZ2UnOiAnaXQud2lraXZveWFnZS5vcmcnLFxuICAnaXV3aWtpJzogJ2l1Lndpa2lwZWRpYS5vcmcnLFxuICAnaXV3aWt0aW9uYXJ5JzogJ2l1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2phd2lraSc6ICdqYS53aWtpcGVkaWEub3JnJyxcbiAgJ2phd2lrdGlvbmFyeSc6ICdqYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdqYXdpa2lib29rcyc6ICdqYS53aWtpYm9va3Mub3JnJyxcbiAgJ2phd2lraW5ld3MnOiAnamEud2lraW5ld3Mub3JnJyxcbiAgJ2phd2lraXF1b3RlJzogJ2phLndpa2lxdW90ZS5vcmcnLFxuICAnamF3aWtpc291cmNlJzogJ2phLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2phd2lraXZlcnNpdHknOiAnamEud2lraXZlcnNpdHkub3JnJyxcbiAgJ2pib3dpa2knOiAnamJvLndpa2lwZWRpYS5vcmcnLFxuICAnamJvd2lrdGlvbmFyeSc6ICdqYm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnanZ3aWtpJzogJ2p2Lndpa2lwZWRpYS5vcmcnLFxuICAnanZ3aWt0aW9uYXJ5JzogJ2p2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2thd2lraSc6ICdrYS53aWtpcGVkaWEub3JnJyxcbiAgJ2thd2lrdGlvbmFyeSc6ICdrYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrYXdpa2lib29rcyc6ICdrYS53aWtpYm9va3Mub3JnJyxcbiAgJ2thd2lraXF1b3RlJzogJ2thLndpa2lxdW90ZS5vcmcnLFxuICAna2Fhd2lraSc6ICdrYWEud2lraXBlZGlhLm9yZycsXG4gICdrYWJ3aWtpJzogJ2thYi53aWtpcGVkaWEub3JnJyxcbiAgJ2tiZHdpa2knOiAna2JkLndpa2lwZWRpYS5vcmcnLFxuICAna2d3aWtpJzogJ2tnLndpa2lwZWRpYS5vcmcnLFxuICAna2l3aWtpJzogJ2tpLndpa2lwZWRpYS5vcmcnLFxuICAna2p3aWtpJzogJ2tqLndpa2lwZWRpYS5vcmcnLFxuICAna2t3aWtpJzogJ2trLndpa2lwZWRpYS5vcmcnLFxuICAna2t3aWt0aW9uYXJ5JzogJ2trLndpa3Rpb25hcnkub3JnJyxcbiAgJ2trd2lraWJvb2tzJzogJ2trLndpa2lib29rcy5vcmcnLFxuICAna2t3aWtpcXVvdGUnOiAna2sud2lraXF1b3RlLm9yZycsXG4gICdrbHdpa2knOiAna2wud2lraXBlZGlhLm9yZycsXG4gICdrbHdpa3Rpb25hcnknOiAna2wud2lrdGlvbmFyeS5vcmcnLFxuICAna213aWtpJzogJ2ttLndpa2lwZWRpYS5vcmcnLFxuICAna213aWt0aW9uYXJ5JzogJ2ttLndpa3Rpb25hcnkub3JnJyxcbiAgJ2ttd2lraWJvb2tzJzogJ2ttLndpa2lib29rcy5vcmcnLFxuICAna253aWtpJzogJ2tuLndpa2lwZWRpYS5vcmcnLFxuICAna253aWt0aW9uYXJ5JzogJ2tuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tud2lraWJvb2tzJzogJ2tuLndpa2lib29rcy5vcmcnLFxuICAna253aWtpcXVvdGUnOiAna24ud2lraXF1b3RlLm9yZycsXG4gICdrbndpa2lzb3VyY2UnOiAna24ud2lraXNvdXJjZS5vcmcnLFxuICAna293aWtpJzogJ2tvLndpa2lwZWRpYS5vcmcnLFxuICAna293aWt0aW9uYXJ5JzogJ2tvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tvd2lraWJvb2tzJzogJ2tvLndpa2lib29rcy5vcmcnLFxuICAna293aWtpbmV3cyc6ICdrby53aWtpbmV3cy5vcmcnLFxuICAna293aWtpcXVvdGUnOiAna28ud2lraXF1b3RlLm9yZycsXG4gICdrb3dpa2lzb3VyY2UnOiAna28ud2lraXNvdXJjZS5vcmcnLFxuICAna293aWtpdmVyc2l0eSc6ICdrby53aWtpdmVyc2l0eS5vcmcnLFxuICAna29pd2lraSc6ICdrb2kud2lraXBlZGlhLm9yZycsXG4gICdrcndpa2knOiAna3Iud2lraXBlZGlhLm9yZycsXG4gICdrcndpa2lxdW90ZSc6ICdrci53aWtpcXVvdGUub3JnJyxcbiAgJ2tyY3dpa2knOiAna3JjLndpa2lwZWRpYS5vcmcnLFxuICAna3N3aWtpJzogJ2tzLndpa2lwZWRpYS5vcmcnLFxuICAna3N3aWt0aW9uYXJ5JzogJ2tzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tzd2lraWJvb2tzJzogJ2tzLndpa2lib29rcy5vcmcnLFxuICAna3N3aWtpcXVvdGUnOiAna3Mud2lraXF1b3RlLm9yZycsXG4gICdrc2h3aWtpJzogJ2tzaC53aWtpcGVkaWEub3JnJyxcbiAgJ2t1d2lraSc6ICdrdS53aWtpcGVkaWEub3JnJyxcbiAgJ2t1d2lrdGlvbmFyeSc6ICdrdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrdXdpa2lib29rcyc6ICdrdS53aWtpYm9va3Mub3JnJyxcbiAgJ2t1d2lraXF1b3RlJzogJ2t1Lndpa2lxdW90ZS5vcmcnLFxuICAna3Z3aWtpJzogJ2t2Lndpa2lwZWRpYS5vcmcnLFxuICAna3d3aWtpJzogJ2t3Lndpa2lwZWRpYS5vcmcnLFxuICAna3d3aWt0aW9uYXJ5JzogJ2t3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t3d2lraXF1b3RlJzogJ2t3Lndpa2lxdW90ZS5vcmcnLFxuICAna3l3aWtpJzogJ2t5Lndpa2lwZWRpYS5vcmcnLFxuICAna3l3aWt0aW9uYXJ5JzogJ2t5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t5d2lraWJvb2tzJzogJ2t5Lndpa2lib29rcy5vcmcnLFxuICAna3l3aWtpcXVvdGUnOiAna3kud2lraXF1b3RlLm9yZycsXG4gICdsYXdpa2knOiAnbGEud2lraXBlZGlhLm9yZycsXG4gICdsYXdpa3Rpb25hcnknOiAnbGEud2lrdGlvbmFyeS5vcmcnLFxuICAnbGF3aWtpYm9va3MnOiAnbGEud2lraWJvb2tzLm9yZycsXG4gICdsYXdpa2lxdW90ZSc6ICdsYS53aWtpcXVvdGUub3JnJyxcbiAgJ2xhd2lraXNvdXJjZSc6ICdsYS53aWtpc291cmNlLm9yZycsXG4gICdsYWR3aWtpJzogJ2xhZC53aWtpcGVkaWEub3JnJyxcbiAgJ2xid2lraSc6ICdsYi53aWtpcGVkaWEub3JnJyxcbiAgJ2xid2lrdGlvbmFyeSc6ICdsYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsYndpa2lib29rcyc6ICdsYi53aWtpYm9va3Mub3JnJyxcbiAgJ2xid2lraXF1b3RlJzogJ2xiLndpa2lxdW90ZS5vcmcnLFxuICAnbGJld2lraSc6ICdsYmUud2lraXBlZGlhLm9yZycsXG4gICdsZXp3aWtpJzogJ2xlei53aWtpcGVkaWEub3JnJyxcbiAgJ2xnd2lraSc6ICdsZy53aWtpcGVkaWEub3JnJyxcbiAgJ2xpd2lraSc6ICdsaS53aWtpcGVkaWEub3JnJyxcbiAgJ2xpd2lrdGlvbmFyeSc6ICdsaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdsaXdpa2lib29rcyc6ICdsaS53aWtpYm9va3Mub3JnJyxcbiAgJ2xpd2lraXF1b3RlJzogJ2xpLndpa2lxdW90ZS5vcmcnLFxuICAnbGl3aWtpc291cmNlJzogJ2xpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2xpandpa2knOiAnbGlqLndpa2lwZWRpYS5vcmcnLFxuICAnbG1vd2lraSc6ICdsbW8ud2lraXBlZGlhLm9yZycsXG4gICdsbndpa2knOiAnbG4ud2lraXBlZGlhLm9yZycsXG4gICdsbndpa3Rpb25hcnknOiAnbG4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbG53aWtpYm9va3MnOiAnbG4ud2lraWJvb2tzLm9yZycsXG4gICdsb3dpa2knOiAnbG8ud2lraXBlZGlhLm9yZycsXG4gICdsb3dpa3Rpb25hcnknOiAnbG8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbHJjd2lraSc6ICdscmMud2lraXBlZGlhLm9yZycsXG4gICdsdHdpa2knOiAnbHQud2lraXBlZGlhLm9yZycsXG4gICdsdHdpa3Rpb25hcnknOiAnbHQud2lrdGlvbmFyeS5vcmcnLFxuICAnbHR3aWtpYm9va3MnOiAnbHQud2lraWJvb2tzLm9yZycsXG4gICdsdHdpa2lxdW90ZSc6ICdsdC53aWtpcXVvdGUub3JnJyxcbiAgJ2x0d2lraXNvdXJjZSc6ICdsdC53aWtpc291cmNlLm9yZycsXG4gICdsdGd3aWtpJzogJ2x0Zy53aWtpcGVkaWEub3JnJyxcbiAgJ2x2d2lraSc6ICdsdi53aWtpcGVkaWEub3JnJyxcbiAgJ2x2d2lrdGlvbmFyeSc6ICdsdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsdndpa2lib29rcyc6ICdsdi53aWtpYm9va3Mub3JnJyxcbiAgJ21haXdpa2knOiAnbWFpLndpa2lwZWRpYS5vcmcnLFxuICAnbWFwX2Jtc3dpa2knOiAnbWFwLWJtcy53aWtpcGVkaWEub3JnJyxcbiAgJ21kZndpa2knOiAnbWRmLndpa2lwZWRpYS5vcmcnLFxuICAnbWd3aWtpJzogJ21nLndpa2lwZWRpYS5vcmcnLFxuICAnbWd3aWt0aW9uYXJ5JzogJ21nLndpa3Rpb25hcnkub3JnJyxcbiAgJ21nd2lraWJvb2tzJzogJ21nLndpa2lib29rcy5vcmcnLFxuICAnbWh3aWtpJzogJ21oLndpa2lwZWRpYS5vcmcnLFxuICAnbWh3aWt0aW9uYXJ5JzogJ21oLndpa3Rpb25hcnkub3JnJyxcbiAgJ21ocndpa2knOiAnbWhyLndpa2lwZWRpYS5vcmcnLFxuICAnbWl3aWtpJzogJ21pLndpa2lwZWRpYS5vcmcnLFxuICAnbWl3aWt0aW9uYXJ5JzogJ21pLndpa3Rpb25hcnkub3JnJyxcbiAgJ21pd2lraWJvb2tzJzogJ21pLndpa2lib29rcy5vcmcnLFxuICAnbWlud2lraSc6ICdtaW4ud2lraXBlZGlhLm9yZycsXG4gICdta3dpa2knOiAnbWsud2lraXBlZGlhLm9yZycsXG4gICdta3dpa3Rpb25hcnknOiAnbWsud2lrdGlvbmFyeS5vcmcnLFxuICAnbWt3aWtpYm9va3MnOiAnbWsud2lraWJvb2tzLm9yZycsXG4gICdta3dpa2lzb3VyY2UnOiAnbWsud2lraXNvdXJjZS5vcmcnLFxuICAnbWx3aWtpJzogJ21sLndpa2lwZWRpYS5vcmcnLFxuICAnbWx3aWt0aW9uYXJ5JzogJ21sLndpa3Rpb25hcnkub3JnJyxcbiAgJ21sd2lraWJvb2tzJzogJ21sLndpa2lib29rcy5vcmcnLFxuICAnbWx3aWtpcXVvdGUnOiAnbWwud2lraXF1b3RlLm9yZycsXG4gICdtbHdpa2lzb3VyY2UnOiAnbWwud2lraXNvdXJjZS5vcmcnLFxuICAnbW53aWtpJzogJ21uLndpa2lwZWRpYS5vcmcnLFxuICAnbW53aWt0aW9uYXJ5JzogJ21uLndpa3Rpb25hcnkub3JnJyxcbiAgJ21ud2lraWJvb2tzJzogJ21uLndpa2lib29rcy5vcmcnLFxuICAnbW93aWtpJzogJ21vLndpa2lwZWRpYS5vcmcnLFxuICAnbW93aWt0aW9uYXJ5JzogJ21vLndpa3Rpb25hcnkub3JnJyxcbiAgJ21yd2lraSc6ICdtci53aWtpcGVkaWEub3JnJyxcbiAgJ21yd2lrdGlvbmFyeSc6ICdtci53aWt0aW9uYXJ5Lm9yZycsXG4gICdtcndpa2lib29rcyc6ICdtci53aWtpYm9va3Mub3JnJyxcbiAgJ21yd2lraXF1b3RlJzogJ21yLndpa2lxdW90ZS5vcmcnLFxuICAnbXJ3aWtpc291cmNlJzogJ21yLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21yandpa2knOiAnbXJqLndpa2lwZWRpYS5vcmcnLFxuICAnbXN3aWtpJzogJ21zLndpa2lwZWRpYS5vcmcnLFxuICAnbXN3aWt0aW9uYXJ5JzogJ21zLndpa3Rpb25hcnkub3JnJyxcbiAgJ21zd2lraWJvb2tzJzogJ21zLndpa2lib29rcy5vcmcnLFxuICAnbXR3aWtpJzogJ210Lndpa2lwZWRpYS5vcmcnLFxuICAnbXR3aWt0aW9uYXJ5JzogJ210Lndpa3Rpb25hcnkub3JnJyxcbiAgJ211c3dpa2knOiAnbXVzLndpa2lwZWRpYS5vcmcnLFxuICAnbXdsd2lraSc6ICdtd2wud2lraXBlZGlhLm9yZycsXG4gICdteXdpa2knOiAnbXkud2lraXBlZGlhLm9yZycsXG4gICdteXdpa3Rpb25hcnknOiAnbXkud2lrdGlvbmFyeS5vcmcnLFxuICAnbXl3aWtpYm9va3MnOiAnbXkud2lraWJvb2tzLm9yZycsXG4gICdteXZ3aWtpJzogJ215di53aWtpcGVkaWEub3JnJyxcbiAgJ216bndpa2knOiAnbXpuLndpa2lwZWRpYS5vcmcnLFxuICAnbmF3aWtpJzogJ25hLndpa2lwZWRpYS5vcmcnLFxuICAnbmF3aWt0aW9uYXJ5JzogJ25hLndpa3Rpb25hcnkub3JnJyxcbiAgJ25hd2lraWJvb2tzJzogJ25hLndpa2lib29rcy5vcmcnLFxuICAnbmF3aWtpcXVvdGUnOiAnbmEud2lraXF1b3RlLm9yZycsXG4gICduYWh3aWtpJzogJ25haC53aWtpcGVkaWEub3JnJyxcbiAgJ25haHdpa3Rpb25hcnknOiAnbmFoLndpa3Rpb25hcnkub3JnJyxcbiAgJ25haHdpa2lib29rcyc6ICduYWgud2lraWJvb2tzLm9yZycsXG4gICduYXB3aWtpJzogJ25hcC53aWtpcGVkaWEub3JnJyxcbiAgJ25kc3dpa2knOiAnbmRzLndpa2lwZWRpYS5vcmcnLFxuICAnbmRzd2lrdGlvbmFyeSc6ICduZHMud2lrdGlvbmFyeS5vcmcnLFxuICAnbmRzd2lraWJvb2tzJzogJ25kcy53aWtpYm9va3Mub3JnJyxcbiAgJ25kc3dpa2lxdW90ZSc6ICduZHMud2lraXF1b3RlLm9yZycsXG4gICduZHNfbmx3aWtpJzogJ25kcy1ubC53aWtpcGVkaWEub3JnJyxcbiAgJ25ld2lraSc6ICduZS53aWtpcGVkaWEub3JnJyxcbiAgJ25ld2lrdGlvbmFyeSc6ICduZS53aWt0aW9uYXJ5Lm9yZycsXG4gICduZXdpa2lib29rcyc6ICduZS53aWtpYm9va3Mub3JnJyxcbiAgJ25ld3dpa2knOiAnbmV3Lndpa2lwZWRpYS5vcmcnLFxuICAnbmd3aWtpJzogJ25nLndpa2lwZWRpYS5vcmcnLFxuICAnbmx3aWtpJzogJ25sLndpa2lwZWRpYS5vcmcnLFxuICAnbmx3aWt0aW9uYXJ5JzogJ25sLndpa3Rpb25hcnkub3JnJyxcbiAgJ25sd2lraWJvb2tzJzogJ25sLndpa2lib29rcy5vcmcnLFxuICAnbmx3aWtpbmV3cyc6ICdubC53aWtpbmV3cy5vcmcnLFxuICAnbmx3aWtpcXVvdGUnOiAnbmwud2lraXF1b3RlLm9yZycsXG4gICdubHdpa2lzb3VyY2UnOiAnbmwud2lraXNvdXJjZS5vcmcnLFxuICAnbmx3aWtpdm95YWdlJzogJ25sLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ25ud2lraSc6ICdubi53aWtpcGVkaWEub3JnJyxcbiAgJ25ud2lrdGlvbmFyeSc6ICdubi53aWt0aW9uYXJ5Lm9yZycsXG4gICdubndpa2lxdW90ZSc6ICdubi53aWtpcXVvdGUub3JnJyxcbiAgJ25vd2lraSc6ICduby53aWtpcGVkaWEub3JnJyxcbiAgJ25vd2lrdGlvbmFyeSc6ICduby53aWt0aW9uYXJ5Lm9yZycsXG4gICdub3dpa2lib29rcyc6ICduby53aWtpYm9va3Mub3JnJyxcbiAgJ25vd2lraW5ld3MnOiAnbm8ud2lraW5ld3Mub3JnJyxcbiAgJ25vd2lraXF1b3RlJzogJ25vLndpa2lxdW90ZS5vcmcnLFxuICAnbm93aWtpc291cmNlJzogJ25vLndpa2lzb3VyY2Uub3JnJyxcbiAgJ25vdndpa2knOiAnbm92Lndpa2lwZWRpYS5vcmcnLFxuICAnbnJtd2lraSc6ICducm0ud2lraXBlZGlhLm9yZycsXG4gICduc293aWtpJzogJ25zby53aWtpcGVkaWEub3JnJyxcbiAgJ252d2lraSc6ICdudi53aWtpcGVkaWEub3JnJyxcbiAgJ255d2lraSc6ICdueS53aWtpcGVkaWEub3JnJyxcbiAgJ29jd2lraSc6ICdvYy53aWtpcGVkaWEub3JnJyxcbiAgJ29jd2lrdGlvbmFyeSc6ICdvYy53aWt0aW9uYXJ5Lm9yZycsXG4gICdvY3dpa2lib29rcyc6ICdvYy53aWtpYm9va3Mub3JnJyxcbiAgJ29td2lraSc6ICdvbS53aWtpcGVkaWEub3JnJyxcbiAgJ29td2lrdGlvbmFyeSc6ICdvbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdvcndpa2knOiAnb3Iud2lraXBlZGlhLm9yZycsXG4gICdvcndpa3Rpb25hcnknOiAnb3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnb3J3aWtpc291cmNlJzogJ29yLndpa2lzb3VyY2Uub3JnJyxcbiAgJ29zd2lraSc6ICdvcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Bhd2lraSc6ICdwYS53aWtpcGVkaWEub3JnJyxcbiAgJ3Bhd2lrdGlvbmFyeSc6ICdwYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdwYXdpa2lib29rcyc6ICdwYS53aWtpYm9va3Mub3JnJyxcbiAgJ3BhZ3dpa2knOiAncGFnLndpa2lwZWRpYS5vcmcnLFxuICAncGFtd2lraSc6ICdwYW0ud2lraXBlZGlhLm9yZycsXG4gICdwYXB3aWtpJzogJ3BhcC53aWtpcGVkaWEub3JnJyxcbiAgJ3BjZHdpa2knOiAncGNkLndpa2lwZWRpYS5vcmcnLFxuICAncGRjd2lraSc6ICdwZGMud2lraXBlZGlhLm9yZycsXG4gICdwZmx3aWtpJzogJ3BmbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bpd2lraSc6ICdwaS53aWtpcGVkaWEub3JnJyxcbiAgJ3Bpd2lrdGlvbmFyeSc6ICdwaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdwaWh3aWtpJzogJ3BpaC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bsd2lraSc6ICdwbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bsd2lrdGlvbmFyeSc6ICdwbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdwbHdpa2lib29rcyc6ICdwbC53aWtpYm9va3Mub3JnJyxcbiAgJ3Bsd2lraW5ld3MnOiAncGwud2lraW5ld3Mub3JnJyxcbiAgJ3Bsd2lraXF1b3RlJzogJ3BsLndpa2lxdW90ZS5vcmcnLFxuICAncGx3aWtpc291cmNlJzogJ3BsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Bsd2lraXZveWFnZSc6ICdwbC53aWtpdm95YWdlLm9yZycsXG4gICdwbXN3aWtpJzogJ3Btcy53aWtpcGVkaWEub3JnJyxcbiAgJ3BuYndpa2knOiAncG5iLndpa2lwZWRpYS5vcmcnLFxuICAncG5id2lrdGlvbmFyeSc6ICdwbmIud2lrdGlvbmFyeS5vcmcnLFxuICAncG50d2lraSc6ICdwbnQud2lraXBlZGlhLm9yZycsXG4gICdwc3dpa2knOiAncHMud2lraXBlZGlhLm9yZycsXG4gICdwc3dpa3Rpb25hcnknOiAncHMud2lrdGlvbmFyeS5vcmcnLFxuICAncHN3aWtpYm9va3MnOiAncHMud2lraWJvb2tzLm9yZycsXG4gICdwdHdpa2knOiAncHQud2lraXBlZGlhLm9yZycsXG4gICdwdHdpa3Rpb25hcnknOiAncHQud2lrdGlvbmFyeS5vcmcnLFxuICAncHR3aWtpYm9va3MnOiAncHQud2lraWJvb2tzLm9yZycsXG4gICdwdHdpa2luZXdzJzogJ3B0Lndpa2luZXdzLm9yZycsXG4gICdwdHdpa2lxdW90ZSc6ICdwdC53aWtpcXVvdGUub3JnJyxcbiAgJ3B0d2lraXNvdXJjZSc6ICdwdC53aWtpc291cmNlLm9yZycsXG4gICdwdHdpa2l2ZXJzaXR5JzogJ3B0Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdwdHdpa2l2b3lhZ2UnOiAncHQud2lraXZveWFnZS5vcmcnLFxuICAncXV3aWtpJzogJ3F1Lndpa2lwZWRpYS5vcmcnLFxuICAncXV3aWt0aW9uYXJ5JzogJ3F1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3F1d2lraWJvb2tzJzogJ3F1Lndpa2lib29rcy5vcmcnLFxuICAncXV3aWtpcXVvdGUnOiAncXUud2lraXF1b3RlLm9yZycsXG4gICdybXdpa2knOiAncm0ud2lraXBlZGlhLm9yZycsXG4gICdybXdpa3Rpb25hcnknOiAncm0ud2lrdGlvbmFyeS5vcmcnLFxuICAncm13aWtpYm9va3MnOiAncm0ud2lraWJvb2tzLm9yZycsXG4gICdybXl3aWtpJzogJ3JteS53aWtpcGVkaWEub3JnJyxcbiAgJ3Jud2lraSc6ICdybi53aWtpcGVkaWEub3JnJyxcbiAgJ3Jud2lrdGlvbmFyeSc6ICdybi53aWt0aW9uYXJ5Lm9yZycsXG4gICdyb3dpa2knOiAncm8ud2lraXBlZGlhLm9yZycsXG4gICdyb3dpa3Rpb25hcnknOiAncm8ud2lrdGlvbmFyeS5vcmcnLFxuICAncm93aWtpYm9va3MnOiAncm8ud2lraWJvb2tzLm9yZycsXG4gICdyb3dpa2luZXdzJzogJ3JvLndpa2luZXdzLm9yZycsXG4gICdyb3dpa2lxdW90ZSc6ICdyby53aWtpcXVvdGUub3JnJyxcbiAgJ3Jvd2lraXNvdXJjZSc6ICdyby53aWtpc291cmNlLm9yZycsXG4gICdyb3dpa2l2b3lhZ2UnOiAncm8ud2lraXZveWFnZS5vcmcnLFxuICAncm9hX3J1cHdpa2knOiAncm9hLXJ1cC53aWtpcGVkaWEub3JnJyxcbiAgJ3JvYV9ydXB3aWt0aW9uYXJ5JzogJ3JvYS1ydXAud2lrdGlvbmFyeS5vcmcnLFxuICAncm9hX3RhcmF3aWtpJzogJ3JvYS10YXJhLndpa2lwZWRpYS5vcmcnLFxuICAncnV3aWtpJzogJ3J1Lndpa2lwZWRpYS5vcmcnLFxuICAncnV3aWt0aW9uYXJ5JzogJ3J1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3J1d2lraWJvb2tzJzogJ3J1Lndpa2lib29rcy5vcmcnLFxuICAncnV3aWtpbmV3cyc6ICdydS53aWtpbmV3cy5vcmcnLFxuICAncnV3aWtpcXVvdGUnOiAncnUud2lraXF1b3RlLm9yZycsXG4gICdydXdpa2lzb3VyY2UnOiAncnUud2lraXNvdXJjZS5vcmcnLFxuICAncnV3aWtpdmVyc2l0eSc6ICdydS53aWtpdmVyc2l0eS5vcmcnLFxuICAncnV3aWtpdm95YWdlJzogJ3J1Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3J1ZXdpa2knOiAncnVlLndpa2lwZWRpYS5vcmcnLFxuICAncnd3aWtpJzogJ3J3Lndpa2lwZWRpYS5vcmcnLFxuICAncnd3aWt0aW9uYXJ5JzogJ3J3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nhd2lraSc6ICdzYS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nhd2lrdGlvbmFyeSc6ICdzYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzYXdpa2lib29rcyc6ICdzYS53aWtpYm9va3Mub3JnJyxcbiAgJ3Nhd2lraXF1b3RlJzogJ3NhLndpa2lxdW90ZS5vcmcnLFxuICAnc2F3aWtpc291cmNlJzogJ3NhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3NhaHdpa2knOiAnc2FoLndpa2lwZWRpYS5vcmcnLFxuICAnc2Fod2lraXNvdXJjZSc6ICdzYWgud2lraXNvdXJjZS5vcmcnLFxuICAnc2N3aWtpJzogJ3NjLndpa2lwZWRpYS5vcmcnLFxuICAnc2N3aWt0aW9uYXJ5JzogJ3NjLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Njbndpa2knOiAnc2NuLndpa2lwZWRpYS5vcmcnLFxuICAnc2Nud2lrdGlvbmFyeSc6ICdzY24ud2lrdGlvbmFyeS5vcmcnLFxuICAnc2Nvd2lraSc6ICdzY28ud2lraXBlZGlhLm9yZycsXG4gICdzZHdpa2knOiAnc2Qud2lraXBlZGlhLm9yZycsXG4gICdzZHdpa3Rpb25hcnknOiAnc2Qud2lrdGlvbmFyeS5vcmcnLFxuICAnc2R3aWtpbmV3cyc6ICdzZC53aWtpbmV3cy5vcmcnLFxuICAnc2V3aWtpJzogJ3NlLndpa2lwZWRpYS5vcmcnLFxuICAnc2V3aWtpYm9va3MnOiAnc2Uud2lraWJvb2tzLm9yZycsXG4gICdzZ3dpa2knOiAnc2cud2lraXBlZGlhLm9yZycsXG4gICdzZ3dpa3Rpb25hcnknOiAnc2cud2lrdGlvbmFyeS5vcmcnLFxuICAnc2h3aWtpJzogJ3NoLndpa2lwZWRpYS5vcmcnLFxuICAnc2h3aWt0aW9uYXJ5JzogJ3NoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Npd2lraSc6ICdzaS53aWtpcGVkaWEub3JnJyxcbiAgJ3Npd2lrdGlvbmFyeSc6ICdzaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaXdpa2lib29rcyc6ICdzaS53aWtpYm9va3Mub3JnJyxcbiAgJ3NpbXBsZXdpa2knOiAnc2ltcGxlLndpa2lwZWRpYS5vcmcnLFxuICAnc2ltcGxld2lrdGlvbmFyeSc6ICdzaW1wbGUud2lrdGlvbmFyeS5vcmcnLFxuICAnc2ltcGxld2lraWJvb2tzJzogJ3NpbXBsZS53aWtpYm9va3Mub3JnJyxcbiAgJ3NpbXBsZXdpa2lxdW90ZSc6ICdzaW1wbGUud2lraXF1b3RlLm9yZycsXG4gICdza3dpa2knOiAnc2sud2lraXBlZGlhLm9yZycsXG4gICdza3dpa3Rpb25hcnknOiAnc2sud2lrdGlvbmFyeS5vcmcnLFxuICAnc2t3aWtpYm9va3MnOiAnc2sud2lraWJvb2tzLm9yZycsXG4gICdza3dpa2lxdW90ZSc6ICdzay53aWtpcXVvdGUub3JnJyxcbiAgJ3Nrd2lraXNvdXJjZSc6ICdzay53aWtpc291cmNlLm9yZycsXG4gICdzbHdpa2knOiAnc2wud2lraXBlZGlhLm9yZycsXG4gICdzbHdpa3Rpb25hcnknOiAnc2wud2lrdGlvbmFyeS5vcmcnLFxuICAnc2x3aWtpYm9va3MnOiAnc2wud2lraWJvb2tzLm9yZycsXG4gICdzbHdpa2lxdW90ZSc6ICdzbC53aWtpcXVvdGUub3JnJyxcbiAgJ3Nsd2lraXNvdXJjZSc6ICdzbC53aWtpc291cmNlLm9yZycsXG4gICdzbHdpa2l2ZXJzaXR5JzogJ3NsLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdzbXdpa2knOiAnc20ud2lraXBlZGlhLm9yZycsXG4gICdzbXdpa3Rpb25hcnknOiAnc20ud2lrdGlvbmFyeS5vcmcnLFxuICAnc253aWtpJzogJ3NuLndpa2lwZWRpYS5vcmcnLFxuICAnc253aWt0aW9uYXJ5JzogJ3NuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nvd2lraSc6ICdzby53aWtpcGVkaWEub3JnJyxcbiAgJ3Nvd2lrdGlvbmFyeSc6ICdzby53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcXdpa2knOiAnc3Eud2lraXBlZGlhLm9yZycsXG4gICdzcXdpa3Rpb25hcnknOiAnc3Eud2lrdGlvbmFyeS5vcmcnLFxuICAnc3F3aWtpYm9va3MnOiAnc3Eud2lraWJvb2tzLm9yZycsXG4gICdzcXdpa2luZXdzJzogJ3NxLndpa2luZXdzLm9yZycsXG4gICdzcXdpa2lxdW90ZSc6ICdzcS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nyd2lraSc6ICdzci53aWtpcGVkaWEub3JnJyxcbiAgJ3Nyd2lrdGlvbmFyeSc6ICdzci53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcndpa2lib29rcyc6ICdzci53aWtpYm9va3Mub3JnJyxcbiAgJ3Nyd2lraW5ld3MnOiAnc3Iud2lraW5ld3Mub3JnJyxcbiAgJ3Nyd2lraXF1b3RlJzogJ3NyLndpa2lxdW90ZS5vcmcnLFxuICAnc3J3aWtpc291cmNlJzogJ3NyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Nybndpa2knOiAnc3JuLndpa2lwZWRpYS5vcmcnLFxuICAnc3N3aWtpJzogJ3NzLndpa2lwZWRpYS5vcmcnLFxuICAnc3N3aWt0aW9uYXJ5JzogJ3NzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3N0d2lraSc6ICdzdC53aWtpcGVkaWEub3JnJyxcbiAgJ3N0d2lrdGlvbmFyeSc6ICdzdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdHF3aWtpJzogJ3N0cS53aWtpcGVkaWEub3JnJyxcbiAgJ3N1d2lraSc6ICdzdS53aWtpcGVkaWEub3JnJyxcbiAgJ3N1d2lrdGlvbmFyeSc6ICdzdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdXdpa2lib29rcyc6ICdzdS53aWtpYm9va3Mub3JnJyxcbiAgJ3N1d2lraXF1b3RlJzogJ3N1Lndpa2lxdW90ZS5vcmcnLFxuICAnc3Z3aWtpJzogJ3N2Lndpa2lwZWRpYS5vcmcnLFxuICAnc3Z3aWt0aW9uYXJ5JzogJ3N2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N2d2lraWJvb2tzJzogJ3N2Lndpa2lib29rcy5vcmcnLFxuICAnc3Z3aWtpbmV3cyc6ICdzdi53aWtpbmV3cy5vcmcnLFxuICAnc3Z3aWtpcXVvdGUnOiAnc3Yud2lraXF1b3RlLm9yZycsXG4gICdzdndpa2lzb3VyY2UnOiAnc3Yud2lraXNvdXJjZS5vcmcnLFxuICAnc3Z3aWtpdmVyc2l0eSc6ICdzdi53aWtpdmVyc2l0eS5vcmcnLFxuICAnc3Z3aWtpdm95YWdlJzogJ3N2Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3N3d2lraSc6ICdzdy53aWtpcGVkaWEub3JnJyxcbiAgJ3N3d2lrdGlvbmFyeSc6ICdzdy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzd3dpa2lib29rcyc6ICdzdy53aWtpYm9va3Mub3JnJyxcbiAgJ3N6bHdpa2knOiAnc3psLndpa2lwZWRpYS5vcmcnLFxuICAndGF3aWtpJzogJ3RhLndpa2lwZWRpYS5vcmcnLFxuICAndGF3aWt0aW9uYXJ5JzogJ3RhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rhd2lraWJvb2tzJzogJ3RhLndpa2lib29rcy5vcmcnLFxuICAndGF3aWtpbmV3cyc6ICd0YS53aWtpbmV3cy5vcmcnLFxuICAndGF3aWtpcXVvdGUnOiAndGEud2lraXF1b3RlLm9yZycsXG4gICd0YXdpa2lzb3VyY2UnOiAndGEud2lraXNvdXJjZS5vcmcnLFxuICAndGV3aWtpJzogJ3RlLndpa2lwZWRpYS5vcmcnLFxuICAndGV3aWt0aW9uYXJ5JzogJ3RlLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rld2lraWJvb2tzJzogJ3RlLndpa2lib29rcy5vcmcnLFxuICAndGV3aWtpcXVvdGUnOiAndGUud2lraXF1b3RlLm9yZycsXG4gICd0ZXdpa2lzb3VyY2UnOiAndGUud2lraXNvdXJjZS5vcmcnLFxuICAndGV0d2lraSc6ICd0ZXQud2lraXBlZGlhLm9yZycsXG4gICd0Z3dpa2knOiAndGcud2lraXBlZGlhLm9yZycsXG4gICd0Z3dpa3Rpb25hcnknOiAndGcud2lrdGlvbmFyeS5vcmcnLFxuICAndGd3aWtpYm9va3MnOiAndGcud2lraWJvb2tzLm9yZycsXG4gICd0aHdpa2knOiAndGgud2lraXBlZGlhLm9yZycsXG4gICd0aHdpa3Rpb25hcnknOiAndGgud2lrdGlvbmFyeS5vcmcnLFxuICAndGh3aWtpYm9va3MnOiAndGgud2lraWJvb2tzLm9yZycsXG4gICd0aHdpa2luZXdzJzogJ3RoLndpa2luZXdzLm9yZycsXG4gICd0aHdpa2lxdW90ZSc6ICd0aC53aWtpcXVvdGUub3JnJyxcbiAgJ3Rod2lraXNvdXJjZSc6ICd0aC53aWtpc291cmNlLm9yZycsXG4gICd0aXdpa2knOiAndGkud2lraXBlZGlhLm9yZycsXG4gICd0aXdpa3Rpb25hcnknOiAndGkud2lrdGlvbmFyeS5vcmcnLFxuICAndGt3aWtpJzogJ3RrLndpa2lwZWRpYS5vcmcnLFxuICAndGt3aWt0aW9uYXJ5JzogJ3RrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rrd2lraWJvb2tzJzogJ3RrLndpa2lib29rcy5vcmcnLFxuICAndGt3aWtpcXVvdGUnOiAndGsud2lraXF1b3RlLm9yZycsXG4gICd0bHdpa2knOiAndGwud2lraXBlZGlhLm9yZycsXG4gICd0bHdpa3Rpb25hcnknOiAndGwud2lrdGlvbmFyeS5vcmcnLFxuICAndGx3aWtpYm9va3MnOiAndGwud2lraWJvb2tzLm9yZycsXG4gICd0bndpa2knOiAndG4ud2lraXBlZGlhLm9yZycsXG4gICd0bndpa3Rpb25hcnknOiAndG4ud2lrdGlvbmFyeS5vcmcnLFxuICAndG93aWtpJzogJ3RvLndpa2lwZWRpYS5vcmcnLFxuICAndG93aWt0aW9uYXJ5JzogJ3RvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3RwaXdpa2knOiAndHBpLndpa2lwZWRpYS5vcmcnLFxuICAndHBpd2lrdGlvbmFyeSc6ICd0cGkud2lrdGlvbmFyeS5vcmcnLFxuICAndHJ3aWtpJzogJ3RyLndpa2lwZWRpYS5vcmcnLFxuICAndHJ3aWt0aW9uYXJ5JzogJ3RyLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Ryd2lraWJvb2tzJzogJ3RyLndpa2lib29rcy5vcmcnLFxuICAndHJ3aWtpbmV3cyc6ICd0ci53aWtpbmV3cy5vcmcnLFxuICAndHJ3aWtpcXVvdGUnOiAndHIud2lraXF1b3RlLm9yZycsXG4gICd0cndpa2lzb3VyY2UnOiAndHIud2lraXNvdXJjZS5vcmcnLFxuICAndHN3aWtpJzogJ3RzLndpa2lwZWRpYS5vcmcnLFxuICAndHN3aWt0aW9uYXJ5JzogJ3RzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3R0d2lraSc6ICd0dC53aWtpcGVkaWEub3JnJyxcbiAgJ3R0d2lrdGlvbmFyeSc6ICd0dC53aWt0aW9uYXJ5Lm9yZycsXG4gICd0dHdpa2lib29rcyc6ICd0dC53aWtpYm9va3Mub3JnJyxcbiAgJ3R0d2lraXF1b3RlJzogJ3R0Lndpa2lxdW90ZS5vcmcnLFxuICAndHVtd2lraSc6ICd0dW0ud2lraXBlZGlhLm9yZycsXG4gICd0d3dpa2knOiAndHcud2lraXBlZGlhLm9yZycsXG4gICd0d3dpa3Rpb25hcnknOiAndHcud2lrdGlvbmFyeS5vcmcnLFxuICAndHl3aWtpJzogJ3R5Lndpa2lwZWRpYS5vcmcnLFxuICAndHl2d2lraSc6ICd0eXYud2lraXBlZGlhLm9yZycsXG4gICd1ZG13aWtpJzogJ3VkbS53aWtpcGVkaWEub3JnJyxcbiAgJ3Vnd2lraSc6ICd1Zy53aWtpcGVkaWEub3JnJyxcbiAgJ3Vnd2lrdGlvbmFyeSc6ICd1Zy53aWt0aW9uYXJ5Lm9yZycsXG4gICd1Z3dpa2lib29rcyc6ICd1Zy53aWtpYm9va3Mub3JnJyxcbiAgJ3Vnd2lraXF1b3RlJzogJ3VnLndpa2lxdW90ZS5vcmcnLFxuICAndWt3aWtpJzogJ3VrLndpa2lwZWRpYS5vcmcnLFxuICAndWt3aWt0aW9uYXJ5JzogJ3VrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Vrd2lraWJvb2tzJzogJ3VrLndpa2lib29rcy5vcmcnLFxuICAndWt3aWtpbmV3cyc6ICd1ay53aWtpbmV3cy5vcmcnLFxuICAndWt3aWtpcXVvdGUnOiAndWsud2lraXF1b3RlLm9yZycsXG4gICd1a3dpa2lzb3VyY2UnOiAndWsud2lraXNvdXJjZS5vcmcnLFxuICAndWt3aWtpdm95YWdlJzogJ3VrLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Vyd2lraSc6ICd1ci53aWtpcGVkaWEub3JnJyxcbiAgJ3Vyd2lrdGlvbmFyeSc6ICd1ci53aWt0aW9uYXJ5Lm9yZycsXG4gICd1cndpa2lib29rcyc6ICd1ci53aWtpYm9va3Mub3JnJyxcbiAgJ3Vyd2lraXF1b3RlJzogJ3VyLndpa2lxdW90ZS5vcmcnLFxuICAndXp3aWtpJzogJ3V6Lndpa2lwZWRpYS5vcmcnLFxuICAndXp3aWt0aW9uYXJ5JzogJ3V6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3V6d2lraWJvb2tzJzogJ3V6Lndpa2lib29rcy5vcmcnLFxuICAndXp3aWtpcXVvdGUnOiAndXoud2lraXF1b3RlLm9yZycsXG4gICd2ZXdpa2knOiAndmUud2lraXBlZGlhLm9yZycsXG4gICd2ZWN3aWtpJzogJ3ZlYy53aWtpcGVkaWEub3JnJyxcbiAgJ3ZlY3dpa3Rpb25hcnknOiAndmVjLndpa3Rpb25hcnkub3JnJyxcbiAgJ3ZlY3dpa2lzb3VyY2UnOiAndmVjLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3ZlcHdpa2knOiAndmVwLndpa2lwZWRpYS5vcmcnLFxuICAndml3aWtpJzogJ3ZpLndpa2lwZWRpYS5vcmcnLFxuICAndml3aWt0aW9uYXJ5JzogJ3ZpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Zpd2lraWJvb2tzJzogJ3ZpLndpa2lib29rcy5vcmcnLFxuICAndml3aWtpcXVvdGUnOiAndmkud2lraXF1b3RlLm9yZycsXG4gICd2aXdpa2lzb3VyY2UnOiAndmkud2lraXNvdXJjZS5vcmcnLFxuICAndml3aWtpdm95YWdlJzogJ3ZpLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Zsc3dpa2knOiAndmxzLndpa2lwZWRpYS5vcmcnLFxuICAndm93aWtpJzogJ3ZvLndpa2lwZWRpYS5vcmcnLFxuICAndm93aWt0aW9uYXJ5JzogJ3ZvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Zvd2lraWJvb2tzJzogJ3ZvLndpa2lib29rcy5vcmcnLFxuICAndm93aWtpcXVvdGUnOiAndm8ud2lraXF1b3RlLm9yZycsXG4gICd3YXdpa2knOiAnd2Eud2lraXBlZGlhLm9yZycsXG4gICd3YXdpa3Rpb25hcnknOiAnd2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnd2F3aWtpYm9va3MnOiAnd2Eud2lraWJvb2tzLm9yZycsXG4gICd3YXJ3aWtpJzogJ3dhci53aWtpcGVkaWEub3JnJyxcbiAgJ3dvd2lraSc6ICd3by53aWtpcGVkaWEub3JnJyxcbiAgJ3dvd2lrdGlvbmFyeSc6ICd3by53aWt0aW9uYXJ5Lm9yZycsXG4gICd3b3dpa2lxdW90ZSc6ICd3by53aWtpcXVvdGUub3JnJyxcbiAgJ3d1dXdpa2knOiAnd3V1Lndpa2lwZWRpYS5vcmcnLFxuICAneGFsd2lraSc6ICd4YWwud2lraXBlZGlhLm9yZycsXG4gICd4aHdpa2knOiAneGgud2lraXBlZGlhLm9yZycsXG4gICd4aHdpa3Rpb25hcnknOiAneGgud2lrdGlvbmFyeS5vcmcnLFxuICAneGh3aWtpYm9va3MnOiAneGgud2lraWJvb2tzLm9yZycsXG4gICd4bWZ3aWtpJzogJ3htZi53aWtpcGVkaWEub3JnJyxcbiAgJ3lpd2lraSc6ICd5aS53aWtpcGVkaWEub3JnJyxcbiAgJ3lpd2lrdGlvbmFyeSc6ICd5aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd5aXdpa2lzb3VyY2UnOiAneWkud2lraXNvdXJjZS5vcmcnLFxuICAneW93aWtpJzogJ3lvLndpa2lwZWRpYS5vcmcnLFxuICAneW93aWt0aW9uYXJ5JzogJ3lvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3lvd2lraWJvb2tzJzogJ3lvLndpa2lib29rcy5vcmcnLFxuICAnemF3aWtpJzogJ3phLndpa2lwZWRpYS5vcmcnLFxuICAnemF3aWt0aW9uYXJ5JzogJ3phLndpa3Rpb25hcnkub3JnJyxcbiAgJ3phd2lraWJvb2tzJzogJ3phLndpa2lib29rcy5vcmcnLFxuICAnemF3aWtpcXVvdGUnOiAnemEud2lraXF1b3RlLm9yZycsXG4gICd6ZWF3aWtpJzogJ3plYS53aWtpcGVkaWEub3JnJyxcbiAgJ3pod2lraSc6ICd6aC53aWtpcGVkaWEub3JnJyxcbiAgJ3pod2lrdGlvbmFyeSc6ICd6aC53aWt0aW9uYXJ5Lm9yZycsXG4gICd6aHdpa2lib29rcyc6ICd6aC53aWtpYm9va3Mub3JnJyxcbiAgJ3pod2lraW5ld3MnOiAnemgud2lraW5ld3Mub3JnJyxcbiAgJ3pod2lraXF1b3RlJzogJ3poLndpa2lxdW90ZS5vcmcnLFxuICAnemh3aWtpc291cmNlJzogJ3poLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3pod2lraXZveWFnZSc6ICd6aC53aWtpdm95YWdlLm9yZycsXG4gICd6aF9jbGFzc2ljYWx3aWtpJzogJ3poLWNsYXNzaWNhbC53aWtpcGVkaWEub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpJzogJ3poLW1pbi1uYW4ud2lraXBlZGlhLm9yZycsXG4gICd6aF9taW5fbmFud2lrdGlvbmFyeSc6ICd6aC1taW4tbmFuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpYm9va3MnOiAnemgtbWluLW5hbi53aWtpYm9va3Mub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpcXVvdGUnOiAnemgtbWluLW5hbi53aWtpcXVvdGUub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpc291cmNlJzogJ3poLW1pbi1uYW4ud2lraXNvdXJjZS5vcmcnLFxuICAnemhfeXVld2lraSc6ICd6aC15dWUud2lraXBlZGlhLm9yZycsXG4gICd6dXdpa2knOiAnenUud2lraXBlZGlhLm9yZycsXG4gICd6dXdpa3Rpb25hcnknOiAnenUud2lrdGlvbmFyeS5vcmcnLFxuICAnenV3aWtpYm9va3MnOiAnenUud2lraWJvb2tzLm9yZycsXG4gICdhZHZpc29yeXdpa2knOiAnYWR2aXNvcnkud2lraW1lZGlhLm9yZycsXG4gICdhcndpa2ltZWRpYSc6ICdhci53aWtpbWVkaWEub3JnJyxcbiAgJ2FyYmNvbV9kZXdpa2knOiAnYXJiY29tLWRlLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX2Vud2lraSc6ICdhcmJjb20tZW4ud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fZml3aWtpJzogJ2FyYmNvbS1maS53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9ubHdpa2knOiAnYXJiY29tLW5sLndpa2lwZWRpYS5vcmcnLFxuICAnYXVkaXRjb213aWtpJzogJ2F1ZGl0Y29tLndpa2ltZWRpYS5vcmcnLFxuICAnYmR3aWtpbWVkaWEnOiAnYmQud2lraW1lZGlhLm9yZycsXG4gICdiZXdpa2ltZWRpYSc6ICdiZS53aWtpbWVkaWEub3JnJyxcbiAgJ2JldGF3aWtpdmVyc2l0eSc6ICdiZXRhLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdib2FyZHdpa2knOiAnYm9hcmQud2lraW1lZGlhLm9yZycsXG4gICdib2FyZGdvdmNvbXdpa2knOiAnYm9hcmRnb3Zjb20ud2lraW1lZGlhLm9yZycsXG4gICdicndpa2ltZWRpYSc6ICdici53aWtpbWVkaWEub3JnJyxcbiAgJ2Nhd2lraW1lZGlhJzogJ2NhLndpa2ltZWRpYS5vcmcnLFxuICAnY2hhaXJ3aWtpJzogJ2NoYWlyLndpa2ltZWRpYS5vcmcnLFxuICAnY2hhcGNvbXdpa2knOiAnYWZmY29tLndpa2ltZWRpYS5vcmcnLFxuICAnY2hlY2t1c2Vyd2lraSc6ICdjaGVja3VzZXIud2lraW1lZGlhLm9yZycsXG4gICdjbndpa2ltZWRpYSc6ICdjbi53aWtpbWVkaWEub3JnJyxcbiAgJ2Nvd2lraW1lZGlhJzogJ2NvLndpa2ltZWRpYS5vcmcnLFxuICAnY29sbGFid2lraSc6ICdjb2xsYWIud2lraW1lZGlhLm9yZycsXG4gICdjb21tb25zd2lraSc6ICdjb21tb25zLndpa2ltZWRpYS5vcmcnLFxuICAnZGt3aWtpbWVkaWEnOiAnZGsud2lraW1lZGlhLm9yZycsXG4gICdkb25hdGV3aWtpJzogJ2RvbmF0ZS53aWtpbWVkaWEub3JnJyxcbiAgJ2V0d2lraW1lZGlhJzogJ2VlLndpa2ltZWRpYS5vcmcnLFxuICAnZXhlY3dpa2knOiAnZXhlYy53aWtpbWVkaWEub3JnJyxcbiAgJ2ZkY3dpa2knOiAnZmRjLndpa2ltZWRpYS5vcmcnLFxuICAnZml3aWtpbWVkaWEnOiAnZmkud2lraW1lZGlhLm9yZycsXG4gICdmb3VuZGF0aW9ud2lraSc6ICd3aWtpbWVkaWFmb3VuZGF0aW9uLm9yZycsXG4gICdncmFudHN3aWtpJzogJ2dyYW50cy53aWtpbWVkaWEub3JnJyxcbiAgJ2llZ2NvbXdpa2knOiAnaWVnY29tLndpa2ltZWRpYS5vcmcnLFxuICAnaWx3aWtpbWVkaWEnOiAnaWwud2lraW1lZGlhLm9yZycsXG4gICdpbmN1YmF0b3J3aWtpJzogJ2luY3ViYXRvci53aWtpbWVkaWEub3JnJyxcbiAgJ2ludGVybmFsd2lraSc6ICdpbnRlcm5hbC53aWtpbWVkaWEub3JnJyxcbiAgJ2xhYnN3aWtpJzogJ3dpa2l0ZWNoLndpa2ltZWRpYS5vcmcnLFxuICAnbGFidGVzdHdpa2knOiAnbGFidGVzdHdpa2l0ZWNoLndpa2ltZWRpYS5vcmcnLFxuICAnbGVnYWx0ZWFtd2lraSc6ICdsZWdhbHRlYW0ud2lraW1lZGlhLm9yZycsXG4gICdsb2dpbndpa2knOiAnbG9naW4ud2lraW1lZGlhLm9yZycsXG4gICdtZWRpYXdpa2l3aWtpJzogJ21lZGlhd2lraS5vcmcnLFxuICAnbWV0YXdpa2knOiAnbWV0YS53aWtpbWVkaWEub3JnJyxcbiAgJ21rd2lraW1lZGlhJzogJ21rLndpa2ltZWRpYS5vcmcnLFxuICAnbW92ZW1lbnRyb2xlc3dpa2knOiAnbW92ZW1lbnRyb2xlcy53aWtpbWVkaWEub3JnJyxcbiAgJ214d2lraW1lZGlhJzogJ214Lndpa2ltZWRpYS5vcmcnLFxuICAnbmx3aWtpbWVkaWEnOiAnbmwud2lraW1lZGlhLm9yZycsXG4gICdub3dpa2ltZWRpYSc6ICduby53aWtpbWVkaWEub3JnJyxcbiAgJ25vYm9hcmRfY2hhcHRlcnN3aWtpbWVkaWEnOiAnbm9ib2FyZC1jaGFwdGVycy53aWtpbWVkaWEub3JnJyxcbiAgJ25vc3RhbGdpYXdpa2knOiAnbm9zdGFsZ2lhLndpa2lwZWRpYS5vcmcnLFxuICAnbnljd2lraW1lZGlhJzogJ255Yy53aWtpbWVkaWEub3JnJyxcbiAgJ256d2lraW1lZGlhJzogJ256Lndpa2ltZWRpYS5vcmcnLFxuICAnb2ZmaWNld2lraSc6ICdvZmZpY2Uud2lraW1lZGlhLm9yZycsXG4gICdvbWJ1ZHNtZW53aWtpJzogJ29tYnVkc21lbi53aWtpbWVkaWEub3JnJyxcbiAgJ290cnNfd2lraXdpa2knOiAnb3Rycy13aWtpLndpa2ltZWRpYS5vcmcnLFxuICAnb3V0cmVhY2h3aWtpJzogJ291dHJlYWNoLndpa2ltZWRpYS5vcmcnLFxuICAncGFfdXN3aWtpbWVkaWEnOiAncGEtdXMud2lraW1lZGlhLm9yZycsXG4gICdwbHdpa2ltZWRpYSc6ICdwbC53aWtpbWVkaWEub3JnJyxcbiAgJ3F1YWxpdHl3aWtpJzogJ3F1YWxpdHkud2lraW1lZGlhLm9yZycsXG4gICdyc3dpa2ltZWRpYSc6ICdycy53aWtpbWVkaWEub3JnJyxcbiAgJ3J1d2lraW1lZGlhJzogJ3J1Lndpa2ltZWRpYS5vcmcnLFxuICAnc2V3aWtpbWVkaWEnOiAnc2Uud2lraW1lZGlhLm9yZycsXG4gICdzZWFyY2hjb213aWtpJzogJ3NlYXJjaGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ3NvdXJjZXN3aWtpJzogJ3dpa2lzb3VyY2Uub3JnJyxcbiAgJ3NwY29td2lraSc6ICdzcGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ3NwZWNpZXN3aWtpJzogJ3NwZWNpZXMud2lraW1lZGlhLm9yZycsXG4gICdzdGV3YXJkd2lraSc6ICdzdGV3YXJkLndpa2ltZWRpYS5vcmcnLFxuICAnc3RyYXRlZ3l3aWtpJzogJ3N0cmF0ZWd5Lndpa2ltZWRpYS5vcmcnLFxuICAndGVud2lraSc6ICd0ZW4ud2lraXBlZGlhLm9yZycsXG4gICd0ZXN0d2lraSc6ICd0ZXN0Lndpa2lwZWRpYS5vcmcnLFxuICAndGVzdDJ3aWtpJzogJ3Rlc3QyLndpa2lwZWRpYS5vcmcnLFxuICAndGVzdHdpa2lkYXRhd2lraSc6ICd0ZXN0Lndpa2lkYXRhLm9yZycsXG4gICd0cndpa2ltZWRpYSc6ICd0ci53aWtpbWVkaWEub3JnJyxcbiAgJ3RyYW5zaXRpb250ZWFtd2lraSc6ICd0cmFuc2l0aW9udGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ3Vhd2lraW1lZGlhJzogJ3VhLndpa2ltZWRpYS5vcmcnLFxuICAndWt3aWtpbWVkaWEnOiAndWsud2lraW1lZGlhLm9yZycsXG4gICd1c2FiaWxpdHl3aWtpJzogJ3VzYWJpbGl0eS53aWtpbWVkaWEub3JnJyxcbiAgJ3ZvdGV3aWtpJzogJ3ZvdGUud2lraW1lZGlhLm9yZycsXG4gICd3Z19lbndpa2knOiAnd2ctZW4ud2lraXBlZGlhLm9yZycsXG4gICd3aWtpZGF0YXdpa2knOiAnd2lraWRhdGEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDV3aWtpJzogJ3dpa2ltYW5pYTIwMDUud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA2d2lraSc6ICd3aWtpbWFuaWEyMDA2Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwN3dpa2knOiAnd2lraW1hbmlhMjAwNy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDh3aWtpJzogJ3dpa2ltYW5pYTIwMDgud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA5d2lraSc6ICd3aWtpbWFuaWEyMDA5Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMHdpa2knOiAnd2lraW1hbmlhMjAxMC53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTF3aWtpJzogJ3dpa2ltYW5pYTIwMTEud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDEyd2lraSc6ICd3aWtpbWFuaWEyMDEyLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxM3dpa2knOiAnd2lraW1hbmlhMjAxMy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTR3aWtpJzogJ3dpa2ltYW5pYTIwMTQud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE1d2lraSc6ICd3aWtpbWFuaWEyMDE1Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNndpa2knOiAnd2lraW1hbmlhMjAxNi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTd3aWtpJzogJ3dpa2ltYW5pYTIwMTcud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWF0ZWFtd2lraSc6ICd3aWtpbWFuaWF0ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAnemVyb3dpa2knOiAnemVyby53aWtpbWVkaWEub3JnJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaXRlTWFwO1xuIiwiLyoqXG4gKiBAZmlsZSBUZW1wbGF0ZXMgdXNlZCBieSBDaGFydC5qcyBmb3IgUGFnZXZpZXdzIGFwcFxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKi9cblxuLyoqXG4gKiBUZW1wbGF0ZXMgdXNlZCBieSBDaGFydC5qcy5cbiAqIEZ1bmN0aW9ucyB1c2VkIHdpdGhpbiBvdXIgYXBwIG11c3QgYmUgaW4gdGhlIGdsb2JhbCBzY29wZS5cbiAqIEFsbCBxdW90YXRpb25zIG11c3QgYmUgZG91YmxlLXF1b3RlcyBvciBwcm9wZXJseSBlc2NhcGVkLlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgdGVtcGxhdGVzID0ge1xuICBjaGFydExlZ2VuZChzY29wZSkge1xuICAgIGNvbnN0IGRhdGFMaXN0ID0gKGVudGl0eSwgbXVsdGlFbnRpdHkgPSBmYWxzZSkgPT4ge1xuICAgICAgbGV0IGVkaXRzTGluaztcblxuICAgICAgaWYgKG11bHRpRW50aXR5KSB7XG4gICAgICAgIGVkaXRzTGluayA9IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkubnVtX2VkaXRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRzTGluayA9IGA8YSBocmVmPVwiJHtzY29wZS5nZXRFeHBhbmRlZFBhZ2VVUkwoZW50aXR5LmxhYmVsKX0mYWN0aW9uPWhpc3RvcnlcIiB0YXJnZXQ9XCJfYmxhbmtcIiBjbGFzcz1cInB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICR7c2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS5udW1fZWRpdHMpfVxuICAgICAgICAgIDwvYT5gO1xuICAgICAgfVxuXG4gICAgICBsZXQgaW5mb0hhc2ggPSB7XG4gICAgICAgICdQYWdldmlld3MnOiB7XG4gICAgICAgICAgJ1BhZ2V2aWV3cyc6IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkuc3VtKSxcbiAgICAgICAgICAnRGFpbHkgYXZlcmFnZSc6IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkuYXZlcmFnZSlcbiAgICAgICAgfSxcbiAgICAgICAgJ1JldmlzaW9ucyc6IHtcbiAgICAgICAgICAnRWRpdHMnOiBlZGl0c0xpbmssXG4gICAgICAgICAgJ0VkaXRvcnMnOiBzY29wZS5mb3JtYXROdW1iZXIoZW50aXR5Lm51bV91c2VycylcbiAgICAgICAgfSxcbiAgICAgICAgJ0Jhc2ljIGluZm9ybWF0aW9uJzoge1xuICAgICAgICAgICdXYXRjaGVycyc6IGVudGl0eS53YXRjaGVycyA/IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkud2F0Y2hlcnMpIDogJC5pMThuKCd1bmtub3duJylcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKCFtdWx0aUVudGl0eSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGluZm9IYXNoWydCYXNpYyBpbmZvcm1hdGlvbiddLCB7XG4gICAgICAgICAgJ1NpemUnOiBlbnRpdHkubGVuZ3RoID8gc2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS5sZW5ndGgpIDogJycsXG4gICAgICAgICAgJ1Byb3RlY3Rpb24nOiBlbnRpdHkucHJvdGVjdGlvblxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbGV0IG1hcmt1cCA9ICcnO1xuXG4gICAgICBmb3IgKGxldCBibG9jayBpbiBpbmZvSGFzaCkge1xuICAgICAgICBtYXJrdXAgKz0gYDxkaXYgY2xhc3M9J2xlZ2VuZC1ibG9jayc+PGg1PiR7YmxvY2t9PC9oNT48aHIvPmA7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBpbmZvSGFzaFtibG9ja10pIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGluZm9IYXNoW2Jsb2NrXVtrZXldO1xuICAgICAgICAgIGlmICghdmFsdWUpIGNvbnRpbnVlO1xuICAgICAgICAgIG1hcmt1cCArPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tY291bnRzXCI+XG4gICAgICAgICAgICAgICR7a2V5fTpcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3B1bGwtcmlnaHQnPlxuICAgICAgICAgICAgICAgICR7dmFsdWV9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgICAgbWFya3VwICs9ICc8L2Rpdj4nO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW11bHRpRW50aXR5KSB7XG4gICAgICAgIG1hcmt1cCArPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVhci1sZWdlbmQtLWxpbmtzXCI+XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtzY29wZS5nZXRMYW5ndmlld3NVUkwoZW50aXR5LmxhYmVsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4keyQuaTE4bignYWxsLWxhbmd1YWdlcycpfTwvYT5cbiAgICAgICAgICAgICZidWxsZXQ7XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtzY29wZS5nZXRSZWRpcmVjdHZpZXdzVVJMKGVudGl0eS5sYWJlbCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHskLmkxOG4oJ3JlZGlyZWN0cycpfTwvYT5cbiAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFya3VwO1xuICAgIH07XG5cbiAgICAvLyBtYXAgb3V0IGVkaXQgcHJvdGVjdGlvbiBsZXZlbCBmb3IgZWFjaCBlbnRpdHlcbiAgICBjb25zdCBlbnRpdGllcyA9IHNjb3BlLm91dHB1dERhdGEubWFwKGVudGl0eSA9PiB7XG4gICAgICBjb25zdCBwcm90ZWN0aW9uID0gKGVudGl0eS5wcm90ZWN0aW9uIHx8IFtdKS5maW5kKHByb3QgPT4gcHJvdC50eXBlID09PSAnZWRpdCcpO1xuICAgICAgZW50aXR5LnByb3RlY3Rpb24gPSBwcm90ZWN0aW9uID8gcHJvdGVjdGlvbi5sZXZlbCA6ICQuaTE4bignbm9uZScpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gZW50aXR5O1xuICAgIH0pO1xuXG4gICAgaWYgKHNjb3BlLm91dHB1dERhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gZGF0YUxpc3QoZW50aXRpZXNbMF0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN1bSA9IGVudGl0aWVzLnJlZHVjZSgoYSxiKSA9PiBhICsgYi5zdW0sIDApO1xuICAgIGNvbnN0IHRvdGFscyA9IHtcbiAgICAgIHN1bSxcbiAgICAgIGF2ZXJhZ2U6IE1hdGgucm91bmQoc3VtIC8gZW50aXRpZXMubGVuZ3RoKSxcbiAgICAgIG51bV9lZGl0czogZW50aXRpZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYi5udW1fZWRpdHMsIDApLFxuICAgICAgbnVtX3VzZXJzOiBlbnRpdGllcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLm51bV91c2VycywgMCksXG4gICAgICB3YXRjaGVyczogZW50aXRpZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYi53YXRjaGVycyB8fCAwLCAwKVxuICAgIH07XG5cbiAgICByZXR1cm4gZGF0YUxpc3QodG90YWxzLCB0cnVlKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZXM7XG4iXX0=
