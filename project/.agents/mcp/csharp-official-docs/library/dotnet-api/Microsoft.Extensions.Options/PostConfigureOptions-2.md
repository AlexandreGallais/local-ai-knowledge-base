---
title: "PostConfigureOptions<TOptions,TDep> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/PostConfigureOptions`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PostConfigureOptions<TOptions,TDep> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class PostConfigureOptions<TOptions,TDep> : Microsoft.Extensions.Options.IPostConfigureOptions<TOptions> where TOptions : class where TDep : class
```

Implementation of `IPostConfigureOptions<T>`.

Parameters:

- `TOptions`: Options type being configured.
- `TDep`: Dependency type.

To be added.

## PostConfigureOptions<TOptions,TDep>.PostConfigureOptions(String, TDep, Action<TOptions,TDep>) constructor

```csharp
public PostConfigureOptions (string? name, TDep dependency, Action<TOptions,TDep>? action);
```

Initializes a new instance of `PostConfigureOptions<T1,T2>`.

Parameters:

- `name`: The name of the options.
- `dependency`: A dependency.
- `action`: The action to register.

To be added.

## PostConfigureOptions<TOptions,TDep>.Action property

```csharp
public Action<TOptions,TDep>? Action { get; }
```

Gets the configuration action.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep>.Dependency property

```csharp
public TDep Dependency { get; }
```

The dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep>.PostConfigure(TOptions) method

```csharp
public void PostConfigure (TOptions options);
```

Configures a `TOptions` instance using the `Options.DefaultName`.

Parameters:

- `options`: The options instance to configured.

To be added.

## PostConfigureOptions<TOptions,TDep>.PostConfigure(String, TOptions) method

```csharp
public virtual void PostConfigure (string? name, TOptions options);
```

Invokes the registered initialization `PostConfigureOptions<T1,T2>.Action` if the `name` matches.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configured.

To be added.
