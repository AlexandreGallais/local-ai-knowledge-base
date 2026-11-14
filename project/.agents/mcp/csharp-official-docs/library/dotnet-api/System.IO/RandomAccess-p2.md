---
title: "RandomAccess class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/RandomAccess.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RandomAccess class (part 2 of 2)

## RandomAccess.WriteAsync(SafeFileHandle, Byte>, Int64, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask WriteAsync (Microsoft.Win32.SafeHandles.SafeFileHandle handle, ReadOnlyMemory<byte> buffer, long fileOffset, System.Threading.CancellationToken <example-value> = default);
```

Writes a sequence of bytes from given buffer to given file at given offset.

Parameters:

- `handle`: The file handle.
- `buffer`: A region of memory. This method copies the contents of this region to the file.
- `fileOffset`: The file position to write to. In .NET 11 and later versions, this parameter is ignored for files that don't support seeking, such as pipes, sockets, and character devices. The value must be non-negative even when it's ignored.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task representing the asynchronous completion of the write operation.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `ObjectDisposedException`: The file is closed.
- `NotSupportedException`: In .NET 10 and earlier versions, the file doesn't support seeking (for example, a pipe or socket).
- `ArgumentOutOfRangeException`: `fileOffset` is negative.
- `UnauthorizedAccessException`: `handle` was not opened for writing.
- `IOException`: An I/O error occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

For files that support seeking, the file position is not advanced.
