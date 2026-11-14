---
title: "Overview"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/index.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# Overview

ESLint helps enforce best practices and avoid common pitfalls in applications.

The NgRx ESLint Plugin is no different and promotes the key <example-value> to create maintainable projects.
It consists of rules that are grouped into predefined configurations for each NgRx package to provide a quick starting point.

By default, all rules set the severity level to `error`.
Some rules also include a recommendation or an automatic fix using `ng lint --fix`.

## Configuration and Usage

### ESLint Flat Config

The NgRx ESLint Plugin supports ESLint v9 and later through flat config files, for example `eslint.config.js`.
Predefined configurations can be added to the `extends` array, and rules can be overridden via the `rules` property.

<ngrx-code-example>

```ts
const tseslint = require('typescript-eslint');
const ngrx = require('@ngrx/eslint-plugin');

module.exports = tseslint.config({
  files: ['**/*.ts'],
  extends: [
    // Use all rules at once.
    ...ngrx.configs.all,
    // Or only import the rules for a specific package.
    ...ngrx.configs.store,
    ...ngrx.configs.effects,
    ...ngrx.configs.componentStore,
    ...ngrx.configs.operators,
    ...ngrx.configs.signals,
    // Include rules that require type information.
    ...ngrx.configs.allTypeChecked,
    ...ngrx.configs.effectsTypeChecked,
    ...ngrx.configs.signalsTypeChecked,
  ],
  rules: {
    // Configure specific rules.
    '@ngrx/with-state-no-arrays-at-root-level': 'warn',
  },
});
```

</ngrx-code-example>

Rules that require type information need `parserOptions` configuration. For more information, see the TypeScript ESLint documentation.

```ts
const tseslint = require('typescript-eslint');
const ngrx = require('@ngrx/eslint-plugin');

module.exports = tseslint.config({
  files: ['**/*.ts'],
  extends: [
    // Rules that require type information.
    ...ngrx.configs.allTypeChecked,
    ...ngrx.configs.effectsTypeChecked,
    ...ngrx.configs.signalsTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
});
```

## Rules

### component-store

| Name                                                                                                                    | Description                                                                             | Category   | Fixable | Has suggestions | Configurable | Requires type information |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------- | ------- | --------------- | ------------ | ------------------------- |
| @ngrx/avoid-combining-component-store-selectors | Prefer combining selectors at the selector level.                                       | suggestion | No      | No              | No           | No                        |
| @ngrx/avoid-mapping-component-store-selectors     | Avoid mapping logic outside the selector level.                                         | problem    | No      | No              | No           | No                        |
| @ngrx/require-super-ondestroy                                     | Overriden ngOnDestroy method in component stores require a call to super.ngOnDestroy(). | problem    | No      | No              | No           | No                        |
| @ngrx/updater-explicit-return-type                           | `Updater` should have an explicit return type.                                          | problem    | No      | No              | No           | No                        |

### effects

| Name                                                                                                                    | Description                                                                                     | Category   | Fixable | Has suggestions | Configurable | Requires type information |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- | ------- | --------------- | ------------ | ------------------------- |
| @ngrx/avoid-cyclic-effects                                           | Avoid `Effect` that re-emit filtered actions.                                                   | problem    | No      | No              | No           | Yes                       |
| @ngrx/no-dispatch-in-effects                                       | `Effect` should not call `store.dispatch`.                                                      | suggestion | No      | Yes             | No           | No                        |
| @ngrx/no-effects-in-providers                                     | `Effect` should not be listed as a provider if it is added to the `EffectsModule`.              | problem    | Yes     | No              | No           | No                        |
| @ngrx/no-multiple-actions-in-effects                       | `Effect` should not return multiple actions.                                                    | problem    | No      | No              | No           | Yes                       |
| @ngrx/prefer-action-creator-in-of-type                   | Using `action creator` in `ofType` is preferred over `string`.                                  | suggestion | No      | No              | No           | No                        |
| @ngrx/prefer-effect-callback-in-block-statement | A block statement is easier to troubleshoot.                                                    | suggestion | Yes     | No              | No           | No                        |
| @ngrx/use-effects-lifecycle-interface                     | Ensures classes implement lifecycle interfaces corresponding to the declared lifecycle methods. | suggestion | Yes     | No              | No           | No                        |

### operators

