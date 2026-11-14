---
title: "HTMLAnchorElement: pathname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/pathname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: pathname property

The **`HTMLAnchorElement.pathname`** property is a
string containing an initial `'/'` followed by the path of
the URL not including the query string or fragment (or the empty string if there is no
path).

## Value

A string.

## Examples

```js
// An <a id="myAnchor" href="/en-US/docs/HTMLAnchorElement"> element is in the document
const anchor = document.getElementById("myAnchor");
anchor.pathname; // returns '/en-US/docs/HTMLAnchorElement'
```

## See also

- The `HTMLAnchorElement` interface it belongs to.
