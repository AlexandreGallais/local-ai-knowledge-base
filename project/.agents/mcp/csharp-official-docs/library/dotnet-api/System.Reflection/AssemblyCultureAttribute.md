---
title: "AssemblyCultureAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyCultureAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyCultureAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyCultureAttribute : Attribute
```

Specifies which culture the assembly supports.

#### Remarks
The attribute is used by compilers to distinguish between a main assembly and a satellite assembly. A main assembly contains code and the neutral culture's resources. A satellite assembly contains only resources for a particular culture, as in `[assembly:AssemblyCultureAttribute("de")]`. Putting this attribute on an assembly and using something other than the empty string ("") for the culture name will make this assembly look like a satellite assembly, rather than a main assembly that contains executable code. Labeling a traditional code library with this attribute will break it, because no other code will be able to find the library's entry points at runtime.

For more information, see the Common Language Infrastructure (CLI) documentation, especially "Partition II: Metadata Definition and Semantics".

## AssemblyCultureAttribute.AssemblyCultureAttribute(String) constructor

```csharp
public AssemblyCultureAttribute (string culture);
```

Initializes a new instance of the `AssemblyCultureAttribute` class with the culture supported by the assembly being attributed.

Parameters:

- `culture`: The culture supported by the attributed assembly.

#### Remarks
The culture names follow the RFC1766 names. The format is as follows: "language"-"country/region". For example, the format for US English is "en-US".

## AssemblyCultureAttribute.Culture property

```csharp
public string Culture { get; }
```

Gets the supported culture of the attributed assembly.

Returns: A string containing the name of the supported culture.

To be added.
