---
title: "TextUpdateEvent: updateRangeStart property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textupdateevent/updaterangestart/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextUpdateEvent: updateRangeStart property

The **`TextUpdateEvent.updateRangeStart`** read-only property indicates the start position of the text range that is being replaced in the `EditContext` object.

## Value

A `Number`.

## Examples

### Using `textupdate` to display the inserted text and location

```html
<div id="editor"></div>
```

```js
const editorEl = document.getElementById("editor");
const editContext = new EditContext();
editorEl.editContext = editContext;

editContext.addEventListener("textupdate", (e) => {
  console.log(
    `The user inserted the text "${e.text}" between index ${e.updateRangeStart} and index ${e.updateRangeEnd}.`,
  );
});
```
