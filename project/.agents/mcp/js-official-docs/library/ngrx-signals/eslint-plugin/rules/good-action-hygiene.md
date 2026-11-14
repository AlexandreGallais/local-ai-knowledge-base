---
title: "good-action-hygiene"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/good-action-hygiene.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# good-action-hygiene

Ensures the use of good action hygiene.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

An action should be a unique event in the application.
An action should:

- tell where it's dispatched
- tell what event has occurred

The template we use for an action's type is `[Source] Event`.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export const customersRefresh = createAction('Refresh Customers');
export const customersLoadedSuccess = createAction(
  'Customers Loaded Success'
);
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export const customersRefresh = createAction(
  '[Customers Page] Refresh clicked'
);
export const customersLoadedSuccess = createAction(
  '[Customers API] Customers Loaded Success'
);
```

</ngrx-code-example>

## Further reading

- Good Action Hygiene with NgRx Mike Ryan
