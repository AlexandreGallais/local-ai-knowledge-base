---
title: "GeneratorFunction() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/generatorfunction/generatorfunction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GeneratorFunction() constructor

> **Warning:**
> The arguments passed to this constructor are dynamically parsed and executed as JavaScript.
> APIs like this are known as injection sinks, and are potentially a vector for cross-site-scripting (XSS) attacks.
>
> You can mitigate this risk by always passing `TrustedScript` objects instead of strings and enforcing trusted types.
>
> See Security considerations in the `Function()` constructor reference for more information.

The **`GeneratorFunction()`** constructor creates `GeneratorFunction` objects.

Note that `GeneratorFunction` is _not_ a global object. It can be obtained with the following code:

```js
const GeneratorFunction = function* () {}.constructor;
```

The `GeneratorFunction()` constructor is not intended to be used directly, and all caveats mentioned in the `Function()` description apply to `GeneratorFunction()`.

## Syntax

```js
new GeneratorFunction(functionBody)
new GeneratorFunction(arg1, functionBody)
new GeneratorFunction(arg1, arg2, functionBody)
new GeneratorFunction(arg1, arg2, /* …, */ argN, functionBody)

GeneratorFunction(functionBody)
GeneratorFunction(arg1, functionBody)
GeneratorFunction(arg1, arg2, functionBody)
GeneratorFunction(arg1, arg2, /* …, */ argN, functionBody)
```

> **Note:**
> `GeneratorFunction()` can be called with or without `new`. Both create a new `GeneratorFunction` instance.

### Parameters

See `Function()`.

## Examples

Note that these examples omit the use of trusted types for brevity. For code showing the recommended approach, see Using `TrustedScript` in `eval()`.

### Creating and using a GeneratorFunction() constructor

```js
const GeneratorFunction = function* () {}.constructor;
const g = new GeneratorFunction("a", "yield a * 2");
const iterator = g(10);
console.log(iterator.next().value); // 20
```

## See also

- `function*`
- `function*` expression
- `Function()` constructor
- Iterators and generators guide
- `Functions`
