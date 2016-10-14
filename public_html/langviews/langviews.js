(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @file Configuration for Langviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

/**
 * Configuration for Langviews application.
 * This includes selectors, defaults, and other constants specific to Langviews
 * @type {Object}
 */
var config = {
  agentSelector: '#agent_select',
  chart: '.aqs-chart',
  badges: {
    'Q17437796': {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Cscr-featured.svg',
      name: 'Featured article'
    },
    'Q17437798': {
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Symbol_support_vote.svg',
      name: 'Good article'
    },
    'Q17559452': {
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Art%C3%ADculo_bueno-blue.svg',
      name: 'Recommended article'
    },
    'Q17506997': {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Cscr-featured.svg',
      name: 'Featured list'
    },
    'Q17580674': {
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Cscr-featured.svg',
      name: 'Featured portal'
    },
    'Q20748092': {
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Featured_article_star_-_check.svg',
      name: 'Proofread'
    },
    'Q20748093': {
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Symbol_support_vote.svg',
      name: 'Validated'
    }
  },
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
    return '<strong>' + $.i18n('totals') + ':</strong> ' + scope.formatNumber(scope.outputData.sum) + '\n      (' + scope.formatNumber(Math.round(scope.outputData.average)) + '/' + $.i18n('day') + ')';
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
    sort: ['title', 'views', 'badges', 'lang'],
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
 * Langviews Analysis tool
 * @file Main file for Langviews application
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

/** Main LangViews class */

var LangViews = function (_mix$with) {
  _inherits(LangViews, _mix$with);

  function LangViews() {
    _classCallCheck(this, LangViews);

    var _this = _possibleConstructorReturn(this, (LangViews.__proto__ || Object.getPrototypeOf(LangViews)).call(this, config));

    _this.app = 'langviews';
    return _this;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */


  _createClass(LangViews, [{
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

      _get(LangViews.prototype.__proto__ || Object.getPrototypeOf(LangViews.prototype), 'setupListeners', this).call(this);

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
     * @param  {string} label - label for the dataset (e.g. category:blah, page pile 24, etc)
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
        link: link, // for our own purposes
        listData: []
      };
      var startDate = moment(this.daterangepicker.startDate),
          endDate = moment(this.daterangepicker.endDate),
          length = this.numDaysInRange();

      var totalViewsSet = new Array(length).fill(0),
          datesWithoutData = [],
          totalBadges = {},
          totalTitles = [];

      datasets.forEach(function (dataset, index) {
        var data = dataset.items.map(function (item) {
          return item.views;
        }),
            sum = data.reduce(function (a, b) {
          return a + b;
        });

        dataset.badges.forEach(function (badge) {
          if (totalBadges[badge] === undefined) {
            totalBadges[badge] = 1;
          } else {
            totalBadges[badge] += 1;
          }
        });

        totalTitles.push(dataset.title);

        _this4.outputData.listData.push({
          data: data,
          badges: dataset.badges,
          lang: dataset.lang,
          dbName: dataset.dbName,
          label: dataset.title,
          url: dataset.url,
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
        badges: totalBadges,
        titles: totalTitles.unique()
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
    key: 'getParams',


    /**
     * Get all user-inputted parameters
     * @param {boolean} [forCacheKey] whether or not to include the page name, and exclude sort and direction
     *   in the returned object. This is for the purposes of generating a unique cache key for params affecting the API queries
     * @return {Object} project, platform, agent, etc.
     */
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

      $('.permalink').prop('href', '/langviews?' + $.param(this.getPermaLink()));
    }

    /**
     * Given the badge code provided by the Wikidata API, return a image tag of the badge
     * @param  {String} badgeCode - as defined in this.config.badges
     * @return {String} HTML markup for the image
     */

  }, {
    key: 'getBadgeMarkup',
    value: function getBadgeMarkup(badgeCode) {
      if (!this.config.badges[badgeCode]) return '';
      var badgeImage = this.config.badges[badgeCode].image,
          badgeName = this.config.badges[badgeCode].name;
      return '<img class=\'article-badge\' src=\'' + badgeImage + '\' alt=\'' + badgeName + '\' title=\'' + badgeName + '\' />';
    }

    /**
     * Render list of langviews into view
     * @override
     * @returns {null} nothing
     */

  }, {
    key: 'renderData',
    value: function renderData() {
      var _this5 = this;

      _get(LangViews.prototype.__proto__ || Object.getPrototypeOf(LangViews.prototype), 'renderData', this).call(this, function (sortedDatasets) {
        var totalBadgesMarkup = Object.keys(_this5.outputData.badges).map(function (badge) {
          return '<span class=\'nowrap\'>' + _this5.getBadgeMarkup(badge) + ' &times; ' + _this5.outputData.badges[badge] + '</span>';
        }).join(', ');

        $('.output-totals').html('<th scope=\'row\'>' + $.i18n('totals') + '</th>\n         <th>' + $.i18n('num-languages', sortedDatasets.length) + '</th>\n         <th>' + $.i18n('unique-titles', _this5.outputData.titles.length) + '</th>\n         <th>' + totalBadgesMarkup + '</th>\n         <th>' + _this5.formatNumber(_this5.outputData.sum) + '</th>\n         <th>' + _this5.formatNumber(Math.round(_this5.outputData.average)) + ' / ' + $.i18n('day') + '</th>');
        $('#output_list').html('');

        sortedDatasets.forEach(function (item, index) {
          var badgeMarkup = '';
          if (item.badges) {
            badgeMarkup = item.badges.map(_this5.getBadgeMarkup.bind(_this5)).join();
          }

          $('#output_list').append('<tr>\n           <th scope=\'row\'>' + (index + 1) + '</th>\n           <td>' + item.lang + '</td>\n           <td><a href="' + item.url + '" target="_blank">' + item.label + '</a></td>\n           <td>' + badgeMarkup + '</td>\n           <td><a target=\'_blank\' href=\'' + _this5.getPageviewsURL(item.lang + '.' + _this5.baseProject + '.org', item.label) + '\'>' + _this5.formatNumber(item.sum) + '</a></td>\n           <td>' + _this5.formatNumber(Math.round(item.average)) + ' / ' + $.i18n('day') + '</td>\n           </tr>');
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
        case 'lang':
          return item.lang;
        case 'title':
          return item.label;
        case 'badges':
          return item.badges.sort().join('');
        case 'views':
          return Number(item.sum);
      }
    }

    /**
     * Loop through given interwiki data and query the pageviews API for each
     *   Also updates this.outputData with result
     * @param  {Object} interWikiData - as given by the getInterwikiData promise
     * @return {Deferred} - Promise resolving with data ready to be rendered to view
     */

  }, {
    key: 'getPageViewsData',
    value: function getPageViewsData(interWikiData) {
      var _this6 = this;

      var startDate = this.daterangepicker.startDate.startOf('day'),
          endDate = this.daterangepicker.endDate.startOf('day'),
          interWikiKeys = Object.keys(interWikiData);

      var dfd = $.Deferred(),
          promises = [],
          count = 0,
          failureRetries = {},
          totalRequestCount = interWikiKeys.length,
          failedPages = [],
          pageViewsData = [];

      var makeRequest = function makeRequest(dbName) {
        var data = interWikiData[dbName],
            uriEncodedPageName = encodeURIComponent(data.title);

        var url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' + data.lang + '.' + _this6.baseProject + ('/' + $(_this6.config.platformSelector).val() + '/' + $(_this6.config.agentSelector).val() + '/' + uriEncodedPageName + '/daily') + ('/' + startDate.format(_this6.config.timestampFormat) + '/' + endDate.format(_this6.config.timestampFormat));
        var promise = $.ajax({ url: url, dataType: 'json' });
        promises.push(promise);

        promise.done(function (pvData) {
          pageViewsData.push({
            badges: data.badges,
            dbName: dbName,
            lang: data.lang,
            title: data.title,
            url: data.url,
            items: pvData.items
          });
        }).fail(function (errorData) {
          /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
          var cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend',
              failedPageLink = _this6.getPageLink(data.title, data.lang + '.' + _this6.baseProject + '.org');

          if (cassandraError) {
            if (failureRetries[dbName]) {
              failureRetries[dbName]++;
            } else {
              failureRetries[dbName] = 1;
            }

            /** maximum of 3 retries */
            if (failureRetries[dbName] < 3) {
              totalRequestCount++;
              return _this6.rateLimit(makeRequest, _this6.config.apiThrottle, _this6)(dbName);
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

      interWikiKeys.forEach(function (dbName, index) {
        requestFn(dbName);
      });

      return dfd;
    }

    /**
     * Query Wikidata to find data about a given page across all sister projects
     * @param  {String} dbName - database name of source project
     * @param  {String} pageName - name of page we want to get data about
     * @return {Deferred} - Promise resolving with interwiki data
     */

  }, {
    key: 'getInterwikiData',
    value: function getInterwikiData(dbName, pageName) {
      var _this7 = this;

      var dfd = $.Deferred();
      var url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=' + dbName + ('&titles=' + encodeURIComponent(pageName) + '&props=sitelinks/urls|datatype&format=json&callback=?');

      $.getJSON(url).done(function (data) {
        if (data.error) {
          return dfd.reject($.i18n('api-error', 'Wikidata') + ': ' + data.error.info);
        } else if (data.entities['-1']) {
          return dfd.reject('<a target=\'_blank\' href=\'' + _this7.getPageURL(pageName).escape() + '\'>' + pageName.descore().escape() + '</a> - ' + $.i18n('api-error-no-data'));
        }

        var key = Object.keys(data.entities)[0],
            sitelinks = data.entities[key].sitelinks,
            filteredLinks = {},
            matchRegex = new RegExp('^https://[\\w-]+\\.' + _this7.baseProject + '\\.org');

        /** restrict to selected base project (e.g. wikipedias, not wikipedias and wikivoyages) */
        Object.keys(sitelinks).forEach(function (key) {
          var siteMapKey = sitelinks[key].site.replace(/-/g, '_');

          if (matchRegex.test(sitelinks[key].url) && siteMap[siteMapKey]) {
            sitelinks[key].lang = siteMap[siteMapKey].replace(/\.wiki.*$/, '');
            filteredLinks[key] = sitelinks[key];
          }
        });

        return dfd.resolve(filteredLinks);
      });

      return dfd;
    }

    /**
     * Parse wiki URL for the page name
     * @param  {String} url - full URL to a wiki page
     * @return {String|null} page name
     */

  }, {
    key: 'getPageNameFromURL',
    value: function getPageNameFromURL(url) {
      if (url.includes('?')) {
        return url.match(/\?(?:.*\b)?title=(.*?)(?:&|$)/)[1];
      } else {
        return url.match(/\/wiki\/(.*?)(?:\?|$)/)[1];
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
     * Process the langviews for the article and options entered
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

      var dbName = Object.keys(siteMap).find(function (key) {
        return siteMap[key] === $(_this9.config.projectInput).val();
      });

      $('.progress-counter').text($.i18n('fetching-data', 'Wikidata'));
      this.getInterwikiData(dbName, page).done(function (interWikiData) {
        _this9.getPageViewsData(interWikiData).done(function (pageViewsData) {
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
              action: 'query',
              list: 'prefixsearch',
              format: 'json',
              pssearch: query
            };
          },
          preProcess: function preProcess(data) {
            var results = data.query.prefixsearch.map(function (elem) {
              return elem.title;
            });
            return results;
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
      // 'true' validates that it is a multilingual project
      if (_get(LangViews.prototype.__proto__ || Object.getPrototypeOf(LangViews.prototype), 'validateProject', this).call(this, true)) {
        this.setState('initial');

        /** kill and re-init typeahead to point to new project */
        this.setupSourceInput();
      }
    }

    /**
     * Exports current lang data to CSV format and loads it in a new tab
     * With the prepended data:text/csv this should cause the browser to download the data
     * @override
     * @returns {null} nothing
     */

  }, {
    key: 'exportCSV',
    value: function exportCSV() {
      var _this10 = this;

      var csvContent = 'data:text/csv;charset=utf-8,Language,Title,Badges,' + this.getDateHeadings(false).join(',') + '\n';

      // Add the rows to the CSV
      this.outputData.listData.forEach(function (page) {
        var pageName = '"' + page.label.descore().replace(/"/g, '""') + '"',
            badges = '"' + page.badges.map(function (badge) {
          return _this10.config.badges[badge].name.replace(/"/g, '""');
        }) + '"';

        csvContent += [page.lang, pageName, badges].concat(page.data).join(',') + '\n';
      });

      this.downloadData(csvContent, 'csv');
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

  return LangViews;
}(mix(Pv).with(ChartHelpers, ListHelpers));

$(document).ready(function () {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new LangViews();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9sYW5ndmlld3MvY29uZmlnLmpzIiwiamF2YXNjcmlwdHMvbGFuZ3ZpZXdzL2xhbmd2aWV3cy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9jaGFydF9oZWxwZXJzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL2NvcmVfZXh0ZW5zaW9ucy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9saXN0X2hlbHBlcnMuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvcG9seWZpbGxzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2LmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2X2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9zaXRlX21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNXQSxJQUFNLFNBQVM7QUFDYixpQkFBZSxlQURGO0FBRWIsU0FBTyxZQUZNO0FBR2IsVUFBUTtBQUNOLGlCQUFhO0FBQ1gsYUFBTyx1RUFESTtBQUVYLFlBQU07QUFGSyxLQURQO0FBS04saUJBQWE7QUFDWCxhQUFPLDZFQURJO0FBRVgsWUFBTTtBQUZLLEtBTFA7QUFTTixpQkFBYTtBQUNYLGFBQU8sa0ZBREk7QUFFWCxZQUFNO0FBRkssS0FUUDtBQWFOLGlCQUFhO0FBQ1gsYUFBTyx1RUFESTtBQUVYLFlBQU07QUFGSyxLQWJQO0FBaUJOLGlCQUFhO0FBQ1gsYUFBTyx1RUFESTtBQUVYLFlBQU07QUFGSyxLQWpCUDtBQXFCTixpQkFBYTtBQUNYLGFBQU8sdUZBREk7QUFFWCxZQUFNO0FBRkssS0FyQlA7QUF5Qk4saUJBQWE7QUFDWCxhQUFPLDZFQURJO0FBRVgsWUFBTTtBQUZLO0FBekJQLEdBSEs7QUFpQ2IsYUFBVyxFQWpDRSxFO0FBa0NiLHFCQUFtQixjQWxDTjtBQW1DYixZQUFVO0FBQ1IsZUFBVyxXQURIO0FBRVIsVUFBTSxPQUZFO0FBR1Is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VUF0REs7QUF1RGQsaUJBQVMsVUF2REs7QUF3RGQsaUJBQVMsWUF4REs7QUF5RGQsaUJBQVMsVUF6REs7QUEwRGQsaUJBQVMsVUExREs7QUEyRGQsaUJBQVMsWUEzREs7QUE0RGQsaUJBQVMsWUE1REs7QUE2RGQsaUJBQVMsVUE3REs7QUE4RGQsaUJBQVMsVUE5REs7QUErRGQsa0JBQVUsWUEvREk7QUFnRWQsa0JBQVUsWUFoRUk7QUFpRWQsaUJBQVMsVUFqRUs7QUFrRWQsaUJBQVMsWUFsRUs7QUFtRWQsaUJBQVMsVUFuRUs7QUFvRWQsaUJBQVMsWUFwRUs7QUFxRWQsaUJBQVMsWUFyRUs7QUFzRWQsaUJBQVMsWUF0RUs7QUF1RWQsaUJBQVMsV0F2RUs7QUF3RWQsaUJBQVMsWUF4RUs7QUF5RWQsaUJBQVMsV0F6RUs7QUEwRWQsaUJBQVMsWUExRUs7QUEyRWQsaUJBQVMsWUEzRUs7QUE0RWQsc0JBQWMsVUE1RUE7QUE2RWQsaUJBQVMsVUE3RUs7QUE4RWQsc0JBQWMsWUE5RUE7QUErRWQsaUJBQVMsWUEvRUs7QUFnRmQsc0JBQWMsWUFoRkE7QUFpRmQsaUJBQVMsWUFqRks7QUFrRmQsaUJBQVMsVUFsRks7QUFtRmQsaUJBQVMsWUFuRks7QUFvRmQsaUJBQVMsV0FwRks7QUFxRmQsaUJBQVMsWUFyRks7QUFzRmQsaUJBQVMsWUF0Rks7QUF1RmQsc0JBQWMsVUF2RkE7QUF3RmQsaUJBQVMsWUF4Rks7QUF5RmQsaUJBQVMsVUF6Rks7QUEwRmQsaUJBQVMsWUExRks7QUEyRmQsaUJBQVMsWUEzRks7QUE0RmQsaUJBQVMsWUE1Rks7QUE2RmQsaUJBQVMsWUE3Rks7QUE4RmQsaUJBQVMsWUE5Rks7QUErRmQsaUJBQVMsVUEvRks7QUFnR2QsaUJBQVMsWUFoR0s7QUFpR2QsaUJBQVMsV0FqR0s7QUFrR2QsaUJBQVMsWUFsR0s7QUFtR2QsaUJBQVMsWUFuR0s7QUFvR2QsaUJBQVMsWUFwR0s7QUFxR2QsaUJBQVMsWUFyR0s7QUFzR2QsaUJBQVMsWUF0R0s7QUF1R2QsaUJBQVMsWUF2R0s7QUF3R2QsaUJBQVMsWUF4R0s7QUF5R2QsaUJBQVMsWUF6R0s7QUEwR2QsaUJBQVMsWUExR0s7QUEyR2QsaUJBQVMsWUEzR0s7QUE0R2QsaUJBQVMsWUE1R0s7QUE2R2QsaUJBQVMsWUE3R0s7QUE4R2QsaUJBQVMsWUE5R0s7QUErR2Qsa0JBQVUsWUEvR0k7QUFnSGQsaUJBQVMsWUFoSEs7QUFpSGQsaUJBQVMsWUFqSEs7QUFrSGQsaUJBQVMsWUFsSEs7QUFtSGQsaUJBQVMsWUFuSEs7QUFvSGQsaUJBQVMsWUFwSEs7QUFxSGQsaUJBQVMsWUFySEs7QUFzSGQsaUJBQVMsWUF0SEs7QUF1SGQsaUJBQVMsWUF2SEs7QUF3SGQsaUJBQVMsVUF4SEs7QUF5SGQsaUJBQVMsWUF6SEs7QUEwSGQsaUJBQVMsWUExSEs7QUEySGQsaUJBQVMsVUEzSEs7QUE0SGQsaUJBQVMsWUE1SEs7QUE2SGQsaUJBQVMsWUE3SEs7QUE4SGQsaUJBQVMsWUE5SEs7QUErSGQsaUJBQVMsWUEvSEs7QUFnSWQsaUJBQVMsWUFoSUs7QUFpSWQsaUJBQVMsWUFqSUs7QUFrSWQsaUJBQVMsWUFsSUs7QUFtSWQsaUJBQVMsWUFuSUs7QUFvSWQsaUJBQVMsWUFwSUs7QUFxSWQsaUJBQVMsWUFySUs7QUFzSWQsaUJBQVMsWUF0SUs7QUF1SWQsaUJBQVMsVUF2SUs7QUF3SWQsdUJBQWUsWUF4SUQ7QUF5SWQsc0JBQWMsV0F6SUE7QUEwSWQsa0JBQVUsWUExSUk7QUEySWQsc0JBQWMsVUEzSUE7QUE0SWQsaUJBQVMsWUE1SUs7QUE2SWQsaUJBQVMsVUE3SUs7QUE4SWQsa0JBQVUsVUE5SUk7QUErSWQsaUJBQVMsVUEvSUs7QUFnSmQsaUJBQVMsWUFoSks7QUFpSmQsaUJBQVMsVUFqSks7QUFrSmQsa0JBQVUsWUFsSkk7QUFtSmQsa0JBQVUsWUFuSkk7QUFvSmQsa0JBQVUsWUFwSkk7QUFxSmQsaUJBQVMsWUFySks7QUFzSmQsaUJBQVMsWUF0Sks7QUF1SmQsaUJBQVMsWUF2Sks7QUF3SmQsaUJBQVMsWUF4Sks7QUF5SmQsaUJBQVMsWUF6Sks7QUEwSmQsaUJBQVMsWUExSks7QUEySmQsa0JBQVUsVUEzSkk7QUE0SmQsa0JBQVUsVUE1Skk7QUE2SmQsa0JBQVUsWUE3Skk7QUE4SmQsaUJBQVMsVUE5Sks7QUErSmQsa0JBQVUsWUEvSkk7QUFnS2QsaUJBQVMsVUFoS0s7QUFpS2QsaUJBQVMsWUFqS0s7QUFrS2QsaUJBQVMsWUFsS0s7QUFtS2QsaUJBQVMsVUFuS0s7QUFvS2Qsa0JBQVUsWUFwS0k7QUFxS2Qsa0JBQVUsWUFyS0k7QUFzS2QsaUJBQVMsVUF0S0s7QUF1S2Qsc0JBQWMsVUF2S0E7QUF3S2Qsa0JBQVUsVUF4S0k7QUF5S2QsaUJBQVMsVUF6S0s7QUEwS2QsaUJBQVMsVUExS0s7QUEyS2QsaUJBQVMsVUEzS0s7QUE0S2QsaUJBQVMsWUE1S0s7QUE2S2Qsc0JBQWMsVUE3S0E7QUE4S2Qsc0JBQWMsVUE5S0E7QUErS2QsaUJBQVMsWUEvS0s7QUFnTGQsc0JBQWMsVUFoTEE7QUFpTGQsaUJBQVMsWUFqTEs7QUFrTGQsaUJBQVMsWUFsTEs7QUFtTGQsaUJBQVMsWUFuTEs7QUFvTGQsaUJBQVMsVUFwTEs7QUFxTGQsa0JBQVUsVUFyTEk7QUFzTGQsaUJBQVMsWUF0TEs7QUF1TGQsaUJBQVMsVUF2TEs7QUF3TGQsaUJBQVMsWUF4TEs7QUF5TGQsaUJBQVMsVUF6TEs7QUEwTGQsaUJBQVMsVUExTEs7QUEyTGQsaUJBQVMsVUEzTEs7QUE0TGQsc0JBQWMsVUE1TEE7QUE2TGQsaUJBQVMsWUE3TEs7QUE4TGQsc0JBQWMsVUE5TEE7QUErTGQsaUJBQVMsVUEvTEs7QUFnTWQsaUJBQVMsWUFoTUs7QUFpTWQsaUJBQVMsWUFqTUs7QUFrTWQsaUJBQVMsWUFsTUs7QUFtTWQsa0JBQVUsWUFuTUk7QUFvTWQsc0JBQWMsVUFwTUE7QUFxTWQsc0JBQWMsVUFyTUE7QUFzTWQsc0JBQWMsVUF0TUE7QUF1TWQsa0JBQVUsWUF2TUk7QUF3TWQsaUJBQVMsWUF4TUs7QUF5TWQsa0JBQVUsWUF6TUk7QUEwTWQsa0JBQVUsWUExTUk7QUEyTWQsa0JBQVUsWUEzTUk7QUE0TWQsaUJBQVMs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ZCxpQkFBZSx1QkEzMUJEO0FBNDFCZCxpQkFBZSxrQkE1MUJEO0FBNjFCZCxpQkFBZSxrQkE3MUJEO0FBODFCZCxpQkFBZSxrQkE5MUJEO0FBKzFCZCxtQkFBaUIseUJBLzFCSDtBQWcyQmQsaUJBQWUsZ0JBaDJCRDtBQWkyQmQsZUFBYSxxQkFqMkJDO0FBazJCZCxpQkFBZSx1QkFsMkJEO0FBbTJCZCxpQkFBZSx1QkFuMkJEO0FBbzJCZCxrQkFBZ0Isd0JBcDJCRjtBQXEyQmQsYUFBVyxtQkFyMkJHO0FBczJCZCxjQUFZLG9CQXQyQkU7QUF1MkJkLGVBQWEscUJBdjJCQztBQXcyQmQsc0JBQW9CLG1CQXgyQk47QUF5MkJkLGlCQUFlLGtCQXoyQkQ7QUEwMkJkLHdCQUFzQiw4QkExMkJSO0FBMjJCZCxpQkFBZSxrQkEzMkJEO0FBNDJCZCxpQkFBZSxrQkE1MkJEO0FBNjJCZCxtQkFBaUIseUJBNzJCSDtBQTgyQmQsY0FBWSxvQkE5MkJFO0FBKzJCZCxlQUFhLHFCQS8yQkM7QUFnM0JkLGtCQUFnQixjQWgzQkY7QUFpM0JkLHVCQUFxQiw2QkFqM0JQO0FBazNCZCx1QkFBcUIsNkJBbDNCUDtBQW0zQmQsdUJBQXFCLDZCQW4zQlA7QUFvM0JkLHVCQUFxQiw2QkFwM0JQO0FBcTNCZCx1QkFBcUIsNkJBcjNCUDtBQXMzQmQsdUJBQXFCLDZCQXQzQlA7QUF1M0JkLHVCQUFxQiw2QkF2M0JQO0FBdzNCZCx1QkFBcUIsNkJBeDNCUDtBQXkzQmQsdUJBQXFCLDZCQXozQlA7QUEwM0JkLHVCQUFxQiw2QkExM0JQO0FBMjNCZCx1QkFBcUIsNkJBMzNCUDtBQTQzQmQsdUJBQXFCLDZCQTUzQlA7QUE2M0JkLHVCQUFxQiw2QkE3M0JQO0FBODNCZCx1QkFBcUIsNkJBOTNCUDtBQSszQmQsY0FBWTtBQS8zQkUsQ0FBaEI7O0FBazRCQSxPQUFPLE9BQVAsR0FBaUIsT0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZSBDb25maWd1cmF0aW9uIGZvciBMYW5ndmlld3MgYXBwbGljYXRpb25cbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICovXG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgTGFuZ3ZpZXdzIGFwcGxpY2F0aW9uLlxuICogVGhpcyBpbmNsdWRlcyBzZWxlY3RvcnMsIGRlZmF1bHRzLCBhbmQgb3RoZXIgY29uc3RhbnRzIHNwZWNpZmljIHRvIExhbmd2aWV3c1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgY29uZmlnID0ge1xuICBhZ2VudFNlbGVjdG9yOiAnI2FnZW50X3NlbGVjdCcsXG4gIGNoYXJ0OiAnLmFxcy1jaGFydCcsXG4gIGJhZGdlczoge1xuICAgICdRMTc0Mzc3OTYnOiB7XG4gICAgICBpbWFnZTogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvZS9lNy9Dc2NyLWZlYXR1cmVkLnN2ZycsXG4gICAgICBuYW1lOiAnRmVhdHVyZWQgYXJ0aWNsZSdcbiAgICB9LFxuICAgICdRMTc0Mzc3OTgnOiB7XG4gICAgICBpbWFnZTogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvOS85NC9TeW1ib2xfc3VwcG9ydF92b3RlLnN2ZycsXG4gICAgICBuYW1lOiAnR29vZCBhcnRpY2xlJ1xuICAgIH0sXG4gICAgJ1ExNzU1OTQ1Mic6IHtcbiAgICAgIGltYWdlOiAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9jL2M0L0FydCVDMyVBRGN1bG9fYnVlbm8tYmx1ZS5zdmcnLFxuICAgICAgbmFtZTogJ1JlY29tbWVuZGVkIGFydGljbGUnXG4gICAgfSxcbiAgICAnUTE3NTA2OTk3Jzoge1xuICAgICAgaW1hZ2U6ICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2UvZTcvQ3Njci1mZWF0dXJlZC5zdmcnLFxuICAgICAgbmFtZTogJ0ZlYXR1cmVkIGxpc3QnXG4gICAgfSxcbiAgICAnUTE3NTgwNjc0Jzoge1xuICAgICAgaW1hZ2U6ICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2UvZTcvQ3Njci1mZWF0dXJlZC5zdmcnLFxuICAgICAgbmFtZTogJ0ZlYXR1cmVkIHBvcnRhbCdcbiAgICB9LFxuICAgICdRMjA3NDgwOTInOiB7XG4gICAgICBpbWFnZTogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvYy9jZS9GZWF0dXJlZF9hcnRpY2xlX3N0YXJfLV9jaGVjay5zdmcnLFxuICAgICAgbmFtZTogJ1Byb29mcmVhZCdcbiAgICB9LFxuICAgICdRMjA3NDgwOTMnOiB7XG4gICAgICBpbWFnZTogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvOS85NC9TeW1ib2xfc3VwcG9ydF92b3RlLnN2ZycsXG4gICAgICBuYW1lOiAnVmFsaWRhdGVkJ1xuICAgIH1cbiAgfSxcbiAgZGF0ZUxpbWl0OiA5MCwgLy8gbnVtIGRheXNcbiAgZGF0ZVJhbmdlU2VsZWN0b3I6ICcjcmFuZ2VfaW5wdXQnLFxuICBkZWZhdWx0czoge1xuICAgIGRhdGVSYW5nZTogJ2xhdGVzdC0yMCcsXG4gICAgc29ydDogJ3ZpZXdzJyxcbiAgICBkaXJlY3Rpb246IDEsXG4gICAgb3V0cHV0RGF0YTogW10sXG4gICAgaGFkRmFpbHVyZTogZmFsc2UsXG4gICAgdG90YWw6IDAsXG4gICAgdmlldzogJ2xpc3QnXG4gIH0sXG4gIGxpbmVhckxlZ2VuZDogKGRhdGFzZXRzLCBzY29wZSkgPT4ge1xuICAgIHJldHVybiBgPHN0cm9uZz4keyQuaTE4bigndG90YWxzJyl9Ojwvc3Ryb25nPiAke3Njb3BlLmZvcm1hdE51bWJlcihzY29wZS5vdXRwdXREYXRhLnN1bSl9XG4gICAgICAoJHtzY29wZS5mb3JtYXROdW1iZXIoTWF0aC5yb3VuZChzY29wZS5vdXRwdXREYXRhLmF2ZXJhZ2UpKX0vJHskLmkxOG4oJ2RheScpfSlgO1xuICB9LFxuICBsb2dhcml0aG1pY0NoZWNrYm94OiAnLmxvZ2FyaXRobWljLXNjYWxlLW9wdGlvbicsXG4gIHBsYXRmb3JtU2VsZWN0b3I6ICcjcGxhdGZvcm1fc2VsZWN0JyxcbiAgcHJvamVjdElucHV0OiAnI3Byb2plY3RfaW5wdXQnLFxuICBmb3JtU3RhdGVzOiBbJ2luaXRpYWwnLCAncHJvY2Vzc2luZycsICdjb21wbGV0ZScsICdpbnZhbGlkJ10sXG4gIHNvdXJjZUlucHV0OiAnI3NvdXJjZV9pbnB1dCcsXG4gIHRpbWVzdGFtcEZvcm1hdDogJ1lZWVlNTUREMDAnLFxuICB2YWxpZGF0ZVBhcmFtczogWydwcm9qZWN0JywgJ3BsYXRmb3JtJywgJ2FnZW50JywgJ2RpcmVjdGlvbicsICdzb3J0JywgJ3ZpZXcnXSxcbiAgdmFsaWRQYXJhbXM6IHtcbiAgICBkaXJlY3Rpb246IFsnLTEnLCAnMSddLFxuICAgIHNvcnQ6IFsndGl0bGUnLCAndmlld3MnLCAnYmFkZ2VzJywgJ2xhbmcnXSxcbiAgICB2aWV3OiBbJ2xpc3QnLCAnY2hhcnQnXVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZztcbiIsIi8qKlxuICogTGFuZ3ZpZXdzIEFuYWx5c2lzIHRvb2xcbiAqIEBmaWxlIE1haW4gZmlsZSBmb3IgTGFuZ3ZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogQHJlcXVpcmVzIFB2XG4gKiBAcmVxdWlyZXMgQ2hhcnRIZWxwZXJzXG4gKiBAcmVxdWlyZXMgTGlzdEhlbHBlcnNcbiAqL1xuXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4uL3NoYXJlZC9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5jb25zdCBQdiA9IHJlcXVpcmUoJy4uL3NoYXJlZC9wdicpO1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2NoYXJ0X2hlbHBlcnMnKTtcbmNvbnN0IExpc3RIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2xpc3RfaGVscGVycycpO1xuXG4vKiogTWFpbiBMYW5nVmlld3MgY2xhc3MgKi9cbmNsYXNzIExhbmdWaWV3cyBleHRlbmRzIG1peChQdikud2l0aChDaGFydEhlbHBlcnMsIExpc3RIZWxwZXJzKSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgdGhpcy5hcHAgPSAnbGFuZ3ZpZXdzJztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQ2FsbGVkIGluIGBwdi5qc2AgYWZ0ZXIgdHJhbnNsYXRpb25zIGhhdmUgbG9hZGVkXG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hc3NpZ25EZWZhdWx0cygpO1xuICAgIHRoaXMuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuICAgIHRoaXMucG9wUGFyYW1zKCk7XG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuICAgIHRoaXMudXBkYXRlSW50ZXJBcHBMaW5rcygpO1xuXG4gICAgLyoqIG9ubHkgc2hvdyBvcHRpb25zIGZvciBsaW5lLCBiYXIgYW5kIHJhZGFyIGNoYXJ0cyAqL1xuICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGdlbmVyYWwgZXZlbnQgbGlzdGVuZXJzXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0dXBMaXN0ZW5lcnMoKTtcblxuICAgICQoJyNwdl9mb3JtJykub24oJ3N1Ym1pdCcsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHBhZ2UgZnJvbSByZWxvYWRpbmdcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcuYW5vdGhlci1xdWVyeScpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcbiAgICAgIHRoaXMucHVzaFBhcmFtcyh0cnVlKTtcbiAgICB9KTtcblxuICAgICQoJy5zb3J0LWxpbmsnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnN0IHNvcnRUeXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3R5cGUnKTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5zb3J0ID09PSBzb3J0VHlwZSA/IC10aGlzLmRpcmVjdGlvbiA6IDE7XG4gICAgICB0aGlzLnNvcnQgPSBzb3J0VHlwZTtcbiAgICAgIHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgJCgnLnZpZXctYnRuJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgIHRoaXMudmlldyA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnZhbHVlO1xuICAgICAgdGhpcy50b2dnbGVWaWV3KHRoaXMudmlldyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBuZWNlc3NhcnkgZGVmYXVsdCB2YWx1ZXMgdG8gY2xhc3MgaW5zdGFuY2UuXG4gICAqIENhbGxlZCB3aGVuIHRoZSB2aWV3IGlzIHJlc2V0LlxuICAgKiBAcmV0dXJuIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBhc3NpZ25EZWZhdWx0cygpIHtcbiAgICBbJ3NvcnQnLCAnZGlyZWN0aW9uJywgJ291dHB1dERhdGEnLCAnaGFkRmFpbHVyZScsICd0b3RhbCcsICd2aWV3J10uZm9yRWFjaChkZWZhdWx0S2V5ID0+IHtcbiAgICAgIHRoaXNbZGVmYXVsdEtleV0gPSB0aGlzLmNvbmZpZy5kZWZhdWx0c1tkZWZhdWx0S2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBvdXIgbW90aGVyIGRhdGEgc2V0LCBmcm9tIHdoaWNoIHdlIGNhbiBkcmF3IGEgY2hhcnQsXG4gICAqICAgcmVuZGVyIGEgbGlzdCBvZiBkYXRhLCB3aGF0ZXZlciBvdXIgaGVhcnQgZGVzaXJlcyA6KVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxhYmVsIC0gbGFiZWwgZm9yIHRoZSBkYXRhc2V0IChlLmcuIGNhdGVnb3J5OmJsYWgsIHBhZ2UgcGlsZSAyNCwgZXRjKVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxpbmsgLSBIVE1MIGFuY2hvciB0YWcgZm9yIHRoZSBsYWJlbFxuICAgKiBAcGFyYW0gIHthcnJheX0gZGF0YXNldHMgLSBhcnJheSBvZiBkYXRhc2V0cyBmb3IgZWFjaCBhcnRpY2xlLCBhcyByZXR1cm5lZCBieSB0aGUgUGFnZXZpZXdzIEFQSVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IG1vdGhlciBkYXRhIHNldCwgYWxzbyBzdG9yZWQgaW4gdGhpcy5vdXRwdXREYXRhXG4gICAqL1xuICBidWlsZE1vdGhlckRhdGFzZXQobGFiZWwsIGxpbmssIGRhdGFzZXRzKSB7XG4gICAgLyoqXG4gICAgICogYGRhdGFzZXRzYCBzdHJ1Y3R1cmU6XG4gICAgICpcbiAgICAgKiBbe1xuICAgICAqICAgdGl0bGU6IHBhZ2UsXG4gICAgICogICBpdGVtczogW1xuICAgICAqICAgICB7XG4gICAgICogICAgICAgYWNjZXNzOiAnJyxcbiAgICAgKiAgICAgICBhZ2VudDogJycsXG4gICAgICogICAgICAgYXJ0aWNsZTogJycsXG4gICAgICogICAgICAgZ3JhbnVsYXJpdHk6ICcnLFxuICAgICAqICAgICAgIHByb2plY3Q6ICcnLFxuICAgICAqICAgICAgIHRpbWVzdGFtcDogJycsXG4gICAgICogICAgICAgdmlld3M6IDEwXG4gICAgICogICAgIH1cbiAgICAgKiAgIF1cbiAgICAgKiB9XVxuICAgICAqXG4gICAgICogb3V0cHV0IHN0cnVjdHVyZTpcbiAgICAgKlxuICAgICAqIHtcbiAgICAgKiAgIGxhYmVsczogWycnXSxcbiAgICAgKiAgIGxpc3REYXRhOiBbXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICBsYWJlbDogJycsXG4gICAgICogICAgICAgZGF0YTogWzEsMiwzLDRdLFxuICAgICAqICAgICAgIHN1bTogMTAsXG4gICAgICogICAgICAgYXZlcmFnZTogMixcbiAgICAgKiAgICAgICBpbmRleDogMFxuICAgICAqICAgICAgIC4uLlxuICAgICAqICAgICAgIE1FUkdFIGluIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5kYXRhc2V0KHRoaXMuY29uZmlnLmNvbG9yc1swXSlcbiAgICAgKiAgICAgfVxuICAgICAqICAgXSxcbiAgICAgKiAgIHRvdGFsVmlld3NTZXQ6IFsxLDIsMyw0XSxcbiAgICAgKiAgIHN1bTogMTAsXG4gICAgICogICBhdmVyYWdlOiAyLFxuICAgICAqICAgZGF0ZXNXaXRob3V0RGF0YTogWycyMDE2LTA1LTE2VDAwOjAwOjAwLTAwOjAwJ11cbiAgICAgKiB9XG4gICAgICovXG5cbiAgICB0aGlzLm91dHB1dERhdGEgPSB7XG4gICAgICBsYWJlbHM6IHRoaXMuZ2V0RGF0ZUhlYWRpbmdzKHRydWUpLCAvLyBsYWJlbHMgbmVlZGVkIGZvciBDaGFydHMuanMsIGV2ZW4gdGhvdWdoIHdlJ2xsIG9ubHkgaGF2ZSBvbmUgZGF0YXNldFxuICAgICAgbGluaywgLy8gZm9yIG91ciBvd24gcHVycG9zZXNcbiAgICAgIGxpc3REYXRhOiBbXVxuICAgIH07XG4gICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSksXG4gICAgICBlbmREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUpLFxuICAgICAgbGVuZ3RoID0gdGhpcy5udW1EYXlzSW5SYW5nZSgpO1xuXG4gICAgbGV0IHRvdGFsVmlld3NTZXQgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKDApLFxuICAgICAgZGF0ZXNXaXRob3V0RGF0YSA9IFtdLFxuICAgICAgdG90YWxCYWRnZXMgPSB7fSxcbiAgICAgIHRvdGFsVGl0bGVzID0gW107XG5cbiAgICBkYXRhc2V0cy5mb3JFYWNoKChkYXRhc2V0LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGRhdGFzZXQuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS52aWV3cyksXG4gICAgICAgIHN1bSA9IGRhdGEucmVkdWNlKChhLCBiKSA9PiBhICsgYik7XG5cbiAgICAgIGRhdGFzZXQuYmFkZ2VzLmZvckVhY2goYmFkZ2UgPT4ge1xuICAgICAgICBpZiAodG90YWxCYWRnZXNbYmFkZ2VdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0b3RhbEJhZGdlc1tiYWRnZV0gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvdGFsQmFkZ2VzW2JhZGdlXSArPSAxO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdG90YWxUaXRsZXMucHVzaChkYXRhc2V0LnRpdGxlKTtcblxuICAgICAgdGhpcy5vdXRwdXREYXRhLmxpc3REYXRhLnB1c2goe1xuICAgICAgICBkYXRhLFxuICAgICAgICBiYWRnZXM6IGRhdGFzZXQuYmFkZ2VzLFxuICAgICAgICBsYW5nOiBkYXRhc2V0LmxhbmcsXG4gICAgICAgIGRiTmFtZTogZGF0YXNldC5kYk5hbWUsXG4gICAgICAgIGxhYmVsOiBkYXRhc2V0LnRpdGxlLFxuICAgICAgICB1cmw6IGRhdGFzZXQudXJsLFxuICAgICAgICBzdW0sXG4gICAgICAgIGF2ZXJhZ2U6IHN1bSAvIGxlbmd0aCxcbiAgICAgICAgaW5kZXhcbiAgICAgIH0pO1xuXG4gICAgICAvKipcbiAgICAgICAqIEVuc3VyZSB3ZSBoYXZlIGRhdGEgZm9yIGVhY2ggZGF5LCB1c2luZyBudWxsIGFzIHRoZSB2aWV3IGNvdW50IHdoZW4gZGF0YSBpcyBhY3R1YWxseSBub3QgYXZhaWxhYmxlIHlldFxuICAgICAgICogU2VlIGZpbGxJblplcm9zKCkgY29tbWVudHMgZm9yIG1vcmUgaW5mby5cbiAgICAgICAqL1xuICAgICAgY29uc3QgW3ZpZXdzU2V0LCBpbmNvbXBsZXRlRGF0ZXNdID0gdGhpcy5maWxsSW5aZXJvcyhkYXRhc2V0Lml0ZW1zLCBzdGFydERhdGUsIGVuZERhdGUpO1xuICAgICAgaW5jb21wbGV0ZURhdGVzLmZvckVhY2goZGF0ZSA9PiB7XG4gICAgICAgIGlmICghZGF0ZXNXaXRob3V0RGF0YS5pbmNsdWRlcyhkYXRlKSkgZGF0ZXNXaXRob3V0RGF0YS5wdXNoKGRhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRvdGFsVmlld3NTZXQgPSB0b3RhbFZpZXdzU2V0Lm1hcCgobnVtLCBpKSA9PiBudW0gKyB2aWV3c1NldFtpXS52aWV3cyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBncmFuZFN1bSA9IHRvdGFsVmlld3NTZXQucmVkdWNlKChhLCBiKSA9PiAoYSB8fCAwKSArIChiIHx8IDApKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vdXRwdXREYXRhLCB7XG4gICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGRhdGE6IHRvdGFsVmlld3NTZXQsXG4gICAgICAgIHN1bTogZ3JhbmRTdW0sXG4gICAgICAgIGF2ZXJhZ2U6IGdyYW5kU3VtIC8gbGVuZ3RoXG4gICAgICB9XSxcbiAgICAgIGRhdGVzV2l0aG91dERhdGEsXG4gICAgICBzdW06IGdyYW5kU3VtLCAvLyBuZXZlcm1pbmQgdGhlIGR1cGxpY2F0aW9uXG4gICAgICBhdmVyYWdlOiBncmFuZFN1bSAvIGxlbmd0aCxcbiAgICAgIGJhZGdlczogdG90YWxCYWRnZXMsXG4gICAgICB0aXRsZXM6IHRvdGFsVGl0bGVzLnVuaXF1ZSgpXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0ZXNXaXRob3V0RGF0YS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGRhdGVMaXN0ID0gZGF0ZXNXaXRob3V0RGF0YS5tYXAoZGF0ZSA9PiBtb21lbnQoZGF0ZSkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCkpO1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdhcGktaW5jb21wbGV0ZS1kYXRhJywgZGF0ZUxpc3Quc29ydCgpLmpvaW4oJyAmbWlkZG90OyAnKSwgZGF0ZUxpc3QubGVuZ3RoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlcmUgd2VyZSBubyBmYWlsdXJlcywgY2FjaGUgdGhlIHJlc3VsdCBhcyBzb21lIGRhdGFzZXRzIGNhbiBiZSB2ZXJ5IGxhcmdlLlxuICAgICAqIFRoZXJlIGlzIHNlcnZlciBjYWNoZSBidXQgdGhlcmUgaXMgYWxzbyBwcm9jZXNzaW5nIHRpbWUgdGhhdCBsb2NhbCBjYWNoaW5nIGNhbiBlbGltaW5hdGVcbiAgICAgKi9cbiAgICBpZiAoIXRoaXMuaGFkRmFpbHVyZSkge1xuICAgICAgLy8gMTAgbWludXRlcywgVFRMIGlzIG1pbGxpc2Vjb25kc1xuICAgICAgc2ltcGxlU3RvcmFnZS5zZXQodGhpcy5nZXRDYWNoZUtleSgpLCB0aGlzLm91dHB1dERhdGEsIHtUVEw6IDYwMDAwMH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm91dHB1dERhdGE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBiYXNlIHByb2plY3QgbmFtZSAod2l0aG91dCBsYW5ndWFnZSBhbmQgdGhlIC5vcmcpXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBwcm9qZWN0bmFtZVxuICAgKi9cbiAgZ2V0IGJhc2VQcm9qZWN0KCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3Quc3BsaXQoJy4nKVsxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7VHlwZWFoZWFkfSBpbnN0YW5jZVxuICAgKi9cbiAgZ2V0IHR5cGVhaGVhZCgpIHtcbiAgICByZXR1cm4gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkuZGF0YSgndHlwZWFoZWFkJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB1c2VyLWlucHV0dGVkIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbZm9yQ2FjaGVLZXldIHdoZXRoZXIgb3Igbm90IHRvIGluY2x1ZGUgdGhlIHBhZ2UgbmFtZSwgYW5kIGV4Y2x1ZGUgc29ydCBhbmQgZGlyZWN0aW9uXG4gICAqICAgaW4gdGhlIHJldHVybmVkIG9iamVjdC4gVGhpcyBpcyBmb3IgdGhlIHB1cnBvc2VzIG9mIGdlbmVyYXRpbmcgYSB1bmlxdWUgY2FjaGUga2V5IGZvciBwYXJhbXMgYWZmZWN0aW5nIHRoZSBBUEkgcXVlcmllc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9IHByb2plY3QsIHBsYXRmb3JtLCBhZ2VudCwgZXRjLlxuICAgKi9cbiAgZ2V0UGFyYW1zKGZvckNhY2hlS2V5ID0gZmFsc2UpIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgcHJvamVjdDogJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpLFxuICAgICAgcGxhdGZvcm06ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCksXG4gICAgICBhZ2VudDogJCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBzdGFydCBhbmQgZW5kIHdpdGggY3VzdG9tIHJhbmdlIHZhbHVlcywgaWYgY29uZmlndXJlZCAoc2V0IGJ5IFVSTCBwYXJhbXMgb3Igc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcilcbiAgICAgKiBWYWxpZCB2YWx1ZXMgYXJlIHRob3NlIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcywgY29uc3RydWN0ZWQgbGlrZSBge3JhbmdlOiAnbGFzdC1tb250aCd9YCxcbiAgICAgKiAgIG9yIGEgcmVsYXRpdmUgcmFuZ2UgbGlrZSBge3JhbmdlOiAnbGF0ZXN0LU4nfWAgd2hlcmUgTiBpcyB0aGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICovXG4gICAgaWYgKHRoaXMuc3BlY2lhbFJhbmdlICYmICFmb3JDYWNoZUtleSkge1xuICAgICAgcGFyYW1zLnJhbmdlID0gdGhpcy5zcGVjaWFsUmFuZ2UucmFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgIHBhcmFtcy5lbmQgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIH1cblxuICAgIC8qKiBvbmx5IGNlcnRhaW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBhZ2UgbmFtZSBhcmUgZXNjYXBlZCAqL1xuICAgIHBhcmFtcy5wYWdlID0gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCkuc2NvcmUoKS5yZXBsYWNlKC9bJiVdL2csIGVzY2FwZSk7XG5cbiAgICBpZiAoIWZvckNhY2hlS2V5KSB7XG4gICAgICBwYXJhbXMuc29ydCA9IHRoaXMuc29ydDtcbiAgICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIHBhcmFtcy52aWV3ID0gdGhpcy52aWV3O1xuXG4gICAgICAvKiogYWRkIGF1dG9sb2cgcGFyYW0gb25seSBpZiBpdCB3YXMgcGFzc2VkIGluIG9yaWdpbmFsbHksIGFuZCBvbmx5IGlmIGl0IHdhcyBmYWxzZSAodHJ1ZSB3b3VsZCBiZSBkZWZhdWx0KSAqL1xuICAgICAgaWYgKHRoaXMubm9Mb2dTY2FsZSkgcGFyYW1zLmF1dG9sb2cgPSAnZmFsc2UnO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUHVzaCByZWxldmFudCBjbGFzcyBwcm9wZXJ0aWVzIHRvIHRoZSBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gY2xlYXIgLSB3aGV0ZXIgdG8gY2xlYXIgdGhlIHF1ZXJ5IHN0cmluZyBlbnRpcmVseVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwdXNoUGFyYW1zKGNsZWFyID0gZmFsc2UpIHtcbiAgICBpZiAoIXdpbmRvdy5oaXN0b3J5IHx8ICF3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHJldHVybjtcblxuICAgIGlmIChjbGVhcikge1xuICAgICAgcmV0dXJuIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0pO1xuICAgIH1cblxuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIGA/JHskLnBhcmFtKHRoaXMuZ2V0UGFyYW1zKCkpfWApO1xuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgL2xhbmd2aWV3cz8keyQucGFyYW0odGhpcy5nZXRQZXJtYUxpbmsoKSl9YCk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gdGhlIGJhZGdlIGNvZGUgcHJvdmlkZWQgYnkgdGhlIFdpa2lkYXRhIEFQSSwgcmV0dXJuIGEgaW1hZ2UgdGFnIG9mIHRoZSBiYWRnZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGJhZGdlQ29kZSAtIGFzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuYmFkZ2VzXG4gICAqIEByZXR1cm4ge1N0cmluZ30gSFRNTCBtYXJrdXAgZm9yIHRoZSBpbWFnZVxuICAgKi9cbiAgZ2V0QmFkZ2VNYXJrdXAoYmFkZ2VDb2RlKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5iYWRnZXNbYmFkZ2VDb2RlXSkgcmV0dXJuICcnO1xuICAgIGNvbnN0IGJhZGdlSW1hZ2UgPSB0aGlzLmNvbmZpZy5iYWRnZXNbYmFkZ2VDb2RlXS5pbWFnZSxcbiAgICAgIGJhZGdlTmFtZSA9IHRoaXMuY29uZmlnLmJhZGdlc1tiYWRnZUNvZGVdLm5hbWU7XG4gICAgcmV0dXJuIGA8aW1nIGNsYXNzPSdhcnRpY2xlLWJhZGdlJyBzcmM9JyR7YmFkZ2VJbWFnZX0nIGFsdD0nJHtiYWRnZU5hbWV9JyB0aXRsZT0nJHtiYWRnZU5hbWV9JyAvPmA7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGxpc3Qgb2YgbGFuZ3ZpZXdzIGludG8gdmlld1xuICAgKiBAb3ZlcnJpZGVcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlbmRlckRhdGEoKSB7XG4gICAgc3VwZXIucmVuZGVyRGF0YShzb3J0ZWREYXRhc2V0cyA9PiB7XG4gICAgICBjb25zdCB0b3RhbEJhZGdlc01hcmt1cCA9IE9iamVjdC5rZXlzKHRoaXMub3V0cHV0RGF0YS5iYWRnZXMpLm1hcChiYWRnZSA9PiB7XG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9J25vd3JhcCc+JHt0aGlzLmdldEJhZGdlTWFya3VwKGJhZGdlKX0gJnRpbWVzOyAke3RoaXMub3V0cHV0RGF0YS5iYWRnZXNbYmFkZ2VdfTwvc3Bhbj5gO1xuICAgICAgfSkuam9pbignLCAnKTtcblxuICAgICAgJCgnLm91dHB1dC10b3RhbHMnKS5odG1sKFxuICAgICAgICBgPHRoIHNjb3BlPSdyb3cnPiR7JC5pMThuKCd0b3RhbHMnKX08L3RoPlxuICAgICAgICAgPHRoPiR7JC5pMThuKCdudW0tbGFuZ3VhZ2VzJywgc29ydGVkRGF0YXNldHMubGVuZ3RoKX08L3RoPlxuICAgICAgICAgPHRoPiR7JC5pMThuKCd1bmlxdWUtdGl0bGVzJywgdGhpcy5vdXRwdXREYXRhLnRpdGxlcy5sZW5ndGgpfTwvdGg+XG4gICAgICAgICA8dGg+JHt0b3RhbEJhZGdlc01hcmt1cH08L3RoPlxuICAgICAgICAgPHRoPiR7dGhpcy5mb3JtYXROdW1iZXIodGhpcy5vdXRwdXREYXRhLnN1bSl9PC90aD5cbiAgICAgICAgIDx0aD4ke3RoaXMuZm9ybWF0TnVtYmVyKE1hdGgucm91bmQodGhpcy5vdXRwdXREYXRhLmF2ZXJhZ2UpKX0gLyAkeyQuaTE4bignZGF5Jyl9PC90aD5gXG4gICAgICApO1xuICAgICAgJCgnI291dHB1dF9saXN0JykuaHRtbCgnJyk7XG5cbiAgICAgIHNvcnRlZERhdGFzZXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBiYWRnZU1hcmt1cCA9ICcnO1xuICAgICAgICBpZiAoaXRlbS5iYWRnZXMpIHtcbiAgICAgICAgICBiYWRnZU1hcmt1cCA9IGl0ZW0uYmFkZ2VzLm1hcCh0aGlzLmdldEJhZGdlTWFya3VwLmJpbmQodGhpcykpLmpvaW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNvdXRwdXRfbGlzdCcpLmFwcGVuZChcbiAgICAgICAgICBgPHRyPlxuICAgICAgICAgICA8dGggc2NvcGU9J3Jvdyc+JHtpbmRleCArIDF9PC90aD5cbiAgICAgICAgICAgPHRkPiR7aXRlbS5sYW5nfTwvdGQ+XG4gICAgICAgICAgIDx0ZD48YSBocmVmPVwiJHtpdGVtLnVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2l0ZW0ubGFiZWx9PC9hPjwvdGQ+XG4gICAgICAgICAgIDx0ZD4ke2JhZGdlTWFya3VwfTwvdGQ+XG4gICAgICAgICAgIDx0ZD48YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0nJHt0aGlzLmdldFBhZ2V2aWV3c1VSTChgJHtpdGVtLmxhbmd9LiR7dGhpcy5iYXNlUHJvamVjdH0ub3JnYCwgaXRlbS5sYWJlbCl9Jz4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0uc3VtKX08L2E+PC90ZD5cbiAgICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoTWF0aC5yb3VuZChpdGVtLmF2ZXJhZ2UpKX0gLyAkeyQuaTE4bignZGF5Jyl9PC90ZD5cbiAgICAgICAgICAgPC90cj5gXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmFsdWUgb2YgZ2l2ZW4gbGFuZ3ZpZXcgZW50cnkgZm9yIHRoZSBwdXJwb3NlcyBvZiBjb2x1bW4gc29ydGluZ1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0gLSBsYW5ndmlldyBlbnRyeSB3aXRoaW4gdGhpcy5vdXRwdXREYXRhXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSAtIHR5cGUgb2YgcHJvcGVydHkgdG8gZ2V0XG4gICAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9IC0gdmFsdWVcbiAgICovXG4gIGdldFNvcnRQcm9wZXJ0eShpdGVtLCB0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnbGFuZyc6XG4gICAgICByZXR1cm4gaXRlbS5sYW5nO1xuICAgIGNhc2UgJ3RpdGxlJzpcbiAgICAgIHJldHVybiBpdGVtLmxhYmVsO1xuICAgIGNhc2UgJ2JhZGdlcyc6XG4gICAgICByZXR1cm4gaXRlbS5iYWRnZXMuc29ydCgpLmpvaW4oJycpO1xuICAgIGNhc2UgJ3ZpZXdzJzpcbiAgICAgIHJldHVybiBOdW1iZXIoaXRlbS5zdW0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMb29wIHRocm91Z2ggZ2l2ZW4gaW50ZXJ3aWtpIGRhdGEgYW5kIHF1ZXJ5IHRoZSBwYWdldmlld3MgQVBJIGZvciBlYWNoXG4gICAqICAgQWxzbyB1cGRhdGVzIHRoaXMub3V0cHV0RGF0YSB3aXRoIHJlc3VsdFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGludGVyV2lraURhdGEgLSBhcyBnaXZlbiBieSB0aGUgZ2V0SW50ZXJ3aWtpRGF0YSBwcm9taXNlXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSAtIFByb21pc2UgcmVzb2x2aW5nIHdpdGggZGF0YSByZWFkeSB0byBiZSByZW5kZXJlZCB0byB2aWV3XG4gICAqL1xuICBnZXRQYWdlVmlld3NEYXRhKGludGVyV2lraURhdGEpIHtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICBlbmREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5zdGFydE9mKCdkYXknKSxcbiAgICAgIGludGVyV2lraUtleXMgPSBPYmplY3Qua2V5cyhpbnRlcldpa2lEYXRhKTtcblxuICAgIGxldCBkZmQgPSAkLkRlZmVycmVkKCksIHByb21pc2VzID0gW10sIGNvdW50ID0gMCwgZmFpbHVyZVJldHJpZXMgPSB7fSxcbiAgICAgIHRvdGFsUmVxdWVzdENvdW50ID0gaW50ZXJXaWtpS2V5cy5sZW5ndGgsIGZhaWxlZFBhZ2VzID0gW10sIHBhZ2VWaWV3c0RhdGEgPSBbXTtcblxuICAgIGNvbnN0IG1ha2VSZXF1ZXN0ID0gZGJOYW1lID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBpbnRlcldpa2lEYXRhW2RiTmFtZV0sXG4gICAgICAgIHVyaUVuY29kZWRQYWdlTmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChkYXRhLnRpdGxlKTtcblxuICAgICAgY29uc3QgdXJsID0gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL3Blci1hcnRpY2xlLyR7ZGF0YS5sYW5nfS4ke3RoaXMuYmFzZVByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZFBhZ2VOYW1lfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG4gICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXG4gICAgICBwcm9taXNlLmRvbmUocHZEYXRhID0+IHtcbiAgICAgICAgcGFnZVZpZXdzRGF0YS5wdXNoKHtcbiAgICAgICAgICBiYWRnZXM6IGRhdGEuYmFkZ2VzLFxuICAgICAgICAgIGRiTmFtZSxcbiAgICAgICAgICBsYW5nOiBkYXRhLmxhbmcsXG4gICAgICAgICAgdGl0bGU6IGRhdGEudGl0bGUsXG4gICAgICAgICAgdXJsOiBkYXRhLnVybCxcbiAgICAgICAgICBpdGVtczogcHZEYXRhLml0ZW1zXG4gICAgICAgIH0pO1xuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCcsXG4gICAgICAgICAgZmFpbGVkUGFnZUxpbmsgPSB0aGlzLmdldFBhZ2VMaW5rKGRhdGEudGl0bGUsIGAke2RhdGEubGFuZ30uJHt0aGlzLmJhc2VQcm9qZWN0fS5vcmdgKTtcblxuICAgICAgICBpZiAoY2Fzc2FuZHJhRXJyb3IpIHtcbiAgICAgICAgICBpZiAoZmFpbHVyZVJldHJpZXNbZGJOYW1lXSkge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbZGJOYW1lXSsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmYWlsdXJlUmV0cmllc1tkYk5hbWVdID0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiogbWF4aW11bSBvZiAzIHJldHJpZXMgKi9cbiAgICAgICAgICBpZiAoZmFpbHVyZVJldHJpZXNbZGJOYW1lXSA8IDMpIHtcbiAgICAgICAgICAgIHRvdGFsUmVxdWVzdENvdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYXRlTGltaXQobWFrZVJlcXVlc3QsIHRoaXMuY29uZmlnLmFwaVRocm90dGxlLCB0aGlzKShkYk5hbWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKiByZXRyaWVzIGV4Y2VlZGVkICovXG4gICAgICAgICAgZmFpbGVkUGFnZXMucHVzaChmYWlsZWRQYWdlTGluayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBgJHtmYWlsZWRQYWdlTGlua306ICR7JC5pMThuKCdhcGktZXJyb3InLCAnUGFnZXZpZXdzIEFQSScpfSAtICR7ZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVubGVzcyBpdCB3YXMgYSA0MDQsIGRvbid0IGNhY2hlIHRoaXMgc2VyaWVzIG9mIHJlcXVlc3RzXG4gICAgICAgIGlmIChlcnJvckRhdGEuc3RhdHVzICE9PSA0MDQpIGhhZEZhaWx1cmUgPSB0cnVlO1xuICAgICAgfSkuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigrK2NvdW50LCB0b3RhbFJlcXVlc3RDb3VudCk7XG5cbiAgICAgICAgaWYgKGNvdW50ID09PSB0b3RhbFJlcXVlc3RDb3VudCkge1xuICAgICAgICAgIGlmIChmYWlsZWRQYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bihcbiAgICAgICAgICAgICAgJ2FwaS1lcnJvci10aW1lb3V0JyxcbiAgICAgICAgICAgICAgJzx1bD4nICtcbiAgICAgICAgICAgICAgZmFpbGVkUGFnZXMubWFwKGZhaWxlZFBhZ2UgPT4gYDxsaT4ke2ZhaWxlZFBhZ2V9PC9saT5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAgICc8L3VsPidcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRmZC5yZXNvbHZlKHBhZ2VWaWV3c0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVxdWVzdEZuID0gdGhpcy5yYXRlTGltaXQobWFrZVJlcXVlc3QsIHRoaXMuY29uZmlnLmFwaVRocm90dGxlLCB0aGlzKTtcblxuICAgIGludGVyV2lraUtleXMuZm9yRWFjaCgoZGJOYW1lLCBpbmRleCkgPT4ge1xuICAgICAgcmVxdWVzdEZuKGRiTmFtZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IFdpa2lkYXRhIHRvIGZpbmQgZGF0YSBhYm91dCBhIGdpdmVuIHBhZ2UgYWNyb3NzIGFsbCBzaXN0ZXIgcHJvamVjdHNcbiAgICogQHBhcmFtICB7U3RyaW5nfSBkYk5hbWUgLSBkYXRhYmFzZSBuYW1lIG9mIHNvdXJjZSBwcm9qZWN0XG4gICAqIEBwYXJhbSAge1N0cmluZ30gcGFnZU5hbWUgLSBuYW1lIG9mIHBhZ2Ugd2Ugd2FudCB0byBnZXQgZGF0YSBhYm91dFxuICAgKiBAcmV0dXJuIHtEZWZlcnJlZH0gLSBQcm9taXNlIHJlc29sdmluZyB3aXRoIGludGVyd2lraSBkYXRhXG4gICAqL1xuICBnZXRJbnRlcndpa2lEYXRhKGRiTmFtZSwgcGFnZU5hbWUpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vd3d3Lndpa2lkYXRhLm9yZy93L2FwaS5waHA/YWN0aW9uPXdiZ2V0ZW50aXRpZXMmc2l0ZXM9JHtkYk5hbWV9YCArXG4gICAgICBgJnRpdGxlcz0ke2VuY29kZVVSSUNvbXBvbmVudChwYWdlTmFtZSl9JnByb3BzPXNpdGVsaW5rcy91cmxzfGRhdGF0eXBlJmZvcm1hdD1qc29uJmNhbGxiYWNrPT9gO1xuXG4gICAgJC5nZXRKU09OKHVybCkuZG9uZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgIHJldHVybiBkZmQucmVqZWN0KGAkeyQuaTE4bignYXBpLWVycm9yJywgJ1dpa2lkYXRhJyl9OiAke2RhdGEuZXJyb3IuaW5mb31gKTtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5lbnRpdGllc1snLTEnXSkge1xuICAgICAgICByZXR1cm4gZGZkLnJlamVjdChcbiAgICAgICAgICBgPGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9JyR7dGhpcy5nZXRQYWdlVVJMKHBhZ2VOYW1lKS5lc2NhcGUoKX0nPiR7cGFnZU5hbWUuZGVzY29yZSgpLmVzY2FwZSgpfTwvYT4gLSAkeyQuaTE4bignYXBpLWVycm9yLW5vLWRhdGEnKX1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGRhdGEuZW50aXRpZXMpWzBdLFxuICAgICAgICBzaXRlbGlua3MgPSBkYXRhLmVudGl0aWVzW2tleV0uc2l0ZWxpbmtzLFxuICAgICAgICBmaWx0ZXJlZExpbmtzID0ge30sXG4gICAgICAgIG1hdGNoUmVnZXggPSBuZXcgUmVnRXhwKGBeaHR0cHM6Ly9bXFxcXHctXStcXFxcLiR7dGhpcy5iYXNlUHJvamVjdH1cXFxcLm9yZ2ApO1xuXG4gICAgICAvKiogcmVzdHJpY3QgdG8gc2VsZWN0ZWQgYmFzZSBwcm9qZWN0IChlLmcuIHdpa2lwZWRpYXMsIG5vdCB3aWtpcGVkaWFzIGFuZCB3aWtpdm95YWdlcykgKi9cbiAgICAgIE9iamVjdC5rZXlzKHNpdGVsaW5rcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCBzaXRlTWFwS2V5ID0gc2l0ZWxpbmtzW2tleV0uc2l0ZS5yZXBsYWNlKC8tL2csICdfJyk7XG5cbiAgICAgICAgaWYgKG1hdGNoUmVnZXgudGVzdChzaXRlbGlua3Nba2V5XS51cmwpICYmIHNpdGVNYXBbc2l0ZU1hcEtleV0pIHtcbiAgICAgICAgICBzaXRlbGlua3Nba2V5XS5sYW5nID0gc2l0ZU1hcFtzaXRlTWFwS2V5XS5yZXBsYWNlKC9cXC53aWtpLiokLywgJycpO1xuICAgICAgICAgIGZpbHRlcmVkTGlua3Nba2V5XSA9IHNpdGVsaW5rc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKGZpbHRlcmVkTGlua3MpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB3aWtpIFVSTCBmb3IgdGhlIHBhZ2UgbmFtZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCAtIGZ1bGwgVVJMIHRvIGEgd2lraSBwYWdlXG4gICAqIEByZXR1cm4ge1N0cmluZ3xudWxsfSBwYWdlIG5hbWVcbiAgICovXG4gIGdldFBhZ2VOYW1lRnJvbVVSTCh1cmwpIHtcbiAgICBpZiAodXJsLmluY2x1ZGVzKCc/JykpIHtcbiAgICAgIHJldHVybiB1cmwubWF0Y2goL1xcPyg/Oi4qXFxiKT90aXRsZT0oLio/KSg/OiZ8JCkvKVsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVybC5tYXRjaCgvXFwvd2lraVxcLyguKj8pKD86XFw/fCQpLylbMV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgVVJMIHF1ZXJ5IHN0cmluZyBhbmQgc2V0cyBhbGwgdGhlIGlucHV0cyBhY2NvcmRpbmdseVxuICAgKiBTaG91bGQgb25seSBiZSBjYWxsZWQgb24gaW5pdGlhbCBwYWdlIGxvYWQsIHVudGlsIHdlIGRlY2lkZSB0byBzdXBwb3J0IHBvcCBzdGF0ZXMgKHByb2JhYmx5IG5ldmVyKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcG9wUGFyYW1zKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLnZhbGlkYXRlUGFyYW1zKFxuICAgICAgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKCdwYWdlcycpXG4gICAgKTtcblxuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwocGFyYW1zLnByb2plY3QpO1xuICAgIHRoaXMudmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKTtcblxuICAgIHRoaXMucGF0Y2hVc2FnZSgpO1xuXG4gICAgLy8gZmlsbCBpbiB2YWx1ZSBmb3IgdGhlIHBhZ2VcbiAgICBpZiAocGFyYW1zLnBhZ2UpIHtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbChkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLnBhZ2UpLmRlc2NvcmUoKSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGludmFsaWQgcGFyYW1zLCByZW1vdmUgcGFnZSBmcm9tIHBhcmFtcyBzbyB3ZSBkb24ndCBwcm9jZXNzIHRoZSBkZWZhdWx0cy5cbiAgICAvLyBGSVhNRTogd2UncmUgY2hlY2tpbmcgZm9yIHNpdGUgbWVzc2FnZXMgYmVjYXVzZSBzdXBlci52YWxpZGF0ZVBhcmFtcyBkb2Vzbid0IHJldHVybiBhIGJvb2xlYW5cbiAgICAvLyAgIG9yIGFueSBpbmRpY2F0aW9uIHRoZSB2YWxpZGF0aW9ucyBmYWlsZWQuIFRoaXMgaXMgaGFja3kgYnV0IG5lY2Vzc2FyeS5cbiAgICBpZiAoJCgnLnNpdGUtbm90aWNlIC5hbGVydC1kYW5nZXInKS5sZW5ndGgpIHtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucGFnZTtcbiAgICB9XG5cbiAgICAkKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbChwYXJhbXMucGxhdGZvcm0pO1xuICAgICQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKHBhcmFtcy5hZ2VudCk7XG5cbiAgICAvKiogZXhwb3J0IG5lY2Vzc2FyeSBwYXJhbXMgdG8gb3V0ZXIgc2NvcGUgKi9cbiAgICBbJ3NvcnQnLCAnZGlyZWN0aW9uJywgJ3ZpZXcnXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0dXBTb3VyY2VJbnB1dCgpO1xuXG4gICAgLyoqIHN0YXJ0IHVwIHByb2Nlc3NpbmcgaWYgcGFnZSBuYW1lIGlzIHByZXNlbnQgKi9cbiAgICBpZiAocGFyYW1zLnBhZ2UpIHtcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBzZXQgYSBDU1MgY2xhc3Mgb24gdGhlIGBtYWluYCBub2RlLFxuICAgKiAgIHN0eWxpbmcgdGhlIGRvY3VtZW50IGJhc2VkIG9uIGEgJ3N0YXRlJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RhdGUgLSBjbGFzcyB0byBiZSBhZGRlZDtcbiAgICogICBzaG91bGQgYmUgb25lIG9mIFsnaW5pdGlhbCcsICdwcm9jZXNzaW5nJywgJ2NvbXBsZXRlJ11cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgJCgnbWFpbicpLnJlbW92ZUNsYXNzKHRoaXMuY29uZmlnLmZvcm1TdGF0ZXMuam9pbignICcpKS5hZGRDbGFzcyhzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgY2FzZSAnaW5pdGlhbCc6XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMuYXNzaWduRGVmYXVsdHMoKTtcbiAgICAgIHRoaXMuZGVzdHJveUNoYXJ0KCk7XG4gICAgICAkKCdvdXRwdXQnKS5yZW1vdmVDbGFzcygnbGlzdC1tb2RlJykucmVtb3ZlQ2xhc3MoJ2NoYXJ0LW1vZGUnKTtcbiAgICAgICQoJy5kYXRhLWxpbmtzJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB0aGlzLnR5cGVhaGVhZC5oaWRlKCk7XG4gICAgICAkKHRoaXMuY29uZmlnLnNvdXJjZUlucHV0KS52YWwoJycpLmZvY3VzKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcm9jZXNzaW5nJzpcbiAgICAgIHRoaXMucHJvY2Vzc1N0YXJ0ZWQoKTtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY29tcGxldGUnOlxuICAgICAgdGhpcy5wcm9jZXNzRW5kZWQoKTtcbiAgICAgIC8qKiBzdG9wIGhpZGRlbiBhbmltYXRpb24gZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudCAqL1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigwKTtcbiAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcuZGF0YS1saW5rcycpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ludmFsaWQnOlxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3MgdGhlIGxhbmd2aWV3cyBmb3IgdGhlIGFydGljbGUgYW5kIG9wdGlvbnMgZW50ZXJlZFxuICAgKiBDYWxsZWQgd2hlbiBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAqIEByZXR1cm4ge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHByb2Nlc3NJbnB1dCgpIHtcbiAgICBjb25zdCBwYWdlID0gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCk7XG5cbiAgICB0aGlzLnNldFN0YXRlKCdwcm9jZXNzaW5nJyk7XG5cbiAgICBjb25zdCByZWFkeUZvclJlbmRlcmluZyA9ICgpID0+IHtcbiAgICAgICQoJy5vdXRwdXQtdGl0bGUnKS5odG1sKHRoaXMub3V0cHV0RGF0YS5saW5rKTtcbiAgICAgICQoJy5vdXRwdXQtcGFyYW1zJykuaHRtbCgkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS52YWwoKSk7XG4gICAgICB0aGlzLnNldEluaXRpYWxDaGFydFR5cGUoKTtcbiAgICAgIHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5pc1JlcXVlc3RDYWNoZWQoKSkge1xuICAgICAgJCgnLnByb2dyZXNzLWJhcicpLmNzcygnd2lkdGgnLCAnMTAwJScpO1xuICAgICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignbG9hZGluZy1jYWNoZScpKTtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vdXRwdXREYXRhID0gc2ltcGxlU3RvcmFnZS5nZXQodGhpcy5nZXRDYWNoZUtleSgpKTtcbiAgICAgICAgcmVhZHlGb3JSZW5kZXJpbmcoKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGJOYW1lID0gT2JqZWN0LmtleXMoc2l0ZU1hcCkuZmluZChrZXkgPT4gc2l0ZU1hcFtrZXldID09PSAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkudmFsKCkpO1xuXG4gICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignZmV0Y2hpbmctZGF0YScsICdXaWtpZGF0YScpKTtcbiAgICB0aGlzLmdldEludGVyd2lraURhdGEoZGJOYW1lLCBwYWdlKS5kb25lKGludGVyV2lraURhdGEgPT4ge1xuICAgICAgdGhpcy5nZXRQYWdlVmlld3NEYXRhKGludGVyV2lraURhdGEpLmRvbmUocGFnZVZpZXdzRGF0YSA9PiB7XG4gICAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignYnVpbGRpbmctZGF0YXNldCcpKTtcbiAgICAgICAgY29uc3QgcGFnZUxpbmsgPSB0aGlzLmdldFBhZ2VMaW5rKGRlY29kZVVSSUNvbXBvbmVudChwYWdlKSwgdGhpcy5wcm9qZWN0KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5idWlsZE1vdGhlckRhdGFzZXQocGFnZSwgcGFnZUxpbmssIHBhZ2VWaWV3c0RhdGEpO1xuICAgICAgICAgIHJlYWR5Rm9yUmVuZGVyaW5nKCk7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgICB9KTtcbiAgICB9KS5mYWlsKGVycm9yID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcblxuICAgICAgLyoqIHN0cnVjdHVyZWQgZXJyb3IgY29tZXMgYmFjayBhcyBhIHN0cmluZywgb3RoZXJ3aXNlIHdlIGRvbid0IGtub3cgd2hhdCBoYXBwZW5lZCAqL1xuICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdhcGktZXJyb3ItdW5rbm93bicsICdXaWtpZGF0YScpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCB0eXBlYWhlYWQgb24gdGhlIGFydGljbGUgaW5wdXQsIGtpbGxpbmcgdGhlIHByZXZvdXMgaW5zdGFuY2UgaWYgcHJlc2VudFxuICAgKiBAcmV0dXJuIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBzZXR1cFNvdXJjZUlucHV0KCkge1xuICAgIGlmICh0aGlzLnR5cGVhaGVhZCkgdGhpcy50eXBlYWhlYWQuZGVzdHJveSgpO1xuXG4gICAgJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudHlwZWFoZWFkKHtcbiAgICAgIGFqYXg6IHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICAgIHRpbWVvdXQ6IDIwMCxcbiAgICAgICAgdHJpZ2dlckxlbmd0aDogMSxcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgcHJlRGlzcGF0Y2g6IHF1ZXJ5ID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICAgICAgbGlzdDogJ3ByZWZpeHNlYXJjaCcsXG4gICAgICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgICAgIHBzc2VhcmNoOiBxdWVyeVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIHByZVByb2Nlc3M6IGRhdGEgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBkYXRhLnF1ZXJ5LnByZWZpeHNlYXJjaC5tYXAoZWxlbSA9PiBlbGVtLnRpdGxlKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIHBhcmVudCBzZXR1cFByb2plY3RJbnB1dCBhbmQgdXBkYXRlcyB0aGUgdmlldyBpZiB2YWxpZGF0aW9ucyBwYXNzZWRcbiAgICogICByZXZlcnRpbmcgdG8gdGhlIG9sZCB2YWx1ZSBpZiB0aGUgbmV3IG9uZSBpcyBpbnZhbGlkXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgdmFsaWRhdGVQcm9qZWN0KCkge1xuICAgIC8vICd0cnVlJyB2YWxpZGF0ZXMgdGhhdCBpdCBpcyBhIG11bHRpbGluZ3VhbCBwcm9qZWN0XG4gICAgaWYgKHN1cGVyLnZhbGlkYXRlUHJvamVjdCh0cnVlKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcpO1xuXG4gICAgICAvKioga2lsbCBhbmQgcmUtaW5pdCB0eXBlYWhlYWQgdG8gcG9pbnQgdG8gbmV3IHByb2plY3QgKi9cbiAgICAgIHRoaXMuc2V0dXBTb3VyY2VJbnB1dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIGN1cnJlbnQgbGFuZyBkYXRhIHRvIENTViBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBXaXRoIHRoZSBwcmVwZW5kZWQgZGF0YTp0ZXh0L2NzdiB0aGlzIHNob3VsZCBjYXVzZSB0aGUgYnJvd3NlciB0byBkb3dubG9hZCB0aGUgZGF0YVxuICAgKiBAb3ZlcnJpZGVcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGV4cG9ydENTVigpIHtcbiAgICBsZXQgY3N2Q29udGVudCA9IGBkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsTGFuZ3VhZ2UsVGl0bGUsQmFkZ2VzLCR7dGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpLmpvaW4oJywnKX1cXG5gO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICB0aGlzLm91dHB1dERhdGEubGlzdERhdGEuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VOYW1lID0gJ1wiJyArIHBhZ2UubGFiZWwuZGVzY29yZSgpLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInLFxuICAgICAgICBiYWRnZXMgPSAnXCInICsgcGFnZS5iYWRnZXMubWFwKGJhZGdlID0+IHRoaXMuY29uZmlnLmJhZGdlc1tiYWRnZV0ubmFtZS5yZXBsYWNlKC9cIi9nLCAnXCJcIicpKSArICdcIic7XG5cbiAgICAgIGNzdkNvbnRlbnQgKz0gW1xuICAgICAgICBwYWdlLmxhbmcsXG4gICAgICAgIHBhZ2VOYW1lLFxuICAgICAgICBiYWRnZXNcbiAgICAgIF0uY29uY2F0KHBhZ2UuZGF0YSkuam9pbignLCcpICsgJ1xcbic7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRvd25sb2FkRGF0YShjc3ZDb250ZW50LCAnY3N2Jyk7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAvKiogYXNzdW1lIGhhc2ggcGFyYW1zIGFyZSBzdXBwb3NlZCB0byBiZSBxdWVyeSBwYXJhbXMgKi9cbiAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2ggJiYgIWRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5yZXBsYWNlKCcjJywgJz8nKTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1xcIy4qLywgJycpO1xuICB9XG5cbiAgbmV3IExhbmdWaWV3cygpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpYywgdXNlZCBpbiBhbGwgYXBwcyBleGNlcHQgVG9wdmlld3NcbiAqIEBwYXJhbSB7Y2xhc3N9IHN1cGVyY2xhc3MgLSBiYXNlIGNsYXNzXG4gKiBAcmV0dXJucyB7bnVsbH0gY2xhc3MgZXh0ZW5kaW5nIHN1cGVyY2xhc3NcbiAqL1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgdGhpcy5jaGFydE9iaiA9IG51bGw7XG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gbnVsbDtcbiAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSB0cnVlOyAvLyB3aWxsIGJlY29tZSBmYWxzZSB3aGVuIHRoZXkgbWFudWFsbHkgY2hhbmdlIHRoZSBjaGFydCB0eXBlXG5cbiAgICAvKiogZW5zdXJlIHdlIGhhdmUgYSB2YWxpZCBjaGFydCB0eXBlIGluIGxvY2FsU3RvcmFnZSwgcmVzdWx0IG9mIENoYXJ0LmpzIDEuMCB0byAyLjAgbWlncmF0aW9uICovXG4gICAgY29uc3Qgc3RvcmVkQ2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpO1xuICAgIGlmICghdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkgJiYgIXRoaXMuY29uZmlnLmNpcmN1bGFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkpIHtcbiAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZSgpKTtcbiAgICB9XG5cbiAgICAvLyBsZWF2ZSBpZiB0aGVyZSdzIG5vIGNoYXJ0IGNvbmZpZ3VyZWRcbiAgICBpZiAoIXRoaXMuY29uZmlnLmNoYXJ0KSByZXR1cm47XG5cbiAgICAvKiogQHR5cGUge0Jvb2xlYW59IGFkZCBhYmlsaXR5IHRvIGRpc2FibGUgYXV0by1sb2cgZGV0ZWN0aW9uICovXG4gICAgdGhpcy5ub0xvZ1NjYWxlID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdhdXRvbG9nPWZhbHNlJyk7XG5cbiAgICAvKiogY29weSBvdmVyIGFwcC1zcGVjaWZpYyBjaGFydCB0ZW1wbGF0ZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuZm9yRWFjaChsaW5lYXJDaGFydCA9PiB7XG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1tsaW5lYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmxpbmVhckxlZ2VuZDtcbiAgICB9KTtcbiAgICB0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5mb3JFYWNoKGNpcmN1bGFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbY2lyY3VsYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmNpcmN1bGFyTGVnZW5kO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbihDaGFydC5kZWZhdWx0cy5nbG9iYWwsIHthbmltYXRpb246IGZhbHNlLCByZXNwb25zaXZlOiB0cnVlfSk7XG5cbiAgICAvKiogY2hhbmdpbmcgb2YgY2hhcnQgdHlwZXMgKi9cbiAgICAkKCcubW9kYWwtY2hhcnQtdHlwZSBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSBmYWxzZTtcblxuICAgICAgJCgnLmxvZ2FyaXRobWljLXNjYWxlJykudG9nZ2xlKHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZSh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKTtcblxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY2hhcnRUeXBlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc0NoYXJ0QXBwKCkgPyB0aGlzLnVwZGF0ZUNoYXJ0KHRoaXMucGFnZVZpZXdzRGF0YSkgOiB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvTG9nRGV0ZWN0aW9uID0gJ2ZhbHNlJztcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlZC9lbmFibGUgYmVnaW4gYXQgemVybyBjaGVja2JveCBhY2NvcmRpbmdseSxcbiAgICAgKiBidXQgZG9uJ3QgdXBkYXRlIGNoYXJ0IHNpbmNlIHRoZSBsb2cgc2NhbGUgdmFsdWUgY2FuIGNoYW5nZSBwcmFnbWF0aWNhbGx5IGFuZCBub3QgZnJvbSB1c2VyIGlucHV0XG4gICAgICovXG4gICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCB0aGlzLmNoZWNrZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH1cblxuICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKiogY2hhcnQgZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLXBuZycpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0UE5HLmJpbmQodGhpcykpO1xuICAgICQoJy5wcmludC1jaGFydCcpLm9uKCdjbGljaycsIHRoaXMucHJpbnRDaGFydC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgY2hhcnQgdHlwZSBvciB0aGUgb25lIGZyb20gbG9jYWxTdG9yYWdlLCBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW251bURhdGFzZXRzXSAtIG51bWJlciBvZiBkYXRhc2V0c1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0SW5pdGlhbENoYXJ0VHlwZShudW1EYXRhc2V0cyA9IDEpIHtcbiAgICBpZiAodGhpcy5yZW1lbWJlckNoYXJ0ID09PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5jb25maWcuZGVmYXVsdHMuY2hhcnRUeXBlKG51bURhdGFzZXRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBwcmV2aW91cyBjaGFydCwgaWYgbmVlZGVkLlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZGVzdHJveUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLmNoYXJ0T2JqKSB7XG4gICAgICB0aGlzLmNoYXJ0T2JqLmRlc3Ryb3koKTtcbiAgICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKCcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGNoYXJ0IGRhdGEgdG8gQ1NWIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIFdpdGggdGhlIHByZXBlbmRlZCBkYXRhOnRleHQvY3N2IHRoaXMgc2hvdWxkIGNhdXNlIHRoZSBicm93c2VyIHRvIGRvd25sb2FkIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRDU1YoKSB7XG4gICAgbGV0IGNzdkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LERhdGUsJztcbiAgICBsZXQgdGl0bGVzID0gW107XG4gICAgbGV0IGRhdGFSb3dzID0gW107XG4gICAgbGV0IGRhdGVzID0gdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpO1xuXG4gICAgLy8gQmVnaW4gY29uc3RydWN0aW5nIHRoZSBkYXRhUm93cyBhcnJheSBieSBwb3B1bGF0aW5nIGl0IHdpdGggdGhlIGRhdGVzXG4gICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgIGRhdGFSb3dzW2luZGV4XSA9IFtkYXRlXTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgLy8gQnVpbGQgYW4gYXJyYXkgb2Ygc2l0ZSB0aXRsZXMgZm9yIHVzZSBpbiB0aGUgQ1NWIGhlYWRlclxuICAgICAgbGV0IHNpdGVUaXRsZSA9ICdcIicgKyBzaXRlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInO1xuICAgICAgdGl0bGVzLnB1c2goc2l0ZVRpdGxlKTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGRhdGFSb3dzIGFycmF5IHdpdGggdGhlIGRhdGEgZm9yIHRoaXMgc2l0ZVxuICAgICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgZGF0YVJvd3NbaW5kZXhdLnB1c2goc2l0ZS5kYXRhW2luZGV4XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEZpbmlzaCB0aGUgQ1NWIGhlYWRlclxuICAgIGNzdkNvbnRlbnQgPSBjc3ZDb250ZW50ICsgdGl0bGVzLmpvaW4oJywnKSArICdcXG4nO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICBkYXRhUm93cy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgY3N2Q29udGVudCArPSBkYXRhLmpvaW4oJywnKSArICdcXG4nO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZERhdGEoY3N2Q29udGVudCwgJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIEpTT04gZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGV4cG9ydEpTT04oKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge1xuICAgICAgICBwYWdlOiBwYWdlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcXFwiJykucmVwbGFjZSgvJy9nLCBcIlxcJ1wiKSxcbiAgICAgICAgY29sb3I6IHBhZ2Uuc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN1bTogcGFnZS5zdW0sXG4gICAgICAgIGRhaWx5X2F2ZXJhZ2U6IE1hdGgucm91bmQocGFnZS5zdW0gLyB0aGlzLm51bURheXNJblJhbmdlKCkpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuZm9yRWFjaCgoaGVhZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgZW50cnlbaGVhZGluZy5yZXBsYWNlKC9cXFxcLywnJyldID0gcGFnZS5kYXRhW2luZGV4XTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhLnB1c2goZW50cnkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2pzb247Y2hhcnNldD11dGYtOCwnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgdGhpcy5kb3dubG9hZERhdGEoanNvbkNvbnRlbnQsICdqc29uJyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGRhdGEgYXMgUE5HIGltYWdlLCBvcGVuaW5nIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZXhwb3J0UE5HKCkge1xuICAgIHRoaXMuZG93bmxvYWREYXRhKHRoaXMuY2hhcnRPYmoudG9CYXNlNjRJbWFnZSgpLCAncG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgaW4gemVybyB2YWx1ZSB0byBhIHRpbWVzZXJpZXMsIHNlZTpcbiAgICogaHR0cHM6Ly93aWtpdGVjaC53aWtpbWVkaWEub3JnL3dpa2kvQW5hbHl0aWNzL0FRUy9QYWdldmlld19BUEkjR290Y2hhc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlIG9mIHJhbmdlIHRvIGZpbHRlciB0aHJvdWdoXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGUgb2YgcmFuZ2VcbiAgICogQHJldHVybnMge29iamVjdH0gZGF0YXNldCB3aXRoIHplcm9zIHdoZXJlIG51bGxzIHdoZXJlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhkYXRhLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICAvKiogRXh0cmFjdCB0aGUgZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgdGltZXNlcmllcyAqL1xuICAgIGxldCBhbHJlYWR5VGhlcmUgPSB7fTtcbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBsZXQgZGF0ZSA9IG1vbWVudChlbGVtLnRpbWVzdGFtcCwgdGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KTtcbiAgICAgIGFscmVhZHlUaGVyZVtkYXRlXSA9IGVsZW07XG4gICAgfSk7XG4gICAgZGF0YS5pdGVtcyA9IFtdO1xuXG4gICAgLyoqIFJlY29uc3RydWN0IHdpdGggemVyb3MgaW5zdGVhZCBvZiBudWxscyAqL1xuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQoc3RhcnREYXRlKTsgZGF0ZSA8PSBlbmREYXRlOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAoYWxyZWFkeVRoZXJlW2RhdGVdKSB7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaChhbHJlYWR5VGhlcmVbZGF0ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIFt0aGlzLmlzUGFnZXZpZXdzKCkgPyAndmlld3MnIDogJ2RldmljZXMnXTogZWRnZUNhc2UgPyBudWxsIDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBmb3JtYXR0ZWQgZm9yIENoYXJ0LmpzIGFuZCB0aGUgbGVnZW5kIHRlbXBsYXRlc1xuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhc2V0cyAtIGFzIHJldHJpZXZlZCBieSBnZXRQYWdlVmlld3NEYXRhXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gcmVhZHkgZm9yIGNoYXJ0IHJlbmRlcmluZ1xuICAgKi9cbiAgYnVpbGRDaGFydERhdGEoZGF0YXNldHMpIHtcbiAgICBjb25zdCBsYWJlbHMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkudmFsKCk7XG5cbiAgICAvKiogcHJlc2VydmUgb3JkZXIgb2YgZGF0YXNldHMgZHVlIHRvIGFzeW5jIGNhbGxzICovXG4gICAgcmV0dXJuIGRhdGFzZXRzLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcbiAgICAgIC8qKiBCdWlsZCB0aGUgYXJ0aWNsZSdzIGRhdGFzZXQuICovXG4gICAgICBjb25zdCB2YWx1ZXMgPSBkYXRhc2V0Lm1hcChlbGVtID0+IHRoaXMuaXNQYWdldmlld3MoKSA/IGVsZW0udmlld3MgOiBlbGVtLmRldmljZXMpLFxuICAgICAgICBzdW0gPSB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBNYXRoLnJvdW5kKHN1bSAvIHZhbHVlcy5sZW5ndGgpLFxuICAgICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpLFxuICAgICAgICBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1tpbmRleCAlIDEwXSxcbiAgICAgICAgbGFiZWwgPSBsYWJlbHNbaW5kZXhdLmRlc2NvcmUoKTtcblxuICAgICAgY29uc3QgZW50aXR5SW5mbyA9IHRoaXMuZW50aXR5SW5mbyA/IHRoaXMuZW50aXR5SW5mb1tsYWJlbF0gOiB7fTtcblxuICAgICAgZGF0YXNldCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICB2YWx1ZTogc3VtLCAvLyBkdXBsaWNhdGVkIGJlY2F1c2UgQ2hhcnQuanMgd2FudHMgYSBzaW5nbGUgYHZhbHVlYCBmb3IgY2lyY3VsYXIgY2hhcnRzXG4gICAgICAgIHN1bSxcbiAgICAgICAgYXZlcmFnZSxcbiAgICAgICAgbWF4LFxuICAgICAgICBtaW4sXG4gICAgICAgIGNvbG9yXG4gICAgICB9LCB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0uZGF0YXNldChjb2xvciksIGVudGl0eUluZm8pO1xuXG4gICAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gZGF0YXNldC5kYXRhLm1hcCh2aWV3ID0+IHZpZXcgfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1cmwgdG8gcXVlcnkgdGhlIEFQSSBiYXNlZCBvbiBhcHAgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eSAtIG5hbWUgb2YgZW50aXR5IHdlJ3JlIHF1ZXJ5aW5nIGZvciAocGFnZSBuYW1lIG9yIHByb2plY3QgbmFtZSlcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBVUkxcbiAgICovXG4gIGdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgIGNvbnN0IHVyaUVuY29kZWRFbnRpdHlOYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudGl0eSk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdzaXRldmlld3MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1BhZ2V2aWV3cygpID8gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL2FnZ3JlZ2F0ZS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKSA6IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3VuaXF1ZS1kZXZpY2VzLyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9LyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy9wYWdldmlld3MvcGVyLWFydGljbGUvJHt0aGlzLnByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3RoZXIgZnVuY3Rpb24gZm9yIHF1ZXJ5aW5nIHRoZSBBUEkgYW5kIHByb2Nlc3NpbmcgZGF0YVxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGVudGl0aWVzIC0gbGlzdCBvZiBwYWdlIG5hbWVzLCBvciBwcm9qZWN0cyBmb3IgU2l0ZXZpZXdzXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHBhZ2V2aWV3cyBkYXRhIGFuZCBlcnJvcnMsIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEoZW50aXRpZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IGVudGl0aWVzLmxlbmd0aCwgZmFpbGVkRW50aXRpZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSBldmVyeXRoaW5nIHdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBmb3IgdGhlIHByb21pc2VzICovXG4gICAgbGV0IHhockRhdGEgPSB7XG4gICAgICBlbnRpdGllcyxcbiAgICAgIGxhYmVsczogW10sIC8vIExhYmVscyAoZGF0ZXMpIGZvciB0aGUgeC1heGlzLlxuICAgICAgZGF0YXNldHM6IFtdLCAvLyBEYXRhIGZvciBlYWNoIGFydGljbGUgdGltZXNlcmllc1xuICAgICAgZXJyb3JzOiBbXSwgLy8gUXVldWUgdXAgZXJyb3JzIHRvIHNob3cgYWZ0ZXIgYWxsIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlXG4gICAgICBmYXRhbEVycm9yczogW10sIC8vIFVucmVjb3ZlcmFibGUgSmF2YVNjcmlwdCBlcnJvcnNcbiAgICAgIHByb21pc2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IChlbnRpdHksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICB1cmwgPSB0aGlzLmdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSksXG4gICAgICAgIHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG5cbiAgICAgIHhockRhdGEucHJvbWlzZXMucHVzaChwcm9taXNlKTtcblxuICAgICAgcHJvbWlzZS5kb25lKHN1Y2Nlc3NEYXRhID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdWNjZXNzRGF0YSA9IHRoaXMuZmlsbEluWmVyb3Moc3VjY2Vzc0RhdGEsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgICB4aHJEYXRhLmRhdGFzZXRzLnB1c2goc3VjY2Vzc0RhdGEuaXRlbXMpO1xuXG4gICAgICAgICAgLyoqIGZldGNoIHRoZSBsYWJlbHMgZm9yIHRoZSB4LWF4aXMgb24gc3VjY2VzcyBpZiB3ZSBoYXZlbid0IGFscmVhZHkgKi9cbiAgICAgICAgICBpZiAoc3VjY2Vzc0RhdGEuaXRlbXMgJiYgIXhockRhdGEubGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgeGhyRGF0YS5sYWJlbHMgPSBzdWNjZXNzRGF0YS5pdGVtcy5tYXAoZWxlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiB4aHJEYXRhLmZhdGFsRXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCc7XG5cbiAgICAgICAgaWYgKGNhc3NhbmRyYUVycm9yKSB7XG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0pIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbZW50aXR5XSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqIG1heGltdW0gb2YgMyByZXRyaWVzICovXG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPCAzKSB7XG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RDb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcykoZW50aXR5LCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgYXJ0aWNsZSBmcm9tIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIGFuYWx5emVcbiAgICAgICAgeGhyRGF0YS5lbnRpdGllcyA9IHhockRhdGEuZW50aXRpZXMuZmlsdGVyKGVsID0+IGVsICE9PSBlbnRpdHkpO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGZhaWxlZEVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbGluayA9IHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJyA/IHRoaXMuZ2V0U2l0ZUxpbmsoZW50aXR5KSA6IHRoaXMuZ2V0UGFnZUxpbmsoZW50aXR5LCB0aGlzLnByb2plY3QpO1xuICAgICAgICAgIHhockRhdGEuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICBgJHtsaW5rfTogJHskLmkxOG4oJ2FwaS1lcnJvcicsICdQYWdldmlld3MgQVBJJyl9IC0gJHtlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAoKytjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VWaWV3c0RhdGEgPSB4aHJEYXRhO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHhockRhdGEpO1xuXG4gICAgICAgICAgaWYgKGZhaWxlZEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKFxuICAgICAgICAgICAgICAnYXBpLWVycm9yLXRpbWVvdXQnLFxuICAgICAgICAgICAgICAnPHVsPicgK1xuICAgICAgICAgICAgICBmYWlsZWRFbnRpdGllcy5tYXAoZmFpbGVkRW50aXR5ID0+IGA8bGk+JHt0aGlzLmdldFBhZ2VMaW5rKGZhaWxlZEVudGl0eSwgdGhpcy5wcm9qZWN0LmVzY2FwZSgpKX08L2xpPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICAgJzwvdWw+J1xuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5LCBpbmRleCkgPT4gbWFrZVJlcXVlc3QoZW50aXR5LCBpbmRleCkpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIG5lZWRlZCB0byBjcmVhdGUgYSBwZXJtYW5lbnQgbGluayBvZiB2aXNpYmxlIGRhdGFcbiAgICogQHJldHVybiB7T2JqZWN0fSBoYXNoIG9mIHBhcmFtc1xuICAgKi9cbiAgZ2V0UGVybWFMaW5rKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhmYWxzZSk7XG4gICAgZGVsZXRlIHBhcmFtcy5yYW5nZTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSBjdXJyZW50bHkgaW4gbG9nYXJpdGhtaWMgbW9kZT9cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTG9nYXJpdGhtaWMoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkuaXMoJzpjaGVja2VkJykgJiYgdGhpcy5pc0xvZ2FyaXRobWljQ2FwYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgY2hhcnQgdHlwZSBzdXBwb3J0cyBhIGxvZ2FyaXRobWljIHNjYWxlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBsb2ctZnJpZW5kbHkgb3Igbm90XG4gICAqL1xuICBpc0xvZ2FyaXRobWljQ2FwYWJsZSgpIHtcbiAgICByZXR1cm4gWydsaW5lJywgJ2JhciddLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgdHJ5aW5nIHRvIHNob3cgZGF0YSBvbiBwYWdldmlld3MgKGFzIG9wcG9zZWQgdG8gdW5pcXVlIGRldmljZXMpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc1BhZ2V2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5hcHAgPT09ICdwYWdldmlld3MnIHx8ICQodGhpcy5jb25maWcuZGF0YVNvdXJjZVNlbGVjdG9yKS52YWwoKSA9PT0gJ3BhZ2V2aWV3cyc7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNVbmlxdWVEZXZpY2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1BhZ2V2aWV3cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaW50IHRoZSBjaGFydCFcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHByaW50Q2hhcnQoKSB7XG4gICAgbGV0IHRhYiA9IHdpbmRvdy5vcGVuKCk7XG4gICAgdGFiLmRvY3VtZW50LndyaXRlKFxuICAgICAgYDxpbWcgc3JjPVwiJHt0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKX1cIiAvPmBcbiAgICApO1xuICAgIHRhYi5wcmludCgpO1xuICAgIHRhYi5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hhcnQsIG1lc3NhZ2VzLCBhbmQgcmVzZXRzIHNpdGUgc2VsZWN0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZWxlY3QyXSB3aGV0aGVyIG9yIG5vdCB0byBjbGVhciB0aGUgU2VsZWN0MiBpbnB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRWaWV3KHNlbGVjdDIgPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICAvKiogdGhlc2UgY2FuIGZhaWwgc29tZXRpbWVzICovXG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuICAgICAgaWYgKHNlbGVjdDIpIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvLyBub3RoaW5nXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAkKHRoaXMuY29uZmlnLmNoYXJ0KS5oaWRlKCk7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdCB0byBmaW5lLXR1bmUgdGhlIHBvaW50ZXIgZGV0ZWN0aW9uIHNwYWNpbmcgYmFzZWQgb24gaG93IGNsdXR0ZXJlZCB0aGUgY2hhcnQgaXNcbiAgICogQHJldHVybnMge051bWJlcn0gcmFkaXVzXG4gICAqL1xuICBzZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCkge1xuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSAhPT0gJ2xpbmUnKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gNTApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMzApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSA1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMjApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmhpdFJhZGl1cyA9IDMwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBsb2dhcml0aG1pYyBjaGFydCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQsIGJhc2VkIG9uIFRoZWlsIGluZGV4XG4gICAqIEBwYXJhbSAge0FycmF5fSBkYXRhc2V0cyAtIHBhZ2V2aWV3c1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIHNob3VsZEJlTG9nYXJpdGhtaWMoZGF0YXNldHMpIHtcbiAgICBpZiAoIXRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSB8fCB0aGlzLm5vTG9nU2NhbGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2V0cyA9IFtdO1xuICAgIC8vIGNvbnZlcnQgTmFOcyBhbmQgbnVsbHMgdG8gemVyb3NcbiAgICBkYXRhc2V0cy5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgc2V0cy5wdXNoKGRhdGFzZXQubWFwKHZhbCA9PiB2YWwgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gb3ZlcmFsbCBtYXggdmFsdWVcbiAgICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KC4uLltdLmNvbmNhdCguLi5zZXRzKSk7XG5cbiAgICBpZiAobWF4VmFsdWUgPD0gMTApIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBsb2dhcml0aG1pY05lZWRlZCA9IGZhbHNlO1xuXG4gICAgc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICBzZXQucHVzaChtYXhWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IHN1bSA9IHNldC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSxcbiAgICAgICAgYXZlcmFnZSA9IHN1bSAvIHNldC5sZW5ndGg7XG4gICAgICBsZXQgdGhlaWwgPSAwO1xuICAgICAgc2V0LmZvckVhY2godiA9PiB0aGVpbCArPSB2ID8gdiAqIE1hdGgubG9nKHYgLyBhdmVyYWdlKSA6IDApO1xuXG4gICAgICBpZiAodGhlaWwgLyBzdW0gPiAwLjUpIHtcbiAgICAgICAgcmV0dXJuIGxvZ2FyaXRobWljTmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgc3VwZXIuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHNldHVwIHNpbmNlIHRoZSBsaXN0IHZpZXcgYXBwcyBhbHNvIHVzZSBjaGFydHMgKi9cbiAgICBpZiAoIXRoaXMuaXNDaGFydEFwcCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqIHRoZSBcIkxhdGVzdCBOIGRheXNcIiBsaW5rcyAqL1xuICAgICQoJy5kYXRlLWxhdGVzdCBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZShgbGF0ZXN0LSR7JChlLnRhcmdldCkuZGF0YSgndmFsdWUnKX1gKTtcbiAgICB9KTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgdGhpcy5wcm9jZXNzSW5wdXQoKTtcblxuICAgICAgLyoqIGNsZWFyIG91dCBzcGVjaWFsUmFuZ2UgaWYgaXQgZG9lc24ndCBtYXRjaCBvdXIgaW5wdXQgKi9cbiAgICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiB0aGlzLnNwZWNpYWxSYW5nZS52YWx1ZSAhPT0gZS50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2hhcnQgd2l0aCBkYXRhIHByb3ZpZGVkIGJ5IHByb2Nlc3NJbnB1dCgpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB4aHJEYXRhIC0gZGF0YSBhcyBjb25zdHJ1Y3RlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHVwZGF0ZUNoYXJ0KHhockRhdGEpIHtcbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7IC8vIGNsZWFyIG9sZCBjaGFydCBsZWdlbmRcblxuICAgIC8vIHNob3cgcGVuZGluZyBlcnJvciBtZXNzYWdlcyBpZiBwcmVzZW50LCBleGl0aW5nIGlmIGZhdGFsXG4gICAgaWYgKHRoaXMuc2hvd0Vycm9ycyh4aHJEYXRhKSkgcmV0dXJuO1xuXG4gICAgaWYgKCF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgIH0gZWxzZSBpZiAoeGhyRGF0YS5lbnRpdGllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vdXRwdXREYXRhID0gdGhpcy5idWlsZENoYXJ0RGF0YSh4aHJEYXRhLmRhdGFzZXRzLCB4aHJEYXRhLmVudGl0aWVzKTtcblxuICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgY29uc3Qgc2hvdWxkQmVMb2dhcml0aG1pYyA9IHRoaXMuc2hvdWxkQmVMb2dhcml0aG1pYyh0aGlzLm91dHB1dERhdGEubWFwKHNldCA9PiBzZXQuZGF0YSkpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5wcm9wKCdjaGVja2VkJywgc2hvdWxkQmVMb2dhcml0aG1pYyk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtzY2FsZXM6IHt9fSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5vcHRzLFxuICAgICAgdGhpcy5jb25maWcuZ2xvYmFsQ2hhcnRPcHRzXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzTG9nYXJpdGhtaWMoKSkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnNjYWxlcywge1xuICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICB0eXBlOiAnbG9nYXJpdGhtaWMnLFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbWFpbiA9IHZhbHVlIC8gKE1hdGgucG93KDEwLCBNYXRoLmZsb29yKENoYXJ0LmhlbHBlcnMubG9nMTAodmFsdWUpKSkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZW1haW4gPT09IDEgfHwgcmVtYWluID09PSAyIHx8IHJlbWFpbiA9PT0gNSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICQoJy5jaGFydC1jb250YWluZXInKS5odG1sKCcnKS5hcHBlbmQoXCI8Y2FudmFzIGNsYXNzPSdhcXMtY2hhcnQnPlwiKTtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgY29uc3QgY29udGV4dCA9ICQodGhpcy5jb25maWcuY2hhcnQpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGxpbmVhckRhdGEgPSB7bGFiZWxzOiB4aHJEYXRhLmxhYmVscywgZGF0YXNldHM6IHRoaXMub3V0cHV0RGF0YX07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlID09PSAncmFkYXInKSB7XG4gICAgICAgICAgb3B0aW9ucy5zY2FsZS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzWzBdLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiBsaW5lYXJEYXRhLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBsYWJlbHM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmxhYmVsKSxcbiAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICBkYXRhOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC52YWx1ZSksXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQuYmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmhvdmVyQmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgYXZlcmFnZXM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmF2ZXJhZ2UpXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvcnMoe1xuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICBmYXRhbEVycm9yczogW2Vycl1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKHRoaXMuY2hhcnRPYmouZ2VuZXJhdGVMZWdlbmQoKSk7XG4gICAgJCgnLmRhdGEtbGlua3MnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdwYWdldmlld3MnKSB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBlcnJvcnMgYnVpbHQgaW4gdGhpcy5wcm9jZXNzSW5wdXRcbiAgICogQHBhcmFtIHtvYmplY3R9IHhockRhdGEgLSBhcyBidWlsdCBieSB0aGlzLnByb2Nlc3NJbnB1dCwgbGlrZSBgeyBlcnJvcnM6IFtdLCBmYXRhbEVycm9yczogW10gfWBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGZhdGFsIGVycm9ycyBvY2N1cmVkXG4gICAqL1xuICBzaG93RXJyb3JzKHhockRhdGEpIHtcbiAgICBpZiAoeGhyRGF0YS5mYXRhbEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KHRydWUpO1xuICAgICAgY29uc3QgZmF0YWxFcnJvcnMgPSB4aHJEYXRhLmZhdGFsRXJyb3JzLnVuaXF1ZSgpO1xuICAgICAgdGhpcy5zaG93RmF0YWxFcnJvcnMoZmF0YWxFcnJvcnMpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoeGhyRGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBldmVyeXRoaW5nIGZhaWxlZCwgcmVzZXQgdGhlIHZpZXcsIGNsZWFyaW5nIG91dCBzcGFjZSB0YWtlbiB1cCBieSBlbXB0eSBjaGFydFxuICAgICAgaWYgKHhockRhdGEuZW50aXRpZXMgJiYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCA9PT0geGhyRGF0YS5lbnRpdGllcy5sZW5ndGggfHwgIXhockRhdGEuZW50aXRpZXMubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgfVxuXG4gICAgICB4aHJEYXRhLmVycm9ycy51bmlxdWUoKS5mb3JFYWNoKGVycm9yID0+IHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0SGVscGVycztcbiIsIi8qKlxuICogQGZpbGUgQ29yZSBKYXZhU2NyaXB0IGV4dGVuc2lvbnMsIGVpdGhlciB0byBuYXRpdmUgSlMgb3IgYSBsaWJyYXJ5LlxuICogICBQb2x5ZmlsbHMgaGF2ZSB0aGVpciBvd24gZmlsZSBbcG9seWZpbGxzLmpzXShnbG9iYWwuaHRtbCNwb2x5ZmlsbHMpXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblN0cmluZy5wcm90b3R5cGUuZGVzY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9fL2csICcgJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS5zY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC8gL2csICdfJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS51cGNhc2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnNsaWNlKDEpO1xufTtcblN0cmluZy5wcm90b3R5cGUuZXNjYXBlID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJy8nOiAnJiN4MkY7J1xuICB9O1xuXG4gIHJldHVybiB0aGlzLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIHMgPT4ge1xuICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gIH0pO1xufTtcblxuLy8gcmVtb3ZlIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBBcnJheVxuQXJyYXkucHJvdG90eXBlLnVuaXF1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24odmFsdWUsIGluZGV4LCBhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gIH0pO1xufTtcblxuLy8gSW1wcm92ZSBzeW50YXggdG8gZW11bGF0ZSBtaXhpbnMgaW4gRVM2XG53aW5kb3cubWl4ID0gc3VwZXJjbGFzcyA9PiBuZXcgTWl4aW5CdWlsZGVyKHN1cGVyY2xhc3MpO1xuY2xhc3MgTWl4aW5CdWlsZGVyIHtcbiAgY29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuICAgIHRoaXMuc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3M7XG4gIH1cblxuICB3aXRoKC4uLm1peGlucykge1xuICAgIHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtaXhpbikgPT4gbWl4aW4oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG4gIH1cbn1cblxuLypcbiAqIEhPVCBQQVRDSCBmb3IgQ2hhcnQuanMgZ2V0RWxlbWVudHNBdEV2ZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hhcnRqcy9DaGFydC5qcy9pc3N1ZXMvMjI5OVxuICogVE9ETzogcmVtb3ZlIG1lIHdoZW4gdGhpcyBnZXRzIGltcGxlbWVudGVkIGludG8gQ2hhcnRzLmpzIGNvcmVcbiAqL1xuaWYgKHR5cGVvZiBDaGFydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgQ2hhcnQuQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RWxlbWVudHNBdEV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICAgIGxldCBoZWxwZXJzID0gQ2hhcnQuaGVscGVycztcbiAgICBsZXQgZXZlbnRQb3NpdGlvbiA9IGhlbHBlcnMuZ2V0UmVsYXRpdmVQb3NpdGlvbihlLCB0aGlzLmNoYXJ0KTtcbiAgICBsZXQgZWxlbWVudHNBcnJheSA9IFtdO1xuXG4gICAgbGV0IGZvdW5kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5kYXRhc2V0cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5kYXRhc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YSlbMF07XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtZGVwdGggKi9cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhW2pdLmluTGFiZWxSYW5nZShldmVudFBvc2l0aW9uLngsIGV2ZW50UG9zaXRpb24ueSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YVtrZXldLmRhdGFbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuY2FsbCh0aGlzKTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50c0FycmF5O1xuICAgIH1cblxuICAgIGhlbHBlcnMuZWFjaCh0aGlzLmRhdGEuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQsIGRzSW5kZXgpIHtcbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGRhdGFzZXQuX21ldGEpWzBdO1xuICAgICAgZWxlbWVudHNBcnJheS5wdXNoKGRhdGFzZXQuX21ldGFba2V5XS5kYXRhW2ZvdW5kLl9pbmRleF0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzQXJyYXk7XG4gIH07XG59XG5cbiQud2hlbkFsbCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgIGNvdW50ZXIgPSAwLFxuICAgIHN0YXRlID0gJ3Jlc29sdmVkJyxcbiAgICBwcm9taXNlcyA9IG5ldyBBcnJheSguLi5hcmd1bWVudHMpO1xuXG4gIGNvbnN0IHJlc29sdmVPclJlamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICBzdGF0ZSA9ICdyZWplY3RlZCc7XG4gICAgfVxuICAgIGNvdW50ZXIrKztcblxuICAgIGlmIChjb3VudGVyID09PSBwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGRmZFtzdGF0ZSA9PT0gJ3JlamVjdGVkJyA/ICdyZWplY3QnIDogJ3Jlc29sdmUnXSgpO1xuICAgIH1cblxuICB9O1xuXG4gICQuZWFjaChwcm9taXNlcywgKF9pLCBwcm9taXNlKSA9PiB7XG4gICAgcHJvbWlzZS5hbHdheXMocmVzb2x2ZU9yUmVqZWN0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG59O1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgbGlzdC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBsaXN0LXNwZWNpZmljIGxvZ2ljXG4gKiBAcGFyYW0ge2NsYXNzfSBzdXBlcmNsYXNzIC0gYmFzZSBjbGFzc1xuICogQHJldHVybnMge251bGx9IGNsYXNzIGV4dGVuZGluZyBzdXBlcmNsYXNzXG4gKi9cbmNvbnN0IExpc3RIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgY2hhcnQgb3B0aW9ucyBiZWZvcmUgc2hvd2luZyBjaGFydCB2aWV3LCBiYXNlZCBvbiBjdXJyZW50IGNoYXJ0IHR5cGVcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1swXTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMub3V0cHV0RGF0YS5kYXRhc2V0c1swXSwgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQoY29sb3IpKTtcblxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZmlsbENvbG9yID0gY29sb3IucmVwbGFjZSgvLFxccypcXGRcXCkvLCAnLCAwLjIpJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBsYW5nIGRhdGEgdG8gSlNPTiBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZXhwb3J0SlNPTigpIHtcbiAgICBjb25zdCBqc29uQ29udGVudCA9ICdkYXRhOnRleHQvanNvbjtjaGFyc2V0PXV0Zi04LCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm91dHB1dERhdGEubGlzdERhdGEpO1xuICAgIHRoaXMuZG93bmxvYWREYXRhKGpzb25Db250ZW50LCAnanNvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIHplcm9zIHRvIGEgdGltZXNlcmllcywgc2VlOlxuICAgKiBodHRwczovL3dpa2l0ZWNoLndpa2ltZWRpYS5vcmcvd2lraS9BbmFseXRpY3MvQVFTL1BhZ2V2aWV3X0FQSSNHb3RjaGFzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtcyAtIGVudHJpZXMgZmV0Y2hlZCBmcm9tIFBhZ2V2aWV3cyBBUElcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGUgb2YgcmFuZ2UgdG8gZmlsdGVyIHRocm91Z2hcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZSBvZiByYW5nZVxuICAgKiBAcmV0dXJucyB7YXJyYXl9IDAgPSBkYXRhc2V0IHdpdGggemVyb3Mgd2hlcmUgbnVsbHMgd2VyZSxcbiAgICogICAxID0gZGF0ZXMgdGhhdCBtZXQgdGhlIGVkZ2UgY2FzZSwgbWVhbmluZyBkYXRhIGlzIG5vdCB5ZXQgYXZhaWxhYmxlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhpdGVtcywgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgLyoqIEV4dHJhY3QgdGhlIGRhdGVzIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIHRpbWVzZXJpZXMgKi9cbiAgICBsZXQgYWxyZWFkeVRoZXJlID0ge307XG4gICAgaXRlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIGxldCBkYXRlID0gbW9tZW50KGVsZW0udGltZXN0YW1wLCB0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpO1xuICAgICAgYWxyZWFkeVRoZXJlW2RhdGVdID0gZWxlbTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YSA9IFtdLCBkYXRlc1dpdGhvdXREYXRhID0gW107XG5cbiAgICAvKiogUmVjb25zdHJ1Y3Qgd2l0aCB6ZXJvcyBpbnN0ZWFkIG9mIG51bGxzICovXG4gICAgZm9yIChsZXQgZGF0ZSA9IG1vbWVudChzdGFydERhdGUpOyBkYXRlIDw9IGVuZERhdGU7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChhbHJlYWR5VGhlcmVbZGF0ZV0pIHtcbiAgICAgICAgZGF0YS5wdXNoKGFscmVhZHlUaGVyZVtkYXRlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIHZpZXdzOiBlZGdlQ2FzZSA/IG51bGwgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZWRnZUNhc2UpIGRhdGVzV2l0aG91dERhdGEucHVzaChkYXRlLmZvcm1hdCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2RhdGEsIGRhdGVzV2l0aG91dERhdGFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBjYWNoZSBrZXkgZm9yIGN1cnJlbnQgcGFyYW1zXG4gICAqIEByZXR1cm4ge1N0cmluZ30ga2V5XG4gICAqL1xuICBnZXRDYWNoZUtleSgpIHtcbiAgICByZXR1cm4gYHB2LWNhY2hlLSR7dGhpcy5oYXNoQ29kZShcbiAgICAgIHRoaXMuYXBwICsgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRQYXJhbXModHJ1ZSkpXG4gICAgKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmsgdG8gL3BhZ2V2aWV3cyBmb3IgZ2l2ZW4gYXJ0aWNsZSBhbmQgY2hvc2VuIGRhdGVyYW5nZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIGJhc2UgcHJvamVjdCwgZS5nLiBlbi53aWtpcGVkaWEub3JnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFVSTFxuICAgKi9cbiAgLy8gRklYTUU6IHNob3VsZCBpbmNsdWRlIGFnZW50IGFuZCBwbGF0Zm9ybSwgYW5kIHVzZSBzcGVjaWFsIHJhbmdlcyBhcyBjdXJyZW50bHkgc3BlY2lmaWVkXG4gIGdldFBhZ2V2aWV3c1VSTChwcm9qZWN0LCBwYWdlKSB7XG4gICAgbGV0IHN0YXJ0RGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUpLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlKTtcbiAgICBjb25zdCBwbGF0Zm9ybSA9ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCk7XG5cbiAgICBpZiAoZW5kRGF0ZS5kaWZmKHN0YXJ0RGF0ZSwgJ2RheXMnKSA9PT0gMCkge1xuICAgICAgc3RhcnREYXRlLnN1YnRyYWN0KDMsICdkYXlzJyk7XG4gICAgICBlbmREYXRlLmFkZCgzLCAnZGF5cycpO1xuICAgIH1cblxuICAgIHJldHVybiBgL3BhZ2V2aWV3cz9zdGFydD0ke3N0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX1gICtcbiAgICAgIGAmZW5kPSR7ZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX0mcHJvamVjdD0ke3Byb2plY3R9JnBsYXRmb3JtPSR7cGxhdGZvcm19JnBhZ2VzPSR7cGFnZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwYXJhbXMgbmVlZGVkIHRvIGNyZWF0ZSBhIHBlcm1hbmVudCBsaW5rIG9mIHZpc2libGUgZGF0YVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGhhc2ggb2YgcGFyYW1zXG4gICAqL1xuICBnZXRQZXJtYUxpbmsoKSB7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRydWUpO1xuICAgIHBhcmFtcy5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IGNsYXNzIG5hbWUgb2YgPG91dHB1dD4sIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgZm9ybVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0YXRlLCBvbmUgb2YgdGhpcy5jb25maWcuZm9ybVN0YXRlc1xuICAgKi9cbiAgZ2V0U3RhdGUoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gJCgnbWFpbicpWzBdLmNsYXNzTGlzdDtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZm9ybVN0YXRlcy5maWx0ZXIoc3RhdGVOYW1lID0+IHtcbiAgICAgIHJldHVybiBjbGFzc0xpc3QuY29udGFpbnMoc3RhdGVOYW1lKTtcbiAgICB9KVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBzaW1wbGUgc3RvcmFnZSB0byBzZWUgaWYgYSByZXF1ZXN0IHdpdGggdGhlIGN1cnJlbnQgcGFyYW1zIHdvdWxkIGJlIGNhY2hlZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBjYWNoZWQgb3Igbm90XG4gICAqL1xuICBpc1JlcXVlc3RDYWNoZWQoKSB7XG4gICAgcmV0dXJuIHNpbXBsZVN0b3JhZ2UuaGFzS2V5KHRoaXMuZ2V0Q2FjaGVLZXkoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGxpc3Qgb2Ygb3V0cHV0IGRhdGEgaW50byB2aWV3XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gYmxvY2sgdG8gY2FsbCBiZXR3ZWVuIGluaXRpYWwgc2V0dXAgYW5kIHNob3dpbmcgdGhlIG91dHB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVuZGVyRGF0YShjYikge1xuICAgIGNvbnN0IGFydGljbGVEYXRhc2V0cyA9IHRoaXMub3V0cHV0RGF0YS5saXN0RGF0YTtcblxuICAgIC8qKiBzb3J0IGFzY2VuZGluZyBieSBjdXJyZW50IHNvcnQgc2V0dGluZyAqL1xuICAgIGNvbnN0IHNvcnRlZERhdGFzZXRzID0gYXJ0aWNsZURhdGFzZXRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuZ2V0U29ydFByb3BlcnR5KGEsIHRoaXMuc29ydCksXG4gICAgICAgIGFmdGVyID0gdGhpcy5nZXRTb3J0UHJvcGVydHkoYiwgdGhpcy5zb3J0KTtcblxuICAgICAgaWYgKGJlZm9yZSA8IGFmdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAoYmVmb3JlID4gYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIC10aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnLnNvcnQtbGluayBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCBnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldCcpLmFkZENsYXNzKCdnbHlwaGljb24tc29ydCcpO1xuICAgIGNvbnN0IG5ld1NvcnRDbGFzc05hbWUgPSBwYXJzZUludCh0aGlzLmRpcmVjdGlvbiwgMTApID09PSAxID8gJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCcgOiAnZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQnO1xuICAgICQoYC5zb3J0LWxpbmstLSR7dGhpcy5zb3J0fSBzcGFuYCkuYWRkQ2xhc3MobmV3U29ydENsYXNzTmFtZSkucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0Jyk7XG5cbiAgICB0cnkge1xuICAgICAgY2Ioc29ydGVkRGF0YXNldHMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnY29tcGxldGUnKTtcbiAgICAgIHRoaXMuc2hvd0ZhdGFsRXJyb3JzKFtlcnJdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5wdXNoUGFyYW1zKCk7XG4gICAgfVxuXG4gICAgdGhpcy50b2dnbGVWaWV3KHRoaXMudmlldyk7XG4gICAgLyoqXG4gICAgICogU2V0dGluZyB0aGUgc3RhdGUgdG8gY29tcGxldGUgd2lsbCBjYWxsIHRoaXMucHJvY2Vzc0VuZGVkXG4gICAgICogV2Ugb25seSB3YW50IHRvIHRoaXMgdGhlIGZpcnN0IHRpbWUsIG5vdCBhZnRlciBjaGFuZ2luZyBjaGFydCB0eXBlcywgZXRjLlxuICAgICAqL1xuICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09ICdjb21wbGV0ZScpIHRoaXMuc2V0U3RhdGUoJ2NvbXBsZXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIG9yIHNldCBjaGFydCB2cyBsaXN0IHZpZXcuIEFsbCBvZiB0aGUgbm9ybWFsIGNoYXJ0IGxvZ2ljIGxpdmVzIGhlcmVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2aWV3IC0gd2hpY2ggdmlldyB0byBzZXQsIGVpdGhlciBjaGFydCBvciBsaXN0XG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHRvZ2dsZVZpZXcodmlldykge1xuICAgICQoJy52aWV3LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGAudmlldy1idG4tLSR7dmlld31gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnb3V0cHV0JykucmVtb3ZlQ2xhc3MoJ2xpc3QtbW9kZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NoYXJ0LW1vZGUnKVxuICAgICAgLmFkZENsYXNzKGAke3ZpZXd9LW1vZGVgKTtcblxuICAgIGlmICh2aWV3ID09PSAnY2hhcnQnKSB7XG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuXG4gICAgICAvKiogZG9uJ3QgdXNlIGNpcmN1bGUgY2hhcnRzICovXG4gICAgICBpZiAodGhpcy5jb25maWcuY2lyY3VsYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIHRoaXMuY2hhcnRUeXBlID0gJ2Jhcic7XG4gICAgICB9XG5cbiAgICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLm9wdHMsXG4gICAgICAgIHRoaXMuY29uZmlnLmdsb2JhbENoYXJ0T3B0c1xuICAgICAgKTtcbiAgICAgIHRoaXMuYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpO1xuICAgICAgdGhpcy5zZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCk7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgICBjb25zdCBzaG91bGRCZUxvZ2FyaXRobWljID0gdGhpcy5zaG91bGRCZUxvZ2FyaXRobWljKFt0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZGF0YV0pO1xuICAgICAgICAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLnByb3AoJ2NoZWNrZWQnLCBzaG91bGRCZUxvZ2FyaXRobWljKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNMb2dhcml0aG1pYygpKSB7XG4gICAgICAgIG9wdGlvbnMuc2NhbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5zY2FsZXMsIHtcbiAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgIHR5cGU6ICdsb2dhcml0aG1pYycsXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtYWluID0gdmFsdWUgLyAoTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoQ2hhcnQuaGVscGVycy5sb2cxMCh2YWx1ZSkpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVtYWluID09PSAxIHx8IHJlbWFpbiA9PT0gMiB8fCByZW1haW4gPT09IDUgfHwgaW5kZXggPT09IDAgfHwgaW5kZXggPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ3JhZGFyJykge1xuICAgICAgICBvcHRpb25zLnNjYWxlLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnNjYWxlcy55QXhlc1swXS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZXh0ID0gJCh0aGlzLmNvbmZpZy5jaGFydClbMF0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMuY2hhcnRPYmogPSBuZXcgQ2hhcnQoY29udGV4dCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5vdXRwdXREYXRhLFxuICAgICAgICBvcHRpb25zXG4gICAgICB9KTtcblxuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuc2hvdygpO1xuICAgICAgJCgnI2NoYXJ0LWxlZ2VuZCcpLmh0bWwodGhpcy5jaGFydE9iai5nZW5lcmF0ZUxlZ2VuZCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZSBvZiBwcm9ncmVzcyBiYXJcbiAgICogQHBhcmFtICB7TnVtYmVyfSB2YWx1ZSAtIGN1cnJlbnQgaXRlcmF0aW9uXG4gICAqIEBwYXJhbSAge051bWJlcn0gdG90YWwgLSB0b3RhbCBudW1iZXIgb2YgaXRlcmF0aW9uc1xuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICB1cGRhdGVQcm9ncmVzc0Jhcih2YWx1ZSwgdG90YWwpIHtcbiAgICBpZiAoIXRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsICcwJScpO1xuICAgICAgcmV0dXJuICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgnJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudGFnZSA9ICh2YWx1ZSAvIHRvdGFsKSAqIDEwMDtcbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsIGAke3BlcmNlbnRhZ2UudG9GaXhlZCgyKX0lYCk7XG5cbiAgICBpZiAodmFsdWUgPT09IHRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtY291bnRlcicpLnRleHQoJ0J1aWxkaW5nIGRhdGFzZXQuLi4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KFxuICAgICAgICAkLmkxOG4oJ3Byb2Nlc3NpbmctcGFnZScsIHZhbHVlLCB0b3RhbClcbiAgICAgICk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RIZWxwZXJzO1xuIiwiLyoqXG4gKiBAZmlsZSBQb2x5ZmlsbHMgZm9yIHVzZXJzIHdobyByZWZ1c2UgdG8gdXBncmFkZSB0aGVpciBicm93c2Vyc1xuICogICBNb3N0IGNvZGUgaXMgYWRhcHRlZCBmcm9tIFtNRE5dKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnKVxuICovXG5cbi8vIEFycmF5LmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG4vLyBUaGlzIGlzIG5vdCBhIGZ1bGwgaW1wbGVtZW50YXRpb24sIGp1c3QgYSBzaG9ydGhhbmQgdG8gaW5kZXhPZiAhPT0gLTFcbmlmICggIUFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyApIHtcbiAgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgfTtcbn1cblxuLy8gU3RyaW5nLmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG5pZiAoICFTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzICkge1xuICBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoLCBzdGFydCkge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgIT09ICdudW1iZXInKSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ICsgc2VhcmNoLmxlbmd0aCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoLHN0YXJ0KSAhPT0gLTE7XG4gICAgfVxuICB9O1xufVxuXG4vLyBPYmplY3QuYXNzaWduXG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgKGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgZm9yIChsZXQgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9KSgpO1xufVxuXG4vLyBDaGlsZE5vZGUucmVtb3ZlXG5pZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xuICB9O1xufVxuXG4vLyBTdHJpbmcuc3RhcnRzV2l0aFxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcbiAgICByZXR1cm4gdGhpcy5zdWJzdHIocG9zaXRpb24sIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gIH07XG59XG5cbi8vIEFycmF5Lm9mXG5pZiAoIUFycmF5Lm9mKSB7XG4gIEFycmF5Lm9mID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIEFycmF5LmZpbmRcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmQgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGxldCBsaXN0ID0gT2JqZWN0KHRoaXMpO1xuICAgIGxldCBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgICBsZXQgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICBsZXQgdmFsdWU7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuLy8gQXJyYXkuZmlsbFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsbCkge1xuICBBcnJheS5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICAvLyBTdGVwcyAxLTIuXG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIGxldCBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgLy8gU3RlcHMgMy01LlxuICAgIGxldCBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcblxuICAgIC8vIFN0ZXBzIDYtNy5cbiAgICBsZXQgc3RhcnQgPSBhcmd1bWVudHNbMV07XG4gICAgbGV0IHJlbGF0aXZlU3RhcnQgPSBzdGFydCA+PiAwO1xuXG4gICAgLy8gU3RlcCA4LlxuICAgIGxldCBrID0gcmVsYXRpdmVTdGFydCA8IDAgP1xuICAgICAgTWF0aC5tYXgobGVuICsgcmVsYXRpdmVTdGFydCwgMCkgOlxuICAgICAgTWF0aC5taW4ocmVsYXRpdmVTdGFydCwgbGVuKTtcblxuICAgIC8vIFN0ZXBzIDktMTAuXG4gICAgbGV0IGVuZCA9IGFyZ3VtZW50c1syXTtcbiAgICBsZXQgcmVsYXRpdmVFbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/XG4gICAgICBsZW4gOiBlbmQgPj4gMDtcblxuICAgIC8vIFN0ZXAgMTEuXG4gICAgbGV0IGZpbmFsID0gcmVsYXRpdmVFbmQgPCAwID9cbiAgICAgIE1hdGgubWF4KGxlbiArIHJlbGF0aXZlRW5kLCAwKSA6XG4gICAgICBNYXRoLm1pbihyZWxhdGl2ZUVuZCwgbGVuKTtcblxuICAgIC8vIFN0ZXAgMTIuXG4gICAgd2hpbGUgKGsgPCBmaW5hbCkge1xuICAgICAgT1trXSA9IHZhbHVlO1xuICAgICAgaysrO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTMuXG4gICAgcmV0dXJuIE87XG4gIH07XG59XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjb2RlIGFtb25nc3QgYWxsIGFwcHMgKFBhZ2V2aWV3cywgVG9wdmlld3MsIExhbmd2aWV3cywgU2l0ZXZpZXdzLCBNYXNzdmlld3MsIFJlZGlyZWN0IFZpZXdzKVxuICogQGF1dGhvciBNdXNpa0FuaW1hbCwgS2FsZGFyaVxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiogY2xhc3MtbGVzcyBmaWxlcyB3aXRoIGdsb2JhbCBvdmVycmlkZXMgKi9cbnJlcXVpcmUoJy4vY29yZV9leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscycpO1xuXG5jb25zdCBQdkNvbmZpZyA9IHJlcXVpcmUoJy4vcHZfY29uZmlnJyk7XG5jb25zdCBzaXRlTWFwID0gcmVxdWlyZSgnLi9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5cbi8qKiBQdiBjbGFzcywgY29udGFpbnMgY29kZSBhbW9uZ3N0IGFsbCBhcHBzIChQYWdldmlld3MsIFRvcHZpZXdzLCBMYW5ndmlld3MsIFNpdGV2aWV3cywgTWFzc3ZpZXdzLCBSZWRpcmVjdCBWaWV3cykgKi9cbmNsYXNzIFB2IGV4dGVuZHMgUHZDb25maWcge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgLyoqIGFzc2lnbiBpbml0aWFsIGNsYXNzIHByb3BlcnRpZXMgKi9cbiAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuY29uZmlnLmRlZmF1bHRzLFxuICAgICAgdmFsaWRQYXJhbXMgPSB0aGlzLmNvbmZpZy52YWxpZFBhcmFtcztcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnLCBhcHBDb25maWcpO1xuICAgIHRoaXMuY29uZmlnLmRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGFwcENvbmZpZy5kZWZhdWx0cyk7XG4gICAgdGhpcy5jb25maWcudmFsaWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWxpZFBhcmFtcywgYXBwQ29uZmlnLnZhbGlkUGFyYW1zKTtcblxuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0b3JhZ2UgPSB7fTsgLy8gdXNlZCBhcyBmYWxsYmFjayB3aGVuIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG5cbiAgICBbJ2xvY2FsaXplRGF0ZUZvcm1hdCcsICdudW1lcmljYWxGb3JtYXR0aW5nJywgJ2JlemllckN1cnZlJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvTG9nRGV0ZWN0aW9uJywgJ2JlZ2luQXRaZXJvJywgJ3JlbWVtYmVyQ2hhcnQnXS5mb3JFYWNoKHNldHRpbmcgPT4ge1xuICAgICAgdGhpc1tzZXR0aW5nXSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7c2V0dGluZ31gKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0c1tzZXR0aW5nXTtcbiAgICB9KTtcbiAgICB0aGlzLnNldHVwU2V0dGluZ3NNb2RhbCgpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBudWxsO1xuICAgIHRoaXMuc2l0ZUluZm8gPSB7fTtcblxuICAgIC8qKiBAdHlwZSB7bnVsbHxEYXRlfSB0cmFja2luZyBvZiBlbGFwc2VkIHRpbWUgKi9cbiAgICB0aGlzLnByb2Nlc3NTdGFydCA9IG51bGw7XG5cbiAgICAvKiogYXNzaWduIGFwcCBpbnN0YW5jZSB0byB3aW5kb3cgZm9yIGRlYnVnZ2luZyBvbiBsb2NhbCBlbnZpcm9ubWVudCAqL1xuICAgIGlmIChsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0Jykge1xuICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3BsYXNoKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kZWJ1ZyA9IGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnZGVidWc9dHJ1ZScpIHx8IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnO1xuXG4gICAgLyoqIHNob3cgbm90aWNlIGlmIG9uIHN0YWdpbmcgZW52aXJvbm1lbnQgKi9cbiAgICBpZiAoLy10ZXN0Ly50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSkge1xuICAgICAgY29uc3QgYWN0dWFsUGF0aE5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC8tdGVzdFxcLz8vLCAnJyk7XG4gICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ3dhcm5pbmcnLFxuICAgICAgICBgVGhpcyBpcyBhIHN0YWdpbmcgZW52aXJvbm1lbnQuIEZvciB0aGUgYWN0dWFsICR7ZG9jdW1lbnQudGl0bGV9LFxuICAgICAgICAgc2VlIDxhIGhyZWY9JyR7YWN0dWFsUGF0aE5hbWV9Jz4ke2xvY2F0aW9uLmhvc3RuYW1lfSR7YWN0dWFsUGF0aE5hbWV9PC9hPmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0cmFuc2xhdGlvbnMgdGhlbiBpbml0aWFsaXplIHRoZSBhcHAuXG4gICAgICogRWFjaCBhcHAgaGFzIGl0J3Mgb3duIGluaXRpYWxpemUgbWV0aG9kLlxuICAgICAqIE1ha2Ugc3VyZSB3ZSBsb2FkICdlbi5qc29uJyBhcyBhIGZhbGxiYWNrXG4gICAgICovXG4gICAgbGV0IG1lc3NhZ2VzVG9Mb2FkID0ge1xuICAgICAgW2kxOG5MYW5nXTogYC9wYWdldmlld3MvbWVzc2FnZXMvJHtpMThuTGFuZ30uanNvbmBcbiAgICB9O1xuICAgIGlmIChpMThuTGFuZyAhPT0gJ2VuJykge1xuICAgICAgbWVzc2FnZXNUb0xvYWQuZW4gPSAnL3BhZ2V2aWV3cy9tZXNzYWdlcy9lbi5qc29uJztcbiAgICB9XG4gICAgJC5pMThuKHtcbiAgICAgIGxvY2FsZTogaTE4bkxhbmdcbiAgICB9KS5sb2FkKG1lc3NhZ2VzVG9Mb2FkKS50aGVuKHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBzZXQgdXAgdG9hc3RyIGNvbmZpZy4gVGhlIGR1cmF0aW9uIG1heSBiZSBvdmVycmlkZW4gbGF0ZXIgKi9cbiAgICB0b2FzdHIub3B0aW9ucyA9IHtcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgZGVidWc6IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnLFxuICAgICAgbmV3ZXN0T25Ub3A6IGZhbHNlLFxuICAgICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LXRvcC1jZW50ZXInLFxuICAgICAgcHJldmVudER1cGxpY2F0ZXM6IHRydWUsXG4gICAgICBvbmNsaWNrOiBudWxsLFxuICAgICAgc2hvd0R1cmF0aW9uOiAnMzAwJyxcbiAgICAgIGhpZGVEdXJhdGlvbjogJzEwMDAnLFxuICAgICAgdGltZU91dDogJzUwMDAnLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAnMzAwMCcsXG4gICAgICBzaG93RWFzaW5nOiAnc3dpbmcnLFxuICAgICAgaGlkZUVhc2luZzogJ2xpbmVhcicsXG4gICAgICBzaG93TWV0aG9kOiAnZmFkZUluJyxcbiAgICAgIGhpZGVNZXRob2Q6ICdmYWRlT3V0JyxcbiAgICAgIHRvYXN0Q2xhc3M6ICdhbGVydCcsXG4gICAgICBpY29uQ2xhc3Nlczoge1xuICAgICAgICBlcnJvcjogJ2FsZXJ0LWRhbmdlcicsXG4gICAgICAgIGluZm86ICdhbGVydC1pbmZvJyxcbiAgICAgICAgc3VjY2VzczogJ2FsZXJ0LXN1Y2Nlc3MnLFxuICAgICAgICB3YXJuaW5nOiAnYWxlcnQtd2FybmluZydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpdGUgbm90aWNlIChCb290c3RyYXAgYWxlcnQpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsZXZlbCAtIG9uZSBvZiAnc3VjY2VzcycsICdpbmZvJywgJ3dhcm5pbmcnIG9yICdlcnJvcidcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIHRvIHNob3dcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0aXRsZV0gLSB3aWxsIGFwcGVhciBpbiBib2xkIGFuZCBpbiBmcm9udCBvZiB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkaXNtaXNzYWJsZV0gLSB3aGV0aGVyIG9yIG5vdCB0byBhZGQgYSBYXG4gICAqICAgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gZGlzbWlzcyB0aGUgbm90aWNlXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRTaXRlTm90aWNlKGxldmVsLCBtZXNzYWdlLCB0aXRsZSwgZGlzbWlzc2FibGUpIHtcbiAgICB0aXRsZSA9IHRpdGxlID8gYDxzdHJvbmc+JHt0aXRsZX08L3N0cm9uZz4gYCA6ICcnO1xuXG4gICAgbGV0IG1hcmt1cCA9IHRpdGxlICsgbWVzc2FnZTtcblxuICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgbWFya3VwLFxuICAgICAgbGV2ZWwsXG4gICAgICBkaXNtaXNzYWJsZSA/IDEwMDAwIDogMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNpdGUgbm90aWNlIGZvciBpbnZhbGlkIHBhcmFtZXRlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0gLSBuYW1lIG9mIHBhcmFtZXRlclxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgYWRkSW52YWxpZFBhcmFtTm90aWNlKHBhcmFtKSB7XG4gICAgY29uc3QgZG9jTGluayA9IGA8YSBocmVmPScvJHt0aGlzLmFwcH0vdXJsX3N0cnVjdHVyZSc+JHskLmkxOG4oJ2RvY3VtZW50YXRpb24nKX08L2E+YDtcbiAgICB0aGlzLmFkZFNpdGVOb3RpY2UoXG4gICAgICAnZXJyb3InLFxuICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0zJywgcGFyYW0sIGRvY0xpbmspLFxuICAgICAgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdGhlIGRhdGUgcmFuZ2Ugb2YgZ2l2ZW4gcGFyYW1zXG4gICAqICAgYW5kIHRocm93IGVycm9ycyBhcyBuZWNlc3NhcnkgYW5kL29yIHNldCBkZWZhdWx0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gYXMgcmV0dXJuZWQgYnkgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKClcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlcmUgd2VyZSBubyBlcnJvcnMsIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgdmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5yYW5nZSkge1xuICAgICAgaWYgKCF0aGlzLnNldFNwZWNpYWxSYW5nZShwYXJhbXMucmFuZ2UpKSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdyYW5nZScpO1xuICAgICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZSh0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlUmFuZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1zLnN0YXJ0KSB7XG4gICAgICBjb25zdCBkYXRlUmVnZXggPSAvXFxkezR9LVxcZHsyfS1cXGR7Mn0kLztcblxuICAgICAgLy8gZmlyc3Qgc2V0IGRlZmF1bHRzXG4gICAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgICAvLyB0aGVuIGNoZWNrIGZvcm1hdCBvZiBzdGFydCBhbmQgZW5kIGRhdGVcbiAgICAgIGlmIChwYXJhbXMuc3RhcnQgJiYgZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLnN0YXJ0KSkge1xuICAgICAgICBzdGFydERhdGUgPSBtb21lbnQocGFyYW1zLnN0YXJ0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdzdGFydCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmVuZCAmJiBkYXRlUmVnZXgudGVzdChwYXJhbXMuZW5kKSkge1xuICAgICAgICBlbmREYXRlID0gbW9tZW50KHBhcmFtcy5lbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ2VuZCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXkgYXJlIG91dHNpZGUgdGhlIHZhbGlkIHJhbmdlIG9yIGlmIGluIHRoZSB3cm9uZyBvcmRlclxuICAgICAgaWYgKHN0YXJ0RGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUgfHwgZW5kRGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsXG4gICAgICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0xJywgbW9tZW50KHRoaXMuY29uZmlnLm1pbkRhdGUpLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKSxcbiAgICAgICAgICAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsICQuaTE4bigncGFyYW0tZXJyb3ItMicpLCAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksIHRydWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qKiBkaXJlY3RseSBhc3NpZ24gc3RhcnREYXRlIGJlZm9yZSBjYWxsaW5nIHNldEVuZERhdGUgc28gZXZlbnRzIHdpbGwgYmUgZmlyZWQgb25jZSAqL1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc2V0RW5kRGF0ZShlbmREYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UodGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZVJhbmdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyU2l0ZU5vdGljZXMoKSB7XG4gICAgJCgnLnNpdGUtbm90aWNlJykuaHRtbCgnJyk7XG4gIH1cblxuICBjbGVhck1lc3NhZ2VzKCkge1xuICAgICQoJy5tZXNzYWdlLWNvbnRhaW5lcicpLmh0bWwoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRlIGZvcm1hdCB0byB1c2UgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHJldHVybnMge3N0cmluZ30gZGF0ZSBmb3JtYXQgdG8gcGFzc2VkIHRvIHBhcnNlclxuICAgKi9cbiAgZ2V0IGRhdGVGb3JtYXQoKSB7XG4gICAgaWYgKHRoaXMubG9jYWxpemVEYXRlRm9ybWF0ID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvY2FsZURhdGVTdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0ZXJhbmdlcGlja2VyIGluc3RhbmNlLiBQbGFpbiBhbmQgc2ltcGxlLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGRhdGVyYW5nZSBwaWNrZXJcbiAgICovXG4gIGdldCBkYXRlcmFuZ2VwaWNrZXIoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YWJhc2UgbmFtZSBvZiB0aGUgZ2l2ZW4gcHJvamV0XG4gICAqIEBwYXJhbSAge1N0cmluZ30gcHJvamVjdCAtIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZGF0YWJhc2UgbmFtZVxuICAgKi9cbiAgZGJOYW1lKHByb2plY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc2l0ZU1hcCkuZmluZChrZXkgPT4gc2l0ZU1hcFtrZXldID09PSBgJHtwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCcnKX0ub3JnYCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgZG93bmxvYWQgb2YgZ2l2ZW4gZGF0YSwgb3Igb3BlbiBpbiBhIG5ldyB0YWIgaWYgSFRNTDUgPGE+IGRvd25sb2FkIGF0dHJpYnV0ZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIC0gUmF3IGRhdGEgcHJlcGVuZGVkIHdpdGggZGF0YSB0eXBlLCBlLmcuIFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LG15IGRhdGEuLi5cIlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXh0ZW5zaW9uIC0gdGhlIGZpbGUgZXh0ZW5zaW9uIHRvIHVzZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZG93bmxvYWREYXRhKGRhdGEsIGV4dGVuc2lvbikge1xuICAgIGNvbnN0IGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoZGF0YSk7XG5cbiAgICAvLyBjcmVhdGUgSFRNTDUgZG93bmxvYWQgZWxlbWVudCBhbmQgZm9yY2UgY2xpY2sgc28gd2UgY2FuIHNwZWNpZnkgYSBmaWxlbmFtZVxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaWYgKHR5cGVvZiBsaW5rLmRvd25sb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTsgLy8gRmlyZWZveCByZXF1aXJlcyB0aGUgbGluayB0byBiZSBpbiB0aGUgYm9keVxuXG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAke3RoaXMuZ2V0RXhwb3J0RmlsZW5hbWUoKX0uJHtleHRlbnNpb259YDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICAgIGxpbmsuaHJlZiA9IGVuY29kZWRVcmk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7IC8vIHJlbW92ZSB0aGUgbGluayB3aGVuIGRvbmVcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7IC8vIG9wZW4gaW4gbmV3IHRhYiBpZiBkb3dubG9hZCBpc24ndCBzdXBwb3J0ZWQgKCpjb3VnaCogU2FmYXJpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaWxsIGluIHZhbHVlcyB3aXRoaW4gc2V0dGluZ3MgbW9kYWwgd2l0aCB3aGF0J3MgaW4gdGhlIHNlc3Npb24gb2JqZWN0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBmaWxsSW5TZXR0aW5ncygpIHtcbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0aGlzW2VsLm5hbWVdID09PSAndHJ1ZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gdGhpc1tlbC5uYW1lXSA9PT0gZWwudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGZvY3VzIHRvIFNlbGVjdDIgaW5wdXQgZmllbGRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGZvY3VzU2VsZWN0MigpIHtcbiAgICAkKCcuc2VsZWN0Mi1zZWxlY3Rpb24nKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICQoJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBudW1iZXIgYmFzZWQgb24gY3VycmVudCBzZXR0aW5ncywgZS5nLiBsb2NhbGl6ZSB3aXRoIGNvbW1hIGRlbGltZXRlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBudW0gLSBudW1iZXIgdG8gZm9ybWF0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGZvcm1hdHRlZCBudW1iZXJcbiAgICovXG4gIGZvcm1hdE51bWJlcihudW0pIHtcbiAgICBjb25zdCBudW1lcmljYWxGb3JtYXR0aW5nID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3Mtc2V0dGluZ3MtbnVtZXJpY2FsRm9ybWF0dGluZycpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLm51bWVyaWNhbEZvcm1hdHRpbmc7XG4gICAgaWYgKG51bWVyaWNhbEZvcm1hdHRpbmcgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRoaXMubihudW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFlBeGlzTnVtYmVyKG51bSkge1xuICAgIGlmIChudW0gJSAxID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIobnVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRhdGUgaGVhZGluZ3MgYXMgc3RyaW5ncyAtIGkxOG4gY29tcGxpYW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9jYWxpemVkIC0gd2hldGhlciB0aGUgZGF0ZXMgc2hvdWxkIGJlIGxvY2FsaXplZCBwZXIgYnJvd3NlciBsYW5ndWFnZVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IHRoZSBkYXRlIGhlYWRpbmdzIGFzIHN0cmluZ3NcbiAgICovXG4gIGdldERhdGVIZWFkaW5ncyhsb2NhbGl6ZWQpIHtcbiAgICBjb25zdCBkYXRlSGVhZGluZ3MgPSBbXSxcbiAgICAgIGVuZERhdGUgPSBtb21lbnQodGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZSkuYWRkKDEsICdkJyk7XG5cbiAgICBmb3IgKGxldCBkYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSk7IGRhdGUuaXNCZWZvcmUoZW5kRGF0ZSk7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChsb2NhbGl6ZWQpIHtcbiAgICAgICAgZGF0ZUhlYWRpbmdzLnB1c2goZGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlSGVhZGluZ3MucHVzaChkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGVIZWFkaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cGxhbmRlZCB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqIFRoaXMgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiBnZXRQYWdlVVJMIHdoZW4geW91IHdhbnQgdG8gY2hhaW4gcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2UgbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBwYWdlXG4gICAqL1xuICBnZXRFeHBhbmRlZFBhZ2VVUkwocGFnZSkge1xuICAgIHJldHVybiBgLy8ke3RoaXMucHJvamVjdH0ub3JnL3cvaW5kZXgucGhwP3RpdGxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhZ2Uuc2NvcmUoKSkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSBmaWxlbmFtZSB3aXRob3V0IGFuIGV4dGVuc2lvblxuICAgKi9cbiAgZ2V0RXhwb3J0RmlsZW5hbWUoKSB7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKSxcbiAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKTtcbiAgICByZXR1cm4gYCR7dGhpcy5hcHB9LSR7c3RhcnREYXRlfS0ke2VuZERhdGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBmdWxsIGxpbmsgZm9yIHRoZSBnaXZlbiBwYWdlIGFuZCBwcm9qZWN0XG4gICAqIEBwYXJhbSAge3N0cmluZ30gcGFnZSAtIHBhZ2UgdG8gbGluayB0b1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtwcm9qZWN0XSAtIHByb2plY3QgbGluaywgZGVmYXVsdHMgdG8gYHRoaXMucHJvamVjdGBcbiAgICogQHJldHVybiB7c3RyaW5nfSBIVE1MIG1hcmt1cFxuICAgKi9cbiAgZ2V0UGFnZUxpbmsocGFnZSwgcHJvamVjdCkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7dGhpcy5nZXRQYWdlVVJMKHBhZ2UsIHByb2plY3QpfVwiPiR7cGFnZS5kZXNjb3JlKCkuZXNjYXBlKCl9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHBhZ2VcbiAgICovXG4gIGdldFBhZ2VVUkwocGFnZSwgcHJvamVjdCA9IHRoaXMucHJvamVjdCkge1xuICAgIHJldHVybiBgLy8ke3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKS5lc2NhcGUoKX0ub3JnL3dpa2kvJHtwYWdlLnNjb3JlKCkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpdGUgLSBzaXRlIG5hbWUgKGUuZy4gZW4ud2lraXBlZGlhLm9yZylcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgc2l0ZVxuICAgKi9cbiAgZ2V0U2l0ZUxpbmsoc2l0ZSkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIi8vJHtzaXRlfS5vcmdcIj4ke3NpdGV9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcm9qZWN0IG5hbWUgKHdpdGhvdXQgdGhlIC5vcmcpXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBsYW5nLnByb2plY3RuYW1lXG4gICAqL1xuICBnZXQgcHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpO1xuICAgIC8qKiBHZXQgdGhlIGZpcnN0IDIgY2hhcmFjdGVycyBmcm9tIHRoZSBwcm9qZWN0IGNvZGUgdG8gZ2V0IHRoZSBsYW5ndWFnZSAqL1xuICAgIHJldHVybiBwcm9qZWN0ID8gcHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy5vcmckLywgJycpIDogbnVsbDtcbiAgfVxuXG4gIGdldExvY2FsZURhdGVTdHJpbmcoKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3IubGFuZ3VhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1hdHMgPSB7XG4gICAgICAnYXItc2EnOiAnREQvTU0vWVknLFxuICAgICAgJ2JnLWJnJzogJ0RELk0uWVlZWScsXG4gICAgICAnY2EtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtdHcnOiAnWVlZWS9NL0QnLFxuICAgICAgJ2NzLWN6JzogJ0QuTS5ZWVlZJyxcbiAgICAgICdkYS1kayc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdkZS1kZSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbC1ncic6ICdEL00vWVlZWScsXG4gICAgICAnZW4tdXMnOiAnTS9EL1lZWVknLFxuICAgICAgJ2ZpLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdmci1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoZS1pbCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdodS1odSc6ICdZWVlZLiBNTS4gREQuJyxcbiAgICAgICdpcy1pcyc6ICdELk0uWVlZWScsXG4gICAgICAnaXQtaXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnamEtanAnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAna28ta3InOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnbmwtbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25iLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3BsLXBsJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3B0LWJyJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdyby1ybyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdydS1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdoci1ocic6ICdELk0uWVlZWScsXG4gICAgICAnc2stc2snOiAnRC4gTS4gWVlZWScsXG4gICAgICAnc3EtYWwnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3Ytc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAndGgtdGgnOiAnRC9NL1lZWVknLFxuICAgICAgJ3RyLXRyJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3VyLXBrJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2lkLWlkJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3VrLXVhJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2JlLWJ5JzogJ0RELk1NLllZWVknLFxuICAgICAgJ3NsLXNpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdldC1lZSc6ICdELk1NLllZWVknLFxuICAgICAgJ2x2LWx2JzogJ1lZWVkuTU0uREQuJyxcbiAgICAgICdsdC1sdCc6ICdZWVlZLk1NLkREJyxcbiAgICAgICdmYS1pcic6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICd2aS12bic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoeS1hbSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhei1sYXRuLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2V1LWVzJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ21rLW1rJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FmLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2thLWdlJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2ZvLWZvJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2hpLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21zLW15JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2trLWt6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2t5LWtnJzogJ0RELk1NLllZJyxcbiAgICAgICdzdy1rZSc6ICdNL2QvWVlZWScsXG4gICAgICAndXotbGF0bi11eic6ICdERC9NTSBZWVlZJyxcbiAgICAgICd0dC1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwYS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZ3UtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ3RhLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3RlLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdrbi1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnbXItaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc2EtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbW4tbW4nOiAnWVkuTU0uREQnLFxuICAgICAgJ2dsLWVzJzogJ0REL01NL1lZJyxcbiAgICAgICdrb2staW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc3lyLXN5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2R2LW12JzogJ0REL01NL1lZJyxcbiAgICAgICdhci1pcSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZGUtY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtbXgnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItYmUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdpdC1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdubC1iZSc6ICdEL01NL1lZWVknLFxuICAgICAgJ25uLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3B0LXB0JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3NyLWxhdG4tY3MnOiAnRC5NLllZWVknLFxuICAgICAgJ3N2LWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhei1jeXJsLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ21zLWJuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3V6LWN5cmwtdXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXItZWcnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtaGsnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWF0JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWF1JzogJ0QvTU0vWVlZWScsXG4gICAgICAnZXMtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItY2EnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3ItY3lybC1jcyc6ICdELk0uWVlZWScsXG4gICAgICAnYXItbHknOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWx1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWNhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FyLWR6JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3poLW1vJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1saSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1ueic6ICdEL01NL1lZWVknLFxuICAgICAgJ2VzLWNyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWx1JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW1hJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLWllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXBhJzogJ01NL0REL1lZWVknLFxuICAgICAgJ2ZyLW1jJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXRuJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2VzLWRvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW9tJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLWptJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXZlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLTAyOSc6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICdlcy1jbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1zeSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1ieic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1qbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi10dCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1hcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1sYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi16dyc6ICdNL0QvWVlZWScsXG4gICAgICAnZXMtZWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXIta3cnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tcGgnOiAnTS9EL1lZWVknLFxuICAgICAgJ2VzLWNsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2FyLWFlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXV5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWJoJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXB5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXFhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWJvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXN2JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWhuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLW5pJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXByJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FtLWV0JzogJ0QvTS9ZWVlZJyxcbiAgICAgICd0em0tbGF0bi1keic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpdS1sYXRuLWNhJzogJ0QvTU0vWVlZWScsXG4gICAgICAnc21hLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ21uLW1vbmctY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2dkLWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLW15JzogJ0QvTS9ZWVlZJyxcbiAgICAgICdwcnMtYWYnOiAnREQvTU0vWVknLFxuICAgICAgJ2JuLWJkJzogJ0RELU1NLVlZJyxcbiAgICAgICd3by1zbic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdydy1ydyc6ICdNL0QvWVlZWScsXG4gICAgICAncXV0LWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NhaC1ydSc6ICdNTS5ERC5ZWVlZJyxcbiAgICAgICdnc3ctZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnY28tZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnb2MtZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnbWktbnonOiAnREQvTU0vWVlZWScsXG4gICAgICAnZ2EtaWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc2Utc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnYnItZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21uLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdtb2gtY2EnOiAnTS9EL1lZWVknLFxuICAgICAgJ2Fybi1jbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpaS1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZHNiLWRlJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ2lnLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdrbC1nbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdsYi1sdSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiYS1ydSc6ICdERC5NTS5ZWScsXG4gICAgICAnbnNvLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3F1ei1ibyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd5by1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnaGEtbGF0bi1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnZmlsLXBoJzogJ00vRC9ZWVlZJyxcbiAgICAgICdwcy1hZic6ICdERC9NTS9ZWScsXG4gICAgICAnZnktbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25lLW5wJzogJ00vRC9ZWVlZJyxcbiAgICAgICdzZS1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdpdS1jYW5zLWNhJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdzci1sYXRuLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzaS1sayc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzci1jeXJsLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdsby1sYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdrbS1raCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdjeS1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiby1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnc21zLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhcy1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtbC1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZW4taW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnb3ItaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2JuLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICd0ay10bSc6ICdERC5NTS5ZWScsXG4gICAgICAnYnMtbGF0bi1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnbXQtbXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc3ItY3lybC1tZSc6ICdELk0uWVlZWScsXG4gICAgICAnc2UtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ3p1LXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3hoLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3RuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2hzYi1kZSc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdicy1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICd0Zy1jeXJsLXRqJzogJ0RELk1NLnl5JyxcbiAgICAgICdzci1sYXRuLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWotbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncm0tY2gnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21qLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3F1ei1lYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdxdXotcGUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHItYmEnOiAnRC5NLllZWVkuJyxcbiAgICAgICdzci1sYXRuLW1lJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWEtc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnZW4tc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ3VnLWNuJzogJ1lZWVktTS1EJyxcbiAgICAgICdzci1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdlcy11cyc6ICdNL0QvWVlZWSdcbiAgICB9O1xuXG4gICAgY29uc3Qga2V5ID0gbmF2aWdhdG9yLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGZvcm1hdHNba2V5XSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbHVlIGZyb20gbG9jYWxTdG9yYWdlLCB1c2luZyBhIHRlbXBvcmFyeSBzdG9yYWdlIGlmIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgZm9yIHRoZSB2YWx1ZSB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IHN0b3JlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0RnJvbUxvY2FsU3RvcmFnZShrZXkpIHtcbiAgICAvLyBTZWUgaWYgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBhbmQgZW5hYmxlZFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlW2tleV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBVUkwgdG8gZmlsZSBhIHJlcG9ydCBvbiBNZXRhLCBwcmVsb2FkZWQgd2l0aCBwZXJtYWxpbmtcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwaGFiUGFzdGVdIFVSTCB0byBhdXRvLWdlbmVyYXRlZCBlcnJvciByZXBvcnQgb24gUGhhYnJpY2F0b3JcbiAgICogQHJldHVybiB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldEJ1Z1JlcG9ydFVSTChwaGFiUGFzdGUpIHtcbiAgICBjb25zdCByZXBvcnRVUkwgPSAnaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmcvdy9pbmRleC5waHA/dGl0bGU9VGFsazpQYWdldmlld3NfQW5hbHlzaXMmYWN0aW9uPWVkaXQnICtcbiAgICAgIGAmc2VjdGlvbj1uZXcmcHJlbG9hZHRpdGxlPSR7dGhpcy5hcHAudXBjYXNlKCl9IGJ1ZyByZXBvcnRgO1xuXG4gICAgaWYgKHBoYWJQYXN0ZSkge1xuICAgICAgcmV0dXJuIGAke3JlcG9ydFVSTH0mcHJlbG9hZD1UYWxrOlBhZ2V2aWV3c19BbmFseXNpcy9QcmVsb2FkJnByZWxvYWRwYXJhbXNbXT0ke3BoYWJQYXN0ZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVwb3J0VVJMO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZ2VuZXJhbCBpbmZvcm1hdGlvbiBhYm91dCBhIHByb2plY3QsIHN1Y2ggYXMgbmFtZXNwYWNlcywgdGl0bGUgb2YgdGhlIG1haW4gcGFnZSwgZXRjLlxuICAgKiBEYXRhIHJldHVybmVkIGJ5IHRoZSBhcGkgaXMgYWxzbyBzdG9yZWQgaW4gdGhpcy5zaXRlSW5mb1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3Qgc3VjaCBhcyBlbi53aWtpcGVkaWEgKHdpdGggb3Igd2l0aG91dCAub3JnKVxuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggc2l0ZWluZm8sXG4gICAqICAgYWxvbmcgd2l0aCBhbnkgb3RoZXIgY2FjaGVkIHNpdGVpbmZvIGZvciBvdGhlciBwcm9qZWN0c1xuICAgKi9cbiAgZmV0Y2hTaXRlSW5mbyhwcm9qZWN0KSB7XG4gICAgcHJvamVjdCA9IHByb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKTtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCksXG4gICAgICBjYWNoZUtleSA9IGBwYWdldmlld3Mtc2l0ZWluZm8tJHtwcm9qZWN0fWA7XG5cbiAgICBpZiAodGhpcy5zaXRlSW5mb1twcm9qZWN0XSkgcmV0dXJuIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuXG4gICAgLy8gdXNlIGNhY2hlZCBzaXRlIGluZm8gaWYgcHJlc2VudFxuICAgIGlmIChzaW1wbGVTdG9yYWdlLmhhc0tleShjYWNoZUtleSkpIHtcbiAgICAgIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0gPSBzaW1wbGVTdG9yYWdlLmdldChjYWNoZUtleSk7XG4gICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb3RoZXJ3aXNlIGZldGNoIHNpdGVpbmZvIGFuZCBzdG9yZSBpbiBjYWNoZVxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9Lm9yZy93L2FwaS5waHBgLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICAgIG1ldGE6ICdzaXRlaW5mbycsXG4gICAgICAgICAgc2lwcm9wOiAnZ2VuZXJhbHxuYW1lc3BhY2VzJyxcbiAgICAgICAgICBmb3JtYXQ6ICdqc29uJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSA9IGRhdGEucXVlcnk7XG5cbiAgICAgICAgLy8gY2FjaGUgZm9yIG9uZSB3ZWVrIChUVEwgaXMgaW4gbWlsbGlzZWNvbmRzKVxuICAgICAgICBzaW1wbGVTdG9yYWdlLnNldChjYWNoZUtleSwgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSwge1RUTDogMTAwMCAqIDYwICogNjAgKiAyNCAqIDd9KTtcblxuICAgICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIGRmZC5yZWplY3QoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBnZXQgc2l0ZWluZm8gZnJvbSB0aGlzLnNpdGVJbmZvIGZvciBnaXZlbiBwcm9qZWN0LCB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgbmFtZSwgd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IHNpdGUgaW5mb3JtYXRpb24gaWYgcHJlc2VudFxuICAgKi9cbiAgZ2V0U2l0ZUluZm8ocHJvamVjdCkge1xuICAgIHJldHVybiB0aGlzLnNpdGVJbmZvW3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHVzZXIgYWdlbnQsIGlmIHN1cHBvcnRlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB1c2VyLWFnZW50XG4gICAqL1xuICBnZXRVc2VyQWdlbnQoKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJ1Vua25vd24nO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHZhbHVlIHRvIGxvY2FsU3RvcmFnZSwgdXNpbmcgYSB0ZW1wb3Jhcnkgc3RvcmFnZSBpZiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0ga2V5IGZvciB0aGUgdmFsdWUgdG8gc2V0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gdmFsdWUgdG8gc3RvcmVcbiAgICogQHJldHVybnMge01peGVkfSBzdG9yZWQgdmFsdWVcbiAgICovXG4gIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XG4gICAgLy8gU2VlIGlmIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgYW5kIGVuYWJsZWRcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHVuaXF1ZSBoYXNoIGNvZGUgZnJvbSBnaXZlbiBzdHJpbmdcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzdHIgLSB0byBiZSBoYXNoZWRcbiAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgaGFzaFxuICAgKi9cbiAgaGFzaENvZGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykucmVkdWNlKChwcmV2SGFzaCwgY3VyclZhbCkgPT5cbiAgICAgICgocHJldkhhc2ggPDwgNSkgLSBwcmV2SGFzaCkgKyBjdXJyVmFsLmNoYXJDb2RlQXQoMCksIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBjaGFydC12aWV3IGFwcHMgKHRoYXQgZG9lcyBub3QgaGF2ZSBhIGxpc3Qgdmlldyk/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzQ2hhcnRBcHAoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzTGlzdEFwcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBsaXN0LXZpZXcgYXBwcz9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNMaXN0QXBwKCkge1xuICAgIHJldHVybiBbJ2xhbmd2aWV3cycsICdtYXNzdmlld3MnLCAncmVkaXJlY3R2aWV3cyddLmluY2x1ZGVzKHRoaXMuYXBwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIHRoZSBjdXJyZW50IHByb2plY3QgaXMgYSBtdWx0aWxpbmd1YWwgcHJvamVjdFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gaXMgbXVsdGlsaW5ndWFsIG9yIG5vdFxuICAgKi9cbiAgaXNNdWx0aWxhbmdQcm9qZWN0KCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGAuKj9cXFxcLigke1B2Lm11bHRpbGFuZ1Byb2plY3RzLmpvaW4oJ3wnKX0pYCkudGVzdCh0aGlzLnByb2plY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBub3JtYWxpemVkIHBhZ2VzIGZyb20gQVBJIGludG8gYSBzdHJpbmcgb2YgcGFnZSBuYW1lc1xuICAgKiBVc2VkIGluIG5vcm1hbGl6ZVBhZ2VOYW1lcygpXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcGFyYW0ge2FycmF5fSBub3JtYWxpemVkUGFnZXMgLSBhcnJheSBvZiBub3JtYWxpemVkIG1hcHBpbmdzIHJldHVybmVkIGJ5IHRoZSBBUElcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlcyB3aXRoIHRoZSBuZXcgbm9ybWFsaXplZCBuYW1lcywgaWYgZ2l2ZW5cbiAgICovXG4gIG1hcE5vcm1hbGl6ZWRQYWdlTmFtZXMocGFnZXMsIG5vcm1hbGl6ZWRQYWdlcykge1xuICAgIG5vcm1hbGl6ZWRQYWdlcy5mb3JFYWNoKG5vcm1hbFBhZ2UgPT4ge1xuICAgICAgLyoqIGRvIGl0IHRoaXMgd2F5IHRvIHByZXNlcnZlIG9yZGVyaW5nIG9mIHBhZ2VzICovXG4gICAgICBwYWdlcyA9IHBhZ2VzLm1hcChwYWdlID0+IHtcbiAgICAgICAgaWYgKG5vcm1hbFBhZ2UuZnJvbSA9PT0gcGFnZSkge1xuICAgICAgICAgIHJldHVybiBub3JtYWxQYWdlLnRvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiB2YWxpZCBtdWx0aWxpbmd1YWwgcHJvamVjdHNcbiAgICogQHJldHVybiB7QXJyYXl9IGJhc2UgcHJvamVjdHMsIHdpdGhvdXQgdGhlIGxhbmd1YWdlXG4gICAqL1xuICBzdGF0aWMgZ2V0IG11bHRpbGFuZ1Byb2plY3RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnd2lraXBlZGlhJyxcbiAgICAgICd3aWtpYm9va3MnLFxuICAgICAgJ3dpa2luZXdzJyxcbiAgICAgICd3aWtpcXVvdGUnLFxuICAgICAgJ3dpa2lzb3VyY2UnLFxuICAgICAgJ3dpa2l2ZXJzaXR5JyxcbiAgICAgICd3aWtpdm95YWdlJ1xuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBtYXNzIHJlcXVlc3RzIHRvIE1lZGlhV2lraSBBUElcbiAgICogVGhlIEFQSSBub3JtYWxseSBsaW1pdHMgdG8gNTAwIHBhZ2VzLCBidXQgZ2l2ZXMgeW91IGEgJ2NvbnRpbnVlJyB2YWx1ZVxuICAgKiAgIHRvIGZpbmlzaCBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgcmVzb3VyY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbWV0ZXJzIHRvIHBhc3MgdG8gdGhlIEFQSVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgdG8gcXVlcnksIGUuZy4gZW4ud2lraXBlZGlhICgub3JnIGlzIG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRpbnVlS2V5XSAtIHRoZSBrZXkgdG8gbG9vayBpbiB0aGUgY29udGludWUgaGFzaCwgaWYgcHJlc2VudCAoZS5nLiBjbWNvbnRpbnVlIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gW2RhdGFLZXldIC0gdGhlIGtleSBmb3IgdGhlIG1haW4gY2h1bmsgb2YgZGF0YSwgaW4gdGhlIHF1ZXJ5IGhhc2ggKGUuZy4gY2F0ZWdvcnltZW1iZXJzIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiAgIElmIHRoaXMgaXMgYSBmdW5jdGlvbiBpdCBpcyBnaXZlbiB0aGUgcmVzcG9uc2UgZGF0YSwgYW5kIGV4cGVjdGVkIHRvIHJldHVybiB0aGUgZGF0YSB3ZSB3YW50IHRvIGNvbmNhdGVudGF0ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdF0gLSBtYXggbnVtYmVyIG9mIHBhZ2VzIHRvIGZldGNoXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBwcm9taXNlIHJlc29sdmluZyB3aXRoIGRhdGFcbiAgICovXG4gIG1hc3NBcGkocGFyYW1zLCBwcm9qZWN0LCBjb250aW51ZUtleSA9ICdjb250aW51ZScsIGRhdGFLZXksIGxpbWl0ID0gdGhpcy5jb25maWcuYXBpTGltaXQpIHtcbiAgICBpZiAoIS9cXC5vcmckLy50ZXN0KHByb2plY3QpKSBwcm9qZWN0ICs9ICcub3JnJztcblxuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcbiAgICBsZXQgcmVzb2x2ZURhdGEgPSB7XG4gICAgICBwYWdlczogW11cbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZVJlcXVlc3QgPSBjb250aW51ZVZhbHVlID0+IHtcbiAgICAgIGxldCByZXF1ZXN0RGF0YSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBmb3JtYXR2ZXJzaW9uOiAnMidcbiAgICAgIH0sIHBhcmFtcyk7XG5cbiAgICAgIGlmIChjb250aW51ZVZhbHVlKSByZXF1ZXN0RGF0YVtjb250aW51ZUtleV0gPSBjb250aW51ZVZhbHVlO1xuXG4gICAgICBjb25zdCBwcm9taXNlID0gJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9L3cvYXBpLnBocGAsXG4gICAgICAgIGpzb25wOiAnY2FsbGJhY2snLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgZGF0YTogcmVxdWVzdERhdGFcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIC8vIHNvbWUgZmFpbHVyZXMgY29tZSBiYWNrIGFzIDIwMHMsIHNvIHdlIHN0aWxsIHJlc29sdmUgYW5kIGxldCB0aGUgbG9jYWwgYXBwIGhhbmRsZSBpdFxuICAgICAgICBpZiAoZGF0YS5lcnJvcikgcmV0dXJuIGRmZC5yZXNvbHZlKGRhdGEpO1xuXG4gICAgICAgIGxldCBpc0ZpbmlzaGVkO1xuXG4gICAgICAgIC8vIGFsbG93IGN1c3RvbSBmdW5jdGlvbiB0byBwYXJzZSB0aGUgZGF0YSB3ZSB3YW50LCBpZiBwcm92aWRlZFxuICAgICAgICBpZiAodHlwZW9mIGRhdGFLZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhS2V5KGRhdGEucXVlcnkpKTtcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFwcGVuZCBuZXcgZGF0YSB0byBkYXRhIGZyb20gbGFzdCByZXF1ZXN0LiBXZSBtaWdodCB3YW50IGJvdGggJ3BhZ2VzJyBhbmQgZGF0YUtleVxuICAgICAgICAgIGlmIChkYXRhLnF1ZXJ5LnBhZ2VzKSB7XG4gICAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhLnF1ZXJ5LnBhZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEucXVlcnlbZGF0YUtleV0pIHtcbiAgICAgICAgICAgIHJlc29sdmVEYXRhW2RhdGFLZXldID0gKHJlc29sdmVEYXRhW2RhdGFLZXldIHx8IFtdKS5jb25jYXQoZGF0YS5xdWVyeVtkYXRhS2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIHBhZ2VzIGlzIG5vdCB0aGUgY29sbGVjdGlvbiB3ZSB3YW50LCBpdCB3aWxsIGJlIGVpdGhlciBhbiBlbXB0eSBhcnJheSBvciBvbmUgZW50cnkgd2l0aCBiYXNpYyBwYWdlIGluZm9cbiAgICAgICAgICAvLyAgIGRlcGVuZGluZyBvbiB3aGF0IEFQSSB3ZSdyZSBoaXR0aW5nLiBTbyByZXNvbHZlRGF0YVtkYXRhS2V5XSB3aWxsIGhpdCB0aGUgbGltaXRcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0IHx8IHJlc29sdmVEYXRhW2RhdGFLZXldLmxlbmd0aCA+PSBsaW1pdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2UgcmVjdXJzaXZlIGNhbGwgaWYgbmVlZGVkLCB3YWl0aW5nIDEwMG1zXG4gICAgICAgIGlmICghaXNGaW5pc2hlZCAmJiBkYXRhLmNvbnRpbnVlICYmIGRhdGEuY29udGludWVbY29udGludWVLZXldKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtYWtlUmVxdWVzdChkYXRhLmNvbnRpbnVlW2NvbnRpbnVlS2V5XSk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpbmRpY2F0ZSB0aGVyZSB3ZXJlIG1vcmUgZW50cmllcyB0aGFuIHRoZSBsaW1pdFxuICAgICAgICAgIGlmIChkYXRhLmNvbnRpbnVlKSByZXNvbHZlRGF0YS5jb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgZGZkLnJlc29sdmUocmVzb2x2ZURhdGEpO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgICBkZmQucmVqZWN0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1ha2VSZXF1ZXN0KCk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2FsaXplIE51bWJlciBvYmplY3Qgd2l0aCBkZWxpbWl0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIHRoZSBOdW1iZXIsIGUuZy4gMTIzNDU2N1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHdpdGggbG9jYWxlIGRlbGltaXRlcnMsIGUuZy4gMSwyMzQsNTY3IChlbi1VUylcbiAgICovXG4gIG4odmFsdWUpIHtcbiAgICByZXR1cm4gKG5ldyBOdW1iZXIodmFsdWUpKS50b0xvY2FsZVN0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBiYXNpYyBpbmZvIG9uIGdpdmVuIHBhZ2VzLCBpbmNsdWRpbmcgdGhlIG5vcm1hbGl6ZWQgcGFnZSBuYW1lcy5cbiAgICogRS5nLiBtYXNjdWxpbmUgdmVyc3VzIGZlbWluaW5lIG5hbWVzcGFjZXMgb24gZGV3aWtpXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2Ugd2l0aCBkYXRhIGZldGNoZWQgZnJvbSBBUElcbiAgICovXG4gIGdldFBhZ2VJbmZvKHBhZ2VzKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocD9hY3Rpb249cXVlcnkmcHJvcD1pbmZvJmlucHJvcD1wcm90ZWN0aW9ufHdhdGNoZXJzYCArXG4gICAgICAgIGAmZm9ybWF0dmVyc2lvbj0yJmZvcm1hdD1qc29uJnRpdGxlcz0ke3BhZ2VzLmpvaW4oJ3wnKX1gLFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgbGV0IHBhZ2VEYXRhID0ge307XG4gICAgICBkYXRhLnF1ZXJ5LnBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICAgIHBhZ2VEYXRhW3BhZ2UudGl0bGVdID0gcGFnZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKHBhZ2VEYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIGhvdyBtYW55IGRheXMgYXJlIGluIHRoZSBzZWxlY3RlZCBkYXRlIHJhbmdlXG4gICAqIEByZXR1cm5zIHtpbnRlZ2VyfSBudW1iZXIgb2YgZGF5c1xuICAgKi9cbiAgbnVtRGF5c0luUmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuZGlmZih0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUsICdkYXlzJykgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGtleS92YWx1ZSBwYWlycyBvZiBVUkwgcXVlcnkgc3RyaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbXVsdGlQYXJhbV0gLSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWVzIG5lZWRzIHRvIHNwbGl0IGJ5IHBpcGUgY2hhcmFjdGVyXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGtleS92YWx1ZSBwYWlycyByZXByZXNlbnRhdGlvbiBvZiBxdWVyeSBzdHJpbmdcbiAgICovXG4gIHBhcnNlUXVlcnlTdHJpbmcobXVsdGlQYXJhbSkge1xuICAgIGNvbnN0IHVyaSA9IGRlY29kZVVSSShsb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkpLFxuICAgICAgY2h1bmtzID0gdXJpLnNwbGl0KCcmJyk7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaHVuayA9IGNodW5rc1tpXS5zcGxpdCgnPScpO1xuXG4gICAgICBpZiAobXVsdGlQYXJhbSAmJiBjaHVua1swXSA9PT0gbXVsdGlQYXJhbSkge1xuICAgICAgICBwYXJhbXNbbXVsdGlQYXJhbV0gPSBjaHVua1sxXS5zcGxpdCgnfCcpLmZpbHRlcihwYXJhbSA9PiAhIXBhcmFtKS51bmlxdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtc1tjaHVua1swXV0gPSBjaHVua1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBtZXRyaWMgdG8gc2VlIGhvdyBtYW55IHVzZSBpdCAocGFnZXZpZXdzIG9mIHRoZSBwYWdldmlldywgYSBtZXRhLXBhZ2V2aWV3LCBpZiB5b3Ugd2lsbCA6KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwIC0gb25lIG9mOiBwdiwgbHYsIHR2LCBzdiwgbXNcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcGF0Y2hVc2FnZShhcHApIHtcbiAgICBpZiAobWV0YVJvb3QpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC8vJHttZXRhUm9vdH0vdXNhZ2UvJHt0aGlzLmFwcH0vJHt0aGlzLnByb2plY3QgfHwgaTE4bkxhbmd9YCxcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRpbWVzdGFtcCBvZiB3aGVuIHByb2Nlc3Mgc3RhcnRlZFxuICAgKiBAcmV0dXJuIHttb21lbnR9IHN0YXJ0IHRpbWVcbiAgICovXG4gIHByb2Nlc3NTdGFydGVkKCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3NTdGFydCA9IG1vbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbGFwc2VkIHRpbWUgZnJvbSB0aGlzLnByb2Nlc3NTdGFydCwgYW5kIHNob3cgaXRcbiAgICogQHJldHVybiB7bW9tZW50fSBFbGFwc2VkIHRpbWUgZnJvbSBgdGhpcy5wcm9jZXNzU3RhcnRgIGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgcHJvY2Vzc0VuZGVkKCkge1xuICAgIGNvbnN0IGVuZFRpbWUgPSBtb21lbnQoKSxcbiAgICAgIGVsYXBzZWRUaW1lID0gZW5kVGltZS5kaWZmKHRoaXMucHJvY2Vzc1N0YXJ0LCAnbWlsbGlzZWNvbmRzJyk7XG5cbiAgICAvKiogRklYTUU6IHJlcG9ydCB0aGlzIGJ1Zzogc29tZSBsYW5ndWFnZXMgZG9uJ3QgcGFyc2UgUExVUkFMIGNvcnJlY3RseSAoJ2hlJyBmb3IgZXhhbXBsZSkgd2l0aCB0aGUgRW5nbGlzaCBmYWxsYmFjayBtZXNzYWdlICovXG4gICAgdHJ5IHtcbiAgICAgICQoJy5lbGFwc2VkLXRpbWUnKS5hdHRyKCdkYXRldGltZScsIGVuZFRpbWUuZm9ybWF0KCkpXG4gICAgICAgIC50ZXh0KCQuaTE4bignZWxhcHNlZC10aW1lJywgZWxhcHNlZFRpbWUgLyAxMDAwKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxsIG5vdGhpbmcsIGV2ZXJ5dGhpbmcgd2lsbCBzdGlsbCBzaG93XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkYXB0ZWQgZnJvbSBodHRwOi8vanNmaWRkbGUubmV0L2RhbmR2LzQ3Y2JqLyBjb3VydGVzeSBvZiBkYW5kdlxuICAgKlxuICAgKiBTYW1lIGFzIF8uZGVib3VuY2UgYnV0IHF1ZXVlcyBhbmQgZXhlY3V0ZXMgYWxsIGZ1bmN0aW9uIGNhbGxzXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAtIGZ1bmN0aW9uIHRvIGRlYm91bmNlXG4gICAqIEBwYXJhbSAge2RlbGF5fSBkZWxheSAtIGRlbGF5IGR1cmF0aW9uIG9mIG1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHQgLSBzY29wZSB0aGUgZnVuY3Rpb24gc2hvdWxkIHJlZmVyIHRvXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByYXRlLWxpbWl0ZWQgZnVuY3Rpb24gdG8gY2FsbCBpbnN0ZWFkIG9mIHlvdXIgZnVuY3Rpb25cbiAgICovXG4gIHJhdGVMaW1pdChmbiwgZGVsYXksIGNvbnRleHQpIHtcbiAgICBsZXQgcXVldWUgPSBbXSwgdGltZXI7XG5cbiAgICBjb25zdCBwcm9jZXNzUXVldWUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGZuLmFwcGx5KGl0ZW0uY29udGV4dCwgaXRlbS5hcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKSwgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbGltaXRlZCgpIHtcbiAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICBjb250ZXh0OiBjb250ZXh0IHx8IHRoaXMsXG4gICAgICAgIGFyZ3VtZW50czogW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0aW1lcikge1xuICAgICAgICBwcm9jZXNzUXVldWUoKTsgLy8gc3RhcnQgaW1tZWRpYXRlbHkgb24gdGhlIGZpcnN0IGludm9jYXRpb25cbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChwcm9jZXNzUXVldWUsIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIFNlbGVjdDIgcmVsYXRlZCBzdHVmZiB0aGVuIGFkZHMgaXQgYmFja1xuICAgKiBBbHNvIG1pZ2h0IHJlc3VsdCBpbiB0aGUgY2hhcnQgYmVpbmcgcmUtcmVuZGVyZWRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlc2V0U2VsZWN0MigpIHtcbiAgICBjb25zdCBzZWxlY3QySW5wdXQgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgc2VsZWN0MklucHV0Lm9mZignY2hhbmdlJyk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ3ZhbCcsIG51bGwpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCdkYXRhJywgbnVsbCk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2Rlc3Ryb3knKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBhbHBoYSBsZXZlbCBvZiBhbiByZ2JhIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHJnYmEgdmFsdWVcbiAgICogQHBhcmFtIHtmbG9hdHxzdHJpbmd9IGFscGhhIC0gdHJhbnNwYXJlbmN5IGFzIGZsb2F0IHZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHJnYmEgdmFsdWVcbiAgICovXG4gIHJnYmEodmFsdWUsIGFscGhhKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyxcXHMqXFxkXFwpLywgYCwgJHthbHBoYX0pYCk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBhIHBhcnRpY3VsYXIgc2V0dGluZyB0byBzZXNzaW9uIGFuZCBsb2NhbFN0b3JhZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHNldHRpbmdzIGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ3xib29sZWFufSB2YWx1ZSAtIHZhbHVlIHRvIHNhdmVcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5nKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICB0aGlzLnNldExvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7a2V5fWAsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBzZWxlY3RlZCBzZXR0aW5ncyB3aXRoaW4gdGhlIHNldHRpbmdzIG1vZGFsXG4gICAqIFByZWZlciB0aGlzIGltcGxlbWVudGF0aW9uIG92ZXIgYSBsYXJnZSBsaWJyYXJ5IGxpa2Ugc2VyaWFsaXplT2JqZWN0IG9yIHNlcmlhbGl6ZUpTT05cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5ncygpIHtcbiAgICAvKiogdHJhY2sgaWYgd2UncmUgY2hhbmdpbmcgdG8gbm9fYXV0b2NvbXBsZXRlIG1vZGUgKi9cbiAgICBjb25zdCB3YXNBdXRvY29tcGxldGUgPSB0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZSc7XG5cbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwuY2hlY2tlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgfSBlbHNlIGlmIChlbC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXBwICE9PSAndG9wdmlld3MnKSB7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5sb2NhbGUuZm9ybWF0ID0gdGhpcy5kYXRlRm9ybWF0O1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIudXBkYXRlRWxlbWVudCgpO1xuXG4gICAgICB0aGlzLnNldHVwU2VsZWN0MkNvbG9ycygpO1xuXG4gICAgICAvKipcbiAgICAgICAqIElmIHdlIGNoYW5nZWQgdG8vZnJvbSBub19hdXRvY29tcGxldGUgd2UgaGF2ZSB0byByZXNldCBTZWxlY3QyIGVudGlyZWx5XG4gICAgICAgKiAgIGFzIHNldFNlbGVjdDJEZWZhdWx0cyBpcyBzdXBlciBidWdneSBkdWUgdG8gU2VsZWN0MiBjb25zdHJhaW50c1xuICAgICAgICogU28gbGV0J3Mgb25seSByZXNldCBpZiB3ZSBoYXZlIHRvXG4gICAgICAgKi9cbiAgICAgIGlmICgodGhpcy5hdXRvY29tcGxldGUgPT09ICdub19hdXRvY29tcGxldGUnKSAhPT0gd2FzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZ2luQXRaZXJvID09PSAndHJ1ZScpIHtcbiAgICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc0lucHV0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpcmVjdGx5IHNldCBpdGVtcyBpbiBTZWxlY3QyXG4gICAqIEN1cnJlbnRseSBpcyBub3QgYWJsZSB0byByZW1vdmUgdW5kZXJzY29yZXMgZnJvbSBwYWdlIG5hbWVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGl0ZW1zIC0gcGFnZSB0aXRsZXNcbiAgICogQHJldHVybnMge2FycmF5fSAtIHVudG91Y2hlZCBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0U2VsZWN0MkRlZmF1bHRzKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGVzY2FwZWRUZXh0ID0gJCgnPGRpdj4nKS50ZXh0KGl0ZW0pLmh0bWwoKTtcbiAgICAgICQoJzxvcHRpb24+JyArIGVzY2FwZWRUZXh0ICsgJzwvb3B0aW9uPicpLmFwcGVuZFRvKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgfSk7XG4gICAgJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcsIGl0ZW1zKTtcbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MignY2xvc2UnKTtcblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkYXRlcmFuZ2UgcGlja2VyIHZhbHVlcyBhbmQgdGhpcy5zcGVjaWFsUmFuZ2UgYmFzZWQgb24gcHJvdmlkZWQgc3BlY2lhbCByYW5nZSBrZXlcbiAgICogV0FSTklORzogbm90IHRvIGJlIGNhbGxlZCBvbiBkYXRlcmFuZ2UgcGlja2VyIEdVSSBldmVudHMgKGUuZy4gc3BlY2lhbCByYW5nZSBidXR0b25zKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIG9uZSBvZiBzcGVjaWFsIHJhbmdlcyBkZWZpbmVkIGluIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMsXG4gICAqICAgaW5jbHVkaW5nIGR5bmFtaWMgbGF0ZXN0IHJhbmdlLCBzdWNoIGFzIGBsYXRlc3QtMTVgIGZvciBsYXRlc3QgMTUgZGF5c1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fG51bGx9IHVwZGF0ZWQgdGhpcy5zcGVjaWFsUmFuZ2Ugb2JqZWN0IG9yIG51bGwgaWYgdHlwZSB3YXMgaW52YWxpZFxuICAgKi9cbiAgc2V0U3BlY2lhbFJhbmdlKHR5cGUpIHtcbiAgICBjb25zdCByYW5nZUluZGV4ID0gT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuaW5kZXhPZih0eXBlKTtcbiAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgaWYgKHR5cGUuaW5jbHVkZXMoJ2xhdGVzdC0nKSkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQodHlwZS5yZXBsYWNlKCdsYXRlc3QtJywgJycpLCAxMCkgfHwgMjA7IC8vIGZhbGxiYWNrIG9mIDIwXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMubGF0ZXN0KG9mZnNldCk7XG4gICAgfSBlbHNlIGlmIChyYW5nZUluZGV4ID49IDApIHtcbiAgICAgIC8qKiB0cmVhdCAnbGF0ZXN0JyBhcyBhIGZ1bmN0aW9uICovXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHR5cGUgPT09ICdsYXRlc3QnID8gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcy5sYXRlc3QoKSA6IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNbdHlwZV07XG4gICAgICAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5lcShyYW5nZUluZGV4KS50cmlnZ2VyKCdjbGljaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSB7XG4gICAgICByYW5nZTogdHlwZSxcbiAgICAgIHZhbHVlOiBgJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCl9IC0gJHtlbmREYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpfWBcbiAgICB9O1xuXG4gICAgLyoqIGRpcmVjdGx5IGFzc2lnbiBzdGFydERhdGUgdGhlbiB1c2Ugc2V0RW5kRGF0ZSBzbyB0aGF0IHRoZSBldmVudHMgd2lsbCBiZSBmaXJlZCBvbmNlICovXG4gICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnNldEVuZERhdGUoZW5kRGF0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zcGVjaWFsUmFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgY29sb3JzIGZvciBTZWxlY3QyIGVudHJpZXMgc28gd2UgY2FuIGR5bmFtaWNhbGx5IGNoYW5nZSB0aGVtXG4gICAqIFRoaXMgaXMgYSBuZWNlc3NhcnkgZXZpbCwgYXMgd2UgaGF2ZSB0byBtYXJrIHRoZW0gYXMgIWltcG9ydGFudFxuICAgKiAgIGFuZCBzaW5jZSB0aGVyZSBhcmUgYW55IG51bWJlciBvZiBlbnRpcmVzLCB3ZSBuZWVkIHRvIHVzZSBudGgtY2hpbGQgc2VsZWN0b3JzXG4gICAqIEByZXR1cm5zIHtDU1NTdHlsZXNoZWV0fSBvdXIgbmV3IHN0eWxlc2hlZXRcbiAgICovXG4gIHNldHVwU2VsZWN0MkNvbG9ycygpIHtcbiAgICAvKiogZmlyc3QgZGVsZXRlIG9sZCBzdHlsZXNoZWV0LCBpZiBwcmVzZW50ICovXG4gICAgaWYgKHRoaXMuY29sb3JzU3R5bGVFbCkgdGhpcy5jb2xvcnNTdHlsZUVsLnJlbW92ZSgpO1xuXG4gICAgLyoqIGNyZWF0ZSBuZXcgc3R5bGVzaGVldCAqL1xuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7IC8vIFdlYktpdCBoYWNrIDooXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLmNvbG9yc1N0eWxlRWwpO1xuXG4gICAgLyoqIGFkZCBjb2xvciBydWxlcyAqL1xuICAgIHRoaXMuY29uZmlnLmNvbG9ycy5mb3JFYWNoKChjb2xvciwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuY29sb3JzU3R5bGVFbC5zaGVldC5pbnNlcnRSdWxlKGAuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZTpudGgtb2YtdHlwZSgke2luZGV4ICsgMX0pIHsgYmFja2dyb3VuZDogJHtjb2xvcn0gIWltcG9ydGFudCB9YCwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jb2xvcnNTdHlsZUVsLnNoZWV0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyb3NzLWFwcGxpY2F0aW9uIGxpc3RlbmVyc1xuICAgKiBFYWNoIGFwcCBoYXMgaXQncyBvd24gc2V0dXBMaXN0ZW5lcnMoKSB0aGF0IHNob3VsZCBjYWxsIHN1cGVyLnNldHVwTGlzdGVuZXJzKClcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgLyoqIHByZXZlbnQgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3VyIGZvciBhbnkgbGluayB3aXRoIGhyZWY9XCIjXCIgKi9cbiAgICAkKFwiYVtocmVmPScjJ11cIikub24oJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXG4gICAgLyoqIGRvd25sb2FkIGxpc3RlbmVycyAqL1xuICAgICQoJy5kb3dubG9hZC1jc3YnKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydENTVi5iaW5kKHRoaXMpKTtcbiAgICAkKCcuZG93bmxvYWQtanNvbicpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0SlNPTi5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBwcm9qZWN0IGlucHV0IGxpc3RlbmVycywgc2F2aW5nIGFuZCByZXN0b3Jpbmcgb2xkIHZhbHVlIGlmIG5ldyBvbmUgaXMgaW52YWxpZCAqL1xuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS5vbignZm9jdXNpbicsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kYXRhc2V0LnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9KTtcbiAgICAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkub24oJ2NoYW5nZScsIGUgPT4gdGhpcy52YWxpZGF0ZVByb2plY3QoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZXMgb2YgZm9ybSBiYXNlZCBvbiBsb2NhbFN0b3JhZ2Ugb3IgZGVmYXVsdHMsIGFkZCBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldHVwU2V0dGluZ3NNb2RhbCgpIHtcbiAgICAvKiogZmlsbCBpbiB2YWx1ZXMsIGV2ZXJ5dGhpbmcgaXMgZWl0aGVyIGEgY2hlY2tib3ggb3IgcmFkaW8gKi9cbiAgICB0aGlzLmZpbGxJblNldHRpbmdzKCk7XG5cbiAgICAvKiogYWRkIGxpc3RlbmVyICovXG4gICAgJCgnLnNhdmUtc2V0dGluZ3MtYnRuJykub24oJ2NsaWNrJywgdGhpcy5zYXZlU2V0dGluZ3MuYmluZCh0aGlzKSk7XG4gICAgJCgnLmNhbmNlbC1zZXR0aW5ncy1idG4nKS5vbignY2xpY2snLCB0aGlzLmZpbGxJblNldHRpbmdzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldHMgdXAgdGhlIGRhdGVyYW5nZSBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpIHtcbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMgdG8gaGF2ZSBpMThuIGFzIGtleXNcbiAgICAgKiBUaGlzIGlzIHdoYXQgaXMgc2hvd24gYXMgdGhlIHNwZWNpYWwgcmFuZ2VzIChMYXN0IG1vbnRoLCBldGMuKSBpbiB0aGUgZGF0ZXBpY2tlciBtZW51XG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBsZXQgcmFuZ2VzID0ge307XG4gICAgT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gJ2xhdGVzdCcpIHJldHVybjsgLy8gdGhpcyBpcyBhIGZ1bmN0aW9uLCBub3QgbWVhbnQgdG8gYmUgaW4gdGhlIGxpc3Qgb2Ygc3BlY2lhbCByYW5nZXNcbiAgICAgIHJhbmdlc1skLmkxOG4oa2V5KV0gPSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzW2tleV07XG4gICAgfSk7XG5cbiAgICBsZXQgZGF0ZXBpY2tlck9wdGlvbnMgPSB7XG4gICAgICBsb2NhbGU6IHtcbiAgICAgICAgZm9ybWF0OiB0aGlzLmRhdGVGb3JtYXQsXG4gICAgICAgIGFwcGx5TGFiZWw6ICQuaTE4bignYXBwbHknKSxcbiAgICAgICAgY2FuY2VsTGFiZWw6ICQuaTE4bignY2FuY2VsJyksXG4gICAgICAgIGN1c3RvbVJhbmdlTGFiZWw6ICQuaTE4bignY3VzdG9tLXJhbmdlJyksXG4gICAgICAgIGRheXNPZldlZWs6IFtcbiAgICAgICAgICAkLmkxOG4oJ3N1JyksXG4gICAgICAgICAgJC5pMThuKCdtbycpLFxuICAgICAgICAgICQuaTE4bigndHUnKSxcbiAgICAgICAgICAkLmkxOG4oJ3dlJyksXG4gICAgICAgICAgJC5pMThuKCd0aCcpLFxuICAgICAgICAgICQuaTE4bignZnInKSxcbiAgICAgICAgICAkLmkxOG4oJ3NhJylcbiAgICAgICAgXSxcbiAgICAgICAgbW9udGhOYW1lczogW1xuICAgICAgICAgICQuaTE4bignamFudWFyeScpLFxuICAgICAgICAgICQuaTE4bignZmVicnVhcnknKSxcbiAgICAgICAgICAkLmkxOG4oJ21hcmNoJyksXG4gICAgICAgICAgJC5pMThuKCdhcHJpbCcpLFxuICAgICAgICAgICQuaTE4bignbWF5JyksXG4gICAgICAgICAgJC5pMThuKCdqdW5lJyksXG4gICAgICAgICAgJC5pMThuKCdqdWx5JyksXG4gICAgICAgICAgJC5pMThuKCdhdWd1c3QnKSxcbiAgICAgICAgICAkLmkxOG4oJ3NlcHRlbWJlcicpLFxuICAgICAgICAgICQuaTE4bignb2N0b2JlcicpLFxuICAgICAgICAgICQuaTE4bignbm92ZW1iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ2RlY2VtYmVyJylcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCkuc3VidHJhY3QodGhpcy5jb25maWcuZGF5c0FnbywgJ2RheXMnKSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuY29uZmlnLm1pbkRhdGUsXG4gICAgICBtYXhEYXRlOiB0aGlzLmNvbmZpZy5tYXhEYXRlLFxuICAgICAgcmFuZ2VzOiByYW5nZXNcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmRhdGVMaW1pdCkgZGF0ZXBpY2tlck9wdGlvbnMuZGF0ZUxpbWl0ID0geyBkYXlzOiB0aGlzLmNvbmZpZy5kYXRlTGltaXQgfTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLmRhdGVyYW5nZXBpY2tlcihkYXRlcGlja2VyT3B0aW9ucyk7XG5cbiAgICAvKiogc28gcGVvcGxlIGtub3cgd2h5IHRoZXkgY2FuJ3QgcXVlcnkgZGF0YSBvbGRlciB0aGFuIEp1bHkgMjAxNSAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXInKS5hcHBlbmQoXG4gICAgICAkKCc8ZGl2PicpXG4gICAgICAgIC5hZGRDbGFzcygnZGF0ZXJhbmdlLW5vdGljZScpXG4gICAgICAgIC5odG1sKCQuaTE4bignZGF0ZS1ub3RpY2UnLCBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHA6Ly9zdGF0cy5ncm9rLnNlJyB0YXJnZXQ9J19ibGFuayc+c3RhdHMuZ3Jvay5zZTwvYT5cIixcbiAgICAgICAgICBgJHskLmkxOG4oJ2p1bHknKX0gMjAxNWBcbiAgICAgICAgKSlcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNwZWNpYWwgZGF0ZSByYW5nZSBvcHRpb25zIChidXR0b25zIHRoZSByaWdodCBzaWRlIG9mIHRoZSBkYXRlcmFuZ2UgcGlja2VyKVxuICAgICAqXG4gICAgICogV0FSTklORzogd2UncmUgdW5hYmxlIHRvIGFkZCBjbGFzcyBuYW1lcyBvciBkYXRhIGF0dHJzIHRvIHRoZSByYW5nZSBvcHRpb25zLFxuICAgICAqIHNvIGNoZWNraW5nIHdoaWNoIHdhcyBjbGlja2VkIGlzIGhhcmRjb2RlZCBiYXNlZCBvbiB0aGUgaW5kZXggb2YgdGhlIExJLFxuICAgICAqIGFzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1xuICAgICAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5pbmRleChlLnRhcmdldCksXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmNvbnRhaW5lcixcbiAgICAgICAgaW5wdXRzID0gY29udGFpbmVyLmZpbmQoJy5kYXRlcmFuZ2VwaWNrZXJfaW5wdXQgaW5wdXQnKTtcbiAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0ge1xuICAgICAgICByYW5nZTogT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcylbaW5kZXhdLFxuICAgICAgICB2YWx1ZTogYCR7aW5wdXRzWzBdLnZhbHVlfSAtICR7aW5wdXRzWzFdLnZhbHVlfWBcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS5vbignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgKGUsIGFjdGlvbikgPT4ge1xuICAgICAgaWYgKGFjdGlvbi5jaG9zZW5MYWJlbCA9PT0gJC5pMThuKCdjdXN0b20tcmFuZ2UnKSkge1xuICAgICAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IG51bGw7XG5cbiAgICAgICAgLyoqIGZvcmNlIGV2ZW50cyB0byByZS1maXJlIHNpbmNlIGFwcGx5LmRhdGVyYW5nZXBpY2tlciBvY2N1cnMgYmVmb3JlICdjaGFuZ2UnIGV2ZW50ICovXG4gICAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNob3dGYXRhbEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICBlcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgYDxzdHJvbmc+JHskLmkxOG4oJ2ZhdGFsLWVycm9yJyl9PC9zdHJvbmc+OiA8Y29kZT4ke2Vycm9yfTwvY29kZT5gLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICB9IGVsc2UgaWYgKGVycm9ycyAmJiBlcnJvcnNbMF0gJiYgZXJyb3JzWzBdLnN0YWNrKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnLy90b29scy53bWZsYWJzLm9yZy9tdXNpa2FuaW1hbC9wYXN0ZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb250ZW50OiAnJyArXG4gICAgICAgICAgICBgXFxuZGF0ZTogICAgICAke21vbWVudCgpLnV0YygpLmZvcm1hdCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRvb2w6ICAgICAgJHt0aGlzLmFwcH1gICtcbiAgICAgICAgICAgIGBcXG5sYW5ndWFnZTogICR7aTE4bkxhbmd9YCArXG4gICAgICAgICAgICBgXFxuY2hhcnQ6ICAgICAke3RoaXMuY2hhcnRUeXBlfWAgK1xuICAgICAgICAgICAgYFxcbnVybDogICAgICAgJHtkb2N1bWVudC5sb2NhdGlvbi5ocmVmfWAgK1xuICAgICAgICAgICAgYFxcbnVzZXJBZ2VudDogJHt0aGlzLmdldFVzZXJBZ2VudCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRyYWNlOiAgICAgJHtlcnJvcnNbMF0uc3RhY2t9YFxuICAgICAgICAgICxcbiAgICAgICAgICB0aXRsZTogYFBhZ2V2aWV3cyBBbmFseXNpcyBlcnJvciByZXBvcnQ6ICR7ZXJyb3JzWzBdfWBcbiAgICAgICAgfVxuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkpLFxuICAgICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKSxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSksXG4gICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwbGFzaCBpbiBjb25zb2xlLCBqdXN0IGZvciBmdW5cbiAgICogQHJldHVybnMge1N0cmluZ30gb3V0cHV0XG4gICAqL1xuICBzcGxhc2goKSB7XG4gICAgY29uc3Qgc3R5bGUgPSAnYmFja2dyb3VuZDogI2VlZTsgY29sb3I6ICM1NTU7IHBhZGRpbmc6IDRweDsgZm9udC1mYW1pbHk6bW9ub3NwYWNlJztcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBfX18gICAgICAgICAgICBfXyBfICAgICAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgfCBfIFxcXFwgIF9fIF8gICAgLyBfYCB8ICAgX19fICAgIF9fIF9fICAgIChfKSAgICAgX19fICAgX18gX18gX18gIF9fXyAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICB8ICBfLyAvIF9gIHwgICBcXFxcX18sIHwgIC8gLV8pICAgXFxcXCBWIC8gICAgfCB8ICAgIC8gLV8pICBcXFxcIFYgIFYgLyAoXy08ICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgX3xffF8gIFxcXFxfXyxffCAgIHxfX18vICAgXFxcXF9fX3wgICBfXFxcXF8vXyAgIF98X3xfICAgXFxcXF9fX3wgICBcXFxcXy9cXFxcXy8gIC9fXy9fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgX3wgXCJcIlwiIHxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgICAgICAgICBfX18gICAgICAgICAgICAgICAgICAgICBfICBfICAgICBfICAgICAgICAgICAgICAgXyAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBvIE8gTyAgLyAgIFxcXFwgICBfIF8gICAgIF9fIF8gICAgfCB8fCB8ICAgfCB8ICAgICBfX18gICAgIChfKSAgICAgX19fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgbyAgICAgICB8IC0gfCAgfCBcXCcgXFxcXCAgIC8gX2AgfCAgICBcXFxcXywgfCAgIHwgfCAgICAoXy08ICAgICB8IHwgICAgKF8tPCAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgVFNfX1tPXSAgfF98X3wgIHxffHxffCAgXFxcXF9fLF98ICAgX3xfXy8gICBffF98XyAgIC9fXy9fICAgX3xffF8gICAvX18vXyAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgIHs9PT09PT18X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3wgXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAuL28tLTAwMFxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCcgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coYCVjICBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWwgUnVpeiBGb3JucyAgICAgICAgICAgICAgICAgIGAsIHN0eWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBzZXQgdGhlIHNhZmVndWFyZCB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzdGFydFNwaW5ueSgpIHtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZXJyID0+IHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShgPHN0cm9uZz4keyQuaTE4bignZmF0YWwtZXJyb3InKX08L3N0cm9uZz46XG4gICAgICAgICR7JC5pMThuKCdlcnJvci10aW1lZC1vdXQnKX1cbiAgICAgICAgJHskLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKX1cbiAgICAgIGAsICdlcnJvcicsIDApO1xuICAgIH0sIDIwICogMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBjbGVhciB0aGUgc2FmZWd1YXJkIHRpbWVvdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHN0b3BTcGlubnkoKSB7XG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBzcGFjZXMgd2l0aCB1bmRlcnNjb3Jlc1xuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlIG5hbWVzIHdpdGggdW5kZXJzY29yZXNcbiAgICovXG4gIHVuZGVyc2NvcmVQYWdlTmFtZXMocGFnZXMpIHtcbiAgICByZXR1cm4gcGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWdlKS5zY29yZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBocmVmcyBvZiBpbnRlci1hcHAgbGlua3MgdG8gbG9hZCBjdXJyZW50bHkgc2VsZWN0ZWQgcHJvamVjdFxuICAgKiBAcmV0dXJuIHtudWxsfSBudXR0aW4nXG4gICAqL1xuICB1cGRhdGVJbnRlckFwcExpbmtzKCkge1xuICAgICQoJy5pbnRlcmFwcC1saW5rJykuZWFjaCgoaSwgbGluaykgPT4ge1xuICAgICAgbGV0IHVybCA9IGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdO1xuXG4gICAgICBpZiAobGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2ludGVyYXBwLWxpbmstLXNpdGV2aWV3cycpKSB7XG4gICAgICAgIGxpbmsuaHJlZiA9IGAke3VybH0/c2l0ZXM9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLmhyZWYgPSBgJHt1cmx9P3Byb2plY3Q9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgYmFzaWMgcGFyYW1zIGFnYWluc3Qgd2hhdCBpcyBkZWZpbmVkIGluIHRoZSBjb25maWcsXG4gICAqICAgYW5kIGlmIHRoZXkgYXJlIGludmFsaWQgc2V0IHRoZSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbXMgYXMgZmV0Y2hlZCBieSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzYW1lIHBhcmFtcyB3aXRoIHNvbWUgaW52YWxpZCBwYXJhbWV0ZXJzIGNvcnJldGVkLCBhcyBuZWNlc3NhcnlcbiAgICovXG4gIHZhbGlkYXRlUGFyYW1zKHBhcmFtcykge1xuICAgIHRoaXMuY29uZmlnLnZhbGlkYXRlUGFyYW1zLmZvckVhY2gocGFyYW1LZXkgPT4ge1xuICAgICAgaWYgKHBhcmFtS2V5ID09PSAncHJvamVjdCcgJiYgcGFyYW1zLnByb2plY3QpIHtcbiAgICAgICAgcGFyYW1zLnByb2plY3QgPSBwYXJhbXMucHJvamVjdC5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmNvbmZpZy5kZWZhdWx0c1twYXJhbUtleV0sXG4gICAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbXNbcGFyYW1LZXldO1xuXG4gICAgICBpZiAoZGVmYXVsdFZhbHVlICYmICF0aGlzLmNvbmZpZy52YWxpZFBhcmFtc1twYXJhbUtleV0uaW5jbHVkZXMocGFyYW1WYWx1ZSkpIHtcbiAgICAgICAgLy8gb25seSB0aHJvdyBlcnJvciBpZiB0aGV5IHRyaWVkIHRvIHByb3ZpZGUgYW4gaW52YWxpZCB2YWx1ZVxuICAgICAgICBpZiAoISFwYXJhbVZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UocGFyYW1LZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zW3BhcmFtS2V5XSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBsaXN0ZW5lcnMgdG8gdGhlIHByb2plY3QgaW5wdXQgZm9yIHZhbGlkYXRpb25zIGFnYWluc3QgdGhlIHNpdGUgbWFwLFxuICAgKiAgIHJldmVydGluZyB0byB0aGUgb2xkIHZhbHVlIGlmIHRoZSBuZXcgb25lIGlzIGludmFsaWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbbXVsdGlsaW5ndWFsXSAtIHdoZXRoZXIgd2Ugc2hvdWxkIGNoZWNrIGlmIGl0IGlzIGEgbXVsdGlsaW5ndWFsIHByb2plY3RcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IHZhbGlkYXRpb25zIHBhc3NlZFxuICAgKi9cbiAgdmFsaWRhdGVQcm9qZWN0KG11bHRpbGluZ3VhbCA9IGZhbHNlKSB7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpWzBdO1xuICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdElucHV0LnZhbHVlLnJlcGxhY2UoL153d3dcXC4vLCAnJyksXG4gICAgICB2YWxpZCA9IGZhbHNlO1xuXG4gICAgaWYgKG11bHRpbGluZ3VhbCAmJiAhdGhpcy5pc011bHRpbGFuZ1Byb2plY3QoKSkge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1sYW5nLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgICAnd2FybmluZydcbiAgICAgICk7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdElucHV0LmRhdGFzZXQudmFsdWU7XG4gICAgfSBlbHNlIGlmIChzaXRlRG9tYWlucy5pbmNsdWRlcyhwcm9qZWN0KSkge1xuICAgICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgICB0aGlzLnVwZGF0ZUludGVyQXBwTGlua3MoKTtcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1wcm9qZWN0JywgYDxhIGhyZWY9Jy8vJHtwcm9qZWN0LmVzY2FwZSgpfSc+JHtwcm9qZWN0LmVzY2FwZSgpfTwvYT5gKSxcbiAgICAgICAgJ3dhcm5pbmcnXG4gICAgICApO1xuICAgICAgcHJvamVjdCA9IHByb2plY3RJbnB1dC5kYXRhc2V0LnZhbHVlO1xuICAgIH1cblxuICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IHByb2plY3Q7XG5cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICAvLyBGSVhNRTogcmVzdG9yZSB3cml0ZU1lc3NhZ2UgdG8gdGhlIHdheSBpdCB1c2VkIHRvIGJlLFxuICAvLyBhbmQgbWFrZSBhZGRTaXRlTm90aWNlIGRvIHRoZSB0b2FzdHIsIGFuZCBjaGFuZ2UgaW5zdGFuY2VzIG9mIHRoaXMud3JpdGVNZXNzYWdlXG4gIC8vIGFjY29yZGluZ2x5XG4gIC8qKlxuICAgKiBXcml0ZXMgbWVzc2FnZSBqdXN0IGJlbG93IHRoZSBjaGFydFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gd3JpdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXQgLSBudW0gc2Vjb25kcyB0byBzaG93XG4gICAqIEByZXR1cm5zIHtqUXVlcnl9IC0galF1ZXJ5IG9iamVjdCBvZiBtZXNzYWdlIGNvbnRhaW5lclxuICAgKi9cbiAgd3JpdGVNZXNzYWdlKG1lc3NhZ2UsIGxldmVsID0gJ3dhcm5pbmcnLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIHRvYXN0ci5vcHRpb25zLnRpbWVPdXQgPSB0aW1lb3V0O1xuICAgIHRvYXN0cltsZXZlbF0obWVzc2FnZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdjtcbiIsIi8qKlxuICogQGZpbGUgU2hhcmVkIGNvbmZpZyBhbW9uZ3N0IGFsbCBhcHBzXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmNvbnN0IHNpdGVNYXAgPSByZXF1aXJlKCcuL3NpdGVfbWFwJyk7XG5jb25zdCBzaXRlRG9tYWlucyA9IE9iamVjdC5rZXlzKHNpdGVNYXApLm1hcChrZXkgPT4gc2l0ZU1hcFtrZXldKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhbGwgUGFnZXZpZXdzIGFwcGxpY2F0aW9ucy5cbiAqIFNvbWUgcHJvcGVydGllcyBtYXkgYmUgb3ZlcnJpZGVuIGJ5IGFwcC1zcGVjaWZpYyBjb25maWdzXG4gKi9cbmNsYXNzIFB2Q29uZmlnIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGZvcm1hdFhBeGlzVGljayA9IHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG1vbWVudCh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0KS53ZWVrZGF5KCk7XG4gICAgICBpZiAoZGF5T2ZXZWVrICUgNykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYOKAoiAke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgYXBpTGltaXQ6IDUwMDAsXG4gICAgICBhcGlUaHJvdHRsZTogMjAsXG4gICAgICBhcHBzOiBbJ3BhZ2V2aWV3cycsICd0b3B2aWV3cycsICdsYW5ndmlld3MnLCAnc2l0ZXZpZXdzJywgJ21hc3N2aWV3cycsICdyZWRpcmVjdHZpZXdzJ10sXG4gICAgICBjaGFydENvbmZpZzoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXRZQXhpc051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwKScsXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Q29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Qm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4yKSxcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlclJhZGl1czogNSxcbiAgICAgICAgICAgICAgdGVuc2lvbjogc2VsZi5iZXppZXJDdXJ2ZSA9PT0gJ3RydWUnID8gMC40IDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0WUF4aXNOdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgYmFyUGVyY2VudGFnZTogMS4wLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5UGVyY2VudGFnZTogMC44NSxcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNiksXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOSksXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjc1KSxcbiAgICAgICAgICAgICAgaG92ZXJCb3JkZXJDb2xvcjogY29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByYWRhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4xKSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOCksXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyUmFkaXVzOiA1XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGllOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkb3VnaG51dDoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvbGFyQXJlYToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgYmVnaW5BdFplcm86IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC43KSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC45KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaXJjdWxhckNoYXJ0czogWydwaWUnLCAnZG91Z2hudXQnLCAncG9sYXJBcmVhJ10sXG4gICAgICBjb2xvcnM6IFsncmdiYSgxNzEsIDIxMiwgMjM1LCAxKScsICdyZ2JhKDE3OCwgMjIzLCAxMzgsIDEpJywgJ3JnYmEoMjUxLCAxNTQsIDE1MywgMSknLCAncmdiYSgyNTMsIDE5MSwgMTExLCAxKScsICdyZ2JhKDIwMiwgMTc4LCAyMTQsIDEpJywgJ3JnYmEoMjA3LCAxODIsIDEyOCwgMSknLCAncmdiYSgxNDEsIDIxMSwgMTk5LCAxKScsICdyZ2JhKDI1MiwgMjA1LCAyMjksIDEpJywgJ3JnYmEoMjU1LCAyNDcsIDE2MSwgMSknLCAncmdiYSgyMTcsIDIxNywgMjE3LCAxKSddLFxuICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAgICAgY2hhcnRUeXBlOiBudW1EYXRhc2V0cyA9PiBudW1EYXRhc2V0cyA+IDEgPyAnbGluZScgOiAnYmFyJyxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ1lZWVktTU0tREQnLFxuICAgICAgICBsb2NhbGl6ZURhdGVGb3JtYXQ6ICd0cnVlJyxcbiAgICAgICAgbnVtZXJpY2FsRm9ybWF0dGluZzogJ3RydWUnLFxuICAgICAgICBiZXppZXJDdXJ2ZTogJ2ZhbHNlJyxcbiAgICAgICAgYXV0b0xvZ0RldGVjdGlvbjogJ3RydWUnLFxuICAgICAgICBiZWdpbkF0WmVybzogJ2ZhbHNlJyxcbiAgICAgICAgcmVtZW1iZXJDaGFydDogJ3RydWUnLFxuICAgICAgICBhZ2VudDogJ3VzZXInLFxuICAgICAgICBwbGF0Zm9ybTogJ2FsbC1hY2Nlc3MnLFxuICAgICAgICBwcm9qZWN0OiAnZW4ud2lraXBlZGlhLm9yZydcbiAgICAgIH0sXG4gICAgICBnbG9iYWxDaGFydE9wdHM6IHtcbiAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFydCdcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXI6IHtcbiAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMFxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluZWFyQ2hhcnRzOiBbJ2xpbmUnLCAnYmFyJywgJ3JhZGFyJ10sXG4gICAgICBsaW5lYXJPcHRzOiB7XG4gICAgICAgIHNjYWxlczoge1xuICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChjaGFydC5kYXRhLmRhdGFzZXRzLCBzZWxmKVxuICAgICAgfSxcbiAgICAgIGRheXNBZ286IDIwLFxuICAgICAgbWluRGF0ZTogbW9tZW50KCcyMDE1LTA3LTAxJykuc3RhcnRPZignZGF5JyksXG4gICAgICBtYXhEYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgc3BlY2lhbFJhbmdlczoge1xuICAgICAgICAnbGFzdC13ZWVrJzogW21vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrJykuc3RhcnRPZignd2VlaycpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2VlaycpLmVuZE9mKCd3ZWVrJyldLFxuICAgICAgICAndGhpcy1tb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpXSxcbiAgICAgICAgJ2xhc3QtbW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuZW5kT2YoJ21vbnRoJyldLFxuICAgICAgICBsYXRlc3Qob2Zmc2V0ID0gc2VsZi5jb25maWcuZGF5c0Fnbykge1xuICAgICAgICAgIHJldHVybiBbbW9tZW50KCkuc3VidHJhY3Qob2Zmc2V0LCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLCBzZWxmLmNvbmZpZy5tYXhEYXRlXTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRpbWVzdGFtcEZvcm1hdDogJ1lZWVlNTUREMDAnLFxuICAgICAgdmFsaWRQYXJhbXM6IHtcbiAgICAgICAgYWdlbnQ6IFsnYWxsLWFnZW50cycsICd1c2VyJywgJ3NwaWRlcicsICdib3QnXSxcbiAgICAgICAgcGxhdGZvcm06IFsnYWxsLWFjY2VzcycsICdkZXNrdG9wJywgJ21vYmlsZS1hcHAnLCAnbW9iaWxlLXdlYiddLFxuICAgICAgICBwcm9qZWN0OiBzaXRlRG9tYWluc1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgbGluZWFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGU6ICdsYWJlbCcsXG4gICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgbGFiZWw6IHRvb2x0aXBJdGVtID0+IHtcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRvb2x0aXBJdGVtLnlMYWJlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnICcgKyAkLmkxOG4oJ3Vua25vd24nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcgJyArIHRoaXMuZm9ybWF0TnVtYmVyKHRvb2x0aXBJdGVtLnlMYWJlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGNpcmN1bGFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbDogKHRvb2x0aXBJdGVtLCBjaGFydEluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjaGFydEluc3RhbmNlLmRhdGFzZXRzW3Rvb2x0aXBJdGVtLmRhdGFzZXRJbmRleF0uZGF0YVt0b29sdGlwSXRlbS5pbmRleF0sXG4gICAgICAgICAgICBsYWJlbCA9IGNoYXJ0SW5zdGFuY2UubGFiZWxzW3Rvb2x0aXBJdGVtLmluZGV4XTtcblxuICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7bGFiZWx9OiAkeyQuaTE4bigndW5rbm93bicpfWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtsYWJlbH06ICR7dGhpcy5mb3JtYXROdW1iZXIodmFsdWUpfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHZDb25maWc7XG4iLCIvKipcbiAqIEBmaWxlIFdNRiBbc2l0ZSBtYXRyaXhdKGh0dHBzOi8vd3d3Lm1lZGlhd2lraS5vcmcvdy9hcGkucGhwP2FjdGlvbj1zaXRlbWF0cml4KSwgd2l0aCBzb21lIHVuc3VwcG9ydGVkIHdpa2lzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqIFNpdGVtYXRyaXggb2YgYWxsIHN1cHBvcnRlZCBXTUYgd2lraXNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IHNpdGVNYXAgPSB7XG4gICdhYXdpa2knOiAnYWEud2lraXBlZGlhLm9yZycsXG4gICdhYXdpa3Rpb25hcnknOiAnYWEud2lrdGlvbmFyeS5vcmcnLFxuICAnYWF3aWtpYm9va3MnOiAnYWEud2lraWJvb2tzLm9yZycsXG4gICdhYndpa2knOiAnYWIud2lraXBlZGlhLm9yZycsXG4gICdhYndpa3Rpb25hcnknOiAnYWIud2lrdGlvbmFyeS5vcmcnLFxuICAnYWNld2lraSc6ICdhY2Uud2lraXBlZGlhLm9yZycsXG4gICdhZHl3aWtpJzogJ2FkeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lraSc6ICdhZi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lrdGlvbmFyeSc6ICdhZi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhZndpa2lib29rcyc6ICdhZi53aWtpYm9va3Mub3JnJyxcbiAgJ2Fmd2lraXF1b3RlJzogJ2FmLndpa2lxdW90ZS5vcmcnLFxuICAnYWt3aWtpJzogJ2FrLndpa2lwZWRpYS5vcmcnLFxuICAnYWt3aWt0aW9uYXJ5JzogJ2FrLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Frd2lraWJvb2tzJzogJ2FrLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraSc6ICdhbHMud2lraXBlZGlhLm9yZycsXG4gICdhbHN3aWt0aW9uYXJ5JzogJ2Fscy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbHN3aWtpYm9va3MnOiAnYWxzLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraXF1b3RlJzogJ2Fscy53aWtpcXVvdGUub3JnJyxcbiAgJ2Ftd2lraSc6ICdhbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Ftd2lrdGlvbmFyeSc6ICdhbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbXdpa2lxdW90ZSc6ICdhbS53aWtpcXVvdGUub3JnJyxcbiAgJ2Fud2lraSc6ICdhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fud2lrdGlvbmFyeSc6ICdhbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbmd3aWtpJzogJ2FuZy53aWtpcGVkaWEub3JnJyxcbiAgJ2FuZ3dpa3Rpb25hcnknOiAnYW5nLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FuZ3dpa2lib29rcyc6ICdhbmcud2lraWJvb2tzLm9yZycsXG4gICdhbmd3aWtpcXVvdGUnOiAnYW5nLndpa2lxdW90ZS5vcmcnLFxuICAnYW5nd2lraXNvdXJjZSc6ICdhbmcud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpJzogJ2FyLndpa2lwZWRpYS5vcmcnLFxuICAnYXJ3aWt0aW9uYXJ5JzogJ2FyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fyd2lraWJvb2tzJzogJ2FyLndpa2lib29rcy5vcmcnLFxuICAnYXJ3aWtpbmV3cyc6ICdhci53aWtpbmV3cy5vcmcnLFxuICAnYXJ3aWtpcXVvdGUnOiAnYXIud2lraXF1b3RlLm9yZycsXG4gICdhcndpa2lzb3VyY2UnOiAnYXIud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpdmVyc2l0eSc6ICdhci53aWtpdmVyc2l0eS5vcmcnLFxuICAnYXJjd2lraSc6ICdhcmMud2lraXBlZGlhLm9yZycsXG4gICdhcnp3aWtpJzogJ2Fyei53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lraSc6ICdhcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lrdGlvbmFyeSc6ICdhcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhc3dpa2lib29rcyc6ICdhcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Fzd2lraXNvdXJjZSc6ICdhcy53aWtpc291cmNlLm9yZycsXG4gICdhc3R3aWtpJzogJ2FzdC53aWtpcGVkaWEub3JnJyxcbiAgJ2FzdHdpa3Rpb25hcnknOiAnYXN0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2FzdHdpa2lib29rcyc6ICdhc3Qud2lraWJvb2tzLm9yZycsXG4gICdhc3R3aWtpcXVvdGUnOiAnYXN0Lndpa2lxdW90ZS5vcmcnLFxuICAnYXZ3aWtpJzogJ2F2Lndpa2lwZWRpYS5vcmcnLFxuICAnYXZ3aWt0aW9uYXJ5JzogJ2F2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F5d2lraSc6ICdheS53aWtpcGVkaWEub3JnJyxcbiAgJ2F5d2lrdGlvbmFyeSc6ICdheS53aWt0aW9uYXJ5Lm9yZycsXG4gICdheXdpa2lib29rcyc6ICdheS53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraSc6ICdhei53aWtpcGVkaWEub3JnJyxcbiAgJ2F6d2lrdGlvbmFyeSc6ICdhei53aWt0aW9uYXJ5Lm9yZycsXG4gICdhendpa2lib29rcyc6ICdhei53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraXF1b3RlJzogJ2F6Lndpa2lxdW90ZS5vcmcnLFxuICAnYXp3aWtpc291cmNlJzogJ2F6Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2F6Yndpa2knOiAnYXpiLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpJzogJ2JhLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpYm9va3MnOiAnYmEud2lraWJvb2tzLm9yZycsXG4gICdiYXJ3aWtpJzogJ2Jhci53aWtpcGVkaWEub3JnJyxcbiAgJ2JhdF9zbWd3aWtpJzogJ2JhdC1zbWcud2lraXBlZGlhLm9yZycsXG4gICdiY2x3aWtpJzogJ2JjbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lraSc6ICdiZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lrdGlvbmFyeSc6ICdiZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdiZXdpa2lib29rcyc6ICdiZS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jld2lraXF1b3RlJzogJ2JlLndpa2lxdW90ZS5vcmcnLFxuICAnYmV3aWtpc291cmNlJzogJ2JlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2JlX3hfb2xkd2lraSc6ICdiZS10YXJhc2sud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa2knOiAnYmcud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa3Rpb25hcnknOiAnYmcud2lrdGlvbmFyeS5vcmcnLFxuICAnYmd3aWtpYm9va3MnOiAnYmcud2lraWJvb2tzLm9yZycsXG4gICdiZ3dpa2luZXdzJzogJ2JnLndpa2luZXdzLm9yZycsXG4gICdiZ3dpa2lxdW90ZSc6ICdiZy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jnd2lraXNvdXJjZSc6ICdiZy53aWtpc291cmNlLm9yZycsXG4gICdiaHdpa2knOiAnYmgud2lraXBlZGlhLm9yZycsXG4gICdiaHdpa3Rpb25hcnknOiAnYmgud2lrdGlvbmFyeS5vcmcnLFxuICAnYml3aWtpJzogJ2JpLndpa2lwZWRpYS5vcmcnLFxuICAnYml3aWt0aW9uYXJ5JzogJ2JpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jpd2lraWJvb2tzJzogJ2JpLndpa2lib29rcy5vcmcnLFxuICAnYmpud2lraSc6ICdiam4ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa2knOiAnYm0ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa3Rpb25hcnknOiAnYm0ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm13aWtpYm9va3MnOiAnYm0ud2lraWJvb2tzLm9yZycsXG4gICdibXdpa2lxdW90ZSc6ICdibS53aWtpcXVvdGUub3JnJyxcbiAgJ2Jud2lraSc6ICdibi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jud2lrdGlvbmFyeSc6ICdibi53aWt0aW9uYXJ5Lm9yZycsXG4gICdibndpa2lib29rcyc6ICdibi53aWtpYm9va3Mub3JnJyxcbiAgJ2Jud2lraXNvdXJjZSc6ICdibi53aWtpc291cmNlLm9yZycsXG4gICdib3dpa2knOiAnYm8ud2lraXBlZGlhLm9yZycsXG4gICdib3dpa3Rpb25hcnknOiAnYm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm93aWtpYm9va3MnOiAnYm8ud2lraWJvb2tzLm9yZycsXG4gICdicHl3aWtpJzogJ2JweS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lraSc6ICdici53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lrdGlvbmFyeSc6ICdici53aWt0aW9uYXJ5Lm9yZycsXG4gICdicndpa2lxdW90ZSc6ICdici53aWtpcXVvdGUub3JnJyxcbiAgJ2Jyd2lraXNvdXJjZSc6ICdici53aWtpc291cmNlLm9yZycsXG4gICdic3dpa2knOiAnYnMud2lraXBlZGlhLm9yZycsXG4gICdic3dpa3Rpb25hcnknOiAnYnMud2lrdGlvbmFyeS5vcmcnLFxuICAnYnN3aWtpYm9va3MnOiAnYnMud2lraWJvb2tzLm9yZycsXG4gICdic3dpa2luZXdzJzogJ2JzLndpa2luZXdzLm9yZycsXG4gICdic3dpa2lxdW90ZSc6ICdicy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jzd2lraXNvdXJjZSc6ICdicy53aWtpc291cmNlLm9yZycsXG4gICdidWd3aWtpJzogJ2J1Zy53aWtpcGVkaWEub3JnJyxcbiAgJ2J4cndpa2knOiAnYnhyLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWtpJzogJ2NhLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWt0aW9uYXJ5JzogJ2NhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nhd2lraWJvb2tzJzogJ2NhLndpa2lib29rcy5vcmcnLFxuICAnY2F3aWtpbmV3cyc6ICdjYS53aWtpbmV3cy5vcmcnLFxuICAnY2F3aWtpcXVvdGUnOiAnY2Eud2lraXF1b3RlLm9yZycsXG4gICdjYXdpa2lzb3VyY2UnOiAnY2Eud2lraXNvdXJjZS5vcmcnLFxuICAnY2JrX3phbXdpa2knOiAnY2JrLXphbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Nkb3dpa2knOiAnY2RvLndpa2lwZWRpYS5vcmcnLFxuICAnY2V3aWtpJzogJ2NlLndpa2lwZWRpYS5vcmcnLFxuICAnY2Vid2lraSc6ICdjZWIud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa2knOiAnY2gud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa3Rpb25hcnknOiAnY2gud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h3aWtpYm9va3MnOiAnY2gud2lraWJvb2tzLm9yZycsXG4gICdjaG93aWtpJzogJ2Noby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nocndpa2knOiAnY2hyLndpa2lwZWRpYS5vcmcnLFxuICAnY2hyd2lrdGlvbmFyeSc6ICdjaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h5d2lraSc6ICdjaHkud2lraXBlZGlhLm9yZycsXG4gICdja2J3aWtpJzogJ2NrYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lraSc6ICdjby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lrdGlvbmFyeSc6ICdjby53aWt0aW9uYXJ5Lm9yZycsXG4gICdjb3dpa2lib29rcyc6ICdjby53aWtpYm9va3Mub3JnJyxcbiAgJ2Nvd2lraXF1b3RlJzogJ2NvLndpa2lxdW90ZS5vcmcnLFxuICAnY3J3aWtpJzogJ2NyLndpa2lwZWRpYS5vcmcnLFxuICAnY3J3aWt0aW9uYXJ5JzogJ2NyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nyd2lraXF1b3RlJzogJ2NyLndpa2lxdW90ZS5vcmcnLFxuICAnY3Jod2lraSc6ICdjcmgud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa2knOiAnY3Mud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa3Rpb25hcnknOiAnY3Mud2lrdGlvbmFyeS5vcmcnLFxuICAnY3N3aWtpYm9va3MnOiAnY3Mud2lraWJvb2tzLm9yZycsXG4gICdjc3dpa2luZXdzJzogJ2NzLndpa2luZXdzLm9yZycsXG4gICdjc3dpa2lxdW90ZSc6ICdjcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Nzd2lraXNvdXJjZSc6ICdjcy53aWtpc291cmNlLm9yZycsXG4gICdjc3dpa2l2ZXJzaXR5JzogJ2NzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdjc2J3aWtpJzogJ2NzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2NzYndpa3Rpb25hcnknOiAnY3NiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2N1d2lraSc6ICdjdS53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraSc6ICdjdi53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraWJvb2tzJzogJ2N2Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpJzogJ2N5Lndpa2lwZWRpYS5vcmcnLFxuICAnY3l3aWt0aW9uYXJ5JzogJ2N5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2N5d2lraWJvb2tzJzogJ2N5Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpcXVvdGUnOiAnY3kud2lraXF1b3RlLm9yZycsXG4gICdjeXdpa2lzb3VyY2UnOiAnY3kud2lraXNvdXJjZS5vcmcnLFxuICAnZGF3aWtpJzogJ2RhLndpa2lwZWRpYS5vcmcnLFxuICAnZGF3aWt0aW9uYXJ5JzogJ2RhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rhd2lraWJvb2tzJzogJ2RhLndpa2lib29rcy5vcmcnLFxuICAnZGF3aWtpcXVvdGUnOiAnZGEud2lraXF1b3RlLm9yZycsXG4gICdkYXdpa2lzb3VyY2UnOiAnZGEud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpJzogJ2RlLndpa2lwZWRpYS5vcmcnLFxuICAnZGV3aWt0aW9uYXJ5JzogJ2RlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rld2lraWJvb2tzJzogJ2RlLndpa2lib29rcy5vcmcnLFxuICAnZGV3aWtpbmV3cyc6ICdkZS53aWtpbmV3cy5vcmcnLFxuICAnZGV3aWtpcXVvdGUnOiAnZGUud2lraXF1b3RlLm9yZycsXG4gICdkZXdpa2lzb3VyY2UnOiAnZGUud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpdmVyc2l0eSc6ICdkZS53aWtpdmVyc2l0eS5vcmcnLFxuICAnZGV3aWtpdm95YWdlJzogJ2RlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2RpcXdpa2knOiAnZGlxLndpa2lwZWRpYS5vcmcnLFxuICAnZHNid2lraSc6ICdkc2Iud2lraXBlZGlhLm9yZycsXG4gICdkdndpa2knOiAnZHYud2lraXBlZGlhLm9yZycsXG4gICdkdndpa3Rpb25hcnknOiAnZHYud2lrdGlvbmFyeS5vcmcnLFxuICAnZHp3aWtpJzogJ2R6Lndpa2lwZWRpYS5vcmcnLFxuICAnZHp3aWt0aW9uYXJ5JzogJ2R6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vld2lraSc6ICdlZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lraSc6ICdlbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lrdGlvbmFyeSc6ICdlbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbHdpa2lib29rcyc6ICdlbC53aWtpYm9va3Mub3JnJyxcbiAgJ2Vsd2lraW5ld3MnOiAnZWwud2lraW5ld3Mub3JnJyxcbiAgJ2Vsd2lraXF1b3RlJzogJ2VsLndpa2lxdW90ZS5vcmcnLFxuICAnZWx3aWtpc291cmNlJzogJ2VsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vsd2lraXZlcnNpdHknOiAnZWwud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vsd2lraXZveWFnZSc6ICdlbC53aWtpdm95YWdlLm9yZycsXG4gICdlbWx3aWtpJzogJ2VtbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lraSc6ICdlbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lrdGlvbmFyeSc6ICdlbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbndpa2lib29rcyc6ICdlbi53aWtpYm9va3Mub3JnJyxcbiAgJ2Vud2lraW5ld3MnOiAnZW4ud2lraW5ld3Mub3JnJyxcbiAgJ2Vud2lraXF1b3RlJzogJ2VuLndpa2lxdW90ZS5vcmcnLFxuICAnZW53aWtpc291cmNlJzogJ2VuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vud2lraXZlcnNpdHknOiAnZW4ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vud2lraXZveWFnZSc6ICdlbi53aWtpdm95YWdlLm9yZycsXG4gICdlb3dpa2knOiAnZW8ud2lraXBlZGlhLm9yZycsXG4gICdlb3dpa3Rpb25hcnknOiAnZW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnZW93aWtpYm9va3MnOiAnZW8ud2lraWJvb2tzLm9yZycsXG4gICdlb3dpa2luZXdzJzogJ2VvLndpa2luZXdzLm9yZycsXG4gICdlb3dpa2lxdW90ZSc6ICdlby53aWtpcXVvdGUub3JnJyxcbiAgJ2Vvd2lraXNvdXJjZSc6ICdlby53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2knOiAnZXMud2lraXBlZGlhLm9yZycsXG4gICdlc3dpa3Rpb25hcnknOiAnZXMud2lrdGlvbmFyeS5vcmcnLFxuICAnZXN3aWtpYm9va3MnOiAnZXMud2lraWJvb2tzLm9yZycsXG4gICdlc3dpa2luZXdzJzogJ2VzLndpa2luZXdzLm9yZycsXG4gICdlc3dpa2lxdW90ZSc6ICdlcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Vzd2lraXNvdXJjZSc6ICdlcy53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2l2ZXJzaXR5JzogJ2VzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlc3dpa2l2b3lhZ2UnOiAnZXMud2lraXZveWFnZS5vcmcnLFxuICAnZXR3aWtpJzogJ2V0Lndpa2lwZWRpYS5vcmcnLFxuICAnZXR3aWt0aW9uYXJ5JzogJ2V0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V0d2lraWJvb2tzJzogJ2V0Lndpa2lib29rcy5vcmcnLFxuICAnZXR3aWtpcXVvdGUnOiAnZXQud2lraXF1b3RlLm9yZycsXG4gICdldHdpa2lzb3VyY2UnOiAnZXQud2lraXNvdXJjZS5vcmcnLFxuICAnZXV3aWtpJzogJ2V1Lndpa2lwZWRpYS5vcmcnLFxuICAnZXV3aWt0aW9uYXJ5JzogJ2V1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V1d2lraWJvb2tzJzogJ2V1Lndpa2lib29rcy5vcmcnLFxuICAnZXV3aWtpcXVvdGUnOiAnZXUud2lraXF1b3RlLm9yZycsXG4gICdleHR3aWtpJzogJ2V4dC53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lraSc6ICdmYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lrdGlvbmFyeSc6ICdmYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmYXdpa2lib29rcyc6ICdmYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Zhd2lraW5ld3MnOiAnZmEud2lraW5ld3Mub3JnJyxcbiAgJ2Zhd2lraXF1b3RlJzogJ2ZhLndpa2lxdW90ZS5vcmcnLFxuICAnZmF3aWtpc291cmNlJzogJ2ZhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zhd2lraXZveWFnZSc6ICdmYS53aWtpdm95YWdlLm9yZycsXG4gICdmZndpa2knOiAnZmYud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa2knOiAnZmkud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa3Rpb25hcnknOiAnZmkud2lrdGlvbmFyeS5vcmcnLFxuICAnZml3aWtpYm9va3MnOiAnZmkud2lraWJvb2tzLm9yZycsXG4gICdmaXdpa2luZXdzJzogJ2ZpLndpa2luZXdzLm9yZycsXG4gICdmaXdpa2lxdW90ZSc6ICdmaS53aWtpcXVvdGUub3JnJyxcbiAgJ2Zpd2lraXNvdXJjZSc6ICdmaS53aWtpc291cmNlLm9yZycsXG4gICdmaXdpa2l2ZXJzaXR5JzogJ2ZpLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdmaXVfdnJvd2lraSc6ICdmaXUtdnJvLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWtpJzogJ2ZqLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWt0aW9uYXJ5JzogJ2ZqLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zvd2lraSc6ICdmby53aWtpcGVkaWEub3JnJyxcbiAgJ2Zvd2lrdGlvbmFyeSc6ICdmby53aWt0aW9uYXJ5Lm9yZycsXG4gICdmb3dpa2lzb3VyY2UnOiAnZm8ud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpJzogJ2ZyLndpa2lwZWRpYS5vcmcnLFxuICAnZnJ3aWt0aW9uYXJ5JzogJ2ZyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zyd2lraWJvb2tzJzogJ2ZyLndpa2lib29rcy5vcmcnLFxuICAnZnJ3aWtpbmV3cyc6ICdmci53aWtpbmV3cy5vcmcnLFxuICAnZnJ3aWtpcXVvdGUnOiAnZnIud2lraXF1b3RlLm9yZycsXG4gICdmcndpa2lzb3VyY2UnOiAnZnIud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpdmVyc2l0eSc6ICdmci53aWtpdmVyc2l0eS5vcmcnLFxuICAnZnJ3aWtpdm95YWdlJzogJ2ZyLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2ZycHdpa2knOiAnZnJwLndpa2lwZWRpYS5vcmcnLFxuICAnZnJyd2lraSc6ICdmcnIud2lraXBlZGlhLm9yZycsXG4gICdmdXJ3aWtpJzogJ2Z1ci53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lraSc6ICdmeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lrdGlvbmFyeSc6ICdmeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmeXdpa2lib29rcyc6ICdmeS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraSc6ICdnYS53aWtpcGVkaWEub3JnJyxcbiAgJ2dhd2lrdGlvbmFyeSc6ICdnYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdnYXdpa2lib29rcyc6ICdnYS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraXF1b3RlJzogJ2dhLndpa2lxdW90ZS5vcmcnLFxuICAnZ2Fnd2lraSc6ICdnYWcud2lraXBlZGlhLm9yZycsXG4gICdnYW53aWtpJzogJ2dhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lraSc6ICdnZC53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lrdGlvbmFyeSc6ICdnZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbHdpa2knOiAnZ2wud2lraXBlZGlhLm9yZycsXG4gICdnbHdpa3Rpb25hcnknOiAnZ2wud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2x3aWtpYm9va3MnOiAnZ2wud2lraWJvb2tzLm9yZycsXG4gICdnbHdpa2lxdW90ZSc6ICdnbC53aWtpcXVvdGUub3JnJyxcbiAgJ2dsd2lraXNvdXJjZSc6ICdnbC53aWtpc291cmNlLm9yZycsXG4gICdnbGt3aWtpJzogJ2dsay53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lraSc6ICdnbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lrdGlvbmFyeSc6ICdnbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbndpa2lib29rcyc6ICdnbi53aWtpYm9va3Mub3JnJyxcbiAgJ2dvbXdpa2knOiAnZ29tLndpa2lwZWRpYS5vcmcnLFxuICAnZ290d2lraSc6ICdnb3Qud2lraXBlZGlhLm9yZycsXG4gICdnb3R3aWtpYm9va3MnOiAnZ290Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpJzogJ2d1Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3V3aWt0aW9uYXJ5JzogJ2d1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2d1d2lraWJvb2tzJzogJ2d1Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpcXVvdGUnOiAnZ3Uud2lraXF1b3RlLm9yZycsXG4gICdndXdpa2lzb3VyY2UnOiAnZ3Uud2lraXNvdXJjZS5vcmcnLFxuICAnZ3Z3aWtpJzogJ2d2Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3Z3aWt0aW9uYXJ5JzogJ2d2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2hhd2lraSc6ICdoYS53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd2lrdGlvbmFyeSc6ICdoYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoYWt3aWtpJzogJ2hhay53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd3dpa2knOiAnaGF3Lndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWtpJzogJ2hlLndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWt0aW9uYXJ5JzogJ2hlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hld2lraWJvb2tzJzogJ2hlLndpa2lib29rcy5vcmcnLFxuICAnaGV3aWtpbmV3cyc6ICdoZS53aWtpbmV3cy5vcmcnLFxuICAnaGV3aWtpcXVvdGUnOiAnaGUud2lraXF1b3RlLm9yZycsXG4gICdoZXdpa2lzb3VyY2UnOiAnaGUud2lraXNvdXJjZS5vcmcnLFxuICAnaGV3aWtpdm95YWdlJzogJ2hlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2hpd2lraSc6ICdoaS53aWtpcGVkaWEub3JnJyxcbiAgJ2hpd2lrdGlvbmFyeSc6ICdoaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoaXdpa2lib29rcyc6ICdoaS53aWtpYm9va3Mub3JnJyxcbiAgJ2hpd2lraXF1b3RlJzogJ2hpLndpa2lxdW90ZS5vcmcnLFxuICAnaGlmd2lraSc6ICdoaWYud2lraXBlZGlhLm9yZycsXG4gICdob3dpa2knOiAnaG8ud2lraXBlZGlhLm9yZycsXG4gICdocndpa2knOiAnaHIud2lraXBlZGlhLm9yZycsXG4gICdocndpa3Rpb25hcnknOiAnaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnaHJ3aWtpYm9va3MnOiAnaHIud2lraWJvb2tzLm9yZycsXG4gICdocndpa2lxdW90ZSc6ICdoci53aWtpcXVvdGUub3JnJyxcbiAgJ2hyd2lraXNvdXJjZSc6ICdoci53aWtpc291cmNlLm9yZycsXG4gICdoc2J3aWtpJzogJ2hzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2hzYndpa3Rpb25hcnknOiAnaHNiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2h0d2lraSc6ICdodC53aWtpcGVkaWEub3JnJyxcbiAgJ2h0d2lraXNvdXJjZSc6ICdodC53aWtpc291cmNlLm9yZycsXG4gICdodXdpa2knOiAnaHUud2lraXBlZGlhLm9yZycsXG4gICdodXdpa3Rpb25hcnknOiAnaHUud2lrdGlvbmFyeS5vcmcnLFxuICAnaHV3aWtpYm9va3MnOiAnaHUud2lraWJvb2tzLm9yZycsXG4gICdodXdpa2luZXdzJzogJ2h1Lndpa2luZXdzLm9yZycsXG4gICdodXdpa2lxdW90ZSc6ICdodS53aWtpcXVvdGUub3JnJyxcbiAgJ2h1d2lraXNvdXJjZSc6ICdodS53aWtpc291cmNlLm9yZycsXG4gICdoeXdpa2knOiAnaHkud2lraXBlZGlhLm9yZycsXG4gICdoeXdpa3Rpb25hcnknOiAnaHkud2lrdGlvbmFyeS5vcmcnLFxuICAnaHl3aWtpYm9va3MnOiAnaHkud2lraWJvb2tzLm9yZycsXG4gICdoeXdpa2lxdW90ZSc6ICdoeS53aWtpcXVvdGUub3JnJyxcbiAgJ2h5d2lraXNvdXJjZSc6ICdoeS53aWtpc291cmNlLm9yZycsXG4gICdoendpa2knOiAnaHoud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa2knOiAnaWEud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa3Rpb25hcnknOiAnaWEud2lrdGlvbmFyeS5vcmcnLFxuICAnaWF3aWtpYm9va3MnOiAnaWEud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2knOiAnaWQud2lraXBlZGlhLm9yZycsXG4gICdpZHdpa3Rpb25hcnknOiAnaWQud2lrdGlvbmFyeS5vcmcnLFxuICAnaWR3aWtpYm9va3MnOiAnaWQud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2lxdW90ZSc6ICdpZC53aWtpcXVvdGUub3JnJyxcbiAgJ2lkd2lraXNvdXJjZSc6ICdpZC53aWtpc291cmNlLm9yZycsXG4gICdpZXdpa2knOiAnaWUud2lraXBlZGlhLm9yZycsXG4gICdpZXdpa3Rpb25hcnknOiAnaWUud2lrdGlvbmFyeS5vcmcnLFxuICAnaWV3aWtpYm9va3MnOiAnaWUud2lraWJvb2tzLm9yZycsXG4gICdpZ3dpa2knOiAnaWcud2lraXBlZGlhLm9yZycsXG4gICdpaXdpa2knOiAnaWkud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa2knOiAnaWsud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa3Rpb25hcnknOiAnaWsud2lrdGlvbmFyeS5vcmcnLFxuICAnaWxvd2lraSc6ICdpbG8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa2knOiAnaW8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa3Rpb25hcnknOiAnaW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnaXN3aWtpJzogJ2lzLndpa2lwZWRpYS5vcmcnLFxuICAnaXN3aWt0aW9uYXJ5JzogJ2lzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lzd2lraWJvb2tzJzogJ2lzLndpa2lib29rcy5vcmcnLFxuICAnaXN3aWtpcXVvdGUnOiAnaXMud2lraXF1b3RlLm9yZycsXG4gICdpc3dpa2lzb3VyY2UnOiAnaXMud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpJzogJ2l0Lndpa2lwZWRpYS5vcmcnLFxuICAnaXR3aWt0aW9uYXJ5JzogJ2l0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2l0d2lraWJvb2tzJzogJ2l0Lndpa2lib29rcy5vcmcnLFxuICAnaXR3aWtpbmV3cyc6ICdpdC53aWtpbmV3cy5vcmcnLFxuICAnaXR3aWtpcXVvdGUnOiAnaXQud2lraXF1b3RlLm9yZycsXG4gICdpdHdpa2lzb3VyY2UnOiAnaXQud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpdmVyc2l0eSc6ICdpdC53aWtpdmVyc2l0eS5vcmcnLFxuICAnaXR3aWtpdm95YWdlJzogJ2l0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2l1d2lraSc6ICdpdS53aWtpcGVkaWEub3JnJyxcbiAgJ2l1d2lrdGlvbmFyeSc6ICdpdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdqYXdpa2knOiAnamEud2lraXBlZGlhLm9yZycsXG4gICdqYXdpa3Rpb25hcnknOiAnamEud2lrdGlvbmFyeS5vcmcnLFxuICAnamF3aWtpYm9va3MnOiAnamEud2lraWJvb2tzLm9yZycsXG4gICdqYXdpa2luZXdzJzogJ2phLndpa2luZXdzLm9yZycsXG4gICdqYXdpa2lxdW90ZSc6ICdqYS53aWtpcXVvdGUub3JnJyxcbiAgJ2phd2lraXNvdXJjZSc6ICdqYS53aWtpc291cmNlLm9yZycsXG4gICdqYXdpa2l2ZXJzaXR5JzogJ2phLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdqYm93aWtpJzogJ2piby53aWtpcGVkaWEub3JnJyxcbiAgJ2pib3dpa3Rpb25hcnknOiAnamJvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2p2d2lraSc6ICdqdi53aWtpcGVkaWEub3JnJyxcbiAgJ2p2d2lrdGlvbmFyeSc6ICdqdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrYXdpa2knOiAna2Eud2lraXBlZGlhLm9yZycsXG4gICdrYXdpa3Rpb25hcnknOiAna2Eud2lrdGlvbmFyeS5vcmcnLFxuICAna2F3aWtpYm9va3MnOiAna2Eud2lraWJvb2tzLm9yZycsXG4gICdrYXdpa2lxdW90ZSc6ICdrYS53aWtpcXVvdGUub3JnJyxcbiAgJ2thYXdpa2knOiAna2FhLndpa2lwZWRpYS5vcmcnLFxuICAna2Fid2lraSc6ICdrYWIud2lraXBlZGlhLm9yZycsXG4gICdrYmR3aWtpJzogJ2tiZC53aWtpcGVkaWEub3JnJyxcbiAgJ2tnd2lraSc6ICdrZy53aWtpcGVkaWEub3JnJyxcbiAgJ2tpd2lraSc6ICdraS53aWtpcGVkaWEub3JnJyxcbiAgJ2tqd2lraSc6ICdrai53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lraSc6ICdray53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lrdGlvbmFyeSc6ICdray53aWt0aW9uYXJ5Lm9yZycsXG4gICdra3dpa2lib29rcyc6ICdray53aWtpYm9va3Mub3JnJyxcbiAgJ2trd2lraXF1b3RlJzogJ2trLndpa2lxdW90ZS5vcmcnLFxuICAna2x3aWtpJzogJ2tsLndpa2lwZWRpYS5vcmcnLFxuICAna2x3aWt0aW9uYXJ5JzogJ2tsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2ttd2lraSc6ICdrbS53aWtpcGVkaWEub3JnJyxcbiAgJ2ttd2lrdGlvbmFyeSc6ICdrbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbXdpa2lib29rcyc6ICdrbS53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraSc6ICdrbi53aWtpcGVkaWEub3JnJyxcbiAgJ2tud2lrdGlvbmFyeSc6ICdrbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbndpa2lib29rcyc6ICdrbi53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraXF1b3RlJzogJ2tuLndpa2lxdW90ZS5vcmcnLFxuICAna253aWtpc291cmNlJzogJ2tuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraSc6ICdrby53aWtpcGVkaWEub3JnJyxcbiAgJ2tvd2lrdGlvbmFyeSc6ICdrby53aWt0aW9uYXJ5Lm9yZycsXG4gICdrb3dpa2lib29rcyc6ICdrby53aWtpYm9va3Mub3JnJyxcbiAgJ2tvd2lraW5ld3MnOiAna28ud2lraW5ld3Mub3JnJyxcbiAgJ2tvd2lraXF1b3RlJzogJ2tvLndpa2lxdW90ZS5vcmcnLFxuICAna293aWtpc291cmNlJzogJ2tvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraXZlcnNpdHknOiAna28ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2tvaXdpa2knOiAna29pLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpJzogJ2tyLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpcXVvdGUnOiAna3Iud2lraXF1b3RlLm9yZycsXG4gICdrcmN3aWtpJzogJ2tyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lraSc6ICdrcy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lrdGlvbmFyeSc6ICdrcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrc3dpa2lib29rcyc6ICdrcy53aWtpYm9va3Mub3JnJyxcbiAgJ2tzd2lraXF1b3RlJzogJ2tzLndpa2lxdW90ZS5vcmcnLFxuICAna3Nod2lraSc6ICdrc2gud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa2knOiAna3Uud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa3Rpb25hcnknOiAna3Uud2lrdGlvbmFyeS5vcmcnLFxuICAna3V3aWtpYm9va3MnOiAna3Uud2lraWJvb2tzLm9yZycsXG4gICdrdXdpa2lxdW90ZSc6ICdrdS53aWtpcXVvdGUub3JnJyxcbiAgJ2t2d2lraSc6ICdrdi53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lraSc6ICdrdy53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lrdGlvbmFyeSc6ICdrdy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrd3dpa2lxdW90ZSc6ICdrdy53aWtpcXVvdGUub3JnJyxcbiAgJ2t5d2lraSc6ICdreS53aWtpcGVkaWEub3JnJyxcbiAgJ2t5d2lrdGlvbmFyeSc6ICdreS53aWt0aW9uYXJ5Lm9yZycsXG4gICdreXdpa2lib29rcyc6ICdreS53aWtpYm9va3Mub3JnJyxcbiAgJ2t5d2lraXF1b3RlJzogJ2t5Lndpa2lxdW90ZS5vcmcnLFxuICAnbGF3aWtpJzogJ2xhLndpa2lwZWRpYS5vcmcnLFxuICAnbGF3aWt0aW9uYXJ5JzogJ2xhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xhd2lraWJvb2tzJzogJ2xhLndpa2lib29rcy5vcmcnLFxuICAnbGF3aWtpcXVvdGUnOiAnbGEud2lraXF1b3RlLm9yZycsXG4gICdsYXdpa2lzb3VyY2UnOiAnbGEud2lraXNvdXJjZS5vcmcnLFxuICAnbGFkd2lraSc6ICdsYWQud2lraXBlZGlhLm9yZycsXG4gICdsYndpa2knOiAnbGIud2lraXBlZGlhLm9yZycsXG4gICdsYndpa3Rpb25hcnknOiAnbGIud2lrdGlvbmFyeS5vcmcnLFxuICAnbGJ3aWtpYm9va3MnOiAnbGIud2lraWJvb2tzLm9yZycsXG4gICdsYndpa2lxdW90ZSc6ICdsYi53aWtpcXVvdGUub3JnJyxcbiAgJ2xiZXdpa2knOiAnbGJlLndpa2lwZWRpYS5vcmcnLFxuICAnbGV6d2lraSc6ICdsZXoud2lraXBlZGlhLm9yZycsXG4gICdsZ3dpa2knOiAnbGcud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa2knOiAnbGkud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa3Rpb25hcnknOiAnbGkud2lrdGlvbmFyeS5vcmcnLFxuICAnbGl3aWtpYm9va3MnOiAnbGkud2lraWJvb2tzLm9yZycsXG4gICdsaXdpa2lxdW90ZSc6ICdsaS53aWtpcXVvdGUub3JnJyxcbiAgJ2xpd2lraXNvdXJjZSc6ICdsaS53aWtpc291cmNlLm9yZycsXG4gICdsaWp3aWtpJzogJ2xpai53aWtpcGVkaWEub3JnJyxcbiAgJ2xtb3dpa2knOiAnbG1vLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWtpJzogJ2xuLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWt0aW9uYXJ5JzogJ2xuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xud2lraWJvb2tzJzogJ2xuLndpa2lib29rcy5vcmcnLFxuICAnbG93aWtpJzogJ2xvLndpa2lwZWRpYS5vcmcnLFxuICAnbG93aWt0aW9uYXJ5JzogJ2xvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xyY3dpa2knOiAnbHJjLndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWtpJzogJ2x0Lndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWt0aW9uYXJ5JzogJ2x0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2x0d2lraWJvb2tzJzogJ2x0Lndpa2lib29rcy5vcmcnLFxuICAnbHR3aWtpcXVvdGUnOiAnbHQud2lraXF1b3RlLm9yZycsXG4gICdsdHdpa2lzb3VyY2UnOiAnbHQud2lraXNvdXJjZS5vcmcnLFxuICAnbHRnd2lraSc6ICdsdGcud2lraXBlZGlhLm9yZycsXG4gICdsdndpa2knOiAnbHYud2lraXBlZGlhLm9yZycsXG4gICdsdndpa3Rpb25hcnknOiAnbHYud2lrdGlvbmFyeS5vcmcnLFxuICAnbHZ3aWtpYm9va3MnOiAnbHYud2lraWJvb2tzLm9yZycsXG4gICdtYWl3aWtpJzogJ21haS53aWtpcGVkaWEub3JnJyxcbiAgJ21hcF9ibXN3aWtpJzogJ21hcC1ibXMud2lraXBlZGlhLm9yZycsXG4gICdtZGZ3aWtpJzogJ21kZi53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lraSc6ICdtZy53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lrdGlvbmFyeSc6ICdtZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtZ3dpa2lib29rcyc6ICdtZy53aWtpYm9va3Mub3JnJyxcbiAgJ21od2lraSc6ICdtaC53aWtpcGVkaWEub3JnJyxcbiAgJ21od2lrdGlvbmFyeSc6ICdtaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaHJ3aWtpJzogJ21oci53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lraSc6ICdtaS53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lrdGlvbmFyeSc6ICdtaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaXdpa2lib29rcyc6ICdtaS53aWtpYm9va3Mub3JnJyxcbiAgJ21pbndpa2knOiAnbWluLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWtpJzogJ21rLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWt0aW9uYXJ5JzogJ21rLndpa3Rpb25hcnkub3JnJyxcbiAgJ21rd2lraWJvb2tzJzogJ21rLndpa2lib29rcy5vcmcnLFxuICAnbWt3aWtpc291cmNlJzogJ21rLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21sd2lraSc6ICdtbC53aWtpcGVkaWEub3JnJyxcbiAgJ21sd2lrdGlvbmFyeSc6ICdtbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbHdpa2lib29rcyc6ICdtbC53aWtpYm9va3Mub3JnJyxcbiAgJ21sd2lraXF1b3RlJzogJ21sLndpa2lxdW90ZS5vcmcnLFxuICAnbWx3aWtpc291cmNlJzogJ21sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21ud2lraSc6ICdtbi53aWtpcGVkaWEub3JnJyxcbiAgJ21ud2lrdGlvbmFyeSc6ICdtbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbndpa2lib29rcyc6ICdtbi53aWtpYm9va3Mub3JnJyxcbiAgJ21vd2lraSc6ICdtby53aWtpcGVkaWEub3JnJyxcbiAgJ21vd2lrdGlvbmFyeSc6ICdtby53aWt0aW9uYXJ5Lm9yZycsXG4gICdtcndpa2knOiAnbXIud2lraXBlZGlhLm9yZycsXG4gICdtcndpa3Rpb25hcnknOiAnbXIud2lrdGlvbmFyeS5vcmcnLFxuICAnbXJ3aWtpYm9va3MnOiAnbXIud2lraWJvb2tzLm9yZycsXG4gICdtcndpa2lxdW90ZSc6ICdtci53aWtpcXVvdGUub3JnJyxcbiAgJ21yd2lraXNvdXJjZSc6ICdtci53aWtpc291cmNlLm9yZycsXG4gICdtcmp3aWtpJzogJ21yai53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lraSc6ICdtcy53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lrdGlvbmFyeSc6ICdtcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtc3dpa2lib29rcyc6ICdtcy53aWtpYm9va3Mub3JnJyxcbiAgJ210d2lraSc6ICdtdC53aWtpcGVkaWEub3JnJyxcbiAgJ210d2lrdGlvbmFyeSc6ICdtdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtdXN3aWtpJzogJ211cy53aWtpcGVkaWEub3JnJyxcbiAgJ213bHdpa2knOiAnbXdsLndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWtpJzogJ215Lndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWt0aW9uYXJ5JzogJ215Lndpa3Rpb25hcnkub3JnJyxcbiAgJ215d2lraWJvb2tzJzogJ215Lndpa2lib29rcy5vcmcnLFxuICAnbXl2d2lraSc6ICdteXYud2lraXBlZGlhLm9yZycsXG4gICdtem53aWtpJzogJ216bi53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lraSc6ICduYS53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lrdGlvbmFyeSc6ICduYS53aWt0aW9uYXJ5Lm9yZycsXG4gICduYXdpa2lib29rcyc6ICduYS53aWtpYm9va3Mub3JnJyxcbiAgJ25hd2lraXF1b3RlJzogJ25hLndpa2lxdW90ZS5vcmcnLFxuICAnbmFod2lraSc6ICduYWgud2lraXBlZGlhLm9yZycsXG4gICduYWh3aWt0aW9uYXJ5JzogJ25haC53aWt0aW9uYXJ5Lm9yZycsXG4gICduYWh3aWtpYm9va3MnOiAnbmFoLndpa2lib29rcy5vcmcnLFxuICAnbmFwd2lraSc6ICduYXAud2lraXBlZGlhLm9yZycsXG4gICduZHN3aWtpJzogJ25kcy53aWtpcGVkaWEub3JnJyxcbiAgJ25kc3dpa3Rpb25hcnknOiAnbmRzLndpa3Rpb25hcnkub3JnJyxcbiAgJ25kc3dpa2lib29rcyc6ICduZHMud2lraWJvb2tzLm9yZycsXG4gICduZHN3aWtpcXVvdGUnOiAnbmRzLndpa2lxdW90ZS5vcmcnLFxuICAnbmRzX25sd2lraSc6ICduZHMtbmwud2lraXBlZGlhLm9yZycsXG4gICduZXdpa2knOiAnbmUud2lraXBlZGlhLm9yZycsXG4gICduZXdpa3Rpb25hcnknOiAnbmUud2lrdGlvbmFyeS5vcmcnLFxuICAnbmV3aWtpYm9va3MnOiAnbmUud2lraWJvb2tzLm9yZycsXG4gICduZXd3aWtpJzogJ25ldy53aWtpcGVkaWEub3JnJyxcbiAgJ25nd2lraSc6ICduZy53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lraSc6ICdubC53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lrdGlvbmFyeSc6ICdubC53aWt0aW9uYXJ5Lm9yZycsXG4gICdubHdpa2lib29rcyc6ICdubC53aWtpYm9va3Mub3JnJyxcbiAgJ25sd2lraW5ld3MnOiAnbmwud2lraW5ld3Mub3JnJyxcbiAgJ25sd2lraXF1b3RlJzogJ25sLndpa2lxdW90ZS5vcmcnLFxuICAnbmx3aWtpc291cmNlJzogJ25sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ25sd2lraXZveWFnZSc6ICdubC53aWtpdm95YWdlLm9yZycsXG4gICdubndpa2knOiAnbm4ud2lraXBlZGlhLm9yZycsXG4gICdubndpa3Rpb25hcnknOiAnbm4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm53aWtpcXVvdGUnOiAnbm4ud2lraXF1b3RlLm9yZycsXG4gICdub3dpa2knOiAnbm8ud2lraXBlZGlhLm9yZycsXG4gICdub3dpa3Rpb25hcnknOiAnbm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm93aWtpYm9va3MnOiAnbm8ud2lraWJvb2tzLm9yZycsXG4gICdub3dpa2luZXdzJzogJ25vLndpa2luZXdzLm9yZycsXG4gICdub3dpa2lxdW90ZSc6ICduby53aWtpcXVvdGUub3JnJyxcbiAgJ25vd2lraXNvdXJjZSc6ICduby53aWtpc291cmNlLm9yZycsXG4gICdub3Z3aWtpJzogJ25vdi53aWtpcGVkaWEub3JnJyxcbiAgJ25ybXdpa2knOiAnbnJtLndpa2lwZWRpYS5vcmcnLFxuICAnbnNvd2lraSc6ICduc28ud2lraXBlZGlhLm9yZycsXG4gICdudndpa2knOiAnbnYud2lraXBlZGlhLm9yZycsXG4gICdueXdpa2knOiAnbnkud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa2knOiAnb2Mud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa3Rpb25hcnknOiAnb2Mud2lrdGlvbmFyeS5vcmcnLFxuICAnb2N3aWtpYm9va3MnOiAnb2Mud2lraWJvb2tzLm9yZycsXG4gICdvbXdpa2knOiAnb20ud2lraXBlZGlhLm9yZycsXG4gICdvbXdpa3Rpb25hcnknOiAnb20ud2lrdGlvbmFyeS5vcmcnLFxuICAnb3J3aWtpJzogJ29yLndpa2lwZWRpYS5vcmcnLFxuICAnb3J3aWt0aW9uYXJ5JzogJ29yLndpa3Rpb25hcnkub3JnJyxcbiAgJ29yd2lraXNvdXJjZSc6ICdvci53aWtpc291cmNlLm9yZycsXG4gICdvc3dpa2knOiAnb3Mud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa2knOiAncGEud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa3Rpb25hcnknOiAncGEud2lrdGlvbmFyeS5vcmcnLFxuICAncGF3aWtpYm9va3MnOiAncGEud2lraWJvb2tzLm9yZycsXG4gICdwYWd3aWtpJzogJ3BhZy53aWtpcGVkaWEub3JnJyxcbiAgJ3BhbXdpa2knOiAncGFtLndpa2lwZWRpYS5vcmcnLFxuICAncGFwd2lraSc6ICdwYXAud2lraXBlZGlhLm9yZycsXG4gICdwY2R3aWtpJzogJ3BjZC53aWtpcGVkaWEub3JnJyxcbiAgJ3BkY3dpa2knOiAncGRjLndpa2lwZWRpYS5vcmcnLFxuICAncGZsd2lraSc6ICdwZmwud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa2knOiAncGkud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa3Rpb25hcnknOiAncGkud2lrdGlvbmFyeS5vcmcnLFxuICAncGlod2lraSc6ICdwaWgud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa2knOiAncGwud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa3Rpb25hcnknOiAncGwud2lrdGlvbmFyeS5vcmcnLFxuICAncGx3aWtpYm9va3MnOiAncGwud2lraWJvb2tzLm9yZycsXG4gICdwbHdpa2luZXdzJzogJ3BsLndpa2luZXdzLm9yZycsXG4gICdwbHdpa2lxdW90ZSc6ICdwbC53aWtpcXVvdGUub3JnJyxcbiAgJ3Bsd2lraXNvdXJjZSc6ICdwbC53aWtpc291cmNlLm9yZycsXG4gICdwbHdpa2l2b3lhZ2UnOiAncGwud2lraXZveWFnZS5vcmcnLFxuICAncG1zd2lraSc6ICdwbXMud2lraXBlZGlhLm9yZycsXG4gICdwbmJ3aWtpJzogJ3BuYi53aWtpcGVkaWEub3JnJyxcbiAgJ3BuYndpa3Rpb25hcnknOiAncG5iLndpa3Rpb25hcnkub3JnJyxcbiAgJ3BudHdpa2knOiAncG50Lndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWtpJzogJ3BzLndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWt0aW9uYXJ5JzogJ3BzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bzd2lraWJvb2tzJzogJ3BzLndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpJzogJ3B0Lndpa2lwZWRpYS5vcmcnLFxuICAncHR3aWt0aW9uYXJ5JzogJ3B0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3B0d2lraWJvb2tzJzogJ3B0Lndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpbmV3cyc6ICdwdC53aWtpbmV3cy5vcmcnLFxuICAncHR3aWtpcXVvdGUnOiAncHQud2lraXF1b3RlLm9yZycsXG4gICdwdHdpa2lzb3VyY2UnOiAncHQud2lraXNvdXJjZS5vcmcnLFxuICAncHR3aWtpdmVyc2l0eSc6ICdwdC53aWtpdmVyc2l0eS5vcmcnLFxuICAncHR3aWtpdm95YWdlJzogJ3B0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3F1d2lraSc6ICdxdS53aWtpcGVkaWEub3JnJyxcbiAgJ3F1d2lrdGlvbmFyeSc6ICdxdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdxdXdpa2lib29rcyc6ICdxdS53aWtpYm9va3Mub3JnJyxcbiAgJ3F1d2lraXF1b3RlJzogJ3F1Lndpa2lxdW90ZS5vcmcnLFxuICAncm13aWtpJzogJ3JtLndpa2lwZWRpYS5vcmcnLFxuICAncm13aWt0aW9uYXJ5JzogJ3JtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jtd2lraWJvb2tzJzogJ3JtLndpa2lib29rcy5vcmcnLFxuICAncm15d2lraSc6ICdybXkud2lraXBlZGlhLm9yZycsXG4gICdybndpa2knOiAncm4ud2lraXBlZGlhLm9yZycsXG4gICdybndpa3Rpb25hcnknOiAncm4ud2lrdGlvbmFyeS5vcmcnLFxuICAncm93aWtpJzogJ3JvLndpa2lwZWRpYS5vcmcnLFxuICAncm93aWt0aW9uYXJ5JzogJ3JvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jvd2lraWJvb2tzJzogJ3JvLndpa2lib29rcy5vcmcnLFxuICAncm93aWtpbmV3cyc6ICdyby53aWtpbmV3cy5vcmcnLFxuICAncm93aWtpcXVvdGUnOiAncm8ud2lraXF1b3RlLm9yZycsXG4gICdyb3dpa2lzb3VyY2UnOiAncm8ud2lraXNvdXJjZS5vcmcnLFxuICAncm93aWtpdm95YWdlJzogJ3JvLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3JvYV9ydXB3aWtpJzogJ3JvYS1ydXAud2lraXBlZGlhLm9yZycsXG4gICdyb2FfcnVwd2lrdGlvbmFyeSc6ICdyb2EtcnVwLndpa3Rpb25hcnkub3JnJyxcbiAgJ3JvYV90YXJhd2lraSc6ICdyb2EtdGFyYS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lraSc6ICdydS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lrdGlvbmFyeSc6ICdydS53aWt0aW9uYXJ5Lm9yZycsXG4gICdydXdpa2lib29rcyc6ICdydS53aWtpYm9va3Mub3JnJyxcbiAgJ3J1d2lraW5ld3MnOiAncnUud2lraW5ld3Mub3JnJyxcbiAgJ3J1d2lraXF1b3RlJzogJ3J1Lndpa2lxdW90ZS5vcmcnLFxuICAncnV3aWtpc291cmNlJzogJ3J1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3J1d2lraXZlcnNpdHknOiAncnUud2lraXZlcnNpdHkub3JnJyxcbiAgJ3J1d2lraXZveWFnZSc6ICdydS53aWtpdm95YWdlLm9yZycsXG4gICdydWV3aWtpJzogJ3J1ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lraSc6ICdydy53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lrdGlvbmFyeSc6ICdydy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzYXdpa2knOiAnc2Eud2lraXBlZGlhLm9yZycsXG4gICdzYXdpa3Rpb25hcnknOiAnc2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnc2F3aWtpYm9va3MnOiAnc2Eud2lraWJvb2tzLm9yZycsXG4gICdzYXdpa2lxdW90ZSc6ICdzYS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nhd2lraXNvdXJjZSc6ICdzYS53aWtpc291cmNlLm9yZycsXG4gICdzYWh3aWtpJzogJ3NhaC53aWtpcGVkaWEub3JnJyxcbiAgJ3NhaHdpa2lzb3VyY2UnOiAnc2FoLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Njd2lraSc6ICdzYy53aWtpcGVkaWEub3JnJyxcbiAgJ3Njd2lrdGlvbmFyeSc6ICdzYy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzY253aWtpJzogJ3Njbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Njbndpa3Rpb25hcnknOiAnc2NuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Njb3dpa2knOiAnc2NvLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWtpJzogJ3NkLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWt0aW9uYXJ5JzogJ3NkLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nkd2lraW5ld3MnOiAnc2Qud2lraW5ld3Mub3JnJyxcbiAgJ3Nld2lraSc6ICdzZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nld2lraWJvb2tzJzogJ3NlLndpa2lib29rcy5vcmcnLFxuICAnc2d3aWtpJzogJ3NnLndpa2lwZWRpYS5vcmcnLFxuICAnc2d3aWt0aW9uYXJ5JzogJ3NnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nod2lraSc6ICdzaC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nod2lrdGlvbmFyeSc6ICdzaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaXdpa2knOiAnc2kud2lraXBlZGlhLm9yZycsXG4gICdzaXdpa3Rpb25hcnknOiAnc2kud2lrdGlvbmFyeS5vcmcnLFxuICAnc2l3aWtpYm9va3MnOiAnc2kud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpJzogJ3NpbXBsZS53aWtpcGVkaWEub3JnJyxcbiAgJ3NpbXBsZXdpa3Rpb25hcnknOiAnc2ltcGxlLndpa3Rpb25hcnkub3JnJyxcbiAgJ3NpbXBsZXdpa2lib29rcyc6ICdzaW1wbGUud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpcXVvdGUnOiAnc2ltcGxlLndpa2lxdW90ZS5vcmcnLFxuICAnc2t3aWtpJzogJ3NrLndpa2lwZWRpYS5vcmcnLFxuICAnc2t3aWt0aW9uYXJ5JzogJ3NrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nrd2lraWJvb2tzJzogJ3NrLndpa2lib29rcy5vcmcnLFxuICAnc2t3aWtpcXVvdGUnOiAnc2sud2lraXF1b3RlLm9yZycsXG4gICdza3dpa2lzb3VyY2UnOiAnc2sud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpJzogJ3NsLndpa2lwZWRpYS5vcmcnLFxuICAnc2x3aWt0aW9uYXJ5JzogJ3NsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nsd2lraWJvb2tzJzogJ3NsLndpa2lib29rcy5vcmcnLFxuICAnc2x3aWtpcXVvdGUnOiAnc2wud2lraXF1b3RlLm9yZycsXG4gICdzbHdpa2lzb3VyY2UnOiAnc2wud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpdmVyc2l0eSc6ICdzbC53aWtpdmVyc2l0eS5vcmcnLFxuICAnc213aWtpJzogJ3NtLndpa2lwZWRpYS5vcmcnLFxuICAnc213aWt0aW9uYXJ5JzogJ3NtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nud2lraSc6ICdzbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nud2lrdGlvbmFyeSc6ICdzbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzb3dpa2knOiAnc28ud2lraXBlZGlhLm9yZycsXG4gICdzb3dpa3Rpb25hcnknOiAnc28ud2lrdGlvbmFyeS5vcmcnLFxuICAnc3F3aWtpJzogJ3NxLndpa2lwZWRpYS5vcmcnLFxuICAnc3F3aWt0aW9uYXJ5JzogJ3NxLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nxd2lraWJvb2tzJzogJ3NxLndpa2lib29rcy5vcmcnLFxuICAnc3F3aWtpbmV3cyc6ICdzcS53aWtpbmV3cy5vcmcnLFxuICAnc3F3aWtpcXVvdGUnOiAnc3Eud2lraXF1b3RlLm9yZycsXG4gICdzcndpa2knOiAnc3Iud2lraXBlZGlhLm9yZycsXG4gICdzcndpa3Rpb25hcnknOiAnc3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnc3J3aWtpYm9va3MnOiAnc3Iud2lraWJvb2tzLm9yZycsXG4gICdzcndpa2luZXdzJzogJ3NyLndpa2luZXdzLm9yZycsXG4gICdzcndpa2lxdW90ZSc6ICdzci53aWtpcXVvdGUub3JnJyxcbiAgJ3Nyd2lraXNvdXJjZSc6ICdzci53aWtpc291cmNlLm9yZycsXG4gICdzcm53aWtpJzogJ3Nybi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lraSc6ICdzcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lrdGlvbmFyeSc6ICdzcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdHdpa2knOiAnc3Qud2lraXBlZGlhLm9yZycsXG4gICdzdHdpa3Rpb25hcnknOiAnc3Qud2lrdGlvbmFyeS5vcmcnLFxuICAnc3Rxd2lraSc6ICdzdHEud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa2knOiAnc3Uud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa3Rpb25hcnknOiAnc3Uud2lrdGlvbmFyeS5vcmcnLFxuICAnc3V3aWtpYm9va3MnOiAnc3Uud2lraWJvb2tzLm9yZycsXG4gICdzdXdpa2lxdW90ZSc6ICdzdS53aWtpcXVvdGUub3JnJyxcbiAgJ3N2d2lraSc6ICdzdi53aWtpcGVkaWEub3JnJyxcbiAgJ3N2d2lrdGlvbmFyeSc6ICdzdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdndpa2lib29rcyc6ICdzdi53aWtpYm9va3Mub3JnJyxcbiAgJ3N2d2lraW5ld3MnOiAnc3Yud2lraW5ld3Mub3JnJyxcbiAgJ3N2d2lraXF1b3RlJzogJ3N2Lndpa2lxdW90ZS5vcmcnLFxuICAnc3Z3aWtpc291cmNlJzogJ3N2Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3N2d2lraXZlcnNpdHknOiAnc3Yud2lraXZlcnNpdHkub3JnJyxcbiAgJ3N2d2lraXZveWFnZSc6ICdzdi53aWtpdm95YWdlLm9yZycsXG4gICdzd3dpa2knOiAnc3cud2lraXBlZGlhLm9yZycsXG4gICdzd3dpa3Rpb25hcnknOiAnc3cud2lrdGlvbmFyeS5vcmcnLFxuICAnc3d3aWtpYm9va3MnOiAnc3cud2lraWJvb2tzLm9yZycsXG4gICdzemx3aWtpJzogJ3N6bC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lraSc6ICd0YS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lrdGlvbmFyeSc6ICd0YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0YXdpa2lib29rcyc6ICd0YS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rhd2lraW5ld3MnOiAndGEud2lraW5ld3Mub3JnJyxcbiAgJ3Rhd2lraXF1b3RlJzogJ3RhLndpa2lxdW90ZS5vcmcnLFxuICAndGF3aWtpc291cmNlJzogJ3RhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rld2lraSc6ICd0ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rld2lrdGlvbmFyeSc6ICd0ZS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0ZXdpa2lib29rcyc6ICd0ZS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rld2lraXF1b3RlJzogJ3RlLndpa2lxdW90ZS5vcmcnLFxuICAndGV3aWtpc291cmNlJzogJ3RlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3RldHdpa2knOiAndGV0Lndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWtpJzogJ3RnLndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWt0aW9uYXJ5JzogJ3RnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rnd2lraWJvb2tzJzogJ3RnLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpJzogJ3RoLndpa2lwZWRpYS5vcmcnLFxuICAndGh3aWt0aW9uYXJ5JzogJ3RoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rod2lraWJvb2tzJzogJ3RoLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpbmV3cyc6ICd0aC53aWtpbmV3cy5vcmcnLFxuICAndGh3aWtpcXVvdGUnOiAndGgud2lraXF1b3RlLm9yZycsXG4gICd0aHdpa2lzb3VyY2UnOiAndGgud2lraXNvdXJjZS5vcmcnLFxuICAndGl3aWtpJzogJ3RpLndpa2lwZWRpYS5vcmcnLFxuICAndGl3aWt0aW9uYXJ5JzogJ3RpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rrd2lraSc6ICd0ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Rrd2lrdGlvbmFyeSc6ICd0ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd0a3dpa2lib29rcyc6ICd0ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Rrd2lraXF1b3RlJzogJ3RrLndpa2lxdW90ZS5vcmcnLFxuICAndGx3aWtpJzogJ3RsLndpa2lwZWRpYS5vcmcnLFxuICAndGx3aWt0aW9uYXJ5JzogJ3RsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rsd2lraWJvb2tzJzogJ3RsLndpa2lib29rcy5vcmcnLFxuICAndG53aWtpJzogJ3RuLndpa2lwZWRpYS5vcmcnLFxuICAndG53aWt0aW9uYXJ5JzogJ3RuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rvd2lraSc6ICd0by53aWtpcGVkaWEub3JnJyxcbiAgJ3Rvd2lrdGlvbmFyeSc6ICd0by53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cGl3aWtpJzogJ3RwaS53aWtpcGVkaWEub3JnJyxcbiAgJ3RwaXdpa3Rpb25hcnknOiAndHBpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Ryd2lraSc6ICd0ci53aWtpcGVkaWEub3JnJyxcbiAgJ3Ryd2lrdGlvbmFyeSc6ICd0ci53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cndpa2lib29rcyc6ICd0ci53aWtpYm9va3Mub3JnJyxcbiAgJ3Ryd2lraW5ld3MnOiAndHIud2lraW5ld3Mub3JnJyxcbiAgJ3Ryd2lraXF1b3RlJzogJ3RyLndpa2lxdW90ZS5vcmcnLFxuICAndHJ3aWtpc291cmNlJzogJ3RyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rzd2lraSc6ICd0cy53aWtpcGVkaWEub3JnJyxcbiAgJ3Rzd2lrdGlvbmFyeSc6ICd0cy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0dHdpa2knOiAndHQud2lraXBlZGlhLm9yZycsXG4gICd0dHdpa3Rpb25hcnknOiAndHQud2lrdGlvbmFyeS5vcmcnLFxuICAndHR3aWtpYm9va3MnOiAndHQud2lraWJvb2tzLm9yZycsXG4gICd0dHdpa2lxdW90ZSc6ICd0dC53aWtpcXVvdGUub3JnJyxcbiAgJ3R1bXdpa2knOiAndHVtLndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWtpJzogJ3R3Lndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWt0aW9uYXJ5JzogJ3R3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3R5d2lraSc6ICd0eS53aWtpcGVkaWEub3JnJyxcbiAgJ3R5dndpa2knOiAndHl2Lndpa2lwZWRpYS5vcmcnLFxuICAndWRtd2lraSc6ICd1ZG0ud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa2knOiAndWcud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa3Rpb25hcnknOiAndWcud2lrdGlvbmFyeS5vcmcnLFxuICAndWd3aWtpYm9va3MnOiAndWcud2lraWJvb2tzLm9yZycsXG4gICd1Z3dpa2lxdW90ZSc6ICd1Zy53aWtpcXVvdGUub3JnJyxcbiAgJ3Vrd2lraSc6ICd1ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Vrd2lrdGlvbmFyeSc6ICd1ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd1a3dpa2lib29rcyc6ICd1ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Vrd2lraW5ld3MnOiAndWsud2lraW5ld3Mub3JnJyxcbiAgJ3Vrd2lraXF1b3RlJzogJ3VrLndpa2lxdW90ZS5vcmcnLFxuICAndWt3aWtpc291cmNlJzogJ3VrLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Vrd2lraXZveWFnZSc6ICd1ay53aWtpdm95YWdlLm9yZycsXG4gICd1cndpa2knOiAndXIud2lraXBlZGlhLm9yZycsXG4gICd1cndpa3Rpb25hcnknOiAndXIud2lrdGlvbmFyeS5vcmcnLFxuICAndXJ3aWtpYm9va3MnOiAndXIud2lraWJvb2tzLm9yZycsXG4gICd1cndpa2lxdW90ZSc6ICd1ci53aWtpcXVvdGUub3JnJyxcbiAgJ3V6d2lraSc6ICd1ei53aWtpcGVkaWEub3JnJyxcbiAgJ3V6d2lrdGlvbmFyeSc6ICd1ei53aWt0aW9uYXJ5Lm9yZycsXG4gICd1endpa2lib29rcyc6ICd1ei53aWtpYm9va3Mub3JnJyxcbiAgJ3V6d2lraXF1b3RlJzogJ3V6Lndpa2lxdW90ZS5vcmcnLFxuICAndmV3aWtpJzogJ3ZlLndpa2lwZWRpYS5vcmcnLFxuICAndmVjd2lraSc6ICd2ZWMud2lraXBlZGlhLm9yZycsXG4gICd2ZWN3aWt0aW9uYXJ5JzogJ3ZlYy53aWt0aW9uYXJ5Lm9yZycsXG4gICd2ZWN3aWtpc291cmNlJzogJ3ZlYy53aWtpc291cmNlLm9yZycsXG4gICd2ZXB3aWtpJzogJ3ZlcC53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lraSc6ICd2aS53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lrdGlvbmFyeSc6ICd2aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd2aXdpa2lib29rcyc6ICd2aS53aWtpYm9va3Mub3JnJyxcbiAgJ3Zpd2lraXF1b3RlJzogJ3ZpLndpa2lxdW90ZS5vcmcnLFxuICAndml3aWtpc291cmNlJzogJ3ZpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Zpd2lraXZveWFnZSc6ICd2aS53aWtpdm95YWdlLm9yZycsXG4gICd2bHN3aWtpJzogJ3Zscy53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lraSc6ICd2by53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lrdGlvbmFyeSc6ICd2by53aWt0aW9uYXJ5Lm9yZycsXG4gICd2b3dpa2lib29rcyc6ICd2by53aWtpYm9va3Mub3JnJyxcbiAgJ3Zvd2lraXF1b3RlJzogJ3ZvLndpa2lxdW90ZS5vcmcnLFxuICAnd2F3aWtpJzogJ3dhLndpa2lwZWRpYS5vcmcnLFxuICAnd2F3aWt0aW9uYXJ5JzogJ3dhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3dhd2lraWJvb2tzJzogJ3dhLndpa2lib29rcy5vcmcnLFxuICAnd2Fyd2lraSc6ICd3YXIud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa2knOiAnd28ud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa3Rpb25hcnknOiAnd28ud2lrdGlvbmFyeS5vcmcnLFxuICAnd293aWtpcXVvdGUnOiAnd28ud2lraXF1b3RlLm9yZycsXG4gICd3dXV3aWtpJzogJ3d1dS53aWtpcGVkaWEub3JnJyxcbiAgJ3hhbHdpa2knOiAneGFsLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWtpJzogJ3hoLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWt0aW9uYXJ5JzogJ3hoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3hod2lraWJvb2tzJzogJ3hoLndpa2lib29rcy5vcmcnLFxuICAneG1md2lraSc6ICd4bWYud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa2knOiAneWkud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa3Rpb25hcnknOiAneWkud2lrdGlvbmFyeS5vcmcnLFxuICAneWl3aWtpc291cmNlJzogJ3lpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3lvd2lraSc6ICd5by53aWtpcGVkaWEub3JnJyxcbiAgJ3lvd2lrdGlvbmFyeSc6ICd5by53aWt0aW9uYXJ5Lm9yZycsXG4gICd5b3dpa2lib29rcyc6ICd5by53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraSc6ICd6YS53aWtpcGVkaWEub3JnJyxcbiAgJ3phd2lrdGlvbmFyeSc6ICd6YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd6YXdpa2lib29rcyc6ICd6YS53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraXF1b3RlJzogJ3phLndpa2lxdW90ZS5vcmcnLFxuICAnemVhd2lraSc6ICd6ZWEud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa2knOiAnemgud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa3Rpb25hcnknOiAnemgud2lrdGlvbmFyeS5vcmcnLFxuICAnemh3aWtpYm9va3MnOiAnemgud2lraWJvb2tzLm9yZycsXG4gICd6aHdpa2luZXdzJzogJ3poLndpa2luZXdzLm9yZycsXG4gICd6aHdpa2lxdW90ZSc6ICd6aC53aWtpcXVvdGUub3JnJyxcbiAgJ3pod2lraXNvdXJjZSc6ICd6aC53aWtpc291cmNlLm9yZycsXG4gICd6aHdpa2l2b3lhZ2UnOiAnemgud2lraXZveWFnZS5vcmcnLFxuICAnemhfY2xhc3NpY2Fsd2lraSc6ICd6aC1jbGFzc2ljYWwud2lraXBlZGlhLm9yZycsXG4gICd6aF9taW5fbmFud2lraSc6ICd6aC1taW4tbmFuLndpa2lwZWRpYS5vcmcnLFxuICAnemhfbWluX25hbndpa3Rpb25hcnknOiAnemgtbWluLW5hbi53aWt0aW9uYXJ5Lm9yZycsXG4gICd6aF9taW5fbmFud2lraWJvb2tzJzogJ3poLW1pbi1uYW4ud2lraWJvb2tzLm9yZycsXG4gICd6aF9taW5fbmFud2lraXF1b3RlJzogJ3poLW1pbi1uYW4ud2lraXF1b3RlLm9yZycsXG4gICd6aF9taW5fbmFud2lraXNvdXJjZSc6ICd6aC1taW4tbmFuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3poX3l1ZXdpa2knOiAnemgteXVlLndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWtpJzogJ3p1Lndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWt0aW9uYXJ5JzogJ3p1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3p1d2lraWJvb2tzJzogJ3p1Lndpa2lib29rcy5vcmcnLFxuICAnYWR2aXNvcnl3aWtpJzogJ2Fkdmlzb3J5Lndpa2ltZWRpYS5vcmcnLFxuICAnYXJ3aWtpbWVkaWEnOiAnYXIud2lraW1lZGlhLm9yZycsXG4gICdhcmJjb21fZGV3aWtpJzogJ2FyYmNvbS1kZS53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9lbndpa2knOiAnYXJiY29tLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX2Zpd2lraSc6ICdhcmJjb20tZmkud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fbmx3aWtpJzogJ2FyYmNvbS1ubC53aWtpcGVkaWEub3JnJyxcbiAgJ2F1ZGl0Y29td2lraSc6ICdhdWRpdGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2Jkd2lraW1lZGlhJzogJ2JkLndpa2ltZWRpYS5vcmcnLFxuICAnYmV3aWtpbWVkaWEnOiAnYmUud2lraW1lZGlhLm9yZycsXG4gICdiZXRhd2lraXZlcnNpdHknOiAnYmV0YS53aWtpdmVyc2l0eS5vcmcnLFxuICAnYm9hcmR3aWtpJzogJ2JvYXJkLndpa2ltZWRpYS5vcmcnLFxuICAnYm9hcmRnb3Zjb213aWtpJzogJ2JvYXJkZ292Y29tLndpa2ltZWRpYS5vcmcnLFxuICAnYnJ3aWtpbWVkaWEnOiAnYnIud2lraW1lZGlhLm9yZycsXG4gICdjYXdpa2ltZWRpYSc6ICdjYS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYWlyd2lraSc6ICdjaGFpci53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYXBjb213aWtpJzogJ2FmZmNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoZWNrdXNlcndpa2knOiAnY2hlY2t1c2VyLndpa2ltZWRpYS5vcmcnLFxuICAnY253aWtpbWVkaWEnOiAnY24ud2lraW1lZGlhLm9yZycsXG4gICdjb3dpa2ltZWRpYSc6ICdjby53aWtpbWVkaWEub3JnJyxcbiAgJ2NvbGxhYndpa2knOiAnY29sbGFiLndpa2ltZWRpYS5vcmcnLFxuICAnY29tbW9uc3dpa2knOiAnY29tbW9ucy53aWtpbWVkaWEub3JnJyxcbiAgJ2Rrd2lraW1lZGlhJzogJ2RrLndpa2ltZWRpYS5vcmcnLFxuICAnZG9uYXRld2lraSc6ICdkb25hdGUud2lraW1lZGlhLm9yZycsXG4gICdldHdpa2ltZWRpYSc6ICdlZS53aWtpbWVkaWEub3JnJyxcbiAgJ2V4ZWN3aWtpJzogJ2V4ZWMud2lraW1lZGlhLm9yZycsXG4gICdmZGN3aWtpJzogJ2ZkYy53aWtpbWVkaWEub3JnJyxcbiAgJ2Zpd2lraW1lZGlhJzogJ2ZpLndpa2ltZWRpYS5vcmcnLFxuICAnZm91bmRhdGlvbndpa2knOiAnd2lraW1lZGlhZm91bmRhdGlvbi5vcmcnLFxuICAnZ3JhbnRzd2lraSc6ICdncmFudHMud2lraW1lZGlhLm9yZycsXG4gICdpZWdjb213aWtpJzogJ2llZ2NvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2lsd2lraW1lZGlhJzogJ2lsLndpa2ltZWRpYS5vcmcnLFxuICAnaW5jdWJhdG9yd2lraSc6ICdpbmN1YmF0b3Iud2lraW1lZGlhLm9yZycsXG4gICdpbnRlcm5hbHdpa2knOiAnaW50ZXJuYWwud2lraW1lZGlhLm9yZycsXG4gICdsYWJzd2lraSc6ICd3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xhYnRlc3R3aWtpJzogJ2xhYnRlc3R3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xlZ2FsdGVhbXdpa2knOiAnbGVnYWx0ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAnbG9naW53aWtpJzogJ2xvZ2luLndpa2ltZWRpYS5vcmcnLFxuICAnbWVkaWF3aWtpd2lraSc6ICdtZWRpYXdpa2kub3JnJyxcbiAgJ21ldGF3aWtpJzogJ21ldGEud2lraW1lZGlhLm9yZycsXG4gICdta3dpa2ltZWRpYSc6ICdtay53aWtpbWVkaWEub3JnJyxcbiAgJ21vdmVtZW50cm9sZXN3aWtpJzogJ21vdmVtZW50cm9sZXMud2lraW1lZGlhLm9yZycsXG4gICdteHdpa2ltZWRpYSc6ICdteC53aWtpbWVkaWEub3JnJyxcbiAgJ25sd2lraW1lZGlhJzogJ25sLndpa2ltZWRpYS5vcmcnLFxuICAnbm93aWtpbWVkaWEnOiAnbm8ud2lraW1lZGlhLm9yZycsXG4gICdub2JvYXJkX2NoYXB0ZXJzd2lraW1lZGlhJzogJ25vYm9hcmQtY2hhcHRlcnMud2lraW1lZGlhLm9yZycsXG4gICdub3N0YWxnaWF3aWtpJzogJ25vc3RhbGdpYS53aWtpcGVkaWEub3JnJyxcbiAgJ255Y3dpa2ltZWRpYSc6ICdueWMud2lraW1lZGlhLm9yZycsXG4gICduendpa2ltZWRpYSc6ICduei53aWtpbWVkaWEub3JnJyxcbiAgJ29mZmljZXdpa2knOiAnb2ZmaWNlLndpa2ltZWRpYS5vcmcnLFxuICAnb21idWRzbWVud2lraSc6ICdvbWJ1ZHNtZW4ud2lraW1lZGlhLm9yZycsXG4gICdvdHJzX3dpa2l3aWtpJzogJ290cnMtd2lraS53aWtpbWVkaWEub3JnJyxcbiAgJ291dHJlYWNod2lraSc6ICdvdXRyZWFjaC53aWtpbWVkaWEub3JnJyxcbiAgJ3BhX3Vzd2lraW1lZGlhJzogJ3BhLXVzLndpa2ltZWRpYS5vcmcnLFxuICAncGx3aWtpbWVkaWEnOiAncGwud2lraW1lZGlhLm9yZycsXG4gICdxdWFsaXR5d2lraSc6ICdxdWFsaXR5Lndpa2ltZWRpYS5vcmcnLFxuICAncnN3aWtpbWVkaWEnOiAncnMud2lraW1lZGlhLm9yZycsXG4gICdydXdpa2ltZWRpYSc6ICdydS53aWtpbWVkaWEub3JnJyxcbiAgJ3Nld2lraW1lZGlhJzogJ3NlLndpa2ltZWRpYS5vcmcnLFxuICAnc2VhcmNoY29td2lraSc6ICdzZWFyY2hjb20ud2lraW1lZGlhLm9yZycsXG4gICdzb3VyY2Vzd2lraSc6ICd3aWtpc291cmNlLm9yZycsXG4gICdzcGNvbXdpa2knOiAnc3Bjb20ud2lraW1lZGlhLm9yZycsXG4gICdzcGVjaWVzd2lraSc6ICdzcGVjaWVzLndpa2ltZWRpYS5vcmcnLFxuICAnc3Rld2FyZHdpa2knOiAnc3Rld2FyZC53aWtpbWVkaWEub3JnJyxcbiAgJ3N0cmF0ZWd5d2lraSc6ICdzdHJhdGVneS53aWtpbWVkaWEub3JnJyxcbiAgJ3Rlbndpa2knOiAndGVuLndpa2lwZWRpYS5vcmcnLFxuICAndGVzdHdpa2knOiAndGVzdC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3Qyd2lraSc6ICd0ZXN0Mi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3R3aWtpZGF0YXdpa2knOiAndGVzdC53aWtpZGF0YS5vcmcnLFxuICAndHJ3aWtpbWVkaWEnOiAndHIud2lraW1lZGlhLm9yZycsXG4gICd0cmFuc2l0aW9udGVhbXdpa2knOiAndHJhbnNpdGlvbnRlYW0ud2lraW1lZGlhLm9yZycsXG4gICd1YXdpa2ltZWRpYSc6ICd1YS53aWtpbWVkaWEub3JnJyxcbiAgJ3Vrd2lraW1lZGlhJzogJ3VrLndpa2ltZWRpYS5vcmcnLFxuICAndXNhYmlsaXR5d2lraSc6ICd1c2FiaWxpdHkud2lraW1lZGlhLm9yZycsXG4gICd2b3Rld2lraSc6ICd2b3RlLndpa2ltZWRpYS5vcmcnLFxuICAnd2dfZW53aWtpJzogJ3dnLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnd2lraWRhdGF3aWtpJzogJ3dpa2lkYXRhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA1d2lraSc6ICd3aWtpbWFuaWEyMDA1Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwNndpa2knOiAnd2lraW1hbmlhMjAwNi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDd3aWtpJzogJ3dpa2ltYW5pYTIwMDcud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA4d2lraSc6ICd3aWtpbWFuaWEyMDA4Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwOXdpa2knOiAnd2lraW1hbmlhMjAwOS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTB3aWtpJzogJ3dpa2ltYW5pYTIwMTAud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDExd2lraSc6ICd3aWtpbWFuaWEyMDExLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMndpa2knOiAnd2lraW1hbmlhMjAxMi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTN3aWtpJzogJ3dpa2ltYW5pYTIwMTMud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE0d2lraSc6ICd3aWtpbWFuaWEyMDE0Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNXdpa2knOiAnd2lraW1hbmlhMjAxNS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTZ3aWtpJzogJ3dpa2ltYW5pYTIwMTYud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE3d2lraSc6ICd3aWtpbWFuaWEyMDE3Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhdGVhbXdpa2knOiAnd2lraW1hbmlhdGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ3plcm93aWtpJzogJ3plcm8ud2lraW1lZGlhLm9yZydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2l0ZU1hcDtcbiJdfQ==
