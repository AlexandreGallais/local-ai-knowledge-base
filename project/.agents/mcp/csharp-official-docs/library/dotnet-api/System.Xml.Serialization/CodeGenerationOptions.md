---
title: "CodeGenerationOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/CodeGenerationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CodeGenerationOptions enum

Namespace: `System.Xml.Serialization`

```csharp
public enum CodeGenerationOptions
```

Specifies various options to use when generating .NET types for use with an XML Web Service.

A Web Service Description Language (WSDL) file typically describes a class in XML schema language as an `xsd:complex` type composed of various primitive `xsd:complex` and `xsd:simple` types. When generating a .NET class that represents a given `xsd:complex` type, you must choose how to represent the various primitive types it contains.

By default, each primitive is implemented as a field. If you specify the `GenerateProperties` option, each primitive type is instead implemented as a property.

#### Ordering of serialization code

The `GenerateOrder` member instructs the code generator to create the serialization code in a specific order as determined by the `Order` property of the following attributes:

- `XmlAnyElementAttribute`
- `XmlArrayAttribute`
- `XmlElementAttribute`

> **Note:**
> Once the `Order` property has been set on one public property or field in a type, it must be applied to all public properties and fields for that type and all inherited types.

## CodeGenerationOptions.EnableDataBinding field

```csharp
EnableDataBinding
```

Enables data binding.

## CodeGenerationOptions.GenerateNewAsync field

```csharp
GenerateNewAsync
```

Creates events for the asynchronous invocation of Web methods.

## CodeGenerationOptions.GenerateOldAsync field

```csharp
GenerateOldAsync
```

Creates Begin and End methods for the asynchronous invocation of Web methods.

## CodeGenerationOptions.GenerateOrder field

```csharp
GenerateOrder
```

Generates explicitly ordered serialization code as specified through the `Order` property of the `XmlAnyElementAttribute`, `XmlArrayAttribute`, and `XmlElementAttribute` attributes.

## CodeGenerationOptions.GenerateProperties field

```csharp
GenerateProperties
```

Represents primitive types by properties.

## CodeGenerationOptions.None field

```csharp
None
```

Represents primitive types by fields and primitive types by `System` namespace types.
