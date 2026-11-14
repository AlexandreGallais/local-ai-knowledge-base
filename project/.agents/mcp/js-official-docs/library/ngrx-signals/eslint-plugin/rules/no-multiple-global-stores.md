---
title: "no-multiple-global-stores"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/no-multiple-global-stores.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# no-multiple-global-stores

There should only be one global store injected.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: Yes
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

There is only one global store, thus there should also only be one global store injected in a class (component, service, ...). Violating this rule is often paired with violating the `no-typed-global-store` rule.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export class Component {
  constructor(
    private readonly customersStore: Store<Customers>,
    private readonly catalogStore: Store<Catalog>
  ) {}
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export class Component {
  constructor(private readonly store: Store) {}
}
```

</ngrx-code-example>
