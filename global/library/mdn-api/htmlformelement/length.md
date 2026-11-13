---
title: "HTMLFormElement: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: length property

The **`HTMLFormElement.length`**
read-only property returns the number of controls in the `<form>`
element.

You can access the list of the form's controls using the
`elements` property.

This includes both elements that are descendants of the `<form>`
element as well as elements that are made members of the form using their
`form` property.

Elements that are considered for this property are: ``,
`<fieldset>`, `` (with the exception
that any whose type is "image" are omitted for historical reasons),
`<object>`, `<output>`, `<select>`,
and `<textarea>`.

## Value

A number.

## Examples

```js
if (document.getElementById("form1").length > 1) {
  // more than one form control here
}
```
