---
title: "DataView() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/dataview/dataview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DataView() constructor

The **`DataView()`** constructor creates `DataView` objects.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

// Create a couple of views
const view1 = new DataView(buffer);
const view2 = new DataView(buffer, 12, 4); // From byte 12 for the next 4 bytes
view1.setInt8(12, 42); // Put 42 in slot 12

console.log(view2.getInt8(0));
// Expected output: 42
```

## Syntax

```js
new DataView(buffer)
new DataView(buffer, byteOffset)
new DataView(buffer, byteOffset, byteLength)
```

> **Note:**
> `DataView()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `buffer`
    An existing `ArrayBuffer` or `SharedArrayBuffer` to use as
    the storage backing the new `DataView` object.
- `byteOffset` (optional)
    The offset, in bytes, to the first byte in the above buffer for the new view to
    reference. If unspecified, the buffer view starts with the first byte.
- `byteLength` (optional)
    The number of elements in the byte array. If unspecified, the view's length will
    match the buffer's length.

### Return value

A new `DataView` object representing the specified data buffer.

### Exceptions

- `RangeError`
    Thrown if the `byteOffset` or `byteLength` parameter values result in the view extending past the end of the buffer. In other words, `byteOffset + byteLength > buffer.byteLength`.

## Examples

### Using DataView

```js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer, 0);

view.setInt16(1, 42);
view.getInt16(1); // 42
```

## See also

- Polyfill of `DataView` in `core-js`
- `DataView`
