---
title: "select-style"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/select-style.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# select-style

Selector can be used either with `select` as a pipeable operator or as a method.

- **Type**: suggestion
- **Fixable**: Yes
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: Yes

## Rule Details

There are two ways of selecting data from the store, either by using the `this.store.select(selectorFn)` method, or by using the `this.store.pipe(select(selectorFn))` operator. Either way is considered correct, although the first way is preferred as it requires less code and it doesn't require the need to import the `selector` operator.

Because it's important to keep things consistent, this rule disallows using both across the same codebase.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export class Component {
  someData$ = this.store.select(someData);
  otherData$ = this.store.pipe(select(otherData));
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export class Component {
  someData$ = this.store.select(someData);
  otherData$ = this.store.select(otherData);
}
```

</ngrx-code-example>

## Rule Config

To configure this rule you can change the preferred `mode` of the selectors, the allowed values are `method` and `operator`.
The default is `method`.

To prefer the **method** syntax (`this.store.select(selector)`) use:

```json
"rules": {
  "@ngrx/select-style": ["warn", "method"]
}
```

To prefer the **operator** syntax (`this.store.pipe(select(selector))`) use:

```json
"rules": {
  "@ngrx/select-style": ["warn", "operator"]
}
```
