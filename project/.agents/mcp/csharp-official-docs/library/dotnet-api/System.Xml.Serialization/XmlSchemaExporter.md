---
title: "XmlSchemaExporter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSchemaExporter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSchemaExporter class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlSchemaExporter
```

Populates `XmlSchema` objects with XML schema element declarations that are found in type mapping objects.

#### Remarks
The `XmlSchemaExporter` class provides a programmatic representation of an XML Schema Definition language (XSD) document. Instead of using `XmlSchemaExporter` directly, use the `ServiceDescriptionReflector` class or the XML Schema Definition Tool (Xsd.exe).

The `ServiceDescriptionReflector` class creates `ServiceDescription` objects from classes that are identified as Web services. It uses the `XmlSchemaExporter` class when a Web service class specifies:

- Literal use, indicating that the contents of SOAP message parameters and return values (or request and response documents) are literally specified with XML schema definitions.

- Non-SOAP implementations of Web services using the HTTP-GET and HTTP-POST operations.

Xsd.exe generates XML schema documents from one or more types in a run-time assembly file using the `XmlSchemaExporter` class and reflection.

## XmlSchemaExporter.XmlSchemaExporter(XmlSchemas) constructor

```csharp
public XmlSchemaExporter (System.Xml.Serialization.XmlSchemas schemas);
```

Initializes a new instance of the `XmlSchemaExporter` class.

Parameters:

- `schemas`: A collection of `XmlSchema` objects to which element declarations obtained from type mappings are added.

#### Remarks
The `XmlSchemaExporter` class supplies the collection of `XmlSchema` objects to which XML schema element declarations are to be added. You do not need to create an instance of the `XmlSchemaExporter` class directly.

## XmlSchemaExporter.ExportAnyType(String) method

```csharp
public string ExportAnyType (string? ns);
```

Exports an `<any>` element to the `XmlSchema` object that is identified by the specified namespace.

Parameters:

- `ns`: The namespace of the XML schema document to which to add an `<any>` element.

Returns: An arbitrary name assigned to the `<any>` element declaration.

#### Remarks
You do not need to call the method directly.

The `ServiceDescriptionReflector` creates `ServiceDescription` objects from classes that are identified as Web services.

A field or property of type `XmlElement`, with an attribute `XmlAnyElementAttribute`, is translated into an **\<any>** element.

## XmlSchemaExporter.ExportAnyType(XmlMembersMapping) method

```csharp
public string? ExportAnyType (System.Xml.Serialization.XmlMembersMapping members);
```

Adds an element declaration for an object or type to a SOAP message or to an `XmlSchema` object.

Parameters:

- `members`: An `XmlMembersMapping` that contains mappings to export.

Returns: The string "any" with an appended integer.

To be added.

## XmlSchemaExporter.ExportMembersMapping(XmlMembersMapping) method

```csharp
public void ExportMembersMapping (System.Xml.Serialization.XmlMembersMapping xmlMembersMapping);
```

Adds an element declaration to the applicable `XmlSchema` for each of the element parts of a literal SOAP message definition.

Parameters:

- `xmlMembersMapping`: The internal .NET type mappings for the element parts of a Web Services Description Language (WSDL) message definition.

#### Remarks
For each SOAP message part, the `XmlSchemaExporter.ExportMembersMapping` method adds an XML schema element declaration to the `XmlSchema` that uses the same namespace as the part. A literal message definition normally contains a single part.

Use the `ServiceDescriptionReflector` class instead.

## XmlSchemaExporter.ExportMembersMapping(XmlMembersMapping, Boolean) method

```csharp
public void ExportMembersMapping (System.Xml.Serialization.XmlMembersMapping xmlMembersMapping, bool exportEnclosingType);
```

Adds an element declaration to the applicable `XmlSchema` for each of the element parts of a literal SOAP message definition, and specifies whether enclosing elements are included.

Parameters:

- `xmlMembersMapping`: The internal mapping between a .NET type and an XML schema element.
- `exportEnclosingType`: `true` if the schema elements that enclose the schema are to be included; otherwise, `false`.

To be added.

## XmlSchemaExporter.ExportTypeMapping(XmlMembersMapping) method

```csharp
public System.Xml.XmlQualifiedName? ExportTypeMapping (System.Xml.Serialization.XmlMembersMapping xmlMembersMapping);
```

Adds an element declaration to the applicable `XmlSchema` object for a single element part of a literal SOAP message definition.

Parameters:

- `xmlMembersMapping`: Internal .NET type mappings for the element parts of a Web Services Description Language (WSDL) message definition.

Returns: An `XmlQualifiedName` that represents the qualified XML name of the exported element declaration.

#### Remarks
This overload adds an XML schema element declaration to the `XmlSchema` that uses the same namespace as the SOAP message part. The literal message definition must contain a single part.

Use the `ServiceDescriptionReflector` class instead.

## XmlSchemaExporter.ExportTypeMapping(XmlTypeMapping) method

```csharp
public void ExportTypeMapping (System.Xml.Serialization.XmlTypeMapping xmlTypeMapping);
```

Adds an element declaration for a .NET type to the applicable `XmlSchema` object.

Parameters:

- `xmlTypeMapping`: The internal mapping between a .NET type and an XML schema element.

To be added.
