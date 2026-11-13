---
title: "for...of"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/for...of/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# for...of

The **`for...of`** statement executes a loop that operates on a sequence of values sourced from an iterable object. Iterable objects include instances of built-ins such as `Array`, `String`, `TypedArray`, `Map`, `Set`, `NodeList` (and other DOM collections), as well as the `arguments` object, generators produced by generator functions, and user-defined iterables.

```js
const array = ["a", "b", "c"];

for (const element of array) {
  console.log(element);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```

## Syntax

```js
for (variable of iterable)
  statement
```

- `variable`
    Receives a value from the sequence on each iteration. May be either a declaration with `const`, `let`, `var`, `using`, `await using`, or an assignment target (e.g., a previously declared variable, an object property, or a destructuring pattern). Variables declared with `var` are not local to the loop, i.e., they are in the same scope the `for...of` loop is in.
- `iterable`
    An iterable object. The source of the sequence of values on which the loop operates.
- `statement`
    A statement to be executed on every iteration. May reference `variable`. You can use a block statement to execute multiple statements.

## Description

A `for...of` loop operates on the values sourced from an iterable one by one in sequential order. Each operation of the loop on a value is called an _iteration_, and the loop is said to _iterate over the iterable_. Each iteration executes statements that may refer to the current sequence value.

When a `for...of` loop iterates over an iterable, it first calls the iterable's `[Symbol.iterator]()` method, which returns an iterator, and then repeatedly calls the resulting iterator's `next()` method to produce the sequence of values to be assigned to `variable`.

A `for...of` loop exits when the iterator has completed (the `next()` result is an object with `done: true`). Like other looping statements, you can use control flow statements inside `statement`:

- `break` stops `statement` execution and goes to the first statement after the loop.
- `continue` stops `statement` execution and goes to the next iteration of the loop.

If the `for...of` loop exited early (e.g., a `break` statement is encountered or an error is thrown), the `return()` method of the iterator is called to perform any cleanup.

The `variable` part of `for...of` accepts anything that can come before the `=` operator. You can use `const` to declare the variable as long as it's not reassigned within the loop body (it can change between iterations, because those are two separate variables). Otherwise, you can use `let`.

```js
const iterable = [10, 20, 30];

for (let value of iterable) {
  value += 1;
  console.log(value);
}
// 11
// 21
// 31
```

> **Note:**
> Each iteration creates a new variable. Reassigning the variable inside the loop body does not affect the original value in the iterable (an array, in this case).

Variables declared using the `using` or `await using` declaration are disposed every time a loop iteration is done (and `await using` causes an implicit `await` at the end of the iteration). However, if the loop early-exits, any values left in the iterator that haven't been visited are not disposed (although the current value is).

```js
const resources = [dbConnection1, dbConnection2, dbConnection3];

for (using dbConnection of resources) {
  dbConnection.query("...");
  // dbConnection is disposed here
}
```

You can use destructuring to assign multiple local variables, or use a property accessor like `for (x.y of iterable)` to assign the value to an object property.

However, a special rule forbids using `async` as the variable name. This is invalid syntax:

```js
let async;
for (async of [1, 2, 3]); // SyntaxError: The left-hand side of a for-of loop may not be 'async'.
```

This is to avoid syntax ambiguity with the valid code `for (async of => {};;)`, which is a `for` loop.

Similarly, if you use the `using` declaration, then the variable cannot be called `of`:

```js
for (using of of []); // SyntaxError
```

This is to avoid syntax ambiguity with the valid code `for (using of [])`, before `using` was introduced.

## Examples

### Iterating over an Array

```js
const iterable = [10, 20, 30];

for (const value of iterable) {
  console.log(value);
}
// 10
// 20
// 30
```

### Iterating over a string

Strings are iterated by Unicode code points.

```js
const iterable = "boo";

for (const value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"
```

### Iterating over a TypedArray

```js
const iterable = new Uint8Array([0x00, 0xff]);

for (const value of iterable) {
  console.log(value);
}
// 0
// 255
```

### Iterating over a Map

```js
const iterable = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (const entry of iterable) {
  console.log(entry);
}
// ['a', 1]
// ['b', 2]
// ['c', 3]

for (const [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

### Iterating over a Set

```js
const iterable = new Set([1, 1, 2, 2, 3, 3]);

