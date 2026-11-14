---
title: "HTMLButtonElement: formAction property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/formaction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: formAction property

The **`formAction`** property of the `HTMLButtonElement` interface is the URL of the program that is executed on the server when the form that owns this control is submitted. It reflects the value of the ``'s `formaction` attribute.

The value overrides the `action` property of the `HTMLFormElement` interface if the form is submitted via the button. This property can be retrieved or set.

## Value

A string. The URL for form submission.

## Examples

```js
btnEl.formAction = "/cgi-bin/publish";
```

## See also

- `HTMLButtonElement.formEnctype`
- `HTMLButtonElement.formMethod`
- `HTMLButtonElement.formNoValidate`
- `HTMLButtonElement.formTarget`
- Sending form data
