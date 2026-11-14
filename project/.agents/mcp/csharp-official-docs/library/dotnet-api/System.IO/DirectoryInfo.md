---
title: "DirectoryInfo class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DirectoryInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DirectoryInfo class

Namespace: `System.IO`

```csharp
public sealed class DirectoryInfo : System.IO.FileSystemInfo
```

Exposes instance methods for creating, moving, and enumerating through directories and subdirectories. This class cannot be inherited.

#### Remarks
Use the `DirectoryInfo` class for typical operations such as copying, moving, renaming, creating, and deleting directories.

If you are going to reuse an object several times, consider using the instance method of `DirectoryInfo` instead of the corresponding static methods of the `Directory` class, because a security check will not always be necessary.

> **Note:**
>  In members that accept a path as an input string, that path must be well-formed or an exception is raised. For example, if a path is fully qualified but begins with a space, the path is not trimmed in methods of the class. Therefore, the path is malformed and an exception is raised. Similarly, a path or a combination of paths cannot be fully qualified twice. For example, "c:\temp c:\windows" also raises an exception in most cases. Ensure that your paths are well-formed when using methods that accept a path string.

In members that accept a path, the path can refer to a file or just a directory. The specified path can also refer to a relative path or a Universal Naming Convention (UNC) path for a server and share name. For example, all the following are acceptable paths:

-   "c:\\\MyDir\\\MyFile.txt" in C#, or "c:\MyDir\MyFile.txt" in Visual Basic.

-   "c:\\\MyDir" in C#, or "c:\MyDir" in Visual Basic.

-   "MyDir\\\MySubdir" in C#, or "MyDir\MySubDir" in Visual Basic.

-   "\\\\\\\MyServer\\\MyShare" in C#, or "\\\MyServer\MyShare" in Visual Basic.

By default, full read/write access to new directories is granted to all users.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates some of the main members of the `DirectoryInfo` class.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Overview/dirinfo class example.cs._

The following example demonstrates how to copy a directory and its contents.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Overview/copydir.cs._

## DirectoryInfo.DirectoryInfo(String) constructor

```csharp
public DirectoryInfo (string path);
```

Initializes a new instance of the `DirectoryInfo` class on the specified path.

Parameters:

- `path`: A string specifying the path on which to create the `DirectoryInfo`.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `SecurityException`: The caller does not have the required permission.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks
This constructor does not check if a directory exists. This constructor is a placeholder for a string that is used to access the disk in subsequent operations.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example uses this constructor to create the specified directory and subdirectory, and demonstrates that a directory that contains subdirectories cannot be deleted.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/.ctor/dirinfo ctor.cs._

## DirectoryInfo.Exists property

```csharp
public override bool Exists { get; }
```

Gets a value indicating whether the directory exists.

Returns: `true` if the directory exists; otherwise, `false`.

#### Remarks
The `Exists` property returns `false` if any error occurs while trying to determine if the specified file exists. This can occur in situations that raise exceptions such as passing a file name with invalid characters or too many characters, a failing or missing disk, or if the caller does not have permission to read the file.

#### Examples
The following example demonstrates a use of the `Exists` property in the context of copying a source directory to a target directory.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Exists/copydirectory.cs._

## DirectoryInfo.Name property

```csharp
public override string Name { get; }
```

Gets the name of this `DirectoryInfo` instance.

Returns: The directory name.

#### Remarks
This `Name` property returns only the name of the directory, such as "Bin". To get the full path, such as "c:\public\Bin", use the `FullName` property.

The `Name` property of a `DirectoryInfo` requires no permission (beyond the read permission to the directory necessary to construct the `DirectoryInfo.Exists`) but can give out the directory name. If it is necessary to hand out a `DirectoryInfo` to a protected directory with a cryptographically secure name, create a dummy directory for the untrusted code's use.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example displays the name of the current `DirectoryInfo` instance only.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Name/source.cs._

## DirectoryInfo.Parent property

```csharp
public System.IO.DirectoryInfo? Parent { get; }
```

Gets the parent directory of a specified subdirectory.

