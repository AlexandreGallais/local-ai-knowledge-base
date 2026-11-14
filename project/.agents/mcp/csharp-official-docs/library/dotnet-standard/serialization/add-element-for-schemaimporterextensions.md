---
title: "<add> Element for <schemaImporterExtensions>"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/add-element-for-schemaimporterextensions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# `<add>` Element for `<schemaImporterExtensions>`

Adds types used by the `System.Xml.Serialization.XmlSchemaImporter` for mapping XSD types to .NET types. For more information about configuration files, see Configuration File Schema.

\<configuration>
\<system.xml.serialization>
\<schemaImporterExtensions>
\<add>

## Syntax

```xml
<add name = "<example-value>" type="<example-value>"/>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

|Attribute|Description|
|---------------|-----------------|
|**name**|A simple name that is used to find the instance.|
|**type**|Required. Specifies the schema  extension class to add. The **type** attribute value must be on one line, and include the fully qualified type name. When the assembly is placed in the Global Assembly Cache (GAC), it must also include the version, culture, and public key token of the signed assembly.|

### Child Elements

 None.

### Parent Elements

|Element|Description|
|-------------|-----------------|
|\<schemaImporterExtensions>|Contains the types that are used by the `System.Xml.Serialization.XmlSchemaImporter`.|

## Example

 The following code example adds an extension type that the XmlSchemaImporter can use when mapping types.

```xml
<configuration>
  <system.xml.serialization>
    <schemaImporterExtensions>
       <add name="contoso" type="System.Web.Mobile.MobileCapabilities,
       System.Web.Mobile, Version=2.0.0.0, Culture=neutral,
       PublicKeyToken=<example-value>" />
    </schemaImporterExtensions>
  </system.xml.serialization>
</configuration>
```

## See also

- `System.Xml.Serialization.XmlSchemaImporter`
- `<system.xml.serialization>` Element
- `<schemaImporterExtensions>` Element
