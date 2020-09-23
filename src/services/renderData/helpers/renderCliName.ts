import {red} from 'chalk';
import figlet from 'figlet';
import render from 'src/services/renderData/helpers/render';

const renderCliName = (showCliName: boolean): void => {
    if (showCliName) {
        const cliName = figlet.textSync('code story', {horizontalLayout: 'full'});

        render(cliName, {chalk: red});
    }
};

export default renderCliName;
