---
title: "Selection: extend() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/extend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: extend() method

The **`Selection.extend()`** method moves the focus of the
selection to a specified point. The anchor of the selection does not move. The selection
will be from the anchor to the new focus, regardless of direction.

## Syntax

```js
extend(node)
extend(node, offset)
```

### Parameters

- `node`
    The node within which the focus will be moved.
- `offset` (optional)
    The offset position within `node` where the focus will be moved to. If
    not specified, the default value `0` is used.

### Return value

None (`undefined`).

## See also

- `Selection`, the interface it belongs to.
