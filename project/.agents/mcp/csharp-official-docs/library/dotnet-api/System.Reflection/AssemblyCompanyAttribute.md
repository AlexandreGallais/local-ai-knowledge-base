---
title: "AssemblyCompanyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyCompanyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyCompanyAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyCompanyAttribute : Attribute
```

Defines a company name custom attribute for an assembly manifest.

#### Examples
The following example shows how to apply attributes, including the `AssemblyCompanyAttribute` attribute, to a dynamic assembly. The example saves the assembly to disk, and the attribute value can be viewed by using the **Windows File Properties** dialog.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyCompanyAttribute/Overview/assemblybuilder_defineversioninforesource.cs._

## AssemblyCompanyAttribute.AssemblyCompanyAttribute(String) constructor

```csharp
public AssemblyCompanyAttribute (string company);
```

Initializes a new instance of the `AssemblyCompanyAttribute` class.

Parameters:

- `company`: The company name information.

To be added.

## AssemblyCompanyAttribute.Company property

```csharp
public string Company { get; }
```

Gets company name information.

Returns: A string containing the company name.

To be added.
