---
title: "Window: webkitConvertPointFromPageToNode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/webkitconvertpointfrompagetonode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: webkitConvertPointFromPageToNode() method

Given a `WebKitPoint` specified in the page's coordinate system, the
`Window` method **`webkitConvertPointFromPageToNode()`**
returns a `Point` object specifying the same location in the coordinate
system of the specified DOM `Node`.

> **Warning:**
> Please review the Browser compatibility section before using this method,
> as it's not widely supported (nor is the `WebKitPoint` object it uses).

## Syntax

```js
webkitConvertPointFromPageToNode(node, pagePoint)
```

### Parameters

- `node`
    The `Node` into whose coordinate system the point is to be converted.
- `pagePoint`
    A `WebKitPoint` object specifying a point in the coordinate system of the
    page, which is to be converted into the node's coordinate system.

### Return value

A `Point` object describing the specified location in the node's coordinate
system.

## Specifications

This method was specified in the defunct 20 March 2009 Working Draft of CSS 2D Transforms Module Level 3. It is not present in the
current CSS Transforms Module Level 1 Working Draft.

## See also

- `Window.webkitConvertPointFromNodeToPage`
- Mozilla implementation bug: Firefox bug 850808
