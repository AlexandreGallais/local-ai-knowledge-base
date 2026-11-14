---
title: "FileStream class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStream class (part 4 of 7)

## FileStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value that indicates whether the current stream supports seeking.

Returns: `true` if the stream supports seeking; `false` if the stream is closed or if the `FileStream` was constructed from an operating-system handle such as a pipe or output to the console.

#### Remarks
If a class derived from `Stream` does not support seeking, calls to `FileStream.Length`, `FileStream.SetLength`, `FileStream.Position`, and `FileStream.Seek` throw a `NotSupportedException`.

If the stream is closed, this property returns `false`.

#### Examples
The following example uses the `CanSeek` property to check whether a stream supports seeking.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/CanSeek/fstream canseek.cs._

## FileStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value that indicates whether the current stream supports writing.

Returns: `true` if the stream supports writing; `false` if the stream is closed or was opened with read-only access.

#### Remarks
If a class derived from `Stream` does not support writing, a call to `FileStream.SetLength`, `FileStream.Write`, `FileStream.BeginWrite`, or `FileStream.WriteByte` throws a `NotSupportedException`.

If the stream is closed, this property returns `false`.

#### Examples
The following example uses the `CanWrite` property to check whether a stream supports writing.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/CanWrite/fstream canwrite.cs._

The following is an example using the `CanWrite` property. The output of this code is "MyFile.txt is writable." To get the output message "MyFile.txt can be both written to and read from.", change the `FileAccess` parameter to `ReadWrite` in the `FileStream` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/CanWrite/source.cs._

## FileStream.Handle property

```csharp
public virtual IntPtr Handle { get; }
```

Gets the operating system file handle for the file that the current `FileStream` object encapsulates.

Returns: The operating system file handle for the file encapsulated by this `FileStream` object, or -1 if the `FileStream` has been closed.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

To be added.

## FileStream.IsAsync property

```csharp
public virtual bool IsAsync { get; }
```

Gets a value that indicates whether the underlying handle is configured for asynchronous I/O.

Returns: `true` if the handle was opened for overlapped I/O on Windows. On Unix, `true` if the stream was opened for asynchronous I/O in .NET 10 and earlier or the file descriptor has the `O_NONBLOCK` flag set in .NET 11 and later; otherwise, `false`.

#### Remarks
The `IsAsync` property indicates whether the `FileStream` handle is configured for asynchronous I/O, enabling your code to use the `Handle` property correctly. In Win32, `IsAsync` being true means the handle was opened for overlapped I/O, and thus requires different parameters to `ReadFile` and `WriteFile`. On Unix, starting in .NET 11, it reflects whether the file descriptor has the `O_NONBLOCK` flag set.

You specify this value when you create an instance of the `FileStream` class using a constructor that has an `isAsync`, `useAsync`, or `options` parameter. The property doesn't have to be `true` to call the `FileStream.ReadAsync`, `FileStream.WriteAsync`, or `Stream.CopyToAsync` method. When the property is `false` and you call an asynchronous read or write method, the UI thread isn't blocked, but the I/O is performed synchronously.

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source1.cs._

## FileStream.Length property

```csharp
public override long Length { get; }
```

Gets the length in bytes of the stream.

Returns: A long value representing the length of the stream in bytes.

Exceptions:

- `NotSupportedException`: `FileStream.CanSeek` for this stream is `false`.
- `IOException`: An I/O error, such as the file being closed, occurred.

#### Remarks
For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following example uses the `Length` and `Position` properties to check for an end-of-file condition.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Length/source.cs._

## FileStream.Name property

```csharp
public virtual string Name { get; }
```

Gets the absolute path of the file opened in the `FileStream`.

Returns: A string that is the absolute path of the file.

#### Remarks

If the absolute path is not known, this property returns a string similar to "[Unknown]".

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source1.cs._

## FileStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the current position of this stream.

Returns: The current position of this stream.

Exceptions:

- `NotSupportedException`: The stream does not support seeking.
- `IOException`: An I/O error occurred.
- `ArgumentOutOfRangeException`: Attempted to set the position to a negative value.
- `EndOfStreamException`: Attempted seeking past the end of a stream that does not support this.

