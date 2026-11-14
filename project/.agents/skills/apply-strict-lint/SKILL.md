---
name: apply-strict-lint
description: Use when the user asks to turn on the format and lint of this project, or when they do not run because packages are missing - install the packages of .agents/package.json, add the npm scripts, then format and lint every file.
---

# Turn on the format and lint of the project

The format and lint servers are in `.agents/mcp/`, for the whole team. They lint more or less
according to what is installed: a plugin that is not installed is left out. Angular rules come with
`@angular/core`; JSDoc rules come with `eslint-plugin-jsdoc`.

## Rules

- Install the packages apart from the project: `npm install --prefix .agents`. Run the install
  yourself; OpenCode asks the user to approve it: wait for the answer.
- Install `eslint-plugin-jsdoc` only for a library whose exports must all be documented. Ask the user.
- A copyright line or an Angular selector prefix goes in `.agents/profile.json`: `"copyright"`, `"prefix"`.
- Use a class for an object that lives and keeps its state, a function for a utility. No rule forbids either.

## Steps

1. Run `npm install --prefix .agents`.
2. Ask the user, with the question tool, for the copyright line of the files, if any, and for JSDoc on a library.
   Write the answers in `.agents/profile.json`. For JSDoc, run `npm install --prefix .agents --save-dev --save-exact eslint-plugin-jsdoc@65.4.6`.
3. Add the scripts `format` and `lint` to the project's `package.json`, keeping the ones it has. The
   `README.md` of the format server and of the lint server, in `.agents/mcp/`, give each script.
4. Run `npm run format`, then `npm run lint`. Fix every error left. Look the id of a rule you do not
   know up in the official documentation.
5. Run the build and the tests of the project.

## Example

Wrong: the lint stops on "Cannot find package 'eslint-plugin-unicorn'", and you remove the rule.

Right: you run `npm install --prefix .agents`, then `npm run lint` again.

## Final check

- Are the packages installed, by you, after the user's approval?
- Do `npm run format`, `npm run lint`, the build and the tests end at 0 errors?
