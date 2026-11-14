---
title: "ConfigurationDebugViewContext struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationDebugViewContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationDebugViewContext struct

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public readonly struct ConfigurationDebugViewContext
```

Provides data about the current item of the configuration.

To be added.

## ConfigurationDebugViewContext.ConfigurationDebugViewContext(String, String, String, IConfigurationProvider) constructor

```csharp
public ConfigurationDebugViewContext (string path, string key, string? value, Microsoft.Extensions.Configuration.IConfigurationProvider configurationProvider);
```

Initializes a new instance of `ConfigurationDebugViewContext`.

Parameters:

- `path`: The path of the current item of the configuration.
- `key`: The key of the current item of the configuration.
- `value`: The value of the current item of the configuration.
- `configurationProvider`: The `IConfigurationProvider` to use to get the value of the current item.

To be added.

## ConfigurationDebugViewContext.ConfigurationProvider property

```csharp
public Microsoft.Extensions.Configuration.IConfigurationProvider ConfigurationProvider { get; }
```

Gets the `IConfigurationProvider` that was used to get the value of the current item.

Returns: To be added.

To be added.

## ConfigurationDebugViewContext.Key <example-value>

```csharp
public string Key { get; }
```

Gets the key of the current item.

Returns: To be added.

To be added.

## ConfigurationDebugViewContext.Path property

```csharp
public string Path { get; }
```

Gets the path of the current item.

Returns: To be added.

To be added.

## ConfigurationDebugViewContext.Value property

```csharp
public string? Value { get; }
```

Gets the value of the current item.

Returns: To be added.

To be added.
