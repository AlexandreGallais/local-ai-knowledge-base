---
title: "Strict equality (===)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/strict_equality/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Strict equality (===)

The **strict equality (`===`)** operator checks whether its two operands are
equal, returning a Boolean result. Unlike the equality operator,
the strict equality operator always considers operands of different types to be
different.

```js
console.log(1 === 1);
// Expected output: true

console.log("hello" === "hello");
// Expected output: true

console.log("1" === 1);
// Expected output: false

console.log(0 === false);
// Expected output: false
```

## Syntax

```js
x === y
```

## Description

The strict equality operators (`===` and `!==`) provide the IsStrictlyEqual semantic.

- If the operands are of different types, return `false`.
- If both operands are objects, return `true` only if they refer to the
  same object.
- If both operands are `null` or both operands are `undefined`,
  return `true`.
- If either operand is `NaN`, return `false`.
- Otherwise, compare the two operand's values:
  - Numbers must have the same numeric values. `+0` and `-0`
    are considered to be the same value.
  - Strings must have the same characters in the same order.
  - Booleans must be both `true` or both `false`.

The most notable difference between this operator and the equality
(`==`) operator is that if the operands are of different types, the
`==` operator attempts to convert them to the same type before comparing.

## Examples

### Comparing operands of the same type

```js
"hello" === "hello"; // true
"hello" === "hola"; // false

3 === 3; // true
3 === 4; // false

true === true; // true
true === false; // false

null === null; // true
```

### Comparing operands of different types

```js
"3" === 3; // false
true === 1; // false
null === undefined; // false
3 === new Number(3); // false
```

### Comparing objects

```js
const object1 = {
  key: "value",
};

const object2 = {
  key: "value",
};

console.log(object1 === object2); // false
console.log(object1 === object1); // true
```

## See also

- Equality (`==`)
- Inequality (`!=`)
- Strict inequality (`!==`)
