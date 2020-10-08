import {blue, cyan, magenta, dim, white, red, yellow, green, ChalkFunction} from 'chalk';
import {TextEntity} from 'src/constants';

const COLOR_MAP: Record<keyof typeof TextEntity, ChalkFunction> = {
    [TextEntity.url]: blue,
    [TextEntity.label]: cyan,
    [TextEntity.repositoryName]: cyan,
    [TextEntity.branch]: magenta.bold,
    [TextEntity.date]: dim,
    [TextEntity.commitSubject]: white,
    [TextEntity.addedFile]: green,
    [TextEntity.deletedFile]: red,
    [TextEntity.modifiedFile]: yellow,
    [TextEntity.addedCommit]: green,
    [TextEntity.modifiedCommit]: yellow,
    [TextEntity.author]: yellow,

    /**
     * Not tested colors
     */
    [TextEntity.commitHash]: red,
    [TextEntity.rebasedFile]: dim,
    [TextEntity.nope]: white,
};

const chalkTextEntity = (entity: TextEntity, text: string): string => COLOR_MAP[entity](text);

export default chalkTextEntity;
