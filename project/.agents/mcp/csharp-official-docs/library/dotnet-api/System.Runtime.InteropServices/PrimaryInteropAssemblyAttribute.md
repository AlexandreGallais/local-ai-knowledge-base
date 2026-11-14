---
title: "PrimaryInteropAssemblyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/PrimaryInteropAssemblyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PrimaryInteropAssemblyAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class PrimaryInteropAssemblyAttribute : Attribute
```

Indicates that the attributed assembly is a primary interop assembly.

#### Remarks
You can apply this attribute to assemblies, although the Tlbimp.exe (Type Library Importer) typically applies it for you when it imports a type library.

An interop assembly contains metadata that describes existing COM types, which are often already described in a COM type library. Tlbimp.exe produces interop assemblies from COM type libraries. Interop assemblies typically only contain metadata (no code). Primary interop assemblies are provided by the same publisher as the type library they describe, and provide the official definitions of the types defined with that type library. Primary interop assemblies are always signed by their publisher to ensure uniqueness.

You can generate a primary interop assembly from a type library in the following ways:

- Run TlbImp.exe with the `/primary` option from the command line.

- Apply the `PrimaryInteropAssemblyAttribute` at design time.

To specify a primary interop assembly in managed source code, you must apply the `GuidAttribute` and `PrimaryInteropAssemblyAttribute` to the assembly at design time. The `GuidAttribute` on the primary interop assembly identifies the LIBID of the type library and the `PrimaryInteropAssemblyAttribute` identifies the version of the particular type library for which this assembly is the primary interop assembly. The `PrimaryInteropAssemblyAttribute` can appear multiple times if the assembly is the primary interop assembly for multiple versions of the same type library.

When using the types defined in a type library, always reference the primary interop assembly for that type library, rather than reimporting or redefining the types themselves.

## PrimaryInteropAssemblyAttribute.PrimaryInteropAssemblyAttribute(Int32, Int32) constructor

```csharp
public PrimaryInteropAssemblyAttribute (int major, int minor);
```

Initializes a new instance of the `PrimaryInteropAssemblyAttribute` class with the major and minor version numbers of the type library for which this assembly is the primary interop assembly.

Parameters:

- `major`: The major version of the type library for which this assembly is the primary interop assembly.
- `minor`: The minor version of the type library for which this assembly is the primary interop assembly.

#### Remarks
The `PrimaryInteropAssemblyAttribute` can appear multiple times if the assembly is the primary interop assembly for multiple versions of the same type library.

## PrimaryInteropAssemblyAttribute.MajorVersion property

```csharp
public int MajorVersion { get; }
```

Gets the major version number of the type library for which this assembly is the primary interop assembly.

Returns: The major version number of the type library for which this assembly is the primary interop assembly.

To be added.

## PrimaryInteropAssemblyAttribute.MinorVersion property

```csharp
public int MinorVersion { get; }
```

Gets the minor version number of the type library for which this assembly is the primary interop assembly.

Returns: The minor version number of the type library for which this assembly is the primary interop assembly.

To be added.
