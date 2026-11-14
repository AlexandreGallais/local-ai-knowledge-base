---
title: "Schema Validation using XPathNavigator (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/schema-validation-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Schema Validation using XPathNavigator

Using the `System.Xml.XmlDocument` class, you can validate the XML content contained in an `System.Xml.XmlDocument` object in two ways. The first way is to validate the XML content using a validating `System.Xml.XmlReader` object and the second way is to use the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class. You can also perform read-only validation of XML content using the `System.Xml.XPath.XPathDocument` class.
