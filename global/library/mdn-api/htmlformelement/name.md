---
title: "HTMLFormElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: name property

The **`HTMLFormElement.name`** property represents the name of
the current `<form>` element as a string.

If your `<Form>` element contains an element named _name_ then
that element overrides the `form.name` property, so that you can't access it.

## Value

A string.

## Examples

```js
const form1name = document.getElementById("form1").name;

if (form1name !== document.form.form1) {
  // Browser doesn't support this form of reference
}
```
