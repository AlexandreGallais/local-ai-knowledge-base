---
title: "EmbeddedFileProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/EmbeddedFileProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EmbeddedFileProvider class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public class EmbeddedFileProvider : Microsoft.Extensions.FileProviders.IFileProvider
```

Looks up files using embedded resources in the specified assembly.
This file provider is case sensitive.

To be added.

## EmbeddedFileProvider.EmbeddedFileProvider(Assembly) constructor

```csharp
public EmbeddedFileProvider (System.Reflection.Assembly assembly);
```

Initializes a new instance of the `EmbeddedFileProvider` class using the specified
assembly with the base namespace defaulting to the assembly name.

Parameters:

- `assembly`: The assembly that contains the embedded resources.

To be added.

## EmbeddedFileProvider.EmbeddedFileProvider(Assembly, String) constructor

```csharp
public EmbeddedFileProvider (System.Reflection.Assembly assembly, string? baseNamespace);
```

Initializes a new instance of the `EmbeddedFileProvider` class using the specified
assembly and base namespace.

Parameters:

- `assembly`: The assembly that contains the embedded resources.
- `baseNamespace`: The base namespace that contains the embedded resources.

To be added.

## EmbeddedFileProvider.GetDirectoryContents(String) method

```csharp
public Microsoft.Extensions.FileProviders.IDirectoryContents GetDirectoryContents (string subpath);
```

Enumerate a directory at the given path, if any.
This file provider uses a flat directory structure. Everything under the base namespace is considered to be one
directory.

Parameters:

- `subpath`: The path that identifies the directory

Returns: Contents of the directory. Caller must check Exists property. A `NotFoundDirectoryContents` if no
resources were found that match `subpath`

To be added.

## EmbeddedFileProvider.GetFileInfo(String) method

```csharp
public Microsoft.Extensions.FileProviders.IFileInfo GetFileInfo (string subpath);
```

Locates a file at the given path.

Parameters:

- `subpath`: The path that identifies the file.

Returns: The file information. Caller must check Exists property. A `NotFoundFileInfo` if the file could
not be found.

To be added.

## EmbeddedFileProvider.Watch(String) method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken Watch (string pattern);
```

Embedded files do not change.

Parameters:

- `pattern`: This parameter is ignored

Returns: A `NullChangeToken`

To be added.
