import {blue, cyan, magenta, dim, white, red, yellow, green} from 'chalk';
import {TextEntity} from 'src/constants';

const COLOR_MAP: Record<keyof typeof TextEntity, typeof blue> = {
    [TextEntity.url]: blue,
    [TextEntity.label]: cyan,
    [TextEntity.branch]: magenta,
    [TextEntity.date]: dim,
    [TextEntity.commitSubject]: white,
    [TextEntity.addedFile]: green,
    [TextEntity.deletedFile]: red,
    [TextEntity.modifiedFile]: yellow,

    /**
     * Not tested colors
     */
    [TextEntity.author]: dim,
    [TextEntity.commitHash]: red,
    [TextEntity.rebasedFile]: dim,
};

const chalkTextEntity = (entity: TextEntity, text: string): string => COLOR_MAP[entity](text);

export default chalkTextEntity;
