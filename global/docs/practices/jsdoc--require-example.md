---
id: jsdoc--require-example
title: "Every exported function has an example"
topic: practices
summary: "The JSDoc of an exported function ends with '@example' and a call with its result."
rule: "jsdoc/require-example"
sample: ts-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# Every exported function has an example

Rule: `jsdoc/require-example`. The JSDoc of an exported function ends with "@example" and a call with its result.

## Why

An example shows the units and the result at a glance, for the team and for the AI that calls the function.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Adds one.
 * @param value - Number to work on.
 * @returns The result.
 */
export function zzWrong(value: number): number {
  return value + 1;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Adds one.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export function zzRight(value: number): number {
  return value + 1;
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
