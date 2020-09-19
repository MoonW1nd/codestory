import {Commit} from '@project-types/entities';
import {GitLogCommit} from '@project-types/gitlog';
import {getBranchNameByCommitHash} from 'src/helpers';
import {Options} from '@project-types/options';

const ensureCommits = async (commits: GitLogCommit[], options: Options): Promise<Commit[]> => {
    const branchNamesP = commits.map((commit) => getBranchNameByCommitHash(commit.hash, options));
    const branchNames = await Promise.all(branchNamesP);

    return commits.map((commit, i) => ({
        ...commit,
        branchName: branchNames[i],
    }));
};

export default ensureCommits;
