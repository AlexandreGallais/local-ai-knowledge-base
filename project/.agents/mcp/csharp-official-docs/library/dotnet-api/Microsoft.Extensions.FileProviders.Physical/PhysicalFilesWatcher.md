---
title: "PhysicalFilesWatcher class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders.Physical/PhysicalFilesWatcher.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PhysicalFilesWatcher class

Namespace: `Microsoft.Extensions.FileProviders.Physical`

```csharp
public class PhysicalFilesWatcher : IDisposable
```

Watches a physical file system for changes and triggers events on
`IChangeToken` when files or directories are created, changed, renamed, or deleted.

To be added.

## PhysicalFilesWatcher.PhysicalFilesWatcher(String, FileSystemWatcher, Boolean) constructor

```csharp
public PhysicalFilesWatcher (string root, System.IO.FileSystemWatcher? fileSystemWatcher, bool pollForChanges);
```

Initializes a new instance of the `PhysicalFilesWatcher` class that watches files in `root`.

Parameters:

- `root`: The root directory for the watcher.
- `fileSystemWatcher`: The wrapped watcher that's watching `root`.
- `pollForChanges`: `true` for the poller to use polling to trigger instances of
`IChangeToken` created by `PhysicalFilesWatcher.CreateFileChangeToken`; otherwise, `false`.

To be added.

## PhysicalFilesWatcher.PhysicalFilesWatcher(String, FileSystemWatcher, Boolean, ExclusionFilters) constructor

```csharp
public PhysicalFilesWatcher (string root, System.IO.FileSystemWatcher? fileSystemWatcher, bool pollForChanges, Microsoft.Extensions.FileProviders.Physical.ExclusionFilters filters);
```

Initializes a new instance of the `PhysicalFilesWatcher` class that watches files in `root`.

Parameters:

- `root`: The root directory for the watcher.
- `fileSystemWatcher`: The wrapped watcher that is watching `root`.
- `pollForChanges`: `true` for the poller to use polling to trigger instances of
`IChangeToken` created by `PhysicalFilesWatcher.CreateFileChangeToken`; otherwise, `false`.
- `filters`: A bitwise combination of the enumeration values that specifies which files or directories are excluded. Notifications of changes to these are not raised.

To be added.

## PhysicalFilesWatcher.CreateFileChangeToken(String) method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> (string filter);
```

Creates an instance of `IChangeToken` for all files and directories that match the
`filter`.

Parameters:

- `filter`: A globbing pattern for files and directories to watch.

Returns: A change token for all files and directories that match the filter.

Exceptions:

- `ArgumentNullException`: `filter` is `null`.

Globbing patterns are relative to the root directory given in the constructor
`PhysicalFilesWatcher.#ctor`. Globbing patterns
are interpreted by `Matcher`.

## PhysicalFilesWatcher.Dispose() method

```csharp
public void Dispose ();
```

Disposes the provider. Change tokens may not trigger after the provider is disposed.

To be added.

## PhysicalFilesWatcher.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Disposes the provider.

Parameters:

- `disposing`: `true` if invoked from `IDisposable.Dispose`; otherwise, `false`.

To be added.
