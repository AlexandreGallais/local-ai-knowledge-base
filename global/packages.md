# Packages of the base

The npm packages of the format and lint passes of a project (`.agents/lint/` of the project kit).
The AI installs them with the user's agreement, at their latest version:
`node /opt/local-ai-base/tools/missing-packages.ts` gives the command. A plugin that is not installed
is simply left out: the project lints more or less according to what it installs.

## Chosen

The version is the one the base was tested with, on its sample projects.

| Package | Tested | License | When | Why |
| --- | --- | --- | --- | --- |
| eslint | 10.14.0 | MIT | all | The lint and format engine |
| @eslint/js | 10.0.1 | MIT | all | The recommended core rules |
| typescript | 6.0.3 | Apache-2.0 | all | Compiler; typescript-eslint and Angular 22 stop below 6.1 |
| typescript-eslint | 8.72.2 | MIT | all | `strictTypeChecked` and the typed rules |
| @stylistic/eslint-plugin | 5.10.0 | MIT | all | Format pass: layout of TypeScript |
| eslint-plugin-perfectionist | 5.13.0 | MIT | all | Format pass: sort imports, members, keys |
| eslint-plugin-jsonc | 3.4.2 | MIT | all | Format pass: JSON |
| eslint-plugin-unicorn | 79.0.0 | MIT | all | Named safety rules |
| eslint-plugin-regexp | 3.3.3 | MIT | all | Regular expressions |
| eslint-plugin-import-lite | 0.6.0 | MIT | all | Import rules that need no resolver: `no-default-export`, `no-mutable-exports` |
| @vitest/eslint-plugin | 1.6.28 | MIT | all | Test files |
| angular-eslint | 22.6.0 | MIT | Angular | Angular code and templates |
| @ngrx/eslint-plugin | 22.0.1 | MIT | Angular | NgRx Signals stores |
| eslint-plugin-rxjs-x | 1.0.6 | MIT | Angular | RxJS |
| stylelint | 18.0.0 | MIT | Angular | CSS and SCSS |
| @stylistic/stylelint-plugin | 6.0.1 | MIT | Angular | Format pass: layout of CSS and SCSS |
| stylelint-order | 8.1.3 | MIT | Angular | Format pass: order of properties |
| stylelint-config-standard-scss | 18.0.0 | MIT | Angular | Lint pass: the standard rules |
| postcss-scss | 4.0.9 | MIT | Angular | SCSS syntax |
| @double-great/stylelint-a11y | 3.8.3 | MIT | Angular | Accessibility of styles |
| eslint-plugin-jsdoc | 65.4.6 | BSD-3-Clause | library | JSDoc on what a library exports: install it in a library only |

"all": every project. "Angular": a project whose `package.json` lists `@angular/core`. "library":
only when the team wants every export documented. An Angular project made by `ng new` already has the
Angular packages; the base adds none of them.

## Vendored in the base

Copied into the global base, so that no project installs it.

| Package | Version | License | Where | Why |
| --- | --- | --- | --- | --- |
| pdfjs-dist (legacy build) | 6.5.438 | Apache-2.0 | `vendor/pdfjs/` | The `parse` tools read PDF files: text with its place, images. Two files, no dependency; its optional canvas package is not needed and not installed. |

## Set aside

| Package | Why |
| --- | --- |
| eslint-plugin-import-x | Depends on `unrs-resolver`, a native binary built per platform: heavy, and one more binary to bring into a closed environment. Its two rules that need a resolver (`no-extraneous-dependencies`, `no-cycle`) are replaced by local rules of the base. |
| eslint-plugin-n | Rules for Node.js programs, not for front-end code. |
| eslint-plugin-functional | Its rules forbid classes and mutation everywhere; the base uses classes for objects that live and functions for utilities. |
