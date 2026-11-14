---
title: "ConfigurationRoot class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationRoot.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationRoot class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public class ConfigurationRoot : IDisposable, Microsoft.Extensions.Configuration.IConfigurationRoot
```

Represents the root node for a configuration.

To be added.

## ConfigurationRoot.ConfigurationRoot(IConfigurationProvider>) constructor

```csharp
public ConfigurationRoot (System.Collections.Generic.IList<Microsoft.Extensions.Configuration.IConfigurationProvider> providers);
```

Initializes a Configuration root with a list of providers.

Parameters:

- `providers`: The `IConfigurationProvider`s for this configuration.

Exceptions:

- `ArgumentNullException`: `providers` is `null`.

To be added.

## ConfigurationRoot.Item property

```csharp
public string? this[string key] { get; set; }
```

Gets or sets the value corresponding to a configuration key.

Parameters:

- `key`: The configuration key.

Returns: The configuration value.

To be added.

## ConfigurationRoot.Providers property

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Configuration.IConfigurationProvider> Providers { get; }
```

The `IConfigurationProvider`s for this configuration.

Returns: To be added.

To be added.

## ConfigurationRoot.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## ConfigurationRoot.GetChildren() method

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Configuration.IConfigurationSection> GetChildren ();
```

Gets the immediate children subsections.

Returns: The children.

To be added.

## ConfigurationRoot.GetReloadToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Returns a `IChangeToken` that can be used to observe when this configuration is reloaded.

Returns: The `IChangeToken`.

To be added.

## ConfigurationRoot.GetSection(String) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationSection GetSection (string key);
```

Gets a configuration subsection with the specified key.

Parameters:

- `key`: The key of the configuration section.

Returns: The `IConfigurationSection`.

This method will never return `null`. If no matching subsection is found with the specified key,
an empty `IConfigurationSection` is returned.

## ConfigurationRoot.Reload() method

```csharp
public void Reload ();
```

Forces the configuration values to be reloaded from the underlying sources.

To be added.
