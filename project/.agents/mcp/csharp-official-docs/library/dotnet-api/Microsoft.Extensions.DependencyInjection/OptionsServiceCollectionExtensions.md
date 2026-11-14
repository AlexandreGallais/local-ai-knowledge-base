---
title: "OptionsServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/OptionsServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class OptionsServiceCollectionExtensions
```

Extension methods for adding options services to the DI container.

To be added.

## OptionsServiceCollectionExtensions.AddOptions(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddOptions (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds services required for using options.

Parameters:

- `services`: The `IServiceCollection` to add the services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.AddOptions<TOptions>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> AddOptions<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TOptions : class;
```

Gets an options builder that forwards Configure calls for the same `TOptions` to the underlying service collection.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.

Returns: The `OptionsBuilder<T>` so that configure calls can be chained in it.

To be added.

## OptionsServiceCollectionExtensions.AddOptions<TOptions>(IServiceCollection, String) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> AddOptions<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name) where TOptions : class;
```

Gets an options builder that forwards Configure calls for the same named `TOptions` to the underlying service collection.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options instance.

Returns: The `OptionsBuilder<T>` so that configure calls can be chained in it.

To be added.

## OptionsServiceCollectionExtensions.AddOptionsWithValidateOnStart<TOptions>(IServiceCollection, String) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> AddOptionsWithValidateOnStart<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name = default) where TOptions : class;
```

Adds services required for using options and enforces options validation check on start rather than at run time.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options instance.

Returns: The `OptionsBuilder<T>` so that configure calls can be chained in it.

The `OptionsBuilderExtensions.ValidateOnStart<T>` extension is called by this method.

## OptionsServiceCollectionExtensions.AddOptionsWithValidateOnStart<TOptions,TValidateOptions>(IServiceCollection, String) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> AddOptionsWithValidateOnStart<TOptions,TValidateOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name = default) where TOptions : class where TValidateOptions : class, Microsoft.Extensions.Options.IValidateOptions<TOptions>;
```

Adds services required for using options and enforces options validation check on start rather than at run time.

Parameters:

- `TOptions`: The options type to be configured.
- `TValidateOptions`: The `IValidateOptions<T>` validator type.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options instance.

Returns: The `OptionsBuilder<T>` so that configure calls can be chained in it.

The `OptionsBuilderExtensions.ValidateOnStart<T>` extension is called by this method.
The validator registration is not scoped to `name`. The name selects the options instance
evaluated during startup; the validator determines which names it validates.

## OptionsServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, Action<TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<TOptions> configureOptions) where TOptions : class;
```

Registers an action used to configure a particular type of options.
Note: These are run before all `OptionsServiceCollectionExtensions.PostConfigure<T>`.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `configureOptions`: The action used to configure the options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, String, Action<TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name, Action<TOptions> configureOptions) where TOptions : class;
```

Registers an action used to configure a particular type of options.
Note: These are run before all `OptionsServiceCollectionExtensions.PostConfigure<T>`.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options instance.
- `configureOptions`: The action used to configure the options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.ConfigureAll<TOptions>(IServiceCollection, Action<TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureAll<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<TOptions> configureOptions) where TOptions : class;
```

Registers an action used to configure all instances of a particular type of options.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `configureOptions`: The action used to configure the options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.ConfigureOptions(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureOptions (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object configureInstance);
```

Registers an object that will have all of its `IConfigureOptions<T>`,
`IPostConfigureOptions<T>`, and `IValidateOptions<T>`
registered.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `configureInstance`: The instance that will configure options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.ConfigureOptions(IServiceCollection, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureOptions (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type configureType);
```

Registers a type that will have all of its `IConfigureOptions<T>`,
`IPostConfigureOptions<T>`, and `IValidateOptions<T>`
registered.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `configureType`: The type that will configure options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.ConfigureOptions<TConfigureOptions>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureOptions<TConfigureOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TConfigureOptions : class;
```

Registers a type that will have all of its `IConfigureOptions<T>`,
`IPostConfigureOptions<T>`, and `IValidateOptions<T>`
registered.

Parameters:

- `TConfigureOptions`: The type that will configure options.
- `services`: The `IServiceCollection` to add the services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.PostConfigure<TOptions>(IServiceCollection, Action<TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection PostConfigure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<TOptions> configureOptions) where TOptions : class;
```

Registers an action used to initialize a particular type of options.
Note: These are run after all `OptionsServiceCollectionExtensions.Configure<T>`.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `configureOptions`: The action used to configure the options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.PostConfigure<TOptions>(IServiceCollection, String, Action<TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection PostConfigure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name, Action<TOptions> configureOptions) where TOptions : class;
```

Registers an action used to configure a particular type of options.
Note: These are run after all `OptionsServiceCollectionExtensions.Configure<T>`.

Parameters:

- `TOptions`: The options type to be configure.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options instance.
- `configureOptions`: The action used to configure the options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## OptionsServiceCollectionExtensions.PostConfigureAll<TOptions>(IServiceCollection, Action<TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection PostConfigureAll<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<TOptions> configureOptions) where TOptions : class;
```

Registers an action used to post configure all instances of a particular type of options.
Note: These are run after all `OptionsServiceCollectionExtensions.Configure<T>`.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `configureOptions`: The action used to configure the options.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
