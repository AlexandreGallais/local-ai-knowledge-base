---
title: "Element: getElementsByTagName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/getelementsbytagname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: getElementsByTagName() method

The
**`Element.getElementsByTagName()`** method returns a live
`HTMLCollection` of elements with the given tag name.

All descendants of the
specified element are searched, but not the element itself. The returned list is
_live_, which means it updates itself with the DOM tree automatically.
Therefore, there is no need to call `Element.getElementsByTagName()` with
the same element and arguments repeatedly if the DOM changes in between calls.

When called on an HTML element in an HTML document, `getElementsByTagName`
lower-cases the argument before searching for it. This is undesirable when trying to
match camel-cased SVG elements (such as
`<linearGradient>`)
in an HTML document. Instead, use `Element.getElementsByTagNameNS()`,
which preserves the capitalization of the tag name.

`Element.getElementsByTagName` is similar to
`Document.getElementsByTagName()`, except that it only searches for
elements that are descendants of the specified element.

## Syntax

```js
getElementsByTagName(tagName)
```

### Parameters

- `tagName`
    The qualified name to look for. The special string
    `"*"` represents all elements. For compatibility with XHTML, lower-case
    should be used.

### Return value

A _live_ `HTMLCollection` of elements with a matching tag name, in the order they appear. If no elements are found, the `HTMLCollection` is empty.

## Examples

```js
// Check the status of each data cell in a table
const table = document.getElementById("forecast-table");
const cells = table.getElementsByTagName("td");

for (const cell of cells) {
  const status = cell.getAttribute("data-status");
  if (status === "open") {
    // Grab the data
  }
}
```
