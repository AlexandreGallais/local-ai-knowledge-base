# Format and lint of this project

Two passes, for the team and for the AI alike. The format fixes the layout by itself; the lint
reports what is left: bad practice, risk, complexity. The lint config imports the format config, so
there is one set of rules and no conflict between them.

## Usage

```sh
npm install        # once: the packages the import added to package.json
npm run format     # fix the layout of every file
npm run lint       # one line per error left, with the id of its rule
npm run check      # both, in this order
```

OpenCode runs the format on each file the AI writes (`formatter` of `opencode.json`). The editor
reads `eslint.config.mjs` and `stylelint.config.mjs` by itself.

## Where to change what

| File | What it holds |
| --- | --- |
| `eslint.format.config.mjs` | The format of TypeScript, Angular templates and JSON: rules that fix themselves only. |
| `eslint.config.mjs` | The lint: the format, then one layer per kind of file (TypeScript, Angular, stores, tests, JSDoc). |
| `stylelint.format.config.mjs` | The format of CSS and SCSS. |
| `stylelint.config.mjs` | The lint of CSS and SCSS: the standard config, the format, then the quality rules. |
| `lint/settings.mjs` | The settings of the project: copyright line, Angular selector prefix, folders left out. |
| `lint/local-rules.mjs` | The local rules, in an ESLint plugin named `local`. |
| `lint/optional.mjs` | Leaves out the rules of a plugin that is not installed. |
| `lint/project.mjs` | Reads `package.json` (Angular, JSDoc) and the settings. |
| `lint/formatter.cjs` | The short output of `npm run lint`. |
| `lint/packages.json` | The scripts and the packages the import adds to `package.json`, when they are missing. |
| `lint/tsconfig.strict.json` | The strictest compiler options; a `tsconfig.json` may extend it. |

A rule changed in one of these files applies to the editor, to `npm run lint` and to the AI at once.
These files belong to the team: an update of the kit never replaces them.

## Packages

Every project: eslint, @eslint/js, typescript, typescript-eslint, @stylistic/eslint-plugin,
eslint-plugin-perfectionist, eslint-plugin-jsonc, eslint-plugin-unicorn, eslint-plugin-regexp,
eslint-plugin-import-lite, @vitest/eslint-plugin, stylelint, stylelint-config-standard-scss,
postcss-scss, @stylistic/stylelint-plugin, stylelint-order, @double-great/stylelint-a11y.

An Angular project (one that lists `@angular/core`): angular-eslint, @ngrx/eslint-plugin,
eslint-plugin-rxjs-x.

On demand: eslint-plugin-jsdoc, to ask JSDoc on everything a library exports. Install it and its
rules turn on.

Set aside: eslint-plugin-import-x (a native binary per platform), eslint-plugin-n (Node programs,
not front-end code), eslint-plugin-functional (forbids classes everywhere).
