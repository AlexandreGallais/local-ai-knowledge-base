---
title: "ContextualOptionsServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ContextualOptionsServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContextualOptionsServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ContextualOptionsServiceCollectionExtensions
```

Extension methods for adding contextual options services to the DI container.

To be added.

## ContextualOptionsServiceCollectionExtensions.AddContextualOptions(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddContextualOptions (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds services required for using contextual options.

Parameters:

- `services`: The `IServiceCollection` to add the services to.

Returns: The value of `services`.

To be added.

## ContextualOptionsServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, IOptionsContext,TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Options.Contextual.IOptionsContext,TOptions> configure) where TOptions : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `configure`: The action used to configure the options.

Returns: The value of `services`.

To be added.

## ContextualOptionsServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, IConfigureContextualOptions<TOptions>>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<Microsoft.Extensions.Options.Contextual.IOptionsContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<Microsoft.Extensions.Options.Contextual.Provider.IConfigureContextualOptions<TOptions>>> loadOptions) where TOptions : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `loadOptions`: The action used to configure the options.

Returns: The value of `services`.

To be added.

## ContextualOptionsServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, String, IOptionsContext,TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name, Action<Microsoft.Extensions.Options.Contextual.IOptionsContext,TOptions> configure) where TOptions : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options to configure.
- `configure`: The action used to configure the options.

Returns: The value of `services`.

To be added.

## ContextualOptionsServiceCollectionExtensions.Configure<TOptions>(IServiceCollection, String, IConfigureContextualOptions<TOptions>>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Configure<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name, Func<Microsoft.Extensions.Options.Contextual.IOptionsContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<Microsoft.Extensions.Options.Contextual.Provider.IConfigureContextualOptions<TOptions>>> loadOptions) where TOptions : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `name`: The name of the options to configure.
- `loadOptions`: The action used to configure the options.

Returns: The value of `services`.

To be added.

## ContextualOptionsServiceCollectionExtensions.ConfigureAll<TOptions>(IServiceCollection, IOptionsContext,TOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureAll<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Options.Contextual.IOptionsContext,TOptions> configure) where TOptions : class;
```

Registers an action used to configure all instances of a particular type of options.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `configure`: The action used to configure the options.

Returns: The value of `services`.

To be added.

## ContextualOptionsServiceCollectionExtensions.ConfigureAll<TOptions>(IServiceCollection, IConfigureContextualOptions<TOptions>>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ConfigureAll<TOptions> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<Microsoft.Extensions.Options.Contextual.IOptionsContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<Microsoft.Extensions.Options.Contextual.Provider.IConfigureContextualOptions<TOptions>>> loadOptions) where TOptions : class;
```

Registers an action used to configure all instances of a particular type of options.

Parameters:

- `TOptions`: The options type to be configured.
- `services`: The `IServiceCollection` to add the services to.
- `loadOptions`: The action used to configure the options.

Returns: The value of `services`.

To be added.
