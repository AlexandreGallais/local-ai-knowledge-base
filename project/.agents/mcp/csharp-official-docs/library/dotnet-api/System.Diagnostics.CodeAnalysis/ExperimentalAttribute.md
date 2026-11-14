---
title: "ExperimentalAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/ExperimentalAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExperimentalAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class ExperimentalAttribute : Attribute
```

Indicates that an API is experimental and it may change in the future.

`ExperimentalAttribute` allows call sites to be flagged with a diagnostic that indicates that an experimental feature is used. You can use this attribute to ship preview features in otherwise stable libraries.

For more information about marking APIs as preview, see Preview APIs.

## ExperimentalAttribute.ExperimentalAttribute(String) constructor

```csharp
public ExperimentalAttribute (string diagnosticId);
```

Initializes a new instance of the `ExperimentalAttribute` class, specifying the ID that the compiler will use when reporting a use of the API the attribute applies to.

Parameters:

- `diagnosticId`: The ID that the compiler will use when reporting a use of the API the attribute applies to.

To be added.

## ExperimentalAttribute.DiagnosticId property

```csharp
public string DiagnosticId { get; }
```

Gets the ID that the compiler will use when reporting a use of the API the attribute applies to.

Returns: The unique diagnostic ID.

#### Remarks

The diagnostic ID is shown in build output for warnings and errors.

This property represents the unique ID that can be used to suppress
the warnings or errors, if needed.

Choose an appropriate diagnostic ID such that it is unique.

## ExperimentalAttribute.Message property

```csharp
public string? Message { get; set; }
```

Gets or sets an optional message associated with the experimental attribute.

Returns: The message that provides additional information about the experimental feature.

This message can be used to provide more context or guidance about the experimental feature.

## ExperimentalAttribute.UrlFormat property

```csharp
public string? UrlFormat { get; set; }
```

Gets or sets the URL for corresponding documentation.
The API accepts a format string instead of an actual URL, creating a generic URL that includes the diagnostic ID.

Returns: The format string that represents a URL to corresponding documentation.

An example format string is `https://contoso.com/obsoletion-warnings/{0}`.
