---
title: "RequiresDynamicCodeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/RequiresDynamicCodeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RequiresDynamicCodeAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class RequiresDynamicCodeAttribute : Attribute
```

Indicates that the specified method requires the ability to generate new code at runtime, for example through `Reflection`.

#### Remarks

This attribute allows tools to understand which methods are unsafe to call when compiling ahead of time.
For more information, see Introduction to AOT warnings.

## RequiresDynamicCodeAttribute.RequiresDynamicCodeAttribute(String) constructor

```csharp
public RequiresDynamicCodeAttribute (string message);
```

Initializes a new instance of the `RequiresDynamicCodeAttribute` class with the specified message.

Parameters:

- `message`: A message that contains information about the usage of dynamic code.

To be added.

## RequiresDynamicCodeAttribute.ExcludeStatics property

```csharp
public bool ExcludeStatics { get; set; }
```

Gets or sets a value that indicates whether the annotation should apply to static members.

Returns: To be added.

To be added.

## RequiresDynamicCodeAttribute.Message property

```csharp
public string Message { get; }
```

Gets a message that contains information about the usage of dynamic code.

Returns: To be added.

To be added.

## RequiresDynamicCodeAttribute.Url property

```csharp
public string? Url { get; set; }
```

Gets or sets an optional URL that contains more information about the method, why it requires dynamic code, and what options a consumer has to deal with it.

Returns: To be added.

To be added.
