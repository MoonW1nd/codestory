#!/usr/bin/env node
/**
 * Don't delete! Need for resolve alises imports
 */
import 'module-alias/register';

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import {TICKET_NAME_REGEXP, TAB} from './constants';
import {renderLineWithTitle, chalkUrl} from './helpers';
import resolveGitData from './services/resolveGitData';
import {resolveOptions} from 'src/services';

const getLog = async (): Promise<void> => {
    const options = await resolveOptions();
    const {trackerUrl, showCommitFiles, clearConsole} = options;

    if (clearConsole) {
        clear();
    }

    const {commits, branches} = await resolveGitData(options);

    console.log(commits, branches);

    console.log(chalk.red(figlet.textSync('code story', {horizontalLayout: 'full'})));

    const branchNames = Object.keys(branches);
    branchNames.map((branchName, i) => {
        if (i > 0) {
            console.log('');
        }

        console.log(chalk.magenta.bold(branchName));

        const prUrl = branches[branchName].repositoryUrl;

        if (prUrl) {
            renderLineWithTitle('pr', chalkUrl(prUrl));
        }

        const [ticketName] = branchName.match(TICKET_NAME_REGEXP) || [];

        if (trackerUrl && ticketName) {
            const ticketUrl = chalkUrl(`${trackerUrl}/${ticketName}`);

            renderLineWithTitle('task', ticketUrl);
        }

        renderLineWithTitle('commits');

        branches[branchName].commits.map((commitHash) => {
            const commit = commits[commitHash];

            console.log(`${TAB}${chalk.dim(commit.authorDate.split(' ')[0])} ${chalk.white(commit.subject)}`);

            if (showCommitFiles) {
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
