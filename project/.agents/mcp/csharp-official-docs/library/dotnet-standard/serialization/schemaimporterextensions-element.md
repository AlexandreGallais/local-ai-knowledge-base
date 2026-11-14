---
title: "<schemaImporterExtensions> Element"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/schemaimporterextensions-element.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# `<schemaImporterExtensions>` element

Contains types that are used by the `System.Xml.Serialization.XmlSchemaImporter` for mapping of XSD types to .NET types. For more information about configuration files, see Configuration File Schema.

## Syntax

```xml
<schemaImporterExtensions>
    <!-- Add types -->
</schemaImporterExtensions>
```

## Child Elements

|Element|Description|
|-------------|-----------------|
|\<add> Element for `<schemaImporterExtensions>`|Adds types that are used by the `System.Xml.Serialization.XmlSchemaImporter` to create mappings.|

## Parent Elements

|Element|Description|
|-------------|-----------------|
|\<system.xml.serialization> Element|The top-level element for controlling XML serialization.|

## Example

 The following code example illustrates how to add types that are used by the `System.Xml.Serialization.XmlSchemaImporter` when mapping XSD types to .NET types.

```xml
<system.xml.serialization>
    <schemaImporterExtensions>
        <add name = "MobileCapabilities" type =
        "System.Web.Mobile.MobileCapabilities,
        System.Web.Mobile, Version - 2.0.0.0, Culture = neutral,
        PublicKeyToken = <example-value>" />
    </schemaImporterExtensions>
</system.xml.serialization>
```

## See also

- `System.Xml.Serialization.XmlSchemaImporter`
- `System.Xml.Serialization.Configuration.DateTimeSerializationSection.DateTimeSerializationMode`
- Configuration File Schema
- `<dateTimeSerialization>` Element
- `<add>` Element for `<schemaImporterExtensions>`
- `<system.xml.serialization>` Element
