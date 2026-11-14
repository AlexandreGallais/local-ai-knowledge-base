---
title: "Working with XML Schemas"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/working-with-xml-schemas.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Working with XML Schemas

To define the structure of an XML document, as well as its element relationships, data types, and content constraints, you use a document type definition (DTD) or XML Schema definition language (XSD) schema. Although an XML document is considered to be well-formed if it meets all the syntactical requirements defined by the World Wide Web Consortium (W3C) Extensible Markup Language (XML) 1.0 Recommendation, it is not considered valid unless it is both well-formed and conforms to the constraints defined by its DTD or schema. Therefore, although all valid XML documents are well-formed, not all well-formed XML documents are valid.

 For more information about XML, see the W3C XML 1.0 Recommendation. For more information about XML Schema, see the W3C XML Schema Part 1: Structures Recommendation and the W3C XML Schema Part 2: Datatypes Recommendation recommendations.

## In This Section

 XML Schema Object Model (SOM)
 Discusses the Schema Object Model (SOM) in the `System.Xml.Schema` namespace that provides a set of classes that allows you to read a Schema definition language (XSD) schema from a file or programmatically create a schema in-memory.

 XmlSchemaSet for Schema Compilation
 Discusses the `System.Xml.Schema.XmlSchemaSet` class that is a cache where XSD schemas can be stored and validated.

 XmlSchemaValidator Push-Based Validation
 Discusses the `System.Xml.Schema.XmlSchemaValidator` class that provides an efficient, high-performance mechanism to validate XML data against XSD schemas in a push-based manner.

 Inferring an XML Schema
 Discusses how to use the `System.Xml.Schema.XmlSchemaInference` class to infer an XSD schema from the structure of an XML document.

## Reference

 `System.Xml.Schema.XmlSchemaSet` &#124; `System.Xml.Schema.XmlSchemaInference` &#124; `System.Xml.XmlReader`

## Related Sections

 Validating an XML Document in the DOM
 Discusses how to validate the XML in the Document Object Model (DOM). You can validate the XML as it is loaded into the DOM, or validate a previously unvalidated XML document in the DOM.

 Schema Validation using XPathNavigator
 Discusses how to validate XML being navigated and edited using the `System.Xml.XPath.XPathNavigator` class.
