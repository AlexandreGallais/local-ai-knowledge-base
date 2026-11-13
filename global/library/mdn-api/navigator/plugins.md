---
title: "Navigator: plugins property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/plugins/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: plugins property

The **`plugins`** read-only property of the `Navigator` interface returns a `PluginArray` object, listing the `Plugin` objects describing the plugins installed in the application.
Named properties of the returned object are not enumerable (except in very old browser versions).

Recent versions of the specification hard-code the returned list.
If inline viewing of PDF files is supported the property lists five standard plugins.
If inline PDF viewing is not supported then an empty list is returned.

> **Note:**
> Use `Navigator.pdfViewerEnabled` to determine if inline viewing of PDF files is supported. Do not infer it from this property.
>
> The "five standard plugins" are those that developers have most commonly used to feature detect inline PDF viewing.
> Returning these ensures that legacy code can more reliably determine whether inline viewing is supported.
> However this approach is not recommended for new code because this property may eventually be removed.

Legacy browser versions also list plugins for Adobe Flash and PDF viewer extensions.

## Value

`plugins` is a `PluginArray` object used to access `Plugin` objects either by name or as a list of items.

The returned value is not a JavaScript array, but has the `length` property and supports accessing individual items using bracket notation (`plugins[2]`), as well as via `item(index)` and `namedItem("name")` methods.

If PDF inline viewing is supported this will contain entries for the following plugins:

- "PDF Viewer"
- "Chrome PDF Viewer"
- "Chromium PDF Viewer"
- "Microsoft Edge PDF Viewer"
- "WebKit built-in PDF"

If inline viewing of PDFs is not supported then an empty object is returned.

## Examples

This code shows how to check if PDF files can be displayed inline:

```js
if ("PDF Viewer" in navigator.plugins) {
  // browser supports inline viewing of PDF files.
}
```
