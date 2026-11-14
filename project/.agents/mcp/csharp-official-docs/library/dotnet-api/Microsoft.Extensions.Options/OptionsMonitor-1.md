---
title: "OptionsMonitor<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsMonitor`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsMonitor<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class OptionsMonitor<TOptions> : IDisposable, Microsoft.Extensions.Options.IOptionsMonitor<TOptions> where TOptions : class
```

Implements `IOptionsMonitor<T>`.

Parameters:

- `TOptions`: The options type.

To be added.

## OptionsMonitor<TOptions>.OptionsMonitor(IOptionsFactory<TOptions>, IOptionsChangeTokenSource<TOptions>>, IOptionsMonitorCache<TOptions>) constructor

```csharp
public OptionsMonitor (Microsoft.Extensions.Options.IOptionsFactory<TOptions> factory, System.Collections.Generic.IEnumerable<Microsoft.Extensions.Options.IOptionsChangeTokenSource<TOptions>> sources, Microsoft.Extensions.Options.IOptionsMonitorCache<TOptions> cache);
```

Initializes a new instance of `OptionsMonitor<T>` with the specified factory, sources, and cache.

Parameters:

- `factory`: The factory to use to create options.
- `sources`: The sources used to listen for changes to the options instance.
- `cache`: The cache used to store options.

To be added.

## OptionsMonitor<TOptions>.CurrentValue property

```csharp
public TOptions CurrentValue { get; }
```

Gets the present value of the options (equivalent to `Get(Options.DefaultName)`).

Returns: To be added.

Exceptions:

- `OptionsValidationException`: One or more `IValidateOptions<T>` return failed `ValidateOptionsResult` when validating the `TOptions` instance created.
- `MissingMethodException`: The `TOptions` does not have a public parameterless constructor or `TOptions` is `abstract`.

To be added.

## OptionsMonitor<TOptions>.Dispose() method

```csharp
public void Dispose ();
```

Removes all change registration subscriptions.

To be added.

## OptionsMonitor<TOptions>.Get(String) method

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

## OptionsMonitor<TOptions>.OnChange(String>) method

```csharp
public IDisposable OnChange (Action<TOptions,string> listener);
```

Registers a listener to be called whenever `TOptions` changes.

Parameters:

- `listener`: The action to be invoked when `TOptions` has changed.

Returns: An `IDisposable` that should be disposed to stop listening for changes.

To be added.
