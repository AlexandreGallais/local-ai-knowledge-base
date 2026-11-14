---
title: "XPathEvaluator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathevaluator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathEvaluator

The `XPathEvaluator` interface allows you to compile and evaluate XPath expressions.

## Constructor

- `XPathEvaluator()`
    Creates a new `XPathEvaluator` object.

## Instance methods

- `XPathEvaluator.createExpression()`
    Creates a parsed XPath expression with resolved namespaces.
- `XPathEvaluator.createNSResolver()` (deprecated)
    Returns the input as-is.
- `XPathEvaluator.evaluate()`
    Evaluates an XPath expression string and returns a result of the specified type if possible.

## Example

### Count the number of `` elements

The following example shows the use of the `XPathEvaluator` interface.

#### HTML

```html
<div>XPath example</div>
<div>Number of &lt;div&gt; elements: <output></output></div>
```

#### JavaScript

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

#### Result

## See also

- `document.createExpression()`
- `XPathExpression`
