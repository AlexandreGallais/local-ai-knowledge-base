---
title: "FileSystemWatcher class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileSystemWatcher.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemWatcher class

Namespace: `System.IO`

```csharp
public class FileSystemWatcher : System.ComponentModel.Component, System.ComponentModel.ISupportInitialize
```

Listens to the file system change notifications and raises events when a directory, or file in a directory, changes.

Use `FileSystemWatcher` to watch for changes in a specified directory. You can watch for changes in files and subdirectories of the specified directory. You can create a component to watch files on a local computer, a network drive, or a remote computer.

To watch for changes in all files, set the `Filter` property to an empty string (`""`) or use wildcards (`"*.*"`). To watch a specific file, set the `Filter` property to the file name. For example, to watch for changes in the file MyDoc.txt, set the `Filter` property to `"MyDoc.txt"`. You can also watch for changes in a certain type of file. For example, to watch for changes in text files, set the `Filter` property to `"*.txt"`.

There are several types of changes you can watch for in a directory or file. For example, you can watch for changes in `Attributes`, the `LastWrite` date and time, or the `Size` of files or directories. This is done by setting the `NotifyFilter` property to one of the `NotifyFilters` values. For more information on the type of changes you can watch, see `NotifyFilters`.

You can watch for renaming, deletion, or creation of files or directories. For example, to watch for renaming of text files, set the `Filter` property to "*.txt" and call the `FileSystemWatcher.WaitForChanged` method with a `Renamed` specified for its parameter.

The Windows operating system notifies your component of file changes in a buffer created by the `FileSystemWatcher`. If there are many changes in a short time, the buffer can overflow. This causes the component to lose track of changes in the directory, and it will only provide blanket notification. Increasing the size of the buffer with the `InternalBufferSize` property is expensive, as it comes from non-paged memory that cannot be swapped out to disk, so keep the buffer as small yet large enough to not miss any file change events. To avoid a buffer overflow, use the `NotifyFilter` and `IncludeSubdirectories` properties so you can filter out unwanted change notifications.

For a list of initial property values for an instance of `FileSystemWatcher`, see the `FileSystemWatcher.%23ctor` constructor.

Consider the following facts when you use the `FileSystemWatcher` class:

- Hidden files aren't ignored.
- In some systems, `FileSystemWatcher` reports changes to files using the short 8.3 file name format. For example, a change to "LongFileName.LongExtension" could be reported as "LongFil~.Lon".
- The maximum size you can set for the `InternalBufferSize` property for monitoring a directory over the network is 64 KB.

#### Copy and move folders

The operating system and `FileSystemWatcher` object interpret a cut-and-paste action or a move action as a rename action for a folder and its contents. If you cut and paste a folder with files into a folder being watched, the `FileSystemWatcher` object reports only the folder as new, but not its contents because they are essentially only renamed.

To be notified that the contents of folders have been moved or copied into a watched folder, provide `FileSystemWatcher.OnChanged` and `FileSystemWatcher.OnRenamed` event handler methods as suggested in the following table.

| Event Handler                                 | Events Handled | Performs |
|-----------------------------------------------|----------------|----------|
| `FileSystemWatcher.OnChanged` | `Changed`, `Created`, `Deleted` | Report changes in file attributes, created files, and deleted files. |
| `FileSystemWatcher.OnRenamed` | `Renamed`|List the old and new paths of renamed files and folders, expanding recursively if needed. |

#### Events and buffer sizes

Note that several factors can affect which file system change events are raised, as described by the following:

- Common file system operations might raise more than one event. For example, when a file is moved from one directory to another, several `FileSystemWatcher.OnChanged` and some `FileSystemWatcher.OnCreated` and `FileSystemWatcher.OnDeleted` events might be raised. Moving a file is a complex operation that consists of multiple simple operations, therefore raising multiple events. Likewise, some applications (for example, antivirus software) might cause additional file system events that are detected by `FileSystemWatcher`.
- The `FileSystemWatcher` can watch disks as long as they are not switched or removed. The `FileSystemWatcher` does not raise events for CDs and DVDs, because time stamps and properties cannot change. Remote computers must have one of the required platforms installed for the component to function properly.

