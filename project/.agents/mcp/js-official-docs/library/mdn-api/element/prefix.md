---
title: "Element: prefix property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/prefix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: prefix property

The **`Element.prefix`** read-only property returns the
namespace prefix of the specified element, or `null` if no prefix is
specified.

## Value

A string or `null`.

## Examples

The following logs "x" to the console.

```xml
<x:div onclick="console.log(this.prefix)"/>
```

## Notes

This will only work when a namespace-aware parser is used, i.e., when a document is
served with an XML MIME type. This will not work for HTML documents.

## See also

- `Element.namespaceURI`
- `Element.localName`
- `Attr.prefix`
