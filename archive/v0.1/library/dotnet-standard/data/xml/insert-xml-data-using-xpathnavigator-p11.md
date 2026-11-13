---
title: "Insert XML Data using XPathNavigator (part 11 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Insert XML Data using XPathNavigator (part 11 of 20)

### Inserting Attribute Nodes

 The `System.Xml.XPath.XPathNavigator` class provides the following methods to insert attribute nodes.

- `System.Xml.XPath.XPathNavigator.CreateAttribute*`

- `System.Xml.XPath.XPathNavigator.CreateAttributes*`

 These methods insert attribute nodes on the element node an `System.Xml.XPath.XPathNavigator` object is currently positioned on. The `System.Xml.XPath.XPathNavigator.CreateAttribute*` method creates an attribute node on the element node an `System.Xml.XPath.XPathNavigator` object is currently positioned on using the namespace prefix, local name, namespace URI, and value specified as parameters. The `System.Xml.XPath.XPathNavigator.CreateAttributes*` method returns an `System.Xml.XmlWriter` object used to insert attribute nodes.
