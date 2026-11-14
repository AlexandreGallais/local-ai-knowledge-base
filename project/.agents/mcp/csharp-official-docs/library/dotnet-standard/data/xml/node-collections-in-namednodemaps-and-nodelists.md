---
title: "Node Collections in NamedNodeMaps and NodeLists"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/node-collections-in-namednodemaps-and-nodelists.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Node Collections in NamedNodeMaps and NodeLists

You can retrieve a set of nodes and put it in an ordered or unordered collection. When putting a set of nodes into an unordered collection, the set is called a NamedNodeMap by the World Wide Web Consortium (W3C); you can retrieve the data by name or index in this type of collection. Putting a set of nodes in an ordered collection is called a NodeList by the W3C, and the data can be retrieved by a zero-based index. NamedNodeMaps and NodeLists are described by the W3C. The implementations in the Microsoft .NET Framework for the NamedNodeMap is the **XmlNamedNodeMap**, and the NodeList is implemented by the **XmlNodeList**.

 For information on the unordered collection, see Unordered Node Retrieval by Name or Index. For information on the ordered collection, see Ordered Node Retrieval by Index.

## See also

- XML Document Object Model (DOM)
