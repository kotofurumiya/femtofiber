"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatter_1 = require("./formatter");
/**
 * An object representing date.
 *
 * `Femto` is a core class of femtofiber, which represents date.
 *
 * You can create a `Femto` object in several ways.
 *
 *     const femto1 = new Femto(2018, 6, 22);                  // from number
 *     const femto2 = new Femto(2018, 6, 22, 21, 54, 31, 500); // from numbers with time
 *     const femto3 = Femto.fromDate(new Date());              // from Date
 *     const femto4 = Femto.now();                             // from current date
 *     const femto5 = Femto.fromEpochTime(1529590253022);      // from epoch time
 *
 * A `Femto` object is immutable, so once created, its value does not change.
 *
 * To get values, use properties.
 *
 *     const femto = Femto.now();
 *     console.log(femto.year);
 *     console.log(femto.month); // January is 1, and December is 12
 *     console.log(femto.day);
 *     console.log(femto.hour);
 *     console.log(femto.minute);
 *     console.log(femto.second);
 *     console.log(femto.millisecond);
 *
 * A `Femto` object also can output formatted string.
 *
 *     const femto = Femto.now();
 *     console.log(femto.toFormatString('YYYY/MM/DD'));   // "2018/06/22"
 *     console.log(femto.toFormatString('HH:mm:ss:SSS')); // "18:23:27:758"
 *
 * A `Femto` object has manipulating methods. You can manipulate date with [[Duration]] objects.
 *
 *     const tomorrow = Femto.now().add(new Duration({days: 1}));
 *     const yesterday = Femto.now().sub(new Duration({days: 1}));
 *
 * You can also compare two Femtos.
 *
 *     const current = 1529665309363;
 *     const femto1 = Femto.fromEpochTime(current);
 *     const femto2 = Femto.fromEpochTime(current);
 *
 *     // These methods returns boolean.
 *     femto1.isSame(femto2);
 *     femto1.isBefore(femto2);
 *     femto1.isAfter(femto2);
 *     femto1.isSameOrBefore(femto2);
 *     femto1.isSameOrAfter(femto2);
 *
 *     Femto.now().isBetween(femto1, femto2);
 *     Femto.now().isBetween(femto1, femto2, {
 *       includesFrom: true,
 *       includesTo: true
 *     });
 */
