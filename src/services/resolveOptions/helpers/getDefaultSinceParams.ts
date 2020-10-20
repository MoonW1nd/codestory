import {WeekDayCode, WorkingDayMap} from '@project-types/common';

const DEFAULT_OFFSET = 1;

const getPreviousDayCode = (dayCode: WeekDayCode): WeekDayCode => {
    if (dayCode === '0') {
        return '6';
    }

    return String(Number(dayCode) - 1) as WeekDayCode;
};

const getWorkingDayOffset = (workingDays: WorkingDayMap, currentDayCode: WeekDayCode, offset = 0): number => {
    const isWorkingDay = workingDays[currentDayCode];

    if (isWorkingDay) {
        return offset;
    }

    const previousDayCode = getPreviousDayCode(currentDayCode);
    return getWorkingDayOffset(workingDays, previousDayCode, offset + 1);
};

const getDefaultSinceParams = (workingDays: WorkingDayMap): string => {
    const currentDayCode = String(new Date(Date.now()).getDay()) as WeekDayCode;
    const offset = getWorkingDayOffset(workingDays, currentDayCode);

    return `${DEFAULT_OFFSET + offset}.day.ago`;
};

export default getDefaultSinceParams;
