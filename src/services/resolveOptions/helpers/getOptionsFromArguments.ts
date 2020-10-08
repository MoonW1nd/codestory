import yargs from 'yargs';

import {UserOptions, CliHeader} from '@project-types/options';

const headerTypes: ReadonlyArray<CliHeader> = ['full', 'minimal', 'off'];

const getOptionsFromArguments = (): UserOptions => {
    return yargs
        .scriptName('codestory')
        .usage('Syntax: $0 [options]')
        .example('$0 --since 3.day.ago', 'Get commit story by 3 last day')
        .options({
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
                describe: 'Show files changed in commits.',
            },
            clearConsole: {
                type: 'boolean',
                describe: 'Clear console before out info',
            },
        })
        .option('header', {choices: headerTypes, describe: 'Cli header type'})
        .help('h')
        .alias('h', 'help')
        .wrap(yargs.terminalWidth()).argv;
};

export default getOptionsFromArguments;
