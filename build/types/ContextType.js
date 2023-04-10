"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var middleware_1 = require("../middleware/");
var ContextType = /** @class */ (function () {
    function ContextType(data) {
        var _a;
        this.token = (_a = data === null || data === void 0 ? void 0 : data.token) !== null && _a !== void 0 ? _a : new middleware_1.Token();
    }
    return ContextType;
}());
exports.default = ContextType;
