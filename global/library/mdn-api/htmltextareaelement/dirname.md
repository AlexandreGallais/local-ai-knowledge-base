---
title: "HTMLTextAreaElement: dirName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltextareaelement/dirname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTextAreaElement: dirName property

The **`dirName`** property of the `HTMLTextAreaElement` interface is the directionality of the element. It reflects the value of the `<textarea>` element's `dirName` attribute. This property can be retrieved or set.

The `dirname` attribute controls how the element's directionality is submitted. When included, the form control will submit with two name/value pairs: the first being the `name` and `value` of the `<textarea>`, and the second being the value of the `dirname` attribute as the name, with a value of `ltr` or `rtl` as set by the browser.

## Value

A string. The direction of the element.

## Examples

```js
textareaElement.dirName = "rtl";
```

## See also

- `HTMLInputElement.dirName`
- `dir` attribute
- Sending form data
