---
title: "Document: URL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: URL property

The **`URL`** read-only property of the `Document`
interface returns the document location as a string.

## Value

A string containing the URL of the document.

## Examples

### HTML

```html
<p id="urlText">
  URL:<br />
  <span id="url">URL goes here</span>
</p>
```

### JavaScript

```js
document.getElementById("url").textContent = document.URL;
```

## See also

- The `document.documentURI` property which returns the same value.
