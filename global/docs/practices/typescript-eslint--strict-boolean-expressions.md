---
id: typescript-eslint--strict-boolean-expressions
title: "Compare, never test a value as true or false"
topic: practices
summary: "Write 'if (name !== '')' or 'if (count > 0)', never 'if (name)' or 'if (count)'."
rule: "@typescript-eslint/strict-boolean-expressions"
sample: ts-lib
wrong-file: zz-wrong.ts
right-file: zz-right.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# Compare, never test a value as true or false

Rule: `@typescript-eslint/strict-boolean-expressions`. Write "if (name !== '')" or "if (count > 0)", never "if (name)" or "if (count)".

## Why

An empty string and zero are false: "if (count)" skips a real count of 0.

## Wrong

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Says whether a name was given.
 * @param name - Name typed by the user.
 * @returns Whether it holds text.
 * @example
 * zzWrong('a'); // true
 */
export function zzWrong(name: string): boolean {
  if (name) {
    return true;
  }

  return false;
}
```

## Right

```ts
/*
 * Copyright (c) 2026 Example Corp.
 */

/**
 * Says whether a name was given.
 * @param name - Name typed by the user.
 * @returns Whether it holds text.
 * @example
 * zzRight('a'); // true
 */
export function zzRight(name: string): boolean {
  return name !== '';
}
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
