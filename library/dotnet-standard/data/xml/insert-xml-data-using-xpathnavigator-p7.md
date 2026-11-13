---
title: "Insert XML Data using XPathNavigator (part 7 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Insert XML Data using XPathNavigator (part 7 of 20)

### Inserting Child Nodes

 The `System.Xml.XPath.XPathNavigator` class provides the following methods to insert child nodes.

- `System.Xml.XPath.XPathNavigator.AppendChild*`

- `System.Xml.XPath.XPathNavigator.PrependChild*`

- `System.Xml.XPath.XPathNavigator.AppendChildElement*`

- `System.Xml.XPath.XPathNavigator.PrependChildElement*`

 These methods append and prepend child nodes to the end of and the beginning of the list of child nodes of the node an `System.Xml.XPath.XPathNavigator` object is currently positioned on.

 Like the methods in the "Inserting Sibling Nodes" section, the `System.Xml.XPath.XPathNavigator.AppendChild*` and `System.Xml.XPath.XPathNavigator.PrependChild*` methods accept a `string`, `System.Xml.XmlReader` object, or `System.Xml.XPath.XPathNavigator` object containing the child node to add as parameters. Both methods also return an `System.Xml.XmlWriter` object used to insert child nodes.

 Also like the methods in the "Inserting Sibling Nodes" section, the `System.Xml.XPath.XPathNavigator.AppendChildElement*` and `System.Xml.XPath.XPathNavigator.PrependChildElement*` methods insert a single child node to the end of and the beginning of the list of child nodes of the node an `System.Xml.XPath.XPathNavigator` object is currently positioned on using the namespace prefix, local name, namespace URI, and value specified as parameters.
