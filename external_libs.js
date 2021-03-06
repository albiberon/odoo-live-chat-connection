/* /web/static/lib/moment/moment.js defined in bundle 'im_livechat.external_lib' */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.moment = factory());
})(this, function() {
  "use strict";
  var hookCallback;
  function hooks() {
    return hookCallback.apply(null, arguments);
  }
  function setHookCallback(callback) {
    hookCallback = callback;
  }
  function isArray(input) {
    return (
      input instanceof Array ||
      Object.prototype.toString.call(input) === "[object Array]"
    );
  }
  function isObject(input) {
    return (
      input != null &&
      Object.prototype.toString.call(input) === "[object Object]"
    );
  }
  function isObjectEmpty(obj) {
    var k;
    for (k in obj) {
      return false;
    }
    return true;
  }
  function isNumber(input) {
    return (
      typeof input === "number" ||
      Object.prototype.toString.call(input) === "[object Number]"
    );
  }
  function isDate(input) {
    return (
      input instanceof Date ||
      Object.prototype.toString.call(input) === "[object Date]"
    );
  }
  function map(arr, fn) {
    var res = [],
      i;
    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }
    return res;
  }
  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }
    if (hasOwnProp(b, "toString")) {
      a.toString = b.toString;
    }
    if (hasOwnProp(b, "valueOf")) {
      a.valueOf = b.valueOf;
    }
    return a;
  }
  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }
  function defaultParsingFlags() {
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      meridiem: null
    };
  }
  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }
    return m._pf;
  }
  var some;
  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function(fun) {
      var t = Object(this);
      var len = t.length >>> 0;
      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }
      return false;
    };
  }
  var some$1 = some;
  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m);
      var parsedParts = some$1.call(flags.parsedDateParts, function(i) {
        return i != null;
      });
      var isNowValid =
        !isNaN(m._d.getTime()) &&
        flags.overflow < 0 &&
        !flags.empty &&
        !flags.invalidMonth &&
        !flags.invalidWeekday &&
        !flags.nullInput &&
        !flags.invalidFormat &&
        !flags.userInvalidated &&
        (!flags.meridiem || (flags.meridiem && parsedParts));
      if (m._strict) {
        isNowValid =
          isNowValid &&
          flags.charsLeftOver === 0 &&
          flags.unusedTokens.length === 0 &&
          flags.bigHour === undefined;
      }
      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }
    return m._isValid;
  }
  function createInvalid(flags) {
    var m = createUTC(NaN);
    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }
    return m;
  }
  function isUndefined(input) {
    return input === void 0;
  }
  var momentProperties = (hooks.momentProperties = []);
  function copyConfig(to, from) {
    var i, prop, val;
    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
      to._i = from._i;
    }
    if (!isUndefined(from._f)) {
      to._f = from._f;
    }
    if (!isUndefined(from._l)) {
      to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }
    if (momentProperties.length > 0) {
      for (i in momentProperties) {
        prop = momentProperties[i];
        val = from[prop];
        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }
    return to;
  }
  var updateInProgress = false;
  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
      this._d = new Date(NaN);
    }
    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }
  function isMoment(obj) {
    return (
      obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
    );
  }
  function absFloor(number) {
    if (number < 0) {
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }
  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
      value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }
    return value;
  }
  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
      lengthDiff = Math.abs(array1.length - array2.length),
      diffs = 0,
      i;
    for (i = 0; i < len; i++) {
      if (
        (dontConvert && array1[i] !== array2[i]) ||
        (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
      ) {
        diffs++;
      }
    }
    return diffs + lengthDiff;
  }
  function warn(msg) {
    if (
      hooks.suppressDeprecationWarnings === false &&
      typeof console !== "undefined" &&
      console.warn
    ) {
      console.warn("Deprecation warning: " + msg);
    }
  }
  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function() {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }
      if (firstTime) {
        var args = [];
        var arg;
        for (var i = 0; i < arguments.length; i++) {
          arg = "";
          if (typeof arguments[i] === "object") {
            arg += "\n[" + i + "] ";
            for (var key in arguments[0]) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
            arg = arg.slice(0, -2);
          } else {
            arg = arguments[i];
          }
          args.push(arg);
        }
        warn(
          msg +
            "\nArguments: " +
            Array.prototype.slice.call(args).join("") +
            "\n" +
            new Error().stack
        );
        firstTime = false;
      }
      return fn.apply(this, arguments);
    }, fn);
  }
  var deprecations = {};
  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }
  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;
  function isFunction(input) {
    return (
      input instanceof Function ||
      Object.prototype.toString.call(input) === "[object Function]"
    );
  }
  function set(config) {
    var prop, i;
    for (i in config) {
      prop = config[i];
      if (isFunction(prop)) {
        this[i] = prop;
      } else {
        this["_" + i] = prop;
      }
    }
    this._config = config;
    this._ordinalParseLenient = new RegExp(
      this._ordinalParse.source + "|" + /\d{1,2}/.source
    );
  }
  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
      prop;
    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }
    for (prop in parentConfig) {
      if (
        hasOwnProp(parentConfig, prop) &&
        !hasOwnProp(childConfig, prop) &&
        isObject(parentConfig[prop])
      ) {
        res[prop] = extend({}, res[prop]);
      }
    }
    return res;
  }
  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }
  var keys;
  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function(obj) {
      var i,
        res = [];
      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }
      return res;
    };
  }
  var keys$1 = keys;
  var defaultCalendar = {
    sameDay: "[Today at] LT",
    nextDay: "[Tomorrow at] LT",
    nextWeek: "dddd [at] LT",
    lastDay: "[Yesterday at] LT",
    lastWeek: "[Last] dddd [at] LT",
    sameElse: "L"
  };
  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar["sameElse"];
    return isFunction(output) ? output.call(mom, now) : output;
  }
  var defaultLongDateFormat = {
    LTS: "h:mm:ss A",
    LT: "h:mm A",
    L: "MM/DD/YYYY",
    LL: "MMMM D, YYYY",
    LLL: "MMMM D, YYYY h:mm A",
    LLLL: "dddd, MMMM D, YYYY h:mm A"
  };
  function longDateFormat(key) {
    var format = this._longDateFormat[key],
      formatUpper = this._longDateFormat[key.toUpperCase()];
    if (format || !formatUpper) {
      return format;
    }
    this._longDateFormat[key] = formatUpper.replace(
      /MMMM|MM|DD|dddd/g,
      function(val) {
        return val.slice(1);
      }
    );
    return this._longDateFormat[key];
  }
  var defaultInvalidDate = "Invalid date";
  function invalidDate() {
    return this._invalidDate;
  }
  var defaultOrdinal = "%d";
  var defaultOrdinalParse = /\d{1,2}/;
  function ordinal(number) {
    return this._ordinal.replace("%d", number);
  }
  var defaultRelativeTime = {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  };
  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output)
      ? output(number, withoutSuffix, string, isFuture)
      : output.replace(/%d/i, number);
  }
  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? "future" : "past"];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }
  var aliases = {};
  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
  }
  function normalizeUnits(units) {
    return typeof units === "string"
      ? aliases[units] || aliases[units.toLowerCase()]
      : undefined;
  }
  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
      normalizedProp,
      prop;
    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);
        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }
    return normalizedInput;
  }
  var priorities = {};
  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }
  function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
      units.push({ unit: u, priority: priorities[u] });
    }
    units.sort(function(a, b) {
      return a.priority - b.priority;
    });
    return units;
  }
  function makeGetSet(unit, keepTime) {
    return function(value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }
  function get(mom, unit) {
    return mom.isValid()
      ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
      : NaN;
  }
  function set$1(mom, unit, value) {
    if (mom.isValid()) {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
  function stringGet(units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units]();
    }
    return this;
  }
  function stringSet(units, value) {
    if (typeof units === "object") {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units);
      for (var i = 0; i < prioritized.length; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units](value);
      }
    }
    return this;
  }
  function zeroFill(number, targetLength, forceSign) {
    var absNumber = "" + Math.abs(number),
      zerosToFill = targetLength - absNumber.length,
      sign = number >= 0;
    return (
      (sign ? (forceSign ? "+" : "") : "-") +
      Math.pow(10, Math.max(0, zerosToFill))
        .toString()
        .substr(1) +
      absNumber
    );
  }
  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
  var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
  var formatFunctions = {};
  var formatTokenFunctions = {};
  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === "string") {
      func = function() {
        return this[callback]();
      };
    }
    if (token) {
      formatTokenFunctions[token] = func;
    }
    if (padded) {
      formatTokenFunctions[padded[0]] = function() {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }
    if (ordinal) {
      formatTokenFunctions[ordinal] = function() {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }
  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, "");
    }
    return input.replace(/\\/g, "");
  }
  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
      i,
      length;
    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }
    return function(mom) {
      var output = "",
        i;
      for (i = 0; i < length; i++) {
        output +=
          array[i] instanceof Function ? array[i].call(mom, format) : array[i];
      }
      return output;
    };
  }
  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }
    format = expandFormat(format, m.localeData());
    formatFunctions[format] =
      formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }
  function expandFormat(format, locale) {
    var i = 5;
    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }
    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(
        localFormattingTokens,
        replaceLongDateFormatTokens
      );
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }
    return format;
  }
  var match1 = /\d/;
  var match2 = /\d\d/;
  var match3 = /\d{3}/;
  var match4 = /\d{4}/;
  var match6 = /[+-]?\d{6}/;
  var match1to2 = /\d\d?/;
  var match3to4 = /\d\d\d\d?/;
  var match5to6 = /\d\d\d\d\d\d?/;
  var match1to3 = /\d{1,3}/;
  var match1to4 = /\d{1,4}/;
  var match1to6 = /[+-]?\d{1,6}/;
  var matchUnsigned = /\d+/;
  var matchSigned = /[+-]?\d+/;
  var matchOffset = /Z|[+-]\d\d:?\d\d/gi;
  var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;
  var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
  var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
  var regexes = {};
  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex)
      ? regex
      : function(isStrict, localeData) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
  }
  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }
    return regexes[token](config._strict, config._locale);
  }
  function unescapeFormat(s) {
    return regexEscape(
      s
        .replace("\\", "")
        .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(
          matched,
          p1,
          p2,
          p3,
          p4
        ) {
          return p1 || p2 || p3 || p4;
        })
    );
  }
  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  var tokens = {};
  function addParseToken(token, callback) {
    var i,
      func = callback;
    if (typeof token === "string") {
      token = [token];
    }
    if (isNumber(callback)) {
      func = function(input, array) {
        array[callback] = toInt(input);
      };
    }
    for (i = 0; i < token.length; i++) {
      tokens[token[i]] = func;
    }
  }
  function addWeekParseToken(token, callback) {
    addParseToken(token, function(input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }
  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }
  var YEAR = 0;
  var MONTH = 1;
  var DATE = 2;
  var HOUR = 3;
  var MINUTE = 4;
  var SECOND = 5;
  var MILLISECOND = 6;
  var WEEK = 7;
  var WEEKDAY = 8;
  var indexOf;
  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function(o) {
      var i;
      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }
      return -1;
    };
  }
  var indexOf$1 = indexOf;
  function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  }
  addFormatToken("M", ["MM", 2], "Mo", function() {
    return this.month() + 1;
  });
  addFormatToken("MMM", 0, 0, function(format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken("MMMM", 0, 0, function(format) {
    return this.localeData().months(this, format);
  });
  addUnitAlias("month", "M");
  addUnitPriority("month", 8);
  addRegexToken("M", match1to2);
  addRegexToken("MM", match1to2, match2);
  addRegexToken("MMM", function(isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken("MMMM", function(isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(["M", "MM"], function(input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(["MMM", "MMMM"], function(input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  });
  var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
  var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
    "_"
  );
  function localeMonths(m, format) {
    if (!m) {
      return this._months;
    }
    return isArray(this._months)
      ? this._months[m.month()]
      : this._months[
          (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
            ? "format"
            : "standalone"
        ][m.month()];
  }
  var defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
    "_"
  );
  function localeMonthsShort(m, format) {
    if (!m) {
      return this._monthsShort;
    }
    return isArray(this._monthsShort)
      ? this._monthsShort[m.month()]
      : this._monthsShort[
          MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"
        ][m.month()];
  }
  function handleStrictParse(monthName, format, strict) {
    var i,
      ii,
      mom,
      llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(
          mom,
          ""
        ).toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format === "MMM") {
        ii = indexOf$1.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf$1.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === "MMM") {
        ii = indexOf$1.call(this._shortMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf$1.call(this._longMonthsParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;
    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict);
    }
    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    }
    for (i = 0; i < 12; i++) {
      mom = createUTC([2000, i]);
      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp(
          "^" + this.months(mom, "").replace(".", "") + "$",
          "i"
        );
        this._shortMonthsParse[i] = new RegExp(
          "^" + this.monthsShort(mom, "").replace(".", "") + "$",
          "i"
        );
      }
      if (!strict && !this._monthsParse[i]) {
        regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
        this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
      }
      if (
        strict &&
        format === "MMMM" &&
        this._longMonthsParse[i].test(monthName)
      ) {
        return i;
      } else if (
        strict &&
        format === "MMM" &&
        this._shortMonthsParse[i].test(monthName)
      ) {
        return i;
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  }
  function setMonth(mom, value) {
    var dayOfMonth;
    if (!mom.isValid()) {
      return mom;
    }
    if (typeof value === "string") {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value);
        if (!isNumber(value)) {
          return mom;
        }
      }
    }
    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
    return mom;
  }
  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, "Month");
    }
  }
  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }
  var defaultMonthsShortRegex = matchWord;
  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, "_monthsShortRegex")) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }
      return this._monthsShortStrictRegex && isStrict
        ? this._monthsShortStrictRegex
        : this._monthsShortRegex;
    }
  }
  var defaultMonthsRegex = matchWord;
  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, "_monthsRegex")) {
        computeMonthsParse.call(this);
      }
      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, "_monthsRegex")) {
        this._monthsRegex = defaultMonthsRegex;
      }
      return this._monthsStrictRegex && isStrict
        ? this._monthsStrictRegex
        : this._monthsRegex;
    }
  }
  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }
    var shortPieces = [],
      longPieces = [],
      mixedPieces = [],
      i,
      mom;
    for (i = 0; i < 12; i++) {
      mom = createUTC([2000, i]);
      shortPieces.push(this.monthsShort(mom, ""));
      longPieces.push(this.months(mom, ""));
      mixedPieces.push(this.months(mom, ""));
      mixedPieces.push(this.monthsShort(mom, ""));
    }
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }
    this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp(
      "^(" + longPieces.join("|") + ")",
      "i"
    );
    this._monthsShortStrictRegex = new RegExp(
      "^(" + shortPieces.join("|") + ")",
      "i"
    );
  }
  addFormatToken("Y", 0, 0, function() {
    var y = this.year();
    return y <= 9999 ? "" + y : "+" + y;
  });
  addFormatToken(0, ["YY", 2], 0, function() {
    return this.year() % 100;
  });
  addFormatToken(0, ["YYYY", 4], 0, "year");
  addFormatToken(0, ["YYYYY", 5], 0, "year");
  addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
  addUnitAlias("year", "y");
  addUnitPriority("year", 1);
  addRegexToken("Y", matchSigned);
  addRegexToken("YY", match1to2, match2);
  addRegexToken("YYYY", match1to4, match4);
  addRegexToken("YYYYY", match1to6, match6);
  addRegexToken("YYYYYY", match1to6, match6);
  addParseToken(["YYYYY", "YYYYYY"], YEAR);
  addParseToken("YYYY", function(input, array) {
    array[YEAR] =
      input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken("YY", function(input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken("Y", function(input, array) {
    array[YEAR] = parseInt(input, 10);
  });
  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  hooks.parseTwoDigitYear = function(input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  };
  var getSetYear = makeGetSet("FullYear", true);
  function getIsLeapYear() {
    return isLeapYear(this.year());
  }
  function createDate(y, m, d, h, M, s, ms) {
    var date = new Date(y, m, d, h, M, s, ms);
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
    return date;
  }
  function createUTCDate(y) {
    var date = new Date(Date.UTC.apply(null, arguments));
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
    return date;
  }
  function firstWeekOffset(year, dow, doy) {
    var fwd = 7 + dow - doy,
      fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  }
  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
      weekOffset = firstWeekOffset(year, dow, doy),
      dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
      resYear,
      resDayOfYear;
    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }
    return { year: resYear, dayOfYear: resDayOfYear };
  }
  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
      week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
      resWeek,
      resYear;
    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }
    return { week: resWeek, year: resYear };
  }
  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
      weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  }
  addFormatToken("w", ["ww", 2], "wo", "week");
  addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
  addUnitAlias("week", "w");
  addUnitAlias("isoWeek", "W");
  addUnitPriority("week", 5);
  addUnitPriority("isoWeek", 5);
  addRegexToken("w", match1to2);
  addRegexToken("ww", match1to2, match2);
  addRegexToken("W", match1to2);
  addRegexToken("WW", match1to2, match2);
  addWeekParseToken(["w", "ww", "W", "WW"], function(
    input,
    week,
    config,
    token
  ) {
    week[token.substr(0, 1)] = toInt(input);
  });
  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }
  var defaultLocaleWeek = { dow: 0, doy: 6 };
  function localeFirstDayOfWeek() {
    return this._week.dow;
  }
  function localeFirstDayOfYear() {
    return this._week.doy;
  }
  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, "d");
  }
  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, "d");
  }
  addFormatToken("d", 0, "do", "day");
  addFormatToken("dd", 0, 0, function(format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken("ddd", 0, 0, function(format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken("dddd", 0, 0, function(format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken("e", 0, 0, "weekday");
  addFormatToken("E", 0, 0, "isoWeekday");
  addUnitAlias("day", "d");
  addUnitAlias("weekday", "e");
  addUnitAlias("isoWeekday", "E");
  addUnitPriority("day", 11);
  addUnitPriority("weekday", 11);
  addUnitPriority("isoWeekday", 11);
  addRegexToken("d", match1to2);
  addRegexToken("e", match1to2);
  addRegexToken("E", match1to2);
  addRegexToken("dd", function(isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken("ddd", function(isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken("dddd", function(isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(["dd", "ddd", "dddd"], function(
    input,
    week,
    config,
    token
  ) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(["d", "e", "E"], function(input, week, config, token) {
    week[token] = toInt(input);
  });
  function parseWeekday(input, locale) {
    if (typeof input !== "string") {
      return input;
    }
    if (!isNaN(input)) {
      return parseInt(input, 10);
    }
    input = locale.weekdaysParse(input);
    if (typeof input === "number") {
      return input;
    }
    return null;
  }
  function parseIsoWeekday(input, locale) {
    if (typeof input === "string") {
      return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
  }
  var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
    "_"
  );
  function localeWeekdays(m, format) {
    if (!m) {
      return this._weekdays;
    }
    return isArray(this._weekdays)
      ? this._weekdays[m.day()]
      : this._weekdays[
          this._weekdays.isFormat.test(format) ? "format" : "standalone"
        ][m.day()];
  }
  var defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
  function localeWeekdaysShort(m) {
    return m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }
  var defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
  function localeWeekdaysMin(m) {
    return m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }
  function handleStrictParse$1(weekdayName, format, strict) {
    var i,
      ii,
      mom,
      llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];
      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(
          mom,
          ""
        ).toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(
          mom,
          ""
        ).toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
      }
    }
    if (strict) {
      if (format === "dddd") {
        ii = indexOf$1.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === "ddd") {
        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf$1.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === "dddd") {
        ii = indexOf$1.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === "ddd") {
        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf$1.call(this._minWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf$1.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }
  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;
    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict);
    }
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }
    for (i = 0; i < 7; i++) {
      mom = createUTC([2000, 1]).day(i);
      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp(
          "^" + this.weekdays(mom, "").replace(".", ".?") + "$",
          "i"
        );
        this._shortWeekdaysParse[i] = new RegExp(
          "^" + this.weekdaysShort(mom, "").replace(".", ".?") + "$",
          "i"
        );
        this._minWeekdaysParse[i] = new RegExp(
          "^" + this.weekdaysMin(mom, "").replace(".", ".?") + "$",
          "i"
        );
      }
      if (!this._weekdaysParse[i]) {
        regex =
          "^" +
          this.weekdays(mom, "") +
          "|^" +
          this.weekdaysShort(mom, "") +
          "|^" +
          this.weekdaysMin(mom, "");
        this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
      }
      if (
        strict &&
        format === "dddd" &&
        this._fullWeekdaysParse[i].test(weekdayName)
      ) {
        return i;
      } else if (
        strict &&
        format === "ddd" &&
        this._shortWeekdaysParse[i].test(weekdayName)
      ) {
        return i;
      } else if (
        strict &&
        format === "dd" &&
        this._minWeekdaysParse[i].test(weekdayName)
      ) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  }
  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, "d");
    } else {
      return day;
    }
  }
  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, "d");
  }
  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }
  var defaultWeekdaysRegex = matchWord;
  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }
      return this._weekdaysStrictRegex && isStrict
        ? this._weekdaysStrictRegex
        : this._weekdaysRegex;
    }
  }
  var defaultWeekdaysShortRegex = matchWord;
  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysShortRegex")) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }
      return this._weekdaysShortStrictRegex && isStrict
        ? this._weekdaysShortStrictRegex
        : this._weekdaysShortRegex;
    }
  }
  var defaultWeekdaysMinRegex = matchWord;
  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, "_weekdaysRegex")) {
        computeWeekdaysParse.call(this);
      }
      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, "_weekdaysMinRegex")) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }
      return this._weekdaysMinStrictRegex && isStrict
        ? this._weekdaysMinStrictRegex
        : this._weekdaysMinRegex;
    }
  }
  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }
    var minPieces = [],
      shortPieces = [],
      longPieces = [],
      mixedPieces = [],
      i,
      mom,
      minp,
      shortp,
      longp;
    for (i = 0; i < 7; i++) {
      mom = createUTC([2000, 1]).day(i);
      minp = this.weekdaysMin(mom, "");
      shortp = this.weekdaysShort(mom, "");
      longp = this.weekdays(mom, "");
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    }
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }
    this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp(
      "^(" + longPieces.join("|") + ")",
      "i"
    );
    this._weekdaysShortStrictRegex = new RegExp(
      "^(" + shortPieces.join("|") + ")",
      "i"
    );
    this._weekdaysMinStrictRegex = new RegExp(
      "^(" + minPieces.join("|") + ")",
      "i"
    );
  }
  function hFormat() {
    return this.hours() % 12 || 12;
  }
  function kFormat() {
    return this.hours() || 24;
  }
  addFormatToken("H", ["HH", 2], 0, "hour");
  addFormatToken("h", ["hh", 2], 0, hFormat);
  addFormatToken("k", ["kk", 2], 0, kFormat);
  addFormatToken("hmm", 0, 0, function() {
    return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken("hmmss", 0, 0, function() {
    return (
      "" +
      hFormat.apply(this) +
      zeroFill(this.minutes(), 2) +
      zeroFill(this.seconds(), 2)
    );
  });
  addFormatToken("Hmm", 0, 0, function() {
    return "" + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken("Hmmss", 0, 0, function() {
    return (
      "" +
      this.hours() +
      zeroFill(this.minutes(), 2) +
      zeroFill(this.seconds(), 2)
    );
  });
  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function() {
      return this.localeData().meridiem(
        this.hours(),
        this.minutes(),
        lowercase
      );
    });
  }
  meridiem("a", true);
  meridiem("A", false);
  addUnitAlias("hour", "h");
  addUnitPriority("hour", 13);
  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }
  addRegexToken("a", matchMeridiem);
  addRegexToken("A", matchMeridiem);
  addRegexToken("H", match1to2);
  addRegexToken("h", match1to2);
  addRegexToken("HH", match1to2, match2);
  addRegexToken("hh", match1to2, match2);
  addRegexToken("hmm", match3to4);
  addRegexToken("hmmss", match5to6);
  addRegexToken("Hmm", match3to4);
  addRegexToken("Hmmss", match5to6);
  addParseToken(["H", "HH"], HOUR);
  addParseToken(["a", "A"], function(input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(["h", "hh"], function(input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken("hmm", function(input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken("hmmss", function(input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken("Hmm", function(input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken("Hmmss", function(input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  });
  function localeIsPM(input) {
    return (input + "").toLowerCase().charAt(0) === "p";
  }
  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? "pm" : "PM";
    } else {
      return isLower ? "am" : "AM";
    }
  }
  var getSetHour = makeGetSet("Hours", true);
  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    ordinalParse: defaultOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  };
  var locales = {};
  var localeFamilies = {};
  var globalLocale;
  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace("_", "-") : key;
  }
  function chooseLocale(names) {
    var i = 0,
      j,
      next,
      locale,
      split;
    while (i < names.length) {
      split = normalizeLocale(names[i]).split("-");
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split("-") : null;
      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join("-"));
        if (locale) {
          return locale;
        }
        if (
          next &&
          next.length >= j &&
          compareArrays(split, next, true) >= j - 1
        ) {
          break;
        }
        j--;
      }
      i++;
    }
    return null;
  }
  function loadLocale(name) {
    var oldLocale = null;
    if (
      !locales[name] &&
      typeof module !== "undefined" &&
      module &&
      module.exports
    ) {
      try {
        oldLocale = globalLocale._abbr;
        require("./locale/" + name);
        getSetGlobalLocale(oldLocale);
      } catch (e) {}
    }
    return locales[name];
  }
  function getSetGlobalLocale(key, values) {
    var data;
    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }
      if (data) {
        globalLocale = data;
      }
    }
    return globalLocale._abbr;
  }
  function defineLocale(name, config) {
    if (config !== null) {
      var parentConfig = baseConfig;
      config.abbr = name;
      if (locales[name] != null) {
        deprecateSimple(
          "defineLocaleOverride",
          "use moment.updateLocale(localeName, config) to change " +
            "an existing locale. moment.defineLocale(localeName, " +
            "config) should only be used for creating a new locale " +
            "See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
        );
        parentConfig = locales[name]._config;
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name: name,
            config: config
          });
          return null;
        }
      }
      locales[name] = new Locale(mergeConfigs(parentConfig, config));
      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function(x) {
          defineLocale(x.name, x.config);
        });
      }
      getSetGlobalLocale(name);
      return locales[name];
    } else {
      delete locales[name];
      return null;
    }
  }
  function updateLocale(name, config) {
    if (config != null) {
      var locale,
        parentConfig = baseConfig;
      if (locales[name] != null) {
        parentConfig = locales[name]._config;
      }
      config = mergeConfigs(parentConfig, config);
      locale = new Locale(config);
      locale.parentLocale = locales[name];
      locales[name] = locale;
      getSetGlobalLocale(name);
    } else {
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }
    return locales[name];
  }
  function getLocale(key) {
    var locale;
    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }
    if (!key) {
      return globalLocale;
    }
    if (!isArray(key)) {
      locale = loadLocale(key);
      if (locale) {
        return locale;
      }
      key = [key];
    }
    return chooseLocale(key);
  }
  function listLocales() {
    return keys$1(locales);
  }
  function checkOverflow(m) {
    var overflow;
    var a = m._a;
    if (a && getParsingFlags(m).overflow === -2) {
      overflow =
        a[MONTH] < 0 || a[MONTH] > 11
          ? MONTH
          : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
          ? DATE
          : a[HOUR] < 0 ||
            a[HOUR] > 24 ||
            (a[HOUR] === 24 &&
              (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0))
          ? HOUR
          : a[MINUTE] < 0 || a[MINUTE] > 59
          ? MINUTE
          : a[SECOND] < 0 || a[SECOND] > 59
          ? SECOND
          : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
          ? MILLISECOND
          : -1;
      if (
        getParsingFlags(m)._overflowDayOfYear &&
        (overflow < YEAR || overflow > DATE)
      ) {
        overflow = DATE;
      }
      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }
      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }
      getParsingFlags(m).overflow = overflow;
    }
    return m;
  }
  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
  var isoDates = [
    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
    ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
    ["YYYY-DDD", /\d{4}-\d{3}/],
    ["YYYY-MM", /\d{4}-\d\d/, false],
    ["YYYYYYMMDD", /[+-]\d{10}/],
    ["YYYYMMDD", /\d{8}/],
    ["GGGG[W]WWE", /\d{4}W\d{3}/],
    ["GGGG[W]WW", /\d{4}W\d{2}/, false],
    ["YYYYDDD", /\d{7}/]
  ];
  var isoTimes = [
    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
    ["HH:mm", /\d\d:\d\d/],
    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
    ["HHmmss", /\d\d\d\d\d\d/],
    ["HHmm", /\d\d\d\d/],
    ["HH", /\d\d/]
  ];
  var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
  function configFromISO(config) {
    var i,
      l,
      string = config._i,
      match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
      allowTime,
      dateFormat,
      timeFormat,
      tzFormat;
    if (match) {
      getParsingFlags(config).iso = true;
      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }
      if (dateFormat == null) {
        config._isValid = false;
        return;
      }
      if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            timeFormat = (match[2] || " ") + isoTimes[i][0];
            break;
          }
        }
        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }
      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }
      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = "Z";
        } else {
          config._isValid = false;
          return;
        }
      }
      config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  }
  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);
    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }
    configFromISO(config);
    if (config._isValid === false) {
      delete config._isValid;
      hooks.createFromInputFallback(config);
    }
  }
  hooks.createFromInputFallback = deprecate(
    "value provided is not in a recognized ISO format. moment construction falls back to js Date(), " +
      "which is not reliable across all browsers and versions. Non ISO date formats are " +
      "discouraged and will be removed in an upcoming major release. Please refer to " +
      "http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function(config) {
      config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
    }
  );
  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }
    if (b != null) {
      return b;
    }
    return c;
  }
  function currentDateArray(config) {
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
      return [
        nowValue.getUTCFullYear(),
        nowValue.getUTCMonth(),
        nowValue.getUTCDate()
      ];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  }
  function configFromArray(config) {
    var i,
      date,
      input = [],
      currentDate,
      yearToUse;
    if (config._d) {
      return;
    }
    currentDate = currentDateArray(config);
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    }
    if (config._dayOfYear) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
      if (config._dayOfYear > daysInYear(yearToUse)) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }
      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    }
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    }
    for (; i < 7; i++) {
      config._a[i] = input[i] =
        config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
    }
    if (
      config._a[HOUR] === 24 &&
      config._a[MINUTE] === 0 &&
      config._a[SECOND] === 0 &&
      config._a[MILLISECOND] === 0
    ) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }
    config._d = (config._useUTC ? createUTCDate : createDate).apply(
      null,
      input
    );
    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }
    if (config._nextDay) {
      config._a[HOUR] = 24;
    }
  }
  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4;
      weekYear = defaults(
        w.GG,
        config._a[YEAR],
        weekOfYear(createLocal(), 1, 4).year
      );
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);
      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      var curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
      week = defaults(w.w, curWeek.week);
      if (w.d != null) {
        weekday = w.d;
        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w.e != null) {
        weekday = w.e + dow;
        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        weekday = dow;
      }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear;
    }
  }
  hooks.ISO_8601 = function() {};
  function configFromStringAndFormat(config) {
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;
    var string = "" + config._i,
      i,
      parsedInput,
      tokens,
      token,
      skipped,
      stringLength = string.length,
      totalParsedInputLength = 0;
    tokens =
      expandFormat(config._f, config._locale).match(formattingTokens) || [];
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) ||
        [])[0];
      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));
        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }
        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      }
      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }
        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token);
      }
    }
    getParsingFlags(config).charsLeftOver =
      stringLength - totalParsedInputLength;
    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    }
    if (
      config._a[HOUR] <= 12 &&
      getParsingFlags(config).bigHour === true &&
      config._a[HOUR] > 0
    ) {
      getParsingFlags(config).bigHour = undefined;
    }
    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    config._a[HOUR] = meridiemFixWrap(
      config._locale,
      config._a[HOUR],
      config._meridiem
    );
    configFromArray(config);
    checkOverflow(config);
  }
  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;
    if (meridiem == null) {
      return hour;
    }
    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
      isPm = locale.isPM(meridiem);
      if (isPm && hour < 12) {
        hour += 12;
      }
      if (!isPm && hour === 12) {
        hour = 0;
      }
      return hour;
    } else {
      return hour;
    }
  }
  function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore;
    if (config._f.length === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }
    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      tempConfig = copyConfig({}, config);
      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }
      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);
      if (!isValid(tempConfig)) {
        continue;
      }
      currentScore += getParsingFlags(tempConfig).charsLeftOver;
      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;
      if (scoreToBeat == null || currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
    extend(config, bestMoment || tempConfig);
  }
  function configFromObject(config) {
    if (config._d) {
      return;
    }
    var i = normalizeObjectUnits(config._i);
    config._a = map(
      [
        i.year,
        i.month,
        i.day || i.date,
        i.hour,
        i.minute,
        i.second,
        i.millisecond
      ],
      function(obj) {
        return obj && parseInt(obj, 10);
      }
    );
    configFromArray(config);
  }
  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
      res.add(1, "d");
      res._nextDay = undefined;
    }
    return res;
  }
  function prepareConfig(config) {
    var input = config._i,
      format = config._f;
    config._locale = config._locale || getLocale(config._l);
    if (input === null || (format === undefined && input === "")) {
      return createInvalid({ nullInput: true });
    }
    if (typeof input === "string") {
      config._i = input = config._locale.preparse(input);
    }
    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config._d = input;
    } else if (isArray(format)) {
      configFromStringAndArray(config);
    } else if (format) {
      configFromStringAndFormat(config);
    } else {
      configFromInput(config);
    }
    if (!isValid(config)) {
      config._d = null;
    }
    return config;
  }
  function configFromInput(config) {
    var input = config._i;
    if (input === undefined) {
      config._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf());
    } else if (typeof input === "string") {
      configFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function(obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config);
    } else if (typeof input === "object") {
      configFromObject(config);
    } else if (isNumber(input)) {
      config._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config);
    }
  }
  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};
    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }
    if (
      (isObject(input) && isObjectEmpty(input)) ||
      (isArray(input) && input.length === 0)
    ) {
      input = undefined;
    }
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }
  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }
  var prototypeMin = deprecate(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other < this ? this : other;
      } else {
        return createInvalid();
      }
    }
  );
  var prototypeMax = deprecate(
    "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
    function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other > this ? this : other;
      } else {
        return createInvalid();
      }
    }
  );
  function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }
    if (!moments.length) {
      return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }
    return res;
  }
  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isBefore", args);
  }
  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy("isAfter", args);
  }
  var now = function() {
    return Date.now ? Date.now() : +new Date();
  };
  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
      years = normalizedInput.year || 0,
      quarters = normalizedInput.quarter || 0,
      months = normalizedInput.month || 0,
      weeks = normalizedInput.week || 0,
      days = normalizedInput.day || 0,
      hours = normalizedInput.hour || 0,
      minutes = normalizedInput.minute || 0,
      seconds = normalizedInput.second || 0,
      milliseconds = normalizedInput.millisecond || 0;
    this._milliseconds =
      +milliseconds + seconds * 1e3 + minutes * 6e4 + hours * 1000 * 60 * 60;
    this._days = +days + weeks * 7;
    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();
    this._bubble();
  }
  function isDuration(obj) {
    return obj instanceof Duration;
  }
  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  }
  function offset(token, separator) {
    addFormatToken(token, 0, 0, function() {
      var offset = this.utcOffset();
      var sign = "+";
      if (offset < 0) {
        offset = -offset;
        sign = "-";
      }
      return (
        sign +
        zeroFill(~~(offset / 60), 2) +
        separator +
        zeroFill(~~offset % 60, 2)
      );
    });
  }
  offset("Z", ":");
  offset("ZZ", "");
  addRegexToken("Z", matchShortOffset);
  addRegexToken("ZZ", matchShortOffset);
  addParseToken(["Z", "ZZ"], function(input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  });
  var chunkOffset = /([\+\-]|\d\d)/gi;
  function offsetFromString(matcher, string) {
    var matches = (string || "").match(matcher);
    if (matches === null) {
      return null;
    }
    var chunk = matches[matches.length - 1] || [];
    var parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes;
  }
  function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
      res = model.clone();
      diff =
        (isMoment(input) || isDate(input)
          ? input.valueOf()
          : createLocal(input).valueOf()) - res.valueOf();
      res._d.setTime(res._d.valueOf() + diff);
      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }
  function getDateOffset(m) {
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
  }
  hooks.updateOffset = function() {};
  function getSetOffset(input, keepLocalTime) {
    var offset = this._offset || 0,
      localAdjust;
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }
    if (input != null) {
      if (typeof input === "string") {
        input = offsetFromString(matchShortOffset, input);
        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16) {
        input = input * 60;
      }
      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }
      this._offset = input;
      this._isUTC = true;
      if (localAdjust != null) {
        this.add(localAdjust, "m");
      }
      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, "m"), 1, false);
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }
      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }
  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== "string") {
        input = -input;
      }
      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }
  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }
  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;
      if (keepLocalTime) {
        this.subtract(getDateOffset(this), "m");
      }
    }
    return this;
  }
  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm);
    } else if (typeof this._i === "string") {
      var tZone = offsetFromString(matchOffset, this._i);
      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }
    return this;
  }
  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }
  function isDaylightSavingTime() {
    return (
      this.utcOffset() >
        this.clone()
          .month(0)
          .utcOffset() ||
      this.utcOffset() >
        this.clone()
          .month(5)
          .utcOffset()
    );
  }
  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }
    var c = {};
    copyConfig(c, this);
    c = prepareConfig(c);
    if (c._a) {
      var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted =
        this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }
    return this._isDSTShifted;
  }
  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }
  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }
  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  }
  var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
  var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
  function createDuration(input, key) {
    var duration = input,
      match = null,
      sign,
      ret,
      diffRes;
    if (isDuration(input)) {
      duration = { ms: input._milliseconds, d: input._days, M: input._months };
    } else if (isNumber(input)) {
      duration = {};
      if (key) {
        duration[key] = input;
      } else {
        duration.milliseconds = input;
      }
    } else if (!!(match = aspNetRegex.exec(input))) {
      sign = match[1] === "-" ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign
      };
    } else if (!!(match = isoRegex.exec(input))) {
      sign = match[1] === "-" ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign)
      };
    } else if (duration == null) {
      duration = {};
    } else if (
      typeof duration === "object" &&
      ("from" in duration || "to" in duration)
    ) {
      diffRes = momentsDifference(
        createLocal(duration.from),
        createLocal(duration.to)
      );
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }
    ret = new Duration(duration);
    if (isDuration(input) && hasOwnProp(input, "_locale")) {
      ret._locale = input._locale;
    }
    return ret;
  }
  createDuration.fn = Duration.prototype;
  function parseIso(inp, sign) {
    var res = inp && parseFloat(inp.replace(",", "."));
    return (isNaN(res) ? 0 : res) * sign;
  }
  function positiveMomentsDifference(base, other) {
    var res = { milliseconds: 0, months: 0 };
    res.months =
      other.month() - base.month() + (other.year() - base.year()) * 12;
    if (
      base
        .clone()
        .add(res.months, "M")
        .isAfter(other)
    ) {
      --res.months;
    }
    res.milliseconds = +other - +base.clone().add(res.months, "M");
    return res;
  }
  function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
      return { milliseconds: 0, months: 0 };
    }
    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }
    return res;
  }
  function createAdder(direction, name) {
    return function(val, period) {
      var dur, tmp;
      if (period !== null && !isNaN(+period)) {
        deprecateSimple(
          name,
          "moment()." +
            name +
            "(period, number) is deprecated. Please use moment()." +
            name +
            "(number, period). " +
            "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
        );
        tmp = val;
        val = period;
        period = tmp;
      }
      val = typeof val === "string" ? +val : val;
      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }
  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
      days = absRound(duration._days),
      months = absRound(duration._months);
    if (!mom.isValid()) {
      return;
    }
    updateOffset = updateOffset == null ? true : updateOffset;
    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
      set$1(mom, "Date", get(mom, "Date") + days * isAdding);
    }
    if (months) {
      setMonth(mom, get(mom, "Month") + months * isAdding);
    }
    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }
  var add = createAdder(1, "add");
  var subtract = createAdder(-1, "subtract");
  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, "days", true);
    return diff < -6
      ? "sameElse"
      : diff < -1
      ? "lastWeek"
      : diff < 0
      ? "lastDay"
      : diff < 1
      ? "sameDay"
      : diff < 2
      ? "nextDay"
      : diff < 7
      ? "nextWeek"
      : "sameElse";
  }
  function calendar$1(time, formats) {
    var now = time || createLocal(),
      sod = cloneWithOffset(now, this).startOf("day"),
      format = hooks.calendarFormat(this, sod) || "sameElse";
    var output =
      formats &&
      (isFunction(formats[format])
        ? formats[format].call(this, now)
        : formats[format]);
    return this.format(
      output || this.localeData().calendar(format, this, createLocal(now))
    );
  }
  function clone() {
    return new Moment(this);
  }
  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : "millisecond");
    if (units === "millisecond") {
      return this.valueOf() > localInput.valueOf();
    } else {
      return (
        localInput.valueOf() <
        this.clone()
          .startOf(units)
          .valueOf()
      );
    }
  }
  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : "millisecond");
    if (units === "millisecond") {
      return this.valueOf() < localInput.valueOf();
    } else {
      return (
        this.clone()
          .endOf(units)
          .valueOf() < localInput.valueOf()
      );
    }
  }
  function isBetween(from, to, units, inclusivity) {
    inclusivity = inclusivity || "()";
    return (
      (inclusivity[0] === "("
        ? this.isAfter(from, units)
        : !this.isBefore(from, units)) &&
      (inclusivity[1] === ")"
        ? this.isBefore(to, units)
        : !this.isAfter(to, units))
    );
  }
  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
      inputMs;
    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }
    units = normalizeUnits(units || "millisecond");
    if (units === "millisecond") {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return (
        this.clone()
          .startOf(units)
          .valueOf() <= inputMs &&
        inputMs <=
          this.clone()
            .endOf(units)
            .valueOf()
      );
    }
  }
  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }
  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }
  function diff(input, units, asFloat) {
    var that, zoneDelta, delta, output;
    if (!this.isValid()) {
      return NaN;
    }
    that = cloneWithOffset(input, this);
    if (!that.isValid()) {
      return NaN;
    }
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);
    if (units === "year" || units === "month" || units === "quarter") {
      output = monthDiff(this, that);
      if (units === "quarter") {
        output = output / 3;
      } else if (units === "year") {
        output = output / 12;
      }
    } else {
      delta = this - that;
      output =
        units === "second"
          ? delta / 1e3
          : units === "minute"
          ? delta / 6e4
          : units === "hour"
          ? delta / 36e5
          : units === "day"
          ? (delta - zoneDelta) / 864e5
          : units === "week"
          ? (delta - zoneDelta) / 6048e5
          : delta;
    }
    return asFloat ? output : absFloor(output);
  }
  function monthDiff(a, b) {
    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
      anchor = a.clone().add(wholeMonthDiff, "months"),
      anchor2,
      adjust;
    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
      adjust = (b - anchor) / (anchor2 - anchor);
    }
    return -(wholeMonthDiff + adjust) || 0;
  }
  hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
  hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
  function toString() {
    return this.clone()
      .locale("en")
      .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }
  function toISOString() {
    var m = this.clone().utc();
    if (0 < m.year() && m.year() <= 9999) {
      if (isFunction(Date.prototype.toISOString)) {
        return this.toDate().toISOString();
      } else {
        return formatMoment(m, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
      }
    } else {
      return formatMoment(m, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }
  }
  function inspect() {
    if (!this.isValid()) {
      return "moment.invalid(/* " + this._i + " */)";
    }
    var func = "moment";
    var zone = "";
    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
      zone = "Z";
    }
    var prefix = "[" + func + '("]';
    var year = 0 < this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
    var datetime = "-MM-DD[T]HH:mm:ss.SSS";
    var suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }
  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }
  function from(time, withoutSuffix) {
    if (
      this.isValid() &&
      ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
    ) {
      return createDuration({ to: this, from: time })
        .locale(this.locale())
        .humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }
  function to(time, withoutSuffix) {
    if (
      this.isValid() &&
      ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
    ) {
      return createDuration({ from: this, to: time })
        .locale(this.locale())
        .humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }
  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  }
  function locale(key) {
    var newLocaleData;
    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);
      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }
      return this;
    }
  }
  var lang = deprecate(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function(key) {
      if (key === undefined) {
        return this.localeData();
      } else {
        return this.locale(key);
      }
    }
  );
  function localeData() {
    return this._locale;
  }
  function startOf(units) {
    units = normalizeUnits(units);
    switch (units) {
      case "year":
        this.month(0);
      case "quarter":
      case "month":
        this.date(1);
      case "week":
      case "isoWeek":
      case "day":
      case "date":
        this.hours(0);
      case "hour":
        this.minutes(0);
      case "minute":
        this.seconds(0);
      case "second":
        this.milliseconds(0);
    }
    if (units === "week") {
      this.weekday(0);
    }
    if (units === "isoWeek") {
      this.isoWeekday(1);
    }
    if (units === "quarter") {
      this.month(Math.floor(this.month() / 3) * 3);
    }
    return this;
  }
  function endOf(units) {
    units = normalizeUnits(units);
    if (units === undefined || units === "millisecond") {
      return this;
    }
    if (units === "date") {
      units = "day";
    }
    return this.startOf(units)
      .add(1, units === "isoWeek" ? "week" : units)
      .subtract(1, "ms");
  }
  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }
  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }
  function toDate() {
    return new Date(this.valueOf());
  }
  function toArray() {
    var m = this;
    return [
      m.year(),
      m.month(),
      m.date(),
      m.hour(),
      m.minute(),
      m.second(),
      m.millisecond()
    ];
  }
  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds()
    };
  }
  function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  }
  function isValid$1() {
    return isValid(this);
  }
  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }
  function invalidAt() {
    return getParsingFlags(this).overflow;
  }
  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }
  addFormatToken(0, ["gg", 2], 0, function() {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ["GG", 2], 0, function() {
    return this.isoWeekYear() % 100;
  });
  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }
  addWeekYearFormatToken("gggg", "weekYear");
  addWeekYearFormatToken("ggggg", "weekYear");
  addWeekYearFormatToken("GGGG", "isoWeekYear");
  addWeekYearFormatToken("GGGGG", "isoWeekYear");
  addUnitAlias("weekYear", "gg");
  addUnitAlias("isoWeekYear", "GG");
  addUnitPriority("weekYear", 1);
  addUnitPriority("isoWeekYear", 1);
  addRegexToken("G", matchSigned);
  addRegexToken("g", matchSigned);
  addRegexToken("GG", match1to2, match2);
  addRegexToken("gg", match1to2, match2);
  addRegexToken("GGGG", match1to4, match4);
  addRegexToken("gggg", match1to4, match4);
  addRegexToken("GGGGG", match1to6, match6);
  addRegexToken("ggggg", match1to6, match6);
  addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(
    input,
    week,
    config,
    token
  ) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(["gg", "GG"], function(input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  });
  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(
      this,
      input,
      this.week(),
      this.weekday(),
      this.localeData()._week.dow,
      this.localeData()._week.doy
    );
  }
  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(
      this,
      input,
      this.isoWeek(),
      this.isoWeekday(),
      1,
      4
    );
  }
  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }
  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }
  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);
      if (week > weeksTarget) {
        week = weeksTarget;
      }
      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }
  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
      date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  }
  addFormatToken("Q", 0, "Qo", "quarter");
  addUnitAlias("quarter", "Q");
  addUnitPriority("quarter", 7);
  addRegexToken("Q", match1);
  addParseToken("Q", function(input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  });
  function getSetQuarter(input) {
    return input == null
      ? Math.ceil((this.month() + 1) / 3)
      : this.month((input - 1) * 3 + (this.month() % 3));
  }
  addFormatToken("D", ["DD", 2], "Do", "date");
  addUnitAlias("date", "D");
  addUnitPriority("date", 9);
  addRegexToken("D", match1to2);
  addRegexToken("DD", match1to2, match2);
  addRegexToken("Do", function(isStrict, locale) {
    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
  });
  addParseToken(["D", "DD"], DATE);
  addParseToken("Do", function(input, array) {
    array[DATE] = toInt(input.match(match1to2)[0], 10);
  });
  var getSetDayOfMonth = makeGetSet("Date", true);
  addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
  addUnitAlias("dayOfYear", "DDD");
  addUnitPriority("dayOfYear", 4);
  addRegexToken("DDD", match1to3);
  addRegexToken("DDDD", match3);
  addParseToken(["DDD", "DDDD"], function(input, array, config) {
    config._dayOfYear = toInt(input);
  });
  function getSetDayOfYear(input) {
    var dayOfYear =
      Math.round(
        (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
      ) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
  }
  addFormatToken("m", ["mm", 2], 0, "minute");
  addUnitAlias("minute", "m");
  addUnitPriority("minute", 14);
  addRegexToken("m", match1to2);
  addRegexToken("mm", match1to2, match2);
  addParseToken(["m", "mm"], MINUTE);
  var getSetMinute = makeGetSet("Minutes", false);
  addFormatToken("s", ["ss", 2], 0, "second");
  addUnitAlias("second", "s");
  addUnitPriority("second", 15);
  addRegexToken("s", match1to2);
  addRegexToken("ss", match1to2, match2);
  addParseToken(["s", "ss"], SECOND);
  var getSetSecond = makeGetSet("Seconds", false);
  addFormatToken("S", 0, 0, function() {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ["SS", 2], 0, function() {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ["SSS", 3], 0, "millisecond");
  addFormatToken(0, ["SSSS", 4], 0, function() {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ["SSSSS", 5], 0, function() {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ["SSSSSS", 6], 0, function() {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ["SSSSSSS", 7], 0, function() {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
    return this.millisecond() * 1000000;
  });
  addUnitAlias("millisecond", "ms");
  addUnitPriority("millisecond", 16);
  addRegexToken("S", match1to3, match1);
  addRegexToken("SS", match1to3, match2);
  addRegexToken("SSS", match1to3, match3);
  var token;
  for (token = "SSSS"; token.length <= 9; token += "S") {
    addRegexToken(token, matchUnsigned);
  }
  function parseMs(input, array) {
    array[MILLISECOND] = toInt(("0." + input) * 1000);
  }
  for (token = "S"; token.length <= 9; token += "S") {
    addParseToken(token, parseMs);
  }
  var getSetMillisecond = makeGetSet("Milliseconds", false);
  addFormatToken("z", 0, 0, "zoneAbbr");
  addFormatToken("zz", 0, 0, "zoneName");
  function getZoneAbbr() {
    return this._isUTC ? "UTC" : "";
  }
  function getZoneName() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }
  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$1;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;
  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate(
    "dates accessor is deprecated. Use date instead.",
    getSetDayOfMonth
  );
  proto.months = deprecate(
    "months accessor is deprecated. Use month instead",
    getSetMonth
  );
  proto.years = deprecate(
    "years accessor is deprecated. Use year instead",
    getSetYear
  );
  proto.zone = deprecate(
    "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
    getSetZone
  );
  proto.isDSTShifted = deprecate(
    "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
    isDaylightSavingTimeShifted
  );
  function createUnix(input) {
    return createLocal(input * 1000);
  }
  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }
  function preParsePostFormat(string) {
    return string;
  }
  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;
  function get$1(format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }
  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }
    format = format || "";
    if (index != null) {
      return get$1(format, index, field, "month");
    }
    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, "month");
    }
    return out;
  }
  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === "boolean") {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }
      format = format || "";
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }
      format = format || "";
    }
    var locale = getLocale(),
      shift = localeSorted ? locale._week.dow : 0;
    if (index != null) {
      return get$1(format, (index + shift) % 7, field, "day");
    }
    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, "day");
    }
    return out;
  }
  function listMonths(format, index) {
    return listMonthsImpl(format, index, "months");
  }
  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, "monthsShort");
  }
  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdays");
  }
  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort");
  }
  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
  }
  getSetGlobalLocale("en", {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function(number) {
      var b = number % 10,
        output =
          toInt((number % 100) / 10) === 1
            ? "th"
            : b === 1
            ? "st"
            : b === 2
            ? "nd"
            : b === 3
            ? "rd"
            : "th";
      return number + output;
    }
  });
  hooks.lang = deprecate(
    "moment.lang is deprecated. Use moment.locale instead.",
    getSetGlobalLocale
  );
  hooks.langData = deprecate(
    "moment.langData is deprecated. Use moment.localeData instead.",
    getLocale
  );
  var mathAbs = Math.abs;
  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }
  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  }
  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  }
  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }
  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }
  function bubble() {
    var milliseconds = this._milliseconds;
    var days = this._days;
    var months = this._months;
    var data = this._data;
    var seconds, minutes, hours, years, monthsFromDays;
    if (
      !(
        (milliseconds >= 0 && days >= 0 && months >= 0) ||
        (milliseconds <= 0 && days <= 0 && months <= 0)
      )
    ) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    }
    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24);
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));
    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }
  function daysToMonths(days) {
    return (days * 4800) / 146097;
  }
  function monthsToDays(months) {
    return (months * 146097) / 4800;
  }
  function as(units) {
    var days;
    var months;
    var milliseconds = this._milliseconds;
    units = normalizeUnits(units);
    if (units === "month" || units === "year") {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);
      return units === "month" ? months : months / 12;
    } else {
      days = this._days + Math.round(monthsToDays(this._months));
      switch (units) {
        case "week":
          return days / 7 + milliseconds / 6048e5;
        case "day":
          return days + milliseconds / 864e5;
        case "hour":
          return days * 24 + milliseconds / 36e5;
        case "minute":
          return days * 1440 + milliseconds / 6e4;
        case "second":
          return days * 86400 + milliseconds / 1000;
        case "millisecond":
          return Math.floor(days * 864e5) + milliseconds;
        default:
          throw new Error("Unknown unit " + units);
      }
    }
  }
  function valueOf$1() {
    return (
      this._milliseconds +
      this._days * 864e5 +
      (this._months % 12) * 2592e6 +
      toInt(this._months / 12) * 31536e6
    );
  }
  function makeAs(alias) {
    return function() {
      return this.as(alias);
    };
  }
  var asMilliseconds = makeAs("ms");
  var asSeconds = makeAs("s");
  var asMinutes = makeAs("m");
  var asHours = makeAs("h");
  var asDays = makeAs("d");
  var asWeeks = makeAs("w");
  var asMonths = makeAs("M");
  var asYears = makeAs("y");
  function get$2(units) {
    units = normalizeUnits(units);
    return this[units + "s"]();
  }
  function makeGetter(name) {
    return function() {
      return this._data[name];
    };
  }
  var milliseconds = makeGetter("milliseconds");
  var seconds = makeGetter("seconds");
  var minutes = makeGetter("minutes");
  var hours = makeGetter("hours");
  var days = makeGetter("days");
  var months = makeGetter("months");
  var years = makeGetter("years");
  function weeks() {
    return absFloor(this.days() / 7);
  }
  var round = Math.round;
  var thresholds = { s: 45, m: 45, h: 22, d: 26, M: 11 };
  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }
  function relativeTime$1(posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds = round(duration.as("s"));
    var minutes = round(duration.as("m"));
    var hours = round(duration.as("h"));
    var days = round(duration.as("d"));
    var months = round(duration.as("M"));
    var years = round(duration.as("y"));
    var a = (seconds < thresholds.s && ["s", seconds]) ||
      (minutes <= 1 && ["m"]) ||
      (minutes < thresholds.m && ["mm", minutes]) ||
      (hours <= 1 && ["h"]) ||
      (hours < thresholds.h && ["hh", hours]) ||
      (days <= 1 && ["d"]) ||
      (days < thresholds.d && ["dd", days]) ||
      (months <= 1 && ["M"]) ||
      (months < thresholds.M && ["MM", months]) ||
      (years <= 1 && ["y"]) || ["yy", years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  }
  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }
    if (typeof roundingFunction === "function") {
      round = roundingFunction;
      return true;
    }
    return false;
  }
  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }
    if (limit === undefined) {
      return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    return true;
  }
  function humanize(withSuffix) {
    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);
    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }
    return locale.postformat(output);
  }
  var abs$1 = Math.abs;
  function toISOString$1() {
    var seconds = abs$1(this._milliseconds) / 1000;
    var days = abs$1(this._days);
    var months = abs$1(this._months);
    var minutes, hours, years;
    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    years = absFloor(months / 12);
    months %= 12;
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();
    if (!total) {
      return "P0D";
    }
    return (
      (total < 0 ? "-" : "") +
      "P" +
      (Y ? Y + "Y" : "") +
      (M ? M + "M" : "") +
      (D ? D + "D" : "") +
      (h || m || s ? "T" : "") +
      (h ? h + "H" : "") +
      (m ? m + "M" : "") +
      (s ? s + "S" : "")
    );
  }
  var proto$2 = Duration.prototype;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate(
    "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
    toISOString$1
  );
  proto$2.lang = lang;
  addFormatToken("X", 0, 0, "unix");
  addFormatToken("x", 0, 0, "valueOf");
  addRegexToken("x", matchSigned);
  addRegexToken("X", matchTimestamp);
  addParseToken("X", function(input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
  });
  addParseToken("x", function(input, array, config) {
    config._d = new Date(toInt(input));
  });
  hooks.version = "2.17.1";
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto;
  return hooks;
});

/* /web/static/lib/underscore/underscore.js defined in bundle 'im_livechat.external_lib' */
(function() {
  var root = this;
  var previousUnderscore = root._;
  var ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    FuncProto = Function.prototype;
  var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;
  var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeBind = FuncProto.bind,
    nativeCreate = Object.create;
  var Ctor = function() {};
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };
  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }
  _.VERSION = "1.8.2";
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function(value) {
          return func.call(context, value);
        };
      case 2:
        return function(value, other) {
          return func.call(context, value, other);
        };
      case 3:
        return function(value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function(accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor();
    Ctor.prototype = null;
    return result;
  };
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function(collection) {
    var length = collection && collection.length;
    return (
      typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX
    );
  };
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length,
      results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };
  function createReduce(dir) {
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }
    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        index = dir > 0 ? 0 : length - 1;
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }
  _.reduce = _.foldl = _.inject = createReduce(1);
  _.reduceRight = _.foldr = createReduce(-1);
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };
  _.contains = _.includes = _.include = function(obj, target, fromIndex) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    return (
      _.indexOf(obj, target, typeof fromIndex == "number" && fromIndex) >= 0
    );
  };
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };
  _.max = function(obj, iteratee, context) {
    var result = -Infinity,
      lastComputed = -Infinity,
      value,
      computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (
          computed > lastComputed ||
          (computed === -Infinity && result === -Infinity)
        ) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };
  _.min = function(obj, iteratee, context) {
    var result = Infinity,
      lastComputed = Infinity,
      value,
      computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (
          computed < lastComputed ||
          (computed === Infinity && result === Infinity)
        ) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(
      _.map(obj, function(value, index, list) {
        return {
          value: value,
          index: index,
          criteria: iteratee(value, index, list)
        };
      }).sort(function(left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
          if (a > b || a === void 0) return 1;
          if (a < b || b === void 0) return -1;
        }
        return left.index - right.index;
      }),
      "value"
    );
  };
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value);
    else result[key] = [value];
  });
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++;
    else result[key] = 1;
  });
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [],
      fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };
  _.initial = function(array, n, guard) {
    return slice.call(
      array,
      0,
      Math.max(0, array.length - (n == null || guard ? 1 : n))
    );
  };
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [],
      idx = 0;
    for (
      var i = startIndex || 0, length = input && input.length;
      i < length;
      i++
    ) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0,
          len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value) {
      return !_.contains(rest, value);
    });
  };
  _.zip = function() {
    return _.unzip(arguments);
  };
  _.unzip = function(array) {
    var length = (array && _.max(array, "length").length) || 0;
    var result = Array(length);
    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = list && list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };
  _.indexOf = function(array, item, isSorted) {
    var i = 0,
      length = array && array.length;
    if (typeof isSorted == "number") {
      i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
    } else if (isSorted && length) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (item !== item) {
      return _.findIndex(slice.call(array, i), _.isNaN);
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };
  _.lastIndexOf = function(array, item, from) {
    var idx = array ? array.length : 0;
    if (typeof from == "number") {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    if (item !== item) {
      return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };
  function createIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = array != null && array.length;
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }
  _.findIndex = createIndexFinder(1);
  _.findLastIndex = createIndexFinder(-1);
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0,
      high = array.length;
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1;
      else high = mid;
    }
    return low;
  };
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);
    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }
    return range;
  };
  var executeBound = function(
    sourceFunc,
    boundFunc,
    context,
    callingContext,
    args
  ) {
    if (!(callingContext instanceof boundFunc))
      return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind)
      return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func))
      throw new TypeError("Bind must be called on a function");
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(
        func,
        bound,
        context,
        this,
        args.concat(slice.call(arguments))
      );
    };
    return bound;
  };
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0,
        length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };
  _.bindAll = function(obj) {
    var i,
      length = arguments.length,
      key;
    if (length <= 1) throw new Error("bindAll must be passed function names");
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = "" + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  };
  _.defer = _.partial(_.delay, _, 1);
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  };
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };
  _.once = _.partial(_.before, 2);
  var hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
  var nonEnumerableProps = [
    "valueOf",
    "isPrototypeOf",
    "toString",
    "propertyIsEnumerable",
    "hasOwnProperty",
    "toLocaleString"
  ];
  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto =
      (_.isFunction(constructor) && constructor.prototype) || ObjProto;
    var prop = "constructor";
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
      length = keys.length,
      results = {},
      currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };
  _.extend = createAssigner(_.allKeys);
  _.extendOwn = _.assign = createAssigner(_.keys);
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj),
      key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };
  _.pick = function(object, oiteratee, context) {
    var result = {},
      obj = object,
      iteratee,
      keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) {
        return key in obj;
      };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };
  _.defaults = createAssigner(_.allKeys, true);
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs),
      length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };
  var eq = function(a, b, aStack, bStack) {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null) return a === b;
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) return +b !== +b;
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
    }
    var areArrays = className === "[object Array]";
    if (!areArrays) {
      if (typeof a != "object" || typeof b != "object") return false;
      var aCtor = a.constructor,
        bCtor = b.constructor;
      if (
        aCtor !== bCtor &&
        !(
          _.isFunction(aCtor) &&
          aCtor instanceof aCtor &&
          _.isFunction(bCtor) &&
          bCtor instanceof bCtor
        ) &&
        "constructor" in a && "constructor" in b
      ) {
        return false;
      }
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      if (aStack[length] === a) return bStack[length] === b;
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {
      length = a.length;
      if (length !== b.length) return false;
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      var keys = _.keys(a),
        key;
      length = keys.length;
      if (_.keys(b).length !== length) return false;
      while (length--) {
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack)))
          return false;
      }
    }
    aStack.pop();
    bStack.pop();
    return true;
  };
  _.isEqual = function(a, b) {
    return eq(a, b);
  };
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (
      isArrayLike(obj) &&
      (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))
    )
      return obj.length === 0;
    return _.keys(obj).length === 0;
  };
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
  _.isArray =
    nativeIsArray ||
    function(obj) {
      return toString.call(obj) === "[object Array]";
    };
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === "function" || (type === "object" && !!obj);
  };
  _.each(
    ["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"],
    function(name) {
      _["is" + name] = function(obj) {
        return toString.call(obj) === "[object " + name + "]";
      };
    }
  );
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, "callee");
    };
  }
  if (typeof /./ != "function" && typeof Int8Array != "object") {
    _.isFunction = function(obj) {
      return typeof obj == "function" || false;
    };
  }
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };
  _.isBoolean = function(obj) {
    return (
      obj === true || obj === false || toString.call(obj) === "[object Boolean]"
    );
  };
  _.isNull = function(obj) {
    return obj === null;
  };
  _.isUndefined = function(obj) {
    return obj === void 0;
  };
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };
  _.identity = function(value) {
    return value;
  };
  _.constant = function(value) {
    return function() {
      return value;
    };
  };
  _.noop = function() {};
  _.property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };
  _.propertyOf = function(obj) {
    return obj == null
      ? function() {}
      : function(key) {
          return obj[key];
        };
  };
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  _.now =
    Date.now ||
    function() {
      return new Date().getTime();
    };
  var escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };
  var unescapeMap = _.invert(escapeMap);
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    var source = "(?:" + _.keys(map).join("|") + ")";
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, "g");
    return function(string) {
      string = string == null ? "" : "" + string;
      return testRegexp.test(string)
        ? string.replace(replaceRegexp, escaper)
        : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + "";
    return prefix ? prefix + id : id;
  };
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var noMatch = /(.)^/;
  var escapes = {
    "'": "'",
    "\\": "\\",
    "\r": "r",
    "\n": "n",
    "\u2028": "u2028",
    "\u2029": "u2029"
  };
  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
  var escapeChar = function(match) {
    return "\\" + escapes[match];
  };
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);
    var matcher = RegExp(
      [
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
      ].join("|") + "|$",
      "g"
    );
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(
      match,
      escape,
      interpolate,
      evaluate,
      offset
    ) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;
      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      return match;
    });
    source += "';\n";
    if (!settings.variable) source = "with(obj||{}){\n" + source + "}\n";
    source =
      "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source +
      "return __p;\n";
    try {
      var render = new Function(settings.variable || "obj", "_", source);
    } catch (e) {
      e.source = source;
      throw e;
    }
    var template = function(data) {
      return render.call(this, data, _);
    };
    var argument = settings.variable || "obj";
    template.source = "function(" + argument + "){\n" + source + "}";
    return template;
  };
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = (_[name] = obj[name]);
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };
  _.mixin(_);
  _.each(
    ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
    function(name) {
      var method = ArrayProto[name];
      _.prototype[name] = function() {
        var obj = this._wrapped;
        method.apply(obj, arguments);
        if ((name === "shift" || name === "splice") && obj.length === 0)
          delete obj[0];
        return result(this, obj);
      };
    }
  );
  _.each(["concat", "join", "slice"], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });
  _.prototype.value = function() {
    return this._wrapped;
  };
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
  _.prototype.toString = function() {
    return "" + this._wrapped;
  };
  if (typeof define === "function" && define.amd) {
    define("underscore", [], function() {
      return _;
    });
  }
}.call(this));

/* /web/static/lib/underscore.string/lib/underscore.string.js defined in bundle 'im_livechat.external_lib' */
!(function(root, String) {
  "use strict";
  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;
  var parseNumber = function(source) {
    return source * 1 || 0;
  };
  var strRepeat = function(str, qty) {
    if (qty < 1) return "";
    var result = "";
    while (qty > 0) {
      if (qty & 1) result += str;
      (qty >>= 1), (str += str);
    }
    return result;
  };
  var slice = [].slice;
  var defaultToWhiteSpace = function(characters) {
    if (characters == null) return "\\s";
    else if (characters.source) return characters.source;
    else return "[" + _s.escapeRegExp(characters) + "]";
  };
  function boolMatch(s, matchers) {
    var i,
      matcher,
      down = s.toLowerCase();
    matchers = [].concat(matchers);
    for (i = 0; i < matchers.length; i += 1) {
      matcher = matchers[i];
      if (!matcher) continue;
      if (matcher.test && matcher.test(s)) return true;
      if (matcher.toLowerCase() === down) return true;
    }
  }
  var escapeChars = { lt: "<", gt: ">", quot: '"', amp: "&", apos: "'" };
  var reversedEscapeChars = {};
  for (var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = "#39";
  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString
        .call(variable)
        .slice(8, -1)
        .toLowerCase();
    }
    var str_repeat = strRepeat;
    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(
        null,
        str_format.cache[arguments[0]],
        arguments
      );
    };
    str_format.format = function(parse_tree, argv) {
      var cursor = 1,
        tree_length = parse_tree.length,
        node_type = "",
        arg,
        output = [],
        i,
        k,
        match,
        pad,
        pad_character,
        pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === "string") {
          output.push(parse_tree[i]);
        } else if (node_type === "array") {
          match = parse_tree[i];
          if (match[2]) {
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(
                  sprintf(
                    '[_.sprintf] property "%s" does not exist',
                    match[2][k]
                  )
                );
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) {
            arg = argv[match[1]];
          } else {
            arg = argv[cursor++];
          }
          if (/[^s]/.test(match[8]) && get_type(arg) != "number") {
            throw new Error(
              sprintf(
                "[_.sprintf] expecting number but found %s",
                get_type(arg)
              )
            );
          }
          switch (match[8]) {
            case "b":
              arg = arg.toString(2);
              break;
            case "c":
              arg = String.fromCharCode(arg);
              break;
            case "d":
              arg = parseInt(arg, 10);
              break;
            case "e":
              arg = match[7]
                ? arg.toExponential(match[7])
                : arg.toExponential();
              break;
            case "f":
              arg = match[7]
                ? parseFloat(arg).toFixed(match[7])
                : parseFloat(arg);
              break;
            case "o":
              arg = arg.toString(8);
              break;
            case "s":
              arg =
                (arg = String(arg)) && match[7]
                  ? arg.substring(0, match[7])
                  : arg;
              break;
            case "u":
              arg = Math.abs(arg);
              break;
            case "x":
              arg = arg.toString(16);
              break;
            case "X":
              arg = arg.toString(16).toUpperCase();
              break;
          }
          arg =
            /[def]/.test(match[8]) && match[3] && arg >= 0 ? "+" + arg : arg;
          pad_character = match[4]
            ? match[4] == "0"
              ? "0"
              : match[4].charAt(1)
            : " ";
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : "";
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join("");
    };
    str_format.cache = {};
    str_format.parse = function(fmt) {
      var _fmt = fmt,
        match = [],
        parse_tree = [],
        arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        } else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push("%");
        } else if (
          (match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(
            _fmt
          )) !== null
        ) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [],
              replacement_field = match[2],
              field_match = [];
            if (
              (field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !==
              null
            ) {
              field_list.push(field_match[1]);
              while (
                (replacement_field = replacement_field.substring(
                  field_match[0].length
                )) !== ""
              ) {
                if (
                  (field_match = /^\.([a-z_][a-z_\d]*)/i.exec(
                    replacement_field
                  )) !== null
                ) {
                  field_list.push(field_match[1]);
                } else if (
                  (field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null
                ) {
                  field_list.push(field_match[1]);
                } else {
                  throw new Error("[_.sprintf] huh?");
                }
              }
            } else {
              throw new Error("[_.sprintf] huh?");
            }
            match[2] = field_list;
          } else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error(
              "[_.sprintf] mixing positional and named placeholders is not (yet) supported"
            );
          }
          parse_tree.push(match);
        } else {
          throw new Error("[_.sprintf] huh?");
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };
    return str_format;
  })();
  var _s = {
    VERSION: "2.3.0",
    isBlank: function(str) {
      if (str == null) str = "";
      return /^\s*$/.test(str);
    },
    stripTags: function(str) {
      if (str == null) return "";
      return String(str).replace(/<\/?[^>]+>/g, "");
    },
    capitalize: function(str) {
      str = str == null ? "" : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    chop: function(str, step) {
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp(".{1," + step + "}", "g")) : [str];
    },
    clean: function(str) {
      return _s.strip(str).replace(/\s+/g, " ");
    },
    count: function(str, substr) {
      if (str == null || substr == null) return 0;
      str = String(str);
      substr = String(substr);
      var count = 0,
        pos = 0,
        length = substr.length;
      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }
      return count;
    },
    chars: function(str) {
      if (str == null) return [];
      return String(str).split("");
    },
    swapCase: function(str) {
      if (str == null) return "";
      return String(str).replace(/\S/g, function(c) {
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },
    escapeHTML: function(str) {
      if (str == null) return "";
      return String(str).replace(/[&<>"']/g, function(m) {
        return "&" + reversedEscapeChars[m] + ";";
      });
    },
    unescapeHTML: function(str) {
      if (str == null) return "";
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode) {
        var match;
        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if ((match = entityCode.match(/^#(\d+)$/))) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },
    escapeRegExp: function(str) {
      if (str == null) return "";
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
    },
    splice: function(str, i, howmany, substr) {
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join("");
    },
    insert: function(str, i, substr) {
      return _s.splice(str, i, 0, substr);
    },
    include: function(str, needle) {
      if (needle === "") return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },
    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();
      if (separator == null) separator = "";
      return args.join(separator);
    },
    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },
    reverse: function(str) {
      return _s
        .chars(str)
        .reverse()
        .join("");
    },
    startsWith: function(str, starts) {
      if (starts === "") return true;
      if (str == null || starts == null) return false;
      str = String(str);
      starts = String(starts);
      return (
        str.length >= starts.length && str.slice(0, starts.length) === starts
      );
    },
    endsWith: function(str, ends) {
      if (ends === "") return true;
      if (str == null || ends == null) return false;
      str = String(str);
      ends = String(ends);
      return (
        str.length >= ends.length &&
        str.slice(str.length - ends.length) === ends
      );
    },
    succ: function(str) {
      if (str == null) return "";
      str = String(str);
      return (
        str.slice(0, -1) +
        String.fromCharCode(str.charCodeAt(str.length - 1) + 1)
      );
    },
    titleize: function(str) {
      if (str == null) return "";
      str = String(str).toLowerCase();
      return str.replace(/(?:^|\s|-)\S/g, function(c) {
        return c.toUpperCase();
      });
    },
    camelize: function(str) {
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
        return c ? c.toUpperCase() : "";
      });
    },
    underscored: function(str) {
      return _s
        .trim(str)
        .replace(/([a-z\d])([A-Z]+)/g, "$1_$2")
        .replace(/[-\s]+/g, "_")
        .toLowerCase();
    },
    dasherize: function(str) {
      return _s
        .trim(str)
        .replace(/([A-Z])/g, "-$1")
        .replace(/[-_\s]+/g, "-")
        .toLowerCase();
    },
    classify: function(str) {
      return _s.titleize(String(str).replace(/[\W_]/g, " ")).replace(/\s/g, "");
    },
    humanize: function(str) {
      return _s.capitalize(
        _s
          .underscored(str)
          .replace(/_id$/, "")
          .replace(/_/g, " ")
      );
    },
    trim: function(str, characters) {
      if (str == null) return "";
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(
        new RegExp("^" + characters + "+|" + characters + "+$", "g"),
        ""
      );
    },
    ltrim: function(str, characters) {
      if (str == null) return "";
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp("^" + characters + "+"), "");
    },
    rtrim: function(str, characters) {
      if (str == null) return "";
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + "+$"), "");
    },
    truncate: function(str, length, truncateStr) {
      if (str == null) return "";
      str = String(str);
      truncateStr = truncateStr || "...";
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },
    prune: function(str, length, pruneStr) {
      if (str == null) return "";
      str = String(str);
      length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : "...";
      if (str.length <= length) return str;
      var tmpl = function(c) {
          return c.toUpperCase() !== c.toLowerCase() ? "A" : " ";
        },
        template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl);
      if (template.slice(template.length - 2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, "");
      else template = _s.rtrim(template.slice(0, template.length - 1));
      return (template + pruneStr).length > str.length
        ? str
        : str.slice(0, template.length) + pruneStr;
    },
    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },
    pad: function(str, length, padStr, type) {
      str = str == null ? "" : String(str);
      length = ~~length;
      var padlen = 0;
      if (!padStr) padStr = " ";
      else if (padStr.length > 1) padStr = padStr.charAt(0);
      switch (type) {
        case "right":
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case "both":
          padlen = length - str.length;
          return (
            strRepeat(padStr, Math.ceil(padlen / 2)) +
            str +
            strRepeat(padStr, Math.floor(padlen / 2))
          );
        default:
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
      }
    },
    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },
    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, "right");
    },
    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, "both");
    },
    sprintf: sprintf,
    vsprintf: function(fmt, argv) {
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },
    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = _s.trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },
    numberFormat: function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return "";
      number = number.toFixed(~~dec);
      tsep = typeof tsep == "string" ? tsep : ",";
      var parts = number.split("."),
        fnums = parts[0],
        decimals = parts[1] ? (dsep || ".") + parts[1] : "";
      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + tsep) + decimals;
    },
    strRight: function(str, sep) {
      if (str == null) return "";
      str = String(str);
      sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos + sep.length, str.length) : str;
    },
    strRightBack: function(str, sep) {
      if (str == null) return "";
      str = String(str);
      sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos + sep.length, str.length) : str;
    },
    strLeft: function(str, sep) {
      if (str == null) return "";
      str = String(str);
      sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },
    strLeftBack: function(str, sep) {
      if (str == null) return "";
      str += "";
      sep = sep != null ? "" + sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },
    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ", ";
      lastSeparator = lastSeparator || " and ";
      var a = array.slice(),
        lastMember = a.pop();
      if (array.length > 2 && serial)
        lastSeparator = _s.rtrim(separator) + lastSeparator;
      return a.length
        ? a.join(separator) + lastSeparator + lastMember
        : lastMember;
    },
    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },
    slugify: function(str) {
      if (str == null) return "";
      var from =
          "Ä…Ã Ã¡Ã¤Ã¢Ã£Ã¥Ã¦ÄƒÄ‡Ä™Ã¨Ã©Ã«ÃªÃ¬Ã­Ã¯Ã®Å‚Å„Ã²Ã³Ã¶Ã´ÃµÃ¸Å›È™È›Ã¹ÃºÃ¼Ã»Ã±Ã§Å¼Åº",
        to = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
        regex = new RegExp(defaultToWhiteSpace(from), "g");
      str = String(str)
        .toLowerCase()
        .replace(regex, function(c) {
          var index = from.indexOf(c);
          return to.charAt(index) || "-";
        });
      return _s.dasherize(str.replace(/[^\w\s-]/g, ""));
    },
    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join("");
    },
    quote: function(str, quoteChar) {
      return _s.surround(str, quoteChar || '"');
    },
    unquote: function(str, quoteChar) {
      quoteChar = quoteChar || '"';
      if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
        return str.slice(1, str.length - 1);
      else return str;
    },
    exports: function() {
      var result = {};
      for (var prop in this) {
        if (
          !this.hasOwnProperty(prop) ||
          prop.match(/^(?:include|contains|reverse)$/)
        )
          continue;
        result[prop] = this[prop];
      }
      return result;
    },
    repeat: function(str, qty, separator) {
      if (str == null) return "";
      qty = ~~qty;
      if (separator == null) return strRepeat(String(str), qty);
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },
    naturalCmp: function(str1, str2) {
      if (str1 == str2) return 0;
      if (!str1) return -1;
      if (!str2) return 1;
      var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
        tokens1 = String(str1)
          .toLowerCase()
          .match(cmpRegex),
        tokens2 = String(str2)
          .toLowerCase()
          .match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);
      for (var i = 0; i < count; i++) {
        var a = tokens1[i],
          b = tokens2[i];
        if (a !== b) {
          var num1 = parseInt(a, 10);
          if (!isNaN(num1)) {
            var num2 = parseInt(b, 10);
            if (!isNaN(num2) && num1 - num2) return num1 - num2;
          }
          return a < b ? -1 : 1;
        }
      }
      if (tokens1.length === tokens2.length)
        return tokens1.length - tokens2.length;
      return str1 < str2 ? -1 : 1;
    },
    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;
      str1 = String(str1);
      str2 = String(str2);
      var current = [],
        prev,
        value;
      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1)) value = prev;
            else value = Math.min(current[j], current[j - 1], prev) + 1;
          else value = i + j;
          prev = current[j];
          current[j] = value;
        }
      return current.pop();
    },
    toBoolean: function(str, trueValues, falseValues) {
      if (typeof str === "number") str = "" + str;
      if (typeof str !== "string") return !!str;
      str = _s.trim(str);
      if (boolMatch(str, trueValues || ["true", "1"])) return true;
      if (boolMatch(str, falseValues || ["false", "0"])) return false;
    }
  };
  _s.strip = _s.trim;
  _s.lstrip = _s.ltrim;
  _s.rstrip = _s.rtrim;
  _s.center = _s.lrpad;
  _s.rjust = _s.lpad;
  _s.ljust = _s.rpad;
  _s.contains = _s.include;
  _s.q = _s.quote;
  _s.toBool = _s.toBoolean;
  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) module.exports = _s;
    exports._s = _s;
  }
  if (typeof define === "function" && define.amd)
    define("underscore.string", [], function() {
      return _s;
    });
  root._ = root._ || {};
  root._.string = root._.str = _s;
})(this, String);

/* /web/static/lib/jquery/jquery.js defined in bundle 'im_livechat.external_lib' */
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = global.document
      ? factory(global, true)
      : function(w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
  } else {
    factory(global);
  }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
  var deletedIds = [];
  var slice = deletedIds.slice;
  var concat = deletedIds.concat;
  var push = deletedIds.push;
  var indexOf = deletedIds.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var support = {};
  var version = "1.11.1",
    jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context);
    },
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function(all, letter) {
      return letter.toUpperCase();
    };
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    get: function(num) {
      return num != null
        ? num < 0
          ? this[num + this.length]
          : this[num]
        : slice.call(this);
    },
    pushStack: function(elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function(callback, args) {
      return jQuery.each(this, callback, args);
    },
    map: function(callback) {
      return this.pushStack(
        jQuery.map(this, function(elem, i) {
          return callback.call(elem, i, elem);
        })
      );
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function() {
      return this.eq(0);
    },
    last: function() {
      return this.eq(-1);
    },
    eq: function(i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function() {
      return this.prevObject || this.constructor(null);
    },
    push: push,
    sort: deletedIds.sort,
    splice: deletedIds.splice
  };
  jQuery.extend = jQuery.fn.extend = function() {
    var src,
      copyIsArray,
      copy,
      name,
      options,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (
            deep &&
            copy &&
            (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))
          ) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function(msg) {
      throw new Error(msg);
    },
    noop: function() {},
    isFunction: function(obj) {
      return jQuery.type(obj) === "function";
    },
    isArray:
      Array.isArray ||
      function(obj) {
        return jQuery.type(obj) === "array";
      },
    isWindow: function(obj) {
      return obj != null && obj == obj.window;
    },
    isNumeric: function(obj) {
      return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0;
    },
    isEmptyObject: function(obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    isPlainObject: function(obj) {
      var key;
      if (
        !obj ||
        jQuery.type(obj) !== "object" ||
        obj.nodeType ||
        jQuery.isWindow(obj)
      ) {
        return false;
      }
      try {
        if (
          obj.constructor &&
          !hasOwn.call(obj, "constructor") &&
          !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")
        ) {
          return false;
        }
      } catch (e) {
        return false;
      }
      if (support.ownLast) {
        for (key in obj) {
          return hasOwn.call(obj, key);
        }
      }
      for (key in obj) {
      }
      return key === undefined || hasOwn.call(obj, key);
    },
    type: function(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function"
        ? class2type[toString.call(obj)] || "object"
        : typeof obj;
    },
    globalEval: function(data) {
      if (data && jQuery.trim(data)) {
        (
          window.execScript ||
          function(data) {
            window["eval"].call(window, data);
          }
        )(data);
      }
    },
    camelCase: function(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    },
    nodeName: function(elem, name) {
      return (
        elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
      );
    },
    each: function(obj, callback, args) {
      var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    },
    makeArray: function(arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function(elem, arr, i) {
      var len;
      if (arr) {
        if (indexOf) {
          return indexOf.call(arr, elem, i);
        }
        len = arr.length;
        i = i ? (i < 0 ? Math.max(0, len + i) : i) : 0;
        for (; i < len; i++) {
          if (i in arr && arr[i] === elem) {
            return i;
          }
        }
      }
      return -1;
    },
    merge: function(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;
      while (j < len) {
        first[i++] = second[j++];
      }
      if (len !== len) {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    grep: function(elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    map: function(elems, callback, arg) {
      var value,
        i = 0,
        length = elems.length,
        isArray = isArraylike(elems),
        ret = [];
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }
      return concat.apply([], ret);
    },
    guid: 1,
    proxy: function(fn, context) {
      var args, proxy, tmp;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = slice.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    now: function() {
      return +new Date();
    },
    support: support
  });
  jQuery.each(
    "Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    }
  );
  function isArraylike(obj) {
    var length = obj.length,
      type = jQuery.type(obj);
    if (type === "function" || jQuery.isWindow(obj)) {
      return false;
    }
    if (obj.nodeType === 1 && length) {
      return true;
    }
    return (
      type === "array" ||
      length === 0 ||
      (typeof length === "number" && length > 0 && length - 1 in obj)
    );
  }
  var Sizzle = (function(window) {
    var i,
      support,
      Expr,
      getText,
      isXML,
      tokenize,
      compile,
      select,
      outermostContext,
      sortInput,
      hasDuplicate,
      setDocument,
      document,
      docElem,
      documentIsHTML,
      rbuggyQSA,
      rbuggyMatches,
      matches,
      contains,
      expando = "sizzle" + -new Date(),
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      sortOrder = function(a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      },
      strundefined = typeof undefined,
      MAX_NEGATIVE = 1 << 31,
      hasOwn = {}.hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      indexOf =
        arr.indexOf ||
        function(elem) {
          var i = 0,
            len = this.length;
          for (; i < len; i++) {
            if (this[i] === elem) {
              return i;
            }
          }
          return -1;
        },
      booleans =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      whitespace = "[\\x20\\t\\r\\n\\f]",
      characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      identifier = characterEncoding.replace("w", "w#"),
      attributes =
        "\\[" +
        whitespace +
        "*(" +
        characterEncoding +
        ")(?:" +
        whitespace +
        "*([*^$|!~]?=)" +
        whitespace +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        identifier +
        "))|)" +
        whitespace +
        "*\\]",
      pseudos =
        ":(" +
        characterEncoding +
        ")(?:\\((" +
        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
        "((?:\\\\.|[^\\\\()[\\]]|" +
        attributes +
        ")*)|" +
        ".*" +
        ")\\)|)",
      rtrim = new RegExp(
        "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
        "g"
      ),
      rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
      rcombinators = new RegExp(
        "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"
      ),
      rattributeQuotes = new RegExp(
        "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]",
        "g"
      ),
      rpseudo = new RegExp(pseudos),
      ridentifier = new RegExp("^" + identifier + "$"),
      matchExpr = {
        ID: new RegExp("^#(" + characterEncoding + ")"),
        CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
        TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + attributes),
        PSEUDO: new RegExp("^" + pseudos),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            whitespace +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            whitespace +
            "*(?:([+-]|)" +
            whitespace +
            "*(\\d+)|))" +
            whitespace +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + booleans + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            whitespace +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            whitespace +
            "*((?:-\\d)?\\d*)" +
            whitespace +
            "*\\)|)(?=[^-]|$)",
          "i"
        )
      },
      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,
      rnative = /^[^{]+\{\s*\[native \w/,
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      rsibling = /[+~]/,
      rescape = /'|\\/g,
      runescape = new RegExp(
        "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)",
        "ig"
      ),
      funescape = function(_, escaped, escapedWhitespace) {
        var high = "0x" + escaped - 0x10000;
        return high !== high || escapedWhitespace
          ? escaped
          : high < 0
          ? String.fromCharCode(high + 0x10000)
          : String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
      };
    try {
      push.apply(
        (arr = slice.call(preferredDoc.childNodes)),
        preferredDoc.childNodes
      );
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length
          ? function(target, els) {
              push_native.apply(target, slice.call(els));
            }
          : function(target, els) {
              var j = target.length,
                i = 0;
              while ((target[j++] = els[i++])) {}
              target.length = j - 1;
            }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var match,
        elem,
        m,
        nodeType,
        i,
        groups,
        old,
        nid,
        newContext,
        newSelector;
      if (
        (context ? context.ownerDocument || context : preferredDoc) !== document
      ) {
        setDocument(context);
      }
      context = context || document;
      results = results || [];
      if (!selector || typeof selector !== "string") {
        return results;
      }
      if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
        return [];
      }
      if (documentIsHTML && !seed) {
        if ((match = rquickExpr.exec(selector))) {
          if ((m = match[1])) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              if (
                context.ownerDocument &&
                (elem = context.ownerDocument.getElementById(m)) &&
                contains(context, elem) &&
                elem.id === m
              ) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;
          } else if (
            (m = match[3]) &&
            support.getElementsByClassName &&
            context.getElementsByClassName
          ) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;
          if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
            groups = tokenize(selector);
            if ((old = context.getAttribute("id"))) {
              nid = old.replace(rescape, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext =
              (rsibling.test(selector) && testContext(context.parentNode)) ||
              context;
            newSelector = groups.join(",");
          }
          if (newSelector) {
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
            } finally {
              if (!old) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key + " ") > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement("div");
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
        i = attrs.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a,
        diff =
          cur &&
          a.nodeType === 1 &&
          b.nodeType === 1 &&
          (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while ((cur = cur.nextSibling)) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function(elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function(argument) {
        argument = +argument;
        return markFunction(function(seed, matches) {
          var j,
            matchIndexes = fn([], seed.length, argument),
            i = matchIndexes.length;
          while (i--) {
            if (seed[(j = matchIndexes[i])]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    function testContext(context) {
      return (
        context &&
        typeof context.getElementsByTagName !== strundefined &&
        context
      );
    }
    support = Sizzle.support = {};
    isXML = Sizzle.isXML = function(elem) {
      var documentElement =
        elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    setDocument = Sizzle.setDocument = function(node) {
      var hasCompare,
        doc = node ? node.ownerDocument || node : preferredDoc,
        parent = doc.defaultView;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = doc.documentElement;
      documentIsHTML = !isXML(doc);
      if (parent && parent !== parent.top) {
        if (parent.addEventListener) {
          parent.addEventListener(
            "unload",
            function() {
              setDocument();
            },
            false
          );
        } else if (parent.attachEvent) {
          parent.attachEvent("onunload", function() {
            setDocument();
          });
        }
      }
      support.attributes = assert(function(div) {
        div.className = "i";
        return !div.getAttribute("className");
      });
      support.getElementsByTagName = assert(function(div) {
        div.appendChild(doc.createComment(""));
        return !div.getElementsByTagName("*").length;
      });
      support.getElementsByClassName =
        rnative.test(doc.getElementsByClassName) &&
        assert(function(div) {
          div.innerHTML = "<div class='a'></div><div class='a i'></div>";
          div.firstChild.className = "i";
          return div.getElementsByClassName("i").length === 2;
        });
      support.getById = assert(function(div) {
        docElem.appendChild(div).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find["ID"] = function(id, context) {
          if (
            typeof context.getElementById !== strundefined &&
            documentIsHTML
          ) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : [];
          }
        };
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        delete Expr.find["ID"];
        Expr.filter["ID"] = function(id) {
          var attrId = id.replace(runescape, funescape);
          return function(elem) {
            var node =
              typeof elem.getAttributeNode !== strundefined &&
              elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }
      Expr.find["TAG"] = support.getElementsByTagName
        ? function(tag, context) {
            if (typeof context.getElementsByTagName !== strundefined) {
              return context.getElementsByTagName(tag);
            }
          }
        : function(tag, context) {
            var elem,
              tmp = [],
              i = 0,
              results = context.getElementsByTagName(tag);
            if (tag === "*") {
              while ((elem = results[i++])) {
                if (elem.nodeType === 1) {
                  tmp.push(elem);
                }
              }
              return tmp;
            }
            return results;
          };
      Expr.find["CLASS"] =
        support.getElementsByClassName &&
        function(className, context) {
          if (
            typeof context.getElementsByClassName !== strundefined &&
            documentIsHTML
          ) {
            return context.getElementsByClassName(className);
          }
        };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if ((support.qsa = rnative.test(doc.querySelectorAll))) {
        assert(function(div) {
          div.innerHTML =
            "<select msallowclip=''><option selected=''></option></select>";
          if (div.querySelectorAll("[msallowclip^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
        });
        assert(function(div) {
          var input = doc.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }
      if (
        (support.matchesSelector = rnative.test(
          (matches =
            docElem.matches ||
            docElem.webkitMatchesSelector ||
            docElem.mozMatchesSelector ||
            docElem.oMatchesSelector ||
            docElem.msMatchesSelector)
        ))
      ) {
        assert(function(div) {
          support.disconnectedMatch = matches.call(div, "div");
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches =
        rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      contains =
        hasCompare || rnative.test(docElem.contains)
          ? function(a, b) {
              var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
              return (
                a === bup ||
                !!(
                  bup &&
                  bup.nodeType === 1 &&
                  (adown.contains
                    ? adown.contains(bup)
                    : a.compareDocumentPosition &&
                      a.compareDocumentPosition(bup) & 16)
                )
              );
            }
          : function(a, b) {
              if (b) {
                while ((b = b.parentNode)) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };
      sortOrder = hasCompare
        ? function(a, b) {
            if (a === b) {
              hasDuplicate = true;
              return 0;
            }
            var compare =
              !a.compareDocumentPosition - !b.compareDocumentPosition;
            if (compare) {
              return compare;
            }
            compare =
              (a.ownerDocument || a) === (b.ownerDocument || b)
                ? a.compareDocumentPosition(b)
                : 1;
            if (
              compare & 1 ||
              (!support.sortDetached &&
                b.compareDocumentPosition(a) === compare)
            ) {
              if (
                a === doc ||
                (a.ownerDocument === preferredDoc && contains(preferredDoc, a))
              ) {
                return -1;
              }
              if (
                b === doc ||
                (b.ownerDocument === preferredDoc && contains(preferredDoc, b))
              ) {
                return 1;
              }
              return sortInput
                ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b)
                : 0;
            }
            return compare & 4 ? -1 : 1;
          }
        : function(a, b) {
            if (a === b) {
              hasDuplicate = true;
              return 0;
            }
            var cur,
              i = 0,
              aup = a.parentNode,
              bup = b.parentNode,
              ap = [a],
              bp = [b];
            if (!aup || !bup) {
              return a === doc
                ? -1
                : b === doc
                ? 1
                : aup
                ? -1
                : bup
                ? 1
                : sortInput
                ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b)
                : 0;
            } else if (aup === bup) {
              return siblingCheck(a, b);
            }
            cur = a;
            while ((cur = cur.parentNode)) {
              ap.unshift(cur);
            }
            cur = b;
            while ((cur = cur.parentNode)) {
              bp.unshift(cur);
            }
            while (ap[i] === bp[i]) {
              i++;
            }
            return i
              ? siblingCheck(ap[i], bp[i])
              : ap[i] === preferredDoc
              ? -1
              : bp[i] === preferredDoc
              ? 1
              : 0;
          };
      return doc;
    };
    Sizzle.matches = function(expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function(elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, "='$1']");
      if (
        support.matchesSelector &&
        documentIsHTML &&
        (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
        (!rbuggyQSA || !rbuggyQSA.test(expr))
      ) {
        try {
          var ret = matches.call(elem, expr);
          if (
            ret ||
            support.disconnectedMatch ||
            (elem.document && elem.document.nodeType !== 11)
          ) {
            return ret;
          }
        } catch (e) {}
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function(context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function(elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        val =
          fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
            ? fn(elem, name, !documentIsHTML)
            : undefined;
      return val !== undefined
        ? val
        : support.attributes || !documentIsHTML
        ? elem.getAttribute(name)
        : (val = elem.getAttributeNode(name)) && val.specified
        ? val.value
        : null;
    };
    Sizzle.error = function(msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };
    Sizzle.uniqueSort = function(results) {
      var elem,
        duplicates = [],
        j = 0,
        i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while ((elem = results[i++])) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      sortInput = null;
      return results;
    };
    getText = Sizzle.getText = function(elem) {
      var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;
      if (!nodeType) {
        while ((node = elem[i++])) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === "string") {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
      },
      preFilter: {
        ATTR: function(match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[3] || match[4] || match[5] || "").replace(
            runescape,
            funescape
          );
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        CHILD: function(match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4]
              ? match[5] + (match[6] || 1)
              : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd");
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        PSEUDO: function(match) {
          var excess,
            unquoted = !match[6] && match[2];
          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }
          if (match[3]) {
            match[2] = match[4] || match[5] || "";
          } else if (
            unquoted &&
            rpseudo.test(unquoted) &&
            (excess = tokenize(unquoted, true)) &&
            (excess =
              unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)
          ) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        TAG: function(nodeNameSelector) {
          var nodeName = nodeNameSelector
            .replace(runescape, funescape)
            .toLowerCase();
          return nodeNameSelector === "*"
            ? function() {
                return true;
              }
            : function(elem) {
                return (
                  elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                );
              };
        },
        CLASS: function(className) {
          var pattern = classCache[className + " "];
          return (
            pattern ||
            ((pattern = new RegExp(
              "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"
            )) &&
              classCache(className, function(elem) {
                return pattern.test(
                  (typeof elem.className === "string" && elem.className) ||
                    (typeof elem.getAttribute !== strundefined &&
                      elem.getAttribute("class")) ||
                    ""
                );
              }))
          );
        },
        ATTR: function(name, operator, check) {
          return function(elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            return operator === "="
              ? result === check
              : operator === "!="
              ? result !== check
              : operator === "^="
              ? check && result.indexOf(check) === 0
              : operator === "*="
              ? check && result.indexOf(check) > -1
              : operator === "$="
              ? check && result.slice(-check.length) === check
              : operator === "~="
              ? (" " + result + " ").indexOf(check) > -1
              : operator === "|="
              ? result === check ||
                result.slice(0, check.length + 1) === check + "-"
              : false;
          };
        },
        CHILD: function(type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
            forward = type.slice(-4) !== "last",
            ofType = what === "of-type";
          return first === 1 && last === 0
            ? function(elem) {
                return !!elem.parentNode;
              }
            : function(elem, context, xml) {
                var cache,
                  outerCache,
                  node,
                  diff,
                  nodeIndex,
                  start,
                  dir = simple !== forward ? "nextSibling" : "previousSibling",
                  parent = elem.parentNode,
                  name = ofType && elem.nodeName.toLowerCase(),
                  useCache = !xml && !ofType;
                if (parent) {
                  if (simple) {
                    while (dir) {
                      node = elem;
                      while ((node = node[dir])) {
                        if (
                          ofType
                            ? node.nodeName.toLowerCase() === name
                            : node.nodeType === 1
                        ) {
                          return false;
                        }
                      }
                      start = dir = type === "only" && !start && "nextSibling";
                    }
                    return true;
                  }
                  start = [forward ? parent.firstChild : parent.lastChild];
                  if (forward && useCache) {
                    outerCache = parent[expando] || (parent[expando] = {});
                    cache = outerCache[type] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = cache[0] === dirruns && cache[2];
                    node = nodeIndex && parent.childNodes[nodeIndex];
                    while (
                      (node =
                        (++nodeIndex && node && node[dir]) ||
                        (diff = nodeIndex = 0) ||
                        start.pop())
                    ) {
                      if (node.nodeType === 1 && ++diff && node === elem) {
                        outerCache[type] = [dirruns, nodeIndex, diff];
                        break;
                      }
                    }
                  } else if (
                    useCache &&
                    (cache = (elem[expando] || (elem[expando] = {}))[type]) &&
                    cache[0] === dirruns
                  ) {
                    diff = cache[1];
                  } else {
                    while (
                      (node =
                        (++nodeIndex && node && node[dir]) ||
                        (diff = nodeIndex = 0) ||
                        start.pop())
                    ) {
                      if (
                        (ofType
                          ? node.nodeName.toLowerCase() === name
                          : node.nodeType === 1) &&
                        ++diff
                      ) {
                        if (useCache) {
                          (node[expando] || (node[expando] = {}))[type] = [
                            dirruns,
                            diff
                          ];
                        }
                        if (node === elem) {
                          break;
                        }
                      }
                    }
                  }
                  diff -= last;
                  return (
                    diff === first || (diff % first === 0 && diff / first >= 0)
                  );
                }
              };
        },
        PSEUDO: function(pseudo, argument) {
          var args,
            fn =
              Expr.pseudos[pseudo] ||
              Expr.setFilters[pseudo.toLowerCase()] ||
              Sizzle.error("unsupported pseudo: " + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
              ? markFunction(function(seed, matches) {
                  var idx,
                    matched = fn(seed, argument),
                    i = matched.length;
                  while (i--) {
                    idx = indexOf.call(seed, matched[i]);
                    seed[idx] = !(matches[idx] = matched[i]);
                  }
                })
              : function(elem) {
                  return fn(elem, 0, args);
                };
          }
          return fn;
        }
      },
      pseudos: {
        not: markFunction(function(selector) {
          var input = [],
            results = [],
            matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando]
            ? markFunction(function(seed, matches, context, xml) {
                var elem,
                  unmatched = matcher(seed, null, xml, []),
                  i = seed.length;
                while (i--) {
                  if ((elem = unmatched[i])) {
                    seed[i] = !(matches[i] = elem);
                  }
                }
              })
            : function(elem, context, xml) {
                input[0] = elem;
                matcher(input, null, xml, results);
                return !results.pop();
              };
        }),
        has: markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        contains: markFunction(function(text) {
          return function(elem) {
            return (
              (elem.textContent || elem.innerText || getText(elem)).indexOf(
                text
              ) > -1
            );
          };
        }),
        lang: markFunction(function(lang) {
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function(elem) {
            var elemLang;
            do {
              if (
                (elemLang = documentIsHTML
                  ? elem.lang
                  : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))
              ) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        target: function(elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        root: function(elem) {
          return elem === docElem;
        },
        focus: function(elem) {
          return (
            elem === document.activeElement &&
            (!document.hasFocus || document.hasFocus()) &&
            !!(elem.type || elem.href || ~elem.tabIndex)
          );
        },
        enabled: function(elem) {
          return elem.disabled === false;
        },
        disabled: function(elem) {
          return elem.disabled === true;
        },
        checked: function(elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return (
            (nodeName === "input" && !!elem.checked) ||
            (nodeName === "option" && !!elem.selected)
          );
        },
        selected: function(elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        empty: function(elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent: function(elem) {
          return !Expr.pseudos["empty"](elem);
        },
        header: function(elem) {
          return rheader.test(elem.nodeName);
        },
        input: function(elem) {
          return rinputs.test(elem.nodeName);
        },
        button: function(elem) {
          var name = elem.nodeName.toLowerCase();
          return (
            (name === "input" && elem.type === "button") || name === "button"
          );
        },
        text: function(elem) {
          var attr;
          return (
            elem.nodeName.toLowerCase() === "input" &&
            elem.type === "text" &&
            ((attr = elem.getAttribute("type")) == null ||
              attr.toLowerCase() === "text")
          );
        },
        first: createPositionalPseudo(function() {
          return [0];
        }),
        last: createPositionalPseudo(function(matchIndexes, length) {
          return [length - 1];
        }),
        eq: createPositionalPseudo(function(matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        even: createPositionalPseudo(function(matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        odd: createPositionalPseudo(function(matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        lt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        gt: createPositionalPseudo(function(matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length; ) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos["nth"] = Expr.pseudos["eq"];
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in { submit: true, reset: true }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function(selector, parseOnly) {
      var matched,
        match,
        tokens,
        type,
        soFar,
        groups,
        preFilters,
        cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push((tokens = []));
        }
        matched = false;
        if ((match = rcombinators.exec(soFar))) {
          matched = match.shift();
          tokens.push({ value: matched, type: match[0].replace(rtrim, " ") });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if (
            (match = matchExpr[type].exec(soFar)) &&
            (!preFilters[type] || (match = preFilters[type](match)))
          ) {
            matched = match.shift();
            tokens.push({ value: matched, type: type, matches: match });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly
        ? soFar.length
        : soFar
        ? Sizzle.error(selector)
        : tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0,
        len = tokens.length,
        selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;
      return combinator.first
        ? function(elem, context, xml) {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                return matcher(elem, context, xml);
              }
            }
          }
        : function(elem, context, xml) {
            var oldCache,
              outerCache,
              newCache = [dirruns, doneName];
            if (xml) {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  if (matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            } else {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  outerCache = elem[expando] || (elem[expando] = {});
                  if (
                    (oldCache = outerCache[dir]) &&
                    oldCache[0] === dirruns &&
                    oldCache[1] === doneName
                  ) {
                    return (newCache[2] = oldCache[2]);
                  } else {
                    outerCache[dir] = newCache;
                    if ((newCache[2] = matcher(elem, context, xml))) {
                      return true;
                    }
                  }
                }
              }
            }
          };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1
        ? function(elem, context, xml) {
            var i = matchers.length;
            while (i--) {
              if (!matchers[i](elem, context, xml)) {
                return false;
              }
            }
            return true;
          }
        : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
        len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;
      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(
      preFilter,
      selector,
      matcher,
      postFilter,
      postFinder,
      postSelector
    ) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function(seed, results, context, xml) {
        var temp,
          i,
          elem,
          preMap = [],
          postMap = [],
          preexisting = results.length,
          elems =
            seed ||
            multipleContexts(
              selector || "*",
              context.nodeType ? [context] : context,
              []
            ),
          matcherIn =
            preFilter && (seed || !selector)
              ? condense(elems, preMap, preFilter, context, xml)
              : elems,
          matcherOut = matcher
            ? postFinder || (seed ? preFilter : preexisting || postFilter)
              ? []
              : results
            : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if (
                (elem = matcherOut[i]) &&
                (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1
              ) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(
            matcherOut === results
              ? matcherOut.splice(preexisting, matcherOut.length)
              : matcherOut
          );
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
        matcher,
        j,
        len = tokens.length,
        leadingRelative = Expr.relative[tokens[0].type],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,
        matchContext = addCombinator(
          function(elem) {
            return elem === checkContext;
          },
          implicitRelative,
          true
        ),
        matchAnyContext = addCombinator(
          function(elem) {
            return indexOf.call(checkContext, elem) > -1;
          },
          implicitRelative,
          true
        ),
        matchers = [
          function(elem, context, xml) {
            return (
              (!leadingRelative && (xml || context !== outermostContext)) ||
              ((checkContext = context).nodeType
                ? matchContext(elem, context, xml)
                : matchAnyContext(elem, context, xml))
            );
          }
        ];
      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(
              i > 1 && elementMatcher(matchers),
              i > 1 &&
                toSelector(
                  tokens
                    .slice(0, i - 1)
                    .concat({ value: tokens[i - 2].type === " " ? "*" : "" })
                ).replace(rtrim, "$1"),
              matcher,
              i < j && matcherFromTokens(tokens.slice(i, j)),
              j < len && matcherFromTokens((tokens = tokens.slice(j))),
              j < len && toSelector(tokens)
            );
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function(seed, context, xml, results, outermost) {
          var elem,
            j,
            matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            elems = seed || (byElement && Expr.find["TAG"]("*", outermost)),
            dirrunsUnique = (dirruns +=
              contextBackup == null ? 1 : Math.random() || 0.1),
            len = elems.length;
          if (outermost) {
            outermostContext = context !== document && context;
          }
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              while ((matcher = elementMatchers[j++])) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }
            if (bySet) {
              if ((elem = !matcher && elem)) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            j = 0;
            while ((matcher = setMatchers[j++])) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push.apply(results, setMatched);
            if (
              outermost &&
              !seed &&
              setMatched.length > 0 &&
              matchedCount + setMatchers.length > 1
            ) {
              Sizzle.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function(selector, match) {
      var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[selector + " "];
      if (!cached) {
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(
          selector,
          matcherFromGroupMatchers(elementMatchers, setMatchers)
        );
        cached.selector = selector;
      }
      return cached;
    };
    select = Sizzle.select = function(selector, context, results, seed) {
      var i,
        tokens,
        token,
        type,
        find,
        compiled = typeof selector === "function" && selector,
        match = !seed && tokenize((selector = compiled.selector || selector));
      results = results || [];
      if (match.length === 1) {
        tokens = match[0] = match[0].slice(0);
        if (
          tokens.length > 2 &&
          (token = tokens[0]).type === "ID" &&
          support.getById &&
          context.nodeType === 9 &&
          documentIsHTML &&
          Expr.relative[tokens[1].type]
        ) {
          context = (Expr.find["ID"](
            token.matches[0].replace(runescape, funescape),
            context
          ) || [])[0];
          if (!context) {
            return results;
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          if (Expr.relative[(type = token.type)]) {
            break;
          }
          if ((find = Expr.find[type])) {
            if (
              (seed = find(
                token.matches[0].replace(runescape, funescape),
                (rsibling.test(tokens[0].type) &&
                  testContext(context.parentNode)) ||
                  context
              ))
            ) {
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      (compiled || compile(selector, match))(
        seed,
        context,
        !documentIsHTML,
        results,
        (rsibling.test(selector) && testContext(context.parentNode)) || context
      );
      return results;
    };
    support.sortStable =
      expando
        .split("")
        .sort(sortOrder)
        .join("") === expando;
    support.detectDuplicates = !!hasDuplicate;
    setDocument();
    support.sortDetached = assert(function(div1) {
      return div1.compareDocumentPosition(document.createElement("div")) & 1;
    });
    if (
      !assert(function(div) {
        div.innerHTML = "<a href='#'></a>";
        return div.firstChild.getAttribute("href") === "#";
      })
    ) {
      addHandle("type|href|height|width", function(elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
        }
      });
    }
    if (
      !support.attributes ||
      !assert(function(div) {
        div.innerHTML = "<input/>";
        div.firstChild.setAttribute("value", "");
        return div.firstChild.getAttribute("value") === "";
      })
    ) {
      addHandle("value", function(elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === "input") {
          return elem.defaultValue;
        }
      });
    }
    if (
      !assert(function(div) {
        return div.getAttribute("disabled") == null;
      })
    ) {
      addHandle(booleans, function(elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true
            ? name.toLowerCase()
            : (val = elem.getAttributeNode(name)) && val.specified
            ? val.value
            : null;
        }
      });
    }
    return Sizzle;
  })(window);
  jQuery.find = Sizzle;
  jQuery.expr = Sizzle.selectors;
  jQuery.expr[":"] = jQuery.expr.pseudos;
  jQuery.unique = Sizzle.uniqueSort;
  jQuery.text = Sizzle.getText;
  jQuery.isXMLDoc = Sizzle.isXML;
  jQuery.contains = Sizzle.contains;
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
  var risSimple = /^.[^:#\[\.,]*$/;
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function(elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function(elem) {
        return (elem === qualifier) !== not;
      });
    }
    if (typeof qualifier === "string") {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function(elem) {
      return jQuery.inArray(elem, qualifier) >= 0 !== not;
    });
  }
  jQuery.filter = function(expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    return elems.length === 1 && elem.nodeType === 1
      ? jQuery.find.matchesSelector(elem, expr)
        ? [elem]
        : []
      : jQuery.find.matches(
          expr,
          jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1;
          })
        );
  };
  jQuery.fn.extend({
    find: function(selector) {
      var i,
        ret = [],
        self = this,
        len = self.length;
      if (typeof selector !== "string") {
        return this.pushStack(
          jQuery(selector).filter(function() {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this)) {
                return true;
              }
            }
          })
        );
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + " " + selector : selector;
      return ret;
    },
    filter: function(selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function(selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function(selector) {
      return !!winnow(
        this,
        typeof selector === "string" && rneedsContext.test(selector)
          ? jQuery(selector)
          : selector || [],
        false
      ).length;
    }
  });
  var rootjQuery,
    document = window.document,
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    init = (jQuery.fn.init = function(selector, context) {
      var match, elem;
      if (!selector) {
        return this;
      }
      if (typeof selector === "string") {
        if (
          selector.charAt(0) === "<" &&
          selector.charAt(selector.length - 1) === ">" &&
          selector.length >= 3
        ) {
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(
              this,
              jQuery.parseHTML(
                match[1],
                context && context.nodeType
                  ? context.ownerDocument || context
                  : document,
                true
              )
            );
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              if (elem.id !== match[2]) {
                return rootjQuery.find(selector);
              }
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
      } else if (jQuery.isFunction(selector)) {
        return typeof rootjQuery.ready !== "undefined"
          ? rootjQuery.ready(selector)
          : selector(jQuery);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    });
  init.prototype = jQuery.fn;
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.extend({
    dir: function(elem, dir, until) {
      var matched = [],
        cur = elem[dir];
      while (
        cur &&
        cur.nodeType !== 9 &&
        (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))
      ) {
        if (cur.nodeType === 1) {
          matched.push(cur);
        }
        cur = cur[dir];
      }
      return matched;
    },
    sibling: function(n, elem) {
      var r = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          r.push(n);
        }
      }
      return r;
    }
  });
  jQuery.fn.extend({
    has: function(target) {
      var i,
        targets = jQuery(target, this),
        len = targets.length;
      return this.filter(function() {
        for (i = 0; i < len; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function(selectors, context) {
      var cur,
        i = 0,
        l = this.length,
        matched = [],
        pos =
          rneedsContext.test(selectors) || typeof selectors !== "string"
            ? jQuery(selectors, context || this.context)
            : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (
            cur.nodeType < 11 &&
            (pos
              ? pos.index(cur) > -1
              : cur.nodeType === 1 &&
                jQuery.find.matchesSelector(cur, selectors))
          ) {
            matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(
        matched.length > 1 ? jQuery.unique(matched) : matched
      );
    },
    index: function(elem) {
      if (!elem) {
        return this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      }
      if (typeof elem === "string") {
        return jQuery.inArray(this[0], jQuery(elem));
      }
      return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
    },
    add: function(selector, context) {
      return this.pushStack(
        jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context)))
      );
    },
    addBack: function(selector) {
      return this.add(
        selector == null ? this.prevObject : this.prevObject.filter(selector)
      );
    }
  });
  function sibling(cur, dir) {
    do {
      cur = cur[dir];
    } while (cur && cur.nodeType !== 1);
    return cur;
  }
  jQuery.each(
    {
      parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function(elem) {
        return jQuery.dir(elem, "parentNode");
      },
      parentsUntil: function(elem, i, until) {
        return jQuery.dir(elem, "parentNode", until);
      },
      next: function(elem) {
        return sibling(elem, "nextSibling");
      },
      prev: function(elem) {
        return sibling(elem, "previousSibling");
      },
      nextAll: function(elem) {
        return jQuery.dir(elem, "nextSibling");
      },
      prevAll: function(elem) {
        return jQuery.dir(elem, "previousSibling");
      },
      nextUntil: function(elem, i, until) {
        return jQuery.dir(elem, "nextSibling", until);
      },
      prevUntil: function(elem, i, until) {
        return jQuery.dir(elem, "previousSibling", until);
      },
      siblings: function(elem) {
        return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
      },
      children: function(elem) {
        return jQuery.sibling(elem.firstChild);
      },
      contents: function(elem) {
        return jQuery.nodeName(elem, "iframe")
          ? elem.contentDocument || elem.contentWindow.document
          : jQuery.merge([], elem.childNodes);
      }
    },
    function(name, fn) {
      jQuery.fn[name] = function(until, selector) {
        var ret = jQuery.map(this, fn, until);
        if (name.slice(-5) !== "Until") {
          selector = until;
        }
        if (selector && typeof selector === "string") {
          ret = jQuery.filter(selector, ret);
        }
        if (this.length > 1) {
          if (!guaranteedUnique[name]) {
            ret = jQuery.unique(ret);
          }
          if (rparentsprev.test(name)) {
            ret = ret.reverse();
          }
        }
        return this.pushStack(ret);
      };
    }
  );
  var rnotwhite = /\S+/g;
  var optionsCache = {};
  function createOptions(options) {
    var object = (optionsCache[options] = {});
    jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function(options) {
    options =
      typeof options === "string"
        ? optionsCache[options] || createOptions(options)
        : jQuery.extend({}, options);
    var firing,
      memory,
      fired,
      firingLength,
      firingIndex,
      firingStart,
      list = [],
      stack = !options.once && [],
      fire = function(data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (
            list[firingIndex].apply(data[0], data[1]) === false &&
            options.stopOnFalse
          ) {
            memory = false;
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      },
      self = {
        add: function() {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function(_, arg) {
                var type = jQuery.type(arg);
                if (type === "function") {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && type !== "string") {
                  add(arg);
                }
              });
            })(arguments);
            if (firing) {
              firingLength = list.length;
            } else if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
          return this;
        },
        remove: function() {
          if (list) {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--;
                  }
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              }
            });
          }
          return this;
        },
        has: function(fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
        },
        empty: function() {
          list = [];
          firingLength = 0;
          return this;
        },
        disable: function() {
          list = stack = memory = undefined;
          return this;
        },
        disabled: function() {
          return !list;
        },
        lock: function() {
          stack = undefined;
          if (!memory) {
            self.disable();
          }
          return this;
        },
        locked: function() {
          return !stack;
        },
        fireWith: function(context, args) {
          if (list && (!fired || stack)) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            if (firing) {
              stack.push(args);
            } else {
              fire(args);
            }
          }
          return this;
        },
        fire: function() {
          self.fireWith(this, arguments);
          return this;
        },
        fired: function() {
          return !!fired;
        }
      };
    return self;
  };
  jQuery.extend({
    Deferred: function(func) {
      var tuples = [
          ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
          ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
          ["notify", "progress", jQuery.Callbacks("memory")]
        ],
        state = "pending",
        promise = {
          state: function() {
            return state;
          },
          always: function() {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function() {
            var fns = arguments;
            return jQuery
              .Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned
                        .promise()
                        .done(newDefer.resolve)
                        .fail(newDefer.reject)
                        .progress(newDefer.notify);
                    } else {
                      newDefer[tuple[0] + "With"](
                        this === promise ? newDefer.promise() : this,
                        fn ? [returned] : arguments
                      );
                    }
                  });
                });
                fns = null;
              })
              .promise();
          },
          promise: function(obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        },
        deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
          stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(
            function() {
              state = stateString;
            },
            tuples[i ^ 1][2].disable,
            tuples[2][2].lock
          );
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](
            this === deferred ? promise : this,
            arguments
          );
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function(subordinate) {
      var i = 0,
        resolveValues = slice.call(arguments),
        length = resolveValues.length,
        remaining =
          length !== 1 ||
          (subordinate && jQuery.isFunction(subordinate.promise))
            ? length
            : 0,
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        updateFunc = function(i, contexts, values) {
          return function(value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        },
        progressValues,
        progressContexts,
        resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i]
              .promise()
              .done(updateFunc(i, resolveContexts, resolveValues))
              .fail(deferred.reject)
              .progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  var readyList;
  jQuery.fn.ready = function(fn) {
    jQuery.ready.promise().done(fn);
    return this;
  };
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function(wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      if (!document.body) {
        return setTimeout(jQuery.ready);
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler("ready");
        jQuery(document).off("ready");
      }
    }
  });
  function detach() {
    if (document.addEventListener) {
      document.removeEventListener("DOMContentLoaded", completed, false);
      window.removeEventListener("load", completed, false);
    } else {
      document.detachEvent("onreadystatechange", completed);
      window.detachEvent("onload", completed);
    }
  }
  function completed() {
    if (
      document.addEventListener ||
      event.type === "load" ||
      document.readyState === "complete"
    ) {
      detach();
      jQuery.ready();
    }
  }
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === "complete") {
        setTimeout(jQuery.ready);
      } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", completed, false);
        window.addEventListener("load", completed, false);
      } else {
        document.attachEvent("onreadystatechange", completed);
        window.attachEvent("onload", completed);
        var top = false;
        try {
          top = window.frameElement == null && document.documentElement;
        } catch (e) {}
        if (top && top.doScroll) {
          (function doScrollCheck() {
            if (!jQuery.isReady) {
              try {
                top.doScroll("left");
              } catch (e) {
                return setTimeout(doScrollCheck, 50);
              }
              detach();
              jQuery.ready();
            }
          })();
        }
      }
    }
    return readyList.promise(obj);
  };
  var strundefined = typeof undefined;
  var i;
  for (i in jQuery(support)) {
    break;
  }
  support.ownLast = i !== "0";
  support.inlineBlockNeedsLayout = false;
  jQuery(function() {
    var val, div, body, container;
    body = document.getElementsByTagName("body")[0];
    if (!body || !body.style) {
      return;
    }
    div = document.createElement("div");
    container = document.createElement("div");
    container.style.cssText =
      "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
    body.appendChild(container).appendChild(div);
    if (typeof div.style.zoom !== strundefined) {
      div.style.cssText =
        "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
      support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
      if (val) {
        body.style.zoom = 1;
      }
    }
    body.removeChild(container);
  });
  (function() {
    var div = document.createElement("div");
    if (support.deleteExpando == null) {
      support.deleteExpando = true;
      try {
        delete div.test;
      } catch (e) {
        support.deleteExpando = false;
      }
    }
    div = null;
  })();
  jQuery.acceptData = function(elem) {
    var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
      nodeType = +elem.nodeType || 1;
    return nodeType !== 1 && nodeType !== 9
      ? false
      : !noData || (noData !== true && elem.getAttribute("classid") === noData);
  };
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /([A-Z])/g;
  function dataAttr(elem, key, data) {
    if (data === undefined && elem.nodeType === 1) {
      var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data =
            data === "true"
              ? true
              : data === "false"
              ? false
              : data === "null"
              ? null
              : +data + "" === data
              ? +data
              : rbrace.test(data)
              ? jQuery.parseJSON(data)
              : data;
        } catch (e) {}
        jQuery.data(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  function isEmptyDataObject(obj) {
    var name;
    for (name in obj) {
      if (name === "data" && jQuery.isEmptyObject(obj[name])) {
        continue;
      }
      if (name !== "toJSON") {
        return false;
      }
    }
    return true;
  }
  function internalData(elem, name, data, pvt) {
    if (!jQuery.acceptData(elem)) {
      return;
    }
    var ret,
      thisCache,
      internalKey = jQuery.expando,
      isNode = elem.nodeType,
      cache = isNode ? jQuery.cache : elem,
      id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
    if (
      (!id || !cache[id] || (!pvt && !cache[id].data)) &&
      data === undefined &&
      typeof name === "string"
    ) {
      return;
    }
    if (!id) {
      if (isNode) {
        id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
      } else {
        id = internalKey;
      }
    }
    if (!cache[id]) {
      cache[id] = isNode ? {} : { toJSON: jQuery.noop };
    }
    if (typeof name === "object" || typeof name === "function") {
      if (pvt) {
        cache[id] = jQuery.extend(cache[id], name);
      } else {
        cache[id].data = jQuery.extend(cache[id].data, name);
      }
    }
    thisCache = cache[id];
    if (!pvt) {
      if (!thisCache.data) {
        thisCache.data = {};
      }
      thisCache = thisCache.data;
    }
    if (data !== undefined) {
      thisCache[jQuery.camelCase(name)] = data;
    }
    if (typeof name === "string") {
      ret = thisCache[name];
      if (ret == null) {
        ret = thisCache[jQuery.camelCase(name)];
      }
    } else {
      ret = thisCache;
    }
    return ret;
  }
  function internalRemoveData(elem, name, pvt) {
    if (!jQuery.acceptData(elem)) {
      return;
    }
    var thisCache,
      i,
      isNode = elem.nodeType,
      cache = isNode ? jQuery.cache : elem,
      id = isNode ? elem[jQuery.expando] : jQuery.expando;
    if (!cache[id]) {
      return;
    }
    if (name) {
      thisCache = pvt ? cache[id] : cache[id].data;
      if (thisCache) {
        if (!jQuery.isArray(name)) {
          if (name in thisCache) {
            name = [name];
          } else {
            name = jQuery.camelCase(name);
            if (name in thisCache) {
              name = [name];
            } else {
              name = name.split(" ");
            }
          }
        } else {
          name = name.concat(jQuery.map(name, jQuery.camelCase));
        }
        i = name.length;
        while (i--) {
          delete thisCache[name[i]];
        }
        if (
          pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)
        ) {
          return;
        }
      }
    }
    if (!pvt) {
      delete cache[id].data;
      if (!isEmptyDataObject(cache[id])) {
        return;
      }
    }
    if (isNode) {
      jQuery.cleanData([elem], true);
    } else if (support.deleteExpando || cache != cache.window) {
      delete cache[id];
    } else {
      cache[id] = null;
    }
  }
  jQuery.extend({
    cache: {},
    noData: {
      "applet ": true,
      "embed ": true,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function(elem) {
      elem = elem.nodeType
        ? jQuery.cache[elem[jQuery.expando]]
        : elem[jQuery.expando];
      return !!elem && !isEmptyDataObject(elem);
    },
    data: function(elem, name, data) {
      return internalData(elem, name, data);
    },
    removeData: function(elem, name) {
      return internalRemoveData(elem, name);
    },
    _data: function(elem, name, data) {
      return internalData(elem, name, data, true);
    },
    _removeData: function(elem, name) {
      return internalRemoveData(elem, name, true);
    }
  });
  jQuery.fn.extend({
    data: function(key, value) {
      var i,
        name,
        data,
        elem = this[0],
        attrs = elem && elem.attributes;
      if (key === undefined) {
        if (this.length) {
          data = jQuery.data(elem);
          if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
            i = attrs.length;
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = jQuery.camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            jQuery._data(elem, "parsedAttrs", true);
          }
        }
        return data;
      }
      if (typeof key === "object") {
        return this.each(function() {
          jQuery.data(this, key);
        });
      }
      return arguments.length > 1
        ? this.each(function() {
            jQuery.data(this, key, value);
          })
        : elem
        ? dataAttr(elem, key, jQuery.data(elem, key))
        : undefined;
    },
    removeData: function(key) {
      return this.each(function() {
        jQuery.removeData(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function(elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = jQuery._data(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = jQuery._data(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function() {
          jQuery.dequeue(elem, type);
        };
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function(elem, type) {
      var key = type + "queueHooks";
      return (
        jQuery._data(elem, key) ||
        jQuery._data(elem, key, {
          empty: jQuery.Callbacks("once memory").add(function() {
            jQuery._removeData(elem, type + "queue");
            jQuery._removeData(elem, key);
          })
        })
      );
    }
  });
  jQuery.fn.extend({
    queue: function(type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined
        ? this
        : this.each(function() {
            var queue = jQuery.queue(this, type, data);
            jQuery._queueHooks(this, type);
            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
    },
    dequeue: function(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function(type) {
      return this.queue(type || "fx", []);
    },
    promise: function(type, obj) {
      var tmp,
        count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function() {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = jQuery._data(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var isHidden = function(elem, el) {
    elem = el || elem;
    return (
      jQuery.css(elem, "display") === "none" ||
      !jQuery.contains(elem.ownerDocument, elem)
    );
  };
  var access = (jQuery.access = function(
    elems,
    fn,
    key,
    value,
    chainable,
    emptyGet,
    raw
  ) {
    var i = 0,
      length = elems.length,
      bulk = key == null;
    if (jQuery.type(key) === "object") {
      chainable = true;
      for (i in key) {
        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
      }
    } else if (value !== undefined) {
      chainable = true;
      if (!jQuery.isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        if (raw) {
          fn.call(elems, value);
          fn = null;
        } else {
          bulk = fn;
          fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < length; i++) {
          fn(
            elems[i],
            key,
            raw ? value : value.call(elems[i], i, fn(elems[i], key))
          );
        }
      }
    }
    return chainable
      ? elems
      : bulk
      ? fn.call(elems)
      : length
      ? fn(elems[0], key)
      : emptyGet;
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  (function() {
    var input = document.createElement("input"),
      div = document.createElement("div"),
      fragment = document.createDocumentFragment();
    div.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    support.leadingWhitespace = div.firstChild.nodeType === 3;
    support.tbody = !div.getElementsByTagName("tbody").length;
    support.htmlSerialize = !!div.getElementsByTagName("link").length;
    support.html5Clone =
      document.createElement("nav").cloneNode(true).outerHTML !==
      "<:nav></:nav>";
    input.type = "checkbox";
    input.checked = true;
    fragment.appendChild(input);
    support.appendChecked = input.checked;
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    fragment.appendChild(div);
    div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
    support.noCloneEvent = true;
    if (div.attachEvent) {
      div.attachEvent("onclick", function() {
        support.noCloneEvent = false;
      });
      div.cloneNode(true).click();
    }
    if (support.deleteExpando == null) {
      support.deleteExpando = true;
      try {
        delete div.test;
      } catch (e) {
        support.deleteExpando = false;
      }
    }
  })();
  (function() {
    var i,
      eventName,
      div = document.createElement("div");
    for (i in { submit: true, change: true, focusin: true }) {
      eventName = "on" + i;
      if (!(support[i + "Bubbles"] = eventName in window)) {
        div.setAttribute(eventName, "t");
        support[i + "Bubbles"] = div.attributes[eventName].expando === false;
      }
    }
    div = null;
  })();
  var rformElems = /^(?:input|select|textarea)$/i,
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
  jQuery.event = {
    global: {},
    add: function(elem, types, handler, data, selector) {
      var tmp,
        events,
        t,
        handleObjIn,
        special,
        eventHandle,
        handleObj,
        handlers,
        type,
        namespaces,
        origType,
        elemData = jQuery._data(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function(e) {
          return typeof jQuery !== strundefined &&
            (!e || jQuery.event.triggered !== e.type)
            ? jQuery.event.dispatch.apply(eventHandle.elem, arguments)
            : undefined;
        };
        eventHandle.elem = elem;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend(
          {
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext:
              selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join(".")
          },
          handleObjIn
        );
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (
            !special.setup ||
            special.setup.call(elem, data, namespaces, eventHandle) === false
          ) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            } else if (elem.attachEvent) {
              elem.attachEvent("on" + type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
      elem = null;
    },
    remove: function(elem, types, handler, selector, mappedTypes) {
      var j,
        handleObj,
        tmp,
        origCount,
        t,
        events,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || "").match(rnotwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp =
          tmp[2] &&
          new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if (
            (mappedTypes || origType === handleObj.origType) &&
            (!handler || handler.guid === handleObj.guid) &&
            (!tmp || tmp.test(handleObj.namespace)) &&
            (!selector ||
              selector === handleObj.selector ||
              (selector === "**" && handleObj.selector))
          ) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (
            !special.teardown ||
            special.teardown.call(elem, namespaces, elemData.handle) === false
          ) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        jQuery._removeData(elem, "events");
      }
    },
    trigger: function(event, data, elem, onlyHandlers) {
      var handle,
        ontype,
        cur,
        bubbleType,
        special,
        tmp,
        i,
        eventPath = [elem || document],
        type = hasOwn.call(event, "type") ? event.type : event,
        namespaces = hasOwn.call(event, "namespace")
          ? event.namespace.split(".")
          : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") >= 0) {
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;
      event = event[jQuery.expando]
        ? event
        : new jQuery.Event(type, typeof event === "object" && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.namespace_re = event.namespace
        ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)")
        : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (
        !onlyHandlers &&
        special.trigger &&
        special.trigger.apply(elem, data) === false
      ) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle =
          (jQuery._data(cur, "events") || {})[event.type] &&
          jQuery._data(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && handle.apply && jQuery.acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if (
          (!special._default ||
            special._default.apply(eventPath.pop(), data) === false) &&
          jQuery.acceptData(elem)
        ) {
          if (ontype && elem[type] && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            try {
              elem[type]();
            } catch (e) {}
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function(event) {
      event = jQuery.event.fix(event);
      var i,
        ret,
        handleObj,
        matched,
        j,
        handlerQueue = [],
        args = slice.call(arguments),
        handlers = (jQuery._data(this, "events") || {})[event.type] || [],
        special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (
        special.preDispatch &&
        special.preDispatch.call(this, event) === false
      ) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while (
          (handleObj = matched.handlers[j++]) &&
          !event.isImmediatePropagationStopped()
        ) {
          if (
            !event.namespace_re ||
            event.namespace_re.test(handleObj.namespace)
          ) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = (
              (jQuery.event.special[handleObj.origType] || {}).handle ||
              handleObj.handler
            ).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function(event, handlers) {
      var sel,
        handleObj,
        matches,
        i,
        handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target;
      if (
        delegateCount &&
        cur.nodeType &&
        (!event.button || event.type !== "click")
      ) {
        for (; cur != this; cur = cur.parentNode || this) {
          if (
            cur.nodeType === 1 &&
            (cur.disabled !== true || event.type !== "click")
          ) {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + " ";
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext
                  ? jQuery(sel, this).index(cur) >= 0
                  : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({ elem: cur, handlers: matches });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    fix: function(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i,
        prop,
        copy,
        type = event.type,
        originalEvent = event,
        fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type)
          ? this.mouseHooks
          : rkeyEvent.test(type)
          ? this.keyHooks
          : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = originalEvent.srcElement || document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      event.metaKey = !!event.metaKey;
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
      " "
    ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(event, original) {
        if (event.which == null) {
          event.which =
            original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
        " "
      ),
      filter: function(event, original) {
        var body,
          eventDoc,
          doc,
          button = original.button,
          fromElement = original.fromElement;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX =
            original.clientX +
            ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
            ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
          event.pageY =
            original.clientY +
            ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
            ((doc && doc.clientTop) || (body && body.clientTop) || 0);
        }
        if (!event.relatedTarget && fromElement) {
          event.relatedTarget =
            fromElement === event.target ? original.toElement : fromElement;
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    special: {
      load: { noBubble: true },
      focus: {
        trigger: function() {
          if (this !== safeActiveElement() && this.focus) {
            try {
              this.focus();
              return false;
            } catch (e) {}
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          if (
            jQuery.nodeName(this, "input") &&
            this.type === "checkbox" &&
            this.click
          ) {
            this.click();
            return false;
          }
        },
        _default: function(event) {
          return jQuery.nodeName(event.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function(event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate: function(type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true,
        originalEvent: {}
      });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.removeEvent = document.removeEventListener
    ? function(elem, type, handle) {
        if (elem.removeEventListener) {
          elem.removeEventListener(type, handle, false);
        }
      }
    : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
          if (typeof elem[name] === strundefined) {
            elem[name] = null;
          }
          elem.detachEvent(name, handle);
        }
      };
  jQuery.Event = function(src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented =
        src.defaultPrevented ||
        (src.defaultPrevented === undefined && src.returnValue === false)
          ? returnTrue
          : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = (src && src.timeStamp) || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (!e) {
        return;
      }
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (!e) {
        return;
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && e.stopImmediatePropagation) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };
  jQuery.each(
    {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    },
    function(orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function(event) {
          var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;
          if (
            !related ||
            (related !== target && !jQuery.contains(target, related))
          ) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    }
  );
  if (!support.submitBubbles) {
    jQuery.event.special.submit = {
      setup: function() {
        if (jQuery.nodeName(this, "form")) {
          return false;
        }
        jQuery.event.add(this, "click._submit keypress._submit", function(e) {
          var elem = e.target,
            form =
              jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button")
                ? elem.form
                : undefined;
          if (form && !jQuery._data(form, "submitBubbles")) {
            jQuery.event.add(form, "submit._submit", function(event) {
              event._submit_bubble = true;
            });
            jQuery._data(form, "submitBubbles", true);
          }
        });
      },
      postDispatch: function(event) {
        if (event._submit_bubble) {
          delete event._submit_bubble;
          if (this.parentNode && !event.isTrigger) {
            jQuery.event.simulate("submit", this.parentNode, event, true);
          }
        }
      },
      teardown: function() {
        if (jQuery.nodeName(this, "form")) {
          return false;
        }
        jQuery.event.remove(this, "._submit");
      }
    };
  }
  if (!support.changeBubbles) {
    jQuery.event.special.change = {
      setup: function() {
        if (rformElems.test(this.nodeName)) {
          if (this.type === "checkbox" || this.type === "radio") {
            jQuery.event.add(this, "propertychange._change", function(event) {
              if (event.originalEvent.propertyName === "checked") {
                this._just_changed = true;
              }
            });
            jQuery.event.add(this, "click._change", function(event) {
              if (this._just_changed && !event.isTrigger) {
                this._just_changed = false;
              }
              jQuery.event.simulate("change", this, event, true);
            });
          }
          return false;
        }
        jQuery.event.add(this, "beforeactivate._change", function(e) {
          var elem = e.target;
          if (
            rformElems.test(elem.nodeName) &&
            !jQuery._data(elem, "changeBubbles")
          ) {
            jQuery.event.add(elem, "change._change", function(event) {
              if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                jQuery.event.simulate("change", this.parentNode, event, true);
              }
            });
            jQuery._data(elem, "changeBubbles", true);
          }
        });
      },
      handle: function(event) {
        var elem = event.target;
        if (
          this !== elem ||
          event.isSimulated ||
          event.isTrigger ||
          (elem.type !== "radio" && elem.type !== "checkbox")
        ) {
          return event.handleObj.handler.apply(this, arguments);
        }
      },
      teardown: function() {
        jQuery.event.remove(this, "._change");
        return !rformElems.test(this.nodeName);
      }
    };
  }
  if (!support.focusinBubbles) {
    jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {
      var handler = function(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
      };
      jQuery.event.special[fix] = {
        setup: function() {
          var doc = this.ownerDocument || this,
            attaches = jQuery._data(doc, fix);
          if (!attaches) {
            doc.addEventListener(orig, handler, true);
          }
          jQuery._data(doc, fix, (attaches || 0) + 1);
        },
        teardown: function() {
          var doc = this.ownerDocument || this,
            attaches = jQuery._data(doc, fix) - 1;
          if (!attaches) {
            doc.removeEventListener(orig, handler, true);
            jQuery._removeData(doc, fix);
          } else {
            jQuery._data(doc, fix, attaches);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function(types, selector, data, fn, one) {
      var type, origFn;
      if (typeof types === "object") {
        if (typeof selector !== "string") {
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === "string") {
          fn = data;
          data = undefined;
        } else {
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function(event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function() {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function(types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function(types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(
          handleObj.namespace
            ? handleObj.origType + "." + handleObj.namespace
            : handleObj.origType,
          handleObj.selector,
          handleObj.handler
        );
        return this;
      }
      if (typeof types === "object") {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    trigger: function(type, data) {
      return this.each(function() {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function(type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  function createSafeFragment(document) {
    var list = nodeNames.split("|"),
      safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement) {
      while (list.length) {
        safeFrag.createElement(list.pop());
      }
    }
    return safeFrag;
  }
  var nodeNames =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
      "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
    rleadingWhitespace = /^\s+/,
    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rtbody = /<tbody/i,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /^$|\/(?:java|ecma)script/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    wrapMap = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    safeFragment = createSafeFragment(document),
    fragmentDiv = safeFragment.appendChild(document.createElement("div"));
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption =
    wrapMap.thead;
  wrapMap.th = wrapMap.td;
  function getAll(context, tag) {
    var elems,
      elem,
      i = 0,
      found =
        typeof context.getElementsByTagName !== strundefined
          ? context.getElementsByTagName(tag || "*")
          : typeof context.querySelectorAll !== strundefined
          ? context.querySelectorAll(tag || "*")
          : undefined;
    if (!found) {
      for (
        found = [], elems = context.childNodes || context;
        (elem = elems[i]) != null;
        i++
      ) {
        if (!tag || jQuery.nodeName(elem, tag)) {
          found.push(elem);
        } else {
          jQuery.merge(found, getAll(elem, tag));
        }
      }
    }
    return tag === undefined || (tag && jQuery.nodeName(context, tag))
      ? jQuery.merge([context], found)
      : found;
  }
  function fixDefaultChecked(elem) {
    if (rcheckableType.test(elem.type)) {
      elem.defaultChecked = elem.checked;
    }
  }
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, "table") &&
      jQuery.nodeName(
        content.nodeType !== 11 ? content : content.firstChild,
        "tr"
      )
      ? elem.getElementsByTagName("tbody")[0] ||
          elem.appendChild(elem.ownerDocument.createElement("tbody"))
      : elem;
  }
  function disableScript(elem) {
    elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function setGlobalEval(elems, refElements) {
    var elem,
      i = 0;
    for (; (elem = elems[i]) != null; i++) {
      jQuery._data(
        elem,
        "globalEval",
        !refElements || jQuery._data(refElements[i], "globalEval")
      );
    }
  }
  function cloneCopyEvent(src, dest) {
    if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
      return;
    }
    var type,
      i,
      l,
      oldData = jQuery._data(src),
      curData = jQuery._data(dest, oldData),
      events = oldData.events;
    if (events) {
      delete curData.handle;
      curData.events = {};
      for (type in events) {
        for (i = 0, l = events[type].length; i < l; i++) {
          jQuery.event.add(dest, type, events[type][i]);
        }
      }
    }
    if (curData.data) {
      curData.data = jQuery.extend({}, curData.data);
    }
  }
  function fixCloneNodeIssues(src, dest) {
    var nodeName, e, data;
    if (dest.nodeType !== 1) {
      return;
    }
    nodeName = dest.nodeName.toLowerCase();
    if (!support.noCloneEvent && dest[jQuery.expando]) {
      data = jQuery._data(dest);
      for (e in data.events) {
        jQuery.removeEvent(dest, e, data.handle);
      }
      dest.removeAttribute(jQuery.expando);
    }
    if (nodeName === "script" && dest.text !== src.text) {
      disableScript(dest).text = src.text;
      restoreScript(dest);
    } else if (nodeName === "object") {
      if (dest.parentNode) {
        dest.outerHTML = src.outerHTML;
      }
      if (support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML)) {
        dest.innerHTML = src.innerHTML;
      }
    } else if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.defaultChecked = dest.checked = src.checked;
      if (dest.value !== src.value) {
        dest.value = src.value;
      }
    } else if (nodeName === "option") {
      dest.defaultSelected = dest.selected = src.defaultSelected;
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  jQuery.extend({
    clone: function(elem, dataAndEvents, deepDataAndEvents) {
      var destElements,
        node,
        clone,
        i,
        srcElements,
        inPage = jQuery.contains(elem.ownerDocument, elem);
      if (
        support.html5Clone ||
        jQuery.isXMLDoc(elem) ||
        !rnoshimcache.test("<" + elem.nodeName + ">")
      ) {
        clone = elem.cloneNode(true);
      } else {
        fragmentDiv.innerHTML = elem.outerHTML;
        fragmentDiv.removeChild((clone = fragmentDiv.firstChild));
      }
      if (
        (!support.noCloneEvent || !support.noCloneChecked) &&
        (elem.nodeType === 1 || elem.nodeType === 11) &&
        !jQuery.isXMLDoc(elem)
      ) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0; (node = srcElements[i]) != null; ++i) {
          if (destElements[i]) {
            fixCloneNodeIssues(node, destElements[i]);
          }
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0; (node = srcElements[i]) != null; i++) {
            cloneCopyEvent(node, destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }
      destElements = srcElements = node = null;
      return clone;
    },
    buildFragment: function(elems, context, scripts, selection) {
      var j,
        elem,
        contains,
        tmp,
        tag,
        tbody,
        wrap,
        l = elems.length,
        safe = createSafeFragment(context),
        nodes = [],
        i = 0;
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (jQuery.type(elem) === "object") {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || safe.appendChild(context.createElement("div"));
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML =
              wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
              nodes.push(
                context.createTextNode(rleadingWhitespace.exec(elem)[0])
              );
            }
            if (!support.tbody) {
              elem =
                tag === "table" && !rtbody.test(elem)
                  ? tmp.firstChild
                  : wrap[1] === "<table>" && !rtbody.test(elem)
                  ? tmp
                  : 0;
              j = elem && elem.childNodes.length;
              while (j--) {
                if (
                  jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") &&
                  !tbody.childNodes.length
                ) {
                  elem.removeChild(tbody);
                }
              }
            }
            jQuery.merge(nodes, tmp.childNodes);
            tmp.textContent = "";
            while (tmp.firstChild) {
              tmp.removeChild(tmp.firstChild);
            }
            tmp = safe.lastChild;
          }
        }
      }
      if (tmp) {
        safe.removeChild(tmp);
      }
      if (!support.appendChecked) {
        jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
      }
      i = 0;
      while ((elem = nodes[i++])) {
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue;
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        tmp = getAll(safe.appendChild(elem), "script");
        if (contains) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while ((elem = tmp[j++])) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem);
            }
          }
        }
      }
      tmp = null;
      return safe;
    },
    cleanData: function(elems, acceptData) {
      var elem,
        type,
        id,
        data,
        i = 0,
        internalKey = jQuery.expando,
        cache = jQuery.cache,
        deleteExpando = support.deleteExpando,
        special = jQuery.event.special;
      for (; (elem = elems[i]) != null; i++) {
        if (acceptData || jQuery.acceptData(elem)) {
          id = elem[internalKey];
          data = id && cache[id];
          if (data) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (cache[id]) {
              delete cache[id];
              if (deleteExpando) {
                delete elem[internalKey];
              } else if (typeof elem.removeAttribute !== strundefined) {
                elem.removeAttribute(internalKey);
              } else {
                elem[internalKey] = null;
              }
              deletedIds.push(id);
            }
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    text: function(value) {
      return access(
        this,
        function(value) {
          return value === undefined
            ? jQuery.text(this)
            : this.empty().append(
                ((this[0] && this[0].ownerDocument) || document).createTextNode(
                  value
                )
              );
        },
        null,
        value,
        arguments.length
      );
    },
    append: function() {
      return this.domManip(arguments, function(elem) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function() {
      return this.domManip(arguments, function(elem) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function() {
      return this.domManip(arguments, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove: function(selector, keepData) {
      var elem,
        elems = selector ? jQuery.filter(selector, this) : this,
        i = 0;
      for (; (elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, "script"));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty: function() {
      var elem,
        i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
        }
        while (elem.firstChild) {
          elem.removeChild(elem.firstChild);
        }
        if (elem.options && jQuery.nodeName(elem, "select")) {
          elem.options.length = 0;
        }
      }
      return this;
    },
    clone: function(dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents =
        deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function() {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function(value) {
      return access(
        this,
        function(value) {
          var elem = this[0] || {},
            i = 0,
            l = this.length;
          if (value === undefined) {
            return elem.nodeType === 1
              ? elem.innerHTML.replace(rinlinejQuery, "")
              : undefined;
          }
          if (
            typeof value === "string" &&
            !rnoInnerhtml.test(value) &&
            (support.htmlSerialize || !rnoshimcache.test(value)) &&
            (support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
            !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]
          ) {
            value = value.replace(rxhtmlTag, "<$1></$2>");
            try {
              for (; i < l; i++) {
                elem = this[i] || {};
                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false));
                  elem.innerHTML = value;
                }
              }
              elem = 0;
            } catch (e) {}
          }
          if (elem) {
            this.empty().append(value);
          }
        },
        null,
        value,
        arguments.length
      );
    },
    replaceWith: function() {
      var arg = arguments[0];
      this.domManip(arguments, function(elem) {
        arg = this.parentNode;
        jQuery.cleanData(getAll(this));
        if (arg) {
          arg.replaceChild(elem, this);
        }
      });
      return arg && (arg.length || arg.nodeType) ? this : this.remove();
    },
    detach: function(selector) {
      return this.remove(selector, true);
    },
    domManip: function(args, callback) {
      args = concat.apply([], args);
      var first,
        node,
        hasScripts,
        scripts,
        doc,
        fragment,
        i = 0,
        l = this.length,
        set = this,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value);
      if (
        isFunction ||
        (l > 1 &&
          typeof value === "string" &&
          !support.checkClone &&
          rchecked.test(value))
      ) {
        return this.each(function(index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          self.domManip(args, callback);
        });
      }
      if (l) {
        fragment = jQuery.buildFragment(
          args,
          this[0].ownerDocument,
          false,
          this
        );
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, "script"));
              }
            }
            callback.call(this[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery.map(scripts, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (
                rscriptType.test(node.type || "") &&
                !jQuery._data(node, "globalEval") &&
                jQuery.contains(doc, node)
              ) {
                if (node.src) {
                  if (jQuery._evalUrl) {
                    jQuery._evalUrl(node.src);
                  }
                } else {
                  jQuery.globalEval(
                    (
                      node.text ||
                      node.textContent ||
                      node.innerHTML ||
                      ""
                    ).replace(rcleanScript, "")
                  );
                }
              }
            }
          }
          fragment = first = null;
        }
      }
      return this;
    }
  });
  jQuery.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    },
    function(name, original) {
      jQuery.fn[name] = function(selector) {
        var elems,
          i = 0,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1;
        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          jQuery(insert[i])[original](elems);
          push.apply(ret, elems.get());
        }
        return this.pushStack(ret);
      };
    }
  );
  var iframe,
    elemdisplay = {};
  function actualDisplay(name, doc) {
    var style,
      elem = jQuery(doc.createElement(name)).appendTo(doc.body),
      display =
        window.getDefaultComputedStyle &&
        (style = window.getDefaultComputedStyle(elem[0]))
          ? style.display
          : jQuery.css(elem[0], "display");
    elem.detach();
    return display;
  }
  function defaultDisplay(nodeName) {
    var doc = document,
      display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === "none" || !display) {
        iframe = (
          iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")
        ).appendTo(doc.documentElement);
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
        doc.write();
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  (function() {
    var shrinkWrapBlocksVal;
    support.shrinkWrapBlocks = function() {
      if (shrinkWrapBlocksVal != null) {
        return shrinkWrapBlocksVal;
      }
      shrinkWrapBlocksVal = false;
      var div, body, container;
      body = document.getElementsByTagName("body")[0];
      if (!body || !body.style) {
        return;
      }
      div = document.createElement("div");
      container = document.createElement("div");
      container.style.cssText =
        "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
      body.appendChild(container).appendChild(div);
      if (typeof div.style.zoom !== strundefined) {
        div.style.cssText =
          "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
          "box-sizing:content-box;display:block;margin:0;border:0;" +
          "padding:1px;width:1px;zoom:1";
        div.appendChild(document.createElement("div")).style.width = "5px";
        shrinkWrapBlocksVal = div.offsetWidth !== 3;
      }
      body.removeChild(container);
      return shrinkWrapBlocksVal;
    };
  })();
  var rmargin = /^margin/;
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var getStyles,
    curCSS,
    rposition = /^(top|right|bottom|left)$/;
  if (window.getComputedStyle) {
    getStyles = function(elem) {
      return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
    };
    curCSS = function(elem, name, computed) {
      var width,
        minWidth,
        maxWidth,
        ret,
        style = elem.style;
      computed = computed || getStyles(elem);
      ret = computed
        ? computed.getPropertyValue(name) || computed[name]
        : undefined;
      if (computed) {
        if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
          ret = jQuery.style(elem, name);
        }
        if (rnumnonpx.test(ret) && rmargin.test(name)) {
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }
      return ret === undefined ? ret : ret + "";
    };
  } else if (document.documentElement.currentStyle) {
    getStyles = function(elem) {
      return elem.currentStyle;
    };
    curCSS = function(elem, name, computed) {
      var left,
        rs,
        rsLeft,
        ret,
        style = elem.style;
      computed = computed || getStyles(elem);
      ret = computed ? computed[name] : undefined;
      if (ret == null && style && style[name]) {
        ret = style[name];
      }
      if (rnumnonpx.test(ret) && !rposition.test(name)) {
        left = style.left;
        rs = elem.runtimeStyle;
        rsLeft = rs && rs.left;
        if (rsLeft) {
          rs.left = elem.currentStyle.left;
        }
        style.left = name === "fontSize" ? "1em" : ret;
        ret = style.pixelLeft + "px";
        style.left = left;
        if (rsLeft) {
          rs.left = rsLeft;
        }
      }
      return ret === undefined ? ret : ret + "" || "auto";
    };
  }
  function addGetHookIf(conditionFn, hookFn) {
    return {
      get: function() {
        var condition = conditionFn();
        if (condition == null) {
          return;
        }
        if (condition) {
          delete this.get;
          return;
        }
        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }
  (function() {
    var div,
      style,
      a,
      pixelPositionVal,
      boxSizingReliableVal,
      reliableHiddenOffsetsVal,
      reliableMarginRightVal;
    div = document.createElement("div");
    div.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    a = div.getElementsByTagName("a")[0];
    style = a && a.style;
    if (!style) {
      return;
    }
    style.cssText = "float:left;opacity:.5";
    support.opacity = style.opacity === "0.5";
    support.cssFloat = !!style.cssFloat;
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    support.boxSizing =
      style.boxSizing === "" ||
      style.MozBoxSizing === "" ||
      style.WebkitBoxSizing === "";
    jQuery.extend(support, {
      reliableHiddenOffsets: function() {
        if (reliableHiddenOffsetsVal == null) {
          computeStyleTests();
        }
        return reliableHiddenOffsetsVal;
      },
      boxSizingReliable: function() {
        if (boxSizingReliableVal == null) {
          computeStyleTests();
        }
        return boxSizingReliableVal;
      },
      pixelPosition: function() {
        if (pixelPositionVal == null) {
          computeStyleTests();
        }
        return pixelPositionVal;
      },
      reliableMarginRight: function() {
        if (reliableMarginRightVal == null) {
          computeStyleTests();
        }
        return reliableMarginRightVal;
      }
    });
    function computeStyleTests() {
      var div, body, container, contents;
      body = document.getElementsByTagName("body")[0];
      if (!body || !body.style) {
        return;
      }
      div = document.createElement("div");
      container = document.createElement("div");
      container.style.cssText =
        "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
      body.appendChild(container).appendChild(div);
      div.style.cssText =
        "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
        "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
        "border:1px;padding:1px;width:4px;position:absolute";
      pixelPositionVal = boxSizingReliableVal = false;
      reliableMarginRightVal = true;
      if (window.getComputedStyle) {
        pixelPositionVal =
          (window.getComputedStyle(div, null) || {}).top !== "1%";
        boxSizingReliableVal =
          (window.getComputedStyle(div, null) || { width: "4px" }).width ===
          "4px";
        contents = div.appendChild(document.createElement("div"));
        contents.style.cssText = div.style.cssText =
          "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
          "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
        contents.style.marginRight = contents.style.width = "0";
        div.style.width = "1px";
        reliableMarginRightVal = !parseFloat(
          (window.getComputedStyle(contents, null) || {}).marginRight
        );
      }
      div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
      contents = div.getElementsByTagName("td");
      contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
      reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
      if (reliableHiddenOffsetsVal) {
        contents[0].style.display = "";
        contents[1].style.display = "none";
        reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
      }
      body.removeChild(container);
    }
  })();
  jQuery.swap = function(elem, options, callback, args) {
    var ret,
      name,
      old = {};
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var ralpha = /alpha\([^)]*\)/i,
    ropacity = /opacity\s*=\s*([^)]*)/,
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
    rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
    cssNormalTransform = { letterSpacing: "0", fontWeight: "400" },
    cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1),
      origName = name,
      i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function showHide(elements, show) {
    var display,
      elem,
      hidden,
      values = [],
      index = 0,
      length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = jQuery._data(elem, "olddisplay");
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === "none") {
          elem.style.display = "";
        }
        if (elem.style.display === "" && isHidden(elem)) {
          values[index] = jQuery._data(
            elem,
            "olddisplay",
            defaultDisplay(elem.nodeName)
          );
        }
      } else {
        hidden = isHidden(elem);
        if ((display && display !== "none") || !hidden) {
          jQuery._data(
            elem,
            "olddisplay",
            hidden ? display : jQuery.css(elem, "display")
          );
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = show ? values[index] || "" : "none";
      }
    }
    return elements;
  }
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches
      ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px")
      : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i =
        extra === (isBorderBox ? "border" : "content")
          ? 4
          : name === "width"
          ? 1
          : 0,
      val = 0;
    for (; i < 4; i += 2) {
      if (extra === "margin") {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === "content") {
          val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if (extra !== "margin") {
          val -= jQuery.css(
            elem,
            "border" + cssExpand[i] + "Width",
            true,
            styles
          );
        }
      } else {
        val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if (extra !== "padding") {
          val += jQuery.css(
            elem,
            "border" + cssExpand[i] + "Width",
            true,
            styles
          );
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true,
      val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
      styles = getStyles(elem),
      isBorderBox =
        support.boxSizing &&
        jQuery.css(elem, "boxSizing", false, styles) === "border-box";
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox =
        isBorderBox &&
        (support.boxSizingReliable() || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return (
      val +
      augmentWidthOrHeight(
        elem,
        name,
        extra || (isBorderBox ? "border" : "content"),
        valueIsBorderBox,
        styles
      ) +
      "px"
    );
  }
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function(elem, computed) {
          if (computed) {
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    cssNumber: {
      columnCount: true,
      fillOpacity: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true
    },
    cssProps: { float: support.cssFloat ? "cssFloat" : "styleFloat" },
    style: function(elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret,
        type,
        hooks,
        origName = jQuery.camelCase(name),
        style = elem.style;
      name =
        jQuery.cssProps[origName] ||
        (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === "string" && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = "number";
        }
        if (value == null || value !== value) {
          return;
        }
        if (type === "number" && !jQuery.cssNumber[origName]) {
          value += "px";
        }
        if (
          !support.clearCloneStyle &&
          value === "" &&
          name.indexOf("background") === 0
        ) {
          style[name] = "inherit";
        }
        if (
          !hooks ||
          !("set" in hooks) ||
          (value = hooks.set(elem, value, extra)) !== undefined
        ) {
          try {
            style[name] = value;
          } catch (e) {}
        }
      } else {
        if (
          hooks &&
          "get" in hooks &&
          (ret = hooks.get(elem, false, extra)) !== undefined
        ) {
          return ret;
        }
        return style[name];
      }
    },
    css: function(elem, name, extra, styles) {
      var num,
        val,
        hooks,
        origName = jQuery.camelCase(name);
      name =
        jQuery.cssProps[origName] ||
        (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function(i, name) {
    jQuery.cssHooks[name] = {
      get: function(elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, "display")) &&
            elem.offsetWidth === 0
            ? jQuery.swap(elem, cssShow, function() {
                return getWidthOrHeight(elem, name, extra);
              })
            : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function(elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(
          elem,
          value,
          extra
            ? augmentWidthOrHeight(
                elem,
                name,
                extra,
                support.boxSizing &&
                  jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                styles
              )
            : 0
        );
      }
    };
  });
  if (!support.opacity) {
    jQuery.cssHooks.opacity = {
      get: function(elem, computed) {
        return ropacity.test(
          (computed && elem.currentStyle
            ? elem.currentStyle.filter
            : elem.style.filter) || ""
        )
          ? 0.01 * parseFloat(RegExp.$1) + ""
          : computed
          ? "1"
          : "";
      },
      set: function(elem, value) {
        var style = elem.style,
          currentStyle = elem.currentStyle,
          opacity = jQuery.isNumeric(value)
            ? "alpha(opacity=" + value * 100 + ")"
            : "",
          filter = (currentStyle && currentStyle.filter) || style.filter || "";
        style.zoom = 1;
        if (
          (value >= 1 || value === "") &&
          jQuery.trim(filter.replace(ralpha, "")) === "" &&
          style.removeAttribute
        ) {
          style.removeAttribute("filter");
          if (value === "" || (currentStyle && !currentStyle.filter)) {
            return;
          }
        }
        style.filter = ralpha.test(filter)
          ? filter.replace(ralpha, opacity)
          : filter + " " + opacity;
      }
    };
  }
  jQuery.cssHooks.marginRight = addGetHookIf(
    support.reliableMarginRight,
    function(elem, computed) {
      if (computed) {
        return jQuery.swap(elem, { display: "inline-block" }, curCSS, [
          elem,
          "marginRight"
        ]);
      }
    }
  );
  jQuery.each({ margin: "", padding: "", border: "Width" }, function(
    prefix,
    suffix
  ) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function(value) {
        var i = 0,
          expanded = {},
          parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] =
            parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function(name, value) {
      return access(
        this,
        function(elem, name, value) {
          var styles,
            len,
            map = {},
            i = 0;
          if (jQuery.isArray(name)) {
            styles = getStyles(elem);
            len = name.length;
            for (; i < len; i++) {
              map[name[i]] = jQuery.css(elem, name[i], false, styles);
            }
            return map;
          }
          return value !== undefined
            ? jQuery.style(elem, name, value)
            : jQuery.css(elem, name);
        },
        name,
        value,
        arguments.length > 1
      );
    },
    show: function() {
      return showHide(this, true);
    },
    hide: function() {
      return showHide(this);
    },
    toggle: function(state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function() {
        if (isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function(elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || "swing";
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get
        ? hooks.get(this)
        : Tween.propHooks._default.get(this);
    },
    run: function(percent) {
      var eased,
        hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](
          percent,
          this.options.duration * percent,
          0,
          1,
          this.options.duration
        );
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function(tween) {
        var result;
        if (
          tween.elem[tween.prop] != null &&
          (!tween.elem.style || tween.elem.style[tween.prop] == null)
        ) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, "");
        return !result || result === "auto" ? 0 : result;
      },
      set: function(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (
          tween.elem.style &&
          (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
            jQuery.cssHooks[tween.prop])
        ) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function(tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear: function(p) {
      return p;
    },
    swing: function(p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.step = {};
  var fxNow,
    timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
    rrun = /queueHooks$/,
    animationPrefilters = [defaultPrefilter],
    tweeners = {
      "*": [
        function(prop, value) {
          var tween = this.createTween(prop, value),
            target = tween.cur(),
            parts = rfxnum.exec(value),
            unit = (parts && parts[3]) || (jQuery.cssNumber[prop] ? "" : "px"),
            start =
              (jQuery.cssNumber[prop] || (unit !== "px" && +target)) &&
              rfxnum.exec(jQuery.css(tween.elem, prop)),
            scale = 1,
            maxIterations = 20;
          if (start && start[3] !== unit) {
            unit = unit || start[3];
            parts = parts || [];
            start = +target || 1;
            do {
              scale = scale || ".5";
              start = start / scale;
              jQuery.style(tween.elem, prop, start + unit);
            } while (
              scale !== (scale = tween.cur() / target) &&
              scale !== 1 &&
              --maxIterations
            );
          }
          if (parts) {
            start = tween.start = +start || +target || 0;
            tween.unit = unit;
            tween.end = parts[1]
              ? start + (parts[1] + 1) * parts[2]
              : +parts[2];
          }
          return tween;
        }
      ]
    };
  function createFxNow() {
    setTimeout(function() {
      fxNow = undefined;
    });
    return (fxNow = jQuery.now());
  }
  function genFx(type, includeWidth) {
    var which,
      attrs = { height: type },
      i = 0;
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
      collection = (tweeners[prop] || []).concat(tweeners["*"]),
      index = 0,
      length = collection.length;
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
      value,
      toggle,
      tween,
      hooks,
      oldfire,
      display,
      checkDisplay,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHidden(elem),
      dataShow = jQuery._data(elem, "fxshow");
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      display = jQuery.css(elem, "display");
      checkDisplay =
        display === "none"
          ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName)
          : display;
      if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
        if (
          !support.inlineBlockNeedsLayout ||
          defaultDisplay(elem.nodeName) === "inline"
        ) {
          style.display = "inline-block";
        } else {
          style.zoom = 1;
        }
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      if (!support.shrinkWrapBlocks()) {
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = (dataShow && dataShow[prop]) || jQuery.style(elem, prop);
      } else {
        display = undefined;
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ("hidden" in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = jQuery._data(elem, "fxshow", {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        jQuery._removeData(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === "width" || prop === "height" ? 1 : 0;
          }
        }
      }
    } else if (
      (display === "none" ? defaultDisplay(elem.nodeName) : display) ===
      "inline"
    ) {
      style.display = display;
    }
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
      stopped,
      index = 0,
      length = animationPrefilters.length,
      deferred = jQuery.Deferred().always(function() {
        delete tick.elem;
      }),
      tick = function() {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(
            0,
            animation.startTime + animation.duration - currentTime
          ),
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, { specialEasing: {} }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function(prop, end) {
          var tween = jQuery.Tween(
            elem,
            animation.opts,
            prop,
            end,
            animation.opts.specialEasing[prop] || animation.opts.easing
          );
          animation.tweens.push(tween);
          return tween;
        },
        stop: function(gotoEnd) {
          var index = 0,
            length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        }
      }),
      props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(
        animation,
        elem,
        props,
        animation.opts
      );
      if (result) {
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(
      jQuery.extend(tick, {
        elem: elem,
        anim: animation,
        queue: animation.opts.queue
      })
    );
    return animation
      .progress(animation.opts.progress)
      .done(animation.opts.done, animation.opts.complete)
      .fail(animation.opts.fail)
      .always(animation.opts.always);
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function(props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.split(" ");
      }
      var prop,
        index = 0,
        length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function(callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  jQuery.speed = function(speed, easing, fn) {
    var opt =
      speed && typeof speed === "object"
        ? jQuery.extend({}, speed)
        : {
            complete:
              fn || (!fn && easing) || (jQuery.isFunction(speed) && speed),
            duration: speed,
            easing:
              (fn && easing) || (easing && !jQuery.isFunction(easing) && easing)
          };
    opt.duration = jQuery.fx.off
      ? 0
      : typeof opt.duration === "number"
      ? opt.duration
      : opt.duration in jQuery.fx.speeds
      ? jQuery.fx.speeds[opt.duration]
      : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }
    opt.old = opt.complete;
    opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function(speed, to, easing, callback) {
      return this.filter(isHidden)
        .css("opacity", 0)
        .show()
        .end()
        .animate({ opacity: to }, speed, easing, callback);
    },
    animate: function(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function() {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || jQuery._data(this, "finish")) {
            anim.stop(true);
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false
        ? this.each(doAnimation)
        : this.queue(optall.queue, doAnimation);
    },
    stop: function(type, clearQueue, gotoEnd) {
      var stopQueue = function(hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || "fx", []);
      }
      return this.each(function() {
        var dequeue = true,
          index = type != null && type + "queueHooks",
          timers = jQuery.timers,
          data = jQuery._data(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (
            timers[index].elem === this &&
            (type == null || timers[index].queue === type)
          ) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function(type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function() {
        var index,
          data = jQuery._data(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function(i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function(speed, easing, callback) {
      return speed == null || typeof speed === "boolean"
        ? cssFn.apply(this, arguments)
        : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.each(
    {
      slideDown: genFx("show"),
      slideUp: genFx("hide"),
      slideToggle: genFx("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" }
    },
    function(name, props) {
      jQuery.fn[name] = function(speed, easing, callback) {
        return this.animate(props, speed, easing, callback);
      };
    }
  );
  jQuery.timers = [];
  jQuery.fx.tick = function() {
    var timer,
      timers = jQuery.timers,
      i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function(timer) {
    jQuery.timers.push(timer);
    if (timer()) {
      jQuery.fx.start();
    } else {
      jQuery.timers.pop();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function() {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function() {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = { slow: 600, fast: 200, _default: 400 };
  jQuery.fn.delay = function(time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function(next, hooks) {
      var timeout = setTimeout(next, time);
      hooks.stop = function() {
        clearTimeout(timeout);
      };
    });
  };
  (function() {
    var input, div, select, a, opt;
    div = document.createElement("div");
    div.setAttribute("className", "t");
    div.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    a = div.getElementsByTagName("a")[0];
    select = document.createElement("select");
    opt = select.appendChild(document.createElement("option"));
    input = div.getElementsByTagName("input")[0];
    a.style.cssText = "top:1px";
    support.getSetAttribute = div.className !== "t";
    support.style = /top/.test(a.getAttribute("style"));
    support.hrefNormalized = a.getAttribute("href") === "/a";
    support.checkOn = !!input.value;
    support.optSelected = opt.selected;
    support.enctype = !!document.createElement("form").enctype;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement("input");
    input.setAttribute("value", "");
    support.input = input.getAttribute("value") === "";
    input.value = "t";
    input.setAttribute("type", "radio");
    support.radioValue = input.value === "t";
  })();
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function(value) {
      var hooks,
        ret,
        isFunction,
        elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks =
            jQuery.valHooks[elem.type] ||
            jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (
            hooks &&
            "get" in hooks &&
            (ret = hooks.get(elem, "value")) !== undefined
          ) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === "string"
            ? ret.replace(rreturn, "")
            : ret == null
            ? ""
            : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function(i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function(value) {
            return value == null ? "" : value + "";
          });
        }
        hooks =
          jQuery.valHooks[this.type] ||
          jQuery.valHooks[this.nodeName.toLowerCase()];
        if (
          !hooks ||
          !("set" in hooks) ||
          hooks.set(this, val, "value") === undefined
        ) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function(elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val : jQuery.trim(jQuery.text(elem));
        }
      },
      select: {
        get: function(elem) {
          var value,
            option,
            options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === "select-one" || index < 0,
            values = one ? null : [],
            max = one ? index + 1 : options.length,
            i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if (
              (option.selected || i === index) &&
              (support.optDisabled
                ? !option.disabled
                : option.getAttribute("disabled") === null) &&
              (!option.parentNode.disabled ||
                !jQuery.nodeName(option.parentNode, "optgroup"))
            ) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function(elem, value) {
          var optionSet,
            option,
            options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length;
          while (i--) {
            option = options[i];
            if (
              jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0
            ) {
              try {
                option.selected = optionSet = true;
              } catch (_) {
                option.scrollHeight;
              }
            } else {
              option.selected = false;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return options;
        }
      }
    }
  });
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = {
      set: function(elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked =
            jQuery.inArray(jQuery(elem).val(), value) >= 0);
        }
      }
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });
  var nodeHook,
    boolHook,
    attrHandle = jQuery.expr.attrHandle,
    ruseDefault = /^(?:checked|selected)$/i,
    getSetAttribute = support.getSetAttribute,
    getSetInput = support.input;
  jQuery.fn.extend({
    attr: function(name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function(elem, name, value) {
      var hooks,
        ret,
        nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === strundefined) {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks =
          jQuery.attrHooks[name] ||
          (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
        } else if (
          hooks &&
          "set" in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined
        ) {
          return ret;
        } else {
          elem.setAttribute(name, value + "");
          return value;
        }
      } else if (
        hooks &&
        "get" in hooks &&
        (ret = hooks.get(elem, name)) !== null
      ) {
        return ret;
      } else {
        ret = jQuery.find.attr(elem, name);
        return ret == null ? undefined : ret;
      }
    },
    removeAttr: function(elem, value) {
      var name,
        propName,
        i = 0,
        attrNames = value && value.match(rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            if ((getSetInput && getSetAttribute) || !ruseDefault.test(name)) {
              elem[propName] = false;
            } else {
              elem[jQuery.camelCase("default-" + name)] = elem[
                propName
              ] = false;
            }
          } else {
            jQuery.attr(elem, name, "");
          }
          elem.removeAttribute(getSetAttribute ? name : propName);
        }
      }
    },
    attrHooks: {
      type: {
        set: function(elem, value) {
          if (
            !support.radioValue &&
            value === "radio" &&
            jQuery.nodeName(elem, "input")
          ) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    }
  });
  boolHook = {
    set: function(elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else if ((getSetInput && getSetAttribute) || !ruseDefault.test(name)) {
        elem.setAttribute(
          (!getSetAttribute && jQuery.propFix[name]) || name,
          name
        );
      } else {
        elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
      }
      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] =
      (getSetInput && getSetAttribute) || !ruseDefault.test(name)
        ? function(elem, name, isXML) {
            var ret, handle;
            if (!isXML) {
              handle = attrHandle[name];
              attrHandle[name] = ret;
              ret =
                getter(elem, name, isXML) != null ? name.toLowerCase() : null;
              attrHandle[name] = handle;
            }
            return ret;
          }
        : function(elem, name, isXML) {
            if (!isXML) {
              return elem[jQuery.camelCase("default-" + name)]
                ? name.toLowerCase()
                : null;
            }
          };
  });
  if (!getSetInput || !getSetAttribute) {
    jQuery.attrHooks.value = {
      set: function(elem, value, name) {
        if (jQuery.nodeName(elem, "input")) {
          elem.defaultValue = value;
        } else {
          return nodeHook && nodeHook.set(elem, value, name);
        }
      }
    };
  }
  if (!getSetAttribute) {
    nodeHook = {
      set: function(elem, value, name) {
        var ret = elem.getAttributeNode(name);
        if (!ret) {
          elem.setAttributeNode(
            (ret = elem.ownerDocument.createAttribute(name))
          );
        }
        ret.value = value += "";
        if (name === "value" || value === elem.getAttribute(name)) {
          return value;
        }
      }
    };
    attrHandle.id = attrHandle.name = attrHandle.coords = function(
      elem,
      name,
      isXML
    ) {
      var ret;
      if (!isXML) {
        return (ret = elem.getAttributeNode(name)) && ret.value !== ""
          ? ret.value
          : null;
      }
    };
    jQuery.valHooks.button = {
      get: function(elem, name) {
        var ret = elem.getAttributeNode(name);
        if (ret && ret.specified) {
          return ret.value;
        }
      },
      set: nodeHook.set
    };
    jQuery.attrHooks.contenteditable = {
      set: function(elem, value, name) {
        nodeHook.set(elem, value === "" ? false : value, name);
      }
    };
    jQuery.each(["width", "height"], function(i, name) {
      jQuery.attrHooks[name] = {
        set: function(elem, value) {
          if (value === "") {
            elem.setAttribute(name, "auto");
            return value;
          }
        }
      };
    });
  }
  if (!support.style) {
    jQuery.attrHooks.style = {
      get: function(elem) {
        return elem.style.cssText || undefined;
      },
      set: function(elem, value) {
        return (elem.style.cssText = value + "");
      }
    };
  }
  var rfocusable = /^(?:input|select|textarea|button|object)$/i,
    rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function(name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function(name) {
      name = jQuery.propFix[name] || name;
      return this.each(function() {
        try {
          this[name] = undefined;
          delete this[name];
        } catch (e) {}
      });
    }
  });
  jQuery.extend({
    propFix: { for: "htmlFor", class: "className" },
    prop: function(elem, name, value) {
      var ret,
        hooks,
        notxml,
        nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        return hooks &&
          "set" in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined
          ? ret
          : (elem[name] = value);
      } else {
        return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null
          ? ret
          : elem[name];
      }
    },
    propHooks: {
      tabIndex: {
        get: function(elem) {
          var tabindex = jQuery.find.attr(elem, "tabindex");
          return tabindex
            ? parseInt(tabindex, 10)
            : rfocusable.test(elem.nodeName) ||
              (rclickable.test(elem.nodeName) && elem.href)
            ? 0
            : -1;
        }
      }
    }
  });
  if (!support.hrefNormalized) {
    jQuery.each(["href", "src"], function(i, name) {
      jQuery.propHooks[name] = {
        get: function(elem) {
          return elem.getAttribute(name, 4);
        }
      };
    });
  }
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function(elem) {
        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
        return null;
      }
    };
  }
  jQuery.each(
    [
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable"
    ],
    function() {
      jQuery.propFix[this.toLowerCase()] = this;
    }
  );
  if (!support.enctype) {
    jQuery.propFix.enctype = "encoding";
  }
  var rclass = /[\t\r\n\f]/g;
  jQuery.fn.extend({
    addClass: function(value) {
      var classes,
        elem,
        cur,
        clazz,
        j,
        finalValue,
        i = 0,
        len = this.length,
        proceed = typeof value === "string" && value;
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || "").match(rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur =
            elem.nodeType === 1 &&
            (elem.className
              ? (" " + elem.className + " ").replace(rclass, " ")
              : " ");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              if (cur.indexOf(" " + clazz + " ") < 0) {
                cur += clazz + " ";
              }
            }
            finalValue = jQuery.trim(cur);
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    removeClass: function(value) {
      var classes,
        elem,
        cur,
        clazz,
        j,
        finalValue,
        i = 0,
        len = this.length,
        proceed =
          arguments.length === 0 || (typeof value === "string" && value);
      if (jQuery.isFunction(value)) {
        return this.each(function(j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || "").match(rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur =
            elem.nodeType === 1 &&
            (elem.className
              ? (" " + elem.className + " ").replace(rclass, " ")
              : "");
          if (cur) {
            j = 0;
            while ((clazz = classes[j++])) {
              while (cur.indexOf(" " + clazz + " ") >= 0) {
                cur = cur.replace(" " + clazz + " ", " ");
              }
            }
            finalValue = value ? jQuery.trim(cur) : "";
            if (elem.className !== finalValue) {
              elem.className = finalValue;
            }
          }
        }
      }
      return this;
    },
    toggleClass: function(value, stateVal) {
      var type = typeof value;
      if (typeof stateVal === "boolean" && type === "string") {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).toggleClass(
            value.call(this, i, this.className, stateVal),
            stateVal
          );
        });
      }
      return this.each(function() {
        if (type === "string") {
          var className,
            i = 0,
            self = jQuery(this),
            classNames = value.match(rnotwhite) || [];
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }
        } else if (type === strundefined || type === "boolean") {
          if (this.className) {
            jQuery._data(this, "__className__", this.className);
          }
          this.className =
            this.className || value === false
              ? ""
              : jQuery._data(this, "__className__") || "";
        }
      });
    },
    hasClass: function(selector) {
      var className = " " + selector + " ",
        i = 0,
        l = this.length;
      for (; i < l; i++) {
        if (
          this[i].nodeType === 1 &&
          (" " + this[i].className + " ")
            .replace(rclass, " ")
            .indexOf(className) >= 0
        ) {
          return true;
        }
      }
      return false;
    }
  });
  jQuery.each(
    (
      "blur focus focusin focusout load resize scroll unload click dblclick " +
      "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
      "change select submit keydown keypress keyup error contextmenu"
    ).split(" "),
    function(i, name) {
      jQuery.fn[name] = function(data, fn) {
        return arguments.length > 0
          ? this.on(name, null, data, fn)
          : this.trigger(name);
      };
    }
  );
  jQuery.fn.extend({
    hover: function(fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind: function(types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function(types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function(selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function(selector, types, fn) {
      return arguments.length === 1
        ? this.off(selector, "**")
        : this.off(types, selector || "**", fn);
    }
  });
  var nonce = jQuery.now();
  var rquery = /\?/;
  var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  jQuery.parseJSON = function(data) {
    if (window.JSON && window.JSON.parse) {
      return window.JSON.parse(data + "");
    }
    var requireNonComma,
      depth = null,
      str = jQuery.trim(data + "");
    return str &&
      !jQuery.trim(
        str.replace(rvalidtokens, function(token, comma, open, close) {
          if (requireNonComma && comma) {
            depth = 0;
          }
          if (depth === 0) {
            return token;
          }
          requireNonComma = open || comma;
          depth += !close - !open;
          return "";
        })
      )
      ? Function("return " + str)()
      : jQuery.error("Invalid JSON: " + data);
  };
  jQuery.parseXML = function(data) {
    var xml, tmp;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      if (window.DOMParser) {
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, "text/xml");
      } else {
        xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = "false";
        xml.loadXML(data);
      }
    } catch (e) {
      xml = undefined;
    }
    if (
      !xml ||
      !xml.documentElement ||
      xml.getElementsByTagName("parsererror").length
    ) {
      jQuery.error("Invalid XML: " + data);
    }
    return xml;
  };
  var ajaxLocParts,
    ajaxLocation,
    rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    prefilters = {},
    transports = {},
    allTypes = "*/".concat("*");
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement("a");
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  function addToPrefiltersOrTransports(structure) {
    return function(dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType.charAt(0) === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(
    structure,
    options,
    originalOptions,
    jqXHR
  ) {
    var inspected = {},
      seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(
          options,
          originalOptions,
          jqXHR
        );
        if (
          typeof dataTypeOrTransport === "string" &&
          !seekingTransport &&
          !inspected[dataTypeOrTransport]
        ) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || (!inspected["*"] && inspect("*"));
  }
  function ajaxExtend(target, src) {
    var deep,
      key,
      flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  function ajaxHandleResponses(s, jqXHR, responses) {
    var firstDataType,
      ct,
      finalDataType,
      type,
      contents = s.contents,
      dataTypes = s.dataTypes;
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
      current,
      conv,
      tmp,
      prev,
      converters = {},
      dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === "*") {
          current = prev;
        } else if (prev !== "*" && prev !== current) {
          conv = converters[prev + " " + current] || converters["* " + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                conv =
                  converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s["throws"]) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv
                    ? e
                    : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return { state: "success", data: response };
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: "GET",
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: { xml: /xml/, html: /html/, json: /json/ },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": jQuery.parseJSON,
        "text xml": jQuery.parseXML
      },
      flatOptions: { url: true, context: true }
    },
    ajaxSetup: function(target, settings) {
      return settings
        ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
        : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function(url, options) {
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }
      options = options || {};
      var parts,
        i,
        cacheURL,
        responseHeadersString,
        timeoutTimer,
        fireGlobals,
        transport,
        responseHeaders,
        s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext =
          s.context && (callbackContext.nodeType || callbackContext.jquery)
            ? jQuery(callbackContext)
            : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        statusCode = s.statusCode || {},
        requestHeaders = {},
        requestHeadersNames = {},
        state = 0,
        strAbort = "canceled",
        jqXHR = {
          readyState: 0,
          getResponseHeader: function(key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while ((match = rheaders.exec(responseHeadersString))) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match == null ? null : match;
          },
          getAllResponseHeaders: function() {
            return state === 2 ? responseHeadersString : null;
          },
          setRequestHeader: function(name, value) {
            var lname = name.toLowerCase();
            if (!state) {
              name = requestHeadersNames[lname] =
                requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          overrideMimeType: function(type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          statusCode: function(map) {
            var code;
            if (map) {
              if (state < 2) {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              } else {
                jqXHR.always(map[jqXHR.status]);
              }
            }
            return this;
          },
          abort: function(statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || ajaxLocation) + "")
        .replace(rhash, "")
        .replace(rprotocol, ajaxLocParts[1] + "//");
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery
        .trim(s.dataType || "*")
        .toLowerCase()
        .match(rnotwhite) || [""];
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(
          parts &&
          (parts[1] !== ajaxLocParts[1] ||
            parts[2] !== ajaxLocParts[2] ||
            (parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
              (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
        );
      }
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL)
            ? cacheURL.replace(rts, "$1_=" + nonce++)
            : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader(
            "If-Modified-Since",
            jQuery.lastModified[cacheURL]
          );
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (
        (s.data && s.hasContent && s.contentType !== false) ||
        options.contentType
      ) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader(
        "Accept",
        s.dataTypes[0] && s.accepts[s.dataTypes[0]]
          ? s.accepts[s.dataTypes[0]] +
              (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "")
          : s.accepts["*"]
      );
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (
        s.beforeSend &&
        (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)
      ) {
        return jqXHR.abort();
      }
      strAbort = "abort";
      for (i in { success: 1, error: 1, complete: 1 }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
          success,
          error,
          response,
          modified,
          statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || "";
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = (status >= 200 && status < 300) || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";
          } else if (status === 304) {
            statusText = "notmodified";
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [
            jqXHR,
            s,
            isSuccess ? success : error
          ]);
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
          if (!--jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function(url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function(url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
  jQuery.each(
    [
      "ajaxStart",
      "ajaxStop",
      "ajaxComplete",
      "ajaxError",
      "ajaxSuccess",
      "ajaxSend"
    ],
    function(i, type) {
      jQuery.fn[type] = function(fn) {
        return this.on(type, fn);
      };
    }
  );
  jQuery._evalUrl = function(url) {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      throws: true
    });
  };
  jQuery.fn.extend({
    wrapAll: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        var wrap = jQuery(html, this[0].ownerDocument)
          .eq(0)
          .clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap
          .map(function() {
            var elem = this;
            while (elem.firstChild && elem.firstChild.nodeType === 1) {
              elem = elem.firstChild;
            }
            return elem;
          })
          .append(this);
      }
      return this;
    },
    wrapInner: function(html) {
      if (jQuery.isFunction(html)) {
        return this.each(function(i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function() {
        var self = jQuery(this),
          contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function() {
      return this.parent()
        .each(function() {
          if (!jQuery.nodeName(this, "body")) {
            jQuery(this).replaceWith(this.childNodes);
          }
        })
        .end();
    }
  });
  jQuery.expr.filters.hidden = function(elem) {
    return (
      (elem.offsetWidth <= 0 && elem.offsetHeight <= 0) ||
      (!support.reliableHiddenOffsets() &&
        ((elem.style && elem.style.display) || jQuery.css(elem, "display")) ===
          "none")
    );
  };
  jQuery.expr.filters.visible = function(elem) {
    return !jQuery.expr.filters.hidden(elem);
  };
  var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function(i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(
            prefix + "[" + (typeof v === "object" ? i : "") + "]",
            v,
            traditional,
            add
          );
        }
      });
    } else if (!traditional && jQuery.type(obj) === "object") {
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.param = function(a, traditional) {
    var prefix,
      s = [],
      add = function(key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function() {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join("&").replace(r20, "+");
  };
  jQuery.fn.extend({
    serialize: function() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      })
        .filter(function() {
          var type = this.type;
          return (
            this.name &&
            !jQuery(this).is(":disabled") &&
            rsubmittable.test(this.nodeName) &&
            !rsubmitterTypes.test(type) &&
            (this.checked || !rcheckableType.test(type))
          );
        })
        .map(function(i, elem) {
          var val = jQuery(this).val();
          return val == null
            ? null
            : jQuery.isArray(val)
            ? jQuery.map(val, function(val) {
                return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
              })
            : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
        })
        .get();
    }
  });
  jQuery.ajaxSettings.xhr =
    window.ActiveXObject !== undefined
      ? function() {
          return (
            (!this.isLocal &&
              /^(get|post|head|put|delete|options)$/i.test(this.type) &&
              createStandardXHR()) ||
            createActiveXHR()
          );
        }
      : createStandardXHR;
  var xhrId = 0,
    xhrCallbacks = {},
    xhrSupported = jQuery.ajaxSettings.xhr();
  if (window.ActiveXObject) {
    jQuery(window).on("unload", function() {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key](undefined, true);
      }
    });
  }
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  xhrSupported = support.ajax = !!xhrSupported;
  if (xhrSupported) {
    jQuery.ajaxTransport(function(options) {
      if (!options.crossDomain || support.cors) {
        var callback;
        return {
          send: function(headers, complete) {
            var i,
              xhr = options.xhr(),
              id = ++xhrId;
            xhr.open(
              options.type,
              options.url,
              options.async,
              options.username,
              options.password
            );
            if (options.xhrFields) {
              for (i in options.xhrFields) {
                xhr[i] = options.xhrFields[i];
              }
            }
            if (options.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(options.mimeType);
            }
            if (!options.crossDomain && !headers["X-Requested-With"]) {
              headers["X-Requested-With"] = "XMLHttpRequest";
            }
            for (i in headers) {
              if (headers[i] !== undefined) {
                xhr.setRequestHeader(i, headers[i] + "");
              }
            }
            xhr.send((options.hasContent && options.data) || null);
            callback = function(_, isAbort) {
              var status, statusText, responses;
              if (callback && (isAbort || xhr.readyState === 4)) {
                delete xhrCallbacks[id];
                callback = undefined;
                xhr.onreadystatechange = jQuery.noop;
                if (isAbort) {
                  if (xhr.readyState !== 4) {
                    xhr.abort();
                  }
                } else {
                  responses = {};
                  status = xhr.status;
                  if (typeof xhr.responseText === "string") {
                    responses.text = xhr.responseText;
                  }
                  try {
                    statusText = xhr.statusText;
                  } catch (e) {
                    statusText = "";
                  }
                  if (!status && options.isLocal && !options.crossDomain) {
                    status = responses.text ? 200 : 404;
                  } else if (status === 1223) {
                    status = 204;
                  }
                }
              }
              if (responses) {
                complete(
                  status,
                  statusText,
                  responses,
                  xhr.getAllResponseHeaders()
                );
              }
            };
            if (!options.async) {
              callback();
            } else if (xhr.readyState === 4) {
              setTimeout(callback);
            } else {
              xhr.onreadystatechange = xhrCallbacks[id] = callback;
            }
          },
          abort: function() {
            if (callback) {
              callback(undefined, true);
            }
          }
        };
      }
    });
  }
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  }
  function createActiveXHR() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }
  jQuery.ajaxSetup({
    accepts: {
      script:
        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      "text script": function(text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });
  jQuery.ajaxPrefilter("script", function(s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
      s.global = false;
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script,
        head = document.head || jQuery("head")[0] || document.documentElement;
      return {
        send: function(_, callback) {
          script = document.createElement("script");
          script.async = true;
          if (s.scriptCharset) {
            script.charset = s.scriptCharset;
          }
          script.src = s.url;
          script.onload = script.onreadystatechange = function(_, isAbort) {
            if (
              isAbort ||
              !script.readyState ||
              /loaded|complete/.test(script.readyState)
            ) {
              script.onload = script.onreadystatechange = null;
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }
              script = null;
              if (!isAbort) {
                callback(200, "success");
              }
            }
          };
          head.insertBefore(script, head.firstChild);
        },
        abort: function() {
          if (script) {
            script.onload(undefined, true);
          }
        }
      };
    }
  });
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
    var callbackName,
      overwritten,
      responseContainer,
      jsonProp =
        s.jsonp !== false &&
        (rjsonp.test(s.url)
          ? "url"
          : typeof s.data === "string" &&
            !(s.contentType || "").indexOf(
              "application/x-www-form-urlencoded"
            ) &&
            rjsonp.test(s.data) &&
            "data");
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback)
        ? s.jsonpCallback()
        : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url +=
          (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }
      s.converters["script json"] = function() {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = "json";
      overwritten = window[callbackName];
      window[callbackName] = function() {
        responseContainer = arguments;
      };
      jqXHR.always(function() {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return "script";
    }
  });
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (!data || typeof data !== "string") {
      return null;
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    context = context || document;
    var parsed = rsingleTag.exec(data),
      scripts = !keepScripts && [];
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = jQuery.buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };
  var _load = jQuery.fn.load;
  jQuery.fn.load = function(url, params, callback) {
    if (typeof url !== "string" && _load) {
      return _load.apply(this, arguments);
    }
    var selector,
      response,
      type,
      self = this,
      off = url.indexOf(" ");
    if (off >= 0) {
      selector = jQuery.trim(url.slice(off, url.length));
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === "object") {
      type = "POST";
    }
    if (self.length > 0) {
      jQuery
        .ajax({ url: url, type: type, dataType: "html", data: params })
        .done(function(responseText) {
          response = arguments;
          self.html(
            selector
              ? jQuery("<div>")
                  .append(jQuery.parseHTML(responseText))
                  .find(selector)
              : responseText
          );
        })
        .complete(
          callback &&
            function(jqXHR, status) {
              self.each(
                callback,
                response || [jqXHR.responseText, status, jqXHR]
              );
            }
        );
    }
    return this;
  };
  jQuery.expr.filters.animated = function(elem) {
    return jQuery.grep(jQuery.timers, function(fn) {
      return elem === fn.elem;
    }).length;
  };
  var docElem = window.document.documentElement;
  function getWindow(elem) {
    return jQuery.isWindow(elem)
      ? elem
      : elem.nodeType === 9
      ? elem.defaultView || elem.parentWindow
      : false;
  }
  jQuery.offset = {
    setOffset: function(elem, options, i) {
      var curPosition,
        curLeft,
        curCSSTop,
        curTop,
        curOffset,
        curCSSLeft,
        calculatePosition,
        position = jQuery.css(elem, "position"),
        curElem = jQuery(elem),
        props = {};
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition =
        (position === "absolute" || position === "fixed") &&
        jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    offset: function(options) {
      if (arguments.length) {
        return options === undefined
          ? this
          : this.each(function(i) {
              jQuery.offset.setOffset(this, options, i);
            });
      }
      var docElem,
        win,
        box = { top: 0, left: 0 },
        elem = this[0],
        doc = elem && elem.ownerDocument;
      if (!doc) {
        return;
      }
      docElem = doc.documentElement;
      if (!jQuery.contains(docElem, elem)) {
        return box;
      }
      if (typeof elem.getBoundingClientRect !== strundefined) {
        box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
        top:
          box.top +
          (win.pageYOffset || docElem.scrollTop) -
          (docElem.clientTop || 0),
        left:
          box.left +
          (win.pageXOffset || docElem.scrollLeft) -
          (docElem.clientLeft || 0)
      };
    },
    position: function() {
      if (!this[0]) {
        return;
      }
      var offsetParent,
        offset,
        parentOffset = { top: 0, left: 0 },
        elem = this[0];
      if (jQuery.css(elem, "position") === "fixed") {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], "html")) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
        parentOffset.left += jQuery.css(
          offsetParent[0],
          "borderLeftWidth",
          true
        );
      }
      return {
        top:
          offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left:
          offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    offsetParent: function() {
      return this.map(function() {
        var offsetParent = this.offsetParent || docElem;
        while (
          offsetParent &&
          !jQuery.nodeName(offsetParent, "html") &&
            jQuery.css(offsetParent, "position") === "static"
        ) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(
    method,
    prop
  ) {
    var top = /Y/.test(prop);
    jQuery.fn[method] = function(val) {
      return access(
        this,
        function(elem, method, val) {
          var win = getWindow(elem);
          if (val === undefined) {
            return win
              ? prop in win
                ? win[prop]
                : win.document.documentElement[method]
              : elem[method];
          }
          if (win) {
            win.scrollTo(
              !top ? val : jQuery(win).scrollLeft(),
              top ? val : jQuery(win).scrollTop()
            );
          } else {
            elem[method] = val;
          }
        },
        method,
        val,
        arguments.length,
        null
      );
    };
  });
  jQuery.each(["top", "left"], function(i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(
      elem,
      computed
    ) {
      if (computed) {
        computed = curCSS(elem, prop);
        return rnumnonpx.test(computed)
          ? jQuery(elem).position()[prop] + "px"
          : computed;
      }
    });
  });
  jQuery.each({ Height: "height", Width: "width" }, function(name, type) {
    jQuery.each(
      { padding: "inner" + name, content: type, "": "outer" + name },
      function(defaultExtra, funcName) {
        jQuery.fn[funcName] = function(margin, value) {
          var chainable =
              arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra =
              defaultExtra ||
              (margin === true || value === true ? "margin" : "border");
          return access(
            this,
            function(elem, type, value) {
              var doc;
              if (jQuery.isWindow(elem)) {
                return elem.document.documentElement["client" + name];
              }
              if (elem.nodeType === 9) {
                doc = elem.documentElement;
                return Math.max(
                  elem.body["scroll" + name],
                  doc["scroll" + name],
                  elem.body["offset" + name],
                  doc["offset" + name],
                  doc["client" + name]
                );
              }
              return value === undefined
                ? jQuery.css(elem, type, extra)
                : jQuery.style(elem, type, value, extra);
            },
            type,
            chainable ? margin : undefined,
            chainable,
            null
          );
        };
      }
    );
  });
  jQuery.fn.size = function() {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof define === "function" && define.amd) {
    define("jquery", [], function() {
      return jQuery;
    });
  }
  var _jQuery = window.jQuery,
    _$ = window.$;
  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };
  if (typeof noGlobal === strundefined) {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
});

/* /web/static/lib/jquery.ui/jquery-ui.js defined in bundle 'im_livechat.external_lib' */
(function(factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
})(function($) {
  $.ui = $.ui || {};
  $.extend($.ui, {
    version: "1.11.4",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  });
  $.fn.extend({
    scrollParent: function(includeHidden) {
      var position = this.css("position"),
        excludeStaticParent = position === "absolute",
        overflowRegex = includeHidden
          ? /(auto|scroll|hidden)/
          : /(auto|scroll)/,
        scrollParent = this.parents()
          .filter(function() {
            var parent = $(this);
            if (excludeStaticParent && parent.css("position") === "static") {
              return false;
            }
            return overflowRegex.test(
              parent.css("overflow") +
                parent.css("overflow-y") +
                parent.css("overflow-x")
            );
          })
          .eq(0);
      return position === "fixed" || !scrollParent.length
        ? $(this[0].ownerDocument || document)
        : scrollParent;
    },
    uniqueId: (function() {
      var uuid = 0;
      return function() {
        return this.each(function() {
          if (!this.id) {
            this.id = "ui-id-" + ++uuid;
          }
        });
      };
    })(),
    removeUniqueId: function() {
      return this.each(function() {
        if (/^ui-id-\d+$/.test(this.id)) {
          $(this).removeAttr("id");
        }
      });
    }
  });
  function focusable(element, isTabIndexNotNaN) {
    var map,
      mapName,
      img,
      nodeName = element.nodeName.toLowerCase();
    if ("area" === nodeName) {
      map = element.parentNode;
      mapName = map.name;
      if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
        return false;
      }
      img = $("img[usemap='#" + mapName + "']")[0];
      return !!img && visible(img);
    }
    return (
      (/^(input|select|textarea|button|object)$/.test(nodeName)
        ? !element.disabled
        : "a" === nodeName
        ? element.href || isTabIndexNotNaN
        : isTabIndexNotNaN) && visible(element)
    );
  }
  function visible(element) {
    return (
      $.expr.filters.visible(element) &&
      !$(element)
        .parents()
        .addBack()
        .filter(function() {
          return $.css(this, "visibility") === "hidden";
        }).length
    );
  }
  $.extend($.expr[":"], {
    data: $.expr.createPseudo
      ? $.expr.createPseudo(function(dataName) {
          return function(elem) {
            return !!$.data(elem, dataName);
          };
        })
      : function(elem, i, match) {
          return !!$.data(elem, match[3]);
        },
    focusable: function(element) {
      return focusable(element, !isNaN($.attr(element, "tabindex")));
    },
    tabbable: function(element) {
      var tabIndex = $.attr(element, "tabindex"),
        isTabIndexNaN = isNaN(tabIndex);
      return (
        (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
      );
    }
  });
  if (!$("<a>").outerWidth(1).jquery) {
    $.each(["Width", "Height"], function(i, name) {
      var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
        type = name.toLowerCase(),
        orig = {
          innerWidth: $.fn.innerWidth,
          innerHeight: $.fn.innerHeight,
          outerWidth: $.fn.outerWidth,
          outerHeight: $.fn.outerHeight
        };
      function reduce(elem, size, border, margin) {
        $.each(side, function() {
          size -= parseFloat($.css(elem, "padding" + this)) || 0;
          if (border) {
            size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
          }
          if (margin) {
            size -= parseFloat($.css(elem, "margin" + this)) || 0;
          }
        });
        return size;
      }
      $.fn["inner" + name] = function(size) {
        if (size === undefined) {
          return orig["inner" + name].call(this);
        }
        return this.each(function() {
          $(this).css(type, reduce(this, size) + "px");
        });
      };
      $.fn["outer" + name] = function(size, margin) {
        if (typeof size !== "number") {
          return orig["outer" + name].call(this, size);
        }
        return this.each(function() {
          $(this).css(type, reduce(this, size, true, margin) + "px");
        });
      };
    });
  }
  if (!$.fn.addBack) {
    $.fn.addBack = function(selector) {
      return this.add(
        selector == null ? this.prevObject : this.prevObject.filter(selector)
      );
    };
  }
  if (
    $("<a>")
      .data("a-b", "a")
      .removeData("a-b")
      .data("a-b")
  ) {
    $.fn.removeData = (function(removeData) {
      return function(key) {
        if (arguments.length) {
          return removeData.call(this, $.camelCase(key));
        } else {
          return removeData.call(this);
        }
      };
    })($.fn.removeData);
  }
  $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
  $.fn.extend({
    focus: (function(orig) {
      return function(delay, fn) {
        return typeof delay === "number"
          ? this.each(function() {
              var elem = this;
              setTimeout(function() {
                $(elem).focus();
                if (fn) {
                  fn.call(elem);
                }
              }, delay);
            })
          : orig.apply(this, arguments);
      };
    })($.fn.focus),
    disableSelection: (function() {
      var eventType =
        "onselectstart" in document.createElement("div")
          ? "selectstart"
          : "mousedown";
      return function() {
        return this.bind(eventType + ".ui-disableSelection", function(event) {
          event.preventDefault();
        });
      };
    })(),
    enableSelection: function() {
      return this.unbind(".ui-disableSelection");
    },
    zIndex: function(zIndex) {
      if (zIndex !== undefined) {
        return this.css("zIndex", zIndex);
      }
      if (this.length) {
        var elem = $(this[0]),
          position,
          value;
        while (elem.length && elem[0] !== document) {
          position = elem.css("position");
          if (
            position === "absolute" ||
            position === "relative" ||
            position === "fixed"
          ) {
            value = parseInt(elem.css("zIndex"), 10);
            if (!isNaN(value) && value !== 0) {
              return value;
            }
          }
          elem = elem.parent();
        }
      }
      return 0;
    }
  });
  $.ui.plugin = {
    add: function(module, option, set) {
      var i,
        proto = $.ui[module].prototype;
      for (i in set) {
        proto.plugins[i] = proto.plugins[i] || [];
        proto.plugins[i].push([option, set[i]]);
      }
    },
    call: function(instance, name, args, allowDisconnected) {
      var i,
        set = instance.plugins[name];
      if (!set) {
        return;
      }
      if (
        !allowDisconnected &&
        (!instance.element[0].parentNode ||
          instance.element[0].parentNode.nodeType === 11)
      ) {
        return;
      }
      for (i = 0; i < set.length; i++) {
        if (instance.options[set[i][0]]) {
          set[i][1].apply(instance.element, args);
        }
      }
    }
  };
  var widget_uuid = 0,
    widget_slice = Array.prototype.slice;
  $.cleanData = (function(orig) {
    return function(elems) {
      var events, elem, i;
      for (i = 0; (elem = elems[i]) != null; i++) {
        try {
          events = $._data(elem, "events");
          if (events && events.remove) {
            $(elem).triggerHandler("remove");
          }
        } catch (e) {}
      }
      orig(elems);
    };
  })($.cleanData);
  $.widget = function(name, base, prototype) {
    var fullName,
      existingConstructor,
      constructor,
      basePrototype,
      proxiedPrototype = {},
      namespace = name.split(".")[0];
    name = name.split(".")[1];
    fullName = namespace + "-" + name;
    if (!prototype) {
      prototype = base;
      base = $.Widget;
    }
    $.expr[":"][fullName.toLowerCase()] = function(elem) {
      return !!$.data(elem, fullName);
    };
    $[namespace] = $[namespace] || {};
    existingConstructor = $[namespace][name];
    constructor = $[namespace][name] = function(options, element) {
      if (!this._createWidget) {
        return new constructor(options, element);
      }
      if (arguments.length) {
        this._createWidget(options, element);
      }
    };
    $.extend(constructor, existingConstructor, {
      version: prototype.version,
      _proto: $.extend({}, prototype),
      _childConstructors: []
    });
    basePrototype = new base();
    basePrototype.options = $.widget.extend({}, basePrototype.options);
    $.each(prototype, function(prop, value) {
      if (!$.isFunction(value)) {
        proxiedPrototype[prop] = value;
        return;
      }
      proxiedPrototype[prop] = (function() {
        var _super = function() {
            return base.prototype[prop].apply(this, arguments);
          },
          _superApply = function(args) {
            return base.prototype[prop].apply(this, args);
          };
        return function() {
          var __super = this._super,
            __superApply = this._superApply,
            returnValue;
          this._super = _super;
          this._superApply = _superApply;
          returnValue = value.apply(this, arguments);
          this._super = __super;
          this._superApply = __superApply;
          return returnValue;
        };
      })();
    });
    constructor.prototype = $.widget.extend(
      basePrototype,
      {
        widgetEventPrefix: existingConstructor
          ? basePrototype.widgetEventPrefix || name
          : name
      },
      proxiedPrototype,
      {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
      }
    );
    if (existingConstructor) {
      $.each(existingConstructor._childConstructors, function(i, child) {
        var childPrototype = child.prototype;
        $.widget(
          childPrototype.namespace + "." + childPrototype.widgetName,
          constructor,
          child._proto
        );
      });
      delete existingConstructor._childConstructors;
    } else {
      base._childConstructors.push(constructor);
    }
    $.widget.bridge(name, constructor);
    return constructor;
  };
  $.widget.extend = function(target) {
    var input = widget_slice.call(arguments, 1),
      inputIndex = 0,
      inputLength = input.length,
      key,
      value;
    for (; inputIndex < inputLength; inputIndex++) {
      for (key in input[inputIndex]) {
        value = input[inputIndex][key];
        if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
          if ($.isPlainObject(value)) {
            target[key] = $.isPlainObject(target[key])
              ? $.widget.extend({}, target[key], value)
              : $.widget.extend({}, value);
          } else {
            target[key] = value;
          }
        }
      }
    }
    return target;
  };
  $.widget.bridge = function(name, object) {
    var fullName = object.prototype.widgetFullName || name;
    $.fn[name] = function(options) {
      var isMethodCall = typeof options === "string",
        args = widget_slice.call(arguments, 1),
        returnValue = this;
      if (isMethodCall) {
        this.each(function() {
          var methodValue,
            instance = $.data(this, fullName);
          if (options === "instance") {
            returnValue = instance;
            return false;
          }
          if (!instance) {
            return $.error(
              "cannot call methods on " +
                name +
                " prior to initialization; " +
                "attempted to call method '" +
                options +
                "'"
            );
          }
          if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
            return $.error(
              "no such method '" +
                options +
                "' for " +
                name +
                " widget instance"
            );
          }
          methodValue = instance[options].apply(instance, args);
          if (methodValue !== instance && methodValue !== undefined) {
            returnValue =
              methodValue && methodValue.jquery
                ? returnValue.pushStack(methodValue.get())
                : methodValue;
            return false;
          }
        });
      } else {
        if (args.length) {
          options = $.widget.extend.apply(null, [options].concat(args));
        }
        this.each(function() {
          var instance = $.data(this, fullName);
          if (instance) {
            instance.option(options || {});
            if (instance._init) {
              instance._init();
            }
          } else {
            $.data(this, fullName, new object(options, this));
          }
        });
      }
      return returnValue;
    };
  };
  $.Widget = function() {};
  $.Widget._childConstructors = [];
  $.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: { disabled: false, create: null },
    _createWidget: function(options, element) {
      element = $(element || this.defaultElement || this)[0];
      this.element = $(element);
      this.uuid = widget_uuid++;
      this.eventNamespace = "." + this.widgetName + this.uuid;
      this.bindings = $();
      this.hoverable = $();
      this.focusable = $();
      if (element !== this) {
        $.data(element, this.widgetFullName, this);
        this._on(true, this.element, {
          remove: function(event) {
            if (event.target === element) {
              this.destroy();
            }
          }
        });
        this.document = $(
          element.style ? element.ownerDocument : element.document || element
        );
        this.window = $(
          this.document[0].defaultView || this.document[0].parentWindow
        );
      }
      this.options = $.widget.extend(
        {},
        this.options,
        this._getCreateOptions(),
        options
      );
      this._create();
      this._trigger("create", null, this._getCreateEventData());
      this._init();
    },
    _getCreateOptions: $.noop,
    _getCreateEventData: $.noop,
    _create: $.noop,
    _init: $.noop,
    destroy: function() {
      this._destroy();
      this.element
        .unbind(this.eventNamespace)
        .removeData(this.widgetFullName)
        .removeData($.camelCase(this.widgetFullName));
      this.widget()
        .unbind(this.eventNamespace)
        .removeAttr("aria-disabled")
        .removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
      this.bindings.unbind(this.eventNamespace);
      this.hoverable.removeClass("ui-state-hover");
      this.focusable.removeClass("ui-state-focus");
    },
    _destroy: $.noop,
    widget: function() {
      return this.element;
    },
    option: function(key, value) {
      var options = key,
        parts,
        curOption,
        i;
      if (arguments.length === 0) {
        return $.widget.extend({}, this.options);
      }
      if (typeof key === "string") {
        options = {};
        parts = key.split(".");
        key = parts.shift();
        if (parts.length) {
          curOption = options[key] = $.widget.extend({}, this.options[key]);
          for (i = 0; i < parts.length - 1; i++) {
            curOption[parts[i]] = curOption[parts[i]] || {};
            curOption = curOption[parts[i]];
          }
          key = parts.pop();
          if (arguments.length === 1) {
            return curOption[key] === undefined ? null : curOption[key];
          }
          curOption[key] = value;
        } else {
          if (arguments.length === 1) {
            return this.options[key] === undefined ? null : this.options[key];
          }
          options[key] = value;
        }
      }
      this._setOptions(options);
      return this;
    },
    _setOptions: function(options) {
      var key;
      for (key in options) {
        this._setOption(key, options[key]);
      }
      return this;
    },
    _setOption: function(key, value) {
      this.options[key] = value;
      if (key === "disabled") {
        this.widget().toggleClass(this.widgetFullName + "-disabled", !!value);
        if (value) {
          this.hoverable.removeClass("ui-state-hover");
          this.focusable.removeClass("ui-state-focus");
        }
      }
      return this;
    },
    enable: function() {
      return this._setOptions({ disabled: false });
    },
    disable: function() {
      return this._setOptions({ disabled: true });
    },
    _on: function(suppressDisabledCheck, element, handlers) {
      var delegateElement,
        instance = this;
      if (typeof suppressDisabledCheck !== "boolean") {
        handlers = element;
        element = suppressDisabledCheck;
        suppressDisabledCheck = false;
      }
      if (!handlers) {
        handlers = element;
        element = this.element;
        delegateElement = this.widget();
      } else {
        element = delegateElement = $(element);
        this.bindings = this.bindings.add(element);
      }
      $.each(handlers, function(event, handler) {
        function handlerProxy() {
          if (
            !suppressDisabledCheck &&
            (instance.options.disabled === true ||
              $(this).hasClass("ui-state-disabled"))
          ) {
            return;
          }
          return (typeof handler === "string"
            ? instance[handler]
            : handler
          ).apply(instance, arguments);
        }
        if (typeof handler !== "string") {
          handlerProxy.guid = handler.guid =
            handler.guid || handlerProxy.guid || $.guid++;
        }
        var match = event.match(/^([\w:-]*)\s*(.*)$/),
          eventName = match[1] + instance.eventNamespace,
          selector = match[2];
        if (selector) {
          delegateElement.delegate(selector, eventName, handlerProxy);
        } else {
          element.bind(eventName, handlerProxy);
        }
      });
    },
    _off: function(element, eventName) {
      eventName =
        (eventName || "").split(" ").join(this.eventNamespace + " ") +
        this.eventNamespace;
      element.unbind(eventName).undelegate(eventName);
      this.bindings = $(this.bindings.not(element).get());
      this.focusable = $(this.focusable.not(element).get());
      this.hoverable = $(this.hoverable.not(element).get());
    },
    _delay: function(handler, delay) {
      function handlerProxy() {
        return (typeof handler === "string"
          ? instance[handler]
          : handler
        ).apply(instance, arguments);
      }
      var instance = this;
      return setTimeout(handlerProxy, delay || 0);
    },
    _hoverable: function(element) {
      this.hoverable = this.hoverable.add(element);
      this._on(element, {
        mouseenter: function(event) {
          $(event.currentTarget).addClass("ui-state-hover");
        },
        mouseleave: function(event) {
          $(event.currentTarget).removeClass("ui-state-hover");
        }
      });
    },
    _focusable: function(element) {
      this.focusable = this.focusable.add(element);
      this._on(element, {
        focusin: function(event) {
          $(event.currentTarget).addClass("ui-state-focus");
        },
        focusout: function(event) {
          $(event.currentTarget).removeClass("ui-state-focus");
        }
      });
    },
    _trigger: function(type, event, data) {
      var prop,
        orig,
        callback = this.options[type];
      data = data || {};
      event = $.Event(event);
      event.type = (type === this.widgetEventPrefix
        ? type
        : this.widgetEventPrefix + type
      ).toLowerCase();
      event.target = this.element[0];
      orig = event.originalEvent;
      if (orig) {
        for (prop in orig) {
          if (!(prop in event)) {
            event[prop] = orig[prop];
          }
        }
      }
      this.element.trigger(event, data);
      return !(
        ($.isFunction(callback) &&
          callback.apply(this.element[0], [event].concat(data)) === false) ||
        event.isDefaultPrevented()
      );
    }
  };
  $.each({ show: "fadeIn", hide: "fadeOut" }, function(method, defaultEffect) {
    $.Widget.prototype["_" + method] = function(element, options, callback) {
      if (typeof options === "string") {
        options = { effect: options };
      }
      var hasOptions,
        effectName = !options
          ? method
          : options === true || typeof options === "number"
          ? defaultEffect
          : options.effect || defaultEffect;
      options = options || {};
      if (typeof options === "number") {
        options = { duration: options };
      }
      hasOptions = !$.isEmptyObject(options);
      options.complete = callback;
      if (options.delay) {
        element.delay(options.delay);
      }
      if (hasOptions && $.effects && $.effects.effect[effectName]) {
        element[method](options);
      } else if (effectName !== method && element[effectName]) {
        element[effectName](options.duration, options.easing, callback);
      } else {
        element.queue(function(next) {
          $(this)[method]();
          if (callback) {
            callback.call(element[0]);
          }
          next();
        });
      }
    };
  });
  var widget = $.widget;
  var mouseHandled = false;
  $(document).mouseup(function() {
    mouseHandled = false;
  });
  var mouse = $.widget("ui.mouse", {
    version: "1.11.4",
    options: {
      cancel: "input,textarea,button,select,option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function() {
      var that = this;
      this.element
        .bind("mousedown." + this.widgetName, function(event) {
          return that._mouseDown(event);
        })
        .bind("click." + this.widgetName, function(event) {
          if (
            true ===
            $.data(event.target, that.widgetName + ".preventClickEvent")
          ) {
            $.removeData(event.target, that.widgetName + ".preventClickEvent");
            event.stopImmediatePropagation();
            return false;
          }
        });
      this.started = false;
    },
    _mouseDestroy: function() {
      this.element.unbind("." + this.widgetName);
      if (this._mouseMoveDelegate) {
        this.document
          .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
          .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      }
    },
    _mouseDown: function(event) {
      if (mouseHandled) {
        return;
      }
      this._mouseMoved = false;
      this._mouseStarted && this._mouseUp(event);
      this._mouseDownEvent = event;
      var that = this,
        btnIsLeft = event.which === 1,
        elIsCancel =
          typeof this.options.cancel === "string" && event.target.nodeName
            ? $(event.target).closest(this.options.cancel).length
            : false;
      if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
        return true;
      }
      this.mouseDelayMet = !this.options.delay;
      if (!this.mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function() {
          that.mouseDelayMet = true;
        }, this.options.delay);
      }
      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted = this._mouseStart(event) !== false;
        if (!this._mouseStarted) {
          event.preventDefault();
          return true;
        }
      }
      if (
        true === $.data(event.target, this.widgetName + ".preventClickEvent")
      ) {
        $.removeData(event.target, this.widgetName + ".preventClickEvent");
      }
      this._mouseMoveDelegate = function(event) {
        return that._mouseMove(event);
      };
      this._mouseUpDelegate = function(event) {
        return that._mouseUp(event);
      };
      this.document
        .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .bind("mouseup." + this.widgetName, this._mouseUpDelegate);
      event.preventDefault();
      mouseHandled = true;
      return true;
    },
    _mouseMove: function(event) {
      if (this._mouseMoved) {
        if (
          $.ui.ie &&
          (!document.documentMode || document.documentMode < 9) &&
          !event.button
        ) {
          return this._mouseUp(event);
        } else if (!event.which) {
          return this._mouseUp(event);
        }
      }
      if (event.which || event.button) {
        this._mouseMoved = true;
      }
      if (this._mouseStarted) {
        this._mouseDrag(event);
        return event.preventDefault();
      }
      if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
        this._mouseStarted =
          this._mouseStart(this._mouseDownEvent, event) !== false;
        this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event);
      }
      return !this._mouseStarted;
    },
    _mouseUp: function(event) {
      this.document
        .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      if (this._mouseStarted) {
        this._mouseStarted = false;
        if (event.target === this._mouseDownEvent.target) {
          $.data(event.target, this.widgetName + ".preventClickEvent", true);
        }
        this._mouseStop(event);
      }
      mouseHandled = false;
      return false;
    },
    _mouseDistanceMet: function(event) {
      return (
        Math.max(
          Math.abs(this._mouseDownEvent.pageX - event.pageX),
          Math.abs(this._mouseDownEvent.pageY - event.pageY)
        ) >= this.options.distance
      );
    },
    _mouseDelayMet: function() {
      return this.mouseDelayMet;
    },
    _mouseStart: function() {},
    _mouseDrag: function() {},
    _mouseStop: function() {},
    _mouseCapture: function() {
      return true;
    }
  });
  (function() {
    $.ui = $.ui || {};
    var cachedScrollbarWidth,
      supportsOffsetFractions,
      max = Math.max,
      abs = Math.abs,
      round = Math.round,
      rhorizontal = /left|center|right/,
      rvertical = /top|center|bottom/,
      roffset = /[\+\-]\d+(\.[\d]+)?%?/,
      rposition = /^\w+/,
      rpercent = /%$/,
      _position = $.fn.position;
    function getOffsets(offsets, width, height) {
      return [
        parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
        parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
      ];
    }
    function parseCss(element, property) {
      return parseInt($.css(element, property), 10) || 0;
    }
    function getDimensions(elem) {
      var raw = elem[0];
      if (raw.nodeType === 9) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: { top: 0, left: 0 }
        };
      }
      if ($.isWindow(raw)) {
        return {
          width: elem.width(),
          height: elem.height(),
          offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
        };
      }
      if (raw.preventDefault) {
        return {
          width: 0,
          height: 0,
          offset: { top: raw.pageY, left: raw.pageX }
        };
      }
      return {
        width: elem.outerWidth(),
        height: elem.outerHeight(),
        offset: elem.offset()
      };
    }
    $.position = {
      scrollbarWidth: function() {
        if (cachedScrollbarWidth !== undefined) {
          return cachedScrollbarWidth;
        }
        var w1,
          w2,
          div = $(
            "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
          ),
          innerDiv = div.children()[0];
        $("body").append(div);
        w1 = innerDiv.offsetWidth;
        div.css("overflow", "scroll");
        w2 = innerDiv.offsetWidth;
        if (w1 === w2) {
          w2 = div[0].clientWidth;
        }
        div.remove();
        return (cachedScrollbarWidth = w1 - w2);
      },
      getScrollInfo: function(within) {
        var overflowX =
            within.isWindow || within.isDocument
              ? ""
              : within.element.css("overflow-x"),
          overflowY =
            within.isWindow || within.isDocument
              ? ""
              : within.element.css("overflow-y"),
          hasOverflowX =
            overflowX === "scroll" ||
            (overflowX === "auto" &&
              within.width < within.element[0].scrollWidth),
          hasOverflowY =
            overflowY === "scroll" ||
            (overflowY === "auto" &&
              within.height < within.element[0].scrollHeight);
        return {
          width: hasOverflowY ? $.position.scrollbarWidth() : 0,
          height: hasOverflowX ? $.position.scrollbarWidth() : 0
        };
      },
      getWithinInfo: function(element) {
        var withinElement = $(element || window),
          isWindow = $.isWindow(withinElement[0]),
          isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
        return {
          element: withinElement,
          isWindow: isWindow,
          isDocument: isDocument,
          offset: withinElement.offset() || { left: 0, top: 0 },
          scrollLeft: withinElement.scrollLeft(),
          scrollTop: withinElement.scrollTop(),
          width:
            isWindow || isDocument
              ? withinElement.width()
              : withinElement.outerWidth(),
          height:
            isWindow || isDocument
              ? withinElement.height()
              : withinElement.outerHeight()
        };
      }
    };
    $.fn.position = function(options) {
      if (!options || !options.of) {
        return _position.apply(this, arguments);
      }
      options = $.extend({}, options);
      var atOffset,
        targetWidth,
        targetHeight,
        targetOffset,
        basePosition,
        dimensions,
        target = $(options.of),
        within = $.position.getWithinInfo(options.within),
        scrollInfo = $.position.getScrollInfo(within),
        collision = (options.collision || "flip").split(" "),
        offsets = {};
      dimensions = getDimensions(target);
      if (target[0].preventDefault) {
        options.at = "left top";
      }
      targetWidth = dimensions.width;
      targetHeight = dimensions.height;
      targetOffset = dimensions.offset;
      basePosition = $.extend({}, targetOffset);
      $.each(["my", "at"], function() {
        var pos = (options[this] || "").split(" "),
          horizontalOffset,
          verticalOffset;
        if (pos.length === 1) {
          pos = rhorizontal.test(pos[0])
            ? pos.concat(["center"])
            : rvertical.test(pos[0])
            ? ["center"].concat(pos)
            : ["center", "center"];
        }
        pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
        pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";
        horizontalOffset = roffset.exec(pos[0]);
        verticalOffset = roffset.exec(pos[1]);
        offsets[this] = [
          horizontalOffset ? horizontalOffset[0] : 0,
          verticalOffset ? verticalOffset[0] : 0
        ];
        options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
      });
      if (collision.length === 1) {
        collision[1] = collision[0];
      }
      if (options.at[0] === "right") {
        basePosition.left += targetWidth;
      } else if (options.at[0] === "center") {
        basePosition.left += targetWidth / 2;
      }
      if (options.at[1] === "bottom") {
        basePosition.top += targetHeight;
      } else if (options.at[1] === "center") {
        basePosition.top += targetHeight / 2;
      }
      atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
      basePosition.left += atOffset[0];
      basePosition.top += atOffset[1];
      return this.each(function() {
        var collisionPosition,
          using,
          elem = $(this),
          elemWidth = elem.outerWidth(),
          elemHeight = elem.outerHeight(),
          marginLeft = parseCss(this, "marginLeft"),
          marginTop = parseCss(this, "marginTop"),
          collisionWidth =
            elemWidth +
            marginLeft +
            parseCss(this, "marginRight") +
            scrollInfo.width,
          collisionHeight =
            elemHeight +
            marginTop +
            parseCss(this, "marginBottom") +
            scrollInfo.height,
          position = $.extend({}, basePosition),
          myOffset = getOffsets(
            offsets.my,
            elem.outerWidth(),
            elem.outerHeight()
          );
        if (options.my[0] === "right") {
          position.left -= elemWidth;
        } else if (options.my[0] === "center") {
          position.left -= elemWidth / 2;
        }
        if (options.my[1] === "bottom") {
          position.top -= elemHeight;
        } else if (options.my[1] === "center") {
          position.top -= elemHeight / 2;
        }
        position.left += myOffset[0];
        position.top += myOffset[1];
        if (!supportsOffsetFractions) {
          position.left = round(position.left);
          position.top = round(position.top);
        }
        collisionPosition = { marginLeft: marginLeft, marginTop: marginTop };
        $.each(["left", "top"], function(i, dir) {
          if ($.ui.position[collision[i]]) {
            $.ui.position[collision[i]][dir](position, {
              targetWidth: targetWidth,
              targetHeight: targetHeight,
              elemWidth: elemWidth,
              elemHeight: elemHeight,
              collisionPosition: collisionPosition,
              collisionWidth: collisionWidth,
              collisionHeight: collisionHeight,
              offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
              my: options.my,
              at: options.at,
              within: within,
              elem: elem
            });
          }
        });
        if (options.using) {
          using = function(props) {
            var left = targetOffset.left - position.left,
              right = left + targetWidth - elemWidth,
              top = targetOffset.top - position.top,
              bottom = top + targetHeight - elemHeight,
              feedback = {
                target: {
                  element: target,
                  left: targetOffset.left,
                  top: targetOffset.top,
                  width: targetWidth,
                  height: targetHeight
                },
                element: {
                  element: elem,
                  left: position.left,
                  top: position.top,
                  width: elemWidth,
                  height: elemHeight
                },
                horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
              };
            if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
              feedback.horizontal = "center";
            }
            if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
              feedback.vertical = "middle";
            }
            if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
              feedback.important = "horizontal";
            } else {
              feedback.important = "vertical";
            }
            options.using.call(this, props, feedback);
          };
        }
        elem.offset($.extend(position, { using: using }));
      });
    };
    $.ui.position = {
      fit: {
        left: function(position, data) {
          var within = data.within,
            withinOffset = within.isWindow
              ? within.scrollLeft
              : within.offset.left,
            outerWidth = within.width,
            collisionPosLeft =
              position.left - data.collisionPosition.marginLeft,
            overLeft = withinOffset - collisionPosLeft,
            overRight =
              collisionPosLeft +
              data.collisionWidth -
              outerWidth -
              withinOffset,
            newOverRight;
          if (data.collisionWidth > outerWidth) {
            if (overLeft > 0 && overRight <= 0) {
              newOverRight =
                position.left +
                overLeft +
                data.collisionWidth -
                outerWidth -
                withinOffset;
              position.left += overLeft - newOverRight;
            } else if (overRight > 0 && overLeft <= 0) {
              position.left = withinOffset;
            } else {
              if (overLeft > overRight) {
                position.left = withinOffset + outerWidth - data.collisionWidth;
              } else {
                position.left = withinOffset;
              }
            }
          } else if (overLeft > 0) {
            position.left += overLeft;
          } else if (overRight > 0) {
            position.left -= overRight;
          } else {
            position.left = max(
              position.left - collisionPosLeft,
              position.left
            );
          }
        },
        top: function(position, data) {
          var within = data.within,
            withinOffset = within.isWindow
              ? within.scrollTop
              : within.offset.top,
            outerHeight = data.within.height,
            collisionPosTop = position.top - data.collisionPosition.marginTop,
            overTop = withinOffset - collisionPosTop,
            overBottom =
              collisionPosTop +
              data.collisionHeight -
              outerHeight -
              withinOffset,
            newOverBottom;
          if (data.collisionHeight > outerHeight) {
            if (overTop > 0 && overBottom <= 0) {
              newOverBottom =
                position.top +
                overTop +
                data.collisionHeight -
                outerHeight -
                withinOffset;
              position.top += overTop - newOverBottom;
            } else if (overBottom > 0 && overTop <= 0) {
              position.top = withinOffset;
            } else {
              if (overTop > overBottom) {
                position.top =
                  withinOffset + outerHeight - data.collisionHeight;
              } else {
                position.top = withinOffset;
              }
            }
          } else if (overTop > 0) {
            position.top += overTop;
          } else if (overBottom > 0) {
            position.top -= overBottom;
          } else {
            position.top = max(position.top - collisionPosTop, position.top);
          }
        }
      },
      flip: {
        left: function(position, data) {
          var within = data.within,
            withinOffset = within.offset.left + within.scrollLeft,
            outerWidth = within.width,
            offsetLeft = within.isWindow
              ? within.scrollLeft
              : within.offset.left,
            collisionPosLeft =
              position.left - data.collisionPosition.marginLeft,
            overLeft = collisionPosLeft - offsetLeft,
            overRight =
              collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
            myOffset =
              data.my[0] === "left"
                ? -data.elemWidth
                : data.my[0] === "right"
                ? data.elemWidth
                : 0,
            atOffset =
              data.at[0] === "left"
                ? data.targetWidth
                : data.at[0] === "right"
                ? -data.targetWidth
                : 0,
            offset = -2 * data.offset[0],
            newOverRight,
            newOverLeft;
          if (overLeft < 0) {
            newOverRight =
              position.left +
              myOffset +
              atOffset +
              offset +
              data.collisionWidth -
              outerWidth -
              withinOffset;
            if (newOverRight < 0 || newOverRight < abs(overLeft)) {
              position.left += myOffset + atOffset + offset;
            }
          } else if (overRight > 0) {
            newOverLeft =
              position.left -
              data.collisionPosition.marginLeft +
              myOffset +
              atOffset +
              offset -
              offsetLeft;
            if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
              position.left += myOffset + atOffset + offset;
            }
          }
        },
        top: function(position, data) {
          var within = data.within,
            withinOffset = within.offset.top + within.scrollTop,
            outerHeight = within.height,
            offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
            collisionPosTop = position.top - data.collisionPosition.marginTop,
            overTop = collisionPosTop - offsetTop,
            overBottom =
              collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
            top = data.my[1] === "top",
            myOffset = top
              ? -data.elemHeight
              : data.my[1] === "bottom"
              ? data.elemHeight
              : 0,
            atOffset =
              data.at[1] === "top"
                ? data.targetHeight
                : data.at[1] === "bottom"
                ? -data.targetHeight
                : 0,
            offset = -2 * data.offset[1],
            newOverTop,
            newOverBottom;
          if (overTop < 0) {
            newOverBottom =
              position.top +
              myOffset +
              atOffset +
              offset +
              data.collisionHeight -
              outerHeight -
              withinOffset;
            if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
              position.top += myOffset + atOffset + offset;
            }
          } else if (overBottom > 0) {
            newOverTop =
              position.top -
              data.collisionPosition.marginTop +
              myOffset +
              atOffset +
              offset -
              offsetTop;
            if (newOverTop > 0 || abs(newOverTop) < overBottom) {
              position.top += myOffset + atOffset + offset;
            }
          }
        }
      },
      flipfit: {
        left: function() {
          $.ui.position.flip.left.apply(this, arguments);
          $.ui.position.fit.left.apply(this, arguments);
        },
        top: function() {
          $.ui.position.flip.top.apply(this, arguments);
          $.ui.position.fit.top.apply(this, arguments);
        }
      }
    };
    (function() {
      var testElement,
        testElementParent,
        testElementStyle,
        offsetLeft,
        i,
        body = document.getElementsByTagName("body")[0],
        div = document.createElement("div");
      testElement = document.createElement(body ? "div" : "body");
      testElementStyle = {
        visibility: "hidden",
        width: 0,
        height: 0,
        border: 0,
        margin: 0,
        background: "none"
      };
      if (body) {
        $.extend(testElementStyle, {
          position: "absolute",
          left: "-1000px",
          top: "-1000px"
        });
      }
      for (i in testElementStyle) {
        testElement.style[i] = testElementStyle[i];
      }
      testElement.appendChild(div);
      testElementParent = body || document.documentElement;
      testElementParent.insertBefore(testElement, testElementParent.firstChild);
      div.style.cssText = "position: absolute; left: 10.7432222px;";
      offsetLeft = $(div).offset().left;
      supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;
      testElement.innerHTML = "";
      testElementParent.removeChild(testElement);
    })();
  })();
  var position = $.ui.position;
  $.widget("ui.draggable", $.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "drag",
    options: {
      addClasses: true,
      appendTo: "parent",
      axis: false,
      connectToSortable: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      grid: false,
      handle: false,
      helper: "original",
      iframeFix: false,
      opacity: false,
      refreshPositions: false,
      revert: false,
      revertDuration: 500,
      scope: "default",
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: false,
      snapMode: "both",
      snapTolerance: 20,
      stack: false,
      zIndex: false,
      drag: null,
      start: null,
      stop: null
    },
    _create: function() {
      if (this.options.helper === "original") {
        this._setPositionRelative();
      }
      if (this.options.addClasses) {
        this.element.addClass("ui-draggable");
      }
      if (this.options.disabled) {
        this.element.addClass("ui-draggable-disabled");
      }
      this._setHandleClassName();
      this._mouseInit();
    },
    _setOption: function(key, value) {
      this._super(key, value);
      if (key === "handle") {
        this._removeHandleClassName();
        this._setHandleClassName();
      }
    },
    _destroy: function() {
      if ((this.helper || this.element).is(".ui-draggable-dragging")) {
        this.destroyOnClear = true;
        return;
      }
      this.element.removeClass(
        "ui-draggable ui-draggable-dragging ui-draggable-disabled"
      );
      this._removeHandleClassName();
      this._mouseDestroy();
    },
    _mouseCapture: function(event) {
      var o = this.options;
      this._blurActiveElement(event);
      if (
        this.helper ||
        o.disabled ||
        $(event.target).closest(".ui-resizable-handle").length > 0
      ) {
        return false;
      }
      this.handle = this._getHandle(event);
      if (!this.handle) {
        return false;
      }
      this._blockFrames(o.iframeFix === true ? "iframe" : o.iframeFix);
      return true;
    },
    _blockFrames: function(selector) {
      this.iframeBlocks = this.document.find(selector).map(function() {
        var iframe = $(this);
        return $("<div>")
          .css("position", "absolute")
          .appendTo(iframe.parent())
          .outerWidth(iframe.outerWidth())
          .outerHeight(iframe.outerHeight())
          .offset(iframe.offset())[0];
      });
    },
    _unblockFrames: function() {
      if (this.iframeBlocks) {
        this.iframeBlocks.remove();
        delete this.iframeBlocks;
      }
    },
    _blurActiveElement: function(event) {
      var document = this.document[0];
      if (!this.handleElement.is(event.target)) {
        return;
      }
      try {
        if (
          document.activeElement &&
          document.activeElement.nodeName.toLowerCase() !== "body"
        ) {
          $(document.activeElement).blur();
        }
      } catch (error) {}
    },
    _mouseStart: function(event) {
      var o = this.options;
      this.helper = this._createHelper(event);
      this.helper.addClass("ui-draggable-dragging");
      this._cacheHelperProportions();
      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }
      this._cacheMargins();
      this.cssPosition = this.helper.css("position");
      this.scrollParent = this.helper.scrollParent(true);
      this.offsetParent = this.helper.offsetParent();
      this.hasFixedAncestor =
        this.helper.parents().filter(function() {
          return $(this).css("position") === "fixed";
        }).length > 0;
      this.positionAbs = this.element.offset();
      this._refreshOffsets(event);
      this.originalPosition = this.position = this._generatePosition(
        event,
        false
      );
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY;
      o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);
      this._setContainment();
      if (this._trigger("start", event) === false) {
        this._clear();
        return false;
      }
      this._cacheHelperProportions();
      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      }
      this._normalizeRightBottom();
      this._mouseDrag(event, true);
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStart(this, event);
      }
      return true;
    },
    _refreshOffsets: function(event) {
      this.offset = {
        top: this.positionAbs.top - this.margins.top,
        left: this.positionAbs.left - this.margins.left,
        scroll: false,
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      };
      this.offset.click = {
        left: event.pageX - this.offset.left,
        top: event.pageY - this.offset.top
      };
    },
    _mouseDrag: function(event, noPropagation) {
      if (this.hasFixedAncestor) {
        this.offset.parent = this._getParentOffset();
      }
      this.position = this._generatePosition(event, true);
      this.positionAbs = this._convertPositionTo("absolute");
      if (!noPropagation) {
        var ui = this._uiHash();
        if (this._trigger("drag", event, ui) === false) {
          this._mouseUp({});
          return false;
        }
        this.position = ui.position;
      }
      this.helper[0].style.left = this.position.left + "px";
      this.helper[0].style.top = this.position.top + "px";
      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }
      return false;
    },
    _mouseStop: function(event) {
      var that = this,
        dropped = false;
      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        dropped = $.ui.ddmanager.drop(this, event);
      }
      if (this.dropped) {
        dropped = this.dropped;
        this.dropped = false;
      }
      if (
        (this.options.revert === "invalid" && !dropped) ||
        (this.options.revert === "valid" && dropped) ||
        this.options.revert === true ||
        ($.isFunction(this.options.revert) &&
          this.options.revert.call(this.element, dropped))
      ) {
        $(this.helper).animate(
          this.originalPosition,
          parseInt(this.options.revertDuration, 10),
          function() {
            if (that._trigger("stop", event) !== false) {
              that._clear();
            }
          }
        );
      } else {
        if (this._trigger("stop", event) !== false) {
          this._clear();
        }
      }
      return false;
    },
    _mouseUp: function(event) {
      this._unblockFrames();
      if ($.ui.ddmanager) {
        $.ui.ddmanager.dragStop(this, event);
      }
      if (this.handleElement.is(event.target)) {
        this.element.focus();
      }
      return $.ui.mouse.prototype._mouseUp.call(this, event);
    },
    cancel: function() {
      if (this.helper.is(".ui-draggable-dragging")) {
        this._mouseUp({});
      } else {
        this._clear();
      }
      return this;
    },
    _getHandle: function(event) {
      return this.options.handle
        ? !!$(event.target).closest(this.element.find(this.options.handle))
            .length
        : true;
    },
    _setHandleClassName: function() {
      this.handleElement = this.options.handle
        ? this.element.find(this.options.handle)
        : this.element;
      this.handleElement.addClass("ui-draggable-handle");
    },
    _removeHandleClassName: function() {
      this.handleElement.removeClass("ui-draggable-handle");
    },
    _createHelper: function(event) {
      var o = this.options,
        helperIsFunction = $.isFunction(o.helper),
        helper = helperIsFunction
          ? $(o.helper.apply(this.element[0], [event]))
          : o.helper === "clone"
          ? this.element.clone().removeAttr("id")
          : this.element;
      if (!helper.parents("body").length) {
        helper.appendTo(
          o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo
        );
      }
      if (helperIsFunction && helper[0] === this.element[0]) {
        this._setPositionRelative();
      }
      if (
        helper[0] !== this.element[0] &&
        !/(fixed|absolute)/.test(helper.css("position"))
      ) {
        helper.css("position", "absolute");
      }
      return helper;
    },
    _setPositionRelative: function() {
      if (!/^(?:r|a|f)/.test(this.element.css("position"))) {
        this.element[0].style.position = "relative";
      }
    },
    _adjustOffsetFromHelper: function(obj) {
      if (typeof obj === "string") {
        obj = obj.split(" ");
      }
      if ($.isArray(obj)) {
        obj = { left: +obj[0], top: +obj[1] || 0 };
      }
      if ("left" in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }
      if ("right" in obj) {
        this.offset.click.left =
          this.helperProportions.width - obj.right + this.margins.left;
      }
      if ("top" in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }
      if ("bottom" in obj) {
        this.offset.click.top =
          this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },
    _isRootNode: function(element) {
      return (
        /(html|body)/i.test(element.tagName) || element === this.document[0]
      );
    },
    _getParentOffset: function() {
      var po = this.offsetParent.offset(),
        document = this.document[0];
      if (
        this.cssPosition === "absolute" &&
        this.scrollParent[0] !== document &&
        $.contains(this.scrollParent[0], this.offsetParent[0])
      ) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }
      if (this._isRootNode(this.offsetParent[0])) {
        po = { top: 0, left: 0 };
      }
      return {
        top:
          po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left:
          po.left +
          (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function() {
      if (this.cssPosition !== "relative") {
        return { top: 0, left: 0 };
      }
      var p = this.element.position(),
        scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
      return {
        top:
          p.top -
          (parseInt(this.helper.css("top"), 10) || 0) +
          (!scrollIsRootNode ? this.scrollParent.scrollTop() : 0),
        left:
          p.left -
          (parseInt(this.helper.css("left"), 10) || 0) +
          (!scrollIsRootNode ? this.scrollParent.scrollLeft() : 0)
      };
    },
    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      };
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function() {
      var isUserScrollable,
        c,
        ce,
        o = this.options,
        document = this.document[0];
      this.relativeContainer = null;
      if (!o.containment) {
        this.containment = null;
        return;
      }
      if (o.containment === "window") {
        this.containment = [
          $(window).scrollLeft() -
            this.offset.relative.left -
            this.offset.parent.left,
          $(window).scrollTop() -
            this.offset.relative.top -
            this.offset.parent.top,
          $(window).scrollLeft() +
            $(window).width() -
            this.helperProportions.width -
            this.margins.left,
          $(window).scrollTop() +
            ($(window).height() || document.body.parentNode.scrollHeight) -
            this.helperProportions.height -
            this.margins.top
        ];
        return;
      }
      if (o.containment === "document") {
        this.containment = [
          0,
          0,
          $(document).width() -
            this.helperProportions.width -
            this.margins.left,
          ($(document).height() || document.body.parentNode.scrollHeight) -
            this.helperProportions.height -
            this.margins.top
        ];
        return;
      }
      if (o.containment.constructor === Array) {
        this.containment = o.containment;
        return;
      }
      if (o.containment === "parent") {
        o.containment = this.helper[0].parentNode;
      }
      c = $(o.containment);
      ce = c[0];
      if (!ce) {
        return;
      }
      isUserScrollable = /(scroll|auto)/.test(c.css("overflow"));
      this.containment = [
        (parseInt(c.css("borderLeftWidth"), 10) || 0) +
          (parseInt(c.css("paddingLeft"), 10) || 0),
        (parseInt(c.css("borderTopWidth"), 10) || 0) +
          (parseInt(c.css("paddingTop"), 10) || 0),
        (isUserScrollable
          ? Math.max(ce.scrollWidth, ce.offsetWidth)
          : ce.offsetWidth) -
          (parseInt(c.css("borderRightWidth"), 10) || 0) -
          (parseInt(c.css("paddingRight"), 10) || 0) -
          this.helperProportions.width -
          this.margins.left -
          this.margins.right,
        (isUserScrollable
          ? Math.max(ce.scrollHeight, ce.offsetHeight)
          : ce.offsetHeight) -
          (parseInt(c.css("borderBottomWidth"), 10) || 0) -
          (parseInt(c.css("paddingBottom"), 10) || 0) -
          this.helperProportions.height -
          this.margins.top -
          this.margins.bottom
      ];
      this.relativeContainer = c;
    },
    _convertPositionTo: function(d, pos) {
      if (!pos) {
        pos = this.position;
      }
      var mod = d === "absolute" ? 1 : -1,
        scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
      return {
        top:
          pos.top +
          this.offset.relative.top * mod +
          this.offset.parent.top * mod -
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.top
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.top) *
            mod,
        left:
          pos.left +
          this.offset.relative.left * mod +
          this.offset.parent.left * mod -
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.left
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.left) *
            mod
      };
    },
    _generatePosition: function(event, constrainPosition) {
      var containment,
        co,
        top,
        left,
        o = this.options,
        scrollIsRootNode = this._isRootNode(this.scrollParent[0]),
        pageX = event.pageX,
        pageY = event.pageY;
      if (!scrollIsRootNode || !this.offset.scroll) {
        this.offset.scroll = {
          top: this.scrollParent.scrollTop(),
          left: this.scrollParent.scrollLeft()
        };
      }
      if (constrainPosition) {
        if (this.containment) {
          if (this.relativeContainer) {
            co = this.relativeContainer.offset();
            containment = [
              this.containment[0] + co.left,
              this.containment[1] + co.top,
              this.containment[2] + co.left,
              this.containment[3] + co.top
            ];
          } else {
            containment = this.containment;
          }
          if (event.pageX - this.offset.click.left < containment[0]) {
            pageX = containment[0] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top < containment[1]) {
            pageY = containment[1] + this.offset.click.top;
          }
          if (event.pageX - this.offset.click.left > containment[2]) {
            pageX = containment[2] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top > containment[3]) {
            pageY = containment[3] + this.offset.click.top;
          }
        }
        if (o.grid) {
          top = o.grid[1]
            ? this.originalPageY +
              Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1]
            : this.originalPageY;
          pageY = containment
            ? top - this.offset.click.top >= containment[1] ||
              top - this.offset.click.top > containment[3]
              ? top
              : top - this.offset.click.top >= containment[1]
              ? top - o.grid[1]
              : top + o.grid[1]
            : top;
          left = o.grid[0]
            ? this.originalPageX +
              Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0]
            : this.originalPageX;
          pageX = containment
            ? left - this.offset.click.left >= containment[0] ||
              left - this.offset.click.left > containment[2]
              ? left
              : left - this.offset.click.left >= containment[0]
              ? left - o.grid[0]
              : left + o.grid[0]
            : left;
        }
        if (o.axis === "y") {
          pageX = this.originalPageX;
        }
        if (o.axis === "x") {
          pageY = this.originalPageY;
        }
      }
      return {
        top:
          pageY -
          this.offset.click.top -
          this.offset.relative.top -
          this.offset.parent.top +
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.top
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.top),
        left:
          pageX -
          this.offset.click.left -
          this.offset.relative.left -
          this.offset.parent.left +
          (this.cssPosition === "fixed"
            ? -this.offset.scroll.left
            : scrollIsRootNode
            ? 0
            : this.offset.scroll.left)
      };
    },
    _clear: function() {
      this.helper.removeClass("ui-draggable-dragging");
      if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
        this.helper.remove();
      }
      this.helper = null;
      this.cancelHelperRemoval = false;
      if (this.destroyOnClear) {
        this.destroy();
      }
    },
    _normalizeRightBottom: function() {
      if (this.options.axis !== "y" && this.helper.css("right") !== "auto") {
        this.helper.width(this.helper.width());
        this.helper.css("right", "auto");
      }
      if (this.options.axis !== "x" && this.helper.css("bottom") !== "auto") {
        this.helper.height(this.helper.height());
        this.helper.css("bottom", "auto");
      }
    },
    _trigger: function(type, event, ui) {
      ui = ui || this._uiHash();
      $.ui.plugin.call(this, type, [event, ui, this], true);
      if (/^(drag|start|stop)/.test(type)) {
        this.positionAbs = this._convertPositionTo("absolute");
        ui.offset = this.positionAbs;
      }
      return $.Widget.prototype._trigger.call(this, type, event, ui);
    },
    plugins: {},
    _uiHash: function() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      };
    }
  });
  $.ui.plugin.add("draggable", "connectToSortable", {
    start: function(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, { item: draggable.element });
      draggable.sortables = [];
      $(draggable.options.connectToSortable).each(function() {
        var sortable = $(this).sortable("instance");
        if (sortable && !sortable.options.disabled) {
          draggable.sortables.push(sortable);
          sortable.refreshPositions();
          sortable._trigger("activate", event, uiSortable);
        }
      });
    },
    stop: function(event, ui, draggable) {
      var uiSortable = $.extend({}, ui, { item: draggable.element });
      draggable.cancelHelperRemoval = false;
      $.each(draggable.sortables, function() {
        var sortable = this;
        if (sortable.isOver) {
          sortable.isOver = 0;
          draggable.cancelHelperRemoval = true;
          sortable.cancelHelperRemoval = false;
          sortable._storedCSS = {
            position: sortable.placeholder.css("position"),
            top: sortable.placeholder.css("top"),
            left: sortable.placeholder.css("left")
          };
          sortable._mouseStop(event);
          sortable.options.helper = sortable.options._helper;
        } else {
          sortable.cancelHelperRemoval = true;
          sortable._trigger("deactivate", event, uiSortable);
        }
      });
    },
    drag: function(event, ui, draggable) {
      $.each(draggable.sortables, function() {
        var innermostIntersecting = false,
          sortable = this;
        sortable.positionAbs = draggable.positionAbs;
        sortable.helperProportions = draggable.helperProportions;
        sortable.offset.click = draggable.offset.click;
        if (sortable._intersectsWith(sortable.containerCache)) {
          innermostIntersecting = true;
          $.each(draggable.sortables, function() {
            this.positionAbs = draggable.positionAbs;
            this.helperProportions = draggable.helperProportions;
            this.offset.click = draggable.offset.click;
            if (
              this !== sortable &&
              this._intersectsWith(this.containerCache) &&
              $.contains(sortable.element[0], this.element[0])
            ) {
              innermostIntersecting = false;
            }
            return innermostIntersecting;
          });
        }
        if (innermostIntersecting) {
          if (!sortable.isOver) {
            sortable.isOver = 1;
            draggable._parent = ui.helper.parent();
            sortable.currentItem = ui.helper
              .appendTo(sortable.element)
              .data("ui-sortable-item", true);
            sortable.options._helper = sortable.options.helper;
            sortable.options.helper = function() {
              return ui.helper[0];
            };
            event.target = sortable.currentItem[0];
            sortable._mouseCapture(event, true);
            sortable._mouseStart(event, true, true);
            sortable.offset.click.top = draggable.offset.click.top;
            sortable.offset.click.left = draggable.offset.click.left;
            sortable.offset.parent.left -=
              draggable.offset.parent.left - sortable.offset.parent.left;
            sortable.offset.parent.top -=
              draggable.offset.parent.top - sortable.offset.parent.top;
            draggable._trigger("toSortable", event);
            draggable.dropped = sortable.element;
            $.each(draggable.sortables, function() {
              this.refreshPositions();
            });
            draggable.currentItem = draggable.element;
            sortable.fromOutside = draggable;
          }
          if (sortable.currentItem) {
            sortable._mouseDrag(event);
            ui.position = sortable.position;
          }
        } else {
          if (sortable.isOver) {
            sortable.isOver = 0;
            sortable.cancelHelperRemoval = true;
            sortable.options._revert = sortable.options.revert;
            sortable.options.revert = false;
            sortable._trigger("out", event, sortable._uiHash(sortable));
            sortable._mouseStop(event, true);
            sortable.options.revert = sortable.options._revert;
            sortable.options.helper = sortable.options._helper;
            if (sortable.placeholder) {
              sortable.placeholder.remove();
            }
            ui.helper.appendTo(draggable._parent);
            draggable._refreshOffsets(event);
            ui.position = draggable._generatePosition(event, true);
            draggable._trigger("fromSortable", event);
            draggable.dropped = false;
            $.each(draggable.sortables, function() {
              this.refreshPositions();
            });
          }
        }
      });
    }
  });
  $.ui.plugin.add("draggable", "cursor", {
    start: function(event, ui, instance) {
      var t = $("body"),
        o = instance.options;
      if (t.css("cursor")) {
        o._cursor = t.css("cursor");
      }
      t.css("cursor", o.cursor);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._cursor) {
        $("body").css("cursor", o._cursor);
      }
    }
  });
  $.ui.plugin.add("draggable", "opacity", {
    start: function(event, ui, instance) {
      var t = $(ui.helper),
        o = instance.options;
      if (t.css("opacity")) {
        o._opacity = t.css("opacity");
      }
      t.css("opacity", o.opacity);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._opacity) {
        $(ui.helper).css("opacity", o._opacity);
      }
    }
  });
  $.ui.plugin.add("draggable", "scroll", {
    start: function(event, ui, i) {
      if (!i.scrollParentNotHidden) {
        i.scrollParentNotHidden = i.helper.scrollParent(false);
      }
      if (
        i.scrollParentNotHidden[0] !== i.document[0] &&
        i.scrollParentNotHidden[0].tagName !== "HTML"
      ) {
        i.overflowOffset = i.scrollParentNotHidden.offset();
      }
    },
    drag: function(event, ui, i) {
      var o = i.options,
        scrolled = false,
        scrollParent = i.scrollParentNotHidden[0],
        document = i.document[0];
      if (scrollParent !== document && scrollParent.tagName !== "HTML") {
        if (!o.axis || o.axis !== "x") {
          if (
            i.overflowOffset.top + scrollParent.offsetHeight - event.pageY <
            o.scrollSensitivity
          ) {
            scrollParent.scrollTop = scrolled =
              scrollParent.scrollTop + o.scrollSpeed;
          } else if (event.pageY - i.overflowOffset.top < o.scrollSensitivity) {
            scrollParent.scrollTop = scrolled =
              scrollParent.scrollTop - o.scrollSpeed;
          }
        }
        if (!o.axis || o.axis !== "y") {
          if (
            i.overflowOffset.left + scrollParent.offsetWidth - event.pageX <
            o.scrollSensitivity
          ) {
            scrollParent.scrollLeft = scrolled =
              scrollParent.scrollLeft + o.scrollSpeed;
          } else if (
            event.pageX - i.overflowOffset.left <
            o.scrollSensitivity
          ) {
            scrollParent.scrollLeft = scrolled =
              scrollParent.scrollLeft - o.scrollSpeed;
          }
        }
      } else {
        if (!o.axis || o.axis !== "x") {
          if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
            scrolled = $(document).scrollTop(
              $(document).scrollTop() - o.scrollSpeed
            );
          } else if (
            $(window).height() - (event.pageY - $(document).scrollTop()) <
            o.scrollSensitivity
          ) {
            scrolled = $(document).scrollTop(
              $(document).scrollTop() + o.scrollSpeed
            );
          }
        }
        if (!o.axis || o.axis !== "y") {
          if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
            scrolled = $(document).scrollLeft(
              $(document).scrollLeft() - o.scrollSpeed
            );
          } else if (
            $(window).width() - (event.pageX - $(document).scrollLeft()) <
            o.scrollSensitivity
          ) {
            scrolled = $(document).scrollLeft(
              $(document).scrollLeft() + o.scrollSpeed
            );
          }
        }
      }
      if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(i, event);
      }
    }
  });
  $.ui.plugin.add("draggable", "snap", {
    start: function(event, ui, i) {
      var o = i.options;
      i.snapElements = [];
      $(
        o.snap.constructor !== String
          ? o.snap.items || ":data(ui-draggable)"
          : o.snap
      ).each(function() {
        var $t = $(this),
          $o = $t.offset();
        if (this !== i.element[0]) {
          i.snapElements.push({
            item: this,
            width: $t.outerWidth(),
            height: $t.outerHeight(),
            top: $o.top,
            left: $o.left
          });
        }
      });
    },
    drag: function(event, ui, inst) {
      var ts,
        bs,
        ls,
        rs,
        l,
        r,
        t,
        b,
        i,
        first,
        o = inst.options,
        d = o.snapTolerance,
        x1 = ui.offset.left,
        x2 = x1 + inst.helperProportions.width,
        y1 = ui.offset.top,
        y2 = y1 + inst.helperProportions.height;
      for (i = inst.snapElements.length - 1; i >= 0; i--) {
        l = inst.snapElements[i].left - inst.margins.left;
        r = l + inst.snapElements[i].width;
        t = inst.snapElements[i].top - inst.margins.top;
        b = t + inst.snapElements[i].height;
        if (
          x2 < l - d ||
          x1 > r + d ||
          y2 < t - d ||
          y1 > b + d ||
          !$.contains(
            inst.snapElements[i].item.ownerDocument,
            inst.snapElements[i].item
          )
        ) {
          if (inst.snapElements[i].snapping) {
            inst.options.snap.release &&
              inst.options.snap.release.call(
                inst.element,
                event,
                $.extend(inst._uiHash(), {
                  snapItem: inst.snapElements[i].item
                })
              );
          }
          inst.snapElements[i].snapping = false;
          continue;
        }
        if (o.snapMode !== "inner") {
          ts = Math.abs(t - y2) <= d;
          bs = Math.abs(b - y1) <= d;
          ls = Math.abs(l - x2) <= d;
          rs = Math.abs(r - x1) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t - inst.helperProportions.height,
              left: 0
            }).top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b,
              left: 0
            }).top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l - inst.helperProportions.width
            }).left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r
            }).left;
          }
        }
        first = ts || bs || ls || rs;
        if (o.snapMode !== "outer") {
          ts = Math.abs(t - y1) <= d;
          bs = Math.abs(b - y2) <= d;
          ls = Math.abs(l - x1) <= d;
          rs = Math.abs(r - x2) <= d;
          if (ts) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: t,
              left: 0
            }).top;
          }
          if (bs) {
            ui.position.top = inst._convertPositionTo("relative", {
              top: b - inst.helperProportions.height,
              left: 0
            }).top;
          }
          if (ls) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: l
            }).left;
          }
          if (rs) {
            ui.position.left = inst._convertPositionTo("relative", {
              top: 0,
              left: r - inst.helperProportions.width
            }).left;
          }
        }
        if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
          inst.options.snap.snap &&
            inst.options.snap.snap.call(
              inst.element,
              event,
              $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })
            );
        }
        inst.snapElements[i].snapping = ts || bs || ls || rs || first;
      }
    }
  });
  $.ui.plugin.add("draggable", "stack", {
    start: function(event, ui, instance) {
      var min,
        o = instance.options,
        group = $.makeArray($(o.stack)).sort(function(a, b) {
          return (
            (parseInt($(a).css("zIndex"), 10) || 0) -
            (parseInt($(b).css("zIndex"), 10) || 0)
          );
        });
      if (!group.length) {
        return;
      }
      min = parseInt($(group[0]).css("zIndex"), 10) || 0;
      $(group).each(function(i) {
        $(this).css("zIndex", min + i);
      });
      this.css("zIndex", min + group.length);
    }
  });
  $.ui.plugin.add("draggable", "zIndex", {
    start: function(event, ui, instance) {
      var t = $(ui.helper),
        o = instance.options;
      if (t.css("zIndex")) {
        o._zIndex = t.css("zIndex");
      }
      t.css("zIndex", o.zIndex);
    },
    stop: function(event, ui, instance) {
      var o = instance.options;
      if (o._zIndex) {
        $(ui.helper).css("zIndex", o._zIndex);
      }
    }
  });
  var draggable = $.ui.draggable;
  $.widget("ui.droppable", {
    version: "1.11.4",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: false,
      addClasses: true,
      greedy: false,
      hoverClass: false,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function() {
      var proportions,
        o = this.options,
        accept = o.accept;
      this.isover = false;
      this.isout = true;
      this.accept = $.isFunction(accept)
        ? accept
        : function(d) {
            return d.is(accept);
          };
      this.proportions = function() {
        if (arguments.length) {
          proportions = arguments[0];
        } else {
          return proportions
            ? proportions
            : (proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
              });
        }
      };
      this._addToManager(o.scope);
      o.addClasses && this.element.addClass("ui-droppable");
    },
    _addToManager: function(scope) {
      $.ui.ddmanager.droppables[scope] = $.ui.ddmanager.droppables[scope] || [];
      $.ui.ddmanager.droppables[scope].push(this);
    },
    _splice: function(drop) {
      var i = 0;
      for (; i < drop.length; i++) {
        if (drop[i] === this) {
          drop.splice(i, 1);
        }
      }
    },
    _destroy: function() {
      var drop = $.ui.ddmanager.droppables[this.options.scope];
      this._splice(drop);
      this.element.removeClass("ui-droppable ui-droppable-disabled");
    },
    _setOption: function(key, value) {
      if (key === "accept") {
        this.accept = $.isFunction(value)
          ? value
          : function(d) {
              return d.is(value);
            };
      } else if (key === "scope") {
        var drop = $.ui.ddmanager.droppables[this.options.scope];
        this._splice(drop);
        this._addToManager(value);
      }
      this._super(key, value);
    },
    _activate: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (this.options.activeClass) {
        this.element.addClass(this.options.activeClass);
      }
      if (draggable) {
        this._trigger("activate", event, this.ui(draggable));
      }
    },
    _deactivate: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (this.options.activeClass) {
        this.element.removeClass(this.options.activeClass);
      }
      if (draggable) {
        this._trigger("deactivate", event, this.ui(draggable));
      }
    },
    _over: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (
        !draggable ||
        (draggable.currentItem || draggable.element)[0] === this.element[0]
      ) {
        return;
      }
      if (
        this.accept.call(
          this.element[0],
          draggable.currentItem || draggable.element
        )
      ) {
        if (this.options.hoverClass) {
          this.element.addClass(this.options.hoverClass);
        }
        this._trigger("over", event, this.ui(draggable));
      }
    },
    _out: function(event) {
      var draggable = $.ui.ddmanager.current;
      if (
        !draggable ||
        (draggable.currentItem || draggable.element)[0] === this.element[0]
      ) {
        return;
      }
      if (
        this.accept.call(
          this.element[0],
          draggable.currentItem || draggable.element
        )
      ) {
        if (this.options.hoverClass) {
          this.element.removeClass(this.options.hoverClass);
        }
        this._trigger("out", event, this.ui(draggable));
      }
    },
    _drop: function(event, custom) {
      var draggable = custom || $.ui.ddmanager.current,
        childrenIntersection = false;
      if (
        !draggable ||
        (draggable.currentItem || draggable.element)[0] === this.element[0]
      ) {
        return false;
      }
      this.element
        .find(":data(ui-droppable)")
        .not(".ui-draggable-dragging")
        .each(function() {
          var inst = $(this).droppable("instance");
          if (
            inst.options.greedy &&
            !inst.options.disabled &&
            inst.options.scope === draggable.options.scope &&
            inst.accept.call(
              inst.element[0],
              draggable.currentItem || draggable.element
            ) &&
            $.ui.intersect(
              draggable,
              $.extend(inst, { offset: inst.element.offset() }),
              inst.options.tolerance,
              event
            )
          ) {
            childrenIntersection = true;
            return false;
          }
        });
      if (childrenIntersection) {
        return false;
      }
      if (
        this.accept.call(
          this.element[0],
          draggable.currentItem || draggable.element
        )
      ) {
        if (this.options.activeClass) {
          this.element.removeClass(this.options.activeClass);
        }
        if (this.options.hoverClass) {
          this.element.removeClass(this.options.hoverClass);
        }
        this._trigger("drop", event, this.ui(draggable));
        return this.element;
      }
      return false;
    },
    ui: function(c) {
      return {
        draggable: c.currentItem || c.element,
        helper: c.helper,
        position: c.position,
        offset: c.positionAbs
      };
    }
  });
  $.ui.intersect = (function() {
    function isOverAxis(x, reference, size) {
      return x >= reference && x < reference + size;
    }
    return function(draggable, droppable, toleranceMode, event) {
      if (!droppable.offset) {
        return false;
      }
      var x1 =
          (draggable.positionAbs || draggable.position.absolute).left +
          draggable.margins.left,
        y1 =
          (draggable.positionAbs || draggable.position.absolute).top +
          draggable.margins.top,
        x2 = x1 + draggable.helperProportions.width,
        y2 = y1 + draggable.helperProportions.height,
        l = droppable.offset.left,
        t = droppable.offset.top,
        r = l + droppable.proportions().width,
        b = t + droppable.proportions().height;
      switch (toleranceMode) {
        case "fit":
          return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
        case "intersect":
          return (
            l < x1 + draggable.helperProportions.width / 2 &&
            x2 - draggable.helperProportions.width / 2 < r &&
            t < y1 + draggable.helperProportions.height / 2 &&
            y2 - draggable.helperProportions.height / 2 < b
          );
        case "pointer":
          return (
            isOverAxis(event.pageY, t, droppable.proportions().height) &&
            isOverAxis(event.pageX, l, droppable.proportions().width)
          );
        case "touch":
          return (
            ((y1 >= t && y1 <= b) ||
              (y2 >= t && y2 <= b) ||
              (y1 < t && y2 > b)) &&
            ((x1 >= l && x1 <= r) || (x2 >= l && x2 <= r) || (x1 < l && x2 > r))
          );
        default:
          return false;
      }
    };
  })();
  $.ui.ddmanager = {
    current: null,
    droppables: { default: [] },
    prepareOffsets: function(t, event) {
      var i,
        j,
        m = $.ui.ddmanager.droppables[t.options.scope] || [],
        type = event ? event.type : null,
        list = (t.currentItem || t.element)
          .find(":data(ui-droppable)")
          .addBack();
      droppablesLoop: for (i = 0; i < m.length; i++) {
        if (
          m[i].options.disabled ||
          (t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))
        ) {
          continue;
        }
        for (j = 0; j < list.length; j++) {
          if (list[j] === m[i].element[0]) {
            m[i].proportions().height = 0;
            continue droppablesLoop;
          }
        }
        m[i].visible = m[i].element.css("display") !== "none";
        if (!m[i].visible) {
          continue;
        }
        if (type === "mousedown") {
          m[i]._activate.call(m[i], event);
        }
        m[i].offset = m[i].element.offset();
        m[i].proportions({
          width: m[i].element[0].offsetWidth,
          height: m[i].element[0].offsetHeight
        });
      }
    },
    drop: function(draggable, event) {
      var dropped = false;
      $.each(
        ($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(),
        function() {
          if (!this.options) {
            return;
          }
          if (
            !this.options.disabled &&
            this.visible &&
            $.ui.intersect(draggable, this, this.options.tolerance, event)
          ) {
            dropped = this._drop.call(this, event) || dropped;
          }
          if (
            !this.options.disabled &&
            this.visible &&
            this.accept.call(
              this.element[0],
              draggable.currentItem || draggable.element
            )
          ) {
            this.isout = true;
            this.isover = false;
            this._deactivate.call(this, event);
          }
        }
      );
      return dropped;
    },
    dragStart: function(draggable, event) {
      draggable.element
        .parentsUntil("body")
        .bind("scroll.droppable", function() {
          if (!draggable.options.refreshPositions) {
            $.ui.ddmanager.prepareOffsets(draggable, event);
          }
        });
    },
    drag: function(draggable, event) {
      if (draggable.options.refreshPositions) {
        $.ui.ddmanager.prepareOffsets(draggable, event);
      }
      $.each(
        $.ui.ddmanager.droppables[draggable.options.scope] || [],
        function() {
          if (this.options.disabled || this.greedyChild || !this.visible) {
            return;
          }
          var parentInstance,
            scope,
            parent,
            intersects = $.ui.intersect(
              draggable,
              this,
              this.options.tolerance,
              event
            ),
            c =
              !intersects && this.isover
                ? "isout"
                : intersects && !this.isover
                ? "isover"
                : null;
          if (!c) {
            return;
          }
          if (this.options.greedy) {
            scope = this.options.scope;
            parent = this.element
              .parents(":data(ui-droppable)")
              .filter(function() {
                return $(this).droppable("instance").options.scope === scope;
              });
            if (parent.length) {
              parentInstance = $(parent[0]).droppable("instance");
              parentInstance.greedyChild = c === "isover";
            }
          }
          if (parentInstance && c === "isover") {
            parentInstance.isover = false;
            parentInstance.isout = true;
            parentInstance._out.call(parentInstance, event);
          }
          this[c] = true;
          this[c === "isout" ? "isover" : "isout"] = false;
          this[c === "isover" ? "_over" : "_out"].call(this, event);
          if (parentInstance && c === "isout") {
            parentInstance.isout = false;
            parentInstance.isover = true;
            parentInstance._over.call(parentInstance, event);
          }
        }
      );
    },
    dragStop: function(draggable, event) {
      draggable.element.parentsUntil("body").unbind("scroll.droppable");
      if (!draggable.options.refreshPositions) {
        $.ui.ddmanager.prepareOffsets(draggable, event);
      }
    }
  };
  var droppable = $.ui.droppable;
  $.widget("ui.resizable", $.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: false,
      animate: false,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: false,
      autoHide: false,
      containment: false,
      ghost: false,
      grid: false,
      handles: "e,s,se",
      helper: false,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 90,
      resize: null,
      start: null,
      stop: null
    },
    _num: function(value) {
      return parseInt(value, 10) || 0;
    },
    _isNumber: function(value) {
      return !isNaN(parseInt(value, 10));
    },
    _hasScroll: function(el, a) {
      if ($(el).css("overflow") === "hidden") {
        return false;
      }
      var scroll = a && a === "left" ? "scrollLeft" : "scrollTop",
        has = false;
      if (el[scroll] > 0) {
        return true;
      }
      el[scroll] = 1;
      has = el[scroll] > 0;
      el[scroll] = 0;
      return has;
    },
    _create: function() {
      var n,
        i,
        handle,
        axis,
        hname,
        that = this,
        o = this.options;
      this.element.addClass("ui-resizable");
      $.extend(this, {
        _aspectRatio: !!o.aspectRatio,
        aspectRatio: o.aspectRatio,
        originalElement: this.element,
        _proportionallyResizeElements: [],
        _helper:
          o.helper || o.ghost || o.animate
            ? o.helper || "ui-resizable-helper"
            : null
      });
      if (
        this.element[0].nodeName.match(
          /^(canvas|textarea|input|select|button|img)$/i
        )
      ) {
        this.element.wrap(
          $("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
            position: this.element.css("position"),
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
            top: this.element.css("top"),
            left: this.element.css("left")
          })
        );
        this.element = this.element
          .parent()
          .data("ui-resizable", this.element.resizable("instance"));
        this.elementIsWrapper = true;
        this.element.css({
          marginLeft: this.originalElement.css("marginLeft"),
          marginTop: this.originalElement.css("marginTop"),
          marginRight: this.originalElement.css("marginRight"),
          marginBottom: this.originalElement.css("marginBottom")
        });
        this.originalElement.css({
          marginLeft: 0,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0
        });
        this.originalResizeStyle = this.originalElement.css("resize");
        this.originalElement.css("resize", "none");
        this._proportionallyResizeElements.push(
          this.originalElement.css({
            position: "static",
            zoom: 1,
            display: "block"
          })
        );
        this.originalElement.css({
          margin: this.originalElement.css("margin")
        });
        this._proportionallyResize();
      }
      this.handles =
        o.handles ||
        (!$(".ui-resizable-handle", this.element).length
          ? "e,s,se"
          : {
              n: ".ui-resizable-n",
              e: ".ui-resizable-e",
              s: ".ui-resizable-s",
              w: ".ui-resizable-w",
              se: ".ui-resizable-se",
              sw: ".ui-resizable-sw",
              ne: ".ui-resizable-ne",
              nw: ".ui-resizable-nw"
            });
      this._handles = $();
      if (this.handles.constructor === String) {
        if (this.handles === "all") {
          this.handles = "n,e,s,w,se,sw,ne,nw";
        }
        n = this.handles.split(",");
        this.handles = {};
        for (i = 0; i < n.length; i++) {
          handle = $.trim(n[i]);
          hname = "ui-resizable-" + handle;
          axis = $("<div class='ui-resizable-handle " + hname + "'></div>");
          axis.css({ zIndex: o.zIndex });
          if ("se" === handle) {
            axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
          }
          this.handles[handle] = ".ui-resizable-" + handle;
          this.element.append(axis);
        }
      }
      this._renderAxis = function(target) {
        var i, axis, padPos, padWrapper;
        target = target || this.element;
        for (i in this.handles) {
          if (this.handles[i].constructor === String) {
            this.handles[i] = this.element
              .children(this.handles[i])
              .first()
              .show();
          } else if (this.handles[i].jquery || this.handles[i].nodeType) {
            this.handles[i] = $(this.handles[i]);
            this._on(this.handles[i], { mousedown: that._mouseDown });
          }
          if (
            this.elementIsWrapper &&
            this.originalElement[0].nodeName.match(
              /^(textarea|input|select|button)$/i
            )
          ) {
            axis = $(this.handles[i], this.element);
            padWrapper = /sw|ne|nw|se|n|s/.test(i)
              ? axis.outerHeight()
              : axis.outerWidth();
            padPos = [
              "padding",
              /ne|nw|n/.test(i)
                ? "Top"
                : /se|sw|s/.test(i)
                ? "Bottom"
                : /^e$/.test(i)
                ? "Right"
                : "Left"
            ].join("");
            target.css(padPos, padWrapper);
            this._proportionallyResize();
          }
          this._handles = this._handles.add(this.handles[i]);
        }
      };
      this._renderAxis(this.element);
      this._handles = this._handles.add(
        this.element.find(".ui-resizable-handle")
      );
      this._handles.disableSelection();
      this._handles.mouseover(function() {
        if (!that.resizing) {
          if (this.className) {
            axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
          }
          that.axis = axis && axis[1] ? axis[1] : "se";
        }
      });
      if (o.autoHide) {
        this._handles.hide();
        $(this.element)
          .addClass("ui-resizable-autohide")
          .mouseenter(function() {
            if (o.disabled) {
              return;
            }
            $(this).removeClass("ui-resizable-autohide");
            that._handles.show();
          })
          .mouseleave(function() {
            if (o.disabled) {
              return;
            }
            if (!that.resizing) {
              $(this).addClass("ui-resizable-autohide");
              that._handles.hide();
            }
          });
      }
      this._mouseInit();
    },
    _destroy: function() {
      this._mouseDestroy();
      var wrapper,
        _destroy = function(exp) {
          $(exp)
            .removeClass(
              "ui-resizable ui-resizable-disabled ui-resizable-resizing"
            )
            .removeData("resizable")
            .removeData("ui-resizable")
            .unbind(".resizable")
            .find(".ui-resizable-handle")
            .remove();
        };
      if (this.elementIsWrapper) {
        _destroy(this.element);
        wrapper = this.element;
        this.originalElement
          .css({
            position: wrapper.css("position"),
            width: wrapper.outerWidth(),
            height: wrapper.outerHeight(),
            top: wrapper.css("top"),
            left: wrapper.css("left")
          })
          .insertAfter(wrapper);
        wrapper.remove();
      }
      this.originalElement.css("resize", this.originalResizeStyle);
      _destroy(this.originalElement);
      return this;
    },
    _mouseCapture: function(event) {
      var i,
        handle,
        capture = false;
      for (i in this.handles) {
        handle = $(this.handles[i])[0];
        if (handle === event.target || $.contains(handle, event.target)) {
          capture = true;
        }
      }
      return !this.options.disabled && capture;
    },
    _mouseStart: function(event) {
      var curleft,
        curtop,
        cursor,
        o = this.options,
        el = this.element;
      this.resizing = true;
      this._renderProxy();
      curleft = this._num(this.helper.css("left"));
      curtop = this._num(this.helper.css("top"));
      if (o.containment) {
        curleft += $(o.containment).scrollLeft() || 0;
        curtop += $(o.containment).scrollTop() || 0;
      }
      this.offset = this.helper.offset();
      this.position = { left: curleft, top: curtop };
      this.size = this._helper
        ? { width: this.helper.width(), height: this.helper.height() }
        : { width: el.width(), height: el.height() };
      this.originalSize = this._helper
        ? { width: el.outerWidth(), height: el.outerHeight() }
        : { width: el.width(), height: el.height() };
      this.sizeDiff = {
        width: el.outerWidth() - el.width(),
        height: el.outerHeight() - el.height()
      };
      this.originalPosition = { left: curleft, top: curtop };
      this.originalMousePosition = { left: event.pageX, top: event.pageY };
      this.aspectRatio =
        typeof o.aspectRatio === "number"
          ? o.aspectRatio
          : this.originalSize.width / this.originalSize.height || 1;
      cursor = $(".ui-resizable-" + this.axis).css("cursor");
      $("body").css(
        "cursor",
        cursor === "auto" ? this.axis + "-resize" : cursor
      );
      el.addClass("ui-resizable-resizing");
      this._propagate("start", event);
      return true;
    },
    _mouseDrag: function(event) {
      var data,
        props,
        smp = this.originalMousePosition,
        a = this.axis,
        dx = event.pageX - smp.left || 0,
        dy = event.pageY - smp.top || 0,
        trigger = this._change[a];
      this._updatePrevProperties();
      if (!trigger) {
        return false;
      }
      data = trigger.apply(this, [event, dx, dy]);
      this._updateVirtualBoundaries(event.shiftKey);
      if (this._aspectRatio || event.shiftKey) {
        data = this._updateRatio(data, event);
      }
      data = this._respectSize(data, event);
      this._updateCache(data);
      this._propagate("resize", event);
      props = this._applyChanges();
      if (!this._helper && this._proportionallyResizeElements.length) {
        this._proportionallyResize();
      }
      if (!$.isEmptyObject(props)) {
        this._updatePrevProperties();
        this._trigger("resize", event, this.ui());
        this._applyChanges();
      }
      return false;
    },
    _mouseStop: function(event) {
      this.resizing = false;
      var pr,
        ista,
        soffseth,
        soffsetw,
        s,
        left,
        top,
        o = this.options,
        that = this;
      if (this._helper) {
        pr = this._proportionallyResizeElements;
        ista = pr.length && /textarea/i.test(pr[0].nodeName);
        soffseth =
          ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
        soffsetw = ista ? 0 : that.sizeDiff.width;
        s = {
          width: that.helper.width() - soffsetw,
          height: that.helper.height() - soffseth
        };
        left =
          parseInt(that.element.css("left"), 10) +
            (that.position.left - that.originalPosition.left) || null;
        top =
          parseInt(that.element.css("top"), 10) +
            (that.position.top - that.originalPosition.top) || null;
        if (!o.animate) {
          this.element.css($.extend(s, { top: top, left: left }));
        }
        that.helper.height(that.size.height);
        that.helper.width(that.size.width);
        if (this._helper && !o.animate) {
          this._proportionallyResize();
        }
      }
      $("body").css("cursor", "auto");
      this.element.removeClass("ui-resizable-resizing");
      this._propagate("stop", event);
      if (this._helper) {
        this.helper.remove();
      }
      return false;
    },
    _updatePrevProperties: function() {
      this.prevPosition = { top: this.position.top, left: this.position.left };
      this.prevSize = { width: this.size.width, height: this.size.height };
    },
    _applyChanges: function() {
      var props = {};
      if (this.position.top !== this.prevPosition.top) {
        props.top = this.position.top + "px";
      }
      if (this.position.left !== this.prevPosition.left) {
        props.left = this.position.left + "px";
      }
      if (this.size.width !== this.prevSize.width) {
        props.width = this.size.width + "px";
      }
      if (this.size.height !== this.prevSize.height) {
        props.height = this.size.height + "px";
      }
      this.helper.css(props);
      return props;
    },
    _updateVirtualBoundaries: function(forceAspectRatio) {
      var pMinWidth,
        pMaxWidth,
        pMinHeight,
        pMaxHeight,
        b,
        o = this.options;
      b = {
        minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
        maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
        minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
        maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
      };
      if (this._aspectRatio || forceAspectRatio) {
        pMinWidth = b.minHeight * this.aspectRatio;
        pMinHeight = b.minWidth / this.aspectRatio;
        pMaxWidth = b.maxHeight * this.aspectRatio;
        pMaxHeight = b.maxWidth / this.aspectRatio;
        if (pMinWidth > b.minWidth) {
          b.minWidth = pMinWidth;
        }
        if (pMinHeight > b.minHeight) {
          b.minHeight = pMinHeight;
        }
        if (pMaxWidth < b.maxWidth) {
          b.maxWidth = pMaxWidth;
        }
        if (pMaxHeight < b.maxHeight) {
          b.maxHeight = pMaxHeight;
        }
      }
      this._vBoundaries = b;
    },
    _updateCache: function(data) {
      this.offset = this.helper.offset();
      if (this._isNumber(data.left)) {
        this.position.left = data.left;
      }
      if (this._isNumber(data.top)) {
        this.position.top = data.top;
      }
      if (this._isNumber(data.height)) {
        this.size.height = data.height;
      }
      if (this._isNumber(data.width)) {
        this.size.width = data.width;
      }
    },
    _updateRatio: function(data) {
      var cpos = this.position,
        csize = this.size,
        a = this.axis;
      if (this._isNumber(data.height)) {
        data.width = data.height * this.aspectRatio;
      } else if (this._isNumber(data.width)) {
        data.height = data.width / this.aspectRatio;
      }
      if (a === "sw") {
        data.left = cpos.left + (csize.width - data.width);
        data.top = null;
      }
      if (a === "nw") {
        data.top = cpos.top + (csize.height - data.height);
        data.left = cpos.left + (csize.width - data.width);
      }
      return data;
    },
    _respectSize: function(data) {
      var o = this._vBoundaries,
        a = this.axis,
        ismaxw =
          this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width,
        ismaxh =
          this._isNumber(data.height) &&
          o.maxHeight &&
          o.maxHeight < data.height,
        isminw =
          this._isNumber(data.width) && o.minWidth && o.minWidth > data.width,
        isminh =
          this._isNumber(data.height) &&
          o.minHeight &&
          o.minHeight > data.height,
        dw = this.originalPosition.left + this.originalSize.width,
        dh = this.position.top + this.size.height,
        cw = /sw|nw|w/.test(a),
        ch = /nw|ne|n/.test(a);
      if (isminw) {
        data.width = o.minWidth;
      }
      if (isminh) {
        data.height = o.minHeight;
      }
      if (ismaxw) {
        data.width = o.maxWidth;
      }
      if (ismaxh) {
        data.height = o.maxHeight;
      }
      if (isminw && cw) {
        data.left = dw - o.minWidth;
      }
      if (ismaxw && cw) {
        data.left = dw - o.maxWidth;
      }
      if (isminh && ch) {
        data.top = dh - o.minHeight;
      }
      if (ismaxh && ch) {
        data.top = dh - o.maxHeight;
      }
      if (!data.width && !data.height && !data.left && data.top) {
        data.top = null;
      } else if (!data.width && !data.height && !data.top && data.left) {
        data.left = null;
      }
      return data;
    },
    _getPaddingPlusBorderDimensions: function(element) {
      var i = 0,
        widths = [],
        borders = [
          element.css("borderTopWidth"),
          element.css("borderRightWidth"),
          element.css("borderBottomWidth"),
          element.css("borderLeftWidth")
        ],
        paddings = [
          element.css("paddingTop"),
          element.css("paddingRight"),
          element.css("paddingBottom"),
          element.css("paddingLeft")
        ];
      for (; i < 4; i++) {
        widths[i] = parseInt(borders[i], 10) || 0;
        widths[i] += parseInt(paddings[i], 10) || 0;
      }
      return { height: widths[0] + widths[2], width: widths[1] + widths[3] };
    },
    _proportionallyResize: function() {
      if (!this._proportionallyResizeElements.length) {
        return;
      }
      var prel,
        i = 0,
        element = this.helper || this.element;
      for (; i < this._proportionallyResizeElements.length; i++) {
        prel = this._proportionallyResizeElements[i];
        if (!this.outerDimensions) {
          this.outerDimensions = this._getPaddingPlusBorderDimensions(prel);
        }
        prel.css({
          height: element.height() - this.outerDimensions.height || 0,
          width: element.width() - this.outerDimensions.width || 0
        });
      }
    },
    _renderProxy: function() {
      var el = this.element,
        o = this.options;
      this.elementOffset = el.offset();
      if (this._helper) {
        this.helper = this.helper || $("<div style='overflow:hidden;'></div>");
        this.helper
          .addClass(this._helper)
          .css({
            width: this.element.outerWidth() - 1,
            height: this.element.outerHeight() - 1,
            position: "absolute",
            left: this.elementOffset.left + "px",
            top: this.elementOffset.top + "px",
            zIndex: ++o.zIndex
          });
        this.helper.appendTo("body").disableSelection();
      } else {
        this.helper = this.element;
      }
    },
    _change: {
      e: function(event, dx) {
        return { width: this.originalSize.width + dx };
      },
      w: function(event, dx) {
        var cs = this.originalSize,
          sp = this.originalPosition;
        return { left: sp.left + dx, width: cs.width - dx };
      },
      n: function(event, dx, dy) {
        var cs = this.originalSize,
          sp = this.originalPosition;
        return { top: sp.top + dy, height: cs.height - dy };
      },
      s: function(event, dx, dy) {
        return { height: this.originalSize.height + dy };
      },
      se: function(event, dx, dy) {
        return $.extend(
          this._change.s.apply(this, arguments),
          this._change.e.apply(this, [event, dx, dy])
        );
      },
      sw: function(event, dx, dy) {
        return $.extend(
          this._change.s.apply(this, arguments),
          this._change.w.apply(this, [event, dx, dy])
        );
      },
      ne: function(event, dx, dy) {
        return $.extend(
          this._change.n.apply(this, arguments),
          this._change.e.apply(this, [event, dx, dy])
        );
      },
      nw: function(event, dx, dy) {
        return $.extend(
          this._change.n.apply(this, arguments),
          this._change.w.apply(this, [event, dx, dy])
        );
      }
    },
    _propagate: function(n, event) {
      $.ui.plugin.call(this, n, [event, this.ui()]);
      n !== "resize" && this._trigger(n, event, this.ui());
    },
    plugins: {},
    ui: function() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      };
    }
  });
  $.ui.plugin.add("resizable", "animate", {
    stop: function(event) {
      var that = $(this).resizable("instance"),
        o = that.options,
        pr = that._proportionallyResizeElements,
        ista = pr.length && /textarea/i.test(pr[0].nodeName),
        soffseth =
          ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
        soffsetw = ista ? 0 : that.sizeDiff.width,
        style = {
          width: that.size.width - soffsetw,
          height: that.size.height - soffseth
        },
        left =
          parseInt(that.element.css("left"), 10) +
            (that.position.left - that.originalPosition.left) || null,
        top =
          parseInt(that.element.css("top"), 10) +
            (that.position.top - that.originalPosition.top) || null;
      that.element.animate(
        $.extend(style, top && left ? { top: top, left: left } : {}),
        {
          duration: o.animateDuration,
          easing: o.animateEasing,
          step: function() {
            var data = {
              width: parseInt(that.element.css("width"), 10),
              height: parseInt(that.element.css("height"), 10),
              top: parseInt(that.element.css("top"), 10),
              left: parseInt(that.element.css("left"), 10)
            };
            if (pr && pr.length) {
              $(pr[0]).css({ width: data.width, height: data.height });
            }
            that._updateCache(data);
            that._propagate("resize", event);
          }
        }
      );
    }
  });
  $.ui.plugin.add("resizable", "containment", {
    start: function() {
      var element,
        p,
        co,
        ch,
        cw,
        width,
        height,
        that = $(this).resizable("instance"),
        o = that.options,
        el = that.element,
        oc = o.containment,
        ce =
          oc instanceof $
            ? oc.get(0)
            : /parent/.test(oc)
            ? el.parent().get(0)
            : oc;
      if (!ce) {
        return;
      }
      that.containerElement = $(ce);
      if (/document/.test(oc) || oc === document) {
        that.containerOffset = { left: 0, top: 0 };
        that.containerPosition = { left: 0, top: 0 };
        that.parentData = {
          element: $(document),
          left: 0,
          top: 0,
          width: $(document).width(),
          height: $(document).height() || document.body.parentNode.scrollHeight
        };
      } else {
        element = $(ce);
        p = [];
        $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
          p[i] = that._num(element.css("padding" + name));
        });
        that.containerOffset = element.offset();
        that.containerPosition = element.position();
        that.containerSize = {
          height: element.innerHeight() - p[3],
          width: element.innerWidth() - p[1]
        };
        co = that.containerOffset;
        ch = that.containerSize.height;
        cw = that.containerSize.width;
        width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw;
        height = that._hasScroll(ce) ? ce.scrollHeight : ch;
        that.parentData = {
          element: ce,
          left: co.left,
          top: co.top,
          width: width,
          height: height
        };
      }
    },
    resize: function(event) {
      var woset,
        hoset,
        isParent,
        isOffsetRelative,
        that = $(this).resizable("instance"),
        o = that.options,
        co = that.containerOffset,
        cp = that.position,
        pRatio = that._aspectRatio || event.shiftKey,
        cop = { top: 0, left: 0 },
        ce = that.containerElement,
        continueResize = true;
      if (ce[0] !== document && /static/.test(ce.css("position"))) {
        cop = co;
      }
      if (cp.left < (that._helper ? co.left : 0)) {
        that.size.width =
          that.size.width +
          (that._helper
            ? that.position.left - co.left
            : that.position.left - cop.left);
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
        that.position.left = o.helper ? co.left : 0;
      }
      if (cp.top < (that._helper ? co.top : 0)) {
        that.size.height =
          that.size.height +
          (that._helper ? that.position.top - co.top : that.position.top);
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
        that.position.top = that._helper ? co.top : 0;
      }
      isParent = that.containerElement.get(0) === that.element.parent().get(0);
      isOffsetRelative = /relative|absolute/.test(
        that.containerElement.css("position")
      );
      if (isParent && isOffsetRelative) {
        that.offset.left = that.parentData.left + that.position.left;
        that.offset.top = that.parentData.top + that.position.top;
      } else {
        that.offset.left = that.element.offset().left;
        that.offset.top = that.element.offset().top;
      }
      woset = Math.abs(
        that.sizeDiff.width +
          (that._helper
            ? that.offset.left - cop.left
            : that.offset.left - co.left)
      );
      hoset = Math.abs(
        that.sizeDiff.height +
          (that._helper ? that.offset.top - cop.top : that.offset.top - co.top)
      );
      if (woset + that.size.width >= that.parentData.width) {
        that.size.width = that.parentData.width - woset;
        if (pRatio) {
          that.size.height = that.size.width / that.aspectRatio;
          continueResize = false;
        }
      }
      if (hoset + that.size.height >= that.parentData.height) {
        that.size.height = that.parentData.height - hoset;
        if (pRatio) {
          that.size.width = that.size.height * that.aspectRatio;
          continueResize = false;
        }
      }
      if (!continueResize) {
        that.position.left = that.prevPosition.left;
        that.position.top = that.prevPosition.top;
        that.size.width = that.prevSize.width;
        that.size.height = that.prevSize.height;
      }
    },
    stop: function() {
      var that = $(this).resizable("instance"),
        o = that.options,
        co = that.containerOffset,
        cop = that.containerPosition,
        ce = that.containerElement,
        helper = $(that.helper),
        ho = helper.offset(),
        w = helper.outerWidth() - that.sizeDiff.width,
        h = helper.outerHeight() - that.sizeDiff.height;
      if (that._helper && !o.animate && /relative/.test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
      if (that._helper && !o.animate && /static/.test(ce.css("position"))) {
        $(this).css({
          left: ho.left - cop.left - co.left,
          width: w,
          height: h
        });
      }
    }
  });
  $.ui.plugin.add("resizable", "alsoResize", {
    start: function() {
      var that = $(this).resizable("instance"),
        o = that.options;
      $(o.alsoResize).each(function() {
        var el = $(this);
        el.data("ui-resizable-alsoresize", {
          width: parseInt(el.width(), 10),
          height: parseInt(el.height(), 10),
          left: parseInt(el.css("left"), 10),
          top: parseInt(el.css("top"), 10)
        });
      });
    },
    resize: function(event, ui) {
      var that = $(this).resizable("instance"),
        o = that.options,
        os = that.originalSize,
        op = that.originalPosition,
        delta = {
          height: that.size.height - os.height || 0,
          width: that.size.width - os.width || 0,
          top: that.position.top - op.top || 0,
          left: that.position.left - op.left || 0
        };
      $(o.alsoResize).each(function() {
        var el = $(this),
          start = $(this).data("ui-resizable-alsoresize"),
          style = {},
          css = el.parents(ui.originalElement[0]).length
            ? ["width", "height"]
            : ["width", "height", "top", "left"];
        $.each(css, function(i, prop) {
          var sum = (start[prop] || 0) + (delta[prop] || 0);
          if (sum && sum >= 0) {
            style[prop] = sum || null;
          }
        });
        el.css(style);
      });
    },
    stop: function() {
      $(this).removeData("resizable-alsoresize");
    }
  });
  $.ui.plugin.add("resizable", "ghost", {
    start: function() {
      var that = $(this).resizable("instance"),
        o = that.options,
        cs = that.size;
      that.ghost = that.originalElement.clone();
      that.ghost
        .css({
          opacity: 0.25,
          display: "block",
          position: "relative",
          height: cs.height,
          width: cs.width,
          margin: 0,
          left: 0,
          top: 0
        })
        .addClass("ui-resizable-ghost")
        .addClass(typeof o.ghost === "string" ? o.ghost : "");
      that.ghost.appendTo(that.helper);
    },
    resize: function() {
      var that = $(this).resizable("instance");
      if (that.ghost) {
        that.ghost.css({
          position: "relative",
          height: that.size.height,
          width: that.size.width
        });
      }
    },
    stop: function() {
      var that = $(this).resizable("instance");
      if (that.ghost && that.helper) {
        that.helper.get(0).removeChild(that.ghost.get(0));
      }
    }
  });
  $.ui.plugin.add("resizable", "grid", {
    resize: function() {
      var outerDimensions,
        that = $(this).resizable("instance"),
        o = that.options,
        cs = that.size,
        os = that.originalSize,
        op = that.originalPosition,
        a = that.axis,
        grid = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,
        gridX = grid[0] || 1,
        gridY = grid[1] || 1,
        ox = Math.round((cs.width - os.width) / gridX) * gridX,
        oy = Math.round((cs.height - os.height) / gridY) * gridY,
        newWidth = os.width + ox,
        newHeight = os.height + oy,
        isMaxWidth = o.maxWidth && o.maxWidth < newWidth,
        isMaxHeight = o.maxHeight && o.maxHeight < newHeight,
        isMinWidth = o.minWidth && o.minWidth > newWidth,
        isMinHeight = o.minHeight && o.minHeight > newHeight;
      o.grid = grid;
      if (isMinWidth) {
        newWidth += gridX;
      }
      if (isMinHeight) {
        newHeight += gridY;
      }
      if (isMaxWidth) {
        newWidth -= gridX;
      }
      if (isMaxHeight) {
        newHeight -= gridY;
      }
      if (/^(se|s|e)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
      } else if (/^(ne)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.top = op.top - oy;
      } else if (/^(sw)$/.test(a)) {
        that.size.width = newWidth;
        that.size.height = newHeight;
        that.position.left = op.left - ox;
      } else {
        if (newHeight - gridY <= 0 || newWidth - gridX <= 0) {
          outerDimensions = that._getPaddingPlusBorderDimensions(this);
        }
        if (newHeight - gridY > 0) {
          that.size.height = newHeight;
          that.position.top = op.top - oy;
        } else {
          newHeight = gridY - outerDimensions.height;
          that.size.height = newHeight;
          that.position.top = op.top + os.height - newHeight;
        }
        if (newWidth - gridX > 0) {
          that.size.width = newWidth;
          that.position.left = op.left - ox;
        } else {
          newWidth = gridX - outerDimensions.width;
          that.size.width = newWidth;
          that.position.left = op.left + os.width - newWidth;
        }
      }
    }
  });
  var resizable = $.ui.resizable;
  var selectable = $.widget("ui.selectable", $.ui.mouse, {
    version: "1.11.4",
    options: {
      appendTo: "body",
      autoRefresh: true,
      distance: 0,
      filter: "*",
      tolerance: "touch",
      selected: null,
      selecting: null,
      start: null,
      stop: null,
      unselected: null,
      unselecting: null
    },
    _create: function() {
      var selectees,
        that = this;
      this.element.addClass("ui-selectable");
      this.dragged = false;
      this.refresh = function() {
        selectees = $(that.options.filter, that.element[0]);
        selectees.addClass("ui-selectee");
        selectees.each(function() {
          var $this = $(this),
            pos = $this.offset();
          $.data(this, "selectable-item", {
            element: this,
            $element: $this,
            left: pos.left,
            top: pos.top,
            right: pos.left + $this.outerWidth(),
            bottom: pos.top + $this.outerHeight(),
            startselected: false,
            selected: $this.hasClass("ui-selected"),
            selecting: $this.hasClass("ui-selecting"),
            unselecting: $this.hasClass("ui-unselecting")
          });
        });
      };
      this.refresh();
      this.selectees = selectees.addClass("ui-selectee");
      this._mouseInit();
      this.helper = $("<div class='ui-selectable-helper'></div>");
    },
    _destroy: function() {
      this.selectees.removeClass("ui-selectee").removeData("selectable-item");
      this.element.removeClass("ui-selectable ui-selectable-disabled");
      this._mouseDestroy();
    },
    _mouseStart: function(event) {
      var that = this,
        options = this.options;
      this.opos = [event.pageX, event.pageY];
      if (this.options.disabled) {
        return;
      }
      this.selectees = $(options.filter, this.element[0]);
      this._trigger("start", event);
      $(options.appendTo).append(this.helper);
      this.helper.css({
        left: event.pageX,
        top: event.pageY,
        width: 0,
        height: 0
      });
      if (options.autoRefresh) {
        this.refresh();
      }
      this.selectees.filter(".ui-selected").each(function() {
        var selectee = $.data(this, "selectable-item");
        selectee.startselected = true;
        if (!event.metaKey && !event.ctrlKey) {
          selectee.$element.removeClass("ui-selected");
          selectee.selected = false;
          selectee.$element.addClass("ui-unselecting");
          selectee.unselecting = true;
          that._trigger("unselecting", event, {
            unselecting: selectee.element
          });
        }
      });
      $(event.target)
        .parents()
        .addBack()
        .each(function() {
          var doSelect,
            selectee = $.data(this, "selectable-item");
          if (selectee) {
            doSelect =
              (!event.metaKey && !event.ctrlKey) ||
              !selectee.$element.hasClass("ui-selected");
            selectee.$element
              .removeClass(doSelect ? "ui-unselecting" : "ui-selected")
              .addClass(doSelect ? "ui-selecting" : "ui-unselecting");
            selectee.unselecting = !doSelect;
            selectee.selecting = doSelect;
            selectee.selected = doSelect;
            if (doSelect) {
              that._trigger("selecting", event, {
                selecting: selectee.element
              });
            } else {
              that._trigger("unselecting", event, {
                unselecting: selectee.element
              });
            }
            return false;
          }
        });
    },
    _mouseDrag: function(event) {
      this.dragged = true;
      if (this.options.disabled) {
        return;
      }
      var tmp,
        that = this,
        options = this.options,
        x1 = this.opos[0],
        y1 = this.opos[1],
        x2 = event.pageX,
        y2 = event.pageY;
      if (x1 > x2) {
        tmp = x2;
        x2 = x1;
        x1 = tmp;
      }
      if (y1 > y2) {
        tmp = y2;
        y2 = y1;
        y1 = tmp;
      }
      this.helper.css({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });
      this.selectees.each(function() {
        var selectee = $.data(this, "selectable-item"),
          hit = false;
        if (!selectee || selectee.element === that.element[0]) {
          return;
        }
        if (options.tolerance === "touch") {
          hit = !(
            selectee.left > x2 ||
            selectee.right < x1 ||
            selectee.top > y2 ||
            selectee.bottom < y1
          );
        } else if (options.tolerance === "fit") {
          hit =
            selectee.left > x1 &&
            selectee.right < x2 &&
            selectee.top > y1 &&
            selectee.bottom < y2;
        }
        if (hit) {
          if (selectee.selected) {
            selectee.$element.removeClass("ui-selected");
            selectee.selected = false;
          }
          if (selectee.unselecting) {
            selectee.$element.removeClass("ui-unselecting");
            selectee.unselecting = false;
          }
          if (!selectee.selecting) {
            selectee.$element.addClass("ui-selecting");
            selectee.selecting = true;
            that._trigger("selecting", event, { selecting: selectee.element });
          }
        } else {
          if (selectee.selecting) {
            if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
              selectee.$element.removeClass("ui-selecting");
              selectee.selecting = false;
              selectee.$element.addClass("ui-selected");
              selectee.selected = true;
            } else {
              selectee.$element.removeClass("ui-selecting");
              selectee.selecting = false;
              if (selectee.startselected) {
                selectee.$element.addClass("ui-unselecting");
                selectee.unselecting = true;
              }
              that._trigger("unselecting", event, {
                unselecting: selectee.element
              });
            }
          }
          if (selectee.selected) {
            if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
              selectee.$element.removeClass("ui-selected");
              selectee.selected = false;
              selectee.$element.addClass("ui-unselecting");
              selectee.unselecting = true;
              that._trigger("unselecting", event, {
                unselecting: selectee.element
              });
            }
          }
        }
      });
      return false;
    },
    _mouseStop: function(event) {
      var that = this;
      this.dragged = false;
      $(".ui-unselecting", this.element[0]).each(function() {
        var selectee = $.data(this, "selectable-item");
        selectee.$element.removeClass("ui-unselecting");
        selectee.unselecting = false;
        selectee.startselected = false;
        that._trigger("unselected", event, { unselected: selectee.element });
      });
      $(".ui-selecting", this.element[0]).each(function() {
        var selectee = $.data(this, "selectable-item");
        selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
        selectee.selecting = false;
        selectee.selected = true;
        selectee.startselected = true;
        that._trigger("selected", event, { selected: selectee.element });
      });
      this._trigger("stop", event);
      this.helper.remove();
      return false;
    }
  });
  var sortable = $.widget("ui.sortable", $.ui.mouse, {
    version: "1.11.4",
    widgetEventPrefix: "sort",
    ready: false,
    options: {
      appendTo: "parent",
      axis: false,
      connectWith: false,
      containment: false,
      cursor: "auto",
      cursorAt: false,
      dropOnEmpty: true,
      forcePlaceholderSize: false,
      forceHelperSize: false,
      grid: false,
      handle: false,
      helper: "original",
      items: "> *",
      opacity: false,
      placeholder: false,
      revert: false,
      scroll: true,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1000,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },
    _isOverAxis: function(x, reference, size) {
      return x >= reference && x < reference + size;
    },
    _isFloating: function(item) {
      return (
        /left|right/.test(item.css("float")) ||
        /inline|table-cell/.test(item.css("display"))
      );
    },
    _create: function() {
      this.containerCache = {};
      this.element.addClass("ui-sortable");
      this.refresh();
      this.offset = this.element.offset();
      this._mouseInit();
      this._setHandleClassName();
      this.ready = true;
    },
    _setOption: function(key, value) {
      this._super(key, value);
      if (key === "handle") {
        this._setHandleClassName();
      }
    },
    _setHandleClassName: function() {
      this.element
        .find(".ui-sortable-handle")
        .removeClass("ui-sortable-handle");
      $.each(this.items, function() {
        (this.instance.options.handle
          ? this.item.find(this.instance.options.handle)
          : this.item
        ).addClass("ui-sortable-handle");
      });
    },
    _destroy: function() {
      this.element
        .removeClass("ui-sortable ui-sortable-disabled")
        .find(".ui-sortable-handle")
        .removeClass("ui-sortable-handle");
      this._mouseDestroy();
      for (var i = this.items.length - 1; i >= 0; i--) {
        this.items[i].item.removeData(this.widgetName + "-item");
      }
      return this;
    },
    _mouseCapture: function(event, overrideHandle) {
      var currentItem = null,
        validHandle = false,
        that = this;
      if (this.reverting) {
        return false;
      }
      if (this.options.disabled || this.options.type === "static") {
        return false;
      }
      this._refreshItems(event);
      $(event.target)
        .parents()
        .each(function() {
          if ($.data(this, that.widgetName + "-item") === that) {
            currentItem = $(this);
            return false;
          }
        });
      if ($.data(event.target, that.widgetName + "-item") === that) {
        currentItem = $(event.target);
      }
      if (!currentItem) {
        return false;
      }
      if (this.options.handle && !overrideHandle) {
        $(this.options.handle, currentItem)
          .find("*")
          .addBack()
          .each(function() {
            if (this === event.target) {
              validHandle = true;
            }
          });
        if (!validHandle) {
          return false;
        }
      }
      this.currentItem = currentItem;
      this._removeCurrentsFromItems();
      return true;
    },
    _mouseStart: function(event, overrideHandle, noActivation) {
      var i,
        body,
        o = this.options;
      this.currentContainer = this;
      this.refreshPositions();
      this.helper = this._createHelper(event);
      this._cacheHelperProportions();
      this._cacheMargins();
      this.scrollParent = this.helper.scrollParent();
      this.offset = this.currentItem.offset();
      this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      };
      $.extend(this.offset, {
        click: {
          left: event.pageX - this.offset.left,
          top: event.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      });
      this.helper.css("position", "absolute");
      this.cssPosition = this.helper.css("position");
      this.originalPosition = this._generatePosition(event);
      this.originalPageX = event.pageX;
      this.originalPageY = event.pageY;
      o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);
      this.domPosition = {
        prev: this.currentItem.prev()[0],
        parent: this.currentItem.parent()[0]
      };
      if (this.helper[0] !== this.currentItem[0]) {
        this.currentItem.hide();
      }
      this._createPlaceholder();
      if (o.containment) {
        this._setContainment();
      }
      if (o.cursor && o.cursor !== "auto") {
        body = this.document.find("body");
        this.storedCursor = body.css("cursor");
        body.css("cursor", o.cursor);
        this.storedStylesheet = $(
          "<style>*{ cursor: " + o.cursor + " !important; }</style>"
        ).appendTo(body);
      }
      if (o.opacity) {
        if (this.helper.css("opacity")) {
          this._storedOpacity = this.helper.css("opacity");
        }
        this.helper.css("opacity", o.opacity);
      }
      if (o.zIndex) {
        if (this.helper.css("zIndex")) {
          this._storedZIndex = this.helper.css("zIndex");
        }
        this.helper.css("zIndex", o.zIndex);
      }
      if (
        this.scrollParent[0] !== this.document[0] &&
        this.scrollParent[0].tagName !== "HTML"
      ) {
        this.overflowOffset = this.scrollParent.offset();
      }
      this._trigger("start", event, this._uiHash());
      if (!this._preserveHelperProportions) {
        this._cacheHelperProportions();
      }
      if (!noActivation) {
        for (i = this.containers.length - 1; i >= 0; i--) {
          this.containers[i]._trigger("activate", event, this._uiHash(this));
        }
      }
      if ($.ui.ddmanager) {
        $.ui.ddmanager.current = this;
      }
      if ($.ui.ddmanager && !o.dropBehaviour) {
        $.ui.ddmanager.prepareOffsets(this, event);
      }
      this.dragging = true;
      this.helper.addClass("ui-sortable-helper");
      this._mouseDrag(event);
      return true;
    },
    _mouseDrag: function(event) {
      var i,
        item,
        itemElement,
        intersection,
        o = this.options,
        scrolled = false;
      this.position = this._generatePosition(event);
      this.positionAbs = this._convertPositionTo("absolute");
      if (!this.lastPositionAbs) {
        this.lastPositionAbs = this.positionAbs;
      }
      if (this.options.scroll) {
        if (
          this.scrollParent[0] !== this.document[0] &&
          this.scrollParent[0].tagName !== "HTML"
        ) {
          if (
            this.overflowOffset.top +
              this.scrollParent[0].offsetHeight -
              event.pageY <
            o.scrollSensitivity
          ) {
            this.scrollParent[0].scrollTop = scrolled =
              this.scrollParent[0].scrollTop + o.scrollSpeed;
          } else if (
            event.pageY - this.overflowOffset.top <
            o.scrollSensitivity
          ) {
            this.scrollParent[0].scrollTop = scrolled =
              this.scrollParent[0].scrollTop - o.scrollSpeed;
          }
          if (
            this.overflowOffset.left +
              this.scrollParent[0].offsetWidth -
              event.pageX <
            o.scrollSensitivity
          ) {
            this.scrollParent[0].scrollLeft = scrolled =
              this.scrollParent[0].scrollLeft + o.scrollSpeed;
          } else if (
            event.pageX - this.overflowOffset.left <
            o.scrollSensitivity
          ) {
            this.scrollParent[0].scrollLeft = scrolled =
              this.scrollParent[0].scrollLeft - o.scrollSpeed;
          }
        } else {
          if (event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
            scrolled = this.document.scrollTop(
              this.document.scrollTop() - o.scrollSpeed
            );
          } else if (
            this.window.height() - (event.pageY - this.document.scrollTop()) <
            o.scrollSensitivity
          ) {
            scrolled = this.document.scrollTop(
              this.document.scrollTop() + o.scrollSpeed
            );
          }
          if (event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
            scrolled = this.document.scrollLeft(
              this.document.scrollLeft() - o.scrollSpeed
            );
          } else if (
            this.window.width() - (event.pageX - this.document.scrollLeft()) <
            o.scrollSensitivity
          ) {
            scrolled = this.document.scrollLeft(
              this.document.scrollLeft() + o.scrollSpeed
            );
          }
        }
        if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(this, event);
        }
      }
      this.positionAbs = this._convertPositionTo("absolute");
      if (!this.options.axis || this.options.axis !== "y") {
        this.helper[0].style.left = this.position.left + "px";
      }
      if (!this.options.axis || this.options.axis !== "x") {
        this.helper[0].style.top = this.position.top + "px";
      }
      for (i = this.items.length - 1; i >= 0; i--) {
        item = this.items[i];
        itemElement = item.item[0];
        intersection = this._intersectsWithPointer(item);
        if (!intersection) {
          continue;
        }
        if (item.instance !== this.currentContainer) {
          continue;
        }
        if (
          itemElement !== this.currentItem[0] &&
          this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !==
            itemElement &&
          !$.contains(this.placeholder[0], itemElement) &&
          (this.options.type === "semi-dynamic"
            ? !$.contains(this.element[0], itemElement)
            : true)
        ) {
          this.direction = intersection === 1 ? "down" : "up";
          if (
            this.options.tolerance === "pointer" ||
            this._intersectsWithSides(item)
          ) {
            this._rearrange(event, item);
          } else {
            break;
          }
          this._trigger("change", event, this._uiHash());
          break;
        }
      }
      this._contactContainers(event);
      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      }
      this._trigger("sort", event, this._uiHash());
      this.lastPositionAbs = this.positionAbs;
      return false;
    },
    _mouseStop: function(event, noPropagation) {
      if (!event) {
        return;
      }
      if ($.ui.ddmanager && !this.options.dropBehaviour) {
        $.ui.ddmanager.drop(this, event);
      }
      if (this.options.revert) {
        var that = this,
          cur = this.placeholder.offset(),
          axis = this.options.axis,
          animation = {};
        if (!axis || axis === "x") {
          animation.left =
            cur.left -
            this.offset.parent.left -
            this.margins.left +
            (this.offsetParent[0] === this.document[0].body
              ? 0
              : this.offsetParent[0].scrollLeft);
        }
        if (!axis || axis === "y") {
          animation.top =
            cur.top -
            this.offset.parent.top -
            this.margins.top +
            (this.offsetParent[0] === this.document[0].body
              ? 0
              : this.offsetParent[0].scrollTop);
        }
        this.reverting = true;
        $(this.helper).animate(
          animation,
          parseInt(this.options.revert, 10) || 500,
          function() {
            that._clear(event);
          }
        );
      } else {
        this._clear(event, noPropagation);
      }
      return false;
    },
    cancel: function() {
      if (this.dragging) {
        this._mouseUp({ target: null });
        if (this.options.helper === "original") {
          this.currentItem
            .css(this._storedCSS)
            .removeClass("ui-sortable-helper");
        } else {
          this.currentItem.show();
        }
        for (var i = this.containers.length - 1; i >= 0; i--) {
          this.containers[i]._trigger("deactivate", null, this._uiHash(this));
          if (this.containers[i].containerCache.over) {
            this.containers[i]._trigger("out", null, this._uiHash(this));
            this.containers[i].containerCache.over = 0;
          }
        }
      }
      if (this.placeholder) {
        if (this.placeholder[0].parentNode) {
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
        }
        if (
          this.options.helper !== "original" &&
          this.helper &&
          this.helper[0].parentNode
        ) {
          this.helper.remove();
        }
        $.extend(this, {
          helper: null,
          dragging: false,
          reverting: false,
          _noFinalSort: null
        });
        if (this.domPosition.prev) {
          $(this.domPosition.prev).after(this.currentItem);
        } else {
          $(this.domPosition.parent).prepend(this.currentItem);
        }
      }
      return this;
    },
    serialize: function(o) {
      var items = this._getItemsAsjQuery(o && o.connected),
        str = [];
      o = o || {};
      $(items).each(function() {
        var res = ($(o.item || this).attr(o.attribute || "id") || "").match(
          o.expression || /(.+)[\-=_](.+)/
        );
        if (res) {
          str.push(
            (o.key || res[1] + "[]") +
              "=" +
              (o.key && o.expression ? res[1] : res[2])
          );
        }
      });
      if (!str.length && o.key) {
        str.push(o.key + "=");
      }
      return str.join("&");
    },
    toArray: function(o) {
      var items = this._getItemsAsjQuery(o && o.connected),
        ret = [];
      o = o || {};
      items.each(function() {
        ret.push($(o.item || this).attr(o.attribute || "id") || "");
      });
      return ret;
    },
    _intersectsWith: function(item) {
      var x1 = this.positionAbs.left,
        x2 = x1 + this.helperProportions.width,
        y1 = this.positionAbs.top,
        y2 = y1 + this.helperProportions.height,
        l = item.left,
        r = l + item.width,
        t = item.top,
        b = t + item.height,
        dyClick = this.offset.click.top,
        dxClick = this.offset.click.left,
        isOverElementHeight =
          this.options.axis === "x" || (y1 + dyClick > t && y1 + dyClick < b),
        isOverElementWidth =
          this.options.axis === "y" || (x1 + dxClick > l && x1 + dxClick < r),
        isOverElement = isOverElementHeight && isOverElementWidth;
      if (
        this.options.tolerance === "pointer" ||
        this.options.forcePointerForContainers ||
        (this.options.tolerance !== "pointer" &&
          this.helperProportions[this.floating ? "width" : "height"] >
            item[this.floating ? "width" : "height"])
      ) {
        return isOverElement;
      } else {
        return (
          l < x1 + this.helperProportions.width / 2 &&
          x2 - this.helperProportions.width / 2 < r &&
          t < y1 + this.helperProportions.height / 2 &&
          y2 - this.helperProportions.height / 2 < b
        );
      }
    },
    _intersectsWithPointer: function(item) {
      var isOverElementHeight =
          this.options.axis === "x" ||
          this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            item.top,
            item.height
          ),
        isOverElementWidth =
          this.options.axis === "y" ||
          this._isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            item.left,
            item.width
          ),
        isOverElement = isOverElementHeight && isOverElementWidth,
        verticalDirection = this._getDragVerticalDirection(),
        horizontalDirection = this._getDragHorizontalDirection();
      if (!isOverElement) {
        return false;
      }
      return this.floating
        ? (horizontalDirection && horizontalDirection === "right") ||
          verticalDirection === "down"
          ? 2
          : 1
        : verticalDirection && (verticalDirection === "down" ? 2 : 1);
    },
    _intersectsWithSides: function(item) {
      var isOverBottomHalf = this._isOverAxis(
          this.positionAbs.top + this.offset.click.top,
          item.top + item.height / 2,
          item.height
        ),
        isOverRightHalf = this._isOverAxis(
          this.positionAbs.left + this.offset.click.left,
          item.left + item.width / 2,
          item.width
        ),
        verticalDirection = this._getDragVerticalDirection(),
        horizontalDirection = this._getDragHorizontalDirection();
      if (this.floating && horizontalDirection) {
        return (
          (horizontalDirection === "right" && isOverRightHalf) ||
          (horizontalDirection === "left" && !isOverRightHalf)
        );
      } else {
        return (
          verticalDirection &&
          ((verticalDirection === "down" && isOverBottomHalf) ||
            (verticalDirection === "up" && !isOverBottomHalf))
        );
      }
    },
    _getDragVerticalDirection: function() {
      var delta = this.positionAbs.top - this.lastPositionAbs.top;
      return delta !== 0 && (delta > 0 ? "down" : "up");
    },
    _getDragHorizontalDirection: function() {
      var delta = this.positionAbs.left - this.lastPositionAbs.left;
      return delta !== 0 && (delta > 0 ? "right" : "left");
    },
    refresh: function(event) {
      this._refreshItems(event);
      this._setHandleClassName();
      this.refreshPositions();
      return this;
    },
    _connectWith: function() {
      var options = this.options;
      return options.connectWith.constructor === String
        ? [options.connectWith]
        : options.connectWith;
    },
    _getItemsAsjQuery: function(connected) {
      var i,
        j,
        cur,
        inst,
        items = [],
        queries = [],
        connectWith = this._connectWith();
      if (connectWith && connected) {
        for (i = connectWith.length - 1; i >= 0; i--) {
          cur = $(connectWith[i], this.document[0]);
          for (j = cur.length - 1; j >= 0; j--) {
            inst = $.data(cur[j], this.widgetFullName);
            if (inst && inst !== this && !inst.options.disabled) {
              queries.push([
                $.isFunction(inst.options.items)
                  ? inst.options.items.call(inst.element)
                  : $(inst.options.items, inst.element)
                      .not(".ui-sortable-helper")
                      .not(".ui-sortable-placeholder"),
                inst
              ]);
            }
          }
        }
      }
      queries.push([
        $.isFunction(this.options.items)
          ? this.options.items.call(this.element, null, {
              options: this.options,
              item: this.currentItem
            })
          : $(this.options.items, this.element)
              .not(".ui-sortable-helper")
              .not(".ui-sortable-placeholder"),
        this
      ]);
      function addItems() {
        items.push(this);
      }
      for (i = queries.length - 1; i >= 0; i--) {
        queries[i][0].each(addItems);
      }
      return $(items);
    },
    _removeCurrentsFromItems: function() {
      var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = $.grep(this.items, function(item) {
        for (var j = 0; j < list.length; j++) {
          if (list[j] === item.item[0]) {
            return false;
          }
        }
        return true;
      });
    },
    _refreshItems: function(event) {
      this.items = [];
      this.containers = [this];
      var i,
        j,
        cur,
        inst,
        targetData,
        _queries,
        item,
        queriesLength,
        items = this.items,
        queries = [
          [
            $.isFunction(this.options.items)
              ? this.options.items.call(this.element[0], event, {
                  item: this.currentItem
                })
              : $(this.options.items, this.element),
            this
          ]
        ],
        connectWith = this._connectWith();
      if (connectWith && this.ready) {
        for (i = connectWith.length - 1; i >= 0; i--) {
          cur = $(connectWith[i], this.document[0]);
          for (j = cur.length - 1; j >= 0; j--) {
            inst = $.data(cur[j], this.widgetFullName);
            if (inst && inst !== this && !inst.options.disabled) {
              queries.push([
                $.isFunction(inst.options.items)
                  ? inst.options.items.call(inst.element[0], event, {
                      item: this.currentItem
                    })
                  : $(inst.options.items, inst.element),
                inst
              ]);
              this.containers.push(inst);
            }
          }
        }
      }
      for (i = queries.length - 1; i >= 0; i--) {
        targetData = queries[i][1];
        _queries = queries[i][0];
        for (j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
          item = $(_queries[j]);
          item.data(this.widgetName + "-item", targetData);
          items.push({
            item: item,
            instance: targetData,
            width: 0,
            height: 0,
            left: 0,
            top: 0
          });
        }
      }
    },
    refreshPositions: function(fast) {
      this.floating = this.items.length
        ? this.options.axis === "x" || this._isFloating(this.items[0].item)
        : false;
      if (this.offsetParent && this.helper) {
        this.offset.parent = this._getParentOffset();
      }
      var i, item, t, p;
      for (i = this.items.length - 1; i >= 0; i--) {
        item = this.items[i];
        if (
          item.instance !== this.currentContainer &&
          this.currentContainer &&
          item.item[0] !== this.currentItem[0]
        ) {
          continue;
        }
        t = this.options.toleranceElement
          ? $(this.options.toleranceElement, item.item)
          : item.item;
        if (!fast) {
          item.width = t.outerWidth();
          item.height = t.outerHeight();
        }
        p = t.offset();
        item.left = p.left;
        item.top = p.top;
      }
      if (this.options.custom && this.options.custom.refreshContainers) {
        this.options.custom.refreshContainers.call(this);
      } else {
        for (i = this.containers.length - 1; i >= 0; i--) {
          p = this.containers[i].element.offset();
          this.containers[i].containerCache.left = p.left;
          this.containers[i].containerCache.top = p.top;
          this.containers[i].containerCache.width = this.containers[
            i
          ].element.outerWidth();
          this.containers[i].containerCache.height = this.containers[
            i
          ].element.outerHeight();
        }
      }
      return this;
    },
    _createPlaceholder: function(that) {
      that = that || this;
      var className,
        o = that.options;
      if (!o.placeholder || o.placeholder.constructor === String) {
        className = o.placeholder;
        o.placeholder = {
          element: function() {
            var nodeName = that.currentItem[0].nodeName.toLowerCase(),
              element = $("<" + nodeName + ">", that.document[0])
                .addClass(
                  className ||
                    that.currentItem[0].className + " ui-sortable-placeholder"
                )
                .removeClass("ui-sortable-helper");
            if (nodeName === "tbody") {
              that._createTrPlaceholder(
                that.currentItem.find("tr").eq(0),
                $("<tr>", that.document[0]).appendTo(element)
              );
            } else if (nodeName === "tr") {
              that._createTrPlaceholder(that.currentItem, element);
            } else if (nodeName === "img") {
              element.attr("src", that.currentItem.attr("src"));
            }
            if (!className) {
              element.css("visibility", "hidden");
            }
            return element;
          },
          update: function(container, p) {
            if (className && !o.forcePlaceholderSize) {
              return;
            }
            if (!p.height()) {
              p.height(
                that.currentItem.innerHeight() -
                  parseInt(that.currentItem.css("paddingTop") || 0, 10) -
                  parseInt(that.currentItem.css("paddingBottom") || 0, 10)
              );
            }
            if (!p.width()) {
              p.width(
                that.currentItem.innerWidth() -
                  parseInt(that.currentItem.css("paddingLeft") || 0, 10) -
                  parseInt(that.currentItem.css("paddingRight") || 0, 10)
              );
            }
          }
        };
      }
      that.placeholder = $(
        o.placeholder.element.call(that.element, that.currentItem)
      );
      that.currentItem.after(that.placeholder);
      o.placeholder.update(that, that.placeholder);
    },
    _createTrPlaceholder: function(sourceTr, targetTr) {
      var that = this;
      sourceTr.children().each(function() {
        $("<td>&#160;</td>", that.document[0])
          .attr("colspan", $(this).attr("colspan") || 1)
          .appendTo(targetTr);
      });
    },
    _contactContainers: function(event) {
      var i,
        j,
        dist,
        itemWithLeastDistance,
        posProperty,
        sizeProperty,
        cur,
        nearBottom,
        floating,
        axis,
        innermostContainer = null,
        innermostIndex = null;
      for (i = this.containers.length - 1; i >= 0; i--) {
        if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
          continue;
        }
        if (this._intersectsWith(this.containers[i].containerCache)) {
          if (
            innermostContainer &&
            $.contains(
              this.containers[i].element[0],
              innermostContainer.element[0]
            )
          ) {
            continue;
          }
          innermostContainer = this.containers[i];
          innermostIndex = i;
        } else {
          if (this.containers[i].containerCache.over) {
            this.containers[i]._trigger("out", event, this._uiHash(this));
            this.containers[i].containerCache.over = 0;
          }
        }
      }
      if (!innermostContainer) {
        return;
      }
      if (this.containers.length === 1) {
        if (!this.containers[innermostIndex].containerCache.over) {
          this.containers[innermostIndex]._trigger(
            "over",
            event,
            this._uiHash(this)
          );
          this.containers[innermostIndex].containerCache.over = 1;
        }
      } else {
        dist = 10000;
        itemWithLeastDistance = null;
        floating =
          innermostContainer.floating || this._isFloating(this.currentItem);
        posProperty = floating ? "left" : "top";
        sizeProperty = floating ? "width" : "height";
        axis = floating ? "clientX" : "clientY";
        for (j = this.items.length - 1; j >= 0; j--) {
          if (
            !$.contains(
              this.containers[innermostIndex].element[0],
              this.items[j].item[0]
            )
          ) {
            continue;
          }
          if (this.items[j].item[0] === this.currentItem[0]) {
            continue;
          }
          cur = this.items[j].item.offset()[posProperty];
          nearBottom = false;
          if (event[axis] - cur > this.items[j][sizeProperty] / 2) {
            nearBottom = true;
          }
          if (Math.abs(event[axis] - cur) < dist) {
            dist = Math.abs(event[axis] - cur);
            itemWithLeastDistance = this.items[j];
            this.direction = nearBottom ? "up" : "down";
          }
        }
        if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
          return;
        }
        if (this.currentContainer === this.containers[innermostIndex]) {
          if (!this.currentContainer.containerCache.over) {
            this.containers[innermostIndex]._trigger(
              "over",
              event,
              this._uiHash()
            );
            this.currentContainer.containerCache.over = 1;
          }
          return;
        }
        itemWithLeastDistance
          ? this._rearrange(event, itemWithLeastDistance, null, true)
          : this._rearrange(
              event,
              null,
              this.containers[innermostIndex].element,
              true
            );
        this._trigger("change", event, this._uiHash());
        this.containers[innermostIndex]._trigger(
          "change",
          event,
          this._uiHash(this)
        );
        this.currentContainer = this.containers[innermostIndex];
        this.options.placeholder.update(
          this.currentContainer,
          this.placeholder
        );
        this.containers[innermostIndex]._trigger(
          "over",
          event,
          this._uiHash(this)
        );
        this.containers[innermostIndex].containerCache.over = 1;
      }
    },
    _createHelper: function(event) {
      var o = this.options,
        helper = $.isFunction(o.helper)
          ? $(o.helper.apply(this.element[0], [event, this.currentItem]))
          : o.helper === "clone"
          ? this.currentItem.clone()
          : this.currentItem;
      if (!helper.parents("body").length) {
        $(
          o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode
        )[0].appendChild(helper[0]);
      }
      if (helper[0] === this.currentItem[0]) {
        this._storedCSS = {
          width: this.currentItem[0].style.width,
          height: this.currentItem[0].style.height,
          position: this.currentItem.css("position"),
          top: this.currentItem.css("top"),
          left: this.currentItem.css("left")
        };
      }
      if (!helper[0].style.width || o.forceHelperSize) {
        helper.width(this.currentItem.width());
      }
      if (!helper[0].style.height || o.forceHelperSize) {
        helper.height(this.currentItem.height());
      }
      return helper;
    },
    _adjustOffsetFromHelper: function(obj) {
      if (typeof obj === "string") {
        obj = obj.split(" ");
      }
      if ($.isArray(obj)) {
        obj = { left: +obj[0], top: +obj[1] || 0 };
      }
      if ("left" in obj) {
        this.offset.click.left = obj.left + this.margins.left;
      }
      if ("right" in obj) {
        this.offset.click.left =
          this.helperProportions.width - obj.right + this.margins.left;
      }
      if ("top" in obj) {
        this.offset.click.top = obj.top + this.margins.top;
      }
      if ("bottom" in obj) {
        this.offset.click.top =
          this.helperProportions.height - obj.bottom + this.margins.top;
      }
    },
    _getParentOffset: function() {
      this.offsetParent = this.helper.offsetParent();
      var po = this.offsetParent.offset();
      if (
        this.cssPosition === "absolute" &&
        this.scrollParent[0] !== this.document[0] &&
        $.contains(this.scrollParent[0], this.offsetParent[0])
      ) {
        po.left += this.scrollParent.scrollLeft();
        po.top += this.scrollParent.scrollTop();
      }
      if (
        this.offsetParent[0] === this.document[0].body ||
        (this.offsetParent[0].tagName &&
          this.offsetParent[0].tagName.toLowerCase() === "html" &&
          $.ui.ie)
      ) {
        po = { top: 0, left: 0 };
      }
      return {
        top:
          po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left:
          po.left +
          (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      };
    },
    _getRelativeOffset: function() {
      if (this.cssPosition === "relative") {
        var p = this.currentItem.position();
        return {
          top:
            p.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            this.scrollParent.scrollTop(),
          left:
            p.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            this.scrollParent.scrollLeft()
        };
      } else {
        return { top: 0, left: 0 };
      }
    },
    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
      };
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      };
    },
    _setContainment: function() {
      var ce,
        co,
        over,
        o = this.options;
      if (o.containment === "parent") {
        o.containment = this.helper[0].parentNode;
      }
      if (o.containment === "document" || o.containment === "window") {
        this.containment = [
          0 - this.offset.relative.left - this.offset.parent.left,
          0 - this.offset.relative.top - this.offset.parent.top,
          o.containment === "document"
            ? this.document.width()
            : this.window.width() -
              this.helperProportions.width -
              this.margins.left,
          (o.containment === "document"
            ? this.document.width()
            : this.window.height() ||
              this.document[0].body.parentNode.scrollHeight) -
            this.helperProportions.height -
            this.margins.top
        ];
      }
      if (!/^(document|window|parent)$/.test(o.containment)) {
        ce = $(o.containment)[0];
        co = $(o.containment).offset();
        over = $(ce).css("overflow") !== "hidden";
        this.containment = [
          co.left +
            (parseInt($(ce).css("borderLeftWidth"), 10) || 0) +
            (parseInt($(ce).css("paddingLeft"), 10) || 0) -
            this.margins.left,
          co.top +
            (parseInt($(ce).css("borderTopWidth"), 10) || 0) +
            (parseInt($(ce).css("paddingTop"), 10) || 0) -
            this.margins.top,
          co.left +
            (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) -
            (parseInt($(ce).css("borderLeftWidth"), 10) || 0) -
            (parseInt($(ce).css("paddingRight"), 10) || 0) -
            this.helperProportions.width -
            this.margins.left,
          co.top +
            (over
              ? Math.max(ce.scrollHeight, ce.offsetHeight)
              : ce.offsetHeight) -
            (parseInt($(ce).css("borderTopWidth"), 10) || 0) -
            (parseInt($(ce).css("paddingBottom"), 10) || 0) -
            this.helperProportions.height -
            this.margins.top
        ];
      }
    },
    _convertPositionTo: function(d, pos) {
      if (!pos) {
        pos = this.position;
      }
      var mod = d === "absolute" ? 1 : -1,
        scroll =
          this.cssPosition === "absolute" &&
          !(
            this.scrollParent[0] !== this.document[0] &&
            $.contains(this.scrollParent[0], this.offsetParent[0])
          )
            ? this.offsetParent
            : this.scrollParent,
        scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
      return {
        top:
          pos.top +
          this.offset.relative.top * mod +
          this.offset.parent.top * mod -
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollTop()
            : scrollIsRootNode
            ? 0
            : scroll.scrollTop()) *
            mod,
        left:
          pos.left +
          this.offset.relative.left * mod +
          this.offset.parent.left * mod -
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollLeft()
            : scrollIsRootNode
            ? 0
            : scroll.scrollLeft()) *
            mod
      };
    },
    _generatePosition: function(event) {
      var top,
        left,
        o = this.options,
        pageX = event.pageX,
        pageY = event.pageY,
        scroll =
          this.cssPosition === "absolute" &&
          !(
            this.scrollParent[0] !== this.document[0] &&
            $.contains(this.scrollParent[0], this.offsetParent[0])
          )
            ? this.offsetParent
            : this.scrollParent,
        scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
      if (
        this.cssPosition === "relative" &&
        !(
          this.scrollParent[0] !== this.document[0] &&
          this.scrollParent[0] !== this.offsetParent[0]
        )
      ) {
        this.offset.relative = this._getRelativeOffset();
      }
      if (this.originalPosition) {
        if (this.containment) {
          if (event.pageX - this.offset.click.left < this.containment[0]) {
            pageX = this.containment[0] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top < this.containment[1]) {
            pageY = this.containment[1] + this.offset.click.top;
          }
          if (event.pageX - this.offset.click.left > this.containment[2]) {
            pageX = this.containment[2] + this.offset.click.left;
          }
          if (event.pageY - this.offset.click.top > this.containment[3]) {
            pageY = this.containment[3] + this.offset.click.top;
          }
        }
        if (o.grid) {
          top =
            this.originalPageY +
            Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
          pageY = this.containment
            ? top - this.offset.click.top >= this.containment[1] &&
              top - this.offset.click.top <= this.containment[3]
              ? top
              : top - this.offset.click.top >= this.containment[1]
              ? top - o.grid[1]
              : top + o.grid[1]
            : top;
          left =
            this.originalPageX +
            Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
          pageX = this.containment
            ? left - this.offset.click.left >= this.containment[0] &&
              left - this.offset.click.left <= this.containment[2]
              ? left
              : left - this.offset.click.left >= this.containment[0]
              ? left - o.grid[0]
              : left + o.grid[0]
            : left;
        }
      }
      return {
        top:
          pageY -
          this.offset.click.top -
          this.offset.relative.top -
          this.offset.parent.top +
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollTop()
            : scrollIsRootNode
            ? 0
            : scroll.scrollTop()),
        left:
          pageX -
          this.offset.click.left -
          this.offset.relative.left -
          this.offset.parent.left +
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollLeft()
            : scrollIsRootNode
            ? 0
            : scroll.scrollLeft())
      };
    },
    _rearrange: function(event, i, a, hardRefresh) {
      a
        ? a[0].appendChild(this.placeholder[0])
        : i.item[0].parentNode.insertBefore(
            this.placeholder[0],
            this.direction === "down" ? i.item[0] : i.item[0].nextSibling
          );
      this.counter = this.counter ? ++this.counter : 1;
      var counter = this.counter;
      this._delay(function() {
        if (counter === this.counter) {
          this.refreshPositions(!hardRefresh);
        }
      });
    },
    _clear: function(event, noPropagation) {
      this.reverting = false;
      var i,
        delayedTriggers = [];
      if (!this._noFinalSort && this.currentItem.parent().length) {
        this.placeholder.before(this.currentItem);
      }
      this._noFinalSort = null;
      if (this.helper[0] === this.currentItem[0]) {
        for (i in this._storedCSS) {
          if (
            this._storedCSS[i] === "auto" ||
            this._storedCSS[i] === "static"
          ) {
            this._storedCSS[i] = "";
          }
        }
        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
      } else {
        this.currentItem.show();
      }
      if (this.fromOutside && !noPropagation) {
        delayedTriggers.push(function(event) {
          this._trigger("receive", event, this._uiHash(this.fromOutside));
        });
      }
      if (
        (this.fromOutside ||
          this.domPosition.prev !==
            this.currentItem.prev().not(".ui-sortable-helper")[0] ||
          this.domPosition.parent !== this.currentItem.parent()[0]) &&
        !noPropagation
      ) {
        delayedTriggers.push(function(event) {
          this._trigger("update", event, this._uiHash());
        });
      }
      if (this !== this.currentContainer) {
        if (!noPropagation) {
          delayedTriggers.push(function(event) {
            this._trigger("remove", event, this._uiHash());
          });
          delayedTriggers.push(
            function(c) {
              return function(event) {
                c._trigger("receive", event, this._uiHash(this));
              };
            }.call(this, this.currentContainer)
          );
          delayedTriggers.push(
            function(c) {
              return function(event) {
                c._trigger("update", event, this._uiHash(this));
              };
            }.call(this, this.currentContainer)
          );
        }
      }
      function delayEvent(type, instance, container) {
        return function(event) {
          container._trigger(type, event, instance._uiHash(instance));
        };
      }
      for (i = this.containers.length - 1; i >= 0; i--) {
        if (!noPropagation) {
          delayedTriggers.push(
            delayEvent("deactivate", this, this.containers[i])
          );
        }
        if (this.containers[i].containerCache.over) {
          delayedTriggers.push(delayEvent("out", this, this.containers[i]));
          this.containers[i].containerCache.over = 0;
        }
      }
      if (this.storedCursor) {
        this.document.find("body").css("cursor", this.storedCursor);
        this.storedStylesheet.remove();
      }
      if (this._storedOpacity) {
        this.helper.css("opacity", this._storedOpacity);
      }
      if (this._storedZIndex) {
        this.helper.css(
          "zIndex",
          this._storedZIndex === "auto" ? "" : this._storedZIndex
        );
      }
      this.dragging = false;
      if (!noPropagation) {
        this._trigger("beforeStop", event, this._uiHash());
      }
      this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
      if (!this.cancelHelperRemoval) {
        if (this.helper[0] !== this.currentItem[0]) {
          this.helper.remove();
        }
        this.helper = null;
      }
      if (!noPropagation) {
        for (i = 0; i < delayedTriggers.length; i++) {
          delayedTriggers[i].call(this, event);
        }
        this._trigger("stop", event, this._uiHash());
      }
      this.fromOutside = false;
      return !this.cancelHelperRemoval;
    },
    _trigger: function() {
      if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
        this.cancel();
      }
    },
    _uiHash: function(_inst) {
      var inst = _inst || this;
      return {
        helper: inst.helper,
        placeholder: inst.placeholder || $([]),
        position: inst.position,
        originalPosition: inst.originalPosition,
        offset: inst.positionAbs,
        item: inst.currentItem,
        sender: _inst ? _inst.element : null
      };
    }
  });
  var menu = $.widget("ui.menu", {
    version: "1.11.4",
    defaultElement: "<ul>",
    delay: 300,
    options: {
      icons: { submenu: "ui-icon-carat-1-e" },
      items: "> *",
      menus: "ul",
      position: { my: "left-1 top", at: "right top" },
      role: "menu",
      blur: null,
      focus: null,
      select: null
    },
    _create: function() {
      this.activeMenu = this.element;
      this.mouseHandled = false;
      this.element
        .uniqueId()
        .addClass("ui-menu ui-widget ui-widget-content")
        .toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length)
        .attr({ role: this.options.role, tabIndex: 0 });
      if (this.options.disabled) {
        this.element
          .addClass("ui-state-disabled")
          .attr("aria-disabled", "true");
      }
      this._on({
        "mousedown .ui-menu-item": function(event) {
          event.preventDefault();
        },
        "click .ui-menu-item": function(event) {
          var target = $(event.target);
          if (!this.mouseHandled && target.not(".ui-state-disabled").length) {
            this.select(event);
            if (!event.isPropagationStopped()) {
              this.mouseHandled = true;
            }
            if (target.has(".ui-menu").length) {
              this.expand(event);
            } else if (
              !this.element.is(":focus") &&
              $(this.document[0].activeElement).closest(".ui-menu").length
            ) {
              this.element.trigger("focus", [true]);
              if (this.active && this.active.parents(".ui-menu").length === 1) {
                clearTimeout(this.timer);
              }
            }
          }
        },
        "mouseenter .ui-menu-item": function(event) {
          if (this.previousFilter) {
            return;
          }
          var target = $(event.currentTarget);
          target.siblings(".ui-state-active").removeClass("ui-state-active");
          this.focus(event, target);
        },
        mouseleave: "collapseAll",
        "mouseleave .ui-menu": "collapseAll",
        focus: function(event, keepActiveItem) {
          var item = this.active || this.element.find(this.options.items).eq(0);
          if (!keepActiveItem) {
            this.focus(event, item);
          }
        },
        blur: function(event) {
          this._delay(function() {
            if (!$.contains(this.element[0], this.document[0].activeElement)) {
              this.collapseAll(event);
            }
          });
        },
        keydown: "_keydown"
      });
      this.refresh();
      this._on(this.document, {
        click: function(event) {
          if (this._closeOnDocumentClick(event)) {
            this.collapseAll(event);
          }
          this.mouseHandled = false;
        }
      });
    },
    _destroy: function() {
      this.element
        .removeAttr("aria-activedescendant")
        .find(".ui-menu")
        .addBack()
        .removeClass(
          "ui-menu ui-widget ui-widget-content ui-menu-icons ui-front"
        )
        .removeAttr("role")
        .removeAttr("tabIndex")
        .removeAttr("aria-labelledby")
        .removeAttr("aria-expanded")
        .removeAttr("aria-hidden")
        .removeAttr("aria-disabled")
        .removeUniqueId()
        .show();
      this.element
        .find(".ui-menu-item")
        .removeClass("ui-menu-item")
        .removeAttr("role")
        .removeAttr("aria-disabled")
        .removeUniqueId()
        .removeClass("ui-state-hover")
        .removeAttr("tabIndex")
        .removeAttr("role")
        .removeAttr("aria-haspopup")
        .children()
        .each(function() {
          var elem = $(this);
          if (elem.data("ui-menu-submenu-carat")) {
            elem.remove();
          }
        });
      this.element
        .find(".ui-menu-divider")
        .removeClass("ui-menu-divider ui-widget-content");
    },
    _keydown: function(event) {
      var match,
        prev,
        character,
        skip,
        preventDefault = true;
      switch (event.keyCode) {
        case $.ui.keyCode.PAGE_UP:
          this.previousPage(event);
          break;
        case $.ui.keyCode.PAGE_DOWN:
          this.nextPage(event);
          break;
        case $.ui.keyCode.HOME:
          this._move("first", "first", event);
          break;
        case $.ui.keyCode.END:
          this._move("last", "last", event);
          break;
        case $.ui.keyCode.UP:
          this.previous(event);
          break;
        case $.ui.keyCode.DOWN:
          this.next(event);
          break;
        case $.ui.keyCode.LEFT:
          this.collapse(event);
          break;
        case $.ui.keyCode.RIGHT:
          if (this.active && !this.active.is(".ui-state-disabled")) {
            this.expand(event);
          }
          break;
        case $.ui.keyCode.ENTER:
        case $.ui.keyCode.SPACE:
          this._activate(event);
          break;
        case $.ui.keyCode.ESCAPE:
          this.collapse(event);
          break;
        default:
          preventDefault = false;
          prev = this.previousFilter || "";
          character = String.fromCharCode(event.keyCode);
          skip = false;
          clearTimeout(this.filterTimer);
          if (character === prev) {
            skip = true;
          } else {
            character = prev + character;
          }
          match = this._filterMenuItems(character);
          match =
            skip && match.index(this.active.next()) !== -1
              ? this.active.nextAll(".ui-menu-item")
              : match;
          if (!match.length) {
            character = String.fromCharCode(event.keyCode);
            match = this._filterMenuItems(character);
          }
          if (match.length) {
            this.focus(event, match);
            this.previousFilter = character;
            this.filterTimer = this._delay(function() {
              delete this.previousFilter;
            }, 1000);
          } else {
            delete this.previousFilter;
          }
      }
      if (preventDefault) {
        event.preventDefault();
      }
    },
    _activate: function(event) {
      if (!this.active.is(".ui-state-disabled")) {
        if (this.active.is("[aria-haspopup='true']")) {
          this.expand(event);
        } else {
          this.select(event);
        }
      }
    },
    refresh: function() {
      var menus,
        items,
        that = this,
        icon = this.options.icons.submenu,
        submenus = this.element.find(this.options.menus);
      this.element.toggleClass(
        "ui-menu-icons",
        !!this.element.find(".ui-icon").length
      );
      submenus
        .filter(":not(.ui-menu)")
        .addClass("ui-menu ui-widget ui-widget-content ui-front")
        .hide()
        .attr({
          role: this.options.role,
          "aria-hidden": "true",
          "aria-expanded": "false"
        })
        .each(function() {
          var menu = $(this),
            item = menu.parent(),
            submenuCarat = $("<span>")
              .addClass("ui-menu-icon ui-icon " + icon)
              .data("ui-menu-submenu-carat", true);
          item.attr("aria-haspopup", "true").prepend(submenuCarat);
          menu.attr("aria-labelledby", item.attr("id"));
        });
      menus = submenus.add(this.element);
      items = menus.find(this.options.items);
      items.not(".ui-menu-item").each(function() {
        var item = $(this);
        if (that._isDivider(item)) {
          item.addClass("ui-widget-content ui-menu-divider");
        }
      });
      items
        .not(".ui-menu-item, .ui-menu-divider")
        .addClass("ui-menu-item")
        .uniqueId()
        .attr({ tabIndex: -1, role: this._itemRole() });
      items.filter(".ui-state-disabled").attr("aria-disabled", "true");
      if (this.active && !$.contains(this.element[0], this.active[0])) {
        this.blur();
      }
    },
    _itemRole: function() {
      return { menu: "menuitem", listbox: "option" }[this.options.role];
    },
    _setOption: function(key, value) {
      if (key === "icons") {
        this.element
          .find(".ui-menu-icon")
          .removeClass(this.options.icons.submenu)
          .addClass(value.submenu);
      }
      if (key === "disabled") {
        this.element
          .toggleClass("ui-state-disabled", !!value)
          .attr("aria-disabled", value);
      }
      this._super(key, value);
    },
    focus: function(event, item) {
      var nested, focused;
      this.blur(event, event && event.type === "focus");
      this._scrollIntoView(item);
      this.active = item.first();
      focused = this.active
        .addClass("ui-state-focus")
        .removeClass("ui-state-active");
      if (this.options.role) {
        this.element.attr("aria-activedescendant", focused.attr("id"));
      }
      this.active
        .parent()
        .closest(".ui-menu-item")
        .addClass("ui-state-active");
      if (event && event.type === "keydown") {
        this._close();
      } else {
        this.timer = this._delay(function() {
          this._close();
        }, this.delay);
      }
      nested = item.children(".ui-menu");
      if (nested.length && event && /^mouse/.test(event.type)) {
        this._startOpening(nested);
      }
      this.activeMenu = item.parent();
      this._trigger("focus", event, { item: item });
    },
    _scrollIntoView: function(item) {
      var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
      if (this._hasScroll()) {
        borderTop =
          parseFloat($.css(this.activeMenu[0], "borderTopWidth")) || 0;
        paddingTop = parseFloat($.css(this.activeMenu[0], "paddingTop")) || 0;
        offset =
          item.offset().top -
          this.activeMenu.offset().top -
          borderTop -
          paddingTop;
        scroll = this.activeMenu.scrollTop();
        elementHeight = this.activeMenu.height();
        itemHeight = item.outerHeight();
        if (offset < 0) {
          this.activeMenu.scrollTop(scroll + offset);
        } else if (offset + itemHeight > elementHeight) {
          this.activeMenu.scrollTop(
            scroll + offset - elementHeight + itemHeight
          );
        }
      }
    },
    blur: function(event, fromFocus) {
      if (!fromFocus) {
        clearTimeout(this.timer);
      }
      if (!this.active) {
        return;
      }
      this.active.removeClass("ui-state-focus");
      this.active = null;
      this._trigger("blur", event, { item: this.active });
    },
    _startOpening: function(submenu) {
      clearTimeout(this.timer);
      if (submenu.attr("aria-hidden") !== "true") {
        return;
      }
      this.timer = this._delay(function() {
        this._close();
        this._open(submenu);
      }, this.delay);
    },
    _open: function(submenu) {
      var position = $.extend({ of: this.active }, this.options.position);
      clearTimeout(this.timer);
      this.element
        .find(".ui-menu")
        .not(submenu.parents(".ui-menu"))
        .hide()
        .attr("aria-hidden", "true");
      submenu
        .show()
        .removeAttr("aria-hidden")
        .attr("aria-expanded", "true")
        .position(position);
    },
    collapseAll: function(event, all) {
      clearTimeout(this.timer);
      this.timer = this._delay(function() {
        var currentMenu = all
          ? this.element
          : $(event && event.target).closest(this.element.find(".ui-menu"));
        if (!currentMenu.length) {
          currentMenu = this.element;
        }
        this._close(currentMenu);
        this.blur(event);
        this.activeMenu = currentMenu;
      }, this.delay);
    },
    _close: function(startMenu) {
      if (!startMenu) {
        startMenu = this.active ? this.active.parent() : this.element;
      }
      startMenu
        .find(".ui-menu")
        .hide()
        .attr("aria-hidden", "true")
        .attr("aria-expanded", "false")
        .end()
        .find(".ui-state-active")
        .not(".ui-state-focus")
        .removeClass("ui-state-active");
    },
    _closeOnDocumentClick: function(event) {
      return !$(event.target).closest(".ui-menu").length;
    },
    _isDivider: function(item) {
      return !/[^\-\u2014\u2013\s]/.test(item.text());
    },
    collapse: function(event) {
      var newItem =
        this.active &&
        this.active.parent().closest(".ui-menu-item", this.element);
      if (newItem && newItem.length) {
        this._close();
        this.focus(event, newItem);
      }
    },
    expand: function(event) {
      var newItem =
        this.active &&
        this.active
          .children(".ui-menu ")
          .find(this.options.items)
          .first();
      if (newItem && newItem.length) {
        this._open(newItem.parent());
        this._delay(function() {
          this.focus(event, newItem);
        });
      }
    },
    next: function(event) {
      this._move("next", "first", event);
    },
    previous: function(event) {
      this._move("prev", "last", event);
    },
    isFirstItem: function() {
      return this.active && !this.active.prevAll(".ui-menu-item").length;
    },
    isLastItem: function() {
      return this.active && !this.active.nextAll(".ui-menu-item").length;
    },
    _move: function(direction, filter, event) {
      var next;
      if (this.active) {
        if (direction === "first" || direction === "last") {
          next = this.active[direction === "first" ? "prevAll" : "nextAll"](
            ".ui-menu-item"
          ).eq(-1);
        } else {
          next = this.active[direction + "All"](".ui-menu-item").eq(0);
        }
      }
      if (!next || !next.length || !this.active) {
        next = this.activeMenu.find(this.options.items)[filter]();
      }
      this.focus(event, next);
    },
    nextPage: function(event) {
      var item, base, height;
      if (!this.active) {
        this.next(event);
        return;
      }
      if (this.isLastItem()) {
        return;
      }
      if (this._hasScroll()) {
        base = this.active.offset().top;
        height = this.element.height();
        this.active.nextAll(".ui-menu-item").each(function() {
          item = $(this);
          return item.offset().top - base - height < 0;
        });
        this.focus(event, item);
      } else {
        this.focus(
          event,
          this.activeMenu
            .find(this.options.items)
            [!this.active ? "first" : "last"]()
        );
      }
    },
    previousPage: function(event) {
      var item, base, height;
      if (!this.active) {
        this.next(event);
        return;
      }
      if (this.isFirstItem()) {
        return;
      }
      if (this._hasScroll()) {
        base = this.active.offset().top;
        height = this.element.height();
        this.active.prevAll(".ui-menu-item").each(function() {
          item = $(this);
          return item.offset().top - base + height > 0;
        });
        this.focus(event, item);
      } else {
        this.focus(event, this.activeMenu.find(this.options.items).first());
      }
    },
    _hasScroll: function() {
      return this.element.outerHeight() < this.element.prop("scrollHeight");
    },
    select: function(event) {
      this.active = this.active || $(event.target).closest(".ui-menu-item");
      var ui = { item: this.active };
      if (!this.active.has(".ui-menu").length) {
        this.collapseAll(event, true);
      }
      this._trigger("select", event, ui);
    },
    _filterMenuItems: function(character) {
      var escapedCharacter = character.replace(
          /[\-\[\]{}()*+?.,\\\^$|#\s]/g,
          "\\$&"
        ),
        regex = new RegExp("^" + escapedCharacter, "i");
      return this.activeMenu
        .find(this.options.items)
        .filter(".ui-menu-item")
        .filter(function() {
          return regex.test($.trim($(this).text()));
        });
    }
  });
  $.widget("ui.autocomplete", {
    version: "1.11.4",
    defaultElement: "<input>",
    options: {
      appendTo: null,
      autoFocus: false,
      delay: 300,
      minLength: 1,
      position: { my: "left top", at: "left bottom", collision: "none" },
      source: null,
      change: null,
      close: null,
      focus: null,
      open: null,
      response: null,
      search: null,
      select: null
    },
    requestIndex: 0,
    pending: 0,
    _create: function() {
      var suppressKeyPress,
        suppressKeyPressRepeat,
        suppressInput,
        nodeName = this.element[0].nodeName.toLowerCase(),
        isTextarea = nodeName === "textarea",
        isInput = nodeName === "input";
      this.isMultiLine = isTextarea
        ? true
        : isInput
        ? false
        : this.element.prop("isContentEditable");
      this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"];
      this.isNewMenu = true;
      this.element
        .addClass("ui-autocomplete-input")
        .attr("autocomplete", "off");
      this._on(this.element, {
        keydown: function(event) {
          if (this.element.prop("readOnly")) {
            suppressKeyPress = true;
            suppressInput = true;
            suppressKeyPressRepeat = true;
            return;
          }
          suppressKeyPress = false;
          suppressInput = false;
          suppressKeyPressRepeat = false;
          var keyCode = $.ui.keyCode;
          switch (event.keyCode) {
            case keyCode.PAGE_UP:
              suppressKeyPress = true;
              this._move("previousPage", event);
              break;
            case keyCode.PAGE_DOWN:
              suppressKeyPress = true;
              this._move("nextPage", event);
              break;
            case keyCode.UP:
              suppressKeyPress = true;
              this._keyEvent("previous", event);
              break;
            case keyCode.DOWN:
              suppressKeyPress = true;
              this._keyEvent("next", event);
              break;
            case keyCode.ENTER:
              if (this.menu.active) {
                suppressKeyPress = true;
                event.preventDefault();
                this.menu.select(event);
              }
              break;
            case keyCode.TAB:
              if (this.menu.active) {
                this.menu.select(event);
              }
              break;
            case keyCode.ESCAPE:
              if (this.menu.element.is(":visible")) {
                if (!this.isMultiLine) {
                  this._value(this.term);
                }
                this.close(event);
                event.preventDefault();
              }
              break;
            default:
              suppressKeyPressRepeat = true;
              this._searchTimeout(event);
              break;
          }
        },
        keypress: function(event) {
          if (suppressKeyPress) {
            suppressKeyPress = false;
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
              event.preventDefault();
            }
            return;
          }
          if (suppressKeyPressRepeat) {
            return;
          }
          var keyCode = $.ui.keyCode;
          switch (event.keyCode) {
            case keyCode.PAGE_UP:
              this._move("previousPage", event);
              break;
            case keyCode.PAGE_DOWN:
              this._move("nextPage", event);
              break;
            case keyCode.UP:
              this._keyEvent("previous", event);
              break;
            case keyCode.DOWN:
              this._keyEvent("next", event);
              break;
          }
        },
        input: function(event) {
          if (suppressInput) {
            suppressInput = false;
            event.preventDefault();
            return;
          }
          this._searchTimeout(event);
        },
        focus: function() {
          this.selectedItem = null;
          this.previous = this._value();
        },
        blur: function(event) {
          if (this.cancelBlur) {
            delete this.cancelBlur;
            return;
          }
          clearTimeout(this.searching);
          this.close(event);
          this._change(event);
        }
      });
      this._initSource();
      this.menu = $("<ul>")
        .addClass("ui-autocomplete ui-front")
        .appendTo(this._appendTo())
        .menu({ role: null })
        .hide()
        .menu("instance");
      this._on(this.menu.element, {
        mousedown: function(event) {
          event.preventDefault();
          this.cancelBlur = true;
          this._delay(function() {
            delete this.cancelBlur;
          });
          var menuElement = this.menu.element[0];
          if (!$(event.target).closest(".ui-menu-item").length) {
            this._delay(function() {
              var that = this;
              this.document.one("mousedown", function(event) {
                if (
                  event.target !== that.element[0] &&
                  event.target !== menuElement &&
                  !$.contains(menuElement, event.target)
                ) {
                  that.close();
                }
              });
            });
          }
        },
        menufocus: function(event, ui) {
          var label, item;
          if (this.isNewMenu) {
            this.isNewMenu = false;
            if (
              event.originalEvent &&
              /^mouse/.test(event.originalEvent.type)
            ) {
              this.menu.blur();
              this.document.one("mousemove", function() {
                $(event.target).trigger(event.originalEvent);
              });
              return;
            }
          }
          item = ui.item.data("ui-autocomplete-item");
          if (false !== this._trigger("focus", event, { item: item })) {
            if (event.originalEvent && /^key/.test(event.originalEvent.type)) {
              this._value(item.value);
            }
          }
          label = ui.item.attr("aria-label") || item.value;
          if (label && $.trim(label).length) {
            this.liveRegion.children().hide();
            $("<div>")
              .text(label)
              .appendTo(this.liveRegion);
          }
        },
        menuselect: function(event, ui) {
          var item = ui.item.data("ui-autocomplete-item"),
            previous = this.previous;
          if (this.element[0] !== this.document[0].activeElement) {
            this.element.focus();
            this.previous = previous;
            this._delay(function() {
              this.previous = previous;
              this.selectedItem = item;
            });
          }
          if (false !== this._trigger("select", event, { item: item })) {
            this._value(item.value);
          }
          this.term = this._value();
          this.close(event);
          this.selectedItem = item;
        }
      });
      this.liveRegion = $("<span>", {
        role: "status",
        "aria-live": "assertive",
        "aria-relevant": "additions"
      })
        .addClass("ui-helper-hidden-accessible")
        .appendTo(this.document[0].body);
      this._on(this.window, {
        beforeunload: function() {
          this.element.removeAttr("autocomplete");
        }
      });
    },
    _destroy: function() {
      clearTimeout(this.searching);
      this.element
        .removeClass("ui-autocomplete-input")
        .removeAttr("autocomplete");
      this.menu.element.remove();
      this.liveRegion.remove();
    },
    _setOption: function(key, value) {
      this._super(key, value);
      if (key === "source") {
        this._initSource();
      }
      if (key === "appendTo") {
        this.menu.element.appendTo(this._appendTo());
      }
      if (key === "disabled" && value && this.xhr) {
        this.xhr.abort();
      }
    },
    _appendTo: function() {
      var element = this.options.appendTo;
      if (element) {
        element =
          element.jquery || element.nodeType
            ? $(element)
            : this.document.find(element).eq(0);
      }
      if (!element || !element[0]) {
        element = this.element.closest(".ui-front");
      }
      if (!element.length) {
        element = this.document[0].body;
      }
      return element;
    },
    _initSource: function() {
      var array,
        url,
        that = this;
      if ($.isArray(this.options.source)) {
        array = this.options.source;
        this.source = function(request, response) {
          response($.ui.autocomplete.filter(array, request.term));
        };
      } else if (typeof this.options.source === "string") {
        url = this.options.source;
        this.source = function(request, response) {
          if (that.xhr) {
            that.xhr.abort();
          }
          that.xhr = $.ajax({
            url: url,
            data: request,
            dataType: "json",
            success: function(data) {
              response(data);
            },
            error: function() {
              response([]);
            }
          });
        };
      } else {
        this.source = this.options.source;
      }
    },
    _searchTimeout: function(event) {
      clearTimeout(this.searching);
      this.searching = this._delay(function() {
        var equalValues = this.term === this._value(),
          menuVisible = this.menu.element.is(":visible"),
          modifierKey =
            event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
        if (!equalValues || (equalValues && !menuVisible && !modifierKey)) {
          this.selectedItem = null;
          this.search(null, event);
        }
      }, this.options.delay);
    },
    search: function(value, event) {
      value = value != null ? value : this._value();
      this.term = this._value();
      if (value.length < this.options.minLength) {
        return this.close(event);
      }
      if (this._trigger("search", event) === false) {
        return;
      }
      return this._search(value);
    },
    _search: function(value) {
      this.pending++;
      this.element.addClass("ui-autocomplete-loading");
      this.cancelSearch = false;
      this.source({ term: value }, this._response());
    },
    _response: function() {
      var index = ++this.requestIndex;
      return $.proxy(function(content) {
        if (index === this.requestIndex) {
          this.__response(content);
        }
        this.pending--;
        if (!this.pending) {
          this.element.removeClass("ui-autocomplete-loading");
        }
      }, this);
    },
    __response: function(content) {
      if (content) {
        content = this._normalize(content);
      }
      this._trigger("response", null, { content: content });
      if (
        !this.options.disabled &&
        content &&
        content.length &&
        !this.cancelSearch
      ) {
        this._suggest(content);
        this._trigger("open");
      } else {
        this._close();
      }
    },
    close: function(event) {
      this.cancelSearch = true;
      this._close(event);
    },
    _close: function(event) {
      if (this.menu.element.is(":visible")) {
        this.menu.element.hide();
        this.menu.blur();
        this.isNewMenu = true;
        this._trigger("close", event);
      }
    },
    _change: function(event) {
      if (this.previous !== this._value()) {
        this._trigger("change", event, { item: this.selectedItem });
      }
    },
    _normalize: function(items) {
      if (items.length && items[0].label && items[0].value) {
        return items;
      }
      return $.map(items, function(item) {
        if (typeof item === "string") {
          return { label: item, value: item };
        }
        return $.extend({}, item, {
          label: item.label || item.value,
          value: item.value || item.label
        });
      });
    },
    _suggest: function(items) {
      var ul = this.menu.element.empty();
      this._renderMenu(ul, items);
      this.isNewMenu = true;
      this.menu.refresh();
      ul.show();
      this._resizeMenu();
      ul.position($.extend({ of: this.element }, this.options.position));
      if (this.options.autoFocus) {
        this.menu.next();
      }
    },
    _resizeMenu: function() {
      var ul = this.menu.element;
      ul.outerWidth(
        Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth())
      );
    },
    _renderMenu: function(ul, items) {
      var that = this;
      $.each(items, function(index, item) {
        that._renderItemData(ul, item);
      });
    },
    _renderItemData: function(ul, item) {
      return this._renderItem(ul, item).data("ui-autocomplete-item", item);
    },
    _renderItem: function(ul, item) {
      return $("<li>")
        .text(item.label)
        .appendTo(ul);
    },
    _move: function(direction, event) {
      if (!this.menu.element.is(":visible")) {
        this.search(null, event);
        return;
      }
      if (
        (this.menu.isFirstItem() && /^previous/.test(direction)) ||
        (this.menu.isLastItem() && /^next/.test(direction))
      ) {
        if (!this.isMultiLine) {
          this._value(this.term);
        }
        this.menu.blur();
        return;
      }
      this.menu[direction](event);
    },
    widget: function() {
      return this.menu.element;
    },
    _value: function() {
      return this.valueMethod.apply(this.element, arguments);
    },
    _keyEvent: function(keyEvent, event) {
      if (!this.isMultiLine || this.menu.element.is(":visible")) {
        this._move(keyEvent, event);
        event.preventDefault();
      }
    }
  });
  $.extend($.ui.autocomplete, {
    escapeRegex: function(value) {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    },
    filter: function(array, term) {
      var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
      return $.grep(array, function(value) {
        return matcher.test(value.label || value.value || value);
      });
    }
  });
  $.widget("ui.autocomplete", $.ui.autocomplete, {
    options: {
      messages: {
        noResults: "No search results.",
        results: function(amount) {
          return (
            amount +
            (amount > 1 ? " results are" : " result is") +
            " available, use up and down arrow keys to navigate."
          );
        }
      }
    },
    __response: function(content) {
      var message;
      this._superApply(arguments);
      if (this.options.disabled || this.cancelSearch) {
        return;
      }
      if (content && content.length) {
        message = this.options.messages.results(content.length);
      } else {
        message = this.options.messages.noResults;
      }
      this.liveRegion.children().hide();
      $("<div>")
        .text(message)
        .appendTo(this.liveRegion);
    }
  });
  var autocomplete = $.ui.autocomplete;
  $.extend($.ui, { datepicker: { version: "1.11.4" } });
  var datepicker_instActive;
  function datepicker_getZindex(elem) {
    var position, value;
    while (elem.length && elem[0] !== document) {
      position = elem.css("position");
      if (
        position === "absolute" ||
        position === "relative" ||
        position === "fixed"
      ) {
        value = parseInt(elem.css("zIndex"), 10);
        if (!isNaN(value) && value !== 0) {
          return value;
        }
      }
      elem = elem.parent();
    }
    return 0;
  }
  function Datepicker() {
    this._curInst = null;
    this._keyEvent = false;
    this._disabledInputs = [];
    this._datepickerShowing = false;
    this._inDialog = false;
    this._mainDivId = "ui-datepicker-div";
    this._inlineClass = "ui-datepicker-inline";
    this._appendClass = "ui-datepicker-append";
    this._triggerClass = "ui-datepicker-trigger";
    this._dialogClass = "ui-datepicker-dialog";
    this._disableClass = "ui-datepicker-disabled";
    this._unselectableClass = "ui-datepicker-unselectable";
    this._currentClass = "ui-datepicker-current-day";
    this._dayOverClass = "ui-datepicker-days-cell-over";
    this.regional = [];
    this.regional[""] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      monthNamesShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "mm/dd/yy",
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ""
    };
    this._defaults = {
      showOn: "focus",
      showAnim: "fadeIn",
      showOptions: {},
      defaultDate: null,
      appendText: "",
      buttonText: "...",
      buttonImage: "",
      buttonImageOnly: false,
      hideIfNoPrevNext: false,
      navigationAsDateFormat: false,
      gotoCurrent: false,
      changeMonth: false,
      changeYear: false,
      yearRange: "c-10:c+10",
      showOtherMonths: false,
      selectOtherMonths: false,
      showWeek: false,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: "+10",
      minDate: null,
      maxDate: null,
      duration: "fast",
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: "",
      altFormat: "",
      constrainInput: true,
      showButtonPanel: false,
      autoSize: false,
      disabled: false
    };
    $.extend(this._defaults, this.regional[""]);
    this.regional.en = $.extend(true, {}, this.regional[""]);
    this.regional["en-US"] = $.extend(true, {}, this.regional.en);
    this.dpDiv = datepicker_bindHover(
      $(
        "<div id='" +
          this._mainDivId +
          "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
      )
    );
  }
  $.extend(Datepicker.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    _widgetDatepicker: function() {
      return this.dpDiv;
    },
    setDefaults: function(settings) {
      datepicker_extendRemove(this._defaults, settings || {});
      return this;
    },
    _attachDatepicker: function(target, settings) {
      var nodeName, inline, inst;
      nodeName = target.nodeName.toLowerCase();
      inline = nodeName === "div" || nodeName === "span";
      if (!target.id) {
        this.uuid += 1;
        target.id = "dp" + this.uuid;
      }
      inst = this._newInst($(target), inline);
      inst.settings = $.extend({}, settings || {});
      if (nodeName === "input") {
        this._connectDatepicker(target, inst);
      } else if (inline) {
        this._inlineDatepicker(target, inst);
      }
    },
    _newInst: function(target, inline) {
      var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
      return {
        id: id,
        input: target,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: inline,
        dpDiv: !inline
          ? this.dpDiv
          : datepicker_bindHover(
              $(
                "<div class='" +
                  this._inlineClass +
                  " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
              )
            )
      };
    },
    _connectDatepicker: function(target, inst) {
      var input = $(target);
      inst.append = $([]);
      inst.trigger = $([]);
      if (input.hasClass(this.markerClassName)) {
        return;
      }
      this._attachments(input, inst);
      input
        .addClass(this.markerClassName)
        .keydown(this._doKeyDown)
        .keypress(this._doKeyPress)
        .keyup(this._doKeyUp);
      this._autoSize(inst);
      $.data(target, "datepicker", inst);
      if (inst.settings.disabled) {
        this._disableDatepicker(target);
      }
    },
    _attachments: function(input, inst) {
      var showOn,
        buttonText,
        buttonImage,
        appendText = this._get(inst, "appendText"),
        isRTL = this._get(inst, "isRTL");
      if (inst.append) {
        inst.append.remove();
      }
      if (appendText) {
        inst.append = $(
          "<span class='" + this._appendClass + "'>" + appendText + "</span>"
        );
        input[isRTL ? "before" : "after"](inst.append);
      }
      input.unbind("focus", this._showDatepicker);
      if (inst.trigger) {
        inst.trigger.remove();
      }
      showOn = this._get(inst, "showOn");
      if (showOn === "focus" || showOn === "both") {
        input.focus(this._showDatepicker);
      }
      if (showOn === "button" || showOn === "both") {
        buttonText = this._get(inst, "buttonText");
        buttonImage = this._get(inst, "buttonImage");
        inst.trigger = $(
          this._get(inst, "buttonImageOnly")
            ? $("<img/>")
                .addClass(this._triggerClass)
                .attr({ src: buttonImage, alt: buttonText, title: buttonText })
            : $("<button type='button'></button>")
                .addClass(this._triggerClass)
                .html(
                  !buttonImage
                    ? buttonText
                    : $("<img/>").attr({
                        src: buttonImage,
                        alt: buttonText,
                        title: buttonText
                      })
                )
        );
        input[isRTL ? "before" : "after"](inst.trigger);
        inst.trigger.click(function() {
          if (
            $.datepicker._datepickerShowing &&
            $.datepicker._lastInput === input[0]
          ) {
            $.datepicker._hideDatepicker();
          } else if (
            $.datepicker._datepickerShowing &&
            $.datepicker._lastInput !== input[0]
          ) {
            $.datepicker._hideDatepicker();
            $.datepicker._showDatepicker(input[0]);
          } else {
            $.datepicker._showDatepicker(input[0]);
          }
          return false;
        });
      }
    },
    _autoSize: function(inst) {
      if (this._get(inst, "autoSize") && !inst.inline) {
        var findMax,
          max,
          maxI,
          i,
          date = new Date(2009, 12 - 1, 20),
          dateFormat = this._get(inst, "dateFormat");
        if (dateFormat.match(/[DM]/)) {
          findMax = function(names) {
            max = 0;
            maxI = 0;
            for (i = 0; i < names.length; i++) {
              if (names[i].length > max) {
                max = names[i].length;
                maxI = i;
              }
            }
            return maxI;
          };
          date.setMonth(
            findMax(
              this._get(
                inst,
                dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"
              )
            )
          );
          date.setDate(
            findMax(
              this._get(
                inst,
                dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"
              )
            ) +
              20 -
              date.getDay()
          );
        }
        inst.input.attr("size", this._formatDate(inst, date).length);
      }
    },
    _inlineDatepicker: function(target, inst) {
      var divSpan = $(target);
      if (divSpan.hasClass(this.markerClassName)) {
        return;
      }
      divSpan.addClass(this.markerClassName).append(inst.dpDiv);
      $.data(target, "datepicker", inst);
      this._setDate(inst, this._getDefaultDate(inst), true);
      this._updateDatepicker(inst);
      this._updateAlternate(inst);
      if (inst.settings.disabled) {
        this._disableDatepicker(target);
      }
      inst.dpDiv.css("display", "block");
    },
    _dialogDatepicker: function(input, date, onSelect, settings, pos) {
      var id,
        browserWidth,
        browserHeight,
        scrollX,
        scrollY,
        inst = this._dialogInst;
      if (!inst) {
        this.uuid += 1;
        id = "dp" + this.uuid;
        this._dialogInput = $(
          "<input type='text' id='" +
            id +
            "' style='position: absolute; top: -100px; width: 0px;'/>"
        );
        this._dialogInput.keydown(this._doKeyDown);
        $("body").append(this._dialogInput);
        inst = this._dialogInst = this._newInst(this._dialogInput, false);
        inst.settings = {};
        $.data(this._dialogInput[0], "datepicker", inst);
      }
      datepicker_extendRemove(inst.settings, settings || {});
      date =
        date && date.constructor === Date ? this._formatDate(inst, date) : date;
      this._dialogInput.val(date);
      this._pos = pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null;
      if (!this._pos) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;
        scrollX =
          document.documentElement.scrollLeft || document.body.scrollLeft;
        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        this._pos = [
          browserWidth / 2 - 100 + scrollX,
          browserHeight / 2 - 150 + scrollY
        ];
      }
      this._dialogInput
        .css("left", this._pos[0] + 20 + "px")
        .css("top", this._pos[1] + "px");
      inst.settings.onSelect = onSelect;
      this._inDialog = true;
      this.dpDiv.addClass(this._dialogClass);
      this._showDatepicker(this._dialogInput[0]);
      if ($.blockUI) {
        $.blockUI(this.dpDiv);
      }
      $.data(this._dialogInput[0], "datepicker", inst);
      return this;
    },
    _destroyDatepicker: function(target) {
      var nodeName,
        $target = $(target),
        inst = $.data(target, "datepicker");
      if (!$target.hasClass(this.markerClassName)) {
        return;
      }
      nodeName = target.nodeName.toLowerCase();
      $.removeData(target, "datepicker");
      if (nodeName === "input") {
        inst.append.remove();
        inst.trigger.remove();
        $target
          .removeClass(this.markerClassName)
          .unbind("focus", this._showDatepicker)
          .unbind("keydown", this._doKeyDown)
          .unbind("keypress", this._doKeyPress)
          .unbind("keyup", this._doKeyUp);
      } else if (nodeName === "div" || nodeName === "span") {
        $target.removeClass(this.markerClassName).empty();
      }
      if (datepicker_instActive === inst) {
        datepicker_instActive = null;
      }
    },
    _enableDatepicker: function(target) {
      var nodeName,
        inline,
        $target = $(target),
        inst = $.data(target, "datepicker");
      if (!$target.hasClass(this.markerClassName)) {
        return;
      }
      nodeName = target.nodeName.toLowerCase();
      if (nodeName === "input") {
        target.disabled = false;
        inst.trigger
          .filter("button")
          .each(function() {
            this.disabled = false;
          })
          .end()
          .filter("img")
          .css({ opacity: "1.0", cursor: "" });
      } else if (nodeName === "div" || nodeName === "span") {
        inline = $target.children("." + this._inlineClass);
        inline.children().removeClass("ui-state-disabled");
        inline
          .find("select.ui-datepicker-month, select.ui-datepicker-year")
          .prop("disabled", false);
      }
      this._disabledInputs = $.map(this._disabledInputs, function(value) {
        return value === target ? null : value;
      });
    },
    _disableDatepicker: function(target) {
      var nodeName,
        inline,
        $target = $(target),
        inst = $.data(target, "datepicker");
      if (!$target.hasClass(this.markerClassName)) {
        return;
      }
      nodeName = target.nodeName.toLowerCase();
      if (nodeName === "input") {
        target.disabled = true;
        inst.trigger
          .filter("button")
          .each(function() {
            this.disabled = true;
          })
          .end()
          .filter("img")
          .css({ opacity: "0.5", cursor: "default" });
      } else if (nodeName === "div" || nodeName === "span") {
        inline = $target.children("." + this._inlineClass);
        inline.children().addClass("ui-state-disabled");
        inline
          .find("select.ui-datepicker-month, select.ui-datepicker-year")
          .prop("disabled", true);
      }
      this._disabledInputs = $.map(this._disabledInputs, function(value) {
        return value === target ? null : value;
      });
      this._disabledInputs[this._disabledInputs.length] = target;
    },
    _isDisabledDatepicker: function(target) {
      if (!target) {
        return false;
      }
      for (var i = 0; i < this._disabledInputs.length; i++) {
        if (this._disabledInputs[i] === target) {
          return true;
        }
      }
      return false;
    },
    _getInst: function(target) {
      try {
        return $.data(target, "datepicker");
      } catch (err) {
        throw "Missing instance data for this datepicker";
      }
    },
    _optionDatepicker: function(target, name, value) {
      var settings,
        date,
        minDate,
        maxDate,
        inst = this._getInst(target);
      if (arguments.length === 2 && typeof name === "string") {
        return name === "defaults"
          ? $.extend({}, $.datepicker._defaults)
          : inst
          ? name === "all"
            ? $.extend({}, inst.settings)
            : this._get(inst, name)
          : null;
      }
      settings = name || {};
      if (typeof name === "string") {
        settings = {};
        settings[name] = value;
      }
      if (inst) {
        if (this._curInst === inst) {
          this._hideDatepicker();
        }
        date = this._getDateDatepicker(target, true);
        minDate = this._getMinMaxDate(inst, "min");
        maxDate = this._getMinMaxDate(inst, "max");
        datepicker_extendRemove(inst.settings, settings);
        if (
          minDate !== null &&
          settings.dateFormat !== undefined &&
          settings.minDate === undefined
        ) {
          inst.settings.minDate = this._formatDate(inst, minDate);
        }
        if (
          maxDate !== null &&
          settings.dateFormat !== undefined &&
          settings.maxDate === undefined
        ) {
          inst.settings.maxDate = this._formatDate(inst, maxDate);
        }
        if ("disabled" in settings) {
          if (settings.disabled) {
            this._disableDatepicker(target);
          } else {
            this._enableDatepicker(target);
          }
        }
        this._attachments($(target), inst);
        this._autoSize(inst);
        this._setDate(inst, date);
        this._updateAlternate(inst);
        this._updateDatepicker(inst);
      }
    },
    _changeDatepicker: function(target, name, value) {
      this._optionDatepicker(target, name, value);
    },
    _refreshDatepicker: function(target) {
      var inst = this._getInst(target);
      if (inst) {
        this._updateDatepicker(inst);
      }
    },
    _setDateDatepicker: function(target, date) {
      var inst = this._getInst(target);
      if (inst) {
        this._setDate(inst, date);
        this._updateDatepicker(inst);
        this._updateAlternate(inst);
      }
    },
    _getDateDatepicker: function(target, noDefault) {
      var inst = this._getInst(target);
      if (inst && !inst.inline) {
        this._setDateFromField(inst, noDefault);
      }
      return inst ? this._getDate(inst) : null;
    },
    _doKeyDown: function(event) {
      var onSelect,
        dateStr,
        sel,
        inst = $.datepicker._getInst(event.target),
        handled = true,
        isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
      inst._keyEvent = true;
      if ($.datepicker._datepickerShowing) {
        switch (event.keyCode) {
          case 9:
            $.datepicker._hideDatepicker();
            handled = false;
            break;
          case 13:
            sel = $(
              "td." +
                $.datepicker._dayOverClass +
                ":not(." +
                $.datepicker._currentClass +
                ")",
              inst.dpDiv
            );
            if (sel[0]) {
              $.datepicker._selectDay(
                event.target,
                inst.selectedMonth,
                inst.selectedYear,
                sel[0]
              );
            }
            onSelect = $.datepicker._get(inst, "onSelect");
            if (onSelect) {
              dateStr = $.datepicker._formatDate(inst);
              onSelect.apply(inst.input ? inst.input[0] : null, [
                dateStr,
                inst
              ]);
            } else {
              $.datepicker._hideDatepicker();
            }
            return false;
          case 27:
            $.datepicker._hideDatepicker();
            break;
          case 33:
            $.datepicker._adjustDate(
              event.target,
              event.ctrlKey
                ? -$.datepicker._get(inst, "stepBigMonths")
                : -$.datepicker._get(inst, "stepMonths"),
              "M"
            );
            break;
          case 34:
            $.datepicker._adjustDate(
              event.target,
              event.ctrlKey
                ? +$.datepicker._get(inst, "stepBigMonths")
                : +$.datepicker._get(inst, "stepMonths"),
              "M"
            );
            break;
          case 35:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._clearDate(event.target);
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          case 36:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._gotoToday(event.target);
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          case 37:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, isRTL ? +1 : -1, "D");
            }
            handled = event.ctrlKey || event.metaKey;
            if (event.originalEvent.altKey) {
              $.datepicker._adjustDate(
                event.target,
                event.ctrlKey
                  ? -$.datepicker._get(inst, "stepBigMonths")
                  : -$.datepicker._get(inst, "stepMonths"),
                "M"
              );
            }
            break;
          case 38:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, -7, "D");
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          case 39:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, isRTL ? -1 : +1, "D");
            }
            handled = event.ctrlKey || event.metaKey;
            if (event.originalEvent.altKey) {
              $.datepicker._adjustDate(
                event.target,
                event.ctrlKey
                  ? +$.datepicker._get(inst, "stepBigMonths")
                  : +$.datepicker._get(inst, "stepMonths"),
                "M"
              );
            }
            break;
          case 40:
            if (event.ctrlKey || event.metaKey) {
              $.datepicker._adjustDate(event.target, +7, "D");
            }
            handled = event.ctrlKey || event.metaKey;
            break;
          default:
            handled = false;
        }
      } else if (event.keyCode === 36 && event.ctrlKey) {
        $.datepicker._showDatepicker(this);
      } else {
        handled = false;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    _doKeyPress: function(event) {
      var chars,
        chr,
        inst = $.datepicker._getInst(event.target);
      if ($.datepicker._get(inst, "constrainInput")) {
        chars = $.datepicker._possibleChars(
          $.datepicker._get(inst, "dateFormat")
        );
        chr = String.fromCharCode(
          event.charCode == null ? event.keyCode : event.charCode
        );
        return (
          event.ctrlKey ||
          event.metaKey ||
          chr < " " || !chars || chars.indexOf(chr) > -1
        );
      }
    },
    _doKeyUp: function(event) {
      var date,
        inst = $.datepicker._getInst(event.target);
      if (inst.input.val() !== inst.lastVal) {
        try {
          date = $.datepicker.parseDate(
            $.datepicker._get(inst, "dateFormat"),
            inst.input ? inst.input.val() : null,
            $.datepicker._getFormatConfig(inst)
          );
          if (date) {
            $.datepicker._setDateFromField(inst);
            $.datepicker._updateAlternate(inst);
            $.datepicker._updateDatepicker(inst);
          }
        } catch (err) {}
      }
      return true;
    },
    _showDatepicker: function(input) {
      input = input.target || input;
      if (input.nodeName.toLowerCase() !== "input") {
        input = $("input", input.parentNode)[0];
      }
      if (
        $.datepicker._isDisabledDatepicker(input) ||
        $.datepicker._lastInput === input
      ) {
        return;
      }
      var inst,
        beforeShow,
        beforeShowSettings,
        isFixed,
        offset,
        showAnim,
        duration;
      inst = $.datepicker._getInst(input);
      if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
        $.datepicker._curInst.dpDiv.stop(true, true);
        if (inst && $.datepicker._datepickerShowing) {
          $.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
        }
      }
      beforeShow = $.datepicker._get(inst, "beforeShow");
      beforeShowSettings = beforeShow
        ? beforeShow.apply(input, [input, inst])
        : {};
      if (beforeShowSettings === false) {
        return;
      }
      datepicker_extendRemove(inst.settings, beforeShowSettings);
      inst.lastVal = null;
      $.datepicker._lastInput = input;
      $.datepicker._setDateFromField(inst);
      if ($.datepicker._inDialog) {
        input.value = "";
      }
      if (!$.datepicker._pos) {
        $.datepicker._pos = $.datepicker._findPos(input);
        $.datepicker._pos[1] += input.offsetHeight;
      }
      isFixed = false;
      $(input)
        .parents()
        .each(function() {
          isFixed |= $(this).css("position") === "fixed";
          return !isFixed;
        });
      offset = { left: $.datepicker._pos[0], top: $.datepicker._pos[1] };
      $.datepicker._pos = null;
      inst.dpDiv.empty();
      inst.dpDiv.css({
        position: "absolute",
        display: "block",
        top: "-1000px"
      });
      $.datepicker._updateDatepicker(inst);
      offset = $.datepicker._checkOffset(inst, offset, isFixed);
      inst.dpDiv.css({
        position:
          $.datepicker._inDialog && $.blockUI
            ? "static"
            : isFixed
            ? "fixed"
            : "absolute",
        display: "none",
        left: offset.left + "px",
        top: offset.top + "px"
      });
      if (!inst.inline) {
        showAnim = $.datepicker._get(inst, "showAnim");
        duration = $.datepicker._get(inst, "duration");
        inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
        $.datepicker._datepickerShowing = true;
        if ($.effects && $.effects.effect[showAnim]) {
          inst.dpDiv.show(
            showAnim,
            $.datepicker._get(inst, "showOptions"),
            duration
          );
        } else {
          inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
        }
        if ($.datepicker._shouldFocusInput(inst)) {
          inst.input.focus();
        }
        $.datepicker._curInst = inst;
      }
    },
    _updateDatepicker: function(inst) {
      this.maxRows = 4;
      datepicker_instActive = inst;
      inst.dpDiv.empty().append(this._generateHTML(inst));
      this._attachHandlers(inst);
      var origyearshtml,
        numMonths = this._getNumberOfMonths(inst),
        cols = numMonths[1],
        width = 17,
        activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");
      if (activeCell.length > 0) {
        datepicker_handleMouseover.apply(activeCell.get(0));
      }
      inst.dpDiv
        .removeClass(
          "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
        )
        .width("");
      if (cols > 1) {
        inst.dpDiv
          .addClass("ui-datepicker-multi-" + cols)
          .css("width", width * cols + "em");
      }
      inst.dpDiv[
        (numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") + "Class"
      ]("ui-datepicker-multi");
      inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"](
        "ui-datepicker-rtl"
      );
      if (
        inst === $.datepicker._curInst &&
        $.datepicker._datepickerShowing &&
        $.datepicker._shouldFocusInput(inst)
      ) {
        inst.input.focus();
      }
      if (inst.yearshtml) {
        origyearshtml = inst.yearshtml;
        setTimeout(function() {
          if (origyearshtml === inst.yearshtml && inst.yearshtml) {
            inst.dpDiv
              .find("select.ui-datepicker-year:first")
              .replaceWith(inst.yearshtml);
          }
          origyearshtml = inst.yearshtml = null;
        }, 0);
      }
    },
    _shouldFocusInput: function(inst) {
      return (
        inst.input &&
        inst.input.is(":visible") &&
        !inst.input.is(":disabled") &&
        !inst.input.is(":focus")
      );
    },
    _checkOffset: function(inst, offset, isFixed) {
      var dpWidth = inst.dpDiv.outerWidth(),
        dpHeight = inst.dpDiv.outerHeight(),
        inputWidth = inst.input ? inst.input.outerWidth() : 0,
        inputHeight = inst.input ? inst.input.outerHeight() : 0,
        viewWidth =
          document.documentElement.clientWidth +
          (isFixed ? 0 : $(document).scrollLeft()),
        viewHeight =
          document.documentElement.clientHeight +
          (isFixed ? 0 : $(document).scrollTop());
      offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0;
      offset.left -=
        isFixed && offset.left === inst.input.offset().left
          ? $(document).scrollLeft()
          : 0;
      offset.top -=
        isFixed && offset.top === inst.input.offset().top + inputHeight
          ? $(document).scrollTop()
          : 0;
      offset.left -= Math.min(
        offset.left,
        offset.left + dpWidth > viewWidth && viewWidth > dpWidth
          ? Math.abs(offset.left + dpWidth - viewWidth)
          : 0
      );
      offset.top -= Math.min(
        offset.top,
        offset.top + dpHeight > viewHeight && viewHeight > dpHeight
          ? Math.abs(dpHeight + inputHeight)
          : 0
      );
      return offset;
    },
    _findPos: function(obj) {
      var position,
        inst = this._getInst(obj),
        isRTL = this._get(inst, "isRTL");
      while (
        obj &&
        (obj.type === "hidden" ||
          obj.nodeType !== 1 ||
          $.expr.filters.hidden(obj))
      ) {
        obj = obj[isRTL ? "previousSibling" : "nextSibling"];
      }
      position = $(obj).offset();
      return [position.left, position.top];
    },
    _hideDatepicker: function(input) {
      var showAnim,
        duration,
        postProcess,
        onClose,
        inst = this._curInst;
      if (!inst || (input && inst !== $.data(input, "datepicker"))) {
        return;
      }
      if (this._datepickerShowing) {
        showAnim = this._get(inst, "showAnim");
        duration = this._get(inst, "duration");
        postProcess = function() {
          $.datepicker._tidyDialog(inst);
        };
        if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
          inst.dpDiv.hide(
            showAnim,
            $.datepicker._get(inst, "showOptions"),
            duration,
            postProcess
          );
        } else {
          inst.dpDiv[
            showAnim === "slideDown"
              ? "slideUp"
              : showAnim === "fadeIn"
              ? "fadeOut"
              : "hide"
          ](showAnim ? duration : null, postProcess);
        }
        if (!showAnim) {
          postProcess();
        }
        this._datepickerShowing = false;
        onClose = this._get(inst, "onClose");
        if (onClose) {
          onClose.apply(inst.input ? inst.input[0] : null, [
            inst.input ? inst.input.val() : "",
            inst
          ]);
        }
        this._lastInput = null;
        if (this._inDialog) {
          this._dialogInput.css({
            position: "absolute",
            left: "0",
            top: "-100px"
          });
          if ($.blockUI) {
            $.unblockUI();
            $("body").append(this.dpDiv);
          }
        }
        this._inDialog = false;
      }
    },
    _tidyDialog: function(inst) {
      inst.dpDiv
        .removeClass(this._dialogClass)
        .unbind(".ui-datepicker-calendar");
    },
    _checkExternalClick: function(event) {
      if (!$.datepicker._curInst) {
        return;
      }
      var $target = $(event.target),
        inst = $.datepicker._getInst($target[0]);
      if (
        ($target[0].id !== $.datepicker._mainDivId &&
          $target.parents("#" + $.datepicker._mainDivId).length === 0 &&
          !$target.hasClass($.datepicker.markerClassName) &&
          !$target.closest("." + $.datepicker._triggerClass).length &&
          $.datepicker._datepickerShowing &&
          !($.datepicker._inDialog && $.blockUI)) ||
        ($target.hasClass($.datepicker.markerClassName) &&
          $.datepicker._curInst !== inst)
      ) {
        $.datepicker._hideDatepicker();
      }
    },
    _adjustDate: function(id, offset, period) {
      var target = $(id),
        inst = this._getInst(target[0]);
      if (this._isDisabledDatepicker(target[0])) {
        return;
      }
      this._adjustInstDate(
        inst,
        offset + (period === "M" ? this._get(inst, "showCurrentAtPos") : 0),
        period
      );
      this._updateDatepicker(inst);
    },
    _gotoToday: function(id) {
      var date,
        target = $(id),
        inst = this._getInst(target[0]);
      if (this._get(inst, "gotoCurrent") && inst.currentDay) {
        inst.selectedDay = inst.currentDay;
        inst.drawMonth = inst.selectedMonth = inst.currentMonth;
        inst.drawYear = inst.selectedYear = inst.currentYear;
      } else {
        date = new Date();
        inst.selectedDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = date.getFullYear();
      }
      this._notifyChange(inst);
      this._adjustDate(target);
    },
    _selectMonthYear: function(id, select, period) {
      var target = $(id),
        inst = this._getInst(target[0]);
      inst["selected" + (period === "M" ? "Month" : "Year")] = inst[
        "draw" + (period === "M" ? "Month" : "Year")
      ] = parseInt(select.options[select.selectedIndex].value, 10);
      this._notifyChange(inst);
      this._adjustDate(target);
    },
    _selectDay: function(id, month, year, td) {
      var inst,
        target = $(id);
      if (
        $(td).hasClass(this._unselectableClass) ||
        this._isDisabledDatepicker(target[0])
      ) {
        return;
      }
      inst = this._getInst(target[0]);
      inst.selectedDay = inst.currentDay = $("a", td).html();
      inst.selectedMonth = inst.currentMonth = month;
      inst.selectedYear = inst.currentYear = year;
      this._selectDate(
        id,
        this._formatDate(
          inst,
          inst.currentDay,
          inst.currentMonth,
          inst.currentYear
        )
      );
    },
    _clearDate: function(id) {
      var target = $(id);
      this._selectDate(target, "");
    },
    _selectDate: function(id, dateStr) {
      var onSelect,
        target = $(id),
        inst = this._getInst(target[0]);
      dateStr = dateStr != null ? dateStr : this._formatDate(inst);
      if (inst.input) {
        inst.input.val(dateStr);
      }
      this._updateAlternate(inst);
      onSelect = this._get(inst, "onSelect");
      if (onSelect) {
        onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]);
      } else if (inst.input) {
        inst.input.trigger("change");
      }
      if (inst.inline) {
        this._updateDatepicker(inst);
      } else {
        this._hideDatepicker();
        this._lastInput = inst.input[0];
        if (typeof inst.input[0] !== "object") {
          inst.input.focus();
        }
        this._lastInput = null;
      }
    },
    _updateAlternate: function(inst) {
      var altFormat,
        date,
        dateStr,
        altField = this._get(inst, "altField");
      if (altField) {
        altFormat =
          this._get(inst, "altFormat") || this._get(inst, "dateFormat");
        date = this._getDate(inst);
        dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
        $(altField).each(function() {
          $(this).val(dateStr);
        });
      }
    },
    noWeekends: function(date) {
      var day = date.getDay();
      return [day > 0 && day < 6, ""];
    },
    iso8601Week: function(date) {
      var time,
        checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
    },
    parseDate: function(format, value, settings) {
      if (format == null || value == null) {
        throw "Invalid arguments";
      }
      value = typeof value === "object" ? value.toString() : value + "";
      if (value === "") {
        return null;
      }
      var iFormat,
        dim,
        extra,
        iValue = 0,
        shortYearCutoffTemp =
          (settings ? settings.shortYearCutoff : null) ||
          this._defaults.shortYearCutoff,
        shortYearCutoff =
          typeof shortYearCutoffTemp !== "string"
            ? shortYearCutoffTemp
            : (new Date().getFullYear() % 100) +
              parseInt(shortYearCutoffTemp, 10),
        dayNamesShort =
          (settings ? settings.dayNamesShort : null) ||
          this._defaults.dayNamesShort,
        dayNames =
          (settings ? settings.dayNames : null) || this._defaults.dayNames,
        monthNamesShort =
          (settings ? settings.monthNamesShort : null) ||
          this._defaults.monthNamesShort,
        monthNames =
          (settings ? settings.monthNames : null) || this._defaults.monthNames,
        year = -1,
        month = -1,
        day = -1,
        doy = -1,
        literal = false,
        date,
        lookAhead = function(match) {
          var matches =
            iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        },
        getNumber = function(match) {
          var isDoubled = lookAhead(match),
            size =
              match === "@"
                ? 14
                : match === "!"
                ? 20
                : match === "y" && isDoubled
                ? 4
                : match === "o"
                ? 3
                : 2,
            minSize = match === "y" ? size : 1,
            digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
            num = value.substring(iValue).match(digits);
          if (!num) {
            throw "Missing number at position " + iValue;
          }
          iValue += num[0].length;
          return parseInt(num[0], 10);
        },
        getName = function(match, shortNames, longNames) {
          var index = -1,
            names = $.map(lookAhead(match) ? longNames : shortNames, function(
              v,
              k
            ) {
              return [[k, v]];
            }).sort(function(a, b) {
              return -(a[1].length - b[1].length);
            });
          $.each(names, function(i, pair) {
            var name = pair[1];
            if (
              value.substr(iValue, name.length).toLowerCase() ===
              name.toLowerCase()
            ) {
              index = pair[0];
              iValue += name.length;
              return false;
            }
          });
          if (index !== -1) {
            return index + 1;
          } else {
            throw "Unknown name at position " + iValue;
          }
        },
        checkLiteral = function() {
          if (value.charAt(iValue) !== format.charAt(iFormat)) {
            throw "Unexpected literal at position " + iValue;
          }
          iValue++;
        };
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
              day = getNumber("d");
              break;
            case "D":
              getName("D", dayNamesShort, dayNames);
              break;
            case "o":
              doy = getNumber("o");
              break;
            case "m":
              month = getNumber("m");
              break;
            case "M":
              month = getName("M", monthNamesShort, monthNames);
              break;
            case "y":
              year = getNumber("y");
              break;
            case "@":
              date = new Date(getNumber("@"));
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "!":
              date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
              year = date.getFullYear();
              month = date.getMonth() + 1;
              day = date.getDate();
              break;
            case "'":
              if (lookAhead("'")) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        extra = value.substr(iValue);
        if (!/^\s+/.test(extra)) {
          throw "Extra/unparsed characters found in date: " + extra;
        }
      }
      if (year === -1) {
        year = new Date().getFullYear();
      } else if (year < 100) {
        year +=
          new Date().getFullYear() -
          (new Date().getFullYear() % 100) +
          (year <= shortYearCutoff ? 0 : -100);
      }
      if (doy > -1) {
        month = 1;
        day = doy;
        do {
          dim = this._getDaysInMonth(year, month - 1);
          if (day <= dim) {
            break;
          }
          month++;
          day -= dim;
        } while (true);
      }
      date = this._daylightSavingAdjust(new Date(year, month - 1, day));
      if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
      ) {
        throw "Invalid date";
      }
      return date;
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970:
      ((1970 - 1) * 365 +
        Math.floor(1970 / 4) -
        Math.floor(1970 / 100) +
        Math.floor(1970 / 400)) *
      24 *
      60 *
      60 *
      10000000,
    formatDate: function(format, date, settings) {
      if (!date) {
        return "";
      }
      var iFormat,
        dayNamesShort =
          (settings ? settings.dayNamesShort : null) ||
          this._defaults.dayNamesShort,
        dayNames =
          (settings ? settings.dayNames : null) || this._defaults.dayNames,
        monthNamesShort =
          (settings ? settings.monthNamesShort : null) ||
          this._defaults.monthNamesShort,
        monthNames =
          (settings ? settings.monthNames : null) || this._defaults.monthNames,
        lookAhead = function(match) {
          var matches =
            iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        },
        formatNumber = function(match, value, len) {
          var num = "" + value;
          if (lookAhead(match)) {
            while (num.length < len) {
              num = "0" + num;
            }
          }
          return num;
        },
        formatName = function(match, value, shortNames, longNames) {
          return lookAhead(match) ? longNames[value] : shortNames[value];
        },
        output = "",
        literal = false;
      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
              literal = false;
            } else {
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case "d":
                output += formatNumber("d", date.getDate(), 2);
                break;
              case "D":
                output += formatName(
                  "D",
                  date.getDay(),
                  dayNamesShort,
                  dayNames
                );
                break;
              case "o":
                output += formatNumber(
                  "o",
                  Math.round(
                    (new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate()
                    ).getTime() -
                      new Date(date.getFullYear(), 0, 0).getTime()) /
                      86400000
                  ),
                  3
                );
                break;
              case "m":
                output += formatNumber("m", date.getMonth() + 1, 2);
                break;
              case "M":
                output += formatName(
                  "M",
                  date.getMonth(),
                  monthNamesShort,
                  monthNames
                );
                break;
              case "y":
                output += lookAhead("y")
                  ? date.getFullYear()
                  : (date.getYear() % 100 < 10 ? "0" : "") +
                    (date.getYear() % 100);
                break;
              case "@":
                output += date.getTime();
                break;
              case "!":
                output += date.getTime() * 10000 + this._ticksTo1970;
                break;
              case "'":
                if (lookAhead("'")) {
                  output += "'";
                } else {
                  literal = true;
                }
                break;
              default:
                output += format.charAt(iFormat);
            }
          }
        }
      }
      return output;
    },
    _possibleChars: function(format) {
      var iFormat,
        chars = "",
        literal = false,
        lookAhead = function(match) {
          var matches =
            iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
          if (matches) {
            iFormat++;
          }
          return matches;
        };
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            chars += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
            case "m":
            case "y":
            case "@":
              chars += "0123456789";
              break;
            case "D":
            case "M":
              return null;
            case "'":
              if (lookAhead("'")) {
                chars += "'";
              } else {
                literal = true;
              }
              break;
            default:
              chars += format.charAt(iFormat);
          }
        }
      }
      return chars;
    },
    _get: function(inst, name) {
      return inst.settings[name] !== undefined
        ? inst.settings[name]
        : this._defaults[name];
    },
    _setDateFromField: function(inst, noDefault) {
      if (inst.input.val() === inst.lastVal) {
        return;
      }
      var dateFormat = this._get(inst, "dateFormat"),
        dates = (inst.lastVal = inst.input ? inst.input.val() : null),
        defaultDate = this._getDefaultDate(inst),
        date = defaultDate,
        settings = this._getFormatConfig(inst);
      try {
        date = this.parseDate(dateFormat, dates, settings) || defaultDate;
      } catch (event) {
        dates = noDefault ? "" : dates;
      }
      inst.selectedDay = date.getDate();
      inst.drawMonth = inst.selectedMonth = date.getMonth();
      inst.drawYear = inst.selectedYear = date.getFullYear();
      inst.currentDay = dates ? date.getDate() : 0;
      inst.currentMonth = dates ? date.getMonth() : 0;
      inst.currentYear = dates ? date.getFullYear() : 0;
      this._adjustInstDate(inst);
    },
    _getDefaultDate: function(inst) {
      return this._restrictMinMax(
        inst,
        this._determineDate(inst, this._get(inst, "defaultDate"), new Date())
      );
    },
    _determineDate: function(inst, date, defaultDate) {
      var offsetNumeric = function(offset) {
          var date = new Date();
          date.setDate(date.getDate() + offset);
          return date;
        },
        offsetString = function(offset) {
          try {
            return $.datepicker.parseDate(
              $.datepicker._get(inst, "dateFormat"),
              offset,
              $.datepicker._getFormatConfig(inst)
            );
          } catch (e) {}
          var date =
              (offset.toLowerCase().match(/^c/)
                ? $.datepicker._getDate(inst)
                : null) || new Date(),
            year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
            matches = pattern.exec(offset);
          while (matches) {
            switch (matches[2] || "d") {
              case "d":
              case "D":
                day += parseInt(matches[1], 10);
                break;
              case "w":
              case "W":
                day += parseInt(matches[1], 10) * 7;
                break;
              case "m":
              case "M":
                month += parseInt(matches[1], 10);
                day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                break;
              case "y":
              case "Y":
                year += parseInt(matches[1], 10);
                day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                break;
            }
            matches = pattern.exec(offset);
          }
          return new Date(year, month, day);
        },
        newDate =
          date == null || date === ""
            ? defaultDate
            : typeof date === "string"
            ? offsetString(date)
            : typeof date === "number"
            ? isNaN(date)
              ? defaultDate
              : offsetNumeric(date)
            : new Date(date.getTime());
      newDate =
        newDate && newDate.toString() === "Invalid Date"
          ? defaultDate
          : newDate;
      if (newDate) {
        newDate.setHours(0);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
      }
      return this._daylightSavingAdjust(newDate);
    },
    _daylightSavingAdjust: function(date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    },
    _setDate: function(inst, date, noChange) {
      var clear = !date,
        origMonth = inst.selectedMonth,
        origYear = inst.selectedYear,
        newDate = this._restrictMinMax(
          inst,
          this._determineDate(inst, date, new Date())
        );
      inst.selectedDay = inst.currentDay = newDate.getDate();
      inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
      inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
      if (
        (origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) &&
        !noChange
      ) {
        this._notifyChange(inst);
      }
      this._adjustInstDate(inst);
      if (inst.input) {
        inst.input.val(clear ? "" : this._formatDate(inst));
      }
    },
    _getDate: function(inst) {
      var startDate =
        !inst.currentYear || (inst.input && inst.input.val() === "")
          ? null
          : this._daylightSavingAdjust(
              new Date(inst.currentYear, inst.currentMonth, inst.currentDay)
            );
      return startDate;
    },
    _attachHandlers: function(inst) {
      var stepMonths = this._get(inst, "stepMonths"),
        id = "#" + inst.id.replace(/\\\\/g, "\\");
      inst.dpDiv.find("[data-handler]").map(function() {
        var handler = {
          prev: function() {
            $.datepicker._adjustDate(id, -stepMonths, "M");
          },
          next: function() {
            $.datepicker._adjustDate(id, +stepMonths, "M");
          },
          hide: function() {
            $.datepicker._hideDatepicker();
          },
          today: function() {
            $.datepicker._gotoToday(id);
          },
          selectDay: function() {
            $.datepicker._selectDay(
              id,
              +this.getAttribute("data-month"),
              +this.getAttribute("data-year"),
              this
            );
            return false;
          },
          selectMonth: function() {
            $.datepicker._selectMonthYear(id, this, "M");
            return false;
          },
          selectYear: function() {
            $.datepicker._selectMonthYear(id, this, "Y");
            return false;
          }
        };
        $(this).bind(
          this.getAttribute("data-event"),
          handler[this.getAttribute("data-handler")]
        );
      });
    },
    _generateHTML: function(inst) {
      var maxDraw,
        prevText,
        prev,
        nextText,
        next,
        currentText,
        gotoDate,
        controls,
        buttonPanel,
        firstDay,
        showWeek,
        dayNames,
        dayNamesMin,
        monthNames,
        monthNamesShort,
        beforeShowDay,
        showOtherMonths,
        selectOtherMonths,
        defaultDate,
        html,
        dow,
        row,
        group,
        col,
        selectedDate,
        cornerClass,
        calender,
        thead,
        day,
        daysInMonth,
        leadDays,
        curRows,
        numRows,
        printDate,
        dRow,
        tbody,
        daySettings,
        otherMonth,
        unselectable,
        tempDate = new Date(),
        today = this._daylightSavingAdjust(
          new Date(
            tempDate.getFullYear(),
            tempDate.getMonth(),
            tempDate.getDate()
          )
        ),
        isRTL = this._get(inst, "isRTL"),
        showButtonPanel = this._get(inst, "showButtonPanel"),
        hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
        navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
        numMonths = this._getNumberOfMonths(inst),
        showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
        stepMonths = this._get(inst, "stepMonths"),
        isMultiMonth = numMonths[0] !== 1 || numMonths[1] !== 1,
        currentDate = this._daylightSavingAdjust(
          !inst.currentDay
            ? new Date(9999, 9, 9)
            : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)
        ),
        minDate = this._getMinMaxDate(inst, "min"),
        maxDate = this._getMinMaxDate(inst, "max"),
        drawMonth = inst.drawMonth - showCurrentAtPos,
        drawYear = inst.drawYear;
      if (drawMonth < 0) {
        drawMonth += 12;
        drawYear--;
      }
      if (maxDate) {
        maxDraw = this._daylightSavingAdjust(
          new Date(
            maxDate.getFullYear(),
            maxDate.getMonth() - numMonths[0] * numMonths[1] + 1,
            maxDate.getDate()
          )
        );
        maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
        while (
          this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw
        ) {
          drawMonth--;
          if (drawMonth < 0) {
            drawMonth = 11;
            drawYear--;
          }
        }
      }
      inst.drawMonth = drawMonth;
      inst.drawYear = drawYear;
      prevText = this._get(inst, "prevText");
      prevText = !navigationAsDateFormat
        ? prevText
        : this.formatDate(
            prevText,
            this._daylightSavingAdjust(
              new Date(drawYear, drawMonth - stepMonths, 1)
            ),
            this._getFormatConfig(inst)
          );
      prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth)
        ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
          " title='" +
          prevText +
          "'><span class='ui-icon ui-icon-circle-triangle-" +
          (isRTL ? "e" : "w") +
          "'>" +
          prevText +
          "</span></a>"
        : hideIfNoPrevNext
        ? ""
        : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
          prevText +
          "'><span class='ui-icon ui-icon-circle-triangle-" +
          (isRTL ? "e" : "w") +
          "'>" +
          prevText +
          "</span></a>";
      nextText = this._get(inst, "nextText");
      nextText = !navigationAsDateFormat
        ? nextText
        : this.formatDate(
            nextText,
            this._daylightSavingAdjust(
              new Date(drawYear, drawMonth + stepMonths, 1)
            ),
            this._getFormatConfig(inst)
          );
      next = this._canAdjustMonth(inst, +1, drawYear, drawMonth)
        ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
          " title='" +
          nextText +
          "'><span class='ui-icon ui-icon-circle-triangle-" +
          (isRTL ? "w" : "e") +
          "'>" +
          nextText +
          "</span></a>"
        : hideIfNoPrevNext
        ? ""
        : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
          nextText +
          "'><span class='ui-icon ui-icon-circle-triangle-" +
          (isRTL ? "w" : "e") +
          "'>" +
          nextText +
          "</span></a>";
      currentText = this._get(inst, "currentText");
      gotoDate =
        this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
      currentText = !navigationAsDateFormat
        ? currentText
        : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));
      controls = !inst.inline
        ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
          this._get(inst, "closeText") +
          "</button>"
        : "";
      buttonPanel = showButtonPanel
        ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
          (isRTL ? controls : "") +
          (this._isInRange(inst, gotoDate)
            ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
              ">" +
              currentText +
              "</button>"
            : "") +
          (isRTL ? "" : controls) +
          "</div>"
        : "";
      firstDay = parseInt(this._get(inst, "firstDay"), 10);
      firstDay = isNaN(firstDay) ? 0 : firstDay;
      showWeek = this._get(inst, "showWeek");
      dayNames = this._get(inst, "dayNames");
      dayNamesMin = this._get(inst, "dayNamesMin");
      monthNames = this._get(inst, "monthNames");
      monthNamesShort = this._get(inst, "monthNamesShort");
      beforeShowDay = this._get(inst, "beforeShowDay");
      showOtherMonths = this._get(inst, "showOtherMonths");
      selectOtherMonths = this._get(inst, "selectOtherMonths");
      defaultDate = this._getDefaultDate(inst);
      html = "";
      dow;
      for (row = 0; row < numMonths[0]; row++) {
        group = "";
        this.maxRows = 4;
        for (col = 0; col < numMonths[1]; col++) {
          selectedDate = this._daylightSavingAdjust(
            new Date(drawYear, drawMonth, inst.selectedDay)
          );
          cornerClass = " ui-corner-all";
          calender = "";
          if (isMultiMonth) {
            calender += "<div class='ui-datepicker-group";
            if (numMonths[1] > 1) {
              switch (col) {
                case 0:
                  calender += " ui-datepicker-group-first";
                  cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                  break;
                case numMonths[1] - 1:
                  calender += " ui-datepicker-group-last";
                  cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                  break;
                default:
                  calender += " ui-datepicker-group-middle";
                  cornerClass = "";
                  break;
              }
            }
            calender += "'>";
          }
          calender +=
            "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
            cornerClass +
            "'>" +
            (/all|left/.test(cornerClass) && row === 0
              ? isRTL
                ? next
                : prev
              : "") +
            (/all|right/.test(cornerClass) && row === 0
              ? isRTL
                ? prev
                : next
              : "") +
            this._generateMonthYearHeader(
              inst,
              drawMonth,
              drawYear,
              minDate,
              maxDate,
              row > 0 || col > 0,
              monthNames,
              monthNamesShort
            ) +
            "</div><table class='ui-datepicker-calendar'><thead>" +
            "<tr>";
          thead = showWeek
            ? "<th class='ui-datepicker-week-col'>" +
              this._get(inst, "weekHeader") +
              "</th>"
            : "";
          for (dow = 0; dow < 7; dow++) {
            day = (dow + firstDay) % 7;
            thead +=
              "<th scope='col'" +
              ((dow + firstDay + 6) % 7 >= 5
                ? " class='ui-datepicker-week-end'"
                : "") +
              ">" +
              "<span title='" +
              dayNames[day] +
              "'>" +
              dayNamesMin[day] +
              "</span></th>";
          }
          calender += thead + "</tr></thead><tbody>";
          daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
          if (
            drawYear === inst.selectedYear &&
            drawMonth === inst.selectedMonth
          ) {
            inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
          }
          leadDays =
            (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
          curRows = Math.ceil((leadDays + daysInMonth) / 7);
          numRows = isMultiMonth
            ? this.maxRows > curRows
              ? this.maxRows
              : curRows
            : curRows;
          this.maxRows = numRows;
          printDate = this._daylightSavingAdjust(
            new Date(drawYear, drawMonth, 1 - leadDays)
          );
          for (dRow = 0; dRow < numRows; dRow++) {
            calender += "<tr>";
            tbody = !showWeek
              ? ""
              : "<td class='ui-datepicker-week-col'>" +
                this._get(inst, "calculateWeek")(printDate) +
                "</td>";
            for (dow = 0; dow < 7; dow++) {
              daySettings = beforeShowDay
                ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [
                    printDate
                  ])
                : [true, ""];
              otherMonth = printDate.getMonth() !== drawMonth;
              unselectable =
                (otherMonth && !selectOtherMonths) ||
                !daySettings[0] ||
                (minDate && printDate < minDate) ||
                (maxDate && printDate > maxDate);
              tbody +=
                "<td class='" +
                ((dow + firstDay + 6) % 7 >= 5
                  ? " ui-datepicker-week-end"
                  : "") +
                (otherMonth ? " ui-datepicker-other-month" : "") +
                ((printDate.getTime() === selectedDate.getTime() &&
                  drawMonth === inst.selectedMonth &&
                  inst._keyEvent) ||
                (defaultDate.getTime() === printDate.getTime() &&
                  defaultDate.getTime() === selectedDate.getTime())
                  ? " " + this._dayOverClass
                  : "") +
                (unselectable
                  ? " " + this._unselectableClass + " ui-state-disabled"
                  : "") +
                (otherMonth && !showOtherMonths
                  ? ""
                  : " " +
                    daySettings[1] +
                    (printDate.getTime() === currentDate.getTime()
                      ? " " + this._currentClass
                      : "") +
                    (printDate.getTime() === today.getTime()
                      ? " ui-datepicker-today"
                      : "")) +
                "'" +
                ((!otherMonth || showOtherMonths) && daySettings[2]
                  ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'"
                  : "") +
                (unselectable
                  ? ""
                  : " data-handler='selectDay' data-event='click' data-month='" +
                    printDate.getMonth() +
                    "' data-year='" +
                    printDate.getFullYear() +
                    "'") +
                ">" +
                (otherMonth && !showOtherMonths
                  ? "&#xa0;"
                  : unselectable
                  ? "<span class='ui-state-default'>" +
                    printDate.getDate() +
                    "</span>"
                  : "<a class='ui-state-default" +
                    (printDate.getTime() === today.getTime()
                      ? " ui-state-highlight"
                      : "") +
                    (printDate.getTime() === currentDate.getTime()
                      ? " ui-state-active"
                      : "") +
                    (otherMonth ? " ui-priority-secondary" : "") +
                    "' href='#'>" +
                    printDate.getDate() +
                    "</a>") +
                "</td>";
              printDate.setDate(printDate.getDate() + 1);
              printDate = this._daylightSavingAdjust(printDate);
            }
            calender += tbody + "</tr>";
          }
          drawMonth++;
          if (drawMonth > 11) {
            drawMonth = 0;
            drawYear++;
          }
          calender +=
            "</tbody></table>" +
            (isMultiMonth
              ? "</div>" +
                (numMonths[0] > 0 && col === numMonths[1] - 1
                  ? "<div class='ui-datepicker-row-break'></div>"
                  : "")
              : "");
          group += calender;
        }
        html += group;
      }
      html += buttonPanel;
      inst._keyEvent = false;
      return html;
    },
    _generateMonthYearHeader: function(
      inst,
      drawMonth,
      drawYear,
      minDate,
      maxDate,
      secondary,
      monthNames,
      monthNamesShort
    ) {
      var inMinYear,
        inMaxYear,
        month,
        years,
        thisYear,
        determineYear,
        year,
        endYear,
        changeMonth = this._get(inst, "changeMonth"),
        changeYear = this._get(inst, "changeYear"),
        showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
        html = "<div class='ui-datepicker-title'>",
        monthHtml = "";
      if (secondary || !changeMonth) {
        monthHtml +=
          "<span class='ui-datepicker-month'>" +
          monthNames[drawMonth] +
          "</span>";
      } else {
        inMinYear = minDate && minDate.getFullYear() === drawYear;
        inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
        monthHtml +=
          "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
        for (month = 0; month < 12; month++) {
          if (
            (!inMinYear || month >= minDate.getMonth()) &&
            (!inMaxYear || month <= maxDate.getMonth())
          ) {
            monthHtml +=
              "<option value='" +
              month +
              "'" +
              (month === drawMonth ? " selected='selected'" : "") +
              ">" +
              monthNamesShort[month] +
              "</option>";
          }
        }
        monthHtml += "</select>";
      }
      if (!showMonthAfterYear) {
        html +=
          monthHtml +
          (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
      }
      if (!inst.yearshtml) {
        inst.yearshtml = "";
        if (secondary || !changeYear) {
          html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
        } else {
          years = this._get(inst, "yearRange").split(":");
          thisYear = new Date().getFullYear();
          determineYear = function(value) {
            var year = value.match(/c[+\-].*/)
              ? drawYear + parseInt(value.substring(1), 10)
              : value.match(/[+\-].*/)
              ? thisYear + parseInt(value, 10)
              : parseInt(value, 10);
            return isNaN(year) ? thisYear : year;
          };
          year = determineYear(years[0]);
          endYear = Math.max(year, determineYear(years[1] || ""));
          year = minDate ? Math.max(year, minDate.getFullYear()) : year;
          endYear = maxDate
            ? Math.min(endYear, maxDate.getFullYear())
            : endYear;
          inst.yearshtml +=
            "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
          for (; year <= endYear; year++) {
            inst.yearshtml +=
              "<option value='" +
              year +
              "'" +
              (year === drawYear ? " selected='selected'" : "") +
              ">" +
              year +
              "</option>";
          }
          inst.yearshtml += "</select>";
          html += inst.yearshtml;
          inst.yearshtml = null;
        }
      }
      html += this._get(inst, "yearSuffix");
      if (showMonthAfterYear) {
        html +=
          (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") +
          monthHtml;
      }
      html += "</div>";
      return html;
    },
    _adjustInstDate: function(inst, offset, period) {
      var year = inst.drawYear + (period === "Y" ? offset : 0),
        month = inst.drawMonth + (period === "M" ? offset : 0),
        day =
          Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) +
          (period === "D" ? offset : 0),
        date = this._restrictMinMax(
          inst,
          this._daylightSavingAdjust(new Date(year, month, day))
        );
      inst.selectedDay = date.getDate();
      inst.drawMonth = inst.selectedMonth = date.getMonth();
      inst.drawYear = inst.selectedYear = date.getFullYear();
      if (period === "M" || period === "Y") {
        this._notifyChange(inst);
      }
    },
    _restrictMinMax: function(inst, date) {
      var minDate = this._getMinMaxDate(inst, "min"),
        maxDate = this._getMinMaxDate(inst, "max"),
        newDate = minDate && date < minDate ? minDate : date;
      return maxDate && newDate > maxDate ? maxDate : newDate;
    },
    _notifyChange: function(inst) {
      var onChange = this._get(inst, "onChangeMonthYear");
      if (onChange) {
        onChange.apply(inst.input ? inst.input[0] : null, [
          inst.selectedYear,
          inst.selectedMonth + 1,
          inst
        ]);
      }
    },
    _getNumberOfMonths: function(inst) {
      var numMonths = this._get(inst, "numberOfMonths");
      return numMonths == null
        ? [1, 1]
        : typeof numMonths === "number"
        ? [1, numMonths]
        : numMonths;
    },
    _getMinMaxDate: function(inst, minMax) {
      return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
    },
    _getDaysInMonth: function(year, month) {
      return (
        32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
      );
    },
    _getFirstDayOfMonth: function(year, month) {
      return new Date(year, month, 1).getDay();
    },
    _canAdjustMonth: function(inst, offset, curYear, curMonth) {
      var numMonths = this._getNumberOfMonths(inst),
        date = this._daylightSavingAdjust(
          new Date(
            curYear,
            curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]),
            1
          )
        );
      if (offset < 0) {
        date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
      }
      return this._isInRange(inst, date);
    },
    _isInRange: function(inst, date) {
      var yearSplit,
        currentYear,
        minDate = this._getMinMaxDate(inst, "min"),
        maxDate = this._getMinMaxDate(inst, "max"),
        minYear = null,
        maxYear = null,
        years = this._get(inst, "yearRange");
      if (years) {
        yearSplit = years.split(":");
        currentYear = new Date().getFullYear();
        minYear = parseInt(yearSplit[0], 10);
        maxYear = parseInt(yearSplit[1], 10);
        if (yearSplit[0].match(/[+\-].*/)) {
          minYear += currentYear;
        }
        if (yearSplit[1].match(/[+\-].*/)) {
          maxYear += currentYear;
        }
      }
      return (
        (!minDate || date.getTime() >= minDate.getTime()) &&
        (!maxDate || date.getTime() <= maxDate.getTime()) &&
        (!minYear || date.getFullYear() >= minYear) &&
        (!maxYear || date.getFullYear() <= maxYear)
      );
    },
    _getFormatConfig: function(inst) {
      var shortYearCutoff = this._get(inst, "shortYearCutoff");
      shortYearCutoff =
        typeof shortYearCutoff !== "string"
          ? shortYearCutoff
          : (new Date().getFullYear() % 100) + parseInt(shortYearCutoff, 10);
      return {
        shortYearCutoff: shortYearCutoff,
        dayNamesShort: this._get(inst, "dayNamesShort"),
        dayNames: this._get(inst, "dayNames"),
        monthNamesShort: this._get(inst, "monthNamesShort"),
        monthNames: this._get(inst, "monthNames")
      };
    },
    _formatDate: function(inst, day, month, year) {
      if (!day) {
        inst.currentDay = inst.selectedDay;
        inst.currentMonth = inst.selectedMonth;
        inst.currentYear = inst.selectedYear;
      }
      var date = day
        ? typeof day === "object"
          ? day
          : this._daylightSavingAdjust(new Date(year, month, day))
        : this._daylightSavingAdjust(
            new Date(inst.currentYear, inst.currentMonth, inst.currentDay)
          );
      return this.formatDate(
        this._get(inst, "dateFormat"),
        date,
        this._getFormatConfig(inst)
      );
    }
  });
  function datepicker_bindHover(dpDiv) {
    var selector =
      "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return dpDiv
      .delegate(selector, "mouseout", function() {
        $(this).removeClass("ui-state-hover");
        if (this.className.indexOf("ui-datepicker-prev") !== -1) {
          $(this).removeClass("ui-datepicker-prev-hover");
        }
        if (this.className.indexOf("ui-datepicker-next") !== -1) {
          $(this).removeClass("ui-datepicker-next-hover");
        }
      })
      .delegate(selector, "mouseover", datepicker_handleMouseover);
  }
  function datepicker_handleMouseover() {
    if (
      !$.datepicker._isDisabledDatepicker(
        datepicker_instActive.inline
          ? datepicker_instActive.dpDiv.parent()[0]
          : datepicker_instActive.input[0]
      )
    ) {
      $(this)
        .parents(".ui-datepicker-calendar")
        .find("a")
        .removeClass("ui-state-hover");
      $(this).addClass("ui-state-hover");
      if (this.className.indexOf("ui-datepicker-prev") !== -1) {
        $(this).addClass("ui-datepicker-prev-hover");
      }
      if (this.className.indexOf("ui-datepicker-next") !== -1) {
        $(this).addClass("ui-datepicker-next-hover");
      }
    }
  }
  function datepicker_extendRemove(target, props) {
    $.extend(target, props);
    for (var name in props) {
      if (props[name] == null) {
        target[name] = props[name];
      }
    }
    return target;
  }
  $.fn.datepicker = function(options) {
    if (!this.length) {
      return this;
    }
    if (!$.datepicker.initialized) {
      $(document).mousedown($.datepicker._checkExternalClick);
      $.datepicker.initialized = true;
    }
    if ($("#" + $.datepicker._mainDivId).length === 0) {
      $("body").append($.datepicker.dpDiv);
    }
    var otherArgs = Array.prototype.slice.call(arguments, 1);
    if (
      typeof options === "string" &&
      (options === "isDisabled" ||
        options === "getDate" ||
        options === "widget")
    ) {
      return $.datepicker["_" + options + "Datepicker"].apply(
        $.datepicker,
        [this[0]].concat(otherArgs)
      );
    }
    if (
      options === "option" &&
      arguments.length === 2 &&
      typeof arguments[1] === "string"
    ) {
      return $.datepicker["_" + options + "Datepicker"].apply(
        $.datepicker,
        [this[0]].concat(otherArgs)
      );
    }
    return this.each(function() {
      typeof options === "string"
        ? $.datepicker["_" + options + "Datepicker"].apply(
            $.datepicker,
            [this].concat(otherArgs)
          )
        : $.datepicker._attachDatepicker(this, options);
    });
  };
  $.datepicker = new Datepicker();
  $.datepicker.initialized = false;
  $.datepicker.uuid = new Date().getTime();
  $.datepicker.version = "1.11.4";
  var datepicker = $.datepicker;
  var tooltip = $.widget("ui.tooltip", {
    version: "1.11.4",
    options: {
      content: function() {
        var title = $(this).attr("title") || "";
        return $("<a>")
          .text(title)
          .html();
      },
      hide: true,
      items: "[title]:not([disabled])",
      position: {
        my: "left top+15",
        at: "left bottom",
        collision: "flipfit flip"
      },
      show: true,
      tooltipClass: null,
      track: false,
      close: null,
      open: null
    },
    _addDescribedBy: function(elem, id) {
      var describedby = (elem.attr("aria-describedby") || "").split(/\s+/);
      describedby.push(id);
      elem
        .data("ui-tooltip-id", id)
        .attr("aria-describedby", $.trim(describedby.join(" ")));
    },
    _removeDescribedBy: function(elem) {
      var id = elem.data("ui-tooltip-id"),
        describedby = (elem.attr("aria-describedby") || "").split(/\s+/),
        index = $.inArray(id, describedby);
      if (index !== -1) {
        describedby.splice(index, 1);
      }
      elem.removeData("ui-tooltip-id");
      describedby = $.trim(describedby.join(" "));
      if (describedby) {
        elem.attr("aria-describedby", describedby);
      } else {
        elem.removeAttr("aria-describedby");
      }
    },
    _create: function() {
      this._on({ mouseover: "open", focusin: "open" });
      this.tooltips = {};
      this.parents = {};
      if (this.options.disabled) {
        this._disable();
      }
      this.liveRegion = $("<div>")
        .attr({
          role: "log",
          "aria-live": "assertive",
          "aria-relevant": "additions"
        })
        .addClass("ui-helper-hidden-accessible")
        .appendTo(this.document[0].body);
    },
    _setOption: function(key, value) {
      var that = this;
      if (key === "disabled") {
        this[value ? "_disable" : "_enable"]();
        this.options[key] = value;
        return;
      }
      this._super(key, value);
      if (key === "content") {
        $.each(this.tooltips, function(id, tooltipData) {
          that._updateContent(tooltipData.element);
        });
      }
    },
    _disable: function() {
      var that = this;
      $.each(this.tooltips, function(id, tooltipData) {
        var event = $.Event("blur");
        event.target = event.currentTarget = tooltipData.element[0];
        that.close(event, true);
      });
      this.element
        .find(this.options.items)
        .addBack()
        .each(function() {
          var element = $(this);
          if (element.is("[title]")) {
            element
              .data("ui-tooltip-title", element.attr("title"))
              .removeAttr("title");
          }
        });
    },
    _enable: function() {
      this.element
        .find(this.options.items)
        .addBack()
        .each(function() {
          var element = $(this);
          if (element.data("ui-tooltip-title")) {
            element.attr("title", element.data("ui-tooltip-title"));
          }
        });
    },
    open: function(event) {
      var that = this,
        target = $(event ? event.target : this.element).closest(
          this.options.items
        );
      if (!target.length || target.data("ui-tooltip-id")) {
        return;
      }
      if (target.attr("title")) {
        target.data("ui-tooltip-title", target.attr("title"));
      }
      target.data("ui-tooltip-open", true);
      if (event && event.type === "mouseover") {
        target.parents().each(function() {
          var parent = $(this),
            blurEvent;
          if (parent.data("ui-tooltip-open")) {
            blurEvent = $.Event("blur");
            blurEvent.target = blurEvent.currentTarget = this;
            that.close(blurEvent, true);
          }
          if (parent.attr("title")) {
            parent.uniqueId();
            that.parents[this.id] = {
              element: this,
              title: parent.attr("title")
            };
            parent.attr("title", "");
          }
        });
      }
      this._registerCloseHandlers(event, target);
      this._updateContent(target, event);
    },
    _updateContent: function(target, event) {
      var content,
        contentOption = this.options.content,
        that = this,
        eventType = event ? event.type : null;
      if (typeof contentOption === "string") {
        return this._open(event, target, contentOption);
      }
      content = contentOption.call(target[0], function(response) {
        that._delay(function() {
          if (!target.data("ui-tooltip-open")) {
            return;
          }
          if (event) {
            event.type = eventType;
          }
          this._open(event, target, response);
        });
      });
      if (content) {
        this._open(event, target, content);
      }
    },
    _open: function(event, target, content) {
      var tooltipData,
        tooltip,
        delayedShow,
        a11yContent,
        positionOption = $.extend({}, this.options.position);
      if (!content) {
        return;
      }
      tooltipData = this._find(target);
      if (tooltipData) {
        tooltipData.tooltip.find(".ui-tooltip-content").html(content);
        return;
      }
      if (target.is("[title]")) {
        if (event && event.type === "mouseover") {
          target.attr("title", "");
        } else {
          target.removeAttr("title");
        }
      }
      tooltipData = this._tooltip(target);
      tooltip = tooltipData.tooltip;
      this._addDescribedBy(target, tooltip.attr("id"));
      tooltip.find(".ui-tooltip-content").html(content);
      this.liveRegion.children().hide();
      if (content.clone) {
        a11yContent = content.clone();
        a11yContent
          .removeAttr("id")
          .find("[id]")
          .removeAttr("id");
      } else {
        a11yContent = content;
      }
      $("<div>")
        .html(a11yContent)
        .appendTo(this.liveRegion);
      function position(event) {
        positionOption.of = event;
        if (tooltip.is(":hidden")) {
          return;
        }
        tooltip.position(positionOption);
      }
      if (this.options.track && event && /^mouse/.test(event.type)) {
        this._on(this.document, { mousemove: position });
        position(event);
      } else {
        tooltip.position($.extend({ of: target }, this.options.position));
      }
      tooltip.hide();
      this._show(tooltip, this.options.show);
      if (this.options.show && this.options.show.delay) {
        delayedShow = this.delayedShow = setInterval(function() {
          if (tooltip.is(":visible")) {
            position(positionOption.of);
            clearInterval(delayedShow);
          }
        }, $.fx.interval);
      }
      this._trigger("open", event, { tooltip: tooltip });
    },
    _registerCloseHandlers: function(event, target) {
      var events = {
        keyup: function(event) {
          if (event.keyCode === $.ui.keyCode.ESCAPE) {
            var fakeEvent = $.Event(event);
            fakeEvent.currentTarget = target[0];
            this.close(fakeEvent, true);
          }
        }
      };
      if (target[0] !== this.element[0]) {
        events.remove = function() {
          this._removeTooltip(this._find(target).tooltip);
        };
      }
      if (!event || event.type === "mouseover") {
        events.mouseleave = "close";
      }
      if (!event || event.type === "focusin") {
        events.focusout = "close";
      }
      this._on(true, target, events);
    },
    close: function(event) {
      var tooltip,
        that = this,
        target = $(event ? event.currentTarget : this.element),
        tooltipData = this._find(target);
      if (!tooltipData) {
        target.removeData("ui-tooltip-open");
        return;
      }
      tooltip = tooltipData.tooltip;
      if (tooltipData.closing) {
        return;
      }
      clearInterval(this.delayedShow);
      if (target.data("ui-tooltip-title") && !target.attr("title")) {
        target.attr("title", target.data("ui-tooltip-title"));
      }
      this._removeDescribedBy(target);
      tooltipData.hiding = true;
      tooltip.stop(true);
      this._hide(tooltip, this.options.hide, function() {
        that._removeTooltip($(this));
      });
      target.removeData("ui-tooltip-open");
      this._off(target, "mouseleave focusout keyup");
      if (target[0] !== this.element[0]) {
        this._off(target, "remove");
      }
      this._off(this.document, "mousemove");
      if (event && event.type === "mouseleave") {
        $.each(this.parents, function(id, parent) {
          $(parent.element).attr("title", parent.title);
          delete that.parents[id];
        });
      }
      tooltipData.closing = true;
      this._trigger("close", event, { tooltip: tooltip });
      if (!tooltipData.hiding) {
        tooltipData.closing = false;
      }
    },
    _tooltip: function(element) {
      var tooltip = $("<div>")
          .attr("role", "tooltip")
          .addClass(
            "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
              (this.options.tooltipClass || "")
          ),
        id = tooltip.uniqueId().attr("id");
      $("<div>")
        .addClass("ui-tooltip-content")
        .appendTo(tooltip);
      tooltip.appendTo(this.document[0].body);
      return (this.tooltips[id] = { element: element, tooltip: tooltip });
    },
    _find: function(target) {
      var id = target.data("ui-tooltip-id");
      return id ? this.tooltips[id] : null;
    },
    _removeTooltip: function(tooltip) {
      tooltip.remove();
      delete this.tooltips[tooltip.attr("id")];
    },
    _destroy: function() {
      var that = this;
      $.each(this.tooltips, function(id, tooltipData) {
        var event = $.Event("blur"),
          element = tooltipData.element;
        event.target = event.currentTarget = element[0];
        that.close(event, true);
        $("#" + id).remove();
        if (element.data("ui-tooltip-title")) {
          if (!element.attr("title")) {
            element.attr("title", element.data("ui-tooltip-title"));
          }
          element.removeData("ui-tooltip-title");
        }
      });
      this.liveRegion.remove();
    }
  });
  var dataSpace = "ui-effects-",
    jQuery = $;
  $.effects = { effect: {} };
  (function(jQuery, undefined) {
    var stepHooks =
        "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
      rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
      stringParsers = [
        {
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function(execResult) {
            return [execResult[1], execResult[2], execResult[3], execResult[4]];
          }
        },
        {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function(execResult) {
            return [
              execResult[1] * 2.55,
              execResult[2] * 2.55,
              execResult[3] * 2.55,
              execResult[4]
            ];
          }
        },
        {
          re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
          parse: function(execResult) {
            return [
              parseInt(execResult[1], 16),
              parseInt(execResult[2], 16),
              parseInt(execResult[3], 16)
            ];
          }
        },
        {
          re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
          parse: function(execResult) {
            return [
              parseInt(execResult[1] + execResult[1], 16),
              parseInt(execResult[2] + execResult[2], 16),
              parseInt(execResult[3] + execResult[3], 16)
            ];
          }
        },
        {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          space: "hsla",
          parse: function(execResult) {
            return [
              execResult[1],
              execResult[2] / 100,
              execResult[3] / 100,
              execResult[4]
            ];
          }
        }
      ],
      color = (jQuery.Color = function(color, green, blue, alpha) {
        return new jQuery.Color.fn.parse(color, green, blue, alpha);
      }),
      spaces = {
        rgba: {
          props: {
            red: { idx: 0, type: "byte" },
            green: { idx: 1, type: "byte" },
            blue: { idx: 2, type: "byte" }
          }
        },
        hsla: {
          props: {
            hue: { idx: 0, type: "degrees" },
            saturation: { idx: 1, type: "percent" },
            lightness: { idx: 2, type: "percent" }
          }
        }
      },
      propTypes = {
        byte: { floor: true, max: 255 },
        percent: { max: 1 },
        degrees: { mod: 360, floor: true }
      },
      support = (color.support = {}),
      supportElem = jQuery("<p>")[0],
      colors,
      each = jQuery.each;
    supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
    support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1;
    each(spaces, function(spaceName, space) {
      space.cache = "_" + spaceName;
      space.props.alpha = { idx: 3, type: "percent", def: 1 };
    });
    function clamp(value, prop, allowEmpty) {
      var type = propTypes[prop.type] || {};
      if (value == null) {
        return allowEmpty || !prop.def ? null : prop.def;
      }
      value = type.floor ? ~~value : parseFloat(value);
      if (isNaN(value)) {
        return prop.def;
      }
      if (type.mod) {
        return (value + type.mod) % type.mod;
      }
      return 0 > value ? 0 : type.max < value ? type.max : value;
    }
    function stringParse(string) {
      var inst = color(),
        rgba = (inst._rgba = []);
      string = string.toLowerCase();
      each(stringParsers, function(i, parser) {
        var parsed,
          match = parser.re.exec(string),
          values = match && parser.parse(match),
          spaceName = parser.space || "rgba";
        if (values) {
          parsed = inst[spaceName](values);
          inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
          rgba = inst._rgba = parsed._rgba;
          return false;
        }
      });
      if (rgba.length) {
        if (rgba.join() === "0,0,0,0") {
          jQuery.extend(rgba, colors.transparent);
        }
        return inst;
      }
      return colors[string];
    }
    color.fn = jQuery.extend(color.prototype, {
      parse: function(red, green, blue, alpha) {
        if (red === undefined) {
          this._rgba = [null, null, null, null];
          return this;
        }
        if (red.jquery || red.nodeType) {
          red = jQuery(red).css(green);
          green = undefined;
        }
        var inst = this,
          type = jQuery.type(red),
          rgba = (this._rgba = []);
        if (green !== undefined) {
          red = [red, green, blue, alpha];
          type = "array";
        }
        if (type === "string") {
          return this.parse(stringParse(red) || colors._default);
        }
        if (type === "array") {
          each(spaces.rgba.props, function(key, prop) {
            rgba[prop.idx] = clamp(red[prop.idx], prop);
          });
          return this;
        }
        if (type === "object") {
          if (red instanceof color) {
            each(spaces, function(spaceName, space) {
              if (red[space.cache]) {
                inst[space.cache] = red[space.cache].slice();
              }
            });
          } else {
            each(spaces, function(spaceName, space) {
              var cache = space.cache;
              each(space.props, function(key, prop) {
                if (!inst[cache] && space.to) {
                  if (key === "alpha" || red[key] == null) {
                    return;
                  }
                  inst[cache] = space.to(inst._rgba);
                }
                inst[cache][prop.idx] = clamp(red[key], prop, true);
              });
              if (
                inst[cache] &&
                jQuery.inArray(null, inst[cache].slice(0, 3)) < 0
              ) {
                inst[cache][3] = 1;
                if (space.from) {
                  inst._rgba = space.from(inst[cache]);
                }
              }
            });
          }
          return this;
        }
      },
      is: function(compare) {
        var is = color(compare),
          same = true,
          inst = this;
        each(spaces, function(_, space) {
          var localCache,
            isCache = is[space.cache];
          if (isCache) {
            localCache =
              inst[space.cache] || (space.to && space.to(inst._rgba)) || [];
            each(space.props, function(_, prop) {
              if (isCache[prop.idx] != null) {
                same = isCache[prop.idx] === localCache[prop.idx];
                return same;
              }
            });
          }
          return same;
        });
        return same;
      },
      _space: function() {
        var used = [],
          inst = this;
        each(spaces, function(spaceName, space) {
          if (inst[space.cache]) {
            used.push(spaceName);
          }
        });
        return used.pop();
      },
      transition: function(other, distance) {
        var end = color(other),
          spaceName = end._space(),
          space = spaces[spaceName],
          startColor = this.alpha() === 0 ? color("transparent") : this,
          start = startColor[space.cache] || space.to(startColor._rgba),
          result = start.slice();
        end = end[space.cache];
        each(space.props, function(key, prop) {
          var index = prop.idx,
            startValue = start[index],
            endValue = end[index],
            type = propTypes[prop.type] || {};
          if (endValue === null) {
            return;
          }
          if (startValue === null) {
            result[index] = endValue;
          } else {
            if (type.mod) {
              if (endValue - startValue > type.mod / 2) {
                startValue += type.mod;
              } else if (startValue - endValue > type.mod / 2) {
                startValue -= type.mod;
              }
            }
            result[index] = clamp(
              (endValue - startValue) * distance + startValue,
              prop
            );
          }
        });
        return this[spaceName](result);
      },
      blend: function(opaque) {
        if (this._rgba[3] === 1) {
          return this;
        }
        var rgb = this._rgba.slice(),
          a = rgb.pop(),
          blend = color(opaque)._rgba;
        return color(
          jQuery.map(rgb, function(v, i) {
            return (1 - a) * blend[i] + a * v;
          })
        );
      },
      toRgbaString: function() {
        var prefix = "rgba(",
          rgba = jQuery.map(this._rgba, function(v, i) {
            return v == null ? (i > 2 ? 1 : 0) : v;
          });
        if (rgba[3] === 1) {
          rgba.pop();
          prefix = "rgb(";
        }
        return prefix + rgba.join() + ")";
      },
      toHslaString: function() {
        var prefix = "hsla(",
          hsla = jQuery.map(this.hsla(), function(v, i) {
            if (v == null) {
              v = i > 2 ? 1 : 0;
            }
            if (i && i < 3) {
              v = Math.round(v * 100) + "%";
            }
            return v;
          });
        if (hsla[3] === 1) {
          hsla.pop();
          prefix = "hsl(";
        }
        return prefix + hsla.join() + ")";
      },
      toHexString: function(includeAlpha) {
        var rgba = this._rgba.slice(),
          alpha = rgba.pop();
        if (includeAlpha) {
          rgba.push(~~(alpha * 255));
        }
        return (
          "#" +
          jQuery
            .map(rgba, function(v) {
              v = (v || 0).toString(16);
              return v.length === 1 ? "0" + v : v;
            })
            .join("")
        );
      },
      toString: function() {
        return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
      }
    });
    color.fn.parse.prototype = color.fn;
    function hue2rgb(p, q, h) {
      h = (h + 1) % 1;
      if (h * 6 < 1) {
        return p + (q - p) * h * 6;
      }
      if (h * 2 < 1) {
        return q;
      }
      if (h * 3 < 2) {
        return p + (q - p) * (2 / 3 - h) * 6;
      }
      return p;
    }
    spaces.hsla.to = function(rgba) {
      if (rgba[0] == null || rgba[1] == null || rgba[2] == null) {
        return [null, null, null, rgba[3]];
      }
      var r = rgba[0] / 255,
        g = rgba[1] / 255,
        b = rgba[2] / 255,
        a = rgba[3],
        max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        diff = max - min,
        add = max + min,
        l = add * 0.5,
        h,
        s;
      if (min === max) {
        h = 0;
      } else if (r === max) {
        h = (60 * (g - b)) / diff + 360;
      } else if (g === max) {
        h = (60 * (b - r)) / diff + 120;
      } else {
        h = (60 * (r - g)) / diff + 240;
      }
      if (diff === 0) {
        s = 0;
      } else if (l <= 0.5) {
        s = diff / add;
      } else {
        s = diff / (2 - add);
      }
      return [Math.round(h) % 360, s, l, a == null ? 1 : a];
    };
    spaces.hsla.from = function(hsla) {
      if (hsla[0] == null || hsla[1] == null || hsla[2] == null) {
        return [null, null, null, hsla[3]];
      }
      var h = hsla[0] / 360,
        s = hsla[1],
        l = hsla[2],
        a = hsla[3],
        q = l <= 0.5 ? l * (1 + s) : l + s - l * s,
        p = 2 * l - q;
      return [
        Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        Math.round(hue2rgb(p, q, h) * 255),
        Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
        a
      ];
    };
    each(spaces, function(spaceName, space) {
      var props = space.props,
        cache = space.cache,
        to = space.to,
        from = space.from;
      color.fn[spaceName] = function(value) {
        if (to && !this[cache]) {
          this[cache] = to(this._rgba);
        }
        if (value === undefined) {
          return this[cache].slice();
        }
        var ret,
          type = jQuery.type(value),
          arr = type === "array" || type === "object" ? value : arguments,
          local = this[cache].slice();
        each(props, function(key, prop) {
          var val = arr[type === "object" ? key : prop.idx];
          if (val == null) {
            val = local[prop.idx];
          }
          local[prop.idx] = clamp(val, prop);
        });
        if (from) {
          ret = color(from(local));
          ret[cache] = local;
          return ret;
        } else {
          return color(local);
        }
      };
      each(props, function(key, prop) {
        if (color.fn[key]) {
          return;
        }
        color.fn[key] = function(value) {
          var vtype = jQuery.type(value),
            fn = key === "alpha" ? (this._hsla ? "hsla" : "rgba") : spaceName,
            local = this[fn](),
            cur = local[prop.idx],
            match;
          if (vtype === "undefined") {
            return cur;
          }
          if (vtype === "function") {
            value = value.call(this, cur);
            vtype = jQuery.type(value);
          }
          if (value == null && prop.empty) {
            return this;
          }
          if (vtype === "string") {
            match = rplusequals.exec(value);
            if (match) {
              value = cur + parseFloat(match[2]) * (match[1] === "+" ? 1 : -1);
            }
          }
          local[prop.idx] = value;
          return this[fn](local);
        };
      });
    });
    color.hook = function(hook) {
      var hooks = hook.split(" ");
      each(hooks, function(i, hook) {
        jQuery.cssHooks[hook] = {
          set: function(elem, value) {
            var parsed,
              curElem,
              backgroundColor = "";
            if (
              value !== "transparent" &&
              (jQuery.type(value) !== "string" || (parsed = stringParse(value)))
            ) {
              value = color(parsed || value);
              if (!support.rgba && value._rgba[3] !== 1) {
                curElem = hook === "backgroundColor" ? elem.parentNode : elem;
                while (
                  (backgroundColor === "" ||
                    backgroundColor === "transparent") &&
                  curElem &&
                  curElem.style
                ) {
                  try {
                    backgroundColor = jQuery.css(curElem, "backgroundColor");
                    curElem = curElem.parentNode;
                  } catch (e) {}
                }
                value = value.blend(
                  backgroundColor && backgroundColor !== "transparent"
                    ? backgroundColor
                    : "_default"
                );
              }
              value = value.toRgbaString();
            }
            try {
              elem.style[hook] = value;
            } catch (e) {}
          }
        };
        jQuery.fx.step[hook] = function(fx) {
          if (!fx.colorInit) {
            fx.start = color(fx.elem, hook);
            fx.end = color(fx.end);
            fx.colorInit = true;
          }
          jQuery.cssHooks[hook].set(
            fx.elem,
            fx.start.transition(fx.end, fx.pos)
          );
        };
      });
    };
    color.hook(stepHooks);
    jQuery.cssHooks.borderColor = {
      expand: function(value) {
        var expanded = {};
        each(["Top", "Right", "Bottom", "Left"], function(i, part) {
          expanded["border" + part + "Color"] = value;
        });
        return expanded;
      }
    };
    colors = jQuery.Color.names = {
      aqua: "#00ffff",
      black: "#000000",
      blue: "#0000ff",
      fuchsia: "#ff00ff",
      gray: "#808080",
      green: "#008000",
      lime: "#00ff00",
      maroon: "#800000",
      navy: "#000080",
      olive: "#808000",
      purple: "#800080",
      red: "#ff0000",
      silver: "#c0c0c0",
      teal: "#008080",
      white: "#ffffff",
      yellow: "#ffff00",
      transparent: [null, null, null, 0],
      _default: "#ffffff"
    };
  })(jQuery);
  (function() {
    var classAnimationActions = ["add", "remove", "toggle"],
      shorthandStyles = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
      };
    $.each(
      [
        "borderLeftStyle",
        "borderRightStyle",
        "borderBottomStyle",
        "borderTopStyle"
      ],
      function(_, prop) {
        $.fx.step[prop] = function(fx) {
          if (
            (fx.end !== "none" && !fx.setAttr) ||
            (fx.pos === 1 && !fx.setAttr)
          ) {
            jQuery.style(fx.elem, prop, fx.end);
            fx.setAttr = true;
          }
        };
      }
    );
    function getElementStyles(elem) {
      var key,
        len,
        style = elem.ownerDocument.defaultView
          ? elem.ownerDocument.defaultView.getComputedStyle(elem, null)
          : elem.currentStyle,
        styles = {};
      if (style && style.length && style[0] && style[style[0]]) {
        len = style.length;
        while (len--) {
          key = style[len];
          if (typeof style[key] === "string") {
            styles[$.camelCase(key)] = style[key];
          }
        }
      } else {
        for (key in style) {
          if (typeof style[key] === "string") {
            styles[key] = style[key];
          }
        }
      }
      return styles;
    }
    function styleDifference(oldStyle, newStyle) {
      var diff = {},
        name,
        value;
      for (name in newStyle) {
        value = newStyle[name];
        if (oldStyle[name] !== value) {
          if (!shorthandStyles[name]) {
            if ($.fx.step[name] || !isNaN(parseFloat(value))) {
              diff[name] = value;
            }
          }
        }
      }
      return diff;
    }
    if (!$.fn.addBack) {
      $.fn.addBack = function(selector) {
        return this.add(
          selector == null ? this.prevObject : this.prevObject.filter(selector)
        );
      };
    }
    $.effects.animateClass = function(value, duration, easing, callback) {
      var o = $.speed(duration, easing, callback);
      return this.queue(function() {
        var animated = $(this),
          baseClass = animated.attr("class") || "",
          applyClassChange,
          allAnimations = o.children ? animated.find("*").addBack() : animated;
        allAnimations = allAnimations.map(function() {
          var el = $(this);
          return { el: el, start: getElementStyles(this) };
        });
        applyClassChange = function() {
          $.each(classAnimationActions, function(i, action) {
            if (value[action]) {
              animated[action + "Class"](value[action]);
            }
          });
        };
        applyClassChange();
        allAnimations = allAnimations.map(function() {
          this.end = getElementStyles(this.el[0]);
          this.diff = styleDifference(this.start, this.end);
          return this;
        });
        animated.attr("class", baseClass);
        allAnimations = allAnimations.map(function() {
          var styleInfo = this,
            dfd = $.Deferred(),
            opts = $.extend({}, o, {
              queue: false,
              complete: function() {
                dfd.resolve(styleInfo);
              }
            });
          this.el.animate(this.diff, opts);
          return dfd.promise();
        });
        $.when.apply($, allAnimations.get()).done(function() {
          applyClassChange();
          $.each(arguments, function() {
            var el = this.el;
            $.each(this.diff, function(key) {
              el.css(key, "");
            });
          });
          o.complete.call(animated[0]);
        });
      });
    };
    $.fn.extend({
      addClass: (function(orig) {
        return function(classNames, speed, easing, callback) {
          return speed
            ? $.effects.animateClass.call(
                this,
                { add: classNames },
                speed,
                easing,
                callback
              )
            : orig.apply(this, arguments);
        };
      })($.fn.addClass),
      removeClass: (function(orig) {
        return function(classNames, speed, easing, callback) {
          return arguments.length > 1
            ? $.effects.animateClass.call(
                this,
                { remove: classNames },
                speed,
                easing,
                callback
              )
            : orig.apply(this, arguments);
        };
      })($.fn.removeClass),
      toggleClass: (function(orig) {
        return function(classNames, force, speed, easing, callback) {
          if (typeof force === "boolean" || force === undefined) {
            if (!speed) {
              return orig.apply(this, arguments);
            } else {
              return $.effects.animateClass.call(
                this,
                force ? { add: classNames } : { remove: classNames },
                speed,
                easing,
                callback
              );
            }
          } else {
            return $.effects.animateClass.call(
              this,
              { toggle: classNames },
              force,
              speed,
              easing
            );
          }
        };
      })($.fn.toggleClass),
      switchClass: function(remove, add, speed, easing, callback) {
        return $.effects.animateClass.call(
          this,
          { add: add, remove: remove },
          speed,
          easing,
          callback
        );
      }
    });
  })();
  (function() {
    $.extend($.effects, {
      version: "1.11.4",
      save: function(element, set) {
        for (var i = 0; i < set.length; i++) {
          if (set[i] !== null) {
            element.data(dataSpace + set[i], element[0].style[set[i]]);
          }
        }
      },
      restore: function(element, set) {
        var val, i;
        for (i = 0; i < set.length; i++) {
          if (set[i] !== null) {
            val = element.data(dataSpace + set[i]);
            if (val === undefined) {
              val = "";
            }
            element.css(set[i], val);
          }
        }
      },
      setMode: function(el, mode) {
        if (mode === "toggle") {
          mode = el.is(":hidden") ? "show" : "hide";
        }
        return mode;
      },
      getBaseline: function(origin, original) {
        var y, x;
        switch (origin[0]) {
          case "top":
            y = 0;
            break;
          case "middle":
            y = 0.5;
            break;
          case "bottom":
            y = 1;
            break;
          default:
            y = origin[0] / original.height;
        }
        switch (origin[1]) {
          case "left":
            x = 0;
            break;
          case "center":
            x = 0.5;
            break;
          case "right":
            x = 1;
            break;
          default:
            x = origin[1] / original.width;
        }
        return { x: x, y: y };
      },
      createWrapper: function(element) {
        if (element.parent().is(".ui-effects-wrapper")) {
          return element.parent();
        }
        var props = {
            width: element.outerWidth(true),
            height: element.outerHeight(true),
            float: element.css("float")
          },
          wrapper = $("<div></div>")
            .addClass("ui-effects-wrapper")
            .css({
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0
            }),
          size = { width: element.width(), height: element.height() },
          active = document.activeElement;
        try {
          active.id;
        } catch (e) {
          active = document.body;
        }
        element.wrap(wrapper);
        if (element[0] === active || $.contains(element[0], active)) {
          $(active).focus();
        }
        wrapper = element.parent();
        if (element.css("position") === "static") {
          wrapper.css({ position: "relative" });
          element.css({ position: "relative" });
        } else {
          $.extend(props, {
            position: element.css("position"),
            zIndex: element.css("z-index")
          });
          $.each(["top", "left", "bottom", "right"], function(i, pos) {
            props[pos] = element.css(pos);
            if (isNaN(parseInt(props[pos], 10))) {
              props[pos] = "auto";
            }
          });
          element.css({
            position: "relative",
            top: 0,
            left: 0,
            right: "auto",
            bottom: "auto"
          });
        }
        element.css(size);
        return wrapper.css(props).show();
      },
      removeWrapper: function(element) {
        var active = document.activeElement;
        if (element.parent().is(".ui-effects-wrapper")) {
          element.parent().replaceWith(element);
          if (element[0] === active || $.contains(element[0], active)) {
            $(active).focus();
          }
        }
        return element;
      },
      setTransition: function(element, list, factor, value) {
        value = value || {};
        $.each(list, function(i, x) {
          var unit = element.cssUnit(x);
          if (unit[0] > 0) {
            value[x] = unit[0] * factor + unit[1];
          }
        });
        return value;
      }
    });
    function _normalizeArguments(effect, options, speed, callback) {
      if ($.isPlainObject(effect)) {
        options = effect;
        effect = effect.effect;
      }
      effect = { effect: effect };
      if (options == null) {
        options = {};
      }
      if ($.isFunction(options)) {
        callback = options;
        speed = null;
        options = {};
      }
      if (typeof options === "number" || $.fx.speeds[options]) {
        callback = speed;
        speed = options;
        options = {};
      }
      if ($.isFunction(speed)) {
        callback = speed;
        speed = null;
      }
      if (options) {
        $.extend(effect, options);
      }
      speed = speed || options.duration;
      effect.duration = $.fx.off
        ? 0
        : typeof speed === "number"
        ? speed
        : speed in $.fx.speeds
        ? $.fx.speeds[speed]
        : $.fx.speeds._default;
      effect.complete = callback || options.complete;
      return effect;
    }
    function standardAnimationOption(option) {
      if (!option || typeof option === "number" || $.fx.speeds[option]) {
        return true;
      }
      if (typeof option === "string" && !$.effects.effect[option]) {
        return true;
      }
      if ($.isFunction(option)) {
        return true;
      }
      if (typeof option === "object" && !option.effect) {
        return true;
      }
      return false;
    }
    $.fn.extend({
      effect: function() {
        var args = _normalizeArguments.apply(this, arguments),
          mode = args.mode,
          queue = args.queue,
          effectMethod = $.effects.effect[args.effect];
        if ($.fx.off || !effectMethod) {
          if (mode) {
            return this[mode](args.duration, args.complete);
          } else {
            return this.each(function() {
              if (args.complete) {
                args.complete.call(this);
              }
            });
          }
        }
        function run(next) {
          var elem = $(this),
            complete = args.complete,
            mode = args.mode;
          function done() {
            if ($.isFunction(complete)) {
              complete.call(elem[0]);
            }
            if ($.isFunction(next)) {
              next();
            }
          }
          if (elem.is(":hidden") ? mode === "hide" : mode === "show") {
            elem[mode]();
            done();
          } else {
            effectMethod.call(elem[0], args, done);
          }
        }
        return queue === false
          ? this.each(run)
          : this.queue(queue || "fx", run);
      },
      show: (function(orig) {
        return function(option) {
          if (standardAnimationOption(option)) {
            return orig.apply(this, arguments);
          } else {
            var args = _normalizeArguments.apply(this, arguments);
            args.mode = "show";
            return this.effect.call(this, args);
          }
        };
      })($.fn.show),
      hide: (function(orig) {
        return function(option) {
          if (standardAnimationOption(option)) {
            return orig.apply(this, arguments);
          } else {
            var args = _normalizeArguments.apply(this, arguments);
            args.mode = "hide";
            return this.effect.call(this, args);
          }
        };
      })($.fn.hide),
      toggle: (function(orig) {
        return function(option) {
          if (standardAnimationOption(option) || typeof option === "boolean") {
            return orig.apply(this, arguments);
          } else {
            var args = _normalizeArguments.apply(this, arguments);
            args.mode = "toggle";
            return this.effect.call(this, args);
          }
        };
      })($.fn.toggle),
      cssUnit: function(key) {
        var style = this.css(key),
          val = [];
        $.each(["em", "px", "%", "pt"], function(i, unit) {
          if (style.indexOf(unit) > 0) {
            val = [parseFloat(style), unit];
          }
        });
        return val;
      }
    });
  })();
  (function() {
    var baseEasings = {};
    $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
      baseEasings[name] = function(p) {
        return Math.pow(p, i + 2);
      };
    });
    $.extend(baseEasings, {
      Sine: function(p) {
        return 1 - Math.cos((p * Math.PI) / 2);
      },
      Circ: function(p) {
        return 1 - Math.sqrt(1 - p * p);
      },
      Elastic: function(p) {
        return p === 0 || p === 1
          ? p
          : -Math.pow(2, 8 * (p - 1)) *
              Math.sin((((p - 1) * 80 - 7.5) * Math.PI) / 15);
      },
      Back: function(p) {
        return p * p * (3 * p - 2);
      },
      Bounce: function(p) {
        var pow2,
          bounce = 4;
        while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
        return (
          1 / Math.pow(4, 3 - bounce) -
          7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2)
        );
      }
    });
    $.each(baseEasings, function(name, easeIn) {
      $.easing["easeIn" + name] = easeIn;
      $.easing["easeOut" + name] = function(p) {
        return 1 - easeIn(1 - p);
      };
      $.easing["easeInOut" + name] = function(p) {
        return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * -2 + 2) / 2;
      };
    });
  })();
  var effect = $.effects;
  var effectBounce = ($.effects.effect.bounce = function(o, done) {
    var el = $(this),
      props = ["position", "top", "bottom", "left", "right", "height", "width"],
      mode = $.effects.setMode(el, o.mode || "effect"),
      hide = mode === "hide",
      show = mode === "show",
      direction = o.direction || "up",
      distance = o.distance,
      times = o.times || 5,
      anims = times * 2 + (show || hide ? 1 : 0),
      speed = o.duration / anims,
      easing = o.easing,
      ref = direction === "up" || direction === "down" ? "top" : "left",
      motion = direction === "up" || direction === "left",
      i,
      upAnim,
      downAnim,
      queue = el.queue(),
      queuelen = queue.length;
    if (show || hide) {
      props.push("opacity");
    }
    $.effects.save(el, props);
    el.show();
    $.effects.createWrapper(el);
    if (!distance) {
      distance = el[ref === "top" ? "outerHeight" : "outerWidth"]() / 3;
    }
    if (show) {
      downAnim = { opacity: 1 };
      downAnim[ref] = 0;
      el.css("opacity", 0)
        .css(ref, motion ? -distance * 2 : distance * 2)
        .animate(downAnim, speed, easing);
    }
    if (hide) {
      distance = distance / Math.pow(2, times - 1);
    }
    downAnim = {};
    downAnim[ref] = 0;
    for (i = 0; i < times; i++) {
      upAnim = {};
      upAnim[ref] = (motion ? "-=" : "+=") + distance;
      el.animate(upAnim, speed, easing).animate(downAnim, speed, easing);
      distance = hide ? distance * 2 : distance / 2;
    }
    if (hide) {
      upAnim = { opacity: 0 };
      upAnim[ref] = (motion ? "-=" : "+=") + distance;
      el.animate(upAnim, speed, easing);
    }
    el.queue(function() {
      if (hide) {
        el.hide();
      }
      $.effects.restore(el, props);
      $.effects.removeWrapper(el);
      done();
    });
    if (queuelen > 1) {
      queue.splice.apply(
        queue,
        [1, 0].concat(queue.splice(queuelen, anims + 1))
      );
    }
    el.dequeue();
  });
});

/* /web/static/lib/jquery/jquery.browser.js defined in bundle 'im_livechat.external_lib' */
(function() {
  $.uaMatch = function(ua) {
    var ua = ua.toLowerCase();
    var match =
      /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[\/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[\/]([\w.]+)/.exec(ua) ||
      /(msie)([\w.]+)/.exec(ua) ||
      (ua.indexOf("compatible") < 0 &&
        /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
      [];
    return { browser: match[1] || "", version: match[2] || "0" };
  };
  if (!$.browser) {
    var matched = $.uaMatch(navigator.userAgent);
    var browser = {};
    if (matched.browser) {
      browser[matched.browser] = true;
      browser.version = matched.version;
    }
    if (browser.chrome) {
      browser.webkit = true;
    } else if (browser.webkit) {
      browser.safari = true;
    }
    $.browser = browser;
  }
})();

/* /web/static/lib/jquery.ba-bbq/jquery.ba-bbq.js defined in bundle 'im_livechat.external_lib' */
(function($, window) {
  "$:nomunge";
  var undefined,
    aps = Array.prototype.slice,
    decode = decodeURIComponent,
    jq_param = $.param,
    jq_param_sorted,
    jq_param_fragment,
    jq_deparam,
    jq_deparam_fragment,
    jq_bbq = ($.bbq = $.bbq || {}),
    jq_bbq_pushState,
    jq_bbq_getState,
    jq_elemUrlAttr,
    special = $.event.special,
    str_hashchange = "hashchange",
    str_querystring = "querystring",
    str_fragment = "fragment",
    str_elemUrlAttr = "elemUrlAttr",
    str_href = "href",
    str_src = "src",
    re_params_querystring = /^.*\?|#.*$/g,
    re_params_fragment,
    re_fragment,
    re_no_escape,
    ajax_crawlable,
    fragment_prefix,
    elemUrlAttr_cache = {};
  function is_string(arg) {
    return typeof arg === "string";
  }
  function curry(func) {
    var args = aps.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(aps.call(arguments)));
    };
  }
  function get_fragment(url) {
    return url.replace(re_fragment, "$2");
  }
  function get_querystring(url) {
    return url.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1");
  }
  function jq_param_sub(is_fragment, get_func, url, params, merge_mode) {
    var result, qs, matches, url_params, hash;
    if (params !== undefined) {
      matches = url.match(
        is_fragment ? re_fragment : /^([^#?]*)\??([^#]*)(#?.*)/
      );
      hash = matches[3] || "";
      if (merge_mode === 2 && is_string(params)) {
        qs = params.replace(
          is_fragment ? re_params_fragment : re_params_querystring,
          ""
        );
      } else {
        url_params = jq_deparam(matches[2]);
        params = is_string(params)
          ? jq_deparam[is_fragment ? str_fragment : str_querystring](params)
          : params;
        qs =
          merge_mode === 2
            ? params
            : merge_mode === 1
            ? $.extend({}, params, url_params)
            : $.extend({}, url_params, params);
        qs = jq_param_sorted(qs);
        if (is_fragment) {
          qs = qs.replace(re_no_escape, decode);
        }
      }
      result =
        matches[1] +
        (is_fragment ? fragment_prefix : qs || !matches[1] ? "?" : "") +
        qs +
        hash;
    } else {
      result = get_func(url !== undefined ? url : location.href);
    }
    return result;
  }
  jq_param[str_querystring] = curry(jq_param_sub, 0, get_querystring);
  jq_param[str_fragment] = jq_param_fragment = curry(
    jq_param_sub,
    1,
    get_fragment
  );
  jq_param.sorted = jq_param_sorted = function(a, traditional) {
    var arr = [],
      obj = {};
    $.each(jq_param(a, traditional).split("&"), function(i, v) {
      var key = v.replace(/(?:%5B|=).*$/, ""),
        key_obj = obj[key];
      if (!key_obj) {
        key_obj = obj[key] = [];
        arr.push(key);
      }
      key_obj.push(v);
    });
    return $.map(arr.sort(), function(v) {
      return obj[v];
    }).join("&");
  };
  jq_param_fragment.noEscape = function(chars) {
    chars = chars || "";
    var arr = $.map(chars.split(""), encodeURIComponent);
    re_no_escape = new RegExp(arr.join("|"), "g");
  };
  jq_param_fragment.noEscape(",/");
  jq_param_fragment.ajaxCrawlable = function(state) {
    if (state !== undefined) {
      if (state) {
        re_params_fragment = /^.*(?:#!|#)/;
        re_fragment = /^([^#]*)(?:#!|#)?(.*)$/;
        fragment_prefix = "#!";
      } else {
        re_params_fragment = /^.*#/;
        re_fragment = /^([^#]*)#?(.*)$/;
        fragment_prefix = "#";
      }
      ajax_crawlable = !!state;
    }
    return ajax_crawlable;
  };
  jq_param_fragment.ajaxCrawlable(0);
  $.deparam = jq_deparam = function(params, coerce) {
    var obj = {},
      coerce_types = { true: !0, false: !1, null: null };
    $.each(params.replace(/\+/g, " ").split("&"), function(j, v) {
      var param = v.split("="),
        key = decode(param[0]),
        val,
        cur = obj,
        i = 0,
        keys = key.split("]["),
        keys_last = keys.length - 1;
      if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
        keys[keys_last] = keys[keys_last].replace(/\]$/, "");
        keys = keys
          .shift()
          .split("[")
          .concat(keys);
        keys_last = keys.length - 1;
      } else {
        keys_last = 0;
      }
      if (param.length === 2) {
        val = decode(param[1]);
        if (coerce) {
          val =
            val && !isNaN(val)
              ? +val
              : val === "undefined"
              ? undefined
              : coerce_types[val] !== undefined
              ? coerce_types[val]
              : val;
        }
        if (keys_last) {
          for (; i <= keys_last; i++) {
            key = keys[i] === "" ? cur.length : keys[i];
            cur = cur[key] =
              i < keys_last
                ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : [])
                : val;
          }
        } else {
          if ($.isArray(obj[key])) {
            obj[key].push(val);
          } else if (obj[key] !== undefined) {
            obj[key] = [obj[key], val];
          } else {
            obj[key] = val;
          }
        }
      } else if (key) {
        obj[key] = coerce ? undefined : "";
      }
    });
    return obj;
  };
  function jq_deparam_sub(is_fragment, url_or_params, coerce) {
    if (url_or_params === undefined || typeof url_or_params === "boolean") {
      coerce = url_or_params;
      url_or_params = jq_param[is_fragment ? str_fragment : str_querystring]();
    } else {
      url_or_params = is_string(url_or_params)
        ? url_or_params.replace(
            is_fragment ? re_params_fragment : re_params_querystring,
            ""
          )
        : url_or_params;
    }
    return jq_deparam(url_or_params, coerce);
  }
  jq_deparam[str_querystring] = curry(jq_deparam_sub, 0);
  jq_deparam[str_fragment] = jq_deparam_fragment = curry(jq_deparam_sub, 1);
  $[str_elemUrlAttr] ||
    ($[str_elemUrlAttr] = function(obj) {
      return $.extend(elemUrlAttr_cache, obj);
    })({
      a: str_href,
      base: str_href,
      iframe: str_src,
      img: str_src,
      input: str_src,
      form: "action",
      link: str_href,
      script: str_src
    });
  jq_elemUrlAttr = $[str_elemUrlAttr];
  function jq_fn_sub(mode, force_attr, params, merge_mode) {
    if (!is_string(params) && typeof params !== "object") {
      merge_mode = params;
      params = force_attr;
      force_attr = undefined;
    }
    return this.each(function() {
      var that = $(this),
        attr =
          force_attr ||
          jq_elemUrlAttr()[(this.nodeName || "").toLowerCase()] ||
          "",
        url = (attr && that.attr(attr)) || "";
      that.attr(attr, jq_param[mode](url, params, merge_mode));
    });
  }
  $.fn[str_querystring] = curry(jq_fn_sub, str_querystring);
  $.fn[str_fragment] = curry(jq_fn_sub, str_fragment);
  jq_bbq.pushState = jq_bbq_pushState = function(params, merge_mode) {
    if (is_string(params) && /^#/.test(params) && merge_mode === undefined) {
      merge_mode = 2;
    }
    var has_args = params !== undefined,
      url = jq_param_fragment(
        location.href,
        has_args ? params : {},
        has_args ? merge_mode : 2
      );
    location.href = url;
  };
  jq_bbq.getState = jq_bbq_getState = function(key, coerce) {
    return key === undefined || typeof key === "boolean"
      ? jq_deparam_fragment(key)
      : jq_deparam_fragment(coerce)[key];
  };
  jq_bbq.removeState = function(arr) {
    var state = {};
    if (arr !== undefined) {
      state = jq_bbq_getState();
      $.each($.isArray(arr) ? arr : arguments, function(i, v) {
        delete state[v];
      });
    }
    jq_bbq_pushState(state, 2);
  };
  special[str_hashchange] = $.extend(special[str_hashchange], {
    add: function(handleObj) {
      var old_handler;
      function new_handler(e) {
        var hash = (e[str_fragment] = jq_param_fragment());
        e.getState = function(key, coerce) {
          return key === undefined || typeof key === "boolean"
            ? jq_deparam(hash, key)
            : jq_deparam(hash, coerce)[key];
        };
        old_handler.apply(this, arguments);
      }
      if ($.isFunction(handleObj)) {
        old_handler = handleObj;
        return new_handler;
      } else {
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
  });
})(jQuery, this);
(function($, window, undefined) {
  "$:nomunge";
  var str_hashchange = "hashchange",
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    doc_mode = doc.documentMode,
    supports_onhashchange =
      "on" + str_hashchange in window &&
      (doc_mode === undefined || doc_mode > 7);
  function get_fragment(url) {
    url = url || location.href;
    return "#" + url.replace(/^[^#]*#?(.*)$/, "$1");
  }
  $.fn[str_hashchange] = function(fn) {
    return fn ? this.bind(str_hashchange, fn) : this.trigger(str_hashchange);
  };
  $.fn[str_hashchange].delay = 50;
  special[str_hashchange] = $.extend(special[str_hashchange], {
    setup: function() {
      if (supports_onhashchange) {
        return false;
      }
      $(fake_onhashchange.start);
    },
    teardown: function() {
      if (supports_onhashchange) {
        return false;
      }
      $(fake_onhashchange.stop);
    }
  });
  fake_onhashchange = (function() {
    var self = {},
      timeout_id,
      last_hash = get_fragment(),
      fn_retval = function(val) {
        return val;
      },
      history_set = fn_retval,
      history_get = fn_retval;
    self.start = function() {
      timeout_id || poll();
    };
    self.stop = function() {
      timeout_id && clearTimeout(timeout_id);
      timeout_id = undefined;
    };
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get(last_hash);
      if (hash !== last_hash) {
        history_set((last_hash = hash), history_hash);
        $(window).trigger(str_hashchange);
      } else if (history_hash !== last_hash) {
        location.href = location.href.replace(/#.*/, "") + history_hash;
      }
      timeout_id = setTimeout(poll, $.fn[str_hashchange].delay);
    }
    $.browser.msie &&
      !supports_onhashchange &&
      (function() {
        var iframe, iframe_src;
        self.start = function() {
          if (!iframe) {
            iframe_src = $.fn[str_hashchange].src;
            iframe_src = iframe_src && iframe_src + get_fragment();
            iframe = $('<iframe tabindex="-1" title="empty"/>')
              .hide()
              .one("load", function() {
                iframe_src || history_set(get_fragment());
                poll();
              })
              .attr("src", iframe_src || "javascript:0")
              .insertAfter("body")[0].contentWindow;
            doc.onpropertychange = function() {
              try {
                if (event.propertyName === "title") {
                  iframe.document.title = doc.title;
                }
              } catch (e) {}
            };
          }
        };
        self.stop = fn_retval;
        history_get = function() {
          return get_fragment(iframe.location.href);
        };
        history_set = function(hash, history_hash) {
          var iframe_doc = iframe.document,
            domain = $.fn[str_hashchange].domain;
          if (hash !== history_hash) {
            iframe_doc.title = doc.title;
            iframe_doc.open();
            domain &&
              iframe_doc.write(
                '<script>document.domain="' + domain + '"</script>'
              );
            iframe_doc.close();
            iframe.location.hash = hash;
          }
        };
      })();
    return self;
  })();
})(jQuery, this);

/* /web/static/lib/qweb/qweb2.js defined in bundle 'im_livechat.external_lib' */
var QWeb2 = {
  expressions_cache: {},
  RESERVED_WORDS: "true,false,NaN,null,undefined,debugger,console,window,in,instanceof,new,function,return,this,typeof,eval,void,Math,RegExp,Array,Object,Date".split(
    ","
  ),
  ACTIONS_PRECEDENCE: "foreach,if,elif,else,call,set,tag,esc,raw,js,debug,log".split(
    ","
  ),
  WORD_REPLACEMENT: {
    and: "&&",
    or: "||",
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<="
  },
  VOID_ELEMENTS: "area,base,br,col,embed,hr,img,input,keygen,link,menuitem,meta,param,source,track,wbr".split(
    ","
  ),
  tools: {
    exception: function(message, context) {
      context = context || {};
      var prefix = "QWeb2";
      if (context.template) {
        prefix += " - template['" + context.template + "']";
      }
      throw new Error(prefix + ": " + message);
    },
    warning: function(message) {
      if (typeof window !== "undefined" && window.console) {
        window.console.warn(message);
      }
    },
    trim: function(s, mode) {
      switch (mode) {
        case "left":
          return s.replace(/^\s*/, "");
        case "right":
          return s.replace(/\s*$/, "");
        default:
          return s.replace(/^\s*|\s*$/g, "");
      }
    },
    js_escape: function(s, noquotes) {
      return (
        (noquotes ? "" : "'") +
        s.replace(/\r?\n/g, "\\n").replace(/'/g, "\\'") +
        (noquotes ? "" : "'")
      );
    },
    html_escape: function(s, attribute) {
      if (s == null) {
        return "";
      }
      s = String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      if (attribute) {
        s = s.replace(/"/g, "&quot;");
      }
      return s;
    },
    gen_attribute: function(o) {
      if (o !== null && o !== undefined) {
        if (o.constructor === Array) {
          if (o[1] !== null && o[1] !== undefined) {
            return this.format_attribute(o[0], o[1]);
          }
        } else if (typeof o === "object") {
          var r = "";
          for (var k in o) {
            if (o.hasOwnProperty(k)) {
              r += this.gen_attribute([k, o[k]]);
            }
          }
          return r;
        }
      }
      return "";
    },
    format_attribute: function(name, value) {
      return " " + name + '="' + this.html_escape(value, true) + '"';
    },
    extend: function(dst, src, exclude) {
      for (var p in src) {
        if (
          src.hasOwnProperty(p) &&
          !(exclude && this.arrayIndexOf(exclude, p) !== -1)
        ) {
          dst[p] = src[p];
        }
      }
      return dst;
    },
    arrayIndexOf: function(array, item) {
      for (var i = 0, ilen = array.length; i < ilen; i++) {
        if (array[i] === item) {
          return i;
        }
      }
      return -1;
    },
    get_element_sibling: function(node, dom_attr) {
      var sibling = node[dom_attr];
      while (sibling && sibling.nodeType !== 1) {
        sibling = sibling[dom_attr];
      }
      return sibling;
    },
    xml_node_to_string: function(node, childs_only) {
      if (childs_only) {
        var childs = node.childNodes,
          r = [];
        for (var i = 0, ilen = childs.length; i < ilen; i++) {
          r.push(this.xml_node_to_string(childs[i]));
        }
        return r.join("");
      } else {
        if (node.nodeType == 3) {
          return node.data;
        }
        if (typeof XMLSerializer !== "undefined") {
          return new XMLSerializer().serializeToString(node);
        } else {
          switch (node.nodeType) {
            case 1:
              return node.outerHTML;
            case 4:
              return "<![CDATA[" + node.data + "]]>";
            case 8:
              return "<!-- " + node.data + "-->";
          }
          throw new Error("Unknown node type " + node.nodeType);
        }
      }
    },
    call: function(context, template, old_dict, _import, callback) {
      var new_dict = this.extend({}, old_dict);
      new_dict["__caller__"] = old_dict["__template__"];
      if (callback) {
        new_dict[0] = callback(context, new_dict);
      }
      return context.engine._render(template, new_dict);
    },
    foreach: function(context, enu, as, old_dict, callback) {
      if (enu != null) {
        var index, jlen, cur;
        var new_dict = this.extend({}, old_dict);
        new_dict[as + "_all"] = enu;
        var as_value = as + "_value",
          as_index = as + "_index",
          as_first = as + "_first",
          as_last = as + "_last",
          as_parity = as + "_parity";
        if (enu instanceof Array) {
          var size = enu.length;
          new_dict[as + "_size"] = size;
          for (index = 0, jlen = enu.length; index < jlen; index++) {
            cur = enu[index];
            new_dict[as_value] = cur;
            new_dict[as_index] = index;
            new_dict[as_first] = index === 0;
            new_dict[as_last] = index + 1 === size;
            new_dict[as_parity] = index % 2 == 1 ? "odd" : "even";
            if (cur && cur.constructor === Object) {
              this.extend(new_dict, cur);
            }
            new_dict[as] = cur;
            callback(context, new_dict);
          }
        } else if (enu.constructor == Number) {
          var _enu = [];
          for (var i = 0; i < enu; i++) {
            _enu.push(i);
          }
          this.foreach(context, _enu, as, old_dict, callback);
        } else {
          index = 0;
          for (var k in enu) {
            if (enu.hasOwnProperty(k)) {
              cur = enu[k];
              new_dict[as_value] = cur;
              new_dict[as_index] = index;
              new_dict[as_first] = index === 0;
              new_dict[as_parity] = index % 2 == 1 ? "odd" : "even";
              new_dict[as] = k;
              callback(context, new_dict);
              index += 1;
            }
          }
        }
        _.each(Object.keys(old_dict), function(z) {
          old_dict[z] = new_dict[z];
        });
      } else {
        this.exception("No enumerator given to foreach", context);
      }
    }
  }
};
QWeb2.Engine = (function() {
  function Engine() {
    this.prefix = "t";
    this.debug = false;
    this.templates_resources = [];
    this.templates = {};
    this.compiled_templates = {};
    this.extend_templates = {};
    this.default_dict = {};
    this.tools = QWeb2.tools;
    this.jQuery = window.jQuery;
    this.reserved_words = QWeb2.RESERVED_WORDS.slice(0);
    this.actions_precedence = QWeb2.ACTIONS_PRECEDENCE.slice(0);
    this.void_elements = QWeb2.VOID_ELEMENTS.slice(0);
    this.word_replacement = QWeb2.tools.extend({}, QWeb2.WORD_REPLACEMENT);
    this.preprocess_node = null;
    for (var i = 0; i < arguments.length; i++) {
      this.add_template(arguments[i]);
    }
  }
  QWeb2.tools.extend(Engine.prototype, {
    add_template: function(template, callback) {
      var self = this;
      this.templates_resources.push(template);
      if (template.constructor === String) {
        return this.load_xml(template, function(err, xDoc) {
          if (err) {
            if (callback) {
              return callback(err);
            } else {
              throw err;
            }
          }
          self.add_template(xDoc, callback);
        });
      }
      template = this.preprocess(template);
      var ec =
        (template.documentElement && template.documentElement.childNodes) ||
        template.childNodes ||
        [];
      for (var i = 0; i < ec.length; i++) {
        var node = ec[i];
        if (node.nodeType === 1) {
          var name = node.getAttribute(this.prefix + "-name");
          var extend = node.getAttribute(this.prefix + "-extend");
          if (name && extend) {
            if (!this.templates[extend]) {
              return this.tools.exception(
                "Can't clone undefined template " + extend
              );
            }
            this.templates[name] = this.templates[extend].cloneNode(true);
            extend = name;
            name = undefined;
          }
          if (name) {
            this.templates[name] = node;
            this.compiled_templates[name] = null;
          } else if (extend) {
            delete this.compiled_templates[extend];
            if (this.extend_templates[extend]) {
              this.extend_templates[extend].push(node);
            } else {
              this.extend_templates[extend] = [node];
            }
          }
        }
      }
      if (callback) {
        callback(null, template);
      }
      return true;
    },
    preprocess: function(doc) {
      var self = this;
      var childs =
        (doc.documentElement && doc.documentElement.childNodes) ||
        doc.childNodes ||
        [];
      for (var i = 0; i < childs.length; i++) {
        var node = childs[i];
        if (node.nodeType === 1 && node.nodeName == "parsererror") {
          return this.tools.exception(node.innerText);
        }
      }
      var tbranch = doc.querySelectorAll("[t-elif], [t-else]");
      for (var i = 0, ilen = tbranch.length; i < ilen; i++) {
        var node = tbranch[i];
        var prev_elem = self.tools.get_element_sibling(node, "previousSibling");
        var pattr = function(name) {
          return prev_elem.getAttribute(name);
        };
        var nattr = function(name) {
          return +!!node.getAttribute(name);
        };
        if (prev_elem && (pattr("t-if") || pattr("t-elif"))) {
          if (pattr("t-foreach")) {
            return self.tools.exception(
              "Error: t-if cannot stay at the same level as t-foreach when using t-elif or t-else"
            );
          }
          if (
            ["t-if", "t-elif", "t-else"].map(nattr).reduce(function(a, b) {
              return a + b;
            }) > 1
          ) {
            return self.tools.exception(
              "Error: only one conditional branching directive is allowed per node"
            );
          }
          var text_node;
          while ((text_node = node.previousSibling) !== prev_elem) {
            if (self.tools.trim(text_node.nodeValue)) {
              return self.tools.exception(
                "Error: text is not allowed between branching directives"
              );
            }
            text_node.parentNode.removeChild(text_node);
          }
        } else {
          return self.tools.exception(
            "Error: t-elif and t-else directives must be preceded by a t-if or t-elif directive"
          );
        }
      }
      return doc;
    },
    load_xml: function(s, callback) {
      var self = this;
      var async = !!callback;
      s = this.tools.trim(s);
      if (s.charAt(0) === "<") {
        var tpl = this.load_xml_string(s);
        if (callback) {
          callback(null, tpl);
        }
        return tpl;
      } else {
        var req = this.get_xhr();
        if (this.debug) {
          s += "?debug=" + new Date().getTime();
        }
        req.open("GET", s, async);
        if (async) {
          req.addEventListener("load", function() {
            if (req.status == 200 || req.status == 0) {
              callback(null, self._parse_from_request(req));
            } else {
              callback(
                new Error(
                  "Can't load template " + s + ", http status " + req.status
                )
              );
            }
          });
        }
        req.send(null);
        if (!async) {
          return this._parse_from_request(req);
        }
      }
    },
    _parse_from_request: function(req) {
      var xDoc = req.responseXML;
      if (xDoc) {
        if (!xDoc.documentElement) {
          throw new Error(
            "QWeb2: This xml document has no root document : " +
              xDoc.responseText
          );
        }
        if (xDoc.documentElement.nodeName == "parsererror") {
          throw new Error(
            "QWeb2: Could not parse document :" +
              xDoc.documentElement.childNodes[0].nodeValue
          );
        }
        return xDoc;
      } else {
        return this.load_xml_string(req.responseText);
      }
    },
    load_xml_string: function(s) {
      if (window.DOMParser) {
        var dp = new DOMParser();
        var r = dp.parseFromString(s, "text/xml");
        if (
          r.body &&
          r.body.firstChild &&
          r.body.firstChild.nodeName == "parsererror"
        ) {
          throw new Error(
            "QWeb2: Could not parse document :" + r.body.innerText
          );
        }
        return r;
      }
      var xDoc;
      try {
        xDoc = new ActiveXObject("MSXML2.DOMDocument");
      } catch (e) {
        throw new Error("Could not find a DOM Parser: " + e.message);
      }
      xDoc.async = false;
      xDoc.preserveWhiteSpace = true;
      xDoc.loadXML(s);
      return xDoc;
    },
    has_template: function(template) {
      return !!this.templates[template];
    },
    get_xhr: function() {
      if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest();
      }
      try {
        return new ActiveXObject("MSXML2.XMLHTTP.3.0");
      } catch (e) {
        throw new Error("Could not get XHR");
      }
    },
    compile: function(node) {
      var e = new QWeb2.Element(this, node);
      var template = node.getAttribute(this.prefix + "-name");
      return (
        "   /* 'this' refers to Qweb2.Engine instance */\n" +
        "   var context = { engine : this, template : " +
        this.tools.js_escape(template) +
        " };\n" +
        "   dict = dict || {};\n" +
        "   dict['__template__'] = '" +
        template +
        "';\n" +
        "   var r = [];\n" +
        "   /* START TEMPLATE */" +
        (this.debug ? "" : " try {\n") +
        e.compile() +
        "\n" +
        "   /* END OF TEMPLATE */" +
        (this.debug
          ? ""
          : " } catch(error) {\n" +
            "       if (console && console.exception) console.exception(error);\n" +
            "       context.engine.tools.exception('Runtime Error: ' + error, context);\n") +
        (this.debug ? "" : "   }\n") +
        "   return r.join('');"
      );
    },
    render: function(template, dict) {
      dict = dict || {};
      QWeb2.tools.extend(dict, this.default_dict);
      var r = this._render(template, dict);
      return r;
    },
    _render: function(template, dict) {
      if (this.compiled_templates[template]) {
        return this.compiled_templates[template].apply(this, [dict || {}]);
      } else if (this.templates[template]) {
        var ext;
        if ((ext = this.extend_templates[template])) {
          var extend_node;
          while ((extend_node = ext.shift())) {
            this.extend(template, extend_node);
          }
        }
        var code = this.compile(this.templates[template]),
          tcompiled;
        try {
          tcompiled = new Function(["dict"], code);
        } catch (error) {
          if (this.debug && window.console) {
            console.log(code);
          }
          this.tools.exception("Error evaluating template: " + error, {
            template: template
          });
        }
        if (!tcompiled) {
          this.tools.exception("Error evaluating template: (IE?)" + error, {
            template: template
          });
        }
        this.compiled_templates[template] = tcompiled;
        return this.render(template, dict);
      } else {
        return this.tools.exception("Template '" + template + "' not found");
      }
    },
    extend: function(template, extend_node) {
      var jQuery = this.jQuery;
      if (!jQuery) {
        return this.tools.exception(
          "Can't extend template " + template + " without jQuery"
        );
      }
      var template_dest = this.templates[template];
      for (var i = 0, ilen = extend_node.childNodes.length; i < ilen; i++) {
        var child = extend_node.childNodes[i];
        if (child.nodeType === 1) {
          var jquery = child.getAttribute(this.prefix + "-jquery"),
            operation = child.getAttribute(this.prefix + "-operation"),
            target,
            error_msg = "Error while extending template '" + template;
          if (jquery) {
            target = jQuery(jquery, template_dest);
            if (!target.length && window.console) {
              console.debug(
                "Can't find \"" +
                  jquery +
                  '" when extending template ' +
                  template
              );
            }
          } else {
            this.tools.exception(error_msg + "No expression given");
          }
          error_msg += "' (expression='" + jquery + "') : ";
          if (operation) {
            var allowed_operations = "append,prepend,before,after,replace,inner,attributes".split(
              ","
            );
            if (this.tools.arrayIndexOf(allowed_operations, operation) == -1) {
              this.tools.exception(
                error_msg + "Invalid operation : '" + operation + "'"
              );
            }
            operation =
              { replace: "replaceWith", inner: "html" }[operation] || operation;
            if (operation === "attributes") {
              jQuery("attribute", child).each(function() {
                var attrib = jQuery(this);
                target.attr(attrib.attr("name"), attrib.text());
              });
            } else {
              target[operation](child.cloneNode(true).childNodes);
            }
          } else {
            try {
              var f = new Function(
                ["$", "document"],
                this.tools.xml_node_to_string(child, true)
              );
            } catch (error) {
              return this.tools.exception("Parse " + error_msg + error);
            }
            try {
              f.apply(target, [jQuery, template_dest.ownerDocument]);
            } catch (error) {
              return this.tools.exception("Runtime " + error_msg + error);
            }
          }
        }
      }
    }
  });
  return Engine;
})();
QWeb2.Element = (function() {
  function Element(engine, node) {
    this.engine = engine;
    this.node = node;
    this.tag = node.tagName;
    this.actions = { tag: this.tag };
    this.actions_done = [];
    this.attributes = {};
    this.children = [];
    this._top = [];
    this._bottom = [];
    this._indent = 1;
    this.process_children = true;
    this.is_void_element = ~QWeb2.tools.arrayIndexOf(
      this.engine.void_elements,
      this.tag
    );
    var childs = this.node.childNodes;
    if (childs) {
      for (var i = 0, ilen = childs.length; i < ilen; i++) {
        this.children.push(new QWeb2.Element(this.engine, childs[i]));
      }
    }
    var attrs = this.node.attributes;
    if (attrs) {
      for (var j = 0, jlen = attrs.length; j < jlen; j++) {
        var attr = attrs[j];
        var name = attr.name;
        var m = name.match(new RegExp("^" + this.engine.prefix + "-(.+)"));
        if (m) {
          name = m[1];
          if (name === "name") {
            continue;
          }
          if (name.match(/^attf?(-.*)?/)) {
            this.attributes[m[0]] = attr.value;
          } else {
            this.actions[name] = attr.value;
          }
        } else {
          this.attributes[name] = attr.value;
        }
      }
    }
    if (this.engine.preprocess_node) {
      this.engine.preprocess_node.call(this);
    }
  }
  QWeb2.tools.extend(Element.prototype, {
    compile: function() {
      var r = [],
        instring = false,
        lines = this._compile().split("\n");
      for (var i = 0, ilen = lines.length; i < ilen; i++) {
        var m,
          line = lines[i];
        if ((m = line.match(/^(\s*)\/\/@string=(.*)/))) {
          if (instring) {
            if (this.engine.debug) {
              r.push(
                (m[2].indexOf("\\n") != -1 ? "',\n\t" + m[1] + "'" : "") + m[2]
              );
            } else {
              r.push(m[2]);
            }
          } else {
            r.push(m[1] + "r.push('" + m[2]);
            instring = true;
          }
        } else {
          if (instring) {
            r.push("');\n");
          }
          instring = false;
          r.push(line + "\n");
        }
      }
      return r.join("");
    },
    _compile: function() {
      switch (this.node.nodeType) {
        case 3:
        case 4:
          this.top_string(this.node.data);
          break;
        case 1:
          this.compile_element();
      }
      var r = this._top.join("");
      if (this.process_children) {
        for (var i = 0, ilen = this.children.length; i < ilen; i++) {
          var child = this.children[i];
          child._indent = this._indent;
          r += child._compile();
        }
      }
      r += this._bottom.join("");
      return r;
    },
    format_expression: function(e) {
      if (QWeb2.expressions_cache[e]) {
        return QWeb2.expressions_cache[e];
      }
      var chars = e.split(""),
        instring = "",
        invar = "",
        invar_pos = 0,
        r = "";
      chars.push(" ");
      for (var i = 0, ilen = chars.length; i < ilen; i++) {
        var c = chars[i];
        if (instring.length) {
          if (c === instring && chars[i - 1] !== "\\") {
            instring = "";
          }
        } else if (c === '"' || c === "'") {
          instring = c;
        } else if (c.match(/[a-zA-Z_\$]/) && !invar.length) {
          invar = c;
          invar_pos = i;
          continue;
        } else if (c.match(/\W/) && invar.length) {
          if (
            chars[invar_pos - 1] !== "." &&
            QWeb2.tools.arrayIndexOf(this.engine.reserved_words, invar) < 0
          ) {
            invar =
              this.engine.word_replacement[invar] || "dict['" + invar + "']";
          }
          r += invar;
          invar = "";
        } else if (invar.length) {
          invar += c;
          continue;
        }
        r += c;
      }
      r = r.slice(0, -1);
      QWeb2.expressions_cache[e] = r;
      return r;
    },
    format_str: function(e) {
      if (e == "0") {
        return "dict[0]";
      }
      return this.format_expression(e);
    },
    string_interpolation: function(s) {
      var _this = this;
      if (!s) {
        return "''";
      }
      function append_literal(s) {
        s && r.push(_this.engine.tools.js_escape(s));
      }
      var re = /(?:#{(.+?)}|{{(.+?)}})/g,
        start = 0,
        r = [],
        m;
      while ((m = re.exec(s))) {
        append_literal(s.slice(start, re.lastIndex - m[0].length));
        r.push("(" + this.format_str(m[2] || m[1]) + ")");
        start = re.lastIndex;
      }
      append_literal(s.slice(start));
      return r.join(" + ");
    },
    indent: function() {
      return this._indent++;
    },
    dedent: function() {
      if (this._indent !== 0) {
        return this._indent--;
      }
    },
    get_indent: function() {
      return new Array(this._indent + 1).join("\t");
    },
    top: function(s) {
      return this._top.push(this.get_indent() + s + "\n");
    },
    top_string: function(s) {
      return this._top.push(
        this.get_indent() +
          "//@string=" +
          this.engine.tools.js_escape(s, true) +
          "\n"
      );
    },
    bottom: function(s) {
      return this._bottom.unshift(this.get_indent() + s + "\n");
    },
    bottom_string: function(s) {
      return this._bottom.unshift(
        this.get_indent() +
          "//@string=" +
          this.engine.tools.js_escape(s, true) +
          "\n"
      );
    },
    compile_element: function() {
      for (
        var i = 0, ilen = this.engine.actions_precedence.length;
        i < ilen;
        i++
      ) {
        var a = this.engine.actions_precedence[i];
        if (a in this.actions) {
          var value = this.actions[a];
          var key = "compile_action_" + a;
          if (this[key]) {
            this[key](value);
          } else if (this.engine[key]) {
            this.engine[key].call(this, value);
          } else {
            this.engine.tools.exception(
              "No handler method for action '" + a + "'"
            );
          }
        }
      }
    },
    compile_action_tag: function() {
      if (this.tag.toLowerCase() !== this.engine.prefix) {
        this.top_string("<" + this.tag);
        for (var a in this.attributes) {
          var v = this.attributes[a];
          var d = a.split("-");
          if (d[0] === this.engine.prefix && d.length > 1) {
            if (d.length === 2) {
              this.top(
                "r.push(context.engine.tools.gen_attribute(" +
                  this.format_expression(v) +
                  "));"
              );
            } else {
              this.top(
                "r.push(context.engine.tools.gen_attribute(['" +
                  d.slice(2).join("-") +
                  "', (" +
                  (d[1] === "att"
                    ? this.format_expression(v)
                    : this.string_interpolation(v)) +
                  ")]));"
              );
            }
          } else {
            this.top_string(this.engine.tools.gen_attribute([a, v]));
          }
        }
        if (
          this.actions.opentag === "true" ||
          (!this.children.length && this.is_void_element)
        ) {
          this.top_string("/>");
        } else {
          this.top_string(">");
          this.bottom_string("</" + this.tag + ">");
        }
      }
    },
    compile_action_if: function(value) {
      this.top("if (" + this.format_expression(value) + ") {");
      this.bottom("}");
      this.indent();
    },
    compile_action_elif: function(value) {
      this.top("else if (" + this.format_expression(value) + ") {");
      this.bottom("}");
      this.indent();
    },
    compile_action_else: function(value) {
      this.top("else {");
      this.bottom("}");
      this.indent();
    },
    compile_action_foreach: function(value) {
      var as = this.actions["as"] || value.replace(/[^a-zA-Z0-9]/g, "_");
      this.top(
        "context.engine.tools.foreach(context, " +
          this.format_expression(value) +
          ", " +
          this.engine.tools.js_escape(as) +
          ", dict, function(context, dict) {"
      );
      this.bottom("});");
      this.indent();
    },
    compile_action_call: function(value) {
      if (this.children.length === 0) {
        return this.top(
          "r.push(context.engine.tools.call(context, " +
            this.string_interpolation(value) +
            ", dict));"
        );
      } else {
        this.top(
          "r.push(context.engine.tools.call(context, " +
            this.string_interpolation(value) +
            ", dict, null, function(context, dict) {"
        );
        this.bottom("}));");
        this.indent();
        this.top("var r = [];");
        return this.bottom("return r.join('');");
      }
    },
    compile_action_set: function(value) {
      var variable = this.format_expression(value);
      if (this.actions["value"]) {
        if (this.children.length) {
          this.engine.tools.warning(
            "@set with @value plus node chidren found. Children are ignored."
          );
        }
        this.top(
          variable +
            " = (" +
            this.format_expression(this.actions["value"]) +
            ");"
        );
        this.process_children = false;
      } else {
        if (this.children.length === 0) {
          this.top(variable + " = '';");
        } else if (
          this.children.length === 1 &&
          this.children[0].node.nodeType === 3
        ) {
          this.top(
            variable +
              " = " +
              this.engine.tools.js_escape(this.children[0].node.data) +
              ";"
          );
          this.process_children = false;
        } else {
          this.top(variable + " = (function(dict) {");
          this.bottom("})(dict);");
          this.indent();
          this.top("var r = [];");
          this.bottom("return r.join('');");
        }
      }
    },
    compile_action_esc: function(value) {
      this.top("var t = " + this.format_str(value) + ";");
      this.top("if (t != null) r.push(context.engine.tools.html_escape(t));");
      this.top("else {");
      this.bottom("}");
      this.indent();
    },
    compile_action_raw: function(value) {
      this.top("var t = " + this.format_str(value) + ";");
      this.top("if (t != null) r.push(t);");
      this.top("else {");
      this.bottom("}");
      this.indent();
    },
    compile_action_js: function(value) {
      this.top("(function(" + value + ") {");
      this.bottom("})(dict);");
      this.indent();
      var lines = this.engine.tools
        .xml_node_to_string(this.node, true)
        .split(/\r?\n/);
      for (var i = 0, ilen = lines.length; i < ilen; i++) {
        this.top(lines[i]);
      }
      this.process_children = false;
    },
    compile_action_debug: function(value) {
      this.top("debugger;");
    },
    compile_action_log: function(value) {
      this.top("console.log(" + this.format_expression(value) + ");");
    }
  });
  return Element;
})();

/* /web/static/src/js/boot.js defined in bundle 'im_livechat.external_lib' */
(function() {
  "use strict";
  var jobs = [];
  var factories = Object.create(null);
  var job_names = [];
  var job_deps = [];
  var job_deferred = [];
  var services = Object.create({});
  var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm;
  var cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
  var debug = $.deparam($.param.querystring()).debug !== undefined;
  var odoo = (window.odoo = window.odoo || {});
  _.extend(odoo, {
    testing: typeof QUnit === "object",
    debug: debug,
    remaining_jobs: jobs,
    __DEBUG__: {
      didLogInfo: $.Deferred(),
      get_dependencies: function(name, transitive) {
        var deps = name instanceof Array ? name : [name],
          changed;
        do {
          changed = false;
          _.each(job_deps, function(dep) {
            if (_.contains(deps, dep.to) && !_.contains(deps, dep.from)) {
              deps.push(dep.from);
              changed = true;
            }
          });
        } while (changed && transitive);
        return deps;
      },
      get_dependents: function(name) {
        return _.pluck(_.where(job_deps, { from: name }), "to");
      },
      get_waited_jobs: function() {
        return _.uniq(
          _.map(jobs, function(job) {
            return job.name;
          })
        );
      },
      get_missing_jobs: function() {
        var self = this;
        var waited = this.get_waited_jobs();
        var missing = [];
        _.each(waited, function(job) {
          _.each(self.get_dependencies(job), function(job) {
            if (!(job in self.services)) {
              missing.push(job);
            }
          });
        });
        return _.filter(_.difference(_.uniq(missing), waited), function(job) {
          return !job.error;
        });
      },
      get_failed_jobs: function() {
        return _.filter(jobs, function(job) {
          return !!job.error;
        });
      },
      factories: factories,
      services: services
    },
    define: function() {
      var args = Array.prototype.slice.call(arguments);
      var name =
        typeof args[0] === "string" ? args.shift() : _.uniqueId("__job");
      var factory = args[args.length - 1];
      var deps;
      if (args[0] instanceof Array) {
        deps = args[0];
      } else {
        deps = [];
        factory
          .toString()
          .replace(commentRegExp, "")
          .replace(cjsRequireRegExp, function(match, dep) {
            deps.push(dep);
          });
      }
      if (odoo.debug) {
        if (!(deps instanceof Array)) {
          throw new Error("Dependencies should be defined by an array", deps);
        }
        if (typeof factory !== "function") {
          throw new Error("Factory should be defined by a function", factory);
        }
        if (typeof name !== "string") {
          throw new Error("Invalid name definition (should be a string", name);
        }
        if (name in factories) {
          throw new Error("Service " + name + " already defined");
        }
      }
      factory.deps = deps;
      factories[name] = factory;
      jobs.push({ name: name, factory: factory, deps: deps });
      job_names.push(name);
      _.each(deps, function(dep) {
        job_deps.push({ from: dep, to: name });
      });
      this.process_jobs(jobs, services);
    },
    log: function() {
      var missing = [];
      var failed = [];
      if (jobs.length) {
        var debug_jobs = {};
        var rejected = [];
        var rejected_linked = [];
        var job;
        var jobdep;
        for (var k = 0; k < jobs.length; k++) {
          debug_jobs[jobs[k].name] = job = {
            dependencies: jobs[k].deps,
            dependents: odoo.__DEBUG__.get_dependents(jobs[k].name),
            name: jobs[k].name
          };
          if (jobs[k].error) {
            job.error = jobs[k].error;
          }
          if (jobs[k].rejected) {
            job.rejected = jobs[k].rejected;
            rejected.push(job.name);
          }
          var deps = odoo.__DEBUG__.get_dependencies(job.name);
          for (var i = 0; i < deps.length; i++) {
            if (job.name !== deps[i] && !(deps[i] in services)) {
              jobdep =
                debug_jobs[deps[i]] ||
                (deps[i] in factories &&
                  _.find(jobs, function(job) {
                    return job.name === deps[i];
                  }));
              if (jobdep && jobdep.rejected) {
                if (!job.rejected) {
                  job.rejected = [];
                  rejected_linked.push(job.name);
                }
                job.rejected.push(deps[i]);
              } else {
                if (!job.missing) {
                  job.missing = [];
                }
                job.missing.push(deps[i]);
              }
            }
          }
        }
        missing = odoo.__DEBUG__.get_missing_jobs();
        failed = odoo.__DEBUG__.get_failed_jobs();
        var unloaded = _.filter(debug_jobs, function(job) {
          return job.missing;
        });
        if (odoo.debug || !_.isEmpty(failed) || !_.isEmpty(unloaded)) {
          var log = console[
            _.isEmpty(failed) || _.isEmpty(unloaded) ? "info" : "error"
          ].bind(console);
          log(
            (_.isEmpty(failed)
              ? _.isEmpty(unloaded)
                ? "info"
                : "warning"
              : "error") + ": Some modules could not be started"
          );
          if (missing.length) {
            log("Missing dependencies:    ", missing);
          }
          if (!_.isEmpty(failed)) {
            log("Failed modules:          ", _.pluck(failed, "name"));
          }
          if (!_.isEmpty(rejected)) {
            log("Rejected modules:        ", rejected);
          }
          if (!_.isEmpty(rejected_linked)) {
            log("Rejected linked modules: ", rejected_linked);
          }
          if (!_.isEmpty(unloaded)) {
            log("Non loaded modules:      ", _.pluck(unloaded, "name"));
          }
          if (odoo.debug && !_.isEmpty(debug_jobs)) {
            log("Debug:                   ", debug_jobs);
          }
        }
      }
      odoo.__DEBUG__.js_modules = {
        missing: missing,
        failed: _.pluck(failed, "name")
      };
      odoo.__DEBUG__.didLogInfo.resolve();
    },
    process_jobs: function(jobs, services) {
      var job;
      function process_job(job) {
        var require = make_require(job);
        var job_exec;
        var def = $.Deferred();
        try {
          job_exec = job.factory.call(null, require);
          jobs.splice(jobs.indexOf(job), 1);
          job_deferred.push(def);
        } catch (e) {
          job.error = e;
        }
        if (!job.error) {
          $.when(job_exec).then(
            function(data) {
              services[job.name] = data;
              def.resolve();
              odoo.process_jobs(jobs, services);
            },
            function(e) {
              job.rejected = e || true;
              jobs.push(job);
              def.resolve();
            }
          );
        }
      }
      function is_ready(job) {
        return (
          !job.error &&
          !job.rejected &&
          _.every(job.factory.deps, function(name) {
            return name in services;
          })
        );
      }
      function make_require(job) {
        var deps = _.pick(services, job.deps);
        function require(name) {
          if (!(name in deps)) {
            console.error("Undefined dependency: ", name);
          } else {
            require.__require_calls++;
          }
          return deps[name];
        }
        require.__require_calls = 0;
        return require;
      }
      while (jobs.length && (job = _.find(jobs, is_ready))) {
        process_job(job);
      }
      return services;
    }
  });
  var log_when_loaded = function() {
    _.delay(function() {
      var len = job_deferred.length;
      $.when.apply($, job_deferred).then(function() {
        if (len === job_deferred.length) {
          odoo.log();
        } else {
          log_when_loaded();
        }
      });
    }, 6000);
  };
  $(log_when_loaded);
})();

/* /web/static/src/js/libs/download.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.download", function() {
  return function download(data, filename, mimetype) {
    var self = window,
      defaultMime = "application/octet-stream",
      mimeType = mimetype || defaultMime,
      payload = data,
      url = !filename && !mimetype && payload,
      anchor = document.createElement("a"),
      toString = function(a) {
        return String(a);
      },
      myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString,
      fileName = filename || "download",
      blob,
      reader;
    myBlob = myBlob.call ? myBlob.bind(self) : Blob;
    if (String(this) === "true") {
      payload = [payload, mimeType];
      mimeType = payload[0];
      payload = payload[1];
    }
    if (url && url.length < 2048) {
      fileName = url
        .split("/")
        .pop()
        .split("?")[0];
      anchor.href = url;
      if (anchor.href.indexOf(url) !== -1) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true);
        ajax.responseType = "blob";
        ajax.onload = function(e) {
          download(e.target.response, fileName, defaultMime);
        };
        setTimeout(function() {
          ajax.send();
        }, 0);
        return ajax;
      }
    }
    if (/^data:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)) {
      if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {
        payload = dataUrlToBlob(payload);
        mimeType = payload.type || defaultMime;
      } else {
        return navigator.msSaveBlob
          ? navigator.msSaveBlob(dataUrlToBlob(payload), fileName)
          : saver(payload);
      }
    }
    blob =
      payload instanceof myBlob
        ? payload
        : new myBlob([payload], { type: mimeType });
    function dataUrlToBlob(strUrl) {
      var parts = strUrl.split(/[:;,]/),
        type = parts[1],
        decoder = parts[2] === "base64" ? atob : decodeURIComponent,
        binData = decoder(parts.pop()),
        mx = binData.length,
        i = 0,
        uiArr = new Uint8Array(mx);
      for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);
      return new myBlob([uiArr], { type: type });
    }
    function saver(url, winMode) {
      if ("download" in anchor) {
        anchor.href = url;
        anchor.setAttribute("download", fileName);
        anchor.className = "download-js-link";
        anchor.innerHTML = "downloading...";
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        setTimeout(function() {
          anchor.click();
          document.body.removeChild(anchor);
          if (winMode === true) {
            setTimeout(function() {
              self.URL.revokeObjectURL(anchor.href);
            }, 250);
          }
        }, 66);
        return true;
      }
      if (
        /(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(
          navigator.userAgent
        )
      ) {
        url = url.replace(/^data:([\w\/\-+]+)/, defaultMime);
        if (!window.open(url)) {
          if (
            confirm(
              "Displaying New Document\n\nUse Save As... to download, then click back to return to this page."
            )
          ) {
            location.href = url;
          }
        }
        return true;
      }
      var f = document.createElement("iframe");
      document.body.appendChild(f);
      if (!winMode) {
        url = "data:" + url.replace(/^data:([\w\/\-+]+)/, defaultMime);
      }
      f.src = url;
      setTimeout(function() {
        document.body.removeChild(f);
      }, 333);
    }
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(blob, fileName);
    }
    if (self.URL) {
      saver(self.URL.createObjectURL(blob), true);
    } else {
      if (typeof blob === "string" || blob.constructor === toString) {
        try {
          return saver("data:" + mimeType + ";base64," + self.btoa(blob));
        } catch (y) {
          return saver("data:" + mimeType + "," + encodeURIComponent(blob));
        }
      }
      reader = new FileReader();
      reader.onload = function() {
        saver(this.result);
      };
      reader.readAsDataURL(blob);
    }
    return true;
  };
});

/* /web/static/src/js/libs/content-disposition.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.contentdisposition", function() {
  "use strict";
  var HEX_ESCAPE_REPLACE_REGEXP = /%([0-9A-Fa-f]{2})/g;
  var NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g;
  var QESC_REGEXP = /\\([\u0000-\u007f])/g;
  var PARAM_REGEXP = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g;
  var EXT_VALUE_REGEXP = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/;
  var DISPOSITION_TYPE_REGEXP = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;
  function decodefield(str) {
    var match = EXT_VALUE_REGEXP.exec(str);
    if (!match) {
      throw new TypeError("invalid extended field value");
    }
    var charset = match[1].toLowerCase();
    var encoded = match[2];
    switch (charset) {
      case "iso-8859-1":
        return encoded
          .replace(HEX_ESCAPE_REPLACE_REGEXP, pdecode)
          .replace(NON_LATIN1_REGEXP, "?");
      case "utf-8":
        return decodeURIComponent(encoded);
      default:
        throw new TypeError("unsupported charset in extended field");
    }
  }
  function parse(string) {
    if (!string || typeof string !== "string") {
      throw new TypeError("argument string is required");
    }
    var match = DISPOSITION_TYPE_REGEXP.exec(string);
    if (!match) {
      throw new TypeError("invalid type format");
    }
    var index = match[0].length;
    var type = match[1].toLowerCase();
    var key;
    var names = [];
    var params = {};
    var value;
    index = PARAM_REGEXP.lastIndex =
      match[0].substr(-1) === ";" ? index - 1 : index;
    while ((match = PARAM_REGEXP.exec(string))) {
      if (match.index !== index) {
        throw new TypeError("invalid parameter format");
      }
      index += match[0].length;
      key = match[1].toLowerCase();
      value = match[2];
      if (names.indexOf(key) !== -1) {
        throw new TypeError("invalid duplicate parameter");
      }
      names.push(key);
      if (key.indexOf("*") + 1 === key.length) {
        key = key.slice(0, -1);
        value = decodefield(value);
        params[key] = value;
        continue;
      }
      if (typeof params[key] === "string") {
        continue;
      }
      if (value[0] === '"') {
        value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
      }
      params[key] = value;
    }
    if (index !== -1 && index !== string.length) {
      throw new TypeError("invalid parameter format");
    }
    return new ContentDisposition(type, params);
  }
  function pdecode(str, hex) {
    return String.fromCharCode(parseInt(hex, 16));
  }
  function ContentDisposition(type, parameters) {
    this.type = type;
    this.parameters = parameters;
  }
  return { parse: parse };
});

/* /web/static/src/js/services/config.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.config", function() {
  "use strict";
  var debugParam = $.deparam($.param.querystring()).debug;
  var debug = false;
  if (debugParam !== undefined) {
    debug = debugParam === "assets" ? "assets" : true;
  }
  var config = {
    debug: debug,
    device: {
      touch: "ontouchstart" in window || "onmsgesturechange" in window,
      size_class: null,
      isMobile: null,
      SIZES: { XS: 0, VSM: 1, SM: 2, MD: 3, LG: 4, XL: 5, XXL: 6 }
    }
  };
  var medias = [
    window.matchMedia("(max-width: 474px)"),
    window.matchMedia("(min-width: 475px) and (max-width: 575px)"),
    window.matchMedia("(min-width: 576px) and (max-width: 767px)"),
    window.matchMedia("(min-width: 768px) and (max-width: 991px)"),
    window.matchMedia("(min-width: 992px) and (max-width: 1199px)"),
    window.matchMedia("(min-width: 1200px) and (max-width: 1533px)"),
    window.matchMedia("(min-width: 1534px)")
  ];
  function _getSizeClass() {
    for (var i = 0; i < medias.length; i++) {
      if (medias[i].matches) {
        return i;
      }
    }
  }
  function _updateSizeProps() {
    var sc = _getSizeClass();
    if (sc !== config.device.size_class) {
      config.device.size_class = sc;
      config.device.isMobile =
        config.device.size_class <= config.device.SIZES.SM;
    }
  }
  _.invoke(medias, "addListener", _updateSizeProps);
  _updateSizeProps();
  return config;
});

/* /web/static/src/js/core/abstract_service.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.AbstractService", function(require) {
  "use strict";
  var Class = require("web.Class");
  var Mixins = require("web.mixins");
  var ServicesMixin = require("web.ServicesMixin");
  var AbstractService = Class.extend(
    Mixins.EventDispatcherMixin,
    ServicesMixin,
    {
      dependencies: [],
      init: function(parent) {
        Mixins.EventDispatcherMixin.init.call(this, arguments);
        this.setParent(parent);
      },
      start: function() {}
    }
  );
  return AbstractService;
});

/* /web/static/src/js/core/class.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.Class", function() {
  "use strict";
  function OdooClass() {}
  var initializing = false;
  var fnTest = /xyz/.test(function() {
    xyz();
  })
    ? /\b_super\b/
    : /.*/;
  OdooClass.extend = function() {
    var _super = this.prototype;
    var args = _.toArray(arguments);
    args.unshift({});
    var prop = _.extend.apply(_, args);
    initializing = true;
    var This = this;
    var prototype = new This();
    initializing = false;
    _.each(prop, function(val, name) {
      prototype[name] =
        typeof prop[name] == "function" && fnTest.test(prop[name])
          ? (function(name, fn) {
              return function() {
                var tmp = this._super;
                this._super = _super[name];
                var ret = fn.apply(this, arguments);
                this._super = tmp;
                return ret;
              };
            })(name, prop[name])
          : prop[name];
    });
    function Class() {
      if (this.constructor !== OdooClass) {
        throw new Error(
          "You can only instanciate objects with the 'new' operator"
        );
      }
      this._super = null;
      if (!initializing && this.init) {
        var ret = this.init.apply(this, arguments);
        if (ret) {
          return ret;
        }
      }
      return this;
    }
    Class.include = function(properties) {
      _.each(properties, function(val, name) {
        if (
          typeof properties[name] !== "function" ||
          !fnTest.test(properties[name])
        ) {
          prototype[name] = properties[name];
        } else if (
          typeof prototype[name] === "function" &&
          prototype.hasOwnProperty(name)
        ) {
          prototype[name] = (function(name, fn, previous) {
            return function() {
              var tmp = this._super;
              this._super = previous;
              var ret = fn.apply(this, arguments);
              this._super = tmp;
              return ret;
            };
          })(name, properties[name], prototype[name]);
        } else if (typeof _super[name] === "function") {
          prototype[name] = (function(name, fn) {
            return function() {
              var tmp = this._super;
              this._super = _super[name];
              var ret = fn.apply(this, arguments);
              this._super = tmp;
              return ret;
            };
          })(name, properties[name]);
        }
      });
    };
    Class.prototype = prototype;
    Class.constructor = Class;
    Class.extend = this.extend;
    return Class;
  };
  return OdooClass;
});

/* /web/static/src/js/core/collections.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.collections", function(require) {
  "use strict";
  var Class = require("web.Class");
  var Tree = Class.extend({
    init: function(data) {
      this._data = data;
      this._children = [];
    },
    getData: function() {
      return this._data;
    },
    addChild: function(tree) {
      this._children.push(tree);
    }
  });
  return { Tree: Tree };
});

/* /web/static/src/js/core/translation.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.translation", function(require) {
  "use strict";
  var Class = require("web.Class");
  var TranslationDataBase = Class.extend({
    init: function() {
      this.db = {};
      this.multi_lang = false;
      this.parameters = {
        direction: "ltr",
        date_format: "%m/%d/%Y",
        time_format: "%H:%M:%S",
        grouping: [],
        decimal_point: ".",
        thousands_sep: ","
      };
    },
    set_bundle: function(translation_bundle) {
      var self = this;
      this.multi_lang = translation_bundle.multi_lang;
      var modules = _.keys(translation_bundle.modules);
      modules.sort();
      if (_.include(modules, "web")) {
        modules = ["web"].concat(_.without(modules, "web"));
      }
      _.each(modules, function(name) {
        self.add_module_translation(translation_bundle.modules[name]);
      });
      if (translation_bundle.lang_parameters) {
        this.parameters = translation_bundle.lang_parameters;
        this.parameters.grouping = JSON.parse(this.parameters.grouping);
      }
    },
    add_module_translation: function(mod) {
      var self = this;
      _.each(mod.messages, function(message) {
        self.db[message.id] = message.string;
      });
    },
    build_translation_function: function() {
      var self = this;
      var fcnt = function(str) {
        var tmp = self.get(str);
        return tmp === undefined ? str : tmp;
      };
      fcnt.database = this;
      return fcnt;
    },
    get: function(key) {
      return this.db[key];
    },
    load_translations: function(session, modules, lang, url) {
      var self = this;
      return session
        .rpc(url || "/web/webclient/translations", {
          mods: modules || null,
          lang: lang || null
        })
        .done(function(trans) {
          self.set_bundle(trans);
        });
    }
  });
  var _t = new TranslationDataBase().build_translation_function();
  var _lt = function(s) {
    return {
      toString: function() {
        return _t(s);
      }
    };
  };
  {
    _t("less than a minute ago");
    _t("about a minute ago");
    _t("%d minutes ago");
    _t("about an hour ago");
    _t("%d hours ago");
    _t("a day ago");
    _t("%d days ago");
    _t("about a month ago");
    _t("%d months ago");
    _t("about a year ago");
    _t("%d years ago");
  }
  return { _t: _t, _lt: _lt, TranslationDataBase: TranslationDataBase };
});

/* /web/static/src/js/core/ajax.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.ajax", function(require) {
  "use strict";
  var core = require("web.core");
  var utils = require("web.utils");
  var time = require("web.time");
  var download = require("web.download");
  var contentdisposition = require("web.contentdisposition");
  var _t = core._t;
  function genericJsonRpc(fct_name, params, settings, fct) {
    var shadow = settings.shadow || false;
    delete settings.shadow;
    if (!shadow) {
      core.bus.trigger("rpc_request");
    }
    var deferred = $.Deferred();
    var data = {
      jsonrpc: "2.0",
      method: fct_name,
      params: params,
      id: Math.floor(Math.random() * 1000 * 1000 * 1000)
    };
    var xhr = fct(data);
    var result = xhr.pipe(
      function(result) {
        core.bus.trigger("rpc:result", data, result);
        if (result.error !== undefined) {
          if (
            result.error.data.arguments[0] !==
            "bus.Bus not available in test mode"
          ) {
            var func = console.error.bind(console);
            if (result.error.data.exception_type === "user_error") {
              func = console.log.bind(console);
            }
            func(
              "Server application error\n",
              "Error code:",
              result.error.code,
              "\n",
              "Error message:",
              result.error.message,
              "\n",
              "Error data message:\n",
              result.error.data.message,
              "\n",
              "Error data debug:\n",
              result.error.data.debug
            );
          }
          return $.Deferred().reject("server", result.error);
        } else {
          return result.result;
        }
      },
      function() {
        var def = $.Deferred();
        return def.reject.apply(
          def,
          ["communication"].concat(_.toArray(arguments))
        );
      }
    );
    deferred.abort = function() {
      deferred.reject(
        { message: "XmlHttpRequestError abort" },
        $.Event("abort")
      );
      if (xhr.abort) {
        xhr.abort();
      }
    };
    result.then(
      function(result) {
        if (!shadow) {
          core.bus.trigger("rpc_response");
        }
        deferred.resolve(result);
      },
      function(type, error, textStatus, errorThrown) {
        if (type === "server") {
          if (!shadow) {
            core.bus.trigger("rpc_response");
          }
          if (error.code === 100) {
            core.bus.trigger("invalidate_session");
          }
          deferred.reject(error, $.Event());
        } else {
          if (!shadow) {
            core.bus.trigger("rpc_response_failed");
          }
          var nerror = {
            code: -32098,
            message: "XmlHttpRequestError " + errorThrown,
            data: {
              type: "xhr" + textStatus,
              debug: error.responseText,
              objects: [error, errorThrown]
            }
          };
          deferred.reject(nerror, $.Event());
        }
      }
    );
    deferred.fail(function() {
      deferred.fail(function(error, event) {
        if (!event.isDefaultPrevented()) {
          core.bus.trigger("rpc_error", error, event);
        }
      });
    });
    return deferred;
  }
  function jsonRpc(url, fct_name, params, settings) {
    settings = settings || {};
    return genericJsonRpc(fct_name, params, settings, function(data) {
      return $.ajax(
        url,
        _.extend({}, settings, {
          url: url,
          dataType: "json",
          type: "POST",
          data: JSON.stringify(data, time.date_to_utc),
          contentType: "application/json"
        })
      );
    });
  }
  function jsonpRpc(url, fct_name, params, settings) {
    settings = settings || {};
    return genericJsonRpc(fct_name, params, settings, function(data) {
      var payload_str = JSON.stringify(data, time.date_to_utc);
      var payload_url = $.param({ r: payload_str });
      var force2step = settings.force2step || false;
      delete settings.force2step;
      var session_id = settings.session_id || null;
      delete settings.session_id;
      if (payload_url.length < 2000 && !force2step) {
        return $.ajax(
          url,
          _.extend({}, settings, {
            url: url,
            dataType: "jsonp",
            jsonp: "jsonp",
            type: "GET",
            cache: false,
            data: { r: payload_str, session_id: session_id }
          })
        );
      } else {
        var args = { session_id: session_id, id: data.id };
        var ifid = _.uniqueId("oe_rpc_iframe");
        var html =
          "<iframe src='javascript:false;' name='" +
          ifid +
          "' id='" +
          ifid +
          "' style='display:none'></iframe>";
        var $iframe = $(html);
        var nurl = "jsonp=1&" + $.param(args);
        nurl = url.indexOf("?") !== -1 ? url + "&" + nurl : url + "?" + nurl;
        var $form = $("<form>")
          .attr("method", "POST")
          .attr("target", ifid)
          .attr("enctype", "multipart/form-data")
          .attr("action", nurl)
          .append(
            $('<input type="hidden" name="r" />').attr("value", payload_str)
          )
          .hide()
          .appendTo($("body"));
        var cleanUp = function() {
          if ($iframe) {
            $iframe.unbind("load").remove();
          }
          $form.remove();
        };
        var deferred = $.Deferred();
        $iframe.bind("load", function() {
          $iframe.unbind("load").bind("load", function() {
            $.ajax({
              url: url,
              dataType: "jsonp",
              jsonp: "jsonp",
              type: "GET",
              cache: false,
              data: { session_id: session_id, id: data.id }
            })
              .always(function() {
                cleanUp();
              })
              .done(function() {
                deferred.resolve.apply(deferred, arguments);
              })
              .fail(function() {
                deferred.reject.apply(deferred, arguments);
              });
          });
          $form.submit();
        });
        $form.after($iframe);
        if (settings.timeout) {
          realSetTimeout(function() {
            deferred.reject({});
          }, settings.timeout);
        }
        return deferred;
      }
    });
  }
  function rpc(url, params, settings) {
    return jsonRpc(url, "call", params, settings);
  }
  function realSetTimeout(fct, millis) {
    var finished = new Date().getTime() + millis;
    var wait = function() {
      var current = new Date().getTime();
      if (current < finished) {
        setTimeout(wait, finished - current);
      } else {
        fct();
      }
    };
    setTimeout(wait, millis);
  }
  var loadCSS = (function() {
    var urlDefs = Object.create(null);
    return function loadCSS(url) {
      if (url in urlDefs) {
      } else if ($('link[href="' + url + '"]').length) {
        urlDefs[url] = $.when();
      } else {
        var $link = $("<link>", {
          href: url,
          rel: "stylesheet",
          type: "text/css"
        });
        urlDefs[url] = $.Deferred();
        $link.on("load", function() {
          urlDefs[url].resolve();
        });
        $("head").append($link);
      }
      return urlDefs[url];
    };
  })();
  var loadJS = (function() {
    var urls = [];
    var defs = [];
    var load = function loadJS(url) {
      var alreadyRequired = $('script[src="' + url + '"]').length > 0;
      var index = _.indexOf(urls, url);
      if (index < 0) {
        urls.push(url);
        index = defs.push(alreadyRequired ? $.when() : $.Deferred()) - 1;
      }
      var def = defs[index];
      if (!alreadyRequired) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onload = script.onreadystatechange = function() {
          if (
            (script.readyState &&
              script.readyState !== "loaded" &&
              script.readyState !== "complete") ||
            script.onload_done
          ) {
            return;
          }
          script.onload_done = true;
          def.resolve(url);
        };
        script.onerror = function() {
          console.error("Error loading file", script.src);
          def.reject(url);
        };
        var head = document.head || document.getElementsByTagName("head")[0];
        head.appendChild(script);
      }
      return def;
    };
    return load;
  })();
  function get_file(options) {
    var xhr = new XMLHttpRequest();
    var data;
    if (options.form) {
      xhr.open(options.form.method, options.form.action);
      data = new FormData(options.form);
    } else {
      xhr.open("POST", options.url);
      data = new FormData();
      _.each(options.data || {}, function(v, k) {
        data.append(k, v);
      });
    }
    data.append("token", "dummy-because-api-expects-one");
    if (core.csrf_token) {
      data.append("csrf_token", core.csrf_token);
    }
    xhr.responseType = "blob";
    xhr.onload = function() {
      var mimetype = xhr.response.type;
      if (xhr.status === 200 && mimetype !== "text/html") {
        var header = (
          xhr.getResponseHeader("Content-Disposition") || ""
        ).replace(/;$/, "");
        var filename = header
          ? contentdisposition.parse(header).parameters.filename
          : null;
        download(xhr.response, filename, mimetype);
        if (options.success) {
          options.success();
        }
        return true;
      }
      if (!options.error) {
        return true;
      }
      var decoder = new FileReader();
      decoder.onload = function() {
        var contents = decoder.result;
        var err;
        var doc = new DOMParser().parseFromString(contents, "text/html");
        var nodes =
          doc.body.children.length === 0
            ? doc.body.childNodes
            : doc.body.children;
        try {
          var node = nodes[1] || nodes[0];
          err = JSON.parse(node.textContent);
        } catch (e) {
          err = {
            message: nodes.length > 1 ? nodes[1].textContent : "",
            data: {
              name: String(xhr.status),
              title: nodes.length > 0 ? nodes[0].textContent : ""
            }
          };
        }
        options.error(err);
      };
      decoder.readAsText(xhr.response);
    };
    xhr.onerror = function() {
      if (options.error) {
        options.error({
          message: _(
            "Something happened while trying to contact the server, check that the server is online and that you still have a working network connection."
          ),
          data: { title: _t("Could not connect to the server") }
        });
      }
    };
    if (options.complete) {
      xhr.onloadend = function() {
        options.complete();
      };
    }
    xhr.send(data);
    return true;
  }
  function post(controller_url, data) {
    var progressHandler = function(deferred) {
      return function(state) {
        if (state.lengthComputable) {
          deferred.notify({
            h_loaded: utils.human_size(state.loaded),
            h_total: utils.human_size(state.total),
            loaded: state.loaded,
            total: state.total,
            pcent: Math.round((state.loaded / state.total) * 100)
          });
        }
      };
    };
    var Def = $.Deferred();
    var postData = new FormData();
    $.each(data, function(i, val) {
      postData.append(i, val);
    });
    if (core.csrf_token) {
      postData.append("csrf_token", core.csrf_token);
    }
    var xhr = new XMLHttpRequest();
    if (xhr.upload)
      xhr.upload.addEventListener("progress", progressHandler(Def), false);
    var ajaxDef = $.ajax(controller_url, {
      xhr: function() {
        return xhr;
      },
      data: postData,
      processData: false,
      contentType: false,
      type: "POST"
    })
      .then(function(data) {
        Def.resolve(data);
      })
      .fail(function(data) {
        Def.reject(data);
      });
    return Def;
  }
  var loadXML = (function() {
    var isLoading = false;
    var loadingsData = [];
    var allLoadingsDef = $.when();
    var seenURLs = [];
    return function(url, qweb) {
      if (!url || !qweb) {
        return allLoadingsDef;
      }
      if (_.contains(seenURLs, url)) {
        var oldLoadingData = _.findWhere(loadingsData, { url: url });
        return oldLoadingData ? oldLoadingData.def : $.when();
      }
      seenURLs.push(url);
      var newLoadingData = { url: url, qweb: qweb, def: $.Deferred() };
      loadingsData.push(newLoadingData);
      if (!isLoading) {
        allLoadingsDef = $.Deferred();
        _load();
      }
      return newLoadingData.def;
      function _load() {
        isLoading = true;
        if (loadingsData.length) {
          var loadingData = loadingsData[0];
          loadingData.qweb.add_template(loadingData.url, function() {
            loadingsData.shift();
            loadingData.def.resolve();
            _load();
          });
        } else {
          isLoading = false;
          allLoadingsDef.resolve();
        }
      }
    };
  })();
  function loadLibs(libs) {
    var defs = [];
    _.each(libs.jsLibs || [], function(urls) {
      defs.push(
        $.when.apply($, defs).then(function() {
          if (typeof urls === "string") {
            return ajax.loadJS(urls);
          } else {
            return $.when.apply(
              $,
              _.map(urls, function(url) {
                return ajax.loadJS(url);
              })
            );
          }
        })
      );
    });
    _.each(libs.cssLibs || [], function(url) {
      defs.push(ajax.loadCSS(url));
    });
    return $.when.apply($, defs);
  }
  var ajax = {
    jsonRpc: jsonRpc,
    jsonpRpc: jsonpRpc,
    rpc: rpc,
    loadCSS: loadCSS,
    loadJS: loadJS,
    loadXML: loadXML,
    loadLibs: loadLibs,
    get_file: get_file,
    post: post
  };
  return ajax;
});

/* /web/static/src/js/core/time.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.time", function(require) {
  "use strict";
  var translation = require("web.translation");
  var utils = require("web.utils");
  var lpad = utils.lpad;
  var rpad = utils.rpad;
  var _t = translation._t;
  function date_to_utc(k, v) {
    var value = this[k];
    if (!(value instanceof Date)) {
      return v;
    }
    return datetime_to_str(value);
  }
  function str_to_datetime(str) {
    if (!str) {
      return str;
    }
    var regex = /^(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d(?:\.(\d+))?)$/;
    var res = regex.exec(str);
    if (!res) {
      throw new Error("'" + str + "' is not a valid datetime");
    }
    var tmp = new Date(2000, 0, 1);
    tmp.setUTCMonth(1970);
    tmp.setUTCMonth(0);
    tmp.setUTCDate(1);
    tmp.setUTCFullYear(parseFloat(res[1]));
    tmp.setUTCMonth(parseFloat(res[2]) - 1);
    tmp.setUTCDate(parseFloat(res[3]));
    tmp.setUTCHours(parseFloat(res[4]));
    tmp.setUTCMinutes(parseFloat(res[5]));
    tmp.setUTCSeconds(parseFloat(res[6]));
    tmp.setUTCSeconds(parseFloat(res[6]));
    tmp.setUTCMilliseconds(
      parseFloat(utils.rpad((res[7] || "").slice(0, 3), 3))
    );
    return tmp;
  }
  function str_to_date(str) {
    if (!str) {
      return str;
    }
    var regex = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var res = regex.exec(str);
    if (!res) {
      throw new Error("'" + str + "' is not a valid date");
    }
    var tmp = new Date(2000, 0, 1);
    tmp.setFullYear(parseFloat(res[1]));
    tmp.setMonth(parseFloat(res[2]) - 1);
    tmp.setDate(parseFloat(res[3]));
    tmp.setHours(0);
    tmp.setMinutes(0);
    tmp.setSeconds(0);
    return tmp;
  }
  function str_to_time(str) {
    if (!str) {
      return str;
    }
    var regex = /^(\d\d):(\d\d):(\d\d(?:\.(\d+))?)$/;
    var res = regex.exec(str);
    if (!res) {
      throw new Error("'" + str + "' is not a valid time");
    }
    var tmp = new Date();
    tmp.setFullYear(1970);
    tmp.setMonth(0);
    tmp.setDate(1);
    tmp.setHours(parseFloat(res[1]));
    tmp.setMinutes(parseFloat(res[2]));
    tmp.setSeconds(parseFloat(res[3]));
    tmp.setMilliseconds(parseFloat(rpad((res[4] || "").slice(0, 3), 3)));
    return tmp;
  }
  function datetime_to_str(obj) {
    if (!obj) {
      return false;
    }
    return (
      lpad(obj.getUTCFullYear(), 4) +
      "-" +
      lpad(obj.getUTCMonth() + 1, 2) +
      "-" +
      lpad(obj.getUTCDate(), 2) +
      " " +
      lpad(obj.getUTCHours(), 2) +
      ":" +
      lpad(obj.getUTCMinutes(), 2) +
      ":" +
      lpad(obj.getUTCSeconds(), 2)
    );
  }
  function date_to_str(obj) {
    if (!obj) {
      return false;
    }
    return (
      lpad(obj.getFullYear(), 4) +
      "-" +
      lpad(obj.getMonth() + 1, 2) +
      "-" +
      lpad(obj.getDate(), 2)
    );
  }
  function time_to_str(obj) {
    if (!obj) {
      return false;
    }
    return (
      lpad(obj.getHours(), 2) +
      ":" +
      lpad(obj.getMinutes(), 2) +
      ":" +
      lpad(obj.getSeconds(), 2)
    );
  }
  function auto_str_to_date(value) {
    try {
      return str_to_datetime(value);
    } catch (e) {}
    try {
      return str_to_date(value);
    } catch (e) {}
    try {
      return str_to_time(value);
    } catch (e) {}
    throw new Error(
      _.str.sprintf(_t("'%s' is not a correct date, datetime nor time"), value)
    );
  }
  function auto_date_to_str(value, type) {
    switch (type) {
      case "datetime":
        return datetime_to_str(value);
      case "date":
        return date_to_str(value);
      case "time":
        return time_to_str(value);
      default:
        throw new Error(
          _.str.sprintf(
            _t("'%s' is not convertible to date, datetime nor time"),
            type
          )
        );
    }
  }
  function strftime_to_moment_format(value) {
    if (_normalize_format_cache[value] === undefined) {
      var isletter = /[a-zA-Z]/,
        output = [],
        inToken = false;
      for (var index = 0; index < value.length; ++index) {
        var character = value[index];
        if (character === "%" && !inToken) {
          inToken = true;
          continue;
        }
        if (isletter.test(character)) {
          if (inToken && normalize_format_table[character] !== undefined) {
            character = normalize_format_table[character];
          } else {
            character = "[" + character + "]";
          }
        }
        output.push(character);
        inToken = false;
      }
      _normalize_format_cache[value] = output.join("");
    }
    return _normalize_format_cache[value];
  }
  function moment_to_strftime_format(value) {
    var regex = /(MMMM|DDDD|dddd|YYYY|MMM|ddd|mm|ss|ww|WW|MM|YY|hh|HH|DD|A|d)/g;
    return value.replace(regex, function(val) {
      return "%" + inverse_normalize_format_table[val];
    });
  }
  var _normalize_format_cache = {};
  var normalize_format_table = {
    a: "ddd",
    A: "dddd",
    b: "MMM",
    B: "MMMM",
    d: "DD",
    H: "HH",
    I: "hh",
    j: "DDDD",
    m: "MM",
    M: "mm",
    p: "A",
    S: "ss",
    U: "ww",
    W: "WW",
    w: "d",
    y: "YY",
    Y: "YYYY",
    c: "ddd MMM D HH:mm:ss YYYY",
    x: "MM/DD/YY",
    X: "HH:mm:ss"
  };
  var inverse_normalize_format_table = _.invert(normalize_format_table);
  function getLangDateFormat() {
    return this.strftime_to_moment_format(_t.database.parameters.date_format);
  }
  function getLangTimeFormat() {
    return this.strftime_to_moment_format(_t.database.parameters.time_format);
  }
  function getLangDatetimeFormat() {
    return this.strftime_to_moment_format(
      _t.database.parameters.date_format +
        " " +
        _t.database.parameters.time_format
    );
  }
  return {
    date_to_utc: date_to_utc,
    str_to_datetime: str_to_datetime,
    str_to_date: str_to_date,
    str_to_time: str_to_time,
    datetime_to_str: datetime_to_str,
    date_to_str: date_to_str,
    time_to_str: time_to_str,
    auto_str_to_date: auto_str_to_date,
    auto_date_to_str: auto_date_to_str,
    strftime_to_moment_format: strftime_to_moment_format,
    moment_to_strftime_format: moment_to_strftime_format,
    getLangDateFormat: getLangDateFormat,
    getLangTimeFormat: getLangTimeFormat,
    getLangDatetimeFormat: getLangDatetimeFormat
  };
});

/* /web/static/src/js/core/mixins.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.mixins", function(require) {
  "use strict";
  var Class = require("web.Class");
  var utils = require("web.utils");
  var ParentedMixin = {
    __parentedMixin: true,
    init: function() {
      this.__parentedDestroyed = false;
      this.__parentedChildren = [];
      this.__parentedParent = null;
    },
    setParent: function(parent) {
      if (this.getParent()) {
        if (this.getParent().__parentedMixin) {
          this.getParent().__parentedChildren = _.without(
            this.getParent().getChildren(),
            this
          );
        }
      }
      this.__parentedParent = parent;
      if (parent && parent.__parentedMixin) {
        parent.__parentedChildren.push(this);
      }
    },
    getParent: function() {
      return this.__parentedParent;
    },
    getChildren: function() {
      return _.clone(this.__parentedChildren);
    },
    isDestroyed: function() {
      return this.__parentedDestroyed;
    },
    alive: function(promise, reject) {
      var self = this;
      return $.Deferred(function(def) {
        promise
          .then(
            function() {
              if (!self.isDestroyed()) {
                def.resolve.apply(def, arguments);
              }
            },
            function() {
              if (!self.isDestroyed()) {
                def.reject.apply(def, arguments);
              }
            }
          )
          .always(function() {
            if (reject) {
              def.reject();
            }
          });
      }).promise();
    },
    destroy: function() {
      _.each(this.getChildren(), function(el) {
        el.destroy();
      });
      this.setParent(undefined);
      this.__parentedDestroyed = true;
    },
    findAncestor: function(predicate) {
      var ancestor = this;
      while (ancestor && !predicate(ancestor) && ancestor.getParent) {
        ancestor = ancestor.getParent();
      }
      return ancestor;
    }
  };
  function OdooEvent(target, name, data) {
    this.target = target;
    this.name = name;
    this.data = Object.create(null);
    _.extend(this.data, data);
    this.stopped = false;
  }
  OdooEvent.prototype.stopPropagation = function() {
    this.stopped = true;
  };
  OdooEvent.prototype.is_stopped = function() {
    return this.stopped;
  };
  var Events = Class.extend({
    on: function(events, callback, context) {
      var ev;
      events = events.split(/\s+/);
      var calls = this._callbacks || (this._callbacks = {});
      while ((ev = events.shift())) {
        var list = calls[ev] || (calls[ev] = {});
        var tail = list.tail || (list.tail = list.next = {});
        tail.callback = callback;
        tail.context = context;
        list.tail = tail.next = {};
      }
      return this;
    },
    off: function(events, callback, context) {
      var ev, calls, node;
      if (!events) {
        delete this._callbacks;
      } else if ((calls = this._callbacks)) {
        events = events.split(/\s+/);
        while ((ev = events.shift())) {
          node = calls[ev];
          delete calls[ev];
          if (!callback || !node) continue;
          while ((node = node.next) && node.next) {
            if (
              node.callback === callback &&
              (!context || node.context === context)
            )
              continue;
            this.on(ev, node.callback, node.context);
          }
        }
      }
      return this;
    },
    callbackList: function() {
      var lst = [];
      _.each(this._callbacks || {}, function(el, eventName) {
        var node = el;
        while ((node = node.next) && node.next) {
          lst.push([eventName, node.callback, node.context]);
        }
      });
      return lst;
    },
    trigger: function(events) {
      var event, node, calls, tail, args, all, rest;
      if (!(calls = this._callbacks)) return this;
      all = calls.all;
      (events = events.split(/\s+/)).push(null);
      while ((event = events.shift())) {
        if (all) events.push({ next: all.next, tail: all.tail, event: event });
        if (!(node = calls[event])) continue;
        events.push({ next: node.next, tail: node.tail });
      }
      rest = Array.prototype.slice.call(arguments, 1);
      while ((node = events.pop())) {
        tail = node.tail;
        args = node.event ? [node.event].concat(rest) : rest;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
      return this;
    }
  });
  var EventDispatcherMixin = _.extend({}, ParentedMixin, {
    __eventDispatcherMixin: true,
    custom_events: {},
    init: function() {
      ParentedMixin.init.call(this);
      this.__edispatcherEvents = new Events();
      this.__edispatcherRegisteredEvents = [];
      this._delegateCustomEvents();
    },
    proxy: function(method) {
      var self = this;
      return function() {
        var fn = typeof method === "string" ? self[method] : method;
        if (fn === void 0) {
          throw new Error(
            "Couldn't find method '" + method + "' in widget " + self
          );
        }
        return fn.apply(self, arguments);
      };
    },
    _delegateCustomEvents: function() {
      if (_.isEmpty(this.custom_events)) {
        return;
      }
      for (var key in this.custom_events) {
        if (!this.custom_events.hasOwnProperty(key)) {
          continue;
        }
        var method = this.proxy(this.custom_events[key]);
        this.on(key, this, method);
      }
    },
    on: function(events, dest, func) {
      var self = this;
      if (typeof func !== "function") {
        throw new Error("Event handler must be a function.");
      }
      events = events.split(/\s+/);
      _.each(events, function(eventName) {
        self.__edispatcherEvents.on(eventName, func, dest);
        if (dest && dest.__eventDispatcherMixin) {
          dest.__edispatcherRegisteredEvents.push({
            name: eventName,
            func: func,
            source: self
          });
        }
      });
      return this;
    },
    off: function(events, dest, func) {
      var self = this;
      events = events.split(/\s+/);
      _.each(events, function(eventName) {
        self.__edispatcherEvents.off(eventName, func, dest);
        if (dest && dest.__eventDispatcherMixin) {
          dest.__edispatcherRegisteredEvents = _.filter(
            dest.__edispatcherRegisteredEvents,
            function(el) {
              return !(
                el.name === eventName &&
                el.func === func &&
                el.source === self
              );
            }
          );
        }
      });
      return this;
    },
    once: function(events, dest, func) {
      var self = this;
      if (typeof func !== "function") {
        throw new Error("Event handler must be a function.");
      }
      self.on(events, dest, function what() {
        func.apply(this, arguments);
        self.off(events, dest, what);
      });
    },
    trigger: function() {
      this.__edispatcherEvents.trigger.apply(
        this.__edispatcherEvents,
        arguments
      );
      return this;
    },
    trigger_up: function(name, info) {
      var event = new OdooEvent(this, name, info);
      this._trigger_up(event);
      return event;
    },
    _trigger_up: function(event) {
      var parent;
      this.__edispatcherEvents.trigger(event.name, event);
      if (!event.is_stopped() && (parent = this.getParent())) {
        parent._trigger_up(event);
      }
    },
    destroy: function() {
      var self = this;
      _.each(this.__edispatcherRegisteredEvents, function(event) {
        event.source.__edispatcherEvents.off(event.name, event.func, self);
      });
      this.__edispatcherRegisteredEvents = [];
      _.each(
        this.__edispatcherEvents.callbackList(),
        function(cal) {
          this.off(cal[0], cal[2], cal[1]);
        },
        this
      );
      this.__edispatcherEvents.off();
      ParentedMixin.destroy.call(this);
    }
  });
  var PropertiesMixin = _.extend({}, EventDispatcherMixin, {
    init: function() {
      EventDispatcherMixin.init.call(this);
      this.__getterSetterInternalMap = {};
    },
    set: function(arg1, arg2, arg3) {
      var map;
      var options;
      if (typeof arg1 === "string") {
        map = {};
        map[arg1] = arg2;
        options = arg3 || {};
      } else {
        map = arg1;
        options = arg2 || {};
      }
      var self = this;
      var changed = false;
      _.each(map, function(val, key) {
        var tmp = self.__getterSetterInternalMap[key];
        if (tmp === val) return;
        if (
          key === "value" &&
          self.field &&
          self.field.type === "float" &&
          tmp &&
          val
        ) {
          var digits = self.field.digits;
          if (_.isArray(digits)) {
            if (utils.float_is_zero(tmp - val, digits[1])) {
              return;
            }
          }
        }
        changed = true;
        self.__getterSetterInternalMap[key] = val;
        if (!options.silent)
          self.trigger("change:" + key, self, { oldValue: tmp, newValue: val });
      });
      if (changed) self.trigger("change", self);
    },
    get: function(key) {
      return this.__getterSetterInternalMap[key];
    }
  });
  return {
    ParentedMixin: ParentedMixin,
    EventDispatcherMixin: EventDispatcherMixin,
    PropertiesMixin: PropertiesMixin
  };
});

/* /web/static/src/js/core/service_mixins.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.ServiceProviderMixin", function(require) {
  "use strict";
  var core = require("web.core");
  var ServiceProviderMixin = {
    services: {},
    UndeployedServices: {},
    init: function(parent) {
      var self = this;
      this.on("call_service", this, this._call_service.bind(this));
      _.each(core.serviceRegistry.map, function(Service, serviceName) {
        if (serviceName in self.UndeployedServices) {
          throw new Error('Service "' + serviceName + '" is already loaded.');
        }
        self.UndeployedServices[serviceName] = Service;
      });
      this._deployServices();
      core.serviceRegistry.onAdd(function(serviceName, Service) {
        if (
          serviceName in self.services ||
          serviceName in self.UndeployedServices
        ) {
          throw new Error('Service "' + serviceName + '" is already loaded.');
        }
        self.UndeployedServices[serviceName] = Service;
        self._deployServices();
      });
    },
    _deployServices: function() {
      var self = this;
      var done = false;
      while (!done) {
        var serviceName = _.findKey(this.UndeployedServices, function(Service) {
          return !_.some(Service.prototype.dependencies, function(depName) {
            return !self.services[depName];
          });
        });
        if (serviceName) {
          var service = new this.UndeployedServices[serviceName](this);
          this.services[serviceName] = service;
          delete this.UndeployedServices[serviceName];
          service.start();
        } else {
          done = true;
        }
      }
    },
    _call_service: function(event) {
      var args = event.data.args || [];
      if (event.data.service === "ajax" && event.data.method === "rpc") {
        args = args.concat(event.target);
      }
      var service = this.services[event.data.service];
      var result = service[event.data.method].apply(service, args);
      event.data.callback(result);
    }
  };
  return ServiceProviderMixin;
});
odoo.define("web.ServicesMixin", function(require) {
  "use strict";
  var rpc = require("web.rpc");
  var ServicesMixin = {
    call: function(service, method) {
      var args = Array.prototype.slice.call(arguments, 2);
      var result;
      this.trigger_up("call_service", {
        service: service,
        method: method,
        args: args,
        callback: function(r) {
          result = r;
        }
      });
      return result;
    },
    _rpc: function(params, options) {
      var query = rpc.buildQuery(params);
      var def =
        this.call("ajax", "rpc", query.route, query.params, options, this) ||
        $.Deferred();
      var promise = def.promise();
      var abort = (def.abort ? def.abort : def.reject) || function() {};
      promise.abort = abort.bind(def);
      return promise;
    },
    loadFieldView: function(dataset, view_id, view_type, options) {
      return this.loadViews(
        dataset.model,
        dataset.get_context().eval(),
        [[view_id, view_type]],
        options
      ).then(function(result) {
        return result[view_type];
      });
    },
    loadViews: function(modelName, context, views, options) {
      var def = $.Deferred();
      this.trigger_up("load_views", {
        modelName: modelName,
        context: context,
        views: views,
        options: options,
        on_success: def.resolve.bind(def)
      });
      return def;
    },
    loadFilters: function(dataset, action_id) {
      var def = $.Deferred();
      this.trigger_up("load_filters", {
        dataset: dataset,
        action_id: action_id,
        on_success: def.resolve.bind(def)
      });
      return def;
    },
    getSession: function() {
      var session;
      this.trigger_up("get_session", {
        callback: function(result) {
          session = result;
        }
      });
      return session;
    },
    do_action: function(action, options) {
      var def = $.Deferred();
      this.trigger_up("do_action", {
        action: action,
        options: options,
        on_success: function(result) {
          def.resolve(result);
        },
        on_fail: function(result) {
          def.reject(result);
        }
      });
      return def;
    },
    do_notify: function(title, message, sticky, className) {
      return this.call("notification", "notify", {
        title: title,
        message: message,
        sticky: sticky,
        className: className
      });
    },
    do_warn: function(title, message, sticky, className) {
      return this.call("notification", "notify", {
        type: "warning",
        title: title,
        message: message,
        sticky: sticky,
        className: className
      });
    }
  };
  return ServicesMixin;
});

/* /web/static/src/js/core/rpc.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.rpc", function(require) {
  "use strict";
  var ajax = require("web.ajax");
  return {
    query: function(params, options) {
      var query = this.buildQuery(params);
      return ajax.rpc(query.route, query.params, options);
    },
    buildQuery: function(options) {
      var route;
      var params = options.params || {};
      if (options.route) {
        route = options.route;
      } else if (options.model && options.method) {
        route = "/web/dataset/call_kw/" + options.model + "/" + options.method;
      }
      if (options.method) {
        params.args = options.args || [];
        params.model = options.model;
        params.method = options.method;
        params.kwargs = _.extend(params.kwargs || {}, options.kwargs);
        params.kwargs.context =
          options.context || params.context || params.kwargs.context;
      }
      if (options.method === "read_group") {
        if (!(params.args && params.args[0] !== undefined)) {
          params.kwargs.domain =
            options.domain || params.domain || params.kwargs.domain || [];
        }
        if (!(params.args && params.args[1] !== undefined)) {
          params.kwargs.fields =
            options.fields || params.fields || params.kwargs.fields || [];
        }
        if (!(params.args && params.args[2] !== undefined)) {
          params.kwargs.groupby =
            options.groupBy || params.groupBy || params.kwargs.groupby || [];
        }
        params.kwargs.offset =
          options.offset || params.offset || params.kwargs.offset;
        params.kwargs.limit =
          options.limit || params.limit || params.kwargs.limit;
        var orderBy =
          options.orderBy || params.orderBy || params.kwargs.orderby;
        params.kwargs.orderby = orderBy
          ? this._serializeSort(orderBy)
          : orderBy;
        params.kwargs.lazy = "lazy" in options ? options.lazy : params.lazy;
      }
      if (options.method === "search_read") {
        params.kwargs.domain =
          options.domain || params.domain || params.kwargs.domain;
        params.kwargs.fields =
          options.fields || params.fields || params.kwargs.fields;
        params.kwargs.offset =
          options.offset || params.offset || params.kwargs.offset;
        params.kwargs.limit =
          options.limit || params.limit || params.kwargs.limit;
        var orderBy = options.orderBy || params.orderBy || params.kwargs.order;
        params.kwargs.order = orderBy ? this._serializeSort(orderBy) : orderBy;
      }
      if (options.route === "/web/dataset/search_read") {
        params.model = options.model || params.model;
        params.domain = options.domain || params.domain;
        params.fields = options.fields || params.fields;
        params.limit = options.limit || params.limit;
        params.offset = options.offset || params.offset;
        var orderBy = options.orderBy || params.orderBy;
        params.sort = orderBy ? this._serializeSort(orderBy) : orderBy;
        params.context = options.context || params.context || {};
      }
      return { route: route, params: JSON.parse(JSON.stringify(params)) };
    },
    _serializeSort: function(orderBy) {
      return _.map(orderBy, function(order) {
        return order.name + (order.asc !== false ? " ASC" : " DESC");
      }).join(", ");
    }
  };
});

/* /web/static/src/js/core/widget.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.Widget", function(require) {
  "use strict";
  var ajax = require("web.ajax");
  var core = require("web.core");
  var mixins = require("web.mixins");
  var ServicesMixin = require("web.ServicesMixin");
  var Widget = core.Class.extend(mixins.PropertiesMixin, ServicesMixin, {
    tagName: "div",
    id: null,
    className: null,
    attributes: {},
    events: {},
    template: null,
    xmlDependencies: null,
    init: function(parent) {
      mixins.PropertiesMixin.init.call(this);
      this.setParent(parent);
      for (var name in this) {
        if (typeof this[name] === "function") {
          if (/^on_|^do_/.test(name)) {
            this[name] = this[name].bind(this);
          }
        }
      }
    },
    willStart: function() {
      if (this.xmlDependencies) {
        var defs = _.map(this.xmlDependencies, function(xmlPath) {
          return ajax.loadXML(xmlPath, core.qweb);
        });
        return $.when.apply($, defs);
      }
      return $.when();
    },
    start: function() {
      return $.when();
    },
    destroy: function() {
      _.invoke(this.getChildren(), "destroy");
      if (this.$el) {
        this.$el.remove();
      }
      mixins.PropertiesMixin.destroy.call(this);
    },
    appendTo: function(target) {
      var self = this;
      return this._widgetRenderAndInsert(function(t) {
        self.$el.appendTo(t);
      }, target);
    },
    attachTo: function(target) {
      var self = this;
      this.setElement(target.$el || target);
      return this.willStart().then(function() {
        return self.start();
      });
    },
    do_hide: function() {
      this.$el.addClass("o_hidden");
    },
    do_show: function() {
      this.$el.removeClass("o_hidden");
    },
    do_toggle: function(display) {
      if (_.isBoolean(display)) {
        display ? this.do_show() : this.do_hide();
      } else {
        this.$el.hasClass("o_hidden") ? this.do_show() : this.do_hide();
      }
    },
    insertAfter: function(target) {
      var self = this;
      return this._widgetRenderAndInsert(function(t) {
        self.$el.insertAfter(t);
      }, target);
    },
    insertBefore: function(target) {
      var self = this;
      return this._widgetRenderAndInsert(function(t) {
        self.$el.insertBefore(t);
      }, target);
    },
    prependTo: function(target) {
      var self = this;
      return this._widgetRenderAndInsert(function(t) {
        self.$el.prependTo(t);
      }, target);
    },
    renderElement: function() {
      var $el;
      if (this.template) {
        $el = $(core.qweb.render(this.template, { widget: this }).trim());
      } else {
        $el = this._makeDescriptive();
      }
      this._replaceElement($el);
    },
    replace: function(target) {
      return this._widgetRenderAndInsert(
        _.bind(function(t) {
          this.$el.replaceAll(t);
        }, this),
        target
      );
    },
    setElement: function(element) {
      if (this.$el) {
        this._undelegateEvents();
      }
      this.$el = element instanceof $ ? element : $(element);
      this.el = this.$el[0];
      this._delegateEvents();
      return this;
    },
    $: function(selector) {
      if (selector === undefined) {
        return this.$el;
      }
      return this.$el.find(selector);
    },
    _delegateEvents: function() {
      var events = this.events;
      if (_.isEmpty(events)) {
        return;
      }
      for (var key in events) {
        if (!events.hasOwnProperty(key)) {
          continue;
        }
        var method = this.proxy(events[key]);
        var match = /^(\S+)(\s+(.*))?$/.exec(key);
        var event = match[1];
        var selector = match[3];
        event += ".widget_events";
        if (!selector) {
          this.$el.on(event, method);
        } else {
          this.$el.on(event, selector, method);
        }
      }
    },
    _makeDescriptive: function() {
      var attrs = _.extend({}, this.attributes || {});
      if (this.id) {
        attrs.id = this.id;
      }
      if (this.className) {
        attrs["class"] = this.className;
      }
      var $el = $(document.createElement(this.tagName));
      if (!_.isEmpty(attrs)) {
        $el.attr(attrs);
      }
      return $el;
    },
    _replaceElement: function($el) {
      var $oldel = this.$el;
      this.setElement($el);
      if ($oldel && !$oldel.is(this.$el)) {
        if ($oldel.length > 1) {
          $oldel.wrapAll("<div/>");
          $oldel.parent().replaceWith(this.$el);
        } else {
          $oldel.replaceWith(this.$el);
        }
      }
      return this;
    },
    _undelegateEvents: function() {
      this.$el.off(".widget_events");
    },
    _widgetRenderAndInsert: function(insertion, target) {
      var self = this;
      return this.willStart().then(function() {
        if (self.__parentedDestroyed) {
          return;
        }
        self.renderElement();
        insertion(target);
        return self.start();
      });
    }
  });
  return Widget;
});

/* /web/static/src/js/core/registry.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.Registry", function(require) {
  "use strict";
  var Class = require("web.Class");
  var Registry = Class.extend({
    init: function(mapping) {
      this.map = Object.create(mapping || null);
      this.listeners = [];
    },
    add: function(key, value) {
      this.map[key] = value;
      _.each(this.listeners, function(callback) {
        callback(key, value);
      });
      return this;
    },
    contains: function(key) {
      return key in this.map;
    },
    extend: function(mapping) {
      var child = new Registry(this.map);
      _.extend(child.map, mapping);
      return child;
    },
    get: function(key) {
      return this.map[key];
    },
    getAny: function(keys) {
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] in this.map) {
          return this.map[keys[i]];
        }
      }
      return null;
    },
    onAdd: function(callback) {
      this.listeners.push(callback);
    }
  });
  return Registry;
});

/* /web/static/src/js/core/session.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.Session", function(require) {
  "use strict";
  var ajax = require("web.ajax");
  var concurrency = require("web.concurrency");
  var config = require("web.config");
  var core = require("web.core");
  var mixins = require("web.mixins");
  var utils = require("web.utils");
  var _t = core._t;
  var qweb = core.qweb;
  var Session = core.Class.extend(mixins.EventDispatcherMixin, {
    init: function(parent, origin, options) {
      mixins.EventDispatcherMixin.init.call(this);
      this.setParent(parent);
      options = options || {};
      this.module_list =
        (options.modules && options.modules.slice()) ||
        (window.odoo._modules && window.odoo._modules.slice()) ||
        [];
      this.server = null;
      this.session_id = options.session_id || null;
      this.override_session =
        options.override_session || !!options.session_id || false;
      this.avoid_recursion = false;
      this.use_cors = options.use_cors || false;
      this.setup(origin);
      this.debug = config.debug;
      this.name = "instance0";
      this.qweb_mutex = new concurrency.Mutex();
      this.currencies = {};
      this._groups_def = {};
      core.bus.on("invalidate_session", this, this._onInvalidateSession);
    },
    setup: function(origin, options) {
      var window_origin = location.protocol + "//" + location.host;
      origin = origin ? origin.replace(/\/+$/, "") : window_origin;
      if (!_.isUndefined(this.origin) && this.origin !== origin)
        throw new Error("Session already bound to " + this.origin);
      else this.origin = origin;
      this.prefix = this.origin;
      this.server = this.origin;
      this.origin_server = this.origin === window_origin;
      options = options || {};
      if ("use_cors" in options) {
        this.use_cors = options.use_cors;
      }
    },
    session_bind: function(origin) {
      var self = this;
      this.setup(origin);
      qweb.default_dict._s = this.origin;
      this.uid = null;
      this.username = null;
      this.user_context = {};
      this.db = null;
      this.module_loaded = {};
      _(this.module_list).each(function(mod) {
        self.module_loaded[mod] = true;
      });
      this.active_id = null;
      return this.session_init();
    },
    session_init: function() {
      var self = this;
      var def = this.session_reload();
      if (this.is_frontend) {
        return def.then(function() {
          return self.load_translations();
        });
      }
      return def.then(function() {
        var modules = self.module_list.join(",");
        var deferred = self.load_qweb(modules);
        if (self.session_is_valid()) {
          return deferred.then(function() {
            return self.load_modules();
          });
        }
        return $.when(
          deferred,
          self
            .rpc("/web/webclient/bootstrap_translations", {
              mods: self.module_list
            })
            .then(function(trans) {
              _t.database.set_bundle(trans);
            })
        );
      });
    },
    session_is_valid: function() {
      var db = $.deparam.querystring().db;
      if (db && this.db !== db) {
        return false;
      }
      return !!this.uid;
    },
    session_authenticate: function() {
      var self = this;
      return $.when(this._session_authenticate.apply(this, arguments)).then(
        function() {
          return self.load_modules();
        }
      );
    },
    _session_authenticate: function(db, login, password) {
      var self = this;
      var params = { db: db, login: login, password: password };
      return this.rpc("/web/session/authenticate", params).then(function(
        result
      ) {
        if (!result.uid) {
          return $.Deferred().reject();
        }
        delete result.session_id;
        _.extend(self, result);
      });
    },
    session_logout: function() {
      $.bbq.removeState();
      return this.rpc("/web/session/destroy", {});
    },
    user_has_group: function(group) {
      if (!this.uid) {
        return $.when(false);
      }
      var def = this._groups_def[group];
      if (!def) {
        def = this._groups_def[
          group
        ] = this.rpc("/web/dataset/call_kw/res.users/has_group", {
          model: "res.users",
          method: "has_group",
          args: [group],
          kwargs: {}
        });
      }
      return def;
    },
    get_cookie: function(name) {
      if (!this.name) {
        return null;
      }
      var nameEQ = this.name + "|" + name + "=";
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; ++i) {
        var cookie = cookies[i].replace(/^\s*/, "");
        if (cookie.indexOf(nameEQ) === 0) {
          try {
            return JSON.parse(
              decodeURIComponent(cookie.substring(nameEQ.length))
            );
          } catch (err) {
            this.set_cookie(name, "", -1);
          }
        }
      }
      return null;
    },
    set_cookie: function(name, value, ttl) {
      if (!this.name) {
        return;
      }
      ttl = ttl || 24 * 60 * 60 * 365;
      utils.set_cookie(this.name + "|" + name, value, ttl);
    },
    load_modules: function() {
      var self = this;
      var modules = odoo._modules;
      var all_modules = _.uniq(self.module_list.concat(modules));
      var to_load = _.difference(modules, self.module_list).join(",");
      this.module_list = all_modules;
      var loaded = $.when(self.load_translations());
      var locale = "/web/webclient/locale/" + self.user_context.lang || "en_US";
      var file_list = [locale];
      if (to_load.length) {
        loaded = $.when(
          loaded,
          self
            .rpc("/web/webclient/csslist", { mods: to_load })
            .done(self.load_css.bind(self)),
          self.load_qweb(to_load),
          self
            .rpc("/web/webclient/jslist", { mods: to_load })
            .done(function(files) {
              file_list = file_list.concat(files);
            })
        );
      }
      return loaded
        .then(function() {
          return self.load_js(file_list);
        })
        .done(function() {
          self._configureLocale();
          self.on_modules_loaded();
          self.trigger("module_loaded");
        });
    },
    load_translations: function() {
      return _t.database.load_translations(
        this,
        this.module_list,
        this.user_context.lang,
        this.translationURL
      );
    },
    load_css: function(files) {
      var self = this;
      _.each(files, function(file) {
        ajax.loadCSS(self.url(file, null));
      });
    },
    load_js: function(files) {
      var self = this;
      var d = $.Deferred();
      if (files.length !== 0) {
        var file = files.shift();
        var url = self.url(file, null);
        ajax.loadJS(url).done(d.resolve);
      } else {
        d.resolve();
      }
      return d;
    },
    load_qweb: function(mods) {
      this.qweb_mutex.exec(function() {
        return $.get("/web/webclient/qweb?mods=" + mods).then(function(doc) {
          if (!doc) {
            return;
          }
          qweb.add_template(doc);
        });
      });
      return this.qweb_mutex.def;
    },
    _configureLocale: function() {
      moment.updateLocale(moment.locale(), {
        week: { dow: (_t.database.parameters.week_start || 0) % 7 }
      });
    },
    on_modules_loaded: function() {
      var openerp = window.openerp;
      for (var j = 0; j < this.module_list.length; j++) {
        var mod = this.module_list[j];
        if (this.module_loaded[mod]) continue;
        openerp[mod] = {};
        var fct = openerp._openerp[mod];
        if (typeof fct === "function") {
          openerp._openerp[mod] = {};
          for (var k in fct) {
            openerp._openerp[mod][k] = fct[k];
          }
          fct(openerp, openerp._openerp[mod]);
        }
        this.module_loaded[mod] = true;
      }
    },
    get_currency: function(currency_id) {
      return this.currencies[currency_id];
    },
    get_file: function(options) {
      if (this.override_session) {
        options.data.session_id = this.session_id;
      }
      options.session = this;
      return ajax.get_file(options);
    },
    session_reload: function() {
      var result = _.extend({}, window.odoo.session_info);
      delete result.session_id;
      _.extend(this, result);
      return $.when();
    },
    check_session_id: function() {
      var self = this;
      if (this.avoid_recursion) return $.when();
      if (this.session_id) return $.when();
      if (!this.use_cors && (this.override_session || !this.origin_server)) {
        this.avoid_recursion = true;
        return this.rpc("/gen_session_id", {})
          .then(function(result) {
            self.session_id = result;
          })
          .always(function() {
            self.avoid_recursion = false;
          });
      }
      return $.when();
    },
    rpc: function(url, params, options) {
      var self = this;
      options = _.clone(options || {});
      options.headers = _.extend({}, options.headers);
      if (odoo.debug) {
        options.headers["X-Debug-Mode"] = $.deparam(
          $.param.querystring()
        ).debug;
      }
      var deferred = self.check_session_id();
      var aborted = false;
      var xhrDef;
      deferred.abort = function() {
        if (xhrDef) {
          xhrDef.abort();
        } else {
          aborted = true;
        }
      };
      var promise = deferred.then(function() {
        if (aborted) {
          var def = $.Deferred().reject(
            { message: "XmlHttpRequestError abort" },
            $.Event("abort")
          );
          def.abort = function() {};
          return def;
        }
        if (!_.isString(url)) {
          _.extend(options, url);
          url = url.url;
        }
        var fct;
        if (self.origin_server) {
          fct = ajax.jsonRpc;
          if (self.override_session) {
            options.headers["X-Openerp-Session-Id"] = self.session_id || "";
          }
        } else if (self.use_cors) {
          fct = ajax.jsonRpc;
          url = self.url(url, null);
          options.session_id = self.session_id || "";
          if (self.override_session) {
            options.headers["X-Openerp-Session-Id"] = self.session_id || "";
          }
        } else {
          fct = ajax.jsonpRpc;
          url = self.url(url, null);
          options.session_id = self.session_id || "";
        }
        xhrDef = fct(url, "call", params, options);
        return xhrDef;
      });
      promise.abort = deferred.abort;
      return promise;
    },
    url: function(path, params) {
      params = _.extend(params || {});
      if (this.override_session || !this.origin_server)
        params.session_id = this.session_id;
      var qs = $.param(params);
      if (qs.length > 0) qs = "?" + qs;
      var prefix = _.any(["http://", "https://", "//"], function(el) {
        return path.length >= el.length && path.slice(0, el.length) === el;
      })
        ? ""
        : this.prefix;
      return prefix + path + qs;
    },
    getTZOffset: function(date) {
      return -new Date(date).getTimezoneOffset();
    },
    _onInvalidateSession: function() {
      this.uid = false;
    }
  });
  return Session;
});

/* /web/static/src/js/core/concurrency.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.concurrency", function(require) {
  "use strict";
  var Class = require("web.Class");
  return {
    asyncWhen: function() {
      var async = false;
      var def = $.Deferred();
      $.when
        .apply($, arguments)
        .done(function() {
          var args = arguments;
          var action = function() {
            def.resolve.apply(def, args);
          };
          if (async) {
            action();
          } else {
            setTimeout(action, 0);
          }
        })
        .fail(function() {
          var args = arguments;
          var action = function() {
            def.reject.apply(def, args);
          };
          if (async) {
            action();
          } else {
            setTimeout(action, 0);
          }
        });
      async = true;
      return def;
    },
    delay: function(wait) {
      var def = $.Deferred();
      setTimeout(def.resolve, wait);
      return def;
    },
    DropMisordered: Class.extend({
      init: function(failMisordered) {
        this.lsn = 0;
        this.rsn = -1;
        this.failMisordered = failMisordered || false;
      },
      add: function(deferred) {
        var res = $.Deferred();
        var self = this,
          seq = this.lsn++;
        deferred
          .done(function() {
            if (seq > self.rsn) {
              self.rsn = seq;
              res.resolve.apply(res, arguments);
            } else if (self.failMisordered) {
              res.reject();
            }
          })
          .fail(function() {
            res.reject.apply(res, arguments);
          });
        return res.promise();
      }
    }),
    DropPrevious: Class.extend({
      add: function(deferred) {
        if (this.current_def) {
          this.current_def.reject();
        }
        var res = $.Deferred();
        deferred.then(res.resolve, res.reject);
        this.current_def = res;
        return res.promise();
      }
    }),
    Mutex: Class.extend({
      init: function() {
        this.def = $.Deferred().resolve();
        this.unlockedDef = undefined;
      },
      exec: function(action) {
        var self = this;
        var current = this.def;
        var next = (this.def = $.Deferred());
        this.unlockedDef = this.unlockedDef || $.Deferred();
        return current.then(function() {
          return $.when(action()).always(function() {
            next.resolve();
            if (self.def.state() === "resolved" && self.unlockedDef) {
              self.unlockedDef.resolve();
              self.unlockedDef = undefined;
            }
          });
        });
      },
      getUnlockedDef: function() {
        return $.when(this.unlockedDef);
      }
    }),
    MutexedDropPrevious: Class.extend({
      init: function() {
        this.currentDef = null;
        this.locked = false;
        this.pendingAction = null;
        this.pendingDef = null;
      },
      exec: function(action) {
        var self = this;
        if (this.locked) {
          this.pendingAction = action;
          var oldPendingDef = this.pendingDef;
          var pendingDef = (this.pendingDef = $.Deferred());
          if (oldPendingDef) {
            oldPendingDef.reject();
          }
          this.currentDef.reject();
          return pendingDef.promise();
        } else {
          this.locked = true;
          this.currentDef = $.Deferred();
          $.when(action())
            .then(this.currentDef.resolve.bind(this.currentDef))
            .fail(this.currentDef.reject.bind(this.currentDef))
            .always(function() {
              self.locked = false;
              if (self.pendingAction) {
                var action = self.pendingAction;
                self.pendingAction = null;
                self
                  .exec(action)
                  .then(self.pendingDef.resolve.bind(self.pendingDef))
                  .fail(self.pendingDef.reject.bind(self.pendingDef));
              }
            });
          return this.currentDef.promise();
        }
      }
    }),
    rejectAfter: function(target_def, reference_def) {
      var res = $.Deferred();
      target_def.then(res.resolve, res.reject);
      reference_def.always(res.reject);
      return res.promise();
    }
  };
});

/* /web/static/src/js/core/utils.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.utils", function(require) {
  "use strict";
  var translation = require("web.translation");
  var _t = translation._t;
  var id = -1;
  var utils = {
    assert: function(bool) {
      if (!bool) {
        throw new Error("AssertionError");
      }
    },
    binaryToBinsize: function(value) {
      if (!this.is_bin_size(value)) {
        return this.human_size(value.length / 1.37);
      }
      return value;
    },
    confine: function(val, min, max) {
      return Math.max(min, Math.min(max, val));
    },
    float_is_zero: function(value, decimals) {
      var epsilon = Math.pow(10, -decimals);
      return Math.abs(utils.round_precision(value, epsilon)) < epsilon;
    },
    generateID: function() {
      return ++id;
    },
    get_cookie: function(c_name) {
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split("=");
        var name = parts.shift();
        var cookie = parts.join("=");
        if (c_name && c_name === name) {
          return cookie;
        }
      }
      return "";
    },
    human_number: function(number, decimals, minDigits, formatterCallback) {
      number = Math.round(number);
      decimals = decimals | 0;
      minDigits = minDigits || 1;
      formatterCallback = formatterCallback || utils.insert_thousand_seps;
      var d2 = Math.pow(10, decimals);
      var val = _t("kMGTPE");
      var symbol = "";
      var numberMagnitude = number.toExponential().split("e")[1];
      if (numberMagnitude >= 21) {
        number =
          Math.round(number * Math.pow(10, decimals - numberMagnitude)) / d2;
        return number + "e" + numberMagnitude;
      }
      var sign = Math.sign(number);
      number = Math.abs(number);
      for (var i = val.length; i > 0; i--) {
        var s = Math.pow(10, i * 3);
        if (s <= number / Math.pow(10, minDigits - 1)) {
          number = Math.round((number * d2) / s) / d2;
          symbol = val[i - 1];
          break;
        }
      }
      number = sign * number;
      return formatterCallback("" + number) + symbol;
    },
    human_size: function(size) {
      var units = _t("Bytes,Kb,Mb,Gb,Tb,Pb,Eb,Zb,Yb").split(",");
      var i = 0;
      while (size >= 1024) {
        size /= 1024;
        ++i;
      }
      return size.toFixed(2) + " " + units[i].trim();
    },
    insert_thousand_seps: function(num) {
      var negative = num[0] === "-";
      num = negative ? num.slice(1) : num;
      return (
        (negative ? "-" : "") +
        utils.intersperse(
          num,
          _t.database.parameters.grouping,
          _t.database.parameters.thousands_sep
        )
      );
    },
    intersperse: function(str, indices, separator) {
      separator = separator || "";
      var result = [],
        last = str.length;
      for (var i = 0; i < indices.length; ++i) {
        var section = indices[i];
        if (section === -1 || last <= 0) {
          break;
        } else if (section === 0 && i === 0) {
          break;
        } else if (section === 0) {
          section = indices[--i];
        }
        result.push(str.substring(last - section, last));
        last -= section;
      }
      var s = str.substring(0, last);
      if (s) {
        result.push(s);
      }
      return result.reverse().join(separator);
    },
    into: function(object, path) {
      if (!_(path).isArray()) {
        path = path.split(".");
      }
      for (var i = 0; i < path.length; i++) {
        object = object[path[i]];
      }
      return object;
    },
    is_bin_size: function(v) {
      return /^\d+(\.\d*)? [^0-9]+$/.test(v);
    },
    json_node_to_xml: function(node, human_readable, indent) {
      indent = indent || 0;
      var sindent = human_readable ? new Array(indent + 1).join("\t") : "",
        r = sindent + "<" + node.tag,
        cr = human_readable ? "\n" : "";
      if (typeof node === "string") {
        return (
          sindent +
          node
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
        );
      } else if (
        typeof node.tag !== "string" ||
        !node.children instanceof Array ||
        !node.attrs instanceof Object
      ) {
        throw new Error(
          _.str.sprintf(
            _t("Node [%s] is not a JSONified XML node"),
            JSON.stringify(node)
          )
        );
      }
      for (var attr in node.attrs) {
        var vattr = node.attrs[attr];
        if (typeof vattr !== "string") {
          vattr = JSON.stringify(vattr);
        }
        vattr = vattr
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
        if (human_readable) {
          vattr = vattr.replace(/&quot;/g, "'");
        }
        r += " " + attr + '="' + vattr + '"';
      }
      if (node.children && node.children.length) {
        r += ">" + cr;
        var childs = [];
        for (var i = 0, ii = node.children.length; i < ii; i++) {
          childs.push(
            utils.json_node_to_xml(node.children[i], human_readable, indent + 1)
          );
        }
        r += childs.join(cr);
        r += cr + sindent + "</" + node.tag + ">";
        return r;
      } else {
        return r + "/>";
      }
    },
    lpad: function(str, size) {
      str = "" + str;
      return new Array(size - str.length + 1).join("0") + str;
    },
    round_decimals: function(value, decimals) {
      return utils.round_precision(value, Math.pow(10, -decimals));
    },
    round_precision: function(value, precision) {
      if (!value) {
        return 0;
      } else if (!precision || precision < 0) {
        precision = 1;
      }
      var normalized_value = value / precision;
      var epsilon_magnitude =
        Math.log(Math.abs(normalized_value)) / Math.log(2);
      var epsilon = Math.pow(2, epsilon_magnitude - 52);
      normalized_value += normalized_value >= 0 ? epsilon : -epsilon;
      var sign = normalized_value < 0 ? -1.0 : 1.0;
      var rounded_value = sign * Math.round(Math.abs(normalized_value));
      return rounded_value * precision;
    },
    rpad: function(str, size) {
      str = "" + str;
      return str + new Array(size - str.length + 1).join("0");
    },
    set_cookie: function(name, value, ttl) {
      ttl = ttl || 24 * 60 * 60 * 365;
      document.cookie = [
        name + "=" + value,
        "path=/",
        "max-age=" + ttl,
        "expires=" + new Date(new Date().getTime() + ttl * 1000).toGMTString()
      ].join(";");
    },
    stableSort: function(array, iteratee) {
      var stable = array.slice();
      return array.sort(function stableCompare(a, b) {
        var order = iteratee(a, b);
        if (order !== 0) {
          return order;
        } else {
          return stable.indexOf(a) - stable.indexOf(b);
        }
      });
    },
    swap: function(array, elem1, elem2) {
      var i1 = array.indexOf(elem1);
      var i2 = array.indexOf(elem2);
      array[i2] = elem1;
      array[i1] = elem2;
    },
    is_email: function(value, allow_mailto) {
      var re;
      if (allow_mailto) {
        re = /^(mailto:)?(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      } else {
        re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      }
      return re.test(value);
    },
    toBoolElse: function(str, elseValues, trueValues, falseValues) {
      var ret = _.str.toBool(str, trueValues, falseValues);
      if (_.isUndefined(ret)) {
        return elseValues;
      }
      return ret;
    },
    traverse_records: function(data, f) {
      if (data.type === "record") {
        f(data);
      } else if (data.data) {
        for (var i = 0; i < data.data.length; i++) {
          utils.traverse_records(data.data[i], f);
        }
      }
    },
    xml_to_json: function(node, strip_whitespace) {
      switch (node.nodeType) {
        case 9:
          return utils.xml_to_json(node.documentElement, strip_whitespace);
        case 3:
        case 4:
          return strip_whitespace && node.data.trim() === ""
            ? undefined
            : node.data;
        case 1:
          var attrs = $(node).getAttributes();
          _.each(
            ["domain", "filter_domain", "context", "default_get"],
            function(key) {
              if (attrs[key]) {
                try {
                  attrs[key] = JSON.parse(attrs[key]);
                } catch (e) {}
              }
            }
          );
          return {
            tag: node.tagName.toLowerCase(),
            attrs: attrs,
            children: _.compact(
              _.map(node.childNodes, function(node) {
                return utils.xml_to_json(node, strip_whitespace);
              })
            )
          };
      }
    },
    xml_to_str: function(node) {
      var str = "";
      if (window.XMLSerializer) {
        str = new XMLSerializer().serializeToString(node);
      } else if (window.ActiveXObject) {
        str = node.xml;
      } else {
        throw new Error(_t("Could not serialize XML"));
      }
      var void_elements = "area base br col command embed hr img input keygen link meta param source track wbr".split(
        " "
      );
      str = str.replace(/<([a-z]+)([^<>]*)\s*\/\s*>/g, function(
        match,
        tag,
        attrs
      ) {
        if (void_elements.indexOf(tag) < 0) {
          return "<" + tag + attrs + "></" + tag + ">";
        } else {
          return match;
        }
      });
      return str;
    },
    traverse: function(tree, f) {
      if (f(tree)) {
        _.each(tree.children, function(c) {
          utils.traverse(c, f);
        });
      }
    },
    traversePath: function(tree, f, path) {
      path = path || [];
      f(tree, path);
      _.each(tree.children, function(node) {
        utils.traversePath(node, f, path.concat(tree));
      });
    },
    deepFreeze: function(obj) {
      var propNames = Object.getOwnPropertyNames(obj);
      propNames.forEach(function(name) {
        var prop = obj[name];
        if (typeof prop == "object" && prop !== null) utils.deepFreeze(prop);
      });
      return Object.freeze(obj);
    },
    closestNumber: function(num, arr) {
      var curr = arr[0];
      var diff = Math.abs(num - curr);
      for (var val = 0; val < arr.length; val++) {
        var newdiff = Math.abs(num - arr[val]);
        if (newdiff < diff) {
          diff = newdiff;
          curr = arr[val];
        }
      }
      return curr;
    }
  };
  return utils;
});

/* /web/static/src/js/core/qweb.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.QWeb", function(require) {
  "use strict";
  var translation = require("web.translation");
  var _t = translation._t;
  function QWeb(debug, default_dict, enableTranslation) {
    if (enableTranslation === undefined) {
      enableTranslation = true;
    }
    var qweb = new QWeb2.Engine();
    qweb.default_dict = _.extend({}, default_dict || {}, {
      _: _,
      JSON: JSON,
      _t: translation._t,
      __debug__: debug,
      moment: function(date) {
        return new moment(date);
      },
      csrf_token: odoo.csrf_token
    });
    qweb.debug = debug;
    qweb.preprocess_node = enableTranslation ? preprocess_node : function() {};
    return qweb;
  }
  function preprocess_node() {
    switch (this.node.nodeType) {
      case Node.TEXT_NODE:
      case Node.CDATA_SECTION_NODE:
        var translation = this.node.parentNode.attributes["t-translation"];
        if (translation && translation.value === "off") {
          return;
        }
        var match = /^(\s*)([\s\S]+?)(\s*)$/.exec(this.node.data);
        if (match) {
          this.node.data = match[1] + _t(match[2]) + match[3];
        }
        break;
      case Node.ELEMENT_NODE:
        var attr,
          attrs = ["label", "title", "alt", "placeholder"];
        while ((attr = attrs.pop())) {
          if (this.attributes[attr]) {
            this.attributes[attr] = _t(this.attributes[attr]);
          }
        }
    }
  }
  return QWeb;
});

/* /web/static/src/js/core/bus.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.Bus", function(require) {
  "use strict";
  var Class = require("web.Class");
  var mixins = require("web.mixins");
  return Class.extend(mixins.EventDispatcherMixin, {
    init: function(parent) {
      mixins.EventDispatcherMixin.init.call(this);
      this.setParent(parent);
    }
  });
});

/* /web/static/src/js/services/core.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.core", function(require) {
  "use strict";
  var Bus = require("web.Bus");
  var Class = require("web.Class");
  var config = require("web.config");
  var QWeb = require("web.QWeb");
  var Registry = require("web.Registry");
  var translation = require("web.translation");
  var bus = new Bus();
  _.each("click,dblclick,keydown,keypress,keyup".split(","), function(evtype) {
    $("html").on(evtype, function(ev) {
      bus.trigger(evtype, ev);
    });
  });
  _.each("resize,scroll".split(","), function(evtype) {
    $(window).on(evtype, function(ev) {
      bus.trigger(evtype, ev);
    });
  });
  return {
    qweb: new QWeb(config.debug),
    Class: Class,
    bus: bus,
    main_bus: new Bus(),
    _t: translation._t,
    _lt: translation._lt,
    action_registry: new Registry(),
    crash_registry: new Registry(),
    search_filters_registry: new Registry(),
    search_widgets_registry: new Registry(),
    serviceRegistry: new Registry(),
    csrf_token: odoo.csrf_token
  };
});

/* /web/static/src/js/core/local_storage.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.local_storage", function(require) {
  "use strict";
  var RamStorage = require("web.RamStorage");
  var mixins = require("web.mixins");
  var storage;
  var localStorage = window.localStorage;
  try {
    var uid = new Date();
    localStorage.setItem(uid, uid);
    localStorage.removeItem(uid);
    storage = (function() {
      var storage = Object.create(
        _.extend(
          {
            getItem: localStorage.getItem.bind(localStorage),
            setItem: localStorage.setItem.bind(localStorage),
            removeItem: localStorage.removeItem.bind(localStorage),
            clear: localStorage.clear.bind(localStorage)
          },
          mixins.EventDispatcherMixin
        )
      );
      storage.init();
      $(window).on("storage", function(e) {
        var key = e.originalEvent.key;
        var newValue = e.originalEvent.newValue;
        try {
          JSON.parse(newValue);
          storage.trigger("storage", { key: key, newValue: newValue });
        } catch (error) {}
      });
      return storage;
    })();
  } catch (exception) {
    console.warn("Fail to load localStorage");
    storage = new RamStorage();
  }
  return storage;
});

/* /web/static/src/js/core/ram_storage.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.RamStorage", function(require) {
  "use strict";
  var Class = require("web.Class");
  var mixins = require("web.mixins");
  var RamStorage = Class.extend(mixins.EventDispatcherMixin, {
    init: function() {
      mixins.EventDispatcherMixin.init.call(this);
      if (!this.storage) {
        this.clear();
      }
    },
    clear: function() {
      this.storage = Object.create(null);
      this.length = 0;
    },
    getItem: function(key) {
      return this.storage[key];
    },
    key: function(index) {
      return _.keys(this.storage)[index];
    },
    removeItem: function(key) {
      if (key in this.storage) {
        this.length--;
      }
      delete this.storage[key];
      this.trigger("storage", { key: key, newValue: null });
    },
    setItem: function(key, value) {
      if (!(key in this.storage)) {
        this.length++;
      }
      this.storage[key] = value;
      this.trigger("storage", { key: key, newValue: value });
    }
  });
  return RamStorage;
});

/* /web/static/src/js/core/abstract_storage_service.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.AbstractStorageService", function(require) {
  "use strict";
  var AbstractService = require("web.AbstractService");
  var AbstractStorageService = AbstractService.extend({
    storage: null,
    destroy: function() {
      if ((this.storage || {}).destroy) {
        this.storage.destroy();
      }
      this._super.apply(this, arguments);
    },
    clear: function() {
      this.storage.clear();
    },
    getItem: function(key, defaultValue) {
      var val = this.storage.getItem(key);
      return val ? JSON.parse(val) : defaultValue;
    },
    key: function(index) {
      return this.storage.key(index);
    },
    length: function() {
      return this.storage.length;
    },
    removeItem: function(key) {
      this.storage.removeItem(key);
    },
    setItem: function(key, value) {
      this.storage.setItem(key, JSON.stringify(value));
    },
    onStorage: function() {
      this.storage.on.apply(
        this.storage,
        ["storage"].concat(Array.prototype.slice.call(arguments))
      );
    }
  });
  return AbstractStorageService;
});

/* /web/static/src/js/chrome/public_root_widget.js defined in bundle 'im_livechat.external_lib' */
odoo.define("root.widget", function(require) {
  "use strict";
  var ServiceProviderMixin = require("web.ServiceProviderMixin");
  var Widget = require("web.Widget");
  var PublicRootWidget = Widget.extend(ServiceProviderMixin, {
    init: function() {
      this._super.apply(this, arguments);
      ServiceProviderMixin.init.call(this);
    }
  });
  return new PublicRootWidget();
});

/* /web/static/src/js/services/ajax_service.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.AjaxService", function(require) {
  "use strict";
  var AbstractService = require("web.AbstractService");
  var core = require("web.core");
  var session = require("web.session");
  var AjaxService = AbstractService.extend({
    rpc: function(route, args, options, target) {
      var def = $.Deferred();
      var promise = def.promise();
      var xhrDef = session.rpc(route, args, options);
      promise.abort = xhrDef.abort.bind(xhrDef);
      xhrDef
        .then(function() {
          if (!target.isDestroyed()) {
            def.resolve.apply(def, arguments);
          }
        })
        .fail(function() {
          if (!target.isDestroyed()) {
            def.reject.apply(def, arguments);
          }
        });
      return promise;
    }
  });
  core.serviceRegistry.add("ajax", AjaxService);
  return AjaxService;
});

/* /web/static/src/js/services/local_storage_service.js defined in bundle 'im_livechat.external_lib' */
odoo.define("web.LocalStorageService", function(require) {
  "use strict";
  var AbstractStorageService = require("web.AbstractStorageService");
  var core = require("web.core");
  var localStorage = require("web.local_storage");
  var LocalStorageService = AbstractStorageService.extend({
    storage: localStorage
  });
  core.serviceRegistry.add("local_storage", LocalStorageService);
  return LocalStorageService;
});

/* /mail/static/src/js/thread_windows/abstract_thread_window.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.AbstractThreadWindow", function(require) {
  "use strict";
  var ThreadWidget = require("mail.widget.Thread");
  var config = require("web.config");
  var core = require("web.core");
  var Widget = require("web.Widget");
  var QWeb = core.qweb;
  var _t = core._t;
  var AbstractThreadWindow = Widget.extend({
    template: "mail.AbstractThreadWindow",
    custom_events: {
      escape_pressed: "_onEscapePressed",
      document_viewer_closed: "_onDocumentViewerClose"
    },
    events: {
      "click .o_thread_window_close": "_onClickClose",
      "click .o_thread_window_title": "_onClickFold",
      "click .o_composer_text_field": "_onComposerClick",
      "click .o_mail_thread": "_onThreadWindowClicked",
      "keydown .o_composer_text_field": "_onKeydown",
      "keypress .o_composer_text_field": "_onKeypress"
    },
    FOLD_ANIMATION_DURATION: 200,
    HEIGHT_OPEN: "400px",
    HEIGHT_FOLDED: "34px",
    init: function(parent, thread, options) {
      this._super(parent);
      this.options = _.defaults(options || {}, {
        autofocus: true,
        displayStars: true,
        displayReplyIcons: false,
        displayEmailIcons: false,
        placeholder: _t("Say something")
      });
      this._hidden = false;
      this._thread = thread || null;
      this._debouncedOnScroll = _.debounce(this._onScroll.bind(this), 100);
      if (!this.hasThread()) {
        this._folded = false;
      }
    },
    start: function() {
      var self = this;
      this.$input = this.$(".o_composer_text_field");
      this.$header = this.$(".o_thread_window_header");
      this._threadWidget = new ThreadWidget(this, {
        areMessageAttachmentsDeletable: false,
        displayMarkAsRead: false,
        displayStars: this.options.displayStars
      });
      if (this.isFolded()) {
        this.$el.css("height", this.HEIGHT_FOLDED);
      } else if (this.options.autofocus) {
        this._focusInput();
      }
      if (!config.device.isMobile) {
        var margin_dir =
          _t.database.parameters.direction === "rtl"
            ? "margin-left"
            : "margin-right";
        this.$el.css(margin_dir, $.position.scrollbarWidth());
      }
      var def = this._threadWidget
        .replace(this.$(".o_thread_window_content"))
        .then(function() {
          self._threadWidget.$el.on("scroll", self, self._debouncedOnScroll);
        });
      return $.when(this._super(), def);
    },
    do_hide: function() {
      this._hidden = true;
      this._super.apply(this, arguments);
    },
    do_show: function() {
      this._hidden = false;
      this._super.apply(this, arguments);
    },
    do_toggle: function(display) {
      this._hidden = _.isBoolean(display) ? !display : !this._hidden;
      this._super.apply(this, arguments);
    },
    close: function() {},
    getID: function() {
      return this._getThreadID();
    },
    getThreadStatus: function() {
      if (!this.hasThread()) {
        return undefined;
      }
      return this._thread.getStatus();
    },
    getTitle: function() {
      if (!this.hasThread()) {
        return _t("Undefined");
      }
      return this._thread.getTitle();
    },
    getUnreadCounter: function() {
      if (!this.hasThread()) {
        return 0;
      }
      return this._thread.getUnreadCounter();
    },
    hasThread: function() {
      return !!this._thread;
    },
    isAtBottom: function() {
      return this._threadWidget.isAtBottom();
    },
    isFolded: function() {
      if (!this.hasThread()) {
        return this._folded;
      }
      return this._thread.isFolded();
    },
    isMobile: function() {
      return config.device.isMobile;
    },
    isHidden: function() {
      return this._hidden;
    },
    needsComposer: function() {
      return this.hasThread();
    },
    render: function() {
      this.renderHeader();
      if (this.hasThread()) {
        this._threadWidget.render(this._thread, { displayLoadMore: false });
      }
    },
    renderHeader: function() {
      var options = this._getHeaderRenderingOptions();
      this.$header.html(
        QWeb.render("mail.AbstractThreadWindow.HeaderContent", options)
      );
    },
    renderTypingNotificationBar: function() {
      this._threadWidget.renderTypingNotificationBar(this._thread);
    },
    scrollToBottom: function() {
      this._threadWidget.scrollToBottom();
    },
    toggleFold: function(folded) {
      if (!_.isBoolean(folded)) {
        folded = !this.isFolded();
      }
      this._updateThreadFoldState(folded);
    },
    updateVisualFoldState: function() {
      if (!this.isFolded()) {
        this._threadWidget.scrollToBottom();
        if (this.options.autofocus) {
          this._focusInput();
        }
      }
      this._animateFold();
    },
    _animateFold: function() {
      this.$el.animate(
        { height: this.isFolded() ? this.HEIGHT_FOLDED : this.HEIGHT_OPEN },
        this.FOLD_ANIMATION_DURATION
      );
    },
    _focusInput: function() {
      if (
        config.device.touch &&
        config.device.size_class <= config.device.SIZES.SM
      ) {
        return;
      }
      this.$input.focus();
    },
    _getHeaderRenderingOptions: function() {
      return {
        status: this.getThreadStatus(),
        title: this.getTitle(),
        unreadCounter: this.getUnreadCounter(),
        widget: this
      };
    },
    _getThreadID: function() {
      if (!this.hasThread()) {
        return "_blank";
      }
      return this._thread.getID();
    },
    _hasFocus: function() {
      return this.$input.is(":focus");
    },
    _postMessage: function(messageData) {
      var self = this;
      if (!this.hasThread()) {
        return;
      }
      this._thread.postMessage(messageData).then(function() {
        self._threadWidget.scrollToBottom();
      });
    },
    _updateThreadFoldState: function(folded) {
      if (this.hasThread()) {
        this._thread.fold(folded);
      } else {
        this._folded = folded;
        this.updateVisualFoldState();
      }
    },
    _onClickClose: function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      if (
        this.hasThread() &&
        this._thread.getUnreadCounter() > 0 &&
        !this.isFolded()
      ) {
        this._thread.markAsRead();
      }
      this.close();
    },
    _onClickFold: function() {
      if (!config.device.isMobile) {
        this.toggleFold();
      }
    },
    _onComposerClick: function(ev) {
      if ($(ev.target).closest("a, button").length) {
        return;
      }
      this._focusInput();
    },
    _onDocumentViewerClose: function() {
      this._focusInput();
    },
    _onEscapePressed: function() {
      if (!this.isFolded()) {
        this.close();
      }
    },
    _onKeydown: function(ev) {
      ev.stopPropagation();
      if (ev.which === 13) {
        var content = _.str.trim(this.$input.val());
        var messageData = {
          content: content,
          attachment_ids: [],
          partner_ids: []
        };
        this.$input.val("");
        if (content) {
          this._postMessage(messageData);
        }
      }
    },
    _onKeypress: function(ev) {
      ev.stopPropagation();
    },
    _onScroll: function() {
      if (this.hasThread() && this.isAtBottom()) {
        this._thread.markAsRead();
      }
    },
    _onThreadWindowClicked: function() {
      var selectObj = window.getSelection();
      if (selectObj.anchorOffset === selectObj.focusOffset) {
        this.$input.focus();
      }
    }
  });
  return AbstractThreadWindow;
});

/* /im_livechat/static/src/js/website_livechat_window.js defined in bundle 'im_livechat.external_lib' */
odoo.define("im_livechat.WebsiteLivechatWindow", function(require) {
  "use strict";
  var AbstractThreadWindow = require("mail.AbstractThreadWindow");
  var LivechatWindow = AbstractThreadWindow.extend({
    events: _.extend(AbstractThreadWindow.prototype.events, {
      "input .o_composer_text_field": "_onInput"
    }),
    init: function(parent, thread) {
      this._super.apply(this, arguments);
      this._thread = thread;
    },
    close: function() {
      this.trigger_up("close_chat_window");
    },
    replaceContentWith: function($element) {
      $element.replace(this._threadWidget.$el);
    },
    toggleFold: function() {
      this._super.apply(this, arguments);
      this.trigger_up("save_chat_window");
      this.updateVisualFoldState();
    },
    _postMessage: function(messageData) {
      this.trigger_up("post_message_chat_window", { messageData: messageData });
      this._super.apply(this, arguments);
    },
    _onInput: function() {
      if (this.hasThread() && this._thread.hasTypingNotification()) {
        var isTyping = this.$input.val().length > 0;
        this._thread.setMyselfTyping({ typing: isTyping });
      }
    }
  });
  return LivechatWindow;
});

/* /mail/static/src/js/thread_widget.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.widget.Thread", function(require) {
  "use strict";
  var DocumentViewer = require("mail.DocumentViewer");
  var mailUtils = require("mail.utils");
  var core = require("web.core");
  var time = require("web.time");
  var Widget = require("web.Widget");
  var QWeb = core.qweb;
  var _t = core._t;
  var _lt = core._lt;
  var ORDER = { ASC: 1, DESC: -1 };
  var READ_MORE = _lt("read more");
  var READ_LESS = _lt("read less");
  var ThreadWidget = Widget.extend({
    className: "o_mail_thread",
    events: {
      "click a": "_onClickRedirect",
      "click img": "_onClickRedirect",
      "click strong": "_onClickRedirect",
      "click .o_thread_show_more": "_onClickShowMore",
      "click .o_attachment_download": "_onAttachmentDownload",
      "click .o_attachment_view": "_onAttachmentView",
      "click .o_attachment_delete_cross": "_onDeleteAttachment",
      "click .o_thread_message_needaction": "_onClickMessageNeedaction",
      "click .o_thread_message_star": "_onClickMessageStar",
      "click .o_thread_message_reply": "_onClickMessageReply",
      "click .oe_mail_expand": "_onClickMailExpand",
      "click .o_thread_message": "_onClickMessage",
      click: "_onClick",
      "click .o_thread_message_email_exception": "_onClickEmailException",
      "click .o_thread_message_email_bounce": "_onClickEmailException",
      "click .o_thread_message_moderation": "_onClickMessageModeration",
      "change .moderation_checkbox": "_onChangeModerationCheckbox"
    },
    init: function(parent, options) {
      this._super.apply(this, arguments);
      this._enabledOptions = _.defaults(options || {}, {
        areMessageAttachmentsDeletable: true,
        displayOrder: ORDER.ASC,
        displayMarkAsRead: true,
        displayModerationCommands: false,
        displayStars: true,
        displayDocumentLinks: true,
        displayAvatars: true,
        squashCloseMessages: true,
        displayEmailIcons: true,
        displayReplyIcons: false,
        loadMoreOnScroll: false
      });
      this._disabledOptions = {
        areMessageAttachmentsDeletable: false,
        displayOrder: this._enabledOptions.displayOrder,
        displayMarkAsRead: false,
        displayModerationCommands: false,
        displayStars: false,
        displayDocumentLinks: false,
        displayAvatars: this._enabledOptions.displayAvatars,
        squashCloseMessages: false,
        displayEmailIcons: false,
        displayReplyIcons: false,
        loadMoreOnScroll: this._enabledOptions.loadMoreOnScroll
      };
      this._selectedMessageID = null;
      this._currentThreadID = null;
      this._messageMailPopover = null;
    },
    destroy: function() {
      clearInterval(this._updateTimestampsInterval);
      if (this._messageMailPopover) {
        this._messageMailPopover.popover("hide");
      }
      this._super();
    },
    render: function(thread, options) {
      var self = this;
      var shouldScrollToBottomAfterRendering = false;
      if (this._currentThreadID === thread.getID() && this.isAtBottom()) {
        shouldScrollToBottomAfterRendering = true;
      }
      this._currentThreadID = thread.getID();
      var messages = _.clone(
        thread.getMessages({ domain: options.domain || [] })
      );
      var modeOptions = options.isCreateMode
        ? this._disabledOptions
        : this._enabledOptions;
      this.attachments = _.uniq(
        _.flatten(
          _.map(messages, function(message) {
            return message.getAttachments();
          })
        )
      );
      options = _.extend({}, modeOptions, options, {
        selectedMessageID: this._selectedMessageID
      });
      var displayAuthorMessages = {};
      var prevMessage;
      _.each(messages, function(message) {
        if (
          !prevMessage ||
          Math.abs(message.getDate().diff(prevMessage.getDate())) > 60000 ||
          prevMessage.getType() !== "comment" ||
          message.getType() !== "comment" ||
          prevMessage.getAuthorID() !== message.getAuthorID() ||
          (prevMessage.isLinkedToDocumentThread() &&
            message.isLinkedToDocumentThread() &&
            (prevMessage.getDocumentModel() !== message.getDocumentModel() ||
              prevMessage.getDocumentID() !== message.getDocumentID()))
        ) {
          displayAuthorMessages[message.getID()] = true;
        } else {
          displayAuthorMessages[message.getID()] = !options.squashCloseMessages;
        }
        prevMessage = message;
      });
      if (modeOptions.displayOrder === ORDER.DESC) {
        messages.reverse();
      }
      this.$el.html(
        QWeb.render("mail.widget.Thread", {
          thread: thread,
          displayAuthorMessages: displayAuthorMessages,
          options: options,
          ORDER: ORDER,
          dateFormat: time.getLangDatetimeFormat()
        })
      );
      if (thread.hasTypingNotification()) {
        this.renderTypingNotificationBar(thread);
      }
      _.each(messages, function(message) {
        var $message = self.$(
          '.o_thread_message[data-message-id="' + message.getID() + '"]'
        );
        $message.find(".o_mail_timestamp").data("date", message.getDate());
        self._insertReadMore($message);
      });
      if (shouldScrollToBottomAfterRendering) {
        this.scrollToBottom();
      }
      if (!this._updateTimestampsInterval) {
        this.updateTimestampsInterval = setInterval(function() {
          self._updateTimestamps();
        }, 1000 * 60);
      }
      this._renderMessageMailPopover(messages);
    },
    getScrolltop: function() {
      return this.$el.scrollTop();
    },
    isAtBottom: function() {
      var fullHeight = this.el.scrollHeight;
      var topHiddenHeight = this.$el.scrollTop();
      var visibleHeight = this.$el.outerHeight();
      var bottomHiddenHeight = fullHeight - topHiddenHeight - visibleHeight;
      return bottomHiddenHeight < 5;
    },
    removeMessageAndRender: function(messageID, thread, options) {
      var self = this;
      var done = $.Deferred();
      this.$('.o_thread_message[data-message-id="' + messageID + '"]').fadeOut({
        done: function() {
          self.render(thread, options);
          done.resolve();
        },
        duration: 200
      });
      return done;
    },
    renderTypingNotificationBar: function(thread) {
      if (this._currentThreadID === thread.getID()) {
        var shouldScrollToBottomAfterRendering = this.isAtBottom();
        var $typingBar = this.$(".o_thread_typing_notification_bar");
        var text = thread.getTypingMembersToText();
        $typingBar.toggleClass("o_hidden", !text);
        $typingBar.text(text);
        if (shouldScrollToBottomAfterRendering) {
          this.scrollToBottom();
        }
      }
    },
    scrollToBottom: function() {
      this.$el.scrollTop(this.el.scrollHeight);
    },
    scrollToMessage: function(options) {
      var $target = this.$(
        '.o_thread_message[data-message-id="' + options.msgID + '"]'
      );
      if (options.onlyIfNecessary) {
        var delta = $target.parent().height() - $target.height();
        var offset =
          delta < 0
            ? 0
            : delta -
              ($target.offset().top - $target.offsetParent().offset().top);
        offset = -Math.min(offset, 0);
        this.$el.scrollTo("+=" + offset + "px", options.duration);
      } else if ($target.length) {
        this.$el.scrollTo($target);
      }
    },
    scrollToPosition: function(position) {
      if (position) {
        this.$el.scrollTop(position);
      } else {
        this.scrollToBottom();
      }
    },
    toggleModerationCheckboxes: function(checked) {
      this.$(".moderation_checkbox").prop("checked", checked);
    },
    unselectMessage: function() {
      this.$(".o_thread_message").removeClass("o_thread_selected_message");
      this._selectedMessageID = null;
    },
    _insertReadMore: function($element) {
      var self = this;
      var groups = [];
      var readMoreNodes;
      var $children = $element.contents().filter(function() {
        return (
          this.nodeType === 1 || (this.nodeType === 3 && this.nodeValue.trim())
        );
      });
      _.each($children, function(child) {
        var $child = $(child);
        if (
          child.nodeType === 3 &&
          $child.prevAll('[id*="stopSpelling"]').length > 0
        ) {
          $child = $("<span>", {
            text: child.textContent,
            "data-o-mail-quote": "1"
          });
          child.parentNode.replaceChild($child[0], child);
        }
        if (
          $child.attr("data-o-mail-quote") ||
          ($child.get(0).nodeName === "BR" &&
            $child.prev('[data-o-mail-quote="1"]').length > 0)
        ) {
          if (!readMoreNodes) {
            readMoreNodes = [];
            groups.push(readMoreNodes);
          }
          $child.hide();
          readMoreNodes.push($child);
        } else {
          readMoreNodes = undefined;
          self._insertReadMore($child);
        }
      });
      _.each(groups, function(group) {
        var $readMore = $("<a>", {
          class: "o_mail_read_more",
          href: "#",
          text: READ_MORE
        }).insertBefore(group[0]);
        var isReadMore = true;
        $readMore.click(function(e) {
          e.preventDefault();
          isReadMore = !isReadMore;
          _.each(group, function($child) {
            $child.hide();
            $child.toggle(!isReadMore);
          });
          $readMore.text(isReadMore ? READ_MORE : READ_LESS);
        });
      });
    },
    _onDeleteAttachment: function(ev) {
      ev.stopPropagation();
      var $target = $(ev.currentTarget);
      this.trigger_up("delete_attachment", {
        attachmentId: $target.data("id"),
        attachmentName: $target.data("name")
      });
    },
    _redirect: _.debounce(
      function(options) {
        if ("channelID" in options) {
          this.trigger("redirect_to_channel", options.channelID);
        } else {
          this.trigger("redirect", options.model, options.id);
        }
      },
      500,
      true
    ),
    _renderMessageMailPopover: function(messages) {
      if (this._messageMailPopover) {
        this._messageMailPopover.popover("hide");
      }
      if (!this.$(".o_thread_tooltip").length) {
        return;
      }
      this._messageMailPopover = this.$(".o_thread_tooltip").popover({
        html: true,
        boundary: "viewport",
        placement: "auto",
        trigger: "hover",
        offset: "0, 1",
        content: function() {
          var messageID = $(this).data("message-id");
          var message = _.find(messages, function(message) {
            return message.getID() === messageID;
          });
          return QWeb.render("mail.widget.Thread.Message.MailTooltip", {
            data: message.hasCustomerEmailData()
              ? message.getCustomerEmailData()
              : []
          });
        }
      });
    },
    _updateTimestamps: function() {
      var isAtBottom = this.isAtBottom();
      this.$(".o_mail_timestamp").each(function() {
        var date = $(this).data("date");
        $(this).html(mailUtils.timeFromNow(date));
      });
      if (isAtBottom && !this.isAtBottom()) {
        this.scrollToBottom();
      }
    },
    _onAttachmentDownload: function(event) {
      event.stopPropagation();
    },
    _onAttachmentView: function(event) {
      event.stopPropagation();
      var activeAttachmentID = $(event.currentTarget).data("id");
      if (activeAttachmentID) {
        var attachmentViewer = new DocumentViewer(
          this,
          this.attachments,
          activeAttachmentID
        );
        attachmentViewer.appendTo($("body"));
      }
    },
    _onChangeModerationCheckbox: function(ev) {
      this.trigger_up("update_moderation_buttons");
    },
    _onClick: function() {
      if (this._selectedMessageID) {
        this.unselectMessage();
        this.trigger("unselect_message");
      }
    },
    _onClickEmailException: function(ev) {
      var messageID = $(ev.currentTarget).data("message-id");
      this.do_action("mail.mail_resend_message_action", {
        additional_context: { mail_message_to_resend: messageID }
      });
    },
    _onClickMailExpand: function(ev) {
      ev.preventDefault();
    },
    _onClickMessage: function(ev) {
      $(ev.currentTarget).toggleClass("o_thread_selected_message");
    },
    _onClickMessageNeedaction: function(ev) {
      var messageID = $(ev.currentTarget).data("message-id");
      this.trigger("mark_as_read", messageID);
    },
    _onClickMessageReply: function(ev) {
      this._selectedMessageID = $(ev.currentTarget).data("message-id");
      this.$(".o_thread_message").removeClass("o_thread_selected_message");
      this.$(
        '.o_thread_message[data-message-id="' + this._selectedMessageID + '"]'
      ).addClass("o_thread_selected_message");
      this.trigger("select_message", this._selectedMessageID);
      ev.stopPropagation();
    },
    _onClickMessageStar: function(ev) {
      var messageID = $(ev.currentTarget).data("message-id");
      this.trigger("toggle_star_status", messageID);
    },
    _onClickMessageModeration: function(ev) {
      var $button = $(ev.currentTarget);
      var messageID = $button.data("message-id");
      var decision = $button.data("decision");
      this.trigger_up("message_moderation", {
        messageID: messageID,
        decision: decision
      });
    },
    _onClickRedirect: function(ev) {
      if ($(ev.target).data("oe-field") !== undefined) {
        return;
      }
      var id = $(ev.target).data("oe-id");
      if (id) {
        ev.preventDefault();
        var model = $(ev.target).data("oe-model");
        var options;
        if (model && model !== "mail.channel") {
          options = { model: model, id: id };
        } else {
          options = { channelID: id };
        }
        this._redirect(options);
      }
    },
    _onClickShowMore: function() {
      this.trigger("load_more_messages");
    }
  });
  ThreadWidget.ORDER = ORDER;
  return ThreadWidget;
});

/* /bus/static/src/js/longpolling_bus.js defined in bundle 'im_livechat.external_lib' */
odoo.define("bus.Longpolling", function(require) {
  "use strict";
  var Bus = require("web.Bus");
  var ServicesMixin = require("web.ServicesMixin");
  var LongpollingBus = Bus.extend(ServicesMixin, {
    PARTNERS_PRESENCE_CHECK_PERIOD: 30000,
    ERROR_RETRY_DELAY: 10000,
    POLL_ROUTE: "/longpolling/poll",
    _isActive: null,
    _lastNotificationID: 0,
    _isOdooFocused: true,
    _pollRetryTimeout: null,
    init: function(parent, params) {
      this._super.apply(this, arguments);
      this._id = _.uniqueId("bus");
      this._longPollingBusId = this._id;
      this._options = {};
      this._channels = [];
      this._lastPresenceTime = new Date().getTime();
      this._lastPartnersPresenceCheck = this._lastPresenceTime;
      $(window).on(
        "focus." + this._longPollingBusId,
        this._onFocusChange.bind(this, { focus: true })
      );
      $(window).on(
        "blur." + this._longPollingBusId,
        this._onFocusChange.bind(this, { focus: false })
      );
      $(window).on(
        "unload." + this._longPollingBusId,
        this._onFocusChange.bind(this, { focus: false })
      );
      $(window).on(
        "click." + this._longPollingBusId,
        this._onPresence.bind(this)
      );
      $(window).on(
        "keydown." + this._longPollingBusId,
        this._onPresence.bind(this)
      );
      $(window).on(
        "keyup." + this._longPollingBusId,
        this._onPresence.bind(this)
      );
    },
    destroy: function() {
      this.stopPolling();
      $(window).off("focus." + this._longPollingBusId);
      $(window).off("blur." + this._longPollingBusId);
      $(window).off("unload." + this._longPollingBusId);
      $(window).off("click." + this._longPollingBusId);
      $(window).off("keydown." + this._longPollingBusId);
      $(window).off("keyup." + this._longPollingBusId);
      this._super();
    },
    addChannel: function(channel) {
      if (this._channels.indexOf(channel) === -1) {
        this._channels.push(channel);
        if (this._pollRpc) {
          this._pollRpc.abort();
        } else {
          this.startPolling();
        }
      }
    },
    deleteChannel: function(channel) {
      var index = this._channels.indexOf(channel);
      if (index !== -1) {
        this._channels.splice(index, 1);
        if (this._pollRpc) {
          this._pollRpc.abort();
        }
      }
    },
    isOdooFocused: function() {
      return this._isOdooFocused;
    },
    startPolling: function() {
      if (this._isActive === null) {
        this._poll = this._poll.bind(this);
      }
      if (!this._isActive) {
        this._isActive = true;
        this._poll();
      }
    },
    stopPolling: function() {
      this._isActive = false;
      this._channels = [];
      clearTimeout(this._pollRetryTimeout);
      if (this._pollRpc) {
        this._pollRpc.abort();
      }
    },
    updateOption: function(key, value) {
      this._options[key] = value;
    },
    _getLastPresence: function() {
      return this._lastPresenceTime;
    },
    _poll: function() {
      var self = this;
      if (!this._isActive) {
        return;
      }
      var now = new Date().getTime();
      var options = _.extend({}, this._options, {
        bus_inactivity: now - this._getLastPresence()
      });
      if (
        this._lastPartnersPresenceCheck + this.PARTNERS_PRESENCE_CHECK_PERIOD >
        now
      ) {
        options = _.omit(options, "bus_presence_partner_ids");
      } else {
        this._lastPartnersPresenceCheck = now;
      }
      var data = {
        channels: this._channels,
        last: this._lastNotificationID,
        options: options
      };
      this._pollRpc = this._makePoll(data);
      this._pollRpc.then(
        function(result) {
          self._pollRpc = false;
          self._onPoll(result);
          self._poll();
        },
        function(error, ev) {
          self._pollRpc = false;
          ev.preventDefault();
          if (error && error.message === "XmlHttpRequestError abort") {
            self._poll();
          } else {
            self._pollRetryTimeout = setTimeout(
              self._poll,
              self.ERROR_RETRY_DELAY + Math.floor(Math.random() * 20 + 1) * 1000
            );
          }
        }
      );
    },
    _makePoll: function(data) {
      return this._rpc(
        { route: this.POLL_ROUTE, params: data },
        { shadow: true, timeout: 60000 }
      );
    },
    _onFocusChange: function(params) {
      this._isOdooFocused = params.focus;
      if (params.focus) {
        this._lastPresenceTime = new Date().getTime();
        this.trigger("window_focus", this._isOdooFocused);
      }
    },
    _onPoll: function(notifications) {
      var self = this;
      var notifs = _.map(notifications, function(notif) {
        if (notif.id > self._lastNotificationID) {
          self._lastNotificationID = notif.id;
        }
        return [notif.channel, notif.message];
      });
      this.trigger("notification", notifs);
      return notifs;
    },
    _onPresence: function() {
      this._lastPresenceTime = new Date().getTime();
    }
  });
  return LongpollingBus;
});

/* /bus/static/src/js/crosstab_bus.js defined in bundle 'im_livechat.external_lib' */
odoo.define("bus.CrossTab", function(require) {
  "use strict";
  var Longpolling = require("bus.Longpolling");
  var session = require("web.session");
  var CrossTabBus = Longpolling.extend({
    TAB_HEARTBEAT_PERIOD: 10000,
    MASTER_TAB_HEARTBEAT_PERIOD: 1500,
    HEARTBEAT_OUT_OF_DATE_PERIOD: 5000,
    HEARTBEAT_KILL_OLD_PERIOD: 15000,
    LOCAL_STORAGE_PREFIX: "bus",
    _isMasterTab: false,
    _isRegistered: false,
    init: function() {
      this._super.apply(this, arguments);
      var now = new Date().getTime();
      this._sanitizedOrigin = session.origin.replace(/:\/{0,2}/g, "_");
      this._id = _.uniqueId(this.LOCAL_STORAGE_PREFIX) + ":" + now;
      if (this._callLocalStorage("getItem", "last_ts", 0) + 50000 < now) {
        this._callLocalStorage("removeItem", "last");
      }
      this._lastNotificationID = this._callLocalStorage("getItem", "last", 0);
      this.call("local_storage", "onStorage", this, this._onStorage);
    },
    destroy: function() {
      this._super();
      clearTimeout(this._heartbeatTimeout);
    },
    addChannel: function() {
      this._super.apply(this, arguments);
      this._callLocalStorage("setItem", "channels", this._channels);
    },
    deleteChannel: function() {
      this._super.apply(this, arguments);
      this._callLocalStorage("setItem", "channels", this._channels);
    },
    getTabId: function() {
      return this._id;
    },
    isMasterTab: function() {
      return this._isMasterTab;
    },
    startPolling: function() {
      if (this._isActive === null) {
        this._heartbeat = this._heartbeat.bind(this);
      }
      if (!this._isRegistered) {
        this._isRegistered = true;
        var peers = this._callLocalStorage("getItem", "peers", {});
        peers[this._id] = new Date().getTime();
        this._callLocalStorage("setItem", "peers", peers);
        this._registerWindowUnload();
        if (!this._callLocalStorage("getItem", "master")) {
          this._startElection();
        }
        this._heartbeat();
        if (this._isMasterTab) {
          this._callLocalStorage("setItem", "channels", this._channels);
          this._callLocalStorage("setItem", "options", this._options);
        } else {
          this._channels = this._callLocalStorage(
            "getItem",
            "channels",
            this._channels
          );
          this._options = this._callLocalStorage(
            "getItem",
            "options",
            this._options
          );
        }
        return;
      }
      if (this._isMasterTab) {
        this._super.apply(this, arguments);
      }
    },
    updateOption: function() {
      this._super.apply(this, arguments);
      this._callLocalStorage("setItem", "options", this._options);
    },
    _callLocalStorage: function(method, key, param) {
      return this.call("local_storage", method, this._generateKey(key), param);
    },
    _generateKey: function(key) {
      return (
        this.LOCAL_STORAGE_PREFIX + "." + this._sanitizedOrigin + "." + key
      );
    },
    _getLastPresence: function() {
      return this._callLocalStorage("getItem", "lastPresence") || this._super();
    },
    _heartbeat: function() {
      var now = new Date().getTime();
      var heartbeatValue = parseInt(
        this._callLocalStorage("getItem", "heartbeat", 0)
      );
      var peers = this._callLocalStorage("getItem", "peers", {});
      if (heartbeatValue + this.HEARTBEAT_OUT_OF_DATE_PERIOD < now) {
        this._startElection();
        heartbeatValue = parseInt(
          this._callLocalStorage("getItem", "heartbeat", 0)
        );
      }
      if (this._isMasterTab) {
        var cleanedPeers = {};
        for (var peerName in peers) {
          if (peers[peerName] + this.HEARTBEAT_KILL_OLD_PERIOD > now) {
            cleanedPeers[peerName] = peers[peerName];
          }
        }
        if (heartbeatValue !== this.lastHeartbeat) {
          this._isMasterTab = false;
          this.lastHeartbeat = 0;
          peers[this._id] = now;
          this._callLocalStorage("setItem", "peers", peers);
          this.stopPolling();
          this.trigger("no_longer_master");
        } else {
          this.lastHeartbeat = now;
          this._callLocalStorage("setItem", "heartbeat", now);
          this._callLocalStorage("setItem", "peers", cleanedPeers);
        }
      } else {
        peers[this._id] = now;
        this._callLocalStorage("setItem", "peers", peers);
      }
      var hbPeriod = this._isMasterTab
        ? this.MASTER_TAB_HEARTBEAT_PERIOD
        : this.TAB_HEARTBEAT_PERIOD;
      if (this._lastPresenceTime + hbPeriod > now) {
        this._callLocalStorage(
          "setItem",
          "lastPresence",
          this._lastPresenceTime
        );
      }
      this._heartbeatTimeout = setTimeout(this._heartbeat.bind(this), hbPeriod);
    },
    _registerWindowUnload: function() {
      $(window).on("unload." + this._id, this._onUnload.bind(this));
    },
    _startElection: function() {
      if (this._isMasterTab) {
        return;
      }
      var now = new Date().getTime();
      var peers = this._callLocalStorage("getItem", "peers", {});
      var heartbeatKillOld = now - this.HEARTBEAT_KILL_OLD_PERIOD;
      var newMaster;
      for (var peerName in peers) {
        if (peers[peerName] < heartbeatKillOld) {
          continue;
        }
        newMaster = peerName;
        break;
      }
      if (newMaster === this._id) {
        this.lastHeartbeat = now;
        this._callLocalStorage("setItem", "heartbeat", this.lastHeartbeat);
        this._callLocalStorage("setItem", "master", true);
        this._isMasterTab = true;
        this.startPolling();
        this.trigger("become_master");
        delete peers[newMaster];
        this._callLocalStorage("setItem", "peers", peers);
      }
    },
    _onFocusChange: function(params) {
      this._super.apply(this, arguments);
      this._callLocalStorage("setItem", "focus", params.focus);
    },
    _onPoll: function(notifications) {
      var notifs = this._super(notifications);
      if (this._isMasterTab && notifs.length) {
        this._callLocalStorage("setItem", "last", this._lastNotificationID);
        this._callLocalStorage("setItem", "last_ts", new Date().getTime());
        this._callLocalStorage("setItem", "notification", notifs);
      }
    },
    _onStorage: function(e) {
      var value = JSON.parse(e.newValue);
      var key = e.key;
      if (this._isRegistered && key === this._generateKey("master") && !value) {
        this._startElection();
      }
      if (key === this._generateKey("last")) {
        this._lastNotificationID = value || 0;
      } else if (key === this._generateKey("notification")) {
        if (!this._isMasterTab) {
          this.trigger("notification", value);
        }
      } else if (key === this._generateKey("channels")) {
        var channels = value;
        _.each(
          _.difference(this._channels, channels),
          this.deleteChannel.bind(this)
        );
        _.each(
          _.difference(channels, this._channels),
          this.addChannel.bind(this)
        );
      } else if (key === this._generateKey("options")) {
        this._options = value;
      } else if (key === this._generateKey("focus")) {
        this._isOdooFocused = value;
        this.trigger("window_focus", this._isOdooFocused);
      }
    },
    _onUnload: function() {
      var peers = this._callLocalStorage("getItem", "peers", {});
      delete peers[this._id];
      this._callLocalStorage("setItem", "peers", peers);
      if (this._isMasterTab) {
        this._callLocalStorage("removeItem", "master");
      }
    }
  });
  return CrossTabBus;
});

/* /bus/static/src/js/services/bus_service.js defined in bundle 'im_livechat.external_lib' */
odoo.define("bus.BusService", function(require) {
  "use strict";
  var CrossTab = require("bus.CrossTab");
  var core = require("web.core");
  var ServicesMixin = require("web.ServicesMixin");
  var BusService = CrossTab.extend(ServicesMixin, {
    dependencies: ["local_storage"],
    _audio: null,
    start: function() {},
    sendNotification: function(title, content, callback) {
      if (window.Notification && Notification.permission === "granted") {
        if (this.isMasterTab()) {
          this._sendNativeNotification(title, content, callback);
        }
      } else {
        this.do_notify(title, content);
        if (this.isMasterTab()) {
          this._beep();
        }
      }
    },
    onNotification: function() {
      this.on.apply(
        this,
        ["notification"].concat(Array.prototype.slice.call(arguments))
      );
    },
    _beep: function() {
      if (typeof Audio !== "undefined") {
        if (!this._audio) {
          this._audio = new Audio();
          var ext = this._audio.canPlayType("audio/ogg; codecs=vorbis")
            ? ".ogg"
            : ".mp3";
          var session = this.getSession();
          this._audio.src = session.url("/mail/static/src/audio/ting" + ext);
        }
        this._audio.play();
      }
    },
    _sendNativeNotification: function(title, content, callback) {
      var notification = new Notification(title, {
        body: content,
        icon: "/mail/static/src/img/odoobot.png"
      });
      notification.onclick = function() {
        window.focus();
        if (this.cancel) {
          this.cancel();
        } else if (this.close) {
          this.close();
        }
        if (callback) {
          callback();
        }
      };
    }
  });
  core.serviceRegistry.add("bus_service", BusService);
  return BusService;
});

/* /mail/static/src/js/utils.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.utils", function(require) {
  "use strict";
  var core = require("web.core");
  var _t = core._t;
  function parseAndTransform(htmlString, transformFunction) {
    var openToken = "OPEN" + Date.now();
    var string = htmlString.replace(/&lt;/g, openToken);
    var children;
    try {
      children = $("<div>")
        .html(string)
        .contents();
    } catch (e) {
      children = $("<div>")
        .html("<pre>" + string + "</pre>")
        .contents();
    }
    return _parseAndTransform(children, transformFunction).replace(
      new RegExp(openToken, "g"),
      "&lt;"
    );
  }
  function _parseAndTransform(nodes, transformFunction) {
    return _.map(nodes, function(node) {
      return transformFunction(node, function() {
        return _parseAndTransform(node.childNodes, transformFunction);
      });
    }).join("");
  }
  var urlRegexp = /\b(?:https?:\/\/\d{1,3}(?:\.\d{1,3}){3}|(?:https?:\/\/|(?:www\.))[-a-z0-9@:%._+~#=]{2,256}\.[a-z]{2,13})\b(?:[-a-z0-9@:%_+.~#?&'$//=;]*)/gi;
  function linkify(text, attrs) {
    attrs = attrs || {};
    if (attrs.target === undefined) {
      attrs.target = "_blank";
    }
    attrs = _.map(attrs, function(value, key) {
      return key + '="' + _.escape(value) + '"';
    }).join(" ");
    return text.replace(urlRegexp, function(url) {
      var href = !/^https?:\/\//i.test(url) ? "http://" + url : url;
      return "<a " + attrs + ' href="' + href + '">' + url + "</a>";
    });
  }
  function addLink(node, transformChildren) {
    if (node.nodeType === 3) {
      return linkify(node.data);
    }
    if (node.tagName === "A") return node.outerHTML;
    node.innerHTML = transformChildren();
    return node.outerHTML;
  }
  function stripHTML(node, transformChildren) {
    if (node.nodeType === 3) return node.data;
    if (node.tagName === "BR") return "\n";
    return transformChildren();
  }
  function inline(node, transform_children) {
    if (node.nodeType === 3) return node.data;
    if (node.nodeType === 8) return "";
    if (node.tagName === "BR") return " ";
    if (node.tagName.match(/^(A|P|DIV|PRE|BLOCKQUOTE)$/))
      return transform_children();
    node.innerHTML = transform_children();
    return node.outerHTML;
  }
  function parseEmail(text) {
    if (text) {
      var result = text.match(/(.*)<(.*@.*)>/);
      if (result) {
        return [_.str.trim(result[1]), _.str.trim(result[2])];
      }
      result = text.match(/(.*@.*)/);
      if (result) {
        return [_.str.trim(result[1]), _.str.trim(result[1])];
      }
      return [text, false];
    }
  }
  function getTextToHTML(text) {
    return text
      .replace(/((?:https?|ftp):\/\/[\S]+)/g, '<a href="$1">$1</a> ')
      .replace(/[\n\r]/g, "<br/>");
  }
  var accentedLettersMapping = {
    a: "[Ã Ã¡Ã¢Ã£Ã¤Ã¥]",
    ae: "Ã¦",
    c: "Ã§",
    e: "[Ã¨Ã©ÃªÃ«]",
    i: "[Ã¬Ã­Ã®Ã¯]",
    n: "Ã±",
    o: "[Ã²Ã³Ã´ÃµÃ¶]",
    oe: "Å“",
    u: "[Ã¹ÃºÃ»Å±Ã¼]",
    y: "[Ã½Ã¿]"
  };
  function unaccent(str) {
    _.each(accentedLettersMapping, function(value, key) {
      str = str.replace(new RegExp(value, "g"), key);
    });
    return str;
  }
  function timeFromNow(date) {
    if (moment().diff(date, "seconds") < 45) {
      return _t("now");
    }
    return date.fromNow();
  }
  return {
    addLink: addLink,
    getTextToHTML: getTextToHTML,
    inline: inline,
    linkify: linkify,
    parseAndTransform: parseAndTransform,
    parseEmail: parseEmail,
    stripHTML: stripHTML,
    timeFromNow: timeFromNow,
    unaccent: unaccent
  };
});

/* /mail/static/src/js/document_viewer.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.DocumentViewer", function(require) {
  "use strict";
  var core = require("web.core");
  var Widget = require("web.Widget");
  var QWeb = core.qweb;
  var SCROLL_ZOOM_STEP = 0.1;
  var ZOOM_STEP = 0.5;
  var DocumentViewer = Widget.extend({
    template: "DocumentViewer",
    events: {
      "click .o_download_btn": "_onDownload",
      "click .o_split_btn": "_onSplitPDF",
      "click .o_viewer_img": "_onImageClicked",
      "click .o_viewer_video": "_onVideoClicked",
      "click .move_next": "_onNext",
      "click .move_previous": "_onPrevious",
      "click .o_rotate": "_onRotate",
      "click .o_zoom_in": "_onZoomIn",
      "click .o_zoom_out": "_onZoomOut",
      "click .o_zoom_reset": "_onZoomReset",
      "click .o_close_btn, .o_viewer_img_wrapper": "_onClose",
      "click .o_print_btn": "_onPrint",
      "DOMMouseScroll .o_viewer_content": "_onScroll",
      "mousewheel .o_viewer_content": "_onScroll",
      keydown: "_onKeydown",
      keyup: "_onKeyUp",
      "mousedown .o_viewer_img": "_onStartDrag",
      "mousemove .o_viewer_content": "_onDrag",
      "mouseup .o_viewer_content": "_onEndDrag"
    },
    init: function(parent, attachments, activeAttachmentID) {
      this._super.apply(this, arguments);
      this.attachment = _.filter(attachments, function(attachment) {
        var match =
          attachment.type == "url"
            ? attachment.url.match("(youtu|.png|.jpg|.gif)")
            : attachment.mimetype.match("(image|video|application/pdf|text)");
        if (match) {
          attachment.type = match[1];
          if (match[1].match("(.png|.jpg|.gif)")) {
            attachment.type = "image";
          }
          if (match[1] === "youtu") {
            var youtube_array = attachment.url.split("/");
            var youtube_token = youtube_array[youtube_array.length - 1];
            if (youtube_token.indexOf("watch") !== -1) {
              youtube_token = youtube_token.split("v=")[1];
              var amp = youtube_token.indexOf("&");
              if (amp !== -1) {
                youtube_token = youtube_token.substring(0, amp);
              }
            }
            attachment.youtube = youtube_token;
          }
          return true;
        }
      });
      this.activeAttachment = _.findWhere(attachments, {
        id: activeAttachmentID
      });
      this._reset();
    },
    start: function() {
      this.$el.modal("show");
      this.$el.on("hidden.bs.modal", _.bind(this._onDestroy, this));
      this.$(".o_viewer_img").load(_.bind(this._onImageLoaded, this));
      this.$('[data-toggle="tooltip"]').tooltip({ delay: 0 });
      return this._super.apply(this, arguments);
    },
    destroy: function() {
      if (this.isDestroyed()) {
        return;
      }
      this.trigger_up("document_viewer_closed");
      this.$el.modal("hide");
      this.$el.remove();
      this._super.apply(this, arguments);
    },
    _next: function() {
      var index = _.findIndex(this.attachment, this.activeAttachment);
      index = (index + 1) % this.attachment.length;
      this.activeAttachment = this.attachment[index];
      this._updateContent();
    },
    _previous: function() {
      var index = _.findIndex(this.attachment, this.activeAttachment);
      index = index === 0 ? this.attachment.length - 1 : index - 1;
      this.activeAttachment = this.attachment[index];
      this._updateContent();
    },
    _reset: function() {
      this.scale = 1;
      this.dragStartX = this.dragstopX = 0;
      this.dragStartY = this.dragstopY = 0;
    },
    _updateContent: function() {
      this.$(".o_viewer_content").html(
        QWeb.render("DocumentViewer.Content", { widget: this })
      );
      this.$(".o_viewer_img").load(_.bind(this._onImageLoaded, this));
      this.$('[data-toggle="tooltip"]').tooltip({ delay: 0 });
      this._reset();
    },
    _getTransform: function(scale, angle) {
      return (
        "scale3d(" + scale + ", " + scale + ", 1) rotate(" + angle + "deg)"
      );
    },
    _rotate: function(angle) {
      this._reset();
      var new_angle = (this.angle || 0) + angle;
      this.$(".o_viewer_img").css(
        "transform",
        this._getTransform(this.scale, new_angle)
      );
      this.$(".o_viewer_img").css(
        "max-width",
        new_angle % 180 !== 0 ? $(document).height() : "100%"
      );
      this.$(".o_viewer_img").css(
        "max-height",
        new_angle % 180 !== 0 ? $(document).width() : "100%"
      );
      this.angle = new_angle;
    },
    _zoom: function(scale) {
      if (scale > 0.5) {
        this.$(".o_viewer_img").css(
          "transform",
          this._getTransform(scale, this.angle || 0)
        );
        this.scale = scale;
      }
      this.$(".o_zoom_reset")
        .add(".o_zoom_out")
        .toggleClass("disabled", scale === 1);
    },
    _onClose: function(e) {
      e.preventDefault();
      this.destroy();
    },
    _onDestroy: function() {
      this.destroy();
    },
    _onDownload: function(e) {
      e.preventDefault();
      window.location =
        "/web/content/" + this.activeAttachment.id + "?download=true";
    },
    _onDrag: function(e) {
      e.preventDefault();
      if (this.enableDrag) {
        var $image = this.$(".o_viewer_img");
        var $zoomer = this.$(".o_viewer_zoomer");
        var top =
          $image.prop("offsetHeight") * this.scale > $zoomer.height()
            ? e.clientY - this.dragStartY
            : 0;
        var left =
          $image.prop("offsetWidth") * this.scale > $zoomer.width()
            ? e.clientX - this.dragStartX
            : 0;
        $zoomer.css(
          "transform",
          "translate3d(" + left + "px, " + top + "px, 0)"
        );
        $image.css("cursor", "move");
      }
    },
    _onEndDrag: function(e) {
      e.preventDefault();
      if (this.enableDrag) {
        this.enableDrag = false;
        this.dragstopX = e.clientX - this.dragStartX;
        this.dragstopY = e.clientY - this.dragStartY;
        this.$(".o_viewer_img").css("cursor", "");
      }
    },
    _onImageClicked: function(e) {
      e.stopPropagation();
    },
    _onImageLoaded: function() {
      this.$(".o_loading_img").hide();
    },
    _onKeydown: function(e) {
      switch (e.which) {
        case $.ui.keyCode.RIGHT:
          e.preventDefault();
          this._next();
          break;
        case $.ui.keyCode.LEFT:
          e.preventDefault();
          this._previous();
          break;
      }
    },
    _onKeyUp: function(e) {
      switch (e.which) {
        case $.ui.keyCode.ESCAPE:
          e.preventDefault();
          this._onClose(e);
          break;
      }
    },
    _onNext: function(e) {
      e.preventDefault();
      this._next();
    },
    _onPrevious: function(e) {
      e.preventDefault();
      this._previous();
    },
    _onPrint: function(e) {
      e.preventDefault();
      var src = this.$(".o_viewer_img").prop("src");
      var script = QWeb.render("PrintImage", { src: src });
      var printWindow = window.open("about:blank", "_new");
      printWindow.document.open();
      printWindow.document.write(script);
      printWindow.document.close();
    },
    _onScroll: function(e) {
      var scale;
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        scale = this.scale + SCROLL_ZOOM_STEP;
        this._zoom(scale);
      } else {
        scale = this.scale - SCROLL_ZOOM_STEP;
        this._zoom(scale);
      }
    },
    _onSplitPDF: function(e) {
      e.stopPropagation();
      var self = this;
      var indices = $("input[name=Indices]").val();
      var remainder = $("input[type=checkbox][name=remainder]").is(":checked");
      this._rpc({
        model: "ir.attachment",
        method: "split_pdf",
        args: [this.activeAttachment.id, indices, remainder]
      }).always(function() {
        self.trigger_up("document_viewer_attachment_changed");
        self.destroy();
      });
    },
    _onStartDrag: function(e) {
      e.preventDefault();
      this.enableDrag = true;
      this.dragStartX = e.clientX - (this.dragstopX || 0);
      this.dragStartY = e.clientY - (this.dragstopY || 0);
    },
    _onVideoClicked: function(e) {
      e.stopPropagation();
      var videoElement = e.target;
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    },
    _onRotate: function(e) {
      e.preventDefault();
      this._rotate(90);
    },
    _onZoomIn: function(e) {
      e.preventDefault();
      var scale = this.scale + ZOOM_STEP;
      this._zoom(scale);
    },
    _onZoomOut: function(e) {
      e.preventDefault();
      var scale = this.scale - ZOOM_STEP;
      this._zoom(scale);
    },
    _onZoomReset: function(e) {
      e.preventDefault();
      this.$(".o_viewer_zoomer").css("transform", "");
      this._zoom(1);
    }
  });
  return DocumentViewer;
});

/* /im_livechat/static/src/js/im_livechat.js defined in bundle 'im_livechat.external_lib' */
odoo.define("im_livechat.im_livechat", function(require) {
  "use strict";
  require("bus.BusService");
  var concurrency = require("web.concurrency");
  var config = require("web.config");
  var core = require("web.core");
  var session = require("web.session");
  var time = require("web.time");
  var utils = require("web.utils");
  var Widget = require("web.Widget");
  var WebsiteLivechat = require("im_livechat.model.WebsiteLivechat");
  var WebsiteLivechatMessage = require("im_livechat.model.WebsiteLivechatMessage");
  var WebsiteLivechatWindow = require("im_livechat.WebsiteLivechatWindow");
  var _t = core._t;
  var QWeb = core.qweb;
  var LIVECHAT_COOKIE_HISTORY = "im_livechat_history";
  var HISTORY_LIMIT = 15;
  var RATING_TO_EMOJI = { "10": "ðŸ˜Š", "5": "ðŸ˜", "1": "ðŸ˜ž" };
  var page = window.location.href.replace(/^.*\/\/[^/]+/, "");
  var pageHistory = utils.get_cookie(LIVECHAT_COOKIE_HISTORY);
  var urlHistory = [];
  if (pageHistory) {
    urlHistory = JSON.parse(pageHistory) || [];
  }
  if (!_.contains(urlHistory, page)) {
    urlHistory.push(page);
    while (urlHistory.length > HISTORY_LIMIT) {
      urlHistory.shift();
    }
    utils.set_cookie(
      LIVECHAT_COOKIE_HISTORY,
      JSON.stringify(urlHistory),
      60 * 60 * 24
    );
  }
  var LivechatButton = Widget.extend({
    className: "openerp o_livechat_button d-print-none",
    custom_events: {
      close_chat_window: "_onCloseChatWindow",
      post_message_chat_window: "_onPostMessageChatWindow",
      save_chat_window: "_onSaveChatWindow",
      updated_typing_partners: "_onUpdatedTypingPartners",
      updated_unread_counter: "_onUpdatedUnreadCounter"
    },
    events: { click: "_openChat" },
    init: function(parent, serverURL, options) {
      this._super(parent);
      this.options = _.defaults(options || {}, {
        input_placeholder: _t("Ask something ..."),
        default_username: _t("Visitor"),
        button_text: _t("Chat with one of our collaborators"),
        default_message: _t("How may I help you?")
      });
      this._history = null;
      this._livechat = null;
      this._chatWindow = null;
      this._messages = [];
      this._serverURL = serverURL;
    },
    willStart: function() {
      var self = this;
      var cookie = utils.get_cookie("im_livechat_session");
      var ready;
      if (!cookie) {
        ready = session
          .rpc("/im_livechat/init", { channel_id: this.options.channel_id })
          .then(function(result) {
            if (!result.available_for_me) {
              return $.Deferred().reject();
            }
            self._rule = result.rule;
          });
      } else {
        var channel = JSON.parse(cookie);
        ready = session
          .rpc("/mail/chat_history", { uuid: channel.uuid, limit: 100 })
          .then(function(history) {
            self._history = history;
          });
      }
      return ready.then(this._loadQWebTemplate.bind(this));
    },
    start: function() {
      this.$el.text(this.options.button_text);
      if (this._history) {
        _.each(this._history.reverse(), this._addMessage.bind(this));
        this._openChat();
      } else if (
        !config.device.isMobile &&
        this._rule.action === "auto_popup"
      ) {
        var autoPopupCookie = utils.get_cookie("im_livechat_auto_popup");
        if (!autoPopupCookie || JSON.parse(autoPopupCookie)) {
          this._autoPopupTimeout = setTimeout(
            this._openChat.bind(this),
            this._rule.auto_popup_timer * 1000
          );
        }
      }
      this.call("bus_service", "onNotification", this, this._onNotification);
      return this._super();
    },
    _addMessage: function(data, options) {
      options = _.extend({}, this.options, options, {
        serverURL: this._serverURL
      });
      var message = new WebsiteLivechatMessage(this, data, options);
      var hasAlreadyMessage = _.some(this._messages, function(msg) {
        return message.getID() === msg.getID();
      });
      if (hasAlreadyMessage) {
        return;
      }
      if (this._livechat) {
        this._livechat.addMessage(message);
      }
      if (options && options.prepend) {
        this._messages.unshift(message);
      } else {
        this._messages.push(message);
      }
    },
    _askFeedback: function() {
      this._chatWindow.$(".o_thread_composer input").prop("disabled", true);
      var feedback = new Feedback(this, this._livechat);
      this._chatWindow.replaceContentWith(feedback);
      feedback.on("send_message", this, this._sendMessage);
      feedback.on("feedback_sent", this, this._closeChat);
    },
    _closeChat: function() {
      this._chatWindow.destroy();
      utils.set_cookie("im_livechat_session", "", -1);
    },
    _handleNotification: function(notification) {
      if (this._livechat && notification[0] === this._livechat.getUUID()) {
        if (notification[1]._type === "history_command") {
          var cookie = utils.get_cookie(LIVECHAT_COOKIE_HISTORY);
          var history = cookie ? JSON.parse(cookie) : [];
          session.rpc("/im_livechat/history", {
            pid: this._livechat.getOperatorPID()[0],
            channel_uuid: this._livechat.getUUID(),
            page_history: history
          });
        } else if (notification[1].info === "typing_status") {
          var isWebsiteUser = notification[1].is_website_user;
          if (isWebsiteUser) {
            return;
          }
          var partnerID = notification[1].partner_id;
          if (notification[1].is_typing) {
            this._livechat.registerTyping({ partnerID: partnerID });
          } else {
            this._livechat.unregisterTyping({ partnerID: partnerID });
          }
        } else {
          this._addMessage(notification[1]);
          this._renderMessages();
          if (this._chatWindow.isFolded() || !this._chatWindow.isAtBottom()) {
            this._livechat.incrementUnreadCounter();
          }
        }
      }
    },
    _loadQWebTemplate: function() {
      var xml_files = [
        "/mail/static/src/xml/abstract_thread_window.xml",
        "/mail/static/src/xml/thread.xml",
        "/im_livechat/static/src/xml/im_livechat.xml"
      ];
      var defs = _.map(xml_files, function(tmpl) {
        return session
          .rpc("/web/proxy/load", { path: tmpl })
          .then(function(xml) {
            QWeb.add_template(xml);
          });
      });
      return $.when.apply($, defs);
    },
    _openChat: _.debounce(
      function() {
        if (this._openingChat) {
          return;
        }
        var self = this;
        var cookie = utils.get_cookie("im_livechat_session");
        var def;
        this._openingChat = true;
        clearTimeout(this._autoPopupTimeout);
        if (cookie) {
          def = $.when(JSON.parse(cookie));
        } else {
          this._messages = [];
          def = session.rpc(
            "/im_livechat/get_session",
            {
              channel_id: this.options.channel_id,
              anonymous_name: this.options.default_username
            },
            { shadow: true }
          );
        }
        def
          .then(function(livechatData) {
            if (!livechatData || !livechatData.operator_pid) {
              alert(
                _t(
                  "None of our collaborators seems to be available, please try again later."
                )
              );
            } else {
              self._livechat = new WebsiteLivechat({
                parent: self,
                data: livechatData
              });
              self._openChatWindow();
              self._sendWelcomeMessage();
              self._renderMessages();
              self.call("bus_service", "addChannel", self._livechat.getUUID());
              self.call("bus_service", "startPolling");
              utils.set_cookie(
                "im_livechat_session",
                JSON.stringify(self._livechat.toData()),
                60 * 60
              );
              utils.set_cookie(
                "im_livechat_auto_popup",
                JSON.stringify(false),
                60 * 60
              );
            }
          })
          .always(function() {
            self._openingChat = false;
          });
      },
      200,
      true
    ),
    _openChatWindow: function() {
      var self = this;
      var options = {
        displayStars: false,
        placeholder: this.options.input_placeholder || ""
      };
      this._chatWindow = new WebsiteLivechatWindow(
        this,
        this._livechat,
        options
      );
      this._chatWindow.appendTo($("body")).then(function() {
        var cssProps = { bottom: 0 };
        cssProps[
          _t.database.parameters.direction === "rtl" ? "left" : "right"
        ] = 0;
        self._chatWindow.$el.css(cssProps);
        self.$el.hide();
      });
    },
    _renderMessages: function() {
      var shouldScroll =
        !this._chatWindow.isFolded() && this._chatWindow.isAtBottom();
      this._livechat.setMessages(this._messages);
      this._chatWindow.render();
      if (shouldScroll) {
        this._chatWindow.scrollToBottom();
      }
    },
    _sendMessage: function(message) {
      var self = this;
      return session
        .rpc("/mail/chat_post", {
          uuid: this._livechat.getUUID(),
          message_content: message.content
        })
        .then(function() {
          self._chatWindow.scrollToBottom();
        });
    },
    _sendWelcomeMessage: function() {
      if (this.options.default_message) {
        this._addMessage(
          {
            id: "_welcome",
            attachment_ids: [],
            author_id: this._livechat.getOperatorPID(),
            body: this.options.default_message,
            channel_ids: [this._livechat.getID()],
            date: time.datetime_to_str(new Date()),
            tracking_value_ids: []
          },
          { prepend: true }
        );
      }
    },
    _onCloseChatWindow: function(ev) {
      ev.stopPropagation();
      var isComposerDisabled = this._chatWindow
        .$(".o_thread_composer input")
        .prop("disabled");
      var shouldAskFeedback =
        !isComposerDisabled &&
        _.find(this._messages, function(message) {
          return message.getID() !== "_welcome";
        });
      if (shouldAskFeedback) {
        this._chatWindow.toggleFold(false);
        this._askFeedback();
      } else {
        this._closeChat();
      }
    },
    _onNotification: function(notifications) {
      var self = this;
      _.each(notifications, function(notification) {
        self._handleNotification(notification);
      });
    },
    _onPostMessageChatWindow: function(ev) {
      ev.stopPropagation();
      var self = this;
      var messageData = ev.data.messageData;
      this._sendMessage(messageData).fail(function(error, e) {
        e.preventDefault();
        return self._sendMessage(messageData);
      });
    },
    _onSaveChatWindow: function(ev) {
      ev.stopPropagation();
      utils.set_cookie(
        "im_livechat_session",
        JSON.stringify(this._livechat.toData()),
        60 * 60
      );
    },
    _onUpdatedTypingPartners: function(ev) {
      ev.stopPropagation();
      this._chatWindow.renderTypingNotificationBar();
    },
    _onUpdatedUnreadCounter: function(ev) {
      ev.stopPropagation();
      this._chatWindow.renderHeader();
    }
  });
  var Feedback = Widget.extend({
    template: "im_livechat.FeedBack",
    events: {
      "click .o_livechat_rating_choices img": "_onClickSmiley",
      "click .o_livechat_no_feedback span": "_onClickNoFeedback",
      "click .o_rating_submit_button": "_onClickSend"
    },
    init: function(parent, livechat) {
      this._super(parent);
      this._livechat = livechat;
      this.server_origin = session.origin;
      this.rating = undefined;
      this.dp = new concurrency.DropPrevious();
    },
    _sendFeedback: function(options) {
      var self = this;
      var args = {
        uuid: this._livechat.getUUID(),
        rate: this.rating,
        reason: options.reason
      };
      this.dp.add(session.rpc("/im_livechat/feedback", args)).then(function() {
        if (options.close) {
          var emoji = RATING_TO_EMOJI[self.rating] || "??";
          var content = _.str.sprintf(_t("Rating: %s"), emoji);
          if (options.reason) {
            content += " \n" + options.reason;
          }
          self.trigger("send_message", { content: content });
          self.trigger("feedback_sent");
        }
      });
    },
    _onClickNoFeedback: function() {
      this.trigger("feedback_sent");
    },
    _onClickSend: function() {
      if (_.isNumber(this.rating)) {
        this._sendFeedback({ reason: this.$("textarea").val(), close: true });
      }
    },
    _onClickSmiley: function(ev) {
      this.rating = parseInt($(ev.currentTarget).data("value"));
      this.$(".o_livechat_rating_choices img").removeClass("selected");
      this.$(
        '.o_livechat_rating_choices img[data-value="' + this.rating + '"]'
      ).addClass("selected");
      var shouldCloseChatWindow = false;
      if (this.rating !== 10) {
        this.$(".o_livechat_rating_reason").show();
      } else {
        this.$(".o_livechat_rating_reason").hide();
        shouldCloseChatWindow = true;
      }
      this._sendFeedback({ close: shouldCloseChatWindow });
    }
  });
  return { LivechatButton: LivechatButton, Feedback: Feedback };
});

/* /mail/static/src/js/models/threads/abstract_thread.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.model.AbstractThread", function(require) {
  "use strict";
  var Class = require("web.Class");
  var Mixins = require("web.mixins");
  var AbstractThread = Class.extend(Mixins.EventDispatcherMixin, {
    init: function(params) {
      Mixins.EventDispatcherMixin.init.call(this, arguments);
      this.setParent(params.parent);
      this._folded = false;
      this._id = params.data.id;
      this._name = params.data.name;
      this._status = params.data.status || "";
      this._unreadCounter = 0;
    },
    addMessage: function(message) {
      this._addMessage.apply(this, arguments);
      this.trigger("message_added", message);
    },
    fold: function(folded) {
      this._folded = folded;
    },
    getID: function() {
      return this._id;
    },
    getMessages: function() {},
    getName: function() {
      return this._name;
    },
    getStatus: function() {
      return this._status;
    },
    getTitle: function() {
      return this.getName();
    },
    getUnreadCounter: function() {
      return this._unreadCounter;
    },
    hasMessages: function() {
      return !_.isEmpty(this.getMessages());
    },
    hasTypingNotification: function() {
      return false;
    },
    isFolded: function() {
      return this._folded;
    },
    markAsRead: function() {
      if (this._unreadCounter > 0) {
        return this._markAsRead();
      }
      return $.when();
    },
    postMessage: function() {
      return this._postMessage
        .apply(this, arguments)
        .then(this.trigger.bind(this, "message_posted"));
    },
    resetUnreadCounter: function() {
      this._unreadCounter = 0;
      this._warnUpdatedUnreadCounter();
    },
    _addMessage: function(message) {},
    _incrementUnreadCounter: function() {
      this._unreadCounter++;
    },
    _markAsRead: function() {
      this.resetUnreadCounter();
      return $.when();
    },
    _postMessage: function() {
      return $.when();
    },
    _warnUpdatedUnreadCounter: function() {}
  });
  return AbstractThread;
});

/* /im_livechat/static/src/js/models/website_livechat.js defined in bundle 'im_livechat.external_lib' */
odoo.define("im_livechat.model.WebsiteLivechat", function(require) {
  "use strict";
  var AbstractThread = require("mail.model.AbstractThread");
  var ThreadTypingMixin = require("mail.model.ThreadTypingMixin");
  var session = require("web.session");
  var WebsiteLivechat = AbstractThread.extend(ThreadTypingMixin, {
    init: function(params) {
      this._super.apply(this, arguments);
      ThreadTypingMixin.init.call(this, arguments);
      this._members = [];
      this._operatorPID = params.data.operator_pid;
      this._uuid = params.data.uuid;
      if (params.data.message_unread_counter !== undefined) {
        this._unreadCounter = params.data.message_unread_counter;
      }
      if (_.isBoolean(params.data.folded)) {
        this._folded = params.data.folded;
      } else {
        this._folded = params.data.state === "folded";
      }
      this._members.push({
        id: this._operatorPID[0],
        name: this._operatorPID[1]
      });
    },
    getMessages: function() {
      return this._messages;
    },
    getOperatorPID: function() {
      return this._operatorPID;
    },
    getUUID: function() {
      return this._uuid;
    },
    incrementUnreadCounter: function() {
      this._incrementUnreadCounter();
    },
    setMessages: function(messages) {
      this._messages = messages;
    },
    toData: function() {
      return {
        folded: this.isFolded(),
        id: this.getID(),
        message_unread_counter: this.getUnreadCounter(),
        operator_pid: this.getOperatorPID(),
        name: this.getName(),
        uuid: this.getUUID()
      };
    },
    _isTypingMyselfInfo: function(params) {
      return params.isWebsiteUser;
    },
    _notifyMyselfTyping: function(params) {
      return session.rpc(
        "/im_livechat/notify_typing",
        { uuid: this.getUUID(), is_typing: params.typing },
        { shadow: true }
      );
    },
    _warnUpdatedTypingPartners: function() {
      this.trigger_up("updated_typing_partners");
    },
    _warnUpdatedUnreadCounter: function() {
      this.trigger_up("updated_unread_counter");
    },
    _onTypingMessageAdded: function(message) {
      var operatorID = this.getOperatorPID()[0];
      if (message.hasAuthor() && message.getAuthorID() === operatorID) {
        this.unregisterTyping({ partnerID: operatorID });
      }
    }
  });
  return WebsiteLivechat;
});

/* /mail/static/src/js/models/threads/thread_typing_mixin/thread_typing_mixin.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.model.ThreadTypingMixin", function(require) {
  "use strict";
  var CCThrottleFunction = require("mail.model.CCThrottleFunction");
  var Timer = require("mail.model.Timer");
  var Timers = require("mail.model.Timers");
  var core = require("web.core");
  var _t = core._t;
  var ThreadTypingMixin = {
    _DEFAULT_TYPING_PARTNER_ID: "_default",
    _DEFAULT_TYPING_PARTNER_NAME: "Someone",
    init: function() {
      this._lastNotifiedMyselfTyping = false;
      this._myselfLongTypingTimer = new Timer({
        duration: 50 * 1000,
        onTimeout: this._onMyselfLongTypingTimeout.bind(this)
      });
      this._myselfTypingInactivityTimer = new Timer({
        duration: 5 * 1000,
        onTimeout: this._onMyselfTypingInactivityTimeout.bind(this)
      });
      this._othersTypingTimers = new Timers({
        duration: 60 * 1000,
        onTimeout: this._onOthersTypingTimeout.bind(this)
      });
      this._throttleNotifyMyselfTyping = CCThrottleFunction({
        duration: 2.5 * 1000,
        func: this._onNotifyMyselfTyping.bind(this)
      });
      this._typingPartnerIDs = [];
      this.on("message_added", this, this._onTypingMessageAdded);
      this.on("message_posted", this, this._onTypingMessagePosted);
    },
    getTypingMembersToText: function() {
      var typingPartnerIDs = this._typingPartnerIDs;
      var typingMembers = _.filter(this._members, function(member) {
        return _.contains(typingPartnerIDs, member.id);
      });
      var sortedTypingMembers = _.sortBy(typingMembers, function(member) {
        return _.indexOf(typingPartnerIDs, member.id);
      });
      var displayableTypingMembers = sortedTypingMembers.slice(0, 3);
      if (displayableTypingMembers.length === 0) {
        return "";
      } else if (displayableTypingMembers.length === 1) {
        return _.str.sprintf(
          _t("%s is typing..."),
          displayableTypingMembers[0].name
        );
      } else if (displayableTypingMembers.length === 2) {
        return _.str.sprintf(
          _t("%s and %s are typing..."),
          displayableTypingMembers[0].name,
          displayableTypingMembers[1].name
        );
      } else {
        return _.str.sprintf(
          _t("%s, %s and more are typing..."),
          displayableTypingMembers[0].name,
          displayableTypingMembers[1].name
        );
      }
    },
    hasTypingNotification: function() {
      return true;
    },
    registerTyping: function(params) {
      if (this._isTypingMyselfInfo(params)) {
        return;
      }
      this._othersTypingTimers.registerTimer({
        timeoutCallbackArguments: [params.partnerID],
        timerID: params.partnerID
      });
      this._typingPartnerIDs.push(params.partnerID);
      this._warnUpdatedTypingPartners();
    },
    setMyselfTyping: function(params) {
      var typing = params.typing;
      if (this._lastNotifiedMyselfTyping === typing) {
        this._throttleNotifyMyselfTyping.cancel();
      } else {
        this._throttleNotifyMyselfTyping(params);
      }
      if (typing) {
        this._myselfTypingInactivityTimer.reset();
      } else {
        this._myselfTypingInactivityTimer.clear();
      }
    },
    unregisterTyping: function(params) {
      var partnerID = params.partnerID;
      this._othersTypingTimers.unregisterTimer({ timerID: partnerID });
      this._typingPartnerIDs = _.reject(this._typingPartnerIDs, function(id) {
        return id === partnerID;
      });
      this._warnUpdatedTypingPartners();
    },
    _isTypingMyselfInfo: function(params) {
      return false;
    },
    _notifyMyselfTyping: function(params) {
      return $.when();
    },
    _warnUpdatedTypingPartners: function() {},
    _onMyselfLongTypingTimeout: function() {
      this._throttleNotifyMyselfTyping.clear();
      this._throttleNotifyMyselfTyping({ typing: true });
    },
    _onMyselfTypingInactivityTimeout: function() {
      this._throttleNotifyMyselfTyping.clear();
      this._throttleNotifyMyselfTyping({ typing: false });
    },
    _onNotifyMyselfTyping: function(params) {
      var typing = params.typing;
      this._lastNotifiedMyselfTyping = typing;
      this._notifyMyselfTyping(params);
      if (typing) {
        this._myselfLongTypingTimer.reset();
      } else {
        this._myselfLongTypingTimer.clear();
      }
    },
    _onOthersTypingTimeout: function(partnerID) {
      this.unregisterTyping({ partnerID: partnerID });
    },
    _onTypingMessageAdded: function(message) {
      var partnerID = message.hasAuthor()
        ? message.getAuthorID()
        : this._DEFAULT_TYPING_PARTNER_ID;
      this.unregisterTyping({ partnerID: partnerID });
    },
    _onTypingMessagePosted: function() {
      this._lastNotifiedMyselfTyping = false;
      this._throttleNotifyMyselfTyping.clear();
      this._myselfLongTypingTimer.clear();
      this._myselfTypingInactivityTimer.clear();
    }
  };
  return ThreadTypingMixin;
});

/* /mail/static/src/js/models/threads/thread_typing_mixin/timer.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.model.Timer", function(require) {
  "use strict";
  var Class = require("web.Class");
  var Timer = Class.extend({
    init: function(params) {
      this._duration = params.duration;
      this._timeout = undefined;
      this._timeoutCallback = params.onTimeout;
    },
    clear: function() {
      clearTimeout(this._timeout);
    },
    reset: function() {
      this.clear();
      this.start();
    },
    start: function() {
      this._timeout = setTimeout(this._onTimeout.bind(this), this._duration);
    },
    _onTimeout: function() {
      this._timeoutCallback();
    }
  });
  return Timer;
});

/* /mail/static/src/js/models/threads/thread_typing_mixin/timers.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.model.Timers", function(require) {
  "use strict";
  var Timer = require("mail.model.Timer");
  var Class = require("web.Class");
  var Timers = Class.extend({
    init: function(params) {
      this._duration = params.duration;
      this._timeoutCallback = params.onTimeout;
      this._timers = {};
    },
    registerTimer: function(params) {
      var timerID = params.timerID;
      if (this._timers[timerID]) {
        this._timers[timerID].clear();
      }
      var timerParams = {
        duration: this._duration,
        onTimeout: this._timeoutCallback
      };
      if ("timeoutCallbackArguments" in params) {
        timerParams.onTimeout = this._timeoutCallback.bind.apply(
          this._timeoutCallback,
          [null].concat(params.timeoutCallbackArguments)
        );
      } else {
        timerParams.onTimeout = this._timeoutCallback;
      }
      this._timers[timerID] = new Timer(timerParams);
      this._timers[timerID].start();
    },
    unregisterTimer: function(params) {
      var timerID = params.timerID;
      if (this._timers[timerID]) {
        this._timers[timerID].clear();
        delete this._timers[timerID];
      }
    }
  });
  return Timers;
});

/* /mail/static/src/js/models/threads/thread_typing_mixin/cc_throttle_function.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.model.CCThrottleFunctionObject", function(require) {
  "use strict";
  var Class = require("web.Class");
  var CCThrottleFunctionObject = Class.extend({
    init: function(params) {
      this._arguments = undefined;
      this._cooldownTimeout = undefined;
      this._duration = params.duration;
      this._func = params.func;
      this._shouldCallFunctionAfterCD = false;
    },
    cancel: function() {
      this._arguments = undefined;
      this._shouldCallFunctionAfterCD = false;
    },
    clear: function() {
      if (this._cooldownTimeout) {
        clearTimeout(this._cooldownTimeout);
        this._onCooldownTimeout();
      }
    },
    do: function() {
      this._arguments = Array.prototype.slice.call(arguments);
      if (this._cooldownTimeout === undefined) {
        this._callFunction();
      } else {
        this._shouldCallFunctionAfterCD = true;
      }
    },
    _callFunction: function() {
      this._func.apply(null, this._arguments);
      this._cooldown();
    },
    _cooldown: function() {
      this.cancel();
      this._cooldownTimeout = setTimeout(
        this._onCooldownTimeout.bind(this),
        this._duration
      );
    },
    _onCooldownTimeout: function() {
      if (this._shouldCallFunctionAfterCD) {
        this._callFunction();
      } else {
        this._cooldownTimeout = undefined;
      }
    }
  });
  return CCThrottleFunctionObject;
});
odoo.define("mail.model.CCThrottleFunction", function(require) {
  "use strict";
  var CCThrottleFunctionObject = require("mail.model.CCThrottleFunctionObject");
  var CCThrottleFunction = function(params) {
    var duration = params.duration;
    var func = params.func;
    var throttleFunctionObject = new CCThrottleFunctionObject({
      duration: duration,
      func: func
    });
    var callable = function() {
      return throttleFunctionObject.do.apply(throttleFunctionObject, arguments);
    };
    callable.cancel = function() {
      throttleFunctionObject.cancel();
    };
    callable.clear = function() {
      throttleFunctionObject.clear();
    };
    return callable;
  };
  return CCThrottleFunction;
});

/* /mail/static/src/js/models/messages/abstract_message.js defined in bundle 'im_livechat.external_lib' */
odoo.define("mail.model.AbstractMessage", function(require) {
  "use strict";
  var mailUtils = require("mail.utils");
  var Class = require("web.Class");
  var core = require("web.core");
  var session = require("web.session");
  var time = require("web.time");
  var _t = core._t;
  var AbstractMessage = Class.extend({
    init: function(parent, data) {
      this._attachmentIDs = data.attachment_ids || [];
      this._body = data.body || "";
      this._date = data.date
        ? moment(time.str_to_datetime(data.date))
        : moment();
      this._id = data.id;
      this._isDiscussion = data.is_discussion;
      this._isNotification = data.is_notification;
      this._serverAuthorID = data.author_id;
      this._type = data.message_type || undefined;
      this._processAttachmentURL();
      this._attachmentIDs.forEach(function(attachment) {
        attachment.filename =
          attachment.filename || attachment.name || _t("unnamed");
      });
    },
    getAttachments: function() {
      return this._attachmentIDs;
    },
    getAuthorID: function() {
      if (!this.hasAuthor()) {
        return -1;
      }
      return this._serverAuthorID[0];
    },
    getAvatarSource: function() {},
    getBody: function() {
      return this._body;
    },
    getDate: function() {
      return this._date;
    },
    getDateDay: function() {
      var date = this.getDate().format("YYYY-MM-DD");
      if (date === moment().format("YYYY-MM-DD")) {
        return _t("Today");
      } else if (
        date ===
        moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      ) {
        return _t("Yesterday");
      }
      return this.getDate().format("LL");
    },
    getDisplayedAuthor: function() {
      return this.hasAuthor() ? this._getAuthorName() : null;
    },
    getID: function() {
      return this._id;
    },
    getImageAttachments: function() {
      return _.filter(this.getAttachments(), function(attachment) {
        return (
          attachment.mimetype && attachment.mimetype.split("/")[0] === "image"
        );
      });
    },
    getNonImageAttachments: function() {
      return _.difference(this.getAttachments(), this.getImageAttachments());
    },
    getTimeElapsed: function() {
      return mailUtils.timeFromNow(this.getDate());
    },
    getType: function() {
      return this._type;
    },
    hasAttachments: function() {
      return this.getAttachments().length > 0;
    },
    hasAuthor: function() {
      return !!(this._serverAuthorID && this._serverAuthorID[0]);
    },
    hasCustomerEmailData: function() {
      return false;
    },
    hasEmailFrom: function() {
      return false;
    },
    hasImageAttachments: function() {
      return _.some(this.getAttachments(), function(attachment) {
        return (
          attachment.mimetype && attachment.mimetype.split("/")[0] === "image"
        );
      });
    },
    hasNonImageAttachments: function() {
      return _.some(this.getAttachments(), function(attachment) {
        return !(
          attachment.mimetype && attachment.mimetype.split("/")[0] === "image"
        );
      });
    },
    originatesFromChannel: function() {
      return false;
    },
    hasSubject: function() {
      return false;
    },
    hasSubtypeDescription: function() {
      return false;
    },
    hasTrackingValues: function() {
      return false;
    },
    isDiscussion: function() {
      return this._isDiscussion;
    },
    isLinkedToDocumentThread: function() {
      return false;
    },
    isNeedaction: function() {
      return false;
    },
    isNote: function() {
      return this._isNote;
    },
    isNotification: function() {
      return this._isNotification;
    },
    isStarred: function() {
      return false;
    },
    isSystemNotification: function() {
      return false;
    },
    needsModeration: function() {
      return false;
    },
    removeAttachments: function(attachmentIDs) {
      this._attachmentIDs = _.reject(this._attachmentIDs, function(attachment) {
        return _.contains(attachmentIDs, attachment.id);
      });
    },
    shouldRedirectToAuthor: function() {
      return !this._isMyselfAuthor();
    },
    _getAuthorName: function() {
      if (!this.hasAuthor()) {
        return "";
      }
      return this._serverAuthorID[1];
    },
    _isMyselfAuthor: function() {
      return this.hasAuthor() && this.getAuthorID() === session.partner_id;
    },
    _processAttachmentURL: function() {
      _.each(this.getAttachments(), function(attachment) {
        attachment.url = "/web/content/" + attachment.id + "?download=true";
      });
    }
  });
  return AbstractMessage;
});

/* /im_livechat/static/src/js/models/website_livechat_message.js defined in bundle 'im_livechat.external_lib' */
odoo.define("im_livechat.model.WebsiteLivechatMessage", function(require) {
  "use strict";
  var AbstractMessage = require("mail.model.AbstractMessage");
  var WebsiteLivechatMessage = AbstractMessage.extend({
    init: function(parent, data, options) {
      this._super.apply(this, arguments);
      this._defaultUsername = options.default_username;
      this._serverURL = options.serverURL;
    },
    getAvatarSource: function() {
      var source = this._serverURL;
      if (this.hasAuthor()) {
        source +=
          "/web/image/res.partner/" + this.getAuthorID() + "/image_small";
      } else {
        source += "/mail/static/src/img/smiley/avatar.jpg";
      }
      return source;
    },
    getDisplayedAuthor: function() {
      return this._super.apply(this, arguments) || this._defaultUsername;
    }
  });
  return WebsiteLivechatMessage;
});
