---
title: "no-explicit-any"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-explicit-any.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-explicit-any

The `any` type in TypeScript is a dangerous "escape hatch" from the type system.
Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.
This rule reports on explicit uses of the `any` keyword as a type annotation.

Preferable alternatives to `any` include:

- If the type is known, describing it in an `interface` or `type`
- If the type is not known, using the safer `unknown` type

> TypeScript's `--noImplicitAny` compiler option prevents an implied `any`, but doesn't prevent `any` from being explicitly used the way this rule does.

## Examples

**❌ Incorrect**

```ts
const age: any = 'seventeen';
```

```ts
const ages: any[] = ['seventeen'];
```

```ts
const ages: Array<any> = ['seventeen'];
```

```ts
function greet(): any {}
```

```ts
function greet(): any[] {}
```

```ts
function greet(): Array<any> {}
```

```ts
function greet(): Array<Array<any>> {}
```

```ts
function greet(param: Array<any>): string {}
```

```ts
function greet(param: Array<any>): Array<any> {}
```

**✅ Correct**

```ts
const age: number = 17;
```

```ts
const ages: number[] = [17];
```

```ts
const ages: Array<number> = [17];
```

```ts
function greet(): string {}
```

```ts
function greet(): string[] {}
```

```ts
function greet(): Array<string> {}
```

```ts
function greet(): Array<Array<string>> {}
```

```ts
function greet(param: Array<string>): string {}
```

```ts
function greet(param: Array<string>): Array<string> {}
```

## Options

### `fixToUnknown`

By default, this rule will not provide automatic ESLint _fixes_: only opt-in _suggestions_.
Switching types to `unknown` is safer but is likely to cause additional type errors.

Enabling `{ "fixToUnknown": true }` gives the rule an auto-fixer to replace `: any` with `: unknown`.

### `ignoreRestArgs`

The examples below are **incorrect** when `{ignoreRestArgs: false}`, but **correct** when `{ignoreRestArgs: true}`.

```ts
function foo1(...args: any[]): void {}
function foo2(...args: readonly any[]): void {}
function foo3(...args: Array<any>): void {}
function foo4(...args: ReadonlyArray<any>): void {}

declare function bar(...args: any[]): void;

const baz = (...args: any[]) => {};
const qux = function (...args: any[]) {};

type Quux = (...args: any[]) => void;
type Quuz = new (...args: any[]) => void;

interface Grault {
  (...args: any[]): void;
}
interface Corge {
  new (...args: any[]): void;
}
interface Garply {
  f(...args: any[]): void;
}
```

## Alternatives to `any`

If you do know the properties that exist on an object value, it's generally best to use an `interface` or `type` to describe those properties.
If a straightforward object type isn't sufficient, then you can choose between several strategies instead of `any`.
The following headings describe some of the more common strategies.

### `unknown`

If you don't know the data shape of a value, the `unknown` type is safer than `any`.
Like `any`, `unknown` indicates the value might be any kind of data with any properties.
Unlike `any`, `unknown` doesn't allow arbitrary property accesses: it requires the value be narrowed to a more specific type before being used.
See The `unknown` type in TypeScript for more information on `unknown`.

### Index Signatures

Some objects are used with arbitrary keys, especially in code that predates `Map`s and `Set`s.
TypeScript interfaces may be given an _"index signature"_ to indicate arbitrary keys are allowed on objects.

For example, this type defines an object that must have an `apple` property with a `number` value, and may have any other string keys with `number | undefined` values:

```ts
interface AllowsAnyStrings {
  apple: number;
  [i: string]: number | undefined;
}

let fruits: AllowsAnyStrings;

fruits = { apple: 0 }; // Ok
fruits.banana = 1; // Ok
fruits.cherry = undefined; // Ok
```

See What does a TypeScript index signature actually mean? for more information on index signatures.

### Union Types

Some values can be one of multiple types.
TypeScript allows representing these with _"union"_ types: types that include a list of possible shapes for data.

Union types are often used to describe "nullable" values: those that can either be a data type or `null` and/or `undefined`.
For example, the following `StringLike` type describes data that is either a `string` or `undefined`:

```ts
type StringLike = string | undefined;

let fruit: StringLike;

fruit = 'apple'; // Ok
fruit = undefined; // Ok
```

See TypeScript Handbook: Everyday Types > Union Types for more information on union types.

### Type Parameter Constraints

"Generic" type parameters are often used to represent a value of an unknown type.
It can be tempting to use `any` as a type parameter constraint, but this is not recommended.

First, `extends any` on its own does nothing: `<T extends any>` is equivalent to `<T>`.
See `@typescript-eslint/no-unnecessary-type-constraint` for more information.

Within type parameters, `never` and `unknown` otherwise can generally be used instead.
For example, the following code uses those two types in `AnyFunction` instead of `any`s to constrain `Callback` to any function type:

```ts
type AnyFunction = (...args: never[]) => unknown;

function curry<Greeter extends AnyFunction>(greeter: Greeter, prefix: string) {
  return (...args: Parameters<Greeter>) => `${prefix}: ${greeter(...args)}`;
}

const greet = (name: string) => `Hello, ${name}!`;
const greetWithDate = curry(greet, 'Logged: ');

greetWithDate('linter'); // => "Logged: Hello, linter!"
```

See When to use `never` and `unknown` in TypeScript for more information on those types.

## When Not To Use It

`any` is always a dangerous escape hatch.
Whenever possible, it is always safer to avoid it.
TypeScript's `unknown` is almost always preferable to `any`.

However, there are occasional situations where it can be necessary to use `any`.
Most commonly:

- If your project isn't fully onboarded to TypeScript yet, `any` can be temporarily used in places where types aren't yet known or representable
- If an external package doesn't yet have typings and you want to use `any` pending adding a `.d.ts` for it
- You're working with particularly complex or nuanced code that can't yet be represented in the TypeScript type system

You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- Avoiding `any`s with Linting and TypeScript
- `no-unsafe-argument`
- `no-unsafe-assignment`
- `no-unsafe-call`
- `no-unsafe-member-access`
- `no-unsafe-return`

## Further Reading

- TypeScript `any` type
- TypeScript's `unknown` type
- TypeScript `any` type documentation
- TypeScript `unknown` type release notes
