import {parseDate as chronoParseDate} from 'chrono-node';

const parseDate = (dateString: string): Date => {
    const dateNow = new Date(Date.now());

    return chronoParseDate(dateString.replace(/\./gi, ' '), dateNow);
};

export default parseDate;
