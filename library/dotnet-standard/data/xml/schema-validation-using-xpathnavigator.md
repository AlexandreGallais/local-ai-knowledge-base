---
title: "Schema Validation using XPathNavigator (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/schema-validation-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Schema Validation using XPathNavigator

Using the `System.Xml.XmlDocument` class, you can validate the XML content contained in an `System.Xml.XmlDocument` object in two ways. The first way is to validate the XML content using a validating `System.Xml.XmlReader` object and the second way is to use the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class. You can also perform read-only validation of XML content using the `System.Xml.XPath.XPathDocument` class.
