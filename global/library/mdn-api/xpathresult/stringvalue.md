---
title: "XPathResult: stringValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/stringvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: stringValue property

The read-only **`stringValue`** property of the
`XPathResult` interface returns the string value of a result with
`XPathResult.resultType` being `STRING_TYPE`.

## Value

The return value is the string value of the `XPathResult` returned by
`Document.evaluate()`.

### Exceptions

#### TYPE_ERR

In case `XPathResult.resultType` is not `STRING_TYPE`, a
`DOMException` of type `TYPE_ERR` is thrown.

## Examples

The following example shows the use of the `stringValue` property.

### HTML

```html
<div>XPath example</div>
<div>Text content of the &lt;div&gt; above: <output></output></div>
```

### JavaScript

```js
const xpath = "//div/text()";
const result = document.evaluate(
  xpath,
  document,
  null,
  XPathResult.STRING_TYPE,
  null,
);
document.querySelector("output").textContent = result.stringValue;
```
