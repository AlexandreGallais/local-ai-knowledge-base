---
title: "Breaking change - Incorrect usage of DynamicResource causes application crash"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/wpf/10.0/dynamicresource-crash.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Incorrect usage of DynamicResource causes application crash

Applications that use `DynamicResource` incorrectly now crash at runtime.

## Version introduced

.NET 10

## Previous behavior

Previously, applications that incorrectly initialized `DynamicResource` would continue running without crashing. The values would fall back to defaults, and an `InvalidOperationException` would appear in the output.

## New behavior

Applications now crash with an error similar to the following:

```output
System.Windows.Markup.XamlParseException: Set property 'System.Windows.ResourceDictionary.Source' threw an exception.
```

This occurs when an incorrect resource type is used with `DynamicResource`. For example, the code snippet below causes a crash because a `SolidColorBrush` is used instead of `System.Windows.Media.Color`:

```xml
<SolidColorBrush x:Key="RedColorBrush" Color="#FFFF0000" />
<SolidColorBrush x:Key="ResourceName" Color="{DynamicResource RedColorBrush}" />
```

## Type of breaking change

This is both a source-incompatible and behavioral change.

## Reason for change

This change improves the performance of `DynamicResource` usage. The optimization ensures that incorrect resource initialization is caught immediately, preventing unintended behavior.

## Recommended action

To avoid crashes, ensure that the correct resource types are used with `DynamicResource`. For example, the following code resolves the issue by using `System.Windows.Media.Color` instead of `SolidColorBrush`:

```xml
<Color x:Key="RedColor">#FFFF0000</Color>
<SolidColorBrush x:Key="ResourceName" Color="{DynamicResource RedColor}" />
```

## Affected APIs

None.
