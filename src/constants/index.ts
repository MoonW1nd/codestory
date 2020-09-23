export const DEFAULT_SINCE_PARAMS = '1.day.ago';

export const TAB = '    ';

export const LINE_BREAK_CHAR = '\n';

export const TICKET_NAME_REGEXP = /[A-Z]{1,}-\d{1,}/g;

export enum TextEntity {
    url = 'url',
    label = 'label',
    branch = 'branch',
    commitHash = 'commitHash',
    commitSubject = 'commitSubject',
    date = 'date',
    author = 'author',
    addedFile = 'addedFile',
    rebasedFile = 'rebasedFile',
    modifiedFile = 'modifiedFile',
    deletedFile = 'deletedFile',
}
