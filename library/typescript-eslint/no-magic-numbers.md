---
title: "no-magic-numbers"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-magic-numbers.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-magic-numbers

It adds support for:

- numeric literal types (`type T = 1`),
- `enum` members (`enum Foo { bar = 1 }`),
- `readonly` class properties (`class Foo { readonly bar = 1 }`).

## Options

This rule adds the following options:

```ts
interface Options extends BaseNoMagicNumbersOptions {
  ignoreEnums?: boolean;
  ignoreNumericLiteralTypes?: boolean;
  ignoreReadonlyClassProperties?: boolean;
  ignoreTypeIndexes?: boolean;
}

const defaultOptions: Options = {
  ...baseNoMagicNumbersDefaultOptions,
  ignoreEnums: false,
  ignoreNumericLiteralTypes: false,
  ignoreReadonlyClassProperties: false,
  ignoreTypeIndexes: false,
};
```

### `ignoreEnums`

Whether enums used in TypeScript are considered okay. `false` by default.

Examples of **incorrect** code for the `{ "ignoreEnums": false }` option:

```ts
enum foo {
  SECOND = 1000,
}
```

Examples of **correct** code for the `{ "ignoreEnums": true }` option:

```ts
enum foo {
  SECOND = 1000,
}
```

### `ignoreNumericLiteralTypes`

Whether numbers used in TypeScript numeric literal types are considered okay. `false` by default.

Examples of **incorrect** code for the `{ "ignoreNumericLiteralTypes": false }` option:

```ts
type SmallPrimes = 2 | 3 | 5 | 7 | 11;
```

Examples of **correct** code for the `{ "ignoreNumericLiteralTypes": true }` option:

```ts
type SmallPrimes = 2 | 3 | 5 | 7 | 11;
```

### `ignoreReadonlyClassProperties`

Whether `readonly` class properties are considered okay.

Examples of **incorrect** code for the `{ "ignoreReadonlyClassProperties": false }` option:

```ts
class Foo {
  readonly A = 1;
  readonly B = 2;
  public static readonly C = 1;
  static readonly D = 1;
}
```

Examples of **correct** code for the `{ "ignoreReadonlyClassProperties": true }` option:

```ts
class Foo {
  readonly A = 1;
  readonly B = 2;
  public static readonly C = 1;
  static readonly D = 1;
}
```

### `ignoreTypeIndexes`

Whether numbers used to index types are okay. `false` by default.

Examples of **incorrect** code for the `{ "ignoreTypeIndexes": false }` option:

```ts
type Foo = Bar[0];
type Baz = Parameters<Foo>[2];
```

Examples of **correct** code for the `{ "ignoreTypeIndexes": true }` option:

```ts
type Foo = Bar[0];
type Baz = Parameters<Foo>[2];
```

## When Not To Use It

If your project frequently deals with constant numbers and you don't wish to take up extra space to declare them, this rule might not be for you.
We recommend at least using descriptive comments and/or names to describe constants.
You might consider using ESLint disable comments instead of completely disabling this rule.
