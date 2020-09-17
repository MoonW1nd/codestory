import {runCommand} from './runCommand';
import {BranchInfo} from './getBranchInfoFromNameRev';
import {GitlogOptions} from '..';

const LINE_BREAK_CHAR = '\n';

/**
 * Get breach info from stdout git nave-rev command
 */
export const getBranchInfoByCommitHash = async (commitHash: string, options: GitlogOptions): Promise<BranchInfo> => {
    const commitReflog = await runCommand(`git log --source --all --pretty=oneline --since=${options.since}`);
    const reflogRecords = commitReflog.split(LINE_BREAK_CHAR);

    const [logRecord] = reflogRecords.filter((reflogRecord) => reflogRecord.indexOf(commitHash) === 0);

    const result = logRecord.match(/^.+refs\/heads\/([^\s\t\n]+)/);
    const branchName = result && result[1];

    return {
        name: branchName || '[Without source branch]',
        position: 0,
    };
};
