---
title: "no-extra-non-null-assertion"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-extra-non-null-assertion

The `!` non-null assertion operator in TypeScript is used to assert that a value's type does not include `null` or `undefined`.
Using the operator any more than once on a single value does nothing.

## Examples

**❌ Incorrect**

```ts
const foo: { bar: number } | null = null;
const bar = foo!!!.bar;
```

```ts
function foo(bar: number | undefined) {
  const bar: number = bar!!!;
}
```

```ts
function foo(bar?: { n: number }) {
  return bar!?.n;
}
```

**✅ Correct**

```ts
const foo: { bar: number } | null = null;
const bar = foo!.bar;
```

```ts
function foo(bar: number | undefined) {
  const bar: number = bar!;
}
```

```ts
function foo(bar?: { n: number }) {
  return bar?.n;
}
```
