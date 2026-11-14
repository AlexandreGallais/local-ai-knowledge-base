---
title: "FileSystemWatcher class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileSystemWatcher.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemWatcher class (part 3 of 3)

## FileSystemWatcher.OnDeleted(FileSystemEventArgs) method

```csharp
protected void OnDeleted (System.IO.FileSystemEventArgs e);
```

Raises the `FileSystemWatcher.Deleted` event.

Parameters:

- `e`: A `FileSystemEventArgs` that contains the event data.

#### Remarks
`FileSystemWatcher.OnDeleted` is called when a file or directory, within the directory being monitored, is deleted.

Some common occurrences, such as copying or moving a file or directory, do not correspond directly to an event, but these occurrences do cause events to be raised. When you copy a file or directory, the system raises a `Created` event in the directory to which the file was copied, if that directory is being watched. If the directory from which you copied was being watched by another instance of `FileSystemWatcher`, no event would be raised. For example, you create two instances of `FileSystemWatcher`. FileSystemWatcher1 is set to watch "C:\My Documents", and FileSystemWatcher2 is set to watch "C:\Your Documents". If you copy a file from "My Documents" into "Your Documents", a `Created` event will be raised by FileSystemWatcher2, but no event is raised for FileSystemWatcher1. Unlike copying, moving a file or directory raises two events. From the previous example, if you moved a file from "My Documents" to "Your Documents", a `Created` event would be raised by FileSystemWatcher2 and a `Deleted` event would be raised by FileSystemWatcher1.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

## FileSystemWatcher.OnError(ErrorEventArgs) method

```csharp
protected void OnError (System.IO.ErrorEventArgs e);
```

Raises the `FileSystemWatcher.Error` event.

Parameters:

- `e`: An `ErrorEventArgs` that contains the event data.

#### Remarks
`FileSystemWatcher.OnError` is called when an error occurs.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

## FileSystemWatcher.OnRenamed(RenamedEventArgs) method

```csharp
protected void OnRenamed (System.IO.RenamedEventArgs e);
```

Raises the `FileSystemWatcher.Renamed` event.

Parameters:

- `e`: A `RenamedEventArgs` that contains the event data.

#### Remarks
`FileSystemWatcher.OnRenamed` is called when a file or directory within the directory being monitored is renamed. Its `RenamedEventArgs` argument contains information about the renaming operation, such as the type of change, the old and new path, and the old and new name. Note that its `Name` property may be null for renamed events if the `FileSystemWatcher` does not get matching old and new name events from the operating system.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

## FileSystemWatcher.WaitForChanged(WatcherChangeTypes) method

```csharp
public System.IO.WaitForChangedResult WaitForChanged (System.IO.WatcherChangeTypes changeType);
```

A synchronous method that returns a structure that contains specific information on the change that occurred, given the type of change you want to monitor.

Parameters:

- `changeType`: The `WatcherChangeTypes` to watch for.

Returns: A `WaitForChangedResult` that contains specific information on the change that occurred.

#### Remarks
This method waits indefinitely until the first change occurs and then returns. This is the same as using `FileSystemWatcher.WaitForChanged` with the `timeout` parameter set to -1.

> **Note:**
> This method allows an event handler to be invoked to respond to file changes even if the `EnableRaisingEvents` property is set to `false`.

In some systems, `FileSystemWatcher` reports changes to files using the short 8.3 file name format. For example, a change to  "LongFileName.LongExtension" could be reported as "LongFi~.Lon".

## FileSystemWatcher.WaitForChanged(WatcherChangeTypes, Int32) method

```csharp
public System.IO.WaitForChangedResult WaitForChanged (System.IO.WatcherChangeTypes changeType, int timeout);
```

A synchronous method that returns a structure that contains specific information on the change that occurred, given the type of change you want to monitor and the time (in milliseconds) to wait before timing out.

Parameters:

- `changeType`: The `WatcherChangeTypes` to watch for.
- `timeout`: The time (in milliseconds) to wait before timing out.

Returns: A `WaitForChangedResult` that contains specific information on the change that occurred.

#### Remarks
This method waits until a change occurs or it has timed out. A value of -1 for the `timeout` parameter means wait indefinitely.

