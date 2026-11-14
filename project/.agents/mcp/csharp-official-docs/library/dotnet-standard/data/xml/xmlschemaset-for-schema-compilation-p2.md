---
title: "XmlSchemaSet for Schema Compilation (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/xmlschemaset-for-schema-compilation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# XmlSchemaSet for Schema Compilation (part 2 of 2)

## Validating XML Documents

 XML documents can be validated against schemas in an `System.Xml.Schema.XmlSchemaSet`. You validate an XML document by adding a schema to the `System.Xml.Schema.XmlSchemaSet``System.Xml.XmlReaderSettings.Schemas` property of an `System.Xml.XmlReaderSettings` object, or by adding an `System.Xml.Schema.XmlSchemaSet` to the `System.Xml.XmlReaderSettings.Schemas` property of an `System.Xml.XmlReaderSettings` object. The `System.Xml.XmlReaderSettings` object is then used by the `System.Xml.XmlReader.Create*` method of the `System.Xml.XmlReader` class to create an `System.Xml.XmlReader` object and validate the XML document.

 For more information about validating XML documents using an `System.Xml.Schema.XmlSchemaSet`, see XML Schema (XSD) Validation with XmlSchemaSet.

## See also

- `System.Xml.Schema.XmlSchemaSet.Add*`
- `System.Xml.Schema.XmlSchemaSet.Schemas*`
- `System.Xml.Schema.XmlSchemaSet.Contains*`
- `System.Xml.Schema.XmlSchemaSet.Compile*`
- `System.Xml.Schema.XmlSchemaSet.Reprocess*`
- `System.Xml.Schema.XmlSchemaSet.Remove*`
- `System.Xml.Schema.XmlSchemaSet.RemoveRecursive*`
- XmlSchemaSet as a Schema Cache
- XML Schema (XSD) Validation with XmlSchemaSet
