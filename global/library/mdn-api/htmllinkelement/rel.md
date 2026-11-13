---
title: "HTMLLinkElement: rel property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: rel property

The **`rel`** property of the `HTMLLinkElement` interface reflects the `rel` attribute. It is a string containing a space-separated list of link types indicating the relationship between the resource represented by the `<link>` element and the current document.

The most common use of this attribute is to specify a link to an external style sheet:
the property is set to `stylesheet`, and the `href`
attribute is set to the URL of an external style sheet to format the page.

## Value

A string.

## Examples

```js
const links = document.getElementsByTagName("link");
for (const link of links) {
  console.log(link);
}
```

## See also

- The equivalent property on `` and `<area>`,
  `HTMLAnchorElement.rel` and `HTMLAreaElement.rel`.
- The very same list but as tokens: `HTMLLinkElement.relList`
