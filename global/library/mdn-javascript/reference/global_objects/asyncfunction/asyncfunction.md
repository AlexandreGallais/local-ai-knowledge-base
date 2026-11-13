---
title: "AsyncFunction() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncfunction/asyncfunction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncFunction() constructor

> **Warning:**
> The arguments passed to this constructor are dynamically parsed and executed as JavaScript.
> APIs like this are known as injection sinks, and are potentially a vector for cross-site-scripting (XSS) attacks.
>
> You can mitigate this risk by always passing `TrustedScript` objects instead of strings and enforcing trusted types.
>
> See Security considerations in the `Function()` constructor reference for more information.

The **`AsyncFunction()`** constructor creates `AsyncFunction` objects.

Note that `AsyncFunction` is _not_ a global object. It can be obtained with the following code:

```js
const AsyncFunction = async function () {}.constructor;
```

The `AsyncFunction()` constructor is not intended to be used directly, and all caveats mentioned in the `Function()` description apply to `AsyncFunction()`.

## Syntax

```js
new AsyncFunction(functionBody)
new AsyncFunction(arg1, functionBody)
new AsyncFunction(arg1, arg2, functionBody)
new AsyncFunction(arg1, arg2, /* …, */ argN, functionBody)

AsyncFunction(functionBody)
AsyncFunction(arg1, functionBody)
AsyncFunction(arg1, arg2, functionBody)
AsyncFunction(arg1, arg2, /* …, */ argN, functionBody)
```

> **Note:**
> `AsyncFunction()` can be called with or without `new`. Both create a new `AsyncFunction` instance.

### Parameters

See `Function()`.

## Examples

Note that these examples omit the use of trusted types for brevity. For code showing the recommended approach, see Using `TrustedScript` in `eval()`.

### Creating an async function from an AsyncFunction() constructor

```js
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

const AsyncFunction = async function () {}.constructor;

const fn = new AsyncFunction(
  "a",
  "b",
  "return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);",
);

fn(10, 20).then((v) => {
  console.log(v); // prints 30 after 4 seconds
});
```

## See also

- `async function`
- `async function` expression
- `Function()` constructor
