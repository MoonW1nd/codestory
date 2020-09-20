import {Url} from '@project-types/aliases';
import {BranchCollection, BranchRefType} from '@project-types/entities';
import {runCommand} from 'src/helpers';

interface ConstructRepositoryUrlParams {
    branchName: string;
    repositoryUrl: Url;
    remoteBranchName: string;
    refType?: BranchRefType;
}

const constructRepositoryUrl = ({
    repositoryUrl,
    branchName,
    remoteBranchName,
    refType,
}: ConstructRepositoryUrlParams): Url => {
    let middlePath: string;
    if (branchName === 'master' || refType === 'tag') {
        middlePath = 'tree';
    } else {
        middlePath = 'pull';
    }

    return `${repositoryUrl}/${middlePath}/${remoteBranchName}`;
};

/**
 *  Ensure info about branch entity: remoteBranchName, repositoryUrl;
 */
const ensureBranchesCollection = async (
    branchCollection: BranchCollection,
    repositoryUrl: Url,
): Promise<BranchCollection> => {
    const branchNames = Object.keys(branchCollection);
    const remoteNames = await Promise.all(
        branchNames.map((branchName) => runCommand(`git config --get branch.${branchName}.merge`)),
    );

    branchNames.map((branchName, i) => {
        const {refType} = branchCollection[branchName];
        const remoteBranchName = refType === 'tag' ? branchName : remoteNames[i].replace(/^refs\/heads\//gi, '').trim();

        if (remoteBranchName) {
            branchCollection[branchName].remoteName = remoteBranchName;
            branchCollection[branchName].repositoryUrl = constructRepositoryUrl({
                remoteBranchName,
                branchName,
                repositoryUrl,
                refType,
            });
        }
    });

    return branchCollection;
};

export default ensureBranchesCollection;
