---
title: "Directory class (part 1 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class

Namespace: `System.IO`

```csharp
public static class Directory
```

Exposes static methods for creating, moving, and enumerating through directories and subdirectories. This class cannot be inherited.

#### Remarks
Use the `Directory` class for typical operations such as copying, moving, renaming, creating, and deleting directories.

- To create a directory, use one of the `Directory.CreateDirectory` methods.

- To delete a directory, use one of the `Directory.Delete` methods.

- To get or set the current directory for an app, use the `Directory.GetCurrentDirectory` or `Directory.SetCurrentDirectory` method.

- To manipulate `DateTime` information related to the creation, access, and writing of a directory, use methods such as `Directory.SetLastAccessTime` and `Directory.SetCreationTime`.

The static methods of the `Directory` class perform security checks on all methods. If you are going to reuse an object several times, consider using the corresponding instance method of `DirectoryInfo` instead, because the security check will not always be necessary.

If you are performing only one directory-related action, it might be more efficient to use a static `Directory` method rather than a corresponding `DirectoryInfo` instance method. Most `Directory` methods require the path to the directory that you are manipulating.

> **Note:**
>  In members that accept a string `path` parameter, that path must be well-formed or an exception is raised. For example, if a path is fully qualified but begins with a space (" c:\temp"), the path string isn't trimmed, so the path is considered malformed and an exception is raised. In addition, a path or a combination of paths cannot be fully qualified twice. For example, "c:\temp c:\windows" also raises an exception. Ensure that your paths are well-formed when using methods that accept a path string. For more information see `Path`.

In members that accept a path, the path can refer to a file or a directory. You can use a full path, a relative path, or a Universal Naming Convention (UNC) path for a server and share name. For example, all the following are acceptable paths:

-   "c:\\\MyDir" in C#, or "c:\MyDir" in Visual Basic.

-   "MyDir\\\MySubdir" in C#, or "MyDir\MySubDir" in Visual Basic.

-   "\\\\\\\MyServer\\\MyShare" in C#, or "\\\MyServer\MyShare" in Visual Basic.

By default, full read/write access to new directories is granted to all users. However, the app must have the correct security to access existing directories.

To demand permissions for a directory and all its subdirectories, end the path string with the directory separator character. (For example, "C:\Temp\\" grants access to C:\Temp\ and all its subdirectories.) To demand permissions only for a specific directory, end the path string with a period. (For example, "C:\Temp\\." grants access only to C:\Temp\\, not to its subdirectories.)

In members that accept a `searchPattern` parameter, the search string can be any combination of literal characters and two wildcard characters; \* and ?. This parameter does not recognize regular expressions. For more information, see the `EnumerateDirectories` method or any other method that uses the `searchPattern` parameter.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows how to retrieve all the text files from a directory and move them to a new directory. After the files are moved, they no longer exist in the original directory.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class2.cs._

The following example demonstrates how to use the `Directory.EnumerateFiles` method to retrieve a collection of text files from a directory, and then use that collection in a query to find all the lines that contain "Example".

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class3.cs._

The following example demonstrates how to move a directory and all its files to a new directory. The original directory no longer exists after it has been moved.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class6.cs._

## Directory.CreateDirectory(String) method

```csharp
public static System.IO.DirectoryInfo CreateDirectory (string path);
```

Creates all directories and subdirectories in the specified path unless they already exist.

Parameters:

- `path`: The directory to create.

Returns: An object that represents the directory at the specified path. This object is returned regardless of whether a directory at the specified path already exists.

Exceptions:

- `IOException`: The directory specified by `path` is a file.

-or-

The network name is not known.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `path` is prefixed with, or contains, only a colon character (:).
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `NotSupportedException`: `path` contains a colon character (:) that is not part of a drive label ("C:\\").

#### Remarks

Any and all directories specified in `path` are created, unless they already exist or unless some part of `path` is invalid. If the directory already exists, this method does not create a new directory, but it returns a `DirectoryInfo` object for the existing directory.

The `path` parameter specifies a directory path, not a file path.

Trailing spaces are removed from the end of the `path` parameter before creating the directory.

You can create a directory on a remote computer, on a share that you have write access to. UNC paths are supported; for example, you can specify the following for `path`: `\\2009\Archives\December` in Visual Basic, and `\\\\2009\\Archives\\December` in C#.

Creating a directory with only the colon character (:) is not supported, and will cause a `NotSupportedException` to be thrown.

On Unix systems, use a forward slash (/) as path separator.

#### Examples

The following example creates and deletes the specified directory:

_Code sample not included: ~/snippets/csharp/System.IO/Directory/CreateDirectory/dir_createdir.cs._

To create the directory *C:\Users\User1\Public\Html* when the current directory is *C:\Users\User1*, use any of the following calls to ensure that the backslash is interpreted properly:

```vb
Directory.CreateDirectory("Public\Html")
Directory.CreateDirectory("\Users\User1\Public\Html")
Directory.CreateDirectory("c:\Users\User1\Public\Html")
```

