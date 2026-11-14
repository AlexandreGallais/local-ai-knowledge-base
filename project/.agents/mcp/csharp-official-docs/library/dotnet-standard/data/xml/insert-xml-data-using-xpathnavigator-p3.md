---
title: "Insert XML Data using XPathNavigator (part 3 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Insert XML Data using XPathNavigator (part 3 of 20)

### Inserting Sibling Nodes

 The `System.Xml.XPath.XPathNavigator` class provides the following methods to insert sibling nodes.

- `System.Xml.XPath.XPathNavigator.InsertAfter*`

- `System.Xml.XPath.XPathNavigator.InsertBefore*`

- `System.Xml.XPath.XPathNavigator.InsertElementAfter*`

- `System.Xml.XPath.XPathNavigator.InsertElementBefore*`

 These methods insert sibling nodes before and after the node an `System.Xml.XPath.XPathNavigator` object is currently positioned on.

 The `System.Xml.XPath.XPathNavigator.InsertAfter*` and `System.Xml.XPath.XPathNavigator.InsertBefore*` methods are overloaded and accept a `string`, `System.Xml.XmlReader` object, or `System.Xml.XPath.XPathNavigator` object containing the sibling node to add as parameters. Both methods also return an `System.Xml.XmlWriter` object used to insert sibling nodes.

 The `System.Xml.XPath.XPathNavigator.InsertElementAfter*` and `System.Xml.XPath.XPathNavigator.InsertElementBefore*` methods insert a single sibling node before and after the node an `System.Xml.XPath.XPathNavigator` object is currently positioned on using the namespace prefix, local name, namespace URI, and value specified as parameters.
