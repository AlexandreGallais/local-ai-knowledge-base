---
title: "HTMLButtonElement: formEnctype property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/formenctype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: formEnctype property

The **`formEnctype`** property of the `HTMLButtonElement` interface is the MIME type of the content sent to the server when the form is submitted. It reflects the value of the ``'s `formenctype` attribute.

The value overrides the `enctype` property of the `HTMLFormElement` interface if the form is submitted via the submit button. This property can be retrieved or set. If not set, the value is the empty string (`""`).

## Value

A string.

## Examples

```js
btnEl.formEnctype = "application/x-www-form-urlencoded";
```

## See also

- `HTMLButtonElement.formAction`
- `HTMLButtonElement.formMethod`
- `HTMLButtonElement.formNoValidate`
- `HTMLButtonElement.formTarget`
- `HTMLFormElement.enctype`
- Sending form data
