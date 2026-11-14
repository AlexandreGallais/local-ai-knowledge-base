---
title: "avoid-cyclic-effects"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/avoid-cyclic-effects.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# avoid-cyclic-effects

Avoid `Effect` that re-emit filtered actions.

- **Type**: problem
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: Yes
- **Configurable**: No

## Rule Details

This rule prevents that the same action as the filtered action is dispatched in an effect, causing an infinite loop.
Effects that are configured with `dispatch: false`, are discarded.

For the rare cases where you need to re-dispatch the same action, you can disable this rule.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
class Effect {
  details$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomers.pageLoaded),
      map(() => fromCustomers.pageLoaded())
    )
  );

  constructor(private actions$: Actions) {}
}

class Effect {
  details$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomers.pageLoaded),
      tap(() => alert('Customers loaded'))
    )
  );

  constructor(private actions$: Actions) {}
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
class Effect {
  details$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomers.pageLoaded),
      map(() => fromCustomers.pageLoadedSuccess())
    )
  );

  constructor(private actions$: Actions) {}
}

class Effect {
  details$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromCustomers.pageLoaded),
        tap(() => alert('Customers loaded'))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
```

</ngrx-code-example>
