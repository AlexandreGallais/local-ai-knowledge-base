---
title: "MaybeNullWhenAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/MaybeNullWhenAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaybeNullWhenAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class MaybeNullWhenAttribute : Attribute
```

Specifies that when a method returns `MaybeNullWhenAttribute.ReturnValue`, the parameter may be `null` even if the corresponding type disallows it.

For more information, see Nullable static analysis in the C# guide.

## MaybeNullWhenAttribute.MaybeNullWhenAttribute(Boolean) constructor

```csharp
public MaybeNullWhenAttribute (bool returnValue);
```

Initializes the attribute with the specified return value condition.

Parameters:

- `returnValue`: The return value condition. If the method returns this value, the associated parameter may be `null`.

To be added.

## MaybeNullWhenAttribute.ReturnValue property

```csharp
public bool ReturnValue { get; }
```

Gets the return value condition.

Returns: The return value condition. If the method returns this value, the associated parameter may be `null`.

To be added.
