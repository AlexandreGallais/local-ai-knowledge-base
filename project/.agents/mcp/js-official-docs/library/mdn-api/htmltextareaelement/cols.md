---
title: "HTMLTextAreaElement: cols property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/cols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: cols property

The **`cols`** property of the `HTMLTextAreaElement` interface is a positive integer representing the visible width of the multi-line text control, in average character widths. It reflects the `<textarea>` element's `cols` attribute.

## Value

A positive integer. Defaults to `20`.

## Examples

```js
const textareaElement = document.getElementById("comment");
textArea.cols = 80;
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.rows`
- `HTMLTextAreaElement.wrap`
- CSS `resize` property
