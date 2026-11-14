---
title: "PhysicalFileProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/PhysicalFileProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PhysicalFileProvider class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public class PhysicalFileProvider : IDisposable, Microsoft.Extensions.FileProviders.IFileProvider
```

Looks up files using the on-disk file system.

When the environment variable "DOTNET_USE_POLLING_FILE_WATCHER" is set to "1" or "true", calls to
`PhysicalFileProvider.Watch` will use `PollingFileChangeToken`.

## PhysicalFileProvider.PhysicalFileProvider(String) constructor

```csharp
public PhysicalFileProvider (string root);
```

Initializes a new instance of the `PhysicalFileProvider` class at the given root directory.

Parameters:

- `root`: The root directory. This should be an absolute path.

To be added.

## PhysicalFileProvider.PhysicalFileProvider(String, ExclusionFilters) constructor

```csharp
public PhysicalFileProvider (string root, Microsoft.Extensions.FileProviders.Physical.ExclusionFilters filters);
```

Initializes a new instance of the `PhysicalFileProvider` class at the given root directory.

Parameters:

- `root`: The root directory. This should be an absolute path.
- `filters`: A bitwise combination of the enumeration values that specifies which files or directories are excluded.

To be added.

## PhysicalFileProvider.Root property

```csharp
public string Root { get; }
```

Gets the root directory for this instance.

Returns: To be added.

To be added.

## PhysicalFileProvider.UseActivePolling property

```csharp
public bool UseActivePolling { get; set; }
```

Gets or sets a value that determines if this instance of `PhysicalFileProvider`
actively polls for file changes.

Returns: `true` if the `IChangeToken` returned by `PhysicalFileProvider.Watch` actively polls for file changes
(`IChangeToken.ActiveChangeCallbacks` will be `true`) instead of being passive.
The default value of this property is determined by the value of environment variable named `DOTNET_USE_POLLING_FILE_WATCHER`.
When `true` or `1`, this property defaults to `true`; otherwise `false`.

This property is only effective when `PhysicalFileProvider.UsePollingFileWatcher` is set.

## PhysicalFileProvider.UsePollingFileWatcher property

```csharp
public bool UsePollingFileWatcher { get; set; }
```

Gets or sets a value that determines if this instance of `PhysicalFileProvider`
uses polling to determine file changes.

Returns: The default value of this property is determined by the value of environment variable named `DOTNET_USE_POLLING_FILE_WATCHER`.
When `true` or `1`, this property defaults to `true`; otherwise `false`.

By default, `PhysicalFileProvider`  uses `FileSystemWatcher` to listen to file change events
for `PhysicalFileProvider.Watch`. `FileSystemWatcher` is ineffective in some scenarios such as mounted drives.
Polling is required to effectively watch for file changes.

## PhysicalFileProvider.Dispose() method

```csharp
public void Dispose ();
```

Disposes the provider. Change tokens may not trigger after the provider is disposed.

To be added.

## PhysicalFileProvider.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Disposes the provider.

Parameters:

- `disposing`: `true` if invoked from `IDisposable.Dispose`; otherwise, `false`.

To be added.

## PhysicalFileProvider.GetDirectoryContents(String) method

```csharp
public Microsoft.Extensions.FileProviders.IDirectoryContents GetDirectoryContents (string subpath);
```

Enumerates a directory at the given path, if any.

Parameters:

- `subpath`: A path under the root directory. Leading slashes are ignored.

Returns: The contents of the directory.

The caller must check the `IDirectoryContents.Exists` property.

Returns `NotFoundDirectoryContents` if `subpath` is absolute,
if the directory does not exist, or `subpath` has invalid characters.

## PhysicalFileProvider.GetFileInfo(String) method

```csharp
public Microsoft.Extensions.FileProviders.IFileInfo GetFileInfo (string subpath);
```

Locates a file at the given path by directly mapping path segments to physical directories.

Parameters:

- `subpath`: A path under the root directory.

Returns: The file information. Caller must check the `IFileInfo.Exists` property.

To be added.

## PhysicalFileProvider.Watch(String) method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken Watch (string filter);
```

Creates a `IChangeToken` for the specified `filter`.

Globbing patterns are interpreted by `Matcher`.

Parameters:

- `filter`: Filter string used to determine what files or directories to monitor. Example: **/*.cs, *.*,
subDirectory/**/*.cshtml.

Returns: An `IChangeToken` that is notified when a file or directory matching `filter` is added,
modified, or deleted. Returns a `NullChangeToken` if `filter` has invalid filter
characters or if `filter` is an absolute path or outside the root directory specified in the
constructor `PhysicalFileProvider.#ctor`.

To be added.
