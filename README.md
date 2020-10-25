# code story cli
[![NPM version][npm-image]][npm-url]
[![Conventional Commits][conventional-commits-image]][conventional-commits-url]
> Get your code activity log for standup from git.
> &nbsp; ⚠️ **This is beta version**

Opinionated git log parser shows which code you worked on in the specified period, providing additional useful information.

**Features:**
 - group commit by branch
 - show link on task tracker
 - show link on PR, branch or tag
 - the ability to set working day for smart detect show log period with common usage
 - the ability to set the start time of the day, which will help you more accurately determine what you were doing
 - show changed files in commits
 - support config file

**Output example:**
```shell
Repository: codestory
Author: Alexander Ivankov
Story since 11:30 18.10.2020 until 11:30 23.10.2020

feature/CODESTORY-1-documentation  ───────────────────────────────────────── branch name
PR: https://github.com/MoonW1nd/codestory/pull/feature/CODESTORY-1-doc  ──── link on PR
TASK: https://tracker.yandex.ru/CODESTORY-1  ─────────────────────────────── task tracker link
COMMITS:
    A 2020-09-21 1234826 feat(readme.md): start documentation ─────── commit info
    │    A README.md  ─────────────────────────────────────────────── changed file
    │    └─────────────────────────────────────────────────────────── file modification type (*)
    └──────────────────────────────────────────────────────────────── commit modification type (*)
```
> (*) Modification types:
>  - A - add file/commit
>  - M - modified file/commit
>  - D - delete file


## Installation

```shell
npm i -g code-story
```

## Options
| <img width=300 /> flag                                                           | <img />  alias | <img /> <br>  description                                                                                                                                                              | <img /> <br> type                     | <img /> default |
|----------------------------------------------------------------|-------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|---------|
| `--since`                                                      | `-s`  | Show commits more recent than a specific date.                                                                                                                           | string                   |         |
| `--after`                                                      | `-a`  | Show commits more recent than a specific date.                                                                                                                           | string                   |         |
| `--until`                                                      | `-u`  | Show commits older than a specific date.                                                                                                                                 | string                   |         |
| `--before`                                                     | `-b`  | Show commits older than a specific date.                                                                                                                                 | string                   |         |
| `--trackerUrl`                                                 | `-t`  | Base url in task tracker system.                                                                                                                                         | string                   |         |
| `--author`                                                     |       | Limit the commits output to ones with author header lines that match the specified pattern.                                                                              | string                   |         |
| `--branch`                                                     | `-b`  | Show only commits in the specified branch or revision range.                                                                                                             | string                   |         |
| `--number`                                                     | `-n`  | The number of commits to return                                                                                                                                          | number                   | 999     |
| `--file`                                                       | `-f`  | File filter for the git log command                                                                                                                                      | string                   |         |
| `--committer`                                                  |       | Limit the commits output to ones with author header lines that match the specified pattern.                                                                              | string                   |         |
| `--showCommitFiles`                                            |       | Show files changed in commits.                                                                                                                                           | boolean                  | false   |
| `--clearConsole`                                               |       | Clear console before out info                                                                                                                                            | boolean                  | false   |
| <span style="white-space: nowrap">`--workingDaysOfWeek`</span> |       | Sets working days of the week, use 2 first letter of day in the list and separated a comma.Use `!` symbol for exclude day. <br> Example: `--workingDaysOfWeek="!Su,!Sa"` | string                   |         |
| `--startDayTime`                                               |       | Sets the start time of the day. The commit history will start and end from this time. <br> Format: `hours:minutes` <br> Example: `--startDayTime="09:00"`                | string                   |         |
| `--header`                                                     |       | Cli header type                                                                                                                                                          | 'full', 'minimal', 'off' | 'full'  |
| `--help`                                                       | `-h`  | Show help                                                                                                                                                                | boolean                  |         |
 
## Config file

Support set often used options in:
- `codestory` property in a package.json
- a JSON or YAML, extensionless `.codestoryrc` file
- an `.codestoryrc` with the extensions .json, .yaml, .yml, .js, or .cjs (example: `.codestoryrc.json`)
- a `codestory.config.js` or `codestory.config.cjs` CommonJS 

## Usage
Get commits story by last week

```shell
code-story --since=1.week.ago
```

## Known issues
 - wrong detect branch name in branch without commits ([#4](https://github.com/MoonW1nd/codestory/issues/4))


[npm-url]: https://www.npmjs.com/package/code-story
[npm-image]: https://img.shields.io/npm/v/code-story.svg
[conventional-commits-image]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-url]: https://conventionalcommits.org/

