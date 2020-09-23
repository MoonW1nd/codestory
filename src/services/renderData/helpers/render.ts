import chalk from 'chalk';
import {TAB} from 'src/constants';

type ChalkFunction = typeof chalk.cyan;

type RenderParams = {
    chalk?: ChalkFunction;
    indent?: number;
};

/**
 * Get indent in TABS by count
 */
const getIndent = (count = 0): string => {
    let indent = '';

    for (let i = 0; i < count; i++) {
        indent += TAB;
    }

    return indent;
};

const render = (text: string, params: RenderParams = {}): void => {
    console.log(chalk(`${getIndent(params.indent)}${text}`));
};

export default render;
