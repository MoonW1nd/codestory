import {gitlogPromise} from 'gitlog';

import {BranchCollection, CommitCollection} from '@project-types/entities';
import {Options} from '@project-types/options';
import {GitData} from '@project-types/data';
import {getRepositoryUrl} from 'src/helpers';

import ensureCommits from './helpers/ensureCommits';
import ensureBranchesCollection from './helpers/ensureBranchesCollection';

const resolveGitData = async (options: Options): Promise<GitData> => {
    const repositoryUrl = await getRepositoryUrl();
    const commits = await gitlogPromise(options);
    const ensuredCommits = await ensureCommits(commits, options);

    const branchesCollection: BranchCollection = {};
    const commitCollection: CommitCollection = {};

    ensuredCommits.forEach((commit) => {
        const {name, refType} = commit.branchInfo;

        commitCollection[commit.hash] = commit;

        if (branchesCollection[name] !== undefined) {
            branchesCollection[name].commits.push(commit.hash);
        } else {
            branchesCollection[name] = {
                id: name,
                refType,
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
