---
title: "XmlMappingAccess enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlMappingAccess.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlMappingAccess enum

Namespace: `System.Xml.Serialization`

```csharp
public enum XmlMappingAccess
```

Specifies whether a mapping is read, write, or both.

#### Remarks
This enumeration is used by the `XmlSchemaImporter.ImportMembersMapping` when generating code for serialization and deserialization methods. The value specifies whether the schema importer generates write methods for mappings with write access, and read methods for mappings with read access. This minimizes the generation of serialization code.

## XmlMappingAccess.None field

```csharp
None
```

Both read and write methods are generated.

## XmlMappingAccess.Read field

```csharp
Read
```

Read methods are generated.

## XmlMappingAccess.Write field

```csharp
Write
```

Write methods are generated.
