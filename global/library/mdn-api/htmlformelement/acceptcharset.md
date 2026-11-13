---
title: "HTMLFormElement: acceptCharset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/acceptcharset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: acceptCharset property

The **`HTMLFormElement.acceptCharset`** property represents the character encoding for the given `<form>` element.

The specification allows a single case-insensitive value of `"UTF-8"`, reflecting the ubiquity of this encoding (historically multiple character encodings could be specified as a comma-separated or space-separated list).

This reflects the value of the form's `accept-charset` HTML attribute.

## Value

A string which may be a case-insensitive match for `UTF-8`.

## Examples

```js
let charSet = document.forms["my-form"].acceptCharset;
```
