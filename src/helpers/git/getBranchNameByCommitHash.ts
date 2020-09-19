import {Options} from '@project-types/options';
import {LINE_BREAK_CHAR} from 'src/constants';

import {runCommand} from '../runCommand';

/**
 * Get breach name from source by commit hash
 */
const getBranchNameByCommitHash = async (commitHash: string, options: Options): Promise<string> => {
    const commitReflog = await runCommand(`git log --source --all --pretty=oneline --since=${options.since}`);
    const reflogRecords = commitReflog.split(LINE_BREAK_CHAR);

    const [logRecord] = reflogRecords.filter((reflogRecord) => reflogRecord.indexOf(commitHash) === 0);

    const result = logRecord?.match(/^.+refs\/heads\/([^\s\t\n]+)/);
    const branchName = result && result[1];

    return branchName || '[Without source branch]';
};

export default getBranchNameByCommitHash;
