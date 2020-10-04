import {BranchRefType, BranchInfo} from '@project-types/entities';
import {LINE_BREAK_CHAR} from 'src/constants';

/**
 * Get breach name from source by commit hash
 */
const getBranchInfoByCommitHash = (commitHash: string, gitLogData: string): BranchInfo => {
    const reflogRecords = gitLogData.split(LINE_BREAK_CHAR);

    const [logRecord] = reflogRecords.filter((logRecord) => logRecord.indexOf(commitHash) === 0);

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
