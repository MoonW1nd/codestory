#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import yargs from 'yargs';
import {cosmiconfigSync} from 'cosmiconfig';
import {gitlogPromise} from 'gitlog';

import {TICKET_NAME_REGEXP, TAB, DEFAULT_SINCE_PARAMS} from './constants';
import {GitLogCommit, GitlogOptions} from './types/gitlog';
import {
    BranchInfo,
    runCommand,
    renderLineWithTitle,
    chalkUrl,
    getRepositoryUrl,
    getBranchInfoByCommitHash,
    getUserName,
} from './helpers';

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

type Commit = GitLogCommit & {branchInfo: BranchInfo};

interface Branch {
    name: string;
    commits: string[];
    remoteName?: string;
    repositoryUrl?: string;
}

interface BranchCollection {
    [index: string]: Branch;
}

interface CommitCollection {
    [index: string]: Commit;
}

const ensureCommitsInfo = async (commits: GitLogCommit[], options: GitlogOptions): Promise<Commit[]> => {
    const nameRevsP = commits.map((commit) => getBranchInfoByCommitHash(commit.hash, options));
    const nameRevs = await Promise.all(nameRevsP);

    return commits.map((commit, i) => ({
        ...commit,
        branchInfo: nameRevs[i],
    }));
};

const ensureBranchInfo = async (
    branchCollection: BranchCollection,
    repositoryUrl: string,
): Promise<BranchCollection> => {
    const branchNames = Object.keys(branchCollection);
    const remoteNames = await Promise.all(
        branchNames.map((branchName) => runCommand(`git config --get branch.${branchName}.merge`)),
    );

    branchNames.map((branchName, i) => {
        const remoteBranchName = remoteNames[i].replace(/^refs\/heads\//gi, '').trim();

        if (remoteBranchName) {
            branchCollection[branchName].remoteName = remoteBranchName;
            branchCollection[branchName].repositoryUrl = `${repositoryUrl}/${
                branchName === 'master' ? 'tree' : 'pull'
            }/${remoteBranchName}`;
        }
    });

    return branchCollection;
};

const getLog = async (): Promise<void> => {
    const {author, trackerUrl, showFiles} = options;

    if (!author) {
        gitLogOptions.author = await getUserName();
    }

    const commits = await gitlogPromise(gitLogOptions);
    const repositoryUrl = await getRepositoryUrl();

    const ensuredCommits = await ensureCommitsInfo(commits, gitLogOptions);

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

    await ensureBranchInfo(branches, repositoryUrl);

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
            const commit = commitCollection[commitHash];

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
