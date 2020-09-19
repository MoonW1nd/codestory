import {gitlogPromise} from 'gitlog';

import {getRepositoryUrl} from 'src/helpers';
import {BranchCollection, CommitCollection} from '@project-types/entities';
import {Options} from '@project-types/options';

import ensureCommits from './helpers/ensureCommits';
import ensureBranchesCollection from './helpers/ensureBranchesCollection';

interface ResolveGitDataResult {
    commits: CommitCollection;
    branches: BranchCollection;
    repositoryUrl: string;
}

const resolveGitData = async (options: Options): Promise<ResolveGitDataResult> => {
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
