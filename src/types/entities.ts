import {GitLogCommit} from './gitlog';

export type Branch = {
    id: string;
    commits: string[];
    remoteName?: string;
    repositoryUrl?: string;
};

export type Commit = GitLogCommit & {branchName: string};

export interface BranchCollection {
    [index: string]: Branch;
}

export interface CommitCollection {
    [index: string]: Commit;
}
