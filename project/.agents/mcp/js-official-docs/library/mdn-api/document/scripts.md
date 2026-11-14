---
title: "Document: scripts property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/scripts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: scripts property

The **`scripts`** read-only property of the `Document` interface returns a list of the `<script>` elements in the document. The returned object is an `HTMLCollection`.

## Value

An `HTMLCollection`. You can use this just like an array to get all the
elements in the list.

## Examples

This example looks to see if the page has any `<script>` elements.

```js
let scripts = document.scripts;

if (scripts.length) {
  alert("This page has scripts!");
}
```
