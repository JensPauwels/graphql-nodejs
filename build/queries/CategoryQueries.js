"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_TODO = exports.GET_BY_ID = exports.GET_ALL_CATEGORIES = void 0;
var graphql_1 = require("graphql");
var types_1 = require("../types");
var db_1 = require("../db/");
var Category_1 = __importDefault(require("../models/Category"));
exports.GET_ALL_CATEGORIES = {
    description: 'List of all the categories',
    type: new graphql_1.GraphQLList(types_1.CategoryType),
    resolve: function (_, _1, context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db_1.CategoryDao.getAll(context.token.authorID)];
            });
        });
    },
};
exports.GET_BY_ID = {
    description: 'Get category by ID',
    type: types_1.CategoryType,
    args: {
        id: { type: graphql_1.GraphQLString },
    },
    resolve: function (_, _a, context) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        category = new Category_1.default({
                            id: id,
                            author_id: context.token.authorID,
                        });
                        return [4 /*yield*/, db_1.CategoryDao.getById(category)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, category];
                }
            });
        });
    },
};
exports.UPDATE_TODO = {
    type: types_1.CategoryType,
    args: {
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    },
    resolve: function (_, _a) {
        var id = _a.id, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        category = new Category_1.default({
                            id: id,
                            name: name,
                        });
                        return [4 /*yield*/, db_1.CategoryDao.getById(category)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, db_1.CategoryDao.updateCategory(category)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, category];
                }
            });
        });
    },
};
