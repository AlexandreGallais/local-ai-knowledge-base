---
title: "CompilerLoweringPreserveAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CompilerLoweringPreserveAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompilerLoweringPreserveAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class CompilerLoweringPreserveAttribute : Attribute
```

Represents an attribute that, when applied to an attribute class, instructs the compiler to flow applications of that attribute, from source code down to compiler-generated symbols. This flow can help IL-based analysis tools.

One example where this attribute applies is in C# primary constructor parameters. If an attribute marked with `CompilerLoweringPreserveAttribute` gets applied to a primary constructor parameter, the attribute will also be applied to any compiler-generated fields storing that parameter.

## CompilerLoweringPreserveAttribute.CompilerLoweringPreserveAttribute() constructor

```csharp
public CompilerLoweringPreserveAttribute ();
```

Initializes a new instance of the `CompilerLoweringPreserveAttribute` class.

To be added.
