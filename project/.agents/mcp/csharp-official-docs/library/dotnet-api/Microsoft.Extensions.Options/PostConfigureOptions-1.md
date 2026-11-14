---
title: "PostConfigureOptions<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/PostConfigureOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PostConfigureOptions<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class PostConfigureOptions<TOptions> : Microsoft.Extensions.Options.IPostConfigureOptions<TOptions> where TOptions : class
```

Implementation of `IPostConfigureOptions<T>`.

Parameters:

- `TOptions`: The options type being configured.

To be added.

## PostConfigureOptions<TOptions>.PostConfigureOptions(String, Action<TOptions>) constructor

```csharp
public PostConfigureOptions (string? name, Action<TOptions>? action);
```

Creates a new instance of `PostConfigureOptions<T>`.

Parameters:

- `name`: The name of the options.
- `action`: The action to register.

To be added.

## PostConfigureOptions<TOptions>.Action property

```csharp
public Action<TOptions>? Action { get; }
```

Gets the initialization action.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## PostConfigureOptions<TOptions>.PostConfigure(String, TOptions) method

```csharp
public virtual void PostConfigure (string? name, TOptions options);
```

Invokes the registered initialization `PostConfigureOptions<T>.Action` if the `name` matches.

Parameters:

- `name`: The name of the action to invoke.
- `options`: The options to use in initialization.

To be added.
