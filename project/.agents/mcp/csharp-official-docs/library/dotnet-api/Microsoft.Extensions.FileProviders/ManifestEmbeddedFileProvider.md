---
title: "ManifestEmbeddedFileProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/ManifestEmbeddedFileProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ManifestEmbeddedFileProvider class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public class ManifestEmbeddedFileProvider : Microsoft.Extensions.FileProviders.IFileProvider
```

An embedded file provider that uses a manifest compiled in the assembly to
reconstruct the original paths of the embedded files when they were embedded
into the assembly.

To be added.

## ManifestEmbeddedFileProvider.ManifestEmbeddedFileProvider(Assembly) constructor

```csharp
public ManifestEmbeddedFileProvider (System.Reflection.Assembly assembly);
```

Initializes a new instance of `ManifestEmbeddedFileProvider`.

Parameters:

- `assembly`: The assembly containing the embedded files.

To be added.

## ManifestEmbeddedFileProvider.ManifestEmbeddedFileProvider(Assembly, String) constructor

```csharp
public ManifestEmbeddedFileProvider (System.Reflection.Assembly assembly, string root);
```

Initializes a new instance of `ManifestEmbeddedFileProvider`.

Parameters:

- `assembly`: The assembly containing the embedded files.
- `root`: The relative path from the root of the manifest to use as root for the provider.

To be added.

## ManifestEmbeddedFileProvider.ManifestEmbeddedFileProvider(Assembly, String, DateTimeOffset) constructor

```csharp
public ManifestEmbeddedFileProvider (System.Reflection.Assembly assembly, string root, DateTimeOffset lastModified);
```

Initializes a new instance of `ManifestEmbeddedFileProvider`.

Parameters:

- `assembly`: The assembly containing the embedded files.
- `root`: The relative path from the root of the manifest to use as root for the provider.
- `lastModified`: The LastModified date to use on the `IFileInfo` instances
returned by this `IFileProvider`.

To be added.

## ManifestEmbeddedFileProvider.ManifestEmbeddedFileProvider(Assembly, String, String, DateTimeOffset) constructor

```csharp
public ManifestEmbeddedFileProvider (System.Reflection.Assembly assembly, string root, string manifestName, DateTimeOffset lastModified);
```

Initializes a new instance of `ManifestEmbeddedFileProvider`.

Parameters:

- `assembly`: The assembly containing the embedded files.
- `root`: The relative path from the root of the manifest to use as root for the provider.
- `manifestName`: The name of the embedded resource containing the manifest.
- `lastModified`: The LastModified date to use on the `IFileInfo` instances
returned by this `IFileProvider`.

To be added.

## ManifestEmbeddedFileProvider.Assembly property

```csharp
public System.Reflection.Assembly Assembly { get; }
```

Gets the `ManifestEmbeddedFileProvider.Assembly` for this provider.

Returns: To be added.

To be added.

## ManifestEmbeddedFileProvider.GetDirectoryContents(String) method

```csharp
public Microsoft.Extensions.FileProviders.IDirectoryContents GetDirectoryContents (string subpath);
```

Enumerate a directory at the given path, if any.

Parameters:

- `subpath`: Relative path that identifies the directory.

Returns: Returns the contents of the directory.

To be added.

## ManifestEmbeddedFileProvider.GetFileInfo(String) method

```csharp
public Microsoft.Extensions.FileProviders.IFileInfo GetFileInfo (string subpath);
```

Locate a file at the given path.

Parameters:

- `subpath`: Relative path that identifies the file.

Returns: The file information. Caller must check Exists property.

To be added.

## ManifestEmbeddedFileProvider.Watch(String) method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken Watch (string filter);
```

Creates a `IChangeToken` for the specified `filter`.

Parameters:

- `filter`: Filter string used to determine what files or folders to monitor. Example: **/*.cs, *.*, subFolder/**/*.cshtml.

Returns: An `IChangeToken` that is notified when a file matching `filter` is added, modified or deleted.

To be added.
