---
title: "SkipLocalsInitAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/SkipLocalsInitAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SkipLocalsInitAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class SkipLocalsInitAttribute : Attribute
```

Indicates to the compiler that the .locals init flag should not be set in nested method headers when emitting to metadata.

#### Remarks

This attribute is unsafe, because it may reveal uninitialized memory to the application in certain instances (for example, reading from uninitialized stack-allocated memory). If applied to a method directly, the attribute applies to that method and all its nested functions, including lambdas and local functions. If applied to a type or module, it applies to all methods nested inside. This attribute is intentionally not permitted on assemblies. To apply the attribute to multiple type declarations, use it at the module level instead.

## SkipLocalsInitAttribute.SkipLocalsInitAttribute() constructor

```csharp
public SkipLocalsInitAttribute ();
```

Initializes a new instance of the `SkipLocalsInitAttribute` class.

To be added.
