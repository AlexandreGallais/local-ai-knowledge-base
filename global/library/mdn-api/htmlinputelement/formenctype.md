---
title: "HTMLInputElement: formEnctype property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/formenctype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: formEnctype property

The **`formEnctype`** property of the `HTMLInputElement` interface is the MIME type of the content sent to the server when the `` with the `formEnctype` is the method of form submission. It reflects the value of the ``'s `formenctype` attribute.

This property is valid only for `submit` and `image` `` elements.

Its value overrides the `enctype` property of the `HTMLFormElement` interface if the form is submitted via the input. This property can be retrieved or set. If not set, the value is the empty string (`""`).

## Value

A string.

## Examples

```js
inputElement.formEnctype = "application/x-www-form-urlencoded";
```

## See also

- `HTMLInputElement.formAction`
- `HTMLInputElement.formMethod`
- `HTMLInputElement.formNoValidate`
- `HTMLInputElement.formTarget`
- `HTMLFormElement.enctype`
- ``
- ``
- Sending form data
