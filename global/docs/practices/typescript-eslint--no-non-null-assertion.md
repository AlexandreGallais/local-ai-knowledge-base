---
id: typescript-eslint--no-non-null-assertion
title: "No "!" after a value that may be missing"
topic: practices
summary: "'list[0]!' hides a missing value; give a default with '??' or check it first."
rule: "@typescript-eslint/no-non-null-assertion"
sample: ts-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# No "!" after a value that may be missing

Rule: `@typescript-eslint/no-non-null-assertion`. "list[0]!" hides a missing value; give a default with "??" or check it first.

## Why

With noUncheckedIndexedAccess, list[0] may be undefined: "!" turns a type error into a crash at run time.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Gives the first value.
 * @param list - Values to read.
 * @returns The first value.
 * @example
 * zzWrong([3]); // 3
 */
export function zzWrong(list: readonly number[]): number {
  return list[0]!;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Gives the first value.
 * @param list - Values to read.
 * @returns The first value, or 0 for an empty list.
 * @example
 * zzRight([3]); // 3
 */
export function zzRight(list: readonly number[]): number {
  return list[0] ?? 0;
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
