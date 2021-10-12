import {runCommand} from '../runCommand';
import {CommandResultCode} from 'src/constants';

/**
 * Get git repository name
 */
const getRepositoryName = async (): Promise<string> => {
    const pathToRepo = await runCommand(`git rev-parse --show-toplevel`);

    if (pathToRepo.code === CommandResultCode.Success) {
        const repoName = await runCommand(`basename ${pathToRepo.result}`);

        if (repoName.code === CommandResultCode.Success) {
            return repoName.result.trim();
        }
    }

    /**
     * TODO [MoonW1nd]: add debug loging
     */
    return 'Not detected repository name';
};

export default getRepositoryName;
