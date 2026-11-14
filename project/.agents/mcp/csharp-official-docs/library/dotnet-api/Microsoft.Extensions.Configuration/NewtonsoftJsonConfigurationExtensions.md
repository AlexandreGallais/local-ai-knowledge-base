---
title: "NewtonsoftJsonConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/NewtonsoftJsonConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NewtonsoftJsonConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class NewtonsoftJsonConfigurationExtensions
```

Extension methods for adding `NewtonsoftJsonConfigurationProvider`.

To be added.

## NewtonsoftJsonConfigurationExtensions.AddNewtonsoftJsonFile(IConfigurationBuilder, NewtonsoftJsonConfigurationSource>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddNewtonsoftJsonFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<Microsoft.Extensions.Configuration.NewtonsoftJson.NewtonsoftJsonConfigurationSource> configureSource);
```

Adds a JSON configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `configureSource`: Configures the source.

Returns: The `IConfigurationBuilder`.

To be added.

## NewtonsoftJsonConfigurationExtensions.AddNewtonsoftJsonFile(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddNewtonsoftJsonFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path);
```

Adds the JSON configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.

Returns: The `IConfigurationBuilder`.

To be added.

## NewtonsoftJsonConfigurationExtensions.AddNewtonsoftJsonFile(IConfigurationBuilder, String, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddNewtonsoftJsonFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path, bool optional);
```

Adds the JSON configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: Whether the file is optional.

Returns: The `IConfigurationBuilder`.

To be added.

## NewtonsoftJsonConfigurationExtensions.AddNewtonsoftJsonFile(IConfigurationBuilder, String, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddNewtonsoftJsonFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path, bool optional, bool reloadOnChange);
```

Adds the JSON configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: Whether the file is optional.
- `reloadOnChange`: Whether the configuration should be reloaded if the file changes.

Returns: The `IConfigurationBuilder`.

To be added.

## NewtonsoftJsonConfigurationExtensions.AddNewtonsoftJsonFile(IConfigurationBuilder, IFileProvider, String, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddNewtonsoftJsonFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Microsoft.Extensions.FileProviders.IFileProvider provider, string path, bool optional, bool reloadOnChange);
```

Adds a JSON configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `provider`: The `IFileProvider` to use to access the file.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: Whether the file is optional.
- `reloadOnChange`: Whether the configuration should be reloaded if the file changes.

Returns: The `IConfigurationBuilder`.

To be added.

## NewtonsoftJsonConfigurationExtensions.AddNewtonsoftJsonStream(IConfigurationBuilder, Stream) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddNewtonsoftJsonStream (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, System.IO.Stream stream);
```

Adds a Newtonsoft JSON configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `stream`: The `Stream` to read the json configuration data from.

Returns: The `IConfigurationBuilder`.

To be added.
