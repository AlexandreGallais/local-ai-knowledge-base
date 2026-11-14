---
title: "CompilerFeatureRequiredAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CompilerFeatureRequiredAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompilerFeatureRequiredAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class CompilerFeatureRequiredAttribute : Attribute
```

Indicates that compiler support for a particular feature is required for the location where this attribute is applied.

To be added.

## CompilerFeatureRequiredAttribute.CompilerFeatureRequiredAttribute(String) constructor

```csharp
public CompilerFeatureRequiredAttribute (string featureName);
```

Initializes a `CompilerFeatureRequiredAttribute` instance for the passed in compiler feature.

Parameters:

- `featureName`: The name of the required compiler feature.

To be added.

## CompilerFeatureRequiredAttribute.FeatureName property

```csharp
public string FeatureName { get; }
```

The name of the compiler feature.

Returns: To be added.

To be added.

## CompilerFeatureRequiredAttribute.IsOptional property

```csharp
public bool IsOptional { get; init; }
```

Gets a value that indicates whether the compiler can choose to allow access to the location where this attribute is applied if it does not understand `CompilerFeatureRequiredAttribute.FeatureName`.

Returns: `true` to let the compiler choose to allow access to the location where this attribute is applied if it does not understand `CompilerFeatureRequiredAttribute.FeatureName`; otherwise, `false`.

To be added.

## CompilerFeatureRequiredAttribute.RefStructs field

```csharp
public const string RefStructs;
```

The `CompilerFeatureRequiredAttribute.FeatureName` used for the ref structs C# feature.

To be added.

## CompilerFeatureRequiredAttribute.RequiredMembers field

```csharp
public const string RequiredMembers;
```

The `CompilerFeatureRequiredAttribute.FeatureName` used for the required members C# feature.

To be added.
