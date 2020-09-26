import {TextEntity} from 'src/constants';
import render from 'src/services/renderData/helpers/render';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';

const renderTextEntity = (entity: TextEntity, text: string): void => {
    render(chalkTextEntity(entity, text));
};

export default renderTextEntity;
