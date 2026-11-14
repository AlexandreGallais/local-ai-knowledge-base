---
title: "AssemblyDescriptionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyDescriptionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyDescriptionAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyDescriptionAttribute : Attribute
```

Provides a text description for an assembly.

#### Remarks
When you create a project in Microsoft Visual Studio 2005, this attribute is automatically applied with an empty string value. You can set its value in Visual Studio 2005 by selecting the **Properties** for the project from the **File** menu, and then by clicking **Assembly Information**. The attribute is saved in the AssemblyInfo file in your project, and it must be removed before you can specify it in code; otherwise, you will get an error that the attribute cannot be applied multiple times.

When you right-click the assembly file in File Explorer, this attribute appears as the **Comments** value on the **Version** tab of the file properties dialog box.

#### Examples
The following code example sets the `AssemblyDescriptionAttribute` for a simple assembly and indicates whether or not it was defined.

_Code sample not included: ~/snippets/csharp/System.Reflection/AssemblyDescriptionAttribute/Overview/DescrAttr.cs._

## AssemblyDescriptionAttribute.AssemblyDescriptionAttribute(String) constructor

```csharp
public AssemblyDescriptionAttribute (string description);
```

Initializes a new instance of the `AssemblyDescriptionAttribute` class.

Parameters:

- `description`: The assembly description.

To be added.

## AssemblyDescriptionAttribute.Description property

```csharp
public string Description { get; }
```

Gets assembly description information.

Returns: A string containing the assembly description.

To be added.
