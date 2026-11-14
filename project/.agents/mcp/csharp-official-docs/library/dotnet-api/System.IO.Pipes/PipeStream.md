---
title: "PipeStream class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeStream class

Namespace: `System.IO.Pipes`

```csharp
public abstract class PipeStream : System.IO.Stream
```

Exposes a `Stream` object around a pipe, which supports both anonymous and named pipes.

#### Remarks
The `PipeStream` class provides the base class for named and anonymous pipes operations in .NET. Use the `NamedPipeServerStream` and `NamedPipeClientStream` classes for named pipe operations. Use the `AnonymousPipeServerStream` and `AnonymousPipeClientStream` classes for anonymous pipe operations.

For more information about pipes, see Pipes. For an example of anonymous pipes, see How to: Use Anonymous Pipes for Local Interprocess Communication. For an example of named pipes, see How to: Use Named Pipes for Network Interprocess Communication.

## PipeStream.PipeStream(PipeDirection, Int32) constructor

```csharp
protected PipeStream (System.IO.Pipes.PipeDirection direction, int bufferSize);
```

Initializes a new instance of the `PipeStream` class using the specified `PipeDirection` value and buffer size.

Parameters:

- `direction`: One of the `PipeDirection` values that indicates the direction of the pipe object.
- `bufferSize`: A positive `Int32` value greater than or equal to 0 that indicates the buffer size.

Exceptions:

- `ArgumentOutOfRangeException`: `direction` is not a valid `PipeDirection` value.

-or-

`bufferSize` is less than 0.

#### Remarks
This constructor uses a pipe transmission mode of `Byte`.

## PipeStream.PipeStream(PipeDirection, PipeTransmissionMode, Int32) constructor

```csharp
protected PipeStream (System.IO.Pipes.PipeDirection direction, System.IO.Pipes.PipeTransmissionMode transmissionMode, int outBufferSize);
```

Initializes a new instance of the `PipeStream` class using the specified `PipeDirection`, `PipeTransmissionMode`, and buffer size.

Parameters:

- `direction`: One of the `PipeDirection` values that indicates the direction of the pipe object.
- `transmissionMode`: One of the `PipeTransmissionMode` values that indicates the transmission mode of the pipe object.
- `outBufferSize`: A positive `Int32` value greater than or equal to 0 that indicates the buffer size.

Exceptions:

- `ArgumentOutOfRangeException`: `direction` is not a valid `PipeDirection` value.

-or-

`transmissionMode` is not a valid `PipeTransmissionMode` value.

-or-

`outBufferSize` is less than 0.

To be added.

## PipeStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether the current stream supports read operations.

Returns: `true` if the stream supports read operations; otherwise, `false`.

#### Remarks
If the `PipeStream` object is closed, this property returns `false`.

## PipeStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether the current stream supports seek operations.

Returns: `false` in all cases.

#### Remarks
If the `PipeStream` object is closed, this property returns `false`.

## PipeStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether the current stream supports write operations.

Returns: `true` if the stream supports write operations; otherwise, `false`.

#### Remarks
If the `PipeStream` object is closed, this property returns `false`.

## PipeStream.InBufferSize property

```csharp
public virtual int InBufferSize { get; }
```

Gets the size, in bytes, of the inbound buffer for a pipe.

Returns: An integer value that represents the inbound buffer size, in bytes.

Exceptions:

- `NotSupportedException`: The stream is unreadable.
- `InvalidOperationException`: The pipe is waiting to connect.
- `IOException`: The pipe is broken or another I/O error occurred.
- `PlatformNotSupportedException`: The pipe is an anonymous pipe, and the current operating system does not support retrieving its buffer size.

#### Remarks
If `PipeStream.InBufferSize` is 0, the buffer size is allocated as needed.

## PipeStream.IsAsync property

```csharp
public bool IsAsync { get; }
```

Gets a value indicating whether a `PipeStream` object was opened asynchronously or synchronously.

Returns: `true` if the `PipeStream` object was opened asynchronously; otherwise, `false`.

