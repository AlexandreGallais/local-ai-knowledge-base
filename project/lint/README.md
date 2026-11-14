# Format and lint of this project

Two passes, for the team and for the AI alike.

- **The format** lays out the code by itself, without a word: Prettier first (`.prettierrc.json`,
  `.editorconfig`, the defaults of an Angular project), then what Prettier does not do: imports and
  class members sorted, blank lines, braces, CSS properties in order, the copyright line.
- **The lint** reports what is left: real errors and recognised good practice, one line each with
  the id of its rule. No rule is a matter of taste: a class for an object that lives, a function for
  a utility, an `enum` or a bitwise operator when it fits.

## Commands

```sh
npm install            # once
npm run format         # format:js then format:scss
npm run format:js      # TypeScript, JavaScript (.mjs, .js), Angular templates, JSON
npm run format:scss    # CSS and SCSS
npm run lint           # lint:js then lint:scss
npm run lint:js        # Prettier check, then ESLint: one line per error
npm run lint:scss      # Prettier check, then Stylelint: one line per error
npm run check          # format, then lint
```

OpenCode formats each file the AI writes (`formatter` of `opencode.json`): ESLint with the format
config on scripts and templates, Prettier on every file, then Stylelint with the format config on
styles. The editor reads `eslint.config.mjs` and `stylelint.config.mjs` by itself.

## Switch a group of rules on or off

`lint/settings.mjs` lists every theme of rules, each `true` or `false`. Switch off what blocks the
team today, without uninstalling its package; switch it on again later. The same file holds the
copyright line, the Angular selector prefix and the folders left out.

| Theme | Pass | What it checks |
| --- | --- | --- |
| `blankLines` | format | blank lines before `return`, after declarations, around blocks |
| `braces` | format | braces around every body of `if`, `else`, `for`, `while` |
| `copyright` | format | the copyright line at the top of each file of `src/` |
| `cssNotation` | format | the notation of the standard Stylelint config: short colors, blank lines... |
| `cssOrder` | format | CSS properties in the order of Recess, declarations before nested rules |
| `sort` | format | imports, exports, types and class members sorted |
| `templateFormat` | format | Angular templates: attributes sorted, self-closing tags |
| `javascript` | lint | recommended rules of ESLint, core rules that catch bugs |
| `typescript` | lint | typescript-eslint `strictTypeChecked`, with the types |
| `imports` | lint | eslint-plugin-import-x: cycles, duplicates, undeclared packages |
| `complexity` | lint | size of files and functions, branches, nesting, parameters |
| `regexp` | lint | eslint-plugin-regexp recommended |
| `unicorn` | lint | the rules of eslint-plugin-unicorn that catch bugs |
| `tests` | lint | @vitest/eslint-plugin recommended, on `*.spec.ts` and `*.test.ts` |
| `jsdoc` | lint | JSDoc on what a library exports; off by default |
| `angular` | lint | angular-eslint recommended, signals, OnPush, file names |
| `angularTemplates` | lint | angular-eslint template recommended, control flow, bindings |
| `accessibility` | lint | angular-eslint template accessibility |
| `rxjs` | lint | eslint-plugin-rxjs-x recommended |
| `ngrxSignals` | lint | @ngrx/eslint-plugin, Signals rules |
| `teamChoices` | lint | the choices of the team: NgRx Signals only, no Material nor CDK, a store lists features |
| `css` | lint | stylelint-config-standard-scss, specificity and nesting |
| `cssAccessibility` | lint | @double-great/stylelint-a11y: focus, motion |

A theme whose packages are not installed is skipped, and the lint says so in one line.

## Files

| File | What it holds |
| --- | --- |
| `eslint.format.config.mjs` | The format of scripts and templates: eslint-config-prettier, then the format themes. |
| `eslint.config.mjs` | The lint of scripts and templates: the format config, then the lint themes. |
| `stylelint.format.config.mjs` | The format of styles: the format themes. |
| `stylelint.config.mjs` | The lint of styles: the format config, then the lint themes. |
| `lint/settings.mjs` | The themes on or off, the copyright line, the selector prefix, the folders left out. |
| `lint/eslint/<theme>.mjs` | One theme of ESLint: what it checks, its rules, each with a comment. |
| `lint/stylelint/<theme>.mjs` | One theme of Stylelint, the same way. |
| `lint/load.mjs` | Loads the themes that are on and installed. |
| `.prettierrc.json`, `.editorconfig`, `.prettierignore` | The layout of Prettier and of the editor. |
| `tsconfig.json` | The strictest compiler options, ES2025, the strict template options of Angular. |

These files belong to the team: change a rule here, and it applies to the editor, to `npm run lint`
and to the AI at once. An update of the kit never replaces them.

## Add a rule, add a theme

- A rule: in the theme it belongs to, with a comment line that says what it catches.
- A theme: a file of `lint/eslint/` that exports `theme`, `packages` and `configs`, its name in
  `THEMES` of `lint/settings.mjs`, and its import in the list of `eslint.config.mjs`.
