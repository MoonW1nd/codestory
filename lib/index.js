#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var yargs_1 = __importDefault(require("yargs"));
var gitlog_1 = require("gitlog");
var helpers_1 = require("./helpers");
clear_1.default();
console.log(chalk_1.default.red(figlet_1.default.textSync('code story', { horizontalLayout: 'full' })));
var argv = yargs_1.default.options({
    since: { type: 'string' },
    trackerUrl: { type: 'string' },
    showFiles: { type: 'boolean' },
}).argv;
var options = {
    repo: process.cwd(),
    author: 'Alexander Ivankov',
    number: 50,
    fields: ['authorDate', 'subject', 'hash'],
    execOptions: { maxBuffer: 1000 * 1024 },
    since: argv.since || '1.day.ago',
    all: true,
};
var TICKET_NAME_REGEXP = /[A-Z]{1,}-\d{1,}/g;
var TRACKER_URL = argv.trackerUrl;
var SHOW_FILES = argv.showFiles;
var TAB = '    ';
var ensureCommitsInfo = function (commits) { return __awaiter(void 0, void 0, void 0, function () {
    var nameRevsP, nameRevs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameRevsP = commits.map(function (commit) { return helpers_1.runCommand("git name-rev " + commit.hash); });
                return [4 /*yield*/, Promise.all(nameRevsP)];
            case 1:
                nameRevs = _a.sent();
                return [2 /*return*/, commits.map(function (commit, i) { return (__assign(__assign({}, commit), { branchInfo: helpers_1.getBranchInfoFromNameRev(nameRevs[i]) })); })];
        }
    });
}); };
var ensureBranchInfo = function (branchCollection, repositoryUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var branchNames, remoteNames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                branchNames = Object.keys(branchCollection);
                return [4 /*yield*/, Promise.all(branchNames.map(function (branchName) { return helpers_1.runCommand("git config --get branch." + branchName + ".merge"); }))];
            case 1:
                remoteNames = _a.sent();
                branchNames.map(function (branchName, i) {
                    var remoteBranchName = remoteNames[i].replace(/^refs\/heads\//gi, '').trim();
                    if (remoteBranchName) {
                        branchCollection[branchName].remoteName = remoteBranchName;
                        branchCollection[branchName].repositoryUrl = repositoryUrl + "/" + (branchName === 'master' ? 'tree' : 'pull') + "/" + remoteBranchName;
                    }
                });
                return [2 /*return*/, branchCollection];
        }
    });
}); };
var getRepositoryUrl = function () { return __awaiter(void 0, void 0, void 0, function () {
    var gitRepositoryUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, helpers_1.runCommand('git config --get remote.origin.url')];
            case 1:
                gitRepositoryUrl = _a.sent();
                return [2 /*return*/, gitRepositoryUrl.replace(/\.git/gi, '').trim()];
        }
    });
}); };
var getLog = function () { return __awaiter(void 0, void 0, void 0, function () {
    var commits, repositoryUrl, ensuredCommits, branches, commitCollection, branchNames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gitlog_1.gitlogPromise(options)];
            case 1:
                commits = _a.sent();
                return [4 /*yield*/, getRepositoryUrl()];
            case 2:
                repositoryUrl = _a.sent();
                return [4 /*yield*/, ensureCommitsInfo(commits)];
            case 3:
                ensuredCommits = _a.sent();
                branches = {};
                commitCollection = {};
                ensuredCommits.forEach(function (commit) {
                    var branchName = commit.branchInfo.name;
                    commitCollection[commit.hash] = commit;
                    if (branches[branchName] !== undefined) {
                        branches[branchName].commits.push(commit.hash);
                    }
                    else {
                        branches[branchName] = {
                            name: branchName,
                            commits: [commit.hash],
                        };
                    }
                });
                return [4 /*yield*/, ensureBranchInfo(branches, repositoryUrl)];
            case 4:
                _a.sent();
                branchNames = Object.keys(branches);
                branchNames.map(function (branchName, i) {
                    if (i > 0) {
                        console.log('');
                    }
                    console.log(chalk_1.default.magenta.bold(branchName));
                    var prUrl = helpers_1.chalkUrl(branches[branchName].repositoryUrl || 'local branch');
                    helpers_1.renderLineWithTitle('pr', prUrl);
                    var ticketName = (branchName.match(TICKET_NAME_REGEXP) || [])[0];
                    if (TRACKER_URL && ticketName) {
                        var ticketUrl = helpers_1.chalkUrl(TRACKER_URL + "/" + ticketName);
                        helpers_1.renderLineWithTitle('task', ticketUrl);
                    }
                    helpers_1.renderLineWithTitle('commits');
                    branches[branchName].commits.map(function (commitHash) {
                        var commit = commitCollection[commitHash];
                        console.log("" + TAB + chalk_1.default.dim(commit.authorDate.split(' ')[0]) + " " + chalk_1.default.white(commit.subject));
                        if (SHOW_FILES) {
                            commit.files.map(function (file, i) {
                                var status = commit.status[i];
                                switch (status) {
                                    case 'M':
                                        console.log(chalk_1.default.yellow(TAB + TAB + "M " + file));
                                        break;
                                    case 'D':
                                        console.log(chalk_1.default.red(TAB + TAB + "D " + file));
                                        break;
                                    case 'A':
                                        console.log(chalk_1.default.green(TAB + TAB + "A " + file));
                                        break;
                                }
                            });
                        }
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
getLog();
