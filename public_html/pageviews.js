(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @file Configuration for Pageviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

var templates = require('./templates');

/**
 * Configuration for Pageviews application.
 * This includes selectors, defaults, and other constants specific to Pageviews
 * @type {Object}
 */
var config = {
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

},{"./templates":9}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Pageviews Analysis tool
 * @file Main file for Pageviews application
 * @author MusikAnimal, Kaldari, Marcelrf
 * @copyright 2016 MusikAnimal, Kaldari, Marcelrf
 * @license MIT License: https://opensource.org/licenses/MIT
 */

var config = require('./config');
var Pv = require('./shared/pv');
var ChartHelpers = require('./shared/chart_helpers');

/** Main PageViews class */

var PageViews = function (_mix$with) {
  _inherits(PageViews, _mix$with);

  function PageViews() {
    _classCallCheck(this, PageViews);

    var _this = _possibleConstructorReturn(this, (PageViews.__proto__ || Object.getPrototypeOf(PageViews)).call(this, config));

    _this.app = 'pageviews';

    _this.entityInfo = false; /** let's us know if we've gotten the page info from API yet */
    _this.specialRange = null;
    _this.initialQuery = false;
    _this.sort = 'title';
    _this.direction = '-1';

    /**
     * Select2 library prints "Uncaught TypeError: XYZ is not a function" errors
     * caused by race conditions between consecutive ajax calls. They are actually
     * not critical and can be avoided with this empty function.
     */
    window.articleSuggestionCallback = $.noop;
    return _this;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */


  _createClass(PageViews, [{
    key: 'initialize',
    value: function initialize() {
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

  }, {
    key: 'getEditData',
    value: function getEditData(pages) {
      var dfd = $.Deferred();

      if (metaRoot) {
        $.ajax({
          url: '//' + metaRoot + '/article_analysis/basic_info',
          data: {
            pages: pages.join('|'),
            project: this.project,
            start: this.daterangepicker.startDate.format('YYYY-MM-DD'),
            end: this.daterangepicker.endDate.format('YYYY-MM-DD')
          }
        }).then(function (data) {
          return dfd.resolve(data);
        });
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

  }, {
    key: 'getLangviewsURL',
    value: function getLangviewsURL(page) {
      return '/langviews?' + $.param(this.getParams()) + '&page=' + page.replace(/[&%]/g, escape).score();
    }

    /**
     * Link to /redirectviews for given page and chosen daterange
     * @param {String} page - page title
     * @returns {String} URL
     */

  }, {
    key: 'getRedirectviewsURL',
    value: function getRedirectviewsURL(page) {
      return '/redirectviews?' + $.param(this.getParams()) + '&page=' + page.replace(/[&%]/g, escape).score();
    }

    /**
     * Construct query for API based on what type of search we're doing
     * @param {Object} query - as returned from Select2 input
     * @returns {Object} query params to be handed off to API
     */

  }, {
    key: 'getSearchParams',
    value: function getSearchParams(query) {
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

  }, {
    key: 'popParams',
    value: function popParams() {
      var _this2 = this;

      /** show loading indicator and add error handling for timeouts */
      setTimeout(this.startSpinny.bind(this)); // use setTimeout to force rendering threads to catch up

      var params = this.validateParams(this.parseQueryString('pages'));

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
      var getPageInfoAndSetDefaults = function getPageInfoAndSetDefaults(pages) {
        _this2.getPageAndEditInfo(pages).then(function (pageInfo) {
          _this2.initialQuery = true;
          var normalizedPageNames = Object.keys(pageInfo);
          _this2.setSelect2Defaults(_this2.underscorePageNames(normalizedPageNames));
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

  }, {
    key: 'processSearchResults',
    value: function processSearchResults(data) {
      var query = data ? data.query : {};
      var results = [];

      if (!query) return { results: results };

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
          results = query.redirects.map(function (red) {
            return {
              id: red.from.score(),
              text: red.from
            };
          });
        }

        Object.keys(query.pages).forEach(function (pageId) {
          var pageData = query.pages[pageId];
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

  }, {
    key: 'getParams',
    value: function getParams() {
      var specialRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var params = {
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

  }, {
    key: 'pushParams',
    value: function pushParams() {
      var pages = $(this.config.select2Input).select2('val') || [],
          escapedPages = pages.join('|').replace(/[&%]/g, escape);

      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, '?' + $.param(this.getParams()) + '&pages=' + escapedPages);
      }

      $('.permalink').prop('href', '?' + $.param(this.getPermaLink()) + '&pages=' + escapedPages);
    }

    /**
     * Sets up the article selector and adds listener to update chart
     * @returns {null} - nothing
     */

  }, {
    key: 'setupSelect2',
    value: function setupSelect2() {
      var _this3 = this;

      var $select2Input = $(this.config.select2Input);

      var params = {
        ajax: this.getArticleSelectorAjax(),
        tags: this.autocomplete === 'no_autocomplete',
        placeholder: $.i18n('article-placeholder'),
        maximumSelectionLength: 10,
        minimumInputLength: 1
      };

      $select2Input.select2(params);
      $select2Input.on('change', this.processInput.bind(this));
      $select2Input.on('select2:open', function (e) {
        if ($(e.target).val() && $(e.target).val().length === 10) {
          $('.select2-search__field').one('keyup', function () {
            var message = $.i18n('massviews-notice', 10, '<strong><a href=\'/massviews/\'>' + $.i18n('massviews') + '</a></strong>');
            _this3.writeMessage(message, 'info', 10000);
          });
        }
      });
    }

    /**
     * Get ajax parameters to be used in setupSelect2, based on this.autocomplete
     * @return {object|null} to be passed in as the value for `ajax` in setupSelect2
     */

  }, {
    key: 'getArticleSelectorAjax',
    value: function getArticleSelectorAjax() {
      var _this4 = this;

      if (this.autocomplete !== 'no_autocomplete') {
        /**
         * This ajax call queries the Mediawiki API for article name
         * suggestions given the search term inputed in the selector.
         * We ultimately want to make the endpoint configurable based on whether they want redirects
         */
        return {
          url: 'https://' + this.project + '.org/w/api.php',
          dataType: 'jsonp',
          delay: 200,
          jsonpCallback: 'articleSuggestionCallback',
          data: function data(search) {
            return _this4.getSearchParams(search.term);
          },
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

  }, {
    key: 'validateProject',
    value: function validateProject() {
      if (_get(PageViews.prototype.__proto__ || Object.getPrototypeOf(PageViews.prototype), 'validateProject', this).call(this)) {
        this.resetView(true);
        this.focusSelect2();
      }
    }

    /**
     * General place to add page-wide listeners
     * @override
     * @returns {null} - nothing
     */

  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      var _this5 = this;

      _get(PageViews.prototype.__proto__ || Object.getPrototypeOf(PageViews.prototype), 'setupListeners', this).call(this);
      $('#platform-select, #agent-select').on('change', this.processInput.bind(this));
      $('.sort-link').on('click', function (e) {
        var sortType = $(e.currentTarget).data('type');
        _this5.direction = _this5.sort === sortType ? -_this5.direction : 1;
        _this5.sort = sortType;
        _this5.updateTable();
      });
    }

    /**
     * Query the API for each page, building up the datasets and then calling renderData
     * @param {boolean} force - whether to force the chart to re-render, even if no params have changed
     * @returns {null} - nothin
     */

  }, {
    key: 'processInput',
    value: function processInput(force) {
      var _this6 = this;

      this.pushParams();

      /** prevent duplicate querying due to conflicting listeners */
      if (!force && location.search === this.params && this.prevChartType === this.chartType) {
        return;
      }

      this.params = location.search;

      var entities = $(config.select2Input).select2('val') || [];

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
        this.getPageViewsData(entities).done(function (xhrData) {
          return _this6.updateChart(xhrData);
        });
        // set back to false so we get page and edit info for any newly entered pages
        this.initialQuery = false;
      } else {
        this.getPageAndEditInfo(entities).then(function () {
          _this6.getPageViewsData(entities).done(function (xhrData) {
            return _this6.updateChart(xhrData);
          });
        });
      }
    }
  }, {
    key: 'updateTable',
    value: function updateTable() {
      var _this7 = this;

      if (this.outputData.length === 1) return $('.table-view').hide();

      $('.output-list').html('');

      /** sort ascending by current sort setting */
      var datasets = this.outputData.sort(function (a, b) {
        var before = _this7.getSortProperty(a, _this7.sort),
            after = _this7.getSortProperty(b, _this7.sort);

        if (before < after) {
          return _this7.direction;
        } else if (before > after) {
          return -_this7.direction;
        } else {
          return 0;
        }
      });

      $('.sort-link span').removeClass('glyphicon-sort-by-alphabet-alt glyphicon-sort-by-alphabet').addClass('glyphicon-sort');
      var newSortClassName = parseInt(this.direction, 10) === 1 ? 'glyphicon-sort-by-alphabet-alt' : 'glyphicon-sort-by-alphabet';
      $('.sort-link--' + this.sort + ' span').addClass(newSortClassName).removeClass('glyphicon-sort');

      var hasProtection = false;
      datasets.forEach(function (item, index) {
        if (item.protection !== $.i18n('none')) hasProtection = true;

        $('.output-list').append('<tr>\n         <td class=\'table-view--color-col\'>\n          <span class=\'table-view--color-block\' style="background:' + item.color + '"></span>\n         </td>\n         <td>' + _this7.getPageLink(item.label) + '</td>\n         <td>' + _this7.formatNumber(item.sum) + '</td>\n         <td>' + _this7.formatNumber(item.average) + '</td>\n         <td>' + _this7.formatNumber(item.num_edits) + '</td>\n         <td>' + _this7.formatNumber(item.num_users) + '</td>\n         <td>' + _this7.formatNumber(item.length) + '</td>\n         <td>' + item.protection + '</td>\n         <td>' + _this7.formatNumber(item.watchers) + '</td>\n         <td>\n          <a href="' + _this7.getLangviewsURL(item.label) + '" target="_blank">' + $.i18n('all-languages') + '</a>\n          &bull;\n          <a href="' + _this7.getRedirectviewsURL(item.label) + '" target="_blank">' + $.i18n('redirects') + '</a>\n         </td>\n         </tr>');
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

  }, {
    key: 'getSortProperty',
    value: function getSortProperty(item, type) {
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

  }, {
    key: 'getPageAndEditInfo',
    value: function getPageAndEditInfo(pages) {
      var _this8 = this;

      var dfd = $.Deferred();

      this.getPageInfo(pages).done(function (data) {
        _this8.entityInfo = data;
        // use Object.keys(data) to get normalized page names
        _this8.getEditData(Object.keys(data)).done(function (editData) {
          for (var page in editData.pages) {
            Object.assign(_this8.entityInfo[page.descore()], editData.pages[page]);
          }
          dfd.resolve(_this8.entityInfo);
        }).fail(function () {
          dfd.resolve(_this8.entityInfo); // treat as if successful, simply won't show the data
        });
      }).fail(function () {
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

  }, {
    key: 'massviewsRedirectWithPagePile',
    value: function massviewsRedirectWithPagePile(pages) {
      var _this9 = this;

      var dfd = $.Deferred();

      $.ajax({
        url: '//tools.wmflabs.org/pagepile/api.php',
        data: {
          action: 'create_pile_with_data',
          wiki: this.dbName(this.project),
          data: pages.join('\n')
        }
      }).success(function (pileData) {
        var params = _this9.getParams();
        delete params.project;
        document.location = '/massviews?overflow=1&' + $.param(params) + '&source=pagepile&target=' + pileData.pile.id;
      }).fail(function () {
        // just grab first 10 pages and throw an error
        _this9.writeMessage($.i18n('auto-pagepile-error', 'PagePile', 10), 'error');
        dfd.resolve(pages.slice(0, 10));
      });

      return dfd;
    }
  }]);

  return PageViews;
}(mix(Pv).with(ChartHelpers));

$(document).ready(function () {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new PageViews();
});

},{"./config":1,"./shared/chart_helpers":3,"./shared/pv":6}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var ChartHelpers = function ChartHelpers(superclass) {
  return function (_superclass) {
    _inherits(_class, _superclass);

    function _class(appConfig) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, appConfig));

      _this.chartObj = null;
      _this.prevChartType = null;
      _this.autoChartType = true; // will become false when they manually change the chart type

      /** ensure we have a valid chart type in localStorage, result of Chart.js 1.0 to 2.0 migration */
      var storedChartType = _this.getFromLocalStorage('pageviews-chart-preference');
      if (!_this.config.linearCharts.includes(storedChartType) && !_this.config.circularCharts.includes(storedChartType)) {
        _this.setLocalStorage('pageviews-chart-preference', _this.config.defaults.chartType());
      }

      // leave if there's no chart configured
      if (!_this.config.chart) return _possibleConstructorReturn(_this);

      /** @type {Boolean} add ability to disable auto-log detection */
      _this.noLogScale = location.search.includes('autolog=false');

      /** copy over app-specific chart templates */
      _this.config.linearCharts.forEach(function (linearChart) {
        _this.config.chartConfig[linearChart].opts.legendTemplate = _this.config.linearLegend;
      });
      _this.config.circularCharts.forEach(function (circularChart) {
        _this.config.chartConfig[circularChart].opts.legendTemplate = _this.config.circularLegend;
      });

      Object.assign(Chart.defaults.global, { animation: false, responsive: true });

      /** changing of chart types */
      $('.modal-chart-type a').on('click', function (e) {
        _this.chartType = $(e.currentTarget).data('type');
        _this.autoChartType = false;

        $('.logarithmic-scale').toggle(_this.isLogarithmicCapable());
        $('.begin-at-zero').toggle(_this.config.linearCharts.includes(_this.chartType));

        if (_this.rememberChart === 'true') {
          _this.setLocalStorage('pageviews-chart-preference', _this.chartType);
        }

        _this.isChartApp() ? _this.updateChart(_this.pageViewsData) : _this.renderData();
      });

      $(_this.config.logarithmicCheckbox).on('click', function () {
        _this.autoLogDetection = 'false';
        _this.isChartApp() ? _this.updateChart(_this.pageViewsData) : _this.renderData();
      });

      /**
       * disabled/enable begin at zero checkbox accordingly,
       * but don't update chart since the log scale value can change pragmatically and not from user input
       */
      $(_this.config.logarithmicCheckbox).on('change', function () {
        $('.begin-at-zero').toggleClass('disabled', _this.checked);
      });

      if (_this.beginAtZero === 'true') {
        $('.begin-at-zero-option').prop('checked', true);
      }

      $('.begin-at-zero-option').on('click', function () {
        _this.isChartApp() ? _this.updateChart(_this.pageViewsData) : _this.renderData();
      });

      /** chart download listeners */
      $('.download-png').on('click', _this.exportPNG.bind(_this));
      $('.print-chart').on('click', _this.printChart.bind(_this));
      return _this;
    }

    /**
     * Set the default chart type or the one from localStorage, based on settings
     * @param {Number} [numDatasets] - number of datasets
     * @returns {null} nothing
     */


    _createClass(_class, [{
      key: 'setInitialChartType',
      value: function setInitialChartType() {
        var numDatasets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

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

    }, {
      key: 'destroyChart',
      value: function destroyChart() {
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

    }, {
      key: 'exportCSV',
      value: function exportCSV() {
        var csvContent = 'data:text/csv;charset=utf-8,Date,';
        var titles = [];
        var dataRows = [];
        var dates = this.getDateHeadings(false);

        // Begin constructing the dataRows array by populating it with the dates
        dates.forEach(function (date, index) {
          dataRows[index] = [date];
        });

        this.chartObj.data.datasets.forEach(function (site) {
          // Build an array of site titles for use in the CSV header
          var siteTitle = '"' + site.label.replace(/"/g, '""') + '"';
          titles.push(siteTitle);

          // Populate the dataRows array with the data for this site
          dates.forEach(function (date, index) {
            dataRows[index].push(site.data[index]);
          });
        });

        // Finish the CSV header
        csvContent = csvContent + titles.join(',') + '\n';

        // Add the rows to the CSV
        dataRows.forEach(function (data) {
          csvContent += data.join(',') + '\n';
        });

        this.downloadData(csvContent, 'csv');
      }

      /**
       * Exports current chart data to JSON format and loads it in a new tab
       * @returns {null} Nothing
       */

    }, {
      key: 'exportJSON',
      value: function exportJSON() {
        var _this2 = this;

        var data = [];

        this.chartObj.data.datasets.forEach(function (page, index) {
          var entry = {
            page: page.label.replace(/"/g, '\"').replace(/'/g, "\'"),
            color: page.strokeColor,
            sum: page.sum,
            daily_average: Math.round(page.sum / _this2.numDaysInRange())
          };

          _this2.getDateHeadings(false).forEach(function (heading, index) {
            entry[heading.replace(/\\/, '')] = page.data[index];
          });

          data.push(entry);
        });

        var jsonContent = 'data:text/json;charset=utf-8,' + JSON.stringify(data);
        this.downloadData(jsonContent, 'json');
      }

      /**
       * Exports current data as PNG image, opening it in a new tab
       * @returns {null} nothing
       */

    }, {
      key: 'exportPNG',
      value: function exportPNG() {
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

    }, {
      key: 'fillInZeros',
      value: function fillInZeros(data, startDate, endDate) {
        var _this3 = this;

        /** Extract the dates that are already in the timeseries */
        var alreadyThere = {};
        data.items.forEach(function (elem) {
          var date = moment(elem.timestamp, _this3.config.timestampFormat);
          alreadyThere[date] = elem;
        });
        data.items = [];

        /** Reconstruct with zeros instead of nulls */
        for (var date = moment(startDate); date <= endDate; date.add(1, 'd')) {
          if (alreadyThere[date]) {
            data.items.push(alreadyThere[date]);
          } else {
            var edgeCase = date.isSame(this.config.maxDate) || date.isSame(moment(this.config.maxDate).subtract(1, 'days'));
            data.items.push(_defineProperty({
              timestamp: date.format(this.config.timestampFormat)
            }, this.isPageviews() ? 'views' : 'devices', edgeCase ? null : 0));
          }
        }

        return data;
      }

      /**
       * Get data formatted for Chart.js and the legend templates
       * @param {Array} datasets - as retrieved by getPageViewsData
       * @returns {object} - ready for chart rendering
       */

    }, {
      key: 'buildChartData',
      value: function buildChartData(datasets) {
        var _this4 = this;

        var labels = $(this.config.select2Input).val();

        /** preserve order of datasets due to async calls */
        return datasets.map(function (dataset, index) {
          /** Build the article's dataset. */
          var values = dataset.map(function (elem) {
            return _this4.isPageviews() ? elem.views : elem.devices;
          }),
              sum = values.reduce(function (a, b) {
            return a + b;
          }),
              average = Math.round(sum / values.length),
              max = Math.max.apply(Math, _toConsumableArray(values)),
              min = Math.min.apply(Math, _toConsumableArray(values)),
              color = _this4.config.colors[index % 10],
              label = labels[index].descore();

          var entityInfo = _this4.entityInfo ? _this4.entityInfo[label] : {};

          dataset = Object.assign({
            label: label,
            data: values,
            value: sum, // duplicated because Chart.js wants a single `value` for circular charts
            sum: sum,
            average: average,
            max: max,
            min: min,
            color: color
          }, _this4.config.chartConfig[_this4.chartType].dataset(color), entityInfo);

          if (_this4.isLogarithmic()) {
            dataset.data = dataset.data.map(function (view) {
              return view || null;
            });
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

    }, {
      key: 'getApiUrl',
      value: function getApiUrl(entity, startDate, endDate) {
        var uriEncodedEntityName = encodeURIComponent(entity);

        if (this.app === 'siteviews') {
          return this.isPageviews() ? 'https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/' + uriEncodedEntityName + ('/' + $(this.config.platformSelector).val() + '/' + $(this.config.agentSelector).val() + '/daily') + ('/' + startDate.format(this.config.timestampFormat) + '/' + endDate.format(this.config.timestampFormat)) : 'https://wikimedia.org/api/rest_v1/metrics/unique-devices/' + uriEncodedEntityName + '/' + $(this.config.platformSelector).val() + '/daily' + ('/' + startDate.format(this.config.timestampFormat) + '/' + endDate.format(this.config.timestampFormat));
        } else {
          return 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' + this.project + ('/' + $(this.config.platformSelector).val() + '/' + $(this.config.agentSelector).val() + '/' + uriEncodedEntityName + '/daily') + ('/' + startDate.format(this.config.timestampFormat) + '/' + endDate.format(this.config.timestampFormat));
        }
      }

      /**
       * Mother function for querying the API and processing data
       * @param  {Array}  entities - list of page names, or projects for Siteviews
       * @return {Deferred} Promise resolving with pageviews data and errors, if present
       */

    }, {
      key: 'getPageViewsData',
      value: function getPageViewsData(entities) {
        var _this5 = this;

        var dfd = $.Deferred(),
            count = 0,
            failureRetries = {},
            totalRequestCount = entities.length,
            failedEntities = [];

        /** @type {Object} everything we need to keep track of for the promises */
        var xhrData = {
          entities: entities,
          labels: [], // Labels (dates) for the x-axis.
          datasets: [], // Data for each article timeseries
          errors: [], // Queue up errors to show after all requests have been made
          fatalErrors: [], // Unrecoverable JavaScript errors
          promises: []
        };

        var makeRequest = function makeRequest(entity, index) {
          var startDate = _this5.daterangepicker.startDate.startOf('day'),
              endDate = _this5.daterangepicker.endDate.startOf('day'),
              url = _this5.getApiUrl(entity, startDate, endDate),
              promise = $.ajax({ url: url, dataType: 'json' });

          xhrData.promises.push(promise);

          promise.done(function (successData) {
            try {
              successData = _this5.fillInZeros(successData, startDate, endDate);

              xhrData.datasets.push(successData.items);

              /** fetch the labels for the x-axis on success if we haven't already */
              if (successData.items && !xhrData.labels.length) {
                xhrData.labels = successData.items.map(function (elem) {
                  return moment(elem.timestamp, _this5.config.timestampFormat).format(_this5.dateFormat);
                });
              }
            } catch (err) {
              return xhrData.fatalErrors.push(err);
            }
          }).fail(function (errorData) {
            /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
            var cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend';

            if (cassandraError) {
              if (failureRetries[entity]) {
                failureRetries[entity]++;
              } else {
                failureRetries[entity] = 1;
              }

              /** maximum of 3 retries */
              if (failureRetries[entity] < 3) {
                totalRequestCount++;
                return _this5.rateLimit(makeRequest, _this5.config.apiThrottle, _this5)(entity, index);
              }
            }

            // remove this article from the list of entities to analyze
            xhrData.entities = xhrData.entities.filter(function (el) {
              return el !== entity;
            });

            if (cassandraError) {
              failedEntities.push(entity);
            } else {
              var link = _this5.app === 'siteviews' ? _this5.getSiteLink(entity) : _this5.getPageLink(entity, _this5.project);
              xhrData.errors.push(link + ': ' + $.i18n('api-error', 'Pageviews API') + ' - ' + errorData.responseJSON.title);
            }
          }).always(function () {
            if (++count === totalRequestCount) {
              _this5.pageViewsData = xhrData;
              dfd.resolve(xhrData);

              if (failedEntities.length) {
                _this5.writeMessage($.i18n('api-error-timeout', '<ul>' + failedEntities.map(function (failedEntity) {
                  return '<li>' + _this5.getPageLink(failedEntity, _this5.project.escape()) + '</li>';
                }).join('') + '</ul>'));
              }
            }
          });
        };

        entities.forEach(function (entity, index) {
          return makeRequest(entity, index);
        });

        return dfd;
      }

      /**
       * Get params needed to create a permanent link of visible data
       * @return {Object} hash of params
       */

    }, {
      key: 'getPermaLink',
      value: function getPermaLink() {
        var params = this.getParams(false);
        delete params.range;
        return params;
      }

      /**
       * Are we currently in logarithmic mode?
       * @returns {Boolean} true or false
       */

    }, {
      key: 'isLogarithmic',
      value: function isLogarithmic() {
        return $(this.config.logarithmicCheckbox).is(':checked') && this.isLogarithmicCapable();
      }

      /**
       * Test if the current chart type supports a logarithmic scale
       * @returns {Boolean} log-friendly or not
       */

    }, {
      key: 'isLogarithmicCapable',
      value: function isLogarithmicCapable() {
        return ['line', 'bar'].includes(this.chartType);
      }

      /**
       * Are we trying to show data on pageviews (as opposed to unique devices)?
       * @return {Boolean} true or false
       */

    }, {
      key: 'isPageviews',
      value: function isPageviews() {
        return this.app === 'pageviews' || $(this.config.dataSourceSelector).val() === 'pageviews';
      }

      /**
       * Are we trying to show data on pageviews (as opposed to unique devices)?
       * @return {Boolean} true or false
       */

    }, {
      key: 'isUniqueDevices',
      value: function isUniqueDevices() {
        return !this.isPageviews();
      }

      /**
       * Print the chart!
       * @returns {null} Nothing
       */

    }, {
      key: 'printChart',
      value: function printChart() {
        var tab = window.open();
        tab.document.write('<img src="' + this.chartObj.toBase64Image() + '" />');
        tab.print();
        tab.close();
      }

      /**
       * Removes chart, messages, and resets site selections
       * @param {boolean} [select2] whether or not to clear the Select2 input
       * @returns {null} nothing
       */

    }, {
      key: 'resetView',
      value: function resetView() {
        var select2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

    }, {
      key: 'setChartPointDetectionRadius',
      value: function setChartPointDetectionRadius() {
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

    }, {
      key: 'shouldBeLogarithmic',
      value: function shouldBeLogarithmic(datasets) {
        var _ref;

        if (!this.isLogarithmicCapable() || this.noLogScale) {
          return false;
        }

        var sets = [];
        // convert NaNs and nulls to zeros
        datasets.forEach(function (dataset) {
          sets.push(dataset.map(function (val) {
            return val || 0;
          }));
        });

        // overall max value
        var maxValue = Math.max.apply(Math, _toConsumableArray((_ref = []).concat.apply(_ref, sets)));

        if (maxValue <= 10) return false;

        var logarithmicNeeded = false;

        sets.forEach(function (set) {
          set.push(maxValue);

          var sum = set.reduce(function (a, b) {
            return a + b;
          }),
              average = sum / set.length;
          var theil = 0;
          set.forEach(function (v) {
            return theil += v ? v * Math.log(v / average) : 0;
          });

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

    }, {
      key: 'setupDateRangeSelector',
      value: function setupDateRangeSelector() {
        var _this6 = this;

        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'setupDateRangeSelector', this).call(this);

        /** prevent duplicate setup since the list view apps also use charts */
        if (!this.isChartApp()) return;

        var dateRangeSelector = $(this.config.dateRangeSelector);

        /** the "Latest N days" links */
        $('.date-latest a').on('click', function (e) {
          _this6.setSpecialRange('latest-' + $(e.target).data('value'));
        });

        dateRangeSelector.on('change', function (e) {
          _this6.setChartPointDetectionRadius();
          _this6.processInput();

          /** clear out specialRange if it doesn't match our input */
          if (_this6.specialRange && _this6.specialRange.value !== e.target.value) {
            _this6.specialRange = null;
          }
        });
      }

      /**
       * Update the chart with data provided by processInput()
       * @param {Object} xhrData - data as constructed by processInput()
       * @returns {null} - nothin
       */

    }, {
      key: 'updateChart',
      value: function updateChart(xhrData) {
        var _this7 = this;

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
          var shouldBeLogarithmic = this.shouldBeLogarithmic(this.outputData.map(function (set) {
            return set.data;
          }));
          $(this.config.logarithmicCheckbox).prop('checked', shouldBeLogarithmic);
          $('.begin-at-zero').toggleClass('disabled', shouldBeLogarithmic);
        }

        var options = Object.assign({ scales: {} }, this.config.chartConfig[this.chartType].opts, this.config.globalChartOpts);

        if (this.isLogarithmic()) {
          options.scales = Object.assign({}, options.scales, {
            yAxes: [{
              type: 'logarithmic',
              ticks: {
                callback: function callback(value, index, arr) {
                  var remain = value / Math.pow(10, Math.floor(Chart.helpers.log10(value)));

                  if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                    return _this7.formatNumber(value);
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
          var context = $(this.config.chart)[0].getContext('2d');

          if (this.config.linearCharts.includes(this.chartType)) {
            var linearData = { labels: xhrData.labels, datasets: this.outputData };

            if (this.chartType === 'radar') {
              options.scale.ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
            } else {
              options.scales.yAxes[0].ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
            }

            this.chartObj = new Chart(context, {
              type: this.chartType,
              data: linearData,
              options: options
            });
          } else {
            this.chartObj = new Chart(context, {
              type: this.chartType,
              data: {
                labels: this.outputData.map(function (d) {
                  return d.label;
                }),
                datasets: [{
                  data: this.outputData.map(function (d) {
                    return d.value;
                  }),
                  backgroundColor: this.outputData.map(function (d) {
                    return d.backgroundColor;
                  }),
                  hoverBackgroundColor: this.outputData.map(function (d) {
                    return d.hoverBackgroundColor;
                  }),
                  averages: this.outputData.map(function (d) {
                    return d.average;
                  })
                }]
              },
              options: options
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

    }, {
      key: 'showErrors',
      value: function showErrors(xhrData) {
        var _this8 = this;

        if (xhrData.fatalErrors.length) {
          this.resetView(true);
          var fatalErrors = xhrData.fatalErrors.unique();
          this.showFatalErrors(fatalErrors);

          return true;
        }

        if (xhrData.errors.length) {
          // if everything failed, reset the view, clearing out space taken up by empty chart
          if (xhrData.entities && (xhrData.errors.length === xhrData.entities.length || !xhrData.entities.length)) {
            this.resetView();
          }

          xhrData.errors.unique().forEach(function (error) {
            return _this8.writeMessage(error);
          });
        }

        return false;
      }
    }]);

    return _class;
  }(superclass);
};

module.exports = ChartHelpers;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Core JavaScript extensions, either to native JS or a library.
 *   Polyfills have their own file [polyfills.js](global.html#polyfills)
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

String.prototype.descore = function () {
  return this.replace(/_/g, ' ');
};
String.prototype.score = function () {
  return this.replace(/ /g, '_');
};
String.prototype.upcase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.escape = function () {
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  return this.replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};

// remove duplicate values from Array
Array.prototype.unique = function () {
  return this.filter(function (value, index, array) {
    return array.indexOf(value) === index;
  });
};

// Improve syntax to emulate mixins in ES6
window.mix = function (superclass) {
  return new MixinBuilder(superclass);
};

var MixinBuilder = function () {
  function MixinBuilder(superclass) {
    _classCallCheck(this, MixinBuilder);

    this.superclass = superclass;
  }

  _createClass(MixinBuilder, [{
    key: 'with',
    value: function _with() {
      for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
      }

      return mixins.reduce(function (c, mixin) {
        return mixin(c);
      }, this.superclass);
    }
  }]);

  return MixinBuilder;
}();

/*
 * HOT PATCH for Chart.js getElementsAtEvent
 * https://github.com/chartjs/Chart.js/issues/2299
 * TODO: remove me when this gets implemented into Charts.js core
 */


if (typeof Chart !== 'undefined') {
  Chart.Controller.prototype.getElementsAtEvent = function (e) {
    var helpers = Chart.helpers;
    var eventPosition = helpers.getRelativePosition(e, this.chart);
    var elementsArray = [];

    var found = function () {
      if (this.data.datasets) {
        for (var i = 0; i < this.data.datasets.length; i++) {
          var key = Object.keys(this.data.datasets[i]._meta)[0];
          for (var j = 0; j < this.data.datasets[i]._meta[key].data.length; j++) {
            /* eslint-disable max-depth */
            if (this.data.datasets[i]._meta[key].data[j].inLabelRange(eventPosition.x, eventPosition.y)) {
              return this.data.datasets[i]._meta[key].data[j];
            }
          }
        }
      }
    }.call(this);

    if (!found) {
      return elementsArray;
    }

    helpers.each(this.data.datasets, function (dataset, dsIndex) {
      var key = Object.keys(dataset._meta)[0];
      elementsArray.push(dataset._meta[key].data[found._index]);
    });

    return elementsArray;
  };
}

$.whenAll = function () {
  var dfd = $.Deferred(),
      counter = 0,
      state = 'resolved',
      promises = new (Function.prototype.bind.apply(Array, [null].concat(Array.prototype.slice.call(arguments))))();

  var resolveOrReject = function resolveOrReject() {
    if (this.state === 'rejected') {
      state = 'rejected';
    }
    counter++;

    if (counter === promises.length) {
      dfd[state === 'rejected' ? 'reject' : 'resolve']();
    }
  };

  $.each(promises, function (_i, promise) {
    promise.always(resolveOrReject);
  });

  return dfd.promise();
};

},{}],5:[function(require,module,exports){
'use strict';

/**
 * @file Polyfills for users who refuse to upgrade their browsers
 *   Most code is adapted from [MDN](https://developer.mozilla.org)
 */

// Array.includes function polyfill
// This is not a full implementation, just a shorthand to indexOf !== -1
if (!Array.prototype.includes) {
  Array.prototype.includes = function (search) {
    return this.indexOf(search) !== -1;
  };
}

// String.includes function polyfill
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// Object.assign
if (typeof Object.assign !== 'function') {
  (function () {
    Object.assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// ChildNode.remove
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    this.parentNode.removeChild(this);
  };
}

// String.startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

// Array.of
if (!Array.of) {
  Array.of = function () {
    return Array.prototype.slice.call(arguments);
  };
}

// Array.find
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value = void 0;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

// Array.fill
if (!Array.prototype.fill) {
  Array.prototype.fill = function (value) {

    // Steps 1-2.
    if (this === null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;

    // Step 11.
    var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  };
}

},{}],6:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file Shared code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views)
 * @author MusikAnimal, Kaldari
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

/** class-less files with global overrides */
require('./core_extensions');
require('./polyfills');

var PvConfig = require('./pv_config');
var siteMap = require('./site_map');
var siteDomains = Object.keys(siteMap).map(function (key) {
  return siteMap[key];
});

/** Pv class, contains code amongst all apps (Pageviews, Topviews, Langviews, Siteviews, Massviews, Redirect Views) */

var Pv = function (_PvConfig) {
  _inherits(Pv, _PvConfig);

  function Pv(appConfig) {
    _classCallCheck(this, Pv);

    /** assign initial class properties */

    var _this = _possibleConstructorReturn(this, (Pv.__proto__ || Object.getPrototypeOf(Pv)).call(this, appConfig));

    var defaults = _this.config.defaults,
        validParams = _this.config.validParams;
    _this.config = Object.assign({}, _this.config, appConfig);
    _this.config.defaults = Object.assign({}, defaults, appConfig.defaults);
    _this.config.validParams = Object.assign({}, validParams, appConfig.validParams);

    _this.colorsStyleEl = undefined;
    _this.storage = {}; // used as fallback when localStorage is not supported

    ['localizeDateFormat', 'numericalFormatting', 'bezierCurve', 'autocomplete', 'autoLogDetection', 'beginAtZero', 'rememberChart'].forEach(function (setting) {
      _this[setting] = _this.getFromLocalStorage('pageviews-settings-' + setting) || _this.config.defaults[setting];
    });
    _this.setupSettingsModal();

    _this.params = null;
    _this.siteInfo = {};

    /** @type {null|Date} tracking of elapsed time */
    _this.processStart = null;

    /** assign app instance to window for debugging on local environment */
    if (location.host === 'localhost') {
      window.app = _this;
    } else {
      _this.splash();
    }

    _this.debug = location.search.includes('debug=true') || location.host === 'localhost';

    /** show notice if on staging environment */
    if (/-test/.test(location.pathname)) {
      var actualPathName = location.pathname.replace(/-test\/?/, '');
      _this.addSiteNotice('warning', 'This is a staging environment. For the actual ' + document.title + ',\n         see <a href=\'' + actualPathName + '\'>' + location.hostname + actualPathName + '</a>');
    }

    /**
     * Load translations then initialize the app.
     * Each app has it's own initialize method.
     * Make sure we load 'en.json' as a fallback
     */
    var messagesToLoad = _defineProperty({}, i18nLang, '/pageviews/messages/' + i18nLang + '.json');
    if (i18nLang !== 'en') {
      messagesToLoad.en = '/pageviews/messages/en.json';
    }
    $.i18n({
      locale: i18nLang
    }).load(messagesToLoad).then(_this.initialize.bind(_this));

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
    return _this;
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


  _createClass(Pv, [{
    key: 'addSiteNotice',
    value: function addSiteNotice(level, message, title, dismissable) {
      title = title ? '<strong>' + title + '</strong> ' : '';

      var markup = title + message;

      this.writeMessage(markup, level, dismissable ? 10000 : 0);
    }

    /**
     * Add site notice for invalid parameter
     * @param {String} param - name of parameter
     * @returns {null} nothing
     */

  }, {
    key: 'addInvalidParamNotice',
    value: function addInvalidParamNotice(param) {
      var docLink = '<a href=\'/' + this.app + '/url_structure\'>' + $.i18n('documentation') + '</a>';
      this.addSiteNotice('error', $.i18n('param-error-3', param, docLink), $.i18n('invalid-params'), true);
    }

    /**
     * Validate the date range of given params
     *   and throw errors as necessary and/or set defaults
     * @param {Object} params - as returned by this.parseQueryString()
     * @returns {Boolean} true if there were no errors, false otherwise
     */

  }, {
    key: 'validateDateRange',
    value: function validateDateRange(params) {
      if (params.range) {
        if (!this.setSpecialRange(params.range)) {
          this.addInvalidParamNotice('range');
          this.setSpecialRange(this.config.defaults.dateRange);
        }
      } else if (params.start) {
        var dateRegex = /\d{4}-\d{2}-\d{2}$/;

        // first set defaults
        var startDate = void 0,
            endDate = void 0;

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
  }, {
    key: 'clearSiteNotices',
    value: function clearSiteNotices() {
      $('.site-notice').html('');
    }
  }, {
    key: 'clearMessages',
    value: function clearMessages() {
      $('.message-container').html('');
    }

    /**
     * Get date format to use based on settings
     * @returns {string} date format to passed to parser
     */

  }, {
    key: 'dbName',


    /**
     * Get the database name of the given projet
     * @param  {String} project - with or without .org
     * @return {String} database name
     */
    value: function dbName(project) {
      return Object.keys(siteMap).find(function (key) {
        return siteMap[key] === project.replace(/\.org$/, '') + '.org';
      });
    }

    /**
     * Force download of given data, or open in a new tab if HTML5 <a> download attribute is not supported
     * @param {String} data - Raw data prepended with data type, e.g. "data:text/csv;charset=utf-8,my data..."
     * @param {String} extension - the file extension to use
     * @returns {null} Nothing
     */

  }, {
    key: 'downloadData',
    value: function downloadData(data, extension) {
      var encodedUri = encodeURI(data);

      // create HTML5 download element and force click so we can specify a filename
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
        document.body.appendChild(link); // Firefox requires the link to be in the body

        var filename = this.getExportFilename() + '.' + extension;
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

  }, {
    key: 'fillInSettings',
    value: function fillInSettings() {
      var _this2 = this;

      $.each($('#settings-modal input'), function (index, el) {
        if (el.type === 'checkbox') {
          el.checked = _this2[el.name] === 'true';
        } else {
          el.checked = _this2[el.name] === el.value;
        }
      });
    }

    /**
     * Add focus to Select2 input field
     * @returns {null} nothing
     */

  }, {
    key: 'focusSelect2',
    value: function focusSelect2() {
      $('.select2-selection').trigger('click');
      $('.select2-search__field').focus();
    }

    /**
     * Format number based on current settings, e.g. localize with comma delimeters
     * @param {number|string} num - number to format
     * @returns {string} formatted number
     */

  }, {
    key: 'formatNumber',
    value: function formatNumber(num) {
      var numericalFormatting = this.getFromLocalStorage('pageviews-settings-numericalFormatting') || this.config.defaults.numericalFormatting;
      if (numericalFormatting === 'true') {
        return this.n(num);
      } else {
        return num;
      }
    }
  }, {
    key: 'formatYAxisNumber',
    value: function formatYAxisNumber(num) {
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

  }, {
    key: 'getDateHeadings',
    value: function getDateHeadings(localized) {
      var dateHeadings = [],
          endDate = moment(this.daterangepicker.endDate).add(1, 'd');

      for (var date = moment(this.daterangepicker.startDate); date.isBefore(endDate); date.add(1, 'd')) {
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

  }, {
    key: 'getExpandedPageURL',
    value: function getExpandedPageURL(page) {
      return '//' + this.project + '.org/w/index.php?title=' + encodeURIComponent(page.score()).replace(/'/, escape);
    }

    /**
     * Get informative filename without extension to be used for export options
     * @return {string} filename without an extension
     */

  }, {
    key: 'getExportFilename',
    value: function getExportFilename() {
      var startDate = this.daterangepicker.startDate.startOf('day').format('YYYYMMDD'),
          endDate = this.daterangepicker.endDate.startOf('day').format('YYYYMMDD');
      return this.app + '-' + startDate + '-' + endDate;
    }

    /**
     * Get a full link for the given page and project
     * @param  {string} page - page to link to
     * @param  {string} [project] - project link, defaults to `this.project`
     * @return {string} HTML markup
     */

  }, {
    key: 'getPageLink',
    value: function getPageLink(page, project) {
      return '<a target="_blank" href="' + this.getPageURL(page, project) + '">' + page.descore().escape() + '</a>';
    }

    /**
     * Get the wiki URL given the page name
     *
     * @param {string} page - page name
     * @returns {string} URL for the page
     */

  }, {
    key: 'getPageURL',
    value: function getPageURL(page) {
      var project = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.project;

      return '//' + project.replace(/\.org$/, '').escape() + '.org/wiki/' + page.score().replace(/'/, escape);
    }

    /**
     * Get the wiki URL given the page name
     *
     * @param {string} site - site name (e.g. en.wikipedia.org)
     * @returns {string} URL for the site
     */

  }, {
    key: 'getSiteLink',
    value: function getSiteLink(site) {
      return '<a target="_blank" href="//' + site + '.org">' + site + '</a>';
    }

    /**
     * Get the project name (without the .org)
     *
     * @returns {boolean} lang.projectname
     */

  }, {
    key: 'getLocaleDateString',
    value: function getLocaleDateString() {
      if (!navigator.language) {
        return this.config.defaults.dateFormat;
      }

      var formats = {
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

      var key = navigator.language.toLowerCase();
      return formats[key] || this.config.defaults.dateFormat;
    }

    /**
     * Get a value from localStorage, using a temporary storage if localStorage is not supported
     * @param {string} key - key for the value to retrieve
     * @returns {Mixed} stored value
     */

  }, {
    key: 'getFromLocalStorage',
    value: function getFromLocalStorage(key) {
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

  }, {
    key: 'getBugReportURL',
    value: function getBugReportURL(phabPaste) {
      var reportURL = 'https://meta.wikimedia.org/w/index.php?title=Talk:Pageviews_Analysis&action=edit' + ('&section=new&preloadtitle=' + this.app.upcase() + ' bug report');

      if (phabPaste) {
        return reportURL + '&preload=Talk:Pageviews_Analysis/Preload&preloadparams[]=' + phabPaste;
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

  }, {
    key: 'fetchSiteInfo',
    value: function fetchSiteInfo(project) {
      var _this3 = this;

      project = project.replace(/\.org$/, '');
      var dfd = $.Deferred(),
          cacheKey = 'pageviews-siteinfo-' + project;

      if (this.siteInfo[project]) return dfd.resolve(this.siteInfo);

      // use cached site info if present
      if (simpleStorage.hasKey(cacheKey)) {
        this.siteInfo[project] = simpleStorage.get(cacheKey);
        dfd.resolve(this.siteInfo);
      } else {
        // otherwise fetch siteinfo and store in cache
        $.ajax({
          url: 'https://' + project + '.org/w/api.php',
          data: {
            action: 'query',
            meta: 'siteinfo',
            siprop: 'general|namespaces',
            format: 'json'
          },
          dataType: 'jsonp'
        }).done(function (data) {
          _this3.siteInfo[project] = data.query;

          // cache for one week (TTL is in milliseconds)
          simpleStorage.set(cacheKey, _this3.siteInfo[project], { TTL: 1000 * 60 * 60 * 24 * 7 });

          dfd.resolve(_this3.siteInfo);
        }).fail(function (data) {
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

  }, {
    key: 'getSiteInfo',
    value: function getSiteInfo(project) {
      return this.siteInfo[project.replace(/\.org$/, '')];
    }

    /**
     * Get user agent, if supported
     * @returns {string} user-agent
     */

  }, {
    key: 'getUserAgent',
    value: function getUserAgent() {
      return navigator.userAgent ? navigator.userAgent : 'Unknown';
    }

    /**
     * Set a value to localStorage, using a temporary storage if localStorage is not supported
     * @param {string} key - key for the value to set
     * @param {Mixed} value - value to store
     * @returns {Mixed} stored value
     */

  }, {
    key: 'setLocalStorage',
    value: function setLocalStorage(key, value) {
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

  }, {
    key: 'hashCode',
    value: function hashCode(str) {
      return str.split('').reduce(function (prevHash, currVal) {
        return (prevHash << 5) - prevHash + currVal.charCodeAt(0);
      }, 0);
    }

    /**
     * Is this one of the chart-view apps (that does not have a list view)?
     * @return {Boolean} true or false
     */

  }, {
    key: 'isChartApp',
    value: function isChartApp() {
      return !this.isListApp();
    }

    /**
     * Is this one of the list-view apps?
     * @return {Boolean} true or false
     */

  }, {
    key: 'isListApp',
    value: function isListApp() {
      return ['langviews', 'massviews', 'redirectviews'].includes(this.app);
    }

    /**
     * Test if the current project is a multilingual project
     * @returns {Boolean} is multilingual or not
     */

  }, {
    key: 'isMultilangProject',
    value: function isMultilangProject() {
      return new RegExp('.*?\\.(' + Pv.multilangProjects.join('|') + ')').test(this.project);
    }

    /**
     * Map normalized pages from API into a string of page names
     * Used in normalizePageNames()
     *
     * @param {array} pages - array of page names
     * @param {array} normalizedPages - array of normalized mappings returned by the API
     * @returns {array} pages with the new normalized names, if given
     */

  }, {
    key: 'mapNormalizedPageNames',
    value: function mapNormalizedPageNames(pages, normalizedPages) {
      normalizedPages.forEach(function (normalPage) {
        /** do it this way to preserve ordering of pages */
        pages = pages.map(function (page) {
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

  }, {
    key: 'massApi',


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
    value: function massApi(params, project) {
      var continueKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'continue';
      var dataKey = arguments[3];
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.config.apiLimit;

      if (!/\.org$/.test(project)) project += '.org';

      var dfd = $.Deferred();
      var resolveData = {
        pages: []
      };

      var makeRequest = function makeRequest(continueValue) {
        var requestData = Object.assign({
          action: 'query',
          format: 'json',
          formatversion: '2'
        }, params);

        if (continueValue) requestData[continueKey] = continueValue;

        var promise = $.ajax({
          url: 'https://' + project + '/w/api.php',
          jsonp: 'callback',
          dataType: 'jsonp',
          data: requestData
        });

        promise.done(function (data) {
          // some failures come back as 200s, so we still resolve and let the local app handle it
          if (data.error) return dfd.resolve(data);

          var isFinished = void 0;

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
            setTimeout(function () {
              makeRequest(data.continue[continueKey]);
            }, 100);
          } else {
            // indicate there were more entries than the limit
            if (data.continue) resolveData.continue = true;
            dfd.resolve(resolveData);
          }
        }).fail(function (data) {
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

  }, {
    key: 'n',
    value: function n(value) {
      return new Number(value).toLocaleString();
    }

    /**
     * Get basic info on given pages, including the normalized page names.
     * E.g. masculine versus feminine namespaces on dewiki
     * @param {array} pages - array of page names
     * @returns {Deferred} promise with data fetched from API
     */

  }, {
    key: 'getPageInfo',
    value: function getPageInfo(pages) {
      var dfd = $.Deferred();

      return $.ajax({
        url: 'https://' + this.project + '.org/w/api.php?action=query&prop=info&inprop=protection|watchers' + ('&formatversion=2&format=json&titles=' + pages.join('|')),
        dataType: 'jsonp'
      }).then(function (data) {
        var pageData = {};
        data.query.pages.forEach(function (page) {
          pageData[page.title] = page;
        });
        return dfd.resolve(pageData);
      });
    }

    /**
     * Compute how many days are in the selected date range
     * @returns {integer} number of days
     */

  }, {
    key: 'numDaysInRange',
    value: function numDaysInRange() {
      return this.daterangepicker.endDate.diff(this.daterangepicker.startDate, 'days') + 1;
    }

    /**
     * Generate key/value pairs of URL query string
     * @param {string} [multiParam] - parameter whose values needs to split by pipe character
     * @returns {Object} key/value pairs representation of query string
     */

  }, {
    key: 'parseQueryString',
    value: function parseQueryString(multiParam) {
      var uri = decodeURI(location.search.slice(1)),
          chunks = uri.split('&');
      var params = {};

      for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i].split('=');

        if (multiParam && chunk[0] === multiParam) {
          params[multiParam] = chunk[1].split('|').filter(function (param) {
            return !!param;
          }).unique();
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

  }, {
    key: 'patchUsage',
    value: function patchUsage(app) {
      if (metaRoot) {
        $.ajax({
          url: '//' + metaRoot + '/usage/' + this.app + '/' + (this.project || i18nLang),
          method: 'PATCH'
        });
      }
    }

    /**
     * Set timestamp of when process started
     * @return {moment} start time
     */

  }, {
    key: 'processStarted',
    value: function processStarted() {
      return this.processStart = moment();
    }

    /**
     * Get elapsed time from this.processStart, and show it
     * @return {moment} Elapsed time from `this.processStart` in milliseconds
     */

  }, {
    key: 'processEnded',
    value: function processEnded() {
      var endTime = moment(),
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

  }, {
    key: 'rateLimit',
    value: function rateLimit(fn, delay, context) {
      var queue = [],
          timer = void 0;

      var processQueue = function processQueue() {
        var item = queue.shift();
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

  }, {
    key: 'resetSelect2',
    value: function resetSelect2() {
      var select2Input = $(this.config.select2Input);
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

  }, {
    key: 'rgba',
    value: function rgba(value, alpha) {
      return value.replace(/,\s*\d\)/, ', ' + alpha + ')');
    }

    /**
     * Save a particular setting to session and localStorage
     *
     * @param {string} key - settings key
     * @param {string|boolean} value - value to save
     * @returns {null} nothing
     */

  }, {
    key: 'saveSetting',
    value: function saveSetting(key, value) {
      this[key] = value;
      this.setLocalStorage('pageviews-settings-' + key, value);
    }

    /**
     * Save the selected settings within the settings modal
     * Prefer this implementation over a large library like serializeObject or serializeJSON
     * @returns {null} nothing
     */

  }, {
    key: 'saveSettings',
    value: function saveSettings() {
      var _this4 = this;

      /** track if we're changing to no_autocomplete mode */
      var wasAutocomplete = this.autocomplete === 'no_autocomplete';

      $.each($('#settings-modal input'), function (index, el) {
        if (el.type === 'checkbox') {
          _this4.saveSetting(el.name, el.checked ? 'true' : 'false');
        } else if (el.checked) {
          _this4.saveSetting(el.name, el.value);
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

  }, {
    key: 'setSelect2Defaults',
    value: function setSelect2Defaults(items) {
      var _this5 = this;

      items.forEach(function (item) {
        var escapedText = $('<div>').text(item).html();
        $('<option>' + escapedText + '</option>').appendTo(_this5.config.select2Input);
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

  }, {
    key: 'setSpecialRange',
    value: function setSpecialRange(type) {
      var rangeIndex = Object.keys(this.config.specialRanges).indexOf(type);
      var startDate = void 0,
          endDate = void 0;

      if (type.includes('latest-')) {
        var offset = parseInt(type.replace('latest-', ''), 10) || 20; // fallback of 20

        var _config$specialRanges = this.config.specialRanges.latest(offset);

        var _config$specialRanges2 = _slicedToArray(_config$specialRanges, 2);

        startDate = _config$specialRanges2[0];
        endDate = _config$specialRanges2[1];
      } else if (rangeIndex >= 0) {
        var _ref = type === 'latest' ? this.config.specialRanges.latest() : this.config.specialRanges[type];
        /** treat 'latest' as a function */


        var _ref2 = _slicedToArray(_ref, 2);

        startDate = _ref2[0];
        endDate = _ref2[1];

        $('.daterangepicker .ranges li').eq(rangeIndex).trigger('click');
      } else {
        return;
      }

      this.specialRange = {
        range: type,
        value: startDate.format(this.dateFormat) + ' - ' + endDate.format(this.dateFormat)
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

  }, {
    key: 'setupSelect2Colors',
    value: function setupSelect2Colors() {
      var _this6 = this;

      /** first delete old stylesheet, if present */
      if (this.colorsStyleEl) this.colorsStyleEl.remove();

      /** create new stylesheet */
      this.colorsStyleEl = document.createElement('style');
      this.colorsStyleEl.appendChild(document.createTextNode('')); // WebKit hack :(
      document.head.appendChild(this.colorsStyleEl);

      /** add color rules */
      this.config.colors.forEach(function (color, index) {
        _this6.colorsStyleEl.sheet.insertRule('.select2-selection__choice:nth-of-type(' + (index + 1) + ') { background: ' + color + ' !important }', 0);
      });

      return this.colorsStyleEl.sheet;
    }

    /**
     * Cross-application listeners
     * Each app has it's own setupListeners() that should call super.setupListeners()
     * @return {null} nothing
     */

  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      var _this7 = this;

      /** prevent browser's default behaviour for any link with href="#" */
      $("a[href='#']").on('click', function (e) {
        return e.preventDefault();
      });

      /** download listeners */
      $('.download-csv').on('click', this.exportCSV.bind(this));
      $('.download-json').on('click', this.exportJSON.bind(this));

      /** project input listeners, saving and restoring old value if new one is invalid */
      $(this.config.projectInput).on('focusin', function () {
        this.dataset.value = this.value;
      });
      $(this.config.projectInput).on('change', function (e) {
        return _this7.validateProject(e);
      });
    }

    /**
     * Set values of form based on localStorage or defaults, add listeners
     * @returns {null} nothing
     */

  }, {
    key: 'setupSettingsModal',
    value: function setupSettingsModal() {
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

  }, {
    key: 'setupDateRangeSelector',
    value: function setupDateRangeSelector() {
      var _this8 = this;

      var dateRangeSelector = $(this.config.dateRangeSelector);

      /**
       * Transform this.config.specialRanges to have i18n as keys
       * This is what is shown as the special ranges (Last month, etc.) in the datepicker menu
       * @type {Object}
       */
      var ranges = {};
      Object.keys(this.config.specialRanges).forEach(function (key) {
        if (key === 'latest') return; // this is a function, not meant to be in the list of special ranges
        ranges[$.i18n(key)] = _this8.config.specialRanges[key];
      });

      var datepickerOptions = {
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
      $('.daterangepicker').append($('<div>').addClass('daterange-notice').html($.i18n('date-notice', document.title, "<a href='http://stats.grok.se' target='_blank'>stats.grok.se</a>", $.i18n('july') + ' 2015')));

      /**
       * The special date range options (buttons the right side of the daterange picker)
       *
       * WARNING: we're unable to add class names or data attrs to the range options,
       * so checking which was clicked is hardcoded based on the index of the LI,
       * as defined in this.config.specialRanges
       */
      $('.daterangepicker .ranges li').on('click', function (e) {
        var index = $('.daterangepicker .ranges li').index(e.target),
            container = _this8.daterangepicker.container,
            inputs = container.find('.daterangepicker_input input');
        _this8.specialRange = {
          range: Object.keys(_this8.config.specialRanges)[index],
          value: inputs[0].value + ' - ' + inputs[1].value
        };
      });

      $(this.config.dateRangeSelector).on('apply.daterangepicker', function (e, action) {
        if (action.chosenLabel === $.i18n('custom-range')) {
          _this8.specialRange = null;

          /** force events to re-fire since apply.daterangepicker occurs before 'change' event */
          _this8.daterangepicker.updateElement();
        }
      });
    }
  }, {
    key: 'showFatalErrors',
    value: function showFatalErrors(errors) {
      var _this9 = this;

      this.clearMessages();
      errors.forEach(function (error) {
        _this9.writeMessage('<strong>' + $.i18n('fatal-error') + '</strong>: <code>' + error + '</code>', 'error');
      });

      if (this.debug) {
        throw errors[0];
      } else if (errors && errors[0] && errors[0].stack) {
        $.ajax({
          method: 'POST',
          url: '//tools.wmflabs.org/musikanimal/paste',
          data: {
            content: '' + ('\ndate:      ' + moment().utc().format()) + ('\ntool:      ' + this.app) + ('\nlanguage:  ' + i18nLang) + ('\nchart:     ' + this.chartType) + ('\nurl:       ' + document.location.href) + ('\nuserAgent: ' + this.getUserAgent()) + ('\ntrace:     ' + errors[0].stack),

            title: 'Pageviews Analysis error report: ' + errors[0]
          }
        }).done(function (data) {
          if (data && data.result && data.result.objectName) {
            _this9.writeMessage($.i18n('error-please-report', _this9.getBugReportURL(data.result.objectName)), 'error');
          } else {
            _this9.writeMessage($.i18n('error-please-report', _this9.getBugReportURL()), 'error');
          }
        }).fail(function () {
          _this9.writeMessage($.i18n('error-please-report', _this9.getBugReportURL()), 'error');
        });
      }
    }

    /**
     * Splash in console, just for fun
     * @returns {String} output
     */

  }, {
    key: 'splash',
    value: function splash() {
      var style = 'background: #eee; color: #555; padding: 4px; font-family:monospace';
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
      console.log('%c  Copyright © ' + new Date().getFullYear() + ' MusikAnimal, Kaldari, Marcel Ruiz Forns                  ', style);
    }

    /**
     * Add the loading indicator class and set the safeguard timeout
     * @returns {null} nothing
     */

  }, {
    key: 'startSpinny',
    value: function startSpinny() {
      var _this10 = this;

      $('.chart-container').addClass('loading');
      clearTimeout(this.timeout);

      this.timeout = setTimeout(function (err) {
        _this10.resetView();
        _this10.writeMessage('<strong>' + $.i18n('fatal-error') + '</strong>:\n        ' + $.i18n('error-timed-out') + '\n        ' + $.i18n('error-please-report', _this10.getBugReportURL()) + '\n      ', 'error', 0);
      }, 20 * 1000);
    }

    /**
     * Remove loading indicator class and clear the safeguard timeout
     * @returns {null} nothing
     */

  }, {
    key: 'stopSpinny',
    value: function stopSpinny() {
      $('.chart-container').removeClass('loading');
      clearTimeout(this.timeout);
    }

    /**
     * Replace spaces with underscores
     *
     * @param {array} pages - array of page names
     * @returns {array} page names with underscores
     */

  }, {
    key: 'underscorePageNames',
    value: function underscorePageNames(pages) {
      return pages.map(function (page) {
        return decodeURIComponent(page).score();
      });
    }

    /**
     * Update hrefs of inter-app links to load currently selected project
     * @return {null} nuttin'
     */

  }, {
    key: 'updateInterAppLinks',
    value: function updateInterAppLinks() {
      var _this11 = this;

      $('.interapp-link').each(function (i, link) {
        var url = link.href.split('?')[0];

        if (link.classList.contains('interapp-link--siteviews')) {
          link.href = url + '?sites=' + _this11.project.escape() + '.org';
        } else {
          link.href = url + '?project=' + _this11.project.escape() + '.org';
        }
      });
    }

    /**
     * Validate basic params against what is defined in the config,
     *   and if they are invalid set the default
     * @param {Object} params - params as fetched by this.parseQueryString()
     * @returns {Object} same params with some invalid parameters correted, as necessary
     */

  }, {
    key: 'validateParams',
    value: function validateParams(params) {
      var _this12 = this;

      this.config.validateParams.forEach(function (paramKey) {
        if (paramKey === 'project' && params.project) {
          params.project = params.project.replace(/^www\./, '');
        }

        var defaultValue = _this12.config.defaults[paramKey],
            paramValue = params[paramKey];

        if (defaultValue && !_this12.config.validParams[paramKey].includes(paramValue)) {
          // only throw error if they tried to provide an invalid value
          if (!!paramValue) {
            _this12.addInvalidParamNotice(paramKey);
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

  }, {
    key: 'validateProject',
    value: function validateProject() {
      var multilingual = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var projectInput = $(this.config.projectInput)[0];
      var project = projectInput.value.replace(/^www\./, ''),
          valid = false;

      if (multilingual && !this.isMultilangProject()) {
        this.writeMessage($.i18n('invalid-lang-project', '<a href=\'//' + project.escape() + '\'>' + project.escape() + '</a>'), 'warning');
        project = projectInput.dataset.value;
      } else if (siteDomains.includes(project)) {
        this.clearMessages();
        this.updateInterAppLinks();
        valid = true;
      } else {
        this.writeMessage($.i18n('invalid-project', '<a href=\'//' + project.escape() + '\'>' + project.escape() + '</a>'), 'warning');
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

  }, {
    key: 'writeMessage',
    value: function writeMessage(message) {
      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warning';
      var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

      toastr.options.timeOut = timeout;
      toastr[level](message);
    }
  }, {
    key: 'dateFormat',
    get: function get() {
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

  }, {
    key: 'daterangepicker',
    get: function get() {
      return $(this.config.dateRangeSelector).data('daterangepicker');
    }
  }, {
    key: 'project',
    get: function get() {
      var project = $(this.config.projectInput).val();
      /** Get the first 2 characters from the project code to get the language */
      return project ? project.toLowerCase().replace(/.org$/, '') : null;
    }
  }], [{
    key: 'multilangProjects',
    get: function get() {
      return ['wikipedia', 'wikibooks', 'wikinews', 'wikiquote', 'wikisource', 'wikiversity', 'wikivoyage'];
    }
  }]);

  return Pv;
}(PvConfig);

module.exports = Pv;

},{"./core_extensions":4,"./polyfills":5,"./pv_config":7,"./site_map":8}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Shared config amongst all apps
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

var siteMap = require('./site_map');
var siteDomains = Object.keys(siteMap).map(function (key) {
  return siteMap[key];
});

/**
 * Configuration for all Pageviews applications.
 * Some properties may be overriden by app-specific configs
 */

var PvConfig = function () {
  function PvConfig() {
    var _this = this;

    _classCallCheck(this, PvConfig);

    var self = this;
    var formatXAxisTick = function formatXAxisTick(value) {
      var dayOfWeek = moment(value, _this.dateFormat).weekday();
      if (dayOfWeek % 7) {
        return value;
      } else {
        return '• ' + value;
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
                  callback: function callback(value) {
                    return _this.formatYAxisNumber(value);
                  }
                }
              }],
              xAxes: [{
                ticks: {
                  callback: function callback(value) {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.linearTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
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
                  callback: function callback(value) {
                    return _this.formatYAxisNumber(value);
                  }
                }
              }],
              xAxes: [{
                barPercentage: 1.0,
                categoryPercentage: 0.85,
                ticks: {
                  callback: function callback(value) {
                    return formatXAxisTick(value);
                  }
                }
              }]
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.linearTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
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
                callback: function callback(value) {
                  return _this.formatNumber(value);
                }
              }
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.linearTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
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
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.circularTooltips
          },
          dataset: function dataset(color) {
            return {
              color: color,
              backgroundColor: color,
              hoverBackgroundColor: self.rgba(color, 0.8)
            };
          }
        },
        doughnut: {
          opts: {
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.circularTooltips
          },
          dataset: function dataset(color) {
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
                callback: function callback(value) {
                  return _this.formatNumber(value);
                }
              }
            },
            legendCallback: function legendCallback(chart) {
              return _this.config.chartLegend(self);
            },
            tooltips: this.circularTooltips
          },
          dataset: function dataset(color) {
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
        chartType: function chartType(numDatasets) {
          return numDatasets > 1 ? 'line' : 'bar';
        },
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
              callback: function callback(value) {
                return _this.formatNumber(value);
              }
            }
          }]
        },
        legendCallback: function legendCallback(chart) {
          return _this.config.chartLegend(chart.data.datasets, self);
        }
      },
      daysAgo: 20,
      minDate: moment('2015-07-01').startOf('day'),
      maxDate: moment().subtract(1, 'days').startOf('day'),
      specialRanges: {
        'last-week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
        'this-month': [moment().startOf('month'), moment().subtract(1, 'days').startOf('day')],
        'last-month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        latest: function latest() {
          var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.config.daysAgo;

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

  _createClass(PvConfig, [{
    key: 'linearTooltips',
    get: function get() {
      var _this2 = this;

      return {
        mode: 'label',
        callbacks: {
          label: function label(tooltipItem) {
            if (Number.isNaN(tooltipItem.yLabel)) {
              return ' ' + $.i18n('unknown');
            } else {
              return ' ' + _this2.formatNumber(tooltipItem.yLabel);
            }
          }
        },
        bodyFontSize: 14,
        bodySpacing: 7,
        caretSize: 0,
        titleFontSize: 14
      };
    }
  }, {
    key: 'circularTooltips',
    get: function get() {
      var _this3 = this;

      return {
        callbacks: {
          label: function label(tooltipItem, chartInstance) {
            var value = chartInstance.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                label = chartInstance.labels[tooltipItem.index];

            if (Number.isNaN(value)) {
              return label + ': ' + $.i18n('unknown');
            } else {
              return label + ': ' + _this3.formatNumber(value);
            }
          }
        },
        bodyFontSize: 14,
        bodySpacing: 7,
        caretSize: 0,
        titleFontSize: 14
      };
    }
  }]);

  return PvConfig;
}();

module.exports = PvConfig;

},{"./site_map":8}],8:[function(require,module,exports){
'use strict';

/**
 * @file WMF [site matrix](https://www.mediawiki.org/w/api.php?action=sitematrix), with some unsupported wikis removed
 */

/**
 * Sitematrix of all supported WMF wikis
 * @type {Object}
 */
var siteMap = {
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

},{}],9:[function(require,module,exports){
'use strict';

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
var templates = {
  chartLegend: function chartLegend(scope) {
    var dataList = function dataList(entity) {
      var multiEntity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var editsLink = void 0;

      if (multiEntity) {
        editsLink = scope.formatNumber(entity.num_edits);
      } else {
        editsLink = '<a href="' + scope.getExpandedPageURL(entity.label) + '&action=history" target="_blank" class="pull-right">\n            ' + scope.formatNumber(entity.num_edits) + '\n          </a>';
      }

      var infoHash = {
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

      var markup = '';

      for (var block in infoHash) {
        markup += '<div class=\'legend-block\'><h5>' + block + '</h5><hr/>';
        for (var key in infoHash[block]) {
          var value = infoHash[block][key];
          if (!value) continue;
          markup += '\n            <div class="linear-legend--counts">\n              ' + key + ':\n              <span class=\'pull-right\'>\n                ' + value + '\n              </span>\n            </div>';
        }
        markup += '</div>';
      }

      if (!multiEntity) {
        markup += '\n          <div class="linear-legend--links">\n            <a href="' + scope.getLangviewsURL(entity.label) + '" target="_blank">' + $.i18n('all-languages') + '</a>\n            &bullet;\n            <a href="' + scope.getRedirectviewsURL(entity.label) + '" target="_blank">' + $.i18n('redirects') + '</a>\n          </div>';
      }

      return markup;
    };

    // map out edit protection level for each entity
    var entities = scope.outputData.map(function (entity) {
      var protection = (entity.protection || []).find(function (prot) {
        return prot.type === 'edit';
      });
      entity.protection = protection ? protection.level : $.i18n('none').toLowerCase();
      return entity;
    });

    if (scope.outputData.length === 1) {
      return dataList(entities[0]);
    }

    var sum = entities.reduce(function (a, b) {
      return a + b.sum;
    }, 0);
    var totals = {
      sum: sum,
      average: Math.round(sum / entities.length),
      num_edits: entities.reduce(function (a, b) {
        return a + b.num_edits;
      }, 0),
      num_users: entities.reduce(function (a, b) {
        return a + b.num_users;
      }, 0),
      watchers: entities.reduce(function (a, b) {
        return a + b.watchers || 0;
      }, 0)
    };

    return dataList(totals, true);
  }
};

module.exports = templates;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9wYWdldmlld3MuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvY2hhcnRfaGVscGVycy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9jb3JlX2V4dGVuc2lvbnMuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvcG9seWZpbGxzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2LmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2X2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9zaXRlX21hcC5qcyIsImphdmFzY3JpcHRzL3RlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDTUEsSUFBTSxZQUFZLFFBQVEsYUFBUixDQUFsQjs7Ozs7OztBQU9BLElBQU0sU0FBUztBQUNiLGlCQUFlLGVBREY7QUFFYixTQUFPLFlBRk07QUFHYixlQUFhLFVBQVUsV0FIVjtBQUliLHFCQUFtQiwwQkFKTjtBQUtiLFlBQVU7QUFDUixlQUFXO0FBREgsR0FMRztBQVFiLHVCQUFxQiwyQkFSUjtBQVNiLG9CQUFrQixrQkFUTDtBQVViLGdCQUFjLG9CQVZEO0FBV2IsZ0JBQWMsdUJBWEQ7QUFZYixrQkFBZ0IsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixPQUF4QjtBQVpILENBQWY7O0FBZUEsT0FBTyxPQUFQLEdBQWlCLE1BQWpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQSxJQUFNLFNBQVMsUUFBUSxVQUFSLENBQWY7QUFDQSxJQUFNLEtBQUssUUFBUSxhQUFSLENBQVg7QUFDQSxJQUFNLGVBQWUsUUFBUSx3QkFBUixDQUFyQjs7OztJQUdNLFM7OztBQUNKLHVCQUFjO0FBQUE7O0FBQUEsc0hBQ04sTUFETTs7QUFFWixVQUFLLEdBQUwsR0FBVyxXQUFYOztBQUVBLFVBQUssVUFBTCxHQUFrQixLQUFs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aEJLO0FBaUJkLGlCQUFTLFlBakJLO0FBa0JkLGlCQUFTLFVBbEJLO0FBbUJkLGlCQUFTLFlBbkJLO0FBb0JkLGlCQUFTLFlBcEJLO0FBcUJkLGlCQUFTLFVBckJLO0FBc0JkLGlCQUFTLFlBdEJLO0FBdUJkLGlCQUFTLFlBdkJLO0FBd0JkLGlCQUFTLFVBeEJLO0FBeUJkLGlCQUFTLFlBekJLO0FBMEJkLGlCQUFTLFlBMUJLO0FBMkJkLGlCQUFTLFlBM0JLO0FBNEJkLGlCQUFTLFVBNUJLO0FBNkJkLGlCQUFTLFlBN0JLO0FBOEJkLGlCQUFTLFlBOUJLO0FBK0JkLGlCQUFTLFlBL0JLO0FBZ0NkLGlCQUFTLFlBaENLO0FBaUNkLGlCQUFTLFlBakNLO0FBa0NkLGlCQUFTLFVBbENLO0FBbUNkLGlCQUFTLFdBbkNLO0FBb0NkLGlCQUFTLGFBcENLO0FBcUNkLGlCQUFTLFlBckNLO0FBc0NkLGlCQUFTLFlBdENLO0FBdUNkLGlCQUFTLFlBdkNLO0FBd0NkLGlCQUFTLFlBeENLO0FBeUNkLHNCQUFjLFlBekNBO0FBMENkLGlCQUFTLFlBMUNLO0FBMkNkLGlCQUFTLFlBM0NLO0FBNENkLGlCQUFTLFlBNUNLO0FBNkNkLGlCQUFTLFlBN0NLO0FBOENkLGlCQUFTLFlBOUNLO0FBK0NkLGlCQUFTLFlBL0NLO0FBZ0RkLGlCQUFTLFlBaERLO0FBaURkLGlCQUFTLFlBakRLO0FBa0RkLGlCQUFTLFVBbERLO0FBbURkLGlCQUFTLFVBbkRLO0FBb0RkLHNCQUFjLFlBcERBO0FBcURkLGlCQUFTLFlBckRLO0FBc0RkLGlCQUFTLFVBdERLO0FBdURkLGlCQUFTLFVBdkRLO0FBd0RkLGlCQUFTLFlBeERLO0FBeURkLGlCQUFTLFVBekRLO0FBMERkLGlCQUFTLFVBMURLO0FBMkRkLGlCQUFTLFlBM0RLO0FBNERkLGlCQUFTLFlBNURLO0FBNkRkLGlCQUFTLFVBN0RLO0FBOERkLGlCQUFTLFVBOURLO0FBK0RkLGtCQUFVLFlBL0RJO0FBZ0VkLGtCQUFVLFlBaEVJO0FBaUVkLGlCQUFTLFVBakVLO0FBa0VkLGlCQUFTLFlBbEVLO0FBbUVkLGlCQUFTLFVBbkVLO0FBb0VkLGlCQUFTLFlBcEVLO0FBcUVkLGlCQUFTLFlBckVLO0FBc0VkLGlCQUFTLFlBdEVLO0FBdUVkLGlCQUFTLFdBdkVLO0FBd0VkLGlCQUFTLFlBeEVLO0FBeUVkLGlCQUFTLFdBekVLO0FBMEVkLGlCQUFTLFlBMUVLO0FBMkVkLGlCQUFTLFlBM0VLO0FBNEVkLHNCQUFjLFVBNUVBO0FBNkVkLGlCQUFTLFVBN0VLO0FBOEVkLHNCQUFjLFlBOUVBO0FBK0VkLGlCQUFTLFlBL0VLO0FBZ0ZkLHNCQUFjLFlBaEZBO0FBaUZkLGlCQUFTLFlBakZLO0FBa0ZkLGlCQUFTLFVBbEZLO0FBbUZkLGlCQUFTLFlBbkZLO0FBb0ZkLGlCQUFTLFdBcEZLO0FBcUZkLGlCQUFTLFlBckZLO0FBc0ZkLGlCQUFTLFlBdEZLO0FBdUZkLHNCQUFjLFVBdkZBO0FBd0ZkLGlCQUFTLFlBeEZLO0FBeUZkLGlCQUFTLFVBekZLO0FBMEZkLGlCQUFTLFlBMUZLO0FBMkZkLGlCQUFTLFlBM0ZLO0FBNEZkLGlCQUFTLFlBNUZLO0FBNkZkLGlCQUFTLFlBN0ZLO0FBOEZkLGlCQUFTLFlBOUZLO0FBK0ZkLGlCQUFTLFVBL0ZLO0FBZ0dkLGlCQUFTLFlBaEdLO0FBaUdkLGlCQUFTLFdBakdLO0FBa0dkLGlCQUFTLFlBbEdLO0FBbUdkLGlCQUFTLFlBbkdLO0FBb0dkLGlCQUFTLFlBcEdLO0FBcUdkLGlCQUFTLFlBckdLO0FBc0dkLGlCQUFTLFlBdEdLO0FBdUdkLGlCQUFTLFlBdkdLO0FBd0dkLGlCQUFTLFlBeEdLO0FBeUdkLGlCQUFTLFlBekdLO0FBMEdkLGlCQUFTLFlBMUdLO0FBMkdkLGlCQUFTLFlBM0dLO0FBNEdkLGlCQUFTLFlBNUdLO0FBNkdkLGlCQUFTLFlBN0dLO0FBOEdkLGlCQUFTLFlBOUdLO0FBK0dkLGtCQUFVLFlBL0dJO0FBZ0hkLGlCQUFTLFlBaEhLO0FBaUhkLGlCQUFTLFlBakhLO0FBa0hkLGlCQUFTLFlBbEhLO0FBbUhkLGlCQUFTLFlBbkhLO0FBb0hkLGlCQUFTLFlBcEhLO0FBcUhkLGlCQUFTLFlBckhLO0FBc0hkLGlCQUFTLFlBdEhLO0FBdUhkLGlCQUFTLFlBdkhLO0FBd0hkLGlCQUFTLFVBeEhLO0FBeUhkLGlCQUFTLFlBekhLO0FBMEhkLGlCQUFTLFlBMUhLO0FBMkhkLGlCQUFTLFVBM0hLO0FBNEhkLGlCQUFTLFlBNUhLO0FBNkhkLGlCQUFTLFlBN0hLO0FBOEhkLGlCQUFTLFlBOUhLO0FBK0hkLGlCQUFTLFlBL0hLO0FBZ0lkLGlCQUFTLFlBaElLO0FBaUlkLGlCQUFTLFlBaklLO0FBa0lkLGlCQUFTLFlBbElLO0FBbUlkLGlCQUFTLFlBbklLO0FBb0lkLGlCQUFTLFlBcElLO0FBcUlkLGlCQUFTLFlBcklLO0FBc0lkLGlCQUFTLFlBdElLO0FBdUlkLGlCQUFTLFVBdklLO0FBd0lkLHVCQUFlLFlBeElEO0FBeUlkLHNCQUFjLFdBeklBO0FBMElkLGtCQUFVLFlBMUlJO0FBMklkLHNCQUFjLFVBM0lBO0FBNElkLGlCQUFTLFlBNUlLO0FBNklkLGlCQUFTLFVBN0lLO0FBOElkLGtCQUFVLFVBOUlJO0FBK0lkLGlCQUFTLFVBL0lLO0FBZ0pkLGlCQUFTLFlBaEpLO0FBaUpkLGlCQUFTLFVBakpLO0FBa0pkLGtCQUFVLFlBbEpJO0FBbUpkLGtCQUFVLFlBbkpJO0FBb0pkLGtCQUFVLFlBcEpJO0FBcUpkLGlCQUFTLFlBckpLO0FBc0pkLGlCQUFTLFlBdEpLO0FBdUpkLGlCQUFTLFlBdkpLO0FBd0pkLGlCQUFTLFlBeEpLO0FBeUpkLGlCQUFTLFlBekpLO0FBMEpkLGlCQUFTLFlBMUpLO0FBMkpkLGtCQUFVLFVBM0pJO0FBNEpkLGtCQUFVLFVBNUpJO0FBNkpkLGtCQUFVLFlBN0pJO0FBOEpkLGlCQUFTLFVBOUpLO0FBK0pkLGtCQUFVLFlBL0pJO0FBZ0tkLGlCQUFTLFVBaEtLO0FBaUtkLGlCQUFTLFlBaktLO0FBa0tkLGlCQUFTLFlBbEtLO0FBbUtkLGlCQUFTLFVBbktLO0FBb0tkLGtCQUFVLFlBcEtJO0FBcUtkLGtCQUFVLFlBcktJO0FBc0tkLGlCQUFTLFVBdEtLO0FBdUtkLHNCQUFjLFVBdktBO0FBd0tkLGtCQUFVLFVBeEtJO0FBeUtkLGlCQUFTLFVBektLO0FBMEtkLGlCQUFTLFVBMUtLO0FBMktkLGlCQUFTLFVBM0tLO0FBNEtkLGlCQUFTLFlBNUtLO0FBNktkLHNCQUFjLFVBN0tBO0FBOEtkLHNCQUFjLFVBOUtBO0FBK0tkLGlCQUFTLFlBL0tLO0FBZ0xkLHNCQUFjLFVBaExBO0FBaUxkLGlCQUFTLFlBakxLO0FBa0xkLGlCQUFTLFlBbExLO0FBbUxkLGlCQUFTLFlBbkxLO0FBb0xkLGlCQUFTLFVBcExLO0FBcUxkLGtCQUFVLFVBckxJO0FBc0xkLGlCQUFTLFlBdExLO0FBdUxkLGlCQUFTLFVBdkxLO0FBd0xkLGlCQUFTLFlBeExLO0FBeUxkLGlCQUFTLFVBekxLO0FBMExkLGlCQUFTLFVBMUxLO0FBMkxkLGlCQUFTLFVBM0xLO0FBNExkLHNCQUFjLFVBNUxBO0FBNkxkLGlCQUFTLFlBN0xLO0FBOExkLHNCQUFjLFVBOUxBO0FBK0xkLGlCQUFTLFVBL0xLO0FBZ01kLGlCQUFTLFlBaE1LO0FBaU1kLGlCQUFTLFlBak1LO0FBa01kLGlCQUFTLFlBbE1LO0FBbU1kLGtCQUFVLFlBbk1JO0FBb01kLHNCQUFjLFVBcE1BO0FBcU1kLHNCQUFjLFVBck1BO0FBc01kLHNCQUFjLFVBdE1BO0FBdU1kLGtCQUFVLFlBdk1JO0FBd01kLGlCQUFTLFlBeE1LO0FBeU1kLGtCQUFVLFlBek1JO0FBME1kLGtCQUFVLFlBMU1JO0FBMk1kLGtCQUFVLFlBM01JO0FBNE1kLGlCQUFTLFdBNU1LO0FBNk1kLHNCQUFjLFVBN01BO0FBOE1kLGtCQUFVLFlBOU1JO0FBK01kLGlCQUFTLFVBL01LO0FBZ05kLGlCQUFTLFVBaE5LO0FBaU5kLHNCQUFjLFVBak5BO0FBa05kLGlCQUFTO0FBbE5LLE9BQWhCOztBQXFOQSxVQUFNLE1BQU0sVUFBVSxRQUFWLENBQW1CLFdBQW5CLEVBQVo7QUFDQSxhQUFPLFFBQVEsR0FBUixLQUFnQixLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFVBQTVDO0FBQ0Q7Ozs7Ozs7Ozs7d0NBT21CLEcsRUFBSzs7QUFFdkIsVUFBSTtBQUNGLGVBQU8sYUFBYSxPQUFiLENBQXFCLEdBQXJCLENBQVA7QUFDRCxPQUZELENBRUUsT0FBTyxHQUFQLEVBQVk7QUFDWixlQUFPLFFBQVEsR0FBUixDQUFQO0FBQ0Q7QUFDRjs7Ozs7Ozs7OztvQ0FPZSxTLEVBQVc7QUFDekIsVUFBTSxZQUFZLHFIQUNhLEtBQUssR0FBTCxDQUFTLE1BQVQsRUFEYixpQkFBbEI7O0FBR0EsVUFBSSxTQUFKLEVBQWU7QUFDYixlQUFVLFNBQVYsaUVBQStFLFNBQS9FO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxTQUFQO0FBQ0Q7QUFDRjs7Ozs7Ozs7Ozs7O2tDQVNhLE8sRUFBUztBQUFBOztBQUNyQixnQkFBVSxRQUFRLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEIsRUFBMUIsQ0FBVjtBQUNBLFVBQU0sTUFBTSxFQUFFLFFBQUYsRUFBWjtVQUNFLG1DQUFpQyxPQURuQzs7QUFHQSxVQUFJLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBSixFQUE0QixPQUFPLElBQUksT0FBSixDQUFZLEtBQUssUUFBakIsQ0FBUDs7O0FBRzVCLFVBQUksY0FBYyxNQUFkLENBQXFCLFFBQXJCLENBQUosRUFBb0M7QUFDbEMsYUFBSyxRQUFMLENBQWMsT0FBZCxJQUF5QixjQUFjLEdBQWQsQ0FBa0IsUUFBbEIsQ0FBekI7QUFDQSxZQUFJLE9BQUosQ0FBWSxLQUFLLFFBQWpCO0FBQ0QsT0FIRCxNQUdPOztBQUVMLFVBQUUsSUFBRixDQUFPO0FBQ0wsNEJBQWdCLE9BQWhCLG1CQURLO0FBRUwsZ0JBQU07QUFDSixvQkFBUSxPQURKO0FBRUosa0JBQU0sVUFGRjtBQUdKLG9CQUFRLG9CQUhKO0FBSUosb0JBQVE7QUFKSixXQUZEO0FBUUwsb0JBQVU7QUFSTCxTQUFQLEVBU0csSUFUSCxDQVNRLGdCQUFRO0FBQ2QsaUJBQUssUUFBTCxDQUFjLE9BQWQsSUFBeUIsS0FBSyxLQUE5Qjs7O0FBR0Esd0JBQWMsR0FBZCxDQUFrQixRQUFsQixFQUE0QixPQUFLLFFBQUwsQ0FBYyxPQUFkLENBQTVCLEVBQW9ELEVBQUMsS0FBSyxPQUFPLEVBQVAsR0FBWSxFQUFaLEdBQWlCLEVBQWpCLEdBQXNCLENBQTVCLEVBQXBEOztBQUVBLGNBQUksT0FBSixDQUFZLE9BQUssUUFBakI7QUFDRCxTQWhCRCxFQWdCRyxJQWhCSCxDQWdCUSxnQkFBUTtBQUNkLGNBQUksTUFBSixDQUFXLElBQVg7QUFDRCxTQWxCRDtBQW1CRDs7QUFFRCxhQUFPLEdBQVA7QUFDRDs7Ozs7Ozs7OztnQ0FPVyxPLEVBQVM7QUFDbkIsYUFBTyxLQUFLLFFBQUwsQ0FBYyxRQUFRLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEIsRUFBMUIsQ0FBZCxDQUFQO0FBQ0Q7Ozs7Ozs7OzttQ0FNYztBQUNiLGFBQU8sVUFBVSxTQUFWLEdBQXNCLFVBQVUsU0FBaEMsR0FBNEMsU0FBbkQ7QUFDRDs7Ozs7Ozs7Ozs7b0NBUWUsRyxFQUFLLEssRUFBTzs7QUFFMUIsVUFBSTtBQUNGLGVBQU8sYUFBYSxPQUFiLENBQXFCLEdBQXJCLEVBQTBCLEtBQTFCLENBQVA7QUFDRCxPQUZELENBRUUsT0FBTyxHQUFQLEVBQVk7QUFDWixlQUFPLFFBQVEsR0FBUixJQUFlLEtBQXRCO0FBQ0Q7QUFDRjs7Ozs7Ozs7Ozs2QkFPUSxHLEVBQUs7QUFDWixhQUFPLElBQUksS0FBSixDQUFVLEVBQVYsRUFBYyxNQUFkLENBQXFCLFVBQUMsUUFBRCxFQUFXLE9BQVg7QUFBQSxlQUN6QixDQUFDLFlBQVksQ0FBYixJQUFrQixRQUFuQixHQUErQixRQUFRLFVBQVIsQ0FBbUIsQ0FBbkIsQ0FETDtBQUFBLE9BQXJCLEVBQ2lELENBRGpELENBQVA7QUFFRDs7Ozs7Ozs7O2lDQU1ZO0FBQ1gsYUFBTyxDQUFDLEtBQUssU0FBTCxFQUFSO0FBQ0Q7Ozs7Ozs7OztnQ0FNVztBQUNWLGFBQU8sQ0FBQyxXQUFELEVBQWMsV0FBZCxFQUEyQixlQUEzQixFQUE0QyxRQUE1QyxDQUFxRCxLQUFLLEdBQTFELENBQVA7QUFDRDs7Ozs7Ozs7O3lDQU1vQjtBQUNuQixhQUFPLElBQUksTUFBSixhQUFxQixHQUFHLGlCQUFILENBQXFCLElBQXJCLENBQTBCLEdBQTFCLENBQXJCLFFBQXdELElBQXhELENBQTZELEtBQUssT0FBbEUsQ0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7OzJDQVVzQixLLEVBQU8sZSxFQUFpQjtBQUM3QyxzQkFBZ0IsT0FBaEIsQ0FBd0Isc0JBQWM7O0FBRXBDLGdCQUFRLE1BQU0sR0FBTixDQUFVLGdCQUFRO0FBQ3hCLGNBQUksV0FBVyxJQUFYLEtBQW9CLElBQXhCLEVBQThCO0FBQzVCLG1CQUFPLFdBQVcsRUFBbEI7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBTyxJQUFQO0FBQ0Q7QUFDRixTQU5PLENBQVI7QUFPRCxPQVREO0FBVUEsYUFBTyxLQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQThCTyxNLEVBQVEsTyxFQUEwRTtBQUFBLFVBQWpFLFdBQWlFLHVFQUFuRCxVQUFtRDtBQUFBLFVBQXZDLE9BQXVDO0FBQUEsVUFBOUIsS0FBOEIsdUVBQXRCLEtBQUssTUFBTCxDQUFZLFFBQVU7O0FBQ3hGLFVBQUksQ0FBQyxTQUFTLElBQVQsQ0FBYyxPQUFkLENBQUwsRUFBNkIsV0FBVyxNQUFYOztBQUU3QixVQUFNLE1BQU0sRUFBRSxRQUFGLEVBQVo7QUFDQSxVQUFJLGNBQWM7QUFDaEIsZUFBTztBQURTLE9BQWxCOztBQUlBLFVBQU0sY0FBYyxTQUFkLFdBQWMsZ0JBQWlCO0FBQ25DLFlBQUksY0FBYyxPQUFPLE1BQVAsQ0FBYztBQUM5QixrQkFBUSxPQURzQjtBQUU5QixrQkFBUSxNQUZzQjtBQUc5Qix5QkFBZTtBQUhlLFNBQWQsRUFJZixNQUplLENBQWxCOztBQU1BLFlBQUksYUFBSixFQUFtQixZQUFZLFdBQVosSUFBMkIsYUFBM0I7O0FBRW5CLFlBQU0sVUFBVSxFQUFFLElBQUYsQ0FBTztBQUNyQiw0QkFBZ0IsT0FBaEIsZUFEcUI7QUFFckIsaUJBQU8sVUFGYztBQUdyQixvQkFBVSxPQUhXO0FBSXJCLGdCQUFNO0FBSmUsU0FBUCxDQUFoQjs7QUFPQSxnQkFBUSxJQUFSLENBQWEsZ0JBQVE7O0FBRW5CLGNBQUksS0FBSyxLQUFULEVBQWdCLE9BQU8sSUFBSSxPQUFKLENBQVksSUFBWixDQUFQOztBQUVoQixjQUFJLG1CQUFKOzs7QUFHQSxjQUFJLE9BQU8sT0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUNqQyx3QkFBWSxLQUFaLEdBQW9CLFlBQVksS0FBWixDQUFrQixNQUFsQixDQUF5QixRQUFRLEtBQUssS0FBYixDQUF6QixDQUFwQjtBQUNBLHlCQUFhLFlBQVksS0FBWixDQUFrQixNQUFsQixJQUE0QixLQUF6QztBQUNELFdBSEQsTUFHTzs7QUFFTCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxLQUFmLEVBQXNCO0FBQ3BCLDBCQUFZLEtBQVosR0FBb0IsWUFBWSxLQUFaLENBQWtCLE1BQWxCLENBQXlCLEtBQUssS0FBTCxDQUFXLEtBQXBDLENBQXBCO0FBQ0Q7QUFDRCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQUosRUFBeUI7QUFDdkIsMEJBQVksT0FBWixJQUF1QixDQUFDLFlBQVksT0FBWixLQUF3QixFQUF6QixFQUE2QixNQUE3QixDQUFvQyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQXBDLENBQXZCO0FBQ0Q7OztBQUdELHlCQUFhLFlBQVksS0FBWixDQUFrQixNQUFsQixJQUE0QixLQUE1QixJQUFxQyxZQUFZLE9BQVosRUFBcUIsTUFBckIsSUFBK0IsS0FBakY7QUFDRDs7O0FBR0QsY0FBSSxDQUFDLFVBQUQsSUFBZSxLQUFLLFFBQXBCLElBQWdDLEtBQUssUUFBTCxDQUFjLFdBQWQsQ0FBcEMsRUFBZ0U7QUFDOUQsdUJBQVcsWUFBTTtBQUNmLDBCQUFZLEtBQUssUUFBTCxDQUFjLFdBQWQsQ0FBWjtBQUNELGFBRkQsRUFFRyxHQUZIO0FBR0QsV0FKRCxNQUlPOztBQUVMLGdCQUFJLEtBQUssUUFBVCxFQUFtQixZQUFZLFFBQVosR0FBdUIsSUFBdkI7QUFDbkIsZ0JBQUksT0FBSixDQUFZLFdBQVo7QUFDRDtBQUNGLFNBakNELEVBaUNHLElBakNILENBaUNRLGdCQUFRO0FBQ2QsY0FBSSxNQUFKLENBQVcsSUFBWDtBQUNELFNBbkNEO0FBb0NELE9BcEREOztBQXNEQTs7QUFFQSxhQUFPLEdBQVA7QUFDRDs7Ozs7Ozs7Ozs7c0JBUUMsSyxFQUFPO0FBQ1AsYUFBUSxJQUFJLE1BQUosQ0FBVyxLQUFYLENBQUQsQ0FBb0IsY0FBcEIsRUFBUDtBQUNEOzs7Ozs7Ozs7OztnQ0FRVyxLLEVBQU87QUFDakIsVUFBSSxNQUFNLEVBQUUsUUFBRixFQUFWOztBQUVBLGFBQU8sRUFBRSxJQUFGLENBQU87QUFDWixhQUFLLGFBQVcsS0FBSyxPQUFoQixrSEFDb0MsTUFBTSxJQUFOLENBQVcsR0FBWCxDQURwQyxDQURPO0FBR1osa0JBQVU7QUFIRSxPQUFQLEVBSUosSUFKSSxDQUlDLGdCQUFRO0FBQ2QsWUFBSSxXQUFXLEVBQWY7QUFDQSxhQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLE9BQWpCLENBQXlCLGdCQUFRO0FBQy9CLG1CQUFTLEtBQUssS0FBZCxJQUF1QixJQUF2QjtBQUNELFNBRkQ7QUFHQSxlQUFPLElBQUksT0FBSixDQUFZLFFBQVosQ0FBUDtBQUNELE9BVk0sQ0FBUDtBQVdEOzs7Ozs7Ozs7cUNBTWdCO0FBQ2YsYUFBTyxLQUFLLGVBQUwsQ0FBcUIsT0FBckIsQ0FBNkIsSUFBN0IsQ0FBa0MsS0FBSyxlQUFMLENBQXFCLFNBQXZELEVBQWtFLE1BQWxFLElBQTRFLENBQW5GO0FBQ0Q7Ozs7Ozs7Ozs7cUNBT2dCLFUsRUFBWTtBQUMzQixVQUFNLE1BQU0sVUFBVSxTQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsQ0FBc0IsQ0FBdEIsQ0FBVixDQUFaO1VBQ0UsU0FBUyxJQUFJLEtBQUosQ0FBVSxHQUFWLENBRFg7QUFFQSxVQUFJLFNBQVMsRUFBYjs7QUFFQSxXQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksT0FBTyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUN0QyxZQUFJLFFBQVEsT0FBTyxDQUFQLEVBQVUsS0FBVixDQUFnQixHQUFoQixDQUFaOztBQUVBLFlBQUksY0FBYyxNQUFNLENBQU4sTUFBYSxVQUEvQixFQUEyQztBQUN6QyxpQkFBTyxVQUFQLElBQXFCLE1BQU0sQ0FBTixFQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLE1BQXBCLENBQTJCO0FBQUEsbUJBQVMsQ0FBQyxDQUFDLEtBQVg7QUFBQSxXQUEzQixFQUE2QyxNQUE3QyxFQUFyQjtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLE1BQU0sQ0FBTixDQUFQLElBQW1CLE1BQU0sQ0FBTixDQUFuQjtBQUNEO0FBQ0Y7O0FBRUQsYUFBTyxNQUFQO0FBQ0Q7Ozs7Ozs7Ozs7K0JBT1UsRyxFQUFLO0FBQ2QsVUFBSSxRQUFKLEVBQWM7QUFDWixVQUFFLElBQUYsQ0FBTztBQUNMLHNCQUFVLFFBQVYsZUFBNEIsS0FBSyxHQUFqQyxVQUF3QyxLQUFLLE9BQUwsSUFBZ0IsUUFBeEQsQ0FESztBQUVMLGtCQUFRO0FBRkgsU0FBUDtBQUlEO0FBQ0Y7Ozs7Ozs7OztxQ0FNZ0I7QUFDZixhQUFPLEtBQUssWUFBTCxHQUFvQixRQUEzQjtBQUNEOzs7Ozs7Ozs7bUNBTWM7QUFDYixVQUFNLFVBQVUsUUFBaEI7VUFDRSxjQUFjLFFBQVEsSUFBUixDQUFhLEtBQUssWUFBbEIsRUFBZ0MsY0FBaEMsQ0FEaEI7OztBQUlBLFVBQUk7QUFDRixVQUFFLGVBQUYsRUFBbUIsSUFBbkIsQ0FBd0IsVUFBeEIsRUFBb0MsUUFBUSxNQUFSLEVBQXBDLEVBQ0csSUFESCxDQUNRLEVBQUUsSUFBRixDQUFPLGNBQVAsRUFBdUIsY0FBYyxJQUFyQyxDQURSO0FBRUQsT0FIRCxDQUdFLE9BQU8sQ0FBUCxFQUFVOztBQUVYOztBQUVELGFBQU8sV0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs4QkFXUyxFLEVBQUksSyxFQUFPLE8sRUFBUztBQUM1QixVQUFJLFFBQVEsRUFBWjtVQUFnQixjQUFoQjs7QUFFQSxVQUFNLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDekIsWUFBTSxPQUFPLE1BQU0sS0FBTixFQUFiO0FBQ0EsWUFBSSxJQUFKLEVBQVU7QUFDUixhQUFHLEtBQUgsQ0FBUyxLQUFLLE9BQWQsRUFBdUIsS0FBSyxTQUE1QjtBQUNEO0FBQ0QsWUFBSSxNQUFNLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsd0JBQWMsS0FBZCxHQUFzQixRQUFRLElBQTlCO0FBQ0Q7QUFDRixPQVJEOztBQVVBLGFBQU8sU0FBUyxPQUFULEdBQW1CO0FBQ3hCLGNBQU0sSUFBTixDQUFXO0FBQ1QsbUJBQVMsV0FBVyxJQURYO0FBRVQscUJBQVcsR0FBRyxLQUFILENBQVMsSUFBVCxDQUFjLFNBQWQ7QUFGRixTQUFYOztBQUtBLFlBQUksQ0FBQyxLQUFMLEVBQVk7QUFDVix5QjtBQUNBLGtCQUFRLFlBQVksWUFBWixFQUEwQixLQUExQixDQUFSO0FBQ0Q7QUFDRixPQVZEO0FBV0Q7Ozs7Ozs7Ozs7bUNBT2M7QUFDYixVQUFNLGVBQWUsRUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLENBQXJCO0FBQ0EsbUJBQWEsR0FBYixDQUFpQixRQUFqQjtBQUNBLG1CQUFhLE9BQWIsQ0FBcUIsS0FBckIsRUFBNEIsSUFBNUI7QUFDQSxtQkFBYSxPQUFiLENBQXFCLE1BQXJCLEVBQTZCLElBQTdCO0FBQ0EsbUJBQWEsT0FBYixDQUFxQixTQUFyQjtBQUNBLFdBQUssWUFBTDtBQUNEOzs7Ozs7Ozs7Ozs7eUJBU0ksSyxFQUFPLEssRUFBTztBQUNqQixhQUFPLE1BQU0sT0FBTixDQUFjLFVBQWQsU0FBK0IsS0FBL0IsT0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Z0NBU1csRyxFQUFLLEssRUFBTztBQUN0QixXQUFLLEdBQUwsSUFBWSxLQUFaO0FBQ0EsV0FBSyxlQUFMLHlCQUEyQyxHQUEzQyxFQUFrRCxLQUFsRDtBQUNEOzs7Ozs7Ozs7O21DQU9jO0FBQUE7OztBQUViLFVBQU0sa0JBQWtCLEtBQUssWUFBTCxLQUFzQixpQkFBOUM7O0FBRUEsUUFBRSxJQUFGLENBQU8sRUFBRSx1QkFBRixDQUFQLEVBQW1DLFVBQUMsS0FBRCxFQUFRLEVBQVIsRUFBZTtBQUNoRCxZQUFJLEdBQUcsSUFBSCxLQUFZLFVBQWhCLEVBQTRCO0FBQzFCLGlCQUFLLFdBQUwsQ0FBaUIsR0FBRyxJQUFwQixFQUEwQixHQUFHLE9BQUgsR0FBYSxNQUFiLEdBQXNCLE9BQWhEO0FBQ0QsU0FGRCxNQUVPLElBQUksR0FBRyxPQUFQLEVBQWdCO0FBQ3JCLGlCQUFLLFdBQUwsQ0FBaUIsR0FBRyxJQUFwQixFQUEwQixHQUFHLEtBQTdCO0FBQ0Q7QUFDRixPQU5EOztBQVFBLFVBQUksS0FBSyxHQUFMLEtBQWEsVUFBakIsRUFBNkI7QUFDM0IsYUFBSyxlQUFMLENBQXFCLE1BQXJCLENBQTRCLE1BQTVCLEdBQXFDLEtBQUssVUFBMUM7QUFDQSxhQUFLLGVBQUwsQ0FBcUIsYUFBckI7O0FBRUEsYUFBSyxrQkFBTDs7Ozs7OztBQU9BLFlBQUssS0FBSyxZQUFMLEtBQXNCLGlCQUF2QixLQUE4QyxlQUFsRCxFQUFtRTtBQUNqRSxlQUFLLFlBQUw7QUFDRDs7QUFFRCxZQUFJLEtBQUssV0FBTCxLQUFxQixNQUF6QixFQUFpQztBQUMvQixZQUFFLHVCQUFGLEVBQTJCLElBQTNCLENBQWdDLFNBQWhDLEVBQTJDLElBQTNDO0FBQ0Q7QUFDRjs7QUFFRCxXQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDRDs7Ozs7Ozs7Ozs7O3VDQVNrQixLLEVBQU87QUFBQTs7QUFDeEIsWUFBTSxPQUFOLENBQWMsZ0JBQVE7QUFDcEIsWUFBTSxjQUFjLEVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBcEI7QUFDQSxVQUFFLGFBQWEsV0FBYixHQUEyQixXQUE3QixFQUEwQyxRQUExQyxDQUFtRCxPQUFLLE1BQUwsQ0FBWSxZQUEvRDtBQUNELE9BSEQ7QUFJQSxRQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsRUFBNEIsT0FBNUIsQ0FBb0MsS0FBcEMsRUFBMkMsS0FBM0M7QUFDQSxRQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsRUFBNEIsT0FBNUIsQ0FBb0MsT0FBcEM7O0FBRUEsYUFBTyxLQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7b0NBVWUsSSxFQUFNO0FBQ3BCLFVBQU0sYUFBYSxPQUFPLElBQVAsQ0FBWSxLQUFLLE1BQUwsQ0FBWSxhQUF4QixFQUF1QyxPQUF2QyxDQUErQyxJQUEvQyxDQUFuQjtBQUNBLFVBQUksa0JBQUo7VUFBZSxnQkFBZjs7QUFFQSxVQUFJLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBSixFQUE4QjtBQUM1QixZQUFNLFNBQVMsU0FBUyxLQUFLLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLEVBQXhCLENBQVQsRUFBc0MsRUFBdEMsS0FBNkMsRUFBNUQsQzs7QUFENEIsb0NBRUwsS0FBSyxNQUFMLENBQVksYUFBWixDQUEwQixNQUExQixDQUFpQyxNQUFqQyxDQUZLOztBQUFBOztBQUUzQixpQkFGMkI7QUFFaEIsZUFGZ0I7QUFHN0IsT0FIRCxNQUdPLElBQUksY0FBYyxDQUFsQixFQUFxQjtBQUFBLG1CQUVILFNBQVMsUUFBVCxHQUFvQixLQUFLLE1BQUwsQ0FBWSxhQUFaLENBQTBCLE1BQTFCLEVBQXBCLEdBQXlELEtBQUssTUFBTCxDQUFZLGFBQVosQ0FBMEIsSUFBMUIsQ0FGdEQ7Ozs7QUFBQTs7QUFFekIsaUJBRnlCO0FBRWQsZUFGYzs7QUFHMUIsVUFBRSw2QkFBRixFQUFpQyxFQUFqQyxDQUFvQyxVQUFwQyxFQUFnRCxPQUFoRCxDQUF3RCxPQUF4RDtBQUNELE9BSk0sTUFJQTtBQUNMO0FBQ0Q7O0FBRUQsV0FBSyxZQUFMLEdBQW9CO0FBQ2xCLGVBQU8sSUFEVztBQUVsQixlQUFVLFVBQVUsTUFBVixDQUFpQixLQUFLLFVBQXRCLENBQVYsV0FBaUQsUUFBUSxNQUFSLENBQWUsS0FBSyxVQUFwQjtBQUYvQixPQUFwQjs7O0FBTUEsV0FBSyxlQUFMLENBQXFCLFNBQXJCLEdBQWlDLFNBQWpDO0FBQ0EsV0FBSyxlQUFMLENBQXFCLFVBQXJCLENBQWdDLE9BQWhDOztBQUVBLGFBQU8sS0FBSyxZQUFaO0FBQ0Q7Ozs7Ozs7Ozs7O3lDQVFvQjtBQUFBOzs7QUFFbkIsVUFBSSxLQUFLLGFBQVQsRUFBd0IsS0FBSyxhQUFMLENBQW1CLE1BQW5COzs7QUFHeEIsV0FBSyxhQUFMLEdBQXFCLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFyQjtBQUNBLFdBQUssYUFBTCxDQUFtQixXQUFuQixDQUErQixTQUFTLGNBQVQsQ0FBd0IsRUFBeEIsQ0FBL0IsRTtBQUNBLGVBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxhQUEvQjs7O0FBR0EsV0FBSyxNQUFMLENBQVksTUFBWixDQUFtQixPQUFuQixDQUEyQixVQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWtCO0FBQzNDLGVBQUssYUFBTCxDQUFtQixLQUFuQixDQUF5QixVQUF6Qiw4Q0FBOEUsUUFBUSxDQUF0Rix5QkFBMEcsS0FBMUcsb0JBQWdJLENBQWhJO0FBQ0QsT0FGRDs7QUFJQSxhQUFPLEtBQUssYUFBTCxDQUFtQixLQUExQjtBQUNEOzs7Ozs7Ozs7O3FDQU9nQjtBQUFBOzs7QUFFZixRQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkI7QUFBQSxlQUFLLEVBQUUsY0FBRixFQUFMO0FBQUEsT0FBN0I7OztBQUdBLFFBQUUsZUFBRixFQUFtQixFQUFuQixDQUFzQixPQUF0QixFQUErQixLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBQS9CO0FBQ0EsUUFBRSxnQkFBRixFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBaEM7OztBQUdBLFFBQUUsS0FBSyxNQUFMLENBQVksWUFBZCxFQUE0QixFQUE1QixDQUErQixTQUEvQixFQUEwQyxZQUFXO0FBQ25ELGFBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBSyxLQUExQjtBQUNELE9BRkQ7QUFHQSxRQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsRUFBNEIsRUFBNUIsQ0FBK0IsUUFBL0IsRUFBeUM7QUFBQSxlQUFLLE9BQUssZUFBTCxDQUFxQixDQUFyQixDQUFMO0FBQUEsT0FBekM7QUFDRDs7Ozs7Ozs7O3lDQU1vQjs7QUFFbkIsV0FBSyxjQUFMOzs7QUFHQSxRQUFFLG9CQUFGLEVBQXdCLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJQUF2QixDQUFwQztBQUNBLFFBQUUsc0JBQUYsRUFBMEIsRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQXRDO0FBQ0Q7Ozs7Ozs7Ozs2Q0FNd0I7QUFBQTs7QUFDdkIsVUFBTSxvQkFBb0IsRUFBRSxLQUFLLE1BQUwsQ0FBWSxpQkFBZCxDQUExQjs7Ozs7OztBQU9BLFVBQUksU0FBUyxFQUFiO0FBQ0EsYUFBTyxJQUFQLENBQVksS0FBSyxNQUFMLENBQVksYUFBeEIsRUFBdUMsT0FBdkMsQ0FBK0MsZUFBTztBQUNwRCxZQUFJLFFBQVEsUUFBWixFQUFzQixPO0FBQ3RCLGVBQU8sRUFBRSxJQUFGLENBQU8sR0FBUCxDQUFQLElBQXNCLE9BQUssTUFBTCxDQUFZLGFBQVosQ0FBMEIsR0FBMUIsQ0FBdEI7QUFDRCxPQUhEOztBQUtBLFVBQUksb0JBQW9CO0FBQ3RCLGdCQUFRO0FBQ04sa0JBQVEsS0FBSyxVQURQO0FBRU4sc0JBQVksRUFBRSxJQUFGLENBQU8sT0FBUCxDQUZOO0FBR04sdUJBQWEsRUFBRSxJQUFGLENBQU8sUUFBUCxDQUhQO0FBSU4sNEJBQWtCLEVBQUUsSUFBRixDQUFPLGNBQVAsQ0FKWjtBQUtOLHNCQUFZLENBQ1YsRUFBRSxJQUFGLENBQU8sSUFBUCxDQURVLEVBRVYsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUZVLEVBR1YsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUhVLEVBSVYsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUpVLEVBS1YsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUxVLEVBTVYsRUFBRSxJQUFGLENBQU8sSUFBUCxDQU5VLEVBT1YsRUFBRSxJQUFGLENBQU8sSUFBUCxDQVBVLENBTE47QUFjTixzQkFBWSxDQUNWLEVBQUUsSUFBRixDQUFPLFNBQVAsQ0FEVSxFQUVWLEVBQUUsSUFBRixDQUFPLFVBQVAsQ0FGVSxFQUdWLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FIVSxFQUlWLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FKVSxFQUtWLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FMVSxFQU1WLEVBQUUsSUFBRixDQUFPLE1BQVAsQ0FOVSxFQU9WLEVBQUUsSUFBRixDQUFPLE1BQVAsQ0FQVSxFQVFWLEVBQUUsSUFBRixDQUFPLFFBQVAsQ0FSVSxFQVNWLEVBQUUsSUFBRixDQUFPLFdBQVAsQ0FUVSxFQVVWLEVBQUUsSUFBRixDQUFPLFNBQVAsQ0FWVSxFQVdWLEVBQUUsSUFBRixDQUFPLFVBQVAsQ0FYVSxFQVlWLEVBQUUsSUFBRixDQUFPLFVBQVAsQ0FaVTtBQWROLFNBRGM7QUE4QnRCLG1CQUFXLFNBQVMsUUFBVCxDQUFrQixLQUFLLE1BQUwsQ0FBWSxPQUE5QixFQUF1QyxNQUF2QyxDQTlCVztBQStCdEIsaUJBQVMsS0FBSyxNQUFMLENBQVksT0EvQkM7QUFnQ3RCLGlCQUFTLEtBQUssTUFBTCxDQUFZLE9BaENDO0FBaUN0QixnQkFBUTtBQWpDYyxPQUF4Qjs7QUFvQ0EsVUFBSSxLQUFLLE1BQUwsQ0FBWSxTQUFoQixFQUEyQixrQkFBa0IsU0FBbEIsR0FBOEIsRUFBRSxNQUFNLEtBQUssTUFBTCxDQUFZLFNBQXBCLEVBQTlCOztBQUUzQix3QkFBa0IsZUFBbEIsQ0FBa0MsaUJBQWxDOzs7QUFHQSxRQUFFLGtCQUFGLEVBQXNCLE1BQXRCLENBQ0UsRUFBRSxPQUFGLEVBQ0csUUFESCxDQUNZLGtCQURaLEVBRUcsSUFGSCxDQUVRLEVBQUUsSUFBRixDQUFPLGFBQVAsRUFBc0IsU0FBUyxLQUEvQixFQUNKLGtFQURJLEVBRUQsRUFBRSxJQUFGLENBQU8sTUFBUCxDQUZDLFdBRlIsQ0FERjs7Ozs7Ozs7O0FBZ0JBLFFBQUUsNkJBQUYsRUFBaUMsRUFBakMsQ0FBb0MsT0FBcEMsRUFBNkMsYUFBSztBQUNoRCxZQUFNLFFBQVEsRUFBRSw2QkFBRixFQUFpQyxLQUFqQyxDQUF1QyxFQUFFLE1BQXpDLENBQWQ7WUFDRSxZQUFZLE9BQUssZUFBTCxDQUFxQixTQURuQztZQUVFLFNBQVMsVUFBVSxJQUFWLENBQWUsOEJBQWYsQ0FGWDtBQUdBLGVBQUssWUFBTCxHQUFvQjtBQUNsQixpQkFBTyxPQUFPLElBQVAsQ0FBWSxPQUFLLE1BQUwsQ0FBWSxhQUF4QixFQUF1QyxLQUF2QyxDQURXO0FBRWxCLGlCQUFVLE9BQU8sQ0FBUCxFQUFVLEtBQXBCLFdBQStCLE9BQU8sQ0FBUCxFQUFVO0FBRnZCLFNBQXBCO0FBSUQsT0FSRDs7QUFVQSxRQUFFLEtBQUssTUFBTCxDQUFZLGlCQUFkLEVBQWlDLEVBQWpDLENBQW9DLHVCQUFwQyxFQUE2RCxVQUFDLENBQUQsRUFBSSxNQUFKLEVBQWU7QUFDMUUsWUFBSSxPQUFPLFdBQVAsS0FBdUIsRUFBRSxJQUFGLENBQU8sY0FBUCxDQUEzQixFQUFtRDtBQUNqRCxpQkFBSyxZQUFMLEdBQW9CLElBQXBCOzs7QUFHQSxpQkFBSyxlQUFMLENBQXFCLGFBQXJCO0FBQ0Q7QUFDRixPQVBEO0FBUUQ7OztvQ0FFZSxNLEVBQVE7QUFBQTs7QUFDdEIsV0FBSyxhQUFMO0FBQ0EsYUFBTyxPQUFQLENBQWUsaUJBQVM7QUFDdEIsZUFBSyxZQUFMLGNBQ2EsRUFBRSxJQUFGLENBQU8sYUFBUCxDQURiLHlCQUNzRCxLQUR0RCxjQUVFLE9BRkY7QUFJRCxPQUxEOztBQU9BLFVBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QsY0FBTSxPQUFPLENBQVAsQ0FBTjtBQUNELE9BRkQsTUFFTyxJQUFJLFVBQVUsT0FBTyxDQUFQLENBQVYsSUFBdUIsT0FBTyxDQUFQLEVBQVUsS0FBckMsRUFBNEM7QUFDakQsVUFBRSxJQUFGLENBQU87QUFDTCxrQkFBUSxNQURIO0FBRUwsZUFBSyx1Q0FGQTtBQUdMLGdCQUFNO0FBQ0oscUJBQVMsd0JBQ1MsU0FBUyxHQUFULEdBQWUsTUFBZixFQURULHVCQUVTLEtBQUssR0FGZCx1QkFHUyxRQUhULHVCQUlTLEtBQUssU0FKZCx1QkFLUyxTQUFTLFFBQVQsQ0FBa0IsSUFMM0IsdUJBTVMsS0FBSyxZQUFMLEVBTlQsdUJBT1MsT0FBTyxDQUFQLEVBQVUsS0FQbkIsQ0FETDs7QUFVSix5REFBMkMsT0FBTyxDQUFQO0FBVnZDO0FBSEQsU0FBUCxFQWVHLElBZkgsQ0FlUSxnQkFBUTtBQUNkLGNBQUksUUFBUSxLQUFLLE1BQWIsSUFBdUIsS0FBSyxNQUFMLENBQVksVUFBdkMsRUFBbUQ7QUFDakQsbUJBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLHFCQUFQLEVBQThCLE9BQUssZUFBTCxDQUFxQixLQUFLLE1BQUwsQ0FBWSxVQUFqQyxDQUE5QixDQURGLEVBRUUsT0FGRjtBQUlELFdBTEQsTUFLTztBQUNMLG1CQUFLLFlBQUwsQ0FDRSxFQUFFLElBQUYsQ0FBTyxxQkFBUCxFQUE4QixPQUFLLGVBQUwsRUFBOUIsQ0FERixFQUVFLE9BRkY7QUFJRDtBQUNGLFNBM0JELEVBMkJHLElBM0JILENBMkJRLFlBQU07QUFDWixpQkFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8scUJBQVAsRUFBOEIsT0FBSyxlQUFMLEVBQTlCLENBREYsRUFFRSxPQUZGO0FBSUQsU0FoQ0Q7QUFpQ0Q7QUFDRjs7Ozs7Ozs7OzZCQU1RO0FBQ1AsVUFBTSxRQUFRLG9FQUFkO0FBQ0EsY0FBUSxHQUFSLENBQVksZ0ZBQVosRUFBOEYsS0FBOUY7QUFDQSxjQUFRLEdBQVIsQ0FBWSxpRkFBWixFQUErRixLQUEvRjtBQUNBLGNBQVEsR0FBUixDQUFZLG1GQUFaLEVBQWlHLEtBQWpHO0FBQ0EsY0FBUSxHQUFSLENBQVksc0ZBQVosRUFBb0csS0FBcEc7QUFDQSxjQUFRLEdBQVIsQ0FBWSxnRkFBWixFQUE4RixLQUE5RjtBQUNBLGNBQVEsR0FBUixDQUFZLHlGQUFaLEVBQXVHLEtBQXZHO0FBQ0EsY0FBUSxHQUFSLENBQVksZ0ZBQVosRUFBOEYsS0FBOUY7QUFDQSxjQUFRLEdBQVIsQ0FBWSxpRkFBWixFQUErRixLQUEvRjtBQUNBLGNBQVEsR0FBUixDQUFZLG1GQUFaLEVBQWlHLEtBQWpHO0FBQ0EsY0FBUSxHQUFSLENBQVksaUZBQVosRUFBK0YsS0FBL0Y7QUFDQSxjQUFRLEdBQVIsQ0FBWSxnRkFBWixFQUE4RixLQUE5RjtBQUNBLGNBQVEsR0FBUixDQUFZLHlGQUFaLEVBQXVHLEtBQXZHO0FBQ0EsY0FBUSxHQUFSLENBQVksZ0ZBQVosRUFBOEYsS0FBOUY7QUFDQSxjQUFRLEdBQVIsc0JBQStCLElBQUksSUFBSixHQUFXLFdBQVgsRUFBL0IsaUVBQXFILEtBQXJIO0FBQ0Q7Ozs7Ozs7OztrQ0FNYTtBQUFBOztBQUNaLFFBQUUsa0JBQUYsRUFBc0IsUUFBdEIsQ0FBK0IsU0FBL0I7QUFDQSxtQkFBYSxLQUFLLE9BQWxCOztBQUVBLFdBQUssT0FBTCxHQUFlLFdBQVcsZUFBTztBQUMvQixnQkFBSyxTQUFMO0FBQ0EsZ0JBQUssWUFBTCxjQUE2QixFQUFFLElBQUYsQ0FBTyxhQUFQLENBQTdCLDRCQUNJLEVBQUUsSUFBRixDQUFPLGlCQUFQLENBREosa0JBRUksRUFBRSxJQUFGLENBQU8scUJBQVAsRUFBOEIsUUFBSyxlQUFMLEVBQTlCLENBRkosZUFHRyxPQUhILEVBR1ksQ0FIWjtBQUlELE9BTmMsRUFNWixLQUFLLElBTk8sQ0FBZjtBQU9EOzs7Ozs7Ozs7aUNBTVk7QUFDWCxRQUFFLGtCQUFGLEVBQXNCLFdBQXRCLENBQWtDLFNBQWxDO0FBQ0EsbUJBQWEsS0FBSyxPQUFsQjtBQUNEOzs7Ozs7Ozs7Ozt3Q0FRbUIsSyxFQUFPO0FBQ3pCLGFBQU8sTUFBTSxHQUFOLENBQVUsZ0JBQVE7QUFDdkIsZUFBTyxtQkFBbUIsSUFBbkIsRUFBeUIsS0FBekIsRUFBUDtBQUNELE9BRk0sQ0FBUDtBQUdEOzs7Ozs7Ozs7MENBTXFCO0FBQUE7O0FBQ3BCLFFBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsVUFBQyxDQUFELEVBQUksSUFBSixFQUFhO0FBQ3BDLFlBQUksTUFBTSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLEVBQXFCLENBQXJCLENBQVY7O0FBRUEsWUFBSSxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLDBCQUF4QixDQUFKLEVBQXlEO0FBQ3ZELGVBQUssSUFBTCxHQUFlLEdBQWYsZUFBNEIsUUFBSyxPQUFMLENBQWEsTUFBYixFQUE1QjtBQUNELFNBRkQsTUFFTztBQUNMLGVBQUssSUFBTCxHQUFlLEdBQWYsaUJBQThCLFFBQUssT0FBTCxDQUFhLE1BQWIsRUFBOUI7QUFDRDtBQUNGLE9BUkQ7QUFTRDs7Ozs7Ozs7Ozs7bUNBUWMsTSxFQUFRO0FBQUE7O0FBQ3JCLFdBQUssTUFBTCxDQUFZLGNBQVosQ0FBMkIsT0FBM0IsQ0FBbUMsb0JBQVk7QUFDN0MsWUFBSSxhQUFhLFNBQWIsSUFBMEIsT0FBTyxPQUFyQyxFQUE4QztBQUM1QyxpQkFBTyxPQUFQLEdBQWlCLE9BQU8sT0FBUCxDQUFlLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsRUFBakMsQ0FBakI7QUFDRDs7QUFFRCxZQUFNLGVBQWUsUUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixRQUFyQixDQUFyQjtZQUNFLGFBQWEsT0FBTyxRQUFQLENBRGY7O0FBR0EsWUFBSSxnQkFBZ0IsQ0FBQyxRQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLFFBQXhCLEVBQWtDLFFBQWxDLENBQTJDLFVBQTNDLENBQXJCLEVBQTZFOztBQUUzRSxjQUFJLENBQUMsQ0FBQyxVQUFOLEVBQWtCO0FBQ2hCLG9CQUFLLHFCQUFMLENBQTJCLFFBQTNCO0FBQ0Q7O0FBRUQsaUJBQU8sUUFBUCxJQUFtQixZQUFuQjtBQUNEO0FBQ0YsT0FoQkQ7O0FBa0JBLGFBQU8sTUFBUDtBQUNEOzs7Ozs7Ozs7OztzQ0FRcUM7QUFBQSxVQUF0QixZQUFzQix1RUFBUCxLQUFPOztBQUNwQyxVQUFNLGVBQWUsRUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLENBQTVCLENBQXJCO0FBQ0EsVUFBSSxVQUFVLGFBQWEsS0FBYixDQUFtQixPQUFuQixDQUEyQixRQUEzQixFQUFxQyxFQUFyQyxDQUFkO1VBQ0UsUUFBUSxLQURWOztBQUdBLFVBQUksZ0JBQWdCLENBQUMsS0FBSyxrQkFBTCxFQUFyQixFQUFnRDtBQUM5QyxhQUFLLFlBQUwsQ0FDRSxFQUFFLElBQUYsQ0FBTyxzQkFBUCxtQkFBNkMsUUFBUSxNQUFSLEVBQTdDLFdBQWtFLFFBQVEsTUFBUixFQUFsRSxVQURGLEVBRUUsU0FGRjtBQUlBLGtCQUFVLGFBQWEsT0FBYixDQUFxQixLQUEvQjtBQUNELE9BTkQsTUFNTyxJQUFJLFlBQVksUUFBWixDQUFxQixPQUFyQixDQUFKLEVBQW1DO0FBQ3hDLGFBQUssYUFBTDtBQUNBLGFBQUssbUJBQUw7QUFDQSxnQkFBUSxJQUFSO0FBQ0QsT0FKTSxNQUlBO0FBQ0wsYUFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8saUJBQVAsbUJBQXdDLFFBQVEsTUFBUixFQUF4QyxXQUE2RCxRQUFRLE1BQVIsRUFBN0QsVUFERixFQUVFLFNBRkY7QUFJQSxrQkFBVSxhQUFhLE9BQWIsQ0FBcUIsS0FBL0I7QUFDRDs7QUFFRCxtQkFBYSxLQUFiLEdBQXFCLE9BQXJCOztBQUVBLGFBQU8sS0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7OztpQ0FXWSxPLEVBQTRDO0FBQUEsVUFBbkMsS0FBbUMsdUVBQTNCLFNBQTJCO0FBQUEsVUFBaEIsT0FBZ0IsdUVBQU4sSUFBTTs7QUFDdkQsYUFBTyxPQUFQLENBQWUsT0FBZixHQUF5QixPQUF6QjtBQUNBLGFBQU8sS0FBUCxFQUFjLE9BQWQ7QUFDRDs7O3dCQXp2Q2dCO0FBQ2YsVUFBSSxLQUFLLGtCQUFMLEtBQTRCLE1BQWhDLEVBQXdDO0FBQ3RDLGVBQU8sS0FBSyxtQkFBTCxFQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFVBQTVCO0FBQ0Q7QUFDRjs7Ozs7Ozs7O3dCQU1xQjtBQUNwQixhQUFPLEVBQUUsS0FBSyxNQUFMLENBQVksaUJBQWQsRUFBaUMsSUFBakMsQ0FBc0MsaUJBQXRDLENBQVA7QUFDRDs7O3dCQTRKYTtBQUNaLFVBQU0sVUFBVSxFQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsRUFBNEIsR0FBNUIsRUFBaEI7O0FBRUEsYUFBTyxVQUFVLFFBQVEsV0FBUixHQUFzQixPQUF0QixDQUE4QixPQUE5QixFQUF1QyxFQUF2QyxDQUFWLEdBQXVELElBQTlEO0FBQ0Q7Ozt3QkFzWThCO0FBQzdCLGFBQU8sQ0FDTCxXQURLLEVBRUwsV0FGSyxFQUdMLFVBSEssRUFJTCxXQUpLLEVBS0wsWUFMSyxFQU1MLGFBTkssRUFPTCxZQVBLLENBQVA7QUFTRDs7OztFQTF2QmMsUTs7QUF3N0NqQixPQUFPLE9BQVAsR0FBaUIsRUFBakI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqOENBLElBQU0sVUFBVSxRQUFRLFlBQVIsQ0FBaEI7QUFDQSxJQUFNLGNBQWMsT0FBTyxJQUFQLENBQVksT0FBWixFQUFxQixHQUFyQixDQUF5QjtBQUFBLFNBQU8sUUFBUSxHQUFSLENBQVA7QUFBQSxDQUF6QixDQUFwQjs7Ozs7OztJQU1NLFE7QUFDSixzQkFBYztBQUFBOztBQUFBOztBQUNaLFFBQUksT0FBTyxJQUFYO0FBQ0EsUUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsUUFBUztBQUMvQixVQUFNLFlBQVksT0FBTyxLQUFQLEVBQWMsTUFBSyxVQUFuQixFQUErQixPQUEvQixFQUFsQjtBQUNBLFVBQUksWUFBWSxDQUFoQixFQUFtQjtBQUNqQixlQUFPLEtBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxzQkFBWSxLQUFaO0FBQ0Q7QUFDRixLQVBEOztBQVNBLFNBQUssTUFBTCxHQUFjO0FBQ1osZ0JBQVUsSUFERTtBQUVaLG1CQUFhLEVBRkQ7QUFHWixZQUFNLENBQUMsV0FBRCxFQUFjLFVBQWQsRUFBMEIsV0FBMUIsRUFBdUMsV0FBdkMsRUFBb0QsV0FBcEQsRUFBaUUsZUFBakUsQ0FITTtBQUlaLG1CQUFhO0FBQ1gsY0FBTTtBQUNKLGdCQUFNO0FBQ0osb0JBQVE7QUFDTixxQkFBTyxDQUFDO0FBQ04sdUJBQU87QUFDTCw0QkFBVTtBQUFBLDJCQUFTLE1BQUssaUJBQUwsQ0FBdUIsS0FBdkIsQ0FBVDtBQUFBO0FBREw7QUFERCxlQUFELENBREQ7QUFNTixxQkFBTyxDQUFDO0FBQ04sdUJBQU87QUFDTCw0QkFBVSx5QkFBUztBQUNqQiwyQkFBTyxnQkFBZ0IsS0FBaEIsQ0FBUDtBQUNEO0FBSEk7QUFERCxlQUFEO0FBTkQsYUFESjtBQWVKLDRCQUFnQjtBQUFBLHFCQUFTLE1BQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsSUFBeEIsQ0FBVDtBQUFBLGFBZlo7QUFnQkosc0JBQVUsS0FBSztBQWhCWCxXQURGO0FBbUJKLGlCQW5CSSxtQkFtQkksS0FuQkosRUFtQlc7QUFDYixtQkFBTztBQUNMLDBCQURLO0FBRUwsK0JBQWlCLGVBRlo7QUFHTCwyQkFBYSxDQUhSO0FBSUwsMkJBQWEsS0FKUjtBQUtMLDBCQUFZLEtBTFA7QUFNTCxvQ0FBc0IsS0FOakI7QUFPTCxnQ0FBa0IsS0FBSyxJQUFMLENBQVUsS0FBVixFQUFpQixHQUFqQixDQVBiO0FBUUwseUNBQTJCLEtBUnRCO0FBU0wscUNBQXVCLEtBVGxCO0FBVUwscUNBQXVCLENBVmxCO0FBV0wsZ0NBQWtCLENBWGI7QUFZTCx1QkFBUyxLQUFLLFdBQUwsS0FBcUIsTUFBckIsR0FBOEIsR0FBOUIsR0FBb0M7QUFaeEMsYUFBUDtBQWNEO0FBbENHLFNBREs7QUFxQ1gsYUFBSztBQUNILGdCQUFNO0FBQ0osb0JBQVE7QUFDTixxQkFBTyxDQUFDO0FBQ04sdUJBQU87QUFDTCw0QkFBVTtBQUFBLDJCQUFTLE1BQUssaUJBQUwsQ0FBdUIsS0FBdkIsQ0FBVDtBQUFBO0FBREw7QUFERCxlQUFELENBREQ7QUFNTixxQkFBTyxDQUFDO0FBQ04sK0JBQWUsR0FEVDtBQUVOLG9DQUFvQixJQUZkO0FBR04sdUJBQU87QUFDTCw0QkFBVSx5QkFBUztBQUNqQiwyQkFBTyxnQkFBZ0IsS0FBaEIsQ0FBUDtBQUNEO0FBSEk7QUFIRCxlQUFEO0FBTkQsYUFESjtBQWlCSiw0QkFBZ0I7QUFBQSxxQkFBUyxNQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLElBQXhCLENBQVQ7QUFBQSxhQWpCWjtBQWtCSixzQkFBVSxLQUFLO0FBbEJYLFdBREg7QUFxQkgsaUJBckJHLG1CQXFCSyxLQXJCTCxFQXFCWTtBQUNiLG1CQUFPO0FBQ0wsMEJBREs7QUFFTCwrQkFBaUIsS0FBSyxJQUFMLENBQVUsS0FBVixFQUFpQixHQUFqQixDQUZaO0FBR0wsMkJBQWEsS0FBSyxJQUFMLENBQVUsS0FBVixFQUFpQixHQUFqQixDQUhSO0FBSUwsMkJBQWEsQ0FKUjtBQUtMLG9DQUFzQixLQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLElBQWpCLENBTGpCO0FBTUwsZ0NBQWtCO0FBTmIsYUFBUDtBQVFEO0FBOUJFLFNBckNNO0FBcUVYLGVBQU87QUFDTCxnQkFBTTtBQUNKLG1CQUFPO0FBQ0wscUJBQU87QUFDTCwwQkFBVTtBQUFBLHlCQUFTLE1BQUssWUFBTCxDQUFrQixLQUFsQixDQUFUO0FBQUE7QUFETDtBQURGLGFBREg7QUFNSiw0QkFBZ0I7QUFBQSxxQkFBUyxNQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLElBQXhCLENBQVQ7QUFBQSxhQU5aO0FBT0osc0JBQVUsS0FBSztBQVBYLFdBREQ7QUFVTCxpQkFWSyxtQkFVRyxLQVZILEVBVVU7QUFDYixtQkFBTztBQUNMLDBCQURLO0FBRUwsK0JBQWlCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakIsQ0FGWjtBQUdMLDJCQUFhLEtBSFI7QUFJTCwyQkFBYSxDQUpSO0FBS0wsb0NBQXNCLEtBTGpCO0FBTUwsZ0NBQWtCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakIsQ0FOYjtBQU9MLHlDQUEyQixLQVB0QjtBQVFMLHFDQUF1QixLQVJsQjtBQVNMLGdDQUFrQjtBQVRiLGFBQVA7QUFXRDtBQXRCSSxTQXJFSTtBQTZGWCxhQUFLO0FBQ0gsZ0JBQU07QUFDSiw0QkFBZ0I7QUFBQSxxQkFBUyxNQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLElBQXhCLENBQVQ7QUFBQSxhQURaO0FBRUosc0JBQVUsS0FBSztBQUZYLFdBREg7QUFLSCxpQkFMRyxtQkFLSyxLQUxMLEVBS1k7QUFDYixtQkFBTztBQUNMLDBCQURLO0FBRUwsK0JBQWlCLEtBRlo7QUFHTCxvQ0FBc0IsS0FBSyxJQUFMLENBQVUsS0FBVixFQUFpQixHQUFqQjtBQUhqQixhQUFQO0FBS0Q7QUFYRSxTQTdGTTtBQTBHWCxrQkFBVTtBQUNSLGdCQUFNO0FBQ0osNEJBQWdCO0FBQUEscUJBQVMsTUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixJQUF4QixDQUFUO0FBQUEsYUFEWjtBQUVKLHNCQUFVLEtBQUs7QUFGWCxXQURFO0FBS1IsaUJBTFEsbUJBS0EsS0FMQSxFQUtPO0FBQ2IsbUJBQU87QUFDTCxxQkFBTyxLQURGO0FBRUwsK0JBQWlCLEtBRlo7QUFHTCxvQ0FBc0IsS0FBSyxJQUFMLENBQVUsS0FBVixFQUFpQixHQUFqQjtBQUhqQixhQUFQO0FBS0Q7QUFYTyxTQTFHQztBQXVIWCxtQkFBVztBQUNULGdCQUFNO0FBQ0osbUJBQU87QUFDTCxxQkFBTztBQUNMLDZCQUFhLElBRFI7QUFFTCwwQkFBVTtBQUFBLHlCQUFTLE1BQUssWUFBTCxDQUFrQixLQUFsQixDQUFUO0FBQUE7QUFGTDtBQURGLGFBREg7QUFPSiw0QkFBZ0I7QUFBQSxxQkFBUyxNQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLElBQXhCLENBQVQ7QUFBQSxhQVBaO0FBUUosc0JBQVUsS0FBSztBQVJYLFdBREc7QUFXVCxpQkFYUyxtQkFXRCxLQVhDLEVBV007QUFDYixtQkFBTztBQUNMLHFCQUFPLEtBREY7QUFFTCwrQkFBaUIsS0FBSyxJQUFMLENBQVUsS0FBVixFQUFpQixHQUFqQixDQUZaO0FBR0wsb0NBQXNCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakI7QUFIakIsYUFBUDtBQUtEO0FBakJRO0FBdkhBLE9BSkQ7QUErSVosc0JBQWdCLENBQUMsS0FBRCxFQUFRLFVBQVIsRUFBb0IsV0FBcEIsQ0EvSUo7QUFnSlosY0FBUSxDQUFDLHdCQUFELEVBQTJCLHdCQUEzQixFQUFxRCx3QkFBckQsRUFBK0Usd0JBQS9FLEVBQXlHLHdCQUF6RyxFQUFtSSx3QkFBbkksRUFBNkosd0JBQTdKLEVBQXVMLHdCQUF2TCxFQUFpTix3QkFBak4sRUFBMk8sd0JBQTNPLENBaEpJO0FBaUpaLGdCQUFVO0FBQ1Isc0JBQWMsY0FETjtBQUVSLG1CQUFXO0FBQUEsaUJBQWUsY0FBYyxDQUFkLEdBQWtCLE1BQWxCLEdBQTJCLEtBQTFDO0FBQUEsU0FGSDtBQUdSLG9CQUFZLFlBSEo7QUFJUiw0QkFBb0IsTUFKWjtBQUtSLDZCQUFxQixNQUxiO0FBTVIscUJBQWEsT0FOTDtBQU9SLDBCQUFrQixNQVBWO0FBUVIscUJBQWEsT0FSTDtBQVNSLHVCQUFlLE1BVFA7QUFVUixlQUFPLE1BVkM7QUFXUixrQkFBVSxZQVhGO0FBWVIsaUJBQVM7QUFaRCxPQWpKRTtBQStKWix1QkFBaUI7QUFDZixtQkFBVztBQUNULG9CQUFVLEdBREQ7QUFFVCxrQkFBUTtBQUZDLFNBREk7QUFLZixlQUFPO0FBQ0wsNkJBQW1CO0FBRGQsU0FMUTtBQVFmLGdCQUFRO0FBQ04sbUJBQVM7QUFESDtBQVJPLE9BL0pMO0FBMktaLG9CQUFjLENBQUMsTUFBRCxFQUFTLEtBQVQsRUFBZ0IsT0FBaEIsQ0EzS0Y7QUE0S1osa0JBQVk7QUFDVixnQkFBUTtBQUNOLGlCQUFPLENBQUM7QUFDTixtQkFBTztBQUNMLHdCQUFVO0FBQUEsdUJBQVMsTUFBSyxZQUFMLENBQWtCLEtBQWxCLENBQVQ7QUFBQTtBQURMO0FBREQsV0FBRDtBQURELFNBREU7QUFRVix3QkFBZ0I7QUFBQSxpQkFBUyxNQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLE1BQU0sSUFBTixDQUFXLFFBQW5DLEVBQTZDLElBQTdDLENBQVQ7QUFBQTtBQVJOLE9BNUtBO0FBc0xaLGVBQVMsRUF0TEc7QUF1TFosZUFBUyxPQUFPLFlBQVAsRUFBcUIsT0FBckIsQ0FBNkIsS0FBN0IsQ0F2TEc7QUF3TFosZUFBUyxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsTUFBckIsRUFBNkIsT0FBN0IsQ0FBcUMsS0FBckMsQ0F4TEc7QUF5TFoscUJBQWU7QUFDYixxQkFBYSxDQUFDLFNBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFxQixNQUFyQixFQUE2QixPQUE3QixDQUFxQyxNQUFyQyxDQUFELEVBQStDLFNBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFxQixNQUFyQixFQUE2QixLQUE3QixDQUFtQyxNQUFuQyxDQUEvQyxDQURBO0FBRWIsc0JBQWMsQ0FBQyxTQUFTLE9BQVQsQ0FBaUIsT0FBakIsQ0FBRCxFQUE0QixTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsTUFBckIsRUFBNkIsT0FBN0IsQ0FBcUMsS0FBckMsQ0FBNUIsQ0FGRDtBQUdiLHNCQUFjLENBQUMsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQXFCLE9BQXJCLEVBQThCLE9BQTlCLENBQXNDLE9BQXRDLENBQUQsRUFBaUQsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQXFCLE9BQXJCLEVBQThCLEtBQTlCLENBQW9DLE9BQXBDLENBQWpELENBSEQ7QUFJYixjQUphLG9CQUl3QjtBQUFBLGNBQTlCLE1BQThCLHVFQUFyQixLQUFLLE1BQUwsQ0FBWSxPQUFTOztBQUNuQyxpQkFBTyxDQUFDLFNBQVMsUUFBVCxDQUFrQixNQUFsQixFQUEwQixNQUExQixFQUFrQyxPQUFsQyxDQUEwQyxLQUExQyxDQUFELEVBQW1ELEtBQUssTUFBTCxDQUFZLE9BQS9ELENBQVA7QUFDRDtBQU5ZLE9BekxIO0FBaU1aLHVCQUFpQixZQWpNTDtBQWtNWixtQkFBYTtBQUNYLGVBQU8sQ0FBQyxZQUFELEVBQWUsTUFBZixFQUF1QixRQUF2QixFQUFpQyxLQUFqQyxDQURJO0FBRVgsa0JBQVUsQ0FBQyxZQUFELEVBQWUsU0FBZixFQUEwQixZQUExQixFQUF3QyxZQUF4QyxDQUZDO0FBR1gsaUJBQVM7QUFIRTtBQWxNRCxLQUFkO0FBd01EOzs7O3dCQUVvQjtBQUFBOztBQUNuQixhQUFPO0FBQ0wsY0FBTSxPQUREO0FBRUwsbUJBQVc7QUFDVCxpQkFBTyw0QkFBZTtBQUNwQixnQkFBSSxPQUFPLEtBQVAsQ0FBYSxZQUFZLE1BQXpCLENBQUosRUFBc0M7QUFDcEMscUJBQU8sTUFBTSxFQUFFLElBQUYsQ0FBTyxTQUFQLENBQWI7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxNQUFNLE9BQUssWUFBTCxDQUFrQixZQUFZLE1BQTlCLENBQWI7QUFDRDtBQUNGO0FBUFEsU0FGTjtBQVdMLHNCQUFjLEVBWFQ7QUFZTCxxQkFBYSxDQVpSO0FBYUwsbUJBQVcsQ0FiTjtBQWNMLHVCQUFlO0FBZFYsT0FBUDtBQWdCRDs7O3dCQUVzQjtBQUFBOztBQUNyQixhQUFPO0FBQ0wsbUJBQVc7QUFDVCxpQkFBTyxlQUFDLFdBQUQsRUFBYyxhQUFkLEVBQWdDO0FBQ3JDLGdCQUFNLFFBQVEsY0FBYyxRQUFkLENBQXVCLFlBQVksWUFBbkMsRUFBaUQsSUFBakQsQ0FBc0QsWUFBWSxLQUFsRSxDQUFkO2dCQUNFLFFBQVEsY0FBYyxNQUFkLENBQXFCLFlBQVksS0FBakMsQ0FEVjs7QUFHQSxnQkFBSSxPQUFPLEtBQVAsQ0FBYSxLQUFiLENBQUosRUFBeUI7QUFDdkIscUJBQVUsS0FBVixVQUFvQixFQUFFLElBQUYsQ0FBTyxTQUFQLENBQXBCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQVUsS0FBVixVQUFvQixPQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBcEI7QUFDRDtBQUNGO0FBVlEsU0FETjtBQWFMLHNCQUFjLEVBYlQ7QUFjTCxxQkFBYSxDQWRSO0FBZUwsbUJBQVcsQ0FmTjtBQWdCTCx1QkFBZTtBQWhCVixPQUFQO0FBa0JEOzs7Ozs7QUFHSCxPQUFPLE9BQVAsR0FBaUIsUUFBakI7Ozs7Ozs7Ozs7Ozs7QUNyUUEsSUFBTSxVQUFVO0FBQ2QsWUFBVSxrQkFESTtBQUVkLGtCQUFnQixtQkFGRjtBQUdkLGlCQUFlLGtCQUhEO0FBSWQsWUFBVSxrQkFKSTtBQUtkLGtCQUFnQixtQkFMRjtBQU1kLGFBQVcsbUJBTkc7QUFPZCxhQUFXLG1CQVBHO0FBUWQsWUFBVSxrQkFSSTtBQVNkLGtCQUFnQixtQkFURjtBQVVkLGlCQUFlLGtCQVZEO0FBV2QsaUJBQWUsa0JBWEQ7QUFZZCxZQUFVLGtCQVpJO0FBYWQsa0JBQWdCLG1CQWJGO0FBY2QsaUJBQWUsa0JBZEQ7QUFlZCxhQUFXLG1CQWZHO0FBZ0JkLG1CQUFpQixvQkFoQkg7QUFpQmQsa0JBQWdCLG1CQWpCRjtBQWtCZCxrQkFBZ0IsbUJBbEJGO0FBbUJkLFlBQVUsa0JBbkJJO0FBb0JkLGtCQUFnQixtQkFwQkY7QUFxQmQsaUJBQWUsa0JBckJEO0FBc0JkLFlBQVUsa0JBdEJJO0FBdUJkLGtCQUFnQixtQkF2QkY7QUF3QmQsYUFBVyxtQkF4Qkc7QUF5QmQsbUJBQWlCLG9CQXpCSDtBQTBCZCxrQkFBZ0IsbUJBMUJGO0FBMkJkLGtCQUFnQixtQkEzQkY7QUE0QmQsbUJBQWlCLG9CQTVCSDtBQTZCZCxZQUFVLGtCQTdCSTtBQThCZCxrQkFBZ0IsbUJBOUJGO0FBK0JkLGlCQUFlLGtCQS9CRDtBQWdDZCxnQkFBYyxpQkFoQ0E7QUFpQ2QsaUJBQWUsa0JBakNEO0FBa0NkLGtCQUFnQixtQkFsQ0Y7QUFtQ2QsbUJBQWlCLG9CQW5DSDtBQW9DZCxhQUFXLG1CQXBDRztBQXFDZCxhQUFXLG1CQXJDRztBQXNDZCxZQUFVLGtCQXRDSTtBQXVDZCxrQkFBZ0IsbUJBdkNGO0FBd0NkLGlCQUFlLGtCQXhDRDtBQXlDZCxrQkFBZ0IsbUJBekNGO0FBMENkLGFBQVcsbUJBMUNHO0FBMkNkLG1CQUFpQixvQkEzQ0g7QUE0Q2Qsa0JBQWdCLG1CQTVDRjtBQTZDZCxrQkFBZ0IsbUJBN0NGO0FBOENkLFlBQVUsa0JBOUNJO0FBK0NkLGtCQUFnQixtQkEvQ0Y7QUFnRGQsWUFBVSxrQkFoREk7QUFpRGQsa0JBQWdCLG1CQWpERjtBQWtEZCxpQkFBZSxrQkFsREQ7QUFtRGQsWUFBVSxrQkFuREk7QUFvRGQsa0JBQWdCLG1CQXBERjtBQXFEZCxpQkFBZSxrQkFyREQ7QUFzRGQsaUJBQWUsa0JBdEREO0FBdURkLGtCQUFnQixtQkF2REY7QUF3RGQsYUFBVyxtQkF4REc7QUF5RGQsWUFBVSxrQkF6REk7QUEwRGQsaUJBQWUsa0JBMUREO0FBMkRkLGFBQVcsbUJBM0RHO0FBNERkLGlCQUFlLHVCQTVERDtBQTZEZCxhQUFXLG1CQTdERztBQThEZCxZQUFVLGtCQTlESTtBQStEZCxrQkFBZ0IsbUJBL0RGO0FBZ0VkLGlCQUFlLGtCQWhFRDtBQWlFZCxpQkFBZSxrQkFqRUQ7QUFrRWQsa0JBQWdCLG1CQWxFRjtBQW1FZCxrQkFBZ0IseUJBbkVGO0FBb0VkLFlBQVUsa0JBcEVJO0FBcUVkLGtCQUFnQixtQkFyRUY7QUFzRWQsaUJBQWUsa0JBdEVEO0FBdUVkLGdCQUFjLGlCQXZFQTtBQXdFZCxpQkFBZSxrQkF4RUQ7QUF5RWQsa0JBQWdCLG1CQXpFRjtBQTBFZCxZQUFVLGtCQTFFSTtBQTJFZCxrQkFBZ0IsbUJBM0VGO0FBNEVkLFlBQVUsa0JBNUVJO0FBNkVkLGtCQUFnQixtQkE3RUY7QUE4RWQsaUJBQWUsa0JBOUVEO0FBK0VkLGFBQVcsbUJBL0VHO0FBZ0ZkLFlBQVUsa0JBaEZJO0FBaUZkLGtCQUFnQixtQkFqRkY7QUFrRmQsaUJBQWUsa0JBbEZEO0FBbUZkLGlCQUFlLGtCQW5GRDtBQW9GZCxZQUFVLGtCQXBGSTtBQXFGZCxrQkFBZ0IsbUJBckZGO0FBc0ZkLGlCQUFlLGtCQXRGRDtBQXVGZCxrQkFBZ0IsbUJBdkZGO0FBd0ZkLFlBQVUsa0JBeEZJO0FBeUZkLGtCQUFnQixtQkF6RkY7QUEwRmQsaUJBQWUsa0JBMUZEO0FBMkZkLGFBQVcsbUJBM0ZHO0FBNEZkLFlBQVUsa0JBNUZJO0FBNkZkLGtCQUFnQixtQkE3RkY7QUE4RmQsaUJBQWUsa0JBOUZEO0FBK0ZkLGtCQUFnQixtQkEvRkY7QUFnR2QsWUFBVSxrQkFoR0k7QUFpR2Qsa0JBQWdCLG1CQWpHRjtBQWtHZCxpQkFBZSxrQkFsR0Q7QUFtR2QsZ0JBQWMsaUJBbkdBO0FBb0dkLGlCQUFlLGtCQXBHRDtBQXFHZCxrQkFBZ0IsbUJBckdGO0FBc0dkLGFBQVcsbUJBdEdHO0FBdUdkLGFBQVcsbUJBdkdHO0FBd0dkLFlBQVUsa0JBeEdJO0FBeUdkLGtCQUFnQixtQkF6R0Y7QUEwR2QsaUJBQWUsa0JBMUdEO0FBMkdkLGdCQUFjLGlCQTNHQTtBQTRHZCxpQkFBZSxrQkE1R0Q7QUE2R2Qsa0JBQWdCLG1CQTdHRjtBQThHZCxpQkFBZSx1QkE5R0Q7QUErR2QsYUFBVyxtQkEvR0c7QUFnSGQsWUFBVSxrQkFoSEk7QUFpSGQsYUFBVyxtQkFqSEc7QUFrSGQsWUFBVSxrQkFsSEk7QUFtSGQsa0JBQWdCLG1CQW5IRjtBQW9IZCxpQkFBZSxrQkFwSEQ7QUFxSGQsYUFBVyxtQkFySEc7QUFzSGQsYUFBVyxtQkF0SEc7QUF1SGQsbUJBQWlCLG9CQXZISDtBQXdIZCxhQUFXLG1CQXhIRztBQXlIZCxhQUFXLG1CQXpIRztBQTBIZCxZQUFVLGtCQTFISTtBQTJIZCxrQkFBZ0IsbUJBM0hGO0FBNEhkLGlCQUFlLGtCQTVIRDtBQTZIZCxpQkFBZSxrQkE3SEQ7QUE4SGQsWUFBVSxrQkE5SEk7QUErSGQsa0JBQWdCLG1CQS9IRjtBQWdJZCxpQkFBZSxrQkFoSUQ7QUFpSWQsYUFBVyxtQkFqSUc7QUFrSWQsWUFBVSxrQkFsSUk7QUFtSWQsa0JBQWdCLG1CQW5JRjtBQW9JZCxpQkFBZSxrQkFwSUQ7QUFxSWQsZ0JBQWMsaUJBcklBO0FBc0lkLGlCQUFlLGtCQXRJRDtBQXVJZCxrQkFBZ0IsbUJBdklGO0FBd0lkLG1CQUFpQixvQkF4SUg7QUF5SWQsYUFBVyxtQkF6SUc7QUEwSWQsbUJBQWlCLG9CQTFJSDtBQTJJZCxZQUFVLGtCQTNJSTtBQTRJZCxZQUFVLGtCQTVJSTtBQTZJZCxpQkFBZSxrQkE3SUQ7QUE4SWQsWUFBVSxrQkE5SUk7QUErSWQsa0JBQWdCLG1CQS9JRjtBQWdKZCxpQkFBZSxrQkFoSkQ7QUFpSmQsaUJBQWUsa0JBakpEO0FBa0pkLGtCQUFnQixtQkFsSkY7QUFtSmQsWUFBVSxrQkFuSkk7QUFvSmQsa0JBQWdCLG1CQXBKRjtBQXFKZCxpQkFBZSxrQkFySkQ7QUFzSmQsaUJBQWUsa0JBdEpEO0FBdUpkLGtCQUFnQixtQkF2SkY7QUF3SmQsWUFBVSxrQkF4Skk7QUF5SmQsa0JBQWdCLG1CQXpKRjtBQTBKZCxpQkFBZSxrQkExSkQ7QUEySmQsZ0JBQWMsaUJBM0pBO0FBNEpkLGlCQUFlLGtCQTVKRDtBQTZKZCxrQkFBZ0IsbUJBN0pGO0FBOEpkLG1CQUFpQixvQkE5Skg7QUErSmQsa0JBQWdCLG1CQS9KRjtBQWdLZCxhQUFXLG1CQWhLRztBQWlLZCxhQUFXLG1CQWpLRztBQWtLZCxZQUFVLGtCQWxLSTtBQW1LZCxrQkFBZ0IsbUJBbktGO0FBb0tkLFlBQVUsa0JBcEtJO0FBcUtkLGtCQUFnQixtQkFyS0Y7QUFzS2QsWUFBVSxrQkF0S0k7QUF1S2QsWUFBVSxrQkF2S0k7QUF3S2Qsa0JBQWdCLG1CQXhLRjtBQXlLZCxpQkFBZSxrQkF6S0Q7QUEwS2QsZ0JBQWMsaUJBMUtBO0FBMktkLGlCQUFlLGtCQTNLRDtBQTRLZCxrQkFBZ0IsbUJBNUtGO0FBNktkLG1CQUFpQixvQkE3S0g7QUE4S2Qsa0JBQWdCLG1CQTlLRjtBQStLZCxhQUFXLG1CQS9LRztBQWdMZCxZQUFVLGtCQWhMSTtBQWlMZCxrQkFBZ0IsbUJBakxGO0FBa0xkLGlCQUFlLGtCQWxMRDtBQW1MZCxnQkFBYyxpQkFuTEE7QUFvTGQsaUJBQWUsa0JBcExEO0FBcUxkLGtCQUFnQixtQkFyTEY7QUFzTGQsbUJBQWlCLG9CQXRMSDtBQXVMZCxrQkFBZ0IsbUJBdkxGO0FBd0xkLFlBQVUsa0JBeExJO0FBeUxkLGtCQUFnQixtQkF6TEY7QUEwTGQsaUJBQWUsa0JBMUxEO0FBMkxkLGdCQUFjLGlCQTNMQTtBQTRMZCxpQkFBZSxrQkE1TEQ7QUE2TGQsa0JBQWdCLG1CQTdMRjtBQThMZCxZQUFVLGtCQTlMSTtBQStMZCxrQkFBZ0IsbUJBL0xGO0FBZ01kLGlCQUFlLGtCQWhNRDtBQWlNZCxnQkFBYyxpQkFqTUE7QUFrTWQsaUJBQWUsa0JBbE1EO0FBbU1kLGtCQUFnQixtQkFuTUY7QUFvTWQsbUJBQWlCLG9CQXBNSDtBQXFNZCxrQkFBZ0IsbUJBck1GO0FBc01kLFlBQVUsa0JBdE1JO0FBdU1kLGtCQUFnQixtQkF2TUY7QUF3TWQsaUJBQWUsa0JBeE1EO0FBeU1kLGlCQUFlLGtCQXpNRDtBQTBNZCxrQkFBZ0IsbUJBMU1GO0FBMk1kLFlBQVUsa0JBM01JO0FBNE1kLGtCQUFnQixtQkE1TUY7QUE2TWQsaUJBQWUsa0JBN01EO0FBOE1kLGlCQUFlLGtCQTlNRDtBQStNZCxhQUFXLG1CQS9NRztBQWdOZCxZQUFVLGtCQWhOSTtBQWlOZCxrQkFBZ0IsbUJBak5GO0FBa05kLGlCQUFlLGtCQWxORDtBQW1OZCxnQkFBYyxpQkFuTkE7QUFvTmQsaUJBQWUsa0JBcE5EO0FBcU5kLGtCQUFnQixtQkFyTkY7QUFzTmQsa0JBQWdCLG1CQXRORjtBQXVOZCxZQUFVLGtCQXZOSTtBQXdOZCxZQUFVLGtCQXhOSTtBQXlOZCxrQkFBZ0IsbUJBek5GO0FBME5kLGlCQUFlLGtCQTFORDtBQTJOZCxnQkFBYyxpQkEzTkE7QUE0TmQsaUJBQWUsa0JBNU5EO0FBNk5kLGtCQUFnQixtQkE3TkY7QUE4TmQsbUJBQWlCLG9CQTlOSDtBQStOZCxpQkFBZSx1QkEvTkQ7QUFnT2QsWUFBVSxrQkFoT0k7QUFpT2Qsa0JBQWdCLG1CQWpPRjtBQWtPZCxZQUFVLGtCQWxPSTtBQW1PZCxrQkFBZ0IsbUJBbk9GO0FBb09kLGtCQUFnQixtQkFwT0Y7QUFxT2QsWUFBVSxrQkFyT0k7QUFzT2Qsa0JBQWdCLG1CQXRPRjtBQXVPZCxpQkFBZSxrQkF2T0Q7QUF3T2QsZ0JBQWMsaUJBeE9BO0FBeU9kLGlCQUFlLGtCQXpPRDtBQTBPZCxrQkFBZ0IsbUJBMU9GO0FBMk9kLG1CQUFpQixvQkEzT0g7QUE0T2Qsa0JBQWdCLG1CQTVPRjtBQTZPZCxhQUFXLG1CQTdPRztBQThPZCxhQUFXLG1CQTlPRztBQStPZCxhQUFXLG1CQS9PRztBQWdQZCxZQUFVLGtCQWhQSTtBQWlQZCxrQkFBZ0IsbUJBalBGO0FBa1BkLGlCQUFlLGtCQWxQRDtBQW1QZCxZQUFVLGtCQW5QSTtBQW9QZCxrQkFBZ0IsbUJBcFBGO0FBcVBkLGlCQUFlLGtCQXJQRDtBQXNQZCxpQkFBZSxrQkF0UEQ7QUF1UGQsYUFBVyxtQkF2UEc7QUF3UGQsYUFBVyxtQkF4UEc7QUF5UGQsWUFBVSxrQkF6UEk7QUEwUGQsa0JBQWdCLG1CQTFQRjtBQTJQZCxZQUFVLGtCQTNQSTtBQTRQZCxrQkFBZ0IsbUJBNVBGO0FBNlBkLGlCQUFlLGtCQTdQRDtBQThQZCxpQkFBZSxrQkE5UEQ7QUErUGQsa0JBQWdCLG1CQS9QRjtBQWdRZCxhQUFXLG1CQWhRRztBQWlRZCxZQUFVLGtCQWpRSTtBQWtRZCxrQkFBZ0IsbUJBbFFGO0FBbVFkLGlCQUFlLGtCQW5RRDtBQW9RZCxhQUFXLG1CQXBRRztBQXFRZCxhQUFXLG1CQXJRRztBQXNRZCxrQkFBZ0IsbUJBdFFGO0FBdVFkLFlBQVUsa0JBdlFJO0FBd1FkLGtCQUFnQixtQkF4UUY7QUF5UWQsaUJBQWUsa0JBelFEO0FBMFFkLGlCQUFlLGtCQTFRRDtBQTJRZCxrQkFBZ0IsbUJBM1FGO0FBNFFkLFlBQVUsa0JBNVFJO0FBNlFkLGtCQUFnQixtQkE3UUY7QUE4UWQsWUFBVSxrQkE5UUk7QUErUWQsa0JBQWdCLG1CQS9RRjtBQWdSZCxhQUFXLG1CQWhSRztBQWlSZCxhQUFXLG1CQWpSRztBQWtSZCxZQUFVLGtCQWxSSTtBQW1SZCxrQkFBZ0IsbUJBblJGO0FBb1JkLGlCQUFlLGtCQXBSRDtBQXFSZCxnQkFBYyxpQkFyUkE7QUFzUmQsaUJBQWUsa0JBdFJEO0FBdVJkLGtCQUFnQixtQkF2UkY7QUF3UmQsa0JBQWdCLG1CQXhSRjtBQXlSZCxZQUFVLGtCQXpSSTtBQTBSZCxrQkFBZ0IsbUJBMVJGO0FBMlJkLGlCQUFlLGtCQTNSRDtBQTRSZCxpQkFBZSxrQkE1UkQ7QUE2UmQsYUFBVyxtQkE3Ukc7QUE4UmQsWUFBVSxrQkE5Ukk7QUErUmQsWUFBVSxrQkEvUkk7QUFnU2Qsa0JBQWdCLG1CQWhTRjtBQWlTZCxpQkFBZSxrQkFqU0Q7QUFrU2QsaUJBQWUsa0JBbFNEO0FBbVNkLGtCQUFnQixtQkFuU0Y7QUFvU2QsYUFBVyxtQkFwU0c7QUFxU2QsbUJBQWlCLG9CQXJTSDtBQXNTZCxZQUFVLGtCQXRTSTtBQXVTZCxrQkFBZ0IsbUJBdlNGO0FBd1NkLFlBQVUsa0JBeFNJO0FBeVNkLGtCQUFnQixtQkF6U0Y7QUEwU2QsaUJBQWUsa0JBMVNEO0FBMlNkLGdCQUFjLGlCQTNTQTtBQTRTZCxpQkFBZSxrQkE1U0Q7QUE2U2Qsa0JBQWdCLG1CQTdTRjtBQThTZCxZQUFVLGtCQTlTSTtBQStTZCxrQkFBZ0IsbUJBL1NGO0FBZ1RkLGlCQUFlLGtCQWhURDtBQWlUZCxpQkFBZSxrQkFqVEQ7QUFrVGQsa0JBQWdCLG1CQWxURjtBQW1UZCxZQUFVLGtCQW5USTtBQW9UZCxZQUFVLGtCQXBUSTtBQXFUZCxrQkFBZ0IsbUJBclRGO0FBc1RkLGlCQUFlLGtCQXRURDtBQXVUZCxZQUFVLGtCQXZUSTtBQXdUZCxrQkFBZ0IsbUJBeFRGO0FBeVRkLGlCQUFlLGtCQXpURDtBQTBUZCxpQkFBZSxrQkExVEQ7QUEyVGQsa0JBQWdCLG1CQTNURjtBQTRUZCxZQUFVLGtCQTVUSTtBQTZUZCxrQkFBZ0IsbUJBN1RGO0FBOFRkLGlCQUFlLGtCQTlURDtBQStUZCxZQUFVLGtCQS9USTtBQWdVZCxZQUFVLGtCQWhVSTtBQWlVZCxZQUFVLGtCQWpVSTtBQWtVZCxrQkFBZ0IsbUJBbFVGO0FBbVVkLGFBQVcsbUJBblVHO0FBb1VkLFlBQVUsa0JBcFVJO0FBcVVkLGtCQUFnQixtQkFyVUY7QUFzVWQsWUFBVSxrQkF0VUk7QUF1VWQsa0JBQWdCLG1CQXZVRjtBQXdVZCxpQkFBZSxrQkF4VUQ7QUF5VWQsaUJBQWUsa0JBelVEO0FBMFVkLGtCQUFnQixtQkExVUY7QUEyVWQsWUFBVSxrQkEzVUk7QUE0VWQsa0JBQWdCLG1CQTVVRjtBQTZVZCxpQkFBZSxrQkE3VUQ7QUE4VWQsZ0JBQWMsaUJBOVVBO0FBK1VkLGlCQUFlLGtCQS9VRDtBQWdWZCxrQkFBZ0IsbUJBaFZGO0FBaVZkLG1CQUFpQixvQkFqVkg7QUFrVmQsa0JBQWdCLG1CQWxWRjtBQW1WZCxZQUFVLGtCQW5WSTtBQW9WZCxrQkFBZ0IsbUJBcFZGO0FBcVZkLFlBQVUsa0JBclZJO0FBc1ZkLGtCQUFnQixtQkF0VkY7QUF1VmQsaUJBQWUsa0JBdlZEO0FBd1ZkLGdCQUFjLGlCQXhWQTtBQXlWZCxpQkFBZSxrQkF6VkQ7QUEwVmQsa0JBQWdCLG1CQTFWRjtBQTJWZCxtQkFBaUIsb0JBM1ZIO0FBNFZkLGFBQVcsbUJBNVZHO0FBNlZkLG1CQUFpQixvQkE3Vkg7QUE4VmQsWUFBVSxrQkE5Vkk7QUErVmQsa0JBQWdCLG1CQS9WRjtBQWdXZCxZQUFVLGtCQWhXSTtBQWlXZCxrQkFBZ0IsbUJBaldGO0FBa1dkLGlCQUFlLGtCQWxXRDtBQW1XZCxpQkFBZSxrQkFuV0Q7QUFvV2QsYUFBVyxtQkFwV0c7QUFxV2QsYUFBVyxtQkFyV0c7QUFzV2QsYUFBVyxtQkF0V0c7QUF1V2QsWUFBVSxrQkF2V0k7QUF3V2QsWUFBVSxrQkF4V0k7QUF5V2QsWUFBVSxrQkF6V0k7QUEwV2QsWUFBVSxrQkExV0k7QUEyV2Qsa0JBQWdCLG1CQTNXRjtBQTRXZCxpQkFBZSxrQkE1V0Q7QUE2V2QsaUJBQWUsa0JBN1dEO0FBOFdkLFlBQVUsa0JBOVdJO0FBK1dkLGtCQUFnQixtQkEvV0Y7QUFnWGQsWUFBVSxrQkFoWEk7QUFpWGQsa0JBQWdCLG1CQWpYRjtBQWtYZCxpQkFBZSxrQkFsWEQ7QUFtWGQsWUFBVSxrQkFuWEk7QUFvWGQsa0JBQWdCLG1CQXBYRjtBQXFYZCxpQkFBZSxrQkFyWEQ7QUFzWGQsaUJBQWUsa0JBdFhEO0FBdVhkLGtCQUFnQixtQkF2WEY7QUF3WGQsWUFBVSxrQkF4WEk7QUF5WGQsa0JBQWdCLG1CQXpYRjtBQTBYZCxpQkFBZSxrQkExWEQ7QUEyWGQsZ0JBQWMsaUJBM1hBO0FBNFhkLGlCQUFlLGtCQTVYRDtBQTZYZCxrQkFBZ0IsbUJBN1hGO0FBOFhkLG1CQUFpQixvQkE5WEg7QUErWGQsYUFBVyxtQkEvWEc7QUFnWWQsWUFBVSxrQkFoWUk7QUFpWWQsaUJBQWUsa0JBallEO0FBa1lkLGFBQVcsbUJBbFlHO0FBbVlkLFlBQVUsa0JBbllJO0FBb1lkLGtCQUFnQixtQkFwWUY7QUFxWWQsaUJBQWUsa0JBcllEO0FBc1lkLGlCQUFlLGtCQXRZRDtBQXVZZCxhQUFXLG1CQXZZRztBQXdZZCxZQUFVLGtCQXhZSTtBQXlZZCxrQkFBZ0IsbUJBellGO0FBMFlkLGlCQUFlLGtCQTFZRDtBQTJZZCxpQkFBZSxrQkEzWUQ7QUE0WWQsWUFBVSxrQkE1WUk7QUE2WWQsWUFBVSxrQkE3WUk7QUE4WWQsa0JBQWdCLG1CQTlZRjtBQStZZCxpQkFBZSxrQkEvWUQ7QUFnWmQsWUFBVSxrQkFoWkk7QUFpWmQsa0JBQWdCLG1CQWpaRjtBQWtaZCxpQkFBZSxrQkFsWkQ7QUFtWmQsaUJBQWUsa0JBblpEO0FBb1pkLFlBQVUsa0JBcFpJO0FBcVpkLGtCQUFnQixtQkFyWkY7QUFzWmQsaUJBQWUsa0JBdFpEO0FBdVpkLGlCQUFlLGtCQXZaRDtBQXdaZCxrQkFBZ0IsbUJBeFpGO0FBeVpkLGFBQVcsbUJBelpHO0FBMFpkLFlBQVUsa0JBMVpJO0FBMlpkLGtCQUFnQixtQkEzWkY7QUE0WmQsaUJBQWUsa0JBNVpEO0FBNlpkLGlCQUFlLGtCQTdaRDtBQThaZCxhQUFXLG1CQTlaRztBQStaZCxhQUFXLG1CQS9aRztBQWdhZCxZQUFVLGtCQWhhSTtBQWlhZCxZQUFVLGtCQWphSTtBQWthZCxrQkFBZ0IsbUJBbGFGO0FBbWFkLGlCQUFlLGtCQW5hRDtBQW9hZCxpQkFBZSxrQkFwYUQ7QUFxYWQsa0JBQWdCLG1CQXJhRjtBQXNhZCxhQUFXLG1CQXRhRztBQXVhZCxhQUFXLG1CQXZhRztBQXdhZCxZQUFVLGtCQXhhSTtBQXlhZCxrQkFBZ0IsbUJBemFGO0FBMGFkLGlCQUFlLGtCQTFhRDtBQTJhZCxZQUFVLGtCQTNhSTtBQTRhZCxrQkFBZ0IsbUJBNWFGO0FBNmFkLGFBQVcsbUJBN2FHO0FBOGFkLFlBQVUsa0JBOWFJO0FBK2FkLGtCQUFnQixtQkEvYUY7QUFnYmQsaUJBQWUsa0JBaGJEO0FBaWJkLGlCQUFlLGtCQWpiRDtBQWtiZCxrQkFBZ0IsbUJBbGJGO0FBbWJkLGFBQVcsbUJBbmJHO0FBb2JkLFlBQVUsa0JBcGJJO0FBcWJkLGtCQUFnQixtQkFyYkY7QUFzYmQsaUJBQWUsa0JBdGJEO0FBdWJkLGFBQVcsbUJBdmJHO0FBd2JkLGlCQUFlLHVCQXhiRDtBQXliZCxhQUFXLG1CQXpiRztBQTBiZCxZQUFVLGtCQTFiSTtBQTJiZCxrQkFBZ0IsbUJBM2JGO0FBNGJkLGlCQUFlLGtCQTViRDtBQTZiZCxZQUFVLGtCQTdiSTtBQThiZCxrQkFBZ0IsbUJBOWJGO0FBK2JkLGFBQVcsbUJBL2JHO0FBZ2NkLFlBQVUsa0JBaGNJO0FBaWNkLGtCQUFnQixtQkFqY0Y7QUFrY2QsaUJBQWUsa0JBbGNEO0FBbWNkLGFBQVcsbUJBbmNHO0FBb2NkLFlBQVUsa0JBcGNJO0FBcWNkLGtCQUFnQixtQkFyY0Y7QUFzY2QsaUJBQWUsa0JBdGNEO0FBdWNkLGtCQUFnQixtQkF2Y0Y7QUF3Y2QsWUFBVSxrQkF4Y0k7QUF5Y2Qsa0JBQWdCLG1CQXpjRjtBQTBjZCxpQkFBZSxrQkExY0Q7QUEyY2QsaUJBQWUsa0JBM2NEO0FBNGNkLGtCQUFnQixtQkE1Y0Y7QUE2Y2QsWUFBVSxrQkE3Y0k7QUE4Y2Qsa0JBQWdCLG1CQTljRjtBQStjZCxpQkFBZSxrQkEvY0Q7QUFnZGQsWUFBVSxrQkFoZEk7QUFpZGQsa0JBQWdCLG1CQWpkRjtBQWtkZCxZQUFVLGtCQWxkSTtBQW1kZCxrQkFBZ0IsbUJBbmRGO0FBb2RkLGlCQUFlLGtCQXBkRDtBQXFkZCxpQkFBZSxrQkFyZEQ7QUFzZGQsa0JBQWdCLG1CQXRkRjtBQXVkZCxhQUFXLG1CQXZkRztBQXdkZCxZQUFVLGtCQXhkSTtBQXlkZCxrQkFBZ0IsbUJBemRGO0FBMGRkLGlCQUFlLGtCQTFkRDtBQTJkZCxZQUFVLGtCQTNkSTtBQTRkZCxrQkFBZ0IsbUJBNWRGO0FBNmRkLGFBQVcsbUJBN2RHO0FBOGRkLGFBQVcsbUJBOWRHO0FBK2RkLFlBQVUsa0JBL2RJO0FBZ2VkLGtCQUFnQixtQkFoZUY7QUFpZWQsaUJBQWUsa0JBamVEO0FBa2VkLGFBQVcsbUJBbGVHO0FBbWVkLGFBQVcsbUJBbmVHO0FBb2VkLFlBQVUsa0JBcGVJO0FBcWVkLGtCQUFnQixtQkFyZUY7QUFzZWQsaUJBQWUsa0JBdGVEO0FBdWVkLGlCQUFlLGtCQXZlRDtBQXdlZCxhQUFXLG1CQXhlRztBQXllZCxtQkFBaUIsb0JBemVIO0FBMGVkLGtCQUFnQixtQkExZUY7QUEyZWQsYUFBVyxtQkEzZUc7QUE0ZWQsYUFBVyxtQkE1ZUc7QUE2ZWQsbUJBQWlCLG9CQTdlSDtBQThlZCxrQkFBZ0IsbUJBOWVGO0FBK2VkLGtCQUFnQixtQkEvZUY7QUFnZmQsZ0JBQWMsc0JBaGZBO0FBaWZkLFlBQVUsa0JBamZJO0FBa2ZkLGtCQUFnQixtQkFsZkY7QUFtZmQsaUJBQWUsa0JBbmZEO0FBb2ZkLGFBQVcsbUJBcGZHO0FBcWZkLFlBQVUsa0JBcmZJO0FBc2ZkLFlBQVUsa0JBdGZJO0FBdWZkLGtCQUFnQixtQkF2ZkY7QUF3ZmQsaUJBQWUsa0JBeGZEO0FBeWZkLGdCQUFjLGlCQXpmQTtBQTBmZCxpQkFBZSxrQkExZkQ7QUEyZmQsa0JBQWdCLG1CQTNmRjtBQTRmZCxrQkFBZ0IsbUJBNWZGO0FBNmZkLFlBQVUsa0JBN2ZJO0FBOGZkLGtCQUFnQixtQkE5ZkY7QUErZmQsaUJBQWUsa0JBL2ZEO0FBZ2dCZCxZQUFVLGtCQWhnQkk7QUFpZ0JkLGtCQUFnQixtQkFqZ0JGO0FBa2dCZCxpQkFBZSxrQkFsZ0JEO0FBbWdCZCxnQkFBYyxpQkFuZ0JBO0FBb2dCZCxpQkFBZSxrQkFwZ0JEO0FBcWdCZCxrQkFBZ0IsbUJBcmdCRjtBQXNnQmQsYUFBVyxtQkF0Z0JHO0FBdWdCZCxhQUFXLG1CQXZnQkc7QUF3Z0JkLGFBQVcsbUJBeGdCRztBQXlnQmQsWUFBVSxrQkF6Z0JJO0FBMGdCZCxZQUFVLGtCQTFnQkk7QUEyZ0JkLFlBQVUsa0JBM2dCSTtBQTRnQmQsa0JBQWdCLG1CQTVnQkY7QUE2Z0JkLGlCQUFlLGtCQTdnQkQ7QUE4Z0JkLFlBQVUsa0JBOWdCSTtBQStnQmQsa0JBQWdCLG1CQS9nQkY7QUFnaEJkLFlBQVUsa0JBaGhCSTtBQWloQmQsa0JBQWdCLG1CQWpoQkY7QUFraEJkLGtCQUFnQixtQkFsaEJGO0FBbWhCZCxZQUFVLGtCQW5oQkk7QUFvaEJkLFlBQVUsa0JBcGhCSTtBQXFoQmQsa0JBQWdCLG1CQXJoQkY7QUFzaEJkLGlCQUFlLGtCQXRoQkQ7QUF1aEJkLGFBQVcsbUJBdmhCRztBQXdoQmQsYUFBVyxtQkF4aEJHO0FBeWhCZCxhQUFXLG1CQXpoQkc7QUEwaEJkLGFBQVcsbUJBMWhCRztBQTJoQmQsYUFBVyxtQkEzaEJHO0FBNGhCZCxhQUFXLG1CQTVoQkc7QUE2aEJkLFlBQVUsa0JBN2hCSTtBQThoQmQsa0JBQWdCLG1CQTloQkY7QUEraEJkLGFBQVcsbUJBL2hCRztBQWdpQmQsWUFBVSxrQkFoaUJJO0FBaWlCZCxrQkFBZ0IsbUJBamlCRjtBQWtpQmQsaUJBQWUsa0JBbGlCRDtBQW1pQmQsZ0JBQWMsaUJBbmlCQTtBQW9pQmQsaUJBQWUsa0JBcGlCRDtBQXFpQmQsa0JBQWdCLG1CQXJpQkY7QUFzaUJkLGtCQUFnQixtQkF0aUJGO0FBdWlCZCxhQUFXLG1CQXZpQkc7QUF3aUJkLGFBQVcsbUJBeGlCRztBQXlpQmQsbUJBQWlCLG9CQXppQkg7QUEwaUJkLGFBQVcsbUJBMWlCRztBQTJpQmQsWUFBVSxrQkEzaUJJO0FBNGlCZCxrQkFBZ0IsbUJBNWlCRjtBQTZpQmQsaUJBQWUsa0JBN2lCRDtBQThpQmQsWUFBVSxrQkE5aUJJO0FBK2lCZCxrQkFBZ0IsbUJBL2lCRjtBQWdqQmQsaUJBQWUsa0JBaGpCRDtBQWlqQmQsZ0JBQWMsaUJBampCQTtBQWtqQmQsaUJBQWUsa0JBbGpCRDtBQW1qQmQsa0JBQWdCLG1CQW5qQkY7QUFvakJkLG1CQUFpQixvQkFwakJIO0FBcWpCZCxrQkFBZ0IsbUJBcmpCRjtBQXNqQmQsWUFBVSxrQkF0akJJO0FBdWpCZCxrQkFBZ0IsbUJBdmpCRjtBQXdqQmQsaUJBQWUsa0JBeGpCRDtBQXlqQmQsaUJBQWUsa0JBempCRDtBQTBqQmQsWUFBVSxrQkExakJJO0FBMmpCZCxrQkFBZ0IsbUJBM2pCRjtBQTRqQmQsaUJBQWUsa0JBNWpCRDtBQTZqQmQsYUFBVyxtQkE3akJHO0FBOGpCZCxZQUFVLGtCQTlqQkk7QUErakJkLGtCQUFnQixtQkEvakJGO0FBZ2tCZCxZQUFVLGtCQWhrQkk7QUFpa0JkLGtCQUFnQixtQkFqa0JGO0FBa2tCZCxpQkFBZSxrQkFsa0JEO0FBbWtCZCxnQkFBYyxpQkFua0JBO0FBb2tCZCxpQkFBZSxrQkFwa0JEO0FBcWtCZCxrQkFBZ0IsbUJBcmtCRjtBQXNrQmQsa0JBQWdCLG1CQXRrQkY7QUF1a0JkLGlCQUFlLHVCQXZrQkQ7QUF3a0JkLHVCQUFxQix3QkF4a0JQO0FBeWtCZCxrQkFBZ0Isd0JBemtCRjtBQTBrQmQsWUFBVSxrQkExa0JJO0FBMmtCZCxrQkFBZ0IsbUJBM2tCRjtBQTRrQmQsaUJBQWUsa0JBNWtCRDtBQTZrQmQsZ0JBQWMsaUJBN2tCQTtBQThrQmQsaUJBQWUsa0JBOWtCRDtBQStrQmQsa0JBQWdCLG1CQS9rQkY7QUFnbEJkLG1CQUFpQixvQkFobEJIO0FBaWxCZCxrQkFBZ0IsbUJBamxCRjtBQWtsQmQsYUFBVyxtQkFsbEJHO0FBbWxCZCxZQUFVLGtCQW5sQkk7QUFvbEJkLGtCQUFnQixtQkFwbEJGO0FBcWxCZCxZQUFVLGtCQXJsQkk7QUFzbEJkLGtCQUFnQixtQkF0bEJGO0FBdWxCZCxpQkFBZSxrQkF2bEJEO0FBd2xCZCxpQkFBZSxrQkF4bEJEO0FBeWxCZCxrQkFBZ0IsbUJBemxCRjtBQTBsQmQsYUFBVyxtQkExbEJHO0FBMmxCZCxtQkFBaUIsb0JBM2xCSDtBQTRsQmQsWUFBVSxrQkE1bEJJO0FBNmxCZCxrQkFBZ0IsbUJBN2xCRjtBQThsQmQsYUFBVyxtQkE5bEJHO0FBK2xCZCxtQkFBaUIsb0JBL2xCSDtBQWdtQmQsYUFBVyxtQkFobUJHO0FBaW1CZCxZQUFVLGtCQWptQkk7QUFrbUJkLGtCQUFnQixtQkFsbUJGO0FBbW1CZCxnQkFBYyxpQkFubUJBO0FBb21CZCxZQUFVLGtCQXBtQkk7QUFxbUJkLGlCQUFlLGtCQXJtQkQ7QUFzbUJkLFlBQVUsa0JBdG1CSTtBQXVtQmQsa0JBQWdCLG1CQXZtQkY7QUF3bUJkLFlBQVUsa0JBeG1CSTtBQXltQmQsa0JBQWdCLG1CQXptQkY7QUEwbUJkLFlBQVUsa0JBMW1CSTtBQTJtQmQsa0JBQWdCLG1CQTNtQkY7QUE0bUJkLGlCQUFlLGtCQTVtQkQ7QUE2bUJkLGdCQUFjLHNCQTdtQkE7QUE4bUJkLHNCQUFvQix1QkE5bUJOO0FBK21CZCxxQkFBbUIsc0JBL21CTDtBQWduQmQscUJBQW1CLHNCQWhuQkw7QUFpbkJkLFlBQVUsa0JBam5CSTtBQWtuQmQsa0JBQWdCLG1CQWxuQkY7QUFtbkJkLGlCQUFlLGtCQW5uQkQ7QUFvbkJkLGlCQUFlLGtCQXBuQkQ7QUFxbkJkLGtCQUFnQixtQkFybkJGO0FBc25CZCxZQUFVLGtCQXRuQkk7QUF1bkJkLGtCQUFnQixtQkF2bkJGO0FBd25CZCxpQkFBZSxrQkF4bkJEO0FBeW5CZCxpQkFBZSxrQkF6bkJEO0FBMG5CZCxrQkFBZ0IsbUJBMW5CRjtBQTJuQmQsbUJBQWlCLG9CQTNuQkg7QUE0bkJkLFlBQVUsa0JBNW5CSTtBQTZuQmQsa0JBQWdCLG1CQTduQkY7QUE4bkJkLFlBQVUsa0JBOW5CSTtBQStuQmQsa0JBQWdCLG1CQS9uQkY7QUFnb0JkLFlBQVUsa0JBaG9CSTtBQWlvQmQsa0JBQWdCLG1CQWpvQkY7QUFrb0JkLFlBQVUsa0JBbG9CSTtBQW1vQmQsa0JBQWdCLG1CQW5vQkY7QUFvb0JkLGlCQUFlLGtCQXBvQkQ7QUFxb0JkLGdCQUFjLGlCQXJvQkE7QUFzb0JkLGlCQUFlLGtCQXRvQkQ7QUF1b0JkLFlBQVUsa0JBdm9CSTtBQXdvQmQsa0JBQWdCLG1CQXhvQkY7QUF5b0JkLGlCQUFlLGtCQXpvQkQ7QUEwb0JkLGdCQUFjLGlCQTFvQkE7QUEyb0JkLGlCQUFlLGtCQTNvQkQ7QUE0b0JkLGtCQUFnQixtQkE1b0JGO0FBNm9CZCxhQUFXLG1CQTdvQkc7QUE4b0JkLFlBQVUsa0JBOW9CSTtBQStvQmQsa0JBQWdCLG1CQS9vQkY7QUFncEJkLFlBQVUsa0JBaHBCSTtBQWlwQmQsa0JBQWdCLG1CQWpwQkY7QUFrcEJkLGFBQVcsbUJBbHBCRztBQW1wQmQsWUFBVSxrQkFucEJJO0FBb3BCZCxrQkFBZ0IsbUJBcHBCRjtBQXFwQmQsaUJBQWUsa0JBcnBCRDtBQXNwQmQsaUJBQWUsa0JBdHBCRDtBQXVwQmQsWUFBVSxrQkF2cEJJO0FBd3BCZCxrQkFBZ0IsbUJBeHBCRjtBQXlwQmQsaUJBQWUsa0JBenBCRDtBQTBwQmQsZ0JBQWMsaUJBMXBCQTtBQTJwQmQsaUJBQWUsa0JBM3BCRDtBQTRwQmQsa0JBQWdCLG1CQTVwQkY7QUE2cEJkLG1CQUFpQixvQkE3cEJIO0FBOHBCZCxrQkFBZ0IsbUJBOXBCRjtBQStwQmQsWUFBVSxrQkEvcEJJO0FBZ3FCZCxrQkFBZ0IsbUJBaHFCRjtBQWlxQmQsaUJBQWUsa0JBanFCRDtBQWtxQmQsYUFBVyxtQkFscUJHO0FBbXFCZCxZQUFVLGtCQW5xQkk7QUFvcUJkLGtCQUFnQixtQkFwcUJGO0FBcXFCZCxpQkFBZSxrQkFycUJEO0FBc3FCZCxnQkFBYyxpQkF0cUJBO0FBdXFCZCxpQkFBZSxrQkF2cUJEO0FBd3FCZCxrQkFBZ0IsbUJBeHFCRjtBQXlxQmQsWUFBVSxrQkF6cUJJO0FBMHFCZCxrQkFBZ0IsbUJBMXFCRjtBQTJxQmQsaUJBQWUsa0JBM3FCRDtBQTRxQmQsaUJBQWUsa0JBNXFCRDtBQTZxQmQsa0JBQWdCLG1CQTdxQkY7QUE4cUJkLGFBQVcsbUJBOXFCRztBQStxQmQsWUFBVSxrQkEvcUJJO0FBZ3JCZCxrQkFBZ0IsbUJBaHJCRjtBQWlyQmQsaUJBQWUsa0JBanJCRDtBQWtyQmQsWUFBVSxrQkFsckJJO0FBbXJCZCxrQkFBZ0IsbUJBbnJCRjtBQW9yQmQsaUJBQWUsa0JBcHJCRDtBQXFyQmQsZ0JBQWMsaUJBcnJCQTtBQXNyQmQsaUJBQWUsa0JBdHJCRDtBQXVyQmQsa0JBQWdCLG1CQXZyQkY7QUF3ckJkLFlBQVUsa0JBeHJCSTtBQXlyQmQsa0JBQWdCLG1CQXpyQkY7QUEwckJkLFlBQVUsa0JBMXJCSTtBQTJyQmQsa0JBQWdCLG1CQTNyQkY7QUE0ckJkLGlCQUFlLGtCQTVyQkQ7QUE2ckJkLGlCQUFlLGtCQTdyQkQ7QUE4ckJkLFlBQVUsa0JBOXJCSTtBQStyQmQsa0JBQWdCLG1CQS9yQkY7QUFnc0JkLGlCQUFlLGtCQWhzQkQ7QUFpc0JkLFlBQVUsa0JBanNCSTtBQWtzQmQsa0JBQWdCLG1CQWxzQkY7QUFtc0JkLFlBQVUsa0JBbnNCSTtBQW9zQmQsa0JBQWdCLG1CQXBzQkY7QUFxc0JkLGFBQVcsbUJBcnNCRztBQXNzQmQsbUJBQWlCLG9CQXRzQkg7QUF1c0JkLFlBQVUsa0JBdnNCSTtBQXdzQmQsa0JBQWdCLG1CQXhzQkY7QUF5c0JkLGlCQUFlLGtCQXpzQkQ7QUEwc0JkLGdCQUFjLGlCQTFzQkE7QUEyc0JkLGlCQUFlLGtCQTNzQkQ7QUE0c0JkLGtCQUFnQixtQkE1c0JGO0FBNnNCZCxZQUFVLGtCQTdzQkk7QUE4c0JkLGtCQUFnQixtQkE5c0JGO0FBK3NCZCxZQUFVLGtCQS9zQkk7QUFndEJkLGtCQUFnQixtQkFodEJGO0FBaXRCZCxpQkFBZSxrQkFqdEJEO0FBa3RCZCxpQkFBZSxrQkFsdEJEO0FBbXRCZCxhQUFXLG1CQW50Qkc7QUFvdEJkLFlBQVUsa0JBcHRCSTtBQXF0QmQsa0JBQWdCLG1CQXJ0QkY7QUFzdEJkLFlBQVUsa0JBdHRCSTtBQXV0QmQsYUFBVyxtQkF2dEJHO0FBd3RCZCxhQUFXLG1CQXh0Qkc7QUF5dEJkLFlBQVUsa0JBenRCSTtBQTB0QmQsa0JBQWdCLG1CQTF0QkY7QUEydEJkLGlCQUFlLGtCQTN0QkQ7QUE0dEJkLGlCQUFlLGtCQTV0QkQ7QUE2dEJkLFlBQVUsa0JBN3RCSTtBQTh0QmQsa0JBQWdCLG1CQTl0QkY7QUErdEJkLGlCQUFlLGtCQS90QkQ7QUFndUJkLGdCQUFjLGlCQWh1QkE7QUFpdUJkLGlCQUFlLGtCQWp1QkQ7QUFrdUJkLGtCQUFnQixtQkFsdUJGO0FBbXVCZCxrQkFBZ0IsbUJBbnVCRjtBQW91QmQsWUFBVSxrQkFwdUJJO0FBcXVCZCxrQkFBZ0IsbUJBcnVCRjtBQXN1QmQsaUJBQWUsa0JBdHVCRDtBQXV1QmQsaUJBQWUsa0JBdnVCRDtBQXd1QmQsWUFBVSxrQkF4dUJJO0FBeXVCZCxrQkFBZ0IsbUJBenVCRjtBQTB1QmQsaUJBQWUsa0JBMXVCRDtBQTJ1QmQsaUJBQWUsa0JBM3VCRDtBQTR1QmQsWUFBVSxrQkE1dUJJO0FBNnVCZCxhQUFXLG1CQTd1Qkc7QUE4dUJkLG1CQUFpQixvQkE5dUJIO0FBK3VCZCxtQkFBaUIsb0JBL3VCSDtBQWd2QmQsYUFBVyxtQkFodkJHO0FBaXZCZCxZQUFVLGtCQWp2Qkk7QUFrdkJkLGtCQUFnQixtQkFsdkJGO0FBbXZCZCxpQkFBZSxrQkFudkJEO0FBb3ZCZCxpQkFBZSxrQkFwdkJEO0FBcXZCZCxrQkFBZ0IsbUJBcnZCRjtBQXN2QmQsa0JBQWdCLG1CQXR2QkY7QUF1dkJkLGFBQVcsbUJBdnZCRztBQXd2QmQsWUFBVSxrQkF4dkJJO0FBeXZCZCxrQkFBZ0IsbUJBenZCRjtBQTB2QmQsaUJBQWUsa0JBMXZCRDtBQTJ2QmQsaUJBQWUsa0JBM3ZCRDtBQTR2QmQsWUFBVSxrQkE1dkJJO0FBNnZCZCxrQkFBZ0IsbUJBN3ZCRjtBQTh2QmQsaUJBQWUsa0JBOXZCRDtBQSt2QmQsYUFBVyxtQkEvdkJHO0FBZ3dCZCxZQUFVLGtCQWh3Qkk7QUFpd0JkLGtCQUFnQixtQkFqd0JGO0FBa3dCZCxpQkFBZSxrQkFsd0JEO0FBbXdCZCxhQUFXLG1CQW53Qkc7QUFvd0JkLGFBQVcsbUJBcHdCRztBQXF3QmQsWUFBVSxrQkFyd0JJO0FBc3dCZCxrQkFBZ0IsbUJBdHdCRjtBQXV3QmQsaUJBQWUsa0JBdndCRDtBQXd3QmQsYUFBVyxtQkF4d0JHO0FBeXdCZCxZQUFVLGtCQXp3Qkk7QUEwd0JkLGtCQUFnQixtQkExd0JGO0FBMndCZCxrQkFBZ0IsbUJBM3dCRjtBQTR3QmQsWUFBVSxrQkE1d0JJO0FBNndCZCxrQkFBZ0IsbUJBN3dCRjtBQTh3QmQsaUJBQWUsa0JBOXdCRDtBQSt3QmQsWUFBVSxrQkEvd0JJO0FBZ3hCZCxrQkFBZ0IsbUJBaHhCRjtBQWl4QmQsaUJBQWUsa0JBanhCRDtBQWt4QmQsaUJBQWUsa0JBbHhCRDtBQW14QmQsYUFBVyxtQkFueEJHO0FBb3hCZCxZQUFVLGtCQXB4Qkk7QUFxeEJkLGtCQUFnQixtQkFyeEJGO0FBc3hCZCxpQkFBZSxrQkF0eEJEO0FBdXhCZCxnQkFBYyxpQkF2eEJBO0FBd3hCZCxpQkFBZSxrQkF4eEJEO0FBeXhCZCxrQkFBZ0IsbUJBenhCRjtBQTB4QmQsa0JBQWdCLG1CQTF4QkY7QUEyeEJkLHNCQUFvQiw0QkEzeEJOO0FBNHhCZCxvQkFBa0IsMEJBNXhCSjtBQTZ4QmQsMEJBQXdCLDJCQTd4QlY7QUE4eEJkLHlCQUF1QiwwQkE5eEJUO0FBK3hCZCx5QkFBdUIsMEJBL3hCVDtBQWd5QmQsMEJBQXdCLDJCQWh5QlY7QUFpeUJkLGdCQUFjLHNCQWp5QkE7QUFreUJkLFlBQVUsa0JBbHlCSTtBQW15QmQsa0JBQWdCLG1CQW55QkY7QUFveUJkLGlCQUFlLGtCQXB5QkQ7QUFxeUJkLGtCQUFnQix3QkFyeUJGO0FBc3lCZCxpQkFBZSxrQkF0eUJEO0FBdXlCZCxtQkFBaUIseUJBdnlCSDtBQXd5QmQsbUJBQWlCLHlCQXh5Qkg7QUF5eUJkLG1CQUFpQix5QkF6eUJIO0FBMHlCZCxtQkFBaUIseUJBMXlCSDtBQTJ5QmQsa0JBQWdCLHdCQTN5QkY7QUE0eUJkLGlCQUFlLGtCQTV5QkQ7QUE2eUJkLGlCQUFlLGtCQTd5QkQ7QUE4eUJkLHFCQUFtQixzQkE5eUJMO0FBK3lCZCxlQUFhLHFCQS95QkM7QUFnekJkLHFCQUFtQiwyQkFoekJMO0FBaXpCZCxpQkFBZSxrQkFqekJEO0FBa3pCZCxpQkFBZSxrQkFsekJEO0FBbXpCZCxlQUFhLHFCQW56QkM7QUFvekJkLGlCQUFlLHNCQXB6QkQ7QUFxekJkLG1CQUFpQix5QkFyekJIO0FBc3pCZCxpQkFBZSxrQkF0ekJEO0FBdXpCZCxpQkFBZSxrQkF2ekJEO0FBd3pCZCxnQkFBYyxzQkF4ekJBO0FBeXpCZCxpQkFBZSx1QkF6ekJEO0FBMHpCZCxpQkFBZSxrQkExekJEO0FBMnpCZCxnQkFBYyxzQkEzekJBO0FBNHpCZCxpQkFBZSxrQkE1ekJEO0FBNnpCZCxjQUFZLG9CQTd6QkU7QUE4ekJkLGFBQVcsbUJBOXpCRztBQSt6QmQsaUJBQWUsa0JBL3pCRDtBQWcwQmQsb0JBQWtCLHlCQWgwQko7QUFpMEJkLGdCQUFjLHNCQWowQkE7QUFrMEJkLGdCQUFjLHNCQWwwQkE7QUFtMEJkLGlCQUFlLGtCQW4wQkQ7QUFvMEJkLG1CQUFpQix5QkFwMEJIO0FBcTBCZCxrQkFBZ0Isd0JBcjBCRjtBQXMwQmQsY0FBWSx3QkF0MEJFO0FBdTBCZCxpQkFBZSwrQkF2MEJEO0FBdzBCZCxtQkFBaUIseUJBeDBCSDtBQXkwQmQsZUFBYSxxQkF6MEJDO0FBMDBCZCxtQkFBaUIsZUExMEJIO0FBMjBCZCxjQUFZLG9CQTMwQkU7QUE0MEJkLGlCQUFlLGtCQTUwQkQ7QUE2MEJkLHVCQUFxQiw2QkE3MEJQO0FBODBCZCxpQkFBZSxrQkE5MEJEO0FBKzBCZCxpQkFBZSxrQkEvMEJEO0FBZzFCZCxpQkFBZSxrQkFoMUJEO0FBaTFCZCwrQkFBNkIsZ0NBajFCZjtBQWsxQmQsbUJBQWlCLHlCQWwxQkg7QUFtMUJkLGtCQUFnQixtQkFuMUJGO0FBbzFCZCxpQkFBZSxrQkFwMUJEO0FBcTFCZCxnQkFBYyxzQkFyMUJBO0FBczFCZCxtQkFBaUIseUJBdDFCSDtBQXUxQmQsbUJBQWlCLHlCQXYxQkg7QUF3MUJkLGtCQUFnQix3QkF4MUJGO0FBeTFCZCxvQkFBa0IscUJBejFCSjtBQTAxQmQsaUJBQWUsa0JBMTFCRDtBQTIxQmQsaUJBQWUsdUJBMzFCRDtBQTQxQmQsaUJBQWUsa0JBNTFCRDtBQTYxQmQsaUJBQWUsa0JBNzFCRDtBQTgxQmQsaUJBQWUsa0JBOTFCRDtBQSsxQmQsbUJBQWlCLHlCQS8xQkg7QUFnMkJkLGlCQUFlLGdCQWgyQkQ7QUFpMkJkLGVBQWEscUJBajJCQztBQWsyQmQsaUJBQWUsdUJBbDJCRDtBQW0yQmQsaUJBQWUsdUJBbjJCRDtBQW8yQmQsa0JBQWdCLHdCQXAyQkY7QUFxMkJkLGFBQVcsbUJBcjJCRztBQXMyQmQsY0FBWSxvQkF0MkJFO0FBdTJCZCxlQUFhLHFCQXYyQkM7QUF3MkJkLHNCQUFvQixtQkF4MkJOO0FBeTJCZCxpQkFBZSxrQkF6MkJEO0FBMDJCZCx3QkFBc0IsOEJBMTJCUjtBQTIyQmQsaUJBQWUsa0JBMzJCRDtBQTQyQmQsaUJBQWUsa0JBNTJCRDtBQTYyQmQsbUJBQWlCLHlCQTcyQkg7QUE4MkJkLGNBQVksb0JBOTJCRTtBQSsyQmQsZUFBYSxxQkEvMkJDO0FBZzNCZCxrQkFBZ0IsY0FoM0JGO0FBaTNCZCx1QkFBcUIsNkJBajNCUDtBQWszQmQsdUJBQXFCLDZCQWwzQlA7QUFtM0JkLHVCQUFxQiw2QkFuM0JQO0FBbzNCZCx1QkFBcUIsNkJBcDNCUDtBQXEzQmQsdUJBQXFCLDZCQXIzQlA7QUFzM0JkLHVCQUFxQiw2QkF0M0JQO0FBdTNCZCx1QkFBcUIsNkJBdjNCUDtBQXczQmQsdUJBQXFCLDZCQXgzQlA7QUF5M0JkLHVCQUFxQiw2QkF6M0JQO0FBMDNCZCx1QkFBcUIsNkJBMTNCUDtBQTIzQmQsdUJBQXFCLDZCQTMzQlA7QUE0M0JkLHVCQUFxQiw2QkE1M0JQO0FBNjNCZCx1QkFBcUIsNkJBNzNCUDtBQTgzQmQsdUJBQXFCLDZCQTkzQlA7QUErM0JkLGNBQVk7QUEvM0JFLENBQWhCOztBQWs0QkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzkzQkEsSUFBTSxZQUFZO0FBQ2hCLGFBRGdCLHVCQUNKLEtBREksRUFDRztBQUNqQixRQUFNLFdBQVcsU0FBWCxRQUFXLENBQUMsTUFBRCxFQUFpQztBQUFBLFVBQXhCLFdBQXdCLHVFQUFWLEtBQVU7O0FBQ2hELFVBQUksa0JBQUo7O0FBRUEsVUFBSSxXQUFKLEVBQWlCO0FBQ2Ysb0JBQVksTUFBTSxZQUFOLENBQW1CLE9BQU8sU0FBMUIsQ0FBWjtBQUNELE9BRkQsTUFFTztBQUNMLGtDQUF3QixNQUFNLGtCQUFOLENBQXlCLE9BQU8sS0FBaEMsQ0FBeEIsMEVBQ00sTUFBTSxZQUFOLENBQW1CLE9BQU8sU0FBMUIsQ0FETjtBQUdEOztBQUVELFVBQUksV0FBVztBQUNiLHFCQUFhO0FBQ1gsdUJBQWEsTUFBTSxZQUFOLENBQW1CLE9BQU8sR0FBMUIsQ0FERjtBQUVYLDJCQUFpQixNQUFNLFlBQU4sQ0FBbUIsT0FBTyxPQUExQjtBQUZOLFNBREE7QUFLYixxQkFBYTtBQUNYLG1CQUFTLFNBREU7QUFFWCxxQkFBVyxNQUFNLFlBQU4sQ0FBbUIsT0FBTyxTQUExQjtBQUZBLFNBTEE7QUFTYiw2QkFBcUI7QUFDbkIsc0JBQVksT0FBTyxRQUFQLEdBQWtCLE1BQU0sWUFBTixDQUFtQixPQUFPLFFBQTFCLENBQWxCLEdBQXdELEVBQUUsSUFBRixDQUFPLFNBQVA7QUFEakQ7QUFUUixPQUFmOztBQWNBLFVBQUksQ0FBQyxXQUFMLEVBQWtCO0FBQ2hCLGVBQU8sTUFBUCxDQUFjLFNBQVMsbUJBQVQsQ0FBZCxFQUE2QztBQUMzQyxrQkFBUSxPQUFPLE1BQVAsR0FBZ0IsTUFBTSxZQUFOLENBQW1CLE9BQU8sTUFBMUIsQ0FBaEIsR0FBb0QsRUFEakI7QUFFM0Msd0JBQWMsT0FBTztBQUZzQixTQUE3QztBQUlEOztBQUVELFVBQUksU0FBUyxFQUFiOztBQUVBLFdBQUssSUFBSSxLQUFULElBQWtCLFFBQWxCLEVBQTRCO0FBQzFCLHVEQUEyQyxLQUEzQztBQUNBLGFBQUssSUFBSSxHQUFULElBQWdCLFNBQVMsS0FBVCxDQUFoQixFQUFpQztBQUMvQixjQUFNLFFBQVEsU0FBUyxLQUFULEVBQWdCLEdBQWhCLENBQWQ7QUFDQSxjQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1osMEZBRU0sR0FGTixzRUFJUSxLQUpSO0FBT0Q7QUFDRCxrQkFBVSxRQUFWO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDLFdBQUwsRUFBa0I7QUFDaEIsNEZBRWUsTUFBTSxlQUFOLENBQXNCLE9BQU8sS0FBN0IsQ0FGZiwwQkFFdUUsRUFBRSxJQUFGLENBQU8sZUFBUCxDQUZ2RSx5REFJZSxNQUFNLG1CQUFOLENBQTBCLE9BQU8sS0FBakMsQ0FKZiwwQkFJMkUsRUFBRSxJQUFGLENBQU8sV0FBUCxDQUozRTtBQU1EOztBQUVELGFBQU8sTUFBUDtBQUNELEtBNUREOzs7QUErREEsUUFBTSxXQUFXLE1BQU0sVUFBTixDQUFpQixHQUFqQixDQUFxQixrQkFBVTtBQUM5QyxVQUFNLGFBQWEsQ0FBQyxPQUFPLFVBQVAsSUFBcUIsRUFBdEIsRUFBMEIsSUFBMUIsQ0FBK0I7QUFBQSxlQUFRLEtBQUssSUFBTCxLQUFjLE1BQXRCO0FBQUEsT0FBL0IsQ0FBbkI7QUFDQSxhQUFPLFVBQVAsR0FBb0IsYUFBYSxXQUFXLEtBQXhCLEdBQWdDLEVBQUUsSUFBRixDQUFPLE1BQVAsRUFBZSxXQUFmLEVBQXBEO0FBQ0EsYUFBTyxNQUFQO0FBQ0QsS0FKZ0IsQ0FBakI7O0FBTUEsUUFBSSxNQUFNLFVBQU4sQ0FBaUIsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsYUFBTyxTQUFTLFNBQVMsQ0FBVCxDQUFULENBQVA7QUFDRDs7QUFFRCxRQUFNLE1BQU0sU0FBUyxNQUFULENBQWdCLFVBQUMsQ0FBRCxFQUFHLENBQUg7QUFBQSxhQUFTLElBQUksRUFBRSxHQUFmO0FBQUEsS0FBaEIsRUFBb0MsQ0FBcEMsQ0FBWjtBQUNBLFFBQU0sU0FBUztBQUNiLGNBRGE7QUFFYixlQUFTLEtBQUssS0FBTCxDQUFXLE1BQU0sU0FBUyxNQUExQixDQUZJO0FBR2IsaUJBQVcsU0FBUyxNQUFULENBQWdCLFVBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxlQUFVLElBQUksRUFBRSxTQUFoQjtBQUFBLE9BQWhCLEVBQTJDLENBQTNDLENBSEU7QUFJYixpQkFBVyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGVBQVUsSUFBSSxFQUFFLFNBQWhCO0FBQUEsT0FBaEIsRUFBMkMsQ0FBM0MsQ0FKRTtBQUtiLGdCQUFVLFNBQVMsTUFBVCxDQUFnQixVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsZUFBVSxJQUFJLEVBQUUsUUFBTixJQUFrQixDQUE1QjtBQUFBLE9BQWhCLEVBQStDLENBQS9DO0FBTEcsS0FBZjs7QUFRQSxXQUFPLFNBQVMsTUFBVCxFQUFpQixJQUFqQixDQUFQO0FBQ0Q7QUFyRmUsQ0FBbEI7O0FBd0ZBLE9BQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBmaWxlIENvbmZpZ3VyYXRpb24gZm9yIFBhZ2V2aWV3cyBhcHBsaWNhdGlvblxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKi9cblxuY29uc3QgdGVtcGxhdGVzID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMnKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBQYWdldmlld3MgYXBwbGljYXRpb24uXG4gKiBUaGlzIGluY2x1ZGVzIHNlbGVjdG9ycywgZGVmYXVsdHMsIGFuZCBvdGhlciBjb25zdGFudHMgc3BlY2lmaWMgdG8gUGFnZXZpZXdzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBjb25maWcgPSB7XG4gIGFnZW50U2VsZWN0b3I6ICcjYWdlbnQtc2VsZWN0JyxcbiAgY2hhcnQ6ICcuYXFzLWNoYXJ0JyxcbiAgY2hhcnRMZWdlbmQ6IHRlbXBsYXRlcy5jaGFydExlZ2VuZCxcbiAgZGF0ZVJhbmdlU2VsZWN0b3I6ICcuYXFzLWRhdGUtcmFuZ2Utc2VsZWN0b3InLFxuICBkZWZhdWx0czoge1xuICAgIGRhdGVSYW5nZTogJ2xhdGVzdC0yMCdcbiAgfSxcbiAgbG9nYXJpdGhtaWNDaGVja2JveDogJy5sb2dhcml0aG1pYy1zY2FsZS1vcHRpb24nLFxuICBwbGF0Zm9ybVNlbGVjdG9yOiAnI3BsYXRmb3JtLXNlbGVjdCcsXG4gIHByb2plY3RJbnB1dDogJy5hcXMtcHJvamVjdC1pbnB1dCcsXG4gIHNlbGVjdDJJbnB1dDogJy5hcXMtc2VsZWN0Mi1zZWxlY3RvcicsXG4gIHZhbGlkYXRlUGFyYW1zOiBbJ3Byb2plY3QnLCAncGxhdGZvcm0nLCAnYWdlbnQnXVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG4iLCIvKipcbiAqIFBhZ2V2aWV3cyBBbmFseXNpcyB0b29sXG4gKiBAZmlsZSBNYWluIGZpbGUgZm9yIFBhZ2V2aWV3cyBhcHBsaWNhdGlvblxuICogQGF1dGhvciBNdXNpa0FuaW1hbCwgS2FsZGFyaSwgTWFyY2VscmZcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbCwgS2FsZGFyaSwgTWFyY2VscmZcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG5jb25zdCBQdiA9IHJlcXVpcmUoJy4vc2hhcmVkL3B2Jyk7XG5jb25zdCBDaGFydEhlbHBlcnMgPSByZXF1aXJlKCcuL3NoYXJlZC9jaGFydF9oZWxwZXJzJyk7XG5cbi8qKiBNYWluIFBhZ2VWaWV3cyBjbGFzcyAqL1xuY2xhc3MgUGFnZVZpZXdzIGV4dGVuZHMgbWl4KFB2KS53aXRoKENoYXJ0SGVscGVycykge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihjb25maWcpO1xuICAgIHRoaXMuYXBwID0gJ3BhZ2V2aWV3cyc7XG5cbiAgICB0aGlzLmVudGl0eUluZm8gPSBmYWxzZTsgLyoqIGxldCdzIHVzIGtub3cgaWYgd2UndmUgZ290dGVuIHRoZSBwYWdlIGluZm8gZnJvbSBBUEkgeWV0ICovXG4gICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuICAgIHRoaXMuaW5pdGlhbFF1ZXJ5ID0gZmFsc2U7XG4gICAgdGhpcy5zb3J0ID0gJ3RpdGxlJztcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICctMSc7XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QyIGxpYnJhcnkgcHJpbnRzIFwiVW5jYXVnaHQgVHlwZUVycm9yOiBYWVogaXMgbm90IGEgZnVuY3Rpb25cIiBlcnJvcnNcbiAgICAgKiBjYXVzZWQgYnkgcmFjZSBjb25kaXRpb25zIGJldHdlZW4gY29uc2VjdXRpdmUgYWpheCBjYWxscy4gVGhleSBhcmUgYWN0dWFsbHlcbiAgICAgKiBub3QgY3JpdGljYWwgYW5kIGNhbiBiZSBhdm9pZGVkIHdpdGggdGhpcyBlbXB0eSBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICB3aW5kb3cuYXJ0aWNsZVN1Z2dlc3Rpb25DYWxsYmFjayA9ICQubm9vcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQ2FsbGVkIGluIGBwdi5qc2AgYWZ0ZXIgdHJhbnNsYXRpb25zIGhhdmUgbG9hZGVkXG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5zZXR1cERhdGVSYW5nZVNlbGVjdG9yKCk7XG4gICAgdGhpcy5zZXR1cFNlbGVjdDIoKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MkNvbG9ycygpO1xuICAgIHRoaXMucG9wUGFyYW1zKCk7XG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuICAgIHRoaXMudXBkYXRlSW50ZXJBcHBMaW5rcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IG11c2lrYW5pbWFsIEFQSSB0byBnZXQgZWRpdCBkYXRhIGFib3V0IHBhZ2Ugd2l0aGluIGRhdGUgcmFuZ2VcbiAgICogQHBhcmFtIHtBcnJheX0gcGFnZXMgLSBwYWdlIG5hbWVzXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gUHJvbWlzZSByZXNvbHZpbmcgd2l0aCBlZGl0aW5nIGRhdGFcbiAgICovXG4gIGdldEVkaXREYXRhKHBhZ2VzKSB7XG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgaWYgKG1ldGFSb290KSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvLyR7bWV0YVJvb3R9L2FydGljbGVfYW5hbHlzaXMvYmFzaWNfaW5mb2AsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBwYWdlczogcGFnZXMuam9pbignfCcpLFxuICAgICAgICAgIHByb2plY3Q6IHRoaXMucHJvamVjdCxcbiAgICAgICAgICBzdGFydDogdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICAgIGVuZDogdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKVxuICAgICAgICB9XG4gICAgICB9KS50aGVuKGRhdGEgPT4gZGZkLnJlc29sdmUoZGF0YSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZmQucmVzb2x2ZSh7XG4gICAgICAgIG51bV9lZGl0czogMCxcbiAgICAgICAgbnVtX3VzZXJzOiAwXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmsgdG8gL2xhbmd2aWV3cyBmb3IgZ2l2ZW4gcGFnZSBhbmQgY2hvc2VuIGRhdGVyYW5nZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZSAtIHBhZ2UgdGl0bGVcbiAgICogQHJldHVybnMge1N0cmluZ30gVVJMXG4gICAqL1xuICBnZXRMYW5ndmlld3NVUkwocGFnZSkge1xuICAgIHJldHVybiBgL2xhbmd2aWV3cz8keyQucGFyYW0odGhpcy5nZXRQYXJhbXMoKSl9JnBhZ2U9JHtwYWdlLnJlcGxhY2UoL1smJV0vZywgZXNjYXBlKS5zY29yZSgpfWA7XG4gIH1cblxuICAvKipcbiAgICogTGluayB0byAvcmVkaXJlY3R2aWV3cyBmb3IgZ2l2ZW4gcGFnZSBhbmQgY2hvc2VuIGRhdGVyYW5nZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFnZSAtIHBhZ2UgdGl0bGVcbiAgICogQHJldHVybnMge1N0cmluZ30gVVJMXG4gICAqL1xuICBnZXRSZWRpcmVjdHZpZXdzVVJMKHBhZ2UpIHtcbiAgICByZXR1cm4gYC9yZWRpcmVjdHZpZXdzPyR7JC5wYXJhbSh0aGlzLmdldFBhcmFtcygpKX0mcGFnZT0ke3BhZ2UucmVwbGFjZSgvWyYlXS9nLCBlc2NhcGUpLnNjb3JlKCl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgcXVlcnkgZm9yIEFQSSBiYXNlZCBvbiB3aGF0IHR5cGUgb2Ygc2VhcmNoIHdlJ3JlIGRvaW5nXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBxdWVyeSAtIGFzIHJldHVybmVkIGZyb20gU2VsZWN0MiBpbnB1dFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBxdWVyeSBwYXJhbXMgdG8gYmUgaGFuZGVkIG9mZiB0byBBUElcbiAgICovXG4gIGdldFNlYXJjaFBhcmFtcyhxdWVyeSkge1xuICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ2F1dG9jb21wbGV0ZScpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbjogJ3F1ZXJ5JyxcbiAgICAgICAgbGlzdDogJ3ByZWZpeHNlYXJjaCcsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBwc3NlYXJjaDogcXVlcnkgfHwgJycsXG4gICAgICAgIGNpcnJ1c1VzZUNvbXBsZXRpb25TdWdnZXN0ZXI6ICd5ZXMnXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvY29tcGxldGUgPT09ICdhdXRvY29tcGxldGVfcmVkaXJlY3RzJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICBnZW5lcmF0b3I6ICdwcmVmaXhzZWFyY2gnLFxuICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgZ3Bzc2VhcmNoOiBxdWVyeSB8fCAnJyxcbiAgICAgICAgZ3BzbGltaXQ6ICcxMCcsXG4gICAgICAgIHJlZGlyZWN0czogJ3RydWUnLFxuICAgICAgICBjaXJydXNVc2VDb21wbGV0aW9uU3VnZ2VzdGVyOiAnbm8nXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIFVSTCBxdWVyeSBzdHJpbmcgYW5kIHNldHMgYWxsIHRoZSBpbnB1dHMgYWNjb3JkaW5nbHlcbiAgICogU2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGluaXRpYWwgcGFnZSBsb2FkLCB1bnRpbCB3ZSBkZWNpZGUgdG8gc3VwcG9ydCBwb3Agc3RhdGVzIChwcm9iYWJseSBuZXZlcilcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHBvcFBhcmFtcygpIHtcbiAgICAvKiogc2hvdyBsb2FkaW5nIGluZGljYXRvciBhbmQgYWRkIGVycm9yIGhhbmRsaW5nIGZvciB0aW1lb3V0cyAqL1xuICAgIHNldFRpbWVvdXQodGhpcy5zdGFydFNwaW5ueS5iaW5kKHRoaXMpKTsgLy8gdXNlIHNldFRpbWVvdXQgdG8gZm9yY2UgcmVuZGVyaW5nIHRocmVhZHMgdG8gY2F0Y2ggdXBcblxuICAgIGxldCBwYXJhbXMgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKFxuICAgICAgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKCdwYWdlcycpXG4gICAgKTtcblxuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwocGFyYW1zLnByb2plY3QpO1xuICAgICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKHBhcmFtcy5wbGF0Zm9ybSk7XG4gICAgJCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwocGFyYW1zLmFnZW50KTtcblxuICAgIHRoaXMucGF0Y2hVc2FnZSgpO1xuICAgIHRoaXMudmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKTtcblxuICAgIHRoaXMucmVzZXRTZWxlY3QyKCk7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBTZWxlY3QyIGRlZmF1bHRzLCB3aGljaCB0cmlnZ2VycyB0aGUgU2VsZWN0MiBsaXN0ZW5lciBhbmQgY2FsbHMgdGhpcy5wcm9jZXNzSW5wdXRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWdlcyAtIHBhZ2VzIHRvIHF1ZXJ5XG4gICAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgICAqL1xuICAgIGNvbnN0IGdldFBhZ2VJbmZvQW5kU2V0RGVmYXVsdHMgPSBwYWdlcyA9PiB7XG4gICAgICB0aGlzLmdldFBhZ2VBbmRFZGl0SW5mbyhwYWdlcykudGhlbihwYWdlSW5mbyA9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFF1ZXJ5ID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFBhZ2VOYW1lcyA9IE9iamVjdC5rZXlzKHBhZ2VJbmZvKTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3QyRGVmYXVsdHMoXG4gICAgICAgICAgdGhpcy51bmRlcnNjb3JlUGFnZU5hbWVzKG5vcm1hbGl6ZWRQYWdlTmFtZXMpXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gc2V0IHVwIGRlZmF1bHQgcGFnZXMgaWYgbm9uZSB3ZXJlIHBhc3NlZCBpblxuICAgIGlmICghcGFyYW1zLnBhZ2VzIHx8ICFwYXJhbXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICAvLyBvbmx5IHNldCBkZWZhdWx0IG9mIENhdCBhbmQgRG9nIGZvciBlbndpa2lcbiAgICAgIGlmICh0aGlzLnByb2plY3QgPT09ICdlbi53aWtpcGVkaWEnKSB7XG4gICAgICAgIHBhcmFtcy5wYWdlcyA9IFsnQ2F0JywgJ0RvZyddO1xuICAgICAgICB0aGlzLnNldEluaXRpYWxDaGFydFR5cGUocGFyYW1zLnBhZ2VzLmxlbmd0aCk7XG4gICAgICAgIGdldFBhZ2VJbmZvQW5kU2V0RGVmYXVsdHMocGFyYW1zLnBhZ2VzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxlYXZlIFNlbGVjdDIgZW1wdHkgYW5kIHB1dCBmb2N1cyBvbiBpdCBzbyB0aGV5IGNhbiB0eXBlIGluIHBhZ2VzXG4gICAgICAgIHRoaXMuZm9jdXNTZWxlY3QyKCk7XG4gICAgICAgIC8vIG1hbnVhbGx5IGhpZGUgc3Bpbm55IHNpbmNlIHdlIGFyZW4ndCBkcmF3aW5nIHRoZSBjaGFydCxcbiAgICAgICAgLy8gYWdhaW4gdXNpbmcgc2V0VGltZW91dCB0byBsZXQgZXZlcnl0aGluZyBjYXRjaCB1cFxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuc3RvcFNwaW5ueS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKCk7XG4gICAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBtb3JlIHRoYW4gMTAgYXJ0aWNsZXMgYXR0ZW1wdCB0byBjcmVhdGUgYSBQYWdlUGlsZSBhbmQgb3BlbiBpdCBpbiBNYXNzdmlld3NcbiAgICB9IGVsc2UgaWYgKHBhcmFtcy5wYWdlcy5sZW5ndGggPiAxMCkge1xuICAgICAgLy8gSWYgYSBQYWdlUGlsZSBpcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCB3ZSBhcmUgcmVkaXJlY3RlZCB0byBNYXNzdmlld3MgYW5kIHRoZSBwcm9taXNlIGlzIG5ldmVyIHJlc29sdmVkLFxuICAgICAgLy8gICBvdGhlcndpc2Ugd2UganVzdCB0YWtlIHRoZSBmaXJzdCAxMCBhbmQgcHJvY2VzcyBhcyB3ZSB3b3VsZCBub3JtYWxseVxuICAgICAgdGhpcy5tYXNzdmlld3NSZWRpcmVjdFdpdGhQYWdlUGlsZShwYXJhbXMucGFnZXMpLnRoZW4oZ2V0UGFnZUluZm9BbmRTZXREZWZhdWx0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0SW5pdGlhbENoYXJ0VHlwZShwYXJhbXMucGFnZXMubGVuZ3RoKTtcbiAgICAgIGdldFBhZ2VJbmZvQW5kU2V0RGVmYXVsdHMocGFyYW1zLnBhZ2VzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIE1lZGlhd2lraSBBUEkgcmVzdWx0cyBpbnRvIFNlbGVjdDIgZm9ybWF0IGJhc2VkIG9uIHNldHRpbmdzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gZGF0YSBhcyByZWNlaXZlZCBmcm9tIHRoZSBBUElcbiAgICogQHJldHVybnMge09iamVjdH0gZGF0YSByZWFkeSB0byBoYW5kZWQgb3ZlciB0byBTZWxlY3QyXG4gICAqL1xuICBwcm9jZXNzU2VhcmNoUmVzdWx0cyhkYXRhKSB7XG4gICAgY29uc3QgcXVlcnkgPSBkYXRhID8gZGF0YS5xdWVyeSA6IHt9O1xuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICBpZiAoIXF1ZXJ5KSByZXR1cm4ge3Jlc3VsdHN9O1xuXG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlID09PSAnYXV0b2NvbXBsZXRlJykge1xuICAgICAgaWYgKHF1ZXJ5LnByZWZpeHNlYXJjaC5sZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0cyA9IHF1ZXJ5LnByZWZpeHNlYXJjaC5tYXAoZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogZWxlbS50aXRsZS5zY29yZSgpLFxuICAgICAgICAgICAgdGV4dDogZWxlbS50aXRsZVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvY29tcGxldGUgPT09ICdhdXRvY29tcGxldGVfcmVkaXJlY3RzJykge1xuICAgICAgLyoqIGZpcnN0IG1lcmdlIGluIHJlZGlyZWN0cyAqL1xuICAgICAgaWYgKHF1ZXJ5LnJlZGlyZWN0cykge1xuICAgICAgICByZXN1bHRzID0gcXVlcnkucmVkaXJlY3RzLm1hcChyZWQgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogcmVkLmZyb20uc2NvcmUoKSxcbiAgICAgICAgICAgIHRleHQ6IHJlZC5mcm9tXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5rZXlzKHF1ZXJ5LnBhZ2VzKS5mb3JFYWNoKHBhZ2VJZCA9PiB7XG4gICAgICAgIGNvbnN0IHBhZ2VEYXRhID0gcXVlcnkucGFnZXNbcGFnZUlkXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICBpZDogcGFnZURhdGEudGl0bGUuc2NvcmUoKSxcbiAgICAgICAgICB0ZXh0OiBwYWdlRGF0YS50aXRsZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7cmVzdWx0czogcmVzdWx0c307XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB1c2VyLWlucHV0dGVkIHBhcmFtZXRlcnMgZXhjZXB0IHRoZSBwYWdlc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzcGVjaWFsUmFuZ2VdIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIHNwZWNpYWwgcmFuZ2UgaW5zdGVhZCBvZiBzdGFydC9lbmQsIGlmIGFwcGxpY2FibGVcbiAgICogQHJldHVybiB7T2JqZWN0fSBwcm9qZWN0LCBwbGF0Zm9ybSwgYWdlbnQsIGV0Yy5cbiAgICovXG4gIGdldFBhcmFtcyhzcGVjaWFsUmFuZ2UgPSB0cnVlKSB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIHByb2plY3Q6ICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwoKSxcbiAgICAgIHBsYXRmb3JtOiAkKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpLFxuICAgICAgYWdlbnQ6ICQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKClcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgc3RhcnQgYW5kIGVuZCB3aXRoIGN1c3RvbSByYW5nZSB2YWx1ZXMsIGlmIGNvbmZpZ3VyZWQgKHNldCBieSBVUkwgcGFyYW1zIG9yIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IpXG4gICAgICogVmFsaWQgdmFsdWVzIGFyZSB0aG9zZSBkZWZpbmVkIGluIGNvbmZpZy5zcGVjaWFsUmFuZ2VzLCBjb25zdHJ1Y3RlZCBsaWtlIGB7cmFuZ2U6ICdsYXN0LW1vbnRoJ31gLFxuICAgICAqICAgb3IgYSByZWxhdGl2ZSByYW5nZSBsaWtlIGB7cmFuZ2U6ICdsYXRlc3QtTid9YCB3aGVyZSBOIGlzIHRoZSBudW1iZXIgb2YgZGF5cy5cbiAgICAgKi9cbiAgICBpZiAodGhpcy5zcGVjaWFsUmFuZ2UgJiYgc3BlY2lhbFJhbmdlKSB7XG4gICAgICBwYXJhbXMucmFuZ2UgPSB0aGlzLnNwZWNpYWxSYW5nZS5yYW5nZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLnN0YXJ0ID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgcGFyYW1zLmVuZCA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgfVxuXG4gICAgLyoqIGFkZCBhdXRvbG9nIHBhcmFtIG9ubHkgaWYgaXQgd2FzIHBhc3NlZCBpbiBvcmlnaW5hbGx5LCBhbmQgb25seSBpZiBpdCB3YXMgZmFsc2UgKHRydWUgd291bGQgYmUgZGVmYXVsdCkgKi9cbiAgICBpZiAodGhpcy5ub0xvZ1NjYWxlKSBwYXJhbXMuYXV0b2xvZyA9ICdmYWxzZSc7XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGhpc3Rvcnkgc3RhdGUgd2l0aCBuZXcgVVJMIHF1ZXJ5IHN0cmluZyByZXByZXNlbnRpbmcgY3VycmVudCB1c2VyIGlucHV0XG4gICAqIENhbGxlZCB3aGVuZXZlciB3ZSBnbyB0byB1cGRhdGUgdGhlIGNoYXJ0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwdXNoUGFyYW1zKCkge1xuICAgIGNvbnN0IHBhZ2VzID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcpIHx8IFtdLFxuICAgICAgZXNjYXBlZFBhZ2VzID0gcGFnZXMuam9pbignfCcpLnJlcGxhY2UoL1smJV0vZywgZXNjYXBlKTtcblxuICAgIGlmICh3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsXG4gICAgICAgIGA/JHskLnBhcmFtKHRoaXMuZ2V0UGFyYW1zKCkpfSZwYWdlcz0ke2VzY2FwZWRQYWdlc31gXG4gICAgICApO1xuICAgIH1cblxuICAgICQoJy5wZXJtYWxpbmsnKS5wcm9wKCdocmVmJywgYD8keyQucGFyYW0odGhpcy5nZXRQZXJtYUxpbmsoKSl9JnBhZ2VzPSR7ZXNjYXBlZFBhZ2VzfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdXAgdGhlIGFydGljbGUgc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXIgdG8gdXBkYXRlIGNoYXJ0XG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwU2VsZWN0MigpIHtcbiAgICBjb25zdCAkc2VsZWN0MklucHV0ID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpO1xuXG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIGFqYXg6IHRoaXMuZ2V0QXJ0aWNsZVNlbGVjdG9yQWpheCgpLFxuICAgICAgdGFnczogdGhpcy5hdXRvY29tcGxldGUgPT09ICdub19hdXRvY29tcGxldGUnLFxuICAgICAgcGxhY2Vob2xkZXI6ICQuaTE4bignYXJ0aWNsZS1wbGFjZWhvbGRlcicpLFxuICAgICAgbWF4aW11bVNlbGVjdGlvbkxlbmd0aDogMTAsXG4gICAgICBtaW5pbXVtSW5wdXRMZW5ndGg6IDFcbiAgICB9O1xuXG4gICAgJHNlbGVjdDJJbnB1dC5zZWxlY3QyKHBhcmFtcyk7XG4gICAgJHNlbGVjdDJJbnB1dC5vbignY2hhbmdlJywgdGhpcy5wcm9jZXNzSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgJHNlbGVjdDJJbnB1dC5vbignc2VsZWN0MjpvcGVuJywgZSA9PiB7XG4gICAgICBpZiAoJChlLnRhcmdldCkudmFsKCkgJiYgJChlLnRhcmdldCkudmFsKCkubGVuZ3RoID09PSAxMCkge1xuICAgICAgICAkKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJykub25lKCdrZXl1cCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJC5pMThuKFxuICAgICAgICAgICAgJ21hc3N2aWV3cy1ub3RpY2UnLFxuICAgICAgICAgICAgMTAsXG4gICAgICAgICAgICBgPHN0cm9uZz48YSBocmVmPScvbWFzc3ZpZXdzLyc+JHskLmkxOG4oJ21hc3N2aWV3cycpfTwvYT48L3N0cm9uZz5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShtZXNzYWdlLCAnaW5mbycsIDEwMDAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFqYXggcGFyYW1ldGVycyB0byBiZSB1c2VkIGluIHNldHVwU2VsZWN0MiwgYmFzZWQgb24gdGhpcy5hdXRvY29tcGxldGVcbiAgICogQHJldHVybiB7b2JqZWN0fG51bGx9IHRvIGJlIHBhc3NlZCBpbiBhcyB0aGUgdmFsdWUgZm9yIGBhamF4YCBpbiBzZXR1cFNlbGVjdDJcbiAgICovXG4gIGdldEFydGljbGVTZWxlY3RvckFqYXgoKSB7XG4gICAgaWYgKHRoaXMuYXV0b2NvbXBsZXRlICE9PSAnbm9fYXV0b2NvbXBsZXRlJykge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGlzIGFqYXggY2FsbCBxdWVyaWVzIHRoZSBNZWRpYXdpa2kgQVBJIGZvciBhcnRpY2xlIG5hbWVcbiAgICAgICAqIHN1Z2dlc3Rpb25zIGdpdmVuIHRoZSBzZWFyY2ggdGVybSBpbnB1dGVkIGluIHRoZSBzZWxlY3Rvci5cbiAgICAgICAqIFdlIHVsdGltYXRlbHkgd2FudCB0byBtYWtlIHRoZSBlbmRwb2ludCBjb25maWd1cmFibGUgYmFzZWQgb24gd2hldGhlciB0aGV5IHdhbnQgcmVkaXJlY3RzXG4gICAgICAgKi9cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVybDogYGh0dHBzOi8vJHt0aGlzLnByb2plY3R9Lm9yZy93L2FwaS5waHBgLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAganNvbnBDYWxsYmFjazogJ2FydGljbGVTdWdnZXN0aW9uQ2FsbGJhY2snLFxuICAgICAgICBkYXRhOiBzZWFyY2ggPT4gdGhpcy5nZXRTZWFyY2hQYXJhbXMoc2VhcmNoLnRlcm0pLFxuICAgICAgICBwcm9jZXNzUmVzdWx0czogdGhpcy5wcm9jZXNzU2VhcmNoUmVzdWx0cy5iaW5kKHRoaXMpLFxuICAgICAgICBjYWNoZTogdHJ1ZVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHBhcmVudCBzZXR1cFByb2plY3RJbnB1dCBhbmQgdXBkYXRlcyB0aGUgdmlldyBpZiB2YWxpZGF0aW9ucyBwYXNzZWRcbiAgICogICByZXZlcnRpbmcgdG8gdGhlIG9sZCB2YWx1ZSBpZiB0aGUgbmV3IG9uZSBpcyBpbnZhbGlkXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdmFsaWRhdGVQcm9qZWN0KCkge1xuICAgIGlmIChzdXBlci52YWxpZGF0ZVByb2plY3QoKSkge1xuICAgICAgdGhpcy5yZXNldFZpZXcodHJ1ZSk7XG4gICAgICB0aGlzLmZvY3VzU2VsZWN0MigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmFsIHBsYWNlIHRvIGFkZCBwYWdlLXdpZGUgbGlzdGVuZXJzXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXR1cExpc3RlbmVycygpO1xuICAgICQoJyNwbGF0Zm9ybS1zZWxlY3QsICNhZ2VudC1zZWxlY3QnKS5vbignY2hhbmdlJywgdGhpcy5wcm9jZXNzSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgJCgnLnNvcnQtbGluaycpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc3Qgc29ydFR5cGUgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgndHlwZScpO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLnNvcnQgPT09IHNvcnRUeXBlID8gLXRoaXMuZGlyZWN0aW9uIDogMTtcbiAgICAgIHRoaXMuc29ydCA9IHNvcnRUeXBlO1xuICAgICAgdGhpcy51cGRhdGVUYWJsZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IHRoZSBBUEkgZm9yIGVhY2ggcGFnZSwgYnVpbGRpbmcgdXAgdGhlIGRhdGFzZXRzIGFuZCB0aGVuIGNhbGxpbmcgcmVuZGVyRGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlIC0gd2hldGhlciB0byBmb3JjZSB0aGUgY2hhcnQgdG8gcmUtcmVuZGVyLCBldmVuIGlmIG5vIHBhcmFtcyBoYXZlIGNoYW5nZWRcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluXG4gICAqL1xuICBwcm9jZXNzSW5wdXQoZm9yY2UpIHtcbiAgICB0aGlzLnB1c2hQYXJhbXMoKTtcblxuICAgIC8qKiBwcmV2ZW50IGR1cGxpY2F0ZSBxdWVyeWluZyBkdWUgdG8gY29uZmxpY3RpbmcgbGlzdGVuZXJzICovXG4gICAgaWYgKCFmb3JjZSAmJiAobG9jYXRpb24uc2VhcmNoID09PSB0aGlzLnBhcmFtcyAmJiB0aGlzLnByZXZDaGFydFR5cGUgPT09IHRoaXMuY2hhcnRUeXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucGFyYW1zID0gbG9jYXRpb24uc2VhcmNoO1xuXG4gICAgY29uc3QgZW50aXRpZXMgPSAkKGNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcpIHx8IFtdO1xuXG4gICAgaWYgKCFlbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc2V0VmlldygpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0SW5pdGlhbENoYXJ0VHlwZShlbnRpdGllcy5sZW5ndGgpO1xuXG4gICAgLy8gY2xlYXIgb3V0IG9sZCBlcnJvciBtZXNzYWdlcyB1bmxlc3MgdGhlIGlzIHRoZSBmaXJzdCB0aW1lIHJlbmRlcmluZyB0aGUgY2hhcnRcbiAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcblxuICAgIHRoaXMucHJldkNoYXJ0VHlwZSA9IHRoaXMuY2hhcnRUeXBlO1xuICAgIHRoaXMuZGVzdHJveUNoYXJ0KCk7XG4gICAgdGhpcy5zdGFydFNwaW5ueSgpOyAvLyBzaG93IHNwaW5ueSBhbmQgY2FwdHVyZSBhZ2FpbnN0IGZhdGFsIGVycm9yc1xuXG4gICAgLy8gV2UndmUgYWxyZWFkeSBnb3R0ZW4gZGF0YSBhYm91dCB0aGUgaW50aWFsIHNldCBvZiBwYWdlc1xuICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB3ZSBuZWVkIGFueSBwYWdlIG5hbWVzIGdpdmVuIHRvIGJlIG5vcm1hbGl6ZWQgd2hlbiB0aGUgYXBwIGZpcnN0IGxvYWRzXG4gICAgaWYgKHRoaXMuaW5pdGlhbFF1ZXJ5KSB7XG4gICAgICB0aGlzLmdldFBhZ2VWaWV3c0RhdGEoZW50aXRpZXMpLmRvbmUoeGhyRGF0YSA9PiB0aGlzLnVwZGF0ZUNoYXJ0KHhockRhdGEpKTtcbiAgICAgIC8vIHNldCBiYWNrIHRvIGZhbHNlIHNvIHdlIGdldCBwYWdlIGFuZCBlZGl0IGluZm8gZm9yIGFueSBuZXdseSBlbnRlcmVkIHBhZ2VzXG4gICAgICB0aGlzLmluaXRpYWxRdWVyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldFBhZ2VBbmRFZGl0SW5mbyhlbnRpdGllcykudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2V0UGFnZVZpZXdzRGF0YShlbnRpdGllcykuZG9uZSh4aHJEYXRhID0+IHRoaXMudXBkYXRlQ2hhcnQoeGhyRGF0YSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVGFibGUoKSB7XG4gICAgaWYgKHRoaXMub3V0cHV0RGF0YS5sZW5ndGggPT09IDEpIHJldHVybiAkKCcudGFibGUtdmlldycpLmhpZGUoKTtcblxuICAgICQoJy5vdXRwdXQtbGlzdCcpLmh0bWwoJycpO1xuXG4gICAgLyoqIHNvcnQgYXNjZW5kaW5nIGJ5IGN1cnJlbnQgc29ydCBzZXR0aW5nICovXG4gICAgY29uc3QgZGF0YXNldHMgPSB0aGlzLm91dHB1dERhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgYmVmb3JlID0gdGhpcy5nZXRTb3J0UHJvcGVydHkoYSwgdGhpcy5zb3J0KSxcbiAgICAgICAgYWZ0ZXIgPSB0aGlzLmdldFNvcnRQcm9wZXJ0eShiLCB0aGlzLnNvcnQpO1xuXG4gICAgICBpZiAoYmVmb3JlIDwgYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uO1xuICAgICAgfSBlbHNlIGlmIChiZWZvcmUgPiBhZnRlcikge1xuICAgICAgICByZXR1cm4gLXRoaXMuZGlyZWN0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcuc29ydC1saW5rIHNwYW4nKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQtYWx0IGdseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0JykuYWRkQ2xhc3MoJ2dseXBoaWNvbi1zb3J0Jyk7XG4gICAgY29uc3QgbmV3U29ydENsYXNzTmFtZSA9IHBhcnNlSW50KHRoaXMuZGlyZWN0aW9uLCAxMCkgPT09IDEgPyAnZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQtYWx0JyA6ICdnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldCc7XG4gICAgJChgLnNvcnQtbGluay0tJHt0aGlzLnNvcnR9IHNwYW5gKS5hZGRDbGFzcyhuZXdTb3J0Q2xhc3NOYW1lKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXNvcnQnKTtcblxuICAgIGxldCBoYXNQcm90ZWN0aW9uID0gZmFsc2U7XG4gICAgZGF0YXNldHMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChpdGVtLnByb3RlY3Rpb24gIT09ICQuaTE4bignbm9uZScpKSBoYXNQcm90ZWN0aW9uID0gdHJ1ZTtcblxuICAgICAgJCgnLm91dHB1dC1saXN0JykuYXBwZW5kKFxuICAgICAgICBgPHRyPlxuICAgICAgICAgPHRkIGNsYXNzPSd0YWJsZS12aWV3LS1jb2xvci1jb2wnPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPSd0YWJsZS12aWV3LS1jb2xvci1ibG9jaycgc3R5bGU9XCJiYWNrZ3JvdW5kOiR7aXRlbS5jb2xvcn1cIj48L3NwYW4+XG4gICAgICAgICA8L3RkPlxuICAgICAgICAgPHRkPiR7dGhpcy5nZXRQYWdlTGluayhpdGVtLmxhYmVsKX08L3RkPlxuICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS5zdW0pfTwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihpdGVtLmF2ZXJhZ2UpfTwvdGQ+XG4gICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihpdGVtLm51bV9lZGl0cyl9PC90ZD5cbiAgICAgICAgIDx0ZD4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0ubnVtX3VzZXJzKX08L3RkPlxuICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS5sZW5ndGgpfTwvdGQ+XG4gICAgICAgICA8dGQ+JHtpdGVtLnByb3RlY3Rpb259PC90ZD5cbiAgICAgICAgIDx0ZD4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0ud2F0Y2hlcnMpfTwvdGQ+XG4gICAgICAgICA8dGQ+XG4gICAgICAgICAgPGEgaHJlZj1cIiR7dGhpcy5nZXRMYW5ndmlld3NVUkwoaXRlbS5sYWJlbCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHskLmkxOG4oJ2FsbC1sYW5ndWFnZXMnKX08L2E+XG4gICAgICAgICAgJmJ1bGw7XG4gICAgICAgICAgPGEgaHJlZj1cIiR7dGhpcy5nZXRSZWRpcmVjdHZpZXdzVVJMKGl0ZW0ubGFiZWwpfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7JC5pMThuKCdyZWRpcmVjdHMnKX08L2E+XG4gICAgICAgICA8L3RkPlxuICAgICAgICAgPC90cj5gXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gaGlkZSBwcm90ZWN0aW9uIGNvbHVtbiBpZiBubyBwYWdlcyBhcmUgcHJvdGVjdGVkXG4gICAgJCgnLnRhYmxlLXZpZXctLXByb3RlY3Rpb24nKS50b2dnbGUoaGFzUHJvdGVjdGlvbik7XG5cbiAgICAkKCcudGFibGUtdmlldycpLnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmFsdWUgb2YgZ2l2ZW4gcGFnZSBmb3IgdGhlIHB1cnBvc2VzIG9mIGNvbHVtbiBzb3J0aW5nIGluIHRhYmxlIHZpZXdcbiAgICogQHBhcmFtICB7b2JqZWN0fSBpdGVtIC0gcGFnZSBuYW1lXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSAtIHR5cGUgb2YgcHJvcGVydHkgdG8gZ2V0XG4gICAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9IC0gdmFsdWVcbiAgICovXG4gIGdldFNvcnRQcm9wZXJ0eShpdGVtLCB0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAndGl0bGUnOlxuICAgICAgcmV0dXJuIGl0ZW0ubGFiZWw7XG4gICAgY2FzZSAndmlld3MnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLnN1bSk7XG4gICAgY2FzZSAnYXZlcmFnZSc6XG4gICAgICByZXR1cm4gTnVtYmVyKGl0ZW0uYXZlcmFnZSk7XG4gICAgY2FzZSAnZWRpdHMnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLm51bV9lZGl0cyk7XG4gICAgY2FzZSAnZWRpdG9ycyc6XG4gICAgICByZXR1cm4gTnVtYmVyKGl0ZW0ubnVtX3VzZXJzKTtcbiAgICBjYXNlICdzaXplJzpcbiAgICAgIHJldHVybiBOdW1iZXIoaXRlbS5sZW5ndGgpO1xuICAgIGNhc2UgJ3dhdGNoZXJzJzpcbiAgICAgIHJldHVybiBOdW1iZXIoaXRlbS53YXRjaGVycyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwYWdlIGluZm8gYW5kIGVkaXRpbmcgaW5mbyBvZiBnaXZlbiBwYWdlcy5cbiAgICogQWxzbyBzZXRzIHRoaXMuZW50aXR5SW5mb1xuICAgKiBAcGFyYW0gIHtBcnJheX0gcGFnZXMgLSBwYWdlIG5hbWVzXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHRoaXMuZW50aXR5SW5mb1xuICAgKi9cbiAgZ2V0UGFnZUFuZEVkaXRJbmZvKHBhZ2VzKSB7XG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgdGhpcy5nZXRQYWdlSW5mbyhwYWdlcykuZG9uZShkYXRhID0+IHtcbiAgICAgIHRoaXMuZW50aXR5SW5mbyA9IGRhdGE7XG4gICAgICAvLyB1c2UgT2JqZWN0LmtleXMoZGF0YSkgdG8gZ2V0IG5vcm1hbGl6ZWQgcGFnZSBuYW1lc1xuICAgICAgdGhpcy5nZXRFZGl0RGF0YShPYmplY3Qua2V5cyhkYXRhKSkuZG9uZShlZGl0RGF0YSA9PiB7XG4gICAgICAgIGZvciAobGV0IHBhZ2UgaW4gZWRpdERhdGEucGFnZXMpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZW50aXR5SW5mb1twYWdlLmRlc2NvcmUoKV0sIGVkaXREYXRhLnBhZ2VzW3BhZ2VdKTtcbiAgICAgICAgfVxuICAgICAgICBkZmQucmVzb2x2ZSh0aGlzLmVudGl0eUluZm8pO1xuICAgICAgfSkuZmFpbCgoKSA9PiB7XG4gICAgICAgIGRmZC5yZXNvbHZlKHRoaXMuZW50aXR5SW5mbyk7IC8vIHRyZWF0IGFzIGlmIHN1Y2Nlc3NmdWwsIHNpbXBseSB3b24ndCBzaG93IHRoZSBkYXRhXG4gICAgICB9KTtcbiAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgIGRmZC5yZXNvbHZlKHt9KTsgLy8gc2FtZSwgc2ltcGx5IHdvbid0IHNob3cgdGhlIGRhdGEgaWYgaXQgZmFpbGVkXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIFBhZ2VQaWxlIHdpdGggZ2l2ZW4gcGFnZXMgdXNpbmcgdGhlIEFQSSBhbmQgcmVkaXJlY3QgdG8gTWFzc3ZpZXdzLlxuICAgKiBUaGlzIGlzIHVzZWQgd2hlbiB0aGUgdXNlciBwYXNzZXMgaW4gbW9yZSB0aGFuIDEwIHBhZ2VzXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhZ2VzIC0gcGFnZXMgdG8gY29udmVydCB0byBhIFBhZ2VQaWxlIGFuZCBvcGVuIGluIE1hc3N2aWV3c1xuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2ZWQgb25seSBpZiBjcmVhdGlvbiBvZiBQYWdlUGlsZSBmYWlsZWRcbiAgICovXG4gIG1hc3N2aWV3c1JlZGlyZWN0V2l0aFBhZ2VQaWxlKHBhZ2VzKSB7XG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy8vdG9vbHMud21mbGFicy5vcmcvcGFnZXBpbGUvYXBpLnBocCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjdGlvbjogJ2NyZWF0ZV9waWxlX3dpdGhfZGF0YScsXG4gICAgICAgIHdpa2k6IHRoaXMuZGJOYW1lKHRoaXMucHJvamVjdCksXG4gICAgICAgIGRhdGE6IHBhZ2VzLmpvaW4oJ1xcbicpXG4gICAgICB9XG4gICAgfSkuc3VjY2VzcyhwaWxlRGF0YSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcygpO1xuICAgICAgZGVsZXRlIHBhcmFtcy5wcm9qZWN0O1xuICAgICAgZG9jdW1lbnQubG9jYXRpb24gPSBgL21hc3N2aWV3cz9vdmVyZmxvdz0xJiR7JC5wYXJhbShwYXJhbXMpfSZzb3VyY2U9cGFnZXBpbGUmdGFyZ2V0PSR7cGlsZURhdGEucGlsZS5pZH1gO1xuICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgLy8ganVzdCBncmFiIGZpcnN0IDEwIHBhZ2VzIGFuZCB0aHJvdyBhbiBlcnJvclxuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignYXV0by1wYWdlcGlsZS1lcnJvcicsICdQYWdlUGlsZScsIDEwKSxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICAgIGRmZC5yZXNvbHZlKHBhZ2VzLnNsaWNlKDAsIDEwKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgLyoqIGFzc3VtZSBoYXNoIHBhcmFtcyBhcmUgc3VwcG9zZWQgdG8gYmUgcXVlcnkgcGFyYW1zICovXG4gIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoICYmICFkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2gpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgnIycsICc/Jyk7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQubG9jYXRpb24uaGFzaCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9cXCMuKi8sICcnKTtcbiAgfVxuXG4gIG5ldyBQYWdlVmlld3MoKTtcbn0pO1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgY2hhcnQtc3BlY2lmaWMgbG9naWNcbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyoqXG4gKiBTaGFyZWQgY2hhcnQtc3BlY2lmaWMgbG9naWMsIHVzZWQgaW4gYWxsIGFwcHMgZXhjZXB0IFRvcHZpZXdzXG4gKiBAcGFyYW0ge2NsYXNzfSBzdXBlcmNsYXNzIC0gYmFzZSBjbGFzc1xuICogQHJldHVybnMge251bGx9IGNsYXNzIGV4dGVuZGluZyBzdXBlcmNsYXNzXG4gKi9cbmNvbnN0IENoYXJ0SGVscGVycyA9IHN1cGVyY2xhc3MgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcbiAgY29uc3RydWN0b3IoYXBwQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBwQ29uZmlnKTtcblxuICAgIHRoaXMuY2hhcnRPYmogPSBudWxsO1xuICAgIHRoaXMucHJldkNoYXJ0VHlwZSA9IG51bGw7XG4gICAgdGhpcy5hdXRvQ2hhcnRUeXBlID0gdHJ1ZTsgLy8gd2lsbCBiZWNvbWUgZmFsc2Ugd2hlbiB0aGV5IG1hbnVhbGx5IGNoYW5nZSB0aGUgY2hhcnQgdHlwZVxuXG4gICAgLyoqIGVuc3VyZSB3ZSBoYXZlIGEgdmFsaWQgY2hhcnQgdHlwZSBpbiBsb2NhbFN0b3JhZ2UsIHJlc3VsdCBvZiBDaGFydC5qcyAxLjAgdG8gMi4wIG1pZ3JhdGlvbiAqL1xuICAgIGNvbnN0IHN0b3JlZENoYXJ0VHlwZSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnKTtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmxpbmVhckNoYXJ0cy5pbmNsdWRlcyhzdG9yZWRDaGFydFR5cGUpICYmICF0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5pbmNsdWRlcyhzdG9yZWRDaGFydFR5cGUpKSB7XG4gICAgICB0aGlzLnNldExvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnLCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5jaGFydFR5cGUoKSk7XG4gICAgfVxuXG4gICAgLy8gbGVhdmUgaWYgdGhlcmUncyBubyBjaGFydCBjb25maWd1cmVkXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jaGFydCkgcmV0dXJuO1xuXG4gICAgLyoqIEB0eXBlIHtCb29sZWFufSBhZGQgYWJpbGl0eSB0byBkaXNhYmxlIGF1dG8tbG9nIGRldGVjdGlvbiAqL1xuICAgIHRoaXMubm9Mb2dTY2FsZSA9IGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnYXV0b2xvZz1mYWxzZScpO1xuXG4gICAgLyoqIGNvcHkgb3ZlciBhcHAtc3BlY2lmaWMgY2hhcnQgdGVtcGxhdGVzICovXG4gICAgdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmZvckVhY2gobGluZWFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbbGluZWFyQ2hhcnRdLm9wdHMubGVnZW5kVGVtcGxhdGUgPSB0aGlzLmNvbmZpZy5saW5lYXJMZWdlbmQ7XG4gICAgfSk7XG4gICAgdGhpcy5jb25maWcuY2lyY3VsYXJDaGFydHMuZm9yRWFjaChjaXJjdWxhckNoYXJ0ID0+IHtcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW2NpcmN1bGFyQ2hhcnRdLm9wdHMubGVnZW5kVGVtcGxhdGUgPSB0aGlzLmNvbmZpZy5jaXJjdWxhckxlZ2VuZDtcbiAgICB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24oQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLCB7YW5pbWF0aW9uOiBmYWxzZSwgcmVzcG9uc2l2ZTogdHJ1ZX0pO1xuXG4gICAgLyoqIGNoYW5naW5nIG9mIGNoYXJ0IHR5cGVzICovXG4gICAgJCgnLm1vZGFsLWNoYXJ0LXR5cGUgYScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFydFR5cGUgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgndHlwZScpO1xuICAgICAgdGhpcy5hdXRvQ2hhcnRUeXBlID0gZmFsc2U7XG5cbiAgICAgICQoJy5sb2dhcml0aG1pYy1zY2FsZScpLnRvZ2dsZSh0aGlzLmlzTG9nYXJpdGhtaWNDYXBhYmxlKCkpO1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGUodGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKSk7XG5cbiAgICAgIGlmICh0aGlzLnJlbWVtYmVyQ2hhcnQgPT09ICd0cnVlJykge1xuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnLCB0aGlzLmNoYXJ0VHlwZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuYXV0b0xvZ0RldGVjdGlvbiA9ICdmYWxzZSc7XG4gICAgICB0aGlzLmlzQ2hhcnRBcHAoKSA/IHRoaXMudXBkYXRlQ2hhcnQodGhpcy5wYWdlVmlld3NEYXRhKSA6IHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogZGlzYWJsZWQvZW5hYmxlIGJlZ2luIGF0IHplcm8gY2hlY2tib3ggYWNjb3JkaW5nbHksXG4gICAgICogYnV0IGRvbid0IHVwZGF0ZSBjaGFydCBzaW5jZSB0aGUgbG9nIHNjYWxlIHZhbHVlIGNhbiBjaGFuZ2UgcHJhZ21hdGljYWxseSBhbmQgbm90IGZyb20gdXNlciBpbnB1dFxuICAgICAqL1xuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICQoJy5iZWdpbi1hdC16ZXJvJykudG9nZ2xlQ2xhc3MoJ2Rpc2FibGVkJywgdGhpcy5jaGVja2VkKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmJlZ2luQXRaZXJvID09PSAndHJ1ZScpIHtcbiAgICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICAkKCcuYmVnaW4tYXQtemVyby1vcHRpb24nKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmlzQ2hhcnRBcHAoKSA/IHRoaXMudXBkYXRlQ2hhcnQodGhpcy5wYWdlVmlld3NEYXRhKSA6IHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgLyoqIGNoYXJ0IGRvd25sb2FkIGxpc3RlbmVycyAqL1xuICAgICQoJy5kb3dubG9hZC1wbmcnKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydFBORy5iaW5kKHRoaXMpKTtcbiAgICAkKCcucHJpbnQtY2hhcnQnKS5vbignY2xpY2snLCB0aGlzLnByaW50Q2hhcnQuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IGNoYXJ0IHR5cGUgb3IgdGhlIG9uZSBmcm9tIGxvY2FsU3RvcmFnZSwgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtudW1EYXRhc2V0c10gLSBudW1iZXIgb2YgZGF0YXNldHNcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldEluaXRpYWxDaGFydFR5cGUobnVtRGF0YXNldHMgPSAxKSB7XG4gICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5jaGFydFR5cGUobnVtRGF0YXNldHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgcHJldmlvdXMgY2hhcnQsIGlmIG5lZWRlZC5cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGRlc3Ryb3lDaGFydCgpIHtcbiAgICBpZiAodGhpcy5jaGFydE9iaikge1xuICAgICAgdGhpcy5jaGFydE9iai5kZXN0cm95KCk7XG4gICAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIENTViBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBXaXRoIHRoZSBwcmVwZW5kZWQgZGF0YTp0ZXh0L2NzdiB0aGlzIHNob3VsZCBjYXVzZSB0aGUgYnJvd3NlciB0byBkb3dubG9hZCB0aGUgZGF0YVxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZXhwb3J0Q1NWKCkge1xuICAgIGxldCBjc3ZDb250ZW50ID0gJ2RhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCxEYXRlLCc7XG4gICAgbGV0IHRpdGxlcyA9IFtdO1xuICAgIGxldCBkYXRhUm93cyA9IFtdO1xuICAgIGxldCBkYXRlcyA9IHRoaXMuZ2V0RGF0ZUhlYWRpbmdzKGZhbHNlKTtcblxuICAgIC8vIEJlZ2luIGNvbnN0cnVjdGluZyB0aGUgZGF0YVJvd3MgYXJyYXkgYnkgcG9wdWxhdGluZyBpdCB3aXRoIHRoZSBkYXRlc1xuICAgIGRhdGVzLmZvckVhY2goKGRhdGUsIGluZGV4KSA9PiB7XG4gICAgICBkYXRhUm93c1tpbmRleF0gPSBbZGF0ZV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmNoYXJ0T2JqLmRhdGEuZGF0YXNldHMuZm9yRWFjaChzaXRlID0+IHtcbiAgICAgIC8vIEJ1aWxkIGFuIGFycmF5IG9mIHNpdGUgdGl0bGVzIGZvciB1c2UgaW4gdGhlIENTViBoZWFkZXJcbiAgICAgIGxldCBzaXRlVGl0bGUgPSAnXCInICsgc2l0ZS5sYWJlbC5yZXBsYWNlKC9cIi9nLCAnXCJcIicpICsgJ1wiJztcbiAgICAgIHRpdGxlcy5wdXNoKHNpdGVUaXRsZSk7XG5cbiAgICAgIC8vIFBvcHVsYXRlIHRoZSBkYXRhUm93cyBhcnJheSB3aXRoIHRoZSBkYXRhIGZvciB0aGlzIHNpdGVcbiAgICAgIGRhdGVzLmZvckVhY2goKGRhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGRhdGFSb3dzW2luZGV4XS5wdXNoKHNpdGUuZGF0YVtpbmRleF0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBGaW5pc2ggdGhlIENTViBoZWFkZXJcbiAgICBjc3ZDb250ZW50ID0gY3N2Q29udGVudCArIHRpdGxlcy5qb2luKCcsJykgKyAnXFxuJztcblxuICAgIC8vIEFkZCB0aGUgcm93cyB0byB0aGUgQ1NWXG4gICAgZGF0YVJvd3MuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIGNzdkNvbnRlbnQgKz0gZGF0YS5qb2luKCcsJykgKyAnXFxuJztcbiAgICB9KTtcblxuICAgIHRoaXMuZG93bmxvYWREYXRhKGNzdkNvbnRlbnQsICdjc3YnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIGN1cnJlbnQgY2hhcnQgZGF0YSB0byBKU09OIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRKU09OKCkge1xuICAgIGxldCBkYXRhID0gW107XG5cbiAgICB0aGlzLmNoYXJ0T2JqLmRhdGEuZGF0YXNldHMuZm9yRWFjaCgocGFnZSwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBlbnRyeSA9IHtcbiAgICAgICAgcGFnZTogcGFnZS5sYWJlbC5yZXBsYWNlKC9cIi9nLCAnXFxcIicpLnJlcGxhY2UoLycvZywgXCJcXCdcIiksXG4gICAgICAgIGNvbG9yOiBwYWdlLnN0cm9rZUNvbG9yLFxuICAgICAgICBzdW06IHBhZ2Uuc3VtLFxuICAgICAgICBkYWlseV9hdmVyYWdlOiBNYXRoLnJvdW5kKHBhZ2Uuc3VtIC8gdGhpcy5udW1EYXlzSW5SYW5nZSgpKVxuICAgICAgfTtcblxuICAgICAgdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpLmZvckVhY2goKGhlYWRpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGVudHJ5W2hlYWRpbmcucmVwbGFjZSgvXFxcXC8sJycpXSA9IHBhZ2UuZGF0YVtpbmRleF07XG4gICAgICB9KTtcblxuICAgICAgZGF0YS5wdXNoKGVudHJ5KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGpzb25Db250ZW50ID0gJ2RhdGE6dGV4dC9qc29uO2NoYXJzZXQ9dXRmLTgsJyArIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIHRoaXMuZG93bmxvYWREYXRhKGpzb25Db250ZW50LCAnanNvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBkYXRhIGFzIFBORyBpbWFnZSwgb3BlbmluZyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGV4cG9ydFBORygpIHtcbiAgICB0aGlzLmRvd25sb2FkRGF0YSh0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKSwgJ3BuZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIHplcm8gdmFsdWUgdG8gYSB0aW1lc2VyaWVzLCBzZWU6XG4gICAqIGh0dHBzOi8vd2lraXRlY2gud2lraW1lZGlhLm9yZy93aWtpL0FuYWx5dGljcy9BUVMvUGFnZXZpZXdfQVBJI0dvdGNoYXNcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgZmV0Y2hlZCBmcm9tIEFQSVxuICAgKiBAcGFyYW0ge21vbWVudH0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZSBvZiByYW5nZSB0byBmaWx0ZXIgdGhyb3VnaFxuICAgKiBAcGFyYW0ge21vbWVudH0gZW5kRGF0ZSAtIGVuZCBkYXRlIG9mIHJhbmdlXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGRhdGFzZXQgd2l0aCB6ZXJvcyB3aGVyZSBudWxscyB3aGVyZVxuICAgKi9cbiAgZmlsbEluWmVyb3MoZGF0YSwgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgLyoqIEV4dHJhY3QgdGhlIGRhdGVzIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIHRpbWVzZXJpZXMgKi9cbiAgICBsZXQgYWxyZWFkeVRoZXJlID0ge307XG4gICAgZGF0YS5pdGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgbGV0IGRhdGUgPSBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCk7XG4gICAgICBhbHJlYWR5VGhlcmVbZGF0ZV0gPSBlbGVtO1xuICAgIH0pO1xuICAgIGRhdGEuaXRlbXMgPSBbXTtcblxuICAgIC8qKiBSZWNvbnN0cnVjdCB3aXRoIHplcm9zIGluc3RlYWQgb2YgbnVsbHMgKi9cbiAgICBmb3IgKGxldCBkYXRlID0gbW9tZW50KHN0YXJ0RGF0ZSk7IGRhdGUgPD0gZW5kRGF0ZTsgZGF0ZS5hZGQoMSwgJ2QnKSkge1xuICAgICAgaWYgKGFscmVhZHlUaGVyZVtkYXRlXSkge1xuICAgICAgICBkYXRhLml0ZW1zLnB1c2goYWxyZWFkeVRoZXJlW2RhdGVdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVkZ2VDYXNlID0gZGF0ZS5pc1NhbWUodGhpcy5jb25maWcubWF4RGF0ZSkgfHwgZGF0ZS5pc1NhbWUobW9tZW50KHRoaXMuY29uZmlnLm1heERhdGUpLnN1YnRyYWN0KDEsICdkYXlzJykpO1xuICAgICAgICBkYXRhLml0ZW1zLnB1c2goe1xuICAgICAgICAgIHRpbWVzdGFtcDogZGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KSxcbiAgICAgICAgICBbdGhpcy5pc1BhZ2V2aWV3cygpID8gJ3ZpZXdzJyA6ICdkZXZpY2VzJ106IGVkZ2VDYXNlID8gbnVsbCA6IDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGEgZm9ybWF0dGVkIGZvciBDaGFydC5qcyBhbmQgdGhlIGxlZ2VuZCB0ZW1wbGF0ZXNcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YXNldHMgLSBhcyByZXRyaWV2ZWQgYnkgZ2V0UGFnZVZpZXdzRGF0YVxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIHJlYWR5IGZvciBjaGFydCByZW5kZXJpbmdcbiAgICovXG4gIGJ1aWxkQ2hhcnREYXRhKGRhdGFzZXRzKSB7XG4gICAgY29uc3QgbGFiZWxzID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnZhbCgpO1xuXG4gICAgLyoqIHByZXNlcnZlIG9yZGVyIG9mIGRhdGFzZXRzIGR1ZSB0byBhc3luYyBjYWxscyAqL1xuICAgIHJldHVybiBkYXRhc2V0cy5tYXAoKGRhdGFzZXQsIGluZGV4KSA9PiB7XG4gICAgICAvKiogQnVpbGQgdGhlIGFydGljbGUncyBkYXRhc2V0LiAqL1xuICAgICAgY29uc3QgdmFsdWVzID0gZGF0YXNldC5tYXAoZWxlbSA9PiB0aGlzLmlzUGFnZXZpZXdzKCkgPyBlbGVtLnZpZXdzIDogZWxlbS5kZXZpY2VzKSxcbiAgICAgICAgc3VtID0gdmFsdWVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpLFxuICAgICAgICBhdmVyYWdlID0gTWF0aC5yb3VuZChzdW0gLyB2YWx1ZXMubGVuZ3RoKSxcbiAgICAgICAgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKSxcbiAgICAgICAgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKSxcbiAgICAgICAgY29sb3IgPSB0aGlzLmNvbmZpZy5jb2xvcnNbaW5kZXggJSAxMF0sXG4gICAgICAgIGxhYmVsID0gbGFiZWxzW2luZGV4XS5kZXNjb3JlKCk7XG5cbiAgICAgIGNvbnN0IGVudGl0eUluZm8gPSB0aGlzLmVudGl0eUluZm8gPyB0aGlzLmVudGl0eUluZm9bbGFiZWxdIDoge307XG5cbiAgICAgIGRhdGFzZXQgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGRhdGE6IHZhbHVlcyxcbiAgICAgICAgdmFsdWU6IHN1bSwgLy8gZHVwbGljYXRlZCBiZWNhdXNlIENoYXJ0LmpzIHdhbnRzIGEgc2luZ2xlIGB2YWx1ZWAgZm9yIGNpcmN1bGFyIGNoYXJ0c1xuICAgICAgICBzdW0sXG4gICAgICAgIGF2ZXJhZ2UsXG4gICAgICAgIG1heCxcbiAgICAgICAgbWluLFxuICAgICAgICBjb2xvclxuICAgICAgfSwgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQoY29sb3IpLCBlbnRpdHlJbmZvKTtcblxuICAgICAgaWYgKHRoaXMuaXNMb2dhcml0aG1pYygpKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9IGRhdGFzZXQuZGF0YS5tYXAodmlldyA9PiB2aWV3IHx8IG51bGwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YXNldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdXJsIHRvIHF1ZXJ5IHRoZSBBUEkgYmFzZWQgb24gYXBwIGFuZCBvcHRpb25zXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRpdHkgLSBuYW1lIG9mIGVudGl0eSB3ZSdyZSBxdWVyeWluZyBmb3IgKHBhZ2UgbmFtZSBvciBwcm9qZWN0IG5hbWUpXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgVVJMXG4gICAqL1xuICBnZXRBcGlVcmwoZW50aXR5LCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICBjb25zdCB1cmlFbmNvZGVkRW50aXR5TmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChlbnRpdHkpO1xuXG4gICAgaWYgKHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJykge1xuICAgICAgcmV0dXJuIHRoaXMuaXNQYWdldmlld3MoKSA/IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3BhZ2V2aWV3cy9hZ2dyZWdhdGUvJHt1cmlFbmNvZGVkRW50aXR5TmFtZX1gICtcbiAgICAgICAgYC8keyQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCl9LyR7JCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICkgOiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy91bmlxdWUtZGV2aWNlcy8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfS8keyQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCl9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL3Blci1hcnRpY2xlLyR7dGhpcy5wcm9qZWN0fWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW90aGVyIGZ1bmN0aW9uIGZvciBxdWVyeWluZyB0aGUgQVBJIGFuZCBwcm9jZXNzaW5nIGRhdGFcbiAgICogQHBhcmFtICB7QXJyYXl9ICBlbnRpdGllcyAtIGxpc3Qgb2YgcGFnZSBuYW1lcywgb3IgcHJvamVjdHMgZm9yIFNpdGV2aWV3c1xuICAgKiBAcmV0dXJuIHtEZWZlcnJlZH0gUHJvbWlzZSByZXNvbHZpbmcgd2l0aCBwYWdldmlld3MgZGF0YSBhbmQgZXJyb3JzLCBpZiBwcmVzZW50XG4gICAqL1xuICBnZXRQYWdlVmlld3NEYXRhKGVudGl0aWVzKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKSwgY291bnQgPSAwLCBmYWlsdXJlUmV0cmllcyA9IHt9LFxuICAgICAgdG90YWxSZXF1ZXN0Q291bnQgPSBlbnRpdGllcy5sZW5ndGgsIGZhaWxlZEVudGl0aWVzID0gW107XG5cbiAgICAvKiogQHR5cGUge09iamVjdH0gZXZlcnl0aGluZyB3ZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgZm9yIHRoZSBwcm9taXNlcyAqL1xuICAgIGxldCB4aHJEYXRhID0ge1xuICAgICAgZW50aXRpZXMsXG4gICAgICBsYWJlbHM6IFtdLCAvLyBMYWJlbHMgKGRhdGVzKSBmb3IgdGhlIHgtYXhpcy5cbiAgICAgIGRhdGFzZXRzOiBbXSwgLy8gRGF0YSBmb3IgZWFjaCBhcnRpY2xlIHRpbWVzZXJpZXNcbiAgICAgIGVycm9yczogW10sIC8vIFF1ZXVlIHVwIGVycm9ycyB0byBzaG93IGFmdGVyIGFsbCByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZVxuICAgICAgZmF0YWxFcnJvcnM6IFtdLCAvLyBVbnJlY292ZXJhYmxlIEphdmFTY3JpcHQgZXJyb3JzXG4gICAgICBwcm9taXNlczogW11cbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZVJlcXVlc3QgPSAoZW50aXR5LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICBlbmREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5zdGFydE9mKCdkYXknKSxcbiAgICAgICAgdXJsID0gdGhpcy5nZXRBcGlVcmwoZW50aXR5LCBzdGFydERhdGUsIGVuZERhdGUpLFxuICAgICAgICBwcm9taXNlID0gJC5hamF4KHsgdXJsLCBkYXRhVHlwZTogJ2pzb24nIH0pO1xuXG4gICAgICB4aHJEYXRhLnByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShzdWNjZXNzRGF0YSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3VjY2Vzc0RhdGEgPSB0aGlzLmZpbGxJblplcm9zKHN1Y2Nlc3NEYXRhLCBzdGFydERhdGUsIGVuZERhdGUpO1xuXG4gICAgICAgICAgeGhyRGF0YS5kYXRhc2V0cy5wdXNoKHN1Y2Nlc3NEYXRhLml0ZW1zKTtcblxuICAgICAgICAgIC8qKiBmZXRjaCB0aGUgbGFiZWxzIGZvciB0aGUgeC1heGlzIG9uIHN1Y2Nlc3MgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5ICovXG4gICAgICAgICAgaWYgKHN1Y2Nlc3NEYXRhLml0ZW1zICYmICF4aHJEYXRhLmxhYmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHhockRhdGEubGFiZWxzID0gc3VjY2Vzc0RhdGEuaXRlbXMubWFwKGVsZW0gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KGVsZW0udGltZXN0YW1wLCB0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4geGhyRGF0YS5mYXRhbEVycm9ycy5wdXNoKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoZXJyb3JEYXRhID0+IHtcbiAgICAgICAgLyoqIGZpcnN0IGRldGVjdCBpZiB0aGlzIHdhcyBhIENhc3NhbmRyYSBiYWNrZW5kIGVycm9yLCBhbmQgaWYgc28sIHNjaGVkdWxlIGEgcmUtdHJ5ICovXG4gICAgICAgIGNvbnN0IGNhc3NhbmRyYUVycm9yID0gZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZSA9PT0gJ0Vycm9yIGluIENhc3NhbmRyYSB0YWJsZSBzdG9yYWdlIGJhY2tlbmQnO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1tlbnRpdHldKSB7XG4gICAgICAgICAgICBmYWlsdXJlUmV0cmllc1tlbnRpdHldKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKiBtYXhpbXVtIG9mIDMgcmV0cmllcyAqL1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1tlbnRpdHldIDwgMykge1xuICAgICAgICAgICAgdG90YWxSZXF1ZXN0Q291bnQrKztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhdGVMaW1pdChtYWtlUmVxdWVzdCwgdGhpcy5jb25maWcuYXBpVGhyb3R0bGUsIHRoaXMpKGVudGl0eSwgaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGlzIGFydGljbGUgZnJvbSB0aGUgbGlzdCBvZiBlbnRpdGllcyB0byBhbmFseXplXG4gICAgICAgIHhockRhdGEuZW50aXRpZXMgPSB4aHJEYXRhLmVudGl0aWVzLmZpbHRlcihlbCA9PiBlbCAhPT0gZW50aXR5KTtcblxuICAgICAgICBpZiAoY2Fzc2FuZHJhRXJyb3IpIHtcbiAgICAgICAgICBmYWlsZWRFbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGxpbmsgPSB0aGlzLmFwcCA9PT0gJ3NpdGV2aWV3cycgPyB0aGlzLmdldFNpdGVMaW5rKGVudGl0eSkgOiB0aGlzLmdldFBhZ2VMaW5rKGVudGl0eSwgdGhpcy5wcm9qZWN0KTtcbiAgICAgICAgICB4aHJEYXRhLmVycm9ycy5wdXNoKFxuICAgICAgICAgICAgYCR7bGlua306ICR7JC5pMThuKCdhcGktZXJyb3InLCAnUGFnZXZpZXdzIEFQSScpfSAtICR7ZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSkuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgaWYgKCsrY291bnQgPT09IHRvdGFsUmVxdWVzdENvdW50KSB7XG4gICAgICAgICAgdGhpcy5wYWdlVmlld3NEYXRhID0geGhyRGF0YTtcbiAgICAgICAgICBkZmQucmVzb2x2ZSh4aHJEYXRhKTtcblxuICAgICAgICAgIGlmIChmYWlsZWRFbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bihcbiAgICAgICAgICAgICAgJ2FwaS1lcnJvci10aW1lb3V0JyxcbiAgICAgICAgICAgICAgJzx1bD4nICtcbiAgICAgICAgICAgICAgZmFpbGVkRW50aXRpZXMubWFwKGZhaWxlZEVudGl0eSA9PiBgPGxpPiR7dGhpcy5nZXRQYWdlTGluayhmYWlsZWRFbnRpdHksIHRoaXMucHJvamVjdC5lc2NhcGUoKSl9PC9saT5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAgICc8L3VsPidcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGVudGl0aWVzLmZvckVhY2goKGVudGl0eSwgaW5kZXgpID0+IG1ha2VSZXF1ZXN0KGVudGl0eSwgaW5kZXgpKTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhcmFtcyBuZWVkZWQgdG8gY3JlYXRlIGEgcGVybWFuZW50IGxpbmsgb2YgdmlzaWJsZSBkYXRhXG4gICAqIEByZXR1cm4ge09iamVjdH0gaGFzaCBvZiBwYXJhbXNcbiAgICovXG4gIGdldFBlcm1hTGluaygpIHtcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMoZmFsc2UpO1xuICAgIGRlbGV0ZSBwYXJhbXMucmFuZ2U7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgY3VycmVudGx5IGluIGxvZ2FyaXRobWljIG1vZGU/XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc0xvZ2FyaXRobWljKCkge1xuICAgIHJldHVybiAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLmlzKCc6Y2hlY2tlZCcpICYmIHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIHRoZSBjdXJyZW50IGNoYXJ0IHR5cGUgc3VwcG9ydHMgYSBsb2dhcml0aG1pYyBzY2FsZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gbG9nLWZyaWVuZGx5IG9yIG5vdFxuICAgKi9cbiAgaXNMb2dhcml0aG1pY0NhcGFibGUoKSB7XG4gICAgcmV0dXJuIFsnbGluZScsICdiYXInXS5pbmNsdWRlcyh0aGlzLmNoYXJ0VHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNQYWdldmlld3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwID09PSAncGFnZXZpZXdzJyB8fCAkKHRoaXMuY29uZmlnLmRhdGFTb3VyY2VTZWxlY3RvcikudmFsKCkgPT09ICdwYWdldmlld3MnO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSB0cnlpbmcgdG8gc2hvdyBkYXRhIG9uIHBhZ2V2aWV3cyAoYXMgb3Bwb3NlZCB0byB1bmlxdWUgZGV2aWNlcyk/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzVW5pcXVlRGV2aWNlcygpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNQYWdldmlld3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmludCB0aGUgY2hhcnQhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBwcmludENoYXJ0KCkge1xuICAgIGxldCB0YWIgPSB3aW5kb3cub3BlbigpO1xuICAgIHRhYi5kb2N1bWVudC53cml0ZShcbiAgICAgIGA8aW1nIHNyYz1cIiR7dGhpcy5jaGFydE9iai50b0Jhc2U2NEltYWdlKCl9XCIgLz5gXG4gICAgKTtcbiAgICB0YWIucHJpbnQoKTtcbiAgICB0YWIuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoYXJ0LCBtZXNzYWdlcywgYW5kIHJlc2V0cyBzaXRlIHNlbGVjdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbc2VsZWN0Ml0gd2hldGhlciBvciBub3QgdG8gY2xlYXIgdGhlIFNlbGVjdDIgaW5wdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlc2V0VmlldyhzZWxlY3QyID0gZmFsc2UpIHtcbiAgICB0cnkge1xuICAgICAgLyoqIHRoZXNlIGNhbiBmYWlsIHNvbWV0aW1lcyAqL1xuICAgICAgdGhpcy5kZXN0cm95Q2hhcnQoKTtcbiAgICAgIGlmIChzZWxlY3QyKSB0aGlzLnJlc2V0U2VsZWN0MigpO1xuICAgIH0gY2F0Y2ggKGUpIHsgLy8gbm90aGluZ1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnN0b3BTcGlubnkoKTtcbiAgICAgICQoJy5kYXRhLWxpbmtzJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5jaGFydCkuaGlkZSgpO1xuICAgICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHQgdG8gZmluZS10dW5lIHRoZSBwb2ludGVyIGRldGVjdGlvbiBzcGFjaW5nIGJhc2VkIG9uIGhvdyBjbHV0dGVyZWQgdGhlIGNoYXJ0IGlzXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHJhZGl1c1xuICAgKi9cbiAgc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpIHtcbiAgICBpZiAodGhpcy5jaGFydFR5cGUgIT09ICdsaW5lJykgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMubnVtRGF5c0luUmFuZ2UoKSA+IDUwKSB7XG4gICAgICBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuaGl0UmFkaXVzID0gMztcbiAgICB9IGVsc2UgaWYgKHRoaXMubnVtRGF5c0luUmFuZ2UoKSA+IDMwKSB7XG4gICAgICBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuaGl0UmFkaXVzID0gNTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubnVtRGF5c0luUmFuZ2UoKSA+IDIwKSB7XG4gICAgICBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuaGl0UmFkaXVzID0gMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIGlmIHdlIHNob3VsZCBzaG93IGEgbG9nYXJpdGhtaWMgY2hhcnQgZm9yIHRoZSBnaXZlbiBkYXRhc2V0LCBiYXNlZCBvbiBUaGVpbCBpbmRleFxuICAgKiBAcGFyYW0gIHtBcnJheX0gZGF0YXNldHMgLSBwYWdldmlld3NcbiAgICogQHJldHVybiB7Qm9vbGVhbn0geWVzIG9yIG5vXG4gICAqL1xuICBzaG91bGRCZUxvZ2FyaXRobWljKGRhdGFzZXRzKSB7XG4gICAgaWYgKCF0aGlzLmlzTG9nYXJpdGhtaWNDYXBhYmxlKCkgfHwgdGhpcy5ub0xvZ1NjYWxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHNldHMgPSBbXTtcbiAgICAvLyBjb252ZXJ0IE5hTnMgYW5kIG51bGxzIHRvIHplcm9zXG4gICAgZGF0YXNldHMuZm9yRWFjaChkYXRhc2V0ID0+IHtcbiAgICAgIHNldHMucHVzaChkYXRhc2V0Lm1hcCh2YWwgPT4gdmFsIHx8IDApKTtcbiAgICB9KTtcblxuICAgIC8vIG92ZXJhbGwgbWF4IHZhbHVlXG4gICAgY29uc3QgbWF4VmFsdWUgPSBNYXRoLm1heCguLi5bXS5jb25jYXQoLi4uc2V0cykpO1xuXG4gICAgaWYgKG1heFZhbHVlIDw9IDEwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgbG9nYXJpdGhtaWNOZWVkZWQgPSBmYWxzZTtcblxuICAgIHNldHMuZm9yRWFjaChzZXQgPT4ge1xuICAgICAgc2V0LnB1c2gobWF4VmFsdWUpO1xuXG4gICAgICBjb25zdCBzdW0gPSBzZXQucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBzdW0gLyBzZXQubGVuZ3RoO1xuICAgICAgbGV0IHRoZWlsID0gMDtcbiAgICAgIHNldC5mb3JFYWNoKHYgPT4gdGhlaWwgKz0gdiA/IHYgKiBNYXRoLmxvZyh2IC8gYXZlcmFnZSkgOiAwKTtcblxuICAgICAgaWYgKHRoZWlsIC8gc3VtID4gMC41KSB7XG4gICAgICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbG9nYXJpdGhtaWNOZWVkZWQ7XG4gIH1cblxuICAvKipcbiAgICogc2V0cyB1cCB0aGUgZGF0ZXJhbmdlIHNlbGVjdG9yIGFuZCBhZGRzIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cERhdGVSYW5nZVNlbGVjdG9yKCkge1xuICAgIHN1cGVyLnNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKTtcblxuICAgIC8qKiBwcmV2ZW50IGR1cGxpY2F0ZSBzZXR1cCBzaW5jZSB0aGUgbGlzdCB2aWV3IGFwcHMgYWxzbyB1c2UgY2hhcnRzICovXG4gICAgaWYgKCF0aGlzLmlzQ2hhcnRBcHAoKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZGF0ZVJhbmdlU2VsZWN0b3IgPSAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKTtcblxuICAgIC8qKiB0aGUgXCJMYXRlc3QgTiBkYXlzXCIgbGlua3MgKi9cbiAgICAkKCcuZGF0ZS1sYXRlc3QgYScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UoYGxhdGVzdC0keyQoZS50YXJnZXQpLmRhdGEoJ3ZhbHVlJyl9YCk7XG4gICAgfSk7XG5cbiAgICBkYXRlUmFuZ2VTZWxlY3Rvci5vbignY2hhbmdlJywgZSA9PiB7XG4gICAgICB0aGlzLnNldENoYXJ0UG9pbnREZXRlY3Rpb25SYWRpdXMoKTtcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG5cbiAgICAgIC8qKiBjbGVhciBvdXQgc3BlY2lhbFJhbmdlIGlmIGl0IGRvZXNuJ3QgbWF0Y2ggb3VyIGlucHV0ICovXG4gICAgICBpZiAodGhpcy5zcGVjaWFsUmFuZ2UgJiYgdGhpcy5zcGVjaWFsUmFuZ2UudmFsdWUgIT09IGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGNoYXJ0IHdpdGggZGF0YSBwcm92aWRlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcGFyYW0ge09iamVjdH0geGhyRGF0YSAtIGRhdGEgYXMgY29uc3RydWN0ZWQgYnkgcHJvY2Vzc0lucHV0KClcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluXG4gICAqL1xuICB1cGRhdGVDaGFydCh4aHJEYXRhKSB7XG4gICAgJCgnLmNoYXJ0LWxlZ2VuZCcpLmh0bWwoJycpOyAvLyBjbGVhciBvbGQgY2hhcnQgbGVnZW5kXG5cbiAgICAvLyBzaG93IHBlbmRpbmcgZXJyb3IgbWVzc2FnZXMgaWYgcHJlc2VudCwgZXhpdGluZyBpZiBmYXRhbFxuICAgIGlmICh0aGlzLnNob3dFcnJvcnMoeGhyRGF0YSkpIHJldHVybjtcblxuICAgIGlmICgheGhyRGF0YS5lbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3BTcGlubnkoKTtcbiAgICB9IGVsc2UgaWYgKHhockRhdGEuZW50aXRpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAkKCcubXVsdGktcGFnZS1jaGFydC1ub2RlJykuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcubXVsdGktcGFnZS1jaGFydC1ub2RlJykuc2hvdygpO1xuICAgIH1cblxuICAgIHRoaXMub3V0cHV0RGF0YSA9IHRoaXMuYnVpbGRDaGFydERhdGEoeGhyRGF0YS5kYXRhc2V0cywgeGhyRGF0YS5lbnRpdGllcyk7XG5cbiAgICBpZiAodGhpcy5hdXRvTG9nRGV0ZWN0aW9uID09PSAndHJ1ZScpIHtcbiAgICAgIGNvbnN0IHNob3VsZEJlTG9nYXJpdGhtaWMgPSB0aGlzLnNob3VsZEJlTG9nYXJpdGhtaWModGhpcy5vdXRwdXREYXRhLm1hcChzZXQgPT4gc2V0LmRhdGEpKTtcbiAgICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkucHJvcCgnY2hlY2tlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBzaG91bGRCZUxvZ2FyaXRobWljKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7c2NhbGVzOiB7fX0sXG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0ub3B0cyxcbiAgICAgIHRoaXMuY29uZmlnLmdsb2JhbENoYXJ0T3B0c1xuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5zY2FsZXMsIHtcbiAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgdHlwZTogJ2xvZ2FyaXRobWljJyxcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgY2FsbGJhY2s6ICh2YWx1ZSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZW1haW4gPSB2YWx1ZSAvIChNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihDaGFydC5oZWxwZXJzLmxvZzEwKHZhbHVlKSkpKTtcblxuICAgICAgICAgICAgICBpZiAocmVtYWluID09PSAxIHx8IHJlbWFpbiA9PT0gMiB8fCByZW1haW4gPT09IDUgfHwgaW5kZXggPT09IDAgfHwgaW5kZXggPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3BTcGlubnkoKTtcblxuICAgIHRyeSB7XG4gICAgICAkKCcuY2hhcnQtY29udGFpbmVyJykuaHRtbCgnJykuYXBwZW5kKFwiPGNhbnZhcyBjbGFzcz0nYXFzLWNoYXJ0Jz5cIik7XG4gICAgICB0aGlzLnNldENoYXJ0UG9pbnREZXRlY3Rpb25SYWRpdXMoKTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAkKHRoaXMuY29uZmlnLmNoYXJ0KVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKSkge1xuICAgICAgICBjb25zdCBsaW5lYXJEYXRhID0ge2xhYmVsczogeGhyRGF0YS5sYWJlbHMsIGRhdGFzZXRzOiB0aGlzLm91dHB1dERhdGF9O1xuXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ3JhZGFyJykge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGUudGlja3MuYmVnaW5BdFplcm8gPSAkKCcuYmVnaW4tYXQtemVyby1vcHRpb24nKS5pcygnOmNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLnNjYWxlcy55QXhlc1swXS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFydE9iaiA9IG5ldyBDaGFydChjb250ZXh0LCB7XG4gICAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgICAgZGF0YTogbGluZWFyRGF0YSxcbiAgICAgICAgICBvcHRpb25zXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGFydE9iaiA9IG5ldyBDaGFydChjb250ZXh0LCB7XG4gICAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbGFiZWxzOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC5sYWJlbCksXG4gICAgICAgICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgICAgICAgZGF0YTogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQudmFsdWUpLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmJhY2tncm91bmRDb2xvciksXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC5ob3ZlckJhY2tncm91bmRDb2xvciksXG4gICAgICAgICAgICAgIGF2ZXJhZ2VzOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC5hdmVyYWdlKVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaG93RXJyb3JzKHtcbiAgICAgICAgZXJyb3JzOiBbXSxcbiAgICAgICAgZmF0YWxFcnJvcnM6IFtlcnJdXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCh0aGlzLmNoYXJ0T2JqLmdlbmVyYXRlTGVnZW5kKCkpO1xuICAgICQoJy5kYXRhLWxpbmtzJykucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuXG4gICAgaWYgKHRoaXMuYXBwID09PSAncGFnZXZpZXdzJykgdGhpcy51cGRhdGVUYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgZXJyb3JzIGJ1aWx0IGluIHRoaXMucHJvY2Vzc0lucHV0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSB4aHJEYXRhIC0gYXMgYnVpbHQgYnkgdGhpcy5wcm9jZXNzSW5wdXQsIGxpa2UgYHsgZXJyb3JzOiBbXSwgZmF0YWxFcnJvcnM6IFtdIH1gXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIG9yIG5vdCBmYXRhbCBlcnJvcnMgb2NjdXJlZFxuICAgKi9cbiAgc2hvd0Vycm9ycyh4aHJEYXRhKSB7XG4gICAgaWYgKHhockRhdGEuZmF0YWxFcnJvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2V0Vmlldyh0cnVlKTtcbiAgICAgIGNvbnN0IGZhdGFsRXJyb3JzID0geGhyRGF0YS5mYXRhbEVycm9ycy51bmlxdWUoKTtcbiAgICAgIHRoaXMuc2hvd0ZhdGFsRXJyb3JzKGZhdGFsRXJyb3JzKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgLy8gaWYgZXZlcnl0aGluZyBmYWlsZWQsIHJlc2V0IHRoZSB2aWV3LCBjbGVhcmluZyBvdXQgc3BhY2UgdGFrZW4gdXAgYnkgZW1wdHkgY2hhcnRcbiAgICAgIGlmICh4aHJEYXRhLmVudGl0aWVzICYmICh4aHJEYXRhLmVycm9ycy5sZW5ndGggPT09IHhockRhdGEuZW50aXRpZXMubGVuZ3RoIHx8ICF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkpIHtcbiAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcbiAgICAgIH1cblxuICAgICAgeGhyRGF0YS5lcnJvcnMudW5pcXVlKCkuZm9yRWFjaChlcnJvciA9PiB0aGlzLndyaXRlTWVzc2FnZShlcnJvcikpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGFydEhlbHBlcnM7XG4iLCIvKipcbiAqIEBmaWxlIENvcmUgSmF2YVNjcmlwdCBleHRlbnNpb25zLCBlaXRoZXIgdG8gbmF0aXZlIEpTIG9yIGEgbGlicmFyeS5cbiAqICAgUG9seWZpbGxzIGhhdmUgdGhlaXIgb3duIGZpbGUgW3BvbHlmaWxscy5qc10oZ2xvYmFsLmh0bWwjcG9seWZpbGxzKVxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5TdHJpbmcucHJvdG90eXBlLmRlc2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXy9nLCAnICcpO1xufTtcblN0cmluZy5wcm90b3R5cGUuc2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvIC9nLCAnXycpO1xufTtcblN0cmluZy5wcm90b3R5cGUudXBjYXNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zbGljZSgxKTtcbn07XG5TdHJpbmcucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcvJzogJyYjeDJGOydcbiAgfTtcblxuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBzID0+IHtcbiAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICB9KTtcbn07XG5cbi8vIHJlbW92ZSBkdXBsaWNhdGUgdmFsdWVzIGZyb20gQXJyYXlcbkFycmF5LnByb3RvdHlwZS51bmlxdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICB9KTtcbn07XG5cbi8vIEltcHJvdmUgc3ludGF4IHRvIGVtdWxhdGUgbWl4aW5zIGluIEVTNlxud2luZG93Lm1peCA9IHN1cGVyY2xhc3MgPT4gbmV3IE1peGluQnVpbGRlcihzdXBlcmNsYXNzKTtcbmNsYXNzIE1peGluQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHN1cGVyY2xhc3MpIHtcbiAgICB0aGlzLnN1cGVyY2xhc3MgPSBzdXBlcmNsYXNzO1xuICB9XG5cbiAgd2l0aCguLi5taXhpbnMpIHtcbiAgICByZXR1cm4gbWl4aW5zLnJlZHVjZSgoYywgbWl4aW4pID0+IG1peGluKGMpLCB0aGlzLnN1cGVyY2xhc3MpO1xuICB9XG59XG5cbi8qXG4gKiBIT1QgUEFUQ0ggZm9yIENoYXJ0LmpzIGdldEVsZW1lbnRzQXRFdmVudFxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoYXJ0anMvQ2hhcnQuanMvaXNzdWVzLzIyOTlcbiAqIFRPRE86IHJlbW92ZSBtZSB3aGVuIHRoaXMgZ2V0cyBpbXBsZW1lbnRlZCBpbnRvIENoYXJ0cy5qcyBjb3JlXG4gKi9cbmlmICh0eXBlb2YgQ2hhcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIENoYXJ0LkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEVsZW1lbnRzQXRFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgaGVscGVycyA9IENoYXJ0LmhlbHBlcnM7XG4gICAgbGV0IGV2ZW50UG9zaXRpb24gPSBoZWxwZXJzLmdldFJlbGF0aXZlUG9zaXRpb24oZSwgdGhpcy5jaGFydCk7XG4gICAgbGV0IGVsZW1lbnRzQXJyYXkgPSBbXTtcblxuICAgIGxldCBmb3VuZCA9IChmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuZGF0YXNldHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEuZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGEpWzBdO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5kYXRhLmRhdGFzZXRzW2ldLl9tZXRhW2tleV0uZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWRlcHRoICovXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRhdGFzZXRzW2ldLl9tZXRhW2tleV0uZGF0YVtqXS5pbkxhYmVsUmFuZ2UoZXZlbnRQb3NpdGlvbi54LCBldmVudFBvc2l0aW9uLnkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLmNhbGwodGhpcyk7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICByZXR1cm4gZWxlbWVudHNBcnJheTtcbiAgICB9XG5cbiAgICBoZWxwZXJzLmVhY2godGhpcy5kYXRhLmRhdGFzZXRzLCBmdW5jdGlvbihkYXRhc2V0LCBkc0luZGV4KSB7XG4gICAgICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyhkYXRhc2V0Ll9tZXRhKVswXTtcbiAgICAgIGVsZW1lbnRzQXJyYXkucHVzaChkYXRhc2V0Ll9tZXRhW2tleV0uZGF0YVtmb3VuZC5faW5kZXhdKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBlbGVtZW50c0FycmF5O1xuICB9O1xufVxuXG4kLndoZW5BbGwgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICBjb3VudGVyID0gMCxcbiAgICBzdGF0ZSA9ICdyZXNvbHZlZCcsXG4gICAgcHJvbWlzZXMgPSBuZXcgQXJyYXkoLi4uYXJndW1lbnRzKTtcblxuICBjb25zdCByZXNvbHZlT3JSZWplY3QgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ3JlamVjdGVkJykge1xuICAgICAgc3RhdGUgPSAncmVqZWN0ZWQnO1xuICAgIH1cbiAgICBjb3VudGVyKys7XG5cbiAgICBpZiAoY291bnRlciA9PT0gcHJvbWlzZXMubGVuZ3RoKSB7XG4gICAgICBkZmRbc3RhdGUgPT09ICdyZWplY3RlZCcgPyAncmVqZWN0JyA6ICdyZXNvbHZlJ10oKTtcbiAgICB9XG5cbiAgfTtcblxuICAkLmVhY2gocHJvbWlzZXMsIChfaSwgcHJvbWlzZSkgPT4ge1xuICAgIHByb21pc2UuYWx3YXlzKHJlc29sdmVPclJlamVjdCk7XG4gIH0pO1xuXG4gIHJldHVybiBkZmQucHJvbWlzZSgpO1xufTtcbiIsIi8qKlxuICogQGZpbGUgUG9seWZpbGxzIGZvciB1c2VycyB3aG8gcmVmdXNlIHRvIHVwZ3JhZGUgdGhlaXIgYnJvd3NlcnNcbiAqICAgTW9zdCBjb2RlIGlzIGFkYXB0ZWQgZnJvbSBbTUROXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZylcbiAqL1xuXG4vLyBBcnJheS5pbmNsdWRlcyBmdW5jdGlvbiBwb2x5ZmlsbFxuLy8gVGhpcyBpcyBub3QgYSBmdWxsIGltcGxlbWVudGF0aW9uLCBqdXN0IGEgc2hvcnRoYW5kIHRvIGluZGV4T2YgIT09IC0xXG5pZiAoICFBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgKSB7XG4gIEFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uKHNlYXJjaCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTE7XG4gIH07XG59XG5cbi8vIFN0cmluZy5pbmNsdWRlcyBmdW5jdGlvbiBwb2x5ZmlsbFxuaWYgKCAhU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyApIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uKHNlYXJjaCwgc3RhcnQpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ICE9PSAnbnVtYmVyJykge1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cblxuICAgIGlmIChzdGFydCArIHNlYXJjaC5sZW5ndGggPiB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmRleE9mKHNlYXJjaCxzdGFydCkgIT09IC0xO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gT2JqZWN0LmFzc2lnblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XG4gIChmdW5jdGlvbigpIHtcbiAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICBsZXQgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBsZXQgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGZvciAobGV0IG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgIG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfSkoKTtcbn1cblxuLy8gQ2hpbGROb2RlLnJlbW92ZVxuaWYgKCEoJ3JlbW92ZScgaW4gRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbn1cblxuLy8gU3RyaW5nLnN0YXJ0c1dpdGhcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XG4gIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IDA7XG4gICAgcmV0dXJuIHRoaXMuc3Vic3RyKHBvc2l0aW9uLCBzZWFyY2hTdHJpbmcubGVuZ3RoKSA9PT0gc2VhcmNoU3RyaW5nO1xuICB9O1xufVxuXG4vLyBBcnJheS5vZlxuaWYgKCFBcnJheS5vZikge1xuICBBcnJheS5vZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vLyBBcnJheS5maW5kXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICBsZXQgbGlzdCA9IE9iamVjdCh0aGlzKTtcbiAgICBsZXQgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XG4gICAgbGV0IHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgbGV0IHZhbHVlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSBsaXN0W2ldO1xuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbi8vIEFycmF5LmZpbGxcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbGwpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbih2YWx1ZSkge1xuXG4gICAgLy8gU3RlcHMgMS0yLlxuICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICB9XG5cbiAgICBsZXQgTyA9IE9iamVjdCh0aGlzKTtcblxuICAgIC8vIFN0ZXBzIDMtNS5cbiAgICBsZXQgbGVuID0gTy5sZW5ndGggPj4+IDA7XG5cbiAgICAvLyBTdGVwcyA2LTcuXG4gICAgbGV0IHN0YXJ0ID0gYXJndW1lbnRzWzFdO1xuICAgIGxldCByZWxhdGl2ZVN0YXJ0ID0gc3RhcnQgPj4gMDtcblxuICAgIC8vIFN0ZXAgOC5cbiAgICBsZXQgayA9IHJlbGF0aXZlU3RhcnQgPCAwID9cbiAgICAgIE1hdGgubWF4KGxlbiArIHJlbGF0aXZlU3RhcnQsIDApIDpcbiAgICAgIE1hdGgubWluKHJlbGF0aXZlU3RhcnQsIGxlbik7XG5cbiAgICAvLyBTdGVwcyA5LTEwLlxuICAgIGxldCBlbmQgPSBhcmd1bWVudHNbMl07XG4gICAgbGV0IHJlbGF0aXZlRW5kID0gZW5kID09PSB1bmRlZmluZWQgP1xuICAgICAgbGVuIDogZW5kID4+IDA7XG5cbiAgICAvLyBTdGVwIDExLlxuICAgIGxldCBmaW5hbCA9IHJlbGF0aXZlRW5kIDwgMCA/XG4gICAgICBNYXRoLm1heChsZW4gKyByZWxhdGl2ZUVuZCwgMCkgOlxuICAgICAgTWF0aC5taW4ocmVsYXRpdmVFbmQsIGxlbik7XG5cbiAgICAvLyBTdGVwIDEyLlxuICAgIHdoaWxlIChrIDwgZmluYWwpIHtcbiAgICAgIE9ba10gPSB2YWx1ZTtcbiAgICAgIGsrKztcbiAgICB9XG5cbiAgICAvLyBTdGVwIDEzLlxuICAgIHJldHVybiBPO1xuICB9O1xufVxuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgY29kZSBhbW9uZ3N0IGFsbCBhcHBzIChQYWdldmlld3MsIFRvcHZpZXdzLCBMYW5ndmlld3MsIFNpdGV2aWV3cywgTWFzc3ZpZXdzLCBSZWRpcmVjdCBWaWV3cylcbiAqIEBhdXRob3IgTXVzaWtBbmltYWwsIEthbGRhcmlcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyoqIGNsYXNzLWxlc3MgZmlsZXMgd2l0aCBnbG9iYWwgb3ZlcnJpZGVzICovXG5yZXF1aXJlKCcuL2NvcmVfZXh0ZW5zaW9ucycpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMnKTtcblxuY29uc3QgUHZDb25maWcgPSByZXF1aXJlKCcuL3B2X2NvbmZpZycpO1xuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4vc2l0ZV9tYXAnKTtcbmNvbnN0IHNpdGVEb21haW5zID0gT2JqZWN0LmtleXMoc2l0ZU1hcCkubWFwKGtleSA9PiBzaXRlTWFwW2tleV0pO1xuXG4vKiogUHYgY2xhc3MsIGNvbnRhaW5zIGNvZGUgYW1vbmdzdCBhbGwgYXBwcyAoUGFnZXZpZXdzLCBUb3B2aWV3cywgTGFuZ3ZpZXdzLCBTaXRldmlld3MsIE1hc3N2aWV3cywgUmVkaXJlY3QgVmlld3MpICovXG5jbGFzcyBQdiBleHRlbmRzIFB2Q29uZmlnIHtcbiAgY29uc3RydWN0b3IoYXBwQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBwQ29uZmlnKTtcblxuICAgIC8qKiBhc3NpZ24gaW5pdGlhbCBjbGFzcyBwcm9wZXJ0aWVzICovXG4gICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLmNvbmZpZy5kZWZhdWx0cyxcbiAgICAgIHZhbGlkUGFyYW1zID0gdGhpcy5jb25maWcudmFsaWRQYXJhbXM7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZywgYXBwQ29uZmlnKTtcbiAgICB0aGlzLmNvbmZpZy5kZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBhcHBDb25maWcuZGVmYXVsdHMpO1xuICAgIHRoaXMuY29uZmlnLnZhbGlkUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsaWRQYXJhbXMsIGFwcENvbmZpZy52YWxpZFBhcmFtcyk7XG5cbiAgICB0aGlzLmNvbG9yc1N0eWxlRWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdG9yYWdlID0ge307IC8vIHVzZWQgYXMgZmFsbGJhY2sgd2hlbiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuXG4gICAgWydsb2NhbGl6ZURhdGVGb3JtYXQnLCAnbnVtZXJpY2FsRm9ybWF0dGluZycsICdiZXppZXJDdXJ2ZScsICdhdXRvY29tcGxldGUnLCAnYXV0b0xvZ0RldGVjdGlvbicsICdiZWdpbkF0WmVybycsICdyZW1lbWJlckNoYXJ0J10uZm9yRWFjaChzZXR0aW5nID0+IHtcbiAgICAgIHRoaXNbc2V0dGluZ10gPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoYHBhZ2V2aWV3cy1zZXR0aW5ncy0ke3NldHRpbmd9YCkgfHwgdGhpcy5jb25maWcuZGVmYXVsdHNbc2V0dGluZ107XG4gICAgfSk7XG4gICAgdGhpcy5zZXR1cFNldHRpbmdzTW9kYWwoKTtcblxuICAgIHRoaXMucGFyYW1zID0gbnVsbDtcbiAgICB0aGlzLnNpdGVJbmZvID0ge307XG5cbiAgICAvKiogQHR5cGUge251bGx8RGF0ZX0gdHJhY2tpbmcgb2YgZWxhcHNlZCB0aW1lICovXG4gICAgdGhpcy5wcm9jZXNzU3RhcnQgPSBudWxsO1xuXG4gICAgLyoqIGFzc2lnbiBhcHAgaW5zdGFuY2UgdG8gd2luZG93IGZvciBkZWJ1Z2dpbmcgb24gbG9jYWwgZW52aXJvbm1lbnQgKi9cbiAgICBpZiAobG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCcpIHtcbiAgICAgIHdpbmRvdy5hcHAgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNwbGFzaCgpO1xuICAgIH1cblxuICAgIHRoaXMuZGVidWcgPSBsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2RlYnVnPXRydWUnKSB8fCBsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0JztcblxuICAgIC8qKiBzaG93IG5vdGljZSBpZiBvbiBzdGFnaW5nIGVudmlyb25tZW50ICovXG4gICAgaWYgKC8tdGVzdC8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHtcbiAgICAgIGNvbnN0IGFjdHVhbFBhdGhOYW1lID0gbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvLXRlc3RcXC8/LywgJycpO1xuICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCd3YXJuaW5nJyxcbiAgICAgICAgYFRoaXMgaXMgYSBzdGFnaW5nIGVudmlyb25tZW50LiBGb3IgdGhlIGFjdHVhbCAke2RvY3VtZW50LnRpdGxlfSxcbiAgICAgICAgIHNlZSA8YSBocmVmPScke2FjdHVhbFBhdGhOYW1lfSc+JHtsb2NhdGlvbi5ob3N0bmFtZX0ke2FjdHVhbFBhdGhOYW1lfTwvYT5gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdHJhbnNsYXRpb25zIHRoZW4gaW5pdGlhbGl6ZSB0aGUgYXBwLlxuICAgICAqIEVhY2ggYXBwIGhhcyBpdCdzIG93biBpbml0aWFsaXplIG1ldGhvZC5cbiAgICAgKiBNYWtlIHN1cmUgd2UgbG9hZCAnZW4uanNvbicgYXMgYSBmYWxsYmFja1xuICAgICAqL1xuICAgIGxldCBtZXNzYWdlc1RvTG9hZCA9IHtcbiAgICAgIFtpMThuTGFuZ106IGAvcGFnZXZpZXdzL21lc3NhZ2VzLyR7aTE4bkxhbmd9Lmpzb25gXG4gICAgfTtcbiAgICBpZiAoaTE4bkxhbmcgIT09ICdlbicpIHtcbiAgICAgIG1lc3NhZ2VzVG9Mb2FkLmVuID0gJy9wYWdldmlld3MvbWVzc2FnZXMvZW4uanNvbic7XG4gICAgfVxuICAgICQuaTE4bih7XG4gICAgICBsb2NhbGU6IGkxOG5MYW5nXG4gICAgfSkubG9hZChtZXNzYWdlc1RvTG9hZCkudGhlbih0aGlzLmluaXRpYWxpemUuYmluZCh0aGlzKSk7XG5cbiAgICAvKiogc2V0IHVwIHRvYXN0ciBjb25maWcuIFRoZSBkdXJhdGlvbiBtYXkgYmUgb3ZlcnJpZGVuIGxhdGVyICovXG4gICAgdG9hc3RyLm9wdGlvbnMgPSB7XG4gICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgIGRlYnVnOiBsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0JyxcbiAgICAgIG5ld2VzdE9uVG9wOiBmYWxzZSxcbiAgICAgIHByb2dyZXNzQmFyOiBmYWxzZSxcbiAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC10b3AtY2VudGVyJyxcbiAgICAgIHByZXZlbnREdXBsaWNhdGVzOiB0cnVlLFxuICAgICAgb25jbGljazogbnVsbCxcbiAgICAgIHNob3dEdXJhdGlvbjogJzMwMCcsXG4gICAgICBoaWRlRHVyYXRpb246ICcxMDAwJyxcbiAgICAgIHRpbWVPdXQ6ICc1MDAwJyxcbiAgICAgIGV4dGVuZGVkVGltZU91dDogJzMwMDAnLFxuICAgICAgc2hvd0Vhc2luZzogJ3N3aW5nJyxcbiAgICAgIGhpZGVFYXNpbmc6ICdsaW5lYXInLFxuICAgICAgc2hvd01ldGhvZDogJ2ZhZGVJbicsXG4gICAgICBoaWRlTWV0aG9kOiAnZmFkZU91dCcsXG4gICAgICB0b2FzdENsYXNzOiAnYWxlcnQnLFxuICAgICAgaWNvbkNsYXNzZXM6IHtcbiAgICAgICAgZXJyb3I6ICdhbGVydC1kYW5nZXInLFxuICAgICAgICBpbmZvOiAnYWxlcnQtaW5mbycsXG4gICAgICAgIHN1Y2Nlc3M6ICdhbGVydC1zdWNjZXNzJyxcbiAgICAgICAgd2FybmluZzogJ2FsZXJ0LXdhcm5pbmcnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBzaXRlIG5vdGljZSAoQm9vdHN0cmFwIGFsZXJ0KVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbGV2ZWwgLSBvbmUgb2YgJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJyBvciAnZXJyb3InXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIC0gbWVzc2FnZSB0byBzaG93XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdGl0bGVdIC0gd2lsbCBhcHBlYXIgaW4gYm9sZCBhbmQgaW4gZnJvbnQgb2YgdGhlIG1lc3NhZ2VcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZGlzbWlzc2FibGVdIC0gd2hldGhlciBvciBub3QgdG8gYWRkIGEgWFxuICAgKiAgIHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIGRpc21pc3MgdGhlIG5vdGljZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgYWRkU2l0ZU5vdGljZShsZXZlbCwgbWVzc2FnZSwgdGl0bGUsIGRpc21pc3NhYmxlKSB7XG4gICAgdGl0bGUgPSB0aXRsZSA/IGA8c3Ryb25nPiR7dGl0bGV9PC9zdHJvbmc+IGAgOiAnJztcblxuICAgIGxldCBtYXJrdXAgPSB0aXRsZSArIG1lc3NhZ2U7XG5cbiAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgIG1hcmt1cCxcbiAgICAgIGxldmVsLFxuICAgICAgZGlzbWlzc2FibGUgPyAxMDAwMCA6IDBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzaXRlIG5vdGljZSBmb3IgaW52YWxpZCBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtIC0gbmFtZSBvZiBwYXJhbWV0ZXJcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGFkZEludmFsaWRQYXJhbU5vdGljZShwYXJhbSkge1xuICAgIGNvbnN0IGRvY0xpbmsgPSBgPGEgaHJlZj0nLyR7dGhpcy5hcHB9L3VybF9zdHJ1Y3R1cmUnPiR7JC5pMThuKCdkb2N1bWVudGF0aW9uJyl9PC9hPmA7XG4gICAgdGhpcy5hZGRTaXRlTm90aWNlKFxuICAgICAgJ2Vycm9yJyxcbiAgICAgICQuaTE4bigncGFyYW0tZXJyb3ItMycsIHBhcmFtLCBkb2NMaW5rKSxcbiAgICAgICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSxcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHRoZSBkYXRlIHJhbmdlIG9mIGdpdmVuIHBhcmFtc1xuICAgKiAgIGFuZCB0aHJvdyBlcnJvcnMgYXMgbmVjZXNzYXJ5IGFuZC9vciBzZXQgZGVmYXVsdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIGFzIHJldHVybmVkIGJ5IHRoaXMucGFyc2VRdWVyeVN0cmluZygpXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZXJlIHdlcmUgbm8gZXJyb3JzLCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIHZhbGlkYXRlRGF0ZVJhbmdlKHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMucmFuZ2UpIHtcbiAgICAgIGlmICghdGhpcy5zZXRTcGVjaWFsUmFuZ2UocGFyYW1zLnJhbmdlKSkge1xuICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZSgncmFuZ2UnKTtcbiAgICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UodGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZVJhbmdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhcmFtcy5zdGFydCkge1xuICAgICAgY29uc3QgZGF0ZVJlZ2V4ID0gL1xcZHs0fS1cXGR7Mn0tXFxkezJ9JC87XG5cbiAgICAgIC8vIGZpcnN0IHNldCBkZWZhdWx0c1xuICAgICAgbGV0IHN0YXJ0RGF0ZSwgZW5kRGF0ZTtcblxuICAgICAgLy8gdGhlbiBjaGVjayBmb3JtYXQgb2Ygc3RhcnQgYW5kIGVuZCBkYXRlXG4gICAgICBpZiAocGFyYW1zLnN0YXJ0ICYmIGRhdGVSZWdleC50ZXN0KHBhcmFtcy5zdGFydCkpIHtcbiAgICAgICAgc3RhcnREYXRlID0gbW9tZW50KHBhcmFtcy5zdGFydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZSgnc3RhcnQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5lbmQgJiYgZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLmVuZCkpIHtcbiAgICAgICAgZW5kRGF0ZSA9IG1vbWVudChwYXJhbXMuZW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdlbmQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiB0aGV5IGFyZSBvdXRzaWRlIHRoZSB2YWxpZCByYW5nZSBvciBpZiBpbiB0aGUgd3Jvbmcgb3JkZXJcbiAgICAgIGlmIChzdGFydERhdGUgPCB0aGlzLmNvbmZpZy5taW5EYXRlIHx8IGVuZERhdGUgPCB0aGlzLmNvbmZpZy5taW5EYXRlKSB7XG4gICAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnZXJyb3InLFxuICAgICAgICAgICQuaTE4bigncGFyYW0tZXJyb3ItMScsIG1vbWVudCh0aGlzLmNvbmZpZy5taW5EYXRlKS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSksXG4gICAgICAgICAgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzdGFydERhdGUgPiBlbmREYXRlKSB7XG4gICAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnZXJyb3InLCAkLmkxOG4oJ3BhcmFtLWVycm9yLTInKSwgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKiogZGlyZWN0bHkgYXNzaWduIHN0YXJ0RGF0ZSBiZWZvcmUgY2FsbGluZyBzZXRFbmREYXRlIHNvIGV2ZW50cyB3aWxsIGJlIGZpcmVkIG9uY2UgKi9cbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnNldEVuZERhdGUoZW5kRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3BlY2lhbFJhbmdlKHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVSYW5nZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjbGVhclNpdGVOb3RpY2VzKCkge1xuICAgICQoJy5zaXRlLW5vdGljZScpLmh0bWwoJycpO1xuICB9XG5cbiAgY2xlYXJNZXNzYWdlcygpIHtcbiAgICAkKCcubWVzc2FnZS1jb250YWluZXInKS5odG1sKCcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0ZSBmb3JtYXQgdG8gdXNlIGJhc2VkIG9uIHNldHRpbmdzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRhdGUgZm9ybWF0IHRvIHBhc3NlZCB0byBwYXJzZXJcbiAgICovXG4gIGdldCBkYXRlRm9ybWF0KCkge1xuICAgIGlmICh0aGlzLmxvY2FsaXplRGF0ZUZvcm1hdCA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRhdGVyYW5nZXBpY2tlciBpbnN0YW5jZS4gUGxhaW4gYW5kIHNpbXBsZS5cbiAgICogQHJldHVybiB7T2JqZWN0fSBkYXRlcmFuZ2UgcGlja2VyXG4gICAqL1xuICBnZXQgZGF0ZXJhbmdlcGlja2VyKCkge1xuICAgIHJldHVybiAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRhdGFiYXNlIG5hbWUgb2YgdGhlIGdpdmVuIHByb2pldFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHByb2plY3QgLSB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGRhdGFiYXNlIG5hbWVcbiAgICovXG4gIGRiTmFtZShwcm9qZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNpdGVNYXApLmZpbmQoa2V5ID0+IHNpdGVNYXBba2V5XSA9PT0gYCR7cHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywnJyl9Lm9yZ2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIGRvd25sb2FkIG9mIGdpdmVuIGRhdGEsIG9yIG9wZW4gaW4gYSBuZXcgdGFiIGlmIEhUTUw1IDxhPiBkb3dubG9hZCBhdHRyaWJ1dGUgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSAtIFJhdyBkYXRhIHByZXBlbmRlZCB3aXRoIGRhdGEgdHlwZSwgZS5nLiBcImRhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCxteSBkYXRhLi4uXCJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4dGVuc2lvbiAtIHRoZSBmaWxlIGV4dGVuc2lvbiB0byB1c2VcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGRvd25sb2FkRGF0YShkYXRhLCBleHRlbnNpb24pIHtcbiAgICBjb25zdCBlbmNvZGVkVXJpID0gZW5jb2RlVVJJKGRhdGEpO1xuXG4gICAgLy8gY3JlYXRlIEhUTUw1IGRvd25sb2FkIGVsZW1lbnQgYW5kIGZvcmNlIGNsaWNrIHNvIHdlIGNhbiBzcGVjaWZ5IGEgZmlsZW5hbWVcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGlmICh0eXBlb2YgbGluay5kb3dubG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7IC8vIEZpcmVmb3ggcmVxdWlyZXMgdGhlIGxpbmsgdG8gYmUgaW4gdGhlIGJvZHlcblxuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgJHt0aGlzLmdldEV4cG9ydEZpbGVuYW1lKCl9LiR7ZXh0ZW5zaW9ufWA7XG4gICAgICBsaW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgICBsaW5rLmhyZWYgPSBlbmNvZGVkVXJpO1xuICAgICAgbGluay5jbGljaygpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspOyAvLyByZW1vdmUgdGhlIGxpbmsgd2hlbiBkb25lXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5vcGVuKGVuY29kZWRVcmkpOyAvLyBvcGVuIGluIG5ldyB0YWIgaWYgZG93bmxvYWQgaXNuJ3Qgc3VwcG9ydGVkICgqY291Z2gqIFNhZmFyaSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlsbCBpbiB2YWx1ZXMgd2l0aGluIHNldHRpbmdzIG1vZGFsIHdpdGggd2hhdCdzIGluIHRoZSBzZXNzaW9uIG9iamVjdFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZmlsbEluU2V0dGluZ3MoKSB7XG4gICAgJC5lYWNoKCQoJyNzZXR0aW5ncy1tb2RhbCBpbnB1dCcpLCAoaW5kZXgsIGVsKSA9PiB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICBlbC5jaGVja2VkID0gdGhpc1tlbC5uYW1lXSA9PT0gJ3RydWUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHRoaXNbZWwubmFtZV0gPT09IGVsLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBmb2N1cyB0byBTZWxlY3QyIGlucHV0IGZpZWxkXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBmb2N1c1NlbGVjdDIoKSB7XG4gICAgJCgnLnNlbGVjdDItc2VsZWN0aW9uJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAkKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJykuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgbnVtYmVyIGJhc2VkIG9uIGN1cnJlbnQgc2V0dGluZ3MsIGUuZy4gbG9jYWxpemUgd2l0aCBjb21tYSBkZWxpbWV0ZXJzXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtIC0gbnVtYmVyIHRvIGZvcm1hdFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBmb3JtYXR0ZWQgbnVtYmVyXG4gICAqL1xuICBmb3JtYXROdW1iZXIobnVtKSB7XG4gICAgY29uc3QgbnVtZXJpY2FsRm9ybWF0dGluZyA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgncGFnZXZpZXdzLXNldHRpbmdzLW51bWVyaWNhbEZvcm1hdHRpbmcnKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5udW1lcmljYWxGb3JtYXR0aW5nO1xuICAgIGlmIChudW1lcmljYWxGb3JtYXR0aW5nID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLm4obnVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRZQXhpc051bWJlcihudW0pIHtcbiAgICBpZiAobnVtICUgMSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVyKG51bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRlIGhlYWRpbmdzIGFzIHN0cmluZ3MgLSBpMThuIGNvbXBsaWFudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGxvY2FsaXplZCAtIHdoZXRoZXIgdGhlIGRhdGVzIHNob3VsZCBiZSBsb2NhbGl6ZWQgcGVyIGJyb3dzZXIgbGFuZ3VhZ2VcbiAgICogQHJldHVybnMge0FycmF5fSB0aGUgZGF0ZSBoZWFkaW5ncyBhcyBzdHJpbmdzXG4gICAqL1xuICBnZXREYXRlSGVhZGluZ3MobG9jYWxpemVkKSB7XG4gICAgY29uc3QgZGF0ZUhlYWRpbmdzID0gW10sXG4gICAgICBlbmREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUpLmFkZCgxLCAnZCcpO1xuXG4gICAgZm9yIChsZXQgZGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUpOyBkYXRlLmlzQmVmb3JlKGVuZERhdGUpOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAobG9jYWxpemVkKSB7XG4gICAgICAgIGRhdGVIZWFkaW5ncy5wdXNoKGRhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0ZUhlYWRpbmdzLnB1c2goZGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRlSGVhZGluZ3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBsYW5kZWQgd2lraSBVUkwgZ2l2ZW4gdGhlIHBhZ2UgbmFtZVxuICAgKiBUaGlzIHNob3VsZCBiZSB1c2VkIGluc3RlYWQgb2YgZ2V0UGFnZVVSTCB3aGVuIHlvdSB3YW50IHRvIGNoYWluIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlIG5hbWVcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgcGFnZVxuICAgKi9cbiAgZ2V0RXhwYW5kZWRQYWdlVVJMKHBhZ2UpIHtcbiAgICByZXR1cm4gYC8vJHt0aGlzLnByb2plY3R9Lm9yZy93L2luZGV4LnBocD90aXRsZT0ke2VuY29kZVVSSUNvbXBvbmVudChwYWdlLnNjb3JlKCkpLnJlcGxhY2UoLycvLCBlc2NhcGUpfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGluZm9ybWF0aXZlIGZpbGVuYW1lIHdpdGhvdXQgZXh0ZW5zaW9uIHRvIGJlIHVzZWQgZm9yIGV4cG9ydCBvcHRpb25zXG4gICAqIEByZXR1cm4ge3N0cmluZ30gZmlsZW5hbWUgd2l0aG91dCBhbiBleHRlbnNpb25cbiAgICovXG4gIGdldEV4cG9ydEZpbGVuYW1lKCkge1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKS5mb3JtYXQoJ1lZWVlNTUREJyksXG4gICAgICBlbmREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5zdGFydE9mKCdkYXknKS5mb3JtYXQoJ1lZWVlNTUREJyk7XG4gICAgcmV0dXJuIGAke3RoaXMuYXBwfS0ke3N0YXJ0RGF0ZX0tJHtlbmREYXRlfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZnVsbCBsaW5rIGZvciB0aGUgZ2l2ZW4gcGFnZSBhbmQgcHJvamVjdFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHBhZ2UgLSBwYWdlIHRvIGxpbmsgdG9cbiAgICogQHBhcmFtICB7c3RyaW5nfSBbcHJvamVjdF0gLSBwcm9qZWN0IGxpbmssIGRlZmF1bHRzIHRvIGB0aGlzLnByb2plY3RgXG4gICAqIEByZXR1cm4ge3N0cmluZ30gSFRNTCBtYXJrdXBcbiAgICovXG4gIGdldFBhZ2VMaW5rKHBhZ2UsIHByb2plY3QpIHtcbiAgICByZXR1cm4gYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIke3RoaXMuZ2V0UGFnZVVSTChwYWdlLCBwcm9qZWN0KX1cIj4ke3BhZ2UuZGVzY29yZSgpLmVzY2FwZSgpfTwvYT5gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgd2lraSBVUkwgZ2l2ZW4gdGhlIHBhZ2UgbmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZSAtIHBhZ2UgbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBwYWdlXG4gICAqL1xuICBnZXRQYWdlVVJMKHBhZ2UsIHByb2plY3QgPSB0aGlzLnByb2plY3QpIHtcbiAgICByZXR1cm4gYC8vJHtwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCAnJykuZXNjYXBlKCl9Lm9yZy93aWtpLyR7cGFnZS5zY29yZSgpLnJlcGxhY2UoLycvLCBlc2NhcGUpfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzaXRlIC0gc2l0ZSBuYW1lIChlLmcuIGVuLndpa2lwZWRpYS5vcmcpXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHNpdGVcbiAgICovXG4gIGdldFNpdGVMaW5rKHNpdGUpIHtcbiAgICByZXR1cm4gYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIvLyR7c2l0ZX0ub3JnXCI+JHtzaXRlfTwvYT5gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJvamVjdCBuYW1lICh3aXRob3V0IHRoZSAub3JnKVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gbGFuZy5wcm9qZWN0bmFtZVxuICAgKi9cbiAgZ2V0IHByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9ICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwoKTtcbiAgICAvKiogR2V0IHRoZSBmaXJzdCAyIGNoYXJhY3RlcnMgZnJvbSB0aGUgcHJvamVjdCBjb2RlIHRvIGdldCB0aGUgbGFuZ3VhZ2UgKi9cbiAgICByZXR1cm4gcHJvamVjdCA/IHByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8ub3JnJC8sICcnKSA6IG51bGw7XG4gIH1cblxuICBnZXRMb2NhbGVEYXRlU3RyaW5nKCkge1xuICAgIGlmICghbmF2aWdhdG9yLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZUZvcm1hdDtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtYXRzID0ge1xuICAgICAgJ2FyLXNhJzogJ0REL01NL1lZJyxcbiAgICAgICdiZy1iZyc6ICdERC5NLllZWVknLFxuICAgICAgJ2NhLWVzJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLXR3JzogJ1lZWVkvTS9EJyxcbiAgICAgICdjcy1jeic6ICdELk0uWVlZWScsXG4gICAgICAnZGEtZGsnOiAnREQtTU0tWVlZWScsXG4gICAgICAnZGUtZGUnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZWwtZ3InOiAnRC9NL1lZWVknLFxuICAgICAgJ2VuLXVzJzogJ00vRC9ZWVlZJyxcbiAgICAgICdmaS1maSc6ICdELk0uWVlZWScsXG4gICAgICAnZnItZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnaGUtaWwnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHUtaHUnOiAnWVlZWS4gTU0uIERELicsXG4gICAgICAnaXMtaXMnOiAnRC5NLllZWVknLFxuICAgICAgJ2l0LWl0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2phLWpwJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2tvLWtyJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ25sLW5sJzogJ0QtTS1ZWVlZJyxcbiAgICAgICduYi1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwbC1wbCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdwdC1icic6ICdEL00vWVlZWScsXG4gICAgICAncm8tcm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncnUtcnUnOiAnREQuTU0uWVlZWScsXG4gICAgICAnaHItaHInOiAnRC5NLllZWVknLFxuICAgICAgJ3NrLXNrJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ3NxLWFsJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3N2LXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3RoLXRoJzogJ0QvTS9ZWVlZJyxcbiAgICAgICd0ci10cic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICd1ci1wayc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdpZC1pZCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd1ay11YSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdiZS1ieSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdzbC1zaSc6ICdELk0uWVlZWScsXG4gICAgICAnZXQtZWUnOiAnRC5NTS5ZWVlZJyxcbiAgICAgICdsdi1sdic6ICdZWVlZLk1NLkRELicsXG4gICAgICAnbHQtbHQnOiAnWVlZWS5NTS5ERCcsXG4gICAgICAnZmEtaXInOiAnTU0vREQvWVlZWScsXG4gICAgICAndmktdm4nOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHktYW0nOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXotbGF0bi1heic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdldS1lcyc6ICdZWVlZL01NL0REJyxcbiAgICAgICdtay1tayc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhZi16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdrYS1nZSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdmby1mbyc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdoaS1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtcy1teSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdray1reic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdreS1rZyc6ICdERC5NTS5ZWScsXG4gICAgICAnc3cta2UnOiAnTS9kL1lZWVknLFxuICAgICAgJ3V6LWxhdG4tdXonOiAnREQvTU0gWVlZWScsXG4gICAgICAndHQtcnUnOiAnREQuTU0uWVlZWScsXG4gICAgICAncGEtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2d1LWluJzogJ0RELU1NLVlZJyxcbiAgICAgICd0YS1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICd0ZS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAna24taW4nOiAnREQtTU0tWVknLFxuICAgICAgJ21yLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3NhLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21uLW1uJzogJ1lZLk1NLkREJyxcbiAgICAgICdnbC1lcyc6ICdERC9NTS9ZWScsXG4gICAgICAna29rLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3N5ci1zeSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdkdi1tdic6ICdERC9NTS9ZWScsXG4gICAgICAnYXItaXEnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2RlLWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLW14JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWJlJzogJ0QvTU0vWVlZWScsXG4gICAgICAnaXQtY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnbmwtYmUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdubi1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwdC1wdCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzci1sYXRuLWNzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzdi1maSc6ICdELk0uWVlZWScsXG4gICAgICAnYXotY3lybC1heic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdtcy1ibic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd1ei1jeXJsLXV6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FyLWVnJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLWhrJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1hdCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1hdSc6ICdEL01NL1lZWVknLFxuICAgICAgJ2VzLWVzJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWNhJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3NyLWN5cmwtY3MnOiAnRC5NLllZWVknLFxuICAgICAgJ2FyLWx5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLXNnJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1sdSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1jYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1ndCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhci1keic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICd6aC1tbyc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtbGknOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tbnonOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdlcy1jcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1sdSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1tYSc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdlbi1pZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wYSc6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICdmci1tYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci10bic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdlbi16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdlcy1kbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1vbSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1qbSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy12ZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci15ZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi0wMjknOiAnTU0vREQvWVlZWScsXG4gICAgICAnZXMtY28nOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItc3knOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tYnonOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcGUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItam8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tdHQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtYXInOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItbGInOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tencnOiAnTS9EL1lZWVknLFxuICAgICAgJ2VzLWVjJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWt3JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXBoJzogJ00vRC9ZWVlZJyxcbiAgICAgICdlcy1jbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdhci1hZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy11eSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1iaCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1weSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1xYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1ibyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1zdic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1obic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1uaSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhbS1ldCc6ICdEL00vWVlZWScsXG4gICAgICAndHptLWxhdG4tZHonOiAnREQtTU0tWVlZWScsXG4gICAgICAnaXUtbGF0bi1jYSc6ICdEL01NL1lZWVknLFxuICAgICAgJ3NtYS1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdtbi1tb25nLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdnZC1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1teSc6ICdEL00vWVlZWScsXG4gICAgICAncHJzLWFmJzogJ0REL01NL1lZJyxcbiAgICAgICdibi1iZCc6ICdERC1NTS1ZWScsXG4gICAgICAnd28tc24nOiAnREQvTU0vWVlZWScsXG4gICAgICAncnctcncnOiAnTS9EL1lZWVknLFxuICAgICAgJ3F1dC1ndCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzYWgtcnUnOiAnTU0uREQuWVlZWScsXG4gICAgICAnZ3N3LWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2NvLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ29jLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ21pLW56JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2dhLWllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NlLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ2JyLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3Ntbi1maSc6ICdELk0uWVlZWScsXG4gICAgICAnbW9oLWNhJzogJ00vRC9ZWVlZJyxcbiAgICAgICdhcm4tY2wnOiAnREQtTU0tWVlZWScsXG4gICAgICAnaWktY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2RzYi1kZSc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdpZy1uZyc6ICdEL00vWVlZWScsXG4gICAgICAna2wtZ2wnOiAnREQtTU0tWVlZWScsXG4gICAgICAnbGItbHUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYmEtcnUnOiAnREQuTU0uWVknLFxuICAgICAgJ25zby16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdxdXotYm8nOiAnREQvTU0vWVlZWScsXG4gICAgICAneW8tbmcnOiAnRC9NL1lZWVknLFxuICAgICAgJ2hhLWxhdG4tbmcnOiAnRC9NL1lZWVknLFxuICAgICAgJ2ZpbC1waCc6ICdNL0QvWVlZWScsXG4gICAgICAncHMtYWYnOiAnREQvTU0vWVknLFxuICAgICAgJ2Z5LW5sJzogJ0QtTS1ZWVlZJyxcbiAgICAgICduZS1ucCc6ICdNL0QvWVlZWScsXG4gICAgICAnc2Utbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAnaXUtY2Fucy1jYSc6ICdEL00vWVlZWScsXG4gICAgICAnc3ItbGF0bi1ycyc6ICdELk0uWVlZWScsXG4gICAgICAnc2ktbGsnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3ItY3lybC1ycyc6ICdELk0uWVlZWScsXG4gICAgICAnbG8tbGEnOiAnREQvTU0vWVlZWScsXG4gICAgICAna20ta2gnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnY3ktZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnYm8tY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ3Ntcy1maSc6ICdELk0uWVlZWScsXG4gICAgICAnYXMtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbWwtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2VuLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ29yLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdibi1pbic6ICdERC1NTS1ZWScsXG4gICAgICAndGstdG0nOiAnREQuTU0uWVknLFxuICAgICAgJ2JzLWxhdG4tYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ210LW10JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NyLWN5cmwtbWUnOiAnRC5NLllZWVknLFxuICAgICAgJ3NlLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICd6dS16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICd4aC16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICd0bi16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdoc2ItZGUnOiAnRC4gTS4gWVlZWScsXG4gICAgICAnYnMtY3lybC1iYSc6ICdELk0uWVlZWScsXG4gICAgICAndGctY3lybC10aic6ICdERC5NTS55eScsXG4gICAgICAnc3ItbGF0bi1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnc21qLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3JtLWNoJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3Ntai1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdxdXotZWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAncXV6LXBlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2hyLWJhJzogJ0QuTS5ZWVlZLicsXG4gICAgICAnc3ItbGF0bi1tZSc6ICdELk0uWVlZWScsXG4gICAgICAnc21hLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ2VuLXNnJzogJ0QvTS9ZWVlZJyxcbiAgICAgICd1Zy1jbic6ICdZWVlZLU0tRCcsXG4gICAgICAnc3ItY3lybC1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnZXMtdXMnOiAnTS9EL1lZWVknXG4gICAgfTtcblxuICAgIGNvbnN0IGtleSA9IG5hdmlnYXRvci5sYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBmb3JtYXRzW2tleV0gfHwgdGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZUZvcm1hdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB2YWx1ZSBmcm9tIGxvY2FsU3RvcmFnZSwgdXNpbmcgYSB0ZW1wb3Jhcnkgc3RvcmFnZSBpZiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0ga2V5IGZvciB0aGUgdmFsdWUgdG8gcmV0cmlldmVcbiAgICogQHJldHVybnMge01peGVkfSBzdG9yZWQgdmFsdWVcbiAgICovXG4gIGdldEZyb21Mb2NhbFN0b3JhZ2Uoa2V5KSB7XG4gICAgLy8gU2VlIGlmIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgYW5kIGVuYWJsZWRcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgVVJMIHRvIGZpbGUgYSByZXBvcnQgb24gTWV0YSwgcHJlbG9hZGVkIHdpdGggcGVybWFsaW5rXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbcGhhYlBhc3RlXSBVUkwgdG8gYXV0by1nZW5lcmF0ZWQgZXJyb3IgcmVwb3J0IG9uIFBoYWJyaWNhdG9yXG4gICAqIEByZXR1cm4ge1N0cmluZ30gVVJMXG4gICAqL1xuICBnZXRCdWdSZXBvcnRVUkwocGhhYlBhc3RlKSB7XG4gICAgY29uc3QgcmVwb3J0VVJMID0gJ2h0dHBzOi8vbWV0YS53aWtpbWVkaWEub3JnL3cvaW5kZXgucGhwP3RpdGxlPVRhbGs6UGFnZXZpZXdzX0FuYWx5c2lzJmFjdGlvbj1lZGl0JyArXG4gICAgICBgJnNlY3Rpb249bmV3JnByZWxvYWR0aXRsZT0ke3RoaXMuYXBwLnVwY2FzZSgpfSBidWcgcmVwb3J0YDtcblxuICAgIGlmIChwaGFiUGFzdGUpIHtcbiAgICAgIHJldHVybiBgJHtyZXBvcnRVUkx9JnByZWxvYWQ9VGFsazpQYWdldmlld3NfQW5hbHlzaXMvUHJlbG9hZCZwcmVsb2FkcGFyYW1zW109JHtwaGFiUGFzdGV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcG9ydFVSTDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGdlbmVyYWwgaW5mb3JtYXRpb24gYWJvdXQgYSBwcm9qZWN0LCBzdWNoIGFzIG5hbWVzcGFjZXMsIHRpdGxlIG9mIHRoZSBtYWluIHBhZ2UsIGV0Yy5cbiAgICogRGF0YSByZXR1cm5lZCBieSB0aGUgYXBpIGlzIGFsc28gc3RvcmVkIGluIHRoaXMuc2l0ZUluZm9cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb2plY3QgLSBwcm9qZWN0IHN1Y2ggYXMgZW4ud2lraXBlZGlhICh3aXRoIG9yIHdpdGhvdXQgLm9yZylcbiAgICogQHJldHVybnMge0RlZmVycmVkfSBwcm9taXNlIHJlc29sdmluZyB3aXRoIHNpdGVpbmZvLFxuICAgKiAgIGFsb25nIHdpdGggYW55IG90aGVyIGNhY2hlZCBzaXRlaW5mbyBmb3Igb3RoZXIgcHJvamVjdHNcbiAgICovXG4gIGZldGNoU2l0ZUluZm8ocHJvamVjdCkge1xuICAgIHByb2plY3QgPSBwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCAnJyk7XG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgY2FjaGVLZXkgPSBgcGFnZXZpZXdzLXNpdGVpbmZvLSR7cHJvamVjdH1gO1xuXG4gICAgaWYgKHRoaXMuc2l0ZUluZm9bcHJvamVjdF0pIHJldHVybiBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcblxuICAgIC8vIHVzZSBjYWNoZWQgc2l0ZSBpbmZvIGlmIHByZXNlbnRcbiAgICBpZiAoc2ltcGxlU3RvcmFnZS5oYXNLZXkoY2FjaGVLZXkpKSB7XG4gICAgICB0aGlzLnNpdGVJbmZvW3Byb2plY3RdID0gc2ltcGxlU3RvcmFnZS5nZXQoY2FjaGVLZXkpO1xuICAgICAgZGZkLnJlc29sdmUodGhpcy5zaXRlSW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG90aGVyd2lzZSBmZXRjaCBzaXRlaW5mbyBhbmQgc3RvcmUgaW4gY2FjaGVcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vJHtwcm9qZWN0fS5vcmcvdy9hcGkucGhwYCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGFjdGlvbjogJ3F1ZXJ5JyxcbiAgICAgICAgICBtZXRhOiAnc2l0ZWluZm8nLFxuICAgICAgICAgIHNpcHJvcDogJ2dlbmVyYWx8bmFtZXNwYWNlcycsXG4gICAgICAgICAgZm9ybWF0OiAnanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0gPSBkYXRhLnF1ZXJ5O1xuXG4gICAgICAgIC8vIGNhY2hlIGZvciBvbmUgd2VlayAoVFRMIGlzIGluIG1pbGxpc2Vjb25kcylcbiAgICAgICAgc2ltcGxlU3RvcmFnZS5zZXQoY2FjaGVLZXksIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0sIHtUVEw6IDEwMDAgKiA2MCAqIDYwICogMjQgKiA3fSk7XG5cbiAgICAgICAgZGZkLnJlc29sdmUodGhpcy5zaXRlSW5mbyk7XG4gICAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgICBkZmQucmVqZWN0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gZ2V0IHNpdGVpbmZvIGZyb20gdGhpcy5zaXRlSW5mbyBmb3IgZ2l2ZW4gcHJvamVjdCwgd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb2plY3QgLSBwcm9qZWN0IG5hbWUsIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfSBzaXRlIGluZm9ybWF0aW9uIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFNpdGVJbmZvKHByb2plY3QpIHtcbiAgICByZXR1cm4gdGhpcy5zaXRlSW5mb1twcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCAnJyldO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1c2VyIGFnZW50LCBpZiBzdXBwb3J0ZWRcbiAgICogQHJldHVybnMge3N0cmluZ30gdXNlci1hZ2VudFxuICAgKi9cbiAgZ2V0VXNlckFnZW50KCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50ID8gbmF2aWdhdG9yLnVzZXJBZ2VudCA6ICdVbmtub3duJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB2YWx1ZSB0byBsb2NhbFN0b3JhZ2UsIHVzaW5nIGEgdGVtcG9yYXJ5IHN0b3JhZ2UgaWYgbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGtleSBmb3IgdGhlIHZhbHVlIHRvIHNldFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIHZhbHVlIHRvIHN0b3JlXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gc3RvcmVkIHZhbHVlXG4gICAqL1xuICBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xuICAgIC8vIFNlZSBpZiBsb2NhbFN0b3JhZ2UgaXMgc3VwcG9ydGVkIGFuZCBlbmFibGVkXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSB1bmlxdWUgaGFzaCBjb2RlIGZyb20gZ2l2ZW4gc3RyaW5nXG4gICAqIEBwYXJhbSAge1N0cmluZ30gc3RyIC0gdG8gYmUgaGFzaGVkXG4gICAqIEByZXR1cm4ge1N0cmluZ30gdGhlIGhhc2hcbiAgICovXG4gIGhhc2hDb2RlKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLnJlZHVjZSgocHJldkhhc2gsIGN1cnJWYWwpID0+XG4gICAgICAoKHByZXZIYXNoIDw8IDUpIC0gcHJldkhhc2gpICsgY3VyclZhbC5jaGFyQ29kZUF0KDApLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJcyB0aGlzIG9uZSBvZiB0aGUgY2hhcnQtdmlldyBhcHBzICh0aGF0IGRvZXMgbm90IGhhdmUgYSBsaXN0IHZpZXcpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc0NoYXJ0QXBwKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0xpc3RBcHAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJcyB0aGlzIG9uZSBvZiB0aGUgbGlzdC12aWV3IGFwcHM/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTGlzdEFwcCgpIHtcbiAgICByZXR1cm4gWydsYW5ndmlld3MnLCAnbWFzc3ZpZXdzJywgJ3JlZGlyZWN0dmlld3MnXS5pbmNsdWRlcyh0aGlzLmFwcCk7XG4gIH1cblxuICAvKipcbiAgICogVGVzdCBpZiB0aGUgY3VycmVudCBwcm9qZWN0IGlzIGEgbXVsdGlsaW5ndWFsIHByb2plY3RcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGlzIG11bHRpbGluZ3VhbCBvciBub3RcbiAgICovXG4gIGlzTXVsdGlsYW5nUHJvamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChgLio/XFxcXC4oJHtQdi5tdWx0aWxhbmdQcm9qZWN0cy5qb2luKCd8Jyl9KWApLnRlc3QodGhpcy5wcm9qZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgbm9ybWFsaXplZCBwYWdlcyBmcm9tIEFQSSBpbnRvIGEgc3RyaW5nIG9mIHBhZ2UgbmFtZXNcbiAgICogVXNlZCBpbiBub3JtYWxpemVQYWdlTmFtZXMoKVxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHBhcmFtIHthcnJheX0gbm9ybWFsaXplZFBhZ2VzIC0gYXJyYXkgb2Ygbm9ybWFsaXplZCBtYXBwaW5ncyByZXR1cm5lZCBieSB0aGUgQVBJXG4gICAqIEByZXR1cm5zIHthcnJheX0gcGFnZXMgd2l0aCB0aGUgbmV3IG5vcm1hbGl6ZWQgbmFtZXMsIGlmIGdpdmVuXG4gICAqL1xuICBtYXBOb3JtYWxpemVkUGFnZU5hbWVzKHBhZ2VzLCBub3JtYWxpemVkUGFnZXMpIHtcbiAgICBub3JtYWxpemVkUGFnZXMuZm9yRWFjaChub3JtYWxQYWdlID0+IHtcbiAgICAgIC8qKiBkbyBpdCB0aGlzIHdheSB0byBwcmVzZXJ2ZSBvcmRlcmluZyBvZiBwYWdlcyAqL1xuICAgICAgcGFnZXMgPSBwYWdlcy5tYXAocGFnZSA9PiB7XG4gICAgICAgIGlmIChub3JtYWxQYWdlLmZyb20gPT09IHBhZ2UpIHtcbiAgICAgICAgICByZXR1cm4gbm9ybWFsUGFnZS50bztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcGFnZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgdmFsaWQgbXVsdGlsaW5ndWFsIHByb2plY3RzXG4gICAqIEByZXR1cm4ge0FycmF5fSBiYXNlIHByb2plY3RzLCB3aXRob3V0IHRoZSBsYW5ndWFnZVxuICAgKi9cbiAgc3RhdGljIGdldCBtdWx0aWxhbmdQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3dpa2lwZWRpYScsXG4gICAgICAnd2lraWJvb2tzJyxcbiAgICAgICd3aWtpbmV3cycsXG4gICAgICAnd2lraXF1b3RlJyxcbiAgICAgICd3aWtpc291cmNlJyxcbiAgICAgICd3aWtpdmVyc2l0eScsXG4gICAgICAnd2lraXZveWFnZSdcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgbWFzcyByZXF1ZXN0cyB0byBNZWRpYVdpa2kgQVBJXG4gICAqIFRoZSBBUEkgbm9ybWFsbHkgbGltaXRzIHRvIDUwMCBwYWdlcywgYnV0IGdpdmVzIHlvdSBhICdjb250aW51ZScgdmFsdWVcbiAgICogICB0byBmaW5pc2ggaXRlcmF0aW5nIHRocm91Z2ggdGhlIHJlc291cmNlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gcGFyYW1ldGVycyB0byBwYXNzIHRvIHRoZSBBUElcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb2plY3QgLSBwcm9qZWN0IHRvIHF1ZXJ5LCBlLmcuIGVuLndpa2lwZWRpYSAoLm9yZyBpcyBvcHRpb25hbClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb250aW51ZUtleV0gLSB0aGUga2V5IHRvIGxvb2sgaW4gdGhlIGNvbnRpbnVlIGhhc2gsIGlmIHByZXNlbnQgKGUuZy4gY21jb250aW51ZSBmb3IgQVBJOkNhdGVnb3J5bWVtYmVycylcbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IFtkYXRhS2V5XSAtIHRoZSBrZXkgZm9yIHRoZSBtYWluIGNodW5rIG9mIGRhdGEsIGluIHRoZSBxdWVyeSBoYXNoIChlLmcuIGNhdGVnb3J5bWVtYmVycyBmb3IgQVBJOkNhdGVnb3J5bWVtYmVycylcbiAgICogICBJZiB0aGlzIGlzIGEgZnVuY3Rpb24gaXQgaXMgZ2l2ZW4gdGhlIHJlc3BvbnNlIGRhdGEsIGFuZCBleHBlY3RlZCB0byByZXR1cm4gdGhlIGRhdGEgd2Ugd2FudCB0byBjb25jYXRlbnRhdGUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXRdIC0gbWF4IG51bWJlciBvZiBwYWdlcyB0byBmZXRjaFxuICAgKiBAcmV0dXJuIHtEZWZlcnJlZH0gcHJvbWlzZSByZXNvbHZpbmcgd2l0aCBkYXRhXG4gICAqL1xuICBtYXNzQXBpKHBhcmFtcywgcHJvamVjdCwgY29udGludWVLZXkgPSAnY29udGludWUnLCBkYXRhS2V5LCBsaW1pdCA9IHRoaXMuY29uZmlnLmFwaUxpbWl0KSB7XG4gICAgaWYgKCEvXFwub3JnJC8udGVzdChwcm9qZWN0KSkgcHJvamVjdCArPSAnLm9yZyc7XG5cbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgbGV0IHJlc29sdmVEYXRhID0ge1xuICAgICAgcGFnZXM6IFtdXG4gICAgfTtcblxuICAgIGNvbnN0IG1ha2VSZXF1ZXN0ID0gY29udGludWVWYWx1ZSA9PiB7XG4gICAgICBsZXQgcmVxdWVzdERhdGEgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgZm9ybWF0dmVyc2lvbjogJzInXG4gICAgICB9LCBwYXJhbXMpO1xuXG4gICAgICBpZiAoY29udGludWVWYWx1ZSkgcmVxdWVzdERhdGFbY29udGludWVLZXldID0gY29udGludWVWYWx1ZTtcblxuICAgICAgY29uc3QgcHJvbWlzZSA9ICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vJHtwcm9qZWN0fS93L2FwaS5waHBgLFxuICAgICAgICBqc29ucDogJ2NhbGxiYWNrJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgIGRhdGE6IHJlcXVlc3REYXRhXG4gICAgICB9KTtcblxuICAgICAgcHJvbWlzZS5kb25lKGRhdGEgPT4ge1xuICAgICAgICAvLyBzb21lIGZhaWx1cmVzIGNvbWUgYmFjayBhcyAyMDBzLCBzbyB3ZSBzdGlsbCByZXNvbHZlIGFuZCBsZXQgdGhlIGxvY2FsIGFwcCBoYW5kbGUgaXRcbiAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHJldHVybiBkZmQucmVzb2x2ZShkYXRhKTtcblxuICAgICAgICBsZXQgaXNGaW5pc2hlZDtcblxuICAgICAgICAvLyBhbGxvdyBjdXN0b20gZnVuY3Rpb24gdG8gcGFyc2UgdGhlIGRhdGEgd2Ugd2FudCwgaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhS2V5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzb2x2ZURhdGEucGFnZXMgPSByZXNvbHZlRGF0YS5wYWdlcy5jb25jYXQoZGF0YUtleShkYXRhLnF1ZXJ5KSk7XG4gICAgICAgICAgaXNGaW5pc2hlZCA9IHJlc29sdmVEYXRhLnBhZ2VzLmxlbmd0aCA+PSBsaW1pdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhcHBlbmQgbmV3IGRhdGEgdG8gZGF0YSBmcm9tIGxhc3QgcmVxdWVzdC4gV2UgbWlnaHQgd2FudCBib3RoICdwYWdlcycgYW5kIGRhdGFLZXlcbiAgICAgICAgICBpZiAoZGF0YS5xdWVyeS5wYWdlcykge1xuICAgICAgICAgICAgcmVzb2x2ZURhdGEucGFnZXMgPSByZXNvbHZlRGF0YS5wYWdlcy5jb25jYXQoZGF0YS5xdWVyeS5wYWdlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhLnF1ZXJ5W2RhdGFLZXldKSB7XG4gICAgICAgICAgICByZXNvbHZlRGF0YVtkYXRhS2V5XSA9IChyZXNvbHZlRGF0YVtkYXRhS2V5XSB8fCBbXSkuY29uY2F0KGRhdGEucXVlcnlbZGF0YUtleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiBwYWdlcyBpcyBub3QgdGhlIGNvbGxlY3Rpb24gd2Ugd2FudCwgaXQgd2lsbCBiZSBlaXRoZXIgYW4gZW1wdHkgYXJyYXkgb3Igb25lIGVudHJ5IHdpdGggYmFzaWMgcGFnZSBpbmZvXG4gICAgICAgICAgLy8gICBkZXBlbmRpbmcgb24gd2hhdCBBUEkgd2UncmUgaGl0dGluZy4gU28gcmVzb2x2ZURhdGFbZGF0YUtleV0gd2lsbCBoaXQgdGhlIGxpbWl0XG4gICAgICAgICAgaXNGaW5pc2hlZCA9IHJlc29sdmVEYXRhLnBhZ2VzLmxlbmd0aCA+PSBsaW1pdCB8fCByZXNvbHZlRGF0YVtkYXRhS2V5XS5sZW5ndGggPj0gbGltaXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHJlY3Vyc2l2ZSBjYWxsIGlmIG5lZWRlZCwgd2FpdGluZyAxMDBtc1xuICAgICAgICBpZiAoIWlzRmluaXNoZWQgJiYgZGF0YS5jb250aW51ZSAmJiBkYXRhLmNvbnRpbnVlW2NvbnRpbnVlS2V5XSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbWFrZVJlcXVlc3QoZGF0YS5jb250aW51ZVtjb250aW51ZUtleV0pO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaW5kaWNhdGUgdGhlcmUgd2VyZSBtb3JlIGVudHJpZXMgdGhhbiB0aGUgbGltaXRcbiAgICAgICAgICBpZiAoZGF0YS5jb250aW51ZSkgcmVzb2x2ZURhdGEuY29udGludWUgPSB0cnVlO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHJlc29sdmVEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgICAgZGZkLnJlamVjdChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtYWtlUmVxdWVzdCgpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2NhbGl6ZSBOdW1iZXIgb2JqZWN0IHdpdGggZGVsaW1pdGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSB0aGUgTnVtYmVyLCBlLmcuIDEyMzQ1NjdcbiAgICogQHJldHVybnMge3N0cmluZ30gLSB3aXRoIGxvY2FsZSBkZWxpbWl0ZXJzLCBlLmcuIDEsMjM0LDU2NyAoZW4tVVMpXG4gICAqL1xuICBuKHZhbHVlKSB7XG4gICAgcmV0dXJuIChuZXcgTnVtYmVyKHZhbHVlKSkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYmFzaWMgaW5mbyBvbiBnaXZlbiBwYWdlcywgaW5jbHVkaW5nIHRoZSBub3JtYWxpemVkIHBhZ2UgbmFtZXMuXG4gICAqIEUuZy4gbWFzY3VsaW5lIHZlcnN1cyBmZW1pbmluZSBuYW1lc3BhY2VzIG9uIGRld2lraVxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge0RlZmVycmVkfSBwcm9taXNlIHdpdGggZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqL1xuICBnZXRQYWdlSW5mbyhwYWdlcykge1xuICAgIGxldCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgIHVybDogYGh0dHBzOi8vJHt0aGlzLnByb2plY3R9Lm9yZy93L2FwaS5waHA/YWN0aW9uPXF1ZXJ5JnByb3A9aW5mbyZpbnByb3A9cHJvdGVjdGlvbnx3YXRjaGVyc2AgK1xuICAgICAgICBgJmZvcm1hdHZlcnNpb249MiZmb3JtYXQ9anNvbiZ0aXRsZXM9JHtwYWdlcy5qb2luKCd8Jyl9YCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIGxldCBwYWdlRGF0YSA9IHt9O1xuICAgICAgZGF0YS5xdWVyeS5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgICBwYWdlRGF0YVtwYWdlLnRpdGxlXSA9IHBhZ2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkZmQucmVzb2x2ZShwYWdlRGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZSBob3cgbWFueSBkYXlzIGFyZSBpbiB0aGUgc2VsZWN0ZWQgZGF0ZSByYW5nZVxuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gbnVtYmVyIG9mIGRheXNcbiAgICovXG4gIG51bURheXNJblJhbmdlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmRpZmYodGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLCAnZGF5cycpICsgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBrZXkvdmFsdWUgcGFpcnMgb2YgVVJMIHF1ZXJ5IHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW211bHRpUGFyYW1dIC0gcGFyYW1ldGVyIHdob3NlIHZhbHVlcyBuZWVkcyB0byBzcGxpdCBieSBwaXBlIGNoYXJhY3RlclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBrZXkvdmFsdWUgcGFpcnMgcmVwcmVzZW50YXRpb24gb2YgcXVlcnkgc3RyaW5nXG4gICAqL1xuICBwYXJzZVF1ZXJ5U3RyaW5nKG11bHRpUGFyYW0pIHtcbiAgICBjb25zdCB1cmkgPSBkZWNvZGVVUkkobG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpKSxcbiAgICAgIGNodW5rcyA9IHVyaS5zcGxpdCgnJicpO1xuICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2h1bmsgPSBjaHVua3NbaV0uc3BsaXQoJz0nKTtcblxuICAgICAgaWYgKG11bHRpUGFyYW0gJiYgY2h1bmtbMF0gPT09IG11bHRpUGFyYW0pIHtcbiAgICAgICAgcGFyYW1zW211bHRpUGFyYW1dID0gY2h1bmtbMV0uc3BsaXQoJ3wnKS5maWx0ZXIocGFyYW0gPT4gISFwYXJhbSkudW5pcXVlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXNbY2h1bmtbMF1dID0gY2h1bmtbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW1wbGUgbWV0cmljIHRvIHNlZSBob3cgbWFueSB1c2UgaXQgKHBhZ2V2aWV3cyBvZiB0aGUgcGFnZXZpZXcsIGEgbWV0YS1wYWdldmlldywgaWYgeW91IHdpbGwgOilcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwcCAtIG9uZSBvZjogcHYsIGx2LCB0diwgc3YsIG1zXG4gICAqIEByZXR1cm4ge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHBhdGNoVXNhZ2UoYXBwKSB7XG4gICAgaWYgKG1ldGFSb290KSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvLyR7bWV0YVJvb3R9L3VzYWdlLyR7dGhpcy5hcHB9LyR7dGhpcy5wcm9qZWN0IHx8IGkxOG5MYW5nfWAsXG4gICAgICAgIG1ldGhvZDogJ1BBVENIJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aW1lc3RhbXAgb2Ygd2hlbiBwcm9jZXNzIHN0YXJ0ZWRcbiAgICogQHJldHVybiB7bW9tZW50fSBzdGFydCB0aW1lXG4gICAqL1xuICBwcm9jZXNzU3RhcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzU3RhcnQgPSBtb21lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZWxhcHNlZCB0aW1lIGZyb20gdGhpcy5wcm9jZXNzU3RhcnQsIGFuZCBzaG93IGl0XG4gICAqIEByZXR1cm4ge21vbWVudH0gRWxhcHNlZCB0aW1lIGZyb20gYHRoaXMucHJvY2Vzc1N0YXJ0YCBpbiBtaWxsaXNlY29uZHNcbiAgICovXG4gIHByb2Nlc3NFbmRlZCgpIHtcbiAgICBjb25zdCBlbmRUaW1lID0gbW9tZW50KCksXG4gICAgICBlbGFwc2VkVGltZSA9IGVuZFRpbWUuZGlmZih0aGlzLnByb2Nlc3NTdGFydCwgJ21pbGxpc2Vjb25kcycpO1xuXG4gICAgLyoqIEZJWE1FOiByZXBvcnQgdGhpcyBidWc6IHNvbWUgbGFuZ3VhZ2VzIGRvbid0IHBhcnNlIFBMVVJBTCBjb3JyZWN0bHkgKCdoZScgZm9yIGV4YW1wbGUpIHdpdGggdGhlIEVuZ2xpc2ggZmFsbGJhY2sgbWVzc2FnZSAqL1xuICAgIHRyeSB7XG4gICAgICAkKCcuZWxhcHNlZC10aW1lJykuYXR0cignZGF0ZXRpbWUnLCBlbmRUaW1lLmZvcm1hdCgpKVxuICAgICAgICAudGV4dCgkLmkxOG4oJ2VsYXBzZWQtdGltZScsIGVsYXBzZWRUaW1lIC8gMTAwMCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGludGVudGlvbmFsbCBub3RoaW5nLCBldmVyeXRoaW5nIHdpbGwgc3RpbGwgc2hvd1xuICAgIH1cblxuICAgIHJldHVybiBlbGFwc2VkVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGFwdGVkIGZyb20gaHR0cDovL2pzZmlkZGxlLm5ldC9kYW5kdi80N2Niai8gY291cnRlc3kgb2YgZGFuZHZcbiAgICpcbiAgICogU2FtZSBhcyBfLmRlYm91bmNlIGJ1dCBxdWV1ZXMgYW5kIGV4ZWN1dGVzIGFsbCBmdW5jdGlvbiBjYWxsc1xuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gLSBmdW5jdGlvbiB0byBkZWJvdW5jZVxuICAgKiBAcGFyYW0gIHtkZWxheX0gZGVsYXkgLSBkZWxheSBkdXJhdGlvbiBvZiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtICB7b2JqZWN0fSBjb250ZXh0IC0gc2NvcGUgdGhlIGZ1bmN0aW9uIHNob3VsZCByZWZlciB0b1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmF0ZS1saW1pdGVkIGZ1bmN0aW9uIHRvIGNhbGwgaW5zdGVhZCBvZiB5b3VyIGZ1bmN0aW9uXG4gICAqL1xuICByYXRlTGltaXQoZm4sIGRlbGF5LCBjb250ZXh0KSB7XG4gICAgbGV0IHF1ZXVlID0gW10sIHRpbWVyO1xuXG4gICAgY29uc3QgcHJvY2Vzc1F1ZXVlID0gKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBmbi5hcHBseShpdGVtLmNvbnRleHQsIGl0ZW0uYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lciksIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxpbWl0ZWQoKSB7XG4gICAgICBxdWV1ZS5wdXNoKHtcbiAgICAgICAgY29udGV4dDogY29udGV4dCB8fCB0aGlzLFxuICAgICAgICBhcmd1bWVudHM6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgcHJvY2Vzc1F1ZXVlKCk7IC8vIHN0YXJ0IGltbWVkaWF0ZWx5IG9uIHRoZSBmaXJzdCBpbnZvY2F0aW9uXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwocHJvY2Vzc1F1ZXVlLCBkZWxheSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBTZWxlY3QyIHJlbGF0ZWQgc3R1ZmYgdGhlbiBhZGRzIGl0IGJhY2tcbiAgICogQWxzbyBtaWdodCByZXN1bHQgaW4gdGhlIGNoYXJ0IGJlaW5nIHJlLXJlbmRlcmVkXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICByZXNldFNlbGVjdDIoKSB7XG4gICAgY29uc3Qgc2VsZWN0MklucHV0ID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpO1xuICAgIHNlbGVjdDJJbnB1dC5vZmYoJ2NoYW5nZScpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCd2YWwnLCBudWxsKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MignZGF0YScsIG51bGwpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCdkZXN0cm95Jyk7XG4gICAgdGhpcy5zZXR1cFNlbGVjdDIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgYWxwaGEgbGV2ZWwgb2YgYW4gcmdiYSB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSByZ2JhIHZhbHVlXG4gICAqIEBwYXJhbSB7ZmxvYXR8c3RyaW5nfSBhbHBoYSAtIHRyYW5zcGFyZW5jeSBhcyBmbG9hdCB2YWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSByZ2JhIHZhbHVlXG4gICAqL1xuICByZ2JhKHZhbHVlLCBhbHBoYSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8sXFxzKlxcZFxcKS8sIGAsICR7YWxwaGF9KWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgYSBwYXJ0aWN1bGFyIHNldHRpbmcgdG8gc2Vzc2lvbiBhbmQgbG9jYWxTdG9yYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBzZXR0aW5ncyBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbn0gdmFsdWUgLSB2YWx1ZSB0byBzYXZlXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzYXZlU2V0dGluZyhrZXksIHZhbHVlKSB7XG4gICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoYHBhZ2V2aWV3cy1zZXR0aW5ncy0ke2tleX1gLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgc2VsZWN0ZWQgc2V0dGluZ3Mgd2l0aGluIHRoZSBzZXR0aW5ncyBtb2RhbFxuICAgKiBQcmVmZXIgdGhpcyBpbXBsZW1lbnRhdGlvbiBvdmVyIGEgbGFyZ2UgbGlicmFyeSBsaWtlIHNlcmlhbGl6ZU9iamVjdCBvciBzZXJpYWxpemVKU09OXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzYXZlU2V0dGluZ3MoKSB7XG4gICAgLyoqIHRyYWNrIGlmIHdlJ3JlIGNoYW5naW5nIHRvIG5vX2F1dG9jb21wbGV0ZSBtb2RlICovXG4gICAgY29uc3Qgd2FzQXV0b2NvbXBsZXRlID0gdGhpcy5hdXRvY29tcGxldGUgPT09ICdub19hdXRvY29tcGxldGUnO1xuXG4gICAgJC5lYWNoKCQoJyNzZXR0aW5ncy1tb2RhbCBpbnB1dCcpLCAoaW5kZXgsIGVsKSA9PiB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICB0aGlzLnNhdmVTZXR0aW5nKGVsLm5hbWUsIGVsLmNoZWNrZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwuY2hlY2tlZCkge1xuICAgICAgICB0aGlzLnNhdmVTZXR0aW5nKGVsLm5hbWUsIGVsLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmFwcCAhPT0gJ3RvcHZpZXdzJykge1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIubG9jYWxlLmZvcm1hdCA9IHRoaXMuZGF0ZUZvcm1hdDtcbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnVwZGF0ZUVsZW1lbnQoKTtcblxuICAgICAgdGhpcy5zZXR1cFNlbGVjdDJDb2xvcnMoKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBJZiB3ZSBjaGFuZ2VkIHRvL2Zyb20gbm9fYXV0b2NvbXBsZXRlIHdlIGhhdmUgdG8gcmVzZXQgU2VsZWN0MiBlbnRpcmVseVxuICAgICAgICogICBhcyBzZXRTZWxlY3QyRGVmYXVsdHMgaXMgc3VwZXIgYnVnZ3kgZHVlIHRvIFNlbGVjdDIgY29uc3RyYWludHNcbiAgICAgICAqIFNvIGxldCdzIG9ubHkgcmVzZXQgaWYgd2UgaGF2ZSB0b1xuICAgICAgICovXG4gICAgICBpZiAoKHRoaXMuYXV0b2NvbXBsZXRlID09PSAnbm9fYXV0b2NvbXBsZXRlJykgIT09IHdhc0F1dG9jb21wbGV0ZSkge1xuICAgICAgICB0aGlzLnJlc2V0U2VsZWN0MigpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5iZWdpbkF0WmVybyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb2Nlc3NJbnB1dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXJlY3RseSBzZXQgaXRlbXMgaW4gU2VsZWN0MlxuICAgKiBDdXJyZW50bHkgaXMgbm90IGFibGUgdG8gcmVtb3ZlIHVuZGVyc2NvcmVzIGZyb20gcGFnZSBuYW1lc1xuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBpdGVtcyAtIHBhZ2UgdGl0bGVzXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSB1bnRvdWNoZWQgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldFNlbGVjdDJEZWZhdWx0cyhpdGVtcykge1xuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBlc2NhcGVkVGV4dCA9ICQoJzxkaXY+JykudGV4dChpdGVtKS5odG1sKCk7XG4gICAgICAkKCc8b3B0aW9uPicgKyBlc2NhcGVkVGV4dCArICc8L29wdGlvbj4nKS5hcHBlbmRUbyh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpO1xuICAgIH0pO1xuICAgICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KS5zZWxlY3QyKCd2YWwnLCBpdGVtcyk7XG4gICAgJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ2Nsb3NlJyk7XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGF0ZXJhbmdlIHBpY2tlciB2YWx1ZXMgYW5kIHRoaXMuc3BlY2lhbFJhbmdlIGJhc2VkIG9uIHByb3ZpZGVkIHNwZWNpYWwgcmFuZ2Uga2V5XG4gICAqIFdBUk5JTkc6IG5vdCB0byBiZSBjYWxsZWQgb24gZGF0ZXJhbmdlIHBpY2tlciBHVUkgZXZlbnRzIChlLmcuIHNwZWNpYWwgcmFuZ2UgYnV0dG9ucylcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBvbmUgb2Ygc3BlY2lhbCByYW5nZXMgZGVmaW5lZCBpbiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLFxuICAgKiAgIGluY2x1ZGluZyBkeW5hbWljIGxhdGVzdCByYW5nZSwgc3VjaCBhcyBgbGF0ZXN0LTE1YCBmb3IgbGF0ZXN0IDE1IGRheXNcbiAgICogQHJldHVybnMge29iamVjdHxudWxsfSB1cGRhdGVkIHRoaXMuc3BlY2lhbFJhbmdlIG9iamVjdCBvciBudWxsIGlmIHR5cGUgd2FzIGludmFsaWRcbiAgICovXG4gIHNldFNwZWNpYWxSYW5nZSh0eXBlKSB7XG4gICAgY29uc3QgcmFuZ2VJbmRleCA9IE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMpLmluZGV4T2YodHlwZSk7XG4gICAgbGV0IHN0YXJ0RGF0ZSwgZW5kRGF0ZTtcblxuICAgIGlmICh0eXBlLmluY2x1ZGVzKCdsYXRlc3QtJykpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHBhcnNlSW50KHR5cGUucmVwbGFjZSgnbGF0ZXN0LScsICcnKSwgMTApIHx8IDIwOyAvLyBmYWxsYmFjayBvZiAyMFxuICAgICAgW3N0YXJ0RGF0ZSwgZW5kRGF0ZV0gPSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLmxhdGVzdChvZmZzZXQpO1xuICAgIH0gZWxzZSBpZiAocmFuZ2VJbmRleCA+PSAwKSB7XG4gICAgICAvKiogdHJlYXQgJ2xhdGVzdCcgYXMgYSBmdW5jdGlvbiAqL1xuICAgICAgW3N0YXJ0RGF0ZSwgZW5kRGF0ZV0gPSB0eXBlID09PSAnbGF0ZXN0JyA/IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMubGF0ZXN0KCkgOiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzW3R5cGVdO1xuICAgICAgJCgnLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpJykuZXEocmFuZ2VJbmRleCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3BlY2lhbFJhbmdlID0ge1xuICAgICAgcmFuZ2U6IHR5cGUsXG4gICAgICB2YWx1ZTogYCR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpfSAtICR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KX1gXG4gICAgfTtcblxuICAgIC8qKiBkaXJlY3RseSBhc3NpZ24gc3RhcnREYXRlIHRoZW4gdXNlIHNldEVuZERhdGUgc28gdGhhdCB0aGUgZXZlbnRzIHdpbGwgYmUgZmlyZWQgb25jZSAqL1xuICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zZXRFbmREYXRlKGVuZERhdGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3BlY2lhbFJhbmdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIGNvbG9ycyBmb3IgU2VsZWN0MiBlbnRyaWVzIHNvIHdlIGNhbiBkeW5hbWljYWxseSBjaGFuZ2UgdGhlbVxuICAgKiBUaGlzIGlzIGEgbmVjZXNzYXJ5IGV2aWwsIGFzIHdlIGhhdmUgdG8gbWFyayB0aGVtIGFzICFpbXBvcnRhbnRcbiAgICogICBhbmQgc2luY2UgdGhlcmUgYXJlIGFueSBudW1iZXIgb2YgZW50aXJlcywgd2UgbmVlZCB0byB1c2UgbnRoLWNoaWxkIHNlbGVjdG9yc1xuICAgKiBAcmV0dXJucyB7Q1NTU3R5bGVzaGVldH0gb3VyIG5ldyBzdHlsZXNoZWV0XG4gICAqL1xuICBzZXR1cFNlbGVjdDJDb2xvcnMoKSB7XG4gICAgLyoqIGZpcnN0IGRlbGV0ZSBvbGQgc3R5bGVzaGVldCwgaWYgcHJlc2VudCAqL1xuICAgIGlmICh0aGlzLmNvbG9yc1N0eWxlRWwpIHRoaXMuY29sb3JzU3R5bGVFbC5yZW1vdmUoKTtcblxuICAgIC8qKiBjcmVhdGUgbmV3IHN0eWxlc2hlZXQgKi9cbiAgICB0aGlzLmNvbG9yc1N0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRoaXMuY29sb3JzU3R5bGVFbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpOyAvLyBXZWJLaXQgaGFjayA6KFxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5jb2xvcnNTdHlsZUVsKTtcblxuICAgIC8qKiBhZGQgY29sb3IgcnVsZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5jb2xvcnMuZm9yRWFjaCgoY29sb3IsIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmNvbG9yc1N0eWxlRWwuc2hlZXQuaW5zZXJ0UnVsZShgLnNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2U6bnRoLW9mLXR5cGUoJHtpbmRleCArIDF9KSB7IGJhY2tncm91bmQ6ICR7Y29sb3J9ICFpbXBvcnRhbnQgfWAsIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY29sb3JzU3R5bGVFbC5zaGVldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcm9zcy1hcHBsaWNhdGlvbiBsaXN0ZW5lcnNcbiAgICogRWFjaCBhcHAgaGFzIGl0J3Mgb3duIHNldHVwTGlzdGVuZXJzKCkgdGhhdCBzaG91bGQgY2FsbCBzdXBlci5zZXR1cExpc3RlbmVycygpXG4gICAqIEByZXR1cm4ge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldHVwTGlzdGVuZXJzKCkge1xuICAgIC8qKiBwcmV2ZW50IGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW91ciBmb3IgYW55IGxpbmsgd2l0aCBocmVmPVwiI1wiICovXG4gICAgJChcImFbaHJlZj0nIyddXCIpLm9uKCdjbGljaycsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcblxuICAgIC8qKiBkb3dubG9hZCBsaXN0ZW5lcnMgKi9cbiAgICAkKCcuZG93bmxvYWQtY3N2Jykub24oJ2NsaWNrJywgdGhpcy5leHBvcnRDU1YuYmluZCh0aGlzKSk7XG4gICAgJCgnLmRvd25sb2FkLWpzb24nKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydEpTT04uYmluZCh0aGlzKSk7XG5cbiAgICAvKiogcHJvamVjdCBpbnB1dCBsaXN0ZW5lcnMsIHNhdmluZyBhbmQgcmVzdG9yaW5nIG9sZCB2YWx1ZSBpZiBuZXcgb25lIGlzIGludmFsaWQgKi9cbiAgICAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkub24oJ2ZvY3VzaW4nLCBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZGF0YXNldC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfSk7XG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLm9uKCdjaGFuZ2UnLCBlID0+IHRoaXMudmFsaWRhdGVQcm9qZWN0KGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdmFsdWVzIG9mIGZvcm0gYmFzZWQgb24gbG9jYWxTdG9yYWdlIG9yIGRlZmF1bHRzLCBhZGQgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzZXR1cFNldHRpbmdzTW9kYWwoKSB7XG4gICAgLyoqIGZpbGwgaW4gdmFsdWVzLCBldmVyeXRoaW5nIGlzIGVpdGhlciBhIGNoZWNrYm94IG9yIHJhZGlvICovXG4gICAgdGhpcy5maWxsSW5TZXR0aW5ncygpO1xuXG4gICAgLyoqIGFkZCBsaXN0ZW5lciAqL1xuICAgICQoJy5zYXZlLXNldHRpbmdzLWJ0bicpLm9uKCdjbGljaycsIHRoaXMuc2F2ZVNldHRpbmdzLmJpbmQodGhpcykpO1xuICAgICQoJy5jYW5jZWwtc2V0dGluZ3MtYnRuJykub24oJ2NsaWNrJywgdGhpcy5maWxsSW5TZXR0aW5ncy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgY29uc3QgZGF0ZVJhbmdlU2VsZWN0b3IgPSAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKTtcblxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzIHRvIGhhdmUgaTE4biBhcyBrZXlzXG4gICAgICogVGhpcyBpcyB3aGF0IGlzIHNob3duIGFzIHRoZSBzcGVjaWFsIHJhbmdlcyAoTGFzdCBtb250aCwgZXRjLikgaW4gdGhlIGRhdGVwaWNrZXIgbWVudVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgbGV0IHJhbmdlcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkgPT09ICdsYXRlc3QnKSByZXR1cm47IC8vIHRoaXMgaXMgYSBmdW5jdGlvbiwgbm90IG1lYW50IHRvIGJlIGluIHRoZSBsaXN0IG9mIHNwZWNpYWwgcmFuZ2VzXG4gICAgICByYW5nZXNbJC5pMThuKGtleSldID0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1trZXldO1xuICAgIH0pO1xuXG4gICAgbGV0IGRhdGVwaWNrZXJPcHRpb25zID0ge1xuICAgICAgbG9jYWxlOiB7XG4gICAgICAgIGZvcm1hdDogdGhpcy5kYXRlRm9ybWF0LFxuICAgICAgICBhcHBseUxhYmVsOiAkLmkxOG4oJ2FwcGx5JyksXG4gICAgICAgIGNhbmNlbExhYmVsOiAkLmkxOG4oJ2NhbmNlbCcpLFxuICAgICAgICBjdXN0b21SYW5nZUxhYmVsOiAkLmkxOG4oJ2N1c3RvbS1yYW5nZScpLFxuICAgICAgICBkYXlzT2ZXZWVrOiBbXG4gICAgICAgICAgJC5pMThuKCdzdScpLFxuICAgICAgICAgICQuaTE4bignbW8nKSxcbiAgICAgICAgICAkLmkxOG4oJ3R1JyksXG4gICAgICAgICAgJC5pMThuKCd3ZScpLFxuICAgICAgICAgICQuaTE4bigndGgnKSxcbiAgICAgICAgICAkLmkxOG4oJ2ZyJyksXG4gICAgICAgICAgJC5pMThuKCdzYScpXG4gICAgICAgIF0sXG4gICAgICAgIG1vbnRoTmFtZXM6IFtcbiAgICAgICAgICAkLmkxOG4oJ2phbnVhcnknKSxcbiAgICAgICAgICAkLmkxOG4oJ2ZlYnJ1YXJ5JyksXG4gICAgICAgICAgJC5pMThuKCdtYXJjaCcpLFxuICAgICAgICAgICQuaTE4bignYXByaWwnKSxcbiAgICAgICAgICAkLmkxOG4oJ21heScpLFxuICAgICAgICAgICQuaTE4bignanVuZScpLFxuICAgICAgICAgICQuaTE4bignanVseScpLFxuICAgICAgICAgICQuaTE4bignYXVndXN0JyksXG4gICAgICAgICAgJC5pMThuKCdzZXB0ZW1iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ29jdG9iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ25vdmVtYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdkZWNlbWJlcicpXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBzdGFydERhdGU6IG1vbWVudCgpLnN1YnRyYWN0KHRoaXMuY29uZmlnLmRheXNBZ28sICdkYXlzJyksXG4gICAgICBtaW5EYXRlOiB0aGlzLmNvbmZpZy5taW5EYXRlLFxuICAgICAgbWF4RGF0ZTogdGhpcy5jb25maWcubWF4RGF0ZSxcbiAgICAgIHJhbmdlczogcmFuZ2VzXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5kYXRlTGltaXQpIGRhdGVwaWNrZXJPcHRpb25zLmRhdGVMaW1pdCA9IHsgZGF5czogdGhpcy5jb25maWcuZGF0ZUxpbWl0IH07XG5cbiAgICBkYXRlUmFuZ2VTZWxlY3Rvci5kYXRlcmFuZ2VwaWNrZXIoZGF0ZXBpY2tlck9wdGlvbnMpO1xuXG4gICAgLyoqIHNvIHBlb3BsZSBrbm93IHdoeSB0aGV5IGNhbid0IHF1ZXJ5IGRhdGEgb2xkZXIgdGhhbiBKdWx5IDIwMTUgKi9cbiAgICAkKCcuZGF0ZXJhbmdlcGlja2VyJykuYXBwZW5kKFxuICAgICAgJCgnPGRpdj4nKVxuICAgICAgICAuYWRkQ2xhc3MoJ2RhdGVyYW5nZS1ub3RpY2UnKVxuICAgICAgICAuaHRtbCgkLmkxOG4oJ2RhdGUtbm90aWNlJywgZG9jdW1lbnQudGl0bGUsXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwOi8vc3RhdHMuZ3Jvay5zZScgdGFyZ2V0PSdfYmxhbmsnPnN0YXRzLmdyb2suc2U8L2E+XCIsXG4gICAgICAgICAgYCR7JC5pMThuKCdqdWx5Jyl9IDIwMTVgXG4gICAgICAgICkpXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzcGVjaWFsIGRhdGUgcmFuZ2Ugb3B0aW9ucyAoYnV0dG9ucyB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgZGF0ZXJhbmdlIHBpY2tlcilcbiAgICAgKlxuICAgICAqIFdBUk5JTkc6IHdlJ3JlIHVuYWJsZSB0byBhZGQgY2xhc3MgbmFtZXMgb3IgZGF0YSBhdHRycyB0byB0aGUgcmFuZ2Ugb3B0aW9ucyxcbiAgICAgKiBzbyBjaGVja2luZyB3aGljaCB3YXMgY2xpY2tlZCBpcyBoYXJkY29kZWQgYmFzZWQgb24gdGhlIGluZGV4IG9mIHRoZSBMSSxcbiAgICAgKiBhcyBkZWZpbmVkIGluIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNcbiAgICAgKi9cbiAgICAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gJCgnLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpJykuaW5kZXgoZS50YXJnZXQpLFxuICAgICAgICBjb250YWluZXIgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5jb250YWluZXIsXG4gICAgICAgIGlucHV0cyA9IGNvbnRhaW5lci5maW5kKCcuZGF0ZXJhbmdlcGlja2VyX2lucHV0IGlucHV0Jyk7XG4gICAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IHtcbiAgICAgICAgcmFuZ2U6IE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMpW2luZGV4XSxcbiAgICAgICAgdmFsdWU6IGAke2lucHV0c1swXS52YWx1ZX0gLSAke2lucHV0c1sxXS52YWx1ZX1gXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3Rvcikub24oJ2FwcGx5LmRhdGVyYW5nZXBpY2tlcicsIChlLCBhY3Rpb24pID0+IHtcbiAgICAgIGlmIChhY3Rpb24uY2hvc2VuTGFiZWwgPT09ICQuaTE4bignY3VzdG9tLXJhbmdlJykpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuXG4gICAgICAgIC8qKiBmb3JjZSBldmVudHMgdG8gcmUtZmlyZSBzaW5jZSBhcHBseS5kYXRlcmFuZ2VwaWNrZXIgb2NjdXJzIGJlZm9yZSAnY2hhbmdlJyBldmVudCAqL1xuICAgICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci51cGRhdGVFbGVtZW50KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaG93RmF0YWxFcnJvcnMoZXJyb3JzKSB7XG4gICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgZXJyb3JzLmZvckVhY2goZXJyb3IgPT4ge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgIGA8c3Ryb25nPiR7JC5pMThuKCdmYXRhbC1lcnJvcicpfTwvc3Ryb25nPjogPGNvZGU+JHtlcnJvcn08L2NvZGU+YCxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICB0aHJvdyBlcnJvcnNbMF07XG4gICAgfSBlbHNlIGlmIChlcnJvcnMgJiYgZXJyb3JzWzBdICYmIGVycm9yc1swXS5zdGFjaykge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy8vdG9vbHMud21mbGFicy5vcmcvbXVzaWthbmltYWwvcGFzdGUnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29udGVudDogJycgK1xuICAgICAgICAgICAgYFxcbmRhdGU6ICAgICAgJHttb21lbnQoKS51dGMoKS5mb3JtYXQoKX1gICtcbiAgICAgICAgICAgIGBcXG50b29sOiAgICAgICR7dGhpcy5hcHB9YCArXG4gICAgICAgICAgICBgXFxubGFuZ3VhZ2U6ICAke2kxOG5MYW5nfWAgK1xuICAgICAgICAgICAgYFxcbmNoYXJ0OiAgICAgJHt0aGlzLmNoYXJ0VHlwZX1gICtcbiAgICAgICAgICAgIGBcXG51cmw6ICAgICAgICR7ZG9jdW1lbnQubG9jYXRpb24uaHJlZn1gICtcbiAgICAgICAgICAgIGBcXG51c2VyQWdlbnQ6ICR7dGhpcy5nZXRVc2VyQWdlbnQoKX1gICtcbiAgICAgICAgICAgIGBcXG50cmFjZTogICAgICR7ZXJyb3JzWzBdLnN0YWNrfWBcbiAgICAgICAgICAsXG4gICAgICAgICAgdGl0bGU6IGBQYWdldmlld3MgQW5hbHlzaXMgZXJyb3IgcmVwb3J0OiAke2Vycm9yc1swXX1gXG4gICAgICAgIH1cbiAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0Lm9iamVjdE5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAgICQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKGRhdGEucmVzdWx0Lm9iamVjdE5hbWUpKSxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSksXG4gICAgICAgICAgICAnZXJyb3InXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbCgoKSA9PiB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpLFxuICAgICAgICAgICdlcnJvcidcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxhc2ggaW4gY29uc29sZSwganVzdCBmb3IgZnVuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IG91dHB1dFxuICAgKi9cbiAgc3BsYXNoKCkge1xuICAgIGNvbnN0IHN0eWxlID0gJ2JhY2tncm91bmQ6ICNlZWU7IGNvbG9yOiAjNTU1OyBwYWRkaW5nOiA0cHg7IGZvbnQtZmFtaWx5Om1vbm9zcGFjZSc7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgX19fICAgICAgICAgICAgX18gXyAgICAgICAgICAgICAgICAgICAgIF8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgIHwgXyBcXFxcICBfXyBfICAgIC8gX2AgfCAgIF9fXyAgICBfXyBfXyAgICAoXykgICAgIF9fXyAgIF9fIF9fIF9fICBfX18gICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgfCAgXy8gLyBfYCB8ICAgXFxcXF9fLCB8ICAvIC1fKSAgIFxcXFwgViAvICAgIHwgfCAgICAvIC1fKSAgXFxcXCBWICBWIC8gKF8tPCAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgIF98X3xfICBcXFxcX18sX3wgICB8X19fLyAgIFxcXFxfX198ICAgX1xcXFxfL18gICBffF98XyAgIFxcXFxfX198ICAgXFxcXF8vXFxcXF8vICAvX18vXyAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgIF98IFwiXCJcIiB8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInwgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgIFwiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJyAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgICAgICAgICAgX19fICAgICAgICAgICAgICAgICAgICAgXyAgXyAgICAgXyAgICAgICAgICAgICAgIF8gICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgbyBPIE8gIC8gICBcXFxcICAgXyBfICAgICBfXyBfICAgIHwgfHwgfCAgIHwgfCAgICAgX19fICAgICAoXykgICAgIF9fXyAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgIG8gICAgICAgfCAtIHwgIHwgXFwnIFxcXFwgICAvIF9gIHwgICAgXFxcXF8sIHwgICB8IHwgICAgKF8tPCAgICAgfCB8ICAgIChfLTwgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgIFRTX19bT10gIHxffF98ICB8X3x8X3wgIFxcXFxfXyxffCAgIF98X18vICAgX3xffF8gICAvX18vXyAgIF98X3xfICAgL19fL18gICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICB7PT09PT09fF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98IFwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInwgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgLi9vLS0wMDBcXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKGAlYyAgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBNdXNpa0FuaW1hbCwgS2FsZGFyaSwgTWFyY2VsIFJ1aXogRm9ybnMgICAgICAgICAgICAgICAgICBgLCBzdHlsZSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBsb2FkaW5nIGluZGljYXRvciBjbGFzcyBhbmQgc2V0IHRoZSBzYWZlZ3VhcmQgdGltZW91dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc3RhcnRTcGlubnkoKSB7XG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGVyciA9PiB7XG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoYDxzdHJvbmc+JHskLmkxOG4oJ2ZhdGFsLWVycm9yJyl9PC9zdHJvbmc+OlxuICAgICAgICAkeyQuaTE4bignZXJyb3ItdGltZWQtb3V0Jyl9XG4gICAgICAgICR7JC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSl9XG4gICAgICBgLCAnZXJyb3InLCAwKTtcbiAgICB9LCAyMCAqIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBsb2FkaW5nIGluZGljYXRvciBjbGFzcyBhbmQgY2xlYXIgdGhlIHNhZmVndWFyZCB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzdG9wU3Bpbm55KCkge1xuICAgICQoJy5jaGFydC1jb250YWluZXInKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2Ugc3BhY2VzIHdpdGggdW5kZXJzY29yZXNcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEByZXR1cm5zIHthcnJheX0gcGFnZSBuYW1lcyB3aXRoIHVuZGVyc2NvcmVzXG4gICAqL1xuICB1bmRlcnNjb3JlUGFnZU5hbWVzKHBhZ2VzKSB7XG4gICAgcmV0dXJuIHBhZ2VzLm1hcChwYWdlID0+IHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFnZSkuc2NvcmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaHJlZnMgb2YgaW50ZXItYXBwIGxpbmtzIHRvIGxvYWQgY3VycmVudGx5IHNlbGVjdGVkIHByb2plY3RcbiAgICogQHJldHVybiB7bnVsbH0gbnV0dGluJ1xuICAgKi9cbiAgdXBkYXRlSW50ZXJBcHBMaW5rcygpIHtcbiAgICAkKCcuaW50ZXJhcHAtbGluaycpLmVhY2goKGksIGxpbmspID0+IHtcbiAgICAgIGxldCB1cmwgPSBsaW5rLmhyZWYuc3BsaXQoJz8nKVswXTtcblxuICAgICAgaWYgKGxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnRlcmFwcC1saW5rLS1zaXRldmlld3MnKSkge1xuICAgICAgICBsaW5rLmhyZWYgPSBgJHt1cmx9P3NpdGVzPSR7dGhpcy5wcm9qZWN0LmVzY2FwZSgpfS5vcmdgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluay5ocmVmID0gYCR7dXJsfT9wcm9qZWN0PSR7dGhpcy5wcm9qZWN0LmVzY2FwZSgpfS5vcmdgO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGJhc2ljIHBhcmFtcyBhZ2FpbnN0IHdoYXQgaXMgZGVmaW5lZCBpbiB0aGUgY29uZmlnLFxuICAgKiAgIGFuZCBpZiB0aGV5IGFyZSBpbnZhbGlkIHNldCB0aGUgZGVmYXVsdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gcGFyYW1zIGFzIGZldGNoZWQgYnkgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKClcbiAgICogQHJldHVybnMge09iamVjdH0gc2FtZSBwYXJhbXMgd2l0aCBzb21lIGludmFsaWQgcGFyYW1ldGVycyBjb3JyZXRlZCwgYXMgbmVjZXNzYXJ5XG4gICAqL1xuICB2YWxpZGF0ZVBhcmFtcyhwYXJhbXMpIHtcbiAgICB0aGlzLmNvbmZpZy52YWxpZGF0ZVBhcmFtcy5mb3JFYWNoKHBhcmFtS2V5ID0+IHtcbiAgICAgIGlmIChwYXJhbUtleSA9PT0gJ3Byb2plY3QnICYmIHBhcmFtcy5wcm9qZWN0KSB7XG4gICAgICAgIHBhcmFtcy5wcm9qZWN0ID0gcGFyYW1zLnByb2plY3QucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5jb25maWcuZGVmYXVsdHNbcGFyYW1LZXldLFxuICAgICAgICBwYXJhbVZhbHVlID0gcGFyYW1zW3BhcmFtS2V5XTtcblxuICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAmJiAhdGhpcy5jb25maWcudmFsaWRQYXJhbXNbcGFyYW1LZXldLmluY2x1ZGVzKHBhcmFtVmFsdWUpKSB7XG4gICAgICAgIC8vIG9ubHkgdGhyb3cgZXJyb3IgaWYgdGhleSB0cmllZCB0byBwcm92aWRlIGFuIGludmFsaWQgdmFsdWVcbiAgICAgICAgaWYgKCEhcGFyYW1WYWx1ZSkge1xuICAgICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKHBhcmFtS2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtc1twYXJhbUtleV0gPSBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbGlzdGVuZXJzIHRvIHRoZSBwcm9qZWN0IGlucHV0IGZvciB2YWxpZGF0aW9ucyBhZ2FpbnN0IHRoZSBzaXRlIG1hcCxcbiAgICogICByZXZlcnRpbmcgdG8gdGhlIG9sZCB2YWx1ZSBpZiB0aGUgbmV3IG9uZSBpcyBpbnZhbGlkXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW211bHRpbGluZ3VhbF0gLSB3aGV0aGVyIHdlIHNob3VsZCBjaGVjayBpZiBpdCBpcyBhIG11bHRpbGluZ3VhbCBwcm9qZWN0XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSB3aGV0aGVyIG9yIG5vdCB2YWxpZGF0aW9ucyBwYXNzZWRcbiAgICovXG4gIHZhbGlkYXRlUHJvamVjdChtdWx0aWxpbmd1YWwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9ICQodGhpcy5jb25maWcucHJvamVjdElucHV0KVswXTtcbiAgICBsZXQgcHJvamVjdCA9IHByb2plY3RJbnB1dC52YWx1ZS5yZXBsYWNlKC9ed3d3XFwuLywgJycpLFxuICAgICAgdmFsaWQgPSBmYWxzZTtcblxuICAgIGlmIChtdWx0aWxpbmd1YWwgJiYgIXRoaXMuaXNNdWx0aWxhbmdQcm9qZWN0KCkpIHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAkLmkxOG4oJ2ludmFsaWQtbGFuZy1wcm9qZWN0JywgYDxhIGhyZWY9Jy8vJHtwcm9qZWN0LmVzY2FwZSgpfSc+JHtwcm9qZWN0LmVzY2FwZSgpfTwvYT5gKSxcbiAgICAgICAgJ3dhcm5pbmcnXG4gICAgICApO1xuICAgICAgcHJvamVjdCA9IHByb2plY3RJbnB1dC5kYXRhc2V0LnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoc2l0ZURvbWFpbnMuaW5jbHVkZXMocHJvamVjdCkpIHtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgICAgdGhpcy51cGRhdGVJbnRlckFwcExpbmtzKCk7XG4gICAgICB2YWxpZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAkLmkxOG4oJ2ludmFsaWQtcHJvamVjdCcsIGA8YSBocmVmPScvLyR7cHJvamVjdC5lc2NhcGUoKX0nPiR7cHJvamVjdC5lc2NhcGUoKX08L2E+YCksXG4gICAgICAgICd3YXJuaW5nJ1xuICAgICAgKTtcbiAgICAgIHByb2plY3QgPSBwcm9qZWN0SW5wdXQuZGF0YXNldC52YWx1ZTtcbiAgICB9XG5cbiAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuXG4gICAgcmV0dXJuIHZhbGlkO1xuICB9XG5cbiAgLy8gRklYTUU6IHJlc3RvcmUgd3JpdGVNZXNzYWdlIHRvIHRoZSB3YXkgaXQgdXNlZCB0byBiZSxcbiAgLy8gYW5kIG1ha2UgYWRkU2l0ZU5vdGljZSBkbyB0aGUgdG9hc3RyLCBhbmQgY2hhbmdlIGluc3RhbmNlcyBvZiB0aGlzLndyaXRlTWVzc2FnZVxuICAvLyBhY2NvcmRpbmdseVxuICAvKipcbiAgICogV3JpdGVzIG1lc3NhZ2UganVzdCBiZWxvdyB0aGUgY2hhcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIHRvIHdyaXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0IC0gbnVtIHNlY29uZHMgdG8gc2hvd1xuICAgKiBAcmV0dXJucyB7alF1ZXJ5fSAtIGpRdWVyeSBvYmplY3Qgb2YgbWVzc2FnZSBjb250YWluZXJcbiAgICovXG4gIHdyaXRlTWVzc2FnZShtZXNzYWdlLCBsZXZlbCA9ICd3YXJuaW5nJywgdGltZW91dCA9IDUwMDApIHtcbiAgICB0b2FzdHIub3B0aW9ucy50aW1lT3V0ID0gdGltZW91dDtcbiAgICB0b2FzdHJbbGV2ZWxdKG1lc3NhZ2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHY7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjb25maWcgYW1vbmdzdCBhbGwgYXBwc1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5jb25zdCBzaXRlTWFwID0gcmVxdWlyZSgnLi9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgYWxsIFBhZ2V2aWV3cyBhcHBsaWNhdGlvbnMuXG4gKiBTb21lIHByb3BlcnRpZXMgbWF5IGJlIG92ZXJyaWRlbiBieSBhcHAtc3BlY2lmaWMgY29uZmlnc1xuICovXG5jbGFzcyBQdkNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBmb3JtYXRYQXhpc1RpY2sgPSB2YWx1ZSA9PiB7XG4gICAgICBjb25zdCBkYXlPZldlZWsgPSBtb21lbnQodmFsdWUsIHRoaXMuZGF0ZUZvcm1hdCkud2Vla2RheSgpO1xuICAgICAgaWYgKGRheU9mV2VlayAlIDcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGDigKIgJHt2YWx1ZX1gO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGFwaUxpbWl0OiA1MDAwLFxuICAgICAgYXBpVGhyb3R0bGU6IDIwLFxuICAgICAgYXBwczogWydwYWdldmlld3MnLCAndG9wdmlld3MnLCAnbGFuZ3ZpZXdzJywgJ3NpdGV2aWV3cycsICdtYXNzdmlld3MnLCAncmVkaXJlY3R2aWV3cyddLFxuICAgICAgY2hhcnRDb25maWc6IHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0WUF4aXNOdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRYQXhpc1RpY2sodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5saW5lYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMCknLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuMiksXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJSYWRpdXM6IDUsXG4gICAgICAgICAgICAgIHRlbnNpb246IHNlbGYuYmV6aWVyQ3VydmUgPT09ICd0cnVlJyA/IDAuNCA6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBiYXI6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdFlBeGlzTnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIHhBeGVzOiBbe1xuICAgICAgICAgICAgICAgIGJhclBlcmNlbnRhZ2U6IDEuMCxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeVBlcmNlbnRhZ2U6IDAuODUsXG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRYQXhpc1RpY2sodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5saW5lYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjYpLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjkpLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC43NSksXG4gICAgICAgICAgICAgIGhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmFkYXI6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuMSksXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRCb3JkZXJDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjgpLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlclJhZGl1czogNVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBpZToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZG91Z2hudXQ6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb2xhckFyZWE6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNyksXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2lyY3VsYXJDaGFydHM6IFsncGllJywgJ2RvdWdobnV0JywgJ3BvbGFyQXJlYSddLFxuICAgICAgY29sb3JzOiBbJ3JnYmEoMTcxLCAyMTIsIDIzNSwgMSknLCAncmdiYSgxNzgsIDIyMywgMTM4LCAxKScsICdyZ2JhKDI1MSwgMTU0LCAxNTMsIDEpJywgJ3JnYmEoMjUzLCAxOTEsIDExMSwgMSknLCAncmdiYSgyMDIsIDE3OCwgMjE0LCAxKScsICdyZ2JhKDIwNywgMTgyLCAxMjgsIDEpJywgJ3JnYmEoMTQxLCAyMTEsIDE5OSwgMSknLCAncmdiYSgyNTIsIDIwNSwgMjI5LCAxKScsICdyZ2JhKDI1NSwgMjQ3LCAxNjEsIDEpJywgJ3JnYmEoMjE3LCAyMTcsIDIxNywgMSknXSxcbiAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGF1dG9jb21wbGV0ZTogJ2F1dG9jb21wbGV0ZScsXG4gICAgICAgIGNoYXJ0VHlwZTogbnVtRGF0YXNldHMgPT4gbnVtRGF0YXNldHMgPiAxID8gJ2xpbmUnIDogJ2JhcicsXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdZWVlZLU1NLUREJyxcbiAgICAgICAgbG9jYWxpemVEYXRlRm9ybWF0OiAndHJ1ZScsXG4gICAgICAgIG51bWVyaWNhbEZvcm1hdHRpbmc6ICd0cnVlJyxcbiAgICAgICAgYmV6aWVyQ3VydmU6ICdmYWxzZScsXG4gICAgICAgIGF1dG9Mb2dEZXRlY3Rpb246ICd0cnVlJyxcbiAgICAgICAgYmVnaW5BdFplcm86ICdmYWxzZScsXG4gICAgICAgIHJlbWVtYmVyQ2hhcnQ6ICd0cnVlJyxcbiAgICAgICAgYWdlbnQ6ICd1c2VyJyxcbiAgICAgICAgcGxhdGZvcm06ICdhbGwtYWNjZXNzJyxcbiAgICAgICAgcHJvamVjdDogJ2VuLndpa2lwZWRpYS5vcmcnXG4gICAgICB9LFxuICAgICAgZ2xvYmFsQ2hhcnRPcHRzOiB7XG4gICAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0UXVhcnQnXG4gICAgICAgIH0sXG4gICAgICAgIGhvdmVyOiB7XG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDBcbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxpbmVhckNoYXJ0czogWydsaW5lJywgJ2JhcicsICdyYWRhciddLFxuICAgICAgbGluZWFyT3B0czoge1xuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoY2hhcnQuZGF0YS5kYXRhc2V0cywgc2VsZilcbiAgICAgIH0sXG4gICAgICBkYXlzQWdvOiAyMCxcbiAgICAgIG1pbkRhdGU6IG1vbWVudCgnMjAxNS0wNy0wMScpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgbWF4RGF0ZTogbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKSxcbiAgICAgIHNwZWNpYWxSYW5nZXM6IHtcbiAgICAgICAgJ2xhc3Qtd2Vlayc6IFttb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2VlaycpLnN0YXJ0T2YoJ3dlZWsnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWsnKS5lbmRPZignd2VlaycpXSxcbiAgICAgICAgJ3RoaXMtbW9udGgnOiBbbW9tZW50KCkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKV0sXG4gICAgICAgICdsYXN0LW1vbnRoJzogW21vbWVudCgpLnN1YnRyYWN0KDEsICdtb250aCcpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICdtb250aCcpLmVuZE9mKCdtb250aCcpXSxcbiAgICAgICAgbGF0ZXN0KG9mZnNldCA9IHNlbGYuY29uZmlnLmRheXNBZ28pIHtcbiAgICAgICAgICByZXR1cm4gW21vbWVudCgpLnN1YnRyYWN0KG9mZnNldCwgJ2RheXMnKS5zdGFydE9mKCdkYXknKSwgc2VsZi5jb25maWcubWF4RGF0ZV07XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0aW1lc3RhbXBGb3JtYXQ6ICdZWVlZTU1ERDAwJyxcbiAgICAgIHZhbGlkUGFyYW1zOiB7XG4gICAgICAgIGFnZW50OiBbJ2FsbC1hZ2VudHMnLCAndXNlcicsICdzcGlkZXInLCAnYm90J10sXG4gICAgICAgIHBsYXRmb3JtOiBbJ2FsbC1hY2Nlc3MnLCAnZGVza3RvcCcsICdtb2JpbGUtYXBwJywgJ21vYmlsZS13ZWInXSxcbiAgICAgICAgcHJvamVjdDogc2l0ZURvbWFpbnNcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZ2V0IGxpbmVhclRvb2x0aXBzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtb2RlOiAnbGFiZWwnLFxuICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGxhYmVsOiB0b29sdGlwSXRlbSA9PiB7XG4gICAgICAgICAgaWYgKE51bWJlci5pc05hTih0b29sdGlwSXRlbS55TGFiZWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAnICsgJC5pMThuKCd1bmtub3duJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnICcgKyB0aGlzLmZvcm1hdE51bWJlcih0b29sdGlwSXRlbS55TGFiZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJvZHlGb250U2l6ZTogMTQsXG4gICAgICBib2R5U3BhY2luZzogNyxcbiAgICAgIGNhcmV0U2l6ZTogMCxcbiAgICAgIHRpdGxlRm9udFNpemU6IDE0XG4gICAgfTtcbiAgfVxuXG4gIGdldCBjaXJjdWxhclRvb2x0aXBzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgbGFiZWw6ICh0b29sdGlwSXRlbSwgY2hhcnRJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2hhcnRJbnN0YW5jZS5kYXRhc2V0c1t0b29sdGlwSXRlbS5kYXRhc2V0SW5kZXhdLmRhdGFbdG9vbHRpcEl0ZW0uaW5kZXhdLFxuICAgICAgICAgICAgbGFiZWwgPSBjaGFydEluc3RhbmNlLmxhYmVsc1t0b29sdGlwSXRlbS5pbmRleF07XG5cbiAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke2xhYmVsfTogJHskLmkxOG4oJ3Vua25vd24nKX1gO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7bGFiZWx9OiAke3RoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJvZHlGb250U2l6ZTogMTQsXG4gICAgICBib2R5U3BhY2luZzogNyxcbiAgICAgIGNhcmV0U2l6ZTogMCxcbiAgICAgIHRpdGxlRm9udFNpemU6IDE0XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFB2Q29uZmlnO1xuIiwiLyoqXG4gKiBAZmlsZSBXTUYgW3NpdGUgbWF0cml4XShodHRwczovL3d3dy5tZWRpYXdpa2kub3JnL3cvYXBpLnBocD9hY3Rpb249c2l0ZW1hdHJpeCksIHdpdGggc29tZSB1bnN1cHBvcnRlZCB3aWtpcyByZW1vdmVkXG4gKi9cblxuLyoqXG4gKiBTaXRlbWF0cml4IG9mIGFsbCBzdXBwb3J0ZWQgV01GIHdpa2lzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBzaXRlTWFwID0ge1xuICAnYWF3aWtpJzogJ2FhLndpa2lwZWRpYS5vcmcnLFxuICAnYWF3aWt0aW9uYXJ5JzogJ2FhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fhd2lraWJvb2tzJzogJ2FhLndpa2lib29rcy5vcmcnLFxuICAnYWJ3aWtpJzogJ2FiLndpa2lwZWRpYS5vcmcnLFxuICAnYWJ3aWt0aW9uYXJ5JzogJ2FiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FjZXdpa2knOiAnYWNlLndpa2lwZWRpYS5vcmcnLFxuICAnYWR5d2lraSc6ICdhZHkud2lraXBlZGlhLm9yZycsXG4gICdhZndpa2knOiAnYWYud2lraXBlZGlhLm9yZycsXG4gICdhZndpa3Rpb25hcnknOiAnYWYud2lrdGlvbmFyeS5vcmcnLFxuICAnYWZ3aWtpYm9va3MnOiAnYWYud2lraWJvb2tzLm9yZycsXG4gICdhZndpa2lxdW90ZSc6ICdhZi53aWtpcXVvdGUub3JnJyxcbiAgJ2Frd2lraSc6ICdhay53aWtpcGVkaWEub3JnJyxcbiAgJ2Frd2lrdGlvbmFyeSc6ICdhay53aWt0aW9uYXJ5Lm9yZycsXG4gICdha3dpa2lib29rcyc6ICdhay53aWtpYm9va3Mub3JnJyxcbiAgJ2Fsc3dpa2knOiAnYWxzLndpa2lwZWRpYS5vcmcnLFxuICAnYWxzd2lrdGlvbmFyeSc6ICdhbHMud2lrdGlvbmFyeS5vcmcnLFxuICAnYWxzd2lraWJvb2tzJzogJ2Fscy53aWtpYm9va3Mub3JnJyxcbiAgJ2Fsc3dpa2lxdW90ZSc6ICdhbHMud2lraXF1b3RlLm9yZycsXG4gICdhbXdpa2knOiAnYW0ud2lraXBlZGlhLm9yZycsXG4gICdhbXdpa3Rpb25hcnknOiAnYW0ud2lrdGlvbmFyeS5vcmcnLFxuICAnYW13aWtpcXVvdGUnOiAnYW0ud2lraXF1b3RlLm9yZycsXG4gICdhbndpa2knOiAnYW4ud2lraXBlZGlhLm9yZycsXG4gICdhbndpa3Rpb25hcnknOiAnYW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnYW5nd2lraSc6ICdhbmcud2lraXBlZGlhLm9yZycsXG4gICdhbmd3aWt0aW9uYXJ5JzogJ2FuZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbmd3aWtpYm9va3MnOiAnYW5nLndpa2lib29rcy5vcmcnLFxuICAnYW5nd2lraXF1b3RlJzogJ2FuZy53aWtpcXVvdGUub3JnJyxcbiAgJ2FuZ3dpa2lzb3VyY2UnOiAnYW5nLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Fyd2lraSc6ICdhci53aWtpcGVkaWEub3JnJyxcbiAgJ2Fyd2lrdGlvbmFyeSc6ICdhci53aWt0aW9uYXJ5Lm9yZycsXG4gICdhcndpa2lib29rcyc6ICdhci53aWtpYm9va3Mub3JnJyxcbiAgJ2Fyd2lraW5ld3MnOiAnYXIud2lraW5ld3Mub3JnJyxcbiAgJ2Fyd2lraXF1b3RlJzogJ2FyLndpa2lxdW90ZS5vcmcnLFxuICAnYXJ3aWtpc291cmNlJzogJ2FyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Fyd2lraXZlcnNpdHknOiAnYXIud2lraXZlcnNpdHkub3JnJyxcbiAgJ2FyY3dpa2knOiAnYXJjLndpa2lwZWRpYS5vcmcnLFxuICAnYXJ6d2lraSc6ICdhcnoud2lraXBlZGlhLm9yZycsXG4gICdhc3dpa2knOiAnYXMud2lraXBlZGlhLm9yZycsXG4gICdhc3dpa3Rpb25hcnknOiAnYXMud2lrdGlvbmFyeS5vcmcnLFxuICAnYXN3aWtpYm9va3MnOiAnYXMud2lraWJvb2tzLm9yZycsXG4gICdhc3dpa2lzb3VyY2UnOiAnYXMud2lraXNvdXJjZS5vcmcnLFxuICAnYXN0d2lraSc6ICdhc3Qud2lraXBlZGlhLm9yZycsXG4gICdhc3R3aWt0aW9uYXJ5JzogJ2FzdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdhc3R3aWtpYm9va3MnOiAnYXN0Lndpa2lib29rcy5vcmcnLFxuICAnYXN0d2lraXF1b3RlJzogJ2FzdC53aWtpcXVvdGUub3JnJyxcbiAgJ2F2d2lraSc6ICdhdi53aWtpcGVkaWEub3JnJyxcbiAgJ2F2d2lrdGlvbmFyeSc6ICdhdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdheXdpa2knOiAnYXkud2lraXBlZGlhLm9yZycsXG4gICdheXdpa3Rpb25hcnknOiAnYXkud2lrdGlvbmFyeS5vcmcnLFxuICAnYXl3aWtpYm9va3MnOiAnYXkud2lraWJvb2tzLm9yZycsXG4gICdhendpa2knOiAnYXoud2lraXBlZGlhLm9yZycsXG4gICdhendpa3Rpb25hcnknOiAnYXoud2lrdGlvbmFyeS5vcmcnLFxuICAnYXp3aWtpYm9va3MnOiAnYXoud2lraWJvb2tzLm9yZycsXG4gICdhendpa2lxdW90ZSc6ICdhei53aWtpcXVvdGUub3JnJyxcbiAgJ2F6d2lraXNvdXJjZSc6ICdhei53aWtpc291cmNlLm9yZycsXG4gICdhemJ3aWtpJzogJ2F6Yi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jhd2lraSc6ICdiYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jhd2lraWJvb2tzJzogJ2JhLndpa2lib29rcy5vcmcnLFxuICAnYmFyd2lraSc6ICdiYXIud2lraXBlZGlhLm9yZycsXG4gICdiYXRfc21nd2lraSc6ICdiYXQtc21nLndpa2lwZWRpYS5vcmcnLFxuICAnYmNsd2lraSc6ICdiY2wud2lraXBlZGlhLm9yZycsXG4gICdiZXdpa2knOiAnYmUud2lraXBlZGlhLm9yZycsXG4gICdiZXdpa3Rpb25hcnknOiAnYmUud2lrdGlvbmFyeS5vcmcnLFxuICAnYmV3aWtpYm9va3MnOiAnYmUud2lraWJvb2tzLm9yZycsXG4gICdiZXdpa2lxdW90ZSc6ICdiZS53aWtpcXVvdGUub3JnJyxcbiAgJ2Jld2lraXNvdXJjZSc6ICdiZS53aWtpc291cmNlLm9yZycsXG4gICdiZV94X29sZHdpa2knOiAnYmUtdGFyYXNrLndpa2lwZWRpYS5vcmcnLFxuICAnYmd3aWtpJzogJ2JnLndpa2lwZWRpYS5vcmcnLFxuICAnYmd3aWt0aW9uYXJ5JzogJ2JnLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jnd2lraWJvb2tzJzogJ2JnLndpa2lib29rcy5vcmcnLFxuICAnYmd3aWtpbmV3cyc6ICdiZy53aWtpbmV3cy5vcmcnLFxuICAnYmd3aWtpcXVvdGUnOiAnYmcud2lraXF1b3RlLm9yZycsXG4gICdiZ3dpa2lzb3VyY2UnOiAnYmcud2lraXNvdXJjZS5vcmcnLFxuICAnYmh3aWtpJzogJ2JoLndpa2lwZWRpYS5vcmcnLFxuICAnYmh3aWt0aW9uYXJ5JzogJ2JoLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jpd2lraSc6ICdiaS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jpd2lrdGlvbmFyeSc6ICdiaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdiaXdpa2lib29rcyc6ICdiaS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jqbndpa2knOiAnYmpuLndpa2lwZWRpYS5vcmcnLFxuICAnYm13aWtpJzogJ2JtLndpa2lwZWRpYS5vcmcnLFxuICAnYm13aWt0aW9uYXJ5JzogJ2JtLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jtd2lraWJvb2tzJzogJ2JtLndpa2lib29rcy5vcmcnLFxuICAnYm13aWtpcXVvdGUnOiAnYm0ud2lraXF1b3RlLm9yZycsXG4gICdibndpa2knOiAnYm4ud2lraXBlZGlhLm9yZycsXG4gICdibndpa3Rpb25hcnknOiAnYm4ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm53aWtpYm9va3MnOiAnYm4ud2lraWJvb2tzLm9yZycsXG4gICdibndpa2lzb3VyY2UnOiAnYm4ud2lraXNvdXJjZS5vcmcnLFxuICAnYm93aWtpJzogJ2JvLndpa2lwZWRpYS5vcmcnLFxuICAnYm93aWt0aW9uYXJ5JzogJ2JvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jvd2lraWJvb2tzJzogJ2JvLndpa2lib29rcy5vcmcnLFxuICAnYnB5d2lraSc6ICdicHkud2lraXBlZGlhLm9yZycsXG4gICdicndpa2knOiAnYnIud2lraXBlZGlhLm9yZycsXG4gICdicndpa3Rpb25hcnknOiAnYnIud2lrdGlvbmFyeS5vcmcnLFxuICAnYnJ3aWtpcXVvdGUnOiAnYnIud2lraXF1b3RlLm9yZycsXG4gICdicndpa2lzb3VyY2UnOiAnYnIud2lraXNvdXJjZS5vcmcnLFxuICAnYnN3aWtpJzogJ2JzLndpa2lwZWRpYS5vcmcnLFxuICAnYnN3aWt0aW9uYXJ5JzogJ2JzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jzd2lraWJvb2tzJzogJ2JzLndpa2lib29rcy5vcmcnLFxuICAnYnN3aWtpbmV3cyc6ICdicy53aWtpbmV3cy5vcmcnLFxuICAnYnN3aWtpcXVvdGUnOiAnYnMud2lraXF1b3RlLm9yZycsXG4gICdic3dpa2lzb3VyY2UnOiAnYnMud2lraXNvdXJjZS5vcmcnLFxuICAnYnVnd2lraSc6ICdidWcud2lraXBlZGlhLm9yZycsXG4gICdieHJ3aWtpJzogJ2J4ci53aWtpcGVkaWEub3JnJyxcbiAgJ2Nhd2lraSc6ICdjYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Nhd2lrdGlvbmFyeSc6ICdjYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdjYXdpa2lib29rcyc6ICdjYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Nhd2lraW5ld3MnOiAnY2Eud2lraW5ld3Mub3JnJyxcbiAgJ2Nhd2lraXF1b3RlJzogJ2NhLndpa2lxdW90ZS5vcmcnLFxuICAnY2F3aWtpc291cmNlJzogJ2NhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Nia196YW13aWtpJzogJ2Niay16YW0ud2lraXBlZGlhLm9yZycsXG4gICdjZG93aWtpJzogJ2Nkby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nld2lraSc6ICdjZS53aWtpcGVkaWEub3JnJyxcbiAgJ2NlYndpa2knOiAnY2ViLndpa2lwZWRpYS5vcmcnLFxuICAnY2h3aWtpJzogJ2NoLndpa2lwZWRpYS5vcmcnLFxuICAnY2h3aWt0aW9uYXJ5JzogJ2NoLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nod2lraWJvb2tzJzogJ2NoLndpa2lib29rcy5vcmcnLFxuICAnY2hvd2lraSc6ICdjaG8ud2lraXBlZGlhLm9yZycsXG4gICdjaHJ3aWtpJzogJ2Noci53aWtpcGVkaWEub3JnJyxcbiAgJ2Nocndpa3Rpb25hcnknOiAnY2hyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2NoeXdpa2knOiAnY2h5Lndpa2lwZWRpYS5vcmcnLFxuICAnY2tid2lraSc6ICdja2Iud2lraXBlZGlhLm9yZycsXG4gICdjb3dpa2knOiAnY28ud2lraXBlZGlhLm9yZycsXG4gICdjb3dpa3Rpb25hcnknOiAnY28ud2lrdGlvbmFyeS5vcmcnLFxuICAnY293aWtpYm9va3MnOiAnY28ud2lraWJvb2tzLm9yZycsXG4gICdjb3dpa2lxdW90ZSc6ICdjby53aWtpcXVvdGUub3JnJyxcbiAgJ2Nyd2lraSc6ICdjci53aWtpcGVkaWEub3JnJyxcbiAgJ2Nyd2lrdGlvbmFyeSc6ICdjci53aWt0aW9uYXJ5Lm9yZycsXG4gICdjcndpa2lxdW90ZSc6ICdjci53aWtpcXVvdGUub3JnJyxcbiAgJ2NyaHdpa2knOiAnY3JoLndpa2lwZWRpYS5vcmcnLFxuICAnY3N3aWtpJzogJ2NzLndpa2lwZWRpYS5vcmcnLFxuICAnY3N3aWt0aW9uYXJ5JzogJ2NzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nzd2lraWJvb2tzJzogJ2NzLndpa2lib29rcy5vcmcnLFxuICAnY3N3aWtpbmV3cyc6ICdjcy53aWtpbmV3cy5vcmcnLFxuICAnY3N3aWtpcXVvdGUnOiAnY3Mud2lraXF1b3RlLm9yZycsXG4gICdjc3dpa2lzb3VyY2UnOiAnY3Mud2lraXNvdXJjZS5vcmcnLFxuICAnY3N3aWtpdmVyc2l0eSc6ICdjcy53aWtpdmVyc2l0eS5vcmcnLFxuICAnY3Nid2lraSc6ICdjc2Iud2lraXBlZGlhLm9yZycsXG4gICdjc2J3aWt0aW9uYXJ5JzogJ2NzYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdjdXdpa2knOiAnY3Uud2lraXBlZGlhLm9yZycsXG4gICdjdndpa2knOiAnY3Yud2lraXBlZGlhLm9yZycsXG4gICdjdndpa2lib29rcyc6ICdjdi53aWtpYm9va3Mub3JnJyxcbiAgJ2N5d2lraSc6ICdjeS53aWtpcGVkaWEub3JnJyxcbiAgJ2N5d2lrdGlvbmFyeSc6ICdjeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdjeXdpa2lib29rcyc6ICdjeS53aWtpYm9va3Mub3JnJyxcbiAgJ2N5d2lraXF1b3RlJzogJ2N5Lndpa2lxdW90ZS5vcmcnLFxuICAnY3l3aWtpc291cmNlJzogJ2N5Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Rhd2lraSc6ICdkYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Rhd2lrdGlvbmFyeSc6ICdkYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdkYXdpa2lib29rcyc6ICdkYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Rhd2lraXF1b3RlJzogJ2RhLndpa2lxdW90ZS5vcmcnLFxuICAnZGF3aWtpc291cmNlJzogJ2RhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Rld2lraSc6ICdkZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Rld2lrdGlvbmFyeSc6ICdkZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdkZXdpa2lib29rcyc6ICdkZS53aWtpYm9va3Mub3JnJyxcbiAgJ2Rld2lraW5ld3MnOiAnZGUud2lraW5ld3Mub3JnJyxcbiAgJ2Rld2lraXF1b3RlJzogJ2RlLndpa2lxdW90ZS5vcmcnLFxuICAnZGV3aWtpc291cmNlJzogJ2RlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Rld2lraXZlcnNpdHknOiAnZGUud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Rld2lraXZveWFnZSc6ICdkZS53aWtpdm95YWdlLm9yZycsXG4gICdkaXF3aWtpJzogJ2RpcS53aWtpcGVkaWEub3JnJyxcbiAgJ2RzYndpa2knOiAnZHNiLndpa2lwZWRpYS5vcmcnLFxuICAnZHZ3aWtpJzogJ2R2Lndpa2lwZWRpYS5vcmcnLFxuICAnZHZ3aWt0aW9uYXJ5JzogJ2R2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2R6d2lraSc6ICdkei53aWtpcGVkaWEub3JnJyxcbiAgJ2R6d2lrdGlvbmFyeSc6ICdkei53aWt0aW9uYXJ5Lm9yZycsXG4gICdlZXdpa2knOiAnZWUud2lraXBlZGlhLm9yZycsXG4gICdlbHdpa2knOiAnZWwud2lraXBlZGlhLm9yZycsXG4gICdlbHdpa3Rpb25hcnknOiAnZWwud2lrdGlvbmFyeS5vcmcnLFxuICAnZWx3aWtpYm9va3MnOiAnZWwud2lraWJvb2tzLm9yZycsXG4gICdlbHdpa2luZXdzJzogJ2VsLndpa2luZXdzLm9yZycsXG4gICdlbHdpa2lxdW90ZSc6ICdlbC53aWtpcXVvdGUub3JnJyxcbiAgJ2Vsd2lraXNvdXJjZSc6ICdlbC53aWtpc291cmNlLm9yZycsXG4gICdlbHdpa2l2ZXJzaXR5JzogJ2VsLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlbHdpa2l2b3lhZ2UnOiAnZWwud2lraXZveWFnZS5vcmcnLFxuICAnZW1sd2lraSc6ICdlbWwud2lraXBlZGlhLm9yZycsXG4gICdlbndpa2knOiAnZW4ud2lraXBlZGlhLm9yZycsXG4gICdlbndpa3Rpb25hcnknOiAnZW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnZW53aWtpYm9va3MnOiAnZW4ud2lraWJvb2tzLm9yZycsXG4gICdlbndpa2luZXdzJzogJ2VuLndpa2luZXdzLm9yZycsXG4gICdlbndpa2lxdW90ZSc6ICdlbi53aWtpcXVvdGUub3JnJyxcbiAgJ2Vud2lraXNvdXJjZSc6ICdlbi53aWtpc291cmNlLm9yZycsXG4gICdlbndpa2l2ZXJzaXR5JzogJ2VuLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlbndpa2l2b3lhZ2UnOiAnZW4ud2lraXZveWFnZS5vcmcnLFxuICAnZW93aWtpJzogJ2VvLndpa2lwZWRpYS5vcmcnLFxuICAnZW93aWt0aW9uYXJ5JzogJ2VvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vvd2lraWJvb2tzJzogJ2VvLndpa2lib29rcy5vcmcnLFxuICAnZW93aWtpbmV3cyc6ICdlby53aWtpbmV3cy5vcmcnLFxuICAnZW93aWtpcXVvdGUnOiAnZW8ud2lraXF1b3RlLm9yZycsXG4gICdlb3dpa2lzb3VyY2UnOiAnZW8ud2lraXNvdXJjZS5vcmcnLFxuICAnZXN3aWtpJzogJ2VzLndpa2lwZWRpYS5vcmcnLFxuICAnZXN3aWt0aW9uYXJ5JzogJ2VzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vzd2lraWJvb2tzJzogJ2VzLndpa2lib29rcy5vcmcnLFxuICAnZXN3aWtpbmV3cyc6ICdlcy53aWtpbmV3cy5vcmcnLFxuICAnZXN3aWtpcXVvdGUnOiAnZXMud2lraXF1b3RlLm9yZycsXG4gICdlc3dpa2lzb3VyY2UnOiAnZXMud2lraXNvdXJjZS5vcmcnLFxuICAnZXN3aWtpdmVyc2l0eSc6ICdlcy53aWtpdmVyc2l0eS5vcmcnLFxuICAnZXN3aWtpdm95YWdlJzogJ2VzLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2V0d2lraSc6ICdldC53aWtpcGVkaWEub3JnJyxcbiAgJ2V0d2lrdGlvbmFyeSc6ICdldC53aWt0aW9uYXJ5Lm9yZycsXG4gICdldHdpa2lib29rcyc6ICdldC53aWtpYm9va3Mub3JnJyxcbiAgJ2V0d2lraXF1b3RlJzogJ2V0Lndpa2lxdW90ZS5vcmcnLFxuICAnZXR3aWtpc291cmNlJzogJ2V0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2V1d2lraSc6ICdldS53aWtpcGVkaWEub3JnJyxcbiAgJ2V1d2lrdGlvbmFyeSc6ICdldS53aWt0aW9uYXJ5Lm9yZycsXG4gICdldXdpa2lib29rcyc6ICdldS53aWtpYm9va3Mub3JnJyxcbiAgJ2V1d2lraXF1b3RlJzogJ2V1Lndpa2lxdW90ZS5vcmcnLFxuICAnZXh0d2lraSc6ICdleHQud2lraXBlZGlhLm9yZycsXG4gICdmYXdpa2knOiAnZmEud2lraXBlZGlhLm9yZycsXG4gICdmYXdpa3Rpb25hcnknOiAnZmEud2lrdGlvbmFyeS5vcmcnLFxuICAnZmF3aWtpYm9va3MnOiAnZmEud2lraWJvb2tzLm9yZycsXG4gICdmYXdpa2luZXdzJzogJ2ZhLndpa2luZXdzLm9yZycsXG4gICdmYXdpa2lxdW90ZSc6ICdmYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Zhd2lraXNvdXJjZSc6ICdmYS53aWtpc291cmNlLm9yZycsXG4gICdmYXdpa2l2b3lhZ2UnOiAnZmEud2lraXZveWFnZS5vcmcnLFxuICAnZmZ3aWtpJzogJ2ZmLndpa2lwZWRpYS5vcmcnLFxuICAnZml3aWtpJzogJ2ZpLndpa2lwZWRpYS5vcmcnLFxuICAnZml3aWt0aW9uYXJ5JzogJ2ZpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zpd2lraWJvb2tzJzogJ2ZpLndpa2lib29rcy5vcmcnLFxuICAnZml3aWtpbmV3cyc6ICdmaS53aWtpbmV3cy5vcmcnLFxuICAnZml3aWtpcXVvdGUnOiAnZmkud2lraXF1b3RlLm9yZycsXG4gICdmaXdpa2lzb3VyY2UnOiAnZmkud2lraXNvdXJjZS5vcmcnLFxuICAnZml3aWtpdmVyc2l0eSc6ICdmaS53aWtpdmVyc2l0eS5vcmcnLFxuICAnZml1X3Zyb3dpa2knOiAnZml1LXZyby53aWtpcGVkaWEub3JnJyxcbiAgJ2Zqd2lraSc6ICdmai53aWtpcGVkaWEub3JnJyxcbiAgJ2Zqd2lrdGlvbmFyeSc6ICdmai53aWt0aW9uYXJ5Lm9yZycsXG4gICdmb3dpa2knOiAnZm8ud2lraXBlZGlhLm9yZycsXG4gICdmb3dpa3Rpb25hcnknOiAnZm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnZm93aWtpc291cmNlJzogJ2ZvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zyd2lraSc6ICdmci53aWtpcGVkaWEub3JnJyxcbiAgJ2Zyd2lrdGlvbmFyeSc6ICdmci53aWt0aW9uYXJ5Lm9yZycsXG4gICdmcndpa2lib29rcyc6ICdmci53aWtpYm9va3Mub3JnJyxcbiAgJ2Zyd2lraW5ld3MnOiAnZnIud2lraW5ld3Mub3JnJyxcbiAgJ2Zyd2lraXF1b3RlJzogJ2ZyLndpa2lxdW90ZS5vcmcnLFxuICAnZnJ3aWtpc291cmNlJzogJ2ZyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zyd2lraXZlcnNpdHknOiAnZnIud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Zyd2lraXZveWFnZSc6ICdmci53aWtpdm95YWdlLm9yZycsXG4gICdmcnB3aWtpJzogJ2ZycC53aWtpcGVkaWEub3JnJyxcbiAgJ2Zycndpa2knOiAnZnJyLndpa2lwZWRpYS5vcmcnLFxuICAnZnVyd2lraSc6ICdmdXIud2lraXBlZGlhLm9yZycsXG4gICdmeXdpa2knOiAnZnkud2lraXBlZGlhLm9yZycsXG4gICdmeXdpa3Rpb25hcnknOiAnZnkud2lrdGlvbmFyeS5vcmcnLFxuICAnZnl3aWtpYm9va3MnOiAnZnkud2lraWJvb2tzLm9yZycsXG4gICdnYXdpa2knOiAnZ2Eud2lraXBlZGlhLm9yZycsXG4gICdnYXdpa3Rpb25hcnknOiAnZ2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2F3aWtpYm9va3MnOiAnZ2Eud2lraWJvb2tzLm9yZycsXG4gICdnYXdpa2lxdW90ZSc6ICdnYS53aWtpcXVvdGUub3JnJyxcbiAgJ2dhZ3dpa2knOiAnZ2FnLndpa2lwZWRpYS5vcmcnLFxuICAnZ2Fud2lraSc6ICdnYW4ud2lraXBlZGlhLm9yZycsXG4gICdnZHdpa2knOiAnZ2Qud2lraXBlZGlhLm9yZycsXG4gICdnZHdpa3Rpb25hcnknOiAnZ2Qud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2x3aWtpJzogJ2dsLndpa2lwZWRpYS5vcmcnLFxuICAnZ2x3aWt0aW9uYXJ5JzogJ2dsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dsd2lraWJvb2tzJzogJ2dsLndpa2lib29rcy5vcmcnLFxuICAnZ2x3aWtpcXVvdGUnOiAnZ2wud2lraXF1b3RlLm9yZycsXG4gICdnbHdpa2lzb3VyY2UnOiAnZ2wud2lraXNvdXJjZS5vcmcnLFxuICAnZ2xrd2lraSc6ICdnbGsud2lraXBlZGlhLm9yZycsXG4gICdnbndpa2knOiAnZ24ud2lraXBlZGlhLm9yZycsXG4gICdnbndpa3Rpb25hcnknOiAnZ24ud2lrdGlvbmFyeS5vcmcnLFxuICAnZ253aWtpYm9va3MnOiAnZ24ud2lraWJvb2tzLm9yZycsXG4gICdnb213aWtpJzogJ2dvbS53aWtpcGVkaWEub3JnJyxcbiAgJ2dvdHdpa2knOiAnZ290Lndpa2lwZWRpYS5vcmcnLFxuICAnZ290d2lraWJvb2tzJzogJ2dvdC53aWtpYm9va3Mub3JnJyxcbiAgJ2d1d2lraSc6ICdndS53aWtpcGVkaWEub3JnJyxcbiAgJ2d1d2lrdGlvbmFyeSc6ICdndS53aWt0aW9uYXJ5Lm9yZycsXG4gICdndXdpa2lib29rcyc6ICdndS53aWtpYm9va3Mub3JnJyxcbiAgJ2d1d2lraXF1b3RlJzogJ2d1Lndpa2lxdW90ZS5vcmcnLFxuICAnZ3V3aWtpc291cmNlJzogJ2d1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2d2d2lraSc6ICdndi53aWtpcGVkaWEub3JnJyxcbiAgJ2d2d2lrdGlvbmFyeSc6ICdndi53aWt0aW9uYXJ5Lm9yZycsXG4gICdoYXdpa2knOiAnaGEud2lraXBlZGlhLm9yZycsXG4gICdoYXdpa3Rpb25hcnknOiAnaGEud2lrdGlvbmFyeS5vcmcnLFxuICAnaGFrd2lraSc6ICdoYWsud2lraXBlZGlhLm9yZycsXG4gICdoYXd3aWtpJzogJ2hhdy53aWtpcGVkaWEub3JnJyxcbiAgJ2hld2lraSc6ICdoZS53aWtpcGVkaWEub3JnJyxcbiAgJ2hld2lrdGlvbmFyeSc6ICdoZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoZXdpa2lib29rcyc6ICdoZS53aWtpYm9va3Mub3JnJyxcbiAgJ2hld2lraW5ld3MnOiAnaGUud2lraW5ld3Mub3JnJyxcbiAgJ2hld2lraXF1b3RlJzogJ2hlLndpa2lxdW90ZS5vcmcnLFxuICAnaGV3aWtpc291cmNlJzogJ2hlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2hld2lraXZveWFnZSc6ICdoZS53aWtpdm95YWdlLm9yZycsXG4gICdoaXdpa2knOiAnaGkud2lraXBlZGlhLm9yZycsXG4gICdoaXdpa3Rpb25hcnknOiAnaGkud2lrdGlvbmFyeS5vcmcnLFxuICAnaGl3aWtpYm9va3MnOiAnaGkud2lraWJvb2tzLm9yZycsXG4gICdoaXdpa2lxdW90ZSc6ICdoaS53aWtpcXVvdGUub3JnJyxcbiAgJ2hpZndpa2knOiAnaGlmLndpa2lwZWRpYS5vcmcnLFxuICAnaG93aWtpJzogJ2hvLndpa2lwZWRpYS5vcmcnLFxuICAnaHJ3aWtpJzogJ2hyLndpa2lwZWRpYS5vcmcnLFxuICAnaHJ3aWt0aW9uYXJ5JzogJ2hyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hyd2lraWJvb2tzJzogJ2hyLndpa2lib29rcy5vcmcnLFxuICAnaHJ3aWtpcXVvdGUnOiAnaHIud2lraXF1b3RlLm9yZycsXG4gICdocndpa2lzb3VyY2UnOiAnaHIud2lraXNvdXJjZS5vcmcnLFxuICAnaHNid2lraSc6ICdoc2Iud2lraXBlZGlhLm9yZycsXG4gICdoc2J3aWt0aW9uYXJ5JzogJ2hzYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdodHdpa2knOiAnaHQud2lraXBlZGlhLm9yZycsXG4gICdodHdpa2lzb3VyY2UnOiAnaHQud2lraXNvdXJjZS5vcmcnLFxuICAnaHV3aWtpJzogJ2h1Lndpa2lwZWRpYS5vcmcnLFxuICAnaHV3aWt0aW9uYXJ5JzogJ2h1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2h1d2lraWJvb2tzJzogJ2h1Lndpa2lib29rcy5vcmcnLFxuICAnaHV3aWtpbmV3cyc6ICdodS53aWtpbmV3cy5vcmcnLFxuICAnaHV3aWtpcXVvdGUnOiAnaHUud2lraXF1b3RlLm9yZycsXG4gICdodXdpa2lzb3VyY2UnOiAnaHUud2lraXNvdXJjZS5vcmcnLFxuICAnaHl3aWtpJzogJ2h5Lndpa2lwZWRpYS5vcmcnLFxuICAnaHl3aWt0aW9uYXJ5JzogJ2h5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2h5d2lraWJvb2tzJzogJ2h5Lndpa2lib29rcy5vcmcnLFxuICAnaHl3aWtpcXVvdGUnOiAnaHkud2lraXF1b3RlLm9yZycsXG4gICdoeXdpa2lzb3VyY2UnOiAnaHkud2lraXNvdXJjZS5vcmcnLFxuICAnaHp3aWtpJzogJ2h6Lndpa2lwZWRpYS5vcmcnLFxuICAnaWF3aWtpJzogJ2lhLndpa2lwZWRpYS5vcmcnLFxuICAnaWF3aWt0aW9uYXJ5JzogJ2lhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lhd2lraWJvb2tzJzogJ2lhLndpa2lib29rcy5vcmcnLFxuICAnaWR3aWtpJzogJ2lkLndpa2lwZWRpYS5vcmcnLFxuICAnaWR3aWt0aW9uYXJ5JzogJ2lkLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lkd2lraWJvb2tzJzogJ2lkLndpa2lib29rcy5vcmcnLFxuICAnaWR3aWtpcXVvdGUnOiAnaWQud2lraXF1b3RlLm9yZycsXG4gICdpZHdpa2lzb3VyY2UnOiAnaWQud2lraXNvdXJjZS5vcmcnLFxuICAnaWV3aWtpJzogJ2llLndpa2lwZWRpYS5vcmcnLFxuICAnaWV3aWt0aW9uYXJ5JzogJ2llLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lld2lraWJvb2tzJzogJ2llLndpa2lib29rcy5vcmcnLFxuICAnaWd3aWtpJzogJ2lnLndpa2lwZWRpYS5vcmcnLFxuICAnaWl3aWtpJzogJ2lpLndpa2lwZWRpYS5vcmcnLFxuICAnaWt3aWtpJzogJ2lrLndpa2lwZWRpYS5vcmcnLFxuICAnaWt3aWt0aW9uYXJ5JzogJ2lrLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lsb3dpa2knOiAnaWxvLndpa2lwZWRpYS5vcmcnLFxuICAnaW93aWtpJzogJ2lvLndpa2lwZWRpYS5vcmcnLFxuICAnaW93aWt0aW9uYXJ5JzogJ2lvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lzd2lraSc6ICdpcy53aWtpcGVkaWEub3JnJyxcbiAgJ2lzd2lrdGlvbmFyeSc6ICdpcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdpc3dpa2lib29rcyc6ICdpcy53aWtpYm9va3Mub3JnJyxcbiAgJ2lzd2lraXF1b3RlJzogJ2lzLndpa2lxdW90ZS5vcmcnLFxuICAnaXN3aWtpc291cmNlJzogJ2lzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2l0d2lraSc6ICdpdC53aWtpcGVkaWEub3JnJyxcbiAgJ2l0d2lrdGlvbmFyeSc6ICdpdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdpdHdpa2lib29rcyc6ICdpdC53aWtpYm9va3Mub3JnJyxcbiAgJ2l0d2lraW5ld3MnOiAnaXQud2lraW5ld3Mub3JnJyxcbiAgJ2l0d2lraXF1b3RlJzogJ2l0Lndpa2lxdW90ZS5vcmcnLFxuICAnaXR3aWtpc291cmNlJzogJ2l0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2l0d2lraXZlcnNpdHknOiAnaXQud2lraXZlcnNpdHkub3JnJyxcbiAgJ2l0d2lraXZveWFnZSc6ICdpdC53aWtpdm95YWdlLm9yZycsXG4gICdpdXdpa2knOiAnaXUud2lraXBlZGlhLm9yZycsXG4gICdpdXdpa3Rpb25hcnknOiAnaXUud2lrdGlvbmFyeS5vcmcnLFxuICAnamF3aWtpJzogJ2phLndpa2lwZWRpYS5vcmcnLFxuICAnamF3aWt0aW9uYXJ5JzogJ2phLndpa3Rpb25hcnkub3JnJyxcbiAgJ2phd2lraWJvb2tzJzogJ2phLndpa2lib29rcy5vcmcnLFxuICAnamF3aWtpbmV3cyc6ICdqYS53aWtpbmV3cy5vcmcnLFxuICAnamF3aWtpcXVvdGUnOiAnamEud2lraXF1b3RlLm9yZycsXG4gICdqYXdpa2lzb3VyY2UnOiAnamEud2lraXNvdXJjZS5vcmcnLFxuICAnamF3aWtpdmVyc2l0eSc6ICdqYS53aWtpdmVyc2l0eS5vcmcnLFxuICAnamJvd2lraSc6ICdqYm8ud2lraXBlZGlhLm9yZycsXG4gICdqYm93aWt0aW9uYXJ5JzogJ2piby53aWt0aW9uYXJ5Lm9yZycsXG4gICdqdndpa2knOiAnanYud2lraXBlZGlhLm9yZycsXG4gICdqdndpa3Rpb25hcnknOiAnanYud2lrdGlvbmFyeS5vcmcnLFxuICAna2F3aWtpJzogJ2thLndpa2lwZWRpYS5vcmcnLFxuICAna2F3aWt0aW9uYXJ5JzogJ2thLndpa3Rpb25hcnkub3JnJyxcbiAgJ2thd2lraWJvb2tzJzogJ2thLndpa2lib29rcy5vcmcnLFxuICAna2F3aWtpcXVvdGUnOiAna2Eud2lraXF1b3RlLm9yZycsXG4gICdrYWF3aWtpJzogJ2thYS53aWtpcGVkaWEub3JnJyxcbiAgJ2thYndpa2knOiAna2FiLndpa2lwZWRpYS5vcmcnLFxuICAna2Jkd2lraSc6ICdrYmQud2lraXBlZGlhLm9yZycsXG4gICdrZ3dpa2knOiAna2cud2lraXBlZGlhLm9yZycsXG4gICdraXdpa2knOiAna2kud2lraXBlZGlhLm9yZycsXG4gICdrandpa2knOiAna2oud2lraXBlZGlhLm9yZycsXG4gICdra3dpa2knOiAna2sud2lraXBlZGlhLm9yZycsXG4gICdra3dpa3Rpb25hcnknOiAna2sud2lrdGlvbmFyeS5vcmcnLFxuICAna2t3aWtpYm9va3MnOiAna2sud2lraWJvb2tzLm9yZycsXG4gICdra3dpa2lxdW90ZSc6ICdray53aWtpcXVvdGUub3JnJyxcbiAgJ2tsd2lraSc6ICdrbC53aWtpcGVkaWEub3JnJyxcbiAgJ2tsd2lrdGlvbmFyeSc6ICdrbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbXdpa2knOiAna20ud2lraXBlZGlhLm9yZycsXG4gICdrbXdpa3Rpb25hcnknOiAna20ud2lrdGlvbmFyeS5vcmcnLFxuICAna213aWtpYm9va3MnOiAna20ud2lraWJvb2tzLm9yZycsXG4gICdrbndpa2knOiAna24ud2lraXBlZGlhLm9yZycsXG4gICdrbndpa3Rpb25hcnknOiAna24ud2lrdGlvbmFyeS5vcmcnLFxuICAna253aWtpYm9va3MnOiAna24ud2lraWJvb2tzLm9yZycsXG4gICdrbndpa2lxdW90ZSc6ICdrbi53aWtpcXVvdGUub3JnJyxcbiAgJ2tud2lraXNvdXJjZSc6ICdrbi53aWtpc291cmNlLm9yZycsXG4gICdrb3dpa2knOiAna28ud2lraXBlZGlhLm9yZycsXG4gICdrb3dpa3Rpb25hcnknOiAna28ud2lrdGlvbmFyeS5vcmcnLFxuICAna293aWtpYm9va3MnOiAna28ud2lraWJvb2tzLm9yZycsXG4gICdrb3dpa2luZXdzJzogJ2tvLndpa2luZXdzLm9yZycsXG4gICdrb3dpa2lxdW90ZSc6ICdrby53aWtpcXVvdGUub3JnJyxcbiAgJ2tvd2lraXNvdXJjZSc6ICdrby53aWtpc291cmNlLm9yZycsXG4gICdrb3dpa2l2ZXJzaXR5JzogJ2tvLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdrb2l3aWtpJzogJ2tvaS53aWtpcGVkaWEub3JnJyxcbiAgJ2tyd2lraSc6ICdrci53aWtpcGVkaWEub3JnJyxcbiAgJ2tyd2lraXF1b3RlJzogJ2tyLndpa2lxdW90ZS5vcmcnLFxuICAna3Jjd2lraSc6ICdrcmMud2lraXBlZGlhLm9yZycsXG4gICdrc3dpa2knOiAna3Mud2lraXBlZGlhLm9yZycsXG4gICdrc3dpa3Rpb25hcnknOiAna3Mud2lrdGlvbmFyeS5vcmcnLFxuICAna3N3aWtpYm9va3MnOiAna3Mud2lraWJvb2tzLm9yZycsXG4gICdrc3dpa2lxdW90ZSc6ICdrcy53aWtpcXVvdGUub3JnJyxcbiAgJ2tzaHdpa2knOiAna3NoLndpa2lwZWRpYS5vcmcnLFxuICAna3V3aWtpJzogJ2t1Lndpa2lwZWRpYS5vcmcnLFxuICAna3V3aWt0aW9uYXJ5JzogJ2t1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t1d2lraWJvb2tzJzogJ2t1Lndpa2lib29rcy5vcmcnLFxuICAna3V3aWtpcXVvdGUnOiAna3Uud2lraXF1b3RlLm9yZycsXG4gICdrdndpa2knOiAna3Yud2lraXBlZGlhLm9yZycsXG4gICdrd3dpa2knOiAna3cud2lraXBlZGlhLm9yZycsXG4gICdrd3dpa3Rpb25hcnknOiAna3cud2lrdGlvbmFyeS5vcmcnLFxuICAna3d3aWtpcXVvdGUnOiAna3cud2lraXF1b3RlLm9yZycsXG4gICdreXdpa2knOiAna3kud2lraXBlZGlhLm9yZycsXG4gICdreXdpa3Rpb25hcnknOiAna3kud2lrdGlvbmFyeS5vcmcnLFxuICAna3l3aWtpYm9va3MnOiAna3kud2lraWJvb2tzLm9yZycsXG4gICdreXdpa2lxdW90ZSc6ICdreS53aWtpcXVvdGUub3JnJyxcbiAgJ2xhd2lraSc6ICdsYS53aWtpcGVkaWEub3JnJyxcbiAgJ2xhd2lrdGlvbmFyeSc6ICdsYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdsYXdpa2lib29rcyc6ICdsYS53aWtpYm9va3Mub3JnJyxcbiAgJ2xhd2lraXF1b3RlJzogJ2xhLndpa2lxdW90ZS5vcmcnLFxuICAnbGF3aWtpc291cmNlJzogJ2xhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2xhZHdpa2knOiAnbGFkLndpa2lwZWRpYS5vcmcnLFxuICAnbGJ3aWtpJzogJ2xiLndpa2lwZWRpYS5vcmcnLFxuICAnbGJ3aWt0aW9uYXJ5JzogJ2xiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xid2lraWJvb2tzJzogJ2xiLndpa2lib29rcy5vcmcnLFxuICAnbGJ3aWtpcXVvdGUnOiAnbGIud2lraXF1b3RlLm9yZycsXG4gICdsYmV3aWtpJzogJ2xiZS53aWtpcGVkaWEub3JnJyxcbiAgJ2xlendpa2knOiAnbGV6Lndpa2lwZWRpYS5vcmcnLFxuICAnbGd3aWtpJzogJ2xnLndpa2lwZWRpYS5vcmcnLFxuICAnbGl3aWtpJzogJ2xpLndpa2lwZWRpYS5vcmcnLFxuICAnbGl3aWt0aW9uYXJ5JzogJ2xpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xpd2lraWJvb2tzJzogJ2xpLndpa2lib29rcy5vcmcnLFxuICAnbGl3aWtpcXVvdGUnOiAnbGkud2lraXF1b3RlLm9yZycsXG4gICdsaXdpa2lzb3VyY2UnOiAnbGkud2lraXNvdXJjZS5vcmcnLFxuICAnbGlqd2lraSc6ICdsaWoud2lraXBlZGlhLm9yZycsXG4gICdsbW93aWtpJzogJ2xtby53aWtpcGVkaWEub3JnJyxcbiAgJ2xud2lraSc6ICdsbi53aWtpcGVkaWEub3JnJyxcbiAgJ2xud2lrdGlvbmFyeSc6ICdsbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsbndpa2lib29rcyc6ICdsbi53aWtpYm9va3Mub3JnJyxcbiAgJ2xvd2lraSc6ICdsby53aWtpcGVkaWEub3JnJyxcbiAgJ2xvd2lrdGlvbmFyeSc6ICdsby53aWt0aW9uYXJ5Lm9yZycsXG4gICdscmN3aWtpJzogJ2xyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2x0d2lraSc6ICdsdC53aWtpcGVkaWEub3JnJyxcbiAgJ2x0d2lrdGlvbmFyeSc6ICdsdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdsdHdpa2lib29rcyc6ICdsdC53aWtpYm9va3Mub3JnJyxcbiAgJ2x0d2lraXF1b3RlJzogJ2x0Lndpa2lxdW90ZS5vcmcnLFxuICAnbHR3aWtpc291cmNlJzogJ2x0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2x0Z3dpa2knOiAnbHRnLndpa2lwZWRpYS5vcmcnLFxuICAnbHZ3aWtpJzogJ2x2Lndpa2lwZWRpYS5vcmcnLFxuICAnbHZ3aWt0aW9uYXJ5JzogJ2x2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2x2d2lraWJvb2tzJzogJ2x2Lndpa2lib29rcy5vcmcnLFxuICAnbWFpd2lraSc6ICdtYWkud2lraXBlZGlhLm9yZycsXG4gICdtYXBfYm1zd2lraSc6ICdtYXAtYm1zLndpa2lwZWRpYS5vcmcnLFxuICAnbWRmd2lraSc6ICdtZGYud2lraXBlZGlhLm9yZycsXG4gICdtZ3dpa2knOiAnbWcud2lraXBlZGlhLm9yZycsXG4gICdtZ3dpa3Rpb25hcnknOiAnbWcud2lrdGlvbmFyeS5vcmcnLFxuICAnbWd3aWtpYm9va3MnOiAnbWcud2lraWJvb2tzLm9yZycsXG4gICdtaHdpa2knOiAnbWgud2lraXBlZGlhLm9yZycsXG4gICdtaHdpa3Rpb25hcnknOiAnbWgud2lrdGlvbmFyeS5vcmcnLFxuICAnbWhyd2lraSc6ICdtaHIud2lraXBlZGlhLm9yZycsXG4gICdtaXdpa2knOiAnbWkud2lraXBlZGlhLm9yZycsXG4gICdtaXdpa3Rpb25hcnknOiAnbWkud2lrdGlvbmFyeS5vcmcnLFxuICAnbWl3aWtpYm9va3MnOiAnbWkud2lraWJvb2tzLm9yZycsXG4gICdtaW53aWtpJzogJ21pbi53aWtpcGVkaWEub3JnJyxcbiAgJ21rd2lraSc6ICdtay53aWtpcGVkaWEub3JnJyxcbiAgJ21rd2lrdGlvbmFyeSc6ICdtay53aWt0aW9uYXJ5Lm9yZycsXG4gICdta3dpa2lib29rcyc6ICdtay53aWtpYm9va3Mub3JnJyxcbiAgJ21rd2lraXNvdXJjZSc6ICdtay53aWtpc291cmNlLm9yZycsXG4gICdtbHdpa2knOiAnbWwud2lraXBlZGlhLm9yZycsXG4gICdtbHdpa3Rpb25hcnknOiAnbWwud2lrdGlvbmFyeS5vcmcnLFxuICAnbWx3aWtpYm9va3MnOiAnbWwud2lraWJvb2tzLm9yZycsXG4gICdtbHdpa2lxdW90ZSc6ICdtbC53aWtpcXVvdGUub3JnJyxcbiAgJ21sd2lraXNvdXJjZSc6ICdtbC53aWtpc291cmNlLm9yZycsXG4gICdtbndpa2knOiAnbW4ud2lraXBlZGlhLm9yZycsXG4gICdtbndpa3Rpb25hcnknOiAnbW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbW53aWtpYm9va3MnOiAnbW4ud2lraWJvb2tzLm9yZycsXG4gICdtb3dpa2knOiAnbW8ud2lraXBlZGlhLm9yZycsXG4gICdtb3dpa3Rpb25hcnknOiAnbW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbXJ3aWtpJzogJ21yLndpa2lwZWRpYS5vcmcnLFxuICAnbXJ3aWt0aW9uYXJ5JzogJ21yLndpa3Rpb25hcnkub3JnJyxcbiAgJ21yd2lraWJvb2tzJzogJ21yLndpa2lib29rcy5vcmcnLFxuICAnbXJ3aWtpcXVvdGUnOiAnbXIud2lraXF1b3RlLm9yZycsXG4gICdtcndpa2lzb3VyY2UnOiAnbXIud2lraXNvdXJjZS5vcmcnLFxuICAnbXJqd2lraSc6ICdtcmoud2lraXBlZGlhLm9yZycsXG4gICdtc3dpa2knOiAnbXMud2lraXBlZGlhLm9yZycsXG4gICdtc3dpa3Rpb25hcnknOiAnbXMud2lrdGlvbmFyeS5vcmcnLFxuICAnbXN3aWtpYm9va3MnOiAnbXMud2lraWJvb2tzLm9yZycsXG4gICdtdHdpa2knOiAnbXQud2lraXBlZGlhLm9yZycsXG4gICdtdHdpa3Rpb25hcnknOiAnbXQud2lrdGlvbmFyeS5vcmcnLFxuICAnbXVzd2lraSc6ICdtdXMud2lraXBlZGlhLm9yZycsXG4gICdtd2x3aWtpJzogJ213bC53aWtpcGVkaWEub3JnJyxcbiAgJ215d2lraSc6ICdteS53aWtpcGVkaWEub3JnJyxcbiAgJ215d2lrdGlvbmFyeSc6ICdteS53aWt0aW9uYXJ5Lm9yZycsXG4gICdteXdpa2lib29rcyc6ICdteS53aWtpYm9va3Mub3JnJyxcbiAgJ215dndpa2knOiAnbXl2Lndpa2lwZWRpYS5vcmcnLFxuICAnbXpud2lraSc6ICdtem4ud2lraXBlZGlhLm9yZycsXG4gICduYXdpa2knOiAnbmEud2lraXBlZGlhLm9yZycsXG4gICduYXdpa3Rpb25hcnknOiAnbmEud2lrdGlvbmFyeS5vcmcnLFxuICAnbmF3aWtpYm9va3MnOiAnbmEud2lraWJvb2tzLm9yZycsXG4gICduYXdpa2lxdW90ZSc6ICduYS53aWtpcXVvdGUub3JnJyxcbiAgJ25haHdpa2knOiAnbmFoLndpa2lwZWRpYS5vcmcnLFxuICAnbmFod2lrdGlvbmFyeSc6ICduYWgud2lrdGlvbmFyeS5vcmcnLFxuICAnbmFod2lraWJvb2tzJzogJ25haC53aWtpYm9va3Mub3JnJyxcbiAgJ25hcHdpa2knOiAnbmFwLndpa2lwZWRpYS5vcmcnLFxuICAnbmRzd2lraSc6ICduZHMud2lraXBlZGlhLm9yZycsXG4gICduZHN3aWt0aW9uYXJ5JzogJ25kcy53aWt0aW9uYXJ5Lm9yZycsXG4gICduZHN3aWtpYm9va3MnOiAnbmRzLndpa2lib29rcy5vcmcnLFxuICAnbmRzd2lraXF1b3RlJzogJ25kcy53aWtpcXVvdGUub3JnJyxcbiAgJ25kc19ubHdpa2knOiAnbmRzLW5sLndpa2lwZWRpYS5vcmcnLFxuICAnbmV3aWtpJzogJ25lLndpa2lwZWRpYS5vcmcnLFxuICAnbmV3aWt0aW9uYXJ5JzogJ25lLndpa3Rpb25hcnkub3JnJyxcbiAgJ25ld2lraWJvb2tzJzogJ25lLndpa2lib29rcy5vcmcnLFxuICAnbmV3d2lraSc6ICduZXcud2lraXBlZGlhLm9yZycsXG4gICduZ3dpa2knOiAnbmcud2lraXBlZGlhLm9yZycsXG4gICdubHdpa2knOiAnbmwud2lraXBlZGlhLm9yZycsXG4gICdubHdpa3Rpb25hcnknOiAnbmwud2lrdGlvbmFyeS5vcmcnLFxuICAnbmx3aWtpYm9va3MnOiAnbmwud2lraWJvb2tzLm9yZycsXG4gICdubHdpa2luZXdzJzogJ25sLndpa2luZXdzLm9yZycsXG4gICdubHdpa2lxdW90ZSc6ICdubC53aWtpcXVvdGUub3JnJyxcbiAgJ25sd2lraXNvdXJjZSc6ICdubC53aWtpc291cmNlLm9yZycsXG4gICdubHdpa2l2b3lhZ2UnOiAnbmwud2lraXZveWFnZS5vcmcnLFxuICAnbm53aWtpJzogJ25uLndpa2lwZWRpYS5vcmcnLFxuICAnbm53aWt0aW9uYXJ5JzogJ25uLndpa3Rpb25hcnkub3JnJyxcbiAgJ25ud2lraXF1b3RlJzogJ25uLndpa2lxdW90ZS5vcmcnLFxuICAnbm93aWtpJzogJ25vLndpa2lwZWRpYS5vcmcnLFxuICAnbm93aWt0aW9uYXJ5JzogJ25vLndpa3Rpb25hcnkub3JnJyxcbiAgJ25vd2lraWJvb2tzJzogJ25vLndpa2lib29rcy5vcmcnLFxuICAnbm93aWtpbmV3cyc6ICduby53aWtpbmV3cy5vcmcnLFxuICAnbm93aWtpcXVvdGUnOiAnbm8ud2lraXF1b3RlLm9yZycsXG4gICdub3dpa2lzb3VyY2UnOiAnbm8ud2lraXNvdXJjZS5vcmcnLFxuICAnbm92d2lraSc6ICdub3Yud2lraXBlZGlhLm9yZycsXG4gICducm13aWtpJzogJ25ybS53aWtpcGVkaWEub3JnJyxcbiAgJ25zb3dpa2knOiAnbnNvLndpa2lwZWRpYS5vcmcnLFxuICAnbnZ3aWtpJzogJ252Lndpa2lwZWRpYS5vcmcnLFxuICAnbnl3aWtpJzogJ255Lndpa2lwZWRpYS5vcmcnLFxuICAnb2N3aWtpJzogJ29jLndpa2lwZWRpYS5vcmcnLFxuICAnb2N3aWt0aW9uYXJ5JzogJ29jLndpa3Rpb25hcnkub3JnJyxcbiAgJ29jd2lraWJvb2tzJzogJ29jLndpa2lib29rcy5vcmcnLFxuICAnb213aWtpJzogJ29tLndpa2lwZWRpYS5vcmcnLFxuICAnb213aWt0aW9uYXJ5JzogJ29tLndpa3Rpb25hcnkub3JnJyxcbiAgJ29yd2lraSc6ICdvci53aWtpcGVkaWEub3JnJyxcbiAgJ29yd2lrdGlvbmFyeSc6ICdvci53aWt0aW9uYXJ5Lm9yZycsXG4gICdvcndpa2lzb3VyY2UnOiAnb3Iud2lraXNvdXJjZS5vcmcnLFxuICAnb3N3aWtpJzogJ29zLndpa2lwZWRpYS5vcmcnLFxuICAncGF3aWtpJzogJ3BhLndpa2lwZWRpYS5vcmcnLFxuICAncGF3aWt0aW9uYXJ5JzogJ3BhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bhd2lraWJvb2tzJzogJ3BhLndpa2lib29rcy5vcmcnLFxuICAncGFnd2lraSc6ICdwYWcud2lraXBlZGlhLm9yZycsXG4gICdwYW13aWtpJzogJ3BhbS53aWtpcGVkaWEub3JnJyxcbiAgJ3BhcHdpa2knOiAncGFwLndpa2lwZWRpYS5vcmcnLFxuICAncGNkd2lraSc6ICdwY2Qud2lraXBlZGlhLm9yZycsXG4gICdwZGN3aWtpJzogJ3BkYy53aWtpcGVkaWEub3JnJyxcbiAgJ3BmbHdpa2knOiAncGZsLndpa2lwZWRpYS5vcmcnLFxuICAncGl3aWtpJzogJ3BpLndpa2lwZWRpYS5vcmcnLFxuICAncGl3aWt0aW9uYXJ5JzogJ3BpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3BpaHdpa2knOiAncGloLndpa2lwZWRpYS5vcmcnLFxuICAncGx3aWtpJzogJ3BsLndpa2lwZWRpYS5vcmcnLFxuICAncGx3aWt0aW9uYXJ5JzogJ3BsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bsd2lraWJvb2tzJzogJ3BsLndpa2lib29rcy5vcmcnLFxuICAncGx3aWtpbmV3cyc6ICdwbC53aWtpbmV3cy5vcmcnLFxuICAncGx3aWtpcXVvdGUnOiAncGwud2lraXF1b3RlLm9yZycsXG4gICdwbHdpa2lzb3VyY2UnOiAncGwud2lraXNvdXJjZS5vcmcnLFxuICAncGx3aWtpdm95YWdlJzogJ3BsLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Btc3dpa2knOiAncG1zLndpa2lwZWRpYS5vcmcnLFxuICAncG5id2lraSc6ICdwbmIud2lraXBlZGlhLm9yZycsXG4gICdwbmJ3aWt0aW9uYXJ5JzogJ3BuYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdwbnR3aWtpJzogJ3BudC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bzd2lraSc6ICdwcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Bzd2lrdGlvbmFyeSc6ICdwcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdwc3dpa2lib29rcyc6ICdwcy53aWtpYm9va3Mub3JnJyxcbiAgJ3B0d2lraSc6ICdwdC53aWtpcGVkaWEub3JnJyxcbiAgJ3B0d2lrdGlvbmFyeSc6ICdwdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdwdHdpa2lib29rcyc6ICdwdC53aWtpYm9va3Mub3JnJyxcbiAgJ3B0d2lraW5ld3MnOiAncHQud2lraW5ld3Mub3JnJyxcbiAgJ3B0d2lraXF1b3RlJzogJ3B0Lndpa2lxdW90ZS5vcmcnLFxuICAncHR3aWtpc291cmNlJzogJ3B0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3B0d2lraXZlcnNpdHknOiAncHQud2lraXZlcnNpdHkub3JnJyxcbiAgJ3B0d2lraXZveWFnZSc6ICdwdC53aWtpdm95YWdlLm9yZycsXG4gICdxdXdpa2knOiAncXUud2lraXBlZGlhLm9yZycsXG4gICdxdXdpa3Rpb25hcnknOiAncXUud2lrdGlvbmFyeS5vcmcnLFxuICAncXV3aWtpYm9va3MnOiAncXUud2lraWJvb2tzLm9yZycsXG4gICdxdXdpa2lxdW90ZSc6ICdxdS53aWtpcXVvdGUub3JnJyxcbiAgJ3Jtd2lraSc6ICdybS53aWtpcGVkaWEub3JnJyxcbiAgJ3Jtd2lrdGlvbmFyeSc6ICdybS53aWt0aW9uYXJ5Lm9yZycsXG4gICdybXdpa2lib29rcyc6ICdybS53aWtpYm9va3Mub3JnJyxcbiAgJ3JteXdpa2knOiAncm15Lndpa2lwZWRpYS5vcmcnLFxuICAncm53aWtpJzogJ3JuLndpa2lwZWRpYS5vcmcnLFxuICAncm53aWt0aW9uYXJ5JzogJ3JuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jvd2lraSc6ICdyby53aWtpcGVkaWEub3JnJyxcbiAgJ3Jvd2lrdGlvbmFyeSc6ICdyby53aWt0aW9uYXJ5Lm9yZycsXG4gICdyb3dpa2lib29rcyc6ICdyby53aWtpYm9va3Mub3JnJyxcbiAgJ3Jvd2lraW5ld3MnOiAncm8ud2lraW5ld3Mub3JnJyxcbiAgJ3Jvd2lraXF1b3RlJzogJ3JvLndpa2lxdW90ZS5vcmcnLFxuICAncm93aWtpc291cmNlJzogJ3JvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Jvd2lraXZveWFnZSc6ICdyby53aWtpdm95YWdlLm9yZycsXG4gICdyb2FfcnVwd2lraSc6ICdyb2EtcnVwLndpa2lwZWRpYS5vcmcnLFxuICAncm9hX3J1cHdpa3Rpb25hcnknOiAncm9hLXJ1cC53aWt0aW9uYXJ5Lm9yZycsXG4gICdyb2FfdGFyYXdpa2knOiAncm9hLXRhcmEud2lraXBlZGlhLm9yZycsXG4gICdydXdpa2knOiAncnUud2lraXBlZGlhLm9yZycsXG4gICdydXdpa3Rpb25hcnknOiAncnUud2lrdGlvbmFyeS5vcmcnLFxuICAncnV3aWtpYm9va3MnOiAncnUud2lraWJvb2tzLm9yZycsXG4gICdydXdpa2luZXdzJzogJ3J1Lndpa2luZXdzLm9yZycsXG4gICdydXdpa2lxdW90ZSc6ICdydS53aWtpcXVvdGUub3JnJyxcbiAgJ3J1d2lraXNvdXJjZSc6ICdydS53aWtpc291cmNlLm9yZycsXG4gICdydXdpa2l2ZXJzaXR5JzogJ3J1Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdydXdpa2l2b3lhZ2UnOiAncnUud2lraXZveWFnZS5vcmcnLFxuICAncnVld2lraSc6ICdydWUud2lraXBlZGlhLm9yZycsXG4gICdyd3dpa2knOiAncncud2lraXBlZGlhLm9yZycsXG4gICdyd3dpa3Rpb25hcnknOiAncncud2lrdGlvbmFyeS5vcmcnLFxuICAnc2F3aWtpJzogJ3NhLndpa2lwZWRpYS5vcmcnLFxuICAnc2F3aWt0aW9uYXJ5JzogJ3NhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nhd2lraWJvb2tzJzogJ3NhLndpa2lib29rcy5vcmcnLFxuICAnc2F3aWtpcXVvdGUnOiAnc2Eud2lraXF1b3RlLm9yZycsXG4gICdzYXdpa2lzb3VyY2UnOiAnc2Eud2lraXNvdXJjZS5vcmcnLFxuICAnc2Fod2lraSc6ICdzYWgud2lraXBlZGlhLm9yZycsXG4gICdzYWh3aWtpc291cmNlJzogJ3NhaC53aWtpc291cmNlLm9yZycsXG4gICdzY3dpa2knOiAnc2Mud2lraXBlZGlhLm9yZycsXG4gICdzY3dpa3Rpb25hcnknOiAnc2Mud2lrdGlvbmFyeS5vcmcnLFxuICAnc2Nud2lraSc6ICdzY24ud2lraXBlZGlhLm9yZycsXG4gICdzY253aWt0aW9uYXJ5JzogJ3Njbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzY293aWtpJzogJ3Njby53aWtpcGVkaWEub3JnJyxcbiAgJ3Nkd2lraSc6ICdzZC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nkd2lrdGlvbmFyeSc6ICdzZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzZHdpa2luZXdzJzogJ3NkLndpa2luZXdzLm9yZycsXG4gICdzZXdpa2knOiAnc2Uud2lraXBlZGlhLm9yZycsXG4gICdzZXdpa2lib29rcyc6ICdzZS53aWtpYm9va3Mub3JnJyxcbiAgJ3Nnd2lraSc6ICdzZy53aWtpcGVkaWEub3JnJyxcbiAgJ3Nnd2lrdGlvbmFyeSc6ICdzZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaHdpa2knOiAnc2gud2lraXBlZGlhLm9yZycsXG4gICdzaHdpa3Rpb25hcnknOiAnc2gud2lrdGlvbmFyeS5vcmcnLFxuICAnc2l3aWtpJzogJ3NpLndpa2lwZWRpYS5vcmcnLFxuICAnc2l3aWt0aW9uYXJ5JzogJ3NpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Npd2lraWJvb2tzJzogJ3NpLndpa2lib29rcy5vcmcnLFxuICAnc2ltcGxld2lraSc6ICdzaW1wbGUud2lraXBlZGlhLm9yZycsXG4gICdzaW1wbGV3aWt0aW9uYXJ5JzogJ3NpbXBsZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaW1wbGV3aWtpYm9va3MnOiAnc2ltcGxlLndpa2lib29rcy5vcmcnLFxuICAnc2ltcGxld2lraXF1b3RlJzogJ3NpbXBsZS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nrd2lraSc6ICdzay53aWtpcGVkaWEub3JnJyxcbiAgJ3Nrd2lrdGlvbmFyeSc6ICdzay53aWt0aW9uYXJ5Lm9yZycsXG4gICdza3dpa2lib29rcyc6ICdzay53aWtpYm9va3Mub3JnJyxcbiAgJ3Nrd2lraXF1b3RlJzogJ3NrLndpa2lxdW90ZS5vcmcnLFxuICAnc2t3aWtpc291cmNlJzogJ3NrLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Nsd2lraSc6ICdzbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nsd2lrdGlvbmFyeSc6ICdzbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzbHdpa2lib29rcyc6ICdzbC53aWtpYm9va3Mub3JnJyxcbiAgJ3Nsd2lraXF1b3RlJzogJ3NsLndpa2lxdW90ZS5vcmcnLFxuICAnc2x3aWtpc291cmNlJzogJ3NsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Nsd2lraXZlcnNpdHknOiAnc2wud2lraXZlcnNpdHkub3JnJyxcbiAgJ3Ntd2lraSc6ICdzbS53aWtpcGVkaWEub3JnJyxcbiAgJ3Ntd2lrdGlvbmFyeSc6ICdzbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzbndpa2knOiAnc24ud2lraXBlZGlhLm9yZycsXG4gICdzbndpa3Rpb25hcnknOiAnc24ud2lrdGlvbmFyeS5vcmcnLFxuICAnc293aWtpJzogJ3NvLndpa2lwZWRpYS5vcmcnLFxuICAnc293aWt0aW9uYXJ5JzogJ3NvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nxd2lraSc6ICdzcS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nxd2lrdGlvbmFyeSc6ICdzcS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcXdpa2lib29rcyc6ICdzcS53aWtpYm9va3Mub3JnJyxcbiAgJ3Nxd2lraW5ld3MnOiAnc3Eud2lraW5ld3Mub3JnJyxcbiAgJ3Nxd2lraXF1b3RlJzogJ3NxLndpa2lxdW90ZS5vcmcnLFxuICAnc3J3aWtpJzogJ3NyLndpa2lwZWRpYS5vcmcnLFxuICAnc3J3aWt0aW9uYXJ5JzogJ3NyLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nyd2lraWJvb2tzJzogJ3NyLndpa2lib29rcy5vcmcnLFxuICAnc3J3aWtpbmV3cyc6ICdzci53aWtpbmV3cy5vcmcnLFxuICAnc3J3aWtpcXVvdGUnOiAnc3Iud2lraXF1b3RlLm9yZycsXG4gICdzcndpa2lzb3VyY2UnOiAnc3Iud2lraXNvdXJjZS5vcmcnLFxuICAnc3Jud2lraSc6ICdzcm4ud2lraXBlZGlhLm9yZycsXG4gICdzc3dpa2knOiAnc3Mud2lraXBlZGlhLm9yZycsXG4gICdzc3dpa3Rpb25hcnknOiAnc3Mud2lrdGlvbmFyeS5vcmcnLFxuICAnc3R3aWtpJzogJ3N0Lndpa2lwZWRpYS5vcmcnLFxuICAnc3R3aWt0aW9uYXJ5JzogJ3N0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N0cXdpa2knOiAnc3RxLndpa2lwZWRpYS5vcmcnLFxuICAnc3V3aWtpJzogJ3N1Lndpa2lwZWRpYS5vcmcnLFxuICAnc3V3aWt0aW9uYXJ5JzogJ3N1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N1d2lraWJvb2tzJzogJ3N1Lndpa2lib29rcy5vcmcnLFxuICAnc3V3aWtpcXVvdGUnOiAnc3Uud2lraXF1b3RlLm9yZycsXG4gICdzdndpa2knOiAnc3Yud2lraXBlZGlhLm9yZycsXG4gICdzdndpa3Rpb25hcnknOiAnc3Yud2lrdGlvbmFyeS5vcmcnLFxuICAnc3Z3aWtpYm9va3MnOiAnc3Yud2lraWJvb2tzLm9yZycsXG4gICdzdndpa2luZXdzJzogJ3N2Lndpa2luZXdzLm9yZycsXG4gICdzdndpa2lxdW90ZSc6ICdzdi53aWtpcXVvdGUub3JnJyxcbiAgJ3N2d2lraXNvdXJjZSc6ICdzdi53aWtpc291cmNlLm9yZycsXG4gICdzdndpa2l2ZXJzaXR5JzogJ3N2Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdzdndpa2l2b3lhZ2UnOiAnc3Yud2lraXZveWFnZS5vcmcnLFxuICAnc3d3aWtpJzogJ3N3Lndpa2lwZWRpYS5vcmcnLFxuICAnc3d3aWt0aW9uYXJ5JzogJ3N3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N3d2lraWJvb2tzJzogJ3N3Lndpa2lib29rcy5vcmcnLFxuICAnc3psd2lraSc6ICdzemwud2lraXBlZGlhLm9yZycsXG4gICd0YXdpa2knOiAndGEud2lraXBlZGlhLm9yZycsXG4gICd0YXdpa3Rpb25hcnknOiAndGEud2lrdGlvbmFyeS5vcmcnLFxuICAndGF3aWtpYm9va3MnOiAndGEud2lraWJvb2tzLm9yZycsXG4gICd0YXdpa2luZXdzJzogJ3RhLndpa2luZXdzLm9yZycsXG4gICd0YXdpa2lxdW90ZSc6ICd0YS53aWtpcXVvdGUub3JnJyxcbiAgJ3Rhd2lraXNvdXJjZSc6ICd0YS53aWtpc291cmNlLm9yZycsXG4gICd0ZXdpa2knOiAndGUud2lraXBlZGlhLm9yZycsXG4gICd0ZXdpa3Rpb25hcnknOiAndGUud2lrdGlvbmFyeS5vcmcnLFxuICAndGV3aWtpYm9va3MnOiAndGUud2lraWJvb2tzLm9yZycsXG4gICd0ZXdpa2lxdW90ZSc6ICd0ZS53aWtpcXVvdGUub3JnJyxcbiAgJ3Rld2lraXNvdXJjZSc6ICd0ZS53aWtpc291cmNlLm9yZycsXG4gICd0ZXR3aWtpJzogJ3RldC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rnd2lraSc6ICd0Zy53aWtpcGVkaWEub3JnJyxcbiAgJ3Rnd2lrdGlvbmFyeSc6ICd0Zy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0Z3dpa2lib29rcyc6ICd0Zy53aWtpYm9va3Mub3JnJyxcbiAgJ3Rod2lraSc6ICd0aC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rod2lrdGlvbmFyeSc6ICd0aC53aWt0aW9uYXJ5Lm9yZycsXG4gICd0aHdpa2lib29rcyc6ICd0aC53aWtpYm9va3Mub3JnJyxcbiAgJ3Rod2lraW5ld3MnOiAndGgud2lraW5ld3Mub3JnJyxcbiAgJ3Rod2lraXF1b3RlJzogJ3RoLndpa2lxdW90ZS5vcmcnLFxuICAndGh3aWtpc291cmNlJzogJ3RoLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rpd2lraSc6ICd0aS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rpd2lrdGlvbmFyeSc6ICd0aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0a3dpa2knOiAndGsud2lraXBlZGlhLm9yZycsXG4gICd0a3dpa3Rpb25hcnknOiAndGsud2lrdGlvbmFyeS5vcmcnLFxuICAndGt3aWtpYm9va3MnOiAndGsud2lraWJvb2tzLm9yZycsXG4gICd0a3dpa2lxdW90ZSc6ICd0ay53aWtpcXVvdGUub3JnJyxcbiAgJ3Rsd2lraSc6ICd0bC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rsd2lrdGlvbmFyeSc6ICd0bC53aWt0aW9uYXJ5Lm9yZycsXG4gICd0bHdpa2lib29rcyc6ICd0bC53aWtpYm9va3Mub3JnJyxcbiAgJ3Rud2lraSc6ICd0bi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rud2lrdGlvbmFyeSc6ICd0bi53aWt0aW9uYXJ5Lm9yZycsXG4gICd0b3dpa2knOiAndG8ud2lraXBlZGlhLm9yZycsXG4gICd0b3dpa3Rpb25hcnknOiAndG8ud2lrdGlvbmFyeS5vcmcnLFxuICAndHBpd2lraSc6ICd0cGkud2lraXBlZGlhLm9yZycsXG4gICd0cGl3aWt0aW9uYXJ5JzogJ3RwaS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cndpa2knOiAndHIud2lraXBlZGlhLm9yZycsXG4gICd0cndpa3Rpb25hcnknOiAndHIud2lrdGlvbmFyeS5vcmcnLFxuICAndHJ3aWtpYm9va3MnOiAndHIud2lraWJvb2tzLm9yZycsXG4gICd0cndpa2luZXdzJzogJ3RyLndpa2luZXdzLm9yZycsXG4gICd0cndpa2lxdW90ZSc6ICd0ci53aWtpcXVvdGUub3JnJyxcbiAgJ3Ryd2lraXNvdXJjZSc6ICd0ci53aWtpc291cmNlLm9yZycsXG4gICd0c3dpa2knOiAndHMud2lraXBlZGlhLm9yZycsXG4gICd0c3dpa3Rpb25hcnknOiAndHMud2lrdGlvbmFyeS5vcmcnLFxuICAndHR3aWtpJzogJ3R0Lndpa2lwZWRpYS5vcmcnLFxuICAndHR3aWt0aW9uYXJ5JzogJ3R0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3R0d2lraWJvb2tzJzogJ3R0Lndpa2lib29rcy5vcmcnLFxuICAndHR3aWtpcXVvdGUnOiAndHQud2lraXF1b3RlLm9yZycsXG4gICd0dW13aWtpJzogJ3R1bS53aWtpcGVkaWEub3JnJyxcbiAgJ3R3d2lraSc6ICd0dy53aWtpcGVkaWEub3JnJyxcbiAgJ3R3d2lrdGlvbmFyeSc6ICd0dy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0eXdpa2knOiAndHkud2lraXBlZGlhLm9yZycsXG4gICd0eXZ3aWtpJzogJ3R5di53aWtpcGVkaWEub3JnJyxcbiAgJ3VkbXdpa2knOiAndWRtLndpa2lwZWRpYS5vcmcnLFxuICAndWd3aWtpJzogJ3VnLndpa2lwZWRpYS5vcmcnLFxuICAndWd3aWt0aW9uYXJ5JzogJ3VnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Vnd2lraWJvb2tzJzogJ3VnLndpa2lib29rcy5vcmcnLFxuICAndWd3aWtpcXVvdGUnOiAndWcud2lraXF1b3RlLm9yZycsXG4gICd1a3dpa2knOiAndWsud2lraXBlZGlhLm9yZycsXG4gICd1a3dpa3Rpb25hcnknOiAndWsud2lrdGlvbmFyeS5vcmcnLFxuICAndWt3aWtpYm9va3MnOiAndWsud2lraWJvb2tzLm9yZycsXG4gICd1a3dpa2luZXdzJzogJ3VrLndpa2luZXdzLm9yZycsXG4gICd1a3dpa2lxdW90ZSc6ICd1ay53aWtpcXVvdGUub3JnJyxcbiAgJ3Vrd2lraXNvdXJjZSc6ICd1ay53aWtpc291cmNlLm9yZycsXG4gICd1a3dpa2l2b3lhZ2UnOiAndWsud2lraXZveWFnZS5vcmcnLFxuICAndXJ3aWtpJzogJ3VyLndpa2lwZWRpYS5vcmcnLFxuICAndXJ3aWt0aW9uYXJ5JzogJ3VyLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Vyd2lraWJvb2tzJzogJ3VyLndpa2lib29rcy5vcmcnLFxuICAndXJ3aWtpcXVvdGUnOiAndXIud2lraXF1b3RlLm9yZycsXG4gICd1endpa2knOiAndXoud2lraXBlZGlhLm9yZycsXG4gICd1endpa3Rpb25hcnknOiAndXoud2lrdGlvbmFyeS5vcmcnLFxuICAndXp3aWtpYm9va3MnOiAndXoud2lraWJvb2tzLm9yZycsXG4gICd1endpa2lxdW90ZSc6ICd1ei53aWtpcXVvdGUub3JnJyxcbiAgJ3Zld2lraSc6ICd2ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3ZlY3dpa2knOiAndmVjLndpa2lwZWRpYS5vcmcnLFxuICAndmVjd2lrdGlvbmFyeSc6ICd2ZWMud2lrdGlvbmFyeS5vcmcnLFxuICAndmVjd2lraXNvdXJjZSc6ICd2ZWMud2lraXNvdXJjZS5vcmcnLFxuICAndmVwd2lraSc6ICd2ZXAud2lraXBlZGlhLm9yZycsXG4gICd2aXdpa2knOiAndmkud2lraXBlZGlhLm9yZycsXG4gICd2aXdpa3Rpb25hcnknOiAndmkud2lrdGlvbmFyeS5vcmcnLFxuICAndml3aWtpYm9va3MnOiAndmkud2lraWJvb2tzLm9yZycsXG4gICd2aXdpa2lxdW90ZSc6ICd2aS53aWtpcXVvdGUub3JnJyxcbiAgJ3Zpd2lraXNvdXJjZSc6ICd2aS53aWtpc291cmNlLm9yZycsXG4gICd2aXdpa2l2b3lhZ2UnOiAndmkud2lraXZveWFnZS5vcmcnLFxuICAndmxzd2lraSc6ICd2bHMud2lraXBlZGlhLm9yZycsXG4gICd2b3dpa2knOiAndm8ud2lraXBlZGlhLm9yZycsXG4gICd2b3dpa3Rpb25hcnknOiAndm8ud2lrdGlvbmFyeS5vcmcnLFxuICAndm93aWtpYm9va3MnOiAndm8ud2lraWJvb2tzLm9yZycsXG4gICd2b3dpa2lxdW90ZSc6ICd2by53aWtpcXVvdGUub3JnJyxcbiAgJ3dhd2lraSc6ICd3YS53aWtpcGVkaWEub3JnJyxcbiAgJ3dhd2lrdGlvbmFyeSc6ICd3YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd3YXdpa2lib29rcyc6ICd3YS53aWtpYm9va3Mub3JnJyxcbiAgJ3dhcndpa2knOiAnd2FyLndpa2lwZWRpYS5vcmcnLFxuICAnd293aWtpJzogJ3dvLndpa2lwZWRpYS5vcmcnLFxuICAnd293aWt0aW9uYXJ5JzogJ3dvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3dvd2lraXF1b3RlJzogJ3dvLndpa2lxdW90ZS5vcmcnLFxuICAnd3V1d2lraSc6ICd3dXUud2lraXBlZGlhLm9yZycsXG4gICd4YWx3aWtpJzogJ3hhbC53aWtpcGVkaWEub3JnJyxcbiAgJ3hod2lraSc6ICd4aC53aWtpcGVkaWEub3JnJyxcbiAgJ3hod2lrdGlvbmFyeSc6ICd4aC53aWt0aW9uYXJ5Lm9yZycsXG4gICd4aHdpa2lib29rcyc6ICd4aC53aWtpYm9va3Mub3JnJyxcbiAgJ3htZndpa2knOiAneG1mLndpa2lwZWRpYS5vcmcnLFxuICAneWl3aWtpJzogJ3lpLndpa2lwZWRpYS5vcmcnLFxuICAneWl3aWt0aW9uYXJ5JzogJ3lpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3lpd2lraXNvdXJjZSc6ICd5aS53aWtpc291cmNlLm9yZycsXG4gICd5b3dpa2knOiAneW8ud2lraXBlZGlhLm9yZycsXG4gICd5b3dpa3Rpb25hcnknOiAneW8ud2lrdGlvbmFyeS5vcmcnLFxuICAneW93aWtpYm9va3MnOiAneW8ud2lraWJvb2tzLm9yZycsXG4gICd6YXdpa2knOiAnemEud2lraXBlZGlhLm9yZycsXG4gICd6YXdpa3Rpb25hcnknOiAnemEud2lrdGlvbmFyeS5vcmcnLFxuICAnemF3aWtpYm9va3MnOiAnemEud2lraWJvb2tzLm9yZycsXG4gICd6YXdpa2lxdW90ZSc6ICd6YS53aWtpcXVvdGUub3JnJyxcbiAgJ3plYXdpa2knOiAnemVhLndpa2lwZWRpYS5vcmcnLFxuICAnemh3aWtpJzogJ3poLndpa2lwZWRpYS5vcmcnLFxuICAnemh3aWt0aW9uYXJ5JzogJ3poLndpa3Rpb25hcnkub3JnJyxcbiAgJ3pod2lraWJvb2tzJzogJ3poLndpa2lib29rcy5vcmcnLFxuICAnemh3aWtpbmV3cyc6ICd6aC53aWtpbmV3cy5vcmcnLFxuICAnemh3aWtpcXVvdGUnOiAnemgud2lraXF1b3RlLm9yZycsXG4gICd6aHdpa2lzb3VyY2UnOiAnemgud2lraXNvdXJjZS5vcmcnLFxuICAnemh3aWtpdm95YWdlJzogJ3poLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3poX2NsYXNzaWNhbHdpa2knOiAnemgtY2xhc3NpY2FsLndpa2lwZWRpYS5vcmcnLFxuICAnemhfbWluX25hbndpa2knOiAnemgtbWluLW5hbi53aWtpcGVkaWEub3JnJyxcbiAgJ3poX21pbl9uYW53aWt0aW9uYXJ5JzogJ3poLW1pbi1uYW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnemhfbWluX25hbndpa2lib29rcyc6ICd6aC1taW4tbmFuLndpa2lib29rcy5vcmcnLFxuICAnemhfbWluX25hbndpa2lxdW90ZSc6ICd6aC1taW4tbmFuLndpa2lxdW90ZS5vcmcnLFxuICAnemhfbWluX25hbndpa2lzb3VyY2UnOiAnemgtbWluLW5hbi53aWtpc291cmNlLm9yZycsXG4gICd6aF95dWV3aWtpJzogJ3poLXl1ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3p1d2lraSc6ICd6dS53aWtpcGVkaWEub3JnJyxcbiAgJ3p1d2lrdGlvbmFyeSc6ICd6dS53aWt0aW9uYXJ5Lm9yZycsXG4gICd6dXdpa2lib29rcyc6ICd6dS53aWtpYm9va3Mub3JnJyxcbiAgJ2Fkdmlzb3J5d2lraSc6ICdhZHZpc29yeS53aWtpbWVkaWEub3JnJyxcbiAgJ2Fyd2lraW1lZGlhJzogJ2FyLndpa2ltZWRpYS5vcmcnLFxuICAnYXJiY29tX2Rld2lraSc6ICdhcmJjb20tZGUud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fZW53aWtpJzogJ2FyYmNvbS1lbi53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9maXdpa2knOiAnYXJiY29tLWZpLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX25sd2lraSc6ICdhcmJjb20tbmwud2lraXBlZGlhLm9yZycsXG4gICdhdWRpdGNvbXdpa2knOiAnYXVkaXRjb20ud2lraW1lZGlhLm9yZycsXG4gICdiZHdpa2ltZWRpYSc6ICdiZC53aWtpbWVkaWEub3JnJyxcbiAgJ2Jld2lraW1lZGlhJzogJ2JlLndpa2ltZWRpYS5vcmcnLFxuICAnYmV0YXdpa2l2ZXJzaXR5JzogJ2JldGEud2lraXZlcnNpdHkub3JnJyxcbiAgJ2JvYXJkd2lraSc6ICdib2FyZC53aWtpbWVkaWEub3JnJyxcbiAgJ2JvYXJkZ292Y29td2lraSc6ICdib2FyZGdvdmNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2Jyd2lraW1lZGlhJzogJ2JyLndpa2ltZWRpYS5vcmcnLFxuICAnY2F3aWtpbWVkaWEnOiAnY2Eud2lraW1lZGlhLm9yZycsXG4gICdjaGFpcndpa2knOiAnY2hhaXIud2lraW1lZGlhLm9yZycsXG4gICdjaGFwY29td2lraSc6ICdhZmZjb20ud2lraW1lZGlhLm9yZycsXG4gICdjaGVja3VzZXJ3aWtpJzogJ2NoZWNrdXNlci53aWtpbWVkaWEub3JnJyxcbiAgJ2Nud2lraW1lZGlhJzogJ2NuLndpa2ltZWRpYS5vcmcnLFxuICAnY293aWtpbWVkaWEnOiAnY28ud2lraW1lZGlhLm9yZycsXG4gICdjb2xsYWJ3aWtpJzogJ2NvbGxhYi53aWtpbWVkaWEub3JnJyxcbiAgJ2NvbW1vbnN3aWtpJzogJ2NvbW1vbnMud2lraW1lZGlhLm9yZycsXG4gICdka3dpa2ltZWRpYSc6ICdkay53aWtpbWVkaWEub3JnJyxcbiAgJ2RvbmF0ZXdpa2knOiAnZG9uYXRlLndpa2ltZWRpYS5vcmcnLFxuICAnZXR3aWtpbWVkaWEnOiAnZWUud2lraW1lZGlhLm9yZycsXG4gICdleGVjd2lraSc6ICdleGVjLndpa2ltZWRpYS5vcmcnLFxuICAnZmRjd2lraSc6ICdmZGMud2lraW1lZGlhLm9yZycsXG4gICdmaXdpa2ltZWRpYSc6ICdmaS53aWtpbWVkaWEub3JnJyxcbiAgJ2ZvdW5kYXRpb253aWtpJzogJ3dpa2ltZWRpYWZvdW5kYXRpb24ub3JnJyxcbiAgJ2dyYW50c3dpa2knOiAnZ3JhbnRzLndpa2ltZWRpYS5vcmcnLFxuICAnaWVnY29td2lraSc6ICdpZWdjb20ud2lraW1lZGlhLm9yZycsXG4gICdpbHdpa2ltZWRpYSc6ICdpbC53aWtpbWVkaWEub3JnJyxcbiAgJ2luY3ViYXRvcndpa2knOiAnaW5jdWJhdG9yLndpa2ltZWRpYS5vcmcnLFxuICAnaW50ZXJuYWx3aWtpJzogJ2ludGVybmFsLndpa2ltZWRpYS5vcmcnLFxuICAnbGFic3dpa2knOiAnd2lraXRlY2gud2lraW1lZGlhLm9yZycsXG4gICdsYWJ0ZXN0d2lraSc6ICdsYWJ0ZXN0d2lraXRlY2gud2lraW1lZGlhLm9yZycsXG4gICdsZWdhbHRlYW13aWtpJzogJ2xlZ2FsdGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ2xvZ2lud2lraSc6ICdsb2dpbi53aWtpbWVkaWEub3JnJyxcbiAgJ21lZGlhd2lraXdpa2knOiAnbWVkaWF3aWtpLm9yZycsXG4gICdtZXRhd2lraSc6ICdtZXRhLndpa2ltZWRpYS5vcmcnLFxuICAnbWt3aWtpbWVkaWEnOiAnbWsud2lraW1lZGlhLm9yZycsXG4gICdtb3ZlbWVudHJvbGVzd2lraSc6ICdtb3ZlbWVudHJvbGVzLndpa2ltZWRpYS5vcmcnLFxuICAnbXh3aWtpbWVkaWEnOiAnbXgud2lraW1lZGlhLm9yZycsXG4gICdubHdpa2ltZWRpYSc6ICdubC53aWtpbWVkaWEub3JnJyxcbiAgJ25vd2lraW1lZGlhJzogJ25vLndpa2ltZWRpYS5vcmcnLFxuICAnbm9ib2FyZF9jaGFwdGVyc3dpa2ltZWRpYSc6ICdub2JvYXJkLWNoYXB0ZXJzLndpa2ltZWRpYS5vcmcnLFxuICAnbm9zdGFsZ2lhd2lraSc6ICdub3N0YWxnaWEud2lraXBlZGlhLm9yZycsXG4gICdueWN3aWtpbWVkaWEnOiAnbnljLndpa2ltZWRpYS5vcmcnLFxuICAnbnp3aWtpbWVkaWEnOiAnbnoud2lraW1lZGlhLm9yZycsXG4gICdvZmZpY2V3aWtpJzogJ29mZmljZS53aWtpbWVkaWEub3JnJyxcbiAgJ29tYnVkc21lbndpa2knOiAnb21idWRzbWVuLndpa2ltZWRpYS5vcmcnLFxuICAnb3Ryc193aWtpd2lraSc6ICdvdHJzLXdpa2kud2lraW1lZGlhLm9yZycsXG4gICdvdXRyZWFjaHdpa2knOiAnb3V0cmVhY2gud2lraW1lZGlhLm9yZycsXG4gICdwYV91c3dpa2ltZWRpYSc6ICdwYS11cy53aWtpbWVkaWEub3JnJyxcbiAgJ3Bsd2lraW1lZGlhJzogJ3BsLndpa2ltZWRpYS5vcmcnLFxuICAncXVhbGl0eXdpa2knOiAncXVhbGl0eS53aWtpbWVkaWEub3JnJyxcbiAgJ3Jzd2lraW1lZGlhJzogJ3JzLndpa2ltZWRpYS5vcmcnLFxuICAncnV3aWtpbWVkaWEnOiAncnUud2lraW1lZGlhLm9yZycsXG4gICdzZXdpa2ltZWRpYSc6ICdzZS53aWtpbWVkaWEub3JnJyxcbiAgJ3NlYXJjaGNvbXdpa2knOiAnc2VhcmNoY29tLndpa2ltZWRpYS5vcmcnLFxuICAnc291cmNlc3dpa2knOiAnd2lraXNvdXJjZS5vcmcnLFxuICAnc3Bjb213aWtpJzogJ3NwY29tLndpa2ltZWRpYS5vcmcnLFxuICAnc3BlY2llc3dpa2knOiAnc3BlY2llcy53aWtpbWVkaWEub3JnJyxcbiAgJ3N0ZXdhcmR3aWtpJzogJ3N0ZXdhcmQud2lraW1lZGlhLm9yZycsXG4gICdzdHJhdGVneXdpa2knOiAnc3RyYXRlZ3kud2lraW1lZGlhLm9yZycsXG4gICd0ZW53aWtpJzogJ3Rlbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3R3aWtpJzogJ3Rlc3Qud2lraXBlZGlhLm9yZycsXG4gICd0ZXN0Mndpa2knOiAndGVzdDIud2lraXBlZGlhLm9yZycsXG4gICd0ZXN0d2lraWRhdGF3aWtpJzogJ3Rlc3Qud2lraWRhdGEub3JnJyxcbiAgJ3Ryd2lraW1lZGlhJzogJ3RyLndpa2ltZWRpYS5vcmcnLFxuICAndHJhbnNpdGlvbnRlYW13aWtpJzogJ3RyYW5zaXRpb250ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAndWF3aWtpbWVkaWEnOiAndWEud2lraW1lZGlhLm9yZycsXG4gICd1a3dpa2ltZWRpYSc6ICd1ay53aWtpbWVkaWEub3JnJyxcbiAgJ3VzYWJpbGl0eXdpa2knOiAndXNhYmlsaXR5Lndpa2ltZWRpYS5vcmcnLFxuICAndm90ZXdpa2knOiAndm90ZS53aWtpbWVkaWEub3JnJyxcbiAgJ3dnX2Vud2lraSc6ICd3Zy1lbi53aWtpcGVkaWEub3JnJyxcbiAgJ3dpa2lkYXRhd2lraSc6ICd3aWtpZGF0YS5vcmcnLFxuICAnd2lraW1hbmlhMjAwNXdpa2knOiAnd2lraW1hbmlhMjAwNS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDZ3aWtpJzogJ3dpa2ltYW5pYTIwMDYud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA3d2lraSc6ICd3aWtpbWFuaWEyMDA3Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwOHdpa2knOiAnd2lraW1hbmlhMjAwOC53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDl3aWtpJzogJ3dpa2ltYW5pYTIwMDkud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDEwd2lraSc6ICd3aWtpbWFuaWEyMDEwLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMXdpa2knOiAnd2lraW1hbmlhMjAxMS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTJ3aWtpJzogJ3dpa2ltYW5pYTIwMTIud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDEzd2lraSc6ICd3aWtpbWFuaWEyMDEzLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNHdpa2knOiAnd2lraW1hbmlhMjAxNC53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTV3aWtpJzogJ3dpa2ltYW5pYTIwMTUud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE2d2lraSc6ICd3aWtpbWFuaWEyMDE2Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxN3dpa2knOiAnd2lraW1hbmlhMjAxNy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYXRlYW13aWtpJzogJ3dpa2ltYW5pYXRlYW0ud2lraW1lZGlhLm9yZycsXG4gICd6ZXJvd2lraSc6ICd6ZXJvLndpa2ltZWRpYS5vcmcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpdGVNYXA7XG4iLCIvKipcbiAqIEBmaWxlIFRlbXBsYXRlcyB1c2VkIGJ5IENoYXJ0LmpzIGZvciBQYWdldmlld3MgYXBwXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqL1xuXG4vKipcbiAqIFRlbXBsYXRlcyB1c2VkIGJ5IENoYXJ0LmpzLlxuICogRnVuY3Rpb25zIHVzZWQgd2l0aGluIG91ciBhcHAgbXVzdCBiZSBpbiB0aGUgZ2xvYmFsIHNjb3BlLlxuICogQWxsIHF1b3RhdGlvbnMgbXVzdCBiZSBkb3VibGUtcXVvdGVzIG9yIHByb3Blcmx5IGVzY2FwZWQuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCB0ZW1wbGF0ZXMgPSB7XG4gIGNoYXJ0TGVnZW5kKHNjb3BlKSB7XG4gICAgY29uc3QgZGF0YUxpc3QgPSAoZW50aXR5LCBtdWx0aUVudGl0eSA9IGZhbHNlKSA9PiB7XG4gICAgICBsZXQgZWRpdHNMaW5rO1xuXG4gICAgICBpZiAobXVsdGlFbnRpdHkpIHtcbiAgICAgICAgZWRpdHNMaW5rID0gc2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS5udW1fZWRpdHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWRpdHNMaW5rID0gYDxhIGhyZWY9XCIke3Njb3BlLmdldEV4cGFuZGVkUGFnZVVSTChlbnRpdHkubGFiZWwpfSZhY3Rpb249aGlzdG9yeVwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwicHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgJHtzY29wZS5mb3JtYXROdW1iZXIoZW50aXR5Lm51bV9lZGl0cyl9XG4gICAgICAgICAgPC9hPmA7XG4gICAgICB9XG5cbiAgICAgIGxldCBpbmZvSGFzaCA9IHtcbiAgICAgICAgJ1BhZ2V2aWV3cyc6IHtcbiAgICAgICAgICAnUGFnZXZpZXdzJzogc2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS5zdW0pLFxuICAgICAgICAgICdEYWlseSBhdmVyYWdlJzogc2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS5hdmVyYWdlKVxuICAgICAgICB9LFxuICAgICAgICAnUmV2aXNpb25zJzoge1xuICAgICAgICAgICdFZGl0cyc6IGVkaXRzTGluayxcbiAgICAgICAgICAnRWRpdG9ycyc6IHNjb3BlLmZvcm1hdE51bWJlcihlbnRpdHkubnVtX3VzZXJzKVxuICAgICAgICB9LFxuICAgICAgICAnQmFzaWMgaW5mb3JtYXRpb24nOiB7XG4gICAgICAgICAgJ1dhdGNoZXJzJzogZW50aXR5LndhdGNoZXJzID8gc2NvcGUuZm9ybWF0TnVtYmVyKGVudGl0eS53YXRjaGVycykgOiAkLmkxOG4oJ3Vua25vd24nKVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoIW11bHRpRW50aXR5KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oaW5mb0hhc2hbJ0Jhc2ljIGluZm9ybWF0aW9uJ10sIHtcbiAgICAgICAgICAnU2l6ZSc6IGVudGl0eS5sZW5ndGggPyBzY29wZS5mb3JtYXROdW1iZXIoZW50aXR5Lmxlbmd0aCkgOiAnJyxcbiAgICAgICAgICAnUHJvdGVjdGlvbic6IGVudGl0eS5wcm90ZWN0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsZXQgbWFya3VwID0gJyc7XG5cbiAgICAgIGZvciAobGV0IGJsb2NrIGluIGluZm9IYXNoKSB7XG4gICAgICAgIG1hcmt1cCArPSBgPGRpdiBjbGFzcz0nbGVnZW5kLWJsb2NrJz48aDU+JHtibG9ja308L2g1Pjxoci8+YDtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGluZm9IYXNoW2Jsb2NrXSkge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gaW5mb0hhc2hbYmxvY2tdW2tleV07XG4gICAgICAgICAgaWYgKCF2YWx1ZSkgY29udGludWU7XG4gICAgICAgICAgbWFya3VwICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lYXItbGVnZW5kLS1jb3VudHNcIj5cbiAgICAgICAgICAgICAgJHtrZXl9OlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ncHVsbC1yaWdodCc+XG4gICAgICAgICAgICAgICAgJHt2YWx1ZX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgICBtYXJrdXAgKz0gJzwvZGl2Pic7XG4gICAgICB9XG5cbiAgICAgIGlmICghbXVsdGlFbnRpdHkpIHtcbiAgICAgICAgbWFya3VwICs9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tbGlua3NcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIke3Njb3BlLmdldExhbmd2aWV3c1VSTChlbnRpdHkubGFiZWwpfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7JC5pMThuKCdhbGwtbGFuZ3VhZ2VzJyl9PC9hPlxuICAgICAgICAgICAgJmJ1bGxldDtcbiAgICAgICAgICAgIDxhIGhyZWY9XCIke3Njb3BlLmdldFJlZGlyZWN0dmlld3NVUkwoZW50aXR5LmxhYmVsKX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4keyQuaTE4bigncmVkaXJlY3RzJyl9PC9hPlxuICAgICAgICAgIDwvZGl2PmA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrdXA7XG4gICAgfTtcblxuICAgIC8vIG1hcCBvdXQgZWRpdCBwcm90ZWN0aW9uIGxldmVsIGZvciBlYWNoIGVudGl0eVxuICAgIGNvbnN0IGVudGl0aWVzID0gc2NvcGUub3V0cHV0RGF0YS5tYXAoZW50aXR5ID0+IHtcbiAgICAgIGNvbnN0IHByb3RlY3Rpb24gPSAoZW50aXR5LnByb3RlY3Rpb24gfHwgW10pLmZpbmQocHJvdCA9PiBwcm90LnR5cGUgPT09ICdlZGl0Jyk7XG4gICAgICBlbnRpdHkucHJvdGVjdGlvbiA9IHByb3RlY3Rpb24gPyBwcm90ZWN0aW9uLmxldmVsIDogJC5pMThuKCdub25lJykudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2NvcGUub3V0cHV0RGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBkYXRhTGlzdChlbnRpdGllc1swXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3VtID0gZW50aXRpZXMucmVkdWNlKChhLGIpID0+IGEgKyBiLnN1bSwgMCk7XG4gICAgY29uc3QgdG90YWxzID0ge1xuICAgICAgc3VtLFxuICAgICAgYXZlcmFnZTogTWF0aC5yb3VuZChzdW0gLyBlbnRpdGllcy5sZW5ndGgpLFxuICAgICAgbnVtX2VkaXRzOiBlbnRpdGllcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLm51bV9lZGl0cywgMCksXG4gICAgICBudW1fdXNlcnM6IGVudGl0aWVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIubnVtX3VzZXJzLCAwKSxcbiAgICAgIHdhdGNoZXJzOiBlbnRpdGllcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLndhdGNoZXJzIHx8IDAsIDApXG4gICAgfTtcblxuICAgIHJldHVybiBkYXRhTGlzdCh0b3RhbHMsIHRydWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlcztcbiJdfQ==
