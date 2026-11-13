---
title: "Document: styleSheets property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/stylesheets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: styleSheets property

The **`styleSheets`** read-only property of the `Document` interface returns a `StyleSheetList` of `CSSStyleSheet` objects, for stylesheets explicitly linked into or embedded in a document.

## Value

The returned list is ordered as follows:

- StyleSheets retrieved from `Link` headers are placed first, sorted in header order.
- StyleSheets retrieved from the DOM are placed after, sorted in tree order.

## Examples

### Retrieving a specific stylesheet by its title

```js
function getStyleSheet(uniqueTitle) {
  for (const sheet of document.styleSheets) {
    if (sheet.title === uniqueTitle) {
      return sheet;
    }
  }
}
```

### Accessing rules in the stylesheet

You can access these stylesheets and their rules individually using the stylesheet, style, and `CSSRule` objects, as demonstrated in this example, which prints out all of the style rule selectors to the console.

```js
for (const styleSheet of document.styleSheets) {
  for (const rule of styleSheet.cssRules) {
    console.log(`${rule.selectorText}\n`);
  }
}
```

For a document with a single stylesheet in which the following three rules are defined:

```css
body {
  background-color: darkblue;
}
p {
  font-family: "Arial";
  font-size: 10pt;
  margin-left: 0.125in;
}
#lumpy {
  display: none;
}
```

This script outputs the following:

```plain
BODY
P
#LUMPY
```
