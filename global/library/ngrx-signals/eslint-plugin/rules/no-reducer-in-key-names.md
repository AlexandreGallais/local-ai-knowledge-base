---
title: "no-reducer-in-key-names"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/no-reducer-in-key-names.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# no-reducer-in-key-names

Avoid the word "reducer" in the key names.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: Yes
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
StoreModule.forRoot({
  customersReducer: customersReducer,
});

StoreModule.forFeature({
  customersReducer,
});

export const reducers: ActionReducerMap<AppState> = {
  customersReducer: fromCustomers.reducer,
};
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
StoreModule.forRoot({
  customers: customersReducer,
});

StoreModule.forFeature({
  customers: customersReducer,
});

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.reducer,
};
```

</ngrx-code-example>

## Further reading

- Redux Style Guide: Name State Slices Based On the Stored Data
