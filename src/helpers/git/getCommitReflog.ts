import {LINE_BREAK_CHAR} from 'src/constants';
import {ReflogRecord} from '@project-types/entities';

const filterLogRecordByCommitHash = (commitHash: string) => (logRecord: string): boolean =>
    logRecord.indexOf(commitHash) === 0 && logRecord.indexOf('HEAD@') !== -1;

const parseReflogRecord = (reflogRecord: string): ReflogRecord => {
    const [positionInfo, action, description] = reflogRecord.split(': ');

    return {
        head: positionInfo.split(' ')[1],
        action,
        description,
    };
};

const getCommitReflog = (commitHash: string, reflogData: string): ReflogRecord[] => {
    const reflogRecords = reflogData
        .split(LINE_BREAK_CHAR)
        .filter(filterLogRecordByCommitHash(commitHash))
        .map(parseReflogRecord);

    return reflogRecords;
};

export default getCommitReflog;
