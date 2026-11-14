---
title: "TypeForwardedToAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/TypeForwardedToAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeForwardedToAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class TypeForwardedToAttribute : Attribute
```

Specifies a destination `Type` in another assembly.

#### Remarks
Use the `TypeForwardedToAttribute` attribute to move a type from one assembly to another without disrupting callers that compiled against the old assembly.

**Note** Microsoft Visual Basic 2005 does not support the use of the `TypeForwardedToAttribute` attribute to forward types written in Visual Basic 2005. Applications written in Visual Basic 2005 can use forwarded types written in other languages.

## TypeForwardedToAttribute.TypeForwardedToAttribute(Type) constructor

```csharp
public TypeForwardedToAttribute (Type destination);
```

Initializes a new instance of the `TypeForwardedToAttribute` class specifying a destination `Type`.

Parameters:

- `destination`: The destination `Type` in another assembly.

To be added.

## TypeForwardedToAttribute.Destination property

```csharp
public Type Destination { get; }
```

Gets the destination `Type` in another assembly.

Returns: The destination `Type` in another assembly.

To be added.
