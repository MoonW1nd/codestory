```
                     _                  _                                     _   _
   ___    ___     __| |   ___     ___  | |_    ___    _ __   _   _      ___  | | (_)
  / __|  / _ \   / _` |  / _ \   / __| | __|  / _ \  | '__| | | | |    / __| | | | |
 | (__  | (_) | | (_| | |  __/   \__ \ | |_  | (_) | | |    | |_| |   | (__  | | | |
  \___|  \___/   \__,_|  \___|   |___/  \__|  \___/  |_|     \__, |    \___| |_| |_|
                                                             |___/
```

[![NPM version][npm-image]][npm-url]
[![Conventional Commits][conventional-commits-image]][conventional-commits-url]

## Description 
Opinionated git log parser for help on stand up activities.

**Features:**
 - group commit by branch
 - show link on task in task tracker
 - show link on PR, branch or tag
 - show change files in commits
 - support config files

**Output example:**
```shell
feature/CODESTORY-1-documentation  ───────────────────────────────────────── branch name
PR: https://github.com/MoonW1nd/codestory/pull/feature/CODESTORY-1-doc  ──── link on PR
TASK: https://st.yandex-team.ru/CODESTORY-1  ─────────────────────────────── task tracker link
COMMITS:  ┌───────────────────────────────────────────────────────────────── commit date
    2020-09-21 feat(readme.md): start documentation  ─────────────────────── commit title
        A README.md  ─────────────────────────────────────────────────────── changed file
        └─────────────────────────────────────────────────────────────────── modification type
```

## Installation

```shell
npm i -g code-story
```

## Options
| flag                | alias  | description                                                                                 | type    | default |
|---------------------|--------|---------------------------------------------------------------------------------------------|---------|---------|
| `--since`           | `-s`   | Show commits more recent than a specific date.                                              | string  |         |
| `--after`           | `-a`   | Show commits more recent than a specific date.                                              | string  |         |
| `--until`           | `-u`   | Show commits older than a specific date.                                                    | string  |         |
| `--before`          | `-b`   | Show commits older than a specific date.                                                    | string  |         |
| `--trackerUrl`      | `-t`   | Base url in task tracker system.                                                            | string  |         |
| `--author`          |        | Limit the commits output to ones with author header lines that match the specified pattern. | string  |         |
| `--branch`          | `-b`   | Show only commits in the specified branch or revision range.                                | string  |         |
| `--number`          | `-n`   | The number of commits to return                                                             | number  | 999     |
| `--file`            | `-f`   | File filter for the git log command                                                         | string  |         |
| `--committer`       |        | Limit the commits output to ones with author header lines that match the specified pattern. | string  |         |
| `--showCommitFiles` | `--sf` | Show files changed in commits.                                                              | boolean | false   |
| `--clearConsole`    | `--cs` | Clear console before out info                                                               | boolean | false   |
| `--help`            | `-h`   | Show help                                                                                   | boolean |         |
 
### Config files

Support set often use options in:
- `codestory` property in a package.json
- a JSON or YAML, extensionless `.codestoryrc` file
- an `.codestoryrc` with the extensions .json, .yaml, .yml, .js, or .cjs (example: `.codestoryrc.json`)
- a `codestory.config.js` or `codestory.config.cjs` CommonJS 

## Usage
Get commits story by last week

```shell
code-story --since=1.week.ago
```

[npm-url]: https://www.npmjs.com/package/code-story
[npm-image]: https://img.shields.io/npm/v/code-story.svg
[conventional-commits-image]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-url]: https://conventionalcommits.org/

