---
title: "XMLSerializer: XMLSerializer() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlserializer/xmlserializer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLSerializer: XMLSerializer() constructor

The **`XMLSerializer()`** constructor creates a new `XMLSerializer`.

## Syntax

```js
new XMLSerializer()
```

### Parameters

None.

### Return value

A new `XMLSerializer` object.

## Examples

### Serializing XML into a string

This example serializes an entire document into a string containing XML.

```js
const s = new XMLSerializer();
const d = document;
const str = s.serializeToString(d);
saveXML(str);
```

This involves creating a new `XMLSerializer` object, then passing the `Document` to be serialized into `serializeToString()`, which returns the XML equivalent of the document. `saveXML()` represents a function that would then save the serialized string.
