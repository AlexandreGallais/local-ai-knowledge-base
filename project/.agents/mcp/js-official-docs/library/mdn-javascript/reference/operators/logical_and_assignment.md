---
title: "Logical AND assignment (&&=)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/logical_and_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Logical AND assignment (&&=)

The **logical AND assignment (`&&=`)** operator only evaluates the right operand and assigns to the left if the left operand is truthy.

```js
let a = 1;
let b = 0;

a &&= 2;
console.log(a);
// Expected output: 2

b &&= 2;
console.log(b);
// Expected output: 0
```

## Syntax

```js
x &&= y
```

## Description

Logical AND assignment _short-circuits_, meaning that `x &&= y` is equivalent to `x && (x = y)`, except that the expression `x` is only evaluated once.

No assignment is performed if the left-hand side is not truthy, due to short-circuiting of the logical AND operator. For example, the following does not throw an error, despite `x` being `const`:

```js
const x = 0;
x &&= 2;
```

Neither would the following trigger the setter:

```js
const x = {
  get value() {
    return 0;
  },
  set value(v) {
    console.log("Setter called");
  },
};

x.value &&= 2;
```

In fact, if `x` is not truthy, `y` is not evaluated at all.

```js
const x = 0;
x &&= console.log("y evaluated");
// Logs nothing
```

## Examples

### Using logical AND assignment

```js
let x = 0;
let y = 1;

x &&= 0; // 0
x &&= 1; // 0
y &&= 1; // 1
y &&= 0; // 0
```

## See also

- Logical AND (`&&`)
- Nullish coalescing operator (`??`)
- Bitwise AND assignment (`&=`)
- Truthy
- Falsy
