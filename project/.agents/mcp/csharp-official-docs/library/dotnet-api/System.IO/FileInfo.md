---
title: "FileInfo class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileInfo class

Namespace: `System.IO`

```csharp
public sealed class FileInfo : System.IO.FileSystemInfo
```

Provides properties and instance methods for the creation, copying, deletion, moving, and opening of files, and aids in the creation of `FileStream` objects. This class cannot be inherited.

#### Remarks
Use the `FileInfo` class for typical operations such as copying, moving, renaming, creating, opening, deleting, and appending to files.

If you are performing multiple operations on the same file, it can be more efficient to use `FileInfo` instance methods instead of the corresponding static methods of the `File` class, because a security check will not always be necessary.

Many of the `FileInfo` methods return other I/O types when you create or open files. You can use these other types to further manipulate a file. For more information, see specific `FileInfo` members such as `FileInfo.Open`, `FileInfo.OpenRead`, `FileInfo.OpenText`, `FileInfo.CreateText`, or `FileInfo.Create`.

By default, full read/write access to new files is granted to all users.

The following table describes the enumerations that are used to customize the behavior of various `FileInfo` methods.

|Enumeration|Description|
|-----------------|-----------------|
|`FileAccess`|Specifies read and write access to a file.|
|`FileShare`|Specifies the level of access permitted for a file that is already in use.|
|`FileMode`|Specifies whether the contents of an existing file are preserved or overwritten, and whether requests to create an existing file cause an exception.|

> **Note:**
>  In members that accept a path as an input string, that path must be well-formed or an exception is raised. For example, if a path is fully qualified but begins with a space, the path is not trimmed in methods of the class. Therefore, the path is malformed and an exception is raised. Similarly, a path or a combination of paths cannot be fully qualified twice. For example, "c:\temp c:\windows" also raises an exception in most cases. Ensure that your paths are well-formed when using methods that accept a path string.

In members that accept a path, the path can refer to a file or just a directory. The specified path can also refer to a relative path or a Universal Naming Convention (UNC) path for a server and share name. For example, all the following are acceptable paths:

-   "c:\\\MyDir\\\MyFile.txt" in C#, or "c:\MyDir\MyFile.txt" in Visual Basic.

-   "c:\\\MyDir" in C#, or "c:\MyDir" in Visual Basic.

-   "MyDir\\\MySubdir" in C#, or "MyDir\MySubDir" in Visual Basic.

-   "\\\\\\\MyServer\\\MyShare" in C#, or "\\\MyServer\MyShare" in Visual Basic.

The `FileInfo` class provides the following properties that enable you to retrieve information about a file. For an example of how to use each property, see the property pages.

- The `Directory` property retrieves an object that represents the parent directory of a file.

- The `DirectoryName` property retrieves the full path of the parent directory of a file.

- The `Exists` property checks for the presence of a file before operating on it.

- The `IsReadOnly` property retrieves or sets a value that specifies whether a file can be modified.

- The `FileInfo.Length` retrieves the size of a file.

- The `FileInfo.Name` retrieves the name of a file.

#### Examples
The following example demonstrates some of the main members of the `FileInfo` class.

When the properties are first retrieved, `FileInfo` calls the `FileSystemInfo.Refresh` method and caches information about the file. On subsequent calls, you must call `FileSystemInfo.Refresh` to get the latest copy of the information.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Overview/finfo class.cs._

This example produces output similar to the following.

```txt
Hello
And
Welcome
C:\Users\userName\AppData\Local\Temp\tmp70AB.tmp was copied to C:\Users\userName\AppData\Local\Temp\tmp70CB.tmp.
C:\Users\userName\AppData\Local\Temp\tmp70CB.tmp was successfully deleted.
```

## FileInfo.FileInfo(String) constructor

```csharp
public FileInfo (string fileName);
```

Initializes a new instance of the `FileInfo` class, which acts as a wrapper for a file path.

Parameters:

- `fileName`: The fully qualified name of the new file, or the relative file name. Do not end the path with the directory separator character.

Exceptions:

- `ArgumentNullException`: `fileName` is `null`.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: Access to `fileName` is denied.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `fileName` contains a colon (:) in the middle of the string.

#### Remarks
You can specify either the fully qualified or the relative file name, but the security check gets the fully qualified name.

#### Examples
The following example uses this constructor to create two files, which are then written to, read from, copied, and deleted.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/.ctor/finfo ctor.cs._

The following example opens an existing file or creates a file, appends text to the file, and displays the results.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/.ctor/fileinfomain.cs._

## FileInfo.Directory property

```csharp
public System.IO.DirectoryInfo? Directory { get; }
```

Gets an instance of the parent directory.

Returns: A `DirectoryInfo` object representing the parent directory of this file.

Exceptions:

- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
To get the parent directory as a string, use the `DirectoryName` property.

#### Examples
The following example opens or creates a file, determines its full path, and determines and displays the full contents of the directory.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Directory/fileinfodirectory.cs._

## FileInfo.DirectoryName property

```csharp
public string? DirectoryName { get; }
```

Gets a string representing the directory's full path.

Returns: A string representing the directory's full path.

Exceptions:

- `ArgumentNullException`: `null` was passed in for the directory name.
- `PathTooLongException`: The fully qualified path name exceeds the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
To get the parent directory as a `DirectoryInfo` object, use the `Directory` property.

When first called, `FileInfo` calls `FileSystemInfo.Refresh` and caches information about the file. On subsequent calls, you must call `FileSystemInfo.Refresh` to get the latest copy of the information.

