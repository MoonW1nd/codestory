import {Options} from '@project-types/options';
import {BranchRefType, BranchInfo} from '@project-types/entities';
import {LINE_BREAK_CHAR} from 'src/constants';

import {runCommand} from '../runCommand';

/**
 * Get breach name from source by commit hash
 */
const getBranchInfoByCommitHash = async (commitHash: string, options: Options): Promise<BranchInfo> => {
    const commitReflog = await runCommand(`git log --source --all --pretty=oneline --since=${options.since}`);
    const reflogRecords = commitReflog.split(LINE_BREAK_CHAR);

    const [logRecord] = reflogRecords.filter((reflogRecord) => reflogRecord.indexOf(commitHash) === 0);

    const result = logRecord?.match(/^.{0,}refs\/(heads|remotes\/origin|tags)\/([^\s\t\n]+)/);
    const refResult = result && result[1];
    let refType: BranchRefType;
    if (refResult === 'heads') {
        refType = 'head';
    } else if (refResult === 'tags') {
        refType = 'tag';
    } else {
        refType = 'remote';
    }

    const branchName = result && result[2];

    return {
        name: branchName || "[Don't detect source branch]",
        refType,
    };
};

export default getBranchInfoByCommitHash;
