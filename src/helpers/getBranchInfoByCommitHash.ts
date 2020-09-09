import {runCommand} from './runCommand';
import {BranchInfo} from './getBranchInfoFromNameRev';

const LINE_BREAK_CHAR = '\n';
const POSITION_SEPARATOR_CHAR = '~';
const SPACE_CHAR = ' ';

/**
 * Get breach info from stdout git nave-rev command
 */
export const getBranchInfoByCommitHash = async (commitHash: string): Promise<BranchInfo> => {
    const commitReflog = await runCommand(`git reflog show --all`);
    const reflogRecords = commitReflog.split(LINE_BREAK_CHAR);

    const reflogRecordsWithCommitHash = reflogRecords.filter((reflogRecord) => reflogRecord.indexOf(commitHash) === 0);

    return {
        name: 'test',
        position: 0,
    };
};
