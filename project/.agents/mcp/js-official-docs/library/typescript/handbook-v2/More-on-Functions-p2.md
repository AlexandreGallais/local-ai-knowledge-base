---
title: "More on Functions (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/handbook-v2/More on Functions.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# More on Functions (part 2 of 2)

## Function Overloads

Some JavaScript functions can be called in a variety of argument counts and types.
For example, you might write a function to produce a `Date` that takes either a timestamp (one argument) or a month/day/year specification (three arguments).

In TypeScript, we can specify a function that can be called in different ways by writing _overload signatures_.
To do this, write some number of function signatures (usually two or more), followed by the body of the function:

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
```

In this example, we wrote two overloads: one accepting one argument, and another accepting three arguments.
These first two signatures are called the _overload signatures_.

Then, we wrote a function implementation with a compatible signature.
Functions have an _implementation_ signature, but this signature can't be called directly.
Even though we wrote a function with two optional parameters after the required one, it can't be called with two parameters!

### Overload Signatures and the Implementation Signature

This is a common source of confusion.
Often people will write code like this and not understand why there is an error:

```ts
function fn(x: string): void;
function fn() {
  // ...
}
// Expected to be able to call with zero arguments
fn();
```

Again, the signature used to write the function body can't be "seen" from the outside.

> The signature of the _implementation_ is not visible from the outside.
> When writing an overloaded function, you should always have _two_ or more signatures above the implementation of the function.

The implementation signature must also be _compatible_ with the overload signatures.
For example, these functions have errors because the implementation signature doesn't match the overloads in a correct way:

```ts
function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void;
function fn(x: boolean) {}
```

```ts
function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;
function fn(x: string | number) {
  return "oops";
}
```

### Writing Good Overloads

Like generics, there are a few guidelines you should follow when using function overloads.
Following these principles will make your function easier to call, easier to understand, and easier to implement.

Let's consider a function that returns the length of a string or an array:

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

This function is fine; we can invoke it with strings or arrays.
However, we can't invoke it with a value that might be a string _or_ an array, because TypeScript can only resolve a function call to a single overload:

```ts
declare function len(s: string): number;
declare function len(arr: any[]): number;
len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);
```

Because both overloads have the same argument count and same return type, we can instead write a non-overloaded version of the function:

```ts
function len(x: any[] | string) {
  return x.length;
}
```

This is much better!
Callers can invoke this with either sort of value, and as an added bonus, we don't have to figure out a correct implementation signature.

> Always prefer parameters with union types instead of overloads when possible

## Declaring `this` in a Function

TypeScript will infer what the `this` should be in a function via code flow analysis, for example in the following:

```ts
const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```

TypeScript understands that the function `user.becomeAdmin` has a corresponding `this` which is the outer object `user`. `this`, _heh_, can be enough for a lot of cases, but there are a lot of cases where you need more control over what object `this` represents. The JavaScript specification states that you cannot have a parameter called `this`, and so TypeScript uses that syntax space to let you declare the type for `this` in the function body.

```ts
interface User {
  id: number;
  admin: boolean;
}
declare const getDB: () => DB;
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

This pattern is common with callback-style APIs, where another object typically controls when your function is called. Note that you need to use `function` and not arrow functions to get this behavior:

```ts
interface User {
  id: number;
  admin: boolean;
}
declare const getDB: () => DB;
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(() => this.admin);
```

## Other Types to Know About

There are some additional types you'll want to recognize that appear often when working with function types.
Like all types, you can use them everywhere, but these are especially relevant in the context of functions.

### `void`

`void` represents the return value of functions which don't return a value.
It's the inferred type any time a function doesn't have any `return` statements, or doesn't return any explicit value from those return statements:

```ts
// The inferred return type is void
function noop() {
  return;
}
```

In JavaScript, a function that doesn't return any value will implicitly return the value `undefined`.
However, `void` and `undefined` are not the same thing in TypeScript.
There are further details at the end of this chapter.

