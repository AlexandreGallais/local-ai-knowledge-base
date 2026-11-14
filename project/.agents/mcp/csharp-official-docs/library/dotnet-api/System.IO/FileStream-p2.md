---
title: "FileStream class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStream class (part 2 of 7)

## FileStream.FileStream(SafeFileHandle, FileAccess, Int32) constructor

```csharp
public FileStream (Microsoft.Win32.SafeHandles.SafeFileHandle handle, System.IO.FileAccess access, int bufferSize);
```

Initializes a new instance of the `FileStream` class for the specified file handle, with the specified read/write permission, and buffer size.

Parameters:

- `handle`: A file handle for the file that the current `FileStream` object will encapsulate.
- `access`: A `FileAccess` constant that sets the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.
- `bufferSize`: A positive `Int32` value greater than 0 indicating the buffer size. The default buffer size is 4096.

Exceptions:

- `ArgumentException`: The `handle` parameter is an invalid handle.

-or-

The `handle` parameter is a synchronous handle and it was used asynchronously.
- `ArgumentOutOfRangeException`: The `bufferSize` parameter is negative.
- `IOException`: An I/O error, such as a disk error, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified file handle, such as when `access` is `Write` or `ReadWrite` and the file handle is set for read-only access.

#### Remarks
`FileStream` assumes that it has exclusive control over the handle. Reading, writing, or seeking while a `FileStream` is also holding a handle could result in data corruption. For data safety, call `FileStream.Flush` before using the handle, and avoid calling any methods other than `Close` after you are done using the handle. Alternately, read and write to the handle before calling this `FileStream` constructor.

`FileShare.Read` is the default for those `FileStream` constructors without a `FileShare` parameter.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

## FileStream.FileStream(IntPtr, FileAccess, Boolean) constructor

```csharp
public FileStream (IntPtr handle, System.IO.FileAccess access, bool ownsHandle);
```

Initializes a new instance of the `FileStream` class for the specified file handle, with the specified read/write permission and `FileStream` instance ownership.

Parameters:

- `handle`: A file handle for the file that the current `FileStream` object will encapsulate.
- `access`: A bitwise combination of the enumeration values that sets the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.
- `ownsHandle`: `true` if the file handle will be owned by this `FileStream` instance; otherwise, `false`.

Exceptions:

- `ArgumentException`: `access` is not a field of `FileAccess`.
- `SecurityException`: The caller does not have the required permission.
- `IOException`: An I/O error, such as a disk error, occurred.

-or-

The stream has been closed.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified file handle, such as when `access` is `Write` or `ReadWrite` and the file handle is set for read-only access.

To be added.

## FileStream.FileStream(String, FileMode, FileAccess) constructor

```csharp
public FileStream (string path, System.IO.FileMode mode, System.IO.FileAccess access);
```

Initializes a new instance of the `FileStream` class with the specified path, creation mode, and read/write permission.

Parameters:

