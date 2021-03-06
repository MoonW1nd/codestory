import {GitLogCommit} from './gitlog';

export type BranchRefType = 'head' | 'remote' | 'tag';

export type BranchInfo = {
    name: string;
    refType?: BranchRefType;
};

export type ReflogRecord = {
    head: string;
    action: string;
    description: string;
};

export type Branch = {
    id: string;
    commits: string[];
    refType?: BranchRefType;
    remoteName?: string;
    repositoryUrl?: string;
};

export type Commit = GitLogCommit & {branchInfo: BranchInfo; reflog: ReflogRecord[]};

export interface BranchCollection {
    [index: string]: Branch;
}

export interface CommitCollection {
    [index: string]: Commit;
}
