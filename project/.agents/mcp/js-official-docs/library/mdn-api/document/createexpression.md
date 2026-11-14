---
title: "Document: createExpression() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createexpression/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createExpression() method

This method compiles an `XPathExpression` which can then be used for (repeated) evaluations.

You must call this method on the same document that you run the expression against.

## Syntax

```js
createExpression(xpathText, namespaceURLMapper)
```

### Parameters

- `xpathText`
    A string which is the XPath expression to be compiled.
- `namespaceURLMapper`
    A function which maps a namespace prefix to a
    namespace URL (or null if none needed).

### Return value

`XPathExpression`

## Examples

```js
const xpathExpr = document.createExpression("//div");
const xpathResult = xpathExpr.evaluate(document); // returns an XPathResult object
const nodeContext = document.querySelector("nav");
// Re-using the XPathExpression "xpathExpr"
const otherResult = xpathExpr.evaluate(nodeContext); // returns an XPathResult object
```

## See also

- `Document.evaluate()`
- `XPathExpression`
