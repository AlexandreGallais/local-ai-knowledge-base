---
title: "TypeScript 2.0 (part 1 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 2.0.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 2.0

## Null- and undefined-aware types

TypeScript has two special types, Null and Undefined, that have the values `null` and `undefined` respectively.
Previously it was not possible to explicitly name these types, but `null` and `undefined` may now be used as type names regardless of type checking mode.

The type checker previously considered `null` and `undefined` assignable to anything.
Effectively, `null` and `undefined` were valid values of _every_ type and it wasn't possible to specifically exclude them (and therefore not possible to detect erroneous use of them).

## `--strictNullChecks`

`strictNullChecks` switches to a new strict null checking mode.

In strict null checking mode, the `null` and `undefined` values are _not_ in the domain of every type and are only assignable to themselves and `any` (the one exception being that `undefined` is also assignable to `void`).
So, whereas `T` and `T | undefined` are considered synonymous in regular type checking mode (because `undefined` is considered a subtype of any `T`), they are different types in strict type checking mode, and only `T | undefined` permits `undefined` values. The same is true for the relationship of `T` to `T | null`.

##### Example

```ts
// Compiled with --strictNullChecks
let x: number;
let y: number | undefined;
let z: number | null | undefined;
x = 1; // Ok
y = 1; // Ok
z = 1; // Ok
x = undefined; // Error
y = undefined; // Ok
z = undefined; // Ok
x = null; // Error
y = null; // Error
z = null; // Ok
x = y; // Error
x = z; // Error
y = x; // Ok
y = z; // Error
z = x; // Ok
z = y; // Ok
```

## Assigned-before-use checking

In strict null checking mode the compiler requires every reference to a local variable of a type that doesn't include `undefined` to be preceded by an assignment to that variable in every possible preceding code path.

##### Example

```ts
// Compiled with --strictNullChecks
let x: number;
let y: number | null;
let z: number | undefined;
x; // Error, reference not preceded by assignment
y; // Error, reference not preceded by assignment
z; // Ok
x = 1;
y = null;
x; // Ok
y; // Ok
```

The compiler checks that variables are definitely assigned by performing _control flow based type analysis_. See later for further details on this topic.

## Optional parameters and properties

Optional parameters and properties automatically have `undefined` added to their types, even when their type annotations don't specifically include `undefined`.
For example, the following two types are identical:

```ts
// Compiled with --strictNullChecks
type T1 = (x?: number) => string; // x has type number | undefined
type T2 = (x?: number | undefined) => string; // x has type number | undefined
```

## Non-null and non-undefined type guards

A property access or a function call produces a compile-time error if the object or function is of a type that includes `null` or `undefined`.
However, type guards are extended to support non-null and non-undefined checks.

##### Example

```ts
// Compiled with --strictNullChecks
declare function f(x: number): string;
let x: number | null | undefined;
if (x) {
  f(x); // Ok, type of x is number here
} else {
  f(x); // Error, type of x is number? here
}
let a = x != null ? f(x) : ""; // Type of a is string
let b = x && f(x); // Type of b is string | 0 | null | undefined
```

Non-null and non-undefined type guards may use the `==`, `!=`, `===`, or `!==` operator to compare to `null` or `undefined`, as in `x != null` or `x === undefined`.
The effects on subject variable types accurately reflect JavaScript semantics (e.g. double-equals operators check for both values no matter which one is specified whereas triple-equals only checks for the specified value).

## Dotted names in type guards

Type guards previously only supported checking local variables and parameters.
Type guards now support checking "dotted names" consisting of a variable or parameter name followed by one or more property accesses.

##### Example

```ts
interface Options {
  location?: {
    x?: number;
    y?: number;
  };
}

function foo(options?: Options) {
  if (options && options.location && options.location.x) {
    const x = options.location.x; // Type of x is number
  }
}
```

Type guards for dotted names also work with user defined type guard functions and the `typeof` and `instanceof` operators and do not depend on the `strictNullChecks` compiler option.

