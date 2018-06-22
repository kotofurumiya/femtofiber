"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A span of time.
 *
 * To create a `Duration`, pass values to the constructor.
 *
 *     const duration1 = new Duration({days: 3, hours: 2, minutes: 10});
 *     const duration2 = new Duration({seconds: 43, milliseconds: 548});
 *     const duration3 = new Duration({days: 100, seconds: 53});
 */
var Duration = /** @class */ (function () {
    function Duration(time) {
        var daysMs = time.days ? time.days * 1000 * 60 * 60 * 24 : 0;
        var hoursMs = time.hours ? time.hours * 1000 * 60 * 60 : 0;
        var minutesMs = time.minutes ? time.minutes * 1000 * 60 : 0;
        var secondsMs = time.seconds ? time.seconds * 1000 : 0;
        var ms = time.milliseconds ? time.milliseconds : 0;
        this._durationMilliseconds = daysMs + hoursMs + minutesMs + secondsMs + ms;
    }
    /**
     * Returns duration as milliseconds.
     * @returns {number}
     */
    Duration.prototype.toMilliseconds = function () {
        return this._durationMilliseconds;
    };
    return Duration;
}());
exports.Duration = Duration;
