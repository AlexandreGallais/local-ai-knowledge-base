---
title: "IniConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/IniConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IniConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class IniConfigurationExtensions
```

Provides extension methods for adding `IniConfigurationProvider`.

#### Remarks

For more information and examples, see INI configuration provider.

## IniConfigurationExtensions.AddIniFile(IConfigurationBuilder, IniConfigurationSource>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddIniFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<Microsoft.Extensions.Configuration.Ini.IniConfigurationSource>? configureSource);
```

Adds a INI configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `configureSource`: Configures the source.

Returns: The `IConfigurationBuilder`.

To be added.

## IniConfigurationExtensions.AddIniFile(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddIniFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path);
```

Adds the INI configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: The path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.

Returns: The `IConfigurationBuilder`.

To be added.

## IniConfigurationExtensions.AddIniFile(IConfigurationBuilder, String, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddIniFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path, bool optional);
```

Adds the INI configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: The path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: `true` if the file is optional; otherwise, `false` .

Returns: The `IConfigurationBuilder`.

To be added.

## IniConfigurationExtensions.AddIniFile(IConfigurationBuilder, String, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddIniFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path, bool optional, bool reloadOnChange);
```

Adds the INI configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: `true` if the file is optional; otherwise, `false`.
- `reloadOnChange`: `true` if the configuration should be reloaded if the file changes; otherwise, `false`.

Returns: The `IConfigurationBuilder`.

To be added.

## IniConfigurationExtensions.AddIniFile(IConfigurationBuilder, IFileProvider, String, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddIniFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Microsoft.Extensions.FileProviders.IFileProvider? provider, string path, bool optional, bool reloadOnChange);
```

Adds a INI configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `provider`: The `IFileProvider` to use to access the file.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: `true` if the file is optional; otherwise, `false`.
- `reloadOnChange`: `true` if the configuration should be reloaded if the file changes; otherwise, `false`.

Returns: The `IConfigurationBuilder`.

To be added.

## IniConfigurationExtensions.AddIniStream(IConfigurationBuilder, Stream) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddIniStream (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, System.IO.Stream stream);
```

Adds a INI configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `stream`: The `Stream` to read the INI configuration data from.

Returns: The `IConfigurationBuilder`.

To be added.
