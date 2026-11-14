---
title: "Removing Node Content in the DOM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/removing-node-content-in-the-dom.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Removing Node Content in the DOM

For node types that inherit from `System.Xml.XmlCharacterData`, which are the `System.Xml.XmlComment`, `System.Xml.XmlText`, `System.Xml.XmlCDataSection`, `System.Xml.XmlWhitespace`, and `System.Xml.XmlSignificantWhitespace` node types, you can remove characters using the `System.Xml.XmlCharacterData.DeleteData*` method, which removes a range of characters from the node. If you want to remove content completely, you remove the node that contains the content. If you want to keep the node, but the content is incorrect, then modify the content. For information on modifying the content of a node, see Modifying Nodes, Content, and Values in an XML Document.

## See also

- XML Document Object Model (DOM)
