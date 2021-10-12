import {OPTIONS_WEEK_DAY_CODE_MAP, CommandResultCode} from 'src/constants';

export type WeekDayCode = '0' | '1' | '2' | '3' | '4' | '5' | '6';

export type OptionsWeekDay = keyof typeof OPTIONS_WEEK_DAY_CODE_MAP;

export type WorkingDayMap = Record<WeekDayCode, boolean | null>;

type SuccessResult = {
    code: CommandResultCode.Success;
    result: string;
};

type ErrorResult = {
    code: CommandResultCode.Error;
    error: string;
};

export type RunCommandResult = SuccessResult | ErrorResult;
