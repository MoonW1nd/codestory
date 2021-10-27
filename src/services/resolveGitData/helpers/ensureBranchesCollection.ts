import {Url} from '@project-types/aliases';
import {BranchCollection, BranchRefType} from '@project-types/entities';
import {runCommand} from 'src/helpers';
import {CommandResultCode} from 'src/constants';

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
    const remoteNamesResults = await Promise.all(
        branchNames.map((branchName) => runCommand(`git config --get branch.${branchName}.merge`)),
    );

    const remoteNames = remoteNamesResults.map((remoteNameData) => {
        if (remoteNameData.code === CommandResultCode.Success) {
            return remoteNameData.result;
        }

        return 'Not detected remoteName';
    });

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