> `void` is not the same as `undefined`.

### `object`

The special type `object` refers to any value that isn't a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, or `undefined`).
This is different from the _empty object type_ `{ }`, and also different from the global type `Object`.
It's very likely you will never use `Object`.

> `object` is not `Object`. **Always** use `object`!

Note that in JavaScript, function values are objects: They have properties, have `Object.prototype` in their prototype chain, are `instanceof Object`, you can call `Object.keys` on them, and so on.
For this reason, function types are considered to be `object`s in TypeScript.

### `unknown`

The `unknown` type represents _any_ value.
This is similar to the `any` type, but is safer because it's not legal to do anything with an `unknown` value:

```ts
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
}
```

This is useful when describing function types because you can describe functions that accept any value without having `any` values in your function body.

Conversely, you can describe a function that returns a value of unknown type:

```ts
declare const someRandomString: string;
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

### `never`

Some functions _never_ return a value:

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

The `never` type represents values which are _never_ observed.
In a return type, this means that the function throws an exception or terminates execution of the program.

`never` also appears when TypeScript determines there's nothing left in a union.

```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

### `Function`

The global type `Function` describes properties like `bind`, `call`, `apply`, and others present on all function values in JavaScript.
It also has the special property that values of type `Function` can always be called; these calls return `any`:

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

This is an _untyped function call_ and is generally best avoided because of the unsafe `any` return type.

If you need to accept an arbitrary function but don't intend to call it, the type `() => void` is generally safer.

## Rest Parameters and Arguments

   Background Reading:
   Rest Parameters
   Spread Syntax

### Rest Parameters

In addition to using optional parameters or overloads to make functions that can accept a variety of fixed argument counts, we can also define functions that take an _unbounded_ number of arguments using _rest parameters_.

A rest parameter appears after all other parameters, and uses the `...` syntax:

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

In TypeScript, the type annotation on these parameters is implicitly `any[]` instead of `any`, and any type annotation given must be of the form `Array<T>` or `T[]`, or a tuple type (which we'll learn about later).

### Rest Arguments

Conversely, we can _provide_ a variable number of arguments from an iterable object (for example, an array) using the spread syntax.
For example, the `push` method of arrays takes any number of arguments:

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

Note that in general, TypeScript does not assume that arrays are immutable.
This can lead to some surprising behavior:

```ts
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
```

The best fix for this situation depends a bit on your code, but in general a `const` context is the most straightforward solution:

```ts
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

Using rest arguments may require turning on `downlevelIteration` when targeting older runtimes.

## Parameter Destructuring

   Background Reading:
   Destructuring Assignment

You can use parameter destructuring to conveniently unpack objects provided as an argument into one or more local variables in the function body.
In JavaScript, it looks like this:

```js
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```

The type annotation for the object goes after the destructuring syntax:

```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

This can look a bit verbose, but you can use a named type here as well:

```ts
// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## Assignability of Functions

### Return type `void`

The `void` return type for functions can produce some unusual, but expected behavior.

Contextual typing with a return type of `void` does **not** force functions to **not** return something. Another way to say this is a contextual function type with a `void` return type (`type voidFunc = () => void`), when implemented, can return _any_ other value, but it will be ignored.

Thus, the following implementations of the type `() => void` are valid:

```ts
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};
```

And when the return value of one of these functions is assigned to another variable, it will retain the type of `void`:

```ts
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};
const v1 = f1();

const v2 = f2();

const v3 = f3();
```

This behavior exists so that the following code is valid even though `Array.prototype.push` returns a number and the `Array.prototype.forEach` method expects a function with a return type of `void`.

```ts
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
```

There is one other special case to be aware of, when a literal function definition has a `void` return type, that function must **not** return anything.

```ts
function f2(): void {
  return true;
}

const f3 = function (): void {
  return true;
};
```

For more on `void` please refer to these other documentation entries:

- FAQ - "Why are functions returning non-void assignable to function returning void?"
