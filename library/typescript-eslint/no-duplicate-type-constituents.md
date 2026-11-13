---
title: "no-duplicate-type-constituents"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-duplicate-type-constituents.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-duplicate-type-constituents

TypeScript supports types ("constituents") within union and intersection types being duplicates of each other.
However, developers typically expect each constituent to be unique within its intersection or union.
Duplicate values make the code overly verbose and generally reduce readability.

This rule disallows duplicate union or intersection constituents.
We consider types to be duplicate if they evaluate to the same result in the type system.
For example, given `type A = string` and `type T = string | A`, this rule would flag that `A` is the same type as `string`.

This rule also disallows explicitly listing `undefined` in a type union when a function parameter is marked as optional.
Doing so is unnecessary.
Please note that this check only applies to parameters, not properties.
Therefore, it does not conflict with the `exactOptionalPropertyTypes` TypeScript compiler setting.

**❌ Incorrect**

```ts
type T1 = 'A' | 'A';

type T2 = string | string | number;

type T3 = { a: string } & { a: string };

type T4 = [1, 2, 3] | [1, 2, 3];

type StringA = string;
type StringB = string;
type T5 = StringA | StringB;

const fn = (a?: string | undefined) => {};
```

**✅ Correct**

```ts
type T1 = 'A' | 'B';

type T2 = string | number | boolean;

type T3 = { a: string } & { b: string };

type T4 = [1, 2, 3] | [1, 2, 3, 4];

type StringA = string;
type NumberB = number;
type T5 = StringA | NumberB;

const fn = (a?: string) => {};
```

## Options

### `ignoreIntersections`

When set to true, duplicate checks on intersection type constituents are ignored.

### `ignoreUnions`

When set to true, duplicate checks on union type constituents are ignored.

## When Not To Use It

It can sometimes be useful for the sake of documentation to include aliases for the same type.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

> In some of those cases, branded types might be a type-safe way to represent the underlying data types.

## Related To

- no-redundant-type-constituents
