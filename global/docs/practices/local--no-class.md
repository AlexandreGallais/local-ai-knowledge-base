---
id: local--no-class
title: "No class in a pure function library"
topic: practices
summary: "A pure function library holds functions only: no class, no 'this'."
rule: "local/no-class"
sample: ts-pure-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# No class in a pure function library

Rule: `local/no-class`. A pure function library holds functions only: no class, no "this".

## Why

A class keeps state between calls. A pure function gives the same result for the same input, and is tested with values alone.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

export class Counter {
  public count = 0;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Gives the next count.
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
