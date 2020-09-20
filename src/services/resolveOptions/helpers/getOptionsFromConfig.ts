import {cosmiconfigSync} from 'cosmiconfig';

import {UserOptions} from '@project-types/options';

const getOptionsFromConfig = (): UserOptions => {
    /**
     * Search configuration files
     */
    const explorerSync = cosmiconfigSync('codestory');
    const explorerResult = explorerSync.search();

    const config = explorerResult ? explorerResult.config : {};

    return config;
};

export default getOptionsFromConfig;
