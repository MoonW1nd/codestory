import {Url} from '@project-types/aliases';
import {GitlogOptions} from '@project-types/gitlog';

export type CliHeader = 'full' | 'minimal' | 'off';

export type UserOptions = {
    /**
     * Show only commits in the specified branch or revision range.
     * By default uses the current branch and defaults to HEAD (i.e.
     * the whole history leading to the current commit).
     */
    branch?: string;
    /**
     * The number of commits to return
     * @default 999
     */
    number?: number;
    /** File filter for the git log command */
    file?: string;
    /** Limit the commits output to ones with author header lines that match the specified pattern. */
    author?: string;
    /** Limit the commits output to ones with committer header lines that match the specified pattern. */
    committer?: string;
    /** Show commits more recent than a specific date. */
    since?: string;
    /** Show commits more recent than a specific date. */
    after?: string;
    /** Show commits older than a specific date */
    until?: string;
    /** Show commits older than a specific date */
    before?: string;
    /** Base url in task tracker system */
    trackerUrl?: Url;
    /**
     * Show files changed in commits
     * @default false
     */
    showCommitFiles?: boolean;
    /**
     * Clear console before out info
     * @default false
     */
    clearConsole?: boolean;
    /**
     * Show cli name as title
     * @default full
     */
    header?: CliHeader;
};

export type Options = UserOptions & GitlogOptions;
