---
title: "Document: head property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/head/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: head property

The **`head`** read-only property of
the `Document` interface returns the `<head>` element of
the current document.

## Value

An `HTMLHeadElement`.

## Examples

```html
<!doctype html>
<head id="my-document-head">
  <title>Example: using document.head</title>
</head>
```

```js
const theHead = document.head;

console.log(theHead.id); // "my-document-head";
console.log(theHead === document.querySelector("head")); // true
```

## Notes

`document.head` is read-only. Trying to assign a value to this property will
fail silently or, in Strict Mode, throws a `TypeError`.

## See also

- `document.body`
