---
title: "URIError"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/urierror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URIError

The **`URIError`** object represents an error when a global URI handling function was used in a wrong way.

`URIError` is a serializable object, so it can be cloned with `structuredClone()` or copied between Workers using `postMessage()`.

`URIError` is a subclass of `Error`.

## Constructor

- `URIError()`
    Creates a new `URIError` object.

## Instance properties

_Also inherits instance properties from its parent `Error`_.

These properties are defined on `URIError.prototype` and shared by all `URIError` instances.

- `URIError.prototype.constructor`
    The constructor function that created the instance object. For `URIError` instances, the initial value is the `URIError` constructor.
- `URIError.prototype.name`
    Represents the name for the type of error. For `URIError.prototype.name`, the initial value is `"URIError"`.

## Instance methods

_Inherits instance methods from its parent `Error`_.

## Examples

### Catching a URIError

```js
try {
  decodeURIComponent("%");
} catch (e) {
  console.log(e instanceof URIError); // true
  console.log(e.message); // "malformed URI sequence"
  console.log(e.name); // "URIError"
  console.log(e.stack); // Stack of the error
}
```

### Creating a URIError

```js
try {
  throw new URIError("Hello");
} catch (e) {
  console.log(e instanceof URIError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "URIError"
  console.log(e.stack); // Stack of the error
}
```

## See also

- `Error`
- `decodeURI()`
- `decodeURIComponent()`
- `encodeURI()`
- `encodeURIComponent()`
