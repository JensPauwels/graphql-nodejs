"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var Bcrypt = /** @class */ (function () {
    function Bcrypt() {
        // hash hashes the given plaintext with 15 salt rounds.
        this.hash = function (plaintext) {
            return new Promise(function (resolve, reject) {
                bcrypt_1.default.hash(plaintext, 15, function (err, hash) {
                    if (err) {
                        reject(err);
                    }
                    resolve(hash);
                });
            });
        };
        // compare compares the given plain text with the given hash.
        this.isValid = function (plaintext, hash) {
            return new Promise(function (resolve, reject) {
                bcrypt_1.default.compare(plaintext, hash, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        };
    }
    return Bcrypt;
}());
exports.default = new Bcrypt();
