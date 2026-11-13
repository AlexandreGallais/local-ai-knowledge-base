---
title: "prefer-protected-state"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/prefer-protected-state.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# prefer-protected-state

A Signal Store prefers protected state

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: Yes
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

This rule ensures that state changes are only managed by the Signal Store to prevent unintended modifications and provide clear ownership of where changes occur.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
const Store = signalStore({ protectedState: false }, withState({}));
```

</ngrx-code-example>

Examples of **correct** code for this rule:

```ts
const Store = signalStore(withState({}));
```

<ngrx-code-example>

```ts
const Store = signalStore({ protectedState: true }, withState({}));
```

</ngrx-code-example>
