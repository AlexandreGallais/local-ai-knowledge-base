---
title: "prefer-action-creator-in-dispatch"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/prefer-action-creator-in-dispatch.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# prefer-action-creator-in-dispatch

Using `action creator` in `dispatch` is preferred over `object` or old `Action`.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
store$.dispatch(new CustomAction());

this.store$.dispatch(new AuthActions.Login({ type }));

this.store$.dispatch({ type: 'custom' });
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
store$.dispatch(action);

this.store$.dispatch(BookActions.load());

this.store$.dispatch(AuthActions.Login({ payload }));
```

</ngrx-code-example>
