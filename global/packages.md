# Packages of the base

The npm packages a project of the base installs, once, with the user's agreement (decision 0016 of
the project: known, maintained, needed; version pinned; license noted). The AI never installs a
package of its own accord.

## Chosen

Versions pinned exactly; every one was installed and run on the four sample projects
(`samples/package.json`). A profile installs only what it uses.

| Package | Version | License | Profiles | Why |
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
| vitest | 5.1.0 | MIT | all | Test runner |
| eslint-plugin-jsdoc | 65.4.6 | BSD-3-Clause | angular-lib, ts-lib, ts-pure-lib | JSDoc on what a library exports |
| eslint-plugin-functional | 10.0.1 | MIT | ts-pure-lib | Pure functions: no mutation, no class |
| angular-eslint | 22.6.0 | MIT | angular-app, angular-lib | Angular code and templates |
| @ngrx/eslint-plugin | 22.0.1 | MIT | angular-app, angular-lib | NgRx Signals stores |
| eslint-plugin-rxjs-x | 1.0.6 | MIT | angular-app, angular-lib | RxJS |
| stylelint | 18.0.0 | MIT | angular-app, angular-lib | CSS and SCSS |
| @stylistic/stylelint-plugin | 6.0.1 | MIT | angular-app, angular-lib | Format pass: layout of CSS and SCSS |
| stylelint-order | 8.1.3 | MIT | angular-app, angular-lib | Format pass: order of properties |
| stylelint-config-standard-scss | 18.0.0 | MIT | angular-app, angular-lib | Lint pass: the standard rules |
| postcss-scss | 4.0.9 | MIT | angular-app, angular-lib | SCSS syntax |
| @double-great/stylelint-a11y | 3.8.3 | MIT | angular-app, angular-lib | Accessibility of styles |

## Set aside

| Package | Why |
| --- | --- |
| eslint-plugin-import-x | Depends on `unrs-resolver`, a native binary built per platform: heavy, and one more binary to bring into a closed environment. Its two rules that need a resolver (`no-extraneous-dependencies`, `no-cycle`) are replaced by local rules of the base. |
| eslint-plugin-n | Rules for Node.js programs, not for front-end code. |

The rest of the list comes with the formatting and lint profiles.
