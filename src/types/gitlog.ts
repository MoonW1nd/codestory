import {GitlogOptions as GitlogOptionsBase} from 'gitlog';

export type GitLogFields = 'authorDate' | 'committerDate' | 'subject' | 'hash' | 'abbrevHash';

export type GitlogOptions = GitlogOptionsBase<GitLogFields>;

export type GitLogCommit = Record<GitLogFields | 'status', string> & {files: string[]};
