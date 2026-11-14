---
title: "EditContext: updateText() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/updatetext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: updateText() method

The **`updateText()`** method of the `EditContext` interface updates the internal text content of an `EditContext` object.

This method doesn't need to be used when the user types text in the associated element. The `EditContext` object will automatically update its internal text content, and will fire `textupdate` events as needed.

This method can, however, be used when the user interacts with the text content in other ways, such as when pasting text from the clipboard.

## Syntax

```js
updateText(rangeStart, rangeEnd, text)
```

### Parameters

- `rangeStart`
    A number representing the start of the range of text to replace.
- `rangeEnd`
    A number representing the end of the range of text to replace.
- `text`
    A string representing the new text content.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the method is called with less than three arguments.

## Examples

### Updating the editor when the user pastes text in it

This example shows how to use the `updateText` method to update the text content in the `EditContext` of a `<canvas>` element when the user presses the `Ctrl`/`Cmd` + `V` shortcut to paste some text.

The example also uses the `Clipboard.readText()` method to read the text from the clipboard.

```html
<canvas id="editor-canvas"></canvas>
```

```js
const canvas = document.getElementById("editor-canvas");
const ctx = canvas.getContext("2d");

const editContext = new EditContext();
canvas.editContext = editContext;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(editContext.text, 0, 40);
}

editContext.addEventListener("textupdate", (e) => {
  render();
});

canvas.addEventListener("keydown", async (e) => {
  if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
    const pastedText = await navigator.clipboard.readText();
    console.log(
      `The user pasted the text: ${pastedText}. Updating the EditContext text.`,
    );

    editContext.updateText(
      editContext.selectionStart,
      editContext.selectionEnd,
      pastedText,
    );

    editContext.updateSelection(
      editContext.selectionStart + pastedText.length,
      editContext.selectionStart + pastedText.length,
    );

    render();
  }
});
```

## See also

- The `EditContext` interface it belongs to.
