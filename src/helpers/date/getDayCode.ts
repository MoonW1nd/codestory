import {parseDate as chronoParseDate} from 'chrono-node';
import {WeekDayCode} from '@project-types/common';

const getDayCode = (dateString: string): WeekDayCode => {
    const date = chronoParseDate(dateString);

    return String(date.getDay()) as WeekDayCode;
};

export default getDayCode;
