---
title: "PostConfigureOptions<TOptions,TDep1,TDep2,TDep3> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/PostConfigureOptions`4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PostConfigureOptions<TOptions,TDep1,TDep2,TDep3> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class PostConfigureOptions<TOptions,TDep1,TDep2,TDep3> : Microsoft.Extensions.Options.IPostConfigureOptions<TOptions> where TOptions : class where TDep1 : class where TDep2 : class where TDep3 : class
```

Implementation of `IPostConfigureOptions<T>`.

Parameters:

- `TOptions`: Options type being configured.
- `TDep1`: First dependency type.
- `TDep2`: Second dependency type.
- `TDep3`: Third dependency type.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.PostConfigureOptions(String, TDep1, TDep2, TDep3, Action<TOptions,TDep1,TDep2,TDep3>) constructor

```csharp
public PostConfigureOptions (string? name, TDep1 dependency, TDep2 dependency2, TDep3 dependency3, Action<TOptions,TDep1,TDep2,TDep3>? action);
```

Initializes a new instance of `PostConfigureOptions<T1,T2,T3,T4>`.

Parameters:

- `name`: The name of the options.
- `dependency`: A dependency.
- `dependency2`: A second dependency.
- `dependency3`: A third dependency.
- `action`: The action to register.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.Action property

```csharp
public Action<TOptions,TDep1,TDep2,TDep3>? Action { get; }
```

Gets the configuration action.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.Dependency1 property

```csharp
public TDep1 Dependency1 { get; }
```

Gets the first dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.Dependency2 property

```csharp
public TDep2 Dependency2 { get; }
```

Gets the second dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.Dependency3 property

```csharp
public TDep3 Dependency3 { get; }
```

Gets the third dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.PostConfigure(TOptions) method

```csharp
public void PostConfigure (TOptions options);
```

Configures a `TOptions` instance using the `Options.DefaultName`.

Parameters:

- `options`: The options instance to configured.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3>.PostConfigure(String, TOptions) method

```csharp
public virtual void PostConfigure (string? name, TOptions options);
```

Invokes the registered initialization `PostConfigureOptions<T1,T2,T3,T4>.Action` if the `name` matches.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configured.

To be added.
