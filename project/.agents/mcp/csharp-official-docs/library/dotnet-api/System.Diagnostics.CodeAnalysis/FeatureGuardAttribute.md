---
title: "FeatureGuardAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/FeatureGuardAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FeatureGuardAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class FeatureGuardAttribute : Attribute
```

Indicates that the specified public static Boolean read-only property
guards access to the specified feature.

Analyzers can use this attribute to prevent warnings on calls to code that's
annotated as requiring that feature, when the callsite is guarded by a
call to the property.

```csharp
if (Feature.IsSupported)
    Feature.Implementation();

public class Feature
{
    [FeatureGuard(typeof(RequiresDynamicCodeAttribute))]
    internal static bool IsSupported => RuntimeFeature.IsDynamicCodeSupported;

    [RequiresDynamicCode("Feature requires dynamic code support.")]
    internal static Implementation() => ...; // Uses dynamic code
}
```

When the app is built with `<PublishAot>true</PublishAot>`, the call to
`Feature.Implementation()` doesn't produce analyzer warning
IL3050
and `Feature.Implementation` code is removed when publishing.

## FeatureGuardAttribute.FeatureGuardAttribute(Type) constructor

```csharp
public FeatureGuardAttribute (Type featureType);
```

Initializes a new instance of the `FeatureGuardAttribute` class

with the specified feature type.

Parameters:

- `featureType`: The type that represents the feature guarded by the property.

To be added.

## FeatureGuardAttribute.FeatureType property

```csharp
public Type FeatureType { get; }
```

The type that represents the feature guarded by the property.

Returns: To be added.

To be added.
