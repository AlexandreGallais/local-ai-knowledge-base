---
title: "AssemblyTitleAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyTitleAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyTitleAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyTitleAttribute : Attribute
```

Specifies a description for an assembly.

#### Remarks
The assembly title is a friendly name, which can include spaces.

On Windows, the information specified for this attribute appears on the **Details** tab of the **Windows File Properties** dialog box for the assembly. The property name is **File description**.

#### Examples
The following example shows how to add attributes, including the `AssemblyTitleAttribute` attribute, to a dynamic assembly. The example saves the assembly to disk, and the attribute value can be viewed by using the **Windows File Properties** dialog box.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyCompanyAttribute/Overview/assemblybuilder_defineversioninforesource.cs._

## AssemblyTitleAttribute.AssemblyTitleAttribute(String) constructor

```csharp
public AssemblyTitleAttribute (string title);
```

Initializes a new instance of the `AssemblyTitleAttribute` class.

Parameters:

- `title`: The assembly title.

#### Remarks

On Windows, the string specified for the `title` parameter appears on the **Details** tab of the **Windows File Properties** dialog box for the assembly.

## AssemblyTitleAttribute.Title property

```csharp
public string Title { get; }
```

Gets assembly title information.

Returns: The assembly title.

#### Remarks

On Windows, the value of the `Title` property appears on the **Details** tab of the **Windows File Properties** dialog box for the assembly.
