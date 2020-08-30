#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import {GitlogOptions, gitlogPromise} from 'gitlog';
import {getBranchInfoFromNameRev, BranchInfo, runCommand} from './helpers';

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

interface Branch {
    name: string;
    commits: string[];
    remoteName?: string;
}

interface BranchCollection {
    [index: string]: Branch;
}

interface CommitCollection {
    [index: string]: Commit;
}

const ensureCommitsInfo = async (commits: GitLogCommit[]): Promise<Commit[]> => {
    const nameRevsP = commits.map((commit) => runCommand(`git name-rev ${commit.hash}`));
    const nameRevs = await Promise.all(nameRevsP);

    return commits.map((commit, i) => ({
        ...commit,
        branchInfo: getBranchInfoFromNameRev(nameRevs[i]),
    }));
};

const ensureBranchInfo = async (branchCollection: BranchCollection): Promise<BranchCollection> => {
    const branchNames = Object.keys(branchCollection);
    const remoteNames = await Promise.all(
        branchNames.map((branchName) => runCommand(`git config --get branch.${branchName}.merge`)),
    );

    branchNames.map((branchName, i) => {
        branchCollection[branchName].remoteName = remoteNames[i];
    });

    return branchCollection;
};

const getLog = async (): Promise<void> => {
    const commits = await gitlogPromise(options);

    const ensuredCommits = await ensureCommitsInfo(commits);

    const branches: BranchCollection = {};
    const commitCollection: CommitCollection = {};

    ensuredCommits.forEach((commit) => {
        const branchName = commit.branchInfo.name;

        commitCollection[commit.hash] = commit;

        if (branches[branchName] !== undefined) {
            branches[branchName].commits.push(commit.hash);
        } else {
            branches[branchName] = {
                name: branchName,
                commits: [commit.hash],
            };
        }
    });

    await ensureBranchInfo(branches);

    const branchNames = Object.keys(branches);

    branchNames.map((branchName) => {
        console.log(chalk.magenta.bold(branchName));

        branches[branchName].commits.map((commitHash) => {
            const commit = commitCollection[commitHash];

            console.log(`${chalk.dim.white(commit.authorDate.split(' ')[0])} ${chalk.bold.white(commit.subject)}`);

            commit.files.map((file, i) => {
                const status = commit.status[i];

                switch (status) {
                    case 'M':
                        console.log(chalk.yellow(`  M ${file}`));
                        break;
                    case 'D':
                        console.log(chalk.red(`  D ${file}`));
                        break;
                    case 'A':
                        console.log(chalk.green(`  A ${file}`));
                        break;
                }
            });
        });
    });
};

getLog();
