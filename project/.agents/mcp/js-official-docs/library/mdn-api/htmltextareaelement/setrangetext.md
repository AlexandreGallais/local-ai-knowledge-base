---
title: "HTMLTextAreaElement: setRangeText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/setrangetext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: setRangeText() method

The **`setRangeText()`** method of the `HTMLTextAreaElement` interface replaces a
range of text in a `<textarea>` element with new text passed as the argument.

Additional optional parameters include the start of the section of text to change, the end of the section, and a keyword defining what part of the `<textarea>` should be selected after the text is updated. If the `startSelection` and `endSelection` arguments are not provided, the range is assumed to be the selection.

The final argument determines how the selection will be set after the text has been replaced. The possible values are `"select"`, which selects the newly inserted text, `"start"`, which moves the selection to just before the inserted text, `"end"`, which moves the selection to just after the inserted text, or the default, `"preserve"`, which tries to preserve the selection.

In addition, the `select` and `selectionchange` events are fired.

## Syntax

```js
setRangeText(replacement)
setRangeText(replacement, startSelection)
setRangeText(replacement, startSelection, endSelection)
setRangeText(replacement, startSelection, endSelection, selectMode)
```

### Parameters

- `replacement`
    The string to insert.
- `selectionStart` (optional)
    The index of the first selected character. An index greater than the length
    of the element's value is treated as pointing to the end of the value.
- `selectionEnd` (optional)
    The index of the character _after_ the last selected character. An
    index greater than the length of the element's value is treated as pointing to the end
    of the value. If `selectionEnd` is less than `selectionStart`, then both are treated as the value of `selectionEnd`.
- `selectMode` (optional)
    A keyword, either `select`, `start`, `end`, or the default `preserve`, defining how the selection should be set after the text has been replaced.

### Return value

None (`undefined`).

## Examples

Click the button in this example to replace part of the text in the text box. The newly
inserted text will be highlighted (selected) afterwards.

### HTML

```html
<label for="ta">Example text input:</label>
<textarea id="ta">
  This text has NOT been updated.
</textarea>
<button id="btn">Update text</button>
```

### JavaScript

```js
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  changeText();
});

function changeText() {
  const textarea = document.getElementById("ta");
  textarea.focus();
  textarea.setRangeText("ALREADY", 14, 17, "select");
}
```

## See also

- `<textarea>`
- `HTMLTextAreaElement`
- `HTMLTextAreaElement.select()`
- `HTMLTextAreaElement.setSelectionRange()`
- `HTMLTextAreaElement.textLength`
- `Selection`
- `::selection` pseudo-element
