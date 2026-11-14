---
title: "XPathEvaluator: createExpression() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathevaluator/createexpression/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathEvaluator: createExpression() method

This method compiles an `XPathExpression` which can then be used for
(repeated) evaluations of the XPath expression.

## Syntax

```js
createExpression(expression)
createExpression(expression, resolver)
```

### Parameters

- `expression`
    A string representing the XPath expression to be created.
- `resolver` (optional)
    A `Node`, `null`, or any object implementing the `lookupNamespaceURI` method. Permits translation of all prefixes, including the `xml` namespace prefix, within the XPath expression into appropriate namespace URIs.

### Return value

A `XPathExpression` representing the compiled form of the XPath
expression.

### Exceptions

#### INVALID_EXPRESSION_ERR

If the expression is not legal according to the rules of the
`XPathEvaluator`, a `DOMException` of type
`INVALID_EXPRESSION_ERR` is raised.

#### NAMESPACE_ERR

If the expression contains namespace prefixes which cannot be resolved by the specified
`XPathNSResolver`, a `DOMException` of type
`NAMESPACE_ERROR` is raised.

## Examples

The following example shows the use of the `evaluate()` method.

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

- `Document.createExpression()`
- `XPathExpression`
