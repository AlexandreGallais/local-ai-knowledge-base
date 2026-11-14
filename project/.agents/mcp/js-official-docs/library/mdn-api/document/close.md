---
title: "Document: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: close() method

The **`Document.close()`** method finishes writing to a
document, opened with `Document.open()`.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
// Open a document to write to it
document.open();

// Write the content of the document
document.write("<p>The one and only content.</p>");

// Close the document
document.close();
```
