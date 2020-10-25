import {trim} from 'src/helpers';

type TimeObject = {
    hours: number;
    minutes: number;
};

const DEFAULT_HOURS = 0;
const DEFAULT_MINUTES = 0;

const parseStartDayTimeOption = (timeString: string): TimeObject => {
    const [hoursString, minutesString] = timeString.split(':').map(trim);

    const hours = Number(hoursString);
    const minutes = Number(minutesString);

    return {
        hours: isNaN(hours) ? DEFAULT_HOURS : hours,
        minutes: isNaN(minutes) ? DEFAULT_MINUTES : minutes,
    };
};

export default parseStartDayTimeOption;
