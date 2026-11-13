---
title: "<dateTimeSerialization> Element"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/datetimeserialization-element.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `<dateTimeSerialization>` Element

Determines the serialization mode of `System.DateTime` objects.

 `<configuration>`
`<dateTimeSerialization>`

## Syntax

```xml
<dateTimeSerialization
    mode = "Roundtrip|Local"
/>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

|Attributes|Description|
|----------------|-----------------|
|`mode`|Optional. Specifies the serialization mode. Set to one of the `System.Xml.Serialization.Configuration.DateTimeSerializationSection.DateTimeSerializationMode` values. The default is **RoundTrip**.|

### Child Elements

 None.

### Parent Elements

|Element|Description|
|-------------|-----------------|
|system.xml.serialization|The top-level element for controlling XML serialization.|

## Remarks

When this property is set to **Local**, `System.DateTime` objects are always formatted as the local time. That is, local time zone information is always included with the serialized data.

When this property is set to **Roundtrip**, `System.DateTime` objects are examined to determine whether they are in the local, UTC, or an unspecified time zone. The `System.DateTime` objects are then serialized in such a way that this information is preserved. This is the default behavior and is the recommended behavior for all new applications that do not communicate with older versions of the framework.

## See also

- `System.DateTime`
- `System.Xml.Serialization.XmlSchemaImporter`
- `System.Xml.Serialization.Configuration.DateTimeSerializationSection.DateTimeSerializationMode`
- Configuration File Schema
- `<schemaImporterExtensions>` Element
- `<add>` Element for `<schemaImporterExtensions>`
- `<system.xml.serialization>` Element
