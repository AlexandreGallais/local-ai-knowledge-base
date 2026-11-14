---
title: "AssemblyFileVersionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyFileVersionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyFileVersionAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyFileVersionAttribute : Attribute
```

Instructs a compiler to use a specific version number for the Win32 file version resource. The Win32 file version is not required to be the same as the assembly's version number.

#### Remarks
If the `AssemblyFileVersionAttribute` is not supplied, the `AssemblyVersionAttribute` is used for the Win32 file version that is displayed on the **Version** tab of the Windows file properties dialog.

## AssemblyFileVersionAttribute.AssemblyFileVersionAttribute(String) constructor

```csharp
public AssemblyFileVersionAttribute (string version);
```

Initializes a new instance of the `AssemblyFileVersionAttribute` class, specifying the file version.

Parameters:

- `version`: The file version.

Exceptions:

- `ArgumentNullException`: `version` is `null`.

#### Remarks
The file version is normally a string of four numbers, separated by periods, reflecting the major version number, minor version number, build number, and revision number; for example, "1.0.4309.00". If `version` is not in this format, a compiler warning occurs, and the results displayed in the file properties dialog are unpredictable. Wildcards are not supported.

## AssemblyFileVersionAttribute.Version property

```csharp
public string Version { get; }
```

Gets the Win32 file version resource name.

Returns: A string containing the file version resource name.

To be added.
