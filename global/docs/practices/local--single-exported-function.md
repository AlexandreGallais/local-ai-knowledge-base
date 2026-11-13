---
id: local--single-exported-function
title: "One exported function per file"
topic: practices
summary: "A library file exports one function and nothing else at run time."
rule: "local/single-exported-function"
sample: ts-pure-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# One exported function per file

Rule: `local/single-exported-function`. A library file exports one function and nothing else at run time.

## Why

One function per file gives one place to read, one test file and one name to search. Types may sit next to the function.

## Wrong

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
export function zzWrong(value: number): number {
  return value + 1;
}

/**
 * Adds two.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export function addTwo(value: number): number {
  return value + 2;
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
