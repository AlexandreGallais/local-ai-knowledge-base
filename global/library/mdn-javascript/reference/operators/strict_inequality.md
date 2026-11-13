---
title: "Strict inequality (!==)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/strict_inequality/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Strict inequality (!==)

The **strict inequality (`!==`)** operator checks whether its two operands are
not equal, returning a Boolean result. Unlike the inequality
operator, the strict inequality operator always considers operands of different types to
be different.

```js
console.log(1 !== 1);
// Expected output: false

console.log("hello" !== "hello");
// Expected output: false

console.log("1" !== 1);
// Expected output: true

console.log(0 !== false);
// Expected output: true
```

## Syntax

```js
x !== y
```

## Description

The strict inequality operator checks whether its operands are not equal.
It is the negation of the
strict equality operator
so the following two lines will always give the same result:

```js
x !== y;

!(x === y);
```

For details of the comparison algorithm, see the page for the
strict equality operator.

Like the strict equality operator, the strict inequality operator will always consider
operands of different types to be different:

```js
3 !== "3"; // true
```

## Examples

### Comparing operands of the same type

```js
"hello" !== "hello"; // false
"hello" !== "hola"; // true

3 !== 3; // false
3 !== 4; // true

true !== true; // false
true !== false; // true

null !== null; // false
```

### Comparing operands of different types

```js
"3" !== 3; // true
true !== 1; // true
null !== undefined; // true
```

### Comparing objects

```js
const object1 = {
  key: "value",
};

const object2 = {
  key: "value",
};

console.log(object1 !== object2); // true
console.log(object1 !== object1); // false
```

## See also

- Equality (`==`)
- Inequality (`!=`)
- Strict equality (`===`)
