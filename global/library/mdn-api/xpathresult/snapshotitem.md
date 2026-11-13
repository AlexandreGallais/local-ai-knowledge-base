---
title: "XPathResult: snapshotItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/snapshotitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: snapshotItem() method

The **`snapshotItem()`** method of the
`XPathResult` interface returns an item of the snapshot collection or
`null` in case the index is not within the range of nodes. Unlike the
iterator result, the snapshot does not become invalid, but may not correspond to the
current document if it is mutated.

## Syntax

```js
snapshotItem(i)
```

### Parameters

- `i`
    A number, the index of the item.

### Return value

The `Node` at the given index within the node set of the
`XPathResult`.

### Exceptions

#### TYPE_ERR

In case `XPathResult.resultType` is not
`UNORDERED_NODE_SNAPSHOT_TYPE` or `ORDERED_NODE_SNAPSHOT_TYPE`, a
`DOMException` of type `TYPE_ERR` is thrown.

## Examples

The following example shows the use of the `snapshotItem()` method.

### HTML

```html
<div>XPath example</div>
<div>Tag names of the matched nodes: <output></output></div>
```

### JavaScript

```js
const xpath = "//div";
const result = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null,
);
let node = null;
const tagNames = [];
for (let i = 0; i < result.snapshotLength; i++) {
  node = result.snapshotItem(i);
  tagNames.push(node.localName);
}
document.querySelector("output").textContent = tagNames.join(", ");
```
