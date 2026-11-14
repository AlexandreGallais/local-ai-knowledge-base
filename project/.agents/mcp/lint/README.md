# Brick `lint`

The lint of TypeScript, Angular templates, JSON, CSS and SCSS: only what the format pass cannot fix
(bad practice, risk, complexity), one line per error with the id of its rule. One config for every
project: it lints more or less according to what is installed. Classes for objects that live,
functions for utilities: no rule forbids either.

## What it holds

| File | Role |
| --- | --- |
| `server.ts` | The MCP server `lint`: `lint_file` on one file, `lint_project` on the whole project. |
| `lint-file.ts` | The same lint as a command, for a terminal. |
| `run.ts` | Runs ESLint and Stylelint with the configs below. |
| `lint.config.mjs`, `lint.mjs` | The ESLint lint pass, one config per kind of file. |
| `stylelint-lint.mjs` | The Stylelint lint pass for CSS and SCSS. |
| `tsconfig.strict.json` | The strictest compiler options, for a project that wants them. |
| `local-plugin.mjs`, `optional.mjs`, `options.mjs` | Local rules, plugins left out when missing, options read from `package.json` and `.agents/profile.json`. |
| `mcp.ts` | The small MCP core, the same copy in every brick. |
| `rules.md` | The rules the AI reads at every request. |

## Packages

`.agents/package.json` lists them; `npm install --prefix .agents` installs them apart from the
project. A plugin that is not installed is left out, with its rules.

| Package | When | Why |
| --- | --- | --- |
| eslint, @eslint/js, typescript, typescript-eslint | always | The engine, the core rules, the typed rules |
| @stylistic/eslint-plugin, eslint-plugin-perfectionist, eslint-plugin-jsonc | always | Used by the format brick |
| eslint-plugin-unicorn, eslint-plugin-regexp, eslint-plugin-import-lite, @vitest/eslint-plugin | always | Safety, regular expressions, imports, test files |
| angular-eslint, @ngrx/eslint-plugin, eslint-plugin-rxjs-x | Angular | Angular code and templates, NgRx Signals, RxJS |
| stylelint, stylelint-config-standard-scss, postcss-scss, @double-great/stylelint-a11y | CSS, SCSS | Styles and their accessibility |
| @stylistic/stylelint-plugin, stylelint-order | CSS, SCSS | Used by the format brick |
| eslint-plugin-jsdoc | on demand | JSDoc on what a library exports: add it to `.agents/package.json` to turn it on |

Set aside: eslint-plugin-import-x (a native binary per platform), eslint-plugin-n (Node programs,
not front-end code), eslint-plugin-functional (forbids classes everywhere).

## Usage

From the project root:

```sh
node .agents/mcp/lint/lint-file.ts src/app/a.ts   # one file
node .agents/mcp/lint/lint-file.ts --all          # the whole project
```

Exit code 0: no error; 1: errors left; 2: the lint could not run.

The script for the project's `package.json`: `"lint": "node .agents/mcp/lint/lint-file.ts --all"`.

## Remove it

Delete this folder, then remove the line `lint` from `opencode.json` (the next import of the kit
removes it too). The other bricks do not use it.
