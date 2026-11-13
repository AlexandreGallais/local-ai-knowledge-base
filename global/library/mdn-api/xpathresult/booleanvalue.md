---
title: "XPathResult: booleanValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/booleanvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: booleanValue property

The read-only **`booleanValue`** property of the
`XPathResult` interface returns the boolean value of a result with
`XPathResult.resultType` being `BOOLEAN_TYPE`.

## Value

The return value is the boolean value of the `XPathResult` returned by
`Document.evaluate()`.

### Exceptions

#### TYPE_ERR

In case `XPathResult.resultType` is not `BOOLEAN_TYPE`, a
`DOMException` of type `TYPE_ERR` is thrown.

## Examples

The following example shows the use of the `booleanValue` property.

### HTML

```html
<div>XPath example</div>
<p>Text is 'XPath example': <output></output></p>
```

### JavaScript

```js
const xpath = "//div/text() = 'XPath example'";
const result = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.BOOLEAN_TYPE,
  null,
);
document.querySelector("output").textContent = result.booleanValue;
```
