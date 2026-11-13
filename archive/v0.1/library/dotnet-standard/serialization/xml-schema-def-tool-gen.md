---
title: "How to: Use the XML Schema Definition Tool to Generate Classes and XML Schema Documents"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/xml-schema-def-tool-gen.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Use the XML Schema Definition Tool to Generate Classes and XML Schema Documents

The XML Schema Definition tool (Xsd.exe) allows you to generate an XML schema that describes a class or to generate the class defined by an XML schema. The following procedures show how to perform these operations.

The XML Schema Definition tool (Xsd.exe) usually can be found in the following path:\
_C:\\Program Files (x86)\\Microsoft SDKs\\Windows\\{version}\\bin\\NETFX {version} Tools\\_

## To generate classes that conform to a specific schema

1. Open a command prompt.

2. Pass the XML Schema as an argument to the XML Schema Definition tool, which creates a set of classes that are precisely matched to the XML Schema, for example:

    ```console
    xsd mySchema.xsd /classes
    ```  

    (The `/classes` option in this command is used to generate classes for the `mySchema` schema.)
    The tool can only process schemas that reference the World Wide Web Consortium XML specification of March 16, 2001. In other words, the XML Schema namespace must be `"http://www.w3.org/2001/XMLSchema"`, as shown in the following example.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>  
    <xs:schema attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="" xmlns:xs="http://www.w3.org/2001/XMLSchema" />  
    ```  

3. Modify the classes with methods, properties, or fields, as necessary. For more information about modifying a class with attributes, see Controlling XML Serialization Using Attributes and Attributes That Control Encoded SOAP Serialization.

 It is often useful to examine the schema of the XML stream that is generated when instances of a class (or classes) are serialized. For example, you might publish your schema for others to use, or you might compare it to a schema with which you are trying to achieve conformity.

## To generate an XML Schema document from a set of classes

1. Compile the class or classes into a DLL.

2. Open a command prompt.

3. Pass the DLL as an argument to Xsd.exe, for example:

    ```console
    xsd MyFile.dll  
    ```  

     The schema (or schemas) will be written, beginning with the name "schema0.xsd".

## See also

- `System.Data.DataSet`
- The XML Schema Definition Tool and XML Serialization
- Introducing XML Serialization
- XML Schema Definition Tool (Xsd.exe)
- `System.Xml.Serialization.XmlSerializer`
- How to: Serialize an Object
- How to: Deserialize an Object
