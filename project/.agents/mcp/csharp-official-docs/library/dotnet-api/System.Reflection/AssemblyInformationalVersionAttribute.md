---
title: "AssemblyInformationalVersionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyInformationalVersionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyInformationalVersionAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyInformationalVersionAttribute : Attribute
```

Defines additional version information for an assembly manifest.

#### Remarks

> **Note:**
> Starting with the .NET 8 SDK, commit information is included in this attribute's value. This behavior applies to projects that target any .NET version. For more information, see Source Link included in the .NET SDK.

The attribute defined by this class attaches additional version information to an assembly.

If the `AssemblyInformationalVersionAttribute` is not applied to an assembly, the version number specified by the `AssemblyVersionAttribute` attribute is used instead.

Although you can specify any text, a warning message appears on compilation if the string is not in the format used by the assembly version number, or if it is in that format but contains wildcard characters. This warning is harmless.

For Windows Forms apps, you can obtain the string this attribute specifies at run time by using the `ProductVersion` property. The string is also used in the path and registry key <example-value> by the `UserAppDataPath` property and the `UserAppDataRegistry` property.

## AssemblyInformationalVersionAttribute.AssemblyInformationalVersionAttribute(String) constructor

```csharp
public AssemblyInformationalVersionAttribute (string informationalVersion);
```

Initializes a new instance of the `AssemblyInformationalVersionAttribute` class.

Parameters:

- `informationalVersion`: The assembly version information.

#### Remarks

The informational version provides additional version information for an assembly, in string format. It is for informational purposes only and is not used at run time. Although you can specify any text, a warning message appears on compilation if the string is not in the format used by the assembly version number, or if it is in that format but contains wildcard characters. This warning is harmless.

## AssemblyInformationalVersionAttribute.InformationalVersion property

```csharp
public string InformationalVersion { get; }
```

Gets version information.

Returns: A string containing the version information.

To be added.
