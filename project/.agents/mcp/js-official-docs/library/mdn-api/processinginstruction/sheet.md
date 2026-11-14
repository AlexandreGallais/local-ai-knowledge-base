---
title: "ProcessingInstruction: sheet property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/sheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: sheet property

The read-only **`sheet`** property of the `ProcessingInstruction` interface
contains the stylesheet associated to the `ProcessingInstruction`.

The `xml-stylesheet` processing instruction is used to associate a stylesheet in an XML file.

## Value

The associated `Stylesheet` object, or `null` if there are none.

## Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/css" href="rule.css"?>
…
```

The `sheet` property of the processing instruction will return the `CSSStyleSheet` object describing `rule.css`.

## See also

- The DOM API
