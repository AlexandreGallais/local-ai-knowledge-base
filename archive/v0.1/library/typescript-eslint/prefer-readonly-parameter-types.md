---
title: "prefer-readonly-parameter-types"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-readonly-parameter-types

Mutating function arguments can lead to confusing, hard to debug behavior.
Whilst it's easy to implicitly remember to not modify function arguments, explicitly typing arguments as readonly provides clear contract to consumers.
This contract makes it easier for a consumer to reason about if a function has side-effects.

This rule allows you to enforce that function parameters resolve to readonly types.
A type is considered readonly if:

- it is a primitive type (`string`, `number`, `boolean`, `symbol`, or an enum),
- it is a function signature type,
- it is a readonly array type whose element type is considered readonly.
- it is a readonly tuple type whose elements are all considered readonly.
- it is an object type whose properties are all marked as readonly, and whose values are all considered readonly.

## Examples

**❌ Incorrect**

```ts
function array1(arg: string[]) {} // array is not readonly
function array2(arg: readonly string[][]) {} // array element is not readonly
function array3(arg: [string, number]) {} // tuple is not readonly
function array4(arg: readonly [string[], number]) {} // tuple element is not readonly
// the above examples work the same if you use ReadonlyArray<T> instead

function object1(arg: { prop: string }) {} // property is not readonly
function object2(arg: { readonly prop: string; prop2: string }) {} // not all properties are readonly
function object3(arg: { readonly prop: { prop2: string } }) {} // nested property is not readonly
// the above examples work the same if you use Readonly<T> instead

interface CustomArrayType extends ReadonlyArray<string> {
  prop: string; // note: this property is mutable
}
function custom1(arg: CustomArrayType) {}

interface CustomFunction {
  (): void;
  prop: string; // note: this property is mutable
}
function custom2(arg: CustomFunction) {}

function union(arg: string[] | ReadonlyArray<number[]>) {} // not all types are readonly

// rule also checks function types
interface Foo {
  (arg: string[]): void;
}
interface Foo {
  new (arg: string[]): void;
}
const x = { foo(arg: string[]): void {} };
function foo(arg: string[]);
type Foo = (arg: string[]) => void;
interface Foo {
  foo(arg: string[]): void;
}
```

**✅ Correct**

```ts
function array1(arg: readonly string[]) {}
function array2(arg: readonly (readonly string[])[]) {}
function array3(arg: readonly [string, number]) {}
function array4(arg: readonly [readonly string[], number]) {}
// the above examples work the same if you use ReadonlyArray<T> instead

function object1(arg: { readonly prop: string }) {}
function object2(arg: { readonly prop: string; readonly prop2: string }) {}
function object3(arg: { readonly prop: { readonly prop2: string } }) {}
// the above examples work the same if you use Readonly<T> instead

interface CustomArrayType extends ReadonlyArray<string> {
  readonly prop: string;
}
function custom1(arg: Readonly<CustomArrayType>) {}
// interfaces that extend the array types are not considered arrays, and thus must be made readonly.

interface CustomFunction {
  (): void;
  readonly prop: string;
}
function custom2(arg: CustomFunction) {}

function union(arg: readonly string[] | ReadonlyArray<number>) {}

function primitive1(arg: string) {}
function primitive2(arg: number) {}
function primitive3(arg: boolean) {}
function primitive4(arg: unknown) {}
function primitive5(arg: null) {}
function primitive6(arg: undefined) {}
function primitive7(arg: any) {}
function primitive8(arg: never) {}
function primitive9(arg: string | number | undefined) {}

function fnSig(arg: () => void) {}

enum Foo {
  a,
  b,
}
function enumArg(arg: Foo) {}

function symbol1(arg: symbol) {}
const customSymbol = Symbol('a');
function symbol2(arg: typeof customSymbol) {}

// function types
interface Foo {
  (arg: readonly string[]): void;
}
interface Foo {
  new (arg: readonly string[]): void;
}
const x = { foo(arg: readonly string[]): void {} };
function foo(arg: readonly string[]);
type Foo = (arg: readonly string[]) => void;
interface Foo {
  foo(arg: readonly string[]): void;
}
```

## Options

### `allow`

Some complex types cannot easily be made readonly, for example the `HTMLElement` type or the `JQueryStatic` type from `@types/jquery`. This option allows you to globally disable reporting of such types.

This option takes the shared `TypeOrValueSpecifier` format.

Examples of code for this rule with:

```json
{
  "allow": [
    { "from": "file", "name": "Foo" },
    { "from": "lib", "name": "HTMLElement" },
    { "from": "package", "name": "Bar", "package": "bar-lib" }
  ]
}
```

