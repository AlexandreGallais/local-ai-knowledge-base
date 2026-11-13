---
title: "HTMLInputElement: formTarget property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/formtarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: formTarget property

The **`formTarget`** property of the `HTMLInputElement` interface is the tab, window, or iframe where the response of the submitted `<form>` is to be displayed. It reflects the value of the `` element's `formtarget` attribute.

This property is valid only for `submit` and `image` `` elements.

Its value overrides the `target` property of the `HTMLFormElement` interface if the form is submitted via the input. This property can be retrieved or set. If not set, the value is the empty string (`""`).

## Value

A string.

## Examples

```js
inputElement.formTarget = "_blank";
```

## See also

- `HTMLInputElement.formAction`
- `HTMLInputElement.formEnctype`
- `HTMLInputElement.formNoValidate`
- `HTMLInputElement.formMethod`
- `HTMLFormElement.target`
- ``
- ``
- Sending form data
