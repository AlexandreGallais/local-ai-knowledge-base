---
title: "Document: applets property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/applets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: applets property

The **`applets`** read-only property of the `Document` interface returns an empty `HTMLCollection`. This property is kept only for compatibility reasons; in older versions of browsers, it returned a list of the applets within a document.

> **Note:**
> Support for the `<applet>` element has been removed by all browsers. Therefore, calling `document.applets` always
> returns an empty collection.

## Value

An empty `HTMLCollection`.
