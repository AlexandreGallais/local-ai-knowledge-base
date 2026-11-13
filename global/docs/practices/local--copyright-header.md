---
id: local--copyright-header
title: "The copyright comment comes first"
topic: practices
summary: "Every library file starts with the copyright comment of .agents/profile.json."
rule: "local/copyright-header"
sample: ts-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# The copyright comment comes first

Rule: `local/copyright-header`. Every library file starts with the copyright comment of .agents/profile.json.

## Why

The project asks for it in every file. The format pass writes it on save; this rule catches a file that lost it.

## Wrong

```ts
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