```csharp
Directory.CreateDirectory("Public\\Html");
Directory.CreateDirectory("\\Users\\User1\\Public\\Html");
Directory.CreateDirectory("c:\\Users\\User1\\Public\\Html");
```

## Directory.CreateDirectory(String, UnixFileMode) method

```csharp
public static System.IO.DirectoryInfo CreateDirectory (string path, System.IO.UnixFileMode unixCreateMode);
```

Creates all directories and subdirectories in the specified path with the specified permissions unless they already exist.

Parameters:

- `path`: The directory to create.
- `unixCreateMode`: A bitwise combination of the enumeration values that specifies the Unix file mode used to create directories.

Returns: An object that represents the directory at the specified path. This object is returned regardless of whether a directory at the specified path already exists.

Exceptions:

- `ArgumentException`: `path` is a zero-length string, or contains one or more invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.
- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: The file mode is invalid.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PathTooLongException`: The specified path exceeds the system-defined maximum length.
- `IOException`: `path` is a file.
- `DirectoryNotFoundException`: A component of the `path` is not a directory.

To be added.

## Directory.CreateSymbolicLink(String, String) method

```csharp
public static System.IO.FileSystemInfo CreateSymbolicLink (string path, string pathToTarget);
```

Creates a directory symbolic link identified by `path` that points to `pathToTarget`.

Parameters:

- `path`: The path where the symbolic link should be created.
- `pathToTarget`: The target directory of the symbolic link.

Returns: A `DirectoryInfo` instance that wraps the newly created directory symbolic link.

Exceptions:

- `ArgumentNullException`: `path` or `pathToTarget` is `null`.
- `ArgumentException`: `path` or `pathToTarget` is empty.

-or-

`path` or `pathToTarget` contains invalid path characters.
- `IOException`: A file or directory already exists in the location of `path`.

-or-

An I/O error occurred.

To be added.

## Directory.CreateTempSubdirectory(String) method

```csharp
public static System.IO.DirectoryInfo CreateTempSubdirectory (string? prefix = default);
```

Creates a uniquely named, empty directory in the current user's temporary directory.

Parameters:

- `prefix`: An optional string to add to the beginning of the subdirectory name.

Returns: An object that represents the directory that was created.

Exceptions:

- `ArgumentException`: `prefix` contains a directory separator.
- `IOException`: A new directory cannot be created.

#### Remarks

This method creates a new directory with a unique name under the path returned by `Path.GetTempPath`. On Unix-like operating systems, the parent temporary directory might be shared among all users, whereas the directory created by `Directory.CreateTempSubdirectory` is created with owner-only permissions (`700`).

## Directory.Delete(String) method

```csharp
public static void Delete (string path);
```

Deletes an empty directory from a specified path.

Parameters:

- `path`: The name of the empty directory to remove. This directory must be writable and empty.

Exceptions:

- `IOException`: A file with the same name and location specified by `path` exists.

-or-

The directory is the application's current working directory.

-or-

The directory specified by `path` is not empty.

-or-

The directory is read-only or contains a read-only file.

-or-

The directory is being used by another process.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `path` does not exist or could not be found.

-or-

The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
This method behaves identically to `Delete` with `false` specified for the second parameter.

The `path` parameter may specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Trailing spaces are removed from the end of the `path` parameter before deleting the directory.

This method throws an `IOException` if the directory specified in the `path` parameter contains files or subdirectories.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

In some cases, if you have the specified directory open in File Explorer, the `Directory.Delete` method may not be able to delete it.

#### Examples
The following example shows how to create a new directory and subdirectory, and then delete only the subdirectory.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Delete/class1.cs._

## Directory.Delete(String, Boolean) method

```csharp
public static void Delete (string path, bool recursive);
```

Deletes the specified directory and, if indicated, any subdirectories and files in the directory.

Parameters:

- `path`: The name of the directory to remove.
- `recursive`: `true` to remove directories, subdirectories, and files in `path`; otherwise, `false`.

Exceptions:

- `IOException`: A file with the same name and location specified by `path` exists.

-or-

The directory specified by `path` is read-only, or `recursive` is `false` and `path` is not an empty directory.

-or-

The directory is the application's current working directory.

-or-

The directory contains a read-only file.

-or-

The directory is being used by another process.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `path` does not exist or could not be found.

-or-

The specified path is invalid (for example, it is on an unmapped drive).

#### Remarks
The `path` parameter may specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Trailing spaces are removed from the end of the `path` parameter before deleting the directory.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

If the `recursive` parameter is `true`, the user must have write permission for the current directory as well as for all subdirectories.

The behavior of this method differs slightly when deleting a directory that contains a reparse point, such as a symbolic link or a mount point. If the reparse point is a directory, such as a mount point, it is unmounted and the mount point is deleted. This method does not recurse through the reparse point. If the reparse point is a symbolic link to a file, the reparse point is deleted and not the target of the symbolic link.

In some cases, if you have the specified directory open in File Explorer, the `Directory.Delete` method may not be able to delete it.

#### Examples
The following example shows how to create a new directory, subdirectory, and file in the subdirectory, and then recursively delete all the new items.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Delete/class2.cs._