- `path`: A relative or absolute path for the file that the current `FileStream` object will encapsulate.
- `mode`: One of the enumeration values that determines how to open or create the file.
- `access`: A bitwise combination of the enumeration values that determines how the file can be accessed by the `FileStream` object. This also determines the values returned by the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object. `FileStream.CanSeek` is `true` if `path` specifies a disk file.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in a non-NTFS environment.
- `FileNotFoundException`: The file cannot be found, such as when `mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified `path`, such as when `access` is `Write` or `ReadWrite` and the file or directory is set for read-only access.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `ArgumentOutOfRangeException`: `mode` contains an invalid value.

#### Remarks

.NET does not support direct access to physical disks through paths that are device names, such as "\\\\.\PHYSICALDRIVE0 ".

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The constructor is given read/write access to the file, and it is opened sharing Read access (that is, requests to open the file for writing by this or another process will fail until the `FileStream` object has been closed, but read attempts will succeed). The buffer size is set to the default size of 4096 bytes (4 KB).

> **Note:**
> `path` is not required to be a file stored on disk; it can be any part of a system that supports access through streams. For example, depending on the system, this class can access a physical device.

`Stream.CanSeek` is `true` for all `FileStream` objects that encapsulate files. If `path` indicates a device that does not support seeking, the `CanSeek` property on the resulting `FileStream` is `false`. For additional information, see `Stream.CanSeek`.

`FileShare.Read` is the default for those `FileStream` constructors without a `FileShare` parameter.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

## FileStream.FileStream(SafeFileHandle, FileAccess, Int32, Boolean) constructor

```csharp
public FileStream (Microsoft.Win32.SafeHandles.SafeFileHandle handle, System.IO.FileAccess access, int bufferSize, bool isAsync);
```

Initializes a new instance of the `FileStream` class for the specified file handle, with the specified read/write permission, buffer size, and synchronous or asynchronous state.

Parameters:

- `handle`: A file handle for the file that this `FileStream` object will encapsulate.
- `access`: A bitwise combination of the enumeration values that sets the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.
- `bufferSize`: A positive `Int32` value greater than 0 indicating the buffer size. The default buffer size is 4096.
- `isAsync`: `true` if the handle was opened asynchronously (that is, in overlapped I/O mode); otherwise, `false`.

Exceptions:

- `ArgumentException`: The `handle` parameter is an invalid handle.

-or-

The `handle` parameter is a synchronous handle and it was used asynchronously.
- `ArgumentOutOfRangeException`: The `bufferSize` parameter is negative.
- `IOException`: An I/O error, such as a disk error, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified file handle, such as when `access` is `Write` or `ReadWrite` and the file handle is set for read-only access.

#### Remarks
You set the `isAsync` parameter to `true` to open the file handle asynchronously. When the parameter is `true`, the stream utilizes overlapped I/O to perform file operations asynchronously. However, the parameter does not have to be `true` to call the `FileStream.ReadAsync`, `FileStream.WriteAsync`, or `Stream.CopyToAsync` method. When the `isAsync` parameter is `false` and you call the asynchronous read and write operations, the UI thread is still not blocked, but the actual I/O operation is performed synchronously.

`FileStream` assumes that it has exclusive control over the handle. Reading, writing, or seeking while a `FileStream` is also holding a handle could result in data corruption. For data safety, call `FileStream.Flush` before using the handle, and avoid calling any methods other than `Close` after you are done using the handle. Alternately, read and write to the handle before calling this `FileStream` constructor.

`FileShare.Read` is the default for those `FileStream` constructors without a `FileShare` parameter.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

## FileStream.FileStream(IntPtr, FileAccess, Boolean, Int32) constructor

```csharp
public FileStream (IntPtr handle, System.IO.FileAccess access, bool ownsHandle, int bufferSize);
```

Initializes a new instance of the `FileStream` class for the specified file handle, with the specified read/write permission, `FileStream` instance ownership, and buffer size.

Parameters:

- `handle`: A file handle for the file that this `FileStream` object will encapsulate.
- `access`: A bitwise combination of the enumeration values that sets the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.
- `ownsHandle`: `true` if the file handle will be owned by this `FileStream` instance; otherwise, `false`.
- `bufferSize`: A positive `Int32` value greater than 0 indicating the buffer size. The default buffer size is 4096.

Exceptions:

- `ArgumentOutOfRangeException`: `bufferSize` is negative.
- `IOException`: An I/O error, such as a disk error, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified file handle, such as when `access` is `Write` or `ReadWrite` and the file handle is set for read-only access.

To be added.

## FileStream.FileStream(String, FileMode, FileAccess, FileShare) constructor

```csharp
public FileStream (string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share);
```

Initializes a new instance of the `FileStream` class with the specified path, creation mode, read/write permission, and sharing permission.

Parameters:

- `path`: A relative or absolute path for the file that the current `FileStream` object will encapsulate.
- `mode`: One of the enumeration values that determines how to open or create the file.
- `access`: A bitwise combination of the enumeration values that determines how the file can be accessed by the `FileStream` object. This also determines the values returned by the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object. `FileStream.CanSeek` is `true` if `path` specifies a disk file.
- `share`: A bitwise combination of the enumeration values that determines how the file will be shared by processes.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in a non-NTFS environment.
- `FileNotFoundException`: The file cannot be found, such as when `mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified `path`, such as when `access` is `Write` or `ReadWrite` and the file or directory is set for read-only access.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `ArgumentOutOfRangeException`: `mode` contains an invalid value.

#### Remarks

.NET doesn't support direct access to physical disks through paths that are device names, such as "\\\\.\PHYSICALDRIVE0 ".

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

The constructor is given read/write access to the file, and it is opened sharing Read access (that is, requests to open the file for writing by this or another process will fail until the `FileStream` object has been closed, but read attempts will succeed). The buffer size is set to the default size of 4096 bytes (4 KB).

> **Note:**
> `path` is not required to be a file stored on disk; it can be any part of a system that supports access through streams. For example, depending on the system, this class can access a physical device.

`Stream.CanSeek` is `true` for all `FileStream` objects that encapsulate files. If `path` indicates a device that does not support seeking, the `CanSeek` property on the resulting `FileStream` is `false`. For additional information, see `Stream.CanSeek`.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
This code example is part of a larger example provided for the `FileStream.Lock` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/fstreamlock.cs._
