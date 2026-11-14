---
title: "XML Element and Attribute Name Verification when Creating New Nodes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xml-element-and-attribute-name-verification-when-creating-new-nodes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XML Element and Attribute Name Verification when Creating New Nodes

The XML Document Object Model (DOM) checks the validity of the names when creating new element nodes or attribute nodes. If the names contain illegal characters, an exception is thrown. To ensure that names are valid and encoded correctly, you need to use the **XmlConvert** class to encode the name and decode it back at an application level. The **XmlWriter** has methods that do additional work to ensure well-formed XML is generated.

## See also

- XML Document Object Model (DOM)
