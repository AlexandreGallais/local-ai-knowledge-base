---
title: "Document: xmlVersion property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/xmlversion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: xmlVersion property

Returns the version number as specified in the XML declaration (e.g., `<?xml version="1.0"?>`) or "1.0" if the declaration is absent.

This attribute was never really useful, since it always returned 1.0, and has been removed in DOM Level 4. As such, Firefox 10 no longer implements it. Its primary use in the past was to detect whether or not the document was being rendered as XML rather than HTML. To detect this, you can create an element with its name in lower case, then check to see if it gets converted into all upper case (in which case the document is in the non-XML HTML mode):

```js
if (document.createElement("foo").tagName === "FOO") {
  /* Document is not XML */
}
```
