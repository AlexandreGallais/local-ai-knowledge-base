---
title: "ComConversionLossAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComConversionLossAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComConversionLossAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComConversionLossAttribute : Attribute
```

Indicates that information was lost about a class or interface when it was imported from a type library to an assembly.

#### Remarks
The Tlbimp.exe (Type Library Importer) applies this attribute to classes or interfaces.

Methods that use `void` pointer arguments cause this attribute to be applied to the containing class or interface.

## ComConversionLossAttribute.ComConversionLossAttribute() constructor

```csharp
public ComConversionLossAttribute ();
```

Initializes a new instance of the `ComConversionLossAttribute` class.

To be added.
