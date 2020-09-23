import render from './render';
import {TextEntity} from 'src/constants';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';

const renderLineWithLabel = (title: string, value = ''): void => {
    const text = `${chalkTextEntity(TextEntity.label, title.toUpperCase())}: ${value}`;

    render(text);
};

export default renderLineWithLabel;
