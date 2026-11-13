---
title: "avoid-mapping-component-store-selectors"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/avoid-mapping-component-store-selectors.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# avoid-mapping-component-store-selectors

Avoid mapping logic outside the selector level.

- **Type**: problem
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export class UserStore extends ComponentStore<UserState> {
  loggedInUser$ = this.select((state) => state.loggedInUser);
  //                                           ⚠ Avoid mapping logic outside the selector level.
  name$ = this.select((state) => state.loggedInUser).pipe(
    map((user) => user.name)
  );
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export class UserStore extends ComponentStore<UserState> {
  loggedInUser$ = this.select((state) => state.loggedInUser);

  name$ = this.select(this.loggedInUser$, (user) => user.name);
}
```

</ngrx-code-example>
