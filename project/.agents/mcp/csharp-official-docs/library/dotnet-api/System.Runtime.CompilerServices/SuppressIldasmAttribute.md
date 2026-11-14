---
title: "SuppressIldasmAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/SuppressIldasmAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SuppressIldasmAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class SuppressIldasmAttribute : Attribute
```

Prevents the Ildasm.exe (IL Disassembler) from disassembling an assembly. This class cannot be inherited.

To be added.

## SuppressIldasmAttribute.SuppressIldasmAttribute() constructor

```csharp
public SuppressIldasmAttribute ();
```

Initializes a new instance of the `SuppressIldasmAttribute` class.

#### Remarks
Apply the `SuppressIldasmAttribute` attribute to an assembly or module to prevent the assembly or module from being disassembled using the Ildasm.exe (IL Disassembler).

#### Examples
The following code example demonstrates how to apply the `SuppressIldasmAttribute` attribute to an assembly.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/SuppressIldasmAttribute/Overview/sample.cs._
