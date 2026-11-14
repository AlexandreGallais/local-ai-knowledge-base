---
title: "use-effects-lifecycle-interface"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/use-effects-lifecycle-interface.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# use-effects-lifecycle-interface

Ensures classes implement lifecycle interfaces corresponding to the declared lifecycle methods.

- **Type**: suggestion
- **Fixable**: Yes
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

If a class is using an effect lifecycle hook, it should implement the corresponding interface.
This prevents signature typos, and it's safer if the signature changes in the future.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
class Effect {
  ngrxOnInitEffects(): Action {
    return { type: '[Effect] Init' };
  }
}
```

</ngrx-code-example>

```ts
class Effect {
  constructor(private actions$: Actions) {}

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType('LOGGED_IN'),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType('LOGGED_OUT')))
        )
      )
    );
  }
}
```

Examples of **correct** code for this rule:

```ts
import { OnInitEffects } from '@ngrx/effects';

class Effect implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return { type: '[Effect] Init' };
  }
}
```

<ngrx-code-example>

```ts
import { OnRunEffects } from '@ngrx/effects';

class Effect implements OnRunEffects {
  constructor(private actions$: Actions) {}
  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType('LOGGED_IN'),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType('LOGGED_OUT')))
        )
      )
    );
  }
}
```

</ngrx-code-example>

## Further reading

- Effect lifecycle docs
