---
title: "XPathResult: snapshotLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/snapshotlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: snapshotLength property

The read-only **`snapshotLength`** property of the
`XPathResult` interface represents the number of nodes in the result
snapshot.

## Value

An integer value representing the number of nodes in the result snapshot.

### Exceptions

#### TYPE_ERR

In case `XPathResult.resultType` is not
`UNORDERED_NODE_SNAPSHOT_TYPE` or `ORDERED_NODE_SNAPSHOT_TYPE`, a
`DOMException` of type `TYPE_ERR` is thrown.

## Examples

The following example shows the use of the `snapshotLength` property.

### HTML

```html
<div>XPath example</div>
<div>Number of matched nodes: <output></output></div>
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
document.querySelector("output").textContent = result.snapshotLength;
```
