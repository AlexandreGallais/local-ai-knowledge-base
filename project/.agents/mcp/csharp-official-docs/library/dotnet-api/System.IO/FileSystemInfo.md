---
title: "FileSystemInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileSystemInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemInfo class

Namespace: `System.IO`

```csharp
public abstract class FileSystemInfo : MarshalByRefObject, System.Runtime.Serialization.ISerializable
```

Provides the base class for both `FileInfo` and `DirectoryInfo` objects.

#### Remarks
The `FileSystemInfo` class contains methods that are common to file and directory manipulation. A `FileSystemInfo` object can represent either a file or a directory, thus serving as the basis for `FileInfo` or `DirectoryInfo` objects. Use this base class when parsing a lot of files and directories.

A derived class can inherit from `FileSystemInfo` only if the derived class has the AllAccess permission from the `FileIOPermissionAccess` enumeration.

In members that accept a path, the path can refer to a file or just a directory. The specified path can also refer to a relative path or a Universal Naming Convention (UNC) path for a server and share name. For example, all the following are acceptable paths:

-   "c:\\\MyDir\\\MyFile.txt" in C#, or "c:\MyDir\MyFile.txt" in Visual Basic.

-   "c:\\\MyDir" in C#, or "c:\MyDir" in Visual Basic.

-   "MyDir\\\MySubdir" in C#, or "MyDir\MySubDir" in Visual Basic.

-   "\\\\\\\MyServer\\\MyShare" in C#, or "\\\MyServer\MyShare" in Visual Basic.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows how to loop through all the files and directories, querying some information about each entry.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemInfo/Overview/program.cs._

## FileSystemInfo.FileSystemInfo() constructor

```csharp
protected FileSystemInfo ();
```

Initializes a new instance of the `FileSystemInfo` class.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## FileSystemInfo.FileSystemInfo(SerializationInfo, StreamingContext) constructor

```csharp
protected FileSystemInfo (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `FileSystemInfo` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The specified `SerializationInfo` is null.
- `PlatformNotSupportedException`: In all cases.

To be added.

## FileSystemInfo.Attributes property

```csharp
public System.IO.FileAttributes Attributes { get; set; }
```

Gets or sets the attributes for the current file or directory.

Returns: `FileAttributes` of the current `FileSystemInfo`.

Exceptions:

- `FileNotFoundException`: The specified file doesn't exist. Only thrown when setting the property value.
- `DirectoryNotFoundException`: The specified path is invalid. For example, it's on an unmapped drive. Only thrown when setting the property value.
- `SecurityException`: The caller doesn't have the required permission.
- `UnauthorizedAccessException`: The user attempts to set an attribute value but doesn't have write permission.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `ArgumentException`: The caller attempts to set an invalid file attribute.
- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.

#### Remarks
The value of the `Attributes` property is pre-cached if the current instance of the `FileSystemInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

The value may be cached when either the value itself or other `FileSystemInfo` properties are accessed. To get the latest value, call the `FileSystemInfo.Refresh` method.

If the path doesn't exist as of the last cached state, the return value is `(FileAttributes)(-1)`. `FileNotFoundException` or `DirectoryNotFoundException` can only be thrown when setting the value.

The value of this property is a combination of the archive, compressed, directory, hidden, offline, read-only, system, and temporary file attribute flags.

