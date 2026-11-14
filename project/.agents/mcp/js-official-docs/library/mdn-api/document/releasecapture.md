---
title: "Document: releaseCapture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/releasecapture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: releaseCapture() method

The **`releaseCapture()`** method releases mouse capture if
it's currently enabled on an element within this document.
Once mouse capture is released, mouse events will no longer all be directed to the element on which capture is enabled.

Enabling mouse capture on an element is done by calling `element.setCapture()`.

## Syntax

```js
releaseCapture()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

See the example for
`element.setCapture()`.

## Specifications

Not part of any specification.

## See also

- `element.setCapture()`
