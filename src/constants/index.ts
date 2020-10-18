export const TAB = '    ';

export const LINE_BREAK_CHAR = '\n';

export const TICKET_NAME_REGEXP = /[A-Z]{1,}-\d{1,}/g;

export enum TextEntity {
    url = 'url',
    nope = 'nope',
    label = 'label',
    repositoryName = 'repositoryName',
    branch = 'branch',
    commitHash = 'commitHash',
    commitSubject = 'commitSubject',
    date = 'date',
    author = 'author',
    addedCommit = 'addedCommit',
    modifiedCommit = 'modifiedCommit',
    addedFile = 'addedFile',
    rebasedFile = 'rebasedFile',
    modifiedFile = 'modifiedFile',
    deletedFile = 'deletedFile',
}

export enum WeekDayCode {
    sunday = 0,
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6,
}
