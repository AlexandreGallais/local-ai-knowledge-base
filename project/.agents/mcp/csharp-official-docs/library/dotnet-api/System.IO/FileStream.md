---
title: "FileStream class (part 1 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStream class

Namespace: `System.IO`

```csharp
public class FileStream : System.IO.Stream
```

Provides a `Stream` for a file, supporting both synchronous and asynchronous read and write operations.

Use the `FileStream` class to read from, write to, open, and close files on a file system, and to manipulate other file-related operating system handles, including pipes, standard input, and standard output. You can use the `FileStream.Read`, `FileStream.Write`, `Stream.CopyTo`, and `FileStream.Flush` methods to perform synchronous operations, or the `FileStream.ReadAsync`, `FileStream.WriteAsync`, `Stream.CopyToAsync`, and `FileStream.FlushAsync` methods to perform asynchronous operations. Use the asynchronous methods to perform resource-intensive file operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. `FileStream` buffers input and output for better performance.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

The `IsAsync` property indicates whether the underlying handle is configured for asynchronous I/O. On Windows, this means the handle was opened for overlapped I/O. On Unix, starting in .NET 11, the property is `true` only when the file descriptor has the `O_NONBLOCK` flag set; regular files return `false` even when opened with `Asynchronous`. You can call asynchronous methods such as `FileStream.ReadAsync` and `FileStream.WriteAsync` when the property is `false`, but the I/O is performed synchronously.

The `FileStream.Seek` method supports random access to files. `FileStream.Seek` allows the read/write position to be moved to any position within the file. This is done with byte offset reference point parameters. The byte offset is relative to the seek reference point, which can be the beginning, the current position, or the end of the underlying file, as represented by the three members of the `SeekOrigin` enumeration.

> **Note:**
> Disk files always support random access. At the time of construction, the `CanSeek` property value is set to `true` or `false` depending on the underlying file type. If the underlying file type is FILE_TYPE_DISK, as defined in winbase.h, the `CanSeek` property value is `true`. Otherwise, the `CanSeek` property value is `false`.

If a process terminates with part of a file locked or closes a file that has outstanding locks, the behavior is undefined.

For directory operations and other file operations, see the `File`, `Directory`, and `Path` classes. The `File` class is a utility class that has static methods primarily for the creation of `FileStream` objects based on file paths. The `MemoryStream` class creates a stream from a byte array and is similar to the `FileStream` class.

For a list of common file and directory operations, see Common I/O Tasks.

#### Detection of stream position changes

When a `FileStream` object does not have an exclusive hold on its handle, another thread could access the file handle concurrently and change the position of the operating system's file pointer that is associated with the file handle. In this case, the cached position in the `FileStream` object and the cached data in the buffer could be compromised. The `FileStream` object routinely performs checks on methods that access the cached buffer to ensure that the operating system's handle position is the same as the cached position used by the `FileStream` object.

If an unexpected change in the handle position is detected in a call to the `FileStream.Read` method, .NET discards the contents of the buffer and reads the stream from the file again. This can affect performance, depending on the size of the file and any other processes that could affect the position of the file stream.

If an unexpected change in the handle position is detected in a call to the `FileStream.Write` method, the contents of the buffer are discarded and an `IOException` exception is thrown.

A `FileStream` object will not have an exclusive hold on its handle when either the `SafeFileHandle` property is accessed to expose the handle or the `FileStream` object is given the `SafeFileHandle` property in its constructor.

The following example demonstrates some of the `FileStream` constructors.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/fstream class.cs._

The following example shows how to write to a file asynchronously. This code runs in a WPF app that has a TextBlock named UserInput and a button hooked up to a Click event handler that is named Button_Click. The file path needs to be changed to a file that exists on the computer.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example3.cs._

## FileStream.FileStream(SafeFileHandle, FileAccess) constructor

```csharp
public FileStream (Microsoft.Win32.SafeHandles.SafeFileHandle handle, System.IO.FileAccess access);
```

Initializes a new instance of the `FileStream` class for the specified file handle, with the specified read/write permission.

Parameters:

- `handle`: A file handle for the file that the current `FileStream` object will encapsulate.
- `access`: A bitwise combination of the enumeration values that sets the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.

Exceptions:

- `ArgumentException`: `access` is not a field of `FileAccess`.
- `SecurityException`: The caller does not have the required permission.
- `IOException`: An I/O error, such as a disk error, occurred.

-or-

The stream has been closed.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified file handle, such as when `access` is `Write` or `ReadWrite` and the file handle is set for read-only access.

#### Remarks
When `Stream.Close` is called, the handle is also closed and the file's handle count is decremented.

`FileStream` assumes that it has exclusive control over the handle. Reading, writing, or seeking while a `FileStream` is also holding a handle could result in data corruption. For data safety, call `FileStream.Flush` before using the handle, and avoid calling any methods other than `Close` after you are done using the handle.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