> **Note:**
> This method allows an event handler to be invoked to respond to file changes even if the `EnableRaisingEvents` property is set to `false`.

In some systems, `FileSystemWatcher` reports changes to files using the short 8.3 file name format. For example, a change to  "LongFileName.LongExtension" could be reported as "LongFi~.Lon".

## FileSystemWatcher.WaitForChanged(WatcherChangeTypes, TimeSpan) method

```csharp
public System.IO.WaitForChangedResult WaitForChanged (System.IO.WatcherChangeTypes changeType, TimeSpan timeout);
```

Synchronously returns a structure that contains specific information on the change that occurred, given the type of change to monitor.

Parameters:

- `changeType`: The `WatcherChangeTypes` to watch for.
- `timeout`: The amount of time to wait before timing out.

Returns: A `WaitForChangedResult` that contains specific information on the change that occurred.

See `FileSystemWatcher.WaitForChanged` remarks.

## FileSystemWatcher.Changed event

```csharp
public event System.IO.FileSystemEventHandler? Changed;
```

Occurs when a file or directory in the specified `FileSystemWatcher.Path` is changed.

#### Remarks
The `Changed` event is raised when changes are made to the size, system attributes, last write time, last access time, or security permissions of a file or directory in the directory being monitored.

> **Note:**
> Common file system operations might raise more than one event. For example, when a file is moved from one directory to another, several `FileSystemWatcher.OnChanged` and some `FileSystemWatcher.OnCreated` and `FileSystemWatcher.OnDeleted` events might be raised. Moving a file is a complex operation that consists of multiple simple operations, therefore raising multiple events. Likewise, some applications (for example, antivirus software) might cause additional file system events that are detected by `FileSystemWatcher`.

Use `FileSystemWatcher.NotifyFilter` to restrict the number of notifications raised when this event is handled.

> **Note:**
> The `Changed` event is raised unexpectedly when a file is renamed, but is not raised when a directory is renamed. To watch for renaming, use the `Renamed` event.

> **Note:**
> The order in which the `Changed` event is raised in relation to the other `FileSystemWatcher` events may change when the `SynchronizingObject` property is not `null`.

#### Examples
The following example uses the `Changed` event to display the file path to the console whenever the watched file is changed.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.Created event

```csharp
public event System.IO.FileSystemEventHandler? Created;
```

Occurs when a file or directory in the specified `FileSystemWatcher.Path` is created.

#### Remarks
Some common occurrences, such as copying or moving a file or directory, do not correspond directly to an event, but these occurrences do cause events to be raised. When you copy a file or directory, the system raises a `Created` event in the directory to which the file was copied, if that directory is being watched. If the directory from which you copied was being watched by another instance of `FileSystemWatcher`, no event would be raised. For example, you create two instances of `FileSystemWatcher`. FileSystemWatcher1 is set to watch "C:\My Documents", and FileSystemWatcher2 is set to watch "C:\Your Documents". If you copy a file from "My Documents" into "Your Documents", a `Created` event will be raised by FileSystemWatcher2, but no event is raised for FileSystemWatcher1. Unlike copying, moving a file or directory would raise two events. From the previous example, if you moved a file from "My Documents" to "Your Documents", a `Created` event would be raised by FileSystemWatcher2 and a `Deleted` event would be raised by FileSystemWatcher1.

> **Note:**
> Common file system operations might raise more than one event. For example, when a file is moved from one directory to another, several `FileSystemWatcher.OnChanged` and some `FileSystemWatcher.OnCreated` and `FileSystemWatcher.OnDeleted` events might be raised. Moving a file is a complex operation that consists of multiple simple operations, therefore raising multiple events. Likewise, some applications (for example, antivirus software) might cause additional file system events that are detected by `FileSystemWatcher`.

> **Note:**
> The order in which the `Created` event is raised in relation to the other `FileSystemWatcher` events may change when the `SynchronizingObject` property is not `null`.

The `FileSystemWatcher.OnCreated` event is raised as soon as a file is created. If a file is being copied or transferred into a watched directory, the `FileSystemWatcher.OnCreated` event will be raised immediately, followed by one or more `FileSystemWatcher.OnChanged` events.

#### Examples
The following example uses the `Created` event to display the file path to the console whenever the watched file is created.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.Deleted event

