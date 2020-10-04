import {Commit} from '@project-types/entities';
import {GitLogCommit} from '@project-types/gitlog';
import {getBranchInfoByCommitHash, runCommand, getDateRangeGitLogOptions, getCommitReflog} from 'src/helpers';
import {Options} from '@project-types/options';

const ensureCommits = async (commits: GitLogCommit[], options: Options): Promise<Commit[]> => {
    const gitLogDataWithSource = await runCommand(
        `git log --source --all --pretty=oneline ${getDateRangeGitLogOptions(options)}`,
    );

    const reflogData = await runCommand(`git log -g --all --pretty=oneline ${getDateRangeGitLogOptions(options)}`);

    const branchNames = commits.map((commit) => getBranchInfoByCommitHash(commit.hash, gitLogDataWithSource));

    return commits.map((commit, i) => ({
        ...commit,
        reflog: getCommitReflog(commit.abbrevHash, reflogData),
        branchInfo: branchNames[i],
    }));
};

export default ensureCommits;
