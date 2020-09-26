import {GitData} from '@project-types/data';
import {Options} from '@project-types/options';
import {TextEntity} from 'src/constants';
import renderCliName from 'src/services/renderData/helpers/renderCliName';
import renderTextEntity from 'src/services/renderData/helpers/renderEntity';
import renderLinkToRemoteRepository from 'src/services/renderData/helpers/renderLinkToRemoteRepository';
import renderLinkToTicketByBranchName from 'src/services/renderData/helpers/renderLinkToTicketByBranchName';
import renderLineWithLabel from 'src/services/renderData/helpers/renderLineWithLabel';
import renderCommitInfo from 'src/services/renderData/helpers/renderCommitInfo';
import renderCommitFiles from 'src/services/renderData/helpers/renderCommitFiles';

const renderData = (gitData: GitData, options: Options): void => {
    const {branches, commits} = gitData;

    renderCliName(true);

    const branchNames = Object.keys(branches);

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

            renderCommitInfo(commit);
            renderCommitFiles(commit, options);
        });
    });
};

export default renderData;
