---
title: "no-typed-global-store"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/no-typed-global-store.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# no-typed-global-store

The global store should not be typed.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: Yes
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

Typing the global `Store` is redundant because selectors are type-safe, so adding the generic state interface while injecting the store is unnecessary.
Providing the wrong type can also result in unexpected type-related problems. See discussion for more info.

To prevent a misconception that there are multiple stores (and even that multiple stores are injected into the same component, see `no-multiple-global-stores`), we only want to inject 1 global store into components, effects, and services.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export class Component {
  data$ = this.store.select(data);

  constructor(private readonly store: Store<{ data: Data }>) {}
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export class Component {
  data$ = this.store.select(data);

  constructor(private readonly store: Store) {}
}
```

</ngrx-code-example>