**❌ Incorrect**

```ts
interface ThisIsMutable {
  prop: string;
}

interface Wrapper {
  sub: ThisIsMutable;
}

interface WrapperWithOther {
  readonly sub: Foo;
  otherProp: string;
}

// Incorrect because ThisIsMutable is not readonly
function fn1(arg: ThisIsMutable) {}

// Incorrect because Wrapper.sub is not readonly
function fn2(arg: Wrapper) {}

// Incorrect because WrapperWithOther.otherProp is not readonly and not in the allowlist
function fn3(arg: WrapperWithOther) {}
```

```ts
import { Foo } from 'some-lib';
import { Bar } from 'incorrect-lib';

interface HTMLElement {
  prop: string;
}

// Incorrect because Foo is not a local type
function fn1(arg: Foo) {}

// Incorrect because HTMLElement is not from the default library
function fn2(arg: HTMLElement) {}

// Incorrect because Bar is not from "bar-lib"
function fn3(arg: Bar) {}
```

**✅ Correct**

```ts
interface Foo {
  prop: string;
}

interface Wrapper {
  readonly sub: Foo;
  readonly otherProp: string;
}

// Works because Foo is allowed
function fn1(arg: Foo) {}

// Works even when Foo is nested somewhere in the type, with other properties still being checked
function fn2(arg: Wrapper) {}
```

```ts
import { Bar } from 'bar-lib';

interface Foo {
  prop: string;
}

// Works because Foo is a local type
function fn1(arg: Foo) {}

// Works because HTMLElement is from the default library
function fn2(arg: HTMLElement) {}

// Works because Bar is from "bar-lib"
function fn3(arg: Bar) {}
```

```ts
import { Foo } from './foo';

// Works because Foo is still a local type - it has to be in the same package
function fn(arg: Foo) {}
```

### `checkParameterProperties`

Because parameter properties create properties on the class, it may be undesirable to force them to be readonly.

Examples of code for this rule with `{checkParameterProperties: true}`:

**❌ Incorrect**

```ts
class Foo {
  constructor(private paramProp: string[]) {}
}
```

**✅ Correct**

```ts
class Foo {
  constructor(private paramProp: readonly string[]) {}
}
```

Examples of **correct** code for this rule with `{checkParameterProperties: false}`:

```ts
class Foo {
  constructor(
    private paramProp1: string[],
    private paramProp2: readonly string[],
  ) {}
}
```

### `ignoreInferredTypes`

This may be desirable in cases where an external dependency specifies a callback with mutable parameters, and manually annotating the callback's parameters is undesirable.

Examples of code for this rule with `{ignoreInferredTypes: true}`:

**❌ Incorrect**

```ts
import { acceptsCallback, CallbackOptions } from 'external-dependency';

acceptsCallback((options: CallbackOptions) => {});
```

**external-dependency.d.ts**

```ts
export interface CallbackOptions {
  prop: string;
}
type Callback = (options: CallbackOptions) => void;
type AcceptsCallback = (callback: Callback) => void;

export const acceptsCallback: AcceptsCallback;
```

**✅ Correct**

```ts
import { acceptsCallback } from 'external-dependency';

acceptsCallback(options => {});
```

**external-dependency.d.ts**

```ts
export interface CallbackOptions {
  prop: string;
}
type Callback = (options: CallbackOptions) => void;
type AcceptsCallback = (callback: Callback) => void;

export const acceptsCallback: AcceptsCallback;
```

### `treatMethodsAsReadonly`

This may be desirable when you are never reassigning methods.

Examples of code for this rule with `{treatMethodsAsReadonly: false}`:

**❌ Incorrect**

```ts
type MyType = {
  readonly prop: string;
  method(): string; // note: this method is mutable
};
function foo(arg: MyType) {}
```

**✅ Correct**

```ts
type MyType = Readonly<{
  prop: string;
  method(): string;
}>;
function foo(arg: MyType) {}

type MyOtherType = {
  readonly prop: string;
  readonly method: () => string;
};
function bar(arg: MyOtherType) {}
```

Examples of **correct** code for this rule with `{treatMethodsAsReadonly: true}`:

```ts
type MyType = {
  readonly prop: string;
  method(): string; // note: this method is mutable
};
function foo(arg: MyType) {}
```

## When Not To Use It

If your project does not attempt to enforce strong immutability guarantees of parameters, you can avoid this rule.

This rule is very strict on what it considers mutable.
Many types that describe themselves as readonly are considered mutable because they have mutable properties such as arrays or tuples.
To work around these limitations, you might need to use the rule's options.
In particular, the `allow` option can explicitly mark a type as readonly.
