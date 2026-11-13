---
title: "prefer-effect-callback-in-block-statement"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/prefer-effect-callback-in-block-statement.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# prefer-effect-callback-in-block-statement

A block statement is easier to troubleshoot.

- **Type**: suggestion
- **Fixable**: Yes
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

This rule prefers that the callback of an effect is a block statement.
This makes it easier to troubleshoot type errors, for when example an RxJS operator isn't imported.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
class Effect {
  effectNOK = createEffect(() =>
    this.actions.pipe(
      ofType(detailsLoaded),
      concatMap(() => ...),
    )
  )
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
class Effect {
  effectOK = createEffect(() => {
    return this.actions.pipe(
      ofType(detailsLoaded),
      concatMap(() => ...),
    )
  })
}
```

</ngrx-code-example>

## Further reading

- https://github.com/ngrx/platform/issues/2192
