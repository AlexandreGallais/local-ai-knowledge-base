---
title: "ConfigurationRootExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationRootExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationRootExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class ConfigurationRootExtensions
```

Provides extension methods for `IConfigurationRoot`.

To be added.

## ConfigurationRootExtensions.GetDebugView(IConfigurationRoot) method

```csharp
public static string GetDebugView (this Microsoft.Extensions.Configuration.IConfigurationRoot root);
```

Generates a human-readable view of the configuration showing where each value came from.

Returns: The debug view.

To be added.

## ConfigurationRootExtensions.GetDebugView(IConfigurationRoot, String>) method

```csharp
public static string GetDebugView (this Microsoft.Extensions.Configuration.IConfigurationRoot root, Func<Microsoft.Extensions.Configuration.ConfigurationDebugViewContext,string>? processValue);
```

Generates a human-readable view of the configuration showing where each value came from.

Parameters:

- `root`: The configuration root.
- `processValue`: The function for processing the value, for example, hiding secrets.
Parameters:
ConfigurationDebugViewContext: Context of the current configuration item.
returns: A string value is used to assign as the Value of the configuration section.

Returns: The debug view.

To be added.
