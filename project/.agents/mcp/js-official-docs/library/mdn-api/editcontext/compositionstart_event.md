---
title: "EditContext: compositionstart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/compositionstart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: compositionstart event

The `compositionstart` event of the `EditContext` interface fires when composition using an Input Method Editor (IME) window starts.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("compositionstart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncompositionstart = (event) => { }
```

## Examples

### Using `compositionstart` to change the editable region's border

In the following example, the editable region's border is set to red when the `compositionstart` event fires, and back to black when the `compositionend` event fires. Note that the event listener callbacks in this example are only called when using an IME window, or other platform-specific editing UI surfaces, to compose text.

```css
#text-editor {
  border: 1px solid black;
}
#text-editor.is-composing {
  border-color: red;
}
```

```html
<div id="text-editor"></div>
```

```js
const editorElement = document.getElementById("text-editor");
const editContext = new EditContext();
editorElement.editContext = editContext;

editContext.addEventListener("compositionstart", (event) => {
  editorElement.classList.add("is-composing");
});

editContext.addEventListener("compositionend", (event) => {
  editorElement.classList.remove("is-composing");
});
```
