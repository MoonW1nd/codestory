#!/usr/bin/env node
/**
 * Don't delete! Need for resolve alises imports
 */
import 'module-alias/register';

import {yellow} from 'chalk';
import render from 'src/services/renderData/helpers/render';
import clear from 'clear';

import resolveGitData from './services/resolveGitData';
import {resolveGitRepos, resolveOptions} from 'src/services';
import renderData from './services/renderData';

const getLog = async (): Promise<void> => {
    const isGitRepo = await resolveGitRepos();

    if (isGitRepo) {
        const options = await resolveOptions();
        const {clearConsole} = options;

        if (clearConsole) {
            clear();
        }

        const gitData = await resolveGitData(options);

        renderData(gitData, options);
    } else {
        render('Not found git repository', {chalk: yellow});
    }
};

getLog();
