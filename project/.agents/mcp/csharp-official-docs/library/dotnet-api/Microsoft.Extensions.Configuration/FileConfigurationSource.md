---
title: "FileConfigurationSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/FileConfigurationSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileConfigurationSource class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public abstract class FileConfigurationSource : Microsoft.Extensions.Configuration.IConfigurationSource
```

Provides the base class for file-based `IConfigurationSource`.

To be added.

## FileConfigurationSource.FileConfigurationSource() constructor

```csharp
protected FileConfigurationSource ();
```

Initializes a new instance of `FileConfigurationSource`.

To be added.

## FileConfigurationSource.FileProvider property

```csharp
public Microsoft.Extensions.FileProviders.IFileProvider? FileProvider { get; set; }
```

Gets or sets the provider used to access the contents of the file.

Returns: To be added.

To be added.

## FileConfigurationSource.OnLoadException property

```csharp
public Action<Microsoft.Extensions.Configuration.FileLoadExceptionContext>? OnLoadException { get; set; }
```

Gets or sets the action that's called if an uncaught exception occurs in FileConfigurationProvider.Load.

Returns: To be added.

When `FileConfigurationSource.ReloadOnChange` is enabled, this callback is also invoked on background reload failures.
If the callback is not set or does not set `FileLoadExceptionContext.Ignore` to `true`,
exceptions from background reloads will propagate unhandled on the thread pool.

## FileConfigurationSource.Optional property

```csharp
public bool Optional { get; set; }
```

Gets or sets a value that indicates whether loading the file is optional.

Returns: To be added.

To be added.

## FileConfigurationSource.Path property

```csharp
public string? Path { get; set; }
```

Gets or sets the path to the file.

Returns: To be added.

To be added.

## FileConfigurationSource.ReloadDelay property

```csharp
public int ReloadDelay { get; set; }
```

Gets or sets the number of milliseconds that reload will wait before calling Load.

Returns: The number of milliseconds that reload waits before calling Load. The default is 250.

This delay helps avoid triggering reload before a file is completely written.

## FileConfigurationSource.ReloadOnChange property

```csharp
public bool ReloadOnChange { get; set; }
```

Gets or sets a value that indicates whether the source will be loaded if the underlying file changes.

Returns: To be added.

To be added.

## FileConfigurationSource.Build(IConfigurationBuilder) method

```csharp
public abstract Microsoft.Extensions.Configuration.IConfigurationProvider Build (Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Builds the `IConfigurationProvider` for this source.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: To be added.

To be added.

## FileConfigurationSource.EnsureDefaults(IConfigurationBuilder) method

```csharp
public void EnsureDefaults (Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Called to use any default settings on the builder like the FileProvider or FileLoadExceptionHandler.

Parameters:

- `builder`: The `IConfigurationBuilder`.

To be added.

## FileConfigurationSource.ResolveFileProvider() method

```csharp
public void ResolveFileProvider ();
```

Creates a physical file provider for the file's directory if no file provider has been set, for absolute Path.

To be added.
