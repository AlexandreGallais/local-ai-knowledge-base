---
title: "Destructuring (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/destructuring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Destructuring

The **destructuring** syntax is a JavaScript syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. It can be used in locations that receive data (such as the left-hand side of an assignment or anywhere that creates new identifier bindings).

```js
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// Expected output: 10

console.log(b);
// Expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// Expected output: Array [30, 40, 50]
```

## Syntax

```js
const [a, b] = array;
const [a, , b] = array;
const [a = aDefault, b] = array;
const [a, b, ...rest] = array;
const [a, , b, ...rest] = array;
const [a, b, ...{ pop, push }] = array;
const [a, b, ...[c, d]] = array;

const { a, b } = obj;
const { a: a1, b: b1 } = obj;
const { a: a1 = aDefault, b = bDefault } = obj;
const { a, b, ...rest } = obj;
const { a: a1, b: b1, ...rest } = obj;
const { [key]: a } = obj;

let a, b, a1, b1, c, d, rest, pop, push;
[a, b] = array;
[a, , b] = array;
[a = aDefault, b] = array;
[a, b, ...rest] = array;
[a, , b, ...rest] = array;
[a, b, ...{ pop, push }] = array;
[a, b, ...[c, d]] = array;

({ a, b } = obj); // parentheses are required
({ a: a1, b: b1 } = obj);
({ a: a1 = aDefault, b = bDefault } = obj);
({ a, b, ...rest } = obj);
({ a: a1, b: b1, ...rest } = obj);
```

## Description

The object and array literal expressions provide an easy way to create _ad hoc_ packages of data.

```js
const arr = [a, b, c];
```

The destructuring uses similar syntax but uses it on the left-hand side of the assignment instead. It performs the reverse operation of an array declaration, by declaring each element in the collection as a separate variable.

```js
const arr = [1, 2, 3];
const [a, b, c] = arr;
// a = 1, b = 2, c = 3
```

As for objects, compare the two pairs of lines below, and see how there's a direct correspondence within each pair.

```js
const obj = { a, b, c };
const { a, b, c } = obj;
// Equivalent to:
// const a = obj.a, b = obj.b, c = obj.c;

const obj = { prop1: x, prop2: y, prop3: z };
const { prop1: x, prop2: y, prop3: z } = obj;
// Equivalent to:
// const x = obj.prop1, y = obj.prop2, z = obj.prop3;
```

This capability is similar to features present in languages such as Perl and Python.

For features specific to array or object destructuring, refer to the individual examples below.

### Binding and assignment

For both object and array destructuring, there are two kinds of destructuring patterns: _binding pattern_ and _assignment pattern_, with slightly different syntaxes.

In binding patterns, the pattern starts with a declaration keyword (`var`, `let`, or `const`). Then, each individual property must either be bound to a variable or further destructured.

```js
const obj = { a: 1, b: { c: 2 } };
const {
  a,
  b: { c: d },
} = obj;
// Two variables are bound: `a` and `d`
```

All variables share the same declaration, so if you want some variables to be re-assignable but others to be read-only, you may have to destructure twice — once with `let`, once with `const`.

```js
const obj = { a: 1, b: { c: 2 } };
const { a } = obj; // a is constant
let {
  b: { c: d },
} = obj; // d is re-assignable
```

In many other syntaxes where the language binds a variable for you, you can use a binding destructuring pattern. These include:

- The looping variable of `for...in` `for...of`, and `for await...of` loops;
- Function parameters;
- The `catch` binding variable.

In assignment patterns, the pattern does not start with a keyword. Each destructured property is assigned to a target of assignment — which may either be declared beforehand with `var` or `let`, or is a property of another object — in general, anything that can appear on the left-hand side of an assignment expression.

```js
const numbers = [];
const obj = { a: 1, b: 2 };
({ a: numbers[0], b: numbers[1] } = obj);
// The properties `a` and `b` are assigned to properties of `numbers`
```

> **Note:**
> The parentheses `( ... )` around the assignment statement are required when using object literal destructuring without a declaration.
>
> `{ a, b } = { a: 1, b: 2 }` is not valid stand-alone syntax, as the `{ a, b }` on the left-hand side is considered a block and not an object literal according to the rules of expression statements. However, `({ a, b } = { a: 1, b: 2 })` is valid, as is `const { a, b } = { a: 1, b: 2 }`.
>
> If your coding style does not include trailing semicolons, the `( ... )` expression needs to be preceded by a semicolon, or it may be used to execute a function on the previous line.

Note that the equivalent _binding pattern_ of the code above is not valid syntax:

```js
const numbers = [];
const obj = { a: 1, b: 2 };
const { a: numbers[0], b: numbers[1] } = obj;

// This is equivalent to:
//   const numbers[0] = obj.a;
//   const numbers[1] = obj.b;
// Which definitely is not valid.
```

You can only use assignment patterns as the left-hand side of the assignment operator. You cannot use them with compound assignment operators such as `+=` or `*=`.

### Default value

Each destructured property can have a _default value_. The default value is used when the property is not present, or has value `undefined`. It is not used if the property has value `null`.

```js
const [a = 1] = []; // a is 1
const { b = 2 } = { b: undefined }; // b is 2
const { c = 2 } = { c: null }; // c is null
```

The default value can be any expression. It will only be evaluated when necessary.

```js
const { b = console.log("hey") } = { b: 2 };
// Does not log anything, because `b` is defined and there's no need
// to evaluate the default value.
```

### Rest properties and rest elements

You can end a destructuring pattern with a rest property `...rest`. For array destructuring, it collects remaining elements of the iterable into a new array called `rest` (or any name you give it). For object destructuring, it copies all enumerable own properties of the object that are not already picked off by the destructuring pattern into a new object called `rest`.

More formally, the `...rest` syntax is called "rest elements" in array destructuring and "rest properties" in object destructuring, but we often just collectively call them "rest property".

```js
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(others); // { b: 2, c: 3 }

const [first, ...others2] = [1, 2, 3];
console.log(others2); // [2, 3]
```

The rest property must be the last in the pattern, and must not have a trailing comma.

```js
const [a, ...b,] = [1, 2, 3];

// SyntaxError: rest element may not have a trailing comma
// Always consider using rest operator as the last element
```

Like any other JavaScript language feature, there is no implicit deep-copying. The rest property creates a new object (or array), but all its member values, if they are object references, remain the same.
