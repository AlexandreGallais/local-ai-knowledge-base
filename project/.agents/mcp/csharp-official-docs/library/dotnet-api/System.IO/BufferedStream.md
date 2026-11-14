---
title: "BufferedStream class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BufferedStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BufferedStream class

Namespace: `System.IO`

```csharp
public sealed class BufferedStream : System.IO.Stream
```

Adds a buffering layer to read and write operations on another stream. This class cannot be inherited.

#### Remarks
A buffer is a block of bytes in memory used to cache data, thereby reducing the number of calls to the operating system. Buffers improve read and write performance. A buffer can be used for either reading or writing, but never both simultaneously. The `BufferedStream.Read` and `BufferedStream.Write` methods of `BufferedStream` automatically maintain the buffer.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

`BufferedStream` can be composed around certain types of streams. It provides implementations for reading and writing bytes to an underlying data source or repository. Use `BinaryReader` and `BinaryWriter` for reading and writing other data types. `BufferedStream` is designed to prevent the buffer from slowing down input and output when the buffer is not needed. If you always read and write for sizes greater than the internal buffer size, then `BufferedStream` might not even allocate the internal buffer. `BufferedStream` also buffers reads and writes in a shared buffer. It is assumed that you will almost always be doing a series of reads or writes, but rarely alternate between the two of them.

#### Examples
The following code examples show how to use the `BufferedStream` class over the `NetworkStream` class to increase the performance of certain I/O operations. Start the server on a remote computer before starting the client. Specify the remote computer name as a command-line argument when starting the client. Vary the `dataArraySize` and `streamBufferSize` constants to view their effect on performance.

The first example shows the code that runs on the client, and the second example shows the code that runs on the server.

**Example 1: Code that runs on the client**

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

**Example 2: Code that runs on the server**

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/server.cs._

## BufferedStream.BufferedStream(Stream) constructor

```csharp
public BufferedStream (System.IO.Stream stream);
```

Initializes a new instance of the `BufferedStream` class with a default buffer size of 4096 bytes.

Parameters:

- `stream`: The current stream.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
A shared read/write buffer is allocated the first time a `BufferedStream` object is initialized with this constructor. The shared buffer is not used if all reads and writes are greater than or equal to `bufferSize`.

## BufferedStream.BufferedStream(Stream, Int32) constructor

```csharp
public BufferedStream (System.IO.Stream stream, int bufferSize);
```

Initializes a new instance of the `BufferedStream` class with the specified buffer size.

Parameters:

- `stream`: The current stream.
- `bufferSize`: The buffer size in bytes.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is negative.

#### Remarks
A shared read/write buffer is allocated the first time a `BufferedStream` object is initialized with this constructor. The shared buffer is not used if all reads and writes are greater than or equal to `bufferSize`.

#### Examples
This code example is part of a larger example provided for the `BufferedStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

## BufferedStream.BufferSize property

```csharp
public int BufferSize { get; }
```

Gets the buffer size in bytes for this buffered stream.

Returns: An integer representing the buffer size in bytes.

To be added.

## BufferedStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether the current stream supports reading.

Returns: `true` if the stream supports reading; `false` if the stream is closed or was opened with write-only access.

#### Remarks
If a class derived from `Stream` does not support reading, calls to the `BufferedStream.Read`, `BufferedStream.ReadByte`, `Stream.BeginRead`, `Stream.EndRead`, and the `Peek` methods of `StreamReader`, `StringReader`, and `TextReader` throw a `NotSupportedException`.

If the stream is closed, this property returns `false`.

#### Examples
This code example is part of a larger example provided for the `BufferedStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

## BufferedStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether the current stream supports seeking.

Returns: `true` if the stream supports seeking; `false` if the stream is closed or if the stream was constructed from an operating system handle such as a pipe or output to the console.

#### Remarks
If a class derived from `Stream` does not support seeking, calls to `BufferedStream.Length`, `BufferedStream.SetLength`, `BufferedStream.Position`, and `BufferedStream.Seek` throw a `NotSupportedException`.

If the stream is closed, this property returns `false`.

