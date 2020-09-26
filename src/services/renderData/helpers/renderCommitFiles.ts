import {Options} from '@project-types/options';
import {Commit} from '@project-types/entities';
import render from 'src/services/renderData/helpers/render';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';
import {TextEntity} from 'src/constants';

const renderCommitFiles = (commit: Commit, options: Options): void => {
    if (options.showCommitFiles) {
        commit.files.map((file, i) => {
            const status = commit.status[i];
            let textEntity = TextEntity.nope;

            switch (status) {
                case 'M':
                    textEntity = TextEntity.modifiedFile;
                    break;
                case 'D':
                    textEntity = TextEntity.deletedFile;
                    break;
                case 'A':
                    textEntity = TextEntity.addedFile;
                    break;
            }

            const chalkedText = chalkTextEntity(textEntity, `${status} ${file}`);

            render(chalkedText, {indent: 2});
        });
    }
};

export default renderCommitFiles;
