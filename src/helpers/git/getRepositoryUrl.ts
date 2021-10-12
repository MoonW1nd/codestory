import {Url} from '@project-types/aliases';

import {executeCommand} from '../runCommand';

/**
 * Получение url текущего репозитория
 */
const getRepositoryUrl = async (): Promise<Url> => {
    const gitRepositoryUrl = await executeCommand(
        "git config --get remote.origin.url | sed -E -e 's+https://|http://|^git@|.git$++g' | sed 's+:+/+g' | sed 's+^+http://+'",
    );

    return gitRepositoryUrl.replace(/\.git/gi, '').trim();
};

export default getRepositoryUrl;
