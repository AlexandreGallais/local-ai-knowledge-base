---
title: "TypeLibVersionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibVersionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibVersionAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeLibVersionAttribute : Attribute
```

Specifies the version number of an exported type library.

#### Remarks
You can apply this attribute to assemblies.

By default, the Tlbexp.exe (Type Library Exporter) generates a type library version from the first two numbers of an assembly version. For example, Tlb.exe exports assembly version 1.2.5000.0 as a type library version 1.2, eliminating the build and revision numbers of the assembly. If this behavior is undesirable, you can control the generation of the type library number explicitly by applying the `TypeLibVersionAttribute`.

It is useful to control the generation of a type library version explicitly when two assembly versions produce the same type library version. For example, assembly version 1.2.0.0 and assembly version 1.2.500.0 both produce a type library version of 1.2, which can cause problems when you uninstall one of the assemblies. To differentiate the type library versions, you can force the second assembly (version 1.2.500.0) to produce a type library version of 1.25.

#### Examples
The following example shows how to apply the `TypeLibVersionAttribute` to explicitly set the type library version to 1.25.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/TypeLibVersionAttribute/Overview/source.cs._

## TypeLibVersionAttribute.TypeLibVersionAttribute(Int32, Int32) constructor

```csharp
public TypeLibVersionAttribute (int major, int minor);
```

Initializes a new instance of the `TypeLibVersionAttribute` class with the major and minor version numbers of the type library.

Parameters:

- `major`: The major version number of the type library.
- `minor`: The minor version number of the type library.

To be added.

## TypeLibVersionAttribute.MajorVersion property

```csharp
public int MajorVersion { get; }
```

Gets the major version number of the type library.

Returns: The major version number of the type library.

To be added.

## TypeLibVersionAttribute.MinorVersion property

```csharp
public int MinorVersion { get; }
```

Gets the minor version number of the type library.

Returns: The minor version number of the type library.

To be added.
