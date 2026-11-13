---
title: "TypeScript for Functional Programmers (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/get-started/TS for Functional Programmers.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript for Functional Programmers (part 2 of 2)

## Concepts similar to Haskell

### Contextual typing

TypeScript has some obvious places where it can infer types, like
variable declarations:

```ts
let s = "I'm a string!";
```

But it also infers types in a few other places that you may not expect
if you've worked with other C-syntax languages:

```ts
declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
let sns = map((n) => n.toString(), [1, 2, 3]);
```

Here, `n: number` in this example also, despite the fact that `T` and `U`
have not been inferred before the call. In fact, after `[1,2,3]` has
been used to infer `T=number`, the return type of `n => n.toString()`
is used to infer `U=string`, causing `sns` to have the type
`string[]`.

Note that inference will work in any order, but intellisense will only
work left-to-right, so TypeScript prefers to declare `map` with the
array first:

```ts
declare function map<T, U>(ts: T[], f: (t: T) => U): U[];
```

Contextual typing also works recursively through object literals, and
on unit types that would otherwise be inferred as `string` or
`number`. And it can infer return types from context:

```ts
declare function run<T>(thunk: (t: T) => void): T;
let i: { inference: string } = run((o) => {
  o.inference = "INSERT STATE HERE";
});
```

The type of `o` is determined to be `{ inference: string }` because

1. Declaration initializers are contextually typed by the
   declaration's type: `{ inference: string }`.
2. The return type of a call uses the contextual type for inferences,
   so the compiler infers that `T={ inference: string }`.
3. Arrow functions use the contextual type to type their parameters,
   so the compiler gives `o: { inference: string }`.

And it does so while you are typing, so that after typing `o.`, you
get completions for the property `inference`, along with any other
properties you'd have in a real program.
Altogether, this feature can make TypeScript's inference look a bit
like a unifying type inference engine, but it is not.

### Type aliases

Type aliases are mere aliases, just like `type` in Haskell. The
compiler will attempt to use the alias name wherever it was used in
the source code, but does not always succeed.

```ts
type Size = [number, number];
let x: Size = [101.1, 999.9];
```

The closest equivalent to `newtype` is a _tagged intersection_:

```ts
type FString = string & { __compileTimeOnly: any };
```

An `FString` is just like a normal string, except that the compiler
thinks it has a property named `__compileTimeOnly` that doesn't
actually exist. This means that `FString` can still be assigned to
`string`, but not the other way round.

### Discriminated Unions

The closest equivalent to `data` is a union of types with discriminant
properties, normally called discriminated unions in TypeScript:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
```

Unlike Haskell, the tag, or discriminant, is just a property in each
object type. Each variant has an identical property with a different
unit type. This is still a normal union type; the leading `|` is
an optional part of the union type syntax. You can discriminate the
members of the union using normal JavaScript code:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius * s.radius;
  } else if (s.kind === "square") {
    return s.x * s.x;
  } else {
    return (s.x * s.y) / 2;
  }
}
```

Note that the return type of `area` is inferred to be `number` because
TypeScript knows the function is total. If some variant is not
covered, the return type of `area` will be `number | undefined` instead.

Also, unlike Haskell, common properties show up in any union, so you
can usefully discriminate multiple members of the union:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
function height(s: Shape) {
  if (s.kind === "circle") {
    return 2 * s.radius;
  } else {
    // s.kind: "square" | "triangle"
    return s.x;
  }
}
```

### Type Parameters

Like most C-descended languages, TypeScript requires declaration of
type parameters:

```ts
function liftArray<T>(t: T): Array<T> {
  return [t];
}
```

There is no case requirement, but type parameters are conventionally
single uppercase letters. Type parameters can also be constrained to a
type, which behaves a bit like type class constraints:

```ts
function firstish<T extends { length: number }>(t1: T, t2: T): T {
  return t1.length > t2.length ? t1 : t2;
}
```

TypeScript can usually infer type arguments from a call based on the
type of the arguments, so type arguments are usually not needed.

Because TypeScript is structural, it doesn't need type parameters as
much as nominal systems. Specifically, they are not needed to make a
function polymorphic. Type parameters should only be used to
_propagate_ type information, such as constraining parameters to be
the same type:

```ts
function length<T extends ArrayLike<unknown>>(t: T): number {}

function length(t: ArrayLike<unknown>): number {}
```

In the first `length`, T is not necessary; notice that it's only
referenced once, so it's not being used to constrain the type of the
return value or other parameters.

#### Higher-kinded types

TypeScript does not have higher kinded types, so the following is not legal:

```ts
function length<T extends ArrayLike<unknown>, U>(m: T<U>) {}
```

#### Point-free programming

Point-free programming — heavy use of currying and function
composition — is possible in JavaScript, but can be verbose.
In TypeScript, type inference often fails for point-free programs, so
you'll end up specifying type parameters instead of value parameters. The
result is so verbose that it's usually better to avoid point-free
programming.

### Module system

JavaScript's modern module syntax is a bit like Haskell's, except that
any file with `import` or `export` is implicitly a module:

```ts
import { value, Type } from "npm-package";
import { other, Types } from "./local-package";
import * as prefix from "../lib/third-package";
```

You can also import commonjs modules — modules written using node.js'
module system:

```ts
import f = require("single-function-package");
```

You can export with an export list:

```ts
export { f };

function f() {
  return g();
}
function g() {} // g is not exported
```

Or by marking each export individually:

```ts
export function f() { return g() }
function g() { }
```

The latter style is more common but both are allowed, even in the same
file.

### `readonly` and `const`

In JavaScript, mutability is the default, although it allows variable
declarations with `const` to declare that the _reference_ is
immutable. The referent is still mutable:

```js
const a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; // D:
```

TypeScript additionally has a `readonly` modifier for properties.

```ts
interface Rx {
  readonly x: number;
}
let rx: Rx = { x: 1 };
rx.x = 12; // error
```

It also ships with a mapped type `Readonly<T>` that makes
all properties `readonly`:

```ts
interface X {
  x: number;
}
let rx: Readonly<X> = { x: 1 };
rx.x = 12; // error
```

And it has a specific `ReadonlyArray<T>` type that removes
side-affecting methods and prevents writing to indices of the array,
as well as special syntax for this type:

```ts
let a: ReadonlyArray<number> = [1, 2, 3];
let b: readonly number[] = [1, 2, 3];
a.push(102); // error
b[0] = 101; // error
```

You can also use a const-assertion, which operates on arrays and
object literals:

```ts
let a = [1, 2, 3] as const;
a.push(102); // error
a[0] = 101; // error
```

However, none of these options are the default, so they are not
consistently used in TypeScript code.

### Next Steps

This doc is a high level overview of the syntax and types you would use in everyday code. From here you should:

- Read the full Handbook from start to finish
- Explore the Playground examples
