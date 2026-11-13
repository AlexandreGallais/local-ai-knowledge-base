---
title: "HTMLAnchorElement: rel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: rel property

The **`HTMLAnchorElement.rel`** property reflects the `rel` attribute. It is a string containing a space-separated list of link types indicating the relationship between the resource represented by the `` element and the current document.

## Value

A string.

## Examples

```js
const anchors = document.getElementsByTagName("a");
for (const anchor of anchors) {
  alert(`Rel: ${anchor.rel}`);
}
```

## See also

- The equivalent property on `<area>` and `<link>`,
  `HTMLAreaElement.rel` and `HTMLLinkElement.rel`.
- The very same list but as tokens: `HTMLAnchorElement.relList`
