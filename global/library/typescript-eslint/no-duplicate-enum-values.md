---
title: "no-duplicate-enum-values"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-duplicate-enum-values.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-duplicate-enum-values

Although TypeScript supports duplicate enum member values, people usually expect members to have unique values within the same enum. Duplicate values can lead to bugs that are hard to track down.

## Examples

This rule disallows defining an enum with multiple members initialized to the same value.

> This rule only enforces on enum members initialized with string or number literals.
> Members without an initializer or initialized with an expression are not checked by this rule.

**❌ Incorrect**

```ts
enum E {
  A = 0,
  B = 0,
}
```

```ts
enum E {
  A = 'A',
  B = 'A',
  C = `A`,
}
```

**✅ Correct**

```ts
enum E {
  A = 0,
  B = 1,
}
```

```ts
enum E {
  A = 'A',
  B = 'B',
  C = `C`,
}
```

## When Not To Use It

It can sometimes be useful to include duplicate enum members for very specific use cases.
For example, when renaming an enum member, it can sometimes be useful to keep the old name until a scheduled major breaking change.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

In general, if your project intentionally duplicates enum member values, you can avoid this rule.