`FileShare.Read` is the default for those `FileStream` constructors without a `FileShare` parameter.

For a list of common file and directory operations, see Common I/O Tasks.

## FileStream.FileStream(IntPtr, FileAccess) constructor

```csharp
public FileStream (IntPtr handle, System.IO.FileAccess access);
```

Initializes a new instance of the `FileStream` class for the specified file handle, with the specified read/write permission.

Parameters:

- `handle`: A file handle for the file that the current `FileStream` object will encapsulate.
- `access`: A bitwise combination of the enumeration values that sets the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.

Exceptions:

- `ArgumentException`: `access` is not a field of `FileAccess`.
- `SecurityException`: The caller does not have the required permission.
- `IOException`: An I/O error, such as a disk error, occurred.

-or-

The stream has been closed.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified file handle, such as when `access` is `Write` or `ReadWrite` and the file handle is set for read-only access.

To be added.

## FileStream.FileStream(String, FileMode) constructor

```csharp
public FileStream (string path, System.IO.FileMode mode);
```

Initializes a new instance of the `FileStream` class with the specified path and creation mode.

Parameters:

- `path`: A relative or absolute path for the file that the current `FileStream` object will encapsulate.
- `mode`: One of the enumeration values that determines how to open or create the file.

Exceptions:

- `ArgumentException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in a non-NTFS environment.
- `ArgumentNullException`: `path` is `null`.
- `SecurityException`: The caller does not have the required permission.
- `FileNotFoundException`: The file cannot be found, such as when `mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `UnauthorizedAccessException`: `path` specifies a file that is read-only.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.

-or-

The stream has been closed.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `ArgumentOutOfRangeException`: `mode` contains an invalid value.

#### Remarks

.NET doesn't support direct access to physical disks through paths that are device names, such as "\\\\.\PHYSICALDRIVE0 ".

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The constructor is given read/write access to the file, and it is opened sharing Read access (that is, requests to open the file for writing by this or another process will fail until the `FileStream` object has been closed, but read attempts will succeed).

You cannot use this constructor to open read-only files; instead, you must use a constructor that accepts a `FileAccess` parameter with the value set to `FileAccess.Read`.

The buffer size is set to the default size of 4096 bytes (4 KB).

> **Note:**
> `path` is not required to be a file stored on disk; it can be any part of a system that supports access through streams. For example, depending on the system, this class can access a physical device.

`Stream.CanSeek` is `true` for all `FileStream` objects that encapsulate files. If `path` indicates a device that does not support seeking, the `CanSeek` property on the resulting `FileStream` is `false`. For additional information, see `Stream.CanSeek`.

`FileShare.Read` is the default for those `FileStream` constructors without a `FileShare` parameter.

For constructors without a `FileAccess` parameter, if the `mode` parameter is set to `Append`, `Write` is the default access. Otherwise, the access is set to `ReadWrite`.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following code example shows how to write data to a file, byte by byte, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source.cs._

## FileStream.FileStream(String, FileStreamOptions) constructor

```csharp
public FileStream (string path, System.IO.FileStreamOptions options);
```

Initializes a new instance of the `FileStream` class with the specified path, creation mode, read/write and sharing permission, buffer size, additional file options, preallocation size, and the access other FileStreams can have to the same file.

Parameters:

- `path`: A relative or absolute path for the file that the current `FileStream` instance will encapsulate.
- `options`: An object that describes optional `FileStream` parameters to use.

Exceptions:

- `ArgumentNullException`: `path` or `options` is `null`.
- `ArgumentException`: `path` is an empty string, contains only white space, or contains one or more invalid characters.

-or-

`path` refers to a non-file device, such as `CON:`, `COM1:`, or `LPT1:`, in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as `CON:`, `COM1:`, `LPT1:`, etc. in a non-NTFS environment.
- `FileNotFoundException`: The file cannot be found, such as when `FileStreamOptions.Mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.

-or-

The stream has been closed.

-or-

The disk was full (when `FileStreamOptions.PreallocationSize` was provided and `path` was pointing to a regular file).

-or-

The file was too large (when `FileStreamOptions.PreallocationSize` was provided and `path` was pointing to a regular file).
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `UnauthorizedAccessException`: The `FileStreamOptions.Access` requested is not permitted by the operating system for the specified `path`, such as when `FileStreamOptions.Access` is `FileAccess.Write` or `FileAccess.ReadWrite` and the file or directory is set for read-only access.

-or-

`FileOptions.Encrypted` is specified for `FileStreamOptions.Options` , but file encryption is not supported on the current platform.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

Specifying a value for `PreallocationSize` provides a hint about the preallocation size, but not a strong guarantee. For full usage details, see the documentation for `PreallocationSize`.
