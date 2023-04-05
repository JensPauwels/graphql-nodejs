"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR = void 0;
exports.ERROR = {
    DB_POOL_NOT_INSTANTIATED: 'DB_POOL_NOT_INSTANTIATED',
    MISSING_RESULT: 'MISSING_RESULT'
};
var handleError = function (res, error) {
    console.log(error);
    var code = error.code;
    var message = error.message;
    if (code === undefined) {
        code = message;
    }
    switch (code) {
        case exports.ERROR.DB_POOL_NOT_INSTANTIATED:
            res.status(500).json({ error: 'DUPLICATE_ENTRY' });
            return;
        default:
            res.status(500).json({ error: code === undefined ? error.message : '' });
            return;
    }
};
exports.default = handleError;
