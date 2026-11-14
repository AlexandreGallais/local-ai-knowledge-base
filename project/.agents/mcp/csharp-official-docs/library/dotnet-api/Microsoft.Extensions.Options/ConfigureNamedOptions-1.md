---
title: "ConfigureNamedOptions<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ConfigureNamedOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigureNamedOptions<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ConfigureNamedOptions<TOptions> : Microsoft.Extensions.Options.IConfigureNamedOptions<TOptions>, Microsoft.Extensions.Options.IConfigureOptions<TOptions> where TOptions : class
```

Implementation of `IConfigureNamedOptions<T>`.

Parameters:

- `TOptions`: Options type being configured.

To be added.

## ConfigureNamedOptions<TOptions>.ConfigureNamedOptions(String, Action<TOptions>) constructor

```csharp
public ConfigureNamedOptions (string? name, Action<TOptions>? action);
```

Initializes a new instance of `ConfigureNamedOptions<T>`.

Parameters:

- `name`: The name of the options.
- `action`: The action to register.

To be added.

## ConfigureNamedOptions<TOptions>.Action property

```csharp
public Action<TOptions>? Action { get; }
```

Gets the configuration action.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## ConfigureNamedOptions<TOptions>.Configure(TOptions) method

```csharp
public void Configure (TOptions options);
```

Configures a `TOptions` instance with the `Options.DefaultName`.

Parameters:

- `options`: The options instance to configure.

To be added.

## ConfigureNamedOptions<TOptions>.Configure(String, TOptions) method

```csharp
public virtual void Configure (string? name, TOptions options);
```

Invokes the registered configure `ConfigureNamedOptions<T>.Action` if the `name` matches.

Parameters:

- `name`: The name of the options instance being configured.
- `options`: The options instance to configure.

To be added.
