---
title: "ConfigureOptions<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ConfigureOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigureOptions<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ConfigureOptions<TOptions> : Microsoft.Extensions.Options.IConfigureOptions<TOptions> where TOptions : class
```

Implementation of `IConfigureOptions<T>`.

Parameters:

- `TOptions`: Options type being configured.

To be added.

## ConfigureOptions<TOptions>.ConfigureOptions(Action<TOptions>) constructor

```csharp
public ConfigureOptions (Action<TOptions>? action);
```

Initializes a new instance of `ConfigureOptions<T>`.

Parameters:

- `action`: The action to register.

To be added.

## ConfigureOptions<TOptions>.Action property

```csharp
public Action<TOptions>? Action { get; }
```

Gets the configuration action.

Returns: To be added.

To be added.

## ConfigureOptions<TOptions>.Configure(TOptions) method

```csharp
public virtual void Configure (TOptions options);
```

Invokes the registered configure `ConfigureOptions<T>.Action`.

Parameters:

- `options`: The options instance to configure.

To be added.
