"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalkUrl = exports.renderLineWithTitle = void 0;
var chalk_1 = __importDefault(require("chalk"));
exports.renderLineWithTitle = function (title, value) {
    if (value === void 0) { value = ''; }
    console.log(chalk_1.default.cyan(title.toUpperCase()) + ": " + value);
};
exports.chalkUrl = function (url) { return chalk_1.default.blue(url); };
