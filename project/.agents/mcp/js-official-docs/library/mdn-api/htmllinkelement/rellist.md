---
title: "HTMLLinkElement: relList property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/rellist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: relList property

The read-only **`relList`** property of the `HTMLLinkElement` returns a live `DOMTokenList` object containing the set of link types indicating the relationship between the resource represented by the `<link>` element and the current document. It reflects the `<link>` element's `rel` content attribute.

## Value

A live `DOMTokenList` object.

Although the `relList` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `relList` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

```js
const links = document.getElementsByTagName("link");
for (const link of links) {
  console.log("New link found.");
  link.relList.forEach((relEntry) => {
    console.log(relEntry);
  });
}
```

## See also

- The equivalent property on `` and `<area>`,
  `HTMLAnchorElement.relList` and `HTMLAreaElement.relList`.
- The very same list but as a space-separated tokens in a string:
  `HTMLLinkElement.rel`
