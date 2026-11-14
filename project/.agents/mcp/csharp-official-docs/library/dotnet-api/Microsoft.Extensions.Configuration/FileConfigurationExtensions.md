---
title: "FileConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/FileConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class FileConfigurationExtensions
```

Provides extension methods for `FileConfigurationProvider`.

#### Remarks

For more information and examples, see File configuration provider.

## FileConfigurationExtensions.GetFileLoadExceptionHandler(IConfigurationBuilder) method

```csharp
public static Action<Microsoft.Extensions.Configuration.FileLoadExceptionContext>? GetFileLoadExceptionHandler (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Gets a default action to be invoked for file-based providers when an error occurs.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: The The Action to be invoked on a file load exception, if set.

To be added.

## FileConfigurationExtensions.GetFileProvider(IConfigurationBuilder) method

```csharp
public static Microsoft.Extensions.FileProviders.IFileProvider GetFileProvider (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Gets the default `IFileProvider` to be used for file-based providers.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: The default `IFileProvider`.

To be added.

## FileConfigurationExtensions.SetBasePath(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder SetBasePath (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string basePath);
```

Sets the FileProvider for file-based providers to a PhysicalFileProvider with the base path.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `basePath`: The absolute path of file-based providers.

Returns: The `IConfigurationBuilder`.

To be added.

## FileConfigurationExtensions.SetFileLoadExceptionHandler(IConfigurationBuilder, FileLoadExceptionContext>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder SetFileLoadExceptionHandler (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<Microsoft.Extensions.Configuration.FileLoadExceptionContext> handler);
```

Sets a default action to be invoked for file-based providers when an error occurs.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `handler`: The Action to be invoked on a file load exception.

Returns: The `IConfigurationBuilder`.

To be added.

## FileConfigurationExtensions.SetFileProvider(IConfigurationBuilder, IFileProvider) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder SetFileProvider (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Microsoft.Extensions.FileProviders.IFileProvider fileProvider);
```

Sets the default `IFileProvider` to be used for file-based providers.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `fileProvider`: The default file provider instance.

Returns: The `IConfigurationBuilder`.

To be added.
