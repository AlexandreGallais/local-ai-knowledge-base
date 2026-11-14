---
title: "TextFormat: rangeEnd property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textformat/rangeend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextFormat: rangeEnd property

The **`rangeEnd`** property of the `TextFormat` interface indicates the end position of the text range that needs to be formatted with the given text format.

## Value

A `Number`.

## Examples

### Reading the range of text that needs to be formatted

The following example shows how to use the `textformatupdate` event's `rangeStart` and `rangeEnd` properties to determine the range of text that needs to be formatted. Note that the event listener callback in this example is only called when using an IME window to compose text.

```html
<div id="editor"></div>
```

```css
#editor {
  height: 200px;
  background: #eeeeee;
}
```

```js
const editorEl = document.getElementById("editor");
const editContext = new EditContext(editorEl);
editorEl.editContext = editContext;

editContext.addEventListener("textformatupdate", (e) => {
  const formats = e.getTextFormats();

  for (const format of formats) {
    console.log(
      `IME wants to apply formatting between ${format.rangeStart} and ${format.rangeEnd}.`,
    );
  }
});
```

## See also

- The `TextFormat` interface it belongs to.
