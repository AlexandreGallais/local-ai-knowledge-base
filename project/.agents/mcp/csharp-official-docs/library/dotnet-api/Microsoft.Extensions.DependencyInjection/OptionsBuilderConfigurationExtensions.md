---
title: "OptionsBuilderConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/OptionsBuilderConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsBuilderConfigurationExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class OptionsBuilderConfigurationExtensions
```

Extension methods for adding configuration related options services to the DI container via `OptionsBuilder<T>`.

To be added.

## OptionsBuilderConfigurationExtensions.Bind<TOptions>(OptionsBuilder<TOptions>, IConfiguration) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> Bind<TOptions> (this Microsoft.Extensions.Options.OptionsBuilder<TOptions> optionsBuilder, Microsoft.Extensions.Configuration.IConfiguration config) where TOptions : class;
```

Registers a configuration instance which `TOptions` will bind against.

Parameters:

- `TOptions`: The options type to be configured.
- `optionsBuilder`: The options builder to add the services to.
- `config`: The configuration being bound.

Returns: The `OptionsBuilder<T>` so that additional calls can be chained.

To be added.

## OptionsBuilderConfigurationExtensions.Bind<TOptions>(OptionsBuilder<TOptions>, IConfiguration, BinderOptions>) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> Bind<TOptions> (this Microsoft.Extensions.Options.OptionsBuilder<TOptions> optionsBuilder, Microsoft.Extensions.Configuration.IConfiguration config, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureBinder) where TOptions : class;
```

Registers a configuration instance which `TOptions` will bind against.

Parameters:

- `TOptions`: The options type to be configured.
- `optionsBuilder`: The options builder to add the services to.
- `config`: The configuration being bound.
- `configureBinder`: Used to configure the `BinderOptions`.

Returns: The `OptionsBuilder<T>` so that additional calls can be chained.

To be added.

## OptionsBuilderConfigurationExtensions.BindConfiguration<TOptions>(OptionsBuilder<TOptions>, String, BinderOptions>) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> BindConfiguration<TOptions> (this Microsoft.Extensions.Options.OptionsBuilder<TOptions> optionsBuilder, string configSectionPath, Action<Microsoft.Extensions.Configuration.BinderOptions>? configureBinder = default) where TOptions : class;
```

Registers the dependency injection container to bind `TOptions` against
the `IConfiguration` obtained from the DI service provider.

Parameters:

- `TOptions`: The options type to be configured.
- `optionsBuilder`: The options builder to add the services to.
- `configSectionPath`: The name of the configuration section to bind from.
- `configureBinder`: Optional. Used to configure the `BinderOptions`.

Returns: The `OptionsBuilder<T>` so that additional calls can be chained.

Exceptions:

- `ArgumentNullException`: `optionsBuilder` or `configSectionPath` is `null`.

To be added.
