---
title: "EditContext: updateControlBounds() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/updatecontrolbounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: updateControlBounds() method

The **`EditContext.updateControlBounds()`** method of the `EditContext` interface is used to inform the operating system about the position and size of the editable text region of the `EditContext` object.

Call this method to tell the operating system the bounds of the current editable region. You should call it when initializing the EditContext, and whenever the editable region's bounds change such as when the webpage is resized. These bounds are used to position platform-specific editing-related UI surfaces such as an Input Method Editor (IME) window.

## Syntax

```js
updateControlBounds(controlBounds)
```

### Parameters

- `controlBounds`
    A `DOMRect` object representing the new control bounds.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the method is called with no arguments or if the provided argument is not a `DOMRect` object.

## Examples

### Updating the control bounds when the editor is initialized and on window resize

This example shows how to use the `updateControlBounds()` method to tell the platform where the editable region is at all times.

```css
#editor {
  border: 1px solid black;
  height: 50vw;
  width: 50vh;
}
```

```html
<div id="editor"></div>
```

```js
const editorEl = document.getElementById("editor");
const editContext = new EditContext();
editorEl.editContext = editContext;

function updateControlBounds() {
  const editorBounds = editorEl.getBoundingClientRect();
  editContext.updateControlBounds(editorBounds);
  console.log(
    `Updated control bounds to ${editorBounds.x}, ${editorBounds.y}, ${editorBounds.width}, ${editorBounds.height}`,
  );
}

// Update the control bounds now.
updateControlBounds();
// And when the page is resized.
window.addEventListener("resize", updateControlBounds);
```

## See also

- The `EditContext` interface it belongs to.
