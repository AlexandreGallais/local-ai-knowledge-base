---
name: apply-strict-lint
description: Use when the user asks to turn on the format and lint of this project, to switch a theme of rules on or off, or when they do not run because packages are missing - install the packages, set the settings, then format and lint every file.
---

# Turn on the format and lint of the project

The configs are at the root of the project, for the whole team: `.prettierrc.json` and
`.editorconfig` (the layout), `eslint.format.config.mjs` and `stylelint.format.config.mjs` (what the
format adds to Prettier), `eslint.config.mjs` and `stylelint.config.mjs` (the lint, which includes the
format), and `lint/`. `lint/settings.mjs` switches each theme of rules on or off; `lint/README.md`
lists the themes.

## Rules

- Run the install yourself; OpenCode asks the user to approve it: wait for the answer.
- Switch a theme on or off only when the user asks for it, in `THEMES` of `lint/settings.mjs`.
- In a project without Angular, switch off `templateFormat`, `angular`, `angularTemplates`,
  `accessibility`, `rxjs`, `ngrxSignals` and `teamChoices`. Ask the user first.
- Turn `jsdoc` on only for a library whose exports must all be documented. Ask the user.
- A copyright line or an Angular selector prefix goes in `lint/settings.mjs`: `COPYRIGHT`, `SELECTOR_PREFIX`.
- Use a class for an object that lives and keeps its state, a function for a utility. No rule forbids either.

## Steps

1. Run `npm install`.
2. Ask the user, with the question tool, for the copyright line of the files, if any, and for JSDoc on a library.
   Write the answers in `lint/settings.mjs`.
3. Run `npm run format`, then `npm run lint`. Fix every error left. Look the id of a rule you do not
   know up in the official documentation.
4. Run the build and the tests of the project.

## Example

Wrong: the lint says "the theme "imports" is skipped, its packages are not installed", and you switch
the theme off.

Right: you run `npm install`, then `npm run lint` again.

## Final check

- Are the packages installed, by you, after the user's approval?
- Do `npm run check`, the build and the tests end at 0 errors?