#### Examples
The following example retrieves the full path of the specified file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/DirectoryName/fileinfomembers.cs._
## FileInfo.Exists property

```csharp
public override bool Exists { get; }
```

Gets a value indicating whether a file exists.

Returns: `true` if the file exists; `false` if the file does not exist or if the file is a directory.

#### Remarks
When first called, `FileInfo` calls `FileSystemInfo.Refresh` and caches information about the file. On subsequent calls, you must call `FileSystemInfo.Refresh` to get the latest copy of the information.

The `Exists` property returns `false` if any error occurs while trying to determine if the specified file exists. This can occur in situations that raise exceptions such as passing a file name with invalid characters or too many characters, a failing or missing disk, or if the caller does not have permission to read the file.

#### Examples
The following code example uses the `Exists` property ensure a file exists before opening it. You can use this technique to throw a custom exception when the file is not found.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Exists/sample.cs._

## FileInfo.IsReadOnly property

```csharp
public bool IsReadOnly { get; set; }
```

Gets or sets a value that determines if the current file is read only.

Returns: `true` if the current file is read only or could not be found; otherwise, `false`.

Exceptions:

- `FileNotFoundException`: The file described by the current `FileInfo` object could not be found when trying to set the IsReadOnly property. (Note that getting this property for a nonexistent file will not throw an exception, but rather returns `true`.)
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: This operation is not supported on the current platform.

-or-

The caller does not have the required permission.
- `ArgumentException`: The user does not have write permission, but attempted to set this property to `false`.

#### Remarks
Use the `IsReadOnly` property to quickly determine or change whether the current file is read only.

If the current file does not exist, getting this property will always return `true`, but attempts to set will throw a `FileNotFoundException`.

When first called, `FileInfo` calls `FileSystemInfo.Refresh` and caches information about the file. On subsequent calls, you must call `FileSystemInfo.Refresh` to get the latest copy of the information.

#### Examples
The following example creates a temporary file, uses the `IsReadOnly` property to first check and then set its read-only status, and finally marks it as read-write in order to delete it.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/IsReadOnly/sample.cs._

## FileInfo.Length property

```csharp
public long Length { get; }
```

Gets the size, in bytes, of the current file.

Returns: The size of the current file in bytes.

Exceptions:

- `IOException`: `FileSystemInfo.Refresh` cannot update the state of the file or directory.
- `FileNotFoundException`: The file does not exist.

-or-

The `Length` property is called for a directory.

#### Remarks
The value of the `Length` property is pre-cached if the current instance of the `FileInfo` object was returned from any of the following `DirectoryInfo` methods:

-   `DirectoryInfo.GetDirectories`

-   `DirectoryInfo.GetFiles`

-   `DirectoryInfo.GetFileSystemInfos`

-   `DirectoryInfo.EnumerateDirectories`

-   `DirectoryInfo.EnumerateFiles`

-   `DirectoryInfo.EnumerateFileSystemInfos`

To get the latest value, call the `FileSystemInfo.Refresh` method.

#### Examples
The following example displays the size of the specified files.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Length/filelength.cs._

## FileInfo.Name property

```csharp
public override string Name { get; }
```

Gets the name of the file.

Returns: The name of the file.

#### Remarks
When first called, `FileInfo` calls `FileSystemInfo.Refresh` and caches information about the file. On subsequent calls, you must call `FileSystemInfo.Refresh` to get the latest copy of the information.

The name of the file includes the file extension.

#### Examples
The following example uses the `Name` property to display the names of files in the current directory.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/Name/fileinfoname.cs._

## FileInfo.AppendText() method

```csharp
public System.IO.StreamWriter AppendText ();
```

Creates a `StreamWriter` that appends text to the file represented by this instance of the `FileInfo`.

Returns: A new `StreamWriter`.

#### Examples
The following example appends text to a file and reads from the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/AppendText/finfo appendtext.cs._

The following example demonstrates appending text to the end of a file and also displays the result of the append operation to the console. The first time this routine is called, the file is created if it does not exist. After that, the specified text is appended to the file.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/AppendText/fileinfoappendtext.cs._

## FileInfo.CopyTo(String) method

```csharp
public System.IO.FileInfo CopyTo (string destFileName);
```

Copies an existing file to a new file, disallowing the overwriting of an existing file.

Parameters:

- `destFileName`: The name of the new file to copy to.

Returns: A new file with a fully qualified path.

Exceptions:

- `IOException`: An error occurs, or the destination file already exists.
- `SecurityException`: The caller does not have the required permission.
- `ArgumentNullException`: `destFileName` is `null`.
- `UnauthorizedAccessException`: A directory path is passed in, or the file is being moved to a different drive.
- `DirectoryNotFoundException`: The directory specified in `destFileName` does not exist.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `destFileName` contains a colon (:) within the string but does not specify the volume.

#### Remarks
Use the `CopyTo` method to allow overwriting of an existing file.

> **Caution:**
>  Whenever possible, avoid using short file names (such as XXXXXX~1.XXX) with this method. If two files have equivalent short file names then this method may fail and raise an exception and/or result in undesirable behavior

#### Examples
The following example demonstrates both overloads of the `CopyTo` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/CopyTo/program.cs._

The following example demonstrates copying one file to another file, throwing an exception if the destination file already exists.

_Code sample not included: ~/snippets/csharp/System.IO/FileInfo/CopyTo/fileinfocopyto1.cs._