Returns: The parent directory, or `null` if the path is null or if the file path denotes a root (such as `\`, `C:\`, or `\\server\share`).

Exceptions:

- `SecurityException`: The caller does not have the required permission.

#### Remarks

This property returns a `DirectoryInfo` instance that represents the parent directory.

To make your intent explicit, retrieve the value of one of the following properties on the `DirectoryInfo` instance returned by `Parent`:
- `Name`, which returns the simple name of the directory (such as `bin`).
- `FullName`, which returns the absolute path of the directory.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples

The following example refers to the parent directory of a specified directory.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Parent/directoryinfoparent.cs._

## DirectoryInfo.Root property

```csharp
public System.IO.DirectoryInfo Root { get; }
```

Gets the root portion of the directory.

Returns: An object that represents the root of the directory.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

#### Examples
The following example displays root locations for specified directories.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Root/directoryinforoot2.cs._

## DirectoryInfo.Create() method

```csharp
public void Create ();
```

Creates a directory.

Exceptions:

- `IOException`: The directory cannot be created.

#### Remarks

Any and all directories specified in `path` are created, unless some part of `path` is invalid. The `path` parameter specifies a directory path, not a file path. If the directory already exists, this method does nothing. If the directory did not exist before calling this method, then any cached attribute information about the directory will be flushed if the creation is successful.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example checks whether a specified directory exists, creates the directory if it does not exist, and deletes the directory.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Create/dirinfo create.cs._

## DirectoryInfo.CreateSubdirectory(String) method

```csharp
public System.IO.DirectoryInfo CreateSubdirectory (string path);
```

Creates a subdirectory or subdirectories on the specified path. The specified path can be relative to this instance of the `DirectoryInfo` class.

Parameters:

- `path`: The specified path. This cannot be a different disk volume or Universal Naming Convention (UNC) name.

Returns: The last directory specified in `path`.

Exceptions:

- `ArgumentException`: `path` does not specify a valid file path or contains invalid `DirectoryInfo` characters.
- `ArgumentNullException`: `path` is `null`.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `IOException`: The subdirectory cannot be created.

-or-

A file already has the name specified by `path`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `SecurityException`: The caller does not have code access permission to create the directory.

-or-

The caller does not have code access permission to read the directory described by the returned `DirectoryInfo` object.  This can occur when the `path` parameter describes an existing directory.
- `NotSupportedException`: `path` contains a colon character (:) that is not part of a drive label ("C:\\").

#### Remarks
Any and all directories specified in `path` are created, unless some part of `path` is invalid. The `path` parameter specifies a directory path, not a file path. If the subdirectory already exists, this method does nothing.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates creating a subdirectory. In this example, the created directories are removed once created. Therefore, to test this sample, comment out the delete lines in the code.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/CreateSubdirectory/directoryinfocreatesub.cs._

## DirectoryInfo.Delete() method

```csharp
public override void Delete ();
```

Deletes this `DirectoryInfo` if it is empty.

Exceptions:

- `UnauthorizedAccessException`: The directory contains a read-only file.
- `DirectoryNotFoundException`: The directory described by this `DirectoryInfo` object does not exist or could not be found.
- `IOException`: The directory is not empty.

-or-

The directory is the application's current working directory.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example throws an exception if you attempt to delete a directory that is not empty.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Delete/dirinfo delete1.cs._

## DirectoryInfo.Delete(Boolean) method

```csharp
public void Delete (bool recursive);
```

Deletes this instance of a `DirectoryInfo`, specifying whether to delete subdirectories and files.

Parameters:

- `recursive`: `true` to delete this directory, its subdirectories, and all files; otherwise, `false`.

Exceptions:

- `UnauthorizedAccessException`: The directory contains a read-only file.
- `DirectoryNotFoundException`: The directory described by this `DirectoryInfo` object does not exist or could not be found.
- `IOException`: The directory is read-only.

-or-

The directory contains one or more files or subdirectories and `recursive` is `false`.

-or-

The directory is the application's current working directory.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
If the `DirectoryInfo` has no files or subdirectories, this method deletes the `DirectoryInfo` even if `recursive` is `false`. Attempting to delete a `DirectoryInfo` that is not empty when `recursive` is `false` throws an `IOException`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates deleting a directory. Because the directory is removed, first comment out the `Delete` line to test that the directory exists. Then uncomment the same line of code to test that the directory was removed successfully.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/Delete/directoryinfodelete.cs._

## DirectoryInfo.EnumerateDirectories() method

```csharp
public System.Collections.Generic.IEnumerable<System.IO.DirectoryInfo> EnumerateDirectories ();
```

Returns an enumerable collection of directory information in the current directory.

Returns: An enumerable collection of directories in the current directory.

Exceptions:

- `DirectoryNotFoundException`: The path encapsulated in the `DirectoryInfo` object is invalid (for example, it is on an unmapped drive).
- `SecurityException`: The caller does not have the required permission.

#### Remarks
The `DirectoryInfo.EnumerateDirectories` and `DirectoryInfo.GetDirectories` methods differ as follows:

- When you use `DirectoryInfo.EnumerateDirectories`, you can start enumerating the collection of `DirectoryInfo` objects before the whole collection is returned.

- When you use `DirectoryInfo.GetDirectories`, you must wait for the whole array of `DirectoryInfo` objects to be returned before you can access the array.

Therefore, when you are working with many files and directories, `DirectoryInfo.EnumerateDirectories` can be more efficient.

This method pre-populates the values of the following `DirectoryInfo` properties:

-   `FileSystemInfo.Attributes`

-   `FileSystemInfo.CreationTime`

-   `FileSystemInfo.CreationTimeUtc`

-   `FileSystemInfo.LastAccessTime`

-   `FileSystemInfo.LastAccessTimeUtc`

-   `FileSystemInfo.LastWriteTime`

-   `FileSystemInfo.LastWriteTimeUtc`

The returned collection is not cached; each call to the `IEnumerable<T>.GetEnumerator` method on  the collection will start a new enumeration.

#### Examples
The following example enumerates the subdirectories under the C:\Program Files directory and uses a LINQ query to return the names of all directories that were created before 2009 by checking the value of the `CreationTimeUtc` property.

If you only need the names of the subdirectories, use the static `Directory` class for better performance. For an example, see the `EnumerateDirectories` method.

_Code sample not included: ~/snippets/csharp/System.IO/DirectoryInfo/EnumerateDirectories/program.cs._
