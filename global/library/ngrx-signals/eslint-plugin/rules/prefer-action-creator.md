---
title: "prefer-action-creator"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/prefer-action-creator.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# prefer-action-creator

Using `action creator` is preferred over `Action class`.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
class Test implements Action {
  type = '[Customer Page] Load Customer';
}

class Test implements ngrx.Action {
  readonly type = ActionTypes.success;

  constructor(readonly payload: Payload) {}
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
export const loadUser = createAction('[User Page] Load User');

class Test {
  type = '[Customer Page] Load Customer';
}

class Test implements Action {
  member = '[Customer Page] Load Customer';
}
```

</ngrx-code-example>
