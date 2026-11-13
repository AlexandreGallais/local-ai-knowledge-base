---
title: "Copying Document Fragments"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/copying-document-fragments.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Copying Document Fragments

You can create an **XmlDocumentFragment** node and then add nodes under it. When the **XmlDocumentFragment** is inserted with the **InsertNode** method, the **XmlDocumentFragment** node is not copied, but its child nodes are inserted in the XML Document Object Model (DOM).

## See also

- XML Document Object Model (DOM)
