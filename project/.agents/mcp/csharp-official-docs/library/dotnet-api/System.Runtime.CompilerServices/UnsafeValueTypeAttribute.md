---
title: "UnsafeValueTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/UnsafeValueTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnsafeValueTypeAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class UnsafeValueTypeAttribute : Attribute
```

Specifies that a type contains an unmanaged array that might potentially overflow. This class cannot be inherited.

#### Remarks
Use the `UnsafeValueTypeAttribute` class to instruct the common language runtime (CLR) that a type contains an unmanaged array that can potentially overflow. When this attribute is encountered, the CLR inserts runtime checks to prevent the array from overflowing and to prevent buffer overrun attacks.

This class is used by the Microsoft Visual C++ and the Microsoft Visual C# compilers.

## UnsafeValueTypeAttribute.UnsafeValueTypeAttribute() constructor

```csharp
public UnsafeValueTypeAttribute ();
```

Initializes a new instance of the `UnsafeValueTypeAttribute` class.

To be added.
