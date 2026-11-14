---
title: "Type Support in the System.Xml Classes"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/type-support-in-the-system-xml-classes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type Support in the System.Xml Classes

In .NET Framework version 2.0, the core XML classes have been enhanced to include type support features. The `System.Xml.XmlReader`, `System.Xml.XmlWriter`, and `System.Xml.XPath.XPathNavigator` classes include type support features including the ability to convert between XML Schema types and common language runtime (CLR) types.

 In .NET Framework version 2.0, the `System.Xml.XmlReader`, `System.Xml.XmlWriter`, and `System.Xml.XPath.XPathNavigator` classes have been enhanced to include type support features.

- The `System.Xml.XmlReader` and `System.Xml.XPath.XPathNavigator` classes each include a **SchemaInfo** property that returns the schema information on a node.

- The **ReadContentAs** and **ReadElementContentAs** and methods on the `System.Xml.XmlReader` class read a text value and convert it to a CLR value in a single method call.

- The `System.Xml.XmlWriter.WriteValue*` method on the `System.Xml.XmlWriter` class converts a CLR type to an XML Schema type when writing out XML.

- The **ValueAs** and `System.Xml.XPath.XPathNavigator.TypedValue` properties on the `System.Xml.XPath.XPathNavigator` class return a node value and convert it to a CLR value in a single method call.

> **Note:**
> In the .NET Framework version 1.0 the `System.Xml.XmlConvert` class was needed to convert between XML Schema and CLR types.

## In This Section

 Mapping XML Data Types to CLR Types
 Describes the default mappings of XML data types to CLR types.

 XML Type Support Implementation Notes
 Discusses some of the type support implementation details.

 Conversion of XML Data Types
 Describes how to use the `System.Xml.XmlConvert` class to convert between XML Schema and CLR types.

## Related Sections

 Accessing Strongly Typed XML Data Using XPathNavigator
