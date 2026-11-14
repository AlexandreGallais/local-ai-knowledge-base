---
title: "ChainedConfigurationProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ChainedConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChainedConfigurationProvider class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public class ChainedConfigurationProvider : IDisposable, Microsoft.Extensions.Configuration.IConfigurationProvider
```

Provides a chained implementation of `IConfigurationProvider`.

To be added.

## ChainedConfigurationProvider.ChainedConfigurationProvider(ChainedConfigurationSource) constructor

```csharp
public ChainedConfigurationProvider (Microsoft.Extensions.Configuration.ChainedConfigurationSource source);
```

Initializes a new instance from the source configuration.

Parameters:

- `source`: The source configuration.

To be added.

## ChainedConfigurationProvider.Configuration property

```csharp
public Microsoft.Extensions.Configuration.IConfiguration Configuration { get; }
```

Gets the chained configuration.

Returns: To be added.

To be added.

## ChainedConfigurationProvider.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## ChainedConfigurationProvider.GetChildKeys(String>, String) method

```csharp
public System.Collections.Generic.IEnumerable<string> GetChildKeys (System.Collections.Generic.IEnumerable<string> earlierKeys, string? parentPath);
```

Returns the immediate descendant configuration keys for a given parent path based on the data of this
`IConfigurationProvider` and the set of keys returned by all the preceding
`IConfigurationProvider` objects.

Parameters:

- `earlierKeys`: The child keys returned by the preceding providers for the same parent path.
- `parentPath`: The parent path.

Returns: The child keys.

To be added.

## ChainedConfigurationProvider.GetReloadToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Returns a change token if this provider supports change tracking; otherwise returns `null`.

Returns: The change token.

To be added.

## ChainedConfigurationProvider.Load() method

```csharp
public void Load ();
```

Loads configuration values from the source represented by this `IConfigurationProvider`.

To be added.

## ChainedConfigurationProvider.Set(String, String) method

```csharp
public void Set (string key, string? value);
```

Sets a configuration value for the specified key.

Parameters:

- `key`: The key.
- `value`: The value.

To be added.

## ChainedConfigurationProvider.TryGet(String, String) method

```csharp
public bool TryGet (string key, out string? value);
```

Tries to get a configuration value for the specified key.

Parameters:

- `key`: The key.
- `value`: When this method returns, contains the value.

Returns: `true` if the chained configuration has a non-`null` value for the specified key, otherwise `false`.

To be added.
