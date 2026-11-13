---
title: "HTMLButtonElement: formMethod property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/formmethod/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: formMethod property

The **`formMethod`** property of the `HTMLButtonElement` interface is the HTTP method used to submit the `<form>` if the `` element is the control that submits the form. It reflects the value of the ``'s `formmethod` attribute.

The value overrides the `method` property of the `HTMLFormElement` interface if the form is submitted via the button. This property can be retrieved or set. If set with an empty or invalid value, the invalid default value is `"get"`. If not set at all, the value is the empty string (`""`).

## Value

A string; `"post"`, `"get"`, `"dialog"`, or `""`.

## Examples

```js
btnEl.formMethod = "post";
```

## See also

- `HTMLButtonElement.formAction`
- `HTMLButtonElement.formEnctype`
- `HTMLButtonElement.formNoValidate`
- `HTMLButtonElement.formTarget`
- `HTMLFormElement.method`
- Sending form data
