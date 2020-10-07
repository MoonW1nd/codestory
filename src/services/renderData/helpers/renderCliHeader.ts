import {white, dim} from 'chalk';
import figlet from 'figlet';
import render from 'src/services/renderData/helpers/render';
import {Options} from '@project-types/options';
import {getRepositoryName, getFormatedTime} from 'src/helpers';
import {TextEntity} from 'src/constants';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';

const renderCliHeader = async (options: Options): Promise<void> => {
    const {title, author = '', since, before, after, until} = options;
    const fromDate = since || after;
    const toDate = before || until;
    let dateRangeText;

    if (fromDate) {
        dateRangeText = `since ${getFormatedTime(fromDate)}`;

        if (toDate) {
            dateRangeText += ` until ${getFormatedTime(toDate)}`;
        }
    } else if (toDate) {
        dateRangeText = `until ${getFormatedTime(toDate)}`;
    }

    const repositoryName = await getRepositoryName();
    const chalkedAuthorName = chalkTextEntity(TextEntity.author, author);
    const chalkedRepositoryName = chalkTextEntity(TextEntity.repositoryName, repositoryName);
    const chalkedDate = dateRangeText && chalkTextEntity(TextEntity.date, dateRangeText);

    if (title === 'full') {
        const cliName = figlet.textSync('code story', {horizontalLayout: 'full'});

        render(cliName);
        dateRangeText && render(`Story ${chalkedDate}`, {chalk: dim});
        render(`Author: ${chalkedAuthorName} Repository: ${chalkedRepositoryName}`, {chalk: white.bold});
        render('');
    }

    if (title === 'minimal') {
        render(`Repository ${chalkedRepositoryName} `, {chalk: white.bold});
        render(`Author ${chalkedAuthorName}`, {chalk: white.bold});
        dateRangeText && render(`Story ${chalkedDate}`, {chalk: dim});
        render('');
    }
};

export default renderCliHeader;
