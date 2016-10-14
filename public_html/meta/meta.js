(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * @file Configuration for Metaviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

var templates = require('./templates');

/**
 * Configuration for Metaviews application.
 * This includes selectors, defaults, and other constants specific to Metaviews
 * @type {Object}
 */
var config = {
  chart: '.aqs-chart',
  circularLegend: templates.circularLegend,
  dateRangeSelector: '.aqs-date-range-selector',
  defaults: {
    dateRange: 'latest-20'
  },
  linearLegend: templates.linearLegend,
  logarithmicCheckbox: '.logarithmic-scale-option',
  select2Input: '.aqs-select2-selector',
  validateParams: ['tools'],
  validParams: {
    tools: ['pageviews', 'topviews', 'langviews', 'siteviews', 'massviews', 'redirectviews']
  }
};

module.exports = config;

},{"./templates":3}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Metaviews Analysis tool
 * @file Main file for Metaviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 */

var config = require('./config');
var Pv = require('../shared/pv');
var ChartHelpers = require('../shared/chart_helpers');

/** Main MetaViews class */

var MetaViews = function (_mix$with) {
  _inherits(MetaViews, _mix$with);

  function MetaViews() {
    _classCallCheck(this, MetaViews);

    var _this = _possibleConstructorReturn(this, (MetaViews.__proto__ || Object.getPrototypeOf(MetaViews)).call(this, config));

    _this.app = 'metaviews';
    _this.specialRange = null;
    return _this;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */


  _createClass(MetaViews, [{
    key: 'initialize',
    value: function initialize() {
      this.setupDateRangeSelector();
      this.setupSelect2();
      this.setupSelect2Colors();
      this.popParams();
      this.setupListeners();
    }

    /**
     * Get data formatted for a circular chart (Pie, Doughnut, PolarArea)
     *
     * @param {object} data - data just before we are ready to render the chart
     * @param {string} entity - title of entity (page or site)
     * @param {integer} index - where we are in the list of entities to show
     *    used for colour selection
     * @returns {object} - ready for chart rendering
     */

  }, {
    key: 'getCircularData',
    value: function getCircularData(data, entity, index) {
      var values = data.map(function (elem) {
        return elem.count;
      }),
          color = this.config.colors[index],
          value = values.reduce(function (a, b) {
        return a + b;
      }),
          average = Math.round(value / values.length);

      return Object.assign({
        label: entity.descore(),
        value: value,
        average: average
      }, this.config.chartConfig[this.chartType].dataset(color));
    }

    /**
     * Get data formatted for a linear chart (line, bar, radar)
     *
     * @param {object} data - data just before we are ready to render the chart
     * @param {string} entity - title of entity
     * @param {integer} index - where we are in the list of entities to show
     *    used for colour selection
     * @returns {object} - ready for chart rendering
     */

  }, {
    key: 'getLinearData',
    value: function getLinearData(data, entity, index) {
      var values = data.map(function (elem) {
        return elem.count;
      }),
          sum = values.reduce(function (a, b) {
        return a + b;
      }),
          average = Math.round(sum / values.length),
          max = Math.max.apply(Math, _toConsumableArray(values)),
          min = Math.min.apply(Math, _toConsumableArray(values)),
          color = this.config.colors[index % 10];

      return Object.assign({
        label: entity.descore(),
        data: values,
        sum: sum,
        average: average,
        max: max,
        min: min,
        color: color
      }, this.config.chartConfig[this.chartType].dataset(color));
    }

    /**
     * Parses the URL query string and sets all the inputs accordingly
     * Should only be called on initial page load, until we decide to support pop states (probably never)
     * @returns {null} nothing
     */

  }, {
    key: 'popParams',
    value: function popParams() {
      this.startSpinny();

      var params = this.parseQueryString('tools');

      this.validateDateRange(params);

      this.resetSelect2();

      this.setInitialChartType(params.tools.length);
      this.setSelect2Defaults(params.tools);
    }

    /**
     * Get all user-inputted parameters except the tools
     * @param {boolean} [specialRange] whether or not to include the special range instead of start/end, if applicable
     * @return {Object} platform, agent, etc.
     */

  }, {
    key: 'getParams',
    value: function getParams() {
      var specialRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var params = {};

      /**
       * Override start and end with custom range values, if configured (set by URL params or setupDateRangeSelector)
       * Valid values are those defined in this.config.specialRanges, constructed like `{range: 'last-month'}`,
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
     * Push relevant class properties to the query string
     * Called whenever we go to update the chart
     * @returns {null} nothing
     */

  }, {
    key: 'pushParams',
    value: function pushParams() {
      var tools = $(this.config.select2Input).select2('val') || [];

      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, '?' + $.param(this.getParams()) + '&tools=' + tools.join('|'));
      }

      $('.permalink').prop('href', '?' + $.param(this.getPermaLink()) + '&tools=' + tools.join('|'));
    }

    /**
     * Sets up the tool selector and adds listener to update chart
     * @returns {null} - nothing
     */

  }, {
    key: 'setupSelect2',
    value: function setupSelect2() {
      var select2Input = $(this.config.select2Input);

      var data = this.config.apps.map(function (app) {
        return {
          id: app,
          text: app
        };
      });

      var params = {
        data: data,
        placeholder: $.i18n('projects-placeholder'),
        maximumSelectionLength: this.config.apps.length,
        minimumInputLength: 1
      };

      select2Input.select2(params);
      select2Input.on('change', this.processInput.bind(this));
    }

    /**
     * Directly set items in Select2
     *
     * @param {array} items - page titles
     * @returns {array} - untouched array of items
     * @override
     */

  }, {
    key: 'setSelect2Defaults',
    value: function setSelect2Defaults(items) {
      $(this.config.select2Input).val(items).trigger('change');

      return items;
    }

    /**
     * General place to add page-wide listeners
     * @override
     * @returns {null} - nothing
     */

  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      _get(MetaViews.prototype.__proto__ || Object.getPrototypeOf(MetaViews.prototype), 'setupListeners', this).call(this);
    }

    /**
     * Query the API for each tool, building up the datasets and then calling renderData
     * @param {boolean} force - whether to force the chart to re-render, even if no params have changed
     * @returns {null} - nothin
     */

  }, {
    key: 'processInput',
    value: function processInput(force) {
      var _this2 = this,
          _$;

      this.pushParams();

      /** prevent duplicate querying due to conflicting listeners */
      if (!force && location.search === this.params && this.prevChartType === this.chartType) {
        return;
      }

      /** @type {Object} everything we need to keep track of for the promises */
      var xhrData = {
        entities: $(this.config.select2Input).select2('val') || [],
        labels: [], // Labels (dates) for the x-axis.
        datasets: [], // Data for each tool timeseries
        errors: [], // Queue up errors to show after all requests have been made
        fatalErrors: [], // Unrecoverable JavaScript errors
        promises: []
      };

      if (!xhrData.entities.length) {
        return this.resetView();
      }

      this.params = location.search;
      this.prevChartType = this.chartType;
      this.clearMessages(); // clear out old error messages
      this.destroyChart();
      this.startSpinny();

      /** Collect parameters from inputs. */
      var startDate = this.daterangepicker.startDate.startOf('day'),
          endDate = this.daterangepicker.endDate.startOf('day');

      xhrData.entities.forEach(function (tool, index) {
        var url = '//' + metaRoot + '/usage/' + tool + ('/' + startDate.format('YYYY-MM-DD') + '/' + endDate.format('YYYY-MM-DD'));

        var promise = $.ajax({
          url: url,
          dataType: 'json'
        });
        xhrData.promises.push(promise);

        promise.success(function (successData) {
          /** Build the tool's dataset. */
          if (_this2.config.linearCharts.includes(_this2.chartType)) {
            xhrData.datasets.push(_this2.getLinearData(successData, tool, index));
          } else {
            xhrData.datasets.push(_this2.getCircularData(successData, tool, index));
          }

          /** fetch the labels for the x-axis on success if we haven't already */
          if (!xhrData.labels.length) {
            xhrData.labels = successData.map(function (elem) {
              return moment(elem.date, 'YYYY-MM-DD').format(_this2.dateFormat);
            });
          }
        }).fail(function (data) {
          _this2.writeMessage('<a href=\'/' + tool.escape() + '\'>' + tool.escape() + '</a> - ' + $.i18n('api-error-no-data'));
          // remove this tool from the list of entities to analyze
          xhrData.entities = xhrData.entities.filter(function (el) {
            return el !== tool;
          });
        });
      });

      (_$ = $).whenAll.apply(_$, _toConsumableArray(xhrData.promises)).always(this.updateChart.bind(this, xhrData));
    }
  }]);

  return MetaViews;
}(mix(Pv).with(ChartHelpers));

