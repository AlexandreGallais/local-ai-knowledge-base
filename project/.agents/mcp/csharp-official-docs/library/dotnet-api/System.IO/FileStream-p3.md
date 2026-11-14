---
title: "FileStream class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStream class (part 3 of 7)

## FileStream.FileStream(IntPtr, FileAccess, Boolean, Int32, Boolean) constructor

```csharp
public FileStream (IntPtr handle, System.IO.FileAccess access, bool ownsHandle, int bufferSize, bool isAsync);
```

Initializes a new instance of the `FileStream` class for the specified file handle, with the specified read/write permission, `FileStream` instance ownership, buffer size, and synchronous or asynchronous state.

Parameters:

- `handle`: A file handle for the file that this `FileStream` object will encapsulate.
- `access`: A bitwise combination of the enumeration values that sets the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object.
- `ownsHandle`: `true` if the file handle will be owned by this `FileStream` instance; otherwise, `false`.
- `bufferSize`: A positive `Int32` value greater than 0 indicating the buffer size. The default buffer size is 4096.
- `isAsync`: `true` if the handle was opened asynchronously (that is, in overlapped I/O mode); otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `access` is less than `FileAccess.Read` or greater than `FileAccess.ReadWrite` or `bufferSize` is less than or equal to 0.
- `ArgumentException`: The handle is invalid.
- `IOException`: An I/O error, such as a disk error, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified file handle, such as when `access` is `Write` or `ReadWrite` and the file handle is set for read-only access.

To be added.

## FileStream.FileStream(String, FileMode, FileAccess, FileShare, Int32) constructor

```csharp
public FileStream (string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share, int bufferSize);
```

Initializes a new instance of the `FileStream` class with the specified path, creation mode, read/write and sharing permission, and buffer size.

Parameters:

- `path`: A relative or absolute path for the file that the current `FileStream` object will encapsulate.
- `mode`: One of the enumeration values that determines how to open or create the file.
- `access`: A bitwise combination of the enumeration values that determines how the file can be accessed by the `FileStream` object. This also determines the values returned by the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object. `FileStream.CanSeek` is `true` if `path` specifies a disk file.
- `share`: A bitwise combination of the enumeration values that determines how the file will be shared by processes.
- `bufferSize`: A positive `Int32` value greater than 0 indicating the buffer size. The default buffer size is 4096.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in a non-NTFS environment.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.

-or-

`mode`, `access`, or `share` contain an invalid value.
- `FileNotFoundException`: The file cannot be found, such as when `mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified `path`, such as when `access` is `Write` or `ReadWrite` and the file or directory is set for read-only access.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

.NET does not support direct access to physical disks through paths that are device names, such as "\\\\.\PHYSICALDRIVE0 ".

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

> **Note:**
> `path` is not required to be a file stored on disk; it can be any part of a system that supports access through streams. For example, depending on the system, this class can access a physical device.

`Stream.CanSeek` is `true` for all `FileStream` objects that encapsulate files. If `path` indicates a device that does not support seeking, the `CanSeek` property on the resulting `FileStream` is `false`. For additional information, see `Stream.CanSeek`.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

## FileStream.FileStream(String, FileMode, FileAccess, FileShare, Int32, Boolean) constructor

```csharp
public FileStream (string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share, int bufferSize, bool useAsync);
```

Initializes a new instance of the `FileStream` class with the specified path, creation mode, read/write and sharing permission, buffer size, and synchronous or asynchronous state.

Parameters:

- `path`: A relative or absolute path for the file that the current `FileStream` object will encapsulate.
- `mode`: One of the enumeration values that determines how to open or create the file.
- `access`: A bitwise combination of the enumeration values that determines how the file can be accessed by the `FileStream` object. This also determines the values returned by the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object. `FileStream.CanSeek` is `true` if `path` specifies a disk file.
- `share`: A bitwise combination of the enumeration values that determines how the file will be shared by processes.
- `bufferSize`: A positive `Int32` value greater than 0 indicating the buffer size. The default buffer size is 4096.
- `useAsync`: Specifies whether to use asynchronous I/O or synchronous I/O. However, note that the underlying operating system might not support asynchronous I/O, so when specifying `true`, the handle might be opened synchronously depending on the platform. When opened asynchronously, the `FileStream.BeginRead` and `FileStream.BeginWrite` methods perform better on large reads or writes, but they might be much slower for small reads or writes. If the application is designed to take advantage of asynchronous I/O, set the `useAsync` parameter to `true`. Using asynchronous I/O correctly can speed up applications by as much as a factor of 10, but using it without redesigning the application for asynchronous I/O can decrease performance by as much as a factor of 10.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in a non-NTFS environment.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.

-or-

`mode`, `access`, or `share` contain an invalid value.
- `FileNotFoundException`: The file cannot be found, such as when `mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified `path`, such as when `access` is `Write` or `ReadWrite` and the file or directory is set for read-only access.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

