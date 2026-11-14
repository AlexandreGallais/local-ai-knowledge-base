---
title: "async function* expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/async_function_star_/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# async function* expression

The **`async function*`** keywords can be used to define an async generator function inside an expression.

You can also define async generator functions using the `async function*` declaration.

```js
async function joinAll(generator) {
  let str = "";
  for await (const val of generator()) {
    str += val;
  }
  return str;
}
joinAll(async function* () {
  yield await Promise.resolve("a");
  yield await Promise.resolve("b");
  yield await Promise.resolve("c");
}).then((str) => console.log(str));
// Expected output: "abc"
```

## Syntax

```js
async function* (param0) {
  statements
}
async function* (param0, param1) {
  statements
}
async function* (param0, param1, /* …, */ paramN) {
  statements
}

async function* name(param0) {
  statements
}
async function* name(param0, param1) {
  statements
}
async function* name(param0, param1, /* …, */ paramN) {
  statements
}
```

> **Note:**
> An expression statement cannot begin with the keywords `async function` to avoid ambiguity with an `async function*` declaration. The `async function` keywords only begin an expression when they appear in a context that cannot accept statements.

### Parameters

- `name` (optional)
    The function name. Can be omitted, in which case the function is _anonymous_. The name is only local to the function body.
- `paramN` (optional)
    The name of a formal parameter for the function. For the parameters' syntax, see the Functions reference.
- `statements` (optional)
    The statements which comprise the body of the function.

## Description

An `async function*` expression is very similar to, and has almost the same syntax as, an `async function*` declaration. The main difference between an `async function*` expression and an `async function*` declaration is the _function name_, which can be omitted in `async function*` expressions to create _anonymous_ functions. An `async function*` expression can be used as an IIFE (Immediately Invoked Function Expression) which runs as soon as it is defined, allowing you to create an ad-hoc async iterable object. See also the chapter about functions for more information.

## Examples

### Using async function\* expression

The following example defines an unnamed asynchronous generator function and assigns it to `x`. The function yields the square of its argument:

```js
const x = async function* (y) {
  yield Promise.resolve(y * y);
};
x(6)
  .next()
  .then((res) => console.log(res.value)); // 36
```

## See also

- Functions guide
- Functions
- `async function*`
- `AsyncGeneratorFunction`
- Iteration protocols
- `yield`
- `yield*`
