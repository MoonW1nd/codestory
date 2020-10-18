import {WeekDayCode} from '@project-types/common';

const DEFAULT_OFFSET = 1;

const workingDays = {
    0: false,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: false,
};

const getPreviousDayCode = (dayCode: WeekDayCode): WeekDayCode => {
    if (dayCode === 0) {
        return 6;
    }

    return (dayCode - 1) as WeekDayCode;
};

const getWorkingDayOffset = (currentDayCode: WeekDayCode, offset = 0): number => {
    const isWorkingDay = workingDays[currentDayCode];

    if (isWorkingDay) {
        return offset;
    }

    const previousDayCode = getPreviousDayCode(currentDayCode);
    return getWorkingDayOffset(previousDayCode, offset + 1);
};

const getDefaultSinceParams = (): string => {
    const currentDayCode = new Date(Date.now()).getDay() as WeekDayCode;
    const offset = getWorkingDayOffset(currentDayCode);

    return `${DEFAULT_OFFSET + offset}.day.ago`;
};

export default getDefaultSinceParams;
