import yargs from 'yargs';

import {UserOptions} from '@project-types/options';

const getOptionsFromArguments = (): UserOptions => {
    return yargs.options({
        since: {
            type: 'string',
            alias: 's',
            describe: 'Show commits more recent than a specific date.',
        },
        after: {
            type: 'string',
            alias: 'a',
            describe: 'Show commits more recent than a specific date.',
        },
        until: {
            type: 'string',
            alias: 'u',
            describe: 'Show commits older than a specific date.',
        },
        before: {
            type: 'string',
            alias: 'b',
            describe: 'Show commits older than a specific date.',
        },
        trackerUrl: {
            type: 'string',
            alias: 't',
            describe: 'Base url in task tracker system.',
        },
        author: {
            type: 'string',
            describe: 'Limit the commits output to ones with author header lines that match the specified pattern.',
            default: 'Author param from git config',
        },
        branch: {
            type: 'string',
            alias: 'b',
            describe: 'Show only commits in the specified branch or revision range.',
        },
        number: {
            type: 'number',
            alias: 'n',
            describe: 'The number of commits to return',
            default: 999,
        },
        file: {
            type: 'string',
            alias: 'f',
            describe: 'File filter for the git log command',
        },
        committer: {
            type: 'string',
            describe: 'Limit the commits output to ones with author header lines that match the specified pattern.',
        },
        showCommitFiles: {
            type: 'boolean',
            alias: 'sf',
            describe: 'Show files changed in commits.',
            default: false,
        },
        clearConsole: {
            type: 'boolean',
            alias: 'cs',
            describe: 'Clear console before out info',
            default: true,
        },
    }).argv;
};

export default getOptionsFromArguments;
