# Format, then lint

How the base formats every file the AI writes, then lints it (decision 0017 of the project). From
the researches R3 and R4 of the base, tried for real on four sample projects kept with the build tools.

The configs are in the project kit, `.agents/lint/`, for the whole team: one config for every project.
It lints more or less according to what the project installs: Angular rules with `@angular/core`, JSDoc
rules with `eslint-plugin-jsdoc`, and a plugin that is not installed is left out. No rule forbids a
class: a class for an object that lives, a function for a utility.

## The two passes

| Pass | When | What it holds | What the AI sees |
| --- | --- | --- | --- |
| Format | After every write (the `formatter` setting of OpenCode runs `tools/format-file.ts`), or `npm run format` | Only rules that fix themselves, no type information | Nothing |
| Lint | Before "done", as the common rules say: `npm run lint` or `tools/lint-file.ts --all` | No layout rule; only what the format pass cannot fix | One line per error left, 20 at most |

A test proves the separation on every run: no rule is active in both passes, the lint pass has no
rule of type "layout", and every rule of the format pass fixes itself.

## Tools of the format pass

| Language | Tools |
| --- | --- |
| TypeScript | ESLint Stylistic 5.10 (`exp-list-style` and the shared config), perfectionist 5.13 (sort everything), two local rules: one parameter per line, one item per line in a list already split |
| Angular templates | angular-eslint 22.6: attribute order, self-closing tags, static strings, `@empty`, `@else`, contextual variables |
| CSS and SCSS | Stylelint 18 with `@stylistic/stylelint-plugin` 6 (its `scss/` rules for SCSS) and `stylelint-order` 8 |
| JSON | eslint-plugin-jsonc 3.4 |

No Prettier, no dprint. The layout of a template (line breaks inside HTML) is not formatted: no
established tool does it besides Prettier.

## What the trials changed from the researches

| Research said | Trial showed | Base does |
| --- | --- | --- |
| `list-style` alone puts one item per line | It leaves lists already written on several lines as they are, and never splits function parameters | Two local rules add those line breaks |
| `sort-keys-in-type-decorator` for Angular decorators | It fights `perfectionist/sort-objects`: circular fixes | Only perfectionist sorts, alphabetically |
| The rules of the Stylistic shared config are all fixable | Four are not (`max-statements-per-line`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-tabs`) | Off in the format pass |
| `@stylistic/*` rules read SCSS | Version 6 needs its `@stylistic/scss/*` rules for SCSS | The SCSS override uses them |
| `eslint-plugin-import-x` | Native resolver binary, heavy | `eslint-plugin-import-lite` and two local rules |
| Stylelint 17 | Stylelint 18 is out | Stylelint 18 with the Stylistic plugin 6 |

## Time on one file

Measured on 2026-11-13 on the samples (second run, Node 24), one process per call.

| File | Format (s) | Lint (s) |
| --- | --- | --- |
| ts-pure-lib/src/clamp.ts | 0.63 | 1.18 |
| ts-lib/src/format-pressure.ts | 0.62 | 1.19 |
| angular-app/src/app/user-list.ts | 0.68 | 1.47 |
| angular-app/src/app/user-list.html | 0.52 | 0.87 |
| angular-app/src/app/user-list.scss | 0.33 | 0.29 |

What keeps it short: one file only at each write; no type information in the format pass; the
typed rules only in the lint pass. A daemon (`eslint_d`) would cut the start-up time, at the cost of
one more package and a process to restart after a config change: not taken for now.
