---
title: "XML Schema (XSD) Validation with XmlSchemaSet"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xml-schema-xsd-validation-with-xmlschemaset.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XML schema (XSD) validation with XmlSchemaSet

XML documents can be validated against an XML schema definition language (XSD) schema in an `System.Xml.Schema.XmlSchemaSet`.

## Validate XML documents

 XML documents are validated by the `System.Xml.XmlReader.Create*` method of the `System.Xml.XmlReader` class. To validate an XML document, construct an `System.Xml.XmlReaderSettings` object that contains an XML schema definition language (XSD) schema with which to validate the XML document.

> **Note:**
> The `System.Xml.Schema` namespace contains extension methods that make it easy to validate an XML tree against an XSD file when using LINQ to XML (C#) and LINQ to XML (Visual Basic). For more information on validating XML documents with LINQ to XML, see How to validate using XSD (LINQ to XML) (C#) and How to: Validate Using XSD (LINQ to XML) (Visual Basic).

 An individual schema or a set of schemas (as an `System.Xml.Schema.XmlSchemaSet`) can be added to an `System.Xml.Schema.XmlSchemaSet` by passing either one as a parameter to the `System.Xml.Schema.XmlSchemaSet.Add*` method of `System.Xml.Schema.XmlSchemaSet`. When validating a document the target namespace of the document must match the target namespace of the schema in the schema set.

 The following is an example XML document.

 [!code-xmlXSDInference Examples #5]

 The following is the schema that validates the example XML document.

 [!code-xmlXSDInference Examples #6]

 In the code example that follows, the schema above is added to the `System.Xml.XmlReaderSettings.Schemas` property of the `System.Xml.XmlReaderSettings` object. The `System.Xml.XmlReaderSettings` object is passed as a parameter to the `System.Xml.XmlReader.Create*` method of the `System.Xml.XmlReader` object, which validates the XML document above.

 The `System.Xml.XmlReaderSettings.ValidationType` property of the `System.Xml.XmlReaderSettings` object is set to `Schema` to enforce validation of the XML document by the `System.Xml.XmlReader.Create*` method of the `System.Xml.XmlReader` object. A `System.Xml.Schema.ValidationEventHandler` is added to the `System.Xml.XmlReaderSettings` object to handle any `System.Xml.Schema.XmlSeverityType.Warning` or `System.Xml.Schema.XmlSeverityType.Error` events raised by errors found during the validation process of both the XML document and the schema.
 [!code-csharpXmlSchemaSetOverall Example #1]
 [!code-vbXmlSchemaSetOverall Example #1]

## See also

- XmlSchemaSet for Schema Compilation
- Working with XML Schemas