A type guard for a dotted name has no effect following an assignment to any part of the dotted name.
For example, a type guard for `x.y.z` will have no effect following an assignment to `x`, `x.y`, or `x.y.z`.

## Expression operators

Expression operators permit operand types to include `null` and/or `undefined` but always produce values of non-null and non-undefined types.

```ts
// Compiled with --strictNullChecks
function sum(a: number | null, b: number | null) {
  return a + b; // Produces value of type number
}
```

The `&&` operator adds `null` and/or `undefined` to the type of the right operand depending on which are present in the type of the left operand, and the `||` operator removes both `null` and `undefined` from the type of the left operand in the resulting union type.

```ts
// Compiled with --strictNullChecks
interface Entity {
  name: string;
}
let x: Entity | null;
let s = x && x.name; // s is of type string | null
let y = x || { name: "test" }; // y is of type Entity
```

## Type widening

The `null` and `undefined` types are _not_ widened to `any` in strict null checking mode.

```ts
let z = null; // Type of z is null
```

In regular type checking mode the inferred type of `z` is `any` because of widening, but in strict null checking mode the inferred type of `z` is `null` (and therefore, absent a type annotation, `null` is the only possible value for `z`).

## Non-null assertion operator

A new `!` post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts where the type checker is unable to conclude that fact.
Specifically, the operation `x!` produces a value of the type of `x` with `null` and `undefined` excluded.
Similar to type assertions of the forms `<T>x` and `x as T`, the `!` non-null assertion operator is simply removed in the emitted JavaScript code.

```ts
// Compiled with --strictNullChecks
function validateEntity(e?: Entity) {
  // Throw exception if e is null or invalid entity
}

function processEntity(e?: Entity) {
  validateEntity(e);
  let s = e!.name; // Assert that e is non-null and access name
}
```

## Compatibility

The new features are designed such that they can be used in both strict null checking mode and regular type checking mode.
In particular, the `null` and `undefined` types are automatically erased from union types in regular type checking mode (because they are subtypes of all other types), and the `!` non-null assertion expression operator is permitted but has no effect in regular type checking mode. Thus, declaration files that are updated to use null- and undefined-aware types can still be used in regular type checking mode for backwards compatibility.

In practical terms, strict null checking mode requires that all files in a compilation are null- and undefined-aware.

## Control flow based type analysis

TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.
Previously, the type analysis performed for type guards was limited to `if` statements and `?:` conditional expressions and didn't include effects of assignments and control flow constructs such as `return` and `break` statements.
With TypeScript 2.0, the type checker analyses all possible flows of control in statements and expressions to produce the most specific type possible (the _narrowed type_) at any given location for a local variable or parameter that is declared to have a union type.

##### Example

```ts
function foo(x: string | number | boolean) {
  if (typeof x === "string") {
    x; // type of x is string here
    x = 1;
    x; // type of x is number here
  }
  x; // type of x is number | boolean here
}

function bar(x: string | number) {
  if (typeof x === "number") {
    return;
  }
  x; // type of x is string here
}
```

Control flow based type analysis is particularly relevant in `strictNullChecks` mode because nullable types are represented using union types:

```ts
function test(x: string | null) {
  if (x === null) {
    return;
  }
  x; // type of x is string in remainder of function
}
```

Furthermore, in `strictNullChecks` mode, control flow based type analysis includes _definite assignment analysis_ for local variables of types that don't permit the value `undefined`.

```ts
function mumble(check: boolean) {
  let x: number; // Type doesn't permit undefined
  x; // Error, x is undefined
  if (check) {
    x = 1;
    x; // Ok
  }
  x; // Error, x is possibly undefined
  x = 2;
  x; // Ok
}
```

## Tagged union types

TypeScript 2.0 implements support for tagged (or discriminated) union types.
Specifically, the TS compiler now support type guards that narrow union types based on tests of a discriminant property and furthermore extend that capability to `switch` statements.

##### Example

