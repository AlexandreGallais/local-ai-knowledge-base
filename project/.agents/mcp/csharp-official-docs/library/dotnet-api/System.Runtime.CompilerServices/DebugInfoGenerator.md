---
title: "DebugInfoGenerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/DebugInfoGenerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DebugInfoGenerator class

Namespace: `System.Runtime.CompilerServices`

```csharp
public abstract class DebugInfoGenerator
```

Generates debug information for lambda expressions in an expression tree.

To be added.

## DebugInfoGenerator.DebugInfoGenerator() constructor

```csharp
protected DebugInfoGenerator ();
```

Initializes a new instance of the `DebugInfoGenerator` class.

To be added.

## DebugInfoGenerator.CreatePdbGenerator() method

```csharp
public static System.Runtime.CompilerServices.DebugInfoGenerator CreatePdbGenerator ();
```

Creates a program database (PDB) symbol generator.

Returns: A PDB symbol generator.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## DebugInfoGenerator.MarkSequencePoint(LambdaExpression, Int32, DebugInfoExpression) method

```csharp
public abstract void MarkSequencePoint (System.Linq.Expressions.LambdaExpression method, int ilOffset, System.Linq.Expressions.DebugInfoExpression sequencePoint);
```

Marks a sequence point in Microsoft intermediate language (MSIL) code.

Parameters:

- `method`: The lambda expression that is generated.
- `ilOffset`: The offset within MSIL code at which to mark the sequence point.
- `sequencePoint`: Debug information that corresponds to the sequence point.

To be added.
