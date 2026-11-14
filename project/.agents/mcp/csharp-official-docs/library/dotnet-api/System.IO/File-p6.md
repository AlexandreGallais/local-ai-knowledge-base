---
title: "File class (part 6 of 12)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/File.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# File class (part 6 of 12)

## File.Move(String, String, Boolean) method

```csharp
public static void Move (string sourceFileName, string destFileName, bool overwrite);
```

Moves a specified file to a new location, providing the options to specify a new file name and to replace the destination file if it already exists.

Parameters:

- `sourceFileName`: The name of the file to move. Can include a relative or absolute path.
- `destFileName`: The new path and name for the file.
- `overwrite`: `true` to replace the destination file if it already exists; `false` otherwise.

Exceptions:

- `IOException`: `destFileName` already exists and `overwrite` is `false`.

-or-

An I/O error has occurred, e.g. while copying the file across disk volumes.
- `FileNotFoundException`: `sourceFileName` was not found.
- `ArgumentNullException`: `sourceFileName` or `destFileName` is `null`.
- `UnauthorizedAccessException`: The caller does not have the required permission.

-or-

The Operating System has failed to acquire an exclusive access to the destination file.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The path specified in `sourceFileName` or `destFileName` is invalid, (for example, it is on an unmapped drive).
- `NotSupportedException`: `sourceFileName` or `destFileName` is in an invalid format.

#### Remarks

This method works across disk volumes, and it does not throw an exception if the source and destination are the same.

The `sourceFileName` and `destFileName` arguments can include relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

Moving the file across disk volumes is equivalent to copying the file and deleting it from the source if the copying was successful.

If you try to move a file across disk volumes and that file is in use, the file is copied to the destination, but it is not deleted from the source.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples

The following example moves a file.

_Code sample not included: ~/snippets/csharp/System.IO/File/Move/file move.cs._

## File.Open(String, FileMode) method

```csharp
public static System.IO.FileStream Open (string path, System.IO.FileMode mode);
```

Opens a `FileStream` on the specified path with read/write access with no sharing.

Parameters:

- `path`: The file to open.
- `mode`: A `FileMode` value that specifies whether a file is created if one does not exist, and determines whether the contents of existing files are retained or overwritten.

Returns: A `FileStream` opened in the specified mode and path, with read/write access and not shared.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only.

-or-

This operation is not supported on the current platform.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.

-or-

`mode` is `FileMode.Create` and the specified file is a hidden file.
- `ArgumentOutOfRangeException`: `mode` specified an invalid value.
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example creates a temporary file and writes some text to it. The example then opens the file, using T:System.IO.FileMode.Open; that is, if the file did not already exist, it would not be created.

_Code sample not included: ~/snippets/csharp/System.IO/File/Open/file open1.cs._

## File.Open(String, FileStreamOptions) method

```csharp
public static System.IO.FileStream Open (string path, System.IO.FileStreamOptions options);
```

Initializes a new instance of the `FileStream` class with the specified path, creation mode, read/write and sharing permission, the access other FileStreams can have to the same file, the buffer size, additional file options and the allocation size.

Parameters:

- `path`: The path of the file to open.
- `options`: An object that describes optional `FileStream` parameters to use.

Returns: A `FileStream` instance that wraps the opened file.

#### Remarks

`%23ctor` for information about exceptions.

## File.Open(String, FileMode, FileAccess) method

```csharp
public static System.IO.FileStream Open (string path, System.IO.FileMode mode, System.IO.FileAccess access);
```

Opens a `FileStream` on the specified path, with the specified mode and access with no sharing.

Parameters:

- `path`: The file to open.
- `mode`: A `FileMode` value that specifies whether a file is created if one does not exist, and determines whether the contents of existing files are retained or overwritten.
- `access`: A `FileAccess` value that specifies the operations that can be performed on the file.

Returns: An unshared `FileStream` that provides access to the specified file, with the specified mode and access.

Exceptions:

- `ArgumentException`: `access` specified `Read` and `mode` specified `Create`, `CreateNew`, `Truncate`, or `Append`.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only and `access` is not `Read`.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.

-or-

`mode` is `FileMode.Create` and the specified file is a hidden file.
- `ArgumentOutOfRangeException`: `mode` or `access` specified an invalid value.
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

#### Examples
The following example opens a file with read-only access.

_Code sample not included: ~/snippets/csharp/System.IO/File/Open/file open2.cs._

## File.Open(String, FileMode, FileAccess, FileShare) method

```csharp
public static System.IO.FileStream Open (string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share);
```

