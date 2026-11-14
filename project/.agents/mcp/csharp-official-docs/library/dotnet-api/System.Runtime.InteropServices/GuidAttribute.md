---
title: "GuidAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/GuidAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GuidAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class GuidAttribute : Attribute
```

Supplies an explicit `Guid` when an automatic GUID is undesirable.

#### Remarks
You can apply this attribute to assemblies, interfaces, classes, enumerations, structures, or delegates, although the Tlbimp.exe (Type Library Importer) can apply it for you when it imports a type library.

The string passed to the attribute must be in a format that is an acceptable constructor argument for the type `Guid`. To avoid conflicts with the type `Guid`, use the long name `GuidAttribute` explicitly. Only use an explicit GUID when a type must have a specific GUID. If the attribute is omitted, a GUID is assigned automatically.

#### Examples
The following example demonstrates how to apply the `GuidAttribute` to a class that is exported to COM with a fixed GUID.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/GuidAttribute/Overview/source.cs._

## GuidAttribute.GuidAttribute(String) constructor

```csharp
public GuidAttribute (string guid);
```

Initializes a new instance of the `GuidAttribute` class with the specified GUID.

Parameters:

- `guid`: The `Guid` to be assigned.

To be added.

## GuidAttribute.Value property

```csharp
public string Value { get; }
```

Gets the `Guid` of the class.

Returns: The `Guid` of the class.

To be added.
