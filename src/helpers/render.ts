import chalk from 'chalk';

export const renderLineWithTitle = (title: string, value = ''): void => {
    console.log(`${chalk.cyan(title.toUpperCase())}: ${value}`);
};

export const chalkUrl = (url: string): string => chalk.blue(url);
