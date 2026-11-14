---
title: "ScopelessEnumAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ScopelessEnumAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ScopelessEnumAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class ScopelessEnumAttribute : Attribute
```

Indicates that a native enumeration is not qualified by the enumeration type name. This class cannot be inherited.

#### Remarks
The C++ compiler applies the `ScopelessEnumAttribute` attribute to native enumeration types to indicate that they do not need to be qualified by the enumeration type name when referenced in C++ programs. This attribute distinguishes native enumeration types from managed enumeration types.

## ScopelessEnumAttribute.ScopelessEnumAttribute() constructor

```csharp
public ScopelessEnumAttribute ();
```

Initializes a new instance of the `ScopelessEnumAttribute` class.

To be added.
