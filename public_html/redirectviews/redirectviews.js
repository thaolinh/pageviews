(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @file Configuration for Redirectviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

/**
 * Configuration for Redirectviews application.
 * This includes selectors, defaults, and other constants specific to Redirectviews
 * @type {Object}
 */
var config = {
  agentSelector: '#agent_select',
  chart: '.aqs-chart',
  dateLimit: 90, // num days
  dateRangeSelector: '#range_input',
  defaults: {
    dateRange: 'latest-20',
    sort: 'views',
    direction: 1,
    outputData: [],
    hadFailure: false,
    total: 0,
    view: 'list'
  },
  linearLegend: function linearLegend(datasets, scope) {
    return '<strong>' + $.i18n('totals') + ':</strong>\n      ' + $.i18n('num-redirects', scope.outputData.listData.length - 1) + '\n      &bullet;\n      ' + $.i18n('num-pageviews', scope.formatNumber(scope.outputData.sum)) + '\n      (' + scope.formatNumber(Math.round(scope.outputData.average)) + '/' + $.i18n('day') + ')';
  },
  logarithmicCheckbox: '.logarithmic-scale-option',
  platformSelector: '#platform_select',
  projectInput: '#project_input',
  formStates: ['initial', 'processing', 'complete', 'invalid'],
  sourceInput: '#source_input',
  timestampFormat: 'YYYYMMDD00',
  validateParams: ['project', 'platform', 'agent', 'direction', 'sort', 'view'],
  validParams: {
    direction: ['-1', '1'],
    sort: ['title', 'views', 'section'],
    view: ['list', 'chart']
  }
};

module.exports = config;

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Redirectviews Analysis tool
 * @file Main file for Redirectviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 * @requires Pv
 * @requires ChartHelpers
 * @requires ListHelpers
 */

var config = require('./config');
var siteMap = require('../shared/site_map');
var siteDomains = Object.keys(siteMap).map(function (key) {
  return siteMap[key];
});
var Pv = require('../shared/pv');
var ChartHelpers = require('../shared/chart_helpers');
var ListHelpers = require('../shared/list_helpers');

/** Main RedirectViews class */

var RedirectViews = function (_mix$with) {
  _inherits(RedirectViews, _mix$with);

  function RedirectViews() {
    _classCallCheck(this, RedirectViews);

    var _this = _possibleConstructorReturn(this, (RedirectViews.__proto__ || Object.getPrototypeOf(RedirectViews)).call(this, config));

    _this.app = 'redirectviews';
    return _this;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */


  _createClass(RedirectViews, [{
    key: 'initialize',
    value: function initialize() {
      this.assignDefaults();
      this.setupDateRangeSelector();
      this.popParams();
      this.setupListeners();
      this.updateInterAppLinks();

      /** only show options for line, bar and radar charts */
      $('.multi-page-chart-node').hide();
    }

    /**
     * Add general event listeners
     * @override
     * @returns {null} nothing
     */

  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      var _this2 = this;

      _get(RedirectViews.prototype.__proto__ || Object.getPrototypeOf(RedirectViews.prototype), 'setupListeners', this).call(this);

      $('#pv_form').on('submit', function (e) {
        e.preventDefault(); // prevent page from reloading
        _this2.processInput();
      });

      $('.another-query').on('click', function () {
        _this2.setState('initial');
        _this2.pushParams(true);
      });

      $('.sort-link').on('click', function (e) {
        var sortType = $(e.currentTarget).data('type');
        _this2.direction = _this2.sort === sortType ? -_this2.direction : 1;
        _this2.sort = sortType;
        _this2.renderData();
      });

      $('.view-btn').on('click', function (e) {
        document.activeElement.blur();
        _this2.view = e.currentTarget.dataset.value;
        _this2.toggleView(_this2.view);
      });
    }

    /**
     * Copy necessary default values to class instance.
     * Called when the view is reset.
     * @return {null} Nothing
     */

  }, {
    key: 'assignDefaults',
    value: function assignDefaults() {
      var _this3 = this;

      ['sort', 'direction', 'outputData', 'hadFailure', 'total', 'view'].forEach(function (defaultKey) {
        _this3[defaultKey] = _this3.config.defaults[defaultKey];
      });
    }

    /**
     * Build our mother data set, from which we can draw a chart,
     *   render a list of data, whatever our heart desires :)
     * @param  {string} label - label for the dataset
     * @param  {string} link - HTML anchor tag for the label
     * @param  {array} datasets - array of datasets for each article, as returned by the Pageviews API
     * @return {object} mother data set, also stored in this.outputData
     */

  }, {
    key: 'buildMotherDataset',
    value: function buildMotherDataset(label, link, datasets) {
      var _this4 = this;

      /**
       * `datasets` structure:
       *
       * [{
       *   title: page,
       *   items: [
       *     {
       *       access: '',
       *       agent: '',
       *       article: '',
       *       granularity: '',
       *       project: '',
       *       timestamp: '',
       *       views: 10
       *     }
       *   ]
       * }]
       *
       * output structure:
       *
       * {
       *   labels: [''],
       *   listData: [
       *     {
       *       label: '',
       *       data: [1,2,3,4],
       *       sum: 10,
       *       average: 2,
       *       index: 0
       *       ...
       *       MERGE in this.config.chartConfig[this.chartType].dataset(this.config.colors[0])
       *     }
       *   ],
       *   totalViewsSet: [1,2,3,4],
       *   sum: 10,
       *   average: 2,
       *   datesWithoutData: ['2016-05-16T00:00:00-00:00']
       * }
       */

      this.outputData = {
        labels: this.getDateHeadings(true), // labels needed for Charts.js, even though we'll only have one dataset
        link: link,
        listData: [],
        source: label
      };
      var startDate = moment(this.daterangepicker.startDate),
          endDate = moment(this.daterangepicker.endDate),
          length = this.numDaysInRange();

      var totalViewsSet = new Array(length).fill(0),
          datesWithoutData = [],
          totalTitles = [],
          sectionCount = 0;

      datasets.forEach(function (dataset, index) {
        var data = dataset.items.map(function (item) {
          return item.views;
        }),
            sum = data.reduce(function (a, b) {
          return a + b;
        });

        totalTitles.push(dataset.title);
        if (dataset.section) sectionCount++;

        _this4.outputData.listData.push({
          data: data,
          label: dataset.title,
          section: dataset.section || '',
          url: 'https://' + _this4.project + '.org/wiki/' + dataset.title.score(),
          sum: sum,
          average: sum / length,
          index: index
        });

        /**
         * Ensure we have data for each day, using null as the view count when data is actually not available yet
         * See fillInZeros() comments for more info.
         */

        var _fillInZeros = _this4.fillInZeros(dataset.items, startDate, endDate);

        var _fillInZeros2 = _slicedToArray(_fillInZeros, 2);

        var viewsSet = _fillInZeros2[0];
        var incompleteDates = _fillInZeros2[1];

        incompleteDates.forEach(function (date) {
          if (!datesWithoutData.includes(date)) datesWithoutData.push(date);
        });

        totalViewsSet = totalViewsSet.map(function (num, i) {
          return num + viewsSet[i].views;
        });
      });

      var grandSum = totalViewsSet.reduce(function (a, b) {
        return (a || 0) + (b || 0);
      });

      Object.assign(this.outputData, {
        datasets: [{
          label: label,
          data: totalViewsSet,
          sum: grandSum,
          average: grandSum / length
        }],
        datesWithoutData: datesWithoutData,
        sum: grandSum, // nevermind the duplication
        average: grandSum / length,
        titles: totalTitles,
        sectionCount: sectionCount
      });

      if (datesWithoutData.length) {
        var dateList = datesWithoutData.map(function (date) {
          return moment(date).format(_this4.dateFormat);
        });
        this.writeMessage($.i18n('api-incomplete-data', dateList.sort().join(' &middot; '), dateList.length));
      }

      /**
       * If there were no failures, cache the result as some datasets can be very large.
       * There is server cache but there is also processing time that local caching can eliminate
       */
      if (!this.hadFailure) {
        // 10 minutes, TTL is milliseconds
        simpleStorage.set(this.getCacheKey(), this.outputData, { TTL: 600000 });
      }

      return this.outputData;
    }

    /**
     * Get the base project name (without language and the .org)
     * @returns {boolean} projectname
     */

  }, {
    key: 'getExportFilename',


    /**
     * Get informative filename without extension to be used for export options
     * @override
     * @return {string} filename without an extension
     */
    value: function getExportFilename() {
      var params = this.getParams(true);
      return this.outputData.source + '-' + params.start.replace(/-/g, '') + '-' + params.end.replace(/-/g, '');
    }

    /**
     * Get all user-inputted parameters
     * @param {boolean} [forCacheKey] whether or not to include the page name, and exclude sort and direction
     *   in the returned object. This is for the purposes of generating a unique cache key for params affecting the API queries
     * @return {Object} project, platform, agent, etc.
     */

  }, {
    key: 'getParams',
    value: function getParams() {
      var forCacheKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var params = {
        project: $(this.config.projectInput).val(),
        platform: $(this.config.platformSelector).val(),
        agent: $(this.config.agentSelector).val()
      };

      /**
       * Override start and end with custom range values, if configured (set by URL params or setupDateRangeSelector)
       * Valid values are those defined in this.config.specialRanges, constructed like `{range: 'last-month'}`,
       *   or a relative range like `{range: 'latest-N'}` where N is the number of days.
       */
      if (this.specialRange && !forCacheKey) {
        params.range = this.specialRange.range;
      } else {
        params.start = this.daterangepicker.startDate.format('YYYY-MM-DD');
        params.end = this.daterangepicker.endDate.format('YYYY-MM-DD');
      }

      /** only certain characters within the page name are escaped */
      params.page = $(this.config.sourceInput).val().score().replace(/[&%]/g, escape);

      if (!forCacheKey) {
        params.sort = this.sort;
        params.direction = this.direction;
        params.view = this.view;

        /** add autolog param only if it was passed in originally, and only if it was false (true would be default) */
        if (this.noLogScale) params.autolog = 'false';
      }

      return params;
    }

    /**
     * Push relevant class properties to the query string
     * @param  {Boolean} clear - wheter to clear the query string entirely
     * @return {null} nothing
     */

  }, {
    key: 'pushParams',
    value: function pushParams() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!window.history || !window.history.replaceState) return;

      if (clear) {
        return history.replaceState(null, document.title, location.href.split('?')[0]);
      }

      window.history.replaceState({}, document.title, '?' + $.param(this.getParams()));

      $('.permalink').prop('href', '/redirectviews?' + $.param(this.getPermaLink()));
    }

    /**
     * Render list of redirectviews into view
     * @returns {null} nothing
     */

  }, {
    key: 'renderData',
    value: function renderData() {
      var _this5 = this;

      _get(RedirectViews.prototype.__proto__ || Object.getPrototypeOf(RedirectViews.prototype), 'renderData', this).call(this, function (sortedDatasets) {
        $('.output-totals').html('<th scope=\'row\'>' + $.i18n('totals') + '</th>\n         <th>' + $.i18n('num-redirects', _this5.outputData.titles.length - 1) + '</th>\n         <th>' + $.i18n('num-sections', _this5.outputData.sectionCount) + '</th>\n         <th>' + _this5.formatNumber(_this5.outputData.sum) + '</th>\n         <th>' + _this5.formatNumber(Math.round(_this5.outputData.average)) + ' / ' + $.i18n('day') + '</th>');
        $('#output_list').html('');

        sortedDatasets.forEach(function (item, index) {
          var isSource = item.label === _this5.outputData.source;

          var sectionMarkup = '';

          if (item.section) {
            var sectionUrl = _this5.getPageURL(_this5.outputData.source) + '#' + encodeURIComponent(item.section.score());
            sectionMarkup = '<a href="' + sectionUrl + '" target="_blank">#' + item.section + '</a>';
          }

          $('#output_list').append('<tr>\n           <th scope=\'row\'>' + (index + 1) + '</th>\n           <td><a href="' + item.url + '" target="_blank">' + item.label + '</a> ' + (isSource ? '(' + $.i18n('target') + ')' : '') + '</td>\n           <td>' + sectionMarkup + '</a></td>\n           <td><a target=\'_blank\' href=\'' + _this5.getPageviewsURL(_this5.project + '.org', item.label) + '\'>' + _this5.formatNumber(item.sum) + '</a></td>\n           <td>' + _this5.formatNumber(Math.round(item.average)) + ' / ' + $.i18n('day') + '</td>\n           </tr>');
        });
      });
    }

    /**
     * Get value of given langview entry for the purposes of column sorting
     * @param  {object} item - langview entry within this.outputData
     * @param  {String} type - type of property to get
     * @return {String|Number} - value
     */

  }, {
    key: 'getSortProperty',
    value: function getSortProperty(item, type) {
      switch (type) {
        case 'title':
          return item.label;
        case 'section':
          return item.section;
        case 'views':
          return Number(item.sum);
      }
    }

    /**
     * Loop through given pages and query the pageviews API for each
     *   Also updates this.outputData with result
     * @param  {Array} redirectData - as given by the getRedirects promise
     * @return {Deferred} - Promise resolving with data ready to be rendered to view
     */

  }, {
    key: 'getPageViewsData',
    value: function getPageViewsData(redirectData) {
      var _this6 = this;

      var startDate = this.daterangepicker.startDate.startOf('day'),
          endDate = this.daterangepicker.endDate.startOf('day');

      var dfd = $.Deferred(),
          promises = [],
          count = 0,
          failureRetries = {},
          totalRequestCount = redirectData.length,
          failedPages = [],
          pageViewsData = [];

      var makeRequest = function makeRequest(page) {
        var uriEncodedPageName = encodeURIComponent(page.title);

        var url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' + _this6.project + ('/' + $(_this6.config.platformSelector).val() + '/' + $(_this6.config.agentSelector).val() + '/' + uriEncodedPageName + '/daily') + ('/' + startDate.format(_this6.config.timestampFormat) + '/' + endDate.format(_this6.config.timestampFormat));
        var promise = $.ajax({ url: url, dataType: 'json' });
        promises.push(promise);

        promise.done(function (pvData) {
          pageViewsData.push({
            title: page.title,
            section: page.fragment,
            items: pvData.items
          });
        }).fail(function (errorData) {
          /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
          var cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend',
              failedPageLink = _this6.getPageLink(page.title, _this6.project + '.org');

          if (cassandraError) {
            if (failureRetries[page.title]) {
              failureRetries[page.title]++;
            } else {
              failureRetries[page.title] = 1;
            }

            /** maximum of 3 retries */
            if (failureRetries[page.title] < 3) {
              totalRequestCount++;
              return _this6.rateLimit(makeRequest, _this6.config.apiThrottle, _this6)(page);
            }

            /** retries exceeded */
            failedPages.push(failedPageLink);
          } else {
            _this6.writeMessage(failedPageLink + ': ' + $.i18n('api-error', 'Pageviews API') + ' - ' + errorData.responseJSON.title);
          }

          // unless it was a 404, don't cache this series of requests
          if (errorData.status !== 404) hadFailure = true;
        }).always(function () {
          _this6.updateProgressBar(++count, totalRequestCount);

          if (count === totalRequestCount) {
            if (failedPages.length) {
              _this6.writeMessage($.i18n('api-error-timeout', '<ul>' + failedPages.map(function (failedPage) {
                return '<li>' + failedPage + '</li>';
              }).join('') + '</ul>'));
            }

            dfd.resolve(pageViewsData);
          }
        });
      };

      var requestFn = this.rateLimit(makeRequest, this.config.apiThrottle, this);

      redirectData.forEach(function (page) {
        requestFn(page);
      });

      return dfd;
    }

    /**
     * Get all redirects of a page
     * @param  {String} pageName - name of page we want to get data about
     * @return {Deferred} - Promise resolving with redirect data
     */

  }, {
    key: 'getRedirects',
    value: function getRedirects(pageName) {
      var _this7 = this;

      var dfd = $.Deferred();

      var promise = $.ajax({
        url: 'https://' + this.project + '.org/w/api.php',
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
          action: 'query',
          format: 'json',
          formatversion: 2,
          prop: 'redirects',
          rdprop: 'title|fragment',
          rdlimit: 500,
          titles: pageName
        }
      });

      promise.done(function (data) {
        if (data.error) {
          return _this7.setState('initial', function () {
            _this7.writeMessage($.i18n('api-error', 'Redirect API') + ': ' + data.error.info.escape());
          });
        }

        var redirects = [{
          title: pageName
        }].concat(data.query.pages[0].redirects || []);

        return dfd.resolve(redirects);
      });

      return dfd;
    }

    /**
     * Parses the URL query string and sets all the inputs accordingly
     * Should only be called on initial page load, until we decide to support pop states (probably never)
     * @returns {null} nothing
     */

  }, {
    key: 'popParams',
    value: function popParams() {
      var _this8 = this;

      var params = this.validateParams(this.parseQueryString('pages'));

      $(this.config.projectInput).val(params.project);
      this.validateDateRange(params);

      this.patchUsage();

      // fill in value for the page
      if (params.page) {
        $(this.config.sourceInput).val(decodeURIComponent(params.page).descore());
      }

      // If there are invalid params, remove page from params so we don't process the defaults.
      // FIXME: we're checking for site messages because super.validateParams doesn't return a boolean
      //   or any indication the validations failed. This is hacky but necessary.
      if ($('.site-notice .alert-danger').length) {
        delete params.page;
      }

      $(this.config.platformSelector).val(params.platform);
      $(this.config.agentSelector).val(params.agent);

      /** export necessary params to outer scope */
      ['sort', 'direction', 'view'].forEach(function (key) {
        _this8[key] = params[key];
      });

      this.setupSourceInput();

      /** start up processing if page name is present */
      if (params.page) {
        this.processInput();
      } else {
        $(this.config.sourceInput).focus();
      }
    }

    /**
     * Helper to set a CSS class on the `main` node,
     *   styling the document based on a 'state'
     * @param {String} state - class to be added;
     *   should be one of ['initial', 'processing', 'complete']
     * @returns {null} nothing
     */

  }, {
    key: 'setState',
    value: function setState(state) {
      $('main').removeClass(this.config.formStates.join(' ')).addClass(state);

      switch (state) {
        case 'initial':
          this.clearMessages();
          this.assignDefaults();
          this.destroyChart();
          $('output').removeClass('list-mode').removeClass('chart-mode');
          $('.data-links').addClass('invisible');
          if (this.typeahead) this.typeahead.hide();
          $(this.config.sourceInput).val('').focus();
          break;
        case 'processing':
          this.processStarted();
          this.clearMessages();
          document.activeElement.blur();
          $('.progress-bar').addClass('active');
          break;
        case 'complete':
          this.processEnded();
          /** stop hidden animation for slight performance improvement */
          this.updateProgressBar(0);
          $('.progress-bar').removeClass('active');
          $('.data-links').removeClass('invisible');
          break;
        case 'invalid':
          break;
      }
    }

    /**
     * Process the redirectviews for the article and options entered
     * Called when submitting the form
     * @return {null} nothing
     */

  }, {
    key: 'processInput',
    value: function processInput() {
      var _this9 = this;

      var page = $(this.config.sourceInput).val();

      this.setState('processing');

      var readyForRendering = function readyForRendering() {
        $('.output-title').html(_this9.outputData.link);
        $('.output-params').html($(_this9.config.dateRangeSelector).val());
        _this9.setInitialChartType();
        _this9.renderData();
      };

      if (this.isRequestCached()) {
        $('.progress-bar').css('width', '100%');
        $('.progress-counter').text($.i18n('loading-cache'));
        return setTimeout(function () {
          _this9.outputData = simpleStorage.get(_this9.getCacheKey());
          readyForRendering();
        }, 500);
      }

      $('.progress-counter').text($.i18n('fetching-data', 'Redirects API'));
      this.getRedirects(page).done(function (redirectData) {
        _this9.getPageViewsData(redirectData).done(function (pageViewsData) {
          $('.progress-bar').css('width', '100%');
          $('.progress-counter').text($.i18n('building-dataset'));
          var pageLink = _this9.getPageLink(decodeURIComponent(page), _this9.project);
          setTimeout(function () {
            _this9.buildMotherDataset(page, pageLink, pageViewsData);
            readyForRendering();
          }, 250);
        });
      }).fail(function (error) {
        _this9.setState('initial');

        /** structured error comes back as a string, otherwise we don't know what happened */
        if (typeof error === 'string') {
          _this9.writeMessage(error);
        } else {
          _this9.writeMessage($.i18n('api-error-unknown', 'Wikidata'));
        }
      });
    }

    /**
     * Setup typeahead on the article input, killing the prevous instance if present
     * @return {null} Nothing
     */

  }, {
    key: 'setupSourceInput',
    value: function setupSourceInput() {
      if (this.typeahead) this.typeahead.destroy();

      $(this.config.sourceInput).typeahead({
        ajax: {
          url: 'https://' + this.project + '.org/w/api.php',
          timeout: 200,
          triggerLength: 1,
          method: 'get',
          preDispatch: function preDispatch(query) {
            return {
              action: 'opensearch',
              redirects: 'resolve',
              format: 'json',
              search: query
            };
          },
          preProcess: function preProcess(data) {
            return data[1];
          }
        }
      });
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
      if (_get(RedirectViews.prototype.__proto__ || Object.getPrototypeOf(RedirectViews.prototype), 'validateProject', this).call(this)) {
        this.setState('initial');

        /** kill and re-init typeahead to point to new project */
        this.setupSourceInput();
      }
    }

    /**
     * Exports current lang data to CSV format and loads it in a new tab
     * With the prepended data:text/csv this should cause the browser to download the data
     * @returns {string} CSV content
     */

  }, {
    key: 'exportCSV',
    value: function exportCSV() {
      var csvContent = 'data:text/csv;charset=utf-8,Title,' + this.getDateHeadings(false).join(',') + '\n';

      // Add the rows to the CSV
      this.outputData.listData.forEach(function (page) {
        var pageName = '"' + page.label.descore().replace(/"/g, '""') + '"';

        csvContent += [pageName].concat(page.data).join(',') + '\n';
      });

      // Output the CSV file to the browser
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }

    /**
     * Get informative filename without extension to be used for export options
     * @return {string} filename without an extension
     */

  }, {
    key: 'getExportFilename',
    value: function getExportFilename() {
      var params = this.getParams(true);
      return this.outputData.source + '-' + params.start.replace(/-/g, '') + '-' + params.end.replace(/-/g, '');
    }
  }, {
    key: 'baseProject',
    get: function get() {
      return this.project.split('.')[1];
    }

    /**
     * @returns {Typeahead} instance
     */

  }, {
    key: 'typeahead',
    get: function get() {
      return $(this.config.sourceInput).data('typeahead');
    }
  }]);

  return RedirectViews;
}(mix(Pv).with(ChartHelpers, ListHelpers));

$(document).ready(function () {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new RedirectViews();
});

},{"../shared/chart_helpers":3,"../shared/list_helpers":5,"../shared/pv":7,"../shared/site_map":9,"./config":1}],3:[function(require,module,exports){
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file Shared list-specific logic
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

/**
 * Shared list-specific logic
 * @param {class} superclass - base class
 * @returns {null} class extending superclass
 */
var ListHelpers = function ListHelpers(superclass) {
  return function (_superclass) {
    _inherits(_class, _superclass);

    function _class(appConfig) {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, appConfig));
    }

    /**
     * Prepare chart options before showing chart view, based on current chart type
     * @return {null} Nothing
     */


    _createClass(_class, [{
      key: 'assignOutputDataChartOpts',
      value: function assignOutputDataChartOpts() {
        var color = this.config.colors[0];
        Object.assign(this.outputData.datasets[0], this.config.chartConfig[this.chartType].dataset(color));

        if (this.chartType === 'line') {
          this.outputData.datasets[0].fillColor = color.replace(/,\s*\d\)/, ', 0.2)');
        }
      }

      /**
       * Exports current lang data to JSON format and loads it in a new tab
       * @returns {null} Nothing
       */

    }, {
      key: 'exportJSON',
      value: function exportJSON() {
        var jsonContent = 'data:text/json;charset=utf-8,' + JSON.stringify(this.outputData.listData);
        this.downloadData(jsonContent, 'json');
      }

      /**
       * Fills in zeros to a timeseries, see:
       * https://wikitech.wikimedia.org/wiki/Analytics/AQS/Pageview_API#Gotchas
       *
       * @param {object} items - entries fetched from Pageviews API
       * @param {moment} startDate - start date of range to filter through
       * @param {moment} endDate - end date of range
       * @returns {array} 0 = dataset with zeros where nulls were,
       *   1 = dates that met the edge case, meaning data is not yet available
       */

    }, {
      key: 'fillInZeros',
      value: function fillInZeros(items, startDate, endDate) {
        var _this2 = this;

        /** Extract the dates that are already in the timeseries */
        var alreadyThere = {};
        items.forEach(function (elem) {
          var date = moment(elem.timestamp, _this2.config.timestampFormat);
          alreadyThere[date] = elem;
        });
        var data = [],
            datesWithoutData = [];

        /** Reconstruct with zeros instead of nulls */
        for (var date = moment(startDate); date <= endDate; date.add(1, 'd')) {
          if (alreadyThere[date]) {
            data.push(alreadyThere[date]);
          } else {
            var edgeCase = date.isSame(this.config.maxDate) || date.isSame(moment(this.config.maxDate).subtract(1, 'days'));
            data.push({
              timestamp: date.format(this.config.timestampFormat),
              views: edgeCase ? null : 0
            });
            if (edgeCase) datesWithoutData.push(date.format());
          }
        }

        return [data, datesWithoutData];
      }

      /**
       * Return cache key for current params
       * @return {String} key
       */

    }, {
      key: 'getCacheKey',
      value: function getCacheKey() {
        return 'pv-cache-' + this.hashCode(this.app + JSON.stringify(this.getParams(true)));
      }

      /**
       * Link to /pageviews for given article and chosen daterange
       * @param {String} project - base project, e.g. en.wikipedia.org
       * @param {String} page - page name
       * @returns {String} URL
       */
      // FIXME: should include agent and platform, and use special ranges as currently specified

    }, {
      key: 'getPageviewsURL',
      value: function getPageviewsURL(project, page) {
        var startDate = moment(this.daterangepicker.startDate),
            endDate = moment(this.daterangepicker.endDate);
        var platform = $(this.config.platformSelector).val();

        if (endDate.diff(startDate, 'days') === 0) {
          startDate.subtract(3, 'days');
          endDate.add(3, 'days');
        }

        return '/pageviews?start=' + startDate.format('YYYY-MM-DD') + ('&end=' + endDate.format('YYYY-MM-DD') + '&project=' + project + '&platform=' + platform + '&pages=' + page);
      }

      /**
       * Get params needed to create a permanent link of visible data
       * @return {Object} hash of params
       */

    }, {
      key: 'getPermaLink',
      value: function getPermaLink() {
        var params = this.getParams(true);
        params.sort = this.sort;
        params.direction = this.direction;
        return params;
      }

      /**
       * Get current class name of <output>, representing the current state of the form
       * @return {String} state, one of this.config.formStates
       */

    }, {
      key: 'getState',
      value: function getState() {
        var classList = $('main')[0].classList;
        return this.config.formStates.filter(function (stateName) {
          return classList.contains(stateName);
        })[0];
      }

      /**
       * Check simple storage to see if a request with the current params would be cached
       * @return {Boolean} cached or not
       */

    }, {
      key: 'isRequestCached',
      value: function isRequestCached() {
        return simpleStorage.hasKey(this.getCacheKey());
      }

      /**
       * Render list of output data into view
       * @param {function} cb - block to call between initial setup and showing the output
       * @returns {null} nothing
       */

    }, {
      key: 'renderData',
      value: function renderData(cb) {
        var _this3 = this;

        var articleDatasets = this.outputData.listData;

        /** sort ascending by current sort setting */
        var sortedDatasets = articleDatasets.sort(function (a, b) {
          var before = _this3.getSortProperty(a, _this3.sort),
              after = _this3.getSortProperty(b, _this3.sort);

          if (before < after) {
            return _this3.direction;
          } else if (before > after) {
            return -_this3.direction;
          } else {
            return 0;
          }
        });

        $('.sort-link span').removeClass('glyphicon-sort-by-alphabet-alt glyphicon-sort-by-alphabet').addClass('glyphicon-sort');
        var newSortClassName = parseInt(this.direction, 10) === 1 ? 'glyphicon-sort-by-alphabet-alt' : 'glyphicon-sort-by-alphabet';
        $('.sort-link--' + this.sort + ' span').addClass(newSortClassName).removeClass('glyphicon-sort');

        try {
          cb(sortedDatasets);
        } catch (err) {
          this.setState('complete');
          this.showFatalErrors([err]);
        } finally {
          this.pushParams();
        }

        this.toggleView(this.view);
        /**
         * Setting the state to complete will call this.processEnded
         * We only want to this the first time, not after changing chart types, etc.
         */
        if (this.getState() !== 'complete') this.setState('complete');
      }

      /**
       * Toggle or set chart vs list view. All of the normal chart logic lives here
       * @param  {String} view - which view to set, either chart or list
       * @return {null} Nothing
       */

    }, {
      key: 'toggleView',
      value: function toggleView(view) {
        var _this4 = this;

        $('.view-btn').removeClass('active');
        $('.view-btn--' + view).addClass('active');
        $('output').removeClass('list-mode').removeClass('chart-mode').addClass(view + '-mode');

        if (view === 'chart') {
          this.destroyChart();

          /** don't use circule charts */
          if (this.config.circularCharts.includes(this.chartType)) {
            this.chartType = 'bar';
          }

          var options = Object.assign({}, this.config.chartConfig[this.chartType].opts, this.config.globalChartOpts);
          this.assignOutputDataChartOpts();
          this.setChartPointDetectionRadius();

          if (this.autoLogDetection === 'true') {
            var shouldBeLogarithmic = this.shouldBeLogarithmic([this.outputData.datasets[0].data]);
            $(this.config.logarithmicCheckbox).prop('checked', shouldBeLogarithmic);
          }

          if (this.isLogarithmic()) {
            options.scales = Object.assign({}, options.scales, {
              yAxes: [{
                type: 'logarithmic',
                ticks: {
                  callback: function callback(value, index, arr) {
                    var remain = value / Math.pow(10, Math.floor(Chart.helpers.log10(value)));

                    if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
                      return _this4.formatNumber(value);
                    } else {
                      return '';
                    }
                  }
                }
              }]
            });
          }

          if (this.chartType === 'radar') {
            options.scale.ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
          } else {
            options.scales.yAxes[0].ticks.beginAtZero = $('.begin-at-zero-option').is(':checked');
          }

          var context = $(this.config.chart)[0].getContext('2d');
          this.chartObj = new Chart(context, {
            type: this.chartType,
            data: this.outputData,
            options: options
          });

          $('.chart-specific').show();
          $('#chart-legend').html(this.chartObj.generateLegend());
        } else {
          $('.chart-specific').hide();
        }

        this.pushParams();
      }

      /**
       * Set value of progress bar
       * @param  {Number} value - current iteration
       * @param  {Number} total - total number of iterations
       * @return {null} nothing
       */

    }, {
      key: 'updateProgressBar',
      value: function updateProgressBar(value, total) {
        if (!total) {
          $('.progress-bar').css('width', '0%');
          return $('.progress-counter').text('');
        }

        var percentage = value / total * 100;
        $('.progress-bar').css('width', percentage.toFixed(2) + '%');

        if (value === total) {
          $('.progress-counter').text('Building dataset...');
        } else {
          $('.progress-counter').text($.i18n('processing-page', value, total));
        }
      }
    }]);

    return _class;
  }(superclass);
};

