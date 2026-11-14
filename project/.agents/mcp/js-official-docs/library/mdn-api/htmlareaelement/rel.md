---
title: "HTMLAreaElement: rel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: rel property

The **`HTMLAreaElement.rel`** property reflects the `rel` attribute. It is a string containing a space-separated list of link types indicating the relationship between the resource represented by the `<area>` element and the current document.

## Value

A string.

## Examples

```js
const areas = document.getElementsByTagName("area");
for (const area of areas) {
  console.log(`Rel: ${area.rel}`);
}
```

## See also

- The equivalent property on `` and `<link>`,
  `HTMLAnchorElement.rel` and `HTMLLinkElement.rel`.
- The very same list but as tokens: `HTMLAreaElement.relList`
