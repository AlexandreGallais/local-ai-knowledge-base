---
title: "TextUpdateEvent: text property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textupdateevent/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextUpdateEvent: text property

The **`TextUpdateEvent.text`** read-only property contains the text that was inserted within the updated range of an `EditContext`'s `textupdate` event.

## Value

A `String` that contains the text that replaces the text contained between the `updateRangeStart` and `updateRangeEnd` indexes.

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
    `The user inserted the text "${e.text}" at index ${e.updateRangeStart}.`,
  );
});
```
