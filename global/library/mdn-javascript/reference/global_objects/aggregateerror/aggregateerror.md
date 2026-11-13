---
title: "AggregateError() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/aggregateerror/aggregateerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AggregateError() constructor

The **`AggregateError()`** constructor creates `AggregateError` objects.

## Syntax

```js
new AggregateError(errors)
new AggregateError(errors, message)
new AggregateError(errors, message, options)

AggregateError(errors)
AggregateError(errors, message)
AggregateError(errors, message, options)
```

> **Note:**
> `AggregateError()` can be called with or without `new`. Both create a new `AggregateError` instance.

### Parameters

- `errors`
    An iterable of errors, may not actually be `Error` instances.
- `message` (optional)
    An optional human-readable description of the aggregate error.
- `options` (optional)
    An object that has the following properties:
    - `cause` (optional)
        A property indicating the specific cause of the error.
        When catching and re-throwing an error with a more-specific or useful error message, this property can be used to pass the original error.

## Examples

### Creating an AggregateError

```js
try {
  throw new AggregateError([new Error("some error")], "Hello");
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "AggregateError"
  console.log(e.errors); // [ Error: "some error" ]
}
```

## See also

- Polyfill of `AggregateError` in `core-js`
- es-shims polyfill of `AggregateError`
- `Promise.any`
