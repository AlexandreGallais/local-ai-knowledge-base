---
title: "Modify XML Data using XPathNavigator (part 2 of 7)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/modify-xml-data-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Modify XML Data using XPathNavigator (part 2 of 7)

## Modifying Nodes

 A simple technique for changing the value of a node is to use the `System.Xml.XPath.XPathNavigator.SetValue*` and `System.Xml.XPath.XPathNavigator.SetTypedValue*` methods of the `System.Xml.XPath.XPathNavigator` class.

 The following table lists the effects of these methods on different node types.

|`System.Xml.XPath.XPathNodeType`|Data Changed|
|---------------------------------------------------------------------------------------------------------------------------------------------|------------------|
|`System.Xml.XPath.XPathNodeType.Root`|Not supported.|
|`System.Xml.XPath.XPathNodeType.Element`|The content of the element.|
|`System.Xml.XPath.XPathNodeType.Attribute`|The value of the attribute.|
|`System.Xml.XPath.XPathNodeType.Text`|The text content.|
|`System.Xml.XPath.XPathNodeType.ProcessingInstruction`|The content, excluding the target.|
|`System.Xml.XPath.XPathNodeType.Comment`|The content of the comment.|
|`System.Xml.XPath.XPathNodeType.Namespace`|Not Supported.|

> **Note:**
> Editing `System.Xml.XPath.XPathNodeType.Namespace` nodes or the `System.Xml.XPath.XPathNodeType.Root` node is not supported.

 The `System.Xml.XPath.XPathNavigator` class also provides a set of methods used to insert and remove nodes. For more information about inserting and removing nodes from an XML document, see the Insert XML Data using XPathNavigator and Remove XML Data using XPathNavigator topics.
