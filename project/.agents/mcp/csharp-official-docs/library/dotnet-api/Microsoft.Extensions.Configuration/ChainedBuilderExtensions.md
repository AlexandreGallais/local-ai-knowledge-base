---
title: "ChainedBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ChainedBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChainedBuilderExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class ChainedBuilderExtensions
```

Provides extension methods for adding `IConfiguration` to an `IConfigurationBuilder`.

To be added.

## ChainedBuilderExtensions.AddConfiguration(IConfigurationBuilder, IConfiguration) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddConfiguration (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, Microsoft.Extensions.Configuration.IConfiguration config);
```

Adds an existing configuration to `configurationBuilder`.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `config`: The `IConfiguration` to add.

Returns: The `IConfigurationBuilder`.

To be added.

## ChainedBuilderExtensions.AddConfiguration(IConfigurationBuilder, IConfiguration, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddConfiguration (this Microsoft.Extensions.Configuration.IConfigurationBuilder configurationBuilder, Microsoft.Extensions.Configuration.IConfiguration config, bool shouldDisposeConfiguration);
```

Adds an existing configuration to `configurationBuilder`.

Parameters:

- `configurationBuilder`: The `IConfigurationBuilder` to add to.
- `config`: The `IConfiguration` to add.
- `shouldDisposeConfiguration`: Whether the configuration should get disposed when the configuration provider is disposed.

Returns: The `IConfigurationBuilder`.

To be added.
