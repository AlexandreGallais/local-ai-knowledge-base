---
title: "HTMLInputElement: formAction property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/formaction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: formAction property

The **`formAction`** property of the `HTMLInputElement` interface is the URL of the program that is executed on the server when the form that owns this control is submitted. It reflects the value of the ``'s `formaction` attribute.

This property is valid only for `submit` and `image` `` elements.

Its value overrides the `action` property of the `HTMLFormElement` interface if the form is submitted via the input. This property can be retrieved or set.

## Value

A string. The URL for form submission.

## Examples

```js
inputElement.formAction = "/cgi-bin/publish";
```

## See also

- `HTMLInputElement.formEnctype`
- `HTMLInputElement.formMethod`
- `HTMLInputElement.formNoValidate`
- `HTMLInputElement.formTarget`
- ``
- ``
- Sending form data
