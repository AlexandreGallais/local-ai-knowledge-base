---
title: "WeakRef.prototype.deref()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakref/deref/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakRef.prototype.deref()

The **`deref()`** method of `WeakRef` instances returns this `WeakRef`'s target value, or `undefined` if the target value has been garbage-collected.

## Syntax

```js
deref()
```

### Parameters

None.

### Return value

The target value of the WeakRef, which is either an object or a non-registered symbol. Returns `undefined` if the value has been garbage-collected.

## Description

See the Notes on WeakRefs section of the `WeakRef` page for some important notes.

## Examples

### Using deref()

See the Examples
section of the `WeakRef` page for the complete example.

```js
const tick = () => {
  // Get the element from the weak reference, if it still exists
  const element = this.ref.deref();
  if (element) {
    element.textContent = ++this.count;
  } else {
    // The element doesn't exist anymore
    console.log("The element is gone.");
    this.stop();
    this.ref = null;
  }
};
```

## See also

- `WeakRef`
