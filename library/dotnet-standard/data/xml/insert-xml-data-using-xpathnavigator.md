---
title: "Insert XML Data using XPathNavigator (part 1 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Insert XML data using XPathNavigator

The `System.Xml.XPath.XPathNavigator` class provides a set of methods used to insert sibling, child, and attribute nodes in an XML document. In order to use these methods, the `System.Xml.XPath.XPathNavigator` object must be editable, that is, its `System.Xml.XPath.XPathNavigator.CanEdit` property must be `true`.

 `System.Xml.XPath.XPathNavigator` objects that can edit an XML document are created by the `System.Xml.XmlDocument.CreateNavigator*` method of the `System.Xml.XmlDocument` class. `System.Xml.XPath.XPathNavigator` objects created by the `System.Xml.XPath.XPathDocument` class are read-only and any attempt to use the editing methods of an `System.Xml.XPath.XPathNavigator` object created by an `System.Xml.XPath.XPathDocument` object results in a `System.NotSupportedException`.

 For more information about creating editable `System.Xml.XPath.XPathNavigator` objects, see Reading XML Data using XPathDocument and XmlDocument.
