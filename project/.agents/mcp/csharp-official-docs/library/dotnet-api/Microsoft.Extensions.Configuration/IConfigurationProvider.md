---
title: "IConfigurationProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/IConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfigurationProvider interface

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public interface IConfigurationProvider
```

Provides configuration key/values for an application.

To be added.

## IConfigurationProvider.GetChildKeys(String>, String) method

```csharp
public System.Collections.Generic.IEnumerable<string> GetChildKeys (System.Collections.Generic.IEnumerable<string> earlierKeys, string? parentPath);
```

Returns the immediate descendant configuration keys for a given parent path based on the data of this
`IConfigurationProvider` and the set of keys returned by all the preceding
`IConfigurationProvider` providers.

Parameters:

- `earlierKeys`: The child keys returned by the preceding providers for the same parent path.
- `parentPath`: The parent path.

Returns: The child keys.

To be added.

## IConfigurationProvider.GetReloadToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Attempts to get an `IChangeToken` for change tracking.

Returns: An `IChangeToken` token if this provider supports change tracking, `null` otherwise.

To be added.

## IConfigurationProvider.Load() method

```csharp
public void Load ();
```

Loads configuration values from the source represented by this `IConfigurationProvider`.

To be added.

## IConfigurationProvider.Set(String, String) method

```csharp
public void Set (string key, string? value);
```

Sets a configuration value for the specified key.

Parameters:

- `key`: The key.
- `value`: The value.

To be added.

## IConfigurationProvider.TryGet(String, String) method

```csharp
public bool TryGet (string key, out string? value);
```

Tries to get a configuration value for the specified key.

Parameters:

- `key`: The key.
- `value`: When this method returns, contains the value for the specified key.

Returns: `true` if a value for the specified key was found, otherwise `false`.

To be added.
