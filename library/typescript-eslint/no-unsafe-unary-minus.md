---
title: "no-unsafe-unary-minus"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-unary-minus.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-unary-minus

TypeScript does not prevent you from putting a minus sign before things other than numbers:

```ts
const s = 'hello';
const x = -s; // x is NaN
```

This rule restricts the unary `-` operator to `number | bigint`.

## Examples

**❌ Incorrect**

```ts
declare const a: string;
-a;

declare const b: {};
-b;
```

**✅ Correct**

```ts
-42;
-42n;

declare const a: number;
-a;

declare const b: number;
-b;

declare const c: number | bigint;
-c;

declare const d: any;
-d;

declare const e: 1 | 2;
-e;
```
