---
title: "ConfigurationProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationProvider class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public abstract class ConfigurationProvider : Microsoft.Extensions.Configuration.IConfigurationProvider
```

Defines the core behavior of configuration providers and provides a base for derived classes.

#### Remarks

For more information, see Configuration providers in .NET.

## ConfigurationProvider.ConfigurationProvider() constructor

```csharp
protected ConfigurationProvider ();
```

Initializes a new `IConfigurationProvider`.

To be added.

## ConfigurationProvider.Data property

```csharp
protected System.Collections.Generic.IDictionary<string,string?> Data { get; set; }
```

Gets or sets the configuration key-value pairs for this provider.

Returns: To be added.

To be added.

## ConfigurationProvider.GetChildKeys(String>, String) method

```csharp
public virtual System.Collections.Generic.IEnumerable<string> GetChildKeys (System.Collections.Generic.IEnumerable<string> earlierKeys, string? parentPath);
```

Returns the list of keys that this provider has.

Parameters:

- `earlierKeys`: The earlier keys that other providers contain.
- `parentPath`: The path for the parent IConfiguration.

Returns: The list of keys for this provider.

To be added.

## ConfigurationProvider.GetReloadToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Returns a `IChangeToken` that can be used to listen when this provider is reloaded.

Returns: The `IChangeToken`.

To be added.

## ConfigurationProvider.Load() method

```csharp
public virtual void Load ();
```

Loads (or reloads) the data for this provider.

To be added.

## ConfigurationProvider.OnReload() method

```csharp
protected void OnReload ();
```

Triggers the reload change token and creates a new one.

To be added.

## ConfigurationProvider.Set(String, String) method

```csharp
public virtual void Set (string key, string? value);
```

Sets a value for a given key.

Parameters:

- `key`: The configuration key to set.
- `value`: The value to set.

To be added.

## ConfigurationProvider.ToString() method

```csharp
public override string ToString ();
```

Generates a string representing this provider name and relevant details.

Returns: The configuration name.

To be added.

## ConfigurationProvider.TryGet(String, String) method

```csharp
public virtual bool TryGet (string key, out string? value);
```

Attempts to find a value with the given key.

Parameters:

- `key`: The key to lookup.
- `value`: When this method returns, contains the value if one is found.

Returns: `true` if `key` has a value; otherwise `false`.

To be added.
