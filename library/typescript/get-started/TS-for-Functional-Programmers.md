---
title: "TypeScript for Functional Programmers (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/get-started/TS for Functional Programmers.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript for Functional Programmers

TypeScript began its life as an attempt to bring traditional object-oriented types
to JavaScript so that the programmers at Microsoft could bring
traditional object-oriented programs to the web. As it has developed, TypeScript's type
system has evolved to model code written by native JavaScripters. The
resulting system is powerful, interesting and messy.

This introduction is designed for working Haskell or ML programmers
who want to learn TypeScript. It describes how the type system of
TypeScript differs from Haskell's type system. It also describes
unique features of TypeScript's type system that arise from its
modelling of JavaScript code.

This introduction does not cover object-oriented programming. In
practice, object-oriented programs in TypeScript are similar to those
in other popular languages with OO features.

## Prerequisites

In this introduction, I assume you know the following:

- How to program in JavaScript, the good parts.
- Type syntax of a C-descended language.

If you need to learn the good parts of JavaScript, read
JavaScript: The Good Parts.
You may be able to skip the book if you know how to write programs in
a call-by-value lexically scoped language with lots of mutability and
not much else.
R4RS Scheme is a good example.

The C++ Programming Language is
a good place to learn about C-style type syntax. Unlike C++,
TypeScript uses postfix types, like so: `x: string` instead of `string x`.

## Concepts not in Haskell

### Built-in types

JavaScript defines 8 built-in types:

| Type        | Explanation                                 |
| ----------- | ------------------------------------------- |
| `Number`    | a double-precision IEEE 754 floating point. |
| `String`    | an immutable UTF-16 string.                 |
| `BigInt`    | integers in the arbitrary precision format. |
| `Boolean`   | `true` and `false`.                         |
| `Symbol`    | a unique value usually used as a key.       |
| `Null`      | equivalent to the unit type.                |
| `Undefined` | also equivalent to the unit type.           |
| `Object`    | similar to records.                         |

See the MDN page for more detail.

TypeScript has corresponding primitive types for the built-in types:

- `number`
- `string`
- `bigint`
- `boolean`
- `symbol`
- `null`
- `undefined`
- `object`

#### Other important TypeScript types

| Type           | Explanation                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `unknown`      | the top type.                                                                   |
| `never`        | the bottom type.                                                                |
| object literal | e.g. `{ property: Type }`                                                       |
| `void`         | for functions with no documented return value                                   |
| `T[]`          | mutable arrays, also written `Array<T>`                                         |
| `[T, T]`       | tuples, which are fixed-length but mutable                                      |
| `(t: T) => U`  | functions                                                                       |

Notes:

1. Function syntax includes parameter names. This is pretty hard to get used to!

   ```ts
   let fst: (a: any, b: any) => any = (a, b) => a;

   // or more precisely:

   let fst: <T, U>(a: T, b: U) => T = (a, b) => a;
   ```

2. Object literal type syntax closely mirrors object literal value syntax:

   ```ts
   let o: { n: number; xs: object[] } = { n: 1, xs: [] };
   ```

3. `[T, T]` is a subtype of `T[]`. This is different than Haskell, where tuples are not related to lists.

#### Boxed types

JavaScript has boxed equivalents of primitive types that contain the
methods that programmers associate with those types. TypeScript
reflects this with, for example, the difference between the primitive
type `number` and the boxed type `Number`. The boxed types are rarely
needed, since their methods return primitives.

```ts
(1).toExponential();
// equivalent to
Number.prototype.toExponential.call(1);
```

Note that calling a method on a numeric literal requires it to be in
parentheses to aid the parser.

### Gradual typing

TypeScript uses the type `any` whenever it can't tell what the type of
an expression should be. Compared to `Dynamic`, calling `any` a type
is an overstatement. It just turns off the type checker
wherever it appears. For example, you can push any value into an
`any[]` without marking the value in any way:

```ts
// with "noImplicitAny": false in tsconfig.json, anys: any[]
const anys = [];
anys.push(1);
anys.push("oh no");
anys.push({ anything: "goes" });
```

And you can use an expression of type `any` anywhere:

```ts
anys.map(anys[1]); // oh no, "oh no" is not a function
```

`any` is contagious, too — if you initialize a variable with an
expression of type `any`, the variable has type `any` too.

