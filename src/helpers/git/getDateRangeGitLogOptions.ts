import {Options} from '@project-types/options';

const DATE_RANGE_OPTION_NAMES = ['until', 'since', 'after', 'before'] as const;

/**
 * Get options string for set date range in git log command
 */
const getDateRangeGitLogOptions = (options: Options): string => {
    let commandOptions = '';

    DATE_RANGE_OPTION_NAMES.forEach((optionName) => {
        if (options[optionName]) {
            commandOptions += `--${optionName}=${options[optionName]}`;
        }
    });

    return commandOptions;
};

export default getDateRangeGitLogOptions;
