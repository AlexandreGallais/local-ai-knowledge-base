---
title: "FileSystemInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileSystemInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemInfo class (part 2 of 2)

## FileSystemInfo.LastAccessTimeUtc property

```csharp
public DateTime LastAccessTimeUtc { get; set; }
```

Gets or sets the time, in coordinated universal time (UTC), that the current file or directory was last accessed.

Returns: The UTC time that the current file or directory was last accessed.

Exceptions:

- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: The caller attempts to set an invalid access time.

#### Remarks

> **Note:**
>  This method may return an inaccurate value because it uses native functions whose values may not be continuously updated by the operating system.

The value of the `LastAccessTimeUtc` property is pre-cached if the current instance of the `FileSystemInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

To get the latest value, call the `FileSystemInfo.Refresh` method.

If the file described in the `FileSystemInfo` object does not exist, this property returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

For a list of common I/O tasks, see Common I/O Tasks.

## FileSystemInfo.LastWriteTime property

```csharp
public DateTime LastWriteTime { get; set; }
```

Gets or sets the time when the current file or directory was last written to.

Returns: The time the current file was last written.

Exceptions:

- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: The caller attempts to set an invalid write time.

#### Remarks

> **Note:**
>  This method may return an inaccurate value because it uses native functions whose values may not be continuously updated by the operating system.

The value of the `LastWriteTime` property is pre-cached if the current instance of the `FileSystemInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

To get the latest value, call the `FileSystemInfo.Refresh` method.

If the file or directory described in the `FileSystemInfo` object does not exist, or if the file system that contains this file or directory does not support this information, this property returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

#### Examples
The following code example demonstrates the updating of the `LastWriteTime` property through a "touch" operation. In this example, the file is "touched", updating the `FileSystemInfo.CreationTime`, `FileSystemInfo.LastAccessTime` and `FileSystemInfo.LastWriteTime` properties to the current date and time.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemInfo/LastAccessTime/touch.cs._

## FileSystemInfo.LastWriteTimeUtc property

```csharp
public DateTime LastWriteTimeUtc { get; set; }
```

Gets or sets the time, in coordinated universal time (UTC), when the current file or directory was last written to.

Returns: The UTC time when the current file was last written to.

Exceptions:

- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: The caller attempts to set an invalid write time.

#### Remarks

> **Note:**
>  This method may return an inaccurate value because it uses native functions whose values may not be continuously updated by the operating system.

The value of the `LastWriteTimeUtc` property is pre-cached if the current instance of the `FileSystemInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

To get the latest value, call the `FileSystemInfo.Refresh` method.

If the file or directory described in the `FileSystemInfo` object does not exist, or if the file system that contains this file or directory does not support this information, this property returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

## FileSystemInfo.LinkTarget property

```csharp
public string? LinkTarget { get; }
```

Gets the target path of the link located in `FileSystemInfo.FullName`, or `null` if this `FileSystemInfo` instance doesn't represent a link.

Returns: The target path of the link located in `FileSystemInfo.FullName`, or `null` if this `FileSystemInfo` instance doesn't represent a link.

Symbolic links and junctions are the types of links this API can resolve.

## FileSystemInfo.Name property

```csharp
public abstract string Name { get; }
```

For files, gets the name of the file. For directories, gets the name of the last directory in the hierarchy if a hierarchy exists. Otherwise, the `Name` property gets the name of the directory.

Returns: A string that is the name of the parent directory, the name of the last directory in the hierarchy, or the name of a file, including the file name extension.

#### Remarks
For a directory, `Name` returns only the name of the parent directory, such as Dir, not c:\Dir. For a subdirectory, `Name` returns only the name of the subdirectory, such as Sub1, not c:\Dir\Sub1.

For a file, `Name` returns only the file name and file name extension, such as MyFile.txt, not c:\Dir\Myfile.txt.

## FileSystemInfo.UnixFileMode property

```csharp
public System.IO.UnixFileMode UnixFileMode { get; set; }
```

Gets or sets the Unix file mode for the current file or directory.

Returns: `UnixFileMode` of the current `FileSystemInfo`.

Exceptions:

- `ArgumentException`: The file mode is invalid.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PathTooLongException`: The specified path exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid. Only thrown when setting the property value.
- `FileNotFoundException`: The specified file doesn't exist. Only thrown when setting the property value.
- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.

#### Remarks

The value may be cached when either the value itself or other `FileSystemInfo` properties are accessed. To get the latest value, call the `Refresh` method.

If the path doesn't exist as of the last cached state, the return value is `(UnixFileMode)(-1)`. `FileNotFoundException` or `DirectoryNotFoundException` can only be thrown when setting the value.

## FileSystemInfo.CreateAsSymbolicLink(String) method

```csharp
public void CreateAsSymbolicLink (string pathToTarget);
```

Creates a symbolic link located in `FileSystemInfo.FullName` that points to the specified `pathToTarget`.

Parameters:

- `pathToTarget`: The path of the symbolic link target.

Exceptions:

- `ArgumentNullException`: `pathToTarget` is `null`.
- `ArgumentException`: `pathToTarget` is empty.

-or-

`pathToTarget` contains invalid path characters.
- `IOException`: A file or directory already exists in the location of `FileSystemInfo.FullName`.

-or-

An I/O error occurred.

To be added.

## FileSystemInfo.Delete() method

```csharp
public abstract void Delete ();
```

Deletes a file or directory.

Exceptions:

- `DirectoryNotFoundException`: The specified path is invalid; for example, it is on an unmapped drive.

To be added.

## FileSystemInfo.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the file name and additional exception information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## FileSystemInfo.Refresh() method

```csharp
public void Refresh ();
```

Refreshes the state of the object.

Exceptions:

- `IOException`: A device such as a disk drive is not ready.

#### Remarks

`FileSystemInfo.Refresh` takes a snapshot of the file from the current file system.

Call `Refresh` before attempting to get the attribute information, or the information will be outdated.

## FileSystemInfo.ResolveLinkTarget(Boolean) method

```csharp
public System.IO.FileSystemInfo? ResolveLinkTarget (bool returnFinalTarget);
```

Gets the target of the specified link.

Parameters:

- `returnFinalTarget`: `true` to follow links to the final target; `false` to return the immediate next link.

Returns: A `FileSystemInfo` instance if the link exists, independently if the target exists or not; `null` if this file or directory is not a link.

Exceptions:

- `IOException`: The file or directory does not exist.

-or-

There are too many levels of symbolic links.

#### Remarks

When `returnFinalTarget` is `true`, the maximum number of symbolic links that are followed are 40 on Unix and 63 on Windows.

Symbolic links and junctions are the types of links this API can resolve.

## FileSystemInfo.ToString() method

```csharp
public override string ToString ();
```

Returns the original path. Use the `FileSystemInfo.FullName` or `FileSystemInfo.Name` properties for the full path or file/directory name.

Returns: A string with the original path.

#### Remarks

> **Important:**
> The string returned by the`ToString` method represents the path that was passed to the constructor of the class implementing `FileSystemInfo`. Instead of calling the `ToString` method, you should retrieve the value of either of the following properties, depending on your intent:
> - `Name`, to get the name of the file or directory, without any parent path information.
> - `FullName`, to get the fully qualified path of the file or directory.

## FileSystemInfo.FullPath field

```csharp
protected string FullPath;
```

Represents the fully qualified path of the directory or file.

Exceptions:

- `PathTooLongException`: The fully qualified path exceeds the system-defined maximum length.

To be added.

## FileSystemInfo.OriginalPath field

```csharp
protected string OriginalPath;
```

The path originally specified by the user, whether relative or absolute.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.
