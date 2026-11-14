---
title: "CallerArgumentExpressionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CallerArgumentExpressionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallerArgumentExpressionAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class CallerArgumentExpressionAttribute : Attribute
```

Indicates that a parameter captures the expression passed for another parameter as a string.

> **Note:**
> This attribute is implemented in the compiler for C# 10 and later versions only.

## CallerArgumentExpressionAttribute.CallerArgumentExpressionAttribute(String) constructor

```csharp
public CallerArgumentExpressionAttribute (string parameterName);
```

Initializes a new instance of the `CallerArgumentExpressionAttribute` class.

Parameters:

- `parameterName`: The name of the parameter whose expression should be captured as a string.

To be added.

## CallerArgumentExpressionAttribute.ParameterName property

```csharp
public string ParameterName { get; }
```

Gets the name of the parameter whose expression should be captured as a string.

Returns: The name of the parameter whose expression should be captured.

To be added.
