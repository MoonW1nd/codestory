#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import {spawn} from 'child_process';
import {GitlogOptions, gitlogPromise} from 'gitlog';
import {getBranchInfoFromNameRev, BranchInfo} from './helpers';

clear();
console.log(chalk.red(figlet.textSync('code story', {horizontalLayout: 'full'})));

const argv = yargs.options({
    since: {type: 'string'},
}).argv;

const options: GitlogOptions<'authorDate' | 'subject' | 'hash'> = {
    repo: process.cwd(),
    author: 'Alexander Ivankov',
    number: 50,
    fields: ['authorDate', 'subject', 'hash'],
    execOptions: {maxBuffer: 1000 * 1024},
    since: argv.since,
    all: true,
};

type GitLogCommit = Record<'authorDate' | 'subject' | 'hash' | 'status', string> & {files: string[]};
type Commit = GitLogCommit & {branchInfo: BranchInfo};

const addCommitBranchInfoP = (commit: GitLogCommit): Promise<Commit> => {
    return new Promise((resolve, reject) => {
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
                branchInfo: getBranchInfoFromNameRev(revNameResult),
            });

            return code;
        });
    });
};

const ensureCommitsInfo = async (commits: GitLogCommit[]): Promise<Commit[]> => {
    const commitsP = commits.map(addCommitBranchInfoP);

    return await Promise.all(commitsP);
};

const getLog = async (): Promise<void> => {
    const commits = await gitlogPromise(options);

    const ensuredCommits = await ensureCommitsInfo(commits);

    console.log(ensuredCommits);
};

getLog();
