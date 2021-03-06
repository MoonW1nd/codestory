const LINE_BREAK_CHAR = '\n';
const POSITION_SEPARATOR_CHAR = '~';
const SPACE_CHAR = ' ';

export interface BranchInfo {
    name: string;
    position: number;
    remote?: string;
}

/**
 * Get breach info from stdout git nave-rev command
 */
export const getBranchInfoFromNameRev = (nameRev: string): string => {
    const [, branchInfo] = nameRev.split(SPACE_CHAR);
    const [name] = branchInfo.replace(LINE_BREAK_CHAR, '').split(POSITION_SEPARATOR_CHAR);

    return name;
};
