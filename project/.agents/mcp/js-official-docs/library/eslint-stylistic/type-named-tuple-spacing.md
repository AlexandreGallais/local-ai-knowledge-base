---
title: "type-named-tuple-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/type-named-tuple-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# type-named-tuple-spacing

Expect space before the type declaration in the named tuple.

## Rule Details

Expect space before the type declaration in the named tuple.

## Options

This rule has no options.

Examples of **incorrect** code for this rule:

**Incorrect:**

```ts
/* eslint @stylistic/type-named-tuple-spacing: ["error"] */

type T = [i:number]
type T = [i?   :number]
type T = [i:()=>void, j:number]
```

Examples of **correct** code for this rule:

**Correct:**

```ts
/* eslint @stylistic/type-named-tuple-spacing: ["error"] */

type T = [i: number]
type T = [i?: number]
type T = [i: ()=>void, j: number]
```
