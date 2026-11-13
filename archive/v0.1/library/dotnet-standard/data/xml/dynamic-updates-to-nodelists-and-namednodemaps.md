---
title: "Dynamic Updates to NodeLists and NamedNodeMaps"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/dynamic-updates-to-nodelists-and-namednodemaps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dynamic Updates to NodeLists and NamedNodeMaps

Because the **XmlNodeList** and the **XmlNamedNodeMap** contain a set of nodes, yet the XML document is loaded into memory and is being modified, the World Wide Web Consortium (W3C) states that these objects that contain sets of nodes need to be dynamic. That is, if the underlying document changes, then the data in these two objects should change also. Therefore, if you have an **XmlNodeList** that contains all the child elements of a particular element (for example, element X), then you add an additional element, element Q, to the document under element X. The **XmlNodeList** should also have that new element Q added to its collection. The same is true in reverse. If a node is added to the **XmlNodeList**, the underlying document is updated as well.

## See also

- XML Document Object Model (DOM)
