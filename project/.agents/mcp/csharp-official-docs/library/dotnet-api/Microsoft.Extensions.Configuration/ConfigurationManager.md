---
title: "ConfigurationManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationManager class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public sealed class ConfigurationManager : IDisposable, Microsoft.Extensions.Configuration.IConfigurationManager, Microsoft.Extensions.Configuration.IConfigurationRoot
```

Represents a mutable configuration object.

It is both an `IConfigurationBuilder` and an `IConfigurationRoot`.
As sources are added, it updates its current view of configuration.

## ConfigurationManager.ConfigurationManager() constructor

```csharp
public ConfigurationManager ();
```

Creates an empty mutable configuration object that is both an `IConfigurationBuilder` and an `IConfigurationRoot`.

To be added.

## ConfigurationManager.Item property

```csharp
public string? this[string key] { get; set; }
```

Gets or sets a configuration value.

Parameters:

- `key`: The item index.

Returns: The configuration value.

To be added.

## ConfigurationManager.Microsoft.Extensions.Configuration.IConfigurationBuilder.Properties property

```csharp
System.Collections.Generic.IDictionary<string,object> Microsoft.Extensions.Configuration.IConfigurationBuilder.Properties { get; }
```

Gets a key-value collection that can be used to share data between the `IConfigurationBuilder` and the registered configuration sources.

Returns: To be added.

To be added.

## ConfigurationManager.Microsoft.Extensions.Configuration.IConfigurationRoot.Providers property

```csharp
System.Collections.Generic.IEnumerable<Microsoft.Extensions.Configuration.IConfigurationProvider> Microsoft.Extensions.Configuration.IConfigurationRoot.Providers { get; }
```

Gets the configuration providers for this configuration.

Returns: To be added.

To be added.

## ConfigurationManager.Sources property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Configuration.IConfigurationSource> Sources { get; }
```

Gets the sources used to obtain configuration values.

Returns: To be added.

To be added.

## ConfigurationManager.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## ConfigurationManager.GetChildren() method

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Configuration.IConfigurationSection> GetChildren ();
```

Gets the immediate descendant configuration subsections.

Returns: The configuration subsections.

To be added.

## ConfigurationManager.GetSection(String) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationSection GetSection (string key);
```

Gets a configuration subsection with the specified key.

Parameters:

- `key`: The key of the configuration section.

Returns: The configuration section for the specified key.

The name of the configuration section is case-insensitive.

## ConfigurationManager.Microsoft.Extensions.Configuration.IConfiguration.GetReloadToken() method

```csharp
Microsoft.Extensions.Primitives.IChangeToken IConfiguration.GetReloadToken ();
```

Returns a `IChangeToken` that can be used to observe when this configuration is reloaded.

Returns: A token that can be used to observe when the configuration is reloaded.

To be added.

## ConfigurationManager.Microsoft.Extensions.Configuration.IConfigurationBuilder.Add(IConfigurationSource) method

```csharp
Microsoft.Extensions.Configuration.IConfigurationBuilder IConfigurationBuilder.Add (Microsoft.Extensions.Configuration.IConfigurationSource source);
```

Adds a new configuration source.

Parameters:

- `source`: The configuration source to add.

Returns: The same `IConfigurationBuilder` with the added configuration source.

To be added.

## ConfigurationManager.Microsoft.Extensions.Configuration.IConfigurationBuilder.Build() method

```csharp
Microsoft.Extensions.Configuration.IConfigurationRoot IConfigurationBuilder.Build ();
```

Builds an `IConfiguration` with keys and values from the set of sources registered in `IConfigurationBuilder.Sources`.

Returns: An `IConfigurationRoot` with keys and values from the registered sources.

To be added.

## ConfigurationManager.Microsoft.Extensions.Configuration.IConfigurationRoot.Reload() method

```csharp
void IConfigurationRoot.Reload ();
```

Forces the configuration values to be reloaded from the underlying `IConfigurationProvider` instances.

To be added.
