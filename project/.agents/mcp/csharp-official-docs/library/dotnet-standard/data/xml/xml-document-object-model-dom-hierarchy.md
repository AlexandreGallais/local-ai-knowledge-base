---
title: "XML Document Object Model (DOM) Hierarchy"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xml-document-object-model-dom-hierarchy.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XML Document Object Model (DOM) Hierarchy

The following illustration shows the class hierarchy for the XML Document Object Model (DOM), with the World Wide Web Consortium (W3C) name in parenthesis along with the class name where it is relevant.

XML Document Object Model (DOM) hierarchy

 The following classes do not inherit from the **XmlNode**:

- **XmlImplementation**

- **XmlNamedNodeMap**

- **XmlNodeList**

- **XmlNodeChangedEventArgs**

 The **XmlImplementation** class is used to create an XML document. For more information, see XML Document Creation.

 The **XmlNamedNodeMap** class handles an unordered set of nodes. For more information, see Unordered Node Retrieval by Name or Index.

 The **XmlNodeList** class handles an ordered list of nodes. For more information, see Ordered Node Retrieval by Index.

 The **XmlNodeChangedEventArgs** class handles event handlers registered on the **XmlDocument**. For more information, see Event Handling in an XML Document using the XmlNodeChangedEventArgs.

 The **XmlLinkedNode** class inherits from **XmlNode**. Its purpose is to override two methods from **XmlNode**: the **PreviousSibling** and **NextSibling** methods. These overridden methods are then inherited and used by **XmlCharacterData**, **XmlDeclaration**, **XmlDocumentType**, **XmlElement**, **XmlEntityReference**, and **XmlProcessingInstruction**, which are classes that have previous and next siblings.

## See also

- XML Document Object Model (DOM)
