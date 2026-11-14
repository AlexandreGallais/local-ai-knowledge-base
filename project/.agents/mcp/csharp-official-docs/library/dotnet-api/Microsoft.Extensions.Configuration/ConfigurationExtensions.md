---
title: "ConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class ConfigurationExtensions
```

Provides extension methods for configuration classes.

To be added.

## ConfigurationExtensions.Add<TSource>(IConfigurationBuilder, Action<TSource>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder Add<TSource> (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<TSource>? configureSource) where TSource : Microsoft.Extensions.Configuration.IConfigurationSource, new();
```

Adds a new configuration source.

Parameters:

- `builder`: The builder to add to.
- `configureSource`: Configures the source secrets.

Returns: The `IConfigurationBuilder`.

To be added.

## ConfigurationExtensions.AsEnumerable(IConfiguration) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string?>> AsEnumerable (this Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Get the enumeration of key value pairs within the `IConfiguration`

Parameters:

- `configuration`: The configuration to enumerate.

Returns: An enumeration of key value pairs.

To be added.

## ConfigurationExtensions.AsEnumerable(IConfiguration, Boolean) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string?>> AsEnumerable (this Microsoft.Extensions.Configuration.IConfiguration configuration, bool makePathsRelative);
```

Get the enumeration of key value pairs within the `IConfiguration`

Parameters:

- `configuration`: The configuration to enumerate.
- `makePathsRelative`: `true` to trim the current configuration's path from the front of the returned child keys.

Returns: An enumeration of key value pairs.

To be added.

## ConfigurationExtensions.Exists(IConfigurationSection) method

```csharp
public static bool Exists (this Microsoft.Extensions.Configuration.IConfigurationSection? section);
```

Determines whether the section has a `IConfigurationSection.Value` or has children.

Parameters:

- `section`: The section to enumerate.

Returns: `true` if the section has values or children; otherwise, `false`.

To be added.

## ConfigurationExtensions.GetConnectionString(IConfiguration, String) method

```csharp
public static string? GetConnectionString (this Microsoft.Extensions.Configuration.IConfiguration configuration, string name);
```

Gets the specified connection string from the specified configuration.
Shorthand for `GetSection("ConnectionStrings")[name]`.

Parameters:

- `configuration`: The configuration to enumerate.
- `name`: The connection string key.

Returns: The connection string.

To be added.

## ConfigurationExtensions.GetRequiredSection(IConfiguration, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationSection GetRequiredSection (this Microsoft.Extensions.Configuration.IConfiguration configuration, string key);
```

Gets a configuration subsection with the specified key.

Parameters:

- `configuration`: The configuration to enumerate.
- `key`: The key of the configuration section.

Returns: The `IConfigurationSection`.

Exceptions:

- `InvalidOperationException`: There is no section with key `key`.

If no matching sub-section is found with the specified key, an exception is raised.
