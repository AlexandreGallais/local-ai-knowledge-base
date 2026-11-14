---
title: "ConfigureNamedOptions<TOptions,TDep1,TDep2> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ConfigureNamedOptions`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigureNamedOptions<TOptions,TDep1,TDep2> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ConfigureNamedOptions<TOptions,TDep1,TDep2> : Microsoft.Extensions.Options.IConfigureNamedOptions<TOptions>, Microsoft.Extensions.Options.IConfigureOptions<TOptions> where TOptions : class where TDep1 : class where TDep2 : class
```

Implementation of `IConfigureNamedOptions<T>`.

Parameters:

- `TOptions`: Options type being configured.
- `TDep1`: First dependency type.
- `TDep2`: Second dependency type.

To be added.

## ConfigureNamedOptions<TOptions,TDep1,TDep2>.ConfigureNamedOptions(String, TDep1, TDep2, Action<TOptions,TDep1,TDep2>) constructor

```csharp
public ConfigureNamedOptions (string? name, TDep1 dependency, TDep2 dependency2, Action<TOptions,TDep1,TDep2>? action);
```

Initializes a new instance of `ConfigureNamedOptions<T1,T2,T3>`.

Parameters:

- `name`: The name of the options.
- `dependency`: A dependency.
- `dependency2`: A second dependency.
- `action`: The action to register.

To be added.

## ConfigureNamedOptions<TOptions,TDep1,TDep2>.Action property

```csharp
public Action<TOptions,TDep1,TDep2>? Action { get; }
```

Gets the configuration action.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions,TDep1,TDep2>.Dependency1 property

```csharp
public TDep1 Dependency1 { get; }
```

Gets the first dependency.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions,TDep1,TDep2>.Dependency2 property

```csharp
public TDep2 Dependency2 { get; }
```

Gets the second dependency.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions,TDep1,TDep2>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions,TDep1,TDep2>.Configure(TOptions) method

```csharp
public void Configure (TOptions options);
```

Configures a `TOptions` instance with the `Options.DefaultName`.

Parameters:

- `options`: The options instance to configure.

To be added.

## ConfigureNamedOptions<TOptions,TDep1,TDep2>.Configure(String, TOptions) method

```csharp
public virtual void Configure (string? name, TOptions options);
```

Invokes the registered configure `ConfigureNamedOptions<T1,T2,T3>.Action` if the `name` matches.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configure.

To be added.
