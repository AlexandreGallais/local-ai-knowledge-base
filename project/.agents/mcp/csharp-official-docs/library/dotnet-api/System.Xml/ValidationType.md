---
title: "ValidationType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/ValidationType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidationType enum

Namespace: `System.Xml`

```csharp
public enum ValidationType
```

Specifies the type of validation to perform.

#### Remarks
The `XmlReader` class can enforce validation using a schema or document type definition (DTD). The `ValidationType` enumeration specifies the type of validation the created `XmlReader` instance should perform. The `XmlReader` instance can be either a validating `XmlReader` object created by the `XmlReader.Create` method, or an `XmlValidatingReader` object.

The validation model has three characteristics, strict, informative, and status. Strict, does not allow the mixing of validation types, informative provides a warning if the schema or document type definition (DTD) cannot be found, and status provides warnings if validation cannot be performed for elements and attributes from schemas.

## ValidationType.Auto field

```csharp
Auto
```

Validates if DTD or schema information is found.

## ValidationType.DTD field

```csharp
DTD
```

Validates according to the DTD.

## ValidationType.None field

```csharp
None
```

No validation is performed, and no validation errors are thrown. This setting creates an XML 1.0 compliant non-validating parser.

Calls to `XmlReader.ResolveEntity` report default attributes and resolve general entities. The DOCTYPE is not used for validation purposes.

## ValidationType.Schema field

```csharp
Schema
```

Validate according to XML Schema definition language (XSD) schemas, including inline XML Schemas. XML Schemas are associated with namespace URIs either by using the `schemaLocation` attribute or the provided `Schemas` property.

## ValidationType.XDR field

```csharp
XDR
```

Validate according to XML-Data Reduced (XDR) schemas, including inline XDR schemas. XDR schemas are recognized using the `x-schema` namespace prefix or the `XmlValidatingReader.Schemas` property.
