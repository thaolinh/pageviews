(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @file Configuration for Massviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

/**
 * Configuration for Massviews application.
 * This includes selectors, defaults, and other constants specific to Massviews
 * @type {Object}
 */
var config = {
  agentSelector: '#agent_select',
  chart: '.aqs-chart',
  dateLimit: 31, // num days
  dateRangeSelector: '#range_input',
  defaults: {
    dateRange: 'latest-20',
    project: 'en.wikipedia.org',
    sort: 'views',
    source: 'category',
    sourceProject: '',
    direction: 1,
    outputData: [],
    hadFailure: false,
    total: 0,
    view: 'list',
    subjectpage: 0
  },
  linearLegend: function linearLegend(datasets, scope) {
    return '<strong>' + $.i18n('totals') + ':</strong> ' + scope.formatNumber(scope.outputData.sum) + '\n      (' + scope.formatNumber(Math.round(scope.outputData.average)) + '/' + $.i18n('day') + ')';
  },
  logarithmicCheckbox: '.logarithmic-scale-option',
  sources: {
    category: {
      placeholder: 'https://en.wikipedia.org/wiki/Category:Folk_musicians_from_New_York',
      descriptionParams: function descriptionParams() {
        return ['<a target=\'_blank\' href=\'https://www.mediawiki.org/wiki/Special:MyLanguage/Help:Categories\'>' + $.i18n('category').toLowerCase() + '</a>'];
      },
      type: 'text'
    },
    wikilinks: {
      placeholder: 'https://en.wikipedia.org/wiki/Book:New_York_City',
      descriptionParams: function descriptionParams() {
        return ['https://www.mediawiki.org/wiki/Special:MyLanguage/Help:Wikilinks'];
      },
      type: 'text'
    },
    pagepile: {
      placeholder: '12345',
      descriptionParams: function descriptionParams() {
        return ["<a target='_blank' href='//tools.wmflabs.org/pagepile'>PagePile</a>"];
      },
      type: 'number'
    },
    subpages: {
      placeholder: 'https://en.wikipedia.org/wiki/User:Example',
      descriptionParams: function descriptionParams() {
        return ['<a target=\'_blank\' href=\'https://www.mediawiki.org/wiki/Special:MyLanguage/Help:Subpages\'>' + $.i18n('subpages').toLowerCase() + '</a>'];
      },
      type: 'text'
    },
    transclusions: {
      placeholder: 'https://en.wikipedia.org/wiki/Template:Infobox_Olympic_games',
      descriptionParams: function descriptionParams() {
        return ['https://www.mediawiki.org/wiki/Special:MyLanguage/Help:Transclusion'];
      },
      type: 'text'
    },
    quarry: {
      placeholder: '12345',
      descriptionParams: function descriptionParams() {
        return ["<a target='_blank' href='//quarry.wmflabs.org'>Quarry</a>"];
      },
      type: 'number'
    },
    hashtag: {
      placeholder: '#editathon',
      descriptionParams: function descriptionParams() {
        return ['<span class=\'glyphicon glyphicon-flash\'></span>' + $.i18n('hashtag-credits', "<a target='_blank' href='//tools.wmflabs.org/hashtags'>Wikipedia social search</a>"), '<a target=\'_blank\' href=\'//tools.wmflabs.org/hashtags/docs\'>' + $.i18n('hashtag').toLowerCase() + '</a>'];
      },
      type: 'string'
    },
    'external-link': {
      placeholder: '*.nycgo.com',
      descriptionParams: function descriptionParams() {
        return ['<a target=\'_blank\' href=\'https://www.mediawiki.org/wiki/Help:Links#External_links\'>' + $.i18n('external-link').toLowerCase() + '</a>'];
      },
      type: 'string'
    }
  },
  platformSelector: '#platform_select',
  sourceButton: '#source_button',
  sourceInput: '#source_input',
  formStates: ['initial', 'processing', 'complete', 'invalid'],
  timestampFormat: 'YYYYMMDD00',
  validateParams: ['source', 'subjectpage', 'platform', 'agent', 'direction', 'sort', 'view'],
  validParams: {
    direction: ['-1', '1'],
    sort: ['title', 'views', 'original'],
    source: ['pagepile', 'wikilinks', 'category', 'subpages', 'transclusions', 'quarry', 'hashtag', 'external-link'],
    view: ['list', 'chart'],
    subjectpage: ['0', '1']
  }
};

module.exports = config;

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Massviews Analysis tool
 * @file Main file for Massviews application
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

/** Main MassViews class */

var MassViews = function (_mix$with) {
  _inherits(MassViews, _mix$with);

  function MassViews() {
    _classCallCheck(this, MassViews);

    var _this = _possibleConstructorReturn(this, (MassViews.__proto__ || Object.getPrototypeOf(MassViews)).call(this, config));

    _this.app = 'massviews';
    return _this;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */


  _createClass(MassViews, [{
    key: 'initialize',
    value: function initialize() {
      this.assignDefaults();
      this.setupDateRangeSelector();
      this.popParams();
      this.setupListeners();

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

      _get(MassViews.prototype.__proto__ || Object.getPrototypeOf(MassViews.prototype), 'setupListeners', this).call(this);

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

      $('.source-option').on('click', function (e) {
        return _this2.updateSourceInput(e.target);
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

      ['sort', 'source', 'direction', 'outputData', 'hadFailure', 'total', 'view', 'subjectpage'].forEach(function (defaultKey) {
        _this3[defaultKey] = _this3.config.defaults[defaultKey];
      });
    }

    /**
     * Show/hide form elements based on the selected source
     * @param  {Object} node - HTML element of the selected source
     * @return {null} nothing
     */

  }, {
    key: 'updateSourceInput',
    value: function updateSourceInput(node) {
      var _$;

      var source = node.dataset.value;

      $('#source_button').data('value', source).html(node.textContent + ' <span class=\'caret\'></span>');

      $(this.config.sourceInput).prop('type', this.config.sources[source].type).prop('placeholder', this.config.sources[source].placeholder).val('');

      $('.source-description').html((_$ = $).i18n.apply(_$, ['massviews-' + source + '-description'].concat(_toConsumableArray(this.config.sources[source].descriptionParams()))));

      if (source === 'category') {
        $('.category-subject-toggle').show();
      } else {
        $('.category-subject-toggle').hide();
      }

      if (source === 'quarry' || source === 'external-link') {
        $('.massviews-source-input').addClass('project-enabled');
        $('.project-input').prop('disabled', false);
      } else {
        $('.massviews-source-input').removeClass('project-enabled');
        $('.project-input').prop('disabled', true);
      }

      $(this.config.sourceInput).focus();
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
        platform: $(this.config.platformSelector).val(),
        agent: $(this.config.agentSelector).val(),
        source: $(this.config.sourceButton).data('value'),
        target: $(this.config.sourceInput).val().score()
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

      if (params.source === 'category') {
        params.subjectpage = $('.category-subject-toggle--input').is(':checked') ? '1' : '0';
      } else if (params.source === 'quarry' || params.source === 'external-link') {
        params.project = $('.project-input').val();
      }

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

      /** only certain characters within the page name are escaped */
      window.history.replaceState({}, document.title, '?' + $.param(this.getParams()));

      $('.permalink').prop('href', '/massviews?' + $.param(this.getPermaLink()));
    }

    /**
     * Render list of massviews into view
     * @override
     * @returns {null} nothing
     */

  }, {
    key: 'renderData',
    value: function renderData() {
      var _this4 = this;

      _get(MassViews.prototype.__proto__ || Object.getPrototypeOf(MassViews.prototype), 'renderData', this).call(this, function (sortedDatasets) {
        var source = $('#source_button').data('value');
        var pageColumnMessage = void 0;

        // update message for pages column
        if (['wikilinks', 'subpages', 'transclusions'].includes(source)) {
          pageColumnMessage = $.i18n('num-' + source, sortedDatasets.length - (source === 'subpages' ? 1 : 0));
        } else {
          pageColumnMessage = $.i18n('num-pages', sortedDatasets.length);
        }

        $('.output-totals').html('<th scope=\'row\'>' + $.i18n('totals') + '</th>\n         <th>' + $.i18n(pageColumnMessage, sortedDatasets.length) + '</th>\n         <th>' + _this4.formatNumber(_this4.outputData.sum) + '</th>\n         <th>' + _this4.formatNumber(Math.round(_this4.outputData.average)) + ' / ' + $.i18n('day') + '</th>');
        $('#output_list').html('');

        sortedDatasets.forEach(function (item, index) {
          $('#output_list').append('<tr>\n           <th scope=\'row\'>' + (index + 1) + '</th>\n           <td><a href="https://' + item.project.escape() + '/wiki/' + item.label.score() + '" target="_blank">' + item.label.descore() + '</a></td>\n           <td><a target="_blank" href=\'' + _this4.getPageviewsURL(item.project, item.label) + '\'>' + _this4.formatNumber(item.sum) + '</a></td>\n           <td>' + _this4.formatNumber(Math.round(item.average)) + ' / ' + $.i18n('day') + '</td>\n           </tr>');
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
        case 'original':
          return item.index;
        case 'title':
          return item.label;
        case 'views':
          return Number(item.sum);
      }
    }

    /**
     * Loop through given pages and query the pageviews API for each
     *   Also updates this.outputData with result
     * @param  {Array} pages - list of page names or full URLs to pages
     * @param  {String} [project] - project such as en.wikipedia.org
     *   If null pages is assumed to be an array of page URLs
     * @return {Deferred} - Promise resolving with data ready to be rendered to view
     */

  }, {
    key: 'getPageViewsData',
    value: function getPageViewsData(pages, project) {
      var _this5 = this;

      var startDate = this.daterangepicker.startDate.startOf('day'),
          endDate = this.daterangepicker.endDate.startOf('day');

      var dfd = $.Deferred(),
          count = 0,
          failureRetries = {},
          totalRequestCount = pages.length,
          failedPages = [],
          pageViewsData = [];

      var makeRequest = function makeRequest(page) {
        var queryProject = void 0;

        // if there's no project that means page is a URL to the page
        if (!project) {
          var _getWikiPageFromURL = _this5.getWikiPageFromURL(page);

          var _getWikiPageFromURL2 = _slicedToArray(_getWikiPageFromURL, 2);

          queryProject = _getWikiPageFromURL2[0];
          page = _getWikiPageFromURL2[1];
        } else {
          queryProject = project;
        }

        var uriEncodedPageName = encodeURIComponent(page);
        var url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/' + queryProject + ('/' + $(_this5.config.platformSelector).val() + '/' + $(_this5.config.agentSelector).val() + '/' + uriEncodedPageName + '/daily') + ('/' + startDate.format(_this5.config.timestampFormat) + '/' + endDate.format(_this5.config.timestampFormat));
        var promise = $.ajax({ url: url, dataType: 'json' });

        promise.done(function (pvData) {
          pageViewsData.push({
            title: page,
            project: queryProject,
            items: pvData.items
          });
        }).fail(function (errorData) {
          /** first detect if this was a Cassandra backend error, and if so, schedule a re-try */
          var cassandraError = errorData.responseJSON.title === 'Error in Cassandra table storage backend';

          if (cassandraError) {
            if (failureRetries[page]) {
              failureRetries[page]++;
            } else {
              failureRetries[page] = 1;
            }

            /** maximum of 3 retries */
            if (failureRetries[page] < 3) {
              totalRequestCount++;
              return _this5.rateLimit(makeRequest, 100, _this5)(page);
            }
          }

          if (cassandraError) {
            failedPages.push(page);
          } else {
            _this5.writeMessage(_this5.getPageLink(page, queryProject) + ': ' + $.i18n('api-error', 'Pageviews API') + ' - ' + errorData.responseJSON.title);
          }

          // unless it was a 404, don't cache this series of requests
          if (errorData.status !== 404) hadFailure = true;
        }).always(function () {
          _this5.updateProgressBar(++count, totalRequestCount);

          if (count === totalRequestCount) {
            if (failedPages.length) {
              _this5.writeMessage($.i18n('api-error-timeout', '<ul>' + failedPages.map(function (failedPage) {
                return '<li>' + _this5.getPageLink(failedPage, queryProject) + '</li>';
              }).join('') + '</ul>'));
            }

            dfd.resolve(pageViewsData);
          }
        });
      };

      var requestFn = this.rateLimit(makeRequest, this.config.apiThrottle, this);

      pages.forEach(function (page, index) {
        requestFn(page);
      });

      return dfd;
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
      var _this6 = this;

      /**
       * `datasets` structure:
       *
       * [{
       *   title: page,
       *   project: 'en.wikipedia.org',
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
       *       project: '',
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
          datesWithoutData = [];

      datasets.forEach(function (dataset, index) {
        var data = dataset.items.map(function (item) {
          return item.views;
        }),
            sum = data.reduce(function (a, b) {
          return a + b;
        });

        _this6.outputData.listData.push({
          data: data,
          label: dataset.title,
          project: dataset.project,
          sum: sum,
          average: sum / length,
          index: index
        });

        /**
         * Ensure we have data for each day, using null as the view count when data is actually not available yet
         * See fillInZeros() comments for more info.
         */

        var _fillInZeros = _this6.fillInZeros(dataset.items, startDate, endDate);

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
        average: grandSum / length
      });

      if (datesWithoutData.length) {
        var dateList = datesWithoutData.map(function (date) {
          return moment(date).format(_this6.dateFormat);
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
  }, {
    key: 'getPileURL',
    value: function getPileURL(id) {
      return 'http://tools.wmflabs.org/pagepile/api.php?action=get_data&id=' + id;
    }
  }, {
    key: 'getPileLink',
    value: function getPileLink(id) {
      return '<a href=\'' + this.getPileURL(id) + '\' target=\'_blank\'>Page Pile ' + id + '</a>';
    }

    /**
     * Get list of pages from Page Pile API given id
     * @param  {Number} id - PagePile ID
     * @return {Deferred} - Promise resolving with page names
     */

  }, {
    key: 'getPagePile',
    value: function getPagePile(id) {
      var _this7 = this;

      var dfd = $.Deferred();
      var url = 'https://tools.wmflabs.org/pagepile/api.php?id=' + id + '&action=get_data&format=json&metadata=1';

      $.ajax({
        url: url,
        dataType: 'jsonp'
      }).done(function (data) {
        var pages = Object.keys(data.pages);

        if (pages.length > _this7.config.apiLimit) {
          _this7.writeMessage($.i18n('massviews-oversized-set', _this7.getPileLink(id), _this7.formatNumber(pages.length), _this7.config.apiLimit));

          pages = pages.slice(0, _this7.config.apiLimit);
        }

        return dfd.resolve({
          id: data.id,
          wiki: data.wiki,
          pages: pages
        });
      }).fail(function (error) {
        return dfd.reject(_this7.getPileLink(id) + ': ' + $.i18n('api-error-no-data'));
      });

      return dfd;
    }

    /**
     * Parse wiki URL for the wiki and page name
     * @param  {String} url - full URL to a wiki page
     * @return {Array|null} ['wiki', 'page'] or null if invalid
     */

  }, {
    key: 'getWikiPageFromURL',
    value: function getWikiPageFromURL(url) {
      var matches = void 0;

      if (url.includes('?')) {
        matches = url.match(/\/\/(.*?)\/w\/.*\?(?:.*\b)?title=(.*?)(?:&|$)/);
      } else {
        matches = url.match(/\/\/(.*?)\/wiki\/(.*?)(?:\?|$)/);
      }

      return matches ? matches.slice(1) : [null, null];
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

      var params = this.validateParams(this.parseQueryString());
      this.validateDateRange(params);

      this.patchUsage();

      this.updateSourceInput($('.source-option[data-value=' + params.source + ']')[0]);

      // fill in value for the target
      if (params.target) {
        $(this.config.sourceInput).val(decodeURIComponent(params.target).descore());
      }

      // If there are invalid params, remove target from params so we don't process the defaults.
      // FIXME: we're checking for site messages because super.validateParams doesn't return a boolean
      //   or any indication the validations failed. This is hacky but necessary.
      if ($('.site-notice .alert-danger').length) {
        delete params.target;
      } else if (params.overflow && params.source === 'pagepile' && params.target) {
        /**
         * If they requested more than 10 pages in Pageviews (via typing it in the URL)
         *   they are redirected to Massviews with an auto-generated PagePile.
         *   This shows a message explaining what happened.
         */
        this.addSiteNotice('info', $.i18n('massviews-redirect', $.i18n('title'), 10, this.getPileLink(params.target)), '', true);
      }

      $(this.config.platformSelector).val(params.platform);
      $(this.config.agentSelector).val(params.agent);

      /** export necessary params to outer scope */
      ['sort', 'direction', 'view', 'source', 'subjectpage'].forEach(function (key) {
        _this8[key] = params[key];
      });

      if ((params.source === 'quarry' || params.source === 'external-link') && params.project) {
        $('.project-input').val(params.project);
      }

      if (params.subjectpage === '1') {
        $('.category-subject-toggle--input').prop('checked', true);
      }

      /** start up processing if necessary params are present */
      if (params.target) {
        this.processInput();
      }
    }

    /**
     * Helper to set a CSS class on the `main` node,
     *   styling the document based on a 'state'
     * @param {String} state - class to be added;
     *   should be one of ['initial', 'processing', 'complete']
     * @param {function} [cb] - Optional function to be called after initial state has been set
     * @returns {null} nothing
     */

  }, {
    key: 'setState',
    value: function setState(state, cb) {
      $('main').removeClass(this.config.formStates.join(' ')).addClass(state);

      switch (state) {
        case 'initial':
          this.updateProgressBar(0);
          this.clearMessages();
          this.assignDefaults();
          this.destroyChart();
          $('output').removeClass('list-mode').removeClass('chart-mode');
          $('.data-links').addClass('invisible');
          if (this.typeahead) this.typeahead.hide();
          $(this.config.sourceInput).val('').focus();
          if (typeof cb === 'function') cb.call(this);
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
     * Helper to reset the state of the app and indicate that than API error occurred
     * @param {String} apiName - name of the API where the error occurred
     * @param {String} [errorMessage] - optional error message to show retrieved from API
     * @return {null} nothing
     */

  }, {
    key: 'apiErrorReset',
    value: function apiErrorReset(apiName, errorMessage) {
      var _this9 = this;

      return this.setState('initial', function () {
        var message = void 0;
        if (errorMessage) {
          message = $.i18n('api-error', apiName) + ': ' + errorMessage;
        } else {
          message = '' + $.i18n('api-error-unknown', apiName);
        }
        _this9.writeMessage(message);
      });
    }
  }, {
    key: 'processPagePile',
    value: function processPagePile(cb) {
      var _this10 = this;

      var pileId = $(this.config.sourceInput).val();

      $('.progress-counter').text($.i18n('fetching-data', 'Page Pile API'));
      this.getPagePile(pileId).done(function (pileData) {
        if (!pileData.pages.length) {
          return _this10.setState('initial', function () {
            _this10.writeMessage($.i18n('massviews-empty-set', _this10.getPileLink(pileId)));
          });
        }

        // reference siteMap hash to get project domain from database name (giant file in /shared/site_map.js)
        var project = siteMap[pileData.wiki];

        /**
         * remove Project: prefix if present, only for enwiki, for now,
         * see https://phabricator.wikimedia.org/T135437
         */
        if (project === 'en.wikipedia.org') {
          pileData.pages = pileData.pages.map(function (page) {
            return page.replace(/^Project:Wikipedia:/, 'Wikipedia:');
          });
        }

        _this10.getPageViewsData(pileData.pages, project).done(function (pageViewsData) {
          var label = 'Page Pile #' + pileData.id;

          $('.output-title').text(label).prop('href', _this10.getPileURL(pileData.id));
          $('.output-params').html('\n          ' + $(_this10.config.dateRangeSelector).val() + '\n          &mdash;\n          <a href="https://' + project.escape() + '" target="_blank">\n            ' + project.replace(/.org$/, '').escape() + '\n          </a>\n          ');

          cb(label, _this10.getPileLink(pileData.id), pageViewsData);
        });
      }).fail(function (error) {
        _this10.setState('initial');

        /** structured error comes back as a string, otherwise we don't know what happened */
        if (typeof error === 'string') {
          _this10.writeMessage(error);
        } else {
          _this10.writeMessage($.i18n('api-error-unknown', 'Page Pile'));
        }
      });
    }
  }, {
    key: 'processCategory',
    value: function processCategory(project, category, cb) {
      var _this11 = this;

      var requestData = {
        list: 'categorymembers',
        cmlimit: 500,
        cmtitle: category,
        prop: 'categoryinfo',
        titles: category
      };

      var categoryLink = this.getPageLink(category, project);

      $('.progress-counter').text($.i18n('fetching-data', 'Category API'));
      this.massApi(requestData, project, 'cmcontinue', 'categorymembers').done(function (data) {
        if (data.error) {
          return _this11.apiErrorReset('Category API', data.error.info);
        }

        var pageObj = data.pages[0];

        if (pageObj.missing) {
          return _this11.setState('initial', function () {
            _this11.writeMessage($.i18n('api-error-no-data'));
          });
        }

        var size = pageObj.categoryinfo.size,

        // siteInfo is only populated if they've opted to see subject pages instead of talk pages
        // Otherwise namespaces are not needed by this.mapCategoryPageNames
        namespaces = _this11.getSiteInfo(project) ? _this11.getSiteInfo(project).namespaces : undefined;
        var pages = data.categorymembers;

        if (!pages.length) {
          return _this11.setState('initial', function () {
            _this11.writeMessage($.i18n('massviews-empty-set', categoryLink));
          });
        }

        if (size > _this11.config.apiLimit) {
          _this11.writeMessage($.i18n('massviews-oversized-set', categoryLink, _this11.formatNumber(size), _this11.config.apiLimit));

          pages = pages.slice(0, _this11.config.apiLimit);
        }

        var pageNames = _this11.mapCategoryPageNames(pages, namespaces);

        _this11.getPageViewsData(pageNames, project).done(function (pageViewsData) {
          cb(category, categoryLink, pageViewsData);
        });
      }).fail(function (data) {
        _this11.setState('initial');

        /** structured error comes back as a string, otherwise we don't know what happened */
        if (data && typeof data.error === 'string') {
          _this11.writeMessage($.i18n('api-error', categoryLink + ': ' + data.error));
        } else {
          _this11.writeMessage($.i18n('api-error-unknown', categoryLink));
        }
      });
    }
  }, {
    key: 'processHashtag',
    value: function processHashtag(cb) {
      var _this12 = this;

      var hashtag = $(this.config.sourceInput).val().replace(/^#/, ''),
          hashTagLink = '<a target="_blank" href="http://tools.wmflabs.org/hashtags/search/' + hashtag + '">#' + hashtag.escape() + '</a>';

      $('.progress-counter').text($.i18n('fetching-data', 'Hashtag API'));
      $.get('http://tools.wmflabs.org/hashtags/csv/' + hashtag + '?limit=5000').done(function (data) {
        /**
         * CSVToArray code courtesy of Ben Nadel
         * http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
         */
        var strDelimiter = ',';

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
        // Delimiters.
        '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' +
        // Quoted fields.
        '(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|' + (
        // Standard fields.
        '([^"\\' + strDelimiter + '\\r\\n]*))'), 'gi');

        // Create an array to hold our data. Give the array a default empty first row.
        var csvData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = void 0;

        // Keep looping over the regular expression matches until we can no longer find a match.
        while (arrMatches = objPattern.exec(data)) {
          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[1];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
            // Since we have reached a new row of data, add an empty row to our data array.
            csvData.push([]);
          }

          var strMatchedValue = void 0;

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(new RegExp('\"\"', 'g'), '\"');
          } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];
          }

          // Now that we have our value string, let's add it to the data array.
          csvData[csvData.length - 1].push(strMatchedValue);
        }

        // remove extraneous empty entry, if present
        if (csvData[csvData.length - 1].length === 1 && !csvData[csvData.length - 1][0]) {
          csvData = csvData.slice(0, -1);
        }

        // if only header row is present, reset view and throw error for being an empty set
        if (csvData.length === 1) {
          return _this12.setState('initial', function () {
            _this12.writeMessage($.i18n('massviews-empty-set', hashTagLink));
          });
        }

        // collect necessary data from the other rows
        _this12.getPageURLsFromHashtagCSV(csvData).done(function (pageURLs) {
          var size = pageURLs.length;

          if (size > _this12.config.apiLimit) {
            _this12.writeMessage($.i18n('massviews-oversized-set', hashTagLink, _this12.formatNumber(size), _this12.config.apiLimit));

            pageURLs = pageURLs.slice(0, _this12.config.apiLimit);
          }

          _this12.getPageViewsData(pageURLs).done(function (pageViewsData) {
            cb(hashtag, hashTagLink, pageViewsData);
          });
        }).fail(function () {
          return _this12.apiErrorReset('Siteinfo API');
        });
      }).fail(function () {
        return _this12.apiErrorReset('Hashtag API');
      });
    }

    /**
     * Helper for processHashtag that parses the CSV data to get the page URLs
     * @param  {Array} csvData - as built by processHashtag
     * @return {Array} full page URLs
     */

  }, {
    key: 'getPageURLsFromHashtagCSV',
    value: function getPageURLsFromHashtagCSV(csvData) {
      var _this13 = this;

      var dfd = $.Deferred();

      // find the index of the page title, language and diff URL
      var pageTitleIndex = csvData[0].indexOf('spaced_title'),
          namespaceIndex = csvData[0].indexOf('rc_namespace'),
          diffIndex = csvData[0].indexOf('diff_url');

      var pageURLs = [];

      // collect necessary data from the other rows
      csvData.slice(1).forEach(function (entry) {
        var project = entry[diffIndex].match(/https:\/\/(.*?\.org)\//)[1];

        // get siteinfo so we can get the namespace names (either from cache or from API)
        _this13.fetchSiteInfo(project).done(function () {
          var nsName = _this13.getSiteInfo(project).namespaces[entry[namespaceIndex]]['*'];
          pageURLs.push('https://' + project + '/wiki/' + (!!nsName ? nsName + ':' : '') + entry[pageTitleIndex]);

          // if we're on the last iteration resolve the outer promise with the unique page names
          if (pageURLs.length === csvData.length - 1) {
            dfd.resolve(pageURLs.unique());
          }
        }).fail(function () {
          dfd.reject();
        });
      });

      return dfd;
    }
  }, {
    key: 'processSubpages',
    value: function processSubpages(project, targetPage, cb) {
      var _this14 = this,
          _$2;

      // determine what namespace the targetPage is in
      var descoredTargetPage = targetPage.descore();
      var namespace = 0,
          queryTargetPage = void 0;
      for (var ns in this.getSiteInfo(project).namespaces) {
        if (ns === '0') continue; // skip mainspace

        var nsName = this.getSiteInfo(project).namespaces[ns]['*'] + ':';
        if (descoredTargetPage.startsWith(nsName)) {
          namespace = this.getSiteInfo(project).namespaces[ns].id;
          queryTargetPage = targetPage.substring(nsName.length);
        }
      }

      // get namespace number of corresponding talk or subject page
      var inverseNamespace = namespace % 2 === 0 ? namespace + 1 : namespace - 1;

      var promises = [];

      $('.progress-counter').text($.i18n('fetching-data', 'Allpages API'));
      [namespace, inverseNamespace].forEach(function (apnamespace) {
        var params = {
          list: 'allpages',
          aplimit: 500,
          apnamespace: apnamespace,
          apprefix: queryTargetPage + '/'
        };
        promises.push(_this14.massApi(params, project, 'apcontinue', 'allpages'));
      });

      var pageLink = this.getPageLink(targetPage, project);

      (_$2 = $).when.apply(_$2, promises).done(function (data, data2) {
        // show errors, if any
        var errors = [data, data2].filter(function (resp) {
          return !!resp.error;
        });
        if (errors.length) {
          _this14.setState('initial', function () {
            errors.forEach(function (error) {
              _this14.writeMessage($.i18n('api-error', 'Allpages API') + ': ' + error.error.info.escape());
            });
          });
          return false;
        }

        var pages = data.allpages.concat(data2.allpages);
        var size = pages.length;

        if (size === 0) {
          return _this14.setState('initial', function () {
            _this14.writeMessage($.i18n('api-error-no-data'));
          });
        }

        if (size > _this14.config.apiLimit) {
          _this14.writeMessage($.i18n('massviews-oversized-set', pageLink, _this14.formatNumber(size), _this14.config.apiLimit));

          pages = pages.slice(0, _this14.config.apiLimit);
        }

        var pageNames = [targetPage].concat(pages.map(function (page) {
          return page.title;
        }));

        _this14.getPageViewsData(pageNames, project).done(function (pageViewsData) {
          cb(targetPage, pageLink, pageViewsData);
        });
      }).fail(function (data) {
        _this14.setState('initial');

        /** structured error comes back as a string, otherwise we don't know what happened */
        if (data && typeof data.error === 'string') {
          _this14.writeMessage($.i18n('api-error', pageLink + ': ' + data.error));
        } else {
          _this14.writeMessage($.i18n('api-error-unknown', pageLink));
        }
      });
    }
  }, {
    key: 'processTemplate',
    value: function processTemplate(project, template, cb) {
      var _this15 = this;

      var requestData = {
        prop: 'transcludedin',
        tilimit: 500,
        titles: template
      };

      var templateLink = this.getPageLink(template, project);

      $('.progress-counter').text($.i18n('fetching-data', 'Transclusion API'));
      this.massApi(requestData, project, 'ticontinue', function (data) {
        return data.pages[0].transcludedin;
      }).done(function (data) {
        if (data.error) {
          return _this15.apiErrorReset('Transclusion API', data.error.info);
        }

        // this happens if there are no transclusions or the template could not be found
        if (!data.pages[0]) {
          return _this15.setState('initial', function () {
            _this15.writeMessage($.i18n('api-error-no-data'));
          });
        }

        var pages = data.pages.map(function (page) {
          return page.title;
        });

        // there were more pages that could not be processed as we hit the limit
        if (data.continue) {
          _this15.writeMessage($.i18n('massviews-oversized-set-unknown', templateLink, _this15.config.apiLimit));
        }

        _this15.getPageViewsData(pages, project).done(function (pageViewsData) {
          cb(template, templateLink, pageViewsData);
        });
      }).fail(function (data) {
        _this15.setState('initial');

        /** structured error comes back as a string, otherwise we don't know what happened */
        if (data && typeof data.error === 'string') {
          _this15.writeMessage($.i18n('api-error', templateLink + ': ' + data.error));
        } else {
          _this15.writeMessage($.i18n('api-error-unknown', templateLink));
        }
      });
    }
  }, {
    key: 'processWikiPage',
    value: function processWikiPage(project, page, cb) {
      var _this16 = this;

      var requestData = {
        pllimit: 500,
        prop: 'links',
        titles: page
      };

      var pageLink = this.getPageLink(page, project);

      $('.progress-counter').text($.i18n('fetching-data', 'Links API'));
      this.massApi(requestData, project, 'plcontinue', function (data) {
        return data.pages[0].links;
      }).done(function (data) {
        if (data.error) {
          return _this16.apiErrorReset('Links API', data.error.info);
        }

        // this happens if there are no wikilinks or the page could not be found
        if (!data.pages[0]) {
          return _this16.setState('initial', function () {
            _this16.writeMessage($.i18n('api-error-no-data'));
          });
        }

        var pages = data.pages.map(function (page) {
          return page.title;
        });

        if (!pages.length) {
          return _this16.setState('initial', function () {
            _this16.writeMessage($.i18n('massviews-empty-set', pageLink));
          });
        }

        // in this case we know there are more than this.config.apiLimit pages
        //   because we got back a data.continue value
        if (data.continue) {
          _this16.writeMessage($.i18n('massviews-oversized-set-unknown', pageLink, _this16.config.apiLimit));
        }

        _this16.getPageViewsData(pages, project).done(function (pageViewsData) {
          cb(page, pageLink, pageViewsData);
        });
      }).fail(function (data) {
        var errorMessage = data && typeof data.error === 'string' ? data.error : null;
        _this16.apiErrorReset('Links API', errorMessage);
      });
    }
  }, {
    key: 'processQuarry',
    value: function processQuarry(cb) {
      var _this17 = this;

      var project = $('.project-input').val(),
          id = $(this.config.sourceInput).val();
      if (!this.validateProject(project)) return;

      var url = 'https://quarry.wmflabs.org/query/' + id + '/result/latest/0/json',
          quarryLink = '<a target=\'_blank\' href=\'https://quarry.wmflabs.org/query/' + id + '\'>Quarry ' + id + '</a>';

      $('.progress-counter').text($.i18n('fetching-data', 'Quarry API'));
      $.getJSON(url).done(function (data) {
        var titleIndex = data.headers.indexOf('page_title');

        if (titleIndex === -1) {
          _this17.setState('initial');
          return _this17.writeMessage($.i18n('invalid-quarry-dataset', 'page_title'));
        }

        var titles = data.rows.map(function (row) {
          return row[titleIndex];
        });

        if (titles.length > _this17.config.apiLimit) {
          _this17.writeMessage($.i18n('massviews-oversized-set', quarryLink, _this17.formatNumber(titles.length), _this17.config.apiLimit));

          titles = titles.slice(0, _this17.config.apiLimit);
        }

        _this17.getPageViewsData(titles, project).done(function (pageViewsData) {
          cb(id, quarryLink, pageViewsData);
        });
      }).fail(function (data) {
        _this17.setState('initial');
        return _this17.writeMessage($.i18n('api-error-unknown', 'Quarry API'), true);
      });
    }
  }, {
    key: 'processExternalLink',
    value: function processExternalLink(cb) {
      var _this18 = this;

      var project = $('.project-input').val(),
          link = $(this.config.sourceInput).val();
      if (!this.validateProject(project)) return;

      var requestData = {
        list: 'exturlusage',
        eulimit: 500,
        eunamespace: 0,
        euquery: link
      };

      var linkSearchLink = '<a target=\'_blank\' href=\'https://' + project + '/w/index.php?target=' + link + '&title=Special:LinkSearch\'>' + link + '</a>';

      $('.progress-counter').text($.i18n('fetching-data', 'External link API'));
      this.massApi(requestData, project, 'euoffset', 'exturlusage').done(function (data) {
        if (data.error) {
          return _this18.apiErrorReset('External link API', data.error.info);
        }

        // this happens if there are no external links
        if (!data.exturlusage[0]) {
          return _this18.setState('initial', function () {
            _this18.writeMessage($.i18n('api-error-no-data'));
          });
        }

        var pages = data.exturlusage.map(function (page) {
          return page.title;
        }).unique();

        if (!pages.length) {
          return _this18.setState('initial', function () {
            _this18.writeMessage($.i18n('massviews-empty-set', linkSearchLink));
          });
        }

        // there were more pages that could not be processed as we hit the limit
        if (data.continue) {
          _this18.writeMessage($.i18n('massviews-oversized-set-unknown', linkSearchLink, _this18.config.apiLimit));
        }

        _this18.getPageViewsData(pages, project).done(function (pageViewsData) {
          cb(link, linkSearchLink, pageViewsData);
        });
      }).fail(function (data) {
        _this18.setState('initial');

        /** structured error comes back as a string, otherwise we don't know what happened */
        if (data && typeof data.error === 'string') {
          _this18.writeMessage($.i18n('api-error', linkSearchLink + ': ' + data.error));
        } else {
          _this18.writeMessage($.i18n('api-error-unknown', linkSearchLink));
        }
      });
    }

    /**
     * Validate given project and throw an error if invalid
     * @param  {String} project - tha project
     * @return {Boolean} true or false
     */

  }, {
    key: 'validateProject',
    value: function validateProject(project) {
      if (!project) return false;

      /** Remove www hostnames since the pageviews API doesn't expect them. */
      project = project.replace(/^www\./, '');

      if (siteDomains.includes(project)) return true;

      this.setState('initial');
      this.writeMessage($.i18n('invalid-project', '<a href=\'//' + project.escape() + '\'>' + project.escape() + '</a>'), true);

      return false;
    }
  }, {
    key: 'mapCategoryPageNames',
    value: function mapCategoryPageNames(pages, namespaces) {
      var pageNames = [];

      pages.forEach(function (page) {
        if (namespaces && page.ns % 2 === 1) {
          var namespace = namespaces[page.ns].canonical;
          var subjectNamespace = namespaces[page.ns - 1].canonical || '';
          pageNames.push(page.title.replace(namespace, subjectNamespace).replace(/^\:/, ''));
        } else {
          pageNames.push(page.title);
        }
      });

      return pageNames;
    }

    /**
     * Process the massviews for the given source and options entered
     * Called when submitting the form
     * @return {null} nothing
     */

  }, {
    key: 'processInput',
    value: function processInput() {
      var _this19 = this;

      this.setState('processing');

      var readyForRendering = function readyForRendering() {
        $('.output-title').html(_this19.outputData.link);
        $('.output-params').html($(_this19.config.dateRangeSelector).val());
        _this19.setInitialChartType();
        _this19.renderData();
      };

      if (this.isRequestCached()) {
        $('.progress-bar').css('width', '100%');
        $('.progress-counter').text($.i18n('loading-cache'));
        return setTimeout(function () {
          _this19.outputData = simpleStorage.get(_this19.getCacheKey());
          readyForRendering();
        }, 500);
      }

      var cb = function cb(label, link, datasets) {
        $('.progress-bar').css('width', '100%');
        $('.progress-counter').text($.i18n('building-dataset'));
        setTimeout(function () {
          _this19.buildMotherDataset(label, link, datasets);
          readyForRendering();
        }, 250);
      };

      var source = $('#source_button').data('value');

      // special sources that don't use a wiki URL
      switch (source) {
        case 'pagepile':
          return this.processPagePile(cb);
        case 'quarry':
          return this.processQuarry(cb);
        case 'hashtag':
          return this.processHashtag(cb);
        case 'external-link':
          return this.processExternalLink(cb);
      }

      // validate wiki URL

      var _getWikiPageFromURL3 = this.getWikiPageFromURL($(this.config.sourceInput).val());

      var _getWikiPageFromURL4 = _slicedToArray(_getWikiPageFromURL3, 2);

      var project = _getWikiPageFromURL4[0];
      var target = _getWikiPageFromURL4[1];


      if (!project || !target) {
        return this.setState('initial', function () {
          _this19.writeMessage($.i18n('invalid-' + (source === 'category' ? 'category' : 'page') + '-url'));
        });
      } else if (!this.validateProject(project)) {
        return;
      }

      // decode and remove trailing slash
      target = decodeURIComponent(target).replace(/\/$/, '');

      switch (source) {
        case 'category':
          // fetch siteinfo to get namespaces if they've opted to use subject page instead of talk
          if ($('.category-subject-toggle--input').is(':checked')) {
            this.fetchSiteInfo(project).then(function () {
              _this19.processCategory(project, target, cb);
            });
          } else {
            this.processCategory(project, target, cb);
          }
          break;
        case 'subpages':
          // fetch namespaces first
          this.fetchSiteInfo(project).then(function () {
            return _this19.processSubpages(project, target, cb);
          });
          break;
        case 'wikilinks':
          this.processWikiPage(project, target, cb);
          break;
        case 'transclusions':
          this.processTemplate(project, target, cb);
          break;
      }
    }

    /**
     * Exports current mass data to CSV format and loads it in a new tab
     * With the prepended data:text/csv this should cause the browser to download the data
     * @override
     * @returns {null} nothing
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

      this.downloadData(csvContent, 'csv');
    }
  }, {
    key: 'baseProject',
    get: function get() {
      return this.project.split('.')[1];
    }
  }]);

  return MassViews;
}(mix(Pv).with(ChartHelpers, ListHelpers));

$(document).ready(function () {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new MassViews();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9tYXNzdmlld3MvY29uZmlnLmpzIiwiamF2YXNjcmlwdHMvbWFzc3ZpZXdzL21hc3N2aWV3cy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9jaGFydF9oZWxwZXJzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL2NvcmVfZXh0ZW5zaW9ucy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9saXN0X2hlbHBlcnMuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvcG9seWZpbGxzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2LmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3B2X2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9zaXRlX21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNXQSxJQUFNLFNBQVM7QUFDYixpQkFBZSxlQURGO0FBRWIsU0FBTyxZQUZNO0FBR2IsYUFBVyxFQUhFLEU7QUFJYixxQkFBbUIsY0FKTjtBQUtiLFlBQVU7QUFDUixlQUFXLFdBREg7QUFFUixhQUFTLGtCQUZEO0FBR1IsVUFBTSxPQUhFO0FBSVIsWUFBUSxVQUpBO0FBS1IsbUJBQWUsRUFMUDtBQU1SLGVBQVcsQ0FOSDtBQU9SLGdCQUFZLEVBUEo7QUFRUixnQkFBWSxLQVJKO0FBU1IsV0FBTyxDQVRDO0FBVVIsVUFBTSxNQVZFO0FBV1IsaUJBQWE7QUFYTCxHQUxHO0FBa0JiLGdCQUFjLHNCQUFDLFFBQUQsRUFBVyxLQUFYLEVBQXFCO0FBQ2pDLHdCQUFrQixFQUFFLElBQUYsQ0FBTyxRQUFQLENBQWxCLG1CQUFnRCxNQUFNLFlBQU4sQ0FBbUIsTUFBTSxVQUFOLENBQWlCLEdBQXBDLENBQWhELGlCQUNLLE1BQU0sWUFBTixDQUFtQixLQUFLLEtBQUwsQ0FBVyxNQUFNLFVBQU4sQ0FBaUIsT0FBNUIsQ0FBbkIsQ0FETCxTQUNpRSxFQUFFLElBQUYsQ0FBTyxLQUFQLENBRGpFO0FBRUQsR0FyQlk7QUFzQmIsdUJBQXFCLDJCQXRCUjtBQXVCYixXQUFTO0FBQ1AsY0FBVTtBQUNSLG1CQUFhLHFFQURMO0FBRVIseUJBQW1CO0FBQUEsZUFBTSxzR0FDd0UsRUFBRSxJQUFGLENBQU8sVUFBUCxFQUFtQixXQUFuQixFQUR4RSxVQUFOO0FBQUEsT0FGWDtBQUtSLFlBQU07QUFMRSxLQURIO0FBUVAsZUFBVztBQUNULG1CQUFhLGtEQURKO0FBRVQseUJBQW1CO0FBQUEsZUFBTSxDQUFDLGtFQUFELENBQU47QUFBQSxPQUZWO0FBR1QsWUFBTTtBQUhHLEtBUko7QUFhUCxjQUFVO0FBQ1IsbUJBQWEsT0FETDtBQUVSLHlCQUFtQjtBQUFBLGVBQU0sQ0FBQyxxRUFBRCxDQUFOO0FBQUEsT0FGWDtBQUdSLFlBQU07QUFIRSxLQWJIO0FBa0JQLGNBQVU7QUFDUixtQkFBYSw0Q0FETDtBQUVSLHlCQUFtQjtBQUFBLGVBQU0sb0dBQ3NFLEVBQUUsSUFBRixDQUFPLFVBQVAsRUFBbUIsV0FBbkIsRUFEdEUsVUFBTjtBQUFBLE9BRlg7QUFLUixZQUFNO0FBTEUsS0FsQkg7QUF5QlAsbUJBQWU7QUFDYixtQkFBYSw4REFEQTtBQUViLHlCQUFtQjtBQUFBLGVBQU0sQ0FBQyxxRUFBRCxDQUFOO0FBQUEsT0FGTjtBQUdiLFlBQU07QUFITyxLQXpCUjtBQThCUCxZQUFRO0FBQ04sbUJBQWEsT0FEUDtBQUVOLHlCQUFtQjtBQUFBLGVBQU0sQ0FBQywyREFBRCxDQUFOO0FBQUEsT0FGYjtBQUdOLFlBQU07QUFIQSxLQTlCRDtBQW1DUCxhQUFTO0FBQ1AsbUJBQWEsWUFETjtBQUVQLHlCQUFtQjtBQUFBLGVBQU0sdURBQzJCLEVBQUUsSUFBRixDQUFPLGlCQUFQLEVBQTBCLG9GQUExQixDQUQzQix1RUFFd0MsRUFBRSxJQUFGLENBQU8sU0FBUCxFQUFrQixXQUFsQixFQUZ4QyxVQUFOO0FBQUEsT0FGWjtBQU1QLFlBQU07QUFOQyxLQW5DRjtBQTJDUCxxQkFBaUI7QUFDZixtQkFBYSxhQURFO0FBRWYseUJBQW1CO0FBQUEsZUFBTSw2RkFDK0QsRUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixXQUF4QixFQUQvRCxVQUFOO0FBQUEsT0FGSjtBQUtmLFlBQU07QUFMUztBQTNDVixHQXZCSTtBQTBFYixvQkFBa0Isa0JBMUVMO0FBMkViLGdCQUFjLGdCQTNFRDtBQTRFYixlQUFhLGVBNUVBO0FBNkViLGNBQVksQ0FBQyxTQUFELEVBQVksWUFBWixFQUEwQixVQUExQixFQUFzQyxTQUF0QyxDQTdFQztBQThFYixtQkFBaUIsWUE5RUo7QUErRWIsa0JBQWdCLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsVUFBMUIsRUFBc0MsT0FBdEMsRUFBK0MsV0FBL0MsRUFBNEQsTUFBNUQsRUFBb0UsTUFBcEUsQ0EvRUg7QUFnRmIsZUFBYTtBQUNYLGVBQVcsQ0FBQyxJQUFELEVBQU8sR0FBUCxDQURBO0FBRVgsVUFBTSxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLFVBQW5CLENBRks7QUFHWCxZQUFRLENBQUMsVUFBRCxFQUFhLFdBQWIsRUFBMEIsVUFBMUIsRUFBc0MsVUFBdEMsRUFBa0QsZUFBbEQsRUFBbUUsUUFBbkUsRUFBNkUsU0FBN0UsRUFBd0YsZUFBeEYsQ0FIRztBQUlYLFVBQU0sQ0FBQyxNQUFELEVBQVMsT0FBVCxDQUpLO0FBS1gsaUJBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTjtBQUxGO0FBaEZBLENBQWY7O0FBeUZBLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekZBLElBQU0sU0FBUyxRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU0sVUFBVSxRQUFRLG9CQUFSLENBQWhCO0FBQ0EsSUFBTSxjQUFjLE9BQU8sSUFBUCxDQUFZLE9BQVosRUFBcUIsR0FBckIsQ0FBeUI7QUFBQSxTQUFPLFFBQVEsR0FBUixDQUFQO0FBQUEsQ0FBekIsQ0FBcEI7QUFDQSxJQUFNLEtBQUssUUFBUSxjQUFSLENBQVg7QUFDQSxJQUFNLGVBQWUsUUFBUSx5QkFBUixDQUFyQjtBQUNBLElBQU0sY0FBYyxRQUFRLHdCQUFSLENBQXBCOzs7O0lBR00sUzs7O0FBQ0osdUJBQWM7QUFBQTs7QUFBQSxzSEFDTixNQURNOztBQUVaLFVBQUssR0FBTCxHQUFXLFdBQVg7QUFGWTtBQUdiOzs7Ozs7Ozs7OztpQ0FPWTtBQUNYLFdBQUssY0FBTDtBQUNBLFdBQUssc0JBQUw7QUFDQSxXQUFLLFNBQUw7QUFDQSxXQUFLLGNBQUw7OztBQUdBLFFBQUUsd0JBQUYsRUFBNEIsSUFBNUI7QUFDRDs7Ozs7Ozs7OztxQ0FPZ0I7QUFBQTs7QUFDZjs7QUFFQSxRQUFFLFVBQUYsRUFBYyxFQUFkLENBQWlCLFFBQWpCLEVBQTJCLGFBQUs7QUFDOUIsVUFBRSxjQUFGLEc7QUFDQSxlQUFLLFlBQUw7QUFDRCxPQUhEOztBQUtBLFFBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBTTtBQUNwQyxlQUFLLFFBQUwsQ0FBYyxTQUFkO0FBQ0EsZUFBSyxVQUFMLENBQWdCLElBQWhCO0FBQ0QsT0FIRDs7QUFLQSxRQUFFLFlBQUYsRUFBZ0IsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsYUFBSztBQUMvQixZQUFNLFdBQVcsRUFBRSxFQUFFLGFBQUosRUFBbUIsSUFBbkIsQ0FBd0IsTUFBeEIsQ0FBakI7QUFDQSxlQUFLLFNBQUwsR0FBaUIsT0FBSyxJQUFMLEtBQWMsUUFBZCxHQUF5QixDQUFDLE9BQUssU0FBL0IsR0FBMkMsQ0FBNUQ7QUFDQSxlQUFLLElBQUwsR0FBWSxRQUFaO0FBQ0EsZUFBSyxVQUFMO0FBQ0QsT0FMRDs7QUFPQSxRQUFFLGdCQUFGLEVBQW9CLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDO0FBQUEsZUFBSyxPQUFLLGlCQUFMLENBQXVCLEVBQUUsTUFBekIsQ0FBTDtBQUFBLE9BQWhDOztBQUVBLFFBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsYUFBSztBQUM5QixpQkFBUyxhQUFULENBQXVCLElBQXZCO0FBQ0EsZUFBSyxJQUFMLEdBQVksRUFBRSxhQUFGLENBQWdCLE9BQWhCLENBQXdCLEtBQXBDO0FBQ0EsZUFBSyxVQUFMLENBQWdCLE9BQUssSUFBckI7QUFDRCxPQUpEO0FBS0Q7Ozs7Ozs7Ozs7cUNBT2dCO0FBQUE7O0FBQ2YsT0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixXQUFuQixFQUFnQyxZQUFoQyxFQUE4QyxZQUE5QyxFQUE0RCxPQUE1RCxFQUFxRSxNQUFyRSxFQUE2RSxhQUE3RSxFQUE0RixPQUE1RixDQUFvRyxzQkFBYztBQUNoSCxlQUFLLFVBQUwsSUFBbUIsT0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixVQUFyQixDQUFuQjtBQUNELE9BRkQ7QUFHRDs7Ozs7Ozs7OztzQ0FPaUIsSSxFQUFNO0FBQUE7O0FBQ3RCLFVBQU0sU0FBUyxLQUFLLE9BQUwsQ0FBYSxLQUE1Qjs7QUFFQSxRQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLE1BQWxDLEVBQTBDLElBQTFDLENBQWtELEtBQUssV0FBdkQ7O0FBRUEsUUFBRSxLQUFLLE1BQUwsQ0FBWSxXQUFkLEVBQTJCLElBQTNCLENBQWdDLE1BQWhDLEVBQXdDLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsTUFBcEIsRUFBNEIsSUFBcEUsRUFDRyxJQURILENBQ1EsYUFEUixFQUN1QixLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLE1BQXBCLEVBQTRCLFdBRG5ELEVBRUcsR0FGSCxDQUVPLEVBRlA7O0FBSUEsUUFBRSxxQkFBRixFQUF5QixJQUF6QixDQUNFLFNBQUUsSUFBRiwyQkFBb0IsTUFBcEIsNkNBQTZDLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsTUFBcEIsRUFBNEIsaUJBQTVCLEVBQTdDLEdBREY7O0FBSUEsVUFBSSxXQUFXLFVBQWYsRUFBMkI7QUFDekIsVUFBRSwwQkFBRixFQUE4QixJQUE5QjtBQUNELE9BRkQsTUFFTztBQUNMLFVBQUUsMEJBQUYsRUFBOEIsSUFBOUI7QUFDRDs7QUFFRCxVQUFJLFdBQVcsUUFBWCxJQUF1QixXQUFXLGVBQXRDLEVBQXVEO0FBQ3JELFVBQUUseUJBQUYsRUFBNkIsUUFBN0IsQ0FBc0MsaUJBQXRDO0FBQ0EsVUFBRSxnQkFBRixFQUFvQixJQUFwQixDQUF5QixVQUF6QixFQUFxQyxLQUFyQztBQUNELE9BSEQsTUFHTztBQUNMLFVBQUUseUJBQUYsRUFBNkIsV0FBN0IsQ0FBeUMsaUJBQXpDO0FBQ0EsVUFBRSxnQkFBRixFQUFvQixJQUFwQixDQUF5QixVQUF6QixFQUFxQyxJQUFyQztBQUNEOztBQUVELFFBQUUsS0FBSyxNQUFMLENBQVksV0FBZCxFQUEyQixLQUEzQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7OztnQ0FnQjhCO0FBQUEsVUFBckIsV0FBcUIsdUVBQVAsS0FBTzs7QUFDN0IsVUFBSSxTQUFTO0FBQ1gsa0JBQVUsRUFBRSxLQUFLLE1BQUwsQ0FBWSxnQkFBZCxFQUFnQyxHQUFoQyxFQURDO0FBRVgsZUFBTyxFQUFFLEtBQUssTUFBTCxDQUFZLGFBQWQsRUFBNkIsR0FBN0IsRUFGSTtBQUdYLGdCQUFRLEVBQUUsS0FBSyxNQUFMLENBQVksWUFBZCxFQUE0QixJQUE1QixDQUFpQyxPQUFqQyxDQUhHO0FBSVgsZ0JBQVEsRUFBRSxLQUFLLE1BQUwsQ0FBWSxXQUFkLEVBQTJCLEdBQTNCLEdBQWlDLEtBQWpDO0FBSkcsT0FBYjs7Ozs7OztBQVlBLFVBQUksS0FBSyxZQUFMLElBQXFCLENBQUMsV0FBMUIsRUFBdUM7QUFDckMsZUFBTyxLQUFQLEdBQWUsS0FBSyxZQUFMLENBQWtCLEtBQWpDO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxLQUFQLEdBQWUsS0FBSyxlQUFMLENBQXFCLFNBQXJCLENBQStCLE1BQS9CLENBQXNDLFlBQXRDLENBQWY7QUFDQSxlQUFPLEdBQVAsR0FBYSxLQUFLLGVBQUwsQ0FBcUIsT0FBckIsQ0FBNkIsTUFBN0IsQ0FBb0MsWUFBcEMsQ0FBYjtBQUNEOztBQUVELFVBQUksT0FBTyxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQ2hDLGVBQU8sV0FBUCxHQUFxQixFQUFFLGlDQUFGLEVBQXFDLEVBQXJDLENBQXdDLFVBQXhDLElBQXNELEdBQXRELEdBQTRELEdBQWpGO0FBQ0QsT0FGRCxNQUVPLElBQUksT0FBTyxNQUFQLEtBQWtCLFFBQWxCLElBQThCLE9BQU8sTUFBUCxLQUFrQixlQUFwRCxFQUFxRTtBQUMxRSxlQUFPLE9BQVAsR0FBaUIsRUFBRSxnQkFBRixFQUFvQixHQUFwQixFQUFqQjtBQUNEOztBQUVELFVBQUksQ0FBQyxXQUFMLEVBQWtCO0FBQ2hCLGVBQU8sSUFBUCxHQUFjLEtBQUssSUFBbkI7QUFDQSxlQUFPLFNBQVAsR0FBbUIsS0FBSyxTQUF4QjtBQUNBLGVBQU8sSUFBUCxHQUFjLEtBQUssSUFBbkI7OztBQUdBLFlBQUksS0FBSyxVQUFULEVBQXFCLE9BQU8sT0FBUCxHQUFpQixPQUFqQjtBQUN0Qjs7QUFFRCxhQUFPLE1BQVA7QUFDRDs7Ozs7Ozs7OztpQ0FPeUI7QUFBQSxVQUFmLEtBQWUsdUVBQVAsS0FBTzs7QUFDeEIsVUFBSSxDQUFDLE9BQU8sT0FBUixJQUFtQixDQUFDLE9BQU8sT0FBUCxDQUFlLFlBQXZDLEVBQXFEOztBQUVyRCxVQUFJLEtBQUosRUFBVztBQUNULGVBQU8sUUFBUSxZQUFSLENBQXFCLElBQXJCLEVBQTJCLFNBQVMsS0FBcEMsRUFBMkMsU0FBUyxJQUFULENBQWMsS0FBZCxDQUFvQixHQUFwQixFQUF5QixDQUF6QixDQUEzQyxDQUFQO0FBQ0Q7OztBQUdELGFBQU8sT0FBUCxDQUFlLFlBQWYsQ0FBNEIsRUFBNUIsRUFBZ0MsU0FBUyxLQUF6QyxFQUFnRCxNQUFNLEVBQUUsS0FBRixDQUFRLEtBQUssU0FBTCxFQUFSLENBQXREOztBQUVBLFFBQUUsWUFBRixFQUFnQixJQUFoQixDQUFxQixNQUFyQixrQkFBMkMsRUFBRSxLQUFGLENBQVEsS0FBSyxZQUFMLEVBQVIsQ0FBM0M7QUFDRDs7Ozs7Ozs7OztpQ0FPWTtBQUFBOztBQUNYLHVIQUFpQiwwQkFBa0I7QUFDakMsWUFBTSxTQUFTLEVBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsT0FBekIsQ0FBZjtBQUNBLFlBQUksMEJBQUo7OztBQUdBLFlBQUksQ0FBQyxXQUFELEVBQWMsVUFBZCxFQUEwQixlQUExQixFQUEyQyxRQUEzQyxDQUFvRCxNQUFwRCxDQUFKLEVBQWlFO0FBQy9ELDhCQUFvQixFQUFFLElBQUYsVUFBYyxNQUFkLEVBQXdCLGVBQWUsTUFBZixJQUF5QixXQUFXLFVBQVgsR0FBd0IsQ0FBeEIsR0FBNEIsQ0FBckQsQ0FBeEIsQ0FBcEI7QUFDRCxTQUZELE1BRU87QUFDTCw4QkFBb0IsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUFvQixlQUFlLE1BQW5DLENBQXBCO0FBQ0Q7O0FBRUQsVUFBRSxnQkFBRixFQUFvQixJQUFwQix3QkFDcUIsRUFBRSxJQUFGLENBQU8sUUFBUCxDQURyQiw0QkFFUyxFQUFFLElBQUYsQ0FBTyxpQkFBUCxFQUEwQixlQUFlLE1BQXpDLENBRlQsNEJBR1MsT0FBSyxZQUFMLENBQWtCLE9BQUssVUFBTCxDQUFnQixHQUFsQyxDQUhULDRCQUlTLE9BQUssWUFBTCxDQUFrQixLQUFLLEtBQUwsQ0FBVyxPQUFLLFVBQUwsQ0FBZ0IsT0FBM0IsQ0FBbEIsQ0FKVCxXQUlxRSxFQUFFLElBQUYsQ0FBTyxLQUFQLENBSnJFO0FBTUEsVUFBRSxjQUFGLEVBQWtCLElBQWxCLENBQXVCLEVBQXZCOztBQUVBLHVCQUFlLE9BQWYsQ0FBdUIsVUFBQyxJQUFELEVBQU8sS0FBUCxFQUFpQjtBQUN0QyxZQUFFLGNBQUYsRUFBa0IsTUFBbEIsMENBRXFCLFFBQVEsQ0FGN0IsZ0RBRzBCLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFIMUIsY0FHd0QsS0FBSyxLQUFMLENBQVcsS0FBWCxFQUh4RCwwQkFHK0YsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUgvRiw0REFJa0MsT0FBSyxlQUFMLENBQXFCLEtBQUssT0FBMUIsRUFBbUMsS0FBSyxLQUF4QyxDQUpsQyxXQUlxRixPQUFLLFlBQUwsQ0FBa0IsS0FBSyxHQUF2QixDQUpyRixrQ0FLUyxPQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUFMLENBQVcsS0FBSyxPQUFoQixDQUFsQixDQUxULFdBSzBELEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FMMUQ7QUFRRCxTQVREO0FBVUQsT0E3QkQ7QUE4QkQ7Ozs7Ozs7Ozs7O29DQVFlLEksRUFBTSxJLEVBQU07QUFDMUIsY0FBUSxJQUFSO0FBQ0EsYUFBSyxVQUFMO0FBQ0UsaUJBQU8sS0FBSyxLQUFaO0FBQ0YsYUFBSyxPQUFMO0FBQ0UsaUJBQU8sS0FBSyxLQUFaO0FBQ0YsYUFBSyxPQUFMO0FBQ0UsaUJBQU8sT0FBTyxLQUFLLEdBQVosQ0FBUDtBQU5GO0FBUUQ7Ozs7Ozs7Ozs7Ozs7cUNBVWdCLEssRUFBTyxPLEVBQVM7QUFBQTs7QUFDL0IsVUFBTSxZQUFZLEtBQUssZUFBTCxDQUFxQixTQUFyQixDQUErQixPQUEvQixDQUF1QyxLQUF2QyxDQUFsQjtVQUNFLFVBQVUsS0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLE9BQTdCLENBQXFDLEtBQXJDLENBRFo7O0FBR0EsVUFBSSxNQUFNLEVBQUUsUUFBRixFQUFWO1VBQXdCLFFBQVEsQ0FBaEM7VUFBbUMsaUJBQWlCLEVBQXBEO1VBQ0Usb0JBQW9CLE1BQU0sTUFENUI7VUFDb0MsY0FBYyxFQURsRDtVQUNzRCxnQkFBZ0IsRUFEdEU7O0FBR0EsVUFBTSxjQUFjLFNBQWQsV0FBYyxPQUFRO0FBQzFCLFlBQUkscUJBQUo7OztBQUdBLFlBQUksQ0FBQyxPQUFMLEVBQWM7QUFBQSxvQ0FDVyxPQUFLLGtCQUFMLENBQXdCLElBQXhCLENBRFg7O0FBQUE7O0FBQ1gsc0JBRFc7QUFDRyxjQURIO0FBRWIsU0FGRCxNQUVPO0FBQ0wseUJBQWUsT0FBZjtBQUNEOztBQUVELFlBQU0scUJBQXFCLG1CQUFtQixJQUFuQixDQUEzQjtBQUNBLFlBQU0sTUFDSixxRUFBbUUsWUFBbkUsVUFDSSxFQUFFLE9BQUssTUFBTCxDQUFZLGdCQUFkLEVBQWdDLEdBQWhDLEVBREosU0FDNkMsRUFBRSxPQUFLLE1BQUwsQ0FBWSxhQUFkLEVBQTZCLEdBQTdCLEVBRDdDLFNBQ21GLGtCQURuRixzQkFFSSxVQUFVLE1BQVYsQ0FBaUIsT0FBSyxNQUFMLENBQVksZUFBN0IsQ0FGSixTQUVxRCxRQUFRLE1BQVIsQ0FBZSxPQUFLLE1BQUwsQ0FBWSxlQUEzQixDQUZyRCxDQURGO0FBS0EsWUFBTSxVQUFVLEVBQUUsSUFBRixDQUFPLEVBQUUsUUFBRixFQUFPLFVBQVUsTUFBakIsRUFBUCxDQUFoQjs7QUFFQSxnQkFBUSxJQUFSLENBQWEsa0JBQVU7QUFDckIsd0JBQWMsSUFBZCxDQUFtQjtBQUNqQixtQkFBTyxJQURVO0FBRWpCLHFCQUFTLFlBRlE7QUFHakIsbUJBQU8sT0FBTztBQUhHLFdBQW5CO0FBS0QsU0FORCxFQU1HLElBTkgsQ0FNUSxxQkFBYTs7QUFFbkIsY0FBTSxpQkFBaUIsVUFBVSxZQUFWLENBQXVCLEtBQXZCLEtBQWlDLDBDQUF4RDs7QUFFQSxjQUFJLGNBQUosRUFBb0I7QUFDbEIsZ0JBQUksZUFBZSxJQUFmLENBQUosRUFBMEI7QUFDeEIsNkJBQWUsSUFBZjtBQUNELGFBRkQsTUFFTztBQUNMLDZCQUFlLElBQWYsSUFBdUIsQ0FBdkI7QUFDRDs7O0FBR0QsZ0JBQUksZUFBZSxJQUFmLElBQXVCLENBQTNCLEVBQThCO0FBQzVCO0FBQ0EscUJBQU8sT0FBSyxTQUFMLENBQWUsV0FBZixFQUE0QixHQUE1QixVQUF1QyxJQUF2QyxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxjQUFJLGNBQUosRUFBb0I7QUFDbEIsd0JBQVksSUFBWixDQUFpQixJQUFqQjtBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFLLFlBQUwsQ0FDSyxPQUFLLFdBQUwsQ0FBaUIsSUFBakIsRUFBdUIsWUFBdkIsQ0FETCxVQUM4QyxFQUFFLElBQUYsQ0FBTyxXQUFQLEVBQW9CLGVBQXBCLENBRDlDLFdBQ3dGLFVBQVUsWUFBVixDQUF1QixLQUQvRztBQUdEOzs7QUFHRCxjQUFJLFVBQVUsTUFBVixLQUFxQixHQUF6QixFQUE4QixhQUFhLElBQWI7QUFDL0IsU0FsQ0QsRUFrQ0csTUFsQ0gsQ0FrQ1UsWUFBTTtBQUNkLGlCQUFLLGlCQUFMLENBQXVCLEVBQUUsS0FBekIsRUFBZ0MsaUJBQWhDOztBQUVBLGNBQUksVUFBVSxpQkFBZCxFQUFpQztBQUMvQixnQkFBSSxZQUFZLE1BQWhCLEVBQXdCO0FBQ3RCLHFCQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQ2hCLG1CQURnQixFQUVoQixTQUNBLFlBQVksR0FBWixDQUFnQjtBQUFBLGdDQUFxQixPQUFLLFdBQUwsQ0FBaUIsVUFBakIsRUFBNkIsWUFBN0IsQ0FBckI7QUFBQSxlQUFoQixFQUF3RixJQUF4RixDQUE2RixFQUE3RixDQURBLEdBRUEsT0FKZ0IsQ0FBbEI7QUFNRDs7QUFFRCxnQkFBSSxPQUFKLENBQVksYUFBWjtBQUNEO0FBQ0YsU0FqREQ7QUFrREQsT0FwRUQ7O0FBc0VBLFVBQU0sWUFBWSxLQUFLLFNBQUwsQ0FBZSxXQUFmLEVBQTRCLEtBQUssTUFBTCxDQUFZLFdBQXhDLEVBQXFELElBQXJELENBQWxCOztBQUVBLFlBQU0sT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDN0Isa0JBQVUsSUFBVjtBQUNELE9BRkQ7O0FBSUEsYUFBTyxHQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7dUNBVWtCLEssRUFBTyxJLEVBQU0sUSxFQUFVO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkN4QyxXQUFLLFVBQUwsR0FBa0I7QUFDaEIsZ0JBQVEsS0FBSyxlQUFMLENBQXFCLElBQXJCLENBRFEsRTtBQUVoQixrQkFGZ0IsRTtBQUdoQixrQkFBVTtBQUhNLE9BQWxCO0FBS0EsVUFBTSxZQUFZLE9BQU8sS0FBSyxlQUFMLENBQXFCLFNBQTVCLENBQWxCO1VBQ0UsVUFBVSxPQUFPLEtBQUssZUFBTCxDQUFxQixPQUE1QixDQURaO1VBRUUsU0FBUyxLQUFLLGNBQUwsRUFGWDs7QUFJQSxVQUFJLGdCQUFnQixJQUFJLEtBQUosQ0FBVSxNQUFWLEVBQWtCLElBQWxCLENBQXVCLENBQXZCLENBQXBCO1VBQ0UsbUJBQW1CLEVBRHJCOztBQUdBLGVBQVMsT0FBVCxDQUFpQixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9CO0FBQ25DLFlBQU0sT0FBTyxRQUFRLEtBQVIsQ0FBYyxHQUFkLENBQWtCO0FBQUEsaUJBQVEsS0FBSyxLQUFiO0FBQUEsU0FBbEIsQ0FBYjtZQUNFLE1BQU0sS0FBSyxNQUFMLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLGlCQUFVLElBQUksQ0FBZDtBQUFBLFNBQVosQ0FEUjs7QUFHQSxlQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBeUIsSUFBekIsQ0FBOEI7QUFDNUIsb0JBRDRCO0FBRTVCLGlCQUFPLFFBQVEsS0FGYTtBQUc1QixtQkFBUyxRQUFRLE9BSFc7QUFJNUIsa0JBSjRCO0FBSzVCLG1CQUFTLE1BQU0sTUFMYTtBQU01QjtBQU40QixTQUE5Qjs7Ozs7OztBQUptQywyQkFpQkMsT0FBSyxXQUFMLENBQWlCLFFBQVEsS0FBekIsRUFBZ0MsU0FBaEMsRUFBMkMsT0FBM0MsQ0FqQkQ7O0FBQUE7O0FBQUEsWUFpQjVCLFFBakI0QjtBQUFBLFlBaUJsQixlQWpCa0I7O0FBa0JuQyx3QkFBZ0IsT0FBaEIsQ0FBd0IsZ0JBQVE7QUFDOUIsY0FBSSxDQUFDLGlCQUFpQixRQUFqQixDQUEwQixJQUExQixDQUFMLEVBQXNDLGlCQUFpQixJQUFqQixDQUFzQixJQUF0QjtBQUN2QyxTQUZEOztBQUlBLHdCQUFnQixjQUFjLEdBQWQsQ0FBa0IsVUFBQyxHQUFELEVBQU0sQ0FBTjtBQUFBLGlCQUFZLE1BQU0sU0FBUyxDQUFULEVBQVksS0FBOUI7QUFBQSxTQUFsQixDQUFoQjtBQUNELE9BdkJEOztBQXlCQSxVQUFNLFdBQVcsY0FBYyxNQUFkLENBQXFCLFVBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxlQUFVLENBQUMsS0FBSyxDQUFOLEtBQVksS0FBSyxDQUFqQixDQUFWO0FBQUEsT0FBckIsQ0FBakI7O0FBRUEsYUFBTyxNQUFQLENBQWMsS0FBSyxVQUFuQixFQUErQjtBQUM3QixrQkFBVSxDQUFDO0FBQ1Qsc0JBRFM7QUFFVCxnQkFBTSxhQUZHO0FBR1QsZUFBSyxRQUhJO0FBSVQsbUJBQVMsV0FBVztBQUpYLFNBQUQsQ0FEbUI7QUFPN0IsMENBUDZCO0FBUTdCLGFBQUssUUFSd0IsRTtBQVM3QixpQkFBUyxXQUFXO0FBVFMsT0FBL0I7O0FBWUEsVUFBSSxpQkFBaUIsTUFBckIsRUFBNkI7QUFDM0IsWUFBTSxXQUFXLGlCQUFpQixHQUFqQixDQUFxQjtBQUFBLGlCQUFRLE9BQU8sSUFBUCxFQUFhLE1BQWIsQ0FBb0IsT0FBSyxVQUF6QixDQUFSO0FBQUEsU0FBckIsQ0FBakI7QUFDQSxhQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8scUJBQVAsRUFBOEIsU0FBUyxJQUFULEdBQWdCLElBQWhCLENBQXFCLFlBQXJCLENBQTlCLEVBQWtFLFNBQVMsTUFBM0UsQ0FBbEI7QUFDRDs7Ozs7O0FBTUQsVUFBSSxDQUFDLEtBQUssVUFBVixFQUFzQjs7QUFFcEIsc0JBQWMsR0FBZCxDQUFrQixLQUFLLFdBQUwsRUFBbEIsRUFBc0MsS0FBSyxVQUEzQyxFQUF1RCxFQUFDLEtBQUssTUFBTixFQUF2RDtBQUNEOztBQUVELGFBQU8sS0FBSyxVQUFaO0FBQ0Q7OzsrQkFFVSxFLEVBQUk7QUFDYiwrRUFBdUUsRUFBdkU7QUFDRDs7O2dDQUVXLEUsRUFBSTtBQUNkLDRCQUFtQixLQUFLLFVBQUwsQ0FBZ0IsRUFBaEIsQ0FBbkIsdUNBQXFFLEVBQXJFO0FBQ0Q7Ozs7Ozs7Ozs7Z0NBT1csRSxFQUFJO0FBQUE7O0FBQ2QsVUFBTSxNQUFNLEVBQUUsUUFBRixFQUFaO0FBQ0EsVUFBTSx5REFBdUQsRUFBdkQsNENBQU47O0FBRUEsUUFBRSxJQUFGLENBQU87QUFDTCxnQkFESztBQUVMLGtCQUFVO0FBRkwsT0FBUCxFQUdHLElBSEgsQ0FHUSxnQkFBUTtBQUNkLFlBQUksUUFBUSxPQUFPLElBQVAsQ0FBWSxLQUFLLEtBQWpCLENBQVo7O0FBRUEsWUFBSSxNQUFNLE1BQU4sR0FBZSxPQUFLLE1BQUwsQ0FBWSxRQUEvQixFQUF5QztBQUN2QyxpQkFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8seUJBQVAsRUFBa0MsT0FBSyxXQUFMLENBQWlCLEVBQWpCLENBQWxDLEVBQXdELE9BQUssWUFBTCxDQUFrQixNQUFNLE1BQXhCLENBQXhELEVBQXlGLE9BQUssTUFBTCxDQUFZLFFBQXJHLENBREY7O0FBSUEsa0JBQVEsTUFBTSxLQUFOLENBQVksQ0FBWixFQUFlLE9BQUssTUFBTCxDQUFZLFFBQTNCLENBQVI7QUFDRDs7QUFFRCxlQUFPLElBQUksT0FBSixDQUFZO0FBQ2pCLGNBQUksS0FBSyxFQURRO0FBRWpCLGdCQUFNLEtBQUssSUFGTTtBQUdqQixpQkFBTztBQUhVLFNBQVosQ0FBUDtBQUtELE9BbkJELEVBbUJHLElBbkJILENBbUJRLGlCQUFTO0FBQ2YsZUFBTyxJQUFJLE1BQUosQ0FDRixPQUFLLFdBQUwsQ0FBaUIsRUFBakIsQ0FERSxVQUN1QixFQUFFLElBQUYsQ0FBTyxtQkFBUCxDQUR2QixDQUFQO0FBR0QsT0F2QkQ7O0FBeUJBLGFBQU8sR0FBUDtBQUNEOzs7Ozs7Ozs7O3VDQU9rQixHLEVBQUs7QUFDdEIsVUFBSSxnQkFBSjs7QUFFQSxVQUFJLElBQUksUUFBSixDQUFhLEdBQWIsQ0FBSixFQUF1QjtBQUNyQixrQkFBVSxJQUFJLEtBQUosQ0FBVSwrQ0FBVixDQUFWO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsa0JBQVUsSUFBSSxLQUFKLENBQVUsZ0NBQVYsQ0FBVjtBQUNEOztBQUVELGFBQU8sVUFBVSxRQUFRLEtBQVIsQ0FBYyxDQUFkLENBQVYsR0FBNkIsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFwQztBQUNEOzs7Ozs7Ozs7O2dDQU9XO0FBQUE7O0FBQ1YsVUFBSSxTQUFTLEtBQUssY0FBTCxDQUNYLEtBQUssZ0JBQUwsRUFEVyxDQUFiO0FBR0EsV0FBSyxpQkFBTCxDQUF1QixNQUF2Qjs7QUFFQSxXQUFLLFVBQUw7O0FBRUEsV0FBSyxpQkFBTCxDQUF1QixpQ0FBK0IsT0FBTyxNQUF0QyxRQUFpRCxDQUFqRCxDQUF2Qjs7O0FBR0EsVUFBSSxPQUFPLE1BQVgsRUFBbUI7QUFDakIsVUFBRSxLQUFLLE1BQUwsQ0FBWSxXQUFkLEVBQTJCLEdBQTNCLENBQStCLG1CQUFtQixPQUFPLE1BQTFCLEVBQWtDLE9BQWxDLEVBQS9CO0FBQ0Q7Ozs7O0FBS0QsVUFBSSxFQUFFLDRCQUFGLEVBQWdDLE1BQXBDLEVBQTRDO0FBQzFDLGVBQU8sT0FBTyxNQUFkO0FBQ0QsT0FGRCxNQUVPLElBQUksT0FBTyxRQUFQLElBQW1CLE9BQU8sTUFBUCxLQUFrQixVQUFyQyxJQUFtRCxPQUFPLE1BQTlELEVBQXNFOzs7Ozs7QUFNM0UsYUFBSyxhQUFMLENBQ0UsTUFERixFQUVFLEVBQUUsSUFBRixDQUFPLG9CQUFQLEVBQTZCLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBN0IsRUFBOEMsRUFBOUMsRUFBa0QsS0FBSyxXQUFMLENBQWlCLE9BQU8sTUFBeEIsQ0FBbEQsQ0FGRixFQUdFLEVBSEYsRUFJRSxJQUpGO0FBTUQ7O0FBRUQsUUFBRSxLQUFLLE1BQUwsQ0FBWSxnQkFBZCxFQUFnQyxHQUFoQyxDQUFvQyxPQUFPLFFBQTNDO0FBQ0EsUUFBRSxLQUFLLE1BQUwsQ0FBWSxhQUFkLEVBQTZCLEdBQTdCLENBQWlDLE9BQU8sS0FBeEM7OztBQUdBLE9BQUMsTUFBRCxFQUFTLFdBQVQsRUFBc0IsTUFBdEIsRUFBOEIsUUFBOUIsRUFBd0MsYUFBeEMsRUFBdUQsT0FBdkQsQ0FBK0QsZUFBTztBQUNwRSxlQUFLLEdBQUwsSUFBWSxPQUFPLEdBQVAsQ0FBWjtBQUNELE9BRkQ7O0FBSUEsVUFBSSxDQUFDLE9BQU8sTUFBUCxLQUFrQixRQUFsQixJQUE4QixPQUFPLE1BQVAsS0FBa0IsZUFBakQsS0FBcUUsT0FBTyxPQUFoRixFQUF5RjtBQUN2RixVQUFFLGdCQUFGLEVBQW9CLEdBQXBCLENBQXdCLE9BQU8sT0FBL0I7QUFDRDs7QUFFRCxVQUFJLE9BQU8sV0FBUCxLQUF1QixHQUEzQixFQUFnQztBQUM5QixVQUFFLGlDQUFGLEVBQXFDLElBQXJDLENBQTBDLFNBQTFDLEVBQXFELElBQXJEO0FBQ0Q7OztBQUdELFVBQUksT0FBTyxNQUFYLEVBQW1CO0FBQ2pCLGFBQUssWUFBTDtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7NkJBVVEsSyxFQUFPLEUsRUFBSTtBQUNsQixRQUFFLE1BQUYsRUFBVSxXQUFWLENBQXNCLEtBQUssTUFBTCxDQUFZLFVBQVosQ0FBdUIsSUFBdkIsQ0FBNEIsR0FBNUIsQ0FBdEIsRUFBd0QsUUFBeEQsQ0FBaUUsS0FBakU7O0FBRUEsY0FBUSxLQUFSO0FBQ0EsYUFBSyxTQUFMO0FBQ0UsZUFBSyxpQkFBTCxDQUF1QixDQUF2QjtBQUNBLGVBQUssYUFBTDtBQUNBLGVBQUssY0FBTDtBQUNBLGVBQUssWUFBTDtBQUNBLFlBQUUsUUFBRixFQUFZLFdBQVosQ0FBd0IsV0FBeEIsRUFBcUMsV0FBckMsQ0FBaUQsWUFBakQ7QUFDQSxZQUFFLGFBQUYsRUFBaUIsUUFBakIsQ0FBMEIsV0FBMUI7QUFDQSxjQUFJLEtBQUssU0FBVCxFQUFvQixLQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQ3BCLFlBQUUsS0FBSyxNQUFMLENBQVksV0FBZCxFQUEyQixHQUEzQixDQUErQixFQUEvQixFQUFtQyxLQUFuQztBQUNBLGNBQUksT0FBTyxFQUFQLEtBQWMsVUFBbEIsRUFBOEIsR0FBRyxJQUFILENBQVEsSUFBUjtBQUM5QjtBQUNGLGFBQUssWUFBTDtBQUNFLGVBQUssY0FBTDtBQUNBLGVBQUssYUFBTDtBQUNBLG1CQUFTLGFBQVQsQ0FBdUIsSUFBdkI7QUFDQSxZQUFFLGVBQUYsRUFBbUIsUUFBbkIsQ0FBNEIsUUFBNUI7QUFDQTtBQUNGLGFBQUssVUFBTDtBQUNFLGVBQUssWUFBTDs7QUFFQSxlQUFLLGlCQUFMLENBQXVCLENBQXZCO0FBQ0EsWUFBRSxlQUFGLEVBQW1CLFdBQW5CLENBQStCLFFBQS9CO0FBQ0EsWUFBRSxhQUFGLEVBQWlCLFdBQWpCLENBQTZCLFdBQTdCO0FBQ0E7QUFDRixhQUFLLFNBQUw7QUFDRTtBQTFCRjtBQTRCRDs7Ozs7Ozs7Ozs7a0NBUWEsTyxFQUFTLFksRUFBYztBQUFBOztBQUNuQyxhQUFPLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsWUFBTTtBQUNwQyxZQUFJLGdCQUFKO0FBQ0EsWUFBSSxZQUFKLEVBQWtCO0FBQ2hCLG9CQUFhLEVBQUUsSUFBRixDQUFPLFdBQVAsRUFBb0IsT0FBcEIsQ0FBYixVQUE4QyxZQUE5QztBQUNELFNBRkQsTUFFTztBQUNMLHlCQUFhLEVBQUUsSUFBRixDQUFPLG1CQUFQLEVBQTRCLE9BQTVCLENBQWI7QUFDRDtBQUNELGVBQUssWUFBTCxDQUFrQixPQUFsQjtBQUNELE9BUk0sQ0FBUDtBQVNEOzs7b0NBRWUsRSxFQUFJO0FBQUE7O0FBQ2xCLFVBQU0sU0FBUyxFQUFFLEtBQUssTUFBTCxDQUFZLFdBQWQsRUFBMkIsR0FBM0IsRUFBZjs7QUFFQSxRQUFFLG1CQUFGLEVBQXVCLElBQXZCLENBQTRCLEVBQUUsSUFBRixDQUFPLGVBQVAsRUFBd0IsZUFBeEIsQ0FBNUI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsTUFBakIsRUFBeUIsSUFBekIsQ0FBOEIsb0JBQVk7QUFDeEMsWUFBSSxDQUFDLFNBQVMsS0FBVCxDQUFlLE1BQXBCLEVBQTRCO0FBQzFCLGlCQUFPLFFBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsWUFBTTtBQUNwQyxvQkFBSyxZQUFMLENBQWtCLEVBQUUsSUFBRixDQUFPLHFCQUFQLEVBQThCLFFBQUssV0FBTCxDQUFpQixNQUFqQixDQUE5QixDQUFsQjtBQUNELFdBRk0sQ0FBUDtBQUdEOzs7QUFHRCxZQUFNLFVBQVUsUUFBUSxTQUFTLElBQWpCLENBQWhCOzs7Ozs7QUFNQSxZQUFJLFlBQVksa0JBQWhCLEVBQW9DO0FBQ2xDLG1CQUFTLEtBQVQsR0FBaUIsU0FBUyxLQUFULENBQWUsR0FBZixDQUFtQixnQkFBUTtBQUMxQyxtQkFBTyxLQUFLLE9BQUwsQ0FBYSxxQkFBYixFQUFvQyxZQUFwQyxDQUFQO0FBQ0QsV0FGZ0IsQ0FBakI7QUFHRDs7QUFFRCxnQkFBSyxnQkFBTCxDQUFzQixTQUFTLEtBQS9CLEVBQXNDLE9BQXRDLEVBQStDLElBQS9DLENBQW9ELHlCQUFpQjtBQUNuRSxjQUFNLHdCQUFzQixTQUFTLEVBQXJDOztBQUVBLFlBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixLQUF4QixFQUErQixJQUEvQixDQUFvQyxNQUFwQyxFQUE0QyxRQUFLLFVBQUwsQ0FBZ0IsU0FBUyxFQUF6QixDQUE1QztBQUNBLFlBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsa0JBRUksRUFBRSxRQUFLLE1BQUwsQ0FBWSxpQkFBZCxFQUFpQyxHQUFqQyxFQUZKLHdEQUlxQixRQUFRLE1BQVIsRUFKckIsd0NBS00sUUFBUSxPQUFSLENBQWdCLE9BQWhCLEVBQXlCLEVBQXpCLEVBQTZCLE1BQTdCLEVBTE47O0FBVUEsYUFBRyxLQUFILEVBQVUsUUFBSyxXQUFMLENBQWlCLFNBQVMsRUFBMUIsQ0FBVixFQUF5QyxhQUF6QztBQUNELFNBZkQ7QUFnQkQsT0FwQ0QsRUFvQ0csSUFwQ0gsQ0FvQ1EsaUJBQVM7QUFDZixnQkFBSyxRQUFMLENBQWMsU0FBZDs7O0FBR0EsWUFBSSxPQUFPLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0Isa0JBQUssWUFBTCxDQUFrQixLQUFsQjtBQUNELFNBRkQsTUFFTztBQUNMLGtCQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8sbUJBQVAsRUFBNEIsV0FBNUIsQ0FBbEI7QUFDRDtBQUNGLE9BN0NEO0FBOENEOzs7b0NBRWUsTyxFQUFTLFEsRUFBVSxFLEVBQUk7QUFBQTs7QUFDckMsVUFBSSxjQUFjO0FBQ2hCLGNBQU0saUJBRFU7QUFFaEIsaUJBQVMsR0FGTztBQUdoQixpQkFBUyxRQUhPO0FBSWhCLGNBQU0sY0FKVTtBQUtoQixnQkFBUTtBQUxRLE9BQWxCOztBQVFBLFVBQU0sZUFBZSxLQUFLLFdBQUwsQ0FBaUIsUUFBakIsRUFBMkIsT0FBM0IsQ0FBckI7O0FBRUEsUUFBRSxtQkFBRixFQUF1QixJQUF2QixDQUE0QixFQUFFLElBQUYsQ0FBTyxlQUFQLEVBQXdCLGNBQXhCLENBQTVCO0FBQ0EsV0FBSyxPQUFMLENBQWEsV0FBYixFQUEwQixPQUExQixFQUFtQyxZQUFuQyxFQUFpRCxpQkFBakQsRUFBb0UsSUFBcEUsQ0FBeUUsZ0JBQVE7QUFDL0UsWUFBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZCxpQkFBTyxRQUFLLGFBQUwsQ0FBbUIsY0FBbkIsRUFBbUMsS0FBSyxLQUFMLENBQVcsSUFBOUMsQ0FBUDtBQUNEOztBQUVELFlBQU0sVUFBVSxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQWhCOztBQUVBLFlBQUksUUFBUSxPQUFaLEVBQXFCO0FBQ25CLGlCQUFPLFFBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsWUFBTTtBQUNwQyxvQkFBSyxZQUFMLENBQWtCLEVBQUUsSUFBRixDQUFPLG1CQUFQLENBQWxCO0FBQ0QsV0FGTSxDQUFQO0FBR0Q7O0FBRUQsWUFBTSxPQUFPLFFBQVEsWUFBUixDQUFxQixJQUFsQzs7OztBQUdFLHFCQUFhLFFBQUssV0FBTCxDQUFpQixPQUFqQixJQUE0QixRQUFLLFdBQUwsQ0FBaUIsT0FBakIsRUFBMEIsVUFBdEQsR0FBbUUsU0FIbEY7QUFJQSxZQUFJLFFBQVEsS0FBSyxlQUFqQjs7QUFFQSxZQUFJLENBQUMsTUFBTSxNQUFYLEVBQW1CO0FBQ2pCLGlCQUFPLFFBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsWUFBTTtBQUNwQyxvQkFBSyxZQUFMLENBQWtCLEVBQUUsSUFBRixDQUFPLHFCQUFQLEVBQThCLFlBQTlCLENBQWxCO0FBQ0QsV0FGTSxDQUFQO0FBR0Q7O0FBRUQsWUFBSSxPQUFPLFFBQUssTUFBTCxDQUFZLFFBQXZCLEVBQWlDO0FBQy9CLGtCQUFLLFlBQUwsQ0FDRSxFQUFFLElBQUYsQ0FBTyx5QkFBUCxFQUFrQyxZQUFsQyxFQUFnRCxRQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBaEQsRUFBeUUsUUFBSyxNQUFMLENBQVksUUFBckYsQ0FERjs7QUFJQSxrQkFBUSxNQUFNLEtBQU4sQ0FBWSxDQUFaLEVBQWUsUUFBSyxNQUFMLENBQVksUUFBM0IsQ0FBUjtBQUNEOztBQUVELFlBQU0sWUFBWSxRQUFLLG9CQUFMLENBQTBCLEtBQTFCLEVBQWlDLFVBQWpDLENBQWxCOztBQUVBLGdCQUFLLGdCQUFMLENBQXNCLFNBQXRCLEVBQWlDLE9BQWpDLEVBQTBDLElBQTFDLENBQStDLHlCQUFpQjtBQUM5RCxhQUFHLFFBQUgsRUFBYSxZQUFiLEVBQTJCLGFBQTNCO0FBQ0QsU0FGRDtBQUdELE9BdENELEVBc0NHLElBdENILENBc0NRLGdCQUFRO0FBQ2QsZ0JBQUssUUFBTCxDQUFjLFNBQWQ7OztBQUdBLFlBQUksUUFBUSxPQUFPLEtBQUssS0FBWixLQUFzQixRQUFsQyxFQUE0QztBQUMxQyxrQkFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUFvQixlQUFlLElBQWYsR0FBc0IsS0FBSyxLQUEvQyxDQURGO0FBR0QsU0FKRCxNQUlPO0FBQ0wsa0JBQUssWUFBTCxDQUFrQixFQUFFLElBQUYsQ0FBTyxtQkFBUCxFQUE0QixZQUE1QixDQUFsQjtBQUNEO0FBQ0YsT0FqREQ7QUFrREQ7OzttQ0FFYyxFLEVBQUk7QUFBQTs7QUFDakIsVUFBTSxVQUFVLEVBQUUsS0FBSyxNQUFMLENBQVksV0FBZCxFQUEyQixHQUEzQixHQUFpQyxPQUFqQyxDQUF5QyxJQUF6QyxFQUErQyxFQUEvQyxDQUFoQjtVQUNFLHFGQUFtRixPQUFuRixXQUFnRyxRQUFRLE1BQVIsRUFBaEcsU0FERjs7QUFHQSxRQUFFLG1CQUFGLEVBQXVCLElBQXZCLENBQTRCLEVBQUUsSUFBRixDQUFPLGVBQVAsRUFBd0IsYUFBeEIsQ0FBNUI7QUFDQSxRQUFFLEdBQUYsNENBQStDLE9BQS9DLGtCQUFxRSxJQUFyRSxDQUEwRSxnQkFBUTs7Ozs7QUFLaEYsWUFBTSxlQUFlLEdBQXJCOzs7QUFHQSxZQUFNLGFBQWEsSUFBSSxNQUFKOztBQUdmLGdCQUFNLFlBQU47O0FBRUEseUNBRkE7O0FBQUEsbUJBSVUsWUFKVixnQkFIZSxFQVNqQixJQVRpQixDQUFuQjs7O0FBYUEsWUFBSSxVQUFVLENBQUMsRUFBRCxDQUFkOzs7O0FBSUEsWUFBSSxtQkFBSjs7O0FBR0EsZUFBTyxhQUFhLFdBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFwQixFQUEyQzs7QUFFekMsY0FBTSxzQkFBc0IsV0FBVyxDQUFYLENBQTVCOzs7Ozs7QUFNQSxjQUFJLG9CQUFvQixNQUFwQixJQUE4Qix3QkFBd0IsWUFBMUQsRUFBd0U7O0FBRXRFLG9CQUFRLElBQVIsQ0FBYSxFQUFiO0FBQ0Q7O0FBRUQsY0FBSSx3QkFBSjs7Ozs7QUFLQSxjQUFJLFdBQVcsQ0FBWCxDQUFKLEVBQW1COzs7QUFHakIsOEJBQWtCLFdBQVcsQ0FBWCxFQUFjLE9BQWQsQ0FDaEIsSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixHQUFuQixDQURnQixFQUNTLElBRFQsQ0FBbEI7QUFHRCxXQU5ELE1BTU87O0FBRUwsOEJBQWtCLFdBQVcsQ0FBWCxDQUFsQjtBQUNEOzs7QUFHRCxrQkFBUSxRQUFRLE1BQVIsR0FBaUIsQ0FBekIsRUFBNEIsSUFBNUIsQ0FBaUMsZUFBakM7QUFDRDs7O0FBR0QsWUFBSSxRQUFRLFFBQVEsTUFBUixHQUFpQixDQUF6QixFQUE0QixNQUE1QixLQUF1QyxDQUF2QyxJQUE0QyxDQUFDLFFBQVEsUUFBUSxNQUFSLEdBQWlCLENBQXpCLEVBQTRCLENBQTVCLENBQWpELEVBQWlGO0FBQy9FLG9CQUFVLFFBQVEsS0FBUixDQUFjLENBQWQsRUFBaUIsQ0FBQyxDQUFsQixDQUFWO0FBQ0Q7OztBQUdELFlBQUksUUFBUSxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGlCQUFPLFFBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsWUFBTTtBQUNwQyxvQkFBSyxZQUFMLENBQWtCLEVBQUUsSUFBRixDQUFPLHFCQUFQLEVBQThCLFdBQTlCLENBQWxCO0FBQ0QsV0FGTSxDQUFQO0FBR0Q7OztBQUdELGdCQUFLLHlCQUFMLENBQStCLE9BQS9CLEVBQXdDLElBQXhDLENBQTZDLG9CQUFZO0FBQ3ZELGNBQU0sT0FBTyxTQUFTLE1BQXRCOztBQUVBLGNBQUksT0FBTyxRQUFLLE1BQUwsQ0FBWSxRQUF2QixFQUFpQztBQUMvQixvQkFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8seUJBQVAsRUFBa0MsV0FBbEMsRUFBK0MsUUFBSyxZQUFMLENBQWtCLElBQWxCLENBQS9DLEVBQXdFLFFBQUssTUFBTCxDQUFZLFFBQXBGLENBREY7O0FBSUEsdUJBQVcsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixRQUFLLE1BQUwsQ0FBWSxRQUE5QixDQUFYO0FBQ0Q7O0FBRUQsa0JBQUssZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBZ0MsSUFBaEMsQ0FBcUMseUJBQWlCO0FBQ3BELGVBQUcsT0FBSCxFQUFZLFdBQVosRUFBeUIsYUFBekI7QUFDRCxXQUZEO0FBR0QsU0FkRCxFQWNHLElBZEgsQ0FjUTtBQUFBLGlCQUFNLFFBQUssYUFBTCxDQUFtQixjQUFuQixDQUFOO0FBQUEsU0FkUjtBQWVELE9BekZELEVBeUZHLElBekZILENBeUZRO0FBQUEsZUFBTSxRQUFLLGFBQUwsQ0FBbUIsYUFBbkIsQ0FBTjtBQUFBLE9BekZSO0FBMEZEOzs7Ozs7Ozs7OzhDQU95QixPLEVBQVM7QUFBQTs7QUFDakMsVUFBTSxNQUFNLEVBQUUsUUFBRixFQUFaOzs7QUFHQSxVQUFNLGlCQUFpQixRQUFRLENBQVIsRUFBVyxPQUFYLENBQW1CLGNBQW5CLENBQXZCO1VBQ0UsaUJBQWlCLFFBQVEsQ0FBUixFQUFXLE9BQVgsQ0FBbUIsY0FBbkIsQ0FEbkI7VUFFRSxZQUFZLFFBQVEsQ0FBUixFQUFXLE9BQVgsQ0FBbUIsVUFBbkIsQ0FGZDs7QUFJQSxVQUFJLFdBQVcsRUFBZjs7O0FBR0EsY0FBUSxLQUFSLENBQWMsQ0FBZCxFQUFpQixPQUFqQixDQUF5QixpQkFBUztBQUNoQyxZQUFNLFVBQVUsTUFBTSxTQUFOLEVBQWlCLEtBQWpCLENBQXVCLHdCQUF2QixFQUFpRCxDQUFqRCxDQUFoQjs7O0FBR0EsZ0JBQUssYUFBTCxDQUFtQixPQUFuQixFQUE0QixJQUE1QixDQUFpQyxZQUFNO0FBQ3JDLGNBQU0sU0FBUyxRQUFLLFdBQUwsQ0FBaUIsT0FBakIsRUFBMEIsVUFBMUIsQ0FBcUMsTUFBTSxjQUFOLENBQXJDLEVBQTRELEdBQTVELENBQWY7QUFDQSxtQkFBUyxJQUFULGNBQ2EsT0FEYixlQUM2QixDQUFDLENBQUMsTUFBRixHQUFXLFNBQVMsR0FBcEIsR0FBMEIsRUFEdkQsSUFDNEQsTUFBTSxjQUFOLENBRDVEOzs7QUFLQSxjQUFJLFNBQVMsTUFBVCxLQUFvQixRQUFRLE1BQVIsR0FBaUIsQ0FBekMsRUFBNEM7QUFDMUMsZ0JBQUksT0FBSixDQUFZLFNBQVMsTUFBVCxFQUFaO0FBQ0Q7QUFDRixTQVZELEVBVUcsSUFWSCxDQVVRLFlBQU07QUFDWixjQUFJLE1BQUo7QUFDRCxTQVpEO0FBYUQsT0FqQkQ7O0FBbUJBLGFBQU8sR0FBUDtBQUNEOzs7b0NBRWUsTyxFQUFTLFUsRUFBWSxFLEVBQUk7QUFBQTtVQUFBOzs7QUFFdkMsVUFBTSxxQkFBcUIsV0FBVyxPQUFYLEVBQTNCO0FBQ0EsVUFBSSxZQUFZLENBQWhCO1VBQW1CLHdCQUFuQjtBQUNBLFdBQUssSUFBTSxFQUFYLElBQWlCLEtBQUssV0FBTCxDQUFpQixPQUFqQixFQUEwQixVQUEzQyxFQUF1RDtBQUNyRCxZQUFJLE9BQU8sR0FBWCxFQUFnQixTOztBQUVoQixZQUFNLFNBQVMsS0FBSyxXQUFMLENBQWlCLE9BQWpCLEVBQTBCLFVBQTFCLENBQXFDLEVBQXJDLEVBQXlDLEdBQXpDLElBQWdELEdBQS9EO0FBQ0EsWUFBSSxtQkFBbUIsVUFBbkIsQ0FBOEIsTUFBOUIsQ0FBSixFQUEyQztBQUN6QyxzQkFBWSxLQUFLLFdBQUwsQ0FBaUIsT0FBakIsRUFBMEIsVUFBMUIsQ0FBcUMsRUFBckMsRUFBeUMsRUFBckQ7QUFDQSw0QkFBa0IsV0FBVyxTQUFYLENBQXFCLE9BQU8sTUFBNUIsQ0FBbEI7QUFDRDtBQUNGOzs7QUFHRCxVQUFNLG1CQUFtQixZQUFZLENBQVosS0FBa0IsQ0FBbEIsR0FBc0IsWUFBWSxDQUFsQyxHQUFzQyxZQUFZLENBQTNFOztBQUVBLFVBQUksV0FBVyxFQUFmOztBQUVBLFFBQUUsbUJBQUYsRUFBdUIsSUFBdkIsQ0FBNEIsRUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixjQUF4QixDQUE1QjtBQUNBLE9BQUMsU0FBRCxFQUFZLGdCQUFaLEVBQThCLE9BQTlCLENBQXNDLHVCQUFlO0FBQ25ELFlBQU0sU0FBUztBQUNiLGdCQUFNLFVBRE87QUFFYixtQkFBUyxHQUZJO0FBR2Isa0NBSGE7QUFJYixvQkFBVSxrQkFBa0I7QUFKZixTQUFmO0FBTUEsaUJBQVMsSUFBVCxDQUNFLFFBQUssT0FBTCxDQUFhLE1BQWIsRUFBcUIsT0FBckIsRUFBOEIsWUFBOUIsRUFBNEMsVUFBNUMsQ0FERjtBQUdELE9BVkQ7O0FBWUEsVUFBTSxXQUFXLEtBQUssV0FBTCxDQUFpQixVQUFqQixFQUE2QixPQUE3QixDQUFqQjs7QUFFQSxnQkFBRSxJQUFGLFlBQVUsUUFBVixFQUFvQixJQUFwQixDQUF5QixVQUFDLElBQUQsRUFBTyxLQUFQLEVBQWlCOztBQUV4QyxZQUFNLFNBQVMsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLE1BQWQsQ0FBcUI7QUFBQSxpQkFBUSxDQUFDLENBQUMsS0FBSyxLQUFmO0FBQUEsU0FBckIsQ0FBZjtBQUNBLFlBQUksT0FBTyxNQUFYLEVBQW1CO0FBQ2pCLGtCQUFLLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLFlBQU07QUFDN0IsbUJBQU8sT0FBUCxDQUFlLGlCQUFTO0FBQ3RCLHNCQUFLLFlBQUwsQ0FDSyxFQUFFLElBQUYsQ0FBTyxXQUFQLEVBQW9CLGNBQXBCLENBREwsVUFDNkMsTUFBTSxLQUFOLENBQVksSUFBWixDQUFpQixNQUFqQixFQUQ3QztBQUdELGFBSkQ7QUFLRCxXQU5EO0FBT0EsaUJBQU8sS0FBUDtBQUNEOztBQUVELFlBQUksUUFBUSxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLE1BQU0sUUFBM0IsQ0FBWjtBQUNBLFlBQU0sT0FBTyxNQUFNLE1BQW5COztBQUVBLFlBQUksU0FBUyxDQUFiLEVBQWdCO0FBQ2QsaUJBQU8sUUFBSyxRQUFMLENBQWMsU0FBZCxFQUF5QixZQUFNO0FBQ3BDLG9CQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8sbUJBQVAsQ0FBbEI7QUFDRCxXQUZNLENBQVA7QUFHRDs7QUFFRCxZQUFJLE9BQU8sUUFBSyxNQUFMLENBQVksUUFBdkIsRUFBaUM7QUFDL0Isa0JBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLHlCQUFQLEVBQWtDLFFBQWxDLEVBQTRDLFFBQUssWUFBTCxDQUFrQixJQUFsQixDQUE1QyxFQUFxRSxRQUFLLE1BQUwsQ0FBWSxRQUFqRixDQURGOztBQUlBLGtCQUFRLE1BQU0sS0FBTixDQUFZLENBQVosRUFBZSxRQUFLLE1BQUwsQ0FBWSxRQUEzQixDQUFSO0FBQ0Q7O0FBRUQsWUFBTSxZQUFZLENBQUMsVUFBRCxFQUFhLE1BQWIsQ0FBb0IsTUFBTSxHQUFOLENBQVU7QUFBQSxpQkFBUSxLQUFLLEtBQWI7QUFBQSxTQUFWLENBQXBCLENBQWxCOztBQUVBLGdCQUFLLGdCQUFMLENBQXNCLFNBQXRCLEVBQWlDLE9BQWpDLEVBQTBDLElBQTFDLENBQStDLHlCQUFpQjtBQUM5RCxhQUFHLFVBQUgsRUFBZSxRQUFmLEVBQXlCLGFBQXpCO0FBQ0QsU0FGRDtBQUdELE9BcENELEVBb0NHLElBcENILENBb0NRLGdCQUFRO0FBQ2QsZ0JBQUssUUFBTCxDQUFjLFNBQWQ7OztBQUdBLFlBQUksUUFBUSxPQUFPLEtBQUssS0FBWixLQUFzQixRQUFsQyxFQUE0QztBQUMxQyxrQkFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUFvQixXQUFXLElBQVgsR0FBa0IsS0FBSyxLQUEzQyxDQURGO0FBR0QsU0FKRCxNQUlPO0FBQ0wsa0JBQUssWUFBTCxDQUFrQixFQUFFLElBQUYsQ0FBTyxtQkFBUCxFQUE0QixRQUE1QixDQUFsQjtBQUNEO0FBQ0YsT0EvQ0Q7QUFnREQ7OztvQ0FFZSxPLEVBQVMsUSxFQUFVLEUsRUFBSTtBQUFBOztBQUNyQyxVQUFJLGNBQWM7QUFDaEIsY0FBTSxlQURVO0FBRWhCLGlCQUFTLEdBRk87QUFHaEIsZ0JBQVE7QUFIUSxPQUFsQjs7QUFNQSxVQUFNLGVBQWUsS0FBSyxXQUFMLENBQWlCLFFBQWpCLEVBQTJCLE9BQTNCLENBQXJCOztBQUVBLFFBQUUsbUJBQUYsRUFBdUIsSUFBdkIsQ0FBNEIsRUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixrQkFBeEIsQ0FBNUI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLE9BQTFCLEVBQW1DLFlBQW5DLEVBQWlEO0FBQUEsZUFBUSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsYUFBdEI7QUFBQSxPQUFqRCxFQUFzRixJQUF0RixDQUEyRixnQkFBUTtBQUNqRyxZQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLGlCQUFPLFFBQUssYUFBTCxDQUFtQixrQkFBbkIsRUFBdUMsS0FBSyxLQUFMLENBQVcsSUFBbEQsQ0FBUDtBQUNEOzs7QUFHRCxZQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUFMLEVBQW9CO0FBQ2xCLGlCQUFPLFFBQUssUUFBTCxDQUFjLFNBQWQsRUFBeUIsWUFBTTtBQUNwQyxvQkFBSyxZQUFMLENBQWtCLEVBQUUsSUFBRixDQUFPLG1CQUFQLENBQWxCO0FBQ0QsV0FGTSxDQUFQO0FBR0Q7O0FBRUQsWUFBTSxRQUFRLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZTtBQUFBLGlCQUFRLEtBQUssS0FBYjtBQUFBLFNBQWYsQ0FBZDs7O0FBR0EsWUFBSSxLQUFLLFFBQVQsRUFBbUI7QUFDakIsa0JBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLGlDQUFQLEVBQTBDLFlBQTFDLEVBQXdELFFBQUssTUFBTCxDQUFZLFFBQXBFLENBREY7QUFHRDs7QUFFRCxnQkFBSyxnQkFBTCxDQUFzQixLQUF0QixFQUE2QixPQUE3QixFQUFzQyxJQUF0QyxDQUEyQyx5QkFBaUI7QUFDMUQsYUFBRyxRQUFILEVBQWEsWUFBYixFQUEyQixhQUEzQjtBQUNELFNBRkQ7QUFHRCxPQXhCRCxFQXdCRyxJQXhCSCxDQXdCUSxnQkFBUTtBQUNkLGdCQUFLLFFBQUwsQ0FBYyxTQUFkOzs7QUFHQSxZQUFJLFFBQVEsT0FBTyxLQUFLLEtBQVosS0FBc0IsUUFBbEMsRUFBNEM7QUFDMUMsa0JBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLFdBQVAsRUFBb0IsZUFBZSxJQUFmLEdBQXNCLEtBQUssS0FBL0MsQ0FERjtBQUdELFNBSkQsTUFJTztBQUNMLGtCQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8sbUJBQVAsRUFBNEIsWUFBNUIsQ0FBbEI7QUFDRDtBQUNGLE9BbkNEO0FBb0NEOzs7b0NBRWUsTyxFQUFTLEksRUFBTSxFLEVBQUk7QUFBQTs7QUFDakMsVUFBSSxjQUFjO0FBQ2hCLGlCQUFTLEdBRE87QUFFaEIsY0FBTSxPQUZVO0FBR2hCLGdCQUFRO0FBSFEsT0FBbEI7O0FBTUEsVUFBTSxXQUFXLEtBQUssV0FBTCxDQUFpQixJQUFqQixFQUF1QixPQUF2QixDQUFqQjs7QUFFQSxRQUFFLG1CQUFGLEVBQXVCLElBQXZCLENBQTRCLEVBQUUsSUFBRixDQUFPLGVBQVAsRUFBd0IsV0FBeEIsQ0FBNUI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLE9BQTFCLEVBQW1DLFlBQW5DLEVBQWlEO0FBQUEsZUFBUSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsS0FBdEI7QUFBQSxPQUFqRCxFQUE4RSxJQUE5RSxDQUFtRixnQkFBUTtBQUN6RixZQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLGlCQUFPLFFBQUssYUFBTCxDQUFtQixXQUFuQixFQUFnQyxLQUFLLEtBQUwsQ0FBVyxJQUEzQyxDQUFQO0FBQ0Q7OztBQUdELFlBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQUwsRUFBb0I7QUFDbEIsaUJBQU8sUUFBSyxRQUFMLENBQWMsU0FBZCxFQUF5QixZQUFNO0FBQ3BDLG9CQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8sbUJBQVAsQ0FBbEI7QUFDRCxXQUZNLENBQVA7QUFHRDs7QUFFRCxZQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlO0FBQUEsaUJBQVEsS0FBSyxLQUFiO0FBQUEsU0FBZixDQUFkOztBQUVBLFlBQUksQ0FBQyxNQUFNLE1BQVgsRUFBbUI7QUFDakIsaUJBQU8sUUFBSyxRQUFMLENBQWMsU0FBZCxFQUF5QixZQUFNO0FBQ3BDLG9CQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8scUJBQVAsRUFBOEIsUUFBOUIsQ0FBbEI7QUFDRCxXQUZNLENBQVA7QUFHRDs7OztBQUlELFlBQUksS0FBSyxRQUFULEVBQW1CO0FBQ2pCLGtCQUFLLFlBQUwsQ0FDRSxFQUFFLElBQUYsQ0FBTyxpQ0FBUCxFQUEwQyxRQUExQyxFQUFvRCxRQUFLLE1BQUwsQ0FBWSxRQUFoRSxDQURGO0FBR0Q7O0FBRUQsZ0JBQUssZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkIsT0FBN0IsRUFBc0MsSUFBdEMsQ0FBMkMseUJBQWlCO0FBQzFELGFBQUcsSUFBSCxFQUFTLFFBQVQsRUFBbUIsYUFBbkI7QUFDRCxTQUZEO0FBR0QsT0EvQkQsRUErQkcsSUEvQkgsQ0ErQlEsZ0JBQVE7QUFDZCxZQUFNLGVBQWUsUUFBUSxPQUFPLEtBQUssS0FBWixLQUFzQixRQUE5QixHQUF5QyxLQUFLLEtBQTlDLEdBQXNELElBQTNFO0FBQ0EsZ0JBQUssYUFBTCxDQUFtQixXQUFuQixFQUFnQyxZQUFoQztBQUNELE9BbENEO0FBbUNEOzs7a0NBRWEsRSxFQUFJO0FBQUE7O0FBQ2hCLFVBQU0sVUFBVSxFQUFFLGdCQUFGLEVBQW9CLEdBQXBCLEVBQWhCO1VBQ0UsS0FBSyxFQUFFLEtBQUssTUFBTCxDQUFZLFdBQWQsRUFBMkIsR0FBM0IsRUFEUDtBQUVBLFVBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsT0FBckIsQ0FBTCxFQUFvQzs7QUFFcEMsVUFBTSw0Q0FBMEMsRUFBMUMsMEJBQU47VUFDRSwrRUFBMEUsRUFBMUUsa0JBQXdGLEVBQXhGLFNBREY7O0FBR0EsUUFBRSxtQkFBRixFQUF1QixJQUF2QixDQUE0QixFQUFFLElBQUYsQ0FBTyxlQUFQLEVBQXdCLFlBQXhCLENBQTVCO0FBQ0EsUUFBRSxPQUFGLENBQVUsR0FBVixFQUFlLElBQWYsQ0FBb0IsZ0JBQVE7QUFDMUIsWUFBTSxhQUFhLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsWUFBckIsQ0FBbkI7O0FBRUEsWUFBSSxlQUFlLENBQUMsQ0FBcEIsRUFBdUI7QUFDckIsa0JBQUssUUFBTCxDQUFjLFNBQWQ7QUFDQSxpQkFBTyxRQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8sd0JBQVAsRUFBaUMsWUFBakMsQ0FBbEIsQ0FBUDtBQUNEOztBQUVELFlBQUksU0FBUyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWM7QUFBQSxpQkFBTyxJQUFJLFVBQUosQ0FBUDtBQUFBLFNBQWQsQ0FBYjs7QUFFQSxZQUFJLE9BQU8sTUFBUCxHQUFnQixRQUFLLE1BQUwsQ0FBWSxRQUFoQyxFQUEwQztBQUN4QyxrQkFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8seUJBQVAsRUFBa0MsVUFBbEMsRUFBOEMsUUFBSyxZQUFMLENBQWtCLE9BQU8sTUFBekIsQ0FBOUMsRUFBZ0YsUUFBSyxNQUFMLENBQVksUUFBNUYsQ0FERjs7QUFJQSxtQkFBUyxPQUFPLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLFFBQUssTUFBTCxDQUFZLFFBQTVCLENBQVQ7QUFDRDs7QUFFRCxnQkFBSyxnQkFBTCxDQUFzQixNQUF0QixFQUE4QixPQUE5QixFQUF1QyxJQUF2QyxDQUE0Qyx5QkFBaUI7QUFDM0QsYUFBRyxFQUFILEVBQU8sVUFBUCxFQUFtQixhQUFuQjtBQUNELFNBRkQ7QUFHRCxPQXJCRCxFQXFCRyxJQXJCSCxDQXFCUSxnQkFBUTtBQUNkLGdCQUFLLFFBQUwsQ0FBYyxTQUFkO0FBQ0EsZUFBTyxRQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8sbUJBQVAsRUFBNEIsWUFBNUIsQ0FBbEIsRUFBNkQsSUFBN0QsQ0FBUDtBQUNELE9BeEJEO0FBeUJEOzs7d0NBRW1CLEUsRUFBSTtBQUFBOztBQUN0QixVQUFNLFVBQVUsRUFBRSxnQkFBRixFQUFvQixHQUFwQixFQUFoQjtVQUNFLE9BQU8sRUFBRSxLQUFLLE1BQUwsQ0FBWSxXQUFkLEVBQTJCLEdBQTNCLEVBRFQ7QUFFQSxVQUFJLENBQUMsS0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQUwsRUFBb0M7O0FBRXBDLFVBQUksY0FBYztBQUNoQixjQUFNLGFBRFU7QUFFaEIsaUJBQVMsR0FGTztBQUdoQixxQkFBYSxDQUhHO0FBSWhCLGlCQUFTO0FBSk8sT0FBbEI7O0FBT0EsVUFBTSwwREFBcUQsT0FBckQsNEJBQW1GLElBQW5GLG9DQUFxSCxJQUFySCxTQUFOOztBQUVBLFFBQUUsbUJBQUYsRUFBdUIsSUFBdkIsQ0FBNEIsRUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixtQkFBeEIsQ0FBNUI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxXQUFiLEVBQTBCLE9BQTFCLEVBQW1DLFVBQW5DLEVBQStDLGFBQS9DLEVBQThELElBQTlELENBQW1FLGdCQUFRO0FBQ3pFLFlBQUksS0FBSyxLQUFULEVBQWdCO0FBQ2QsaUJBQU8sUUFBSyxhQUFMLENBQW1CLG1CQUFuQixFQUF3QyxLQUFLLEtBQUwsQ0FBVyxJQUFuRCxDQUFQO0FBQ0Q7OztBQUdELFlBQUksQ0FBQyxLQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBTCxFQUEwQjtBQUN4QixpQkFBTyxRQUFLLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLFlBQU07QUFDcEMsb0JBQUssWUFBTCxDQUFrQixFQUFFLElBQUYsQ0FBTyxtQkFBUCxDQUFsQjtBQUNELFdBRk0sQ0FBUDtBQUdEOztBQUVELFlBQU0sUUFBUSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBcUI7QUFBQSxpQkFBUSxLQUFLLEtBQWI7QUFBQSxTQUFyQixFQUF5QyxNQUF6QyxFQUFkOztBQUVBLFlBQUksQ0FBQyxNQUFNLE1BQVgsRUFBbUI7QUFDakIsaUJBQU8sUUFBSyxRQUFMLENBQWMsU0FBZCxFQUF5QixZQUFNO0FBQ3BDLG9CQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8scUJBQVAsRUFBOEIsY0FBOUIsQ0FBbEI7QUFDRCxXQUZNLENBQVA7QUFHRDs7O0FBR0QsWUFBSSxLQUFLLFFBQVQsRUFBbUI7QUFDakIsa0JBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLGlDQUFQLEVBQTBDLGNBQTFDLEVBQTBELFFBQUssTUFBTCxDQUFZLFFBQXRFLENBREY7QUFHRDs7QUFFRCxnQkFBSyxnQkFBTCxDQUFzQixLQUF0QixFQUE2QixPQUE3QixFQUFzQyxJQUF0QyxDQUEyQyx5QkFBaUI7QUFDMUQsYUFBRyxJQUFILEVBQVMsY0FBVCxFQUF5QixhQUF6QjtBQUNELFNBRkQ7QUFHRCxPQTlCRCxFQThCRyxJQTlCSCxDQThCUSxnQkFBUTtBQUNkLGdCQUFLLFFBQUwsQ0FBYyxTQUFkOzs7QUFHQSxZQUFJLFFBQVEsT0FBTyxLQUFLLEtBQVosS0FBc0IsUUFBbEMsRUFBNEM7QUFDMUMsa0JBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLFdBQVAsRUFBb0IsaUJBQWlCLElBQWpCLEdBQXdCLEtBQUssS0FBakQsQ0FERjtBQUdELFNBSkQsTUFJTztBQUNMLGtCQUFLLFlBQUwsQ0FBa0IsRUFBRSxJQUFGLENBQU8sbUJBQVAsRUFBNEIsY0FBNUIsQ0FBbEI7QUFDRDtBQUNGLE9BekNEO0FBMENEOzs7Ozs7Ozs7O29DQU9lLE8sRUFBUztBQUN2QixVQUFJLENBQUMsT0FBTCxFQUFjLE9BQU8sS0FBUDs7O0FBR2QsZ0JBQVUsUUFBUSxPQUFSLENBQWdCLFFBQWhCLEVBQTBCLEVBQTFCLENBQVY7O0FBRUEsVUFBSSxZQUFZLFFBQVosQ0FBcUIsT0FBckIsQ0FBSixFQUFtQyxPQUFPLElBQVA7O0FBRW5DLFdBQUssUUFBTCxDQUFjLFNBQWQ7QUFDQSxXQUFLLFlBQUwsQ0FDRSxFQUFFLElBQUYsQ0FBTyxpQkFBUCxtQkFBd0MsUUFBUSxNQUFSLEVBQXhDLFdBQTZELFFBQVEsTUFBUixFQUE3RCxVQURGLEVBRUUsSUFGRjs7QUFLQSxhQUFPLEtBQVA7QUFDRDs7O3lDQUVvQixLLEVBQU8sVSxFQUFZO0FBQ3RDLFVBQUksWUFBWSxFQUFoQjs7QUFFQSxZQUFNLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQixZQUFJLGNBQWMsS0FBSyxFQUFMLEdBQVUsQ0FBVixLQUFnQixDQUFsQyxFQUFxQztBQUNuQyxjQUFNLFlBQVksV0FBVyxLQUFLLEVBQWhCLEVBQW9CLFNBQXRDO0FBQ0EsY0FBTSxtQkFBbUIsV0FBVyxLQUFLLEVBQUwsR0FBVSxDQUFyQixFQUF3QixTQUF4QixJQUFxQyxFQUE5RDtBQUNBLG9CQUFVLElBQVYsQ0FBZSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLFNBQW5CLEVBQThCLGdCQUE5QixFQUFnRCxPQUFoRCxDQUF3RCxLQUF4RCxFQUErRCxFQUEvRCxDQUFmO0FBQ0QsU0FKRCxNQUlPO0FBQ0wsb0JBQVUsSUFBVixDQUFlLEtBQUssS0FBcEI7QUFDRDtBQUNGLE9BUkQ7O0FBVUEsYUFBTyxTQUFQO0FBQ0Q7Ozs7Ozs7Ozs7bUNBT2M7QUFBQTs7QUFDYixXQUFLLFFBQUwsQ0FBYyxZQUFkOztBQUVBLFVBQU0sb0JBQW9CLFNBQXBCLGlCQUFvQixHQUFNO0FBQzlCLFVBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixRQUFLLFVBQUwsQ0FBZ0IsSUFBeEM7QUFDQSxVQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLEVBQUUsUUFBSyxNQUFMLENBQVksaUJBQWQsRUFBaUMsR0FBakMsRUFBekI7QUFDQSxnQkFBSyxtQkFBTDtBQUNBLGdCQUFLLFVBQUw7QUFDRCxPQUxEOztBQU9BLFVBQUksS0FBSyxlQUFMLEVBQUosRUFBNEI7QUFDMUIsVUFBRSxlQUFGLEVBQW1CLEdBQW5CLENBQXVCLE9BQXZCLEVBQWdDLE1BQWhDO0FBQ0EsVUFBRSxtQkFBRixFQUF1QixJQUF2QixDQUE0QixFQUFFLElBQUYsQ0FBTyxlQUFQLENBQTVCO0FBQ0EsZUFBTyxXQUFXLFlBQU07QUFDdEIsa0JBQUssVUFBTCxHQUFrQixjQUFjLEdBQWQsQ0FBa0IsUUFBSyxXQUFMLEVBQWxCLENBQWxCO0FBQ0E7QUFDRCxTQUhNLEVBR0osR0FISSxDQUFQO0FBSUQ7O0FBRUQsVUFBTSxLQUFLLFNBQUwsRUFBSyxDQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWMsUUFBZCxFQUEyQjtBQUNwQyxVQUFFLGVBQUYsRUFBbUIsR0FBbkIsQ0FBdUIsT0FBdkIsRUFBZ0MsTUFBaEM7QUFDQSxVQUFFLG1CQUFGLEVBQXVCLElBQXZCLENBQTRCLEVBQUUsSUFBRixDQUFPLGtCQUFQLENBQTVCO0FBQ0EsbUJBQVcsWUFBTTtBQUNmLGtCQUFLLGtCQUFMLENBQXdCLEtBQXhCLEVBQStCLElBQS9CLEVBQXFDLFFBQXJDO0FBQ0E7QUFDRCxTQUhELEVBR0csR0FISDtBQUlELE9BUEQ7O0FBU0EsVUFBTSxTQUFTLEVBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsT0FBekIsQ0FBZjs7O0FBR0EsY0FBUSxNQUFSO0FBQ0EsYUFBSyxVQUFMO0FBQ0UsaUJBQU8sS0FBSyxlQUFMLENBQXFCLEVBQXJCLENBQVA7QUFDRixhQUFLLFFBQUw7QUFDRSxpQkFBTyxLQUFLLGFBQUwsQ0FBbUIsRUFBbkIsQ0FBUDtBQUNGLGFBQUssU0FBTDtBQUNFLGlCQUFPLEtBQUssY0FBTCxDQUFvQixFQUFwQixDQUFQO0FBQ0YsYUFBSyxlQUFMO0FBQ0UsaUJBQU8sS0FBSyxtQkFBTCxDQUF5QixFQUF6QixDQUFQO0FBUkY7Ozs7QUEvQmEsaUNBMkNXLEtBQUssa0JBQUwsQ0FBd0IsRUFBRSxLQUFLLE1BQUwsQ0FBWSxXQUFkLEVBQTJCLEdBQTNCLEVBQXhCLENBM0NYOztBQUFBOztBQUFBLFVBMkNSLE9BM0NRO0FBQUEsVUEyQ0MsTUEzQ0Q7OztBQTZDYixVQUFJLENBQUMsT0FBRCxJQUFZLENBQUMsTUFBakIsRUFBeUI7QUFDdkIsZUFBTyxLQUFLLFFBQUwsQ0FBYyxTQUFkLEVBQXlCLFlBQU07QUFDcEMsa0JBQUssWUFBTCxDQUFrQixFQUFFLElBQUYsZUFBa0IsV0FBVyxVQUFYLEdBQXdCLFVBQXhCLEdBQXFDLE1BQXZELFdBQWxCO0FBQ0QsU0FGTSxDQUFQO0FBR0QsT0FKRCxNQUlPLElBQUksQ0FBQyxLQUFLLGVBQUwsQ0FBcUIsT0FBckIsQ0FBTCxFQUFvQztBQUN6QztBQUNEOzs7QUFHRCxlQUFTLG1CQUFtQixNQUFuQixFQUEyQixPQUEzQixDQUFtQyxLQUFuQyxFQUEwQyxFQUExQyxDQUFUOztBQUVBLGNBQVEsTUFBUjtBQUNBLGFBQUssVUFBTDs7QUFFRSxjQUFJLEVBQUUsaUNBQUYsRUFBcUMsRUFBckMsQ0FBd0MsVUFBeEMsQ0FBSixFQUF5RDtBQUN2RCxpQkFBSyxhQUFMLENBQW1CLE9BQW5CLEVBQTRCLElBQTVCLENBQWlDLFlBQU07QUFDckMsc0JBQUssZUFBTCxDQUFxQixPQUFyQixFQUE4QixNQUE5QixFQUFzQyxFQUF0QztBQUNELGFBRkQ7QUFHRCxXQUpELE1BSU87QUFDTCxpQkFBSyxlQUFMLENBQXFCLE9BQXJCLEVBQThCLE1BQTlCLEVBQXNDLEVBQXRDO0FBQ0Q7QUFDRDtBQUNGLGFBQUssVUFBTDs7QUFFRSxlQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEIsSUFBNUIsQ0FBaUM7QUFBQSxtQkFBTSxRQUFLLGVBQUwsQ0FBcUIsT0FBckIsRUFBOEIsTUFBOUIsRUFBc0MsRUFBdEMsQ0FBTjtBQUFBLFdBQWpDO0FBQ0E7QUFDRixhQUFLLFdBQUw7QUFDRSxlQUFLLGVBQUwsQ0FBcUIsT0FBckIsRUFBOEIsTUFBOUIsRUFBc0MsRUFBdEM7QUFDQTtBQUNGLGFBQUssZUFBTDtBQUNFLGVBQUssZUFBTCxDQUFxQixPQUFyQixFQUE4QixNQUE5QixFQUFzQyxFQUF0QztBQUNBO0FBcEJGO0FBc0JEOzs7Ozs7Ozs7OztnQ0FRVztBQUNWLFVBQUksb0RBQWtELEtBQUssZUFBTCxDQUFxQixLQUFyQixFQUE0QixJQUE1QixDQUFpQyxHQUFqQyxDQUFsRCxPQUFKOzs7QUFHQSxXQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBeUIsT0FBekIsQ0FBaUMsZ0JBQVE7QUFDdkMsWUFBTSxXQUFXLE1BQU0sS0FBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixPQUFyQixDQUE2QixJQUE3QixFQUFtQyxJQUFuQyxDQUFOLEdBQWlELEdBQWxFOztBQUVBLHNCQUFjLENBQUMsUUFBRCxFQUFXLE1BQVgsQ0FBa0IsS0FBSyxJQUF2QixFQUE2QixJQUE3QixDQUFrQyxHQUFsQyxJQUF5QyxJQUF2RDtBQUNELE9BSkQ7O0FBTUEsV0FBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLEtBQTlCO0FBQ0Q7Ozt3QkE3cENpQjtBQUNoQixhQUFPLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBeEIsQ0FBUDtBQUNEOzs7O0VBM0dxQixJQUFJLEVBQUosRUFBUSxJQUFSLENBQWEsWUFBYixFQUEyQixXQUEzQixDOztBQXl3Q3hCLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTs7QUFFdEIsTUFBSSxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsSUFBMEIsQ0FBQyxTQUFTLFFBQVQsQ0FBa0IsTUFBakQsRUFBeUQ7QUFDdkQsV0FBTyxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsR0FBeUIsU0FBUyxRQUFULENBQWtCLElBQWxCLENBQXVCLE9BQXZCLENBQStCLEdBQS9CLEVBQW9DLEdBQXBDLENBQWhDO0FBQ0QsR0FGRCxNQUVPLElBQUksU0FBUyxRQUFULENBQWtCLElBQXRCLEVBQTRCO0FBQ2pDLFdBQU8sU0FBUyxRQUFULENBQWtCLElBQWxCLEdBQXlCLFNBQVMsUUFBVCxDQUFrQixJQUFsQixDQUF1QixPQUF2QixDQUErQixNQUEvQixFQUF1QyxFQUF2QyxDQUFoQztBQUNEOztBQUVELE1BQUksU0FBSjtBQUNELENBVEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoeENBLElBQU0sZUFBZSxTQUFmLFlBQWU7QUFBQTtBQUFBOztBQUNuQixvQkFBWSxTQUFaLEVBQXVCO0FBQUE7O0FBQUEsa0hBQ2YsU0FEZTs7QUFHckIsWUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsWUFBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsWUFBSyxhQUFMLEdBQXFCLElBQXJCLEM7OztBQUdBLFVBQU0sa0JBQWtCLE1BQUssbUJBQUwsQ0FBeUIsNEJBQXpCLENBQXhCO0FBQ0EsVUFBSSxDQUFDLE1BQUssTUFBTCxDQUFZLFlBQVosQ0FBeUIsUUFBekIsQ0FBa0MsZUFBbEMsQ0FBRCxJQUF1RCxDQUFDLE1BQUssTUFBTCxDQUFZLGNBQVosQ0FBMkIsUUFBM0IsQ0FBb0MsZUFBcEMsQ0FBNUQsRUFBa0g7QUFDaEgsY0FBSyxlQUFMLENBQXFCLDRCQUFyQixFQUFtRCxNQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFNBQXJCLEVBQW5EO0FBQ0Q7OztBQUdELFVBQUksQ0FBQyxNQUFLLE1BQUwsQ0FBWSxLQUFqQixFQUF3Qjs7O0FBR3hCLFlBQUssVUFBTCxHQUFrQixTQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsQ0FBeUIsZUFBekIsQ0FBbEI7OztBQUdBLFlBQUssTUFBTCxDQUFZLFlBQVosQ0FBeUIsT0FBekIsQ0FBaUMsdUJBQWU7QUFDOUMsY0FBSyxNQUFMLENBQVksV0FBWixDQUF3QixXQUF4QixFQUFxQyxJQUFyQyxDQUEwQyxjQUExQyxHQUEyRCxNQUFLLE1BQUwsQ0FBWSxZQUF2RTtBQUNELE9BRkQ7QUFHQSxZQUFLLE1BQUwsQ0FBWSxjQUFaLENBQTJCLE9BQTNCLENBQW1DLHlCQUFpQjtBQUNsRCxjQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLGFBQXhCLEVBQXVDLElBQXZDLENBQTRDLGNBQTVDLEdBQTZELE1BQUssTUFBTCxDQUFZLGNBQXpFO0FBQ0QsT0FGRDs7QUFJQSxhQUFPLE1BQVAsQ0FBYyxNQUFNLFFBQU4sQ0FBZSxNQUE3QixFQUFxQyxFQUFDLFdBQVcsS0FBWixFQUFtQixZQUFZLElBQS9CLEVBQXJDOzs7QUFHQSxRQUFFLHFCQUFGLEVBQXlCLEVBQXpCLENBQTRCLE9BQTVCLEVBQXFDLGFBQUs7QUFDeEMsY0FBSyxTQUFMLEdBQWlCLEVBQUUsRUFBRSxhQUFKLEVBQW1CLElBQW5CLENBQXdCLE1BQXhCLENBQWpCO0FBQ0EsY0FBSyxhQUFMLEdBQXFCLEtBQXJCOztBQUVBLFVBQUUsb0JBQUYsRUFBd0IsTUFBeEIsQ0FBK0IsTUFBSyxvQkFBTCxFQUEvQjtBQUNBLFVBQUUsZ0JBQUYsRUFBb0IsTUFBcEIsQ0FBMkIsTUFBSyxNQUFMLENBQVksWUFBWixDQUF5QixRQUF6QixDQUFrQyxNQUFLLFNBQXZDLENBQTNCOztBQUVBLFlBQUksTUFBSyxhQUFMLEtBQXVCLE1BQTNCLEVBQW1DO0FBQ2pDLGdCQUFLLGVBQUwsQ0FBcUIsNEJBQXJCLEVBQW1ELE1BQUssU0FBeEQ7QUFDRDs7QUFFRCxjQUFLLFVBQUwsS0FBb0IsTUFBSyxXQUFMLENBQWlCLE1BQUssYUFBdEIsQ0FBcEIsR0FBMkQsTUFBSyxVQUFMLEVBQTNEO0FBQ0QsT0FaRDs7QUFjQSxRQUFFLE1BQUssTUFBTCxDQUFZLG1CQUFkLEVBQW1DLEVBQW5DLENBQXNDLE9BQXRDLEVBQStDLFlBQU07QUFDbkQsY0FBSyxnQkFBTCxHQUF3QixPQUF4QjtBQUNBLGNBQUssVUFBTCxLQUFvQixNQUFLLFdBQUwsQ0FBaUIsTUFBSyxhQUF0QixDQUFwQixHQUEyRCxNQUFLLFVBQUwsRUFBM0Q7QUFDRCxPQUhEOzs7Ozs7QUFTQSxRQUFFLE1BQUssTUFBTCxDQUFZLG1CQUFkLEVBQW1DLEVBQW5DLENBQXNDLFFBQXRDLEVBQWdELFlBQU07QUFDcEQsVUFBRSxnQkFBRixFQUFvQixXQUFwQixDQUFnQyxVQUFoQyxFQUE0QyxNQUFLLE9BQWpEO0FBQ0QsT0FGRDs7QUFJQSxVQUFJLE1BQUssV0FBTCxLQUFxQixNQUF6QixFQUFpQztBQUMvQixVQUFFLHVCQUFGLEVBQTJCLElBQTNCLENBQWdDLFNBQWhDLEVBQTJDLElBQTNDO0FBQ0Q7O0FBRUQsUUFBRSx1QkFBRixFQUEyQixFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFNO0FBQzNDLGNBQUssVUFBTCxLQUFvQixNQUFLLFdBQUwsQ0FBaUIsTUFBSyxhQUF0QixDQUFwQixHQUEyRCxNQUFLLFVBQUwsRUFBM0Q7QUFDRCxPQUZEOzs7QUFLQSxRQUFFLGVBQUYsRUFBbUIsRUFBbkIsQ0FBc0IsT0FBdEIsRUFBK0IsTUFBSyxTQUFMLENBQWUsSUFBZixPQUEvQjtBQUNBLFFBQUUsY0FBRixFQUFrQixFQUFsQixDQUFxQixPQUFyQixFQUE4QixNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsT0FBOUI7QUFuRXFCO0FBb0V0Qjs7Ozs7Ozs7O0FBckVrQjtBQUFBO0FBQUEsNENBNEVrQjtBQUFBLFlBQWpCLFdBQWlCLHVFQUFILENBQUc7O0FBQ25DLFlBQUksS0FBSyxhQUFMLEtBQXVCLE1BQTNCLEVBQW1DO0FBQ2pDLGVBQUssU0FBTCxHQUFpQixLQUFLLG1CQUFMLENBQXlCLDRCQUF6QixLQUEwRCxLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFNBQXJCLENBQStCLFdBQS9CLENBQTNFO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBSyxTQUFMLEdBQWlCLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsU0FBckIsQ0FBK0IsV0FBL0IsQ0FBakI7QUFDRDtBQUNGOzs7Ozs7O0FBbEZrQjtBQUFBO0FBQUEscUNBd0ZKO0FBQ2IsWUFBSSxLQUFLLFFBQVQsRUFBbUI7QUFDakIsZUFBSyxRQUFMLENBQWMsT0FBZDtBQUNBLFlBQUUsZUFBRixFQUFtQixJQUFuQixDQUF3QixFQUF4QjtBQUNEO0FBQ0Y7Ozs7Ozs7O0FBN0ZrQjtBQUFBO0FBQUEsa0NBb0dQO0FBQ1YsWUFBSSxhQUFhLG1DQUFqQjtBQUNBLFlBQUksU0FBUyxFQUFiO0FBQ0EsWUFBSSxXQUFXLEVBQWY7QUFDQSxZQUFJLFFBQVEsS0FBSyxlQUFMLENBQXFCLEtBQXJCLENBQVo7OztBQUdBLGNBQU0sT0FBTixDQUFjLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDN0IsbUJBQVMsS0FBVCxJQUFrQixDQUFDLElBQUQsQ0FBbEI7QUFDRCxTQUZEOztBQUlBLGFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsUUFBbkIsQ0FBNEIsT0FBNUIsQ0FBb0MsZ0JBQVE7O0FBRTFDLGNBQUksWUFBWSxNQUFNLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsQ0FBTixHQUF1QyxHQUF2RDtBQUNBLGlCQUFPLElBQVAsQ0FBWSxTQUFaOzs7QUFHQSxnQkFBTSxPQUFOLENBQWMsVUFBQyxJQUFELEVBQU8sS0FBUCxFQUFpQjtBQUM3QixxQkFBUyxLQUFULEVBQWdCLElBQWhCLENBQXFCLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBckI7QUFDRCxXQUZEO0FBR0QsU0FURDs7O0FBWUEscUJBQWEsYUFBYSxPQUFPLElBQVAsQ0FBWSxHQUFaLENBQWIsR0FBZ0MsSUFBN0M7OztBQUdBLGlCQUFTLE9BQVQsQ0FBaUIsZ0JBQVE7QUFDdkIsd0JBQWMsS0FBSyxJQUFMLENBQVUsR0FBVixJQUFpQixJQUEvQjtBQUNELFNBRkQ7O0FBSUEsYUFBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLEtBQTlCO0FBQ0Q7Ozs7Ozs7QUFuSWtCO0FBQUE7QUFBQSxtQ0F5SU47QUFBQTs7QUFDWCxZQUFJLE9BQU8sRUFBWDs7QUFFQSxhQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLFFBQW5CLENBQTRCLE9BQTVCLENBQW9DLFVBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDbkQsY0FBSSxRQUFRO0FBQ1Ysa0JBQU0sS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixPQUEvQixDQUF1QyxJQUF2QyxFQUE2QyxJQUE3QyxDQURJO0FBRVYsbUJBQU8sS0FBSyxXQUZGO0FBR1YsaUJBQUssS0FBSyxHQUhBO0FBSVYsMkJBQWUsS0FBSyxLQUFMLENBQVcsS0FBSyxHQUFMLEdBQVcsT0FBSyxjQUFMLEVBQXRCO0FBSkwsV0FBWjs7QUFPQSxpQkFBSyxlQUFMLENBQXFCLEtBQXJCLEVBQTRCLE9BQTVCLENBQW9DLFVBQUMsT0FBRCxFQUFVLEtBQVYsRUFBb0I7QUFDdEQsa0JBQU0sUUFBUSxPQUFSLENBQWdCLElBQWhCLEVBQXFCLEVBQXJCLENBQU4sSUFBa0MsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFsQztBQUNELFdBRkQ7O0FBSUEsZUFBSyxJQUFMLENBQVUsS0FBVjtBQUNELFNBYkQ7O0FBZUEsWUFBTSxjQUFjLGtDQUFrQyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQXREO0FBQ0EsYUFBSyxZQUFMLENBQWtCLFdBQWxCLEVBQStCLE1BQS9CO0FBQ0Q7Ozs7Ozs7QUE3SmtCO0FBQUE7QUFBQSxrQ0FtS1A7QUFDVixhQUFLLFlBQUwsQ0FBa0IsS0FBSyxRQUFMLENBQWMsYUFBZCxFQUFsQixFQUFpRCxLQUFqRDtBQUNEOzs7Ozs7Ozs7Ozs7QUFyS2tCO0FBQUE7QUFBQSxrQ0FnTFAsSUFoTE8sRUFnTEQsU0FoTEMsRUFnTFUsT0FoTFYsRUFnTG1CO0FBQUE7OztBQUVwQyxZQUFJLGVBQWUsRUFBbkI7QUFDQSxhQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLGdCQUFRO0FBQ3pCLGNBQUksT0FBTyxPQUFPLEtBQUssU0FBWixFQUF1QixPQUFLLE1BQUwsQ0FBWSxlQUFuQyxDQUFYO0FBQ0EsdUJBQWEsSUFBYixJQUFxQixJQUFyQjtBQUNELFNBSEQ7QUFJQSxhQUFLLEtBQUwsR0FBYSxFQUFiOzs7QUFHQSxhQUFLLElBQUksT0FBTyxPQUFPLFNBQVAsQ0FBaEIsRUFBbUMsUUFBUSxPQUEzQyxFQUFvRCxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksR0FBWixDQUFwRCxFQUFzRTtBQUNwRSxjQUFJLGFBQWEsSUFBYixDQUFKLEVBQXdCO0FBQ3RCLGlCQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLGFBQWEsSUFBYixDQUFoQjtBQUNELFdBRkQsTUFFTztBQUNMLGdCQUFNLFdBQVcsS0FBSyxNQUFMLENBQVksS0FBSyxNQUFMLENBQVksT0FBeEIsS0FBb0MsS0FBSyxNQUFMLENBQVksT0FBTyxLQUFLLE1BQUwsQ0FBWSxPQUFuQixFQUE0QixRQUE1QixDQUFxQyxDQUFyQyxFQUF3QyxNQUF4QyxDQUFaLENBQXJEO0FBQ0EsaUJBQUssS0FBTCxDQUFXLElBQVg7QUFDRSx5QkFBVyxLQUFLLE1BQUwsQ0FBWSxLQUFLLE1BQUwsQ0FBWSxlQUF4QjtBQURiLGVBRUcsS0FBSyxXQUFMLEtBQXFCLE9BQXJCLEdBQStCLFNBRmxDLEVBRThDLFdBQVcsSUFBWCxHQUFrQixDQUZoRTtBQUlEO0FBQ0Y7O0FBRUQsZUFBTyxJQUFQO0FBQ0Q7Ozs7Ozs7O0FBdk1rQjtBQUFBO0FBQUEscUNBOE1KLFFBOU1JLEVBOE1NO0FBQUE7O0FBQ3ZCLFlBQU0sU0FBUyxFQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsRUFBNEIsR0FBNUIsRUFBZjs7O0FBR0EsZUFBTyxTQUFTLEdBQVQsQ0FBYSxVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQW9COztBQUV0QyxjQUFNLFNBQVMsUUFBUSxHQUFSLENBQVk7QUFBQSxtQkFBUSxPQUFLLFdBQUwsS0FBcUIsS0FBSyxLQUExQixHQUFrQyxLQUFLLE9BQS9DO0FBQUEsV0FBWixDQUFmO2NBQ0UsTUFBTSxPQUFPLE1BQVAsQ0FBYyxVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsbUJBQVUsSUFBSSxDQUFkO0FBQUEsV0FBZCxDQURSO2NBRUUsVUFBVSxLQUFLLEtBQUwsQ0FBVyxNQUFNLE9BQU8sTUFBeEIsQ0FGWjtjQUdFLE1BQU0sS0FBSyxHQUFMLGdDQUFZLE1BQVosRUFIUjtjQUlFLE1BQU0sS0FBSyxHQUFMLGdDQUFZLE1BQVosRUFKUjtjQUtFLFFBQVEsT0FBSyxNQUFMLENBQVksTUFBWixDQUFtQixRQUFRLEVBQTNCLENBTFY7Y0FNRSxRQUFRLE9BQU8sS0FBUCxFQUFjLE9BQWQsRUFOVjs7QUFRQSxjQUFNLGFBQWEsT0FBSyxVQUFMLEdBQWtCLE9BQUssVUFBTCxDQUFnQixLQUFoQixDQUFsQixHQUEyQyxFQUE5RDs7QUFFQSxvQkFBVSxPQUFPLE1BQVAsQ0FBYztBQUN0Qix3QkFEc0I7QUFFdEIsa0JBQU0sTUFGZ0I7QUFHdEIsbUJBQU8sR0FIZSxFO0FBSXRCLG9CQUpzQjtBQUt0Qiw0QkFMc0I7QUFNdEIsb0JBTnNCO0FBT3RCLG9CQVBzQjtBQVF0QjtBQVJzQixXQUFkLEVBU1AsT0FBSyxNQUFMLENBQVksV0FBWixDQUF3QixPQUFLLFNBQTdCLEVBQXdDLE9BQXhDLENBQWdELEtBQWhELENBVE8sRUFTaUQsVUFUakQsQ0FBVjs7QUFXQSxjQUFJLE9BQUssYUFBTCxFQUFKLEVBQTBCO0FBQ3hCLG9CQUFRLElBQVIsR0FBZSxRQUFRLElBQVIsQ0FBYSxHQUFiLENBQWlCO0FBQUEscUJBQVEsUUFBUSxJQUFoQjtBQUFBLGFBQWpCLENBQWY7QUFDRDs7QUFFRCxpQkFBTyxPQUFQO0FBQ0QsU0E1Qk0sQ0FBUDtBQTZCRDs7Ozs7Ozs7OztBQS9Pa0I7QUFBQTtBQUFBLGdDQXdQVCxNQXhQUyxFQXdQRCxTQXhQQyxFQXdQVSxPQXhQVixFQXdQbUI7QUFDcEMsWUFBTSx1QkFBdUIsbUJBQW1CLE1BQW5CLENBQTdCOztBQUVBLFlBQUksS0FBSyxHQUFMLEtBQWEsV0FBakIsRUFBOEI7QUFDNUIsaUJBQU8sS0FBSyxXQUFMLEtBQ0wsbUVBQWlFLG9CQUFqRSxVQUNJLEVBQUUsS0FBSyxNQUFMLENBQVksZ0JBQWQsRUFBZ0MsR0FBaEMsRUFESixTQUM2QyxFQUFFLEtBQUssTUFBTCxDQUFZLGFBQWQsRUFBNkIsR0FBN0IsRUFEN0Msc0JBRUksVUFBVSxNQUFWLENBQWlCLEtBQUssTUFBTCxDQUFZLGVBQTdCLENBRkosU0FFcUQsUUFBUSxNQUFSLENBQWUsS0FBSyxNQUFMLENBQVksZUFBM0IsQ0FGckQsQ0FESyxHQUtMLDhEQUE0RCxvQkFBNUQsU0FBb0YsRUFBRSxLQUFLLE1BQUwsQ0FBWSxnQkFBZCxFQUFnQyxHQUFoQyxFQUFwRixxQkFDSSxVQUFVLE1BQVYsQ0FBaUIsS0FBSyxNQUFMLENBQVksZUFBN0IsQ0FESixTQUNxRCxRQUFRLE1BQVIsQ0FBZSxLQUFLLE1BQUwsQ0FBWSxlQUEzQixDQURyRCxDQUxGO0FBUUQsU0FURCxNQVNPO0FBQ0wsaUJBQ0UscUVBQW1FLEtBQUssT0FBeEUsVUFDSSxFQUFFLEtBQUssTUFBTCxDQUFZLGdCQUFkLEVBQWdDLEdBQWhDLEVBREosU0FDNkMsRUFBRSxLQUFLLE1BQUwsQ0FBWSxhQUFkLEVBQTZCLEdBQTdCLEVBRDdDLFNBQ21GLG9CQURuRixzQkFFSSxVQUFVLE1BQVYsQ0FBaUIsS0FBSyxNQUFMLENBQVksZUFBN0IsQ0FGSixTQUVxRCxRQUFRLE1BQVIsQ0FBZSxLQUFLLE1BQUwsQ0FBWSxlQUEzQixDQUZyRCxDQURGO0FBS0Q7QUFDRjs7Ozs7Ozs7QUEzUWtCO0FBQUE7QUFBQSx1Q0FrUkYsUUFsUkUsRUFrUlE7QUFBQTs7QUFDekIsWUFBSSxNQUFNLEVBQUUsUUFBRixFQUFWO1lBQXdCLFFBQVEsQ0FBaEM7WUFBbUMsaUJBQWlCLEVBQXBEO1lBQ0Usb0JBQW9CLFNBQVMsTUFEL0I7WUFDdUMsaUJBQWlCLEVBRHhEOzs7QUFJQSxZQUFJLFVBQVU7QUFDWiw0QkFEWTtBQUVaLGtCQUFRLEVBRkksRTtBQUdaLG9CQUFVLEVBSEUsRTtBQUlaLGtCQUFRLEVBSkksRTtBQUtaLHVCQUFhLEVBTEQsRTtBQU1aLG9CQUFVO0FBTkUsU0FBZDs7QUFTQSxZQUFNLGNBQWMsU0FBZCxXQUFjLENBQUMsTUFBRCxFQUFTLEtBQVQsRUFBbUI7QUFDckMsY0FBTSxZQUFZLE9BQUssZUFBTCxDQUFxQixTQUFyQixDQUErQixPQUEvQixDQUF1QyxLQUF2QyxDQUFsQjtjQUNFLFVBQVUsT0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLE9BQTdCLENBQXFDLEtBQXJDLENBRFo7Y0FFRSxNQUFNLE9BQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsU0FBdkIsRUFBa0MsT0FBbEMsQ0FGUjtjQUdFLFVBQVUsRUFBRSxJQUFGLENBQU8sRUFBRSxRQUFGLEVBQU8sVUFBVSxNQUFqQixFQUFQLENBSFo7O0FBS0Esa0JBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixPQUF0Qjs7QUFFQSxrQkFBUSxJQUFSLENBQWEsdUJBQWU7QUFDMUIsZ0JBQUk7QUFDRiw0QkFBYyxPQUFLLFdBQUwsQ0FBaUIsV0FBakIsRUFBOEIsU0FBOUIsRUFBeUMsT0FBekMsQ0FBZDs7QUFFQSxzQkFBUSxRQUFSLENBQWlCLElBQWpCLENBQXNCLFlBQVksS0FBbEM7OztBQUdBLGtCQUFJLFlBQVksS0FBWixJQUFxQixDQUFDLFFBQVEsTUFBUixDQUFlLE1BQXpDLEVBQWlEO0FBQy9DLHdCQUFRLE1BQVIsR0FBaUIsWUFBWSxLQUFaLENBQWtCLEdBQWxCLENBQXNCLGdCQUFRO0FBQzdDLHlCQUFPLE9BQU8sS0FBSyxTQUFaLEVBQXVCLE9BQUssTUFBTCxDQUFZLGVBQW5DLEVBQW9ELE1BQXBELENBQTJELE9BQUssVUFBaEUsQ0FBUDtBQUNELGlCQUZnQixDQUFqQjtBQUdEO0FBQ0YsYUFYRCxDQVdFLE9BQU8sR0FBUCxFQUFZO0FBQ1oscUJBQU8sUUFBUSxXQUFSLENBQW9CLElBQXBCLENBQXlCLEdBQXpCLENBQVA7QUFDRDtBQUNGLFdBZkQsRUFlRyxJQWZILENBZVEscUJBQWE7O0FBRW5CLGdCQUFNLGlCQUFpQixVQUFVLFlBQVYsQ0FBdUIsS0FBdkIsS0FBaUMsMENBQXhEOztBQUVBLGdCQUFJLGNBQUosRUFBb0I7QUFDbEIsa0JBQUksZUFBZSxNQUFmLENBQUosRUFBNEI7QUFDMUIsK0JBQWUsTUFBZjtBQUNELGVBRkQsTUFFTztBQUNMLCtCQUFlLE1BQWYsSUFBeUIsQ0FBekI7QUFDRDs7O0FBR0Qsa0JBQUksZUFBZSxNQUFmLElBQXlCLENBQTdCLEVBQWdDO0FBQzlCO0FBQ0EsdUJBQU8sT0FBSyxTQUFMLENBQWUsV0FBZixFQUE0QixPQUFLLE1BQUwsQ0FBWSxXQUF4QyxVQUEyRCxNQUEzRCxFQUFtRSxLQUFuRSxDQUFQO0FBQ0Q7QUFDRjs7O0FBR0Qsb0JBQVEsUUFBUixHQUFtQixRQUFRLFFBQVIsQ0FBaUIsTUFBakIsQ0FBd0I7QUFBQSxxQkFBTSxPQUFPLE1BQWI7QUFBQSxhQUF4QixDQUFuQjs7QUFFQSxnQkFBSSxjQUFKLEVBQW9CO0FBQ2xCLDZCQUFlLElBQWYsQ0FBb0IsTUFBcEI7QUFDRCxhQUZELE1BRU87QUFDTCxrQkFBSSxPQUFPLE9BQUssR0FBTCxLQUFhLFdBQWIsR0FBMkIsT0FBSyxXQUFMLENBQWlCLE1BQWpCLENBQTNCLEdBQXNELE9BQUssV0FBTCxDQUFpQixNQUFqQixFQUF5QixPQUFLLE9BQTlCLENBQWpFO0FBQ0Esc0JBQVEsTUFBUixDQUFlLElBQWYsQ0FDSyxJQURMLFVBQ2MsRUFBRSxJQUFGLENBQU8sV0FBUCxFQUFvQixlQUFwQixDQURkLFdBQ3dELFVBQVUsWUFBVixDQUF1QixLQUQvRTtBQUdEO0FBQ0YsV0E1Q0QsRUE0Q0csTUE1Q0gsQ0E0Q1UsWUFBTTtBQUNkLGdCQUFJLEVBQUUsS0FBRixLQUFZLGlCQUFoQixFQUFtQztBQUNqQyxxQkFBSyxhQUFMLEdBQXFCLE9BQXJCO0FBQ0Esa0JBQUksT0FBSixDQUFZLE9BQVo7O0FBRUEsa0JBQUksZUFBZSxNQUFuQixFQUEyQjtBQUN6Qix1QkFBSyxZQUFMLENBQWtCLEVBQUUsSUFBRixDQUNoQixtQkFEZ0IsRUFFaEIsU0FDQSxlQUFlLEdBQWYsQ0FBbUI7QUFBQSxrQ0FBdUIsT0FBSyxXQUFMLENBQWlCLFlBQWpCLEVBQStCLE9BQUssT0FBTCxDQUFhLE1BQWIsRUFBL0IsQ0FBdkI7QUFBQSxpQkFBbkIsRUFBd0csSUFBeEcsQ0FBNkcsRUFBN0csQ0FEQSxHQUVBLE9BSmdCLENBQWxCO0FBTUQ7QUFDRjtBQUNGLFdBMUREO0FBMkRELFNBbkVEOztBQXFFQSxpQkFBUyxPQUFULENBQWlCLFVBQUMsTUFBRCxFQUFTLEtBQVQ7QUFBQSxpQkFBbUIsWUFBWSxNQUFaLEVBQW9CLEtBQXBCLENBQW5CO0FBQUEsU0FBakI7O0FBRUEsZUFBTyxHQUFQO0FBQ0Q7Ozs7Ozs7QUF4V2tCO0FBQUE7QUFBQSxxQ0E4V0o7QUFDYixZQUFJLFNBQVMsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFiO0FBQ0EsZUFBTyxPQUFPLEtBQWQ7QUFDQSxlQUFPLE1BQVA7QUFDRDs7Ozs7OztBQWxYa0I7QUFBQTtBQUFBLHNDQXdYSDtBQUNkLGVBQU8sRUFBRSxLQUFLLE1BQUwsQ0FBWSxtQkFBZCxFQUFtQyxFQUFuQyxDQUFzQyxVQUF0QyxLQUFxRCxLQUFLLG9CQUFMLEVBQTVEO0FBQ0Q7Ozs7Ozs7QUExWGtCO0FBQUE7QUFBQSw2Q0FnWUk7QUFDckIsZUFBTyxDQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLFFBQWhCLENBQXlCLEtBQUssU0FBOUIsQ0FBUDtBQUNEOzs7Ozs7O0FBbFlrQjtBQUFBO0FBQUEsb0NBd1lMO0FBQ1osZUFBTyxLQUFLLEdBQUwsS0FBYSxXQUFiLElBQTRCLEVBQUUsS0FBSyxNQUFMLENBQVksa0JBQWQsRUFBa0MsR0FBbEMsT0FBNEMsV0FBL0U7QUFDRDs7Ozs7OztBQTFZa0I7QUFBQTtBQUFBLHdDQWdaRDtBQUNoQixlQUFPLENBQUMsS0FBSyxXQUFMLEVBQVI7QUFDRDs7Ozs7OztBQWxaa0I7QUFBQTtBQUFBLG1DQXdaTjtBQUNYLFlBQUksTUFBTSxPQUFPLElBQVAsRUFBVjtBQUNBLFlBQUksUUFBSixDQUFhLEtBQWIsZ0JBQ2UsS0FBSyxRQUFMLENBQWMsYUFBZCxFQURmO0FBR0EsWUFBSSxLQUFKO0FBQ0EsWUFBSSxLQUFKO0FBQ0Q7Ozs7Ozs7O0FBL1prQjtBQUFBO0FBQUEsa0NBc2FRO0FBQUEsWUFBakIsT0FBaUIsdUVBQVAsS0FBTzs7QUFDekIsWUFBSTs7QUFFRixlQUFLLFlBQUw7QUFDQSxjQUFJLE9BQUosRUFBYSxLQUFLLFlBQUw7QUFDZCxTQUpELENBSUUsT0FBTyxDQUFQLEVBQVUsQztBQUNYLFNBTEQsU0FLVTtBQUNSLGVBQUssVUFBTDtBQUNBLFlBQUUsYUFBRixFQUFpQixRQUFqQixDQUEwQixXQUExQjtBQUNBLFlBQUUsS0FBSyxNQUFMLENBQVksS0FBZCxFQUFxQixJQUFyQjtBQUNBLGVBQUssYUFBTDtBQUNEO0FBQ0Y7Ozs7Ozs7QUFsYmtCO0FBQUE7QUFBQSxxREF3Ylk7QUFDN0IsWUFBSSxLQUFLLFNBQUwsS0FBbUIsTUFBdkIsRUFBK0I7O0FBRS9CLFlBQUksS0FBSyxjQUFMLEtBQXdCLEVBQTVCLEVBQWdDO0FBQzlCLGdCQUFNLFFBQU4sQ0FBZSxNQUFmLENBQXNCLFFBQXRCLENBQStCLEtBQS9CLENBQXFDLFNBQXJDLEdBQWlELENBQWpEO0FBQ0QsU0FGRCxNQUVPLElBQUksS0FBSyxjQUFMLEtBQXdCLEVBQTVCLEVBQWdDO0FBQ3JDLGdCQUFNLFFBQU4sQ0FBZSxNQUFmLENBQXNCLFFBQXRCLENBQStCLEtBQS9CLENBQXFDLFNBQXJDLEdBQWlELENBQWpEO0FBQ0QsU0FGTSxNQUVBLElBQUksS0FBSyxjQUFMLEtBQXdCLEVBQTVCLEVBQWdDO0FBQ3JDLGdCQUFNLFFBQU4sQ0FBZSxNQUFmLENBQXNCLFFBQXRCLENBQStCLEtBQS9CLENBQXFDLFNBQXJDLEdBQWlELEVBQWpEO0FBQ0QsU0FGTSxNQUVBO0FBQ0wsZ0JBQU0sUUFBTixDQUFlLE1BQWYsQ0FBc0IsUUFBdEIsQ0FBK0IsS0FBL0IsQ0FBcUMsU0FBckMsR0FBaUQsRUFBakQ7QUFDRDtBQUNGOzs7Ozs7OztBQXBja0I7QUFBQTtBQUFBLDBDQTJjQyxRQTNjRCxFQTJjVztBQUFBOztBQUM1QixZQUFJLENBQUMsS0FBSyxvQkFBTCxFQUFELElBQWdDLEtBQUssVUFBekMsRUFBcUQ7QUFDbkQsaUJBQU8sS0FBUDtBQUNEOztBQUVELFlBQUksT0FBTyxFQUFYOztBQUVBLGlCQUFTLE9BQVQsQ0FBaUIsbUJBQVc7QUFDMUIsZUFBSyxJQUFMLENBQVUsUUFBUSxHQUFSLENBQVk7QUFBQSxtQkFBTyxPQUFPLENBQWQ7QUFBQSxXQUFaLENBQVY7QUFDRCxTQUZEOzs7QUFLQSxZQUFNLFdBQVcsS0FBSyxHQUFMLGdDQUFZLFlBQUcsTUFBSCxhQUFhLElBQWIsQ0FBWixFQUFqQjs7QUFFQSxZQUFJLFlBQVksRUFBaEIsRUFBb0IsT0FBTyxLQUFQOztBQUVwQixZQUFJLG9CQUFvQixLQUF4Qjs7QUFFQSxhQUFLLE9BQUwsQ0FBYSxlQUFPO0FBQ2xCLGNBQUksSUFBSixDQUFTLFFBQVQ7O0FBRUEsY0FBTSxNQUFNLElBQUksTUFBSixDQUFXLFVBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxtQkFBVSxJQUFJLENBQWQ7QUFBQSxXQUFYLENBQVo7Y0FDRSxVQUFVLE1BQU0sSUFBSSxNQUR0QjtBQUVBLGNBQUksUUFBUSxDQUFaO0FBQ0EsY0FBSSxPQUFKLENBQVk7QUFBQSxtQkFBSyxTQUFTLElBQUksSUFBSSxLQUFLLEdBQUwsQ0FBUyxJQUFJLE9BQWIsQ0FBUixHQUFnQyxDQUE5QztBQUFBLFdBQVo7O0FBRUEsY0FBSSxRQUFRLEdBQVIsR0FBYyxHQUFsQixFQUF1QjtBQUNyQixtQkFBTyxvQkFBb0IsSUFBM0I7QUFDRDtBQUNGLFNBWEQ7O0FBYUEsZUFBTyxpQkFBUDtBQUNEOzs7Ozs7O0FBM2VrQjtBQUFBO0FBQUEsK0NBaWZNO0FBQUE7O0FBQ3ZCOzs7QUFHQSxZQUFJLENBQUMsS0FBSyxVQUFMLEVBQUwsRUFBd0I7O0FBRXhCLFlBQU0sb0JBQW9CLEVBQUUsS0FBSyxNQUFMLENBQVksaUJBQWQsQ0FBMUI7OztBQUdBLFVBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsYUFBSztBQUNuQyxpQkFBSyxlQUFMLGFBQStCLEVBQUUsRUFBRSxNQUFKLEVBQVksSUFBWixDQUFpQixPQUFqQixDQUEvQjtBQUNELFNBRkQ7O0FBSUEsMEJBQWtCLEVBQWxCLENBQXFCLFFBQXJCLEVBQStCLGFBQUs7QUFDbEMsaUJBQUssNEJBQUw7QUFDQSxpQkFBSyxZQUFMOzs7QUFHQSxjQUFJLE9BQUssWUFBTCxJQUFxQixPQUFLLFlBQUwsQ0FBa0IsS0FBbEIsS0FBNEIsRUFBRSxNQUFGLENBQVMsS0FBOUQsRUFBcUU7QUFDbkUsbUJBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNEO0FBQ0YsU0FSRDtBQVNEOzs7Ozs7OztBQXZnQmtCO0FBQUE7QUFBQSxrQ0E4Z0JQLE9BOWdCTyxFQThnQkU7QUFBQTs7QUFDbkIsVUFBRSxlQUFGLEVBQW1CLElBQW5CLENBQXdCLEVBQXhCLEU7OztBQUdBLFlBQUksS0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQUosRUFBOEI7O0FBRTlCLFlBQUksQ0FBQyxRQUFRLFFBQVIsQ0FBaUIsTUFBdEIsRUFBOEI7QUFDNUIsaUJBQU8sS0FBSyxVQUFMLEVBQVA7QUFDRCxTQUZELE1BRU8sSUFBSSxRQUFRLFFBQVIsQ0FBaUIsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDeEMsWUFBRSx3QkFBRixFQUE0QixJQUE1QjtBQUNELFNBRk0sTUFFQTtBQUNMLFlBQUUsd0JBQUYsRUFBNEIsSUFBNUI7QUFDRDs7QUFFRCxhQUFLLFVBQUwsR0FBa0IsS0FBSyxjQUFMLENBQW9CLFFBQVEsUUFBNUIsRUFBc0MsUUFBUSxRQUE5QyxDQUFsQjs7QUFFQSxZQUFJLEtBQUssZ0JBQUwsS0FBMEIsTUFBOUIsRUFBc0M7QUFDcEMsY0FBTSxzQkFBc0IsS0FBSyxtQkFBTCxDQUF5QixLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBb0I7QUFBQSxtQkFBTyxJQUFJLElBQVg7QUFBQSxXQUFwQixDQUF6QixDQUE1QjtBQUNBLFlBQUUsS0FBSyxNQUFMLENBQVksbUJBQWQsRUFBbUMsSUFBbkMsQ0FBd0MsU0FBeEMsRUFBbUQsbUJBQW5EO0FBQ0EsWUFBRSxnQkFBRixFQUFvQixXQUFwQixDQUFnQyxVQUFoQyxFQUE0QyxtQkFBNUM7QUFDRDs7QUFFRCxZQUFJLFVBQVUsT0FBTyxNQUFQLENBQ1osRUFBQyxRQUFRLEVBQVQsRUFEWSxFQUVaLEtBQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsS0FBSyxTQUE3QixFQUF3QyxJQUY1QixFQUdaLEtBQUssTUFBTCxDQUFZLGVBSEEsQ0FBZDs7QUFNQSxZQUFJLEtBQUssYUFBTCxFQUFKLEVBQTBCO0FBQ3hCLGtCQUFRLE1BQVIsR0FBaUIsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixRQUFRLE1BQTFCLEVBQWtDO0FBQ2pELG1CQUFPLENBQUM7QUFDTixvQkFBTSxhQURBO0FBRU4scUJBQU87QUFDTCwwQkFBVSxrQkFBQyxLQUFELEVBQVEsS0FBUixFQUFlLEdBQWYsRUFBdUI7QUFDL0Isc0JBQU0sU0FBUyxRQUFTLEtBQUssR0FBTCxDQUFTLEVBQVQsRUFBYSxLQUFLLEtBQUwsQ0FBVyxNQUFNLE9BQU4sQ0FBYyxLQUFkLENBQW9CLEtBQXBCLENBQVgsQ0FBYixDQUF4Qjs7QUFFQSxzQkFBSSxXQUFXLENBQVgsSUFBZ0IsV0FBVyxDQUEzQixJQUFnQyxXQUFXLENBQTNDLElBQWdELFVBQVUsQ0FBMUQsSUFBK0QsVUFBVSxJQUFJLE1BQUosR0FBYSxDQUExRixFQUE2RjtBQUMzRiwyQkFBTyxPQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBUDtBQUNELG1CQUZELE1BRU87QUFDTCwyQkFBTyxFQUFQO0FBQ0Q7QUFDRjtBQVRJO0FBRkQsYUFBRDtBQUQwQyxXQUFsQyxDQUFqQjtBQWdCRDs7QUFFRCxhQUFLLFVBQUw7O0FBRUEsWUFBSTtBQUNGLFlBQUUsa0JBQUYsRUFBc0IsSUFBdEIsQ0FBMkIsRUFBM0IsRUFBK0IsTUFBL0IsQ0FBc0MsNEJBQXRDO0FBQ0EsZUFBSyw0QkFBTDtBQUNBLGNBQU0sVUFBVSxFQUFFLEtBQUssTUFBTCxDQUFZLEtBQWQsRUFBcUIsQ0FBckIsRUFBd0IsVUFBeEIsQ0FBbUMsSUFBbkMsQ0FBaEI7O0FBRUEsY0FBSSxLQUFLLE1BQUwsQ0FBWSxZQUFaLENBQXlCLFFBQXpCLENBQWtDLEtBQUssU0FBdkMsQ0FBSixFQUF1RDtBQUNyRCxnQkFBTSxhQUFhLEVBQUMsUUFBUSxRQUFRLE1BQWpCLEVBQXlCLFVBQVUsS0FBSyxVQUF4QyxFQUFuQjs7QUFFQSxnQkFBSSxLQUFLLFNBQUwsS0FBbUIsT0FBdkIsRUFBZ0M7QUFDOUIsc0JBQVEsS0FBUixDQUFjLEtBQWQsQ0FBb0IsV0FBcEIsR0FBa0MsRUFBRSx1QkFBRixFQUEyQixFQUEzQixDQUE4QixVQUE5QixDQUFsQztBQUNELGFBRkQsTUFFTztBQUNMLHNCQUFRLE1BQVIsQ0FBZSxLQUFmLENBQXFCLENBQXJCLEVBQXdCLEtBQXhCLENBQThCLFdBQTlCLEdBQTRDLEVBQUUsdUJBQUYsRUFBMkIsRUFBM0IsQ0FBOEIsVUFBOUIsQ0FBNUM7QUFDRDs7QUFFRCxpQkFBSyxRQUFMLEdBQWdCLElBQUksS0FBSixDQUFVLE9BQVYsRUFBbUI7QUFDakMsb0JBQU0sS0FBSyxTQURzQjtBQUVqQyxvQkFBTSxVQUYyQjtBQUdqQztBQUhpQyxhQUFuQixDQUFoQjtBQUtELFdBZEQsTUFjTztBQUNMLGlCQUFLLFFBQUwsR0FBZ0IsSUFBSSxLQUFKLENBQVUsT0FBVixFQUFtQjtBQUNqQyxvQkFBTSxLQUFLLFNBRHNCO0FBRWpDLG9CQUFNO0FBQ0osd0JBQVEsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CO0FBQUEseUJBQUssRUFBRSxLQUFQO0FBQUEsaUJBQXBCLENBREo7QUFFSiwwQkFBVSxDQUFDO0FBQ1Qsd0JBQU0sS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CO0FBQUEsMkJBQUssRUFBRSxLQUFQO0FBQUEsbUJBQXBCLENBREc7QUFFVCxtQ0FBaUIsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CO0FBQUEsMkJBQUssRUFBRSxlQUFQO0FBQUEsbUJBQXBCLENBRlI7QUFHVCx3Q0FBc0IsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CO0FBQUEsMkJBQUssRUFBRSxvQkFBUDtBQUFBLG1CQUFwQixDQUhiO0FBSVQsNEJBQVUsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CO0FBQUEsMkJBQUssRUFBRSxPQUFQO0FBQUEsbUJBQXBCO0FBSkQsaUJBQUQ7QUFGTixlQUYyQjtBQVdqQztBQVhpQyxhQUFuQixDQUFoQjtBQWFEO0FBQ0YsU0FsQ0QsQ0FrQ0UsT0FBTyxHQUFQLEVBQVk7QUFDWixpQkFBTyxLQUFLLFVBQUwsQ0FBZ0I7QUFDckIsb0JBQVEsRUFEYTtBQUVyQix5QkFBYSxDQUFDLEdBQUQ7QUFGUSxXQUFoQixDQUFQO0FBSUQ7O0FBRUQsVUFBRSxlQUFGLEVBQW1CLElBQW5CLENBQXdCLEtBQUssUUFBTCxDQUFjLGNBQWQsRUFBeEI7QUFDQSxVQUFFLGFBQUYsRUFBaUIsV0FBakIsQ0FBNkIsV0FBN0I7O0FBRUEsWUFBSSxLQUFLLEdBQUwsS0FBYSxXQUFqQixFQUE4QixLQUFLLFdBQUw7QUFDL0I7Ozs7Ozs7O0FBNW1Ca0I7QUFBQTtBQUFBLGlDQW1uQlIsT0FubkJRLEVBbW5CQztBQUFBOztBQUNsQixZQUFJLFFBQVEsV0FBUixDQUFvQixNQUF4QixFQUFnQztBQUM5QixlQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQ0EsY0FBTSxjQUFjLFFBQVEsV0FBUixDQUFvQixNQUFwQixFQUFwQjtBQUNBLGVBQUssZUFBTCxDQUFxQixXQUFyQjs7QUFFQSxpQkFBTyxJQUFQO0FBQ0Q7O0FBRUQsWUFBSSxRQUFRLE1BQVIsQ0FBZSxNQUFuQixFQUEyQjs7QUFFekIsY0FBSSxRQUFRLFFBQVIsS0FBcUIsUUFBUSxNQUFSLENBQWUsTUFBZixLQUEwQixRQUFRLFFBQVIsQ0FBaUIsTUFBM0MsSUFBcUQsQ0FBQyxRQUFRLFFBQVIsQ0FBaUIsTUFBNUYsQ0FBSixFQUF5RztBQUN2RyxpQkFBSyxTQUFMO0FBQ0Q7O0FBRUQsa0JBQVEsTUFBUixDQUFlLE1BQWYsR0FBd0IsT0FBeEIsQ0FBZ0M7QUFBQSxtQkFBUyxPQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBVDtBQUFBLFdBQWhDO0FBQ0Q7O0FBRUQsZUFBTyxLQUFQO0FBQ0Q7QUF0b0JrQjs7QUFBQTtBQUFBLElBQTRCLFVBQTVCO0FBQUEsQ0FBckI7O0FBeW9CQSxPQUFPLE9BQVAsR0FBaUIsWUFBakI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN29CQSxPQUFPLFNBQVAsQ0FBaUIsT0FBakIsR0FBMkIsWUFBVztBQUNwQyxTQUFPLEtBQUssT0FBTCxDQUFhLElBQWIsRUFBbUIsR0FBbkIsQ0FBUDtBQUNELENBRkQ7QUFHQSxPQUFPLFNBQVAsQ0FBaUIsS0FBakIsR0FBeUIsWUFBVztBQUNsQyxTQUFPLEtBQUssT0FBTCxDQUFhLElBQWIsRUFBbUIsR0FBbkIsQ0FBUDtBQUNELENBRkQ7QUFHQSxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsR0FBMEIsWUFBVztBQUNuQyxTQUFPLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxXQUFmLEtBQStCLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBdEM7QUFDRCxDQUZEO0FBR0EsT0FBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFlBQVc7QUFDbkMsTUFBTSxZQUFZO0FBQ2hCLFNBQUssT0FEVztBQUVoQixTQUFLLE1BRlc7QUFHaEIsU0FBSyxNQUhXO0FBSWhCLFNBQUssUUFKVztBQUtoQixTQUFLLE9BTFc7QUFNaEIsU0FBSztBQU5XLEdBQWxCOztBQVNBLFNBQU8sS0FBSyxPQUFMLENBQWEsWUFBYixFQUEyQixhQUFLO0FBQ3JDLFdBQU8sVUFBVSxDQUFWLENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRCxDQWJEOzs7QUFnQkEsTUFBTSxTQUFOLENBQWdCLE1BQWhCLEdBQXlCLFlBQVc7QUFDbEMsU0FBTyxLQUFLLE1BQUwsQ0FBWSxVQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFBdUIsS0FBdkIsRUFBOEI7QUFDL0MsV0FBTyxNQUFNLE9BQU4sQ0FBYyxLQUFkLE1BQXlCLEtBQWhDO0FBQ0QsR0FGTSxDQUFQO0FBR0QsQ0FKRDs7O0FBT0EsT0FBTyxHQUFQLEdBQWE7QUFBQSxTQUFjLElBQUksWUFBSixDQUFpQixVQUFqQixDQUFkO0FBQUEsQ0FBYjs7SUFDTSxZO0FBQ0osd0JBQVksVUFBWixFQUF3QjtBQUFBOztBQUN0QixTQUFLLFVBQUwsR0FBa0IsVUFBbEI7QUFDRDs7Ozs0QkFFZTtBQUFBLHdDQUFSLE1BQVE7QUFBUixjQUFRO0FBQUE7O0FBQ2QsYUFBTyxPQUFPLE1BQVAsQ0FBYyxVQUFDLENBQUQsRUFBSSxLQUFKO0FBQUEsZUFBYyxNQUFNLENBQU4sQ0FBZDtBQUFBLE9BQWQsRUFBc0MsS0FBSyxVQUEzQyxDQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUFRSCxJQUFJLE9BQU8sS0FBUCxLQUFpQixXQUFyQixFQUFrQztBQUNoQyxRQUFNLFVBQU4sQ0FBaUIsU0FBakIsQ0FBMkIsa0JBQTNCLEdBQWdELFVBQVMsQ0FBVCxFQUFZO0FBQzFELFFBQUksVUFBVSxNQUFNLE9BQXBCO0FBQ0EsUUFBSSxnQkFBZ0IsUUFBUSxtQkFBUixDQUE0QixDQUE1QixFQUErQixLQUFLLEtBQXBDLENBQXBCO0FBQ0EsUUFBSSxnQkFBZ0IsRUFBcEI7O0FBRUEsUUFBSSxRQUFTLFlBQVc7QUFDdEIsVUFBSSxLQUFLLElBQUwsQ0FBVSxRQUFkLEVBQXdCO0FBQ3RCLGFBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLE1BQXZDLEVBQStDLEdBQS9DLEVBQW9EO0FBQ2xELGNBQU0sTUFBTSxPQUFPLElBQVAsQ0FBWSxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLENBQW5CLEVBQXNCLEtBQWxDLEVBQXlDLENBQXpDLENBQVo7QUFDQSxlQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixDQUFuQixFQUFzQixLQUF0QixDQUE0QixHQUE1QixFQUFpQyxJQUFqQyxDQUFzQyxNQUExRCxFQUFrRSxHQUFsRSxFQUF1RTs7QUFFckUsZ0JBQUksS0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixDQUFuQixFQUFzQixLQUF0QixDQUE0QixHQUE1QixFQUFpQyxJQUFqQyxDQUFzQyxDQUF0QyxFQUF5QyxZQUF6QyxDQUFzRCxjQUFjLENBQXBFLEVBQXVFLGNBQWMsQ0FBckYsQ0FBSixFQUE2RjtBQUMzRixxQkFBTyxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLENBQW5CLEVBQXNCLEtBQXRCLENBQTRCLEdBQTVCLEVBQWlDLElBQWpDLENBQXNDLENBQXRDLENBQVA7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGLEtBWlcsQ0FZVCxJQVpTLENBWUosSUFaSSxDQUFaOztBQWNBLFFBQUksQ0FBQyxLQUFMLEVBQVk7QUFDVixhQUFPLGFBQVA7QUFDRDs7QUFFRCxZQUFRLElBQVIsQ0FBYSxLQUFLLElBQUwsQ0FBVSxRQUF2QixFQUFpQyxVQUFTLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkI7QUFDMUQsVUFBTSxNQUFNLE9BQU8sSUFBUCxDQUFZLFFBQVEsS0FBcEIsRUFBMkIsQ0FBM0IsQ0FBWjtBQUNBLG9CQUFjLElBQWQsQ0FBbUIsUUFBUSxLQUFSLENBQWMsR0FBZCxFQUFtQixJQUFuQixDQUF3QixNQUFNLE1BQTlCLENBQW5CO0FBQ0QsS0FIRDs7QUFLQSxXQUFPLGFBQVA7QUFDRCxHQTdCRDtBQThCRDs7QUFFRCxFQUFFLE9BQUYsR0FBWSxZQUFXO0FBQ3JCLE1BQUksTUFBTSxFQUFFLFFBQUYsRUFBVjtNQUNFLFVBQVUsQ0FEWjtNQUVFLFFBQVEsVUFGVjtNQUdFLDhDQUFlLEtBQWYsMkNBQXdCLFNBQXhCLE1BSEY7O0FBS0EsTUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBVztBQUNqQyxRQUFJLEtBQUssS0FBTCxLQUFlLFVBQW5CLEVBQStCO0FBQzdCLGNBQVEsVUFBUjtBQUNEO0FBQ0Q7O0FBRUEsUUFBSSxZQUFZLFNBQVMsTUFBekIsRUFBaUM7QUFDL0IsVUFBSSxVQUFVLFVBQVYsR0FBdUIsUUFBdkIsR0FBa0MsU0FBdEM7QUFDRDtBQUVGLEdBVkQ7O0FBWUEsSUFBRSxJQUFGLENBQU8sUUFBUCxFQUFpQixVQUFDLEVBQUQsRUFBSyxPQUFMLEVBQWlCO0FBQ2hDLFlBQVEsTUFBUixDQUFlLGVBQWY7QUFDRCxHQUZEOztBQUlBLFNBQU8sSUFBSSxPQUFKLEVBQVA7QUFDRCxDQXZCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdFQSxJQUFNLGNBQWMsU0FBZCxXQUFjO0FBQUE7QUFBQTs7QUFDbEIsb0JBQVksU0FBWixFQUF1QjtBQUFBOztBQUFBLDZHQUNmLFNBRGU7QUFFdEI7Ozs7Ozs7O0FBSGlCO0FBQUE7QUFBQSxrREFTVTtBQUMxQixZQUFNLFFBQVEsS0FBSyxNQUFMLENBQVksTUFBWixDQUFtQixDQUFuQixDQUFkO0FBQ0EsZUFBTyxNQUFQLENBQWMsS0FBSyxVQUFMLENBQWdCLFFBQWhCLENBQXlCLENBQXpCLENBQWQsRUFBMkMsS0FBSyxNQUFMLENBQVksV0FBWixDQUF3QixLQUFLLFNBQTdCLEVBQXdDLE9BQXhDLENBQWdELEtBQWhELENBQTNDOztBQUVBLFlBQUksS0FBSyxTQUFMLEtBQW1CLE1BQXZCLEVBQStCO0FBQzdCLGVBQUssVUFBTCxDQUFnQixRQUFoQixDQUF5QixDQUF6QixFQUE0QixTQUE1QixHQUF3QyxNQUFNLE9BQU4sQ0FBYyxVQUFkLEVBQTBCLFFBQTFCLENBQXhDO0FBQ0Q7QUFDRjs7Ozs7OztBQWhCaUI7QUFBQTtBQUFBLG1DQXNCTDtBQUNYLFlBQU0sY0FBYyxrQ0FBa0MsS0FBSyxTQUFMLENBQWUsS0FBSyxVQUFMLENBQWdCLFFBQS9CLENBQXREO0FBQ0EsYUFBSyxZQUFMLENBQWtCLFdBQWxCLEVBQStCLE1BQS9CO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUF6QmlCO0FBQUE7QUFBQSxrQ0FxQ04sS0FyQ00sRUFxQ0MsU0FyQ0QsRUFxQ1ksT0FyQ1osRUFxQ3FCO0FBQUE7OztBQUVyQyxZQUFJLGVBQWUsRUFBbkI7QUFDQSxjQUFNLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQixjQUFJLE9BQU8sT0FBTyxLQUFLLFNBQVosRUFBdUIsT0FBSyxNQUFMLENBQVksZUFBbkMsQ0FBWDtBQUNBLHVCQUFhLElBQWIsSUFBcUIsSUFBckI7QUFDRCxTQUhEO0FBSUEsWUFBSSxPQUFPLEVBQVg7WUFBZSxtQkFBbUIsRUFBbEM7OztBQUdBLGFBQUssSUFBSSxPQUFPLE9BQU8sU0FBUCxDQUFoQixFQUFtQyxRQUFRLE9BQTNDLEVBQW9ELEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxHQUFaLENBQXBELEVBQXNFO0FBQ3BFLGNBQUksYUFBYSxJQUFiLENBQUosRUFBd0I7QUFDdEIsaUJBQUssSUFBTCxDQUFVLGFBQWEsSUFBYixDQUFWO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsZ0JBQUksV0FBVyxLQUFLLE1BQUwsQ0FBWSxLQUFLLE1BQUwsQ0FBWSxPQUF4QixLQUFvQyxLQUFLLE1BQUwsQ0FBWSxPQUFPLEtBQUssTUFBTCxDQUFZLE9BQW5CLEVBQTRCLFFBQTVCLENBQXFDLENBQXJDLEVBQXdDLE1BQXhDLENBQVosQ0FBbkQ7QUFDQSxpQkFBSyxJQUFMLENBQVU7QUFDUix5QkFBVyxLQUFLLE1BQUwsQ0FBWSxLQUFLLE1BQUwsQ0FBWSxlQUF4QixDQURIO0FBRVIscUJBQU8sV0FBVyxJQUFYLEdBQWtCO0FBRmpCLGFBQVY7QUFJQSxnQkFBSSxRQUFKLEVBQWMsaUJBQWlCLElBQWpCLENBQXNCLEtBQUssTUFBTCxFQUF0QjtBQUNmO0FBQ0Y7O0FBRUQsZUFBTyxDQUFDLElBQUQsRUFBTyxnQkFBUCxDQUFQO0FBQ0Q7Ozs7Ozs7QUE3RGlCO0FBQUE7QUFBQSxvQ0FtRUo7QUFDWiw2QkFBbUIsS0FBSyxRQUFMLENBQ2pCLEtBQUssR0FBTCxHQUFXLEtBQUssU0FBTCxDQUFlLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBZixDQURNLENBQW5CO0FBR0Q7Ozs7Ozs7Ozs7QUF2RWlCO0FBQUE7QUFBQSxzQ0FnRkYsT0FoRkUsRUFnRk8sSUFoRlAsRUFnRmE7QUFDN0IsWUFBSSxZQUFZLE9BQU8sS0FBSyxlQUFMLENBQXFCLFNBQTVCLENBQWhCO1lBQ0UsVUFBVSxPQUFPLEtBQUssZUFBTCxDQUFxQixPQUE1QixDQURaO0FBRUEsWUFBTSxXQUFXLEVBQUUsS0FBSyxNQUFMLENBQVksZ0JBQWQsRUFBZ0MsR0FBaEMsRUFBakI7O0FBRUEsWUFBSSxRQUFRLElBQVIsQ0FBYSxTQUFiLEVBQXdCLE1BQXhCLE1BQW9DLENBQXhDLEVBQTJDO0FBQ3pDLG9CQUFVLFFBQVYsQ0FBbUIsQ0FBbkIsRUFBc0IsTUFBdEI7QUFDQSxrQkFBUSxHQUFSLENBQVksQ0FBWixFQUFlLE1BQWY7QUFDRDs7QUFFRCxlQUFPLHNCQUFvQixVQUFVLE1BQVYsQ0FBaUIsWUFBakIsQ0FBcEIsY0FDRyxRQUFRLE1BQVIsQ0FBZSxZQUFmLENBREgsaUJBQzJDLE9BRDNDLGtCQUMrRCxRQUQvRCxlQUNpRixJQURqRixDQUFQO0FBRUQ7Ozs7Ozs7QUE1RmlCO0FBQUE7QUFBQSxxQ0FrR0g7QUFDYixZQUFJLFNBQVMsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFiO0FBQ0EsZUFBTyxJQUFQLEdBQWMsS0FBSyxJQUFuQjtBQUNBLGVBQU8sU0FBUCxHQUFtQixLQUFLLFNBQXhCO0FBQ0EsZUFBTyxNQUFQO0FBQ0Q7Ozs7Ozs7QUF2R2lCO0FBQUE7QUFBQSxpQ0E2R1A7QUFDVCxZQUFNLFlBQVksRUFBRSxNQUFGLEVBQVUsQ0FBVixFQUFhLFNBQS9CO0FBQ0EsZUFBTyxLQUFLLE1BQUwsQ0FBWSxVQUFaLENBQXVCLE1BQXZCLENBQThCLHFCQUFhO0FBQ2hELGlCQUFPLFVBQVUsUUFBVixDQUFtQixTQUFuQixDQUFQO0FBQ0QsU0FGTSxFQUVKLENBRkksQ0FBUDtBQUdEOzs7Ozs7O0FBbEhpQjtBQUFBO0FBQUEsd0NBd0hBO0FBQ2hCLGVBQU8sY0FBYyxNQUFkLENBQXFCLEtBQUssV0FBTCxFQUFyQixDQUFQO0FBQ0Q7Ozs7Ozs7O0FBMUhpQjtBQUFBO0FBQUEsaUNBaUlQLEVBaklPLEVBaUlIO0FBQUE7O0FBQ2IsWUFBTSxrQkFBa0IsS0FBSyxVQUFMLENBQWdCLFFBQXhDOzs7QUFHQSxZQUFNLGlCQUFpQixnQkFBZ0IsSUFBaEIsQ0FBcUIsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ3BELGNBQU0sU0FBUyxPQUFLLGVBQUwsQ0FBcUIsQ0FBckIsRUFBd0IsT0FBSyxJQUE3QixDQUFmO2NBQ0UsUUFBUSxPQUFLLGVBQUwsQ0FBcUIsQ0FBckIsRUFBd0IsT0FBSyxJQUE3QixDQURWOztBQUdBLGNBQUksU0FBUyxLQUFiLEVBQW9CO0FBQ2xCLG1CQUFPLE9BQUssU0FBWjtBQUNELFdBRkQsTUFFTyxJQUFJLFNBQVMsS0FBYixFQUFvQjtBQUN6QixtQkFBTyxDQUFDLE9BQUssU0FBYjtBQUNELFdBRk0sTUFFQTtBQUNMLG1CQUFPLENBQVA7QUFDRDtBQUNGLFNBWHNCLENBQXZCOztBQWFBLFVBQUUsaUJBQUYsRUFBcUIsV0FBckIsQ0FBaUMsMkRBQWpDLEVBQThGLFFBQTlGLENBQXVHLGdCQUF2RztBQUNBLFlBQU0sbUJBQW1CLFNBQVMsS0FBSyxTQUFkLEVBQXlCLEVBQXpCLE1BQWlDLENBQWpDLEdBQXFDLGdDQUFyQyxHQUF3RSw0QkFBakc7QUFDQSwyQkFBaUIsS0FBSyxJQUF0QixZQUFtQyxRQUFuQyxDQUE0QyxnQkFBNUMsRUFBOEQsV0FBOUQsQ0FBMEUsZ0JBQTFFOztBQUVBLFlBQUk7QUFDRixhQUFHLGNBQUg7QUFDRCxTQUZELENBRUUsT0FBTyxHQUFQLEVBQVk7QUFDWixlQUFLLFFBQUwsQ0FBYyxVQUFkO0FBQ0EsZUFBSyxlQUFMLENBQXFCLENBQUMsR0FBRCxDQUFyQjtBQUNELFNBTEQsU0FLVTtBQUNSLGVBQUssVUFBTDtBQUNEOztBQUVELGFBQUssVUFBTCxDQUFnQixLQUFLLElBQXJCOzs7OztBQUtBLFlBQUksS0FBSyxRQUFMLE9BQW9CLFVBQXhCLEVBQW9DLEtBQUssUUFBTCxDQUFjLFVBQWQ7QUFDckM7Ozs7Ozs7O0FBcktpQjtBQUFBO0FBQUEsaUNBNEtQLElBNUtPLEVBNEtEO0FBQUE7O0FBQ2YsVUFBRSxXQUFGLEVBQWUsV0FBZixDQUEyQixRQUEzQjtBQUNBLDBCQUFnQixJQUFoQixFQUF3QixRQUF4QixDQUFpQyxRQUFqQztBQUNBLFVBQUUsUUFBRixFQUFZLFdBQVosQ0FBd0IsV0FBeEIsRUFDRyxXQURILENBQ2UsWUFEZixFQUVHLFFBRkgsQ0FFZSxJQUZmOztBQUlBLFlBQUksU0FBUyxPQUFiLEVBQXNCO0FBQ3BCLGVBQUssWUFBTDs7O0FBR0EsY0FBSSxLQUFLLE1BQUwsQ0FBWSxjQUFaLENBQTJCLFFBQTNCLENBQW9DLEtBQUssU0FBekMsQ0FBSixFQUF5RDtBQUN2RCxpQkFBSyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7O0FBRUQsY0FBSSxVQUFVLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFDWixLQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLEtBQUssU0FBN0IsRUFBd0MsSUFENUIsRUFFWixLQUFLLE1BQUwsQ0FBWSxlQUZBLENBQWQ7QUFJQSxlQUFLLHlCQUFMO0FBQ0EsZUFBSyw0QkFBTDs7QUFFQSxjQUFJLEtBQUssZ0JBQUwsS0FBMEIsTUFBOUIsRUFBc0M7QUFDcEMsZ0JBQU0sc0JBQXNCLEtBQUssbUJBQUwsQ0FBeUIsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBeUIsQ0FBekIsRUFBNEIsSUFBN0IsQ0FBekIsQ0FBNUI7QUFDQSxjQUFFLEtBQUssTUFBTCxDQUFZLG1CQUFkLEVBQW1DLElBQW5DLENBQXdDLFNBQXhDLEVBQW1ELG1CQUFuRDtBQUNEOztBQUVELGNBQUksS0FBSyxhQUFMLEVBQUosRUFBMEI7QUFDeEIsb0JBQVEsTUFBUixHQUFpQixPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLFFBQVEsTUFBMUIsRUFBa0M7QUFDakQscUJBQU8sQ0FBQztBQUNOLHNCQUFNLGFBREE7QUFFTix1QkFBTztBQUNMLDRCQUFVLGtCQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsR0FBZixFQUF1QjtBQUMvQix3QkFBTSxTQUFTLFFBQVMsS0FBSyxHQUFMLENBQVMsRUFBVCxFQUFhLEtBQUssS0FBTCxDQUFXLE1BQU0sT0FBTixDQUFjLEtBQWQsQ0FBb0IsS0FBcEIsQ0FBWCxDQUFiLENBQXhCOztBQUVBLHdCQUFJLFdBQVcsQ0FBWCxJQUFnQixXQUFXLENBQTNCLElBQWdDLFdBQVcsQ0FBM0MsSUFBZ0QsVUFBVSxDQUExRCxJQUErRCxVQUFVLElBQUksTUFBSixHQUFhLENBQTFGLEVBQTZGO0FBQzNGLDZCQUFPLE9BQUssWUFBTCxDQUFrQixLQUFsQixDQUFQO0FBQ0QscUJBRkQsTUFFTztBQUNMLDZCQUFPLEVBQVA7QUFDRDtBQUNGO0FBVEk7QUFGRCxlQUFEO0FBRDBDLGFBQWxDLENBQWpCO0FBZ0JEOztBQUVELGNBQUksS0FBSyxTQUFMLEtBQW1CLE9BQXZCLEVBQWdDO0FBQzlCLG9CQUFRLEtBQVIsQ0FBYyxLQUFkLENBQW9CLFdBQXBCLEdBQWtDLEVBQUUsdUJBQUYsRUFBMkIsRUFBM0IsQ0FBOEIsVUFBOUIsQ0FBbEM7QUFDRCxXQUZELE1BRU87QUFDTCxvQkFBUSxNQUFSLENBQWUsS0FBZixDQUFxQixDQUFyQixFQUF3QixLQUF4QixDQUE4QixXQUE5QixHQUE0QyxFQUFFLHVCQUFGLEVBQTJCLEVBQTNCLENBQThCLFVBQTlCLENBQTVDO0FBQ0Q7O0FBRUQsY0FBTSxVQUFVLEVBQUUsS0FBSyxNQUFMLENBQVksS0FBZCxFQUFxQixDQUFyQixFQUF3QixVQUF4QixDQUFtQyxJQUFuQyxDQUFoQjtBQUNBLGVBQUssUUFBTCxHQUFnQixJQUFJLEtBQUosQ0FBVSxPQUFWLEVBQW1CO0FBQ2pDLGtCQUFNLEtBQUssU0FEc0I7QUFFakMsa0JBQU0sS0FBSyxVQUZzQjtBQUdqQztBQUhpQyxXQUFuQixDQUFoQjs7QUFNQSxZQUFFLGlCQUFGLEVBQXFCLElBQXJCO0FBQ0EsWUFBRSxlQUFGLEVBQW1CLElBQW5CLENBQXdCLEtBQUssUUFBTCxDQUFjLGNBQWQsRUFBeEI7QUFDRCxTQXRERCxNQXNETztBQUNMLFlBQUUsaUJBQUYsRUFBcUIsSUFBckI7QUFDRDs7QUFFRCxhQUFLLFVBQUw7QUFDRDs7Ozs7Ozs7O0FBOU9pQjtBQUFBO0FBQUEsd0NBc1BBLEtBdFBBLEVBc1BPLEtBdFBQLEVBc1BjO0FBQzlCLFlBQUksQ0FBQyxLQUFMLEVBQVk7QUFDVixZQUFFLGVBQUYsRUFBbUIsR0FBbkIsQ0FBdUIsT0FBdkIsRUFBZ0MsSUFBaEM7QUFDQSxpQkFBTyxFQUFFLG1CQUFGLEVBQXVCLElBQXZCLENBQTRCLEVBQTVCLENBQVA7QUFDRDs7QUFFRCxZQUFNLGFBQWMsUUFBUSxLQUFULEdBQWtCLEdBQXJDO0FBQ0EsVUFBRSxlQUFGLEVBQW1CLEdBQW5CLENBQXVCLE9BQXZCLEVBQW1DLFdBQVcsT0FBWCxDQUFtQixDQUFuQixDQUFuQzs7QUFFQSxZQUFJLFVBQVUsS0FBZCxFQUFxQjtBQUNuQixZQUFFLG1CQUFGLEVBQXVCLElBQXZCLENBQTRCLHFCQUE1QjtBQUNELFNBRkQsTUFFTztBQUNMLFlBQUUsbUJBQUYsRUFBdUIsSUFBdkIsQ0FDRSxFQUFFLElBQUYsQ0FBTyxpQkFBUCxFQUEwQixLQUExQixFQUFpQyxLQUFqQyxDQURGO0FBR0Q7QUFDRjtBQXRRaUI7O0FBQUE7QUFBQSxJQUE0QixVQUE1QjtBQUFBLENBQXBCOztBQXlRQSxPQUFPLE9BQVAsR0FBaUIsV0FBakI7Ozs7Ozs7Ozs7OztBQzlRQSxJQUFLLENBQUMsTUFBTSxTQUFOLENBQWdCLFFBQXRCLEVBQWlDO0FBQy9CLFFBQU0sU0FBTixDQUFnQixRQUFoQixHQUEyQixVQUFTLE1BQVQsRUFBaUI7QUFDMUMsV0FBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLE1BQXlCLENBQUMsQ0FBakM7QUFDRCxHQUZEO0FBR0Q7OztBQUdELElBQUssQ0FBQyxPQUFPLFNBQVAsQ0FBaUIsUUFBdkIsRUFBa0M7QUFDaEMsU0FBTyxTQUFQLENBQWlCLFFBQWpCLEdBQTRCLFVBQVMsTUFBVCxFQUFpQixLQUFqQixFQUF3QjtBQUNsRCxRQUFJLE9BQU8sS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUM3QixjQUFRLENBQVI7QUFDRDs7QUFFRCxRQUFJLFFBQVEsT0FBTyxNQUFmLEdBQXdCLEtBQUssTUFBakMsRUFBeUM7QUFDdkMsYUFBTyxLQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLEtBQXBCLE1BQStCLENBQUMsQ0FBdkM7QUFDRDtBQUNGLEdBVkQ7QUFXRDs7O0FBR0QsSUFBSSxPQUFPLE9BQU8sTUFBZCxLQUF5QixVQUE3QixFQUF5QztBQUN2QyxHQUFDLFlBQVc7QUFDVixXQUFPLE1BQVAsR0FBZ0IsVUFBUyxNQUFULEVBQWlCO0FBQy9CLFVBQUksV0FBVyxTQUFYLElBQXdCLFdBQVcsSUFBdkMsRUFBNkM7QUFDM0MsY0FBTSxJQUFJLFNBQUosQ0FBYyw0Q0FBZCxDQUFOO0FBQ0Q7O0FBRUQsVUFBSSxTQUFTLE9BQU8sTUFBUCxDQUFiO0FBQ0EsV0FBSyxJQUFJLFFBQVEsQ0FBakIsRUFBb0IsUUFBUSxVQUFVLE1BQXRDLEVBQThDLE9BQTlDLEVBQXVEO0FBQ3JELFlBQUksU0FBUyxVQUFVLEtBQVYsQ0FBYjtBQUNBLFlBQUksV0FBVyxTQUFYLElBQXdCLFdBQVcsSUFBdkMsRUFBNkM7QUFDM0MsZUFBSyxJQUFJLE9BQVQsSUFBb0IsTUFBcEIsRUFBNEI7QUFDMUIsZ0JBQUksT0FBTyxjQUFQLENBQXNCLE9BQXRCLENBQUosRUFBb0M7QUFDbEMscUJBQU8sT0FBUCxJQUFrQixPQUFPLE9BQVAsQ0FBbEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNELGFBQU8sTUFBUDtBQUNELEtBakJEO0FBa0JELEdBbkJEO0FBb0JEOzs7QUFHRCxJQUFJLEVBQUUsWUFBWSxRQUFRLFNBQXRCLENBQUosRUFBc0M7QUFDcEMsVUFBUSxTQUFSLENBQWtCLE1BQWxCLEdBQTJCLFlBQVc7QUFDcEMsU0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLElBQTVCO0FBQ0QsR0FGRDtBQUdEOzs7QUFHRCxJQUFJLENBQUMsT0FBTyxTQUFQLENBQWlCLFVBQXRCLEVBQWtDO0FBQ2hDLFNBQU8sU0FBUCxDQUFpQixVQUFqQixHQUE4QixVQUFTLFlBQVQsRUFBdUIsUUFBdkIsRUFBaUM7QUFDN0QsZUFBVyxZQUFZLENBQXZCO0FBQ0EsV0FBTyxLQUFLLE1BQUwsQ0FBWSxRQUFaLEVBQXNCLGFBQWEsTUFBbkMsTUFBK0MsWUFBdEQ7QUFDRCxHQUhEO0FBSUQ7OztBQUdELElBQUksQ0FBQyxNQUFNLEVBQVgsRUFBZTtBQUNiLFFBQU0sRUFBTixHQUFXLFlBQVc7QUFDcEIsV0FBTyxNQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkIsU0FBM0IsQ0FBUDtBQUNELEdBRkQ7QUFHRDs7O0FBR0QsSUFBSSxDQUFDLE1BQU0sU0FBTixDQUFnQixJQUFyQixFQUEyQjtBQUN6QixRQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsR0FBdUIsVUFBUyxTQUFULEVBQW9CO0FBQ3pDLFFBQUksU0FBUyxJQUFiLEVBQW1CO0FBQ2pCLFlBQU0sSUFBSSxTQUFKLENBQWMsa0RBQWQsQ0FBTjtBQUNEO0FBQ0QsUUFBSSxPQUFPLFNBQVAsS0FBcUIsVUFBekIsRUFBcUM7QUFDbkMsWUFBTSxJQUFJLFNBQUosQ0FBYyw4QkFBZCxDQUFOO0FBQ0Q7QUFDRCxRQUFJLE9BQU8sT0FBTyxJQUFQLENBQVg7QUFDQSxRQUFJLFNBQVMsS0FBSyxNQUFMLEtBQWdCLENBQTdCO0FBQ0EsUUFBSSxVQUFVLFVBQVUsQ0FBVixDQUFkO0FBQ0EsUUFBSSxjQUFKOztBQUVBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFwQixFQUE0QixHQUE1QixFQUFpQztBQUMvQixjQUFRLEtBQUssQ0FBTCxDQUFSO0FBQ0EsVUFBSSxVQUFVLElBQVYsQ0FBZSxPQUFmLEVBQXdCLEtBQXhCLEVBQStCLENBQS9CLEVBQWtDLElBQWxDLENBQUosRUFBNkM7QUFDM0MsZUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNELFdBQU8sU0FBUDtBQUNELEdBbkJEO0FBb0JEOzs7QUFHRCxJQUFJLENBQUMsTUFBTSxTQUFOLENBQWdCLElBQXJCLEVBQTJCO0FBQ3pCLFFBQU0sU0FBTixDQUFnQixJQUFoQixHQUF1QixVQUFTLEtBQVQsRUFBZ0I7OztBQUdyQyxRQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNqQixZQUFNLElBQUksU0FBSixDQUFjLDZCQUFkLENBQU47QUFDRDs7QUFFRCxRQUFJLElBQUksT0FBTyxJQUFQLENBQVI7OztBQUdBLFFBQUksTUFBTSxFQUFFLE1BQUYsS0FBYSxDQUF2Qjs7O0FBR0EsUUFBSSxRQUFRLFVBQVUsQ0FBVixDQUFaO0FBQ0EsUUFBSSxnQkFBZ0IsU0FBUyxDQUE3Qjs7O0FBR0EsUUFBSSxJQUFJLGdCQUFnQixDQUFoQixHQUNOLEtBQUssR0FBTCxDQUFTLE1BQU0sYUFBZixFQUE4QixDQUE5QixDQURNLEdBRU4sS0FBSyxHQUFMLENBQVMsYUFBVCxFQUF3QixHQUF4QixDQUZGOzs7QUFLQSxRQUFJLE1BQU0sVUFBVSxDQUFWLENBQVY7QUFDQSxRQUFJLGNBQWMsUUFBUSxTQUFSLEdBQ2hCLEdBRGdCLEdBQ1YsT0FBTyxDQURmOzs7QUFJQSxRQUFJLFFBQVEsY0FBYyxDQUFkLEdBQ1YsS0FBSyxHQUFMLENBQVMsTUFBTSxXQUFmLEVBQTRCLENBQTVCLENBRFUsR0FFVixLQUFLLEdBQUwsQ0FBUyxXQUFULEVBQXNCLEdBQXRCLENBRkY7OztBQUtBLFdBQU8sSUFBSSxLQUFYLEVBQWtCO0FBQ2hCLFFBQUUsQ0FBRixJQUFPLEtBQVA7QUFDQTtBQUNEOzs7QUFHRCxXQUFPLENBQVA7QUFDRCxHQXZDRDtBQXdDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BJRCxRQUFRLG1CQUFSO0FBQ0EsUUFBUSxhQUFSOztBQUVBLElBQU0sV0FBVyxRQUFRLGFBQVIsQ0FBakI7QUFDQSxJQUFNLFVBQVUsUUFBUSxZQUFSLENBQWhCO0FBQ0EsSUFBTSxjQUFjLE9BQU8sSUFBUCxDQUFZLE9BQVosRUFBcUIsR0FBckIsQ0FBeUI7QUFBQSxTQUFPLFFBQVEsR0FBUixDQUFQO0FBQUEsQ0FBekIsQ0FBcEI7Ozs7SUFHTSxFOzs7QUFDSixjQUFZLFNBQVosRUFBdUI7QUFBQTs7OztBQUFBLHdHQUNmLFNBRGU7O0FBSXJCLFFBQU0sV0FBVyxNQUFLLE1BQUwsQ0FBWSxRQUE3QjtRQUNFLGNBQWMsTUFBSyxNQUFMLENBQVksV0FENUI7QUFFQSxVQUFLLE1BQUwsR0FBYyxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLE1BQUssTUFBdkIsRUFBK0IsU0FBL0IsQ0FBZDtBQUNBLFVBQUssTUFBTCxDQUFZLFFBQVosR0FBdUIsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixRQUFsQixFQUE0QixVQUFVLFFBQXRDLENBQXZCO0FBQ0EsVUFBSyxNQUFMLENBQVksV0FBWixHQUEwQixPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLFdBQWxCLEVBQStCLFVBQVUsV0FBekMsQ0FBMUI7O0FBRUEsVUFBSyxhQUFMLEdBQXFCLFNBQXJCO0FBQ0EsVUFBSyxPQUFMLEdBQWUsRUFBZixDOztBQUVBLEtBQUMsb0JBQUQsRUFBdUIscUJBQXZCLEVBQThDLGFBQTlDLEVBQTZELGNBQTdELEVBQTZFLGtCQUE3RSxFQUFpRyxhQUFqRyxFQUFnSCxlQUFoSCxFQUFpSSxPQUFqSSxDQUF5SSxtQkFBVztBQUNsSixZQUFLLE9BQUwsSUFBZ0IsTUFBSyxtQkFBTCx5QkFBK0MsT0FBL0MsS0FBNkQsTUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixPQUFyQixDQUE3RTtBQUNELEtBRkQ7QUFHQSxVQUFLLGtCQUFMOztBQUVBLFVBQUssTUFBTCxHQUFjLElBQWQ7QUFDQSxVQUFLLFFBQUwsR0FBZ0IsRUFBaEI7OztBQUdBLFVBQUssWUFBTCxHQUFvQixJQUFwQjs7O0FBR0EsUUFBSSxTQUFTLElBQVQsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakMsYUFBTyxHQUFQO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsWUFBSyxNQUFMO0FBQ0Q7O0FBRUQsVUFBSyxLQUFMLEdBQWEsU0FBUyxNQUFULENBQWdCLFFBQWhCLENBQXlCLFlBQXpCLEtBQTBDLFNBQVMsSUFBVCxLQUFrQixXQUF6RTs7O0FBR0EsUUFBSSxRQUFRLElBQVIsQ0FBYSxTQUFTLFFBQXRCLENBQUosRUFBcUM7QUFDbkMsVUFBTSxpQkFBaUIsU0FBUyxRQUFULENBQWtCLE9BQWxCLENBQTBCLFVBQTFCLEVBQXNDLEVBQXRDLENBQXZCO0FBQ0EsWUFBSyxhQUFMLENBQW1CLFNBQW5CLHFEQUNtRCxTQUFTLEtBRDVELGtDQUVrQixjQUZsQixXQUVxQyxTQUFTLFFBRjlDLEdBRXlELGNBRnpEO0FBSUQ7Ozs7Ozs7QUFPRCxRQUFJLHFDQUNELFFBREMsMkJBQ2lDLFFBRGpDLFdBQUo7QUFHQSxRQUFJLGFBQWEsSUFBakIsRUFBdUI7QUFDckIscUJBQWUsRUFBZixHQUFvQiw2QkFBcEI7QUFDRDtBQUNELE1BQUUsSUFBRixDQUFPO0FBQ0wsY0FBUTtBQURILEtBQVAsRUFFRyxJQUZILENBRVEsY0FGUixFQUV3QixJQUZ4QixDQUU2QixNQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsT0FGN0I7OztBQUtBLFdBQU8sT0FBUCxHQUFpQjtBQUNmLG1CQUFhLElBREU7QUFFZixhQUFPLFNBQVMsSUFBVCxLQUFrQixXQUZWO0FBR2YsbUJBQWEsS0FIRTtBQUlmLG1CQUFhLEtBSkU7QUFLZixxQkFBZSxrQkFMQTtBQU1mLHlCQUFtQixJQU5KO0FBT2YsZUFBUyxJQVBNO0FBUWYsb0JBQWMsS0FSQztBQVNmLG9CQUFjLE1BVEM7QUFVZixlQUFTLE1BVk07QUFXZix1QkFBaUIsTUFYRjtBQVlmLGtCQUFZLE9BWkc7QUFhZixrQkFBWSxRQWJHO0FBY2Ysa0JBQVksUUFkRztBQWVmLGtCQUFZLFNBZkc7QUFnQmYsa0JBQVksT0FoQkc7QUFpQmYsbUJBQWE7QUFDWCxlQUFPLGNBREk7QUFFWCxjQUFNLFlBRks7QUFHWCxpQkFBUyxlQUhFO0FBSVgsaUJBQVM7QUFKRTtBQWpCRSxLQUFqQjtBQTFEcUI7QUFrRnRCOzs7Ozs7Ozs7Ozs7Ozs7a0NBV2EsSyxFQUFPLE8sRUFBUyxLLEVBQU8sVyxFQUFhO0FBQ2hELGNBQVEscUJBQW1CLEtBQW5CLGtCQUF1QyxFQUEvQzs7QUFFQSxVQUFJLFNBQVMsUUFBUSxPQUFyQjs7QUFFQSxXQUFLLFlBQUwsQ0FDRSxNQURGLEVBRUUsS0FGRixFQUdFLGNBQWMsS0FBZCxHQUFzQixDQUh4QjtBQUtEOzs7Ozs7Ozs7OzBDQU9xQixLLEVBQU87QUFDM0IsVUFBTSwwQkFBdUIsS0FBSyxHQUE1Qix5QkFBa0QsRUFBRSxJQUFGLENBQU8sZUFBUCxDQUFsRCxTQUFOO0FBQ0EsV0FBSyxhQUFMLENBQ0UsT0FERixFQUVFLEVBQUUsSUFBRixDQUFPLGVBQVAsRUFBd0IsS0FBeEIsRUFBK0IsT0FBL0IsQ0FGRixFQUdFLEVBQUUsSUFBRixDQUFPLGdCQUFQLENBSEYsRUFJRSxJQUpGO0FBTUQ7Ozs7Ozs7Ozs7O3NDQVFpQixNLEVBQVE7QUFDeEIsVUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDaEIsWUFBSSxDQUFDLEtBQUssZUFBTCxDQUFxQixPQUFPLEtBQTVCLENBQUwsRUFBeUM7QUFDdkMsZUFBSyxxQkFBTCxDQUEyQixPQUEzQjtBQUNBLGVBQUssZUFBTCxDQUFxQixLQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLFNBQTFDO0FBQ0Q7QUFDRixPQUxELE1BS08sSUFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDdkIsWUFBTSxZQUFZLG9CQUFsQjs7O0FBR0EsWUFBSSxrQkFBSjtZQUFlLGdCQUFmOzs7QUFHQSxZQUFJLE9BQU8sS0FBUCxJQUFnQixVQUFVLElBQVYsQ0FBZSxPQUFPLEtBQXRCLENBQXBCLEVBQWtEO0FBQ2hELHNCQUFZLE9BQU8sT0FBTyxLQUFkLENBQVo7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLLHFCQUFMLENBQTJCLE9BQTNCO0FBQ0EsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBSSxPQUFPLEdBQVAsSUFBYyxVQUFVLElBQVYsQ0FBZSxPQUFPLEdBQXRCLENBQWxCLEVBQThDO0FBQzVDLG9CQUFVLE9BQU8sT0FBTyxHQUFkLENBQVY7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLLHFCQUFMLENBQTJCLEtBQTNCO0FBQ0EsaUJBQU8sS0FBUDtBQUNEOzs7QUFHRCxZQUFJLFlBQVksS0FBSyxNQUFMLENBQVksT0FBeEIsSUFBbUMsVUFBVSxLQUFLLE1BQUwsQ0FBWSxPQUE3RCxFQUFzRTtBQUNwRSxlQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFDRSxFQUFFLElBQUYsQ0FBTyxlQUFQLEVBQXdCLE9BQU8sS0FBSyxNQUFMLENBQVksT0FBbkIsRUFBNEIsTUFBNUIsQ0FBbUMsS0FBSyxVQUF4QyxDQUF4QixDQURGLEVBRUUsRUFBRSxJQUFGLENBQU8sZ0JBQVAsQ0FGRixFQUdFLElBSEY7QUFLQSxpQkFBTyxLQUFQO0FBQ0QsU0FQRCxNQU9PLElBQUksWUFBWSxPQUFoQixFQUF5QjtBQUM5QixlQUFLLGFBQUwsQ0FBbUIsT0FBbkIsRUFBNEIsRUFBRSxJQUFGLENBQU8sZUFBUCxDQUE1QixFQUFxRCxFQUFFLElBQUYsQ0FBTyxnQkFBUCxDQUFyRCxFQUErRSxJQUEvRTtBQUNBLGlCQUFPLEtBQVA7QUFDRDs7O0FBR0QsYUFBSyxlQUFMLENBQXFCLFNBQXJCLEdBQWlDLFNBQWpDO0FBQ0EsYUFBSyxlQUFMLENBQXFCLFVBQXJCLENBQWdDLE9BQWhDO0FBQ0QsT0FwQ00sTUFvQ0E7QUFDTCxhQUFLLGVBQUwsQ0FBcUIsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixTQUExQztBQUNEOztBQUVELGFBQU8sSUFBUDtBQUNEOzs7dUNBRWtCO0FBQ2pCLFFBQUUsY0FBRixFQUFrQixJQUFsQixDQUF1QixFQUF2QjtBQUNEOzs7b0NBRWU7QUFDZCxRQUFFLG9CQUFGLEVBQXdCLElBQXhCLENBQTZCLEVBQTdCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBMkJNLE8sRUFBUztBQUNkLGFBQU8sT0FBTyxJQUFQLENBQVksT0FBWixFQUFxQixJQUFyQixDQUEwQjtBQUFBLGVBQU8sUUFBUSxHQUFSLE1BQW9CLFFBQVEsT0FBUixDQUFnQixRQUFoQixFQUF5QixFQUF6QixDQUFwQixTQUFQO0FBQUEsT0FBMUIsQ0FBUDtBQUNEOzs7Ozs7Ozs7OztpQ0FRWSxJLEVBQU0sUyxFQUFXO0FBQzVCLFVBQU0sYUFBYSxVQUFVLElBQVYsQ0FBbkI7OztBQUdBLFVBQU0sT0FBTyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBLFVBQUksT0FBTyxLQUFLLFFBQVosS0FBeUIsUUFBN0IsRUFBdUM7QUFDckMsaUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsSUFBMUIsRTs7QUFFQSxZQUFNLFdBQWMsS0FBSyxpQkFBTCxFQUFkLFNBQTBDLFNBQWhEO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsYUFBSyxJQUFMLEdBQVksVUFBWjtBQUNBLGFBQUssS0FBTDs7QUFFQSxpQkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixJQUExQixFO0FBQ0QsT0FURCxNQVNPO0FBQ0wsaUJBQU8sSUFBUCxDQUFZLFVBQVosRTtBQUNEO0FBQ0Y7Ozs7Ozs7OztxQ0FNZ0I7QUFBQTs7QUFDZixRQUFFLElBQUYsQ0FBTyxFQUFFLHVCQUFGLENBQVAsRUFBbUMsVUFBQyxLQUFELEVBQVEsRUFBUixFQUFlO0FBQ2hELFlBQUksR0FBRyxJQUFILEtBQVksVUFBaEIsRUFBNEI7QUFDMUIsYUFBRyxPQUFILEdBQWEsT0FBSyxHQUFHLElBQVIsTUFBa0IsTUFBL0I7QUFDRCxTQUZELE1BRU87QUFDTCxhQUFHLE9BQUgsR0FBYSxPQUFLLEdBQUcsSUFBUixNQUFrQixHQUFHLEtBQWxDO0FBQ0Q7QUFDRixPQU5EO0FBT0Q7Ozs7Ozs7OzttQ0FNYztBQUNiLFFBQUUsb0JBQUYsRUFBd0IsT0FBeEIsQ0FBZ0MsT0FBaEM7QUFDQSxRQUFFLHdCQUFGLEVBQTRCLEtBQTVCO0FBQ0Q7Ozs7Ozs7Ozs7aUNBT1ksRyxFQUFLO0FBQ2hCLFVBQU0sc0JBQXNCLEtBQUssbUJBQUwsQ0FBeUIsd0NBQXpCLEtBQXNFLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsbUJBQXZIO0FBQ0EsVUFBSSx3QkFBd0IsTUFBNUIsRUFBb0M7QUFDbEMsZUFBTyxLQUFLLENBQUwsQ0FBTyxHQUFQLENBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLEdBQVA7QUFDRDtBQUNGOzs7c0NBRWlCLEcsRUFBSztBQUNyQixVQUFJLE1BQU0sQ0FBTixLQUFZLENBQWhCLEVBQW1CO0FBQ2pCLGVBQU8sS0FBSyxZQUFMLENBQWtCLEdBQWxCLENBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLElBQVA7QUFDRDtBQUNGOzs7Ozs7Ozs7O29DQU9lLFMsRUFBVztBQUN6QixVQUFNLGVBQWUsRUFBckI7VUFDRSxVQUFVLE9BQU8sS0FBSyxlQUFMLENBQXFCLE9BQTVCLEVBQXFDLEdBQXJDLENBQXlDLENBQXpDLEVBQTRDLEdBQTVDLENBRFo7O0FBR0EsV0FBSyxJQUFJLE9BQU8sT0FBTyxLQUFLLGVBQUwsQ0FBcUIsU0FBNUIsQ0FBaEIsRUFBd0QsS0FBSyxRQUFMLENBQWMsT0FBZCxDQUF4RCxFQUFnRixLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksR0FBWixDQUFoRixFQUFrRztBQUNoRyxZQUFJLFNBQUosRUFBZTtBQUNiLHVCQUFhLElBQWIsQ0FBa0IsS0FBSyxNQUFMLENBQVksS0FBSyxVQUFqQixDQUFsQjtBQUNELFNBRkQsTUFFTztBQUNMLHVCQUFhLElBQWIsQ0FBa0IsS0FBSyxNQUFMLENBQVksWUFBWixDQUFsQjtBQUNEO0FBQ0Y7QUFDRCxhQUFPLFlBQVA7QUFDRDs7Ozs7Ozs7Ozs7O3VDQVNrQixJLEVBQU07QUFDdkIsb0JBQVksS0FBSyxPQUFqQiwrQkFBa0QsbUJBQW1CLEtBQUssS0FBTCxFQUFuQixFQUFpQyxPQUFqQyxDQUF5QyxHQUF6QyxFQUE4QyxNQUE5QyxDQUFsRDtBQUNEOzs7Ozs7Ozs7d0NBTW1CO0FBQ2xCLFVBQU0sWUFBWSxLQUFLLGVBQUwsQ0FBcUIsU0FBckIsQ0FBK0IsT0FBL0IsQ0FBdUMsS0FBdkMsRUFBOEMsTUFBOUMsQ0FBcUQsVUFBckQsQ0FBbEI7VUFDRSxVQUFVLEtBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixPQUE3QixDQUFxQyxLQUFyQyxFQUE0QyxNQUE1QyxDQUFtRCxVQUFuRCxDQURaO0FBRUEsYUFBVSxLQUFLLEdBQWYsU0FBc0IsU0FBdEIsU0FBbUMsT0FBbkM7QUFDRDs7Ozs7Ozs7Ozs7Z0NBUVcsSSxFQUFNLE8sRUFBUztBQUN6QiwyQ0FBbUMsS0FBSyxVQUFMLENBQWdCLElBQWhCLEVBQXNCLE9BQXRCLENBQW5DLFVBQXNFLEtBQUssT0FBTCxHQUFlLE1BQWYsRUFBdEU7QUFDRDs7Ozs7Ozs7Ozs7K0JBUVUsSSxFQUE4QjtBQUFBLFVBQXhCLE9BQXdCLHVFQUFkLEtBQUssT0FBUzs7QUFDdkMsb0JBQVksUUFBUSxPQUFSLENBQWdCLFFBQWhCLEVBQTBCLEVBQTFCLEVBQThCLE1BQTlCLEVBQVosa0JBQStELEtBQUssS0FBTCxHQUFhLE9BQWIsQ0FBcUIsR0FBckIsRUFBMEIsTUFBMUIsQ0FBL0Q7QUFDRDs7Ozs7Ozs7Ozs7Z0NBUVcsSSxFQUFNO0FBQ2hCLDZDQUFxQyxJQUFyQyxjQUFrRCxJQUFsRDtBQUNEOzs7Ozs7Ozs7OzBDQWFxQjtBQUNwQixVQUFJLENBQUMsVUFBVSxRQUFmLEVBQXlCO0FBQ3ZCLGVBQU8sS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixVQUE1QjtBQUNEOztBQUVELFVBQU0sVUFBVTtBQUNkLGlCQUFTLFVBREs7QUFFZCxpQkFBUyxXQUZLO0FBR2QsaUJBQVMsWUFISztBQUlkLGlCQUFTLFVBSks7QUFLZCxpQkFBUyxVQUxLO0FBTWQsaUJBQVMsWUFOSztBQU9kLGlCQUFTLFlBUEs7QUFRZCxpQkFBUyxVQVJLO0FBU2QsaUJBQVMsVUFUSztBQVVkLGlCQUFTLFVBVks7QUFXZCxpQkFBUyxZQVhLO0FBWWQsaUJBQVMsWUFaSztBQWFkLGlCQUFTLGVBYks7QUFjZCxpQkFBUyxVQWRLO0FBZWQsaUJBQVMsWUFmSztBQWdCZCxpQkFBUyxZQWhCSztBQWlCZCxpQkFBUyxZQWpCSztBQWtCZCxpQkFBUyxVQWxCSztBQW1CZCxpQkFBUyxZQW5CSztBQW9CZCxpQkFBUyxZQXBCSztBQXFCZCxpQkFBUyxVQXJCSztBQXNCZCxpQkFBUyxZQXRCSztBQXVCZCxpQkFBUyxZQXZCSztBQXdCZCxpQkFBUyxVQXhCSztBQXlCZCxpQkFBUyxZQXpCSztBQTBCZCxpQkFBUyxZQTFCSztBQTJCZCxpQkFBUyxZQTNCSztBQTRCZCxpQkFBUyxVQTVCSztBQTZCZCxpQkFBUyxZQTdCSztBQThCZCxpQkFBUyxZQTlCSztBQStCZCxpQkFBUyxZQS9CSztBQWdDZCxpQkFBUyxZQWhDSztBQWlDZCxpQkFBUyxZQWpDSztBQWtDZCxpQkFBUyxVQWxDSztBQW1DZCxpQkFBUyxXQW5DSztBQW9DZCxpQkFBUyxhQXBDSztBQXFDZCxpQkFBUyxZQXJDSztBQXNDZCxpQkFBUyxZQXRDSztBQXVDZCxpQkFBUyxZQXZDSztBQXdDZCxpQkFBUyxZQXhDSztBQXlDZCxzQkFBYyxZQXpDQTtBQTBDZCxpQkFBUyxZQTFDSztBQTJDZCxpQkFBUyxZQTNDSztBQTRDZCxpQkFBUyxZQTVDSztBQTZDZCxpQkFBUyxZQTdDSztBQThDZCxpQkFBUyxZQTlDSztBQStDZCxpQkFBUyxZQS9DSztBQWdEZCxpQkFBUyxZQWhESztBQWlEZCxpQkFBUyxZQWpESztBQWtEZCxpQkFBUyxVQWxESztBQW1EZCxpQkFBUyxVQW5ESztBQW9EZCxzQkFBYyxZQXBEQTtBQXFEZCxpQkFBUyxZQXJESztBQXNEZCxpQkFBUyxVQXRESztBQXVEZCxpQkFBUyxVQXZESztBQXdEZCxpQkFBUyxZQXhESztBQXlEZCxpQkFBUyxVQXpESztBQTBEZCxpQkFBUyxVQTFESztBQTJEZCxpQkFBUyxZQTNESztBQTREZCxpQkFBUyxZQTVESztBQTZEZCxpQkFBUyxVQTdESztBQThEZCxpQkFBUyxVQTlESztBQStEZCxrQkFBVSxZQS9ESTtBQWdFZCxrQkFBVSxZQWhFSTtBQWlFZCxpQkFBUyxVQWpFSztBQWtFZCxpQkFBUyxZQWxFSztBQW1FZCxpQkFBUyxVQW5FSztBQW9FZCxpQkFBUyxZQXBFSztBQXFFZCxpQkFBUyxZQXJFSztBQXNFZCxpQkFBUyxZQXRFSztBQXVFZCxpQkFBUyxXQXZFSztBQXdFZCxpQkFBUyxZQXhFSztBQXlFZCxpQkFBUyxXQXpFSztBQTBFZCxpQkFBUyxZQTFFSztBQTJFZCxpQkFBUyxZQTNFSztBQTRFZCxzQkFBYyxVQTVFQTtBQTZFZCxpQkFBUyxVQTdFSztBQThFZCxzQkFBYyxZQTlFQTtBQStFZCxpQkFBUyxZQS9FSztBQWdGZCxzQkFBYyxZQWhGQTtBQWlGZCxpQkFBUyxZQWpGSztBQWtGZCxpQkFBUyxVQWxGSztBQW1GZCxpQkFBUyxZQW5GSztBQW9GZCxpQkFBUyxXQXBGSztBQXFGZCxpQkFBUyxZQXJGSztBQXNGZCxpQkFBUyxZQXRGSztBQXVGZCxzQkFBYyxVQXZGQTtBQXdGZCxpQkFBUyxZQXhGSztBQXlGZCxpQkFBUyxVQXpGSztBQTBGZCxpQkFBUyxZQTFGSztBQTJGZCxpQkFBUyxZQTNGSztBQTRGZCxpQkFBUyxZQTVGSztBQTZGZCxpQkFBUyxZQTdGSztBQThGZCxpQkFBUyxZQTlGSztBQStGZCxpQkFBUyxVQS9GSztBQWdHZCxpQkFBUyxZQWhHSztBQWlHZCxpQkFBUyxXQWpHSztBQWtHZCxpQkFBUyxZQWxHSztBQW1HZCxpQkFBUyxZQW5HSztBQW9HZCxpQkFBUyxZQXBHSztBQXFHZCxpQkFBUyxZQXJHSztBQXNHZCxpQkFBUyxZQXRHSztBQXVHZCxpQkFBUyxZQXZHSztBQXdHZCxpQkFBUyxZQXhHSztBQXlHZCxpQkFBUyxZQXpHSztBQTBHZCxpQkFBUyxZQTFHSztBQTJHZCxpQkFBUyxZQTNHSztBQTRHZCxpQkFBUyxZQTVHSztBQTZHZCxpQkFBUyxZQTdHSztBQThHZCxpQkFBUyxZQTlHSztBQStHZCxrQkFBVSxZQS9HSTtBQWdIZCxpQkFBUyxZQWhISztBQWlIZCxpQkFBUyxZQWpISztBQWtIZCxpQkFBUyxZQWxISztBQW1IZCxpQkFBUyxZQW5ISztBQW9IZCxpQkFBUyxZQXBISztBQXFIZCxpQkFBUyxZQXJISztBQXNIZCxpQkFBUyxZQXRISztBQXVIZCxpQkFBUyxZQXZISztBQXdIZCxpQkFBUyxVQXhISztBQXlIZCxpQkFBUyxZQXpISztBQTBIZCxpQkFBUyxZQTFISztBQTJIZCxpQkFBUyxVQTNISztBQTRIZCxpQkFBUyxZQTVISztBQTZIZCxpQkFBUyxZQTdISztBQThIZCxpQkFBUyxZQTlISztBQStIZCxpQkFBUyxZQS9ISztBQWdJZCxpQkFBUyxZQWhJSztBQWlJZCxpQkFBUyxZQWpJSztBQWtJZCxpQkFBUyxZQWxJSztBQW1JZCxpQkFBUyxZQW5JSztBQW9JZCxpQkFBUyxZQXBJSztBQXFJZCxpQkFBUyxZQXJJSztBQXNJZCxpQkFBUyxZQXRJSztBQXVJZCxpQkFBUyxVQXZJSztBQXdJZCx1QkFBZSxZQXhJRDtBQXlJZCxzQkFBYyxXQXpJQTtBQTBJZCxrQkFBVSxZQTFJSTtBQTJJZCxzQkFBYyxVQTNJQTtBQTRJZCxpQkFBUyxZQTVJSztBQTZJZCxpQkFBUyxVQTdJSztBQThJZCxrQkFBVSxVQTlJSTtBQStJZCxpQkFBUyxVQS9JSztBQWdKZCxpQkFBUyxZQWhKSztBQWlKZCxpQkFBUyxVQWpKSztBQWtKZCxrQkFBVSxZQWxKSTtBQW1KZCxrQkFBVSxZQW5KSTtBQW9KZCxrQkFBVSxZQXBKSTtBQXFKZCxpQkFBUyxZQXJKSztBQXNKZCxpQkFBUyxZQXRKSztBQXVKZCxpQkFBUyxZQXZKSztBQXdKZCxpQkFBUyxZQXhKSztBQXlKZCxpQkFBUyxZQXpKSztBQTBKZCxpQkFBUyxZQTFKSztBQTJKZCxrQkFBVSxVQTNKSTtBQTRKZCxrQkFBVSxVQTVKSTtBQTZKZCxrQkFBVSxZQTdKSTtBQThKZCxpQkFBUyxVQTlKSztBQStKZCxrQkFBVSxZQS9KSTtBQWdLZCxpQkFBUyxVQWhLSztBQWlLZCxpQkFBUyxZQWpLSztBQWtLZCxpQkFBUyxZQWxLSztBQW1LZCxpQkFBUyxVQW5LSztBQW9LZCxrQkFBVSxZQXBLSTtBQXFLZCxrQkFBVSxZQXJLSTtBQXNLZCxpQkFBUyxVQXRLSztBQXVLZCxzQkFBYyxVQXZLQTtBQXdLZCxrQkFBVSxVQXhLSTtBQXlLZCxpQkFBUyxVQXpLSztBQTBLZCxpQkFBUyxVQTFLSztBQTJLZCxpQkFBUyxVQTNLSztBQTRLZCxpQkFBUyxZQTVLSztBQTZLZCxzQkFBYyxVQTdLQTtBQThLZCxzQkFBYyxVQTlLQTtBQStLZCxpQkFBUyxZQS9LSztBQWdMZCxzQkFBYyxVQWhMQTtBQWlMZCxpQkFBUyxZQWpMSztBQWtMZCxpQkFBUyxZQWxMSztBQW1MZCxpQkFBUyxZQW5MSztBQW9MZCxpQkFBUyxVQXBMSztBQXFMZCxrQkFBVSxVQXJMSTtBQXNMZCxpQkFBUyxZQXRMSztBQXVMZCxpQkFBUyxVQXZMSztBQXdMZCxpQkFBUyxZQXhMSztBQXlMZCxpQkFBUyxVQXpMSztBQTBMZCxpQkFBUyxVQTFMSztBQTJMZCxpQkFBUyxVQTNMSztBQTRMZCxzQkFBYyxVQTVMQTtBQTZMZCxpQkFBUyxZQTdMSztBQThMZCxzQkFBYyxVQTlMQTtBQStMZCxpQkFBUyxVQS9MSztBQWdNZCxpQkFBUyxZQWhNSztBQWlNZCxpQkFBUyxZQWpNSztBQWtNZCxpQkFBUyxZQWxNSztBQW1NZCxrQkFBVSxZQW5NSTtBQW9NZCxzQkFBYyxVQXBNQTtBQXFNZCxzQkFBYyxVQXJNQTtBQXNNZCxzQkFBYyxVQXRNQTtBQXVNZCxrQkFBVSxZQXZN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QUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBmaWxlIENvbmZpZ3VyYXRpb24gZm9yIE1hc3N2aWV3cyBhcHBsaWNhdGlvblxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKi9cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBNYXNzdmlld3MgYXBwbGljYXRpb24uXG4gKiBUaGlzIGluY2x1ZGVzIHNlbGVjdG9ycywgZGVmYXVsdHMsIGFuZCBvdGhlciBjb25zdGFudHMgc3BlY2lmaWMgdG8gTWFzc3ZpZXdzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBjb25maWcgPSB7XG4gIGFnZW50U2VsZWN0b3I6ICcjYWdlbnRfc2VsZWN0JyxcbiAgY2hhcnQ6ICcuYXFzLWNoYXJ0JyxcbiAgZGF0ZUxpbWl0OiAzMSwgLy8gbnVtIGRheXNcbiAgZGF0ZVJhbmdlU2VsZWN0b3I6ICcjcmFuZ2VfaW5wdXQnLFxuICBkZWZhdWx0czoge1xuICAgIGRhdGVSYW5nZTogJ2xhdGVzdC0yMCcsXG4gICAgcHJvamVjdDogJ2VuLndpa2lwZWRpYS5vcmcnLFxuICAgIHNvcnQ6ICd2aWV3cycsXG4gICAgc291cmNlOiAnY2F0ZWdvcnknLFxuICAgIHNvdXJjZVByb2plY3Q6ICcnLFxuICAgIGRpcmVjdGlvbjogMSxcbiAgICBvdXRwdXREYXRhOiBbXSxcbiAgICBoYWRGYWlsdXJlOiBmYWxzZSxcbiAgICB0b3RhbDogMCxcbiAgICB2aWV3OiAnbGlzdCcsXG4gICAgc3ViamVjdHBhZ2U6IDBcbiAgfSxcbiAgbGluZWFyTGVnZW5kOiAoZGF0YXNldHMsIHNjb3BlKSA9PiB7XG4gICAgcmV0dXJuIGA8c3Ryb25nPiR7JC5pMThuKCd0b3RhbHMnKX06PC9zdHJvbmc+ICR7c2NvcGUuZm9ybWF0TnVtYmVyKHNjb3BlLm91dHB1dERhdGEuc3VtKX1cbiAgICAgICgke3Njb3BlLmZvcm1hdE51bWJlcihNYXRoLnJvdW5kKHNjb3BlLm91dHB1dERhdGEuYXZlcmFnZSkpfS8keyQuaTE4bignZGF5Jyl9KWA7XG4gIH0sXG4gIGxvZ2FyaXRobWljQ2hlY2tib3g6ICcubG9nYXJpdGhtaWMtc2NhbGUtb3B0aW9uJyxcbiAgc291cmNlczoge1xuICAgIGNhdGVnb3J5OiB7XG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NhdGVnb3J5OkZvbGtfbXVzaWNpYW5zX2Zyb21fTmV3X1lvcmsnLFxuICAgICAgZGVzY3JpcHRpb25QYXJhbXM6ICgpID0+IFtcbiAgICAgICAgYDxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3d3dy5tZWRpYXdpa2kub3JnL3dpa2kvU3BlY2lhbDpNeUxhbmd1YWdlL0hlbHA6Q2F0ZWdvcmllcyc+JHskLmkxOG4oJ2NhdGVnb3J5JykudG9Mb3dlckNhc2UoKX08L2E+YFxuICAgICAgXSxcbiAgICAgIHR5cGU6ICd0ZXh0J1xuICAgIH0sXG4gICAgd2lraWxpbmtzOiB7XG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jvb2s6TmV3X1lvcmtfQ2l0eScsXG4gICAgICBkZXNjcmlwdGlvblBhcmFtczogKCkgPT4gWydodHRwczovL3d3dy5tZWRpYXdpa2kub3JnL3dpa2kvU3BlY2lhbDpNeUxhbmd1YWdlL0hlbHA6V2lraWxpbmtzJ10sXG4gICAgICB0eXBlOiAndGV4dCdcbiAgICB9LFxuICAgIHBhZ2VwaWxlOiB7XG4gICAgICBwbGFjZWhvbGRlcjogJzEyMzQ1JyxcbiAgICAgIGRlc2NyaXB0aW9uUGFyYW1zOiAoKSA9PiBbXCI8YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0nLy90b29scy53bWZsYWJzLm9yZy9wYWdlcGlsZSc+UGFnZVBpbGU8L2E+XCJdLFxuICAgICAgdHlwZTogJ251bWJlcidcbiAgICB9LFxuICAgIHN1YnBhZ2VzOiB7XG4gICAgICBwbGFjZWhvbGRlcjogJ2h0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VzZXI6RXhhbXBsZScsXG4gICAgICBkZXNjcmlwdGlvblBhcmFtczogKCkgPT4gW1xuICAgICAgICBgPGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vd3d3Lm1lZGlhd2lraS5vcmcvd2lraS9TcGVjaWFsOk15TGFuZ3VhZ2UvSGVscDpTdWJwYWdlcyc+JHskLmkxOG4oJ3N1YnBhZ2VzJykudG9Mb3dlckNhc2UoKX08L2E+YFxuICAgICAgXSxcbiAgICAgIHR5cGU6ICd0ZXh0J1xuICAgIH0sXG4gICAgdHJhbnNjbHVzaW9uczoge1xuICAgICAgcGxhY2Vob2xkZXI6ICdodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9UZW1wbGF0ZTpJbmZvYm94X09seW1waWNfZ2FtZXMnLFxuICAgICAgZGVzY3JpcHRpb25QYXJhbXM6ICgpID0+IFsnaHR0cHM6Ly93d3cubWVkaWF3aWtpLm9yZy93aWtpL1NwZWNpYWw6TXlMYW5ndWFnZS9IZWxwOlRyYW5zY2x1c2lvbiddLFxuICAgICAgdHlwZTogJ3RleHQnXG4gICAgfSxcbiAgICBxdWFycnk6IHtcbiAgICAgIHBsYWNlaG9sZGVyOiAnMTIzNDUnLFxuICAgICAgZGVzY3JpcHRpb25QYXJhbXM6ICgpID0+IFtcIjxhIHRhcmdldD0nX2JsYW5rJyBocmVmPScvL3F1YXJyeS53bWZsYWJzLm9yZyc+UXVhcnJ5PC9hPlwiXSxcbiAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgfSxcbiAgICBoYXNodGFnOiB7XG4gICAgICBwbGFjZWhvbGRlcjogJyNlZGl0YXRob24nLFxuICAgICAgZGVzY3JpcHRpb25QYXJhbXM6ICgpID0+IFtcbiAgICAgICAgYDxzcGFuIGNsYXNzPSdnbHlwaGljb24gZ2x5cGhpY29uLWZsYXNoJz48L3NwYW4+JHskLmkxOG4oJ2hhc2h0YWctY3JlZGl0cycsIFwiPGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy8vdG9vbHMud21mbGFicy5vcmcvaGFzaHRhZ3MnPldpa2lwZWRpYSBzb2NpYWwgc2VhcmNoPC9hPlwiKX1gLFxuICAgICAgICBgPGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9Jy8vdG9vbHMud21mbGFicy5vcmcvaGFzaHRhZ3MvZG9jcyc+JHskLmkxOG4oJ2hhc2h0YWcnKS50b0xvd2VyQ2FzZSgpfTwvYT5gXG4gICAgICBdLFxuICAgICAgdHlwZTogJ3N0cmluZydcbiAgICB9LFxuICAgICdleHRlcm5hbC1saW5rJzoge1xuICAgICAgcGxhY2Vob2xkZXI6ICcqLm55Y2dvLmNvbScsXG4gICAgICBkZXNjcmlwdGlvblBhcmFtczogKCkgPT4gW1xuICAgICAgICBgPGEgdGFyZ2V0PSdfYmxhbmsnIGhyZWY9J2h0dHBzOi8vd3d3Lm1lZGlhd2lraS5vcmcvd2lraS9IZWxwOkxpbmtzI0V4dGVybmFsX2xpbmtzJz4keyQuaTE4bignZXh0ZXJuYWwtbGluaycpLnRvTG93ZXJDYXNlKCl9PC9hPmBcbiAgICAgIF0sXG4gICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgIH1cbiAgfSxcbiAgcGxhdGZvcm1TZWxlY3RvcjogJyNwbGF0Zm9ybV9zZWxlY3QnLFxuICBzb3VyY2VCdXR0b246ICcjc291cmNlX2J1dHRvbicsXG4gIHNvdXJjZUlucHV0OiAnI3NvdXJjZV9pbnB1dCcsXG4gIGZvcm1TdGF0ZXM6IFsnaW5pdGlhbCcsICdwcm9jZXNzaW5nJywgJ2NvbXBsZXRlJywgJ2ludmFsaWQnXSxcbiAgdGltZXN0YW1wRm9ybWF0OiAnWVlZWU1NREQwMCcsXG4gIHZhbGlkYXRlUGFyYW1zOiBbJ3NvdXJjZScsICdzdWJqZWN0cGFnZScsICdwbGF0Zm9ybScsICdhZ2VudCcsICdkaXJlY3Rpb24nLCAnc29ydCcsICd2aWV3J10sXG4gIHZhbGlkUGFyYW1zOiB7XG4gICAgZGlyZWN0aW9uOiBbJy0xJywgJzEnXSxcbiAgICBzb3J0OiBbJ3RpdGxlJywgJ3ZpZXdzJywgJ29yaWdpbmFsJ10sXG4gICAgc291cmNlOiBbJ3BhZ2VwaWxlJywgJ3dpa2lsaW5rcycsICdjYXRlZ29yeScsICdzdWJwYWdlcycsICd0cmFuc2NsdXNpb25zJywgJ3F1YXJyeScsICdoYXNodGFnJywgJ2V4dGVybmFsLWxpbmsnXSxcbiAgICB2aWV3OiBbJ2xpc3QnLCAnY2hhcnQnXSxcbiAgICBzdWJqZWN0cGFnZTogWycwJywgJzEnXVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbmZpZztcbiIsIi8qKlxuICogTWFzc3ZpZXdzIEFuYWx5c2lzIHRvb2xcbiAqIEBmaWxlIE1haW4gZmlsZSBmb3IgTWFzc3ZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogQHJlcXVpcmVzIFB2XG4gKiBAcmVxdWlyZXMgQ2hhcnRIZWxwZXJzXG4gKiBAcmVxdWlyZXMgTGlzdEhlbHBlcnNcbiAqL1xuXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpO1xuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4uL3NoYXJlZC9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5jb25zdCBQdiA9IHJlcXVpcmUoJy4uL3NoYXJlZC9wdicpO1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2NoYXJ0X2hlbHBlcnMnKTtcbmNvbnN0IExpc3RIZWxwZXJzID0gcmVxdWlyZSgnLi4vc2hhcmVkL2xpc3RfaGVscGVycycpO1xuXG4vKiogTWFpbiBNYXNzVmlld3MgY2xhc3MgKi9cbmNsYXNzIE1hc3NWaWV3cyBleHRlbmRzIG1peChQdikud2l0aChDaGFydEhlbHBlcnMsIExpc3RIZWxwZXJzKSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgdGhpcy5hcHAgPSAnbWFzc3ZpZXdzJztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQ2FsbGVkIGluIGBwdi5qc2AgYWZ0ZXIgdHJhbnNsYXRpb25zIGhhdmUgbG9hZGVkXG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hc3NpZ25EZWZhdWx0cygpO1xuICAgIHRoaXMuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuICAgIHRoaXMucG9wUGFyYW1zKCk7XG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuXG4gICAgLyoqIG9ubHkgc2hvdyBvcHRpb25zIGZvciBsaW5lLCBiYXIgYW5kIHJhZGFyIGNoYXJ0cyAqL1xuICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGdlbmVyYWwgZXZlbnQgbGlzdGVuZXJzXG4gICAqIEBvdmVycmlkZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgc3VwZXIuc2V0dXBMaXN0ZW5lcnMoKTtcblxuICAgICQoJyNwdl9mb3JtJykub24oJ3N1Ym1pdCcsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHBhZ2UgZnJvbSByZWxvYWRpbmdcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSk7XG5cbiAgICAkKCcuYW5vdGhlci1xdWVyeScpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcbiAgICAgIHRoaXMucHVzaFBhcmFtcyh0cnVlKTtcbiAgICB9KTtcblxuICAgICQoJy5zb3J0LWxpbmsnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnN0IHNvcnRUeXBlID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3R5cGUnKTtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5zb3J0ID09PSBzb3J0VHlwZSA/IC10aGlzLmRpcmVjdGlvbiA6IDE7XG4gICAgICB0aGlzLnNvcnQgPSBzb3J0VHlwZTtcbiAgICAgIHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgJCgnLnNvdXJjZS1vcHRpb24nKS5vbignY2xpY2snLCBlID0+IHRoaXMudXBkYXRlU291cmNlSW5wdXQoZS50YXJnZXQpKTtcblxuICAgICQoJy52aWV3LWJ0bicpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICB0aGlzLnZpZXcgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC52YWx1ZTtcbiAgICAgIHRoaXMudG9nZ2xlVmlldyh0aGlzLnZpZXcpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgbmVjZXNzYXJ5IGRlZmF1bHQgdmFsdWVzIHRvIGNsYXNzIGluc3RhbmNlLlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdmlldyBpcyByZXNldC5cbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgYXNzaWduRGVmYXVsdHMoKSB7XG4gICAgWydzb3J0JywgJ3NvdXJjZScsICdkaXJlY3Rpb24nLCAnb3V0cHV0RGF0YScsICdoYWRGYWlsdXJlJywgJ3RvdGFsJywgJ3ZpZXcnLCAnc3ViamVjdHBhZ2UnXS5mb3JFYWNoKGRlZmF1bHRLZXkgPT4ge1xuICAgICAgdGhpc1tkZWZhdWx0S2V5XSA9IHRoaXMuY29uZmlnLmRlZmF1bHRzW2RlZmF1bHRLZXldO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cvaGlkZSBmb3JtIGVsZW1lbnRzIGJhc2VkIG9uIHRoZSBzZWxlY3RlZCBzb3VyY2VcbiAgICogQHBhcmFtICB7T2JqZWN0fSBub2RlIC0gSFRNTCBlbGVtZW50IG9mIHRoZSBzZWxlY3RlZCBzb3VyY2VcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgdXBkYXRlU291cmNlSW5wdXQobm9kZSkge1xuICAgIGNvbnN0IHNvdXJjZSA9IG5vZGUuZGF0YXNldC52YWx1ZTtcblxuICAgICQoJyNzb3VyY2VfYnV0dG9uJykuZGF0YSgndmFsdWUnLCBzb3VyY2UpLmh0bWwoYCR7bm9kZS50ZXh0Q29udGVudH0gPHNwYW4gY2xhc3M9J2NhcmV0Jz48L3NwYW4+YCk7XG5cbiAgICAkKHRoaXMuY29uZmlnLnNvdXJjZUlucHV0KS5wcm9wKCd0eXBlJywgdGhpcy5jb25maWcuc291cmNlc1tzb3VyY2VdLnR5cGUpXG4gICAgICAucHJvcCgncGxhY2Vob2xkZXInLCB0aGlzLmNvbmZpZy5zb3VyY2VzW3NvdXJjZV0ucGxhY2Vob2xkZXIpXG4gICAgICAudmFsKCcnKTtcblxuICAgICQoJy5zb3VyY2UtZGVzY3JpcHRpb24nKS5odG1sKFxuICAgICAgJC5pMThuKGBtYXNzdmlld3MtJHtzb3VyY2V9LWRlc2NyaXB0aW9uYCwgLi4udGhpcy5jb25maWcuc291cmNlc1tzb3VyY2VdLmRlc2NyaXB0aW9uUGFyYW1zKCkpXG4gICAgKTtcblxuICAgIGlmIChzb3VyY2UgPT09ICdjYXRlZ29yeScpIHtcbiAgICAgICQoJy5jYXRlZ29yeS1zdWJqZWN0LXRvZ2dsZScpLnNob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmNhdGVnb3J5LXN1YmplY3QtdG9nZ2xlJykuaGlkZSgpO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2UgPT09ICdxdWFycnknIHx8IHNvdXJjZSA9PT0gJ2V4dGVybmFsLWxpbmsnKSB7XG4gICAgICAkKCcubWFzc3ZpZXdzLXNvdXJjZS1pbnB1dCcpLmFkZENsYXNzKCdwcm9qZWN0LWVuYWJsZWQnKTtcbiAgICAgICQoJy5wcm9qZWN0LWlucHV0JykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tYXNzdmlld3Mtc291cmNlLWlucHV0JykucmVtb3ZlQ2xhc3MoJ3Byb2plY3QtZW5hYmxlZCcpO1xuICAgICAgJCgnLnByb2plY3QtaW5wdXQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIH1cblxuICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBiYXNlIHByb2plY3QgbmFtZSAod2l0aG91dCBsYW5ndWFnZSBhbmQgdGhlIC5vcmcpXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBwcm9qZWN0bmFtZVxuICAgKi9cbiAgZ2V0IGJhc2VQcm9qZWN0KCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3Quc3BsaXQoJy4nKVsxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHVzZXItaW5wdXR0ZWQgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JDYWNoZUtleV0gd2hldGhlciBvciBub3QgdG8gaW5jbHVkZSB0aGUgcGFnZSBuYW1lLCBhbmQgZXhjbHVkZSBzb3J0IGFuZCBkaXJlY3Rpb25cbiAgICogICBpbiB0aGUgcmV0dXJuZWQgb2JqZWN0LiBUaGlzIGlzIGZvciB0aGUgcHVycG9zZXMgb2YgZ2VuZXJhdGluZyBhIHVuaXF1ZSBjYWNoZSBrZXkgZm9yIHBhcmFtcyBhZmZlY3RpbmcgdGhlIEFQSSBxdWVyaWVzXG4gICAqIEByZXR1cm4ge09iamVjdH0gcHJvamVjdCwgcGxhdGZvcm0sIGFnZW50LCBldGMuXG4gICAqL1xuICBnZXRQYXJhbXMoZm9yQ2FjaGVLZXkgPSBmYWxzZSkge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBwbGF0Zm9ybTogJCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKSxcbiAgICAgIGFnZW50OiAkKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpLFxuICAgICAgc291cmNlOiAkKHRoaXMuY29uZmlnLnNvdXJjZUJ1dHRvbikuZGF0YSgndmFsdWUnKSxcbiAgICAgIHRhcmdldDogJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCkuc2NvcmUoKVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBzdGFydCBhbmQgZW5kIHdpdGggY3VzdG9tIHJhbmdlIHZhbHVlcywgaWYgY29uZmlndXJlZCAoc2V0IGJ5IFVSTCBwYXJhbXMgb3Igc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcilcbiAgICAgKiBWYWxpZCB2YWx1ZXMgYXJlIHRob3NlIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcywgY29uc3RydWN0ZWQgbGlrZSBge3JhbmdlOiAnbGFzdC1tb250aCd9YCxcbiAgICAgKiAgIG9yIGEgcmVsYXRpdmUgcmFuZ2UgbGlrZSBge3JhbmdlOiAnbGF0ZXN0LU4nfWAgd2hlcmUgTiBpcyB0aGUgbnVtYmVyIG9mIGRheXMuXG4gICAgICovXG4gICAgaWYgKHRoaXMuc3BlY2lhbFJhbmdlICYmICFmb3JDYWNoZUtleSkge1xuICAgICAgcGFyYW1zLnJhbmdlID0gdGhpcy5zcGVjaWFsUmFuZ2UucmFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgIHBhcmFtcy5lbmQgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMuc291cmNlID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICBwYXJhbXMuc3ViamVjdHBhZ2UgPSAkKCcuY2F0ZWdvcnktc3ViamVjdC10b2dnbGUtLWlucHV0JykuaXMoJzpjaGVja2VkJykgPyAnMScgOiAnMCc7XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuc291cmNlID09PSAncXVhcnJ5JyB8fCBwYXJhbXMuc291cmNlID09PSAnZXh0ZXJuYWwtbGluaycpIHtcbiAgICAgIHBhcmFtcy5wcm9qZWN0ID0gJCgnLnByb2plY3QtaW5wdXQnKS52YWwoKTtcbiAgICB9XG5cbiAgICBpZiAoIWZvckNhY2hlS2V5KSB7XG4gICAgICBwYXJhbXMuc29ydCA9IHRoaXMuc29ydDtcbiAgICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIHBhcmFtcy52aWV3ID0gdGhpcy52aWV3O1xuXG4gICAgICAvKiogYWRkIGF1dG9sb2cgcGFyYW0gb25seSBpZiBpdCB3YXMgcGFzc2VkIGluIG9yaWdpbmFsbHksIGFuZCBvbmx5IGlmIGl0IHdhcyBmYWxzZSAodHJ1ZSB3b3VsZCBiZSBkZWZhdWx0KSAqL1xuICAgICAgaWYgKHRoaXMubm9Mb2dTY2FsZSkgcGFyYW1zLmF1dG9sb2cgPSAnZmFsc2UnO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUHVzaCByZWxldmFudCBjbGFzcyBwcm9wZXJ0aWVzIHRvIHRoZSBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gY2xlYXIgLSB3aGV0ZXIgdG8gY2xlYXIgdGhlIHF1ZXJ5IHN0cmluZyBlbnRpcmVseVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwdXNoUGFyYW1zKGNsZWFyID0gZmFsc2UpIHtcbiAgICBpZiAoIXdpbmRvdy5oaXN0b3J5IHx8ICF3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHJldHVybjtcblxuICAgIGlmIChjbGVhcikge1xuICAgICAgcmV0dXJuIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIGRvY3VtZW50LnRpdGxlLCBsb2NhdGlvbi5ocmVmLnNwbGl0KCc/JylbMF0pO1xuICAgIH1cblxuICAgIC8qKiBvbmx5IGNlcnRhaW4gY2hhcmFjdGVycyB3aXRoaW4gdGhlIHBhZ2UgbmFtZSBhcmUgZXNjYXBlZCAqL1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsICc/JyArICQucGFyYW0odGhpcy5nZXRQYXJhbXMoKSkpO1xuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgL21hc3N2aWV3cz8keyQucGFyYW0odGhpcy5nZXRQZXJtYUxpbmsoKSl9YCk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGxpc3Qgb2YgbWFzc3ZpZXdzIGludG8gdmlld1xuICAgKiBAb3ZlcnJpZGVcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlbmRlckRhdGEoKSB7XG4gICAgc3VwZXIucmVuZGVyRGF0YShzb3J0ZWREYXRhc2V0cyA9PiB7XG4gICAgICBjb25zdCBzb3VyY2UgPSAkKCcjc291cmNlX2J1dHRvbicpLmRhdGEoJ3ZhbHVlJyk7XG4gICAgICBsZXQgcGFnZUNvbHVtbk1lc3NhZ2U7XG5cbiAgICAgIC8vIHVwZGF0ZSBtZXNzYWdlIGZvciBwYWdlcyBjb2x1bW5cbiAgICAgIGlmIChbJ3dpa2lsaW5rcycsICdzdWJwYWdlcycsICd0cmFuc2NsdXNpb25zJ10uaW5jbHVkZXMoc291cmNlKSkge1xuICAgICAgICBwYWdlQ29sdW1uTWVzc2FnZSA9ICQuaTE4bihgbnVtLSR7c291cmNlfWAsIHNvcnRlZERhdGFzZXRzLmxlbmd0aCAtIChzb3VyY2UgPT09ICdzdWJwYWdlcycgPyAxIDogMCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnZUNvbHVtbk1lc3NhZ2UgPSAkLmkxOG4oJ251bS1wYWdlcycsIHNvcnRlZERhdGFzZXRzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgICQoJy5vdXRwdXQtdG90YWxzJykuaHRtbChcbiAgICAgICAgYDx0aCBzY29wZT0ncm93Jz4keyQuaTE4bigndG90YWxzJyl9PC90aD5cbiAgICAgICAgIDx0aD4keyQuaTE4bihwYWdlQ29sdW1uTWVzc2FnZSwgc29ydGVkRGF0YXNldHMubGVuZ3RoKX08L3RoPlxuICAgICAgICAgPHRoPiR7dGhpcy5mb3JtYXROdW1iZXIodGhpcy5vdXRwdXREYXRhLnN1bSl9PC90aD5cbiAgICAgICAgIDx0aD4ke3RoaXMuZm9ybWF0TnVtYmVyKE1hdGgucm91bmQodGhpcy5vdXRwdXREYXRhLmF2ZXJhZ2UpKX0gLyAkeyQuaTE4bignZGF5Jyl9PC90aD5gXG4gICAgICApO1xuICAgICAgJCgnI291dHB1dF9saXN0JykuaHRtbCgnJyk7XG5cbiAgICAgIHNvcnRlZERhdGFzZXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICQoJyNvdXRwdXRfbGlzdCcpLmFwcGVuZChcbiAgICAgICAgICBgPHRyPlxuICAgICAgICAgICA8dGggc2NvcGU9J3Jvdyc+JHtpbmRleCArIDF9PC90aD5cbiAgICAgICAgICAgPHRkPjxhIGhyZWY9XCJodHRwczovLyR7aXRlbS5wcm9qZWN0LmVzY2FwZSgpfS93aWtpLyR7aXRlbS5sYWJlbC5zY29yZSgpfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7aXRlbS5sYWJlbC5kZXNjb3JlKCl9PC9hPjwvdGQ+XG4gICAgICAgICAgIDx0ZD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPScke3RoaXMuZ2V0UGFnZXZpZXdzVVJMKGl0ZW0ucHJvamVjdCwgaXRlbS5sYWJlbCl9Jz4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0uc3VtKX08L2E+PC90ZD5cbiAgICAgICAgICAgPHRkPiR7dGhpcy5mb3JtYXROdW1iZXIoTWF0aC5yb3VuZChpdGVtLmF2ZXJhZ2UpKX0gLyAkeyQuaTE4bignZGF5Jyl9PC90ZD5cbiAgICAgICAgICAgPC90cj5gXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmFsdWUgb2YgZ2l2ZW4gbGFuZ3ZpZXcgZW50cnkgZm9yIHRoZSBwdXJwb3NlcyBvZiBjb2x1bW4gc29ydGluZ1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGl0ZW0gLSBsYW5ndmlldyBlbnRyeSB3aXRoaW4gdGhpcy5vdXRwdXREYXRhXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSAtIHR5cGUgb2YgcHJvcGVydHkgdG8gZ2V0XG4gICAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9IC0gdmFsdWVcbiAgICovXG4gIGdldFNvcnRQcm9wZXJ0eShpdGVtLCB0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnb3JpZ2luYWwnOlxuICAgICAgcmV0dXJuIGl0ZW0uaW5kZXg7XG4gICAgY2FzZSAndGl0bGUnOlxuICAgICAgcmV0dXJuIGl0ZW0ubGFiZWw7XG4gICAgY2FzZSAndmlld3MnOlxuICAgICAgcmV0dXJuIE51bWJlcihpdGVtLnN1bSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvb3AgdGhyb3VnaCBnaXZlbiBwYWdlcyBhbmQgcXVlcnkgdGhlIHBhZ2V2aWV3cyBBUEkgZm9yIGVhY2hcbiAgICogICBBbHNvIHVwZGF0ZXMgdGhpcy5vdXRwdXREYXRhIHdpdGggcmVzdWx0XG4gICAqIEBwYXJhbSAge0FycmF5fSBwYWdlcyAtIGxpc3Qgb2YgcGFnZSBuYW1lcyBvciBmdWxsIFVSTHMgdG8gcGFnZXNcbiAgICogQHBhcmFtICB7U3RyaW5nfSBbcHJvamVjdF0gLSBwcm9qZWN0IHN1Y2ggYXMgZW4ud2lraXBlZGlhLm9yZ1xuICAgKiAgIElmIG51bGwgcGFnZXMgaXMgYXNzdW1lZCB0byBiZSBhbiBhcnJheSBvZiBwYWdlIFVSTHNcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IC0gUHJvbWlzZSByZXNvbHZpbmcgd2l0aCBkYXRhIHJlYWR5IHRvIGJlIHJlbmRlcmVkIHRvIHZpZXdcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEocGFnZXMsIHByb2plY3QpIHtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICBlbmREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5zdGFydE9mKCdkYXknKTtcblxuICAgIGxldCBkZmQgPSAkLkRlZmVycmVkKCksIGNvdW50ID0gMCwgZmFpbHVyZVJldHJpZXMgPSB7fSxcbiAgICAgIHRvdGFsUmVxdWVzdENvdW50ID0gcGFnZXMubGVuZ3RoLCBmYWlsZWRQYWdlcyA9IFtdLCBwYWdlVmlld3NEYXRhID0gW107XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IHBhZ2UgPT4ge1xuICAgICAgbGV0IHF1ZXJ5UHJvamVjdDtcblxuICAgICAgLy8gaWYgdGhlcmUncyBubyBwcm9qZWN0IHRoYXQgbWVhbnMgcGFnZSBpcyBhIFVSTCB0byB0aGUgcGFnZVxuICAgICAgaWYgKCFwcm9qZWN0KSB7XG4gICAgICAgIFtxdWVyeVByb2plY3QsIHBhZ2VdID0gdGhpcy5nZXRXaWtpUGFnZUZyb21VUkwocGFnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeVByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cmlFbmNvZGVkUGFnZU5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQocGFnZSk7XG4gICAgICBjb25zdCB1cmwgPSAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy9wYWdldmlld3MvcGVyLWFydGljbGUvJHtxdWVyeVByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZFBhZ2VOYW1lfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShwdkRhdGEgPT4ge1xuICAgICAgICBwYWdlVmlld3NEYXRhLnB1c2goe1xuICAgICAgICAgIHRpdGxlOiBwYWdlLFxuICAgICAgICAgIHByb2plY3Q6IHF1ZXJ5UHJvamVjdCxcbiAgICAgICAgICBpdGVtczogcHZEYXRhLml0ZW1zXG4gICAgICAgIH0pO1xuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCc7XG5cbiAgICAgICAgaWYgKGNhc3NhbmRyYUVycm9yKSB7XG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW3BhZ2VdKSB7XG4gICAgICAgICAgICBmYWlsdXJlUmV0cmllc1twYWdlXSsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmYWlsdXJlUmV0cmllc1twYWdlXSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqIG1heGltdW0gb2YgMyByZXRyaWVzICovXG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW3BhZ2VdIDwgMykge1xuICAgICAgICAgICAgdG90YWxSZXF1ZXN0Q291bnQrKztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhdGVMaW1pdChtYWtlUmVxdWVzdCwgMTAwLCB0aGlzKShwYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2Fzc2FuZHJhRXJyb3IpIHtcbiAgICAgICAgICBmYWlsZWRQYWdlcy5wdXNoKHBhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgYCR7dGhpcy5nZXRQYWdlTGluayhwYWdlLCBxdWVyeVByb2plY3QpfTogJHskLmkxOG4oJ2FwaS1lcnJvcicsICdQYWdldmlld3MgQVBJJyl9IC0gJHtlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5sZXNzIGl0IHdhcyBhIDQwNCwgZG9uJ3QgY2FjaGUgdGhpcyBzZXJpZXMgb2YgcmVxdWVzdHNcbiAgICAgICAgaWYgKGVycm9yRGF0YS5zdGF0dXMgIT09IDQwNCkgaGFkRmFpbHVyZSA9IHRydWU7XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKCsrY291bnQsIHRvdGFsUmVxdWVzdENvdW50KTtcblxuICAgICAgICBpZiAoY291bnQgPT09IHRvdGFsUmVxdWVzdENvdW50KSB7XG4gICAgICAgICAgaWYgKGZhaWxlZFBhZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKFxuICAgICAgICAgICAgICAnYXBpLWVycm9yLXRpbWVvdXQnLFxuICAgICAgICAgICAgICAnPHVsPicgK1xuICAgICAgICAgICAgICBmYWlsZWRQYWdlcy5tYXAoZmFpbGVkUGFnZSA9PiBgPGxpPiR7dGhpcy5nZXRQYWdlTGluayhmYWlsZWRQYWdlLCBxdWVyeVByb2plY3QpfTwvbGk+YCkuam9pbignJykgK1xuICAgICAgICAgICAgICAnPC91bD4nXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZmQucmVzb2x2ZShwYWdlVmlld3NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlcXVlc3RGbiA9IHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcyk7XG5cbiAgICBwYWdlcy5mb3JFYWNoKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgcmVxdWVzdEZuKHBhZ2UpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBvdXIgbW90aGVyIGRhdGEgc2V0LCBmcm9tIHdoaWNoIHdlIGNhbiBkcmF3IGEgY2hhcnQsXG4gICAqICAgcmVuZGVyIGEgbGlzdCBvZiBkYXRhLCB3aGF0ZXZlciBvdXIgaGVhcnQgZGVzaXJlcyA6KVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxhYmVsIC0gbGFiZWwgZm9yIHRoZSBkYXRhc2V0IChlLmcuIGNhdGVnb3J5OmJsYWgsIHBhZ2UgcGlsZSAyNCwgZXRjKVxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxpbmsgLSBIVE1MIGFuY2hvciB0YWcgZm9yIHRoZSBsYWJlbFxuICAgKiBAcGFyYW0gIHthcnJheX0gZGF0YXNldHMgLSBhcnJheSBvZiBkYXRhc2V0cyBmb3IgZWFjaCBhcnRpY2xlLCBhcyByZXR1cm5lZCBieSB0aGUgUGFnZXZpZXdzIEFQSVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IG1vdGhlciBkYXRhIHNldCwgYWxzbyBzdG9yZWQgaW4gdGhpcy5vdXRwdXREYXRhXG4gICAqL1xuICBidWlsZE1vdGhlckRhdGFzZXQobGFiZWwsIGxpbmssIGRhdGFzZXRzKSB7XG4gICAgLyoqXG4gICAgICogYGRhdGFzZXRzYCBzdHJ1Y3R1cmU6XG4gICAgICpcbiAgICAgKiBbe1xuICAgICAqICAgdGl0bGU6IHBhZ2UsXG4gICAgICogICBwcm9qZWN0OiAnZW4ud2lraXBlZGlhLm9yZycsXG4gICAgICogICBpdGVtczogW1xuICAgICAqICAgICB7XG4gICAgICogICAgICAgYWNjZXNzOiAnJyxcbiAgICAgKiAgICAgICBhZ2VudDogJycsXG4gICAgICogICAgICAgYXJ0aWNsZTogJycsXG4gICAgICogICAgICAgZ3JhbnVsYXJpdHk6ICcnLFxuICAgICAqICAgICAgIHByb2plY3Q6ICcnLFxuICAgICAqICAgICAgIHRpbWVzdGFtcDogJycsXG4gICAgICogICAgICAgdmlld3M6IDEwXG4gICAgICogICAgIH1cbiAgICAgKiAgIF1cbiAgICAgKiB9XVxuICAgICAqXG4gICAgICogb3V0cHV0IHN0cnVjdHVyZTpcbiAgICAgKlxuICAgICAqIHtcbiAgICAgKiAgIGxhYmVsczogWycnXSxcbiAgICAgKiAgIGxpc3REYXRhOiBbXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICBsYWJlbDogJycsXG4gICAgICogICAgICAgcHJvamVjdDogJycsXG4gICAgICogICAgICAgZGF0YTogWzEsMiwzLDRdLFxuICAgICAqICAgICAgIHN1bTogMTAsXG4gICAgICogICAgICAgYXZlcmFnZTogMixcbiAgICAgKiAgICAgICBpbmRleDogMFxuICAgICAqICAgICAgIC4uLlxuICAgICAqICAgICAgIE1FUkdFIGluIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5kYXRhc2V0KHRoaXMuY29uZmlnLmNvbG9yc1swXSlcbiAgICAgKiAgICAgfVxuICAgICAqICAgXSxcbiAgICAgKiAgIHRvdGFsVmlld3NTZXQ6IFsxLDIsMyw0XSxcbiAgICAgKiAgIHN1bTogMTAsXG4gICAgICogICBhdmVyYWdlOiAyLFxuICAgICAqICAgZGF0ZXNXaXRob3V0RGF0YTogWycyMDE2LTA1LTE2VDAwOjAwOjAwLTAwOjAwJ11cbiAgICAgKiB9XG4gICAgICovXG5cbiAgICB0aGlzLm91dHB1dERhdGEgPSB7XG4gICAgICBsYWJlbHM6IHRoaXMuZ2V0RGF0ZUhlYWRpbmdzKHRydWUpLCAvLyBsYWJlbHMgbmVlZGVkIGZvciBDaGFydHMuanMsIGV2ZW4gdGhvdWdoIHdlJ2xsIG9ubHkgaGF2ZSBvbmUgZGF0YXNldFxuICAgICAgbGluaywgLy8gZm9yIG91ciBvd24gcHVycG9zZXNcbiAgICAgIGxpc3REYXRhOiBbXVxuICAgIH07XG4gICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSksXG4gICAgICBlbmREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUpLFxuICAgICAgbGVuZ3RoID0gdGhpcy5udW1EYXlzSW5SYW5nZSgpO1xuXG4gICAgbGV0IHRvdGFsVmlld3NTZXQgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKDApLFxuICAgICAgZGF0ZXNXaXRob3V0RGF0YSA9IFtdO1xuXG4gICAgZGF0YXNldHMuZm9yRWFjaCgoZGF0YXNldCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBkYXRhc2V0Lml0ZW1zLm1hcChpdGVtID0+IGl0ZW0udmlld3MpLFxuICAgICAgICBzdW0gPSBkYXRhLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuXG4gICAgICB0aGlzLm91dHB1dERhdGEubGlzdERhdGEucHVzaCh7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGxhYmVsOiBkYXRhc2V0LnRpdGxlLFxuICAgICAgICBwcm9qZWN0OiBkYXRhc2V0LnByb2plY3QsXG4gICAgICAgIHN1bSxcbiAgICAgICAgYXZlcmFnZTogc3VtIC8gbGVuZ3RoLFxuICAgICAgICBpbmRleFxuICAgICAgfSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogRW5zdXJlIHdlIGhhdmUgZGF0YSBmb3IgZWFjaCBkYXksIHVzaW5nIG51bGwgYXMgdGhlIHZpZXcgY291bnQgd2hlbiBkYXRhIGlzIGFjdHVhbGx5IG5vdCBhdmFpbGFibGUgeWV0XG4gICAgICAgKiBTZWUgZmlsbEluWmVyb3MoKSBjb21tZW50cyBmb3IgbW9yZSBpbmZvLlxuICAgICAgICovXG4gICAgICBjb25zdCBbdmlld3NTZXQsIGluY29tcGxldGVEYXRlc10gPSB0aGlzLmZpbGxJblplcm9zKGRhdGFzZXQuaXRlbXMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgICBpbmNvbXBsZXRlRGF0ZXMuZm9yRWFjaChkYXRlID0+IHtcbiAgICAgICAgaWYgKCFkYXRlc1dpdGhvdXREYXRhLmluY2x1ZGVzKGRhdGUpKSBkYXRlc1dpdGhvdXREYXRhLnB1c2goZGF0ZSk7XG4gICAgICB9KTtcblxuICAgICAgdG90YWxWaWV3c1NldCA9IHRvdGFsVmlld3NTZXQubWFwKChudW0sIGkpID0+IG51bSArIHZpZXdzU2V0W2ldLnZpZXdzKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGdyYW5kU3VtID0gdG90YWxWaWV3c1NldC5yZWR1Y2UoKGEsIGIpID0+IChhIHx8IDApICsgKGIgfHwgMCkpO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLm91dHB1dERhdGEsIHtcbiAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgZGF0YTogdG90YWxWaWV3c1NldCxcbiAgICAgICAgc3VtOiBncmFuZFN1bSxcbiAgICAgICAgYXZlcmFnZTogZ3JhbmRTdW0gLyBsZW5ndGhcbiAgICAgIH1dLFxuICAgICAgZGF0ZXNXaXRob3V0RGF0YSxcbiAgICAgIHN1bTogZ3JhbmRTdW0sIC8vIG5ldmVybWluZCB0aGUgZHVwbGljYXRpb25cbiAgICAgIGF2ZXJhZ2U6IGdyYW5kU3VtIC8gbGVuZ3RoXG4gICAgfSk7XG5cbiAgICBpZiAoZGF0ZXNXaXRob3V0RGF0YS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGRhdGVMaXN0ID0gZGF0ZXNXaXRob3V0RGF0YS5tYXAoZGF0ZSA9PiBtb21lbnQoZGF0ZSkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCkpO1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdhcGktaW5jb21wbGV0ZS1kYXRhJywgZGF0ZUxpc3Quc29ydCgpLmpvaW4oJyAmbWlkZG90OyAnKSwgZGF0ZUxpc3QubGVuZ3RoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlcmUgd2VyZSBubyBmYWlsdXJlcywgY2FjaGUgdGhlIHJlc3VsdCBhcyBzb21lIGRhdGFzZXRzIGNhbiBiZSB2ZXJ5IGxhcmdlLlxuICAgICAqIFRoZXJlIGlzIHNlcnZlciBjYWNoZSBidXQgdGhlcmUgaXMgYWxzbyBwcm9jZXNzaW5nIHRpbWUgdGhhdCBsb2NhbCBjYWNoaW5nIGNhbiBlbGltaW5hdGVcbiAgICAgKi9cbiAgICBpZiAoIXRoaXMuaGFkRmFpbHVyZSkge1xuICAgICAgLy8gMTAgbWludXRlcywgVFRMIGlzIG1pbGxpc2Vjb25kc1xuICAgICAgc2ltcGxlU3RvcmFnZS5zZXQodGhpcy5nZXRDYWNoZUtleSgpLCB0aGlzLm91dHB1dERhdGEsIHtUVEw6IDYwMDAwMH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm91dHB1dERhdGE7XG4gIH1cblxuICBnZXRQaWxlVVJMKGlkKSB7XG4gICAgcmV0dXJuIGBodHRwOi8vdG9vbHMud21mbGFicy5vcmcvcGFnZXBpbGUvYXBpLnBocD9hY3Rpb249Z2V0X2RhdGEmaWQ9JHtpZH1gO1xuICB9XG5cbiAgZ2V0UGlsZUxpbmsoaWQpIHtcbiAgICByZXR1cm4gYDxhIGhyZWY9JyR7dGhpcy5nZXRQaWxlVVJMKGlkKX0nIHRhcmdldD0nX2JsYW5rJz5QYWdlIFBpbGUgJHtpZH08L2E+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbGlzdCBvZiBwYWdlcyBmcm9tIFBhZ2UgUGlsZSBBUEkgZ2l2ZW4gaWRcbiAgICogQHBhcmFtICB7TnVtYmVyfSBpZCAtIFBhZ2VQaWxlIElEXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSAtIFByb21pc2UgcmVzb2x2aW5nIHdpdGggcGFnZSBuYW1lc1xuICAgKi9cbiAgZ2V0UGFnZVBpbGUoaWQpIHtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vdG9vbHMud21mbGFicy5vcmcvcGFnZXBpbGUvYXBpLnBocD9pZD0ke2lkfSZhY3Rpb249Z2V0X2RhdGEmZm9ybWF0PWpzb24mbWV0YWRhdGE9MWA7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsLFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgbGV0IHBhZ2VzID0gT2JqZWN0LmtleXMoZGF0YS5wYWdlcyk7XG5cbiAgICAgIGlmIChwYWdlcy5sZW5ndGggPiB0aGlzLmNvbmZpZy5hcGlMaW1pdCkge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ21hc3N2aWV3cy1vdmVyc2l6ZWQtc2V0JywgdGhpcy5nZXRQaWxlTGluayhpZCksIHRoaXMuZm9ybWF0TnVtYmVyKHBhZ2VzLmxlbmd0aCksIHRoaXMuY29uZmlnLmFwaUxpbWl0KVxuICAgICAgICApO1xuXG4gICAgICAgIHBhZ2VzID0gcGFnZXMuc2xpY2UoMCwgdGhpcy5jb25maWcuYXBpTGltaXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGZkLnJlc29sdmUoe1xuICAgICAgICBpZDogZGF0YS5pZCxcbiAgICAgICAgd2lraTogZGF0YS53aWtpLFxuICAgICAgICBwYWdlczogcGFnZXNcbiAgICAgIH0pO1xuICAgIH0pLmZhaWwoZXJyb3IgPT4ge1xuICAgICAgcmV0dXJuIGRmZC5yZWplY3QoXG4gICAgICAgIGAke3RoaXMuZ2V0UGlsZUxpbmsoaWQpfTogJHskLmkxOG4oJ2FwaS1lcnJvci1uby1kYXRhJyl9YFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2Ugd2lraSBVUkwgZm9yIHRoZSB3aWtpIGFuZCBwYWdlIG5hbWVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgLSBmdWxsIFVSTCB0byBhIHdpa2kgcGFnZVxuICAgKiBAcmV0dXJuIHtBcnJheXxudWxsfSBbJ3dpa2knLCAncGFnZSddIG9yIG51bGwgaWYgaW52YWxpZFxuICAgKi9cbiAgZ2V0V2lraVBhZ2VGcm9tVVJMKHVybCkge1xuICAgIGxldCBtYXRjaGVzO1xuXG4gICAgaWYgKHVybC5pbmNsdWRlcygnPycpKSB7XG4gICAgICBtYXRjaGVzID0gdXJsLm1hdGNoKC9cXC9cXC8oLio/KVxcL3dcXC8uKlxcPyg/Oi4qXFxiKT90aXRsZT0oLio/KSg/OiZ8JCkvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2hlcyA9IHVybC5tYXRjaCgvXFwvXFwvKC4qPylcXC93aWtpXFwvKC4qPykoPzpcXD98JCkvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXMuc2xpY2UoMSkgOiBbbnVsbCwgbnVsbF07XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBVUkwgcXVlcnkgc3RyaW5nIGFuZCBzZXRzIGFsbCB0aGUgaW5wdXRzIGFjY29yZGluZ2x5XG4gICAqIFNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBpbml0aWFsIHBhZ2UgbG9hZCwgdW50aWwgd2UgZGVjaWRlIHRvIHN1cHBvcnQgcG9wIHN0YXRlcyAocHJvYmFibHkgbmV2ZXIpXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwb3BQYXJhbXMoKSB7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoXG4gICAgICB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZURhdGVSYW5nZShwYXJhbXMpO1xuXG4gICAgdGhpcy5wYXRjaFVzYWdlKCk7XG5cbiAgICB0aGlzLnVwZGF0ZVNvdXJjZUlucHV0KCQoYC5zb3VyY2Utb3B0aW9uW2RhdGEtdmFsdWU9JHtwYXJhbXMuc291cmNlfV1gKVswXSk7XG5cbiAgICAvLyBmaWxsIGluIHZhbHVlIGZvciB0aGUgdGFyZ2V0XG4gICAgaWYgKHBhcmFtcy50YXJnZXQpIHtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbChkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLnRhcmdldCkuZGVzY29yZSgpKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgaW52YWxpZCBwYXJhbXMsIHJlbW92ZSB0YXJnZXQgZnJvbSBwYXJhbXMgc28gd2UgZG9uJ3QgcHJvY2VzcyB0aGUgZGVmYXVsdHMuXG4gICAgLy8gRklYTUU6IHdlJ3JlIGNoZWNraW5nIGZvciBzaXRlIG1lc3NhZ2VzIGJlY2F1c2Ugc3VwZXIudmFsaWRhdGVQYXJhbXMgZG9lc24ndCByZXR1cm4gYSBib29sZWFuXG4gICAgLy8gICBvciBhbnkgaW5kaWNhdGlvbiB0aGUgdmFsaWRhdGlvbnMgZmFpbGVkLiBUaGlzIGlzIGhhY2t5IGJ1dCBuZWNlc3NhcnkuXG4gICAgaWYgKCQoJy5zaXRlLW5vdGljZSAuYWxlcnQtZGFuZ2VyJykubGVuZ3RoKSB7XG4gICAgICBkZWxldGUgcGFyYW1zLnRhcmdldDtcbiAgICB9IGVsc2UgaWYgKHBhcmFtcy5vdmVyZmxvdyAmJiBwYXJhbXMuc291cmNlID09PSAncGFnZXBpbGUnICYmIHBhcmFtcy50YXJnZXQpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhleSByZXF1ZXN0ZWQgbW9yZSB0aGFuIDEwIHBhZ2VzIGluIFBhZ2V2aWV3cyAodmlhIHR5cGluZyBpdCBpbiB0aGUgVVJMKVxuICAgICAgICogICB0aGV5IGFyZSByZWRpcmVjdGVkIHRvIE1hc3N2aWV3cyB3aXRoIGFuIGF1dG8tZ2VuZXJhdGVkIFBhZ2VQaWxlLlxuICAgICAgICogICBUaGlzIHNob3dzIGEgbWVzc2FnZSBleHBsYWluaW5nIHdoYXQgaGFwcGVuZWQuXG4gICAgICAgKi9cbiAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZShcbiAgICAgICAgJ2luZm8nLFxuICAgICAgICAkLmkxOG4oJ21hc3N2aWV3cy1yZWRpcmVjdCcsICQuaTE4bigndGl0bGUnKSwgMTAsIHRoaXMuZ2V0UGlsZUxpbmsocGFyYW1zLnRhcmdldCkpLFxuICAgICAgICAnJyxcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAkKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbChwYXJhbXMucGxhdGZvcm0pO1xuICAgICQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKHBhcmFtcy5hZ2VudCk7XG5cbiAgICAvKiogZXhwb3J0IG5lY2Vzc2FyeSBwYXJhbXMgdG8gb3V0ZXIgc2NvcGUgKi9cbiAgICBbJ3NvcnQnLCAnZGlyZWN0aW9uJywgJ3ZpZXcnLCAnc291cmNlJywgJ3N1YmplY3RwYWdlJ10uZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG4gICAgfSk7XG5cbiAgICBpZiAoKHBhcmFtcy5zb3VyY2UgPT09ICdxdWFycnknIHx8IHBhcmFtcy5zb3VyY2UgPT09ICdleHRlcm5hbC1saW5rJykgJiYgcGFyYW1zLnByb2plY3QpIHtcbiAgICAgICQoJy5wcm9qZWN0LWlucHV0JykudmFsKHBhcmFtcy5wcm9qZWN0KTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLnN1YmplY3RwYWdlID09PSAnMScpIHtcbiAgICAgICQoJy5jYXRlZ29yeS1zdWJqZWN0LXRvZ2dsZS0taW5wdXQnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqIHN0YXJ0IHVwIHByb2Nlc3NpbmcgaWYgbmVjZXNzYXJ5IHBhcmFtcyBhcmUgcHJlc2VudCAqL1xuICAgIGlmIChwYXJhbXMudGFyZ2V0KSB7XG4gICAgICB0aGlzLnByb2Nlc3NJbnB1dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gc2V0IGEgQ1NTIGNsYXNzIG9uIHRoZSBgbWFpbmAgbm9kZSxcbiAgICogICBzdHlsaW5nIHRoZSBkb2N1bWVudCBiYXNlZCBvbiBhICdzdGF0ZSdcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gY2xhc3MgdG8gYmUgYWRkZWQ7XG4gICAqICAgc2hvdWxkIGJlIG9uZSBvZiBbJ2luaXRpYWwnLCAncHJvY2Vzc2luZycsICdjb21wbGV0ZSddXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYl0gLSBPcHRpb25hbCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgYWZ0ZXIgaW5pdGlhbCBzdGF0ZSBoYXMgYmVlbiBzZXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldFN0YXRlKHN0YXRlLCBjYikge1xuICAgICQoJ21haW4nKS5yZW1vdmVDbGFzcyh0aGlzLmNvbmZpZy5mb3JtU3RhdGVzLmpvaW4oJyAnKSkuYWRkQ2xhc3Moc3RhdGUpO1xuXG4gICAgc3dpdGNoIChzdGF0ZSkge1xuICAgIGNhc2UgJ2luaXRpYWwnOlxuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigwKTtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgICAgdGhpcy5hc3NpZ25EZWZhdWx0cygpO1xuICAgICAgdGhpcy5kZXN0cm95Q2hhcnQoKTtcbiAgICAgICQoJ291dHB1dCcpLnJlbW92ZUNsYXNzKCdsaXN0LW1vZGUnKS5yZW1vdmVDbGFzcygnY2hhcnQtbW9kZScpO1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHRoaXMudHlwZWFoZWFkLmhpZGUoKTtcbiAgICAgICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbCgnJykuZm9jdXMoKTtcbiAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIGNiLmNhbGwodGhpcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcm9jZXNzaW5nJzpcbiAgICAgIHRoaXMucHJvY2Vzc1N0YXJ0ZWQoKTtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY29tcGxldGUnOlxuICAgICAgdGhpcy5wcm9jZXNzRW5kZWQoKTtcbiAgICAgIC8qKiBzdG9wIGhpZGRlbiBhbmltYXRpb24gZm9yIHNsaWdodCBwZXJmb3JtYW5jZSBpbXByb3ZlbWVudCAqL1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigwKTtcbiAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKCcuZGF0YS1saW5rcycpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ludmFsaWQnOlxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byByZXNldCB0aGUgc3RhdGUgb2YgdGhlIGFwcCBhbmQgaW5kaWNhdGUgdGhhdCB0aGFuIEFQSSBlcnJvciBvY2N1cnJlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXBpTmFtZSAtIG5hbWUgb2YgdGhlIEFQSSB3aGVyZSB0aGUgZXJyb3Igb2NjdXJyZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtlcnJvck1lc3NhZ2VdIC0gb3B0aW9uYWwgZXJyb3IgbWVzc2FnZSB0byBzaG93IHJldHJpZXZlZCBmcm9tIEFQSVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhcGlFcnJvclJlc2V0KGFwaU5hbWUsIGVycm9yTWVzc2FnZSkge1xuICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCdpbml0aWFsJywgKCkgPT4ge1xuICAgICAgbGV0IG1lc3NhZ2U7XG4gICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBgJHskLmkxOG4oJ2FwaS1lcnJvcicsIGFwaU5hbWUpfTogJHtlcnJvck1lc3NhZ2V9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBgJHskLmkxOG4oJ2FwaS1lcnJvci11bmtub3duJywgYXBpTmFtZSl9YDtcbiAgICAgIH1cbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc1BhZ2VQaWxlKGNiKSB7XG4gICAgY29uc3QgcGlsZUlkID0gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCk7XG5cbiAgICAkKCcucHJvZ3Jlc3MtY291bnRlcicpLnRleHQoJC5pMThuKCdmZXRjaGluZy1kYXRhJywgJ1BhZ2UgUGlsZSBBUEknKSk7XG4gICAgdGhpcy5nZXRQYWdlUGlsZShwaWxlSWQpLmRvbmUocGlsZURhdGEgPT4ge1xuICAgICAgaWYgKCFwaWxlRGF0YS5wYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdtYXNzdmlld3MtZW1wdHktc2V0JywgdGhpcy5nZXRQaWxlTGluayhwaWxlSWQpKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyByZWZlcmVuY2Ugc2l0ZU1hcCBoYXNoIHRvIGdldCBwcm9qZWN0IGRvbWFpbiBmcm9tIGRhdGFiYXNlIG5hbWUgKGdpYW50IGZpbGUgaW4gL3NoYXJlZC9zaXRlX21hcC5qcylcbiAgICAgIGNvbnN0IHByb2plY3QgPSBzaXRlTWFwW3BpbGVEYXRhLndpa2ldO1xuXG4gICAgICAvKipcbiAgICAgICAqIHJlbW92ZSBQcm9qZWN0OiBwcmVmaXggaWYgcHJlc2VudCwgb25seSBmb3IgZW53aWtpLCBmb3Igbm93LFxuICAgICAgICogc2VlIGh0dHBzOi8vcGhhYnJpY2F0b3Iud2lraW1lZGlhLm9yZy9UMTM1NDM3XG4gICAgICAgKi9cbiAgICAgIGlmIChwcm9qZWN0ID09PSAnZW4ud2lraXBlZGlhLm9yZycpIHtcbiAgICAgICAgcGlsZURhdGEucGFnZXMgPSBwaWxlRGF0YS5wYWdlcy5tYXAocGFnZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHBhZ2UucmVwbGFjZSgvXlByb2plY3Q6V2lraXBlZGlhOi8sICdXaWtpcGVkaWE6Jyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmdldFBhZ2VWaWV3c0RhdGEocGlsZURhdGEucGFnZXMsIHByb2plY3QpLmRvbmUocGFnZVZpZXdzRGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gYFBhZ2UgUGlsZSAjJHtwaWxlRGF0YS5pZH1gO1xuXG4gICAgICAgICQoJy5vdXRwdXQtdGl0bGUnKS50ZXh0KGxhYmVsKS5wcm9wKCdocmVmJywgdGhpcy5nZXRQaWxlVVJMKHBpbGVEYXRhLmlkKSk7XG4gICAgICAgICQoJy5vdXRwdXQtcGFyYW1zJykuaHRtbChcbiAgICAgICAgICBgXG4gICAgICAgICAgJHskKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS52YWwoKX1cbiAgICAgICAgICAmbWRhc2g7XG4gICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vJHtwcm9qZWN0LmVzY2FwZSgpfVwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgJHtwcm9qZWN0LnJlcGxhY2UoLy5vcmckLywgJycpLmVzY2FwZSgpfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICBgXG4gICAgICAgICk7XG5cbiAgICAgICAgY2IobGFiZWwsIHRoaXMuZ2V0UGlsZUxpbmsocGlsZURhdGEuaWQpLCBwYWdlVmlld3NEYXRhKTtcbiAgICAgIH0pO1xuICAgIH0pLmZhaWwoZXJyb3IgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcpO1xuXG4gICAgICAvKiogc3RydWN0dXJlZCBlcnJvciBjb21lcyBiYWNrIGFzIGEgc3RyaW5nLCBvdGhlcndpc2Ugd2UgZG9uJ3Qga25vdyB3aGF0IGhhcHBlbmVkICovXG4gICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oJ2FwaS1lcnJvci11bmtub3duJywgJ1BhZ2UgUGlsZScpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb2Nlc3NDYXRlZ29yeShwcm9qZWN0LCBjYXRlZ29yeSwgY2IpIHtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSB7XG4gICAgICBsaXN0OiAnY2F0ZWdvcnltZW1iZXJzJyxcbiAgICAgIGNtbGltaXQ6IDUwMCxcbiAgICAgIGNtdGl0bGU6IGNhdGVnb3J5LFxuICAgICAgcHJvcDogJ2NhdGVnb3J5aW5mbycsXG4gICAgICB0aXRsZXM6IGNhdGVnb3J5XG4gICAgfTtcblxuICAgIGNvbnN0IGNhdGVnb3J5TGluayA9IHRoaXMuZ2V0UGFnZUxpbmsoY2F0ZWdvcnksIHByb2plY3QpO1xuXG4gICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignZmV0Y2hpbmctZGF0YScsICdDYXRlZ29yeSBBUEknKSk7XG4gICAgdGhpcy5tYXNzQXBpKHJlcXVlc3REYXRhLCBwcm9qZWN0LCAnY21jb250aW51ZScsICdjYXRlZ29yeW1lbWJlcnMnKS5kb25lKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpRXJyb3JSZXNldCgnQ2F0ZWdvcnkgQVBJJywgZGF0YS5lcnJvci5pbmZvKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFnZU9iaiA9IGRhdGEucGFnZXNbMF07XG5cbiAgICAgIGlmIChwYWdlT2JqLm1pc3NpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdhcGktZXJyb3Itbm8tZGF0YScpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNpemUgPSBwYWdlT2JqLmNhdGVnb3J5aW5mby5zaXplLFxuICAgICAgICAvLyBzaXRlSW5mbyBpcyBvbmx5IHBvcHVsYXRlZCBpZiB0aGV5J3ZlIG9wdGVkIHRvIHNlZSBzdWJqZWN0IHBhZ2VzIGluc3RlYWQgb2YgdGFsayBwYWdlc1xuICAgICAgICAvLyBPdGhlcndpc2UgbmFtZXNwYWNlcyBhcmUgbm90IG5lZWRlZCBieSB0aGlzLm1hcENhdGVnb3J5UGFnZU5hbWVzXG4gICAgICAgIG5hbWVzcGFjZXMgPSB0aGlzLmdldFNpdGVJbmZvKHByb2plY3QpID8gdGhpcy5nZXRTaXRlSW5mbyhwcm9qZWN0KS5uYW1lc3BhY2VzIDogdW5kZWZpbmVkO1xuICAgICAgbGV0IHBhZ2VzID0gZGF0YS5jYXRlZ29yeW1lbWJlcnM7XG5cbiAgICAgIGlmICghcGFnZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCdpbml0aWFsJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bignbWFzc3ZpZXdzLWVtcHR5LXNldCcsIGNhdGVnb3J5TGluaykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNpemUgPiB0aGlzLmNvbmZpZy5hcGlMaW1pdCkge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ21hc3N2aWV3cy1vdmVyc2l6ZWQtc2V0JywgY2F0ZWdvcnlMaW5rLCB0aGlzLmZvcm1hdE51bWJlcihzaXplKSwgdGhpcy5jb25maWcuYXBpTGltaXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgcGFnZXMgPSBwYWdlcy5zbGljZSgwLCB0aGlzLmNvbmZpZy5hcGlMaW1pdCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhZ2VOYW1lcyA9IHRoaXMubWFwQ2F0ZWdvcnlQYWdlTmFtZXMocGFnZXMsIG5hbWVzcGFjZXMpO1xuXG4gICAgICB0aGlzLmdldFBhZ2VWaWV3c0RhdGEocGFnZU5hbWVzLCBwcm9qZWN0KS5kb25lKHBhZ2VWaWV3c0RhdGEgPT4ge1xuICAgICAgICBjYihjYXRlZ29yeSwgY2F0ZWdvcnlMaW5rLCBwYWdlVmlld3NEYXRhKTtcbiAgICAgIH0pO1xuICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKCdpbml0aWFsJyk7XG5cbiAgICAgIC8qKiBzdHJ1Y3R1cmVkIGVycm9yIGNvbWVzIGJhY2sgYXMgYSBzdHJpbmcsIG90aGVyd2lzZSB3ZSBkb24ndCBrbm93IHdoYXQgaGFwcGVuZWQgKi9cbiAgICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhLmVycm9yID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ2FwaS1lcnJvcicsIGNhdGVnb3J5TGluayArICc6ICcgKyBkYXRhLmVycm9yKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdhcGktZXJyb3ItdW5rbm93bicsIGNhdGVnb3J5TGluaykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc0hhc2h0YWcoY2IpIHtcbiAgICBjb25zdCBoYXNodGFnID0gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCkucmVwbGFjZSgvXiMvLCAnJyksXG4gICAgICBoYXNoVGFnTGluayA9IGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL3Rvb2xzLndtZmxhYnMub3JnL2hhc2h0YWdzL3NlYXJjaC8ke2hhc2h0YWd9XCI+IyR7aGFzaHRhZy5lc2NhcGUoKX08L2E+YDtcblxuICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2ZldGNoaW5nLWRhdGEnLCAnSGFzaHRhZyBBUEknKSk7XG4gICAgJC5nZXQoYGh0dHA6Ly90b29scy53bWZsYWJzLm9yZy9oYXNodGFncy9jc3YvJHtoYXNodGFnfT9saW1pdD01MDAwYCkuZG9uZShkYXRhID0+IHtcbiAgICAgIC8qKlxuICAgICAgICogQ1NWVG9BcnJheSBjb2RlIGNvdXJ0ZXN5IG9mIEJlbiBOYWRlbFxuICAgICAgICogaHR0cDovL3d3dy5iZW5uYWRlbC5jb20vYmxvZy8xNTA0LWFzay1iZW4tcGFyc2luZy1jc3Ytc3RyaW5ncy13aXRoLWphdmFzY3JpcHQtZXhlYy1yZWd1bGFyLWV4cHJlc3Npb24tY29tbWFuZC5odG1cbiAgICAgICAqL1xuICAgICAgY29uc3Qgc3RyRGVsaW1pdGVyID0gJywnO1xuXG4gICAgICAvLyBDcmVhdGUgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcGFyc2UgdGhlIENTViB2YWx1ZXMuXG4gICAgICBjb25zdCBvYmpQYXR0ZXJuID0gbmV3IFJlZ0V4cChcbiAgICAgICAgKFxuICAgICAgICAgIC8vIERlbGltaXRlcnMuXG4gICAgICAgICAgYChcXFxcJHtzdHJEZWxpbWl0ZXJ9fFxcXFxyP1xcXFxufFxcXFxyfF4pYCArXG4gICAgICAgICAgLy8gUXVvdGVkIGZpZWxkcy5cbiAgICAgICAgICAnKD86XFxcIihbXlxcXCJdKig/OlxcXCJcXFwiW15cXFwiXSopKilcXFwifCcgK1xuICAgICAgICAgIC8vIFN0YW5kYXJkIGZpZWxkcy5cbiAgICAgICAgICBgKFteXFxcIlxcXFwke3N0ckRlbGltaXRlcn1cXFxcclxcXFxuXSopKWBcbiAgICAgICAgKSxcbiAgICAgICAgJ2dpJ1xuICAgICAgKTtcblxuICAgICAgLy8gQ3JlYXRlIGFuIGFycmF5IHRvIGhvbGQgb3VyIGRhdGEuIEdpdmUgdGhlIGFycmF5IGEgZGVmYXVsdCBlbXB0eSBmaXJzdCByb3cuXG4gICAgICBsZXQgY3N2RGF0YSA9IFtbXV07XG5cbiAgICAgIC8vIENyZWF0ZSBhbiBhcnJheSB0byBob2xkIG91ciBpbmRpdmlkdWFsIHBhdHRlcm5cbiAgICAgIC8vIG1hdGNoaW5nIGdyb3Vwcy5cbiAgICAgIGxldCBhcnJNYXRjaGVzO1xuXG4gICAgICAvLyBLZWVwIGxvb3Bpbmcgb3ZlciB0aGUgcmVndWxhciBleHByZXNzaW9uIG1hdGNoZXMgdW50aWwgd2UgY2FuIG5vIGxvbmdlciBmaW5kIGEgbWF0Y2guXG4gICAgICB3aGlsZSAoYXJyTWF0Y2hlcyA9IG9ialBhdHRlcm4uZXhlYyhkYXRhKSkge1xuICAgICAgICAvLyBHZXQgdGhlIGRlbGltaXRlciB0aGF0IHdhcyBmb3VuZC5cbiAgICAgICAgY29uc3Qgc3RyTWF0Y2hlZERlbGltaXRlciA9IGFyck1hdGNoZXNbMV07XG5cbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBnaXZlbiBkZWxpbWl0ZXIgaGFzIGEgbGVuZ3RoXG4gICAgICAgIC8vIChpcyBub3QgdGhlIHN0YXJ0IG9mIHN0cmluZykgYW5kIGlmIGl0IG1hdGNoZXNcbiAgICAgICAgLy8gZmllbGQgZGVsaW1pdGVyLiBJZiBpZCBkb2VzIG5vdCwgdGhlbiB3ZSBrbm93XG4gICAgICAgIC8vIHRoYXQgdGhpcyBkZWxpbWl0ZXIgaXMgYSByb3cgZGVsaW1pdGVyLlxuICAgICAgICBpZiAoc3RyTWF0Y2hlZERlbGltaXRlci5sZW5ndGggJiYgc3RyTWF0Y2hlZERlbGltaXRlciAhPT0gc3RyRGVsaW1pdGVyKSB7XG4gICAgICAgICAgLy8gU2luY2Ugd2UgaGF2ZSByZWFjaGVkIGEgbmV3IHJvdyBvZiBkYXRhLCBhZGQgYW4gZW1wdHkgcm93IHRvIG91ciBkYXRhIGFycmF5LlxuICAgICAgICAgIGNzdkRhdGEucHVzaChbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RyTWF0Y2hlZFZhbHVlO1xuXG4gICAgICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIGRlbGltaXRlciBvdXQgb2YgdGhlIHdheSxcbiAgICAgICAgLy8gbGV0J3MgY2hlY2sgdG8gc2VlIHdoaWNoIGtpbmQgb2YgdmFsdWUgd2VcbiAgICAgICAgLy8gY2FwdHVyZWQgKHF1b3RlZCBvciB1bnF1b3RlZCkuXG4gICAgICAgIGlmIChhcnJNYXRjaGVzWzJdKSB7XG4gICAgICAgICAgLy8gV2UgZm91bmQgYSBxdW90ZWQgdmFsdWUuIFdoZW4gd2UgY2FwdHVyZVxuICAgICAgICAgIC8vIHRoaXMgdmFsdWUsIHVuZXNjYXBlIGFueSBkb3VibGUgcXVvdGVzLlxuICAgICAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbMl0ucmVwbGFjZShcbiAgICAgICAgICAgIG5ldyBSZWdFeHAoJ1xcXCJcXFwiJywgJ2cnKSwgJ1xcXCInXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBXZSBmb3VuZCBhIG5vbi1xdW90ZWQgdmFsdWUuXG4gICAgICAgICAgc3RyTWF0Y2hlZFZhbHVlID0gYXJyTWF0Y2hlc1szXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgb3VyIHZhbHVlIHN0cmluZywgbGV0J3MgYWRkIGl0IHRvIHRoZSBkYXRhIGFycmF5LlxuICAgICAgICBjc3ZEYXRhW2NzdkRhdGEubGVuZ3RoIC0gMV0ucHVzaChzdHJNYXRjaGVkVmFsdWUpO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgZXh0cmFuZW91cyBlbXB0eSBlbnRyeSwgaWYgcHJlc2VudFxuICAgICAgaWYgKGNzdkRhdGFbY3N2RGF0YS5sZW5ndGggLSAxXS5sZW5ndGggPT09IDEgJiYgIWNzdkRhdGFbY3N2RGF0YS5sZW5ndGggLSAxXVswXSkge1xuICAgICAgICBjc3ZEYXRhID0gY3N2RGF0YS5zbGljZSgwLCAtMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIG9ubHkgaGVhZGVyIHJvdyBpcyBwcmVzZW50LCByZXNldCB2aWV3IGFuZCB0aHJvdyBlcnJvciBmb3IgYmVpbmcgYW4gZW1wdHkgc2V0XG4gICAgICBpZiAoY3N2RGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdtYXNzdmlld3MtZW1wdHktc2V0JywgaGFzaFRhZ0xpbmspKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbGxlY3QgbmVjZXNzYXJ5IGRhdGEgZnJvbSB0aGUgb3RoZXIgcm93c1xuICAgICAgdGhpcy5nZXRQYWdlVVJMc0Zyb21IYXNodGFnQ1NWKGNzdkRhdGEpLmRvbmUocGFnZVVSTHMgPT4ge1xuICAgICAgICBjb25zdCBzaXplID0gcGFnZVVSTHMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChzaXplID4gdGhpcy5jb25maWcuYXBpTGltaXQpIHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAgICQuaTE4bignbWFzc3ZpZXdzLW92ZXJzaXplZC1zZXQnLCBoYXNoVGFnTGluaywgdGhpcy5mb3JtYXROdW1iZXIoc2l6ZSksIHRoaXMuY29uZmlnLmFwaUxpbWl0KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBwYWdlVVJMcyA9IHBhZ2VVUkxzLnNsaWNlKDAsIHRoaXMuY29uZmlnLmFwaUxpbWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0UGFnZVZpZXdzRGF0YShwYWdlVVJMcykuZG9uZShwYWdlVmlld3NEYXRhID0+IHtcbiAgICAgICAgICBjYihoYXNodGFnLCBoYXNoVGFnTGluaywgcGFnZVZpZXdzRGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkuZmFpbCgoKSA9PiB0aGlzLmFwaUVycm9yUmVzZXQoJ1NpdGVpbmZvIEFQSScpKTtcbiAgICB9KS5mYWlsKCgpID0+IHRoaXMuYXBpRXJyb3JSZXNldCgnSGFzaHRhZyBBUEknKSk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIGZvciBwcm9jZXNzSGFzaHRhZyB0aGF0IHBhcnNlcyB0aGUgQ1NWIGRhdGEgdG8gZ2V0IHRoZSBwYWdlIFVSTHNcbiAgICogQHBhcmFtICB7QXJyYXl9IGNzdkRhdGEgLSBhcyBidWlsdCBieSBwcm9jZXNzSGFzaHRhZ1xuICAgKiBAcmV0dXJuIHtBcnJheX0gZnVsbCBwYWdlIFVSTHNcbiAgICovXG4gIGdldFBhZ2VVUkxzRnJvbUhhc2h0YWdDU1YoY3N2RGF0YSkge1xuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIC8vIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBwYWdlIHRpdGxlLCBsYW5ndWFnZSBhbmQgZGlmZiBVUkxcbiAgICBjb25zdCBwYWdlVGl0bGVJbmRleCA9IGNzdkRhdGFbMF0uaW5kZXhPZignc3BhY2VkX3RpdGxlJyksXG4gICAgICBuYW1lc3BhY2VJbmRleCA9IGNzdkRhdGFbMF0uaW5kZXhPZigncmNfbmFtZXNwYWNlJyksXG4gICAgICBkaWZmSW5kZXggPSBjc3ZEYXRhWzBdLmluZGV4T2YoJ2RpZmZfdXJsJyk7XG5cbiAgICBsZXQgcGFnZVVSTHMgPSBbXTtcblxuICAgIC8vIGNvbGxlY3QgbmVjZXNzYXJ5IGRhdGEgZnJvbSB0aGUgb3RoZXIgcm93c1xuICAgIGNzdkRhdGEuc2xpY2UoMSkuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gZW50cnlbZGlmZkluZGV4XS5tYXRjaCgvaHR0cHM6XFwvXFwvKC4qP1xcLm9yZylcXC8vKVsxXTtcblxuICAgICAgLy8gZ2V0IHNpdGVpbmZvIHNvIHdlIGNhbiBnZXQgdGhlIG5hbWVzcGFjZSBuYW1lcyAoZWl0aGVyIGZyb20gY2FjaGUgb3IgZnJvbSBBUEkpXG4gICAgICB0aGlzLmZldGNoU2l0ZUluZm8ocHJvamVjdCkuZG9uZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5zTmFtZSA9IHRoaXMuZ2V0U2l0ZUluZm8ocHJvamVjdCkubmFtZXNwYWNlc1tlbnRyeVtuYW1lc3BhY2VJbmRleF1dWycqJ107XG4gICAgICAgIHBhZ2VVUkxzLnB1c2goXG4gICAgICAgICAgYGh0dHBzOi8vJHtwcm9qZWN0fS93aWtpLyR7ISFuc05hbWUgPyBuc05hbWUgKyAnOicgOiAnJ30ke2VudHJ5W3BhZ2VUaXRsZUluZGV4XX1gXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gaWYgd2UncmUgb24gdGhlIGxhc3QgaXRlcmF0aW9uIHJlc29sdmUgdGhlIG91dGVyIHByb21pc2Ugd2l0aCB0aGUgdW5pcXVlIHBhZ2UgbmFtZXNcbiAgICAgICAgaWYgKHBhZ2VVUkxzLmxlbmd0aCA9PT0gY3N2RGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgZGZkLnJlc29sdmUocGFnZVVSTHMudW5pcXVlKCkpO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICAgZGZkLnJlamVjdCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgcHJvY2Vzc1N1YnBhZ2VzKHByb2plY3QsIHRhcmdldFBhZ2UsIGNiKSB7XG4gICAgLy8gZGV0ZXJtaW5lIHdoYXQgbmFtZXNwYWNlIHRoZSB0YXJnZXRQYWdlIGlzIGluXG4gICAgY29uc3QgZGVzY29yZWRUYXJnZXRQYWdlID0gdGFyZ2V0UGFnZS5kZXNjb3JlKCk7XG4gICAgbGV0IG5hbWVzcGFjZSA9IDAsIHF1ZXJ5VGFyZ2V0UGFnZTtcbiAgICBmb3IgKGNvbnN0IG5zIGluIHRoaXMuZ2V0U2l0ZUluZm8ocHJvamVjdCkubmFtZXNwYWNlcykge1xuICAgICAgaWYgKG5zID09PSAnMCcpIGNvbnRpbnVlOyAvLyBza2lwIG1haW5zcGFjZVxuXG4gICAgICBjb25zdCBuc05hbWUgPSB0aGlzLmdldFNpdGVJbmZvKHByb2plY3QpLm5hbWVzcGFjZXNbbnNdWycqJ10gKyAnOic7XG4gICAgICBpZiAoZGVzY29yZWRUYXJnZXRQYWdlLnN0YXJ0c1dpdGgobnNOYW1lKSkge1xuICAgICAgICBuYW1lc3BhY2UgPSB0aGlzLmdldFNpdGVJbmZvKHByb2plY3QpLm5hbWVzcGFjZXNbbnNdLmlkO1xuICAgICAgICBxdWVyeVRhcmdldFBhZ2UgPSB0YXJnZXRQYWdlLnN1YnN0cmluZyhuc05hbWUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXQgbmFtZXNwYWNlIG51bWJlciBvZiBjb3JyZXNwb25kaW5nIHRhbGsgb3Igc3ViamVjdCBwYWdlXG4gICAgY29uc3QgaW52ZXJzZU5hbWVzcGFjZSA9IG5hbWVzcGFjZSAlIDIgPT09IDAgPyBuYW1lc3BhY2UgKyAxIDogbmFtZXNwYWNlIC0gMTtcblxuICAgIGxldCBwcm9taXNlcyA9IFtdO1xuXG4gICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignZmV0Y2hpbmctZGF0YScsICdBbGxwYWdlcyBBUEknKSk7XG4gICAgW25hbWVzcGFjZSwgaW52ZXJzZU5hbWVzcGFjZV0uZm9yRWFjaChhcG5hbWVzcGFjZSA9PiB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGxpc3Q6ICdhbGxwYWdlcycsXG4gICAgICAgIGFwbGltaXQ6IDUwMCxcbiAgICAgICAgYXBuYW1lc3BhY2UsXG4gICAgICAgIGFwcHJlZml4OiBxdWVyeVRhcmdldFBhZ2UgKyAnLydcbiAgICAgIH07XG4gICAgICBwcm9taXNlcy5wdXNoKFxuICAgICAgICB0aGlzLm1hc3NBcGkocGFyYW1zLCBwcm9qZWN0LCAnYXBjb250aW51ZScsICdhbGxwYWdlcycpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcGFnZUxpbmsgPSB0aGlzLmdldFBhZ2VMaW5rKHRhcmdldFBhZ2UsIHByb2plY3QpO1xuXG4gICAgJC53aGVuKC4uLnByb21pc2VzKS5kb25lKChkYXRhLCBkYXRhMikgPT4ge1xuICAgICAgLy8gc2hvdyBlcnJvcnMsIGlmIGFueVxuICAgICAgY29uc3QgZXJyb3JzID0gW2RhdGEsIGRhdGEyXS5maWx0ZXIocmVzcCA9PiAhIXJlc3AuZXJyb3IpO1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcsICgpID0+IHtcbiAgICAgICAgICBlcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAgICAgYCR7JC5pMThuKCdhcGktZXJyb3InLCAnQWxscGFnZXMgQVBJJyl9OiAke2Vycm9yLmVycm9yLmluZm8uZXNjYXBlKCl9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHBhZ2VzID0gZGF0YS5hbGxwYWdlcy5jb25jYXQoZGF0YTIuYWxscGFnZXMpO1xuICAgICAgY29uc3Qgc2l6ZSA9IHBhZ2VzLmxlbmd0aDtcblxuICAgICAgaWYgKHNpemUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdhcGktZXJyb3Itbm8tZGF0YScpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaXplID4gdGhpcy5jb25maWcuYXBpTGltaXQpIHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgJC5pMThuKCdtYXNzdmlld3Mtb3ZlcnNpemVkLXNldCcsIHBhZ2VMaW5rLCB0aGlzLmZvcm1hdE51bWJlcihzaXplKSwgdGhpcy5jb25maWcuYXBpTGltaXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgcGFnZXMgPSBwYWdlcy5zbGljZSgwLCB0aGlzLmNvbmZpZy5hcGlMaW1pdCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhZ2VOYW1lcyA9IFt0YXJnZXRQYWdlXS5jb25jYXQocGFnZXMubWFwKHBhZ2UgPT4gcGFnZS50aXRsZSkpO1xuXG4gICAgICB0aGlzLmdldFBhZ2VWaWV3c0RhdGEocGFnZU5hbWVzLCBwcm9qZWN0KS5kb25lKHBhZ2VWaWV3c0RhdGEgPT4ge1xuICAgICAgICBjYih0YXJnZXRQYWdlLCBwYWdlTGluaywgcGFnZVZpZXdzRGF0YSk7XG4gICAgICB9KTtcbiAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcpO1xuXG4gICAgICAvKiogc3RydWN0dXJlZCBlcnJvciBjb21lcyBiYWNrIGFzIGEgc3RyaW5nLCBvdGhlcndpc2Ugd2UgZG9uJ3Qga25vdyB3aGF0IGhhcHBlbmVkICovXG4gICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YS5lcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgJC5pMThuKCdhcGktZXJyb3InLCBwYWdlTGluayArICc6ICcgKyBkYXRhLmVycm9yKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdhcGktZXJyb3ItdW5rbm93bicsIHBhZ2VMaW5rKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzVGVtcGxhdGUocHJvamVjdCwgdGVtcGxhdGUsIGNiKSB7XG4gICAgbGV0IHJlcXVlc3REYXRhID0ge1xuICAgICAgcHJvcDogJ3RyYW5zY2x1ZGVkaW4nLFxuICAgICAgdGlsaW1pdDogNTAwLFxuICAgICAgdGl0bGVzOiB0ZW1wbGF0ZVxuICAgIH07XG5cbiAgICBjb25zdCB0ZW1wbGF0ZUxpbmsgPSB0aGlzLmdldFBhZ2VMaW5rKHRlbXBsYXRlLCBwcm9qZWN0KTtcblxuICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2ZldGNoaW5nLWRhdGEnLCAnVHJhbnNjbHVzaW9uIEFQSScpKTtcbiAgICB0aGlzLm1hc3NBcGkocmVxdWVzdERhdGEsIHByb2plY3QsICd0aWNvbnRpbnVlJywgZGF0YSA9PiBkYXRhLnBhZ2VzWzBdLnRyYW5zY2x1ZGVkaW4pLmRvbmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hcGlFcnJvclJlc2V0KCdUcmFuc2NsdXNpb24gQVBJJywgZGF0YS5lcnJvci5pbmZvKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhpcyBoYXBwZW5zIGlmIHRoZXJlIGFyZSBubyB0cmFuc2NsdXNpb25zIG9yIHRoZSB0ZW1wbGF0ZSBjb3VsZCBub3QgYmUgZm91bmRcbiAgICAgIGlmICghZGF0YS5wYWdlc1swXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oJ2FwaS1lcnJvci1uby1kYXRhJykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFnZXMgPSBkYXRhLnBhZ2VzLm1hcChwYWdlID0+IHBhZ2UudGl0bGUpO1xuXG4gICAgICAvLyB0aGVyZSB3ZXJlIG1vcmUgcGFnZXMgdGhhdCBjb3VsZCBub3QgYmUgcHJvY2Vzc2VkIGFzIHdlIGhpdCB0aGUgbGltaXRcbiAgICAgIGlmIChkYXRhLmNvbnRpbnVlKSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICQuaTE4bignbWFzc3ZpZXdzLW92ZXJzaXplZC1zZXQtdW5rbm93bicsIHRlbXBsYXRlTGluaywgdGhpcy5jb25maWcuYXBpTGltaXQpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ2V0UGFnZVZpZXdzRGF0YShwYWdlcywgcHJvamVjdCkuZG9uZShwYWdlVmlld3NEYXRhID0+IHtcbiAgICAgICAgY2IodGVtcGxhdGUsIHRlbXBsYXRlTGluaywgcGFnZVZpZXdzRGF0YSk7XG4gICAgICB9KTtcbiAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcpO1xuXG4gICAgICAvKiogc3RydWN0dXJlZCBlcnJvciBjb21lcyBiYWNrIGFzIGEgc3RyaW5nLCBvdGhlcndpc2Ugd2UgZG9uJ3Qga25vdyB3aGF0IGhhcHBlbmVkICovXG4gICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YS5lcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgJC5pMThuKCdhcGktZXJyb3InLCB0ZW1wbGF0ZUxpbmsgKyAnOiAnICsgZGF0YS5lcnJvcilcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bignYXBpLWVycm9yLXVua25vd24nLCB0ZW1wbGF0ZUxpbmspKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByb2Nlc3NXaWtpUGFnZShwcm9qZWN0LCBwYWdlLCBjYikge1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IHtcbiAgICAgIHBsbGltaXQ6IDUwMCxcbiAgICAgIHByb3A6ICdsaW5rcycsXG4gICAgICB0aXRsZXM6IHBhZ2VcbiAgICB9O1xuXG4gICAgY29uc3QgcGFnZUxpbmsgPSB0aGlzLmdldFBhZ2VMaW5rKHBhZ2UsIHByb2plY3QpO1xuXG4gICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignZmV0Y2hpbmctZGF0YScsICdMaW5rcyBBUEknKSk7XG4gICAgdGhpcy5tYXNzQXBpKHJlcXVlc3REYXRhLCBwcm9qZWN0LCAncGxjb250aW51ZScsIGRhdGEgPT4gZGF0YS5wYWdlc1swXS5saW5rcykuZG9uZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLmVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwaUVycm9yUmVzZXQoJ0xpbmtzIEFQSScsIGRhdGEuZXJyb3IuaW5mbyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgaGFwcGVucyBpZiB0aGVyZSBhcmUgbm8gd2lraWxpbmtzIG9yIHRoZSBwYWdlIGNvdWxkIG5vdCBiZSBmb3VuZFxuICAgICAgaWYgKCFkYXRhLnBhZ2VzWzBdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCdpbml0aWFsJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bignYXBpLWVycm9yLW5vLWRhdGEnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWdlcyA9IGRhdGEucGFnZXMubWFwKHBhZ2UgPT4gcGFnZS50aXRsZSk7XG5cbiAgICAgIGlmICghcGFnZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCdpbml0aWFsJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bignbWFzc3ZpZXdzLWVtcHR5LXNldCcsIHBhZ2VMaW5rKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBpbiB0aGlzIGNhc2Ugd2Uga25vdyB0aGVyZSBhcmUgbW9yZSB0aGFuIHRoaXMuY29uZmlnLmFwaUxpbWl0IHBhZ2VzXG4gICAgICAvLyAgIGJlY2F1c2Ugd2UgZ290IGJhY2sgYSBkYXRhLmNvbnRpbnVlIHZhbHVlXG4gICAgICBpZiAoZGF0YS5jb250aW51ZSkge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ21hc3N2aWV3cy1vdmVyc2l6ZWQtc2V0LXVua25vd24nLCBwYWdlTGluaywgdGhpcy5jb25maWcuYXBpTGltaXQpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ2V0UGFnZVZpZXdzRGF0YShwYWdlcywgcHJvamVjdCkuZG9uZShwYWdlVmlld3NEYXRhID0+IHtcbiAgICAgICAgY2IocGFnZSwgcGFnZUxpbmssIHBhZ2VWaWV3c0RhdGEpO1xuICAgICAgfSk7XG4gICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRhdGEgJiYgdHlwZW9mIGRhdGEuZXJyb3IgPT09ICdzdHJpbmcnID8gZGF0YS5lcnJvciA6IG51bGw7XG4gICAgICB0aGlzLmFwaUVycm9yUmVzZXQoJ0xpbmtzIEFQSScsIGVycm9yTWVzc2FnZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzUXVhcnJ5KGNiKSB7XG4gICAgY29uc3QgcHJvamVjdCA9ICQoJy5wcm9qZWN0LWlucHV0JykudmFsKCksXG4gICAgICBpZCA9ICQodGhpcy5jb25maWcuc291cmNlSW5wdXQpLnZhbCgpO1xuICAgIGlmICghdGhpcy52YWxpZGF0ZVByb2plY3QocHJvamVjdCkpIHJldHVybjtcblxuICAgIGNvbnN0IHVybCA9IGBodHRwczovL3F1YXJyeS53bWZsYWJzLm9yZy9xdWVyeS8ke2lkfS9yZXN1bHQvbGF0ZXN0LzAvanNvbmAsXG4gICAgICBxdWFycnlMaW5rID0gYDxhIHRhcmdldD0nX2JsYW5rJyBocmVmPSdodHRwczovL3F1YXJyeS53bWZsYWJzLm9yZy9xdWVyeS8ke2lkfSc+UXVhcnJ5ICR7aWR9PC9hPmA7XG5cbiAgICAkKCcucHJvZ3Jlc3MtY291bnRlcicpLnRleHQoJC5pMThuKCdmZXRjaGluZy1kYXRhJywgJ1F1YXJyeSBBUEknKSk7XG4gICAgJC5nZXRKU09OKHVybCkuZG9uZShkYXRhID0+IHtcbiAgICAgIGNvbnN0IHRpdGxlSW5kZXggPSBkYXRhLmhlYWRlcnMuaW5kZXhPZigncGFnZV90aXRsZScpO1xuXG4gICAgICBpZiAodGl0bGVJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcpO1xuICAgICAgICByZXR1cm4gdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKCdpbnZhbGlkLXF1YXJyeS1kYXRhc2V0JywgJ3BhZ2VfdGl0bGUnKSk7XG4gICAgICB9XG5cbiAgICAgIGxldCB0aXRsZXMgPSBkYXRhLnJvd3MubWFwKHJvdyA9PiByb3dbdGl0bGVJbmRleF0pO1xuXG4gICAgICBpZiAodGl0bGVzLmxlbmd0aCA+IHRoaXMuY29uZmlnLmFwaUxpbWl0KSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICQuaTE4bignbWFzc3ZpZXdzLW92ZXJzaXplZC1zZXQnLCBxdWFycnlMaW5rLCB0aGlzLmZvcm1hdE51bWJlcih0aXRsZXMubGVuZ3RoKSwgdGhpcy5jb25maWcuYXBpTGltaXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGl0bGVzID0gdGl0bGVzLnNsaWNlKDAsIHRoaXMuY29uZmlnLmFwaUxpbWl0KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5nZXRQYWdlVmlld3NEYXRhKHRpdGxlcywgcHJvamVjdCkuZG9uZShwYWdlVmlld3NEYXRhID0+IHtcbiAgICAgICAgY2IoaWQsIHF1YXJyeUxpbmssIHBhZ2VWaWV3c0RhdGEpO1xuICAgICAgfSk7XG4gICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcbiAgICAgIHJldHVybiB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oJ2FwaS1lcnJvci11bmtub3duJywgJ1F1YXJyeSBBUEknKSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzRXh0ZXJuYWxMaW5rKGNiKSB7XG4gICAgY29uc3QgcHJvamVjdCA9ICQoJy5wcm9qZWN0LWlucHV0JykudmFsKCksXG4gICAgICBsaW5rID0gJCh0aGlzLmNvbmZpZy5zb3VyY2VJbnB1dCkudmFsKCk7XG4gICAgaWYgKCF0aGlzLnZhbGlkYXRlUHJvamVjdChwcm9qZWN0KSkgcmV0dXJuO1xuXG4gICAgbGV0IHJlcXVlc3REYXRhID0ge1xuICAgICAgbGlzdDogJ2V4dHVybHVzYWdlJyxcbiAgICAgIGV1bGltaXQ6IDUwMCxcbiAgICAgIGV1bmFtZXNwYWNlOiAwLFxuICAgICAgZXVxdWVyeTogbGlua1xuICAgIH07XG5cbiAgICBjb25zdCBsaW5rU2VhcmNoTGluayA9IGA8YSB0YXJnZXQ9J19ibGFuaycgaHJlZj0naHR0cHM6Ly8ke3Byb2plY3R9L3cvaW5kZXgucGhwP3RhcmdldD0ke2xpbmt9JnRpdGxlPVNwZWNpYWw6TGlua1NlYXJjaCc+JHtsaW5rfTwvYT5gO1xuXG4gICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignZmV0Y2hpbmctZGF0YScsICdFeHRlcm5hbCBsaW5rIEFQSScpKTtcbiAgICB0aGlzLm1hc3NBcGkocmVxdWVzdERhdGEsIHByb2plY3QsICdldW9mZnNldCcsICdleHR1cmx1c2FnZScpLmRvbmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5lcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hcGlFcnJvclJlc2V0KCdFeHRlcm5hbCBsaW5rIEFQSScsIGRhdGEuZXJyb3IuaW5mbyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoaXMgaGFwcGVucyBpZiB0aGVyZSBhcmUgbm8gZXh0ZXJuYWwgbGlua3NcbiAgICAgIGlmICghZGF0YS5leHR1cmx1c2FnZVswXSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oJ2FwaS1lcnJvci1uby1kYXRhJykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFnZXMgPSBkYXRhLmV4dHVybHVzYWdlLm1hcChwYWdlID0+IHBhZ2UudGl0bGUpLnVuaXF1ZSgpO1xuXG4gICAgICBpZiAoIXBhZ2VzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZSgkLmkxOG4oJ21hc3N2aWV3cy1lbXB0eS1zZXQnLCBsaW5rU2VhcmNoTGluaykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhlcmUgd2VyZSBtb3JlIHBhZ2VzIHRoYXQgY291bGQgbm90IGJlIHByb2Nlc3NlZCBhcyB3ZSBoaXQgdGhlIGxpbWl0XG4gICAgICBpZiAoZGF0YS5jb250aW51ZSkge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ21hc3N2aWV3cy1vdmVyc2l6ZWQtc2V0LXVua25vd24nLCBsaW5rU2VhcmNoTGluaywgdGhpcy5jb25maWcuYXBpTGltaXQpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ2V0UGFnZVZpZXdzRGF0YShwYWdlcywgcHJvamVjdCkuZG9uZShwYWdlVmlld3NEYXRhID0+IHtcbiAgICAgICAgY2IobGluaywgbGlua1NlYXJjaExpbmssIHBhZ2VWaWV3c0RhdGEpO1xuICAgICAgfSk7XG4gICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnKTtcblxuICAgICAgLyoqIHN0cnVjdHVyZWQgZXJyb3IgY29tZXMgYmFjayBhcyBhIHN0cmluZywgb3RoZXJ3aXNlIHdlIGRvbid0IGtub3cgd2hhdCBoYXBwZW5lZCAqL1xuICAgICAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEuZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICQuaTE4bignYXBpLWVycm9yJywgbGlua1NlYXJjaExpbmsgKyAnOiAnICsgZGF0YS5lcnJvcilcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bignYXBpLWVycm9yLXVua25vd24nLCBsaW5rU2VhcmNoTGluaykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGdpdmVuIHByb2plY3QgYW5kIHRocm93IGFuIGVycm9yIGlmIGludmFsaWRcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9qZWN0IC0gdGhhIHByb2plY3RcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgdmFsaWRhdGVQcm9qZWN0KHByb2plY3QpIHtcbiAgICBpZiAoIXByb2plY3QpIHJldHVybiBmYWxzZTtcblxuICAgIC8qKiBSZW1vdmUgd3d3IGhvc3RuYW1lcyBzaW5jZSB0aGUgcGFnZXZpZXdzIEFQSSBkb2Vzbid0IGV4cGVjdCB0aGVtLiAqL1xuICAgIHByb2plY3QgPSBwcm9qZWN0LnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG5cbiAgICBpZiAoc2l0ZURvbWFpbnMuaW5jbHVkZXMocHJvamVjdCkpIHJldHVybiB0cnVlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSgnaW5pdGlhbCcpO1xuICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgJC5pMThuKCdpbnZhbGlkLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBtYXBDYXRlZ29yeVBhZ2VOYW1lcyhwYWdlcywgbmFtZXNwYWNlcykge1xuICAgIGxldCBwYWdlTmFtZXMgPSBbXTtcblxuICAgIHBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICBpZiAobmFtZXNwYWNlcyAmJiBwYWdlLm5zICUgMiA9PT0gMSkge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBuYW1lc3BhY2VzW3BhZ2UubnNdLmNhbm9uaWNhbDtcbiAgICAgICAgY29uc3Qgc3ViamVjdE5hbWVzcGFjZSA9IG5hbWVzcGFjZXNbcGFnZS5ucyAtIDFdLmNhbm9uaWNhbCB8fCAnJztcbiAgICAgICAgcGFnZU5hbWVzLnB1c2gocGFnZS50aXRsZS5yZXBsYWNlKG5hbWVzcGFjZSwgc3ViamVjdE5hbWVzcGFjZSkucmVwbGFjZSgvXlxcOi8sICcnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdlTmFtZXMucHVzaChwYWdlLnRpdGxlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwYWdlTmFtZXM7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyB0aGUgbWFzc3ZpZXdzIGZvciB0aGUgZ2l2ZW4gc291cmNlIGFuZCBvcHRpb25zIGVudGVyZWRcbiAgICogQ2FsbGVkIHdoZW4gc3VibWl0dGluZyB0aGUgZm9ybVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwcm9jZXNzSW5wdXQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSgncHJvY2Vzc2luZycpO1xuXG4gICAgY29uc3QgcmVhZHlGb3JSZW5kZXJpbmcgPSAoKSA9PiB7XG4gICAgICAkKCcub3V0cHV0LXRpdGxlJykuaHRtbCh0aGlzLm91dHB1dERhdGEubGluayk7XG4gICAgICAkKCcub3V0cHV0LXBhcmFtcycpLmh0bWwoJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3RvcikudmFsKCkpO1xuICAgICAgdGhpcy5zZXRJbml0aWFsQ2hhcnRUeXBlKCk7XG4gICAgICB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaXNSZXF1ZXN0Q2FjaGVkKCkpIHtcbiAgICAgICQoJy5wcm9ncmVzcy1iYXInKS5jc3MoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgkLmkxOG4oJ2xvYWRpbmctY2FjaGUnKSk7XG4gICAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3V0cHV0RGF0YSA9IHNpbXBsZVN0b3JhZ2UuZ2V0KHRoaXMuZ2V0Q2FjaGVLZXkoKSk7XG4gICAgICAgIHJlYWR5Rm9yUmVuZGVyaW5nKCk7XG4gICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIGNvbnN0IGNiID0gKGxhYmVsLCBsaW5rLCBkYXRhc2V0cykgPT4ge1xuICAgICAgJCgnLnByb2dyZXNzLWJhcicpLmNzcygnd2lkdGgnLCAnMTAwJScpO1xuICAgICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KCQuaTE4bignYnVpbGRpbmctZGF0YXNldCcpKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1aWxkTW90aGVyRGF0YXNldChsYWJlbCwgbGluaywgZGF0YXNldHMpO1xuICAgICAgICByZWFkeUZvclJlbmRlcmluZygpO1xuICAgICAgfSwgMjUwKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc291cmNlID0gJCgnI3NvdXJjZV9idXR0b24nKS5kYXRhKCd2YWx1ZScpO1xuXG4gICAgLy8gc3BlY2lhbCBzb3VyY2VzIHRoYXQgZG9uJ3QgdXNlIGEgd2lraSBVUkxcbiAgICBzd2l0Y2ggKHNvdXJjZSkge1xuICAgIGNhc2UgJ3BhZ2VwaWxlJzpcbiAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NQYWdlUGlsZShjYik7XG4gICAgY2FzZSAncXVhcnJ5JzpcbiAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NRdWFycnkoY2IpO1xuICAgIGNhc2UgJ2hhc2h0YWcnOlxuICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0hhc2h0YWcoY2IpO1xuICAgIGNhc2UgJ2V4dGVybmFsLWxpbmsnOlxuICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0V4dGVybmFsTGluayhjYik7XG4gICAgfVxuXG4gICAgLy8gdmFsaWRhdGUgd2lraSBVUkxcbiAgICBsZXQgW3Byb2plY3QsIHRhcmdldF0gPSB0aGlzLmdldFdpa2lQYWdlRnJvbVVSTCgkKHRoaXMuY29uZmlnLnNvdXJjZUlucHV0KS52YWwoKSk7XG5cbiAgICBpZiAoIXByb2plY3QgfHwgIXRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoJ2luaXRpYWwnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bihgaW52YWxpZC0ke3NvdXJjZSA9PT0gJ2NhdGVnb3J5JyA/ICdjYXRlZ29yeScgOiAncGFnZSd9LXVybGApKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMudmFsaWRhdGVQcm9qZWN0KHByb2plY3QpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZGVjb2RlIGFuZCByZW1vdmUgdHJhaWxpbmcgc2xhc2hcbiAgICB0YXJnZXQgPSBkZWNvZGVVUklDb21wb25lbnQodGFyZ2V0KS5yZXBsYWNlKC9cXC8kLywgJycpO1xuXG4gICAgc3dpdGNoIChzb3VyY2UpIHtcbiAgICBjYXNlICdjYXRlZ29yeSc6XG4gICAgICAvLyBmZXRjaCBzaXRlaW5mbyB0byBnZXQgbmFtZXNwYWNlcyBpZiB0aGV5J3ZlIG9wdGVkIHRvIHVzZSBzdWJqZWN0IHBhZ2UgaW5zdGVhZCBvZiB0YWxrXG4gICAgICBpZiAoJCgnLmNhdGVnb3J5LXN1YmplY3QtdG9nZ2xlLS1pbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgIHRoaXMuZmV0Y2hTaXRlSW5mbyhwcm9qZWN0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NDYXRlZ29yeShwcm9qZWN0LCB0YXJnZXQsIGNiKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb2Nlc3NDYXRlZ29yeShwcm9qZWN0LCB0YXJnZXQsIGNiKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3N1YnBhZ2VzJzpcbiAgICAgIC8vIGZldGNoIG5hbWVzcGFjZXMgZmlyc3RcbiAgICAgIHRoaXMuZmV0Y2hTaXRlSW5mbyhwcm9qZWN0KS50aGVuKCgpID0+IHRoaXMucHJvY2Vzc1N1YnBhZ2VzKHByb2plY3QsIHRhcmdldCwgY2IpKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dpa2lsaW5rcyc6XG4gICAgICB0aGlzLnByb2Nlc3NXaWtpUGFnZShwcm9qZWN0LCB0YXJnZXQsIGNiKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3RyYW5zY2x1c2lvbnMnOlxuICAgICAgdGhpcy5wcm9jZXNzVGVtcGxhdGUocHJvamVjdCwgdGFyZ2V0LCBjYik7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IG1hc3MgZGF0YSB0byBDU1YgZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogV2l0aCB0aGUgcHJlcGVuZGVkIGRhdGE6dGV4dC9jc3YgdGhpcyBzaG91bGQgY2F1c2UgdGhlIGJyb3dzZXIgdG8gZG93bmxvYWQgdGhlIGRhdGFcbiAgICogQG92ZXJyaWRlXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBleHBvcnRDU1YoKSB7XG4gICAgbGV0IGNzdkNvbnRlbnQgPSBgZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFRpdGxlLCR7dGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpLmpvaW4oJywnKX1cXG5gO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICB0aGlzLm91dHB1dERhdGEubGlzdERhdGEuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIGNvbnN0IHBhZ2VOYW1lID0gJ1wiJyArIHBhZ2UubGFiZWwuZGVzY29yZSgpLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInO1xuXG4gICAgICBjc3ZDb250ZW50ICs9IFtwYWdlTmFtZV0uY29uY2F0KHBhZ2UuZGF0YSkuam9pbignLCcpICsgJ1xcbic7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRvd25sb2FkRGF0YShjc3ZDb250ZW50LCAnY3N2Jyk7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAvKiogYXNzdW1lIGhhc2ggcGFyYW1zIGFyZSBzdXBwb3NlZCB0byBiZSBxdWVyeSBwYXJhbXMgKi9cbiAgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2ggJiYgIWRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5yZXBsYWNlKCcjJywgJz8nKTtcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1xcIy4qLywgJycpO1xuICB9XG5cbiAgbmV3IE1hc3NWaWV3cygpO1xufSk7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBjaGFydC1zcGVjaWZpYyBsb2dpYywgdXNlZCBpbiBhbGwgYXBwcyBleGNlcHQgVG9wdmlld3NcbiAqIEBwYXJhbSB7Y2xhc3N9IHN1cGVyY2xhc3MgLSBiYXNlIGNsYXNzXG4gKiBAcmV0dXJucyB7bnVsbH0gY2xhc3MgZXh0ZW5kaW5nIHN1cGVyY2xhc3NcbiAqL1xuY29uc3QgQ2hhcnRIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgdGhpcy5jaGFydE9iaiA9IG51bGw7XG4gICAgdGhpcy5wcmV2Q2hhcnRUeXBlID0gbnVsbDtcbiAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSB0cnVlOyAvLyB3aWxsIGJlY29tZSBmYWxzZSB3aGVuIHRoZXkgbWFudWFsbHkgY2hhbmdlIHRoZSBjaGFydCB0eXBlXG5cbiAgICAvKiogZW5zdXJlIHdlIGhhdmUgYSB2YWxpZCBjaGFydCB0eXBlIGluIGxvY2FsU3RvcmFnZSwgcmVzdWx0IG9mIENoYXJ0LmpzIDEuMCB0byAyLjAgbWlncmF0aW9uICovXG4gICAgY29uc3Qgc3RvcmVkQ2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpO1xuICAgIGlmICghdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkgJiYgIXRoaXMuY29uZmlnLmNpcmN1bGFyQ2hhcnRzLmluY2x1ZGVzKHN0b3JlZENoYXJ0VHlwZSkpIHtcbiAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZSgpKTtcbiAgICB9XG5cbiAgICAvLyBsZWF2ZSBpZiB0aGVyZSdzIG5vIGNoYXJ0IGNvbmZpZ3VyZWRcbiAgICBpZiAoIXRoaXMuY29uZmlnLmNoYXJ0KSByZXR1cm47XG5cbiAgICAvKiogQHR5cGUge0Jvb2xlYW59IGFkZCBhYmlsaXR5IHRvIGRpc2FibGUgYXV0by1sb2cgZGV0ZWN0aW9uICovXG4gICAgdGhpcy5ub0xvZ1NjYWxlID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdhdXRvbG9nPWZhbHNlJyk7XG5cbiAgICAvKiogY29weSBvdmVyIGFwcC1zcGVjaWZpYyBjaGFydCB0ZW1wbGF0ZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuZm9yRWFjaChsaW5lYXJDaGFydCA9PiB7XG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1tsaW5lYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmxpbmVhckxlZ2VuZDtcbiAgICB9KTtcbiAgICB0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5mb3JFYWNoKGNpcmN1bGFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbY2lyY3VsYXJDaGFydF0ub3B0cy5sZWdlbmRUZW1wbGF0ZSA9IHRoaXMuY29uZmlnLmNpcmN1bGFyTGVnZW5kO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmFzc2lnbihDaGFydC5kZWZhdWx0cy5nbG9iYWwsIHthbmltYXRpb246IGZhbHNlLCByZXNwb25zaXZlOiB0cnVlfSk7XG5cbiAgICAvKiogY2hhbmdpbmcgb2YgY2hhcnQgdHlwZXMgKi9cbiAgICAkKCcubW9kYWwtY2hhcnQtdHlwZSBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0eXBlJyk7XG4gICAgICB0aGlzLmF1dG9DaGFydFR5cGUgPSBmYWxzZTtcblxuICAgICAgJCgnLmxvZ2FyaXRobWljLXNjYWxlJykudG9nZ2xlKHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZSh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKTtcblxuICAgICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScsIHRoaXMuY2hhcnRUeXBlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc0NoYXJ0QXBwKCkgPyB0aGlzLnVwZGF0ZUNoYXJ0KHRoaXMucGFnZVZpZXdzRGF0YSkgOiB0aGlzLnJlbmRlckRhdGEoKTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdXRvTG9nRGV0ZWN0aW9uID0gJ2ZhbHNlJztcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBkaXNhYmxlZC9lbmFibGUgYmVnaW4gYXQgemVybyBjaGVja2JveCBhY2NvcmRpbmdseSxcbiAgICAgKiBidXQgZG9uJ3QgdXBkYXRlIGNoYXJ0IHNpbmNlIHRoZSBsb2cgc2NhbGUgdmFsdWUgY2FuIGNoYW5nZSBwcmFnbWF0aWNhbGx5IGFuZCBub3QgZnJvbSB1c2VyIGlucHV0XG4gICAgICovXG4gICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCB0aGlzLmNoZWNrZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgIH1cblxuICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAvKiogY2hhcnQgZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLXBuZycpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0UE5HLmJpbmQodGhpcykpO1xuICAgICQoJy5wcmludC1jaGFydCcpLm9uKCdjbGljaycsIHRoaXMucHJpbnRDaGFydC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGRlZmF1bHQgY2hhcnQgdHlwZSBvciB0aGUgb25lIGZyb20gbG9jYWxTdG9yYWdlLCBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW251bURhdGFzZXRzXSAtIG51bWJlciBvZiBkYXRhc2V0c1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0SW5pdGlhbENoYXJ0VHlwZShudW1EYXRhc2V0cyA9IDEpIHtcbiAgICBpZiAodGhpcy5yZW1lbWJlckNoYXJ0ID09PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3MtY2hhcnQtcHJlZmVyZW5jZScpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2hhcnRUeXBlID0gdGhpcy5jb25maWcuZGVmYXVsdHMuY2hhcnRUeXBlKG51bURhdGFzZXRzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBwcmV2aW91cyBjaGFydCwgaWYgbmVlZGVkLlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZGVzdHJveUNoYXJ0KCkge1xuICAgIGlmICh0aGlzLmNoYXJ0T2JqKSB7XG4gICAgICB0aGlzLmNoYXJ0T2JqLmRlc3Ryb3koKTtcbiAgICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKCcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGNoYXJ0IGRhdGEgdG8gQ1NWIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIFdpdGggdGhlIHByZXBlbmRlZCBkYXRhOnRleHQvY3N2IHRoaXMgc2hvdWxkIGNhdXNlIHRoZSBicm93c2VyIHRvIGRvd25sb2FkIHRoZSBkYXRhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRDU1YoKSB7XG4gICAgbGV0IGNzdkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LERhdGUsJztcbiAgICBsZXQgdGl0bGVzID0gW107XG4gICAgbGV0IGRhdGFSb3dzID0gW107XG4gICAgbGV0IGRhdGVzID0gdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpO1xuXG4gICAgLy8gQmVnaW4gY29uc3RydWN0aW5nIHRoZSBkYXRhUm93cyBhcnJheSBieSBwb3B1bGF0aW5nIGl0IHdpdGggdGhlIGRhdGVzXG4gICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgIGRhdGFSb3dzW2luZGV4XSA9IFtkYXRlXTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKHNpdGUgPT4ge1xuICAgICAgLy8gQnVpbGQgYW4gYXJyYXkgb2Ygc2l0ZSB0aXRsZXMgZm9yIHVzZSBpbiB0aGUgQ1NWIGhlYWRlclxuICAgICAgbGV0IHNpdGVUaXRsZSA9ICdcIicgKyBzaXRlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcIlwiJykgKyAnXCInO1xuICAgICAgdGl0bGVzLnB1c2goc2l0ZVRpdGxlKTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGRhdGFSb3dzIGFycmF5IHdpdGggdGhlIGRhdGEgZm9yIHRoaXMgc2l0ZVxuICAgICAgZGF0ZXMuZm9yRWFjaCgoZGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgZGF0YVJvd3NbaW5kZXhdLnB1c2goc2l0ZS5kYXRhW2luZGV4XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEZpbmlzaCB0aGUgQ1NWIGhlYWRlclxuICAgIGNzdkNvbnRlbnQgPSBjc3ZDb250ZW50ICsgdGl0bGVzLmpvaW4oJywnKSArICdcXG4nO1xuXG4gICAgLy8gQWRkIHRoZSByb3dzIHRvIHRoZSBDU1ZcbiAgICBkYXRhUm93cy5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgY3N2Q29udGVudCArPSBkYXRhLmpvaW4oJywnKSArICdcXG4nO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZERhdGEoY3N2Q29udGVudCwgJ2NzdicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIEpTT04gZm9ybWF0IGFuZCBsb2FkcyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGV4cG9ydEpTT04oKSB7XG4gICAgbGV0IGRhdGEgPSBbXTtcblxuICAgIHRoaXMuY2hhcnRPYmouZGF0YS5kYXRhc2V0cy5mb3JFYWNoKChwYWdlLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge1xuICAgICAgICBwYWdlOiBwYWdlLmxhYmVsLnJlcGxhY2UoL1wiL2csICdcXFwiJykucmVwbGFjZSgvJy9nLCBcIlxcJ1wiKSxcbiAgICAgICAgY29sb3I6IHBhZ2Uuc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN1bTogcGFnZS5zdW0sXG4gICAgICAgIGRhaWx5X2F2ZXJhZ2U6IE1hdGgucm91bmQocGFnZS5zdW0gLyB0aGlzLm51bURheXNJblJhbmdlKCkpXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmdldERhdGVIZWFkaW5ncyhmYWxzZSkuZm9yRWFjaCgoaGVhZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgZW50cnlbaGVhZGluZy5yZXBsYWNlKC9cXFxcLywnJyldID0gcGFnZS5kYXRhW2luZGV4XTtcbiAgICAgIH0pO1xuXG4gICAgICBkYXRhLnB1c2goZW50cnkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QganNvbkNvbnRlbnQgPSAnZGF0YTp0ZXh0L2pzb247Y2hhcnNldD11dGYtOCwnICsgSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgdGhpcy5kb3dubG9hZERhdGEoanNvbkNvbnRlbnQsICdqc29uJyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0cyBjdXJyZW50IGRhdGEgYXMgUE5HIGltYWdlLCBvcGVuaW5nIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZXhwb3J0UE5HKCkge1xuICAgIHRoaXMuZG93bmxvYWREYXRhKHRoaXMuY2hhcnRPYmoudG9CYXNlNjRJbWFnZSgpLCAncG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgaW4gemVybyB2YWx1ZSB0byBhIHRpbWVzZXJpZXMsIHNlZTpcbiAgICogaHR0cHM6Ly93aWtpdGVjaC53aWtpbWVkaWEub3JnL3dpa2kvQW5hbHl0aWNzL0FRUy9QYWdldmlld19BUEkjR290Y2hhc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlIG9mIHJhbmdlIHRvIGZpbHRlciB0aHJvdWdoXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGUgb2YgcmFuZ2VcbiAgICogQHJldHVybnMge29iamVjdH0gZGF0YXNldCB3aXRoIHplcm9zIHdoZXJlIG51bGxzIHdoZXJlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhkYXRhLCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICAvKiogRXh0cmFjdCB0aGUgZGF0ZXMgdGhhdCBhcmUgYWxyZWFkeSBpbiB0aGUgdGltZXNlcmllcyAqL1xuICAgIGxldCBhbHJlYWR5VGhlcmUgPSB7fTtcbiAgICBkYXRhLml0ZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICBsZXQgZGF0ZSA9IG1vbWVudChlbGVtLnRpbWVzdGFtcCwgdGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KTtcbiAgICAgIGFscmVhZHlUaGVyZVtkYXRlXSA9IGVsZW07XG4gICAgfSk7XG4gICAgZGF0YS5pdGVtcyA9IFtdO1xuXG4gICAgLyoqIFJlY29uc3RydWN0IHdpdGggemVyb3MgaW5zdGVhZCBvZiBudWxscyAqL1xuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQoc3RhcnREYXRlKTsgZGF0ZSA8PSBlbmREYXRlOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAoYWxyZWFkeVRoZXJlW2RhdGVdKSB7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaChhbHJlYWR5VGhlcmVbZGF0ZV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEuaXRlbXMucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIFt0aGlzLmlzUGFnZXZpZXdzKCkgPyAndmlld3MnIDogJ2RldmljZXMnXTogZWRnZUNhc2UgPyBudWxsIDogMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBmb3JtYXR0ZWQgZm9yIENoYXJ0LmpzIGFuZCB0aGUgbGVnZW5kIHRlbXBsYXRlc1xuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhc2V0cyAtIGFzIHJldHJpZXZlZCBieSBnZXRQYWdlVmlld3NEYXRhXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gcmVhZHkgZm9yIGNoYXJ0IHJlbmRlcmluZ1xuICAgKi9cbiAgYnVpbGRDaGFydERhdGEoZGF0YXNldHMpIHtcbiAgICBjb25zdCBsYWJlbHMgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkudmFsKCk7XG5cbiAgICAvKiogcHJlc2VydmUgb3JkZXIgb2YgZGF0YXNldHMgZHVlIHRvIGFzeW5jIGNhbGxzICovXG4gICAgcmV0dXJuIGRhdGFzZXRzLm1hcCgoZGF0YXNldCwgaW5kZXgpID0+IHtcbiAgICAgIC8qKiBCdWlsZCB0aGUgYXJ0aWNsZSdzIGRhdGFzZXQuICovXG4gICAgICBjb25zdCB2YWx1ZXMgPSBkYXRhc2V0Lm1hcChlbGVtID0+IHRoaXMuaXNQYWdldmlld3MoKSA/IGVsZW0udmlld3MgOiBlbGVtLmRldmljZXMpLFxuICAgICAgICBzdW0gPSB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBNYXRoLnJvdW5kKHN1bSAvIHZhbHVlcy5sZW5ndGgpLFxuICAgICAgICBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpLFxuICAgICAgICBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1tpbmRleCAlIDEwXSxcbiAgICAgICAgbGFiZWwgPSBsYWJlbHNbaW5kZXhdLmRlc2NvcmUoKTtcblxuICAgICAgY29uc3QgZW50aXR5SW5mbyA9IHRoaXMuZW50aXR5SW5mbyA/IHRoaXMuZW50aXR5SW5mb1tsYWJlbF0gOiB7fTtcblxuICAgICAgZGF0YXNldCA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBsYWJlbCxcbiAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICB2YWx1ZTogc3VtLCAvLyBkdXBsaWNhdGVkIGJlY2F1c2UgQ2hhcnQuanMgd2FudHMgYSBzaW5nbGUgYHZhbHVlYCBmb3IgY2lyY3VsYXIgY2hhcnRzXG4gICAgICAgIHN1bSxcbiAgICAgICAgYXZlcmFnZSxcbiAgICAgICAgbWF4LFxuICAgICAgICBtaW4sXG4gICAgICAgIGNvbG9yXG4gICAgICB9LCB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0uZGF0YXNldChjb2xvciksIGVudGl0eUluZm8pO1xuXG4gICAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgICAgZGF0YXNldC5kYXRhID0gZGF0YXNldC5kYXRhLm1hcCh2aWV3ID0+IHZpZXcgfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1cmwgdG8gcXVlcnkgdGhlIEFQSSBiYXNlZCBvbiBhcHAgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGVudGl0eSAtIG5hbWUgb2YgZW50aXR5IHdlJ3JlIHF1ZXJ5aW5nIGZvciAocGFnZSBuYW1lIG9yIHByb2plY3QgbmFtZSlcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBVUkxcbiAgICovXG4gIGdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgIGNvbnN0IHVyaUVuY29kZWRFbnRpdHlOYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudGl0eSk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdzaXRldmlld3MnKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1BhZ2V2aWV3cygpID8gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL2FnZ3JlZ2F0ZS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKSA6IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3VuaXF1ZS1kZXZpY2VzLyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9LyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy9wYWdldmlld3MvcGVyLWFydGljbGUvJHt0aGlzLnByb2plY3R9YCArXG4gICAgICAgIGAvJHskKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpfS8keyQodGhpcy5jb25maWcuYWdlbnRTZWxlY3RvcikudmFsKCl9LyR7dXJpRW5jb2RlZEVudGl0eU5hbWV9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3RoZXIgZnVuY3Rpb24gZm9yIHF1ZXJ5aW5nIHRoZSBBUEkgYW5kIHByb2Nlc3NpbmcgZGF0YVxuICAgKiBAcGFyYW0gIHtBcnJheX0gIGVudGl0aWVzIC0gbGlzdCBvZiBwYWdlIG5hbWVzLCBvciBwcm9qZWN0cyBmb3IgU2l0ZXZpZXdzXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBQcm9taXNlIHJlc29sdmluZyB3aXRoIHBhZ2V2aWV3cyBkYXRhIGFuZCBlcnJvcnMsIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFBhZ2VWaWV3c0RhdGEoZW50aXRpZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLCBjb3VudCA9IDAsIGZhaWx1cmVSZXRyaWVzID0ge30sXG4gICAgICB0b3RhbFJlcXVlc3RDb3VudCA9IGVudGl0aWVzLmxlbmd0aCwgZmFpbGVkRW50aXRpZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSBldmVyeXRoaW5nIHdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBmb3IgdGhlIHByb21pc2VzICovXG4gICAgbGV0IHhockRhdGEgPSB7XG4gICAgICBlbnRpdGllcyxcbiAgICAgIGxhYmVsczogW10sIC8vIExhYmVscyAoZGF0ZXMpIGZvciB0aGUgeC1heGlzLlxuICAgICAgZGF0YXNldHM6IFtdLCAvLyBEYXRhIGZvciBlYWNoIGFydGljbGUgdGltZXNlcmllc1xuICAgICAgZXJyb3JzOiBbXSwgLy8gUXVldWUgdXAgZXJyb3JzIHRvIHNob3cgYWZ0ZXIgYWxsIHJlcXVlc3RzIGhhdmUgYmVlbiBtYWRlXG4gICAgICBmYXRhbEVycm9yczogW10sIC8vIFVucmVjb3ZlcmFibGUgSmF2YVNjcmlwdCBlcnJvcnNcbiAgICAgIHByb21pc2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IChlbnRpdHksIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JyksXG4gICAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICB1cmwgPSB0aGlzLmdldEFwaVVybChlbnRpdHksIHN0YXJ0RGF0ZSwgZW5kRGF0ZSksXG4gICAgICAgIHByb21pc2UgPSAkLmFqYXgoeyB1cmwsIGRhdGFUeXBlOiAnanNvbicgfSk7XG5cbiAgICAgIHhockRhdGEucHJvbWlzZXMucHVzaChwcm9taXNlKTtcblxuICAgICAgcHJvbWlzZS5kb25lKHN1Y2Nlc3NEYXRhID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdWNjZXNzRGF0YSA9IHRoaXMuZmlsbEluWmVyb3Moc3VjY2Vzc0RhdGEsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgICB4aHJEYXRhLmRhdGFzZXRzLnB1c2goc3VjY2Vzc0RhdGEuaXRlbXMpO1xuXG4gICAgICAgICAgLyoqIGZldGNoIHRoZSBsYWJlbHMgZm9yIHRoZSB4LWF4aXMgb24gc3VjY2VzcyBpZiB3ZSBoYXZlbid0IGFscmVhZHkgKi9cbiAgICAgICAgICBpZiAoc3VjY2Vzc0RhdGEuaXRlbXMgJiYgIXhockRhdGEubGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgeGhyRGF0YS5sYWJlbHMgPSBzdWNjZXNzRGF0YS5pdGVtcy5tYXAoZWxlbSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJldHVybiB4aHJEYXRhLmZhdGFsRXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChlcnJvckRhdGEgPT4ge1xuICAgICAgICAvKiogZmlyc3QgZGV0ZWN0IGlmIHRoaXMgd2FzIGEgQ2Fzc2FuZHJhIGJhY2tlbmQgZXJyb3IsIGFuZCBpZiBzbywgc2NoZWR1bGUgYSByZS10cnkgKi9cbiAgICAgICAgY29uc3QgY2Fzc2FuZHJhRXJyb3IgPSBlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlID09PSAnRXJyb3IgaW4gQ2Fzc2FuZHJhIHRhYmxlIHN0b3JhZ2UgYmFja2VuZCc7XG5cbiAgICAgICAgaWYgKGNhc3NhbmRyYUVycm9yKSB7XG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0pIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0rKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbHVyZVJldHJpZXNbZW50aXR5XSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqIG1heGltdW0gb2YgMyByZXRyaWVzICovXG4gICAgICAgICAgaWYgKGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPCAzKSB7XG4gICAgICAgICAgICB0b3RhbFJlcXVlc3RDb3VudCsrO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF0ZUxpbWl0KG1ha2VSZXF1ZXN0LCB0aGlzLmNvbmZpZy5hcGlUaHJvdHRsZSwgdGhpcykoZW50aXR5LCBpbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoaXMgYXJ0aWNsZSBmcm9tIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIGFuYWx5emVcbiAgICAgICAgeGhyRGF0YS5lbnRpdGllcyA9IHhockRhdGEuZW50aXRpZXMuZmlsdGVyKGVsID0+IGVsICE9PSBlbnRpdHkpO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGZhaWxlZEVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbGluayA9IHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJyA/IHRoaXMuZ2V0U2l0ZUxpbmsoZW50aXR5KSA6IHRoaXMuZ2V0UGFnZUxpbmsoZW50aXR5LCB0aGlzLnByb2plY3QpO1xuICAgICAgICAgIHhockRhdGEuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICBgJHtsaW5rfTogJHskLmkxOG4oJ2FwaS1lcnJvcicsICdQYWdldmlld3MgQVBJJyl9IC0gJHtlcnJvckRhdGEucmVzcG9uc2VKU09OLnRpdGxlfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAoKytjb3VudCA9PT0gdG90YWxSZXF1ZXN0Q291bnQpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VWaWV3c0RhdGEgPSB4aHJEYXRhO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHhockRhdGEpO1xuXG4gICAgICAgICAgaWYgKGZhaWxlZEVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoJC5pMThuKFxuICAgICAgICAgICAgICAnYXBpLWVycm9yLXRpbWVvdXQnLFxuICAgICAgICAgICAgICAnPHVsPicgK1xuICAgICAgICAgICAgICBmYWlsZWRFbnRpdGllcy5tYXAoZmFpbGVkRW50aXR5ID0+IGA8bGk+JHt0aGlzLmdldFBhZ2VMaW5rKGZhaWxlZEVudGl0eSwgdGhpcy5wcm9qZWN0LmVzY2FwZSgpKX08L2xpPmApLmpvaW4oJycpICtcbiAgICAgICAgICAgICAgJzwvdWw+J1xuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZW50aXR5LCBpbmRleCkgPT4gbWFrZVJlcXVlc3QoZW50aXR5LCBpbmRleCkpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIG5lZWRlZCB0byBjcmVhdGUgYSBwZXJtYW5lbnQgbGluayBvZiB2aXNpYmxlIGRhdGFcbiAgICogQHJldHVybiB7T2JqZWN0fSBoYXNoIG9mIHBhcmFtc1xuICAgKi9cbiAgZ2V0UGVybWFMaW5rKCkge1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhmYWxzZSk7XG4gICAgZGVsZXRlIHBhcmFtcy5yYW5nZTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSBjdXJyZW50bHkgaW4gbG9nYXJpdGhtaWMgbW9kZT9cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTG9nYXJpdGhtaWMoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkuaXMoJzpjaGVja2VkJykgJiYgdGhpcy5pc0xvZ2FyaXRobWljQ2FwYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgY2hhcnQgdHlwZSBzdXBwb3J0cyBhIGxvZ2FyaXRobWljIHNjYWxlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBsb2ctZnJpZW5kbHkgb3Igbm90XG4gICAqL1xuICBpc0xvZ2FyaXRobWljQ2FwYWJsZSgpIHtcbiAgICByZXR1cm4gWydsaW5lJywgJ2JhciddLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgdHJ5aW5nIHRvIHNob3cgZGF0YSBvbiBwYWdldmlld3MgKGFzIG9wcG9zZWQgdG8gdW5pcXVlIGRldmljZXMpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc1BhZ2V2aWV3cygpIHtcbiAgICByZXR1cm4gdGhpcy5hcHAgPT09ICdwYWdldmlld3MnIHx8ICQodGhpcy5jb25maWcuZGF0YVNvdXJjZVNlbGVjdG9yKS52YWwoKSA9PT0gJ3BhZ2V2aWV3cyc7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNVbmlxdWVEZXZpY2VzKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1BhZ2V2aWV3cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaW50IHRoZSBjaGFydCFcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHByaW50Q2hhcnQoKSB7XG4gICAgbGV0IHRhYiA9IHdpbmRvdy5vcGVuKCk7XG4gICAgdGFiLmRvY3VtZW50LndyaXRlKFxuICAgICAgYDxpbWcgc3JjPVwiJHt0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKX1cIiAvPmBcbiAgICApO1xuICAgIHRhYi5wcmludCgpO1xuICAgIHRhYi5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgY2hhcnQsIG1lc3NhZ2VzLCBhbmQgcmVzZXRzIHNpdGUgc2VsZWN0aW9uc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzZWxlY3QyXSB3aGV0aGVyIG9yIG5vdCB0byBjbGVhciB0aGUgU2VsZWN0MiBpbnB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRWaWV3KHNlbGVjdDIgPSBmYWxzZSkge1xuICAgIHRyeSB7XG4gICAgICAvKiogdGhlc2UgY2FuIGZhaWwgc29tZXRpbWVzICovXG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuICAgICAgaWYgKHNlbGVjdDIpIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvLyBub3RoaW5nXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAkKHRoaXMuY29uZmlnLmNoYXJ0KS5oaWRlKCk7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdCB0byBmaW5lLXR1bmUgdGhlIHBvaW50ZXIgZGV0ZWN0aW9uIHNwYWNpbmcgYmFzZWQgb24gaG93IGNsdXR0ZXJlZCB0aGUgY2hhcnQgaXNcbiAgICogQHJldHVybnMge051bWJlcn0gcmFkaXVzXG4gICAqL1xuICBzZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCkge1xuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSAhPT0gJ2xpbmUnKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gNTApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMzApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSA1O1xuICAgIH0gZWxzZSBpZiAodGhpcy5udW1EYXlzSW5SYW5nZSgpID4gMjApIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LmhpdFJhZGl1cyA9IDMwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIHNob3cgYSBsb2dhcml0aG1pYyBjaGFydCBmb3IgdGhlIGdpdmVuIGRhdGFzZXQsIGJhc2VkIG9uIFRoZWlsIGluZGV4XG4gICAqIEBwYXJhbSAge0FycmF5fSBkYXRhc2V0cyAtIHBhZ2V2aWV3c1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIHNob3VsZEJlTG9nYXJpdGhtaWMoZGF0YXNldHMpIHtcbiAgICBpZiAoIXRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKSB8fCB0aGlzLm5vTG9nU2NhbGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgc2V0cyA9IFtdO1xuICAgIC8vIGNvbnZlcnQgTmFOcyBhbmQgbnVsbHMgdG8gemVyb3NcbiAgICBkYXRhc2V0cy5mb3JFYWNoKGRhdGFzZXQgPT4ge1xuICAgICAgc2V0cy5wdXNoKGRhdGFzZXQubWFwKHZhbCA9PiB2YWwgfHwgMCkpO1xuICAgIH0pO1xuXG4gICAgLy8gb3ZlcmFsbCBtYXggdmFsdWVcbiAgICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KC4uLltdLmNvbmNhdCguLi5zZXRzKSk7XG5cbiAgICBpZiAobWF4VmFsdWUgPD0gMTApIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBsb2dhcml0aG1pY05lZWRlZCA9IGZhbHNlO1xuXG4gICAgc2V0cy5mb3JFYWNoKHNldCA9PiB7XG4gICAgICBzZXQucHVzaChtYXhWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IHN1bSA9IHNldC5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKSxcbiAgICAgICAgYXZlcmFnZSA9IHN1bSAvIHNldC5sZW5ndGg7XG4gICAgICBsZXQgdGhlaWwgPSAwO1xuICAgICAgc2V0LmZvckVhY2godiA9PiB0aGVpbCArPSB2ID8gdiAqIE1hdGgubG9nKHYgLyBhdmVyYWdlKSA6IDApO1xuXG4gICAgICBpZiAodGhlaWwgLyBzdW0gPiAwLjUpIHtcbiAgICAgICAgcmV0dXJuIGxvZ2FyaXRobWljTmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgc3VwZXIuc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHNldHVwIHNpbmNlIHRoZSBsaXN0IHZpZXcgYXBwcyBhbHNvIHVzZSBjaGFydHMgKi9cbiAgICBpZiAoIXRoaXMuaXNDaGFydEFwcCgpKSByZXR1cm47XG5cbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqIHRoZSBcIkxhdGVzdCBOIGRheXNcIiBsaW5rcyAqL1xuICAgICQoJy5kYXRlLWxhdGVzdCBhJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZShgbGF0ZXN0LSR7JChlLnRhcmdldCkuZGF0YSgndmFsdWUnKX1gKTtcbiAgICB9KTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgdGhpcy5wcm9jZXNzSW5wdXQoKTtcblxuICAgICAgLyoqIGNsZWFyIG91dCBzcGVjaWFsUmFuZ2UgaWYgaXQgZG9lc24ndCBtYXRjaCBvdXIgaW5wdXQgKi9cbiAgICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiB0aGlzLnNwZWNpYWxSYW5nZS52YWx1ZSAhPT0gZS50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2hhcnQgd2l0aCBkYXRhIHByb3ZpZGVkIGJ5IHByb2Nlc3NJbnB1dCgpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB4aHJEYXRhIC0gZGF0YSBhcyBjb25zdHJ1Y3RlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHVwZGF0ZUNoYXJ0KHhockRhdGEpIHtcbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7IC8vIGNsZWFyIG9sZCBjaGFydCBsZWdlbmRcblxuICAgIC8vIHNob3cgcGVuZGluZyBlcnJvciBtZXNzYWdlcyBpZiBwcmVzZW50LCBleGl0aW5nIGlmIGZhdGFsXG4gICAgaWYgKHRoaXMuc2hvd0Vycm9ycyh4aHJEYXRhKSkgcmV0dXJuO1xuXG4gICAgaWYgKCF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcFNwaW5ueSgpO1xuICAgIH0gZWxzZSBpZiAoeGhyRGF0YS5lbnRpdGllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tdWx0aS1wYWdlLWNoYXJ0LW5vZGUnKS5zaG93KCk7XG4gICAgfVxuXG4gICAgdGhpcy5vdXRwdXREYXRhID0gdGhpcy5idWlsZENoYXJ0RGF0YSh4aHJEYXRhLmRhdGFzZXRzLCB4aHJEYXRhLmVudGl0aWVzKTtcblxuICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgY29uc3Qgc2hvdWxkQmVMb2dhcml0aG1pYyA9IHRoaXMuc2hvdWxkQmVMb2dhcml0aG1pYyh0aGlzLm91dHB1dERhdGEubWFwKHNldCA9PiBzZXQuZGF0YSkpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5sb2dhcml0aG1pY0NoZWNrYm94KS5wcm9wKCdjaGVja2VkJywgc2hvdWxkQmVMb2dhcml0aG1pYyk7XG4gICAgICAkKCcuYmVnaW4tYXQtemVybycpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHtzY2FsZXM6IHt9fSxcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5vcHRzLFxuICAgICAgdGhpcy5jb25maWcuZ2xvYmFsQ2hhcnRPcHRzXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzTG9nYXJpdGhtaWMoKSkge1xuICAgICAgb3B0aW9ucy5zY2FsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLnNjYWxlcywge1xuICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICB0eXBlOiAnbG9nYXJpdGhtaWMnLFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbWFpbiA9IHZhbHVlIC8gKE1hdGgucG93KDEwLCBNYXRoLmZsb29yKENoYXJ0LmhlbHBlcnMubG9nMTAodmFsdWUpKSkpO1xuXG4gICAgICAgICAgICAgIGlmIChyZW1haW4gPT09IDEgfHwgcmVtYWluID09PSAyIHx8IHJlbWFpbiA9PT0gNSB8fCBpbmRleCA9PT0gMCB8fCBpbmRleCA9PT0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuXG4gICAgdHJ5IHtcbiAgICAgICQoJy5jaGFydC1jb250YWluZXInKS5odG1sKCcnKS5hcHBlbmQoXCI8Y2FudmFzIGNsYXNzPSdhcXMtY2hhcnQnPlwiKTtcbiAgICAgIHRoaXMuc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpO1xuICAgICAgY29uc3QgY29udGV4dCA9ICQodGhpcy5jb25maWcuY2hhcnQpWzBdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGxpbmVhckRhdGEgPSB7bGFiZWxzOiB4aHJEYXRhLmxhYmVscywgZGF0YXNldHM6IHRoaXMub3V0cHV0RGF0YX07XG5cbiAgICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlID09PSAncmFkYXInKSB7XG4gICAgICAgICAgb3B0aW9ucy5zY2FsZS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGVzLnlBeGVzWzBdLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiBsaW5lYXJEYXRhLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYXJ0T2JqID0gbmV3IENoYXJ0KGNvbnRleHQsIHtcbiAgICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBsYWJlbHM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmxhYmVsKSxcbiAgICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgICBkYXRhOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC52YWx1ZSksXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQuYmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmhvdmVyQmFja2dyb3VuZENvbG9yKSxcbiAgICAgICAgICAgICAgYXZlcmFnZXM6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmF2ZXJhZ2UpXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLnNob3dFcnJvcnMoe1xuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICBmYXRhbEVycm9yczogW2Vycl1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5jaGFydC1sZWdlbmQnKS5odG1sKHRoaXMuY2hhcnRPYmouZ2VuZXJhdGVMZWdlbmQoKSk7XG4gICAgJCgnLmRhdGEtbGlua3MnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG5cbiAgICBpZiAodGhpcy5hcHAgPT09ICdwYWdldmlld3MnKSB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBlcnJvcnMgYnVpbHQgaW4gdGhpcy5wcm9jZXNzSW5wdXRcbiAgICogQHBhcmFtIHtvYmplY3R9IHhockRhdGEgLSBhcyBidWlsdCBieSB0aGlzLnByb2Nlc3NJbnB1dCwgbGlrZSBgeyBlcnJvcnM6IFtdLCBmYXRhbEVycm9yczogW10gfWBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGZhdGFsIGVycm9ycyBvY2N1cmVkXG4gICAqL1xuICBzaG93RXJyb3JzKHhockRhdGEpIHtcbiAgICBpZiAoeGhyRGF0YS5mYXRhbEVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KHRydWUpO1xuICAgICAgY29uc3QgZmF0YWxFcnJvcnMgPSB4aHJEYXRhLmZhdGFsRXJyb3JzLnVuaXF1ZSgpO1xuICAgICAgdGhpcy5zaG93RmF0YWxFcnJvcnMoZmF0YWxFcnJvcnMpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoeGhyRGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBldmVyeXRoaW5nIGZhaWxlZCwgcmVzZXQgdGhlIHZpZXcsIGNsZWFyaW5nIG91dCBzcGFjZSB0YWtlbiB1cCBieSBlbXB0eSBjaGFydFxuICAgICAgaWYgKHhockRhdGEuZW50aXRpZXMgJiYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCA9PT0geGhyRGF0YS5lbnRpdGllcy5sZW5ndGggfHwgIXhockRhdGEuZW50aXRpZXMubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgfVxuXG4gICAgICB4aHJEYXRhLmVycm9ycy51bmlxdWUoKS5mb3JFYWNoKGVycm9yID0+IHRoaXMud3JpdGVNZXNzYWdlKGVycm9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0SGVscGVycztcbiIsIi8qKlxuICogQGZpbGUgQ29yZSBKYXZhU2NyaXB0IGV4dGVuc2lvbnMsIGVpdGhlciB0byBuYXRpdmUgSlMgb3IgYSBsaWJyYXJ5LlxuICogICBQb2x5ZmlsbHMgaGF2ZSB0aGVpciBvd24gZmlsZSBbcG9seWZpbGxzLmpzXShnbG9iYWwuaHRtbCNwb2x5ZmlsbHMpXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblN0cmluZy5wcm90b3R5cGUuZGVzY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9fL2csICcgJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS5zY29yZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yZXBsYWNlKC8gL2csICdfJyk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS51cGNhc2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnNsaWNlKDEpO1xufTtcblN0cmluZy5wcm90b3R5cGUuZXNjYXBlID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJy8nOiAnJiN4MkY7J1xuICB9O1xuXG4gIHJldHVybiB0aGlzLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIHMgPT4ge1xuICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gIH0pO1xufTtcblxuLy8gcmVtb3ZlIGR1cGxpY2F0ZSB2YWx1ZXMgZnJvbSBBcnJheVxuQXJyYXkucHJvdG90eXBlLnVuaXF1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24odmFsdWUsIGluZGV4LCBhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXg7XG4gIH0pO1xufTtcblxuLy8gSW1wcm92ZSBzeW50YXggdG8gZW11bGF0ZSBtaXhpbnMgaW4gRVM2XG53aW5kb3cubWl4ID0gc3VwZXJjbGFzcyA9PiBuZXcgTWl4aW5CdWlsZGVyKHN1cGVyY2xhc3MpO1xuY2xhc3MgTWl4aW5CdWlsZGVyIHtcbiAgY29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuICAgIHRoaXMuc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3M7XG4gIH1cblxuICB3aXRoKC4uLm1peGlucykge1xuICAgIHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtaXhpbikgPT4gbWl4aW4oYyksIHRoaXMuc3VwZXJjbGFzcyk7XG4gIH1cbn1cblxuLypcbiAqIEhPVCBQQVRDSCBmb3IgQ2hhcnQuanMgZ2V0RWxlbWVudHNBdEV2ZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hhcnRqcy9DaGFydC5qcy9pc3N1ZXMvMjI5OVxuICogVE9ETzogcmVtb3ZlIG1lIHdoZW4gdGhpcyBnZXRzIGltcGxlbWVudGVkIGludG8gQ2hhcnRzLmpzIGNvcmVcbiAqL1xuaWYgKHR5cGVvZiBDaGFydCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgQ2hhcnQuQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0RWxlbWVudHNBdEV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICAgIGxldCBoZWxwZXJzID0gQ2hhcnQuaGVscGVycztcbiAgICBsZXQgZXZlbnRQb3NpdGlvbiA9IGhlbHBlcnMuZ2V0UmVsYXRpdmVQb3NpdGlvbihlLCB0aGlzLmNoYXJ0KTtcbiAgICBsZXQgZWxlbWVudHNBcnJheSA9IFtdO1xuXG4gICAgbGV0IGZvdW5kID0gKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5kYXRhc2V0cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5kYXRhc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YSlbMF07XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtZGVwdGggKi9cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhW2pdLmluTGFiZWxSYW5nZShldmVudFBvc2l0aW9uLngsIGV2ZW50UG9zaXRpb24ueSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YVtrZXldLmRhdGFbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuY2FsbCh0aGlzKTtcblxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50c0FycmF5O1xuICAgIH1cblxuICAgIGhlbHBlcnMuZWFjaCh0aGlzLmRhdGEuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQsIGRzSW5kZXgpIHtcbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGRhdGFzZXQuX21ldGEpWzBdO1xuICAgICAgZWxlbWVudHNBcnJheS5wdXNoKGRhdGFzZXQuX21ldGFba2V5XS5kYXRhW2ZvdW5kLl9pbmRleF0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzQXJyYXk7XG4gIH07XG59XG5cbiQud2hlbkFsbCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgIGNvdW50ZXIgPSAwLFxuICAgIHN0YXRlID0gJ3Jlc29sdmVkJyxcbiAgICBwcm9taXNlcyA9IG5ldyBBcnJheSguLi5hcmd1bWVudHMpO1xuXG4gIGNvbnN0IHJlc29sdmVPclJlamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAncmVqZWN0ZWQnKSB7XG4gICAgICBzdGF0ZSA9ICdyZWplY3RlZCc7XG4gICAgfVxuICAgIGNvdW50ZXIrKztcblxuICAgIGlmIChjb3VudGVyID09PSBwcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIGRmZFtzdGF0ZSA9PT0gJ3JlamVjdGVkJyA/ICdyZWplY3QnIDogJ3Jlc29sdmUnXSgpO1xuICAgIH1cblxuICB9O1xuXG4gICQuZWFjaChwcm9taXNlcywgKF9pLCBwcm9taXNlKSA9PiB7XG4gICAgcHJvbWlzZS5hbHdheXMocmVzb2x2ZU9yUmVqZWN0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRmZC5wcm9taXNlKCk7XG59O1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgbGlzdC1zcGVjaWZpYyBsb2dpY1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKipcbiAqIFNoYXJlZCBsaXN0LXNwZWNpZmljIGxvZ2ljXG4gKiBAcGFyYW0ge2NsYXNzfSBzdXBlcmNsYXNzIC0gYmFzZSBjbGFzc1xuICogQHJldHVybnMge251bGx9IGNsYXNzIGV4dGVuZGluZyBzdXBlcmNsYXNzXG4gKi9cbmNvbnN0IExpc3RIZWxwZXJzID0gc3VwZXJjbGFzcyA9PiBjbGFzcyBleHRlbmRzIHN1cGVyY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgY2hhcnQgb3B0aW9ucyBiZWZvcmUgc2hvd2luZyBjaGFydCB2aWV3LCBiYXNlZCBvbiBjdXJyZW50IGNoYXJ0IHR5cGVcbiAgICogQHJldHVybiB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuY29uZmlnLmNvbG9yc1swXTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMub3V0cHV0RGF0YS5kYXRhc2V0c1swXSwgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQoY29sb3IpKTtcblxuICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ2xpbmUnKSB7XG4gICAgICB0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZmlsbENvbG9yID0gY29sb3IucmVwbGFjZSgvLFxccypcXGRcXCkvLCAnLCAwLjIpJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBsYW5nIGRhdGEgdG8gSlNPTiBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZXhwb3J0SlNPTigpIHtcbiAgICBjb25zdCBqc29uQ29udGVudCA9ICdkYXRhOnRleHQvanNvbjtjaGFyc2V0PXV0Zi04LCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm91dHB1dERhdGEubGlzdERhdGEpO1xuICAgIHRoaXMuZG93bmxvYWREYXRhKGpzb25Db250ZW50LCAnanNvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIHplcm9zIHRvIGEgdGltZXNlcmllcywgc2VlOlxuICAgKiBodHRwczovL3dpa2l0ZWNoLndpa2ltZWRpYS5vcmcvd2lraS9BbmFseXRpY3MvQVFTL1BhZ2V2aWV3X0FQSSNHb3RjaGFzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtcyAtIGVudHJpZXMgZmV0Y2hlZCBmcm9tIFBhZ2V2aWV3cyBBUElcbiAgICogQHBhcmFtIHttb21lbnR9IHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGUgb2YgcmFuZ2UgdG8gZmlsdGVyIHRocm91Z2hcbiAgICogQHBhcmFtIHttb21lbnR9IGVuZERhdGUgLSBlbmQgZGF0ZSBvZiByYW5nZVxuICAgKiBAcmV0dXJucyB7YXJyYXl9IDAgPSBkYXRhc2V0IHdpdGggemVyb3Mgd2hlcmUgbnVsbHMgd2VyZSxcbiAgICogICAxID0gZGF0ZXMgdGhhdCBtZXQgdGhlIGVkZ2UgY2FzZSwgbWVhbmluZyBkYXRhIGlzIG5vdCB5ZXQgYXZhaWxhYmxlXG4gICAqL1xuICBmaWxsSW5aZXJvcyhpdGVtcywgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgLyoqIEV4dHJhY3QgdGhlIGRhdGVzIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIHRpbWVzZXJpZXMgKi9cbiAgICBsZXQgYWxyZWFkeVRoZXJlID0ge307XG4gICAgaXRlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIGxldCBkYXRlID0gbW9tZW50KGVsZW0udGltZXN0YW1wLCB0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpO1xuICAgICAgYWxyZWFkeVRoZXJlW2RhdGVdID0gZWxlbTtcbiAgICB9KTtcbiAgICBsZXQgZGF0YSA9IFtdLCBkYXRlc1dpdGhvdXREYXRhID0gW107XG5cbiAgICAvKiogUmVjb25zdHJ1Y3Qgd2l0aCB6ZXJvcyBpbnN0ZWFkIG9mIG51bGxzICovXG4gICAgZm9yIChsZXQgZGF0ZSA9IG1vbWVudChzdGFydERhdGUpOyBkYXRlIDw9IGVuZERhdGU7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChhbHJlYWR5VGhlcmVbZGF0ZV0pIHtcbiAgICAgICAgZGF0YS5wdXNoKGFscmVhZHlUaGVyZVtkYXRlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZWRnZUNhc2UgPSBkYXRlLmlzU2FtZSh0aGlzLmNvbmZpZy5tYXhEYXRlKSB8fCBkYXRlLmlzU2FtZShtb21lbnQodGhpcy5jb25maWcubWF4RGF0ZSkuc3VidHJhY3QoMSwgJ2RheXMnKSk7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZXN0YW1wOiBkYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLFxuICAgICAgICAgIHZpZXdzOiBlZGdlQ2FzZSA/IG51bGwgOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZWRnZUNhc2UpIGRhdGVzV2l0aG91dERhdGEucHVzaChkYXRlLmZvcm1hdCgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2RhdGEsIGRhdGVzV2l0aG91dERhdGFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBjYWNoZSBrZXkgZm9yIGN1cnJlbnQgcGFyYW1zXG4gICAqIEByZXR1cm4ge1N0cmluZ30ga2V5XG4gICAqL1xuICBnZXRDYWNoZUtleSgpIHtcbiAgICByZXR1cm4gYHB2LWNhY2hlLSR7dGhpcy5oYXNoQ29kZShcbiAgICAgIHRoaXMuYXBwICsgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRQYXJhbXModHJ1ZSkpXG4gICAgKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmsgdG8gL3BhZ2V2aWV3cyBmb3IgZ2l2ZW4gYXJ0aWNsZSBhbmQgY2hvc2VuIGRhdGVyYW5nZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIGJhc2UgcHJvamVjdCwgZS5nLiBlbi53aWtpcGVkaWEub3JnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFVSTFxuICAgKi9cbiAgLy8gRklYTUU6IHNob3VsZCBpbmNsdWRlIGFnZW50IGFuZCBwbGF0Zm9ybSwgYW5kIHVzZSBzcGVjaWFsIHJhbmdlcyBhcyBjdXJyZW50bHkgc3BlY2lmaWVkXG4gIGdldFBhZ2V2aWV3c1VSTChwcm9qZWN0LCBwYWdlKSB7XG4gICAgbGV0IHN0YXJ0RGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUpLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlKTtcbiAgICBjb25zdCBwbGF0Zm9ybSA9ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCk7XG5cbiAgICBpZiAoZW5kRGF0ZS5kaWZmKHN0YXJ0RGF0ZSwgJ2RheXMnKSA9PT0gMCkge1xuICAgICAgc3RhcnREYXRlLnN1YnRyYWN0KDMsICdkYXlzJyk7XG4gICAgICBlbmREYXRlLmFkZCgzLCAnZGF5cycpO1xuICAgIH1cblxuICAgIHJldHVybiBgL3BhZ2V2aWV3cz9zdGFydD0ke3N0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX1gICtcbiAgICAgIGAmZW5kPSR7ZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKX0mcHJvamVjdD0ke3Byb2plY3R9JnBsYXRmb3JtPSR7cGxhdGZvcm19JnBhZ2VzPSR7cGFnZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwYXJhbXMgbmVlZGVkIHRvIGNyZWF0ZSBhIHBlcm1hbmVudCBsaW5rIG9mIHZpc2libGUgZGF0YVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGhhc2ggb2YgcGFyYW1zXG4gICAqL1xuICBnZXRQZXJtYUxpbmsoKSB7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKHRydWUpO1xuICAgIHBhcmFtcy5zb3J0ID0gdGhpcy5zb3J0O1xuICAgIHBhcmFtcy5kaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IGNsYXNzIG5hbWUgb2YgPG91dHB1dD4sIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgZm9ybVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHN0YXRlLCBvbmUgb2YgdGhpcy5jb25maWcuZm9ybVN0YXRlc1xuICAgKi9cbiAgZ2V0U3RhdGUoKSB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gJCgnbWFpbicpWzBdLmNsYXNzTGlzdDtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZm9ybVN0YXRlcy5maWx0ZXIoc3RhdGVOYW1lID0+IHtcbiAgICAgIHJldHVybiBjbGFzc0xpc3QuY29udGFpbnMoc3RhdGVOYW1lKTtcbiAgICB9KVswXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBzaW1wbGUgc3RvcmFnZSB0byBzZWUgaWYgYSByZXF1ZXN0IHdpdGggdGhlIGN1cnJlbnQgcGFyYW1zIHdvdWxkIGJlIGNhY2hlZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBjYWNoZWQgb3Igbm90XG4gICAqL1xuICBpc1JlcXVlc3RDYWNoZWQoKSB7XG4gICAgcmV0dXJuIHNpbXBsZVN0b3JhZ2UuaGFzS2V5KHRoaXMuZ2V0Q2FjaGVLZXkoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGxpc3Qgb2Ygb3V0cHV0IGRhdGEgaW50byB2aWV3XG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNiIC0gYmxvY2sgdG8gY2FsbCBiZXR3ZWVuIGluaXRpYWwgc2V0dXAgYW5kIHNob3dpbmcgdGhlIG91dHB1dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVuZGVyRGF0YShjYikge1xuICAgIGNvbnN0IGFydGljbGVEYXRhc2V0cyA9IHRoaXMub3V0cHV0RGF0YS5saXN0RGF0YTtcblxuICAgIC8qKiBzb3J0IGFzY2VuZGluZyBieSBjdXJyZW50IHNvcnQgc2V0dGluZyAqL1xuICAgIGNvbnN0IHNvcnRlZERhdGFzZXRzID0gYXJ0aWNsZURhdGFzZXRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuZ2V0U29ydFByb3BlcnR5KGEsIHRoaXMuc29ydCksXG4gICAgICAgIGFmdGVyID0gdGhpcy5nZXRTb3J0UHJvcGVydHkoYiwgdGhpcy5zb3J0KTtcblxuICAgICAgaWYgKGJlZm9yZSA8IGFmdGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAoYmVmb3JlID4gYWZ0ZXIpIHtcbiAgICAgICAgcmV0dXJuIC10aGlzLmRpcmVjdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnLnNvcnQtbGluayBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCBnbHlwaGljb24tc29ydC1ieS1hbHBoYWJldCcpLmFkZENsYXNzKCdnbHlwaGljb24tc29ydCcpO1xuICAgIGNvbnN0IG5ld1NvcnRDbGFzc05hbWUgPSBwYXJzZUludCh0aGlzLmRpcmVjdGlvbiwgMTApID09PSAxID8gJ2dseXBoaWNvbi1zb3J0LWJ5LWFscGhhYmV0LWFsdCcgOiAnZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQnO1xuICAgICQoYC5zb3J0LWxpbmstLSR7dGhpcy5zb3J0fSBzcGFuYCkuYWRkQ2xhc3MobmV3U29ydENsYXNzTmFtZSkucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zb3J0Jyk7XG5cbiAgICB0cnkge1xuICAgICAgY2Ioc29ydGVkRGF0YXNldHMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgnY29tcGxldGUnKTtcbiAgICAgIHRoaXMuc2hvd0ZhdGFsRXJyb3JzKFtlcnJdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5wdXNoUGFyYW1zKCk7XG4gICAgfVxuXG4gICAgdGhpcy50b2dnbGVWaWV3KHRoaXMudmlldyk7XG4gICAgLyoqXG4gICAgICogU2V0dGluZyB0aGUgc3RhdGUgdG8gY29tcGxldGUgd2lsbCBjYWxsIHRoaXMucHJvY2Vzc0VuZGVkXG4gICAgICogV2Ugb25seSB3YW50IHRvIHRoaXMgdGhlIGZpcnN0IHRpbWUsIG5vdCBhZnRlciBjaGFuZ2luZyBjaGFydCB0eXBlcywgZXRjLlxuICAgICAqL1xuICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09ICdjb21wbGV0ZScpIHRoaXMuc2V0U3RhdGUoJ2NvbXBsZXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIG9yIHNldCBjaGFydCB2cyBsaXN0IHZpZXcuIEFsbCBvZiB0aGUgbm9ybWFsIGNoYXJ0IGxvZ2ljIGxpdmVzIGhlcmVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB2aWV3IC0gd2hpY2ggdmlldyB0byBzZXQsIGVpdGhlciBjaGFydCBvciBsaXN0XG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIHRvZ2dsZVZpZXcodmlldykge1xuICAgICQoJy52aWV3LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGAudmlldy1idG4tLSR7dmlld31gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgnb3V0cHV0JykucmVtb3ZlQ2xhc3MoJ2xpc3QtbW9kZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NoYXJ0LW1vZGUnKVxuICAgICAgLmFkZENsYXNzKGAke3ZpZXd9LW1vZGVgKTtcblxuICAgIGlmICh2aWV3ID09PSAnY2hhcnQnKSB7XG4gICAgICB0aGlzLmRlc3Ryb3lDaGFydCgpO1xuXG4gICAgICAvKiogZG9uJ3QgdXNlIGNpcmN1bGUgY2hhcnRzICovXG4gICAgICBpZiAodGhpcy5jb25maWcuY2lyY3VsYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgIHRoaXMuY2hhcnRUeXBlID0gJ2Jhcic7XG4gICAgICB9XG5cbiAgICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLm9wdHMsXG4gICAgICAgIHRoaXMuY29uZmlnLmdsb2JhbENoYXJ0T3B0c1xuICAgICAgKTtcbiAgICAgIHRoaXMuYXNzaWduT3V0cHV0RGF0YUNoYXJ0T3B0cygpO1xuICAgICAgdGhpcy5zZXRDaGFydFBvaW50RGV0ZWN0aW9uUmFkaXVzKCk7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9Mb2dEZXRlY3Rpb24gPT09ICd0cnVlJykge1xuICAgICAgICBjb25zdCBzaG91bGRCZUxvZ2FyaXRobWljID0gdGhpcy5zaG91bGRCZUxvZ2FyaXRobWljKFt0aGlzLm91dHB1dERhdGEuZGF0YXNldHNbMF0uZGF0YV0pO1xuICAgICAgICAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLnByb3AoJ2NoZWNrZWQnLCBzaG91bGRCZUxvZ2FyaXRobWljKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNMb2dhcml0aG1pYygpKSB7XG4gICAgICAgIG9wdGlvbnMuc2NhbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5zY2FsZXMsIHtcbiAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgIHR5cGU6ICdsb2dhcml0aG1pYycsXG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBjYWxsYmFjazogKHZhbHVlLCBpbmRleCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtYWluID0gdmFsdWUgLyAoTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoQ2hhcnQuaGVscGVycy5sb2cxMCh2YWx1ZSkpKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVtYWluID09PSAxIHx8IHJlbWFpbiA9PT0gMiB8fCByZW1haW4gPT09IDUgfHwgaW5kZXggPT09IDAgfHwgaW5kZXggPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ3JhZGFyJykge1xuICAgICAgICBvcHRpb25zLnNjYWxlLnRpY2tzLmJlZ2luQXRaZXJvID0gJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykuaXMoJzpjaGVja2VkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnNjYWxlcy55QXhlc1swXS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZXh0ID0gJCh0aGlzLmNvbmZpZy5jaGFydClbMF0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMuY2hhcnRPYmogPSBuZXcgQ2hhcnQoY29udGV4dCwge1xuICAgICAgICB0eXBlOiB0aGlzLmNoYXJ0VHlwZSxcbiAgICAgICAgZGF0YTogdGhpcy5vdXRwdXREYXRhLFxuICAgICAgICBvcHRpb25zXG4gICAgICB9KTtcblxuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuc2hvdygpO1xuICAgICAgJCgnI2NoYXJ0LWxlZ2VuZCcpLmh0bWwodGhpcy5jaGFydE9iai5nZW5lcmF0ZUxlZ2VuZCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLmNoYXJ0LXNwZWNpZmljJykuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZSBvZiBwcm9ncmVzcyBiYXJcbiAgICogQHBhcmFtICB7TnVtYmVyfSB2YWx1ZSAtIGN1cnJlbnQgaXRlcmF0aW9uXG4gICAqIEBwYXJhbSAge051bWJlcn0gdG90YWwgLSB0b3RhbCBudW1iZXIgb2YgaXRlcmF0aW9uc1xuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICB1cGRhdGVQcm9ncmVzc0Jhcih2YWx1ZSwgdG90YWwpIHtcbiAgICBpZiAoIXRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsICcwJScpO1xuICAgICAgcmV0dXJuICQoJy5wcm9ncmVzcy1jb3VudGVyJykudGV4dCgnJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudGFnZSA9ICh2YWx1ZSAvIHRvdGFsKSAqIDEwMDtcbiAgICAkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd3aWR0aCcsIGAke3BlcmNlbnRhZ2UudG9GaXhlZCgyKX0lYCk7XG5cbiAgICBpZiAodmFsdWUgPT09IHRvdGFsKSB7XG4gICAgICAkKCcucHJvZ3Jlc3MtY291bnRlcicpLnRleHQoJ0J1aWxkaW5nIGRhdGFzZXQuLi4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLnByb2dyZXNzLWNvdW50ZXInKS50ZXh0KFxuICAgICAgICAkLmkxOG4oJ3Byb2Nlc3NpbmctcGFnZScsIHZhbHVlLCB0b3RhbClcbiAgICAgICk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RIZWxwZXJzO1xuIiwiLyoqXG4gKiBAZmlsZSBQb2x5ZmlsbHMgZm9yIHVzZXJzIHdobyByZWZ1c2UgdG8gdXBncmFkZSB0aGVpciBicm93c2Vyc1xuICogICBNb3N0IGNvZGUgaXMgYWRhcHRlZCBmcm9tIFtNRE5dKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnKVxuICovXG5cbi8vIEFycmF5LmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG4vLyBUaGlzIGlzIG5vdCBhIGZ1bGwgaW1wbGVtZW50YXRpb24sIGp1c3QgYSBzaG9ydGhhbmQgdG8gaW5kZXhPZiAhPT0gLTFcbmlmICggIUFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyApIHtcbiAgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZihzZWFyY2gpICE9PSAtMTtcbiAgfTtcbn1cblxuLy8gU3RyaW5nLmluY2x1ZGVzIGZ1bmN0aW9uIHBvbHlmaWxsXG5pZiAoICFTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzICkge1xuICBTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24oc2VhcmNoLCBzdGFydCkge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgIT09ICdudW1iZXInKSB7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ICsgc2VhcmNoLmxlbmd0aCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoLHN0YXJ0KSAhPT0gLTE7XG4gICAgfVxuICB9O1xufVxuXG4vLyBPYmplY3QuYXNzaWduXG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09ICdmdW5jdGlvbicpIHtcbiAgKGZ1bmN0aW9uKCkge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGxldCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgZm9yIChsZXQgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9KSgpO1xufVxuXG4vLyBDaGlsZE5vZGUucmVtb3ZlXG5pZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xuICB9O1xufVxuXG4vLyBTdHJpbmcuc3RhcnRzV2l0aFxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoID0gZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICAgIHBvc2l0aW9uID0gcG9zaXRpb24gfHwgMDtcbiAgICByZXR1cm4gdGhpcy5zdWJzdHIocG9zaXRpb24sIHNlYXJjaFN0cmluZy5sZW5ndGgpID09PSBzZWFyY2hTdHJpbmc7XG4gIH07XG59XG5cbi8vIEFycmF5Lm9mXG5pZiAoIUFycmF5Lm9mKSB7XG4gIEFycmF5Lm9mID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIEFycmF5LmZpbmRcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmQgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGxldCBsaXN0ID0gT2JqZWN0KHRoaXMpO1xuICAgIGxldCBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgICBsZXQgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICBsZXQgdmFsdWU7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuLy8gQXJyYXkuZmlsbFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsbCkge1xuICBBcnJheS5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICAvLyBTdGVwcyAxLTIuXG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RoaXMgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIGxldCBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgLy8gU3RlcHMgMy01LlxuICAgIGxldCBsZW4gPSBPLmxlbmd0aCA+Pj4gMDtcblxuICAgIC8vIFN0ZXBzIDYtNy5cbiAgICBsZXQgc3RhcnQgPSBhcmd1bWVudHNbMV07XG4gICAgbGV0IHJlbGF0aXZlU3RhcnQgPSBzdGFydCA+PiAwO1xuXG4gICAgLy8gU3RlcCA4LlxuICAgIGxldCBrID0gcmVsYXRpdmVTdGFydCA8IDAgP1xuICAgICAgTWF0aC5tYXgobGVuICsgcmVsYXRpdmVTdGFydCwgMCkgOlxuICAgICAgTWF0aC5taW4ocmVsYXRpdmVTdGFydCwgbGVuKTtcblxuICAgIC8vIFN0ZXBzIDktMTAuXG4gICAgbGV0IGVuZCA9IGFyZ3VtZW50c1syXTtcbiAgICBsZXQgcmVsYXRpdmVFbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/XG4gICAgICBsZW4gOiBlbmQgPj4gMDtcblxuICAgIC8vIFN0ZXAgMTEuXG4gICAgbGV0IGZpbmFsID0gcmVsYXRpdmVFbmQgPCAwID9cbiAgICAgIE1hdGgubWF4KGxlbiArIHJlbGF0aXZlRW5kLCAwKSA6XG4gICAgICBNYXRoLm1pbihyZWxhdGl2ZUVuZCwgbGVuKTtcblxuICAgIC8vIFN0ZXAgMTIuXG4gICAgd2hpbGUgKGsgPCBmaW5hbCkge1xuICAgICAgT1trXSA9IHZhbHVlO1xuICAgICAgaysrO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTMuXG4gICAgcmV0dXJuIE87XG4gIH07XG59XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjb2RlIGFtb25nc3QgYWxsIGFwcHMgKFBhZ2V2aWV3cywgVG9wdmlld3MsIExhbmd2aWV3cywgU2l0ZXZpZXdzLCBNYXNzdmlld3MsIFJlZGlyZWN0IFZpZXdzKVxuICogQGF1dGhvciBNdXNpa0FuaW1hbCwgS2FsZGFyaVxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG4vKiogY2xhc3MtbGVzcyBmaWxlcyB3aXRoIGdsb2JhbCBvdmVycmlkZXMgKi9cbnJlcXVpcmUoJy4vY29yZV9leHRlbnNpb25zJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscycpO1xuXG5jb25zdCBQdkNvbmZpZyA9IHJlcXVpcmUoJy4vcHZfY29uZmlnJyk7XG5jb25zdCBzaXRlTWFwID0gcmVxdWlyZSgnLi9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5cbi8qKiBQdiBjbGFzcywgY29udGFpbnMgY29kZSBhbW9uZ3N0IGFsbCBhcHBzIChQYWdldmlld3MsIFRvcHZpZXdzLCBMYW5ndmlld3MsIFNpdGV2aWV3cywgTWFzc3ZpZXdzLCBSZWRpcmVjdCBWaWV3cykgKi9cbmNsYXNzIFB2IGV4dGVuZHMgUHZDb25maWcge1xuICBjb25zdHJ1Y3RvcihhcHBDb25maWcpIHtcbiAgICBzdXBlcihhcHBDb25maWcpO1xuXG4gICAgLyoqIGFzc2lnbiBpbml0aWFsIGNsYXNzIHByb3BlcnRpZXMgKi9cbiAgICBjb25zdCBkZWZhdWx0cyA9IHRoaXMuY29uZmlnLmRlZmF1bHRzLFxuICAgICAgdmFsaWRQYXJhbXMgPSB0aGlzLmNvbmZpZy52YWxpZFBhcmFtcztcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnLCBhcHBDb25maWcpO1xuICAgIHRoaXMuY29uZmlnLmRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGFwcENvbmZpZy5kZWZhdWx0cyk7XG4gICAgdGhpcy5jb25maWcudmFsaWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWxpZFBhcmFtcywgYXBwQ29uZmlnLnZhbGlkUGFyYW1zKTtcblxuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0b3JhZ2UgPSB7fTsgLy8gdXNlZCBhcyBmYWxsYmFjayB3aGVuIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG5cbiAgICBbJ2xvY2FsaXplRGF0ZUZvcm1hdCcsICdudW1lcmljYWxGb3JtYXR0aW5nJywgJ2JlemllckN1cnZlJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvTG9nRGV0ZWN0aW9uJywgJ2JlZ2luQXRaZXJvJywgJ3JlbWVtYmVyQ2hhcnQnXS5mb3JFYWNoKHNldHRpbmcgPT4ge1xuICAgICAgdGhpc1tzZXR0aW5nXSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7c2V0dGluZ31gKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0c1tzZXR0aW5nXTtcbiAgICB9KTtcbiAgICB0aGlzLnNldHVwU2V0dGluZ3NNb2RhbCgpO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBudWxsO1xuICAgIHRoaXMuc2l0ZUluZm8gPSB7fTtcblxuICAgIC8qKiBAdHlwZSB7bnVsbHxEYXRlfSB0cmFja2luZyBvZiBlbGFwc2VkIHRpbWUgKi9cbiAgICB0aGlzLnByb2Nlc3NTdGFydCA9IG51bGw7XG5cbiAgICAvKiogYXNzaWduIGFwcCBpbnN0YW5jZSB0byB3aW5kb3cgZm9yIGRlYnVnZ2luZyBvbiBsb2NhbCBlbnZpcm9ubWVudCAqL1xuICAgIGlmIChsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0Jykge1xuICAgICAgd2luZG93LmFwcCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3BsYXNoKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kZWJ1ZyA9IGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnZGVidWc9dHJ1ZScpIHx8IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnO1xuXG4gICAgLyoqIHNob3cgbm90aWNlIGlmIG9uIHN0YWdpbmcgZW52aXJvbm1lbnQgKi9cbiAgICBpZiAoLy10ZXN0Ly50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSkge1xuICAgICAgY29uc3QgYWN0dWFsUGF0aE5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC8tdGVzdFxcLz8vLCAnJyk7XG4gICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ3dhcm5pbmcnLFxuICAgICAgICBgVGhpcyBpcyBhIHN0YWdpbmcgZW52aXJvbm1lbnQuIEZvciB0aGUgYWN0dWFsICR7ZG9jdW1lbnQudGl0bGV9LFxuICAgICAgICAgc2VlIDxhIGhyZWY9JyR7YWN0dWFsUGF0aE5hbWV9Jz4ke2xvY2F0aW9uLmhvc3RuYW1lfSR7YWN0dWFsUGF0aE5hbWV9PC9hPmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCB0cmFuc2xhdGlvbnMgdGhlbiBpbml0aWFsaXplIHRoZSBhcHAuXG4gICAgICogRWFjaCBhcHAgaGFzIGl0J3Mgb3duIGluaXRpYWxpemUgbWV0aG9kLlxuICAgICAqIE1ha2Ugc3VyZSB3ZSBsb2FkICdlbi5qc29uJyBhcyBhIGZhbGxiYWNrXG4gICAgICovXG4gICAgbGV0IG1lc3NhZ2VzVG9Mb2FkID0ge1xuICAgICAgW2kxOG5MYW5nXTogYC9wYWdldmlld3MvbWVzc2FnZXMvJHtpMThuTGFuZ30uanNvbmBcbiAgICB9O1xuICAgIGlmIChpMThuTGFuZyAhPT0gJ2VuJykge1xuICAgICAgbWVzc2FnZXNUb0xvYWQuZW4gPSAnL3BhZ2V2aWV3cy9tZXNzYWdlcy9lbi5qc29uJztcbiAgICB9XG4gICAgJC5pMThuKHtcbiAgICAgIGxvY2FsZTogaTE4bkxhbmdcbiAgICB9KS5sb2FkKG1lc3NhZ2VzVG9Mb2FkKS50aGVuKHRoaXMuaW5pdGlhbGl6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBzZXQgdXAgdG9hc3RyIGNvbmZpZy4gVGhlIGR1cmF0aW9uIG1heSBiZSBvdmVycmlkZW4gbGF0ZXIgKi9cbiAgICB0b2FzdHIub3B0aW9ucyA9IHtcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgZGVidWc6IGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnLFxuICAgICAgbmV3ZXN0T25Ub3A6IGZhbHNlLFxuICAgICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LXRvcC1jZW50ZXInLFxuICAgICAgcHJldmVudER1cGxpY2F0ZXM6IHRydWUsXG4gICAgICBvbmNsaWNrOiBudWxsLFxuICAgICAgc2hvd0R1cmF0aW9uOiAnMzAwJyxcbiAgICAgIGhpZGVEdXJhdGlvbjogJzEwMDAnLFxuICAgICAgdGltZU91dDogJzUwMDAnLFxuICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAnMzAwMCcsXG4gICAgICBzaG93RWFzaW5nOiAnc3dpbmcnLFxuICAgICAgaGlkZUVhc2luZzogJ2xpbmVhcicsXG4gICAgICBzaG93TWV0aG9kOiAnZmFkZUluJyxcbiAgICAgIGhpZGVNZXRob2Q6ICdmYWRlT3V0JyxcbiAgICAgIHRvYXN0Q2xhc3M6ICdhbGVydCcsXG4gICAgICBpY29uQ2xhc3Nlczoge1xuICAgICAgICBlcnJvcjogJ2FsZXJ0LWRhbmdlcicsXG4gICAgICAgIGluZm86ICdhbGVydC1pbmZvJyxcbiAgICAgICAgc3VjY2VzczogJ2FsZXJ0LXN1Y2Nlc3MnLFxuICAgICAgICB3YXJuaW5nOiAnYWxlcnQtd2FybmluZydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHNpdGUgbm90aWNlIChCb290c3RyYXAgYWxlcnQpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBsZXZlbCAtIG9uZSBvZiAnc3VjY2VzcycsICdpbmZvJywgJ3dhcm5pbmcnIG9yICdlcnJvcidcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIHRvIHNob3dcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0aXRsZV0gLSB3aWxsIGFwcGVhciBpbiBib2xkIGFuZCBpbiBmcm9udCBvZiB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkaXNtaXNzYWJsZV0gLSB3aGV0aGVyIG9yIG5vdCB0byBhZGQgYSBYXG4gICAqICAgdGhhdCBhbGxvd3MgdGhlIHVzZXIgdG8gZGlzbWlzcyB0aGUgbm90aWNlXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRTaXRlTm90aWNlKGxldmVsLCBtZXNzYWdlLCB0aXRsZSwgZGlzbWlzc2FibGUpIHtcbiAgICB0aXRsZSA9IHRpdGxlID8gYDxzdHJvbmc+JHt0aXRsZX08L3N0cm9uZz4gYCA6ICcnO1xuXG4gICAgbGV0IG1hcmt1cCA9IHRpdGxlICsgbWVzc2FnZTtcblxuICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgbWFya3VwLFxuICAgICAgbGV2ZWwsXG4gICAgICBkaXNtaXNzYWJsZSA/IDEwMDAwIDogMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNpdGUgbm90aWNlIGZvciBpbnZhbGlkIHBhcmFtZXRlclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0gLSBuYW1lIG9mIHBhcmFtZXRlclxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgYWRkSW52YWxpZFBhcmFtTm90aWNlKHBhcmFtKSB7XG4gICAgY29uc3QgZG9jTGluayA9IGA8YSBocmVmPScvJHt0aGlzLmFwcH0vdXJsX3N0cnVjdHVyZSc+JHskLmkxOG4oJ2RvY3VtZW50YXRpb24nKX08L2E+YDtcbiAgICB0aGlzLmFkZFNpdGVOb3RpY2UoXG4gICAgICAnZXJyb3InLFxuICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0zJywgcGFyYW0sIGRvY0xpbmspLFxuICAgICAgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdGhlIGRhdGUgcmFuZ2Ugb2YgZ2l2ZW4gcGFyYW1zXG4gICAqICAgYW5kIHRocm93IGVycm9ycyBhcyBuZWNlc3NhcnkgYW5kL29yIHNldCBkZWZhdWx0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gYXMgcmV0dXJuZWQgYnkgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKClcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlcmUgd2VyZSBubyBlcnJvcnMsIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgdmFsaWRhdGVEYXRlUmFuZ2UocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5yYW5nZSkge1xuICAgICAgaWYgKCF0aGlzLnNldFNwZWNpYWxSYW5nZShwYXJhbXMucmFuZ2UpKSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdyYW5nZScpO1xuICAgICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZSh0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlUmFuZ2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1zLnN0YXJ0KSB7XG4gICAgICBjb25zdCBkYXRlUmVnZXggPSAvXFxkezR9LVxcZHsyfS1cXGR7Mn0kLztcblxuICAgICAgLy8gZmlyc3Qgc2V0IGRlZmF1bHRzXG4gICAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgICAvLyB0aGVuIGNoZWNrIGZvcm1hdCBvZiBzdGFydCBhbmQgZW5kIGRhdGVcbiAgICAgIGlmIChwYXJhbXMuc3RhcnQgJiYgZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLnN0YXJ0KSkge1xuICAgICAgICBzdGFydERhdGUgPSBtb21lbnQocGFyYW1zLnN0YXJ0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdzdGFydCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmVuZCAmJiBkYXRlUmVnZXgudGVzdChwYXJhbXMuZW5kKSkge1xuICAgICAgICBlbmREYXRlID0gbW9tZW50KHBhcmFtcy5lbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ2VuZCcpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXkgYXJlIG91dHNpZGUgdGhlIHZhbGlkIHJhbmdlIG9yIGlmIGluIHRoZSB3cm9uZyBvcmRlclxuICAgICAgaWYgKHN0YXJ0RGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUgfHwgZW5kRGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsXG4gICAgICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0xJywgbW9tZW50KHRoaXMuY29uZmlnLm1pbkRhdGUpLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKSxcbiAgICAgICAgICAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0RGF0ZSA+IGVuZERhdGUpIHtcbiAgICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCdlcnJvcicsICQuaTE4bigncGFyYW0tZXJyb3ItMicpLCAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksIHRydWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qKiBkaXJlY3RseSBhc3NpZ24gc3RhcnREYXRlIGJlZm9yZSBjYWxsaW5nIHNldEVuZERhdGUgc28gZXZlbnRzIHdpbGwgYmUgZmlyZWQgb25jZSAqL1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc2V0RW5kRGF0ZShlbmREYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UodGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZVJhbmdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNsZWFyU2l0ZU5vdGljZXMoKSB7XG4gICAgJCgnLnNpdGUtbm90aWNlJykuaHRtbCgnJyk7XG4gIH1cblxuICBjbGVhck1lc3NhZ2VzKCkge1xuICAgICQoJy5tZXNzYWdlLWNvbnRhaW5lcicpLmh0bWwoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRlIGZvcm1hdCB0byB1c2UgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHJldHVybnMge3N0cmluZ30gZGF0ZSBmb3JtYXQgdG8gcGFzc2VkIHRvIHBhcnNlclxuICAgKi9cbiAgZ2V0IGRhdGVGb3JtYXQoKSB7XG4gICAgaWYgKHRoaXMubG9jYWxpemVEYXRlRm9ybWF0ID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExvY2FsZURhdGVTdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0ZXJhbmdlcGlja2VyIGluc3RhbmNlLiBQbGFpbiBhbmQgc2ltcGxlLlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGRhdGVyYW5nZSBwaWNrZXJcbiAgICovXG4gIGdldCBkYXRlcmFuZ2VwaWNrZXIoKSB7XG4gICAgcmV0dXJuICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGF0YWJhc2UgbmFtZSBvZiB0aGUgZ2l2ZW4gcHJvamV0XG4gICAqIEBwYXJhbSAge1N0cmluZ30gcHJvamVjdCAtIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEByZXR1cm4ge1N0cmluZ30gZGF0YWJhc2UgbmFtZVxuICAgKi9cbiAgZGJOYW1lKHByb2plY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc2l0ZU1hcCkuZmluZChrZXkgPT4gc2l0ZU1hcFtrZXldID09PSBgJHtwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCcnKX0ub3JnYCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgZG93bmxvYWQgb2YgZ2l2ZW4gZGF0YSwgb3Igb3BlbiBpbiBhIG5ldyB0YWIgaWYgSFRNTDUgPGE+IGRvd25sb2FkIGF0dHJpYnV0ZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIC0gUmF3IGRhdGEgcHJlcGVuZGVkIHdpdGggZGF0YSB0eXBlLCBlLmcuIFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LG15IGRhdGEuLi5cIlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXh0ZW5zaW9uIC0gdGhlIGZpbGUgZXh0ZW5zaW9uIHRvIHVzZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZG93bmxvYWREYXRhKGRhdGEsIGV4dGVuc2lvbikge1xuICAgIGNvbnN0IGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoZGF0YSk7XG5cbiAgICAvLyBjcmVhdGUgSFRNTDUgZG93bmxvYWQgZWxlbWVudCBhbmQgZm9yY2UgY2xpY2sgc28gd2UgY2FuIHNwZWNpZnkgYSBmaWxlbmFtZVxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaWYgKHR5cGVvZiBsaW5rLmRvd25sb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTsgLy8gRmlyZWZveCByZXF1aXJlcyB0aGUgbGluayB0byBiZSBpbiB0aGUgYm9keVxuXG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGAke3RoaXMuZ2V0RXhwb3J0RmlsZW5hbWUoKX0uJHtleHRlbnNpb259YDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICAgIGxpbmsuaHJlZiA9IGVuY29kZWRVcmk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7IC8vIHJlbW92ZSB0aGUgbGluayB3aGVuIGRvbmVcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7IC8vIG9wZW4gaW4gbmV3IHRhYiBpZiBkb3dubG9hZCBpc24ndCBzdXBwb3J0ZWQgKCpjb3VnaCogU2FmYXJpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaWxsIGluIHZhbHVlcyB3aXRoaW4gc2V0dGluZ3MgbW9kYWwgd2l0aCB3aGF0J3MgaW4gdGhlIHNlc3Npb24gb2JqZWN0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBmaWxsSW5TZXR0aW5ncygpIHtcbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0aGlzW2VsLm5hbWVdID09PSAndHJ1ZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gdGhpc1tlbC5uYW1lXSA9PT0gZWwudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGZvY3VzIHRvIFNlbGVjdDIgaW5wdXQgZmllbGRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGZvY3VzU2VsZWN0MigpIHtcbiAgICAkKCcuc2VsZWN0Mi1zZWxlY3Rpb24nKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICQoJy5zZWxlY3QyLXNlYXJjaF9fZmllbGQnKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBudW1iZXIgYmFzZWQgb24gY3VycmVudCBzZXR0aW5ncywgZS5nLiBsb2NhbGl6ZSB3aXRoIGNvbW1hIGRlbGltZXRlcnNcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBudW0gLSBudW1iZXIgdG8gZm9ybWF0XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGZvcm1hdHRlZCBudW1iZXJcbiAgICovXG4gIGZvcm1hdE51bWJlcihudW0pIHtcbiAgICBjb25zdCBudW1lcmljYWxGb3JtYXR0aW5nID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKCdwYWdldmlld3Mtc2V0dGluZ3MtbnVtZXJpY2FsRm9ybWF0dGluZycpIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLm51bWVyaWNhbEZvcm1hdHRpbmc7XG4gICAgaWYgKG51bWVyaWNhbEZvcm1hdHRpbmcgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRoaXMubihudW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVtO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdFlBeGlzTnVtYmVyKG51bSkge1xuICAgIGlmIChudW0gJSAxID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIobnVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRhdGUgaGVhZGluZ3MgYXMgc3RyaW5ncyAtIGkxOG4gY29tcGxpYW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9jYWxpemVkIC0gd2hldGhlciB0aGUgZGF0ZXMgc2hvdWxkIGJlIGxvY2FsaXplZCBwZXIgYnJvd3NlciBsYW5ndWFnZVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IHRoZSBkYXRlIGhlYWRpbmdzIGFzIHN0cmluZ3NcbiAgICovXG4gIGdldERhdGVIZWFkaW5ncyhsb2NhbGl6ZWQpIHtcbiAgICBjb25zdCBkYXRlSGVhZGluZ3MgPSBbXSxcbiAgICAgIGVuZERhdGUgPSBtb21lbnQodGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZSkuYWRkKDEsICdkJyk7XG5cbiAgICBmb3IgKGxldCBkYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSk7IGRhdGUuaXNCZWZvcmUoZW5kRGF0ZSk7IGRhdGUuYWRkKDEsICdkJykpIHtcbiAgICAgIGlmIChsb2NhbGl6ZWQpIHtcbiAgICAgICAgZGF0ZUhlYWRpbmdzLnB1c2goZGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRlSGVhZGluZ3MucHVzaChkYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGVIZWFkaW5ncztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cGxhbmRlZCB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqIFRoaXMgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiBnZXRQYWdlVVJMIHdoZW4geW91IHdhbnQgdG8gY2hhaW4gcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2UgbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBwYWdlXG4gICAqL1xuICBnZXRFeHBhbmRlZFBhZ2VVUkwocGFnZSkge1xuICAgIHJldHVybiBgLy8ke3RoaXMucHJvamVjdH0ub3JnL3cvaW5kZXgucGhwP3RpdGxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhZ2Uuc2NvcmUoKSkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSBmaWxlbmFtZSB3aXRob3V0IGFuIGV4dGVuc2lvblxuICAgKi9cbiAgZ2V0RXhwb3J0RmlsZW5hbWUoKSB7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKSxcbiAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpLmZvcm1hdCgnWVlZWU1NREQnKTtcbiAgICByZXR1cm4gYCR7dGhpcy5hcHB9LSR7c3RhcnREYXRlfS0ke2VuZERhdGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBmdWxsIGxpbmsgZm9yIHRoZSBnaXZlbiBwYWdlIGFuZCBwcm9qZWN0XG4gICAqIEBwYXJhbSAge3N0cmluZ30gcGFnZSAtIHBhZ2UgdG8gbGluayB0b1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IFtwcm9qZWN0XSAtIHByb2plY3QgbGluaywgZGVmYXVsdHMgdG8gYHRoaXMucHJvamVjdGBcbiAgICogQHJldHVybiB7c3RyaW5nfSBIVE1MIG1hcmt1cFxuICAgKi9cbiAgZ2V0UGFnZUxpbmsocGFnZSwgcHJvamVjdCkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIiR7dGhpcy5nZXRQYWdlVVJMKHBhZ2UsIHByb2plY3QpfVwiPiR7cGFnZS5kZXNjb3JlKCkuZXNjYXBlKCl9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlIC0gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHBhZ2VcbiAgICovXG4gIGdldFBhZ2VVUkwocGFnZSwgcHJvamVjdCA9IHRoaXMucHJvamVjdCkge1xuICAgIHJldHVybiBgLy8ke3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKS5lc2NhcGUoKX0ub3JnL3dpa2kvJHtwYWdlLnNjb3JlKCkucmVwbGFjZSgvJy8sIGVzY2FwZSl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpdGUgLSBzaXRlIG5hbWUgKGUuZy4gZW4ud2lraXBlZGlhLm9yZylcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgc2l0ZVxuICAgKi9cbiAgZ2V0U2l0ZUxpbmsoc2l0ZSkge1xuICAgIHJldHVybiBgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cIi8vJHtzaXRlfS5vcmdcIj4ke3NpdGV9PC9hPmA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwcm9qZWN0IG5hbWUgKHdpdGhvdXQgdGhlIC5vcmcpXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBsYW5nLnByb2plY3RuYW1lXG4gICAqL1xuICBnZXQgcHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbCgpO1xuICAgIC8qKiBHZXQgdGhlIGZpcnN0IDIgY2hhcmFjdGVycyBmcm9tIHRoZSBwcm9qZWN0IGNvZGUgdG8gZ2V0IHRoZSBsYW5ndWFnZSAqL1xuICAgIHJldHVybiBwcm9qZWN0ID8gcHJvamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy5vcmckLywgJycpIDogbnVsbDtcbiAgfVxuXG4gIGdldExvY2FsZURhdGVTdHJpbmcoKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3IubGFuZ3VhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1hdHMgPSB7XG4gICAgICAnYXItc2EnOiAnREQvTU0vWVknLFxuICAgICAgJ2JnLWJnJzogJ0RELk0uWVlZWScsXG4gICAgICAnY2EtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtdHcnOiAnWVlZWS9NL0QnLFxuICAgICAgJ2NzLWN6JzogJ0QuTS5ZWVlZJyxcbiAgICAgICdkYS1kayc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdkZS1kZSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbC1ncic6ICdEL00vWVlZWScsXG4gICAgICAnZW4tdXMnOiAnTS9EL1lZWVknLFxuICAgICAgJ2ZpLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdmci1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoZS1pbCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdodS1odSc6ICdZWVlZLiBNTS4gREQuJyxcbiAgICAgICdpcy1pcyc6ICdELk0uWVlZWScsXG4gICAgICAnaXQtaXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnamEtanAnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAna28ta3InOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnbmwtbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25iLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3BsLXBsJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3B0LWJyJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdyby1ybyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdydS1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdoci1ocic6ICdELk0uWVlZWScsXG4gICAgICAnc2stc2snOiAnRC4gTS4gWVlZWScsXG4gICAgICAnc3EtYWwnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3Ytc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAndGgtdGgnOiAnRC9NL1lZWVknLFxuICAgICAgJ3RyLXRyJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3VyLXBrJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2lkLWlkJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3VrLXVhJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2JlLWJ5JzogJ0RELk1NLllZWVknLFxuICAgICAgJ3NsLXNpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdldC1lZSc6ICdELk1NLllZWVknLFxuICAgICAgJ2x2LWx2JzogJ1lZWVkuTU0uREQuJyxcbiAgICAgICdsdC1sdCc6ICdZWVlZLk1NLkREJyxcbiAgICAgICdmYS1pcic6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICd2aS12bic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoeS1hbSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhei1sYXRuLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2V1LWVzJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ21rLW1rJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FmLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2thLWdlJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2ZvLWZvJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2hpLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21zLW15JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2trLWt6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2t5LWtnJzogJ0RELk1NLllZJyxcbiAgICAgICdzdy1rZSc6ICdNL2QvWVlZWScsXG4gICAgICAndXotbGF0bi11eic6ICdERC9NTSBZWVlZJyxcbiAgICAgICd0dC1ydSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwYS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZ3UtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ3RhLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3RlLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdrbi1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnbXItaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc2EtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbW4tbW4nOiAnWVkuTU0uREQnLFxuICAgICAgJ2dsLWVzJzogJ0REL01NL1lZJyxcbiAgICAgICdrb2staW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnc3lyLXN5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2R2LW12JzogJ0REL01NL1lZJyxcbiAgICAgICdhci1pcSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZGUtY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtbXgnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItYmUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdpdC1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdubC1iZSc6ICdEL01NL1lZWVknLFxuICAgICAgJ25uLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3B0LXB0JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3NyLWxhdG4tY3MnOiAnRC5NLllZWVknLFxuICAgICAgJ3N2LWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhei1jeXJsLWF6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ21zLWJuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3V6LWN5cmwtdXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXItZWcnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtaGsnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWF0JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWF1JzogJ0QvTU0vWVlZWScsXG4gICAgICAnZXMtZXMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItY2EnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3ItY3lybC1jcyc6ICdELk0uWVlZWScsXG4gICAgICAnYXItbHknOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWx1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWNhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FyLWR6JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3poLW1vJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1saSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1ueic6ICdEL01NL1lZWVknLFxuICAgICAgJ2VzLWNyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWx1JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW1hJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLWllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXBhJzogJ01NL0REL1lZWVknLFxuICAgICAgJ2ZyLW1jJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXRuJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2VuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2VzLWRvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLW9tJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLWptJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXZlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLTAyOSc6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICdlcy1jbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1zeSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1ieic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1qbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi10dCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1hcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1sYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi16dyc6ICdNL0QvWVlZWScsXG4gICAgICAnZXMtZWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXIta3cnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tcGgnOiAnTS9EL1lZWVknLFxuICAgICAgJ2VzLWNsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2FyLWFlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXV5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWJoJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXB5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXFhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWJvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXN2JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWhuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLW5pJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXByJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FtLWV0JzogJ0QvTS9ZWVlZJyxcbiAgICAgICd0em0tbGF0bi1keic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpdS1sYXRuLWNhJzogJ0QvTU0vWVlZWScsXG4gICAgICAnc21hLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ21uLW1vbmctY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2dkLWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLW15JzogJ0QvTS9ZWVlZJyxcbiAgICAgICdwcnMtYWYnOiAnREQvTU0vWVknLFxuICAgICAgJ2JuLWJkJzogJ0RELU1NLVlZJyxcbiAgICAgICd3by1zbic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdydy1ydyc6ICdNL0QvWVlZWScsXG4gICAgICAncXV0LWd0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NhaC1ydSc6ICdNTS5ERC5ZWVlZJyxcbiAgICAgICdnc3ctZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnY28tZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnb2MtZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnbWktbnonOiAnREQvTU0vWVlZWScsXG4gICAgICAnZ2EtaWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc2Utc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnYnItZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21uLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdtb2gtY2EnOiAnTS9EL1lZWVknLFxuICAgICAgJ2Fybi1jbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdpaS1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZHNiLWRlJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ2lnLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdrbC1nbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdsYi1sdSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiYS1ydSc6ICdERC5NTS5ZWScsXG4gICAgICAnbnNvLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3F1ei1ibyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd5by1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnaGEtbGF0bi1uZyc6ICdEL00vWVlZWScsXG4gICAgICAnZmlsLXBoJzogJ00vRC9ZWVlZJyxcbiAgICAgICdwcy1hZic6ICdERC9NTS9ZWScsXG4gICAgICAnZnktbmwnOiAnRC1NLVlZWVknLFxuICAgICAgJ25lLW5wJzogJ00vRC9ZWVlZJyxcbiAgICAgICdzZS1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdpdS1jYW5zLWNhJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdzci1sYXRuLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzaS1sayc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzci1jeXJsLXJzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdsby1sYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdrbS1raCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdjeS1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdiby1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnc21zLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhcy1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtbC1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnZW4taW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnb3ItaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2JuLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICd0ay10bSc6ICdERC5NTS5ZWScsXG4gICAgICAnYnMtbGF0bi1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnbXQtbXQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc3ItY3lybC1tZSc6ICdELk0uWVlZWScsXG4gICAgICAnc2UtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ3p1LXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3hoLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ3RuLXphJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2hzYi1kZSc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdicy1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICd0Zy1jeXJsLXRqJzogJ0RELk1NLnl5JyxcbiAgICAgICdzci1sYXRuLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWotbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncm0tY2gnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc21qLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3F1ei1lYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdxdXotcGUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHItYmEnOiAnRC5NLllZWVkuJyxcbiAgICAgICdzci1sYXRuLW1lJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzbWEtc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnZW4tc2cnOiAnRC9NL1lZWVknLFxuICAgICAgJ3VnLWNuJzogJ1lZWVktTS1EJyxcbiAgICAgICdzci1jeXJsLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdlcy11cyc6ICdNL0QvWVlZWSdcbiAgICB9O1xuXG4gICAgY29uc3Qga2V5ID0gbmF2aWdhdG9yLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGZvcm1hdHNba2V5XSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHZhbHVlIGZyb20gbG9jYWxTdG9yYWdlLCB1c2luZyBhIHRlbXBvcmFyeSBzdG9yYWdlIGlmIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgZm9yIHRoZSB2YWx1ZSB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IHN0b3JlZCB2YWx1ZVxuICAgKi9cbiAgZ2V0RnJvbUxvY2FsU3RvcmFnZShrZXkpIHtcbiAgICAvLyBTZWUgaWYgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBhbmQgZW5hYmxlZFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlW2tleV07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBVUkwgdG8gZmlsZSBhIHJlcG9ydCBvbiBNZXRhLCBwcmVsb2FkZWQgd2l0aCBwZXJtYWxpbmtcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwaGFiUGFzdGVdIFVSTCB0byBhdXRvLWdlbmVyYXRlZCBlcnJvciByZXBvcnQgb24gUGhhYnJpY2F0b3JcbiAgICogQHJldHVybiB7U3RyaW5nfSBVUkxcbiAgICovXG4gIGdldEJ1Z1JlcG9ydFVSTChwaGFiUGFzdGUpIHtcbiAgICBjb25zdCByZXBvcnRVUkwgPSAnaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmcvdy9pbmRleC5waHA/dGl0bGU9VGFsazpQYWdldmlld3NfQW5hbHlzaXMmYWN0aW9uPWVkaXQnICtcbiAgICAgIGAmc2VjdGlvbj1uZXcmcHJlbG9hZHRpdGxlPSR7dGhpcy5hcHAudXBjYXNlKCl9IGJ1ZyByZXBvcnRgO1xuXG4gICAgaWYgKHBoYWJQYXN0ZSkge1xuICAgICAgcmV0dXJuIGAke3JlcG9ydFVSTH0mcHJlbG9hZD1UYWxrOlBhZ2V2aWV3c19BbmFseXNpcy9QcmVsb2FkJnByZWxvYWRwYXJhbXNbXT0ke3BoYWJQYXN0ZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVwb3J0VVJMO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZ2VuZXJhbCBpbmZvcm1hdGlvbiBhYm91dCBhIHByb2plY3QsIHN1Y2ggYXMgbmFtZXNwYWNlcywgdGl0bGUgb2YgdGhlIG1haW4gcGFnZSwgZXRjLlxuICAgKiBEYXRhIHJldHVybmVkIGJ5IHRoZSBhcGkgaXMgYWxzbyBzdG9yZWQgaW4gdGhpcy5zaXRlSW5mb1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3Qgc3VjaCBhcyBlbi53aWtpcGVkaWEgKHdpdGggb3Igd2l0aG91dCAub3JnKVxuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggc2l0ZWluZm8sXG4gICAqICAgYWxvbmcgd2l0aCBhbnkgb3RoZXIgY2FjaGVkIHNpdGVpbmZvIGZvciBvdGhlciBwcm9qZWN0c1xuICAgKi9cbiAgZmV0Y2hTaXRlSW5mbyhwcm9qZWN0KSB7XG4gICAgcHJvamVjdCA9IHByb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKTtcbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCksXG4gICAgICBjYWNoZUtleSA9IGBwYWdldmlld3Mtc2l0ZWluZm8tJHtwcm9qZWN0fWA7XG5cbiAgICBpZiAodGhpcy5zaXRlSW5mb1twcm9qZWN0XSkgcmV0dXJuIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuXG4gICAgLy8gdXNlIGNhY2hlZCBzaXRlIGluZm8gaWYgcHJlc2VudFxuICAgIGlmIChzaW1wbGVTdG9yYWdlLmhhc0tleShjYWNoZUtleSkpIHtcbiAgICAgIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0gPSBzaW1wbGVTdG9yYWdlLmdldChjYWNoZUtleSk7XG4gICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb3RoZXJ3aXNlIGZldGNoIHNpdGVpbmZvIGFuZCBzdG9yZSBpbiBjYWNoZVxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9Lm9yZy93L2FwaS5waHBgLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICAgIG1ldGE6ICdzaXRlaW5mbycsXG4gICAgICAgICAgc2lwcm9wOiAnZ2VuZXJhbHxuYW1lc3BhY2VzJyxcbiAgICAgICAgICBmb3JtYXQ6ICdqc29uJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSA9IGRhdGEucXVlcnk7XG5cbiAgICAgICAgLy8gY2FjaGUgZm9yIG9uZSB3ZWVrIChUVEwgaXMgaW4gbWlsbGlzZWNvbmRzKVxuICAgICAgICBzaW1wbGVTdG9yYWdlLnNldChjYWNoZUtleSwgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSwge1RUTDogMTAwMCAqIDYwICogNjAgKiAyNCAqIDd9KTtcblxuICAgICAgICBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIGRmZC5yZWplY3QoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciB0byBnZXQgc2l0ZWluZm8gZnJvbSB0aGlzLnNpdGVJbmZvIGZvciBnaXZlbiBwcm9qZWN0LCB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgbmFtZSwgd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IHNpdGUgaW5mb3JtYXRpb24gaWYgcHJlc2VudFxuICAgKi9cbiAgZ2V0U2l0ZUluZm8ocHJvamVjdCkge1xuICAgIHJldHVybiB0aGlzLnNpdGVJbmZvW3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sICcnKV07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHVzZXIgYWdlbnQsIGlmIHN1cHBvcnRlZFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSB1c2VyLWFnZW50XG4gICAqL1xuICBnZXRVc2VyQWdlbnQoKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJ1Vua25vd24nO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHZhbHVlIHRvIGxvY2FsU3RvcmFnZSwgdXNpbmcgYSB0ZW1wb3Jhcnkgc3RvcmFnZSBpZiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0ga2V5IGZvciB0aGUgdmFsdWUgdG8gc2V0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIC0gdmFsdWUgdG8gc3RvcmVcbiAgICogQHJldHVybnMge01peGVkfSBzdG9yZWQgdmFsdWVcbiAgICovXG4gIHNldExvY2FsU3RvcmFnZShrZXksIHZhbHVlKSB7XG4gICAgLy8gU2VlIGlmIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgYW5kIGVuYWJsZWRcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHVuaXF1ZSBoYXNoIGNvZGUgZnJvbSBnaXZlbiBzdHJpbmdcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzdHIgLSB0byBiZSBoYXNoZWRcbiAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgaGFzaFxuICAgKi9cbiAgaGFzaENvZGUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykucmVkdWNlKChwcmV2SGFzaCwgY3VyclZhbCkgPT5cbiAgICAgICgocHJldkhhc2ggPDwgNSkgLSBwcmV2SGFzaCkgKyBjdXJyVmFsLmNoYXJDb2RlQXQoMCksIDApO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBjaGFydC12aWV3IGFwcHMgKHRoYXQgZG9lcyBub3QgaGF2ZSBhIGxpc3Qgdmlldyk/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzQ2hhcnRBcHAoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzTGlzdEFwcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIElzIHRoaXMgb25lIG9mIHRoZSBsaXN0LXZpZXcgYXBwcz9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNMaXN0QXBwKCkge1xuICAgIHJldHVybiBbJ2xhbmd2aWV3cycsICdtYXNzdmlld3MnLCAncmVkaXJlY3R2aWV3cyddLmluY2x1ZGVzKHRoaXMuYXBwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIHRoZSBjdXJyZW50IHByb2plY3QgaXMgYSBtdWx0aWxpbmd1YWwgcHJvamVjdFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gaXMgbXVsdGlsaW5ndWFsIG9yIG5vdFxuICAgKi9cbiAgaXNNdWx0aWxhbmdQcm9qZWN0KCkge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKGAuKj9cXFxcLigke1B2Lm11bHRpbGFuZ1Byb2plY3RzLmpvaW4oJ3wnKX0pYCkudGVzdCh0aGlzLnByb2plY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcCBub3JtYWxpemVkIHBhZ2VzIGZyb20gQVBJIGludG8gYSBzdHJpbmcgb2YgcGFnZSBuYW1lc1xuICAgKiBVc2VkIGluIG5vcm1hbGl6ZVBhZ2VOYW1lcygpXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcGFyYW0ge2FycmF5fSBub3JtYWxpemVkUGFnZXMgLSBhcnJheSBvZiBub3JtYWxpemVkIG1hcHBpbmdzIHJldHVybmVkIGJ5IHRoZSBBUElcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlcyB3aXRoIHRoZSBuZXcgbm9ybWFsaXplZCBuYW1lcywgaWYgZ2l2ZW5cbiAgICovXG4gIG1hcE5vcm1hbGl6ZWRQYWdlTmFtZXMocGFnZXMsIG5vcm1hbGl6ZWRQYWdlcykge1xuICAgIG5vcm1hbGl6ZWRQYWdlcy5mb3JFYWNoKG5vcm1hbFBhZ2UgPT4ge1xuICAgICAgLyoqIGRvIGl0IHRoaXMgd2F5IHRvIHByZXNlcnZlIG9yZGVyaW5nIG9mIHBhZ2VzICovXG4gICAgICBwYWdlcyA9IHBhZ2VzLm1hcChwYWdlID0+IHtcbiAgICAgICAgaWYgKG5vcm1hbFBhZ2UuZnJvbSA9PT0gcGFnZSkge1xuICAgICAgICAgIHJldHVybiBub3JtYWxQYWdlLnRvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwYWdlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBvZiB2YWxpZCBtdWx0aWxpbmd1YWwgcHJvamVjdHNcbiAgICogQHJldHVybiB7QXJyYXl9IGJhc2UgcHJvamVjdHMsIHdpdGhvdXQgdGhlIGxhbmd1YWdlXG4gICAqL1xuICBzdGF0aWMgZ2V0IG11bHRpbGFuZ1Byb2plY3RzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnd2lraXBlZGlhJyxcbiAgICAgICd3aWtpYm9va3MnLFxuICAgICAgJ3dpa2luZXdzJyxcbiAgICAgICd3aWtpcXVvdGUnLFxuICAgICAgJ3dpa2lzb3VyY2UnLFxuICAgICAgJ3dpa2l2ZXJzaXR5JyxcbiAgICAgICd3aWtpdm95YWdlJ1xuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBtYXNzIHJlcXVlc3RzIHRvIE1lZGlhV2lraSBBUElcbiAgICogVGhlIEFQSSBub3JtYWxseSBsaW1pdHMgdG8gNTAwIHBhZ2VzLCBidXQgZ2l2ZXMgeW91IGEgJ2NvbnRpbnVlJyB2YWx1ZVxuICAgKiAgIHRvIGZpbmlzaCBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgcmVzb3VyY2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbWV0ZXJzIHRvIHBhc3MgdG8gdGhlIEFQSVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvamVjdCAtIHByb2plY3QgdG8gcXVlcnksIGUuZy4gZW4ud2lraXBlZGlhICgub3JnIGlzIG9wdGlvbmFsKVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRpbnVlS2V5XSAtIHRoZSBrZXkgdG8gbG9vayBpbiB0aGUgY29udGludWUgaGFzaCwgaWYgcHJlc2VudCAoZS5nLiBjbWNvbnRpbnVlIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gW2RhdGFLZXldIC0gdGhlIGtleSBmb3IgdGhlIG1haW4gY2h1bmsgb2YgZGF0YSwgaW4gdGhlIHF1ZXJ5IGhhc2ggKGUuZy4gY2F0ZWdvcnltZW1iZXJzIGZvciBBUEk6Q2F0ZWdvcnltZW1iZXJzKVxuICAgKiAgIElmIHRoaXMgaXMgYSBmdW5jdGlvbiBpdCBpcyBnaXZlbiB0aGUgcmVzcG9uc2UgZGF0YSwgYW5kIGV4cGVjdGVkIHRvIHJldHVybiB0aGUgZGF0YSB3ZSB3YW50IHRvIGNvbmNhdGVudGF0ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtsaW1pdF0gLSBtYXggbnVtYmVyIG9mIHBhZ2VzIHRvIGZldGNoXG4gICAqIEByZXR1cm4ge0RlZmVycmVkfSBwcm9taXNlIHJlc29sdmluZyB3aXRoIGRhdGFcbiAgICovXG4gIG1hc3NBcGkocGFyYW1zLCBwcm9qZWN0LCBjb250aW51ZUtleSA9ICdjb250aW51ZScsIGRhdGFLZXksIGxpbWl0ID0gdGhpcy5jb25maWcuYXBpTGltaXQpIHtcbiAgICBpZiAoIS9cXC5vcmckLy50ZXN0KHByb2plY3QpKSBwcm9qZWN0ICs9ICcub3JnJztcblxuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcbiAgICBsZXQgcmVzb2x2ZURhdGEgPSB7XG4gICAgICBwYWdlczogW11cbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZVJlcXVlc3QgPSBjb250aW51ZVZhbHVlID0+IHtcbiAgICAgIGxldCByZXF1ZXN0RGF0YSA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBmb3JtYXR2ZXJzaW9uOiAnMidcbiAgICAgIH0sIHBhcmFtcyk7XG5cbiAgICAgIGlmIChjb250aW51ZVZhbHVlKSByZXF1ZXN0RGF0YVtjb250aW51ZUtleV0gPSBjb250aW51ZVZhbHVlO1xuXG4gICAgICBjb25zdCBwcm9taXNlID0gJC5hamF4KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke3Byb2plY3R9L3cvYXBpLnBocGAsXG4gICAgICAgIGpzb25wOiAnY2FsbGJhY2snLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgZGF0YTogcmVxdWVzdERhdGFcbiAgICAgIH0pO1xuXG4gICAgICBwcm9taXNlLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIC8vIHNvbWUgZmFpbHVyZXMgY29tZSBiYWNrIGFzIDIwMHMsIHNvIHdlIHN0aWxsIHJlc29sdmUgYW5kIGxldCB0aGUgbG9jYWwgYXBwIGhhbmRsZSBpdFxuICAgICAgICBpZiAoZGF0YS5lcnJvcikgcmV0dXJuIGRmZC5yZXNvbHZlKGRhdGEpO1xuXG4gICAgICAgIGxldCBpc0ZpbmlzaGVkO1xuXG4gICAgICAgIC8vIGFsbG93IGN1c3RvbSBmdW5jdGlvbiB0byBwYXJzZSB0aGUgZGF0YSB3ZSB3YW50LCBpZiBwcm92aWRlZFxuICAgICAgICBpZiAodHlwZW9mIGRhdGFLZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhS2V5KGRhdGEucXVlcnkpKTtcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGFwcGVuZCBuZXcgZGF0YSB0byBkYXRhIGZyb20gbGFzdCByZXF1ZXN0LiBXZSBtaWdodCB3YW50IGJvdGggJ3BhZ2VzJyBhbmQgZGF0YUtleVxuICAgICAgICAgIGlmIChkYXRhLnF1ZXJ5LnBhZ2VzKSB7XG4gICAgICAgICAgICByZXNvbHZlRGF0YS5wYWdlcyA9IHJlc29sdmVEYXRhLnBhZ2VzLmNvbmNhdChkYXRhLnF1ZXJ5LnBhZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGEucXVlcnlbZGF0YUtleV0pIHtcbiAgICAgICAgICAgIHJlc29sdmVEYXRhW2RhdGFLZXldID0gKHJlc29sdmVEYXRhW2RhdGFLZXldIHx8IFtdKS5jb25jYXQoZGF0YS5xdWVyeVtkYXRhS2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIHBhZ2VzIGlzIG5vdCB0aGUgY29sbGVjdGlvbiB3ZSB3YW50LCBpdCB3aWxsIGJlIGVpdGhlciBhbiBlbXB0eSBhcnJheSBvciBvbmUgZW50cnkgd2l0aCBiYXNpYyBwYWdlIGluZm9cbiAgICAgICAgICAvLyAgIGRlcGVuZGluZyBvbiB3aGF0IEFQSSB3ZSdyZSBoaXR0aW5nLiBTbyByZXNvbHZlRGF0YVtkYXRhS2V5XSB3aWxsIGhpdCB0aGUgbGltaXRcbiAgICAgICAgICBpc0ZpbmlzaGVkID0gcmVzb2x2ZURhdGEucGFnZXMubGVuZ3RoID49IGxpbWl0IHx8IHJlc29sdmVEYXRhW2RhdGFLZXldLmxlbmd0aCA+PSBsaW1pdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2UgcmVjdXJzaXZlIGNhbGwgaWYgbmVlZGVkLCB3YWl0aW5nIDEwMG1zXG4gICAgICAgIGlmICghaXNGaW5pc2hlZCAmJiBkYXRhLmNvbnRpbnVlICYmIGRhdGEuY29udGludWVbY29udGludWVLZXldKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtYWtlUmVxdWVzdChkYXRhLmNvbnRpbnVlW2NvbnRpbnVlS2V5XSk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpbmRpY2F0ZSB0aGVyZSB3ZXJlIG1vcmUgZW50cmllcyB0aGFuIHRoZSBsaW1pdFxuICAgICAgICAgIGlmIChkYXRhLmNvbnRpbnVlKSByZXNvbHZlRGF0YS5jb250aW51ZSA9IHRydWU7XG4gICAgICAgICAgZGZkLnJlc29sdmUocmVzb2x2ZURhdGEpO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgICBkZmQucmVqZWN0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIG1ha2VSZXF1ZXN0KCk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIExvY2FsaXplIE51bWJlciBvYmplY3Qgd2l0aCBkZWxpbWl0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIHRoZSBOdW1iZXIsIGUuZy4gMTIzNDU2N1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHdpdGggbG9jYWxlIGRlbGltaXRlcnMsIGUuZy4gMSwyMzQsNTY3IChlbi1VUylcbiAgICovXG4gIG4odmFsdWUpIHtcbiAgICByZXR1cm4gKG5ldyBOdW1iZXIodmFsdWUpKS50b0xvY2FsZVN0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBiYXNpYyBpbmZvIG9uIGdpdmVuIHBhZ2VzLCBpbmNsdWRpbmcgdGhlIG5vcm1hbGl6ZWQgcGFnZSBuYW1lcy5cbiAgICogRS5nLiBtYXNjdWxpbmUgdmVyc3VzIGZlbWluaW5lIG5hbWVzcGFjZXMgb24gZGV3aWtpXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcmV0dXJucyB7RGVmZXJyZWR9IHByb21pc2Ugd2l0aCBkYXRhIGZldGNoZWQgZnJvbSBBUElcbiAgICovXG4gIGdldFBhZ2VJbmZvKHBhZ2VzKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly8ke3RoaXMucHJvamVjdH0ub3JnL3cvYXBpLnBocD9hY3Rpb249cXVlcnkmcHJvcD1pbmZvJmlucHJvcD1wcm90ZWN0aW9ufHdhdGNoZXJzYCArXG4gICAgICAgIGAmZm9ybWF0dmVyc2lvbj0yJmZvcm1hdD1qc29uJnRpdGxlcz0ke3BhZ2VzLmpvaW4oJ3wnKX1gLFxuICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgbGV0IHBhZ2VEYXRhID0ge307XG4gICAgICBkYXRhLnF1ZXJ5LnBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XG4gICAgICAgIHBhZ2VEYXRhW3BhZ2UudGl0bGVdID0gcGFnZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKHBhZ2VEYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIGhvdyBtYW55IGRheXMgYXJlIGluIHRoZSBzZWxlY3RlZCBkYXRlIHJhbmdlXG4gICAqIEByZXR1cm5zIHtpbnRlZ2VyfSBudW1iZXIgb2YgZGF5c1xuICAgKi9cbiAgbnVtRGF5c0luUmFuZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuZGlmZih0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUsICdkYXlzJykgKyAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGtleS92YWx1ZSBwYWlycyBvZiBVUkwgcXVlcnkgc3RyaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbXVsdGlQYXJhbV0gLSBwYXJhbWV0ZXIgd2hvc2UgdmFsdWVzIG5lZWRzIHRvIHNwbGl0IGJ5IHBpcGUgY2hhcmFjdGVyXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGtleS92YWx1ZSBwYWlycyByZXByZXNlbnRhdGlvbiBvZiBxdWVyeSBzdHJpbmdcbiAgICovXG4gIHBhcnNlUXVlcnlTdHJpbmcobXVsdGlQYXJhbSkge1xuICAgIGNvbnN0IHVyaSA9IGRlY29kZVVSSShsb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkpLFxuICAgICAgY2h1bmtzID0gdXJpLnNwbGl0KCcmJyk7XG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjaHVuayA9IGNodW5rc1tpXS5zcGxpdCgnPScpO1xuXG4gICAgICBpZiAobXVsdGlQYXJhbSAmJiBjaHVua1swXSA9PT0gbXVsdGlQYXJhbSkge1xuICAgICAgICBwYXJhbXNbbXVsdGlQYXJhbV0gPSBjaHVua1sxXS5zcGxpdCgnfCcpLmZpbHRlcihwYXJhbSA9PiAhIXBhcmFtKS51bmlxdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtc1tjaHVua1swXV0gPSBjaHVua1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBtZXRyaWMgdG8gc2VlIGhvdyBtYW55IHVzZSBpdCAocGFnZXZpZXdzIG9mIHRoZSBwYWdldmlldywgYSBtZXRhLXBhZ2V2aWV3LCBpZiB5b3Ugd2lsbCA6KVxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBwIC0gb25lIG9mOiBwdiwgbHYsIHR2LCBzdiwgbXNcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcGF0Y2hVc2FnZShhcHApIHtcbiAgICBpZiAobWV0YVJvb3QpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYC8vJHttZXRhUm9vdH0vdXNhZ2UvJHt0aGlzLmFwcH0vJHt0aGlzLnByb2plY3QgfHwgaTE4bkxhbmd9YCxcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRpbWVzdGFtcCBvZiB3aGVuIHByb2Nlc3Mgc3RhcnRlZFxuICAgKiBAcmV0dXJuIHttb21lbnR9IHN0YXJ0IHRpbWVcbiAgICovXG4gIHByb2Nlc3NTdGFydGVkKCkge1xuICAgIHJldHVybiB0aGlzLnByb2Nlc3NTdGFydCA9IG1vbWVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbGFwc2VkIHRpbWUgZnJvbSB0aGlzLnByb2Nlc3NTdGFydCwgYW5kIHNob3cgaXRcbiAgICogQHJldHVybiB7bW9tZW50fSBFbGFwc2VkIHRpbWUgZnJvbSBgdGhpcy5wcm9jZXNzU3RhcnRgIGluIG1pbGxpc2Vjb25kc1xuICAgKi9cbiAgcHJvY2Vzc0VuZGVkKCkge1xuICAgIGNvbnN0IGVuZFRpbWUgPSBtb21lbnQoKSxcbiAgICAgIGVsYXBzZWRUaW1lID0gZW5kVGltZS5kaWZmKHRoaXMucHJvY2Vzc1N0YXJ0LCAnbWlsbGlzZWNvbmRzJyk7XG5cbiAgICAvKiogRklYTUU6IHJlcG9ydCB0aGlzIGJ1Zzogc29tZSBsYW5ndWFnZXMgZG9uJ3QgcGFyc2UgUExVUkFMIGNvcnJlY3RseSAoJ2hlJyBmb3IgZXhhbXBsZSkgd2l0aCB0aGUgRW5nbGlzaCBmYWxsYmFjayBtZXNzYWdlICovXG4gICAgdHJ5IHtcbiAgICAgICQoJy5lbGFwc2VkLXRpbWUnKS5hdHRyKCdkYXRldGltZScsIGVuZFRpbWUuZm9ybWF0KCkpXG4gICAgICAgIC50ZXh0KCQuaTE4bignZWxhcHNlZC10aW1lJywgZWxhcHNlZFRpbWUgLyAxMDAwKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxsIG5vdGhpbmcsIGV2ZXJ5dGhpbmcgd2lsbCBzdGlsbCBzaG93XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsYXBzZWRUaW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkYXB0ZWQgZnJvbSBodHRwOi8vanNmaWRkbGUubmV0L2RhbmR2LzQ3Y2JqLyBjb3VydGVzeSBvZiBkYW5kdlxuICAgKlxuICAgKiBTYW1lIGFzIF8uZGVib3VuY2UgYnV0IHF1ZXVlcyBhbmQgZXhlY3V0ZXMgYWxsIGZ1bmN0aW9uIGNhbGxzXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAtIGZ1bmN0aW9uIHRvIGRlYm91bmNlXG4gICAqIEBwYXJhbSAge2RlbGF5fSBkZWxheSAtIGRlbGF5IGR1cmF0aW9uIG9mIG1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHQgLSBzY29wZSB0aGUgZnVuY3Rpb24gc2hvdWxkIHJlZmVyIHRvXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByYXRlLWxpbWl0ZWQgZnVuY3Rpb24gdG8gY2FsbCBpbnN0ZWFkIG9mIHlvdXIgZnVuY3Rpb25cbiAgICovXG4gIHJhdGVMaW1pdChmbiwgZGVsYXksIGNvbnRleHQpIHtcbiAgICBsZXQgcXVldWUgPSBbXSwgdGltZXI7XG5cbiAgICBjb25zdCBwcm9jZXNzUXVldWUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGZuLmFwcGx5KGl0ZW0uY29udGV4dCwgaXRlbS5hcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKSwgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbGltaXRlZCgpIHtcbiAgICAgIHF1ZXVlLnB1c2goe1xuICAgICAgICBjb250ZXh0OiBjb250ZXh0IHx8IHRoaXMsXG4gICAgICAgIGFyZ3VtZW50czogW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0aW1lcikge1xuICAgICAgICBwcm9jZXNzUXVldWUoKTsgLy8gc3RhcnQgaW1tZWRpYXRlbHkgb24gdGhlIGZpcnN0IGludm9jYXRpb25cbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChwcm9jZXNzUXVldWUsIGRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIFNlbGVjdDIgcmVsYXRlZCBzdHVmZiB0aGVuIGFkZHMgaXQgYmFja1xuICAgKiBBbHNvIG1pZ2h0IHJlc3VsdCBpbiB0aGUgY2hhcnQgYmVpbmcgcmUtcmVuZGVyZWRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlc2V0U2VsZWN0MigpIHtcbiAgICBjb25zdCBzZWxlY3QySW5wdXQgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgc2VsZWN0MklucHV0Lm9mZignY2hhbmdlJyk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ3ZhbCcsIG51bGwpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCdkYXRhJywgbnVsbCk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2Rlc3Ryb3knKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBhbHBoYSBsZXZlbCBvZiBhbiByZ2JhIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHJnYmEgdmFsdWVcbiAgICogQHBhcmFtIHtmbG9hdHxzdHJpbmd9IGFscGhhIC0gdHJhbnNwYXJlbmN5IGFzIGZsb2F0IHZhbHVlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHJnYmEgdmFsdWVcbiAgICovXG4gIHJnYmEodmFsdWUsIGFscGhhKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoLyxcXHMqXFxkXFwpLywgYCwgJHthbHBoYX0pYCk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSBhIHBhcnRpY3VsYXIgc2V0dGluZyB0byBzZXNzaW9uIGFuZCBsb2NhbFN0b3JhZ2VcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHNldHRpbmdzIGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ3xib29sZWFufSB2YWx1ZSAtIHZhbHVlIHRvIHNhdmVcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5nKGtleSwgdmFsdWUpIHtcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICB0aGlzLnNldExvY2FsU3RvcmFnZShgcGFnZXZpZXdzLXNldHRpbmdzLSR7a2V5fWAsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBzZWxlY3RlZCBzZXR0aW5ncyB3aXRoaW4gdGhlIHNldHRpbmdzIG1vZGFsXG4gICAqIFByZWZlciB0aGlzIGltcGxlbWVudGF0aW9uIG92ZXIgYSBsYXJnZSBsaWJyYXJ5IGxpa2Ugc2VyaWFsaXplT2JqZWN0IG9yIHNlcmlhbGl6ZUpTT05cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNhdmVTZXR0aW5ncygpIHtcbiAgICAvKiogdHJhY2sgaWYgd2UncmUgY2hhbmdpbmcgdG8gbm9fYXV0b2NvbXBsZXRlIG1vZGUgKi9cbiAgICBjb25zdCB3YXNBdXRvY29tcGxldGUgPSB0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZSc7XG5cbiAgICAkLmVhY2goJCgnI3NldHRpbmdzLW1vZGFsIGlucHV0JyksIChpbmRleCwgZWwpID0+IHtcbiAgICAgIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwuY2hlY2tlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgfSBlbHNlIGlmIChlbC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmcoZWwubmFtZSwgZWwudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXBwICE9PSAndG9wdmlld3MnKSB7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5sb2NhbGUuZm9ybWF0ID0gdGhpcy5kYXRlRm9ybWF0O1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIudXBkYXRlRWxlbWVudCgpO1xuXG4gICAgICB0aGlzLnNldHVwU2VsZWN0MkNvbG9ycygpO1xuXG4gICAgICAvKipcbiAgICAgICAqIElmIHdlIGNoYW5nZWQgdG8vZnJvbSBub19hdXRvY29tcGxldGUgd2UgaGF2ZSB0byByZXNldCBTZWxlY3QyIGVudGlyZWx5XG4gICAgICAgKiAgIGFzIHNldFNlbGVjdDJEZWZhdWx0cyBpcyBzdXBlciBidWdneSBkdWUgdG8gU2VsZWN0MiBjb25zdHJhaW50c1xuICAgICAgICogU28gbGV0J3Mgb25seSByZXNldCBpZiB3ZSBoYXZlIHRvXG4gICAgICAgKi9cbiAgICAgIGlmICgodGhpcy5hdXRvY29tcGxldGUgPT09ICdub19hdXRvY29tcGxldGUnKSAhPT0gd2FzQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJlZ2luQXRaZXJvID09PSAndHJ1ZScpIHtcbiAgICAgICAgJCgnLmJlZ2luLWF0LXplcm8tb3B0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc0lucHV0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpcmVjdGx5IHNldCBpdGVtcyBpbiBTZWxlY3QyXG4gICAqIEN1cnJlbnRseSBpcyBub3QgYWJsZSB0byByZW1vdmUgdW5kZXJzY29yZXMgZnJvbSBwYWdlIG5hbWVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGl0ZW1zIC0gcGFnZSB0aXRsZXNcbiAgICogQHJldHVybnMge2FycmF5fSAtIHVudG91Y2hlZCBhcnJheSBvZiBpdGVtc1xuICAgKi9cbiAgc2V0U2VsZWN0MkRlZmF1bHRzKGl0ZW1zKSB7XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGVzY2FwZWRUZXh0ID0gJCgnPGRpdj4nKS50ZXh0KGl0ZW0pLmh0bWwoKTtcbiAgICAgICQoJzxvcHRpb24+JyArIGVzY2FwZWRUZXh0ICsgJzwvb3B0aW9uPicpLmFwcGVuZFRvKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgfSk7XG4gICAgJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcsIGl0ZW1zKTtcbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MignY2xvc2UnKTtcblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkYXRlcmFuZ2UgcGlja2VyIHZhbHVlcyBhbmQgdGhpcy5zcGVjaWFsUmFuZ2UgYmFzZWQgb24gcHJvdmlkZWQgc3BlY2lhbCByYW5nZSBrZXlcbiAgICogV0FSTklORzogbm90IHRvIGJlIGNhbGxlZCBvbiBkYXRlcmFuZ2UgcGlja2VyIEdVSSBldmVudHMgKGUuZy4gc3BlY2lhbCByYW5nZSBidXR0b25zKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIG9uZSBvZiBzcGVjaWFsIHJhbmdlcyBkZWZpbmVkIGluIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMsXG4gICAqICAgaW5jbHVkaW5nIGR5bmFtaWMgbGF0ZXN0IHJhbmdlLCBzdWNoIGFzIGBsYXRlc3QtMTVgIGZvciBsYXRlc3QgMTUgZGF5c1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fG51bGx9IHVwZGF0ZWQgdGhpcy5zcGVjaWFsUmFuZ2Ugb2JqZWN0IG9yIG51bGwgaWYgdHlwZSB3YXMgaW52YWxpZFxuICAgKi9cbiAgc2V0U3BlY2lhbFJhbmdlKHR5cGUpIHtcbiAgICBjb25zdCByYW5nZUluZGV4ID0gT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuaW5kZXhPZih0eXBlKTtcbiAgICBsZXQgc3RhcnREYXRlLCBlbmREYXRlO1xuXG4gICAgaWYgKHR5cGUuaW5jbHVkZXMoJ2xhdGVzdC0nKSkge1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQodHlwZS5yZXBsYWNlKCdsYXRlc3QtJywgJycpLCAxMCkgfHwgMjA7IC8vIGZhbGxiYWNrIG9mIDIwXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMubGF0ZXN0KG9mZnNldCk7XG4gICAgfSBlbHNlIGlmIChyYW5nZUluZGV4ID49IDApIHtcbiAgICAgIC8qKiB0cmVhdCAnbGF0ZXN0JyBhcyBhIGZ1bmN0aW9uICovXG4gICAgICBbc3RhcnREYXRlLCBlbmREYXRlXSA9IHR5cGUgPT09ICdsYXRlc3QnID8gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcy5sYXRlc3QoKSA6IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNbdHlwZV07XG4gICAgICAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5lcShyYW5nZUluZGV4KS50cmlnZ2VyKCdjbGljaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSB7XG4gICAgICByYW5nZTogdHlwZSxcbiAgICAgIHZhbHVlOiBgJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCl9IC0gJHtlbmREYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpfWBcbiAgICB9O1xuXG4gICAgLyoqIGRpcmVjdGx5IGFzc2lnbiBzdGFydERhdGUgdGhlbiB1c2Ugc2V0RW5kRGF0ZSBzbyB0aGF0IHRoZSBldmVudHMgd2lsbCBiZSBmaXJlZCBvbmNlICovXG4gICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlID0gc3RhcnREYXRlO1xuICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnNldEVuZERhdGUoZW5kRGF0ZSk7XG5cbiAgICByZXR1cm4gdGhpcy5zcGVjaWFsUmFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgY29sb3JzIGZvciBTZWxlY3QyIGVudHJpZXMgc28gd2UgY2FuIGR5bmFtaWNhbGx5IGNoYW5nZSB0aGVtXG4gICAqIFRoaXMgaXMgYSBuZWNlc3NhcnkgZXZpbCwgYXMgd2UgaGF2ZSB0byBtYXJrIHRoZW0gYXMgIWltcG9ydGFudFxuICAgKiAgIGFuZCBzaW5jZSB0aGVyZSBhcmUgYW55IG51bWJlciBvZiBlbnRpcmVzLCB3ZSBuZWVkIHRvIHVzZSBudGgtY2hpbGQgc2VsZWN0b3JzXG4gICAqIEByZXR1cm5zIHtDU1NTdHlsZXNoZWV0fSBvdXIgbmV3IHN0eWxlc2hlZXRcbiAgICovXG4gIHNldHVwU2VsZWN0MkNvbG9ycygpIHtcbiAgICAvKiogZmlyc3QgZGVsZXRlIG9sZCBzdHlsZXNoZWV0LCBpZiBwcmVzZW50ICovXG4gICAgaWYgKHRoaXMuY29sb3JzU3R5bGVFbCkgdGhpcy5jb2xvcnNTdHlsZUVsLnJlbW92ZSgpO1xuXG4gICAgLyoqIGNyZWF0ZSBuZXcgc3R5bGVzaGVldCAqL1xuICAgIHRoaXMuY29sb3JzU3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7IC8vIFdlYktpdCBoYWNrIDooXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLmNvbG9yc1N0eWxlRWwpO1xuXG4gICAgLyoqIGFkZCBjb2xvciBydWxlcyAqL1xuICAgIHRoaXMuY29uZmlnLmNvbG9ycy5mb3JFYWNoKChjb2xvciwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuY29sb3JzU3R5bGVFbC5zaGVldC5pbnNlcnRSdWxlKGAuc2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZTpudGgtb2YtdHlwZSgke2luZGV4ICsgMX0pIHsgYmFja2dyb3VuZDogJHtjb2xvcn0gIWltcG9ydGFudCB9YCwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jb2xvcnNTdHlsZUVsLnNoZWV0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyb3NzLWFwcGxpY2F0aW9uIGxpc3RlbmVyc1xuICAgKiBFYWNoIGFwcCBoYXMgaXQncyBvd24gc2V0dXBMaXN0ZW5lcnMoKSB0aGF0IHNob3VsZCBjYWxsIHN1cGVyLnNldHVwTGlzdGVuZXJzKClcbiAgICogQHJldHVybiB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgLyoqIHByZXZlbnQgYnJvd3NlcidzIGRlZmF1bHQgYmVoYXZpb3VyIGZvciBhbnkgbGluayB3aXRoIGhyZWY9XCIjXCIgKi9cbiAgICAkKFwiYVtocmVmPScjJ11cIikub24oJ2NsaWNrJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuXG4gICAgLyoqIGRvd25sb2FkIGxpc3RlbmVycyAqL1xuICAgICQoJy5kb3dubG9hZC1jc3YnKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydENTVi5iaW5kKHRoaXMpKTtcbiAgICAkKCcuZG93bmxvYWQtanNvbicpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0SlNPTi5iaW5kKHRoaXMpKTtcblxuICAgIC8qKiBwcm9qZWN0IGlucHV0IGxpc3RlbmVycywgc2F2aW5nIGFuZCByZXN0b3Jpbmcgb2xkIHZhbHVlIGlmIG5ldyBvbmUgaXMgaW52YWxpZCAqL1xuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS5vbignZm9jdXNpbicsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kYXRhc2V0LnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9KTtcbiAgICAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkub24oJ2NoYW5nZScsIGUgPT4gdGhpcy52YWxpZGF0ZVByb2plY3QoZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZXMgb2YgZm9ybSBiYXNlZCBvbiBsb2NhbFN0b3JhZ2Ugb3IgZGVmYXVsdHMsIGFkZCBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldHVwU2V0dGluZ3NNb2RhbCgpIHtcbiAgICAvKiogZmlsbCBpbiB2YWx1ZXMsIGV2ZXJ5dGhpbmcgaXMgZWl0aGVyIGEgY2hlY2tib3ggb3IgcmFkaW8gKi9cbiAgICB0aGlzLmZpbGxJblNldHRpbmdzKCk7XG5cbiAgICAvKiogYWRkIGxpc3RlbmVyICovXG4gICAgJCgnLnNhdmUtc2V0dGluZ3MtYnRuJykub24oJ2NsaWNrJywgdGhpcy5zYXZlU2V0dGluZ3MuYmluZCh0aGlzKSk7XG4gICAgJCgnLmNhbmNlbC1zZXR0aW5ncy1idG4nKS5vbignY2xpY2snLCB0aGlzLmZpbGxJblNldHRpbmdzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldHMgdXAgdGhlIGRhdGVyYW5nZSBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lcnNcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBEYXRlUmFuZ2VTZWxlY3RvcigpIHtcbiAgICBjb25zdCBkYXRlUmFuZ2VTZWxlY3RvciA9ICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpO1xuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMgdG8gaGF2ZSBpMThuIGFzIGtleXNcbiAgICAgKiBUaGlzIGlzIHdoYXQgaXMgc2hvd24gYXMgdGhlIHNwZWNpYWwgcmFuZ2VzIChMYXN0IG1vbnRoLCBldGMuKSBpbiB0aGUgZGF0ZXBpY2tlciBtZW51XG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICBsZXQgcmFuZ2VzID0ge307XG4gICAgT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gJ2xhdGVzdCcpIHJldHVybjsgLy8gdGhpcyBpcyBhIGZ1bmN0aW9uLCBub3QgbWVhbnQgdG8gYmUgaW4gdGhlIGxpc3Qgb2Ygc3BlY2lhbCByYW5nZXNcbiAgICAgIHJhbmdlc1skLmkxOG4oa2V5KV0gPSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzW2tleV07XG4gICAgfSk7XG5cbiAgICBsZXQgZGF0ZXBpY2tlck9wdGlvbnMgPSB7XG4gICAgICBsb2NhbGU6IHtcbiAgICAgICAgZm9ybWF0OiB0aGlzLmRhdGVGb3JtYXQsXG4gICAgICAgIGFwcGx5TGFiZWw6ICQuaTE4bignYXBwbHknKSxcbiAgICAgICAgY2FuY2VsTGFiZWw6ICQuaTE4bignY2FuY2VsJyksXG4gICAgICAgIGN1c3RvbVJhbmdlTGFiZWw6ICQuaTE4bignY3VzdG9tLXJhbmdlJyksXG4gICAgICAgIGRheXNPZldlZWs6IFtcbiAgICAgICAgICAkLmkxOG4oJ3N1JyksXG4gICAgICAgICAgJC5pMThuKCdtbycpLFxuICAgICAgICAgICQuaTE4bigndHUnKSxcbiAgICAgICAgICAkLmkxOG4oJ3dlJyksXG4gICAgICAgICAgJC5pMThuKCd0aCcpLFxuICAgICAgICAgICQuaTE4bignZnInKSxcbiAgICAgICAgICAkLmkxOG4oJ3NhJylcbiAgICAgICAgXSxcbiAgICAgICAgbW9udGhOYW1lczogW1xuICAgICAgICAgICQuaTE4bignamFudWFyeScpLFxuICAgICAgICAgICQuaTE4bignZmVicnVhcnknKSxcbiAgICAgICAgICAkLmkxOG4oJ21hcmNoJyksXG4gICAgICAgICAgJC5pMThuKCdhcHJpbCcpLFxuICAgICAgICAgICQuaTE4bignbWF5JyksXG4gICAgICAgICAgJC5pMThuKCdqdW5lJyksXG4gICAgICAgICAgJC5pMThuKCdqdWx5JyksXG4gICAgICAgICAgJC5pMThuKCdhdWd1c3QnKSxcbiAgICAgICAgICAkLmkxOG4oJ3NlcHRlbWJlcicpLFxuICAgICAgICAgICQuaTE4bignb2N0b2JlcicpLFxuICAgICAgICAgICQuaTE4bignbm92ZW1iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ2RlY2VtYmVyJylcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCkuc3VidHJhY3QodGhpcy5jb25maWcuZGF5c0FnbywgJ2RheXMnKSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuY29uZmlnLm1pbkRhdGUsXG4gICAgICBtYXhEYXRlOiB0aGlzLmNvbmZpZy5tYXhEYXRlLFxuICAgICAgcmFuZ2VzOiByYW5nZXNcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmRhdGVMaW1pdCkgZGF0ZXBpY2tlck9wdGlvbnMuZGF0ZUxpbWl0ID0geyBkYXlzOiB0aGlzLmNvbmZpZy5kYXRlTGltaXQgfTtcblxuICAgIGRhdGVSYW5nZVNlbGVjdG9yLmRhdGVyYW5nZXBpY2tlcihkYXRlcGlja2VyT3B0aW9ucyk7XG5cbiAgICAvKiogc28gcGVvcGxlIGtub3cgd2h5IHRoZXkgY2FuJ3QgcXVlcnkgZGF0YSBvbGRlciB0aGFuIEp1bHkgMjAxNSAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXInKS5hcHBlbmQoXG4gICAgICAkKCc8ZGl2PicpXG4gICAgICAgIC5hZGRDbGFzcygnZGF0ZXJhbmdlLW5vdGljZScpXG4gICAgICAgIC5odG1sKCQuaTE4bignZGF0ZS1ub3RpY2UnLCBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICBcIjxhIGhyZWY9J2h0dHA6Ly9zdGF0cy5ncm9rLnNlJyB0YXJnZXQ9J19ibGFuayc+c3RhdHMuZ3Jvay5zZTwvYT5cIixcbiAgICAgICAgICBgJHskLmkxOG4oJ2p1bHknKX0gMjAxNWBcbiAgICAgICAgKSlcbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNwZWNpYWwgZGF0ZSByYW5nZSBvcHRpb25zIChidXR0b25zIHRoZSByaWdodCBzaWRlIG9mIHRoZSBkYXRlcmFuZ2UgcGlja2VyKVxuICAgICAqXG4gICAgICogV0FSTklORzogd2UncmUgdW5hYmxlIHRvIGFkZCBjbGFzcyBuYW1lcyBvciBkYXRhIGF0dHJzIHRvIHRoZSByYW5nZSBvcHRpb25zLFxuICAgICAqIHNvIGNoZWNraW5nIHdoaWNoIHdhcyBjbGlja2VkIGlzIGhhcmRjb2RlZCBiYXNlZCBvbiB0aGUgaW5kZXggb2YgdGhlIExJLFxuICAgICAqIGFzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1xuICAgICAqL1xuICAgICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5pbmRleChlLnRhcmdldCksXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmNvbnRhaW5lcixcbiAgICAgICAgaW5wdXRzID0gY29udGFpbmVyLmZpbmQoJy5kYXRlcmFuZ2VwaWNrZXJfaW5wdXQgaW5wdXQnKTtcbiAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0ge1xuICAgICAgICByYW5nZTogT2JqZWN0LmtleXModGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcylbaW5kZXhdLFxuICAgICAgICB2YWx1ZTogYCR7aW5wdXRzWzBdLnZhbHVlfSAtICR7aW5wdXRzWzFdLnZhbHVlfWBcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS5vbignYXBwbHkuZGF0ZXJhbmdlcGlja2VyJywgKGUsIGFjdGlvbikgPT4ge1xuICAgICAgaWYgKGFjdGlvbi5jaG9zZW5MYWJlbCA9PT0gJC5pMThuKCdjdXN0b20tcmFuZ2UnKSkge1xuICAgICAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IG51bGw7XG5cbiAgICAgICAgLyoqIGZvcmNlIGV2ZW50cyB0byByZS1maXJlIHNpbmNlIGFwcGx5LmRhdGVyYW5nZXBpY2tlciBvY2N1cnMgYmVmb3JlICdjaGFuZ2UnIGV2ZW50ICovXG4gICAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnVwZGF0ZUVsZW1lbnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNob3dGYXRhbEVycm9ycyhlcnJvcnMpIHtcbiAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICBlcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgYDxzdHJvbmc+JHskLmkxOG4oJ2ZhdGFsLWVycm9yJyl9PC9zdHJvbmc+OiA8Y29kZT4ke2Vycm9yfTwvY29kZT5gLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICB9IGVsc2UgaWYgKGVycm9ycyAmJiBlcnJvcnNbMF0gJiYgZXJyb3JzWzBdLnN0YWNrKSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnLy90b29scy53bWZsYWJzLm9yZy9tdXNpa2FuaW1hbC9wYXN0ZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb250ZW50OiAnJyArXG4gICAgICAgICAgICBgXFxuZGF0ZTogICAgICAke21vbWVudCgpLnV0YygpLmZvcm1hdCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRvb2w6ICAgICAgJHt0aGlzLmFwcH1gICtcbiAgICAgICAgICAgIGBcXG5sYW5ndWFnZTogICR7aTE4bkxhbmd9YCArXG4gICAgICAgICAgICBgXFxuY2hhcnQ6ICAgICAke3RoaXMuY2hhcnRUeXBlfWAgK1xuICAgICAgICAgICAgYFxcbnVybDogICAgICAgJHtkb2N1bWVudC5sb2NhdGlvbi5ocmVmfWAgK1xuICAgICAgICAgICAgYFxcbnVzZXJBZ2VudDogJHt0aGlzLmdldFVzZXJBZ2VudCgpfWAgK1xuICAgICAgICAgICAgYFxcbnRyYWNlOiAgICAgJHtlcnJvcnNbMF0uc3RhY2t9YFxuICAgICAgICAgICxcbiAgICAgICAgICB0aXRsZTogYFBhZ2V2aWV3cyBBbmFseXNpcyBlcnJvciByZXBvcnQ6ICR7ZXJyb3JzWzBdfWBcbiAgICAgICAgfVxuICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgJiYgZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoZGF0YS5yZXN1bHQub2JqZWN0TmFtZSkpLFxuICAgICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKSxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSksXG4gICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwbGFzaCBpbiBjb25zb2xlLCBqdXN0IGZvciBmdW5cbiAgICogQHJldHVybnMge1N0cmluZ30gb3V0cHV0XG4gICAqL1xuICBzcGxhc2goKSB7XG4gICAgY29uc3Qgc3R5bGUgPSAnYmFja2dyb3VuZDogI2VlZTsgY29sb3I6ICM1NTU7IHBhZGRpbmc6IDRweDsgZm9udC1mYW1pbHk6bW9ub3NwYWNlJztcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBfX18gICAgICAgICAgICBfXyBfICAgICAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgfCBfIFxcXFwgIF9fIF8gICAgLyBfYCB8ICAgX19fICAgIF9fIF9fICAgIChfKSAgICAgX19fICAgX18gX18gX18gIF9fXyAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICB8ICBfLyAvIF9gIHwgICBcXFxcX18sIHwgIC8gLV8pICAgXFxcXCBWIC8gICAgfCB8ICAgIC8gLV8pICBcXFxcIFYgIFYgLyAoXy08ICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgX3xffF8gIFxcXFxfXyxffCAgIHxfX18vICAgXFxcXF9fX3wgICBfXFxcXF8vXyAgIF98X3xfICAgXFxcXF9fX3wgICBcXFxcXy9cXFxcXy8gIC9fXy9fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgX3wgXCJcIlwiIHxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgICAgICAgICBfX18gICAgICAgICAgICAgICAgICAgICBfICBfICAgICBfICAgICAgICAgICAgICAgXyAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICBvIE8gTyAgLyAgIFxcXFwgICBfIF8gICAgIF9fIF8gICAgfCB8fCB8ICAgfCB8ICAgICBfX18gICAgIChfKSAgICAgX19fICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgbyAgICAgICB8IC0gfCAgfCBcXCcgXFxcXCAgIC8gX2AgfCAgICBcXFxcXywgfCAgIHwgfCAgICAoXy08ICAgICB8IHwgICAgKF8tPCAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgVFNfX1tPXSAgfF98X3wgIHxffHxffCAgXFxcXF9fLF98ICAgX3xfXy8gICBffF98XyAgIC9fXy9fICAgX3xffF8gICAvX18vXyAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgIHs9PT09PT18X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3wgXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifCAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAuL28tLTAwMFxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCcgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coYCVjICBDb3B5cmlnaHQgwqkgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IE11c2lrQW5pbWFsLCBLYWxkYXJpLCBNYXJjZWwgUnVpeiBGb3JucyAgICAgICAgICAgICAgICAgIGAsIHN0eWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBzZXQgdGhlIHNhZmVndWFyZCB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzdGFydFNwaW5ueSgpIHtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZXJyID0+IHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KCk7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShgPHN0cm9uZz4keyQuaTE4bignZmF0YWwtZXJyb3InKX08L3N0cm9uZz46XG4gICAgICAgICR7JC5pMThuKCdlcnJvci10aW1lZC1vdXQnKX1cbiAgICAgICAgJHskLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKX1cbiAgICAgIGAsICdlcnJvcicsIDApO1xuICAgIH0sIDIwICogMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGxvYWRpbmcgaW5kaWNhdG9yIGNsYXNzIGFuZCBjbGVhciB0aGUgc2FmZWd1YXJkIHRpbWVvdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHN0b3BTcGlubnkoKSB7XG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBzcGFjZXMgd2l0aCB1bmRlcnNjb3Jlc1xuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge2FycmF5fSBwYWdlIG5hbWVzIHdpdGggdW5kZXJzY29yZXNcbiAgICovXG4gIHVuZGVyc2NvcmVQYWdlTmFtZXMocGFnZXMpIHtcbiAgICByZXR1cm4gcGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWdlKS5zY29yZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBocmVmcyBvZiBpbnRlci1hcHAgbGlua3MgdG8gbG9hZCBjdXJyZW50bHkgc2VsZWN0ZWQgcHJvamVjdFxuICAgKiBAcmV0dXJuIHtudWxsfSBudXR0aW4nXG4gICAqL1xuICB1cGRhdGVJbnRlckFwcExpbmtzKCkge1xuICAgICQoJy5pbnRlcmFwcC1saW5rJykuZWFjaCgoaSwgbGluaykgPT4ge1xuICAgICAgbGV0IHVybCA9IGxpbmsuaHJlZi5zcGxpdCgnPycpWzBdO1xuXG4gICAgICBpZiAobGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2ludGVyYXBwLWxpbmstLXNpdGV2aWV3cycpKSB7XG4gICAgICAgIGxpbmsuaHJlZiA9IGAke3VybH0/c2l0ZXM9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rLmhyZWYgPSBgJHt1cmx9P3Byb2plY3Q9JHt0aGlzLnByb2plY3QuZXNjYXBlKCl9Lm9yZ2A7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgYmFzaWMgcGFyYW1zIGFnYWluc3Qgd2hhdCBpcyBkZWZpbmVkIGluIHRoZSBjb25maWcsXG4gICAqICAgYW5kIGlmIHRoZXkgYXJlIGludmFsaWQgc2V0IHRoZSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBwYXJhbXMgYXMgZmV0Y2hlZCBieSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzYW1lIHBhcmFtcyB3aXRoIHNvbWUgaW52YWxpZCBwYXJhbWV0ZXJzIGNvcnJldGVkLCBhcyBuZWNlc3NhcnlcbiAgICovXG4gIHZhbGlkYXRlUGFyYW1zKHBhcmFtcykge1xuICAgIHRoaXMuY29uZmlnLnZhbGlkYXRlUGFyYW1zLmZvckVhY2gocGFyYW1LZXkgPT4ge1xuICAgICAgaWYgKHBhcmFtS2V5ID09PSAncHJvamVjdCcgJiYgcGFyYW1zLnByb2plY3QpIHtcbiAgICAgICAgcGFyYW1zLnByb2plY3QgPSBwYXJhbXMucHJvamVjdC5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmNvbmZpZy5kZWZhdWx0c1twYXJhbUtleV0sXG4gICAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbXNbcGFyYW1LZXldO1xuXG4gICAgICBpZiAoZGVmYXVsdFZhbHVlICYmICF0aGlzLmNvbmZpZy52YWxpZFBhcmFtc1twYXJhbUtleV0uaW5jbHVkZXMocGFyYW1WYWx1ZSkpIHtcbiAgICAgICAgLy8gb25seSB0aHJvdyBlcnJvciBpZiB0aGV5IHRyaWVkIHRvIHByb3ZpZGUgYW4gaW52YWxpZCB2YWx1ZVxuICAgICAgICBpZiAoISFwYXJhbVZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UocGFyYW1LZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zW3BhcmFtS2V5XSA9IGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBsaXN0ZW5lcnMgdG8gdGhlIHByb2plY3QgaW5wdXQgZm9yIHZhbGlkYXRpb25zIGFnYWluc3QgdGhlIHNpdGUgbWFwLFxuICAgKiAgIHJldmVydGluZyB0byB0aGUgb2xkIHZhbHVlIGlmIHRoZSBuZXcgb25lIGlzIGludmFsaWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbbXVsdGlsaW5ndWFsXSAtIHdoZXRoZXIgd2Ugc2hvdWxkIGNoZWNrIGlmIGl0IGlzIGEgbXVsdGlsaW5ndWFsIHByb2plY3RcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IHZhbGlkYXRpb25zIHBhc3NlZFxuICAgKi9cbiAgdmFsaWRhdGVQcm9qZWN0KG11bHRpbGluZ3VhbCA9IGZhbHNlKSB7XG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpWzBdO1xuICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdElucHV0LnZhbHVlLnJlcGxhY2UoL153d3dcXC4vLCAnJyksXG4gICAgICB2YWxpZCA9IGZhbHNlO1xuXG4gICAgaWYgKG11bHRpbGluZ3VhbCAmJiAhdGhpcy5pc011bHRpbGFuZ1Byb2plY3QoKSkge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1sYW5nLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgICAnd2FybmluZydcbiAgICAgICk7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdElucHV0LmRhdGFzZXQudmFsdWU7XG4gICAgfSBlbHNlIGlmIChzaXRlRG9tYWlucy5pbmNsdWRlcyhwcm9qZWN0KSkge1xuICAgICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgICB0aGlzLnVwZGF0ZUludGVyQXBwTGlua3MoKTtcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICQuaTE4bignaW52YWxpZC1wcm9qZWN0JywgYDxhIGhyZWY9Jy8vJHtwcm9qZWN0LmVzY2FwZSgpfSc+JHtwcm9qZWN0LmVzY2FwZSgpfTwvYT5gKSxcbiAgICAgICAgJ3dhcm5pbmcnXG4gICAgICApO1xuICAgICAgcHJvamVjdCA9IHByb2plY3RJbnB1dC5kYXRhc2V0LnZhbHVlO1xuICAgIH1cblxuICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IHByb2plY3Q7XG5cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxuICAvLyBGSVhNRTogcmVzdG9yZSB3cml0ZU1lc3NhZ2UgdG8gdGhlIHdheSBpdCB1c2VkIHRvIGJlLFxuICAvLyBhbmQgbWFrZSBhZGRTaXRlTm90aWNlIGRvIHRoZSB0b2FzdHIsIGFuZCBjaGFuZ2UgaW5zdGFuY2VzIG9mIHRoaXMud3JpdGVNZXNzYWdlXG4gIC8vIGFjY29yZGluZ2x5XG4gIC8qKlxuICAgKiBXcml0ZXMgbWVzc2FnZSBqdXN0IGJlbG93IHRoZSBjaGFydFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gd3JpdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXQgLSBudW0gc2Vjb25kcyB0byBzaG93XG4gICAqIEByZXR1cm5zIHtqUXVlcnl9IC0galF1ZXJ5IG9iamVjdCBvZiBtZXNzYWdlIGNvbnRhaW5lclxuICAgKi9cbiAgd3JpdGVNZXNzYWdlKG1lc3NhZ2UsIGxldmVsID0gJ3dhcm5pbmcnLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIHRvYXN0ci5vcHRpb25zLnRpbWVPdXQgPSB0aW1lb3V0O1xuICAgIHRvYXN0cltsZXZlbF0obWVzc2FnZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdjtcbiIsIi8qKlxuICogQGZpbGUgU2hhcmVkIGNvbmZpZyBhbW9uZ3N0IGFsbCBhcHBzXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbmNvbnN0IHNpdGVNYXAgPSByZXF1aXJlKCcuL3NpdGVfbWFwJyk7XG5jb25zdCBzaXRlRG9tYWlucyA9IE9iamVjdC5rZXlzKHNpdGVNYXApLm1hcChrZXkgPT4gc2l0ZU1hcFtrZXldKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBhbGwgUGFnZXZpZXdzIGFwcGxpY2F0aW9ucy5cbiAqIFNvbWUgcHJvcGVydGllcyBtYXkgYmUgb3ZlcnJpZGVuIGJ5IGFwcC1zcGVjaWZpYyBjb25maWdzXG4gKi9cbmNsYXNzIFB2Q29uZmlnIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGZvcm1hdFhBeGlzVGljayA9IHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IGRheU9mV2VlayA9IG1vbWVudCh2YWx1ZSwgdGhpcy5kYXRlRm9ybWF0KS53ZWVrZGF5KCk7XG4gICAgICBpZiAoZGF5T2ZXZWVrICUgNykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYOKAoiAke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgYXBpTGltaXQ6IDUwMDAsXG4gICAgICBhcGlUaHJvdHRsZTogMjAsXG4gICAgICBhcHBzOiBbJ3BhZ2V2aWV3cycsICd0b3B2aWV3cycsICdsYW5ndmlld3MnLCAnc2l0ZXZpZXdzJywgJ21hc3N2aWV3cycsICdyZWRpcmVjdHZpZXdzJ10sXG4gICAgICBjaGFydENvbmZpZzoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXRZQXhpc051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwKScsXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Q29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Qm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4yKSxcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlclJhZGl1czogNSxcbiAgICAgICAgICAgICAgdGVuc2lvbjogc2VsZi5iZXppZXJDdXJ2ZSA9PT0gJ3RydWUnID8gMC40IDogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0WUF4aXNOdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgYmFyUGVyY2VudGFnZTogMS4wLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5UGVyY2VudGFnZTogMC44NSxcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFhBeGlzVGljayh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNiksXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOSksXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjc1KSxcbiAgICAgICAgICAgICAgaG92ZXJCb3JkZXJDb2xvcjogY29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByYWRhcjoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC4xKSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOCksXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyUmFkaXVzOiA1XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGllOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkb3VnaG51dDoge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvbGFyQXJlYToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgYmVnaW5BdFplcm86IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC43KSxcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC45KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaXJjdWxhckNoYXJ0czogWydwaWUnLCAnZG91Z2hudXQnLCAncG9sYXJBcmVhJ10sXG4gICAgICBjb2xvcnM6IFsncmdiYSgxNzEsIDIxMiwgMjM1LCAxKScsICdyZ2JhKDE3OCwgMjIzLCAxMzgsIDEpJywgJ3JnYmEoMjUxLCAxNTQsIDE1MywgMSknLCAncmdiYSgyNTMsIDE5MSwgMTExLCAxKScsICdyZ2JhKDIwMiwgMTc4LCAyMTQsIDEpJywgJ3JnYmEoMjA3LCAxODIsIDEyOCwgMSknLCAncmdiYSgxNDEsIDIxMSwgMTk5LCAxKScsICdyZ2JhKDI1MiwgMjA1LCAyMjksIDEpJywgJ3JnYmEoMjU1LCAyNDcsIDE2MSwgMSknLCAncmdiYSgyMTcsIDIxNywgMjE3LCAxKSddLFxuICAgICAgZGVmYXVsdHM6IHtcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAgICAgY2hhcnRUeXBlOiBudW1EYXRhc2V0cyA9PiBudW1EYXRhc2V0cyA+IDEgPyAnbGluZScgOiAnYmFyJyxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ1lZWVktTU0tREQnLFxuICAgICAgICBsb2NhbGl6ZURhdGVGb3JtYXQ6ICd0cnVlJyxcbiAgICAgICAgbnVtZXJpY2FsRm9ybWF0dGluZzogJ3RydWUnLFxuICAgICAgICBiZXppZXJDdXJ2ZTogJ2ZhbHNlJyxcbiAgICAgICAgYXV0b0xvZ0RldGVjdGlvbjogJ3RydWUnLFxuICAgICAgICBiZWdpbkF0WmVybzogJ2ZhbHNlJyxcbiAgICAgICAgcmVtZW1iZXJDaGFydDogJ3RydWUnLFxuICAgICAgICBhZ2VudDogJ3VzZXInLFxuICAgICAgICBwbGF0Zm9ybTogJ2FsbC1hY2Nlc3MnLFxuICAgICAgICBwcm9qZWN0OiAnZW4ud2lraXBlZGlhLm9yZydcbiAgICAgIH0sXG4gICAgICBnbG9iYWxDaGFydE9wdHM6IHtcbiAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFydCdcbiAgICAgICAgfSxcbiAgICAgICAgaG92ZXI6IHtcbiAgICAgICAgICBhbmltYXRpb25EdXJhdGlvbjogMFxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluZWFyQ2hhcnRzOiBbJ2xpbmUnLCAnYmFyJywgJ3JhZGFyJ10sXG4gICAgICBsaW5lYXJPcHRzOiB7XG4gICAgICAgIHNjYWxlczoge1xuICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChjaGFydC5kYXRhLmRhdGFzZXRzLCBzZWxmKVxuICAgICAgfSxcbiAgICAgIGRheXNBZ286IDIwLFxuICAgICAgbWluRGF0ZTogbW9tZW50KCcyMDE1LTA3LTAxJykuc3RhcnRPZignZGF5JyksXG4gICAgICBtYXhEYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgc3BlY2lhbFJhbmdlczoge1xuICAgICAgICAnbGFzdC13ZWVrJzogW21vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrJykuc3RhcnRPZignd2VlaycpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2VlaycpLmVuZE9mKCd3ZWVrJyldLFxuICAgICAgICAndGhpcy1tb250aCc6IFttb21lbnQoKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpXSxcbiAgICAgICAgJ2xhc3QtbW9udGgnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuZW5kT2YoJ21vbnRoJyldLFxuICAgICAgICBsYXRlc3Qob2Zmc2V0ID0gc2VsZi5jb25maWcuZGF5c0Fnbykge1xuICAgICAgICAgIHJldHVybiBbbW9tZW50KCkuc3VidHJhY3Qob2Zmc2V0LCAnZGF5cycpLnN0YXJ0T2YoJ2RheScpLCBzZWxmLmNvbmZpZy5tYXhEYXRlXTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRpbWVzdGFtcEZvcm1hdDogJ1lZWVlNTUREMDAnLFxuICAgICAgdmFsaWRQYXJhbXM6IHtcbiAgICAgICAgYWdlbnQ6IFsnYWxsLWFnZW50cycsICd1c2VyJywgJ3NwaWRlcicsICdib3QnXSxcbiAgICAgICAgcGxhdGZvcm06IFsnYWxsLWFjY2VzcycsICdkZXNrdG9wJywgJ21vYmlsZS1hcHAnLCAnbW9iaWxlLXdlYiddLFxuICAgICAgICBwcm9qZWN0OiBzaXRlRG9tYWluc1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgbGluZWFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGU6ICdsYWJlbCcsXG4gICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgbGFiZWw6IHRvb2x0aXBJdGVtID0+IHtcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRvb2x0aXBJdGVtLnlMYWJlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnICcgKyAkLmkxOG4oJ3Vua25vd24nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcgJyArIHRoaXMuZm9ybWF0TnVtYmVyKHRvb2x0aXBJdGVtLnlMYWJlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGNpcmN1bGFyVG9vbHRpcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbDogKHRvb2x0aXBJdGVtLCBjaGFydEluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjaGFydEluc3RhbmNlLmRhdGFzZXRzW3Rvb2x0aXBJdGVtLmRhdGFzZXRJbmRleF0uZGF0YVt0b29sdGlwSXRlbS5pbmRleF0sXG4gICAgICAgICAgICBsYWJlbCA9IGNoYXJ0SW5zdGFuY2UubGFiZWxzW3Rvb2x0aXBJdGVtLmluZGV4XTtcblxuICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7bGFiZWx9OiAkeyQuaTE4bigndW5rbm93bicpfWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtsYWJlbH06ICR7dGhpcy5mb3JtYXROdW1iZXIodmFsdWUpfWA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYm9keUZvbnRTaXplOiAxNCxcbiAgICAgIGJvZHlTcGFjaW5nOiA3LFxuICAgICAgY2FyZXRTaXplOiAwLFxuICAgICAgdGl0bGVGb250U2l6ZTogMTRcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHZDb25maWc7XG4iLCIvKipcbiAqIEBmaWxlIFdNRiBbc2l0ZSBtYXRyaXhdKGh0dHBzOi8vd3d3Lm1lZGlhd2lraS5vcmcvdy9hcGkucGhwP2FjdGlvbj1zaXRlbWF0cml4KSwgd2l0aCBzb21lIHVuc3VwcG9ydGVkIHdpa2lzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqIFNpdGVtYXRyaXggb2YgYWxsIHN1cHBvcnRlZCBXTUYgd2lraXNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IHNpdGVNYXAgPSB7XG4gICdhYXdpa2knOiAnYWEud2lraXBlZGlhLm9yZycsXG4gICdhYXdpa3Rpb25hcnknOiAnYWEud2lrdGlvbmFyeS5vcmcnLFxuICAnYWF3aWtpYm9va3MnOiAnYWEud2lraWJvb2tzLm9yZycsXG4gICdhYndpa2knOiAnYWIud2lraXBlZGlhLm9yZycsXG4gICdhYndpa3Rpb25hcnknOiAnYWIud2lrdGlvbmFyeS5vcmcnLFxuICAnYWNld2lraSc6ICdhY2Uud2lraXBlZGlhLm9yZycsXG4gICdhZHl3aWtpJzogJ2FkeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lraSc6ICdhZi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fmd2lrdGlvbmFyeSc6ICdhZi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhZndpa2lib29rcyc6ICdhZi53aWtpYm9va3Mub3JnJyxcbiAgJ2Fmd2lraXF1b3RlJzogJ2FmLndpa2lxdW90ZS5vcmcnLFxuICAnYWt3aWtpJzogJ2FrLndpa2lwZWRpYS5vcmcnLFxuICAnYWt3aWt0aW9uYXJ5JzogJ2FrLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Frd2lraWJvb2tzJzogJ2FrLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraSc6ICdhbHMud2lraXBlZGlhLm9yZycsXG4gICdhbHN3aWt0aW9uYXJ5JzogJ2Fscy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbHN3aWtpYm9va3MnOiAnYWxzLndpa2lib29rcy5vcmcnLFxuICAnYWxzd2lraXF1b3RlJzogJ2Fscy53aWtpcXVvdGUub3JnJyxcbiAgJ2Ftd2lraSc6ICdhbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Ftd2lrdGlvbmFyeSc6ICdhbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbXdpa2lxdW90ZSc6ICdhbS53aWtpcXVvdGUub3JnJyxcbiAgJ2Fud2lraSc6ICdhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fud2lrdGlvbmFyeSc6ICdhbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbmd3aWtpJzogJ2FuZy53aWtpcGVkaWEub3JnJyxcbiAgJ2FuZ3dpa3Rpb25hcnknOiAnYW5nLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FuZ3dpa2lib29rcyc6ICdhbmcud2lraWJvb2tzLm9yZycsXG4gICdhbmd3aWtpcXVvdGUnOiAnYW5nLndpa2lxdW90ZS5vcmcnLFxuICAnYW5nd2lraXNvdXJjZSc6ICdhbmcud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpJzogJ2FyLndpa2lwZWRpYS5vcmcnLFxuICAnYXJ3aWt0aW9uYXJ5JzogJ2FyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fyd2lraWJvb2tzJzogJ2FyLndpa2lib29rcy5vcmcnLFxuICAnYXJ3aWtpbmV3cyc6ICdhci53aWtpbmV3cy5vcmcnLFxuICAnYXJ3aWtpcXVvdGUnOiAnYXIud2lraXF1b3RlLm9yZycsXG4gICdhcndpa2lzb3VyY2UnOiAnYXIud2lraXNvdXJjZS5vcmcnLFxuICAnYXJ3aWtpdmVyc2l0eSc6ICdhci53aWtpdmVyc2l0eS5vcmcnLFxuICAnYXJjd2lraSc6ICdhcmMud2lraXBlZGlhLm9yZycsXG4gICdhcnp3aWtpJzogJ2Fyei53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lraSc6ICdhcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fzd2lrdGlvbmFyeSc6ICdhcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhc3dpa2lib29rcyc6ICdhcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Fzd2lraXNvdXJjZSc6ICdhcy53aWtpc291cmNlLm9yZycsXG4gICdhc3R3aWtpJzogJ2FzdC53aWtpcGVkaWEub3JnJyxcbiAgJ2FzdHdpa3Rpb25hcnknOiAnYXN0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2FzdHdpa2lib29rcyc6ICdhc3Qud2lraWJvb2tzLm9yZycsXG4gICdhc3R3aWtpcXVvdGUnOiAnYXN0Lndpa2lxdW90ZS5vcmcnLFxuICAnYXZ3aWtpJzogJ2F2Lndpa2lwZWRpYS5vcmcnLFxuICAnYXZ3aWt0aW9uYXJ5JzogJ2F2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F5d2lraSc6ICdheS53aWtpcGVkaWEub3JnJyxcbiAgJ2F5d2lrdGlvbmFyeSc6ICdheS53aWt0aW9uYXJ5Lm9yZycsXG4gICdheXdpa2lib29rcyc6ICdheS53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraSc6ICdhei53aWtpcGVkaWEub3JnJyxcbiAgJ2F6d2lrdGlvbmFyeSc6ICdhei53aWt0aW9uYXJ5Lm9yZycsXG4gICdhendpa2lib29rcyc6ICdhei53aWtpYm9va3Mub3JnJyxcbiAgJ2F6d2lraXF1b3RlJzogJ2F6Lndpa2lxdW90ZS5vcmcnLFxuICAnYXp3aWtpc291cmNlJzogJ2F6Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2F6Yndpa2knOiAnYXpiLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpJzogJ2JhLndpa2lwZWRpYS5vcmcnLFxuICAnYmF3aWtpYm9va3MnOiAnYmEud2lraWJvb2tzLm9yZycsXG4gICdiYXJ3aWtpJzogJ2Jhci53aWtpcGVkaWEub3JnJyxcbiAgJ2JhdF9zbWd3aWtpJzogJ2JhdC1zbWcud2lraXBlZGlhLm9yZycsXG4gICdiY2x3aWtpJzogJ2JjbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lraSc6ICdiZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jld2lrdGlvbmFyeSc6ICdiZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdiZXdpa2lib29rcyc6ICdiZS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jld2lraXF1b3RlJzogJ2JlLndpa2lxdW90ZS5vcmcnLFxuICAnYmV3aWtpc291cmNlJzogJ2JlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2JlX3hfb2xkd2lraSc6ICdiZS10YXJhc2sud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa2knOiAnYmcud2lraXBlZGlhLm9yZycsXG4gICdiZ3dpa3Rpb25hcnknOiAnYmcud2lrdGlvbmFyeS5vcmcnLFxuICAnYmd3aWtpYm9va3MnOiAnYmcud2lraWJvb2tzLm9yZycsXG4gICdiZ3dpa2luZXdzJzogJ2JnLndpa2luZXdzLm9yZycsXG4gICdiZ3dpa2lxdW90ZSc6ICdiZy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jnd2lraXNvdXJjZSc6ICdiZy53aWtpc291cmNlLm9yZycsXG4gICdiaHdpa2knOiAnYmgud2lraXBlZGlhLm9yZycsXG4gICdiaHdpa3Rpb25hcnknOiAnYmgud2lrdGlvbmFyeS5vcmcnLFxuICAnYml3aWtpJzogJ2JpLndpa2lwZWRpYS5vcmcnLFxuICAnYml3aWt0aW9uYXJ5JzogJ2JpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jpd2lraWJvb2tzJzogJ2JpLndpa2lib29rcy5vcmcnLFxuICAnYmpud2lraSc6ICdiam4ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa2knOiAnYm0ud2lraXBlZGlhLm9yZycsXG4gICdibXdpa3Rpb25hcnknOiAnYm0ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm13aWtpYm9va3MnOiAnYm0ud2lraWJvb2tzLm9yZycsXG4gICdibXdpa2lxdW90ZSc6ICdibS53aWtpcXVvdGUub3JnJyxcbiAgJ2Jud2lraSc6ICdibi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jud2lrdGlvbmFyeSc6ICdibi53aWt0aW9uYXJ5Lm9yZycsXG4gICdibndpa2lib29rcyc6ICdibi53aWtpYm9va3Mub3JnJyxcbiAgJ2Jud2lraXNvdXJjZSc6ICdibi53aWtpc291cmNlLm9yZycsXG4gICdib3dpa2knOiAnYm8ud2lraXBlZGlhLm9yZycsXG4gICdib3dpa3Rpb25hcnknOiAnYm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm93aWtpYm9va3MnOiAnYm8ud2lraWJvb2tzLm9yZycsXG4gICdicHl3aWtpJzogJ2JweS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lraSc6ICdici53aWtpcGVkaWEub3JnJyxcbiAgJ2Jyd2lrdGlvbmFyeSc6ICdici53aWt0aW9uYXJ5Lm9yZycsXG4gICdicndpa2lxdW90ZSc6ICdici53aWtpcXVvdGUub3JnJyxcbiAgJ2Jyd2lraXNvdXJjZSc6ICdici53aWtpc291cmNlLm9yZycsXG4gICdic3dpa2knOiAnYnMud2lraXBlZGlhLm9yZycsXG4gICdic3dpa3Rpb25hcnknOiAnYnMud2lrdGlvbmFyeS5vcmcnLFxuICAnYnN3aWtpYm9va3MnOiAnYnMud2lraWJvb2tzLm9yZycsXG4gICdic3dpa2luZXdzJzogJ2JzLndpa2luZXdzLm9yZycsXG4gICdic3dpa2lxdW90ZSc6ICdicy53aWtpcXVvdGUub3JnJyxcbiAgJ2Jzd2lraXNvdXJjZSc6ICdicy53aWtpc291cmNlLm9yZycsXG4gICdidWd3aWtpJzogJ2J1Zy53aWtpcGVkaWEub3JnJyxcbiAgJ2J4cndpa2knOiAnYnhyLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWtpJzogJ2NhLndpa2lwZWRpYS5vcmcnLFxuICAnY2F3aWt0aW9uYXJ5JzogJ2NhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nhd2lraWJvb2tzJzogJ2NhLndpa2lib29rcy5vcmcnLFxuICAnY2F3aWtpbmV3cyc6ICdjYS53aWtpbmV3cy5vcmcnLFxuICAnY2F3aWtpcXVvdGUnOiAnY2Eud2lraXF1b3RlLm9yZycsXG4gICdjYXdpa2lzb3VyY2UnOiAnY2Eud2lraXNvdXJjZS5vcmcnLFxuICAnY2JrX3phbXdpa2knOiAnY2JrLXphbS53aWtpcGVkaWEub3JnJyxcbiAgJ2Nkb3dpa2knOiAnY2RvLndpa2lwZWRpYS5vcmcnLFxuICAnY2V3aWtpJzogJ2NlLndpa2lwZWRpYS5vcmcnLFxuICAnY2Vid2lraSc6ICdjZWIud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa2knOiAnY2gud2lraXBlZGlhLm9yZycsXG4gICdjaHdpa3Rpb25hcnknOiAnY2gud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h3aWtpYm9va3MnOiAnY2gud2lraWJvb2tzLm9yZycsXG4gICdjaG93aWtpJzogJ2Noby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nocndpa2knOiAnY2hyLndpa2lwZWRpYS5vcmcnLFxuICAnY2hyd2lrdGlvbmFyeSc6ICdjaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnY2h5d2lraSc6ICdjaHkud2lraXBlZGlhLm9yZycsXG4gICdja2J3aWtpJzogJ2NrYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lraSc6ICdjby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nvd2lrdGlvbmFyeSc6ICdjby53aWt0aW9uYXJ5Lm9yZycsXG4gICdjb3dpa2lib29rcyc6ICdjby53aWtpYm9va3Mub3JnJyxcbiAgJ2Nvd2lraXF1b3RlJzogJ2NvLndpa2lxdW90ZS5vcmcnLFxuICAnY3J3aWtpJzogJ2NyLndpa2lwZWRpYS5vcmcnLFxuICAnY3J3aWt0aW9uYXJ5JzogJ2NyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nyd2lraXF1b3RlJzogJ2NyLndpa2lxdW90ZS5vcmcnLFxuICAnY3Jod2lraSc6ICdjcmgud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa2knOiAnY3Mud2lraXBlZGlhLm9yZycsXG4gICdjc3dpa3Rpb25hcnknOiAnY3Mud2lrdGlvbmFyeS5vcmcnLFxuICAnY3N3aWtpYm9va3MnOiAnY3Mud2lraWJvb2tzLm9yZycsXG4gICdjc3dpa2luZXdzJzogJ2NzLndpa2luZXdzLm9yZycsXG4gICdjc3dpa2lxdW90ZSc6ICdjcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Nzd2lraXNvdXJjZSc6ICdjcy53aWtpc291cmNlLm9yZycsXG4gICdjc3dpa2l2ZXJzaXR5JzogJ2NzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdjc2J3aWtpJzogJ2NzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2NzYndpa3Rpb25hcnknOiAnY3NiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2N1d2lraSc6ICdjdS53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraSc6ICdjdi53aWtpcGVkaWEub3JnJyxcbiAgJ2N2d2lraWJvb2tzJzogJ2N2Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpJzogJ2N5Lndpa2lwZWRpYS5vcmcnLFxuICAnY3l3aWt0aW9uYXJ5JzogJ2N5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2N5d2lraWJvb2tzJzogJ2N5Lndpa2lib29rcy5vcmcnLFxuICAnY3l3aWtpcXVvdGUnOiAnY3kud2lraXF1b3RlLm9yZycsXG4gICdjeXdpa2lzb3VyY2UnOiAnY3kud2lraXNvdXJjZS5vcmcnLFxuICAnZGF3aWtpJzogJ2RhLndpa2lwZWRpYS5vcmcnLFxuICAnZGF3aWt0aW9uYXJ5JzogJ2RhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rhd2lraWJvb2tzJzogJ2RhLndpa2lib29rcy5vcmcnLFxuICAnZGF3aWtpcXVvdGUnOiAnZGEud2lraXF1b3RlLm9yZycsXG4gICdkYXdpa2lzb3VyY2UnOiAnZGEud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpJzogJ2RlLndpa2lwZWRpYS5vcmcnLFxuICAnZGV3aWt0aW9uYXJ5JzogJ2RlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Rld2lraWJvb2tzJzogJ2RlLndpa2lib29rcy5vcmcnLFxuICAnZGV3aWtpbmV3cyc6ICdkZS53aWtpbmV3cy5vcmcnLFxuICAnZGV3aWtpcXVvdGUnOiAnZGUud2lraXF1b3RlLm9yZycsXG4gICdkZXdpa2lzb3VyY2UnOiAnZGUud2lraXNvdXJjZS5vcmcnLFxuICAnZGV3aWtpdmVyc2l0eSc6ICdkZS53aWtpdmVyc2l0eS5vcmcnLFxuICAnZGV3aWtpdm95YWdlJzogJ2RlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2RpcXdpa2knOiAnZGlxLndpa2lwZWRpYS5vcmcnLFxuICAnZHNid2lraSc6ICdkc2Iud2lraXBlZGlhLm9yZycsXG4gICdkdndpa2knOiAnZHYud2lraXBlZGlhLm9yZycsXG4gICdkdndpa3Rpb25hcnknOiAnZHYud2lrdGlvbmFyeS5vcmcnLFxuICAnZHp3aWtpJzogJ2R6Lndpa2lwZWRpYS5vcmcnLFxuICAnZHp3aWt0aW9uYXJ5JzogJ2R6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vld2lraSc6ICdlZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lraSc6ICdlbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vsd2lrdGlvbmFyeSc6ICdlbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbHdpa2lib29rcyc6ICdlbC53aWtpYm9va3Mub3JnJyxcbiAgJ2Vsd2lraW5ld3MnOiAnZWwud2lraW5ld3Mub3JnJyxcbiAgJ2Vsd2lraXF1b3RlJzogJ2VsLndpa2lxdW90ZS5vcmcnLFxuICAnZWx3aWtpc291cmNlJzogJ2VsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vsd2lraXZlcnNpdHknOiAnZWwud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vsd2lraXZveWFnZSc6ICdlbC53aWtpdm95YWdlLm9yZycsXG4gICdlbWx3aWtpJzogJ2VtbC53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lraSc6ICdlbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Vud2lrdGlvbmFyeSc6ICdlbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdlbndpa2lib29rcyc6ICdlbi53aWtpYm9va3Mub3JnJyxcbiAgJ2Vud2lraW5ld3MnOiAnZW4ud2lraW5ld3Mub3JnJyxcbiAgJ2Vud2lraXF1b3RlJzogJ2VuLndpa2lxdW90ZS5vcmcnLFxuICAnZW53aWtpc291cmNlJzogJ2VuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vud2lraXZlcnNpdHknOiAnZW4ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vud2lraXZveWFnZSc6ICdlbi53aWtpdm95YWdlLm9yZycsXG4gICdlb3dpa2knOiAnZW8ud2lraXBlZGlhLm9yZycsXG4gICdlb3dpa3Rpb25hcnknOiAnZW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnZW93aWtpYm9va3MnOiAnZW8ud2lraWJvb2tzLm9yZycsXG4gICdlb3dpa2luZXdzJzogJ2VvLndpa2luZXdzLm9yZycsXG4gICdlb3dpa2lxdW90ZSc6ICdlby53aWtpcXVvdGUub3JnJyxcbiAgJ2Vvd2lraXNvdXJjZSc6ICdlby53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2knOiAnZXMud2lraXBlZGlhLm9yZycsXG4gICdlc3dpa3Rpb25hcnknOiAnZXMud2lrdGlvbmFyeS5vcmcnLFxuICAnZXN3aWtpYm9va3MnOiAnZXMud2lraWJvb2tzLm9yZycsXG4gICdlc3dpa2luZXdzJzogJ2VzLndpa2luZXdzLm9yZycsXG4gICdlc3dpa2lxdW90ZSc6ICdlcy53aWtpcXVvdGUub3JnJyxcbiAgJ2Vzd2lraXNvdXJjZSc6ICdlcy53aWtpc291cmNlLm9yZycsXG4gICdlc3dpa2l2ZXJzaXR5JzogJ2VzLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlc3dpa2l2b3lhZ2UnOiAnZXMud2lraXZveWFnZS5vcmcnLFxuICAnZXR3aWtpJzogJ2V0Lndpa2lwZWRpYS5vcmcnLFxuICAnZXR3aWt0aW9uYXJ5JzogJ2V0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V0d2lraWJvb2tzJzogJ2V0Lndpa2lib29rcy5vcmcnLFxuICAnZXR3aWtpcXVvdGUnOiAnZXQud2lraXF1b3RlLm9yZycsXG4gICdldHdpa2lzb3VyY2UnOiAnZXQud2lraXNvdXJjZS5vcmcnLFxuICAnZXV3aWtpJzogJ2V1Lndpa2lwZWRpYS5vcmcnLFxuICAnZXV3aWt0aW9uYXJ5JzogJ2V1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2V1d2lraWJvb2tzJzogJ2V1Lndpa2lib29rcy5vcmcnLFxuICAnZXV3aWtpcXVvdGUnOiAnZXUud2lraXF1b3RlLm9yZycsXG4gICdleHR3aWtpJzogJ2V4dC53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lraSc6ICdmYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Zhd2lrdGlvbmFyeSc6ICdmYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmYXdpa2lib29rcyc6ICdmYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Zhd2lraW5ld3MnOiAnZmEud2lraW5ld3Mub3JnJyxcbiAgJ2Zhd2lraXF1b3RlJzogJ2ZhLndpa2lxdW90ZS5vcmcnLFxuICAnZmF3aWtpc291cmNlJzogJ2ZhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zhd2lraXZveWFnZSc6ICdmYS53aWtpdm95YWdlLm9yZycsXG4gICdmZndpa2knOiAnZmYud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa2knOiAnZmkud2lraXBlZGlhLm9yZycsXG4gICdmaXdpa3Rpb25hcnknOiAnZmkud2lrdGlvbmFyeS5vcmcnLFxuICAnZml3aWtpYm9va3MnOiAnZmkud2lraWJvb2tzLm9yZycsXG4gICdmaXdpa2luZXdzJzogJ2ZpLndpa2luZXdzLm9yZycsXG4gICdmaXdpa2lxdW90ZSc6ICdmaS53aWtpcXVvdGUub3JnJyxcbiAgJ2Zpd2lraXNvdXJjZSc6ICdmaS53aWtpc291cmNlLm9yZycsXG4gICdmaXdpa2l2ZXJzaXR5JzogJ2ZpLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdmaXVfdnJvd2lraSc6ICdmaXUtdnJvLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWtpJzogJ2ZqLndpa2lwZWRpYS5vcmcnLFxuICAnZmp3aWt0aW9uYXJ5JzogJ2ZqLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zvd2lraSc6ICdmby53aWtpcGVkaWEub3JnJyxcbiAgJ2Zvd2lrdGlvbmFyeSc6ICdmby53aWt0aW9uYXJ5Lm9yZycsXG4gICdmb3dpa2lzb3VyY2UnOiAnZm8ud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpJzogJ2ZyLndpa2lwZWRpYS5vcmcnLFxuICAnZnJ3aWt0aW9uYXJ5JzogJ2ZyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zyd2lraWJvb2tzJzogJ2ZyLndpa2lib29rcy5vcmcnLFxuICAnZnJ3aWtpbmV3cyc6ICdmci53aWtpbmV3cy5vcmcnLFxuICAnZnJ3aWtpcXVvdGUnOiAnZnIud2lraXF1b3RlLm9yZycsXG4gICdmcndpa2lzb3VyY2UnOiAnZnIud2lraXNvdXJjZS5vcmcnLFxuICAnZnJ3aWtpdmVyc2l0eSc6ICdmci53aWtpdmVyc2l0eS5vcmcnLFxuICAnZnJ3aWtpdm95YWdlJzogJ2ZyLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2ZycHdpa2knOiAnZnJwLndpa2lwZWRpYS5vcmcnLFxuICAnZnJyd2lraSc6ICdmcnIud2lraXBlZGlhLm9yZycsXG4gICdmdXJ3aWtpJzogJ2Z1ci53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lraSc6ICdmeS53aWtpcGVkaWEub3JnJyxcbiAgJ2Z5d2lrdGlvbmFyeSc6ICdmeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmeXdpa2lib29rcyc6ICdmeS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraSc6ICdnYS53aWtpcGVkaWEub3JnJyxcbiAgJ2dhd2lrdGlvbmFyeSc6ICdnYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdnYXdpa2lib29rcyc6ICdnYS53aWtpYm9va3Mub3JnJyxcbiAgJ2dhd2lraXF1b3RlJzogJ2dhLndpa2lxdW90ZS5vcmcnLFxuICAnZ2Fnd2lraSc6ICdnYWcud2lraXBlZGlhLm9yZycsXG4gICdnYW53aWtpJzogJ2dhbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lraSc6ICdnZC53aWtpcGVkaWEub3JnJyxcbiAgJ2dkd2lrdGlvbmFyeSc6ICdnZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbHdpa2knOiAnZ2wud2lraXBlZGlhLm9yZycsXG4gICdnbHdpa3Rpb25hcnknOiAnZ2wud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2x3aWtpYm9va3MnOiAnZ2wud2lraWJvb2tzLm9yZycsXG4gICdnbHdpa2lxdW90ZSc6ICdnbC53aWtpcXVvdGUub3JnJyxcbiAgJ2dsd2lraXNvdXJjZSc6ICdnbC53aWtpc291cmNlLm9yZycsXG4gICdnbGt3aWtpJzogJ2dsay53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lraSc6ICdnbi53aWtpcGVkaWEub3JnJyxcbiAgJ2dud2lrdGlvbmFyeSc6ICdnbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbndpa2lib29rcyc6ICdnbi53aWtpYm9va3Mub3JnJyxcbiAgJ2dvbXdpa2knOiAnZ29tLndpa2lwZWRpYS5vcmcnLFxuICAnZ290d2lraSc6ICdnb3Qud2lraXBlZGlhLm9yZycsXG4gICdnb3R3aWtpYm9va3MnOiAnZ290Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpJzogJ2d1Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3V3aWt0aW9uYXJ5JzogJ2d1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2d1d2lraWJvb2tzJzogJ2d1Lndpa2lib29rcy5vcmcnLFxuICAnZ3V3aWtpcXVvdGUnOiAnZ3Uud2lraXF1b3RlLm9yZycsXG4gICdndXdpa2lzb3VyY2UnOiAnZ3Uud2lraXNvdXJjZS5vcmcnLFxuICAnZ3Z3aWtpJzogJ2d2Lndpa2lwZWRpYS5vcmcnLFxuICAnZ3Z3aWt0aW9uYXJ5JzogJ2d2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2hhd2lraSc6ICdoYS53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd2lrdGlvbmFyeSc6ICdoYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoYWt3aWtpJzogJ2hhay53aWtpcGVkaWEub3JnJyxcbiAgJ2hhd3dpa2knOiAnaGF3Lndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWtpJzogJ2hlLndpa2lwZWRpYS5vcmcnLFxuICAnaGV3aWt0aW9uYXJ5JzogJ2hlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hld2lraWJvb2tzJzogJ2hlLndpa2lib29rcy5vcmcnLFxuICAnaGV3aWtpbmV3cyc6ICdoZS53aWtpbmV3cy5vcmcnLFxuICAnaGV3aWtpcXVvdGUnOiAnaGUud2lraXF1b3RlLm9yZycsXG4gICdoZXdpa2lzb3VyY2UnOiAnaGUud2lraXNvdXJjZS5vcmcnLFxuICAnaGV3aWtpdm95YWdlJzogJ2hlLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2hpd2lraSc6ICdoaS53aWtpcGVkaWEub3JnJyxcbiAgJ2hpd2lrdGlvbmFyeSc6ICdoaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoaXdpa2lib29rcyc6ICdoaS53aWtpYm9va3Mub3JnJyxcbiAgJ2hpd2lraXF1b3RlJzogJ2hpLndpa2lxdW90ZS5vcmcnLFxuICAnaGlmd2lraSc6ICdoaWYud2lraXBlZGlhLm9yZycsXG4gICdob3dpa2knOiAnaG8ud2lraXBlZGlhLm9yZycsXG4gICdocndpa2knOiAnaHIud2lraXBlZGlhLm9yZycsXG4gICdocndpa3Rpb25hcnknOiAnaHIud2lrdGlvbmFyeS5vcmcnLFxuICAnaHJ3aWtpYm9va3MnOiAnaHIud2lraWJvb2tzLm9yZycsXG4gICdocndpa2lxdW90ZSc6ICdoci53aWtpcXVvdGUub3JnJyxcbiAgJ2hyd2lraXNvdXJjZSc6ICdoci53aWtpc291cmNlLm9yZycsXG4gICdoc2J3aWtpJzogJ2hzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2hzYndpa3Rpb25hcnknOiAnaHNiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2h0d2lraSc6ICdodC53aWtpcGVkaWEub3JnJyxcbiAgJ2h0d2lraXNvdXJjZSc6ICdodC53aWtpc291cmNlLm9yZycsXG4gICdodXdpa2knOiAnaHUud2lraXBlZGlhLm9yZycsXG4gICdodXdpa3Rpb25hcnknOiAnaHUud2lrdGlvbmFyeS5vcmcnLFxuICAnaHV3aWtpYm9va3MnOiAnaHUud2lraWJvb2tzLm9yZycsXG4gICdodXdpa2luZXdzJzogJ2h1Lndpa2luZXdzLm9yZycsXG4gICdodXdpa2lxdW90ZSc6ICdodS53aWtpcXVvdGUub3JnJyxcbiAgJ2h1d2lraXNvdXJjZSc6ICdodS53aWtpc291cmNlLm9yZycsXG4gICdoeXdpa2knOiAnaHkud2lraXBlZGlhLm9yZycsXG4gICdoeXdpa3Rpb25hcnknOiAnaHkud2lrdGlvbmFyeS5vcmcnLFxuICAnaHl3aWtpYm9va3MnOiAnaHkud2lraWJvb2tzLm9yZycsXG4gICdoeXdpa2lxdW90ZSc6ICdoeS53aWtpcXVvdGUub3JnJyxcbiAgJ2h5d2lraXNvdXJjZSc6ICdoeS53aWtpc291cmNlLm9yZycsXG4gICdoendpa2knOiAnaHoud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa2knOiAnaWEud2lraXBlZGlhLm9yZycsXG4gICdpYXdpa3Rpb25hcnknOiAnaWEud2lrdGlvbmFyeS5vcmcnLFxuICAnaWF3aWtpYm9va3MnOiAnaWEud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2knOiAnaWQud2lraXBlZGlhLm9yZycsXG4gICdpZHdpa3Rpb25hcnknOiAnaWQud2lrdGlvbmFyeS5vcmcnLFxuICAnaWR3aWtpYm9va3MnOiAnaWQud2lraWJvb2tzLm9yZycsXG4gICdpZHdpa2lxdW90ZSc6ICdpZC53aWtpcXVvdGUub3JnJyxcbiAgJ2lkd2lraXNvdXJjZSc6ICdpZC53aWtpc291cmNlLm9yZycsXG4gICdpZXdpa2knOiAnaWUud2lraXBlZGlhLm9yZycsXG4gICdpZXdpa3Rpb25hcnknOiAnaWUud2lrdGlvbmFyeS5vcmcnLFxuICAnaWV3aWtpYm9va3MnOiAnaWUud2lraWJvb2tzLm9yZycsXG4gICdpZ3dpa2knOiAnaWcud2lraXBlZGlhLm9yZycsXG4gICdpaXdpa2knOiAnaWkud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa2knOiAnaWsud2lraXBlZGlhLm9yZycsXG4gICdpa3dpa3Rpb25hcnknOiAnaWsud2lrdGlvbmFyeS5vcmcnLFxuICAnaWxvd2lraSc6ICdpbG8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa2knOiAnaW8ud2lraXBlZGlhLm9yZycsXG4gICdpb3dpa3Rpb25hcnknOiAnaW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnaXN3aWtpJzogJ2lzLndpa2lwZWRpYS5vcmcnLFxuICAnaXN3aWt0aW9uYXJ5JzogJ2lzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lzd2lraWJvb2tzJzogJ2lzLndpa2lib29rcy5vcmcnLFxuICAnaXN3aWtpcXVvdGUnOiAnaXMud2lraXF1b3RlLm9yZycsXG4gICdpc3dpa2lzb3VyY2UnOiAnaXMud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpJzogJ2l0Lndpa2lwZWRpYS5vcmcnLFxuICAnaXR3aWt0aW9uYXJ5JzogJ2l0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2l0d2lraWJvb2tzJzogJ2l0Lndpa2lib29rcy5vcmcnLFxuICAnaXR3aWtpbmV3cyc6ICdpdC53aWtpbmV3cy5vcmcnLFxuICAnaXR3aWtpcXVvdGUnOiAnaXQud2lraXF1b3RlLm9yZycsXG4gICdpdHdpa2lzb3VyY2UnOiAnaXQud2lraXNvdXJjZS5vcmcnLFxuICAnaXR3aWtpdmVyc2l0eSc6ICdpdC53aWtpdmVyc2l0eS5vcmcnLFxuICAnaXR3aWtpdm95YWdlJzogJ2l0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2l1d2lraSc6ICdpdS53aWtpcGVkaWEub3JnJyxcbiAgJ2l1d2lrdGlvbmFyeSc6ICdpdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdqYXdpa2knOiAnamEud2lraXBlZGlhLm9yZycsXG4gICdqYXdpa3Rpb25hcnknOiAnamEud2lrdGlvbmFyeS5vcmcnLFxuICAnamF3aWtpYm9va3MnOiAnamEud2lraWJvb2tzLm9yZycsXG4gICdqYXdpa2luZXdzJzogJ2phLndpa2luZXdzLm9yZycsXG4gICdqYXdpa2lxdW90ZSc6ICdqYS53aWtpcXVvdGUub3JnJyxcbiAgJ2phd2lraXNvdXJjZSc6ICdqYS53aWtpc291cmNlLm9yZycsXG4gICdqYXdpa2l2ZXJzaXR5JzogJ2phLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdqYm93aWtpJzogJ2piby53aWtpcGVkaWEub3JnJyxcbiAgJ2pib3dpa3Rpb25hcnknOiAnamJvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2p2d2lraSc6ICdqdi53aWtpcGVkaWEub3JnJyxcbiAgJ2p2d2lrdGlvbmFyeSc6ICdqdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrYXdpa2knOiAna2Eud2lraXBlZGlhLm9yZycsXG4gICdrYXdpa3Rpb25hcnknOiAna2Eud2lrdGlvbmFyeS5vcmcnLFxuICAna2F3aWtpYm9va3MnOiAna2Eud2lraWJvb2tzLm9yZycsXG4gICdrYXdpa2lxdW90ZSc6ICdrYS53aWtpcXVvdGUub3JnJyxcbiAgJ2thYXdpa2knOiAna2FhLndpa2lwZWRpYS5vcmcnLFxuICAna2Fid2lraSc6ICdrYWIud2lraXBlZGlhLm9yZycsXG4gICdrYmR3aWtpJzogJ2tiZC53aWtpcGVkaWEub3JnJyxcbiAgJ2tnd2lraSc6ICdrZy53aWtpcGVkaWEub3JnJyxcbiAgJ2tpd2lraSc6ICdraS53aWtpcGVkaWEub3JnJyxcbiAgJ2tqd2lraSc6ICdrai53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lraSc6ICdray53aWtpcGVkaWEub3JnJyxcbiAgJ2trd2lrdGlvbmFyeSc6ICdray53aWt0aW9uYXJ5Lm9yZycsXG4gICdra3dpa2lib29rcyc6ICdray53aWtpYm9va3Mub3JnJyxcbiAgJ2trd2lraXF1b3RlJzogJ2trLndpa2lxdW90ZS5vcmcnLFxuICAna2x3aWtpJzogJ2tsLndpa2lwZWRpYS5vcmcnLFxuICAna2x3aWt0aW9uYXJ5JzogJ2tsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2ttd2lraSc6ICdrbS53aWtpcGVkaWEub3JnJyxcbiAgJ2ttd2lrdGlvbmFyeSc6ICdrbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbXdpa2lib29rcyc6ICdrbS53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraSc6ICdrbi53aWtpcGVkaWEub3JnJyxcbiAgJ2tud2lrdGlvbmFyeSc6ICdrbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbndpa2lib29rcyc6ICdrbi53aWtpYm9va3Mub3JnJyxcbiAgJ2tud2lraXF1b3RlJzogJ2tuLndpa2lxdW90ZS5vcmcnLFxuICAna253aWtpc291cmNlJzogJ2tuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraSc6ICdrby53aWtpcGVkaWEub3JnJyxcbiAgJ2tvd2lrdGlvbmFyeSc6ICdrby53aWt0aW9uYXJ5Lm9yZycsXG4gICdrb3dpa2lib29rcyc6ICdrby53aWtpYm9va3Mub3JnJyxcbiAgJ2tvd2lraW5ld3MnOiAna28ud2lraW5ld3Mub3JnJyxcbiAgJ2tvd2lraXF1b3RlJzogJ2tvLndpa2lxdW90ZS5vcmcnLFxuICAna293aWtpc291cmNlJzogJ2tvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2tvd2lraXZlcnNpdHknOiAna28ud2lraXZlcnNpdHkub3JnJyxcbiAgJ2tvaXdpa2knOiAna29pLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpJzogJ2tyLndpa2lwZWRpYS5vcmcnLFxuICAna3J3aWtpcXVvdGUnOiAna3Iud2lraXF1b3RlLm9yZycsXG4gICdrcmN3aWtpJzogJ2tyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lraSc6ICdrcy53aWtpcGVkaWEub3JnJyxcbiAgJ2tzd2lrdGlvbmFyeSc6ICdrcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrc3dpa2lib29rcyc6ICdrcy53aWtpYm9va3Mub3JnJyxcbiAgJ2tzd2lraXF1b3RlJzogJ2tzLndpa2lxdW90ZS5vcmcnLFxuICAna3Nod2lraSc6ICdrc2gud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa2knOiAna3Uud2lraXBlZGlhLm9yZycsXG4gICdrdXdpa3Rpb25hcnknOiAna3Uud2lrdGlvbmFyeS5vcmcnLFxuICAna3V3aWtpYm9va3MnOiAna3Uud2lraWJvb2tzLm9yZycsXG4gICdrdXdpa2lxdW90ZSc6ICdrdS53aWtpcXVvdGUub3JnJyxcbiAgJ2t2d2lraSc6ICdrdi53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lraSc6ICdrdy53aWtpcGVkaWEub3JnJyxcbiAgJ2t3d2lrdGlvbmFyeSc6ICdrdy53aWt0aW9uYXJ5Lm9yZycsXG4gICdrd3dpa2lxdW90ZSc6ICdrdy53aWtpcXVvdGUub3JnJyxcbiAgJ2t5d2lraSc6ICdreS53aWtpcGVkaWEub3JnJyxcbiAgJ2t5d2lrdGlvbmFyeSc6ICdreS53aWt0aW9uYXJ5Lm9yZycsXG4gICdreXdpa2lib29rcyc6ICdreS53aWtpYm9va3Mub3JnJyxcbiAgJ2t5d2lraXF1b3RlJzogJ2t5Lndpa2lxdW90ZS5vcmcnLFxuICAnbGF3aWtpJzogJ2xhLndpa2lwZWRpYS5vcmcnLFxuICAnbGF3aWt0aW9uYXJ5JzogJ2xhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xhd2lraWJvb2tzJzogJ2xhLndpa2lib29rcy5vcmcnLFxuICAnbGF3aWtpcXVvdGUnOiAnbGEud2lraXF1b3RlLm9yZycsXG4gICdsYXdpa2lzb3VyY2UnOiAnbGEud2lraXNvdXJjZS5vcmcnLFxuICAnbGFkd2lraSc6ICdsYWQud2lraXBlZGlhLm9yZycsXG4gICdsYndpa2knOiAnbGIud2lraXBlZGlhLm9yZycsXG4gICdsYndpa3Rpb25hcnknOiAnbGIud2lrdGlvbmFyeS5vcmcnLFxuICAnbGJ3aWtpYm9va3MnOiAnbGIud2lraWJvb2tzLm9yZycsXG4gICdsYndpa2lxdW90ZSc6ICdsYi53aWtpcXVvdGUub3JnJyxcbiAgJ2xiZXdpa2knOiAnbGJlLndpa2lwZWRpYS5vcmcnLFxuICAnbGV6d2lraSc6ICdsZXoud2lraXBlZGlhLm9yZycsXG4gICdsZ3dpa2knOiAnbGcud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa2knOiAnbGkud2lraXBlZGlhLm9yZycsXG4gICdsaXdpa3Rpb25hcnknOiAnbGkud2lrdGlvbmFyeS5vcmcnLFxuICAnbGl3aWtpYm9va3MnOiAnbGkud2lraWJvb2tzLm9yZycsXG4gICdsaXdpa2lxdW90ZSc6ICdsaS53aWtpcXVvdGUub3JnJyxcbiAgJ2xpd2lraXNvdXJjZSc6ICdsaS53aWtpc291cmNlLm9yZycsXG4gICdsaWp3aWtpJzogJ2xpai53aWtpcGVkaWEub3JnJyxcbiAgJ2xtb3dpa2knOiAnbG1vLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWtpJzogJ2xuLndpa2lwZWRpYS5vcmcnLFxuICAnbG53aWt0aW9uYXJ5JzogJ2xuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xud2lraWJvb2tzJzogJ2xuLndpa2lib29rcy5vcmcnLFxuICAnbG93aWtpJzogJ2xvLndpa2lwZWRpYS5vcmcnLFxuICAnbG93aWt0aW9uYXJ5JzogJ2xvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xyY3dpa2knOiAnbHJjLndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWtpJzogJ2x0Lndpa2lwZWRpYS5vcmcnLFxuICAnbHR3aWt0aW9uYXJ5JzogJ2x0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2x0d2lraWJvb2tzJzogJ2x0Lndpa2lib29rcy5vcmcnLFxuICAnbHR3aWtpcXVvdGUnOiAnbHQud2lraXF1b3RlLm9yZycsXG4gICdsdHdpa2lzb3VyY2UnOiAnbHQud2lraXNvdXJjZS5vcmcnLFxuICAnbHRnd2lraSc6ICdsdGcud2lraXBlZGlhLm9yZycsXG4gICdsdndpa2knOiAnbHYud2lraXBlZGlhLm9yZycsXG4gICdsdndpa3Rpb25hcnknOiAnbHYud2lrdGlvbmFyeS5vcmcnLFxuICAnbHZ3aWtpYm9va3MnOiAnbHYud2lraWJvb2tzLm9yZycsXG4gICdtYWl3aWtpJzogJ21haS53aWtpcGVkaWEub3JnJyxcbiAgJ21hcF9ibXN3aWtpJzogJ21hcC1ibXMud2lraXBlZGlhLm9yZycsXG4gICdtZGZ3aWtpJzogJ21kZi53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lraSc6ICdtZy53aWtpcGVkaWEub3JnJyxcbiAgJ21nd2lrdGlvbmFyeSc6ICdtZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtZ3dpa2lib29rcyc6ICdtZy53aWtpYm9va3Mub3JnJyxcbiAgJ21od2lraSc6ICdtaC53aWtpcGVkaWEub3JnJyxcbiAgJ21od2lrdGlvbmFyeSc6ICdtaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaHJ3aWtpJzogJ21oci53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lraSc6ICdtaS53aWtpcGVkaWEub3JnJyxcbiAgJ21pd2lrdGlvbmFyeSc6ICdtaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdtaXdpa2lib29rcyc6ICdtaS53aWtpYm9va3Mub3JnJyxcbiAgJ21pbndpa2knOiAnbWluLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWtpJzogJ21rLndpa2lwZWRpYS5vcmcnLFxuICAnbWt3aWt0aW9uYXJ5JzogJ21rLndpa3Rpb25hcnkub3JnJyxcbiAgJ21rd2lraWJvb2tzJzogJ21rLndpa2lib29rcy5vcmcnLFxuICAnbWt3aWtpc291cmNlJzogJ21rLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21sd2lraSc6ICdtbC53aWtpcGVkaWEub3JnJyxcbiAgJ21sd2lrdGlvbmFyeSc6ICdtbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbHdpa2lib29rcyc6ICdtbC53aWtpYm9va3Mub3JnJyxcbiAgJ21sd2lraXF1b3RlJzogJ21sLndpa2lxdW90ZS5vcmcnLFxuICAnbWx3aWtpc291cmNlJzogJ21sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21ud2lraSc6ICdtbi53aWtpcGVkaWEub3JnJyxcbiAgJ21ud2lrdGlvbmFyeSc6ICdtbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdtbndpa2lib29rcyc6ICdtbi53aWtpYm9va3Mub3JnJyxcbiAgJ21vd2lraSc6ICdtby53aWtpcGVkaWEub3JnJyxcbiAgJ21vd2lrdGlvbmFyeSc6ICdtby53aWt0aW9uYXJ5Lm9yZycsXG4gICdtcndpa2knOiAnbXIud2lraXBlZGlhLm9yZycsXG4gICdtcndpa3Rpb25hcnknOiAnbXIud2lrdGlvbmFyeS5vcmcnLFxuICAnbXJ3aWtpYm9va3MnOiAnbXIud2lraWJvb2tzLm9yZycsXG4gICdtcndpa2lxdW90ZSc6ICdtci53aWtpcXVvdGUub3JnJyxcbiAgJ21yd2lraXNvdXJjZSc6ICdtci53aWtpc291cmNlLm9yZycsXG4gICdtcmp3aWtpJzogJ21yai53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lraSc6ICdtcy53aWtpcGVkaWEub3JnJyxcbiAgJ21zd2lrdGlvbmFyeSc6ICdtcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdtc3dpa2lib29rcyc6ICdtcy53aWtpYm9va3Mub3JnJyxcbiAgJ210d2lraSc6ICdtdC53aWtpcGVkaWEub3JnJyxcbiAgJ210d2lrdGlvbmFyeSc6ICdtdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdtdXN3aWtpJzogJ211cy53aWtpcGVkaWEub3JnJyxcbiAgJ213bHdpa2knOiAnbXdsLndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWtpJzogJ215Lndpa2lwZWRpYS5vcmcnLFxuICAnbXl3aWt0aW9uYXJ5JzogJ215Lndpa3Rpb25hcnkub3JnJyxcbiAgJ215d2lraWJvb2tzJzogJ215Lndpa2lib29rcy5vcmcnLFxuICAnbXl2d2lraSc6ICdteXYud2lraXBlZGlhLm9yZycsXG4gICdtem53aWtpJzogJ216bi53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lraSc6ICduYS53aWtpcGVkaWEub3JnJyxcbiAgJ25hd2lrdGlvbmFyeSc6ICduYS53aWt0aW9uYXJ5Lm9yZycsXG4gICduYXdpa2lib29rcyc6ICduYS53aWtpYm9va3Mub3JnJyxcbiAgJ25hd2lraXF1b3RlJzogJ25hLndpa2lxdW90ZS5vcmcnLFxuICAnbmFod2lraSc6ICduYWgud2lraXBlZGlhLm9yZycsXG4gICduYWh3aWt0aW9uYXJ5JzogJ25haC53aWt0aW9uYXJ5Lm9yZycsXG4gICduYWh3aWtpYm9va3MnOiAnbmFoLndpa2lib29rcy5vcmcnLFxuICAnbmFwd2lraSc6ICduYXAud2lraXBlZGlhLm9yZycsXG4gICduZHN3aWtpJzogJ25kcy53aWtpcGVkaWEub3JnJyxcbiAgJ25kc3dpa3Rpb25hcnknOiAnbmRzLndpa3Rpb25hcnkub3JnJyxcbiAgJ25kc3dpa2lib29rcyc6ICduZHMud2lraWJvb2tzLm9yZycsXG4gICduZHN3aWtpcXVvdGUnOiAnbmRzLndpa2lxdW90ZS5vcmcnLFxuICAnbmRzX25sd2lraSc6ICduZHMtbmwud2lraXBlZGlhLm9yZycsXG4gICduZXdpa2knOiAnbmUud2lraXBlZGlhLm9yZycsXG4gICduZXdpa3Rpb25hcnknOiAnbmUud2lrdGlvbmFyeS5vcmcnLFxuICAnbmV3aWtpYm9va3MnOiAnbmUud2lraWJvb2tzLm9yZycsXG4gICduZXd3aWtpJzogJ25ldy53aWtpcGVkaWEub3JnJyxcbiAgJ25nd2lraSc6ICduZy53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lraSc6ICdubC53aWtpcGVkaWEub3JnJyxcbiAgJ25sd2lrdGlvbmFyeSc6ICdubC53aWt0aW9uYXJ5Lm9yZycsXG4gICdubHdpa2lib29rcyc6ICdubC53aWtpYm9va3Mub3JnJyxcbiAgJ25sd2lraW5ld3MnOiAnbmwud2lraW5ld3Mub3JnJyxcbiAgJ25sd2lraXF1b3RlJzogJ25sLndpa2lxdW90ZS5vcmcnLFxuICAnbmx3aWtpc291cmNlJzogJ25sLndpa2lzb3VyY2Uub3JnJyxcbiAgJ25sd2lraXZveWFnZSc6ICdubC53aWtpdm95YWdlLm9yZycsXG4gICdubndpa2knOiAnbm4ud2lraXBlZGlhLm9yZycsXG4gICdubndpa3Rpb25hcnknOiAnbm4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm53aWtpcXVvdGUnOiAnbm4ud2lraXF1b3RlLm9yZycsXG4gICdub3dpa2knOiAnbm8ud2lraXBlZGlhLm9yZycsXG4gICdub3dpa3Rpb25hcnknOiAnbm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbm93aWtpYm9va3MnOiAnbm8ud2lraWJvb2tzLm9yZycsXG4gICdub3dpa2luZXdzJzogJ25vLndpa2luZXdzLm9yZycsXG4gICdub3dpa2lxdW90ZSc6ICduby53aWtpcXVvdGUub3JnJyxcbiAgJ25vd2lraXNvdXJjZSc6ICduby53aWtpc291cmNlLm9yZycsXG4gICdub3Z3aWtpJzogJ25vdi53aWtpcGVkaWEub3JnJyxcbiAgJ25ybXdpa2knOiAnbnJtLndpa2lwZWRpYS5vcmcnLFxuICAnbnNvd2lraSc6ICduc28ud2lraXBlZGlhLm9yZycsXG4gICdudndpa2knOiAnbnYud2lraXBlZGlhLm9yZycsXG4gICdueXdpa2knOiAnbnkud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa2knOiAnb2Mud2lraXBlZGlhLm9yZycsXG4gICdvY3dpa3Rpb25hcnknOiAnb2Mud2lrdGlvbmFyeS5vcmcnLFxuICAnb2N3aWtpYm9va3MnOiAnb2Mud2lraWJvb2tzLm9yZycsXG4gICdvbXdpa2knOiAnb20ud2lraXBlZGlhLm9yZycsXG4gICdvbXdpa3Rpb25hcnknOiAnb20ud2lrdGlvbmFyeS5vcmcnLFxuICAnb3J3aWtpJzogJ29yLndpa2lwZWRpYS5vcmcnLFxuICAnb3J3aWt0aW9uYXJ5JzogJ29yLndpa3Rpb25hcnkub3JnJyxcbiAgJ29yd2lraXNvdXJjZSc6ICdvci53aWtpc291cmNlLm9yZycsXG4gICdvc3dpa2knOiAnb3Mud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa2knOiAncGEud2lraXBlZGlhLm9yZycsXG4gICdwYXdpa3Rpb25hcnknOiAncGEud2lrdGlvbmFyeS5vcmcnLFxuICAncGF3aWtpYm9va3MnOiAncGEud2lraWJvb2tzLm9yZycsXG4gICdwYWd3aWtpJzogJ3BhZy53aWtpcGVkaWEub3JnJyxcbiAgJ3BhbXdpa2knOiAncGFtLndpa2lwZWRpYS5vcmcnLFxuICAncGFwd2lraSc6ICdwYXAud2lraXBlZGlhLm9yZycsXG4gICdwY2R3aWtpJzogJ3BjZC53aWtpcGVkaWEub3JnJyxcbiAgJ3BkY3dpa2knOiAncGRjLndpa2lwZWRpYS5vcmcnLFxuICAncGZsd2lraSc6ICdwZmwud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa2knOiAncGkud2lraXBlZGlhLm9yZycsXG4gICdwaXdpa3Rpb25hcnknOiAncGkud2lrdGlvbmFyeS5vcmcnLFxuICAncGlod2lraSc6ICdwaWgud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa2knOiAncGwud2lraXBlZGlhLm9yZycsXG4gICdwbHdpa3Rpb25hcnknOiAncGwud2lrdGlvbmFyeS5vcmcnLFxuICAncGx3aWtpYm9va3MnOiAncGwud2lraWJvb2tzLm9yZycsXG4gICdwbHdpa2luZXdzJzogJ3BsLndpa2luZXdzLm9yZycsXG4gICdwbHdpa2lxdW90ZSc6ICdwbC53aWtpcXVvdGUub3JnJyxcbiAgJ3Bsd2lraXNvdXJjZSc6ICdwbC53aWtpc291cmNlLm9yZycsXG4gICdwbHdpa2l2b3lhZ2UnOiAncGwud2lraXZveWFnZS5vcmcnLFxuICAncG1zd2lraSc6ICdwbXMud2lraXBlZGlhLm9yZycsXG4gICdwbmJ3aWtpJzogJ3BuYi53aWtpcGVkaWEub3JnJyxcbiAgJ3BuYndpa3Rpb25hcnknOiAncG5iLndpa3Rpb25hcnkub3JnJyxcbiAgJ3BudHdpa2knOiAncG50Lndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWtpJzogJ3BzLndpa2lwZWRpYS5vcmcnLFxuICAncHN3aWt0aW9uYXJ5JzogJ3BzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bzd2lraWJvb2tzJzogJ3BzLndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpJzogJ3B0Lndpa2lwZWRpYS5vcmcnLFxuICAncHR3aWt0aW9uYXJ5JzogJ3B0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3B0d2lraWJvb2tzJzogJ3B0Lndpa2lib29rcy5vcmcnLFxuICAncHR3aWtpbmV3cyc6ICdwdC53aWtpbmV3cy5vcmcnLFxuICAncHR3aWtpcXVvdGUnOiAncHQud2lraXF1b3RlLm9yZycsXG4gICdwdHdpa2lzb3VyY2UnOiAncHQud2lraXNvdXJjZS5vcmcnLFxuICAncHR3aWtpdmVyc2l0eSc6ICdwdC53aWtpdmVyc2l0eS5vcmcnLFxuICAncHR3aWtpdm95YWdlJzogJ3B0Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3F1d2lraSc6ICdxdS53aWtpcGVkaWEub3JnJyxcbiAgJ3F1d2lrdGlvbmFyeSc6ICdxdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdxdXdpa2lib29rcyc6ICdxdS53aWtpYm9va3Mub3JnJyxcbiAgJ3F1d2lraXF1b3RlJzogJ3F1Lndpa2lxdW90ZS5vcmcnLFxuICAncm13aWtpJzogJ3JtLndpa2lwZWRpYS5vcmcnLFxuICAncm13aWt0aW9uYXJ5JzogJ3JtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jtd2lraWJvb2tzJzogJ3JtLndpa2lib29rcy5vcmcnLFxuICAncm15d2lraSc6ICdybXkud2lraXBlZGlhLm9yZycsXG4gICdybndpa2knOiAncm4ud2lraXBlZGlhLm9yZycsXG4gICdybndpa3Rpb25hcnknOiAncm4ud2lrdGlvbmFyeS5vcmcnLFxuICAncm93aWtpJzogJ3JvLndpa2lwZWRpYS5vcmcnLFxuICAncm93aWt0aW9uYXJ5JzogJ3JvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jvd2lraWJvb2tzJzogJ3JvLndpa2lib29rcy5vcmcnLFxuICAncm93aWtpbmV3cyc6ICdyby53aWtpbmV3cy5vcmcnLFxuICAncm93aWtpcXVvdGUnOiAncm8ud2lraXF1b3RlLm9yZycsXG4gICdyb3dpa2lzb3VyY2UnOiAncm8ud2lraXNvdXJjZS5vcmcnLFxuICAncm93aWtpdm95YWdlJzogJ3JvLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3JvYV9ydXB3aWtpJzogJ3JvYS1ydXAud2lraXBlZGlhLm9yZycsXG4gICdyb2FfcnVwd2lrdGlvbmFyeSc6ICdyb2EtcnVwLndpa3Rpb25hcnkub3JnJyxcbiAgJ3JvYV90YXJhd2lraSc6ICdyb2EtdGFyYS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lraSc6ICdydS53aWtpcGVkaWEub3JnJyxcbiAgJ3J1d2lrdGlvbmFyeSc6ICdydS53aWt0aW9uYXJ5Lm9yZycsXG4gICdydXdpa2lib29rcyc6ICdydS53aWtpYm9va3Mub3JnJyxcbiAgJ3J1d2lraW5ld3MnOiAncnUud2lraW5ld3Mub3JnJyxcbiAgJ3J1d2lraXF1b3RlJzogJ3J1Lndpa2lxdW90ZS5vcmcnLFxuICAncnV3aWtpc291cmNlJzogJ3J1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3J1d2lraXZlcnNpdHknOiAncnUud2lraXZlcnNpdHkub3JnJyxcbiAgJ3J1d2lraXZveWFnZSc6ICdydS53aWtpdm95YWdlLm9yZycsXG4gICdydWV3aWtpJzogJ3J1ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lraSc6ICdydy53aWtpcGVkaWEub3JnJyxcbiAgJ3J3d2lrdGlvbmFyeSc6ICdydy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzYXdpa2knOiAnc2Eud2lraXBlZGlhLm9yZycsXG4gICdzYXdpa3Rpb25hcnknOiAnc2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnc2F3aWtpYm9va3MnOiAnc2Eud2lraWJvb2tzLm9yZycsXG4gICdzYXdpa2lxdW90ZSc6ICdzYS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nhd2lraXNvdXJjZSc6ICdzYS53aWtpc291cmNlLm9yZycsXG4gICdzYWh3aWtpJzogJ3NhaC53aWtpcGVkaWEub3JnJyxcbiAgJ3NhaHdpa2lzb3VyY2UnOiAnc2FoLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Njd2lraSc6ICdzYy53aWtpcGVkaWEub3JnJyxcbiAgJ3Njd2lrdGlvbmFyeSc6ICdzYy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzY253aWtpJzogJ3Njbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Njbndpa3Rpb25hcnknOiAnc2NuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Njb3dpa2knOiAnc2NvLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWtpJzogJ3NkLndpa2lwZWRpYS5vcmcnLFxuICAnc2R3aWt0aW9uYXJ5JzogJ3NkLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nkd2lraW5ld3MnOiAnc2Qud2lraW5ld3Mub3JnJyxcbiAgJ3Nld2lraSc6ICdzZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nld2lraWJvb2tzJzogJ3NlLndpa2lib29rcy5vcmcnLFxuICAnc2d3aWtpJzogJ3NnLndpa2lwZWRpYS5vcmcnLFxuICAnc2d3aWt0aW9uYXJ5JzogJ3NnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nod2lraSc6ICdzaC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nod2lrdGlvbmFyeSc6ICdzaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaXdpa2knOiAnc2kud2lraXBlZGlhLm9yZycsXG4gICdzaXdpa3Rpb25hcnknOiAnc2kud2lrdGlvbmFyeS5vcmcnLFxuICAnc2l3aWtpYm9va3MnOiAnc2kud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpJzogJ3NpbXBsZS53aWtpcGVkaWEub3JnJyxcbiAgJ3NpbXBsZXdpa3Rpb25hcnknOiAnc2ltcGxlLndpa3Rpb25hcnkub3JnJyxcbiAgJ3NpbXBsZXdpa2lib29rcyc6ICdzaW1wbGUud2lraWJvb2tzLm9yZycsXG4gICdzaW1wbGV3aWtpcXVvdGUnOiAnc2ltcGxlLndpa2lxdW90ZS5vcmcnLFxuICAnc2t3aWtpJzogJ3NrLndpa2lwZWRpYS5vcmcnLFxuICAnc2t3aWt0aW9uYXJ5JzogJ3NrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nrd2lraWJvb2tzJzogJ3NrLndpa2lib29rcy5vcmcnLFxuICAnc2t3aWtpcXVvdGUnOiAnc2sud2lraXF1b3RlLm9yZycsXG4gICdza3dpa2lzb3VyY2UnOiAnc2sud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpJzogJ3NsLndpa2lwZWRpYS5vcmcnLFxuICAnc2x3aWt0aW9uYXJ5JzogJ3NsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nsd2lraWJvb2tzJzogJ3NsLndpa2lib29rcy5vcmcnLFxuICAnc2x3aWtpcXVvdGUnOiAnc2wud2lraXF1b3RlLm9yZycsXG4gICdzbHdpa2lzb3VyY2UnOiAnc2wud2lraXNvdXJjZS5vcmcnLFxuICAnc2x3aWtpdmVyc2l0eSc6ICdzbC53aWtpdmVyc2l0eS5vcmcnLFxuICAnc213aWtpJzogJ3NtLndpa2lwZWRpYS5vcmcnLFxuICAnc213aWt0aW9uYXJ5JzogJ3NtLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nud2lraSc6ICdzbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nud2lrdGlvbmFyeSc6ICdzbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzb3dpa2knOiAnc28ud2lraXBlZGlhLm9yZycsXG4gICdzb3dpa3Rpb25hcnknOiAnc28ud2lrdGlvbmFyeS5vcmcnLFxuICAnc3F3aWtpJzogJ3NxLndpa2lwZWRpYS5vcmcnLFxuICAnc3F3aWt0aW9uYXJ5JzogJ3NxLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nxd2lraWJvb2tzJzogJ3NxLndpa2lib29rcy5vcmcnLFxuICAnc3F3aWtpbmV3cyc6ICdzcS53aWtpbmV3cy5vcmcnLFxuICAnc3F3aWtpcXVvdGUnOiAnc3Eud2lraXF1b3RlLm9yZycsXG4gICdzcndpa2knOiAnc3Iud2lraXBlZGlhLm9yZycsXG4gICdzcndpa3Rpb25hcnknOiAnc3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnc3J3aWtpYm9va3MnOiAnc3Iud2lraWJvb2tzLm9yZycsXG4gICdzcndpa2luZXdzJzogJ3NyLndpa2luZXdzLm9yZycsXG4gICdzcndpa2lxdW90ZSc6ICdzci53aWtpcXVvdGUub3JnJyxcbiAgJ3Nyd2lraXNvdXJjZSc6ICdzci53aWtpc291cmNlLm9yZycsXG4gICdzcm53aWtpJzogJ3Nybi53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lraSc6ICdzcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Nzd2lrdGlvbmFyeSc6ICdzcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdHdpa2knOiAnc3Qud2lraXBlZGlhLm9yZycsXG4gICdzdHdpa3Rpb25hcnknOiAnc3Qud2lrdGlvbmFyeS5vcmcnLFxuICAnc3Rxd2lraSc6ICdzdHEud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa2knOiAnc3Uud2lraXBlZGlhLm9yZycsXG4gICdzdXdpa3Rpb25hcnknOiAnc3Uud2lrdGlvbmFyeS5vcmcnLFxuICAnc3V3aWtpYm9va3MnOiAnc3Uud2lraWJvb2tzLm9yZycsXG4gICdzdXdpa2lxdW90ZSc6ICdzdS53aWtpcXVvdGUub3JnJyxcbiAgJ3N2d2lraSc6ICdzdi53aWtpcGVkaWEub3JnJyxcbiAgJ3N2d2lrdGlvbmFyeSc6ICdzdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdndpa2lib29rcyc6ICdzdi53aWtpYm9va3Mub3JnJyxcbiAgJ3N2d2lraW5ld3MnOiAnc3Yud2lraW5ld3Mub3JnJyxcbiAgJ3N2d2lraXF1b3RlJzogJ3N2Lndpa2lxdW90ZS5vcmcnLFxuICAnc3Z3aWtpc291cmNlJzogJ3N2Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3N2d2lraXZlcnNpdHknOiAnc3Yud2lraXZlcnNpdHkub3JnJyxcbiAgJ3N2d2lraXZveWFnZSc6ICdzdi53aWtpdm95YWdlLm9yZycsXG4gICdzd3dpa2knOiAnc3cud2lraXBlZGlhLm9yZycsXG4gICdzd3dpa3Rpb25hcnknOiAnc3cud2lrdGlvbmFyeS5vcmcnLFxuICAnc3d3aWtpYm9va3MnOiAnc3cud2lraWJvb2tzLm9yZycsXG4gICdzemx3aWtpJzogJ3N6bC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lraSc6ICd0YS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rhd2lrdGlvbmFyeSc6ICd0YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0YXdpa2lib29rcyc6ICd0YS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rhd2lraW5ld3MnOiAndGEud2lraW5ld3Mub3JnJyxcbiAgJ3Rhd2lraXF1b3RlJzogJ3RhLndpa2lxdW90ZS5vcmcnLFxuICAndGF3aWtpc291cmNlJzogJ3RhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rld2lraSc6ICd0ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rld2lrdGlvbmFyeSc6ICd0ZS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0ZXdpa2lib29rcyc6ICd0ZS53aWtpYm9va3Mub3JnJyxcbiAgJ3Rld2lraXF1b3RlJzogJ3RlLndpa2lxdW90ZS5vcmcnLFxuICAndGV3aWtpc291cmNlJzogJ3RlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3RldHdpa2knOiAndGV0Lndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWtpJzogJ3RnLndpa2lwZWRpYS5vcmcnLFxuICAndGd3aWt0aW9uYXJ5JzogJ3RnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rnd2lraWJvb2tzJzogJ3RnLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpJzogJ3RoLndpa2lwZWRpYS5vcmcnLFxuICAndGh3aWt0aW9uYXJ5JzogJ3RoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rod2lraWJvb2tzJzogJ3RoLndpa2lib29rcy5vcmcnLFxuICAndGh3aWtpbmV3cyc6ICd0aC53aWtpbmV3cy5vcmcnLFxuICAndGh3aWtpcXVvdGUnOiAndGgud2lraXF1b3RlLm9yZycsXG4gICd0aHdpa2lzb3VyY2UnOiAndGgud2lraXNvdXJjZS5vcmcnLFxuICAndGl3aWtpJzogJ3RpLndpa2lwZWRpYS5vcmcnLFxuICAndGl3aWt0aW9uYXJ5JzogJ3RpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rrd2lraSc6ICd0ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Rrd2lrdGlvbmFyeSc6ICd0ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd0a3dpa2lib29rcyc6ICd0ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Rrd2lraXF1b3RlJzogJ3RrLndpa2lxdW90ZS5vcmcnLFxuICAndGx3aWtpJzogJ3RsLndpa2lwZWRpYS5vcmcnLFxuICAndGx3aWt0aW9uYXJ5JzogJ3RsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rsd2lraWJvb2tzJzogJ3RsLndpa2lib29rcy5vcmcnLFxuICAndG53aWtpJzogJ3RuLndpa2lwZWRpYS5vcmcnLFxuICAndG53aWt0aW9uYXJ5JzogJ3RuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rvd2lraSc6ICd0by53aWtpcGVkaWEub3JnJyxcbiAgJ3Rvd2lrdGlvbmFyeSc6ICd0by53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cGl3aWtpJzogJ3RwaS53aWtpcGVkaWEub3JnJyxcbiAgJ3RwaXdpa3Rpb25hcnknOiAndHBpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Ryd2lraSc6ICd0ci53aWtpcGVkaWEub3JnJyxcbiAgJ3Ryd2lrdGlvbmFyeSc6ICd0ci53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cndpa2lib29rcyc6ICd0ci53aWtpYm9va3Mub3JnJyxcbiAgJ3Ryd2lraW5ld3MnOiAndHIud2lraW5ld3Mub3JnJyxcbiAgJ3Ryd2lraXF1b3RlJzogJ3RyLndpa2lxdW90ZS5vcmcnLFxuICAndHJ3aWtpc291cmNlJzogJ3RyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rzd2lraSc6ICd0cy53aWtpcGVkaWEub3JnJyxcbiAgJ3Rzd2lrdGlvbmFyeSc6ICd0cy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0dHdpa2knOiAndHQud2lraXBlZGlhLm9yZycsXG4gICd0dHdpa3Rpb25hcnknOiAndHQud2lrdGlvbmFyeS5vcmcnLFxuICAndHR3aWtpYm9va3MnOiAndHQud2lraWJvb2tzLm9yZycsXG4gICd0dHdpa2lxdW90ZSc6ICd0dC53aWtpcXVvdGUub3JnJyxcbiAgJ3R1bXdpa2knOiAndHVtLndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWtpJzogJ3R3Lndpa2lwZWRpYS5vcmcnLFxuICAndHd3aWt0aW9uYXJ5JzogJ3R3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3R5d2lraSc6ICd0eS53aWtpcGVkaWEub3JnJyxcbiAgJ3R5dndpa2knOiAndHl2Lndpa2lwZWRpYS5vcmcnLFxuICAndWRtd2lraSc6ICd1ZG0ud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa2knOiAndWcud2lraXBlZGlhLm9yZycsXG4gICd1Z3dpa3Rpb25hcnknOiAndWcud2lrdGlvbmFyeS5vcmcnLFxuICAndWd3aWtpYm9va3MnOiAndWcud2lraWJvb2tzLm9yZycsXG4gICd1Z3dpa2lxdW90ZSc6ICd1Zy53aWtpcXVvdGUub3JnJyxcbiAgJ3Vrd2lraSc6ICd1ay53aWtpcGVkaWEub3JnJyxcbiAgJ3Vrd2lrdGlvbmFyeSc6ICd1ay53aWt0aW9uYXJ5Lm9yZycsXG4gICd1a3dpa2lib29rcyc6ICd1ay53aWtpYm9va3Mub3JnJyxcbiAgJ3Vrd2lraW5ld3MnOiAndWsud2lraW5ld3Mub3JnJyxcbiAgJ3Vrd2lraXF1b3RlJzogJ3VrLndpa2lxdW90ZS5vcmcnLFxuICAndWt3aWtpc291cmNlJzogJ3VrLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Vrd2lraXZveWFnZSc6ICd1ay53aWtpdm95YWdlLm9yZycsXG4gICd1cndpa2knOiAndXIud2lraXBlZGlhLm9yZycsXG4gICd1cndpa3Rpb25hcnknOiAndXIud2lrdGlvbmFyeS5vcmcnLFxuICAndXJ3aWtpYm9va3MnOiAndXIud2lraWJvb2tzLm9yZycsXG4gICd1cndpa2lxdW90ZSc6ICd1ci53aWtpcXVvdGUub3JnJyxcbiAgJ3V6d2lraSc6ICd1ei53aWtpcGVkaWEub3JnJyxcbiAgJ3V6d2lrdGlvbmFyeSc6ICd1ei53aWt0aW9uYXJ5Lm9yZycsXG4gICd1endpa2lib29rcyc6ICd1ei53aWtpYm9va3Mub3JnJyxcbiAgJ3V6d2lraXF1b3RlJzogJ3V6Lndpa2lxdW90ZS5vcmcnLFxuICAndmV3aWtpJzogJ3ZlLndpa2lwZWRpYS5vcmcnLFxuICAndmVjd2lraSc6ICd2ZWMud2lraXBlZGlhLm9yZycsXG4gICd2ZWN3aWt0aW9uYXJ5JzogJ3ZlYy53aWt0aW9uYXJ5Lm9yZycsXG4gICd2ZWN3aWtpc291cmNlJzogJ3ZlYy53aWtpc291cmNlLm9yZycsXG4gICd2ZXB3aWtpJzogJ3ZlcC53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lraSc6ICd2aS53aWtpcGVkaWEub3JnJyxcbiAgJ3Zpd2lrdGlvbmFyeSc6ICd2aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd2aXdpa2lib29rcyc6ICd2aS53aWtpYm9va3Mub3JnJyxcbiAgJ3Zpd2lraXF1b3RlJzogJ3ZpLndpa2lxdW90ZS5vcmcnLFxuICAndml3aWtpc291cmNlJzogJ3ZpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Zpd2lraXZveWFnZSc6ICd2aS53aWtpdm95YWdlLm9yZycsXG4gICd2bHN3aWtpJzogJ3Zscy53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lraSc6ICd2by53aWtpcGVkaWEub3JnJyxcbiAgJ3Zvd2lrdGlvbmFyeSc6ICd2by53aWt0aW9uYXJ5Lm9yZycsXG4gICd2b3dpa2lib29rcyc6ICd2by53aWtpYm9va3Mub3JnJyxcbiAgJ3Zvd2lraXF1b3RlJzogJ3ZvLndpa2lxdW90ZS5vcmcnLFxuICAnd2F3aWtpJzogJ3dhLndpa2lwZWRpYS5vcmcnLFxuICAnd2F3aWt0aW9uYXJ5JzogJ3dhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3dhd2lraWJvb2tzJzogJ3dhLndpa2lib29rcy5vcmcnLFxuICAnd2Fyd2lraSc6ICd3YXIud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa2knOiAnd28ud2lraXBlZGlhLm9yZycsXG4gICd3b3dpa3Rpb25hcnknOiAnd28ud2lrdGlvbmFyeS5vcmcnLFxuICAnd293aWtpcXVvdGUnOiAnd28ud2lraXF1b3RlLm9yZycsXG4gICd3dXV3aWtpJzogJ3d1dS53aWtpcGVkaWEub3JnJyxcbiAgJ3hhbHdpa2knOiAneGFsLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWtpJzogJ3hoLndpa2lwZWRpYS5vcmcnLFxuICAneGh3aWt0aW9uYXJ5JzogJ3hoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3hod2lraWJvb2tzJzogJ3hoLndpa2lib29rcy5vcmcnLFxuICAneG1md2lraSc6ICd4bWYud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa2knOiAneWkud2lraXBlZGlhLm9yZycsXG4gICd5aXdpa3Rpb25hcnknOiAneWkud2lrdGlvbmFyeS5vcmcnLFxuICAneWl3aWtpc291cmNlJzogJ3lpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3lvd2lraSc6ICd5by53aWtpcGVkaWEub3JnJyxcbiAgJ3lvd2lrdGlvbmFyeSc6ICd5by53aWt0aW9uYXJ5Lm9yZycsXG4gICd5b3dpa2lib29rcyc6ICd5by53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraSc6ICd6YS53aWtpcGVkaWEub3JnJyxcbiAgJ3phd2lrdGlvbmFyeSc6ICd6YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd6YXdpa2lib29rcyc6ICd6YS53aWtpYm9va3Mub3JnJyxcbiAgJ3phd2lraXF1b3RlJzogJ3phLndpa2lxdW90ZS5vcmcnLFxuICAnemVhd2lraSc6ICd6ZWEud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa2knOiAnemgud2lraXBlZGlhLm9yZycsXG4gICd6aHdpa3Rpb25hcnknOiAnemgud2lrdGlvbmFyeS5vcmcnLFxuICAnemh3aWtpYm9va3MnOiAnemgud2lraWJvb2tzLm9yZycsXG4gICd6aHdpa2luZXdzJzogJ3poLndpa2luZXdzLm9yZycsXG4gICd6aHdpa2lxdW90ZSc6ICd6aC53aWtpcXVvdGUub3JnJyxcbiAgJ3pod2lraXNvdXJjZSc6ICd6aC53aWtpc291cmNlLm9yZycsXG4gICd6aHdpa2l2b3lhZ2UnOiAnemgud2lraXZveWFnZS5vcmcnLFxuICAnemhfY2xhc3NpY2Fsd2lraSc6ICd6aC1jbGFzc2ljYWwud2lraXBlZGlhLm9yZycsXG4gICd6aF9taW5fbmFud2lraSc6ICd6aC1taW4tbmFuLndpa2lwZWRpYS5vcmcnLFxuICAnemhfbWluX25hbndpa3Rpb25hcnknOiAnemgtbWluLW5hbi53aWt0aW9uYXJ5Lm9yZycsXG4gICd6aF9taW5fbmFud2lraWJvb2tzJzogJ3poLW1pbi1uYW4ud2lraWJvb2tzLm9yZycsXG4gICd6aF9taW5fbmFud2lraXF1b3RlJzogJ3poLW1pbi1uYW4ud2lraXF1b3RlLm9yZycsXG4gICd6aF9taW5fbmFud2lraXNvdXJjZSc6ICd6aC1taW4tbmFuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3poX3l1ZXdpa2knOiAnemgteXVlLndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWtpJzogJ3p1Lndpa2lwZWRpYS5vcmcnLFxuICAnenV3aWt0aW9uYXJ5JzogJ3p1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3p1d2lraWJvb2tzJzogJ3p1Lndpa2lib29rcy5vcmcnLFxuICAnYWR2aXNvcnl3aWtpJzogJ2Fkdmlzb3J5Lndpa2ltZWRpYS5vcmcnLFxuICAnYXJ3aWtpbWVkaWEnOiAnYXIud2lraW1lZGlhLm9yZycsXG4gICdhcmJjb21fZGV3aWtpJzogJ2FyYmNvbS1kZS53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9lbndpa2knOiAnYXJiY29tLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX2Zpd2lraSc6ICdhcmJjb20tZmkud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fbmx3aWtpJzogJ2FyYmNvbS1ubC53aWtpcGVkaWEub3JnJyxcbiAgJ2F1ZGl0Y29td2lraSc6ICdhdWRpdGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2Jkd2lraW1lZGlhJzogJ2JkLndpa2ltZWRpYS5vcmcnLFxuICAnYmV3aWtpbWVkaWEnOiAnYmUud2lraW1lZGlhLm9yZycsXG4gICdiZXRhd2lraXZlcnNpdHknOiAnYmV0YS53aWtpdmVyc2l0eS5vcmcnLFxuICAnYm9hcmR3aWtpJzogJ2JvYXJkLndpa2ltZWRpYS5vcmcnLFxuICAnYm9hcmRnb3Zjb213aWtpJzogJ2JvYXJkZ292Y29tLndpa2ltZWRpYS5vcmcnLFxuICAnYnJ3aWtpbWVkaWEnOiAnYnIud2lraW1lZGlhLm9yZycsXG4gICdjYXdpa2ltZWRpYSc6ICdjYS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYWlyd2lraSc6ICdjaGFpci53aWtpbWVkaWEub3JnJyxcbiAgJ2NoYXBjb213aWtpJzogJ2FmZmNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2NoZWNrdXNlcndpa2knOiAnY2hlY2t1c2VyLndpa2ltZWRpYS5vcmcnLFxuICAnY253aWtpbWVkaWEnOiAnY24ud2lraW1lZGlhLm9yZycsXG4gICdjb3dpa2ltZWRpYSc6ICdjby53aWtpbWVkaWEub3JnJyxcbiAgJ2NvbGxhYndpa2knOiAnY29sbGFiLndpa2ltZWRpYS5vcmcnLFxuICAnY29tbW9uc3dpa2knOiAnY29tbW9ucy53aWtpbWVkaWEub3JnJyxcbiAgJ2Rrd2lraW1lZGlhJzogJ2RrLndpa2ltZWRpYS5vcmcnLFxuICAnZG9uYXRld2lraSc6ICdkb25hdGUud2lraW1lZGlhLm9yZycsXG4gICdldHdpa2ltZWRpYSc6ICdlZS53aWtpbWVkaWEub3JnJyxcbiAgJ2V4ZWN3aWtpJzogJ2V4ZWMud2lraW1lZGlhLm9yZycsXG4gICdmZGN3aWtpJzogJ2ZkYy53aWtpbWVkaWEub3JnJyxcbiAgJ2Zpd2lraW1lZGlhJzogJ2ZpLndpa2ltZWRpYS5vcmcnLFxuICAnZm91bmRhdGlvbndpa2knOiAnd2lraW1lZGlhZm91bmRhdGlvbi5vcmcnLFxuICAnZ3JhbnRzd2lraSc6ICdncmFudHMud2lraW1lZGlhLm9yZycsXG4gICdpZWdjb213aWtpJzogJ2llZ2NvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2lsd2lraW1lZGlhJzogJ2lsLndpa2ltZWRpYS5vcmcnLFxuICAnaW5jdWJhdG9yd2lraSc6ICdpbmN1YmF0b3Iud2lraW1lZGlhLm9yZycsXG4gICdpbnRlcm5hbHdpa2knOiAnaW50ZXJuYWwud2lraW1lZGlhLm9yZycsXG4gICdsYWJzd2lraSc6ICd3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xhYnRlc3R3aWtpJzogJ2xhYnRlc3R3aWtpdGVjaC53aWtpbWVkaWEub3JnJyxcbiAgJ2xlZ2FsdGVhbXdpa2knOiAnbGVnYWx0ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAnbG9naW53aWtpJzogJ2xvZ2luLndpa2ltZWRpYS5vcmcnLFxuICAnbWVkaWF3aWtpd2lraSc6ICdtZWRpYXdpa2kub3JnJyxcbiAgJ21ldGF3aWtpJzogJ21ldGEud2lraW1lZGlhLm9yZycsXG4gICdta3dpa2ltZWRpYSc6ICdtay53aWtpbWVkaWEub3JnJyxcbiAgJ21vdmVtZW50cm9sZXN3aWtpJzogJ21vdmVtZW50cm9sZXMud2lraW1lZGlhLm9yZycsXG4gICdteHdpa2ltZWRpYSc6ICdteC53aWtpbWVkaWEub3JnJyxcbiAgJ25sd2lraW1lZGlhJzogJ25sLndpa2ltZWRpYS5vcmcnLFxuICAnbm93aWtpbWVkaWEnOiAnbm8ud2lraW1lZGlhLm9yZycsXG4gICdub2JvYXJkX2NoYXB0ZXJzd2lraW1lZGlhJzogJ25vYm9hcmQtY2hhcHRlcnMud2lraW1lZGlhLm9yZycsXG4gICdub3N0YWxnaWF3aWtpJzogJ25vc3RhbGdpYS53aWtpcGVkaWEub3JnJyxcbiAgJ255Y3dpa2ltZWRpYSc6ICdueWMud2lraW1lZGlhLm9yZycsXG4gICduendpa2ltZWRpYSc6ICduei53aWtpbWVkaWEub3JnJyxcbiAgJ29mZmljZXdpa2knOiAnb2ZmaWNlLndpa2ltZWRpYS5vcmcnLFxuICAnb21idWRzbWVud2lraSc6ICdvbWJ1ZHNtZW4ud2lraW1lZGlhLm9yZycsXG4gICdvdHJzX3dpa2l3aWtpJzogJ290cnMtd2lraS53aWtpbWVkaWEub3JnJyxcbiAgJ291dHJlYWNod2lraSc6ICdvdXRyZWFjaC53aWtpbWVkaWEub3JnJyxcbiAgJ3BhX3Vzd2lraW1lZGlhJzogJ3BhLXVzLndpa2ltZWRpYS5vcmcnLFxuICAncGx3aWtpbWVkaWEnOiAncGwud2lraW1lZGlhLm9yZycsXG4gICdxdWFsaXR5d2lraSc6ICdxdWFsaXR5Lndpa2ltZWRpYS5vcmcnLFxuICAncnN3aWtpbWVkaWEnOiAncnMud2lraW1lZGlhLm9yZycsXG4gICdydXdpa2ltZWRpYSc6ICdydS53aWtpbWVkaWEub3JnJyxcbiAgJ3Nld2lraW1lZGlhJzogJ3NlLndpa2ltZWRpYS5vcmcnLFxuICAnc2VhcmNoY29td2lraSc6ICdzZWFyY2hjb20ud2lraW1lZGlhLm9yZycsXG4gICdzb3VyY2Vzd2lraSc6ICd3aWtpc291cmNlLm9yZycsXG4gICdzcGNvbXdpa2knOiAnc3Bjb20ud2lraW1lZGlhLm9yZycsXG4gICdzcGVjaWVzd2lraSc6ICdzcGVjaWVzLndpa2ltZWRpYS5vcmcnLFxuICAnc3Rld2FyZHdpa2knOiAnc3Rld2FyZC53aWtpbWVkaWEub3JnJyxcbiAgJ3N0cmF0ZWd5d2lraSc6ICdzdHJhdGVneS53aWtpbWVkaWEub3JnJyxcbiAgJ3Rlbndpa2knOiAndGVuLndpa2lwZWRpYS5vcmcnLFxuICAndGVzdHdpa2knOiAndGVzdC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3Qyd2lraSc6ICd0ZXN0Mi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3R3aWtpZGF0YXdpa2knOiAndGVzdC53aWtpZGF0YS5vcmcnLFxuICAndHJ3aWtpbWVkaWEnOiAndHIud2lraW1lZGlhLm9yZycsXG4gICd0cmFuc2l0aW9udGVhbXdpa2knOiAndHJhbnNpdGlvbnRlYW0ud2lraW1lZGlhLm9yZycsXG4gICd1YXdpa2ltZWRpYSc6ICd1YS53aWtpbWVkaWEub3JnJyxcbiAgJ3Vrd2lraW1lZGlhJzogJ3VrLndpa2ltZWRpYS5vcmcnLFxuICAndXNhYmlsaXR5d2lraSc6ICd1c2FiaWxpdHkud2lraW1lZGlhLm9yZycsXG4gICd2b3Rld2lraSc6ICd2b3RlLndpa2ltZWRpYS5vcmcnLFxuICAnd2dfZW53aWtpJzogJ3dnLWVuLndpa2lwZWRpYS5vcmcnLFxuICAnd2lraWRhdGF3aWtpJzogJ3dpa2lkYXRhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA1d2lraSc6ICd3aWtpbWFuaWEyMDA1Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwNndpa2knOiAnd2lraW1hbmlhMjAwNi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDd3aWtpJzogJ3dpa2ltYW5pYTIwMDcud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA4d2lraSc6ICd3aWtpbWFuaWEyMDA4Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwOXdpa2knOiAnd2lraW1hbmlhMjAwOS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTB3aWtpJzogJ3dpa2ltYW5pYTIwMTAud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDExd2lraSc6ICd3aWtpbWFuaWEyMDExLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMndpa2knOiAnd2lraW1hbmlhMjAxMi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTN3aWtpJzogJ3dpa2ltYW5pYTIwMTMud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE0d2lraSc6ICd3aWtpbWFuaWEyMDE0Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNXdpa2knOiAnd2lraW1hbmlhMjAxNS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTZ3aWtpJzogJ3dpa2ltYW5pYTIwMTYud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE3d2lraSc6ICd3aWtpbWFuaWEyMDE3Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhdGVhbXdpa2knOiAnd2lraW1hbmlhdGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ3plcm93aWtpJzogJ3plcm8ud2lraW1lZGlhLm9yZydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2l0ZU1hcDtcbiJdfQ==
