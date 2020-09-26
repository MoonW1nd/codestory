import {CommitCollection, BranchCollection} from './entities';
import {Url} from './aliases';

export type GitData = {
    commits: CommitCollection;
    branches: BranchCollection;
    repositoryUrl: Url;
};
