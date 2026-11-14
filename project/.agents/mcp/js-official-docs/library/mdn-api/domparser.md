---
title: "DOMParser"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domparser/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMParser

The **`DOMParser`** interface provides the ability to parse XML or HTML source code from a string into a DOM `Document`.

You can perform the opposite operation—converting a DOM tree into XML or HTML source—using the `XMLSerializer` interface.

In the case of an HTML document, you can also replace portions of the DOM with new DOM trees built from HTML by setting the value of the `Element.innerHTML` and `outerHTML` properties. These properties can also be read to fetch HTML fragments corresponding to the corresponding DOM subtree.

Note that `XMLHttpRequest` can parse XML and HTML directly from a URL-addressable resource, returning a `Document` in its `response` property.

> **Note:**
> Be aware that block-level elements like `` will be automatically closed if another block-level element is nested inside and therefore parsed before the closing `` tag.

## Constructor

- `DOMParser()`
    Creates a new `DOMParser` object.

## Instance methods

- `DOMParser.parseFromString()`
    Parses an input `TrustedHTML` instance or string as HTML or XML and returns a `Document`.

## Examples

The documentation for `DOMParser.parseFromString()`, this interface's only method, contains examples for parsing XML, SVG, and HTML strings.

## See also

- Parsing and serializing XML
- `XMLHttpRequest`
- `XMLSerializer`
- `JSON.parse()` - counterpart for `JSON` documents.
