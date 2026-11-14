---
title: "FileSystemWatcher class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileSystemWatcher.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemWatcher class (part 2 of 3)

## FileSystemWatcher.IncludeSubdirectories property

```csharp
public bool IncludeSubdirectories { get; set; }
```

Gets or sets a value indicating whether subdirectories within the specified path should be monitored.

Returns: `true` if you want to monitor subdirectories; otherwise, `false`. The default is `false`.

#### Remarks
Set `FileSystemWatcher.IncludeSubdirectories` to `true` when you want to watch for change notifications for files and directories contained within the directory specified through the `Path` property, and its subdirectories. Setting the `IncludeSubdirectories` property to `false` helps reduce the number of notifications sent to the internal buffer. For more information on filtering out unwanted notifications, see the `FileSystemWatcher.NotifyFilter` and `FileSystemWatcher.InternalBufferSize` properties.

When `true`, `FileSystemWatcher.IncludeSubdirectories` is recursive through the entire subtree, not just the immediate child directories. The relative path to a file or directory within the subtree returns in the `Name` property of `FileSystemEventArgs` and the `OldName` property of `RenamedEventArgs`, depending on changes you are watching for. You can get the fully qualified path from the `FullPath` property of `FileSystemEventArgs` and the `OldFullPath` property of `RenamedEventArgs`, depending on the changes you are watching for.

If a directory is created in the subtree of the directory you are watching, and `FileSystemWatcher.IncludeSubdirectories` is `true`, that directory will automatically be watched.

## FileSystemWatcher.InternalBufferSize property

```csharp
public int InternalBufferSize { get; set; }
```

Gets or sets the size (in bytes) of the internal buffer.

Returns: The internal buffer size in bytes. The default is 8192 (8 KB).

#### Remarks
You can set the buffer to 4 KB or larger, but it must not exceed 64 KB. If you try to set the `InternalBufferSize` property to less than 4096 bytes, your value is discarded and the `InternalBufferSize` property is set to 4096 bytes. For best performance, use a multiple of 4 KB on Intel-based computers.

The system notifies the component of file changes, and it stores those changes in a buffer the component creates and passes to the APIs. Each event can use up to 16 bytes of memory, not including the file name. If there are many changes in a short time, the buffer can overflow. This causes the component to lose track of changes in the directory, and it will only provide blanket notification. Increasing the size of the buffer can prevent missing file system change events. However, increasing buffer size is expensive, because it comes from non-paged memory that cannot be swapped out to disk, so keep the buffer as small as possible. To avoid a buffer overflow, use the `FileSystemWatcher.NotifyFilter` and `FileSystemWatcher.IncludeSubdirectories` properties to filter out unwanted change notifications.

## FileSystemWatcher.NotifyFilter property

```csharp
public System.IO.NotifyFilters NotifyFilter { get; set; }
```

Gets or sets the type of changes to watch for.

Returns: One of the `NotifyFilters` values. The default is the bitwise OR combination of `LastWrite`, `FileName`, and `DirectoryName`.

Exceptions:

- `ArgumentException`: The value is not a valid bitwise OR combination of the `NotifyFilters` values.
- `InvalidEnumArgumentException`: The value that is being set is not valid.

#### Remarks
You can combine the members of the `NotifyFilters` enumeration to watch for more than one type of change at a time. For example, you can watch for changes in size of a file, and for changes in the `LastWrite` time. This raises an event anytime there is a change in file or folder size, or a change in the `LastWrite` time of the file or folder.

This is one way to filter out unwanted notifications. For more information on filtering out unwanted notifications, see the `FileSystemWatcher.Filter`, `FileSystemWatcher.IncludeSubdirectories`, and `FileSystemWatcher.InternalBufferSize` properties.

#### Examples
The following example creates a `FileSystemWatcher` to watch the directory specified at run time. The component is set to watch for changes in `LastWrite` and `LastAccess` time, the creation, deletion, or renaming of text files in the directory. If a file is changed, created, or deleted, the path to the file prints to the console. When a file is renamed, the old and new paths print to the console.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.Path property

```csharp
public string Path { get; set; }
```

Gets or sets the path of the directory to watch.

Returns: The path to monitor. The default is an empty string ("").

Exceptions:

- `ArgumentException`: The specified path does not exist or could not be found.

-or-

The specified path contains wildcard characters.

-or-

The specified path contains invalid path characters.

#### Remarks
This is a fully qualified path to a directory. If the `IncludeSubdirectories` property is `true`, this directory is the root at which the system watches for changes; otherwise it is the only directory watched. To watch a specific file, set the `Path` property to the fully qualified, correct directory, and the `Filter` property to the file name.

The `Path` property supports Universal Naming Convention (UNC) paths.

> **Note:**
> This property must be set before the component can watch for changes.

When a directory is renamed, the `FileSystemWatcher` automatically reattaches itself to the newly renamed item. For example, if you set the `Path` property to "C:\My Documents" and then manually rename the directory to "C:\Your Documents", the component continues listening for change notifications on the newly renamed directory. However, when you ask for the `Path` property, it contains the old path. This happens because the component determines what directory watches based on the handle, rather than the name of the directory. Renaming does not affect the handle. So, if you destroy the component, and then recreate it without updating the `Path` property, your application will fail because the directory no longer exists.

#### Examples
The following example creates a `FileSystemWatcher` to watch the directory specified at run time. The component is set to watch for changes in `LastWrite` and `LastAccess` time, the creation, deletion, or renaming of text files in the directory. If a file is changed, created, or deleted, the path to the file prints to the console. When a file is renamed, the old and new paths print to the console.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.Site property

