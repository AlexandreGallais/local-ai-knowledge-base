---
title: "EditContext: updateSelectionBounds() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/updateselectionbounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: updateSelectionBounds() method

The **`EditContext.updateSelectionBounds()`** method of the `EditContext` interface is used to inform the operating system about the bounds of the text selection within the editable region that's associated with the `EditContext` object.

Call this method to tell the operating system the bounds of the user's current selection. You should call the method whenever the user's selection changes in the editable region. The selection bounds are used by the operating system to help position the IME window or any other platform-specific editing-related UI surfaces.

## Syntax

```js
updateSelectionBounds(selectionBounds)
```

### Parameters

- `selectionBounds`
    A `DOMRect` object representing the new selection bounds.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the method is called with no arguments or if the provided argument is not a `DOMRect` object.

## See also

- The `EditContext` interface it belongs to.
