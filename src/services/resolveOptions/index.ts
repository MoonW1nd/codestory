import {UserOptions, Options} from '@project-types/options';
import {GitlogOptions} from '@project-types/gitlog';
import {getUserName} from 'src/helpers';
import {DEFAULT_SINCE_PARAMS} from 'src/constants';

import getOptionsFromConfig from './helpers/getOptionsFromConfig';
import getOptionsFromArguments from './helpers/getOptionsFromArguments';

const gitLogSystemOptons: GitlogOptions = {
    repo: process.cwd(),
    fields: ['authorDate', 'subject', 'hash', 'abbrevHash'],
    execOptions: {maxBuffer: 1000 * 1024},
};

const defaultOptions: UserOptions = {
    number: 999,
    clearConsole: false,
    showCommitFiles: false,
};

const resolveOptions = async (): Promise<Options> => {
    const optionsFromArguments = getOptionsFromArguments();
    const optionsFromConfig = getOptionsFromConfig();

    const options: UserOptions = {
        ...defaultOptions,
        ...optionsFromConfig,
        ...optionsFromArguments,
    };

    if (!options.author) {
        options.author = await getUserName();
    }

    const isDateRangeNotSet = !Boolean(options.after || options.before || options.since || options.until);

    if (isDateRangeNotSet) {
        options.since = DEFAULT_SINCE_PARAMS;
    }

    return {
        ...options,
        ...gitLogSystemOptons,
    };
};

export default resolveOptions;
