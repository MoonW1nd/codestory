import {runCommand} from '../runCommand';
import {CommandResultCode} from 'src/constants';

/**
 * Get git repository user name from config
 */
const getUserName = async (): Promise<string> => {
    const author = await runCommand(`git config --get user.name`);

    if (author.code === CommandResultCode.Success) {
        return author.result.trim();
    }

    return 'Not detected user name';
};

export default getUserName;
