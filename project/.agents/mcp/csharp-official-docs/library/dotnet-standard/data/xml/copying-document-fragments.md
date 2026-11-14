---
title: "Copying Document Fragments"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/copying-document-fragments.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Copying Document Fragments

You can create an **XmlDocumentFragment** node and then add nodes under it. When the **XmlDocumentFragment** is inserted with the **InsertNode** method, the **XmlDocumentFragment** node is not copied, but its child nodes are inserted in the XML Document Object Model (DOM).

## See also

- XML Document Object Model (DOM)
