---
title: "no-empty-object-type"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-empty-object-type.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-empty-object-type

The `{}`, or "empty object" type in TypeScript is a common source of confusion for developers unfamiliar with TypeScript's structural typing.
`{}` represents any _non-nullish value_, including literals like `0` and `""`:

```ts
let anyNonNullishValue: {} = 'Intentionally allowed by TypeScript.';
```

Often, developers writing `{}` actually mean either:

- `object`: representing any _object_ value
- `unknown`: representing any value at all, including `null` and `undefined`

In other words, the "empty object" type `{}` really means _"any value that is defined"_.
That includes arrays, class instances, functions, and primitives such as `string` and `symbol`.

To avoid confusion around the `{}` type allowing any _non-nullish value_, this rule bans usage of the `{}` type.
That includes interfaces and object type aliases with no fields.

**Tip:**
If you do have a use case for an API allowing `{}`, you can always configure the rule's options, use an ESLint disable comment, or disable the rule in your ESLint config.

Note that this rule does not report on:

- `{}` as a type constituent in an intersection type (e.g. types like TypeScript's built-in `type NonNullable<T> = T & {}`), as this can be useful in type system operations.
- Interfaces that extend from multiple other interfaces.

## Examples

**❌ Incorrect**

```ts
let anyObject: {};
let anyValue: {};

interface AnyObjectA {}
interface AnyValueA {}

type AnyObjectB = {};
type AnyValueB = {};
```

**✅ Correct**

```ts
let anyObject: object;
let anyValue: unknown;

type AnyObjectA = object;
type AnyValueA = unknown;

type AnyObjectB = object;
type AnyValueB = unknown;

let objectWith: { property: boolean };

interface InterfaceWith {
  property: boolean;
}

type TypeWith = { property: boolean };
```

## Options

By default, this rule flags both interfaces and object types.

### `allowInterfaces`

Allowed values are:

- `'always'`: to always allow interfaces with no fields
- `'never'` _(default)_: to never allow interfaces with no fields
- `'with-single-extends'`: to allow empty interfaces that `extend` from a single base interface

Examples of **correct** code for this rule with `{ allowInterfaces: 'with-single-extends' }`:

```ts
interface Base {
  value: boolean;
}

interface Derived extends Base {}
```

### `allowObjectTypes`

Allowed values are:

- `'always'`: to always allow object type literals with no fields
- `'never'` _(default)_: to never allow object type literals with no fields

### `allowWithName`

This can be useful if your existing code style includes a pattern of declaring empty types with `{}` instead of `object`.

Examples of code for this rule with `{ allowWithName: 'Props$' }`:

**❌ Incorrect**

```ts
interface InterfaceValue {}

type TypeValue = {};
```

**✅ Correct**

```ts
interface InterfaceProps {}

type TypeProps = {};
```

## When Not To Use It

If your code commonly needs to represent the _"any non-nullish value"_ type, this rule may not be for you.
Projects that extensively use type operations such as conditional types and mapped types oftentimes benefit from disabling this rule.

## Related To

- `no-generated-empty-object-type`, which reports type operations that _resolve_ to `{}` rather than `{}` written out by hand

## Further Reading

- Revamping the `ban-types` rule
- Total TypeScript: The Empty Object Type in TypeScript
- #8700 Enhancement: [ban-types] Split the {} ban into a separate, better-phrased rule
