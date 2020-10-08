import {Commit} from '@project-types/entities';
import {Options} from '@project-types/options';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';
import {TextEntity} from 'src/constants';
import render from 'src/services/renderData/helpers/render';
import {parseDate} from 'src/helpers';

const renderCommitInfo = (commit: Commit, options: Options): void => {
    const date = commit.authorDate.split(' ')[0];
    const chalkedDate = chalkTextEntity(TextEntity.date, date);
    const chalkedSubject = chalkTextEntity(TextEntity.commitSubject, commit.subject);
    const chalkedCommitHash = chalkTextEntity(TextEntity.commitHash, commit.abbrevHash);

    const sinceOption = options.since || options.after;

    const modifiedCommitStatusText = chalkTextEntity(TextEntity.modifiedCommit, 'M');
    const addedCommitSatusText = chalkTextEntity(TextEntity.addedCommit, 'A');

    const authorDate = parseDate(commit.authorDate);
    const commiterDate = parseDate(commit.committerDate);

    const commitStatuses = [];

    if (authorDate.getTime() === commiterDate.getTime()) {
        commitStatuses.push(addedCommitSatusText);
    } else {
        if (sinceOption) {
            const sinceDate = parseDate(sinceOption);
            const isOnlyModifiedCommit = authorDate.getTime() < sinceDate.getTime();

            if (!isOnlyModifiedCommit) {
                commitStatuses.push(addedCommitSatusText);
            }
        }

        commitStatuses.push(modifiedCommitStatusText);
    }

    const commitStatusText = commitStatuses.length === 1 ? ` ${commitStatuses[0]}` : commitStatuses.join('');

    const renderText = `${commitStatusText} ${chalkedDate} ${chalkedCommitHash} ${chalkedSubject}`;
    render(renderText, {indent: 1});
};

export default renderCommitInfo;
