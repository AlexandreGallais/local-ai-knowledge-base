---
title: "ConfigurationSection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationSection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationSection class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public class ConfigurationSection : Microsoft.Extensions.Configuration.IConfigurationSection
```

Represents a section of application configuration values.

To be added.

## ConfigurationSection.ConfigurationSection(IConfigurationRoot, String) constructor

```csharp
public ConfigurationSection (Microsoft.Extensions.Configuration.IConfigurationRoot root, string path);
```

Initializes a new instance.

Parameters:

- `root`: The configuration root.
- `path`: The path to this section.

To be added.

## ConfigurationSection.Item property

```csharp
public string? this[string key] { get; set; }
```

Gets or sets the value corresponding to a configuration key.

Parameters:

- `key`: The configuration key.

Returns: The configuration value.

To be added.

## ConfigurationSection.Key <example-value>

```csharp
public string Key { get; }
```

Gets the key this section occupies in its parent.

Returns: To be added.

To be added.

## ConfigurationSection.Path property

```csharp
public string Path { get; }
```

Gets the full path to this section from the `IConfigurationRoot`.

Returns: To be added.

To be added.

## ConfigurationSection.Value property

```csharp
public string? Value { get; set; }
```

Gets or sets the section value.

Returns: To be added.

To be added.

## ConfigurationSection.GetChildren() method

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Configuration.IConfigurationSection> GetChildren ();
```

Gets the immediate descendant configuration sub-sections.

Returns: The configuration sub-sections.

To be added.

## ConfigurationSection.GetReloadToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Returns a `IChangeToken` that can be used to observe when this configuration is reloaded.

Returns: The `IChangeToken`.

To be added.

## ConfigurationSection.GetSection(String) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationSection GetSection (string key);
```

Gets a configuration sub-section with the specified key.

Parameters:

- `key`: The key of the configuration section.

Returns: The `IConfigurationSection`.

This method will never return `null`. If no matching sub-section is found with the specified key,
an empty `IConfigurationSection` will be returned.

## ConfigurationSection.TryGetValue(String, String) method

```csharp
public bool TryGetValue (string? key, out string? value);
```

Tries to get the value of this section as a string.

Parameters:

- `key`: The configuration key. If `null`, the value of the section itself is returned.
- `value`: When this method returns, contains the value of the section if it exists; otherwise, `null`.

Returns: `true` if the value was found; otherwise, `false`.

To be added.
