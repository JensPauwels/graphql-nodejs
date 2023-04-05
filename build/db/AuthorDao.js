"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Represents a fake authors database.
var AuthorDao = /** @class */ (function () {
    function AuthorDao() {
        var _this = this;
        this.addAuthor = function (t) {
            _this.authors.push(t);
        };
        this.deleteById = function (t) {
            _this.authors = _this.authors.filter(function (_a) {
                var id = _a.id;
                return t.id !== id;
            });
        };
        this.getAll = function () {
            return _this.authors;
        };
        this.getById = function (t) {
            var author = _this.authors.find(function (_a) {
                var id = _a.id;
                return t.id === id;
            });
            if (author === undefined) {
                throw new Error("Failed to retrieve author with id ".concat(t.id));
            }
            return author;
        };
        this.authors = [];
    }
    return AuthorDao;
}());
exports.default = new AuthorDao();
