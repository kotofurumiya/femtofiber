"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FemtoFormatter = /** @class */ (function () {
    function FemtoFormatter() {
    }
    FemtoFormatter.prototype.format = function (femto, template) {
        return template
            .replace(/YYYY/g, femto.year.toString())
            .replace(/MM/g, femto.month.toString().padStart(2, '0'))
            .replace(/M/g, femto.month.toString())
            .replace(/DD/g, femto.day.toString().padStart(2, '0'))
            .replace(/D/g, femto.day.toString())
            .replace(/HH/g, femto.hour.toString().padStart(2, '0'))
            .replace(/H/g, femto.hour.toString())
            .replace(/mm/g, femto.minute.toString().padStart(2, '0'))
            .replace(/m/g, femto.minute.toString())
            .replace(/ss/g, femto.second.toString().padStart(2, '0'))
            .replace(/s/g, femto.second.toString())
            .replace(/SSS/g, femto.millisecond.toString().padStart(3, '0'))
            .replace(/S/g, femto.millisecond.toString());
    };
    return FemtoFormatter;
}());
exports.FemtoFormatter = FemtoFormatter;
