import {GitData} from '@project-types/data';
import {Options} from '@project-types/options';
import {TextEntity} from 'src/constants';
import renderTextEntity from 'src/services/renderData/helpers/renderEntity';
import renderLinkToRemoteRepository from 'src/services/renderData/helpers/renderLinkToRemoteRepository';
import renderLinkToTicketByBranchName from 'src/services/renderData/helpers/renderLinkToTicketByBranchName';
import renderLineWithLabel from 'src/services/renderData/helpers/renderLineWithLabel';
import renderCommitInfo from 'src/services/renderData/helpers/renderCommitInfo';
import renderCommitFiles from 'src/services/renderData/helpers/renderCommitFiles';
import renderCliHeader from 'src/services/renderData/helpers/renderCliHeader';
import renderNoCommitsMessage from './helpers/renderNoCommitsMessage';

const renderData = async (gitData: GitData, options: Options): Promise<void> => {
    const {branches, commits} = gitData;

    await renderCliHeader(options);

    const branchNames = Object.keys(branches);

    if (branchNames.length === 0 && options.header !== 'off') {
        renderNoCommitsMessage();
    }

    branchNames.map((branchName, i) => {
        if (i > 0) {
            console.log('');
        }

        /**
         * Main info
         */
        renderTextEntity(TextEntity.branch, branchName);
        renderLinkToRemoteRepository(branches[branchName]);
        renderLinkToTicketByBranchName(branchName, options);

        /**
         * Render commits
         */
        renderLineWithLabel('commits');

        branches[branchName].commits.map((commitHash) => {
            const commit = commits[commitHash];

            renderCommitInfo(commit, options);
            renderCommitFiles(commit, options);
        });
    });
};

export default renderData;
