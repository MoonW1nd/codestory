"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranchInfoFromNameRev = void 0;
var LINE_BREAK_CHAR = '\n';
var POSITION_SEPARATOR_CHAR = '~';
var SPACE_CHAR = ' ';
/**
 * Get breach info from stdout git nave-rev command
 */
exports.getBranchInfoFromNameRev = function (nameRev) {
    var _a = nameRev.split(SPACE_CHAR), branchInfo = _a[1];
    var _b = branchInfo.replace(LINE_BREAK_CHAR, '').split(POSITION_SEPARATOR_CHAR), name = _b[0], position = _b[1];
    return {
        name: name,
        position: Number(position) || 0,
    };
};
