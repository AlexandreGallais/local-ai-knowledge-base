---
title: "OptionsConfigurationServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/OptionsConfigurationServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsConfigurationServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class OptionsConfigurationServiceCollectionExtensions
```

Extension methods for adding configuration-related options services to the DI container.

To be added.

## OptionsConfigurationServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, IConfiguration) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfiguration config) where TOptions : class;
```

Registers a configuration instance that `TOptions` will bind against.

Parameters:

- `TOptions`: The type of options being configured.
- `services`: The `IServiceCollection` to add the services to.
- `config`: The configuration being bound.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsConfigurationServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, IConfiguration, BinderOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfiguration config, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureBinder) where TOptions : class;
```

Registers a configuration instance that `TOptions` will bind against.

Parameters:

- `TOptions`: The type of options being configured.
- `services`: The `IServiceCollection` to add the services to.
- `config`: The configuration being bound.
- `configureBinder`: Used to configure the `BinderOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsConfigurationServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, String, IConfiguration) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name, Microsoft.Extensions.Configuration.IConfiguration config) where TOptions : class;
```

Registers a configuration instance that `TOptions` will bind against.

Parameters:

- `TOptions`: The type of options being configured.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options instance.
- `config`: The configuration being bound.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsConfigurationServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, String, IConfiguration, BinderOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name, Microsoft.Extensions.Configuration.IConfiguration config, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureBinder) where TOptions : class;
```

Registers a configuration instance that `TOptions` will bind against.

Parameters:

- `TOptions`: The type of options being configured.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options instance.
- `config`: The configuration being bound.
- `configureBinder`: Used to configure the `BinderOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
