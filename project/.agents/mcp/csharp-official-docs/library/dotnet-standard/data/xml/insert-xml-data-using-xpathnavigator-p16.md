---
title: "Insert XML Data using XPathNavigator (part 16 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Insert XML Data using XPathNavigator (part 16 of 20)

### Inserting Untyped Values

 The `System.Xml.XPath.XPathNavigator.SetValue*` method simply inserts the untyped `string` value passed as a parameter as the value of the node the `System.Xml.XPath.XPathNavigator` object is currently positioned on. The value is inserted without any type or without verifying that the new value is valid according to the type of the node if schema information is available.
