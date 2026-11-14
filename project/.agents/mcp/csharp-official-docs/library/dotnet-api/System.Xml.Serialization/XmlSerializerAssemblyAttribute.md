---
title: "XmlSerializerAssemblyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializerAssemblyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializerAssemblyAttribute class

Namespace: `System.Xml.Serialization`

```csharp
public sealed class XmlSerializerAssemblyAttribute : Attribute
```

Applied to a Web service client proxy, enables you to specify an assembly that contains custom-made serializers.

To be added.

## XmlSerializerAssemblyAttribute.XmlSerializerAssemblyAttribute() constructor

```csharp
public XmlSerializerAssemblyAttribute ();
```

Initializes a new instance of the `XmlSerializerAssemblyAttribute` class.

To be added.

## XmlSerializerAssemblyAttribute.XmlSerializerAssemblyAttribute(String) constructor

```csharp
public XmlSerializerAssemblyAttribute (string? assemblyName);
```

Initializes a new instance of the `XmlSerializerAssemblyAttribute` class with the specified assembly name.

Parameters:

- `assemblyName`: The simple, unencrypted name of the assembly.

To be added.

## XmlSerializerAssemblyAttribute.XmlSerializerAssemblyAttribute(String, String) constructor

```csharp
public XmlSerializerAssemblyAttribute (string? assemblyName, string? codeBase);
```

Initializes a new instance of the `XmlSerializerAssemblyAttribute` class with the specified assembly name and location of the assembly.

Parameters:

- `assemblyName`: The simple, unencrypted name of the assembly.
- `codeBase`: A string that is the URL location of the assembly.

To be added.

## XmlSerializerAssemblyAttribute.AssemblyName property

```csharp
public string? AssemblyName { get; set; }
```

Gets or sets the name of the assembly that contains serializers for a specific set of types.

Returns: The simple, unencrypted name of the assembly.

To be added.

## XmlSerializerAssemblyAttribute.CodeBase property

```csharp
public string? CodeBase { get; set; }
```

Gets or sets the location of the assembly that contains the serializers.

Returns: A location, such as a path or URI, that points to the assembly.

To be added.
