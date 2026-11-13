---
title: "Selection: setPosition() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/setposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: setPosition() method

The **`Selection.setPosition()`** method collapses the current selection to a single point. The document is not modified. If the content is focused and editable, the caret will blink there.

> **Note:**
> This method is an alias for the `Selection.collapse()` method.

## Syntax

```js
setPosition(node)
setPosition(node, offset)
```

### Parameters

- `node`
    The caret location will be within this node. This value can also be set to
    `null` — if `null` is specified, the method will behave like
    `Selection.removeAllRanges()`, i.e., all ranges will be removed from the
    selection.
- `offset` (optional)
    The offset in `node` to which the selection will be collapsed. If not
    specified, the default value `0` is used.

### Return value

None (`undefined`).

## Examples

```js
// Place the caret at the beginning of an HTML document's body.
const body = document.querySelector("body");
window.getSelection().setPosition(body, 0);
```

## See also

- `Selection.collapse()`
