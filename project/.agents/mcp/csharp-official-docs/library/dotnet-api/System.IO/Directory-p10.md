---
title: "Directory class (part 10 of 10)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Directory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Directory class (part 10 of 10)

## Directory.SetCurrentDirectory(String) method

```csharp
public static void SetCurrentDirectory (string path);
```

Sets the application's current working directory to the specified directory.

Parameters:

- `path`: The path to which the current working directory is set.

Exceptions:

- `IOException`: An I/O error occurred.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `SecurityException`: The caller does not have the required permission to access unmanaged code.
- `FileNotFoundException`: The specified path was not found.
- `DirectoryNotFoundException`: The specified directory was not found.

#### Remarks
When the application terminates, the working directory is restored to its original location (the directory where the process was started).

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Trailing spaces are removed from the end of the `path` parameter before setting the directory.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

If you are setting the directory to a drive with removable media (for example, "E:" for a USB flash drive), you can determine whether the drive is ready by using the `IsReady` property.

#### Examples
The following example illustrates how to set the current directory and display the directory root.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetDirectoryRoot/example.cs._

## Directory.SetLastAccessTime(String, DateTime) method

```csharp
public static void SetLastAccessTime (string path, DateTime lastAccessTime);
```

Sets the date and time the specified file or directory was last accessed.

Parameters:

- `path`: The file or directory for which to set the access date and time information.
- `lastAccessTime`: An object that contains the value to set for the access date and time of `path`. This value is expressed in local time.

Exceptions:

- `FileNotFoundException`: The specified path was not found.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: `lastAccessTime` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use `SetLastAccessTime`.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/SetLastAccessTime/dir_setlastaccess.cs._

## Directory.SetLastAccessTimeUtc(String, DateTime) method

```csharp
public static void SetLastAccessTimeUtc (string path, DateTime lastAccessTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC) format, that the specified file or directory was last accessed.

Parameters:

- `path`: The file or directory for which to set the access date and time information.
- `lastAccessTimeUtc`: An object that  contains the value to set for the access date and time of `path`. This value is expressed in UTC time.

Exceptions:

- `FileNotFoundException`: The specified path was not found.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: `lastAccessTimeUtc` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example illustrates the differences in output when using Coordinated Universal Time (UTC) output.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCreationTimeUtc/example.cs._

## Directory.SetLastWriteTime(String, DateTime) method

```csharp
public static void SetLastWriteTime (string path, DateTime lastWriteTime);
```

Sets the date and time a directory was last written to.

Parameters:

- `path`: The path of the directory.
- `lastWriteTime`: The date and time the directory was last written to. This value is expressed in local time.

Exceptions:

- `FileNotFoundException`: `path` was not found (for example, the directory doesn't exist or it is on an unmapped drive).
- `DirectoryNotFoundException`: `path` was not found (for example, the directory doesn't exist or it is on an unmapped drive).
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: `lastWriteTime` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates how to use `SetLastWriteTime`.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/SetLastWriteTime/dir_setlastwrite.cs._

## Directory.SetLastWriteTimeUtc(String, DateTime) method

```csharp
public static void SetLastWriteTimeUtc (string path, DateTime lastWriteTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC) format, that a directory was last written to.

Parameters:

- `path`: The path of the directory.
- `lastWriteTimeUtc`: The date and time the directory was last written to. This value is expressed in UTC time.

Exceptions:

- `FileNotFoundException`: `path` was not found (for example, the directory doesn't exist or it is on an unmapped drive).
- `DirectoryNotFoundException`: `path` was not found (for example, the directory doesn't exist or it is on an unmapped drive).
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PlatformNotSupportedException`: The current operating system is not Windows NT or later.
- `ArgumentOutOfRangeException`: `lastWriteTimeUtc` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

The case-sensitivity of the `path` parameter corresponds to that of the file system on which the code is running. For example, it's case-insensitive on NTFS (the default Windows file system) and case-sensitive on Linux file systems.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example illustrates the differences in output when using Coordinated Universal Time (UTC) output.

_Code sample not included: ~/snippets/csharp/System.IO/Directory/GetCreationTimeUtc/example.cs._
