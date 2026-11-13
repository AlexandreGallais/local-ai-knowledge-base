---
title: "type-generic-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/type-generic-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# type-generic-spacing

Enforces consistent spacing inside TypeScript type generics.

## Rule Details

This rule enforces consistent spacing inside TypeScript type generics.

## Options

This rule has no options.

Examples of **incorrect** code for this rule:

**Incorrect:**

```ts
/* eslint @stylistic/type-generic-spacing: ["error"] */

type Foo<T=true> = T

interface Log {
  foo <T>(name: T): void
}
```

Examples of **correct** code for this rule:

**Correct:**

```ts
/* eslint @stylistic/type-generic-spacing: ["error"] */

type Foo<T = true> = T

interface Log {
  foo<T>(name: T): void
}
```
