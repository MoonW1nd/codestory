import {runCommand} from '../runCommand';
import {Url} from '../../types/main';

/**
 * Получение url текущего репозитория
 */
const getRepositoryUrl = async (): Promise<Url> => {
    const gitRepositoryUrl = await runCommand('git config --get remote.origin.url');

    return gitRepositoryUrl.replace(/\.git/gi, '').trim();
};

export default getRepositoryUrl;
