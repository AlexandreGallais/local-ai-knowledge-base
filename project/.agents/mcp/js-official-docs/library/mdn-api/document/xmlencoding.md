---
title: "Document: xmlEncoding property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/xmlencoding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: xmlEncoding property

The **`xmlEncoding`** read-only property of the `Document` interface returns the encoding as determined by the XML declaration. Should be `null` if unspecified or unknown.

> **Warning:**
> Do not use this attribute; it has been removed from the DOM Level 4 specification and is no longer supported in Firefox 10.0.

Consider the following XML Declaration:

```xml
<?xml version="1.0" encoding="UTF-16"?>
```

Then, the result should be "UTF-16".
