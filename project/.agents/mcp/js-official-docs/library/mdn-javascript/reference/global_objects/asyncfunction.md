---
title: "AsyncFunction"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncfunction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncFunction

The **`AsyncFunction`** object provides methods for async functions. In JavaScript, every async function is actually an `AsyncFunction` object.

Note that `AsyncFunction` is _not_ a global object. It can be obtained with the following code:

```js
const AsyncFunction = async function () {}.constructor;
```

`AsyncFunction` is a subclass of `Function`.

## Constructor

- `AsyncFunction()`
    Creates a new `AsyncFunction` object.

## Instance properties

_Also inherits instance properties from its parent `Function`_.

These properties are defined on `AsyncFunction.prototype` and shared by all `AsyncFunction` instances.

- `AsyncFunction.prototype.constructor`
    The constructor function that created the instance object. For `AsyncFunction` instances, the initial value is the `AsyncFunction` constructor.
- `AsyncFunction.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"AsyncFunction"`. This property is used in `Object.prototype.toString()`.

> **Note:**
> `AsyncFunction` instances do not have the `prototype` property.

## Instance methods

_Inherits instance methods from its parent `Function`_.

## See also

- `async function`
- `async function` expression
- `Function`
- `AsyncGeneratorFunction`
- `GeneratorFunction`
- `Functions`
