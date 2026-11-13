---
title: "prefer-concat-latest-from"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/prefer-concat-latest-from.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# prefer-concat-latest-from

Use `concatLatestFrom` instead of `withLatestFrom` to prevent the selector from firing until the correct `Action` is dispatched.

- **Type**: problem
- **Fixable**: Yes
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: Yes

## Rule Details

Using `concatLatestFrom` (a lazy version of `withLatestFrom`) ensures that the selector is only invoked when the effect receives the action.
In contrast to `withLatestFrom` that immediately subscribes whether the action is dispatched yet or not. If that state used by the selector is not initialized yet, you could get an error that you're not expecting.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
class Effect {
  detail$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductDetailPage.loaded),
      // ⚠
      withLatestFrom(this.store.select(selectProducts)),
      mergeMap(([action, products]) => {
        ...
      })
    )
  })
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
class Effect {
  detail$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProductDetailPage.loaded),
      concatLatestFrom(() => this.store.select(selectProducts)),
      mergeMap(([action, products]) => {
        ...
      })
    )
  })
}
```

</ngrx-code-example>

## Rule Config

To configure this rule you can use the `strict` option.
The default is `false`.

To always report the uses of `withLatestFrom` use:

```json
"rules": {
  "@ngrx/prefer-concat-latest-from": ["warn", { "strict": true }]
}
```

To report only needed uses of `withLatestFrom` use:

```json
"rules": {
  "@ngrx/prefer-concat-latest-from": ["warn", { "strict": false }]
}
```

## Further reading

- `concatLatestFrom` API
- Incorporating State
