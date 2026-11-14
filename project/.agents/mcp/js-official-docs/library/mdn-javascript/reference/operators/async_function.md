---
title: "async function expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/async_function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# async function expression

The **`async function`** keywords can be used to define an async function inside an expression.

You can also define async functions using the `async function` declaration or the arrow syntax.

## Syntax

```js
async function (param0) {
  statements
}
async function (param0, param1) {
  statements
}
async function (param0, param1, /* …, */ paramN) {
  statements
}

async function name(param0) {
  statements
}
async function name(param0, param1) {
  statements
}
async function name(param0, param1, /* …, */ paramN) {
  statements
}
```

> **Note:**
> An expression statement cannot begin with the keywords `async function` to avoid ambiguity with an `async function` declaration. The `async function` keywords only begin an expression when they appear in a context that cannot accept statements.

### Parameters

- `name` (optional)
    The function name. Can be omitted, in which case the function is _anonymous_. The name is only local to the function body.
- `paramN` (optional)
    The name of a formal parameter for the function. For the parameters' syntax, see the Functions reference.
- `statements` (optional)
    The statements which comprise the body of the function.

## Description

An `async function` expression is very similar to, and has almost the same syntax as, an `async function` declaration. The main difference between an `async function` expression and an `async function` declaration is the _function name_, which can be omitted in `async function` expressions to create _anonymous_ functions. An `async function` expression can be used as an IIFE (Immediately Invoked Function Expression) which runs as soon as it is defined, allowing you to mimic top-level await. See also the chapter about functions for more information.

## Examples

### Using async function expression

```js
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

// async function expression assigned to a variable
const add = async function (x) {
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
  return x + a + b;
};

add(10).then((v) => {
  console.log(v); // prints 60 after 4 seconds.
});

// async function expression used as an IIFE
(async function (x) {
  const p1 = resolveAfter2Seconds(20);
  const p2 = resolveAfter2Seconds(30);
  return x + (await p1) + (await p2);
})(10).then((v) => {
  console.log(v); // prints 60 after 2 seconds.
});
```

### Async IIFE

An `async` IIFE allows you to use `await` and `for...await` in contexts where top-level await is not available. Here we use an arrow function to define the IIFE, but `async function` expressions can also be used.

```js
const getFileStream = async (url) => {
  // implementation
};

(async () => {
  const stream = await getFileStream("https://domain.name/path/file.ext");
  for await (const chunk of stream) {
    console.log({ chunk });
  }
})();
```

## See also

- Functions guide
- Functions
- `async function`
- `AsyncFunction`
- `await`
