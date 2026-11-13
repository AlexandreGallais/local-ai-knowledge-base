---
title: "HTMLInputElement: dirName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/dirname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: dirName property

The **`dirName`** property of the `HTMLInputElement` interface is the directionality of the element and enables the submission of that value. It reflects the value of the `` element's `dirName` attribute. This property can be retrieved or set.

Valid only for `hidden`, `text`, `search`, `url`, `tel`, and `email` `` types, the `dirname` attribute controls how the element's directionality is submitted. When included, the form control will submit with two name/value pairs: the first being the `name` and `value`, and the second being the value of the `dirname` attribute as the name, with a value of `ltr` or `rtl` as set by the browser.

## Value

A string. The direction of the element.

## Examples

```js
inputElement.dirName = "rtl";
```

## See also

- `HTMLTextAreaElement.dirName`
- `dir` attribute
- Sending form data
