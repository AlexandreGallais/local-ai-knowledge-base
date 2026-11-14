---
title: "HTMLAreaElement: pathname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/pathname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: pathname property

The **`HTMLAreaElement.pathname`** property is a
string containing an initial `'/'` followed by the path of
the URL not including the query string or fragment (or the empty string if there is no
path).

The pathname is percent-encoded when setting but not percent-decoded when read.

## Value

A string.

## Examples

```js
// An <area id="myArea" href="/en-US/docs/HTMLAreaElement"> element is in the document
const area = document.getElementById("myArea");
area.pathname; // returns '/en-US/docs/HTMLAreaElement'
```

## See also

- The `HTMLAreaElement` interface it belongs to.
