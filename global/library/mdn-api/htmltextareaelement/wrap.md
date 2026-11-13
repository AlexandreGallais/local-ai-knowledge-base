---
title: "HTMLTextAreaElement: wrap property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/wrap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: wrap property

The **`wrap`** property of the `HTMLTextAreaElement` interface indicates how the control should wrap the value for form submission. It reflects the `<textarea>` element's `wrap` attribute. Note that the `"hard"` value only has an effect when the `cols` attribute is also set.

## Value

See `wrap` for the possible values. Defaults to `"soft"`.

## Examples

```js
const textareaElement = document.getElementById("comment");
const oldWrap = textArea.wrap;
textArea.wrap = "hard"; // Add line breaks (CR+LF) during form submission
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.cols`
