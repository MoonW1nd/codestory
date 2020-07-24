#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import {spawn} from 'child_process';
import {GitlogOptions, gitlogPromise} from 'gitlog';

// clear();
console.log(chalk.red(figlet.textSync('code story', {horizontalLayout: 'full'})));

const argv = yargs.options({
    since: {type: 'string'},
}).argv;

const options: GitlogOptions<'authorDate' | 'subject' | 'hash'> = {
    repo: process.cwd(),
    author: 'Alexander Ivankov',
    fields: ['authorDate', 'subject', 'hash'],
    execOptions: {maxBuffer: 1000 * 1024},
    since: argv.since,
    all: true,
};

type Commit = Record<'authorDate' | 'subject' | 'hash' | 'status', string> & {files: string[]};

const addCommitBranchNameP = (commit: Commit) => {
    return new Promise((resolve, reject) => {
        console.log(commit.hash);

        const revNameCommand = spawn('git', ['name-rev', commit.hash]);
        let revNameResult = '';

        revNameCommand.stdout.on('data', (data) => {
            revNameResult += data.toString();
        });

        revNameCommand.on('error', (error) => {
            console.log('error', error);
            reject(error);
        });

        revNameCommand.on('close', (code) => {
            resolve({
                ...commit,
                branchName: revNameResult,
            });

            return code;
        });
    });
};

const ensureCommitsInfo = async (commits: Commit[]) => {
    const commitsP = commits.map(addCommitBranchNameP);

    return await Promise.all(commitsP);
};

const getLog = async () => {
    const commits = await gitlogPromise(options);

    const ensuredCommits = await ensureCommitsInfo(commits);

    console.log(ensuredCommits);
};

getLog();
