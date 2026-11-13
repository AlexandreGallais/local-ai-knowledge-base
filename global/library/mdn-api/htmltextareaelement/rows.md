---
title: "HTMLTextAreaElement: rows property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/rows/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: rows property

The **`rows`** property of the `HTMLTextAreaElement` interface is a positive integer representing the visible text lines of the text control. It reflects the `<textarea>` element's `rows` attribute.

## Value

A positive integer. Defaults to `2`.

## Examples

```js
const textareaElement = document.getElementById("comment");
const textLines = textArea.rows;
textArea.rows = textLines + 2;
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.cols`
- `HTMLTextAreaElement.wrap`
- CSS `resize` property
