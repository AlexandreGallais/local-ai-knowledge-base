---
title: "Window: structuredClone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/structuredclone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: structuredClone() method

The **`structuredClone()`** method of the `Window` interface creates a deep clone of a value using the structured clone algorithm.

The method also allows transferable objects in the original value to be _transferred_ rather than cloned to the new object.
Transferred objects are detached from the original object and attached to the new object; they are no longer accessible in the original object.

> **Note:**
> Up to Firefox 148, `structuredClone.call(iframe.contentWindow)` incorrectly created objects in the caller's realm instead of the iframe's realm. In Firefox 149, the implementation changed to instantiate objects in the `this` realm, so the method's behavior more closely matches the specification.
>
> Across all browsers, a direct call `structuredClone(value)` clones values in the caller's realm. From Firefox 149, web extension content scripts can call `window.structuredClone(value)` to clone values in the page's realm and `globalThis.structuredClone(value)` to clone into the realm of the content script. For more information, see `structuredClone` in content scripts.

## Syntax

```js
structuredClone(value)
structuredClone(value, options)
```

### Parameters

- `value`
    The object to be cloned.
    This can be any structured-cloneable type.
- `options` (optional)
    An object with the following properties:
    - `transfer`
        An array of transferable objects that will be moved rather than cloned to the returned object.

### Return value

A deep copy of the original `value`.

### Exceptions

- `DataCloneError` `DOMException`
    Thrown if any part of the input value is not serializable.

## Description

This function can be used to deep copy JavaScript values.
It also supports circular references, as shown below:

```js
// Create an object with a value and a circular reference to itself.
const original = { name: "MDN" };
original.itself = original;

// Clone it
const clone = structuredClone(original);

console.assert(clone !== original); // the objects are not the same (not same identity)
console.assert(clone.name === "MDN"); // they do have the same values
console.assert(clone.itself === clone); // and the circular reference is preserved
```

### Transferring values

Transferable objects (only) can be transferred rather than duplicated in the cloned object, using the `transfer` property of the `options` parameter. Transferring makes the original object unusable.

> **Note:**
> A scenario where this might be useful is when asynchronously validating some data in a buffer before saving it.
> To avoid the buffer being modified before the data is saved, you can clone the buffer and validate that data.
> If you also _transfer_ the data, any attempts to modify the original buffer will fail, preventing its accidental misuse.

This code shows how to clone an array and transfer its underlying resources to the new object.
On return, the original `uInt8Array.buffer` is cleared.

```js
// 16MB = 1024 * 1024 * 16
const uInt8Array = Uint8Array.from({ length: 1024 * 1024 * 16 }, (v, i) => i);

const transferred = structuredClone(uInt8Array, {
  transfer: [uInt8Array.buffer],
});
console.log(uInt8Array.byteLength); // 0
```

You can clone any number of objects and transfer any subset of those objects.
For example, this code transfers `arrayBuffer1` from the passed in value, but not `arrayBuffer2`.

```js
const transferred = structuredClone(
  { x: { y: { z: arrayBuffer1, w: arrayBuffer2 } } },
  { transfer: [arrayBuffer1] },
);
```

## Examples

### Cloning an object

In this example, we clone an object with one member, which is an array. After cloning, changes to each object do not affect the other object.

```js
const mushrooms1 = {
  amanita: ["muscaria", "virosa"],
};

const mushrooms2 = structuredClone(mushrooms1);

mushrooms2.amanita.push("pantherina");
mushrooms1.amanita.pop();

console.log(mushrooms2.amanita); // ["muscaria", "virosa", "pantherina"]
console.log(mushrooms1.amanita); // ["muscaria"]
```

### Transferring an object

In this example we create an `ArrayBuffer` and then clone the object it is a member of, transferring the buffer. We can use the buffer in the cloned object, but if we try to use the original buffer we get an exception.

```js
// Create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

const object1 = {
  buffer,
};

// Clone the object containing the buffer, and transfer it
const object2 = structuredClone(object1, { transfer: [buffer] });

// Create an array from the cloned buffer
const int32View2 = new Int32Array(object2.buffer);
int32View2[0] = 42;
console.log(int32View2[0]);

// Creating an array from the original buffer throws a TypeError
const int32View1 = new Int32Array(object1.buffer);
```

## See also

- A polyfill of `structuredClone` is available in `core-js`
- Structured clone algorithm