.NET does not support direct access to physical disks through paths that are device names, such as "\\\\.\PHYSICALDRIVE0 ".

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

> **Note:**
> `path` is not required to be a file stored on disk; it can be any part of a system that supports access through streams. For example, depending on the system, this class can access a physical device.

`Stream.CanSeek` is `true` for all `FileStream` objects that encapsulate files. If `path` indicates a device that does not support seeking, the `CanSeek` property on the resulting `FileStream` is `false`. For additional information, see `Stream.CanSeek`.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following code example shows how to asynchronously write data to a file and then verify that the data was written correctly. A `State` object is created to pass <example-value> from the main thread to the `EndReadCallback` and `EndWriteCallback` methods.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source1.cs._

## FileStream.FileStream(String, FileMode, FileAccess, FileShare, Int32, FileOptions) constructor

```csharp
public FileStream (string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share, int bufferSize, System.IO.FileOptions options);
```

Initializes a new instance of the `FileStream` class with the specified path, creation mode, read/write and sharing permission, the access other FileStreams can have to the same file, the buffer size, and additional file options.

Parameters:

- `path`: A relative or absolute path for the file that the current `FileStream` object will encapsulate.
- `mode`: One of the enumeration values that determines how to open or create the file.
- `access`: A bitwise combination of the enumeration values that determines how the file can be accessed by the `FileStream` object. This also determines the values returned by the `FileStream.CanRead` and `FileStream.CanWrite` properties of the `FileStream` object. `FileStream.CanSeek` is `true` if `path` specifies a disk file.
- `share`: A bitwise combination of the enumeration values that determines how the file will be shared by processes.
- `bufferSize`: A non-negative `Int32` value indicating the buffer size. The default buffer size is 4096. A value of 0 or 1 disables buffering.
- `options`: A bitwise combination of the enumeration values that specifies additional file options.

Exceptions:

- `ArgumentNullException`: `path` is `null`.
- `ArgumentException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in an NTFS environment.
- `NotSupportedException`: `path` refers to a non-file device, such as "con:", "com1:", or "lpt1:", in a non-NTFS environment.
- `ArgumentOutOfRangeException`: `bufferSize` is negative.

-or-

`mode`, `access`, or `share` contain an invalid value.
- `FileNotFoundException`: The file cannot be found, such as when `mode` is `FileMode.Truncate` or `FileMode.Open`, and the file specified by `path` does not exist. The file must already exist in these modes.
- `IOException`: An I/O error, such as specifying `FileMode.CreateNew` when the file specified by `path` already exists, occurred.

-or-

The stream has been closed.
- `SecurityException`: The caller does not have the required permission.
- `DirectoryNotFoundException`: The specified path is invalid, such as being on an unmapped drive.
- `UnauthorizedAccessException`: The `access` requested is not permitted by the operating system for the specified `path`, such as when `access` is `Write` or `ReadWrite` and the file or directory is set for read-only access.

-or-

`FileOptions.Encrypted` is specified for `options`, but file encryption is not supported on the current platform.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks

.NET doesn't support direct access to physical disks through paths that are device names, such as "\\\\.\PHYSICALDRIVE0 ".

The `fileOptions` parameter is used to provide access to more advanced operations that can be leveraged when creating a `FileStream` object.

The `path` parameter can be a file name, including a file on a Universal Naming Convention (UNC) share.

> **Note:**
> `path` is not required to be a file stored on disk; it can be any part of a system that supports access through streams. For example, depending on the system, this class can access a physical device.

`Stream.CanSeek` is `true` for all `FileStream` objects that encapsulate files. If `path` indicates a device that does not support seeking, the `CanSeek` property on the resulting `FileStream` is `false`. For additional information, see `Stream.CanSeek`.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following example writes data to a file and then reads the data using the `FileStream` object.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/example.cs._

## FileStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value that indicates whether the current stream supports reading.

Returns: `true` if the stream supports reading; `false` if the stream is closed or was opened with write-only access.

#### Remarks
If a class derived from `Stream` does not support reading, calls to the `FileStream.Read`, `FileStream.ReadByte`, and `FileStream.BeginRead` methods throw a `NotSupportedException`.

If the stream is closed, this property returns `false`.

#### Examples
The following example demonstrates a use of the `CanRead` property. The output of this code is "MyFile.txt is not writable." To get the output message "MyFile.txt can be both written to and read from.", change the `FileAccess` parameter to `ReadWrite` in the `FileStream` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/CanRead/source.cs._
