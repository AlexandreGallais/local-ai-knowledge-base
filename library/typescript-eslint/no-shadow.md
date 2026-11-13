---
title: "no-shadow"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-shadow.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-shadow

It adds support for TypeScript's `this` parameters and global augmentation, and adds options for TypeScript features.

## Options

This rule adds the following options:

```ts
type AdditionalHoistOptionEntries = 'types' | 'functions-and-types';

type HoistOptionEntries =
  BaseNoShadowHoistOptionEntries | AdditionalHoistOptionEntries;

interface Options extends BaseNoShadowOptions {
  hoist?: HoistOptionEntries;
  ignoreTypeValueShadow?: boolean;
  ignoreFunctionTypeParameterNameValueShadow?: boolean;
}

const defaultOptions: Options = {
  ...baseNoShadowDefaultOptions,
  hoist: 'functions-and-types',
  ignoreTypeValueShadow: true,
  ignoreFunctionTypeParameterNameValueShadow: true,
};
```

### hoist: `types`

Examples of incorrect code for the `{ "hoist": "types" }` option:

```ts
type Bar<Foo> = 1;
type Foo = 1;
```

### hoist: `functions-and-types`

Examples of incorrect code for the `{ "hoist": "functions-and-types" }` option:

```ts
// types
type Bar<Foo> = 1;
type Foo = 1;

// functions
if (true) {
  let b = 6;
}

function b() {}
```

### `ignoreTypeValueShadow`

This is generally safe because you cannot use variables in type locations without a `typeof` operator, so there's little risk of confusion.

Examples of **correct** code with `{ ignoreTypeValueShadow: true }`:

```ts
type Foo = number;
interface Bar {
  prop: number;
}

function f() {
  const Foo = 1;
  const Bar = 'test';
}
```

**Note:**

_Shadowing_ specifically refers to two identical identifiers that are in different, nested scopes. This is different from _redeclaration_, which is when two identical identifiers are in the same scope. Redeclaration is covered by the `no-redeclare` rule instead.

### `ignoreFunctionTypeParameterNameValueShadow`

Each of a function type's arguments creates a value variable within the scope of the function type. This is done so that you can reference the type later using the `typeof` operator:

```ts
type Func = (test: string) => typeof test;

declare const fn: Func;
const result = fn('str'); // typeof result === string
```

This means that function type arguments shadow value variable names in parent scopes:

```ts
let test = 1;
type TestType = typeof test; // === number
type Func = (test: string) => typeof test; // this "test" references the argument, not the variable

declare const fn: Func;
const result = fn('str'); // typeof result === string
```

If you do not use the `typeof` operator in a function type return type position, you can safely turn this option on.

Examples of **correct** code with `{ ignoreFunctionTypeParameterNameValueShadow: true }`:

```ts
const test = 1;
type Func = (test: string) => typeof test;
```

## FAQ

### Why does the rule report on enum members that share the same name as a variable in a parent scope?

Reporting on this case isn't a bug - it is completely intentional and correct reporting! The rule reports due to a relatively unknown feature of enums - enum members create a variable within the enum scope so that they can be referenced within the enum without a qualifier.

To illustrate this with an example:

```ts
const A = 2;
enum Test {
  A = 1,
  B = A,
}

console.log(Test.B);
// what should be logged?
```

Naively looking at the above code, it might look like the log should output `2`, because the outer variable `A`'s value is `2` - however, the code instead outputs `1`, which is the value of `Test.A`. This is because the unqualified code `B = A` is equivalent to the fully-qualified code `B = Test.A`. Due to this behavior, the enum member has **shadowed** the outer variable declaration.
