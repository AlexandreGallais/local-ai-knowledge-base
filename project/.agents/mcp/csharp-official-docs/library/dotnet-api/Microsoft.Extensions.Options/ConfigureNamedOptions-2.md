---
title: "ConfigureNamedOptions<TOptions,TDep> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ConfigureNamedOptions`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigureNamedOptions<TOptions,TDep> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ConfigureNamedOptions<TOptions,TDep> : Microsoft.Extensions.Options.IConfigureNamedOptions<TOptions>, Microsoft.Extensions.Options.IConfigureOptions<TOptions> where TOptions : class where TDep : class
```

Implementation of `IConfigureNamedOptions<T>`.

Parameters:

- `TOptions`: Options type being configured.
- `TDep`: Dependency type.

To be added.

## ConfigureNamedOptions<TOptions,TDep>.ConfigureNamedOptions(String, TDep, Action<TOptions,TDep>) constructor

```csharp
public ConfigureNamedOptions (string? name, TDep dependency, Action<TOptions,TDep>? action);
```

Initializes a new instance of `ConfigureNamedOptions<T1,T2>`.

Parameters:

- `name`: The name of the options.
- `dependency`: A dependency.
- `action`: The action to register.

To be added.

## ConfigureNamedOptions<TOptions,TDep>.Action property

```csharp
public Action<TOptions,TDep>? Action { get; }
```

Gets the configuration action.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions,TDep>.Dependency property

```csharp
public TDep Dependency { get; }
```

Gets the dependency.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions,TDep>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions,TDep>.Configure(TOptions) method

```csharp
public void Configure (TOptions options);
```

Configures a `TOptions` instance with the `Options.DefaultName`.

Parameters:

- `options`: The options instance to configure.

To be added.

## ConfigureNamedOptions<TOptions,TDep>.Configure(String, TOptions) method

```csharp
public virtual void Configure (string? name, TOptions options);
```

Invokes the registered configure `ConfigureNamedOptions<T1,T2>.Action` if the `name` matches.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configure.

To be added.
