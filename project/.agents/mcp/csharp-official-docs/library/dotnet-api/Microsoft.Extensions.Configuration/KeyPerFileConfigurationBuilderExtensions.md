---
title: "KeyPerFileConfigurationBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/KeyPerFileConfigurationBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyPerFileConfigurationBuilderExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class KeyPerFileConfigurationBuilderExtensions
```

Extension methods for registering `KeyPerFileConfigurationProvider` with `IConfigurationBuilder`.

To be added.

## KeyPerFileConfigurationBuilderExtensions.AddKeyPerFile(IConfigurationBuilder, KeyPerFileConfigurationSource>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddKeyPerFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<Microsoft.Extensions.Configuration.KeyPerFile.KeyPerFileConfigurationSource> configureSource);
```

Adds configuration using files from a directory. File names are used as the key,
file contents are used as the value.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `configureSource`: Configures the source.

Returns: The `IConfigurationBuilder`.

To be added.

## KeyPerFileConfigurationBuilderExtensions.AddKeyPerFile(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddKeyPerFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string directoryPath);
```

Adds configuration using files from a directory. File names are used as the key,
file contents are used as the value.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `directoryPath`: The path to the directory.

Returns: The `IConfigurationBuilder`.

To be added.

## KeyPerFileConfigurationBuilderExtensions.AddKeyPerFile(IConfigurationBuilder, String, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddKeyPerFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string directoryPath, bool optional);
```

Adds configuration using files from a directory. File names are used as the key,
file contents are used as the value.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `directoryPath`: The path to the directory.
- `optional`: Whether the directory is optional.

Returns: The `IConfigurationBuilder`.

To be added.

## KeyPerFileConfigurationBuilderExtensions.AddKeyPerFile(IConfigurationBuilder, String, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddKeyPerFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string directoryPath, bool optional, bool reloadOnChange);
```

Adds configuration using files from a directory. File names are used as the key,
file contents are used as the value.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `directoryPath`: The path to the directory.
- `optional`: Whether the directory is optional.
- `reloadOnChange`: Whether the configuration should be reloaded if the files are changed, added or removed.

Returns: The `IConfigurationBuilder`.

To be added.
