---
id: local--no-clock
title: "Pass the date as a parameter"
topic: practices
summary: "'new Date()' reads the clock: a pure function takes the date as a parameter."
rule: "local/no-clock"
sample: ts-pure-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# Pass the date as a parameter

Rule: `local/no-clock`. "new Date()" reads the clock: a pure function takes the date as a parameter.

## Why

A function that reads the clock gives another result at each call, and its tests depend on the time they run.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Gives the year.
 * @param value - Number to work on.
 * @returns The result.
 * @example
 * run(2);
 */
export function zzWrong(value: number): number {
  return new Date().getFullYear() + value;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Gives the year of a date.
 * @param date - Date to read the year of.
 * @returns The year, as 2026.
 * @example
 * zzRight(new Date(2026, 0, 1)); // 2026
 */
export function zzRight(date: Readonly<Date>): number {
  return date.getFullYear();
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
