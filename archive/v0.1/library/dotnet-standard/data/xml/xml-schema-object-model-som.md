---
title: "XML Schema Object Model (SOM)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xml-schema-object-model-som.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XML Schema Object Model (SOM)

An XML schema is a powerful and complex tool for creating and validating structure in compliant XML documents. Similar to data modeling in a relational database, a schema provides a way to define the structure of XML documents, by specifying the elements that can be used in the documents, as well as the structure and types that these elements must follow in order to be valid for that specific schema.

 The Schema Object Model (SOM) provides a set of classes in the `System.Xml.Schema` namespace that allow you to read a schema from a file or to programmatically create a schema in-memory. The schema can then be traversed, editing, compiled, validated, or written to a file.

## In This Section

 XML Schema Object Model Overview
 Describes the Schema Object Model (SOM) and the features and classes it provides.

 Reading and Writing XML Schemas
 Describes how to read and write XML schemas from files or other sources.

 Building XML Schemas
 Describes how to use the classes in the `System.Xml.Schema` namespace to build XML schemas in-memory.

 Traversing XML Schemas
 Describes how to traverse an XML schema to access the elements, attributes, and types stored in the SOM.

 Editing XML Schemas
 Describes how to edit an XML schema.

 Including or Importing XML Schemas
 Describes how to include or import other XML schemas to supplement the structure of the schema that includes or imports them.
