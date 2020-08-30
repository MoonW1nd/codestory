import {spawn, SpawnOptionsWithoutStdio} from 'child_process';

/**
 * Run command with text output in terminal
 */
export const runCommand = (command: string, options: SpawnOptionsWithoutStdio | undefined): Promise<string> => {
    const [commandName, ...args] = command.split(' ');

    return new Promise((resolve, reject) => {
        const spawnCommand = spawn(commandName, args, options);
        let result = '';

        spawnCommand.stdout.on('data', (data) => {
            result += data.toString();
        });

        spawnCommand.on('error', (error) => {
            console.log('error', error);
            reject(error);
        });

        spawnCommand.on('close', (code) => {
            resolve(result);

            return code;
        });
    });
};
