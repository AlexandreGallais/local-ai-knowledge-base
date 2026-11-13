---
title: "XML Schema Object Model Overview"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xml-schema-object-model-overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XML Schema Object Model Overview

The Schema Object Model (SOM) in the Microsoft .NET Framework is a rich API that allows you to create, edit, and validate schemas programmatically. The SOM operates on XML schema documents similarly to the way the Document Object Model (DOM) operates on XML documents. XML schema documents are valid XML files that, once loaded into the SOM, convey meaning about the structure and validity of other XML documents which conform to the schema.

 A schema is an XML document that defines a class of XML documents by specifying the structure or model of XML documents for a particular schema. A schema identifies the constraints on the content of the XML documents, and describes the vocabulary (rules or grammar) that compliant XML documents must follow in order to be considered schema-valid with that particular schema. Validation of an XML document is the process that ensures that the document conforms to the grammar specified by the schema.

 The following are ways the SOM API in the .NET Framework enables you to create, edit, and validate schemas.

- Load and save valid schemas to and from files.

- Create in-memory schemas using strongly typed classes.

- Interact with the `System.Xml.Schema.XmlSchemaSet` class to cache, compile, and retrieve schemas.

- Interact with the `System.Xml.XmlReader.Create*` method of the `System.Xml.XmlReader` class to validate XML instance documents against schemas.

- Build editors for creating and maintaining schemas.

- Dynamically edit a schema that can be complied and saved for use in the validation of XML instance documents.

## The Schema Object Model

 The SOM consists of an extensive set of classes in the `System.Xml.Schema` namespace corresponding to the elements in an XML schema. For example, the `<xsd:schema>...</xsd:schema>` element maps to the `System.Xml.Schema.XmlSchema` class, and all the information that can be contained within an `<xsd:schema/>` element can be represented using the `System.Xml.Schema.XmlSchema` class. Similarly, the `<xsd:element>...</xsd:element>` and `<xsd:attribute>...</xsd:attribute>` elements map to the `System.Xml.Schema.XmlSchemaElement` and `System.Xml.Schema.XmlSchemaAttribute` classes respectively. This mapping continues for all the elements of an XML schema creating an XML schema object model in the `System.Xml.Schema` namespace illustrated in the diagram that follows.

 For more information about each class in the `System.Xml.Schema` namespace, see the `System.Xml.Schema` namespace reference documentation in the .NET Framework class library.

## See also

- Reading and Writing XML Schemas
- Building XML Schemas
- Traversing XML Schemas
- Editing XML Schemas
- Including or Importing XML Schemas
- XmlSchemaSet for Schema Compilation
- Post-Schema Compilation Infoset
