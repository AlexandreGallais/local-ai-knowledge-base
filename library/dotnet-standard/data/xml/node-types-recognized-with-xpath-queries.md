---
title: "Node Types Recognized with XPath Queries"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/node-types-recognized-with-xpath-queries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Node Types Recognized with XPath Queries

The types of nodes recognized in an XPath query are not the same node types found in the Document Object Model (DOM).

## W3C XPath Node Types

 The types of nodes recognized in an XPath query are not the types of nodes found in the Document Object Model (DOM). The following are the XPath node types represented by the `System.Xml.XPath.XPathNodeType` enumeration.

- `System.Xml.XPath.XPathNodeType.All`

- `System.Xml.XPath.XPathNodeType.Attribute`

- `System.Xml.XPath.XPathNodeType.Comment`

- `System.Xml.XPath.XPathNodeType.Element`

- `System.Xml.XPath.XPathNodeType.Namespace`

- `System.Xml.XPath.XPathNodeType.ProcessingInstruction`

- `System.Xml.XPath.XPathNodeType.Root`

- `System.Xml.XPath.XPathNodeType.SignificantWhitespace`

- `System.Xml.XPath.XPathNodeType.Text`

- `System.Xml.XPath.XPathNodeType.Whitespace`

 These node types are based on the XPath data model, where the nodes are derived from the XML Information Set. The `System.Xml.XPath.XPathNodeType.SignificantWhitespace` and `System.Xml.XPath.XPathNodeType.Whitespace` node types are Microsoft .NET Framework extensions to the base node types described in the XPath data model.

 The attribute node type is used differently in the XPath data model than it is in the DOM. In the XPath data model, the element node has a set of attribute nodes related to it and the element node is the parent of each attribute node. However, in the DOM, the element node is the owner and not the parent. In both models, attribute and namespace nodes are not considered child nodes of the element node.

 The namespace node type is an addition to the XPath data model and is not a recognized DOM node type.

 For more information about navigating element, attribute, and namespace nodes, see the Node Set Navigation Using XPathNavigator and Attribute and Namespace Node Navigation Using XPathNavigator topics.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Select XML Data Using XPathNavigator
- Evaluate XPath Expressions using XPathNavigator
- Matching Nodes using XPathNavigator
- XPath Queries and Namespaces
- Compiled XPath Expressions
