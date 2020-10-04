import {white} from 'chalk';
import figlet from 'figlet';
import render from 'src/services/renderData/helpers/render';
import {Options} from '@project-types/options';
import {getRepositoryName} from 'src/helpers';
import {TextEntity} from 'src/constants';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';

const renderCliName = async ({title, author = ''}: Options): Promise<void> => {
    const repositoryName = await getRepositoryName();
    const chalkedAuthorName = chalkTextEntity(TextEntity.author, author);
    const chalkedRepositoryName = chalkTextEntity(TextEntity.repositoryName, repositoryName);

    if (title === 'full') {
        const cliName = figlet.textSync('code story', {horizontalLayout: 'full'});

        render(cliName);
        render(`Author: ${chalkedAuthorName} Repository: ${chalkedRepositoryName}`, {chalk: white.bold});
        render('');
    }

    if (title === 'minimal') {
        render(`Repository: ${chalkedRepositoryName} `, {chalk: white.bold});
        render(`Author: ${chalkedAuthorName}`, {chalk: white.bold});
        render('');
    }
};

export default renderCliName;
