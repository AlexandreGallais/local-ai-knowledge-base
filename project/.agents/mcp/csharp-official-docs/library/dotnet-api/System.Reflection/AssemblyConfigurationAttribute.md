---
title: "AssemblyConfigurationAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyConfigurationAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyConfigurationAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyConfigurationAttribute : Attribute
```

Specifies the build configuration, such as retail or debug, for an assembly.

#### Remarks
In integrated build environments such as Microsoft Visual Studio, build configuration information is usually determined by the development environment settings for the project.

## AssemblyConfigurationAttribute.AssemblyConfigurationAttribute(String) constructor

```csharp
public AssemblyConfigurationAttribute (string configuration);
```

Initializes a new instance of the `AssemblyConfigurationAttribute` class.

Parameters:

- `configuration`: The assembly configuration.

To be added.

## AssemblyConfigurationAttribute.Configuration property

```csharp
public string Configuration { get; }
```

Gets assembly configuration information.

Returns: A string containing the assembly configuration information.

To be added.
