---
title: "FontFaceSet: ready property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/ready/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: ready property

The `ready` read-only property of the `FontFaceSet` interface returns a `Promise` that resolves to the given `FontFaceSet`.

The promise will only resolve once the document has completed loading fonts, layout operations are completed, and no further font loads are needed.

## Value

A `Promise` that resolves to the given `FontFaceSet`.

## Examples

In the following example the value of `ready` is printed to the console once the promise has resolved.

```js
async function isReady() {
  let ready = await document.fonts.ready;
  console.log(ready);
}

isReady();
```
