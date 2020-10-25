import {UserOptions} from '@project-types/options';
import {parseDate, parseStartDayTimeOption} from 'src/helpers';

const DATE_KEYS = ['since', 'after', 'before', 'until'] as const;

const prepareDateOptions = (options: UserOptions): UserOptions => {
    DATE_KEYS.map((key) => {
        const value = options[key];

        if (value) {
            let date = parseDate(value);

            if (options.startDayTime) {
                const {hours, minutes} = parseStartDayTimeOption(options.startDayTime);

                date = new Date(date.setHours(hours, minutes));
            }

            options[key] = date ? date.toISOString() : undefined;
        }
    });

    return options;
};

export default prepareDateOptions;
