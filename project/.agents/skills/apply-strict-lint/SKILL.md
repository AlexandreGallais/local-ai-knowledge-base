---
name: apply-strict-lint
description: Use when the user asks to turn on the format and lint of this project, or when they do not run because packages are missing - install the packages, check the scripts and the settings, then format and lint every file.
---

# Turn on the format and lint of the project

The configs are at the root of the project, for the whole team: `eslint.format.config.mjs` (the
format), `eslint.config.mjs` (the lint, which imports the format), the two Stylelint configs, and
`lint/`. They lint more or less according to what is installed: a plugin that is not installed is
left out. Angular rules come with `@angular/core`; JSDoc rules come with `eslint-plugin-jsdoc`.

## Rules

- Run the install yourself; OpenCode asks the user to approve it: wait for the answer.
- Install `eslint-plugin-jsdoc` only for a library whose exports must all be documented. Ask the user.
- A copyright line or an Angular selector prefix goes in `lint/settings.mjs`: `COPYRIGHT`, `SELECTOR_PREFIX`.
- Use a class for an object that lives and keeps its state, a function for a utility. No rule forbids either.

## Steps

1. Read the `scripts` of `package.json`. When `format`, `lint` or `check` is missing, copy it from `lint/packages.json`.
2. Run `npm install`.
3. Ask the user, with the question tool, for the copyright line of the files, if any, and for JSDoc on a library.
   Write the copyright line in `lint/settings.mjs`. For JSDoc, run `npm install --save-dev --save-exact eslint-plugin-jsdoc@65.4.6`.
4. Run `npm run format`, then `npm run lint`. Fix every error left. Look the id of a rule you do not
   know up in the official documentation.
5. Run the build and the tests of the project.

## Example

Wrong: the lint stops on "Cannot find package 'eslint-plugin-unicorn'", and you remove the rule.

Right: you run `npm install`, then `npm run lint` again.

## Final check

- Are the packages installed, by you, after the user's approval?
- Do `npm run check`, the build and the tests end at 0 errors?
