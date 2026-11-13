---
title: "Document: documentURI property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/documenturi/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: documentURI property

The **`documentURI`** read-only property of the
`Document` interface returns the document location as a string.

## Value

A string.

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
document.getElementById("url").textContent = document.documentURI;
```

## See also

- The `document.URL` property which returns the same value.
