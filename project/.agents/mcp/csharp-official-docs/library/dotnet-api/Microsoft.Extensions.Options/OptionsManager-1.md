---
title: "OptionsManager<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsManager`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsManager<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class OptionsManager<TOptions> : Microsoft.Extensions.Options.IOptions<TOptions>, Microsoft.Extensions.Options.IOptionsSnapshot<TOptions> where TOptions : class
```

Implements `IOptions<T>` and `IOptionsSnapshot<T>`.

Parameters:

- `TOptions`: The options type.

To be added.

## OptionsManager<TOptions>.OptionsManager(IOptionsFactory<TOptions>) constructor

```csharp
public OptionsManager (Microsoft.Extensions.Options.IOptionsFactory<TOptions> factory);
```

Initializes a new instance with the specified options configurations.

Parameters:

- `factory`: The factory to use to create options.

To be added.

## OptionsManager<TOptions>.Value property

```csharp
public TOptions Value { get; }
```

Gets the default configured `TOptions` instance (equivalent to `Get(Options.DefaultName)`).

Returns: To be added.

To be added.

## OptionsManager<TOptions>.Get(String) method

```csharp
public virtual TOptions Get (string? name);
```

Returns a configured `TOptions` instance with the given `name`.

Parameters:

- `name`: The name of the `TOptions` instance. If `null`, `Options.DefaultName`, which is the empty string, is used.

Returns: The `TOptions` instance that matches the given `name`.

Exceptions:

- `OptionsValidationException`: One or more `IValidateOptions<T>` return failed `ValidateOptionsResult` when validating the `TOptions` instance created.
- `MissingMethodException`: The `TOptions` does not have a public parameterless constructor or `TOptions` is `abstract`.

To be added.
