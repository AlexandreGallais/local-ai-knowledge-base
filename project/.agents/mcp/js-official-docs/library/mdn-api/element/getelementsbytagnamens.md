---
title: "Element: getElementsByTagNameNS() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/getelementsbytagnamens/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: getElementsByTagNameNS() method

The **`Element.getElementsByTagNameNS()`** method returns a
live `HTMLCollection` of elements with the given tag name belonging to the
given namespace. It is similar to `Document.getElementsByTagNameNS`, except
that its search is restricted to descendants of the specified element.

## Syntax

```js
getElementsByTagNameNS(namespaceURI, localName)
```

### Parameters

- `namespaceURI`
    The namespace URI of elements to look for (see
    `Element.namespaceURI` and `Attr.namespaceURI`). For
    example, if you need to look for XHTML elements, use the XHTML namespace URI,
    `http://www.w3.org/1999/xhtml`.
- `localName`
    Either the local name of elements to look for or the
    special value `"*"`, which matches all elements (see
    `Element.localName` and `Attr.localName`).

### Return value

A live `HTMLCollection` of found elements in the order they appear in the tree.

## Examples

```js
// Check the alignment on a number of cells in a table in an XHTML document.
const table = document.getElementById("forecast-table");
const cells = table.getElementsByTagNameNS(
  "http://www.w3.org/1999/xhtml",
  "td",
);

for (const cell of cells) {
  const axis = cell.getAttribute("axis");
  if (axis === "year") {
    // Grab the data
  }
}
```
