---
title: "ConfigurationChangeTokenSource<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ConfigurationChangeTokenSource`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationChangeTokenSource<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ConfigurationChangeTokenSource<TOptions> : Microsoft.Extensions.Options.IOptionsChangeTokenSource<TOptions>
```

Creates `IChangeToken`s so that `IOptionsMonitor<T>` gets
notified when `IConfiguration` changes.

To be added.

## ConfigurationChangeTokenSource<TOptions>.ConfigurationChangeTokenSource(IConfiguration) constructor

```csharp
public ConfigurationChangeTokenSource (Microsoft.Extensions.Configuration.IConfiguration config);
```

Constructor taking the `IConfiguration` instance to watch.

Parameters:

- `config`: The configuration instance.

To be added.

## ConfigurationChangeTokenSource<TOptions>.ConfigurationChangeTokenSource(String, IConfiguration) constructor

```csharp
public ConfigurationChangeTokenSource (string? name, Microsoft.Extensions.Configuration.IConfiguration config);
```

Constructor taking the `IConfiguration` instance to watch.

Parameters:

- `name`: The name of the options instance being watched.
- `config`: The configuration instance.

To be added.

## ConfigurationChangeTokenSource<TOptions>.Name property

```csharp
public string Name { get; }
```

The name of the option instance being changed.

Returns: To be added.

To be added.

## ConfigurationChangeTokenSource<TOptions>.GetChangeToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Returns the reloadToken from the `IConfiguration`.

To be added.
