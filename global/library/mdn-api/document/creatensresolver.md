---
title: "Document: createNSResolver() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/creatensresolver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createNSResolver() method

The **`createNSResolver()`** method of the `Document` interface used to create a custom `XPathNSResolver` object. It now returns the input as-is and is only kept for compatibility reasons.

## Syntax

```js
createNSResolver(nodeResolver)
```

### Parameters

- `nodeResolver`
    A `Node`.

### Return value

`nodeResolver` itself.

## See also

- `Document.evaluate()`
- Introduction to using XPath in JavaScript