| Name                                                                                    | Description                                                                                                                      | Category | Fixable | Has suggestions | Configurable | Requires type information |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | --------------- | ------------ | ------------------------- |
| @ngrx/prefer-concat-latest-from | Use `concatLatestFrom` instead of `withLatestFrom` to prevent the selector from firing until the correct `Action` is dispatched. | problem  | Yes     | No              | Yes          | No                        |

### signals

| Name                                                                                                                          | Description                                                                       | Category   | Fixable | Has suggestions | Configurable | Requires type information |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------- | ------- | --------------- | ------------ | ------------------------- |
| @ngrx/enforce-type-call                                                       | The `type` function must be called.                                               | problem    | Yes     | No              | No           | No                        |
| @ngrx/prefer-protected-state                                             | A Signal Store prefers protected state                                            | suggestion | No      | Yes             | No           | No                        |
| @ngrx/signal-state-no-arrays-at-root-level                 | signalState should accept a record or dictionary as an input argument.            | problem    | No      | No              | No           | Yes                       |
| @ngrx/signal-store-feature-should-use-generic-type | A custom Signal Store feature that accepts an input should define a generic type. | problem    | Yes     | No              | No           | No                        |
| @ngrx/with-state-no-arrays-at-root-level                     | withState should accept a record or dictionary as an input argument.              | problem    | No      | No              | No           | Yes                       |

### store

| Name                                                                                                                                    | Description                                                                      | Category   | Fixable | Has suggestions | Configurable | Requires type information |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------- | ------- | --------------- | ------------ | ------------------------- |
| @ngrx/avoid-combining-selectors                                                 | Prefer combining selectors at the selector level.                                | suggestion | No      | No              | No           | No                        |
| @ngrx/avoid-dispatching-multiple-actions-sequentially     | It is recommended to only dispatch one `Action` at a time.                       | suggestion | No      | No              | No           | No                        |
| @ngrx/avoid-duplicate-actions-in-reducer                               | A `Reducer` should handle an `Action` once.                                      | suggestion | No      | Yes             | No           | No                        |
| @ngrx/avoid-mapping-selectors                                                     | Avoid mapping logic outside the selector level.                                  | suggestion | No      | No              | No           | No                        |
| @ngrx/good-action-hygiene                                                             | Ensures the use of good action hygiene.                                          | suggestion | No      | No              | No           | No                        |
| @ngrx/no-multiple-global-stores                                                 | There should only be one global store injected.                                  | suggestion | No      | Yes             | No           | No                        |
| @ngrx/no-reducer-in-key-names                                                     | Avoid the word "reducer" in the key names.                                       | suggestion | No      | Yes             | No           | No                        |
| @ngrx/no-store-subscription                                                         | Using the `async` pipe is preferred over `store` subscription.                   | suggestion | No      | No              | No           | No                        |
| @ngrx/no-typed-global-store                                                         | The global store should not be typed.                                            | suggestion | No      | Yes             | No           | No                        |
| @ngrx/on-function-explicit-return-type                                   | `On` function should have an explicit return type.                               | suggestion | No      | Yes             | No           | No                        |
| @ngrx/prefer-action-creator-in-dispatch                                 | Using `action creator` in `dispatch` is preferred over `object` or old `Action`. | suggestion | No      | No              | No           | No                        |
| @ngrx/prefer-action-creator                                                         | Using `action creator` is preferred over `Action class`.                         | suggestion | No      | No              | No           | No                        |
| @ngrx/prefer-inline-action-props                                               | Prefer using inline types instead of interfaces, types or classes.               | suggestion | No      | Yes             | No           | No                        |
| @ngrx/prefer-one-generic-in-create-for-feature-selector | Prefer using a single generic to define the feature state.                       | suggestion | No      | Yes             | No           | No                        |
| @ngrx/prefer-selector-in-select                                                 | Using a selector in the `select` is preferred over `string` or `props drilling`. | suggestion | No      | No              | No           | No                        |
| @ngrx/prefix-selectors-with-select                                           | The selector should start with "select", for example "selectEntity".             | suggestion | No      | Yes             | No           | No                        |
| @ngrx/select-style                                                                           | Selector can be used either with `select` as a pipeable operator or as a method. | suggestion | Yes     | No              | Yes          | No                        |
| @ngrx/use-consistent-global-store-name                                   | Use a consistent name for the global store.                                      | suggestion | No      | Yes             | Yes          | No                        |

## Configurations

| Name                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------- |
| all-type-checked         |
| all                                   |
| component-store           |
| effects-type-checked |
| effects                           |
| operators                       |
| signals-type-checked |
| signals                           |
| store                               |
