---
title: "WaitForChangedResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/WaitForChangedResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitForChangedResult struct

Namespace: `System.IO`

```csharp
public struct WaitForChangedResult
```

Contains information on the change that occurred.

#### Examples
This example shows how to use a `FileSystemWatcher` synchronously by having it wait for a specific file change notification to occur.

## WaitForChangedResult.ChangeType property

```csharp
public System.IO.WatcherChangeTypes ChangeType { get; set; }
```

Gets or sets the type of change that occurred.

Returns: One of the `WatcherChangeTypes` values.

To be added.

## WaitForChangedResult.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the file or directory that changed.

Returns: The name of the file or directory that changed.

#### Examples
The following example demonstrates the `Name` property. This code example is part of a larger example provided for the `WaitForChangedResult` structure.

## WaitForChangedResult.OldName property

```csharp
public string? OldName { get; set; }
```

Gets or sets the original name of the file or directory that was renamed.

Returns: The original name of the file or directory that was renamed.

To be added.

## WaitForChangedResult.TimedOut property

```csharp
public bool TimedOut { get; set; }
```

Gets or sets a value indicating whether the wait operation timed out.

Returns: `true` if the `FileSystemWatcher.WaitForChanged` method timed out; otherwise, `false`.

To be added.
