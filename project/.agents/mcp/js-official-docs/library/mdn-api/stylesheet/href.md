---
title: "StyleSheet: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheet/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheet: href property

The **`href`** property of the `StyleSheet`
interface returns the location of the style sheet.

This property is read-only.

## Value

A string containing the stylesheet's URI.

## Examples

Assume the `<head>` contains the following:

```html
<link rel="styleSheet" href="example.css" />
```

Then, if you open the HTML page via a `file://` URL on Windows, and run the following script:

```js
console.log(document.styleSheets[0].href);
```

The result looks like: "file:////C:/Windows/Desktop/example.css".

## Notes

If the style sheet is a linked style sheet, the value of its attribute is its location.
For inline style sheets, the value of this attribute is `null`.
