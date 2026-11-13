---
title: "prefer-enum-initializers"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-enum-initializers.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-enum-initializers

TypeScript `enum`s are a practical way to organize semantically related constant values.
Members of `enum`s that don't have explicit values are by default given sequentially increasing numbers.

In projects where the value of `enum` members are important, allowing implicit values for enums can cause bugs if `enum`s are modified over time.

This rule recommends having each `enum` member value explicitly initialized.

## Examples

**❌ Incorrect**

```ts
enum Status {
  Open = 1,
  Close,
}

enum Direction {
  Up,
  Down,
}

enum Color {
  Red,
  Green = 'Green',
  Blue = 'Blue',
}
```

**✅ Correct**

```ts
enum Status {
  Open = 'Open',
  Close = 'Close',
}

enum Direction {
  Up = 1,
  Down = 2,
}

enum Color {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}
```

## When Not To Use It

If you don't care about `enum`s having implicit values you can safely disable this rule.
