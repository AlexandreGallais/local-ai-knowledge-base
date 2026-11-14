---
title: "XPathResult: invalidIteratorState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xpathresult/invaliditeratorstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XPathResult: invalidIteratorState property

The read-only **`invalidIteratorState`** property of the
`XPathResult` interface signifies that the iterator has become invalid. It
is `true` if `XPathResult.resultType` is
`UNORDERED_NODE_ITERATOR_TYPE` or `ORDERED_NODE_ITERATOR_TYPE` and
the document has been modified since this result was returned.

## Value

A boolean value indicating whether the iterator has become invalid.

## Examples

The following example shows the use of the `invalidIteratorState` property.

### HTML

```html
<div>XPath example</div>
<p>Iterator state: <output></output></p>
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
// Invalidates the iterator state
document.querySelector("div").remove();
document.querySelector("output").textContent = result.invalidIteratorState
  ? "invalid"
  : "valid";
```
