import {Commit} from '@project-types/entities';
import {GitLogCommit, GitlogOptions} from '@project-types/gitlog';
import {getBranchNameByCommitHash} from 'src/helpers';

const ensureCommits = async (commits: GitLogCommit[], options: GitlogOptions): Promise<Commit[]> => {
    const branchNamesP = commits.map((commit) => getBranchNameByCommitHash(commit.hash, options));
    const branchNames = await Promise.all(branchNamesP);

    return commits.map((commit, i) => ({
        ...commit,
        branchName: branchNames[i],
    }));
};

export default ensureCommits;
