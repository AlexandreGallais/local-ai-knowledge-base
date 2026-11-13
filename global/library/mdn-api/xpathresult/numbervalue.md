---
title: "XPathResult: numberValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/numbervalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: numberValue property

The read-only **`numberValue`** property of the
`XPathResult` interface returns the numeric value of a result with
`XPathResult.resultType` being `NUMBER_TYPE`.

## Value

The return value is the numeric value of the `XPathResult` returned by
`Document.evaluate()`.

### Exceptions

#### TYPE_ERR

In case `XPathResult.resultType` is not `NUMBER_TYPE`, a
`DOMException` of type `TYPE_ERR` is thrown.

## Examples

The following example shows the use of the `numberValue` property.

### HTML

```html
<div>XPath example</div>
<div>Number of &lt;div&gt;s: <output></output></div>
```

### JavaScript

```js
const xpath = "count(//div)";
const result = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.NUMBER_TYPE,
  null,
);
document.querySelector("output").textContent = result.numberValue;
```
