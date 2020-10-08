import {runCommand} from '../runCommand';

/**
 * Get git repository name
 */
const getRepositoryName = async (): Promise<string> => {
    const pathToRepo = await runCommand(`git rev-parse --show-toplevel`);
    const repoName = await runCommand(`basename ${pathToRepo}`);

    return repoName.trim();
};

export default getRepositoryName;