#### Remarks
This property enables your code to use the `SafePipeHandle` property correctly.

## PipeStream.IsConnected property

```csharp
public bool IsConnected { get; protected set; }
```

Gets or sets a value indicating whether a `PipeStream` object is connected.

Returns: `true` if the `PipeStream` object is connected; otherwise, `false`.

#### Remarks
The `IsConnected` property returns `true` only if the `PipeStream` object is connected. If this property returns `false`, the pipe may be waiting to connect, or may be disconnected, closed, or broken.

## PipeStream.IsHandleExposed property

```csharp
protected bool IsHandleExposed { get; }
```

Gets a value indicating whether a handle to a `PipeStream` object is exposed.

Returns: `true` if a handle to the `PipeStream` object is exposed; otherwise, `false`.

#### Remarks
The value of this property is set when obtaining a handle to the pipe that is encapsulated by the current `PipeStream` object.

## PipeStream.IsMessageComplete property

```csharp
public bool IsMessageComplete { get; }
```

Gets a value indicating whether there is more data in the message returned from the most recent read operation.

Returns: `true` if there are no more characters to read in the message; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The pipe is not connected.

-or-

The pipe handle has not been set.

-or-

The pipe's `PipeStream.ReadMode` property value is not `PipeTransmissionMode.Message`.
- `ObjectDisposedException`: The pipe is closed.

#### Remarks
This property is relevant if the pipe's `ReadMode` property was set to `Message` by the most recent call to `PipeStream.Read` or `PipeStream.EndRead`.

## PipeStream.Length property

```csharp
public override long Length { get; }
```

Gets the length of a stream, in bytes.

Returns: 0 in all cases.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
The `PipeStream` class does not support the `Length` property.

## PipeStream.OutBufferSize property

```csharp
public virtual int OutBufferSize { get; }
```

Gets the size, in bytes, of the outbound buffer for a pipe.

Returns: The outbound buffer size, in bytes.

Exceptions:

- `NotSupportedException`: The stream is unwriteable.
- `InvalidOperationException`: The pipe is waiting to connect.
- `IOException`: The pipe is broken or another I/O error occurred.
- `PlatformNotSupportedException`: The pipe is an anonymous pipe, and the current operating system does not support retrieving its buffer size.

#### Remarks
If `PipeStream.OutBufferSize` is 0, the buffer size is allocated as needed.

## PipeStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the current position of the current stream.

Returns: 0 in all cases.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
The `PipeStream` class does not support the `Position` property.

## PipeStream.ReadMode property

```csharp
public virtual System.IO.Pipes.PipeTransmissionMode ReadMode { get; set; }
```

Gets or sets the reading mode for a `PipeStream` object.

Returns: One of the `PipeTransmissionMode` values that indicates how the `PipeStream` object reads from the pipe.

Exceptions:

- `ArgumentOutOfRangeException`: The supplied value is not a valid `PipeTransmissionMode` value.
- `NotSupportedException`: The supplied value is not a supported `PipeTransmissionMode` value for this pipe stream.
- `InvalidOperationException`: The handle has not been set.

-or-

The pipe is waiting to connect with a named client.
- `IOException`: The pipe is broken or an I/O error occurred with a named client.
- `PlatformNotSupportedException`: On Linux and macOS, when setting the property to `PipeTransmissionMode.Message`.

#### Remarks
Anonymous pipes do not support `Message` mode message transmission.

To avoid an `InvalidOperationException` accessing `ReadMode`, `IsConnected` can be used to verify the pipe is connected.

