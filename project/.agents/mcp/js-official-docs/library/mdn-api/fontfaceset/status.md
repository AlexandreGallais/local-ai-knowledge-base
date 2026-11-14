---
title: "FontFaceSet: status property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/status/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: status property

The **`status`** read-only property of the `FontFaceSet` interface returns the loading state of the fonts in the set.

## Value

One of:

- `"loading"`
- `"loaded"`

## Examples

In the following example the `status` of the `FontFaceSet` is printed to the console.

```js
console.log(document.fonts.status);
```
