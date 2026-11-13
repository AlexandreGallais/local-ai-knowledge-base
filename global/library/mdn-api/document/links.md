---
title: "Document: links property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/links/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: links property

The **`links`** read-only property of the `Document` interface returns a collection of all `<area>` elements and `` elements in a document with a value for the href attribute.

## Value

An `HTMLCollection`.

## Examples

```js
for (const link of document.links) {
  const linkHref = document.createTextNode(link.href);
  const lineBreak = document.createElement("br");
  document.body.appendChild(linkHref);
  document.body.appendChild(lineBreak);
}
```
