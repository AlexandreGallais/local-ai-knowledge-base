---
title: "StyleSheet: ownerNode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheet/ownernode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheet: ownerNode property

The **`ownerNode`** read-only property of the `StyleSheet` interface returns the node that associates this style sheet with the document.

This is usually an HTML
`<link>` or
`<style>` element, but
can also return a processing instruction node in the case of `<?xml-stylesheet ?>`.

## Value

A `Node` object.

## Examples

Assuming the `<head>` contains the following:

```html
<link rel="stylesheet" href="example.css" />
```

Then:

```js
console.log(document.styleSheets[0].ownerNode);
// Displays '<link rel="stylesheet" href="example.css">'
```

## Notes

For style sheets that are included by other style sheets, such as with
`@import`, the value of this
property is `null`.
