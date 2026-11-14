---
title: "NetworkStream class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/NetworkStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkStream class (part 2 of 4)

## NetworkStream.WriteTimeout property

```csharp
public override int WriteTimeout { get; set; }
```

Gets or sets the amount of time that a write operation blocks waiting for data.

Returns: A `Int32` that specifies the amount of time, in milliseconds, that will elapse before a write operation fails. The default value, `Timeout.Infinite`, specifies that the write operation does not time out.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than or equal to zero and is not `Timeout.Infinite`.

#### Remarks
If the write operation does not complete within the time specified by this property, the write operation throws a `IOException`.

> **Note:**
>  This property affects only synchronous write operations performed by calling the `NetworkStream.Write` method. This property does not affect asynchronous writes performed by calling the `NetworkStream.BeginWrite` or `NetworkStream.WriteAsync` method.

#### Examples
The following code example sets the write time-out for a network stream to 10 milliseconds.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/WriteTimeout/tcplistener.cs._
## NetworkStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous read from the `NetworkStream`.

Parameters:

- `buffer`: An array of type `Byte` that is the location in memory to store data read from the `NetworkStream`.
- `offset`: The location in `buffer` to begin storing the data.
- `count`: The number of bytes to read from the `NetworkStream`.
- `callback`: The `AsyncCallback` delegate that is executed when `NetworkStream.BeginRead` completes.
- `state`: An object that contains any additional user-defined data.

Returns: An `IAsyncResult` that represents the asynchronous call.

Exceptions:

- `ArgumentNullException`: The `buffer` parameter is `null`.
- `ArgumentOutOfRangeException`: The `offset` parameter is less than 0.

-or-

The `offset` parameter is greater than the length of the `buffer` paramater.

-or-

The `size` is less than 0.

-or-

The `size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `IOException`: The underlying `Socket` is closed.

-or-

There was a failure while reading from the network.

-or-

An error occurred when accessing the socket.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (Begin / End) methods for new development. Instead, use the Task-based equivalents.

You can pass a callback that implements `AsyncCallback` to `NetworkStream.BeginRead` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `NetworkStream.BeginRead`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `NetworkStream.BeginRead` method.

The `NetworkStream.BeginRead` operation must be completed by calling the `NetworkStream.EndRead` method. Typically, the method is invoked by the provided `AsyncCallback` delegate. `NetworkStream.EndRead` will block the calling thread until the operation is completed.

The operation reads as much data as is available, up to the number of bytes specified by the `count` parameter.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code.

Read and write operations can be performed simultaneously on an instance of the `NetworkStream` class without the need for synchronization. As long as there is one unique thread for the write operations and one unique thread for the read operations, there will be no cross-interference between read and write threads and no synchronization is required.

## NetworkStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous write to a stream.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to write to the `NetworkStream`.
- `offset`: The location in `buffer` to begin sending the data.
- `count`: The number of bytes to write to the `NetworkStream`.
- `callback`: The `AsyncCallback` delegate that is executed when `NetworkStream.BeginWrite` completes.
- `state`: An object that contains any additional user-defined data.

Returns: An `IAsyncResult` that represents the asynchronous call.

Exceptions:

- `ArgumentNullException`: The `buffer` parameter is `null`.
- `ArgumentOutOfRangeException`: The `offset` parameter is less than 0.

-or-

The `offset` parameter is greater than the length of `buffer`.

-or-

The `size` parameter is less than 0.

-or-

The `size` parameter is greater than the length of `buffer` minus the value of the `offset` parameter.
- `IOException`: The underlying `Socket` is closed.

-or-

There was a failure while writing to the network.

-or-

An error occurred when accessing the socket.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (Begin / End) methods for new development. Instead, use the Task-based equivalents.

You can pass a callback that implements `AsyncCallback` to `NetworkStream.BeginWrite` in order to get notified about the completion of the operation. Note that if the underlying network stack completes the operation synchronously, the callback will be executed inline, during the call to `NetworkStream.BeginWrite`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `NetworkStream.BeginWrite` method.

The `NetworkStream.BeginWrite` operation must be completed by calling the `NetworkStream.EndWrite` method. Typically, the method is invoked by the provided `AsyncCallback` delegate. `NetworkStream.EndWrite` will block the calling thread until the operation is completed.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code.

Read and write operations can be performed simultaneously on an instance of the `NetworkStream` class without the need for synchronization. As long as there is one unique thread for the write operations and one unique thread for the read operations, there will be no cross-interference between read and write threads and no synchronization is required.

## NetworkStream.Close(Int32) method

```csharp
public void Close (int timeout);
```

Closes the `NetworkStream` after waiting the specified time to allow data to be sent.

Parameters:

- `timeout`: A 32-bit signed integer that specifies the number of milliseconds to wait to send any remaining data before closing.

Exceptions:

- `ArgumentOutOfRangeException`: The `timeout` parameter is less than -1.

#### Remarks
The `NetworkStream.Close` method frees both unmanaged and managed resources associated with the `NetworkStream`. If the `NetworkStream` owns the underlying `Socket`, it is closed as well.

If a `NetworkStream` was associated with a `TcpClient`, the `NetworkStream.Close` method will close the TCP connection, but not dispose of the associated `TcpClient`.

## NetworkStream.Close(TimeSpan) method

```csharp
public void Close (TimeSpan timeout);
```

Closes the `NetworkStream` after waiting the specified amount of time to allow data to be sent.

Parameters:

- `timeout`: The amount of time to wait to send any remaining data before closing.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is less than -1 milliseconds or greater than `Int32.MaxValue` milliseconds.

#### Remarks

The Close method frees both unmanaged and managed resources associated with the `NetworkStream`.
If the `NetworkStream` owns the underlying `Socket`, it is closed as well.
If a `NetworkStream` was associated with a `TcpClient`, the `Close` method
will close the TCP connection, but not dispose of the associated `TcpClient`.

## NetworkStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `NetworkStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `NetworkStream` references. This method invokes the `Dispose` method of each referenced object.

## NetworkStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Handles the end of an asynchronous read.

Parameters:

- `asyncResult`: An `IAsyncResult` that represents an asynchronous call.

Returns: The number of bytes read from the `NetworkStream`, between zero (0) and the number of bytes requested. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, read operations might complete immediately or might not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ArgumentException`: The `asyncResult` parameter is `null`.
- `IOException`: The underlying `Socket` is closed.

-or-

An error occurred when accessing the socket.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (Begin / End) methods for new development. Instead, use the Task-based equivalents.

The `NetworkStream.EndRead` method completes the read operation started by the `NetworkStream.BeginRead` method. You need to pass the `IAsyncResult` created by the matching `NetworkStream.BeginRead` call. `NetworkStream.EndRead` will block the calling thread until the operation is completed.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code.

## NetworkStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Handles the end of an asynchronous write.

Parameters:

- `asyncResult`: The `IAsyncResult` that represents the asynchronous call.

Exceptions:

- `ArgumentNullException`: The `asyncResult` parameter is `null`.
- `IOException`: The underlying `Socket` is closed.

-or-

An error occurred while writing to the network.

-or-

An error occurred when accessing the socket.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (Begin / End) methods for new development. Instead, use the Task-based equivalents.

The `NetworkStream.EndWrite` method completes the read operation started by the `NetworkStream.BeginWrite` method. You need to pass the `IAsyncResult` created by the matching `NetworkStream.BeginWrite` call. `NetworkStream.EndWrite` will block the calling thread until the operation is completed.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code.

## NetworkStream.Finalize() method

```csharp
~NetworkStream ();
```

Releases all resources used by the `NetworkStream`.

#### Remarks
This method overrides `Object.Finalize`. Application code should not call this method; an object's `Object.Finalize` method is automatically invoked during garbage collection, unless finalization by the garbage collector has been disabled by a call to the `GC.SuppressFinalize` method.

For more information about using the Finalize method, see Cleaning Up Unmanaged Resources.

## NetworkStream.Flush() method

```csharp
public override void Flush ();
```

Flushes data from the stream. This method is reserved for future use.

#### Remarks
The `NetworkStream.Flush` method implements the `Stream.Flush` method; however, because `NetworkStream` is not buffered, it has no effect on network streams. Calling the `NetworkStream.Flush` method does not throw an exception.

## NetworkStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Flushes data from the stream as an asynchronous operation.

Parameters:

- `cancellationToken`: A cancellation token used to propagate notification that this  operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after data has been flushed from the stream for the `NetworkStream` instance.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.