When you set this value, use the bitwise OR operator (`|` in C# or `Or` in Visual Basic) to apply more than one value. To retain any existing values in the `Attributes` property, include the value of the `Attributes` property in your assignment. For example:

`exampleFile.Attributes = exampleFile.Attributes | FileAttributes.ReadOnly;`

#### Examples
The following example demonstrates the `Attributes` property. This code example is part of a larger example provided for the `FileSystemInfo` class.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemInfo/Overview/program.cs._

## FileSystemInfo.CreationTime property

```csharp
public DateTime CreationTime { get; set; }
```

Gets or sets the creation time of the current file or directory.

Returns: The creation date and time of the current `FileSystemInfo` object.

Exceptions:

- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.
- `DirectoryNotFoundException`: The specified path is invalid; for example, it is on an unmapped drive.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: The caller attempts to set an invalid creation time.

#### Remarks

> **Note:**
>  This method may return an inaccurate value because it uses native functions whose values may not be continuously updated by the operating system.

The value of the `CreationTime` property is pre-cached if the current instance of the `FileSystemInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

To get the latest value, call the `FileSystemInfo.Refresh` method.

If the file described in the `FileSystemInfo` object does not exist, this property returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

On Unix platforms that do not support creation or birth time, this property returns the older of the time of the last status change and the time of the last modification. On other platforms, it returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

NTFS-formatted drives may cache file meta-info, such as file creation time, for a short period of time. This process is known as file tunneling. As a result, it may be necessary to explicitly set the creation time of a file if you are overwriting or replacing an existing file.

#### Examples
The following example demonstrates the `CreationTime` property. This code example is part of a larger example provided for the `FileSystemInfo` class.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemInfo/Overview/program.cs._

## FileSystemInfo.CreationTimeUtc property

```csharp
public DateTime CreationTimeUtc { get; set; }
```

Gets or sets the creation time, in coordinated universal time (UTC), of the current file or directory.

Returns: The creation date and time in UTC format of the current `FileSystemInfo` object.

Exceptions:

- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.
- `DirectoryNotFoundException`: The specified path is invalid; for example, it is on an unmapped drive.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: The caller attempts to set an invalid creation time.

#### Remarks

> **Note:**
>  This method may return an inaccurate value because it uses native functions whose values may not be continuously updated by the operating system.

The value of the `CreationTimeUtc` property is pre-cached if the current instance of the `FileSystemInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

To get the latest value, call the `FileSystemInfo.Refresh` method.

If the file described in the `FileSystemInfo` object does not exist, this property returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

On Unix platforms that do not support creation or birth time, this property returns the older of the time of the last status change and the time of the last modification. On other platforms, it returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

NTFS-formatted drives may cache file meta-info, such as file creation time, for a short period of time. This process is known as file tunneling. As a result, it may be necessary to explicitly set the creation time of a file if you are overwriting or replacing an existing file.

## FileSystemInfo.Exists property

```csharp
public abstract bool Exists { get; }
```

Gets a value indicating whether the file or directory exists.

Returns: `true` if the file or directory exists; otherwise, `false`.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## FileSystemInfo.Extension property

```csharp
public string Extension { get; }
```

Gets the extension part of the file name, including the leading dot `.` even if it is the entire file name, or an empty string if no extension is present.

Returns: A string containing the `FileSystemInfo` extension.

#### Remarks
The `Extension` property returns the `FileSystemInfo` extension, which starts at, and includes, the last dot (`.`) in the file's full name. For example:

* For a file `c:\NewFile.txt`, this property returns `".txt"`.
* For a file `c:\.gitignore`, this property returns `".gitignore"`.
* For a file `c:\noextension`, this property returns an empty string `""`.
* For a file `c:\a.b.c`, this property returns `".c"`.
* When the `FileInfo` is constructed from a file path with a trailing dot, then that trailing dot is trimmed, so `new FileInfo("foo.bar.").Extension` returns `".bar"`.

The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|
|Retrieve the fully qualified path of a file.|`Path.GetFullPath`|
|Retrieve only the file name a path.|`Path.GetFileNameWithoutExtension`|
|Retrieve only the directory name from a path.|`Path.GetDirectoryName`|
|Change the extension of a file.|`Path.ChangeExtension`|

## FileSystemInfo.FullName property

```csharp
public virtual string FullName { get; }
```

Gets the full path of the directory or file.

Returns: A string containing the full path.

Exceptions:

- `PathTooLongException`: The fully qualified path and file name exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
For example, for a file c:\NewFile.txt, this property returns "c:\NewFile.txt".

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates the `FullName` property. This code example is part of a larger example provided for the `FileSystemInfo` class.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemInfo/Overview/program.cs._

## FileSystemInfo.LastAccessTime property

```csharp
public DateTime LastAccessTime { get; set; }
```

Gets or sets the time the current file or directory was last accessed.

Returns: The time that the current file or directory was last accessed.

Exceptions:

- `IOException`: `FileSystemInfo.Refresh` cannot initialize the data.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: The caller attempts to set an invalid access time

#### Remarks

> **Note:**
>  This method may return an inaccurate value because it uses native functions whose values may not be continuously updated by the operating system.

If the file described in the `FileSystemInfo` object does not exist, this property returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

The value of the `LastAccessTimeUtc` property is pre-cached if the current instance of the `FileSystemInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

To get the latest value, call the `FileSystemInfo.Refresh` method.

#### Examples
The following code example demonstrates the updating of the `LastAccessTime` property through a "touch" operation. In this example, the file is "touched", updating the `FileSystemInfo.CreationTime`, `FileSystemInfo.LastAccessTime` and `FileSystemInfo.LastWriteTime` properties to the current date and time.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemInfo/LastAccessTime/touch.cs._
