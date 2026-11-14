---
title: "ComCompatibleVersionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComCompatibleVersionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComCompatibleVersionAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComCompatibleVersionAttribute : Attribute
```

Indicates to a COM client that all classes in the current version of an assembly are compatible with classes in an earlier version of the assembly.

#### Remarks
You can apply this attribute to assemblies.

By default, the Tlbexp.exe (Type Library Exporter) uses an assembly's version number to calculate class identifiers (CLSIDs). All public, COM-visible classes receive new CLSIDs each time you export a new assembly version.

You can apply the `ComCompatibleVersionAttribute` attribute to force all CLSIDs for classes in the current version of an assembly to be the same as CLSIDs for classes in an earlier version of the assembly. As long as the CLSIDs remain the same, a legacy COM application can use the later version of a compatible assembly after you uninstall the original assembly. If you apply the `GuidAttribute` to a class to explicitly set its CLSID, the `ComCompatibleVersionAttribute` has no effect.

The properties of this attribute combine to form the four parts of an assembly version. Always specify the lowest version that the current assembly is backward compatible with so that version is used to calculate all CLSIDs in the assembly.

#### Examples
The following example shows how to specify assembly version 1.0.0.0 in an assembly with a higher version number. Regardless of the new assembly version, all CLSIDs in the assembly are generated using version 1.0.0.0 instead of using the current assembly version.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComCompatibleVersionAttribute/Overview/source.cs._

## ComCompatibleVersionAttribute.ComCompatibleVersionAttribute(Int32, Int32, Int32, Int32) constructor

```csharp
public ComCompatibleVersionAttribute (int major, int minor, int build, int revision);
```

Initializes a new instance of the `ComCompatibleVersionAttribute` class with the major version, minor version, build, and revision numbers of the assembly.

Parameters:

- `major`: The major version number of the assembly.
- `minor`: The minor version number of the assembly.
- `build`: The build number of the assembly.
- `revision`: The revision number of the assembly.

To be added.

## ComCompatibleVersionAttribute.BuildNumber property

```csharp
public int BuildNumber { get; }
```

Gets the build number of the assembly.

Returns: The build number of the assembly.

To be added.

## ComCompatibleVersionAttribute.MajorVersion property

```csharp
public int MajorVersion { get; }
```

Gets the major version number of the assembly.

Returns: The major version number of the assembly.

To be added.

## ComCompatibleVersionAttribute.MinorVersion property

```csharp
public int MinorVersion { get; }
```

Gets the minor version number of the assembly.

Returns: The minor version number of the assembly.

To be added.

## ComCompatibleVersionAttribute.RevisionNumber property

```csharp
public int RevisionNumber { get; }
```

Gets the revision number of the assembly.

Returns: The revision number of the assembly.

To be added.
