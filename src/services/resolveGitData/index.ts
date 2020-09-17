import {gitlogPromise} from 'gitlog';
import {BranchCollection, CommitCollection} from '@project-types/entities';
import {getRepositoryUrl} from 'src/helpers';

import ensureCommits from './helpers/ensureCommits';
import ensureBranchesCollection from './helpers/ensureBranchesCollection';
import {GitlogOptions} from '@project-types/gitlog';

interface ResolveGitDataResult {
    commits: CommitCollection;
    branches: BranchCollection;
    repositoryUrl: string;
}

const resolveGitData = async (options: GitlogOptions): Promise<ResolveGitDataResult> => {
    const repositoryUrl = await getRepositoryUrl();
    const commits = await gitlogPromise(options);
    const ensuredCommits = await ensureCommits(commits, options);

    const branchesCollection: BranchCollection = {};
    const commitCollection: CommitCollection = {};

    ensuredCommits.forEach((commit) => {
        const {branchName} = commit;

        commitCollection[commit.hash] = commit;

        if (branchesCollection[branchName] !== undefined) {
            branchesCollection[branchName].commits.push(commit.hash);
        } else {
            branchesCollection[branchName] = {
                id: branchName,
                commits: [commit.hash],
            };
        }
    });

    const ensuredBranchesCollection = await ensureBranchesCollection(branchesCollection, repositoryUrl);

    return {
        repositoryUrl,
        commits: commitCollection,
        branches: ensuredBranchesCollection,
    };
};

export default resolveGitData;
