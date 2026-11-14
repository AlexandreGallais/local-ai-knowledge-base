---
title: "TypeForwardedFromAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/TypeForwardedFromAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeForwardedFromAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class TypeForwardedFromAttribute : Attribute
```

Specifies a source `Type` in another assembly.

#### Remarks
The `TypeForwardedFromAttribute` attribute enables the target framework provider to trace a loaded type back to the original assembly it was forwarded from.

## TypeForwardedFromAttribute.TypeForwardedFromAttribute(String) constructor

```csharp
public TypeForwardedFromAttribute (string assemblyFullName);
```

Initializes a new instance of the `TypeForwardedFromAttribute` class.

Parameters:

- `assemblyFullName`: The source `Type` in another assembly.

Exceptions:

- `ArgumentNullException`: `assemblyFullName` is `null` or empty.

To be added.

## TypeForwardedFromAttribute.AssemblyFullName property

```csharp
public string AssemblyFullName { get; }
```

Gets the assembly-qualified name of the source type.

Returns: The assembly-qualified name of the source type.

To be added.
