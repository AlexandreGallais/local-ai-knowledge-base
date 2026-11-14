---
title: "NullFileProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/NullFileProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullFileProvider class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public class NullFileProvider : Microsoft.Extensions.FileProviders.IFileProvider
```

An empty file provider with no contents.

To be added.

## NullFileProvider.NullFileProvider() constructor

```csharp
public NullFileProvider ();
```

Initializes a new instance of the `NullFileProvider` class.

To be added.

## NullFileProvider.GetDirectoryContents(String) method

```csharp
public Microsoft.Extensions.FileProviders.IDirectoryContents GetDirectoryContents (string subpath);
```

Enumerates a nonexistent directory.

Parameters:

- `subpath`: A path under the root directory. This parameter is ignored.

Returns: A `IDirectoryContents` that does not exist and does not contain any contents.

To be added.

## NullFileProvider.GetFileInfo(String) method

```csharp
public Microsoft.Extensions.FileProviders.IFileInfo GetFileInfo (string subpath);
```

Locates a nonexistent file.

Parameters:

- `subpath`: A path under the root directory.

Returns: A `IFileInfo` representing a nonexistent file at the given path.

To be added.

## NullFileProvider.Watch(String) method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken Watch (string filter);
```

Returns a `IChangeToken` that monitors nothing.

Parameters:

- `filter`: Filter string used to determine what files or folders to monitor. This parameter is ignored.

Returns: A `IChangeToken` that does not register callbacks.

To be added.
