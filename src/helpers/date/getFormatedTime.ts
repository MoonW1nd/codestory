import {parseDate as chronoParseDate} from 'chrono-node';

const pad = (n: number): string => {
    return (n < 10 ? '0' : '') + n;
};

const getFormatedTime = (dateString: string): string => {
    const Date = chronoParseDate(dateString);
    const year = Date.getFullYear().toString();
    const month = pad(Date.getMonth() + 1);
    const date = pad(Date.getDate());
    const hours = pad(Date.getHours());
    const minutes = pad(Date.getMinutes());

    return `${hours}:${minutes} ${date}.${month}.${year}`;
};

export default getFormatedTime;
