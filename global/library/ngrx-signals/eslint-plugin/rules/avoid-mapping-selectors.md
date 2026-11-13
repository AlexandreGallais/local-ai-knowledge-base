---
title: "avoid-mapping-selectors"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/avoid-mapping-selectors.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# avoid-mapping-selectors

Avoid mapping logic outside the selector level.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

A selector is a pure function that is used to derive state.
Because a selector is a pure function (and it's synchronous), it's easier to test.

That's why it's recommended to put (mapping) logic into a selector, instead of in the component by using the RxJS `map` operator.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export class Component {
  name$ = this.store
    .select(selectLoggedInUser)
    .pipe(map((user) => ({ name: user.name })));
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
// in selectors.ts:
export selectLoggedInUserName = createSelector(
  selectLoggedInUser,
  (user) => user.name
)

// in component:
export class Component {
  name$ = this.store.select(selectLoggedInUserName)
}
```

</ngrx-code-example>
