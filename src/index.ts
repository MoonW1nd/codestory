#!/usr/bin/env node
/**
 * Don't delete! Need for resolve alises imports
 */
import 'module-alias/register';

import clear from 'clear';

import resolveGitData from './services/resolveGitData';
import {resolveOptions} from 'src/services';
import renderData from './services/renderData';

const getLog = async (): Promise<void> => {
    const options = await resolveOptions();
    const {clearConsole} = options;

    if (clearConsole) {
        clear();
    }

    const gitData = await resolveGitData(options);

    renderData(gitData, options);
};

getLog();
