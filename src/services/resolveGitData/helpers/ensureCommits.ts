import {Commit, BranchInfo} from '@project-types/entities';
import {GitLogCommit} from '@project-types/gitlog';
import {getBranchInfoByCommitHash, runCommand, getDateRangeGitLogOptions, getCommitReflog} from 'src/helpers';
import {Options} from '@project-types/options';
import {CommandResultCode} from 'src/constants';

const ensureCommits = async (commits: GitLogCommit[], options: Options): Promise<Commit[]> => {
    const gitLogDataWithSource = await runCommand(
        `git log --source --all --pretty=oneline ${getDateRangeGitLogOptions(options)}`,
    );

    /**
     * Temporary off not using reflog data
     */
    // const reflogData = await runCommand(`git log -g --all --pretty=oneline ${getDateRangeGitLogOptions(options)}`);

    let branchNames: BranchInfo[] = [];

    if (gitLogDataWithSource.code === CommandResultCode.Success) {
        branchNames = commits.map((commit) => getBranchInfoByCommitHash(commit.hash, gitLogDataWithSource.result));
    }

    return commits.map((commit, i) => ({
        ...commit,
        reflog: getCommitReflog(commit.abbrevHash, ''),
        branchInfo: branchNames[i] || {name: 'Not detected branch name'},
    }));
};

export default ensureCommits;
