---
title: "CompositeFileProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/CompositeFileProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompositeFileProvider class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public class CompositeFileProvider : Microsoft.Extensions.FileProviders.IFileProvider
```

Looks up files using a collection of `IFileProvider`.

To be added.

## CompositeFileProvider.CompositeFileProvider(IFileProvider[]) constructor

```csharp
public CompositeFileProvider (params Microsoft.Extensions.FileProviders.IFileProvider[]? fileProviders);
```

Initializes a new instance of the `CompositeFileProvider` class using a collection of file provider objects.

Parameters:

- `fileProviders`: The collection of `IFileProvider` objects.

To be added.

## CompositeFileProvider.CompositeFileProvider(IFileProvider>) constructor

```csharp
public CompositeFileProvider (System.Collections.Generic.IEnumerable<Microsoft.Extensions.FileProviders.IFileProvider> fileProviders);
```

Initializes a new instance of the `CompositeFileProvider` class using a collection of file provider objects.

Parameters:

- `fileProviders`: The collection of `IFileProvider` objects.

To be added.

## CompositeFileProvider.FileProviders property

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.FileProviders.IFileProvider> FileProviders { get; }
```

Gets the list of configured `IFileProvider` instances.

Returns: To be added.

To be added.

## CompositeFileProvider.GetDirectoryContents(String) method

```csharp
public Microsoft.Extensions.FileProviders.IDirectoryContents GetDirectoryContents (string subpath);
```

Enumerates a directory at the given path, if any.

Parameters:

- `subpath`: The path that identifies the directory.

Returns: The contents of the directory. Caller must check Exists property.
The content is a merge of the contents of the provided `IFileProvider`.
When there are multiple `IFileInfo` objects with the same Name property, only the first one is included in the results.

The caller must check the `IFileInfo.Exists` property.
The content is a merge of the contents of the provided `IFileProvider`.
When there are multiple `IFileInfo` objects with the same `IFileInfo.Name` property, only the first one is included in the results.

## CompositeFileProvider.GetFileInfo(String) method

```csharp
public Microsoft.Extensions.FileProviders.IFileInfo GetFileInfo (string subpath);
```

Locates a file at the given path.

Parameters:

- `subpath`: The path that identifies the file.

Returns: The file information. The caller must check the `IFileInfo.Exists` property. This is the first existing `IFileInfo` returned by the provided `IFileProvider` or a not found `IFileInfo` if no existing files are found.

The caller must check the `IFileInfo.Exists` property. This method returns the first existing `IFileInfo` returned by the provided `IFileProvider`, or a `NotFoundFileInfo` if no existing files are found.

## CompositeFileProvider.Watch(String) method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken Watch (string pattern);
```

Creates a `IChangeToken` for the specified `pattern`.

Parameters:

- `pattern`: A filter string used to determine what files or folders to monitor. Examples: \*\*/\*.cs, \*.\*, subFolder/\*\*/\*.cshtml.

Returns: An `IChangeToken` that is notified when a file matching `pattern` is added, modified, or deleted.
The change token will be notified when one of the change token <example-value> by the provided `IFileProvider` is notified.

The change token is notified when one of the change tokens returned by the provided `IFileProvider` is notified.
