---
title: "avoid-duplicate-actions-in-reducer"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/avoid-duplicate-actions-in-reducer.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# avoid-duplicate-actions-in-reducer

A `Reducer` should handle an `Action` once.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: Yes
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

While it's technically allowed to handle an action more than once in a reducer, this often means something is wrong. Probably this is just a typo or a copy-paste mistake. When that's not the case, it's often desired to rethink and refactor the reducer.

A valid reason why an action can be handled more than once in a single reducer, is when the reducer is consumed by a higher-order reducer. If that's the case, this rule isn't triggered.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export const reducer = createReducer(
  initialState,
  on(customerLoaded, (state) => ({ ...state, status: 'loaded' })),
  on(customerLoaded, (state) => ({ ...state, status: 'loaded' }))
);
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export const reducer = createReducer(
  initialState,
  on(customerLoaded, (state) => ({ ...state, status: 'loaded' }))
);
```

</ngrx-code-example>
