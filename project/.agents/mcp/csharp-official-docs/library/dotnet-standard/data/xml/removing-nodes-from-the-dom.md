---
title: "Removing Nodes from the DOM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/removing-nodes-from-the-dom.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Removing Nodes from the DOM

To remove a node from the XML Document Object Model (DOM), use the `System.Xml.XmlNode.RemoveChild*` method to remove a specific node. When you remove a node, the method removes the subtree belonging to the node being removed; that is, if it is not a leaf node.

 To remove multiple nodes from the DOM, use the `System.Xml.XmlNode.RemoveAll*` method to remove all the children and attributes, if applicable, of the current node.

 If you are working with an `System.Xml.XmlNamedNodeMap`, you can remove a node using the `System.Xml.XmlNamedNodeMap.RemoveNamedItem*` method.

 To remove attributes, see Removing Attributes from an Element Node in the DOM.

## See also

- XML Document Object Model (DOM)
