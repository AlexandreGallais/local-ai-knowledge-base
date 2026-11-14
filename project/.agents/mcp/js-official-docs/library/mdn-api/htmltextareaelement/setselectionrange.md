---
title: "HTMLTextAreaElement: setSelectionRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/setselectionrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: setSelectionRange() method

The **`setSelectionRange()`** method of the `HTMLTextAreaElement` interface sets the start and end positions of the current text selection in a `<textarea>` element.

For general information about this method, see `HTMLInputElement.setSelectionRange()`.

## Syntax

```js
setSelectionRange(selectionStart, selectionEnd)
setSelectionRange(selectionStart, selectionEnd, selectionDirection)
```

### Parameters

- `selectionStart`
    The 0-based index of the first selected character. An index greater than the length of the element's value is treated as pointing to the end of the value. See the `selectionStart` property.
- `selectionEnd`
    The 0-based index of the character _after_ the last selected character. An index greater than the length of the element's value is treated as pointing to the end of the value. If `selectionEnd` is less than `selectionStart`, then both are treated as the value of `selectionEnd`. See the `selectionEnd` property.
- `selectionDirection` (optional)
    A string indicating the direction in which the selection is considered to have been performed. See the `selectionDirection` property. Possible values:
    - `"forward"`
    - `"backward"`
    - `"none"` if the direction is unknown or irrelevant. Default value.

### Return value

None (`undefined`).

## See also

- `<textarea>`
- `HTMLTextAreaElement`
- `Selection`