Note that a `FileSystemWatcher` may miss an event when the buffer size is exceeded. To avoid missing events, follow these guidelines:

- Increase the buffer size by setting the `InternalBufferSize` property.
- Avoid watching files with long file names, because a long file name contributes to filling up the buffer. Consider renaming these files using shorter names.
- Keep your event handling code as short as possible.

The following example creates a `FileSystemWatcher` to watch the directory specified at run time. The component is set to watch for changes in `LastWrite` and `LastAccess` time, the creation, deletion, or renaming of text files in the directory. If a file is changed, created, or deleted, the path to the file prints to the console. When a file is renamed, the old and new paths print to the console.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.FileSystemWatcher() constructor

```csharp
public FileSystemWatcher ();
```

Initializes a new instance of the `FileSystemWatcher` class.

#### Remarks

The following table shows initial property values for an instance of `FileSystemWatcher`.

| Property                                                  | Initial Value                                                          |
|-----------------------------------------------------------|------------------------------------------------------------------------|
| `FileSystemWatcher.NotifyFilter`         | bitwise OR combination of `LastWrite`, `FileName`, and `DirectoryName` |
| `FileSystemWatcher.EnableRaisingEvents`  | `false`                                                                |
| `FileSystemWatcher.Filter`               | "*.\*" (Watch all files.)                                              |
| `FileSystemWatcher.IncludeSubdirectories` | `false`                                                                |
| `FileSystemWatcher.InternalBufferSize`   | 8192                                                                   |
| `FileSystemWatcher.Path`                 | empty string ("")                                                      |

> **Note:**
> The component will not watch the specified directory until the `FileSystemWatcher.Path` is set, and `FileSystemWatcher.EnableRaisingEvents` is `true`.

#### Examples
The following example creates a `FileSystemWatcher` object to watch the directory specified at run time. The `FileSystemWatcher` object watches for changes in `LastWrite` and `LastAccess` times, and for the creation, deletion, or renaming of text files in the directory. If a file is changed, created, or deleted, the path to the file displays to the console. When a file is renamed, the old and new paths display to the console.

This example uses the `Diagnostics` and `IO` namespaces.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.FileSystemWatcher(String) constructor

```csharp
public FileSystemWatcher (string path);
```

Initializes a new instance of the `FileSystemWatcher` class, given the specified directory to monitor.

Parameters:

- `path`: The directory to monitor, in standard or Universal Naming Convention (UNC) notation.

Exceptions:

- `ArgumentNullException`: The `path` parameter is `null`.
- `ArgumentException`: The `path` parameter is an empty string ("").

-or-

The path specified through the `path` parameter does not exist.
- `PathTooLongException`: `path` is too long.

#### Remarks

> **Note:**
> The component will not watch the specified directory until the `FileSystemWatcher.Path` is set, and `FileSystemWatcher.EnableRaisingEvents` is `true`.

The component can watch files on your personal computer, a network drive, or a remote computer.

The `Filter` property is set by default to watch all files.

## FileSystemWatcher.FileSystemWatcher(String, String) constructor

```csharp
public FileSystemWatcher (string path, string filter);
```

Initializes a new instance of the `FileSystemWatcher` class, given the specified directory and type of files to monitor.

Parameters:

- `path`: The directory to monitor, in standard or Universal Naming Convention (UNC) notation.
- `filter`: The type of files to watch. For example, "*.txt" watches for changes to all text files.

Exceptions:

- `ArgumentNullException`: The `path` parameter is `null`.

-or-

The `filter` parameter is `null`.
- `ArgumentException`: The `path` parameter is an empty string ("").

-or-

