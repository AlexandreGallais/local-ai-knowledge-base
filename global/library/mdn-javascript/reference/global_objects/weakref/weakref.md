---
title: "WeakRef() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakref/weakref/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakRef() constructor

The **`WeakRef()`** constructor creates `WeakRef` objects.

## Syntax

```js
new WeakRef(target)
```

> **Note:**
> `WeakRef()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `target`
    The target value the WeakRef should refer to (also called the _referent_). Must be an object or a non-registered symbol.

### Return value

A new `WeakRef` object referring to the given target value.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object or a non-registered symbol.

## Examples

### Creating a new WeakRef object

See the main `WeakRef`
page for a complete example.

```js
class Counter {
  constructor(element) {
    // Remember a weak reference to a DOM element
    this.ref = new WeakRef(element);
    this.start();
  }
}
```

## See also

- `WeakRef`