```csharp
public override System.ComponentModel.ISite? Site { get; set; }
```

Gets or sets an `ISite` for the `FileSystemWatcher`.

Returns: An `ISite` for the `FileSystemWatcher`.

#### Remarks
Sites bind a `Component` to a `IDesignerHost.Container` and enable communication between them, as well as provide a way for the container to manage its components.

## FileSystemWatcher.SynchronizingObject property

```csharp
public System.ComponentModel.ISynchronizeInvoke? SynchronizingObject { get; set; }
```

Gets or sets the object used to marshal the event handler calls issued as a result of a directory change.

Returns: The `ISynchronizeInvoke` that represents the object used to marshal the event handler calls issued as a result of a directory change. The default is `null`.

#### Remarks
When `FileSystemWatcher.SynchronizingObject` is `null`, methods handling the `Changed`, `Created`, `Deleted`, and `Renamed` events are called on a thread from the system thread pool. For more information on system thread pools, see `ThreadPool`.

When the `Changed`, `Created`, `Deleted`, and `Renamed` events are handled by a visual Windows Forms component, such as a `Button`, accessing the component through the system thread pool might not work, or may result in an exception. Avoid this by setting `FileSystemWatcher.SynchronizingObject` to a Windows Forms component, which causes the methods that handle the `Changed`, `Created`, `Deleted`, and `Renamed` events to be called on the same thread on which the component was created.

If the `FileSystemWatcher` is used inside Visual Studio 2005 in a Windows Forms designer, `FileSystemWatcher.SynchronizingObject` automatically sets to the control that contains the `FileSystemWatcher`. For example, if you place a `FileSystemWatcher` on a designer for Form1 (which inherits from `Form`) the `SynchronizingObject` property of `FileSystemWatcher` is set to the instance of Form1.

## FileSystemWatcher.BeginInit() method

```csharp
public void BeginInit ();
```

Begins the initialization of a `FileSystemWatcher` used on a form or used by another component. The initialization occurs at run time.

#### Remarks
The Visual Studio 2005 design environment uses this method to start the initialization of a component used on a form or used by another component. The `FileSystemWatcher.EndInit` method ends the initialization. Using the `FileSystemWatcher.BeginInit` and `FileSystemWatcher.EndInit` methods prevents the control from being used before it is fully initialized.

## FileSystemWatcher.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `FileSystemWatcher` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `FileSystemWatcher.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `FileSystemWatcher.Dispose` with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `DeflateStream` references. This method invokes the `Dispose` method of each referenced object.

## FileSystemWatcher.EndInit() method

```csharp
public void EndInit ();
```

Ends the initialization of a `FileSystemWatcher` used on a form or used by another component. The initialization occurs at run time.

#### Remarks
The Visual Studio 2005 design environment uses this method to end the initialization of a component used on a form or used by another component. The `FileSystemWatcher.BeginInit` method starts the initialization. Using the `FileSystemWatcher.BeginInit` and `FileSystemWatcher.EndInit` methods prevents the control from being used before it is fully initialized.

## FileSystemWatcher.OnChanged(FileSystemEventArgs) method

```csharp
protected void OnChanged (System.IO.FileSystemEventArgs e);
```

Raises the `FileSystemWatcher.Changed` event.

Parameters:

- `e`: A `FileSystemEventArgs` that contains the event data.

#### Remarks
`FileSystemWatcher.OnChanged` is called when changes are made to the size, system attributes, last write time, last access time, or security permissions of a file or directory in the directory being monitored.

Use the `NotifyFilter` property to restrict the number of events raised when the `Changed` event is handled.

The `FileSystemWatcher.OnCreated` event is raised as soon as a file is created. If a file is being copied or transferred into a watched directory, the `FileSystemWatcher.OnCreated` event will be raised immediately, followed by one or more `FileSystemWatcher.OnChanged` events.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

## FileSystemWatcher.OnCreated(FileSystemEventArgs) method

```csharp
protected void OnCreated (System.IO.FileSystemEventArgs e);
```

Raises the `FileSystemWatcher.Created` event.

Parameters:

- `e`: A `FileSystemEventArgs` that contains the event data.

#### Remarks
`FileSystemWatcher.OnCreated` is called when a file or directory is created in the directory being monitored.

Some common occurrences, such as copying or moving a file or directory, do not correspond directly to an event, but these occurrences do cause events to be raised. When you copy a file or directory, the system raises a `Created` event in the directory to which the file was copied, if that directory is being watched. If the directory from which you copied was being watched by another instance of `FileSystemWatcher`, no event would be raised. For example, you create two instances of `FileSystemWatcher`. FileSystemWatcher1 is set to watch "C:\My Documents", and FileSystemWatcher2 is set to watch "C:\Your Documents". If you copy a file from "My Documents" and paste it into "Your Documents", a `Created` event will be raised in FileSystemWatcher2, but no event is raised for FileSystemWatcher1. Unlike copying, moving a file or directory raises two events. From the previous example, if you moved a file from "My Documents" to "Your Documents", a `Created` event would be raised in FileSystemWatcher2 and a `Deleted` event would be raised in FileSystemWatcher1.

The `FileSystemWatcher.OnCreated` event is raised as soon as a file is created. If a file is being copied or transferred into a watched directory, the `FileSystemWatcher.OnCreated` event will be raised immediately, followed by one or more `FileSystemWatcher.OnChanged` events.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.
