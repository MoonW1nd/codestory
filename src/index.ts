#!/usr/bin/env node
import 'module-alias/register';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import {cosmiconfigSync} from 'cosmiconfig';

import {TICKET_NAME_REGEXP, TAB, DEFAULT_SINCE_PARAMS} from './constants';
import {GitlogOptions} from './types/gitlog';
import {renderLineWithTitle, chalkUrl, getUserName} from './helpers';
import resolveGitData from './services/resolveGitData';

clear();

const argv = yargs.options({
    since: {type: 'string'},
    trackerUrl: {type: 'string'},
    author: {type: 'string'},
    showFiles: {type: 'boolean'},
}).argv;

/**
 * Search configuration files
 */
const explorerSync = cosmiconfigSync('codestory');
const explorerResult = explorerSync.search();
const config = explorerResult ? explorerResult.config : {};

const options = {
    ...config,
    ...argv,
};

const gitLogOptions: GitlogOptions = {
    repo: process.cwd(),
    author: options.author,
    number: 999,
    fields: ['authorDate', 'subject', 'hash', 'abbrevHash'],
    execOptions: {maxBuffer: 1000 * 1024},
    since: options.since || DEFAULT_SINCE_PARAMS,
    all: true,
};

const getLog = async (): Promise<void> => {
    const {author, trackerUrl, showFiles} = options;

    if (!author) {
        gitLogOptions.author = await getUserName();
    }

    const {commits, branches} = await resolveGitData(gitLogOptions);

    console.log(chalk.red(figlet.textSync('code story', {horizontalLayout: 'full'})));

    const branchNames = Object.keys(branches);
    branchNames.map((branchName, i) => {
        if (i > 0) {
            console.log('');
        }

        console.log(chalk.magenta.bold(branchName));

        const prUrl = chalkUrl(branches[branchName].repositoryUrl || 'local branch');

        renderLineWithTitle('pr', prUrl);

        const [ticketName] = branchName.match(TICKET_NAME_REGEXP) || [];

        if (trackerUrl && ticketName) {
            const ticketUrl = chalkUrl(`${trackerUrl}/${ticketName}`);

            renderLineWithTitle('task', ticketUrl);
        }

        renderLineWithTitle('commits');

        branches[branchName].commits.map((commitHash) => {
            const commit = commits[commitHash];

            console.log(`${TAB}${chalk.dim(commit.authorDate.split(' ')[0])} ${chalk.white(commit.subject)}`);

            if (showFiles) {
                commit.files.map((file, i) => {
                    const status = commit.status[i];

                    switch (status) {
                        case 'M':
                            console.log(chalk.yellow(`${TAB + TAB}M ${file}`));
                            break;
                        case 'D':
                            console.log(chalk.red(`${TAB + TAB}D ${file}`));
                            break;
                        case 'A':
                            console.log(chalk.green(`${TAB + TAB}A ${file}`));
                            break;
                    }
                });
            }
        });
    });
};

getLog();
