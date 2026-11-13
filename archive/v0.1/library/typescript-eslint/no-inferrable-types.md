---
title: "no-inferrable-types"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-inferrable-types.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-inferrable-types

TypeScript is able to infer the types of parameters, properties, and variables from their default or initial values.
There is no need to use an explicit `:` type annotation on one of those constructs initialized to a boolean, number, or string.
Doing so adds unnecessary verbosity to code -making it harder to read- and in some cases can prevent TypeScript from inferring a more specific literal type (e.g. `10`) instead of the more general primitive type (e.g. `number`)

## Examples

**❌ Incorrect**

```ts
const a: bigint = 10n;
const a: bigint = BigInt(10);
const a: boolean = !0;
const a: boolean = Boolean(null);
const a: boolean = true;
const a: null = null;
const a: number = 10;
const a: number = Infinity;
const a: number = NaN;
const a: number = Number('1');
const a: RegExp = /a/;
const a: RegExp = new RegExp('a');
const a: string = `str`;
const a: string = String(1);
const a: symbol = Symbol('a');
const a: undefined = undefined;
const a: undefined = void someValue;

class Foo {
  prop: number = 5;
}

function fn(a: number = 5, b: boolean = true) {}
```

**✅ Correct**

```ts
const a = 10n;
const a = BigInt(10);
const a = !0;
const a = Boolean(null);
const a = true;
const a = null;
const a = 10;
const a = Infinity;
const a = NaN;
const a = Number('1');
const a = /a/;
const a = new RegExp('a');
const a = `str`;
const a = String(1);
const a = Symbol('a');
const a = undefined;
const a = void someValue;

class Foo {
  prop = 5;
}

function fn(a = 5, b = true) {}
```

## Options

### `ignoreParameters`

When set to true, the following pattern is considered valid:

```ts
function foo(a: number = 5, b: boolean = true) {
  // ...
}
```

### `ignoreProperties`

When set to true, the following pattern is considered valid:

```ts
class Foo {
  prop: number = 5;
}
```

## When Not To Use It

If you strongly prefer to have explicit types regardless of whether they can be inferred, this rule may not be for you.

If you use the `--isolatedDeclarations` compiler option, this rule is incompatible.

## Further Reading

- TypeScript Inference
