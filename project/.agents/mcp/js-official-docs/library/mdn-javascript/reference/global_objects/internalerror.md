---
title: "InternalError"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/internalerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InternalError

The **`InternalError`** object indicates an error that occurred internally in the JavaScript engine.

Example cases are mostly when something is too large, e.g.:

- "too many switch cases",
- "too many parentheses in regular expression",
- "array initializer too large",
- "too much recursion".

`InternalError` is a subclass of `Error`.

## Constructor

- `InternalError()` (non-standard)
    Creates a new `InternalError` object.

## Instance properties

_Also inherits instance properties from its parent `Error`_.

These properties are defined on `InternalError.prototype` and shared by all `InternalError` instances.

- `InternalError.prototype.constructor`
    The constructor function that created the instance object. For `InternalError` instances, the initial value is the `InternalError` constructor.
- `InternalError.prototype.name`
    Represents the name for the type of error. For `InternalError.prototype.name`, the initial value is `"InternalError"`.

## Instance methods

_Inherits instance methods from its parent `Error`_.

## Examples

### Too much recursion

This recursive function runs 10 times, as per the exit condition.

```js
function loop(x) {
  // "x >= 10" is the exit condition
  if (x >= 10) return;

  // do stuff
  loop(x + 1); // the recursive call
}
loop(0);
```

Setting this condition to an extremely high value, may not work:

```js
function loop(x) {
  if (x >= 1000000000000) return;

  // do stuff
  loop(x + 1);
}
loop(0);

// InternalError: too much recursion
```

For more information, see InternalError: too much recursion.

## Specifications

Not part of any standard.

## See also

- `Error`
- InternalError: too much recursion
