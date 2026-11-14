---
title: "NotNullWhenAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/NotNullWhenAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotNullWhenAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class NotNullWhenAttribute : Attribute
```

Specifies that when a method returns `NotNullWhenAttribute.ReturnValue`, the parameter will not be `null` even if the corresponding type allows it.

For more information, see Nullable static analysis in the C# guide.

## NotNullWhenAttribute.NotNullWhenAttribute(Boolean) constructor

```csharp
public NotNullWhenAttribute (bool returnValue);
```

Initializes the attribute with the specified return value condition.

Parameters:

- `returnValue`: The return value condition. If the method returns this value, the associated parameter will not be `null`.

To be added.

## NotNullWhenAttribute.ReturnValue property

```csharp
public bool ReturnValue { get; }
```

Gets the return value condition.

Returns: The return value condition. If the method returns this value, the associated parameter will not be `null`.

To be added.
