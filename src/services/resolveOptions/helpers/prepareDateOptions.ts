import {UserOptions} from '@project-types/options';
import {parseDate} from 'src/helpers';

const DATE_KEYS = ['since', 'after', 'before', 'until'] as const;

const prepareDateOptions = (options: UserOptions): UserOptions => {
    DATE_KEYS.map((key) => {
        const value = options[key];

        if (value) {
            const dateString = parseDate(value);

            options[key] = dateString ? dateString.toISOString() : undefined;
        }
    });

    return options;
};

export default prepareDateOptions;
