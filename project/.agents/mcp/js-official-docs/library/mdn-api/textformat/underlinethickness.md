---
title: "TextFormat: underlineThickness property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/textformat/underlinethickness/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextFormat: underlineThickness property

The **`underlineThickness`** property of the `TextFormat` interface indicates the thickness of the underline that needs to be applied to the text range that is being formatted.

## Value

A `String` that is one of the following values:

- `"none"`: No underline.
- `"thin"`: A thin underline.
- `"thick"`: A thick underline.

## Examples

### Reading the underline thickness that needs to be applied

The following example shows how to use the `textformatupdate` event's `underlineThickness` property to determine the underline thickness that needs to be applied to the text being formatted. Note that the event listener callback in this example is only called when using an IME window to compose text.

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
      `IME wants to apply a ${format.underlineThickness} underline between ${format.rangeStart} and ${format.rangeEnd}.`,
    );
  }
});
```

## See also

- The `TextFormat` interface it belongs to.
