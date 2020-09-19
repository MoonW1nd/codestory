import yargs from 'yargs';

import {UserOptions} from '@project-types/options';

const getOptionsFromArguments = (): UserOptions => {
    return yargs.options({
        since: {type: 'string'},
        trackerUrl: {type: 'string'},
        author: {type: 'string'},
        committer: {type: 'string'},
        showCommitFiles: {type: 'boolean'},
    }).argv;
};

export default getOptionsFromArguments;
