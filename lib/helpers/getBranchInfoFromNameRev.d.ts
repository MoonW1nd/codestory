export interface BranchInfo {
    name: string;
    position: number;
    remote?: string;
}
/**
 * Get breach info from stdout git nave-rev command
 */
export declare const getBranchInfoFromNameRev: (nameRev: string) => BranchInfo;
