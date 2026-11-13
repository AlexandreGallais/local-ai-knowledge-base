---
id: local--filename-matches-export
title: "The file name is the function name"
topic: practices
summary: "A file that exports the function 'clampAngle' is named 'clamp-angle.ts'."
rule: "local/filename-matches-export"
sample: ts-pure-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# The file name is the function name

Rule: `local/filename-matches-export`. A file that exports the function "clampAngle" is named "clamp-angle.ts".

## Why

The AI and the team find a function by its file name, with a search on the name alone.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Halves a number.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export function half(value: number): number {
  return value / 2;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Halves a number.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export function zzRight(value: number): number {
  return value / 2;
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
