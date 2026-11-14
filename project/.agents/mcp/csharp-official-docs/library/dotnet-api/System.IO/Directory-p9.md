---
title: "Directory class (part 9 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 9 of 10)

## Directory.GetLastAccessTimeUtc(String) method

```csharp
public static DateTime GetLastAccessTimeUtc (string path);
```

Returns the date and time, in Coordinated Universal Time (UTC) format, that the specified file or directory was last accessed.

Parameters:

- `path`: The file or directory for which to obtain access date and time information.

Returns: A structure that is set to the date and time the specified file or directory was last accessed. This value is expressed in UTC time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: The `path` parameter is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

If the directory described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example illustrates the differences in output when using Coordinated Universal Time (UTC) output.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCreationTimeUtc/example.cs._

## Directory.GetLastWriteTime(String) method

```csharp
public static DateTime GetLastWriteTime (string path);
```

Returns the date and time the specified file or directory was last written to.

Parameters:

- `path`: The file or directory for which to obtain modification date and time information.

Returns: A structure that is set to the date and time the specified file or directory was last written to. This value is expressed in local time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

If the directory described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use `GetLastWriteTime`.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetLastWriteTime/dir_getlastwrite.cs._

## Directory.GetLastWriteTimeUtc(String) method

```csharp
public static DateTime GetLastWriteTimeUtc (string path);
```

Returns the date and time, in Coordinated Universal Time (UTC) format, that the specified file or directory was last written to.

Parameters:

- `path`: The file or directory for which to obtain modification date and time information.

Returns: A structure that is set to the date and time the specified file or directory was last written to. This value is expressed in UTC time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

If the directory described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example illustrates the differences in output when using Coordinated Universal Time (UTC) output.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCreationTimeUtc/example.cs._

## Directory.GetLogicalDrives() method

```csharp
public static string[] GetLogicalDrives ();
```

Retrieves the names of the logical drives on this computer.

Returns: An array of strings representing the logical drive names.

Exceptions:

- `IOException`: An I/O error occurred (for example, a disk error).
- `UnauthorizedAccessException`: The caller does not have the required permission.

#### Remarks
On Windows, `GetLogicalDrives` returns the names of all accessible drives on a particular machine, including any optical drives or removable media devices, in the form "\<drive letter\>:\\" (for example, "C:\\"). On Unix, it returns the paths of all filesystem mount points mounted on a particular machine (for example, "/home/user", "/media/usb").

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example uses the `Directory.GetLogicalDrives` method to assign the name of each drive on the calling computer to an array of strings. Each member of this string array is then printed to the console. The example is configured to catch all errors common to this method.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class1.cs._

## Directory.GetParent(String) method

```csharp
public static System.IO.DirectoryInfo? GetParent (string path);
```

Retrieves the parent directory of the specified path, including both absolute and relative paths.

Parameters:

- `path`: The path for which to retrieve the parent directory.

Returns: The parent directory, or `null` if `path` is the root directory, including the root of a UNC server or share name.

Exceptions:

- `IOException`: The directory specified by `path` is read-only.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length. For more information, see the `PathTooLongException` topic.
- `DirectoryNotFoundException`: The specified path was not found.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `path` parameter can specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Trailing spaces are removed from the end of the `path` parameter before getting the directory.

The string returned by this method consists of all characters in the path up to, but not including, the last `DirectorySeparatorChar` or `AltDirectorySeparatorChar`. For example, passing the path "C:\Directory\SubDirectory\test.txt" to `Directory.GetParent` returns "C:\Directory\SubDirectory". Passing "C:\Directory\SubDirectory" returns "C:\Directory". However, passing "C:\Directory\SubDirectory\\" returns "C:\Directory\SubDirectory", because the ending directory separator is after "SubDirectory".

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use the `Directory.GetParent` method to retrieve the parent directory of a user-specified location, "path". The value returned by the `Directory.GetParent` method is then printed to the console. The example is configured to catch all errors common to this method.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class1.cs._

## Directory.Move(String, String) method

```csharp
public static void Move (string sourceDirName, string destDirName);
```

Moves a file or a directory and its contents to a new location.

Parameters:

- `sourceDirName`: The path of the file or directory to move.
- `destDirName`: The path to the new location for `sourceDirName` or its contents. If `sourceDirName` is a file, then `destDirName` must also be a file name.

Exceptions:

- `IOException`: An attempt was made to move a directory to a different volume.

-or-

`destDirName` already exists. See the note in the Remarks section.

-or-

The `sourceDirName` and `destDirName` parameters refer to the same file or directory.

-or-

The directory or a file within it is being used by another process.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `sourceDirName` or `destDirName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The path specified by `sourceDirName` is invalid (for example, it is on an unmapped drive).

#### Remarks

This method creates a new directory with the name specified by `destDirName` and moves the contents of `sourceDirName`, including files and directories, to the newly created destination directory. It then deletes the `sourceDirName` directory.

If you try to move a directory to a directory that already exists, an `IOException` will occur.

The `sourceDirName` and `destDirName` arguments are permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Trailing spaces are removed from the end of the path parameters before moving the directory.

For a list of common I/O tasks, see Common I/O Tasks.

> **Note:**
> The `Move` method throws an `IOException` on all platforms when the `destDirName` already exists. See C++ rename.

#### Examples

The following example demonstrates how to move a directory and all its files to a new directory. The original directory no longer exists after it has been moved.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/Overview/class6.cs._

## Directory.ResolveLinkTarget(String, Boolean) method

```csharp
public static System.IO.FileSystemInfo? ResolveLinkTarget (string linkPath, bool returnFinalTarget);
```

Gets the target of the specified directory link.

Parameters:

- `linkPath`: The path of the directory link.
- `returnFinalTarget`: `true` to follow links to the final target; `false` to return the immediate next link.

Returns: A `DirectoryInfo` instance if `linkPath` exists, independently if the target exists or not. `null` if `linkPath` is not a link.

Exceptions:

- `IOException`: The directory on `linkPath` does not exist.

-or-

There are too many levels of symbolic links.

#### Remarks

When `returnFinalTarget` is `true`, the maximum number of symbolic links that are followed are 40 on Unix and 63 on Windows.

Symbolic links and junctions are the types of links this API can resolve.

## Directory.SetCreationTime(String, DateTime) method

```csharp
public static void SetCreationTime (string path, DateTime creationTime);
```

Sets the creation date and time for the specified file or directory.

Parameters:

- `path`: The file or directory for which to set the creation date and time information.
- `creationTime`: The date and time the file or directory was last written to. This value is expressed in local time.

Exceptions:

- `FileNotFoundException`: The specified path was not found.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentOutOfRangeException`: `creationTime` specifies a value outside the range of dates or times permitted for this operation.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

#### Examples
The following example illustrates the differences in output when using Coordinated Universal Time (UTC) output.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCreationTimeUtc/example.cs._

## Directory.SetCreationTimeUtc(String, DateTime) method

```csharp
public static void SetCreationTimeUtc (string path, DateTime creationTimeUtc);
```

Sets the creation date and time, in Coordinated Universal Time (UTC) format, for the specified file or directory.

Parameters:

- `path`: The file or directory for which to set the creation date and time information.
- `creationTimeUtc`: The date and time the directory or file was created. This value is expressed in local time.

Exceptions:

- `FileNotFoundException`: The specified path was not found.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentOutOfRangeException`: `creationTimeUtc` specifies a value outside the range of dates or times permitted for this operation.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.