$(document).ready(function () {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new MetaViews();
});

},{"../shared/chart_helpers":4,"../shared/pv":7,"./config":1}],3:[function(require,module,exports){
'use strict';

/**
 * @file Templates used by Chart.js for Metaviews app
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
  linearLegend: function linearLegend(datasets, scope) {
    var markup = '';

    if (datasets.length === 1) {
      var dataset = datasets[0];
      return '<div class="linear-legend--totals">\n        <strong>' + $.i18n('totals') + ':</strong>\n        ' + scope.formatNumber(dataset.sum) + ' (' + scope.formatNumber(dataset.average) + '/' + $.i18n('day') + ')\n      </div>';
    }

    if (datasets.length > 1) {
      var total = datasets.reduce(function (a, b) {
        return a + b.sum;
      }, 0);
      markup = '<div class="linear-legend--totals">\n        <strong>' + $.i18n('totals') + ':</strong>\n        ' + scope.formatNumber(total) + ' (' + scope.formatNumber(Math.round(total / scope.numDaysInRange())) + '/' + $.i18n('day') + ')\n      </div>';
    }
    markup += '<div class="linear-legends">';

    for (var i = 0; i < datasets.length; i++) {
      markup += '\n        <span class="linear-legend">\n          <div class="linear-legend--label" style="background-color:' + scope.rgba(datasets[i].color, 0.8) + '">\n            <a href="/' + datasets[i].label + '" target="_blank">' + datasets[i].label.upcase() + '</a>\n          </div>\n          <div class="linear-legend--counts">\n            ' + scope.formatNumber(datasets[i].sum) + ' (' + scope.formatNumber(datasets[i].average) + '/' + $.i18n('day') + ')\n          </div>\n          <div class="linear-legend--links"></div>\n        </span>\n      ';
    }
    return markup += '</div>';
  },

  circularLegend: function circularLegend(datasets, scope) {
    var dataset = datasets[0],
        total = dataset.data.reduce(function (a, b) {
      return a + b;
    });
    var markup = '<div class="linear-legend--totals">\n      <strong>' + $.i18n('totals') + ':</strong>\n      ' + scope.formatNumber(total) + ' (' + scope.formatNumber(Math.round(total / scope.numDaysInRange())) + '/' + $.i18n('day') + ')\n    </div>';

    markup += '<div class="linear-legends">';

    for (var i = 0; i < dataset.data.length; i++) {
      var metaKey = Object.keys(dataset._meta)[0];
      var label = dataset._meta[metaKey].data[i]._view.label;
      markup += '\n        <span class="linear-legend">\n          <div class="linear-legend--label" style="background-color:' + dataset.backgroundColor[i] + '">\n            <a href="/' + label + '" target="_blank">' + label.upcase() + '</a>\n          </div>\n          <div class="linear-legend--counts">\n            ' + scope.formatNumber(dataset.data[i]) + ' (' + scope.formatNumber(dataset.averages[i]) + '/' + $.i18n('day') + ')\n          </div>\n          <div class="linear-legend--links"></div>\n        </span>\n      ';
    }
    return markup += '</div>';
  }
};

module.exports = templates;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./core_extensions":5,"./polyfills":6,"./pv_config":8,"./site_map":9}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9tZXRhL2NvbmZpZy5qcyIsImphdmFzY3JpcHRzL21ldGEvbWV0YS5qcyIsImphdmFzY3JpcHRzL21ldGEvdGVtcGxhdGVzLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL2NoYXJ0X2hlbHBlcnMuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvY29yZV9leHRlbnNpb25zLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3BvbHlmaWxscy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdi5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdl9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvc2l0ZV9tYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ01BLElBQU0sWUFBWSxRQUFRLGFBQVIsQ0FBbEI7Ozs7Ozs7QUFPQSxJQUFNLFNBQVM7QUFDYixTQUFPLFlBRE07QUFFYixrQkFBZ0IsVUFBVSxjQUZiO0FBR2IscUJBQW1CLDBCQUhOO0FBSWIsWUFBVTtBQUNSLGVBQVc7QUFESCxHQUpHO0FBT2IsZ0JBQWMsVUFBVSxZQVBYO0FBUWIsdUJBQXFCLDJCQVJSO0FBU2IsZ0JBQWMsdUJBVEQ7QUFVYixrQkFBZ0IsQ0FBQyxPQUFELENBVkg7QUFXYixlQUFhO0FBQ1gsV0FBTyxDQUFDLFdBQUQsRUFBYyxVQUFkLEVBQTBCLFdBQTFCLEVBQXVDLFdBQXZDLEVBQW9ELFdBQXBELEVBQWlFLGVBQWpFO0FBREk7QUFYQSxDQUFmOztBQWdCQSxPQUFPLE9BQVAsR0FBaUIsTUFBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkEsSUFBTSxTQUFTLFFBQVEsVUFBUixDQUFmO0FBQ0EsSUFBTSxLQUFLLFFBQVEsY0FBUixDQUFYO0FBQ0EsSUFBTSxlQUFlLFFBQVEseUJBQVIsQ0FBckI7Ozs7SUFHTSxTOzs7QUFDSix1QkFBYztBQUFBOztBQUFBLHNI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Q2QsaUJBQVMsVUFsQ0s7QUFtQ2QsaUJBQVMsV0FuQ0s7QUFvQ2QsaUJBQVMsYUFwQ0s7QUFxQ2QsaUJBQVMsWUFyQ0s7QUFzQ2QsaUJBQVMsWUF0Q0s7QUF1Q2QsaUJBQVMsWUF2Q0s7QUF3Q2QsaUJBQVMsWUF4Q0s7QUF5Q2Qsc0JBQWMsWUF6Q0E7QUEwQ2QsaUJBQVMsWUExQ0s7QUEyQ2QsaUJBQVMsWUEzQ0s7QUE0Q2QsaUJBQVMsWUE1Q0s7QUE2Q2QsaUJBQVMsWUE3Q0s7QUE4Q2QsaUJBQVMsWUE5Q0s7QUErQ2QsaUJBQVMsWUEvQ0s7QUFnRGQsaUJBQVMsWUFoREs7QUFpRGQsaUJBQVMsWUFqREs7QUFrRGQsaUJBQVMsVUFsREs7QUFtRGQsaUJBQVMsVUFuREs7QUFvRGQsc0JBQWMsWUFwREE7QUFxRGQsaUJBQVMsWUFyREs7QUFzRGQsaUJBQVMsVUF0REs7QUF1RGQsaUJBQVMsVUF2REs7QUF3RGQsaUJBQVMsWUF4REs7QUF5RGQsaUJBQVMsVUF6REs7QUEwRGQsaUJBQVMsVUExREs7QUEyRGQsaUJBQVMsWUEzREs7QUE0RGQsaUJBQVMsWUE1REs7QUE2RGQsaUJBQVMsVUE3REs7QUE4RGQsaUJBQVMsVUE5REs7QUErRGQsa0JBQVUsWUEvREk7QUFnRWQsa0JBQVUsWUFoRUk7QUFpRWQsaUJBQVMsVUFqRUs7QUFrRWQsaUJBQVMsWUFsRUs7QUFtRWQsaUJBQVMsVUFuRUs7QUFvRWQsaUJBQVMsWUFwRUs7QUFxRWQsaUJBQVMsWUFyRUs7QUFzRWQsaUJBQVMsWUF0RUs7QUF1RWQsaUJBQVMsV0F2RUs7QUF3RWQsaUJBQVMsWUF4RUs7QUF5RWQsaUJBQVMsV0F6RUs7QUEwRWQsaUJBQVMsWUExRUs7QUEyRWQsaUJBQVMsWUEzRUs7QUE0RWQsc0JBQWMsVUE1RUE7QUE2RWQsaUJBQVMsVUE3RUs7QUE4RWQsc0JBQWMsWUE5RUE7QUErRWQsaUJBQVMsWUEvRUs7QUFnRmQsc0JBQWMsWUFoRkE7QUFpRmQsaUJBQVMsWUFqRks7QUFrRmQsaUJBQVMsVUFsRks7QUFtRmQsaUJBQVMsWUFuRks7QUFvRmQsaUJBQVMsV0FwRks7QUFxRmQsaUJBQVMsWUFyRks7QUFzRmQsaUJBQVMsWUF0Rks7QUF1RmQsc0JBQWMsVUF2RkE7QUF3RmQsaUJBQVMsWUF4Rks7QUF5RmQsaUJBQVMsVUF6Rks7QUEwRmQsaUJBQVMsWUExRks7QUEyRmQsaUJBQVMsWUEzRks7QUE0RmQsaUJBQVMsWUE1Rks7QUE2RmQsaUJBQVMsWUE3Rks7QUE4RmQsaUJBQVMsWUE5Rks7QUErRmQsaUJBQVMsVUEvRks7QUFnR2QsaUJBQVMsWUFoR0s7QUFpR2QsaUJBQVMsV0FqR0s7QUFrR2QsaUJBQVMsWUFsR0s7QUFtR2QsaUJBQVMsWUFuR0s7QUFvR2QsaUJBQVMsWUFwR0s7QUFxR2QsaUJBQVMsWUFyR0s7QUFzR2QsaUJBQVMsWUF0R0s7QUF1R2QsaUJBQVMsWUF2R0s7QUF3R2QsaUJBQVMsWUF4R0s7QUF5R2QsaUJBQVMsWUF6R0s7QUEwR2QsaUJBQVMsWUExR0s7QUEyR2QsaUJBQVMsWUEzR0s7QUE0R2QsaUJBQVMsWUE1R0s7QUE2R2QsaUJBQVMsWUE3R0s7QUE4R2QsaUJBQVMsWUE5R0s7QUErR2Qsa0JBQVUsWUEvR0k7QUFnSGQsaUJBQVMsWUFoSEs7QUFpSGQsaUJBQVMsWUFqSEs7QUFrSGQsaUJBQVMsWUFsSEs7QUFtSGQsaUJBQVMsWUFuSEs7QUFvSGQsaUJBQVMsWUFwSEs7QUFxSGQsaUJBQVMsWUFySEs7QUFzSGQsaUJBQVMsWUF0SEs7QUF1SGQsaUJBQVMsWUF2SEs7QUF3SGQsaUJBQVMsVUF4SEs7QUF5SGQsaUJBQVMsWUF6SEs7QUEwSGQsaUJBQVMsWUExSEs7QUEySGQsaUJBQVMsVUEzSEs7QUE0SGQsaUJBQVMsWUE1SEs7QUE2SGQsaUJBQVMsWUE3SEs7QUE4SGQsaUJBQVMsWUE5SEs7QUErSGQsaUJBQVMsWUEvSEs7QUFnSWQsaUJBQVMsWUFoSUs7QUFpSWQsaUJBQVMsWUFqSUs7QUFrSWQsaUJBQVMsWUFsSUs7QUFtSWQsaUJBQVMsWUFuSUs7QUFvSWQsaUJBQVMsWUFwSUs7QUFxSWQsaUJBQVMsWUFySUs7QUFzSWQsaUJBQVMsWUF0SUs7QUF1SWQsaUJBQVMsVUF2SUs7QUF3SWQsdUJBQWUsWUF4SUQ7QUF5SWQsc0JBQWMsV0F6SUE7QUEwSWQsa0JBQVUsWUExSUk7QUEySWQsc0JBQWMsVUEzSUE7QUE0SWQsaUJBQVMsWUE1SUs7QUE2SWQsaUJBQVMsVUE3SUs7QUE4SWQsa0JBQVUsVUE5SUk7QUErSWQsaUJBQVMsVUEvSUs7QUFnSmQsaUJBQVMsWUFoSks7QUFpSmQsaUJBQVMsVUFqSks7QUFrSmQsa0JBQVUsWUFsSkk7QUFtSmQsa0JBQVUsWUFuSkk7QUFvSmQsa0JBQVUsWUFwSkk7QUFxSmQsaUJBQVMsWUFySks7QUFzSmQsaUJBQVMsWUF0Sks7QUF1SmQsaUJBQVMsWUF2Sks7QUF3SmQsaUJBQVMsWUF4Sks7QUF5SmQsaUJBQVMsWUF6Sks7QUEwSmQsaUJBQVMsWUExSks7QUEySmQsa0JBQVUsVUEzSkk7QUE0SmQsa0JBQVUsVUE1Skk7QUE2SmQsa0JBQVUsWUE3Skk7QUE4SmQsaUJBQVMsVUE5Sks7QUErSmQsa0JBQVUsWUEvSkk7QUFnS2QsaUJBQVMsVUFoS0s7QUFpS2QsaUJBQVMsWUFqS0s7QUFrS2QsaUJBQVMsWUFsS0s7QUFtS2QsaUJBQVMsVUFuS0s7QUFvS2Qsa0JBQVUsWUFwS0k7QUFxS2Qsa0JBQVUsWUFyS0k7QUFzS2QsaUJBQVMsVUF0S0s7QUF1S2Qsc0JBQWMsVUF2S0E7QUF3S2Qsa0JBQVUsVUF4S0k7QUF5S2QsaUJBQVMsVUF6S0s7QUEwS2QsaUJBQVMsVUExS0s7QUEyS2QsaUJBQVMsVUEzS0s7QUE0S2QsaUJBQVMsWUE1S0s7QUE2S2Qsc0JBQWMsVUE3S0E7QUE4S2Qsc0JBQWMsVUE5S0E7QUErS2QsaUJBQVMsWUEvS0s7QUFnTGQsc0JBQWMsVUFoTEE7QUFpTGQsaUJBQVMsWUFqTEs7QUFrTGQsaUJBQVMsWUFsTEs7QUFtTGQsaUJBQVMsWUFuTEs7QUFvTGQsaUJBQVMsVUFwTEs7QUFxTGQsa0JBQVUsVUFyTEk7QUFzTGQsaUJBQVMsWUF0TEs7QUF1TGQsaUJBQVMsVUF2TEs7QUF3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QUFxQiw2QkFwM0JQO0FBcTNCZCx1QkFBcUIsNkJBcjNCUDtBQXMzQmQsdUJBQXFCLDZCQXQzQlA7QUF1M0JkLHVCQUFxQiw2QkF2M0JQO0FBdzNCZCx1QkFBcUIsNkJBeDNCUDtBQXkzQmQsdUJBQXFCLDZCQXozQlA7QUEwM0JkLHVCQUFxQiw2QkExM0JQO0FBMjNCZCx1QkFBcUIsNkJBMzNCUDtBQTQzQmQsdUJBQXFCLDZCQTUzQlA7QUE2M0JkLHVCQUFxQiw2QkE3M0JQO0FBODNCZCx1QkFBcUIsNkJBOTNCUDtBQSszQmQsY0FBWTtBQS8zQkUsQ0FBaEI7O0FBazRCQSxPQUFPLE9BQVAsR0FBaUIsT0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZSBDb25maWd1cmF0aW9uIGZvciBNZXRhdmlld3MgYXBwbGljYXRpb25cbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICovXG5cbmNvbnN0IHRlbXBsYXRlcyA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzJyk7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgTWV0YXZpZXdzIGFwcGxpY2F0aW9uLlxuICogVGhpcyBpbmNsdWRlcyBzZWxlY3RvcnMsIGRlZmF1bHRzLCBhbmQgb3RoZXIgY29uc3RhbnRzIHNwZWNpZmljIHRvIE1ldGF2aWV3c1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgY29uZmlnID0ge1xuICBjaGFydDogJy5hcXMtY2hhcnQnLFxuICBjaXJjdWxhckxlZ2VuZDogdGVtcGxhdGVzLmNpcmN1bGFyTGVnZW5kLFxuICBkYXRlUmFuZ2VTZWxlY3RvcjogJy5hcXMtZGF0ZS1yYW5nZS1zZWxlY3RvcicsXG4gIGRlZmF1bHRzOiB7XG4gICAgZGF0ZVJhbmdlOiAnbGF0ZXN0LTIwJ1xuICB9LFxuICBsaW5lYXJMZWdlbmQ6IHRlbXBsYXRlcy5saW5lYXJMZWdlbmQsXG4gIGxvZ2FyaXRobWljQ2hlY2tib3g6ICcubG9nYXJpdGhtaWMtc2NhbGUtb3B0aW9uJyxcbiAgc2VsZWN0MklucHV0OiAnLmFxcy1zZWxlY3QyLXNlbGVjdG9yJyxcbiAgdmFsaWRhdGVQYXJhbXM6IFsndG9vbHMnXSxcbiAgdmFsaWRQYXJhbXM6IHtcbiAgICB0b29sczogWydwYWdldmlld3MnLCAndG9wdmlld3MnLCAnbGFuZ3ZpZXdzJywgJ3NpdGV2aWV3cycsICdtYXNzdmlld3MnLCAncmVkaXJlY3R2aWV3cyddXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xuIiwiLyoqXG4gKiBNZXRhdmlld3MgQW5hbHlzaXMgdG9vbFxuICogQGZpbGUgTWFpbiBmaWxlIGZvciBNZXRhdmlld3MgYXBwbGljYXRpb25cbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmNvbnN0IFB2ID0gcmVxdWlyZSgnLi4vc2hhcmVkL3B2Jyk7XG5jb25zdCBDaGFydEhlbHBlcnMgPSByZXF1aXJlKCcuLi9zaGFyZWQvY2hhcnRfaGVscGVycycpO1xuXG4vKiogTWFpbiBNZXRhVmlld3MgY2xhc3MgKi9cbmNsYXNzIE1ldGFWaWV3cyBleHRlbmRzIG1peChQdikud2l0aChDaGFydEhlbHBlcnMpIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgICB0aGlzLmFwcCA9ICdtZXRhdmlld3MnO1xuICAgIHRoaXMuc3BlY2lhbFJhbmdlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQ2FsbGVkIGluIGBwdi5qc2AgYWZ0ZXIgdHJhbnNsYXRpb25zIGhhdmUgbG9hZGVkXG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5zZXR1cERhdGVSYW5nZVNlbGVjdG9yKCk7XG4gICAgdGhpcy5zZXR1cFNlbGVjdDIoKTtcbiAgICB0aGlzLnNldHVwU2VsZWN0MkNvbG9ycygpO1xuICAgIHRoaXMucG9wUGFyYW1zKCk7XG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRhIGZvcm1hdHRlZCBmb3IgYSBjaXJjdWxhciBjaGFydCAoUGllLCBEb3VnaG51dCwgUG9sYXJBcmVhKVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGRhdGEganVzdCBiZWZvcmUgd2UgYXJlIHJlYWR5IHRvIHJlbmRlciB0aGUgY2hhcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVudGl0eSAtIHRpdGxlIG9mIGVudGl0eSAocGFnZSBvciBzaXRlKVxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IC0gd2hlcmUgd2UgYXJlIGluIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIHNob3dcbiAgICogICAgdXNlZCBmb3IgY29sb3VyIHNlbGVjdGlvblxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIHJlYWR5IGZvciBjaGFydCByZW5kZXJpbmdcbiAgICovXG4gIGdldENpcmN1bGFyRGF0YShkYXRhLCBlbnRpdHksIGluZGV4KSB7XG4gICAgY29uc3QgdmFsdWVzID0gZGF0YS5tYXAoZWxlbSA9PiBlbGVtLmNvdW50KSxcbiAgICAgIGNvbG9yID0gdGhpcy5jb25maWcuY29sb3JzW2luZGV4XSxcbiAgICAgIHZhbHVlID0gdmFsdWVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpLFxuICAgICAgYXZlcmFnZSA9IE1hdGgucm91bmQodmFsdWUgLyB2YWx1ZXMubGVuZ3RoKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtcbiAgICAgIGxhYmVsOiBlbnRpdHkuZGVzY29yZSgpLFxuICAgICAgdmFsdWUsXG4gICAgICBhdmVyYWdlXG4gICAgfSwgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQoY29sb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBmb3JtYXR0ZWQgZm9yIGEgbGluZWFyIGNoYXJ0IChsaW5lLCBiYXIsIHJhZGFyKVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGRhdGEganVzdCBiZWZvcmUgd2UgYXJlIHJlYWR5IHRvIHJlbmRlciB0aGUgY2hhcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGVudGl0eSAtIHRpdGxlIG9mIGVudGl0eVxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4IC0gd2hlcmUgd2UgYXJlIGluIHRoZSBsaXN0IG9mIGVudGl0aWVzIHRvIHNob3dcbiAgICogICAgdXNlZCBmb3IgY29sb3VyIHNlbGVjdGlvblxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIHJlYWR5IGZvciBjaGFydCByZW5kZXJpbmdcbiAgICovXG4gIGdldExpbmVhckRhdGEoZGF0YSwgZW50aXR5LCBpbmRleCkge1xuICAgIGNvbnN0IHZhbHVlcyA9IGRhdGEubWFwKGVsZW0gPT4gZWxlbS5jb3VudCksXG4gICAgICBzdW0gPSB2YWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICBhdmVyYWdlID0gTWF0aC5yb3VuZChzdW0gLyB2YWx1ZXMubGVuZ3RoKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyksXG4gICAgICBtaW4gPSBNYXRoLm1pbiguLi52YWx1ZXMpLFxuICAgICAgY29sb3IgPSB0aGlzLmNvbmZpZy5jb2xvcnNbaW5kZXggJSAxMF07XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7XG4gICAgICBsYWJlbDogZW50aXR5LmRlc2NvcmUoKSxcbiAgICAgIGRhdGE6IHZhbHVlcyxcbiAgICAgIHN1bSxcbiAgICAgIGF2ZXJhZ2UsXG4gICAgICBtYXgsXG4gICAgICBtaW4sXG4gICAgICBjb2xvclxuICAgIH0sIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW3RoaXMuY2hhcnRUeXBlXS5kYXRhc2V0KGNvbG9yKSk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBVUkwgcXVlcnkgc3RyaW5nIGFuZCBzZXRzIGFsbCB0aGUgaW5wdXRzIGFjY29yZGluZ2x5XG4gICAqIFNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBpbml0aWFsIHBhZ2UgbG9hZCwgdW50aWwgd2UgZGVjaWRlIHRvIHN1cHBvcnQgcG9wIHN0YXRlcyAocHJvYmFibHkgbmV2ZXIpXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwb3BQYXJhbXMoKSB7XG4gICAgdGhpcy5zdGFydFNwaW5ueSgpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKCd0b29scycpO1xuXG4gICAgdGhpcy52YWxpZGF0ZURhdGVSYW5nZShwYXJhbXMpO1xuXG4gICAgdGhpcy5yZXNldFNlbGVjdDIoKTtcblxuICAgIHRoaXMuc2V0SW5pdGlhbENoYXJ0VHlwZShwYXJhbXMudG9vbHMubGVuZ3RoKTtcbiAgICB0aGlzLnNldFNlbGVjdDJEZWZhdWx0cyhwYXJhbXMudG9vbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdXNlci1pbnB1dHRlZCBwYXJhbWV0ZXJzIGV4Y2VwdCB0aGUgdG9vbHNcbiAgICogQHBhcmFtIHtib29sZWFufSBbc3BlY2lhbFJhbmdlXSB3aGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIHRoZSBzcGVjaWFsIHJhbmdlIGluc3RlYWQgb2Ygc3RhcnQvZW5kLCBpZiBhcHBsaWNhYmxlXG4gICAqIEByZXR1cm4ge09iamVjdH0gcGxhdGZvcm0sIGFnZW50LCBldGMuXG4gICAqL1xuICBnZXRQYXJhbXMoc3BlY2lhbFJhbmdlID0gdHJ1ZSkge1xuICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHN0YXJ0IGFuZCBlbmQgd2l0aCBjdXN0b20gcmFuZ2UgdmFsdWVzLCBpZiBjb25maWd1cmVkIChzZXQgYnkgVVJMIHBhcmFtcyBvciBzZXR1cERhdGVSYW5nZVNlbGVjdG9yKVxuICAgICAqIFZhbGlkIHZhbHVlcyBhcmUgdGhvc2UgZGVmaW5lZCBpbiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLCBjb25zdHJ1Y3RlZCBsaWtlIGB7cmFuZ2U6ICdsYXN0LW1vbnRoJ31gLFxuICAgICAqICAgb3IgYSByZWxhdGl2ZSByYW5nZSBsaWtlIGB7cmFuZ2U6ICdsYXRlc3QtTid9YCB3aGVyZSBOIGlzIHRoZSBudW1iZXIgb2YgZGF5cy5cbiAgICAgKi9cbiAgICBpZiAodGhpcy5zcGVjaWFsUmFuZ2UgJiYgc3BlY2lhbFJhbmdlKSB7XG4gICAgICBwYXJhbXMucmFuZ2UgPSB0aGlzLnNwZWNpYWxSYW5nZS5yYW5nZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLnN0YXJ0ID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgcGFyYW1zLmVuZCA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgfVxuXG4gICAgLyoqIGFkZCBhdXRvbG9nIHBhcmFtIG9ubHkgaWYgaXQgd2FzIHBhc3NlZCBpbiBvcmlnaW5hbGx5LCBhbmQgb25seSBpZiBpdCB3YXMgZmFsc2UgKHRydWUgd291bGQgYmUgZGVmYXVsdCkgKi9cbiAgICBpZiAodGhpcy5ub0xvZ1NjYWxlKSBwYXJhbXMuYXV0b2xvZyA9ICdmYWxzZSc7XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1c2ggcmVsZXZhbnQgY2xhc3MgcHJvcGVydGllcyB0byB0aGUgcXVlcnkgc3RyaW5nXG4gICAqIENhbGxlZCB3aGVuZXZlciB3ZSBnbyB0byB1cGRhdGUgdGhlIGNoYXJ0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwdXNoUGFyYW1zKCkge1xuICAgIGNvbnN0IHRvb2xzID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcpIHx8IFtdO1xuXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgYD8keyQucGFyYW0odGhpcy5nZXRQYXJhbXMoKSl9JnRvb2xzPSR7dG9vbHMuam9pbignfCcpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgPyR7JC5wYXJhbSh0aGlzLmdldFBlcm1hTGluaygpKX0mdG9vbHM9JHt0b29scy5qb2luKCd8Jyl9YCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgdG9vbCBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lciB0byB1cGRhdGUgY2hhcnRcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBTZWxlY3QyKCkge1xuICAgIGNvbnN0IHNlbGVjdDJJbnB1dCA9ICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcblxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmNvbmZpZy5hcHBzLm1hcChhcHAgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGFwcCxcbiAgICAgICAgdGV4dDogYXBwXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIGRhdGEsXG4gICAgICBwbGFjZWhvbGRlcjogJC5pMThuKCdwcm9qZWN0cy1wbGFjZWhvbGRlcicpLFxuICAgICAgbWF4aW11bVNlbGVjdGlvbkxlbmd0aDogdGhpcy5jb25maWcuYXBwcy5sZW5ndGgsXG4gICAgICBtaW5pbXVtSW5wdXRMZW5ndGg6IDFcbiAgICB9O1xuXG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIocGFyYW1zKTtcbiAgICBzZWxlY3QySW5wdXQub24oJ2NoYW5nZScsIHRoaXMucHJvY2Vzc0lucHV0LmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpcmVjdGx5IHNldCBpdGVtcyBpbiBTZWxlY3QyXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGl0ZW1zIC0gcGFnZSB0aXRsZXNcbiAgICogQHJldHVybnMge2FycmF5fSAtIHVudG91Y2hlZCBhcnJheSBvZiBpdGVtc1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHNldFNlbGVjdDJEZWZhdWx0cyhpdGVtcykge1xuICAgICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KS52YWwoaXRlbXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYWwgcGxhY2UgdG8gYWRkIHBhZ2Utd2lkZSBsaXN0ZW5lcnNcbiAgICogQG92ZXJyaWRlXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwTGlzdGVuZXJzKCkge1xuICAgIHN1cGVyLnNldHVwTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogUXVlcnkgdGhlIEFQSSBmb3IgZWFjaCB0b29sLCBidWlsZGluZyB1cCB0aGUgZGF0YXNldHMgYW5kIHRoZW4gY2FsbGluZyByZW5kZXJEYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2UgLSB3aGV0aGVyIHRvIGZvcmNlIHRoZSBjaGFydCB0byByZS1yZW5kZXIsIGV2ZW4gaWYgbm8gcGFyYW1zIGhhdmUgY2hhbmdlZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5cbiAgICovXG4gIHByb2Nlc3NJbnB1dChmb3JjZSkge1xuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuXG4gICAgLyoqIHByZXZlbnQgZHVwbGljYXRlIHF1ZXJ5aW5nIGR1ZSB0byBjb25mbGljdGluZyBsaXN0ZW5lcnMgKi9cbiAgICBpZiAoIWZvcmNlICYmIGxvY2F0aW9uLnNlYXJjaCA9PT0gdGhpcy5wYXJhbXMgJiYgdGhpcy5wcmV2Q2hhcnRUeXBlID09PSB0aGlzLmNoYXJ0VHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSBldmVyeXRoaW5nIHdlIG5lZWQgdG8ga2VlcCB0cmFjayBvZiBmb3IgdGhlIHByb21pc2VzICovXG4gICAgbGV0IHhockRhdGEgPSB7XG4gICAgICBlbnRpdGllczogJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcpIHx8IFtdLFxuICAgICAgbGFiZWxzOiBbXSwgLy8gTGFiZWxzIChkYXRlcykgZm9yIHRoZSB4LWF4aXMuXG4gICAgICBkYXRhc2V0czogW10sIC8vIERhdGEgZm9yIGVhY2ggdG9vbCB0aW1lc2VyaWVzXG4gICAgICBlcnJvcnM6IFtdLCAvLyBRdWV1ZSB1cCBlcnJvcnMgdG8gc2hvdyBhZnRlciBhbGwgcmVxdWVzdHMgaGF2ZSBiZWVuIG1hZGVcbiAgICAgIGZhdGFsRXJyb3JzOiBbXSwgLy8gVW5yZWNvdmVyYWJsZSBKYXZhU2NyaXB0IGVycm9yc1xuICAgICAgcHJvbWlzZXM6IFtdXG4gICAgfTtcblxuICAgIGlmICgheGhyRGF0YS5lbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc2V0VmlldygpO1xuICAgIH1cblxuICAgIHRoaXMucGFyYW1zID0gbG9jYXRpb24uc2VhcmNoO1xuICAgIHRoaXMucHJldkNoYXJ0VHlwZSA9IHRoaXMuY2hhcnRUeXBlO1xuICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpOyAvLyBjbGVhciBvdXQgb2xkIGVycm9yIG1lc3NhZ2VzXG4gICAgdGhpcy5kZXN0cm95Q2hhcnQoKTtcbiAgICB0aGlzLnN0YXJ0U3Bpbm55KCk7XG5cbiAgICAvKiogQ29sbGVjdCBwYXJhbWV0ZXJzIGZyb20gaW5wdXRzLiAqL1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKSxcbiAgICAgIGVuZERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLnN0YXJ0T2YoJ2RheScpO1xuXG4gICAgeGhyRGF0YS5lbnRpdGllcy5mb3JFYWNoKCh0b29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gYC8vJHttZXRhUm9vdH0vdXNhZ2UvJHt0b29sfWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpfS8ke2VuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyl9YDtcblxuICAgICAgY29uc3QgcHJvbWlzZSA9ICQuYWpheCh7XG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgfSk7XG4gICAgICB4aHJEYXRhLnByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cbiAgICAgIHByb21pc2Uuc3VjY2VzcyhzdWNjZXNzRGF0YSA9PiB7XG4gICAgICAgIC8qKiBCdWlsZCB0aGUgdG9vbCdzIGRhdGFzZXQuICovXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5saW5lYXJDaGFydHMuaW5jbHVkZXModGhpcy5jaGFydFR5cGUpKSB7XG4gICAgICAgICAgeGhyRGF0YS5kYXRhc2V0cy5wdXNoKHRoaXMuZ2V0TGluZWFyRGF0YShzdWNjZXNzRGF0YSwgdG9vbCwgaW5kZXgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4aHJEYXRhLmRhdGFzZXRzLnB1c2godGhpcy5nZXRDaXJjdWxhckRhdGEoc3VjY2Vzc0RhdGEsIHRvb2wsIGluZGV4KSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiogZmV0Y2ggdGhlIGxhYmVscyBmb3IgdGhlIHgtYXhpcyBvbiBzdWNjZXNzIGlmIHdlIGhhdmVuJ3QgYWxyZWFkeSAqL1xuICAgICAgICBpZiAoIXhockRhdGEubGFiZWxzLmxlbmd0aCkge1xuICAgICAgICAgIHhockRhdGEubGFiZWxzID0gc3VjY2Vzc0RhdGEubWFwKGVsZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudChlbGVtLmRhdGUsICdZWVlZLU1NLUREJykuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgIGA8YSBocmVmPScvJHt0b29sLmVzY2FwZSgpfSc+JHt0b29sLmVzY2FwZSgpfTwvYT4gLSAkeyQuaTE4bignYXBpLWVycm9yLW5vLWRhdGEnKX1gXG4gICAgICAgICk7XG4gICAgICAgIC8vIHJlbW92ZSB0aGlzIHRvb2wgZnJvbSB0aGUgbGlzdCBvZiBlbnRpdGllcyB0byBhbmFseXplXG4gICAgICAgIHhockRhdGEuZW50aXRpZXMgPSB4aHJEYXRhLmVudGl0aWVzLmZpbHRlcihlbCA9PiBlbCAhPT0gdG9vbCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgICQud2hlbkFsbCguLi54aHJEYXRhLnByb21pc2VzKS5hbHdheXModGhpcy51cGRhdGVDaGFydC5iaW5kKHRoaXMsIHhockRhdGEpKTtcbiAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gIC8qKiBhc3N1bWUgaGFzaCBwYXJhbXMgYXJlIHN1cHBvc2VkIHRvIGJlIHF1ZXJ5IHBhcmFtcyAqL1xuICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaGFzaCAmJiAhZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoJyMnLCAnPycpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2gpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvXFwjLiovLCAnJyk7XG4gIH1cblxuICBuZXcgTWV0YVZpZXdzKCk7XG59KTtcbiIsIi8qKlxuICogQGZpbGUgVGVtcGxhdGVzIHVzZWQgYnkgQ2hhcnQuanMgZm9yIE1ldGF2aWV3cyBhcHBcbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICovXG5cbi8qKlxuICogVGVtcGxhdGVzIHVzZWQgYnkgQ2hhcnQuanMuXG4gKiBGdW5jdGlvbnMgdXNlZCB3aXRoaW4gb3VyIGFwcCBtdXN0IGJlIGluIHRoZSBnbG9iYWwgc2NvcGUuXG4gKiBBbGwgcXVvdGF0aW9ucyBtdXN0IGJlIGRvdWJsZS1xdW90ZXMgb3IgcHJvcGVybHkgZXNjYXBlZC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRlbXBsYXRlcyA9IHtcbiAgbGluZWFyTGVnZW5kOiAoZGF0YXNldHMsIHNjb3BlKSA9PiB7XG4gICAgbGV0IG1hcmt1cCA9ICcnO1xuXG4gICAgaWYgKGRhdGFzZXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZGF0YXNldCA9IGRhdGFzZXRzWzBdO1xuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tdG90YWxzXCI+XG4gICAgICAgIDxzdHJvbmc+JHskLmkxOG4oJ3RvdGFscycpfTo8L3N0cm9uZz5cbiAgICAgICAgJHtzY29wZS5mb3JtYXROdW1iZXIoZGF0YXNldC5zdW0pfSAoJHtzY29wZS5mb3JtYXROdW1iZXIoZGF0YXNldC5hdmVyYWdlKX0vJHskLmkxOG4oJ2RheScpfSlcbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFzZXRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHRvdGFsID0gZGF0YXNldHMucmVkdWNlKChhLGIpID0+IGEgKyBiLnN1bSwgMCk7XG4gICAgICBtYXJrdXAgPSBgPGRpdiBjbGFzcz1cImxpbmVhci1sZWdlbmQtLXRvdGFsc1wiPlxuICAgICAgICA8c3Ryb25nPiR7JC5pMThuKCd0b3RhbHMnKX06PC9zdHJvbmc+XG4gICAgICAgICR7c2NvcGUuZm9ybWF0TnVtYmVyKHRvdGFsKX0gKCR7c2NvcGUuZm9ybWF0TnVtYmVyKE1hdGgucm91bmQodG90YWwgLyBzY29wZS5udW1EYXlzSW5SYW5nZSgpKSl9LyR7JC5pMThuKCdkYXknKX0pXG4gICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBtYXJrdXAgKz0gJzxkaXYgY2xhc3M9XCJsaW5lYXItbGVnZW5kc1wiPic7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBtYXJrdXAgKz0gYFxuICAgICAgICA8c3BhbiBjbGFzcz1cImxpbmVhci1sZWdlbmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tbGFiZWxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtzY29wZS5yZ2JhKGRhdGFzZXRzW2ldLmNvbG9yLCAwLjgpfVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIi8keyhkYXRhc2V0c1tpXS5sYWJlbCl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtkYXRhc2V0c1tpXS5sYWJlbC51cGNhc2UoKX08L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVhci1sZWdlbmQtLWNvdW50c1wiPlxuICAgICAgICAgICAgJHtzY29wZS5mb3JtYXROdW1iZXIoZGF0YXNldHNbaV0uc3VtKX0gKCR7c2NvcGUuZm9ybWF0TnVtYmVyKGRhdGFzZXRzW2ldLmF2ZXJhZ2UpfS8keyQuaTE4bignZGF5Jyl9KVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lYXItbGVnZW5kLS1saW5rc1wiPjwvZGl2PlxuICAgICAgICA8L3NwYW4+XG4gICAgICBgO1xuICAgIH1cbiAgICByZXR1cm4gbWFya3VwICs9ICc8L2Rpdj4nO1xuICB9LFxuXG4gIGNpcmN1bGFyTGVnZW5kKGRhdGFzZXRzLCBzY29wZSkge1xuICAgIGNvbnN0IGRhdGFzZXQgPSBkYXRhc2V0c1swXSxcbiAgICAgIHRvdGFsID0gZGF0YXNldC5kYXRhLnJlZHVjZSgoYSxiKSA9PiBhICsgYik7XG4gICAgbGV0IG1hcmt1cCA9IGA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tdG90YWxzXCI+XG4gICAgICA8c3Ryb25nPiR7JC5pMThuKCd0b3RhbHMnKX06PC9zdHJvbmc+XG4gICAgICAke3Njb3BlLmZvcm1hdE51bWJlcih0b3RhbCl9ICgke3Njb3BlLmZvcm1hdE51bWJlcihNYXRoLnJvdW5kKHRvdGFsIC8gc2NvcGUubnVtRGF5c0luUmFuZ2UoKSkpfS8keyQuaTE4bignZGF5Jyl9KVxuICAgIDwvZGl2PmA7XG5cbiAgICBtYXJrdXAgKz0gJzxkaXYgY2xhc3M9XCJsaW5lYXItbGVnZW5kc1wiPic7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzZXQuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWV0YUtleSA9IE9iamVjdC5rZXlzKGRhdGFzZXQuX21ldGEpWzBdO1xuICAgICAgY29uc3QgbGFiZWwgPSBkYXRhc2V0Ll9tZXRhW21ldGFLZXldLmRhdGFbaV0uX3ZpZXcubGFiZWw7XG4gICAgICBtYXJrdXAgKz0gYFxuICAgICAgICA8c3BhbiBjbGFzcz1cImxpbmVhci1sZWdlbmRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tbGFiZWxcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtkYXRhc2V0LmJhY2tncm91bmRDb2xvcltpXX1cIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvJHtsYWJlbH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2xhYmVsLnVwY2FzZSgpfTwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZWFyLWxlZ2VuZC0tY291bnRzXCI+XG4gICAgICAgICAgICAke3Njb3BlLmZvcm1hdE51bWJlcihkYXRhc2V0LmRhdGFbaV0pfSAoJHtzY29wZS5mb3JtYXROdW1iZXIoZGF0YXNldC5hdmVyYWdlc1tpXSl9LyR7JC5pMThuKCdkYXknKX0pXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVhci1sZWdlbmQtLWxpbmtzXCI+PC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIGA7XG4gICAgfVxuICAgIHJldHVybiBtYXJrdXAgKz0gJzwvZGl2Pic7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGVzO1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgY2hhcnQtc3BlY2lmaWMgbG9naWNcbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyoqXG4gKiBTaGFyZWQgY2hhcnQtc3BlY2lmaWMgbG9naWMsIHVzZWQgaW4gYWxsIGFwcHMgZXhjZXB0IFRvcHZpZXdzXG4gKiBAcGFyYW0ge2NsYXNzfSBzdXBlcmNsYXNzIC0gYmFzZSBjbGFzc1xuICogQHJldHVybnMge251bGx9IGNsYXNzIGV4dGVuZGluZyBzdXBlcmNsYXNzXG4gKi9cbmNvbnN0IENoYXJ0SGVscGVycyA9IHN1cGVyY2xhc3MgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcbiAgY29uc3RydWN0b3IoYXBwQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBwQ29uZmlnKTtcblxuICAgIHRoaXMuY2hhcnRPYmogPSBudWxsO1xuICAgIHRoaXMucHJldkNoYXJ0VHlwZSA9IG51bGw7XG4gICAgdGhpcy5hdXRvQ2hhcnRUeXBlID0gdHJ1ZTsgLy8gd2lsbCBiZWNvbWUgZmFsc2Ugd2hlbiB0aGV5IG1hbnVhbGx5IGNoYW5nZSB0aGUgY2hhcnQgdHlwZVxuXG4gICAgLyoqIGVuc3VyZSB3ZSBoYXZlIGEgdmFsaWQgY2hhcnQgdHlwZSBpbiBsb2NhbFN0b3JhZ2UsIHJlc3VsdCBvZiBDaGFydC5qcyAxLjAgdG8gMi4wIG1pZ3JhdGlvbiAqL1xuICAgIGNvbnN0IHN0b3JlZENoYXJ0VHlwZSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnKTtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmxpbmVhckNoYXJ0cy5pbmNsdWRlcyhzdG9yZWRDaGFydFR5cGUpICYmICF0aGlzLmNvbmZpZy5jaXJjdWxhckNoYXJ0cy5pbmNsdWRlcyhzdG9yZWRDaGFydFR5cGUpKSB7XG4gICAgICB0aGlzLnNldExvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnLCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5jaGFydFR5cGUoKSk7XG4gICAgfVxuXG4gICAgLy8gbGVhdmUgaWYgdGhlcmUncyBubyBjaGFydCBjb25maWd1cmVkXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5jaGFydCkgcmV0dXJuO1xuXG4gICAgLyoqIEB0eXBlIHtCb29sZWFufSBhZGQgYWJpbGl0eSB0byBkaXNhYmxlIGF1dG8tbG9nIGRldGVjdGlvbiAqL1xuICAgIHRoaXMubm9Mb2dTY2FsZSA9IGxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnYXV0b2xvZz1mYWxzZScpO1xuXG4gICAgLyoqIGNvcHkgb3ZlciBhcHAtc3BlY2lmaWMgY2hhcnQgdGVtcGxhdGVzICovXG4gICAgdGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmZvckVhY2gobGluZWFyQ2hhcnQgPT4ge1xuICAgICAgdGhpcy5jb25maWcuY2hhcnRDb25maWdbbGluZWFyQ2hhcnRdLm9wdHMubGVnZW5kVGVtcGxhdGUgPSB0aGlzLmNvbmZpZy5saW5lYXJMZWdlbmQ7XG4gICAgfSk7XG4gICAgdGhpcy5jb25maWcuY2lyY3VsYXJDaGFydHMuZm9yRWFjaChjaXJjdWxhckNoYXJ0ID0+IHtcbiAgICAgIHRoaXMuY29uZmlnLmNoYXJ0Q29uZmlnW2NpcmN1bGFyQ2hhcnRdLm9wdHMubGVnZW5kVGVtcGxhdGUgPSB0aGlzLmNvbmZpZy5jaXJjdWxhckxlZ2VuZDtcbiAgICB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24oQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLCB7YW5pbWF0aW9uOiBmYWxzZSwgcmVzcG9uc2l2ZTogdHJ1ZX0pO1xuXG4gICAgLyoqIGNoYW5naW5nIG9mIGNoYXJ0IHR5cGVzICovXG4gICAgJCgnLm1vZGFsLWNoYXJ0LXR5cGUgYScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFydFR5cGUgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgndHlwZScpO1xuICAgICAgdGhpcy5hdXRvQ2hhcnRUeXBlID0gZmFsc2U7XG5cbiAgICAgICQoJy5sb2dhcml0aG1pYy1zY2FsZScpLnRvZ2dsZSh0aGlzLmlzTG9nYXJpdGhtaWNDYXBhYmxlKCkpO1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGUodGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKSk7XG5cbiAgICAgIGlmICh0aGlzLnJlbWVtYmVyQ2hhcnQgPT09ICd0cnVlJykge1xuICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnLCB0aGlzLmNoYXJ0VHlwZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaXNDaGFydEFwcCgpID8gdGhpcy51cGRhdGVDaGFydCh0aGlzLnBhZ2VWaWV3c0RhdGEpIDogdGhpcy5yZW5kZXJEYXRhKCk7XG4gICAgfSk7XG5cbiAgICAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuYXV0b0xvZ0RldGVjdGlvbiA9ICdmYWxzZSc7XG4gICAgICB0aGlzLmlzQ2hhcnRBcHAoKSA/IHRoaXMudXBkYXRlQ2hhcnQodGhpcy5wYWdlVmlld3NEYXRhKSA6IHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogZGlzYWJsZWQvZW5hYmxlIGJlZ2luIGF0IHplcm8gY2hlY2tib3ggYWNjb3JkaW5nbHksXG4gICAgICogYnV0IGRvbid0IHVwZGF0ZSBjaGFydCBzaW5jZSB0aGUgbG9nIHNjYWxlIHZhbHVlIGNhbiBjaGFuZ2UgcHJhZ21hdGljYWxseSBhbmQgbm90IGZyb20gdXNlciBpbnB1dFxuICAgICAqL1xuICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICQoJy5iZWdpbi1hdC16ZXJvJykudG9nZ2xlQ2xhc3MoJ2Rpc2FibGVkJywgdGhpcy5jaGVja2VkKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmJlZ2luQXRaZXJvID09PSAndHJ1ZScpIHtcbiAgICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICB9XG5cbiAgICAkKCcuYmVnaW4tYXQtemVyby1vcHRpb24nKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmlzQ2hhcnRBcHAoKSA/IHRoaXMudXBkYXRlQ2hhcnQodGhpcy5wYWdlVmlld3NEYXRhKSA6IHRoaXMucmVuZGVyRGF0YSgpO1xuICAgIH0pO1xuXG4gICAgLyoqIGNoYXJ0IGRvd25sb2FkIGxpc3RlbmVycyAqL1xuICAgICQoJy5kb3dubG9hZC1wbmcnKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydFBORy5iaW5kKHRoaXMpKTtcbiAgICAkKCcucHJpbnQtY2hhcnQnKS5vbignY2xpY2snLCB0aGlzLnByaW50Q2hhcnQuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IGNoYXJ0IHR5cGUgb3IgdGhlIG9uZSBmcm9tIGxvY2FsU3RvcmFnZSwgYmFzZWQgb24gc2V0dGluZ3NcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtudW1EYXRhc2V0c10gLSBudW1iZXIgb2YgZGF0YXNldHNcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldEluaXRpYWxDaGFydFR5cGUobnVtRGF0YXNldHMgPSAxKSB7XG4gICAgaWYgKHRoaXMucmVtZW1iZXJDaGFydCA9PT0gJ3RydWUnKSB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgncGFnZXZpZXdzLWNoYXJ0LXByZWZlcmVuY2UnKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5jaGFydFR5cGUobnVtRGF0YXNldHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoYXJ0VHlwZSA9IHRoaXMuY29uZmlnLmRlZmF1bHRzLmNoYXJ0VHlwZShudW1EYXRhc2V0cyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgcHJldmlvdXMgY2hhcnQsIGlmIG5lZWRlZC5cbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGRlc3Ryb3lDaGFydCgpIHtcbiAgICBpZiAodGhpcy5jaGFydE9iaikge1xuICAgICAgdGhpcy5jaGFydE9iai5kZXN0cm95KCk7XG4gICAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCgnJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIENTViBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBXaXRoIHRoZSBwcmVwZW5kZWQgZGF0YTp0ZXh0L2NzdiB0aGlzIHNob3VsZCBjYXVzZSB0aGUgYnJvd3NlciB0byBkb3dubG9hZCB0aGUgZGF0YVxuICAgKiBAcmV0dXJucyB7bnVsbH0gTm90aGluZ1xuICAgKi9cbiAgZXhwb3J0Q1NWKCkge1xuICAgIGxldCBjc3ZDb250ZW50ID0gJ2RhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCxEYXRlLCc7XG4gICAgbGV0IHRpdGxlcyA9IFtdO1xuICAgIGxldCBkYXRhUm93cyA9IFtdO1xuICAgIGxldCBkYXRlcyA9IHRoaXMuZ2V0RGF0ZUhlYWRpbmdzKGZhbHNlKTtcblxuICAgIC8vIEJlZ2luIGNvbnN0cnVjdGluZyB0aGUgZGF0YVJvd3MgYXJyYXkgYnkgcG9wdWxhdGluZyBpdCB3aXRoIHRoZSBkYXRlc1xuICAgIGRhdGVzLmZvckVhY2goKGRhdGUsIGluZGV4KSA9PiB7XG4gICAgICBkYXRhUm93c1tpbmRleF0gPSBbZGF0ZV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmNoYXJ0T2JqLmRhdGEuZGF0YXNldHMuZm9yRWFjaChzaXRlID0+IHtcbiAgICAgIC8vIEJ1aWxkIGFuIGFycmF5IG9mIHNpdGUgdGl0bGVzIGZvciB1c2UgaW4gdGhlIENTViBoZWFkZXJcbiAgICAgIGxldCBzaXRlVGl0bGUgPSAnXCInICsgc2l0ZS5sYWJlbC5yZXBsYWNlKC9cIi9nLCAnXCJcIicpICsgJ1wiJztcbiAgICAgIHRpdGxlcy5wdXNoKHNpdGVUaXRsZSk7XG5cbiAgICAgIC8vIFBvcHVsYXRlIHRoZSBkYXRhUm93cyBhcnJheSB3aXRoIHRoZSBkYXRhIGZvciB0aGlzIHNpdGVcbiAgICAgIGRhdGVzLmZvckVhY2goKGRhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGRhdGFSb3dzW2luZGV4XS5wdXNoKHNpdGUuZGF0YVtpbmRleF0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBGaW5pc2ggdGhlIENTViBoZWFkZXJcbiAgICBjc3ZDb250ZW50ID0gY3N2Q29udGVudCArIHRpdGxlcy5qb2luKCcsJykgKyAnXFxuJztcblxuICAgIC8vIEFkZCB0aGUgcm93cyB0byB0aGUgQ1NWXG4gICAgZGF0YVJvd3MuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIGNzdkNvbnRlbnQgKz0gZGF0YS5qb2luKCcsJykgKyAnXFxuJztcbiAgICB9KTtcblxuICAgIHRoaXMuZG93bmxvYWREYXRhKGNzdkNvbnRlbnQsICdjc3YnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIGN1cnJlbnQgY2hhcnQgZGF0YSB0byBKU09OIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBleHBvcnRKU09OKCkge1xuICAgIGxldCBkYXRhID0gW107XG5cbiAgICB0aGlzLmNoYXJ0T2JqLmRhdGEuZGF0YXNldHMuZm9yRWFjaCgocGFnZSwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBlbnRyeSA9IHtcbiAgICAgICAgcGFnZTogcGFnZS5sYWJlbC5yZXBsYWNlKC9cIi9nLCAnXFxcIicpLnJlcGxhY2UoLycvZywgXCJcXCdcIiksXG4gICAgICAgIGNvbG9yOiBwYWdlLnN0cm9rZUNvbG9yLFxuICAgICAgICBzdW06IHBhZ2Uuc3VtLFxuICAgICAgICBkYWlseV9hdmVyYWdlOiBNYXRoLnJvdW5kKHBhZ2Uuc3VtIC8gdGhpcy5udW1EYXlzSW5SYW5nZSgpKVxuICAgICAgfTtcblxuICAgICAgdGhpcy5nZXREYXRlSGVhZGluZ3MoZmFsc2UpLmZvckVhY2goKGhlYWRpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgIGVudHJ5W2hlYWRpbmcucmVwbGFjZSgvXFxcXC8sJycpXSA9IHBhZ2UuZGF0YVtpbmRleF07XG4gICAgICB9KTtcblxuICAgICAgZGF0YS5wdXNoKGVudHJ5KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGpzb25Db250ZW50ID0gJ2RhdGE6dGV4dC9qc29uO2NoYXJzZXQ9dXRmLTgsJyArIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIHRoaXMuZG93bmxvYWREYXRhKGpzb25Db250ZW50LCAnanNvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBkYXRhIGFzIFBORyBpbWFnZSwgb3BlbmluZyBpdCBpbiBhIG5ldyB0YWJcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGV4cG9ydFBORygpIHtcbiAgICB0aGlzLmRvd25sb2FkRGF0YSh0aGlzLmNoYXJ0T2JqLnRvQmFzZTY0SW1hZ2UoKSwgJ3BuZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIHplcm8gdmFsdWUgdG8gYSB0aW1lc2VyaWVzLCBzZWU6XG4gICAqIGh0dHBzOi8vd2lraXRlY2gud2lraW1lZGlhLm9yZy93aWtpL0FuYWx5dGljcy9BUVMvUGFnZXZpZXdfQVBJI0dvdGNoYXNcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgZmV0Y2hlZCBmcm9tIEFQSVxuICAgKiBAcGFyYW0ge21vbWVudH0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZSBvZiByYW5nZSB0byBmaWx0ZXIgdGhyb3VnaFxuICAgKiBAcGFyYW0ge21vbWVudH0gZW5kRGF0ZSAtIGVuZCBkYXRlIG9mIHJhbmdlXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IGRhdGFzZXQgd2l0aCB6ZXJvcyB3aGVyZSBudWxscyB3aGVyZVxuICAgKi9cbiAgZmlsbEluWmVyb3MoZGF0YSwgc3RhcnREYXRlLCBlbmREYXRlKSB7XG4gICAgLyoqIEV4dHJhY3QgdGhlIGRhdGVzIHRoYXQgYXJlIGFscmVhZHkgaW4gdGhlIHRpbWVzZXJpZXMgKi9cbiAgICBsZXQgYWxyZWFkeVRoZXJlID0ge307XG4gICAgZGF0YS5pdGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgbGV0IGRhdGUgPSBtb21lbnQoZWxlbS50aW1lc3RhbXAsIHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCk7XG4gICAgICBhbHJlYWR5VGhlcmVbZGF0ZV0gPSBlbGVtO1xuICAgIH0pO1xuICAgIGRhdGEuaXRlbXMgPSBbXTtcblxuICAgIC8qKiBSZWNvbnN0cnVjdCB3aXRoIHplcm9zIGluc3RlYWQgb2YgbnVsbHMgKi9cbiAgICBmb3IgKGxldCBkYXRlID0gbW9tZW50KHN0YXJ0RGF0ZSk7IGRhdGUgPD0gZW5kRGF0ZTsgZGF0ZS5hZGQoMSwgJ2QnKSkge1xuICAgICAgaWYgKGFscmVhZHlUaGVyZVtkYXRlXSkge1xuICAgICAgICBkYXRhLml0ZW1zLnB1c2goYWxyZWFkeVRoZXJlW2RhdGVdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVkZ2VDYXNlID0gZGF0ZS5pc1NhbWUodGhpcy5jb25maWcubWF4RGF0ZSkgfHwgZGF0ZS5pc1NhbWUobW9tZW50KHRoaXMuY29uZmlnLm1heERhdGUpLnN1YnRyYWN0KDEsICdkYXlzJykpO1xuICAgICAgICBkYXRhLml0ZW1zLnB1c2goe1xuICAgICAgICAgIHRpbWVzdGFtcDogZGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KSxcbiAgICAgICAgICBbdGhpcy5pc1BhZ2V2aWV3cygpID8gJ3ZpZXdzJyA6ICdkZXZpY2VzJ106IGVkZ2VDYXNlID8gbnVsbCA6IDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGEgZm9ybWF0dGVkIGZvciBDaGFydC5qcyBhbmQgdGhlIGxlZ2VuZCB0ZW1wbGF0ZXNcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YXNldHMgLSBhcyByZXRyaWV2ZWQgYnkgZ2V0UGFnZVZpZXdzRGF0YVxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIHJlYWR5IGZvciBjaGFydCByZW5kZXJpbmdcbiAgICovXG4gIGJ1aWxkQ2hhcnREYXRhKGRhdGFzZXRzKSB7XG4gICAgY29uc3QgbGFiZWxzID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnZhbCgpO1xuXG4gICAgLyoqIHByZXNlcnZlIG9yZGVyIG9mIGRhdGFzZXRzIGR1ZSB0byBhc3luYyBjYWxscyAqL1xuICAgIHJldHVybiBkYXRhc2V0cy5tYXAoKGRhdGFzZXQsIGluZGV4KSA9PiB7XG4gICAgICAvKiogQnVpbGQgdGhlIGFydGljbGUncyBkYXRhc2V0LiAqL1xuICAgICAgY29uc3QgdmFsdWVzID0gZGF0YXNldC5tYXAoZWxlbSA9PiB0aGlzLmlzUGFnZXZpZXdzKCkgPyBlbGVtLnZpZXdzIDogZWxlbS5kZXZpY2VzKSxcbiAgICAgICAgc3VtID0gdmFsdWVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpLFxuICAgICAgICBhdmVyYWdlID0gTWF0aC5yb3VuZChzdW0gLyB2YWx1ZXMubGVuZ3RoKSxcbiAgICAgICAgbWF4ID0gTWF0aC5tYXgoLi4udmFsdWVzKSxcbiAgICAgICAgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKSxcbiAgICAgICAgY29sb3IgPSB0aGlzLmNvbmZpZy5jb2xvcnNbaW5kZXggJSAxMF0sXG4gICAgICAgIGxhYmVsID0gbGFiZWxzW2luZGV4XS5kZXNjb3JlKCk7XG5cbiAgICAgIGNvbnN0IGVudGl0eUluZm8gPSB0aGlzLmVudGl0eUluZm8gPyB0aGlzLmVudGl0eUluZm9bbGFiZWxdIDoge307XG5cbiAgICAgIGRhdGFzZXQgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIGRhdGE6IHZhbHVlcyxcbiAgICAgICAgdmFsdWU6IHN1bSwgLy8gZHVwbGljYXRlZCBiZWNhdXNlIENoYXJ0LmpzIHdhbnRzIGEgc2luZ2xlIGB2YWx1ZWAgZm9yIGNpcmN1bGFyIGNoYXJ0c1xuICAgICAgICBzdW0sXG4gICAgICAgIGF2ZXJhZ2UsXG4gICAgICAgIG1heCxcbiAgICAgICAgbWluLFxuICAgICAgICBjb2xvclxuICAgICAgfSwgdGhpcy5jb25maWcuY2hhcnRDb25maWdbdGhpcy5jaGFydFR5cGVdLmRhdGFzZXQoY29sb3IpLCBlbnRpdHlJbmZvKTtcblxuICAgICAgaWYgKHRoaXMuaXNMb2dhcml0aG1pYygpKSB7XG4gICAgICAgIGRhdGFzZXQuZGF0YSA9IGRhdGFzZXQuZGF0YS5tYXAodmlldyA9PiB2aWV3IHx8IG51bGwpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YXNldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdXJsIHRvIHF1ZXJ5IHRoZSBBUEkgYmFzZWQgb24gYXBwIGFuZCBvcHRpb25zXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRpdHkgLSBuYW1lIG9mIGVudGl0eSB3ZSdyZSBxdWVyeWluZyBmb3IgKHBhZ2UgbmFtZSBvciBwcm9qZWN0IG5hbWUpXG4gICAqIEBwYXJhbSB7bW9tZW50fSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAqIEBwYXJhbSB7bW9tZW50fSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgVVJMXG4gICAqL1xuICBnZXRBcGlVcmwoZW50aXR5LCBzdGFydERhdGUsIGVuZERhdGUpIHtcbiAgICBjb25zdCB1cmlFbmNvZGVkRW50aXR5TmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChlbnRpdHkpO1xuXG4gICAgaWYgKHRoaXMuYXBwID09PSAnc2l0ZXZpZXdzJykge1xuICAgICAgcmV0dXJuIHRoaXMuaXNQYWdldmlld3MoKSA/IChcbiAgICAgICAgYGh0dHBzOi8vd2lraW1lZGlhLm9yZy9hcGkvcmVzdF92MS9tZXRyaWNzL3BhZ2V2aWV3cy9hZ2dyZWdhdGUvJHt1cmlFbmNvZGVkRW50aXR5TmFtZX1gICtcbiAgICAgICAgYC8keyQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCl9LyR7JCh0aGlzLmNvbmZpZy5hZ2VudFNlbGVjdG9yKS52YWwoKX0vZGFpbHlgICtcbiAgICAgICAgYC8ke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX0vJHtlbmREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfWBcbiAgICAgICkgOiAoXG4gICAgICAgIGBodHRwczovL3dpa2ltZWRpYS5vcmcvYXBpL3Jlc3RfdjEvbWV0cmljcy91bmlxdWUtZGV2aWNlcy8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfS8keyQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCl9L2RhaWx5YCArXG4gICAgICAgIGAvJHtzdGFydERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9LyR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5jb25maWcudGltZXN0YW1wRm9ybWF0KX1gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL3Blci1hcnRpY2xlLyR7dGhpcy5wcm9qZWN0fWAgK1xuICAgICAgICBgLyR7JCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKX0vJHskKHRoaXMuY29uZmlnLmFnZW50U2VsZWN0b3IpLnZhbCgpfS8ke3VyaUVuY29kZWRFbnRpdHlOYW1lfS9kYWlseWAgK1xuICAgICAgICBgLyR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpfS8ke2VuZERhdGUuZm9ybWF0KHRoaXMuY29uZmlnLnRpbWVzdGFtcEZvcm1hdCl9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW90aGVyIGZ1bmN0aW9uIGZvciBxdWVyeWluZyB0aGUgQVBJIGFuZCBwcm9jZXNzaW5nIGRhdGFcbiAgICogQHBhcmFtICB7QXJyYXl9ICBlbnRpdGllcyAtIGxpc3Qgb2YgcGFnZSBuYW1lcywgb3IgcHJvamVjdHMgZm9yIFNpdGV2aWV3c1xuICAgKiBAcmV0dXJuIHtEZWZlcnJlZH0gUHJvbWlzZSByZXNvbHZpbmcgd2l0aCBwYWdldmlld3MgZGF0YSBhbmQgZXJyb3JzLCBpZiBwcmVzZW50XG4gICAqL1xuICBnZXRQYWdlVmlld3NEYXRhKGVudGl0aWVzKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKSwgY291bnQgPSAwLCBmYWlsdXJlUmV0cmllcyA9IHt9LFxuICAgICAgdG90YWxSZXF1ZXN0Q291bnQgPSBlbnRpdGllcy5sZW5ndGgsIGZhaWxlZEVudGl0aWVzID0gW107XG5cbiAgICAvKiogQHR5cGUge09iamVjdH0gZXZlcnl0aGluZyB3ZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgZm9yIHRoZSBwcm9taXNlcyAqL1xuICAgIGxldCB4aHJEYXRhID0ge1xuICAgICAgZW50aXRpZXMsXG4gICAgICBsYWJlbHM6IFtdLCAvLyBMYWJlbHMgKGRhdGVzKSBmb3IgdGhlIHgtYXhpcy5cbiAgICAgIGRhdGFzZXRzOiBbXSwgLy8gRGF0YSBmb3IgZWFjaCBhcnRpY2xlIHRpbWVzZXJpZXNcbiAgICAgIGVycm9yczogW10sIC8vIFF1ZXVlIHVwIGVycm9ycyB0byBzaG93IGFmdGVyIGFsbCByZXF1ZXN0cyBoYXZlIGJlZW4gbWFkZVxuICAgICAgZmF0YWxFcnJvcnM6IFtdLCAvLyBVbnJlY292ZXJhYmxlIEphdmFTY3JpcHQgZXJyb3JzXG4gICAgICBwcm9taXNlczogW11cbiAgICB9O1xuXG4gICAgY29uc3QgbWFrZVJlcXVlc3QgPSAoZW50aXR5LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgICBlbmREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5zdGFydE9mKCdkYXknKSxcbiAgICAgICAgdXJsID0gdGhpcy5nZXRBcGlVcmwoZW50aXR5LCBzdGFydERhdGUsIGVuZERhdGUpLFxuICAgICAgICBwcm9taXNlID0gJC5hamF4KHsgdXJsLCBkYXRhVHlwZTogJ2pzb24nIH0pO1xuXG4gICAgICB4aHJEYXRhLnByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShzdWNjZXNzRGF0YSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3VjY2Vzc0RhdGEgPSB0aGlzLmZpbGxJblplcm9zKHN1Y2Nlc3NEYXRhLCBzdGFydERhdGUsIGVuZERhdGUpO1xuXG4gICAgICAgICAgeGhyRGF0YS5kYXRhc2V0cy5wdXNoKHN1Y2Nlc3NEYXRhLml0ZW1zKTtcblxuICAgICAgICAgIC8qKiBmZXRjaCB0aGUgbGFiZWxzIGZvciB0aGUgeC1heGlzIG9uIHN1Y2Nlc3MgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5ICovXG4gICAgICAgICAgaWYgKHN1Y2Nlc3NEYXRhLml0ZW1zICYmICF4aHJEYXRhLmxhYmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHhockRhdGEubGFiZWxzID0gc3VjY2Vzc0RhdGEuaXRlbXMubWFwKGVsZW0gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KGVsZW0udGltZXN0YW1wLCB0aGlzLmNvbmZpZy50aW1lc3RhbXBGb3JtYXQpLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4geGhyRGF0YS5mYXRhbEVycm9ycy5wdXNoKGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoZXJyb3JEYXRhID0+IHtcbiAgICAgICAgLyoqIGZpcnN0IGRldGVjdCBpZiB0aGlzIHdhcyBhIENhc3NhbmRyYSBiYWNrZW5kIGVycm9yLCBhbmQgaWYgc28sIHNjaGVkdWxlIGEgcmUtdHJ5ICovXG4gICAgICAgIGNvbnN0IGNhc3NhbmRyYUVycm9yID0gZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZSA9PT0gJ0Vycm9yIGluIENhc3NhbmRyYSB0YWJsZSBzdG9yYWdlIGJhY2tlbmQnO1xuXG4gICAgICAgIGlmIChjYXNzYW5kcmFFcnJvcikge1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1tlbnRpdHldKSB7XG4gICAgICAgICAgICBmYWlsdXJlUmV0cmllc1tlbnRpdHldKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZhaWx1cmVSZXRyaWVzW2VudGl0eV0gPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKiBtYXhpbXVtIG9mIDMgcmV0cmllcyAqL1xuICAgICAgICAgIGlmIChmYWlsdXJlUmV0cmllc1tlbnRpdHldIDwgMykge1xuICAgICAgICAgICAgdG90YWxSZXF1ZXN0Q291bnQrKztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhdGVMaW1pdChtYWtlUmVxdWVzdCwgdGhpcy5jb25maWcuYXBpVGhyb3R0bGUsIHRoaXMpKGVudGl0eSwgaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGlzIGFydGljbGUgZnJvbSB0aGUgbGlzdCBvZiBlbnRpdGllcyB0byBhbmFseXplXG4gICAgICAgIHhockRhdGEuZW50aXRpZXMgPSB4aHJEYXRhLmVudGl0aWVzLmZpbHRlcihlbCA9PiBlbCAhPT0gZW50aXR5KTtcblxuICAgICAgICBpZiAoY2Fzc2FuZHJhRXJyb3IpIHtcbiAgICAgICAgICBmYWlsZWRFbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGxpbmsgPSB0aGlzLmFwcCA9PT0gJ3NpdGV2aWV3cycgPyB0aGlzLmdldFNpdGVMaW5rKGVudGl0eSkgOiB0aGlzLmdldFBhZ2VMaW5rKGVudGl0eSwgdGhpcy5wcm9qZWN0KTtcbiAgICAgICAgICB4aHJEYXRhLmVycm9ycy5wdXNoKFxuICAgICAgICAgICAgYCR7bGlua306ICR7JC5pMThuKCdhcGktZXJyb3InLCAnUGFnZXZpZXdzIEFQSScpfSAtICR7ZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSkuYWx3YXlzKCgpID0+IHtcbiAgICAgICAgaWYgKCsrY291bnQgPT09IHRvdGFsUmVxdWVzdENvdW50KSB7XG4gICAgICAgICAgdGhpcy5wYWdlVmlld3NEYXRhID0geGhyRGF0YTtcbiAgICAgICAgICBkZmQucmVzb2x2ZSh4aHJEYXRhKTtcblxuICAgICAgICAgIGlmIChmYWlsZWRFbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKCQuaTE4bihcbiAgICAgICAgICAgICAgJ2FwaS1lcnJvci10aW1lb3V0JyxcbiAgICAgICAgICAgICAgJzx1bD4nICtcbiAgICAgICAgICAgICAgZmFpbGVkRW50aXRpZXMubWFwKGZhaWxlZEVudGl0eSA9PiBgPGxpPiR7dGhpcy5nZXRQYWdlTGluayhmYWlsZWRFbnRpdHksIHRoaXMucHJvamVjdC5lc2NhcGUoKSl9PC9saT5gKS5qb2luKCcnKSArXG4gICAgICAgICAgICAgICc8L3VsPidcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGVudGl0aWVzLmZvckVhY2goKGVudGl0eSwgaW5kZXgpID0+IG1ha2VSZXF1ZXN0KGVudGl0eSwgaW5kZXgpKTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhcmFtcyBuZWVkZWQgdG8gY3JlYXRlIGEgcGVybWFuZW50IGxpbmsgb2YgdmlzaWJsZSBkYXRhXG4gICAqIEByZXR1cm4ge09iamVjdH0gaGFzaCBvZiBwYXJhbXNcbiAgICovXG4gIGdldFBlcm1hTGluaygpIHtcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMoZmFsc2UpO1xuICAgIGRlbGV0ZSBwYXJhbXMucmFuZ2U7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcmUgd2UgY3VycmVudGx5IGluIGxvZ2FyaXRobWljIG1vZGU/XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc0xvZ2FyaXRobWljKCkge1xuICAgIHJldHVybiAkKHRoaXMuY29uZmlnLmxvZ2FyaXRobWljQ2hlY2tib3gpLmlzKCc6Y2hlY2tlZCcpICYmIHRoaXMuaXNMb2dhcml0aG1pY0NhcGFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXN0IGlmIHRoZSBjdXJyZW50IGNoYXJ0IHR5cGUgc3VwcG9ydHMgYSBsb2dhcml0aG1pYyBzY2FsZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gbG9nLWZyaWVuZGx5IG9yIG5vdFxuICAgKi9cbiAgaXNMb2dhcml0aG1pY0NhcGFibGUoKSB7XG4gICAgcmV0dXJuIFsnbGluZScsICdiYXInXS5pbmNsdWRlcyh0aGlzLmNoYXJ0VHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogQXJlIHdlIHRyeWluZyB0byBzaG93IGRhdGEgb24gcGFnZXZpZXdzIChhcyBvcHBvc2VkIHRvIHVuaXF1ZSBkZXZpY2VzKT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNQYWdldmlld3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwID09PSAncGFnZXZpZXdzJyB8fCAkKHRoaXMuY29uZmlnLmRhdGFTb3VyY2VTZWxlY3RvcikudmFsKCkgPT09ICdwYWdldmlld3MnO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSB0cnlpbmcgdG8gc2hvdyBkYXRhIG9uIHBhZ2V2aWV3cyAoYXMgb3Bwb3NlZCB0byB1bmlxdWUgZGV2aWNlcyk/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzVW5pcXVlRGV2aWNlcygpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNQYWdldmlld3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmludCB0aGUgY2hhcnQhXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBwcmludENoYXJ0KCkge1xuICAgIGxldCB0YWIgPSB3aW5kb3cub3BlbigpO1xuICAgIHRhYi5kb2N1bWVudC53cml0ZShcbiAgICAgIGA8aW1nIHNyYz1cIiR7dGhpcy5jaGFydE9iai50b0Jhc2U2NEltYWdlKCl9XCIgLz5gXG4gICAgKTtcbiAgICB0YWIucHJpbnQoKTtcbiAgICB0YWIuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGNoYXJ0LCBtZXNzYWdlcywgYW5kIHJlc2V0cyBzaXRlIHNlbGVjdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBbc2VsZWN0Ml0gd2hldGhlciBvciBub3QgdG8gY2xlYXIgdGhlIFNlbGVjdDIgaW5wdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlc2V0VmlldyhzZWxlY3QyID0gZmFsc2UpIHtcbiAgICB0cnkge1xuICAgICAgLyoqIHRoZXNlIGNhbiBmYWlsIHNvbWV0aW1lcyAqL1xuICAgICAgdGhpcy5kZXN0cm95Q2hhcnQoKTtcbiAgICAgIGlmIChzZWxlY3QyKSB0aGlzLnJlc2V0U2VsZWN0MigpO1xuICAgIH0gY2F0Y2ggKGUpIHsgLy8gbm90aGluZ1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnN0b3BTcGlubnkoKTtcbiAgICAgICQoJy5kYXRhLWxpbmtzJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgJCh0aGlzLmNvbmZpZy5jaGFydCkuaGlkZSgpO1xuICAgICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHQgdG8gZmluZS10dW5lIHRoZSBwb2ludGVyIGRldGVjdGlvbiBzcGFjaW5nIGJhc2VkIG9uIGhvdyBjbHV0dGVyZWQgdGhlIGNoYXJ0IGlzXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHJhZGl1c1xuICAgKi9cbiAgc2V0Q2hhcnRQb2ludERldGVjdGlvblJhZGl1cygpIHtcbiAgICBpZiAodGhpcy5jaGFydFR5cGUgIT09ICdsaW5lJykgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMubnVtRGF5c0luUmFuZ2UoKSA+IDUwKSB7XG4gICAgICBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuaGl0UmFkaXVzID0gMztcbiAgICB9IGVsc2UgaWYgKHRoaXMubnVtRGF5c0luUmFuZ2UoKSA+IDMwKSB7XG4gICAgICBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuaGl0UmFkaXVzID0gNTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubnVtRGF5c0luUmFuZ2UoKSA+IDIwKSB7XG4gICAgICBDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMucG9pbnQuaGl0UmFkaXVzID0gMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgIENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5wb2ludC5oaXRSYWRpdXMgPSAzMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIGlmIHdlIHNob3VsZCBzaG93IGEgbG9nYXJpdGhtaWMgY2hhcnQgZm9yIHRoZSBnaXZlbiBkYXRhc2V0LCBiYXNlZCBvbiBUaGVpbCBpbmRleFxuICAgKiBAcGFyYW0gIHtBcnJheX0gZGF0YXNldHMgLSBwYWdldmlld3NcbiAgICogQHJldHVybiB7Qm9vbGVhbn0geWVzIG9yIG5vXG4gICAqL1xuICBzaG91bGRCZUxvZ2FyaXRobWljKGRhdGFzZXRzKSB7XG4gICAgaWYgKCF0aGlzLmlzTG9nYXJpdGhtaWNDYXBhYmxlKCkgfHwgdGhpcy5ub0xvZ1NjYWxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHNldHMgPSBbXTtcbiAgICAvLyBjb252ZXJ0IE5hTnMgYW5kIG51bGxzIHRvIHplcm9zXG4gICAgZGF0YXNldHMuZm9yRWFjaChkYXRhc2V0ID0+IHtcbiAgICAgIHNldHMucHVzaChkYXRhc2V0Lm1hcCh2YWwgPT4gdmFsIHx8IDApKTtcbiAgICB9KTtcblxuICAgIC8vIG92ZXJhbGwgbWF4IHZhbHVlXG4gICAgY29uc3QgbWF4VmFsdWUgPSBNYXRoLm1heCguLi5bXS5jb25jYXQoLi4uc2V0cykpO1xuXG4gICAgaWYgKG1heFZhbHVlIDw9IDEwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgbG9nYXJpdGhtaWNOZWVkZWQgPSBmYWxzZTtcblxuICAgIHNldHMuZm9yRWFjaChzZXQgPT4ge1xuICAgICAgc2V0LnB1c2gobWF4VmFsdWUpO1xuXG4gICAgICBjb25zdCBzdW0gPSBzZXQucmVkdWNlKChhLCBiKSA9PiBhICsgYiksXG4gICAgICAgIGF2ZXJhZ2UgPSBzdW0gLyBzZXQubGVuZ3RoO1xuICAgICAgbGV0IHRoZWlsID0gMDtcbiAgICAgIHNldC5mb3JFYWNoKHYgPT4gdGhlaWwgKz0gdiA/IHYgKiBNYXRoLmxvZyh2IC8gYXZlcmFnZSkgOiAwKTtcblxuICAgICAgaWYgKHRoZWlsIC8gc3VtID4gMC41KSB7XG4gICAgICAgIHJldHVybiBsb2dhcml0aG1pY05lZWRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbG9nYXJpdGhtaWNOZWVkZWQ7XG4gIH1cblxuICAvKipcbiAgICogc2V0cyB1cCB0aGUgZGF0ZXJhbmdlIHNlbGVjdG9yIGFuZCBhZGRzIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cERhdGVSYW5nZVNlbGVjdG9yKCkge1xuICAgIHN1cGVyLnNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKTtcblxuICAgIC8qKiBwcmV2ZW50IGR1cGxpY2F0ZSBzZXR1cCBzaW5jZSB0aGUgbGlzdCB2aWV3IGFwcHMgYWxzbyB1c2UgY2hhcnRzICovXG4gICAgaWYgKCF0aGlzLmlzQ2hhcnRBcHAoKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZGF0ZVJhbmdlU2VsZWN0b3IgPSAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKTtcblxuICAgIC8qKiB0aGUgXCJMYXRlc3QgTiBkYXlzXCIgbGlua3MgKi9cbiAgICAkKCcuZGF0ZS1sYXRlc3QgYScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UoYGxhdGVzdC0keyQoZS50YXJnZXQpLmRhdGEoJ3ZhbHVlJyl9YCk7XG4gICAgfSk7XG5cbiAgICBkYXRlUmFuZ2VTZWxlY3Rvci5vbignY2hhbmdlJywgZSA9PiB7XG4gICAgICB0aGlzLnNldENoYXJ0UG9pbnREZXRlY3Rpb25SYWRpdXMoKTtcbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG5cbiAgICAgIC8qKiBjbGVhciBvdXQgc3BlY2lhbFJhbmdlIGlmIGl0IGRvZXNuJ3QgbWF0Y2ggb3VyIGlucHV0ICovXG4gICAgICBpZiAodGhpcy5zcGVjaWFsUmFuZ2UgJiYgdGhpcy5zcGVjaWFsUmFuZ2UudmFsdWUgIT09IGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGNoYXJ0IHdpdGggZGF0YSBwcm92aWRlZCBieSBwcm9jZXNzSW5wdXQoKVxuICAgKiBAcGFyYW0ge09iamVjdH0geGhyRGF0YSAtIGRhdGEgYXMgY29uc3RydWN0ZWQgYnkgcHJvY2Vzc0lucHV0KClcbiAgICogQHJldHVybnMge251bGx9IC0gbm90aGluXG4gICAqL1xuICB1cGRhdGVDaGFydCh4aHJEYXRhKSB7XG4gICAgJCgnLmNoYXJ0LWxlZ2VuZCcpLmh0bWwoJycpOyAvLyBjbGVhciBvbGQgY2hhcnQgbGVnZW5kXG5cbiAgICAvLyBzaG93IHBlbmRpbmcgZXJyb3IgbWVzc2FnZXMgaWYgcHJlc2VudCwgZXhpdGluZyBpZiBmYXRhbFxuICAgIGlmICh0aGlzLnNob3dFcnJvcnMoeGhyRGF0YSkpIHJldHVybjtcblxuICAgIGlmICgheGhyRGF0YS5lbnRpdGllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3BTcGlubnkoKTtcbiAgICB9IGVsc2UgaWYgKHhockRhdGEuZW50aXRpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAkKCcubXVsdGktcGFnZS1jaGFydC1ub2RlJykuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcubXVsdGktcGFnZS1jaGFydC1ub2RlJykuc2hvdygpO1xuICAgIH1cblxuICAgIHRoaXMub3V0cHV0RGF0YSA9IHRoaXMuYnVpbGRDaGFydERhdGEoeGhyRGF0YS5kYXRhc2V0cywgeGhyRGF0YS5lbnRpdGllcyk7XG5cbiAgICBpZiAodGhpcy5hdXRvTG9nRGV0ZWN0aW9uID09PSAndHJ1ZScpIHtcbiAgICAgIGNvbnN0IHNob3VsZEJlTG9nYXJpdGhtaWMgPSB0aGlzLnNob3VsZEJlTG9nYXJpdGhtaWModGhpcy5vdXRwdXREYXRhLm1hcChzZXQgPT4gc2V0LmRhdGEpKTtcbiAgICAgICQodGhpcy5jb25maWcubG9nYXJpdGhtaWNDaGVja2JveCkucHJvcCgnY2hlY2tlZCcsIHNob3VsZEJlTG9nYXJpdGhtaWMpO1xuICAgICAgJCgnLmJlZ2luLWF0LXplcm8nKS50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBzaG91bGRCZUxvZ2FyaXRobWljKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7c2NhbGVzOiB7fX0sXG4gICAgICB0aGlzLmNvbmZpZy5jaGFydENvbmZpZ1t0aGlzLmNoYXJ0VHlwZV0ub3B0cyxcbiAgICAgIHRoaXMuY29uZmlnLmdsb2JhbENoYXJ0T3B0c1xuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc0xvZ2FyaXRobWljKCkpIHtcbiAgICAgIG9wdGlvbnMuc2NhbGVzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucy5zY2FsZXMsIHtcbiAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgdHlwZTogJ2xvZ2FyaXRobWljJyxcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgY2FsbGJhY2s6ICh2YWx1ZSwgaW5kZXgsIGFycikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZW1haW4gPSB2YWx1ZSAvIChNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihDaGFydC5oZWxwZXJzLmxvZzEwKHZhbHVlKSkpKTtcblxuICAgICAgICAgICAgICBpZiAocmVtYWluID09PSAxIHx8IHJlbWFpbiA9PT0gMiB8fCByZW1haW4gPT09IDUgfHwgaW5kZXggPT09IDAgfHwgaW5kZXggPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1dXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3BTcGlubnkoKTtcblxuICAgIHRyeSB7XG4gICAgICAkKCcuY2hhcnQtY29udGFpbmVyJykuaHRtbCgnJykuYXBwZW5kKFwiPGNhbnZhcyBjbGFzcz0nYXFzLWNoYXJ0Jz5cIik7XG4gICAgICB0aGlzLnNldENoYXJ0UG9pbnREZXRlY3Rpb25SYWRpdXMoKTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAkKHRoaXMuY29uZmlnLmNoYXJ0KVswXS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcubGluZWFyQ2hhcnRzLmluY2x1ZGVzKHRoaXMuY2hhcnRUeXBlKSkge1xuICAgICAgICBjb25zdCBsaW5lYXJEYXRhID0ge2xhYmVsczogeGhyRGF0YS5sYWJlbHMsIGRhdGFzZXRzOiB0aGlzLm91dHB1dERhdGF9O1xuXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ3JhZGFyJykge1xuICAgICAgICAgIG9wdGlvbnMuc2NhbGUudGlja3MuYmVnaW5BdFplcm8gPSAkKCcuYmVnaW4tYXQtemVyby1vcHRpb24nKS5pcygnOmNoZWNrZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLnNjYWxlcy55QXhlc1swXS50aWNrcy5iZWdpbkF0WmVybyA9ICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFydE9iaiA9IG5ldyBDaGFydChjb250ZXh0LCB7XG4gICAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgICAgZGF0YTogbGluZWFyRGF0YSxcbiAgICAgICAgICBvcHRpb25zXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGFydE9iaiA9IG5ldyBDaGFydChjb250ZXh0LCB7XG4gICAgICAgICAgdHlwZTogdGhpcy5jaGFydFR5cGUsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgbGFiZWxzOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC5sYWJlbCksXG4gICAgICAgICAgICBkYXRhc2V0czogW3tcbiAgICAgICAgICAgICAgZGF0YTogdGhpcy5vdXRwdXREYXRhLm1hcChkID0+IGQudmFsdWUpLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMub3V0cHV0RGF0YS5tYXAoZCA9PiBkLmJhY2tncm91bmRDb2xvciksXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC5ob3ZlckJhY2tncm91bmRDb2xvciksXG4gICAgICAgICAgICAgIGF2ZXJhZ2VzOiB0aGlzLm91dHB1dERhdGEubWFwKGQgPT4gZC5hdmVyYWdlKVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaG93RXJyb3JzKHtcbiAgICAgICAgZXJyb3JzOiBbXSxcbiAgICAgICAgZmF0YWxFcnJvcnM6IFtlcnJdXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcuY2hhcnQtbGVnZW5kJykuaHRtbCh0aGlzLmNoYXJ0T2JqLmdlbmVyYXRlTGVnZW5kKCkpO1xuICAgICQoJy5kYXRhLWxpbmtzJykucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuXG4gICAgaWYgKHRoaXMuYXBwID09PSAncGFnZXZpZXdzJykgdGhpcy51cGRhdGVUYWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgZXJyb3JzIGJ1aWx0IGluIHRoaXMucHJvY2Vzc0lucHV0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSB4aHJEYXRhIC0gYXMgYnVpbHQgYnkgdGhpcy5wcm9jZXNzSW5wdXQsIGxpa2UgYHsgZXJyb3JzOiBbXSwgZmF0YWxFcnJvcnM6IFtdIH1gXG4gICAqIEByZXR1cm5zIHtib29sZWFufSB3aGV0aGVyIG9yIG5vdCBmYXRhbCBlcnJvcnMgb2NjdXJlZFxuICAgKi9cbiAgc2hvd0Vycm9ycyh4aHJEYXRhKSB7XG4gICAgaWYgKHhockRhdGEuZmF0YWxFcnJvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2V0Vmlldyh0cnVlKTtcbiAgICAgIGNvbnN0IGZhdGFsRXJyb3JzID0geGhyRGF0YS5mYXRhbEVycm9ycy51bmlxdWUoKTtcbiAgICAgIHRoaXMuc2hvd0ZhdGFsRXJyb3JzKGZhdGFsRXJyb3JzKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHhockRhdGEuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgLy8gaWYgZXZlcnl0aGluZyBmYWlsZWQsIHJlc2V0IHRoZSB2aWV3LCBjbGVhcmluZyBvdXQgc3BhY2UgdGFrZW4gdXAgYnkgZW1wdHkgY2hhcnRcbiAgICAgIGlmICh4aHJEYXRhLmVudGl0aWVzICYmICh4aHJEYXRhLmVycm9ycy5sZW5ndGggPT09IHhockRhdGEuZW50aXRpZXMubGVuZ3RoIHx8ICF4aHJEYXRhLmVudGl0aWVzLmxlbmd0aCkpIHtcbiAgICAgICAgdGhpcy5yZXNldFZpZXcoKTtcbiAgICAgIH1cblxuICAgICAgeGhyRGF0YS5lcnJvcnMudW5pcXVlKCkuZm9yRWFjaChlcnJvciA9PiB0aGlzLndyaXRlTWVzc2FnZShlcnJvcikpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGFydEhlbHBlcnM7XG4iLCIvKipcbiAqIEBmaWxlIENvcmUgSmF2YVNjcmlwdCBleHRlbnNpb25zLCBlaXRoZXIgdG8gbmF0aXZlIEpTIG9yIGEgbGlicmFyeS5cbiAqICAgUG9seWZpbGxzIGhhdmUgdGhlaXIgb3duIGZpbGUgW3BvbHlmaWxscy5qc10oZ2xvYmFsLmh0bWwjcG9seWZpbGxzKVxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5TdHJpbmcucHJvdG90eXBlLmRlc2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXy9nLCAnICcpO1xufTtcblN0cmluZy5wcm90b3R5cGUuc2NvcmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvIC9nLCAnXycpO1xufTtcblN0cmluZy5wcm90b3R5cGUudXBjYXNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zbGljZSgxKTtcbn07XG5TdHJpbmcucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcvJzogJyYjeDJGOydcbiAgfTtcblxuICByZXR1cm4gdGhpcy5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBzID0+IHtcbiAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICB9KTtcbn07XG5cbi8vIHJlbW92ZSBkdXBsaWNhdGUgdmFsdWVzIGZyb20gQXJyYXlcbkFycmF5LnByb3RvdHlwZS51bmlxdWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4O1xuICB9KTtcbn07XG5cbi8vIEltcHJvdmUgc3ludGF4IHRvIGVtdWxhdGUgbWl4aW5zIGluIEVTNlxud2luZG93Lm1peCA9IHN1cGVyY2xhc3MgPT4gbmV3IE1peGluQnVpbGRlcihzdXBlcmNsYXNzKTtcbmNsYXNzIE1peGluQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHN1cGVyY2xhc3MpIHtcbiAgICB0aGlzLnN1cGVyY2xhc3MgPSBzdXBlcmNsYXNzO1xuICB9XG5cbiAgd2l0aCguLi5taXhpbnMpIHtcbiAgICByZXR1cm4gbWl4aW5zLnJlZHVjZSgoYywgbWl4aW4pID0+IG1peGluKGMpLCB0aGlzLnN1cGVyY2xhc3MpO1xuICB9XG59XG5cbi8qXG4gKiBIT1QgUEFUQ0ggZm9yIENoYXJ0LmpzIGdldEVsZW1lbnRzQXRFdmVudFxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoYXJ0anMvQ2hhcnQuanMvaXNzdWVzLzIyOTlcbiAqIFRPRE86IHJlbW92ZSBtZSB3aGVuIHRoaXMgZ2V0cyBpbXBsZW1lbnRlZCBpbnRvIENoYXJ0cy5qcyBjb3JlXG4gKi9cbmlmICh0eXBlb2YgQ2hhcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIENoYXJ0LkNvbnRyb2xsZXIucHJvdG90eXBlLmdldEVsZW1lbnRzQXRFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgaGVscGVycyA9IENoYXJ0LmhlbHBlcnM7XG4gICAgbGV0IGV2ZW50UG9zaXRpb24gPSBoZWxwZXJzLmdldFJlbGF0aXZlUG9zaXRpb24oZSwgdGhpcy5jaGFydCk7XG4gICAgbGV0IGVsZW1lbnRzQXJyYXkgPSBbXTtcblxuICAgIGxldCBmb3VuZCA9IChmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuZGF0YXNldHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEuZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyh0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGEpWzBdO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5kYXRhLmRhdGFzZXRzW2ldLl9tZXRhW2tleV0uZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWRlcHRoICovXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmRhdGFzZXRzW2ldLl9tZXRhW2tleV0uZGF0YVtqXS5pbkxhYmVsUmFuZ2UoZXZlbnRQb3NpdGlvbi54LCBldmVudFBvc2l0aW9uLnkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZGF0YXNldHNbaV0uX21ldGFba2V5XS5kYXRhW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLmNhbGwodGhpcyk7XG5cbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICByZXR1cm4gZWxlbWVudHNBcnJheTtcbiAgICB9XG5cbiAgICBoZWxwZXJzLmVhY2godGhpcy5kYXRhLmRhdGFzZXRzLCBmdW5jdGlvbihkYXRhc2V0LCBkc0luZGV4KSB7XG4gICAgICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyhkYXRhc2V0Ll9tZXRhKVswXTtcbiAgICAgIGVsZW1lbnRzQXJyYXkucHVzaChkYXRhc2V0Ll9tZXRhW2tleV0uZGF0YVtmb3VuZC5faW5kZXhdKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBlbGVtZW50c0FycmF5O1xuICB9O1xufVxuXG4kLndoZW5BbGwgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICBjb3VudGVyID0gMCxcbiAgICBzdGF0ZSA9ICdyZXNvbHZlZCcsXG4gICAgcHJvbWlzZXMgPSBuZXcgQXJyYXkoLi4uYXJndW1lbnRzKTtcblxuICBjb25zdCByZXNvbHZlT3JSZWplY3QgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ3JlamVjdGVkJykge1xuICAgICAgc3RhdGUgPSAncmVqZWN0ZWQnO1xuICAgIH1cbiAgICBjb3VudGVyKys7XG5cbiAgICBpZiAoY291bnRlciA9PT0gcHJvbWlzZXMubGVuZ3RoKSB7XG4gICAgICBkZmRbc3RhdGUgPT09ICdyZWplY3RlZCcgPyAncmVqZWN0JyA6ICdyZXNvbHZlJ10oKTtcbiAgICB9XG5cbiAgfTtcblxuICAkLmVhY2gocHJvbWlzZXMsIChfaSwgcHJvbWlzZSkgPT4ge1xuICAgIHByb21pc2UuYWx3YXlzKHJlc29sdmVPclJlamVjdCk7XG4gIH0pO1xuXG4gIHJldHVybiBkZmQucHJvbWlzZSgpO1xufTtcbiIsIi8qKlxuICogQGZpbGUgUG9seWZpbGxzIGZvciB1c2VycyB3aG8gcmVmdXNlIHRvIHVwZ3JhZGUgdGhlaXIgYnJvd3NlcnNcbiAqICAgTW9zdCBjb2RlIGlzIGFkYXB0ZWQgZnJvbSBbTUROXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZylcbiAqL1xuXG4vLyBBcnJheS5pbmNsdWRlcyBmdW5jdGlvbiBwb2x5ZmlsbFxuLy8gVGhpcyBpcyBub3QgYSBmdWxsIGltcGxlbWVudGF0aW9uLCBqdXN0IGEgc2hvcnRoYW5kIHRvIGluZGV4T2YgIT09IC0xXG5pZiAoICFBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgKSB7XG4gIEFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uKHNlYXJjaCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTE7XG4gIH07XG59XG5cbi8vIFN0cmluZy5pbmNsdWRlcyBmdW5jdGlvbiBwb2x5ZmlsbFxuaWYgKCAhU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyApIHtcbiAgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uKHNlYXJjaCwgc3RhcnQpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ICE9PSAnbnVtYmVyJykge1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cblxuICAgIGlmIChzdGFydCArIHNlYXJjaC5sZW5ndGggPiB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmRleE9mKHNlYXJjaCxzdGFydCkgIT09IC0xO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gT2JqZWN0LmFzc2lnblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSAnZnVuY3Rpb24nKSB7XG4gIChmdW5jdGlvbigpIHtcbiAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICBsZXQgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBsZXQgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGZvciAobGV0IG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgIG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfSkoKTtcbn1cblxuLy8gQ2hpbGROb2RlLnJlbW92ZVxuaWYgKCEoJ3JlbW92ZScgaW4gRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbn1cblxuLy8gU3RyaW5nLnN0YXJ0c1dpdGhcbmlmICghU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKSB7XG4gIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIHx8IDA7XG4gICAgcmV0dXJuIHRoaXMuc3Vic3RyKHBvc2l0aW9uLCBzZWFyY2hTdHJpbmcubGVuZ3RoKSA9PT0gc2VhcmNoU3RyaW5nO1xuICB9O1xufVxuXG4vLyBBcnJheS5vZlxuaWYgKCFBcnJheS5vZikge1xuICBBcnJheS5vZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vLyBBcnJheS5maW5kXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICBsZXQgbGlzdCA9IE9iamVjdCh0aGlzKTtcbiAgICBsZXQgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XG4gICAgbGV0IHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgbGV0IHZhbHVlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSBsaXN0W2ldO1xuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbi8vIEFycmF5LmZpbGxcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbGwpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbih2YWx1ZSkge1xuXG4gICAgLy8gU3RlcHMgMS0yLlxuICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0aGlzIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTtcbiAgICB9XG5cbiAgICBsZXQgTyA9IE9iamVjdCh0aGlzKTtcblxuICAgIC8vIFN0ZXBzIDMtNS5cbiAgICBsZXQgbGVuID0gTy5sZW5ndGggPj4+IDA7XG5cbiAgICAvLyBTdGVwcyA2LTcuXG4gICAgbGV0IHN0YXJ0ID0gYXJndW1lbnRzWzFdO1xuICAgIGxldCByZWxhdGl2ZVN0YXJ0ID0gc3RhcnQgPj4gMDtcblxuICAgIC8vIFN0ZXAgOC5cbiAgICBsZXQgayA9IHJlbGF0aXZlU3RhcnQgPCAwID9cbiAgICAgIE1hdGgubWF4KGxlbiArIHJlbGF0aXZlU3RhcnQsIDApIDpcbiAgICAgIE1hdGgubWluKHJlbGF0aXZlU3RhcnQsIGxlbik7XG5cbiAgICAvLyBTdGVwcyA5LTEwLlxuICAgIGxldCBlbmQgPSBhcmd1bWVudHNbMl07XG4gICAgbGV0IHJlbGF0aXZlRW5kID0gZW5kID09PSB1bmRlZmluZWQgP1xuICAgICAgbGVuIDogZW5kID4+IDA7XG5cbiAgICAvLyBTdGVwIDExLlxuICAgIGxldCBmaW5hbCA9IHJlbGF0aXZlRW5kIDwgMCA/XG4gICAgICBNYXRoLm1heChsZW4gKyByZWxhdGl2ZUVuZCwgMCkgOlxuICAgICAgTWF0aC5taW4ocmVsYXRpdmVFbmQsIGxlbik7XG5cbiAgICAvLyBTdGVwIDEyLlxuICAgIHdoaWxlIChrIDwgZmluYWwpIHtcbiAgICAgIE9ba10gPSB2YWx1ZTtcbiAgICAgIGsrKztcbiAgICB9XG5cbiAgICAvLyBTdGVwIDEzLlxuICAgIHJldHVybiBPO1xuICB9O1xufVxuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgY29kZSBhbW9uZ3N0IGFsbCBhcHBzIChQYWdldmlld3MsIFRvcHZpZXdzLCBMYW5ndmlld3MsIFNpdGV2aWV3cywgTWFzc3ZpZXdzLCBSZWRpcmVjdCBWaWV3cylcbiAqIEBhdXRob3IgTXVzaWtBbmltYWwsIEthbGRhcmlcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuLyoqIGNsYXNzLWxlc3MgZmlsZXMgd2l0aCBnbG9iYWwgb3ZlcnJpZGVzICovXG5yZXF1aXJlKCcuL2NvcmVfZXh0ZW5zaW9ucycpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMnKTtcblxuY29uc3QgUHZDb25maWcgPSByZXF1aXJlKCcuL3B2X2NvbmZpZycpO1xuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4vc2l0ZV9tYXAnKTtcbmNvbnN0IHNpdGVEb21haW5zID0gT2JqZWN0LmtleXMoc2l0ZU1hcCkubWFwKGtleSA9PiBzaXRlTWFwW2tleV0pO1xuXG4vKiogUHYgY2xhc3MsIGNvbnRhaW5zIGNvZGUgYW1vbmdzdCBhbGwgYXBwcyAoUGFnZXZpZXdzLCBUb3B2aWV3cywgTGFuZ3ZpZXdzLCBTaXRldmlld3MsIE1hc3N2aWV3cywgUmVkaXJlY3QgVmlld3MpICovXG5jbGFzcyBQdiBleHRlbmRzIFB2Q29uZmlnIHtcbiAgY29uc3RydWN0b3IoYXBwQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBwQ29uZmlnKTtcblxuICAgIC8qKiBhc3NpZ24gaW5pdGlhbCBjbGFzcyBwcm9wZXJ0aWVzICovXG4gICAgY29uc3QgZGVmYXVsdHMgPSB0aGlzLmNvbmZpZy5kZWZhdWx0cyxcbiAgICAgIHZhbGlkUGFyYW1zID0gdGhpcy5jb25maWcudmFsaWRQYXJhbXM7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZywgYXBwQ29uZmlnKTtcbiAgICB0aGlzLmNvbmZpZy5kZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBhcHBDb25maWcuZGVmYXVsdHMpO1xuICAgIHRoaXMuY29uZmlnLnZhbGlkUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsaWRQYXJhbXMsIGFwcENvbmZpZy52YWxpZFBhcmFtcyk7XG5cbiAgICB0aGlzLmNvbG9yc1N0eWxlRWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zdG9yYWdlID0ge307IC8vIHVzZWQgYXMgZmFsbGJhY2sgd2hlbiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuXG4gICAgWydsb2NhbGl6ZURhdGVGb3JtYXQnLCAnbnVtZXJpY2FsRm9ybWF0dGluZycsICdiZXppZXJDdXJ2ZScsICdhdXRvY29tcGxldGUnLCAnYXV0b0xvZ0RldGVjdGlvbicsICdiZWdpbkF0WmVybycsICdyZW1lbWJlckNoYXJ0J10uZm9yRWFjaChzZXR0aW5nID0+IHtcbiAgICAgIHRoaXNbc2V0dGluZ10gPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoYHBhZ2V2aWV3cy1zZXR0aW5ncy0ke3NldHRpbmd9YCkgfHwgdGhpcy5jb25maWcuZGVmYXVsdHNbc2V0dGluZ107XG4gICAgfSk7XG4gICAgdGhpcy5zZXR1cFNldHRpbmdzTW9kYWwoKTtcblxuICAgIHRoaXMucGFyYW1zID0gbnVsbDtcbiAgICB0aGlzLnNpdGVJbmZvID0ge307XG5cbiAgICAvKiogQHR5cGUge251bGx8RGF0ZX0gdHJhY2tpbmcgb2YgZWxhcHNlZCB0aW1lICovXG4gICAgdGhpcy5wcm9jZXNzU3RhcnQgPSBudWxsO1xuXG4gICAgLyoqIGFzc2lnbiBhcHAgaW5zdGFuY2UgdG8gd2luZG93IGZvciBkZWJ1Z2dpbmcgb24gbG9jYWwgZW52aXJvbm1lbnQgKi9cbiAgICBpZiAobG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCcpIHtcbiAgICAgIHdpbmRvdy5hcHAgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNwbGFzaCgpO1xuICAgIH1cblxuICAgIHRoaXMuZGVidWcgPSBsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoJ2RlYnVnPXRydWUnKSB8fCBsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0JztcblxuICAgIC8qKiBzaG93IG5vdGljZSBpZiBvbiBzdGFnaW5nIGVudmlyb25tZW50ICovXG4gICAgaWYgKC8tdGVzdC8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHtcbiAgICAgIGNvbnN0IGFjdHVhbFBhdGhOYW1lID0gbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvLXRlc3RcXC8/LywgJycpO1xuICAgICAgdGhpcy5hZGRTaXRlTm90aWNlKCd3YXJuaW5nJyxcbiAgICAgICAgYFRoaXMgaXMgYSBzdGFnaW5nIGVudmlyb25tZW50LiBGb3IgdGhlIGFjdHVhbCAke2RvY3VtZW50LnRpdGxlfSxcbiAgICAgICAgIHNlZSA8YSBocmVmPScke2FjdHVhbFBhdGhOYW1lfSc+JHtsb2NhdGlvbi5ob3N0bmFtZX0ke2FjdHVhbFBhdGhOYW1lfTwvYT5gXG4gICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdHJhbnNsYXRpb25zIHRoZW4gaW5pdGlhbGl6ZSB0aGUgYXBwLlxuICAgICAqIEVhY2ggYXBwIGhhcyBpdCdzIG93biBpbml0aWFsaXplIG1ldGhvZC5cbiAgICAgKiBNYWtlIHN1cmUgd2UgbG9hZCAnZW4uanNvbicgYXMgYSBmYWxsYmFja1xuICAgICAqL1xuICAgIGxldCBtZXNzYWdlc1RvTG9hZCA9IHtcbiAgICAgIFtpMThuTGFuZ106IGAvcGFnZXZpZXdzL21lc3NhZ2VzLyR7aTE4bkxhbmd9Lmpzb25gXG4gICAgfTtcbiAgICBpZiAoaTE4bkxhbmcgIT09ICdlbicpIHtcbiAgICAgIG1lc3NhZ2VzVG9Mb2FkLmVuID0gJy9wYWdldmlld3MvbWVzc2FnZXMvZW4uanNvbic7XG4gICAgfVxuICAgICQuaTE4bih7XG4gICAgICBsb2NhbGU6IGkxOG5MYW5nXG4gICAgfSkubG9hZChtZXNzYWdlc1RvTG9hZCkudGhlbih0aGlzLmluaXRpYWxpemUuYmluZCh0aGlzKSk7XG5cbiAgICAvKiogc2V0IHVwIHRvYXN0ciBjb25maWcuIFRoZSBkdXJhdGlvbiBtYXkgYmUgb3ZlcnJpZGVuIGxhdGVyICovXG4gICAgdG9hc3RyLm9wdGlvbnMgPSB7XG4gICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgIGRlYnVnOiBsb2NhdGlvbi5ob3N0ID09PSAnbG9jYWxob3N0JyxcbiAgICAgIG5ld2VzdE9uVG9wOiBmYWxzZSxcbiAgICAgIHByb2dyZXNzQmFyOiBmYWxzZSxcbiAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC10b3AtY2VudGVyJyxcbiAgICAgIHByZXZlbnREdXBsaWNhdGVzOiB0cnVlLFxuICAgICAgb25jbGljazogbnVsbCxcbiAgICAgIHNob3dEdXJhdGlvbjogJzMwMCcsXG4gICAgICBoaWRlRHVyYXRpb246ICcxMDAwJyxcbiAgICAgIHRpbWVPdXQ6ICc1MDAwJyxcbiAgICAgIGV4dGVuZGVkVGltZU91dDogJzMwMDAnLFxuICAgICAgc2hvd0Vhc2luZzogJ3N3aW5nJyxcbiAgICAgIGhpZGVFYXNpbmc6ICdsaW5lYXInLFxuICAgICAgc2hvd01ldGhvZDogJ2ZhZGVJbicsXG4gICAgICBoaWRlTWV0aG9kOiAnZmFkZU91dCcsXG4gICAgICB0b2FzdENsYXNzOiAnYWxlcnQnLFxuICAgICAgaWNvbkNsYXNzZXM6IHtcbiAgICAgICAgZXJyb3I6ICdhbGVydC1kYW5nZXInLFxuICAgICAgICBpbmZvOiAnYWxlcnQtaW5mbycsXG4gICAgICAgIHN1Y2Nlc3M6ICdhbGVydC1zdWNjZXNzJyxcbiAgICAgICAgd2FybmluZzogJ2FsZXJ0LXdhcm5pbmcnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBzaXRlIG5vdGljZSAoQm9vdHN0cmFwIGFsZXJ0KVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbGV2ZWwgLSBvbmUgb2YgJ3N1Y2Nlc3MnLCAnaW5mbycsICd3YXJuaW5nJyBvciAnZXJyb3InXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIC0gbWVzc2FnZSB0byBzaG93XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbdGl0bGVdIC0gd2lsbCBhcHBlYXIgaW4gYm9sZCBhbmQgaW4gZnJvbnQgb2YgdGhlIG1lc3NhZ2VcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZGlzbWlzc2FibGVdIC0gd2hldGhlciBvciBub3QgdG8gYWRkIGEgWFxuICAgKiAgIHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIGRpc21pc3MgdGhlIG5vdGljZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgYWRkU2l0ZU5vdGljZShsZXZlbCwgbWVzc2FnZSwgdGl0bGUsIGRpc21pc3NhYmxlKSB7XG4gICAgdGl0bGUgPSB0aXRsZSA/IGA8c3Ryb25nPiR7dGl0bGV9PC9zdHJvbmc+IGAgOiAnJztcblxuICAgIGxldCBtYXJrdXAgPSB0aXRsZSArIG1lc3NhZ2U7XG5cbiAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgIG1hcmt1cCxcbiAgICAgIGxldmVsLFxuICAgICAgZGlzbWlzc2FibGUgPyAxMDAwMCA6IDBcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzaXRlIG5vdGljZSBmb3IgaW52YWxpZCBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmFtIC0gbmFtZSBvZiBwYXJhbWV0ZXJcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGFkZEludmFsaWRQYXJhbU5vdGljZShwYXJhbSkge1xuICAgIGNvbnN0IGRvY0xpbmsgPSBgPGEgaHJlZj0nLyR7dGhpcy5hcHB9L3VybF9zdHJ1Y3R1cmUnPiR7JC5pMThuKCdkb2N1bWVudGF0aW9uJyl9PC9hPmA7XG4gICAgdGhpcy5hZGRTaXRlTm90aWNlKFxuICAgICAgJ2Vycm9yJyxcbiAgICAgICQuaTE4bigncGFyYW0tZXJyb3ItMycsIHBhcmFtLCBkb2NMaW5rKSxcbiAgICAgICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSxcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIHRoZSBkYXRlIHJhbmdlIG9mIGdpdmVuIHBhcmFtc1xuICAgKiAgIGFuZCB0aHJvdyBlcnJvcnMgYXMgbmVjZXNzYXJ5IGFuZC9vciBzZXQgZGVmYXVsdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIGFzIHJldHVybmVkIGJ5IHRoaXMucGFyc2VRdWVyeVN0cmluZygpXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZXJlIHdlcmUgbm8gZXJyb3JzLCBmYWxzZSBvdGhlcndpc2VcbiAgICovXG4gIHZhbGlkYXRlRGF0ZVJhbmdlKHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMucmFuZ2UpIHtcbiAgICAgIGlmICghdGhpcy5zZXRTcGVjaWFsUmFuZ2UocGFyYW1zLnJhbmdlKSkge1xuICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZSgncmFuZ2UnKTtcbiAgICAgICAgdGhpcy5zZXRTcGVjaWFsUmFuZ2UodGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZVJhbmdlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhcmFtcy5zdGFydCkge1xuICAgICAgY29uc3QgZGF0ZVJlZ2V4ID0gL1xcZHs0fS1cXGR7Mn0tXFxkezJ9JC87XG5cbiAgICAgIC8vIGZpcnN0IHNldCBkZWZhdWx0c1xuICAgICAgbGV0IHN0YXJ0RGF0ZSwgZW5kRGF0ZTtcblxuICAgICAgLy8gdGhlbiBjaGVjayBmb3JtYXQgb2Ygc3RhcnQgYW5kIGVuZCBkYXRlXG4gICAgICBpZiAocGFyYW1zLnN0YXJ0ICYmIGRhdGVSZWdleC50ZXN0KHBhcmFtcy5zdGFydCkpIHtcbiAgICAgICAgc3RhcnREYXRlID0gbW9tZW50KHBhcmFtcy5zdGFydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZSgnc3RhcnQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5lbmQgJiYgZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLmVuZCkpIHtcbiAgICAgICAgZW5kRGF0ZSA9IG1vbWVudChwYXJhbXMuZW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKCdlbmQnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiB0aGV5IGFyZSBvdXRzaWRlIHRoZSB2YWxpZCByYW5nZSBvciBpZiBpbiB0aGUgd3Jvbmcgb3JkZXJcbiAgICAgIGlmIChzdGFydERhdGUgPCB0aGlzLmNvbmZpZy5taW5EYXRlIHx8IGVuZERhdGUgPCB0aGlzLmNvbmZpZy5taW5EYXRlKSB7XG4gICAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnZXJyb3InLFxuICAgICAgICAgICQuaTE4bigncGFyYW0tZXJyb3ItMScsIG1vbWVudCh0aGlzLmNvbmZpZy5taW5EYXRlKS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KSksXG4gICAgICAgICAgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChzdGFydERhdGUgPiBlbmREYXRlKSB7XG4gICAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnZXJyb3InLCAkLmkxOG4oJ3BhcmFtLWVycm9yLTInKSwgJC5pMThuKCdpbnZhbGlkLXBhcmFtcycpLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKiogZGlyZWN0bHkgYXNzaWduIHN0YXJ0RGF0ZSBiZWZvcmUgY2FsbGluZyBzZXRFbmREYXRlIHNvIGV2ZW50cyB3aWxsIGJlIGZpcmVkIG9uY2UgKi9cbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnNldEVuZERhdGUoZW5kRGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3BlY2lhbFJhbmdlKHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVSYW5nZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjbGVhclNpdGVOb3RpY2VzKCkge1xuICAgICQoJy5zaXRlLW5vdGljZScpLmh0bWwoJycpO1xuICB9XG5cbiAgY2xlYXJNZXNzYWdlcygpIHtcbiAgICAkKCcubWVzc2FnZS1jb250YWluZXInKS5odG1sKCcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0ZSBmb3JtYXQgdG8gdXNlIGJhc2VkIG9uIHNldHRpbmdzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRhdGUgZm9ybWF0IHRvIHBhc3NlZCB0byBwYXJzZXJcbiAgICovXG4gIGdldCBkYXRlRm9ybWF0KCkge1xuICAgIGlmICh0aGlzLmxvY2FsaXplRGF0ZUZvcm1hdCA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMb2NhbGVEYXRlU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlRm9ybWF0O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRhdGVyYW5nZXBpY2tlciBpbnN0YW5jZS4gUGxhaW4gYW5kIHNpbXBsZS5cbiAgICogQHJldHVybiB7T2JqZWN0fSBkYXRlcmFuZ2UgcGlja2VyXG4gICAqL1xuICBnZXQgZGF0ZXJhbmdlcGlja2VyKCkge1xuICAgIHJldHVybiAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRhdGFiYXNlIG5hbWUgb2YgdGhlIGdpdmVuIHByb2pldFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHByb2plY3QgLSB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9IGRhdGFiYXNlIG5hbWVcbiAgICovXG4gIGRiTmFtZShwcm9qZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNpdGVNYXApLmZpbmQoa2V5ID0+IHNpdGVNYXBba2V5XSA9PT0gYCR7cHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywnJyl9Lm9yZ2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlIGRvd25sb2FkIG9mIGdpdmVuIGRhdGEsIG9yIG9wZW4gaW4gYSBuZXcgdGFiIGlmIEhUTUw1IDxhPiBkb3dubG9hZCBhdHRyaWJ1dGUgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSAtIFJhdyBkYXRhIHByZXBlbmRlZCB3aXRoIGRhdGEgdHlwZSwgZS5nLiBcImRhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCxteSBkYXRhLi4uXCJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV4dGVuc2lvbiAtIHRoZSBmaWxlIGV4dGVuc2lvbiB0byB1c2VcbiAgICogQHJldHVybnMge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGRvd25sb2FkRGF0YShkYXRhLCBleHRlbnNpb24pIHtcbiAgICBjb25zdCBlbmNvZGVkVXJpID0gZW5jb2RlVVJJKGRhdGEpO1xuXG4gICAgLy8gY3JlYXRlIEhUTUw1IGRvd25sb2FkIGVsZW1lbnQgYW5kIGZvcmNlIGNsaWNrIHNvIHdlIGNhbiBzcGVjaWZ5IGEgZmlsZW5hbWVcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGlmICh0eXBlb2YgbGluay5kb3dubG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7IC8vIEZpcmVmb3ggcmVxdWlyZXMgdGhlIGxpbmsgdG8gYmUgaW4gdGhlIGJvZHlcblxuICAgICAgY29uc3QgZmlsZW5hbWUgPSBgJHt0aGlzLmdldEV4cG9ydEZpbGVuYW1lKCl9LiR7ZXh0ZW5zaW9ufWA7XG4gICAgICBsaW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgICBsaW5rLmhyZWYgPSBlbmNvZGVkVXJpO1xuICAgICAgbGluay5jbGljaygpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspOyAvLyByZW1vdmUgdGhlIGxpbmsgd2hlbiBkb25lXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5vcGVuKGVuY29kZWRVcmkpOyAvLyBvcGVuIGluIG5ldyB0YWIgaWYgZG93bmxvYWQgaXNuJ3Qgc3VwcG9ydGVkICgqY291Z2gqIFNhZmFyaSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlsbCBpbiB2YWx1ZXMgd2l0aGluIHNldHRpbmdzIG1vZGFsIHdpdGggd2hhdCdzIGluIHRoZSBzZXNzaW9uIG9iamVjdFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZmlsbEluU2V0dGluZ3MoKSB7XG4gICAgJC5lYWNoKCQoJyNzZXR0aW5ncy1tb2RhbCBpbnB1dCcpLCAoaW5kZXgsIGVsKSA9PiB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICBlbC5jaGVja2VkID0gdGhpc1tlbC5uYW1lXSA9PT0gJ3RydWUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHRoaXNbZWwubmFtZV0gPT09IGVsLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBmb2N1cyB0byBTZWxlY3QyIGlucHV0IGZpZWxkXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBmb2N1c1NlbGVjdDIoKSB7XG4gICAgJCgnLnNlbGVjdDItc2VsZWN0aW9uJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAkKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJykuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgbnVtYmVyIGJhc2VkIG9uIGN1cnJlbnQgc2V0dGluZ3MsIGUuZy4gbG9jYWxpemUgd2l0aCBjb21tYSBkZWxpbWV0ZXJzXG4gICAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gbnVtIC0gbnVtYmVyIHRvIGZvcm1hdFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBmb3JtYXR0ZWQgbnVtYmVyXG4gICAqL1xuICBmb3JtYXROdW1iZXIobnVtKSB7XG4gICAgY29uc3QgbnVtZXJpY2FsRm9ybWF0dGluZyA9IHRoaXMuZ2V0RnJvbUxvY2FsU3RvcmFnZSgncGFnZXZpZXdzLXNldHRpbmdzLW51bWVyaWNhbEZvcm1hdHRpbmcnKSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0cy5udW1lcmljYWxGb3JtYXR0aW5nO1xuICAgIGlmIChudW1lcmljYWxGb3JtYXR0aW5nID09PSAndHJ1ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLm4obnVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRZQXhpc051bWJlcihudW0pIHtcbiAgICBpZiAobnVtICUgMSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVyKG51bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRlIGhlYWRpbmdzIGFzIHN0cmluZ3MgLSBpMThuIGNvbXBsaWFudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGxvY2FsaXplZCAtIHdoZXRoZXIgdGhlIGRhdGVzIHNob3VsZCBiZSBsb2NhbGl6ZWQgcGVyIGJyb3dzZXIgbGFuZ3VhZ2VcbiAgICogQHJldHVybnMge0FycmF5fSB0aGUgZGF0ZSBoZWFkaW5ncyBhcyBzdHJpbmdzXG4gICAqL1xuICBnZXREYXRlSGVhZGluZ3MobG9jYWxpemVkKSB7XG4gICAgY29uc3QgZGF0ZUhlYWRpbmdzID0gW10sXG4gICAgICBlbmREYXRlID0gbW9tZW50KHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUpLmFkZCgxLCAnZCcpO1xuXG4gICAgZm9yIChsZXQgZGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUpOyBkYXRlLmlzQmVmb3JlKGVuZERhdGUpOyBkYXRlLmFkZCgxLCAnZCcpKSB7XG4gICAgICBpZiAobG9jYWxpemVkKSB7XG4gICAgICAgIGRhdGVIZWFkaW5ncy5wdXNoKGRhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0ZUhlYWRpbmdzLnB1c2goZGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRlSGVhZGluZ3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBsYW5kZWQgd2lraSBVUkwgZ2l2ZW4gdGhlIHBhZ2UgbmFtZVxuICAgKiBUaGlzIHNob3VsZCBiZSB1c2VkIGluc3RlYWQgb2YgZ2V0UGFnZVVSTCB3aGVuIHlvdSB3YW50IHRvIGNoYWluIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlIG5hbWVcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgcGFnZVxuICAgKi9cbiAgZ2V0RXhwYW5kZWRQYWdlVVJMKHBhZ2UpIHtcbiAgICByZXR1cm4gYC8vJHt0aGlzLnByb2plY3R9Lm9yZy93L2luZGV4LnBocD90aXRsZT0ke2VuY29kZVVSSUNvbXBvbmVudChwYWdlLnNjb3JlKCkpLnJlcGxhY2UoLycvLCBlc2NhcGUpfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGluZm9ybWF0aXZlIGZpbGVuYW1lIHdpdGhvdXQgZXh0ZW5zaW9uIHRvIGJlIHVzZWQgZm9yIGV4cG9ydCBvcHRpb25zXG4gICAqIEByZXR1cm4ge3N0cmluZ30gZmlsZW5hbWUgd2l0aG91dCBhbiBleHRlbnNpb25cbiAgICovXG4gIGdldEV4cG9ydEZpbGVuYW1lKCkge1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZS5zdGFydE9mKCdkYXknKS5mb3JtYXQoJ1lZWVlNTUREJyksXG4gICAgICBlbmREYXRlID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5zdGFydE9mKCdkYXknKS5mb3JtYXQoJ1lZWVlNTUREJyk7XG4gICAgcmV0dXJuIGAke3RoaXMuYXBwfS0ke3N0YXJ0RGF0ZX0tJHtlbmREYXRlfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgZnVsbCBsaW5rIGZvciB0aGUgZ2l2ZW4gcGFnZSBhbmQgcHJvamVjdFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHBhZ2UgLSBwYWdlIHRvIGxpbmsgdG9cbiAgICogQHBhcmFtICB7c3RyaW5nfSBbcHJvamVjdF0gLSBwcm9qZWN0IGxpbmssIGRlZmF1bHRzIHRvIGB0aGlzLnByb2plY3RgXG4gICAqIEByZXR1cm4ge3N0cmluZ30gSFRNTCBtYXJrdXBcbiAgICovXG4gIGdldFBhZ2VMaW5rKHBhZ2UsIHByb2plY3QpIHtcbiAgICByZXR1cm4gYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIke3RoaXMuZ2V0UGFnZVVSTChwYWdlLCBwcm9qZWN0KX1cIj4ke3BhZ2UuZGVzY29yZSgpLmVzY2FwZSgpfTwvYT5gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgd2lraSBVUkwgZ2l2ZW4gdGhlIHBhZ2UgbmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZSAtIHBhZ2UgbmFtZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBwYWdlXG4gICAqL1xuICBnZXRQYWdlVVJMKHBhZ2UsIHByb2plY3QgPSB0aGlzLnByb2plY3QpIHtcbiAgICByZXR1cm4gYC8vJHtwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCAnJykuZXNjYXBlKCl9Lm9yZy93aWtpLyR7cGFnZS5zY29yZSgpLnJlcGxhY2UoLycvLCBlc2NhcGUpfWA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB3aWtpIFVSTCBnaXZlbiB0aGUgcGFnZSBuYW1lXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzaXRlIC0gc2l0ZSBuYW1lIChlLmcuIGVuLndpa2lwZWRpYS5vcmcpXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHNpdGVcbiAgICovXG4gIGdldFNpdGVMaW5rKHNpdGUpIHtcbiAgICByZXR1cm4gYDxhIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCIvLyR7c2l0ZX0ub3JnXCI+JHtzaXRlfTwvYT5gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJvamVjdCBuYW1lICh3aXRob3V0IHRoZSAub3JnKVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gbGFuZy5wcm9qZWN0bmFtZVxuICAgKi9cbiAgZ2V0IHByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9ICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwoKTtcbiAgICAvKiogR2V0IHRoZSBmaXJzdCAyIGNoYXJhY3RlcnMgZnJvbSB0aGUgcHJvamVjdCBjb2RlIHRvIGdldCB0aGUgbGFuZ3VhZ2UgKi9cbiAgICByZXR1cm4gcHJvamVjdCA/IHByb2plY3QudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8ub3JnJC8sICcnKSA6IG51bGw7XG4gIH1cblxuICBnZXRMb2NhbGVEYXRlU3RyaW5nKCkge1xuICAgIGlmICghbmF2aWdhdG9yLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZUZvcm1hdDtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtYXRzID0ge1xuICAgICAgJ2FyLXNhJzogJ0REL01NL1lZJyxcbiAgICAgICdiZy1iZyc6ICdERC5NLllZWVknLFxuICAgICAgJ2NhLWVzJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLXR3JzogJ1lZWVkvTS9EJyxcbiAgICAgICdjcy1jeic6ICdELk0uWVlZWScsXG4gICAgICAnZGEtZGsnOiAnREQtTU0tWVlZWScsXG4gICAgICAnZGUtZGUnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZWwtZ3InOiAnRC9NL1lZWVknLFxuICAgICAgJ2VuLXVzJzogJ00vRC9ZWVlZJyxcbiAgICAgICdmaS1maSc6ICdELk0uWVlZWScsXG4gICAgICAnZnItZnInOiAnREQvTU0vWVlZWScsXG4gICAgICAnaGUtaWwnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHUtaHUnOiAnWVlZWS4gTU0uIERELicsXG4gICAgICAnaXMtaXMnOiAnRC5NLllZWVknLFxuICAgICAgJ2l0LWl0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2phLWpwJzogJ1lZWVkvTU0vREQnLFxuICAgICAgJ2tvLWtyJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ25sLW5sJzogJ0QtTS1ZWVlZJyxcbiAgICAgICduYi1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwbC1wbCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdwdC1icic6ICdEL00vWVlZWScsXG4gICAgICAncm8tcm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncnUtcnUnOiAnREQuTU0uWVlZWScsXG4gICAgICAnaHItaHInOiAnRC5NLllZWVknLFxuICAgICAgJ3NrLXNrJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ3NxLWFsJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3N2LXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3RoLXRoJzogJ0QvTS9ZWVlZJyxcbiAgICAgICd0ci10cic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICd1ci1wayc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdpZC1pZCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd1ay11YSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdiZS1ieSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdzbC1zaSc6ICdELk0uWVlZWScsXG4gICAgICAnZXQtZWUnOiAnRC5NTS5ZWVlZJyxcbiAgICAgICdsdi1sdic6ICdZWVlZLk1NLkRELicsXG4gICAgICAnbHQtbHQnOiAnWVlZWS5NTS5ERCcsXG4gICAgICAnZmEtaXInOiAnTU0vREQvWVlZWScsXG4gICAgICAndmktdm4nOiAnREQvTU0vWVlZWScsXG4gICAgICAnaHktYW0nOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXotbGF0bi1heic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdldS1lcyc6ICdZWVlZL01NL0REJyxcbiAgICAgICdtay1tayc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhZi16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdrYS1nZSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdmby1mbyc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdoaS1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtcy1teSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdray1reic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdreS1rZyc6ICdERC5NTS5ZWScsXG4gICAgICAnc3cta2UnOiAnTS9kL1lZWVknLFxuICAgICAgJ3V6LWxhdG4tdXonOiAnREQvTU0gWVlZWScsXG4gICAgICAndHQtcnUnOiAnREQuTU0uWVlZWScsXG4gICAgICAncGEtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2d1LWluJzogJ0RELU1NLVlZJyxcbiAgICAgICd0YS1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICd0ZS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAna24taW4nOiAnREQtTU0tWVknLFxuICAgICAgJ21yLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3NhLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21uLW1uJzogJ1lZLk1NLkREJyxcbiAgICAgICdnbC1lcyc6ICdERC9NTS9ZWScsXG4gICAgICAna29rLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ3N5ci1zeSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdkdi1tdic6ICdERC9NTS9ZWScsXG4gICAgICAnYXItaXEnOiAnREQvTU0vWVlZWScsXG4gICAgICAnemgtY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2RlLWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLW14JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWJlJzogJ0QvTU0vWVlZWScsXG4gICAgICAnaXQtY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnbmwtYmUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdubi1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdwdC1wdCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzci1sYXRuLWNzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzdi1maSc6ICdELk0uWVlZWScsXG4gICAgICAnYXotY3lybC1heic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdtcy1ibic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd1ei1jeXJsLXV6JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2FyLWVnJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLWhrJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1hdCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1hdSc6ICdEL01NL1lZWVknLFxuICAgICAgJ2VzLWVzJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ZyLWNhJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3NyLWN5cmwtY3MnOiAnRC5NLllZWVknLFxuICAgICAgJ2FyLWx5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLXNnJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdkZS1sdSc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1jYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1ndCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhci1keic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICd6aC1tbyc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtbGknOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tbnonOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdlcy1jcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1sdSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1tYSc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdlbi1pZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wYSc6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICdmci1tYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci10bic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdlbi16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdlcy1kbyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1vbSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1qbSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy12ZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci15ZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi0wMjknOiAnTU0vREQvWVlZWScsXG4gICAgICAnZXMtY28nOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItc3knOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tYnonOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcGUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItam8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tdHQnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtYXInOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItbGInOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tencnOiAnTS9EL1lZWVknLFxuICAgICAgJ2VzLWVjJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWt3JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXBoJzogJ00vRC9ZWVlZJyxcbiAgICAgICdlcy1jbCc6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdhci1hZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy11eSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1iaCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1weSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1xYSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1ibyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1zdic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1obic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1uaSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1wcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhbS1ldCc6ICdEL00vWVlZWScsXG4gICAgICAndHptLWxhdG4tZHonOiAnREQtTU0tWVlZWScsXG4gICAgICAnaXUtbGF0bi1jYSc6ICdEL01NL1lZWVknLFxuICAgICAgJ3NtYS1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdtbi1tb25nLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdnZC1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1teSc6ICdEL00vWVlZWScsXG4gICAgICAncHJzLWFmJzogJ0REL01NL1lZJyxcbiAgICAgICdibi1iZCc6ICdERC1NTS1ZWScsXG4gICAgICAnd28tc24nOiAnREQvTU0vWVlZWScsXG4gICAgICAncnctcncnOiAnTS9EL1lZWVknLFxuICAgICAgJ3F1dC1ndCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzYWgtcnUnOiAnTU0uREQuWVlZWScsXG4gICAgICAnZ3N3LWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2NvLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ29jLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ21pLW56JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2dhLWllJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NlLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ2JyLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3Ntbi1maSc6ICdELk0uWVlZWScsXG4gICAgICAnbW9oLWNhJzogJ00vRC9ZWVlZJyxcbiAgICAgICdhcm4tY2wnOiAnREQtTU0tWVlZWScsXG4gICAgICAnaWktY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ2RzYi1kZSc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdpZy1uZyc6ICdEL00vWVlZWScsXG4gICAgICAna2wtZ2wnOiAnREQtTU0tWVlZWScsXG4gICAgICAnbGItbHUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYmEtcnUnOiAnREQuTU0uWVknLFxuICAgICAgJ25zby16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdxdXotYm8nOiAnREQvTU0vWVlZWScsXG4gICAgICAneW8tbmcnOiAnRC9NL1lZWVknLFxuICAgICAgJ2hhLWxhdG4tbmcnOiAnRC9NL1lZWVknLFxuICAgICAgJ2ZpbC1waCc6ICdNL0QvWVlZWScsXG4gICAgICAncHMtYWYnOiAnREQvTU0vWVknLFxuICAgICAgJ2Z5LW5sJzogJ0QtTS1ZWVlZJyxcbiAgICAgICduZS1ucCc6ICdNL0QvWVlZWScsXG4gICAgICAnc2Utbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAnaXUtY2Fucy1jYSc6ICdEL00vWVlZWScsXG4gICAgICAnc3ItbGF0bi1ycyc6ICdELk0uWVlZWScsXG4gICAgICAnc2ktbGsnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnc3ItY3lybC1ycyc6ICdELk0uWVlZWScsXG4gICAgICAnbG8tbGEnOiAnREQvTU0vWVlZWScsXG4gICAgICAna20ta2gnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAnY3ktZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnYm8tY24nOiAnWVlZWS9NL0QnLFxuICAgICAgJ3Ntcy1maSc6ICdELk0uWVlZWScsXG4gICAgICAnYXMtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbWwtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2VuLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ29yLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdibi1pbic6ICdERC1NTS1ZWScsXG4gICAgICAndGstdG0nOiAnREQuTU0uWVknLFxuICAgICAgJ2JzLWxhdG4tYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ210LW10JzogJ0REL01NL1lZWVknLFxuICAgICAgJ3NyLWN5cmwtbWUnOiAnRC5NLllZWVknLFxuICAgICAgJ3NlLWZpJzogJ0QuTS5ZWVlZJyxcbiAgICAgICd6dS16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICd4aC16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICd0bi16YSc6ICdZWVlZL01NL0REJyxcbiAgICAgICdoc2ItZGUnOiAnRC4gTS4gWVlZWScsXG4gICAgICAnYnMtY3lybC1iYSc6ICdELk0uWVlZWScsXG4gICAgICAndGctY3lybC10aic6ICdERC5NTS55eScsXG4gICAgICAnc3ItbGF0bi1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnc21qLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3JtLWNoJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3Ntai1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdxdXotZWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAncXV6LXBlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2hyLWJhJzogJ0QuTS5ZWVlZLicsXG4gICAgICAnc3ItbGF0bi1tZSc6ICdELk0uWVlZWScsXG4gICAgICAnc21hLXNlJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ2VuLXNnJzogJ0QvTS9ZWVlZJyxcbiAgICAgICd1Zy1jbic6ICdZWVlZLU0tRCcsXG4gICAgICAnc3ItY3lybC1iYSc6ICdELk0uWVlZWScsXG4gICAgICAnZXMtdXMnOiAnTS9EL1lZWVknXG4gICAgfTtcblxuICAgIGNvbnN0IGtleSA9IG5hdmlnYXRvci5sYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBmb3JtYXRzW2tleV0gfHwgdGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZUZvcm1hdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB2YWx1ZSBmcm9tIGxvY2FsU3RvcmFnZSwgdXNpbmcgYSB0ZW1wb3Jhcnkgc3RvcmFnZSBpZiBsb2NhbFN0b3JhZ2UgaXMgbm90IHN1cHBvcnRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0ga2V5IGZvciB0aGUgdmFsdWUgdG8gcmV0cmlldmVcbiAgICogQHJldHVybnMge01peGVkfSBzdG9yZWQgdmFsdWVcbiAgICovXG4gIGdldEZyb21Mb2NhbFN0b3JhZ2Uoa2V5KSB7XG4gICAgLy8gU2VlIGlmIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgYW5kIGVuYWJsZWRcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgVVJMIHRvIGZpbGUgYSByZXBvcnQgb24gTWV0YSwgcHJlbG9hZGVkIHdpdGggcGVybWFsaW5rXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbcGhhYlBhc3RlXSBVUkwgdG8gYXV0by1nZW5lcmF0ZWQgZXJyb3IgcmVwb3J0IG9uIFBoYWJyaWNhdG9yXG4gICAqIEByZXR1cm4ge1N0cmluZ30gVVJMXG4gICAqL1xuICBnZXRCdWdSZXBvcnRVUkwocGhhYlBhc3RlKSB7XG4gICAgY29uc3QgcmVwb3J0VVJMID0gJ2h0dHBzOi8vbWV0YS53aWtpbWVkaWEub3JnL3cvaW5kZXgucGhwP3RpdGxlPVRhbGs6UGFnZXZpZXdzX0FuYWx5c2lzJmFjdGlvbj1lZGl0JyArXG4gICAgICBgJnNlY3Rpb249bmV3JnByZWxvYWR0aXRsZT0ke3RoaXMuYXBwLnVwY2FzZSgpfSBidWcgcmVwb3J0YDtcblxuICAgIGlmIChwaGFiUGFzdGUpIHtcbiAgICAgIHJldHVybiBgJHtyZXBvcnRVUkx9JnByZWxvYWQ9VGFsazpQYWdldmlld3NfQW5hbHlzaXMvUHJlbG9hZCZwcmVsb2FkcGFyYW1zW109JHtwaGFiUGFzdGV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcG9ydFVSTDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGdlbmVyYWwgaW5mb3JtYXRpb24gYWJvdXQgYSBwcm9qZWN0LCBzdWNoIGFzIG5hbWVzcGFjZXMsIHRpdGxlIG9mIHRoZSBtYWluIHBhZ2UsIGV0Yy5cbiAgICogRGF0YSByZXR1cm5lZCBieSB0aGUgYXBpIGlzIGFsc28gc3RvcmVkIGluIHRoaXMuc2l0ZUluZm9cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb2plY3QgLSBwcm9qZWN0IHN1Y2ggYXMgZW4ud2lraXBlZGlhICh3aXRoIG9yIHdpdGhvdXQgLm9yZylcbiAgICogQHJldHVybnMge0RlZmVycmVkfSBwcm9taXNlIHJlc29sdmluZyB3aXRoIHNpdGVpbmZvLFxuICAgKiAgIGFsb25nIHdpdGggYW55IG90aGVyIGNhY2hlZCBzaXRlaW5mbyBmb3Igb3RoZXIgcHJvamVjdHNcbiAgICovXG4gIGZldGNoU2l0ZUluZm8ocHJvamVjdCkge1xuICAgIHByb2plY3QgPSBwcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCAnJyk7XG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpLFxuICAgICAgY2FjaGVLZXkgPSBgcGFnZXZpZXdzLXNpdGVpbmZvLSR7cHJvamVjdH1gO1xuXG4gICAgaWYgKHRoaXMuc2l0ZUluZm9bcHJvamVjdF0pIHJldHVybiBkZmQucmVzb2x2ZSh0aGlzLnNpdGVJbmZvKTtcblxuICAgIC8vIHVzZSBjYWNoZWQgc2l0ZSBpbmZvIGlmIHByZXNlbnRcbiAgICBpZiAoc2ltcGxlU3RvcmFnZS5oYXNLZXkoY2FjaGVLZXkpKSB7XG4gICAgICB0aGlzLnNpdGVJbmZvW3Byb2plY3RdID0gc2ltcGxlU3RvcmFnZS5nZXQoY2FjaGVLZXkpO1xuICAgICAgZGZkLnJlc29sdmUodGhpcy5zaXRlSW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG90aGVyd2lzZSBmZXRjaCBzaXRlaW5mbyBhbmQgc3RvcmUgaW4gY2FjaGVcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vJHtwcm9qZWN0fS5vcmcvdy9hcGkucGhwYCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGFjdGlvbjogJ3F1ZXJ5JyxcbiAgICAgICAgICBtZXRhOiAnc2l0ZWluZm8nLFxuICAgICAgICAgIHNpcHJvcDogJ2dlbmVyYWx8bmFtZXNwYWNlcycsXG4gICAgICAgICAgZm9ybWF0OiAnanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0gPSBkYXRhLnF1ZXJ5O1xuXG4gICAgICAgIC8vIGNhY2hlIGZvciBvbmUgd2VlayAoVFRMIGlzIGluIG1pbGxpc2Vjb25kcylcbiAgICAgICAgc2ltcGxlU3RvcmFnZS5zZXQoY2FjaGVLZXksIHRoaXMuc2l0ZUluZm9bcHJvamVjdF0sIHtUVEw6IDEwMDAgKiA2MCAqIDYwICogMjQgKiA3fSk7XG5cbiAgICAgICAgZGZkLnJlc29sdmUodGhpcy5zaXRlSW5mbyk7XG4gICAgICB9KS5mYWlsKGRhdGEgPT4ge1xuICAgICAgICBkZmQucmVqZWN0KGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgdG8gZ2V0IHNpdGVpbmZvIGZyb20gdGhpcy5zaXRlSW5mbyBmb3IgZ2l2ZW4gcHJvamVjdCwgd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb2plY3QgLSBwcm9qZWN0IG5hbWUsIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfSBzaXRlIGluZm9ybWF0aW9uIGlmIHByZXNlbnRcbiAgICovXG4gIGdldFNpdGVJbmZvKHByb2plY3QpIHtcbiAgICByZXR1cm4gdGhpcy5zaXRlSW5mb1twcm9qZWN0LnJlcGxhY2UoL1xcLm9yZyQvLCAnJyldO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1c2VyIGFnZW50LCBpZiBzdXBwb3J0ZWRcbiAgICogQHJldHVybnMge3N0cmluZ30gdXNlci1hZ2VudFxuICAgKi9cbiAgZ2V0VXNlckFnZW50KCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50ID8gbmF2aWdhdG9yLnVzZXJBZ2VudCA6ICdVbmtub3duJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB2YWx1ZSB0byBsb2NhbFN0b3JhZ2UsIHVzaW5nIGEgdGVtcG9yYXJ5IHN0b3JhZ2UgaWYgbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGtleSBmb3IgdGhlIHZhbHVlIHRvIHNldFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAtIHZhbHVlIHRvIHN0b3JlXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gc3RvcmVkIHZhbHVlXG4gICAqL1xuICBzZXRMb2NhbFN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xuICAgIC8vIFNlZSBpZiBsb2NhbFN0b3JhZ2UgaXMgc3VwcG9ydGVkIGFuZCBlbmFibGVkXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSB1bmlxdWUgaGFzaCBjb2RlIGZyb20gZ2l2ZW4gc3RyaW5nXG4gICAqIEBwYXJhbSAge1N0cmluZ30gc3RyIC0gdG8gYmUgaGFzaGVkXG4gICAqIEByZXR1cm4ge1N0cmluZ30gdGhlIGhhc2hcbiAgICovXG4gIGhhc2hDb2RlKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLnJlZHVjZSgocHJldkhhc2gsIGN1cnJWYWwpID0+XG4gICAgICAoKHByZXZIYXNoIDw8IDUpIC0gcHJldkhhc2gpICsgY3VyclZhbC5jaGFyQ29kZUF0KDApLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJcyB0aGlzIG9uZSBvZiB0aGUgY2hhcnQtdmlldyBhcHBzICh0aGF0IGRvZXMgbm90IGhhdmUgYSBsaXN0IHZpZXcpP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc0NoYXJ0QXBwKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0xpc3RBcHAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJcyB0aGlzIG9uZSBvZiB0aGUgbGlzdC12aWV3IGFwcHM/XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgb3IgZmFsc2VcbiAgICovXG4gIGlzTGlzdEFwcCgpIHtcbiAgICByZXR1cm4gWydsYW5ndmlld3MnLCAnbWFzc3ZpZXdzJywgJ3JlZGlyZWN0dmlld3MnXS5pbmNsdWRlcyh0aGlzLmFwcCk7XG4gIH1cblxuICAvKipcbiAgICogVGVzdCBpZiB0aGUgY3VycmVudCBwcm9qZWN0IGlzIGEgbXVsdGlsaW5ndWFsIHByb2plY3RcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGlzIG11bHRpbGluZ3VhbCBvciBub3RcbiAgICovXG4gIGlzTXVsdGlsYW5nUHJvamVjdCgpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChgLio/XFxcXC4oJHtQdi5tdWx0aWxhbmdQcm9qZWN0cy5qb2luKCd8Jyl9KWApLnRlc3QodGhpcy5wcm9qZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXAgbm9ybWFsaXplZCBwYWdlcyBmcm9tIEFQSSBpbnRvIGEgc3RyaW5nIG9mIHBhZ2UgbmFtZXNcbiAgICogVXNlZCBpbiBub3JtYWxpemVQYWdlTmFtZXMoKVxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHBhcmFtIHthcnJheX0gbm9ybWFsaXplZFBhZ2VzIC0gYXJyYXkgb2Ygbm9ybWFsaXplZCBtYXBwaW5ncyByZXR1cm5lZCBieSB0aGUgQVBJXG4gICAqIEByZXR1cm5zIHthcnJheX0gcGFnZXMgd2l0aCB0aGUgbmV3IG5vcm1hbGl6ZWQgbmFtZXMsIGlmIGdpdmVuXG4gICAqL1xuICBtYXBOb3JtYWxpemVkUGFnZU5hbWVzKHBhZ2VzLCBub3JtYWxpemVkUGFnZXMpIHtcbiAgICBub3JtYWxpemVkUGFnZXMuZm9yRWFjaChub3JtYWxQYWdlID0+IHtcbiAgICAgIC8qKiBkbyBpdCB0aGlzIHdheSB0byBwcmVzZXJ2ZSBvcmRlcmluZyBvZiBwYWdlcyAqL1xuICAgICAgcGFnZXMgPSBwYWdlcy5tYXAocGFnZSA9PiB7XG4gICAgICAgIGlmIChub3JtYWxQYWdlLmZyb20gPT09IHBhZ2UpIHtcbiAgICAgICAgICByZXR1cm4gbm9ybWFsUGFnZS50bztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcGFnZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgdmFsaWQgbXVsdGlsaW5ndWFsIHByb2plY3RzXG4gICAqIEByZXR1cm4ge0FycmF5fSBiYXNlIHByb2plY3RzLCB3aXRob3V0IHRoZSBsYW5ndWFnZVxuICAgKi9cbiAgc3RhdGljIGdldCBtdWx0aWxhbmdQcm9qZWN0cygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3dpa2lwZWRpYScsXG4gICAgICAnd2lraWJvb2tzJyxcbiAgICAgICd3aWtpbmV3cycsXG4gICAgICAnd2lraXF1b3RlJyxcbiAgICAgICd3aWtpc291cmNlJyxcbiAgICAgICd3aWtpdmVyc2l0eScsXG4gICAgICAnd2lraXZveWFnZSdcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgbWFzcyByZXF1ZXN0cyB0byBNZWRpYVdpa2kgQVBJXG4gICAqIFRoZSBBUEkgbm9ybWFsbHkgbGltaXRzIHRvIDUwMCBwYWdlcywgYnV0IGdpdmVzIHlvdSBhICdjb250aW51ZScgdmFsdWVcbiAgICogICB0byBmaW5pc2ggaXRlcmF0aW5nIHRocm91Z2ggdGhlIHJlc291cmNlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gcGFyYW1ldGVycyB0byBwYXNzIHRvIHRoZSBBUElcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb2plY3QgLSBwcm9qZWN0IHRvIHF1ZXJ5LCBlLmcuIGVuLndpa2lwZWRpYSAoLm9yZyBpcyBvcHRpb25hbClcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb250aW51ZUtleV0gLSB0aGUga2V5IHRvIGxvb2sgaW4gdGhlIGNvbnRpbnVlIGhhc2gsIGlmIHByZXNlbnQgKGUuZy4gY21jb250aW51ZSBmb3IgQVBJOkNhdGVnb3J5bWVtYmVycylcbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IFtkYXRhS2V5XSAtIHRoZSBrZXkgZm9yIHRoZSBtYWluIGNodW5rIG9mIGRhdGEsIGluIHRoZSBxdWVyeSBoYXNoIChlLmcuIGNhdGVnb3J5bWVtYmVycyBmb3IgQVBJOkNhdGVnb3J5bWVtYmVycylcbiAgICogICBJZiB0aGlzIGlzIGEgZnVuY3Rpb24gaXQgaXMgZ2l2ZW4gdGhlIHJlc3BvbnNlIGRhdGEsIGFuZCBleHBlY3RlZCB0byByZXR1cm4gdGhlIGRhdGEgd2Ugd2FudCB0byBjb25jYXRlbnRhdGUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGltaXRdIC0gbWF4IG51bWJlciBvZiBwYWdlcyB0byBmZXRjaFxuICAgKiBAcmV0dXJuIHtEZWZlcnJlZH0gcHJvbWlzZSByZXNvbHZpbmcgd2l0aCBkYXRhXG4gICAqL1xuICBtYXNzQXBpKHBhcmFtcywgcHJvamVjdCwgY29udGludWVLZXkgPSAnY29udGludWUnLCBkYXRhS2V5LCBsaW1pdCA9IHRoaXMuY29uZmlnLmFwaUxpbWl0KSB7XG4gICAgaWYgKCEvXFwub3JnJC8udGVzdChwcm9qZWN0KSkgcHJvamVjdCArPSAnLm9yZyc7XG5cbiAgICBjb25zdCBkZmQgPSAkLkRlZmVycmVkKCk7XG4gICAgbGV0IHJlc29sdmVEYXRhID0ge1xuICAgICAgcGFnZXM6IFtdXG4gICAgfTtcblxuICAgIGNvbnN0IG1ha2VSZXF1ZXN0ID0gY29udGludWVWYWx1ZSA9PiB7XG4gICAgICBsZXQgcmVxdWVzdERhdGEgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgYWN0aW9uOiAncXVlcnknLFxuICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgZm9ybWF0dmVyc2lvbjogJzInXG4gICAgICB9LCBwYXJhbXMpO1xuXG4gICAgICBpZiAoY29udGludWVWYWx1ZSkgcmVxdWVzdERhdGFbY29udGludWVLZXldID0gY29udGludWVWYWx1ZTtcblxuICAgICAgY29uc3QgcHJvbWlzZSA9ICQuYWpheCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vJHtwcm9qZWN0fS93L2FwaS5waHBgLFxuICAgICAgICBqc29ucDogJ2NhbGxiYWNrJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgIGRhdGE6IHJlcXVlc3REYXRhXG4gICAgICB9KTtcblxuICAgICAgcHJvbWlzZS5kb25lKGRhdGEgPT4ge1xuICAgICAgICAvLyBzb21lIGZhaWx1cmVzIGNvbWUgYmFjayBhcyAyMDBzLCBzbyB3ZSBzdGlsbCByZXNvbHZlIGFuZCBsZXQgdGhlIGxvY2FsIGFwcCBoYW5kbGUgaXRcbiAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHJldHVybiBkZmQucmVzb2x2ZShkYXRhKTtcblxuICAgICAgICBsZXQgaXNGaW5pc2hlZDtcblxuICAgICAgICAvLyBhbGxvdyBjdXN0b20gZnVuY3Rpb24gdG8gcGFyc2UgdGhlIGRhdGEgd2Ugd2FudCwgaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhS2V5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzb2x2ZURhdGEucGFnZXMgPSByZXNvbHZlRGF0YS5wYWdlcy5jb25jYXQoZGF0YUtleShkYXRhLnF1ZXJ5KSk7XG4gICAgICAgICAgaXNGaW5pc2hlZCA9IHJlc29sdmVEYXRhLnBhZ2VzLmxlbmd0aCA+PSBsaW1pdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhcHBlbmQgbmV3IGRhdGEgdG8gZGF0YSBmcm9tIGxhc3QgcmVxdWVzdC4gV2UgbWlnaHQgd2FudCBib3RoICdwYWdlcycgYW5kIGRhdGFLZXlcbiAgICAgICAgICBpZiAoZGF0YS5xdWVyeS5wYWdlcykge1xuICAgICAgICAgICAgcmVzb2x2ZURhdGEucGFnZXMgPSByZXNvbHZlRGF0YS5wYWdlcy5jb25jYXQoZGF0YS5xdWVyeS5wYWdlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhLnF1ZXJ5W2RhdGFLZXldKSB7XG4gICAgICAgICAgICByZXNvbHZlRGF0YVtkYXRhS2V5XSA9IChyZXNvbHZlRGF0YVtkYXRhS2V5XSB8fCBbXSkuY29uY2F0KGRhdGEucXVlcnlbZGF0YUtleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiBwYWdlcyBpcyBub3QgdGhlIGNvbGxlY3Rpb24gd2Ugd2FudCwgaXQgd2lsbCBiZSBlaXRoZXIgYW4gZW1wdHkgYXJyYXkgb3Igb25lIGVudHJ5IHdpdGggYmFzaWMgcGFnZSBpbmZvXG4gICAgICAgICAgLy8gICBkZXBlbmRpbmcgb24gd2hhdCBBUEkgd2UncmUgaGl0dGluZy4gU28gcmVzb2x2ZURhdGFbZGF0YUtleV0gd2lsbCBoaXQgdGhlIGxpbWl0XG4gICAgICAgICAgaXNGaW5pc2hlZCA9IHJlc29sdmVEYXRhLnBhZ2VzLmxlbmd0aCA+PSBsaW1pdCB8fCByZXNvbHZlRGF0YVtkYXRhS2V5XS5sZW5ndGggPj0gbGltaXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHJlY3Vyc2l2ZSBjYWxsIGlmIG5lZWRlZCwgd2FpdGluZyAxMDBtc1xuICAgICAgICBpZiAoIWlzRmluaXNoZWQgJiYgZGF0YS5jb250aW51ZSAmJiBkYXRhLmNvbnRpbnVlW2NvbnRpbnVlS2V5XSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbWFrZVJlcXVlc3QoZGF0YS5jb250aW51ZVtjb250aW51ZUtleV0pO1xuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaW5kaWNhdGUgdGhlcmUgd2VyZSBtb3JlIGVudHJpZXMgdGhhbiB0aGUgbGltaXRcbiAgICAgICAgICBpZiAoZGF0YS5jb250aW51ZSkgcmVzb2x2ZURhdGEuY29udGludWUgPSB0cnVlO1xuICAgICAgICAgIGRmZC5yZXNvbHZlKHJlc29sdmVEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgICAgZGZkLnJlamVjdChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtYWtlUmVxdWVzdCgpO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2NhbGl6ZSBOdW1iZXIgb2JqZWN0IHdpdGggZGVsaW1pdGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSB0aGUgTnVtYmVyLCBlLmcuIDEyMzQ1NjdcbiAgICogQHJldHVybnMge3N0cmluZ30gLSB3aXRoIGxvY2FsZSBkZWxpbWl0ZXJzLCBlLmcuIDEsMjM0LDU2NyAoZW4tVVMpXG4gICAqL1xuICBuKHZhbHVlKSB7XG4gICAgcmV0dXJuIChuZXcgTnVtYmVyKHZhbHVlKSkudG9Mb2NhbGVTdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYmFzaWMgaW5mbyBvbiBnaXZlbiBwYWdlcywgaW5jbHVkaW5nIHRoZSBub3JtYWxpemVkIHBhZ2UgbmFtZXMuXG4gICAqIEUuZy4gbWFzY3VsaW5lIHZlcnN1cyBmZW1pbmluZSBuYW1lc3BhY2VzIG9uIGRld2lraVxuICAgKiBAcGFyYW0ge2FycmF5fSBwYWdlcyAtIGFycmF5IG9mIHBhZ2UgbmFtZXNcbiAgICogQHJldHVybnMge0RlZmVycmVkfSBwcm9taXNlIHdpdGggZGF0YSBmZXRjaGVkIGZyb20gQVBJXG4gICAqL1xuICBnZXRQYWdlSW5mbyhwYWdlcykge1xuICAgIGxldCBkZmQgPSAkLkRlZmVycmVkKCk7XG5cbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgIHVybDogYGh0dHBzOi8vJHt0aGlzLnByb2plY3R9Lm9yZy93L2FwaS5waHA/YWN0aW9uPXF1ZXJ5JnByb3A9aW5mbyZpbnByb3A9cHJvdGVjdGlvbnx3YXRjaGVyc2AgK1xuICAgICAgICBgJmZvcm1hdHZlcnNpb249MiZmb3JtYXQ9anNvbiZ0aXRsZXM9JHtwYWdlcy5qb2luKCd8Jyl9YCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgIGxldCBwYWdlRGF0YSA9IHt9O1xuICAgICAgZGF0YS5xdWVyeS5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgICBwYWdlRGF0YVtwYWdlLnRpdGxlXSA9IHBhZ2U7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkZmQucmVzb2x2ZShwYWdlRGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZSBob3cgbWFueSBkYXlzIGFyZSBpbiB0aGUgc2VsZWN0ZWQgZGF0ZSByYW5nZVxuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gbnVtYmVyIG9mIGRheXNcbiAgICovXG4gIG51bURheXNJblJhbmdlKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlLmRpZmYodGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlLCAnZGF5cycpICsgMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBrZXkvdmFsdWUgcGFpcnMgb2YgVVJMIHF1ZXJ5IHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW211bHRpUGFyYW1dIC0gcGFyYW1ldGVyIHdob3NlIHZhbHVlcyBuZWVkcyB0byBzcGxpdCBieSBwaXBlIGNoYXJhY3RlclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBrZXkvdmFsdWUgcGFpcnMgcmVwcmVzZW50YXRpb24gb2YgcXVlcnkgc3RyaW5nXG4gICAqL1xuICBwYXJzZVF1ZXJ5U3RyaW5nKG11bHRpUGFyYW0pIHtcbiAgICBjb25zdCB1cmkgPSBkZWNvZGVVUkkobG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpKSxcbiAgICAgIGNodW5rcyA9IHVyaS5zcGxpdCgnJicpO1xuICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2h1bmsgPSBjaHVua3NbaV0uc3BsaXQoJz0nKTtcblxuICAgICAgaWYgKG11bHRpUGFyYW0gJiYgY2h1bmtbMF0gPT09IG11bHRpUGFyYW0pIHtcbiAgICAgICAgcGFyYW1zW211bHRpUGFyYW1dID0gY2h1bmtbMV0uc3BsaXQoJ3wnKS5maWx0ZXIocGFyYW0gPT4gISFwYXJhbSkudW5pcXVlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXNbY2h1bmtbMF1dID0gY2h1bmtbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaW1wbGUgbWV0cmljIHRvIHNlZSBob3cgbWFueSB1c2UgaXQgKHBhZ2V2aWV3cyBvZiB0aGUgcGFnZXZpZXcsIGEgbWV0YS1wYWdldmlldywgaWYgeW91IHdpbGwgOilcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFwcCAtIG9uZSBvZjogcHYsIGx2LCB0diwgc3YsIG1zXG4gICAqIEByZXR1cm4ge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHBhdGNoVXNhZ2UoYXBwKSB7XG4gICAgaWYgKG1ldGFSb290KSB7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAvLyR7bWV0YVJvb3R9L3VzYWdlLyR7dGhpcy5hcHB9LyR7dGhpcy5wcm9qZWN0IHx8IGkxOG5MYW5nfWAsXG4gICAgICAgIG1ldGhvZDogJ1BBVENIJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aW1lc3RhbXAgb2Ygd2hlbiBwcm9jZXNzIHN0YXJ0ZWRcbiAgICogQHJldHVybiB7bW9tZW50fSBzdGFydCB0aW1lXG4gICAqL1xuICBwcm9jZXNzU3RhcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzU3RhcnQgPSBtb21lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZWxhcHNlZCB0aW1lIGZyb20gdGhpcy5wcm9jZXNzU3RhcnQsIGFuZCBzaG93IGl0XG4gICAqIEByZXR1cm4ge21vbWVudH0gRWxhcHNlZCB0aW1lIGZyb20gYHRoaXMucHJvY2Vzc1N0YXJ0YCBpbiBtaWxsaXNlY29uZHNcbiAgICovXG4gIHByb2Nlc3NFbmRlZCgpIHtcbiAgICBjb25zdCBlbmRUaW1lID0gbW9tZW50KCksXG4gICAgICBlbGFwc2VkVGltZSA9IGVuZFRpbWUuZGlmZih0aGlzLnByb2Nlc3NTdGFydCwgJ21pbGxpc2Vjb25kcycpO1xuXG4gICAgLyoqIEZJWE1FOiByZXBvcnQgdGhpcyBidWc6IHNvbWUgbGFuZ3VhZ2VzIGRvbid0IHBhcnNlIFBMVVJBTCBjb3JyZWN0bHkgKCdoZScgZm9yIGV4YW1wbGUpIHdpdGggdGhlIEVuZ2xpc2ggZmFsbGJhY2sgbWVzc2FnZSAqL1xuICAgIHRyeSB7XG4gICAgICAkKCcuZWxhcHNlZC10aW1lJykuYXR0cignZGF0ZXRpbWUnLCBlbmRUaW1lLmZvcm1hdCgpKVxuICAgICAgICAudGV4dCgkLmkxOG4oJ2VsYXBzZWQtdGltZScsIGVsYXBzZWRUaW1lIC8gMTAwMCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGludGVudGlvbmFsbCBub3RoaW5nLCBldmVyeXRoaW5nIHdpbGwgc3RpbGwgc2hvd1xuICAgIH1cblxuICAgIHJldHVybiBlbGFwc2VkVGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGFwdGVkIGZyb20gaHR0cDovL2pzZmlkZGxlLm5ldC9kYW5kdi80N2Niai8gY291cnRlc3kgb2YgZGFuZHZcbiAgICpcbiAgICogU2FtZSBhcyBfLmRlYm91bmNlIGJ1dCBxdWV1ZXMgYW5kIGV4ZWN1dGVzIGFsbCBmdW5jdGlvbiBjYWxsc1xuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gLSBmdW5jdGlvbiB0byBkZWJvdW5jZVxuICAgKiBAcGFyYW0gIHtkZWxheX0gZGVsYXkgLSBkZWxheSBkdXJhdGlvbiBvZiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtICB7b2JqZWN0fSBjb250ZXh0IC0gc2NvcGUgdGhlIGZ1bmN0aW9uIHNob3VsZCByZWZlciB0b1xuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmF0ZS1saW1pdGVkIGZ1bmN0aW9uIHRvIGNhbGwgaW5zdGVhZCBvZiB5b3VyIGZ1bmN0aW9uXG4gICAqL1xuICByYXRlTGltaXQoZm4sIGRlbGF5LCBjb250ZXh0KSB7XG4gICAgbGV0IHF1ZXVlID0gW10sIHRpbWVyO1xuXG4gICAgY29uc3QgcHJvY2Vzc1F1ZXVlID0gKCkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBmbi5hcHBseShpdGVtLmNvbnRleHQsIGl0ZW0uYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lciksIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGxpbWl0ZWQoKSB7XG4gICAgICBxdWV1ZS5wdXNoKHtcbiAgICAgICAgY29udGV4dDogY29udGV4dCB8fCB0aGlzLFxuICAgICAgICBhcmd1bWVudHM6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgcHJvY2Vzc1F1ZXVlKCk7IC8vIHN0YXJ0IGltbWVkaWF0ZWx5IG9uIHRoZSBmaXJzdCBpbnZvY2F0aW9uXG4gICAgICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwocHJvY2Vzc1F1ZXVlLCBkZWxheSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBTZWxlY3QyIHJlbGF0ZWQgc3R1ZmYgdGhlbiBhZGRzIGl0IGJhY2tcbiAgICogQWxzbyBtaWdodCByZXN1bHQgaW4gdGhlIGNoYXJ0IGJlaW5nIHJlLXJlbmRlcmVkXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICByZXNldFNlbGVjdDIoKSB7XG4gICAgY29uc3Qgc2VsZWN0MklucHV0ID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpO1xuICAgIHNlbGVjdDJJbnB1dC5vZmYoJ2NoYW5nZScpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCd2YWwnLCBudWxsKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MignZGF0YScsIG51bGwpO1xuICAgIHNlbGVjdDJJbnB1dC5zZWxlY3QyKCdkZXN0cm95Jyk7XG4gICAgdGhpcy5zZXR1cFNlbGVjdDIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgYWxwaGEgbGV2ZWwgb2YgYW4gcmdiYSB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSByZ2JhIHZhbHVlXG4gICAqIEBwYXJhbSB7ZmxvYXR8c3RyaW5nfSBhbHBoYSAtIHRyYW5zcGFyZW5jeSBhcyBmbG9hdCB2YWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSByZ2JhIHZhbHVlXG4gICAqL1xuICByZ2JhKHZhbHVlLCBhbHBoYSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8sXFxzKlxcZFxcKS8sIGAsICR7YWxwaGF9KWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgYSBwYXJ0aWN1bGFyIHNldHRpbmcgdG8gc2Vzc2lvbiBhbmQgbG9jYWxTdG9yYWdlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBzZXR0aW5ncyBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbn0gdmFsdWUgLSB2YWx1ZSB0byBzYXZlXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzYXZlU2V0dGluZyhrZXksIHZhbHVlKSB7XG4gICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UoYHBhZ2V2aWV3cy1zZXR0aW5ncy0ke2tleX1gLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgc2VsZWN0ZWQgc2V0dGluZ3Mgd2l0aGluIHRoZSBzZXR0aW5ncyBtb2RhbFxuICAgKiBQcmVmZXIgdGhpcyBpbXBsZW1lbnRhdGlvbiBvdmVyIGEgbGFyZ2UgbGlicmFyeSBsaWtlIHNlcmlhbGl6ZU9iamVjdCBvciBzZXJpYWxpemVKU09OXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzYXZlU2V0dGluZ3MoKSB7XG4gICAgLyoqIHRyYWNrIGlmIHdlJ3JlIGNoYW5naW5nIHRvIG5vX2F1dG9jb21wbGV0ZSBtb2RlICovXG4gICAgY29uc3Qgd2FzQXV0b2NvbXBsZXRlID0gdGhpcy5hdXRvY29tcGxldGUgPT09ICdub19hdXRvY29tcGxldGUnO1xuXG4gICAgJC5lYWNoKCQoJyNzZXR0aW5ncy1tb2RhbCBpbnB1dCcpLCAoaW5kZXgsIGVsKSA9PiB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICB0aGlzLnNhdmVTZXR0aW5nKGVsLm5hbWUsIGVsLmNoZWNrZWQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwuY2hlY2tlZCkge1xuICAgICAgICB0aGlzLnNhdmVTZXR0aW5nKGVsLm5hbWUsIGVsLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmFwcCAhPT0gJ3RvcHZpZXdzJykge1xuICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIubG9jYWxlLmZvcm1hdCA9IHRoaXMuZGF0ZUZvcm1hdDtcbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnVwZGF0ZUVsZW1lbnQoKTtcblxuICAgICAgdGhpcy5zZXR1cFNlbGVjdDJDb2xvcnMoKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBJZiB3ZSBjaGFuZ2VkIHRvL2Zyb20gbm9fYXV0b2NvbXBsZXRlIHdlIGhhdmUgdG8gcmVzZXQgU2VsZWN0MiBlbnRpcmVseVxuICAgICAgICogICBhcyBzZXRTZWxlY3QyRGVmYXVsdHMgaXMgc3VwZXIgYnVnZ3kgZHVlIHRvIFNlbGVjdDIgY29uc3RyYWludHNcbiAgICAgICAqIFNvIGxldCdzIG9ubHkgcmVzZXQgaWYgd2UgaGF2ZSB0b1xuICAgICAgICovXG4gICAgICBpZiAoKHRoaXMuYXV0b2NvbXBsZXRlID09PSAnbm9fYXV0b2NvbXBsZXRlJykgIT09IHdhc0F1dG9jb21wbGV0ZSkge1xuICAgICAgICB0aGlzLnJlc2V0U2VsZWN0MigpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5iZWdpbkF0WmVybyA9PT0gJ3RydWUnKSB7XG4gICAgICAgICQoJy5iZWdpbi1hdC16ZXJvLW9wdGlvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByb2Nlc3NJbnB1dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXJlY3RseSBzZXQgaXRlbXMgaW4gU2VsZWN0MlxuICAgKiBDdXJyZW50bHkgaXMgbm90IGFibGUgdG8gcmVtb3ZlIHVuZGVyc2NvcmVzIGZyb20gcGFnZSBuYW1lc1xuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBpdGVtcyAtIHBhZ2UgdGl0bGVzXG4gICAqIEByZXR1cm5zIHthcnJheX0gLSB1bnRvdWNoZWQgYXJyYXkgb2YgaXRlbXNcbiAgICovXG4gIHNldFNlbGVjdDJEZWZhdWx0cyhpdGVtcykge1xuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBlc2NhcGVkVGV4dCA9ICQoJzxkaXY+JykudGV4dChpdGVtKS5odG1sKCk7XG4gICAgICAkKCc8b3B0aW9uPicgKyBlc2NhcGVkVGV4dCArICc8L29wdGlvbj4nKS5hcHBlbmRUbyh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpO1xuICAgIH0pO1xuICAgICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KS5zZWxlY3QyKCd2YWwnLCBpdGVtcyk7XG4gICAgJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ2Nsb3NlJyk7XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGF0ZXJhbmdlIHBpY2tlciB2YWx1ZXMgYW5kIHRoaXMuc3BlY2lhbFJhbmdlIGJhc2VkIG9uIHByb3ZpZGVkIHNwZWNpYWwgcmFuZ2Uga2V5XG4gICAqIFdBUk5JTkc6IG5vdCB0byBiZSBjYWxsZWQgb24gZGF0ZXJhbmdlIHBpY2tlciBHVUkgZXZlbnRzIChlLmcuIHNwZWNpYWwgcmFuZ2UgYnV0dG9ucylcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBvbmUgb2Ygc3BlY2lhbCByYW5nZXMgZGVmaW5lZCBpbiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLFxuICAgKiAgIGluY2x1ZGluZyBkeW5hbWljIGxhdGVzdCByYW5nZSwgc3VjaCBhcyBgbGF0ZXN0LTE1YCBmb3IgbGF0ZXN0IDE1IGRheXNcbiAgICogQHJldHVybnMge29iamVjdHxudWxsfSB1cGRhdGVkIHRoaXMuc3BlY2lhbFJhbmdlIG9iamVjdCBvciBudWxsIGlmIHR5cGUgd2FzIGludmFsaWRcbiAgICovXG4gIHNldFNwZWNpYWxSYW5nZSh0eXBlKSB7XG4gICAgY29uc3QgcmFuZ2VJbmRleCA9IE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMpLmluZGV4T2YodHlwZSk7XG4gICAgbGV0IHN0YXJ0RGF0ZSwgZW5kRGF0ZTtcblxuICAgIGlmICh0eXBlLmluY2x1ZGVzKCdsYXRlc3QtJykpIHtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHBhcnNlSW50KHR5cGUucmVwbGFjZSgnbGF0ZXN0LScsICcnKSwgMTApIHx8IDIwOyAvLyBmYWxsYmFjayBvZiAyMFxuICAgICAgW3N0YXJ0RGF0ZSwgZW5kRGF0ZV0gPSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLmxhdGVzdChvZmZzZXQpO1xuICAgIH0gZWxzZSBpZiAocmFuZ2VJbmRleCA+PSAwKSB7XG4gICAgICAvKiogdHJlYXQgJ2xhdGVzdCcgYXMgYSBmdW5jdGlvbiAqL1xuICAgICAgW3N0YXJ0RGF0ZSwgZW5kRGF0ZV0gPSB0eXBlID09PSAnbGF0ZXN0JyA/IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMubGF0ZXN0KCkgOiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzW3R5cGVdO1xuICAgICAgJCgnLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpJykuZXEocmFuZ2VJbmRleCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3BlY2lhbFJhbmdlID0ge1xuICAgICAgcmFuZ2U6IHR5cGUsXG4gICAgICB2YWx1ZTogYCR7c3RhcnREYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpfSAtICR7ZW5kRGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KX1gXG4gICAgfTtcblxuICAgIC8qKiBkaXJlY3RseSBhc3NpZ24gc3RhcnREYXRlIHRoZW4gdXNlIHNldEVuZERhdGUgc28gdGhhdCB0aGUgZXZlbnRzIHdpbGwgYmUgZmlyZWQgb25jZSAqL1xuICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zZXRFbmREYXRlKGVuZERhdGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3BlY2lhbFJhbmdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIGNvbG9ycyBmb3IgU2VsZWN0MiBlbnRyaWVzIHNvIHdlIGNhbiBkeW5hbWljYWxseSBjaGFuZ2UgdGhlbVxuICAgKiBUaGlzIGlzIGEgbmVjZXNzYXJ5IGV2aWwsIGFzIHdlIGhhdmUgdG8gbWFyayB0aGVtIGFzICFpbXBvcnRhbnRcbiAgICogICBhbmQgc2luY2UgdGhlcmUgYXJlIGFueSBudW1iZXIgb2YgZW50aXJlcywgd2UgbmVlZCB0byB1c2UgbnRoLWNoaWxkIHNlbGVjdG9yc1xuICAgKiBAcmV0dXJucyB7Q1NTU3R5bGVzaGVldH0gb3VyIG5ldyBzdHlsZXNoZWV0XG4gICAqL1xuICBzZXR1cFNlbGVjdDJDb2xvcnMoKSB7XG4gICAgLyoqIGZpcnN0IGRlbGV0ZSBvbGQgc3R5bGVzaGVldCwgaWYgcHJlc2VudCAqL1xuICAgIGlmICh0aGlzLmNvbG9yc1N0eWxlRWwpIHRoaXMuY29sb3JzU3R5bGVFbC5yZW1vdmUoKTtcblxuICAgIC8qKiBjcmVhdGUgbmV3IHN0eWxlc2hlZXQgKi9cbiAgICB0aGlzLmNvbG9yc1N0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRoaXMuY29sb3JzU3R5bGVFbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpOyAvLyBXZWJLaXQgaGFjayA6KFxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5jb2xvcnNTdHlsZUVsKTtcblxuICAgIC8qKiBhZGQgY29sb3IgcnVsZXMgKi9cbiAgICB0aGlzLmNvbmZpZy5jb2xvcnMuZm9yRWFjaCgoY29sb3IsIGluZGV4KSA9PiB7XG4gICAgICB0aGlzLmNvbG9yc1N0eWxlRWwuc2hlZXQuaW5zZXJ0UnVsZShgLnNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2U6bnRoLW9mLXR5cGUoJHtpbmRleCArIDF9KSB7IGJhY2tncm91bmQ6ICR7Y29sb3J9ICFpbXBvcnRhbnQgfWAsIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY29sb3JzU3R5bGVFbC5zaGVldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcm9zcy1hcHBsaWNhdGlvbiBsaXN0ZW5lcnNcbiAgICogRWFjaCBhcHAgaGFzIGl0J3Mgb3duIHNldHVwTGlzdGVuZXJzKCkgdGhhdCBzaG91bGQgY2FsbCBzdXBlci5zZXR1cExpc3RlbmVycygpXG4gICAqIEByZXR1cm4ge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHNldHVwTGlzdGVuZXJzKCkge1xuICAgIC8qKiBwcmV2ZW50IGJyb3dzZXIncyBkZWZhdWx0IGJlaGF2aW91ciBmb3IgYW55IGxpbmsgd2l0aCBocmVmPVwiI1wiICovXG4gICAgJChcImFbaHJlZj0nIyddXCIpLm9uKCdjbGljaycsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcblxuICAgIC8qKiBkb3dubG9hZCBsaXN0ZW5lcnMgKi9cbiAgICAkKCcuZG93bmxvYWQtY3N2Jykub24oJ2NsaWNrJywgdGhpcy5leHBvcnRDU1YuYmluZCh0aGlzKSk7XG4gICAgJCgnLmRvd25sb2FkLWpzb24nKS5vbignY2xpY2snLCB0aGlzLmV4cG9ydEpTT04uYmluZCh0aGlzKSk7XG5cbiAgICAvKiogcHJvamVjdCBpbnB1dCBsaXN0ZW5lcnMsIHNhdmluZyBhbmQgcmVzdG9yaW5nIG9sZCB2YWx1ZSBpZiBuZXcgb25lIGlzIGludmFsaWQgKi9cbiAgICAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkub24oJ2ZvY3VzaW4nLCBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZGF0YXNldC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfSk7XG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLm9uKCdjaGFuZ2UnLCBlID0+IHRoaXMudmFsaWRhdGVQcm9qZWN0KGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdmFsdWVzIG9mIGZvcm0gYmFzZWQgb24gbG9jYWxTdG9yYWdlIG9yIGRlZmF1bHRzLCBhZGQgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzZXR1cFNldHRpbmdzTW9kYWwoKSB7XG4gICAgLyoqIGZpbGwgaW4gdmFsdWVzLCBldmVyeXRoaW5nIGlzIGVpdGhlciBhIGNoZWNrYm94IG9yIHJhZGlvICovXG4gICAgdGhpcy5maWxsSW5TZXR0aW5ncygpO1xuXG4gICAgLyoqIGFkZCBsaXN0ZW5lciAqL1xuICAgICQoJy5zYXZlLXNldHRpbmdzLWJ0bicpLm9uKCdjbGljaycsIHRoaXMuc2F2ZVNldHRpbmdzLmJpbmQodGhpcykpO1xuICAgICQoJy5jYW5jZWwtc2V0dGluZ3MtYnRuJykub24oJ2NsaWNrJywgdGhpcy5maWxsSW5TZXR0aW5ncy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcmFuZ2Ugc2VsZWN0b3IgYW5kIGFkZHMgbGlzdGVuZXJzXG4gICAqIEByZXR1cm5zIHtudWxsfSAtIG5vdGhpbmdcbiAgICovXG4gIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoKSB7XG4gICAgY29uc3QgZGF0ZVJhbmdlU2VsZWN0b3IgPSAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKTtcblxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzIHRvIGhhdmUgaTE4biBhcyBrZXlzXG4gICAgICogVGhpcyBpcyB3aGF0IGlzIHNob3duIGFzIHRoZSBzcGVjaWFsIHJhbmdlcyAoTGFzdCBtb250aCwgZXRjLikgaW4gdGhlIGRhdGVwaWNrZXIgbWVudVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgbGV0IHJhbmdlcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkgPT09ICdsYXRlc3QnKSByZXR1cm47IC8vIHRoaXMgaXMgYSBmdW5jdGlvbiwgbm90IG1lYW50IHRvIGJlIGluIHRoZSBsaXN0IG9mIHNwZWNpYWwgcmFuZ2VzXG4gICAgICByYW5nZXNbJC5pMThuKGtleSldID0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1trZXldO1xuICAgIH0pO1xuXG4gICAgbGV0IGRhdGVwaWNrZXJPcHRpb25zID0ge1xuICAgICAgbG9jYWxlOiB7XG4gICAgICAgIGZvcm1hdDogdGhpcy5kYXRlRm9ybWF0LFxuICAgICAgICBhcHBseUxhYmVsOiAkLmkxOG4oJ2FwcGx5JyksXG4gICAgICAgIGNhbmNlbExhYmVsOiAkLmkxOG4oJ2NhbmNlbCcpLFxuICAgICAgICBjdXN0b21SYW5nZUxhYmVsOiAkLmkxOG4oJ2N1c3RvbS1yYW5nZScpLFxuICAgICAgICBkYXlzT2ZXZWVrOiBbXG4gICAgICAgICAgJC5pMThuKCdzdScpLFxuICAgICAgICAgICQuaTE4bignbW8nKSxcbiAgICAgICAgICAkLmkxOG4oJ3R1JyksXG4gICAgICAgICAgJC5pMThuKCd3ZScpLFxuICAgICAgICAgICQuaTE4bigndGgnKSxcbiAgICAgICAgICAkLmkxOG4oJ2ZyJyksXG4gICAgICAgICAgJC5pMThuKCdzYScpXG4gICAgICAgIF0sXG4gICAgICAgIG1vbnRoTmFtZXM6IFtcbiAgICAgICAgICAkLmkxOG4oJ2phbnVhcnknKSxcbiAgICAgICAgICAkLmkxOG4oJ2ZlYnJ1YXJ5JyksXG4gICAgICAgICAgJC5pMThuKCdtYXJjaCcpLFxuICAgICAgICAgICQuaTE4bignYXByaWwnKSxcbiAgICAgICAgICAkLmkxOG4oJ21heScpLFxuICAgICAgICAgICQuaTE4bignanVuZScpLFxuICAgICAgICAgICQuaTE4bignanVseScpLFxuICAgICAgICAgICQuaTE4bignYXVndXN0JyksXG4gICAgICAgICAgJC5pMThuKCdzZXB0ZW1iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ29jdG9iZXInKSxcbiAgICAgICAgICAkLmkxOG4oJ25vdmVtYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdkZWNlbWJlcicpXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBzdGFydERhdGU6IG1vbWVudCgpLnN1YnRyYWN0KHRoaXMuY29uZmlnLmRheXNBZ28sICdkYXlzJyksXG4gICAgICBtaW5EYXRlOiB0aGlzLmNvbmZpZy5taW5EYXRlLFxuICAgICAgbWF4RGF0ZTogdGhpcy5jb25maWcubWF4RGF0ZSxcbiAgICAgIHJhbmdlczogcmFuZ2VzXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5kYXRlTGltaXQpIGRhdGVwaWNrZXJPcHRpb25zLmRhdGVMaW1pdCA9IHsgZGF5czogdGhpcy5jb25maWcuZGF0ZUxpbWl0IH07XG5cbiAgICBkYXRlUmFuZ2VTZWxlY3Rvci5kYXRlcmFuZ2VwaWNrZXIoZGF0ZXBpY2tlck9wdGlvbnMpO1xuXG4gICAgLyoqIHNvIHBlb3BsZSBrbm93IHdoeSB0aGV5IGNhbid0IHF1ZXJ5IGRhdGEgb2xkZXIgdGhhbiBKdWx5IDIwMTUgKi9cbiAgICAkKCcuZGF0ZXJhbmdlcGlja2VyJykuYXBwZW5kKFxuICAgICAgJCgnPGRpdj4nKVxuICAgICAgICAuYWRkQ2xhc3MoJ2RhdGVyYW5nZS1ub3RpY2UnKVxuICAgICAgICAuaHRtbCgkLmkxOG4oJ2RhdGUtbm90aWNlJywgZG9jdW1lbnQudGl0bGUsXG4gICAgICAgICAgXCI8YSBocmVmPSdodHRwOi8vc3RhdHMuZ3Jvay5zZScgdGFyZ2V0PSdfYmxhbmsnPnN0YXRzLmdyb2suc2U8L2E+XCIsXG4gICAgICAgICAgYCR7JC5pMThuKCdqdWx5Jyl9IDIwMTVgXG4gICAgICAgICkpXG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzcGVjaWFsIGRhdGUgcmFuZ2Ugb3B0aW9ucyAoYnV0dG9ucyB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgZGF0ZXJhbmdlIHBpY2tlcilcbiAgICAgKlxuICAgICAqIFdBUk5JTkc6IHdlJ3JlIHVuYWJsZSB0byBhZGQgY2xhc3MgbmFtZXMgb3IgZGF0YSBhdHRycyB0byB0aGUgcmFuZ2Ugb3B0aW9ucyxcbiAgICAgKiBzbyBjaGVja2luZyB3aGljaCB3YXMgY2xpY2tlZCBpcyBoYXJkY29kZWQgYmFzZWQgb24gdGhlIGluZGV4IG9mIHRoZSBMSSxcbiAgICAgKiBhcyBkZWZpbmVkIGluIHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNcbiAgICAgKi9cbiAgICAkKCcuZGF0ZXJhbmdlcGlja2VyIC5yYW5nZXMgbGknKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gJCgnLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpJykuaW5kZXgoZS50YXJnZXQpLFxuICAgICAgICBjb250YWluZXIgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5jb250YWluZXIsXG4gICAgICAgIGlucHV0cyA9IGNvbnRhaW5lci5maW5kKCcuZGF0ZXJhbmdlcGlja2VyX2lucHV0IGlucHV0Jyk7XG4gICAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IHtcbiAgICAgICAgcmFuZ2U6IE9iamVjdC5rZXlzKHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXMpW2luZGV4XSxcbiAgICAgICAgdmFsdWU6IGAke2lucHV0c1swXS52YWx1ZX0gLSAke2lucHV0c1sxXS52YWx1ZX1gXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3Rvcikub24oJ2FwcGx5LmRhdGVyYW5nZXBpY2tlcicsIChlLCBhY3Rpb24pID0+IHtcbiAgICAgIGlmIChhY3Rpb24uY2hvc2VuTGFiZWwgPT09ICQuaTE4bignY3VzdG9tLXJhbmdlJykpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSBudWxsO1xuXG4gICAgICAgIC8qKiBmb3JjZSBldmVudHMgdG8gcmUtZmlyZSBzaW5jZSBhcHBseS5kYXRlcmFuZ2VwaWNrZXIgb2NjdXJzIGJlZm9yZSAnY2hhbmdlJyBldmVudCAqL1xuICAgICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci51cGRhdGVFbGVtZW50KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaG93RmF0YWxFcnJvcnMoZXJyb3JzKSB7XG4gICAgdGhpcy5jbGVhck1lc3NhZ2VzKCk7XG4gICAgZXJyb3JzLmZvckVhY2goZXJyb3IgPT4ge1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgIGA8c3Ryb25nPiR7JC5pMThuKCdmYXRhbC1lcnJvcicpfTwvc3Ryb25nPjogPGNvZGU+JHtlcnJvcn08L2NvZGU+YCxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICB0aHJvdyBlcnJvcnNbMF07XG4gICAgfSBlbHNlIGlmIChlcnJvcnMgJiYgZXJyb3JzWzBdICYmIGVycm9yc1swXS5zdGFjaykge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy8vdG9vbHMud21mbGFicy5vcmcvbXVzaWthbmltYWwvcGFzdGUnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29udGVudDogJycgK1xuICAgICAgICAgICAgYFxcbmRhdGU6ICAgICAgJHttb21lbnQoKS51dGMoKS5mb3JtYXQoKX1gICtcbiAgICAgICAgICAgIGBcXG50b29sOiAgICAgICR7dGhpcy5hcHB9YCArXG4gICAgICAgICAgICBgXFxubGFuZ3VhZ2U6ICAke2kxOG5MYW5nfWAgK1xuICAgICAgICAgICAgYFxcbmNoYXJ0OiAgICAgJHt0aGlzLmNoYXJ0VHlwZX1gICtcbiAgICAgICAgICAgIGBcXG51cmw6ICAgICAgICR7ZG9jdW1lbnQubG9jYXRpb24uaHJlZn1gICtcbiAgICAgICAgICAgIGBcXG51c2VyQWdlbnQ6ICR7dGhpcy5nZXRVc2VyQWdlbnQoKX1gICtcbiAgICAgICAgICAgIGBcXG50cmFjZTogICAgICR7ZXJyb3JzWzBdLnN0YWNrfWBcbiAgICAgICAgICAsXG4gICAgICAgICAgdGl0bGU6IGBQYWdldmlld3MgQW5hbHlzaXMgZXJyb3IgcmVwb3J0OiAke2Vycm9yc1swXX1gXG4gICAgICAgIH1cbiAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0Lm9iamVjdE5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAgICQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKGRhdGEucmVzdWx0Lm9iamVjdE5hbWUpKSxcbiAgICAgICAgICAgICdlcnJvcidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICAgJC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSksXG4gICAgICAgICAgICAnZXJyb3InXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbCgoKSA9PiB7XG4gICAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAgICQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpLFxuICAgICAgICAgICdlcnJvcidcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxhc2ggaW4gY29uc29sZSwganVzdCBmb3IgZnVuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IG91dHB1dFxuICAgKi9cbiAgc3BsYXNoKCkge1xuICAgIGNvbnN0IHN0eWxlID0gJ2JhY2tncm91bmQ6ICNlZWU7IGNvbG9yOiAjNTU1OyBwYWRkaW5nOiA0cHg7IGZvbnQtZmFtaWx5Om1vbm9zcGFjZSc7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgX19fICAgICAgICAgICAgX18gXyAgICAgICAgICAgICAgICAgICAgIF8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgIHwgXyBcXFxcICBfXyBfICAgIC8gX2AgfCAgIF9fXyAgICBfXyBfXyAgICAoXykgICAgIF9fXyAgIF9fIF9fIF9fICBfX18gICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgfCAgXy8gLyBfYCB8ICAgXFxcXF9fLCB8ICAvIC1fKSAgIFxcXFwgViAvICAgIHwgfCAgICAvIC1fKSAgXFxcXCBWICBWIC8gKF8tPCAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgIF98X3xfICBcXFxcX18sX3wgICB8X19fLyAgIFxcXFxfX198ICAgX1xcXFxfL18gICBffF98XyAgIFxcXFxfX198ICAgXFxcXF8vXFxcXF8vICAvX18vXyAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgIF98IFwiXCJcIiB8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInwgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgIFwiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJyAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgICAgICAgICAgX19fICAgICAgICAgICAgICAgICAgICAgXyAgXyAgICAgXyAgICAgICAgICAgICAgIF8gICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgbyBPIE8gIC8gICBcXFxcICAgXyBfICAgICBfXyBfICAgIHwgfHwgfCAgIHwgfCAgICAgX19fICAgICAoXykgICAgIF9fXyAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgIG8gICAgICAgfCAtIHwgIHwgXFwnIFxcXFwgICAvIF9gIHwgICAgXFxcXF8sIHwgICB8IHwgICAgKF8tPCAgICAgfCB8ICAgIChfLTwgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgIFRTX19bT10gIHxffF98ICB8X3x8X3wgIFxcXFxfXyxffCAgIF98X18vICAgX3xffF8gICAvX18vXyAgIF98X3xfICAgL19fL18gICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICB7PT09PT09fF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98IFwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInwgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgLi9vLS0wMDBcXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKGAlYyAgQ29weXJpZ2h0IMKpICR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSBNdXNpa0FuaW1hbCwgS2FsZGFyaSwgTWFyY2VsIFJ1aXogRm9ybnMgICAgICAgICAgICAgICAgICBgLCBzdHlsZSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBsb2FkaW5nIGluZGljYXRvciBjbGFzcyBhbmQgc2V0IHRoZSBzYWZlZ3VhcmQgdGltZW91dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc3RhcnRTcGlubnkoKSB7XG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLmFkZENsYXNzKCdsb2FkaW5nJyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGVyciA9PiB7XG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoYDxzdHJvbmc+JHskLmkxOG4oJ2ZhdGFsLWVycm9yJyl9PC9zdHJvbmc+OlxuICAgICAgICAkeyQuaTE4bignZXJyb3ItdGltZWQtb3V0Jyl9XG4gICAgICAgICR7JC5pMThuKCdlcnJvci1wbGVhc2UtcmVwb3J0JywgdGhpcy5nZXRCdWdSZXBvcnRVUkwoKSl9XG4gICAgICBgLCAnZXJyb3InLCAwKTtcbiAgICB9LCAyMCAqIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBsb2FkaW5nIGluZGljYXRvciBjbGFzcyBhbmQgY2xlYXIgdGhlIHNhZmVndWFyZCB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzdG9wU3Bpbm55KCkge1xuICAgICQoJy5jaGFydC1jb250YWluZXInKS5yZW1vdmVDbGFzcygnbG9hZGluZycpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2Ugc3BhY2VzIHdpdGggdW5kZXJzY29yZXNcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEByZXR1cm5zIHthcnJheX0gcGFnZSBuYW1lcyB3aXRoIHVuZGVyc2NvcmVzXG4gICAqL1xuICB1bmRlcnNjb3JlUGFnZU5hbWVzKHBhZ2VzKSB7XG4gICAgcmV0dXJuIHBhZ2VzLm1hcChwYWdlID0+IHtcbiAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFnZSkuc2NvcmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgaHJlZnMgb2YgaW50ZXItYXBwIGxpbmtzIHRvIGxvYWQgY3VycmVudGx5IHNlbGVjdGVkIHByb2plY3RcbiAgICogQHJldHVybiB7bnVsbH0gbnV0dGluJ1xuICAgKi9cbiAgdXBkYXRlSW50ZXJBcHBMaW5rcygpIHtcbiAgICAkKCcuaW50ZXJhcHAtbGluaycpLmVhY2goKGksIGxpbmspID0+IHtcbiAgICAgIGxldCB1cmwgPSBsaW5rLmhyZWYuc3BsaXQoJz8nKVswXTtcblxuICAgICAgaWYgKGxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnRlcmFwcC1saW5rLS1zaXRldmlld3MnKSkge1xuICAgICAgICBsaW5rLmhyZWYgPSBgJHt1cmx9P3NpdGVzPSR7dGhpcy5wcm9qZWN0LmVzY2FwZSgpfS5vcmdgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluay5ocmVmID0gYCR7dXJsfT9wcm9qZWN0PSR7dGhpcy5wcm9qZWN0LmVzY2FwZSgpfS5vcmdgO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGJhc2ljIHBhcmFtcyBhZ2FpbnN0IHdoYXQgaXMgZGVmaW5lZCBpbiB0aGUgY29uZmlnLFxuICAgKiAgIGFuZCBpZiB0aGV5IGFyZSBpbnZhbGlkIHNldCB0aGUgZGVmYXVsdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gcGFyYW1zIGFzIGZldGNoZWQgYnkgdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKClcbiAgICogQHJldHVybnMge09iamVjdH0gc2FtZSBwYXJhbXMgd2l0aCBzb21lIGludmFsaWQgcGFyYW1ldGVycyBjb3JyZXRlZCwgYXMgbmVjZXNzYXJ5XG4gICAqL1xuICB2YWxpZGF0ZVBhcmFtcyhwYXJhbXMpIHtcbiAgICB0aGlzLmNvbmZpZy52YWxpZGF0ZVBhcmFtcy5mb3JFYWNoKHBhcmFtS2V5ID0+IHtcbiAgICAgIGlmIChwYXJhbUtleSA9PT0gJ3Byb2plY3QnICYmIHBhcmFtcy5wcm9qZWN0KSB7XG4gICAgICAgIHBhcmFtcy5wcm9qZWN0ID0gcGFyYW1zLnByb2plY3QucmVwbGFjZSgvXnd3d1xcLi8sICcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5jb25maWcuZGVmYXVsdHNbcGFyYW1LZXldLFxuICAgICAgICBwYXJhbVZhbHVlID0gcGFyYW1zW3BhcmFtS2V5XTtcblxuICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAmJiAhdGhpcy5jb25maWcudmFsaWRQYXJhbXNbcGFyYW1LZXldLmluY2x1ZGVzKHBhcmFtVmFsdWUpKSB7XG4gICAgICAgIC8vIG9ubHkgdGhyb3cgZXJyb3IgaWYgdGhleSB0cmllZCB0byBwcm92aWRlIGFuIGludmFsaWQgdmFsdWVcbiAgICAgICAgaWYgKCEhcGFyYW1WYWx1ZSkge1xuICAgICAgICAgIHRoaXMuYWRkSW52YWxpZFBhcmFtTm90aWNlKHBhcmFtS2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtc1twYXJhbUtleV0gPSBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbGlzdGVuZXJzIHRvIHRoZSBwcm9qZWN0IGlucHV0IGZvciB2YWxpZGF0aW9ucyBhZ2FpbnN0IHRoZSBzaXRlIG1hcCxcbiAgICogICByZXZlcnRpbmcgdG8gdGhlIG9sZCB2YWx1ZSBpZiB0aGUgbmV3IG9uZSBpcyBpbnZhbGlkXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW211bHRpbGluZ3VhbF0gLSB3aGV0aGVyIHdlIHNob3VsZCBjaGVjayBpZiBpdCBpcyBhIG11bHRpbGluZ3VhbCBwcm9qZWN0XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSB3aGV0aGVyIG9yIG5vdCB2YWxpZGF0aW9ucyBwYXNzZWRcbiAgICovXG4gIHZhbGlkYXRlUHJvamVjdChtdWx0aWxpbmd1YWwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHByb2plY3RJbnB1dCA9ICQodGhpcy5jb25maWcucHJvamVjdElucHV0KVswXTtcbiAgICBsZXQgcHJvamVjdCA9IHByb2plY3RJbnB1dC52YWx1ZS5yZXBsYWNlKC9ed3d3XFwuLywgJycpLFxuICAgICAgdmFsaWQgPSBmYWxzZTtcblxuICAgIGlmIChtdWx0aWxpbmd1YWwgJiYgIXRoaXMuaXNNdWx0aWxhbmdQcm9qZWN0KCkpIHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAkLmkxOG4oJ2ludmFsaWQtbGFuZy1wcm9qZWN0JywgYDxhIGhyZWY9Jy8vJHtwcm9qZWN0LmVzY2FwZSgpfSc+JHtwcm9qZWN0LmVzY2FwZSgpfTwvYT5gKSxcbiAgICAgICAgJ3dhcm5pbmcnXG4gICAgICApO1xuICAgICAgcHJvamVjdCA9IHByb2plY3RJbnB1dC5kYXRhc2V0LnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoc2l0ZURvbWFpbnMuaW5jbHVkZXMocHJvamVjdCkpIHtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgICAgdGhpcy51cGRhdGVJbnRlckFwcExpbmtzKCk7XG4gICAgICB2YWxpZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICAkLmkxOG4oJ2ludmFsaWQtcHJvamVjdCcsIGA8YSBocmVmPScvLyR7cHJvamVjdC5lc2NhcGUoKX0nPiR7cHJvamVjdC5lc2NhcGUoKX08L2E+YCksXG4gICAgICAgICd3YXJuaW5nJ1xuICAgICAgKTtcbiAgICAgIHByb2plY3QgPSBwcm9qZWN0SW5wdXQuZGF0YXNldC52YWx1ZTtcbiAgICB9XG5cbiAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0O1xuXG4gICAgcmV0dXJuIHZhbGlkO1xuICB9XG5cbiAgLy8gRklYTUU6IHJlc3RvcmUgd3JpdGVNZXNzYWdlIHRvIHRoZSB3YXkgaXQgdXNlZCB0byBiZSxcbiAgLy8gYW5kIG1ha2UgYWRkU2l0ZU5vdGljZSBkbyB0aGUgdG9hc3RyLCBhbmQgY2hhbmdlIGluc3RhbmNlcyBvZiB0aGlzLndyaXRlTWVzc2FnZVxuICAvLyBhY2NvcmRpbmdseVxuICAvKipcbiAgICogV3JpdGVzIG1lc3NhZ2UganVzdCBiZWxvdyB0aGUgY2hhcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBtZXNzYWdlIHRvIHdyaXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0IC0gbnVtIHNlY29uZHMgdG8gc2hvd1xuICAgKiBAcmV0dXJucyB7alF1ZXJ5fSAtIGpRdWVyeSBvYmplY3Qgb2YgbWVzc2FnZSBjb250YWluZXJcbiAgICovXG4gIHdyaXRlTWVzc2FnZShtZXNzYWdlLCBsZXZlbCA9ICd3YXJuaW5nJywgdGltZW91dCA9IDUwMDApIHtcbiAgICB0b2FzdHIub3B0aW9ucy50aW1lT3V0ID0gdGltZW91dDtcbiAgICB0b2FzdHJbbGV2ZWxdKG1lc3NhZ2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHY7XG4iLCIvKipcbiAqIEBmaWxlIFNoYXJlZCBjb25maWcgYW1vbmdzdCBhbGwgYXBwc1xuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZTogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5jb25zdCBzaXRlTWFwID0gcmVxdWlyZSgnLi9zaXRlX21hcCcpO1xuY29uc3Qgc2l0ZURvbWFpbnMgPSBPYmplY3Qua2V5cyhzaXRlTWFwKS5tYXAoa2V5ID0+IHNpdGVNYXBba2V5XSk7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgYWxsIFBhZ2V2aWV3cyBhcHBsaWNhdGlvbnMuXG4gKiBTb21lIHByb3BlcnRpZXMgbWF5IGJlIG92ZXJyaWRlbiBieSBhcHAtc3BlY2lmaWMgY29uZmlnc1xuICovXG5jbGFzcyBQdkNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBmb3JtYXRYQXhpc1RpY2sgPSB2YWx1ZSA9PiB7XG4gICAgICBjb25zdCBkYXlPZldlZWsgPSBtb21lbnQodmFsdWUsIHRoaXMuZGF0ZUZvcm1hdCkud2Vla2RheSgpO1xuICAgICAgaWYgKGRheU9mV2VlayAlIDcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGDigKIgJHt2YWx1ZX1gO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGFwaUxpbWl0OiA1MDAwLFxuICAgICAgYXBpVGhyb3R0bGU6IDIwLFxuICAgICAgYXBwczogWydwYWdldmlld3MnLCAndG9wdmlld3MnLCAnbGFuZ3ZpZXdzJywgJ3NpdGV2aWV3cycsICdtYXNzdmlld3MnLCAncmVkaXJlY3R2aWV3cyddLFxuICAgICAgY2hhcnRDb25maWc6IHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIHNjYWxlczoge1xuICAgICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IHZhbHVlID0+IHRoaXMuZm9ybWF0WUF4aXNOdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgeEF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRYQXhpc1RpY2sodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5saW5lYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMCknLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEJvcmRlckNvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuMiksXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJSYWRpdXM6IDUsXG4gICAgICAgICAgICAgIHRlbnNpb246IHNlbGYuYmV6aWVyQ3VydmUgPT09ICd0cnVlJyA/IDAuNCA6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBiYXI6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdFlBeGlzTnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIHhBeGVzOiBbe1xuICAgICAgICAgICAgICAgIGJhclBlcmNlbnRhZ2U6IDEuMCxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeVBlcmNlbnRhZ2U6IDAuODUsXG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRYQXhpc1RpY2sodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5saW5lYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjYpLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjkpLFxuICAgICAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC43NSksXG4gICAgICAgICAgICAgIGhvdmVyQm9yZGVyQ29sb3I6IGNvbG9yXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmFkYXI6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmxpbmVhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuMSksXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRCb3JkZXJDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjgpLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlclJhZGl1czogNVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBpZToge1xuICAgICAgICAgIG9wdHM6IHtcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZG91Z2hudXQ6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb2xhckFyZWE6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgIGJlZ2luQXRaZXJvOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBjaGFydCA9PiB0aGlzLmNvbmZpZy5jaGFydExlZ2VuZChzZWxmKSxcbiAgICAgICAgICAgIHRvb2x0aXBzOiB0aGlzLmNpcmN1bGFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNyksXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuOSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2lyY3VsYXJDaGFydHM6IFsncGllJywgJ2RvdWdobnV0JywgJ3BvbGFyQXJlYSddLFxuICAgICAgY29sb3JzOiBbJ3JnYmEoMTcxLCAyMTIsIDIzNSwgMSknLCAncmdiYSgxNzgsIDIyMywgMTM4LCAxKScsICdyZ2JhKDI1MSwgMTU0LCAxNTMsIDEpJywgJ3JnYmEoMjUzLCAxOTEsIDExMSwgMSknLCAncmdiYSgyMDIsIDE3OCwgMjE0LCAxKScsICdyZ2JhKDIwNywgMTgyLCAxMjgsIDEpJywgJ3JnYmEoMTQxLCAyMTEsIDE5OSwgMSknLCAncmdiYSgyNTIsIDIwNSwgMjI5LCAxKScsICdyZ2JhKDI1NSwgMjQ3LCAxNjEsIDEpJywgJ3JnYmEoMjE3LCAyMTcsIDIxNywgMSknXSxcbiAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGF1dG9jb21wbGV0ZTogJ2F1dG9jb21wbGV0ZScsXG4gICAgICAgIGNoYXJ0VHlwZTogbnVtRGF0YXNldHMgPT4gbnVtRGF0YXNldHMgPiAxID8gJ2xpbmUnIDogJ2JhcicsXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdZWVlZLU1NLUREJyxcbiAgICAgICAgbG9jYWxpemVEYXRlRm9ybWF0OiAndHJ1ZScsXG4gICAgICAgIG51bWVyaWNhbEZvcm1hdHRpbmc6ICd0cnVlJyxcbiAgICAgICAgYmV6aWVyQ3VydmU6ICdmYWxzZScsXG4gICAgICAgIGF1dG9Mb2dEZXRlY3Rpb246ICd0cnVlJyxcbiAgICAgICAgYmVnaW5BdFplcm86ICdmYWxzZScsXG4gICAgICAgIHJlbWVtYmVyQ2hhcnQ6ICd0cnVlJyxcbiAgICAgICAgYWdlbnQ6ICd1c2VyJyxcbiAgICAgICAgcGxhdGZvcm06ICdhbGwtYWNjZXNzJyxcbiAgICAgICAgcHJvamVjdDogJ2VuLndpa2lwZWRpYS5vcmcnXG4gICAgICB9LFxuICAgICAgZ2xvYmFsQ2hhcnRPcHRzOiB7XG4gICAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgZWFzaW5nOiAnZWFzZUluT3V0UXVhcnQnXG4gICAgICAgIH0sXG4gICAgICAgIGhvdmVyOiB7XG4gICAgICAgICAgYW5pbWF0aW9uRHVyYXRpb246IDBcbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxpbmVhckNoYXJ0czogWydsaW5lJywgJ2JhcicsICdyYWRhciddLFxuICAgICAgbGluZWFyT3B0czoge1xuICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoY2hhcnQuZGF0YS5kYXRhc2V0cywgc2VsZilcbiAgICAgIH0sXG4gICAgICBkYXlzQWdvOiAyMCxcbiAgICAgIG1pbkRhdGU6IG1vbWVudCgnMjAxNS0wNy0wMScpLnN0YXJ0T2YoJ2RheScpLFxuICAgICAgbWF4RGF0ZTogbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKSxcbiAgICAgIHNwZWNpYWxSYW5nZXM6IHtcbiAgICAgICAgJ2xhc3Qtd2Vlayc6IFttb21lbnQoKS5zdWJ0cmFjdCgxLCAnd2VlaycpLnN0YXJ0T2YoJ3dlZWsnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWsnKS5lbmRPZignd2VlaycpXSxcbiAgICAgICAgJ3RoaXMtbW9udGgnOiBbbW9tZW50KCkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKS5zdGFydE9mKCdkYXknKV0sXG4gICAgICAgICdsYXN0LW1vbnRoJzogW21vbWVudCgpLnN1YnRyYWN0KDEsICdtb250aCcpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICdtb250aCcpLmVuZE9mKCdtb250aCcpXSxcbiAgICAgICAgbGF0ZXN0KG9mZnNldCA9IHNlbGYuY29uZmlnLmRheXNBZ28pIHtcbiAgICAgICAgICByZXR1cm4gW21vbWVudCgpLnN1YnRyYWN0KG9mZnNldCwgJ2RheXMnKS5zdGFydE9mKCdkYXknKSwgc2VsZi5jb25maWcubWF4RGF0ZV07XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0aW1lc3RhbXBGb3JtYXQ6ICdZWVlZTU1ERDAwJyxcbiAgICAgIHZhbGlkUGFyYW1zOiB7XG4gICAgICAgIGFnZW50OiBbJ2FsbC1hZ2VudHMnLCAndXNlcicsICdzcGlkZXInLCAnYm90J10sXG4gICAgICAgIHBsYXRmb3JtOiBbJ2FsbC1hY2Nlc3MnLCAnZGVza3RvcCcsICdtb2JpbGUtYXBwJywgJ21vYmlsZS13ZWInXSxcbiAgICAgICAgcHJvamVjdDogc2l0ZURvbWFpbnNcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZ2V0IGxpbmVhclRvb2x0aXBzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtb2RlOiAnbGFiZWwnLFxuICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGxhYmVsOiB0b29sdGlwSXRlbSA9PiB7XG4gICAgICAgICAgaWYgKE51bWJlci5pc05hTih0b29sdGlwSXRlbS55TGFiZWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAnICsgJC5pMThuKCd1bmtub3duJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnICcgKyB0aGlzLmZvcm1hdE51bWJlcih0b29sdGlwSXRlbS55TGFiZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJvZHlGb250U2l6ZTogMTQsXG4gICAgICBib2R5U3BhY2luZzogNyxcbiAgICAgIGNhcmV0U2l6ZTogMCxcbiAgICAgIHRpdGxlRm9udFNpemU6IDE0XG4gICAgfTtcbiAgfVxuXG4gIGdldCBjaXJjdWxhclRvb2x0aXBzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgbGFiZWw6ICh0b29sdGlwSXRlbSwgY2hhcnRJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2hhcnRJbnN0YW5jZS5kYXRhc2V0c1t0b29sdGlwSXRlbS5kYXRhc2V0SW5kZXhdLmRhdGFbdG9vbHRpcEl0ZW0uaW5kZXhdLFxuICAgICAgICAgICAgbGFiZWwgPSBjaGFydEluc3RhbmNlLmxhYmVsc1t0b29sdGlwSXRlbS5pbmRleF07XG5cbiAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke2xhYmVsfTogJHskLmkxOG4oJ3Vua25vd24nKX1gO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7bGFiZWx9OiAke3RoaXMuZm9ybWF0TnVtYmVyKHZhbHVlKX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJvZHlGb250U2l6ZTogMTQsXG4gICAgICBib2R5U3BhY2luZzogNyxcbiAgICAgIGNhcmV0U2l6ZTogMCxcbiAgICAgIHRpdGxlRm9udFNpemU6IDE0XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFB2Q29uZmlnO1xuIiwiLyoqXG4gKiBAZmlsZSBXTUYgW3NpdGUgbWF0cml4XShodHRwczovL3d3dy5tZWRpYXdpa2kub3JnL3cvYXBpLnBocD9hY3Rpb249c2l0ZW1hdHJpeCksIHdpdGggc29tZSB1bnN1cHBvcnRlZCB3aWtpcyByZW1vdmVkXG4gKi9cblxuLyoqXG4gKiBTaXRlbWF0cml4IG9mIGFsbCBzdXBwb3J0ZWQgV01GIHdpa2lzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBzaXRlTWFwID0ge1xuICAnYWF3aWtpJzogJ2FhLndpa2lwZWRpYS5vcmcnLFxuICAnYWF3aWt0aW9uYXJ5JzogJ2FhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fhd2lraWJvb2tzJzogJ2FhLndpa2lib29rcy5vcmcnLFxuICAnYWJ3aWtpJzogJ2FiLndpa2lwZWRpYS5vcmcnLFxuICAnYWJ3aWt0aW9uYXJ5JzogJ2FiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FjZXdpa2knOiAnYWNlLndpa2lwZWRpYS5vcmcnLFxuICAnYWR5d2lraSc6ICdhZHkud2lraXBlZGlhLm9yZycsXG4gICdhZndpa2knOiAnYWYud2lraXBlZGlhLm9yZycsXG4gICdhZndpa3Rpb25hcnknOiAnYWYud2lrdGlvbmFyeS5vcmcnLFxuICAnYWZ3aWtpYm9va3MnOiAnYWYud2lraWJvb2tzLm9yZycsXG4gICdhZndpa2lxdW90ZSc6ICdhZi53aWtpcXVvdGUub3JnJyxcbiAgJ2Frd2lraSc6ICdhay53aWtpcGVkaWEub3JnJyxcbiAgJ2Frd2lrdGlvbmFyeSc6ICdhay53aWt0aW9uYXJ5Lm9yZycsXG4gICdha3dpa2lib29rcyc6ICdhay53aWtpYm9va3Mub3JnJyxcbiAgJ2Fsc3dpa2knOiAnYWxzLndpa2lwZWRpYS5vcmcnLFxuICAnYWxzd2lrdGlvbmFyeSc6ICdhbHMud2lrdGlvbmFyeS5vcmcnLFxuICAnYWxzd2lraWJvb2tzJzogJ2Fscy53aWtpYm9va3Mub3JnJyxcbiAgJ2Fsc3dpa2lxdW90ZSc6ICdhbHMud2lraXF1b3RlLm9yZycsXG4gICdhbXdpa2knOiAnYW0ud2lraXBlZGlhLm9yZycsXG4gICdhbXdpa3Rpb25hcnknOiAnYW0ud2lrdGlvbmFyeS5vcmcnLFxuICAnYW13aWtpcXVvdGUnOiAnYW0ud2lraXF1b3RlLm9yZycsXG4gICdhbndpa2knOiAnYW4ud2lraXBlZGlhLm9yZycsXG4gICdhbndpa3Rpb25hcnknOiAnYW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnYW5nd2lraSc6ICdhbmcud2lraXBlZGlhLm9yZycsXG4gICdhbmd3aWt0aW9uYXJ5JzogJ2FuZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdhbmd3aWtpYm9va3MnOiAnYW5nLndpa2lib29rcy5vcmcnLFxuICAnYW5nd2lraXF1b3RlJzogJ2FuZy53aWtpcXVvdGUub3JnJyxcbiAgJ2FuZ3dpa2lzb3VyY2UnOiAnYW5nLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Fyd2lraSc6ICdhci53aWtpcGVkaWEub3JnJyxcbiAgJ2Fyd2lrdGlvbmFyeSc6ICdhci53aWt0aW9uYXJ5Lm9yZycsXG4gICdhcndpa2lib29rcyc6ICdhci53aWtpYm9va3Mub3JnJyxcbiAgJ2Fyd2lraW5ld3MnOiAnYXIud2lraW5ld3Mub3JnJyxcbiAgJ2Fyd2lraXF1b3RlJzogJ2FyLndpa2lxdW90ZS5vcmcnLFxuICAnYXJ3aWtpc291cmNlJzogJ2FyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Fyd2lraXZlcnNpdHknOiAnYXIud2lraXZlcnNpdHkub3JnJyxcbiAgJ2FyY3dpa2knOiAnYXJjLndpa2lwZWRpYS5vcmcnLFxuICAnYXJ6d2lraSc6ICdhcnoud2lraXBlZGlhLm9yZycsXG4gICdhc3dpa2knOiAnYXMud2lraXBlZGlhLm9yZycsXG4gICdhc3dpa3Rpb25hcnknOiAnYXMud2lrdGlvbmFyeS5vcmcnLFxuICAnYXN3aWtpYm9va3MnOiAnYXMud2lraWJvb2tzLm9yZycsXG4gICdhc3dpa2lzb3VyY2UnOiAnYXMud2lraXNvdXJjZS5vcmcnLFxuICAnYXN0d2lraSc6ICdhc3Qud2lraXBlZGlhLm9yZycsXG4gICdhc3R3aWt0aW9uYXJ5JzogJ2FzdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdhc3R3aWtpYm9va3MnOiAnYXN0Lndpa2lib29rcy5vcmcnLFxuICAnYXN0d2lraXF1b3RlJzogJ2FzdC53aWtpcXVvdGUub3JnJyxcbiAgJ2F2d2lraSc6ICdhdi53aWtpcGVkaWEub3JnJyxcbiAgJ2F2d2lrdGlvbmFyeSc6ICdhdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdheXdpa2knOiAnYXkud2lraXBlZGlhLm9yZycsXG4gICdheXdpa3Rpb25hcnknOiAnYXkud2lrdGlvbmFyeS5vcmcnLFxuICAnYXl3aWtpYm9va3MnOiAnYXkud2lraWJvb2tzLm9yZycsXG4gICdhendpa2knOiAnYXoud2lraXBlZGlhLm9yZycsXG4gICdhendpa3Rpb25hcnknOiAnYXoud2lrdGlvbmFyeS5vcmcnLFxuICAnYXp3aWtpYm9va3MnOiAnYXoud2lraWJvb2tzLm9yZycsXG4gICdhendpa2lxdW90ZSc6ICdhei53aWtpcXVvdGUub3JnJyxcbiAgJ2F6d2lraXNvdXJjZSc6ICdhei53aWtpc291cmNlLm9yZycsXG4gICdhemJ3aWtpJzogJ2F6Yi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jhd2lraSc6ICdiYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jhd2lraWJvb2tzJzogJ2JhLndpa2lib29rcy5vcmcnLFxuICAnYmFyd2lraSc6ICdiYXIud2lraXBlZGlhLm9yZycsXG4gICdiYXRfc21nd2lraSc6ICdiYXQtc21nLndpa2lwZWRpYS5vcmcnLFxuICAnYmNsd2lraSc6ICdiY2wud2lraXBlZGlhLm9yZycsXG4gICdiZXdpa2knOiAnYmUud2lraXBlZGlhLm9yZycsXG4gICdiZXdpa3Rpb25hcnknOiAnYmUud2lrdGlvbmFyeS5vcmcnLFxuICAnYmV3aWtpYm9va3MnOiAnYmUud2lraWJvb2tzLm9yZycsXG4gICdiZXdpa2lxdW90ZSc6ICdiZS53aWtpcXVvdGUub3JnJyxcbiAgJ2Jld2lraXNvdXJjZSc6ICdiZS53aWtpc291cmNlLm9yZycsXG4gICdiZV94X29sZHdpa2knOiAnYmUtdGFyYXNrLndpa2lwZWRpYS5vcmcnLFxuICAnYmd3aWtpJzogJ2JnLndpa2lwZWRpYS5vcmcnLFxuICAnYmd3aWt0aW9uYXJ5JzogJ2JnLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jnd2lraWJvb2tzJzogJ2JnLndpa2lib29rcy5vcmcnLFxuICAnYmd3aWtpbmV3cyc6ICdiZy53aWtpbmV3cy5vcmcnLFxuICAnYmd3aWtpcXVvdGUnOiAnYmcud2lraXF1b3RlLm9yZycsXG4gICdiZ3dpa2lzb3VyY2UnOiAnYmcud2lraXNvdXJjZS5vcmcnLFxuICAnYmh3aWtpJzogJ2JoLndpa2lwZWRpYS5vcmcnLFxuICAnYmh3aWt0aW9uYXJ5JzogJ2JoLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jpd2lraSc6ICdiaS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jpd2lrdGlvbmFyeSc6ICdiaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdiaXdpa2lib29rcyc6ICdiaS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jqbndpa2knOiAnYmpuLndpa2lwZWRpYS5vcmcnLFxuICAnYm13aWtpJzogJ2JtLndpa2lwZWRpYS5vcmcnLFxuICAnYm13aWt0aW9uYXJ5JzogJ2JtLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jtd2lraWJvb2tzJzogJ2JtLndpa2lib29rcy5vcmcnLFxuICAnYm13aWtpcXVvdGUnOiAnYm0ud2lraXF1b3RlLm9yZycsXG4gICdibndpa2knOiAnYm4ud2lraXBlZGlhLm9yZycsXG4gICdibndpa3Rpb25hcnknOiAnYm4ud2lrdGlvbmFyeS5vcmcnLFxuICAnYm53aWtpYm9va3MnOiAnYm4ud2lraWJvb2tzLm9yZycsXG4gICdibndpa2lzb3VyY2UnOiAnYm4ud2lraXNvdXJjZS5vcmcnLFxuICAnYm93aWtpJzogJ2JvLndpa2lwZWRpYS5vcmcnLFxuICAnYm93aWt0aW9uYXJ5JzogJ2JvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jvd2lraWJvb2tzJzogJ2JvLndpa2lib29rcy5vcmcnLFxuICAnYnB5d2lraSc6ICdicHkud2lraXBlZGlhLm9yZycsXG4gICdicndpa2knOiAnYnIud2lraXBlZGlhLm9yZycsXG4gICdicndpa3Rpb25hcnknOiAnYnIud2lrdGlvbmFyeS5vcmcnLFxuICAnYnJ3aWtpcXVvdGUnOiAnYnIud2lraXF1b3RlLm9yZycsXG4gICdicndpa2lzb3VyY2UnOiAnYnIud2lraXNvdXJjZS5vcmcnLFxuICAnYnN3aWtpJzogJ2JzLndpa2lwZWRpYS5vcmcnLFxuICAnYnN3aWt0aW9uYXJ5JzogJ2JzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jzd2lraWJvb2tzJzogJ2JzLndpa2lib29rcy5vcmcnLFxuICAnYnN3aWtpbmV3cyc6ICdicy53aWtpbmV3cy5vcmcnLFxuICAnYnN3aWtpcXVvdGUnOiAnYnMud2lraXF1b3RlLm9yZycsXG4gICdic3dpa2lzb3VyY2UnOiAnYnMud2lraXNvdXJjZS5vcmcnLFxuICAnYnVnd2lraSc6ICdidWcud2lraXBlZGlhLm9yZycsXG4gICdieHJ3aWtpJzogJ2J4ci53aWtpcGVkaWEub3JnJyxcbiAgJ2Nhd2lraSc6ICdjYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Nhd2lrdGlvbmFyeSc6ICdjYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdjYXdpa2lib29rcyc6ICdjYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Nhd2lraW5ld3MnOiAnY2Eud2lraW5ld3Mub3JnJyxcbiAgJ2Nhd2lraXF1b3RlJzogJ2NhLndpa2lxdW90ZS5vcmcnLFxuICAnY2F3aWtpc291cmNlJzogJ2NhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Nia196YW13aWtpJzogJ2Niay16YW0ud2lraXBlZGlhLm9yZycsXG4gICdjZG93aWtpJzogJ2Nkby53aWtpcGVkaWEub3JnJyxcbiAgJ2Nld2lraSc6ICdjZS53aWtpcGVkaWEub3JnJyxcbiAgJ2NlYndpa2knOiAnY2ViLndpa2lwZWRpYS5vcmcnLFxuICAnY2h3aWtpJzogJ2NoLndpa2lwZWRpYS5vcmcnLFxuICAnY2h3aWt0aW9uYXJ5JzogJ2NoLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nod2lraWJvb2tzJzogJ2NoLndpa2lib29rcy5vcmcnLFxuICAnY2hvd2lraSc6ICdjaG8ud2lraXBlZGlhLm9yZycsXG4gICdjaHJ3aWtpJzogJ2Noci53aWtpcGVkaWEub3JnJyxcbiAgJ2Nocndpa3Rpb25hcnknOiAnY2hyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2NoeXdpa2knOiAnY2h5Lndpa2lwZWRpYS5vcmcnLFxuICAnY2tid2lraSc6ICdja2Iud2lraXBlZGlhLm9yZycsXG4gICdjb3dpa2knOiAnY28ud2lraXBlZGlhLm9yZycsXG4gICdjb3dpa3Rpb25hcnknOiAnY28ud2lrdGlvbmFyeS5vcmcnLFxuICAnY293aWtpYm9va3MnOiAnY28ud2lraWJvb2tzLm9yZycsXG4gICdjb3dpa2lxdW90ZSc6ICdjby53aWtpcXVvdGUub3JnJyxcbiAgJ2Nyd2lraSc6ICdjci53aWtpcGVkaWEub3JnJyxcbiAgJ2Nyd2lrdGlvbmFyeSc6ICdjci53aWt0aW9uYXJ5Lm9yZycsXG4gICdjcndpa2lxdW90ZSc6ICdjci53aWtpcXVvdGUub3JnJyxcbiAgJ2NyaHdpa2knOiAnY3JoLndpa2lwZWRpYS5vcmcnLFxuICAnY3N3aWtpJzogJ2NzLndpa2lwZWRpYS5vcmcnLFxuICAnY3N3aWt0aW9uYXJ5JzogJ2NzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nzd2lraWJvb2tzJzogJ2NzLndpa2lib29rcy5vcmcnLFxuICAnY3N3aWtpbmV3cyc6ICdjcy53aWtpbmV3cy5vcmcnLFxuICAnY3N3aWtpcXVvdGUnOiAnY3Mud2lraXF1b3RlLm9yZycsXG4gICdjc3dpa2lzb3VyY2UnOiAnY3Mud2lraXNvdXJjZS5vcmcnLFxuICAnY3N3aWtpdmVyc2l0eSc6ICdjcy53aWtpdmVyc2l0eS5vcmcnLFxuICAnY3Nid2lraSc6ICdjc2Iud2lraXBlZGlhLm9yZycsXG4gICdjc2J3aWt0aW9uYXJ5JzogJ2NzYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdjdXdpa2knOiAnY3Uud2lraXBlZGlhLm9yZycsXG4gICdjdndpa2knOiAnY3Yud2lraXBlZGlhLm9yZycsXG4gICdjdndpa2lib29rcyc6ICdjdi53aWtpYm9va3Mub3JnJyxcbiAgJ2N5d2lraSc6ICdjeS53aWtpcGVkaWEub3JnJyxcbiAgJ2N5d2lrdGlvbmFyeSc6ICdjeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdjeXdpa2lib29rcyc6ICdjeS53aWtpYm9va3Mub3JnJyxcbiAgJ2N5d2lraXF1b3RlJzogJ2N5Lndpa2lxdW90ZS5vcmcnLFxuICAnY3l3aWtpc291cmNlJzogJ2N5Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Rhd2lraSc6ICdkYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Rhd2lrdGlvbmFyeSc6ICdkYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdkYXdpa2lib29rcyc6ICdkYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Rhd2lraXF1b3RlJzogJ2RhLndpa2lxdW90ZS5vcmcnLFxuICAnZGF3aWtpc291cmNlJzogJ2RhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Rld2lraSc6ICdkZS53aWtpcGVkaWEub3JnJyxcbiAgJ2Rld2lrdGlvbmFyeSc6ICdkZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdkZXdpa2lib29rcyc6ICdkZS53aWtpYm9va3Mub3JnJyxcbiAgJ2Rld2lraW5ld3MnOiAnZGUud2lraW5ld3Mub3JnJyxcbiAgJ2Rld2lraXF1b3RlJzogJ2RlLndpa2lxdW90ZS5vcmcnLFxuICAnZGV3aWtpc291cmNlJzogJ2RlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Rld2lraXZlcnNpdHknOiAnZGUud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Rld2lraXZveWFnZSc6ICdkZS53aWtpdm95YWdlLm9yZycsXG4gICdkaXF3aWtpJzogJ2RpcS53aWtpcGVkaWEub3JnJyxcbiAgJ2RzYndpa2knOiAnZHNiLndpa2lwZWRpYS5vcmcnLFxuICAnZHZ3aWtpJzogJ2R2Lndpa2lwZWRpYS5vcmcnLFxuICAnZHZ3aWt0aW9uYXJ5JzogJ2R2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2R6d2lraSc6ICdkei53aWtpcGVkaWEub3JnJyxcbiAgJ2R6d2lrdGlvbmFyeSc6ICdkei53aWt0aW9uYXJ5Lm9yZycsXG4gICdlZXdpa2knOiAnZWUud2lraXBlZGlhLm9yZycsXG4gICdlbHdpa2knOiAnZWwud2lraXBlZGlhLm9yZycsXG4gICdlbHdpa3Rpb25hcnknOiAnZWwud2lrdGlvbmFyeS5vcmcnLFxuICAnZWx3aWtpYm9va3MnOiAnZWwud2lraWJvb2tzLm9yZycsXG4gICdlbHdpa2luZXdzJzogJ2VsLndpa2luZXdzLm9yZycsXG4gICdlbHdpa2lxdW90ZSc6ICdlbC53aWtpcXVvdGUub3JnJyxcbiAgJ2Vsd2lraXNvdXJjZSc6ICdlbC53aWtpc291cmNlLm9yZycsXG4gICdlbHdpa2l2ZXJzaXR5JzogJ2VsLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlbHdpa2l2b3lhZ2UnOiAnZWwud2lraXZveWFnZS5vcmcnLFxuICAnZW1sd2lraSc6ICdlbWwud2lraXBlZGlhLm9yZycsXG4gICdlbndpa2knOiAnZW4ud2lraXBlZGlhLm9yZycsXG4gICdlbndpa3Rpb25hcnknOiAnZW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnZW53aWtpYm9va3MnOiAnZW4ud2lraWJvb2tzLm9yZycsXG4gICdlbndpa2luZXdzJzogJ2VuLndpa2luZXdzLm9yZycsXG4gICdlbndpa2lxdW90ZSc6ICdlbi53aWtpcXVvdGUub3JnJyxcbiAgJ2Vud2lraXNvdXJjZSc6ICdlbi53aWtpc291cmNlLm9yZycsXG4gICdlbndpa2l2ZXJzaXR5JzogJ2VuLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdlbndpa2l2b3lhZ2UnOiAnZW4ud2lraXZveWFnZS5vcmcnLFxuICAnZW93aWtpJzogJ2VvLndpa2lwZWRpYS5vcmcnLFxuICAnZW93aWt0aW9uYXJ5JzogJ2VvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vvd2lraWJvb2tzJzogJ2VvLndpa2lib29rcy5vcmcnLFxuICAnZW93aWtpbmV3cyc6ICdlby53aWtpbmV3cy5vcmcnLFxuICAnZW93aWtpcXVvdGUnOiAnZW8ud2lraXF1b3RlLm9yZycsXG4gICdlb3dpa2lzb3VyY2UnOiAnZW8ud2lraXNvdXJjZS5vcmcnLFxuICAnZXN3aWtpJzogJ2VzLndpa2lwZWRpYS5vcmcnLFxuICAnZXN3aWt0aW9uYXJ5JzogJ2VzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vzd2lraWJvb2tzJzogJ2VzLndpa2lib29rcy5vcmcnLFxuICAnZXN3aWtpbmV3cyc6ICdlcy53aWtpbmV3cy5vcmcnLFxuICAnZXN3aWtpcXVvdGUnOiAnZXMud2lraXF1b3RlLm9yZycsXG4gICdlc3dpa2lzb3VyY2UnOiAnZXMud2lraXNvdXJjZS5vcmcnLFxuICAnZXN3aWtpdmVyc2l0eSc6ICdlcy53aWtpdmVyc2l0eS5vcmcnLFxuICAnZXN3aWtpdm95YWdlJzogJ2VzLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2V0d2lraSc6ICdldC53aWtpcGVkaWEub3JnJyxcbiAgJ2V0d2lrdGlvbmFyeSc6ICdldC53aWt0aW9uYXJ5Lm9yZycsXG4gICdldHdpa2lib29rcyc6ICdldC53aWtpYm9va3Mub3JnJyxcbiAgJ2V0d2lraXF1b3RlJzogJ2V0Lndpa2lxdW90ZS5vcmcnLFxuICAnZXR3aWtpc291cmNlJzogJ2V0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2V1d2lraSc6ICdldS53aWtpcGVkaWEub3JnJyxcbiAgJ2V1d2lrdGlvbmFyeSc6ICdldS53aWt0aW9uYXJ5Lm9yZycsXG4gICdldXdpa2lib29rcyc6ICdldS53aWtpYm9va3Mub3JnJyxcbiAgJ2V1d2lraXF1b3RlJzogJ2V1Lndpa2lxdW90ZS5vcmcnLFxuICAnZXh0d2lraSc6ICdleHQud2lraXBlZGlhLm9yZycsXG4gICdmYXdpa2knOiAnZmEud2lraXBlZGlhLm9yZycsXG4gICdmYXdpa3Rpb25hcnknOiAnZmEud2lrdGlvbmFyeS5vcmcnLFxuICAnZmF3aWtpYm9va3MnOiAnZmEud2lraWJvb2tzLm9yZycsXG4gICdmYXdpa2luZXdzJzogJ2ZhLndpa2luZXdzLm9yZycsXG4gICdmYXdpa2lxdW90ZSc6ICdmYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Zhd2lraXNvdXJjZSc6ICdmYS53aWtpc291cmNlLm9yZycsXG4gICdmYXdpa2l2b3lhZ2UnOiAnZmEud2lraXZveWFnZS5vcmcnLFxuICAnZmZ3aWtpJzogJ2ZmLndpa2lwZWRpYS5vcmcnLFxuICAnZml3aWtpJzogJ2ZpLndpa2lwZWRpYS5vcmcnLFxuICAnZml3aWt0aW9uYXJ5JzogJ2ZpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zpd2lraWJvb2tzJzogJ2ZpLndpa2lib29rcy5vcmcnLFxuICAnZml3aWtpbmV3cyc6ICdmaS53aWtpbmV3cy5vcmcnLFxuICAnZml3aWtpcXVvdGUnOiAnZmkud2lraXF1b3RlLm9yZycsXG4gICdmaXdpa2lzb3VyY2UnOiAnZmkud2lraXNvdXJjZS5vcmcnLFxuICAnZml3aWtpdmVyc2l0eSc6ICdmaS53aWtpdmVyc2l0eS5vcmcnLFxuICAnZml1X3Zyb3dpa2knOiAnZml1LXZyby53aWtpcGVkaWEub3JnJyxcbiAgJ2Zqd2lraSc6ICdmai53aWtpcGVkaWEub3JnJyxcbiAgJ2Zqd2lrdGlvbmFyeSc6ICdmai53aWt0aW9uYXJ5Lm9yZycsXG4gICdmb3dpa2knOiAnZm8ud2lraXBlZGlhLm9yZycsXG4gICdmb3dpa3Rpb25hcnknOiAnZm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnZm93aWtpc291cmNlJzogJ2ZvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zyd2lraSc6ICdmci53aWtpcGVkaWEub3JnJyxcbiAgJ2Zyd2lrdGlvbmFyeSc6ICdmci53aWt0aW9uYXJ5Lm9yZycsXG4gICdmcndpa2lib29rcyc6ICdmci53aWtpYm9va3Mub3JnJyxcbiAgJ2Zyd2lraW5ld3MnOiAnZnIud2lraW5ld3Mub3JnJyxcbiAgJ2Zyd2lraXF1b3RlJzogJ2ZyLndpa2lxdW90ZS5vcmcnLFxuICAnZnJ3aWtpc291cmNlJzogJ2ZyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zyd2lraXZlcnNpdHknOiAnZnIud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Zyd2lraXZveWFnZSc6ICdmci53aWtpdm95YWdlLm9yZycsXG4gICdmcnB3aWtpJzogJ2ZycC53aWtpcGVkaWEub3JnJyxcbiAgJ2Zycndpa2knOiAnZnJyLndpa2lwZWRpYS5vcmcnLFxuICAnZnVyd2lraSc6ICdmdXIud2lraXBlZGlhLm9yZycsXG4gICdmeXdpa2knOiAnZnkud2lraXBlZGlhLm9yZycsXG4gICdmeXdpa3Rpb25hcnknOiAnZnkud2lrdGlvbmFyeS5vcmcnLFxuICAnZnl3aWtpYm9va3MnOiAnZnkud2lraWJvb2tzLm9yZycsXG4gICdnYXdpa2knOiAnZ2Eud2lraXBlZGlhLm9yZycsXG4gICdnYXdpa3Rpb25hcnknOiAnZ2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2F3aWtpYm9va3MnOiAnZ2Eud2lraWJvb2tzLm9yZycsXG4gICdnYXdpa2lxdW90ZSc6ICdnYS53aWtpcXVvdGUub3JnJyxcbiAgJ2dhZ3dpa2knOiAnZ2FnLndpa2lwZWRpYS5vcmcnLFxuICAnZ2Fud2lraSc6ICdnYW4ud2lraXBlZGlhLm9yZycsXG4gICdnZHdpa2knOiAnZ2Qud2lraXBlZGlhLm9yZycsXG4gICdnZHdpa3Rpb25hcnknOiAnZ2Qud2lrdGlvbmFyeS5vcmcnLFxuICAnZ2x3aWtpJzogJ2dsLndpa2lwZWRpYS5vcmcnLFxuICAnZ2x3aWt0aW9uYXJ5JzogJ2dsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dsd2lraWJvb2tzJzogJ2dsLndpa2lib29rcy5vcmcnLFxuICAnZ2x3aWtpcXVvdGUnOiAnZ2wud2lraXF1b3RlLm9yZycsXG4gICdnbHdpa2lzb3VyY2UnOiAnZ2wud2lraXNvdXJjZS5vcmcnLFxuICAnZ2xrd2lraSc6ICdnbGsud2lraXBlZGlhLm9yZycsXG4gICdnbndpa2knOiAnZ24ud2lraXBlZGlhLm9yZycsXG4gICdnbndpa3Rpb25hcnknOiAnZ24ud2lrdGlvbmFyeS5vcmcnLFxuICAnZ253aWtpYm9va3MnOiAnZ24ud2lraWJvb2tzLm9yZycsXG4gICdnb213aWtpJzogJ2dvbS53aWtpcGVkaWEub3JnJyxcbiAgJ2dvdHdpa2knOiAnZ290Lndpa2lwZWRpYS5vcmcnLFxuICAnZ290d2lraWJvb2tzJzogJ2dvdC53aWtpYm9va3Mub3JnJyxcbiAgJ2d1d2lraSc6ICdndS53aWtpcGVkaWEub3JnJyxcbiAgJ2d1d2lrdGlvbmFyeSc6ICdndS53aWt0aW9uYXJ5Lm9yZycsXG4gICdndXdpa2lib29rcyc6ICdndS53aWtpYm9va3Mub3JnJyxcbiAgJ2d1d2lraXF1b3RlJzogJ2d1Lndpa2lxdW90ZS5vcmcnLFxuICAnZ3V3aWtpc291cmNlJzogJ2d1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2d2d2lraSc6ICdndi53aWtpcGVkaWEub3JnJyxcbiAgJ2d2d2lrdGlvbmFyeSc6ICdndi53aWt0aW9uYXJ5Lm9yZycsXG4gICdoYXdpa2knOiAnaGEud2lraXBlZGlhLm9yZycsXG4gICdoYXdpa3Rpb25hcnknOiAnaGEud2lrdGlvbmFyeS5vcmcnLFxuICAnaGFrd2lraSc6ICdoYWsud2lraXBlZGlhLm9yZycsXG4gICdoYXd3aWtpJzogJ2hhdy53aWtpcGVkaWEub3JnJyxcbiAgJ2hld2lraSc6ICdoZS53aWtpcGVkaWEub3JnJyxcbiAgJ2hld2lrdGlvbmFyeSc6ICdoZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoZXdpa2lib29rcyc6ICdoZS53aWtpYm9va3Mub3JnJyxcbiAgJ2hld2lraW5ld3MnOiAnaGUud2lraW5ld3Mub3JnJyxcbiAgJ2hld2lraXF1b3RlJzogJ2hlLndpa2lxdW90ZS5vcmcnLFxuICAnaGV3aWtpc291cmNlJzogJ2hlLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2hld2lraXZveWFnZSc6ICdoZS53aWtpdm95YWdlLm9yZycsXG4gICdoaXdpa2knOiAnaGkud2lraXBlZGlhLm9yZycsXG4gICdoaXdpa3Rpb25hcnknOiAnaGkud2lrdGlvbmFyeS5vcmcnLFxuICAnaGl3aWtpYm9va3MnOiAnaGkud2lraWJvb2tzLm9yZycsXG4gICdoaXdpa2lxdW90ZSc6ICdoaS53aWtpcXVvdGUub3JnJyxcbiAgJ2hpZndpa2knOiAnaGlmLndpa2lwZWRpYS5vcmcnLFxuICAnaG93aWtpJzogJ2hvLndpa2lwZWRpYS5vcmcnLFxuICAnaHJ3aWtpJzogJ2hyLndpa2lwZWRpYS5vcmcnLFxuICAnaHJ3aWt0aW9uYXJ5JzogJ2hyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hyd2lraWJvb2tzJzogJ2hyLndpa2lib29rcy5vcmcnLFxuICAnaHJ3aWtpcXVvdGUnOiAnaHIud2lraXF1b3RlLm9yZycsXG4gICdocndpa2lzb3VyY2UnOiAnaHIud2lraXNvdXJjZS5vcmcnLFxuICAnaHNid2lraSc6ICdoc2Iud2lraXBlZGlhLm9yZycsXG4gICdoc2J3aWt0aW9uYXJ5JzogJ2hzYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdodHdpa2knOiAnaHQud2lraXBlZGlhLm9yZycsXG4gICdodHdpa2lzb3VyY2UnOiAnaHQud2lraXNvdXJjZS5vcmcnLFxuICAnaHV3aWtpJzogJ2h1Lndpa2lwZWRpYS5vcmcnLFxuICAnaHV3aWt0aW9uYXJ5JzogJ2h1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2h1d2lraWJvb2tzJzogJ2h1Lndpa2lib29rcy5vcmcnLFxuICAnaHV3aWtpbmV3cyc6ICdodS53aWtpbmV3cy5vcmcnLFxuICAnaHV3aWtpcXVvdGUnOiAnaHUud2lraXF1b3RlLm9yZycsXG4gICdodXdpa2lzb3VyY2UnOiAnaHUud2lraXNvdXJjZS5vcmcnLFxuICAnaHl3aWtpJzogJ2h5Lndpa2lwZWRpYS5vcmcnLFxuICAnaHl3aWt0aW9uYXJ5JzogJ2h5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2h5d2lraWJvb2tzJzogJ2h5Lndpa2lib29rcy5vcmcnLFxuICAnaHl3aWtpcXVvdGUnOiAnaHkud2lraXF1b3RlLm9yZycsXG4gICdoeXdpa2lzb3VyY2UnOiAnaHkud2lraXNvdXJjZS5vcmcnLFxuICAnaHp3aWtpJzogJ2h6Lndpa2lwZWRpYS5vcmcnLFxuICAnaWF3aWtpJzogJ2lhLndpa2lwZWRpYS5vcmcnLFxuICAnaWF3aWt0aW9uYXJ5JzogJ2lhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lhd2lraWJvb2tzJzogJ2lhLndpa2lib29rcy5vcmcnLFxuICAnaWR3aWtpJzogJ2lkLndpa2lwZWRpYS5vcmcnLFxuICAnaWR3aWt0aW9uYXJ5JzogJ2lkLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lkd2lraWJvb2tzJzogJ2lkLndpa2lib29rcy5vcmcnLFxuICAnaWR3aWtpcXVvdGUnOiAnaWQud2lraXF1b3RlLm9yZycsXG4gICdpZHdpa2lzb3VyY2UnOiAnaWQud2lraXNvdXJjZS5vcmcnLFxuICAnaWV3aWtpJzogJ2llLndpa2lwZWRpYS5vcmcnLFxuICAnaWV3aWt0aW9uYXJ5JzogJ2llLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lld2lraWJvb2tzJzogJ2llLndpa2lib29rcy5vcmcnLFxuICAnaWd3aWtpJzogJ2lnLndpa2lwZWRpYS5vcmcnLFxuICAnaWl3aWtpJzogJ2lpLndpa2lwZWRpYS5vcmcnLFxuICAnaWt3aWtpJzogJ2lrLndpa2lwZWRpYS5vcmcnLFxuICAnaWt3aWt0aW9uYXJ5JzogJ2lrLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lsb3dpa2knOiAnaWxvLndpa2lwZWRpYS5vcmcnLFxuICAnaW93aWtpJzogJ2lvLndpa2lwZWRpYS5vcmcnLFxuICAnaW93aWt0aW9uYXJ5JzogJ2lvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2lzd2lraSc6ICdpcy53aWtpcGVkaWEub3JnJyxcbiAgJ2lzd2lrdGlvbmFyeSc6ICdpcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdpc3dpa2lib29rcyc6ICdpcy53aWtpYm9va3Mub3JnJyxcbiAgJ2lzd2lraXF1b3RlJzogJ2lzLndpa2lxdW90ZS5vcmcnLFxuICAnaXN3aWtpc291cmNlJzogJ2lzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2l0d2lraSc6ICdpdC53aWtpcGVkaWEub3JnJyxcbiAgJ2l0d2lrdGlvbmFyeSc6ICdpdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdpdHdpa2lib29rcyc6ICdpdC53aWtpYm9va3Mub3JnJyxcbiAgJ2l0d2lraW5ld3MnOiAnaXQud2lraW5ld3Mub3JnJyxcbiAgJ2l0d2lraXF1b3RlJzogJ2l0Lndpa2lxdW90ZS5vcmcnLFxuICAnaXR3aWtpc291cmNlJzogJ2l0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2l0d2lraXZlcnNpdHknOiAnaXQud2lraXZlcnNpdHkub3JnJyxcbiAgJ2l0d2lraXZveWFnZSc6ICdpdC53aWtpdm95YWdlLm9yZycsXG4gICdpdXdpa2knOiAnaXUud2lraXBlZGlhLm9yZycsXG4gICdpdXdpa3Rpb25hcnknOiAnaXUud2lrdGlvbmFyeS5vcmcnLFxuICAnamF3aWtpJzogJ2phLndpa2lwZWRpYS5vcmcnLFxuICAnamF3aWt0aW9uYXJ5JzogJ2phLndpa3Rpb25hcnkub3JnJyxcbiAgJ2phd2lraWJvb2tzJzogJ2phLndpa2lib29rcy5vcmcnLFxuICAnamF3aWtpbmV3cyc6ICdqYS53aWtpbmV3cy5vcmcnLFxuICAnamF3aWtpcXVvdGUnOiAnamEud2lraXF1b3RlLm9yZycsXG4gICdqYXdpa2lzb3VyY2UnOiAnamEud2lraXNvdXJjZS5vcmcnLFxuICAnamF3aWtpdmVyc2l0eSc6ICdqYS53aWtpdmVyc2l0eS5vcmcnLFxuICAnamJvd2lraSc6ICdqYm8ud2lraXBlZGlhLm9yZycsXG4gICdqYm93aWt0aW9uYXJ5JzogJ2piby53aWt0aW9uYXJ5Lm9yZycsXG4gICdqdndpa2knOiAnanYud2lraXBlZGlhLm9yZycsXG4gICdqdndpa3Rpb25hcnknOiAnanYud2lrdGlvbmFyeS5vcmcnLFxuICAna2F3aWtpJzogJ2thLndpa2lwZWRpYS5vcmcnLFxuICAna2F3aWt0aW9uYXJ5JzogJ2thLndpa3Rpb25hcnkub3JnJyxcbiAgJ2thd2lraWJvb2tzJzogJ2thLndpa2lib29rcy5vcmcnLFxuICAna2F3aWtpcXVvdGUnOiAna2Eud2lraXF1b3RlLm9yZycsXG4gICdrYWF3aWtpJzogJ2thYS53aWtpcGVkaWEub3JnJyxcbiAgJ2thYndpa2knOiAna2FiLndpa2lwZWRpYS5vcmcnLFxuICAna2Jkd2lraSc6ICdrYmQud2lraXBlZGlhLm9yZycsXG4gICdrZ3dpa2knOiAna2cud2lraXBlZGlhLm9yZycsXG4gICdraXdpa2knOiAna2kud2lraXBlZGlhLm9yZycsXG4gICdrandpa2knOiAna2oud2lraXBlZGlhLm9yZycsXG4gICdra3dpa2knOiAna2sud2lraXBlZGlhLm9yZycsXG4gICdra3dpa3Rpb25hcnknOiAna2sud2lrdGlvbmFyeS5vcmcnLFxuICAna2t3aWtpYm9va3MnOiAna2sud2lraWJvb2tzLm9yZycsXG4gICdra3dpa2lxdW90ZSc6ICdray53aWtpcXVvdGUub3JnJyxcbiAgJ2tsd2lraSc6ICdrbC53aWtpcGVkaWEub3JnJyxcbiAgJ2tsd2lrdGlvbmFyeSc6ICdrbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdrbXdpa2knOiAna20ud2lraXBlZGlhLm9yZycsXG4gICdrbXdpa3Rpb25hcnknOiAna20ud2lrdGlvbmFyeS5vcmcnLFxuICAna213aWtpYm9va3MnOiAna20ud2lraWJvb2tzLm9yZycsXG4gICdrbndpa2knOiAna24ud2lraXBlZGlhLm9yZycsXG4gICdrbndpa3Rpb25hcnknOiAna24ud2lrdGlvbmFyeS5vcmcnLFxuICAna253aWtpYm9va3MnOiAna24ud2lraWJvb2tzLm9yZycsXG4gICdrbndpa2lxdW90ZSc6ICdrbi53aWtpcXVvdGUub3JnJyxcbiAgJ2tud2lraXNvdXJjZSc6ICdrbi53aWtpc291cmNlLm9yZycsXG4gICdrb3dpa2knOiAna28ud2lraXBlZGlhLm9yZycsXG4gICdrb3dpa3Rpb25hcnknOiAna28ud2lrdGlvbmFyeS5vcmcnLFxuICAna293aWtpYm9va3MnOiAna28ud2lraWJvb2tzLm9yZycsXG4gICdrb3dpa2luZXdzJzogJ2tvLndpa2luZXdzLm9yZycsXG4gICdrb3dpa2lxdW90ZSc6ICdrby53aWtpcXVvdGUub3JnJyxcbiAgJ2tvd2lraXNvdXJjZSc6ICdrby53aWtpc291cmNlLm9yZycsXG4gICdrb3dpa2l2ZXJzaXR5JzogJ2tvLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdrb2l3aWtpJzogJ2tvaS53aWtpcGVkaWEub3JnJyxcbiAgJ2tyd2lraSc6ICdrci53aWtpcGVkaWEub3JnJyxcbiAgJ2tyd2lraXF1b3RlJzogJ2tyLndpa2lxdW90ZS5vcmcnLFxuICAna3Jjd2lraSc6ICdrcmMud2lraXBlZGlhLm9yZycsXG4gICdrc3dpa2knOiAna3Mud2lraXBlZGlhLm9yZycsXG4gICdrc3dpa3Rpb25hcnknOiAna3Mud2lrdGlvbmFyeS5vcmcnLFxuICAna3N3aWtpYm9va3MnOiAna3Mud2lraWJvb2tzLm9yZycsXG4gICdrc3dpa2lxdW90ZSc6ICdrcy53aWtpcXVvdGUub3JnJyxcbiAgJ2tzaHdpa2knOiAna3NoLndpa2lwZWRpYS5vcmcnLFxuICAna3V3aWtpJzogJ2t1Lndpa2lwZWRpYS5vcmcnLFxuICAna3V3aWt0aW9uYXJ5JzogJ2t1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t1d2lraWJvb2tzJzogJ2t1Lndpa2lib29rcy5vcmcnLFxuICAna3V3aWtpcXVvdGUnOiAna3Uud2lraXF1b3RlLm9yZycsXG4gICdrdndpa2knOiAna3Yud2lraXBlZGlhLm9yZycsXG4gICdrd3dpa2knOiAna3cud2lraXBlZGlhLm9yZycsXG4gICdrd3dpa3Rpb25hcnknOiAna3cud2lrdGlvbmFyeS5vcmcnLFxuICAna3d3aWtpcXVvdGUnOiAna3cud2lraXF1b3RlLm9yZycsXG4gICdreXdpa2knOiAna3kud2lraXBlZGlhLm9yZycsXG4gICdreXdpa3Rpb25hcnknOiAna3kud2lrdGlvbmFyeS5vcmcnLFxuICAna3l3aWtpYm9va3MnOiAna3kud2lraWJvb2tzLm9yZycsXG4gICdreXdpa2lxdW90ZSc6ICdreS53aWtpcXVvdGUub3JnJyxcbiAgJ2xhd2lraSc6ICdsYS53aWtpcGVkaWEub3JnJyxcbiAgJ2xhd2lrdGlvbmFyeSc6ICdsYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdsYXdpa2lib29rcyc6ICdsYS53aWtpYm9va3Mub3JnJyxcbiAgJ2xhd2lraXF1b3RlJzogJ2xhLndpa2lxdW90ZS5vcmcnLFxuICAnbGF3aWtpc291cmNlJzogJ2xhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2xhZHdpa2knOiAnbGFkLndpa2lwZWRpYS5vcmcnLFxuICAnbGJ3aWtpJzogJ2xiLndpa2lwZWRpYS5vcmcnLFxuICAnbGJ3aWt0aW9uYXJ5JzogJ2xiLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xid2lraWJvb2tzJzogJ2xiLndpa2lib29rcy5vcmcnLFxuICAnbGJ3aWtpcXVvdGUnOiAnbGIud2lraXF1b3RlLm9yZycsXG4gICdsYmV3aWtpJzogJ2xiZS53aWtpcGVkaWEub3JnJyxcbiAgJ2xlendpa2knOiAnbGV6Lndpa2lwZWRpYS5vcmcnLFxuICAnbGd3aWtpJzogJ2xnLndpa2lwZWRpYS5vcmcnLFxuICAnbGl3aWtpJzogJ2xpLndpa2lwZWRpYS5vcmcnLFxuICAnbGl3aWt0aW9uYXJ5JzogJ2xpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2xpd2lraWJvb2tzJzogJ2xpLndpa2lib29rcy5vcmcnLFxuICAnbGl3aWtpcXVvdGUnOiAnbGkud2lraXF1b3RlLm9yZycsXG4gICdsaXdpa2lzb3VyY2UnOiAnbGkud2lraXNvdXJjZS5vcmcnLFxuICAnbGlqd2lraSc6ICdsaWoud2lraXBlZGlhLm9yZycsXG4gICdsbW93aWtpJzogJ2xtby53aWtpcGVkaWEub3JnJyxcbiAgJ2xud2lraSc6ICdsbi53aWtpcGVkaWEub3JnJyxcbiAgJ2xud2lrdGlvbmFyeSc6ICdsbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsbndpa2lib29rcyc6ICdsbi53aWtpYm9va3Mub3JnJyxcbiAgJ2xvd2lraSc6ICdsby53aWtpcGVkaWEub3JnJyxcbiAgJ2xvd2lrdGlvbmFyeSc6ICdsby53aWt0aW9uYXJ5Lm9yZycsXG4gICdscmN3aWtpJzogJ2xyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2x0d2lraSc6ICdsdC53aWtpcGVkaWEub3JnJyxcbiAgJ2x0d2lrdGlvbmFyeSc6ICdsdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdsdHdpa2lib29rcyc6ICdsdC53aWtpYm9va3Mub3JnJyxcbiAgJ2x0d2lraXF1b3RlJzogJ2x0Lndpa2lxdW90ZS5vcmcnLFxuICAnbHR3aWtpc291cmNlJzogJ2x0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2x0Z3dpa2knOiAnbHRnLndpa2lwZWRpYS5vcmcnLFxuICAnbHZ3aWtpJzogJ2x2Lndpa2lwZWRpYS5vcmcnLFxuICAnbHZ3aWt0aW9uYXJ5JzogJ2x2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2x2d2lraWJvb2tzJzogJ2x2Lndpa2lib29rcy5vcmcnLFxuICAnbWFpd2lraSc6ICdtYWkud2lraXBlZGlhLm9yZycsXG4gICdtYXBfYm1zd2lraSc6ICdtYXAtYm1zLndpa2lwZWRpYS5vcmcnLFxuICAnbWRmd2lraSc6ICdtZGYud2lraXBlZGlhLm9yZycsXG4gICdtZ3dpa2knOiAnbWcud2lraXBlZGlhLm9yZycsXG4gICdtZ3dpa3Rpb25hcnknOiAnbWcud2lrdGlvbmFyeS5vcmcnLFxuICAnbWd3aWtpYm9va3MnOiAnbWcud2lraWJvb2tzLm9yZycsXG4gICdtaHdpa2knOiAnbWgud2lraXBlZGlhLm9yZycsXG4gICdtaHdpa3Rpb25hcnknOiAnbWgud2lrdGlvbmFyeS5vcmcnLFxuICAnbWhyd2lraSc6ICdtaHIud2lraXBlZGlhLm9yZycsXG4gICdtaXdpa2knOiAnbWkud2lraXBlZGlhLm9yZycsXG4gICdtaXdpa3Rpb25hcnknOiAnbWkud2lrdGlvbmFyeS5vcmcnLFxuICAnbWl3aWtpYm9va3MnOiAnbWkud2lraWJvb2tzLm9yZycsXG4gICdtaW53aWtpJzogJ21pbi53aWtpcGVkaWEub3JnJyxcbiAgJ21rd2lraSc6ICdtay53aWtpcGVkaWEub3JnJyxcbiAgJ21rd2lrdGlvbmFyeSc6ICdtay53aWt0aW9uYXJ5Lm9yZycsXG4gICdta3dpa2lib29rcyc6ICdtay53aWtpYm9va3Mub3JnJyxcbiAgJ21rd2lraXNvdXJjZSc6ICdtay53aWtpc291cmNlLm9yZycsXG4gICdtbHdpa2knOiAnbWwud2lraXBlZGlhLm9yZycsXG4gICdtbHdpa3Rpb25hcnknOiAnbWwud2lrdGlvbmFyeS5vcmcnLFxuICAnbWx3aWtpYm9va3MnOiAnbWwud2lraWJvb2tzLm9yZycsXG4gICdtbHdpa2lxdW90ZSc6ICdtbC53aWtpcXVvdGUub3JnJyxcbiAgJ21sd2lraXNvdXJjZSc6ICdtbC53aWtpc291cmNlLm9yZycsXG4gICdtbndpa2knOiAnbW4ud2lraXBlZGlhLm9yZycsXG4gICdtbndpa3Rpb25hcnknOiAnbW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbW53aWtpYm9va3MnOiAnbW4ud2lraWJvb2tzLm9yZycsXG4gICdtb3dpa2knOiAnbW8ud2lraXBlZGlhLm9yZycsXG4gICdtb3dpa3Rpb25hcnknOiAnbW8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbXJ3aWtpJzogJ21yLndpa2lwZWRpYS5vcmcnLFxuICAnbXJ3aWt0aW9uYXJ5JzogJ21yLndpa3Rpb25hcnkub3JnJyxcbiAgJ21yd2lraWJvb2tzJzogJ21yLndpa2lib29rcy5vcmcnLFxuICAnbXJ3aWtpcXVvdGUnOiAnbXIud2lraXF1b3RlLm9yZycsXG4gICdtcndpa2lzb3VyY2UnOiAnbXIud2lraXNvdXJjZS5vcmcnLFxuICAnbXJqd2lraSc6ICdtcmoud2lraXBlZGlhLm9yZycsXG4gICdtc3dpa2knOiAnbXMud2lraXBlZGlhLm9yZycsXG4gICdtc3dpa3Rpb25hcnknOiAnbXMud2lrdGlvbmFyeS5vcmcnLFxuICAnbXN3aWtpYm9va3MnOiAnbXMud2lraWJvb2tzLm9yZycsXG4gICdtdHdpa2knOiAnbXQud2lraXBlZGlhLm9yZycsXG4gICdtdHdpa3Rpb25hcnknOiAnbXQud2lrdGlvbmFyeS5vcmcnLFxuICAnbXVzd2lraSc6ICdtdXMud2lraXBlZGlhLm9yZycsXG4gICdtd2x3aWtpJzogJ213bC53aWtpcGVkaWEub3JnJyxcbiAgJ215d2lraSc6ICdteS53aWtpcGVkaWEub3JnJyxcbiAgJ215d2lrdGlvbmFyeSc6ICdteS53aWt0aW9uYXJ5Lm9yZycsXG4gICdteXdpa2lib29rcyc6ICdteS53aWtpYm9va3Mub3JnJyxcbiAgJ215dndpa2knOiAnbXl2Lndpa2lwZWRpYS5vcmcnLFxuICAnbXpud2lraSc6ICdtem4ud2lraXBlZGlhLm9yZycsXG4gICduYXdpa2knOiAnbmEud2lraXBlZGlhLm9yZycsXG4gICduYXdpa3Rpb25hcnknOiAnbmEud2lrdGlvbmFyeS5vcmcnLFxuICAnbmF3aWtpYm9va3MnOiAnbmEud2lraWJvb2tzLm9yZycsXG4gICduYXdpa2lxdW90ZSc6ICduYS53aWtpcXVvdGUub3JnJyxcbiAgJ25haHdpa2knOiAnbmFoLndpa2lwZWRpYS5vcmcnLFxuICAnbmFod2lrdGlvbmFyeSc6ICduYWgud2lrdGlvbmFyeS5vcmcnLFxuICAnbmFod2lraWJvb2tzJzogJ25haC53aWtpYm9va3Mub3JnJyxcbiAgJ25hcHdpa2knOiAnbmFwLndpa2lwZWRpYS5vcmcnLFxuICAnbmRzd2lraSc6ICduZHMud2lraXBlZGlhLm9yZycsXG4gICduZHN3aWt0aW9uYXJ5JzogJ25kcy53aWt0aW9uYXJ5Lm9yZycsXG4gICduZHN3aWtpYm9va3MnOiAnbmRzLndpa2lib29rcy5vcmcnLFxuICAnbmRzd2lraXF1b3RlJzogJ25kcy53aWtpcXVvdGUub3JnJyxcbiAgJ25kc19ubHdpa2knOiAnbmRzLW5sLndpa2lwZWRpYS5vcmcnLFxuICAnbmV3aWtpJzogJ25lLndpa2lwZWRpYS5vcmcnLFxuICAnbmV3aWt0aW9uYXJ5JzogJ25lLndpa3Rpb25hcnkub3JnJyxcbiAgJ25ld2lraWJvb2tzJzogJ25lLndpa2lib29rcy5vcmcnLFxuICAnbmV3d2lraSc6ICduZXcud2lraXBlZGlhLm9yZycsXG4gICduZ3dpa2knOiAnbmcud2lraXBlZGlhLm9yZycsXG4gICdubHdpa2knOiAnbmwud2lraXBlZGlhLm9yZycsXG4gICdubHdpa3Rpb25hcnknOiAnbmwud2lrdGlvbmFyeS5vcmcnLFxuICAnbmx3aWtpYm9va3MnOiAnbmwud2lraWJvb2tzLm9yZycsXG4gICdubHdpa2luZXdzJzogJ25sLndpa2luZXdzLm9yZycsXG4gICdubHdpa2lxdW90ZSc6ICdubC53aWtpcXVvdGUub3JnJyxcbiAgJ25sd2lraXNvdXJjZSc6ICdubC53aWtpc291cmNlLm9yZycsXG4gICdubHdpa2l2b3lhZ2UnOiAnbmwud2lraXZveWFnZS5vcmcnLFxuICAnbm53aWtpJzogJ25uLndpa2lwZWRpYS5vcmcnLFxuICAnbm53aWt0aW9uYXJ5JzogJ25uLndpa3Rpb25hcnkub3JnJyxcbiAgJ25ud2lraXF1b3RlJzogJ25uLndpa2lxdW90ZS5vcmcnLFxuICAnbm93aWtpJzogJ25vLndpa2lwZWRpYS5vcmcnLFxuICAnbm93aWt0aW9uYXJ5JzogJ25vLndpa3Rpb25hcnkub3JnJyxcbiAgJ25vd2lraWJvb2tzJzogJ25vLndpa2lib29rcy5vcmcnLFxuICAnbm93aWtpbmV3cyc6ICduby53aWtpbmV3cy5vcmcnLFxuICAnbm93aWtpcXVvdGUnOiAnbm8ud2lraXF1b3RlLm9yZycsXG4gICdub3dpa2lzb3VyY2UnOiAnbm8ud2lraXNvdXJjZS5vcmcnLFxuICAnbm92d2lraSc6ICdub3Yud2lraXBlZGlhLm9yZycsXG4gICducm13aWtpJzogJ25ybS53aWtpcGVkaWEub3JnJyxcbiAgJ25zb3dpa2knOiAnbnNvLndpa2lwZWRpYS5vcmcnLFxuICAnbnZ3aWtpJzogJ252Lndpa2lwZWRpYS5vcmcnLFxuICAnbnl3aWtpJzogJ255Lndpa2lwZWRpYS5vcmcnLFxuICAnb2N3aWtpJzogJ29jLndpa2lwZWRpYS5vcmcnLFxuICAnb2N3aWt0aW9uYXJ5JzogJ29jLndpa3Rpb25hcnkub3JnJyxcbiAgJ29jd2lraWJvb2tzJzogJ29jLndpa2lib29rcy5vcmcnLFxuICAnb213aWtpJzogJ29tLndpa2lwZWRpYS5vcmcnLFxuICAnb213aWt0aW9uYXJ5JzogJ29tLndpa3Rpb25hcnkub3JnJyxcbiAgJ29yd2lraSc6ICdvci53aWtpcGVkaWEub3JnJyxcbiAgJ29yd2lrdGlvbmFyeSc6ICdvci53aWt0aW9uYXJ5Lm9yZycsXG4gICdvcndpa2lzb3VyY2UnOiAnb3Iud2lraXNvdXJjZS5vcmcnLFxuICAnb3N3aWtpJzogJ29zLndpa2lwZWRpYS5vcmcnLFxuICAncGF3aWtpJzogJ3BhLndpa2lwZWRpYS5vcmcnLFxuICAncGF3aWt0aW9uYXJ5JzogJ3BhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bhd2lraWJvb2tzJzogJ3BhLndpa2lib29rcy5vcmcnLFxuICAncGFnd2lraSc6ICdwYWcud2lraXBlZGlhLm9yZycsXG4gICdwYW13aWtpJzogJ3BhbS53aWtpcGVkaWEub3JnJyxcbiAgJ3BhcHdpa2knOiAncGFwLndpa2lwZWRpYS5vcmcnLFxuICAncGNkd2lraSc6ICdwY2Qud2lraXBlZGlhLm9yZycsXG4gICdwZGN3aWtpJzogJ3BkYy53aWtpcGVkaWEub3JnJyxcbiAgJ3BmbHdpa2knOiAncGZsLndpa2lwZWRpYS5vcmcnLFxuICAncGl3aWtpJzogJ3BpLndpa2lwZWRpYS5vcmcnLFxuICAncGl3aWt0aW9uYXJ5JzogJ3BpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3BpaHdpa2knOiAncGloLndpa2lwZWRpYS5vcmcnLFxuICAncGx3aWtpJzogJ3BsLndpa2lwZWRpYS5vcmcnLFxuICAncGx3aWt0aW9uYXJ5JzogJ3BsLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Bsd2lraWJvb2tzJzogJ3BsLndpa2lib29rcy5vcmcnLFxuICAncGx3aWtpbmV3cyc6ICdwbC53aWtpbmV3cy5vcmcnLFxuICAncGx3aWtpcXVvdGUnOiAncGwud2lraXF1b3RlLm9yZycsXG4gICdwbHdpa2lzb3VyY2UnOiAncGwud2lraXNvdXJjZS5vcmcnLFxuICAncGx3aWtpdm95YWdlJzogJ3BsLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Btc3dpa2knOiAncG1zLndpa2lwZWRpYS5vcmcnLFxuICAncG5id2lraSc6ICdwbmIud2lraXBlZGlhLm9yZycsXG4gICdwbmJ3aWt0aW9uYXJ5JzogJ3BuYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdwbnR3aWtpJzogJ3BudC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bzd2lraSc6ICdwcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Bzd2lrdGlvbmFyeSc6ICdwcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdwc3dpa2lib29rcyc6ICdwcy53aWtpYm9va3Mub3JnJyxcbiAgJ3B0d2lraSc6ICdwdC53aWtpcGVkaWEub3JnJyxcbiAgJ3B0d2lrdGlvbmFyeSc6ICdwdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdwdHdpa2lib29rcyc6ICdwdC53aWtpYm9va3Mub3JnJyxcbiAgJ3B0d2lraW5ld3MnOiAncHQud2lraW5ld3Mub3JnJyxcbiAgJ3B0d2lraXF1b3RlJzogJ3B0Lndpa2lxdW90ZS5vcmcnLFxuICAncHR3aWtpc291cmNlJzogJ3B0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ3B0d2lraXZlcnNpdHknOiAncHQud2lraXZlcnNpdHkub3JnJyxcbiAgJ3B0d2lraXZveWFnZSc6ICdwdC53aWtpdm95YWdlLm9yZycsXG4gICdxdXdpa2knOiAncXUud2lraXBlZGlhLm9yZycsXG4gICdxdXdpa3Rpb25hcnknOiAncXUud2lrdGlvbmFyeS5vcmcnLFxuICAncXV3aWtpYm9va3MnOiAncXUud2lraWJvb2tzLm9yZycsXG4gICdxdXdpa2lxdW90ZSc6ICdxdS53aWtpcXVvdGUub3JnJyxcbiAgJ3Jtd2lraSc6ICdybS53aWtpcGVkaWEub3JnJyxcbiAgJ3Jtd2lrdGlvbmFyeSc6ICdybS53aWt0aW9uYXJ5Lm9yZycsXG4gICdybXdpa2lib29rcyc6ICdybS53aWtpYm9va3Mub3JnJyxcbiAgJ3JteXdpa2knOiAncm15Lndpa2lwZWRpYS5vcmcnLFxuICAncm53aWtpJzogJ3JuLndpa2lwZWRpYS5vcmcnLFxuICAncm53aWt0aW9uYXJ5JzogJ3JuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Jvd2lraSc6ICdyby53aWtpcGVkaWEub3JnJyxcbiAgJ3Jvd2lrdGlvbmFyeSc6ICdyby53aWt0aW9uYXJ5Lm9yZycsXG4gICdyb3dpa2lib29rcyc6ICdyby53aWtpYm9va3Mub3JnJyxcbiAgJ3Jvd2lraW5ld3MnOiAncm8ud2lraW5ld3Mub3JnJyxcbiAgJ3Jvd2lraXF1b3RlJzogJ3JvLndpa2lxdW90ZS5vcmcnLFxuICAncm93aWtpc291cmNlJzogJ3JvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Jvd2lraXZveWFnZSc6ICdyby53aWtpdm95YWdlLm9yZycsXG4gICdyb2FfcnVwd2lraSc6ICdyb2EtcnVwLndpa2lwZWRpYS5vcmcnLFxuICAncm9hX3J1cHdpa3Rpb25hcnknOiAncm9hLXJ1cC53aWt0aW9uYXJ5Lm9yZycsXG4gICdyb2FfdGFyYXdpa2knOiAncm9hLXRhcmEud2lraXBlZGlhLm9yZycsXG4gICdydXdpa2knOiAncnUud2lraXBlZGlhLm9yZycsXG4gICdydXdpa3Rpb25hcnknOiAncnUud2lrdGlvbmFyeS5vcmcnLFxuICAncnV3aWtpYm9va3MnOiAncnUud2lraWJvb2tzLm9yZycsXG4gICdydXdpa2luZXdzJzogJ3J1Lndpa2luZXdzLm9yZycsXG4gICdydXdpa2lxdW90ZSc6ICdydS53aWtpcXVvdGUub3JnJyxcbiAgJ3J1d2lraXNvdXJjZSc6ICdydS53aWtpc291cmNlLm9yZycsXG4gICdydXdpa2l2ZXJzaXR5JzogJ3J1Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdydXdpa2l2b3lhZ2UnOiAncnUud2lraXZveWFnZS5vcmcnLFxuICAncnVld2lraSc6ICdydWUud2lraXBlZGlhLm9yZycsXG4gICdyd3dpa2knOiAncncud2lraXBlZGlhLm9yZycsXG4gICdyd3dpa3Rpb25hcnknOiAncncud2lrdGlvbmFyeS5vcmcnLFxuICAnc2F3aWtpJzogJ3NhLndpa2lwZWRpYS5vcmcnLFxuICAnc2F3aWt0aW9uYXJ5JzogJ3NhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nhd2lraWJvb2tzJzogJ3NhLndpa2lib29rcy5vcmcnLFxuICAnc2F3aWtpcXVvdGUnOiAnc2Eud2lraXF1b3RlLm9yZycsXG4gICdzYXdpa2lzb3VyY2UnOiAnc2Eud2lraXNvdXJjZS5vcmcnLFxuICAnc2Fod2lraSc6ICdzYWgud2lraXBlZGlhLm9yZycsXG4gICdzYWh3aWtpc291cmNlJzogJ3NhaC53aWtpc291cmNlLm9yZycsXG4gICdzY3dpa2knOiAnc2Mud2lraXBlZGlhLm9yZycsXG4gICdzY3dpa3Rpb25hcnknOiAnc2Mud2lrdGlvbmFyeS5vcmcnLFxuICAnc2Nud2lraSc6ICdzY24ud2lraXBlZGlhLm9yZycsXG4gICdzY253aWt0aW9uYXJ5JzogJ3Njbi53aWt0aW9uYXJ5Lm9yZycsXG4gICdzY293aWtpJzogJ3Njby53aWtpcGVkaWEub3JnJyxcbiAgJ3Nkd2lraSc6ICdzZC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nkd2lrdGlvbmFyeSc6ICdzZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzZHdpa2luZXdzJzogJ3NkLndpa2luZXdzLm9yZycsXG4gICdzZXdpa2knOiAnc2Uud2lraXBlZGlhLm9yZycsXG4gICdzZXdpa2lib29rcyc6ICdzZS53aWtpYm9va3Mub3JnJyxcbiAgJ3Nnd2lraSc6ICdzZy53aWtpcGVkaWEub3JnJyxcbiAgJ3Nnd2lrdGlvbmFyeSc6ICdzZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaHdpa2knOiAnc2gud2lraXBlZGlhLm9yZycsXG4gICdzaHdpa3Rpb25hcnknOiAnc2gud2lrdGlvbmFyeS5vcmcnLFxuICAnc2l3aWtpJzogJ3NpLndpa2lwZWRpYS5vcmcnLFxuICAnc2l3aWt0aW9uYXJ5JzogJ3NpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Npd2lraWJvb2tzJzogJ3NpLndpa2lib29rcy5vcmcnLFxuICAnc2ltcGxld2lraSc6ICdzaW1wbGUud2lraXBlZGlhLm9yZycsXG4gICdzaW1wbGV3aWt0aW9uYXJ5JzogJ3NpbXBsZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaW1wbGV3aWtpYm9va3MnOiAnc2ltcGxlLndpa2lib29rcy5vcmcnLFxuICAnc2ltcGxld2lraXF1b3RlJzogJ3NpbXBsZS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nrd2lraSc6ICdzay53aWtpcGVkaWEub3JnJyxcbiAgJ3Nrd2lrdGlvbmFyeSc6ICdzay53aWt0aW9uYXJ5Lm9yZycsXG4gICdza3dpa2lib29rcyc6ICdzay53aWtpYm9va3Mub3JnJyxcbiAgJ3Nrd2lraXF1b3RlJzogJ3NrLndpa2lxdW90ZS5vcmcnLFxuICAnc2t3aWtpc291cmNlJzogJ3NrLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Nsd2lraSc6ICdzbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Nsd2lrdGlvbmFyeSc6ICdzbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzbHdpa2lib29rcyc6ICdzbC53aWtpYm9va3Mub3JnJyxcbiAgJ3Nsd2lraXF1b3RlJzogJ3NsLndpa2lxdW90ZS5vcmcnLFxuICAnc2x3aWtpc291cmNlJzogJ3NsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Nsd2lraXZlcnNpdHknOiAnc2wud2lraXZlcnNpdHkub3JnJyxcbiAgJ3Ntd2lraSc6ICdzbS53aWtpcGVkaWEub3JnJyxcbiAgJ3Ntd2lrdGlvbmFyeSc6ICdzbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzbndpa2knOiAnc24ud2lraXBlZGlhLm9yZycsXG4gICdzbndpa3Rpb25hcnknOiAnc24ud2lrdGlvbmFyeS5vcmcnLFxuICAnc293aWtpJzogJ3NvLndpa2lwZWRpYS5vcmcnLFxuICAnc293aWt0aW9uYXJ5JzogJ3NvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nxd2lraSc6ICdzcS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nxd2lrdGlvbmFyeSc6ICdzcS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcXdpa2lib29rcyc6ICdzcS53aWtpYm9va3Mub3JnJyxcbiAgJ3Nxd2lraW5ld3MnOiAnc3Eud2lraW5ld3Mub3JnJyxcbiAgJ3Nxd2lraXF1b3RlJzogJ3NxLndpa2lxdW90ZS5vcmcnLFxuICAnc3J3aWtpJzogJ3NyLndpa2lwZWRpYS5vcmcnLFxuICAnc3J3aWt0aW9uYXJ5JzogJ3NyLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nyd2lraWJvb2tzJzogJ3NyLndpa2lib29rcy5vcmcnLFxuICAnc3J3aWtpbmV3cyc6ICdzci53aWtpbmV3cy5vcmcnLFxuICAnc3J3aWtpcXVvdGUnOiAnc3Iud2lraXF1b3RlLm9yZycsXG4gICdzcndpa2lzb3VyY2UnOiAnc3Iud2lraXNvdXJjZS5vcmcnLFxuICAnc3Jud2lraSc6ICdzcm4ud2lraXBlZGlhLm9yZycsXG4gICdzc3dpa2knOiAnc3Mud2lraXBlZGlhLm9yZycsXG4gICdzc3dpa3Rpb25hcnknOiAnc3Mud2lrdGlvbmFyeS5vcmcnLFxuICAnc3R3aWtpJzogJ3N0Lndpa2lwZWRpYS5vcmcnLFxuICAnc3R3aWt0aW9uYXJ5JzogJ3N0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N0cXdpa2knOiAnc3RxLndpa2lwZWRpYS5vcmcnLFxuICAnc3V3aWtpJzogJ3N1Lndpa2lwZWRpYS5vcmcnLFxuICAnc3V3aWt0aW9uYXJ5JzogJ3N1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N1d2lraWJvb2tzJzogJ3N1Lndpa2lib29rcy5vcmcnLFxuICAnc3V3aWtpcXVvdGUnOiAnc3Uud2lraXF1b3RlLm9yZycsXG4gICdzdndpa2knOiAnc3Yud2lraXBlZGlhLm9yZycsXG4gICdzdndpa3Rpb25hcnknOiAnc3Yud2lrdGlvbmFyeS5vcmcnLFxuICAnc3Z3aWtpYm9va3MnOiAnc3Yud2lraWJvb2tzLm9yZycsXG4gICdzdndpa2luZXdzJzogJ3N2Lndpa2luZXdzLm9yZycsXG4gICdzdndpa2lxdW90ZSc6ICdzdi53aWtpcXVvdGUub3JnJyxcbiAgJ3N2d2lraXNvdXJjZSc6ICdzdi53aWtpc291cmNlLm9yZycsXG4gICdzdndpa2l2ZXJzaXR5JzogJ3N2Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdzdndpa2l2b3lhZ2UnOiAnc3Yud2lraXZveWFnZS5vcmcnLFxuICAnc3d3aWtpJzogJ3N3Lndpa2lwZWRpYS5vcmcnLFxuICAnc3d3aWt0aW9uYXJ5JzogJ3N3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N3d2lraWJvb2tzJzogJ3N3Lndpa2lib29rcy5vcmcnLFxuICAnc3psd2lraSc6ICdzemwud2lraXBlZGlhLm9yZycsXG4gICd0YXdpa2knOiAndGEud2lraXBlZGlhLm9yZycsXG4gICd0YXdpa3Rpb25hcnknOiAndGEud2lrdGlvbmFyeS5vcmcnLFxuICAndGF3aWtpYm9va3MnOiAndGEud2lraWJvb2tzLm9yZycsXG4gICd0YXdpa2luZXdzJzogJ3RhLndpa2luZXdzLm9yZycsXG4gICd0YXdpa2lxdW90ZSc6ICd0YS53aWtpcXVvdGUub3JnJyxcbiAgJ3Rhd2lraXNvdXJjZSc6ICd0YS53aWtpc291cmNlLm9yZycsXG4gICd0ZXdpa2knOiAndGUud2lraXBlZGlhLm9yZycsXG4gICd0ZXdpa3Rpb25hcnknOiAndGUud2lrdGlvbmFyeS5vcmcnLFxuICAndGV3aWtpYm9va3MnOiAndGUud2lraWJvb2tzLm9yZycsXG4gICd0ZXdpa2lxdW90ZSc6ICd0ZS53aWtpcXVvdGUub3JnJyxcbiAgJ3Rld2lraXNvdXJjZSc6ICd0ZS53aWtpc291cmNlLm9yZycsXG4gICd0ZXR3aWtpJzogJ3RldC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rnd2lraSc6ICd0Zy53aWtpcGVkaWEub3JnJyxcbiAgJ3Rnd2lrdGlvbmFyeSc6ICd0Zy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0Z3dpa2lib29rcyc6ICd0Zy53aWtpYm9va3Mub3JnJyxcbiAgJ3Rod2lraSc6ICd0aC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rod2lrdGlvbmFyeSc6ICd0aC53aWt0aW9uYXJ5Lm9yZycsXG4gICd0aHdpa2lib29rcyc6ICd0aC53aWtpYm9va3Mub3JnJyxcbiAgJ3Rod2lraW5ld3MnOiAndGgud2lraW5ld3Mub3JnJyxcbiAgJ3Rod2lraXF1b3RlJzogJ3RoLndpa2lxdW90ZS5vcmcnLFxuICAndGh3aWtpc291cmNlJzogJ3RoLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Rpd2lraSc6ICd0aS53aWtpcGVkaWEub3JnJyxcbiAgJ3Rpd2lrdGlvbmFyeSc6ICd0aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0a3dpa2knOiAndGsud2lraXBlZGlhLm9yZycsXG4gICd0a3dpa3Rpb25hcnknOiAndGsud2lrdGlvbmFyeS5vcmcnLFxuICAndGt3aWtpYm9va3MnOiAndGsud2lraWJvb2tzLm9yZycsXG4gICd0a3dpa2lxdW90ZSc6ICd0ay53aWtpcXVvdGUub3JnJyxcbiAgJ3Rsd2lraSc6ICd0bC53aWtpcGVkaWEub3JnJyxcbiAgJ3Rsd2lrdGlvbmFyeSc6ICd0bC53aWt0aW9uYXJ5Lm9yZycsXG4gICd0bHdpa2lib29rcyc6ICd0bC53aWtpYm9va3Mub3JnJyxcbiAgJ3Rud2lraSc6ICd0bi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rud2lrdGlvbmFyeSc6ICd0bi53aWt0aW9uYXJ5Lm9yZycsXG4gICd0b3dpa2knOiAndG8ud2lraXBlZGlhLm9yZycsXG4gICd0b3dpa3Rpb25hcnknOiAndG8ud2lrdGlvbmFyeS5vcmcnLFxuICAndHBpd2lraSc6ICd0cGkud2lraXBlZGlhLm9yZycsXG4gICd0cGl3aWt0aW9uYXJ5JzogJ3RwaS53aWt0aW9uYXJ5Lm9yZycsXG4gICd0cndpa2knOiAndHIud2lraXBlZGlhLm9yZycsXG4gICd0cndpa3Rpb25hcnknOiAndHIud2lrdGlvbmFyeS5vcmcnLFxuICAndHJ3aWtpYm9va3MnOiAndHIud2lraWJvb2tzLm9yZycsXG4gICd0cndpa2luZXdzJzogJ3RyLndpa2luZXdzLm9yZycsXG4gICd0cndpa2lxdW90ZSc6ICd0ci53aWtpcXVvdGUub3JnJyxcbiAgJ3Ryd2lraXNvdXJjZSc6ICd0ci53aWtpc291cmNlLm9yZycsXG4gICd0c3dpa2knOiAndHMud2lraXBlZGlhLm9yZycsXG4gICd0c3dpa3Rpb25hcnknOiAndHMud2lrdGlvbmFyeS5vcmcnLFxuICAndHR3aWtpJzogJ3R0Lndpa2lwZWRpYS5vcmcnLFxuICAndHR3aWt0aW9uYXJ5JzogJ3R0Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3R0d2lraWJvb2tzJzogJ3R0Lndpa2lib29rcy5vcmcnLFxuICAndHR3aWtpcXVvdGUnOiAndHQud2lraXF1b3RlLm9yZycsXG4gICd0dW13aWtpJzogJ3R1bS53aWtpcGVkaWEub3JnJyxcbiAgJ3R3d2lraSc6ICd0dy53aWtpcGVkaWEub3JnJyxcbiAgJ3R3d2lrdGlvbmFyeSc6ICd0dy53aWt0aW9uYXJ5Lm9yZycsXG4gICd0eXdpa2knOiAndHkud2lraXBlZGlhLm9yZycsXG4gICd0eXZ3aWtpJzogJ3R5di53aWtpcGVkaWEub3JnJyxcbiAgJ3VkbXdpa2knOiAndWRtLndpa2lwZWRpYS5vcmcnLFxuICAndWd3aWtpJzogJ3VnLndpa2lwZWRpYS5vcmcnLFxuICAndWd3aWt0aW9uYXJ5JzogJ3VnLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Vnd2lraWJvb2tzJzogJ3VnLndpa2lib29rcy5vcmcnLFxuICAndWd3aWtpcXVvdGUnOiAndWcud2lraXF1b3RlLm9yZycsXG4gICd1a3dpa2knOiAndWsud2lraXBlZGlhLm9yZycsXG4gICd1a3dpa3Rpb25hcnknOiAndWsud2lrdGlvbmFyeS5vcmcnLFxuICAndWt3aWtpYm9va3MnOiAndWsud2lraWJvb2tzLm9yZycsXG4gICd1a3dpa2luZXdzJzogJ3VrLndpa2luZXdzLm9yZycsXG4gICd1a3dpa2lxdW90ZSc6ICd1ay53aWtpcXVvdGUub3JnJyxcbiAgJ3Vrd2lraXNvdXJjZSc6ICd1ay53aWtpc291cmNlLm9yZycsXG4gICd1a3dpa2l2b3lhZ2UnOiAndWsud2lraXZveWFnZS5vcmcnLFxuICAndXJ3aWtpJzogJ3VyLndpa2lwZWRpYS5vcmcnLFxuICAndXJ3aWt0aW9uYXJ5JzogJ3VyLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Vyd2lraWJvb2tzJzogJ3VyLndpa2lib29rcy5vcmcnLFxuICAndXJ3aWtpcXVvdGUnOiAndXIud2lraXF1b3RlLm9yZycsXG4gICd1endpa2knOiAndXoud2lraXBlZGlhLm9yZycsXG4gICd1endpa3Rpb25hcnknOiAndXoud2lrdGlvbmFyeS5vcmcnLFxuICAndXp3aWtpYm9va3MnOiAndXoud2lraWJvb2tzLm9yZycsXG4gICd1endpa2lxdW90ZSc6ICd1ei53aWtpcXVvdGUub3JnJyxcbiAgJ3Zld2lraSc6ICd2ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3ZlY3dpa2knOiAndmVjLndpa2lwZWRpYS5vcmcnLFxuICAndmVjd2lrdGlvbmFyeSc6ICd2ZWMud2lrdGlvbmFyeS5vcmcnLFxuICAndmVjd2lraXNvdXJjZSc6ICd2ZWMud2lraXNvdXJjZS5vcmcnLFxuICAndmVwd2lraSc6ICd2ZXAud2lraXBlZGlhLm9yZycsXG4gICd2aXdpa2knOiAndmkud2lraXBlZGlhLm9yZycsXG4gICd2aXdpa3Rpb25hcnknOiAndmkud2lrdGlvbmFyeS5vcmcnLFxuICAndml3aWtpYm9va3MnOiAndmkud2lraWJvb2tzLm9yZycsXG4gICd2aXdpa2lxdW90ZSc6ICd2aS53aWtpcXVvdGUub3JnJyxcbiAgJ3Zpd2lraXNvdXJjZSc6ICd2aS53aWtpc291cmNlLm9yZycsXG4gICd2aXdpa2l2b3lhZ2UnOiAndmkud2lraXZveWFnZS5vcmcnLFxuICAndmxzd2lraSc6ICd2bHMud2lraXBlZGlhLm9yZycsXG4gICd2b3dpa2knOiAndm8ud2lraXBlZGlhLm9yZycsXG4gICd2b3dpa3Rpb25hcnknOiAndm8ud2lrdGlvbmFyeS5vcmcnLFxuICAndm93aWtpYm9va3MnOiAndm8ud2lraWJvb2tzLm9yZycsXG4gICd2b3dpa2lxdW90ZSc6ICd2by53aWtpcXVvdGUub3JnJyxcbiAgJ3dhd2lraSc6ICd3YS53aWtpcGVkaWEub3JnJyxcbiAgJ3dhd2lrdGlvbmFyeSc6ICd3YS53aWt0aW9uYXJ5Lm9yZycsXG4gICd3YXdpa2lib29rcyc6ICd3YS53aWtpYm9va3Mub3JnJyxcbiAgJ3dhcndpa2knOiAnd2FyLndpa2lwZWRpYS5vcmcnLFxuICAnd293aWtpJzogJ3dvLndpa2lwZWRpYS5vcmcnLFxuICAnd293aWt0aW9uYXJ5JzogJ3dvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3dvd2lraXF1b3RlJzogJ3dvLndpa2lxdW90ZS5vcmcnLFxuICAnd3V1d2lraSc6ICd3dXUud2lraXBlZGlhLm9yZycsXG4gICd4YWx3aWtpJzogJ3hhbC53aWtpcGVkaWEub3JnJyxcbiAgJ3hod2lraSc6ICd4aC53aWtpcGVkaWEub3JnJyxcbiAgJ3hod2lrdGlvbmFyeSc6ICd4aC53aWt0aW9uYXJ5Lm9yZycsXG4gICd4aHdpa2lib29rcyc6ICd4aC53aWtpYm9va3Mub3JnJyxcbiAgJ3htZndpa2knOiAneG1mLndpa2lwZWRpYS5vcmcnLFxuICAneWl3aWtpJzogJ3lpLndpa2lwZWRpYS5vcmcnLFxuICAneWl3aWt0aW9uYXJ5JzogJ3lpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3lpd2lraXNvdXJjZSc6ICd5aS53aWtpc291cmNlLm9yZycsXG4gICd5b3dpa2knOiAneW8ud2lraXBlZGlhLm9yZycsXG4gICd5b3dpa3Rpb25hcnknOiAneW8ud2lrdGlvbmFyeS5vcmcnLFxuICAneW93aWtpYm9va3MnOiAneW8ud2lraWJvb2tzLm9yZycsXG4gICd6YXdpa2knOiAnemEud2lraXBlZGlhLm9yZycsXG4gICd6YXdpa3Rpb25hcnknOiAnemEud2lrdGlvbmFyeS5vcmcnLFxuICAnemF3aWtpYm9va3MnOiAnemEud2lraWJvb2tzLm9yZycsXG4gICd6YXdpa2lxdW90ZSc6ICd6YS53aWtpcXVvdGUub3JnJyxcbiAgJ3plYXdpa2knOiAnemVhLndpa2lwZWRpYS5vcmcnLFxuICAnemh3aWtpJzogJ3poLndpa2lwZWRpYS5vcmcnLFxuICAnemh3aWt0aW9uYXJ5JzogJ3poLndpa3Rpb25hcnkub3JnJyxcbiAgJ3pod2lraWJvb2tzJzogJ3poLndpa2lib29rcy5vcmcnLFxuICAnemh3aWtpbmV3cyc6ICd6aC53aWtpbmV3cy5vcmcnLFxuICAnemh3aWtpcXVvdGUnOiAnemgud2lraXF1b3RlLm9yZycsXG4gICd6aHdpa2lzb3VyY2UnOiAnemgud2lraXNvdXJjZS5vcmcnLFxuICAnemh3aWtpdm95YWdlJzogJ3poLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3poX2NsYXNzaWNhbHdpa2knOiAnemgtY2xhc3NpY2FsLndpa2lwZWRpYS5vcmcnLFxuICAnemhfbWluX25hbndpa2knOiAnemgtbWluLW5hbi53aWtpcGVkaWEub3JnJyxcbiAgJ3poX21pbl9uYW53aWt0aW9uYXJ5JzogJ3poLW1pbi1uYW4ud2lrdGlvbmFyeS5vcmcnLFxuICAnemhfbWluX25hbndpa2lib29rcyc6ICd6aC1taW4tbmFuLndpa2lib29rcy5vcmcnLFxuICAnemhfbWluX25hbndpa2lxdW90ZSc6ICd6aC1taW4tbmFuLndpa2lxdW90ZS5vcmcnLFxuICAnemhfbWluX25hbndpa2lzb3VyY2UnOiAnemgtbWluLW5hbi53aWtpc291cmNlLm9yZycsXG4gICd6aF95dWV3aWtpJzogJ3poLXl1ZS53aWtpcGVkaWEub3JnJyxcbiAgJ3p1d2lraSc6ICd6dS53aWtpcGVkaWEub3JnJyxcbiAgJ3p1d2lrdGlvbmFyeSc6ICd6dS53aWt0aW9uYXJ5Lm9yZycsXG4gICd6dXdpa2lib29rcyc6ICd6dS53aWtpYm9va3Mub3JnJyxcbiAgJ2Fkdmlzb3J5d2lraSc6ICdhZHZpc29yeS53aWtpbWVkaWEub3JnJyxcbiAgJ2Fyd2lraW1lZGlhJzogJ2FyLndpa2ltZWRpYS5vcmcnLFxuICAnYXJiY29tX2Rld2lraSc6ICdhcmJjb20tZGUud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fZW53aWtpJzogJ2FyYmNvbS1lbi53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9maXdpa2knOiAnYXJiY29tLWZpLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX25sd2lraSc6ICdhcmJjb20tbmwud2lraXBlZGlhLm9yZycsXG4gICdhdWRpdGNvbXdpa2knOiAnYXVkaXRjb20ud2lraW1lZGlhLm9yZycsXG4gICdiZHdpa2ltZWRpYSc6ICdiZC53aWtpbWVkaWEub3JnJyxcbiAgJ2Jld2lraW1lZGlhJzogJ2JlLndpa2ltZWRpYS5vcmcnLFxuICAnYmV0YXdpa2l2ZXJzaXR5JzogJ2JldGEud2lraXZlcnNpdHkub3JnJyxcbiAgJ2JvYXJkd2lraSc6ICdib2FyZC53aWtpbWVkaWEub3JnJyxcbiAgJ2JvYXJkZ292Y29td2lraSc6ICdib2FyZGdvdmNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ2Jyd2lraW1lZGlhJzogJ2JyLndpa2ltZWRpYS5vcmcnLFxuICAnY2F3aWtpbWVkaWEnOiAnY2Eud2lraW1lZGlhLm9yZycsXG4gICdjaGFpcndpa2knOiAnY2hhaXIud2lraW1lZGlhLm9yZycsXG4gICdjaGFwY29td2lraSc6ICdhZmZjb20ud2lraW1lZGlhLm9yZycsXG4gICdjaGVja3VzZXJ3aWtpJzogJ2NoZWNrdXNlci53aWtpbWVkaWEub3JnJyxcbiAgJ2Nud2lraW1lZGlhJzogJ2NuLndpa2ltZWRpYS5vcmcnLFxuICAnY293aWtpbWVkaWEnOiAnY28ud2lraW1lZGlhLm9yZycsXG4gICdjb2xsYWJ3aWtpJzogJ2NvbGxhYi53aWtpbWVkaWEub3JnJyxcbiAgJ2NvbW1vbnN3aWtpJzogJ2NvbW1vbnMud2lraW1lZGlhLm9yZycsXG4gICdka3dpa2ltZWRpYSc6ICdkay53aWtpbWVkaWEub3JnJyxcbiAgJ2RvbmF0ZXdpa2knOiAnZG9uYXRlLndpa2ltZWRpYS5vcmcnLFxuICAnZXR3aWtpbWVkaWEnOiAnZWUud2lraW1lZGlhLm9yZycsXG4gICdleGVjd2lraSc6ICdleGVjLndpa2ltZWRpYS5vcmcnLFxuICAnZmRjd2lraSc6ICdmZGMud2lraW1lZGlhLm9yZycsXG4gICdmaXdpa2ltZWRpYSc6ICdmaS53aWtpbWVkaWEub3JnJyxcbiAgJ2ZvdW5kYXRpb253aWtpJzogJ3dpa2ltZWRpYWZvdW5kYXRpb24ub3JnJyxcbiAgJ2dyYW50c3dpa2knOiAnZ3JhbnRzLndpa2ltZWRpYS5vcmcnLFxuICAnaWVnY29td2lraSc6ICdpZWdjb20ud2lraW1lZGlhLm9yZycsXG4gICdpbHdpa2ltZWRpYSc6ICdpbC53aWtpbWVkaWEub3JnJyxcbiAgJ2luY3ViYXRvcndpa2knOiAnaW5jdWJhdG9yLndpa2ltZWRpYS5vcmcnLFxuICAnaW50ZXJuYWx3aWtpJzogJ2ludGVybmFsLndpa2ltZWRpYS5vcmcnLFxuICAnbGFic3dpa2knOiAnd2lraXRlY2gud2lraW1lZGlhLm9yZycsXG4gICdsYWJ0ZXN0d2lraSc6ICdsYWJ0ZXN0d2lraXRlY2gud2lraW1lZGlhLm9yZycsXG4gICdsZWdhbHRlYW13aWtpJzogJ2xlZ2FsdGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ2xvZ2lud2lraSc6ICdsb2dpbi53aWtpbWVkaWEub3JnJyxcbiAgJ21lZGlhd2lraXdpa2knOiAnbWVkaWF3aWtpLm9yZycsXG4gICdtZXRhd2lraSc6ICdtZXRhLndpa2ltZWRpYS5vcmcnLFxuICAnbWt3aWtpbWVkaWEnOiAnbWsud2lraW1lZGlhLm9yZycsXG4gICdtb3ZlbWVudHJvbGVzd2lraSc6ICdtb3ZlbWVudHJvbGVzLndpa2ltZWRpYS5vcmcnLFxuICAnbXh3aWtpbWVkaWEnOiAnbXgud2lraW1lZGlhLm9yZycsXG4gICdubHdpa2ltZWRpYSc6ICdubC53aWtpbWVkaWEub3JnJyxcbiAgJ25vd2lraW1lZGlhJzogJ25vLndpa2ltZWRpYS5vcmcnLFxuICAnbm9ib2FyZF9jaGFwdGVyc3dpa2ltZWRpYSc6ICdub2JvYXJkLWNoYXB0ZXJzLndpa2ltZWRpYS5vcmcnLFxuICAnbm9zdGFsZ2lhd2lraSc6ICdub3N0YWxnaWEud2lraXBlZGlhLm9yZycsXG4gICdueWN3aWtpbWVkaWEnOiAnbnljLndpa2ltZWRpYS5vcmcnLFxuICAnbnp3aWtpbWVkaWEnOiAnbnoud2lraW1lZGlhLm9yZycsXG4gICdvZmZpY2V3aWtpJzogJ29mZmljZS53aWtpbWVkaWEub3JnJyxcbiAgJ29tYnVkc21lbndpa2knOiAnb21idWRzbWVuLndpa2ltZWRpYS5vcmcnLFxuICAnb3Ryc193aWtpd2lraSc6ICdvdHJzLXdpa2kud2lraW1lZGlhLm9yZycsXG4gICdvdXRyZWFjaHdpa2knOiAnb3V0cmVhY2gud2lraW1lZGlhLm9yZycsXG4gICdwYV91c3dpa2ltZWRpYSc6ICdwYS11cy53aWtpbWVkaWEub3JnJyxcbiAgJ3Bsd2lraW1lZGlhJzogJ3BsLndpa2ltZWRpYS5vcmcnLFxuICAncXVhbGl0eXdpa2knOiAncXVhbGl0eS53aWtpbWVkaWEub3JnJyxcbiAgJ3Jzd2lraW1lZGlhJzogJ3JzLndpa2ltZWRpYS5vcmcnLFxuICAncnV3aWtpbWVkaWEnOiAncnUud2lraW1lZGlhLm9yZycsXG4gICdzZXdpa2ltZWRpYSc6ICdzZS53aWtpbWVkaWEub3JnJyxcbiAgJ3NlYXJjaGNvbXdpa2knOiAnc2VhcmNoY29tLndpa2ltZWRpYS5vcmcnLFxuICAnc291cmNlc3dpa2knOiAnd2lraXNvdXJjZS5vcmcnLFxuICAnc3Bjb213aWtpJzogJ3NwY29tLndpa2ltZWRpYS5vcmcnLFxuICAnc3BlY2llc3dpa2knOiAnc3BlY2llcy53aWtpbWVkaWEub3JnJyxcbiAgJ3N0ZXdhcmR3aWtpJzogJ3N0ZXdhcmQud2lraW1lZGlhLm9yZycsXG4gICdzdHJhdGVneXdpa2knOiAnc3RyYXRlZ3kud2lraW1lZGlhLm9yZycsXG4gICd0ZW53aWtpJzogJ3Rlbi53aWtpcGVkaWEub3JnJyxcbiAgJ3Rlc3R3aWtpJzogJ3Rlc3Qud2lraXBlZGlhLm9yZycsXG4gICd0ZXN0Mndpa2knOiAndGVzdDIud2lraXBlZGlhLm9yZycsXG4gICd0ZXN0d2lraWRhdGF3aWtpJzogJ3Rlc3Qud2lraWRhdGEub3JnJyxcbiAgJ3Ryd2lraW1lZGlhJzogJ3RyLndpa2ltZWRpYS5vcmcnLFxuICAndHJhbnNpdGlvbnRlYW13aWtpJzogJ3RyYW5zaXRpb250ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAndWF3aWtpbWVkaWEnOiAndWEud2lraW1lZGlhLm9yZycsXG4gICd1a3dpa2ltZWRpYSc6ICd1ay53aWtpbWVkaWEub3JnJyxcbiAgJ3VzYWJpbGl0eXdpa2knOiAndXNhYmlsaXR5Lndpa2ltZWRpYS5vcmcnLFxuICAndm90ZXdpa2knOiAndm90ZS53aWtpbWVkaWEub3JnJyxcbiAgJ3dnX2Vud2lraSc6ICd3Zy1lbi53aWtpcGVkaWEub3JnJyxcbiAgJ3dpa2lkYXRhd2lraSc6ICd3aWtpZGF0YS5vcmcnLFxuICAnd2lraW1hbmlhMjAwNXdpa2knOiAnd2lraW1hbmlhMjAwNS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDZ3aWtpJzogJ3dpa2ltYW5pYTIwMDYud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA3d2lraSc6ICd3aWtpbWFuaWEyMDA3Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwOHdpa2knOiAnd2lraW1hbmlhMjAwOC53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDl3aWtpJzogJ3dpa2ltYW5pYTIwMDkud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDEwd2lraSc6ICd3aWtpbWFuaWEyMDEwLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMXdpa2knOiAnd2lraW1hbmlhMjAxMS53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTJ3aWtpJzogJ3dpa2ltYW5pYTIwMTIud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDEzd2lraSc6ICd3aWtpbWFuaWEyMDEzLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNHdpa2knOiAnd2lraW1hbmlhMjAxNC53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTV3aWtpJzogJ3dpa2ltYW5pYTIwMTUud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE2d2lraSc6ICd3aWtpbWFuaWEyMDE2Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxN3dpa2knOiAnd2lraW1hbmlhMjAxNy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYXRlYW13aWtpJzogJ3dpa2ltYW5pYXRlYW0ud2lraW1lZGlhLm9yZycsXG4gICd6ZXJvd2lraSc6ICd6ZXJvLndpa2ltZWRpYS5vcmcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNpdGVNYXA7XG4iXX0=
