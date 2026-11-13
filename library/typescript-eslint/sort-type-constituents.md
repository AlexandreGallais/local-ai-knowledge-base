---
title: "sort-type-constituents"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/sort-type-constituents.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# sort-type-constituents

**Deprecated**
This rule has been deprecated in favor of the `perfectionist/sort-intersection-types` and `perfectionist/sort-union-types` rules.

See Docs: Deprecate sort-type-constituents in favor of eslint-plugin-perfectionist and eslint-plugin: Feature freeze naming and sorting stylistic rules for more information.

Sorting union (`|`) and intersection (`&`) types can help:

- keep your codebase standardized
- find repeated types
- reduce diff churn

This rule reports on any types that aren't sorted alphabetically.

> Types are sorted case-insensitively and treating numbers like a human would, falling back to character code sorting in case of ties.

## Examples

**❌ Incorrect**

```ts
type T1 = B | A;

type T2 = { b: string } & { a: string };

type T3 = [1, 2, 4] & [1, 2, 3];

type T4 =
  | [1, 2, 4]
  | [1, 2, 3]
  | { b: string }
  | { a: string }
  | (() => void)
  | (() => string)
  | 'b'
  | 'a'
  | 'b'
  | 'a'
  | readonly string[]
  | readonly number[]
  | string[]
  | number[]
  | B
  | A
  | string
  | any;
```

**✅ Correct**

```ts
type T1 = A | B;

type T2 = { a: string } & { b: string };

type T3 = [1, 2, 3] & [1, 2, 4];

type T4 =
  | A
  | B
  | number[]
  | string[]
  | any
  | string
  | readonly number[]
  | readonly string[]
  | 'a'
  | 'a'
  | 'b'
  | 'b'
  | (() => string)
  | (() => void)
  | { a: string }
  | { b: string }
  | [1, 2, 3]
  | [1, 2, 4];
```

## Options

### `caseSensitive`

Examples of code with `{ "caseSensitive": true }`:

**❌ Incorrect**

```ts
type T = 'DeletedAt' | 'DeleteForever';
```

**✅ Correct**

```ts
type T = 'DeleteForever' | 'DeletedAt';
```

### `checkIntersections`

Examples of code with `{ "checkIntersections": true }` (the default):

**❌ Incorrect**

```ts
type ExampleIntersection = B & A;
```

**✅ Correct**

```ts
type ExampleIntersection = A & B;
```

### `checkUnions`

Examples of code with `{ "checkUnions": true }` (the default):

**❌ Incorrect**

```ts
type ExampleUnion = B | A;
```

**✅ Correct**

```ts
type ExampleUnion = A | B;
```

### `groupOrder`

Each constituent of the type is placed into a group, and then the rule sorts alphabetically within each group.
The ordering of groups is determined by this option.

- `conditional` - Conditional types (`A extends B ? C : D`)
- `function` - Function and constructor types (`() => void`, `new () => type`)
- `import` - Import types (`import('path')`)
- `intersection` - Intersection types (`A & B`)
- `keyword` - Keyword types (`any`, `string`, etc)
- `literal` - Literal types (`1`, `'b'`, `true`, etc)
- `named` - Named types (`A`, `A['prop']`, `B[]`, `Array<C>`)
- `object` - Object types (`{ a: string }`, `{ [key: <example-value>]: number }`)
- `operator` - Operator types (`keyof A`, `typeof B`, `readonly C[]`)
- `tuple` - Tuple types (`[A, B, C]`)
- `union` - Union types (`A | B`)
- `nullish` - `null` and `undefined`

For example, configuring the rule with `{ "groupOrder": ["literal", "nullish" ]}`:

**❌ Incorrect**

```ts
type ExampleGroup = null | 123;
```

**✅ Correct**

```ts
type ExampleGroup = 123 | null;
```

## When Not To Use It

This rule is purely a stylistic rule for maintaining consistency in your project.
You can turn it off if you don't want to keep a consistent, predictable order for intersection and union types.
However, keep in mind that inconsistent style can harm readability in a project.
