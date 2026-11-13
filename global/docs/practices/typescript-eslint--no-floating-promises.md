---
id: typescript-eslint--no-floating-promises
title: "Wait for every promise"
topic: practices
summary: "A promise that nobody awaits loses its errors: await it, or return it."
rule: "@typescript-eslint/no-floating-promises"
sample: ts-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# Wait for every promise

Rule: `@typescript-eslint/no-floating-promises`. A promise that nobody awaits loses its errors: await it, or return it.

## Why

A floating promise fails in silence, and the code after it runs before it ends.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Saves a value.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export async function zzWrong(value: number): Promise<number> {
  Promise.resolve(value);

  return value;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Saves a value.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export async function zzRight(value: number): Promise<number> {
  await Promise.resolve(value);

  return value;
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
