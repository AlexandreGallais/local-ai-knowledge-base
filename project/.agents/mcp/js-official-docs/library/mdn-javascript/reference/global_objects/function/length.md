---
title: "Function: length"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/function/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Function: length

The **`length`** data property of a `Function` instance indicates the number of parameters expected by the function.

```js
function func1() {}

function func2(a, b) {}

console.log(func1.length);
// Expected output: 0

console.log(func2.length);
// Expected output: 2
```

## Value

A number.

## Description

A `Function` object's `length` property indicates how many arguments the function expects, i.e., the number of formal parameters:

- Only parameters before the first one with a default value are counted.
- A destructuring pattern counts as a single parameter.
- The rest parameter is excluded.

By contrast, `arguments.length` is local to a function and provides the number of arguments actually passed to the function.

The `Function` constructor is itself a `Function` object. Its `length` data property has a value of `1`.

Due to historical reasons, `Function.prototype` is a callable itself. The `length` property of `Function.prototype` has a value of `0`.

## Examples

### Using function length

```js
console.log(Function.length); // 1

console.log((() => {}).length); // 0
console.log(((a) => {}).length); // 1
console.log(((a, b) => {}).length); // 2 etc.

console.log(((...args) => {}).length);
// 0, rest parameter is not counted

console.log(((a, b = 1, c) => {}).length);
// 1, only parameters before the first one with
// a default value are counted

console.log((({ a, b }, [c, d]) => {}).length);
// 2, destructuring patterns each count as
// a single parameter
```

## See also

- `Function`