var Femto = /** @class */ (function () {
    function Femto(year, month, day, hour, minutes, seconds, milliseconds) {
        if (day === void 0) { day = 1; }
        if (hour === void 0) { hour = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (milliseconds === void 0) { milliseconds = 0; }
        this._date = new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
        this._formatter = new formatter_1.FemtoFormatter();
    }
    /**
     * Returns a `Femto` object created by `date`.
     * @param {Date} date
     * @returns {Femto}
     */
    Femto.fromDate = function (date) {
        return new Femto(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };
    /**
     * Returns a `Femto` object which represents current time.
     * @returns {Femto}
     */
    Femto.now = function () {
        return Femto.fromDate(new Date());
    };
    /**
     * Returns a `Femto` object created from `epoch` time.
     * @param {number} epoch Milliseconds since January 1, 1970, 00:00:00 UTC.
     * @returns {Femto}
     */
    Femto.fromEpochTime = function (epoch) {
        return Femto.fromDate(new Date(epoch));
    };
    /**
     * Returns new `Femto` object which is `duration` ahead of this `Femto`.
     * @param {Duration} duration
     * @returns {Femto}
     */
    Femto.prototype.add = function (duration) {
        var date = new Date(this.toEpochTime() + duration.toMilliseconds());
        return Femto.fromDate(date);
    };
    /**
     * Returns new `Femto` object which is `duration` behind of this `Femto`.
     * @param {Duration} duration
     * @returns {Femto}
     */
    Femto.prototype.sub = function (duration) {
        var date = new Date(this.toEpochTime() - duration.toMilliseconds());
        return Femto.fromDate(date);
    };
    /**
     * Returns `true` if this `Femto` and `other` `Femto` have completely same value.
     * Otherwise `false`.
     * @param {Femto} other
     * @returns {boolean}
     */
    Femto.prototype.isSame = function (other) {
        return this.toEpochTime() === other.toEpochTime();
    };
    /**
     * Returns `true` if this `Femto` is before `other` Femto.
     * Otherwise false.
     *
     * ** Note: ** This method returns `false` if two Femtos have same value.
     * If you want `true` when two Femtos have same value, use `isSameOrBefore`.
     * @param {Femto} other
     * @returns {boolean}
     */
    Femto.prototype.isBefore = function (other) {
        return this.toEpochTime() < other.toEpochTime();
    };
    /**
     * Returns `true` if this `Femto` is after `other` Femto.
     * Otherwise false.
     *
     * ** Note: ** This method returns `false` if two Femtos have same value.
     * If you want `true` when two Femtos have same value, use `isSameOrAfter`.
     * @param {Femto} other
     * @returns {boolean}
     */
    Femto.prototype.isAfter = function (other) {
        return this.toEpochTime() > other.toEpochTime();
    };
    /**
     * Returns `true` if this `Femto` is same or before `other` Femto.
     * Otherwise `false`.
     * @param {Femto} other
     * @returns {boolean}
     */
    Femto.prototype.isSameOrBefore = function (other) {
        return this.toEpochTime() <= other.toEpochTime();
    };
    /**
     * Returns `true` if this `Femto` is same or after `other` Femto.
     * Otherwise `false`.
     * @param {Femto} other
     * @returns {boolean}
     */
    Femto.prototype.isSameOrAfter = function (other) {
        return this.toEpochTime() >= other.toEpochTime();
    };
    /**
     * Returns `true` if this `Femto` is between `from` and `to'.
     * Otherwise `false`.
     *
     * By default, this method returns `false` if this `Femto` and `from`(or `to`) are same.
     * If you want this method to include `from` or `to`, set `options` argument as follows:
     *
     *     femto.isBetween(from, to, {
     *       includesFrom: true,
     *       includesTo: true
     *     });
     * @param {Femto} from
     * @param {Femto} to
     * @param {{includesFrom?: boolean; includesTo?: boolean}} options
     * @returns {boolean}
     */
    Femto.prototype.isBetween = function (from, to, options) {
        if (options === void 0) { options = {}; }
        var includesFrom = 'includesFrom' in options ? options.includesFrom : false;
        var includesTo = 'includesTo' in options ? options.includesTo : false;
        var begin = includesFrom ? this.isSameOrAfter(from) : this.isAfter(from);
        var end = includesTo ? this.isSameOrBefore(to) : this.isBefore(to);
        return begin && end;
    };
    Object.defineProperty(Femto.prototype, "year", {
        /**
         * Returns the year, according to local time.
         * @returns {number}
         */
        get: function () {
            return this._date.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Femto.prototype, "month", {
        /**
         * Returns the month beginning with 1 for January to 12 for December.
         * @returns {number}
         */
        get: function () {
            return this._date.getMonth() + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Femto.prototype, "day", {
        /**
         * Returns the day of the month.
         * @returns {number}
         */
        get: function () {
            return this._date.getDate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Femto.prototype, "hour", {
        /**
         * Returns the hour of the day, according to local time.
         * The value is from 0 to 23.
         * @returns {number}
         */
        get: function () {
            return this._date.getHours();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Femto.prototype, "minute", {
        /**
         * Returns the minute of the hour, according to local time.
         * @returns {number}
         */
        get: function () {
            return this._date.getMinutes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Femto.prototype, "second", {
        /**
         * Returns the second of the minute, according to local time.
         * @returns {number}
         */
        get: function () {
            return this._date.getSeconds();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Femto.prototype, "millisecond", {
        /**
         * Returns the millisecond of the second, according to local time.
         * @returns {number}
         */
        get: function () {
            return this._date.getMilliseconds();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a number of milliseconds since January 1, 1970, 00:00:00 UTC.
     * @returns {number}
     */
    Femto.prototype.toEpochTime = function () {
        return this._date.getTime();
    };
    /**
     * Returns `Date`.
     * @returns {Date}
     */
    Femto.prototype.toDate = function () {
        return new Date(this._date.getTime());
    };
    /**
     * Returns ISO string.
     * @returns {string}
     */
    Femto.prototype.toISOString = function () {
        return this._date.toISOString();
    };
    /**
     * Returns a string which is `template` string replaced with values.
     *
     * This method takes a template string which includes special letters called "token",
     * and replace them with their corresponding values.
     *
     * For example, token 'YYYY' will be replaced with the year value like as '2018'.
     *
     *     Femto.now().format('YYYY');                // 2018
     *     Femto.now().format('YYYY/MM/DD');          // 2018/06/22
     *     Femto.now().format('YYYY/MM/DD HH:mm:ss'); // 2018/06/22 14:32:57
     *
     * In template, you can use following tokens:
     *
     * * YYYY: year
     * * MM: month(2-digits)
     * * M: month
     * * DD: day of the month(2-digits)
     * * D: day of the month
     * * HH: hour(2-digits)
     * * H: hour
     * * mm: minute(2-digits)
     * * m: minute
     * * ss: second(2-digits)
     * * s: second
     * * SSS: millisecond(3-digits)
     * * S: millisecond
     * @param {string} template
     * @returns {string}
     */
    Femto.prototype.toFormatString = function (template) {
        return this._formatter.format(this, template);
    };
    return Femto;
}());
exports.Femto = Femto;
