---
title: "enforce-type-call"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/enforce-type-call.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# enforce-type-call

The `type` function must be called.

- **Type**: problem
- **Fixable**: Yes
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

This rule ensures that the `type` function from `@ngrx/signals` is properly called when used to define types. The function must be invoked with parentheses `()` after the generic type parameter.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
import { type } from '@ngrx/signals';
const stateType = type<{ count: number }>;
```

</ngrx-code-example>

```ts
import { type as typeFn } from '@ngrx/signals';
const stateType = typeFn<{ count: number }>;
```

Examples of **correct** code for this rule:

```ts
import { type } from '@ngrx/signals';
const stateType = type<{ count: number }>();
```

<ngrx-code-example>

```ts
import { type as typeFn } from '@ngrx/signals';
const stateType = typeFn<{ count: number; name: string }>();
```

</ngrx-code-example>

## Further reading

- Signal Store Documentation
