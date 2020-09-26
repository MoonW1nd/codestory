import {Commit} from '@project-types/entities';
import {Options} from '@project-types/options';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';
import {TextEntity} from 'src/constants';
import render from 'src/services/renderData/helpers/render';

const renderCommitInfo = (commit: Commit, options?: Options): void => {
    const date = commit.authorDate.split(' ')[0];
    const chalkedDate = chalkTextEntity(TextEntity.date, date);
    const chalkedSubject = chalkTextEntity(TextEntity.commitSubject, commit.subject);
    const renderText = `${chalkedDate} ${chalkedSubject}`;

    render(renderText, {indent: 1});
};

export default renderCommitInfo;
