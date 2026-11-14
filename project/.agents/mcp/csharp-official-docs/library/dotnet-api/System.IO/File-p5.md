---
title: "File class (part 5 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 5 of 12)

## File.GetLastAccessTime(SafeFileHandle) method

```csharp
public static DateTime GetLastAccessTime (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Returns the last access date and time of the specified file or directory.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to obtain last access date and time information.

Returns: A `DateTime` structure set to the last access date and time for the specified file or directory. This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

To be added.

## File.GetLastAccessTime(String) method

```csharp
public static DateTime GetLastAccessTime (string path);
```

Returns the date and time the specified file or directory was last accessed.

Parameters:

- `path`: The file or directory for which to obtain access date and time information.

Returns: A `DateTime` structure set to the date and time that the specified file or directory was last accessed. This value is expressed in local time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

If the file described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates `GetLastAccessTime`.

_Code sample not included: ~/snippets/csharp/System.IO/File/GetLastAccessTime/file getlastaccess.cs._

## File.GetLastAccessTimeUtc(SafeFileHandle) method

```csharp
public static DateTime GetLastAccessTimeUtc (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Returns the last access date and time, in Coordinated Universal Time (UTC), of the specified file or directory.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to obtain last access date and time information.

Returns: A `DateTime` structure set to the last access date and time for the specified file or directory. This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

To be added.

## File.GetLastAccessTimeUtc(String) method

```csharp
public static DateTime GetLastAccessTimeUtc (string path);
```

Returns the date and time, in Coordinated Universal Time (UTC), that the specified file or directory was last accessed.

Parameters:

- `path`: The file or directory for which to obtain access date and time information.

Returns: A `DateTime` structure set to the date and time that the specified file or directory was last accessed. This value is expressed in UTC time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system.

If the file described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

## File.GetLastWriteTime(SafeFileHandle) method

```csharp
public static DateTime GetLastWriteTime (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Returns the last write date and time of the specified file or directory.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to obtain last write date and time information.

Returns: A `DateTime` structure set to the last write date and time for the specified file or directory. This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

To be added.

## File.GetLastWriteTime(String) method

```csharp
public static DateTime GetLastWriteTime (string path);
```

Returns the date and time the specified file or directory was last written to.

Parameters:

- `path`: The file or directory for which to obtain write date and time information.

Returns: A `DateTime` structure set to the date and time that the specified file or directory was last written to. This value is expressed in local time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system. Each operating system manages the last write time according to its own rules. To improve performance, an operating system might not set the last write time value to the exact time of the last write operation, but might set it to a close approximation instead.

If the file described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC), adjusted to local time.

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates `GetLastWriteTime`.

_Code sample not included: ~/snippets/csharp/System.IO/File/GetLastWriteTime/file getlastwrite.cs._

## File.GetLastWriteTimeUtc(SafeFileHandle) method

```csharp
public static DateTime GetLastWriteTimeUtc (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Returns the last write date and time, in Coordinated Universal Time (UTC), of the specified file or directory.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to obtain last write date and time information.

Returns: A `DateTime` structure set to the last write date and time for the specified file or directory. This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

To be added.

## File.GetLastWriteTimeUtc(String) method

```csharp
public static DateTime GetLastWriteTimeUtc (string path);
```

Returns the date and time, in Coordinated Universal Time (UTC), that the specified file or directory was last written to.

Parameters:

- `path`: The file or directory for which to obtain write date and time information.

Returns: A `DateTime` structure set to the date and time that the specified file or directory was last written to. This value is expressed in UTC time.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks

> **Note:**
>  This method may return an inaccurate value, because it uses native functions whose values may not be continuously updated by the operating system. Each operating system manages the last write time according to its own rules. To improve performance, an operating system might not set the last write time value to the exact time of the last write operation, but might set it to a close approximation instead.

If the file described in the `path` parameter does not exist, this method returns 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC).

The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

## File.GetUnixFileMode(SafeFileHandle) method

```csharp
public static System.IO.UnixFileMode GetUnixFileMode (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle);
```

Gets the `UnixFileMode` of the specified file handle.

Parameters:

- `fileHandle`: The file handle.

Returns: The `UnixFileMode` of the file handle.

Exceptions:

- `ObjectDisposedException`: The file is closed.

To be added.

## File.GetUnixFileMode(String) method

```csharp
public static System.IO.UnixFileMode GetUnixFileMode (string path);
```

Gets the `UnixFileMode` of the file on the path.

Parameters:

- `path`: The path to the file.

Returns: The `UnixFileMode` of the file on the path.

Exceptions:

- `ArgumentException`: `path` is a zero-length string, or contains one or more invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.
- `ArgumentNullException`: `path` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PathTooLongException`: The specified path exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: A component of the `path` is not a directory.
- `FileNotFoundException`: The file cannot be found.

To be added.

## File.Move(String, String) method

```csharp
public static void Move (string sourceFileName, string destFileName);
```

Moves a specified file to a new location, providing the option to specify a new file name.

Parameters:

- `sourceFileName`: The name of the file to move. Can include a relative or absolute path.
- `destFileName`: The new path and name for the file.

Exceptions:

- `IOException`: `destFileName` already exists.

-or-

An I/O error has occurred, e.g. while copying the file across disk volumes.
- `FileNotFoundException`: `sourceFileName` was not found.
- `ArgumentNullException`: `sourceFileName` or `destFileName` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The path specified in `sourceFileName` or `destFileName` is invalid, (for example, it is on an unmapped drive).
- `NotSupportedException`: `sourceFileName` or `destFileName` is in an invalid format.

#### Remarks

This method works across disk volumes, and it does not throw an exception if the source and destination are the same.

Note that if you attempt to replace a file by moving a file of the same name into that directory, an `IOException` is thrown. To avoid this problem:

- You can call `Move` and set the `overwrite` parameter to `true`, which replaces the file if it exists.

- In all .NET versions, you can call `Copy` to copy with overwrite, then call `Delete` to remove the excess source file. This strategy isn't atomic, because a system or program crash during the `Copy` may leave a partially-written destination file, but it will ensure a (possibly incomplete) file always exists at the destination.

- In all .NET versions, you can call `Delete` before calling `Move`, which will only delete the file if it exists.

The `sourceFileName` and `destFileName` arguments can include relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Moving the file across disk volumes is equivalent to copying the file and deleting it from the source if the copying was successful.

If you try to move a file across disk volumes and that file is in use, the file is copied to the destination, but it is not deleted from the source.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples

The following example moves a file.

_Code sample not included: ~/snippets/csharp/System.IO/File/Move/file move.cs._
