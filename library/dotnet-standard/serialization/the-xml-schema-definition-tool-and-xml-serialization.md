---
title: "The XML Schema Definition Tool and XML Serialization"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/the-xml-schema-definition-tool-and-xml-serialization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The XML Schema Definition Tool and XML Serialization

The XML Schema Definition tool (XML Schema Definition Tool (Xsd.exe)) is installed along with the .NET Framework tools as part of the Windows&reg; Software Development Kit (SDK). The tool is designed primarily for two purposes:

- To generate either C# or Visual Basic class files that conform to a specific XML Schema definition language (XSD) schema. The tool takes an XML Schema as an argument and outputs a file that contains a number of classes that, when serialized with the `System.Xml.Serialization.XmlSerializer`, conform to the schema. For information about how to use the tool to generate classes that conform to a specific schema, see How to: Use the XML Schema Definition Tool to Generate Classes and XML Schema Documents.

- To generate an XML Schema document from a .dll file or .exe file. To see the schema of a set of files that you have either created or one that has been modified with attributes, pass the DLL or EXE as an argument to the tool to generate the XML schema. For information about how to use the tool to generate an XML Schema Document from a set of classes, see How to: Use the XML Schema Definition Tool to Generate Classes and XML Schema Documents.

For more information about using the tool, see XML Schema Definition Tool (Xsd.exe).

## See also

- `System.Data.DataSet`
- Introducing XML Serialization
- XML Schema Definition Tool (Xsd.exe)
- `System.Xml.Serialization.XmlSerializer`
- How to: Serialize an Object
- How to: Deserialize an Object
- How to: Use the XML Schema Definition Tool to Generate Classes and XML Schema Documents
- XML Schema Binding Support
