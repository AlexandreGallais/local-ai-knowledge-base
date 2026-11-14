---
title: "Modifying Nodes, Content, and Values in an XML Document"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/modifying-nodes-content-and-values-in-an-xml-document.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Modifying Nodes, Content, and Values in an XML Document

There are many ways you can modify the nodes and content in a document. You can:

- Change the value of nodes using the `System.Xml.XmlNode.Value` property.

- Modify an entire set of nodes by replacing the nodes with new nodes. This is done using the `System.Xml.XmlNode.InnerXml` property.

- Replace existing nodes with new nodes using the `System.Xml.XmlNode.RemoveChild*` method.

- Add additional characters to nodes that inherit from the `System.Xml.XmlCharacterData` class using the `System.Xml.XmlCharacterData.AppendData*`, `System.Xml.XmlCharacterData.InsertData*`, or `System.Xml.XmlCharacterData.ReplaceData*` methods.

- Modify the content by removing a range of characters using the `System.Xml.XmlCharacterData.DeleteData*` method on node types that inherit from `System.Xml.XmlCharacterData`.

 A simple technique for changing the value of a node is to use `node.Value = "new value";`. The following table lists the node types that this single line of code works on and exactly what data for that node type is changed.

|Node type|Data changed|
|---------------|------------------|
|Attribute|The value of the attribute.|
|CDATASection|The content of the CDATASection.|
|Comment|The content of the comment.|
|ProcessingInstruction|The content, excluding the target.|
|Text|The content of the text.|
|XmlDeclaration|The content of the declaration, excluding the `<?xml` and `?>` markup.|
|Whitespace|The value of the white space. You can set the value to be one of the four recognized XML white space characters: space, tab, CR, or LF.|
|SignificantWhitespace|The value of the significant white space. You can set the value to be one of the four recognized XML white space characters: space, tab, CR, or LF.|

 Any node type not listed in the table is not a valid node type to set a value on. Setting a value on any other node type throws an `System.InvalidOperationException`.

 The `System.Xml.XmlNode.InnerXml` property changes the markup of the child nodes for the current node. Setting this property replaces the child nodes with the parsed contents of the given string. The parsing is done in the current namespace context. In addition, `System.Xml.XmlNode.InnerXml*` removes redundant namespace declarations. As a result, numerous cut and paste operations do not increase the size of your document with redundant namespace declarations. For a code example showing the effect of namespaces on the `System.Xml.XmlNode.InnerXml*` operation, see the `System.Xml.XmlDocument.InnerXml` property.

 When using the `System.Xml.XmlCharacterData.ReplaceData*` and `System.Xml.XmlNode.RemoveChild*` methods, the methods return the replaced or removed node. This node can then be reinserted somewhere else in the XML Document Object Model (DOM). The `System.Xml.XmlCharacterData.ReplaceData*` method does two validation checks on the node being inserted into the document. The first check ensures that the node is becoming a child of a node that can have child nodes of its type. The second check ensures that the node being inserted is not an ancestor of the node it is becoming a child of. Violating either of these conditions throws an `System.InvalidOperationException`.

 It is valid to add or remove a read-only child from a node that can be edited. However, attempts to modify the read-only node itself throws an `System.InvalidOperationException`. An example of this is modifying the children of an `System.Xml.XmlEntityReference` node. The children are read-only and cannot be modified. Any attempt to modify them throws an `System.InvalidOperationException`.

## See also

- XML Document Object Model (DOM)
