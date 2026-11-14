---
title: "IConfiguration interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/IConfiguration.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfiguration interface

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public interface IConfiguration
```

Represents a set of key/value application configuration properties.

#### Remarks

For more information, see Configuration in .NET.

## IConfiguration.Item property

```csharp
public string? this[string key] { get; set; }
```

Gets or sets a configuration value.

Parameters:

- `key`: The configuration key.

Returns: The configuration value.

To be added.

## IConfiguration.GetChildren() method

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Configuration.IConfigurationSection> GetChildren ();
```

Gets the immediate descendant configuration sub-sections.

Returns: The configuration sub-sections.

To be added.

## IConfiguration.GetReloadToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Returns a `IChangeToken` that can be used to observe when this configuration is reloaded.

Returns: An `IChangeToken` token if this provider supports change tracking; otherwise, `null`.

GetReloadToken is a method that can be used to get a change token that notifies when the configuration is reloaded. A change token is a way to track changes in an object, such as a file, a cache entry, or an option.

## IConfiguration.GetSection(String) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationSection GetSection (string key);
```

Gets a configuration sub-section with the specified key.

Parameters:

- `key`: The key of the configuration section.

Returns: The `IConfigurationSection`.

This method will never return `null`. If no matching sub-section is found with the specified key,
an empty `IConfigurationSection` will be returned.
