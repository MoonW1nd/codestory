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

export enum OPTIONS_WEEK_DAY_CODE_MAP {
    Su = 0,
    Mo = 1,
    Tu = 2,
    We = 3,
    Th = 4,
    Fr = 5,
    Sa = 6,
}

export enum CommandResultCode {
    Error = 1,
    Success = 0,
}
