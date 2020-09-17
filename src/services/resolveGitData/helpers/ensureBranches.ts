import {BranchCollection} from '@project-types/entities';
import {runCommand} from 'src/helpers';

/**
 *  Ensure info about branch entity: remoteBranchName, repositoryUrl;
 */
const ensureBranches = async (branchCollection: BranchCollection, repositoryUrl: string): Promise<BranchCollection> => {
    const branchNames = Object.keys(branchCollection);
    const remoteNames = await Promise.all(
        branchNames.map((branchName) => runCommand(`git config --get branch.${branchName}.merge`)),
    );

    branchNames.map((branchName, i) => {
        const remoteBranchName = remoteNames[i].replace(/^refs\/heads\//gi, '').trim();

        if (remoteBranchName) {
            branchCollection[branchName].remoteName = remoteBranchName;
            branchCollection[branchName].repositoryUrl = `${repositoryUrl}/${
                branchName === 'master' ? 'tree' : 'pull'
            }/${remoteBranchName}`;
        }
    });

    return branchCollection;
};

export default ensureBranches;
