---
title: "prefer-literal-enum-member"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-literal-enum-member

TypeScript allows the value of an enum member to be many different kinds of valid JavaScript expressions.
However, because enums create their own scope whereby each enum member becomes a variable in that scope, developers are often surprised at the resultant values.
For example:

```ts
const imOutside = 2;
const b = 2;
enum Foo {
  outer = imOutside,
  a = 1,
  b = a,
  c = b,
  // does c == Foo.b == Foo.c == 1?
  // or does c == b == 2?
}
```

> The answer is that `Foo.c` will be `1` at runtime [TypeScript playground].

Therefore, it's often better to prevent unexpected results in code by requiring the use of literal values as enum members.
This rule reports when an enum member is given a value that is not a literal.

## Examples

**❌ Incorrect**

```ts
const str = 'Test';
const string1 = 'string1';
const string2 = 'string2';

enum Invalid {
  A = str, // Variable assignment
  B = `Interpolates ${string1} and ${string2}`, // Template literal with interpolation
  C = 2 + 2, // Expression assignment
  D = C, // Assignment to another enum member
}
```

**✅ Correct**

```ts
enum Valid {
  A, // No initializer; initialized with ascending integers starting from 0
  B = 'TestStr', // A regular string
  C = `A template literal string`, // A template literal without interpolation
  D = 4, // A number
}
```

## Options

### `allowBitwiseExpressions`

Examples of code for the `{ "allowBitwiseExpressions": true }` option:

**❌ Incorrect**

```ts
const x = 1;
enum Foo {
  A = x << 0,
  B = x >> 0,
  C = x >>> 0,
  D = x | 0,
  E = x & 0,
  F = x ^ 0,
  G = ~x,
}
```

**✅ Correct**

```ts
enum Foo {
  A = 1 << 0,
  B = 1 >> 0,
  C = 1 >>> 0,
  D = 1 | 0,
  E = 1 & 0,
  F = 1 ^ 0,
  G = ~1,
}
```

## When Not To Use It

If you want use anything other than simple literals as an enum value, this rule might not be for you.
