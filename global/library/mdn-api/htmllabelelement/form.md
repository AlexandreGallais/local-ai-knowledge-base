---
title: "HTMLLabelElement: form property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllabelelement/form/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLabelElement: form property

The **`form`** read-only property of the `HTMLLabelElement` interface returns an `HTMLFormElement` object that owns the `control` associated with this ``, or `null` if this label is not associated with a labelable form-associated element (``, ``, `<output>`, `<select>`, `<textarea>`, or form-associated custom elements) that is owned by a form.

Unlike form-associated elements, the `` element does not have a `form` attribute. This property does not reflect any HTML attribute, but is just a shortcut for `label.control.form`.

## Value

An `HTMLFormElement` or `null`.

## See also

- `HTMLLabelElement`
- `HTMLInputElement.form`
- `HTMLFormElement`
- ``
- HTML forms guide