#### Examples
This code example is part of a larger example provided for the `BufferedStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

## BufferedStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether the current stream supports writing.

Returns: `true` if the stream supports writing; `false` if the stream is closed or was opened with read-only access.

#### Remarks
If a class derived from `Stream` does not support writing, a call to `BufferedStream.SetLength`, `BufferedStream.Write`, or `BufferedStream.WriteByte` throws a `NotSupportedException`.

If the stream is closed, this property returns `false`.

#### Examples
This code example is part of a larger example provided for the `BufferedStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

## BufferedStream.Length property

```csharp
public override long Length { get; }
```

Gets the stream length in bytes.

Returns: The stream length in bytes.

Exceptions:

- `IOException`: The underlying stream is `null` or closed.
- `NotSupportedException`: The stream does not support seeking.
- `ObjectDisposedException`: Methods were called after the stream was closed.

To be added.

## BufferedStream.Position property

```csharp
public override long Position { get; set; }
```

Gets the position within the current stream.

Returns: The position within the current stream.

Exceptions:

- `ArgumentOutOfRangeException`: The value passed to `BufferedStream.Seek` is negative.
- `IOException`: An I/O error occurs, such as the stream being closed.
- `NotSupportedException`: The stream does not support seeking.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
The `get` accessor invokes `BufferedStream.Seek` to obtain the current position within the underlying stream and then adjusts this value according to the current position within the buffer.

The `set` accessor copies any data previously written to the buffer to the underlying stream, and then invokes `BufferedStream.Seek`.

Seeking to any location beyond the length of the stream is supported.

## BufferedStream.UnderlyingStream property

```csharp
public System.IO.Stream UnderlyingStream { get; }
```

Gets the underlying `Stream` instance for this buffered stream.

Returns: The underlying stream instance.

To be added.

## BufferedStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous read operation. (Consider using `BufferedStream.ReadAsync` instead.)

Parameters:

- `buffer`: The buffer to read the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data read from the stream.
- `count`: The maximum number of bytes to read.
- `callback`: An optional asynchronous callback, to be called when the read is complete.
- `state`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An object that represents the asynchronous read, which could still be pending.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `IOException`: Attempted an asynchronous read past the end of the stream.
- `ArgumentException`: The buffer length minus `offset` is less than `count`.
- `NotSupportedException`: The current stream does not support the read operation.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `BufferedStream.ReadAsync`, `BufferedStream.WriteAsync`, and `BufferedStream.FlushAsync`, help you implement asynchronous file operations more easily.

`BufferedStream.EndRead` must be called exactly once for every call to `BufferedStream.BeginRead`. Failing to end a read process before beginning another read can cause undesirable behavior such as deadlock.

> **Note:**
> Use the `CanRead` property to determine whether the current instance supports reading.

`BufferedStream.EndRead` must be called with this `IAsyncResult` to find out how many bytes were read.

## BufferedStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous write operation. (Consider using `BufferedStream.WriteAsync` instead.)

Parameters:

- `buffer`: The buffer containing data to write to the current stream.
- `offset`: The zero-based byte offset in `buffer` at which to begin copying bytes to the current stream.
- `count`: The maximum number of bytes to write.
- `callback`: The method to be called when the asynchronous write operation is completed.
- `state`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An object that references the asynchronous write, which could still be pending.

Exceptions:

- `ArgumentException`: `buffer` length minus `offset` is less than `count`.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `NotSupportedException`: The stream does not support writing.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `BufferedStream.ReadAsync`, `BufferedStream.WriteAsync`, and `BufferedStream.FlushAsync`, help you implement asynchronous file operations more easily.

`BufferedStream.EndWrite` must be called exactly once on every `IAsyncResult` from `BufferedStream.BeginWrite`. `BufferedStream.EndWrite` blocks until the I/O operation has completed.

## BufferedStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the current buffered stream and writes them to another stream.

Parameters:

- `destination`: The stream to which the contents of the current buffered stream will be copied.
- `bufferSize`: The size of the buffer. This value must be greater than zero. The default size is 81920.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.
- `NotSupportedException`: The current stream does not support reading.

-or-

`destination` does not support writing.
- `ObjectDisposedException`: Either the current stream or `destination` was closed before the `Stream.CopyTo` method was called.
- `IOException`: An I/O error occurred.

To be added.

## BufferedStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the current buffered stream and writes them to another stream, using a specified buffer size and cancellation token.

Parameters:

- `destination`: The stream to which the contents of the current buffered stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero. The default sizer is 81920.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

Copying begins at the current position in the current stream.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.
