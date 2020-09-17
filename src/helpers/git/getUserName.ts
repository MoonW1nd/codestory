import {runCommand} from '../runCommand';

/**
 * Get git repository user name from config
 */
const getUserName = async (): Promise<string> => {
    const author = await runCommand(`git config --get user.name`);

    return author.trim();
};

export default getUserName;
