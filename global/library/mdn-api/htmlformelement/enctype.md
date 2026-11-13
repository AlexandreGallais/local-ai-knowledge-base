---
title: "HTMLFormElement: enctype property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/enctype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: enctype property

The **`HTMLFormElement.enctype`** property is the MIME type of content that is used
to submit the form to the server. Possible values are:

- `application/x-www-form-urlencoded`: The initial default type.
- `multipart/form-data`: The type that allows file ``
  element(s) to upload file data.
- `text/plain`: Ambiguous format, human-readable content not reliably interpretable by computer.

This value can be overridden by a `formenctype` attribute
on a `` or `` element.

## Value

A string.

## Examples

```js
form.enctype = "application/x-www-form-urlencoded";
```
