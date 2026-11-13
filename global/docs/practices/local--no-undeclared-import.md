---
id: local--no-undeclared-import
title: "Import only the packages of package.json"
topic: practices
summary: "Every imported package is in package.json; never one the project does not have."
rule: "local/no-undeclared-import"
sample: ts-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# Import only the packages of package.json

Rule: `local/no-undeclared-import`. Every imported package is in package.json; never one the project does not have.

## Why

A package that is not declared is not installed on the workstation, and the AI must never install one on its own.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

import { clamp } from 'lodash-es';

/**
 * Clamps a value.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export function zzWrong(value: number): number {
  return clamp(value, 0, 1);
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Clamps a value.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export function zzRight(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
