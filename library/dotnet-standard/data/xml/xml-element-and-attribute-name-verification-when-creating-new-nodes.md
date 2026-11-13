---
title: "XML Element and Attribute Name Verification when Creating New Nodes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xml-element-and-attribute-name-verification-when-creating-new-nodes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XML Element and Attribute Name Verification when Creating New Nodes

The XML Document Object Model (DOM) checks the validity of the names when creating new element nodes or attribute nodes. If the names contain illegal characters, an exception is thrown. To ensure that names are valid and encoded correctly, you need to use the **XmlConvert** class to encode the name and decode it back at an application level. The **XmlWriter** has methods that do additional work to ensure well-formed XML is generated.

## See also

- XML Document Object Model (DOM)
