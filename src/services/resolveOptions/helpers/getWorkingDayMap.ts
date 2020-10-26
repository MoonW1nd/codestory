import {WorkingDayMap} from '@project-types/common';
import {UserOptions} from '@project-types/options';
import {trim} from 'src/helpers';
import {OPTIONS_WEEK_DAY_CODE_MAP} from 'src/constants';

type WeekDayCodes = ['0', '1', '2', '3', '4', '5', '6'];

/**
 * Format for set working days
 * --workingDaysOfWeek="Fr,Su,Sa"
 */
const getWorkingDayMap = (options: UserOptions): WorkingDayMap => {
    const workingDaysOption = options.workingDaysOfWeek;
    const workingDaysParams = workingDaysOption?.split(',').map(trim);

    const workingDay: WorkingDayMap = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
    };

    let hasValidParam = false;
    let hasValidExcludeParam = false;

    workingDaysParams?.forEach((param) => {
        const isExcludeParam = param.indexOf('!') !== -1;
        const day = param.replace('!', '');

        switch (day) {
            case 'Su':
            case 'Mo':
            case 'Tu':
            case 'We':
            case 'Th':
            case 'Fr':
            case 'Sa':
                if (isExcludeParam) {
                    hasValidExcludeParam = true;
                } else {
                    hasValidParam = true;
                }
                const dayCode = OPTIONS_WEEK_DAY_CODE_MAP[day];

                workingDay[dayCode] = !isExcludeParam;
                break;
            default:
            // ignore values
        }
    });

    /**
     * Merge strategy
     */
    if (hasValidParam) {
        (Object.keys(workingDay) as WeekDayCodes).forEach((day) => {
            if (workingDay[day] === null) {
                workingDay[day] = false;
            }
        });

        return workingDay;
    } else if (!hasValidParam && hasValidExcludeParam) {
        (Object.keys(workingDay) as WeekDayCodes).forEach((day) => {
            if (workingDay[day] === null) {
                workingDay[day] = true;
            }
        });

        return workingDay;
    } else {
        return {
            0: false,
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: false,
        };
    }
};

export default getWorkingDayMap;