```csharp
public event System.IO.FileSystemEventHandler? Deleted;
```

Occurs when a file or directory in the specified `FileSystemWatcher.Path` is deleted.

#### Remarks
Some common occurrences, such as copying or moving a file or directory, do not correspond directly to an event, but these occurrences do cause events to be raised. When you copy a file or directory, the system raises a `Created` event in the directory to which the file was copied, if that directory is being watched. If the directory from which you copied was being watched by another instance of `FileSystemWatcher`, no event would be raised. For example, you create two instances of `FileSystemWatcher`. FileSystemWatcher1 is set to watch "C:\My Documents", and FileSystemWatcher2 is set to watch "C:\Your Documents". If you copy a file from "My Documents" into "Your Documents", a `Created` event will be raised by FileSystemWatcher2, but no event is raised for FileSystemWatcher1. Unlike copying, moving a file or directory would raise two events. From the previous example, if you moved a file from "My Documents" to "Your Documents", a `Created` event would be raised by FileSystemWatcher2 and a `Deleted` event would be raised by FileSystemWatcher1.

> **Note:**
> Common file system operations might raise more than one event. For example, when a file is moved from one directory to another, several `FileSystemWatcher.OnChanged` and some `FileSystemWatcher.OnCreated` and `FileSystemWatcher.OnDeleted` events might be raised. Moving a file is a complex operation that consists of multiple simple operations, therefore raising multiple events. Likewise, some applications (for example, antivirus software) might cause additional file system events that are detected by `FileSystemWatcher`.

> **Note:**
> The order in which the `Deleted` event is raised in relation to the other `FileSystemWatcher` events may change when the `SynchronizingObject` property is not `null`.

#### Examples
The following example uses the `Deleted` event to display the file path to the console whenever the watched file is deleted.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.Error event

```csharp
public event System.IO.ErrorEventHandler? Error;
```

Occurs when the instance of `FileSystemWatcher` is unable to continue monitoring changes or when the internal buffer overflows.

#### Remarks
This event is raised whenever something prevents the `FileSystemWatcher` object from monitoring changes. For example, if the object is monitoring changes in a remote directory and the connection to that directory is lost, the `Error` event is raised.

The system notifies you of file changes, and it stores those changes in a buffer that the component creates and passes to the APIs. If there are many changes in a short time, the buffer can overflow. This causes the component to lose track of changes in the directory, and it will only provide blanket notification. Increasing the size of the buffer is expensive, because it comes from non paged memory that cannot be swapped out to disk, so keep the buffer as small as possible. To avoid a buffer overflow, use the `FileSystemWatcher.NotifyFilter`, `FileSystemWatcher.Filter`, and `FileSystemWatcher.IncludeSubdirectories` properties to filter out unwanted change notifications.

> **Note:**
> Common file system operations might raise more than one event. For example, when a file is moved from one directory to another, several `FileSystemWatcher.OnChanged` and some `FileSystemWatcher.OnCreated` and `FileSystemWatcher.OnDeleted` events might be raised. Moving a file is a complex operation that consists of multiple simple operations, therefore raising multiple events. Likewise, some applications (for example, antivirus software) might cause additional file system events that are detected by `FileSystemWatcher`.

## FileSystemWatcher.Renamed event

```csharp
public event System.IO.RenamedEventHandler? Renamed;
```

Occurs when a file or directory in the specified `FileSystemWatcher.Path` is renamed.

#### Remarks
The `Renamed` event is an `RenamedEventHandler` delegate that has the following signature:

```csharp
public delegate void Renamed(object sender, RenamedEventArgs e);
```
```vb
Public Delegate Sub RenamedEventHandler(sender As Object, e As RenamedEventArgs)
```
The `RenamedEventArgs` object provides information about the renaming operation, such as the type of the rename (the `ChangeType` property), the old and new name, and the old and new path. Note that the `Name` property may be null for renamed events if the `FileSystemWatcher` does not get matching old and new name events from the operating system.

Renaming the directory you are watching will not raise a notification. Notifications are only raised for entries inside the directory you are watching.

#### Examples
The following example uses the `Renamed` event to display the file path to the console whenever the watched file is renamed.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._
