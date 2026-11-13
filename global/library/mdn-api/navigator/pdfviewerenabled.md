---
title: "Navigator: pdfViewerEnabled property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/pdfviewerenabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: pdfViewerEnabled property

The **`pdfViewerEnabled`** read-only property of the `Navigator` interface indicates whether the browser supports inline display of PDF files when navigating to them.

If inline viewing is not supported the PDF is downloaded and may then be handled by some external application.

> **Note:**
> This method replaces a number of legacy methods of inferring support for inline viewing of PDF files.

## Value

`true` if the browser can display PDF files inline when navigating to the file (using either an internal viewer or a PDF viewer extension); otherwise `false`.

## Examples

To check PDF inline viewing support:

```js
if (!navigator.pdfViewerEnabled) {
  // The browser does not support inline viewing of PDF files.
}
```
