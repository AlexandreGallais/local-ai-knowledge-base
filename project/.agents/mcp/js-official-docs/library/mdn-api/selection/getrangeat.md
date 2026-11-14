---
title: "Selection: getRangeAt() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/getrangeat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: getRangeAt() method

The **`getRangeAt()`** method of the `Selection` interface returns a range object representing a currently selected range.

If the endpoints of the selected range are within a shadow tree then JavaScript does not have visibility of the shadow nodes, and the method should re-scope the range to include the host element that contains the end point.
In practice most browsers do not yet implement this behavior, and the returned range is unpredictable.

> **Note:**
> When selecting within nodes that might contain a shadow root, you can use `Selection.getComposedRanges()` (if supported) to get a selection range inside a shadow tree, or to reliably re-scope the selection to the host node.

## Syntax

```js
getRangeAt(index)
```

### Parameters

- `index`
    The zero-based index of the range to return.
    A negative number or a number greater than or equal to `Selection.rangeCount` will result in an error.

### Return value

The specified `Range` object.

## Examples

```js
let ranges = [];

const sel = window.getSelection();

for (let i = 0; i < sel.rangeCount; i++) {
  ranges[i] = sel.getRangeAt(i);
}
/* Each item in the ranges array is now
 * a range object representing one of the
 * ranges in the current selection */
```

## See also

- `Selection`, the interface it belongs to.
