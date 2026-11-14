---
title: "File class (part 10 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 10 of 12)

## File.SetLastAccessTime(String, DateTime) method

```csharp
public static void SetLastAccessTime (string path, DateTime lastAccessTime);
```

Sets the date and time the specified file was last accessed.

Parameters:

- `path`: The file for which to set the access date and time information.
- `lastAccessTime`: A `DateTime` containing the value to set for the last access date and time of `path`. This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `FileNotFoundException`: The specified path was not found.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `ArgumentOutOfRangeException`: `lastAccessTime` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example checks the file system for the specified file, creating it if necessary, and then sets and gets the last access time.

_Code sample not included: ~/snippets/csharp/System.IO/File/SetLastAccessTime/file setlastaccess.cs._

## File.SetLastAccessTimeUtc(SafeFileHandle, DateTime) method

```csharp
public static void SetLastAccessTimeUtc (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, DateTime lastAccessTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC), that the specified file or directory was last accessed.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to set the last access date and time information.
- `lastAccessTimeUtc`: A `DateTime` containing the value to set for the last access date and time of `fileHandle`.
This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `ArgumentOutOfRangeException`: `lastAccessTimeUtc` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `IOException`: An I/O error occurred while performing the operation.

To be added.

## File.SetLastAccessTimeUtc(String, DateTime) method

```csharp
public static void SetLastAccessTimeUtc (string path, DateTime lastAccessTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC), that the specified file was last accessed.

Parameters:

- `path`: The file for which to set the access date and time information.
- `lastAccessTimeUtc`: A `DateTime` containing the value to set for the last access date and time of `path`. This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `FileNotFoundException`: The specified path was not found.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `ArgumentOutOfRangeException`: `lastAccessTimeUtc` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

## File.SetLastWriteTime(SafeFileHandle, DateTime) method

```csharp
public static void SetLastWriteTime (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, DateTime lastWriteTime);
```

Sets the date and time that the specified file or directory was last written to.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to set the last write date and time information.
- `lastWriteTime`: A `DateTime` containing the value to set for the last write date and time of `fileHandle`.
This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `ArgumentOutOfRangeException`: `lastWriteTime` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `IOException`: An I/O error occurred while performing the operation.

To be added.

## File.SetLastWriteTime(String, DateTime) method

```csharp
public static void SetLastWriteTime (string path, DateTime lastWriteTime);
```

Sets the date and time that the specified file was last written to.

Parameters:

- `path`: The file for which to set the date and time information.
- `lastWriteTime`: A `DateTime` containing the value to set for the last write date and time of `path`. This value is expressed in local time.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `FileNotFoundException`: The specified path was not found.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `ArgumentOutOfRangeException`: `lastWriteTime` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example checks the file system for the specified file, creating the file if necessary, and then sets and gets the last write time of the file.

_Code sample not included: ~/snippets/csharp/System.IO/File/SetLastWriteTime/file setlastwrite.cs._

## File.SetLastWriteTimeUtc(SafeFileHandle, DateTime) method

```csharp
public static void SetLastWriteTimeUtc (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, DateTime lastWriteTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC), that the specified file or directory was last written to.

Parameters:

- `fileHandle`: A `SafeFileHandle` to the file or directory for which to set the last write date and time information.
- `lastWriteTimeUtc`: A `DateTime` containing the value to set for the last write date and time of `fileHandle`.
This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `fileHandle` is `null`.
- `ArgumentOutOfRangeException`: `lastWriteTimeUtc` specifies a value outside the range of dates, times, or both permitted for this operation.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `IOException`: An I/O error occurred while performing the operation.

To be added.

## File.SetLastWriteTimeUtc(String, DateTime) method

```csharp
public static void SetLastWriteTimeUtc (string path, DateTime lastWriteTimeUtc);
```

Sets the date and time, in Coordinated Universal Time (UTC), that the specified file was last written to.

Parameters:

- `path`: The file for which to set the date and time information.
- `lastWriteTimeUtc`: A `DateTime` containing the value to set for the last write date and time of `path`. This value is expressed in UTC time.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `FileNotFoundException`: The specified path was not found.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `ArgumentOutOfRangeException`: `lastWriteTimeUtc` specifies a value outside the range of dates or times permitted for this operation.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

## File.SetUnixFileMode(SafeFileHandle, UnixFileMode) method

```csharp
public static void SetUnixFileMode (Microsoft.Win32.SafeHandles.SafeFileHandle fileHandle, System.IO.UnixFileMode mode);
```

Sets the specified `UnixFileMode` of the specified file handle.

Parameters:

- `fileHandle`: The file handle.
- `mode`: The Unix file mode.

Exceptions:

- `ArgumentException`: The file mode is invalid.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ObjectDisposedException`: The file is closed.

To be added.

## File.SetUnixFileMode(String, UnixFileMode) method

```csharp
public static void SetUnixFileMode (string path, System.IO.UnixFileMode mode);
```

Sets the specified `UnixFileMode` of the file on the specified path.

Parameters:

- `path`: The path to the file.
- `mode`: The Unix file mode.

Exceptions:

- `ArgumentException`: `path` is a zero-length string, or contains one or more invalid characters. You can query for invalid characters by using the `Path.GetInvalidPathChars` method.
- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: The file mode is invalid.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `PathTooLongException`: The specified path exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: A component of the `path` is not a directory.
- `FileNotFoundException`: The file cannot be found.

To be added.

## File.WriteAllBytes(String, Byte[]) method

```csharp
public static void WriteAllBytes (string path, byte[] bytes);
```

Creates a new file, writes the specified byte array to the file, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `bytes`: The bytes to write to the file.

Exceptions:

- `ArgumentNullException`: `path` is `null` or the byte array is empty.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.

-or-

This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.
- `NotSupportedException`: `path` is in an invalid format.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Given a byte array and a file path, this method opens the specified file, writes the contents of the byte array to the file, and then closes the file.

## File.WriteAllBytes(String, Byte>) method

```csharp
public static void WriteAllBytes (string path, ReadOnlySpan<byte> bytes);
```

Creates a new file, writes the specified byte array to the file, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `bytes`: The bytes to write to the file.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` is empty.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

`path` specified a file that is hidden.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.

-or-

This operation is not supported on the current platform.
- `NotSupportedException`: `path` is in an invalid format.

To be added.

## File.WriteAllBytesAsync(String, Byte[], CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllBytesAsync (string path, byte[] bytes, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, writes the specified byte array to the file, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `bytes`: The bytes to write to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `File.WriteAllBytes`.

## File.WriteAllBytesAsync(String, Byte>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WriteAllBytesAsync (string path, ReadOnlyMemory<byte> bytes, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a new file, writes the specified byte array to the file, and then closes the file. If the target file already exists, it is truncated and overwritten.

Parameters:

- `path`: The file to write to.
- `bytes`: The bytes to write to the file.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` is empty.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
