---
name: start-typescript-library
description: Use when the user asks for a new TypeScript library without Angular - business code or pure functions - in an empty folder.
---

# Start a TypeScript library

## Rules

- The user runs every command that installs or downloads: give the command, wait for their answer.
- TypeScript only, never plain JavaScript. Vitest for tests.

## Steps

1. Read `.agents/profile.json`: the welcome wrote the profile (`ts-lib` or `ts-pure-lib`), the subject,
   the copyright and the lint configs. If it is missing, load the skill `welcome` first.
2. Ask with the question tool: the name of the package (kebab-case).
3. Write `package.json` (`"type": "module"`, `"private": true`, scripts `build: tsc -p tsconfig.json` and
   `test: vitest run`; `"sideEffects": false` for `ts-pure-lib`), `tsconfig.json` extending
   `.agents/lint/tsconfig.strict.json`, and `src/`. When `package.json` exists, add to it: keep its
   `devDependencies` and `scripts`, `@opencode/cli` above all.
4. Ask the user to install the packages of the profile listed in `/opt/local-ai-base/packages.md`, at
   their pinned versions.
5. Write a first function with the skill `write-library-function`, and run the checks until 0 errors.

## Example

Wrong:

```text
I created index.js and ran npm install lodash.
```

Right:

```text
Install these packages, then tell me when it is done (list of /opt/local-ai-base/packages.md):
npm install --save-dev typescript@6.0.3 vitest@5.1.0
```

## Final check

- Is every file in TypeScript, and was `.agents/profile.json` left to the welcome?
- Did the user run every install, and do the checks end at 0 errors?
