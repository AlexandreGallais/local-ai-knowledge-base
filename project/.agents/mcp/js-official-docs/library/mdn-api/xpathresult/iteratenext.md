---
title: "XPathResult: iterateNext() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/iteratenext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: iterateNext() method

The **`iterateNext()`** method of the
`XPathResult` interface iterates over a node set result and returns the
next node from it or `null` if there are no more nodes.

## Syntax

```js
iterateNext()
```

### Parameters

None.

### Return value

The next `Node` within the node set of the `XPathResult`.

### Exceptions

#### TYPE_ERR

In case `XPathResult.resultType` is not
`UNORDERED_NODE_ITERATOR_TYPE` or `ORDERED_NODE_ITERATOR_TYPE`, a
`DOMException` of type `TYPE_ERR` is thrown.

#### INVALID_STATE_ERR

If the document is mutated since the result was returned, a
`DOMException` of type `INVALID_STATE_ERR` is thrown.

## Examples

The following example shows the use of the `iterateNext()` method.

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
  XPathResult.ANY_TYPE,
  null,
);
let node = null;
const tagNames = [];
while ((node = result.iterateNext())) {
  tagNames.push(node.localName);
}
document.querySelector("output").textContent = tagNames.join(", ");
```
