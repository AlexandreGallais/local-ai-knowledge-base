---
title: "use-consistent-global-store-name"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/use-consistent-global-store-name.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# use-consistent-global-store-name

Use a consistent name for the global store.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: Yes
- **Requires type checking**: No
- **Configurable**: Yes

## Rule Details

The name of the global store should be used consistent.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export class ClassOne {
  constructor(private store: Store) {}
}

export class ClassTwo {
  constructor(private customersStore: Store) {}
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export class ClassOne {
  constructor(private store: Store) {}
}

export class ClassTwo {
  constructor(private store: Store) {}
}
```

</ngrx-code-example>

## Rule Config

To configure this rule you can change the preferred `name` of the global store.
The default is `store`.

To change the name of the global store use:

```json
"rules": {
  "@ngrx/use-consistent-global-store-name": ["warn", "store$"]
}
```
