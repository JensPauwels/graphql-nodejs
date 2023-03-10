"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_AUTHORS = void 0;
var graphql_1 = require("graphql");
var types_1 = require("../types");
var dao_1 = require("../dao/");
exports.GET_ALL_AUTHORS = {
    description: 'List of all the authors',
    type: new graphql_1.GraphQLList(types_1.AuthorType),
    resolve: function () {
        return dao_1.AuthorDao.authors;
    }
};
