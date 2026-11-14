---
title: "PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/PostConfigureOptions`6.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5> : Microsoft.Extensions.Options.IPostConfigureOptions<TOptions> where TOptions : class where TDep1 : class where TDep2 : class where TDep3 : class where TDep4 : class where TDep5 : class
```

Implementation of `IPostConfigureOptions<T>`.

Parameters:

- `TOptions`: Options type being configured.
- `TDep1`: First dependency type.
- `TDep2`: Second dependency type.
- `TDep3`: Third dependency type.
- `TDep4`: Fourth dependency type.
- `TDep5`: Fifth dependency type.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.PostConfigureOptions(String, TDep1, TDep2, TDep3, TDep4, TDep5, Action<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>) constructor

```csharp
public PostConfigureOptions (string? name, TDep1 dependency1, TDep2 dependency2, TDep3 dependency3, TDep4 dependency4, TDep5 dependency5, Action<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>? action);
```

Initializes a new instance of `PostConfigureOptions<T1,T2,T3,T4,T5,T6>`.

Parameters:

- `name`: The name of the options.
- `dependency1`: A dependency.
- `dependency2`: A second dependency.
- `dependency3`: A third dependency.
- `dependency4`: A fourth dependency.
- `dependency5`: A fifth dependency.
- `action`: The action to register.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.Action property

```csharp
public Action<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>? Action { get; }
```

Gets the configuration action.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.Dependency1 property

```csharp
public TDep1 Dependency1 { get; }
```

Gets the first dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.Dependency2 property

```csharp
public TDep2 Dependency2 { get; }
```

Gets the second dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.Dependency3 property

```csharp
public TDep3 Dependency3 { get; }
```

Gets the third dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.Dependency4 property

```csharp
public TDep4 Dependency4 { get; }
```

Gets the fourth dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.Dependency5 property

```csharp
public TDep5 Dependency5 { get; }
```

Gets the fifth dependency.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.PostConfigure(TOptions) method

```csharp
public void PostConfigure (TOptions options);
```

Configures a `TOptions` instance using the `Options.DefaultName`.

Parameters:

- `options`: The options instance to configured.

To be added.

## PostConfigureOptions<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>.PostConfigure(String, TOptions) method

```csharp
public virtual void PostConfigure (string? name, TOptions options);
```

Invokes the registered initialization `PostConfigureOptions<T1,T2,T3,T4,T5,T6>.Action` if the `name` matches.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configured.

To be added.
