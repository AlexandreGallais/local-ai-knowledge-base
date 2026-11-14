---
title: "RequiresUnreferencedCodeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/RequiresUnreferencedCodeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RequiresUnreferencedCodeAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class RequiresUnreferencedCodeAttribute : Attribute
```

Indicates that the specified method requires dynamic access to code that is not referenced statically, for example, through `Reflection`.

#### Remarks

This attribute allows tools to understand which methods are unsafe to call when removing unreferenced code from an application. For more information, see Introduction to trim warnings.

## RequiresUnreferencedCodeAttribute.RequiresUnreferencedCodeAttribute(String) constructor

```csharp
public RequiresUnreferencedCodeAttribute (string message);
```

Initializes a new instance of the `RequiresUnreferencedCodeAttribute` class with the specified message.

Parameters:

- `message`: A message that contains information about the usage of unreferenced code.

To be added.

## RequiresUnreferencedCodeAttribute.ExcludeStatics property

```csharp
public bool ExcludeStatics { get; set; }
```

Gets or sets a value that indicates whether the annotation should apply to static members.

Returns: To be added.

To be added.

## RequiresUnreferencedCodeAttribute.Message property

```csharp
public string Message { get; }
```

Gets a message that contains information about the usage of unreferenced code.

Returns: To be added.

To be added.

## RequiresUnreferencedCodeAttribute.Url property

```csharp
public string? Url { get; set; }
```

Gets or sets an optional URL that contains more information about the method, why it requires unreferenced code, and what options a consumer has to deal with it.

Returns: To be added.

To be added.
