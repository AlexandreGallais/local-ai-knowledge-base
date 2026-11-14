---
title: "IFileProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/IFileProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IFileProvider interface

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public interface IFileProvider
```

A read-only file provider abstraction.

To be added.

## IFileProvider.GetDirectoryContents(String) method

```csharp
public Microsoft.Extensions.FileProviders.IDirectoryContents GetDirectoryContents (string subpath);
```

Enumerates a directory at the given path, if any.

Parameters:

- `subpath`: The relative path that identifies the directory.

Returns: The contents of the directory.

To be added.

## IFileProvider.GetFileInfo(String) method

```csharp
public Microsoft.Extensions.FileProviders.IFileInfo GetFileInfo (string subpath);
```

Locates a file at the given path.

Parameters:

- `subpath`: The relative path that identifies the file.

Returns: The file information. Caller must check Exists property.

To be added.

## IFileProvider.Watch(String) method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken Watch (string filter);
```

Creates an `IChangeToken` for the specified `filter`.

Parameters:

- `filter`: A filter string used to determine what files or folders to monitor. Examples: **/*.cs, *.*, subFolder/**/*.cshtml.

Returns: An `IChangeToken` that is notified when a file matching `filter` is added, modified, or deleted.

To be added.
