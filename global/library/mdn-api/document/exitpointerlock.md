---
title: "Document: exitPointerLock() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/exitpointerlock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: exitPointerLock() method

The **`exitPointerLock()`** method of the `Document` interface asynchronously releases a pointer lock previously requested through `Element.requestPointerLock`.

> **Note:**
> While the **`exitPointerLock()`** method is called on the document, the **`requestPointerLock()`** method is called on an element.

To track the success or failure of the request, it is necessary to listen for the `pointerlockchange` and `pointerlockerror` events.

## Syntax

```js
exitPointerLock()
```

### Parameters

None.

### Return value

None (`undefined`).

## See also

- `Document.pointerLockElement`
- `Element.requestPointerLock()`
- Pointer Lock
