---
title: "Window: webkitConvertPointFromNodeToPage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/webkitconvertpointfromnodetopage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: webkitConvertPointFromNodeToPage() method

Given a `WebKitPoint` specified in a particular DOM `Node`'s coordinate system, the `Window` method **`webkitConvertPointFromNodeToPage()`** returns a `Point` which specifies the same position in the page's coordinate system. This method is non-standard and _should not be used_.

> **Warning:**
> Please review the Browser compatibility section before using this method, as it's not widely supported (nor is the `WebKitPoint` object it uses).

## Syntax

```js
webkitConvertPointFromNodeToPage(node, nodePoint)
```

### Parameters

- `node`
    The `Node` in whose coordinate system the `Point` specified by `nodePoint` is described.
- `nodePoint`
    A `WebKitPoint` object describing a point in `node`'s coordinate system; this point will be converted to the page's coordinate system.

### Return value

A `WebKitPoint` object specifying a point in the page's coordinate system.

## Specifications

This method was specified in the defunct 20 March 2009 Working Draft of CSS 2D Transforms Module Level 3. It is not present in the current CSS Transforms Module Level 1 Working Draft.

## See also

- `Window.webkitConvertPointFromPageToNode`
- Mozilla implementation bug: Firefox bug 850806
