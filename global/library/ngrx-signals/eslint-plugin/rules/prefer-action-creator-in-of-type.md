---
title: "prefer-action-creator-in-of-type"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/prefer-action-creator-in-of-type.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# prefer-action-creator-in-of-type

Using `action creator` in `ofType` is preferred over `string`.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
effectNOK = createEffect(() => this.actions$.pipe(ofType('PING')));

effectNOK1 = createEffect(() =>
  this.actions$.pipe(ofType(BookActions.load, 'PONG'))
);
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
effectOK = createEffect(() =>
  this.actions$.pipe(ofType(userActions.ping.type))
);
```

</ngrx-code-example>
