---
id: local--no-enum
title: "A union of string literals, not an enum"
topic: practices
summary: "Write 'type State = 'on' | 'off'', never 'enum State'."
rule: "local/no-enum"
sample: ts-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# A union of string literals, not an enum

Rule: `local/no-enum`. Write "type State = 'on' | 'off'", never "enum State".

## Why

An enum is code at run time and is not erasable syntax; a union of literals is a type only, and reads as its values.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

export enum State {
  On = 'on',
  Off = 'off',
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * The state of a pump.
 */
export type State = 'off' | 'on';
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
