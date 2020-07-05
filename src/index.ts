#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import {gitlogPromise, GitlogOptions} from 'gitlog';

clear();
console.log(chalk.red(figlet.textSync('code story', {horizontalLayout: 'full'})));

const argv = yargs.options({
    from: {type: 'string', default: false},
}).argv;

const options: GitlogOptions<'authorDate' | 'subject'> = {
    repo: __dirname,
    number: 20,
    author: 'Alexander Ivankov',
    fields: ['authorDate', 'subject'],
    execOptions: {maxBuffer: 1000 * 1024},
};

gitlogPromise(options).then((commits) => console.log(commits));
