---
title: "no-unnecessary-type-constraint"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unnecessary-type-constraint.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unnecessary-type-constraint

Generic type parameters (`<T>`) in TypeScript may be "constrained" with an `extends` keyword.
When no `extends` is provided, type parameters default a constraint to `unknown`.
It is therefore redundant to `extend` from `any` or `unknown`.

## Examples

**❌ Incorrect**

```ts
interface FooAny<T extends any> {}

interface FooUnknown<T extends unknown> {}

type BarAny<T extends any> = {};

type BarUnknown<T extends unknown> = {};

class BazAny<T extends any> {
  quxAny<U extends any>() {}
}

const QuuxAny = <T extends any>() => {};

function QuuzAny<T extends any>() {}
```

**✅ Correct**

```ts
interface Foo<T> {}

type Bar<T> = {};

class Baz<T> {
  qux<U>() {}
}

const Quux = <T>() => {};

function Quuz<T>() {}
```

## When Not To Use It

If you don't care about the specific styles of your type constraints, or never use them in the first place, then you will not need this rule.