for (const value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

### Iterating over the arguments object

You can iterate over the `arguments` object to examine all parameters passed into a function.

```js
function foo() {
  for (const value of arguments) {
    console.log(value);
  }
}

foo(1, 2, 3);
// 1
// 2
// 3
```

### Iterating over a NodeList

The following example adds a `read` class to paragraphs that are direct descendants of the `` element by iterating over a `NodeList` DOM collection.

```js
const articleParagraphs = document.querySelectorAll("article > p");
for (const paragraph of articleParagraphs) {
  paragraph.classList.add("read");
}
```

### Iterating over a user-defined iterable

Iterating over an object with a `Symbol.iterator` method that returns a custom iterator:

```js
const iterable = {
  [Symbol.iterator]() {
    let i = 1;
    return {
      next() {
        if (i <= 3) {
          return { value: i++, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

Iterating over an object with a `Symbol.iterator` generator method:

```js
const iterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

_Iterable iterators_ (iterators with a `Symbol.iterator` method that returns `this`) are a fairly common technique to make iterators usable in syntaxes expecting iterables, such as `for...of`.

```js
let i = 1;

const iterator = {
  next() {
    if (i <= 3) {
      return { value: i++, done: false };
    }
    return { value: undefined, done: true };
  },
  [Symbol.iterator]() {
    return this;
  },
};

for (const value of iterator) {
  console.log(value);
}
// 1
// 2
// 3
```

### Iterating over a generator

```js
function* source() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = source();

for (const value of generator) {
  console.log(value);
}
// 1
// 2
// 3
```

### Early exiting

Execution of the `break` statement in the first loop causes it to exit early. The iterator is not finished yet, so the second loop will continue from where the first one stopped at.

```js
const source = [1, 2, 3];

const iterator = source[Symbol.iterator]();

for (const value of iterator) {
  console.log(value);
  if (value === 1) {
    break;
  }
  console.log("This string will not be logged.");
}
// 1

// Another loop using the same iterator
// picks up where the last loop left off.
for (const value of iterator) {
  console.log(value);
}
// 2
// 3

// The iterator is used up.
// This loop will execute no iterations.
for (const value of iterator) {
  console.log(value);
}
// [No output]
```

Generators implement the `return()` method, which causes the generator function to early return when the loop exits. This makes generators not reusable between loops.

```js
function* source() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = source();

for (const value of generator) {
  console.log(value);
  if (value === 1) {
    break;
  }
  console.log("This string will not be logged.");
}
// 1

// The generator is used up.
// This loop will execute no iterations.
for (const value of generator) {
  console.log(value);
}
// [No output]
```

### Difference between for...of and for...in

Both `for...in` and `for...of` statements iterate over something. The main difference between them is in what they iterate over.

The `for...in` statement iterates over the enumerable string properties of an object, while the `for...of` statement iterates over values that the iterable object defines to be iterated over.

The following example shows the difference between a `for...of` loop and a `for...in` loop when used with an `Array`.

```js
Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

const iterable = [3, 5, 7];
iterable.foo = "hello";

for (const i in iterable) {
  console.log(i);
}
// "0", "1", "2", "foo", "arrCustom", "objCustom"

for (const i in iterable) {
  if (Object.hasOwn(iterable, i)) {
    console.log(i);
  }
}
// "0" "1" "2" "foo"

for (const i of iterable) {
  console.log(i);
}
// 3 5 7
```

The object `iterable` inherits the properties `objCustom` and `arrCustom` because it contains both `Object.prototype` and `Array.prototype` in its prototype chain.

The `for...in` loop logs only enumerable properties of the `iterable` object. It doesn't log array _elements_ `3`, `5`, `7` or `"hello"` because those are not _properties_ — they are _values_. It logs array _indexes_ as well as `arrCustom` and `objCustom`, which are actual properties. If you're not sure why these properties are iterated over, there's a more thorough explanation of how array iteration and `for...in` work.

The second loop is similar to the first one, but it uses `Object.hasOwn()` to check if the found enumerable property is the object's own, i.e., not inherited. If it is, the property is logged. Properties `0`, `1`, `2` and `foo` are logged because they are own properties. Properties `arrCustom` and `objCustom` are not logged because they are inherited.

The `for...of` loop iterates and logs _values_ that `iterable`, as an array (which is iterable), defines to be iterated over. The object's _elements_ `3`, `5`, `7` are shown, but none of the object's _properties_ are.

## See also

- `Array.prototype.forEach()`
- `Map.prototype.forEach()`
- `Object.entries()`
