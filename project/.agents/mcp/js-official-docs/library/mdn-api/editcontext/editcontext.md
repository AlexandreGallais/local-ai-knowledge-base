---
title: "EditContext: EditContext() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/editcontext/editcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EditContext: EditContext() constructor

The **`EditContext()`** constructor returns a new `EditContext` object.

## Syntax

```js
new EditContext()
new EditContext(options)
```

### Parameters

- `options` (optional)
    An optional object with the following properties:
    - `text`
        A string to set the initial text of the `EditContext`.
    - `selectionStart`
        A number to set the initial selection start of the `EditContext`.
    - `selectionEnd`
        A number to set the initial selection end of the `EditContext`.

## Examples

### Instantiating an `EditContext` object

The following example creates a new `EditContext` object with the initial text "Hello world!" and the initial selection covering the entire text.

```html
<div id="editor"></div>
```

```js
const initialText = "Hello world!";

const editContext = new EditContext({
  text: initialText,
  selectionStart: 0,
  selectionEnd: initialText.length,
});

const editorElement = document.getElementById("editor");
editorElement.editContext = editContext;

console.log(
  `EditContext object ready. Text: ${editContext.text}. Selection: ${editContext.selectionStart} - ${editContext.selectionEnd}.`,
);
```

## See also

- The `EditContext` interface it belongs to.