## PipeStream.SafePipeHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafePipeHandle SafePipeHandle { get; }
```

Gets the safe handle for the local end of the pipe that the current `PipeStream` object encapsulates.

Returns: A `SafePipeHandle` object for the pipe that is encapsulated by the current `PipeStream` object.

Exceptions:

- `InvalidOperationException`: The pipe handle has not been set.
- `ObjectDisposedException`: The pipe is closed.

To be added.

## PipeStream.TransmissionMode property

```csharp
public virtual System.IO.Pipes.PipeTransmissionMode TransmissionMode { get; }
```

Gets the pipe transmission mode supported by the current pipe.

Returns: One of the `PipeTransmissionMode` values that indicates the transmission mode supported by the current pipe.

Exceptions:

- `ObjectDisposedException`: The pipe is closed.
- `InvalidOperationException`: The handle has not been set.

-or-

The pipe is waiting to connect in an anonymous client/server operation or with a named client.
- `IOException`: The pipe is broken or another I/O error occurred.

#### Remarks
Anonymous pipes do not support `Message` mode message transmission.

## PipeStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous read operation.

Parameters:

- `buffer`: The buffer to read data into.
- `offset`: The byte offset in `buffer` at which to begin reading.
- `count`: The maximum number of bytes to read.
- `callback`: The method to call when the asynchronous read operation is completed.
- `state`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An `IAsyncResult` object that references the asynchronous read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `count` is greater than the number of bytes available in `buffer`.
- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support read operations.
- `InvalidOperationException`: The pipe is disconnected, waiting to connect, or the handle has not been set.
- `IOException`: The pipe is broken or another I/O error occurred.

#### Remarks
Pass the returned `IAsyncResult` object to the `PipeStream.EndRead` method to determine how many bytes were read and to release operating system resources used for reading. `PipeStream.EndRead` must be called once for every call to `PipeStream.BeginRead`. This can be done either in the same code that called `PipeStream.BeginRead` or in a callback that is passed to `PipeStream.BeginRead`.

Use the `CanRead` property to determine whether the current `PipeStream` object supports read operations.

If the pipe is closed or an invalid argument is passed to `PipeStream.BeginRead`, the appropriate exceptions are raised immediately. Errors that occur during an asynchronous read request occur on the thread pool thread that is performing the request. The exceptions are raised when the code calls the `PipeStream.EndRead` method.

## PipeStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous write operation.

Parameters:

- `buffer`: The buffer that contains the data to write to the current stream.
- `offset`: The zero-based byte offset in `buffer` at which to begin copying bytes to the current stream.
- `count`: The maximum number of bytes to write.
- `callback`: The method to call when the asynchronous write operation is completed.
- `state`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An `IAsyncResult` object that references the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `count` is greater than the number of bytes available in `buffer`.
- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support write operations.
- `InvalidOperationException`: The pipe is disconnected, waiting to connect, or the handle has not been set.
- `IOException`: The pipe is broken or another I/O error occurred.

#### Remarks
`PipeStream.EndWrite` must be called once for every call to `PipeStream.BeginWrite`. This can be done either in the same code that called `PipeStream.BeginWrite` or in a callback that is passed to `PipeStream.BeginWrite`.

Use the `CanWrite` property to determine whether the current `PipeStream` object supports write operations.

If the pipe is closed or an invalid argument is passed to `PipeStream.BeginWrite`, the appropriate exceptions are raised immediately. Errors that occur during an asynchronous write request occur on the thread pool thread that is performing the request. The exceptions are raised when the code calls the  `PipeStream.EndWrite` method.

## PipeStream.CheckPipePropertyOperations() method

```csharp
protected internal virtual void CheckPipePropertyOperations ();
```

Verifies that the pipe is in a proper state for getting or setting properties.

To be added.

## PipeStream.CheckReadOperations() method

```csharp
protected internal void CheckReadOperations ();
```

Verifies that the pipe is in a connected state for read operations.

To be added.

## PipeStream.CheckWriteOperations() method

```csharp
protected internal void CheckWriteOperations ();
```

Verifies that the pipe is in a connected state for write operations.

To be added.

## PipeStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `PipeStream` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `PipeStream.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `PipeStream.Dispose` with `disposing` set to `false`.

When the disposing parameter is `true`, this method releases all resources held by any managed objects that this `PipeStream` object references. This method invokes the `PipeStream.Dispose` method of each referenced object.