Opens a `FileStream` on the specified path, having the specified mode with read, write, or read/write access and the specified sharing option.

Parameters:

- `path`: The file to open.
- `mode`: A `FileMode` value that specifies whether a file is created if one does not exist, and determines whether the contents of existing files are retained or overwritten.
- `access`: A `FileAccess` value that specifies the operations that can be performed on the file.
- `share`: A `FileShare` value specifying the type of access other threads have to the file.

Returns: A `FileStream` on the specified path, having the specified mode with read, write, or read/write access and the specified sharing option.

Exceptions:

- `ArgumentException`: `access` specified `Read` and `mode` specified `Create`, `CreateNew`, `Truncate`, or `Append`.
- `ArgumentNullException`: `path` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `path` specified a file that is read-only and `access` is not `Read`.

-or-

`path` specified a directory.

-or-

The caller does not have the required permission.

-or-

`mode` is `FileMode.Create` and the specified file is a hidden file.
- `ArgumentOutOfRangeException`: `mode`, `access`, or `share` specified an invalid value.
- `FileNotFoundException`: The file specified in `path` was not found.
- `NotSupportedException`: `path` is in an invalid format.

#### Remarks
The `path` parameter is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. To obtain the current working directory, see `Directory.GetCurrentDirectory`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example opens a file with read-only access and with file sharing disallowed.

_Code sample not included: ~/snippets/csharp/System.IO/File/Open/file open3.cs._

## File.OpenHandle(String, FileMode, FileAccess, FileShare, FileOptions, Int64) method

```csharp
public static Microsoft.Win32.SafeHandles.SafeFileHandle OpenHandle (string path, System.IO.FileMode mode = System.IO.FileMode.Open, System.IO.FileAccess access = System.IO.FileAccess.Read, System.IO.FileShare share = System.IO.FileShare.Read, System.IO.FileOptions options = System.IO.FileOptions.None, long preallocationSize = 0);
```

Initializes a new instance of the `SafeFileHandle` class with the specified path, creation mode, read/write and sharing permission, the access other SafeFileHandles can have to the same file, additional file options and the allocation size.

Parameters:

- `path`: A relative or absolute path for the file that the current `SafeFileHandle` instance will encapsulate.
- `mode`: One of the enumeration values that determines how to open or create the file. The default value is `FileMode.Open`
- `access`: A bitwise combination of the enumeration values that determines how the file can be accessed. The default value is `FileAccess.Read`
- `share`: A bitwise combination of the enumeration values that determines how the file will be shared by processes. The default value is `FileShare.Read`.
- `options`: An object that describes optional `SafeFileHandle` parameters to use.
- `preallocationSize`: The initial allocation size in bytes for the file. A positive value is effective only when a regular file is being created, overwritten, or replaced.
Negative values are not allowed. In other cases (including the default 0 value), it's ignored.

Returns: A `SafeFileHandle` instance.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` is an empty string (""), contains only white space, or contains one or more invalid characters.
-or- `path` refers to a non-file device, such as `CON:`, `COM1:`, `LPT1:`, etc. in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as `CON:`, `COM1:`, `LPT1:`, etc. in a non-NTFS environment.
- `ArgumentOutOfRangeException`: `preallocationSize` is negative.
-or- `mode`, `access`, or `share` contain an invalid value.
- `FileNotFoundException`: The file cannot be found, such as when `mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.
-or- The disk was full (when `preallocationSize` was provided and `path` was pointing to a regular file).
-or- The file was too large (when `preallocationSize` was provided and `path` was pointing to a regular file).
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified `path`, such as when `access`  is `FileAccess.Write` or `FileAccess.ReadWrite` and the file or directory is set for read-only access.
-or- `FileOptions.Encrypted` is specified for `options`, but file encryption is not supported on the current platform.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

To be added.

## File.OpenNullHandle() method

```csharp
public static Microsoft.Win32.SafeHandles.SafeFileHandle OpenNullHandle ();
```

Opens a handle to the system's null device.

Returns: A `SafeFileHandle` to the system's null device.

Exceptions:

- `IOException`: An I/O error occurred while opening the null device.

On Windows, the method opens a handle to `NUL`. On Unix-based systems, the method opens a handle to `/dev/null`.

To redirect unwanted output or provide empty input to processes, use the null device. The null device discards all data written to it and provides no data (EOF) when read from.

The returned handle supports both reading and writing. Read operations return 0 (EOF), and write operations succeed without storing any data. The handle owns the underlying resource, so dispose it when it's no longer needed.

For scenarios that don't require raw file handles or descriptors, consider using `Null` instead.
