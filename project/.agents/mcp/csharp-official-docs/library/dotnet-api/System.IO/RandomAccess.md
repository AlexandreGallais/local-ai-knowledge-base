---
title: "RandomAccess class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/RandomAccess.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RandomAccess class

Namespace: `System.IO`

```csharp
public static class RandomAccess
```

Provides offset-based APIs for reading and writing files in a thread-safe manner.

In .NET 10 and earlier versions, the read and write methods support only files that support seeking.

Starting with .NET 11, the read and write methods also support non-seekable handles, such as pipes, sockets, and character devices. For these handles, the `fileOffset` parameter is ignored, but its value must still be non-negative.

For files that support seeking, read and write operations use the specified offset without advancing the file position. `RandomAccess.GetLength` and `RandomAccess.SetLength` require a handle that supports seeking in all versions.

## RandomAccess.FlushToDisk(SafeFileHandle) method

```csharp
public static void FlushToDisk (Microsoft.Win32.SafeHandles.SafeFileHandle handle);
```

Flushes the operating system buffers for the given file to disk.

Parameters:

- `handle`: The file handle.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `IOException`: An I/O error occurred.

This method calls platform-dependent APIs such as `FlushFileBuffers()` on Windows and `fsync()` on Unix.

Flushing the buffers causes data to be written to disk, which is a relatively expensive operation. It is recommended that you perform multiple writes to the file and then call this method either when you are done writing to the file or periodically if you expect to continue writing to the file over a long period of time.

## RandomAccess.GetLength(SafeFileHandle) method

```csharp
public static long GetLength (Microsoft.Win32.SafeHandles.SafeFileHandle handle);
```

Gets the length of the file in bytes.

Parameters:

- `handle`: The file handle.

Returns: A long value representing the length of the file in bytes.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: The file does not support seeking (pipe or socket).

To be added.

## RandomAccess.Read(SafeFileHandle, Byte>>, Int64) method

```csharp
public static long Read (Microsoft.Win32.SafeHandles.SafeFileHandle handle, System.Collections.Generic.IReadOnlyList<Memory<byte>> buffers, long fileOffset);
```

Reads a sequence of bytes from given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffers`: A list of memory buffers. When this method returns, the contents of the buffers are replaced by the bytes read from the file.
- `fileOffset`: The file position to read from. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.

Returns: The total number of bytes read into the buffers. This can be less than the number of bytes allocated in the buffers if that many bytes are not currently available, or zero (0) if the end of the file has been reached.

Exceptions:

- `ArgumentNullException`: `handle` or `buffers` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for reading.
- `IOException`: An I/O error occurred.

#### Remarks

For files that support seeking, the file position is not advanced.

## RandomAccess.Read(SafeFileHandle, Byte>, Int64) method

```csharp
public static int Read (Microsoft.Win32.SafeHandles.SafeFileHandle handle, Span<byte> buffer, long fileOffset);
```

Reads a sequence of bytes from given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the file.
- `fileOffset`: The file position to read from. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the file has been reached.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for reading.
- `IOException`: An I/O error occurred.

#### Remarks

For files that support seeking, the file position is not advanced.

## RandomAccess.ReadAsync(SafeFileHandle, Byte>>, Int64, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<long> ReadAsync (Microsoft.Win32.SafeHandles.SafeFileHandle handle, System.Collections.Generic.IReadOnlyList<Memory<byte>> buffers, long fileOffset, System.Threading.CancellationToken <example-value> = default);
```

Reads a sequence of bytes from given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffers`: A list of memory buffers. When this method returns, the contents of these buffers are replaced by the bytes read from the file.
- `fileOffset`: The file position to read from. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The total number of bytes read into the buffers. This can be less than the number of bytes allocated in the buffers if that many bytes are not currently available, or zero (0) if the end of the file has been reached.

Exceptions:

- `ArgumentNullException`: `handle` or `buffers` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for reading.
- `IOException`: An I/O error occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For files that support seeking, the file position is not advanced.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## RandomAccess.ReadAsync(SafeFileHandle, Byte>, Int64, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> ReadAsync (Microsoft.Win32.SafeHandles.SafeFileHandle handle, Memory<byte> buffer, long fileOffset, System.Threading.CancellationToken <example-value> = default);
```

Reads a sequence of bytes from given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the file.
- `fileOffset`: The file position to read from. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the file has been reached.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for reading.
- `IOException`: An I/O error occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For files that support seeking, the file position is not advanced.

## RandomAccess.SetLength(SafeFileHandle, Int64) method

```csharp
public static void SetLength (Microsoft.Win32.SafeHandles.SafeFileHandle handle, long length);
```

Sets the length of the file to the given value.

Parameters:

- `handle`: The file handle.
- `length`: The length of the file in bytes.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: The file does not support seeking (pipe or socket).
- `ArgumentOutOfRangeException`: `length` is negative.

To be added.

## RandomAccess.Write(SafeFileHandle, Byte>>, Int64) method

```csharp
public static void Write (Microsoft.Win32.SafeHandles.SafeFileHandle handle, System.Collections.Generic.IReadOnlyList<ReadOnlyMemory<byte>> buffers, long fileOffset);
```

Writes a sequence of bytes from given buffers to given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffers`: A list of memory buffers. This method copies the contents of these buffers to the file.
- `fileOffset`: The file position to write to. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `handle` or `buffers` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for writing.
- `IOException`: An I/O error occurred.

#### Remarks

For files that support seeking, the file position is not advanced.

## RandomAccess.Write(SafeFileHandle, Byte>, Int64) method

```csharp
public static void Write (Microsoft.Win32.SafeHandles.SafeFileHandle handle, ReadOnlySpan<byte> buffer, long fileOffset);
```

Writes a sequence of bytes from given buffer to given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffer`: A region of memory. This method copies the contents of this region to the file.
- `fileOffset`: The file position to write to. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for writing.
- `IOException`: An I/O error occurred.

#### Remarks

For files that support seeking, the file position is not advanced.

## RandomAccess.WriteAsync(SafeFileHandle, Byte>>, Int64, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask WriteAsync (Microsoft.Win32.SafeHandles.SafeFileHandle handle, System.Collections.Generic.IReadOnlyList<ReadOnlyMemory<byte>> buffers, long fileOffset, System.Threading.CancellationToken <example-value> = default);
```

Writes a sequence of bytes from given buffers to given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffers`: A list of memory buffers. This method copies the contents of these buffers to the file.
- `fileOffset`: The file position to write to. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task representing the asynchronous completion of the write operation.

Exceptions:

- `ArgumentNullException`: `handle` or `buffers` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for writing.
- `IOException`: An I/O error occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For files that support seeking, the file position is not advanced.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.
