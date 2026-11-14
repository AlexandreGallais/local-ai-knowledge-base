---
title: "Types of XML Nodes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/types-of-xml-nodes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Types of XML Nodes

When an XML document is read into memory as a tree of nodes, the node types for the nodes are decided when the nodes are created. The XML Document Object Model (DOM) has several kinds of node types, determined by the World Wide Web Consortium (W3C) and listed in section 1.1.1 The DOM Structure Model. The following table lists the node types, the object assigned to that node type, and a short description of each.

|DOM node type|Object|Description|
|-------------------|------------|-----------------|
|Document|`System.Xml.XmlDocument`|The container of all the nodes in the tree. It is also known as the document root, which is not always the same as the root element.|
|DocumentFragment|`System.Xml.XmlDocumentFragment`|A temporary bag containing one or more nodes without any tree structure.|
|DocumentType|`System.Xml.XmlDocumentType`|Represents the `<!DOCTYPE…>` node.|
|EntityReference|`System.Xml.XmlEntityReference`|Represents the non-expanded entity reference text.|
|Element|`System.Xml.XmlElement`|Represents an element node.|
|Attr|`System.Xml.XmlAttribute`|Is an attribute of an element.|
|ProcessingInstruction|`System.Xml.XmlProcessingInstruction`|Is a processing instruction node.|
|Comment|`System.Xml.XmlComment`|A comment node.|
|Text|`System.Xml.XmlText`|Text belonging to an element or attribute.|
|CDATASection|`System.Xml.XmlCDataSection`|Represents CDATA.|
|Entity|`System.Xml.XmlEntity`|Represents the `<!ENTITY…>` declarations in an XML document, either from an internal document type definition (DTD) subset or from external DTDs and parameter entities.|
|Notation|`System.Xml.XmlNotation`|Represents a notation declared in the DTD.|

 Even though an attribute (*attr*) is listed in the W3C DOM Level 1 section 1.2 Fundamental Interfaces as a node, it is not considered a child of any element node.

 The following table shows additional node types not defined by the W3C, however they are available for use in the Microsoft .NET Framework object model as **XmlNodeType** enumerations. Therefore, there is no matching DOM node type column for these node types.

|Node type|Description|
|---------------|-----------------|
|`System.Xml.XmlDeclaration`|Represents the declaration node `<?xml version="1.0"…>`.|
|`System.Xml.XmlSignificantWhitespace`|Represents significant white space, which is white space in mixed content.|
|`System.Xml.XmlWhitespace`|Represents the white space in the content of an element.|
|EndElement|Returned when **XmlReader** gets to the end of an element. Example XML: **\</item>** For more information, see `System.Xml.XmlNodeType`.|
|EndEntity|Returned when **XmlReader** gets to the end of the entity replacement as a result of a call to `System.Xml.XmlReader.ResolveEntity*`. For more information, see `System.Xml.XmlNodeType`.|

 To view a code example that reads in XML and uses a case construct on the node types to print information about the node and its contents, see `System.Xml.XmlSignificantWhitespace.NodeType*`.

 For more information on the object hierarchy of the node types and their equivalent object name, see XML Document Object Model (DOM) Hierarchy. For more information on the objects created in the node tree, see Mapping the Object Hierarchy to XML Data.

## See also

- XML Document Object Model (DOM)
