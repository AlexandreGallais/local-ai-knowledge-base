---
title: "HTMLInputElement: setRangeText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/setrangetext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: setRangeText() method

The **`HTMLInputElement.setRangeText()`** method replaces a
range of text in an `` or `<textarea>` element with
a new string.

## Syntax

```js
setRangeText(replacement)
setRangeText(replacement, start)
setRangeText(replacement, start, end)
setRangeText(replacement, start, end, selectMode)
```

### Parameters

- `replacement`
    The string to insert.
- `start` (optional)
    The 0-based index of the first character to replace. Defaults to the current
    `selectionStart` value (the start of the user's current selection).
- `end` (optional)
    The 0-based index of the character _after_ the last character to replace.
    Defaults to the current `selectionEnd` value (the end of the user's current
    selection).
- `selectMode` (optional)
    A string defining how the selection should be set after the text has been replaced.
    Possible values:
    - `"select"` selects the newly inserted text.
    - `"start"` moves the selection to just before the inserted text.
    - `"end"` moves the selection to just after the inserted text.
    - `"preserve"` attempts to preserve the selection. This is the default.

### Return value

None (`undefined`).

## Examples

Click the button in this example to replace part of the text in the text box. The newly
inserted text will be highlighted (selected) afterwards.

### HTML

```html
<input
  type="text"
  id="text-box"
  size="30"
  value="This text has NOT been updated." />
<button>Update text</button>
```

### JavaScript

```js
function selectText() {
  const input = document.getElementById("text-box");
  input.focus();
  input.setRangeText("ALREADY", 14, 17, "select");
}

document.querySelector("button").addEventListener("click", selectText);
```

## See also

- ``
- `<textarea>`
- `HTMLInputElement`
- `Selection`
