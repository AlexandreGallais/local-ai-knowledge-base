---
title: "AssemblyCopyrightAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyCopyrightAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyCopyrightAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyCopyrightAttribute : Attribute
```

Defines a copyright custom attribute for an assembly manifest.

#### Examples
The following example shows how to apply attributes, including the `AssemblyCopyrightAttribute` attribute, to a dynamic assembly. The example saves the assembly to disk, and the attribute value can be viewed by using the **Windows File Properties** dialog.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyCompanyAttribute/Overview/assemblybuilder_defineversioninforesource.cs._

## AssemblyCopyrightAttribute.AssemblyCopyrightAttribute(String) constructor

```csharp
public AssemblyCopyrightAttribute (string copyright);
```

Initializes a new instance of the `AssemblyCopyrightAttribute` class.

Parameters:

- `copyright`: The copyright information.

To be added.

## AssemblyCopyrightAttribute.Copyright property

```csharp
public string Copyright { get; }
```

Gets copyright information.

Returns: A string containing the copyright information.

To be added.
