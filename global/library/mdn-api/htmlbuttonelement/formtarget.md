---
title: "HTMLButtonElement: formTarget property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/formtarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: formTarget property

The **`formTarget`** property of the `HTMLButtonElement` interface is the tab, window, or iframe where the response of the submitted `<form>` is to be displayed. It reflects the value of the `` element's `formtarget` attribute.

The value overrides the `target` property of the `HTMLFormElement` interface if the form is submitted via the button. This property can be retrieved or set. If not set, the value is the empty string (`""`).

## Value

A string.

## Examples

```js
btnEl.formTarget = "_self";
```

## See also

- `HTMLButtonElement.formAction`
- `HTMLButtonElement.formEnctype`
- `HTMLButtonElement.formNoValidate`
- `HTMLButtonElement.formMethod`
- `HTMLFormElement.target`
- Sending form data
