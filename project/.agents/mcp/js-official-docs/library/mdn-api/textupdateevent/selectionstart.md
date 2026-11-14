---
title: "TextUpdateEvent: selectionStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textupdateevent/selectionstart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextUpdateEvent: selectionStart property

The **`TextUpdateEvent.selectionStart`** read-only property indicates the position of the start of the selection (or caret) within the text content of the editable region attached to the `EditContext` object.

## Value

A `Number`.

## Examples

### Using `textupdate` to render the edited text and user selection

This example shows how to use the `selectionStart` property to render the selected text within a `textupdate` event handler.

```css
#editor {
  height: 200px;
  background: #eeeeee;
  color: black;
}

.selection {
  display: inline-block;
  vertical-align: bottom;
  background: blue;
  color: white;
  min-width: 2px;
  height: 3ex;
}
```

```html
<div id="editor"></div>
```

```js
const editorEl = document.getElementById("editor");
const editContext = new EditContext();
editorEl.editContext = editContext;

editContext.addEventListener("textupdate", (e) => {
  // Clear the current content.
  editorEl.textContent = "";

  const text = editContext.text;
  const { selectionStart, selectionEnd } = e;

  // Render the text before the selection.
  const textBefore = document.createElement("span");
  textBefore.textContent = text.substring(0, selectionStart);

  // Render the selected text, or caret.
  const textSelected = document.createElement("span");
  textSelected.classList.add("selection");
  textSelected.textContent = text.substring(selectionStart, selectionEnd);

  // Render the text after the selection.
  const textAfter = document.createElement("span");
  textAfter.textContent = text.substring(selectionEnd);

  editorEl.appendChild(textBefore);
  editorEl.appendChild(textSelected);
  editorEl.appendChild(textAfter);

  console.log(`Text before selection: ${textBefore.textContent}`);
  console.log(`Selected text: ${textSelected.textContent}`);
  console.log(`Text after selection: ${textAfter.textContent}`);
});
```
