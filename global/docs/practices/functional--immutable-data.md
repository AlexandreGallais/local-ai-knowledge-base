---
id: functional--immutable-data
title: "Never change a parameter: build a new value"
topic: practices
summary: "In a pure function, 'list.push(x)' changes the caller's list; return '[...list, x]'."
rule: "functional/immutable-data"
sample: ts-pure-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# Never change a parameter: build a new value

Rule: `functional/immutable-data`. In a pure function, "list.push(x)" changes the caller's list; return "[...list, x]".

## Why

Changing what the caller passed is a side effect: another part of the program sees its data change.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Adds a value to a list.
 * @param list - List to extend.
 * @returns The list.
 * @example
 * zzWrong([1]);
 */
export function zzWrong(list: number[]): number[] {
  list.push(1);

  return list;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Adds a value to a list.
 * @param list - List to extend.
 * @returns A new list, the value at its end.
 * @example
 * zzRight([1]); // [1, 1]
 */
export function zzRight(list: readonly number[]): readonly number[] {
  return [...list, 1];
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
