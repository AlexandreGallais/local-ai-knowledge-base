---
title: "AsyncGeneratorFunction() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncgeneratorfunction/asyncgeneratorfunction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncGeneratorFunction() constructor

> **Warning:**
> The arguments passed to this constructor are dynamically parsed and executed as JavaScript.
> APIs like this are known as injection sinks, and are potentially a vector for cross-site-scripting (XSS) attacks.
>
> You can mitigate this risk by always passing `TrustedScript` objects instead of strings and enforcing trusted types.
>
> See Security considerations in the `Function()` constructor reference for more information.

The **`AsyncGeneratorFunction()`** constructor creates `AsyncGeneratorFunction` objects.

Note that `AsyncGeneratorFunction` is not a global object. It could be obtained by evaluating the following code.

```js
const AsyncGeneratorFunction = async function* () {}.constructor;
```

The `AsyncGeneratorFunction()` constructor is not intended to be used directly, and all caveats mentioned in the `Function()` description apply to `AsyncGeneratorFunction()`.

## Syntax

```js
new AsyncGeneratorFunction(functionBody)
new AsyncGeneratorFunction(arg1, functionBody)
new AsyncGeneratorFunction(arg1, arg2, functionBody)
new AsyncGeneratorFunction(arg1, arg2, /* …, */ argN, functionBody)

AsyncGeneratorFunction(functionBody)
AsyncGeneratorFunction(arg1, functionBody)
AsyncGeneratorFunction(arg1, arg2, functionBody)
AsyncGeneratorFunction(arg1, arg2, /* …, */ argN, functionBody)
```

> **Note:**
> `AsyncGeneratorFunction()` can be called with or without `new`. Both create a new `AsyncGeneratorFunction` instance.

### Parameters

See `Function()`.

## Examples

Note that these examples omit the use of trusted types for brevity. For code showing the recommended approach, see Using `TrustedScript` in `eval()`.

### Using the constructor

The following example uses the `AsyncGeneratorFunction` constructor to create an async generator function.

```js
const AsyncGeneratorFunction = async function* () {}.constructor;
const createAsyncGenerator = new AsyncGeneratorFunction("a", "yield a * 2");
const asyncGen = createAsyncGenerator(10);
asyncGen.next().then((res) => console.log(res.value)); // 20
```

## See also

- `async function*`
- `async function*` expression
- `Function()` constructor
- Iterators and generators guide
- `Functions`
