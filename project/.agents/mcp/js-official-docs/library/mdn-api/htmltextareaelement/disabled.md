---
title: "HTMLTextAreaElement: disabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/disabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: disabled property

The **`disabled`** property of the `HTMLTextAreaElement` interface indicates whether this multi-line text control is disabled and cannot be interacted with. It reflects the `<textarea>` element's `disabled` attribute. When `false`, this `textarea` may still be disabled if its containing element, such as a `<fieldset>`, is disabled.

## Value

A boolean.

## Examples

```js
const textareaElement = document.getElementById("comment");
if (commentsDisabled) {
  textareaElement.disabled = true;
}
```

## See also

- `<textarea>`
- `HTMLTextAreaElement.readOnly`
