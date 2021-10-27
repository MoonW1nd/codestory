import {spawn, exec, SpawnOptionsWithoutStdio} from 'child_process';
import {RunCommandResult} from '@project-types/common';
import {CommandResultCode} from 'src/constants';

/**
 * Run command with text output in terminal
 */
export const runCommand = (command: string, options?: SpawnOptionsWithoutStdio): Promise<RunCommandResult> => {
    const [commandName, ...args] = command.split(' ');

    return new Promise((resolve, reject) => {
        const spawnCommand = spawn(commandName, args, options);
        let result = '';
        let errorMessage = '';

        spawnCommand.stdout.on('data', (data) => {
            result += data.toString();
        });

        spawnCommand.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });

        spawnCommand.on('error', (error) => {
            console.log('error', error);
            reject({code: CommandResultCode.Error, error: error.message});
        });

        spawnCommand.on('close', (code) => {
            if (code) {
                resolve({code: CommandResultCode.Error, error: errorMessage});
            } else {
                resolve({code: CommandResultCode.Success, result});
            }

            return code;
        });
    });
};

export const executeCommand = (command: string): Promise<string> => {
    return new Promise(function (resolve, reject) {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    });
};