module.exports = ListHelpers;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./core_extensions":4,"./polyfills":6,"./pv_config":8,"./site_map":9}],8:[function(require,module,exports){
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

},{"./site_map":9}],9:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9yZWRpcmVjdHZpZXdzL2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL3JlZGlyZWN0dmlld3MvcmVkaXJlY3R2aWV3cy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9jaGFydF9oZWxwZXJzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL2NvcmVfZXh0ZW5zaW9ucy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9saXN0X2hlbHBlcnMuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvcG9seWZpbGxzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2LmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2X2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9zaXRlX21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNXQSxJQUFNLFNBQVM7QUFDYixpQkFBZSxlQURGO0FBRWIsU0FBTyxZQUZNO0FBR2IsYUFBVyxFQUhFLEU7QUFJYixxQkFBbUIsY0FKTjtBQUtiLFlBQVU7QUFDUixlQUFXLFdBREg7QUFFUixVQUFNLE9BRkU7QUFHUixlQUFXLENBSEg7QUFJUixnQkFBWSxFQUpKO0FBS1IsZ0JBQVksS0FMSjtBQU1SLFdBQU8sQ0FOQztBQU9SLFVBQU07QUFQRSxHQUxHO0FBY2IsZ0JBQWMsc0JBQUMsUUFBRCxFQUFXLEtBQVgsRUFBcUI7QUFDakMsd0JBQWtCLEVBQUUsSUFBRixDQUFPLFFBQVAsQ0FBbEIsMEJBQ0ksRUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixNQUFNLFVBQU4sQ0FBaUIsUUFBakIsQ0FBMEIsTUFBMUIsR0FBbUMsQ0FBM0QsQ0FESixnQ0FHSSxFQUFFLElBQUYsQ0FBTyxlQUFQLEVBQXdCLE1BQU0sWUFBTixDQUFtQixNQUFNLFVBQU4sQ0FBaUIsR0FBcEMsQ0FBeEIsQ0FISixpQkFJSyxNQUFNLFlBQU4sQ0FBbUIsS0FB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cUNkLGlCQUFTLFlBckNLO0FBc0NkLGlCQUFTLFlBdENLO0FBdUNkLGlCQUFTLFlBdkNLO0FBd0NkLGlCQUFTLFlBeENLO0FBeUNkLHNCQUFjLFlBekNBO0FBMENkLGlCQUFTLFlBMUNLO0FBMkNkLGlCQUFTLFlBM0NLO0FBNENkLGlCQUFTLFlBNUNLO0FBNkNkLGlCQUFTLFlBN0NLO0FBOENkLGlCQUFTLFlBOUNLO0FBK0NkLGlCQUFTLFlBL0NLO0FBZ0RkLGlCQUFTLFlBaERLO0FBaURkLGlCQUFTLFlBakRLO0FBa0RkLGlCQUFTLFVBbERLO0FBbURkLGlCQUFTLFVBbkRLO0FBb0RkLHNCQUFjLFlBcERBO0FBcURkLGlCQUFTLFlBckRLO0FBc0RkLGlCQUFTLFVBdERLO0FBdURkLGlCQUFTLFVBdkRLO0FBd0RkLGlCQUFTLFlBeERLO0FBeURkLGlCQUFTLFVBekRLO0FBMERkLGlCQUFTLFVBMURLO0FBMkRkLGlCQUFTLFlBM0RLO0FBNERkLGlCQUFTLFlBNURLO0FBNkRkLGlCQUFTLFVBN0RLO0FBOERkLGlCQUFTLFVBOURLO0FBK0RkLGtCQUFVLFlBL0RJO0FBZ0VkLGtCQUFVLFlBaEVJO0FBaUVkLGlCQUFTLFVBakVLO0FBa0VkLGlCQUFTLFlBbEVLO0FBbUVkLGlCQUFTLFVBbkVLO0FBb0VkLGlCQUFTLFlBcEVLO0FBcUVkLGlCQUFTLFlBckVLO0FBc0VkLGlCQUFTLFlBdEVLO0FBdUVkLGlCQUFTLFdBdkVLO0FBd0VkLGlCQUFTLFlBeEVLO0FBeUVkLGlCQUFTLFdBekVLO0FBMEVkLGlCQUFTLFlBMUVLO0FBMkVkLGlCQUFTLFlBM0VLO0FBNEVkLHNCQUFjLFVBNUVBO0FBNkVkLGlCQUFTLFVBN0VLO0FBOEVkLHNCQUFjLFlBOUVBO0FBK0VkLGlCQUFTLFlBL0VLO0FBZ0ZkLHNCQUFjLFlBaEZBO0FBaUZkLGlCQUFTLFlBakZLO0FBa0ZkLGlCQUFTLFVBbEZLO0FBbUZkLGlCQUFTLFlBbkZLO0FBb0ZkLGlCQUFTLFdBcEZLO0FBcUZkLGlCQUFTLFlBckZLO0FBc0ZkLGlCQUFTLFlBdEZLO0FBdUZkLHNCQUFjLFVBdkZBO0FBd0ZkLGlCQUFTLFlBeEZLO0FBeUZkLGlCQUFTLFVBekZLO0FBMEZkLGlCQUFTLFlBMUZLO0FBMkZkLGlCQUFTLFlBM0ZLO0FBNEZkLGlCQUFTLFlBNUZLO0FBNkZkLGlCQUFTLFlBN0ZLO0FBOEZkLGlCQUFTLFlBOUZLO0FBK0ZkLGlCQUFTLFVBL0ZLO0FBZ0dkLGlCQUFTLFlBaEdLO0FBaUdkLGlCQUFTLFdBakdLO0FBa0dkLGlCQUFTLFlBbEdLO0FBbUdkLGlCQUFTLFlBbkdLO0FBb0dkLGlCQUFTLFlBcEdLO0FBcUdkLGlCQUFTLFlBckdLO0FBc0dkLGlCQUFTLFlBdEdLO0FBdUdkLGlCQUFTLFlBdkdLO0FBd0dkLGlCQUFTLFlBeEdLO0FBeUdkLGlCQUFTLFlBekdLO0FBMEdkLGlCQUFTLFlBMUdLO0FBMkdkLGlCQUFTLFlBM0dLO0FBNEdkLGlCQUFTLFlBNUdLO0FBNkdkLGlCQUFTLFlBN0dLO0FBOEdkLGlCQUFTLFlBOUdLO0FBK0dkLGtCQUFVLFlBL0dJO0FBZ0hkLGlCQUFTLFlBaEhLO0FBaUhkLGlCQUFTLFlBakhLO0FBa0hkLGlCQUFTLFlBbEhLO0FBbUhkLGlCQUFTLFlBbkhLO0FBb0hkLGlCQUFTLFlBcEhLO0FBcUhkLGlCQUFTLFlBckhLO0FBc0hkLGlCQUFTLFlBdEhLO0FBdUhkLGlCQUFTLFlBdkhLO0FBd0hkLGlCQUFTLFVBeEhLO0FBeUhkLGlCQUFTLFlBekhLO0FBMEhkLGlCQUFTLFlBMUhLO0FBMkhkLGlCQUFTLFVBM0hLO0FBNEhkLGlCQUFTLFlBNUhLO0FBNkhkLGlCQUFTLFlBN0hLO0FBOEhkLGlCQUFTLFlBOUhLO0FBK0hkLGlCQUFTLFlBL0hLO0FBZ0lkLGlCQUFTLFlBaElLO0FBaUlkLGlCQUFTLFlBaklLO0FBa0lkLGlCQUFTLFlBbElLO0FBbUlkLGlCQUFTLFlBbklLO0FBb0lkLGlCQUFTLFlBcElLO0FBcUlkLGlCQUFTLFlBcklLO0FBc0lkLGlCQUFTLFlBdElLO0FBdUlkLGlCQUFTLFVBdklLO0FBd0lkLHVCQUFlLFlBeElEO0FBeUlkLHNCQUFjLFdBeklBO0FBMElkLGtCQUFVLFlBMUlJO0FBMklkLHNCQUFjLFVBM0lBO0FBNElkLGlCQUFTLFlBNUlLO0FBNklkLGlCQUFTLFVBN0lLO0FBOElkLGtCQUFVLFVBOUlJO0FBK0lkLGlCQUFTLFVBL0lLO0FBZ0pkLGlCQUFTLFlBaEpLO0FBaUpkLGlCQUFTLFVBakpLO0FBa0pkLGtCQUFVLFlBbEpJO0FBbUpkLGtCQUFVLFlBbkpJO0FBb0pkLGtCQUFVLFlBcEpJO0FBcUpkLGlCQUFTLFlBckpLO0FBc0pkLGlCQUFTLFlBdEpLO0FBdUpkLGlCQUFTLFlBdkpLO0FBd0pkLGlCQUFTLFlBeEpLO0FBeUpkLGlCQUFTLFlBekpLO0FBMEpkLGlCQUFTLFlBMUpLO0FBMkpkLGtCQUFVLFVBM0pJO0FBNEpkLGtCQUFVLFVBNUpJO0FBNkpkLGtCQUFVLFlBN0pJO0FBOEpkLGlCQUFTLFVBOUpLO0FBK0pkLGtCQUFVLFlBL0pJO0FBZ0tkLGlCQUFTLFVBaEtLO0FBaUtkLGlCQUFTLFlBaktLO0FBa0tkLGlCQUFTLFlBbEtLO0FBbUtkLGlCQUFTLFVBbktLO0FBb0tkLGtCQUFVLFlBcEtJO0FBcUtkLGtCQUFVLFlBcktJO0FBc0tkLGlCQUFTLFVBdEtLO0FBdUtkLHNCQUFjLFVBdktBO0FBd0tkLGtCQUFVLFVBeEtJO0FBeUtkLGlCQUFTLFVBektLO0FBMEtkLGlCQUFTLFVBMUtLO0FBMktkLGlCQUFTLFVBM0tLO0FBNEtkLGlCQUFTLFlBNUtLO0FBNktkLHNCQUFjLFVBN0tBO0FBOEtkLHNCQUFjLFVBOUtBO0FBK0tkLGlCQUFTLFlBL0tLO0FBZ0xkLHNCQUFjLFVBaExBO0FBaUxkLGlCQUFTLFlBakxLO0FBa0xkLGlCQUFTLFlBbExLO0FBbUxkLGlCQUFTLFlBbkxLO0FBb0xkLGlCQUFTLFVBcExLO0FBcUxkLGtCQUFVLFVBckxJO0FBc0xkLGlCQUFTLFlBdExLO0FBdUxkLGlCQUFTLFVBdkxLO0FBd0xkLGlCQUFTLFlBeExLO0FBeUxkLGlCQUFTLFVBekxLO0FBMExkLGlCQUFTLFVBMUxLO0FB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M0JQO0FBdTNCZCx1QkFBcUIsNkJBdjNCUDtBQXczQmQsdUJBQXFCLDZCQXgzQlA7QUF5M0JkLHVCQUFxQiw2QkF6M0JQO0FBMDNCZCx1QkFBcUIsNkJBMTNCUDtBQTIzQmQsdUJBQXFCLDZCQTMzQlA7QUE0M0JkLHVCQUFxQiw2QkE1M0JQO0FBNjNCZCx1QkFBcUIsNkJBNzNCUDtBQTgzQmQsdUJBQXFCLDZCQTkzQlA7QUErM0JkLGNBQVk7QUEvM0JFLENBQWhCOztBQWs0QkEsT0FBTyxPQUFQLEdBQWlCLE9BQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGUgQ29uZmlndXJhdGlvbiBmb3IgUmVkaXJlY3R2aWV3cyBhcHBsaWNhdGlvblxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKi9cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBSZWRpcmVjdHZpZXdzIGFwcGxpY2F0aW9uLlxuICogVGhpcyBpbmNsdWRlcyBzZWxlY3RvcnMsIGRlZmF1bHRzLCBhbmQgb3RoZXIgY29uc3RhbnRzIHNwZWNpZmljIHRvIFJlZGlyZWN0dmlld3NcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNvbmZpZyA9IHtcbiAgYWdlbnRTZWxlY3RvcjogJyNhZ2VudF9zZWxlY3QnLFxuICBjaGFydDogJy5hcXMtY2hhcnQnLFxuICBkYXRlTGltaXQ6IDkwLCAvLyBudW0gZGF5c1xuICBkYXRlUmFuZ2VTZWxlY3RvcjogJyNyYW5nZV9pbnB1dCcsXG4gIGRlZmF1bHRzOiB7XG4gICAgZGF0ZVJhbmdlOiAnbGF0ZXN0LTIwJyxcbiAgICBzb3J0OiAndmlld3MnLFxuICAgIGRpcmVjdGlvbjogMSxcbiAgICBvdXRwdXREYXRhOiBbXSxcbiAgICBoYWRGYWlsdXJlOiBmYWxzZSxcbiAgICB0b3RhbDogMCxcbiAgICB2aWV3OiAnbGlzdCdcbiAgfSxcbiAgbGluZWFyTGVnZW5kOiAoZGF0YXNldHMsIHNjb3BlKSA9PiB7XG4gICAgcmV0dXJuIGA8c3Ryb25nPiR7JC5pMThuKCd0b3RhbHMnKX06PC9zdHJvbmc+XG4gICAgICAkeyQuaTE4bignbnVtLXJlZGlyZWN0cycsIHNjb3BlLm91dHB1dERhdGEubGlzdERhdGEubGVuZ3RoIC0gMSl9XG4gICAgICAmYnVsbGV0O1xuICAgICAgJHskLmkxOG4oJ251bS1wYWdldmlld3MnLCBzY29wZS5mb3JtYXROdW1iZXIoc2NvcGUub3V0cHV0RGF0YS5zdW0pKX1cbiAgICAgICgke3Njb3BlLmZvcm1hdE51bWJlcihNYXRoLnJvdW5kKHNjb3BlLm91dHB1dERhdGEuYXZlcmFnZSkpfS8keyQuaTE4bignZGF5Jyl9KWA7XG4gIH0sXG4gIGxvZ2FyaXRobWljQ2hlY2tib3g6ICcubG9nYXJpdGhtaWMtc2NhbGUtb3B0aW9uJyxcbiAgcGxhdGZvcm1TZWxlY3RvcjogJyNwbGF0Zm9ybV9zZWxlY3QnLFxuICBwcm9qZWN0SW5wdXQ6ICcjcHJvamVjdF9pbnB1dCcsXG4gIGZvcm1TdGF0ZXM6IFsnaW5pdGlhbCcsICdwcm9jZXNzaW5nJywgJ2NvbXBsZXRlJywgJ2ludmFsaWQnXSxcbiAgc291cmNlSW5wdXQ6ICcjc291cmNlX2lucHV0JyxcbiAgdGltZXN0YW1wRm9ybWF0OiAnWVlZWU1NREQwMCcsXG4gIHZhbGlkYXRlUGFyYW1zOiBbJ3Byb2plY3QnLCAncGxhdGZvcm0nLCAnYWdlbnQnLCAnZGlyZWN0aW9uJywgJ3NvcnQnLCAndmlldyddLFxuICB2YWxpZFBhcmFtczoge1xuICAgIGRpcmVjdGlvbjogWyctMScsICcxJ10sXG4gICAgc29ydDogWyd0aXRsZScsICd2aWV3cycsICdzZWN0aW9uJ10sXG4gICAgdmlldzogWydsaXN0JywgJ2NoYXJ0J11cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb25maWc7XG4iLCIvKipcbiAqIFJlZGlyZWN0dmlld3MgQW5hbHlzaXMgdG9vbFxuICogQGZpbGUgTWFpbiBmaWxlIGZvciBSZWRpcmVjdHZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogQHJlcXVpcmVzIFB2XG4gKiBAcmVxdWlyZXMgQ2hhcnRIZWxwZXJzXG4gKiBAcmVxdWlyZXMgTGlzdEhlbHBlcnNcbiAqL1xuXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4uL3NoYXJlZC9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5jb25zdCBQdiA9IHJlcXVpcmUoJy4uL3NoYXJlZC9wdicpO1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2NoYXJ0X2hlbHBlcnMnKTtcbmNvbnN0IExpc3RIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2xpc3RfaGVscGVycycpO1xuXG4vKiogTWFpbiBSZWRpcmVjdFZpZXdzIGNsYXNzICovXG5jbGFzcyBSZWRpcmVjdFZpZXdzIGV4dGVuZHMgbWl4KFB2KS53aXRoKENoYXJ0SGVscGVycywgTGlzdEhlbHBlcnMpIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgICB0aGlzLmFwcCA9ICdyZWRpcmVjdHZpZXdzJztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQ2FsbGVkIGluIGBwdi5qc2AgYWZ0ZXIgdHJhbnNsYXRpb25zIGhhdmUgbG9hZGVkXG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hc3NpZ25EZWZhdWx0cygpO1xuICAgIHRoaXMuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuICAgIHRoaXMucG9wUGFyYW1zKCk7XG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuICAgIHRoaXMudXBkYXRlSW50ZXJBcHBMaW5rcygpO1xuXG4gICAgLyoqIG9ubHkgc2hvdyBvcHRpb25zIGZvciBsaW5lLCBiYXIgYW5kIHJhZGFyIGNoYXJ0cyAqL1xuICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGdlbmVyYWwgZXZlbnQgbGlzdGVuZXJzXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0dXBMaXN0ZW5lcnMoKTtcblxuICAgICQoJyNwdl9mb3JtJykub24oJ3N1Ym1pdCcsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHBhZ2UgZnJvbSByZWxvYWRpbmdcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcuYW5vdGhlci1xdWVyeScpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcbiAgICAgIHRoaXMucHVzaFBhcmFtcyh0cnVlKTtcbiAgICB9KTtcblxuICAgICQoJy5zb3J0LWxpbmsnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnN0IHNvcnRUeXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3R5cGUnKTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5zb3J0ID09PSBzb3J0VHlwZSA/IC10aGlzLmRpcmVjdGlvbiA6IDE7XG4gICAgICB0aGlzLnNvcnQgPSBzb3J0VHlwZTtcbiAgICAgIHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgJCgnLnZpZXctYnRuJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgIHRoaXMudmlldyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgdGhpcy50b2dnbGVWaWV3KHRoaXMudmlldyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBuZWNlc3NhcnkgZGVmYXVsdCB2YWx1ZXMgdG8gY2xhc3MgaW5zdGFuY2UuXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aWV3IGlzIHJlc2V0LlxuICAgKiBAcmV0dXJuIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBhc3NpZ25EZWZhdWx0cygpIHtcbiAgICBbJ3NvcnQnLCAnZGlyZWN0aW9uJywgJ291dHB1dERhdGEnLCAnaGFkRmFpbHVyZScsICd0b3RhbCcsICd2aWV3J10uZm9yRWFjaChkZWZhdWx0S2V5ID0+IHtcbiAgICAgIHRoaXNbZGVmYXVsdEtleV0gPSB0aGlzLmNvbmZpZy5kZWZhdWx0c1tkZWZhdWx0S2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBvdXIgbW90aGVyIGRhdGEgc2V0LCBmcm9tIHdoaWNoIHdlIGNhbiBkcmF3IGEgY2hhcnQsXG4gICAqICAgcmVuZGVyIGEgbGlzdCBvZiBkYXRhLCB3aGF0ZXZlciBvdXIgaGVhcnQgZGVzaXJlcyA6KVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxhYmVsIC0gbGFiZWwgZm9yIHRoZSBkYXRhc2V0XG4gICAqIEBwYXJhbSAge3N0cmluZ30gbGluayAtIEhUTUwgYW5jaG9yIHRhZyBmb3IgdGhlIGxhYmVsXG4gICAqIEBwYXJhbSAge2FycmF5fSBkYXRhc2V0cyAtIGFycmF5IG9mIGRhdGFzZXRzIGZvciBlYWNoIGFydGljbGUsIGFzIHJldHVybmVkIGJ5IHRoZSBQYWdldmlld3MgQVBJXG4gICAqIEByZXR1cm4ge29iamVjdH0gbW90aGVyIGRhdGEgc2V0LCBhbHNvIHN0b3JlZCBpbiB0aGlzLm91dHB1dERhdGFcbiAgICovXG4gIGJ1aWxkTW90aGVyRGF0YXNldChsYWJlbCwgbGluaywgZGF0YXNldHMpIHtcbiAgICAvKipcbiAgICAgKiBgZGF0YXNldHNgIHN0cnVjdHVyZTpcbiAgICAgKlxuICAgICAqIFt7XG4gICAgICogICB0aXRsZTogcGFnZSxcbiAgICAgKiAgIGl0ZW1zOiBbXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICBhY2Nlc3M6ICcnLFxuICAgICAqICAgICAgIGFnZW50OiAnJyxcbiAgICAgKiAgICAgICBhcnRpY2xlOiAnJyxcbiAgICAgKiAgICAgICBncmFudWxhcml0eTogJycsXG4gICAgICogICAgICAgcHJvamVjdDogJycsXG4gICAgICogICAgICAgdGltZXN0YW1wOiAnJyxcbiAgICAgKiAgICAgICB2aWV3czogMTBcbiAgICAgKiAgICAgfVxuICAgICAqICAgXVxuICAgICAqIH1dXG4gICAgICpcbiAgICAgKiBvdXRwdXQgc3RydWN0dXJlOlxuICAgICAqXG4gICAgICoge1xuICAgICAqICAgbGFiZWxzOiBbJyddLFxuICAgICAqICAgbGlzdERhdGE6IFtcbiAgICAgKiAgICAge1xuICAgICAqICAgICAgIGxhYmVsOiAnJyxcbiAgICAgKiAgICAgICBkYXRhOiBbMSwyLDMsNF0sXG4gICAgICogICAgICAgc3VtOiAxMCxcbiAgICAgKiAgICAgICBhdmVyYWdlOiAyLFxuICAgICAqICAgICAgIGluZGV4OiAwXG4gICAgICogICAgICAgLi4uXG4gICAgICogICAgICAgTUVSR0UgaW4gdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQodGhpcy5jb25maWcuY29sb3JzWzBdKVxuICAgICAqICAgICB9XG4gICAgICogICBdLFxuICAgICAqICAgdG90YWxWaWV3c1NldDogWzEsMiwzLDRdLFxuICAgICAqICAgc3VtOiAxMCxcbiAgICAgKiAgIGF2ZXJhZ2U6IDIsXG4gICAgICogICBkYXRlc1dpdGhvdXREYXRhOiBbJzIwMTYtMDUtMTZUMDA6MDA6MDAtMDA6MDAnXVxuICAgICAqIH1cbiAgICAgKi9cblxuICAgIHRoaXMub3V0cHV0RGF0YSA9IHtcbiAgICAgIGxhYmVsczogdGhpcy5nZXREYXRlSGVhZGluZ3ModHJ1ZSksIC8vIGxhYmVscyBuZWVkZWQgZm9yIENoYXJ0cy5qcywgZXZlbiB0aG91Z2ggd2UnbGwgb25seSBoYXZlIG9uZSBkYXRhc2V0XG4gICAgICBsaW5rLFxuICAgICAgbGlzdERhdGE6IFtdLFxuICAgICAgc291cmNlOiBsYWJlbFxuICAgIH07XG4gICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSksXG4gICAgICBlbmREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUpLFxuICAgICAgbGVuZ3RoID0gdGhpcy5udW1EYXlzSW5SYW5nZSgpO1xuXG4gICAgbGV0IHRvdGFsVmlld3NTZXQgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKDApLFxuICAgICAgZGF0ZXNXaXRob3V0RGF0YSA9IFtdLFxuICAgICAgdG90YWxUaXRsZXMgPSBbXSxcbiAgICAgIHNlY3Rpb25Db3VudCA9IDA7XG5cbiAgICBkYXRhc2V0cy5mb3JFYWNoKChkYXRhc2V0LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGRhdGFzZXQuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS52aWV3cyksXG4gICAgICAgIHN1bSA9IGRhdGEucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cbiAgICAgIHRvdGFsVGl0bGVzLnB1c2goZGF0YXNldC50aXRsZSk7XG4gICAgICBpZiAoZGF0YXNldC5zZWN0aW9uKSBzZWN0aW9uQ291bnQrKztcblxuICAgICAgdGhpcy5vdXRwdXREYXRhLmxpc3REYXRhLnB1c2goe1xuICAgICAgICBkYXRhLFxuICAgICAgICBsYWJlbDogZGF0YXNldC50aXRsZSxcbiAgICAgICAgc2VjdGlvbjogZGF0YXNldC5zZWN0aW9uIHx8ICcnLFxuICAgICAgICB1cmw6IGBodHRwczovLyR7dGhpcy5wcm9qZWN0fS5vcmcvd2lraS8ke2RhdGFzZXQudGl0bGUuc2NvcmUoKX1gLFxuICAgICAgICBzdW0sXG4gICAgICAgIGF2ZXJhZ2U6IHN1bSAvIGxlbmd0aCxcbiAgICAgICAgaW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICAvKipcbiAgICAgICAqIEVuc3VyZSB3ZSBoYXZlIGRhdGEgZm9yIGVhY2ggZGF5LCB1c2luZyBudWxsIGFzIHRoZSB2aWV3IGNvdW50IHdoZW4gZGF0YSBpcyBhY3R1YWxseSBub3QgYXZhaWxhYmxlIHlldFxuICAgICAgICogU2VlIGZpbGxJblplcm9zKCkgY29tbWVudHMgZm9yIG1vcmUgaW5mby5cbiAgICAgICAqL1xuICAgICAgY29uc3QgW3ZpZXdzU2V0LCBpbmNvbXBsZXRlRGF0ZXNdID0gdGhpcy5maWxsSW5aZXJvcyhkYXRhc2V0Lml0ZW1zLCBzdGFydERhdGUsIGVuZERhdGUpO1xuICAgICAgaW5jb21wbGV0ZURhdGVzLmZvckVhY2goZGF0ZSA9PiB7XG4gICAgICAgIGlmICghZGF0ZXNXaXRob3V0RGF0YS5pbmNsdWRlcyhkYXRlKSkgZGF0ZXNXaXRob3V0RGF0YS5wdXNoKGRhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRvdGFsVmlld3NTZXQgPSB0b3RhbFZpZXdzU2V0Lm1hcCgobnVtLCBpKSA9PiBudW0gKyB2aWV3c1NldFtpXS52aWV3cyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBncmFuZFN1bSA9IHRvdGFsVmlld3NTZXQucmVkdWNlKChhLCBiKSA9PiAoYSB8fCAwKSArIChiIHx8IDApKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vdXRwdXREYXRhLCB7XG4gICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGRhdGE6IHRvdGFsVmlld3NTZXQsXG4gICAgICAgIHN1bTogZ3JhbmRTdW0sXG4gICAgICAgIGF2ZXJhZ2U6IGdyYW5kU3VtIC8gbGVuZ3RoXG4gICAgICB9XSxcbiAgICAgIGRhdGVzV2l0aG91dERhdGEsXG4gICAgICBzdW06IGdyYW5kU3VtLCAvLyBuZXZlcm1pbmQgdGhlIGR1cGxpY2F0aW9uXG4gICAgICBhdmVyYWdlOiBncmFuZFN1bSAvIGxlbmd0aCxcbiAgICAgIHRpdGxlczogdG90YWxUaXRsZXMsXG4gICAgICBzZWN0aW9uQ291bnRcbiAgICB9KTtcblxuICAgIGlmIChkYXRlc1dpdGhvdXREYXRhLmxlbmd0aCkge1xuICAgICAgY29uc3QgZGF0ZUxpc3QgPSBkYXRlc1dpdGhvdXREYXRhLm1hcChkYXRlID0+IG1vbWVudChkYXRlKS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSk7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oJ2FwaS1pbmNvbXBsZXRlLWRhdGEnLCBkYXRlTGlzdC5zb3J0KCkuam9pbignICZtaWRkb3Q7ICcpLCBkYXRlTGlzdC5sZW5ndGgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSB3ZXJlIG5vIGZhaWx1cmVzLCBjYWNoZSB0aGUgcmVzdWx0IGFzIHNvbWUgZGF0YXNldHMgY2FuIGJlIHZlcnkgbGFyZ2UuXG4gICAgICogVGhlcmUgaXMgc2VydmVyIGNhY2hlIGJ1dCB0aGVyZSBpcyBhbHNvIHByb2Nlc3NpbmcgdGltZSB0aGF0IGxvY2FsIGNhY2hpbmcgY2FuIGVsaW1pbmF0ZVxuICAgICAqL1xuICAgIGlmICghdGhpcy5oYWRGYWlsdXJlKSB7XG4gICAgICAvLyAxMCBtaW51dGVzLCBUVEwgaXMgbWlsbGlzZWNvbmRzXG4gICAgICBzaW1wbGVTdG9yYWdlLnNldCh0aGlzLmdldENhY2hlS2V5KCksIHRoaXMub3V0cHV0RGF0YSwge1RUTDogNjAwMDAwfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0RGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGJhc2UgcHJvamVjdCBuYW1lICh3aXRob3V0IGxhbmd1YWdlIGFuZCB0aGUgLm9yZylcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHByb2plY3RuYW1lXG4gICAqL1xuICBnZXQgYmFzZVByb2plY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdC5zcGxpdCgnLicpWzFdO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtUeXBlYWhlYWR9IGluc3RhbmNlXG4gICAqL1xuICBnZXQgdHlwZWFoZWFkKCkge1xuICAgIHJldHVybiAkKHRoaXMuY29uZmlnLnNvdXJjZUlucHV0KS5kYXRhKCd0eXBlYWhlYWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQG92ZXJyaWRlXG4gICAqIEByZXR1cm4ge3N0cmluZ30gZmlsZW5hbWUgd2l0aG91dCBhbiBleHRlbnNpb25cbiAgICovXG4gIGdldEV4cG9ydEZpbGVuYW1lKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRydWUpO1xuICAgIHJldHVybiBgJHt0aGlzLm91dHB1dERhdGEuc291cmNlfS0ke3BhcmFtcy5zdGFydC5yZXBsYWNlKC8tL2csICcnKX0tJHtwYXJhbXMuZW5kLnJlcGxhY2UoLy0vZywgJycpfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB1c2VyLWlucHV0dGVkIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbZm9yQ2FjaGVLZXldIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIHBhZ2UgbmFtZSwgYW5kIGV4Y2x1ZGUgc29ydCBhbmQgZGlyZWN0aW9uXG4gICAqICAgaW4gdGhlIHJldHVybmVkIG9iamVjdC4gVGhpcyBpcyBmb3IgdGhlIHB1cnBvc2VzIG9mIGdlbmVyYXRpbmcgYSB1bmlxdWUgY2FjaGUga2V5IGZvciBwYXJhbXMgYWZmZWN0aW5nIHRoZSBBUEkgcXVlcmllc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9IHByb2plY3QsIHBsYXRmb3JtLCBhZ2VudCwgZXRjLlxuICAgKi9cbiAgZ2V0UGFyYW1zKGZvckNhY2hlS2V5ID0gZmFsc2UpIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgcHJvamVjdDogJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpLFxuICAgICAgcGxhdGZvcm06ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCksXG4gICAgICBhZ2VudDogJCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBzdGFydCBhbmQgZW5kIHdpdGggY3VzdG9tIHJhbmdlIHZhbHVlcywgaWYgY29uZmlndXJlZCAoc2V0IGJ5IFVSTCBwYXJhbXMgb3Igc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcilcbiAgICAgKiBWYWxpZCB2YWx1ZXMgYXJlIHRob3NlIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcywgY29uc3RydWN0ZWQgbGlrZSBge3JhbmdlOiAnbGFzdC1tb250aCd9YCxcbiAgICAgKiAgIG9yIGEgcmVsYXRpdmUgcmFuZ2UgbGlrZSBge3JhbmdlOiAnbGF0ZXN0LU4nfWAgd2hlcmUgTiBpcyB0aGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICovXG4gICAgaWYgKHRoaXMuc3BlY2lhbFJhbmdlICYmICFmb3JDYWNoZUtleSkge1xuICAgICAgcGFyYW1zLnJhbmdlID0gdGhpcy5zcGVjaWFsUmFuZ2UucmFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgIHBhcmFtcy5lbmQgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIH1cblxuICAgIC8qKiBvbmx5IGNlcnRhaW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBhZ2UgbmFtZSBhcmUgZXNjYXBlZCAqL1xuICAgIHBhcmFtcy5wYWdlID0gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCkuc2NvcmUoKS5yZXBsYWNlKC9bJiVdL2csIGVzY2FwZSk7XG5cbiAgICBpZiAoIWZvckNhY2hlS2V5KSB7XG4gICAgICBwYXJhbXMuc29ydCA9IHRoaXMuc29ydDtcbiAgICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIHBhcmFtcy52aWV3ID0gdGhpcy52aWV3O1xuXG4gICAgICAvKiogYWRkIGF1dG9sb2cgcGFyYW0gb25seSBpZiBpdCB3YXMgcGFzc2VkIGluIG9yaWdpbmFsbHksIGFuZCBvbmx5IGlmIGl0IHdhcyBmYWxzZSAodHJ1ZSB3b3VsZCBiZSBkZWZhdWx0KSAqL1xuICAgICAgaWYgKHRoaXMubm9Mb2dTY2FsZSkgcGFyYW1zLmF1dG9sb2cgPSAnZmFsc2UnO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUHVzaCByZWxldmFudCBjbGFzcyBwcm9wZXJ0aWVzIHRvIHRoZSBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gY2xlYXIgLSB3aGV0ZXIgdG8gY2xlYXIgdGhlIHF1ZXJ5IHN0cmluZyBlbnRpcmVseVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwdXNoUGFyYW1zKGNsZWFyID0gZmFsc2UpIHtcbiAgICBpZiAoIXdpbmRvdy5oaXN0b3J5IHx8ICF3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHJldHVybjtcblxuICAgIGlmIChjbGVhcikge1xuICAgICAgcmV0dXJuIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0pO1xuICAgIH1cblxuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIGA/JHskLnBhcmFtKHRoaXMuZ2V0UGFyYW1zKCkpfWApO1xuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgL3JlZGlyZWN0dmlld3M/JHskLnBhcmFtKHRoaXMuZ2V0UGVybWFMaW5rKCkpfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlciBsaXN0IG9mIHJlZGlyZWN0dmlld3MgaW50byB2aWV3XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICByZW5kZXJEYXRhKCkge1xuICAgIHN1cGVyLnJlbmRlckRhdGEoc29ydGVkRGF0YXNldHMgPT4ge1xuICAgICAgJCgnLm91dHB1dC10b3RhbHMnKS5odG1sKFxuICAgICAgICBgPHRoIHNjb3BlPSdyb3cnPiR7JC5pMThuKCd0b3RhbHMnKX08L3RoPlxuICAgICAgICAgPHRoPiR7JC5pMThuKCdudW0tcmVkaXJlY3RzJywgdGhpcy5vdXRwdXREYXRhLnRpdGxlcy5sZW5ndGggLSAxKX08L3RoPlxuICAgICAgICAgPHRoPiR7JC5pMThuKCdudW0tc2VjdGlvbnMnLCB0aGlzLm91dHB1dERhdGEuc2VjdGlvbkNvdW50KX08L3RoPlxuICAgICAgICAgPHRoPiR7dGhpcy5mb3JtYXROdW1iZXIodGhpcy5vdXRwdXREYXRhLnN1bSl9PC90aD5cbiAgICAgICAgIDx0aD4ke3RoaXMuZm9ybWF0TnVtYmVyKE1hdGgucm91bmQodGhpcy5vdXRwdXREYXRhLmF2ZXJhZ2UpKX0gLyAkeyQuaTE4bignZGF5Jyl9PC90aD5gXG4gICAgICApO1xuICAgICAgJCgnI291dHB1dF9saXN0JykuaHRtbCgnJyk7XG5cbiAgICAgIHNvcnRlZERhdGFzZXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGlzU291cmNlID0gaXRlbS5sYWJlbCA9PT0gdGhpcy5vdXRwdXREYXRhLnNvdXJjZTtcblxuICAgICAgICBsZXQgc2VjdGlvbk1hcmt1cCA9ICcnO1xuXG4gICAgICAgIGlmIChpdGVtLnNlY3Rpb24pIHtcbiAgICAgICAgICBjb25zdCBzZWN0aW9uVXJsID0gYCR7dGhpcy5nZXRQYWdlVVJMKHRoaXMub3V0cHV0RGF0YS5zb3VyY2UpfSMke2VuY29kZVVSSUNvbXBvbmVudChpdGVtLnNlY3Rpb24uc2NvcmUoKSl9YDtcbiAgICAgICAgICBzZWN0aW9uTWFya3VwID0gYDxhIGhyZWY9XCIke3NlY3Rpb25Vcmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+IyR7aXRlbS5zZWN0aW9ufTwvYT5gO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnI291dHB1dF9saXN0JykuYXBwZW5kKFxuICAgICAgICAgIGA8dHI+XG4gICAgICAgICAgIDx0aCBzY29wZT0ncm93Jz4ke2luZGV4ICsgMX08L3RoPlxuICAgICAgICAgICA8dGQ+PGEgaHJlZj1cIiR7aXRlbS51cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtpdGVtLmxhYmVsfTwvYT4gJHtpc1NvdXJjZSA/ICcoJyArICQuaTE4bigndGFyZ2V0JykgKyAnKScgOiAnJ308L3RkPlxuICAgICAgICAgICA8dGQ+JHtzZWN0aW9uTWFya3VwfTwvYT48L3RkPlxuICAgICAgICAgICA8dGQ+PGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9JyR7dGhpcy5nZXRQYWdldmlld3NVUkwoYCR7dGhpcy5wcm9qZWN0fS5vcmdgLCBpdGVtLmxhYmVsKX0nPiR7dGhpcy5mb3JtYXROdW1iZXIoaXRlbS5zdW0pfTwvYT48L3RkPlxuICAgICAgICAgICA8dGQ+JHt0aGlzLmZvcm1hdE51bWJlcihNYXRoLnJvdW5kKGl0ZW0uYXZlcmFnZSkpfSAvICR7JC5pMThuKCdkYXknKX08L3RkPlxuICAgICAgICAgICA8L3RyPmBcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2YWx1ZSBvZiBnaXZlbiBsYW5ndmlldyBlbnRyeSBmb3IgdGhlIHB1cnBvc2VzIG9mIGNvbHVtbiBzb3J0aW5nXG4gICAqIEBwYXJhbSAge29iamVjdH0gaXRlbSAtIGxhbmd2aWV3IGVudHJ5IHdpdGhpbiB0aGlzLm91dHB1dERhdGFcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlIC0gdHlwZSBvZiBwcm9wZXJ0eSB0byBnZXRcbiAgICogQHJldHVybiB7U3RyaW5nfE51bWJlcn0gLSB2YWx1ZVxuICAgKi9cbiAgZ2V0U29ydFByb3BlcnR5KGl0ZW0sIHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd0aXRsZSc6XG4gICAgICByZXR1cm4gaXRlbS5sYWJlbDtcbiAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIHJldHVybiBpdGVtLnNlY3Rpb247XG4gICAgY2FzZSAndmlld3MnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLnN1bSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvb3AgdGhyb3VnaCBnaXZlbiBwYWdlcyBhbmQgcXVlcnkgdGhlIHBhZ2V2aWV3cyBBUEkgZm9yIGVhY2hcbiAgICogICBBbHNvIHVwZGF0ZXMgdGhpcy5vdXRwdXREYXRhIHdpdGggcmVzdWx0XG4gICAqIEBwYXJhbSAge0FycmF5fSByZWRpcmVjdERhdGEgLSBhcyBnaXZlbiBieSB0aGUgZ2V0UmVkaXJlY3RzIHByb21pc2VcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IC0gUHJvbWlzZSByZXNvbHZpbmcgd2l0aCBkYXRhIHJlYWR5IHRvIGJlIHJlbmRlcmVkIHRvIHZpZXdcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEocmVkaXJlY3REYXRhKSB7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgZW5kRGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuc3RhcnRPZignZGF5Jyk7XG5cbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBwcm9taXNlcyA9IFtdLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IHJlZGlyZWN0RGF0YS5sZW5ndGgsIGZhaWxlZFBhZ2VzID0gW10sIHBhZ2VWaWV3c0RhdGEgPSBbXTtcblxuICAgIGNvbnN0IG1ha2VSZXF1ZXN0ID0gcGFnZSA9PiB7XG4gICAgICBjb25zdCB1cmlFbmNvZGVkUGFnZU5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQocGFnZS50aXRsZSk7XG5cbiAgICAgIGNvbnN0IHVybCA9IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3BhZ2V2aWV3cy9wZXItYXJ0aWNsZS8ke3RoaXMucHJvamVjdH1gICtcbiAgICAgICAgYC8keyQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCl9LyR7JCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKX0vJHt1cmlFbmNvZGVkUGFnZU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgICAgY29uc3QgcHJvbWlzZSA9ICQuYWpheCh7IHVybCwgZGF0YVR5cGU6ICdqc29uJyB9KTtcbiAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShwdkRhdGEgPT4ge1xuICAgICAgICBwYWdlVmlld3NEYXRhLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBwYWdlLnRpdGxlLFxuICAgICAgICAgIHNlY3Rpb246IHBhZ2UuZnJhZ21lbnQsXG4gICAgICAgICAgaXRlbXM6IHB2RGF0YS5pdGVtc1xuICAgICAgICB9KTtcbiAgICAgIH0pLmZhaWwoZXJyb3JEYXRhID0+IHtcbiAgICAgICAgLyoqIGZpcnN0IGRldGVjdCBpZiB0aGlzIHdhcyBhIENhc3NhbmRyYSBiYWNrZW5kIGVycm9yLCBhbmQgaWYgc28sIHNjaGVkdWxlIGEgcmUtdHJ5ICovXG4gICAgICAgIGNvbnN0IGNhc3NhbmRyYUVycm9yID0gZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZSA9PT0gJ0Vycm9yIGluIENhc3NhbmRyYSB0YWJsZSBzdG9yYWdlIGJhY2tlbmQnLFxuICAgICAgICAgIGZhaWxlZFBhZ2VMaW5rID0gdGhpcy5nZXRQYWdlTGluayhwYWdlLnRpdGxlLCBgJHt0aGlzLnByb2plY3R9Lm9yZ2ApO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1twYWdlLnRpdGxlXSkge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbcGFnZS50aXRsZV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbcGFnZS50aXRsZV0gPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKiBtYXhpbXVtIG9mIDMgcmV0cmllcyAqL1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1twYWdlLnRpdGxlXSA8IDMpIHtcbiAgICAgICAgICAgIHRvdGFsUmVxdWVzdENvdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXRlTGltaXQobWFrZVJlcXVlc3QsIHRoaXMuY29uZmlnLmFwaVRocm90dGxlLCB0aGlzKShwYWdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiogcmV0cmllcyBleGNlZWRlZCAqL1xuICAgICAgICAgIGZhaWxlZFBhZ2VzLnB1c2goZmFpbGVkUGFnZUxpbmspO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgYCR7ZmFpbGVkUGFnZUxpbmt9OiAkeyQuaTE4bignYXBpLWVycm9yJywgJ1BhZ2V2aWV3cyBBUEknKX0gLSAke2Vycm9yRGF0YS5yZXNwb25zZUpTT04udGl0bGV9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1bmxlc3MgaXQgd2FzIGEgNDA0LCBkb24ndCBjYWNoZSB0aGlzIHNlcmllcyBvZiByZXF1ZXN0c1xuICAgICAgICBpZiAoZXJyb3JEYXRhLnN0YXR1cyAhPT0gNDA0KSBoYWRGYWlsdXJlID0gdHJ1ZTtcbiAgICAgIH0pLmFsd2F5cygoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKytjb3VudCwgdG90YWxSZXF1ZXN0Q291bnQpO1xuXG4gICAgICAgIGlmIChjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICBpZiAoZmFpbGVkUGFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oXG4gICAgICAgICAgICAgICdhcGktZXJyb3ItdGltZW91dCcsXG4gICAgICAgICAgICAgICc8dWw+JyArXG4gICAgICAgICAgICAgIGZhaWxlZFBhZ2VzLm1hcChmYWlsZWRQYWdlID0+IGA8bGk+JHtmYWlsZWRQYWdlfTwvbGk+YCkuam9pbignJykgK1xuICAgICAgICAgICAgICAnPC91bD4nXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZmQucmVzb2x2ZShwYWdlVmlld3NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlcXVlc3RGbiA9IHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcyk7XG5cbiAgICByZWRpcmVjdERhdGEuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHJlcXVlc3RGbihwYWdlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCByZWRpcmVjdHMgb2YgYSBwYWdlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gcGFnZU5hbWUgLSBuYW1lIG9mIHBhZ2Ugd2Ugd2FudCB0byBnZXQgZGF0YSBhYm91dFxuICAgKiBAcmV0dXJuIHtEZWZlcnJlZH0gLSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHJlZGlyZWN0IGRhdGFcbiAgICovXG4gIGdldFJlZGlyZWN0cyhwYWdlTmFtZSkge1xuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICBqc29ucDogJ2NhbGxiYWNrJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBmb3JtYXR2ZXJzaW9uOiAyLFxuICAgICAgICBwcm9wOiAncmVkaXJlY3RzJyxcbiAgICAgICAgcmRwcm9wOiAndGl0bGV8ZnJhZ21lbnQnLFxuICAgICAgICByZGxpbWl0OiA1MDAsXG4gICAgICAgIHRpdGxlczogcGFnZU5hbWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHByb21pc2UuZG9uZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCdpbml0aWFsJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgYCR7JC5pMThuKCdhcGktZXJyb3InLCAnUmVkaXJlY3QgQVBJJyl9OiAke2RhdGEuZXJyb3IuaW5mby5lc2NhcGUoKX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlZGlyZWN0cyA9IFt7XG4gICAgICAgIHRpdGxlOiBwYWdlTmFtZVxuICAgICAgfV0uY29uY2F0KGRhdGEucXVlcnkucGFnZXNbMF0ucmVkaXJlY3RzIHx8IFtdKTtcblxuICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKHJlZGlyZWN0cyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgVVJMIHF1ZXJ5IHN0cmluZyBhbmQgc2V0cyBhbGwgdGhlIGlucHV0cyBhY2NvcmRpbmdseVxuICAgKiBTaG91bGQgb25seSBiZSBjYWxsZWQgb24gaW5pdGlhbCBwYWdlIGxvYWQsIHVudGlsIHdlIGRlY2lkZSB0byBzdXBwb3J0IHBvcCBzdGF0ZXMgKHByb2JhYmx5IG5ldmVyKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcG9wUGFyYW1zKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKFxuICAgICAgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKCdwYWdlcycpXG4gICAgKTtcblxuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwocGFyYW1zLnByb2plY3QpO1xuICAgIHRoaXMudmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKTtcblxuICAgIHRoaXMucGF0Y2hVc2FnZSgpO1xuXG4gICAgLy8gZmlsbCBpbiB2YWx1ZSBmb3IgdGhlIHBhZ2VcbiAgICBpZiAocGFyYW1zLnBhZ2UpIHtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbChkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLnBhZ2UpLmRlc2NvcmUoKSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGludmFsaWQgcGFyYW1zLCByZW1vdmUgcGFnZSBmcm9tIHBhcmFtcyBzbyB3ZSBkb24ndCBwcm9jZXNzIHRoZSBkZWZhdWx0cy5cbiAgICAvLyBGSVhNRTogd2UncmUgY2hlY2tpbmcgZm9yIHNpdGUgbWVzc2FnZXMgYmVjYXVzZSBzdXBlci52YWxpZGF0ZVBhcmFtcyBkb2Vzbid0IHJldHVybiBhIGJvb2xlYW5cbiAgICAvLyAgIG9yIGFueSBpbmRpY2F0aW9uIHRoZSB2YWxpZGF0aW9ucyBmYWlsZWQuIFRoaXMgaXMgaGFja3kgYnV0IG5lY2Vzc2FyeS5cbiAgICBpZiAoJCgnLnNpdGUtbm90aWNlIC5hbGVydC1kYW5nZXInKS5sZW5ndGgpIHtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucGFnZTtcbiAgICB9XG5cbiAgICAkKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbChwYXJhbXMucGxhdGZvcm0pO1xuICAgICQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKHBhcmFtcy5hZ2VudCk7XG5cbiAgICAvKiogZXhwb3J0IG5lY2Vzc2FyeSBwYXJhbXMgdG8gb3V0ZXIgc2NvcGUgKi9cbiAgICBbJ3NvcnQnLCAnZGlyZWN0aW9uJywgJ3ZpZXcnXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dXBTb3VyY2VJbnB1dCgpO1xuXG4gICAgLyoqIHN0YXJ0IHVwIHByb2Nlc3NpbmcgaWYgcGFnZSBuYW1lIGlzIHByZXNlbnQgKi9cbiAgICBpZiAocGFyYW1zLnBhZ2UpIHtcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBzZXQgYSBDU1MgY2xhc3Mgb24gdGhlIGBtYWluYCBub2RlLFxuICAgKiAgIHN0eWxpbmcgdGhlIGRvY3VtZW50IGJhc2VkIG9uIGEgJ3N0YXRlJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RhdGUgLSBjbGFzcyB0byBiZSBhZGRlZDtcbiAgICogICBzaG91bGQgYmUgb25lIG9mIFsnaW5pdGlhbCcsICdwcm9jZXNzaW5nJywgJ2NvbXBsZXRlJ11cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgJCgnbWFpbicpLnJlbW92ZUNsYXNzKHRoaXMuY29uZmlnLmZvcm1TdGF0ZXMuam9pbignICcpKS5hZGRDbGFzcyhzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgY2FzZSAnaW5pdGlhbCc6XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMuYXNzaWduRGVmYXVsdHMoKTtcbiAgICAgIHRoaXMuZGVzdHJveUNoYXJ0KCk7XG4gICAgICAkKCdvdXRwdXQnKS5yZW1vdmVDbGFzcygnbGlzdC1tb2RlJykucmVtb3ZlQ2xhc3MoJ2NoYXJ0LW1vZGUnKTtcbiAgICAgICQoJy5kYXRhLWxpbmtzJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB0aGlzLnR5cGVhaGVhZC5oaWRlKCk7XG4gICAgICAkKHRoaXMuY29uZmlnLnNvdXJjZUlucHV0KS52YWwoJycpLmZvY3VzKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcm9jZXNzaW5nJzpcbiAgICAgIHRoaXMucHJvY2Vzc1N0YXJ0ZWQoKTtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY29tcGxldGUnOlxuICAgICAgdGhpcy5wcm9jZXNzRW5kZWQoKTtcbiAgICAgIC8qKiBzdG9wIGhpZGRlbiBhbmltYXRpb24gZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudCAqL1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigwKTtcbiAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcuZGF0YS1saW5rcycpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ludmFsaWQnOlxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgdGhlIHJlZGlyZWN0dmlld3MgZm9yIHRoZSBhcnRpY2xlIGFuZCBvcHRpb25zIGVudGVyZWRcbiAgICogQ2FsbGVkIHdoZW4gc3VibWl0dGluZyB0aGUgZm9ybVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwcm9jZXNzSW5wdXQoKSB7XG4gICAgY29uc3QgcGFnZSA9ICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbCgpO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSgncHJvY2Vzc2luZycpO1xuXG4gICAgY29uc3QgcmVhZHlGb3JSZW5kZXJpbmcgPSAoKSA9PiB7XG4gICAgICAkKCcub3V0cHV0LXRpdGxlJykuaHRtbCh0aGlzLm91dHB1dERhdGEubGluayk7XG4gICAgICAkKCcub3V0cHV0LXBhcmFtcycpLmh0bWwoJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3RvcikudmFsKCkpO1xuICAgICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKCk7XG4gICAgICB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaXNSZXF1ZXN0Q2FjaGVkKCkpIHtcbiAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2xvYWRpbmctY2FjaGUnKSk7XG4gICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3V0cHV0RGF0YSA9IHNpbXBsZVN0b3JhZ2UuZ2V0KHRoaXMuZ2V0Q2FjaGVLZXkoKSk7XG4gICAgICAgIHJlYWR5Rm9yUmVuZGVyaW5nKCk7XG4gICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2ZldGNoaW5nLWRhdGEnLCAnUmVkaXJlY3RzIEFQSScpKTtcbiAgICB0aGlzLmdldFJlZGlyZWN0cyhwYWdlKS5kb25lKHJlZGlyZWN0RGF0YSA9PiB7XG4gICAgICB0aGlzLmdldFBhZ2VWaWV3c0RhdGEocmVkaXJlY3REYXRhKS5kb25lKHBhZ2VWaWV3c0RhdGEgPT4ge1xuICAgICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2J1aWxkaW5nLWRhdGFzZXQnKSk7XG4gICAgICAgIGNvbnN0IHBhZ2VMaW5rID0gdGhpcy5nZXRQYWdlTGluayhkZWNvZGVVUklDb21wb25lbnQocGFnZSksIHRoaXMucHJvamVjdCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYnVpbGRNb3RoZXJEYXRhc2V0KHBhZ2UsIHBhZ2VMaW5rLCBwYWdlVmlld3NEYXRhKTtcbiAgICAgICAgICByZWFkeUZvclJlbmRlcmluZygpO1xuICAgICAgICB9LCAyNTApO1xuICAgICAgfSk7XG4gICAgfSkuZmFpbChlcnJvciA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKCdpbml0aWFsJyk7XG5cbiAgICAgIC8qKiBzdHJ1Y3R1cmVkIGVycm9yIGNvbWVzIGJhY2sgYXMgYSBzdHJpbmcsIG90aGVyd2lzZSB3ZSBkb24ndCBrbm93IHdoYXQgaGFwcGVuZWQgKi9cbiAgICAgIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bignYXBpLWVycm9yLXVua25vd24nLCAnV2lraWRhdGEnKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgdHlwZWFoZWFkIG9uIHRoZSBhcnRpY2xlIGlucHV0LCBraWxsaW5nIHRoZSBwcmV2b3VzIGluc3RhbmNlIGlmIHByZXNlbnRcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgc2V0dXBTb3VyY2VJbnB1dCgpIHtcbiAgICBpZiAodGhpcy50eXBlYWhlYWQpIHRoaXMudHlwZWFoZWFkLmRlc3Ryb3koKTtcblxuICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnR5cGVhaGVhZCh7XG4gICAgICBhamF4OiB7XG4gICAgICAgIHVybDogYGh0dHBzOi8vJHt0aGlzLnByb2plY3R9Lm9yZy93L2FwaS5waHBgLFxuICAgICAgICB0aW1lb3V0OiAyMDAsXG4gICAgICAgIHRyaWdnZXJMZW5ndGg6IDEsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHByZURpc3BhdGNoOiBxdWVyeSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ29wZW5zZWFyY2gnLFxuICAgICAgICAgICAgcmVkaXJlY3RzOiAncmVzb2x2ZScsXG4gICAgICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgICAgIHNlYXJjaDogcXVlcnlcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBwcmVQcm9jZXNzOiBkYXRhID0+IGRhdGFbMV1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBwYXJlbnQgc2V0dXBQcm9qZWN0SW5wdXQgYW5kIHVwZGF0ZXMgdGhlIHZpZXcgaWYgdmFsaWRhdGlvbnMgcGFzc2VkXG4gICAqICAgcmV2ZXJ0aW5nIHRvIHRoZSBvbGQgdmFsdWUgaWYgdGhlIG5ldyBvbmUgaXMgaW52YWxpZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHZhbGlkYXRlUHJvamVjdCgpIHtcbiAgICBpZiAoc3VwZXIudmFsaWRhdGVQcm9qZWN0KCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcblxuICAgICAgLyoqIGtpbGwgYW5kIHJlLWluaXQgdHlwZWFoZWFkIHRvIHBvaW50IHRvIG5ldyBwcm9qZWN0ICovXG4gICAgICB0aGlzLnNldHVwU291cmNlSW5wdXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGxhbmcgZGF0YSB0byBDU1YgZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogV2l0aCB0aGUgcHJlcGVuZGVkIGRhdGE6dGV4dC9jc3YgdGhpcyBzaG91bGQgY2F1c2UgdGhlIGJyb3dzZXIgdG8gZG93bmxvYWQgdGhlIGRhdGFcbiAgICogQHJldHVybnMge3N0cmluZ30gQ1NWIGNvbnRlbnRcbiAgICovXG4gIGV4cG9ydENTVigpIHtcbiAgICBsZXQgY3N2Q29udGVudCA9IGBkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsVGl0bGUsJHt0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuam9pbignLCcpfVxcbmA7XG5cbiAgICAvLyBBZGQgdGhlIHJvd3MgdG8gdGhlIENTVlxuICAgIHRoaXMub3V0cHV0RGF0YS5saXN0RGF0YS5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgY29uc3QgcGFnZU5hbWUgPSAnXCInICsgcGFnZS5sYWJlbC5kZXNjb3JlKCkucmVwbGFjZSgvXCIvZywgJ1wiXCInKSArICdcIic7XG5cbiAgICAgIGNzdkNvbnRlbnQgKz0gW1xuICAgICAgICBwYWdlTmFtZSxcbiAgICAgIF0uY29uY2F0KHBhZ2UuZGF0YSkuam9pbignLCcpICsgJ1xcbic7XG4gICAgfSk7XG5cbiAgICAvLyBPdXRwdXQgdGhlIENTViBmaWxlIHRvIHRoZSBicm93c2VyXG4gICAgY29uc3QgZW5jb2RlZFVyaSA9IGVuY29kZVVSSShjc3ZDb250ZW50KTtcbiAgICB3aW5kb3cub3BlbihlbmNvZGVkVXJpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSBmaWxlbmFtZSB3aXRob3V0IGFuIGV4dGVuc2lvblxuICAgKi9cbiAgZ2V0RXhwb3J0RmlsZW5hbWUoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXModHJ1ZSk7XG4gICAgcmV0dXJuIGAke3RoaXMub3V0cHV0RGF0YS5zb3VyY2V9LSR7cGFyYW1zLnN0YXJ0LnJlcGxhY2UoLy0vZywgJycpfS0ke3BhcmFtcy5lbmQucmVwbGFjZSgvLS9nLCAnJyl9YDtcbiAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gIC8qKiBhc3N1bWUgaGFzaCBwYXJhbXMgYXJlIHN1cHBvc2VkIHRvIGJlIHF1ZXJ5IHBhcmFtcyAqL1xuICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaGFzaCAmJiAhZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoJyMnLCAnPycpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2gpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvXFwjLiovLCAnJyk7XG4gIH1cblxuICBuZXcgUmVkaXJlY3RWaWV3cygpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpYywgdXNlZCBpbiBhbGwgYXBwcyBleGNlcHQgVG9wdmlld3NcbiAqIEBwYXJhbSB7Y2xhc3N9IHN1cGVyY2xhc3MgLSBiYXNlIGNsYXNzXG4gKiBAcmV0dXJucyB7bnVsbH0gY2xhc3MgZXh0ZW5kaW5nIHN1cGVyY2xhc3NcbiAqL1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgdGhpcy5jaGFydE9iaiA9IG51bGw7XG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gbnVsbDtcbiAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSB0cnVlOyAvLyB3aWxsIGJlY29tZSBmYWxzZSB3aGVuIHRoZXkgbWFudWFsbHkgY2hhbmdlIHRoZSBjaGFydCB0eXBlXG5cbiAgICAvKiogZW5zdXJlIHdlIGhhdmUgYSB2YWxpZCBjaGFydCB0eXBlIGluIGxvY2FsU3RvcmFnZSwgcmVzdWx0IG9mIENoYXJ0LmpzIDEuMCB0byAyLjAgbWlncmF0aW9uICovXG4gICAgY29uc3Qgc3RvcmVkQ2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpO1xuICAgIGlmICghdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkgJiYgIXRoaXMuY29uZmlnLmNpcmN1bGFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkpIHtcbiAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZSgpKTtcbiAgICB9XG5cbiAgICAvLyBsZWF2ZSBpZiB0aGVyZSdzIG5vIGNoYXJ0IGNvbmZpZ3VyZWRcbiAgICBpZiAoIXRoaXMuY29uZmlnLmNoYXJ0KSByZXR1cm47XG5cbiAgICAvKiogQHR5cGUge0Jvb2xlYW59IGFkZCBhYmlsaXR5IHRvIGRpc2FibGUgYXV0by1sb2cgZGV0ZWN0aW9uICovXG4gICAgdGhpcy5ub0xvZ1NjYWxlID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdhdXRvbG9nPWZhbHNlJyk7XG5cbiAgICAvKiogY29weSBvdmVyIGFwcC1zcGVjaWZpYyBjaGFydCB0ZW1wbGF0ZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuZm9yRWFjaChsaW5lYXJDaGFydCA9PiB7XG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1tsaW5lYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmxpbmVhckxlZ2VuZDtcbiAgICB9KTtcbiAgICB0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5mb3JFYWNoKGNpcmN1bGFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbY2lyY3VsYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmNpcmN1bGFyTGVnZW5kO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbihDaGFydC5kZWZhdWx0cy5nbG9iYWwsIHthbmltYXRpb246IGZhbHNlLCByZXNwb25zaXZlOiB0cnVlfSk7XG5cbiAgICAvKiogY2hhbmdpbmcgb2YgY2hhcnQgdHlwZXMgKi9cbiAgICAkKCcubW9kYWwtY2hhcnQtdHlwZSBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSBmYWxzZTtcblxuICAgICAgJCgnLmxvZ2FyaXRobWljLXNjYWxlJykudG9nZ2xlKHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZSh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKTtcblxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY2hhcnRUeXBlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc0NoYXJ0QXBwKCkgPyB0aGlzLnVwZGF0ZUNoYXJ0KHRoaXMucGFnZVZpZXdzRGF0YSkgOiB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvTG9nRGV0ZWN0aW9uID0gJ2ZhbHNlJztcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlZC9lbmFibGUgYmVnaW4gYXQgemVybyBjaGVja2JveCBhY2NvcmRpbmdseSxcbiAgICAgKiBidXQgZG9uJ3QgdXBkYXRlIGNoYXJ0IHNpbmNlIHRoZSBsb2cgc2NhbGUgdmFsdWUgY2FuIGNoYW5nZSBwcmFnbWF0aWNhbGx5IGFuZCBub3QgZnJvbSB1c2VyIGlucHV0XG4gICAgICovXG4gICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCB0aGlzLmNoZWNrZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH1cblxuICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKiogY2hhcnQgZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLXBuZycpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0UE5HLmJpbmQodGhpcykpO1xuICAgICQoJy5wcmludC1jaGFydCcpLm9uKCdjbGljaycsIHRoaXMucHJpbnRDaGFydC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgY2hhcnQgdHlwZSBvciB0aGUgb25lIGZyb20gbG9jYWxTdG9yYWdlLCBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW251bURhdGFzZXRzXSAtIG51bWJlciBvZiBkYXRhc2V0c1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0SW5pdGlhbENoYXJ0VHlwZShudW1EYXRhc2V0cyA9IDEpIHtcbiAgICBpZiAodGhpcy5yZW1lbWJlckNoYXJ0ID09PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5jb25maWcuZGVmYXVsdHMuY2hhcnRUeXBlKG51bURhdGFzZXRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBwcmV2aW91cyBjaGFydCwgaWYgbmVlZGVkLlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZGVzdHJveUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLmNoYXJ0T2JqKSB7XG4gICAgICB0aGlzLmNoYXJ0T2JqLmRlc3Ryb3koKTtcbiAgICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKCcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGNoYXJ0IGRhdGEgdG8gQ1NWIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIFdpdGggdGhlIHByZXBlbmRlZCBkYXRhOnRleHQvY3N2IHRoaXMgc2hvdWxkIGNhdXNlIHRoZSBicm93c2VyIHRvIGRvd25sb2FkIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRDU1YoKSB7XG4gICAgbGV0IGNzdkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LERhdGUsJztcbiAgICBsZXQgdGl0bGVzID0gW107XG4gICAgbGV0IGRhdGFSb3dzID0gW107XG4gICAgbGV0IGRhdGVzID0gdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpO1xuXG4gICAgLy8gQmVnaW4gY29uc3RydWN0aW5nIHRoZSBkYXRhUm93cyBhcnJheSBieSBwb3B1bGF0aW5nIGl0IHdpdGggdGhlIGRhdGVzXG4gICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgIGRhdGFSb3dzW2luZGV4XSA9IFtkYXRlXTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgLy8gQnVpbGQgYW4gYXJyYXkgb2Ygc2l0ZSB0aXRsZXMgZm9yIHVzZSBpbiB0aGUgQ1NWIGhlYWRlclxuICAgICAgbGV0IHNpdGVUaXRsZSA9ICdcIicgKyBzaXRlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInO1xuICAgICAgdGl0bGVzLnB1c2goc2l0ZVRpdGxlKTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGRhdGFSb3dzIGFycmF5IHdpdGggdGhlIGRhdGEgZm9yIHRoaXMgc2l0ZVxuICAgICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgZGF0YVJvd3NbaW5kZXhdLnB1c2goc2l0ZS5kYXRhW2luZGV4XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEZpbmlzaCB0aGUgQ1NWIGhlYWRlclxuICAgIGNzdkNvbnRlbnQgPSBjc3ZDb250ZW50ICsgdGl0bGVzLmpvaW4oJywnKSArICdcXG4nO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICBkYXRhUm93cy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgY3N2Q29udGVudCArPSBkYXRhLmpvaW4oJywnKSArICdcXG4nO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZERhdGEoY3N2Q29udGVudCwgJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIEpTT04gZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGV4cG9ydEpTT04oKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge1xuICAgICAgICBwYWdlOiBwYWdlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcXFwiJykucmVwbGFjZSgvJy9nLCBcIlxcJ1wiKSxcbiAgICAgICAgY29sb3I6IHBhZ2Uuc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN1bTogcGFnZS5zdW0sXG4gICAgICAgIGRhaWx5X2F2ZXJhZ2U6IE1hdGgucm91bmQocGFnZS5zdW0gLyB0aGlzLm51bURheXNJblJhbmdlKCkpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuZm9yRWFjaCgoaGVhZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgZW50cnlbaGVhZGluZy5yZXBsYWNlKC9cXFxcLywnJyldID0gcGFnZS5kYXRhW2luZGV4XTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhLnB1c2goZW50cnkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2pzb247Y2hhcnNldD11dGYtOCwnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgdGhpcy5kb3dubG9hZERhdGEoanNvbkNvbnRlbnQsICdqc29uJyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGRhdGEgYXMgUE5HIGltYWdlLCBvcGVuaW5nIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZXhwb3J0UE5HKCkge1xuICAgIHRoaXMuZG93bmxvYWREYXRhKHRoaXMuY2hhcnRPYmoudG9CYXNlNjRJbWFnZSgpLCAncG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgaW4gemVybyB2YWx1ZSB0byBhIHRpbWVzZXJpZXMsIHNlZTpcbiAgICogaHR0cHM6Ly93aWtpdGVjaC53aWtpbWVkaWEub3JnL3dpa2kvQW5hbHl0aWNzL0FRUy9QYWdldmlld19BUEkjR290Y2hhc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlIG9mIHJhbmdlIHRvIGZpbHRlciB0aHJvdWdoXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGUgb2YgcmFuZ2VcbiAgICogQHJldHVybnMge29iamVjdH0gZGF0YXNldCB3aXRoIHplcm9zIHdoZXJlIG51bGxzIHdoZXJlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhkYXRhLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICAvKiogRXh0cmFjdCB0aGUgZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgdGltZXNlcmllcyAqL1xuICAgIGxldCBhbHJlYWR5VGhlcmUgPSB7fTtcbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBsZXQgZGF0ZSA9IG1vbWVudChlbGVtLnRpbWVzdGFtcCwgdGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KTtcbiAgICAgIGFscmVhZHlUaGVyZVtkYXRlXSA9IGVsZW07XG4gICAgfSk7XG4gICAgZGF0YS5pdGVtcyA9IFtdO1xuXG4gICAgLyoqIFJlY29uc3RydWN0IHdpdGggemVyb3MgaW5zdGVhZCBvZiBudWxscyAqL1xuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQoc3RhcnREYXRlKTsgZGF0ZSA8PSBlbmREYXRlOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAoYWxyZWFkeVRoZXJlW2RhdGVdKSB7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaChhbHJlYWR5VGhlcmVbZGF0ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIFt0aGlzLmlzUGFnZXZpZXdzKCkgPyAndmlld3MnIDogJ2RldmljZXMnXTogZWRnZUNhc2UgPyBudWxsIDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBmb3JtYXR0ZWQgZm9yIENoYXJ0LmpzIGFuZCB0aGUgbGVnZW5kIHRlbXBsYXRlc1xuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhc2V0cyAtIGFzIHJldHJpZXZlZCBieSBnZXRQYWdlVmlld3NEYXRhXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gcmVhZHkgZm9yIGNoYXJ0IHJlbmRlcmluZ1xuICAgKi9cbiAgYnVpbGRDaGFydERhdGEoZGF0YXNldHMpIHtcbiAgICBjb25zdCBsYWJlbHMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkudmFsKCk7XG5cbiAgICAvKiogcHJlc2VydmUgb3JkZXIgb2YgZGF0YXNldHMgZHVlIHRvIGFzeW5jIGNhbGxzICovXG4gICAgcmV0dXJuIGRhdGFzZXRzLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcbiAgICAgIC8qKiBCdWlsZCB0aGUgYXJ0aWNsZSdzIGRhdGFzZXQuICovXG4gICAgICBjb25zdCB2YWx1ZXMgPSBkYXRhc2V0Lm1hcChlbGVtID0+IHRoaXMuaXNQYWdldmlld3MoKSA/IGVsZW0udmlld3MgOiBlbGVtLmRldmljZXMpLFxuICAgICAgICBzdW0gPSB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBNYXRoLnJvdW5kKHN1bSAvIHZhbHVlcy5sZW5ndGgpLFxuICAgICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpLFxuICAgICAgICBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1tpbmRleCAlIDEwXSxcbiAgICAgICAgbGFiZWwgPSBsYWJlbHNbaW5kZXhdLmRlc2NvcmUoKTtcblxuICAgICAgY29uc3QgZW50aXR5SW5mbyA9IHRoaXMuZW50aXR5SW5mbyA/IHRoaXMuZW50aXR5SW5mb1tsYWJlbF0gOiB7fTtcblxuICAgICAgZGF0YXNldCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICB2YWx1ZTogc3VtLCAvLyBkdXBsaWNhdGVkIGJlY2F1c2UgQ2hhcnQuanMgd2FudHMgYSBzaW5nbGUgYHZhbHVlYCBmb3IgY2lyY3VsYXIgY2hhcnRzXG4gICAgICAgIHN1bSxcbiAgICAgICAgYXZlcmFnZSxcbiAgICAgICAgbWF4LFxuICAgICAgICBtaW4sXG4gICAgICAgIGNvbG9yXG4gICAgICB9LCB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0uZGF0YXNldChjb2xvciksIGVudGl0eUluZm8pO1xuXG4gICAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gZGF0YXNldC5kYXRhLm1hcCh2aWV3ID0+IHZpZXcgfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1cmwgdG8gcXVlcnkgdGhlIEFQSSBiYXNlZCBvbiBhcHAgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eSAtIG5hbWUgb2YgZW50aXR5IHdlJ3JlIHF1ZXJ5aW5nIGZvciAocGFnZSBuYW1lIG9yIHByb2plY3QgbmFtZSlcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBVUkxcbiAgICovXG4gIGdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgIGNvbnN0IHVyaUVuY29kZWRFbnRpdHlOYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudGl0eSk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdzaXRldmlld3MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1BhZ2V2aWV3cygpID8gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL2FnZ3JlZ2F0ZS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKSA6IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3VuaXF1ZS1kZXZpY2VzLyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9LyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy9wYWdldmlld3MvcGVyLWFydGljbGUvJHt0aGlzLnByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3RoZXIgZnVuY3Rpb24gZm9yIHF1ZXJ5aW5nIHRoZSBBUEkgYW5kIHByb2Nlc3NpbmcgZGF0YVxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGVudGl0aWVzIC0gbGlzdCBvZiBwYWdlIG5hbWVzLCBvciBwcm9qZWN0cyBmb3IgU2l0ZXZpZXdzXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHBhZ2V2aWV3cyBkYXRhIGFuZCBlcnJvcnMsIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEoZW50aXRpZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IGVudGl0aWVzLmxlbmd0aCwgZmFpbGVkRW50aXRpZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSBldmVyeXRoaW5nIHdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBmb3IgdGhlIHByb21pc2VzICovXG4gICAgbGV0IHhockRhdGEgPSB7XG4gICAgICBlbnRpdGllcyxcbiAgICAgIGxhYmVsczogW10sIC8vIExhYmVscyAoZGF0ZXMpIGZvciB0aGUgeC1heGlzLlxuICAgICAgZGF0YXNldHM6IFtdLCAvLyBEYXRhIGZvciBlYWNoIGFydGljbGUgdGltZXNlcmllc1xuICAgICAgZXJyb3JzOiBbXSwgLy8gUXVldWUgdXAgZXJyb3JzIHRvIHNob3cgYWZ0ZXIgYWxsIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlXG4gICAgICBmYXRhbEVycm9yczogW10sIC8vIFVucmVjb3ZlcmFibGUgSmF2YVNjcmlwdCBlcnJvcnNcbiAgICAgIHByb21pc2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IChlbnRpdHksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICB1cmwgPSB0aGlzLmdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSksXG4gICAgICAgIHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG5cbiAgICAgIHhockRhdGEucHJvbWlzZXMucHVzaChwcm9taXNlKTtcblxuICAgICAgcHJvbWlzZS5kb25lKHN1Y2Nlc3NEYXRhID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdWNjZXNzRGF0YSA9IHRoaXMuZmlsbEluWmVyb3Moc3VjY2Vzc0RhdGEsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgICB4aHJEYXRhLmRhdGFzZXRzLnB1c2goc3VjY2Vzc0RhdGEuaXRlbXMpO1xuXG4gICAgICAgICAgLyoqIGZldGNoIHRoZSBsYWJlbHMgZm9yIHRoZSB4LWF4aXMgb24gc3VjY2VzcyBpZiB3ZSBoYXZlbid0IGFscmVhZHkgKi9cbiAgICAgICAgICBpZiAoc3VjY2Vzc0RhdGEuaXRlbXMgJiYgIXhockRhdGEubGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgeGhyRGF0YS5sYWJlbHMgPSBzdWNjZXNzRGF0YS5pdGVtcy5tYXAoZWxlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiB4aHJEYXRhLmZhdGFsRXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCc7XG5cbiAgICAgICAgaWYgKGNhc3NhbmRyYUVycm9yKSB7XG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0pIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbZW50aXR5XSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqIG1heGltdW0gb2YgMyByZXRyaWVzICovXG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPCAzKSB7XG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RDb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcykoZW50aXR5LCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgYXJ0aWNsZSBmcm9tIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIGFuYWx5emVcbiAgICAgICAgeGhyRGF0YS5lbnRpdGllcyA9IHhockRhdGEuZW50aXRpZXMuZmlsdGVyKGVsID0+IGVsICE9PSBlbnRpdHkpO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGZhaWxlZEVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbGluayA9IHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJyA/IHRoaXMuZ2V0U2l0ZUxpbmsoZW50aXR5KSA6IHRoaXMuZ2V0UGFnZUxpbmsoZW50aXR5LCB0aGlzLnByb2plY3QpO1xuICAgICAgICAgIHhockRhdGEuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICBgJHtsaW5rfTogJHskLmkxOG4oJ2FwaS1lcnJvcicsICdQYWdldmlld3MgQVBJJyl9IC0gJHtlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAoKytjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VWaWV3c0RhdGEgPSB4aHJEYXRhO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHhockRhdGEpO1xuXG4gICAgICAgICAgaWYgKGZhaWxlZEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKFxuICAgICAgICAgICAgICAnYXBpLWVycm9yLXRpbWVvdXQnLFxuICAgICAgICAgICAgICAnPHVsPicgK1xuICAgICAgICAgICAgICBmYWlsZWRFbnRpdGllcy5tYXAoZmFpbGVkRW50aXR5ID0+IGA8bGk+JHt0aGlzLmdldFBhZ2VMaW5rKGZhaWxlZEVudGl0eSwgdGhpcy5wcm9qZWN0LmVzY2FwZSgpKX08L2xpPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICAgJzwvdWw+J1xuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5LCBpbmRleCkgPT4gbWFrZVJlcXVlc3QoZW50aXR5LCBpbmRleCkpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIG5lZWRlZCB0byBjcmVhdGUgYSBwZXJtYW5lbnQgbGluayBvZiB2aXNpYmxlIGRhdGFcbiAgICogQHJldHVybiB7T2JqZWN0fSBoYXNoIG9mIHBhcmFtc1xuICAgKi9cbiAgZ2V0UGVybWFMaW5rKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhmYWxzZSk7XG4gICAgZGVsZXRlIHBhcmFtcy5yYW5nZTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSBjdXJyZW50bHkgaW4gbG9nYXJpdGhtaWMgbW9kZT9cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTG9nYXJpdGhtaWMoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkuaXMoJzpjaGVja2VkJykgJiYgdGhpcy5pc0xvZ2FyaXRobWljQ2FwYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgY2hhcnQgdHlwZSBzdXBwb3J0cyBhIGxvZ2FyaXRobWljIHNjYWxlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBsb2ctZnJpZW5kbHkgb3Igbm90XG4gICAqL1xuICBpc0xvZ2FyaXRobWljQ2FwYWJsZSgpIHtcbiAgICByZXR1cm4gWydsaW5lJywgJ2JhciddLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgdHJ5aW5nIHRvIHNob3cgZGF0YSBvbiBwYWdldmlld3MgKGFzIG9wcG9zZWQgdG8gdW5pcXVlIGRldmljZXMpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc1BhZ2V2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5hcHAgPT09ICdwYWdldmlld3MnIHx8ICQodGhpcy5jb25maWcuZGF0YVNvdXJjZVNlbGVjdG9yKS52YWwoKSA9PT0gJ3BhZ2V2aWV3cyc7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNVbmlxdWVEZXZpY2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1BhZ2V2aWV3cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaW50IHRoZSBjaGFydCFcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHByaW50Q2hhcnQoKSB7XG4gICAgbGV0IHRhYiA9IHdpbmRvdy5vcGVuKCk7XG4gICAgdGFiLmRvY3VtZW50LndyaXRlKFxuICAgICAgYDxpbWcgc3JjPVwiJHt0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKX1cIiAvPmBcbiAgICApO1xuICAgIHRhYi5wcmludCgpO1xuICAgIHRhYi5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hhcnQsIG1lc3NhZ2VzLCBhbmQgcmVzZXRzIHNpdGUgc2VsZWN0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZWxlY3QyXSB3aGV0aGVyIG9yIG5vdCB0byBjbGVhciB0aGUgU2VsZWN0MiBpbnB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRWaWV3KHNlbGVjdDIgPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICAvKiogdGhlc2UgY2FuIGZhaWwgc29tZXRpbWVzICovXG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuICAgICAgaWYgKHNlbGVjdDIpIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvLyBub3RoaW5nXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAkKHRoaXMuY29uZmlnLmNoYXJ0KS5oaWRlKCk7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdCB0byBmaW5lLXR1bmUgdGhlIHBvaW50ZXIgZGV0ZWN0aW9uIHNwYWNpbmcgYmFzZWQgb24gaG93IGNsdXR0ZXJlZCB0aGUgY2hhcnQgaXNcbiAgICogQHJldHVybnMge051bWJlcn0gcmFkaXVzXG4gICAqL1xuICBzZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCkge1xuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSAhPT0gJ2xpbmUnKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gNTApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMzApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSA1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMjApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmhpdFJhZGl1cyA9IDMwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBsb2dhcml0aG1pYyBjaGFydCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQsIGJhc2VkIG9uIFRoZWlsIGluZGV4XG4gICAqIEBwYXJhbSAge0FycmF5fSBkYXRhc2V0cyAtIHBhZ2V2aWV3c1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIHNob3VsZEJlTG9nYXJpdGhtaWMoZGF0YXNldHMpIHtcbiAgICBpZiAoIXRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSB8fCB0aGlzLm5vTG9nU2NhbGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2V0cyA9IFtdO1xuICAgIC8vIGNvbnZlcnQgTmFOcyBhbmQgbnVsbHMgdG8gemVyb3NcbiAgICBkYXRhc2V0cy5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgc2V0cy5wdXNoKGRhdGFzZXQubWFwKHZhbCA9PiB2YWwgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gb3ZlcmFsbCBtYXggdmFsdWVcbiAgICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KC4uLltdLmNvbmNhdCguLi5zZXRzKSk7XG5cbiAgICBpZiAobWF4VmFsdWUgPD0gMTApIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBsb2dhcml0aG1pY05lZWRlZCA9IGZhbHNlO1xuXG4gICAgc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICBzZXQucHVzaChtYXhWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IHN1bSA9IHNldC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSxcbiAgICAgICAgYXZlcmFnZSA9IHN1bSAvIHNldC5sZW5ndGg7XG4gICAgICBsZXQgdGhlaWwgPSAwO1xuICAgICAgc2V0LmZvckVhY2godiA9PiB0aGVpbCArPSB2ID8gdiAqIE1hdGgubG9nKHYgLyBhdmVyYWdlKSA6IDApO1xuXG4gICAgICBpZiAodGhlaWwgLyBzdW0gPiAwLjUpIHtcbiAgICAgICAgcmV0dXJuIGxvZ2FyaXRobWljTmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgc3VwZXIuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHNldHVwIHNpbmNlIHRoZSBsaXN0IHZpZXcgYXBwcyBhbHNvIHVzZSBjaGFydHMgKi9cbiAgICBpZiAoIXRoaXMuaXNDaGFydEFwcCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqIHRoZSBcIkxhdGVzdCBOIGRheXNcIiBsaW5rcyAqL1xuICAgICQoJy5kYXRlLWxhdGVzdCBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZShgbGF0ZXN0LSR7JChlLnRhcmdldCkuZGF0YSgndmFsdWUnKX1gKTtcbiAgICB9KTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgdGhpcy5wcm9jZXNzSW5wdXQoKTtcblxuICAgICAgLyoqIGNsZWFyIG91dCBzcGVjaWFsUmFuZ2UgaWYgaXQgZG9lc24ndCBtYXRjaCBvdXIgaW5wdXQgKi9cbiAgICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiB0aGlzLnNwZWNpYWxSYW5nZS52YWx1ZSAhPT0gZS50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2hhcnQgd2l0aCBkYXRhIHByb3ZpZGVkIGJ5IHByb2Nlc3NJbnB1dCgpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB4aHJEYXRhIC0gZGF0YSBhcyBjb25zdHJ1Y3RlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHVwZGF0ZUNoYXJ0KHhockRhdGEpIHtcbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7IC8vIGNsZWFyIG9sZCBjaGFydCBsZWdlbmRcblxuICAgIC8vIHNob3cgcGVuZGluZyBlcnJvciBtZXNzYWdlcyBpZiBwcmVzZW50LCBleGl0aW5nIGlmIGZhdGFsXG4gICAgaWYgKHRoaXMuc2hvd0Vycm9ycyh4aHJEYXRhKSkgcmV0dXJuO1xuXG4gICAgaWYgKCF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgIH0gZWxzZSBpZiAoeGhyRGF0YS5lbnRpdGllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vdXRwdXREYXRhID0gdGhpcy5idWlsZENoYXJ0RGF0YSh4aHJEYXRhLmRhdGFzZXRzLCB4aHJEYXRhLmVudGl0aWVzKTtcblxuICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgY29uc3Qgc2hvdWxkQmVMb2dhcml0aG1pYyA9IHRoaXMuc2hvdWxkQmVMb2dhcml0aG1pYyh0aGlzLm91dHB1dERhdGEubWFwKHNldCA9PiBzZXQuZGF0YSkpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5wcm9wKCdjaGVja2VkJywgc2hvdWxkQmVMb2dhcml0aG1pYyk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtzY2FsZXM6IHt9fSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5vcHRzLFxuICAgICAgdGhpcy5jb25maWcuZ2xvYmFsQ2hhcnRPcHRzXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzTG9nYXJpdGhtaWMoKSkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnNjYWxlcywge1xuICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICB0eXBlOiAnbG9nYXJpdGhtaWMnLFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbWFpbiA9IHZhbHVlIC8gKE1hdGgucG93KDEwLCBNYXRoLmZsb29yKENoYXJ0LmhlbHBlcnMubG9nMTAodmFsdWUpKSkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZW1haW4gPT09IDEgfHwgcmVtYWluID09PSAyIHx8IHJlbWFpbiA9PT0gNSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICQoJy5jaGFydC1jb250YWluZXInKS5odG1sKCcnKS5hcHBlbmQoXCI8Y2FudmFzIGNsYXNzPSdhcXMtY2hhcnQnPlwiKTtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgY29uc3QgY29udGV4dCA9ICQodGhpcy5jb25maWcuY2hhcnQpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGxpbmVhckRhdGEgPSB7bGFiZWxzOiB4aHJEYXRhLmxhYmVscywgZGF0YXNldHM6IHRoaXMub3V0cHV0RGF0YX07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlID09PSAncmFkYXInKSB7XG4gICAgICAgICAgb3B0aW9ucy5zY2FsZS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzWzBdLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiBsaW5lYXJEYXRhLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBsYWJlbHM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmxhYmVsKSxcbiAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICBkYXRhOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC52YWx1ZSksXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQuYmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmhvdmVyQmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgYXZlcmFnZXM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmF2ZXJhZ2UpXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvcnMoe1xuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICBmYXRhbEVycm9yczogW2Vycl1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKHRoaXMuY2hhcnRPYmouZ2VuZXJhdGVMZWdlbmQoKSk7XG4gICAgJCgnLmRhdGEtbGlua3MnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdwYWdldmlld3MnKSB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBlcnJvcnMgYnVpbHQgaW4gdGhpcy5wcm9jZXNzSW5wdXRcbiAgICogQHBhcmFtIHtvYmplY3R9IHhockRhdGEgLSBhcyBidWlsdCBieSB0aGlzLnByb2Nlc3NJbnB1dCwgbGlrZSBgeyBlcnJvcnM6IFtdLCBmYXRhbEVycm9yczogW10gfWBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGZhdGFsIGVycm9ycyBvY2N1cmVkXG4gICAqL1xuICBzaG93RXJyb3JzKHhockRhdGEpIHtcbiAgICBpZiAoeGhyRGF0YS5mYXRhbEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KHRydWUpO1xuICAgICAgY29uc3QgZmF0YWxFcnJvcnMgPSB4aHJEYXRhLmZhdGFsRXJyb3JzLnVuaXF1ZSgpO1xuICAgICAgdGhpcy5zaG93RmF0YWxFcnJvcnMoZmF0YWxFcnJvcnMpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoeGhyRGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBldmVyeXRoaW5nIGZhaWxlZCwgcmVzZXQgdGhlIHZpZXcsIGNsZWFyaW5nIG91dCBzcGFjZSB0YWtlbiB1cCBieSBlbXB0eSBjaGFydFxuICAgICAgaWYgKHhockRhdGEuZW50aXRpZXMgJiYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCA9PT0geGhyRGF0YS5lbnRpdGllcy5sZW5ndGggfHwgIXhockRhdGEuZW50aXRpZXMubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgfVxuXG4gICAgICB4aHJEYXRhLmVycm9ycy51bmlxdWUoKS5mb3JFYWNoKGVycm9yID0+IHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0SGVscGVycztcbiIsIi8qKlxuICogQGZpbGUgQ29yZSBKYXZhU2NyaXB0IGV4dGVuc2lvbnMsIGVpdGhlciB0byBuYXRpdmUgSlMgb3IgYSBsaWJyYXJ5LlxuICogICBQb2x5ZmlsbHMgaGF2ZSB0aGVpciBvd24gZmlsZSBbcG9seWZpbGxzLmpzXShnbG9iYWwuaHRtbCNwb2x5ZmlsbHMpXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblN0cmluZy5wcm90b3R5cGUuZGVzY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9fL2csICcgJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS5zY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC8gL2csICdfJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS51cGNhc2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnNsaWNlKDEpO1xufTtcblN0cmluZy5wcm90b3R5cGUuZXNjYXBlID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJy8nOiAnJiN4MkY7J1xuICB9O1xuXG4gIHJldHVybiB0aGlzLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIHMgPT4ge1xuICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gIH0pO1xufTtcblxuLy8gcmVtb3ZlIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBBcnJheVxuQXJyYXkucHJvdG90eXBlLnVuaXF1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24odmFsdWUsIGluZGV4LCBhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gIH0pO1xufTtcblxuLy8gSW1wcm92ZSBzeW50YXggdG8gZW11bGF0ZSBtaXhpbnMgaW4gRVM2XG53aW5kb3cubWl4ID0gc3VwZXJjbGFzcyA9PiBuZXcgTWl4aW5CdWlsZGVyKHN1cGVyY2xhc3MpO1xuY2xhc3MgTWl4aW5CdWlsZGVyIHtcbiAgY29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuICAgIHRoaXMuc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3M7XG4gIH1cblxuICB3aXRoKC4uLm1peGlucykge1xuICAgIHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtaXhpbikgPT4gbWl4aW4oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG4gIH1cbn1cblxuLypcbiAqIEhPVCBQQVRDSCBmb3IgQ2hhcnQuanMgZ2V0RWxlbWVudHNBdEV2ZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hhcnRqcy9DaGFydC5qcy9pc3N1ZXMvMjI5OVxuICogVE9ETzogcmVtb3ZlIG1lIHdoZW4gdGhpcyBnZXRzIGltcGxlbWVudGVkIGludG8gQ2hhcnRzLmpzIGNvcmVcbiAqL1xuaWYgKHR5cGVvZiBDaGFydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgQ2hhcnQuQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RWxlbWVudHNBdEV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICAgIGxldCBoZWxwZXJzID0gQ2hhcnQuaGVscGVycztcbiAgICBsZXQgZXZlbnRQb3NpdGlvbiA9IGhlbHBlcnMuZ2V0UmVsYXRpdmVQb3NpdGlvbihlLCB0aGlzLmNoYXJ0KTtcbiAgICBsZXQgZWxlbWVudHNBcnJheSA9IFtdO1xuXG4gICAgbGV0IGZvdW5kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5kYXRhc2V0cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5kYXRhc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YSlbMF07XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtZGVwdGggKi9cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhW2pdLmluTGFiZWxSYW5nZShldmVudFBvc2l0aW9uLngsIGV2ZW50UG9zaXRpb24ueSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YVtrZXldLmRhdGFbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuY2FsbCh0aGlzKTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50c0FycmF5O1xuICAgIH1cblxuICAgIGhlbHBlcnMuZWFjaCh0aGlzLmRhdGEuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQsIGRzSW5kZXgpIHtcbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGRhdGFzZXQuX21ldGEpWzBdO1xuICAgICAgZWxlbWVudHNBcnJheS5wdXNoKGRhdGFzZXQuX21ldGFba2V5XS5kYXRhW2ZvdW5kLl9pbmRleF0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzQXJyYXk7XG4gIH07XG59XG5cbiQud2hlbkFsbCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgIGNvdW50ZXIgPSAwLFxuICAgIHN0YXRlID0gJ3Jlc29sdmVkJyxcbiAgICBwcm9taXNlcyA9IG5ldyBBcnJheSguLi5hcmd1bWVudHMpO1xuXG4gIGNvbnN0IHJlc29sdmVPclJlamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICBzdGF0ZSA9ICdyZWplY3RlZCc7XG4gICAgfVxuICAgIGNvdW50ZXIrKztcblxuICAgIGlmIChjb3VudGVyID09PSBwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGRmZFtzdGF0ZSA9PT0gJ3JlamVjdGVkJyA/ICdyZWplY3QnIDogJ3Jlc29sdmUnXSgpO1xuICAgIH1cblxuICB9O1xuXG4gICQuZWFjaChwcm9taXNlcywgKF9pLCBwcm9taXNlKSA9PiB7XG4gICAgcHJvbWlzZS5hbHdheXMocmVzb2x2ZU9yUmVqZWN0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG59O1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgbGlzdC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBsaXN0LXNwZWNpZmljIGxvZ2ljXG4gKiBAcGFyYW0ge2NsYXNzfSBzdXBlcmNsYXNzIC0gYmFzZSBjbGFzc1xuICogQHJldHVybnMge251bGx9IGNsYXNzIGV4dGVuZGluZyBzdXBlcmNsYXNzXG4gKi9cbmNvbnN0IExpc3RIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgY2hhcnQgb3B0aW9ucyBiZWZvcmUgc2hvd2luZyBjaGFydCB2aWV3LCBiYXNlZCBvbiBjdXJyZW50IGNoYXJ0IHR5cGVcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1swXTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMub3V0cHV0RGF0YS5kYXRhc2V0c1swXSwgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQoY29sb3IpKTtcblxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZmlsbENvbG9yID0gY29sb3IucmVwbGFjZSgvLFxccypcXGRcXCkvLCAnLCAwLjIpJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBsYW5nIGRhdGEgdG8gSlNPTiBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZXhwb3J0SlNPTigpIHtcbiAgICBjb25zdCBqc29uQ29udGVudCA9ICdkYXRhOnRleHQvanNvbjtjaGFyc2V0PXV0Zi04LCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm91dHB1dERhdGEubGlzdERhdGEpO1xuICAgIHRoaXMuZG93bmxvYWREYXRhKGpzb25Db250ZW50LCAnanNvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIHplcm9zIHRvIGEgdGltZXNlcmllcywgc2VlOlxuICAgKiBodHRwczovL3dpa2l0ZWNoLndpa2ltZWRpYS5vcmcvd2lraS9BbmFseXRpY3MvQVFTL1BhZ2V2aWV3X0FQSSNHb3RjaGFzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtcyAtIGVudHJpZXMgZmV0Y2hlZCBmcm9tIFBhZ2V2aWV3cyBBUElcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGUgb2YgcmFuZ2UgdG8gZmlsdGVyIHRocm91Z2hcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZSBvZiByYW5nZVxuICAgKiBAcmV0dXJucyB7YXJyYXl9IDAgPSBkYXRhc2V0IHdpdGggemVyb3Mgd2hlcmUgbnVsbHMgd2VyZSxcbiAgICogICAxID0gZGF0ZXMgdGhhdCBtZXQgdGhlIGVkZ2UgY2FzZSwgbWVhbmluZyBkYXRhIGlzIG5vdCB5ZXQgYXZhaWxhYmxlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhpdGVtcywgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgLyoqIEV4dHJhY3QgdGhlIGRhdGVzIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIHRpbWVzZXJpZXMgKi9cbiAgICBsZXQgYWxyZWFkeVRoZXJlID0ge307XG4gICAgaXRlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIGxldCBkYXRlID0gbW9tZW50KGVsZW0udGltZXN0YW1wLCB0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpO1xuICAgICAgYWxyZWFkeVRoZXJlW2RhdGVdID0gZWxlbTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YSA9IFtdLCBkYXRlc1dpdGhvdXREYXRhID0gW107XG5cbiAgICAvKiogUmVjb25zdHJ1Y3Qgd2l0aCB6ZXJvcyBpbnN0ZWFkIG9mIG51bGxzICovXG4gICAgZm9yIChsZXQgZGF0ZSA9IG1vbWVudChzdGFydERhdGUpOyBkYXRlIDw9IGVuZERhdGU7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChhbHJlYWR5VGhlcmVbZGF0ZV0pIHtcbiAgICAgICAgZGF0YS5wdXNoKGFscmVhZHlUaGVyZVtkYXRlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIHZpZXdzOiBlZGdlQ2FzZSA/IG51bGwgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZWRnZUNhc2UpIGRhdGVzV2l0aG91dERhdGEucHVzaChkYXRlLmZvcm1hdCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2RhdGEsIGRhdGVzV2l0aG91dERhdGFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBjYWNoZSBrZXkgZm9yIGN1cnJlbnQgcGFyYW1zXG4gICAqIEByZXR1cm4ge1N0cmluZ30ga2V5XG4gICAqL1xuICBnZXRDYWNoZUtleSgpIHtcbiAgICByZXR1cm4gYHB2LWNhY2hlLSR7dGhpcy5oYXNoQ29kZShcbiAgICAgIHRoaXMuYXBwICsgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRQYXJhbXModHJ1ZSkpXG4gICAgKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmsgdG8gL3BhZ2V2aWV3cyBmb3IgZ2l2ZW4gYXJ0aWNsZSBhbmQgY2hvc2VuIGRhdGVyYW5nZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIGJhc2UgcHJvamVjdCwgZS5nLiBlbi53aWtpcGVkaWEub3JnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFVSTFxuICAgKi9cbiAgLy8gRklYTUU6IHNob3VsZCBpbmNsdWRlIGFnZW50IGFuZCBwbGF0Zm9ybSwgYW5kIHVzZSBzcGVjaWFsIHJhbmdlcyBhcyBjdXJyZW50bHkgc3BlY2lmaWVkXG4gIGdldFBhZ2V2aWV3c1VSTChwcm9qZWN0LCBwYWdlKSB7XG4gICAgbGV0IHN0YXJ0RGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUpLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlKTtcbiAgICBjb25zdCBwbGF0Zm9ybSA9ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCk7XG5cbiAgICBpZiAoZW5kRGF0ZS5kaWZmKHN0YXJ0RGF0ZSwgJ2RheXMnKSA9PT0gMCkge1xuICAgICAgc3RhcnREYXRlLnN1YnRyYWN0KDMsICdkYXlzJyk7XG4gICAgICBlbmREYXRlLmFkZCgzLCAnZGF5cycpO1xuICAgIH1cblxuICAgIHJldHVybiBgL3BhZ2V2aWV3cz9zdGFydD0ke3N0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX1gICtcbiAgICAgIGAmZW5kPSR7ZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX0mcHJvamVjdD0ke3Byb2plY3R9JnBsYXRmb3JtPSR7cGxhdGZvcm19JnBhZ2VzPSR7cGFnZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwYXJhbXMgbmVlZGVkIHRvIGNyZWF0ZSBhIHBlcm1hbmVudCBsaW5rIG9mIHZpc2libGUgZGF0YVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGhhc2ggb2YgcGFyYW1zXG4gICAqL1xuICBnZXRQZXJtYUxpbmsoKSB7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRydWUpO1xuICAgIHBhcmFtcy5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IGNsYXNzIG5hbWUgb2YgPG91dHB1dD4sIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgZm9ybVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0YXRlLCBvbmUgb2YgdGhpcy5jb25maWcuZm9ybVN0YXRlc1xuICAgKi9cbiAgZ2V0U3RhdGUoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gJCgnbWFpbicpWzBdLmNsYXNzTGlzdDtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZm9ybVN0YXRlcy5maWx0ZXIoc3RhdGVOYW1lID0+IHtcbiAgICAgIHJldHVybiBjbGFzc0xpc3QuY29udGFpbnMoc3RhdGVOYW1lKTtcbiAgICB9KVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBzaW1wbGUgc3RvcmFnZSB0byBzZWUgaWYgYSByZXF1ZXN0IHdpdGggdGhlIGN1cnJlbnQgcGFyYW1zIHdvdWxkIGJlIGNhY2hlZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBjYWNoZWQgb3Igbm90XG4gICAqL1xuICBpc1JlcXVlc3RDYWNoZWQoKSB7XG4gICAgcmV0dXJuIHNpbXBsZVN0b3JhZ2UuaGFzS2V5KHRoaXMuZ2V0Q2FjaGVLZXkoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGxpc3Qgb2Ygb3V0cHV0IGRhdGEgaW50byB2aWV3XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gYmxvY2sgdG8gY2FsbCBiZXR3ZWVuIGluaXRpYWwgc2V0dXAgYW5kIHNob3dpbmcgdGhlIG91dHB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVuZGVyRGF0YShjYikge1xuICAgIGNvbnN0IGFydGljbGVEYXRhc2V0cyA9IHRoaXMub3V0cHV0RGF0YS5saXN0RGF0YTtcblxuICAgIC8qKiBzb3J0IGFzY2VuZGluZyBieSBjdXJyZW50IHNvcnQgc2V0dGluZyAqL1xuICAgIGNvbnN0IHNvcnRlZERhdGFzZXRzID0gYXJ0aWNsZURhdGFzZXRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuZ2V0U29ydFByb3BlcnR5KGEsIHRoaXMuc29ydCksXG4gICAgICAgIGFmdGVyID0gdGhpcy5nZXRTb3J0UHJvcGVydHkoYiwgdGhpcy5zb3J0KTtcblxuICAgICAgaWYgKGJlZm9yZSA8IGFmdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAoYmVmb3JlID4gYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIC10aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnLnNvcnQtbGluayBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCBnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldCcpLmFkZENsYXNzKCdnbHlwaGljb24tc29ydCcpO1xuICAgIGNvbnN0IG5ld1NvcnRDbGFzc05hbWUgPSBwYXJzZUludCh0aGlzLmRpcmVjdGlvbiwgMTApID09PSAxID8gJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCcgOiAnZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQnO1xuICAgICQoYC5zb3J0LWxpbmstLSR7dGhpcy5zb3J0fSBzcGFuYCkuYWRkQ2xhc3MobmV3U29ydENsYXNzTmFtZSkucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0Jyk7XG5cbiAgICB0cnkge1xuICAgICAgY2Ioc29ydGVkRGF0YXNldHMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnY29tcGxldGUnKTtcbiAgICAgIHRoaXMuc2hvd0ZhdGFsRXJyb3JzKFtlcnJdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5wdXNoUGFyYW1zKCk7XG4gICAgfVxuXG4gICAgdGhpcy50b2dnbGVWaWV3KHRoaXMudmlldyk7XG4gICAgLyoqXG4gICAgICogU2V0dGluZyB0aGUgc3RhdGUgdG8gY29tcGxldGUgd2lsbCBjYWxsIHRoaXMucHJvY2Vzc0VuZGVkXG4gICAgICogV2Ugb25seSB3YW50IHRvIHRoaXMgdGhlIGZpcnN0IHRpbWUsIG5vdCBhZnRlciBjaGFuZ2luZyBjaGFydCB0eXBlcywgZXRjLlxuICAgICAqL1xuICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09ICdjb21wbGV0ZScpIHRoaXMuc2V0U3RhdGUoJ2NvbXBsZXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIG9yIHNldCBjaGFydCB2cyBsaXN0IHZpZXcuIEFsbCBvZiB0aGUgbm9ybWFsIGNoYXJ0IGxvZ2ljIGxpdmVzIGhlcmVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2aWV3IC0gd2hpY2ggdmlldyB0byBzZXQsIGVpdGhlciBjaGFydCBvciBsaXN0XG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHRvZ2dsZVZpZXcodmlldykge1xuICAgICQoJy52aWV3LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGAudmlldy1idG4tLSR7dmlld31gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnb3V0cHV0JykucmVtb3ZlQ2xhc3MoJ2xpc3QtbW9kZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NoYXJ0LW1vZGUnKVxuICAgICAgLmFkZENsYXNzKGAke3ZpZXd9LW1vZGVgKTtcblxuICAgIGlmICh2aWV3ID09PSAnY2hhcnQnKSB7XG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuXG4gICAgICAvKiogZG9uJ3QgdXNlIGNpcmN1bGUgY2hhcnRzICovXG4gICAgICBpZiAodGhpcy5jb25maWcuY2lyY3VsYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIHRoaXMuY2hhcnRUeXBlID0gJ2Jhcic7XG4gICAgICB9XG5cbiAgICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLm9wdHMsXG4gICAgICAgIHRoaXMuY29uZmlnLmdsb2JhbENoYXJ0T3B0c1xuICAgICAgKTtcbiAgICAgIHRoaXMuYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpO1xuICAgICAgdGhpcy5zZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCk7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgICBjb25zdCBzaG91bGRCZUxvZ2FyaXRobWljID0gdGhpcy5zaG91bGRCZUxvZ2FyaXRobWljKFt0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZGF0YV0pO1xuICAgICAgICAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLnByb3AoJ2NoZWNrZWQnLCBzaG91bGRCZUxvZ2FyaXRobWljKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNMb2dhcml0aG1pYygpKSB7XG4gICAgICAgIG9wdGlvbnMuc2NhbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5zY2FsZXMsIHtcbiAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgIHR5cGU6ICdsb2dhcml0aG1pYycsXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtYWluID0gdmFsdWUgLyAoTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoQ2hhcnQuaGVscGVycy5sb2cxMCh2YWx1ZSkpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVtYWluID09PSAxIHx8IHJlbWFpbiA9PT0gMiB8fCByZW1haW4gPT09IDUgfHwgaW5kZXggPT09IDAgfHwgaW5kZXggPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ3JhZGFyJykge1xuICAgICAgICBvcHRpb25zLnNjYWxlLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnNjYWxlcy55QXhlc1swXS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZXh0ID0gJCh0aGlzLmNvbmZpZy5jaGFydClbMF0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMuY2hhcnRPYmogPSBuZXcgQ2hhcnQoY29udGV4dCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5vdXRwdXREYXRhLFxuICAgICAgICBvcHRpb25zXG4gICAgICB9KTtcblxuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuc2hvdygpO1xuICAgICAgJCgnI2NoYXJ0LWxlZ2VuZCcpLmh0bWwodGhpcy5jaGFydE9iai5nZW5lcmF0ZUxlZ2VuZCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZSBvZiBwcm9ncmVzcyBiYXJcbiAgICogQHBhcmFtICB7TnVtYmVyfSB2YWx1ZSAtIGN1cnJlbnQgaXRlcmF0aW9uXG4gICAqIEBwYXJhbSAge051bWJlcn0gdG90YWwgLSB0b3RhbCBudW1iZXIgb2YgaXRlcmF0aW9uc1xuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICB1cGRhdGVQcm9ncmVzc0Jhcih2YWx1ZSwgdG90YWwpIHtcbiAgICBpZiAoIXRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsICcwJScpO1xuICAgICAgcmV0dXJuICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgnJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudGFnZSA9ICh2YWx1ZSAvIHRvdGFsKSAqIDEwMDtcbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsIGAke3BlcmNlbnRhZ2UudG9GaXhlZCgyKX0lYCk7XG5cbiAgICBpZiAodmFsdWUgPT09IHRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtY291bnRlcicpLnRleHQoJ0J1aWxkaW5nIGRhdGFzZXQuLi4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KFxuICAgICAgICAkLmkxOG4oJ3Byb2Nlc3NpbmctcGFnZScsIHZhbHVlLCB0b3RhbClcbiAgICAgICk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RIZWxwZXJzO1xuIiwiLyoqXG4gKiBAZmlsZSBQb2x5ZmlsbHMgZm9yIHVzZXJzIHdobyByZWZ1c2UgdG8gdXBncmFkZSB0aGVpciBicm93c2Vyc1xuICogICBNb3N0IGNvZGUgaXMgYWRhcHRlZCBmcm9tIFtNRE5dKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnKVxuICovXG5cbi8vIEFycmF5LmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG4vLyBUaGlzIGlzIG5vdCBhIGZ1bGwgaW1wbGVtZW50YXRpb24sIGp1c3QgYSBzaG9ydGhhbmQgdG8gaW5kZXhPZiAhPT0gLTFcbmlmICggIUFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyApIHtcbiAgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgfTtcbn1cblxuLy8gU3RyaW5nLmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG5pZiAoICFTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzICkge1xuICBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoLCBzdGFydCkge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgIT09ICdudW1iZXInKSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ICsgc2VhcmNoLmxlbmd0aCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoLHN0YXJ0KSAhPT0gLTE7XG4gICAgfVxuICB9O1xufVxuXG4vLyBPYmplY3QuYXNzaWduXG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgKGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgZm9yIChsZXQgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9KSgpO1xufVxuXG4vLyBDaGlsZE5vZGUucmVtb3ZlXG5pZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xuICB9O1xufVxuXG4vLyBTdHJpbmcuc3RhcnRzV2l0aFxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcbiAgICByZXR1cm4gdGhpcy5zdWJzdHIocG9zaXRpb24sIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gIH07XG59XG5cbi8vIEFycmF5Lm9mXG5pZiAoIUFycmF5Lm9mKSB7XG4gIEFycmF5Lm9mID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIEFycmF5LmZpbmRcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmQgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGxldCBsaXN0ID0gT2JqZWN0KHRoaXMpO1xuICAgIGxldCBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgICBsZXQgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICBsZXQgdmFsdWU7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuLy8gQXJyYXkuZmlsbFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsbCkge1xuICBBcnJheS5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICAvLyBTdGVwcyAxLTIuXG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIGxldCBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgLy8gU3RlcHMgMy01LlxuICAgIGxldCBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcblxuICAgIC8vIFN0ZXBzIDYtNy5cbiAgICBsZXQgc3RhcnQgPSBhcmd1bWVudHNbMV07XG4gICAgbGV0IHJlbGF0aXZlU3RhcnQgPSBzdGFydCA+PiAwO1xuXG4gICAgLy8gU3RlcCA4LlxuICAgIGxldCBrID0gcmVsYXRpdmVTdGFydCA8IDAgP1xuICAgICAgTWF0aC5tYXgobGVuICsgcmVsYXRpdmVTdGFydCwgMCkgOlxuICAgICAgTWF0aC5taW4ocmVsYXRpdmVTdGFydCwgbGVuKTtcblxuICAgIC8vIFN0ZXBzIDktMTAuXG4gICAgbGV0IGVuZCA9IGFyZ3VtZW50c1syXTtcbiAgICBsZXQgcmVsYXRpdmVFbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/XG4gICAgICBsZW4gOiBlbmQgPj4gMDtcblxuICAgIC8vIFN0ZXAgMTEuXG4gICAgbGV0IGZpbmFsID0gcmVsYXRpdmVFbmQgPCAwID9cbiAgICAgIE1hdGgubWF4KGxlbiArIHJlbGF0aXZlRW5kLCAwKSA6XG4gICAgICBNYXRoLm1pbihyZWxhdGl2ZUVuZCwgbGVuKTtcblxuICAgIC8vIFN0ZXAgMTIuXG4gICAgd2hpbGUgKGsgPCBmaW5hbCkge1xuICAgICAgT1trXSA9IHZhbHVlO1xuICAgICAgaysrO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTMuXG4gICAgcmV0dXJuIE87XG4gIH07XG59XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjb2RlIGFtb25nc3QgYWxsIGFwcHMgKFBhZ2V2aWV3cywgVG9wdmlld3MsIExhbmd2aWV3cywgU2l0ZXZpZXdzLCBNYXNzdmlld3MsIFJlZGlyZWN0IFZpZXdzKVxuICogQGF1dGhvciBNdXNpa0FuaW1hbCwgS2FsZGFyaVxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiogY2xhc3MtbGVzcyBmaWxlcyB3aXRoIGdsb2JhbCBvdmVycmlkZXMgKi9cbnJlcXVpcmUoJy4vY29yZV9leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscycpO1xuXG5jb25zdCBQdkNvbmZpZyA9IHJlcXVpcmUoJy4vcHZfY29uZmlnJyk7XG5jb25zdCBzaXRlTWFwID0gcmVxdWlyZSgnLi9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5cbi8qKiBQdiBjbGFzcywgY29udGFpbnMgY29kZSBhbW9uZ3N0IGFsbCBhcHBzIChQYWdldmlld3MsIFRvcHZpZXdzLCBMYW5ndmlld3MsIFNpdGV2aWV3cywgTWFzc3ZpZXdzLCBSZWRpcmVjdCBWaWV3cykgKi9cbmNsYXNzIFB2IGV4dGVuZHMgUHZDb25maWcge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgLyoqIGFzc2lnbiBpbml0aWFsIGNsYXNzIHByb3BlcnRpZXMgKi9cbiAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuY29uZmlnLmRlZmF1bHRzLFxuICAgICAgdmFsaWRQYXJhbXMgPSB0aGlzLmNvbmZpZy52YWxpZFBhcmFtcztcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnLCBhcHBDb25maWcpO1xuICAgIHRoaXMuY29uZmlnLmRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGFwcENvbmZpZy5kZWZhdWx0cyk7XG4gICAgdGhpcy5jb25maWcudmFsaWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWxpZFBhcmFtcywgYXBwQ29uZmlnLnZhbGlkUGFyYW1zKTtcblxuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0b3JhZ2UgPSB7fTsgLy8gdXNlZCBhcyBmYWxsYmFjayB3aGVuIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG5cbiAgICBbJ2xvY2FsaXplRGF0ZUZvcm1hdCcsICdudW1lcmljYWxGb3JtYXR0aW5nJywgJ2JlemllckN1cnZlJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvTG9nRGV0ZWN0aW9uJywgJ2JlZ2luQXRaZXJvJywgJ3JlbWVtYmVyQ2hhcnQnXS5mb3JFYWNoKHNldHRpbmcgPT4ge1xuICAgICAgdGhpc1tzZXR0aW5nXSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7c2V0dGluZ31gKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0c1tzZXR0aW5nXTtcbiAgICB9KTtcbiAgICB0aGlzLnNldHVwU2V0dGluZ3NNb2RhbCgpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBudWxsO1xuICAgIHRoaXMuc2l0ZUluZm8gPSB7fTtcblxuICAgIC8qKiBAdHlwZSB7bnVsbHxEYXRlfSB0cmFja2luZyBvZiBlbGFwc2VkIHRpbWUgKi9cbiAgICB0aGlzLnByb2Nlc3NTdGFydCA9IG51bGw7XG5cbiAgICAvKiogYXNzaWduIGFwcCBpbnN0YW5jZSB0byB3aW5kb3cgZm9yIGRlYnVnZ2luZyBvbiBsb2NhbCBlbnZpcm9ubWVudCAqL1xuICAgIGlmIChsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0Jykge1xuICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3BsYXNoKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kZWJ1ZyA9IGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnZGVidWc9dHJ1ZScpIHx8IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnO1xuXG4gICAgLyoqIHNob3cgbm90aWNlIGlmIG9uIHN0YWdpbmcgZW52aXJvbm1lbnQgKi9cbiAgICBpZiAoLy10ZXN0Ly50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSkge1xuICAgICAgY29uc3QgYWN0dWFsUGF0aE5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC8tdGVzdFxcLz8vLCAnJyk7XG4gICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ3dhcm5pbmcnLFxuICAgICAgICBgVGhpcyBpcyBhIHN0YWdpbmcgZW52aXJvbm1lbnQuIEZvciB0aGUgYWN0dWFsICR7ZG9jdW1lbnQudGl0bGV9LFxuICAgICAgICAgc2VlIDxhIGhyZWY9JyR7YWN0dWFsUGF0aE5hbWV9Jz4ke2xvY2F0aW9uLmhvc3RuYW1lfSR7YWN0dWFsUGF0aE5hbWV9PC9hPmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0cmFuc2xhdGlvbnMgdGhlbiBpbml0aWFsaXplIHRoZSBhcHAuXG4gICAgICogRWFjaCBhcHAgaGFzIGl0J3Mgb3duIGluaXRpYWxpemUgbWV0aG9kLlxuICAgICAqIE1ha2Ugc3VyZSB3ZSBsb2FkICdlbi5qc29uJyBhcyBhIGZhbGxiYWNrXG4gICAgICovXG4gICAgbGV0IG1lc3NhZ2VzVG9Mb2FkID0ge1xuICAgICAgW2kxOG5MYW5nXTogYC9wYWdldmlld3MvbWVzc2FnZXMvJHtpMThuTGFuZ30uanNvbmBcbiAgICB9O1xuICAgIGlmIChpMThuTGFuZyAhPT0gJ2VuJykge1xuICAgICAgbWVzc2FnZXNUb0xvYWQuZW4gPSAnL3BhZ2V2aWV3cy9tZXNzYWdlcy9lbi5qc29uJztcbiAgICB9XG4gICAgJC5pMThuKHtcbiAgICAgIGxvY2FsZTogaTE4bkxhbmdcbiAgICB9KS5sb2FkKG1lc3NhZ2VzVG9Mb2FkKS50aGVuKHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBzZXQgdXAgdG9hc3RyIGNvbmZpZy4gVGhlIGR1cmF0aW9uIG1heSBiZSBvdmVycmlkZW4gbGF0ZXIgKi9cbiAgICB0b2FzdHIub3B0aW9ucyA9IHtcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgZGVidWc6IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnLFxuICAgICAgbmV3ZXN0T25Ub3A6IGZhbHNlLFxuICAgICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LXRvcC1jZW50ZXInLFxuICAgICAgcHJldmVudER1cGxpY2F0ZXM6IHRydWUsXG4gICAgICBvbmNsaWNrOiBudWxsLFxuICAgICAgc2hvd0R1cmF0aW9uOiAnMzAwJyxcbiAgICAgIGhpZGVEdXJhdGlvbjogJzEwMDAnLFxuICAgICAgdGltZU91dDogJzUwMDAnLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAnMzAwMCcsXG4gICAgICBzaG93RWFzaW5nOiAnc3dpbmcnLFxuICAgICAgaGlkZUVhc2luZzogJ2xpbmVhcicsXG4gICAgICBzaG93TWV0aG9kOiAnZmFkZUluJyxcbiAgICAgIGhpZGVNZXRob2Q6ICdmYWRlT3V0JyxcbiAgICAgIHRvYXN0Q2xhc3M6ICdhbGVydCcsXG4gICAgICBpY29uQ2xhc3Nlczoge1xuICAgICAgICBlcnJvcjogJ2FsZXJ0LWRhbmdlcicsXG4gICAgICAgIGluZm86ICdhbGVydC1pbmZvJyxcbiAgICAgICAgc3VjY2VzczogJ2FsZXJ0LXN1Y2Nlc3MnLFxuICAgICAgICB3YXJuaW5nOiAnYWxlcnQtd2FybmluZydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpdGUgbm90aWNlIChCb290c3RyYXAgYWxlcnQpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsZXZlbCAtIG9uZSBvZiAnc3VjY2VzcycsICdpbmZvJywgJ3dhcm5pbmcnIG9yICdlcnJvcidcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIHRvIHNob3dcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0aXRsZV0gLSB3aWxsIGFwcGVhciBpbiBib2xkIGFuZCBpbiBmcm9udCBvZiB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkaXNtaXNzYWJsZV0gLSB3aGV0aGVyIG9yIG5vdCB0byBhZGQgYSBYXG4gICAqICAgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gZGlzbWlzcyB0aGUgbm90aWNlXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRTaXRlTm90aWNlKGxldmVsLCBtZXNzYWdlLCB0aXRsZSwgZGlzbWlzc2FibGUpIHtcbiAgICB0aXRsZSA9IHRpdGxlID8gYDxzdHJvbmc+JHt0aXRsZX08L3N0cm9uZz4gYCA6ICcnO1xuXG4gICAgbGV0IG1hcmt1cCA9IHRpdGxlICsgbWVzc2FnZTtcblxuICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgbWFya3VwLFxuICAgICAgbGV2ZWwsXG4gICAgICBkaXNtaXNzYWJsZSA/IDEwMDAwIDogMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNpdGUgbm90aWNlIGZvciBpbnZhbGlkIHBhcmFtZXRlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0gLSBuYW1lIG9mIHBhcmFtZXRlclxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgYWRkSW52YWxpZFBhcmFtTm90aWNlKHBhcmFtKSB7XG4gICAgY29uc3QgZG9jTGluayA9IGA8YSBocmVmPScvJHt0aGlzLmFwcH0vdXJsX3N0cnVjdHVyZSc+JHskLmkxOG4oJ2RvY3VtZW50YXRpb24nKX08L2E+YDtcbiAgICB0aGlzLmFkZFNpdGVOb3RpY2UoXG4gICAgICAnZXJyb3InLFxuICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0zJywgcGFyYW0sIGRvY0xpbmspLFxuICAgICAgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdGhlIGRhdGUgcmFuZ2Ugb2YgZ2l2ZW4gcGFyYW1zXG4gICAqICAgYW5kIHRocm93IGVycm9ycyBhcyBuZWNlc3NhcnkgYW5kL29yIHNldCBkZWZhdWx0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gYXMgcmV0dXJuZWQgYnkgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKClcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlcmUgd2VyZSBubyBlcnJvcnMsIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgdmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5yYW5nZSkge1xuICAgICAgaWYgKCF0aGlzLnNldFNwZWNpYWxSYW5nZShwYXJhbXMucmFuZ2UpKSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdyYW5nZScpO1xuICAgICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZSh0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlUmFuZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1zLnN0YXJ0KSB7XG4gICAgICBjb25zdCBkYXRlUmVnZXggPSAvXFxkezR9LVxcZHsyfS1cXGR7Mn0kLztcblxuICAgICAgLy8gZmlyc3Qgc2V0IGRlZmF1bHRzXG4gICAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgICAvLyB0aGVuIGNoZWNrIGZvcm1hdCBvZiBzdGFydCBhbmQgZW5kIGRhdGVcbiAgICAgIGlmIChwYXJhbXMuc3RhcnQgJiYgZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLnN0YXJ0KSkge1xuICAgICAgICBzdGFydERhdGUgPSBtb21lbnQocGFyYW1zLnN0YXJ0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdzdGFydCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmVuZCAmJiBkYXRlUmVnZXgudGVzdChwYXJhbXMuZW5kKSkge1xuICAgICAgICBlbmREYXRlID0gbW9tZW50KHBhcmFtcy5lbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ2VuZCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXkgYXJlIG91dHNpZGUgdGhlIHZhbGlkIHJhbmdlIG9yIGlmIGluIHRoZSB3cm9uZyBvcmRlclxuICAgICAgaWYgKHN0YXJ0RGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUgfHwgZW5kRGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsXG4gICAgICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0xJywgbW9tZW50KHRoaXMuY29uZmlnLm1pbkRhdGUpLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKSxcbiAgICAgICAgICAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsICQuaTE4bigncGFyYW0tZXJyb3ItMicpLCAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksIHRydWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qKiBkaXJlY3RseSBhc3NpZ24gc3RhcnREYXRlIGJlZm9yZSBjYWxsaW5nIHNldEVuZERhdGUgc28gZXZlbnRzIHdpbGwgYmUgZmlyZWQgb25jZSAqL1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc2V0RW5kRGF0ZShlbmREYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UodGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZVJhbmdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyU2l0ZU5vdGljZXMoKSB7XG4gICAgJCgnLnNpdGUtbm90aWNlJykuaHRtbCgnJyk7XG4gIH1cblxuICBjbGVhck1lc3NhZ2VzKCkge1xuICAgICQoJy5tZXNzYWdlLWNvbnRhaW5lcicpLmh0bWwoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRlIGZvcm1hdCB0byB1c2UgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHJldHVybnMge3N0cmluZ30gZGF0ZSBmb3JtYXQgdG8gcGFzc2VkIHRvIHBhcnNlclxuICAgKi9cbiAgZ2V0IGRhdGVGb3JtYXQoKSB7XG4gICAgaWYgKHRoaXMubG9jYWxpemVEYXRlRm9ybWF0ID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvY2FsZURhdGVTdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0ZXJhbmdlcGlja2VyIGluc3RhbmNlLiBQbGFpbiBhbmQgc2ltcGxlLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGRhdGVyYW5nZSBwaWNrZXJcbiAgICovXG4gIGdldCBkYXRlcmFuZ2VwaWNrZXIoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YWJhc2UgbmFtZSBvZiB0aGUgZ2l2ZW4gcHJvamV0XG4gICAqIEBwYXJhbSAge1N0cmluZ30gcHJvamVjdCAtIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZGF0YWJhc2UgbmFtZVxuICAgKi9cbiAgZGJOYW1lKHByb2plY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc2l0ZU1hcCkuZmluZChrZXkgPT4gc2l0ZU1hcFtrZXldID09PSBgJHtwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCcnKX0ub3JnYCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgZG93bmxvYWQgb2YgZ2l2ZW4gZGF0YSwgb3Igb3BlbiBpbiBhIG5ldyB0YWIgaWYgSFRNTDUgPGE+IGRvd25sb2FkIGF0dHJpYnV0ZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIC0gUmF3IGRhdGEgcHJlcGVuZGVkIHdpdGggZGF0YSB0eXBlLCBlLmcuIFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LG15IGRhdGEuLi5cIlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXh0ZW5zaW9uIC0gdGhlIGZpbGUgZXh0ZW5zaW9uIHRvIHVzZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZG93bmxvYWREYXRhKGRhdGEsIGV4dGVuc2lvbikge1xuICAgIGNvbnN0IGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoZGF0YSk7XG5cbiAgICAvLyBjcmVhdGUgSFRNTDUgZG93bmxvYWQgZWxlbWVudCBhbmQgZm9yY2UgY2xpY2sgc28gd2UgY2FuIHNwZWNpZnkgYSBmaWxlbmFtZVxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaWYgKHR5cGVvZiBsaW5rLmRvd25sb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTsgLy8gRmlyZWZveCByZXF1aXJlcyB0aGUgbGluayB0byBiZSBpbiB0aGUgYm9keVxuXG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAke3RoaXMuZ2V0RXhwb3J0RmlsZW5hbWUoKX0uJHtleHRlbnNpb259YDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICAgIGxpbmsuaHJlZiA9IGVuY29kZWRVcmk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7IC8vIHJlbW92ZSB0aGUgbGluayB3aGVuIGRvbmVcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7IC8vIG9wZW4gaW4gbmV3IHRhYiBpZiBkb3dubG9hZCBpc24ndCBzdXBwb3J0ZWQgKCpjb3VnaCogU2FmYXJpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaWxsIGluIHZhbHVlcyB3aXRoaW4gc2V0dGluZ3MgbW9kYWwgd2l0aCB3aGF0J3MgaW4gdGhlIHNlc3Npb24gb2JqZWN0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBmaWxsSW5TZXR0aW5ncygpIHtcbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0aGlzW2VsLm5hbWVdID09PSAndHJ1ZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gdGhpc1tlbC5uYW1lXSA9PT0gZWwudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGZvY3VzIHRvIFNlbGVjdDIgaW5wdXQgZmllbGRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGZvY3VzU2VsZWN0MigpIHtcbiAgICAkKCcuc2VsZWN0Mi1zZWxlY3Rpb24nKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICQoJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBudW1iZXIgYmFzZWQgb24gY3VycmVudCBzZXR0aW5ncywgZS5nLiBsb2NhbGl6ZSB3aXRoIGNvbW1hIGRlbGltZXRlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBudW0gLSBudW1iZXIgdG8gZm9ybWF0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGZvcm1hdHRlZCBudW1iZXJcbiAgICovXG4gIGZvcm1hdE51bWJlcihudW0pIHtcbiAgICBjb25zdCBudW1lcmljYWxGb3JtYXR0aW5nID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3Mtc2V0dGluZ3MtbnVtZXJpY2FsRm9ybWF0dGluZycpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLm51bWVyaWNhbEZvcm1hdHRpbmc7XG4gICAgaWYgKG51bWVyaWNhbEZvcm1hdHRpbmcgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRoaXMubihudW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFlBeGlzTnVtYmVyKG51bSkge1xuICAgIGlmIChudW0gJSAxID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIobnVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRhdGUgaGVhZGluZ3MgYXMgc3RyaW5ncyAtIGkxOG4gY29tcGxpYW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9jYWxpemVkIC0gd2hldGhlciB0aGUgZGF0ZXMgc2hvdWxkIGJlIGxvY2FsaXplZCBwZXIgYnJvd3NlciBsYW5ndWFnZVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IHRoZSBkYXRlIGhlYWRpbmdzIGFzIHN0cmluZ3NcbiAgICovXG4gIGdldERhdGVIZWFkaW5ncyhsb2NhbGl6ZWQpIHtcbiAgICBjb25zdCBkYXRlSGVhZGluZ3MgPSBbXSxcbiAgICAgIGVuZERhdGUgPSBtb21lbnQodGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZSkuYWRkKDEsICdkJyk7XG5cbiAgICBmb3IgKGxldCBkYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSk7IGRhdGUuaXNCZWZvcmUoZW5kRGF0ZSk7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChsb2NhbGl6ZWQpIHtcbiAgICAgICAgZGF0ZUhlYWRpbmdzLnB1c2goZGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlSGVhZGluZ3MucHVzaChkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGVIZWFkaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cGxhbmRlZCB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqIFRoaXMgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiBnZXRQYWdlVVJMIHdoZW4geW91IHdhbnQgdG8gY2hhaW4gcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2UgbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBwYWdlXG4gICAqL1xuICBnZXRFeHBhbmRlZFBhZ2VVUkwocGFnZSkge1xuICAgIHJldHVybiBgLy8ke3RoaXMucHJvamVjdH0ub3JnL3cvaW5kZXgucGhwP3RpdGxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhZ2Uuc2NvcmUoKSkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSBmaWxlbmFtZSB3aXRob3V0IGFuIGV4dGVuc2lvblxuICAgKi9cbiAgZ2V0RXhwb3J0RmlsZW5hbWUoKSB7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKSxcbiAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKTtcbiAgICByZXR1cm4gYCR7dGhpcy5hcHB9LSR7c3RhcnREYXRlfS0ke2VuZERhdGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBmdWxsIGxpbmsgZm9yIHRoZSBnaXZlbiBwYWdlIGFuZCBwcm9qZWN0XG4gICAqIEBwYXJhbSAge3N0cmluZ30gcGFnZSAtIHBhZ2UgdG8gbGluayB0b1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtwcm9qZWN0XSAtIHByb2plY3QgbGluaywgZGVmYXVsdHMgdG8gYHRoaXMucHJvamVjdGBcbiAgICogQHJldHVybiB7c3RyaW5nfSBIVE1MIG1hcmt1cFxuICAgKi9cbiAgZ2V0UGFnZUxpbmsocGFnZSwgcHJvamVjdCkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7dGhpcy5nZXRQYWdlVVJMKHBhZ2UsIHByb2plY3QpfVwiPiR7cGFnZS5kZXNjb3JlKCkuZXNjYXBlKCl9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHBhZ2VcbiAgICovXG4gIGdldFBhZ2VVUkwocGFnZSwgcHJvamVjdCA9IHRoaXMucHJvamVjdCkge1xuICAgIHJldHVybiBgLy8ke3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKS5lc2NhcGUoKX0ub3JnL3dpa2kvJHtwYWdlLnNjb3JlKCkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpdGUgLSBzaXRlIG5hbWUgKGUuZy4gZW4ud2lraXBlZGlhLm9yZylcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgc2l0ZVxuICAgKi9cbiAgZ2V0U2l0ZUxpbmsoc2l0ZSkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIi8vJHtzaXRlfS5vcmdcIj4ke3NpdGV9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcm9qZWN0IG5hbWUgKHdpdGhvdXQgdGhlIC5vcmcpXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBsYW5nLnByb2plY3RuYW1lXG4gICAqL1xuICBnZXQgcHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpO1xuICAgIC8qKiBHZXQgdGhlIGZpcnN0IDIgY2hhcmFjdGVycyBmcm9tIHRoZSBwcm9qZWN0IGNvZGUgdG8gZ2V0IHRoZSBsYW5ndWFnZSAqL1xuICAgIHJldHVybiBwcm9qZWN0ID8gcHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy5vcmckLywgJycpIDogbnVsbDtcbiAgfVxuXG4gIGdldExvY2FsZURhdGVTdHJpbmcoKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3IubGFuZ3VhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1hdHMgPSB7XG4gICAgICAnYXItc2EnOiAnREQvTU0vWVknLFxuICAgICAgJ2JnLWJnJzogJ0RELk0uWVlZWScsXG4gICAgICAnY2EtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtdHcnOiAnWVlZWS9NL0QnLFxuICAgICAgJ2NzLWN6JzogJ0QuTS5ZWVlZJyxcbiAgICAgICdkYS1kayc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdkZS1kZSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbC1ncic6ICdEL00vWVlZWScsXG4gICAgICAnZW4tdXMnOiAnTS9EL1lZWVknLFxuICAgICAgJ2ZpLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdmci1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoZS1pbCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdodS1odSc6ICdZWVlZLiBNTS4gREQuJyxcbiAgICAgICdpcy1pcyc6ICdELk0uWVlZWScsXG4gICAgICAnaXQtaXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnamEtanAnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAna28ta3InOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnbmwtbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25iLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3BsLXBsJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3B0LWJyJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdyby1ybyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdydS1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdoci1ocic6ICdELk0uWVlZWScsXG4gICAgICAnc2stc2snOiAnRC4gTS4gWVlZWScsXG4gICAgICAnc3EtYWwnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3Ytc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAndGgtdGgnOiAnRC9NL1lZWVknLFxuICAgICAgJ3RyLXRyJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3VyLXBrJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2lkLWlkJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3VrLXVhJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2JlLWJ5JzogJ0RELk1NLllZWVknLFxuICAgICAgJ3NsLXNpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdldC1lZSc6ICdELk1NLllZWVknLFxuICAgICAgJ2x2LWx2JzogJ1lZWVkuTU0uREQuJyxcbiAgICAgICdsdC1sdCc6ICdZWVlZLk1NLkREJyxcbiAgICAgICdmYS1pcic6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICd2aS12bic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoeS1hbSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhei1sYXRuLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2V1LWVzJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ21rLW1rJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FmLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2thLWdlJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2ZvLWZvJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2hpLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21zLW15JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2trLWt6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2t5LWtnJzogJ0RELk1NLllZJyxcbiAgICAgICdzdy1rZSc6ICdNL2QvWVlZWScsXG4gICAgICAndXotbGF0bi11eic6ICdERC9NTSBZWVlZJyxcbiAgICAgICd0dC1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwYS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZ3UtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ3RhLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3RlLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdrbi1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnbXItaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc2EtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbW4tbW4nOiAnWVkuTU0uREQnLFxuICAgICAgJ2dsLWVzJzogJ0REL01NL1lZJyxcbiAgICAgICdrb2staW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc3lyLXN5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2R2LW12JzogJ0REL01NL1lZJyxcbiAgICAgICdhci1pcSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZGUtY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtbXgnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItYmUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdpdC1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdubC1iZSc6ICdEL01NL1lZWVknLFxuICAgICAgJ25uLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3B0LXB0JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3NyLWxhdG4tY3MnOiAnRC5NLllZWVknLFxuICAgICAgJ3N2LWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhei1jeXJsLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ21zLWJuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3V6LWN5cmwtdXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXItZWcnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtaGsnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWF0JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWF1JzogJ0QvTU0vWVlZWScsXG4gICAgICAnZXMtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItY2EnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3ItY3lybC1jcyc6ICdELk0uWVlZWScsXG4gICAgICAnYXItbHknOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWx1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWNhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FyLWR6JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3poLW1vJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1saSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1ueic6ICdEL01NL1lZWVknLFxuICAgICAgJ2VzLWNyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWx1JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW1hJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLWllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXBhJzogJ01NL0REL1lZWVknLFxuICAgICAgJ2ZyLW1jJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXRuJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2VzLWRvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW9tJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLWptJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXZlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLTAyOSc6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICdlcy1jbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1zeSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1ieic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1qbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi10dCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1hcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1sYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi16dyc6ICdNL0QvWVlZWScsXG4gICAgICAnZXMtZWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXIta3cnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tcGgnOiAnTS9EL1lZWVknLFxuICAgICAgJ2VzLWNsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2FyLWFlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXV5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWJoJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXB5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXFhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWJvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXN2JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWhuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLW5pJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXByJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FtLWV0JzogJ0QvTS9ZWVlZJyxcbiAgICAgICd0em0tbGF0bi1keic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpdS1sYXRuLWNhJzogJ0QvTU0vWVlZWScsXG4gICAgICAnc21hLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ21uLW1vbmctY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2dkLWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLW15JzogJ0QvTS9ZWVlZJyxcbiAgICAgICdwcnMtYWYnOiAnREQvTU0vWVknLFxuICAgICAgJ2JuLWJkJzogJ0RELU1NLVlZJyxcbiAgICAgICd3by1zbic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdydy1ydyc6ICdNL0QvWVlZWScsXG4gICAgICAncXV0LWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NhaC1ydSc6ICdNTS5ERC5ZWVlZJyxcbiAgICAgICdnc3ctZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnY28tZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnb2MtZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnbWktbnonOiAnREQvTU0vWVlZWScsXG4gICAgICAnZ2EtaWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc2Utc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnYnItZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21uLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdtb2gtY2EnOiAnTS9EL1lZWVknLFxuICAgICAgJ2Fybi1jbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpaS1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZHNiLWRlJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ2lnLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdrbC1nbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdsYi1sdSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiYS1ydSc6ICdERC5NTS5ZWScsXG4gICAgICAnbnNvLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3F1ei1ibyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd5by1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnaGEtbGF0bi1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnZmlsLXBoJzogJ00vRC9ZWVlZJyxcbiAgICAgICdwcy1hZic6ICdERC9NTS9ZWScsXG4gICAgICAnZnktbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25lLW5wJzogJ00vRC9ZWVlZJyxcbiAgICAgICdzZS1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdpdS1jYW5zLWNhJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdzci1sYXRuLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzaS1sayc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzci1jeXJsLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdsby1sYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdrbS1raCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdjeS1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiby1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnc21zLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhcy1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtbC1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZW4taW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnb3ItaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2JuLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICd0ay10bSc6ICdERC5NTS5ZWScsXG4gICAgICAnYnMtbGF0bi1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnbXQtbXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc3ItY3lybC1tZSc6ICdELk0uWVlZWScsXG4gICAgICAnc2UtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ3p1LXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3hoLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3RuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2hzYi1kZSc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdicy1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICd0Zy1jeXJsLXRqJzogJ0RELk1NLnl5JyxcbiAgICAgICdzci1sYXRuLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWotbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncm0tY2gnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21qLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3F1ei1lYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdxdXotcGUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHItYmEnOiAnRC5NLllZWVkuJyxcbiAgICAgICdzci1sYXRuLW1lJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWEtc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnZW4tc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ3VnLWNuJzogJ1lZWVktTS1EJyxcbiAgICAgICdzci1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdlcy11cyc6ICdNL0QvWVlZWSdcbiAgICB9O1xuXG4gICAgY29uc3Qga2V5ID0gbmF2aWdhdG9yLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGZvcm1hdHNba2V5XSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbHVlIGZyb20gbG9jYWxTdG9yYWdlLCB1c2luZyBhIHRlbXBvcmFyeSBzdG9yYWdlIGlmIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgZm9yIHRoZSB2YWx1ZSB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IHN0b3JlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0RnJvbUxvY2FsU3RvcmFnZShrZXkpIHtcbiAgICAvLyBTZWUgaWYgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBhbmQgZW5hYmxlZFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlW2tleV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBVUkwgdG8gZmlsZSBhIHJlcG9ydCBvbiBNZXRhLCBwcmVsb2FkZWQgd2l0aCBwZXJtYWxpbmtcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwaGFiUGFzdGVdIFVSTCB0byBhdXRvLWdlbmVyYXRlZCBlcnJvciByZXBvcnQgb24gUGhhYnJpY2F0b3JcbiAgICogQHJldHVybiB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldEJ1Z1JlcG9ydFVSTChwaGFiUGFzdGUpIHtcbiAgICBjb25zdCByZXBvcnRVUkwgPSAnaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmcvdy9pbmRleC5waHA/dGl0bGU9VGFsazpQYWdldmlld3NfQW5hbHlzaXMmYWN0aW9uPWVkaXQnICtcbiAgICAgIGAmc2VjdGlvbj1uZXcmcHJlbG9hZHRpdGxlPSR7dGhpcy5hcHAudXBjYXNlKCl9IGJ1ZyByZXBvcnRgO1xuXG4gICAgaWYgKHBoYWJQYXN0ZSkge1xuICAgICAgcmV0dXJuIGAke3JlcG9ydFVSTH0mcHJlbG9hZD1UYWxrOlBhZ2V2aWV3c19BbmFseXNpcy9QcmVsb2FkJnByZWxvYWRwYXJhbXNbXT0ke3BoYWJQYXN0ZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVwb3J0VVJMO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZ2VuZXJhbCBpbmZvcm1hdGlvbiBhYm91dCBhIHByb2plY3QsIHN1Y2ggYXMgbmFtZXNwYWNlcywgdGl0bGUgb2YgdGhlIG1haW4gcGFnZSwgZXRjLlxuICAgKiBEYXRhIHJldHVybmVkIGJ5IHRoZSBhcGkgaXMgYWxzbyBzdG9yZWQgaW4gdGhpcy5zaXRlSW5mb1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3Qgc3VjaCBhcyBlbi53aWtpcGVkaWEgKHdpdGggb3Igd2l0aG91dCAub3JnKVxuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggc2l0ZWluZm8sXG4gICAqICAgYWxvbmcgd2l0aCBhbnkgb3RoZXIgY2FjaGVkIHNpdGVpbmZvIGZvciBvdGhlciBwcm9qZWN0c1xuICAgKi9cbiAgZmV0Y2hTaXRlSW5mbyhwcm9qZWN0KSB7XG4gICAgcHJvamVjdCA9IHByb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKTtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCksXG4gICAgICBjYWNoZUtleSA9IGBwYWdldmlld3Mtc2l0ZWluZm8tJHtwcm9qZWN0fWA7XG5cbiAgICBpZiAodGhpcy5zaXRlSW5mb1twcm9qZWN0XSkgcmV0dXJuIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuXG4gICAgLy8gdXNlIGNhY2hlZCBzaXRlIGluZm8gaWYgcHJlc2VudFxuICAgIGlmIChzaW1wbGVTdG9yYWdlLmhhc0tleShjYWNoZUtleSkpIHtcbiAgICAgIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0gPSBzaW1wbGVTdG9yYWdlLmdldChjYWNoZUtleSk7XG4gICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb3RoZXJ3aXNlIGZldGNoIHNpdGVpbmZvIGFuZCBzdG9yZSBpbiBjYWNoZVxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9Lm9yZy93L2FwaS5waHBgLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICAgIG1ldGE6ICdzaXRlaW5mbycsXG4gICAgICAgICAgc2lwcm9wOiAnZ2VuZXJhbHxuYW1lc3BhY2VzJyxcbiAgICAgICAgICBmb3JtYXQ6ICdqc29uJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSA9IGRhdGEucXVlcnk7XG5cbiAgICAgICAgLy8gY2FjaGUgZm9yIG9uZSB3ZWVrIChUVEwgaXMgaW4gbWlsbGlzZWNvbmRzKVxuICAgICAgICBzaW1wbGVTdG9yYWdlLnNldChjYWNoZUtleSwgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSwge1RUTDogMTAwMCAqIDYwICogNjAgKiAyNCAqIDd9KTtcblxuICAgICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIGRmZC5yZWplY3QoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBnZXQgc2l0ZWluZm8gZnJvbSB0aGlzLnNpdGVJbmZvIGZvciBnaXZlbiBwcm9qZWN0LCB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgbmFtZSwgd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IHNpdGUgaW5mb3JtYXRpb24gaWYgcHJlc2VudFxuICAgKi9cbiAgZ2V0U2l0ZUluZm8ocHJvamVjdCkge1xuICAgIHJldHVybiB0aGlzLnNpdGVJbmZvW3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHVzZXIgYWdlbnQsIGlmIHN1cHBvcnRlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB1c2VyLWFnZW50XG4gICAqL1xuICBnZXRVc2VyQWdlbnQoKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJ1Vua25vd24nO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHZhbHVlIHRvIGxvY2FsU3RvcmFnZSwgdXNpbmcgYSB0ZW1wb3Jhcnkgc3RvcmFnZSBpZiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0ga2V5IGZvciB0aGUgdmFsdWUgdG8gc2V0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gdmFsdWUgdG8gc3RvcmVcbiAgICogQHJldHVybnMge01peGVkfSBzdG9yZWQgdmFsdWVcbiAgICovXG4gIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XG4gICAgLy8gU2VlIGlmIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgYW5kIGVuYWJsZWRcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHVuaXF1ZSBoYXNoIGNvZGUgZnJvbSBnaXZlbiBzdHJpbmdcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzdHIgLSB0byBiZSBoYXNoZWRcbiAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgaGFzaFxuICAgKi9cbiAgaGFzaENvZGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykucmVkdWNlKChwcmV2SGFzaCwgY3VyclZhbCkgPT5cbiAgICAgICgocHJldkhhc2ggPDwgNSkgLSBwcmV2SGFzaCkgKyBjdXJyVmFsLmNoYXJDb2RlQXQoMCksIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBjaGFydC12aWV3IGFwcHMgKHRoYXQgZG9lcyBub3QgaGF2ZSBhIGxpc3Qgdmlldyk/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzQ2hhcnRBcHAoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzTGlzdEFwcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBsaXN0LXZpZXcgYXBwcz9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNMaXN0QXBwKCkge1xuICAgIHJldHVybiBbJ2xhbmd2aWV3cycsICdtYXNzdmlld3MnLCAncmVkaXJlY3R2aWV3cyddLmluY2x1ZGVzKHRoaXMuYXBwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIHRoZSBjdXJyZW50IHByb2plY3QgaXMgYSBtdWx0aWxpbmd1YWwgcHJvamVjdFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gaXMgbXVsdGlsaW5ndWFsIG9yIG5vdFxuICAgKi9cbiAgaXNNdWx0aWxhbmdQcm9qZWN0KCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGAuKj9cXFxcLigke1B2Lm11bHRpbGFuZ1Byb2plY3RzLmpvaW4oJ3wnKX0pYCkudGVzdCh0aGlzLnByb2plY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBub3JtYWxpemVkIHBhZ2VzIGZyb20gQVBJIGludG8gYSBzdHJpbmcgb2YgcGFnZSBuYW1lc1xuICAgKiBVc2VkIGluIG5vcm1hbGl6ZVBhZ2VOYW1lcygpXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcGFyYW0ge2FycmF5fSBub3JtYWxpemVkUGFnZXMgLSBhcnJheSBvZiBub3JtYWxpemVkIG1hcHBpbmdzIHJldHVybmVkIGJ5IHRoZSBBUElcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlcyB3aXRoIHRoZSBuZXcgbm9ybWFsaXplZCBuYW1lcywgaWYgZ2l2ZW5cbiAgICovXG4gIG1hcE5vcm1hbGl6ZWRQYWdlTmFtZXMocGFnZXMsIG5vcm1hbGl6ZWRQYWdlcykge1xuICAgIG5vcm1hbGl6ZWRQYWdlcy5mb3JFYWNoKG5vcm1hbFBhZ2UgPT4ge1xuICAgICAgLyoqIGRvIGl0IHRoaXMgd2F5IHRvIHByZXNlcnZlIG9yZGVyaW5nIG9mIHBhZ2VzICovXG4gICAgICBwYWdlcyA9IHBhZ2VzLm1hcChwYWdlID0+IHtcbiAgICAgICAgaWYgKG5vcm1hbFBhZ2UuZnJvbSA9PT0gcGFnZSkge1xuICAgICAgICAgIHJldHVybiBub3JtYWxQYWdlLnRvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiB2YWxpZCBtdWx0aWxpbmd1YWwgcHJvamVjdHNcbiAgICogQHJldHVybiB7QXJyYXl9IGJhc2UgcHJvamVjdHMsIHdpdGhvdXQgdGhlIGxhbmd1YWdlXG4gICAqL1xuICBzdGF0aWMgZ2V0IG11bHRpbGFuZ1Byb2plY3RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnd2lraXBlZGlhJyxcbiAgICAgICd3aWtpYm9va3MnLFxuICAgICAgJ3dpa2luZXdzJyxcbiAgICAgICd3aWtpcXVvdGUnLFxuICAgICAgJ3dpa2lzb3VyY2UnLFxuICAgICAgJ3dpa2l2ZXJzaXR5JyxcbiAgICAgICd3aWtpdm95YWdlJ1xuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBtYXNzIHJlcXVlc3RzIHRvIE1lZGlhV2lraSBBUElcbiAgICogVGhlIEFQSSBub3JtYWxseSBsaW1pdHMgdG8gNTAwIHBhZ2VzLCBidXQgZ2l2ZXMgeW91IGEgJ2NvbnRpbnVlJyB2YWx1ZVxuICAgKiAgIHRvIGZpbmlzaCBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgcmVzb3VyY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbWV0ZXJzIHRvIHBhc3MgdG8gdGhlIEFQSVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgdG8gcXVlcnksIGUuZy4gZW4ud2lraXBlZGlhICgub3JnIGlzIG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRpbnVlS2V5XSAtIHRoZSBrZXkgdG8gbG9vayBpbiB0aGUgY29udGludWUgaGFzaCwgaWYgcHJlc2VudCAoZS5nLiBjbWNvbnRpbnVlIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gW2RhdGFLZXldIC0gdGhlIGtleSBmb3IgdGhlIG1haW4gY2h1bmsgb2YgZGF0YSwgaW4gdGhlIHF1ZXJ5IGhhc2ggKGUuZy4gY2F0ZWdvcnltZW1iZXJzIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiAgIElmIHRoaXMgaXMgYSBmdW5jdGlvbiBpdCBpcyBnaXZlbiB0aGUgcmVzcG9uc2UgZGF0YSwgYW5kIGV4cGVjdGVkIHRvIHJldHVybiB0aGUgZGF0YSB3ZSB3YW50IHRvIGNvbmNhdGVudGF0ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdF0gLSBtYXggbnVtYmVyIG9mIHBhZ2VzIHRvIGZldGNoXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBwcm9taXNlIHJlc29sdmluZyB3aXRoIGRhdGFcbiAgICovXG4gIG1hc3NBcGkocGFyYW1zLCBwcm9qZWN0LCBjb250aW51ZUtleSA9ICdjb250aW51ZScsIGRhdGFLZXksIGxpbWl0ID0gdGhpcy5jb25maWcuYXBpTGltaXQpIHtcbiAgICBpZiAoIS9cXC5vcmckLy50ZXN0KHByb2plY3QpKSBwcm9qZWN0ICs9ICcub3JnJztcblxuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcbiAgICBsZXQgcmVzb2x2ZURhdGEgPSB7XG4gICAgICBwYWdlczogW11cbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZVJlcXVlc3QgPSBjb250aW51ZVZhbHVlID0+IHtcbiAgICAgIGxldCByZXF1ZXN0RGF0YSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBmb3JtYXR2ZXJzaW9uOiAnMidcbiAgICAgIH0sIHBhcmFtcyk7XG5cbiAgICAgIGlmIChjb250aW51ZVZhbHVlKSByZXF1ZXN0RGF0YVtjb250aW51ZUtleV0gPSBjb250aW51ZVZhbHVlO1xuXG4gICAgICBjb25zdCBwcm9taXNlID0gJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9L3cvYXBpLnBocGAsXG4gICAgICAgIGpzb25wOiAnY2FsbGJhY2snLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgZGF0YTogcmVxdWVzdERhdGFcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIC8vIHNvbWUgZmFpbHVyZXMgY29tZSBiYWNrIGFzIDIwMHMsIHNvIHdlIHN0aWxsIHJlc29sdmUgYW5kIGxldCB0aGUgbG9jYWwgYXBwIGhhbmRsZSBpdFxuICAgICAgICBpZiAoZGF0YS5lcnJvcikgcmV0dXJuIGRmZC5yZXNvbHZlKGRhdGEpO1xuXG4gICAgICAgIGxldCBpc0ZpbmlzaGVkO1xuXG4gICAgICAgIC8vIGFsbG93IGN1c3RvbSBmdW5jdGlvbiB0byBwYXJzZSB0aGUgZGF0YSB3ZSB3YW50LCBpZiBwcm92aWRlZFxuICAgICAgICBpZiAodHlwZW9mIGRhdGFLZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhS2V5KGRhdGEucXVlcnkpKTtcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFwcGVuZCBuZXcgZGF0YSB0byBkYXRhIGZyb20gbGFzdCByZXF1ZXN0LiBXZSBtaWdodCB3YW50IGJvdGggJ3BhZ2VzJyBhbmQgZGF0YUtleVxuICAgICAgICAgIGlmIChkYXRhLnF1ZXJ5LnBhZ2VzKSB7XG4gICAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhLnF1ZXJ5LnBhZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEucXVlcnlbZGF0YUtleV0pIHtcbiAgICAgICAgICAgIHJlc29sdmVEYXRhW2RhdGFLZXldID0gKHJlc29sdmVEYXRhW2RhdGFLZXldIHx8IFtdKS5jb25jYXQoZGF0YS5xdWVyeVtkYXRhS2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIHBhZ2VzIGlzIG5vdCB0aGUgY29sbGVjdGlvbiB3ZSB3YW50LCBpdCB3aWxsIGJlIGVpdGhlciBhbiBlbXB0eSBhcnJheSBvciBvbmUgZW50cnkgd2l0aCBiYXNpYyBwYWdlIGluZm9cbiAgICAgICAgICAvLyAgIGRlcGVuZGluZyBvbiB3aGF0IEFQSSB3ZSdyZSBoaXR0aW5nLiBTbyByZXNvbHZlRGF0YVtkYXRhS2V5XSB3aWxsIGhpdCB0aGUgbGltaXRcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0IHx8IHJlc29sdmVEYXRhW2RhdGFLZXldLmxlbmd0aCA+PSBsaW1pdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2UgcmVjdXJzaXZlIGNhbGwgaWYgbmVlZGVkLCB3YWl0aW5nIDEwMG1zXG4gICAgICAgIGlmICghaXNGaW5pc2hlZCAmJiBkYXRhLmNvbnRpbnVlICYmIGRhdGEuY29udGludWVbY29udGludWVLZXldKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtYWtlUmVxdWVzdChkYXRhLmNvbnRpbnVlW2NvbnRpbnVlS2V5XSk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpbmRpY2F0ZSB0aGVyZSB3ZXJlIG1vcmUgZW50cmllcyB0aGFuIHRoZSBsaW1pdFxuICAgICAgICAgIGlmIChkYXRhLmNvbnRpbnVlKSByZXNvbHZlRGF0YS5jb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgZGZkLnJlc29sdmUocmVzb2x2ZURhdGEpO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgICBkZmQucmVqZWN0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1ha2VSZXF1ZXN0KCk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2FsaXplIE51bWJlciBvYmplY3Qgd2l0aCBkZWxpbWl0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIHRoZSBOdW1iZXIsIGUuZy4gMTIzNDU2N1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHdpdGggbG9jYWxlIGRlbGltaXRlcnMsIGUuZy4gMSwyMzQsNTY3IChlbi1VUylcbiAgICovXG4gIG4odmFsdWUpIHtcbiAgICByZXR1cm4gKG5ldyBOdW1iZXIodmFsdWUpKS50b0xvY2FsZVN0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBiYXNpYyBpbmZvIG9uIGdpdmVuIHBhZ2VzLCBpbmNsdWRpbmcgdGhlIG5vcm1hbGl6ZWQgcGFnZSBuYW1lcy5cbiAgICogRS5nLiBtYXNjdWxpbmUgdmVyc3VzIGZlbWluaW5lIG5hbWVzcGFjZXMgb24gZGV3aWtpXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2Ugd2l0aCBkYXRhIGZldGNoZWQgZnJvbSBBUElcbiAgICovXG4gIGdldFBhZ2VJbmZvKHBhZ2VzKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocD9hY3Rpb249cXVlcnkmcHJvcD1pbmZvJmlucHJvcD1wcm90ZWN0aW9ufHdhdGNoZXJzYCArXG4gICAgICAgIGAmZm9ybWF0dmVyc2lvbj0yJmZvcm1hdD1qc29uJnRpdGxlcz0ke3BhZ2VzLmpvaW4oJ3wnKX1gLFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgbGV0IHBhZ2VEYXRhID0ge307XG4gICAgICBkYXRhLnF1ZXJ5LnBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICAgIHBhZ2VEYXRhW3BhZ2UudGl0bGVdID0gcGFnZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKHBhZ2VEYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIGhvdyBtYW55IGRheXMgYXJlIGluIHRoZSBzZWxlY3RlZCBkYXRlIHJhbmdlXG4gICAqIEByZXR1cm5zIHtpbnRlZ2VyfSBudW1iZXIgb2YgZGF5c1xuICAgKi9cbiAgbnVtRGF5c0luUmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuZGlmZih0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUsICdkYXlzJykgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGtleS92YWx1ZSBwYWlycyBvZiBVUkwgcXVlcnkgc3RyaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbXVsdGlQYXJhbV0gLSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWVzIG5lZWRzIHRvIHNwbGl0IGJ5IHBpcGUgY2hhcmFjdGVyXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGtleS92YWx1ZSBwYWlycyByZXByZXNlbnRhdGlvbiBvZiBxdWVyeSBzdHJpbmdcbiAgICovXG4gIHBhcnNlUXVlcnlTdHJpbmcobXVsdGlQYXJhbSkge1xuICAgIGNvbnN0IHVyaSA9IGRlY29kZVVSSShsb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkpLFxuICAgICAgY2h1bmtzID0gdXJpLnNwbGl0KCcmJyk7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaHVuayA9IGNodW5rc1tpXS5zcGxpdCgnPScpO1xuXG4gICAgICBpZiAobXVsdGlQYXJhbSAmJiBjaHVua1swXSA9PT0gbXVsdGlQYXJhbSkge1xuICAgICAgICBwYXJhbXNbbXVsdGlQYXJhbV0gPSBjaHVua1sxXS5zcGxpdCgnfCcpLmZpbHRlcihwYXJhbSA9PiAhIXBhcmFtKS51bmlxdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtc1tjaHVua1swXV0gPSBjaHVua1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBtZXRyaWMgdG8gc2VlIGhvdyBtYW55IHVzZSBpdCAocGFnZXZpZXdzIG9mIHRoZSBwYWdldmlldywgYSBtZXRhLXBhZ2V2aWV3LCBpZiB5b3Ugd2lsbCA6KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwIC0gb25lIG9mOiBwdiwgbHYsIHR2LCBzdiwgbXNcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcGF0Y2hVc2FnZShhcHApIHtcbiAgICBpZiAobWV0YVJvb3QpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC8vJHttZXRhUm9vdH0vdXNhZ2UvJHt0aGlzLmFwcH0vJHt0aGlzLnByb2plY3QgfHwgaTE4bkxhbmd9YCxcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRpbWVzdGFtcCBvZiB3aGVuIHByb2Nlc3Mgc3RhcnRlZFxuICAgKiBAcmV0dXJuIHttb21lbnR9IHN0YXJ0IHRpbWVcbiAgICovXG4gIHByb2Nlc3NTdGFydGVkKCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3NTdGFydCA9IG1vbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbGFwc2VkIHRpbWUgZnJvbSB0aGlzLnByb2Nlc3NTdGFydCwgYW5kIHNob3cgaXRcbiAgICogQHJldHVybiB7bW9tZW50fSBFbGFwc2VkIHRpbWUgZnJvbSBgdGhpcy5wcm9jZXNzU3RhcnRgIGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgcHJvY2Vzc0VuZGVkKCkge1xuICAgIGNvbnN0IGVuZFRpbWUgPSBtb21lbnQoKSxcbiAgICAgIGVsYXBzZWRUaW1lID0gZW5kVGltZS5kaWZmKHRoaXMucHJvY2Vzc1N0YXJ0LCAnbWlsbGlzZWNvbmRzJyk7XG5cbiAgICAvKiogRklYTUU6IHJlcG9ydCB0aGlzIGJ1Zzogc29tZSBsYW5ndWFnZXMgZG9uJ3QgcGFyc2UgUExVUkFMIGNvcnJlY3RseSAoJ2hlJyBmb3IgZXhhbXBsZSkgd2l0aCB0aGUgRW5nbGlzaCBmYWxsYmFjayBtZXNzYWdlICovXG4gICAgdHJ5IHtcbiAgICAgICQoJy5lbGFwc2VkLXRpbWUnKS5hdHRyKCdkYXRldGltZScsIGVuZFRpbWUuZm9ybWF0KCkpXG4gICAgICAgIC50ZXh0KCQuaTE4bignZWxhcHNlZC10aW1lJywgZWxhcHNlZFRpbWUgLyAxMDAwKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxsIG5vdGhpbmcsIGV2ZXJ5dGhpbmcgd2lsbCBzdGlsbCBzaG93XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkYXB0ZWQgZnJvbSBodHRwOi8vanNmaWRkbGUubmV0L2RhbmR2LzQ3Y2JqLyBjb3VydGVzeSBvZiBkYW5kdlxuICAgKlxuICAgKiBTYW1lIGFzIF8uZGVib3VuY2UgYnV0IHF1ZXVlcyBhbmQgZXhlY3V0ZXMgYWxsIGZ1bmN0aW9uIGNhbGxzXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAtIGZ1bmN0aW9uIHRvIGRlYm91bmNlXG4gICAqIEBwYXJhbSAge2RlbGF5fSBkZWxheSAtIGRlbGF5IGR1cmF0aW9uIG9mIG1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHQgLSBzY29wZSB0aGUgZnVuY3Rpb24gc2hvdWxkIHJlZmVyIHRvXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByYXRlLWxpbWl0ZWQgZnVuY3Rpb24gdG8gY2FsbCBpbnN0ZWFkIG9mIHlvdXIgZnVuY3Rpb25cbiAgICovXG4gIHJhdGVMaW1pdChmbiwgZGVsYXksIGNvbnRleHQpIHtcbiAgICBsZXQgcXVldWUgPSBbXSwgdGltZXI7XG5cbiAgICBjb25zdCBwcm9jZXNzUXVldWUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGZuLmFwcGx5KGl0ZW0uY29udGV4dCwgaXRlbS5hcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKSwgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbGltaXRlZCgpIHtcbiAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICBjb250ZXh0OiBjb250ZXh0IHx8IHRoaXMsXG4gICAgICAgIGFyZ3VtZW50czogW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0aW1lcikge1xuICAgICAgICBwcm9jZXNzUXVldWUoKTsgLy8gc3RhcnQgaW1tZWRpYXRlbHkgb24gdGhlIGZpcnN0IGludm9jYXRpb25cbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChwcm9jZXNzUXVldWUsIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIFNlbGVjdDIgcmVsYXRlZCBzdHVmZiB0aGVuIGFkZHMgaXQgYmFja1xuICAgKiBBbHNvIG1pZ2h0IHJlc3VsdCBpbiB0aGUgY2hhcnQgYmVpbmcgcmUtcmVuZGVyZWRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlc2V0U2VsZWN0MigpIHtcbiAgICBjb25zdCBzZWxlY3QySW5wdXQgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgc2VsZWN0MklucHV0Lm9mZignY2hhbmdlJyk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ3ZhbCcsIG51bGwpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCdkYXRhJywgbnVsbCk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2Rlc3Ryb3knKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBhbHBoYSBsZXZlbCBvZiBhbiByZ2JhIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHJnYmEgdmFsdWVcbiAgICogQHBhcmFtIHtmbG9hdHxzdHJpbmd9IGFscGhhIC0gdHJhbnNwYXJlbmN5IGFzIGZsb2F0IHZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHJnYmEgdmFsdWVcbiAgICovXG4gIHJnYmEodmFsdWUsIGFscGhhKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyxcXHMqXFxkXFwpLywgYCwgJHthbHBoYX0pYCk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBhIHBhcnRpY3VsYXIgc2V0dGluZyB0byBzZXNzaW9uIGFuZCBsb2NhbFN0b3JhZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHNldHRpbmdzIGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ3xib29sZWFufSB2YWx1ZSAtIHZhbHVlIHRvIHNhdmVcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5nKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICB0aGlzLnNldExvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7a2V5fWAsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBzZWxlY3RlZCBzZXR0aW5ncyB3aXRoaW4gdGhlIHNldHRpbmdzIG1vZGFsXG4gICAqIFByZWZlciB0aGlzIGltcGxlbWVudGF0aW9uIG92ZXIgYSBsYXJnZSBsaWJyYXJ5IGxpa2Ugc2VyaWFsaXplT2JqZWN0IG9yIHNlcmlhbGl6ZUpTT05cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5ncygpIHtcbiAgICAvKiogdHJhY2sgaWYgd2UncmUgY2hhbmdpbmcgdG8gbm9fYXV0b2NvbXBsZXRlIG1vZGUgKi9cbiAgICBjb25zdCB3YXNBdXRvY29tcGxldGUgPSB0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZSc7XG5cbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwuY2hlY2tlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgfSBlbHNlIGlmIChlbC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXBwICE9PSAndG9wdmlld3MnKSB7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5sb2NhbGUuZm9ybWF0ID0gdGhpcy5kYXRlRm9ybWF0O1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIudXBkYXRlRWxlbWVudCgpO1xuXG4gICAgICB0aGlzLnNldHVwU2VsZWN0MkNvbG9ycygpO1xuXG4gICAgICAvKipcbiAgICAgICAqIElmIHdlIGNoYW5nZWQgdG8vZnJvbSBub19hdXRvY29tcGxldGUgd2UgaGF2ZSB0byByZXNldCBTZWxlY3QyIGVudGlyZWx5XG4gICAgICAgKiAgIGFzIHNldFNlbGVjdDJEZWZhdWx0cyBpcyBzdXBlciBidWdneSBkdWUgdG8gU2VsZWN0MiBjb25zdHJhaW50c1xuICAgICAgICogU28gbGV0J3Mgb25seSByZXNldCBpZiB3ZSBoYXZlIHRvXG4gICAgICAgKi9cbiAgICAgIGlmICgodGhpcy5hdXRvY29tcGxldGUgPT09ICdub19hdXRvY29tcGxldGUnKSAhPT0gd2FzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZ2luQXRaZXJvID09PSAndHJ1ZScpIHtcbiAgICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc0lucHV0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpcmVjdGx5IHNldCBpdGVtcyBpbiBTZWxlY3QyXG4gICAqIEN1cnJlbnRseSBpcyBub3QgYWJsZSB0byByZW1vdmUgdW5kZXJzY29yZXMgZnJvbSBwYWdlIG5hbWVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGl0ZW1zIC0gcGFnZSB0aXRsZXNcbiAgICogQHJldHVybnMge2FycmF5fSAtIHVudG91Y2hlZCBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0U2VsZWN0MkRlZmF1bHRzKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGVzY2FwZWRUZXh0ID0gJCgnPGRpdj4nKS50ZXh0KGl0ZW0pLmh0bWwoKTtcbiAgICAgICQoJzxvcHRpb24+JyArIGVzY2FwZWRUZXh0ICsgJzwvb3B0aW9uPicpLmFwcGVuZFRvKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgfSk7XG4gICAgJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcsIGl0ZW1zKTtcbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MignY2xvc2UnKTtcblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkYXRlcmFuZ2UgcGlja2VyIHZhbHVlcyBhbmQgdGhpcy5zcGVjaWFsUmFuZ2UgYmFzZWQgb24gcHJvdmlkZWQgc3BlY2lhbCByYW5nZSBrZXlcbiAgICogV0FSTklORzogbm90IHRvIGJlIGNhbGxlZCBvbiBkYXRlcmFuZ2UgcGlja2VyIEdVSSBldmVudHMgKGUuZy4gc3BlY2lhbCByYW5nZSBidXR0b25zKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIG9uZSBvZiBzcGVjaWFsIHJhbmdlcyBkZWZpbmVkIGluIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMsXG4gICAqICAgaW5jbHVkaW5nIGR5bmFtaWMgbGF0ZXN0IHJhbmdlLCBzdWNoIGFzIGBsYXRlc3QtMTVgIGZvciBsYXRlc3QgMTUgZGF5c1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fG51bGx9IHVwZGF0ZWQgdGhpcy5zcGVjaWFsUmFuZ2Ugb2JqZWN0IG9yIG51bGwgaWYgdHlwZSB3YXMgaW52YWxpZFxuICAgKi9cbiAgc2V0U3BlY2lhbFJhbmdlKHR5cGUpIHtcbiAgICBjb25zdCByYW5nZUluZGV4ID0gT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuaW5kZXhPZih0eXBlKTtcbiAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgaWYgKHR5cGUuaW5jbHVkZXMoJ2xhdGVzdC0nKSkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQodHlwZS5yZXBsYWNlKCdsYXRlc3QtJywgJycpLCAxMCkgfHwgMjA7IC8vIGZhbGxiYWNrIG9mIDIwXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMubGF0ZXN0KG9mZnNldCk7XG4gICAgfSBlbHNlIGlmIChyYW5nZUluZGV4ID49IDApIHtcbiAgICAgIC8qKiB0cmVhdCAnbGF0ZXN0JyBhcyBhIGZ1bmN0aW9uICovXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHR5cGUgPT09ICdsYXRlc3QnID8gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcy5sYXRlc3QoKSA6IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNbdHlwZV07XG4gICAgICAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5lcShyYW5nZUluZGV4KS50cmlnZ2VyKCdjbGljaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSB7XG4gICAgICByYW5nZTogdHlwZSxcbiAgICAgIHZhbHVlOiBgJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCl9IC0gJHtlbmREYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpfWBcbiAgICB9O1xuXG4gICAgLyoqIGRpcmVjdGx5IGFzc2lnbiBzdGFydERhdGUgdGhlbiB1c2Ugc2V0RW5kRGF0ZSBzbyB0aGF0IHRoZSBldmVudHMgd2lsbCBiZSBmaXJlZCBvbmNlICovXG4gICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnNldEVuZERhdGUoZW5kRGF0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zcGVjaWFsUmFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgY29sb3JzIGZvciBTZWxlY3QyIGVudHJpZXMgc28gd2UgY2FuIGR5bmFtaWNhbGx5IGNoYW5nZSB0aGVtXG4gICAqIFRoaXMgaXMgYSBuZWNlc3NhcnkgZXZpbCwgYXMgd2UgaGF2ZSB0byBtYXJrIHRoZW0gYXMgIWltcG9ydGFudFxuICAgKiAgIGFuZCBzaW5jZSB0aGVyZSBhcmUgYW55IG51bWJlciBvZiBlbnRpcmVzLCB3ZSBuZWVkIHRvIHVzZSBudGgtY2hpbGQgc2VsZWN0b3JzXG4gICAqIEByZXR1cm5zIHtDU1NTdHlsZXNoZWV0fSBvdXIgbmV3IHN0eWxlc2hlZXRcbiAgICovXG4gIHNldHVwU2VsZWN0MkNvbG9ycygpIHtcbiAgICAvKiogZmlyc3QgZGVsZXRlIG9sZCBzdHlsZXNoZWV0LCBpZiBwcmVzZW50ICovXG4gICAgaWYgKHRoaXMuY29sb3JzU3R5bGVFbCkgdGhpcy5jb2xvcnNTdHlsZUVsLnJlbW92ZSgpO1xuXG4gICAgLyoqIGNyZWF0ZSBuZXcgc3R5bGVzaGVldCAqL1xuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7IC8vIFdlYktpdCBoYWNrIDooXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLmNvbG9yc1N0eWxlRWwpO1xuXG4gICAgLyoqIGFkZCBjb2xvciBydWxlcyAqL1xuICAgIHRoaXMuY29uZmlnLmNvbG9ycy5mb3JFYWNoKChjb2xvciwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuY29sb3JzU3R5bGVFbC5zaGVldC5pbnNlcnRSdWxlKGAuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZTpudGgtb2YtdHlwZSgke2luZGV4ICsgMX0pIHsgYmFja2dyb3VuZDogJHtjb2xvcn0gIWltcG9ydGFudCB9YCwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jb2xvcnNTdHlsZUVsLnNoZWV0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyb3NzLWFwcGxpY2F0aW9uIGxpc3RlbmVyc1xuICAgKiBFYWNoIGFwcCBoYXMgaXQncyBvd24gc2V0dXBMaXN0ZW5lcnMoKSB0aGF0IHNob3VsZCBjYWxsIHN1cGVyLnNldHVwTGlzdGVuZXJzKClcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgLyoqIHByZXZlbnQgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3VyIGZvciBhbnkgbGluayB3aXRoIGhyZWY9XCIjXCIgKi9cbiAgICAkKFwiYVtocmVmPScjJ11cIikub24oJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXG4gICAgLyoqIGRvd25sb2FkIGxpc3RlbmVycyAqL1xuICAgICQoJy5kb3dubG9hZC1jc3YnKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydENTVi5iaW5kKHRoaXMpKTtcbiAgICAkKCcuZG93bmxvYWQtanNvbicpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0SlNPTi5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBwcm9qZWN0IGlucHV0IGxpc3RlbmVycywgc2F2aW5nIGFuZCByZXN0b3Jpbmcgb2xkIHZhbHVlIGlmIG5ldyBvbmUgaXMgaW52YWxpZCAqL1xuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS5vbignZm9jdXNpbicsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kYXRhc2V0LnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9KTtcbiAgICAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkub24oJ2NoYW5nZScsIGUgPT4gdGhpcy52YWxpZGF0ZVByb2plY3QoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZXMgb2YgZm9ybSBiYXNlZCBvbiBsb2NhbFN0b3JhZ2Ugb3IgZGVmYXVsdHMsIGFkZCBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldHVwU2V0dGluZ3NNb2RhbCgpIHtcbiAgICAvKiogZmlsbCBpbiB2YWx1ZXMsIGV2ZXJ5dGhpbmcgaXMgZWl0aGVyIGEgY2hlY2tib3ggb3IgcmFkaW8gKi9cbiAgICB0aGlzLmZpbGxJblNldHRpbmdzKCk7XG5cbiAgICAvKiogYWRkIGxpc3RlbmVyICovXG4gICAgJCgnLnNhdmUtc2V0dGluZ3MtYnRuJykub24oJ2NsaWNrJywgdGhpcy5zYXZlU2V0dGluZ3MuYmluZCh0aGlzKSk7XG4gICAgJCgnLmNhbmNlbC1zZXR0aW5ncy1idG4nKS5vbignY2xpY2snLCB0aGlzLmZpbGxJblNldHRpbmdzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldHMgdXAgdGhlIGRhdGVyYW5nZSBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpIHtcbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMgdG8gaGF2ZSBpMThuIGFzIGtleXNcbiAgICAgKiBUaGlzIGlzIHdoYXQgaXMgc2hvd24gYXMgdGhlIHNwZWNpYWwgcmFuZ2VzIChMYXN0IG1vbnRoLCBldGMuKSBpbiB0aGUgZGF0ZXBpY2tlciBtZW51XG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBsZXQgcmFuZ2VzID0ge307XG4gICAgT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gJ2xhdGVzdCcpIHJldHVybjsgLy8gdGhpcyBpcyBhIGZ1bmN0aW9uLCBub3QgbWVhbnQgdG8gYmUgaW4gdGhlIGxpc3Qgb2Ygc3BlY2lhbCByYW5nZXNcbiAgICAgIHJhbmdlc1skLmkxOG4oa2V5KV0gPSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzW2tleV07XG4gICAgfSk7XG5cbiAgICBsZXQgZGF0ZXBpY2tlck9wdGlvbnMgPSB7XG4gICAgICBsb2NhbGU6IHtcbiAgICAgICAgZm9ybWF0OiB0aGlzLmRhdGVGb3JtYXQsXG4gICAgICAgIGFwcGx5TGFiZWw6ICQuaTE4bignYXBwbHknKSxcbiAgICAgICAgY2FuY2VsTGFiZWw6ICQuaTE4bignY2FuY2VsJyksXG4gICAgICAgIGN1c3RvbVJhbmdlTGFiZWw6ICQuaTE4bignY3VzdG9tLXJhbmdlJyksXG4gICAgICAgIGRheXNPZldlZWs6IFtcbiAgICAgICAgICAkLmkxOG4oJ3N1JyksXG4gICAgICAgICAgJC5pMThuKCdtbycpLFxuICAgICAgICAgICQuaTE4bigndHUnKSxcbiAgICAgICAgICAkLmkxOG4oJ3dlJyksXG4gICAgICAgICAgJC5pMThuKCd0aCcpLFxuICAgICAgICAgICQuaTE4bignZnInKSxcbiAgICAgICAgICAkLmkxOG4oJ3NhJylcbiAgICAgICAgXSxcbiAgICAgICAgbW9udGhOYW1lczogW1xuICAgICAgICAgICQuaTE4bignamFudWFyeScpLFxuICAgICAgICAgICQuaTE4bignZmVicnVhcnknKSxcbiAgICAgICAgICAkLmkxOG4oJ21hcmNoJyksXG4gICAgICAgICAgJC5pMThuKCdhcHJpbCcpLFxuICAgICAgICAgICQuaTE4bignbWF5JyksXG4gICAgICAgICAgJC5pMThuKCdqdW5lJyksXG4gICAgICAgICAgJC5pMThuKCdqdWx5JyksXG4gICAgICAgICAgJC5pMThuKCdhdWd1c3QnKSxcbiAgICAgICAgICAkLmkxOG4oJ3NlcHRlbWJlcicpLFxuICAgICAgICAgICQuaTE4bignb2N0b2JlcicpLFxuICAgICAgICAgICQuaTE4bignbm92ZW1iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ2RlY2VtYmVyJylcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCkuc3VidHJhY3QodGhpcy5jb25maWcuZGF5c0FnbywgJ2RheXMnKSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuY29uZmlnLm1pbkRhdGUsXG4gICAgICBtYXhEYXRlOiB0aGlzLmNvbmZpZy5tYXhEYXRlLFxuICAgICAgcmFuZ2VzOiByYW5nZXNcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmRhdGVMaW1pdCkgZGF0ZXBpY2tlck9wdGlvbnMuZGF0ZUxpbWl0ID0geyBkYXlzOiB0aGlzLmNvbmZpZy5kYXRlTGltaXQgfTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLmRhdGVyYW5nZXBpY2tlcihkYXRlcGlja2VyT3B0aW9ucyk7XG5cbiAgICAvKiogc28gcGVvcGxlIGtub3cgd2h5IHRoZXkgY2FuJ3QgcXVlcnkgZGF0YSBvbGRlciB0aGFuIEp1bHkgMjAxNSAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXInKS5hcHBlbmQoXG4gICAgICAkKCc8ZGl2PicpXG4gICAgICAgIC5hZGRDbGFzcygnZGF0ZXJhbmdlLW5vdGljZScpXG4gICAgICAgIC5odG1sKCQuaTE4bignZGF0ZS1ub3RpY2UnLCBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHA6Ly9zdGF0cy5ncm9rLnNlJyB0YXJnZXQ9J19ibGFuayc+c3RhdHMuZ3Jvay5zZTwvYT5cIixcbiAgICAgICAgICBgJHskLmkxOG4oJ2p1bHknKX0gMjAxNWBcbiAgICAgICAgKSlcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNwZWNpYWwgZGF0ZSByYW5nZSBvcHRpb25zIChidXR0b25zIHRoZSByaWdodCBzaWRlIG9mIHRoZSBkYXRlcmFuZ2UgcGlja2VyKVxuICAgICAqXG4gICAgICogV0FSTklORzogd2UncmUgdW5hYmxlIHRvIGFkZCBjbGFzcyBuYW1lcyBvciBkYXRhIGF0dHJzIHRvIHRoZSByYW5nZSBvcHRpb25zLFxuICAgICAqIHNvIGNoZWNraW5nIHdoaWNoIHdhcyBjbGlja2VkIGlzIGhhcmRjb2RlZCBiYXNlZCBvbiB0aGUgaW5kZXggb2YgdGhlIExJLFxuICAgICAqIGFzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1xuICAgICAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5pbmRleChlLnRhcmdldCksXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmNvbnRhaW5lcixcbiAgICAgICAgaW5wdXRzID0gY29udGFpbmVyLmZpbmQoJy5kYXRlcmFuZ2VwaWNrZXJfaW5wdXQgaW5wdXQnKTtcbiAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0ge1xuICAgICAgICByYW5nZTogT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcylbaW5kZXhdLFxuICAgICAgICB2YWx1ZTogYCR7aW5wdXRzWzBdLnZhbHVlfSAtICR7aW5wdXRzWzFdLnZhbHVlfWBcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS5vbignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgKGUsIGFjdGlvbikgPT4ge1xuICAgICAgaWYgKGFjdGlvbi5jaG9zZW5MYWJlbCA9PT0gJC5pMThuKCdjdXN0b20tcmFuZ2UnKSkge1xuICAgICAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IG51bGw7XG5cbiAgICAgICAgLyoqIGZvcmNlIGV2ZW50cyB0byByZS1maXJlIHNpbmNlIGFwcGx5LmRhdGVyYW5nZXBpY2tlciBvY2N1cnMgYmVmb3JlICdjaGFuZ2UnIGV2ZW50ICovXG4gICAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNob3dGYXRhbEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICBlcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgYDxzdHJvbmc+JHskLmkxOG4oJ2ZhdGFsLWVycm9yJyl9PC9zdHJvbmc+OiA8Y29kZT4ke2Vycm9yfTwvY29kZT5gLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICB9IGVsc2UgaWYgKGVycm9ycyAmJiBlcnJvcnNbMF0gJiYgZXJyb3JzWzBdLnN0YWNrKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnLy90b29scy53bWZsYWJzLm9yZy9tdXNpa2FuaW1hbC9wYXN0ZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb250ZW50OiAnJyArXG4gICAgICAgICAgICBgXFxuZGF0ZTogICAgICAke21vbWVudCgpLnV0YygpLmZvcm1hdCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRvb2w6ICAgICAgJHt0aGlzLmFwcH1gICtcbiAgICAgICAgICAgIGBcXG5sYW5ndWFnZTogICR7aTE4bkxhbmd9YCArXG4gICAgICAgICAgICBgXFxuY2hhcnQ6ICAgICAke3RoaXMuY2hhcnRUeXBlfWAgK1xuICAgICAgICAgICAgYFxcbnVybDogICAgICAgJHtkb2N1bWVudC5sb2NhdGlvbi5ocmVmfWAgK1xuICAgICAgICAgICAgYFxcbnVzZXJBZ2VudDogJHt0aGlzLmdldFVzZXJBZ2VudCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRyYWNlOiAgICAgJHtlcnJvcnNbMF0uc3RhY2t9YFxuICAgICAgICAgICxcbiAgICAgICAgICB0aXRsZTogYFBhZ2V2aWV3cyBBbmFseXNpcyBlcnJvciByZXBvcnQ6ICR7ZXJyb3JzWzBdfWBcbiAgICAgICAgfVxuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkpLFxuICAgICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKSxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSksXG4gICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwbGFzaCBpbiBjb25zb2xlLCBqdXN0IGZvciBmdW5cbiAgICogQHJldHVybnMge1N0cmluZ30gb3V0cHV0XG4gICAqL1xuICBzcGxhc2goKSB7XG4gICAgY29uc3Qgc3R5bGUgPSAnYmFja2dyb3VuZDogI2VlZTsgY29sb3I6ICM1NTU7IHBhZGRpbmc6IDRweDsgZm9udC1mYW1pbHk6bW9ub3NwYWNlJztcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBfX18gICAgICAgICAgICBfXyBfICAgICAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgfCBfIFxcXFwgIF9fIF8gICAgLyBfYCB8ICAgX19fICAgIF9fIF9fICAgIChfKSAgICAgX19fICAgX18gX18gX18gIF9fXyAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICB8ICBfLyAvIF9gIHwgICBcXFxcX18sIHwgIC8gLV8pICAgXFxcXCBWIC8gICAgfCB8ICAgIC8gLV8pICBcXFxcIFYgIFYgLyAoXy08ICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgX3xffF8gIFxcXFxfXyxffCAgIHxfX18vICAgXFxcXF9fX3wgICBfXFxcXF8vXyAgIF98X3xfICAgXFxcXF9fX3wgICBcXFxcXy9cXFxcXy8gIC9fXy9fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgX3wgXCJcIlwiIHxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgICAgICAgICBfX18gICAgICAgICAgICAgICAgICAgICBfICBfICAgICBfICAgICAgICAgICAgICAgXyAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBvIE8gTyAgLyAgIFxcXFwgICBfIF8gICAgIF9fIF8gICAgfCB8fCB8ICAgfCB8ICAgICBfX18gICAgIChfKSAgICAgX19fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgbyAgICAgICB8IC0gfCAgfCBcXCcgXFxcXCAgIC8gX2AgfCAgICBcXFxcXywgfCAgIHwgfCAgICAoXy08ICAgICB8IHwgICAgKF8tPCAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgVFNfX1tPXSAgfF98X3wgIHxffHxffCAgXFxcXF9fLF98ICAgX3xfXy8gICBffF98XyAgIC9fXy9fICAgX3xffF8gICAvX18vXyAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgIHs9PT09PT18X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3wgXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAuL28tLTAwMFxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCcgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coYCVjICBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWwgUnVpeiBGb3JucyAgICAgICAgICAgICAgICAgIGAsIHN0eWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBzZXQgdGhlIHNhZmVndWFyZCB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzdGFydFNwaW5ueSgpIHtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZXJyID0+IHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShgPHN0cm9uZz4keyQuaTE4bignZmF0YWwtZXJyb3InKX08L3N0cm9uZz46XG4gICAgICAgICR7JC5pMThuKCdlcnJvci10aW1lZC1vdXQnKX1cbiAgICAgICAgJHskLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKX1cbiAgICAgIGAsICdlcnJvcicsIDApO1xuICAgIH0sIDIwICogMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBjbGVhciB0aGUgc2FmZWd1YXJkIHRpbWVvdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHN0b3BTcGlubnkoKSB7XG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBzcGFjZXMgd2l0aCB1bmRlcnNjb3Jlc1xuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlIG5hbWVzIHdpdGggdW5kZXJzY29yZXNcbiAgICovXG4gIHVuZGVyc2NvcmVQYWdlTmFtZXMocGFnZXMpIHtcbiAgICByZXR1cm4gcGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWdlKS5zY29yZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBocmVmcyBvZiBpbnRlci1hcHAgbGlua3MgdG8gbG9hZCBjdXJyZW50bHkgc2VsZWN0ZWQgcHJvamVjdFxuICAgKiBAcmV0dXJuIHtudWxsfSBudXR0aW4nXG4gICAqL1xuICB1cGRhdGVJbnRlckFwcExpbmtzKCkge1xuICAgICQoJy5pbnRlcmFwcC1saW5rJykuZWFjaCgoaSwgbGluaykgPT4ge1xuICAgICAgbGV0IHVybCA9IGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdO1xuXG4gICAgICBpZiAobGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2ludGVyYXBwLWxpbmstLXNpdGV2aWV3cycpKSB7XG4gICAgICAgIGxpbmsuaHJlZiA9IGAke3VybH0/c2l0ZXM9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLmhyZWYgPSBgJHt1cmx9P3Byb2plY3Q9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgYmFzaWMgcGFyYW1zIGFnYWluc3Qgd2hhdCBpcyBkZWZpbmVkIGluIHRoZSBjb25maWcsXG4gICAqICAgYW5kIGlmIHRoZXkgYXJlIGludmFsaWQgc2V0IHRoZSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbXMgYXMgZmV0Y2hlZCBieSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzYW1lIHBhcmFtcyB3aXRoIHNvbWUgaW52YWxpZCBwYXJhbWV0ZXJzIGNvcnJldGVkLCBhcyBuZWNlc3NhcnlcbiAgICovXG4gIHZhbGlkYXRlUGFyYW1zKHBhcmFtcykge1xuICAgIHRoaXMuY29uZmlnLnZhbGlkYXRlUGFyYW1zLmZvckVhY2gocGFyYW1LZXkgPT4ge1xuICAgICAgaWYgKHBhcmFtS2V5ID09PSAncHJvamVjdCcgJiYgcGFyYW1zLnByb2plY3QpIHtcbiAgICAgICAgcGFyYW1zLnByb2plY3QgPSBwYXJhbXMucHJvamVjdC5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmNvbmZpZy5kZWZhdWx0c1twYXJhbUtleV0sXG4gICAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbXNbcGFyYW1LZXldO1xuXG4gICAgICBpZiAoZGVmYXVsdFZhbHVlICYmICF0aGlzLmNvbmZpZy52YWxpZFBhcmFtc1twYXJhbUtleV0uaW5jbHVkZXMocGFyYW1WYWx1ZSkpIHtcbiAgICAgICAgLy8gb25seSB0aHJvdyBlcnJvciBpZiB0aGV5IHRyaWVkIHRvIHByb3ZpZGUgYW4gaW52YWxpZCB2YWx1ZVxuICAgICAgICBpZiAoISFwYXJhbVZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UocGFyYW1LZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zW3BhcmFtS2V5XSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBsaXN0ZW5lcnMgdG8gdGhlIHByb2plY3QgaW5wdXQgZm9yIHZhbGlkYXRpb25zIGFnYWluc3QgdGhlIHNpdGUgbWFwLFxuICAgKiAgIHJldmVydGluZyB0byB0aGUgb2xkIHZhbHVlIGlmIHRoZSBuZXcgb25lIGlzIGludmFsaWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbbXVsdGlsaW5ndWFsXSAtIHdoZXRoZXIgd2Ugc2hvdWxkIGNoZWNrIGlmIGl0IGlzIGEgbXVsdGlsaW5ndWFsIHByb2plY3RcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IHZhbGlkYXRpb25zIHBhc3NlZFxuICAgKi9cbiAgdmFsaWRhdGVQcm9qZWN0KG11bHRpbGluZ3VhbCA9IGZhbHNlKSB7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpWzBdO1xuICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdElucHV0LnZhbHVlLnJlcGxhY2UoL153d3dcXC4vLCAnJyksXG4gICAgICB2YWxpZCA9IGZhbHNlO1xuXG4gICAgaWYgKG11bHRpbGluZ3VhbCAmJiAhdGhpcy5pc011bHRpbGFuZ1Byb2plY3QoKSkge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1sYW5nLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgICAnd2FybmluZydcbiAgICAgICk7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdElucHV0LmRhdGFzZXQudmFsdWU7XG4gICAgfSBlbHNlIGlmIChzaXRlRG9tYWlucy5pbmNsdWRlcyhwcm9qZWN0KSkge1xuICAgICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgICB0aGlzLnVwZGF0ZUludGVyQXBwTGlua3MoKTtcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1wcm9qZWN0JywgYDxhIGhyZWY9Jy8vJHtwcm9qZWN0LmVzY2FwZSgpfSc+JHtwcm9qZWN0LmVzY2FwZSgpfTwvYT5gKSxcbiAgICAgICAgJ3dhcm5pbmcnXG4gICAgICApO1xuICAgICAgcHJvamVjdCA9IHByb2plY3RJbnB1dC5kYXRhc2V0LnZhbHVlO1xuICAgIH1cblxuICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IHByb2plY3Q7XG5cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICAvLyBGSVhNRTogcmVzdG9yZSB3cml0ZU1lc3NhZ2UgdG8gdGhlIHdheSBpdCB1c2VkIHRvIGJlLFxuICAvLyBhbmQgbWFrZSBhZGRTaXRlTm90aWNlIGRvIHRoZSB0b2FzdHIsIGFuZCBjaGFuZ2UgaW5zdGFuY2VzIG9mIHRoaXMud3JpdGVNZXNzYWdlXG4gIC8vIGFjY29yZGluZ2x5XG4gIC8qKlxuICAgKiBXcml0ZXMgbWVzc2FnZSBqdXN0IGJlbG93IHRoZSBjaGFydFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gd3JpdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXQgLSBudW0gc2Vjb25kcyB0byBzaG93XG4gICAqIEByZXR1cm5zIHtqUXVlcnl9IC0galF1ZXJ5IG9iamVjdCBvZiBtZXNzYWdlIGNvbnRhaW5lclxuICAgKi9cbiAgd3JpdGVNZXNzYWdlKG1lc3NhZ2UsIGxldmVsID0gJ3dhcm5pbmcnLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIHRvYXN0ci5vcHRpb25zLnRpbWVPdXQgPSB0aW1lb3V0O1xuICAgIHRvYXN0cltsZXZlbF0obWVzc2FnZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdjtcbiIsIi8qKlxuICogQGZpbGUgU2hhcmVkIGNvbmZpZyBhbW9uZ3N0IGFsbCBhcHBzXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmNvbnN0IHNpdGVNYXAgPSByZXF1aXJlKCcuL3NpdGVfbWFwJyk7XG5jb25zdCBzaXRlRG9tYWlucyA9IE9iamVjdC5rZXlzKHNpdGVNYXApLm1hcChrZXkgPT4gc2l0ZU1hcFtrZXldKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhbGwgUGFnZXZpZXdzIGFwcGxpY2F0aW9ucy5cbiAqIFNvbWUgcHJvcGVydGllcyBtYXkgYmUgb3ZlcnJpZGVuIGJ5IGFwcC1zcGVjaWZpYyBjb25maWdzXG4gKi9cbmNsYXNzIFB2Q29uZmlnIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGZvcm1hdFhBeGlzVGljayA9IHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG1vbWVudCh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0KS53ZWVrZGF5KCk7XG4gICAgICBpZiAoZGF5T2ZXZWVrICUgNykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYOKAoiAke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgYXBpTGltaXQ6IDUwMDAsXG4gICAgICBhcGlUaHJvdHRsZTogMjAsXG4gICAgICBhcHBzOiBbJ3BhZ2V2aWV3cycsICd0b3B2aWV3cycsICdsYW5ndmlld3MnLCAnc2l0ZXZpZXdzJywgJ21hc3N2aWV3cycsICdyZWRpcmVjdHZpZXdzJ10sXG4gICAgICBjaGFydENvbmZpZzoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXRZQXhpc051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwKScsXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Q29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Qm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4yKSxcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlclJhZGl1czogNSxcbiAgICAgICAgICAgICAgdGVuc2lvbjogc2VsZi5iZXppZXJDdXJ2ZSA9PT0gJ3RydWUnID8gMC40IDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0WUF4aXNOdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgYmFyUGVyY2VudGFnZTogMS4wLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5UGVyY2VudGFnZTogMC44NSxcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNiksXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOSksXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjc1KSxcbiAgICAgICAgICAgICAgaG92ZXJCb3JkZXJDb2xvcjogY29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByYWRhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4xKSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOCksXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyUmFkaXVzOiA1XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGllOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkb3VnaG51dDoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvbGFyQXJlYToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgYmVnaW5BdFplcm86IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC43KSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC45KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaXJjdWxhckNoYXJ0czogWydwaWUnLCAnZG91Z2hudXQnLCAncG9sYXJBcmVhJ10sXG4gICAgICBjb2xvcnM6IFsncmdiYSgxNzEsIDIxMiwgMjM1LCAxKScsICdyZ2JhKDE3OCwgMjIzLCAxMzgsIDEpJywgJ3JnYmEoMjUxLCAxNTQsIDE1MywgMSknLCAncmdiYSgyNTMsIDE5MSwgMTExLCAxKScsICdyZ2JhKDIwMiwgMTc4LCAyMTQsIDEpJywgJ3JnYmEoMjA3LCAxODIsIDEyOCwgMSknLCAncmdiYSgxNDEsIDIxMSwgMTk5LCAxKScsICdyZ2JhKDI1MiwgMjA1LCAyMjksIDEpJywgJ3JnYmEoMjU1LCAyNDcsIDE2MSwgMSknLCAncmdiYSgyMTcsIDIxNywgMjE3LCAxKSddLFxuICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAgICAgY2hhcnRUeXBlOiBudW1EYXRhc2V0cyA9PiBudW1EYXRhc2V0cyA+IDEgPyAnbGluZScgOiAnYmFyJyxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ1lZWVktTU0tREQnLFxuICAgICAgICBsb2NhbGl6ZURhdGVGb3JtYXQ6ICd0cnVlJyxcbiAgICAgICAgbnVtZXJpY2FsRm9ybWF0dGluZzogJ3RydWUnLFxuICAgICAgICBiZXppZXJDdXJ2ZTogJ2ZhbHNlJyxcbiAgICAgICAgYXV0b0xvZ0RldGVjdGlvbjogJ3RydWUnLFxuICAgICAgICBiZWdpbkF0WmVybzogJ2ZhbHNlJyxcbiAgICAgICAgcmVtZW1iZXJDaGFydDogJ3RydWUnLFxuICAgICAgICBhZ2VudDogJ3VzZXInLFxuICAgICAgICBwbGF0Zm9ybTogJ2FsbC1hY2Nlc3MnLFxuICAgICAgICBwcm9qZWN0OiAnZW4ud2lraXBlZGlhLm9yZydcbiAgICAgIH0sXG4gICAgICBnbG9iYWxDaGFydE9wdHM6IHtcbiAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFydCdcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXI6IHtcbiAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMFxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluZWFyQ2hhcnRzOiBbJ2xpbmUnLCAnYmFyJywgJ3JhZGFyJ10sXG4gICAgICBsaW5lYXJPcHRzOiB7XG4gICAgICAgIHNjYWxlczoge1xuICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChjaGFydC5kYXRhLmRhdGFzZXRzLCBzZWxmKVxuICAgICAgfSxcbiAgICAgIGRheXNBZ286IDIwLFxuICAgICAgbWluRGF0ZTogbW9tZW50KCcyMDE1LTA3LTAxJykuc3RhcnRPZignZGF5JyksXG4gICAgICBtYXhEYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgc3BlY2lhbFJhbmdlczoge1xuICAgICAgICAnbGFzdC13ZWVrJzogW21vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrJykuc3RhcnRPZignd2VlaycpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2VlaycpLmVuZE9mKCd3ZWVrJyldLFxuICAgICAgICAndGhpcy1tb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpXSxcbiAgICAgICAgJ2xhc3QtbW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuZW5kT2YoJ21vbnRoJyldLFxuICAgICAgICBsYXRlc3Qob2Zmc2V0ID0gc2VsZi5jb25maWcuZGF5c0Fnbykge1xuICAgICAgICAgIHJldHVybiBbbW9tZW50KCkuc3VidHJhY3Qob2Zmc2V0LCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLCBzZWxmLmNvbmZpZy5tYXhEYXRlXTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRpbWVzdGFtcEZvcm1hdDogJ1lZWVlNTUREMDAnLFxuICAgICAgdmFsaWRQYXJhbXM6IHtcbiAgICAgICAgYWdlbnQ6IFsnYWxsLWFnZW50cycsICd1c2VyJywgJ3NwaWRlcicsICdib3QnXSxcbiAgICAgICAgcGxhdGZvcm06IFsnYWxsLWFjY2VzcycsICdkZXNrdG9wJywgJ21vYmlsZS1hcHAnLCAnbW9iaWxlLXdlYiddLFxuICAgICAgICBwcm9qZWN0OiBzaXRlRG9tYWluc1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgbGluZWFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGU6ICdsYWJlbCcsXG4gICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgbGFiZWw6IHRvb2x0aXBJdGVtID0+IHtcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRvb2x0aXBJdGVtLnlMYWJlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnICcgKyAkLmkxOG4oJ3Vua25vd24nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcgJyArIHRoaXMuZm9ybWF0TnVtYmVyKHRvb2x0aXBJdGVtLnlMYWJlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGNpcmN1bGFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbDogKHRvb2x0aXBJdGVtLCBjaGFydEluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjaGFydEluc3RhbmNlLmRhdGFzZXRzW3Rvb2x0aXBJdGVtLmRhdGFzZXRJbmRleF0uZGF0YVt0b29sdGlwSXRlbS5pbmRleF0sXG4gICAgICAgICAgICBsYWJlbCA9IGNoYXJ0SW5zdGFuY2UubGFiZWxzW3Rvb2x0aXBJdGVtLmluZGV4XTtcblxuICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7bGFiZWx9OiAkeyQuaTE4bigndW5rbm93bicpfWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtsYWJlbH06ICR7dGhpcy5mb3JtYXROdW1iZXIodmFsdWUpfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHZDb25maWc7XG4iLCIvKipcbiAqIEBmaWxlIFdNRiBbc2l0ZSBtYXRyaXhdKGh0dHBzOi8vd3d3Lm1lZGlhd2lraS5vcmcvdy9hcGkucGhwP2FjdGlvbj1zaXRlbWF0cml4KSwgd2l0aCBzb21lIHVuc3VwcG9ydGVkIHdpa2lzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqIFNpdGVtYXRyaXggb2YgYWxsIHN1cHBvcnRlZCBXTUYgd2lraXNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IHNpdGVNYXAgPSB7XG4gICdhYXdpa2knOiAnYWEud2lraXBlZGlhLm9yZycsXG4gICdhYXdpa3Rpb25hcnknOiAnYWEud2lrdGlvbmFyeS5vcmcnLFxuICAnYWF3aWtpYm9va3MnOiAnYWEud2lraWJvb2tzLm9yZycsXG4gICdhYndpa2knOiAnYWIud2lraXBlZGlhLm9yZycsXG4gICdhYndpa3Rpb25hcnknOiAnYWIud2lrdGlvbmFyeS5vcmcnLFxuICAnYWNld2lraSc6ICdhY2Uud2lraXBlZGlhLm9yZycsXG4gICdhZHl3aWtpJzogJ2FkeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lraSc6ICdhZi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lrdGlvbmFyeSc6ICdhZi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhZndpa2lib29rcyc6ICdhZi53aWtpYm9va3Mub3JnJyxcbiAgJ2Fmd2lraXF1b3RlJzogJ2FmLndpa2lxdW90ZS5vcmcnLFxuICAnYWt3aWtpJzogJ2FrLndpa2lwZWRpYS5vcmcnLFxuICAnYWt3aWt0aW9uYXJ5JzogJ2FrLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Frd2lraWJvb2tzJzogJ2FrLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraSc6ICdhbHMud2lraXBlZGlhLm9yZycsXG4gICdhbHN3aWt0aW9uYXJ5JzogJ2Fscy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbHN3aWtpYm9va3MnOiAnYWxzLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraXF1b3RlJzogJ2Fscy53aWtpcXVvdGUub3JnJyxcbiAgJ2Ftd2lraSc6ICdhbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Ftd2lrdGlvbmFyeSc6ICdhbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbXdpa2lxdW90ZSc6ICdhbS53aWtpcXVvdGUub3JnJyxcbiAgJ2Fud2lraSc6ICdhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fud2lrdGlvbmFyeSc6ICdhbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbmd3aWtpJzogJ2FuZy53aWtpcGVkaWEub3JnJyxcbiAgJ2FuZ3dpa3Rpb25hcnknOiAnYW5nLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FuZ3dpa2lib29rcyc6ICdhbmcud2lraWJvb2tzLm9yZycsXG4gICdhbmd3aWtpcXVvdGUnOiAnYW5nLndpa2lxdW90ZS5vcmcnLFxuICAnYW5nd2lraXNvdXJjZSc6ICdhbmcud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpJzogJ2FyLndpa2lwZWRpYS5vcmcnLFxuICAnYXJ3aWt0aW9uYXJ5JzogJ2FyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fyd2lraWJvb2tzJzogJ2FyLndpa2lib29rcy5vcmcnLFxuICAnYXJ3aWtpbmV3cyc6ICdhci53aWtpbmV3cy5vcmcnLFxuICAnYXJ3aWtpcXVvdGUnOiAnYXIud2lraXF1b3RlLm9yZycsXG4gICdhcndpa2lzb3VyY2UnOiAnYXIud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpdmVyc2l0eSc6ICdhci53aWtpdmVyc2l0eS5vcmcnLFxuICAnYXJjd2lraSc6ICdhcmMud2lraXBlZGlhLm9yZycsXG4gICdhcnp3aWtpJzogJ2Fyei53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lraSc6ICdhcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lrdGlvbmFyeSc6ICdhcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhc3dpa2lib29rcyc6ICdhcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Fzd2lraXNvdXJjZSc6ICdhcy53aWtpc291cmNlLm9yZycsXG4gICdhc3R3aWtpJzogJ2FzdC53aWtpcGVkaWEub3JnJyxcbiAgJ2FzdHdpa3Rpb25hcnknOiAnYXN0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2FzdHdpa2lib29rcyc6ICdhc3Qud2lraWJvb2tzLm9yZycsXG4gICdhc3R3aWtpcXVvdGUnOiAnYXN0Lndpa2lxdW90ZS5vcmcnLFxuICAnYXZ3aWtpJzogJ2F2Lndpa2lwZWRpYS5vcmcnLFxuICAnYXZ3aWt0aW9uYXJ5JzogJ2F2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F5d2lraSc6ICdheS53aWtpcGVkaWEub3JnJyxcbiAgJ2F5d2lrdGlvbmFyeSc6ICdheS53aWt0aW9uYXJ5Lm9yZycsXG4gICdheXdpa2lib29rcyc6ICdheS53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraSc6ICdhei53aWtpcGVkaWEub3JnJyxcbiAgJ2F6d2lrdGlvbmFyeSc6ICdhei53aWt0aW9uYXJ5Lm9yZycsXG4gICdhendpa2lib29rcyc6ICdhei53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraXF1b3RlJzogJ2F6Lndpa2lxdW90ZS5vcmcnLFxuICAnYXp3aWtpc291cmNlJzogJ2F6Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2F6Yndpa2knOiAnYXpiLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpJzogJ2JhLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpYm9va3MnOiAnYmEud2lraWJvb2tzLm9yZycsXG4gICdiYXJ3aWtpJzogJ2Jhci53aWtpcGVkaWEub3JnJyxcbiAgJ2JhdF9zbWd3aWtpJzogJ2JhdC1zbWcud2lraXBlZGlhLm9yZycsXG4gICdiY2x3aWtpJzogJ2JjbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lraSc6ICdiZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lrdGlvbmFyeSc6ICdiZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdiZXdpa2lib29rcyc6ICdiZS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jld2lraXF1b3RlJzogJ2JlLndpa2lxdW90ZS5vcmcnLFxuICAnYmV3aWtpc291cmNlJzogJ2JlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2JlX3hfb2xkd2lraSc6ICdiZS10YXJhc2sud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa2knOiAnYmcud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa3Rpb25hcnknOiAnYmcud2lrdGlvbmFyeS5vcmcnLFxuICAnYmd3aWtpYm9va3MnOiAnYmcud2lraWJvb2tzLm9yZycsXG4gICdiZ3dpa2luZXdzJzogJ2JnLndpa2luZXdzLm9yZycsXG4gICdiZ3dpa2lxdW90ZSc6ICdiZy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jnd2lraXNvdXJjZSc6ICdiZy53aWtpc291cmNlLm9yZycsXG4gICdiaHdpa2knOiAnYmgud2lraXBlZGlhLm9yZycsXG4gICdiaHdpa3Rpb25hcnknOiAnYmgud2lrdGlvbmFyeS5vcmcnLFxuICAnYml3aWtpJzogJ2JpLndpa2lwZWRpYS5vcmcnLFxuICAnYml3aWt0aW9uYXJ5JzogJ2JpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jpd2lraWJvb2tzJzogJ2JpLndpa2lib29rcy5vcmcnLFxuICAnYmpud2lraSc6ICdiam4ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa2knOiAnYm0ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa3Rpb25hcnknOiAnYm0ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm13aWtpYm9va3MnOiAnYm0ud2lraWJvb2tzLm9yZycsXG4gICdibXdpa2lxdW90ZSc6ICdibS53aWtpcXVvdGUub3JnJyxcbiAgJ2Jud2lraSc6ICdibi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jud2lrdGlvbmFyeSc6ICdibi53aWt0aW9uYXJ5Lm9yZycsXG4gICdibndpa2lib29rcyc6ICdibi53aWtpYm9va3Mub3JnJyxcbiAgJ2Jud2lraXNvdXJjZSc6ICdibi53aWtpc291cmNlLm9yZycsXG4gICdib3dpa2knOiAnYm8ud2lraXBlZGlhLm9yZycsXG4gICdib3dpa3Rpb25hcnknOiAnYm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm93aWtpYm9va3MnOiAnYm8ud2lraWJvb2tzLm9yZycsXG4gICdicHl3aWtpJzogJ2JweS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lraSc6ICdici53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lrdGlvbmFyeSc6ICdici53aWt0aW9uYXJ5Lm9yZycsXG4gICdicndpa2lxdW90ZSc6ICdici53aWtpcXVvdGUub3JnJyxcbiAgJ2Jyd2lraXNvdXJjZSc6ICdici53aWtpc291cmNlLm9yZycsXG4gICdic3dpa2knOiAnYnMud2lraXBlZGlhLm9yZycsXG4gICdic3dpa3Rpb25hcnknOiAnYnMud2lrdGlvbmFyeS5vcmcnLFxuICAnYnN3aWtpYm9va3MnOiAnYnMud2lraWJvb2tzLm9yZycsXG4gICdic3dpa2luZXdzJzogJ2JzLndpa2luZXdzLm9yZycsXG4gICdic3dpa2lxdW90ZSc6ICdicy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jzd2lraXNvdXJjZSc6ICdicy53aWtpc291cmNlLm9yZycsXG4gICdidWd3aWtpJzogJ2J1Zy53aWtpcGVkaWEub3JnJyxcbiAgJ2J4cndpa2knOiAnYnhyLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWtpJzogJ2NhLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWt0aW9uYXJ5JzogJ2NhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nhd2lraWJvb2tzJzogJ2NhLndpa2lib29rcy5vcmcnLFxuICAnY2F3aWtpbmV3cyc6ICdjYS53aWtpbmV3cy5vcmcnLFxuICAnY2F3aWtpcXVvdGUnOiAnY2Eud2lraXF1b3RlLm9yZycsXG4gICdjYXdpa2lzb3VyY2UnOiAnY2Eud2lraXNvdXJjZS5vcmcnLFxuICAnY2JrX3phbXdpa2knOiAnY2JrLXphbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Nkb3dpa2knOiAnY2RvLndpa2lwZWRpYS5vcmcnLFxuICAnY2V3aWtpJzogJ2NlLndpa2lwZWRpYS5vcmcnLFxuICAnY2Vid2lraSc6ICdjZWIud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa2knOiAnY2gud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa3Rpb25hcnknOiAnY2gud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h3aWtpYm9va3MnOiAnY2gud2lraWJvb2tzLm9yZycsXG4gICdjaG93aWtpJzogJ2Noby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nocndpa2knOiAnY2hyLndpa2lwZWRpYS5vcmcnLFxuICAnY2hyd2lrdGlvbmFyeSc6ICdjaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h5d2lraSc6ICdjaHkud2lraXBlZGlhLm9yZycsXG4gICdja2J3aWtpJzogJ2NrYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lraSc6ICdjby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lrdGlvbmFyeSc6ICdjby53aWt0aW9uYXJ5Lm9yZycsXG4gICdjb3dpa2lib29rcyc6ICdjby53aWtpYm9va3Mub3JnJyxcbiAgJ2Nvd2lraXF1b3RlJzogJ2NvLndpa2lxdW90ZS5vcmcnLFxuICAnY3J3aWtpJzogJ2NyLndpa2lwZWRpYS5vcmcnLFxuICAnY3J3aWt0aW9uYXJ5JzogJ2NyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nyd2lraXF1b3RlJzogJ2NyLndpa2lxdW90ZS5vcmcnLFxuICAnY3Jod2lraSc6ICdjcmgud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa2knOiAnY3Mud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa3Rpb25hcnknOiAnY3Mud2lrdGlvbmFyeS5vcmcnLFxuICAnY3N3aWtpYm9va3MnOiAnY3Mud2lraWJvb2tzLm9yZycsXG4gICdjc3dpa2luZXdzJzogJ2NzLndpa2luZXdzLm9yZycsXG4gICdjc3dpa2lxdW90ZSc6ICdjcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Nzd2lraXNvdXJjZSc6ICdjcy53aWtpc291cmNlLm9yZycsXG4gICdjc3dpa2l2ZXJzaXR5JzogJ2NzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdjc2J3aWtpJzogJ2NzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2NzYndpa3Rpb25hcnknOiAnY3NiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2N1d2lraSc6ICdjdS53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraSc6ICdjdi53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraWJvb2tzJzogJ2N2Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpJzogJ2N5Lndpa2lwZWRpYS5vcmcnLFxuICAnY3l3aWt0aW9uYXJ5JzogJ2N5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2N5d2lraWJvb2tzJzogJ2N5Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpcXVvdGUnOiAnY3kud2lraXF1b3RlLm9yZycsXG4gICdjeXdpa2lzb3VyY2UnOiAnY3kud2lraXNvdXJjZS5vcmcnLFxuICAnZGF3aWtpJzogJ2RhLndpa2lwZWRpYS5vcmcnLFxuICAnZGF3aWt0aW9uYXJ5JzogJ2RhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rhd2lraWJvb2tzJzogJ2RhLndpa2lib29rcy5vcmcnLFxuICAnZGF3aWtpcXVvdGUnOiAnZGEud2lraXF1b3RlLm9yZycsXG4gICdkYXdpa2lzb3VyY2UnOiAnZGEud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpJzogJ2RlLndpa2lwZWRpYS5vcmcnLFxuICAnZGV3aWt0aW9uYXJ5JzogJ2RlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rld2lraWJvb2tzJzogJ2RlLndpa2lib29rcy5vcmcnLFxuICAnZGV3aWtpbmV3cyc6ICdkZS53aWtpbmV3cy5vcmcnLFxuICAnZGV3aWtpcXVvdGUnOiAnZGUud2lraXF1b3RlLm9yZycsXG4gICdkZXdpa2lzb3VyY2UnOiAnZGUud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpdmVyc2l0eSc6ICdkZS53aWtpdmVyc2l0eS5vcmcnLFxuICAnZGV3aWtpdm95YWdlJzogJ2RlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2RpcXdpa2knOiAnZGlxLndpa2lwZWRpYS5vcmcnLFxuICAnZHNid2lraSc6ICdkc2Iud2lraXBlZGlhLm9yZycsXG4gICdkdndpa2knOiAnZHYud2lraXBlZGlhLm9yZycsXG4gICdkdndpa3Rpb25hcnknOiAnZHYud2lrdGlvbmFyeS5vcmcnLFxuICAnZHp3aWtpJzogJ2R6Lndpa2lwZWRpYS5vcmcnLFxuICAnZHp3aWt0aW9uYXJ5JzogJ2R6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vld2lraSc6ICdlZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lraSc6ICdlbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lrdGlvbmFyeSc6ICdlbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbHdpa2lib29rcyc6ICdlbC53aWtpYm9va3Mub3JnJyxcbiAgJ2Vsd2lraW5ld3MnOiAnZWwud2lraW5ld3Mub3JnJyxcbiAgJ2Vsd2lraXF1b3RlJzogJ2VsLndpa2lxdW90ZS5vcmcnLFxuICAnZWx3aWtpc291cmNlJzogJ2VsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vsd2lraXZlcnNpdHknOiAnZWwud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vsd2lraXZveWFnZSc6ICdlbC53aWtpdm95YWdlLm9yZycsXG4gICdlbWx3aWtpJzogJ2VtbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lraSc6ICdlbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lrdGlvbmFyeSc6ICdlbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbndpa2lib29rcyc6ICdlbi53aWtpYm9va3Mub3JnJyxcbiAgJ2Vud2lraW5ld3MnOiAnZW4ud2lraW5ld3Mub3JnJyxcbiAgJ2Vud2lraXF1b3RlJzogJ2VuLndpa2lxdW90ZS5vcmcnLFxuICAnZW53aWtpc291cmNlJzogJ2VuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vud2lraXZlcnNpdHknOiAnZW4ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vud2lraXZveWFnZSc6ICdlbi53aWtpdm95YWdlLm9yZycsXG4gICdlb3dpa2knOiAnZW8ud2lraXBlZGlhLm9yZycsXG4gICdlb3dpa3Rpb25hcnknOiAnZW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnZW93aWtpYm9va3MnOiAnZW8ud2lraWJvb2tzLm9yZycsXG4gICdlb3dpa2luZXdzJzogJ2VvLndpa2luZXdzLm9yZycsXG4gICdlb3dpa2lxdW90ZSc6ICdlby53aWtpcXVvdGUub3JnJyxcbiAgJ2Vvd2lraXNvdXJjZSc6ICdlby53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2knOiAnZXMud2lraXBlZGlhLm9yZycsXG4gICdlc3dpa3Rpb25hcnknOiAnZXMud2lrdGlvbmFyeS5vcmcnLFxuICAnZXN3aWtpYm9va3MnOiAnZXMud2lraWJvb2tzLm9yZycsXG4gICdlc3dpa2luZXdzJzogJ2VzLndpa2luZXdzLm9yZycsXG4gICdlc3dpa2lxdW90ZSc6ICdlcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Vzd2lraXNvdXJjZSc6ICdlcy53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2l2ZXJzaXR5JzogJ2VzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlc3dpa2l2b3lhZ2UnOiAnZXMud2lraXZveWFnZS5vcmcnLFxuICAnZXR3aWtpJzogJ2V0Lndpa2lwZWRpYS5vcmcnLFxuICAnZXR3aWt0aW9uYXJ5JzogJ2V0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V0d2lraWJvb2tzJzogJ2V0Lndpa2lib29rcy5vcmcnLFxuICAnZXR3aWtpcXVvdGUnOiAnZXQud2lraXF1b3RlLm9yZycsXG4gICdldHdpa2lzb3VyY2UnOiAnZXQud2lraXNvdXJjZS5vcmcnLFxuICAnZXV3aWtpJzogJ2V1Lndpa2lwZWRpYS5vcmcnLFxuICAnZXV3aWt0aW9uYXJ5JzogJ2V1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V1d2lraWJvb2tzJzogJ2V1Lndpa2lib29rcy5vcmcnLFxuICAnZXV3aWtpcXVvdGUnOiAnZXUud2lraXF1b3RlLm9yZycsXG4gICdleHR3aWtpJzogJ2V4dC53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lraSc6ICdmYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lrdGlvbmFyeSc6ICdmYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmYXdpa2lib29rcyc6ICdmYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Zhd2lraW5ld3MnOiAnZmEud2lraW5ld3Mub3JnJyxcbiAgJ2Zhd2lraXF1b3RlJzogJ2ZhLndpa2lxdW90ZS5vcmcnLFxuICAnZmF3aWtpc291cmNlJzogJ2ZhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zhd2lraXZveWFnZSc6ICdmYS53aWtpdm95YWdlLm9yZycsXG4gICdmZndpa2knOiAnZmYud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa2knOiAnZmkud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa3Rpb25hcnknOiAnZmkud2lrdGlvbmFyeS5vcmcnLFxuICAnZml3aWtpYm9va3MnOiAnZmkud2lraWJvb2tzLm9yZycsXG4gICdmaXdpa2luZXdzJzogJ2ZpLndpa2luZXdzLm9yZycsXG4gICdmaXdpa2lxdW90ZSc6ICdmaS53aWtpcXVvdGUub3JnJyxcbiAgJ2Zpd2lraXNvdXJjZSc6ICdmaS53aWtpc291cmNlLm9yZycsXG4gICdmaXdpa2l2ZXJzaXR5JzogJ2ZpLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdmaXVfdnJvd2lraSc6ICdmaXUtdnJvLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWtpJzogJ2ZqLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWt0aW9uYXJ5JzogJ2ZqLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zvd2lraSc6ICdmby53aWtpcGVkaWEub3JnJyxcbiAgJ2Zvd2lrdGlvbmFyeSc6ICdmby53aWt0aW9uYXJ5Lm9yZycsXG4gICdmb3dpa2lzb3VyY2UnOiAnZm8ud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpJzogJ2ZyLndpa2lwZWRpYS5vcmcnLFxuICAnZnJ3aWt0aW9uYXJ5JzogJ2ZyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zyd2lraWJvb2tzJzogJ2ZyLndpa2lib29rcy5vcmcnLFxuICAnZnJ3aWtpbmV3cyc6ICdmci53aWtpbmV3cy5vcmcnLFxuICAnZnJ3aWtpcXVvdGUnOiAnZnIud2lraXF1b3RlLm9yZycsXG4gICdmcndpa2lzb3VyY2UnOiAnZnIud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpdmVyc2l0eSc6ICdmci53aWtpdmVyc2l0eS5vcmcnLFxuICAnZnJ3aWtpdm95YWdlJzogJ2ZyLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2ZycHdpa2knOiAnZnJwLndpa2lwZWRpYS5vcmcnLFxuICAnZnJyd2lraSc6ICdmcnIud2lraXBlZGlhLm9yZycsXG4gICdmdXJ3aWtpJzogJ2Z1ci53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lraSc6ICdmeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lrdGlvbmFyeSc6ICdmeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmeXdpa2lib29rcyc6ICdmeS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraSc6ICdnYS53aWtpcGVkaWEub3JnJyxcbiAgJ2dhd2lrdGlvbmFyeSc6ICdnYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdnYXdpa2lib29rcyc6ICdnYS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraXF1b3RlJzogJ2dhLndpa2lxdW90ZS5vcmcnLFxuICAnZ2Fnd2lraSc6ICdnYWcud2lraXBlZGlhLm9yZycsXG4gICdnYW53aWtpJzogJ2dhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lraSc6ICdnZC53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lrdGlvbmFyeSc6ICdnZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbHdpa2knOiAnZ2wud2lraXBlZGlhLm9yZycsXG4gICdnbHdpa3Rpb25hcnknOiAnZ2wud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2x3aWtpYm9va3MnOiAnZ2wud2lraWJvb2tzLm9yZycsXG4gICdnbHdpa2lxdW90ZSc6ICdnbC53aWtpcXVvdGUub3JnJyxcbiAgJ2dsd2lraXNvdXJjZSc6ICdnbC53aWtpc291cmNlLm9yZycsXG4gICdnbGt3aWtpJzogJ2dsay53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lraSc6ICdnbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lrdGlvbmFyeSc6ICdnbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbndpa2lib29rcyc6ICdnbi53aWtpYm9va3Mub3JnJyxcbiAgJ2dvbXdpa2knOiAnZ29tLndpa2lwZWRpYS5vcmcnLFxuICAnZ290d2lraSc6ICdnb3Qud2lraXBlZGlhLm9yZycsXG4gICdnb3R3aWtpYm9va3MnOiAnZ290Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpJzogJ2d1Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3V3aWt0aW9uYXJ5JzogJ2d1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2d1d2lraWJvb2tzJzogJ2d1Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpcXVvdGUnOiAnZ3Uud2lraXF1b3RlLm9yZycsXG4gICdndXdpa2lzb3VyY2UnOiAnZ3Uud2lraXNvdXJjZS5vcmcnLFxuICAnZ3Z3aWtpJzogJ2d2Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3Z3aWt0aW9uYXJ5JzogJ2d2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2hhd2lraSc6ICdoYS53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd2lrdGlvbmFyeSc6ICdoYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoYWt3aWtpJzogJ2hhay53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd3dpa2knOiAnaGF3Lndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWtpJzogJ2hlLndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWt0aW9uYXJ5JzogJ2hlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hld2lraWJvb2tzJzogJ2hlLndpa2lib29rcy5vcmcnLFxuICAnaGV3aWtpbmV3cyc6ICdoZS53aWtpbmV3cy5vcmcnLFxuICAnaGV3aWtpcXVvdGUnOiAnaGUud2lraXF1b3RlLm9yZycsXG4gICdoZXdpa2lzb3VyY2UnOiAnaGUud2lraXNvdXJjZS5vcmcnLFxuICAnaGV3aWtpdm95YWdlJzogJ2hlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2hpd2lraSc6ICdoaS53aWtpcGVkaWEub3JnJyxcbiAgJ2hpd2lrdGlvbmFyeSc6ICdoaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoaXdpa2lib29rcyc6ICdoaS53aWtpYm9va3Mub3JnJyxcbiAgJ2hpd2lraXF1b3RlJzogJ2hpLndpa2lxdW90ZS5vcmcnLFxuICAnaGlmd2lraSc6ICdoaWYud2lraXBlZGlhLm9yZycsXG4gICdob3dpa2knOiAnaG8ud2lraXBlZGlhLm9yZycsXG4gICdocndpa2knOiAnaHIud2lraXBlZGlhLm9yZycsXG4gICdocndpa3Rpb25hcnknOiAnaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnaHJ3aWtpYm9va3MnOiAnaHIud2lraWJvb2tzLm9yZycsXG4gICdocndpa2lxdW90ZSc6ICdoci53aWtpcXVvdGUub3JnJyxcbiAgJ2hyd2lraXNvdXJjZSc6ICdoci53aWtpc291cmNlLm9yZycsXG4gICdoc2J3aWtpJzogJ2hzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2hzYndpa3Rpb25hcnknOiAnaHNiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2h0d2lraSc6ICdodC53aWtpcGVkaWEub3JnJyxcbiAgJ2h0d2lraXNvdXJjZSc6ICdodC53aWtpc291cmNlLm9yZycsXG4gICdodXdpa2knOiAnaHUud2lraXBlZGlhLm9yZycsXG4gICdodXdpa3Rpb25hcnknOiAnaHUud2lrdGlvbmFyeS5vcmcnLFxuICAnaHV3aWtpYm9va3MnOiAnaHUud2lraWJvb2tzLm9yZycsXG4gICdodXdpa2luZXdzJzogJ2h1Lndpa2luZXdzLm9yZycsXG4gICdodXdpa2lxdW90ZSc6ICdodS53aWtpcXVvdGUub3JnJyxcbiAgJ2h1d2lraXNvdXJjZSc6ICdodS53aWtpc291cmNlLm9yZycsXG4gICdoeXdpa2knOiAnaHkud2lraXBlZGlhLm9yZycsXG4gICdoeXdpa3Rpb25hcnknOiAnaHkud2lrdGlvbmFyeS5vcmcnLFxuICAnaHl3aWtpYm9va3MnOiAnaHkud2lraWJvb2tzLm9yZycsXG4gICdoeXdpa2lxdW90ZSc6ICdoeS53aWtpcXVvdGUub3JnJyxcbiAgJ2h5d2lraXNvdXJjZSc6ICdoeS53aWtpc291cmNlLm9yZycsXG4gICdoendpa2knOiAnaHoud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa2knOiAnaWEud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa3Rpb25hcnknOiAnaWEud2lrdGlvbmFyeS5vcmcnLFxuICAnaWF3aWtpYm9va3MnOiAnaWEud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2knOiAnaWQud2lraXBlZGlhLm9yZycsXG4gICdpZHdpa3Rpb25hcnknOiAnaWQud2lrdGlvbmFyeS5vcmcnLFxuICAnaWR3aWtpYm9va3MnOiAnaWQud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2lxdW90ZSc6ICdpZC53aWtpcXVvdGUub3JnJyxcbiAgJ2lkd2lraXNvdXJjZSc6ICdpZC53aWtpc291cmNlLm9yZycsXG4gICdpZXdpa2knOiAnaWUud2lraXBlZGlhLm9yZycsXG4gICdpZXdpa3Rpb25hcnknOiAnaWUud2lrdGlvbmFyeS5vcmcnLFxuICAnaWV3aWtpYm9va3MnOiAnaWUud2lraWJvb2tzLm9yZycsXG4gICdpZ3dpa2knOiAnaWcud2lraXBlZGlhLm9yZycsXG4gICdpaXdpa2knOiAnaWkud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa2knOiAnaWsud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa3Rpb25hcnknOiAnaWsud2lrdGlvbmFyeS5vcmcnLFxuICAnaWxvd2lraSc6ICdpbG8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa2knOiAnaW8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa3Rpb25hcnknOiAnaW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnaXN3aWtpJzogJ2lzLndpa2lwZWRpYS5vcmcnLFxuICAnaXN3aWt0aW9uYXJ5JzogJ2lzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lzd2lraWJvb2tzJzogJ2lzLndpa2lib29rcy5vcmcnLFxuICAnaXN3aWtpcXVvdGUnOiAnaXMud2lraXF1b3RlLm9yZycsXG4gICdpc3dpa2lzb3VyY2UnOiAnaXMud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpJzogJ2l0Lndpa2lwZWRpYS5vcmcnLFxuICAnaXR3aWt0aW9uYXJ5JzogJ2l0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2l0d2lraWJvb2tzJzogJ2l0Lndpa2lib29rcy5vcmcnLFxuICAnaXR3aWtpbmV3cyc6ICdpdC53aWtpbmV3cy5vcmcnLFxuICAnaXR3aWtpcXVvdGUnOiAnaXQud2lraXF1b3RlLm9yZycsXG4gICdpdHdpa2lzb3VyY2UnOiAnaXQud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpdmVyc2l0eSc6ICdpdC53aWtpdmVyc2l0eS5vcmcnLFxuICAnaXR3aWtpdm95YWdlJzogJ2l0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2l1d2lraSc6ICdpdS53aWtpcGVkaWEub3JnJyxcbiAgJ2l1d2lrdGlvbmFyeSc6ICdpdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdqYXdpa2knOiAnamEud2lraXBlZGlhLm9yZycsXG4gICdqYXdpa3Rpb25hcnknOiAnamEud2lrdGlvbmFyeS5vcmcnLFxuICAnamF3aWtpYm9va3MnOiAnamEud2lraWJvb2tzLm9yZycsXG4gICdqYXdpa2luZXdzJzogJ2phLndpa2luZXdzLm9yZycsXG4gICdqYXdpa2lxdW90ZSc6ICdqYS53aWtpcXVvdGUub3JnJyxcbiAgJ2phd2lraXNvdXJjZSc6ICdqYS53aWtpc291cmNlLm9yZycsXG4gICdqYXdpa2l2ZXJzaXR5JzogJ2phLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdqYm93aWtpJzogJ2piby53aWtpcGVkaWEub3JnJyxcbiAgJ2pib3dpa3Rpb25hcnknOiAnamJvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2p2d2lraSc6ICdqdi53aWtpcGVkaWEub3JnJyxcbiAgJ2p2d2lrdGlvbmFyeSc6ICdqdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrYXdpa2knOiAna2Eud2lraXBlZGlhLm9yZycsXG4gICdrYXdpa3Rpb25hcnknOiAna2Eud2lrdGlvbmFyeS5vcmcnLFxuICAna2F3aWtpYm9va3MnOiAna2Eud2lraWJvb2tzLm9yZycsXG4gICdrYXdpa2lxdW90ZSc6ICdrYS53aWtpcXVvdGUub3JnJyxcbiAgJ2thYXdpa2knOiAna2FhLndpa2lwZWRpYS5vcmcnLFxuICAna2Fid2lraSc6ICdrYWIud2lraXBlZGlhLm9yZycsXG4gICdrYmR3aWtpJzogJ2tiZC53aWtpcGVkaWEub3JnJyxcbiAgJ2tnd2lraSc6ICdrZy53aWtpcGVkaWEub3JnJyxcbiAgJ2tpd2lraSc6ICdraS53aWtpcGVkaWEub3JnJyxcbiAgJ2tqd2lraSc6ICdrai53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lraSc6ICdray53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lrdGlvbmFyeSc6ICdray53aWt0aW9uYXJ5Lm9yZycsXG4gICdra3dpa2lib29rcyc6ICdray53aWtpYm9va3Mub3JnJyxcbiAgJ2trd2lraXF1b3RlJzogJ2trLndpa2lxdW90ZS5vcmcnLFxuICAna2x3aWtpJzogJ2tsLndpa2lwZWRpYS5vcmcnLFxuICAna2x3aWt0aW9uYXJ5JzogJ2tsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2ttd2lraSc6ICdrbS53aWtpcGVkaWEub3JnJyxcbiAgJ2ttd2lrdGlvbmFyeSc6ICdrbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbXdpa2lib29rcyc6ICdrbS53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraSc6ICdrbi53aWtpcGVkaWEub3JnJyxcbiAgJ2tud2lrdGlvbmFyeSc6ICdrbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbndpa2lib29rcyc6ICdrbi53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraXF1b3RlJzogJ2tuLndpa2lxdW90ZS5vcmcnLFxuICAna253aWtpc291cmNlJzogJ2tuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraSc6ICdrby53aWtpcGVkaWEub3JnJyxcbiAgJ2tvd2lrdGlvbmFyeSc6ICdrby53aWt0aW9uYXJ5Lm9yZycsXG4gICdrb3dpa2lib29rcyc6ICdrby53aWtpYm9va3Mub3JnJyxcbiAgJ2tvd2lraW5ld3MnOiAna28ud2lraW5ld3Mub3JnJyxcbiAgJ2tvd2lraXF1b3RlJzogJ2tvLndpa2lxdW90ZS5vcmcnLFxuICAna293aWtpc291cmNlJzogJ2tvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraXZlcnNpdHknOiAna28ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2tvaXdpa2knOiAna29pLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpJzogJ2tyLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpcXVvdGUnOiAna3Iud2lraXF1b3RlLm9yZycsXG4gICdrcmN3aWtpJzogJ2tyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lraSc6ICdrcy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lrdGlvbmFyeSc6ICdrcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrc3dpa2lib29rcyc6ICdrcy53aWtpYm9va3Mub3JnJyxcbiAgJ2tzd2lraXF1b3RlJzogJ2tzLndpa2lxdW90ZS5vcmcnLFxuICAna3Nod2lraSc6ICdrc2gud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa2knOiAna3Uud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa3Rpb25hcnknOiAna3Uud2lrdGlvbmFyeS5vcmcnLFxuICAna3V3aWtpYm9va3MnOiAna3Uud2lraWJvb2tzLm9yZycsXG4gICdrdXdpa2lxdW90ZSc6ICdrdS53aWtpcXVvdGUub3JnJyxcbiAgJ2t2d2lraSc6ICdrdi53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lraSc6ICdrdy53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lrdGlvbmFyeSc6ICdrdy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrd3dpa2lxdW90ZSc6ICdrdy53aWtpcXVvdGUub3JnJyxcbiAgJ2t5d2lraSc6ICdreS53aWtpcGVkaWEub3JnJyxcbiAgJ2t5d2lrdGlvbmFyeSc6ICdreS53aWt0aW9uYXJ5Lm9yZycsXG4gICdreXdpa2lib29rcyc6ICdreS53aWtpYm9va3Mub3JnJyxcbiAgJ2t5d2lraXF1b3RlJzogJ2t5Lndpa2lxdW90ZS5vcmcnLFxuICAnbGF3aWtpJzogJ2xhLndpa2lwZWRpYS5vcmcnLFxuICAnbGF3aWt0aW9uYXJ5JzogJ2xhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xhd2lraWJvb2tzJzogJ2xhLndpa2lib29rcy5vcmcnLFxuICAnbGF3aWtpcXVvdGUnOiAnbGEud2lraXF1b3RlLm9yZycsXG4gICdsYXdpa2lzb3VyY2UnOiAnbGEud2lraXNvdXJjZS5vcmcnLFxuICAnbGFkd2lraSc6ICdsYWQud2lraXBlZGlhLm9yZycsXG4gICdsYndpa2knOiAnbGIud2lraXBlZGlhLm9yZycsXG4gICdsYndpa3Rpb25hcnknOiAnbGIud2lrdGlvbmFyeS5vcmcnLFxuICAnbGJ3aWtpYm9va3MnOiAnbGIud2lraWJvb2tzLm9yZycsXG4gICdsYndpa2lxdW90ZSc6ICdsYi53aWtpcXVvdGUub3JnJyxcbiAgJ2xiZXdpa2knOiAnbGJlLndpa2lwZWRpYS5vcmcnLFxuICAnbGV6d2lraSc6ICdsZXoud2lraXBlZGlhLm9yZycsXG4gICdsZ3dpa2knOiAnbGcud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa2knOiAnbGkud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa3Rpb25hcnknOiAnbGkud2lrdGlvbmFyeS5vcmcnLFxuICAnbGl3aWtpYm9va3MnOiAnbGkud2lraWJvb2tzLm9yZycsXG4gICdsaXdpa2lxdW90ZSc6ICdsaS53aWtpcXVvdGUub3JnJyxcbiAgJ2xpd2lraXNvdXJjZSc6ICdsaS53aWtpc291cmNlLm9yZycsXG4gICdsaWp3aWtpJzogJ2xpai53aWtpcGVkaWEub3JnJyxcbiAgJ2xtb3dpa2knOiAnbG1vLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWtpJzogJ2xuLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWt0aW9uYXJ5JzogJ2xuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xud2lraWJvb2tzJzogJ2xuLndpa2lib29rcy5vcmcnLFxuICAnbG93aWtpJzogJ2xvLndpa2lwZWRpYS5vcmcnLFxuICAnbG93aWt0aW9uYXJ5JzogJ2xvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xyY3dpa2knOiAnbHJjLndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWtpJzogJ2x0Lndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWt0aW9uYXJ5JzogJ2x0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2x0d2lraWJvb2tzJzogJ2x0Lndpa2lib29rcy5vcmcnLFxuICAnbHR3aWtpcXVvdGUnOiAnbHQud2lraXF1b3RlLm9yZycsXG4gICdsdHdpa2lzb3VyY2UnOiAnbHQud2lraXNvdXJjZS5vcmcnLFxuICAnbHRnd2lraSc6ICdsdGcud2lraXBlZGlhLm9yZycsXG4gICdsdndpa2knOiAnbHYud2lraXBlZGlhLm9yZycsXG4gICdsdndpa3Rpb25hcnknOiAnbHYud2lrdGlvbmFyeS5vcmcnLFxuICAnbHZ3aWtpYm9va3MnOiAnbHYud2lraWJvb2tzLm9yZycsXG4gICdtYWl3aWtpJzogJ21haS53aWtpcGVkaWEub3JnJyxcbiAgJ21hcF9ibXN3aWtpJzogJ21hcC1ibXMud2lraXBlZGlhLm9yZycsXG4gICdtZGZ3aWtpJzogJ21kZi53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lraSc6ICdtZy53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lrdGlvbmFyeSc6ICdtZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtZ3dpa2lib29rcyc6ICdtZy53aWtpYm9va3Mub3JnJyxcbiAgJ21od2lraSc6ICdtaC53aWtpcGVkaWEub3JnJyxcbiAgJ21od2lrdGlvbmFyeSc6ICdtaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaHJ3aWtpJzogJ21oci53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lraSc6ICdtaS53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lrdGlvbmFyeSc6ICdtaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaXdpa2lib29rcyc6ICdtaS53aWtpYm9va3Mub3JnJyxcbiAgJ21pbndpa2knOiAnbWluLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWtpJzogJ21rLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWt0aW9uYXJ5JzogJ21rLndpa3Rpb25hcnkub3JnJyxcbiAgJ21rd2lraWJvb2tzJzogJ21rLndpa2lib29rcy5vcmcnLFxuICAnbWt3aWtpc291cmNlJzogJ21rLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21sd2lraSc6ICdtbC53aWtpcGVkaWEub3JnJyxcbiAgJ21sd2lrdGlvbmFyeSc6ICdtbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbHdpa2lib29rcyc6ICdtbC53aWtpYm9va3Mub3JnJyxcbiAgJ21sd2lraXF1b3RlJzogJ21sLndpa2lxdW90ZS5vcmcnLFxuICAnbWx3aWtpc291cmNlJzogJ21sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21ud2lraSc6ICdtbi53aWtpcGVkaWEub3JnJyxcbiAgJ21ud2lrdGlvbmFyeSc6ICdtbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbndpa2lib29rcyc6ICdtbi53aWtpYm9va3Mub3JnJyxcbiAgJ21vd2lraSc6ICdtby53aWtpcGVkaWEub3JnJyxcbiAgJ21vd2lrdGlvbmFyeSc6ICdtby53aWt0aW9uYXJ5Lm9yZycsXG4gICdtcndpa2knOiAnbXIud2lraXBlZGlhLm9yZycsXG4gICdtcndpa3Rpb25hcnknOiAnbXIud2lrdGlvbmFyeS5vcmcnLFxuICAnbXJ3aWtpYm9va3MnOiAnbXIud2lraWJvb2tzLm9yZycsXG4gICdtcndpa2lxdW90ZSc6ICdtci53aWtpcXVvdGUub3JnJyxcbiAgJ21yd2lraXNvdXJjZSc6ICdtci53aWtpc291cmNlLm9yZycsXG4gICdtcmp3aWtpJzogJ21yai53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lraSc6ICdtcy53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lrdGlvbmFyeSc6ICdtcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtc3dpa2lib29rcyc6ICdtcy53aWtpYm9va3Mub3JnJyxcbiAgJ210d2lraSc6ICdtdC53aWtpcGVkaWEub3JnJyxcbiAgJ210d2lrdGlvbmFyeSc6ICdtdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtdXN3aWtpJzogJ211cy53aWtpcGVkaWEub3JnJyxcbiAgJ213bHdpa2knOiAnbXdsLndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWtpJzogJ215Lndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWt0aW9uYXJ5JzogJ215Lndpa3Rpb25hcnkub3JnJyxcbiAgJ215d2lraWJvb2tzJzogJ215Lndpa2lib29rcy5vcmcnLFxuICAnbXl2d2lraSc6ICdteXYud2lraXBlZGlhLm9yZycsXG4gICdtem53aWtpJzogJ216bi53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lraSc6ICduYS53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lrdGlvbmFyeSc6ICduYS53aWt0aW9uYXJ5Lm9yZycsXG4gICduYXdpa2lib29rcyc6ICduYS53aWtpYm9va3Mub3JnJyxcbiAgJ25hd2lraXF1b3RlJzogJ25hLndpa2lxdW90ZS5vcmcnLFxuICAnbmFod2lraSc6ICduYWgud2lraXBlZGlhLm9yZycsXG4gICduYWh3aWt0aW9uYXJ5JzogJ25haC53aWt0aW9uYXJ5Lm9yZycsXG4gICduYWh3aWtpYm9va3MnOiAnbmFoLndpa2lib29rcy5vcmcnLFxuICAnbmFwd2lraSc6ICduYXAud2lraXBlZGlhLm9yZycsXG4gICduZHN3aWtpJzogJ25kcy53aWtpcGVkaWEub3JnJyxcbiAgJ25kc3dpa3Rpb25hcnknOiAnbmRzLndpa3Rpb25hcnkub3JnJyxcbiAgJ25kc3dpa2lib29rcyc6ICduZHMud2lraWJvb2tzLm9yZycsXG4gICduZHN3aWtpcXVvdGUnOiAnbmRzLndpa2lxdW90ZS5vcmcnLFxuICAnbmRzX25sd2lraSc6ICduZHMtbmwud2lraXBlZGlhLm9yZycsXG4gICduZXdpa2knOiAnbmUud2lraXBlZGlhLm9yZycsXG4gICduZXdpa3Rpb25hcnknOiAnbmUud2lrdGlvbmFyeS5vcmcnLFxuICAnbmV3aWtpYm9va3MnOiAnbmUud2lraWJvb2tzLm9yZycsXG4gICduZXd3aWtpJzogJ25ldy53aWtpcGVkaWEub3JnJyxcbiAgJ25nd2lraSc6ICduZy53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lraSc6ICdubC53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lrdGlvbmFyeSc6ICdubC53aWt0aW9uYXJ5Lm9yZycsXG4gICdubHdpa2lib29rcyc6ICdubC53aWtpYm9va3Mub3JnJyxcbiAgJ25sd2lraW5ld3MnOiAnbmwud2lraW5ld3Mub3JnJyxcbiAgJ25sd2lraXF1b3RlJzogJ25sLndpa2lxdW90ZS5vcmcnLFxuICAnbmx3aWtpc291cmNlJzogJ25sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ25sd2lraXZveWFnZSc6ICdubC53aWtpdm95YWdlLm9yZycsXG4gICdubndpa2knOiAnbm4ud2lraXBlZGlhLm9yZycsXG4gICdubndpa3Rpb25hcnknOiAnbm4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm53aWtpcXVvdGUnOiAnbm4ud2lraXF1b3RlLm9yZycsXG4gICdub3dpa2knOiAnbm8ud2lraXBlZGlhLm9yZycsXG4gICdub3dpa3Rpb25hcnknOiAnbm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm93aWtpYm9va3MnOiAnbm8ud2lraWJvb2tzLm9yZycsXG4gICdub3dpa2luZXdzJzogJ25vLndpa2luZXdzLm9yZycsXG4gICdub3dpa2lxdW90ZSc6ICduby53aWtpcXVvdGUub3JnJyxcbiAgJ25vd2lraXNvdXJjZSc6ICduby53aWtpc291cmNlLm9yZycsXG4gICdub3Z3aWtpJzogJ25vdi53aWtpcGVkaWEub3JnJyxcbiAgJ25ybXdpa2knOiAnbnJtLndpa2lwZWRpYS5vcmcnLFxuICAnbnNvd2lraSc6ICduc28ud2lraXBlZGlhLm9yZycsXG4gICdudndpa2knOiAnbnYud2lraXBlZGlhLm9yZycsXG4gICdueXdpa2knOiAnbnkud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa2knOiAnb2Mud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa3Rpb25hcnknOiAnb2Mud2lrdGlvbmFyeS5vcmcnLFxuICAnb2N3aWtpYm9va3MnOiAnb2Mud2lraWJvb2tzLm9yZycsXG4gICdvbXdpa2knOiAnb20ud2lraXBlZGlhLm9yZycsXG4gICdvbXdpa3Rpb25hcnknOiAnb20ud2lrdGlvbmFyeS5vcmcnLFxuICAnb3J3aWtpJzogJ29yLndpa2lwZWRpYS5vcmcnLFxuICAnb3J3aWt0aW9uYXJ5JzogJ29yLndpa3Rpb25hcnkub3JnJyxcbiAgJ29yd2lraXNvdXJjZSc6ICdvci53aWtpc291cmNlLm9yZycsXG4gICdvc3dpa2knOiAnb3Mud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa2knOiAncGEud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa3Rpb25hcnknOiAncGEud2lrdGlvbmFyeS5vcmcnLFxuICAncGF3aWtpYm9va3MnOiAncGEud2lraWJvb2tzLm9yZycsXG4gICdwYWd3aWtpJzogJ3BhZy53aWtpcGVkaWEub3JnJyxcbiAgJ3BhbXdpa2knOiAncGFtLndpa2lwZWRpYS5vcmcnLFxuICAncGFwd2lraSc6ICdwYXAud2lraXBlZGlhLm9yZycsXG4gICdwY2R3aWtpJzogJ3BjZC53aWtpcGVkaWEub3JnJyxcbiAgJ3BkY3dpa2knOiAncGRjLndpa2lwZWRpYS5vcmcnLFxuICAncGZsd2lraSc6ICdwZmwud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa2knOiAncGkud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa3Rpb25hcnknOiAncGkud2lrdGlvbmFyeS5vcmcnLFxuICAncGlod2lraSc6ICdwaWgud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa2knOiAncGwud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa3Rpb25hcnknOiAncGwud2lrdGlvbmFyeS5vcmcnLFxuICAncGx3aWtpYm9va3MnOiAncGwud2lraWJvb2tzLm9yZycsXG4gICdwbHdpa2luZXdzJzogJ3BsLndpa2luZXdzLm9yZycsXG4gICdwbHdpa2lxdW90ZSc6ICdwbC53aWtpcXVvdGUub3JnJyxcbiAgJ3Bsd2lraXNvdXJjZSc6ICdwbC53aWtpc291cmNlLm9yZycsXG4gICdwbHdpa2l2b3lhZ2UnOiAncGwud2lraXZveWFnZS5vcmcnLFxuICAncG1zd2lraSc6ICdwbXMud2lraXBlZGlhLm9yZycsXG4gICdwbmJ3aWtpJzogJ3BuYi53aWtpcGVkaWEub3JnJyxcbiAgJ3BuYndpa3Rpb25hcnknOiAncG5iLndpa3Rpb25hcnkub3JnJyxcbiAgJ3BudHdpa2knOiAncG50Lndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWtpJzogJ3BzLndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWt0aW9uYXJ5JzogJ3BzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bzd2lraWJvb2tzJzogJ3BzLndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpJzogJ3B0Lndpa2lwZWRpYS5vcmcnLFxuICAncHR3aWt0aW9uYXJ5JzogJ3B0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3B0d2lraWJvb2tzJzogJ3B0Lndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpbmV3cyc6ICdwdC53aWtpbmV3cy5vcmcnLFxuICAncHR3aWtpcXVvdGUnOiAncHQud2lraXF1b3RlLm9yZycsXG4gICdwdHdpa2lzb3VyY2UnOiAncHQud2lraXNvdXJjZS5vcmcnLFxuICAncHR3aWtpdmVyc2l0eSc6ICdwdC53aWtpdmVyc2l0eS5vcmcnLFxuICAncHR3aWtpdm95YWdlJzogJ3B0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3F1d2lraSc6ICdxdS53aWtpcGVkaWEub3JnJyxcbiAgJ3F1d2lrdGlvbmFyeSc6ICdxdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdxdXdpa2lib29rcyc6ICdxdS53aWtpYm9va3Mub3JnJyxcbiAgJ3F1d2lraXF1b3RlJzogJ3F1Lndpa2lxdW90ZS5vcmcnLFxuICAncm13aWtpJzogJ3JtLndpa2lwZWRpYS5vcmcnLFxuICAncm13aWt0aW9uYXJ5JzogJ3JtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jtd2lraWJvb2tzJzogJ3JtLndpa2lib29rcy5vcmcnLFxuICAncm15d2lraSc6ICdybXkud2lraXBlZGlhLm9yZycsXG4gICdybndpa2knOiAncm4ud2lraXBlZGlhLm9yZycsXG4gICdybndpa3Rpb25hcnknOiAncm4ud2lrdGlvbmFyeS5vcmcnLFxuICAncm93aWtpJzogJ3JvLndpa2lwZWRpYS5vcmcnLFxuICAncm93aWt0aW9uYXJ5JzogJ3JvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jvd2lraWJvb2tzJzogJ3JvLndpa2lib29rcy5vcmcnLFxuICAncm93aWtpbmV3cyc6ICdyby53aWtpbmV3cy5vcmcnLFxuICAncm93aWtpcXVvdGUnOiAncm8ud2lraXF1b3RlLm9yZycsXG4gICdyb3dpa2lzb3VyY2UnOiAncm8ud2lraXNvdXJjZS5vcmcnLFxuICAncm93aWtpdm95YWdlJzogJ3JvLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3JvYV9ydXB3aWtpJzogJ3JvYS1ydXAud2lraXBlZGlhLm9yZycsXG4gICdyb2FfcnVwd2lrdGlvbmFyeSc6ICdyb2EtcnVwLndpa3Rpb25hcnkub3JnJyxcbiAgJ3JvYV90YXJhd2lraSc6ICdyb2EtdGFyYS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lraSc6ICdydS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lrdGlvbmFyeSc6ICdydS53aWt0aW9uYXJ5Lm9yZycsXG4gICdydXdpa2lib29rcyc6ICdydS53aWtpYm9va3Mub3JnJyxcbiAgJ3J1d2lraW5ld3MnOiAncnUud2lraW5ld3Mub3JnJyxcbiAgJ3J1d2lraXF1b3RlJzogJ3J1Lndpa2lxdW90ZS5vcmcnLFxuICAncnV3aWtpc291cmNlJzogJ3J1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3J1d2lraXZlcnNpdHknOiAncnUud2lraXZlcnNpdHkub3JnJyxcbiAgJ3J1d2lraXZveWFnZSc6ICdydS53aWtpdm95YWdlLm9yZycsXG4gICdydWV3aWtpJzogJ3J1ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lraSc6ICdydy53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lrdGlvbmFyeSc6ICdydy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzYXdpa2knOiAnc2Eud2lraXBlZGlhLm9yZycsXG4gICdzYXdpa3Rpb25hcnknOiAnc2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnc2F3aWtpYm9va3MnOiAnc2Eud2lraWJvb2tzLm9yZycsXG4gICdzYXdpa2lxdW90ZSc6ICdzYS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nhd2lraXNvdXJjZSc6ICdzYS53aWtpc291cmNlLm9yZycsXG4gICdzYWh3aWtpJzogJ3NhaC53aWtpcGVkaWEub3JnJyxcbiAgJ3NhaHdpa2lzb3VyY2UnOiAnc2FoLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Njd2lraSc6ICdzYy53aWtpcGVkaWEub3JnJyxcbiAgJ3Njd2lrdGlvbmFyeSc6ICdzYy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzY253aWtpJzogJ3Njbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Njbndpa3Rpb25hcnknOiAnc2NuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Njb3dpa2knOiAnc2NvLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWtpJzogJ3NkLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWt0aW9uYXJ5JzogJ3NkLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nkd2lraW5ld3MnOiAnc2Qud2lraW5ld3Mub3JnJyxcbiAgJ3Nld2lraSc6ICdzZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nld2lraWJvb2tzJzogJ3NlLndpa2lib29rcy5vcmcnLFxuICAnc2d3aWtpJzogJ3NnLndpa2lwZWRpYS5vcmcnLFxuICAnc2d3aWt0aW9uYXJ5JzogJ3NnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nod2lraSc6ICdzaC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nod2lrdGlvbmFyeSc6ICdzaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaXdpa2knOiAnc2kud2lraXBlZGlhLm9yZycsXG4gICdzaXdpa3Rpb25hcnknOiAnc2kud2lrdGlvbmFyeS5vcmcnLFxuICAnc2l3aWtpYm9va3MnOiAnc2kud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpJzogJ3NpbXBsZS53aWtpcGVkaWEub3JnJyxcbiAgJ3NpbXBsZXdpa3Rpb25hcnknOiAnc2ltcGxlLndpa3Rpb25hcnkub3JnJyxcbiAgJ3NpbXBsZXdpa2lib29rcyc6ICdzaW1wbGUud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpcXVvdGUnOiAnc2ltcGxlLndpa2lxdW90ZS5vcmcnLFxuICAnc2t3aWtpJzogJ3NrLndpa2lwZWRpYS5vcmcnLFxuICAnc2t3aWt0aW9uYXJ5JzogJ3NrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nrd2lraWJvb2tzJzogJ3NrLndpa2lib29rcy5vcmcnLFxuICAnc2t3aWtpcXVvdGUnOiAnc2sud2lraXF1b3RlLm9yZycsXG4gICdza3dpa2lzb3VyY2UnOiAnc2sud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpJzogJ3NsLndpa2lwZWRpYS5vcmcnLFxuICAnc2x3aWt0aW9uYXJ5JzogJ3NsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nsd2lraWJvb2tzJzogJ3NsLndpa2lib29rcy5vcmcnLFxuICAnc2x3aWtpcXVvdGUnOiAnc2wud2lraXF1b3RlLm9yZycsXG4gICdzbHdpa2lzb3VyY2UnOiAnc2wud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpdmVyc2l0eSc6ICdzbC53aWtpdmVyc2l0eS5vcmcnLFxuICAnc213aWtpJzogJ3NtLndpa2lwZWRpYS5vcmcnLFxuICAnc213aWt0aW9uYXJ5JzogJ3NtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nud2lraSc6ICdzbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nud2lrdGlvbmFyeSc6ICdzbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzb3dpa2knOiAnc28ud2lraXBlZGlhLm9yZycsXG4gICdzb3dpa3Rpb25hcnknOiAnc28ud2lrdGlvbmFyeS5vcmcnLFxuICAnc3F3aWtpJzogJ3NxLndpa2lwZWRpYS5vcmcnLFxuICAnc3F3aWt0aW9uYXJ5JzogJ3NxLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nxd2lraWJvb2tzJzogJ3NxLndpa2lib29rcy5vcmcnLFxuICAnc3F3aWtpbmV3cyc6ICdzcS53aWtpbmV3cy5vcmcnLFxuICAnc3F3aWtpcXVvdGUnOiAnc3Eud2lraXF1b3RlLm9yZycsXG4gICdzcndpa2knOiAnc3Iud2lraXBlZGlhLm9yZycsXG4gICdzcndpa3Rpb25hcnknOiAnc3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnc3J3aWtpYm9va3MnOiAnc3Iud2lraWJvb2tzLm9yZycsXG4gICdzcndpa2luZXdzJzogJ3NyLndpa2luZXdzLm9yZycsXG4gICdzcndpa2lxdW90ZSc6ICdzci53aWtpcXVvdGUub3JnJyxcbiAgJ3Nyd2lraXNvdXJjZSc6ICdzci53aWtpc291cmNlLm9yZycsXG4gICdzcm53aWtpJzogJ3Nybi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lraSc6ICdzcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lrdGlvbmFyeSc6ICdzcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdHdpa2knOiAnc3Qud2lraXBlZGlhLm9yZycsXG4gICdzdHdpa3Rpb25hcnknOiAnc3Qud2lrdGlvbmFyeS5vcmcnLFxuICAnc3Rxd2lraSc6ICdzdHEud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa2knOiAnc3Uud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa3Rpb25hcnknOiAnc3Uud2lrdGlvbmFyeS5vcmcnLFxuICAnc3V3aWtpYm9va3MnOiAnc3Uud2lraWJvb2tzLm9yZycsXG4gICdzdXdpa2lxdW90ZSc6ICdzdS53aWtpcXVvdGUub3JnJyxcbiAgJ3N2d2lraSc6ICdzdi53aWtpcGVkaWEub3JnJyxcbiAgJ3N2d2lrdGlvbmFyeSc6ICdzdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdndpa2lib29rcyc6ICdzdi53aWtpYm9va3Mub3JnJyxcbiAgJ3N2d2lraW5ld3MnOiAnc3Yud2lraW5ld3Mub3JnJyxcbiAgJ3N2d2lraXF1b3RlJzogJ3N2Lndpa2lxdW90ZS5vcmcnLFxuICAnc3Z3aWtpc291cmNlJzogJ3N2Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3N2d2lraXZlcnNpdHknOiAnc3Yud2lraXZlcnNpdHkub3JnJyxcbiAgJ3N2d2lraXZveWFnZSc6ICdzdi53aWtpdm95YWdlLm9yZycsXG4gICdzd3dpa2knOiAnc3cud2lraXBlZGlhLm9yZycsXG4gICdzd3dpa3Rpb25hcnknOiAnc3cud2lrdGlvbmFyeS5vcmcnLFxuICAnc3d3aWtpYm9va3MnOiAnc3cud2lraWJvb2tzLm9yZycsXG4gICdzemx3aWtpJzogJ3N6bC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lraSc6ICd0YS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lrdGlvbmFyeSc6ICd0YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0YXdpa2lib29rcyc6ICd0YS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rhd2lraW5ld3MnOiAndGEud2lraW5ld3Mub3JnJyxcbiAgJ3Rhd2lraXF1b3RlJzogJ3RhLndpa2lxdW90ZS5vcmcnLFxuICAndGF3aWtpc291cmNlJzogJ3RhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rld2lraSc6ICd0ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rld2lrdGlvbmFyeSc6ICd0ZS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0ZXdpa2lib29rcyc6ICd0ZS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rld2lraXF1b3RlJzogJ3RlLndpa2lxdW90ZS5vcmcnLFxuICAndGV3aWtpc291cmNlJzogJ3RlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3RldHdpa2knOiAndGV0Lndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWtpJzogJ3RnLndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWt0aW9uYXJ5JzogJ3RnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rnd2lraWJvb2tzJzogJ3RnLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpJzogJ3RoLndpa2lwZWRpYS5vcmcnLFxuICAndGh3aWt0aW9uYXJ5JzogJ3RoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rod2lraWJvb2tzJzogJ3RoLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpbmV3cyc6ICd0aC53aWtpbmV3cy5vcmcnLFxuICAndGh3aWtpcXVvdGUnOiAndGgud2lraXF1b3RlLm9yZycsXG4gICd0aHdpa2lzb3VyY2UnOiAndGgud2lraXNvdXJjZS5vcmcnLFxuICAndGl3aWtpJzogJ3RpLndpa2lwZWRpYS5vcmcnLFxuICAndGl3aWt0aW9uYXJ5JzogJ3RpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rrd2lraSc6ICd0ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Rrd2lrdGlvbmFyeSc6ICd0ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd0a3dpa2lib29rcyc6ICd0ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Rrd2lraXF1b3RlJzogJ3RrLndpa2lxdW90ZS5vcmcnLFxuICAndGx3aWtpJzogJ3RsLndpa2lwZWRpYS5vcmcnLFxuICAndGx3aWt0aW9uYXJ5JzogJ3RsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rsd2lraWJvb2tzJzogJ3RsLndpa2lib29rcy5vcmcnLFxuICAndG53aWtpJzogJ3RuLndpa2lwZWRpYS5vcmcnLFxuICAndG53aWt0aW9uYXJ5JzogJ3RuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rvd2lraSc6ICd0by53aWtpcGVkaWEub3JnJyxcbiAgJ3Rvd2lrdGlvbmFyeSc6ICd0by53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cGl3aWtpJzogJ3RwaS53aWtpcGVkaWEub3JnJyxcbiAgJ3RwaXdpa3Rpb25hcnknOiAndHBpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Ryd2lraSc6ICd0ci53aWtpcGVkaWEub3JnJyxcbiAgJ3Ryd2lrdGlvbmFyeSc6ICd0ci53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cndpa2lib29rcyc6ICd0ci53aWtpYm9va3Mub3JnJyxcbiAgJ3Ryd2lraW5ld3MnOiAndHIud2lraW5ld3Mub3JnJyxcbiAgJ3Ryd2lraXF1b3RlJzogJ3RyLndpa2lxdW90ZS5vcmcnLFxuICAndHJ3aWtpc291cmNlJzogJ3RyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rzd2lraSc6ICd0cy53aWtpcGVkaWEub3JnJyxcbiAgJ3Rzd2lrdGlvbmFyeSc6ICd0cy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0dHdpa2knOiAndHQud2lraXBlZGlhLm9yZycsXG4gICd0dHdpa3Rpb25hcnknOiAndHQud2lrdGlvbmFyeS5vcmcnLFxuICAndHR3aWtpYm9va3MnOiAndHQud2lraWJvb2tzLm9yZycsXG4gICd0dHdpa2lxdW90ZSc6ICd0dC53aWtpcXVvdGUub3JnJyxcbiAgJ3R1bXdpa2knOiAndHVtLndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWtpJzogJ3R3Lndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWt0aW9uYXJ5JzogJ3R3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3R5d2lraSc6ICd0eS53aWtpcGVkaWEub3JnJyxcbiAgJ3R5dndpa2knOiAndHl2Lndpa2lwZWRpYS5vcmcnLFxuICAndWRtd2lraSc6ICd1ZG0ud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa2knOiAndWcud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa3Rpb25hcnknOiAndWcud2lrdGlvbmFyeS5vcmcnLFxuICAndWd3aWtpYm9va3MnOiAndWcud2lraWJvb2tzLm9yZycsXG4gICd1Z3dpa2lxdW90ZSc6ICd1Zy53aWtpcXVvdGUub3JnJyxcbiAgJ3Vrd2lraSc6ICd1ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Vrd2lrdGlvbmFyeSc6ICd1ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd1a3dpa2lib29rcyc6ICd1ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Vrd2lraW5ld3MnOiAndWsud2lraW5ld3Mub3JnJyxcbiAgJ3Vrd2lraXF1b3RlJzogJ3VrLndpa2lxdW90ZS5vcmcnLFxuICAndWt3aWtpc291cmNlJzogJ3VrLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Vrd2lraXZveWFnZSc6ICd1ay53aWtpdm95YWdlLm9yZycsXG4gICd1cndpa2knOiAndXIud2lraXBlZGlhLm9yZycsXG4gICd1cndpa3Rpb25hcnknOiAndXIud2lrdGlvbmFyeS5vcmcnLFxuICAndXJ3aWtpYm9va3MnOiAndXIud2lraWJvb2tzLm9yZycsXG4gICd1cndpa2lxdW90ZSc6ICd1ci53aWtpcXVvdGUub3JnJyxcbiAgJ3V6d2lraSc6ICd1ei53aWtpcGVkaWEub3JnJyxcbiAgJ3V6d2lrdGlvbmFyeSc6ICd1ei53aWt0aW9uYXJ5Lm9yZycsXG4gICd1endpa2lib29rcyc6ICd1ei53aWtpYm9va3Mub3JnJyxcbiAgJ3V6d2lraXF1b3RlJzogJ3V6Lndpa2lxdW90ZS5vcmcnLFxuICAndmV3aWtpJzogJ3ZlLndpa2lwZWRpYS5vcmcnLFxuICAndmVjd2lraSc6ICd2ZWMud2lraXBlZGlhLm9yZycsXG4gICd2ZWN3aWt0aW9uYXJ5JzogJ3ZlYy53aWt0aW9uYXJ5Lm9yZycsXG4gICd2ZWN3aWtpc291cmNlJzogJ3ZlYy53aWtpc291cmNlLm9yZycsXG4gICd2ZXB3aWtpJzogJ3ZlcC53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lraSc6ICd2aS53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lrdGlvbmFyeSc6ICd2aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd2aXdpa2lib29rcyc6ICd2aS53aWtpYm9va3Mub3JnJyxcbiAgJ3Zpd2lraXF1b3RlJzogJ3ZpLndpa2lxdW90ZS5vcmcnLFxuICAndml3aWtpc291cmNlJzogJ3ZpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Zpd2lraXZveWFnZSc6ICd2aS53aWtpdm95YWdlLm9yZycsXG4gICd2bHN3aWtpJzogJ3Zscy53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lraSc6ICd2by53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lrdGlvbmFyeSc6ICd2by53aWt0aW9uYXJ5Lm9yZycsXG4gICd2b3dpa2lib29rcyc6ICd2by53aWtpYm9va3Mub3JnJyxcbiAgJ3Zvd2lraXF1b3RlJzogJ3ZvLndpa2lxdW90ZS5vcmcnLFxuICAnd2F3aWtpJzogJ3dhLndpa2lwZWRpYS5vcmcnLFxuICAnd2F3aWt0aW9uYXJ5JzogJ3dhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3dhd2lraWJvb2tzJzogJ3dhLndpa2lib29rcy5vcmcnLFxuICAnd2Fyd2lraSc6ICd3YXIud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa2knOiAnd28ud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa3Rpb25hcnknOiAnd28ud2lrdGlvbmFyeS5vcmcnLFxuICAnd293aWtpcXVvdGUnOiAnd28ud2lraXF1b3RlLm9yZycsXG4gICd3dXV3aWtpJzogJ3d1dS53aWtpcGVkaWEub3JnJyxcbiAgJ3hhbHdpa2knOiAneGFsLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWtpJzogJ3hoLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWt0aW9uYXJ5JzogJ3hoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3hod2lraWJvb2tzJzogJ3hoLndpa2lib29rcy5vcmcnLFxuICAneG1md2lraSc6ICd4bWYud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa2knOiAneWkud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa3Rpb25hcnknOiAneWkud2lrdGlvbmFyeS5vcmcnLFxuICAneWl3aWtpc291cmNlJzogJ3lpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3lvd2lraSc6ICd5by53aWtpcGVkaWEub3JnJyxcbiAgJ3lvd2lrdGlvbmFyeSc6ICd5by53aWt0aW9uYXJ5Lm9yZycsXG4gICd5b3dpa2lib29rcyc6ICd5by53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraSc6ICd6YS53aWtpcGVkaWEub3JnJyxcbiAgJ3phd2lrdGlvbmFyeSc6ICd6YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd6YXdpa2lib29rcyc6ICd6YS53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraXF1b3RlJzogJ3phLndpa2lxdW90ZS5vcmcnLFxuICAnemVhd2lraSc6ICd6ZWEud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa2knOiAnemgud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa3Rpb25hcnknOiAnemgud2lrdGlvbmFyeS5vcmcnLFxuICAnemh3aWtpYm9va3MnOiAnemgud2lraWJvb2tzLm9yZycsXG4gICd6aHdpa2luZXdzJzogJ3poLndpa2luZXdzLm9yZycsXG4gICd6aHdpa2lxdW90ZSc6ICd6aC53aWtpcXVvdGUub3JnJyxcbiAgJ3pod2lraXNvdXJjZSc6ICd6aC53aWtpc291cmNlLm9yZycsXG4gICd6aHdpa2l2b3lhZ2UnOiAnemgud2lraXZveWFnZS5vcmcnLFxuICAnemhfY2xhc3NpY2Fsd2lraSc6ICd6aC1jbGFzc2ljYWwud2lraXBlZGlhLm9yZycsXG4gICd6aF9taW5fbmFud2lraSc6ICd6aC1taW4tbmFuLndpa2lwZWRpYS5vcmcnLFxuICAnemhfbWluX25hbndpa3Rpb25hcnknOiAnemgtbWluLW5hbi53aWt0aW9uYXJ5Lm9yZycsXG4gICd6aF9taW5fbmFud2lraWJvb2tzJzogJ3poLW1pbi1uYW4ud2lraWJvb2tzLm9yZycsXG4gICd6aF9taW5fbmFud2lraXF1b3RlJzogJ3poLW1pbi1uYW4ud2lraXF1b3RlLm9yZycsXG4gICd6aF9taW5fbmFud2lraXNvdXJjZSc6ICd6aC1taW4tbmFuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3poX3l1ZXdpa2knOiAnemgteXVlLndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWtpJzogJ3p1Lndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWt0aW9uYXJ5JzogJ3p1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3p1d2lraWJvb2tzJzogJ3p1Lndpa2lib29rcy5vcmcnLFxuICAnYWR2aXNvcnl3aWtpJzogJ2Fkdmlzb3J5Lndpa2ltZWRpYS5vcmcnLFxuICAnYXJ3aWtpbWVkaWEnOiAnYXIud2lraW1lZGlhLm9yZycsXG4gICdhcmJjb21fZGV3aWtpJzogJ2FyYmNvbS1kZS53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9lbndpa2knOiAnYXJiY29tLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX2Zpd2lraSc6ICdhcmJjb20tZmkud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fbmx3aWtpJzogJ2FyYmNvbS1ubC53aWtpcGVkaWEub3JnJyxcbiAgJ2F1ZGl0Y29td2lraSc6ICdhdWRpdGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2Jkd2lraW1lZGlhJzogJ2JkLndpa2ltZWRpYS5vcmcnLFxuICAnYmV3aWtpbWVkaWEnOiAnYmUud2lraW1lZGlhLm9yZycsXG4gICdiZXRhd2lraXZlcnNpdHknOiAnYmV0YS53aWtpdmVyc2l0eS5vcmcnLFxuICAnYm9hcmR3aWtpJzogJ2JvYXJkLndpa2ltZWRpYS5vcmcnLFxuICAnYm9hcmRnb3Zjb213aWtpJzogJ2JvYXJkZ292Y29tLndpa2ltZWRpYS5vcmcnLFxuICAnYnJ3aWtpbWVkaWEnOiAnYnIud2lraW1lZGlhLm9yZycsXG4gICdjYXdpa2ltZWRpYSc6ICdjYS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYWlyd2lraSc6ICdjaGFpci53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYXBjb213aWtpJzogJ2FmZmNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoZWNrdXNlcndpa2knOiAnY2hlY2t1c2VyLndpa2ltZWRpYS5vcmcnLFxuICAnY253aWtpbWVkaWEnOiAnY24ud2lraW1lZGlhLm9yZycsXG4gICdjb3dpa2ltZWRpYSc6ICdjby53aWtpbWVkaWEub3JnJyxcbiAgJ2NvbGxhYndpa2knOiAnY29sbGFiLndpa2ltZWRpYS5vcmcnLFxuICAnY29tbW9uc3dpa2knOiAnY29tbW9ucy53aWtpbWVkaWEub3JnJyxcbiAgJ2Rrd2lraW1lZGlhJzogJ2RrLndpa2ltZWRpYS5vcmcnLFxuICAnZG9uYXRld2lraSc6ICdkb25hdGUud2lraW1lZGlhLm9yZycsXG4gICdldHdpa2ltZWRpYSc6ICdlZS53aWtpbWVkaWEub3JnJyxcbiAgJ2V4ZWN3aWtpJzogJ2V4ZWMud2lraW1lZGlhLm9yZycsXG4gICdmZGN3aWtpJzogJ2ZkYy53aWtpbWVkaWEub3JnJyxcbiAgJ2Zpd2lraW1lZGlhJzogJ2ZpLndpa2ltZWRpYS5vcmcnLFxuICAnZm91bmRhdGlvbndpa2knOiAnd2lraW1lZGlhZm91bmRhdGlvbi5vcmcnLFxuICAnZ3JhbnRzd2lraSc6ICdncmFudHMud2lraW1lZGlhLm9yZycsXG4gICdpZWdjb213aWtpJzogJ2llZ2NvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2lsd2lraW1lZGlhJzogJ2lsLndpa2ltZWRpYS5vcmcnLFxuICAnaW5jdWJhdG9yd2lraSc6ICdpbmN1YmF0b3Iud2lraW1lZGlhLm9yZycsXG4gICdpbnRlcm5hbHdpa2knOiAnaW50ZXJuYWwud2lraW1lZGlhLm9yZycsXG4gICdsYWJzd2lraSc6ICd3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xhYnRlc3R3aWtpJzogJ2xhYnRlc3R3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xlZ2FsdGVhbXdpa2knOiAnbGVnYWx0ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAnbG9naW53aWtpJzogJ2xvZ2luLndpa2ltZWRpYS5vcmcnLFxuICAnbWVkaWF3aWtpd2lraSc6ICdtZWRpYXdpa2kub3JnJyxcbiAgJ21ldGF3aWtpJzogJ21ldGEud2lraW1lZGlhLm9yZycsXG4gICdta3dpa2ltZWRpYSc6ICdtay53aWtpbWVkaWEub3JnJyxcbiAgJ21vdmVtZW50cm9sZXN3aWtpJzogJ21vdmVtZW50cm9sZXMud2lraW1lZGlhLm9yZycsXG4gICdteHdpa2ltZWRpYSc6ICdteC53aWtpbWVkaWEub3JnJyxcbiAgJ25sd2lraW1lZGlhJzogJ25sLndpa2ltZWRpYS5vcmcnLFxuICAnbm93aWtpbWVkaWEnOiAnbm8ud2lraW1lZGlhLm9yZycsXG4gICdub2JvYXJkX2NoYXB0ZXJzd2lraW1lZGlhJzogJ25vYm9hcmQtY2hhcHRlcnMud2lraW1lZGlhLm9yZycsXG4gICdub3N0YWxnaWF3aWtpJzogJ25vc3RhbGdpYS53aWtpcGVkaWEub3JnJyxcbiAgJ255Y3dpa2ltZWRpYSc6ICdueWMud2lraW1lZGlhLm9yZycsXG4gICduendpa2ltZWRpYSc6ICduei53aWtpbWVkaWEub3JnJyxcbiAgJ29mZmljZXdpa2knOiAnb2ZmaWNlLndpa2ltZWRpYS5vcmcnLFxuICAnb21idWRzbWVud2lraSc6ICdvbWJ1ZHNtZW4ud2lraW1lZGlhLm9yZycsXG4gICdvdHJzX3dpa2l3aWtpJzogJ290cnMtd2lraS53aWtpbWVkaWEub3JnJyxcbiAgJ291dHJlYWNod2lraSc6ICdvdXRyZWFjaC53aWtpbWVkaWEub3JnJyxcbiAgJ3BhX3Vzd2lraW1lZGlhJzogJ3BhLXVzLndpa2ltZWRpYS5vcmcnLFxuICAncGx3aWtpbWVkaWEnOiAncGwud2lraW1lZGlhLm9yZycsXG4gICdxdWFsaXR5d2lraSc6ICdxdWFsaXR5Lndpa2ltZWRpYS5vcmcnLFxuICAncnN3aWtpbWVkaWEnOiAncnMud2lraW1lZGlhLm9yZycsXG4gICdydXdpa2ltZWRpYSc6ICdydS53aWtpbWVkaWEub3JnJyxcbiAgJ3Nld2lraW1lZGlhJzogJ3NlLndpa2ltZWRpYS5vcmcnLFxuICAnc2VhcmNoY29td2lraSc6ICdzZWFyY2hjb20ud2lraW1lZGlhLm9yZycsXG4gICdzb3VyY2Vzd2lraSc6ICd3aWtpc291cmNlLm9yZycsXG4gICdzcGNvbXdpa2knOiAnc3Bjb20ud2lraW1lZGlhLm9yZycsXG4gICdzcGVjaWVzd2lraSc6ICdzcGVjaWVzLndpa2ltZWRpYS5vcmcnLFxuICAnc3Rld2FyZHdpa2knOiAnc3Rld2FyZC53aWtpbWVkaWEub3JnJyxcbiAgJ3N0cmF0ZWd5d2lraSc6ICdzdHJhdGVneS53aWtpbWVkaWEub3JnJyxcbiAgJ3Rlbndpa2knOiAndGVuLndpa2lwZWRpYS5vcmcnLFxuICAndGVzdHdpa2knOiAndGVzdC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3Qyd2lraSc6ICd0ZXN0Mi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3R3aWtpZGF0YXdpa2knOiAndGVzdC53aWtpZGF0YS5vcmcnLFxuICAndHJ3aWtpbWVkaWEnOiAndHIud2lraW1lZGlhLm9yZycsXG4gICd0cmFuc2l0aW9udGVhbXdpa2knOiAndHJhbnNpdGlvbnRlYW0ud2lraW1lZGlhLm9yZycsXG4gICd1YXdpa2ltZWRpYSc6ICd1YS53aWtpbWVkaWEub3JnJyxcbiAgJ3Vrd2lraW1lZGlhJzogJ3VrLndpa2ltZWRpYS5vcmcnLFxuICAndXNhYmlsaXR5d2lraSc6ICd1c2FiaWxpdHkud2lraW1lZGlhLm9yZycsXG4gICd2b3Rld2lraSc6ICd2b3RlLndpa2ltZWRpYS5vcmcnLFxuICAnd2dfZW53aWtpJzogJ3dnLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnd2lraWRhdGF3aWtpJzogJ3dpa2lkYXRhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA1d2lraSc6ICd3aWtpbWFuaWEyMDA1Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwNndpa2knOiAnd2lraW1hbmlhMjAwNi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDd3aWtpJzogJ3dpa2ltYW5pYTIwMDcud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA4d2lraSc6ICd3aWtpbWFuaWEyMDA4Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwOXdpa2knOiAnd2lraW1hbmlhMjAwOS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTB3aWtpJzogJ3dpa2ltYW5pYTIwMTAud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDExd2lraSc6ICd3aWtpbWFuaWEyMDExLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMndpa2knOiAnd2lraW1hbmlhMjAxMi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTN3aWtpJzogJ3dpa2ltYW5pYTIwMTMud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE0d2lraSc6ICd3aWtpbWFuaWEyMDE0Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNXdpa2knOiAnd2lraW1hbmlhMjAxNS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTZ3aWtpJzogJ3dpa2ltYW5pYTIwMTYud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE3d2lraSc6ICd3aWtpbWFuaWEyMDE3Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhdGVhbXdpa2knOiAnd2lraW1hbmlhdGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ3plcm93aWtpJzogJ3plcm8ud2lraW1lZGlhLm9yZydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2l0ZU1hcDtcbiJdfQ==
