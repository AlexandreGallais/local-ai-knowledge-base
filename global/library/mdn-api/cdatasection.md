---
title: "CDATASection"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cdatasection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CDATASection

The **`CDATASection`** interface represents a CDATA section
that can be used within XML to include extended portions of unescaped text.
When inside a CDATA section, the symbols `<` and `&` don't need escaping
as they normally do.

In XML, a CDATA section looks like:

```xml
<![CDATA[ … ]]>
```

For example:

```xml
<foo>
  Here is a CDATA section: <![CDATA[ < > & ]]> with all kinds of unescaped text.
</foo>
```

The only sequence which is not allowed within a CDATA section is the closing sequence
of a CDATA section itself, `]]>`.

> **Note:**
> CDATA sections should not be used within HTML. They are considered comments and are not displayed.

## Instance properties

_This interface has no specific properties and implements those of its parent
`Text`._

## Instance methods

_This interface has no specific methods and implements those of its parent
`Text`._

## See also

- `Document.createCDATASection()`