#### Remarks
Seeking to any location beyond the length of the stream is supported.  When you seek beyond the length of the file, the file size grows. Any data added to the end of the file is set to zero.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following example uses the `Length` and `Position` properties to check for an end-of-file condition.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Length/source.cs._

## FileStream.SafeFileHandle property

```csharp
public virtual Microsoft.Win32.SafeHandles.SafeFileHandle SafeFileHandle { get; }
```

Gets a `SafeFileHandle` object that represents the operating system file handle for the file that the current `FileStream` object encapsulates.

Returns: An object that represents the operating system file handle for the file that the current `FileStream` object encapsulates.

#### Remarks
The `SafeFileHandle` property automatically flushes the stream and sets the current stream position to 0.  This allows the file to be moved or the stream position to be reset by another stream using the `FileStream.SafeFileHandle` returned by this property.

## FileStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous read operation. Consider using `FileStream.ReadAsync` instead.

Parameters:

- `buffer`: The buffer to read data into.
- `offset`: The byte offset in `array` at which to begin reading.
- `count`: The maximum number of bytes to read.
- `callback`: The method to be called when the asynchronous read operation is completed.
- `state`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An object that references the asynchronous read.

Exceptions:

- `ArgumentException`: The array length minus `offset` is less than `numBytes`.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `numBytes` is negative.
- `IOException`: An asynchronous read was attempted past the end of the file.

To be added.

## FileStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous write operation. Consider using `FileStream.WriteAsync` instead.

Parameters:

- `buffer`: The buffer containing data to write to the current stream.
- `offset`: The zero-based byte offset in `array` at which to begin copying bytes to the current stream.
- `count`: The maximum number of bytes to write.
- `callback`: The method to be called when the asynchronous write operation is completed.
- `state`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An object that references the asynchronous write.

Exceptions:

- `ArgumentException`: `array` length minus `offset` is less than `numBytes`.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `numBytes` is negative.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: The stream is closed.
- `IOException`: An I/O error occurred.

To be added.

## FileStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the current stream and writes them to another stream, using a specified buffer size. Both streams positions are advanced by the number of bytes copied.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size of the buffer. This value must be greater than zero.

Copying begins at the current position in the current stream, and does not reset the position of the destination stream after the copy operation is complete.

## FileStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the current file stream and writes them to another stream, using a specified buffer size and cancellation token.

Parameters:

- `destination`: The stream to which the contents of the current file stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

Copying begins at the current position in the current file stream.

For an example of copying between two streams, see the `CopyToAsync` overload.

## FileStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `FileStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `FileStream.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `FileStream.Dispose` with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `FileStream` references. This method invokes the `Dispose()` method of each referenced object.

## FileStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged resources used by the `FileStream`.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks

The `DisposeAsync` method lets you perform a resource-intensive dispose operation without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

This method disposes the stream by writing any changes to the backing store and closing the stream to release resources.

Calling `DisposeAsync` allows the resources used by the `FileStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## FileStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read operation to complete. (Consider using `FileStream.ReadAsync` instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to wait for.

Returns: The number of bytes read from the stream, between 0 and the number of bytes you requested. Streams only return 0 at the end of the stream, otherwise, they should block until at least 1 byte is available.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: This `IAsyncResult` object was not created by calling `FileStream.BeginRead` on this class.
- `InvalidOperationException`: `FileStream.EndRead` is called multiple times.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `FileStream.ReadAsync`, `FileStream.WriteAsync`, `Stream.CopyToAsync`, and `FileStream.FlushAsync`, help you implement asynchronous file operations more easily.

`FileStream.EndRead` must be called exactly for every call to `FileStream.BeginRead`. Failing to end a read process before beginning another read can cause undesirable behavior such as deadlock.

This method overrides `Stream.EndRead`.

`FileStream.EndRead` can be called on every `IAsyncResult` from `FileStream.BeginRead`. Calling `FileStream.EndRead` tells you how many bytes were read from the stream. `FileStream.EndRead` will block until the I/O operation has completed.

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source1.cs._
