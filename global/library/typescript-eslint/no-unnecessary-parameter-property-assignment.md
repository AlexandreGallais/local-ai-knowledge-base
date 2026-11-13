---
title: "no-unnecessary-parameter-property-assignment"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unnecessary-parameter-property-assignment.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unnecessary-parameter-property-assignment

TypeScript's parameter properties allow creating and initializing a member in one place.
Therefore, in most cases, it is not necessary to assign parameter properties of the same name to members within a constructor.

## Examples

**❌ Incorrect**

```ts
class Foo {
  constructor(public bar: string) {
    this.bar = bar;
  }
}
```

**✅ Correct**

```ts
class Foo {
  constructor(public bar: string) {}
}
```

## When Not To Use It

If you don't use parameter properties, you can ignore this rule.
