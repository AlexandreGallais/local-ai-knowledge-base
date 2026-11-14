---
title: "FeatureSwitchDefinitionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.CodeAnalysis/FeatureSwitchDefinitionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FeatureSwitchDefinitionAttribute class

Namespace: `System.Diagnostics.CodeAnalysis`

```csharp
public sealed class FeatureSwitchDefinitionAttribute : Attribute
```

Indicates that the specified public static Boolean read-only property
corresponds to the feature switch specified by name.

IL rewriters and compilers can use this attribute to substitute the return value of the specified property with the value of the feature switch.

The value of the feature switch can only be specified at the application level and affects the entire application. It is possible to get into situations where one library that is part of the application requires the feature switch to be turned on, but has no way to communicate this to the application author.

Feature switches complicate unit testing and code sharing since different application configurations might have different values of the feature switch, and it's difficult to ensure all code paths work as expected.

It is therefore preferable to structure APIs in a way that trimming can happen naturally without any feature switches. The use of feature switches should be reserved for situations where trimming needs to happen, but it's not feasible to change the APIs to allow trimming naturally.

```csharp
if (Feature.IsSupported)
    Feature.Implementation();

public class Feature
{
    [FeatureSwitchDefinition("Feature.IsSupported")]
    internal static bool IsSupported => AppContext.TryGetSwitch("Feature.IsSupported", out bool isEnabled) ? isEnabled : true;

    internal static Implementation() => ...;
}
```

When the app is trimmed with the following feature settings in the project file,
`Feature.IsSupported` is treated as `false`, and `Feature.Implementation` code is removed.

```xml
<ItemGroup>
  
</ItemGroup>
```

## FeatureSwitchDefinitionAttribute.FeatureSwitchDefinitionAttribute(String) constructor

```csharp
public FeatureSwitchDefinitionAttribute (string switchName);
```

Initializes a new instance of the `FeatureSwitchDefinitionAttribute` class

with the specified feature switch name.

Parameters:

- `switchName`: The name of the feature switch that provides the value for the specified property.

To be added.

## FeatureSwitchDefinitionAttribute.SwitchName property

```csharp
public string SwitchName { get; }
```

The name of the feature switch that provides the value for the specified property.

Returns: To be added.

To be added.
