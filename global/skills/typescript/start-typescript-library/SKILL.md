---
name: start-typescript-library
description: Use when the user asks for a new TypeScript library without Angular - business code or pure functions - in an empty folder.
---

# Start a TypeScript library

## Rules

- The user runs every command that installs or downloads: give the command, wait for their answer.
- TypeScript only, never plain JavaScript. Vitest for tests.

## Steps

1. Ask with the question tool, one question at a time:
   - business library (`ts-lib`) or library of pure functions (`ts-pure-lib`);
   - the name of the package (kebab-case);
   - the copyright header of the files.
2. Write `package.json` (`"type": "module"`, `"private": true`, scripts `build: tsc -p tsconfig.json` and
   `test: vitest run`), `tsconfig.json` extending `.agents/lint/tsconfig.strict.json`, and `src/`.
3. Write `.agents/profile.json` with the profile and the copyright header.
4. Ask the user to run `node /opt/local-ai-base/tools/install-lint.ts .`, then to install the packages
   of the profile listed in `/opt/local-ai-base/packages.md`, at their pinned versions.
5. Write a first function with the skill `write-library-function`, and run the checks until 0 errors.
6. Write the subject of the library in `AGENTS.md`, in two lines.

## Example

Wrong:

```text
I created index.js and ran npm install lodash.
```

Right:

```text
Run this command, then tell me when it is done:
node /opt/local-ai-base/tools/install-lint.ts .
```

## Final check

- Is every file in TypeScript, and `.agents/profile.json` written?
- Did the user run every install, and do the checks end at 0 errors?