```ts
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  // In the following switch statement, the type of s is narrowed in each case clause
  // according to the value of the discriminant property, thus allowing the other properties
  // of that variant to be accessed without a type assertion.
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.width * s.height;
    case "circle":
      return Math.PI * s.radius * s.radius;
  }
}

function test1(s: Shape) {
  if (s.kind === "square") {
    s; // Square
  } else {
    s; // Rectangle | Circle
  }
}

function test2(s: Shape) {
  if (s.kind === "square" || s.kind === "rectangle") {
    return;
  }
  s; // Circle
}
```

A _discriminant property type guard_ is an expression of the form `x.p == v`, `x.p === v`, `x.p != v`, or `x.p !== v`, where `p` and `v` are a property and an expression of a string literal type or a union of string literal types.
The discriminant property type guard narrows the type of `x` to those constituent types of `x` that have a discriminant property `p` with one of the possible values of `v`.

Note that we currently only support discriminant properties of string literal types.
We intend to later add support for boolean and numeric literal types.

## The `never` type

TypeScript 2.0 introduces a new primitive type `never`.
The `never` type represents the type of values that never occur.
Specifically, `never` is the return type for functions that never return and `never` is the type of variables under type guards that are never true.

The `never` type has the following characteristics:

- `never` is a subtype of and assignable to every type.
- No type is a subtype of or assignable to `never` (except `never` itself).
- In a function expression or arrow function with no return type annotation, if the function has no `return` statements, or only `return` statements with expressions of type `never`, and if the end point of the function is not reachable (as determined by control flow analysis), the inferred return type for the function is `never`.
- In a function with an explicit `never` return type annotation, all `return` statements (if any) must have expressions of type `never` and the end point of the function must not be reachable.

Because `never` is a subtype of every type, it is always omitted from union types and it is ignored in function return type inference as long as there are other types being returned.

Some examples of functions returning `never`:

```ts
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

Some examples of use of functions returning `never`:

```ts
// Inferred return type is number
function move1(direction: "up" | "down") {
  switch (direction) {
    case "up":
      return 1;
    case "down":
      return -1;
  }
  return error("Should never get here");
}

// Inferred return type is number
function move2(direction: "up" | "down") {
  return direction === "up"
    ? 1
    : direction === "down"
    ? -1
    : error("Should never get here");
}

// Inferred return type is T
function check<T>(x: T | undefined) {
  return x || error("Undefined value");
}
```

Because `never` is assignable to every type, a function returning `never` can be used when a callback returning a more specific type is required:

```ts
function test(cb: () => string) {
  let s = cb();
  return s;
}

test(() => "hello");
test(() => fail());
test(() => {
  throw new Error();
});
```

## Read-only properties and index signatures

A property or index signature can now be declared with the `readonly` modifier.

Read-only properties may have initializers and may be assigned to in constructors within the same class declaration, but otherwise assignments to read-only properties are disallowed.

In addition, entities are _implicitly_ read-only in several situations:

- A property declared with a `get` accessor and no `set` accessor is considered read-only.
- In the type of an enum object, enum members are considered read-only properties.
- In the type of a module object, exported `const` variables are considered read-only properties.
- An entity declared in an `import` statement is considered read-only.
- An entity accessed through an ES2015 namespace import is considered read-only (e.g. `foo.x` is read-only when `foo` is declared as `import * as foo from "foo"`).

##### Example

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

var p1: Point = { x: 10, y: 20 };
p1.x = 5; // Error, p1.x is read-only

var p2 = { x: 1, y: 1 };
var p3: Point = p2; // Ok, read-only alias for p2
p3.x = 5; // Error, p3.x is read-only
p2.x = 5; // Ok, but also changes p3.x because of aliasing
```

```ts
class Foo {
  readonly a = 1;
  readonly b: string;
  constructor() {
    this.b = "hello"; // Assignment permitted in constructor
  }
}
```

```ts
let a: Array<number> = [0, 1, 2, 3, 4];
let b: ReadonlyArray<number> = a;
b[5] = 5; // Error, elements are read-only
b.push(5); // Error, no push method (because it mutates array)
b.length = 3; // Error, length is read-only
a = b; // Error, mutating methods are missing
```
