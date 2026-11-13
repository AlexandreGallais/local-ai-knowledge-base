---
title: "TextUpdateEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textupdateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextUpdateEvent

The **`TextUpdateEvent`** interface is a DOM event that represents a text or selection update in an editable text region that's attached to an `EditContext` instance.

This interface inherits properties from `Event`.

## Constructor

- `TextUpdateEvent()` (experimental)
    Creates a new `TextUpdateEvent` object.

## Instance properties

- `TextUpdateEvent.updateRangeStart` (read-only) (experimental)
    Returns the index of the first character in the range of text that was updated.
- `TextUpdateEvent.updateRangeEnd` (read-only) (experimental)
    Returns the index of the last character in the range of text that was updated.
- `TextUpdateEvent.text` (read-only) (experimental)
    Returns the text that was inserted in the updated range.
- `TextUpdateEvent.selectionStart` (read-only) (experimental)
    Returns the index of the first character in the new selection range, after the update.
- `TextUpdateEvent.selectionEnd` (read-only) (experimental)
    Returns the index of the last character in the new selection range, after the update.

## Examples

### Rendering the updated text in an editable canvas

In the following example, the EditContext API is used to render editable text in a `<canvas>` element, and the `textupdate` event is used to render the text when the user is typing.

```html
<canvas id="editor-canvas"></canvas>
```

```js
const canvas = document.getElementById("editor-canvas");
const ctx = canvas.getContext("2d");
const editContext = new EditContext();
canvas.editContext = editContext;

function render() {
  // Clear the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render the text.
  ctx.fillText(editContext.text, 10, 10);
}

editContext.addEventListener("textupdate", (e) => {
  // Re-render the editor view when the user is entering text.
  render();

  console.log(
    `The user entered ${e.text}. Rendering the entire text: ${editContext.text}`,
  );
});
```
