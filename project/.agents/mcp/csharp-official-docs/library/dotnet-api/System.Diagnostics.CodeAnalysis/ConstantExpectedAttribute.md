---
title: "ConstantExpectedAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/ConstantExpectedAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConstantExpectedAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class ConstantExpectedAttribute : Attribute
```

Indicates that the specified method parameter expects a constant.

#### Remarks

This attribute can be used to inform tooling that a constant should be used as an argument for the annotated parameter.

## ConstantExpectedAttribute.ConstantExpectedAttribute() constructor

```csharp
public ConstantExpectedAttribute ();
```

Initializes a new instance of the `ConstantExpectedAttribute` class.

To be added.

## ConstantExpectedAttribute.Max property

```csharp
public object? Max { get; set; }
```

Gets or sets the maximum bound of the expected constant, inclusive.

Returns: To be added.

To be added.

## ConstantExpectedAttribute.Min property

```csharp
public object? Min { get; set; }
```

Gets or sets the minimum bound of the expected constant, inclusive.

Returns: To be added.

To be added.
