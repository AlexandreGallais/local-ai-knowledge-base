---
title: "<system.xml.serialization> Element"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-xml-serialization-element.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# `<system.xml.serialization>` Element

The top-level element for controlling XML serialization. For more information about configuration files, see Configuration File Schema.

\<configuration>\
\<system.xml.serialization>

## Syntax

```xml
<system.xml.serialization>
</system.xml.serialization>
```

## Attributes and Elements

The following sections describe attributes, child elements, and parent elements.

### Attributes

None.

### Child Elements

|Element|Description|
|-------------|-----------------|
|\<dateTimeSerialization> Element|Determines the serialization mode of `System.DateTime` objects.|
|\<schemaImporterExtensions> Element|Contains types that are used by the `System.Xml.Serialization.XmlSchemaImporter` for mapping of XSD types to .NET types.|

### Parent Elements

|Element|Description|
|-------------|-----------------|
|\<configuration> Element|The root element in every configuration file that is used by the common language runtime and .NET Framework applications.|

## Example

The following code example illustrates how to specify the serialization mode of a `System.DateTime` object, and the addition of types used by the `System.Xml.Serialization.XmlSchemaImporter` when mapping XSD types to .NET types.

```xml
<system.xml.serialization>
    <xmlSerializer checkDeserializeAdvances="false" />
    <dateTimeSerialization mode = "Local" />
    <schemaImporterExtensions>
        <add
        name = "MobileCapabilities"
        type = "System.Web.Mobile.MobileCapabilities,
        System.Web.Mobile, Version=2.0.0.0, Culture=neutral,
        PublicKeyToken=<example-value>" />
    </schemaImporterExtensions>
</system.xml.serialization>
```

## See also

- `System.Xml.Serialization.XmlSchemaImporter`
- `System.Xml.Serialization.Configuration.DateTimeSerializationSection.DateTimeSerializationMode`
- Configuration File Schema
- `<dateTimeSerialization>` Element
- `<schemaImporterExtensions>` Element
- `<add>` Element for `<schemaImporterExtensions>`
