---
title: "XPathExpression"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathexpression/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathExpression

This interface is a compiled XPath expression that can be evaluated on a document or specific node to return information from its DOM tree.

This is useful when an expression will be reused in an application, because it is just compiled once and all namespace prefixes which occur within the expression are preresolved.

Objects of this type are created by calling `XPathEvaluator.createExpression()`.

## Instance methods

- `XPathExpression.evaluate()`
    Evaluates the XPath expression on the given node or document.

## Example

The following example shows the use of the `XPathExpression` interface.

### HTML

```html
<div>XPath example</div>
<div>Number of &lt;div&gt;s: <output></output></div>
```

### JavaScript

```js
const xpath = "//div";
const evaluator = new XPathEvaluator();
const expression = evaluator.createExpression(xpath);
const result = expression.evaluate(
  document,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
);
document.querySelector("output").textContent = result.snapshotLength;
```

## See also

- `document.createExpression()`
- `XPathResult`