```ts
let sepsis = anys[0] + anys[1]; // this could mean anything
```

To get an error when TypeScript produces an `any`, use
`"noImplicitAny": true`, or `"strict": true` in `tsconfig.json`.

### Structural typing

Structural typing is a familiar concept to most functional
programmers, although Haskell and most MLs are not
structurally typed. Its basic form is pretty simple:

```ts
let o = { x: "hi", extra: 1 }; // ok
let o2: { x: string } = o; // ok
```

Here, the object literal `{ x: "hi", extra: 1 }` has a matching
literal type `{ x: string, extra: number }`. That
type is assignable to `{ x: string }` since
it has all the required properties and those properties have
assignable types. The extra property doesn't prevent assignment, it
just makes it a subtype of `{ x: string }`.

Named types just give a name to a type; for assignability purposes
there's no difference between the type alias `One` and the interface
type `Two` below. They both have a property `p: string`. (Type aliases
behave differently from interfaces with respect to recursive
definitions and type parameters, however.)

```ts
type One = { p: string };
interface Two {
  p: string;
}
class Three {
  p = "Hello";
}

let x: One = { p: "hi" };
let two: Two = x;
two = new Three();
```

### Unions

In TypeScript, union types are untagged. In other words, they are not
discriminated unions like `data` in Haskell. However, you can often
discriminate types in a union using built-in tags or other properties.

```ts
function start(
  arg: string | string[] | (() => string) | { s: string }
): string {
  // this is super common in JavaScript
  if (typeof arg === "string") {
    return commonCase(arg);
  } else if (Array.isArray(arg)) {
    return arg.map(commonCase).join(",");
  } else if (typeof arg === "function") {
    return commonCase(arg());
  } else {
    return commonCase(arg.s);
  }

  function commonCase(s: string): string {
    // finally, just convert a string to another string
    return s;
  }
}
```

`string`, `Array` and `Function` have built-in type predicates,
conveniently leaving the object type for the `else` branch. It is
possible, however, to generate unions that are difficult to
differentiate at runtime. For new code, it's best to build only
discriminated unions.

The following types have built-in predicates:

| Type      | Predicate                          |
| --------- | ---------------------------------- |
| string    | `typeof s === "string"`            |
| number    | `typeof n === "number"`            |
| bigint    | `typeof m === "bigint"`            |
| boolean   | `typeof b === "boolean"`           |
| symbol    | `typeof g === "symbol"`            |
| undefined | `typeof undefined === "undefined"` |
| function  | `typeof f === "function"`          |
| array     | `Array.isArray(a)`                 |
| object    | `typeof o === "object"`            |

Note that functions and arrays are objects at runtime, but have their
own predicates.

#### Intersections

In addition to unions, TypeScript also has intersections:

```ts
type Combined = { a: number } & { b: string };
type Conflicting = { a: number } & { a: string };
```

`Combined` has two properties, `a` and `b`, just as if they had been
written as one object literal type. Intersection and union are
recursive in case of conflicts, so `Conflicting.a: number & string`.

### Unit types

Unit types are subtypes of primitive types that contain exactly one
primitive value. For example, the string `"foo"` has the type
`"foo"`. Since JavaScript has no built-in enums, it is common to use a set of
well-known strings instead. Unions of string literal types allow
TypeScript to type this pattern:

```ts
declare function pad(s: string, n: number, direction: "left" | "right"): string;
pad("hi", 10, "left");
```

When needed, the compiler _widens_ — converts to a
supertype — the unit type to the primitive type, such as `"foo"`
to `string`. This happens when using mutability, which can hamper some
uses of mutable variables:

```ts
declare function pad(s: string, n: number, direction: "left" | "right"): string;
let s = "right";
pad("hi", 10, s); // error: 'string' is not assignable to '"left" | "right"'
```

Here's how the error happens:

- `"right": "right"`
- `s: string` because `"right"` widens to `string` on assignment to a mutable variable.
- `string` is not assignable to `"left" | "right"`

You can work around this with a type annotation for `s`, but that
in turn prevents assignments to `s` of variables that are not of type
`"left" | "right"`.

```ts
declare function pad(s: string, n: number, direction: "left" | "right"): string;
let s: "left" | "right" = "right";
pad("hi", 10, s);
```
