import {Commit} from '@project-types/entities';
import {GitLogCommit} from '@project-types/gitlog';
import {getBranchInfoByCommitHash} from 'src/helpers';
import {Options} from '@project-types/options';

const ensureCommits = async (commits: GitLogCommit[], options: Options): Promise<Commit[]> => {
    const branchNamesP = commits.map((commit) => getBranchInfoByCommitHash(commit.hash, options));
    const branchNames = await Promise.all(branchNamesP);

    return commits.map((commit, i) => ({
        ...commit,
        branchInfo: branchNames[i],
    }));
};

export default ensureCommits;
