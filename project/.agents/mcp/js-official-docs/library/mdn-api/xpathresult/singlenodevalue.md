---
title: "XPathResult: singleNodeValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/singlenodevalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: singleNodeValue property

The read-only **`singleNodeValue`** property of the
`XPathResult` interface returns a `Node` value or
`null` in case no node was matched of a result with
`XPathResult.resultType` being `ANY_UNORDERED_NODE_TYPE` or
`FIRST_ORDERED_NODE_TYPE`.

## Value

The return value is the `Node` value of the `XPathResult`
returned by `Document.evaluate()`.

### Exceptions

#### TYPE_ERR

In case `XPathResult.resultType` is not
`ANY_UNORDERED_NODE_TYPE` or `FIRST_ORDERED_NODE_TYPE`, a
`DOMException` of type `TYPE_ERR` is thrown.

## Examples

The following example shows the use of the `singleNodeValue` property.

### HTML

```html
<div>XPath example</div>
<div>
  Tag name of the element having the text content 'XPath example':
  <output></output>
</div>
```

### JavaScript

```js
const xpath = "//*[text()='XPath example']";
const result = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null,
);
document.querySelector("output").textContent = result.singleNodeValue.localName;
```
