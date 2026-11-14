---
title: "HTMLAnchorElement: relList property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/rellist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: relList property

The read-only **`relList`** property of the `HTMLAnchorElement` returns a live `DOMTokenList` object containing the set of link types indicating the relationship between the resource represented by the `` element and the current document.

It reflects the `` element's `rel` content attribute.

## Value

A live `DOMTokenList` object.

Although the `relList` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `relList` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

```js
const anchors = document.getElementsByTagName("a");
for (const anchor of anchors) {
  const list = anchor.relList;
  console.log(
    `New anchor node found with ${list.length} link types in relList.`,
  );
  list.forEach((relValue) => {
    console.log(relValue);
  });
}
```

## See also

- The equivalent property on `<area>` and `<link>`,
  `HTMLAreaElement.relList` and `HTMLLinkElement.relList`.
- The very same list but as a space-separated tokens in a string:
  `HTMLAnchorElement.rel`
