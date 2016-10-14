(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./core_extensions":1,"./polyfills":2,"./pv_config":4,"./site_map":5}],4:[function(require,module,exports){
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

},{"./site_map":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

/**
 * @file Configuration for Topviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 */

var pv = require('../shared/pv');

/**
 * Configuration for Topviews application.
 * This includes selectors, defaults, and other constants specific to Topviews
 * @type {Object}
 */
var config = {
  select2Input: '.aqs-select2-selector',
  dateRangeSelector: '.aqs-date-range-selector',
  defaults: {
    dateRange: 'last-month',
    excludes: []
  },
  maxDate: moment(moment().utc().subtract(1, 'day').startOf('day').toDate()).startOf('day').toDate(),
  maxMonth: moment().subtract(1, 'month').subtract(2, 'days').startOf('month').toDate(),
  pageSize: 100,
  platformSelector: '#platform-select',
  projectInput: '.aqs-project-input',
  validateParams: ['project', 'platform'],
  timestampFormat: 'YYYYMMDD00'
};

module.exports = config;

},{"../shared/pv":3}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Topviews Analysis tool
 * @file Main file for Topviews application
 * @author MusikAnimal
 * @copyright 2016 MusikAnimal
 * @license MIT License: https://opensource.org/licenses/MIT
 * @requires Pv
 */

var config = require('./config');
var Pv = require('../shared/pv');

/** Main TopViews class */

var TopViews = function (_Pv) {
  _inherits(TopViews, _Pv);

  function TopViews() {
    _classCallCheck(this, TopViews);

    var _this = _possibleConstructorReturn(this, (TopViews.__proto__ || Object.getPrototypeOf(TopViews)).call(this, config));

    _this.app = 'topviews';

    _this.excludes = [];
    _this.offset = 0;
    _this.max = null;
    _this.pageData = [];
    _this.pageNames = [];
    return _this;
  }

  /**
   * Initialize the application.
   * Called in `pv.js` after translations have loaded
   * @return {null} Nothing
   */


  _createClass(TopViews, [{
    key: 'initialize',
    value: function initialize() {
      this.popParams();
      this.updateInterAppLinks();
    }

    /**
     * Apply user input by updating the URL query string and view, if needed
     * @param {boolean} force - apply all user options even if we've detected nothing has changed
     * @returns {Deferred} deferred object from initData
     */

  }, {
    key: 'processInput',
    value: function processInput(force) {
      this.clearSearch();
      this.pushParams();

      /** prevent redundant querying */
      if (location.search === this.params && !force) {
        return false;
      }
      this.params = location.search;

      this.resetView(false);
      return this.initData().then(this.drawData.bind(this));
    }

    /**
     * Print list of top pages
     * @returns {null} nothing
     */

  }, {
    key: 'drawData',
    value: function drawData() {
      $('.chart-container').html('');

      var count = 0,
          index = 0;

      while (count < this.config.pageSize + this.offset) {
        var item = this.pageData[index++];

        if (this.excludes.includes(item.article)) continue;
        if (!this.max) this.max = item.views;

        var width = 100 * (item.views / this.max),
            direction = !!i18nRtl ? 'to left' : 'to right';

        $('.chart-container').append('<div class=\'topview-entry\' id=\'topview-entry-' + index + '\' style=\'background:linear-gradient(' + direction + ', #EEE ' + width + '%, transparent ' + width + '%)\'>\n         <span class=\'topview-entry--remove glyphicon glyphicon-remove\' data-article-id=' + (index - 1) + '\n           title=\'Remove this page from Topviews rankings\' aria-hidden=\'true\'></span>\n         <span class=\'topview-entry--rank\'>' + ++count + '</span>\n         <a class=\'topview-entry--label\' href="' + this.getPageURL(item.article) + '" target="_blank">' + item.article + '</a>\n         <span class=\'topview-entry--leader\'></span>\n         <a class=\'topview-entry--views\' href=\'' + this.getPageviewsURL(item.article) + '\'>' + this.formatNumber(item.views) + '</a></div>');
      }

      this.pushParams();
      this.stopSpinny();

      this.addExcludeListeners();
    }

    /**
     * Add given page(s) to list of excluded pages and optionally re-render the view
     * @param {Array|String} pages - page(s) to add to excludes
     * @param {Boolean} [triggerChange] - whether or not to re-render the view
     * @returns {null} nothing
     */

  }, {
    key: 'addExclude',
    value: function addExclude(pages) {
      var _this2 = this;

      var triggerChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!Array.isArray(pages)) pages = [pages];

      pages.forEach(function (page) {
        if (!_this2.excludes.includes(page)) {
          _this2.excludes.push(page);
        }
      });

      $(this.config.select2Input).html('');

      this.excludes.forEach(function (exclude) {
        var escapedText = $('<div>').text(exclude).html();
        $('<option>' + escapedText + '</option>').appendTo(_this2.config.select2Input);
      });

      if (triggerChange) $(this.config.select2Input).val(this.excludes).trigger('change');
    }

    /**
     * Re-add listeners to exclude pages, called after sorting or changing params
     * @returns {null} nothing
     */

  }, {
    key: 'addExcludeListeners',
    value: function addExcludeListeners() {
      var _this3 = this;

      $('.topview-entry--remove').off('click').on('click', function (e) {
        var pageName = _this3.pageNames[$(e.target).data('article-id')];
        _this3.addExclude(pageName);
        _this3.pushParams();
      });
    }

    /**
     * Clear the topviews search
     * @return {null} nothing
     */

  }, {
    key: 'clearSearch',
    value: function clearSearch() {
      if ($('.topviews-search-icon').hasClass('glyphicon-remove')) {
        $('#topviews_search_field').val('');
        $('.topviews-search-icon').removeClass('glyphicon-remove').addClass('glyphicon-search');
        this.drawData();
      }
    }

    /**
     * Exports current chart data to CSV format and loads it in a new tab
     * With the prepended data:text/csv this should cause the browser to download the data
     * @returns {null} nothing
     * @override
     */

  }, {
    key: 'exportCSV',
    value: function exportCSV() {
      var csvContent = 'data:text/csv;charset=utf-8,Page,Views\n';

      this.pageData.forEach(function (entry) {
        // Build an array of page titles for use in the CSV header
        var title = '"' + entry.article.replace(/"/g, '""') + '"';

        csvContent += title + ',' + entry.views + '\n';
      });

      this.downloadData(csvContent, 'csv');
    }

    /**
     * Exports current chart data to JSON format and loads it in a new tab
     * @returns {null} nothing
     * @override
     */

  }, {
    key: 'exportJSON',
    value: function exportJSON() {
      var jsonContent = 'data:text/json;charset=utf-8,' + JSON.stringify(this.pageData);
      this.downloadData(jsonContent, 'json');
    }

    /**
     * Get informative filename without extension to be used for export options
     * @return {string} filename without an extension
     * @override
     */

  }, {
    key: 'getExportFilename',
    value: function getExportFilename() {
      var datepickerValue = this.datepicker.getDate();
      var date = void 0;

      if (this.isMonthly()) {
        date = moment(datepickerValue).format('YYYY/MM');
      } else {
        date = moment(datepickerValue).format('YYYY/MM/DD');
      }

      return this.app + '-' + date;
    }

    /**
     * Link to /pageviews for given article and chosen daterange
     * @param {string} article - page name
     * @returns {string} URL
     */

  }, {
    key: 'getPageviewsURL',
    value: function getPageviewsURL(article) {
      // first get the date range
      var date = moment(this.datepicker.getDate());
      var startDate = void 0,
          endDate = void 0;
      if (this.isMonthly()) {
        startDate = date.format('YYYY-MM-01');
        endDate = date.endOf('month').format('YYYY-MM-DD');
      } else {
        // surround single dates with 3 days to make the pageviews chart meaningful
        startDate = moment(date).subtract(3, 'days').format('YYYY-MM-DD');
        endDate = date.add(3, 'days').format('YYYY-MM-DD');
      }

      var platform = $(this.config.platformSelector).val(),
          project = $(this.config.projectInput).val();

      return '/pageviews?start=' + startDate + '&end=' + endDate + '&project=' + project + '&platform=' + platform + '&pages=' + article;
    }

    /**
     * Get all user-inputted parameters except the pages
     * @param {boolean} [specialRange] whether or not to include the special range instead of start/end, if applicable
     * @return {Object} project, platform, excludes, etc.
     */

  }, {
    key: 'getParams',
    value: function getParams() {
      var specialRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var params = {
        project: $(this.config.projectInput).val(),
        platform: $(this.config.platformSelector).val()
      };

      var datepickerValue = this.datepicker.getDate();

      /**
       * Override start and end with custom range values,
       *   if configured (set by URL params or setupDateRangeSelector)
       */
      if (this.specialRange && specialRange) {
        params.date = this.specialRange.range;
      } else if (this.isMonthly()) {
        params.date = moment(datepickerValue).format('YYYY-MM');
      } else {
        params.date = moment(datepickerValue).format('YYYY-MM-DD');
      }

      return params;
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
     * Set datepicker based on provided relative range
     * @param {String} range - e.g. 'last-month', 'yesterday'
     * @returns {Boolean} whether a valid range was provided and was set
     * @override
     */

  }, {
    key: 'setSpecialRange',
    value: function setSpecialRange(range) {
      if (range === 'last-month') {
        this.setupDateRangeSelector('monthly');
        this.datepicker.setDate(this.config.maxMonth);
        this.specialRange = {
          range: range,
          value: moment(this.config.maxMonth).format('YYYY/MM')
        };
      } else if (range === 'yesterday') {
        this.setupDateRangeSelector('daily');
        this.datepicker.setDate(this.config.maxDate);
        this.specialRange = {
          range: range,
          value: moment(this.config.maxDate).format('YYYY-MM-DD')
        };
      } else {
        return false;
      }

      return true;
    }

    /**
     * Set datepicker based on provided date or range
     * @param {String} dateInput - either a range like 'last-month', 'yesterday' or date with format 'YYYY-MM-DD'
     * @returns {null} nothing
     */

  }, {
    key: 'setDate',
    value: function setDate(dateInput) {
      var date = void 0;

      if (/\d{4}-\d{2}$/.test(dateInput)) {
        // monthly
        this.setupDateRangeSelector('monthly');
        date = moment(dateInput + '-01').toDate();

        // if over max, set to max
        if (date > this.config.maxMonth) {
          date = this.config.maxMonth;
        }
      } else if (/\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        // daily
        this.setupDateRangeSelector('daily');
        date = moment(dateInput).toDate();

        // if over max, set to max (Topviews maxDate is a Date object, not moment)
        if (date > this.config.maxDate) {
          date = this.config.maxDate;
        }
      } else {
        // attempt to set as special range, or default range if range is invalid
        return this.setSpecialRange(dateInput) || this.setSpecialRange(this.config.defaults.dateRange);
      }

      // if less than min, throw error (since this is a common request)
      if (date < this.config.minDate.toDate()) {
        this.addSiteNotice('error',
        // use super.dateFormat since this is for moment, not for our datepicker
        $.i18n('param-error-1', moment(this.config.minDate).format(_get(TopViews.prototype.__proto__ || Object.getPrototypeOf(TopViews.prototype), 'dateFormat', this))), $.i18n('invalid-params'), true);
        date = this.config.minDate.toDate();
      }

      return this.datepicker.setDate(date);
    }

    /**
     * Parses the URL query string and sets all the inputs accordingly
     * Should only be called on initial page load, until we decide to support pop states (probably never)
     * @returns {null} nothing
     */

  }, {
    key: 'popParams',
    value: function popParams() {
      var _this4 = this;

      /** show loading indicator and add error handling for timeouts */
      this.startSpinny();

      var params = this.validateParams(this.parseQueryString('excludes'));

      // FIXME: remove once all affected wikis/links have been updated
      if (params.range || params.start || params.end) {
        this.fixLegacyDates(params);
        this.addSiteNotice('warning', 'Custom date ranges are no longer supported. See the official annoucement\n          <a href=\'//meta.wikimedia.org/wiki/Talk:Pageviews_Analysis#Topviews_revamped\'>here</a>.', 'Topviews has been revamped!', true);
      }

      this.setDate(params.date); // also performs validations

      $(this.config.projectInput).val(params.project);
      $(this.config.platformSelector).val(params.platform);
      this.patchUsage();

      this.excludes = (params.excludes || []).map(function (exclude) {
        return exclude.descore();
      });

      this.params = location.search;

      this.initData().done(function () {
        _this4.drawData();
      }).always(function () {
        _this4.setupSelect2();
        _this4.setupListeners();
      });
    }

    /**
     * Fix legacy links to Topviews that used a defined date range.
     * Instead, we'll determine how wide the range is, and if it's greater than 3 days
     *   then use the month, otherwise use the first day of the range
     * @param {Object} params - params as provided by this.parseQueryString
     * @returns {Object} modified params with corrected dates
     */

  }, {
    key: 'fixLegacyDates',
    value: function fixLegacyDates(params) {
      // all is well if we were given a date parameter (new version)
      //   or if no date params were provided
      if (params.date || !params.start && !params.end && !params.range) return params;

      // use last-month if any range was provided
      if (params.range) {
        params.date = 'last-month';
        return params;
      }

      // if invalid start/end use last-month
      var dateRegex = /\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(params.start) && !dateRegex.test(params.end)) {
        params.date = 'last-month';
        return params;
      }

      var startDate = moment(params.start, 'YYYY-MM-DD'),
          endDate = moment(params.end, 'YYYY-MM-DD'),
          numDays = Math.abs(endDate.diff(startDate, 'days'));

      if (numDays > 3) {
        params.date = startDate.format('YYYY-MM');
      } else {
        params.date = params.start;
      }

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
      var excludes = this.underscorePageNames(this.excludes).join('|').replace(/[&%]/g, escape);

      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, '?' + $.param(this.getParams()) + '&excludes=' + excludes);
      }

      $('.permalink').prop('href', '?' + $.param(this.getPermaLink()) + '&excludes=' + excludes);
    }

    /**
     * Removes all Select2 related stuff then adds it back
     * @returns {null} nothing
     */

  }, {
    key: 'resetSelect2',
    value: function resetSelect2() {
      var select2Input = $(this.config.select2Input);
      select2Input.off('change');
      select2Input.val(null);
      select2Input.html('');
      select2Input.select2('data', null);
      select2Input.select2('destroy');
      this.setupSelect2();
    }

    /**
     * Removes chart, messages, and resets Select2 selections
     * @returns {null} nothing
     */

  }, {
    key: 'resetView',
    value: function resetView() {
      var clearSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.max = null;
      this.offset = 0;
      this.pageData = [];
      this.pageNames = [];
      this.stopSpinny(true);
      $('.chart-container').html('');
      $('.message-container').html('');
      if (clearSelector) {
        this.resetSelect2();
        this.excludes = [];
      }
    }

    /**
     * Search the topviews data for the given page title
     * and restrict the view to the matches
     * @returns {null} nothing
     */

  }, {
    key: 'searchTopviews',
    value: function searchTopviews() {
      var _this5 = this;

      var query = $('#topviews_search_field').val();

      if (!query) return this.clearSearch();

      var matchedData = [],
          count = 0;

      // add ranking to pageData and fetch matches
      this.pageData.forEach(function (entry, index) {
        if (!_this5.excludes.includes(entry.article)) {
          count++;
          if (new RegExp(query, 'i').test(entry.article)) {
            entry.rank = count;
            entry.index = index;
            matchedData.push(entry);
          }
        }
      });

      $('.chart-container').html('');
      $('.expand-chart').hide();
      $('.topviews-search-icon').removeClass('glyphicon-search').addClass('glyphicon-remove');

      matchedData.forEach(function (item) {
        var width = 100 * (item.views / _this5.max),
            direction = !!i18nRtl ? 'to left' : 'to right';

        $('.chart-container').append('<div class=\'topview-entry\' style=\'background:linear-gradient(' + direction + ', #EEE ' + width + '%, transparent ' + width + '%)\'>\n         <span class=\'topview-entry--remove glyphicon glyphicon-remove\' data-article-id=' + item.index + ' aria-hidden=\'true\'></span>\n         <span class=\'topview-entry--rank\'>' + item.rank + '</span>\n         <a class=\'topview-entry--label\' href="' + _this5.getPageURL(item.article) + '" target="_blank">' + item.article + '</a>\n         <span class=\'topview-entry--leader\'></span>\n         <a class=\'topview-entry--views\' href=\'' + _this5.getPageviewsURL(item.article) + '\'>' + _this5.formatNumber(item.views) + '</a></div>');
      });

      this.addExcludeListeners();
    }

    /**
     * Calls parent setupProjectInput and updates the view if validations passed
     *   reverting to the old value if the new one is invalid
     * @returns {null} nothing
     * @override
     */

  }, {
    key: 'validateProject',
    value: function validateProject(e) {
      if (_get(TopViews.prototype.__proto__ || Object.getPrototypeOf(TopViews.prototype), 'validateProject', this).call(this, e)) {
        this.resetView(true);
        this.processInput();
      }
    }

    /**
     * Sets up the Select2 selector and adds listener to update chart
     * @param {array} excludes - default page names to exclude
     * @returns {null} - nothing
     */

  }, {
    key: 'setupSelect2',
    value: function setupSelect2() {
      var _this6 = this;

      var excludes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.excludes;

      var select2Input = $(this.config.select2Input);

      select2Input.select2({
        data: [],
        maximumSelectionLength: 50,
        minimumInputLength: 0,
        placeholder: $.i18n('hover-to-exclude')
      });

      if (excludes.length) this.setSelect2Defaults(excludes);

      select2Input.on('change', function (e) {
        _this6.excludes = $(e.target).val() || [];
        _this6.max = null;
        _this6.clearSearch();
        _this6.drawData();
      });

      /**
       * for topviews we don't want the user input functionality of Select2
       * setTimeout of 0 to let rendering threads catch up and actually disable the field
       */
      setTimeout(function () {
        $('.select2-search__field').prop('disabled', true);
      });
    }

    /**
     * Directly set pages in Select2 selector
     * Currently is not able to remove underscore from page names
     *
     * @param {array} pages - page titles
     * @returns {array} - untouched array of pages
     */

  }, {
    key: 'setSelect2Defaults',
    value: function setSelect2Defaults(pages) {
      var _this7 = this;

      pages = pages.map(function (page) {
        // page = page.replace(/ /g, '_');
        var escapedText = $('<div>').text(page).html();
        $('<option>' + escapedText + '</option>').appendTo(_this7.config.select2Input);
        return page;
      });
      $(this.config.select2Input).select2('val', pages);

      return pages;
    }

    /**
     * sets up the datepicker based on given type
     * @param {String} [type] - either 'monthly' or 'daily'
     * @returns {null} - nothing
     * @override
     */

  }, {
    key: 'setupDateRangeSelector',
    value: function setupDateRangeSelector() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'monthly';

      $('#date-type-select').val(type);

      var datepickerParams = type === 'monthly' ? {
        format: 'MM yyyy',
        viewMode: 'months',
        minViewMode: 'months',
        endDate: this.config.maxMonth
      } : {
        format: this.dateFormat,
        viewMode: 'days',
        endDate: this.config.maxDate
      };

      $(this.config.dateRangeSelector).datepicker('destroy');
      $(this.config.dateRangeSelector).datepicker(Object.assign({
        autoclose: true,
        startDate: this.config.minDate.toDate()
      }, datepickerParams));
    }

    /**
     * General place to add page-wide listeners
     * @returns {null} - nothing
     */

  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      var _this8 = this;

      _get(TopViews.prototype.__proto__ || Object.getPrototypeOf(TopViews.prototype), 'setupListeners', this).call(this);

      $(this.config.platformSelector).on('change', this.processInput.bind(this));
      $('#date-type-select').on('change', function (e) {
        // also calls setupDateRangeSelector
        _this8.setSpecialRange(_this8.isMonthly() ? 'last-month' : 'yesterday');
      });
      $('.expand-chart').on('click', function () {
        _this8.offset += _this8.config.pageSize;
        _this8.drawData();
      });
      $(this.config.dateRangeSelector).on('change', function (e) {
        /** clear out specialRange if it doesn't match our input */
        if (_this8.specialRange && _this8.specialRange.value !== e.target.value) {
          _this8.specialRange = null;
        }
        _this8.processInput();
      });
      $('.mainspace-only-option').on('click', this.processInput.bind(this));
      $('#topviews_search_field').on('keyup', this.searchTopviews.bind(this));
      $('.topviews-search-icon').on('click', this.clearSearch.bind(this));
    }

    /**
     * Add the loading indicator class and set the safeguard timeout
     * @returns {null} nothing
     * @override
     */

  }, {
    key: 'startSpinny',
    value: function startSpinny() {
      _get(TopViews.prototype.__proto__ || Object.getPrototypeOf(TopViews.prototype), 'startSpinny', this).call(this);
      $('.expand-chart').hide();
      $('.data-links').addClass('invisible');
      $('.search-topviews').addClass('invisible');
      $('.data-notice').addClass('invisible');
    }

    /**
     * Remove loading indicator class and clear the safeguard timeout
     * @param {Boolean} hideDataLinks - whether or not to hide the data links
     * @returns {null} nothing
     * @override
     */

  }, {
    key: 'stopSpinny',
    value: function stopSpinny(hideDataLinks) {
      _get(TopViews.prototype.__proto__ || Object.getPrototypeOf(TopViews.prototype), 'stopSpinny', this).call(this);
      if (!hideDataLinks) {
        $('.data-links').removeClass('invisible');
        $('.search-topviews').removeClass('invisible');
        $('.data-notice').removeClass('invisible');
        $('.expand-chart').show();
      }
    }

    /**
     * Get date format to use based on settings
     * @returns {string} date format to passed to parser
     * @override
     */

  }, {
    key: 'isMonthly',


    /**
     * Are we in 'monthly' mode? (If we aren't then we're in daily)
     * @return {Boolean} yes or no
     */
    value: function isMonthly() {
      return $('#date-type-select').val() === 'monthly';
    }

    /**
     * Get the currently selected date for the purposes of pageviews API call
     * @return {String} formatted date
     */

  }, {
    key: 'getAPIDate',
    value: function getAPIDate() {
      var datepickerValue = this.datepicker.getDate();

      if (this.isMonthly()) {
        return moment(datepickerValue).format('YYYY/MM') + '/all-days';
      } else {
        return moment(datepickerValue).format('YYYY/MM/DD');
      }
    }

    /**
     * Fetch data from API
     * @returns {Deferred} promise with data
     */

  }, {
    key: 'initData',
    value: function initData() {
      var _this9 = this;

      var dfd = $.Deferred();

      this.startSpinny();

      var access = $(this.config.platformSelector).val();

      $.ajax({
        url: 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/' + this.project + '/' + access + '/' + this.getAPIDate(),
        dataType: 'json'
      }).done(function (data) {
        // store pageData from API, removing underscores from the page name
        _this9.pageData = data.items[0].articles.map(function (page) {
          page.article = page.article.descore();
          return page;
        });

        /** build the pageNames array for Select2 */
        _this9.pageNames = _this9.pageData.map(function (page) {
          return page.article;
        });

        if ($('.mainspace-only-option').is(':checked')) {
          _this9.filterOutNamespace(_this9.pageNames).done(function (pageNames) {
            _this9.pageNames = pageNames;
            _this9.pageData = _this9.pageData.filter(function (page) {
              return pageNames.includes(page.article);
            });
            return dfd.resolve(_this9.pageData);
          });
        } else {
          return dfd.resolve(_this9.pageData);
        }
      }).fail(function (errorData) {
        _this9.resetView();
        _this9.writeMessage($.i18n('api-error', 'Pageviews API') + ' - ' + errorData.responseJSON.title);
        return dfd.reject();
      });

      return dfd;
    }

    /**
     * Get the pages that are not in the given namespace
     * @param {array} pages - pages to filter
     * @param {Number} [restrictedNamespace] - ID of the namespace to restrict to, defaults to 0 (mainspace)
     * @return {Deferred} promise resolving with pages in given namespace
     */

  }, {
    key: 'filterOutNamespace',
    value: function filterOutNamespace(pages) {
      var _this10 = this;

      var restrictedNamespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var dfd = $.Deferred();

      var doFiltering = function doFiltering(entries, unacceptableNamespaces) {
        return entries.filter(function (entry) {
          var ns = entry.split(':')[0];

          // include main page as non-mainspace
          if (restrictedNamespace === 0 && entry === _this10.getSiteInfo(_this10.project).general.mainpage) {
            return false;
          }

          // Verify there was a namespace. For instance, don't filter out a mainspace article
          //  called 'Search', when we wanted to filter out Special:Search
          if (!entry.includes(':')) return true;

          return !unacceptableNamespaces.includes(ns);
        });
      };

      this.fetchSiteInfo(this.project).done(function () {
        var unacceptableNamespaces = [];

        // for non-mainspace, count 'Wikipedia' and 'Special' since API seems to
        //  include for instance both Wikipedia and Wikipédia in some projects
        // FIXME: the 'Sp?cial' is an apparent bug, see phab:T145043
        if (restrictedNamespace === 0) {
          unacceptableNamespaces = ['Wikipedia', 'Special', 'Sp?cial'];
        }

        for (var ns in _this10.getSiteInfo(_this10.project).namespaces) {
          unacceptableNamespaces.push(_this10.getSiteInfo(_this10.project).namespaces[ns]['*']);
        }

        // the actual filtering of the given pages
        pages = doFiltering(pages, unacceptableNamespaces);

        // remove excludes that would otherwise automatically be filtered out
        _this10.excludes = doFiltering(_this10.excludes, unacceptableNamespaces);

        dfd.resolve(pages);
      }).fail(function () {
        _this10.writeMessage('' + $.i18n('api-error', 'Siteinfo API'));
        dfd.resolve(pages);
      });

      return dfd;
    }
  }, {
    key: 'dateFormat',
    get: function get() {
      return _get(TopViews.prototype.__proto__ || Object.getPrototypeOf(TopViews.prototype), 'dateFormat', this).toLowerCase();
    }

    /**
     * Get instance of datepicker
     * @return {Object} the datepicker instance
     */

  }, {
    key: 'datepicker',
    get: function get() {
      return $(this.config.dateRangeSelector).data('datepicker');
    }
  }]);

  return TopViews;
}(Pv);

$(document).ready(function () {
  /** assume hash params are supposed to be query params */
  if (document.location.hash && !document.location.search) {
    return document.location.href = document.location.href.replace('#', '?');
  } else if (document.location.hash) {
    return document.location.href = document.location.href.replace(/\#.*/, '');
  }

  new TopViews();
});

},{"../shared/pv":3,"./config":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvY29yZV9leHRlbnNpb25zLmpzIiwiamF2YXNjcmlwdHMvc2hhcmVkL3BvbHlmaWxscy5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdi5qcyIsImphdmFzY3JpcHRzL3NoYXJlZC9wdl9jb25maWcuanMiLCJqYXZhc2NyaXB0cy9zaGFyZWQvc2l0ZV9tYXAuanMiLCJqYXZhc2NyaXB0cy90b3B2aWV3cy9jb25maWcuanMiLCJqYXZhc2NyaXB0cy90b3B2aWV3cy90b3B2aWV3cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDUUEsT0FBTyxTQUFQLENBQWlCLE9BQWpCLEdBQTJCLFlBQVc7QUFDcEMsU0FBTyxLQUFLLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLEdBQW5CLENBQVA7QUFDRCxDQUZEO0FBR0EsT0FBTyxTQUFQLENBQWlCLEtBQWpCLEdBQXlCLFlBQVc7QUFDbEMsU0FBTyxLQUFLLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLEdBQW5CLENBQVA7QUFDRCxDQUZEO0FBR0EsT0FBTyxTQUFQLENBQWlCLE1BQWpCLEdBQTBCLFlBQVc7QUFDbkMsU0FBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsV0FBZixLQUErQixLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQXRDO0FBQ0QsQ0FGRDtBQUdBLE9BQU8sU0FBUCxDQUFpQixNQUFqQixHQUEwQixZQUFXO0FBQ25DLE1BQU0sWUFBWTtBQUNoQixTQUFLLE9BRFc7QUFFaEIsU0FBSyxNQUZXO0FBR2hCLFNBQUssTUFIVztBQUloQixTQUFLLFFBSlc7QUFLaEIsU0FBSyxPQUxXO0FBTWhCLFNBQUs7QUFOVyxHQUFsQjs7QUFTQSxTQUFPLEtBQUssT0FBTCxDQUFhLFlBQWIsRUFBMkIsYUFBSztBQUNyQyxXQUFPLFVBQVUsQ0FBVixDQUFQO0FBQ0QsR0FGTSxDQUFQO0FBR0Qs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QkFBUyxZQXJDSztBQXNDZCxpQkFBUyxZQXRDSztBQXVDZCxpQkFBUyxZQXZDSztBQXdDZCxpQkFBUyxZQXhDSztBQXlDZCxzQkFBYyxZQXpDQTtBQTBDZCxpQkFBUyxZQTFDSztBQTJDZCxpQkFBUyxZQTNDSztBQTRDZCxpQkFBUyxZQTVDSztBQTZDZCxpQkFBUyxZQTdDSztBQThDZCxpQkFBUyxZQTlDSztBQStDZCxpQkFBUyxZQS9DSztBQWdEZCxpQkFBUyxZQWhESztBQWlEZCxpQkFBUyxZQWpESztBQWtEZCxpQkFBUyxVQWxESztBQW1EZCxpQkFBUyxVQW5ESztBQW9EZCxzQkFBYyxZQXBEQTtBQXFEZCxpQkFBUyxZQXJESztBQXNEZCxpQkFBUyxVQXRESztBQXVEZCxpQkFBUyxVQXZESztBQXdEZCxpQkFBUyxZQXhESztBQXlEZCxpQkFBUyxVQXpESztBQTBEZCxpQkFBUyxVQTFESztBQTJEZCxpQkFBUyxZQTNESztBQTREZCxpQkFBUyxZQTVESztBQTZEZCxpQkFBUyxVQTdESztBQThEZCxpQkFBUyxVQTlESztBQStEZCxrQkFBVSxZQS9ESTtBQWdFZCxrQkFBVSxZQWhFSTtBQWlFZCxpQkFBUyxVQWpFSztBQWtFZCxpQkFBUyxZQWxFSztBQW1FZCxpQkFBUyxVQW5FSztBQW9FZCxpQkFBUyxZQXBFSztBQXFFZCxpQkFBUyxZQXJFSztBQXNFZCxpQkFBUyxZQXRFSztBQXVFZCxpQkFBUyxXQXZFSztBQXdFZCxpQkFBUyxZQXhFSztBQXlFZCxpQkFBUyxXQXpFSztBQTBFZCxpQkFBUyxZQTFFSztBQTJFZCxpQkFBUyxZQTNFSztBQTRFZCxzQkFBYyxVQTVFQTtBQTZFZCxpQkFBUyxVQTdFSztBQThFZCxzQkFBYyxZQTlFQTtBQStFZCxpQkFBUyxZQS9FSztBQWdGZCxzQkFBYyxZQWhGQTtBQWlGZCxpQkFBUyxZQWpGSztBQWtGZCxpQkFBUyxVQWxGSztBQW1GZCxpQkFBUyxZQW5GSztBQW9GZCxpQkFBUyxXQXBGSztBQXFGZCxpQkFBUyxZQXJGSztBQXNGZCxpQkFBUyxZQXRGSztBQXVGZCxzQkFBYyxVQXZGQTtBQXdGZCxpQkFBUyxZQXhGSztBQXlGZCxpQkFBUyxVQXpGSztBQTBGZCxpQkFBUyxZQTFGSztBQTJGZCxpQkFBUyxZQTNGSztBQTRGZCxpQkFBUyxZQTVGSztBQTZGZCxpQkFBUyxZQTdGSztBQThGZCxpQkFBUyxZQTlGSztBQStGZCxpQkFBUyxVQS9GSztBQWdHZCxpQkFBUyxZQWhHSztBQWlHZCxpQkFBUyxXQWpHSztBQWtHZCxpQkFBUyxZQWxHSztBQW1HZCxpQkFBUyxZQW5HSztBQW9HZCxpQkFBUyxZQXBHSztBQXFHZCxpQkFBUyxZQXJHSztBQXNHZCxpQkFBUyxZQXRHSztBQXVHZCxpQkFBUyxZQXZHSztBQXdHZCxpQkFBUyxZQXhHSztBQXlHZCxpQkFBUyxZQXpHSztBQTBHZCxpQkFBUyxZQTFHSztBQTJHZCxpQkFBUyxZQTNHSztBQTRHZCxpQkFBUyxZQTVHSztBQTZHZCxpQkFBUyxZQTdHSztBQThHZCxpQkFBUyxZQTlHSztBQStHZCxrQkFBVSxZQS9HSTtBQWdIZCxpQkFBUyxZQWhISztBQWlIZCxpQkFBUyxZQWpISztBQWtIZCxpQkFBUyxZQWxISztBQW1IZCxpQkFBUyxZQW5ISztBQW9IZCxpQkFBUyxZQXBISztBQXFIZCxpQkFBUyxZQXJISztBQXNIZCxpQkFBUyxZQXRISztBQXVIZCxpQkFBUyxZQXZISztBQXdIZCxpQkFBUyxVQXhISztBQXlIZCxpQkFBUyxZQXpISztBQTBIZCxpQkFBUyxZQTFISztBQTJIZCxpQkFBUyxVQTNISztBQTRIZCxpQkFBUyxZQTVISztBQTZIZCxpQkFBUyxZQTdISztBQThIZCxpQkFBUyxZQTlISztBQStIZCxpQkFBUyxZQS9ISztBQWdJZCxpQkFBUyxZQWhJSztBQWlJZCxpQkFBUyxZQWpJSztBQWtJZCxpQkFBUyxZQWxJSztBQW1JZCxpQkFBUyxZQW5JSztBQW9JZCxpQkFBUyxZQXBJSztBQXFJZCxpQkFBUyxZQXJJSztBQXNJZCxpQkFBUyxZQXRJSztBQXVJZCxpQkFBUyxVQXZJSztBQXdJZCx1QkFBZSxZQXhJRDtBQXlJZCxzQkFBYyxXQXpJQTtBQTBJZCxrQkFBVSxZQTFJSTtBQTJJZCxzQkFBYyxVQTNJQTtBQTRJZCxpQkFBUyxZQTVJSztBQTZJZCxpQkFBUyxVQTdJSztBQThJZCxrQkFBVSxVQTlJSTtBQStJZCxpQkFBUyxVQS9JSztBQWdKZCxpQkFBUyxZQWhKSztBQWlKZCxpQkFBUyxVQWpKSztBQWtKZCxrQkFBVSxZQWxKSTtBQW1KZCxrQkFBVSxZQW5KSTtBQW9KZCxrQkFBVSxZQXBKSTtBQXFKZCxpQkFBUyxZQXJKSztBQXNKZCxpQkFBUyxZQXRKSztBQXVKZCxpQkFBUyxZQXZKSztBQXdKZCxpQkFBUyxZQXhKSztBQXlKZCxpQkFBUyxZQXpKSztBQTBKZCxpQkFBUyxZQTFKSztBQTJKZCxrQkFBVSxVQTNKSTtBQTRKZCxrQkFBVSxVQTVKSTtBQTZKZCxrQkFBVSxZQTdKSTtBQThKZCxpQkFBUyxVQTlKSztBQStKZCxrQkFBVSxZQS9KSTtBQWdLZCxpQkFBUyxVQWhLSztBQWlLZCxpQkFBUyxZQWpLSztBQWtLZCxpQkFBUyxZQWxLSztBQW1LZCxpQkFBUyxVQW5LSztBQW9LZCxrQkFBVSxZQXBLSTtBQXFLZCxrQkFBVSxZQXJLSTtBQXNLZCxpQkFBUyxVQXRLSztBQXVLZCxzQkFBYyxVQXZLQTtBQXdLZCxrQkFBVSxVQXhLSTtBQXlLZCxpQkFBUyxVQXpLSztBQTBLZCxpQkFBUyxVQTFLSztBQTJLZCxpQkFBUyxVQTNLSztBQTRLZCxpQkFBUyxZQTVLSztBQTZLZCxzQkFBYyxVQTdLQTtBQThLZCxzQkFBYyxVQTlLQTtBQStLZCxpQkFBUyxZQS9LSztBQWdMZCxzQkFBYyxVQWhMQTtBQWlMZCxpQkFBUyxZQWpMSztBQWtMZCxpQkFBUyxZQWxMSztBQW1MZCxpQkFBUyxZQW5MSztBQW9MZCxpQkFBUyxVQXBMSztBQXFMZCxrQkFBVSxVQXJMSTtBQXNMZCxpQkFBUyxZQXRMSztBQXVMZCxpQkFBUyxVQXZMSztBQXdMZCxpQkFBUyxZQXhMSztBQXlMZCxpQkFBUyxVQXpMSztBQTBMZCxpQkFBUyxVQTFMSztBQTJMZCxpQkFBUyxVQTNMSztBQTRMZCxzQkFBYyxVQTVMQTtBQTZMZCxpQkFBUyxZQTdMSztBQThMZCxzQkFBYyxVQTlMQTtBQStMZCxpQkFBUyxVQS9MSztBQWdNZCxpQkFBUyxZQWhNSztBQWlNZCxpQkFBUyxZQWpNSztBQWtNZCxpQkFBUyxZQWxNSztBQW1NZCxrQkFBVSxZQW5NSTtBQW9NZCxzQkFBYyxVQXBNQTtBQXFNZCxzQkFBYyxVQXJNQTtBQXNNZCxzQkFBYyxVQXRNQTtBQXVNZCxrQkFBVSxZQXZNSTtBQXdNZCxpQkFBUyxZQXhNSztBQXlNZCxrQkFBVSxZQXpNSTtBQTBNZCxrQkFBVSxZQTFNSTtBQTJNZCxrQkFBVSxZQTNNSTtBQTRNZCxpQkFBUyxXQTVNSztBQTZNZCxzQkFBYyxVQTdNQTtBQThNZCxrQkFBVSxZQTlNSTtBQStNZCxpQkFBUyxVQS9NSztBQWdOZCxpQkFBUyxVQWhOSztBQWlOZCxzQkFBYyxVQWpOQTtBQWtOZCxpQkFBUztBQWxOSyxPQUFoQjs7QUFxTkEsVUFBTSxNQUFNLFVBQVUsUUFBVixDQUFtQixXQUFuQixFQUFaO0FBQ0EsYUFBTyxRQUFRLEdBQVIsS0FBZ0IsS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixVQUE1QztBQUNEOzs7Ozs7Ozs7O3dDQU9tQixHLEVBQUs7O0FBRXZCLFVBQUk7QUFDRixlQUFPLGFBQWEsT0FBYixDQUFxQixHQUFyQixDQUFQO0FBQ0QsT0FGRCxDQUVFLE9BQU8sR0FBUCxFQUFZO0FBQ1osZUFBTyxRQUFRLEdBQVIsQ0FBUDtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7b0NBT2UsUyxFQUFXO0FBQ3pCLFVBQU0sWUFBWSxxSEFDYSxLQUFLLEdBQUwsQ0FBUyxNQUFULEVBRGIsaUJBQWxCOztBQUdBLFVBQUksU0FBSixFQUFlO0FBQ2IsZUFBVSxTQUFWLGlFQUErRSxTQUEvRTtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sU0FBUDtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7OztrQ0FTYSxPLEVBQVM7QUFBQTs7QUFDckIsZ0JBQVUsUUFBUSxPQUFSLENBQWdCLFFBQWhCLEVBQTBCLEVBQTFCLENBQVY7QUFDQSxVQUFNLE1BQU0sRUFBRSxRQUFGLEVBQVo7VUFDRSxtQ0FBaUMsT0FEbkM7O0FBR0EsVUFBSSxLQUFLLFFBQUwsQ0FBYyxPQUFkLENBQUosRUFBNEIsT0FBTyxJQUFJLE9BQUosQ0FBWSxLQUFLLFFBQWpCLENBQVA7OztBQUc1QixVQUFJLGNBQWMsTUFBZCxDQUFxQixRQUFyQixDQUFKLEVBQW9DO0FBQ2xDLGFBQUssUUFBTCxDQUFjLE9BQWQsSUFBeUIsY0FBYyxHQUFkLENBQWtCLFFBQWxCLENBQXpCO0FBQ0EsWUFBSSxPQUFKLENBQVksS0FBSyxRQUFqQjtBQUNELE9BSEQsTUFHTzs7QUFFTCxVQUFFLElBQUYsQ0FBTztBQUNMLDRCQUFnQixPQUFoQixtQkFESztBQUVMLGdCQUFNO0FBQ0osb0JBQVEsT0FESjtBQUVKLGtCQUFNLFVBRkY7QUFHSixvQkFBUSxvQkFISjtBQUlKLG9CQUFRO0FBSkosV0FGRDtBQVFMLG9CQUFVO0FBUkwsU0FBUCxFQVNHLElBVEgsQ0FTUSxnQkFBUTtBQUNkLGlCQUFLLFFBQUwsQ0FBYyxPQUFkLElBQXlCLEtBQUssS0FBOUI7OztBQUdBLHdCQUFjLEdBQWQsQ0FBa0IsUUFBbEIsRUFBNEIsT0FBSyxRQUFMLENBQWMsT0FBZCxDQUE1QixFQUFvRCxFQUFDLEtBQUssT0FBTyxFQUFQLEdBQVksRUFBWixHQUFpQixFQUFqQixHQUFzQixDQUE1QixFQUFwRDs7QUFFQSxjQUFJLE9BQUosQ0FBWSxPQUFLLFFBQWpCO0FBQ0QsU0FoQkQsRUFnQkcsSUFoQkgsQ0FnQlEsZ0JBQVE7QUFDZCxjQUFJLE1BQUosQ0FBVyxJQUFYO0FBQ0QsU0FsQkQ7QUFtQkQ7O0FBRUQsYUFBTyxHQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Z0NBT1csTyxFQUFTO0FBQ25CLGFBQU8sS0FBSyxRQUFMLENBQWMsUUFBUSxPQUFSLENBQWdCLFFBQWhCLEVBQTBCLEVBQTFCLENBQWQsQ0FBUDtBQUNEOzs7Ozs7Ozs7bUNBTWM7QUFDYixhQUFPLFVBQVUsU0FBVixHQUFzQixVQUFVLFNBQWhDLEdBQTRDLFNBQW5EO0FBQ0Q7Ozs7Ozs7Ozs7O29DQVFlLEcsRUFBSyxLLEVBQU87O0FBRTFCLFVBQUk7QUFDRixlQUFPLGFBQWEsT0FBYixDQUFxQixHQUFyQixFQUEwQixLQUExQixDQUFQO0FBQ0QsT0FGRCxDQUVFLE9BQU8sR0FBUCxFQUFZO0FBQ1osZUFBTyxRQUFRLEdBQVIsSUFBZSxLQUF0QjtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7NkJBT1EsRyxFQUFLO0FBQ1osYUFBTyxJQUFJLEtBQUosQ0FBVSxFQUFWLEVBQWMsTUFBZCxDQUFxQixVQUFDLFFBQUQsRUFBVyxPQUFYO0FBQUEsZUFDekIsQ0FBQyxZQUFZLENBQWIsSUFBa0IsUUFBbkIsR0FBK0IsUUFBUSxVQUFSLENBQW1CLENBQW5CLENBREw7QUFBQSxPQUFyQixFQUNpRCxDQURqRCxDQUFQO0FBRUQ7Ozs7Ozs7OztpQ0FNWTtBQUNYLGFBQU8sQ0FBQyxLQUFLLFNBQUwsRUFBUjtBQUNEOzs7Ozs7Ozs7Z0NBTVc7QUFDVixhQUFPLENBQUMsV0FBRCxFQUFjLFdBQWQsRUFBMkIsZUFBM0IsRUFBNEMsUUFBNUMsQ0FBcUQsS0FBSyxHQUExRCxDQUFQO0FBQ0Q7Ozs7Ozs7Ozt5Q0FNb0I7QUFDbkIsYUFBTyxJQUFJLE1BQUosYUFBcUIsR0FBRyxpQkFBSCxDQUFxQixJQUFyQixDQUEwQixHQUExQixDQUFyQixRQUF3RCxJQUF4RCxDQUE2RCxLQUFLLE9BQWxFLENBQVA7QUFDRDs7Ozs7Ozs7Ozs7OzsyQ0FVc0IsSyxFQUFPLGUsRUFBaUI7QUFDN0Msc0JBQWdCLE9BQWhCLENBQXdCLHNCQUFjOztBQUVwQyxnQkFBUSxNQUFNLEdBQU4sQ0FBVSxnQkFBUTtBQUN4QixjQUFJLFdBQVcsSUFBWCxLQUFvQixJQUF4QixFQUE4QjtBQUM1QixtQkFBTyxXQUFXLEVBQWxCO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8sSUFBUDtBQUNEO0FBQ0YsU0FOTyxDQUFSO0FBT0QsT0FURDtBQVVBLGFBQU8sS0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkE4Qk8sTSxFQUFRLE8sRUFBMEU7QUFBQSxVQUFqRSxXQUFpRSx1RUFBbkQsVUFBbUQ7QUFBQSxVQUF2QyxPQUF1QztBQUFBLFVBQTlCLEtBQThCLHVFQUF0QixLQUFLLE1BQUwsQ0FBWSxRQUFVOztBQUN4RixVQUFJLENBQUMsU0FBUyxJQUFULENBQWMsT0FBZCxDQUFMLEVBQTZCLFdBQVcsTUFBWDs7QUFFN0IsVUFBTSxNQUFNLEVBQUUsUUFBRixFQUFaO0FBQ0EsVUFBSSxjQUFjO0FBQ2hCLGVBQU87QUFEUyxPQUFsQjs7QUFJQSxVQUFNLGNBQWMsU0FBZCxXQUFjLGdCQUFpQjtBQUNuQyxZQUFJLGNBQWMsT0FBTyxNQUFQLENBQWM7QUFDOUIsa0JBQVEsT0FEc0I7QUFFOUIsa0JBQVEsTUFGc0I7QUFHOUIseUJBQWU7QUFIZSxTQUFkLEVBSWYsTUFKZSxDQUFsQjs7QUFNQSxZQUFJLGFBQUosRUFBbUIsWUFBWSxXQUFaLElBQTJCLGFBQTNCOztBQUVuQixZQUFNLFVBQVUsRUFBRSxJQUFGLENBQU87QUFDckIsNEJBQWdCLE9BQWhCLGVBRHFCO0FBRXJCLGlCQUFPLFVBRmM7QUFHckIsb0JBQVUsT0FIVztBQUlyQixnQkFBTTtBQUplLFNBQVAsQ0FBaEI7O0FBT0EsZ0JBQVEsSUFBUixDQUFhLGdCQUFROztBQUVuQixjQUFJLEtBQUssS0FBVCxFQUFnQixPQUFPLElBQUksT0FBSixDQUFZLElBQVosQ0FBUDs7QUFFaEIsY0FBSSxtQkFBSjs7O0FBR0EsY0FBSSxPQUFPLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakMsd0JBQVksS0FBWixHQUFvQixZQUFZLEtBQVosQ0FBa0IsTUFBbEIsQ0FBeUIsUUFBUSxLQUFLLEtBQWIsQ0FBekIsQ0FBcEI7QUFDQSx5QkFBYSxZQUFZLEtBQVosQ0FBa0IsTUFBbEIsSUFBNEIsS0FBekM7QUFDRCxXQUhELE1BR087O0FBRUwsZ0JBQUksS0FBSyxLQUFMLENBQVcsS0FBZixFQUFzQjtBQUNwQiwwQkFBWSxLQUFaLEdBQW9CLFlBQVksS0FBWixDQUFrQixNQUFsQixDQUF5QixLQUFLLEtBQUwsQ0FBVyxLQUFwQyxDQUFwQjtBQUNEO0FBQ0QsZ0JBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFKLEVBQXlCO0FBQ3ZCLDBCQUFZLE9BQVosSUFBdUIsQ0FBQyxZQUFZLE9BQVosS0FBd0IsRUFBekIsRUFBNkIsTUFBN0IsQ0FBb0MsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFwQyxDQUF2QjtBQUNEOzs7QUFHRCx5QkFBYSxZQUFZLEtBQVosQ0FBa0IsTUFBbEIsSUFBNEIsS0FBNUIsSUFBcUMsWUFBWSxPQUFaLEVBQXFCLE1BQXJCLElBQStCLEtBQWpGO0FBQ0Q7OztBQUdELGNBQUksQ0FBQyxVQUFELElBQWUsS0FBSyxRQUFwQixJQUFnQyxLQUFLLFFBQUwsQ0FBYyxXQUFkLENBQXBDLEVBQWdFO0FBQzlELHVCQUFXLFlBQU07QUFDZiwwQkFBWSxLQUFLLFFBQUwsQ0FBYyxXQUFkLENBQVo7QUFDRCxhQUZELEVBRUcsR0FGSDtBQUdELFdBSkQsTUFJTzs7QUFFTCxnQkFBSSxLQUFLLFFBQVQsRUFBbUIsWUFBWSxRQUFaLEdBQXVCLElBQXZCO0FBQ25CLGdCQUFJLE9BQUosQ0FBWSxXQUFaO0FBQ0Q7QUFDRixTQWpDRCxFQWlDRyxJQWpDSCxDQWlDUSxnQkFBUTtBQUNkLGNBQUksTUFBSixDQUFXLElBQVg7QUFDRCxTQW5DRDtBQW9DRCxPQXBERDs7QUFzREE7O0FBRUEsYUFBTyxHQUFQO0FBQ0Q7Ozs7Ozs7Ozs7O3NCQVFDLEssRUFBTztBQUNQLGFBQVEsSUFBSSxNQUFKLENBQVcsS0FBWCxDQUFELENBQW9CLGNBQXBCLEVBQVA7QUFDRDs7Ozs7Ozs7Ozs7Z0NBUVcsSyxFQUFPO0FBQ2pCLFVBQUksTUFBTSxFQUFFLFFBQUYsRUFBVjs7QUFFQSxhQUFPLEVBQUUsSUFBRixDQUFPO0FBQ1osYUFBSyxhQUFXLEtBQUssT0FBaEIsa0hBQ29DLE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FEcEMsQ0FETztBQUdaLGtCQUFVO0FBSEUsT0FBUCxFQUlKLElBSkksQ0FJQyxnQkFBUTtBQUNkLFlBQUksV0FBVyxFQUFmO0FBQ0EsYUFBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixPQUFqQixDQUF5QixnQkFBUTtBQUMvQixtQkFBUyxLQUFLLEtBQWQsSUFBdUIsSUFBdkI7QUFDRCxTQUZEO0FBR0EsZUFBTyxJQUFJLE9BQUosQ0FBWSxRQUFaLENBQVA7QUFDRCxPQVZNLENBQVA7QUFXRDs7Ozs7Ozs7O3FDQU1nQjtBQUNmLGFBQU8sS0FBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLElBQTdCLENBQWtDLEtBQUssZUFBTCxDQUFxQixTQUF2RCxFQUFrRSxNQUFsRSxJQUE0RSxDQUFuRjtBQUNEOzs7Ozs7Ozs7O3FDQU9nQixVLEVBQVk7QUFDM0IsVUFBTSxNQUFNLFVBQVUsU0FBUyxNQUFULENBQWdCLEtBQWhCLENBQXNCLENBQXRCLENBQVYsQ0FBWjtVQUNFLFNBQVMsSUFBSSxLQUFKLENBQVUsR0FBVixDQURYO0FBRUEsVUFBSSxTQUFTLEVBQWI7O0FBRUEsV0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE9BQU8sTUFBM0IsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsWUFBSSxRQUFRLE9BQU8sQ0FBUCxFQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBWjs7QUFFQSxZQUFJLGNBQWMsTUFBTSxDQUFOLE1BQWEsVUFBL0IsRUFBMkM7QUFDekMsaUJBQU8sVUFBUCxJQUFxQixNQUFNLENBQU4sRUFBUyxLQUFULENBQWUsR0FBZixFQUFvQixNQUFwQixDQUEyQjtBQUFBLG1CQUFTLENBQUMsQ0FBQyxLQUFYO0FBQUEsV0FBM0IsRUFBNkMsTUFBN0MsRUFBckI7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxNQUFNLENBQU4sQ0FBUCxJQUFtQixNQUFNLENBQU4sQ0FBbkI7QUFDRDtBQUNGOztBQUVELGFBQU8sTUFBUDtBQUNEOzs7Ozs7Ozs7OytCQU9VLEcsRUFBSztBQUNkLFVBQUksUUFBSixFQUFjO0FBQ1osVUFBRSxJQUFGLENBQU87QUFDTCxzQkFBVSxRQUFWLGVBQTRCLEtBQUssR0FBakMsVUFBd0MsS0FBSyxPQUFMLElBQWdCLFFBQXhELENBREs7QUFFTCxrQkFBUTtBQUZILFNBQVA7QUFJRDtBQUNGOzs7Ozs7Ozs7cUNBTWdCO0FBQ2YsYUFBTyxLQUFLLFlBQUwsR0FBb0IsUUFBM0I7QUFDRDs7Ozs7Ozs7O21DQU1jO0FBQ2IsVUFBTSxVQUFVLFFBQWhCO1VBQ0UsY0FBYyxRQUFRLElBQVIsQ0FBYSxLQUFLLFlBQWxCLEVBQWdDLGNBQWhDLENBRGhCOzs7QUFJQSxVQUFJO0FBQ0YsVUFBRSxlQUFGLEVBQW1CLElBQW5CLENBQXdCLFVBQXhCLEVBQW9DLFFBQVEsTUFBUixFQUFwQyxFQUNHLElBREgsQ0FDUSxFQUFFLElBQUYsQ0FBTyxjQUFQLEVBQXVCLGNBQWMsSUFBckMsQ0FEUjtBQUVELE9BSEQsQ0FHRSxPQUFPLENBQVAsRUFBVTs7QUFFWDs7QUFFRCxhQUFPLFdBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7OEJBV1MsRSxFQUFJLEssRUFBTyxPLEVBQVM7QUFDNUIsVUFBSSxRQUFRLEVBQVo7VUFBZ0IsY0FBaEI7O0FBRUEsVUFBTSxlQUFlLFNBQWYsWUFBZSxHQUFNO0FBQ3pCLFlBQU0sT0FBTyxNQUFNLEtBQU4sRUFBYjtBQUNBLFlBQUksSUFBSixFQUFVO0FBQ1IsYUFBRyxLQUFILENBQVMsS0FBSyxPQUFkLEVBQXVCLEtBQUssU0FBNUI7QUFDRDtBQUNELFlBQUksTUFBTSxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLHdCQUFjLEtBQWQsR0FBc0IsUUFBUSxJQUE5QjtBQUNEO0FBQ0YsT0FSRDs7QUFVQSxhQUFPLFNBQVMsT0FBVCxHQUFtQjtBQUN4QixjQUFNLElBQU4sQ0FBVztBQUNULG1CQUFTLFdBQVcsSUFEWDtBQUVULHFCQUFXLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxTQUFkO0FBRkYsU0FBWDs7QUFLQSxZQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1YseUI7QUFDQSxrQkFBUSxZQUFZLFlBQVosRUFBMEIsS0FBMUIsQ0FBUjtBQUNEO0FBQ0YsT0FWRDtBQVdEOzs7Ozs7Ozs7O21DQU9jO0FBQ2IsVUFBTSxlQUFlLEVBQUUsS0FBSyxNQUFMLENBQVksWUFBZCxDQUFyQjtBQUNBLG1CQUFhLEdBQWIsQ0FBaUIsUUFBakI7QUFDQSxtQkFBYSxPQUFiLENBQXFCLEtBQXJCLEVBQTRCLElBQTVCO0FBQ0EsbUJBQWEsT0FBYixDQUFxQixNQUFyQixFQUE2QixJQUE3QjtBQUNBLG1CQUFhLE9BQWIsQ0FBcUIsU0FBckI7QUFDQSxXQUFLLFlBQUw7QUFDRDs7Ozs7Ozs7Ozs7O3lCQVNJLEssRUFBTyxLLEVBQU87QUFDakIsYUFBTyxNQUFNLE9BQU4sQ0FBYyxVQUFkLFNBQStCLEtBQS9CLE9BQVA7QUFDRDs7Ozs7Ozs7Ozs7O2dDQVNXLEcsRUFBSyxLLEVBQU87QUFDdEIsV0FBSyxHQUFMLElBQVksS0FBWjtBQUNBLFdBQUssZUFBTCx5QkFBMkMsR0FBM0MsRUFBa0QsS0FBbEQ7QUFDRDs7Ozs7Ozs7OzttQ0FPYztBQUFBOzs7QUFFYixVQUFNLGtCQUFrQixLQUFLLFlBQUwsS0FBc0IsaUJBQTlDOztBQUVBLFFBQUUsSUFBRixDQUFPLEVBQUUsdUJBQUYsQ0FBUCxFQUFtQyxVQUFDLEtBQUQsRUFBUSxFQUFSLEVBQWU7QUFDaEQsWUFBSSxHQUFHLElBQUgsS0FBWSxVQUFoQixFQUE0QjtBQUMxQixpQkFBSyxXQUFMLENBQWlCLEdBQUcsSUFBcEIsRUFBMEIsR0FBRyxPQUFILEdBQWEsTUFBYixHQUFzQixPQUFoRDtBQUNELFNBRkQsTUFFTyxJQUFJLEdBQUcsT0FBUCxFQUFnQjtBQUNyQixpQkFBSyxXQUFMLENBQWlCLEdBQUcsSUFBcEIsRUFBMEIsR0FBRyxLQUE3QjtBQUNEO0FBQ0YsT0FORDs7QUFRQSxVQUFJLEtBQUssR0FBTCxLQUFhLFVBQWpCLEVBQTZCO0FBQzNCLGFBQUssZUFBTCxDQUFxQixNQUFyQixDQUE0QixNQUE1QixHQUFxQyxLQUFLLFVBQTFDO0FBQ0EsYUFBSyxlQUFMLENBQXFCLGFBQXJCOztBQUVBLGFBQUssa0JBQUw7Ozs7Ozs7QUFPQSxZQUFLLEtBQUssWUFBTCxLQUFzQixpQkFBdkIsS0FBOEMsZUFBbEQsRUFBbUU7QUFDakUsZUFBSyxZQUFMO0FBQ0Q7O0FBRUQsWUFBSSxLQUFLLFdBQUwsS0FBcUIsTUFBekIsRUFBaUM7QUFDL0IsWUFBRSx1QkFBRixFQUEyQixJQUEzQixDQUFnQyxTQUFoQyxFQUEyQyxJQUEzQztBQUNEO0FBQ0Y7O0FBRUQsV0FBSyxZQUFMLENBQWtCLElBQWxCO0FBQ0Q7Ozs7Ozs7Ozs7Ozt1Q0FTa0IsSyxFQUFPO0FBQUE7O0FBQ3hCLFlBQU0sT0FBTixDQUFjLGdCQUFRO0FBQ3BCLFlBQU0sY0FBYyxFQUFFLE9BQUYsRUFBVyxJQUFYLENBQWdCLElBQWhCLEVBQXNCLElBQXRCLEVBQXBCO0FBQ0EsVUFBRSxhQUFhLFdBQWIsR0FBMkIsV0FBN0IsRUFBMEMsUUFBMUMsQ0FBbUQsT0FBSyxNQUFMLENBQVksWUFBL0Q7QUFDRCxPQUhEO0FBSUEsUUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLE9BQTVCLENBQW9DLEtBQXBDLEVBQTJDLEtBQTNDO0FBQ0EsUUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLE9BQTVCLENBQW9DLE9BQXBDOztBQUVBLGFBQU8sS0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7O29DQVVlLEksRUFBTTtBQUNwQixVQUFNLGFBQWEsT0FBTyxJQUFQLENBQVksS0FBSyxNQUFMLENBQVksYUFBeEIsRUFBdUMsT0FBdkMsQ0FBK0MsSUFBL0MsQ0FBbkI7QUFDQSxVQUFJLGtCQUFKO1VBQWUsZ0JBQWY7O0FBRUEsVUFBSSxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQUosRUFBOEI7QUFDNUIsWUFBTSxTQUFTLFNBQVMsS0FBSyxPQUFMLENBQWEsU0FBYixFQUF3QixFQUF4QixDQUFULEVBQXNDLEVBQXRDLEtBQTZDLEVBQTVELEM7O0FBRDRCLG9DQUVMLEtBQUssTUFBTCxDQUFZLGFBQVosQ0FBMEIsTUFBMUIsQ0FBaUMsTUFBakMsQ0FGSzs7QUFBQTs7QUFFM0IsaUJBRjJCO0FBRWhCLGVBRmdCO0FBRzdCLE9BSEQsTUFHTyxJQUFJLGNBQWMsQ0FBbEIsRUFBcUI7QUFBQSxtQkFFSCxTQUFTLFFBQVQsR0FBb0IsS0FBSyxNQUFMLENBQVksYUFBWixDQUEwQixNQUExQixFQUFwQixHQUF5RCxLQUFLLE1BQUwsQ0FBWSxhQUFaLENBQTBCLElBQTFCLENBRnREOzs7O0FBQUE7O0FBRXpCLGlCQUZ5QjtBQUVkLGVBRmM7O0FBRzFCLFVBQUUsNkJBQUYsRUFBaUMsRUFBakMsQ0FBb0MsVUFBcEMsRUFBZ0QsT0FBaEQsQ0FBd0QsT0FBeEQ7QUFDRCxPQUpNLE1BSUE7QUFDTDtBQUNEOztBQUVELFdBQUssWUFBTCxHQUFvQjtBQUNsQixlQUFPLElBRFc7QUFFbEIsZUFBVSxVQUFVLE1BQVYsQ0FBaUIsS0FBSyxVQUF0QixDQUFWLFdBQWlELFFBQVEsTUFBUixDQUFlLEtBQUssVUFBcEI7QUFGL0IsT0FBcEI7OztBQU1BLFdBQUssZUFBTCxDQUFxQixTQUFyQixHQUFpQyxTQUFqQztBQUNBLFdBQUssZUFBTCxDQUFxQixVQUFyQixDQUFnQyxPQUFoQzs7QUFFQSxhQUFPLEtBQUssWUFBWjtBQUNEOzs7Ozs7Ozs7Ozt5Q0FRb0I7QUFBQTs7O0FBRW5CLFVBQUksS0FBSyxhQUFULEVBQXdCLEtBQUssYUFBTCxDQUFtQixNQUFuQjs7O0FBR3hCLFdBQUssYUFBTCxHQUFxQixTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBckI7QUFDQSxXQUFLLGFBQUwsQ0FBbUIsV0FBbkIsQ0FBK0IsU0FBUyxjQUFULENBQXdCLEVBQXhCLENBQS9CLEU7QUFDQSxlQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEtBQUssYUFBL0I7OztBQUdBLFdBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsT0FBbkIsQ0FBMkIsVUFBQyxLQUFELEVBQVEsS0FBUixFQUFrQjtBQUMzQyxlQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FBeUIsVUFBekIsOENBQThFLFFBQVEsQ0FBdEYseUJBQTBHLEtBQTFHLG9CQUFnSSxDQUFoSTtBQUNELE9BRkQ7O0FBSUEsYUFBTyxLQUFLLGFBQUwsQ0FBbUIsS0FBMUI7QUFDRDs7Ozs7Ozs7OztxQ0FPZ0I7QUFBQTs7O0FBRWYsUUFBRSxhQUFGLEVBQWlCLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCO0FBQUEsZUFBSyxFQUFFLGNBQUYsRUFBTDtBQUFBLE9BQTdCOzs7QUFHQSxRQUFFLGVBQUYsRUFBbUIsRUFBbkIsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQixJQUFwQixDQUEvQjtBQUNBLFFBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQWhDOzs7QUFHQSxRQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsRUFBNEIsRUFBNUIsQ0FBK0IsU0FBL0IsRUFBMEMsWUFBVztBQUNuRCxhQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQXFCLEtBQUssS0FBMUI7QUFDRCxPQUZEO0FBR0EsUUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLEVBQTVCLENBQStCLFFBQS9CLEVBQXlDO0FBQUEsZUFBSyxPQUFLLGVBQUwsQ0FBcUIsQ0FBckIsQ0FBTDtBQUFBLE9BQXpDO0FBQ0Q7Ozs7Ozs7Ozt5Q0FNb0I7O0FBRW5CLFdBQUssY0FBTDs7O0FBR0EsUUFBRSxvQkFBRixFQUF3QixFQUF4QixDQUEyQixPQUEzQixFQUFvQyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBcEM7QUFDQSxRQUFFLHNCQUFGLEVBQTBCLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixJQUF6QixDQUF0QztBQUNEOzs7Ozs7Ozs7NkNBTXdCO0FBQUE7O0FBQ3ZCLFVBQU0sb0JBQW9CLEVBQUUsS0FBSyxNQUFMLENBQVksaUJBQWQsQ0FBMUI7Ozs7Ozs7QUFPQSxVQUFJLFNBQVMsRUFBYjtBQUNBLGFBQU8sSUFBUCxDQUFZLEtBQUssTUFBTCxDQUFZLGFBQXhCLEVBQXVDLE9BQXZDLENBQStDLGVBQU87QUFDcEQsWUFBSSxRQUFRLFFBQVosRUFBc0IsTztBQUN0QixlQUFPLEVBQUUsSUFBRixDQUFPLEdBQVAsQ0FBUCxJQUFzQixPQUFLLE1BQUwsQ0FBWSxhQUFaLENBQTBCLEdBQTFCLENBQXRCO0FBQ0QsT0FIRDs7QUFLQSxVQUFJLG9CQUFvQjtBQUN0QixnQkFBUTtBQUNOLGtCQUFRLEtBQUssVUFEUDtBQUVOLHNCQUFZLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FGTjtBQUdOLHVCQUFhLEVBQUUsSUFBRixDQUFPLFFBQVAsQ0FIUDtBQUlOLDRCQUFrQixFQUFFLElBQUYsQ0FBTyxjQUFQLENBSlo7QUFLTixzQkFBWSxDQUNWLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FEVSxFQUVWLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FGVSxFQUdWLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FIVSxFQUlWLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FKVSxFQUtWLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FMVSxFQU1WLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FOVSxFQU9WLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FQVSxDQUxOO0FBY04sc0JBQVksQ0FDVixFQUFFLElBQUYsQ0FBTyxTQUFQLENBRFUsRUFFVixFQUFFLElBQUYsQ0FBTyxVQUFQLENBRlUsRUFHVixFQUFFLElBQUYsQ0FBTyxPQUFQLENBSFUsRUFJVixFQUFFLElBQUYsQ0FBTyxPQUFQLENBSlUsRUFLVixFQUFFLElBQUYsQ0FBTyxLQUFQLENBTFUsRUFNVixFQUFFLElBQUYsQ0FBTyxNQUFQLENBTlUsRUFPVixFQUFFLElBQUYsQ0FBTyxNQUFQLENBUFUsRUFRVixFQUFFLElBQUYsQ0FBTyxRQUFQLENBUlUsRUFTVixFQUFFLElBQUYsQ0FBTyxXQUFQLENBVFUsRUFVVixFQUFFLElBQUYsQ0FBTyxTQUFQLENBVlUsRUFXVixFQUFFLElBQUYsQ0FBTyxVQUFQLENBWFUsRUFZVixFQUFFLElBQUYsQ0FBTyxVQUFQLENBWlU7QUFkTixTQURjO0FBOEJ0QixtQkFBVyxTQUFTLFFBQVQsQ0FBa0IsS0FBSyxNQUFMLENBQVksT0FBOUIsRUFBdUMsTUFBdkMsQ0E5Qlc7QUErQnRCLGlCQUFTLEtBQUssTUFBTCxDQUFZLE9BL0JDO0FBZ0N0QixpQkFBUyxLQUFLLE1BQUwsQ0FBWSxPQWhDQztBQWlDdEIsZ0JBQVE7QUFqQ2MsT0FBeEI7O0FBb0NBLFVBQUksS0FBSyxNQUFMLENBQVksU0FBaEIsRUFBMkIsa0JBQWtCLFNBQWxCLEdBQThCLEVBQUUsTUFBTSxLQUFLLE1BQUwsQ0FBWSxTQUFwQixFQUE5Qjs7QUFFM0Isd0JBQWtCLGVBQWxCLENBQWtDLGlCQUFsQzs7O0FBR0EsUUFBRSxrQkFBRixFQUFzQixNQUF0QixDQUNFLEVBQUUsT0FBRixFQUNHLFFBREgsQ0FDWSxrQkFEWixFQUVHLElBRkgsQ0FFUSxFQUFFLElBQUYsQ0FBTyxhQUFQLEVBQXNCLFNBQVMsS0FBL0IsRUFDSixrRUFESSxFQUVELEVBQUUsSUFBRixDQUFPLE1BQVAsQ0FGQyxXQUZSLENBREY7Ozs7Ozs7OztBQWdCQSxRQUFFLDZCQUFGLEVBQWlDLEVBQWpDLENBQW9DLE9BQXBDLEVBQTZDLGFBQUs7QUFDaEQsWUFBTSxRQUFRLEVBQUUsNkJBQUYsRUFBaUMsS0FBakMsQ0FBdUMsRUFBRSxNQUF6QyxDQUFkO1lBQ0UsWUFBWSxPQUFLLGVBQUwsQ0FBcUIsU0FEbkM7WUFFRSxTQUFTLFVBQVUsSUFBVixDQUFlLDhCQUFmLENBRlg7QUFHQSxlQUFLLFlBQUwsR0FBb0I7QUFDbEIsaUJBQU8sT0FBTyxJQUFQLENBQVksT0FBSyxNQUFMLENBQVksYUFBeEIsRUFBdUMsS0FBdkMsQ0FEVztBQUVsQixpQkFBVSxPQUFPLENBQVAsRUFBVSxLQUFwQixXQUErQixPQUFPLENBQVAsRUFBVTtBQUZ2QixTQUFwQjtBQUlELE9BUkQ7O0FBVUEsUUFBRSxLQUFLLE1BQUwsQ0FBWSxpQkFBZCxFQUFpQyxFQUFqQyxDQUFvQyx1QkFBcEMsRUFBNkQsVUFBQyxDQUFELEVBQUksTUFBSixFQUFlO0FBQzFFLFlBQUksT0FBTyxXQUFQLEtBQXVCLEVBQUUsSUFBRixDQUFPLGNBQVAsQ0FBM0IsRUFBbUQ7QUFDakQsaUJBQUssWUFBTCxHQUFvQixJQUFwQjs7O0FBR0EsaUJBQUssZUFBTCxDQUFxQixhQUFyQjtBQUNEO0FBQ0YsT0FQRDtBQVFEOzs7b0NBRWUsTSxFQUFRO0FBQUE7O0FBQ3RCLFdBQUssYUFBTDtBQUNBLGFBQU8sT0FBUCxDQUFlLGlCQUFTO0FBQ3RCLGVBQUssWUFBTCxjQUNhLEVBQUUsSUFBRixDQUFPLGFBQVAsQ0FEYix5QkFDc0QsS0FEdEQsY0FFRSxPQUZGO0FBSUQsT0FMRDs7QUFPQSxVQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNkLGNBQU0sT0FBTyxDQUFQLENBQU47QUFDRCxPQUZELE1BRU8sSUFBSSxVQUFVLE9BQU8sQ0FBUCxDQUFWLElBQXVCLE9BQU8sQ0FBUCxFQUFVLEtBQXJDLEVBQTRDO0FBQ2pELFVBQUUsSUFBRixDQUFPO0FBQ0wsa0JBQVEsTUFESDtBQUVMLGVBQUssdUNBRkE7QUFHTCxnQkFBTTtBQUNKLHFCQUFTLHdCQUNTLFNBQVMsR0FBVCxHQUFlLE1BQWYsRUFEVCx1QkFFUyxLQUFLLEdBRmQsdUJBR1MsUUFIVCx1QkFJUyxLQUFLLFNBSmQsdUJBS1MsU0FBUyxRQUFULENBQWtCLElBTDNCLHVCQU1TLEtBQUssWUFBTCxFQU5ULHVCQU9TLE9BQU8sQ0FBUCxFQUFVLEtBUG5CLENBREw7O0FBVUoseURBQTJDLE9BQU8sQ0FBUDtBQVZ2QztBQUhELFNBQVAsRUFlRyxJQWZILENBZVEsZ0JBQVE7QUFDZCxjQUFJLFFBQVEsS0FBSyxNQUFiLElBQXVCLEtBQUssTUFBTCxDQUFZLFVBQXZDLEVBQW1EO0FBQ2pELG1CQUFLLFlBQUwsQ0FDRSxFQUFFLElBQUYsQ0FBTyxxQkFBUCxFQUE4QixPQUFLLGVBQUwsQ0FBcUIsS0FBSyxNQUFMLENBQVksVUFBakMsQ0FBOUIsQ0FERixFQUVFLE9BRkY7QUFJRCxXQUxELE1BS087QUFDTCxtQkFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8scUJBQVAsRUFBOEIsT0FBSyxlQUFMLEVBQTlCLENBREYsRUFFRSxPQUZGO0FBSUQ7QUFDRixTQTNCRCxFQTJCRyxJQTNCSCxDQTJCUSxZQUFNO0FBQ1osaUJBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLHFCQUFQLEVBQThCLE9BQUssZUFBTCxFQUE5QixDQURGLEVBRUUsT0FGRjtBQUlELFNBaENEO0FBaUNEO0FBQ0Y7Ozs7Ozs7Ozs2QkFNUTtBQUNQLFVBQU0sUUFBUSxvRUFBZDtBQUNBLGNBQVEsR0FBUixDQUFZLGdGQUFaLEVBQThGLEtBQTlGO0FBQ0EsY0FBUSxHQUFSLENBQVksaUZBQVosRUFBK0YsS0FBL0Y7QUFDQSxjQUFRLEdBQVIsQ0FBWSxtRkFBWixFQUFpRyxLQUFqRztBQUNBLGNBQVEsR0FBUixDQUFZLHNGQUFaLEVBQW9HLEtBQXBHO0FBQ0EsY0FBUSxHQUFSLENBQVksZ0ZBQVosRUFBOEYsS0FBOUY7QUFDQSxjQUFRLEdBQVIsQ0FBWSx5RkFBWixFQUF1RyxLQUF2RztBQUNBLGNBQVEsR0FBUixDQUFZLGdGQUFaLEVBQThGLEtBQTlGO0FBQ0EsY0FBUSxHQUFSLENBQVksaUZBQVosRUFBK0YsS0FBL0Y7QUFDQSxjQUFRLEdBQVIsQ0FBWSxtRkFBWixFQUFpRyxLQUFqRztBQUNBLGNBQVEsR0FBUixDQUFZLGlGQUFaLEVBQStGLEtBQS9GO0FBQ0EsY0FBUSxHQUFSLENBQVksZ0ZBQVosRUFBOEYsS0FBOUY7QUFDQSxjQUFRLEdBQVIsQ0FBWSx5RkFBWixFQUF1RyxLQUF2RztBQUNBLGNBQVEsR0FBUixDQUFZLGdGQUFaLEVBQThGLEtBQTlGO0FBQ0EsY0FBUSxHQUFSLHNCQUErQixJQUFJLElBQUosR0FBVyxXQUFYLEVBQS9CLGlFQUFxSCxLQUFySDtBQUNEOzs7Ozs7Ozs7a0NBTWE7QUFBQTs7QUFDWixRQUFFLGtCQUFGLEVBQXNCLFFBQXRCLENBQStCLFNBQS9CO0FBQ0EsbUJBQWEsS0FBSyxPQUFsQjs7QUFFQSxXQUFLLE9BQUwsR0FBZSxXQUFXLGVBQU87QUFDL0IsZ0JBQUssU0FBTDtBQUNBLGdCQUFLLFlBQUwsY0FBNkIsRUFBRSxJQUFGLENBQU8sYUFBUCxDQUE3Qiw0QkFDSSxFQUFFLElBQUYsQ0FBTyxpQkFBUCxDQURKLGtCQUVJLEVBQUUsSUFBRixDQUFPLHFCQUFQLEVBQThCLFFBQUssZUFBTCxFQUE5QixDQUZKLGVBR0csT0FISCxFQUdZLENBSFo7QUFJRCxPQU5jLEVBTVosS0FBSyxJQU5PLENBQWY7QUFPRDs7Ozs7Ozs7O2lDQU1ZO0FBQ1gsUUFBRSxrQkFBRixFQUFzQixXQUF0QixDQUFrQyxTQUFsQztBQUNBLG1CQUFhLEtBQUssT0FBbEI7QUFDRDs7Ozs7Ozs7Ozs7d0NBUW1CLEssRUFBTztBQUN6QixhQUFPLE1BQU0sR0FBTixDQUFVLGdCQUFRO0FBQ3ZCLGVBQU8sbUJBQW1CLElBQW5CLEVBQXlCLEtBQXpCLEVBQVA7QUFDRCxPQUZNLENBQVA7QUFHRDs7Ozs7Ozs7OzBDQU1xQjtBQUFBOztBQUNwQixRQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLFVBQUMsQ0FBRCxFQUFJLElBQUosRUFBYTtBQUNwQyxZQUFJLE1BQU0sS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixHQUFoQixFQUFxQixDQUFyQixDQUFWOztBQUVBLFlBQUksS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QiwwQkFBeEIsQ0FBSixFQUF5RDtBQUN2RCxlQUFLLElBQUwsR0FBZSxHQUFmLGVBQTRCLFFBQUssT0FBTCxDQUFhLE1BQWIsRUFBNUI7QUFDRCxTQUZELE1BRU87QUFDTCxlQUFLLElBQUwsR0FBZSxHQUFmLGlCQUE4QixRQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQTlCO0FBQ0Q7QUFDRixPQVJEO0FBU0Q7Ozs7Ozs7Ozs7O21DQVFjLE0sRUFBUTtBQUFBOztBQUNyQixXQUFLLE1BQUwsQ0FBWSxjQUFaLENBQTJCLE9BQTNCLENBQW1DLG9CQUFZO0FBQzdDLFlBQUksYUFBYSxTQUFiLElBQTBCLE9BQU8sT0FBckMsRUFBOEM7QUFDNUMsaUJBQU8sT0FBUCxHQUFpQixPQUFPLE9BQVAsQ0FBZSxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLEVBQWpDLENBQWpCO0FBQ0Q7O0FBRUQsWUFBTSxlQUFlLFFBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsUUFBckIsQ0FBckI7WUFDRSxhQUFhLE9BQU8sUUFBUCxDQURmOztBQUdBLFlBQUksZ0JBQWdCLENBQUMsUUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixRQUF4QixFQUFrQyxRQUFsQyxDQUEyQyxVQUEzQyxDQUFyQixFQUE2RTs7QUFFM0UsY0FBSSxDQUFDLENBQUMsVUFBTixFQUFrQjtBQUNoQixvQkFBSyxxQkFBTCxDQUEyQixRQUEzQjtBQUNEOztBQUVELGlCQUFPLFFBQVAsSUFBbUIsWUFBbkI7QUFDRDtBQUNGLE9BaEJEOztBQWtCQSxhQUFPLE1BQVA7QUFDRDs7Ozs7Ozs7Ozs7c0NBUXFDO0FBQUEsVUFBdEIsWUFBc0IsdUVBQVAsS0FBTzs7QUFDcEMsVUFBTSxlQUFlLEVBQUUsS0FBSyxNQUFMLENBQVksWUFBZCxFQUE0QixDQUE1QixDQUFyQjtBQUNBLFVBQUksVUFBVSxhQUFhLEtBQWIsQ0FBbUIsT0FBbkIsQ0FBMkIsUUFBM0IsRUFBcUMsRUFBckMsQ0FBZDtVQUNFLFFBQVEsS0FEVjs7QUFHQSxVQUFJLGdCQUFnQixDQUFDLEtBQUssa0JBQUwsRUFBckIsRUFBZ0Q7QUFDOUMsYUFBSyxZQUFMLENBQ0UsRUFBRSxJQUFGLENBQU8sc0JBQVAsbUJBQTZDLFFBQVEsTUFBUixFQUE3QyxXQUFrRSxRQUFRLE1BQVIsRUFBbEUsVUFERixFQUVFLFNBRkY7QUFJQSxrQkFBVSxhQUFhLE9BQWIsQ0FBcUIsS0FBL0I7QUFDRCxPQU5ELE1BTU8sSUFBSSxZQUFZLFFBQVosQ0FBcUIsT0FBckIsQ0FBSixFQUFtQztBQUN4QyxhQUFLLGFBQUw7QUFDQSxhQUFLLG1CQUFMO0FBQ0EsZ0JBQVEsSUFBUjtBQUNELE9BSk0sTUFJQTtBQUNMLGFBQUssWUFBTCxDQUNFLEVBQUUsSUFBRixDQUFPLGlCQUFQLG1CQUF3QyxRQUFRLE1BQVIsRUFBeEMsV0FBNkQsUUFBUSxNQUFSLEVBQTdELFVBREYsRUFFRSxTQUZGO0FBSUEsa0JBQVUsYUFBYSxPQUFiLENBQXFCLEtBQS9CO0FBQ0Q7O0FBRUQsbUJBQWEsS0FBYixHQUFxQixPQUFyQjs7QUFFQSxhQUFPLEtBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7aUNBV1ksTyxFQUE0QztBQUFBLFVBQW5DLEtBQW1DLHVFQUEzQixTQUEyQjtBQUFBLFVBQWhCLE9BQWdCLHVFQUFOLElBQU07O0FBQ3ZELGFBQU8sT0FBUCxDQUFlLE9BQWYsR0FBeUIsT0FBekI7QUFDQSxhQUFPLEtBQVAsRUFBYyxPQUFkO0FBQ0Q7Ozt3QkF6dkNnQjtBQUNmLFVBQUksS0FBSyxrQkFBTCxLQUE0QixNQUFoQyxFQUF3QztBQUN0QyxlQUFPLEtBQUssbUJBQUwsRUFBUDtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sS0FBSyxNQUFMLENBQVksUUFBWixDQUFxQixVQUE1QjtBQUNEO0FBQ0Y7Ozs7Ozs7Ozt3QkFNcUI7QUFDcEIsYUFBTyxFQUFFLEtBQUssTUFBTCxDQUFZLGlCQUFkLEVBQWlDLElBQWpDLENBQXNDLGlCQUF0QyxDQUFQO0FBQ0Q7Ozt3QkE0SmE7QUFDWixVQUFNLFVBQVUsRUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLEdBQTVCLEVBQWhCOztBQUVBLGFBQU8sVUFBVSxRQUFRLFdBQVIsR0FBc0IsT0FBdEIsQ0FBOEIsT0FBOUIsRUFBdUMsRUFBdkMsQ0FBVixHQUF1RCxJQUE5RDtBQUNEOzs7d0JBc1k4QjtBQUM3QixhQUFPLENBQ0wsV0FESyxFQUVMLFdBRkssRUFHTCxVQUhLLEVBSUwsV0FKSyxFQUtMLFlBTEssRUFNTCxhQU5LLEVBT0wsWUFQSyxDQUFQO0FBU0Q7Ozs7RUExdkJjLFE7O0FBdzdDakIsT0FBTyxPQUFQLEdBQWlCLEVBQWpCOzs7Ozs7Ozs7Ozs7Ozs7O0FDajhDQSxJQUFNLFVBQVUsUUFBUSxZQUFSLENBQWhCO0FBQ0EsSUFBTSxjQUFjLE9BQU8sSUFBUCxDQUFZLE9BQVosRUFBcUIsR0FBckIsQ0FBeUI7QUFBQSxTQUFPLFFBQVEsR0FBUixDQUFQO0FBQUEsQ0FBekIsQ0FBcEI7Ozs7Ozs7SUFNTSxRO0FBQ0osc0JBQWM7QUFBQTs7QUFBQTs7QUFDWixRQUFJLE9BQU8sSUFBWDtBQUNBLFFBQU0sa0JBQWtCLFNBQWxCLGVBQWtCLFFBQVM7QUFDL0IsVUFBTSxZQUFZLE9BQU8sS0FBUCxFQUFjLE1BQUssVUFBbkIsRUFBK0IsT0FBL0IsRUFBbEI7QUFDQSxVQUFJLFlBQVksQ0FBaEIsRUFBbUI7QUFDakIsZUFBTyxLQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsc0JBQVksS0FBWjtBQUNEO0FBQ0YsS0FQRDs7QUFTQSxTQUFLLE1BQUwsR0FBYztBQUNaLGdCQUFVLElBREU7QUFFWixtQkFBYSxFQUZEO0FBR1osWUFBTSxDQUFDLFdBQUQsRUFBYyxVQUFkLEVBQTBCLFdBQTFCLEVBQXVDLFdBQXZDLEVBQW9ELFdBQXBELEVBQWlFLGVBQWpFLENBSE07QUFJWixtQkFBYTtBQUNYLGNBQU07QUFDSixnQkFBTTtBQUNKLG9CQUFRO0FBQ04scUJBQU8sQ0FBQztBQUNOLHVCQUFPO0FBQ0wsNEJBQVU7QUFBQSwyQkFBUyxNQUFLLGlCQUFMLENBQXVCLEtBQXZCLENBQVQ7QUFBQTtBQURMO0FBREQsZUFBRCxDQUREO0FBTU4scUJBQU8sQ0FBQztBQUNOLHVCQUFPO0FBQ0wsNEJBQVUseUJBQVM7QUFDakIsMkJBQU8sZ0JBQWdCLEtBQWhCLENBQVA7QUFDRDtBQUhJO0FBREQsZUFBRDtBQU5ELGFBREo7QUFlSiw0QkFBZ0I7QUFBQSxxQkFBUyxNQUFLLE1BQUwsQ0FBWSxXQUFaLENBQXdCLElBQXhCLENBQVQ7QUFBQSxhQWZaO0FBZ0JKLHNCQUFVLEtBQUs7QUFoQlgsV0FERjtBQW1CSixpQkFuQkksbUJBbUJJLEtBbkJKLEVBbUJXO0FBQ2IsbUJBQU87QUFDTCwwQkFESztBQUVMLCtCQUFpQixlQUZaO0FBR0wsMkJBQWEsQ0FIUjtBQUlMLDJCQUFhLEtBSlI7QUFLTCwwQkFBWSxLQUxQO0FBTUwsb0NBQXNCLEtBTmpCO0FBT0wsZ0NBQWtCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakIsQ0FQYjtBQVFMLHlDQUEyQixLQVJ0QjtBQVNMLHFDQUF1QixLQVRsQjtBQVVMLHFDQUF1QixDQVZsQjtBQVdMLGdDQUFrQixDQVhiO0FBWUwsdUJBQVMsS0FBSyxXQUFMLEtBQXFCLE1BQXJCLEdBQThCLEdBQTlCLEdBQW9DO0FBWnhDLGFBQVA7QUFjRDtBQWxDRyxTQURLO0FBcUNYLGFBQUs7QUFDSCxnQkFBTTtBQUNKLG9CQUFRO0FBQ04scUJBQU8sQ0FBQztBQUNOLHVCQUFPO0FBQ0wsNEJBQVU7QUFBQSwyQkFBUyxNQUFLLGlCQUFMLENBQXVCLEtBQXZCLENBQVQ7QUFBQTtBQURMO0FBREQsZUFBRCxDQUREO0FBTU4scUJBQU8sQ0FBQztBQUNOLCtCQUFlLEdBRFQ7QUFFTixvQ0FBb0IsSUFGZDtBQUdOLHVCQUFPO0FBQ0wsNEJBQVUseUJBQVM7QUFDakIsMkJBQU8sZ0JBQWdCLEtBQWhCLENBQVA7QUFDRDtBQUhJO0FBSEQsZUFBRDtBQU5ELGFBREo7QUFpQkosNEJBQWdCO0FBQUEscUJBQVMsTUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixJQUF4QixDQUFUO0FBQUEsYUFqQlo7QUFrQkosc0JBQVUsS0FBSztBQWxCWCxXQURIO0FBcUJILGlCQXJCRyxtQkFxQkssS0FyQkwsRUFxQlk7QUFDYixtQkFBTztBQUNMLDBCQURLO0FBRUwsK0JBQWlCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakIsQ0FGWjtBQUdMLDJCQUFhLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakIsQ0FIUjtBQUlMLDJCQUFhLENBSlI7QUFLTCxvQ0FBc0IsS0FBSyxJQUFMLENBQVUsS0FBVixFQUFpQixJQUFqQixDQUxqQjtBQU1MLGdDQUFrQjtBQU5iLGFBQVA7QUFRRDtBQTlCRSxTQXJDTTtBQXFFWCxlQUFPO0FBQ0wsZ0JBQU07QUFDSixtQkFBTztBQUNMLHFCQUFPO0FBQ0wsMEJBQVU7QUFBQSx5QkFBUyxNQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBVDtBQUFBO0FBREw7QUFERixhQURIO0FBTUosNEJBQWdCO0FBQUEscUJBQVMsTUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixJQUF4QixDQUFUO0FBQUEsYUFOWjtBQU9KLHNCQUFVLEtBQUs7QUFQWCxXQUREO0FBVUwsaUJBVkssbUJBVUcsS0FWSCxFQVVVO0FBQ2IsbUJBQU87QUFDTCwwQkFESztBQUVMLCtCQUFpQixLQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEdBQWpCLENBRlo7QUFHTCwyQkFBYSxLQUhSO0FBSUwsMkJBQWEsQ0FKUjtBQUtMLG9DQUFzQixLQUxqQjtBQU1MLGdDQUFrQixLQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEdBQWpCLENBTmI7QUFPTCx5Q0FBMkIsS0FQdEI7QUFRTCxxQ0FBdUIsS0FSbEI7QUFTTCxnQ0FBa0I7QUFUYixhQUFQO0FBV0Q7QUF0QkksU0FyRUk7QUE2RlgsYUFBSztBQUNILGdCQUFNO0FBQ0osNEJBQWdCO0FBQUEscUJBQVMsTUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixJQUF4QixDQUFUO0FBQUEsYUFEWjtBQUVKLHNCQUFVLEtBQUs7QUFGWCxXQURIO0FBS0gsaUJBTEcsbUJBS0ssS0FMTCxFQUtZO0FBQ2IsbUJBQU87QUFDTCwwQkFESztBQUVMLCtCQUFpQixLQUZaO0FBR0wsb0NBQXNCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakI7QUFIakIsYUFBUDtBQUtEO0FBWEUsU0E3Rk07QUEwR1gsa0JBQVU7QUFDUixnQkFBTTtBQUNKLDRCQUFnQjtBQUFBLHFCQUFTLE1BQUssTUFBTCxDQUFZLFdBQVosQ0FBd0IsSUFBeEIsQ0FBVDtBQUFBLGFBRFo7QUFFSixzQkFBVSxLQUFLO0FBRlgsV0FERTtBQUtSLGlCQUxRLG1CQUtBLEtBTEEsRUFLTztBQUNiLG1CQUFPO0FBQ0wscUJBQU8sS0FERjtBQUVMLCtCQUFpQixLQUZaO0FBR0wsb0NBQXNCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakI7QUFIakIsYUFBUDtBQUtEO0FBWE8sU0ExR0M7QUF1SFgsbUJBQVc7QUFDVCxnQkFBTTtBQUNKLG1CQUFPO0FBQ0wscUJBQU87QUFDTCw2QkFBYSxJQURSO0FBRUwsMEJBQVU7QUFBQSx5QkFBUyxNQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBVDtBQUFBO0FBRkw7QUFERixhQURIO0FBT0osNEJBQWdCO0FBQUEscUJBQVMsTUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixJQUF4QixDQUFUO0FBQUEsYUFQWjtBQVFKLHNCQUFVLEtBQUs7QUFSWCxXQURHO0FBV1QsaUJBWFMsbUJBV0QsS0FYQyxFQVdNO0FBQ2IsbUJBQU87QUFDTCxxQkFBTyxLQURGO0FBRUwsK0JBQWlCLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBaUIsR0FBakIsQ0FGWjtBQUdMLG9DQUFzQixLQUFLLElBQUwsQ0FBVSxLQUFWLEVBQWlCLEdBQWpCO0FBSGpCLGFBQVA7QUFLRDtBQWpCUTtBQXZIQSxPQUpEO0FBK0laLHNCQUFnQixDQUFDLEtBQUQsRUFBUSxVQUFSLEVBQW9CLFdBQXBCLENBL0lKO0FBZ0paLGNBQVEsQ0FBQyx3QkFBRCxFQUEyQix3QkFBM0IsRUFBcUQsd0JBQXJELEVBQStFLHdCQUEvRSxFQUF5Ryx3QkFBekcsRUFBbUksd0JBQW5JLEVBQTZKLHdCQUE3SixFQUF1TCx3QkFBdkwsRUFBaU4sd0JBQWpOLEVBQTJPLHdCQUEzTyxDQWhKSTtBQWlKWixnQkFBVTtBQUNSLHNCQUFjLGNBRE47QUFFUixtQkFBVztBQUFBLGlCQUFlLGNBQWMsQ0FBZCxHQUFrQixNQUFsQixHQUEyQixLQUExQztBQUFBLFNBRkg7QUFHUixvQkFBWSxZQUhKO0FBSVIsNEJBQW9CLE1BSlo7QUFLUiw2QkFBcUIsTUFMYjtBQU1SLHFCQUFhLE9BTkw7QUFPUiwwQkFBa0IsTUFQVjtBQVFSLHFCQUFhLE9BUkw7QUFTUix1QkFBZSxNQVRQO0FBVVIsZUFBTyxNQVZDO0FBV1Isa0JBQVUsWUFYRjtBQVlSLGlCQUFTO0FBWkQsT0FqSkU7QUErSlosdUJBQWlCO0FBQ2YsbUJBQVc7QUFDVCxvQkFBVSxHQUREO0FBRVQsa0JBQVE7QUFGQyxTQURJO0FBS2YsZUFBTztBQUNMLDZCQUFtQjtBQURkLFNBTFE7QUFRZixnQkFBUTtBQUNOLG1CQUFTO0FBREg7QUFSTyxPQS9KTDtBQTJLWixvQkFBYyxDQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLE9BQWhCLENBM0tGO0FBNEtaLGtCQUFZO0FBQ1YsZ0JBQVE7QUFDTixpQkFBTyxDQUFDO0FBQ04sbUJBQU87QUFDTCx3QkFBVTtBQUFBLHVCQUFTLE1BQUssWUFBTCxDQUFrQixLQUFsQixDQUFUO0FBQUE7QUFETDtBQURELFdBQUQ7QUFERCxTQURFO0FBUVYsd0JBQWdCO0FBQUEsaUJBQVMsTUFBSyxNQUFMLENBQVksV0FBWixDQUF3QixNQUFNLElBQU4sQ0FBVyxRQUFuQyxFQUE2QyxJQUE3QyxDQUFUO0FBQUE7QUFSTixPQTVLQTtBQXNMWixlQUFTLEVBdExHO0FBdUxaLGVBQVMsT0FBTyxZQUFQLEVBQXFCLE9BQXJCLENBQTZCLEtBQTdCLENBdkxHO0FBd0xaLGVBQVMsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQXFCLE1BQXJCLEVBQTZCLE9BQTdCLENBQXFDLEtBQXJDLENBeExHO0FBeUxaLHFCQUFlO0FBQ2IscUJBQWEsQ0FBQyxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsTUFBckIsRUFBNkIsT0FBN0IsQ0FBcUMsTUFBckMsQ0FBRCxFQUErQyxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsTUFBckIsRUFBNkIsS0FBN0IsQ0FBbUMsTUFBbkMsQ0FBL0MsQ0FEQTtBQUViLHNCQUFjLENBQUMsU0FBUyxPQUFULENBQWlCLE9BQWpCLENBQUQsRUFBNEIsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQXFCLE1BQXJCLEVBQTZCLE9BQTdCLENBQXFDLEtBQXJDLENBQTVCLENBRkQ7QUFHYixzQkFBYyxDQUFDLFNBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFxQixPQUFyQixFQUE4QixPQUE5QixDQUFzQyxPQUF0QyxDQUFELEVBQWlELFNBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFxQixPQUFyQixFQUE4QixLQUE5QixDQUFvQyxPQUFwQyxDQUFqRCxDQUhEO0FBSWIsY0FKYSxvQkFJd0I7QUFBQSxjQUE5QixNQUE4Qix1RUFBckIsS0FBSyxNQUFMLENBQVksT0FBUzs7QUFDbkMsaUJBQU8sQ0FBQyxTQUFTLFFBQVQsQ0FBa0IsTUFBbEIsRUFBMEIsTUFBMUIsRUFBa0MsT0FBbEMsQ0FBMEMsS0FBMUMsQ0FBRCxFQUFtRCxLQUFLLE1BQUwsQ0FBWSxPQUEvRCxDQUFQO0FBQ0Q7QUFOWSxPQXpMSDtBQWlNWix1QkFBaUIsWUFqTUw7QUFrTVosbUJBQWE7QUFDWCxlQUFPLENBQUMsWUFBRCxFQUFlLE1BQWYsRUFBdUIsUUFBdkIsRUFBaUMsS0FBakMsQ0FESTtBQUVYLGtCQUFVLENBQUMsWUFBRCxFQUFlLFNBQWYsRUFBMEIsWUFBMUIsRUFBd0MsWUFBeEMsQ0FGQztBQUdYLGlCQUFTO0FBSEU7QUFsTUQsS0FBZDtBQXdNRDs7Ozt3QkFFb0I7QUFBQTs7QUFDbkIsYUFBTztBQUNMLGNBQU0sT0FERDtBQUVMLG1CQUFXO0FBQ1QsaUJBQU8sNEJBQWU7QUFDcEIsZ0JBQUksT0FBTyxLQUFQLENBQWEsWUFBWSxNQUF6QixDQUFKLEVBQXNDO0FBQ3BDLHFCQUFPLE1BQU0sRUFBRSxJQUFGLENBQU8sU0FBUCxDQUFiO0FBQ0QsYUFGRCxNQUVPO0FBQ0wscUJBQU8sTUFBTSxPQUFLLFlBQUwsQ0FBa0IsWUFBWSxNQUE5QixDQUFiO0FBQ0Q7QUFDRjtBQVBRLFNBRk47QUFXTCxzQkFBYyxFQVhUO0FBWUwscUJBQWEsQ0FaUjtBQWFMLG1CQUFXLENBYk47QUFjTCx1QkFBZTtBQWRWLE9BQVA7QUFnQkQ7Ozt3QkFFc0I7QUFBQTs7QUFDckIsYUFBTztBQUNMLG1CQUFXO0FBQ1QsaUJBQU8sZUFBQyxXQUFELEVBQWMsYUFBZCxFQUFnQztBQUNyQyxnQkFBTSxRQUFRLGNBQWMsUUFBZCxDQUF1QixZQUFZLFlBQW5DLEVBQWlELElBQWpELENBQXNELFlBQVksS0FBbEUsQ0FBZDtnQkFDRSxRQUFRLGNBQWMsTUFBZCxDQUFxQixZQUFZLEtBQWpDLENBRFY7O0FBR0EsZ0JBQUksT0FBTyxLQUFQLENBQWEsS0FBYixDQUFKLEVBQXlCO0FBQ3ZCLHFCQUFVLEtBQVYsVUFBb0IsRUFBRSxJQUFGLENBQU8sU0FBUCxDQUFwQjtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFVLEtBQVYsVUFBb0IsT0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQXBCO0FBQ0Q7QUFDRjtBQVZRLFNBRE47QUFhTCxzQkFBYyxFQWJUO0FBY0wscUJBQWEsQ0FkUjtBQWVMLG1CQUFXLENBZk47QUFnQkwsdUJBQWU7QUFoQlYsT0FBUDtBQWtCRDs7Ozs7O0FBR0gsT0FBTyxPQUFQLEdBQWlCLFFBQWpCOzs7Ozs7Ozs7Ozs7O0FDclFBLElBQU0sVUFBVTtBQUNkLFlBQVUsa0JBREk7QUFFZCxrQkFBZ0IsbUJBRkY7QUFHZCxpQkFBZSxrQkFIRDtBQUlkLFlBQVUsa0JBSkk7QUFLZCxrQkFBZ0IsbUJBTEY7QUFNZCxhQUFXLG1CQU5HO0FBT2QsYUFBVyxtQkFQRztBQVFkLFlBQVUsa0JBUkk7QUFTZCxrQkFBZ0IsbUJBVEY7QUFVZCxpQkFBZSxrQkFWRDtBQVdkLGlCQUFlLGtCQVhEO0FBWWQsWUFBVSxrQkFaSTtBQWFkLGtCQUFnQixtQkFiRjtBQWNkLGlCQUFlLGtCQWREO0FBZWQsYUFBVyxtQkFmRztBQWdCZCxtQkFBaUIsb0JBaEJIO0FBaUJkLGtCQUFnQixtQkFqQkY7QUFrQmQsa0JBQWdCLG1CQWxCRjtBQW1CZCxZQUFVLGtCQW5CSTtBQW9CZCxrQkFBZ0IsbUJBcEJGO0FBcUJkLGlCQUFlLGtCQXJCRDtBQXNCZCxZQUFVLGtCQXRCSTtBQXVCZCxrQkFBZ0IsbUJBdkJGO0FBd0JkLGFBQVcsbUJBeEJHO0FBeUJkLG1CQUFpQixvQkF6Qkg7QUEwQmQsa0JBQWdCLG1CQTFCRjtBQTJCZCxrQkFBZ0IsbUJBM0JGO0FBNEJkLG1CQUFpQixvQkE1Qkg7QUE2QmQsWUFBVSxrQkE3Qkk7QUE4QmQsa0JBQWdCLG1CQTlCRjtBQStCZCxpQkFBZSxrQkEvQkQ7QUFnQ2QsZ0JBQWMsaUJBaENBO0FBaUNkLGlCQUFlLGtCQWpDRDtBQWtDZCxrQkFBZ0IsbUJBbENGO0FBbUNkLG1CQUFpQixvQkFuQ0g7QUFvQ2QsYUFBVyxtQkFwQ0c7QUFxQ2QsYUFBVyxtQkFyQ0c7QUFzQ2QsWUFBVSxrQkF0Q0k7QUF1Q2Qsa0JBQWdCLG1CQXZDRjtBQXdDZCxpQkFBZSxrQkF4Q0Q7QUF5Q2Qsa0JBQWdCLG1CQXpDRjtBQTBDZCxhQUFXLG1CQTFDRztBQTJDZCxtQkFBaUIsb0JBM0NIO0FBNENkLGtCQUFnQixtQkE1Q0Y7QUE2Q2Qsa0JBQWdCLG1CQTdDRjtBQThDZCxZQUFVLGtCQTlDSTtBQStDZCxrQkFBZ0IsbUJBL0NGO0FBZ0RkLFlBQVUsa0JBaERJO0FBaURkLGtCQUFnQixtQkFqREY7QUFrRGQsaUJBQWUsa0JBbEREO0FBbURkLFlBQVUsa0JBbkRJO0FBb0RkLGtCQUFnQixtQkFwREY7QUFxRGQsaUJBQWUsa0JBckREO0FBc0RkLGlCQUFlLGtCQXRERDtBQXVEZCxrQkFBZ0IsbUJBdkRGO0FBd0RkLGFBQVcsbUJBeERHO0FBeURkLFlBQVUsa0JBekRJO0FBMERkLGlCQUFlLGtCQTFERDtBQTJEZCxhQUFXLG1CQTNERztBQTREZCxpQkFBZSx1QkE1REQ7QUE2RGQsYUFBVyxtQkE3REc7QUE4RGQsWUFBVSxrQkE5REk7QUErRGQsa0JBQWdCLG1CQS9ERjtBQWdFZCxpQkFBZSxrQkFoRUQ7QUFpRWQsaUJBQWUsa0JBakVEO0FBa0VkLGtCQUFnQixtQkFsRUY7QUFtRWQsa0JBQWdCLHlCQW5FRjtBQW9FZCxZQUFVLGtCQXBFSTtBQXFFZCxrQkFBZ0IsbUJBckVGO0FBc0VkLGlCQUFlLGtCQXRFRDtBQXVFZCxnQkFBYyxpQkF2RUE7QUF3RWQsaUJBQWUsa0JBeEVEO0FBeUVkLGtCQUFnQixtQkF6RUY7QUEwRWQsWUFBVSxrQkExRUk7QUEyRWQsa0JBQWdCLG1CQTNFRjtBQTRFZCxZQUFVLGtCQTVFSTtBQTZFZCxrQkFBZ0IsbUJBN0VGO0FBOEVkLGlCQUFlLGtCQTlFRDtBQStFZCxhQUFXLG1CQS9FRztBQWdGZCxZQUFVLGtCQWhGSTtBQWlGZCxrQkFBZ0IsbUJBakZGO0FBa0ZkLGlCQUFlLGtCQWxGRDtBQW1GZCxpQkFBZSxrQkFuRkQ7QUFvRmQsWUFBVSxrQkFwRkk7QUFxRmQsa0JBQWdCLG1CQXJGRjtBQXNGZCxpQkFBZSxrQkF0RkQ7QUF1RmQsa0JBQWdCLG1CQXZGRjtBQXdGZCxZQUFVLGtCQXhGSTtBQXlGZCxrQkFBZ0IsbUJBekZGO0FBMEZkLGlCQUFlLGtCQTFGRDtBQTJGZCxhQUFXLG1CQTNGRztBQTRGZCxZQUFVLGtCQTVGSTtBQTZGZCxrQkFBZ0IsbUJBN0ZGO0FBOEZkLGlCQUFlLGtCQTlGRDtBQStGZCxrQkFBZ0IsbUJBL0ZGO0FBZ0dkLFlBQVUsa0JBaEdJO0FBaUdkLGtCQUFnQixtQkFqR0Y7QUFrR2QsaUJBQWUsa0JBbEdEO0FBbUdkLGdCQUFjLGlCQW5HQTtBQW9HZCxpQkFBZSxrQkFwR0Q7QUFxR2Qsa0JBQWdCLG1CQXJHRjtBQXNHZCxhQUFXLG1CQXRHRztBQXVHZCxhQUFXLG1CQXZHRztBQXdHZCxZQUFVLGtCQXhHSTtBQXlHZCxrQkFBZ0IsbUJBekdGO0FBMEdkLGlCQUFlLGtCQTFHRDtBQTJHZCxnQkFBYyxpQkEzR0E7QUE0R2QsaUJBQWUsa0JBNUdEO0FBNkdkLGtCQUFnQixtQkE3R0Y7QUE4R2QsaUJBQWUsdUJBOUdEO0FBK0dkLGFBQVcsbUJBL0dHO0FBZ0hkLFlBQVUsa0JBaEhJO0FBaUhkLGFBQVcsbUJBakhHO0FBa0hkLFlBQVUsa0JBbEhJO0FBbUhkLGtCQUFnQixtQkFuSEY7QUFvSGQsaUJBQWUsa0JBcEhEO0FBcUhkLGFBQVcsbUJBckhHO0FBc0hkLGFBQVcsbUJBdEhHO0FBdUhkLG1CQUFpQixvQkF2SEg7QUF3SGQsYUFBVyxtQkF4SEc7QUF5SGQsYUFBVyxtQkF6SEc7QUEwSGQsWUFBVSxrQkExSEk7QUEySGQsa0JBQWdCLG1CQTNIRjtBQTRIZCxpQkFBZSxrQkE1SEQ7QUE2SGQsaUJBQWUsa0JBN0hEO0FBOEhkLFlBQVUsa0JBOUhJO0FBK0hkLGtCQUFnQixtQkEvSEY7QUFnSWQsaUJBQWUsa0JBaElEO0FBaUlkLGFBQVcsbUJBaklHO0FBa0lkLFlBQVUsa0JBbElJO0FBbUlkLGtCQUFnQixtQkFuSUY7QUFvSWQsaUJBQWUsa0JBcElEO0FBcUlkLGdCQUFjLGlCQXJJQTtBQXNJZCxpQkFBZSxrQkF0SUQ7QUF1SWQsa0JBQWdCLG1CQXZJRjtBQXdJZCxtQkFBaUIsb0JBeElIO0FBeUlkLGFBQVcsbUJBeklHO0FBMElkLG1CQUFpQixvQkExSUg7QUEySWQsWUFBVSxrQkEzSUk7QUE0SWQsWUFBVSxrQkE1SUk7QUE2SWQsaUJBQWUsa0JBN0lEO0FBOElkLFlBQVUsa0JBOUlJO0FBK0lkLGtCQUFnQixtQkEvSUY7QUFnSmQsaUJBQWUsa0JBaEpEO0FBaUpkLGlCQUFlLGtCQWpKRDtBQWtKZCxrQkFBZ0IsbUJBbEpGO0FBbUpkLFlBQVUsa0JBbkpJO0FBb0pkLGtCQUFnQixtQkFwSkY7QUFxSmQsaUJBQWUsa0JBckpEO0FBc0pkLGlCQUFlLGtCQXRKRDtBQXVKZCxrQkFBZ0IsbUJBdkpGO0FBd0pkLFlBQVUsa0JBeEpJO0FBeUpkLGtCQUFnQixtQkF6SkY7QUEwSmQsaUJBQWUsa0JBMUpEO0FBMkpkLGdCQUFjLGlCQTNKQTtBQTRKZCxpQkFBZSxrQkE1SkQ7QUE2SmQsa0JBQWdCLG1CQTdKRjtBQThKZCxtQkFBaUIsb0JBOUpIO0FBK0pkLGtCQUFnQixtQkEvSkY7QUFnS2QsYUFBVyxtQkFoS0c7QUFpS2QsYUFBVyxtQkFqS0c7QUFrS2QsWUFBVSxrQkFsS0k7QUFtS2Qsa0JBQWdCLG1CQW5LRjtBQW9LZCxZQUFVLGtCQXBLSTtBQXFLZCxrQkFBZ0IsbUJBcktGO0FBc0tkLFlBQVUsa0JBdEtJO0FBdUtkLFlBQVUsa0JBdktJO0FBd0tkLGtCQUFnQixtQkF4S0Y7QUF5S2QsaUJBQWUsa0JBektEO0FBMEtkLGdCQUFjLGlCQTFLQTtBQTJLZCxpQkFBZSxrQkEzS0Q7QUE0S2Qsa0JBQWdCLG1CQTVLRjtBQTZLZCxtQkFBaUIsb0JBN0tIO0FBOEtkLGtCQUFnQixtQkE5S0Y7QUErS2QsYUFBVyxtQkEvS0c7QUFnTGQsWUFBVSxrQkFoTEk7QUFpTGQsa0JBQWdCLG1CQWpMRjtBQWtMZCxpQkFBZSxrQkFsTEQ7QUFtTGQsZ0JBQWMsaUJBbkxBO0FBb0xkLGlCQUFlLGtCQXBMRDtBQXFMZCxrQkFBZ0IsbUJBckxGO0FBc0xkLG1CQUFpQixvQkF0TEg7QUF1TGQsa0JBQWdCLG1CQXZMRjtBQXdMZCxZQUFVLGtCQXhMSTtBQXlMZCxrQkFBZ0IsbUJBekxGO0FBMExkLGlCQUFlLGtCQTFMRDtBQTJMZCxnQkFBYyxpQkEzTEE7QUE0TGQsaUJBQWUsa0JBNUxEO0FBNkxkLGtCQUFnQixtQkE3TEY7QUE4TGQsWUFBVSxrQkE5TEk7QUErTGQsa0JBQWdCLG1CQS9MRjtBQWdNZCxpQkFBZSxrQkFoTUQ7QUFpTWQsZ0JBQWMsaUJBak1BO0FBa01kLGlCQUFlLGtCQWxNRDtBQW1NZCxrQkFBZ0IsbUJBbk1GO0FBb01kLG1CQUFpQixvQkFwTUg7QUFxTWQsa0JBQWdCLG1CQXJNRjtBQXNNZCxZQUFVLGtCQXRNSTtBQXVNZCxrQkFBZ0IsbUJBdk1GO0FBd01kLGlCQUFlLGtCQXhNRDtBQXlNZCxpQkFBZSxrQkF6TUQ7QUEwTWQsa0JBQWdCLG1CQTFNRjtBQTJNZCxZQUFVLGtCQTNNSTtBQTRNZCxrQkFBZ0IsbUJBNU1GO0FBNk1kLGlCQUFlLGtCQTdNRDtBQThNZCxpQkFBZSxrQkE5TUQ7QUErTWQsYUFBVyxtQkEvTUc7QUFnTmQsWUFBVSxrQkFoTkk7QUFpTmQsa0JBQWdCLG1CQWpORjtBQWtOZCxpQkFBZSxrQkFsTkQ7QUFtTmQsZ0JBQWMsaUJBbk5BO0FBb05kLGlCQUFlLGtCQXBORDtBQXFOZCxrQkFBZ0IsbUJBck5GO0FBc05kLGtCQUFnQixtQkF0TkY7QUF1TmQsWUFBVSxrQkF2Tkk7QUF3TmQsWUFBVSxrQkF4Tkk7QUF5TmQsa0JBQWdCLG1CQXpORjtBQTBOZCxpQkFBZSxrQkExTkQ7QUEyTmQsZ0JBQWMsaUJBM05BO0FBNE5kLGlCQUFlLGtCQTVORDtBQTZOZCxrQkFBZ0IsbUJBN05GO0FBOE5kLG1CQUFpQixvQkE5Tkg7QUErTmQsaUJBQWUsdUJBL05EO0FBZ09kLFlBQVUsa0JBaE9JO0FBaU9kLGtCQUFnQixtQkFqT0Y7QUFrT2QsWUFBVSxrQkFsT0k7QUFtT2Qsa0JBQWdCLG1CQW5PRjtBQW9PZCxrQkFBZ0IsbUJBcE9GO0FBcU9kLFlBQVUsa0JBck9JO0FBc09kLGtCQUFnQixtQkF0T0Y7QUF1T2QsaUJBQWUsa0JBdk9EO0FBd09kLGdCQUFjLGlCQXhPQTtBQXlPZCxpQkFBZSxrQkF6T0Q7QUEwT2Qsa0JBQWdCLG1CQTFPRjtBQTJPZCxtQkFBaUIsb0JBM09IO0FBNE9kLGtCQUFnQixtQkE1T0Y7QUE2T2QsYUFBVyxtQkE3T0c7QUE4T2QsYUFBVyxtQkE5T0c7QUErT2QsYUFBVyxtQkEvT0c7QUFnUGQsWUFBVSxrQkFoUEk7QUFpUGQsa0JBQWdCLG1CQWpQRjtBQWtQZCxpQkFBZSxrQkFsUEQ7QUFtUGQsWUFBVSxrQkFuUEk7QUFvUGQsa0JBQWdCLG1CQXBQRjtBQXFQZCxpQkFBZSxrQkFyUEQ7QUFzUGQsaUJBQWUsa0JBdFBEO0FBdVBkLGFBQVcsbUJBdlBHO0FBd1BkLGFBQVcsbUJBeFBHO0FBeVBkLFlBQVUsa0JBelBJO0FBMFBkLGtCQUFnQixtQkExUEY7QUEyUGQsWUFBVSxrQkEzUEk7QUE0UGQsa0JBQWdCLG1CQTVQRjtBQTZQZCxpQkFBZSxrQkE3UEQ7QUE4UGQsaUJBQWUsa0JBOVBEO0FBK1BkLGtCQUFnQixtQkEvUEY7QUFnUWQsYUFBVyxtQkFoUUc7QUFpUWQsWUFBVSxrQkFqUUk7QUFrUWQsa0JBQWdCLG1CQWxRRjtBQW1RZCxpQkFBZSxrQkFuUUQ7QUFvUWQsYUFBVyxtQkFwUUc7QUFxUWQsYUFBVyxtQkFyUUc7QUFzUWQsa0JBQWdCLG1CQXRRRjtBQXVRZCxZQUFVLGtCQXZRSTtBQXdRZCxrQkFBZ0IsbUJBeFFGO0FBeVFkLGlCQUFlLGtCQXpRRDtBQTBRZCxpQkFBZSxrQkExUUQ7QUEyUWQsa0JBQWdCLG1CQTNRRjtBQTRRZCxZQUFVLGtCQTVRSTtBQTZRZCxrQkFBZ0IsbUJBN1FGO0FBOFFkLFlBQVUsa0JBOVFJO0FBK1FkLGtCQUFnQixtQkEvUUY7QUFnUmQsYUFBVyxtQkFoUkc7QUFpUmQsYUFBVyxtQkFqUkc7QUFrUmQsWUFBVSxrQkFsUkk7QUFtUmQsa0JBQWdCLG1CQW5SRjtBQW9SZCxpQkFBZSxrQkFwUkQ7QUFxUmQsZ0JBQWMsaUJBclJBO0FBc1JkLGlCQUFlLGtCQXRSRDtBQXVSZCxrQkFBZ0IsbUJBdlJGO0FBd1JkLGtCQUFnQixtQkF4UkY7QUF5UmQsWUFBVSxrQkF6Ukk7QUEwUmQsa0JBQWdCLG1CQTFSRjtBQTJSZCxpQkFBZSxrQkEzUkQ7QUE0UmQsaUJBQWUsa0JBNVJEO0FBNlJkLGFBQVcsbUJBN1JHO0FBOFJkLFlBQVUsa0JBOVJJO0FBK1JkLFlBQVUsa0JBL1JJO0FBZ1NkLGtCQUFnQixtQkFoU0Y7QUFpU2QsaUJBQWUsa0JBalNEO0FBa1NkLGlCQUFlLGtCQWxTRDtBQW1TZCxrQkFBZ0IsbUJBblNGO0FBb1NkLGFBQVcsbUJBcFNHO0FBcVNkLG1CQUFpQixvQkFyU0g7QUFzU2QsWUFBVSxrQkF0U0k7QUF1U2Qsa0JBQWdCLG1CQXZTRjtBQXdTZCxZQUFVLGtCQXhTSTtBQXlTZCxrQkFBZ0IsbUJBelNGO0FBMFNkLGlCQUFlLGtCQTFTRDtBQTJTZCxnQkFBYyxpQkEzU0E7QUE0U2QsaUJBQWUsa0JBNVNEO0FBNlNkLGtCQUFnQixtQkE3U0Y7QUE4U2QsWUFBVSxrQkE5U0k7QUErU2Qsa0JBQWdCLG1CQS9TRjtBQWdUZCxpQkFBZSxrQkFoVEQ7QUFpVGQsaUJBQWUsa0JBalREO0FBa1RkLGtCQUFnQixtQkFsVEY7QUFtVGQsWUFBVSxrQkFuVEk7QUFvVGQsWUFBVSxrQkFwVEk7QUFxVGQsa0JBQWdCLG1CQXJURjtBQXNUZCxpQkFBZSxrQkF0VEQ7QUF1VGQsWUFBVSxrQkF2VEk7QUF3VGQsa0JBQWdCLG1CQXhURjtBQXlUZCxpQkFBZSxrQkF6VEQ7QUEwVGQsaUJBQWUsa0JBMVREO0FBMlRkLGtCQUFnQixtQkEzVEY7QUE0VGQsWUFBVSxrQkE1VEk7QUE2VGQsa0JBQWdCLG1CQTdURjtBQThUZCxpQkFBZSxrQkE5VEQ7QUErVGQsWUFBVSxrQkEvVEk7QUFnVWQsWUFBVSxrQkFoVUk7QUFpVWQsWUFBVSxrQkFqVUk7QUFrVWQsa0JBQWdCLG1CQWxVRjtBQW1VZCxhQUFXLG1CQW5VRztBQW9VZCxZQUFVLGtCQXBVSTtBQXFVZCxrQkFBZ0IsbUJBclVGO0FBc1VkLFlBQVUsa0JBdFVJO0FBdVVkLGtCQUFnQixtQkF2VUY7QUF3VWQsaUJBQWUsa0JBeFVEO0FBeVVkLGlCQUFlLGtCQXpVRDtBQTBVZCxrQkFBZ0IsbUJBMVVGO0FBMlVkLFlBQVUsa0JBM1VJO0FBNFVkLGtCQUFnQixtQkE1VUY7QUE2VWQsaUJBQWUsa0JBN1VEO0FBOFVkLGdCQUFjLGlCQTlVQTtBQStVZCxpQkFBZSxrQkEvVUQ7QUFnVmQsa0JBQWdCLG1CQWhWRjtBQWlWZCxtQkFBaUIsb0JBalZIO0FBa1ZkLGtCQUFnQixtQkFsVkY7QUFtVmQsWUFBVSxrQkFuVkk7QUFvVmQsa0JBQWdCLG1CQXBWRjtBQXFWZCxZQUFVLGtCQXJWSTtBQXNWZCxrQkFBZ0IsbUJBdFZGO0FBdVZkLGlCQUFlLGtCQXZWRDtBQXdWZCxnQkFBYyxpQkF4VkE7QUF5VmQsaUJBQWUsa0JBelZEO0FBMFZkLGtCQUFnQixtQkExVkY7QUEyVmQsbUJBQWlCLG9CQTNWSDtBQTRWZCxhQUFXLG1CQTVWRztBQTZWZCxtQkFBaUIsb0JBN1ZIO0FBOFZkLFlBQVUsa0JBOVZJO0FBK1ZkLGtCQUFnQixtQkEvVkY7QUFnV2QsWUFBVSxrQkFoV0k7QUFpV2Qsa0JBQWdCLG1CQWpXRjtBQWtXZCxpQkFBZSxrQkFsV0Q7QUFtV2QsaUJBQWUsa0JBbldEO0FBb1dkLGFBQVcsbUJBcFdHO0FBcVdkLGFBQVcsbUJBcldHO0FBc1dkLGFBQVcsbUJBdFdHO0FBdVdkLFlBQVUsa0JBdldJO0FBd1dkLFlBQVUsa0JBeFdJO0FBeVdkLFlBQVUsa0JBeldJO0FBMFdkLFlBQVUsa0JBMVdJO0FBMldkLGtCQUFnQixtQkEzV0Y7QUE0V2QsaUJBQWUsa0JBNVdEO0FBNldkLGlCQUFlLGtCQTdXRDtBQThXZCxZQUFVLGtCQTlXSTtBQStXZCxrQkFBZ0IsbUJBL1dGO0FBZ1hkLFlBQVUsa0JBaFhJO0FBaVhkLGtCQUFnQixtQkFqWEY7QUFrWGQsaUJBQWUsa0JBbFhEO0FBbVhkLFlBQVUsa0JBblhJO0FBb1hkLGtCQUFnQixtQkFwWEY7QUFxWGQsaUJBQWUsa0JBclhEO0FBc1hkLGlCQUFlLGtCQXRYRDtBQXVYZCxrQkFBZ0IsbUJBdlhGO0FBd1hkLFlBQVUsa0JBeFhJO0FBeVhkLGtCQUFnQixtQkF6WEY7QUEwWGQsaUJBQWUsa0JBMVhEO0FBMlhkLGdCQUFjLGlCQTNYQTtBQTRYZCxpQkFBZSxrQkE1WEQ7QUE2WGQsa0JBQWdCLG1CQTdYRjtBQThYZCxtQkFBaUIsb0JBOVhIO0FBK1hkLGFBQVcsbUJBL1hHO0FBZ1lkLFlBQVUsa0JBaFlJO0FBaVlkLGlCQUFlLGtCQWpZRDtBQWtZZCxhQUFXLG1CQWxZRztBQW1ZZCxZQUFVLGtCQW5ZSTtBQW9ZZCxrQkFBZ0IsbUJBcFlGO0FBcVlkLGlCQUFlLGtCQXJZRDtBQXNZZCxpQkFBZSxrQkF0WUQ7QUF1WWQsYUFBVyxtQkF2WUc7QUF3WWQsWUFBVSxrQkF4WUk7QUF5WWQsa0JBQWdCLG1CQXpZRjtBQTBZZCxpQkFBZSxrQkExWUQ7QUEyWWQsaUJBQWUsa0JBM1lEO0FBNFlkLFlBQVUsa0JBNVlJO0FBNllkLFlBQVUsa0JBN1lJO0FBOFlkLGtCQUFnQixtQkE5WUY7QUErWWQsaUJBQWUsa0JBL1lEO0FBZ1pkLFlBQVUsa0JBaFpJO0FBaVpkLGtCQUFnQixtQkFqWkY7QUFrWmQsaUJBQWUsa0JBbFpEO0FBbVpkLGlCQUFlLGtCQW5aRDtBQW9aZCxZQUFVLGtCQXBaSTtBQXFaZCxrQkFBZ0IsbUJBclpGO0FBc1pkLGlCQUFlLGtCQXRaRDtBQXVaZCxpQkFBZSxrQkF2WkQ7QUF3WmQsa0JBQWdCLG1CQXhaRjtBQXlaZCxhQUFXLG1CQXpaRztBQTBaZCxZQUFVLGtCQTFaSTtBQTJaZCxrQkFBZ0IsbUJBM1pGO0FBNFpkLGlCQUFlLGtCQTVaRDtBQTZaZCxpQkFBZSxrQkE3WkQ7QUE4WmQsYUFBVyxtQkE5Wkc7QUErWmQsYUFBVyxtQkEvWkc7QUFnYWQsWUFBVSxrQkFoYUk7QUFpYWQsWUFBVSxrQkFqYUk7QUFrYWQsa0JBQWdCLG1CQWxhRjtBQW1hZCxpQkFBZSxrQkFuYUQ7QUFvYWQsaUJBQWUsa0JBcGFEO0FBcWFkLGtCQUFnQixtQkFyYUY7QUFzYWQsYUFBVyxtQkF0YUc7QUF1YWQsYUFBVyxtQkF2YUc7QUF3YWQsWUFBVSxrQkF4YUk7QUF5YWQsa0JBQWdCLG1CQXphRjtBQTBhZCxpQkFBZSxrQkExYUQ7QUEyYWQsWUFBVSxrQkEzYUk7QUE0YWQsa0JBQWdCLG1CQTVhRjtBQTZhZCxhQUFXLG1CQTdhRztBQThhZCxZQUFVLGtCQTlhSTtBQSthZCxrQkFBZ0IsbUJBL2FGO0FBZ2JkLGlCQUFlLGtCQWhiRDtBQWliZCxpQkFBZSxrQkFqYkQ7QUFrYmQsa0JBQWdCLG1CQWxiRjtBQW1iZCxhQUFXLG1CQW5iRztBQW9iZCxZQUFVLGtCQXBiSTtBQXFiZCxrQkFBZ0IsbUJBcmJGO0FBc2JkLGlCQUFlLGtCQXRiRDtBQXViZCxhQUFXLG1CQXZiRztBQXdiZCxpQkFBZSx1QkF4YkQ7QUF5YmQsYUFBVyxtQkF6Ykc7QUEwYmQsWUFBVSxrQkExYkk7QUEyYmQsa0JBQWdCLG1CQTNiRjtBQTRiZCxpQkFBZSxrQkE1YkQ7QUE2YmQsWUFBVSxrQkE3Ykk7QUE4YmQsa0JBQWdCLG1CQTliRjtBQStiZCxhQUFXLG1CQS9iRztBQWdjZCxZQUFVLGtCQWhjSTtBQWljZCxrQkFBZ0IsbUJBamNGO0FBa2NkLGlCQUFlLGtCQWxjRDtBQW1jZCxhQUFXLG1CQW5jRztBQW9jZCxZQUFVLGtCQXBjSTtBQXFjZCxrQkFBZ0IsbUJBcmNGO0FBc2NkLGlCQUFlLGtCQXRjRDtBQXVjZCxrQkFBZ0IsbUJBdmNGO0FBd2NkLFlBQVUsa0JBeGNJO0FBeWNkLGtCQUFnQixtQkF6Y0Y7QUEwY2QsaUJBQWUsa0JBMWNEO0FBMmNkLGlCQUFlLGtCQTNjRDtBQTRjZCxrQkFBZ0IsbUJBNWNGO0FBNmNkLFlBQVUsa0JBN2NJO0FBOGNkLGtCQUFnQixtQkE5Y0Y7QUErY2QsaUJBQWUsa0JBL2NEO0FBZ2RkLFlBQVUsa0JBaGRJO0FBaWRkLGtCQUFnQixtQkFqZEY7QUFrZGQsWUFBVSxrQkFsZEk7QUFtZGQsa0JBQWdCLG1CQW5kRjtBQW9kZCxpQkFBZSxrQkFwZEQ7QUFxZGQsaUJBQWUsa0JBcmREO0FBc2RkLGtCQUFnQixtQkF0ZEY7QUF1ZGQsYUFBVyxtQkF2ZEc7QUF3ZGQsWUFBVSxrQkF4ZEk7QUF5ZGQsa0JBQWdCLG1CQXpkRjtBQTBkZCxpQkFBZSxrQkExZEQ7QUEyZGQsWUFBVSxrQkEzZEk7QUE0ZGQsa0JBQWdCLG1CQTVkRjtBQTZkZCxhQUFXLG1CQTdkRztBQThkZCxhQUFXLG1CQTlkRztBQStkZCxZQUFVLGtCQS9kSTtBQWdlZCxrQkFBZ0IsbUJBaGVGO0FBaWVkLGlCQUFlLGtCQWplRDtBQWtlZCxhQUFXLG1CQWxlRztBQW1lZCxhQUFXLG1CQW5lRztBQW9lZCxZQUFVLGtCQXBlSTtBQXFlZCxrQkFBZ0IsbUJBcmVGO0FBc2VkLGlCQUFlLGtCQXRlRDtBQXVlZCxpQkFBZSxrQkF2ZUQ7QUF3ZWQsYUFBVyxtQkF4ZUc7QUF5ZWQsbUJBQWlCLG9CQXplSDtBQTBlZCxrQkFBZ0IsbUJBMWVGO0FBMmVkLGFBQVcsbUJBM2VHO0FBNGVkLGFBQVcsbUJBNWVHO0FBNmVkLG1CQUFpQixvQkE3ZUg7QUE4ZWQsa0JBQWdCLG1CQTllRjtBQStlZCxrQkFBZ0IsbUJBL2VGO0FBZ2ZkLGdCQUFjLHNCQWhmQTtBQWlmZCxZQUFVLGtCQWpmSTtBQWtmZCxrQkFBZ0IsbUJBbGZGO0FBbWZkLGlCQUFlLGtCQW5mRDtBQW9mZCxhQUFXLG1CQXBmRztBQXFmZCxZQUFVLGtCQXJmSTtBQXNmZCxZQUFVLGtCQXRmSTtBQXVmZCxrQkFBZ0IsbUJBdmZGO0FBd2ZkLGlCQUFlLGtCQXhmRDtBQXlmZCxnQkFBYyxpQkF6ZkE7QUEwZmQsaUJBQWUsa0JBMWZEO0FBMmZkLGtCQUFnQixtQkEzZkY7QUE0ZmQsa0JBQWdCLG1CQTVmRjtBQTZmZCxZQUFVLGtCQTdmSTtBQThmZCxrQkFBZ0IsbUJBOWZGO0FBK2ZkLGlCQUFlLGtCQS9mRDtBQWdnQmQsWUFBVSxrQkFoZ0JJO0FBaWdCZCxrQkFBZ0IsbUJBamdCRjtBQWtnQmQsaUJBQWUsa0JBbGdCRDtBQW1nQmQsZ0JBQWMsaUJBbmdCQTtBQW9nQmQsaUJBQWUsa0JBcGdCRDtBQXFnQmQsa0JBQWdCLG1CQXJnQkY7QUFzZ0JkLGFBQVcsbUJBdGdCRztBQXVnQmQsYUFBVyxtQkF2Z0JHO0FBd2dCZCxhQUFXLG1CQXhnQkc7QUF5Z0JkLFlBQVUsa0JBemdCSTtBQTBnQmQsWUFBVSxrQkExZ0JJO0FBMmdCZCxZQUFVLGtCQTNnQkk7QUE0Z0JkLGtCQUFnQixtQkE1Z0JGO0FBNmdCZCxpQkFBZSxrQkE3Z0JEO0FBOGdCZCxZQUFVLGtCQTlnQkk7QUErZ0JkLGtCQUFnQixtQkEvZ0JGO0FBZ2hCZCxZQUFVLGtCQWhoQkk7QUFpaEJkLGtCQUFnQixtQkFqaEJGO0FBa2hCZCxrQkFBZ0IsbUJBbGhCRjtBQW1oQmQsWUFBVSxrQkFuaEJJO0FBb2hCZCxZQUFVLGtCQXBoQkk7QUFxaEJkLGtCQUFnQixtQkFyaEJGO0FBc2hCZCxpQkFBZSxrQkF0aEJEO0FBdWhCZCxhQUFXLG1CQXZoQkc7QUF3aEJkLGFBQVcsbUJBeGhCRztBQXloQmQsYUFBVyxtQkF6aEJHO0FBMGhCZCxhQUFXLG1CQTFoQkc7QUEyaEJkLGFBQVcsbUJBM2hCRztBQTRoQmQsYUFBVyxtQkE1aEJHO0FBNmhCZCxZQUFVLGtCQTdoQkk7QUE4aEJkLGtCQUFnQixtQkE5aEJGO0FBK2hCZCxhQUFXLG1CQS9oQkc7QUFnaUJkLFlBQVUsa0JBaGlCSTtBQWlpQmQsa0JBQWdCLG1CQWppQkY7QUFraUJkLGlCQUFlLGtCQWxpQkQ7QUFtaUJkLGdCQUFjLGlCQW5pQkE7QUFvaUJkLGlCQUFlLGtCQXBpQkQ7QUFxaUJkLGtCQUFnQixtQkFyaUJGO0FBc2lCZCxrQkFBZ0IsbUJBdGlCRjtBQXVpQmQsYUFBVyxtQkF2aUJHO0FBd2lCZCxhQUFXLG1CQXhpQkc7QUF5aUJkLG1CQUFpQixvQkF6aUJIO0FBMGlCZCxhQUFXLG1CQTFpQkc7QUEyaUJkLFlBQVUsa0JBM2lCSTtBQTRpQmQsa0JBQWdCLG1CQTVpQkY7QUE2aUJkLGlCQUFlLGtCQTdpQkQ7QUE4aUJkLFlBQVUsa0JBOWlCSTtBQStpQmQsa0JBQWdCLG1CQS9pQkY7QUFnakJkLGlCQUFlLGtCQWhqQkQ7QUFpakJkLGdCQUFjLGlCQWpqQkE7QUFrakJkLGlCQUFlLGtCQWxqQkQ7QUFtakJkLGtCQUFnQixtQkFuakJGO0FBb2pCZCxtQkFBaUIsb0JBcGpCSDtBQXFqQmQsa0JBQWdCLG1CQXJqQkY7QUFzakJkLFlBQVUsa0JBdGpCSTtBQXVqQmQsa0JBQWdCLG1CQXZqQkY7QUF3akJkLGlCQUFlLGtCQXhqQkQ7QUF5akJkLGlCQUFlLGtCQXpqQkQ7QUEwakJkLFlBQVUsa0JBMWpCSTtBQTJqQmQsa0JBQWdCLG1CQTNqQkY7QUE0akJkLGlCQUFlLGtCQTVqQkQ7QUE2akJkLGFBQVcsbUJBN2pCRztBQThqQmQsWUFBVSxrQkE5akJJO0FBK2pCZCxrQkFBZ0IsbUJBL2pCRjtBQWdrQmQsWUFBVSxrQkFoa0JJO0FBaWtCZCxrQkFBZ0IsbUJBamtCRjtBQWtrQmQsaUJBQWUsa0JBbGtCRDtBQW1rQmQsZ0JBQWMsaUJBbmtCQTtBQW9rQmQsaUJBQWUsa0JBcGtCRDtBQXFrQmQsa0JBQWdCLG1CQXJrQkY7QUFza0JkLGtCQUFnQixtQkF0a0JGO0FBdWtCZCxpQkFBZSx1QkF2a0JEO0FBd2tCZCx1QkFBcUIsd0JBeGtCUDtBQXlrQmQsa0JBQWdCLHdCQXprQkY7QUEwa0JkLFlBQVUsa0JBMWtCSTtBQTJrQmQsa0JBQWdCLG1CQTNrQkY7QUE0a0JkLGlCQUFlLGtCQTVrQkQ7QUE2a0JkLGdCQUFjLGlCQTdrQkE7QUE4a0JkLGlCQUFlLGtCQTlrQkQ7QUEra0JkLGtCQUFnQixtQkEva0JGO0FBZ2xCZCxtQkFBaUIsb0JBaGxCSDtBQWlsQmQsa0JBQWdCLG1CQWpsQkY7QUFrbEJkLGFBQVcsbUJBbGxCRztBQW1sQmQsWUFBVSxrQkFubEJJO0FBb2xCZCxrQkFBZ0IsbUJBcGxCRjtBQXFsQmQsWUFBVSxrQkFybEJJO0FBc2xCZCxrQkFBZ0IsbUJBdGxCRjtBQXVsQmQsaUJBQWUsa0JBdmxCRDtBQXdsQmQsaUJBQWUsa0JBeGxCRDtBQXlsQmQsa0JBQWdCLG1CQXpsQkY7QUEwbEJkLGFBQVcsbUJBMWxCRztBQTJsQmQsbUJBQWlCLG9CQTNsQkg7QUE0bEJkLFlBQVUsa0JBNWxCSTtBQTZsQmQsa0JBQWdCLG1CQTdsQkY7QUE4bEJkLGFBQVcsbUJBOWxCRztBQStsQmQsbUJBQWlCLG9CQS9sQkg7QUFnbUJkLGFBQVcsbUJBaG1CRztBQWltQmQsWUFBVSxrQkFqbUJJO0FBa21CZCxrQkFBZ0IsbUJBbG1CRjtBQW1tQmQsZ0JBQWMsaUJBbm1CQTtBQW9tQmQsWUFBVSxrQkFwbUJJO0FBcW1CZCxpQkFBZSxrQkFybUJEO0FBc21CZCxZQUFVLGtCQXRtQkk7QUF1bUJkLGtCQUFnQixtQkF2bUJGO0FBd21CZCxZQUFVLGtCQXhtQkk7QUF5bUJkLGtCQUFnQixtQkF6bUJGO0FBMG1CZCxZQUFVLGtCQTFtQkk7QUEybUJkLGtCQUFnQixtQkEzbUJGO0FBNG1CZCxpQkFBZSxrQkE1bUJEO0FBNm1CZCxnQkFBYyxzQkE3bUJBO0FBOG1CZCxzQkFBb0IsdUJBOW1CTjtBQSttQmQscUJBQW1CLHNCQS9tQkw7QUFnbkJkLHFCQUFtQixzQkFobkJMO0FBaW5CZCxZQUFVLGtCQWpuQkk7QUFrbkJkLGtCQUFnQixtQkFsbkJGO0FBbW5CZCxpQkFBZSxrQkFubkJEO0FBb25CZCxpQkFBZSxrQkFwbkJEO0FBcW5CZCxrQkFBZ0IsbUJBcm5CRjtBQXNuQmQsWUFBVSxrQkF0bkJJO0FBdW5CZCxrQkFBZ0IsbUJBdm5CRjtBQXduQmQsaUJBQWUsa0JBeG5CRDtBQXluQmQsaUJBQWUsa0JBem5CRDtBQTBuQmQsa0JBQWdCLG1CQTFuQkY7QUEybkJkLG1CQUFpQixvQkEzbkJIO0FBNG5CZCxZQUFVLGtCQTVuQkk7QUE2bkJkLGtCQUFnQixtQkE3bkJGO0FBOG5CZCxZQUFVLGtCQTluQkk7QUErbkJkLGtCQUFnQixtQkEvbkJGO0FBZ29CZCxZQUFVLGtCQWhvQkk7QUFpb0JkLGtCQUFnQixtQkFqb0JGO0FBa29CZCxZQUFVLGtCQWxvQkk7QUFtb0JkLGtCQUFnQixtQkFub0JGO0FBb29CZCxpQkFBZSxrQkFwb0JEO0FBcW9CZCxnQkFBYyxpQkFyb0JBO0FBc29CZCxpQkFBZSxrQkF0b0JEO0FBdW9CZCxZQUFVLGtCQXZvQkk7QUF3b0JkLGtCQUFnQixtQkF4b0JGO0FBeW9CZCxpQkFBZSxrQkF6b0JEO0FBMG9CZCxnQkFBYyxpQkExb0JBO0FBMm9CZCxpQkFBZSxrQkEzb0JEO0FBNG9CZCxrQkFBZ0IsbUJBNW9CRjtBQTZvQmQsYUFBVyxtQkE3b0JHO0FBOG9CZCxZQUFVLGtCQTlvQkk7QUErb0JkLGtCQUFnQixtQkEvb0JGO0FBZ3BCZCxZQUFVLGtCQWhwQkk7QUFpcEJkLGtCQUFnQixtQkFqcEJGO0FBa3BCZCxhQUFXLG1CQWxwQkc7QUFtcEJkLFlBQVUsa0JBbnBCSTtBQW9wQmQsa0JBQWdCLG1CQXBwQkY7QUFxcEJkLGlCQUFlLGtCQXJwQkQ7QUFzcEJkLGlCQUFlLGtCQXRwQkQ7QUF1cEJkLFlBQVUsa0JBdnBCSTtBQXdwQmQsa0JBQWdCLG1CQXhwQkY7QUF5cEJkLGlCQUFlLGtCQXpwQkQ7QUEwcEJkLGdCQUFjLGlCQTFwQkE7QUEycEJkLGlCQUFlLGtCQTNwQkQ7QUE0cEJkLGtCQUFnQixtQkE1cEJGO0FBNnBCZCxtQkFBaUIsb0JBN3BCSDtBQThwQmQsa0JBQWdCLG1CQTlwQkY7QUErcEJkLFlBQVUsa0JBL3BCSTtBQWdxQmQsa0JBQWdCLG1CQWhxQkY7QUFpcUJkLGlCQUFlLGtCQWpxQkQ7QUFrcUJkLGFBQVcsbUJBbHFCRztBQW1xQmQsWUFBVSxrQkFucUJJO0FBb3FCZCxrQkFBZ0IsbUJBcHFCRjtBQXFxQmQsaUJBQWUsa0JBcnFCRDtBQXNxQmQsZ0JBQWMsaUJBdHFCQTtBQXVxQmQsaUJBQWUsa0JBdnFCRDtBQXdxQmQsa0JBQWdCLG1CQXhxQkY7QUF5cUJkLFlBQVUsa0JBenFCSTtBQTBxQmQsa0JBQWdCLG1CQTFxQkY7QUEycUJkLGlCQUFlLGtCQTNxQkQ7QUE0cUJkLGlCQUFlLGtCQTVxQkQ7QUE2cUJkLGtCQUFnQixtQkE3cUJGO0FBOHFCZCxhQUFXLG1CQTlxQkc7QUErcUJkLFlBQVUsa0JBL3FCSTtBQWdyQmQsa0JBQWdCLG1CQWhyQkY7QUFpckJkLGlCQUFlLGtCQWpyQkQ7QUFrckJkLFlBQVUsa0JBbHJCSTtBQW1yQmQsa0JBQWdCLG1CQW5yQkY7QUFvckJkLGlCQUFlLGtCQXByQkQ7QUFxckJkLGdCQUFjLGlCQXJyQkE7QUFzckJkLGlCQUFlLGtCQXRyQkQ7QUF1ckJkLGtCQUFnQixtQkF2ckJGO0FBd3JCZCxZQUFVLGtCQXhyQkk7QUF5ckJkLGtCQUFnQixtQkF6ckJGO0FBMHJCZCxZQUFVLGtCQTFyQkk7QUEyckJkLGtCQUFnQixtQkEzckJGO0FBNHJCZCxpQkFBZSxrQkE1ckJEO0FBNnJCZCxpQkFBZSxrQkE3ckJEO0FBOHJCZCxZQUFVLGtCQTlyQkk7QUErckJkLGtCQUFnQixtQkEvckJGO0FBZ3NCZCxpQkFBZSxrQkFoc0JEO0FBaXNCZCxZQUFVLGtCQWpzQkk7QUFrc0JkLGtCQUFnQixtQkFsc0JGO0FBbXNCZCxZQUFVLGtCQW5zQkk7QUFvc0JkLGtCQUFnQixtQkFwc0JGO0FBcXNCZCxhQUFXLG1CQXJzQkc7QUFzc0JkLG1CQUFpQixvQkF0c0JIO0FBdXNCZCxZQUFVLGtCQXZzQkk7QUF3c0JkLGtCQUFnQixtQkF4c0JGO0FBeXNCZCxpQkFBZSxrQkF6c0JEO0FBMHNCZCxnQkFBYyxpQkExc0JBO0FBMnNCZCxpQkFBZSxrQkEzc0JEO0FBNHNCZCxrQkFBZ0IsbUJBNXNCRjtBQTZzQmQsWUFBVSxrQkE3c0JJO0FBOHNCZCxrQkFBZ0IsbUJBOXNCRjtBQStzQmQsWUFBVSxrQkEvc0JJO0FBZ3RCZCxrQkFBZ0IsbUJBaHRCRjtBQWl0QmQsaUJBQWUsa0JBanRCRDtBQWt0QmQsaUJBQWUsa0JBbHRCRDtBQW10QmQsYUFBVyxtQkFudEJHO0FBb3RCZCxZQUFVLGtCQXB0Qkk7QUFxdEJkLGtCQUFnQixtQkFydEJGO0FBc3RCZCxZQUFVLGtCQXR0Qkk7QUF1dEJkLGFBQVcsbUJBdnRCRztBQXd0QmQsYUFBVyxtQkF4dEJHO0FBeXRCZCxZQUFVLGtCQXp0Qkk7QUEwdEJkLGtCQUFnQixtQkExdEJGO0FBMnRCZCxpQkFBZSxrQkEzdEJEO0FBNHRCZCxpQkFBZSxrQkE1dEJEO0FBNnRCZCxZQUFVLGtCQTd0Qkk7QUE4dEJkLGtCQUFnQixtQkE5dEJGO0FBK3RCZCxpQkFBZSxrQkEvdEJEO0FBZ3VCZCxnQkFBYyxpQkFodUJBO0FBaXVCZCxpQkFBZSxrQkFqdUJEO0FBa3VCZCxrQkFBZ0IsbUJBbHVCRjtBQW11QmQsa0JBQWdCLG1CQW51QkY7QUFvdUJkLFlBQVUsa0JBcHVCSTtBQXF1QmQsa0JBQWdCLG1CQXJ1QkY7QUFzdUJkLGlCQUFlLGtCQXR1QkQ7QUF1dUJkLGlCQUFlLGtCQXZ1QkQ7QUF3dUJkLFlBQVUsa0JBeHVCSTtBQXl1QmQsa0JBQWdCLG1CQXp1QkY7QUEwdUJkLGlCQUFlLGtCQTF1QkQ7QUEydUJkLGlCQUFlLGtCQTN1QkQ7QUE0dUJkLFlBQVUsa0JBNXVCSTtBQTZ1QmQsYUFBVyxtQkE3dUJHO0FBOHVCZCxtQkFBaUIsb0JBOXVCSDtBQSt1QmQsbUJBQWlCLG9CQS91Qkg7QUFndkJkLGFBQVcsbUJBaHZCRztBQWl2QmQsWUFBVSxrQkFqdkJJO0FBa3ZCZCxrQkFBZ0IsbUJBbHZCRjtBQW12QmQsaUJBQWUsa0JBbnZCRDtBQW92QmQsaUJBQWUsa0JBcHZCRDtBQXF2QmQsa0JBQWdCLG1CQXJ2QkY7QUFzdkJkLGtCQUFnQixtQkF0dkJGO0FBdXZCZCxhQUFXLG1CQXZ2Qkc7QUF3dkJkLFlBQVUsa0JBeHZCSTtBQXl2QmQsa0JBQWdCLG1CQXp2QkY7QUEwdkJkLGlCQUFlLGtCQTF2QkQ7QUEydkJkLGlCQUFlLGtCQTN2QkQ7QUE0dkJkLFlBQVUsa0JBNXZCSTtBQTZ2QmQsa0JBQWdCLG1CQTd2QkY7QUE4dkJkLGlCQUFlLGtCQTl2QkQ7QUErdkJkLGFBQVcsbUJBL3ZCRztBQWd3QmQsWUFBVSxrQkFod0JJO0FBaXdCZCxrQkFBZ0IsbUJBandCRjtBQWt3QmQsaUJBQWUsa0JBbHdCRDtBQW13QmQsYUFBVyxtQkFud0JHO0FBb3dCZCxhQUFXLG1CQXB3Qkc7QUFxd0JkLFlBQVUsa0JBcndCSTtBQXN3QmQsa0JBQWdCLG1CQXR3QkY7QUF1d0JkLGlCQUFlLGtCQXZ3QkQ7QUF3d0JkLGFBQVcsbUJBeHdCRztBQXl3QmQsWUFBVSxrQkF6d0JJO0FBMHdCZCxrQkFBZ0IsbUJBMXdCRjtBQTJ3QmQsa0JBQWdCLG1CQTN3QkY7QUE0d0JkLFlBQVUsa0JBNXdCSTtBQTZ3QmQsa0JBQWdCLG1CQTd3QkY7QUE4d0JkLGlCQUFlLGtCQTl3QkQ7QUErd0JkLFlBQVUsa0JBL3dCSTtBQWd4QmQsa0JBQWdCLG1CQWh4QkY7QUFpeEJkLGlCQUFlLGtCQWp4QkQ7QUFreEJkLGlCQUFlLGtCQWx4QkQ7QUFteEJkLGFBQVcsbUJBbnhCRztBQW94QmQsWUFBVSxrQkFweEJJO0FBcXhCZCxrQkFBZ0IsbUJBcnhCRjtBQXN4QmQsaUJBQWUsa0JBdHhCRDtBQXV4QmQsZ0JBQWMsaUJBdnhCQTtBQXd4QmQsaUJBQWUsa0JBeHhCRDtBQXl4QmQsa0JBQWdCLG1CQXp4QkY7QUEweEJkLGtCQUFnQixtQkExeEJGO0FBMnhCZCxzQkFBb0IsNEJBM3hCTjtBQTR4QmQsb0JBQWtCLDBCQTV4Qko7QUE2eEJkLDBCQUF3QiwyQkE3eEJWO0FBOHhCZCx5QkFBdUIsMEJBOXhCVDtBQSt4QmQseUJBQXVCLDBCQS94QlQ7QUFneUJkLDBCQUF3QiwyQkFoeUJWO0FBaXlCZCxnQkFBYyxzQkFqeUJBO0FBa3lCZCxZQUFVLGtCQWx5Qkk7QUFteUJkLGtCQUFnQixtQkFueUJGO0FBb3lCZCxpQkFBZSxrQkFweUJEO0FBcXlCZCxrQkFBZ0Isd0JBcnlCRjtBQXN5QmQsaUJBQWUsa0JBdHlCRDtBQXV5QmQsbUJBQWlCLHlCQXZ5Qkg7QUF3eUJkLG1CQUFpQix5QkF4eUJIO0FBeXlCZCxtQkFBaUIseUJBenlCSDtBQTB5QmQsbUJBQWlCLHlCQTF5Qkg7QUEyeUJkLGtCQUFnQix3QkEzeUJGO0FBNHlCZCxpQkFBZSxrQkE1eUJEO0FBNnlCZCxpQkFBZSxrQkE3eUJEO0FBOHlCZCxxQkFBbUIsc0JBOXlCTDtBQSt5QmQsZUFBYSxxQkEveUJDO0FBZ3pCZCxxQkFBbUIsMkJBaHpCTDtBQWl6QmQsaUJBQWUsa0JBanpCRDtBQWt6QmQsaUJBQWUsa0JBbHpCRDtBQW16QmQsZUFBYSxxQkFuekJDO0FBb3pCZCxpQkFBZSxzQkFwekJEO0FBcXpCZCxtQkFBaUIseUJBcnpCSDtBQXN6QmQsaUJBQWUsa0JBdHpCRDtBQXV6QmQsaUJBQWUsa0JBdnpCRDtBQXd6QmQsZ0JBQWMsc0JBeHpCQTtBQXl6QmQsaUJBQWUsdUJBenpCRDtBQTB6QmQsaUJBQWUsa0JBMXpCRDtBQTJ6QmQsZ0JBQWMsc0JBM3pCQTtBQTR6QmQsaUJBQWUsa0JBNXpCRDtBQTZ6QmQsY0FBWSxvQkE3ekJFO0FBOHpCZCxhQUFXLG1CQTl6Qkc7QUErekJkLGlCQUFlLGtCQS96QkQ7QUFnMEJkLG9CQUFrQix5QkFoMEJKO0FBaTBCZCxnQkFBYyxzQkFqMEJBO0FBazBCZCxnQkFBYyxzQkFsMEJBO0FBbTBCZCxpQkFBZSxrQkFuMEJEO0FBbzBCZCxtQkFBaUIseUJBcDBCSDtBQXEwQmQsa0JBQWdCLHdCQXIwQkY7QUFzMEJkLGNBQVksd0JBdDBCRTtBQXUwQmQsaUJBQWUsK0JBdjBCRDtBQXcwQmQsbUJBQWlCLHlCQXgwQkg7QUF5MEJkLGVBQWEscUJBejBCQztBQTAwQmQsbUJBQWlCLGVBMTBCSDtBQTIwQmQsY0FBWSxvQkEzMEJFO0FBNDBCZCxpQkFBZSxrQkE1MEJEO0FBNjBCZCx1QkFBcUIsNkJBNzBCUDtBQTgwQmQsaUJBQWUsa0JBOTBCRDtBQSswQmQsaUJBQWUsa0JBLzBCRDtBQWcxQmQsaUJBQWUsa0JBaDFCRDtBQWkxQmQsK0JBQTZCLGdDQWoxQmY7QUFrMUJkLG1CQUFpQix5QkFsMUJIO0FBbTFCZCxrQkFBZ0IsbUJBbjFCRjtBQW8xQmQsaUJBQWUsa0JBcDFCRDtBQXExQmQsZ0JBQWMsc0JBcjFCQTtBQXMxQmQsbUJBQWlCLHlCQXQxQkg7QUF1MUJkLG1CQUFpQix5QkF2MUJIO0FBdzFCZCxrQkFBZ0Isd0JBeDFCRjtBQXkxQmQsb0JBQWtCLHFCQXoxQko7QUEwMUJkLGlCQUFlLGtCQTExQkQ7QUEyMUJkLGlCQUFlLHVCQTMxQkQ7QUE0MUJkLGlCQUFlLGtCQTUxQkQ7QUE2MUJkLGlCQUFlLGtCQTcxQkQ7QUE4MUJkLGlCQUFlLGtCQTkxQkQ7QUErMUJkLG1CQUFpQix5QkEvMUJIO0FBZzJCZCxpQkFBZSxnQkFoMkJEO0FBaTJCZCxlQUFhLHFCQWoyQkM7QUFrMkJkLGlCQUFlLHVCQWwyQkQ7QUFtMkJkLGlCQUFlLHVCQW4yQkQ7QUFvMkJkLGtCQUFnQix3QkFwMkJGO0FBcTJCZCxhQUFXLG1CQXIyQkc7QUFzMkJkLGNBQVksb0JBdDJCRTtBQXUyQmQsZUFBYSxxQkF2MkJDO0FBdzJCZCxzQkFBb0IsbUJBeDJCTjtBQXkyQmQsaUJBQWUsa0JBejJCRDtBQTAyQmQsd0JBQXNCLDhCQTEyQlI7QUEyMkJkLGlCQUFlLGtCQTMyQkQ7QUE0MkJkLGlCQUFlLGtCQTUyQkQ7QUE2MkJkLG1CQUFpQix5QkE3MkJIO0FBODJCZCxjQUFZLG9CQTkyQkU7QUErMkJkLGVBQWEscUJBLzJCQztBQWczQmQsa0JBQWdCLGNBaDNCRjtBQWkzQmQsdUJBQXFCLDZCQWozQlA7QUFrM0JkLHVCQUFxQiw2QkFsM0JQO0FBbTNCZCx1QkFBcUIsNkJBbjNCUDtBQW8zQmQsdUJBQXFCLDZCQXAzQlA7QUFxM0JkLHVCQUFxQiw2QkFyM0JQO0FBczNCZCx1QkFBcUIsNkJBdDNCUDtBQXUzQmQsdUJBQXFCLDZCQXYzQlA7QUF3M0JkLHVCQUFxQiw2QkF4M0JQO0FBeTNCZCx1QkFBcUIsNkJBejNCUDtBQTAzQmQsdUJBQXFCLDZCQTEzQlA7QUEyM0JkLHVCQUFxQiw2QkEzM0JQO0FBNDNCZCx1QkFBcUIsNkJBNTNCUDtBQTYzQmQsdUJBQXFCLDZCQTczQlA7QUE4M0JkLHVCQUFxQiw2QkE5M0JQO0FBKzNCZCxjQUFZO0FBLzNCRSxDQUFoQjs7QUFrNEJBLE9BQU8sT0FBUCxHQUFpQixPQUFqQjs7Ozs7Ozs7Ozs7QUNwNEJBLElBQU0sS0FBSyxRQUFRLGNBQVIsQ0FBWDs7Ozs7OztBQU9BLElBQU0sU0FBUztBQUNiLGdCQUFjLHVCQUREO0FBRWIscUJBQW1CLDBCQUZOO0FBR2IsWUFBVTtBQUNSLGVBQVcsWUFESDtBQUVSLGNBQVU7QUFGRixHQUhHO0FBT2IsV0FBUyxPQUFPLFNBQVMsR0FBVCxHQUFlLFFBQWYsQ0FBd0IsQ0FBeEIsRUFBMkIsS0FBM0IsRUFBa0MsT0FBbEMsQ0FBMEMsS0FBMUMsRUFBaUQsTUFBakQsRUFBUCxFQUFrRSxPQUFsRSxDQUEwRSxLQUExRSxFQUFpRixNQUFqRixFQVBJO0FBUWIsWUFBVSxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUIsT0FBckIsRUFBOEIsUUFBOUIsQ0FBdUMsQ0FBdkMsRUFBMEMsTUFBMUMsRUFBa0QsT0FBbEQsQ0FBMEQsT0FBMUQsRUFBbUUsTUFBbkUsRUFSRztBQVNiLFlBQVUsR0FURztBQVViLG9CQUFrQixrQkFWTDtBQVdiLGdCQUFjLG9CQVhEO0FBWWIsa0JBQWdCLENBQUMsU0FBRCxFQUFZLFVBQVosQ0FaSDtBQWFiLG1CQUFpQjtBQWJKLENBQWY7O0FBZ0JBLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBLElBQU0sU0FBUyxRQUFRLFVBQVIsQ0FBZjtBQUNBLElBQU0sS0FBSyxRQUFRLGNBQVIsQ0FBWDs7OztJQUdNLFE7OztBQUNKLHNCQUFjO0FBQUE7O0FBQUEsb0hBQ04sTUFETTs7QUFFWixVQUFLLEdBQUwsR0FBVyxVQUFYOztBQUVBLFVBQUssUUFBTCxHQUFnQixFQUFoQjtBQUNBLFVBQUssTUFBTCxHQUFjLENBQWQ7QUFDQSxVQUFLLEdBQUwsR0FBVyxJQUFYO0FBQ0EsVUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsVUFBSyxTQUFMLEdBQWlCLEVBQWpCO0FBUlk7QUFTYjs7Ozs7Ozs7Ozs7aUNBT1k7QUFDWCxXQUFLLFNBQUw7QUFDQSxXQUFLLG1CQUFMO0FBQ0Q7Ozs7Ozs7Ozs7aUNBT1ksSyxFQUFPO0FBQ2xCLFdBQUssV0FBTDtBQUNBLFdBQUssVUFBTDs7O0FBR0EsVUFBSSxTQUFTLE1BQVQsS0FBb0IsS0FBSyxNQUF6QixJQUFtQyxDQUFDLEtBQXhDLEVBQStDO0FBQzdDLGVBQU8sS0FBUDtBQUNEO0FBQ0QsV0FBSyxNQUFMLEdBQWMsU0FBUyxNQUF2Qjs7QUFFQSxXQUFLLFNBQUwsQ0FBZSxLQUFmO0FBQ0EsYUFBTyxLQUFLLFFBQUwsR0FBZ0IsSUFBaEIsQ0FBcUIsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFyQixDQUFQO0FBQ0Q7Ozs7Ozs7OzsrQkFNVTtBQUNULFFBQUUsa0JBQUYsRUFBc0IsSUFBdEIsQ0FBMkIsRUFBM0I7O0FBRUEsVUFBSSxRQUFRLENBQVo7VUFBZSxRQUFRLENBQXZCOztBQUVBLGFBQU8sUUFBUSxLQUFLLE1BQUwsQ0FBWSxRQUFaLEdBQXVCLEtBQUssTUFBM0MsRUFBbUQ7QUFDakQsWUFBSSxPQUFPLEtBQUssUUFBTCxDQUFjLE9BQWQsQ0FBWDs7QUFFQSxZQUFJLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsS0FBSyxPQUE1QixDQUFKLEVBQTBDO0FBQzFDLFlBQUksQ0FBQyxLQUFLLEdBQVYsRUFBZSxLQUFLLEdBQUwsR0FBVyxLQUFLLEtBQWhCOztBQUVmLFlBQU0sUUFBUSxPQUFPLEtBQUssS0FBTCxHQUFhLEtBQUssR0FBekIsQ0FBZDtZQUNFLFlBQVksQ0FBQyxDQUFDLE9BQUYsR0FBWSxTQUFaLEdBQXdCLFVBRHRDOztBQUdBLFVBQUUsa0JBQUYsRUFBc0IsTUFBdEIsc0RBQ2tELEtBRGxELDhDQUM4RixTQUQ5RixlQUNpSCxLQURqSCx1QkFDd0ksS0FEeEksMEdBRW9GLFFBQVEsQ0FGNUYsbUpBSXVDLEVBQUUsS0FKekMsa0VBSzJDLEtBQUssVUFBTCxDQUFnQixLQUFLLE9BQXJCLENBTDNDLDBCQUs2RixLQUFLLE9BTGxHLHdIQU8yQyxLQUFLLGVBQUwsQ0FBcUIsS0FBSyxPQUExQixDQVAzQyxXQU9rRixLQUFLLFlBQUwsQ0FBa0IsS0FBSyxLQUF2QixDQVBsRjtBQVNEOztBQUVELFdBQUssVUFBTDtBQUNBLFdBQUssVUFBTDs7QUFFQSxXQUFLLG1CQUFMO0FBQ0Q7Ozs7Ozs7Ozs7OytCQVFVLEssRUFBNkI7QUFBQTs7QUFBQSxVQUF0QixhQUFzQix1RUFBTixJQUFNOztBQUN0QyxVQUFJLENBQUMsTUFBTSxPQUFOLENBQWMsS0FBZCxDQUFMLEVBQTJCLFFBQVEsQ0FBQyxLQUFELENBQVI7O0FBRTNCLFlBQU0sT0FBTixDQUFjLGdCQUFRO0FBQ3BCLFlBQUksQ0FBQyxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQUwsRUFBbUM7QUFDakMsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkI7QUFDRDtBQUNGLE9BSkQ7O0FBTUEsUUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLElBQTVCLENBQWlDLEVBQWpDOztBQUVBLFdBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBTSxjQUFjLEVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsT0FBaEIsRUFBeUIsSUFBekIsRUFBcEI7QUFDQSx1QkFBYSxXQUFiLGdCQUFxQyxRQUFyQyxDQUE4QyxPQUFLLE1BQUwsQ0FBWSxZQUExRDtBQUNELE9BSEQ7O0FBS0EsVUFBSSxhQUFKLEVBQW1CLEVBQUUsS0FBSyxNQUFMLENBQVksWUFBZCxFQUE0QixHQUE1QixDQUFnQyxLQUFLLFFBQXJDLEVBQStDLE9BQS9DLENBQXVELFFBQXZEO0FBQ3BCOzs7Ozs7Ozs7MENBTXFCO0FBQUE7O0FBQ3BCLFFBQUUsd0JBQUYsRUFBNEIsR0FBNUIsQ0FBZ0MsT0FBaEMsRUFBeUMsRUFBekMsQ0FBNEMsT0FBNUMsRUFBcUQsYUFBSztBQUN4RCxZQUFNLFdBQVcsT0FBSyxTQUFMLENBQWUsRUFBRSxFQUFFLE1BQUosRUFBWSxJQUFaLENBQWlCLFlBQWpCLENBQWYsQ0FBakI7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsUUFBaEI7QUFDQSxlQUFLLFVBQUw7QUFDRCxPQUpEO0FBS0Q7Ozs7Ozs7OztrQ0FNYTtBQUNaLFVBQUksRUFBRSx1QkFBRixFQUEyQixRQUEzQixDQUFvQyxrQkFBcEMsQ0FBSixFQUE2RDtBQUMzRCxVQUFFLHdCQUFGLEVBQTRCLEdBQTVCLENBQWdDLEVBQWhDO0FBQ0EsVUFBRSx1QkFBRixFQUEyQixXQUEzQixDQUF1QyxrQkFBdkMsRUFBMkQsUUFBM0QsQ0FBb0Usa0JBQXBFO0FBQ0EsYUFBSyxRQUFMO0FBQ0Q7QUFDRjs7Ozs7Ozs7Ozs7Z0NBUVc7QUFDVixVQUFJLGFBQWEsMENBQWpCOztBQUVBLFdBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsaUJBQVM7O0FBRTdCLFlBQUksUUFBUSxNQUFNLE1BQU0sT0FBTixDQUFjLE9BQWQsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBTixHQUEwQyxHQUF0RDs7QUFFQSxzQkFBaUIsS0FBakIsU0FBMEIsTUFBTSxLQUFoQztBQUNELE9BTEQ7O0FBT0EsV0FBSyxZQUFMLENBQWtCLFVBQWxCLEVBQThCLEtBQTlCO0FBQ0Q7Ozs7Ozs7Ozs7aUNBT1k7QUFDWCxVQUFNLGNBQWMsa0NBQWtDLEtBQUssU0FBTCxDQUFlLEtBQUssUUFBcEIsQ0FBdEQ7QUFDQSxXQUFLLFlBQUwsQ0FBa0IsV0FBbEIsRUFBK0IsTUFBL0I7QUFDRDs7Ozs7Ozs7Ozt3Q0FPbUI7QUFDbEIsVUFBTSxrQkFBa0IsS0FBSyxVQUFMLENBQWdCLE9BQWhCLEVBQXhCO0FBQ0EsVUFBSSxhQUFKOztBQUVBLFVBQUksS0FBSyxTQUFMLEVBQUosRUFBc0I7QUFDcEIsZUFBTyxPQUFPLGVBQVAsRUFBd0IsTUFBeEIsQ0FBK0IsU0FBL0IsQ0FBUDtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sT0FBTyxlQUFQLEVBQXdCLE1BQXhCLENBQStCLFlBQS9CLENBQVA7QUFDRDs7QUFFRCxhQUFVLEtBQUssR0FBZixTQUFzQixJQUF0QjtBQUNEOzs7Ozs7Ozs7O29DQU9lLE8sRUFBUzs7QUFFdkIsVUFBTSxPQUFPLE9BQU8sS0FBSyxVQUFMLENBQWdCLE9BQWhCLEVBQVAsQ0FBYjtBQUNBLFVBQUksa0JBQUo7VUFBZSxnQkFBZjtBQUNBLFVBQUksS0FBSyxTQUFMLEVBQUosRUFBc0I7QUFDcEIsb0JBQVksS0FBSyxNQUFMLENBQVksWUFBWixDQUFaO0FBQ0Esa0JBQVUsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFvQixNQUFwQixDQUEyQixZQUEzQixDQUFWO0FBQ0QsT0FIRCxNQUdPOztBQUVMLG9CQUFZLE9BQU8sSUFBUCxFQUFhLFFBQWIsQ0FBc0IsQ0FBdEIsRUFBeUIsTUFBekIsRUFBaUMsTUFBakMsQ0FBd0MsWUFBeEMsQ0FBWjtBQUNBLGtCQUFVLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxNQUFaLEVBQW9CLE1BQXBCLENBQTJCLFlBQTNCLENBQVY7QUFDRDs7QUFFRCxVQUFNLFdBQVcsRUFBRSxLQUFLLE1BQUwsQ0FBWSxnQkFBZCxFQUFnQyxHQUFoQyxFQUFqQjtVQUNFLFVBQVUsRUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLEdBQTVCLEVBRFo7O0FBR0EsbUNBQTJCLFNBQTNCLGFBQTRDLE9BQTVDLGlCQUErRCxPQUEvRCxrQkFBbUYsUUFBbkYsZUFBcUcsT0FBckc7QUFDRDs7Ozs7Ozs7OztnQ0FPOEI7QUFBQSxVQUFyQixZQUFxQix1RUFBTixJQUFNOztBQUM3QixVQUFJLFNBQVM7QUFDWCxpQkFBUyxFQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsRUFBNEIsR0FBNUIsRUFERTtBQUVYLGtCQUFVLEVBQUUsS0FBSyxNQUFMLENBQVksZ0JBQWQsRUFBZ0MsR0FBaEM7QUFGQyxPQUFiOztBQUtBLFVBQU0sa0JBQWtCLEtBQUssVUFBTCxDQUFnQixPQUFoQixFQUF4Qjs7Ozs7O0FBTUEsVUFBSSxLQUFLLFlBQUwsSUFBcUIsWUFBekIsRUFBdUM7QUFDckMsZUFBTyxJQUFQLEdBQWMsS0FBSyxZQUFMLENBQWtCLEtBQWhDO0FBQ0QsT0FGRCxNQUVPLElBQUksS0FBSyxTQUFMLEVBQUosRUFBc0I7QUFDM0IsZUFBTyxJQUFQLEdBQWMsT0FBTyxlQUFQLEVBQXdCLE1BQXhCLENBQStCLFNBQS9CLENBQWQ7QUFDRCxPQUZNLE1BRUE7QUFDTCxlQUFPLElBQVAsR0FBYyxPQUFPLGVBQVAsRUFBd0IsTUFBeEIsQ0FBK0IsWUFBL0IsQ0FBZDtBQUNEOztBQUVELGFBQU8sTUFBUDtBQUNEOzs7Ozs7Ozs7bUNBTWM7QUFDYixVQUFJLFNBQVMsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFiO0FBQ0EsYUFBTyxPQUFPLEtBQWQ7QUFDQSxhQUFPLE1BQVA7QUFDRDs7Ozs7Ozs7Ozs7b0NBUWUsSyxFQUFPO0FBQ3JCLFVBQUksVUFBVSxZQUFkLEVBQTRCO0FBQzFCLGFBQUssc0JBQUwsQ0FBNEIsU0FBNUI7QUFDQSxhQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsS0FBSyxNQUFMLENBQVksUUFBcEM7QUFDQSxhQUFLLFlBQUwsR0FBb0I7QUFDbEIsc0JBRGtCO0FBRWxCLGlCQUFPLE9BQU8sS0FBSyxNQUFMLENBQVksUUFBbkIsRUFBNkIsTUFBN0IsQ0FBb0MsU0FBcEM7QUFGVyxTQUFwQjtBQUlELE9BUEQsTUFPTyxJQUFJLFVBQVUsV0FBZCxFQUEyQjtBQUNoQyxhQUFLLHNCQUFMLENBQTRCLE9BQTVCO0FBQ0EsYUFBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLEtBQUssTUFBTCxDQUFZLE9BQXBDO0FBQ0EsYUFBSyxZQUFMLEdBQW9CO0FBQ2xCLHNCQURrQjtBQUVsQixpQkFBTyxPQUFPLEtBQUssTUFBTCxDQUFZLE9BQW5CLEVBQTRCLE1BQTVCLENBQW1DLFlBQW5DO0FBRlcsU0FBcEI7QUFJRCxPQVBNLE1BT0E7QUFDTCxlQUFPLEtBQVA7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7Ozs7Ozs7Ozs0QkFPTyxTLEVBQVc7QUFDakIsVUFBSSxhQUFKOztBQUVBLFVBQUksZUFBZSxJQUFmLENBQW9CLFNBQXBCLENBQUosRUFBb0M7O0FBRWxDLGFBQUssc0JBQUwsQ0FBNEIsU0FBNUI7QUFDQSxlQUFPLE9BQVUsU0FBVixVQUEwQixNQUExQixFQUFQOzs7QUFHQSxZQUFJLE9BQU8sS0FBSyxNQUFMLENBQVksUUFBdkIsRUFBaUM7QUFDL0IsaUJBQU8sS0FBSyxNQUFMLENBQVksUUFBbkI7QUFDRDtBQUNGLE9BVEQsTUFTTyxJQUFJLHFCQUFxQixJQUFyQixDQUEwQixTQUExQixDQUFKLEVBQTBDOztBQUUvQyxhQUFLLHNCQUFMLENBQTRCLE9BQTVCO0FBQ0EsZUFBTyxPQUFPLFNBQVAsRUFBa0IsTUFBbEIsRUFBUDs7O0FBR0EsWUFBSSxPQUFPLEtBQUssTUFBTCxDQUFZLE9BQXZCLEVBQWdDO0FBQzlCLGlCQUFPLEtBQUssTUFBTCxDQUFZLE9BQW5CO0FBQ0Q7QUFDRixPQVRNLE1BU0E7O0FBRUwsZUFBTyxLQUFLLGVBQUwsQ0FBcUIsU0FBckIsS0FBbUMsS0FBSyxlQUFMLENBQXFCLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsU0FBMUMsQ0FBMUM7QUFDRDs7O0FBR0QsVUFBSSxPQUFPLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsTUFBcEIsRUFBWCxFQUF5QztBQUN2QyxhQUFLLGFBQUwsQ0FBbUIsT0FBbkI7O0FBRUUsVUFBRSxJQUFGLENBQU8sZUFBUCxFQUF3QixPQUFPLEtBQUssTUFBTCxDQUFZLE9BQW5CLEVBQTRCLE1BQTVCLHFHQUF4QixDQUZGLEVBR0UsRUFBRSxJQUFGLENBQU8sZ0JBQVAsQ0FIRixFQUlFLElBSkY7QUFNQSxlQUFPLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsTUFBcEIsRUFBUDtBQUNEOztBQUVELGFBQU8sS0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLElBQXhCLENBQVA7QUFDRDs7Ozs7Ozs7OztnQ0FPVztBQUFBOzs7QUFFVixXQUFLLFdBQUw7O0FBRUEsVUFBTSxTQUFTLEtBQUssY0FBTCxDQUNiLEtBQUssZ0JBQUwsQ0FBc0IsVUFBdEIsQ0FEYSxDQUFmOzs7QUFLQSxVQUFJLE9BQU8sS0FBUCxJQUFnQixPQUFPLEtBQXZCLElBQWdDLE9BQU8sR0FBM0MsRUFBZ0Q7QUFDOUMsYUFBSyxjQUFMLENBQW9CLE1BQXBCO0FBQ0EsYUFBSyxhQUFMLENBQ0UsU0FERixtTEFJRSw2QkFKRixFQUtFLElBTEY7QUFPRDs7QUFFRCxXQUFLLE9BQUwsQ0FBYSxPQUFPLElBQXBCLEU7O0FBRUEsUUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLEVBQTRCLEdBQTVCLENBQWdDLE9BQU8sT0FBdkM7QUFDQSxRQUFFLEtBQUssTUFBTCxDQUFZLGdCQUFkLEVBQWdDLEdBQWhDLENBQW9DLE9BQU8sUUFBM0M7QUFDQSxXQUFLLFVBQUw7O0FBRUEsV0FBSyxRQUFMLEdBQWdCLENBQUMsT0FBTyxRQUFQLElBQW1CLEVBQXBCLEVBQXdCLEdBQXhCLENBQTRCO0FBQUEsZUFBVyxRQUFRLE9BQVIsRUFBWDtBQUFBLE9BQTVCLENBQWhCOztBQUVBLFdBQUssTUFBTCxHQUFjLFNBQVMsTUFBdkI7O0FBRUEsV0FBSyxRQUFMLEdBQWdCLElBQWhCLENBQXFCLFlBQU07QUFDekIsZUFBSyxRQUFMO0FBQ0QsT0FGRCxFQUVHLE1BRkgsQ0FFVSxZQUFNO0FBQ2QsZUFBSyxZQUFMO0FBQ0EsZUFBSyxjQUFMO0FBQ0QsT0FMRDtBQU1EOzs7Ozs7Ozs7Ozs7bUNBU2MsTSxFQUFROzs7QUFHckIsVUFBSSxPQUFPLElBQVAsSUFBZ0IsQ0FBQyxPQUFPLEtBQVIsSUFBaUIsQ0FBQyxPQUFPLEdBQXpCLElBQWdDLENBQUMsT0FBTyxLQUE1RCxFQUFvRSxPQUFPLE1BQVA7OztBQUdwRSxVQUFJLE9BQU8sS0FBWCxFQUFrQjtBQUNoQixlQUFPLElBQVAsR0FBYyxZQUFkO0FBQ0EsZUFBTyxNQUFQO0FBQ0Q7OztBQUdELFVBQU0sWUFBWSxvQkFBbEI7QUFDQSxVQUFJLENBQUMsVUFBVSxJQUFWLENBQWUsT0FBTyxLQUF0QixDQUFELElBQWlDLENBQUMsVUFBVSxJQUFWLENBQWUsT0FBTyxHQUF0QixDQUF0QyxFQUFrRTtBQUNoRSxlQUFPLElBQVAsR0FBYyxZQUFkO0FBQ0EsZUFBTyxNQUFQO0FBQ0Q7O0FBRUQsVUFBTSxZQUFZLE9BQU8sT0FBTyxLQUFkLEVBQXFCLFlBQXJCLENBQWxCO1VBQ0UsVUFBVSxPQUFPLE9BQU8sR0FBZCxFQUFtQixZQUFuQixDQURaO1VBRUUsVUFBVSxLQUFLLEdBQUwsQ0FBUyxRQUFRLElBQVIsQ0FBYSxTQUFiLEVBQXdCLE1BQXhCLENBQVQsQ0FGWjs7QUFJQSxVQUFJLFVBQVUsQ0FBZCxFQUFpQjtBQUNmLGVBQU8sSUFBUCxHQUFjLFVBQVUsTUFBVixDQUFpQixTQUFqQixDQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxJQUFQLEdBQWMsT0FBTyxLQUFyQjtBQUNEOztBQUVELGFBQU8sTUFBUDtBQUNEOzs7Ozs7Ozs7O2lDQU9ZO0FBQ1gsVUFBTSxXQUFXLEtBQUssbUJBQUwsQ0FBeUIsS0FBSyxRQUE5QixFQUF3QyxJQUF4QyxDQUE2QyxHQUE3QyxFQUFrRCxPQUFsRCxDQUEwRCxPQUExRCxFQUFtRSxNQUFuRSxDQUFqQjs7QUFFQSxVQUFJLE9BQU8sT0FBUCxJQUFrQixPQUFPLE9BQVAsQ0FBZSxZQUFyQyxFQUFtRDtBQUNqRCxlQUFPLE9BQVAsQ0FBZSxZQUFmLENBQTRCLEVBQTVCLEVBQWdDLFNBQVMsS0FBekMsUUFBb0QsRUFBRSxLQUFGLENBQVEsS0FBSyxTQUFMLEVBQVIsQ0FBcEQsa0JBQTBGLFFBQTFGO0FBQ0Q7O0FBRUQsUUFBRSxZQUFGLEVBQWdCLElBQWhCLENBQXFCLE1BQXJCLFFBQWlDLEVBQUUsS0FBRixDQUFRLEtBQUssWUFBTCxFQUFSLENBQWpDLGtCQUEwRSxRQUExRTtBQUNEOzs7Ozs7Ozs7bUNBTWM7QUFDYixVQUFNLGVBQWUsRUFBRSxLQUFLLE1BQUwsQ0FBWSxZQUFkLENBQXJCO0FBQ0EsbUJBQWEsR0FBYixDQUFpQixRQUFqQjtBQUNBLG1CQUFhLEdBQWIsQ0FBaUIsSUFBakI7QUFDQSxtQkFBYSxJQUFiLENBQWtCLEVBQWxCO0FBQ0EsbUJBQWEsT0FBYixDQUFxQixNQUFyQixFQUE2QixJQUE3QjtBQUNBLG1CQUFhLE9BQWIsQ0FBcUIsU0FBckI7QUFDQSxXQUFLLFlBQUw7QUFDRDs7Ozs7Ozs7O2dDQU0rQjtBQUFBLFVBQXRCLGFBQXNCLHVFQUFOLElBQU07O0FBQzlCLFdBQUssR0FBTCxHQUFXLElBQVg7QUFDQSxXQUFLLE1BQUwsR0FBYyxDQUFkO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsV0FBSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBSyxVQUFMLENBQWdCLElBQWhCO0FBQ0EsUUFBRSxrQkFBRixFQUFzQixJQUF0QixDQUEyQixFQUEzQjtBQUNBLFFBQUUsb0JBQUYsRUFBd0IsSUFBeEIsQ0FBNkIsRUFBN0I7QUFDQSxVQUFJLGFBQUosRUFBbUI7QUFDakIsYUFBSyxZQUFMO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0Q7QUFDRjs7Ozs7Ozs7OztxQ0FPZ0I7QUFBQTs7QUFDZixVQUFNLFFBQVEsRUFBRSx3QkFBRixFQUE0QixHQUE1QixFQUFkOztBQUVBLFVBQUksQ0FBQyxLQUFMLEVBQVksT0FBTyxLQUFLLFdBQUwsRUFBUDs7QUFFWixVQUFJLGNBQWMsRUFBbEI7VUFBc0IsUUFBUSxDQUE5Qjs7O0FBR0EsV0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixVQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWtCO0FBQ3RDLFlBQUksQ0FBQyxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQU0sT0FBN0IsQ0FBTCxFQUE0QztBQUMxQztBQUNBLGNBQUksSUFBSSxNQUFKLENBQVcsS0FBWCxFQUFrQixHQUFsQixFQUF1QixJQUF2QixDQUE0QixNQUFNLE9BQWxDLENBQUosRUFBZ0Q7QUFDOUMsa0JBQU0sSUFBTixHQUFhLEtBQWI7QUFDQSxrQkFBTSxLQUFOLEdBQWMsS0FBZDtBQUNBLHdCQUFZLElBQVosQ0FBaUIsS0FBakI7QUFDRDtBQUNGO0FBQ0YsT0FURDs7QUFXQSxRQUFFLGtCQUFGLEVBQXNCLElBQXRCLENBQTJCLEVBQTNCO0FBQ0EsUUFBRSxlQUFGLEVBQW1CLElBQW5CO0FBQ0EsUUFBRSx1QkFBRixFQUEyQixXQUEzQixDQUF1QyxrQkFBdkMsRUFBMkQsUUFBM0QsQ0FBb0Usa0JBQXBFOztBQUVBLGtCQUFZLE9BQVosQ0FBb0IsZ0JBQVE7QUFDMUIsWUFBTSxRQUFRLE9BQU8sS0FBSyxLQUFMLEdBQWEsT0FBSyxHQUF6QixDQUFkO1lBQ0UsWUFBWSxDQUFDLENBQUMsT0FBRixHQUFZLFNBQVosR0FBd0IsVUFEdEM7O0FBR0EsVUFBRSxrQkFBRixFQUFzQixNQUF0QixzRUFDa0UsU0FEbEUsZUFDcUYsS0FEckYsdUJBQzRHLEtBRDVHLHlHQUVvRixLQUFLLEtBRnpGLG9GQUd1QyxLQUFLLElBSDVDLGtFQUkyQyxPQUFLLFVBQUwsQ0FBZ0IsS0FBSyxPQUFyQixDQUozQywwQkFJNkYsS0FBSyxPQUpsRyx3SEFNMkMsT0FBSyxlQUFMLENBQXFCLEtBQUssT0FBMUIsQ0FOM0MsV0FNa0YsT0FBSyxZQUFMLENBQWtCLEtBQUssS0FBdkIsQ0FObEY7QUFRRCxPQVpEOztBQWNBLFdBQUssbUJBQUw7QUFDRDs7Ozs7Ozs7Ozs7b0NBUWUsQyxFQUFHO0FBQ2pCLDhIQUEwQixDQUExQixHQUE4QjtBQUM1QixhQUFLLFNBQUwsQ0FBZSxJQUFmO0FBQ0EsYUFBSyxZQUFMO0FBQ0Q7QUFDRjs7Ozs7Ozs7OzttQ0FPc0M7QUFBQTs7QUFBQSxVQUExQixRQUEwQix1RUFBZixLQUFLLFFBQVU7O0FBQ3JDLFVBQU0sZUFBZSxFQUFFLEtBQUssTUFBTCxDQUFZLFlBQWQsQ0FBckI7O0FBRUEsbUJBQWEsT0FBYixDQUFxQjtBQUNuQixjQUFNLEVBRGE7QUFFbkIsZ0NBQXdCLEVBRkw7QUFHbkIsNEJBQW9CLENBSEQ7QUFJbkIscUJBQWEsRUFBRSxJQUFGLENBQU8sa0JBQVA7QUFKTSxPQUFyQjs7QUFPQSxVQUFJLFNBQVMsTUFBYixFQUFxQixLQUFLLGtCQUFMLENBQXdCLFFBQXhCOztBQUVyQixtQkFBYSxFQUFiLENBQWdCLFFBQWhCLEVBQTBCLGFBQUs7QUFDN0IsZUFBSyxRQUFMLEdBQWdCLEVBQUUsRUFBRSxNQUFKLEVBQVksR0FBWixNQUFxQixFQUFyQztBQUNBLGVBQUssR0FBTCxHQUFXLElBQVg7QUFDQSxlQUFLLFdBQUw7QUFDQSxlQUFLLFFBQUw7QUFDRCxPQUxEOzs7Ozs7QUFXQSxpQkFBVyxZQUFNO0FBQ2YsVUFBRSx3QkFBRixFQUE0QixJQUE1QixDQUFpQyxVQUFqQyxFQUE2QyxJQUE3QztBQUNELE9BRkQ7QUFHRDs7Ozs7Ozs7Ozs7O3VDQVNrQixLLEVBQU87QUFBQTs7QUFDeEIsY0FBUSxNQUFNLEdBQU4sQ0FBVSxnQkFBUTs7QUFFeEIsWUFBTSxjQUFjLEVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBcEI7QUFDQSxVQUFFLGFBQWEsV0FBYixHQUEyQixXQUE3QixFQUEwQyxRQUExQyxDQUFtRCxPQUFLLE1BQUwsQ0FBWSxZQUEvRDtBQUNBLGVBQU8sSUFBUDtBQUNELE9BTE8sQ0FBUjtBQU1BLFFBQUUsS0FBSyxNQUFMLENBQVksWUFBZCxFQUE0QixPQUE1QixDQUFvQyxLQUFwQyxFQUEyQyxLQUEzQzs7QUFFQSxhQUFPLEtBQVA7QUFDRDs7Ozs7Ozs7Ozs7NkNBUXdDO0FBQUEsVUFBbEIsSUFBa0IsdUVBQVgsU0FBVzs7QUFDdkMsUUFBRSxtQkFBRixFQUF1QixHQUF2QixDQUEyQixJQUEzQjs7QUFFQSxVQUFNLG1CQUFtQixTQUFTLFNBQVQsR0FBcUI7QUFDNUMsZ0JBQVEsU0FEb0M7QUFFNUMsa0JBQVUsUUFGa0M7QUFHNUMscUJBQWEsUUFIK0I7QUFJNUMsaUJBQVMsS0FBSyxNQUFMLENBQVk7QUFKdUIsT0FBckIsR0FLckI7QUFDRixnQkFBUSxLQUFLLFVBRFg7QUFFRixrQkFBVSxNQUZSO0FBR0YsaUJBQVMsS0FBSyxNQUFMLENBQVk7QUFIbkIsT0FMSjs7QUFXQSxRQUFFLEtBQUssTUFBTCxDQUFZLGlCQUFkLEVBQWlDLFVBQWpDLENBQTRDLFNBQTVDO0FBQ0EsUUFBRSxLQUFLLE1BQUwsQ0FBWSxpQkFBZCxFQUFpQyxVQUFqQyxDQUNFLE9BQU8sTUFBUCxDQUFjO0FBQ1osbUJBQVcsSUFEQztBQUVaLG1CQUFXLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsTUFBcEI7QUFGQyxPQUFkLEVBR0csZ0JBSEgsQ0FERjtBQU1EOzs7Ozs7Ozs7cUNBTWdCO0FBQUE7O0FBQ2Y7O0FBRUEsUUFBRSxLQUFLLE1BQUwsQ0FBWSxnQkFBZCxFQUFnQyxFQUFoQyxDQUFtQyxRQUFuQyxFQUE2QyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBN0M7QUFDQSxRQUFFLG1CQUFGLEVBQXVCLEVBQXZCLENBQTBCLFFBQTFCLEVBQW9DLGFBQUs7O0FBRXZDLGVBQUssZUFBTCxDQUFxQixPQUFLLFNBQUwsS0FBbUIsWUFBbkIsR0FBa0MsV0FBdkQ7QUFDRCxPQUhEO0FBSUEsUUFBRSxlQUFGLEVBQW1CLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFlBQU07QUFDbkMsZUFBSyxNQUFMLElBQWUsT0FBSyxNQUFMLENBQVksUUFBM0I7QUFDQSxlQUFLLFFBQUw7QUFDRCxPQUhEO0FBSUEsUUFBRSxLQUFLLE1BQUwsQ0FBWSxpQkFBZCxFQUFpQyxFQUFqQyxDQUFvQyxRQUFwQyxFQUE4QyxhQUFLOztBQUVqRCxZQUFJLE9BQUssWUFBTCxJQUFxQixPQUFLLFlBQUwsQ0FBa0IsS0FBbEIsS0FBNEIsRUFBRSxNQUFGLENBQVMsS0FBOUQsRUFBcUU7QUFDbkUsaUJBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNEO0FBQ0QsZUFBSyxZQUFMO0FBQ0QsT0FORDtBQU9BLFFBQUUsd0JBQUYsRUFBNEIsRUFBNUIsQ0FBK0IsT0FBL0IsRUFBd0MsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXhDO0FBQ0EsUUFBRSx3QkFBRixFQUE0QixFQUE1QixDQUErQixPQUEvQixFQUF3QyxLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBeEM7QUFDQSxRQUFFLHVCQUFGLEVBQTJCLEVBQTNCLENBQThCLE9BQTlCLEVBQXVDLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUF2QztBQUNEOzs7Ozs7Ozs7O2tDQU9hO0FBQ1o7QUFDQSxRQUFFLGVBQUYsRUFBbUIsSUFBbkI7QUFDQSxRQUFFLGFBQUYsRUFBaUIsUUFBakIsQ0FBMEIsV0FBMUI7QUFDQSxRQUFFLGtCQUFGLEVBQXNCLFFBQXRCLENBQStCLFdBQS9CO0FBQ0EsUUFBRSxjQUFGLEVBQWtCLFFBQWxCLENBQTJCLFdBQTNCO0FBQ0Q7Ozs7Ozs7Ozs7OytCQVFVLGEsRUFBZTtBQUN4QjtBQUNBLFVBQUksQ0FBQyxhQUFMLEVBQW9CO0FBQ2xCLFVBQUUsYUFBRixFQUFpQixXQUFqQixDQUE2QixXQUE3QjtBQUNBLFVBQUUsa0JBQUYsRUFBc0IsV0FBdEIsQ0FBa0MsV0FBbEM7QUFDQSxVQUFFLGNBQUYsRUFBa0IsV0FBbEIsQ0FBOEIsV0FBOUI7QUFDQSxVQUFFLGVBQUYsRUFBbUIsSUFBbkI7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7O2dDQXVCVztBQUNWLGFBQU8sRUFBRSxtQkFBRixFQUF1QixHQUF2QixPQUFpQyxTQUF4QztBQUNEOzs7Ozs7Ozs7aUNBTVk7QUFDWCxVQUFNLGtCQUFrQixLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsRUFBeEI7O0FBRUEsVUFBSSxLQUFLLFNBQUwsRUFBSixFQUFzQjtBQUNwQixlQUFPLE9BQU8sZUFBUCxFQUF3QixNQUF4QixDQUErQixTQUEvQixJQUE0QyxXQUFuRDtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sT0FBTyxlQUFQLEVBQXdCLE1BQXhCLENBQStCLFlBQS9CLENBQVA7QUFDRDtBQUNGOzs7Ozs7Ozs7K0JBTVU7QUFBQTs7QUFDVCxVQUFJLE1BQU0sRUFBRSxRQUFGLEVBQVY7O0FBRUEsV0FBSyxXQUFMOztBQUVBLFVBQU0sU0FBUyxFQUFFLEtBQUssTUFBTCxDQUFZLGdCQUFkLEVBQWdDLEdBQWhDLEVBQWY7O0FBRUEsUUFBRSxJQUFGLENBQU87QUFDTCwwRUFBZ0UsS0FBSyxPQUFyRSxTQUFnRixNQUFoRixTQUEwRixLQUFLLFVBQUwsRUFEckY7QUFFTCxrQkFBVTtBQUZMLE9BQVAsRUFHRyxJQUhILENBR1EsZ0JBQVE7O0FBRWQsZUFBSyxRQUFMLEdBQWdCLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYyxRQUFkLENBQXVCLEdBQXZCLENBQTJCLGdCQUFRO0FBQ2pELGVBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLE9BQWIsRUFBZjtBQUNBLGlCQUFPLElBQVA7QUFDRCxTQUhlLENBQWhCOzs7QUFNQSxlQUFLLFNBQUwsR0FBaUIsT0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQjtBQUFBLGlCQUFRLEtBQUssT0FBYjtBQUFBLFNBQWxCLENBQWpCOztBQUVBLFlBQUksRUFBRSx3QkFBRixFQUE0QixFQUE1QixDQUErQixVQUEvQixDQUFKLEVBQWdEO0FBQzlDLGlCQUFLLGtCQUFMLENBQXdCLE9BQUssU0FBN0IsRUFBd0MsSUFBeEMsQ0FBNkMscUJBQWE7QUFDeEQsbUJBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNBLG1CQUFLLFFBQUwsR0FBZ0IsT0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQjtBQUFBLHFCQUFRLFVBQVUsUUFBVixDQUFtQixLQUFLLE9BQXhCLENBQVI7QUFBQSxhQUFyQixDQUFoQjtBQUNBLG1CQUFPLElBQUksT0FBSixDQUFZLE9BQUssUUFBakIsQ0FBUDtBQUNELFdBSkQ7QUFLRCxTQU5ELE1BTU87QUFDTCxpQkFBTyxJQUFJLE9BQUosQ0FBWSxPQUFLLFFBQWpCLENBQVA7QUFDRDtBQUNGLE9BdEJELEVBc0JHLElBdEJILENBc0JRLHFCQUFhO0FBQ25CLGVBQUssU0FBTDtBQUNBLGVBQUssWUFBTCxDQUFxQixFQUFFLElBQUYsQ0FBTyxXQUFQLEVBQW9CLGVBQXBCLENBQXJCLFdBQStELFVBQVUsWUFBVixDQUF1QixLQUF0RjtBQUNBLGVBQU8sSUFBSSxNQUFKLEVBQVA7QUFDRCxPQTFCRDs7QUE0QkEsYUFBTyxHQUFQO0FBQ0Q7Ozs7Ozs7Ozs7O3VDQVFrQixLLEVBQWdDO0FBQUE7O0FBQUEsVUFBekIsbUJBQXlCLHVFQUFILENBQUc7O0FBQ2pELFVBQUksTUFBTSxFQUFFLFFBQUYsRUFBVjs7QUFFQSxVQUFNLGNBQWMsU0FBZCxXQUFjLENBQUMsT0FBRCxFQUFVLHNCQUFWLEVBQXFDO0FBQ3ZELGVBQU8sUUFBUSxNQUFSLENBQWUsaUJBQVM7QUFDN0IsY0FBTSxLQUFLLE1BQU0sS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBWDs7O0FBR0EsY0FBSSx3QkFBd0IsQ0FBeEIsSUFBNkIsVUFBVSxRQUFLLFdBQUwsQ0FBaUIsUUFBSyxPQUF0QixFQUErQixPQUEvQixDQUF1QyxRQUFsRixFQUE0RjtBQUMxRixtQkFBTyxLQUFQO0FBQ0Q7Ozs7QUFJRCxjQUFJLENBQUMsTUFBTSxRQUFOLENBQWUsR0FBZixDQUFMLEVBQTBCLE9BQU8sSUFBUDs7QUFFMUIsaUJBQU8sQ0FBQyx1QkFBdUIsUUFBdkIsQ0FBZ0MsRUFBaEMsQ0FBUjtBQUNELFNBYk0sQ0FBUDtBQWNELE9BZkQ7O0FBaUJBLFdBQUssYUFBTCxDQUFtQixLQUFLLE9BQXhCLEVBQWlDLElBQWpDLENBQXNDLFlBQU07QUFDMUMsWUFBSSx5QkFBeUIsRUFBN0I7Ozs7O0FBS0EsWUFBSSx3QkFBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsbUNBQXlCLENBQUMsV0FBRCxFQUFjLFNBQWQsRUFBeUIsU0FBekIsQ0FBekI7QUFDRDs7QUFFRCxhQUFLLElBQU0sRUFBWCxJQUFpQixRQUFLLFdBQUwsQ0FBaUIsUUFBSyxPQUF0QixFQUErQixVQUFoRCxFQUE0RDtBQUMxRCxpQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBSyxXQUFMLENBQWlCLFFBQUssT0FBdEIsRUFBK0IsVUFBL0IsQ0FBMEMsRUFBMUMsRUFBOEMsR0FBOUMsQ0FBNUI7QUFDRDs7O0FBR0QsZ0JBQVEsWUFBWSxLQUFaLEVBQW1CLHNCQUFuQixDQUFSOzs7QUFHQSxnQkFBSyxRQUFMLEdBQWdCLFlBQVksUUFBSyxRQUFqQixFQUEyQixzQkFBM0IsQ0FBaEI7O0FBRUEsWUFBSSxPQUFKLENBQVksS0FBWjtBQUNELE9BckJELEVBcUJHLElBckJILENBcUJRLFlBQU07QUFDWixnQkFBSyxZQUFMLE1BQXFCLEVBQUUsSUFBRixDQUFPLFdBQVAsRUFBb0IsY0FBcEIsQ0FBckI7QUFDQSxZQUFJLE9BQUosQ0FBWSxLQUFaO0FBQ0QsT0F4QkQ7O0FBMEJBLGFBQU8sR0FBUDtBQUNEOzs7d0JBaklnQjtBQUNmLGFBQU8sb0dBQWlCLFdBQWpCLEVBQVA7QUFDRDs7Ozs7Ozs7O3dCQU1nQjtBQUNmLGFBQU8sRUFBRSxLQUFLLE1BQUwsQ0FBWSxpQkFBZCxFQUFpQyxJQUFqQyxDQUFzQyxZQUF0QyxDQUFQO0FBQ0Q7Ozs7RUF0b0JvQixFOztBQWd3QnZCLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTs7QUFFdEIsTUFBSSxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsSUFBMEIsQ0FBQyxTQUFTLFFBQVQsQ0FBa0IsTUFBakQsRUFBeUQ7QUFDdkQsV0FBTyxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsR0FBeUIsU0FBUyxRQUFULENBQWtCLElBQWxCLENBQXVCLE9BQXZCLENBQStCLEdBQS9CLEVBQW9DLEdBQXBDLENBQWhDO0FBQ0QsR0FGRCxNQUVPLElBQUksU0FBUyxRQUFULENBQWtCLElBQXRCLEVBQTRCO0FBQ2pDLFdBQU8sU0FBUyxRQUFULENBQWtCLElBQWxCLEdBQXlCLFNBQVMsUUFBVCxDQUFrQixJQUFsQixDQUF1QixPQUF2QixDQUErQixNQUEvQixFQUF1QyxFQUF2QyxDQUFoQztBQUNEOztBQUVELE1BQUksUUFBSjtBQUNELENBVEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAZmlsZSBDb3JlIEphdmFTY3JpcHQgZXh0ZW5zaW9ucywgZWl0aGVyIHRvIG5hdGl2ZSBKUyBvciBhIGxpYnJhcnkuXG4gKiAgIFBvbHlmaWxscyBoYXZlIHRoZWlyIG93biBmaWxlIFtwb2x5ZmlsbHMuanNdKGdsb2JhbC5odG1sI3BvbHlmaWxscylcbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuU3RyaW5nLnByb3RvdHlwZS5kZXNjb3JlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJlcGxhY2UoL18vZywgJyAnKTtcbn07XG5TdHJpbmcucHJvdG90eXBlLnNjb3JlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJlcGxhY2UoLyAvZywgJ18nKTtcbn07XG5TdHJpbmcucHJvdG90eXBlLnVwY2FzZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMuc2xpY2UoMSk7XG59O1xuU3RyaW5nLnByb3RvdHlwZS5lc2NhcGUgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgcyA9PiB7XG4gICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgfSk7XG59O1xuXG4vLyByZW1vdmUgZHVwbGljYXRlIHZhbHVlcyBmcm9tIEFycmF5XG5BcnJheS5wcm90b3R5cGUudW5pcXVlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgfSk7XG59O1xuXG4vLyBJbXByb3ZlIHN5bnRheCB0byBlbXVsYXRlIG1peGlucyBpbiBFUzZcbndpbmRvdy5taXggPSBzdXBlcmNsYXNzID0+IG5ldyBNaXhpbkJ1aWxkZXIoc3VwZXJjbGFzcyk7XG5jbGFzcyBNaXhpbkJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihzdXBlcmNsYXNzKSB7XG4gICAgdGhpcy5zdXBlcmNsYXNzID0gc3VwZXJjbGFzcztcbiAgfVxuXG4gIHdpdGgoLi4ubWl4aW5zKSB7XG4gICAgcmV0dXJuIG1peGlucy5yZWR1Y2UoKGMsIG1peGluKSA9PiBtaXhpbihjKSwgdGhpcy5zdXBlcmNsYXNzKTtcbiAgfVxufVxuXG4vKlxuICogSE9UIFBBVENIIGZvciBDaGFydC5qcyBnZXRFbGVtZW50c0F0RXZlbnRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL0NoYXJ0LmpzL2lzc3Vlcy8yMjk5XG4gKiBUT0RPOiByZW1vdmUgbWUgd2hlbiB0aGlzIGdldHMgaW1wbGVtZW50ZWQgaW50byBDaGFydHMuanMgY29yZVxuICovXG5pZiAodHlwZW9mIENoYXJ0ICE9PSAndW5kZWZpbmVkJykge1xuICBDaGFydC5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRFbGVtZW50c0F0RXZlbnQgPSBmdW5jdGlvbihlKSB7XG4gICAgbGV0IGhlbHBlcnMgPSBDaGFydC5oZWxwZXJzO1xuICAgIGxldCBldmVudFBvc2l0aW9uID0gaGVscGVycy5nZXRSZWxhdGl2ZVBvc2l0aW9uKGUsIHRoaXMuY2hhcnQpO1xuICAgIGxldCBlbGVtZW50c0FycmF5ID0gW107XG5cbiAgICBsZXQgZm91bmQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmRhdGFzZXRzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmRhdGFzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXModGhpcy5kYXRhLmRhdGFzZXRzW2ldLl9tZXRhKVswXTtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YVtrZXldLmRhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG1heC1kZXB0aCAqL1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5kYXRhc2V0c1tpXS5fbWV0YVtrZXldLmRhdGFbal0uaW5MYWJlbFJhbmdlKGV2ZW50UG9zaXRpb24ueCwgZXZlbnRQb3NpdGlvbi55KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmRhdGFzZXRzW2ldLl9tZXRhW2tleV0uZGF0YVtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KS5jYWxsKHRoaXMpO1xuXG4gICAgaWYgKCFmb3VuZCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnRzQXJyYXk7XG4gICAgfVxuXG4gICAgaGVscGVycy5lYWNoKHRoaXMuZGF0YS5kYXRhc2V0cywgZnVuY3Rpb24oZGF0YXNldCwgZHNJbmRleCkge1xuICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoZGF0YXNldC5fbWV0YSlbMF07XG4gICAgICBlbGVtZW50c0FycmF5LnB1c2goZGF0YXNldC5fbWV0YVtrZXldLmRhdGFbZm91bmQuX2luZGV4XSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZWxlbWVudHNBcnJheTtcbiAgfTtcbn1cblxuJC53aGVuQWxsID0gZnVuY3Rpb24oKSB7XG4gIGxldCBkZmQgPSAkLkRlZmVycmVkKCksXG4gICAgY291bnRlciA9IDAsXG4gICAgc3RhdGUgPSAncmVzb2x2ZWQnLFxuICAgIHByb21pc2VzID0gbmV3IEFycmF5KC4uLmFyZ3VtZW50cyk7XG5cbiAgY29uc3QgcmVzb2x2ZU9yUmVqZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdyZWplY3RlZCcpIHtcbiAgICAgIHN0YXRlID0gJ3JlamVjdGVkJztcbiAgICB9XG4gICAgY291bnRlcisrO1xuXG4gICAgaWYgKGNvdW50ZXIgPT09IHByb21pc2VzLmxlbmd0aCkge1xuICAgICAgZGZkW3N0YXRlID09PSAncmVqZWN0ZWQnID8gJ3JlamVjdCcgOiAncmVzb2x2ZSddKCk7XG4gICAgfVxuXG4gIH07XG5cbiAgJC5lYWNoKHByb21pc2VzLCAoX2ksIHByb21pc2UpID0+IHtcbiAgICBwcm9taXNlLmFsd2F5cyhyZXNvbHZlT3JSZWplY3QpO1xuICB9KTtcblxuICByZXR1cm4gZGZkLnByb21pc2UoKTtcbn07XG4iLCIvKipcbiAqIEBmaWxlIFBvbHlmaWxscyBmb3IgdXNlcnMgd2hvIHJlZnVzZSB0byB1cGdyYWRlIHRoZWlyIGJyb3dzZXJzXG4gKiAgIE1vc3QgY29kZSBpcyBhZGFwdGVkIGZyb20gW01ETl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcpXG4gKi9cblxuLy8gQXJyYXkuaW5jbHVkZXMgZnVuY3Rpb24gcG9seWZpbGxcbi8vIFRoaXMgaXMgbm90IGEgZnVsbCBpbXBsZW1lbnRhdGlvbiwganVzdCBhIHNob3J0aGFuZCB0byBpbmRleE9mICE9PSAtMVxuaWYgKCAhQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzICkge1xuICBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbihzZWFyY2gpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleE9mKHNlYXJjaCkgIT09IC0xO1xuICB9O1xufVxuXG4vLyBTdHJpbmcuaW5jbHVkZXMgZnVuY3Rpb24gcG9seWZpbGxcbmlmICggIVN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXMgKSB7XG4gIFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbihzZWFyY2gsIHN0YXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgKyBzZWFyY2gubGVuZ3RoID4gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZihzZWFyY2gsc3RhcnQpICE9PSAtMTtcbiAgICB9XG4gIH07XG59XG5cbi8vIE9iamVjdC5hc3NpZ25cbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAoZnVuY3Rpb24oKSB7XG4gICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgIH1cblxuICAgICAgbGV0IG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgbGV0IHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICBmb3IgKGxldCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG4gIH0pKCk7XG59XG5cbi8vIENoaWxkTm9kZS5yZW1vdmVcbmlmICghKCdyZW1vdmUnIGluIEVsZW1lbnQucHJvdG90eXBlKSkge1xuICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XG4gIH07XG59XG5cbi8vIFN0cmluZy5zdGFydHNXaXRoXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCkge1xuICBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBmdW5jdGlvbihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSB7XG4gICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCAwO1xuICAgIHJldHVybiB0aGlzLnN1YnN0cihwb3NpdGlvbiwgc2VhcmNoU3RyaW5nLmxlbmd0aCkgPT09IHNlYXJjaFN0cmluZztcbiAgfTtcbn1cblxuLy8gQXJyYXkub2ZcbmlmICghQXJyYXkub2YpIHtcbiAgQXJyYXkub2YgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLy8gQXJyYXkuZmluZFxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICBBcnJheS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xuICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gICAgbGV0IGxpc3QgPSBPYmplY3QodGhpcyk7XG4gICAgbGV0IGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xuICAgIGxldCB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgIGxldCB2YWx1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gbGlzdFtpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xufVxuXG4vLyBBcnJheS5maWxsXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maWxsKSB7XG4gIEFycmF5LnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24odmFsdWUpIHtcblxuICAgIC8vIFN0ZXBzIDEtMi5cbiAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGhpcyBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgbGV0IE8gPSBPYmplY3QodGhpcyk7XG5cbiAgICAvLyBTdGVwcyAzLTUuXG4gICAgbGV0IGxlbiA9IE8ubGVuZ3RoID4+PiAwO1xuXG4gICAgLy8gU3RlcHMgNi03LlxuICAgIGxldCBzdGFydCA9IGFyZ3VtZW50c1sxXTtcbiAgICBsZXQgcmVsYXRpdmVTdGFydCA9IHN0YXJ0ID4+IDA7XG5cbiAgICAvLyBTdGVwIDguXG4gICAgbGV0IGsgPSByZWxhdGl2ZVN0YXJ0IDwgMCA/XG4gICAgICBNYXRoLm1heChsZW4gKyByZWxhdGl2ZVN0YXJ0LCAwKSA6XG4gICAgICBNYXRoLm1pbihyZWxhdGl2ZVN0YXJ0LCBsZW4pO1xuXG4gICAgLy8gU3RlcHMgOS0xMC5cbiAgICBsZXQgZW5kID0gYXJndW1lbnRzWzJdO1xuICAgIGxldCByZWxhdGl2ZUVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID9cbiAgICAgIGxlbiA6IGVuZCA+PiAwO1xuXG4gICAgLy8gU3RlcCAxMS5cbiAgICBsZXQgZmluYWwgPSByZWxhdGl2ZUVuZCA8IDAgP1xuICAgICAgTWF0aC5tYXgobGVuICsgcmVsYXRpdmVFbmQsIDApIDpcbiAgICAgIE1hdGgubWluKHJlbGF0aXZlRW5kLCBsZW4pO1xuXG4gICAgLy8gU3RlcCAxMi5cbiAgICB3aGlsZSAoayA8IGZpbmFsKSB7XG4gICAgICBPW2tdID0gdmFsdWU7XG4gICAgICBrKys7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxMy5cbiAgICByZXR1cm4gTztcbiAgfTtcbn1cbiIsIi8qKlxuICogQGZpbGUgU2hhcmVkIGNvZGUgYW1vbmdzdCBhbGwgYXBwcyAoUGFnZXZpZXdzLCBUb3B2aWV3cywgTGFuZ3ZpZXdzLCBTaXRldmlld3MsIE1hc3N2aWV3cywgUmVkaXJlY3QgVmlld3MpXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsLCBLYWxkYXJpXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cbi8qKiBjbGFzcy1sZXNzIGZpbGVzIHdpdGggZ2xvYmFsIG92ZXJyaWRlcyAqL1xucmVxdWlyZSgnLi9jb3JlX2V4dGVuc2lvbnMnKTtcbnJlcXVpcmUoJy4vcG9seWZpbGxzJyk7XG5cbmNvbnN0IFB2Q29uZmlnID0gcmVxdWlyZSgnLi9wdl9jb25maWcnKTtcbmNvbnN0IHNpdGVNYXAgPSByZXF1aXJlKCcuL3NpdGVfbWFwJyk7XG5jb25zdCBzaXRlRG9tYWlucyA9IE9iamVjdC5rZXlzKHNpdGVNYXApLm1hcChrZXkgPT4gc2l0ZU1hcFtrZXldKTtcblxuLyoqIFB2IGNsYXNzLCBjb250YWlucyBjb2RlIGFtb25nc3QgYWxsIGFwcHMgKFBhZ2V2aWV3cywgVG9wdmlld3MsIExhbmd2aWV3cywgU2l0ZXZpZXdzLCBNYXNzdmlld3MsIFJlZGlyZWN0IFZpZXdzKSAqL1xuY2xhc3MgUHYgZXh0ZW5kcyBQdkNvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGFwcENvbmZpZykge1xuICAgIHN1cGVyKGFwcENvbmZpZyk7XG5cbiAgICAvKiogYXNzaWduIGluaXRpYWwgY2xhc3MgcHJvcGVydGllcyAqL1xuICAgIGNvbnN0IGRlZmF1bHRzID0gdGhpcy5jb25maWcuZGVmYXVsdHMsXG4gICAgICB2YWxpZFBhcmFtcyA9IHRoaXMuY29uZmlnLnZhbGlkUGFyYW1zO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcsIGFwcENvbmZpZyk7XG4gICAgdGhpcy5jb25maWcuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgYXBwQ29uZmlnLmRlZmF1bHRzKTtcbiAgICB0aGlzLmNvbmZpZy52YWxpZFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIHZhbGlkUGFyYW1zLCBhcHBDb25maWcudmFsaWRQYXJhbXMpO1xuXG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RvcmFnZSA9IHt9OyAvLyB1c2VkIGFzIGZhbGxiYWNrIHdoZW4gbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcblxuICAgIFsnbG9jYWxpemVEYXRlRm9ybWF0JywgJ251bWVyaWNhbEZvcm1hdHRpbmcnLCAnYmV6aWVyQ3VydmUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9Mb2dEZXRlY3Rpb24nLCAnYmVnaW5BdFplcm8nLCAncmVtZW1iZXJDaGFydCddLmZvckVhY2goc2V0dGluZyA9PiB7XG4gICAgICB0aGlzW3NldHRpbmddID0gdGhpcy5nZXRGcm9tTG9jYWxTdG9yYWdlKGBwYWdldmlld3Mtc2V0dGluZ3MtJHtzZXR0aW5nfWApIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzW3NldHRpbmddO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0dXBTZXR0aW5nc01vZGFsKCk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IG51bGw7XG4gICAgdGhpcy5zaXRlSW5mbyA9IHt9O1xuXG4gICAgLyoqIEB0eXBlIHtudWxsfERhdGV9IHRyYWNraW5nIG9mIGVsYXBzZWQgdGltZSAqL1xuICAgIHRoaXMucHJvY2Vzc1N0YXJ0ID0gbnVsbDtcblxuICAgIC8qKiBhc3NpZ24gYXBwIGluc3RhbmNlIHRvIHdpbmRvdyBmb3IgZGVidWdnaW5nIG9uIGxvY2FsIGVudmlyb25tZW50ICovXG4gICAgaWYgKGxvY2F0aW9uLmhvc3QgPT09ICdsb2NhbGhvc3QnKSB7XG4gICAgICB3aW5kb3cuYXBwID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGxhc2goKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlYnVnID0gbG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKCdkZWJ1Zz10cnVlJykgfHwgbG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCc7XG5cbiAgICAvKiogc2hvdyBub3RpY2UgaWYgb24gc3RhZ2luZyBlbnZpcm9ubWVudCAqL1xuICAgIGlmICgvLXRlc3QvLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpKSB7XG4gICAgICBjb25zdCBhY3R1YWxQYXRoTmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoLy10ZXN0XFwvPy8sICcnKTtcbiAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnd2FybmluZycsXG4gICAgICAgIGBUaGlzIGlzIGEgc3RhZ2luZyBlbnZpcm9ubWVudC4gRm9yIHRoZSBhY3R1YWwgJHtkb2N1bWVudC50aXRsZX0sXG4gICAgICAgICBzZWUgPGEgaHJlZj0nJHthY3R1YWxQYXRoTmFtZX0nPiR7bG9jYXRpb24uaG9zdG5hbWV9JHthY3R1YWxQYXRoTmFtZX08L2E+YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRyYW5zbGF0aW9ucyB0aGVuIGluaXRpYWxpemUgdGhlIGFwcC5cbiAgICAgKiBFYWNoIGFwcCBoYXMgaXQncyBvd24gaW5pdGlhbGl6ZSBtZXRob2QuXG4gICAgICogTWFrZSBzdXJlIHdlIGxvYWQgJ2VuLmpzb24nIGFzIGEgZmFsbGJhY2tcbiAgICAgKi9cbiAgICBsZXQgbWVzc2FnZXNUb0xvYWQgPSB7XG4gICAgICBbaTE4bkxhbmddOiBgL3BhZ2V2aWV3cy9tZXNzYWdlcy8ke2kxOG5MYW5nfS5qc29uYFxuICAgIH07XG4gICAgaWYgKGkxOG5MYW5nICE9PSAnZW4nKSB7XG4gICAgICBtZXNzYWdlc1RvTG9hZC5lbiA9ICcvcGFnZXZpZXdzL21lc3NhZ2VzL2VuLmpzb24nO1xuICAgIH1cbiAgICAkLmkxOG4oe1xuICAgICAgbG9jYWxlOiBpMThuTGFuZ1xuICAgIH0pLmxvYWQobWVzc2FnZXNUb0xvYWQpLnRoZW4odGhpcy5pbml0aWFsaXplLmJpbmQodGhpcykpO1xuXG4gICAgLyoqIHNldCB1cCB0b2FzdHIgY29uZmlnLiBUaGUgZHVyYXRpb24gbWF5IGJlIG92ZXJyaWRlbiBsYXRlciAqL1xuICAgIHRvYXN0ci5vcHRpb25zID0ge1xuICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICBkZWJ1ZzogbG9jYXRpb24uaG9zdCA9PT0gJ2xvY2FsaG9zdCcsXG4gICAgICBuZXdlc3RPblRvcDogZmFsc2UsXG4gICAgICBwcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtdG9wLWNlbnRlcicsXG4gICAgICBwcmV2ZW50RHVwbGljYXRlczogdHJ1ZSxcbiAgICAgIG9uY2xpY2s6IG51bGwsXG4gICAgICBzaG93RHVyYXRpb246ICczMDAnLFxuICAgICAgaGlkZUR1cmF0aW9uOiAnMTAwMCcsXG4gICAgICB0aW1lT3V0OiAnNTAwMCcsXG4gICAgICBleHRlbmRlZFRpbWVPdXQ6ICczMDAwJyxcbiAgICAgIHNob3dFYXNpbmc6ICdzd2luZycsXG4gICAgICBoaWRlRWFzaW5nOiAnbGluZWFyJyxcbiAgICAgIHNob3dNZXRob2Q6ICdmYWRlSW4nLFxuICAgICAgaGlkZU1ldGhvZDogJ2ZhZGVPdXQnLFxuICAgICAgdG9hc3RDbGFzczogJ2FsZXJ0JyxcbiAgICAgIGljb25DbGFzc2VzOiB7XG4gICAgICAgIGVycm9yOiAnYWxlcnQtZGFuZ2VyJyxcbiAgICAgICAgaW5mbzogJ2FsZXJ0LWluZm8nLFxuICAgICAgICBzdWNjZXNzOiAnYWxlcnQtc3VjY2VzcycsXG4gICAgICAgIHdhcm5pbmc6ICdhbGVydC13YXJuaW5nJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgc2l0ZSBub3RpY2UgKEJvb3RzdHJhcCBhbGVydClcbiAgICogQHBhcmFtIHtTdHJpbmd9IGxldmVsIC0gb25lIG9mICdzdWNjZXNzJywgJ2luZm8nLCAnd2FybmluZycgb3IgJ2Vycm9yJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAtIG1lc3NhZ2UgdG8gc2hvd1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3RpdGxlXSAtIHdpbGwgYXBwZWFyIGluIGJvbGQgYW5kIGluIGZyb250IG9mIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2Rpc21pc3NhYmxlXSAtIHdoZXRoZXIgb3Igbm90IHRvIGFkZCBhIFhcbiAgICogICB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBkaXNtaXNzIHRoZSBub3RpY2VcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGFkZFNpdGVOb3RpY2UobGV2ZWwsIG1lc3NhZ2UsIHRpdGxlLCBkaXNtaXNzYWJsZSkge1xuICAgIHRpdGxlID0gdGl0bGUgPyBgPHN0cm9uZz4ke3RpdGxlfTwvc3Ryb25nPiBgIDogJyc7XG5cbiAgICBsZXQgbWFya3VwID0gdGl0bGUgKyBtZXNzYWdlO1xuXG4gICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICBtYXJrdXAsXG4gICAgICBsZXZlbCxcbiAgICAgIGRpc21pc3NhYmxlID8gMTAwMDAgOiAwXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2l0ZSBub3RpY2UgZm9yIGludmFsaWQgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSAtIG5hbWUgb2YgcGFyYW1ldGVyXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRJbnZhbGlkUGFyYW1Ob3RpY2UocGFyYW0pIHtcbiAgICBjb25zdCBkb2NMaW5rID0gYDxhIGhyZWY9Jy8ke3RoaXMuYXBwfS91cmxfc3RydWN0dXJlJz4keyQuaTE4bignZG9jdW1lbnRhdGlvbicpfTwvYT5gO1xuICAgIHRoaXMuYWRkU2l0ZU5vdGljZShcbiAgICAgICdlcnJvcicsXG4gICAgICAkLmkxOG4oJ3BhcmFtLWVycm9yLTMnLCBwYXJhbSwgZG9jTGluayksXG4gICAgICAkLmkxOG4oJ2ludmFsaWQtcGFyYW1zJyksXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB0aGUgZGF0ZSByYW5nZSBvZiBnaXZlbiBwYXJhbXNcbiAgICogICBhbmQgdGhyb3cgZXJyb3JzIGFzIG5lY2Vzc2FyeSBhbmQvb3Igc2V0IGRlZmF1bHRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBhcyByZXR1cm5lZCBieSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoKVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGVyZSB3ZXJlIG5vIGVycm9ycywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICB2YWxpZGF0ZURhdGVSYW5nZShwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnJhbmdlKSB7XG4gICAgICBpZiAoIXRoaXMuc2V0U3BlY2lhbFJhbmdlKHBhcmFtcy5yYW5nZSkpIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ3JhbmdlJyk7XG4gICAgICAgIHRoaXMuc2V0U3BlY2lhbFJhbmdlKHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVSYW5nZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgIGNvbnN0IGRhdGVSZWdleCA9IC9cXGR7NH0tXFxkezJ9LVxcZHsyfSQvO1xuXG4gICAgICAvLyBmaXJzdCBzZXQgZGVmYXVsdHNcbiAgICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XG5cbiAgICAgIC8vIHRoZW4gY2hlY2sgZm9ybWF0IG9mIHN0YXJ0IGFuZCBlbmQgZGF0ZVxuICAgICAgaWYgKHBhcmFtcy5zdGFydCAmJiBkYXRlUmVnZXgudGVzdChwYXJhbXMuc3RhcnQpKSB7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG1vbWVudChwYXJhbXMuc3RhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRJbnZhbGlkUGFyYW1Ob3RpY2UoJ3N0YXJ0Jyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMuZW5kICYmIGRhdGVSZWdleC50ZXN0KHBhcmFtcy5lbmQpKSB7XG4gICAgICAgIGVuZERhdGUgPSBtb21lbnQocGFyYW1zLmVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZSgnZW5kJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgdGhleSBhcmUgb3V0c2lkZSB0aGUgdmFsaWQgcmFuZ2Ugb3IgaWYgaW4gdGhlIHdyb25nIG9yZGVyXG4gICAgICBpZiAoc3RhcnREYXRlIDwgdGhpcy5jb25maWcubWluRGF0ZSB8fCBlbmREYXRlIDwgdGhpcy5jb25maWcubWluRGF0ZSkge1xuICAgICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ2Vycm9yJyxcbiAgICAgICAgICAkLmkxOG4oJ3BhcmFtLWVycm9yLTEnLCBtb21lbnQodGhpcy5jb25maWcubWluRGF0ZSkuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCkpLFxuICAgICAgICAgICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSxcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnREYXRlID4gZW5kRGF0ZSkge1xuICAgICAgICB0aGlzLmFkZFNpdGVOb3RpY2UoJ2Vycm9yJywgJC5pMThuKCdwYXJhbS1lcnJvci0yJyksICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyoqIGRpcmVjdGx5IGFzc2lnbiBzdGFydERhdGUgYmVmb3JlIGNhbGxpbmcgc2V0RW5kRGF0ZSBzbyBldmVudHMgd2lsbCBiZSBmaXJlZCBvbmNlICovXG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zZXRFbmREYXRlKGVuZERhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFNwZWNpYWxSYW5nZSh0aGlzLmNvbmZpZy5kZWZhdWx0cy5kYXRlUmFuZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2xlYXJTaXRlTm90aWNlcygpIHtcbiAgICAkKCcuc2l0ZS1ub3RpY2UnKS5odG1sKCcnKTtcbiAgfVxuXG4gIGNsZWFyTWVzc2FnZXMoKSB7XG4gICAgJCgnLm1lc3NhZ2UtY29udGFpbmVyJykuaHRtbCgnJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGUgZm9ybWF0IHRvIHVzZSBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkYXRlIGZvcm1hdCB0byBwYXNzZWQgdG8gcGFyc2VyXG4gICAqL1xuICBnZXQgZGF0ZUZvcm1hdCgpIHtcbiAgICBpZiAodGhpcy5sb2NhbGl6ZURhdGVGb3JtYXQgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9jYWxlRGF0ZVN0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuZGVmYXVsdHMuZGF0ZUZvcm1hdDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRlcmFuZ2VwaWNrZXIgaW5zdGFuY2UuIFBsYWluIGFuZCBzaW1wbGUuXG4gICAqIEByZXR1cm4ge09iamVjdH0gZGF0ZXJhbmdlIHBpY2tlclxuICAgKi9cbiAgZ2V0IGRhdGVyYW5nZXBpY2tlcigpIHtcbiAgICByZXR1cm4gJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3RvcikuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkYXRhYmFzZSBuYW1lIG9mIHRoZSBnaXZlbiBwcm9qZXRcbiAgICogQHBhcmFtICB7U3RyaW5nfSBwcm9qZWN0IC0gd2l0aCBvciB3aXRob3V0IC5vcmdcbiAgICogQHJldHVybiB7U3RyaW5nfSBkYXRhYmFzZSBuYW1lXG4gICAqL1xuICBkYk5hbWUocHJvamVjdCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzaXRlTWFwKS5maW5kKGtleSA9PiBzaXRlTWFwW2tleV0gPT09IGAke3Byb2plY3QucmVwbGFjZSgvXFwub3JnJC8sJycpfS5vcmdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSBkb3dubG9hZCBvZiBnaXZlbiBkYXRhLCBvciBvcGVuIGluIGEgbmV3IHRhYiBpZiBIVE1MNSA8YT4gZG93bmxvYWQgYXR0cmlidXRlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgLSBSYXcgZGF0YSBwcmVwZW5kZWQgd2l0aCBkYXRhIHR5cGUsIGUuZy4gXCJkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsbXkgZGF0YS4uLlwiXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBleHRlbnNpb24gLSB0aGUgZmlsZSBleHRlbnNpb24gdG8gdXNlXG4gICAqIEByZXR1cm5zIHtudWxsfSBOb3RoaW5nXG4gICAqL1xuICBkb3dubG9hZERhdGEoZGF0YSwgZXh0ZW5zaW9uKSB7XG4gICAgY29uc3QgZW5jb2RlZFVyaSA9IGVuY29kZVVSSShkYXRhKTtcblxuICAgIC8vIGNyZWF0ZSBIVE1MNSBkb3dubG9hZCBlbGVtZW50IGFuZCBmb3JjZSBjbGljayBzbyB3ZSBjYW4gc3BlY2lmeSBhIGZpbGVuYW1lXG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpZiAodHlwZW9mIGxpbmsuZG93bmxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspOyAvLyBGaXJlZm94IHJlcXVpcmVzIHRoZSBsaW5rIHRvIGJlIGluIHRoZSBib2R5XG5cbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYCR7dGhpcy5nZXRFeHBvcnRGaWxlbmFtZSgpfS4ke2V4dGVuc2lvbn1gO1xuICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgICAgbGluay5ocmVmID0gZW5jb2RlZFVyaTtcbiAgICAgIGxpbmsuY2xpY2soKTtcblxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTsgLy8gcmVtb3ZlIHRoZSBsaW5rIHdoZW4gZG9uZVxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cub3BlbihlbmNvZGVkVXJpKTsgLy8gb3BlbiBpbiBuZXcgdGFiIGlmIGRvd25sb2FkIGlzbid0IHN1cHBvcnRlZCAoKmNvdWdoKiBTYWZhcmkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbGwgaW4gdmFsdWVzIHdpdGhpbiBzZXR0aW5ncyBtb2RhbCB3aXRoIHdoYXQncyBpbiB0aGUgc2Vzc2lvbiBvYmplY3RcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGZpbGxJblNldHRpbmdzKCkge1xuICAgICQuZWFjaCgkKCcjc2V0dGluZ3MtbW9kYWwgaW5wdXQnKSwgKGluZGV4LCBlbCkgPT4ge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IHRoaXNbZWwubmFtZV0gPT09ICd0cnVlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB0aGlzW2VsLm5hbWVdID09PSBlbC52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZm9jdXMgdG8gU2VsZWN0MiBpbnB1dCBmaWVsZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZm9jdXNTZWxlY3QyKCkge1xuICAgICQoJy5zZWxlY3QyLXNlbGVjdGlvbicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgJCgnLnNlbGVjdDItc2VhcmNoX19maWVsZCcpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IG51bWJlciBiYXNlZCBvbiBjdXJyZW50IHNldHRpbmdzLCBlLmcuIGxvY2FsaXplIHdpdGggY29tbWEgZGVsaW1ldGVyc1xuICAgKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IG51bSAtIG51bWJlciB0byBmb3JtYXRcbiAgICogQHJldHVybnMge3N0cmluZ30gZm9ybWF0dGVkIG51bWJlclxuICAgKi9cbiAgZm9ybWF0TnVtYmVyKG51bSkge1xuICAgIGNvbnN0IG51bWVyaWNhbEZvcm1hdHRpbmcgPSB0aGlzLmdldEZyb21Mb2NhbFN0b3JhZ2UoJ3BhZ2V2aWV3cy1zZXR0aW5ncy1udW1lcmljYWxGb3JtYXR0aW5nJykgfHwgdGhpcy5jb25maWcuZGVmYXVsdHMubnVtZXJpY2FsRm9ybWF0dGluZztcbiAgICBpZiAobnVtZXJpY2FsRm9ybWF0dGluZyA9PT0gJ3RydWUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5uKG51bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudW07XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0WUF4aXNOdW1iZXIobnVtKSB7XG4gICAgaWYgKG51bSAlIDEgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcm1hdE51bWJlcihudW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGF0ZSBoZWFkaW5ncyBhcyBzdHJpbmdzIC0gaTE4biBjb21wbGlhbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBsb2NhbGl6ZWQgLSB3aGV0aGVyIHRoZSBkYXRlcyBzaG91bGQgYmUgbG9jYWxpemVkIHBlciBicm93c2VyIGxhbmd1YWdlXG4gICAqIEByZXR1cm5zIHtBcnJheX0gdGhlIGRhdGUgaGVhZGluZ3MgYXMgc3RyaW5nc1xuICAgKi9cbiAgZ2V0RGF0ZUhlYWRpbmdzKGxvY2FsaXplZCkge1xuICAgIGNvbnN0IGRhdGVIZWFkaW5ncyA9IFtdLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLmRhdGVyYW5nZXBpY2tlci5lbmREYXRlKS5hZGQoMSwgJ2QnKTtcblxuICAgIGZvciAobGV0IGRhdGUgPSBtb21lbnQodGhpcy5kYXRlcmFuZ2VwaWNrZXIuc3RhcnREYXRlKTsgZGF0ZS5pc0JlZm9yZShlbmREYXRlKTsgZGF0ZS5hZGQoMSwgJ2QnKSkge1xuICAgICAgaWYgKGxvY2FsaXplZCkge1xuICAgICAgICBkYXRlSGVhZGluZ3MucHVzaChkYXRlLmZvcm1hdCh0aGlzLmRhdGVGb3JtYXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGVIZWFkaW5ncy5wdXNoKGRhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0ZUhlYWRpbmdzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwbGFuZGVkIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICogVGhpcyBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkIG9mIGdldFBhZ2VVUkwgd2hlbiB5b3Ugd2FudCB0byBjaGFpbiBxdWVyeSBzdHJpbmcgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZSBuYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFVSTCBmb3IgdGhlIHBhZ2VcbiAgICovXG4gIGdldEV4cGFuZGVkUGFnZVVSTChwYWdlKSB7XG4gICAgcmV0dXJuIGAvLyR7dGhpcy5wcm9qZWN0fS5vcmcvdy9pbmRleC5waHA/dGl0bGU9JHtlbmNvZGVVUklDb21wb25lbnQocGFnZS5zY29yZSgpKS5yZXBsYWNlKC8nLywgZXNjYXBlKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbmZvcm1hdGl2ZSBmaWxlbmFtZSB3aXRob3V0IGV4dGVuc2lvbiB0byBiZSB1c2VkIGZvciBleHBvcnQgb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGZpbGVuYW1lIHdpdGhvdXQgYW4gZXh0ZW5zaW9uXG4gICAqL1xuICBnZXRFeHBvcnRGaWxlbmFtZSgpIHtcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUuc3RhcnRPZignZGF5JykuZm9ybWF0KCdZWVlZTU1ERCcpLFxuICAgICAgZW5kRGF0ZSA9IHRoaXMuZGF0ZXJhbmdlcGlja2VyLmVuZERhdGUuc3RhcnRPZignZGF5JykuZm9ybWF0KCdZWVlZTU1ERCcpO1xuICAgIHJldHVybiBgJHt0aGlzLmFwcH0tJHtzdGFydERhdGV9LSR7ZW5kRGF0ZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGZ1bGwgbGluayBmb3IgdGhlIGdpdmVuIHBhZ2UgYW5kIHByb2plY3RcbiAgICogQHBhcmFtICB7c3RyaW5nfSBwYWdlIC0gcGFnZSB0byBsaW5rIHRvXG4gICAqIEBwYXJhbSAge3N0cmluZ30gW3Byb2plY3RdIC0gcHJvamVjdCBsaW5rLCBkZWZhdWx0cyB0byBgdGhpcy5wcm9qZWN0YFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IEhUTUwgbWFya3VwXG4gICAqL1xuICBnZXRQYWdlTGluayhwYWdlLCBwcm9qZWN0KSB7XG4gICAgcmV0dXJuIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiJHt0aGlzLmdldFBhZ2VVUkwocGFnZSwgcHJvamVjdCl9XCI+JHtwYWdlLmRlc2NvcmUoKS5lc2NhcGUoKX08L2E+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHdpa2kgVVJMIGdpdmVuIHRoZSBwYWdlIG5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2UgLSBwYWdlIG5hbWVcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMIGZvciB0aGUgcGFnZVxuICAgKi9cbiAgZ2V0UGFnZVVSTChwYWdlLCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0KSB7XG4gICAgcmV0dXJuIGAvLyR7cHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpLmVzY2FwZSgpfS5vcmcvd2lraS8ke3BhZ2Uuc2NvcmUoKS5yZXBsYWNlKC8nLywgZXNjYXBlKX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgd2lraSBVUkwgZ2l2ZW4gdGhlIHBhZ2UgbmFtZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2l0ZSAtIHNpdGUgbmFtZSAoZS5nLiBlbi53aWtpcGVkaWEub3JnKVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVUkwgZm9yIHRoZSBzaXRlXG4gICAqL1xuICBnZXRTaXRlTGluayhzaXRlKSB7XG4gICAgcmV0dXJuIGA8YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiLy8ke3NpdGV9Lm9yZ1wiPiR7c2l0ZX08L2E+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByb2plY3QgbmFtZSAod2l0aG91dCB0aGUgLm9yZylcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGxhbmcucHJvamVjdG5hbWVcbiAgICovXG4gIGdldCBwcm9qZWN0KCkge1xuICAgIGNvbnN0IHByb2plY3QgPSAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkudmFsKCk7XG4gICAgLyoqIEdldCB0aGUgZmlyc3QgMiBjaGFyYWN0ZXJzIGZyb20gdGhlIHByb2plY3QgY29kZSB0byBnZXQgdGhlIGxhbmd1YWdlICovXG4gICAgcmV0dXJuIHByb2plY3QgPyBwcm9qZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLm9yZyQvLCAnJykgOiBudWxsO1xuICB9XG5cbiAgZ2V0TG9jYWxlRGF0ZVN0cmluZygpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5sYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gICAgfVxuXG4gICAgY29uc3QgZm9ybWF0cyA9IHtcbiAgICAgICdhci1zYSc6ICdERC9NTS9ZWScsXG4gICAgICAnYmctYmcnOiAnREQuTS5ZWVlZJyxcbiAgICAgICdjYS1lcyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC10dyc6ICdZWVlZL00vRCcsXG4gICAgICAnY3MtY3onOiAnRC5NLllZWVknLFxuICAgICAgJ2RhLWRrJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2RlLWRlJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VsLWdyJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdlbi11cyc6ICdNL0QvWVlZWScsXG4gICAgICAnZmktZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2ZyLWZyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2hlLWlsJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2h1LWh1JzogJ1lZWVkuIE1NLiBERC4nLFxuICAgICAgJ2lzLWlzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdpdC1pdCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdqYS1qcCc6ICdZWVlZL01NL0REJyxcbiAgICAgICdrby1rcic6ICdZWVlZLU1NLUREJyxcbiAgICAgICdubC1ubCc6ICdELU0tWVlZWScsXG4gICAgICAnbmItbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncGwtcGwnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAncHQtYnInOiAnRC9NL1lZWVknLFxuICAgICAgJ3JvLXJvJzogJ0RELk1NLllZWVknLFxuICAgICAgJ3J1LXJ1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ2hyLWhyJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzay1zayc6ICdELiBNLiBZWVlZJyxcbiAgICAgICdzcS1hbCc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzdi1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICd0aC10aCc6ICdEL00vWVlZWScsXG4gICAgICAndHItdHInOiAnREQuTU0uWVlZWScsXG4gICAgICAndXItcGsnOiAnREQvTU0vWVlZWScsXG4gICAgICAnaWQtaWQnOiAnREQvTU0vWVlZWScsXG4gICAgICAndWstdWEnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYmUtYnknOiAnREQuTU0uWVlZWScsXG4gICAgICAnc2wtc2knOiAnRC5NLllZWVknLFxuICAgICAgJ2V0LWVlJzogJ0QuTU0uWVlZWScsXG4gICAgICAnbHYtbHYnOiAnWVlZWS5NTS5ERC4nLFxuICAgICAgJ2x0LWx0JzogJ1lZWVkuTU0uREQnLFxuICAgICAgJ2ZhLWlyJzogJ01NL0REL1lZWVknLFxuICAgICAgJ3ZpLXZuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2h5LWFtJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2F6LWxhdG4tYXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnZXUtZXMnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnbWstbWsnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYWYtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAna2EtZ2UnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZm8tZm8nOiAnREQtTU0tWVlZWScsXG4gICAgICAnaGktaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnbXMtbXknOiAnREQvTU0vWVlZWScsXG4gICAgICAna2sta3onOiAnREQuTU0uWVlZWScsXG4gICAgICAna3kta2cnOiAnREQuTU0uWVknLFxuICAgICAgJ3N3LWtlJzogJ00vZC9ZWVlZJyxcbiAgICAgICd1ei1sYXRuLXV6JzogJ0REL01NIFlZWVknLFxuICAgICAgJ3R0LXJ1JzogJ0RELk1NLllZWVknLFxuICAgICAgJ3BhLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdndS1pbic6ICdERC1NTS1ZWScsXG4gICAgICAndGEtaW4nOiAnREQtTU0tWVlZWScsXG4gICAgICAndGUtaW4nOiAnREQtTU0tWVknLFxuICAgICAgJ2tuLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdtci1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzYS1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdtbi1tbic6ICdZWS5NTS5ERCcsXG4gICAgICAnZ2wtZXMnOiAnREQvTU0vWVknLFxuICAgICAgJ2tvay1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdzeXItc3knOiAnREQvTU0vWVlZWScsXG4gICAgICAnZHYtbXYnOiAnREQvTU0vWVknLFxuICAgICAgJ2FyLWlxJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3poLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdkZS1jaCc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdlbi1nYic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlcy1teCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1iZSc6ICdEL01NL1lZWVknLFxuICAgICAgJ2l0LWNoJzogJ0RELk1NLllZWVknLFxuICAgICAgJ25sLWJlJzogJ0QvTU0vWVlZWScsXG4gICAgICAnbm4tbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAncHQtcHQnOiAnREQtTU0tWVlZWScsXG4gICAgICAnc3ItbGF0bi1jcyc6ICdELk0uWVlZWScsXG4gICAgICAnc3YtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2F6LWN5cmwtYXonOiAnREQuTU0uWVlZWScsXG4gICAgICAnbXMtYm4nOiAnREQvTU0vWVlZWScsXG4gICAgICAndXotY3lybC11eic6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdhci1lZyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1oayc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtYXQnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tYXUnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdlcy1lcyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdmci1jYSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdzci1jeXJsLWNzJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdhci1seSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICd6aC1zZyc6ICdEL00vWVlZWScsXG4gICAgICAnZGUtbHUnOiAnREQuTU0uWVlZWScsXG4gICAgICAnZW4tY2EnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtZ3QnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItY2gnOiAnREQuTU0uWVlZWScsXG4gICAgICAnYXItZHonOiAnREQtTU0tWVlZWScsXG4gICAgICAnemgtbW8nOiAnRC9NL1lZWVknLFxuICAgICAgJ2RlLWxpJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2VuLW56JzogJ0QvTU0vWVlZWScsXG4gICAgICAnZXMtY3InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZnItbHUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItbWEnOiAnREQtTU0tWVlZWScsXG4gICAgICAnZW4taWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcGEnOiAnTU0vREQvWVlZWScsXG4gICAgICAnZnItbWMnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItdG4nOiAnREQtTU0tWVlZWScsXG4gICAgICAnZW4temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnZXMtZG8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItb20nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tam0nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtdmUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXIteWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tMDI5JzogJ01NL0REL1lZWVknLFxuICAgICAgJ2VzLWNvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLXN5JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLWJ6JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLXBlJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWpvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXR0JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VzLWFyJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2FyLWxiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2VuLXp3JzogJ00vRC9ZWVlZJyxcbiAgICAgICdlcy1lYyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdhci1rdyc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdlbi1waCc6ICdNL0QvWVlZWScsXG4gICAgICAnZXMtY2wnOiAnREQtTU0tWVlZWScsXG4gICAgICAnYXItYWUnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtdXknOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItYmgnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcHknOiAnREQvTU0vWVlZWScsXG4gICAgICAnYXItcWEnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtYm8nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtc3YnOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtaG4nOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtbmknOiAnREQvTU0vWVlZWScsXG4gICAgICAnZXMtcHInOiAnREQvTU0vWVlZWScsXG4gICAgICAnYW0tZXQnOiAnRC9NL1lZWVknLFxuICAgICAgJ3R6bS1sYXRuLWR6JzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2l1LWxhdG4tY2EnOiAnRC9NTS9ZWVlZJyxcbiAgICAgICdzbWEtbm8nOiAnREQuTU0uWVlZWScsXG4gICAgICAnbW4tbW9uZy1jbic6ICdZWVlZL00vRCcsXG4gICAgICAnZ2QtZ2InOiAnREQvTU0vWVlZWScsXG4gICAgICAnZW4tbXknOiAnRC9NL1lZWVknLFxuICAgICAgJ3Bycy1hZic6ICdERC9NTS9ZWScsXG4gICAgICAnYm4tYmQnOiAnREQtTU0tWVknLFxuICAgICAgJ3dvLXNuJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3J3LXJ3JzogJ00vRC9ZWVlZJyxcbiAgICAgICdxdXQtZ3QnOiAnREQvTU0vWVlZWScsXG4gICAgICAnc2FoLXJ1JzogJ01NLkRELllZWVknLFxuICAgICAgJ2dzdy1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdjby1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdvYy1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdtaS1ueic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdnYS1pZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzZS1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdici1mcic6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzbW4tZmknOiAnRC5NLllZWVknLFxuICAgICAgJ21vaC1jYSc6ICdNL0QvWVlZWScsXG4gICAgICAnYXJuLWNsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2lpLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdkc2ItZGUnOiAnRC4gTS4gWVlZWScsXG4gICAgICAnaWctbmcnOiAnRC9NL1lZWVknLFxuICAgICAgJ2tsLWdsJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ2xiLWx1JzogJ0REL01NL1lZWVknLFxuICAgICAgJ2JhLXJ1JzogJ0RELk1NLllZJyxcbiAgICAgICduc28temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAncXV6LWJvJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3lvLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdoYS1sYXRuLW5nJzogJ0QvTS9ZWVlZJyxcbiAgICAgICdmaWwtcGgnOiAnTS9EL1lZWVknLFxuICAgICAgJ3BzLWFmJzogJ0REL01NL1lZJyxcbiAgICAgICdmeS1ubCc6ICdELU0tWVlZWScsXG4gICAgICAnbmUtbnAnOiAnTS9EL1lZWVknLFxuICAgICAgJ3NlLW5vJzogJ0RELk1NLllZWVknLFxuICAgICAgJ2l1LWNhbnMtY2EnOiAnRC9NL1lZWVknLFxuICAgICAgJ3NyLWxhdG4tcnMnOiAnRC5NLllZWVknLFxuICAgICAgJ3NpLWxrJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ3NyLWN5cmwtcnMnOiAnRC5NLllZWVknLFxuICAgICAgJ2xvLWxhJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2ttLWtoJzogJ1lZWVktTU0tREQnLFxuICAgICAgJ2N5LWdiJzogJ0REL01NL1lZWVknLFxuICAgICAgJ2JvLWNuJzogJ1lZWVkvTS9EJyxcbiAgICAgICdzbXMtZmknOiAnRC5NLllZWVknLFxuICAgICAgJ2FzLWluJzogJ0RELU1NLVlZWVknLFxuICAgICAgJ21sLWluJzogJ0RELU1NLVlZJyxcbiAgICAgICdlbi1pbic6ICdERC1NTS1ZWVlZJyxcbiAgICAgICdvci1pbic6ICdERC1NTS1ZWScsXG4gICAgICAnYm4taW4nOiAnREQtTU0tWVknLFxuICAgICAgJ3RrLXRtJzogJ0RELk1NLllZJyxcbiAgICAgICdicy1sYXRuLWJhJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdtdC1tdCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzci1jeXJsLW1lJzogJ0QuTS5ZWVlZJyxcbiAgICAgICdzZS1maSc6ICdELk0uWVlZWScsXG4gICAgICAnenUtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAneGgtemEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAndG4temEnOiAnWVlZWS9NTS9ERCcsXG4gICAgICAnaHNiLWRlJzogJ0QuIE0uIFlZWVknLFxuICAgICAgJ2JzLWN5cmwtYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ3RnLWN5cmwtdGonOiAnREQuTU0ueXknLFxuICAgICAgJ3NyLWxhdG4tYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ3Ntai1ubyc6ICdERC5NTS5ZWVlZJyxcbiAgICAgICdybS1jaCc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdzbWotc2UnOiAnWVlZWS1NTS1ERCcsXG4gICAgICAncXV6LWVjJzogJ0REL01NL1lZWVknLFxuICAgICAgJ3F1ei1wZSc6ICdERC9NTS9ZWVlZJyxcbiAgICAgICdoci1iYSc6ICdELk0uWVlZWS4nLFxuICAgICAgJ3NyLWxhdG4tbWUnOiAnRC5NLllZWVknLFxuICAgICAgJ3NtYS1zZSc6ICdZWVlZLU1NLUREJyxcbiAgICAgICdlbi1zZyc6ICdEL00vWVlZWScsXG4gICAgICAndWctY24nOiAnWVlZWS1NLUQnLFxuICAgICAgJ3NyLWN5cmwtYmEnOiAnRC5NLllZWVknLFxuICAgICAgJ2VzLXVzJzogJ00vRC9ZWVlZJ1xuICAgIH07XG5cbiAgICBjb25zdCBrZXkgPSBuYXZpZ2F0b3IubGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gZm9ybWF0c1trZXldIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVGb3JtYXQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgdmFsdWUgZnJvbSBsb2NhbFN0b3JhZ2UsIHVzaW5nIGEgdGVtcG9yYXJ5IHN0b3JhZ2UgaWYgbG9jYWxTdG9yYWdlIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGtleSBmb3IgdGhlIHZhbHVlIHRvIHJldHJpZXZlXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gc3RvcmVkIHZhbHVlXG4gICAqL1xuICBnZXRGcm9tTG9jYWxTdG9yYWdlKGtleSkge1xuICAgIC8vIFNlZSBpZiBsb2NhbFN0b3JhZ2UgaXMgc3VwcG9ydGVkIGFuZCBlbmFibGVkXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IFVSTCB0byBmaWxlIGEgcmVwb3J0IG9uIE1ldGEsIHByZWxvYWRlZCB3aXRoIHBlcm1hbGlua1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3BoYWJQYXN0ZV0gVVJMIHRvIGF1dG8tZ2VuZXJhdGVkIGVycm9yIHJlcG9ydCBvbiBQaGFicmljYXRvclxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IFVSTFxuICAgKi9cbiAgZ2V0QnVnUmVwb3J0VVJMKHBoYWJQYXN0ZSkge1xuICAgIGNvbnN0IHJlcG9ydFVSTCA9ICdodHRwczovL21ldGEud2lraW1lZGlhLm9yZy93L2luZGV4LnBocD90aXRsZT1UYWxrOlBhZ2V2aWV3c19BbmFseXNpcyZhY3Rpb249ZWRpdCcgK1xuICAgICAgYCZzZWN0aW9uPW5ldyZwcmVsb2FkdGl0bGU9JHt0aGlzLmFwcC51cGNhc2UoKX0gYnVnIHJlcG9ydGA7XG5cbiAgICBpZiAocGhhYlBhc3RlKSB7XG4gICAgICByZXR1cm4gYCR7cmVwb3J0VVJMfSZwcmVsb2FkPVRhbGs6UGFnZXZpZXdzX0FuYWx5c2lzL1ByZWxvYWQmcHJlbG9hZHBhcmFtc1tdPSR7cGhhYlBhc3RlfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXBvcnRVUkw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBnZW5lcmFsIGluZm9ybWF0aW9uIGFib3V0IGEgcHJvamVjdCwgc3VjaCBhcyBuYW1lc3BhY2VzLCB0aXRsZSBvZiB0aGUgbWFpbiBwYWdlLCBldGMuXG4gICAqIERhdGEgcmV0dXJuZWQgYnkgdGhlIGFwaSBpcyBhbHNvIHN0b3JlZCBpbiB0aGlzLnNpdGVJbmZvXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCBzdWNoIGFzIGVuLndpa2lwZWRpYSAod2l0aCBvciB3aXRob3V0IC5vcmcpXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSByZXNvbHZpbmcgd2l0aCBzaXRlaW5mbyxcbiAgICogICBhbG9uZyB3aXRoIGFueSBvdGhlciBjYWNoZWQgc2l0ZWluZm8gZm9yIG90aGVyIHByb2plY3RzXG4gICAqL1xuICBmZXRjaFNpdGVJbmZvKHByb2plY3QpIHtcbiAgICBwcm9qZWN0ID0gcHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpO1xuICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKSxcbiAgICAgIGNhY2hlS2V5ID0gYHBhZ2V2aWV3cy1zaXRlaW5mby0ke3Byb2plY3R9YDtcblxuICAgIGlmICh0aGlzLnNpdGVJbmZvW3Byb2plY3RdKSByZXR1cm4gZGZkLnJlc29sdmUodGhpcy5zaXRlSW5mbyk7XG5cbiAgICAvLyB1c2UgY2FjaGVkIHNpdGUgaW5mbyBpZiBwcmVzZW50XG4gICAgaWYgKHNpbXBsZVN0b3JhZ2UuaGFzS2V5KGNhY2hlS2V5KSkge1xuICAgICAgdGhpcy5zaXRlSW5mb1twcm9qZWN0XSA9IHNpbXBsZVN0b3JhZ2UuZ2V0KGNhY2hlS2V5KTtcbiAgICAgIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlcndpc2UgZmV0Y2ggc2l0ZWluZm8gYW5kIHN0b3JlIGluIGNhY2hlXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovLyR7cHJvamVjdH0ub3JnL3cvYXBpLnBocGAsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhY3Rpb246ICdxdWVyeScsXG4gICAgICAgICAgbWV0YTogJ3NpdGVpbmZvJyxcbiAgICAgICAgICBzaXByb3A6ICdnZW5lcmFsfG5hbWVzcGFjZXMnLFxuICAgICAgICAgIGZvcm1hdDogJ2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnNpdGVJbmZvW3Byb2plY3RdID0gZGF0YS5xdWVyeTtcblxuICAgICAgICAvLyBjYWNoZSBmb3Igb25lIHdlZWsgKFRUTCBpcyBpbiBtaWxsaXNlY29uZHMpXG4gICAgICAgIHNpbXBsZVN0b3JhZ2Uuc2V0KGNhY2hlS2V5LCB0aGlzLnNpdGVJbmZvW3Byb2plY3RdLCB7VFRMOiAxMDAwICogNjAgKiA2MCAqIDI0ICogN30pO1xuXG4gICAgICAgIGRmZC5yZXNvbHZlKHRoaXMuc2l0ZUluZm8pO1xuICAgICAgfSkuZmFpbChkYXRhID0+IHtcbiAgICAgICAgZGZkLnJlamVjdChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIHRvIGdldCBzaXRlaW5mbyBmcm9tIHRoaXMuc2l0ZUluZm8gZm9yIGdpdmVuIHByb2plY3QsIHdpdGggb3Igd2l0aG91dCAub3JnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCBuYW1lLCB3aXRoIG9yIHdpdGhvdXQgLm9yZ1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH0gc2l0ZSBpbmZvcm1hdGlvbiBpZiBwcmVzZW50XG4gICAqL1xuICBnZXRTaXRlSW5mbyhwcm9qZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMuc2l0ZUluZm9bcHJvamVjdC5yZXBsYWNlKC9cXC5vcmckLywgJycpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdXNlciBhZ2VudCwgaWYgc3VwcG9ydGVkXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHVzZXItYWdlbnRcbiAgICovXG4gIGdldFVzZXJBZ2VudCgpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudCA/IG5hdmlnYXRvci51c2VyQWdlbnQgOiAnVW5rbm93bic7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgdmFsdWUgdG8gbG9jYWxTdG9yYWdlLCB1c2luZyBhIHRlbXBvcmFyeSBzdG9yYWdlIGlmIGxvY2FsU3RvcmFnZSBpcyBub3Qgc3VwcG9ydGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBrZXkgZm9yIHRoZSB2YWx1ZSB0byBzZXRcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgLSB2YWx1ZSB0byBzdG9yZVxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IHN0b3JlZCB2YWx1ZVxuICAgKi9cbiAgc2V0TG9jYWxTdG9yYWdlKGtleSwgdmFsdWUpIHtcbiAgICAvLyBTZWUgaWYgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBhbmQgZW5hYmxlZFxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgdW5pcXVlIGhhc2ggY29kZSBmcm9tIGdpdmVuIHN0cmluZ1xuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHN0ciAtIHRvIGJlIGhhc2hlZFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBoYXNoXG4gICAqL1xuICBoYXNoQ29kZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZWR1Y2UoKHByZXZIYXNoLCBjdXJyVmFsKSA9PlxuICAgICAgKChwcmV2SGFzaCA8PCA1KSAtIHByZXZIYXNoKSArIGN1cnJWYWwuY2hhckNvZGVBdCgwKSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogSXMgdGhpcyBvbmUgb2YgdGhlIGNoYXJ0LXZpZXcgYXBwcyAodGhhdCBkb2VzIG5vdCBoYXZlIGEgbGlzdCB2aWV3KT9cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICAgKi9cbiAgaXNDaGFydEFwcCgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNMaXN0QXBwKCk7XG4gIH1cblxuICAvKipcbiAgICogSXMgdGhpcyBvbmUgb2YgdGhlIGxpc3QtdmlldyBhcHBzP1xuICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIG9yIGZhbHNlXG4gICAqL1xuICBpc0xpc3RBcHAoKSB7XG4gICAgcmV0dXJuIFsnbGFuZ3ZpZXdzJywgJ21hc3N2aWV3cycsICdyZWRpcmVjdHZpZXdzJ10uaW5jbHVkZXModGhpcy5hcHApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGN1cnJlbnQgcHJvamVjdCBpcyBhIG11bHRpbGluZ3VhbCBwcm9qZWN0XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBpcyBtdWx0aWxpbmd1YWwgb3Igbm90XG4gICAqL1xuICBpc011bHRpbGFuZ1Byb2plY3QoKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYC4qP1xcXFwuKCR7UHYubXVsdGlsYW5nUHJvamVjdHMuam9pbignfCcpfSlgKS50ZXN0KHRoaXMucHJvamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTWFwIG5vcm1hbGl6ZWQgcGFnZXMgZnJvbSBBUEkgaW50byBhIHN0cmluZyBvZiBwYWdlIG5hbWVzXG4gICAqIFVzZWQgaW4gbm9ybWFsaXplUGFnZU5hbWVzKClcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEBwYXJhbSB7YXJyYXl9IG5vcm1hbGl6ZWRQYWdlcyAtIGFycmF5IG9mIG5vcm1hbGl6ZWQgbWFwcGluZ3MgcmV0dXJuZWQgYnkgdGhlIEFQSVxuICAgKiBAcmV0dXJucyB7YXJyYXl9IHBhZ2VzIHdpdGggdGhlIG5ldyBub3JtYWxpemVkIG5hbWVzLCBpZiBnaXZlblxuICAgKi9cbiAgbWFwTm9ybWFsaXplZFBhZ2VOYW1lcyhwYWdlcywgbm9ybWFsaXplZFBhZ2VzKSB7XG4gICAgbm9ybWFsaXplZFBhZ2VzLmZvckVhY2gobm9ybWFsUGFnZSA9PiB7XG4gICAgICAvKiogZG8gaXQgdGhpcyB3YXkgdG8gcHJlc2VydmUgb3JkZXJpbmcgb2YgcGFnZXMgKi9cbiAgICAgIHBhZ2VzID0gcGFnZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgICBpZiAobm9ybWFsUGFnZS5mcm9tID09PSBwYWdlKSB7XG4gICAgICAgICAgcmV0dXJuIG5vcm1hbFBhZ2UudG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBwYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIHZhbGlkIG11bHRpbGluZ3VhbCBwcm9qZWN0c1xuICAgKiBAcmV0dXJuIHtBcnJheX0gYmFzZSBwcm9qZWN0cywgd2l0aG91dCB0aGUgbGFuZ3VhZ2VcbiAgICovXG4gIHN0YXRpYyBnZXQgbXVsdGlsYW5nUHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICd3aWtpcGVkaWEnLFxuICAgICAgJ3dpa2lib29rcycsXG4gICAgICAnd2lraW5ld3MnLFxuICAgICAgJ3dpa2lxdW90ZScsXG4gICAgICAnd2lraXNvdXJjZScsXG4gICAgICAnd2lraXZlcnNpdHknLFxuICAgICAgJ3dpa2l2b3lhZ2UnXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIG1hc3MgcmVxdWVzdHMgdG8gTWVkaWFXaWtpIEFQSVxuICAgKiBUaGUgQVBJIG5vcm1hbGx5IGxpbWl0cyB0byA1MDAgcGFnZXMsIGJ1dCBnaXZlcyB5b3UgYSAnY29udGludWUnIHZhbHVlXG4gICAqICAgdG8gZmluaXNoIGl0ZXJhdGluZyB0aHJvdWdoIHRoZSByZXNvdXJjZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIHBhcmFtZXRlcnMgdG8gcGFzcyB0byB0aGUgQVBJXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9qZWN0IC0gcHJvamVjdCB0byBxdWVyeSwgZS5nLiBlbi53aWtpcGVkaWEgKC5vcmcgaXMgb3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29udGludWVLZXldIC0gdGhlIGtleSB0byBsb29rIGluIHRoZSBjb250aW51ZSBoYXNoLCBpZiBwcmVzZW50IChlLmcuIGNtY29udGludWUgZm9yIEFQSTpDYXRlZ29yeW1lbWJlcnMpXG4gICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBbZGF0YUtleV0gLSB0aGUga2V5IGZvciB0aGUgbWFpbiBjaHVuayBvZiBkYXRhLCBpbiB0aGUgcXVlcnkgaGFzaCAoZS5nLiBjYXRlZ29yeW1lbWJlcnMgZm9yIEFQSTpDYXRlZ29yeW1lbWJlcnMpXG4gICAqICAgSWYgdGhpcyBpcyBhIGZ1bmN0aW9uIGl0IGlzIGdpdmVuIHRoZSByZXNwb25zZSBkYXRhLCBhbmQgZXhwZWN0ZWQgdG8gcmV0dXJuIHRoZSBkYXRhIHdlIHdhbnQgdG8gY29uY2F0ZW50YXRlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xpbWl0XSAtIG1heCBudW1iZXIgb2YgcGFnZXMgdG8gZmV0Y2hcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggZGF0YVxuICAgKi9cbiAgbWFzc0FwaShwYXJhbXMsIHByb2plY3QsIGNvbnRpbnVlS2V5ID0gJ2NvbnRpbnVlJywgZGF0YUtleSwgbGltaXQgPSB0aGlzLmNvbmZpZy5hcGlMaW1pdCkge1xuICAgIGlmICghL1xcLm9yZyQvLnRlc3QocHJvamVjdCkpIHByb2plY3QgKz0gJy5vcmcnO1xuXG4gICAgY29uc3QgZGZkID0gJC5EZWZlcnJlZCgpO1xuICAgIGxldCByZXNvbHZlRGF0YSA9IHtcbiAgICAgIHBhZ2VzOiBbXVxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlUmVxdWVzdCA9IGNvbnRpbnVlVmFsdWUgPT4ge1xuICAgICAgbGV0IHJlcXVlc3REYXRhID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGFjdGlvbjogJ3F1ZXJ5JyxcbiAgICAgICAgZm9ybWF0OiAnanNvbicsXG4gICAgICAgIGZvcm1hdHZlcnNpb246ICcyJ1xuICAgICAgfSwgcGFyYW1zKTtcblxuICAgICAgaWYgKGNvbnRpbnVlVmFsdWUpIHJlcXVlc3REYXRhW2NvbnRpbnVlS2V5XSA9IGNvbnRpbnVlVmFsdWU7XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSAkLmFqYXgoe1xuICAgICAgICB1cmw6IGBodHRwczovLyR7cHJvamVjdH0vdy9hcGkucGhwYCxcbiAgICAgICAganNvbnA6ICdjYWxsYmFjaycsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICBkYXRhOiByZXF1ZXN0RGF0YVxuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UuZG9uZShkYXRhID0+IHtcbiAgICAgICAgLy8gc29tZSBmYWlsdXJlcyBjb21lIGJhY2sgYXMgMjAwcywgc28gd2Ugc3RpbGwgcmVzb2x2ZSBhbmQgbGV0IHRoZSBsb2NhbCBhcHAgaGFuZGxlIGl0XG4gICAgICAgIGlmIChkYXRhLmVycm9yKSByZXR1cm4gZGZkLnJlc29sdmUoZGF0YSk7XG5cbiAgICAgICAgbGV0IGlzRmluaXNoZWQ7XG5cbiAgICAgICAgLy8gYWxsb3cgY3VzdG9tIGZ1bmN0aW9uIHRvIHBhcnNlIHRoZSBkYXRhIHdlIHdhbnQsIGlmIHByb3ZpZGVkXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YUtleSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJlc29sdmVEYXRhLnBhZ2VzID0gcmVzb2x2ZURhdGEucGFnZXMuY29uY2F0KGRhdGFLZXkoZGF0YS5xdWVyeSkpO1xuICAgICAgICAgIGlzRmluaXNoZWQgPSByZXNvbHZlRGF0YS5wYWdlcy5sZW5ndGggPj0gbGltaXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gYXBwZW5kIG5ldyBkYXRhIHRvIGRhdGEgZnJvbSBsYXN0IHJlcXVlc3QuIFdlIG1pZ2h0IHdhbnQgYm90aCAncGFnZXMnIGFuZCBkYXRhS2V5XG4gICAgICAgICAgaWYgKGRhdGEucXVlcnkucGFnZXMpIHtcbiAgICAgICAgICAgIHJlc29sdmVEYXRhLnBhZ2VzID0gcmVzb2x2ZURhdGEucGFnZXMuY29uY2F0KGRhdGEucXVlcnkucGFnZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGF0YS5xdWVyeVtkYXRhS2V5XSkge1xuICAgICAgICAgICAgcmVzb2x2ZURhdGFbZGF0YUtleV0gPSAocmVzb2x2ZURhdGFbZGF0YUtleV0gfHwgW10pLmNvbmNhdChkYXRhLnF1ZXJ5W2RhdGFLZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWYgcGFnZXMgaXMgbm90IHRoZSBjb2xsZWN0aW9uIHdlIHdhbnQsIGl0IHdpbGwgYmUgZWl0aGVyIGFuIGVtcHR5IGFycmF5IG9yIG9uZSBlbnRyeSB3aXRoIGJhc2ljIHBhZ2UgaW5mb1xuICAgICAgICAgIC8vICAgZGVwZW5kaW5nIG9uIHdoYXQgQVBJIHdlJ3JlIGhpdHRpbmcuIFNvIHJlc29sdmVEYXRhW2RhdGFLZXldIHdpbGwgaGl0IHRoZSBsaW1pdFxuICAgICAgICAgIGlzRmluaXNoZWQgPSByZXNvbHZlRGF0YS5wYWdlcy5sZW5ndGggPj0gbGltaXQgfHwgcmVzb2x2ZURhdGFbZGF0YUtleV0ubGVuZ3RoID49IGxpbWl0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSByZWN1cnNpdmUgY2FsbCBpZiBuZWVkZWQsIHdhaXRpbmcgMTAwbXNcbiAgICAgICAgaWYgKCFpc0ZpbmlzaGVkICYmIGRhdGEuY29udGludWUgJiYgZGF0YS5jb250aW51ZVtjb250aW51ZUtleV0pIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG1ha2VSZXF1ZXN0KGRhdGEuY29udGludWVbY29udGludWVLZXldKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGluZGljYXRlIHRoZXJlIHdlcmUgbW9yZSBlbnRyaWVzIHRoYW4gdGhlIGxpbWl0XG4gICAgICAgICAgaWYgKGRhdGEuY29udGludWUpIHJlc29sdmVEYXRhLmNvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICBkZmQucmVzb2x2ZShyZXNvbHZlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoZGF0YSA9PiB7XG4gICAgICAgIGRmZC5yZWplY3QoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbWFrZVJlcXVlc3QoKTtcblxuICAgIHJldHVybiBkZmQ7XG4gIH1cblxuICAvKipcbiAgICogTG9jYWxpemUgTnVtYmVyIG9iamVjdCB3aXRoIGRlbGltaXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gdGhlIE51bWJlciwgZS5nLiAxMjM0NTY3XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gd2l0aCBsb2NhbGUgZGVsaW1pdGVycywgZS5nLiAxLDIzNCw1NjcgKGVuLVVTKVxuICAgKi9cbiAgbih2YWx1ZSkge1xuICAgIHJldHVybiAobmV3IE51bWJlcih2YWx1ZSkpLnRvTG9jYWxlU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGJhc2ljIGluZm8gb24gZ2l2ZW4gcGFnZXMsIGluY2x1ZGluZyB0aGUgbm9ybWFsaXplZCBwYWdlIG5hbWVzLlxuICAgKiBFLmcuIG1hc2N1bGluZSB2ZXJzdXMgZmVtaW5pbmUgbmFtZXNwYWNlcyBvbiBkZXdpa2lcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBhcnJheSBvZiBwYWdlIG5hbWVzXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gcHJvbWlzZSB3aXRoIGRhdGEgZmV0Y2hlZCBmcm9tIEFQSVxuICAgKi9cbiAgZ2V0UGFnZUluZm8ocGFnZXMpIHtcbiAgICBsZXQgZGZkID0gJC5EZWZlcnJlZCgpO1xuXG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICB1cmw6IGBodHRwczovLyR7dGhpcy5wcm9qZWN0fS5vcmcvdy9hcGkucGhwP2FjdGlvbj1xdWVyeSZwcm9wPWluZm8maW5wcm9wPXByb3RlY3Rpb258d2F0Y2hlcnNgICtcbiAgICAgICAgYCZmb3JtYXR2ZXJzaW9uPTImZm9ybWF0PWpzb24mdGl0bGVzPSR7cGFnZXMuam9pbignfCcpfWAsXG4gICAgICBkYXRhVHlwZTogJ2pzb25wJ1xuICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBsZXQgcGFnZURhdGEgPSB7fTtcbiAgICAgIGRhdGEucXVlcnkucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgICAgcGFnZURhdGFbcGFnZS50aXRsZV0gPSBwYWdlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGZkLnJlc29sdmUocGFnZURhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgaG93IG1hbnkgZGF5cyBhcmUgaW4gdGhlIHNlbGVjdGVkIGRhdGUgcmFuZ2VcbiAgICogQHJldHVybnMge2ludGVnZXJ9IG51bWJlciBvZiBkYXlzXG4gICAqL1xuICBudW1EYXlzSW5SYW5nZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuZW5kRGF0ZS5kaWZmKHRoaXMuZGF0ZXJhbmdlcGlja2VyLnN0YXJ0RGF0ZSwgJ2RheXMnKSArIDE7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUga2V5L3ZhbHVlIHBhaXJzIG9mIFVSTCBxdWVyeSBzdHJpbmdcbiAgICogQHBhcmFtIHtzdHJpbmd9IFttdWx0aVBhcmFtXSAtIHBhcmFtZXRlciB3aG9zZSB2YWx1ZXMgbmVlZHMgdG8gc3BsaXQgYnkgcGlwZSBjaGFyYWN0ZXJcbiAgICogQHJldHVybnMge09iamVjdH0ga2V5L3ZhbHVlIHBhaXJzIHJlcHJlc2VudGF0aW9uIG9mIHF1ZXJ5IHN0cmluZ1xuICAgKi9cbiAgcGFyc2VRdWVyeVN0cmluZyhtdWx0aVBhcmFtKSB7XG4gICAgY29uc3QgdXJpID0gZGVjb2RlVVJJKGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSksXG4gICAgICBjaHVua3MgPSB1cmkuc3BsaXQoJyYnKTtcbiAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNodW5rID0gY2h1bmtzW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgIGlmIChtdWx0aVBhcmFtICYmIGNodW5rWzBdID09PSBtdWx0aVBhcmFtKSB7XG4gICAgICAgIHBhcmFtc1ttdWx0aVBhcmFtXSA9IGNodW5rWzFdLnNwbGl0KCd8JykuZmlsdGVyKHBhcmFtID0+ICEhcGFyYW0pLnVuaXF1ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zW2NodW5rWzBdXSA9IGNodW5rWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogU2ltcGxlIG1ldHJpYyB0byBzZWUgaG93IG1hbnkgdXNlIGl0IChwYWdldmlld3Mgb2YgdGhlIHBhZ2V2aWV3LCBhIG1ldGEtcGFnZXZpZXcsIGlmIHlvdSB3aWxsIDopXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBvbmUgb2Y6IHB2LCBsdiwgdHYsIHN2LCBtc1xuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBwYXRjaFVzYWdlKGFwcCkge1xuICAgIGlmIChtZXRhUm9vdCkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBgLy8ke21ldGFSb290fS91c2FnZS8ke3RoaXMuYXBwfS8ke3RoaXMucHJvamVjdCB8fCBpMThuTGFuZ31gLFxuICAgICAgICBtZXRob2Q6ICdQQVRDSCdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGltZXN0YW1wIG9mIHdoZW4gcHJvY2VzcyBzdGFydGVkXG4gICAqIEByZXR1cm4ge21vbWVudH0gc3RhcnQgdGltZVxuICAgKi9cbiAgcHJvY2Vzc1N0YXJ0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1N0YXJ0ID0gbW9tZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVsYXBzZWQgdGltZSBmcm9tIHRoaXMucHJvY2Vzc1N0YXJ0LCBhbmQgc2hvdyBpdFxuICAgKiBAcmV0dXJuIHttb21lbnR9IEVsYXBzZWQgdGltZSBmcm9tIGB0aGlzLnByb2Nlc3NTdGFydGAgaW4gbWlsbGlzZWNvbmRzXG4gICAqL1xuICBwcm9jZXNzRW5kZWQoKSB7XG4gICAgY29uc3QgZW5kVGltZSA9IG1vbWVudCgpLFxuICAgICAgZWxhcHNlZFRpbWUgPSBlbmRUaW1lLmRpZmYodGhpcy5wcm9jZXNzU3RhcnQsICdtaWxsaXNlY29uZHMnKTtcblxuICAgIC8qKiBGSVhNRTogcmVwb3J0IHRoaXMgYnVnOiBzb21lIGxhbmd1YWdlcyBkb24ndCBwYXJzZSBQTFVSQUwgY29ycmVjdGx5ICgnaGUnIGZvciBleGFtcGxlKSB3aXRoIHRoZSBFbmdsaXNoIGZhbGxiYWNrIG1lc3NhZ2UgKi9cbiAgICB0cnkge1xuICAgICAgJCgnLmVsYXBzZWQtdGltZScpLmF0dHIoJ2RhdGV0aW1lJywgZW5kVGltZS5mb3JtYXQoKSlcbiAgICAgICAgLnRleHQoJC5pMThuKCdlbGFwc2VkLXRpbWUnLCBlbGFwc2VkVGltZSAvIDEwMDApKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBpbnRlbnRpb25hbGwgbm90aGluZywgZXZlcnl0aGluZyB3aWxsIHN0aWxsIHNob3dcbiAgICB9XG5cbiAgICByZXR1cm4gZWxhcHNlZFRpbWU7XG4gIH1cblxuICAvKipcbiAgICogQWRhcHRlZCBmcm9tIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvZGFuZHYvNDdjYmovIGNvdXJ0ZXN5IG9mIGRhbmR2XG4gICAqXG4gICAqIFNhbWUgYXMgXy5kZWJvdW5jZSBidXQgcXVldWVzIGFuZCBleGVjdXRlcyBhbGwgZnVuY3Rpb24gY2FsbHNcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuIC0gZnVuY3Rpb24gdG8gZGVib3VuY2VcbiAgICogQHBhcmFtICB7ZGVsYXl9IGRlbGF5IC0gZGVsYXkgZHVyYXRpb24gb2YgbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSAge29iamVjdH0gY29udGV4dCAtIHNjb3BlIHRoZSBmdW5jdGlvbiBzaG91bGQgcmVmZXIgdG9cbiAgICogQHJldHVybiB7RnVuY3Rpb259IHJhdGUtbGltaXRlZCBmdW5jdGlvbiB0byBjYWxsIGluc3RlYWQgb2YgeW91ciBmdW5jdGlvblxuICAgKi9cbiAgcmF0ZUxpbWl0KGZuLCBkZWxheSwgY29udGV4dCkge1xuICAgIGxldCBxdWV1ZSA9IFtdLCB0aW1lcjtcblxuICAgIGNvbnN0IHByb2Nlc3NRdWV1ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgZm4uYXBwbHkoaXRlbS5jb250ZXh0LCBpdGVtLmFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpLCB0aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBsaW1pdGVkKCkge1xuICAgICAgcXVldWUucHVzaCh7XG4gICAgICAgIGNvbnRleHQ6IGNvbnRleHQgfHwgdGhpcyxcbiAgICAgICAgYXJndW1lbnRzOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHByb2Nlc3NRdWV1ZSgpOyAvLyBzdGFydCBpbW1lZGlhdGVseSBvbiB0aGUgZmlyc3QgaW52b2NhdGlvblxuICAgICAgICB0aW1lciA9IHNldEludGVydmFsKHByb2Nlc3NRdWV1ZSwgZGVsYXkpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgU2VsZWN0MiByZWxhdGVkIHN0dWZmIHRoZW4gYWRkcyBpdCBiYWNrXG4gICAqIEFsc28gbWlnaHQgcmVzdWx0IGluIHRoZSBjaGFydCBiZWluZyByZS1yZW5kZXJlZFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcmVzZXRTZWxlY3QyKCkge1xuICAgIGNvbnN0IHNlbGVjdDJJbnB1dCA9ICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcbiAgICBzZWxlY3QySW5wdXQub2ZmKCdjaGFuZ2UnKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MigndmFsJywgbnVsbCk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2RhdGEnLCBudWxsKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MignZGVzdHJveScpO1xuICAgIHRoaXMuc2V0dXBTZWxlY3QyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIGFscGhhIGxldmVsIG9mIGFuIHJnYmEgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gcmdiYSB2YWx1ZVxuICAgKiBAcGFyYW0ge2Zsb2F0fHN0cmluZ30gYWxwaGEgLSB0cmFuc3BhcmVuY3kgYXMgZmxvYXQgdmFsdWVcbiAgICogQHJldHVybnMge3N0cmluZ30gcmdiYSB2YWx1ZVxuICAgKi9cbiAgcmdiYSh2YWx1ZSwgYWxwaGEpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLFxccypcXGRcXCkvLCBgLCAke2FscGhhfSlgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGEgcGFydGljdWxhciBzZXR0aW5nIHRvIHNlc3Npb24gYW5kIGxvY2FsU3RvcmFnZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gc2V0dGluZ3Mga2V5XG4gICAqIEBwYXJhbSB7c3RyaW5nfGJvb2xlYW59IHZhbHVlIC0gdmFsdWUgdG8gc2F2ZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2F2ZVNldHRpbmcoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKGBwYWdldmlld3Mtc2V0dGluZ3MtJHtrZXl9YCwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIHNlbGVjdGVkIHNldHRpbmdzIHdpdGhpbiB0aGUgc2V0dGluZ3MgbW9kYWxcbiAgICogUHJlZmVyIHRoaXMgaW1wbGVtZW50YXRpb24gb3ZlciBhIGxhcmdlIGxpYnJhcnkgbGlrZSBzZXJpYWxpemVPYmplY3Qgb3Igc2VyaWFsaXplSlNPTlxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2F2ZVNldHRpbmdzKCkge1xuICAgIC8qKiB0cmFjayBpZiB3ZSdyZSBjaGFuZ2luZyB0byBub19hdXRvY29tcGxldGUgbW9kZSAqL1xuICAgIGNvbnN0IHdhc0F1dG9jb21wbGV0ZSA9IHRoaXMuYXV0b2NvbXBsZXRlID09PSAnbm9fYXV0b2NvbXBsZXRlJztcblxuICAgICQuZWFjaCgkKCcjc2V0dGluZ3MtbW9kYWwgaW5wdXQnKSwgKGluZGV4LCBlbCkgPT4ge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZyhlbC5uYW1lLCBlbC5jaGVja2VkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICB9IGVsc2UgaWYgKGVsLmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZyhlbC5uYW1lLCBlbC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hcHAgIT09ICd0b3B2aWV3cycpIHtcbiAgICAgIHRoaXMuZGF0ZXJhbmdlcGlja2VyLmxvY2FsZS5mb3JtYXQgPSB0aGlzLmRhdGVGb3JtYXQ7XG4gICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci51cGRhdGVFbGVtZW50KCk7XG5cbiAgICAgIHRoaXMuc2V0dXBTZWxlY3QyQ29sb3JzKCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogSWYgd2UgY2hhbmdlZCB0by9mcm9tIG5vX2F1dG9jb21wbGV0ZSB3ZSBoYXZlIHRvIHJlc2V0IFNlbGVjdDIgZW50aXJlbHlcbiAgICAgICAqICAgYXMgc2V0U2VsZWN0MkRlZmF1bHRzIGlzIHN1cGVyIGJ1Z2d5IGR1ZSB0byBTZWxlY3QyIGNvbnN0cmFpbnRzXG4gICAgICAgKiBTbyBsZXQncyBvbmx5IHJlc2V0IGlmIHdlIGhhdmUgdG9cbiAgICAgICAqL1xuICAgICAgaWYgKCh0aGlzLmF1dG9jb21wbGV0ZSA9PT0gJ25vX2F1dG9jb21wbGV0ZScpICE9PSB3YXNBdXRvY29tcGxldGUpIHtcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdDIoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYmVnaW5BdFplcm8gPT09ICd0cnVlJykge1xuICAgICAgICAkKCcuYmVnaW4tYXQtemVyby1vcHRpb24nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzSW5wdXQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRGlyZWN0bHkgc2V0IGl0ZW1zIGluIFNlbGVjdDJcbiAgICogQ3VycmVudGx5IGlzIG5vdCBhYmxlIHRvIHJlbW92ZSB1bmRlcnNjb3JlcyBmcm9tIHBhZ2UgbmFtZXNcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gaXRlbXMgLSBwYWdlIHRpdGxlc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IC0gdW50b3VjaGVkIGFycmF5IG9mIGl0ZW1zXG4gICAqL1xuICBzZXRTZWxlY3QyRGVmYXVsdHMoaXRlbXMpIHtcbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgZXNjYXBlZFRleHQgPSAkKCc8ZGl2PicpLnRleHQoaXRlbSkuaHRtbCgpO1xuICAgICAgJCgnPG9wdGlvbj4nICsgZXNjYXBlZFRleHQgKyAnPC9vcHRpb24+JykuYXBwZW5kVG8odGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcbiAgICB9KTtcbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuc2VsZWN0MigndmFsJywgaXRlbXMpO1xuICAgICQodGhpcy5jb25maWcuc2VsZWN0MklucHV0KS5zZWxlY3QyKCdjbG9zZScpO1xuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRhdGVyYW5nZSBwaWNrZXIgdmFsdWVzIGFuZCB0aGlzLnNwZWNpYWxSYW5nZSBiYXNlZCBvbiBwcm92aWRlZCBzcGVjaWFsIHJhbmdlIGtleVxuICAgKiBXQVJOSU5HOiBub3QgdG8gYmUgY2FsbGVkIG9uIGRhdGVyYW5nZSBwaWNrZXIgR1VJIGV2ZW50cyAoZS5nLiBzcGVjaWFsIHJhbmdlIGJ1dHRvbnMpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gb25lIG9mIHNwZWNpYWwgcmFuZ2VzIGRlZmluZWQgaW4gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcyxcbiAgICogICBpbmNsdWRpbmcgZHluYW1pYyBsYXRlc3QgcmFuZ2UsIHN1Y2ggYXMgYGxhdGVzdC0xNWAgZm9yIGxhdGVzdCAxNSBkYXlzXG4gICAqIEByZXR1cm5zIHtvYmplY3R8bnVsbH0gdXBkYXRlZCB0aGlzLnNwZWNpYWxSYW5nZSBvYmplY3Qgb3IgbnVsbCBpZiB0eXBlIHdhcyBpbnZhbGlkXG4gICAqL1xuICBzZXRTcGVjaWFsUmFuZ2UodHlwZSkge1xuICAgIGNvbnN0IHJhbmdlSW5kZXggPSBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKS5pbmRleE9mKHR5cGUpO1xuICAgIGxldCBzdGFydERhdGUsIGVuZERhdGU7XG5cbiAgICBpZiAodHlwZS5pbmNsdWRlcygnbGF0ZXN0LScpKSB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBwYXJzZUludCh0eXBlLnJlcGxhY2UoJ2xhdGVzdC0nLCAnJyksIDEwKSB8fCAyMDsgLy8gZmFsbGJhY2sgb2YgMjBcbiAgICAgIFtzdGFydERhdGUsIGVuZERhdGVdID0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcy5sYXRlc3Qob2Zmc2V0KTtcbiAgICB9IGVsc2UgaWYgKHJhbmdlSW5kZXggPj0gMCkge1xuICAgICAgLyoqIHRyZWF0ICdsYXRlc3QnIGFzIGEgZnVuY3Rpb24gKi9cbiAgICAgIFtzdGFydERhdGUsIGVuZERhdGVdID0gdHlwZSA9PT0gJ2xhdGVzdCcgPyB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzLmxhdGVzdCgpIDogdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlc1t0eXBlXTtcbiAgICAgICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLmVxKHJhbmdlSW5kZXgpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IHtcbiAgICAgIHJhbmdlOiB0eXBlLFxuICAgICAgdmFsdWU6IGAke3N0YXJ0RGF0ZS5mb3JtYXQodGhpcy5kYXRlRm9ybWF0KX0gLSAke2VuZERhdGUuZm9ybWF0KHRoaXMuZGF0ZUZvcm1hdCl9YFxuICAgIH07XG5cbiAgICAvKiogZGlyZWN0bHkgYXNzaWduIHN0YXJ0RGF0ZSB0aGVuIHVzZSBzZXRFbmREYXRlIHNvIHRoYXQgdGhlIGV2ZW50cyB3aWxsIGJlIGZpcmVkIG9uY2UgKi9cbiAgICB0aGlzLmRhdGVyYW5nZXBpY2tlci5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIuc2V0RW5kRGF0ZShlbmREYXRlKTtcblxuICAgIHJldHVybiB0aGlzLnNwZWNpYWxSYW5nZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBjb2xvcnMgZm9yIFNlbGVjdDIgZW50cmllcyBzbyB3ZSBjYW4gZHluYW1pY2FsbHkgY2hhbmdlIHRoZW1cbiAgICogVGhpcyBpcyBhIG5lY2Vzc2FyeSBldmlsLCBhcyB3ZSBoYXZlIHRvIG1hcmsgdGhlbSBhcyAhaW1wb3J0YW50XG4gICAqICAgYW5kIHNpbmNlIHRoZXJlIGFyZSBhbnkgbnVtYmVyIG9mIGVudGlyZXMsIHdlIG5lZWQgdG8gdXNlIG50aC1jaGlsZCBzZWxlY3RvcnNcbiAgICogQHJldHVybnMge0NTU1N0eWxlc2hlZXR9IG91ciBuZXcgc3R5bGVzaGVldFxuICAgKi9cbiAgc2V0dXBTZWxlY3QyQ29sb3JzKCkge1xuICAgIC8qKiBmaXJzdCBkZWxldGUgb2xkIHN0eWxlc2hlZXQsIGlmIHByZXNlbnQgKi9cbiAgICBpZiAodGhpcy5jb2xvcnNTdHlsZUVsKSB0aGlzLmNvbG9yc1N0eWxlRWwucmVtb3ZlKCk7XG5cbiAgICAvKiogY3JlYXRlIG5ldyBzdHlsZXNoZWV0ICovXG4gICAgdGhpcy5jb2xvcnNTdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0aGlzLmNvbG9yc1N0eWxlRWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTsgLy8gV2ViS2l0IGhhY2sgOihcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRoaXMuY29sb3JzU3R5bGVFbCk7XG5cbiAgICAvKiogYWRkIGNvbG9yIHJ1bGVzICovXG4gICAgdGhpcy5jb25maWcuY29sb3JzLmZvckVhY2goKGNvbG9yLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5jb2xvcnNTdHlsZUVsLnNoZWV0Lmluc2VydFJ1bGUoYC5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlOm50aC1vZi10eXBlKCR7aW5kZXggKyAxfSkgeyBiYWNrZ3JvdW5kOiAke2NvbG9yfSAhaW1wb3J0YW50IH1gLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNvbG9yc1N0eWxlRWwuc2hlZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ3Jvc3MtYXBwbGljYXRpb24gbGlzdGVuZXJzXG4gICAqIEVhY2ggYXBwIGhhcyBpdCdzIG93biBzZXR1cExpc3RlbmVycygpIHRoYXQgc2hvdWxkIGNhbGwgc3VwZXIuc2V0dXBMaXN0ZW5lcnMoKVxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzZXR1cExpc3RlbmVycygpIHtcbiAgICAvKiogcHJldmVudCBicm93c2VyJ3MgZGVmYXVsdCBiZWhhdmlvdXIgZm9yIGFueSBsaW5rIHdpdGggaHJlZj1cIiNcIiAqL1xuICAgICQoXCJhW2hyZWY9JyMnXVwiKS5vbignY2xpY2snLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICAvKiogZG93bmxvYWQgbGlzdGVuZXJzICovXG4gICAgJCgnLmRvd25sb2FkLWNzdicpLm9uKCdjbGljaycsIHRoaXMuZXhwb3J0Q1NWLmJpbmQodGhpcykpO1xuICAgICQoJy5kb3dubG9hZC1qc29uJykub24oJ2NsaWNrJywgdGhpcy5leHBvcnRKU09OLmJpbmQodGhpcykpO1xuXG4gICAgLyoqIHByb2plY3QgaW5wdXQgbGlzdGVuZXJzLCBzYXZpbmcgYW5kIHJlc3RvcmluZyBvbGQgdmFsdWUgaWYgbmV3IG9uZSBpcyBpbnZhbGlkICovXG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLm9uKCdmb2N1c2luJywgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRhdGFzZXQudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH0pO1xuICAgICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS5vbignY2hhbmdlJywgZSA9PiB0aGlzLnZhbGlkYXRlUHJvamVjdChlKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlcyBvZiBmb3JtIGJhc2VkIG9uIGxvY2FsU3RvcmFnZSBvciBkZWZhdWx0cywgYWRkIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0dXBTZXR0aW5nc01vZGFsKCkge1xuICAgIC8qKiBmaWxsIGluIHZhbHVlcywgZXZlcnl0aGluZyBpcyBlaXRoZXIgYSBjaGVja2JveCBvciByYWRpbyAqL1xuICAgIHRoaXMuZmlsbEluU2V0dGluZ3MoKTtcblxuICAgIC8qKiBhZGQgbGlzdGVuZXIgKi9cbiAgICAkKCcuc2F2ZS1zZXR0aW5ncy1idG4nKS5vbignY2xpY2snLCB0aGlzLnNhdmVTZXR0aW5ncy5iaW5kKHRoaXMpKTtcbiAgICAkKCcuY2FuY2VsLXNldHRpbmdzLWJ0bicpLm9uKCdjbGljaycsIHRoaXMuZmlsbEluU2V0dGluZ3MuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0cyB1cCB0aGUgZGF0ZXJhbmdlIHNlbGVjdG9yIGFuZCBhZGRzIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cERhdGVSYW5nZVNlbGVjdG9yKCkge1xuICAgIGNvbnN0IGRhdGVSYW5nZVNlbGVjdG9yID0gJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3Rvcik7XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm0gdGhpcy5jb25maWcuc3BlY2lhbFJhbmdlcyB0byBoYXZlIGkxOG4gYXMga2V5c1xuICAgICAqIFRoaXMgaXMgd2hhdCBpcyBzaG93biBhcyB0aGUgc3BlY2lhbCByYW5nZXMgKExhc3QgbW9udGgsIGV0Yy4pIGluIHRoZSBkYXRlcGlja2VyIG1lbnVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGxldCByYW5nZXMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSAnbGF0ZXN0JykgcmV0dXJuOyAvLyB0aGlzIGlzIGEgZnVuY3Rpb24sIG5vdCBtZWFudCB0byBiZSBpbiB0aGUgbGlzdCBvZiBzcGVjaWFsIHJhbmdlc1xuICAgICAgcmFuZ2VzWyQuaTE4bihrZXkpXSA9IHRoaXMuY29uZmlnLnNwZWNpYWxSYW5nZXNba2V5XTtcbiAgICB9KTtcblxuICAgIGxldCBkYXRlcGlja2VyT3B0aW9ucyA9IHtcbiAgICAgIGxvY2FsZToge1xuICAgICAgICBmb3JtYXQ6IHRoaXMuZGF0ZUZvcm1hdCxcbiAgICAgICAgYXBwbHlMYWJlbDogJC5pMThuKCdhcHBseScpLFxuICAgICAgICBjYW5jZWxMYWJlbDogJC5pMThuKCdjYW5jZWwnKSxcbiAgICAgICAgY3VzdG9tUmFuZ2VMYWJlbDogJC5pMThuKCdjdXN0b20tcmFuZ2UnKSxcbiAgICAgICAgZGF5c09mV2VlazogW1xuICAgICAgICAgICQuaTE4bignc3UnKSxcbiAgICAgICAgICAkLmkxOG4oJ21vJyksXG4gICAgICAgICAgJC5pMThuKCd0dScpLFxuICAgICAgICAgICQuaTE4bignd2UnKSxcbiAgICAgICAgICAkLmkxOG4oJ3RoJyksXG4gICAgICAgICAgJC5pMThuKCdmcicpLFxuICAgICAgICAgICQuaTE4bignc2EnKVxuICAgICAgICBdLFxuICAgICAgICBtb250aE5hbWVzOiBbXG4gICAgICAgICAgJC5pMThuKCdqYW51YXJ5JyksXG4gICAgICAgICAgJC5pMThuKCdmZWJydWFyeScpLFxuICAgICAgICAgICQuaTE4bignbWFyY2gnKSxcbiAgICAgICAgICAkLmkxOG4oJ2FwcmlsJyksXG4gICAgICAgICAgJC5pMThuKCdtYXknKSxcbiAgICAgICAgICAkLmkxOG4oJ2p1bmUnKSxcbiAgICAgICAgICAkLmkxOG4oJ2p1bHknKSxcbiAgICAgICAgICAkLmkxOG4oJ2F1Z3VzdCcpLFxuICAgICAgICAgICQuaTE4bignc2VwdGVtYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdvY3RvYmVyJyksXG4gICAgICAgICAgJC5pMThuKCdub3ZlbWJlcicpLFxuICAgICAgICAgICQuaTE4bignZGVjZW1iZXInKVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgc3RhcnREYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCh0aGlzLmNvbmZpZy5kYXlzQWdvLCAnZGF5cycpLFxuICAgICAgbWluRGF0ZTogdGhpcy5jb25maWcubWluRGF0ZSxcbiAgICAgIG1heERhdGU6IHRoaXMuY29uZmlnLm1heERhdGUsXG4gICAgICByYW5nZXM6IHJhbmdlc1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25maWcuZGF0ZUxpbWl0KSBkYXRlcGlja2VyT3B0aW9ucy5kYXRlTGltaXQgPSB7IGRheXM6IHRoaXMuY29uZmlnLmRhdGVMaW1pdCB9O1xuXG4gICAgZGF0ZVJhbmdlU2VsZWN0b3IuZGF0ZXJhbmdlcGlja2VyKGRhdGVwaWNrZXJPcHRpb25zKTtcblxuICAgIC8qKiBzbyBwZW9wbGUga25vdyB3aHkgdGhleSBjYW4ndCBxdWVyeSBkYXRhIG9sZGVyIHRoYW4gSnVseSAyMDE1ICovXG4gICAgJCgnLmRhdGVyYW5nZXBpY2tlcicpLmFwcGVuZChcbiAgICAgICQoJzxkaXY+JylcbiAgICAgICAgLmFkZENsYXNzKCdkYXRlcmFuZ2Utbm90aWNlJylcbiAgICAgICAgLmh0bWwoJC5pMThuKCdkYXRlLW5vdGljZScsIGRvY3VtZW50LnRpdGxlLFxuICAgICAgICAgIFwiPGEgaHJlZj0naHR0cDovL3N0YXRzLmdyb2suc2UnIHRhcmdldD0nX2JsYW5rJz5zdGF0cy5ncm9rLnNlPC9hPlwiLFxuICAgICAgICAgIGAkeyQuaTE4bignanVseScpfSAyMDE1YFxuICAgICAgICApKVxuICAgICk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3BlY2lhbCBkYXRlIHJhbmdlIG9wdGlvbnMgKGJ1dHRvbnMgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGRhdGVyYW5nZSBwaWNrZXIpXG4gICAgICpcbiAgICAgKiBXQVJOSU5HOiB3ZSdyZSB1bmFibGUgdG8gYWRkIGNsYXNzIG5hbWVzIG9yIGRhdGEgYXR0cnMgdG8gdGhlIHJhbmdlIG9wdGlvbnMsXG4gICAgICogc28gY2hlY2tpbmcgd2hpY2ggd2FzIGNsaWNrZWQgaXMgaGFyZGNvZGVkIGJhc2VkIG9uIHRoZSBpbmRleCBvZiB0aGUgTEksXG4gICAgICogYXMgZGVmaW5lZCBpbiB0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzXG4gICAgICovXG4gICAgJCgnLmRhdGVyYW5nZXBpY2tlciAucmFuZ2VzIGxpJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9ICQoJy5kYXRlcmFuZ2VwaWNrZXIgLnJhbmdlcyBsaScpLmluZGV4KGUudGFyZ2V0KSxcbiAgICAgICAgY29udGFpbmVyID0gdGhpcy5kYXRlcmFuZ2VwaWNrZXIuY29udGFpbmVyLFxuICAgICAgICBpbnB1dHMgPSBjb250YWluZXIuZmluZCgnLmRhdGVyYW5nZXBpY2tlcl9pbnB1dCBpbnB1dCcpO1xuICAgICAgdGhpcy5zcGVjaWFsUmFuZ2UgPSB7XG4gICAgICAgIHJhbmdlOiBPYmplY3Qua2V5cyh0aGlzLmNvbmZpZy5zcGVjaWFsUmFuZ2VzKVtpbmRleF0sXG4gICAgICAgIHZhbHVlOiBgJHtpbnB1dHNbMF0udmFsdWV9IC0gJHtpbnB1dHNbMV0udmFsdWV9YFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLm9uKCdhcHBseS5kYXRlcmFuZ2VwaWNrZXInLCAoZSwgYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLmNob3NlbkxhYmVsID09PSAkLmkxOG4oJ2N1c3RvbS1yYW5nZScpKSB7XG4gICAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0gbnVsbDtcblxuICAgICAgICAvKiogZm9yY2UgZXZlbnRzIHRvIHJlLWZpcmUgc2luY2UgYXBwbHkuZGF0ZXJhbmdlcGlja2VyIG9jY3VycyBiZWZvcmUgJ2NoYW5nZScgZXZlbnQgKi9cbiAgICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIudXBkYXRlRWxlbWVudCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0ZhdGFsRXJyb3JzKGVycm9ycykge1xuICAgIHRoaXMuY2xlYXJNZXNzYWdlcygpO1xuICAgIGVycm9ycy5mb3JFYWNoKGVycm9yID0+IHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKFxuICAgICAgICBgPHN0cm9uZz4keyQuaTE4bignZmF0YWwtZXJyb3InKX08L3N0cm9uZz46IDxjb2RlPiR7ZXJyb3J9PC9jb2RlPmAsXG4gICAgICAgICdlcnJvcidcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgdGhyb3cgZXJyb3JzWzBdO1xuICAgIH0gZWxzZSBpZiAoZXJyb3JzICYmIGVycm9yc1swXSAmJiBlcnJvcnNbMF0uc3RhY2spIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvL3Rvb2xzLndtZmxhYnMub3JnL211c2lrYW5pbWFsL3Bhc3RlJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGNvbnRlbnQ6ICcnICtcbiAgICAgICAgICAgIGBcXG5kYXRlOiAgICAgICR7bW9tZW50KCkudXRjKCkuZm9ybWF0KCl9YCArXG4gICAgICAgICAgICBgXFxudG9vbDogICAgICAke3RoaXMuYXBwfWAgK1xuICAgICAgICAgICAgYFxcbmxhbmd1YWdlOiAgJHtpMThuTGFuZ31gICtcbiAgICAgICAgICAgIGBcXG5jaGFydDogICAgICR7dGhpcy5jaGFydFR5cGV9YCArXG4gICAgICAgICAgICBgXFxudXJsOiAgICAgICAke2RvY3VtZW50LmxvY2F0aW9uLmhyZWZ9YCArXG4gICAgICAgICAgICBgXFxudXNlckFnZW50OiAke3RoaXMuZ2V0VXNlckFnZW50KCl9YCArXG4gICAgICAgICAgICBgXFxudHJhY2U6ICAgICAke2Vycm9yc1swXS5zdGFja31gXG4gICAgICAgICAgLFxuICAgICAgICAgIHRpdGxlOiBgUGFnZXZpZXdzIEFuYWx5c2lzIGVycm9yIHJlcG9ydDogJHtlcnJvcnNbMF19YFxuICAgICAgICB9XG4gICAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC5vYmplY3ROYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTChkYXRhLnJlc3VsdC5vYmplY3ROYW1lKSksXG4gICAgICAgICAgICAnZXJyb3InXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAgICQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpLFxuICAgICAgICAgICAgJ2Vycm9yJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoKCkgPT4ge1xuICAgICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgICAkLmkxOG4oJ2Vycm9yLXBsZWFzZS1yZXBvcnQnLCB0aGlzLmdldEJ1Z1JlcG9ydFVSTCgpKSxcbiAgICAgICAgICAnZXJyb3InXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3BsYXNoIGluIGNvbnNvbGUsIGp1c3QgZm9yIGZ1blxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBvdXRwdXRcbiAgICovXG4gIHNwbGFzaCgpIHtcbiAgICBjb25zdCBzdHlsZSA9ICdiYWNrZ3JvdW5kOiAjZWVlOyBjb2xvcjogIzU1NTsgcGFkZGluZzogNHB4OyBmb250LWZhbWlseTptb25vc3BhY2UnO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgIF9fXyAgICAgICAgICAgIF9fIF8gICAgICAgICAgICAgICAgICAgICBfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICB8IF8gXFxcXCAgX18gXyAgICAvIF9gIHwgICBfX18gICAgX18gX18gICAgKF8pICAgICBfX18gICBfXyBfXyBfXyAgX19fICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgIHwgIF8vIC8gX2AgfCAgIFxcXFxfXywgfCAgLyAtXykgICBcXFxcIFYgLyAgICB8IHwgICAgLyAtXykgIFxcXFwgViAgViAvIChfLTwgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICBffF98XyAgXFxcXF9fLF98ICAgfF9fXy8gICBcXFxcX19ffCAgIF9cXFxcXy9fICAgX3xffF8gICBcXFxcX19ffCAgIFxcXFxfL1xcXFxfLyAgL19fL18gICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICBffCBcIlwiXCIgfF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8ICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICBcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCcgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgICAgICAgICAgICAgIF9fXyAgICAgICAgICAgICAgICAgICAgIF8gIF8gICAgIF8gICAgICAgICAgICAgICBfICAgICAgICAgICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICAgIG8gTyBPICAvICAgXFxcXCAgIF8gXyAgICAgX18gXyAgICB8IHx8IHwgICB8IHwgICAgIF9fXyAgICAgKF8pICAgICBfX18gICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICBvICAgICAgIHwgLSB8ICB8IFxcJyBcXFxcICAgLyBfYCB8ICAgIFxcXFxfLCB8ICAgfCB8ICAgIChfLTwgICAgIHwgfCAgICAoXy08ICAgJywgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCclYyAgICBUU19fW09dICB8X3xffCAgfF98fF98ICBcXFxcX18sX3wgICBffF9fLyAgIF98X3xfICAgL19fL18gICBffF98XyAgIC9fXy9fICAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgez09PT09PXxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffCBcIlwiXCJcInxffFwiXCJcIlwiXCJ8X3xcIlwiXCJcIlwifF98XCJcIlwiXCJcInxffFwiXCJcIlwiXCJ8ICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnJWMgIC4vby0tMDAwXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJ1wiYC0wLTAtXFwnXCJgLTAtMC1cXCdcImAtMC0wLVxcJyAnLCBzdHlsZSk7XG4gICAgY29uc29sZS5sb2coJyVjICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZyhgJWMgIENvcHlyaWdodCDCqSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gTXVzaWtBbmltYWwsIEthbGRhcmksIE1hcmNlbCBSdWl6IEZvcm5zICAgICAgICAgICAgICAgICAgYCwgc3R5bGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgbG9hZGluZyBpbmRpY2F0b3IgY2xhc3MgYW5kIHNldCB0aGUgc2FmZWd1YXJkIHRpbWVvdXRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHN0YXJ0U3Bpbm55KCkge1xuICAgICQoJy5jaGFydC1jb250YWluZXInKS5hZGRDbGFzcygnbG9hZGluZycpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChlcnIgPT4ge1xuICAgICAgdGhpcy5yZXNldFZpZXcoKTtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKGA8c3Ryb25nPiR7JC5pMThuKCdmYXRhbC1lcnJvcicpfTwvc3Ryb25nPjpcbiAgICAgICAgJHskLmkxOG4oJ2Vycm9yLXRpbWVkLW91dCcpfVxuICAgICAgICAkeyQuaTE4bignZXJyb3ItcGxlYXNlLXJlcG9ydCcsIHRoaXMuZ2V0QnVnUmVwb3J0VVJMKCkpfVxuICAgICAgYCwgJ2Vycm9yJywgMCk7XG4gICAgfSwgMjAgKiAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbG9hZGluZyBpbmRpY2F0b3IgY2xhc3MgYW5kIGNsZWFyIHRoZSBzYWZlZ3VhcmQgdGltZW91dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc3RvcFNwaW5ueSgpIHtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIHNwYWNlcyB3aXRoIHVuZGVyc2NvcmVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gYXJyYXkgb2YgcGFnZSBuYW1lc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IHBhZ2UgbmFtZXMgd2l0aCB1bmRlcnNjb3Jlc1xuICAgKi9cbiAgdW5kZXJzY29yZVBhZ2VOYW1lcyhwYWdlcykge1xuICAgIHJldHVybiBwYWdlcy5tYXAocGFnZSA9PiB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhZ2UpLnNjb3JlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGhyZWZzIG9mIGludGVyLWFwcCBsaW5rcyB0byBsb2FkIGN1cnJlbnRseSBzZWxlY3RlZCBwcm9qZWN0XG4gICAqIEByZXR1cm4ge251bGx9IG51dHRpbidcbiAgICovXG4gIHVwZGF0ZUludGVyQXBwTGlua3MoKSB7XG4gICAgJCgnLmludGVyYXBwLWxpbmsnKS5lYWNoKChpLCBsaW5rKSA9PiB7XG4gICAgICBsZXQgdXJsID0gbGluay5ocmVmLnNwbGl0KCc/JylbMF07XG5cbiAgICAgIGlmIChsaW5rLmNsYXNzTGlzdC5jb250YWlucygnaW50ZXJhcHAtbGluay0tc2l0ZXZpZXdzJykpIHtcbiAgICAgICAgbGluay5ocmVmID0gYCR7dXJsfT9zaXRlcz0ke3RoaXMucHJvamVjdC5lc2NhcGUoKX0ub3JnYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsuaHJlZiA9IGAke3VybH0/cHJvamVjdD0ke3RoaXMucHJvamVjdC5lc2NhcGUoKX0ub3JnYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBiYXNpYyBwYXJhbXMgYWdhaW5zdCB3aGF0IGlzIGRlZmluZWQgaW4gdGhlIGNvbmZpZyxcbiAgICogICBhbmQgaWYgdGhleSBhcmUgaW52YWxpZCBzZXQgdGhlIGRlZmF1bHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIHBhcmFtcyBhcyBmZXRjaGVkIGJ5IHRoaXMucGFyc2VRdWVyeVN0cmluZygpXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNhbWUgcGFyYW1zIHdpdGggc29tZSBpbnZhbGlkIHBhcmFtZXRlcnMgY29ycmV0ZWQsIGFzIG5lY2Vzc2FyeVxuICAgKi9cbiAgdmFsaWRhdGVQYXJhbXMocGFyYW1zKSB7XG4gICAgdGhpcy5jb25maWcudmFsaWRhdGVQYXJhbXMuZm9yRWFjaChwYXJhbUtleSA9PiB7XG4gICAgICBpZiAocGFyYW1LZXkgPT09ICdwcm9qZWN0JyAmJiBwYXJhbXMucHJvamVjdCkge1xuICAgICAgICBwYXJhbXMucHJvamVjdCA9IHBhcmFtcy5wcm9qZWN0LnJlcGxhY2UoL153d3dcXC4vLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuY29uZmlnLmRlZmF1bHRzW3BhcmFtS2V5XSxcbiAgICAgICAgcGFyYW1WYWx1ZSA9IHBhcmFtc1twYXJhbUtleV07XG5cbiAgICAgIGlmIChkZWZhdWx0VmFsdWUgJiYgIXRoaXMuY29uZmlnLnZhbGlkUGFyYW1zW3BhcmFtS2V5XS5pbmNsdWRlcyhwYXJhbVZhbHVlKSkge1xuICAgICAgICAvLyBvbmx5IHRocm93IGVycm9yIGlmIHRoZXkgdHJpZWQgdG8gcHJvdmlkZSBhbiBpbnZhbGlkIHZhbHVlXG4gICAgICAgIGlmICghIXBhcmFtVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmFkZEludmFsaWRQYXJhbU5vdGljZShwYXJhbUtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXNbcGFyYW1LZXldID0gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGxpc3RlbmVycyB0byB0aGUgcHJvamVjdCBpbnB1dCBmb3IgdmFsaWRhdGlvbnMgYWdhaW5zdCB0aGUgc2l0ZSBtYXAsXG4gICAqICAgcmV2ZXJ0aW5nIHRvIHRoZSBvbGQgdmFsdWUgaWYgdGhlIG5ldyBvbmUgaXMgaW52YWxpZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttdWx0aWxpbmd1YWxdIC0gd2hldGhlciB3ZSBzaG91bGQgY2hlY2sgaWYgaXQgaXMgYSBtdWx0aWxpbmd1YWwgcHJvamVjdFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gd2hldGhlciBvciBub3QgdmFsaWRhdGlvbnMgcGFzc2VkXG4gICAqL1xuICB2YWxpZGF0ZVByb2plY3QobXVsdGlsaW5ndWFsID0gZmFsc2UpIHtcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dClbMF07XG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0SW5wdXQudmFsdWUucmVwbGFjZSgvXnd3d1xcLi8sICcnKSxcbiAgICAgIHZhbGlkID0gZmFsc2U7XG5cbiAgICBpZiAobXVsdGlsaW5ndWFsICYmICF0aGlzLmlzTXVsdGlsYW5nUHJvamVjdCgpKSB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdpbnZhbGlkLWxhbmctcHJvamVjdCcsIGA8YSBocmVmPScvLyR7cHJvamVjdC5lc2NhcGUoKX0nPiR7cHJvamVjdC5lc2NhcGUoKX08L2E+YCksXG4gICAgICAgICd3YXJuaW5nJ1xuICAgICAgKTtcbiAgICAgIHByb2plY3QgPSBwcm9qZWN0SW5wdXQuZGF0YXNldC52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHNpdGVEb21haW5zLmluY2x1ZGVzKHByb2plY3QpKSB7XG4gICAgICB0aGlzLmNsZWFyTWVzc2FnZXMoKTtcbiAgICAgIHRoaXMudXBkYXRlSW50ZXJBcHBMaW5rcygpO1xuICAgICAgdmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndyaXRlTWVzc2FnZShcbiAgICAgICAgJC5pMThuKCdpbnZhbGlkLXByb2plY3QnLCBgPGEgaHJlZj0nLy8ke3Byb2plY3QuZXNjYXBlKCl9Jz4ke3Byb2plY3QuZXNjYXBlKCl9PC9hPmApLFxuICAgICAgICAnd2FybmluZydcbiAgICAgICk7XG4gICAgICBwcm9qZWN0ID0gcHJvamVjdElucHV0LmRhdGFzZXQudmFsdWU7XG4gICAgfVxuXG4gICAgcHJvamVjdElucHV0LnZhbHVlID0gcHJvamVjdDtcblxuICAgIHJldHVybiB2YWxpZDtcbiAgfVxuXG4gIC8vIEZJWE1FOiByZXN0b3JlIHdyaXRlTWVzc2FnZSB0byB0aGUgd2F5IGl0IHVzZWQgdG8gYmUsXG4gIC8vIGFuZCBtYWtlIGFkZFNpdGVOb3RpY2UgZG8gdGhlIHRvYXN0ciwgYW5kIGNoYW5nZSBpbnN0YW5jZXMgb2YgdGhpcy53cml0ZU1lc3NhZ2VcbiAgLy8gYWNjb3JkaW5nbHlcbiAgLyoqXG4gICAqIFdyaXRlcyBtZXNzYWdlIGp1c3QgYmVsb3cgdGhlIGNoYXJ0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gbWVzc2FnZSB0byB3cml0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtIG51bSBzZWNvbmRzIHRvIHNob3dcbiAgICogQHJldHVybnMge2pRdWVyeX0gLSBqUXVlcnkgb2JqZWN0IG9mIG1lc3NhZ2UgY29udGFpbmVyXG4gICAqL1xuICB3cml0ZU1lc3NhZ2UobWVzc2FnZSwgbGV2ZWwgPSAnd2FybmluZycsIHRpbWVvdXQgPSA1MDAwKSB7XG4gICAgdG9hc3RyLm9wdGlvbnMudGltZU91dCA9IHRpbWVvdXQ7XG4gICAgdG9hc3RyW2xldmVsXShtZXNzYWdlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFB2O1xuIiwiLyoqXG4gKiBAZmlsZSBTaGFyZWQgY29uZmlnIGFtb25nc3QgYWxsIGFwcHNcbiAqIEBhdXRob3IgTXVzaWtBbmltYWxcbiAqIEBjb3B5cmlnaHQgMjAxNiBNdXNpa0FuaW1hbFxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2U6IGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuY29uc3Qgc2l0ZU1hcCA9IHJlcXVpcmUoJy4vc2l0ZV9tYXAnKTtcbmNvbnN0IHNpdGVEb21haW5zID0gT2JqZWN0LmtleXMoc2l0ZU1hcCkubWFwKGtleSA9PiBzaXRlTWFwW2tleV0pO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGFsbCBQYWdldmlld3MgYXBwbGljYXRpb25zLlxuICogU29tZSBwcm9wZXJ0aWVzIG1heSBiZSBvdmVycmlkZW4gYnkgYXBwLXNwZWNpZmljIGNvbmZpZ3NcbiAqL1xuY2xhc3MgUHZDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgZm9ybWF0WEF4aXNUaWNrID0gdmFsdWUgPT4ge1xuICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbW9tZW50KHZhbHVlLCB0aGlzLmRhdGVGb3JtYXQpLndlZWtkYXkoKTtcbiAgICAgIGlmIChkYXlPZldlZWsgJSA3KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBg4oCiICR7dmFsdWV9YDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBhcGlMaW1pdDogNTAwMCxcbiAgICAgIGFwaVRocm90dGxlOiAyMCxcbiAgICAgIGFwcHM6IFsncGFnZXZpZXdzJywgJ3RvcHZpZXdzJywgJ2xhbmd2aWV3cycsICdzaXRldmlld3MnLCAnbWFzc3ZpZXdzJywgJ3JlZGlyZWN0dmlld3MnXSxcbiAgICAgIGNoYXJ0Q29uZmlnOiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB2YWx1ZSA9PiB0aGlzLmZvcm1hdFlBeGlzTnVtYmVyKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIHhBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0WEF4aXNUaWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDApJyxcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRCb3JkZXJDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjIpLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlckNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBwb2ludEhvdmVyUmFkaXVzOiA1LFxuICAgICAgICAgICAgICB0ZW5zaW9uOiBzZWxmLmJlemllckN1cnZlID09PSAndHJ1ZScgPyAwLjQgOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYmFyOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXRZQXhpc051bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICB4QXhlczogW3tcbiAgICAgICAgICAgICAgICBiYXJQZXJjZW50YWdlOiAxLjAsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlQZXJjZW50YWdlOiAwLjg1LFxuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0WEF4aXNUaWNrKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMubGluZWFyVG9vbHRpcHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGFzZXQoY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC42KSxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC45KSxcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgIGhvdmVyQmFja2dyb3VuZENvbG9yOiBzZWxmLnJnYmEoY29sb3IsIDAuNzUpLFxuICAgICAgICAgICAgICBob3ZlckJvcmRlckNvbG9yOiBjb2xvclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJhZGFyOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5saW5lYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjEpLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgICBwb2ludEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50Qm9yZGVyQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KSxcbiAgICAgICAgICAgICAgcG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJCb3JkZXJDb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIHBvaW50SG92ZXJSYWRpdXM6IDVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwaWU6IHtcbiAgICAgICAgICBvcHRzOiB7XG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgaG92ZXJCYWNrZ3JvdW5kQ29sb3I6IHNlbGYucmdiYShjb2xvciwgMC44KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRvdWdobnV0OiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKHNlbGYpLFxuICAgICAgICAgICAgdG9vbHRpcHM6IHRoaXMuY2lyY3VsYXJUb29sdGlwc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YXNldChjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjgpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9sYXJBcmVhOiB7XG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogY2hhcnQgPT4gdGhpcy5jb25maWcuY2hhcnRMZWdlbmQoc2VsZiksXG4gICAgICAgICAgICB0b29sdGlwczogdGhpcy5jaXJjdWxhclRvb2x0aXBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhc2V0KGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjcpLFxuICAgICAgICAgICAgICBob3ZlckJhY2tncm91bmRDb2xvcjogc2VsZi5yZ2JhKGNvbG9yLCAwLjkpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNpcmN1bGFyQ2hhcnRzOiBbJ3BpZScsICdkb3VnaG51dCcsICdwb2xhckFyZWEnXSxcbiAgICAgIGNvbG9yczogWydyZ2JhKDE3MSwgMjEyLCAyMzUsIDEpJywgJ3JnYmEoMTc4LCAyMjMsIDEzOCwgMSknLCAncmdiYSgyNTEsIDE1NCwgMTUzLCAxKScsICdyZ2JhKDI1MywgMTkxLCAxMTEsIDEpJywgJ3JnYmEoMjAyLCAxNzgsIDIxNCwgMSknLCAncmdiYSgyMDcsIDE4MiwgMTI4LCAxKScsICdyZ2JhKDE0MSwgMjExLCAxOTksIDEpJywgJ3JnYmEoMjUyLCAyMDUsIDIyOSwgMSknLCAncmdiYSgyNTUsIDI0NywgMTYxLCAxKScsICdyZ2JhKDIxNywgMjE3LCAyMTcsIDEpJ10sXG4gICAgICBkZWZhdWx0czoge1xuICAgICAgICBhdXRvY29tcGxldGU6ICdhdXRvY29tcGxldGUnLFxuICAgICAgICBjaGFydFR5cGU6IG51bURhdGFzZXRzID0+IG51bURhdGFzZXRzID4gMSA/ICdsaW5lJyA6ICdiYXInLFxuICAgICAgICBkYXRlRm9ybWF0OiAnWVlZWS1NTS1ERCcsXG4gICAgICAgIGxvY2FsaXplRGF0ZUZvcm1hdDogJ3RydWUnLFxuICAgICAgICBudW1lcmljYWxGb3JtYXR0aW5nOiAndHJ1ZScsXG4gICAgICAgIGJlemllckN1cnZlOiAnZmFsc2UnLFxuICAgICAgICBhdXRvTG9nRGV0ZWN0aW9uOiAndHJ1ZScsXG4gICAgICAgIGJlZ2luQXRaZXJvOiAnZmFsc2UnLFxuICAgICAgICByZW1lbWJlckNoYXJ0OiAndHJ1ZScsXG4gICAgICAgIGFnZW50OiAndXNlcicsXG4gICAgICAgIHBsYXRmb3JtOiAnYWxsLWFjY2VzcycsXG4gICAgICAgIHByb2plY3Q6ICdlbi53aWtpcGVkaWEub3JnJ1xuICAgICAgfSxcbiAgICAgIGdsb2JhbENoYXJ0T3B0czoge1xuICAgICAgICBhbmltYXRpb246IHtcbiAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YXJ0J1xuICAgICAgICB9LFxuICAgICAgICBob3Zlcjoge1xuICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgIGRpc3BsYXk6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsaW5lYXJDaGFydHM6IFsnbGluZScsICdiYXInLCAncmFkYXInXSxcbiAgICAgIGxpbmVhck9wdHM6IHtcbiAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgeUF4ZXM6IFt7XG4gICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICBjYWxsYmFjazogdmFsdWUgPT4gdGhpcy5mb3JtYXROdW1iZXIodmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGNoYXJ0ID0+IHRoaXMuY29uZmlnLmNoYXJ0TGVnZW5kKGNoYXJ0LmRhdGEuZGF0YXNldHMsIHNlbGYpXG4gICAgICB9LFxuICAgICAgZGF5c0FnbzogMjAsXG4gICAgICBtaW5EYXRlOiBtb21lbnQoJzIwMTUtMDctMDEnKS5zdGFydE9mKCdkYXknKSxcbiAgICAgIG1heERhdGU6IG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5JyksXG4gICAgICBzcGVjaWFsUmFuZ2VzOiB7XG4gICAgICAgICdsYXN0LXdlZWsnOiBbbW9tZW50KCkuc3VidHJhY3QoMSwgJ3dlZWsnKS5zdGFydE9mKCd3ZWVrJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICd3ZWVrJykuZW5kT2YoJ3dlZWsnKV0sXG4gICAgICAgICd0aGlzLW1vbnRoJzogW21vbWVudCgpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KDEsICdkYXlzJykuc3RhcnRPZignZGF5JyldLFxuICAgICAgICAnbGFzdC1tb250aCc6IFttb21lbnQoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5zdGFydE9mKCdtb250aCcpLCBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnbW9udGgnKS5lbmRPZignbW9udGgnKV0sXG4gICAgICAgIGxhdGVzdChvZmZzZXQgPSBzZWxmLmNvbmZpZy5kYXlzQWdvKSB7XG4gICAgICAgICAgcmV0dXJuIFttb21lbnQoKS5zdWJ0cmFjdChvZmZzZXQsICdkYXlzJykuc3RhcnRPZignZGF5JyksIHNlbGYuY29uZmlnLm1heERhdGVdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdGltZXN0YW1wRm9ybWF0OiAnWVlZWU1NREQwMCcsXG4gICAgICB2YWxpZFBhcmFtczoge1xuICAgICAgICBhZ2VudDogWydhbGwtYWdlbnRzJywgJ3VzZXInLCAnc3BpZGVyJywgJ2JvdCddLFxuICAgICAgICBwbGF0Zm9ybTogWydhbGwtYWNjZXNzJywgJ2Rlc2t0b3AnLCAnbW9iaWxlLWFwcCcsICdtb2JpbGUtd2ViJ10sXG4gICAgICAgIHByb2plY3Q6IHNpdGVEb21haW5zXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBsaW5lYXJUb29sdGlwcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbW9kZTogJ2xhYmVsJyxcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbDogdG9vbHRpcEl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4odG9vbHRpcEl0ZW0ueUxhYmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuICcgJyArICQuaTE4bigndW5rbm93bicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyAnICsgdGhpcy5mb3JtYXROdW1iZXIodG9vbHRpcEl0ZW0ueUxhYmVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib2R5Rm9udFNpemU6IDE0LFxuICAgICAgYm9keVNwYWNpbmc6IDcsXG4gICAgICBjYXJldFNpemU6IDAsXG4gICAgICB0aXRsZUZvbnRTaXplOiAxNFxuICAgIH07XG4gIH1cblxuICBnZXQgY2lyY3VsYXJUb29sdGlwcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgIGxhYmVsOiAodG9vbHRpcEl0ZW0sIGNoYXJ0SW5zdGFuY2UpID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNoYXJ0SW5zdGFuY2UuZGF0YXNldHNbdG9vbHRpcEl0ZW0uZGF0YXNldEluZGV4XS5kYXRhW3Rvb2x0aXBJdGVtLmluZGV4XSxcbiAgICAgICAgICAgIGxhYmVsID0gY2hhcnRJbnN0YW5jZS5sYWJlbHNbdG9vbHRpcEl0ZW0uaW5kZXhdO1xuXG4gICAgICAgICAgaWYgKE51bWJlci5pc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtsYWJlbH06ICR7JC5pMThuKCd1bmtub3duJyl9YDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke2xhYmVsfTogJHt0aGlzLmZvcm1hdE51bWJlcih2YWx1ZSl9YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBib2R5Rm9udFNpemU6IDE0LFxuICAgICAgYm9keVNwYWNpbmc6IDcsXG4gICAgICBjYXJldFNpemU6IDAsXG4gICAgICB0aXRsZUZvbnRTaXplOiAxNFxuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdkNvbmZpZztcbiIsIi8qKlxuICogQGZpbGUgV01GIFtzaXRlIG1hdHJpeF0oaHR0cHM6Ly93d3cubWVkaWF3aWtpLm9yZy93L2FwaS5waHA/YWN0aW9uPXNpdGVtYXRyaXgpLCB3aXRoIHNvbWUgdW5zdXBwb3J0ZWQgd2lraXMgcmVtb3ZlZFxuICovXG5cbi8qKlxuICogU2l0ZW1hdHJpeCBvZiBhbGwgc3VwcG9ydGVkIFdNRiB3aWtpc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3Qgc2l0ZU1hcCA9IHtcbiAgJ2Fhd2lraSc6ICdhYS53aWtpcGVkaWEub3JnJyxcbiAgJ2Fhd2lrdGlvbmFyeSc6ICdhYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdhYXdpa2lib29rcyc6ICdhYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Fid2lraSc6ICdhYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Fid2lrdGlvbmFyeSc6ICdhYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdhY2V3aWtpJzogJ2FjZS53aWtpcGVkaWEub3JnJyxcbiAgJ2FkeXdpa2knOiAnYWR5Lndpa2lwZWRpYS5vcmcnLFxuICAnYWZ3aWtpJzogJ2FmLndpa2lwZWRpYS5vcmcnLFxuICAnYWZ3aWt0aW9uYXJ5JzogJ2FmLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fmd2lraWJvb2tzJzogJ2FmLndpa2lib29rcy5vcmcnLFxuICAnYWZ3aWtpcXVvdGUnOiAnYWYud2lraXF1b3RlLm9yZycsXG4gICdha3dpa2knOiAnYWsud2lraXBlZGlhLm9yZycsXG4gICdha3dpa3Rpb25hcnknOiAnYWsud2lrdGlvbmFyeS5vcmcnLFxuICAnYWt3aWtpYm9va3MnOiAnYWsud2lraWJvb2tzLm9yZycsXG4gICdhbHN3aWtpJzogJ2Fscy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fsc3dpa3Rpb25hcnknOiAnYWxzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fsc3dpa2lib29rcyc6ICdhbHMud2lraWJvb2tzLm9yZycsXG4gICdhbHN3aWtpcXVvdGUnOiAnYWxzLndpa2lxdW90ZS5vcmcnLFxuICAnYW13aWtpJzogJ2FtLndpa2lwZWRpYS5vcmcnLFxuICAnYW13aWt0aW9uYXJ5JzogJ2FtLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Ftd2lraXF1b3RlJzogJ2FtLndpa2lxdW90ZS5vcmcnLFxuICAnYW53aWtpJzogJ2FuLndpa2lwZWRpYS5vcmcnLFxuICAnYW53aWt0aW9uYXJ5JzogJ2FuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2FuZ3dpa2knOiAnYW5nLndpa2lwZWRpYS5vcmcnLFxuICAnYW5nd2lrdGlvbmFyeSc6ICdhbmcud2lrdGlvbmFyeS5vcmcnLFxuICAnYW5nd2lraWJvb2tzJzogJ2FuZy53aWtpYm9va3Mub3JnJyxcbiAgJ2FuZ3dpa2lxdW90ZSc6ICdhbmcud2lraXF1b3RlLm9yZycsXG4gICdhbmd3aWtpc291cmNlJzogJ2FuZy53aWtpc291cmNlLm9yZycsXG4gICdhcndpa2knOiAnYXIud2lraXBlZGlhLm9yZycsXG4gICdhcndpa3Rpb25hcnknOiAnYXIud2lrdGlvbmFyeS5vcmcnLFxuICAnYXJ3aWtpYm9va3MnOiAnYXIud2lraWJvb2tzLm9yZycsXG4gICdhcndpa2luZXdzJzogJ2FyLndpa2luZXdzLm9yZycsXG4gICdhcndpa2lxdW90ZSc6ICdhci53aWtpcXVvdGUub3JnJyxcbiAgJ2Fyd2lraXNvdXJjZSc6ICdhci53aWtpc291cmNlLm9yZycsXG4gICdhcndpa2l2ZXJzaXR5JzogJ2FyLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdhcmN3aWtpJzogJ2FyYy53aWtpcGVkaWEub3JnJyxcbiAgJ2Fyendpa2knOiAnYXJ6Lndpa2lwZWRpYS5vcmcnLFxuICAnYXN3aWtpJzogJ2FzLndpa2lwZWRpYS5vcmcnLFxuICAnYXN3aWt0aW9uYXJ5JzogJ2FzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Fzd2lraWJvb2tzJzogJ2FzLndpa2lib29rcy5vcmcnLFxuICAnYXN3aWtpc291cmNlJzogJ2FzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2FzdHdpa2knOiAnYXN0Lndpa2lwZWRpYS5vcmcnLFxuICAnYXN0d2lrdGlvbmFyeSc6ICdhc3Qud2lrdGlvbmFyeS5vcmcnLFxuICAnYXN0d2lraWJvb2tzJzogJ2FzdC53aWtpYm9va3Mub3JnJyxcbiAgJ2FzdHdpa2lxdW90ZSc6ICdhc3Qud2lraXF1b3RlLm9yZycsXG4gICdhdndpa2knOiAnYXYud2lraXBlZGlhLm9yZycsXG4gICdhdndpa3Rpb25hcnknOiAnYXYud2lrdGlvbmFyeS5vcmcnLFxuICAnYXl3aWtpJzogJ2F5Lndpa2lwZWRpYS5vcmcnLFxuICAnYXl3aWt0aW9uYXJ5JzogJ2F5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F5d2lraWJvb2tzJzogJ2F5Lndpa2lib29rcy5vcmcnLFxuICAnYXp3aWtpJzogJ2F6Lndpa2lwZWRpYS5vcmcnLFxuICAnYXp3aWt0aW9uYXJ5JzogJ2F6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2F6d2lraWJvb2tzJzogJ2F6Lndpa2lib29rcy5vcmcnLFxuICAnYXp3aWtpcXVvdGUnOiAnYXoud2lraXF1b3RlLm9yZycsXG4gICdhendpa2lzb3VyY2UnOiAnYXoud2lraXNvdXJjZS5vcmcnLFxuICAnYXpid2lraSc6ICdhemIud2lraXBlZGlhLm9yZycsXG4gICdiYXdpa2knOiAnYmEud2lraXBlZGlhLm9yZycsXG4gICdiYXdpa2lib29rcyc6ICdiYS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jhcndpa2knOiAnYmFyLndpa2lwZWRpYS5vcmcnLFxuICAnYmF0X3NtZ3dpa2knOiAnYmF0LXNtZy53aWtpcGVkaWEub3JnJyxcbiAgJ2JjbHdpa2knOiAnYmNsLndpa2lwZWRpYS5vcmcnLFxuICAnYmV3aWtpJzogJ2JlLndpa2lwZWRpYS5vcmcnLFxuICAnYmV3aWt0aW9uYXJ5JzogJ2JlLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jld2lraWJvb2tzJzogJ2JlLndpa2lib29rcy5vcmcnLFxuICAnYmV3aWtpcXVvdGUnOiAnYmUud2lraXF1b3RlLm9yZycsXG4gICdiZXdpa2lzb3VyY2UnOiAnYmUud2lraXNvdXJjZS5vcmcnLFxuICAnYmVfeF9vbGR3aWtpJzogJ2JlLXRhcmFzay53aWtpcGVkaWEub3JnJyxcbiAgJ2Jnd2lraSc6ICdiZy53aWtpcGVkaWEub3JnJyxcbiAgJ2Jnd2lrdGlvbmFyeSc6ICdiZy53aWt0aW9uYXJ5Lm9yZycsXG4gICdiZ3dpa2lib29rcyc6ICdiZy53aWtpYm9va3Mub3JnJyxcbiAgJ2Jnd2lraW5ld3MnOiAnYmcud2lraW5ld3Mub3JnJyxcbiAgJ2Jnd2lraXF1b3RlJzogJ2JnLndpa2lxdW90ZS5vcmcnLFxuICAnYmd3aWtpc291cmNlJzogJ2JnLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jod2lraSc6ICdiaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Jod2lrdGlvbmFyeSc6ICdiaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdiaXdpa2knOiAnYmkud2lraXBlZGlhLm9yZycsXG4gICdiaXdpa3Rpb25hcnknOiAnYmkud2lrdGlvbmFyeS5vcmcnLFxuICAnYml3aWtpYm9va3MnOiAnYmkud2lraWJvb2tzLm9yZycsXG4gICdiam53aWtpJzogJ2Jqbi53aWtpcGVkaWEub3JnJyxcbiAgJ2Jtd2lraSc6ICdibS53aWtpcGVkaWEub3JnJyxcbiAgJ2Jtd2lrdGlvbmFyeSc6ICdibS53aWt0aW9uYXJ5Lm9yZycsXG4gICdibXdpa2lib29rcyc6ICdibS53aWtpYm9va3Mub3JnJyxcbiAgJ2Jtd2lraXF1b3RlJzogJ2JtLndpa2lxdW90ZS5vcmcnLFxuICAnYm53aWtpJzogJ2JuLndpa2lwZWRpYS5vcmcnLFxuICAnYm53aWt0aW9uYXJ5JzogJ2JuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jud2lraWJvb2tzJzogJ2JuLndpa2lib29rcy5vcmcnLFxuICAnYm53aWtpc291cmNlJzogJ2JuLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jvd2lraSc6ICdiby53aWtpcGVkaWEub3JnJyxcbiAgJ2Jvd2lrdGlvbmFyeSc6ICdiby53aWt0aW9uYXJ5Lm9yZycsXG4gICdib3dpa2lib29rcyc6ICdiby53aWtpYm9va3Mub3JnJyxcbiAgJ2JweXdpa2knOiAnYnB5Lndpa2lwZWRpYS5vcmcnLFxuICAnYnJ3aWtpJzogJ2JyLndpa2lwZWRpYS5vcmcnLFxuICAnYnJ3aWt0aW9uYXJ5JzogJ2JyLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Jyd2lraXF1b3RlJzogJ2JyLndpa2lxdW90ZS5vcmcnLFxuICAnYnJ3aWtpc291cmNlJzogJ2JyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Jzd2lraSc6ICdicy53aWtpcGVkaWEub3JnJyxcbiAgJ2Jzd2lrdGlvbmFyeSc6ICdicy53aWt0aW9uYXJ5Lm9yZycsXG4gICdic3dpa2lib29rcyc6ICdicy53aWtpYm9va3Mub3JnJyxcbiAgJ2Jzd2lraW5ld3MnOiAnYnMud2lraW5ld3Mub3JnJyxcbiAgJ2Jzd2lraXF1b3RlJzogJ2JzLndpa2lxdW90ZS5vcmcnLFxuICAnYnN3aWtpc291cmNlJzogJ2JzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2J1Z3dpa2knOiAnYnVnLndpa2lwZWRpYS5vcmcnLFxuICAnYnhyd2lraSc6ICdieHIud2lraXBlZGlhLm9yZycsXG4gICdjYXdpa2knOiAnY2Eud2lraXBlZGlhLm9yZycsXG4gICdjYXdpa3Rpb25hcnknOiAnY2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnY2F3aWtpYm9va3MnOiAnY2Eud2lraWJvb2tzLm9yZycsXG4gICdjYXdpa2luZXdzJzogJ2NhLndpa2luZXdzLm9yZycsXG4gICdjYXdpa2lxdW90ZSc6ICdjYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Nhd2lraXNvdXJjZSc6ICdjYS53aWtpc291cmNlLm9yZycsXG4gICdjYmtfemFtd2lraSc6ICdjYmstemFtLndpa2lwZWRpYS5vcmcnLFxuICAnY2Rvd2lraSc6ICdjZG8ud2lraXBlZGlhLm9yZycsXG4gICdjZXdpa2knOiAnY2Uud2lraXBlZGlhLm9yZycsXG4gICdjZWJ3aWtpJzogJ2NlYi53aWtpcGVkaWEub3JnJyxcbiAgJ2Nod2lraSc6ICdjaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Nod2lrdGlvbmFyeSc6ICdjaC53aWt0aW9uYXJ5Lm9yZycsXG4gICdjaHdpa2lib29rcyc6ICdjaC53aWtpYm9va3Mub3JnJyxcbiAgJ2Nob3dpa2knOiAnY2hvLndpa2lwZWRpYS5vcmcnLFxuICAnY2hyd2lraSc6ICdjaHIud2lraXBlZGlhLm9yZycsXG4gICdjaHJ3aWt0aW9uYXJ5JzogJ2Noci53aWt0aW9uYXJ5Lm9yZycsXG4gICdjaHl3aWtpJzogJ2NoeS53aWtpcGVkaWEub3JnJyxcbiAgJ2NrYndpa2knOiAnY2tiLndpa2lwZWRpYS5vcmcnLFxuICAnY293aWtpJzogJ2NvLndpa2lwZWRpYS5vcmcnLFxuICAnY293aWt0aW9uYXJ5JzogJ2NvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Nvd2lraWJvb2tzJzogJ2NvLndpa2lib29rcy5vcmcnLFxuICAnY293aWtpcXVvdGUnOiAnY28ud2lraXF1b3RlLm9yZycsXG4gICdjcndpa2knOiAnY3Iud2lraXBlZGlhLm9yZycsXG4gICdjcndpa3Rpb25hcnknOiAnY3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnY3J3aWtpcXVvdGUnOiAnY3Iud2lraXF1b3RlLm9yZycsXG4gICdjcmh3aWtpJzogJ2NyaC53aWtpcGVkaWEub3JnJyxcbiAgJ2Nzd2lraSc6ICdjcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Nzd2lrdGlvbmFyeSc6ICdjcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdjc3dpa2lib29rcyc6ICdjcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Nzd2lraW5ld3MnOiAnY3Mud2lraW5ld3Mub3JnJyxcbiAgJ2Nzd2lraXF1b3RlJzogJ2NzLndpa2lxdW90ZS5vcmcnLFxuICAnY3N3aWtpc291cmNlJzogJ2NzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Nzd2lraXZlcnNpdHknOiAnY3Mud2lraXZlcnNpdHkub3JnJyxcbiAgJ2NzYndpa2knOiAnY3NiLndpa2lwZWRpYS5vcmcnLFxuICAnY3Nid2lrdGlvbmFyeSc6ICdjc2Iud2lrdGlvbmFyeS5vcmcnLFxuICAnY3V3aWtpJzogJ2N1Lndpa2lwZWRpYS5vcmcnLFxuICAnY3Z3aWtpJzogJ2N2Lndpa2lwZWRpYS5vcmcnLFxuICAnY3Z3aWtpYm9va3MnOiAnY3Yud2lraWJvb2tzLm9yZycsXG4gICdjeXdpa2knOiAnY3kud2lraXBlZGlhLm9yZycsXG4gICdjeXdpa3Rpb25hcnknOiAnY3kud2lrdGlvbmFyeS5vcmcnLFxuICAnY3l3aWtpYm9va3MnOiAnY3kud2lraWJvb2tzLm9yZycsXG4gICdjeXdpa2lxdW90ZSc6ICdjeS53aWtpcXVvdGUub3JnJyxcbiAgJ2N5d2lraXNvdXJjZSc6ICdjeS53aWtpc291cmNlLm9yZycsXG4gICdkYXdpa2knOiAnZGEud2lraXBlZGlhLm9yZycsXG4gICdkYXdpa3Rpb25hcnknOiAnZGEud2lrdGlvbmFyeS5vcmcnLFxuICAnZGF3aWtpYm9va3MnOiAnZGEud2lraWJvb2tzLm9yZycsXG4gICdkYXdpa2lxdW90ZSc6ICdkYS53aWtpcXVvdGUub3JnJyxcbiAgJ2Rhd2lraXNvdXJjZSc6ICdkYS53aWtpc291cmNlLm9yZycsXG4gICdkZXdpa2knOiAnZGUud2lraXBlZGlhLm9yZycsXG4gICdkZXdpa3Rpb25hcnknOiAnZGUud2lrdGlvbmFyeS5vcmcnLFxuICAnZGV3aWtpYm9va3MnOiAnZGUud2lraWJvb2tzLm9yZycsXG4gICdkZXdpa2luZXdzJzogJ2RlLndpa2luZXdzLm9yZycsXG4gICdkZXdpa2lxdW90ZSc6ICdkZS53aWtpcXVvdGUub3JnJyxcbiAgJ2Rld2lraXNvdXJjZSc6ICdkZS53aWtpc291cmNlLm9yZycsXG4gICdkZXdpa2l2ZXJzaXR5JzogJ2RlLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdkZXdpa2l2b3lhZ2UnOiAnZGUud2lraXZveWFnZS5vcmcnLFxuICAnZGlxd2lraSc6ICdkaXEud2lraXBlZGlhLm9yZycsXG4gICdkc2J3aWtpJzogJ2RzYi53aWtpcGVkaWEub3JnJyxcbiAgJ2R2d2lraSc6ICdkdi53aWtpcGVkaWEub3JnJyxcbiAgJ2R2d2lrdGlvbmFyeSc6ICdkdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdkendpa2knOiAnZHoud2lraXBlZGlhLm9yZycsXG4gICdkendpa3Rpb25hcnknOiAnZHoud2lrdGlvbmFyeS5vcmcnLFxuICAnZWV3aWtpJzogJ2VlLndpa2lwZWRpYS5vcmcnLFxuICAnZWx3aWtpJzogJ2VsLndpa2lwZWRpYS5vcmcnLFxuICAnZWx3aWt0aW9uYXJ5JzogJ2VsLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vsd2lraWJvb2tzJzogJ2VsLndpa2lib29rcy5vcmcnLFxuICAnZWx3aWtpbmV3cyc6ICdlbC53aWtpbmV3cy5vcmcnLFxuICAnZWx3aWtpcXVvdGUnOiAnZWwud2lraXF1b3RlLm9yZycsXG4gICdlbHdpa2lzb3VyY2UnOiAnZWwud2lraXNvdXJjZS5vcmcnLFxuICAnZWx3aWtpdmVyc2l0eSc6ICdlbC53aWtpdmVyc2l0eS5vcmcnLFxuICAnZWx3aWtpdm95YWdlJzogJ2VsLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2VtbHdpa2knOiAnZW1sLndpa2lwZWRpYS5vcmcnLFxuICAnZW53aWtpJzogJ2VuLndpa2lwZWRpYS5vcmcnLFxuICAnZW53aWt0aW9uYXJ5JzogJ2VuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Vud2lraWJvb2tzJzogJ2VuLndpa2lib29rcy5vcmcnLFxuICAnZW53aWtpbmV3cyc6ICdlbi53aWtpbmV3cy5vcmcnLFxuICAnZW53aWtpcXVvdGUnOiAnZW4ud2lraXF1b3RlLm9yZycsXG4gICdlbndpa2lzb3VyY2UnOiAnZW4ud2lraXNvdXJjZS5vcmcnLFxuICAnZW53aWtpdmVyc2l0eSc6ICdlbi53aWtpdmVyc2l0eS5vcmcnLFxuICAnZW53aWtpdm95YWdlJzogJ2VuLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2Vvd2lraSc6ICdlby53aWtpcGVkaWEub3JnJyxcbiAgJ2Vvd2lrdGlvbmFyeSc6ICdlby53aWt0aW9uYXJ5Lm9yZycsXG4gICdlb3dpa2lib29rcyc6ICdlby53aWtpYm9va3Mub3JnJyxcbiAgJ2Vvd2lraW5ld3MnOiAnZW8ud2lraW5ld3Mub3JnJyxcbiAgJ2Vvd2lraXF1b3RlJzogJ2VvLndpa2lxdW90ZS5vcmcnLFxuICAnZW93aWtpc291cmNlJzogJ2VvLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vzd2lraSc6ICdlcy53aWtpcGVkaWEub3JnJyxcbiAgJ2Vzd2lrdGlvbmFyeSc6ICdlcy53aWt0aW9uYXJ5Lm9yZycsXG4gICdlc3dpa2lib29rcyc6ICdlcy53aWtpYm9va3Mub3JnJyxcbiAgJ2Vzd2lraW5ld3MnOiAnZXMud2lraW5ld3Mub3JnJyxcbiAgJ2Vzd2lraXF1b3RlJzogJ2VzLndpa2lxdW90ZS5vcmcnLFxuICAnZXN3aWtpc291cmNlJzogJ2VzLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Vzd2lraXZlcnNpdHknOiAnZXMud2lraXZlcnNpdHkub3JnJyxcbiAgJ2Vzd2lraXZveWFnZSc6ICdlcy53aWtpdm95YWdlLm9yZycsXG4gICdldHdpa2knOiAnZXQud2lraXBlZGlhLm9yZycsXG4gICdldHdpa3Rpb25hcnknOiAnZXQud2lrdGlvbmFyeS5vcmcnLFxuICAnZXR3aWtpYm9va3MnOiAnZXQud2lraWJvb2tzLm9yZycsXG4gICdldHdpa2lxdW90ZSc6ICdldC53aWtpcXVvdGUub3JnJyxcbiAgJ2V0d2lraXNvdXJjZSc6ICdldC53aWtpc291cmNlLm9yZycsXG4gICdldXdpa2knOiAnZXUud2lraXBlZGlhLm9yZycsXG4gICdldXdpa3Rpb25hcnknOiAnZXUud2lrdGlvbmFyeS5vcmcnLFxuICAnZXV3aWtpYm9va3MnOiAnZXUud2lraWJvb2tzLm9yZycsXG4gICdldXdpa2lxdW90ZSc6ICdldS53aWtpcXVvdGUub3JnJyxcbiAgJ2V4dHdpa2knOiAnZXh0Lndpa2lwZWRpYS5vcmcnLFxuICAnZmF3aWtpJzogJ2ZhLndpa2lwZWRpYS5vcmcnLFxuICAnZmF3aWt0aW9uYXJ5JzogJ2ZhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zhd2lraWJvb2tzJzogJ2ZhLndpa2lib29rcy5vcmcnLFxuICAnZmF3aWtpbmV3cyc6ICdmYS53aWtpbmV3cy5vcmcnLFxuICAnZmF3aWtpcXVvdGUnOiAnZmEud2lraXF1b3RlLm9yZycsXG4gICdmYXdpa2lzb3VyY2UnOiAnZmEud2lraXNvdXJjZS5vcmcnLFxuICAnZmF3aWtpdm95YWdlJzogJ2ZhLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ2Zmd2lraSc6ICdmZi53aWtpcGVkaWEub3JnJyxcbiAgJ2Zpd2lraSc6ICdmaS53aWtpcGVkaWEub3JnJyxcbiAgJ2Zpd2lrdGlvbmFyeSc6ICdmaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdmaXdpa2lib29rcyc6ICdmaS53aWtpYm9va3Mub3JnJyxcbiAgJ2Zpd2lraW5ld3MnOiAnZmkud2lraW5ld3Mub3JnJyxcbiAgJ2Zpd2lraXF1b3RlJzogJ2ZpLndpa2lxdW90ZS5vcmcnLFxuICAnZml3aWtpc291cmNlJzogJ2ZpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2Zpd2lraXZlcnNpdHknOiAnZmkud2lraXZlcnNpdHkub3JnJyxcbiAgJ2ZpdV92cm93aWtpJzogJ2ZpdS12cm8ud2lraXBlZGlhLm9yZycsXG4gICdmandpa2knOiAnZmoud2lraXBlZGlhLm9yZycsXG4gICdmandpa3Rpb25hcnknOiAnZmoud2lrdGlvbmFyeS5vcmcnLFxuICAnZm93aWtpJzogJ2ZvLndpa2lwZWRpYS5vcmcnLFxuICAnZm93aWt0aW9uYXJ5JzogJ2ZvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2Zvd2lraXNvdXJjZSc6ICdmby53aWtpc291cmNlLm9yZycsXG4gICdmcndpa2knOiAnZnIud2lraXBlZGlhLm9yZycsXG4gICdmcndpa3Rpb25hcnknOiAnZnIud2lrdGlvbmFyeS5vcmcnLFxuICAnZnJ3aWtpYm9va3MnOiAnZnIud2lraWJvb2tzLm9yZycsXG4gICdmcndpa2luZXdzJzogJ2ZyLndpa2luZXdzLm9yZycsXG4gICdmcndpa2lxdW90ZSc6ICdmci53aWtpcXVvdGUub3JnJyxcbiAgJ2Zyd2lraXNvdXJjZSc6ICdmci53aWtpc291cmNlLm9yZycsXG4gICdmcndpa2l2ZXJzaXR5JzogJ2ZyLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdmcndpa2l2b3lhZ2UnOiAnZnIud2lraXZveWFnZS5vcmcnLFxuICAnZnJwd2lraSc6ICdmcnAud2lraXBlZGlhLm9yZycsXG4gICdmcnJ3aWtpJzogJ2Zyci53aWtpcGVkaWEub3JnJyxcbiAgJ2Z1cndpa2knOiAnZnVyLndpa2lwZWRpYS5vcmcnLFxuICAnZnl3aWtpJzogJ2Z5Lndpa2lwZWRpYS5vcmcnLFxuICAnZnl3aWt0aW9uYXJ5JzogJ2Z5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2Z5d2lraWJvb2tzJzogJ2Z5Lndpa2lib29rcy5vcmcnLFxuICAnZ2F3aWtpJzogJ2dhLndpa2lwZWRpYS5vcmcnLFxuICAnZ2F3aWt0aW9uYXJ5JzogJ2dhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dhd2lraWJvb2tzJzogJ2dhLndpa2lib29rcy5vcmcnLFxuICAnZ2F3aWtpcXVvdGUnOiAnZ2Eud2lraXF1b3RlLm9yZycsXG4gICdnYWd3aWtpJzogJ2dhZy53aWtpcGVkaWEub3JnJyxcbiAgJ2dhbndpa2knOiAnZ2FuLndpa2lwZWRpYS5vcmcnLFxuICAnZ2R3aWtpJzogJ2dkLndpa2lwZWRpYS5vcmcnLFxuICAnZ2R3aWt0aW9uYXJ5JzogJ2dkLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dsd2lraSc6ICdnbC53aWtpcGVkaWEub3JnJyxcbiAgJ2dsd2lrdGlvbmFyeSc6ICdnbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdnbHdpa2lib29rcyc6ICdnbC53aWtpYm9va3Mub3JnJyxcbiAgJ2dsd2lraXF1b3RlJzogJ2dsLndpa2lxdW90ZS5vcmcnLFxuICAnZ2x3aWtpc291cmNlJzogJ2dsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2dsa3dpa2knOiAnZ2xrLndpa2lwZWRpYS5vcmcnLFxuICAnZ253aWtpJzogJ2duLndpa2lwZWRpYS5vcmcnLFxuICAnZ253aWt0aW9uYXJ5JzogJ2duLndpa3Rpb25hcnkub3JnJyxcbiAgJ2dud2lraWJvb2tzJzogJ2duLndpa2lib29rcy5vcmcnLFxuICAnZ29td2lraSc6ICdnb20ud2lraXBlZGlhLm9yZycsXG4gICdnb3R3aWtpJzogJ2dvdC53aWtpcGVkaWEub3JnJyxcbiAgJ2dvdHdpa2lib29rcyc6ICdnb3Qud2lraWJvb2tzLm9yZycsXG4gICdndXdpa2knOiAnZ3Uud2lraXBlZGlhLm9yZycsXG4gICdndXdpa3Rpb25hcnknOiAnZ3Uud2lrdGlvbmFyeS5vcmcnLFxuICAnZ3V3aWtpYm9va3MnOiAnZ3Uud2lraWJvb2tzLm9yZycsXG4gICdndXdpa2lxdW90ZSc6ICdndS53aWtpcXVvdGUub3JnJyxcbiAgJ2d1d2lraXNvdXJjZSc6ICdndS53aWtpc291cmNlLm9yZycsXG4gICdndndpa2knOiAnZ3Yud2lraXBlZGlhLm9yZycsXG4gICdndndpa3Rpb25hcnknOiAnZ3Yud2lrdGlvbmFyeS5vcmcnLFxuICAnaGF3aWtpJzogJ2hhLndpa2lwZWRpYS5vcmcnLFxuICAnaGF3aWt0aW9uYXJ5JzogJ2hhLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hha3dpa2knOiAnaGFrLndpa2lwZWRpYS5vcmcnLFxuICAnaGF3d2lraSc6ICdoYXcud2lraXBlZGlhLm9yZycsXG4gICdoZXdpa2knOiAnaGUud2lraXBlZGlhLm9yZycsXG4gICdoZXdpa3Rpb25hcnknOiAnaGUud2lrdGlvbmFyeS5vcmcnLFxuICAnaGV3aWtpYm9va3MnOiAnaGUud2lraWJvb2tzLm9yZycsXG4gICdoZXdpa2luZXdzJzogJ2hlLndpa2luZXdzLm9yZycsXG4gICdoZXdpa2lxdW90ZSc6ICdoZS53aWtpcXVvdGUub3JnJyxcbiAgJ2hld2lraXNvdXJjZSc6ICdoZS53aWtpc291cmNlLm9yZycsXG4gICdoZXdpa2l2b3lhZ2UnOiAnaGUud2lraXZveWFnZS5vcmcnLFxuICAnaGl3aWtpJzogJ2hpLndpa2lwZWRpYS5vcmcnLFxuICAnaGl3aWt0aW9uYXJ5JzogJ2hpLndpa3Rpb25hcnkub3JnJyxcbiAgJ2hpd2lraWJvb2tzJzogJ2hpLndpa2lib29rcy5vcmcnLFxuICAnaGl3aWtpcXVvdGUnOiAnaGkud2lraXF1b3RlLm9yZycsXG4gICdoaWZ3aWtpJzogJ2hpZi53aWtpcGVkaWEub3JnJyxcbiAgJ2hvd2lraSc6ICdoby53aWtpcGVkaWEub3JnJyxcbiAgJ2hyd2lraSc6ICdoci53aWtpcGVkaWEub3JnJyxcbiAgJ2hyd2lrdGlvbmFyeSc6ICdoci53aWt0aW9uYXJ5Lm9yZycsXG4gICdocndpa2lib29rcyc6ICdoci53aWtpYm9va3Mub3JnJyxcbiAgJ2hyd2lraXF1b3RlJzogJ2hyLndpa2lxdW90ZS5vcmcnLFxuICAnaHJ3aWtpc291cmNlJzogJ2hyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2hzYndpa2knOiAnaHNiLndpa2lwZWRpYS5vcmcnLFxuICAnaHNid2lrdGlvbmFyeSc6ICdoc2Iud2lrdGlvbmFyeS5vcmcnLFxuICAnaHR3aWtpJzogJ2h0Lndpa2lwZWRpYS5vcmcnLFxuICAnaHR3aWtpc291cmNlJzogJ2h0Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h1d2lraSc6ICdodS53aWtpcGVkaWEub3JnJyxcbiAgJ2h1d2lrdGlvbmFyeSc6ICdodS53aWt0aW9uYXJ5Lm9yZycsXG4gICdodXdpa2lib29rcyc6ICdodS53aWtpYm9va3Mub3JnJyxcbiAgJ2h1d2lraW5ld3MnOiAnaHUud2lraW5ld3Mub3JnJyxcbiAgJ2h1d2lraXF1b3RlJzogJ2h1Lndpa2lxdW90ZS5vcmcnLFxuICAnaHV3aWtpc291cmNlJzogJ2h1Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h5d2lraSc6ICdoeS53aWtpcGVkaWEub3JnJyxcbiAgJ2h5d2lrdGlvbmFyeSc6ICdoeS53aWt0aW9uYXJ5Lm9yZycsXG4gICdoeXdpa2lib29rcyc6ICdoeS53aWtpYm9va3Mub3JnJyxcbiAgJ2h5d2lraXF1b3RlJzogJ2h5Lndpa2lxdW90ZS5vcmcnLFxuICAnaHl3aWtpc291cmNlJzogJ2h5Lndpa2lzb3VyY2Uub3JnJyxcbiAgJ2h6d2lraSc6ICdoei53aWtpcGVkaWEub3JnJyxcbiAgJ2lhd2lraSc6ICdpYS53aWtpcGVkaWEub3JnJyxcbiAgJ2lhd2lrdGlvbmFyeSc6ICdpYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdpYXdpa2lib29rcyc6ICdpYS53aWtpYm9va3Mub3JnJyxcbiAgJ2lkd2lraSc6ICdpZC53aWtpcGVkaWEub3JnJyxcbiAgJ2lkd2lrdGlvbmFyeSc6ICdpZC53aWt0aW9uYXJ5Lm9yZycsXG4gICdpZHdpa2lib29rcyc6ICdpZC53aWtpYm9va3Mub3JnJyxcbiAgJ2lkd2lraXF1b3RlJzogJ2lkLndpa2lxdW90ZS5vcmcnLFxuICAnaWR3aWtpc291cmNlJzogJ2lkLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2lld2lraSc6ICdpZS53aWtpcGVkaWEub3JnJyxcbiAgJ2lld2lrdGlvbmFyeSc6ICdpZS53aWt0aW9uYXJ5Lm9yZycsXG4gICdpZXdpa2lib29rcyc6ICdpZS53aWtpYm9va3Mub3JnJyxcbiAgJ2lnd2lraSc6ICdpZy53aWtpcGVkaWEub3JnJyxcbiAgJ2lpd2lraSc6ICdpaS53aWtpcGVkaWEub3JnJyxcbiAgJ2lrd2lraSc6ICdpay53aWtpcGVkaWEub3JnJyxcbiAgJ2lrd2lrdGlvbmFyeSc6ICdpay53aWt0aW9uYXJ5Lm9yZycsXG4gICdpbG93aWtpJzogJ2lsby53aWtpcGVkaWEub3JnJyxcbiAgJ2lvd2lraSc6ICdpby53aWtpcGVkaWEub3JnJyxcbiAgJ2lvd2lrdGlvbmFyeSc6ICdpby53aWt0aW9uYXJ5Lm9yZycsXG4gICdpc3dpa2knOiAnaXMud2lraXBlZGlhLm9yZycsXG4gICdpc3dpa3Rpb25hcnknOiAnaXMud2lrdGlvbmFyeS5vcmcnLFxuICAnaXN3aWtpYm9va3MnOiAnaXMud2lraWJvb2tzLm9yZycsXG4gICdpc3dpa2lxdW90ZSc6ICdpcy53aWtpcXVvdGUub3JnJyxcbiAgJ2lzd2lraXNvdXJjZSc6ICdpcy53aWtpc291cmNlLm9yZycsXG4gICdpdHdpa2knOiAnaXQud2lraXBlZGlhLm9yZycsXG4gICdpdHdpa3Rpb25hcnknOiAnaXQud2lrdGlvbmFyeS5vcmcnLFxuICAnaXR3aWtpYm9va3MnOiAnaXQud2lraWJvb2tzLm9yZycsXG4gICdpdHdpa2luZXdzJzogJ2l0Lndpa2luZXdzLm9yZycsXG4gICdpdHdpa2lxdW90ZSc6ICdpdC53aWtpcXVvdGUub3JnJyxcbiAgJ2l0d2lraXNvdXJjZSc6ICdpdC53aWtpc291cmNlLm9yZycsXG4gICdpdHdpa2l2ZXJzaXR5JzogJ2l0Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdpdHdpa2l2b3lhZ2UnOiAnaXQud2lraXZveWFnZS5vcmcnLFxuICAnaXV3aWtpJzogJ2l1Lndpa2lwZWRpYS5vcmcnLFxuICAnaXV3aWt0aW9uYXJ5JzogJ2l1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2phd2lraSc6ICdqYS53aWtpcGVkaWEub3JnJyxcbiAgJ2phd2lrdGlvbmFyeSc6ICdqYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdqYXdpa2lib29rcyc6ICdqYS53aWtpYm9va3Mub3JnJyxcbiAgJ2phd2lraW5ld3MnOiAnamEud2lraW5ld3Mub3JnJyxcbiAgJ2phd2lraXF1b3RlJzogJ2phLndpa2lxdW90ZS5vcmcnLFxuICAnamF3aWtpc291cmNlJzogJ2phLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2phd2lraXZlcnNpdHknOiAnamEud2lraXZlcnNpdHkub3JnJyxcbiAgJ2pib3dpa2knOiAnamJvLndpa2lwZWRpYS5vcmcnLFxuICAnamJvd2lrdGlvbmFyeSc6ICdqYm8ud2lrdGlvbmFyeS5vcmcnLFxuICAnanZ3aWtpJzogJ2p2Lndpa2lwZWRpYS5vcmcnLFxuICAnanZ3aWt0aW9uYXJ5JzogJ2p2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2thd2lraSc6ICdrYS53aWtpcGVkaWEub3JnJyxcbiAgJ2thd2lrdGlvbmFyeSc6ICdrYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrYXdpa2lib29rcyc6ICdrYS53aWtpYm9va3Mub3JnJyxcbiAgJ2thd2lraXF1b3RlJzogJ2thLndpa2lxdW90ZS5vcmcnLFxuICAna2Fhd2lraSc6ICdrYWEud2lraXBlZGlhLm9yZycsXG4gICdrYWJ3aWtpJzogJ2thYi53aWtpcGVkaWEub3JnJyxcbiAgJ2tiZHdpa2knOiAna2JkLndpa2lwZWRpYS5vcmcnLFxuICAna2d3aWtpJzogJ2tnLndpa2lwZWRpYS5vcmcnLFxuICAna2l3aWtpJzogJ2tpLndpa2lwZWRpYS5vcmcnLFxuICAna2p3aWtpJzogJ2tqLndpa2lwZWRpYS5vcmcnLFxuICAna2t3aWtpJzogJ2trLndpa2lwZWRpYS5vcmcnLFxuICAna2t3aWt0aW9uYXJ5JzogJ2trLndpa3Rpb25hcnkub3JnJyxcbiAgJ2trd2lraWJvb2tzJzogJ2trLndpa2lib29rcy5vcmcnLFxuICAna2t3aWtpcXVvdGUnOiAna2sud2lraXF1b3RlLm9yZycsXG4gICdrbHdpa2knOiAna2wud2lraXBlZGlhLm9yZycsXG4gICdrbHdpa3Rpb25hcnknOiAna2wud2lrdGlvbmFyeS5vcmcnLFxuICAna213aWtpJzogJ2ttLndpa2lwZWRpYS5vcmcnLFxuICAna213aWt0aW9uYXJ5JzogJ2ttLndpa3Rpb25hcnkub3JnJyxcbiAgJ2ttd2lraWJvb2tzJzogJ2ttLndpa2lib29rcy5vcmcnLFxuICAna253aWtpJzogJ2tuLndpa2lwZWRpYS5vcmcnLFxuICAna253aWt0aW9uYXJ5JzogJ2tuLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tud2lraWJvb2tzJzogJ2tuLndpa2lib29rcy5vcmcnLFxuICAna253aWtpcXVvdGUnOiAna24ud2lraXF1b3RlLm9yZycsXG4gICdrbndpa2lzb3VyY2UnOiAna24ud2lraXNvdXJjZS5vcmcnLFxuICAna293aWtpJzogJ2tvLndpa2lwZWRpYS5vcmcnLFxuICAna293aWt0aW9uYXJ5JzogJ2tvLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tvd2lraWJvb2tzJzogJ2tvLndpa2lib29rcy5vcmcnLFxuICAna293aWtpbmV3cyc6ICdrby53aWtpbmV3cy5vcmcnLFxuICAna293aWtpcXVvdGUnOiAna28ud2lraXF1b3RlLm9yZycsXG4gICdrb3dpa2lzb3VyY2UnOiAna28ud2lraXNvdXJjZS5vcmcnLFxuICAna293aWtpdmVyc2l0eSc6ICdrby53aWtpdmVyc2l0eS5vcmcnLFxuICAna29pd2lraSc6ICdrb2kud2lraXBlZGlhLm9yZycsXG4gICdrcndpa2knOiAna3Iud2lraXBlZGlhLm9yZycsXG4gICdrcndpa2lxdW90ZSc6ICdrci53aWtpcXVvdGUub3JnJyxcbiAgJ2tyY3dpa2knOiAna3JjLndpa2lwZWRpYS5vcmcnLFxuICAna3N3aWtpJzogJ2tzLndpa2lwZWRpYS5vcmcnLFxuICAna3N3aWt0aW9uYXJ5JzogJ2tzLndpa3Rpb25hcnkub3JnJyxcbiAgJ2tzd2lraWJvb2tzJzogJ2tzLndpa2lib29rcy5vcmcnLFxuICAna3N3aWtpcXVvdGUnOiAna3Mud2lraXF1b3RlLm9yZycsXG4gICdrc2h3aWtpJzogJ2tzaC53aWtpcGVkaWEub3JnJyxcbiAgJ2t1d2lraSc6ICdrdS53aWtpcGVkaWEub3JnJyxcbiAgJ2t1d2lrdGlvbmFyeSc6ICdrdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdrdXdpa2lib29rcyc6ICdrdS53aWtpYm9va3Mub3JnJyxcbiAgJ2t1d2lraXF1b3RlJzogJ2t1Lndpa2lxdW90ZS5vcmcnLFxuICAna3Z3aWtpJzogJ2t2Lndpa2lwZWRpYS5vcmcnLFxuICAna3d3aWtpJzogJ2t3Lndpa2lwZWRpYS5vcmcnLFxuICAna3d3aWt0aW9uYXJ5JzogJ2t3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t3d2lraXF1b3RlJzogJ2t3Lndpa2lxdW90ZS5vcmcnLFxuICAna3l3aWtpJzogJ2t5Lndpa2lwZWRpYS5vcmcnLFxuICAna3l3aWt0aW9uYXJ5JzogJ2t5Lndpa3Rpb25hcnkub3JnJyxcbiAgJ2t5d2lraWJvb2tzJzogJ2t5Lndpa2lib29rcy5vcmcnLFxuICAna3l3aWtpcXVvdGUnOiAna3kud2lraXF1b3RlLm9yZycsXG4gICdsYXdpa2knOiAnbGEud2lraXBlZGlhLm9yZycsXG4gICdsYXdpa3Rpb25hcnknOiAnbGEud2lrdGlvbmFyeS5vcmcnLFxuICAnbGF3aWtpYm9va3MnOiAnbGEud2lraWJvb2tzLm9yZycsXG4gICdsYXdpa2lxdW90ZSc6ICdsYS53aWtpcXVvdGUub3JnJyxcbiAgJ2xhd2lraXNvdXJjZSc6ICdsYS53aWtpc291cmNlLm9yZycsXG4gICdsYWR3aWtpJzogJ2xhZC53aWtpcGVkaWEub3JnJyxcbiAgJ2xid2lraSc6ICdsYi53aWtpcGVkaWEub3JnJyxcbiAgJ2xid2lrdGlvbmFyeSc6ICdsYi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsYndpa2lib29rcyc6ICdsYi53aWtpYm9va3Mub3JnJyxcbiAgJ2xid2lraXF1b3RlJzogJ2xiLndpa2lxdW90ZS5vcmcnLFxuICAnbGJld2lraSc6ICdsYmUud2lraXBlZGlhLm9yZycsXG4gICdsZXp3aWtpJzogJ2xlei53aWtpcGVkaWEub3JnJyxcbiAgJ2xnd2lraSc6ICdsZy53aWtpcGVkaWEub3JnJyxcbiAgJ2xpd2lraSc6ICdsaS53aWtpcGVkaWEub3JnJyxcbiAgJ2xpd2lrdGlvbmFyeSc6ICdsaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdsaXdpa2lib29rcyc6ICdsaS53aWtpYm9va3Mub3JnJyxcbiAgJ2xpd2lraXF1b3RlJzogJ2xpLndpa2lxdW90ZS5vcmcnLFxuICAnbGl3aWtpc291cmNlJzogJ2xpLndpa2lzb3VyY2Uub3JnJyxcbiAgJ2xpandpa2knOiAnbGlqLndpa2lwZWRpYS5vcmcnLFxuICAnbG1vd2lraSc6ICdsbW8ud2lraXBlZGlhLm9yZycsXG4gICdsbndpa2knOiAnbG4ud2lraXBlZGlhLm9yZycsXG4gICdsbndpa3Rpb25hcnknOiAnbG4ud2lrdGlvbmFyeS5vcmcnLFxuICAnbG53aWtpYm9va3MnOiAnbG4ud2lraWJvb2tzLm9yZycsXG4gICdsb3dpa2knOiAnbG8ud2lraXBlZGlhLm9yZycsXG4gICdsb3dpa3Rpb25hcnknOiAnbG8ud2lrdGlvbmFyeS5vcmcnLFxuICAnbHJjd2lraSc6ICdscmMud2lraXBlZGlhLm9yZycsXG4gICdsdHdpa2knOiAnbHQud2lraXBlZGlhLm9yZycsXG4gICdsdHdpa3Rpb25hcnknOiAnbHQud2lrdGlvbmFyeS5vcmcnLFxuICAnbHR3aWtpYm9va3MnOiAnbHQud2lraWJvb2tzLm9yZycsXG4gICdsdHdpa2lxdW90ZSc6ICdsdC53aWtpcXVvdGUub3JnJyxcbiAgJ2x0d2lraXNvdXJjZSc6ICdsdC53aWtpc291cmNlLm9yZycsXG4gICdsdGd3aWtpJzogJ2x0Zy53aWtpcGVkaWEub3JnJyxcbiAgJ2x2d2lraSc6ICdsdi53aWtpcGVkaWEub3JnJyxcbiAgJ2x2d2lrdGlvbmFyeSc6ICdsdi53aWt0aW9uYXJ5Lm9yZycsXG4gICdsdndpa2lib29rcyc6ICdsdi53aWtpYm9va3Mub3JnJyxcbiAgJ21haXdpa2knOiAnbWFpLndpa2lwZWRpYS5vcmcnLFxuICAnbWFwX2Jtc3dpa2knOiAnbWFwLWJtcy53aWtpcGVkaWEub3JnJyxcbiAgJ21kZndpa2knOiAnbWRmLndpa2lwZWRpYS5vcmcnLFxuICAnbWd3aWtpJzogJ21nLndpa2lwZWRpYS5vcmcnLFxuICAnbWd3aWt0aW9uYXJ5JzogJ21nLndpa3Rpb25hcnkub3JnJyxcbiAgJ21nd2lraWJvb2tzJzogJ21nLndpa2lib29rcy5vcmcnLFxuICAnbWh3aWtpJzogJ21oLndpa2lwZWRpYS5vcmcnLFxuICAnbWh3aWt0aW9uYXJ5JzogJ21oLndpa3Rpb25hcnkub3JnJyxcbiAgJ21ocndpa2knOiAnbWhyLndpa2lwZWRpYS5vcmcnLFxuICAnbWl3aWtpJzogJ21pLndpa2lwZWRpYS5vcmcnLFxuICAnbWl3aWt0aW9uYXJ5JzogJ21pLndpa3Rpb25hcnkub3JnJyxcbiAgJ21pd2lraWJvb2tzJzogJ21pLndpa2lib29rcy5vcmcnLFxuICAnbWlud2lraSc6ICdtaW4ud2lraXBlZGlhLm9yZycsXG4gICdta3dpa2knOiAnbWsud2lraXBlZGlhLm9yZycsXG4gICdta3dpa3Rpb25hcnknOiAnbWsud2lrdGlvbmFyeS5vcmcnLFxuICAnbWt3aWtpYm9va3MnOiAnbWsud2lraWJvb2tzLm9yZycsXG4gICdta3dpa2lzb3VyY2UnOiAnbWsud2lraXNvdXJjZS5vcmcnLFxuICAnbWx3aWtpJzogJ21sLndpa2lwZWRpYS5vcmcnLFxuICAnbWx3aWt0aW9uYXJ5JzogJ21sLndpa3Rpb25hcnkub3JnJyxcbiAgJ21sd2lraWJvb2tzJzogJ21sLndpa2lib29rcy5vcmcnLFxuICAnbWx3aWtpcXVvdGUnOiAnbWwud2lraXF1b3RlLm9yZycsXG4gICdtbHdpa2lzb3VyY2UnOiAnbWwud2lraXNvdXJjZS5vcmcnLFxuICAnbW53aWtpJzogJ21uLndpa2lwZWRpYS5vcmcnLFxuICAnbW53aWt0aW9uYXJ5JzogJ21uLndpa3Rpb25hcnkub3JnJyxcbiAgJ21ud2lraWJvb2tzJzogJ21uLndpa2lib29rcy5vcmcnLFxuICAnbW93aWtpJzogJ21vLndpa2lwZWRpYS5vcmcnLFxuICAnbW93aWt0aW9uYXJ5JzogJ21vLndpa3Rpb25hcnkub3JnJyxcbiAgJ21yd2lraSc6ICdtci53aWtpcGVkaWEub3JnJyxcbiAgJ21yd2lrdGlvbmFyeSc6ICdtci53aWt0aW9uYXJ5Lm9yZycsXG4gICdtcndpa2lib29rcyc6ICdtci53aWtpYm9va3Mub3JnJyxcbiAgJ21yd2lraXF1b3RlJzogJ21yLndpa2lxdW90ZS5vcmcnLFxuICAnbXJ3aWtpc291cmNlJzogJ21yLndpa2lzb3VyY2Uub3JnJyxcbiAgJ21yandpa2knOiAnbXJqLndpa2lwZWRpYS5vcmcnLFxuICAnbXN3aWtpJzogJ21zLndpa2lwZWRpYS5vcmcnLFxuICAnbXN3aWt0aW9uYXJ5JzogJ21zLndpa3Rpb25hcnkub3JnJyxcbiAgJ21zd2lraWJvb2tzJzogJ21zLndpa2lib29rcy5vcmcnLFxuICAnbXR3aWtpJzogJ210Lndpa2lwZWRpYS5vcmcnLFxuICAnbXR3aWt0aW9uYXJ5JzogJ210Lndpa3Rpb25hcnkub3JnJyxcbiAgJ211c3dpa2knOiAnbXVzLndpa2lwZWRpYS5vcmcnLFxuICAnbXdsd2lraSc6ICdtd2wud2lraXBlZGlhLm9yZycsXG4gICdteXdpa2knOiAnbXkud2lraXBlZGlhLm9yZycsXG4gICdteXdpa3Rpb25hcnknOiAnbXkud2lrdGlvbmFyeS5vcmcnLFxuICAnbXl3aWtpYm9va3MnOiAnbXkud2lraWJvb2tzLm9yZycsXG4gICdteXZ3aWtpJzogJ215di53aWtpcGVkaWEub3JnJyxcbiAgJ216bndpa2knOiAnbXpuLndpa2lwZWRpYS5vcmcnLFxuICAnbmF3aWtpJzogJ25hLndpa2lwZWRpYS5vcmcnLFxuICAnbmF3aWt0aW9uYXJ5JzogJ25hLndpa3Rpb25hcnkub3JnJyxcbiAgJ25hd2lraWJvb2tzJzogJ25hLndpa2lib29rcy5vcmcnLFxuICAnbmF3aWtpcXVvdGUnOiAnbmEud2lraXF1b3RlLm9yZycsXG4gICduYWh3aWtpJzogJ25haC53aWtpcGVkaWEub3JnJyxcbiAgJ25haHdpa3Rpb25hcnknOiAnbmFoLndpa3Rpb25hcnkub3JnJyxcbiAgJ25haHdpa2lib29rcyc6ICduYWgud2lraWJvb2tzLm9yZycsXG4gICduYXB3aWtpJzogJ25hcC53aWtpcGVkaWEub3JnJyxcbiAgJ25kc3dpa2knOiAnbmRzLndpa2lwZWRpYS5vcmcnLFxuICAnbmRzd2lrdGlvbmFyeSc6ICduZHMud2lrdGlvbmFyeS5vcmcnLFxuICAnbmRzd2lraWJvb2tzJzogJ25kcy53aWtpYm9va3Mub3JnJyxcbiAgJ25kc3dpa2lxdW90ZSc6ICduZHMud2lraXF1b3RlLm9yZycsXG4gICduZHNfbmx3aWtpJzogJ25kcy1ubC53aWtpcGVkaWEub3JnJyxcbiAgJ25ld2lraSc6ICduZS53aWtpcGVkaWEub3JnJyxcbiAgJ25ld2lrdGlvbmFyeSc6ICduZS53aWt0aW9uYXJ5Lm9yZycsXG4gICduZXdpa2lib29rcyc6ICduZS53aWtpYm9va3Mub3JnJyxcbiAgJ25ld3dpa2knOiAnbmV3Lndpa2lwZWRpYS5vcmcnLFxuICAnbmd3aWtpJzogJ25nLndpa2lwZWRpYS5vcmcnLFxuICAnbmx3aWtpJzogJ25sLndpa2lwZWRpYS5vcmcnLFxuICAnbmx3aWt0aW9uYXJ5JzogJ25sLndpa3Rpb25hcnkub3JnJyxcbiAgJ25sd2lraWJvb2tzJzogJ25sLndpa2lib29rcy5vcmcnLFxuICAnbmx3aWtpbmV3cyc6ICdubC53aWtpbmV3cy5vcmcnLFxuICAnbmx3aWtpcXVvdGUnOiAnbmwud2lraXF1b3RlLm9yZycsXG4gICdubHdpa2lzb3VyY2UnOiAnbmwud2lraXNvdXJjZS5vcmcnLFxuICAnbmx3aWtpdm95YWdlJzogJ25sLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ25ud2lraSc6ICdubi53aWtpcGVkaWEub3JnJyxcbiAgJ25ud2lrdGlvbmFyeSc6ICdubi53aWt0aW9uYXJ5Lm9yZycsXG4gICdubndpa2lxdW90ZSc6ICdubi53aWtpcXVvdGUub3JnJyxcbiAgJ25vd2lraSc6ICduby53aWtpcGVkaWEub3JnJyxcbiAgJ25vd2lrdGlvbmFyeSc6ICduby53aWt0aW9uYXJ5Lm9yZycsXG4gICdub3dpa2lib29rcyc6ICduby53aWtpYm9va3Mub3JnJyxcbiAgJ25vd2lraW5ld3MnOiAnbm8ud2lraW5ld3Mub3JnJyxcbiAgJ25vd2lraXF1b3RlJzogJ25vLndpa2lxdW90ZS5vcmcnLFxuICAnbm93aWtpc291cmNlJzogJ25vLndpa2lzb3VyY2Uub3JnJyxcbiAgJ25vdndpa2knOiAnbm92Lndpa2lwZWRpYS5vcmcnLFxuICAnbnJtd2lraSc6ICducm0ud2lraXBlZGlhLm9yZycsXG4gICduc293aWtpJzogJ25zby53aWtpcGVkaWEub3JnJyxcbiAgJ252d2lraSc6ICdudi53aWtpcGVkaWEub3JnJyxcbiAgJ255d2lraSc6ICdueS53aWtpcGVkaWEub3JnJyxcbiAgJ29jd2lraSc6ICdvYy53aWtpcGVkaWEub3JnJyxcbiAgJ29jd2lrdGlvbmFyeSc6ICdvYy53aWt0aW9uYXJ5Lm9yZycsXG4gICdvY3dpa2lib29rcyc6ICdvYy53aWtpYm9va3Mub3JnJyxcbiAgJ29td2lraSc6ICdvbS53aWtpcGVkaWEub3JnJyxcbiAgJ29td2lrdGlvbmFyeSc6ICdvbS53aWt0aW9uYXJ5Lm9yZycsXG4gICdvcndpa2knOiAnb3Iud2lraXBlZGlhLm9yZycsXG4gICdvcndpa3Rpb25hcnknOiAnb3Iud2lrdGlvbmFyeS5vcmcnLFxuICAnb3J3aWtpc291cmNlJzogJ29yLndpa2lzb3VyY2Uub3JnJyxcbiAgJ29zd2lraSc6ICdvcy53aWtpcGVkaWEub3JnJyxcbiAgJ3Bhd2lraSc6ICdwYS53aWtpcGVkaWEub3JnJyxcbiAgJ3Bhd2lrdGlvbmFyeSc6ICdwYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdwYXdpa2lib29rcyc6ICdwYS53aWtpYm9va3Mub3JnJyxcbiAgJ3BhZ3dpa2knOiAncGFnLndpa2lwZWRpYS5vcmcnLFxuICAncGFtd2lraSc6ICdwYW0ud2lraXBlZGlhLm9yZycsXG4gICdwYXB3aWtpJzogJ3BhcC53aWtpcGVkaWEub3JnJyxcbiAgJ3BjZHdpa2knOiAncGNkLndpa2lwZWRpYS5vcmcnLFxuICAncGRjd2lraSc6ICdwZGMud2lraXBlZGlhLm9yZycsXG4gICdwZmx3aWtpJzogJ3BmbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bpd2lraSc6ICdwaS53aWtpcGVkaWEub3JnJyxcbiAgJ3Bpd2lrdGlvbmFyeSc6ICdwaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdwaWh3aWtpJzogJ3BpaC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bsd2lraSc6ICdwbC53aWtpcGVkaWEub3JnJyxcbiAgJ3Bsd2lrdGlvbmFyeSc6ICdwbC53aWt0aW9uYXJ5Lm9yZycsXG4gICdwbHdpa2lib29rcyc6ICdwbC53aWtpYm9va3Mub3JnJyxcbiAgJ3Bsd2lraW5ld3MnOiAncGwud2lraW5ld3Mub3JnJyxcbiAgJ3Bsd2lraXF1b3RlJzogJ3BsLndpa2lxdW90ZS5vcmcnLFxuICAncGx3aWtpc291cmNlJzogJ3BsLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Bsd2lraXZveWFnZSc6ICdwbC53aWtpdm95YWdlLm9yZycsXG4gICdwbXN3aWtpJzogJ3Btcy53aWtpcGVkaWEub3JnJyxcbiAgJ3BuYndpa2knOiAncG5iLndpa2lwZWRpYS5vcmcnLFxuICAncG5id2lrdGlvbmFyeSc6ICdwbmIud2lrdGlvbmFyeS5vcmcnLFxuICAncG50d2lraSc6ICdwbnQud2lraXBlZGlhLm9yZycsXG4gICdwc3dpa2knOiAncHMud2lraXBlZGlhLm9yZycsXG4gICdwc3dpa3Rpb25hcnknOiAncHMud2lrdGlvbmFyeS5vcmcnLFxuICAncHN3aWtpYm9va3MnOiAncHMud2lraWJvb2tzLm9yZycsXG4gICdwdHdpa2knOiAncHQud2lraXBlZGlhLm9yZycsXG4gICdwdHdpa3Rpb25hcnknOiAncHQud2lrdGlvbmFyeS5vcmcnLFxuICAncHR3aWtpYm9va3MnOiAncHQud2lraWJvb2tzLm9yZycsXG4gICdwdHdpa2luZXdzJzogJ3B0Lndpa2luZXdzLm9yZycsXG4gICdwdHdpa2lxdW90ZSc6ICdwdC53aWtpcXVvdGUub3JnJyxcbiAgJ3B0d2lraXNvdXJjZSc6ICdwdC53aWtpc291cmNlLm9yZycsXG4gICdwdHdpa2l2ZXJzaXR5JzogJ3B0Lndpa2l2ZXJzaXR5Lm9yZycsXG4gICdwdHdpa2l2b3lhZ2UnOiAncHQud2lraXZveWFnZS5vcmcnLFxuICAncXV3aWtpJzogJ3F1Lndpa2lwZWRpYS5vcmcnLFxuICAncXV3aWt0aW9uYXJ5JzogJ3F1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3F1d2lraWJvb2tzJzogJ3F1Lndpa2lib29rcy5vcmcnLFxuICAncXV3aWtpcXVvdGUnOiAncXUud2lraXF1b3RlLm9yZycsXG4gICdybXdpa2knOiAncm0ud2lraXBlZGlhLm9yZycsXG4gICdybXdpa3Rpb25hcnknOiAncm0ud2lrdGlvbmFyeS5vcmcnLFxuICAncm13aWtpYm9va3MnOiAncm0ud2lraWJvb2tzLm9yZycsXG4gICdybXl3aWtpJzogJ3JteS53aWtpcGVkaWEub3JnJyxcbiAgJ3Jud2lraSc6ICdybi53aWtpcGVkaWEub3JnJyxcbiAgJ3Jud2lrdGlvbmFyeSc6ICdybi53aWt0aW9uYXJ5Lm9yZycsXG4gICdyb3dpa2knOiAncm8ud2lraXBlZGlhLm9yZycsXG4gICdyb3dpa3Rpb25hcnknOiAncm8ud2lrdGlvbmFyeS5vcmcnLFxuICAncm93aWtpYm9va3MnOiAncm8ud2lraWJvb2tzLm9yZycsXG4gICdyb3dpa2luZXdzJzogJ3JvLndpa2luZXdzLm9yZycsXG4gICdyb3dpa2lxdW90ZSc6ICdyby53aWtpcXVvdGUub3JnJyxcbiAgJ3Jvd2lraXNvdXJjZSc6ICdyby53aWtpc291cmNlLm9yZycsXG4gICdyb3dpa2l2b3lhZ2UnOiAncm8ud2lraXZveWFnZS5vcmcnLFxuICAncm9hX3J1cHdpa2knOiAncm9hLXJ1cC53aWtpcGVkaWEub3JnJyxcbiAgJ3JvYV9ydXB3aWt0aW9uYXJ5JzogJ3JvYS1ydXAud2lrdGlvbmFyeS5vcmcnLFxuICAncm9hX3RhcmF3aWtpJzogJ3JvYS10YXJhLndpa2lwZWRpYS5vcmcnLFxuICAncnV3aWtpJzogJ3J1Lndpa2lwZWRpYS5vcmcnLFxuICAncnV3aWt0aW9uYXJ5JzogJ3J1Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3J1d2lraWJvb2tzJzogJ3J1Lndpa2lib29rcy5vcmcnLFxuICAncnV3aWtpbmV3cyc6ICdydS53aWtpbmV3cy5vcmcnLFxuICAncnV3aWtpcXVvdGUnOiAncnUud2lraXF1b3RlLm9yZycsXG4gICdydXdpa2lzb3VyY2UnOiAncnUud2lraXNvdXJjZS5vcmcnLFxuICAncnV3aWtpdmVyc2l0eSc6ICdydS53aWtpdmVyc2l0eS5vcmcnLFxuICAncnV3aWtpdm95YWdlJzogJ3J1Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3J1ZXdpa2knOiAncnVlLndpa2lwZWRpYS5vcmcnLFxuICAncnd3aWtpJzogJ3J3Lndpa2lwZWRpYS5vcmcnLFxuICAncnd3aWt0aW9uYXJ5JzogJ3J3Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nhd2lraSc6ICdzYS53aWtpcGVkaWEub3JnJyxcbiAgJ3Nhd2lrdGlvbmFyeSc6ICdzYS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzYXdpa2lib29rcyc6ICdzYS53aWtpYm9va3Mub3JnJyxcbiAgJ3Nhd2lraXF1b3RlJzogJ3NhLndpa2lxdW90ZS5vcmcnLFxuICAnc2F3aWtpc291cmNlJzogJ3NhLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3NhaHdpa2knOiAnc2FoLndpa2lwZWRpYS5vcmcnLFxuICAnc2Fod2lraXNvdXJjZSc6ICdzYWgud2lraXNvdXJjZS5vcmcnLFxuICAnc2N3aWtpJzogJ3NjLndpa2lwZWRpYS5vcmcnLFxuICAnc2N3aWt0aW9uYXJ5JzogJ3NjLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Njbndpa2knOiAnc2NuLndpa2lwZWRpYS5vcmcnLFxuICAnc2Nud2lrdGlvbmFyeSc6ICdzY24ud2lrdGlvbmFyeS5vcmcnLFxuICAnc2Nvd2lraSc6ICdzY28ud2lraXBlZGlhLm9yZycsXG4gICdzZHdpa2knOiAnc2Qud2lraXBlZGlhLm9yZycsXG4gICdzZHdpa3Rpb25hcnknOiAnc2Qud2lrdGlvbmFyeS5vcmcnLFxuICAnc2R3aWtpbmV3cyc6ICdzZC53aWtpbmV3cy5vcmcnLFxuICAnc2V3aWtpJzogJ3NlLndpa2lwZWRpYS5vcmcnLFxuICAnc2V3aWtpYm9va3MnOiAnc2Uud2lraWJvb2tzLm9yZycsXG4gICdzZ3dpa2knOiAnc2cud2lraXBlZGlhLm9yZycsXG4gICdzZ3dpa3Rpb25hcnknOiAnc2cud2lrdGlvbmFyeS5vcmcnLFxuICAnc2h3aWtpJzogJ3NoLndpa2lwZWRpYS5vcmcnLFxuICAnc2h3aWt0aW9uYXJ5JzogJ3NoLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Npd2lraSc6ICdzaS53aWtpcGVkaWEub3JnJyxcbiAgJ3Npd2lrdGlvbmFyeSc6ICdzaS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzaXdpa2lib29rcyc6ICdzaS53aWtpYm9va3Mub3JnJyxcbiAgJ3NpbXBsZXdpa2knOiAnc2ltcGxlLndpa2lwZWRpYS5vcmcnLFxuICAnc2ltcGxld2lrdGlvbmFyeSc6ICdzaW1wbGUud2lrdGlvbmFyeS5vcmcnLFxuICAnc2ltcGxld2lraWJvb2tzJzogJ3NpbXBsZS53aWtpYm9va3Mub3JnJyxcbiAgJ3NpbXBsZXdpa2lxdW90ZSc6ICdzaW1wbGUud2lraXF1b3RlLm9yZycsXG4gICdza3dpa2knOiAnc2sud2lraXBlZGlhLm9yZycsXG4gICdza3dpa3Rpb25hcnknOiAnc2sud2lrdGlvbmFyeS5vcmcnLFxuICAnc2t3aWtpYm9va3MnOiAnc2sud2lraWJvb2tzLm9yZycsXG4gICdza3dpa2lxdW90ZSc6ICdzay53aWtpcXVvdGUub3JnJyxcbiAgJ3Nrd2lraXNvdXJjZSc6ICdzay53aWtpc291cmNlLm9yZycsXG4gICdzbHdpa2knOiAnc2wud2lraXBlZGlhLm9yZycsXG4gICdzbHdpa3Rpb25hcnknOiAnc2wud2lrdGlvbmFyeS5vcmcnLFxuICAnc2x3aWtpYm9va3MnOiAnc2wud2lraWJvb2tzLm9yZycsXG4gICdzbHdpa2lxdW90ZSc6ICdzbC53aWtpcXVvdGUub3JnJyxcbiAgJ3Nsd2lraXNvdXJjZSc6ICdzbC53aWtpc291cmNlLm9yZycsXG4gICdzbHdpa2l2ZXJzaXR5JzogJ3NsLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdzbXdpa2knOiAnc20ud2lraXBlZGlhLm9yZycsXG4gICdzbXdpa3Rpb25hcnknOiAnc20ud2lrdGlvbmFyeS5vcmcnLFxuICAnc253aWtpJzogJ3NuLndpa2lwZWRpYS5vcmcnLFxuICAnc253aWt0aW9uYXJ5JzogJ3NuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Nvd2lraSc6ICdzby53aWtpcGVkaWEub3JnJyxcbiAgJ3Nvd2lrdGlvbmFyeSc6ICdzby53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcXdpa2knOiAnc3Eud2lraXBlZGlhLm9yZycsXG4gICdzcXdpa3Rpb25hcnknOiAnc3Eud2lrdGlvbmFyeS5vcmcnLFxuICAnc3F3aWtpYm9va3MnOiAnc3Eud2lraWJvb2tzLm9yZycsXG4gICdzcXdpa2luZXdzJzogJ3NxLndpa2luZXdzLm9yZycsXG4gICdzcXdpa2lxdW90ZSc6ICdzcS53aWtpcXVvdGUub3JnJyxcbiAgJ3Nyd2lraSc6ICdzci53aWtpcGVkaWEub3JnJyxcbiAgJ3Nyd2lrdGlvbmFyeSc6ICdzci53aWt0aW9uYXJ5Lm9yZycsXG4gICdzcndpa2lib29rcyc6ICdzci53aWtpYm9va3Mub3JnJyxcbiAgJ3Nyd2lraW5ld3MnOiAnc3Iud2lraW5ld3Mub3JnJyxcbiAgJ3Nyd2lraXF1b3RlJzogJ3NyLndpa2lxdW90ZS5vcmcnLFxuICAnc3J3aWtpc291cmNlJzogJ3NyLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3Nybndpa2knOiAnc3JuLndpa2lwZWRpYS5vcmcnLFxuICAnc3N3aWtpJzogJ3NzLndpa2lwZWRpYS5vcmcnLFxuICAnc3N3aWt0aW9uYXJ5JzogJ3NzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3N0d2lraSc6ICdzdC53aWtpcGVkaWEub3JnJyxcbiAgJ3N0d2lrdGlvbmFyeSc6ICdzdC53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdHF3aWtpJzogJ3N0cS53aWtpcGVkaWEub3JnJyxcbiAgJ3N1d2lraSc6ICdzdS53aWtpcGVkaWEub3JnJyxcbiAgJ3N1d2lrdGlvbmFyeSc6ICdzdS53aWt0aW9uYXJ5Lm9yZycsXG4gICdzdXdpa2lib29rcyc6ICdzdS53aWtpYm9va3Mub3JnJyxcbiAgJ3N1d2lraXF1b3RlJzogJ3N1Lndpa2lxdW90ZS5vcmcnLFxuICAnc3Z3aWtpJzogJ3N2Lndpa2lwZWRpYS5vcmcnLFxuICAnc3Z3aWt0aW9uYXJ5JzogJ3N2Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3N2d2lraWJvb2tzJzogJ3N2Lndpa2lib29rcy5vcmcnLFxuICAnc3Z3aWtpbmV3cyc6ICdzdi53aWtpbmV3cy5vcmcnLFxuICAnc3Z3aWtpcXVvdGUnOiAnc3Yud2lraXF1b3RlLm9yZycsXG4gICdzdndpa2lzb3VyY2UnOiAnc3Yud2lraXNvdXJjZS5vcmcnLFxuICAnc3Z3aWtpdmVyc2l0eSc6ICdzdi53aWtpdmVyc2l0eS5vcmcnLFxuICAnc3Z3aWtpdm95YWdlJzogJ3N2Lndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3N3d2lraSc6ICdzdy53aWtpcGVkaWEub3JnJyxcbiAgJ3N3d2lrdGlvbmFyeSc6ICdzdy53aWt0aW9uYXJ5Lm9yZycsXG4gICdzd3dpa2lib29rcyc6ICdzdy53aWtpYm9va3Mub3JnJyxcbiAgJ3N6bHdpa2knOiAnc3psLndpa2lwZWRpYS5vcmcnLFxuICAndGF3aWtpJzogJ3RhLndpa2lwZWRpYS5vcmcnLFxuICAndGF3aWt0aW9uYXJ5JzogJ3RhLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rhd2lraWJvb2tzJzogJ3RhLndpa2lib29rcy5vcmcnLFxuICAndGF3aWtpbmV3cyc6ICd0YS53aWtpbmV3cy5vcmcnLFxuICAndGF3aWtpcXVvdGUnOiAndGEud2lraXF1b3RlLm9yZycsXG4gICd0YXdpa2lzb3VyY2UnOiAndGEud2lraXNvdXJjZS5vcmcnLFxuICAndGV3aWtpJzogJ3RlLndpa2lwZWRpYS5vcmcnLFxuICAndGV3aWt0aW9uYXJ5JzogJ3RlLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rld2lraWJvb2tzJzogJ3RlLndpa2lib29rcy5vcmcnLFxuICAndGV3aWtpcXVvdGUnOiAndGUud2lraXF1b3RlLm9yZycsXG4gICd0ZXdpa2lzb3VyY2UnOiAndGUud2lraXNvdXJjZS5vcmcnLFxuICAndGV0d2lraSc6ICd0ZXQud2lraXBlZGlhLm9yZycsXG4gICd0Z3dpa2knOiAndGcud2lraXBlZGlhLm9yZycsXG4gICd0Z3dpa3Rpb25hcnknOiAndGcud2lrdGlvbmFyeS5vcmcnLFxuICAndGd3aWtpYm9va3MnOiAndGcud2lraWJvb2tzLm9yZycsXG4gICd0aHdpa2knOiAndGgud2lraXBlZGlhLm9yZycsXG4gICd0aHdpa3Rpb25hcnknOiAndGgud2lrdGlvbmFyeS5vcmcnLFxuICAndGh3aWtpYm9va3MnOiAndGgud2lraWJvb2tzLm9yZycsXG4gICd0aHdpa2luZXdzJzogJ3RoLndpa2luZXdzLm9yZycsXG4gICd0aHdpa2lxdW90ZSc6ICd0aC53aWtpcXVvdGUub3JnJyxcbiAgJ3Rod2lraXNvdXJjZSc6ICd0aC53aWtpc291cmNlLm9yZycsXG4gICd0aXdpa2knOiAndGkud2lraXBlZGlhLm9yZycsXG4gICd0aXdpa3Rpb25hcnknOiAndGkud2lrdGlvbmFyeS5vcmcnLFxuICAndGt3aWtpJzogJ3RrLndpa2lwZWRpYS5vcmcnLFxuICAndGt3aWt0aW9uYXJ5JzogJ3RrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Rrd2lraWJvb2tzJzogJ3RrLndpa2lib29rcy5vcmcnLFxuICAndGt3aWtpcXVvdGUnOiAndGsud2lraXF1b3RlLm9yZycsXG4gICd0bHdpa2knOiAndGwud2lraXBlZGlhLm9yZycsXG4gICd0bHdpa3Rpb25hcnknOiAndGwud2lrdGlvbmFyeS5vcmcnLFxuICAndGx3aWtpYm9va3MnOiAndGwud2lraWJvb2tzLm9yZycsXG4gICd0bndpa2knOiAndG4ud2lraXBlZGlhLm9yZycsXG4gICd0bndpa3Rpb25hcnknOiAndG4ud2lrdGlvbmFyeS5vcmcnLFxuICAndG93aWtpJzogJ3RvLndpa2lwZWRpYS5vcmcnLFxuICAndG93aWt0aW9uYXJ5JzogJ3RvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3RwaXdpa2knOiAndHBpLndpa2lwZWRpYS5vcmcnLFxuICAndHBpd2lrdGlvbmFyeSc6ICd0cGkud2lrdGlvbmFyeS5vcmcnLFxuICAndHJ3aWtpJzogJ3RyLndpa2lwZWRpYS5vcmcnLFxuICAndHJ3aWt0aW9uYXJ5JzogJ3RyLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Ryd2lraWJvb2tzJzogJ3RyLndpa2lib29rcy5vcmcnLFxuICAndHJ3aWtpbmV3cyc6ICd0ci53aWtpbmV3cy5vcmcnLFxuICAndHJ3aWtpcXVvdGUnOiAndHIud2lraXF1b3RlLm9yZycsXG4gICd0cndpa2lzb3VyY2UnOiAndHIud2lraXNvdXJjZS5vcmcnLFxuICAndHN3aWtpJzogJ3RzLndpa2lwZWRpYS5vcmcnLFxuICAndHN3aWt0aW9uYXJ5JzogJ3RzLndpa3Rpb25hcnkub3JnJyxcbiAgJ3R0d2lraSc6ICd0dC53aWtpcGVkaWEub3JnJyxcbiAgJ3R0d2lrdGlvbmFyeSc6ICd0dC53aWt0aW9uYXJ5Lm9yZycsXG4gICd0dHdpa2lib29rcyc6ICd0dC53aWtpYm9va3Mub3JnJyxcbiAgJ3R0d2lraXF1b3RlJzogJ3R0Lndpa2lxdW90ZS5vcmcnLFxuICAndHVtd2lraSc6ICd0dW0ud2lraXBlZGlhLm9yZycsXG4gICd0d3dpa2knOiAndHcud2lraXBlZGlhLm9yZycsXG4gICd0d3dpa3Rpb25hcnknOiAndHcud2lrdGlvbmFyeS5vcmcnLFxuICAndHl3aWtpJzogJ3R5Lndpa2lwZWRpYS5vcmcnLFxuICAndHl2d2lraSc6ICd0eXYud2lraXBlZGlhLm9yZycsXG4gICd1ZG13aWtpJzogJ3VkbS53aWtpcGVkaWEub3JnJyxcbiAgJ3Vnd2lraSc6ICd1Zy53aWtpcGVkaWEub3JnJyxcbiAgJ3Vnd2lrdGlvbmFyeSc6ICd1Zy53aWt0aW9uYXJ5Lm9yZycsXG4gICd1Z3dpa2lib29rcyc6ICd1Zy53aWtpYm9va3Mub3JnJyxcbiAgJ3Vnd2lraXF1b3RlJzogJ3VnLndpa2lxdW90ZS5vcmcnLFxuICAndWt3aWtpJzogJ3VrLndpa2lwZWRpYS5vcmcnLFxuICAndWt3aWt0aW9uYXJ5JzogJ3VrLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Vrd2lraWJvb2tzJzogJ3VrLndpa2lib29rcy5vcmcnLFxuICAndWt3aWtpbmV3cyc6ICd1ay53aWtpbmV3cy5vcmcnLFxuICAndWt3aWtpcXVvdGUnOiAndWsud2lraXF1b3RlLm9yZycsXG4gICd1a3dpa2lzb3VyY2UnOiAndWsud2lraXNvdXJjZS5vcmcnLFxuICAndWt3aWtpdm95YWdlJzogJ3VrLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Vyd2lraSc6ICd1ci53aWtpcGVkaWEub3JnJyxcbiAgJ3Vyd2lrdGlvbmFyeSc6ICd1ci53aWt0aW9uYXJ5Lm9yZycsXG4gICd1cndpa2lib29rcyc6ICd1ci53aWtpYm9va3Mub3JnJyxcbiAgJ3Vyd2lraXF1b3RlJzogJ3VyLndpa2lxdW90ZS5vcmcnLFxuICAndXp3aWtpJzogJ3V6Lndpa2lwZWRpYS5vcmcnLFxuICAndXp3aWt0aW9uYXJ5JzogJ3V6Lndpa3Rpb25hcnkub3JnJyxcbiAgJ3V6d2lraWJvb2tzJzogJ3V6Lndpa2lib29rcy5vcmcnLFxuICAndXp3aWtpcXVvdGUnOiAndXoud2lraXF1b3RlLm9yZycsXG4gICd2ZXdpa2knOiAndmUud2lraXBlZGlhLm9yZycsXG4gICd2ZWN3aWtpJzogJ3ZlYy53aWtpcGVkaWEub3JnJyxcbiAgJ3ZlY3dpa3Rpb25hcnknOiAndmVjLndpa3Rpb25hcnkub3JnJyxcbiAgJ3ZlY3dpa2lzb3VyY2UnOiAndmVjLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3ZlcHdpa2knOiAndmVwLndpa2lwZWRpYS5vcmcnLFxuICAndml3aWtpJzogJ3ZpLndpa2lwZWRpYS5vcmcnLFxuICAndml3aWt0aW9uYXJ5JzogJ3ZpLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Zpd2lraWJvb2tzJzogJ3ZpLndpa2lib29rcy5vcmcnLFxuICAndml3aWtpcXVvdGUnOiAndmkud2lraXF1b3RlLm9yZycsXG4gICd2aXdpa2lzb3VyY2UnOiAndmkud2lraXNvdXJjZS5vcmcnLFxuICAndml3aWtpdm95YWdlJzogJ3ZpLndpa2l2b3lhZ2Uub3JnJyxcbiAgJ3Zsc3dpa2knOiAndmxzLndpa2lwZWRpYS5vcmcnLFxuICAndm93aWtpJzogJ3ZvLndpa2lwZWRpYS5vcmcnLFxuICAndm93aWt0aW9uYXJ5JzogJ3ZvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3Zvd2lraWJvb2tzJzogJ3ZvLndpa2lib29rcy5vcmcnLFxuICAndm93aWtpcXVvdGUnOiAndm8ud2lraXF1b3RlLm9yZycsXG4gICd3YXdpa2knOiAnd2Eud2lraXBlZGlhLm9yZycsXG4gICd3YXdpa3Rpb25hcnknOiAnd2Eud2lrdGlvbmFyeS5vcmcnLFxuICAnd2F3aWtpYm9va3MnOiAnd2Eud2lraWJvb2tzLm9yZycsXG4gICd3YXJ3aWtpJzogJ3dhci53aWtpcGVkaWEub3JnJyxcbiAgJ3dvd2lraSc6ICd3by53aWtpcGVkaWEub3JnJyxcbiAgJ3dvd2lrdGlvbmFyeSc6ICd3by53aWt0aW9uYXJ5Lm9yZycsXG4gICd3b3dpa2lxdW90ZSc6ICd3by53aWtpcXVvdGUub3JnJyxcbiAgJ3d1dXdpa2knOiAnd3V1Lndpa2lwZWRpYS5vcmcnLFxuICAneGFsd2lraSc6ICd4YWwud2lraXBlZGlhLm9yZycsXG4gICd4aHdpa2knOiAneGgud2lraXBlZGlhLm9yZycsXG4gICd4aHdpa3Rpb25hcnknOiAneGgud2lrdGlvbmFyeS5vcmcnLFxuICAneGh3aWtpYm9va3MnOiAneGgud2lraWJvb2tzLm9yZycsXG4gICd4bWZ3aWtpJzogJ3htZi53aWtpcGVkaWEub3JnJyxcbiAgJ3lpd2lraSc6ICd5aS53aWtpcGVkaWEub3JnJyxcbiAgJ3lpd2lrdGlvbmFyeSc6ICd5aS53aWt0aW9uYXJ5Lm9yZycsXG4gICd5aXdpa2lzb3VyY2UnOiAneWkud2lraXNvdXJjZS5vcmcnLFxuICAneW93aWtpJzogJ3lvLndpa2lwZWRpYS5vcmcnLFxuICAneW93aWt0aW9uYXJ5JzogJ3lvLndpa3Rpb25hcnkub3JnJyxcbiAgJ3lvd2lraWJvb2tzJzogJ3lvLndpa2lib29rcy5vcmcnLFxuICAnemF3aWtpJzogJ3phLndpa2lwZWRpYS5vcmcnLFxuICAnemF3aWt0aW9uYXJ5JzogJ3phLndpa3Rpb25hcnkub3JnJyxcbiAgJ3phd2lraWJvb2tzJzogJ3phLndpa2lib29rcy5vcmcnLFxuICAnemF3aWtpcXVvdGUnOiAnemEud2lraXF1b3RlLm9yZycsXG4gICd6ZWF3aWtpJzogJ3plYS53aWtpcGVkaWEub3JnJyxcbiAgJ3pod2lraSc6ICd6aC53aWtpcGVkaWEub3JnJyxcbiAgJ3pod2lrdGlvbmFyeSc6ICd6aC53aWt0aW9uYXJ5Lm9yZycsXG4gICd6aHdpa2lib29rcyc6ICd6aC53aWtpYm9va3Mub3JnJyxcbiAgJ3pod2lraW5ld3MnOiAnemgud2lraW5ld3Mub3JnJyxcbiAgJ3pod2lraXF1b3RlJzogJ3poLndpa2lxdW90ZS5vcmcnLFxuICAnemh3aWtpc291cmNlJzogJ3poLndpa2lzb3VyY2Uub3JnJyxcbiAgJ3pod2lraXZveWFnZSc6ICd6aC53aWtpdm95YWdlLm9yZycsXG4gICd6aF9jbGFzc2ljYWx3aWtpJzogJ3poLWNsYXNzaWNhbC53aWtpcGVkaWEub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpJzogJ3poLW1pbi1uYW4ud2lraXBlZGlhLm9yZycsXG4gICd6aF9taW5fbmFud2lrdGlvbmFyeSc6ICd6aC1taW4tbmFuLndpa3Rpb25hcnkub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpYm9va3MnOiAnemgtbWluLW5hbi53aWtpYm9va3Mub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpcXVvdGUnOiAnemgtbWluLW5hbi53aWtpcXVvdGUub3JnJyxcbiAgJ3poX21pbl9uYW53aWtpc291cmNlJzogJ3poLW1pbi1uYW4ud2lraXNvdXJjZS5vcmcnLFxuICAnemhfeXVld2lraSc6ICd6aC15dWUud2lraXBlZGlhLm9yZycsXG4gICd6dXdpa2knOiAnenUud2lraXBlZGlhLm9yZycsXG4gICd6dXdpa3Rpb25hcnknOiAnenUud2lrdGlvbmFyeS5vcmcnLFxuICAnenV3aWtpYm9va3MnOiAnenUud2lraWJvb2tzLm9yZycsXG4gICdhZHZpc29yeXdpa2knOiAnYWR2aXNvcnkud2lraW1lZGlhLm9yZycsXG4gICdhcndpa2ltZWRpYSc6ICdhci53aWtpbWVkaWEub3JnJyxcbiAgJ2FyYmNvbV9kZXdpa2knOiAnYXJiY29tLWRlLndpa2lwZWRpYS5vcmcnLFxuICAnYXJiY29tX2Vud2lraSc6ICdhcmJjb20tZW4ud2lraXBlZGlhLm9yZycsXG4gICdhcmJjb21fZml3aWtpJzogJ2FyYmNvbS1maS53aWtpcGVkaWEub3JnJyxcbiAgJ2FyYmNvbV9ubHdpa2knOiAnYXJiY29tLW5sLndpa2lwZWRpYS5vcmcnLFxuICAnYXVkaXRjb213aWtpJzogJ2F1ZGl0Y29tLndpa2ltZWRpYS5vcmcnLFxuICAnYmR3aWtpbWVkaWEnOiAnYmQud2lraW1lZGlhLm9yZycsXG4gICdiZXdpa2ltZWRpYSc6ICdiZS53aWtpbWVkaWEub3JnJyxcbiAgJ2JldGF3aWtpdmVyc2l0eSc6ICdiZXRhLndpa2l2ZXJzaXR5Lm9yZycsXG4gICdib2FyZHdpa2knOiAnYm9hcmQud2lraW1lZGlhLm9yZycsXG4gICdib2FyZGdvdmNvbXdpa2knOiAnYm9hcmRnb3Zjb20ud2lraW1lZGlhLm9yZycsXG4gICdicndpa2ltZWRpYSc6ICdici53aWtpbWVkaWEub3JnJyxcbiAgJ2Nhd2lraW1lZGlhJzogJ2NhLndpa2ltZWRpYS5vcmcnLFxuICAnY2hhaXJ3aWtpJzogJ2NoYWlyLndpa2ltZWRpYS5vcmcnLFxuICAnY2hhcGNvbXdpa2knOiAnYWZmY29tLndpa2ltZWRpYS5vcmcnLFxuICAnY2hlY2t1c2Vyd2lraSc6ICdjaGVja3VzZXIud2lraW1lZGlhLm9yZycsXG4gICdjbndpa2ltZWRpYSc6ICdjbi53aWtpbWVkaWEub3JnJyxcbiAgJ2Nvd2lraW1lZGlhJzogJ2NvLndpa2ltZWRpYS5vcmcnLFxuICAnY29sbGFid2lraSc6ICdjb2xsYWIud2lraW1lZGlhLm9yZycsXG4gICdjb21tb25zd2lraSc6ICdjb21tb25zLndpa2ltZWRpYS5vcmcnLFxuICAnZGt3aWtpbWVkaWEnOiAnZGsud2lraW1lZGlhLm9yZycsXG4gICdkb25hdGV3aWtpJzogJ2RvbmF0ZS53aWtpbWVkaWEub3JnJyxcbiAgJ2V0d2lraW1lZGlhJzogJ2VlLndpa2ltZWRpYS5vcmcnLFxuICAnZXhlY3dpa2knOiAnZXhlYy53aWtpbWVkaWEub3JnJyxcbiAgJ2ZkY3dpa2knOiAnZmRjLndpa2ltZWRpYS5vcmcnLFxuICAnZml3aWtpbWVkaWEnOiAnZmkud2lraW1lZGlhLm9yZycsXG4gICdmb3VuZGF0aW9ud2lraSc6ICd3aWtpbWVkaWFmb3VuZGF0aW9uLm9yZycsXG4gICdncmFudHN3aWtpJzogJ2dyYW50cy53aWtpbWVkaWEub3JnJyxcbiAgJ2llZ2NvbXdpa2knOiAnaWVnY29tLndpa2ltZWRpYS5vcmcnLFxuICAnaWx3aWtpbWVkaWEnOiAnaWwud2lraW1lZGlhLm9yZycsXG4gICdpbmN1YmF0b3J3aWtpJzogJ2luY3ViYXRvci53aWtpbWVkaWEub3JnJyxcbiAgJ2ludGVybmFsd2lraSc6ICdpbnRlcm5hbC53aWtpbWVkaWEub3JnJyxcbiAgJ2xhYnN3aWtpJzogJ3dpa2l0ZWNoLndpa2ltZWRpYS5vcmcnLFxuICAnbGFidGVzdHdpa2knOiAnbGFidGVzdHdpa2l0ZWNoLndpa2ltZWRpYS5vcmcnLFxuICAnbGVnYWx0ZWFtd2lraSc6ICdsZWdhbHRlYW0ud2lraW1lZGlhLm9yZycsXG4gICdsb2dpbndpa2knOiAnbG9naW4ud2lraW1lZGlhLm9yZycsXG4gICdtZWRpYXdpa2l3aWtpJzogJ21lZGlhd2lraS5vcmcnLFxuICAnbWV0YXdpa2knOiAnbWV0YS53aWtpbWVkaWEub3JnJyxcbiAgJ21rd2lraW1lZGlhJzogJ21rLndpa2ltZWRpYS5vcmcnLFxuICAnbW92ZW1lbnRyb2xlc3dpa2knOiAnbW92ZW1lbnRyb2xlcy53aWtpbWVkaWEub3JnJyxcbiAgJ214d2lraW1lZGlhJzogJ214Lndpa2ltZWRpYS5vcmcnLFxuICAnbmx3aWtpbWVkaWEnOiAnbmwud2lraW1lZGlhLm9yZycsXG4gICdub3dpa2ltZWRpYSc6ICduby53aWtpbWVkaWEub3JnJyxcbiAgJ25vYm9hcmRfY2hhcHRlcnN3aWtpbWVkaWEnOiAnbm9ib2FyZC1jaGFwdGVycy53aWtpbWVkaWEub3JnJyxcbiAgJ25vc3RhbGdpYXdpa2knOiAnbm9zdGFsZ2lhLndpa2lwZWRpYS5vcmcnLFxuICAnbnljd2lraW1lZGlhJzogJ255Yy53aWtpbWVkaWEub3JnJyxcbiAgJ256d2lraW1lZGlhJzogJ256Lndpa2ltZWRpYS5vcmcnLFxuICAnb2ZmaWNld2lraSc6ICdvZmZpY2Uud2lraW1lZGlhLm9yZycsXG4gICdvbWJ1ZHNtZW53aWtpJzogJ29tYnVkc21lbi53aWtpbWVkaWEub3JnJyxcbiAgJ290cnNfd2lraXdpa2knOiAnb3Rycy13aWtpLndpa2ltZWRpYS5vcmcnLFxuICAnb3V0cmVhY2h3aWtpJzogJ291dHJlYWNoLndpa2ltZWRpYS5vcmcnLFxuICAncGFfdXN3aWtpbWVkaWEnOiAncGEtdXMud2lraW1lZGlhLm9yZycsXG4gICdwbHdpa2ltZWRpYSc6ICdwbC53aWtpbWVkaWEub3JnJyxcbiAgJ3F1YWxpdHl3aWtpJzogJ3F1YWxpdHkud2lraW1lZGlhLm9yZycsXG4gICdyc3dpa2ltZWRpYSc6ICdycy53aWtpbWVkaWEub3JnJyxcbiAgJ3J1d2lraW1lZGlhJzogJ3J1Lndpa2ltZWRpYS5vcmcnLFxuICAnc2V3aWtpbWVkaWEnOiAnc2Uud2lraW1lZGlhLm9yZycsXG4gICdzZWFyY2hjb213aWtpJzogJ3NlYXJjaGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ3NvdXJjZXN3aWtpJzogJ3dpa2lzb3VyY2Uub3JnJyxcbiAgJ3NwY29td2lraSc6ICdzcGNvbS53aWtpbWVkaWEub3JnJyxcbiAgJ3NwZWNpZXN3aWtpJzogJ3NwZWNpZXMud2lraW1lZGlhLm9yZycsXG4gICdzdGV3YXJkd2lraSc6ICdzdGV3YXJkLndpa2ltZWRpYS5vcmcnLFxuICAnc3RyYXRlZ3l3aWtpJzogJ3N0cmF0ZWd5Lndpa2ltZWRpYS5vcmcnLFxuICAndGVud2lraSc6ICd0ZW4ud2lraXBlZGlhLm9yZycsXG4gICd0ZXN0d2lraSc6ICd0ZXN0Lndpa2lwZWRpYS5vcmcnLFxuICAndGVzdDJ3aWtpJzogJ3Rlc3QyLndpa2lwZWRpYS5vcmcnLFxuICAndGVzdHdpa2lkYXRhd2lraSc6ICd0ZXN0Lndpa2lkYXRhLm9yZycsXG4gICd0cndpa2ltZWRpYSc6ICd0ci53aWtpbWVkaWEub3JnJyxcbiAgJ3RyYW5zaXRpb250ZWFtd2lraSc6ICd0cmFuc2l0aW9udGVhbS53aWtpbWVkaWEub3JnJyxcbiAgJ3Vhd2lraW1lZGlhJzogJ3VhLndpa2ltZWRpYS5vcmcnLFxuICAndWt3aWtpbWVkaWEnOiAndWsud2lraW1lZGlhLm9yZycsXG4gICd1c2FiaWxpdHl3aWtpJzogJ3VzYWJpbGl0eS53aWtpbWVkaWEub3JnJyxcbiAgJ3ZvdGV3aWtpJzogJ3ZvdGUud2lraW1lZGlhLm9yZycsXG4gICd3Z19lbndpa2knOiAnd2ctZW4ud2lraXBlZGlhLm9yZycsXG4gICd3aWtpZGF0YXdpa2knOiAnd2lraWRhdGEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDV3aWtpJzogJ3dpa2ltYW5pYTIwMDUud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA2d2lraSc6ICd3aWtpbWFuaWEyMDA2Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAwN3dpa2knOiAnd2lraW1hbmlhMjAwNy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMDh3aWtpJzogJ3dpa2ltYW5pYTIwMDgud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDA5d2lraSc6ICd3aWtpbWFuaWEyMDA5Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxMHdpa2knOiAnd2lraW1hbmlhMjAxMC53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTF3aWtpJzogJ3dpa2ltYW5pYTIwMTEud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDEyd2lraSc6ICd3aWtpbWFuaWEyMDEyLndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxM3dpa2knOiAnd2lraW1hbmlhMjAxMy53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTR3aWtpJzogJ3dpa2ltYW5pYTIwMTQud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWEyMDE1d2lraSc6ICd3aWtpbWFuaWEyMDE1Lndpa2ltZWRpYS5vcmcnLFxuICAnd2lraW1hbmlhMjAxNndpa2knOiAnd2lraW1hbmlhMjAxNi53aWtpbWVkaWEub3JnJyxcbiAgJ3dpa2ltYW5pYTIwMTd3aWtpJzogJ3dpa2ltYW5pYTIwMTcud2lraW1lZGlhLm9yZycsXG4gICd3aWtpbWFuaWF0ZWFtd2lraSc6ICd3aWtpbWFuaWF0ZWFtLndpa2ltZWRpYS5vcmcnLFxuICAnemVyb3dpa2knOiAnemVyby53aWtpbWVkaWEub3JnJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaXRlTWFwO1xuIiwiLyoqXG4gKiBAZmlsZSBDb25maWd1cmF0aW9uIGZvciBUb3B2aWV3cyBhcHBsaWNhdGlvblxuICogQGF1dGhvciBNdXNpa0FuaW1hbFxuICogQGNvcHlyaWdodCAyMDE2IE11c2lrQW5pbWFsXG4gKi9cblxuY29uc3QgcHYgPSByZXF1aXJlKCcuLi9zaGFyZWQvcHYnKTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBUb3B2aWV3cyBhcHBsaWNhdGlvbi5cbiAqIFRoaXMgaW5jbHVkZXMgc2VsZWN0b3JzLCBkZWZhdWx0cywgYW5kIG90aGVyIGNvbnN0YW50cyBzcGVjaWZpYyB0byBUb3B2aWV3c1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgY29uZmlnID0ge1xuICBzZWxlY3QySW5wdXQ6ICcuYXFzLXNlbGVjdDItc2VsZWN0b3InLFxuICBkYXRlUmFuZ2VTZWxlY3RvcjogJy5hcXMtZGF0ZS1yYW5nZS1zZWxlY3RvcicsXG4gIGRlZmF1bHRzOiB7XG4gICAgZGF0ZVJhbmdlOiAnbGFzdC1tb250aCcsXG4gICAgZXhjbHVkZXM6IFtdXG4gIH0sXG4gIG1heERhdGU6IG1vbWVudChtb21lbnQoKS51dGMoKS5zdWJ0cmFjdCgxLCAnZGF5Jykuc3RhcnRPZignZGF5JykudG9EYXRlKCkpLnN0YXJ0T2YoJ2RheScpLnRvRGF0ZSgpLFxuICBtYXhNb250aDogbW9tZW50KCkuc3VidHJhY3QoMSwgJ21vbnRoJykuc3VidHJhY3QoMiwgJ2RheXMnKS5zdGFydE9mKCdtb250aCcpLnRvRGF0ZSgpLFxuICBwYWdlU2l6ZTogMTAwLFxuICBwbGF0Zm9ybVNlbGVjdG9yOiAnI3BsYXRmb3JtLXNlbGVjdCcsXG4gIHByb2plY3RJbnB1dDogJy5hcXMtcHJvamVjdC1pbnB1dCcsXG4gIHZhbGlkYXRlUGFyYW1zOiBbJ3Byb2plY3QnLCAncGxhdGZvcm0nXSxcbiAgdGltZXN0YW1wRm9ybWF0OiAnWVlZWU1NREQwMCdcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY29uZmlnO1xuIiwiLyoqXG4gKiBUb3B2aWV3cyBBbmFseXNpcyB0b29sXG4gKiBAZmlsZSBNYWluIGZpbGUgZm9yIFRvcHZpZXdzIGFwcGxpY2F0aW9uXG4gKiBAYXV0aG9yIE11c2lrQW5pbWFsXG4gKiBAY29weXJpZ2h0IDIwMTYgTXVzaWtBbmltYWxcbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICogQHJlcXVpcmVzIFB2XG4gKi9cblxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcnKTtcbmNvbnN0IFB2ID0gcmVxdWlyZSgnLi4vc2hhcmVkL3B2Jyk7XG5cbi8qKiBNYWluIFRvcFZpZXdzIGNsYXNzICovXG5jbGFzcyBUb3BWaWV3cyBleHRlbmRzIFB2IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgICB0aGlzLmFwcCA9ICd0b3B2aWV3cyc7XG5cbiAgICB0aGlzLmV4Y2x1ZGVzID0gW107XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMubWF4ID0gbnVsbDtcbiAgICB0aGlzLnBhZ2VEYXRhID0gW107XG4gICAgdGhpcy5wYWdlTmFtZXMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogQ2FsbGVkIGluIGBwdi5qc2AgYWZ0ZXIgdHJhbnNsYXRpb25zIGhhdmUgbG9hZGVkXG4gICAqIEByZXR1cm4ge251bGx9IE5vdGhpbmdcbiAgICovXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5wb3BQYXJhbXMoKTtcbiAgICB0aGlzLnVwZGF0ZUludGVyQXBwTGlua3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB1c2VyIGlucHV0IGJ5IHVwZGF0aW5nIHRoZSBVUkwgcXVlcnkgc3RyaW5nIGFuZCB2aWV3LCBpZiBuZWVkZWRcbiAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZSAtIGFwcGx5IGFsbCB1c2VyIG9wdGlvbnMgZXZlbiBpZiB3ZSd2ZSBkZXRlY3RlZCBub3RoaW5nIGhhcyBjaGFuZ2VkXG4gICAqIEByZXR1cm5zIHtEZWZlcnJlZH0gZGVmZXJyZWQgb2JqZWN0IGZyb20gaW5pdERhdGFcbiAgICovXG4gIHByb2Nlc3NJbnB1dChmb3JjZSkge1xuICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcbiAgICB0aGlzLnB1c2hQYXJhbXMoKTtcblxuICAgIC8qKiBwcmV2ZW50IHJlZHVuZGFudCBxdWVyeWluZyAqL1xuICAgIGlmIChsb2NhdGlvbi5zZWFyY2ggPT09IHRoaXMucGFyYW1zICYmICFmb3JjZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnBhcmFtcyA9IGxvY2F0aW9uLnNlYXJjaDtcblxuICAgIHRoaXMucmVzZXRWaWV3KGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcy5pbml0RGF0YSgpLnRoZW4odGhpcy5kcmF3RGF0YS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmludCBsaXN0IG9mIHRvcCBwYWdlc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgZHJhd0RhdGEoKSB7XG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLmh0bWwoJycpO1xuXG4gICAgbGV0IGNvdW50ID0gMCwgaW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKGNvdW50IDwgdGhpcy5jb25maWcucGFnZVNpemUgKyB0aGlzLm9mZnNldCkge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhZ2VEYXRhW2luZGV4KytdO1xuXG4gICAgICBpZiAodGhpcy5leGNsdWRlcy5pbmNsdWRlcyhpdGVtLmFydGljbGUpKSBjb250aW51ZTtcbiAgICAgIGlmICghdGhpcy5tYXgpIHRoaXMubWF4ID0gaXRlbS52aWV3cztcblxuICAgICAgY29uc3Qgd2lkdGggPSAxMDAgKiAoaXRlbS52aWV3cyAvIHRoaXMubWF4KSxcbiAgICAgICAgZGlyZWN0aW9uID0gISFpMThuUnRsID8gJ3RvIGxlZnQnIDogJ3RvIHJpZ2h0JztcblxuICAgICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLmFwcGVuZChcbiAgICAgICAgYDxkaXYgY2xhc3M9J3RvcHZpZXctZW50cnknIGlkPSd0b3B2aWV3LWVudHJ5LSR7aW5kZXh9JyBzdHlsZT0nYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoJHtkaXJlY3Rpb259LCAjRUVFICR7d2lkdGh9JSwgdHJhbnNwYXJlbnQgJHt3aWR0aH0lKSc+XG4gICAgICAgICA8c3BhbiBjbGFzcz0ndG9wdmlldy1lbnRyeS0tcmVtb3ZlIGdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlJyBkYXRhLWFydGljbGUtaWQ9JHtpbmRleCAtIDF9XG4gICAgICAgICAgIHRpdGxlPSdSZW1vdmUgdGhpcyBwYWdlIGZyb20gVG9wdmlld3MgcmFua2luZ3MnIGFyaWEtaGlkZGVuPSd0cnVlJz48L3NwYW4+XG4gICAgICAgICA8c3BhbiBjbGFzcz0ndG9wdmlldy1lbnRyeS0tcmFuayc+JHsrK2NvdW50fTwvc3Bhbj5cbiAgICAgICAgIDxhIGNsYXNzPSd0b3B2aWV3LWVudHJ5LS1sYWJlbCcgaHJlZj1cIiR7dGhpcy5nZXRQYWdlVVJMKGl0ZW0uYXJ0aWNsZSl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtpdGVtLmFydGljbGV9PC9hPlxuICAgICAgICAgPHNwYW4gY2xhc3M9J3RvcHZpZXctZW50cnktLWxlYWRlcic+PC9zcGFuPlxuICAgICAgICAgPGEgY2xhc3M9J3RvcHZpZXctZW50cnktLXZpZXdzJyBocmVmPScke3RoaXMuZ2V0UGFnZXZpZXdzVVJMKGl0ZW0uYXJ0aWNsZSl9Jz4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0udmlld3MpfTwvYT48L2Rpdj5gXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMucHVzaFBhcmFtcygpO1xuICAgIHRoaXMuc3RvcFNwaW5ueSgpO1xuXG4gICAgdGhpcy5hZGRFeGNsdWRlTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGdpdmVuIHBhZ2UocykgdG8gbGlzdCBvZiBleGNsdWRlZCBwYWdlcyBhbmQgb3B0aW9uYWxseSByZS1yZW5kZXIgdGhlIHZpZXdcbiAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IHBhZ2VzIC0gcGFnZShzKSB0byBhZGQgdG8gZXhjbHVkZXNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbdHJpZ2dlckNoYW5nZV0gLSB3aGV0aGVyIG9yIG5vdCB0byByZS1yZW5kZXIgdGhlIHZpZXdcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIGFkZEV4Y2x1ZGUocGFnZXMsIHRyaWdnZXJDaGFuZ2UgPSB0cnVlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VzKSkgcGFnZXMgPSBbcGFnZXNdO1xuXG4gICAgcGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIGlmICghdGhpcy5leGNsdWRlcy5pbmNsdWRlcyhwYWdlKSkge1xuICAgICAgICB0aGlzLmV4Y2x1ZGVzLnB1c2gocGFnZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkuaHRtbCgnJyk7XG5cbiAgICB0aGlzLmV4Y2x1ZGVzLmZvckVhY2goZXhjbHVkZSA9PiB7XG4gICAgICBjb25zdCBlc2NhcGVkVGV4dCA9ICQoJzxkaXY+JykudGV4dChleGNsdWRlKS5odG1sKCk7XG4gICAgICAkKGA8b3B0aW9uPiR7ZXNjYXBlZFRleHR9PC9vcHRpb24+YCkuYXBwZW5kVG8odGhpcy5jb25maWcuc2VsZWN0MklucHV0KTtcbiAgICB9KTtcblxuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCkudmFsKHRoaXMuZXhjbHVkZXMpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlLWFkZCBsaXN0ZW5lcnMgdG8gZXhjbHVkZSBwYWdlcywgY2FsbGVkIGFmdGVyIHNvcnRpbmcgb3IgY2hhbmdpbmcgcGFyYW1zXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBhZGRFeGNsdWRlTGlzdGVuZXJzKCkge1xuICAgICQoJy50b3B2aWV3LWVudHJ5LS1yZW1vdmUnKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICBjb25zdCBwYWdlTmFtZSA9IHRoaXMucGFnZU5hbWVzWyQoZS50YXJnZXQpLmRhdGEoJ2FydGljbGUtaWQnKV07XG4gICAgICB0aGlzLmFkZEV4Y2x1ZGUocGFnZU5hbWUpO1xuICAgICAgdGhpcy5wdXNoUGFyYW1zKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIHRvcHZpZXdzIHNlYXJjaFxuICAgKiBAcmV0dXJuIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBjbGVhclNlYXJjaCgpIHtcbiAgICBpZiAoJCgnLnRvcHZpZXdzLXNlYXJjaC1pY29uJykuaGFzQ2xhc3MoJ2dseXBoaWNvbi1yZW1vdmUnKSkge1xuICAgICAgJCgnI3RvcHZpZXdzX3NlYXJjaF9maWVsZCcpLnZhbCgnJyk7XG4gICAgICAkKCcudG9wdmlld3Mtc2VhcmNoLWljb24nKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXJlbW92ZScpLmFkZENsYXNzKCdnbHlwaGljb24tc2VhcmNoJyk7XG4gICAgICB0aGlzLmRyYXdEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydHMgY3VycmVudCBjaGFydCBkYXRhIHRvIENTViBmb3JtYXQgYW5kIGxvYWRzIGl0IGluIGEgbmV3IHRhYlxuICAgKiBXaXRoIHRoZSBwcmVwZW5kZWQgZGF0YTp0ZXh0L2NzdiB0aGlzIHNob3VsZCBjYXVzZSB0aGUgYnJvd3NlciB0byBkb3dubG9hZCB0aGUgZGF0YVxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGV4cG9ydENTVigpIHtcbiAgICBsZXQgY3N2Q29udGVudCA9ICdkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsUGFnZSxWaWV3c1xcbic7XG5cbiAgICB0aGlzLnBhZ2VEYXRhLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgLy8gQnVpbGQgYW4gYXJyYXkgb2YgcGFnZSB0aXRsZXMgZm9yIHVzZSBpbiB0aGUgQ1NWIGhlYWRlclxuICAgICAgbGV0IHRpdGxlID0gJ1wiJyArIGVudHJ5LmFydGljbGUucmVwbGFjZSgvXCIvZywgJ1wiXCInKSArICdcIic7XG5cbiAgICAgIGNzdkNvbnRlbnQgKz0gYCR7dGl0bGV9LCR7ZW50cnkudmlld3N9XFxuYDtcbiAgICB9KTtcblxuICAgIHRoaXMuZG93bmxvYWREYXRhKGNzdkNvbnRlbnQsICdjc3YnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHBvcnRzIGN1cnJlbnQgY2hhcnQgZGF0YSB0byBKU09OIGZvcm1hdCBhbmQgbG9hZHMgaXQgaW4gYSBuZXcgdGFiXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgZXhwb3J0SlNPTigpIHtcbiAgICBjb25zdCBqc29uQ29udGVudCA9ICdkYXRhOnRleHQvanNvbjtjaGFyc2V0PXV0Zi04LCcgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2VEYXRhKTtcbiAgICB0aGlzLmRvd25sb2FkRGF0YShqc29uQ29udGVudCwgJ2pzb24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5mb3JtYXRpdmUgZmlsZW5hbWUgd2l0aG91dCBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3IgZXhwb3J0IG9wdGlvbnNcbiAgICogQHJldHVybiB7c3RyaW5nfSBmaWxlbmFtZSB3aXRob3V0IGFuIGV4dGVuc2lvblxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGdldEV4cG9ydEZpbGVuYW1lKCkge1xuICAgIGNvbnN0IGRhdGVwaWNrZXJWYWx1ZSA9IHRoaXMuZGF0ZXBpY2tlci5nZXREYXRlKCk7XG4gICAgbGV0IGRhdGU7XG5cbiAgICBpZiAodGhpcy5pc01vbnRobHkoKSkge1xuICAgICAgZGF0ZSA9IG1vbWVudChkYXRlcGlja2VyVmFsdWUpLmZvcm1hdCgnWVlZWS9NTScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlID0gbW9tZW50KGRhdGVwaWNrZXJWYWx1ZSkuZm9ybWF0KCdZWVlZL01NL0REJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke3RoaXMuYXBwfS0ke2RhdGV9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rIHRvIC9wYWdldmlld3MgZm9yIGdpdmVuIGFydGljbGUgYW5kIGNob3NlbiBkYXRlcmFuZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFydGljbGUgLSBwYWdlIG5hbWVcbiAgICogQHJldHVybnMge3N0cmluZ30gVVJMXG4gICAqL1xuICBnZXRQYWdldmlld3NVUkwoYXJ0aWNsZSkge1xuICAgIC8vIGZpcnN0IGdldCB0aGUgZGF0ZSByYW5nZVxuICAgIGNvbnN0IGRhdGUgPSBtb21lbnQodGhpcy5kYXRlcGlja2VyLmdldERhdGUoKSk7XG4gICAgbGV0IHN0YXJ0RGF0ZSwgZW5kRGF0ZTtcbiAgICBpZiAodGhpcy5pc01vbnRobHkoKSkge1xuICAgICAgc3RhcnREYXRlID0gZGF0ZS5mb3JtYXQoJ1lZWVktTU0tMDEnKTtcbiAgICAgIGVuZERhdGUgPSBkYXRlLmVuZE9mKCdtb250aCcpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdXJyb3VuZCBzaW5nbGUgZGF0ZXMgd2l0aCAzIGRheXMgdG8gbWFrZSB0aGUgcGFnZXZpZXdzIGNoYXJ0IG1lYW5pbmdmdWxcbiAgICAgIHN0YXJ0RGF0ZSA9IG1vbWVudChkYXRlKS5zdWJ0cmFjdCgzLCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgZW5kRGF0ZSA9IGRhdGUuYWRkKDMsICdkYXlzJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGxhdGZvcm0gPSAkKHRoaXMuY29uZmlnLnBsYXRmb3JtU2VsZWN0b3IpLnZhbCgpLFxuICAgICAgcHJvamVjdCA9ICQodGhpcy5jb25maWcucHJvamVjdElucHV0KS52YWwoKTtcblxuICAgIHJldHVybiBgL3BhZ2V2aWV3cz9zdGFydD0ke3N0YXJ0RGF0ZX0mZW5kPSR7ZW5kRGF0ZX0mcHJvamVjdD0ke3Byb2plY3R9JnBsYXRmb3JtPSR7cGxhdGZvcm19JnBhZ2VzPSR7YXJ0aWNsZX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgdXNlci1pbnB1dHRlZCBwYXJhbWV0ZXJzIGV4Y2VwdCB0aGUgcGFnZXNcbiAgICogQHBhcmFtIHtib29sZWFufSBbc3BlY2lhbFJhbmdlXSB3aGV0aGVyIG9yIG5vdCB0byBpbmNsdWRlIHRoZSBzcGVjaWFsIHJhbmdlIGluc3RlYWQgb2Ygc3RhcnQvZW5kLCBpZiBhcHBsaWNhYmxlXG4gICAqIEByZXR1cm4ge09iamVjdH0gcHJvamVjdCwgcGxhdGZvcm0sIGV4Y2x1ZGVzLCBldGMuXG4gICAqL1xuICBnZXRQYXJhbXMoc3BlY2lhbFJhbmdlID0gdHJ1ZSkge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBwcm9qZWN0OiAkKHRoaXMuY29uZmlnLnByb2plY3RJbnB1dCkudmFsKCksXG4gICAgICBwbGF0Zm9ybTogJCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwoKVxuICAgIH07XG5cbiAgICBjb25zdCBkYXRlcGlja2VyVmFsdWUgPSB0aGlzLmRhdGVwaWNrZXIuZ2V0RGF0ZSgpO1xuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgc3RhcnQgYW5kIGVuZCB3aXRoIGN1c3RvbSByYW5nZSB2YWx1ZXMsXG4gICAgICogICBpZiBjb25maWd1cmVkIChzZXQgYnkgVVJMIHBhcmFtcyBvciBzZXR1cERhdGVSYW5nZVNlbGVjdG9yKVxuICAgICAqL1xuICAgIGlmICh0aGlzLnNwZWNpYWxSYW5nZSAmJiBzcGVjaWFsUmFuZ2UpIHtcbiAgICAgIHBhcmFtcy5kYXRlID0gdGhpcy5zcGVjaWFsUmFuZ2UucmFuZ2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzTW9udGhseSgpKSB7XG4gICAgICBwYXJhbXMuZGF0ZSA9IG1vbWVudChkYXRlcGlja2VyVmFsdWUpLmZvcm1hdCgnWVlZWS1NTScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMuZGF0ZSA9IG1vbWVudChkYXRlcGlja2VyVmFsdWUpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhcmFtcyBuZWVkZWQgdG8gY3JlYXRlIGEgcGVybWFuZW50IGxpbmsgb2YgdmlzaWJsZSBkYXRhXG4gICAqIEByZXR1cm4ge09iamVjdH0gaGFzaCBvZiBwYXJhbXNcbiAgICovXG4gIGdldFBlcm1hTGluaygpIHtcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMoZmFsc2UpO1xuICAgIGRlbGV0ZSBwYXJhbXMucmFuZ2U7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZGF0ZXBpY2tlciBiYXNlZCBvbiBwcm92aWRlZCByZWxhdGl2ZSByYW5nZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmFuZ2UgLSBlLmcuICdsYXN0LW1vbnRoJywgJ3llc3RlcmRheSdcbiAgICogQHJldHVybnMge0Jvb2xlYW59IHdoZXRoZXIgYSB2YWxpZCByYW5nZSB3YXMgcHJvdmlkZWQgYW5kIHdhcyBzZXRcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBzZXRTcGVjaWFsUmFuZ2UocmFuZ2UpIHtcbiAgICBpZiAocmFuZ2UgPT09ICdsYXN0LW1vbnRoJykge1xuICAgICAgdGhpcy5zZXR1cERhdGVSYW5nZVNlbGVjdG9yKCdtb250aGx5Jyk7XG4gICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0RGF0ZSh0aGlzLmNvbmZpZy5tYXhNb250aCk7XG4gICAgICB0aGlzLnNwZWNpYWxSYW5nZSA9IHtcbiAgICAgICAgcmFuZ2UsXG4gICAgICAgIHZhbHVlOiBtb21lbnQodGhpcy5jb25maWcubWF4TW9udGgpLmZvcm1hdCgnWVlZWS9NTScpXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAocmFuZ2UgPT09ICd5ZXN0ZXJkYXknKSB7XG4gICAgICB0aGlzLnNldHVwRGF0ZVJhbmdlU2VsZWN0b3IoJ2RhaWx5Jyk7XG4gICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0RGF0ZSh0aGlzLmNvbmZpZy5tYXhEYXRlKTtcbiAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0ge1xuICAgICAgICByYW5nZSxcbiAgICAgICAgdmFsdWU6IG1vbWVudCh0aGlzLmNvbmZpZy5tYXhEYXRlKS5mb3JtYXQoJ1lZWVktTU0tREQnKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBkYXRlcGlja2VyIGJhc2VkIG9uIHByb3ZpZGVkIGRhdGUgb3IgcmFuZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGVJbnB1dCAtIGVpdGhlciBhIHJhbmdlIGxpa2UgJ2xhc3QtbW9udGgnLCAneWVzdGVyZGF5JyBvciBkYXRlIHdpdGggZm9ybWF0ICdZWVlZLU1NLUREJ1xuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgc2V0RGF0ZShkYXRlSW5wdXQpIHtcbiAgICBsZXQgZGF0ZTtcblxuICAgIGlmICgvXFxkezR9LVxcZHsyfSQvLnRlc3QoZGF0ZUlucHV0KSkge1xuICAgICAgLy8gbW9udGhseVxuICAgICAgdGhpcy5zZXR1cERhdGVSYW5nZVNlbGVjdG9yKCdtb250aGx5Jyk7XG4gICAgICBkYXRlID0gbW9tZW50KGAke2RhdGVJbnB1dH0tMDFgKS50b0RhdGUoKTtcblxuICAgICAgLy8gaWYgb3ZlciBtYXgsIHNldCB0byBtYXhcbiAgICAgIGlmIChkYXRlID4gdGhpcy5jb25maWcubWF4TW9udGgpIHtcbiAgICAgICAgZGF0ZSA9IHRoaXMuY29uZmlnLm1heE1vbnRoO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL1xcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlSW5wdXQpKSB7XG4gICAgICAvLyBkYWlseVxuICAgICAgdGhpcy5zZXR1cERhdGVSYW5nZVNlbGVjdG9yKCdkYWlseScpO1xuICAgICAgZGF0ZSA9IG1vbWVudChkYXRlSW5wdXQpLnRvRGF0ZSgpO1xuXG4gICAgICAvLyBpZiBvdmVyIG1heCwgc2V0IHRvIG1heCAoVG9wdmlld3MgbWF4RGF0ZSBpcyBhIERhdGUgb2JqZWN0LCBub3QgbW9tZW50KVxuICAgICAgaWYgKGRhdGUgPiB0aGlzLmNvbmZpZy5tYXhEYXRlKSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLmNvbmZpZy5tYXhEYXRlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdHRlbXB0IHRvIHNldCBhcyBzcGVjaWFsIHJhbmdlLCBvciBkZWZhdWx0IHJhbmdlIGlmIHJhbmdlIGlzIGludmFsaWRcbiAgICAgIHJldHVybiB0aGlzLnNldFNwZWNpYWxSYW5nZShkYXRlSW5wdXQpIHx8IHRoaXMuc2V0U3BlY2lhbFJhbmdlKHRoaXMuY29uZmlnLmRlZmF1bHRzLmRhdGVSYW5nZSk7XG4gICAgfVxuXG4gICAgLy8gaWYgbGVzcyB0aGFuIG1pbiwgdGhyb3cgZXJyb3IgKHNpbmNlIHRoaXMgaXMgYSBjb21tb24gcmVxdWVzdClcbiAgICBpZiAoZGF0ZSA8IHRoaXMuY29uZmlnLm1pbkRhdGUudG9EYXRlKCkpIHtcbiAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZSgnZXJyb3InLFxuICAgICAgICAvLyB1c2Ugc3VwZXIuZGF0ZUZvcm1hdCBzaW5jZSB0aGlzIGlzIGZvciBtb21lbnQsIG5vdCBmb3Igb3VyIGRhdGVwaWNrZXJcbiAgICAgICAgJC5pMThuKCdwYXJhbS1lcnJvci0xJywgbW9tZW50KHRoaXMuY29uZmlnLm1pbkRhdGUpLmZvcm1hdChzdXBlci5kYXRlRm9ybWF0KSksXG4gICAgICAgICQuaTE4bignaW52YWxpZC1wYXJhbXMnKSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICAgIGRhdGUgPSB0aGlzLmNvbmZpZy5taW5EYXRlLnRvRGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGVwaWNrZXIuc2V0RGF0ZShkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIFVSTCBxdWVyeSBzdHJpbmcgYW5kIHNldHMgYWxsIHRoZSBpbnB1dHMgYWNjb3JkaW5nbHlcbiAgICogU2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGluaXRpYWwgcGFnZSBsb2FkLCB1bnRpbCB3ZSBkZWNpZGUgdG8gc3VwcG9ydCBwb3Agc3RhdGVzIChwcm9iYWJseSBuZXZlcilcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHBvcFBhcmFtcygpIHtcbiAgICAvKiogc2hvdyBsb2FkaW5nIGluZGljYXRvciBhbmQgYWRkIGVycm9yIGhhbmRsaW5nIGZvciB0aW1lb3V0cyAqL1xuICAgIHRoaXMuc3RhcnRTcGlubnkoKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMudmFsaWRhdGVQYXJhbXMoXG4gICAgICB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoJ2V4Y2x1ZGVzJylcbiAgICApO1xuXG4gICAgLy8gRklYTUU6IHJlbW92ZSBvbmNlIGFsbCBhZmZlY3RlZCB3aWtpcy9saW5rcyBoYXZlIGJlZW4gdXBkYXRlZFxuICAgIGlmIChwYXJhbXMucmFuZ2UgfHwgcGFyYW1zLnN0YXJ0IHx8IHBhcmFtcy5lbmQpIHtcbiAgICAgIHRoaXMuZml4TGVnYWN5RGF0ZXMocGFyYW1zKTtcbiAgICAgIHRoaXMuYWRkU2l0ZU5vdGljZShcbiAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICBgQ3VzdG9tIGRhdGUgcmFuZ2VzIGFyZSBubyBsb25nZXIgc3VwcG9ydGVkLiBTZWUgdGhlIG9mZmljaWFsIGFubm91Y2VtZW50XG4gICAgICAgICAgPGEgaHJlZj0nLy9tZXRhLndpa2ltZWRpYS5vcmcvd2lraS9UYWxrOlBhZ2V2aWV3c19BbmFseXNpcyNUb3B2aWV3c19yZXZhbXBlZCc+aGVyZTwvYT4uYCxcbiAgICAgICAgJ1RvcHZpZXdzIGhhcyBiZWVuIHJldmFtcGVkIScsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXREYXRlKHBhcmFtcy5kYXRlKTsgLy8gYWxzbyBwZXJmb3JtcyB2YWxpZGF0aW9uc1xuXG4gICAgJCh0aGlzLmNvbmZpZy5wcm9qZWN0SW5wdXQpLnZhbChwYXJhbXMucHJvamVjdCk7XG4gICAgJCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS52YWwocGFyYW1zLnBsYXRmb3JtKTtcbiAgICB0aGlzLnBhdGNoVXNhZ2UoKTtcblxuICAgIHRoaXMuZXhjbHVkZXMgPSAocGFyYW1zLmV4Y2x1ZGVzIHx8IFtdKS5tYXAoZXhjbHVkZSA9PiBleGNsdWRlLmRlc2NvcmUoKSk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IGxvY2F0aW9uLnNlYXJjaDtcblxuICAgIHRoaXMuaW5pdERhdGEoKS5kb25lKCgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0RhdGEoKTtcbiAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgdGhpcy5zZXR1cFNlbGVjdDIoKTtcbiAgICAgIHRoaXMuc2V0dXBMaXN0ZW5lcnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXggbGVnYWN5IGxpbmtzIHRvIFRvcHZpZXdzIHRoYXQgdXNlZCBhIGRlZmluZWQgZGF0ZSByYW5nZS5cbiAgICogSW5zdGVhZCwgd2UnbGwgZGV0ZXJtaW5lIGhvdyB3aWRlIHRoZSByYW5nZSBpcywgYW5kIGlmIGl0J3MgZ3JlYXRlciB0aGFuIDMgZGF5c1xuICAgKiAgIHRoZW4gdXNlIHRoZSBtb250aCwgb3RoZXJ3aXNlIHVzZSB0aGUgZmlyc3QgZGF5IG9mIHRoZSByYW5nZVxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gcGFyYW1zIGFzIHByb3ZpZGVkIGJ5IHRoaXMucGFyc2VRdWVyeVN0cmluZ1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBtb2RpZmllZCBwYXJhbXMgd2l0aCBjb3JyZWN0ZWQgZGF0ZXNcbiAgICovXG4gIGZpeExlZ2FjeURhdGVzKHBhcmFtcykge1xuICAgIC8vIGFsbCBpcyB3ZWxsIGlmIHdlIHdlcmUgZ2l2ZW4gYSBkYXRlIHBhcmFtZXRlciAobmV3IHZlcnNpb24pXG4gICAgLy8gICBvciBpZiBubyBkYXRlIHBhcmFtcyB3ZXJlIHByb3ZpZGVkXG4gICAgaWYgKHBhcmFtcy5kYXRlIHx8ICghcGFyYW1zLnN0YXJ0ICYmICFwYXJhbXMuZW5kICYmICFwYXJhbXMucmFuZ2UpKSByZXR1cm4gcGFyYW1zO1xuXG4gICAgLy8gdXNlIGxhc3QtbW9udGggaWYgYW55IHJhbmdlIHdhcyBwcm92aWRlZFxuICAgIGlmIChwYXJhbXMucmFuZ2UpIHtcbiAgICAgIHBhcmFtcy5kYXRlID0gJ2xhc3QtbW9udGgnO1xuICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICAvLyBpZiBpbnZhbGlkIHN0YXJ0L2VuZCB1c2UgbGFzdC1tb250aFxuICAgIGNvbnN0IGRhdGVSZWdleCA9IC9cXGR7NH0tXFxkezJ9LVxcZHsyfSQvO1xuICAgIGlmICghZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLnN0YXJ0KSAmJiAhZGF0ZVJlZ2V4LnRlc3QocGFyYW1zLmVuZCkpIHtcbiAgICAgIHBhcmFtcy5kYXRlID0gJ2xhc3QtbW9udGgnO1xuICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBjb25zdCBzdGFydERhdGUgPSBtb21lbnQocGFyYW1zLnN0YXJ0LCAnWVlZWS1NTS1ERCcpLFxuICAgICAgZW5kRGF0ZSA9IG1vbWVudChwYXJhbXMuZW5kLCAnWVlZWS1NTS1ERCcpLFxuICAgICAgbnVtRGF5cyA9IE1hdGguYWJzKGVuZERhdGUuZGlmZihzdGFydERhdGUsICdkYXlzJykpO1xuXG4gICAgaWYgKG51bURheXMgPiAzKSB7XG4gICAgICBwYXJhbXMuZGF0ZSA9IHN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYW1zLmRhdGUgPSBwYXJhbXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBoaXN0b3J5IHN0YXRlIHdpdGggbmV3IFVSTCBxdWVyeSBzdHJpbmcgcmVwcmVzZW50aW5nIGN1cnJlbnQgdXNlciBpbnB1dFxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgd2UgZ28gdG8gdXBkYXRlIHRoZSBjaGFydFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKi9cbiAgcHVzaFBhcmFtcygpIHtcbiAgICBjb25zdCBleGNsdWRlcyA9IHRoaXMudW5kZXJzY29yZVBhZ2VOYW1lcyh0aGlzLmV4Y2x1ZGVzKS5qb2luKCd8JykucmVwbGFjZSgvWyYlXS9nLCBlc2NhcGUpO1xuXG4gICAgaWYgKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgYD8keyQucGFyYW0odGhpcy5nZXRQYXJhbXMoKSl9JmV4Y2x1ZGVzPSR7ZXhjbHVkZXN9YCk7XG4gICAgfVxuXG4gICAgJCgnLnBlcm1hbGluaycpLnByb3AoJ2hyZWYnLCBgPyR7JC5wYXJhbSh0aGlzLmdldFBlcm1hTGluaygpKX0mZXhjbHVkZXM9JHtleGNsdWRlc31gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBTZWxlY3QyIHJlbGF0ZWQgc3R1ZmYgdGhlbiBhZGRzIGl0IGJhY2tcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICovXG4gIHJlc2V0U2VsZWN0MigpIHtcbiAgICBjb25zdCBzZWxlY3QySW5wdXQgPSAkKHRoaXMuY29uZmlnLnNlbGVjdDJJbnB1dCk7XG4gICAgc2VsZWN0MklucHV0Lm9mZignY2hhbmdlJyk7XG4gICAgc2VsZWN0MklucHV0LnZhbChudWxsKTtcbiAgICBzZWxlY3QySW5wdXQuaHRtbCgnJyk7XG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoJ2RhdGEnLCBudWxsKTtcbiAgICBzZWxlY3QySW5wdXQuc2VsZWN0MignZGVzdHJveScpO1xuICAgIHRoaXMuc2V0dXBTZWxlY3QyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBjaGFydCwgbWVzc2FnZXMsIGFuZCByZXNldHMgU2VsZWN0MiBzZWxlY3Rpb25zXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICByZXNldFZpZXcoY2xlYXJTZWxlY3RvciA9IHRydWUpIHtcbiAgICB0aGlzLm1heCA9IG51bGw7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMucGFnZURhdGEgPSBbXTtcbiAgICB0aGlzLnBhZ2VOYW1lcyA9IFtdO1xuICAgIHRoaXMuc3RvcFNwaW5ueSh0cnVlKTtcbiAgICAkKCcuY2hhcnQtY29udGFpbmVyJykuaHRtbCgnJyk7XG4gICAgJCgnLm1lc3NhZ2UtY29udGFpbmVyJykuaHRtbCgnJyk7XG4gICAgaWYgKGNsZWFyU2VsZWN0b3IpIHtcbiAgICAgIHRoaXMucmVzZXRTZWxlY3QyKCk7XG4gICAgICB0aGlzLmV4Y2x1ZGVzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgdG9wdmlld3MgZGF0YSBmb3IgdGhlIGdpdmVuIHBhZ2UgdGl0bGVcbiAgICogYW5kIHJlc3RyaWN0IHRoZSB2aWV3IHRvIHRoZSBtYXRjaGVzXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqL1xuICBzZWFyY2hUb3B2aWV3cygpIHtcbiAgICBjb25zdCBxdWVyeSA9ICQoJyN0b3B2aWV3c19zZWFyY2hfZmllbGQnKS52YWwoKTtcblxuICAgIGlmICghcXVlcnkpIHJldHVybiB0aGlzLmNsZWFyU2VhcmNoKCk7XG5cbiAgICBsZXQgbWF0Y2hlZERhdGEgPSBbXSwgY291bnQgPSAwO1xuXG4gICAgLy8gYWRkIHJhbmtpbmcgdG8gcGFnZURhdGEgYW5kIGZldGNoIG1hdGNoZXNcbiAgICB0aGlzLnBhZ2VEYXRhLmZvckVhY2goKGVudHJ5LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmV4Y2x1ZGVzLmluY2x1ZGVzKGVudHJ5LmFydGljbGUpKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGlmIChuZXcgUmVnRXhwKHF1ZXJ5LCAnaScpLnRlc3QoZW50cnkuYXJ0aWNsZSkpIHtcbiAgICAgICAgICBlbnRyeS5yYW5rID0gY291bnQ7XG4gICAgICAgICAgZW50cnkuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaGVkRGF0YS5wdXNoKGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnLmNoYXJ0LWNvbnRhaW5lcicpLmh0bWwoJycpO1xuICAgICQoJy5leHBhbmQtY2hhcnQnKS5oaWRlKCk7XG4gICAgJCgnLnRvcHZpZXdzLXNlYXJjaC1pY29uJykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi1zZWFyY2gnKS5hZGRDbGFzcygnZ2x5cGhpY29uLXJlbW92ZScpO1xuXG4gICAgbWF0Y2hlZERhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoID0gMTAwICogKGl0ZW0udmlld3MgLyB0aGlzLm1heCksXG4gICAgICAgIGRpcmVjdGlvbiA9ICEhaTE4blJ0bCA/ICd0byBsZWZ0JyA6ICd0byByaWdodCc7XG5cbiAgICAgICQoJy5jaGFydC1jb250YWluZXInKS5hcHBlbmQoXG4gICAgICAgIGA8ZGl2IGNsYXNzPSd0b3B2aWV3LWVudHJ5JyBzdHlsZT0nYmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoJHtkaXJlY3Rpb259LCAjRUVFICR7d2lkdGh9JSwgdHJhbnNwYXJlbnQgJHt3aWR0aH0lKSc+XG4gICAgICAgICA8c3BhbiBjbGFzcz0ndG9wdmlldy1lbnRyeS0tcmVtb3ZlIGdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlJyBkYXRhLWFydGljbGUtaWQ9JHtpdGVtLmluZGV4fSBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9zcGFuPlxuICAgICAgICAgPHNwYW4gY2xhc3M9J3RvcHZpZXctZW50cnktLXJhbmsnPiR7aXRlbS5yYW5rfTwvc3Bhbj5cbiAgICAgICAgIDxhIGNsYXNzPSd0b3B2aWV3LWVudHJ5LS1sYWJlbCcgaHJlZj1cIiR7dGhpcy5nZXRQYWdlVVJMKGl0ZW0uYXJ0aWNsZSl9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtpdGVtLmFydGljbGV9PC9hPlxuICAgICAgICAgPHNwYW4gY2xhc3M9J3RvcHZpZXctZW50cnktLWxlYWRlcic+PC9zcGFuPlxuICAgICAgICAgPGEgY2xhc3M9J3RvcHZpZXctZW50cnktLXZpZXdzJyBocmVmPScke3RoaXMuZ2V0UGFnZXZpZXdzVVJMKGl0ZW0uYXJ0aWNsZSl9Jz4ke3RoaXMuZm9ybWF0TnVtYmVyKGl0ZW0udmlld3MpfTwvYT48L2Rpdj5gXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRFeGNsdWRlTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbHMgcGFyZW50IHNldHVwUHJvamVjdElucHV0IGFuZCB1cGRhdGVzIHRoZSB2aWV3IGlmIHZhbGlkYXRpb25zIHBhc3NlZFxuICAgKiAgIHJldmVydGluZyB0byB0aGUgb2xkIHZhbHVlIGlmIHRoZSBuZXcgb25lIGlzIGludmFsaWRcbiAgICogQHJldHVybnMge251bGx9IG5vdGhpbmdcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICB2YWxpZGF0ZVByb2plY3QoZSkge1xuICAgIGlmIChzdXBlci52YWxpZGF0ZVByb2plY3QoZSkpIHtcbiAgICAgIHRoaXMucmVzZXRWaWV3KHRydWUpO1xuICAgICAgdGhpcy5wcm9jZXNzSW5wdXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgU2VsZWN0MiBzZWxlY3RvciBhbmQgYWRkcyBsaXN0ZW5lciB0byB1cGRhdGUgY2hhcnRcbiAgICogQHBhcmFtIHthcnJheX0gZXhjbHVkZXMgLSBkZWZhdWx0IHBhZ2UgbmFtZXMgdG8gZXhjbHVkZVxuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cFNlbGVjdDIoZXhjbHVkZXMgPSB0aGlzLmV4Y2x1ZGVzKSB7XG4gICAgY29uc3Qgc2VsZWN0MklucHV0ID0gJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpO1xuXG4gICAgc2VsZWN0MklucHV0LnNlbGVjdDIoe1xuICAgICAgZGF0YTogW10sXG4gICAgICBtYXhpbXVtU2VsZWN0aW9uTGVuZ3RoOiA1MCxcbiAgICAgIG1pbmltdW1JbnB1dExlbmd0aDogMCxcbiAgICAgIHBsYWNlaG9sZGVyOiAkLmkxOG4oJ2hvdmVyLXRvLWV4Y2x1ZGUnKVxuICAgIH0pO1xuXG4gICAgaWYgKGV4Y2x1ZGVzLmxlbmd0aCkgdGhpcy5zZXRTZWxlY3QyRGVmYXVsdHMoZXhjbHVkZXMpO1xuXG4gICAgc2VsZWN0MklucHV0Lm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIHRoaXMuZXhjbHVkZXMgPSAkKGUudGFyZ2V0KS52YWwoKSB8fCBbXTtcbiAgICAgIHRoaXMubWF4ID0gbnVsbDtcbiAgICAgIHRoaXMuY2xlYXJTZWFyY2goKTtcbiAgICAgIHRoaXMuZHJhd0RhdGEoKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIGZvciB0b3B2aWV3cyB3ZSBkb24ndCB3YW50IHRoZSB1c2VyIGlucHV0IGZ1bmN0aW9uYWxpdHkgb2YgU2VsZWN0MlxuICAgICAqIHNldFRpbWVvdXQgb2YgMCB0byBsZXQgcmVuZGVyaW5nIHRocmVhZHMgY2F0Y2ggdXAgYW5kIGFjdHVhbGx5IGRpc2FibGUgdGhlIGZpZWxkXG4gICAgICovXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAkKCcuc2VsZWN0Mi1zZWFyY2hfX2ZpZWxkJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXJlY3RseSBzZXQgcGFnZXMgaW4gU2VsZWN0MiBzZWxlY3RvclxuICAgKiBDdXJyZW50bHkgaXMgbm90IGFibGUgdG8gcmVtb3ZlIHVuZGVyc2NvcmUgZnJvbSBwYWdlIG5hbWVzXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBhZ2VzIC0gcGFnZSB0aXRsZXNcbiAgICogQHJldHVybnMge2FycmF5fSAtIHVudG91Y2hlZCBhcnJheSBvZiBwYWdlc1xuICAgKi9cbiAgc2V0U2VsZWN0MkRlZmF1bHRzKHBhZ2VzKSB7XG4gICAgcGFnZXMgPSBwYWdlcy5tYXAocGFnZSA9PiB7XG4gICAgICAvLyBwYWdlID0gcGFnZS5yZXBsYWNlKC8gL2csICdfJyk7XG4gICAgICBjb25zdCBlc2NhcGVkVGV4dCA9ICQoJzxkaXY+JykudGV4dChwYWdlKS5odG1sKCk7XG4gICAgICAkKCc8b3B0aW9uPicgKyBlc2NhcGVkVGV4dCArICc8L29wdGlvbj4nKS5hcHBlbmRUbyh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpO1xuICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgfSk7XG4gICAgJCh0aGlzLmNvbmZpZy5zZWxlY3QySW5wdXQpLnNlbGVjdDIoJ3ZhbCcsIHBhZ2VzKTtcblxuICAgIHJldHVybiBwYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRzIHVwIHRoZSBkYXRlcGlja2VyIGJhc2VkIG9uIGdpdmVuIHR5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlXSAtIGVpdGhlciAnbW9udGhseScgb3IgJ2RhaWx5J1xuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgc2V0dXBEYXRlUmFuZ2VTZWxlY3Rvcih0eXBlID0gJ21vbnRobHknKSB7XG4gICAgJCgnI2RhdGUtdHlwZS1zZWxlY3QnKS52YWwodHlwZSk7XG5cbiAgICBjb25zdCBkYXRlcGlja2VyUGFyYW1zID0gdHlwZSA9PT0gJ21vbnRobHknID8ge1xuICAgICAgZm9ybWF0OiAnTU0geXl5eScsXG4gICAgICB2aWV3TW9kZTogJ21vbnRocycsXG4gICAgICBtaW5WaWV3TW9kZTogJ21vbnRocycsXG4gICAgICBlbmREYXRlOiB0aGlzLmNvbmZpZy5tYXhNb250aFxuICAgIH0gOiB7XG4gICAgICBmb3JtYXQ6IHRoaXMuZGF0ZUZvcm1hdCxcbiAgICAgIHZpZXdNb2RlOiAnZGF5cycsXG4gICAgICBlbmREYXRlOiB0aGlzLmNvbmZpZy5tYXhEYXRlXG4gICAgfTtcblxuICAgICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLmRhdGVwaWNrZXIoJ2Rlc3Ryb3knKTtcbiAgICAkKHRoaXMuY29uZmlnLmRhdGVSYW5nZVNlbGVjdG9yKS5kYXRlcGlja2VyKFxuICAgICAgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGF1dG9jbG9zZTogdHJ1ZSxcbiAgICAgICAgc3RhcnREYXRlOiB0aGlzLmNvbmZpZy5taW5EYXRlLnRvRGF0ZSgpXG4gICAgICB9LCBkYXRlcGlja2VyUGFyYW1zKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhbCBwbGFjZSB0byBhZGQgcGFnZS13aWRlIGxpc3RlbmVyc1xuICAgKiBAcmV0dXJucyB7bnVsbH0gLSBub3RoaW5nXG4gICAqL1xuICBzZXR1cExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXR1cExpc3RlbmVycygpO1xuXG4gICAgJCh0aGlzLmNvbmZpZy5wbGF0Zm9ybVNlbGVjdG9yKS5vbignY2hhbmdlJywgdGhpcy5wcm9jZXNzSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgJCgnI2RhdGUtdHlwZS1zZWxlY3QnKS5vbignY2hhbmdlJywgZSA9PiB7XG4gICAgICAvLyBhbHNvIGNhbGxzIHNldHVwRGF0ZVJhbmdlU2VsZWN0b3JcbiAgICAgIHRoaXMuc2V0U3BlY2lhbFJhbmdlKHRoaXMuaXNNb250aGx5KCkgPyAnbGFzdC1tb250aCcgOiAneWVzdGVyZGF5Jyk7XG4gICAgfSk7XG4gICAgJCgnLmV4cGFuZC1jaGFydCcpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMub2Zmc2V0ICs9IHRoaXMuY29uZmlnLnBhZ2VTaXplO1xuICAgICAgdGhpcy5kcmF3RGF0YSgpO1xuICAgIH0pO1xuICAgICQodGhpcy5jb25maWcuZGF0ZVJhbmdlU2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgIC8qKiBjbGVhciBvdXQgc3BlY2lhbFJhbmdlIGlmIGl0IGRvZXNuJ3QgbWF0Y2ggb3VyIGlucHV0ICovXG4gICAgICBpZiAodGhpcy5zcGVjaWFsUmFuZ2UgJiYgdGhpcy5zcGVjaWFsUmFuZ2UudmFsdWUgIT09IGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3BlY2lhbFJhbmdlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvY2Vzc0lucHV0KCk7XG4gICAgfSk7XG4gICAgJCgnLm1haW5zcGFjZS1vbmx5LW9wdGlvbicpLm9uKCdjbGljaycsIHRoaXMucHJvY2Vzc0lucHV0LmJpbmQodGhpcykpO1xuICAgICQoJyN0b3B2aWV3c19zZWFyY2hfZmllbGQnKS5vbigna2V5dXAnLCB0aGlzLnNlYXJjaFRvcHZpZXdzLmJpbmQodGhpcykpO1xuICAgICQoJy50b3B2aWV3cy1zZWFyY2gtaWNvbicpLm9uKCdjbGljaycsIHRoaXMuY2xlYXJTZWFyY2guYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBsb2FkaW5nIGluZGljYXRvciBjbGFzcyBhbmQgc2V0IHRoZSBzYWZlZ3VhcmQgdGltZW91dFxuICAgKiBAcmV0dXJucyB7bnVsbH0gbm90aGluZ1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHN0YXJ0U3Bpbm55KCkge1xuICAgIHN1cGVyLnN0YXJ0U3Bpbm55KCk7XG4gICAgJCgnLmV4cGFuZC1jaGFydCcpLmhpZGUoKTtcbiAgICAkKCcuZGF0YS1saW5rcycpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICAkKCcuc2VhcmNoLXRvcHZpZXdzJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICQoJy5kYXRhLW5vdGljZScpLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgbG9hZGluZyBpbmRpY2F0b3IgY2xhc3MgYW5kIGNsZWFyIHRoZSBzYWZlZ3VhcmQgdGltZW91dFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGhpZGVEYXRhTGlua3MgLSB3aGV0aGVyIG9yIG5vdCB0byBoaWRlIHRoZSBkYXRhIGxpbmtzXG4gICAqIEByZXR1cm5zIHtudWxsfSBub3RoaW5nXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgc3RvcFNwaW5ueShoaWRlRGF0YUxpbmtzKSB7XG4gICAgc3VwZXIuc3RvcFNwaW5ueSgpO1xuICAgIGlmICghaGlkZURhdGFMaW5rcykge1xuICAgICAgJCgnLmRhdGEtbGlua3MnKS5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAkKCcuc2VhcmNoLXRvcHZpZXdzJykucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgJCgnLmRhdGEtbm90aWNlJykucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgJCgnLmV4cGFuZC1jaGFydCcpLnNob3coKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGUgZm9ybWF0IHRvIHVzZSBiYXNlZCBvbiBzZXR0aW5nc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkYXRlIGZvcm1hdCB0byBwYXNzZWQgdG8gcGFyc2VyXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgZ2V0IGRhdGVGb3JtYXQoKSB7XG4gICAgcmV0dXJuIHN1cGVyLmRhdGVGb3JtYXQudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW5zdGFuY2Ugb2YgZGF0ZXBpY2tlclxuICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkYXRlcGlja2VyIGluc3RhbmNlXG4gICAqL1xuICBnZXQgZGF0ZXBpY2tlcigpIHtcbiAgICByZXR1cm4gJCh0aGlzLmNvbmZpZy5kYXRlUmFuZ2VTZWxlY3RvcikuZGF0YSgnZGF0ZXBpY2tlcicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFyZSB3ZSBpbiAnbW9udGhseScgbW9kZT8gKElmIHdlIGFyZW4ndCB0aGVuIHdlJ3JlIGluIGRhaWx5KVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSB5ZXMgb3Igbm9cbiAgICovXG4gIGlzTW9udGhseSgpIHtcbiAgICByZXR1cm4gJCgnI2RhdGUtdHlwZS1zZWxlY3QnKS52YWwoKSA9PT0gJ21vbnRobHknO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgZm9yIHRoZSBwdXJwb3NlcyBvZiBwYWdldmlld3MgQVBJIGNhbGxcbiAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgZGF0ZVxuICAgKi9cbiAgZ2V0QVBJRGF0ZSgpIHtcbiAgICBjb25zdCBkYXRlcGlja2VyVmFsdWUgPSB0aGlzLmRhdGVwaWNrZXIuZ2V0RGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMuaXNNb250aGx5KCkpIHtcbiAgICAgIHJldHVybiBtb21lbnQoZGF0ZXBpY2tlclZhbHVlKS5mb3JtYXQoJ1lZWVkvTU0nKSArICcvYWxsLWRheXMnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbW9tZW50KGRhdGVwaWNrZXJWYWx1ZSkuZm9ybWF0KCdZWVlZL01NL0REJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGRhdGEgZnJvbSBBUElcbiAgICogQHJldHVybnMge0RlZmVycmVkfSBwcm9taXNlIHdpdGggZGF0YVxuICAgKi9cbiAgaW5pdERhdGEoKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIHRoaXMuc3RhcnRTcGlubnkoKTtcblxuICAgIGNvbnN0IGFjY2VzcyA9ICQodGhpcy5jb25maWcucGxhdGZvcm1TZWxlY3RvcikudmFsKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly93aWtpbWVkaWEub3JnL2FwaS9yZXN0X3YxL21ldHJpY3MvcGFnZXZpZXdzL3RvcC8ke3RoaXMucHJvamVjdH0vJHthY2Nlc3N9LyR7dGhpcy5nZXRBUElEYXRlKCl9YCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICB9KS5kb25lKGRhdGEgPT4ge1xuICAgICAgLy8gc3RvcmUgcGFnZURhdGEgZnJvbSBBUEksIHJlbW92aW5nIHVuZGVyc2NvcmVzIGZyb20gdGhlIHBhZ2UgbmFtZVxuICAgICAgdGhpcy5wYWdlRGF0YSA9IGRhdGEuaXRlbXNbMF0uYXJ0aWNsZXMubWFwKHBhZ2UgPT4ge1xuICAgICAgICBwYWdlLmFydGljbGUgPSBwYWdlLmFydGljbGUuZGVzY29yZSgpO1xuICAgICAgICByZXR1cm4gcGFnZTtcbiAgICAgIH0pO1xuXG4gICAgICAvKiogYnVpbGQgdGhlIHBhZ2VOYW1lcyBhcnJheSBmb3IgU2VsZWN0MiAqL1xuICAgICAgdGhpcy5wYWdlTmFtZXMgPSB0aGlzLnBhZ2VEYXRhLm1hcChwYWdlID0+IHBhZ2UuYXJ0aWNsZSk7XG5cbiAgICAgIGlmICgkKCcubWFpbnNwYWNlLW9ubHktb3B0aW9uJykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJPdXROYW1lc3BhY2UodGhpcy5wYWdlTmFtZXMpLmRvbmUocGFnZU5hbWVzID0+IHtcbiAgICAgICAgICB0aGlzLnBhZ2VOYW1lcyA9IHBhZ2VOYW1lcztcbiAgICAgICAgICB0aGlzLnBhZ2VEYXRhID0gdGhpcy5wYWdlRGF0YS5maWx0ZXIocGFnZSA9PiBwYWdlTmFtZXMuaW5jbHVkZXMocGFnZS5hcnRpY2xlKSk7XG4gICAgICAgICAgcmV0dXJuIGRmZC5yZXNvbHZlKHRoaXMucGFnZURhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkZmQucmVzb2x2ZSh0aGlzLnBhZ2VEYXRhKTtcbiAgICAgIH1cbiAgICB9KS5mYWlsKGVycm9yRGF0YSA9PiB7XG4gICAgICB0aGlzLnJlc2V0VmlldygpO1xuICAgICAgdGhpcy53cml0ZU1lc3NhZ2UoYCR7JC5pMThuKCdhcGktZXJyb3InLCAnUGFnZXZpZXdzIEFQSScpfSAtICR7ZXJyb3JEYXRhLnJlc3BvbnNlSlNPTi50aXRsZX1gKTtcbiAgICAgIHJldHVybiBkZmQucmVqZWN0KCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGZkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcGFnZXMgdGhhdCBhcmUgbm90IGluIHRoZSBnaXZlbiBuYW1lc3BhY2VcbiAgICogQHBhcmFtIHthcnJheX0gcGFnZXMgLSBwYWdlcyB0byBmaWx0ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyZXN0cmljdGVkTmFtZXNwYWNlXSAtIElEIG9mIHRoZSBuYW1lc3BhY2UgdG8gcmVzdHJpY3QgdG8sIGRlZmF1bHRzIHRvIDAgKG1haW5zcGFjZSlcbiAgICogQHJldHVybiB7RGVmZXJyZWR9IHByb21pc2UgcmVzb2x2aW5nIHdpdGggcGFnZXMgaW4gZ2l2ZW4gbmFtZXNwYWNlXG4gICAqL1xuICBmaWx0ZXJPdXROYW1lc3BhY2UocGFnZXMsIHJlc3RyaWN0ZWROYW1lc3BhY2UgPSAwKSB7XG4gICAgbGV0IGRmZCA9ICQuRGVmZXJyZWQoKTtcblxuICAgIGNvbnN0IGRvRmlsdGVyaW5nID0gKGVudHJpZXMsIHVuYWNjZXB0YWJsZU5hbWVzcGFjZXMpID0+IHtcbiAgICAgIHJldHVybiBlbnRyaWVzLmZpbHRlcihlbnRyeSA9PiB7XG4gICAgICAgIGNvbnN0IG5zID0gZW50cnkuc3BsaXQoJzonKVswXTtcblxuICAgICAgICAvLyBpbmNsdWRlIG1haW4gcGFnZSBhcyBub24tbWFpbnNwYWNlXG4gICAgICAgIGlmIChyZXN0cmljdGVkTmFtZXNwYWNlID09PSAwICYmIGVudHJ5ID09PSB0aGlzLmdldFNpdGVJbmZvKHRoaXMucHJvamVjdCkuZ2VuZXJhbC5tYWlucGFnZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZlcmlmeSB0aGVyZSB3YXMgYSBuYW1lc3BhY2UuIEZvciBpbnN0YW5jZSwgZG9uJ3QgZmlsdGVyIG91dCBhIG1haW5zcGFjZSBhcnRpY2xlXG4gICAgICAgIC8vICBjYWxsZWQgJ1NlYXJjaCcsIHdoZW4gd2Ugd2FudGVkIHRvIGZpbHRlciBvdXQgU3BlY2lhbDpTZWFyY2hcbiAgICAgICAgaWYgKCFlbnRyeS5pbmNsdWRlcygnOicpKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gIXVuYWNjZXB0YWJsZU5hbWVzcGFjZXMuaW5jbHVkZXMobnMpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZmV0Y2hTaXRlSW5mbyh0aGlzLnByb2plY3QpLmRvbmUoKCkgPT4ge1xuICAgICAgbGV0IHVuYWNjZXB0YWJsZU5hbWVzcGFjZXMgPSBbXTtcblxuICAgICAgLy8gZm9yIG5vbi1tYWluc3BhY2UsIGNvdW50ICdXaWtpcGVkaWEnIGFuZCAnU3BlY2lhbCcgc2luY2UgQVBJIHNlZW1zIHRvXG4gICAgICAvLyAgaW5jbHVkZSBmb3IgaW5zdGFuY2UgYm90aCBXaWtpcGVkaWEgYW5kIFdpa2lww6lkaWEgaW4gc29tZSBwcm9qZWN0c1xuICAgICAgLy8gRklYTUU6IHRoZSAnU3A/Y2lhbCcgaXMgYW4gYXBwYXJlbnQgYnVnLCBzZWUgcGhhYjpUMTQ1MDQzXG4gICAgICBpZiAocmVzdHJpY3RlZE5hbWVzcGFjZSA9PT0gMCkge1xuICAgICAgICB1bmFjY2VwdGFibGVOYW1lc3BhY2VzID0gWydXaWtpcGVkaWEnLCAnU3BlY2lhbCcsICdTcD9jaWFsJ107XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgbnMgaW4gdGhpcy5nZXRTaXRlSW5mbyh0aGlzLnByb2plY3QpLm5hbWVzcGFjZXMpIHtcbiAgICAgICAgdW5hY2NlcHRhYmxlTmFtZXNwYWNlcy5wdXNoKHRoaXMuZ2V0U2l0ZUluZm8odGhpcy5wcm9qZWN0KS5uYW1lc3BhY2VzW25zXVsnKiddKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhlIGFjdHVhbCBmaWx0ZXJpbmcgb2YgdGhlIGdpdmVuIHBhZ2VzXG4gICAgICBwYWdlcyA9IGRvRmlsdGVyaW5nKHBhZ2VzLCB1bmFjY2VwdGFibGVOYW1lc3BhY2VzKTtcblxuICAgICAgLy8gcmVtb3ZlIGV4Y2x1ZGVzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGF1dG9tYXRpY2FsbHkgYmUgZmlsdGVyZWQgb3V0XG4gICAgICB0aGlzLmV4Y2x1ZGVzID0gZG9GaWx0ZXJpbmcodGhpcy5leGNsdWRlcywgdW5hY2NlcHRhYmxlTmFtZXNwYWNlcyk7XG5cbiAgICAgIGRmZC5yZXNvbHZlKHBhZ2VzKTtcbiAgICB9KS5mYWlsKCgpID0+IHtcbiAgICAgIHRoaXMud3JpdGVNZXNzYWdlKGAkeyQuaTE4bignYXBpLWVycm9yJywgJ1NpdGVpbmZvIEFQSScpfWApO1xuICAgICAgZGZkLnJlc29sdmUocGFnZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRmZDtcbiAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gIC8qKiBhc3N1bWUgaGFzaCBwYXJhbXMgYXJlIHN1cHBvc2VkIHRvIGJlIHF1ZXJ5IHBhcmFtcyAqL1xuICBpZiAoZG9jdW1lbnQubG9jYXRpb24uaGFzaCAmJiAhZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoJyMnLCAnPycpO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50LmxvY2F0aW9uLmhhc2gpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvXFwjLiovLCAnJyk7XG4gIH1cblxuICBuZXcgVG9wVmlld3MoKTtcbn0pO1xuIl19
