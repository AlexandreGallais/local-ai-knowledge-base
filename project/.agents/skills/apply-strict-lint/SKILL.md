---
name: apply-strict-lint
description: Use when the user asks to turn on the format and lint of this project, or when they do not run because packages are missing - install the lint packages at their latest version, add the npm scripts, then format and lint every file.
---

# Turn on the format and lint of the project

The configs are already in `.agents/lint/`, for the whole team. They lint more or less according to
what the project installs: a plugin that is not installed is left out. Angular rules come with
`@angular/core`; JSDoc rules come with `eslint-plugin-jsdoc`.

## Rules

- Install the latest version of each package: `<name>@latest`. Run the install yourself; OpenCode asks
  the user to approve it: wait for the answer.
- Install `eslint-plugin-jsdoc` only for a library whose exports must all be documented. Ask the user.
- A copyright line or an Angular selector prefix goes in `.agents/profile.json`: `"copyright"`, `"prefix"`.
- Use a class for an object that lives and keeps its state, a function for a utility. No rule forbids either.

## Steps

1. Run `node /opt/local-ai-base/tools/missing-packages.ts`. It prints one `npm install` command: run it.
2. Ask the user, with the question tool, for the copyright line of the files, if any, and for JSDoc on a library.
   Write the answers in `.agents/profile.json`; install `eslint-plugin-jsdoc@latest` if asked.
3. Add the scripts to `package.json`, keeping the ones it has:
   - `"format": "eslint --config .agents/lint/format.config.mjs --fix ."`
   - `"lint": "eslint --config .agents/lint/lint.config.mjs ."`
   - with CSS or SCSS files, add to each: `&& stylelint --config .agents/lint/stylelint-format.mjs --fix "**/*.{css,scss}"`,
     and `--config .agents/lint/stylelint-lint.mjs` for the lint.
4. Run `npm run format`, then `npm run lint`. Fix every error left. Search the id of a rule you do not
   know with the `docs` tools.
5. Run the build and the tests of the project.

## Example

Wrong: the lint stops on "Cannot find package 'eslint-plugin-unicorn'", and you remove the rule.

Right: you run `node /opt/local-ai-base/tools/missing-packages.ts`, then the install command it gives,
then `npm run lint` again.

## Final check

- Are the packages installed at their latest version, by you, after the user's approval?
- Do `npm run format`, `npm run lint`, the build and the tests end at 0 errors?
