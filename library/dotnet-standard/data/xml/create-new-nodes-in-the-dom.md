---
title: "Create New Nodes in the DOM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/create-new-nodes-in-the-dom.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Create New Nodes in the DOM

The `System.Xml.XmlDocument` class has a create method for all of the node types. To create a node, supply the method with a name, when required, and content or other parameters for those nodes that have content (for example, a text node). The following methods need a name and a few other parameters filled to create an appropriate node:

- `System.Xml.XmlDocument.CreateCDataSection*`

- `System.Xml.XmlDocument.CreateComment*`

- `System.Xml.XmlDocument.CreateDocumentFragment*`

- `System.Xml.XmlDocument.CreateDocumentType*`

- `System.Xml.XmlDocument.CreateElement*`

- `System.Xml.XmlDocument.CreateNode*`

- `System.Xml.XmlDocument.CreateProcessingInstruction*`

- `System.Xml.XmlDocument.CreateSignificantWhitespace*`

- `System.Xml.XmlDocument.CreateTextNode*`

- `System.Xml.XmlDocument.CreateWhitespace*`

- `System.Xml.XmlDocument.CreateXmlDeclaration*`

 Other node types have more requirements than just providing data to parameters.

 For information on attributes, see Creating New Attributes for Elements in the DOM. For information on element and attribute name validation, see XML Element and Attribute Name Verification when Creating New Nodes. For creating entity references, see Creating New Entity References. For information on how namespaces affect the expansion of entity references, see Namespace Affect on Entity Reference Expansion for New Nodes Containing Elements and Attributes.

 Once new nodes are created, there are several methods available to insert them into the tree. The table lists the methods with a description of where the new node appears in the XML Document Object Model (DOM).

|Method|Node placement|
|------------|--------------------|
|`System.Xml.XmlNode.InsertBefore*`|Inserted before the reference node. For example, to insert the new node in position 5: `XmlNode refChild = node.ChildNodes[4]; // The reference is zero-based.``node.InsertBefore(newChild, refChild);` For more information, see the `System.Xml.XmlNode.InsertBefore*` method.|
|`System.Xml.XmlNode.InsertAfter*`|Inserted after the reference node. For example: `node.InsertAfter(newChild, refChild);` For more information, see the `System.Xml.XmlNode.InsertAfter*` method.|
|`System.Xml.XmlNode.AppendChild*`|Adds the node to the end of the list of child nodes for the given node. If the node being added is an `System.Xml.XmlDocumentFragment`, the entire contents of the document fragment are moved into the child list of this node. For more information, see the `System.Xml.XmlNode.AppendChild*` method.|
|`System.Xml.XmlNode.PrependChild*`|Adds the node to the beginning of the list of child nodes of the given node. If the node being added is an `System.Xml.XmlDocumentFragment`, the entire contents of the document fragment are moved into the child list of this node. For more information, see the `System.Xml.XmlNode.PrependChild*` method.|
|`System.Xml.XmlAttributeCollection.Append*`|Appends an `System.Xml.XmlAttribute` node to the end of the attribute collection associated with an element. For more information, see the `System.Xml.XmlAttributeCollection.Append*` method.|

## See also

- XML Document Object Model (DOM)
