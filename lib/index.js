#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var yargs_1 = __importDefault(require("yargs"));
var gitlog_1 = require("gitlog");
clear_1.default();
console.log(chalk_1.default.red(figlet_1.default.textSync('code story', { horizontalLayout: 'full' })));
var argv = yargs_1.default.options({
    from: { type: 'string', default: false },
}).argv;
var options = {
    repo: __dirname,
    number: 20,
    author: 'Alexander Ivankov',
    fields: ['authorDate', 'subject'],
    execOptions: { maxBuffer: 1000 * 1024 },
};
gitlog_1.gitlogPromise(options).then(function (commits) { return console.log(commits); });
