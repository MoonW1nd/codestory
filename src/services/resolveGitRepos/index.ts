import {runCommand} from 'src/helpers';
import {red} from 'chalk';
import {CommandResultCode} from 'src/constants';
import render from 'src/services/renderData/helpers/render';

const isNotGitRepositoryError = (message: string): boolean => /not a git repository/.test(message);

const resolveGitRepos = async (): Promise<boolean> => {
    const gitRepoResult = await runCommand('git rev-parse --git-dir');

    if (gitRepoResult.code === CommandResultCode.Success) {
        return true;
    } else {
        if (!isNotGitRepositoryError(gitRepoResult.error)) {
            /**
             * TODO [MoonW1nd]: сreate serveis for print errors ans warns
             */
            render(
                `[Error]: Somthing went wrong, please contact with develpers: https://github.com/MoonW1nd/codestory/issues`,
                {chalk: red},
            );
        }

        return false;
    }
};

export default resolveGitRepos;
