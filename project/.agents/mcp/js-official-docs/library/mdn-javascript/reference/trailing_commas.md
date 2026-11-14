---
title: "Trailing commas"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/trailing_commas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Trailing commas

**Trailing commas** (sometimes called "final commas") can be useful when adding new elements, parameters, or properties to JavaScript code. If you want to add a new property, you can add a new line without modifying the previously last line if that line already uses a trailing comma. This makes version-control diffs cleaner and editing code might be less troublesome.

JavaScript has allowed trailing commas in array literals since the beginning. Trailing commas are now also allowed in object literals, function parameters, named imports, named exports, and more.

JSON, however, disallows all trailing commas.

## Description

JavaScript allows trailing commas wherever a comma-separated list of values is accepted and more values may be expected after the last item. This includes:

- Array literals
- Object literals
- Parameter definitions
- Function calls
- Named imports
- Named exports
- Dynamic import
- Array and object destructuring

In all these cases, the trailing comma is entirely optional and doesn't change the program's semantics in any way.

It is particularly useful when adding, removing, or reordering items in a list that spans multiple lines, because it reduces the number of lines that need to be changed, which helps with both editing and reviewing the diff.

```diff
  [
    "foo",
+   "baz",
    "bar",
-   "baz",
  ]
```

## Examples

### Trailing commas in literals

#### Arrays

JavaScript ignores trailing commas in array literals:

```js
const arr = [
  1,
  2,
  3,
];

arr; // [1, 2, 3]
arr.length; // 3
```

If more than one trailing comma is used, an elision (or hole) is produced. An array with holes is called _sparse_ (a _dense_ array has no holes). When iterating arrays for example with `Array.prototype.forEach()` or `Array.prototype.map()`, array holes are skipped. Sparse arrays are generally unfavorable, so you should avoid having multiple trailing commas.

```js
const arr = [1, 2, 3, , ,];
arr.length; // 5
```

#### Objects

Trailing commas in object literals are legal as well:

```js
const object = {
  foo: "bar",
  baz: "qwerty",
  age: 42,
};
```

### Trailing commas in functions

Trailing commas are also allowed in function parameter lists.

#### Parameter definitions

The following function definition pairs are legal and equivalent to each other. Trailing commas don't affect the `length` property of function declarations or their `arguments` object.

```js
function f(p) {}
function f(p,) {}

(p) => {};
(p,) => {};
```

The trailing comma also works with method definitions for classes or objects:

```js
class C {
  one(a,) {}
  two(a, b,) {}
}

const obj = {
  one(a,) {},
  two(a, b,) {},
};
```

#### Function calls

The following function invocation pairs are legal and equivalent to each other.

```js
f(p);
f(p,);

Math.max(10, 20);
Math.max(10, 20,);
```

#### Illegal trailing commas

Function parameter definitions or function invocations only containing a comma will throw a `SyntaxError`. Furthermore, when using rest parameters, trailing commas are not allowed:

```js
function f(,) {} // SyntaxError: missing formal parameter
(,) => {};       // SyntaxError: expected expression, got ','
f(,)             // SyntaxError: expected expression, got ','

function f(...p,) {} // SyntaxError: parameter after rest parameter
(...p,) => {}        // SyntaxError: expected closing parenthesis, got ','
```

### Trailing commas in destructuring

A trailing comma is also allowed within a destructuring pattern:

```js
// array destructuring with trailing comma
[a, b,] = [1, 2];

// object destructuring with trailing comma
const o = {
  p: 42,
  q: true,
};
const { p, q, } = o;
```

However, a trailing comma is not allowed after the rest element, if present

```js
const [a, ...b,] = [1, 2, 3];
// SyntaxError: rest element may not have a trailing comma
```

### Trailing commas in JSON

As JSON is based on a very restricted subset of JavaScript syntax, **trailing commas are not allowed in JSON**.

Both lines will throw a `SyntaxError`:

```js
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');
// SyntaxError JSON.parse: unexpected character
// at line 1 column 14 of the JSON data
```

Omit the trailing commas to parse the JSON correctly:

```js
JSON.parse("[1, 2, 3, 4 ]");
JSON.parse('{"foo" : 1 }');
```

### Trailing commas in named imports and named exports

Trailing commas are valid in named imports and named exports.

#### Named imports

```js
import {
  A,
  B,
  C,
} from "D";

import { X, Y, Z, } from "W";

import { A as B, C as D, E as F, } from "Z";
```

#### Named exports

```js
export {
  A,
  B,
  C,
};

export { A, B, C, };

export { A as B, C as D, E as F, };
```

### Trailing commas in dynamic import

Trailing commas are only allowed in dynamic imports if the runtime also implements the second `options` parameter.

```js
import("D",);
import(
  "D",
  { with: { type: "json" } },
);
```

### Quantifier prefix

> **Note:**
> The trailing comma in a quantifier actually changes its semantics from matching "exactly `n`" to matching "at least `n`".

```js
/x{2}/; // Exactly 2 occurrences of "x"; equivalent to /xx/
/x{2,}/; // At least 2 occurrences of "x"; equivalent to /xx+/
/x{2,4}/; // 2 to 4 occurrences of "x"; equivalent to /xxx?x?/
```

## See also

- Grammar and types guide
