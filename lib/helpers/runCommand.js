"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
var child_process_1 = require("child_process");
/**
 * Run command with text output in terminal
 */
exports.runCommand = function (command, options) {
    var _a = command.split(' '), commandName = _a[0], args = _a.slice(1);
    return new Promise(function (resolve, reject) {
        var spawnCommand = child_process_1.spawn(commandName, args, options);
        var result = '';
        spawnCommand.stdout.on('data', function (data) {
            result += data.toString();
        });
        spawnCommand.on('error', function (error) {
            console.log('error', error);
            reject(error);
        });
        spawnCommand.on('close', function (code) {
            resolve(result);
            return code;
        });
    });
};