The path specified through the `path` parameter does not exist.
- `PathTooLongException`: `path` is too long.

#### Remarks

> **Note:**
> The component will not watch the specified directory until the `FileSystemWatcher.Path` is set, and `FileSystemWatcher.EnableRaisingEvents` is `true`.

The component can watch files on your personal computer, a network drive, or a remote computer.

## FileSystemWatcher.EnableRaisingEvents property

```csharp
public bool EnableRaisingEvents { get; set; }
```

Gets or sets a value indicating whether the component is enabled.

Returns: `true` if the component is enabled; otherwise, `false`. The default is `false`. If you are using the component on a designer in Visual Studio 2005, the default is `true`.

Exceptions:

- `ObjectDisposedException`: The `FileSystemWatcher` object has been disposed.
- `PlatformNotSupportedException`: The current operating system is not Microsoft Windows NT or later.
- `FileNotFoundException`: The directory specified in `FileSystemWatcher.Path` could not be found.
- `ArgumentException`: `FileSystemWatcher.Path` has not been set or is invalid.

#### Remarks
The component will not raise events unless you set `FileSystemWatcher.EnableRaisingEvents` to `true`.

> **Note:**
> The component will not watch the specified directory until the `Path` property has been set and `FileSystemWatcher.EnableRaisingEvents` is `true`.

The `FileSystemWatcher.WaitForChanged` method allows event handlers to be invoked to respond to file changes even if this property is set to `false`.

#### Examples
The following example creates a `FileSystemWatcher` to watch the directory specified at run time. The component is set to watch for changes in `LastWrite` and `LastAccess` time, the creation, deletion, or renaming of text files in the directory. If a file is changed, created, or deleted, the path to the file prints to the console. When a file is renamed, the old and new paths print to the console.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.Filter property

```csharp
public string Filter { get; set; }
```

Gets or sets the filter string used to determine what files are monitored in a directory.

Returns: The filter string. The default is "*.\*" (Watches all files.)

#### Remarks
To watch changes in all files, set the `Filter` property to an empty string (""). To watch a specific file, set the `Filter` property to the file name. For example, to watch for changes in the file MyDoc.txt, set the `Filter` property to "MyDoc.txt". You can also watch for changes in a certain type of file. For example, to watch for changes in any text files, set the `Filter` property to "*.txt". Use of multiple filters such as "\*.txt|\*.doc" is not supported.

The `Filter` property can be changed after the `FileSystemWatcher` object has started receiving events.

For more information about filtering out unwanted notifications, see the `FileSystemWatcher.NotifyFilter`, `FileSystemWatcher.IncludeSubdirectories`, and `FileSystemWatcher.InternalBufferSize` properties.

`FileSystemWatcher.Filter` accepts wildcards for matching files, as shown in the following examples.

|Filter string|Watches the following files|
|-------------------|---------------------------------|
|*.\*|All files (default). An empty string ("") also watches all files.|
|*.txt|All files with a "txt" extension.|
|*recipe.doc|All files ending in "recipe" with a "doc" extension.|
|win*.xml|All files beginning with "win" with an "xml" extension.|
|Sales*200?.xls|Matches the following:- Sales July 2001.xls - Sales Aug 2002.xls - Sales March 2004.xls but does not match:- Sales Nov 1999.xls|
|MyReport.Doc|Watches only MyReport.doc|

#### Examples
The following example creates a `FileSystemWatcher` to watch the directory specified at run time. The component is set to watch for changes in `LastWrite` and `LastAccess` time, the creation, deletion, or renaming of text files in the directory. If a file is changed, created, or deleted, the path to the file prints to the console. When a file is renamed, the old and new paths print to the console.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## FileSystemWatcher.Filters property

```csharp
public System.Collections.ObjectModel.Collection<string> Filters { get; }
```

Gets the collection of all the filters used to determine what files are monitored in a directory.

Returns: A filter collection.

To be added.
