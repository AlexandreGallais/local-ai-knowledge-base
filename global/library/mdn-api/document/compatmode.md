---
title: "Document: compatMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/compatmode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: compatMode property

The **`Document.compatMode`** read-only property indicates
whether the document is rendered in Quirks mode or
Standards mode.

## Value

A string that is one of the following:

- `"BackCompat"` if the document is in quirks mode.
- `"CSS1Compat"` if the document is in no-quirks (also known as
  "standards") mode or limited-quirks (also known as "almost standards") mode.

> **Note:**
> All these modes are now standardized, so the older "standards"
> and "almost standards" names are nonsensical and no longer used in standards.

## Examples

```js
if (document.compatMode === "BackCompat") {
  // in Quirks mode
}
```
