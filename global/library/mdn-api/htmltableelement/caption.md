---
title: "HTMLTableElement: caption property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltableelement/caption/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTableElement: caption property

The **`caption`** property of the `HTMLTableElement` interface represents the first `` element child of the given ``, or `null` if no such element exists.

## Value

An `HTMLTableCaptionElement` or `null`.

This property can be assigned, which causes the existing first `` element child, if any, to be removed, and the given value, if it is not `null`, to be inserted as the first child. Therefore, setting `null` has the same effect as calling `deleteCaption()`. If the assigned value is not an `HTMLTableCaptionElement` or `null`, a `TypeError` is thrown.

## Examples

```js
if (table.caption) {
  // Do something with the caption
}
```

## See also

- `HTMLTableElement.tBodies`
- `HTMLTableElement.tFoot`
- `HTMLTableElement.tHead`
- `HTMLTableElement.createCaption()`
- `HTMLTableElement.deleteCaption()`
