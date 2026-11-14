---
title: "SocketAsyncEventArgs class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketAsyncEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketAsyncEventArgs class (part 2 of 2)

## SocketAsyncEventArgs.RemoteEndPoint property

```csharp
public System.Net.EndPoint? RemoteEndPoint { get; set; }
```

Gets or sets the remote IP endpoint for an asynchronous operation.

Returns: An `EndPoint` that represents the remote IP endpoint for an asynchronous operation.

#### Remarks
This property specifies the remote endpoint. This property can specify the remote endpoint to which to connect using the `Socket.ConnectAsync` method. This property can specify the remote endpoint to which to send data using `Socket.SendToAsync` method. This property can specify the remote endpoint from which data was received using the `Socket.ReceiveFromAsync` or `Socket.ReceiveMessageFromAsync` methods.

This remote endpoint specified by this property can include an IPv4 or IPv6 address.

This property is used with the `Socket.ConnectAsync`, `Socket.ReceiveFromAsync`, `Socket.ReceiveMessageFromAsync`, or `Socket.SendToAsync` methods.

## SocketAsyncEventArgs.SendPacketsElements property

```csharp
public System.Net.Sockets.SendPacketsElement[]? SendPacketsElements { get; set; }
```

Gets or sets an array of buffers to be sent for an asynchronous operation used by the `Socket.SendPacketsAsync` method.

Returns: An array of `SendPacketsElement` objects that represent an array of buffers to be sent.

#### Remarks
The array of buffers can represent a file or files in memory or a set of memory data buffers. This property is used with the `Socket.SendPacketsAsync` method.

## SocketAsyncEventArgs.SendPacketsFlags property

```csharp
public System.Net.Sockets.TransmitFileOptions SendPacketsFlags { get; set; }
```

Gets or sets a bitwise combination of `TransmitFileOptions` values for an asynchronous operation used by the `Socket.SendPacketsAsync` method.

Returns: A `TransmitFileOptions` that contains a bitwise combination of values that are used with an asynchronous operation.

#### Remarks
This property specifies the `TransmitFileOptions` that are used by the `Socket.SendPacketsAsync` method.

## SocketAsyncEventArgs.SendPacketsSendSize property

```csharp
public int SendPacketsSendSize { get; set; }
```

Gets or sets the size, in bytes, of the data block used in the send operation.

Returns: An `Int32` that contains the size, in bytes, of the data block used in the send operation.

#### Remarks
Set this property to zero to let the sockets layer select a default send size. Setting this property to 0xFFFFFFFF enables the caller to control the size and content of each send request, achieved by using the `EndOfPacket` property. This capability is useful for message protocols that place limitations on the size of individual send requests.

## SocketAsyncEventArgs.SocketError property

```csharp
public System.Net.Sockets.SocketError SocketError { get; set; }
```

Gets or sets the result of the asynchronous socket operation.

Returns: A `SocketError` that represents the result of the asynchronous socket operation.

#### Remarks
This property provides the completion status of an asynchronous socket operation. A value of `Success` indicates successful completion of an operation. This property is primarily used in an application's event handler routine.

This property is used with all of the asynchronous socket (xxxAsync) methods.

## SocketAsyncEventArgs.SocketFlags property

```csharp
public System.Net.Sockets.SocketFlags SocketFlags { get; set; }
```

Gets the results of an asynchronous socket operation or sets the behavior of an asynchronous operation.

Returns: A `SocketFlags` that represents the results of an asynchronous socket operation.

#### Remarks
The property specifies the bitwise combination of the `SocketFlags` to be used for an asynchronous socket operation.

This property is used with the `Socket.ReceiveAsync`, `Socket.ReceiveFromAsync`, `Socket.SendAsync`, and `Socket.SendToAsync` methods.

## SocketAsyncEventArgs.UserToken <example-value>

```csharp
public object? UserToken { get; set; }
```

Gets or sets a user or application object associated with this asynchronous socket operation.

Returns: An object that represents the user or application object associated with this asynchronous socket operation.

#### Remarks
This property can be used by an application to associate an application state object with the `SocketAsyncEventArgs` object. Primarily, this property is a way for an application to pass state to the application's event handler (for example, the asynchronous operation completion method).

This property is used with all of the asynchronous socket (xxxAsync) methods.

## SocketAsyncEventArgs.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources used by the `SocketAsyncEventArgs` instance and optionally disposes of the managed resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `SocketAsyncEventArgs` references. This method invokes the `Dispose()` method of each referenced object.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## SocketAsyncEventArgs.Finalize() method

```csharp
~SocketAsyncEventArgs ();
```

Frees resources used by the `SocketAsyncEventArgs` class.

#### Remarks
The `SocketAsyncEventArgs` class finalizer closes the `SocketAsyncEventArgs` and free resources associated with the `SocketAsyncEventArgs`.

## SocketAsyncEventArgs.OnCompleted(SocketAsyncEventArgs) method

```csharp
protected virtual void OnCompleted (System.Net.Sockets.SocketAsyncEventArgs e);
```

Represents a method that is called when an asynchronous operation completes.

Parameters:

- `e`: The event that is signaled.

#### Remarks
This method is not callable by user code. This method gets called by the internals of the `SocketAsyncEventArgs` object when the current operation is complete. This method is used with all asynchronous socket (xxxAsync) methods.

An application that creates a class inheriting from `SocketAsyncEventArgs` can override this method to hook into this completion notification and clean up any resources that it allocated for the operation. The default implementation just raises the `Completed` event.

This method is used to hook up an event handler to be used as the completion callback for a subsequent asynchronous socket operation. The caller must implement at least one callback delegate inherited from this method prior to starting an asynchronous socket operation using one of the asynchronous (xxxAsync) methods on the `Socket` class.

The caller's `SocketAsyncEventArgs.OnCompleted` method provides a way for client applications to complete an asynchronous socket operation. A callback delegate must be implemented when an asynchronous socket operation is initiated. The completion callback delegate(s) inherited from the `SocketAsyncEventArgs.OnCompleted` method must contain program logic to finish processing the asynchronous socket operation for the client.

When an asynchronous operation is signaled, the application uses the `SocketAsyncEventArgs` object parameter to obtain status of the completed asynchronous socket operation.

## SocketAsyncEventArgs.SetBuffer(Byte>) method

```csharp
public void SetBuffer (Memory<byte> buffer);
```

Sets the region of memory to use as a buffer with an asynchronous socket method.

Parameters:

- `buffer`: The region of memory to use as a buffer with an asynchronous socket method.

#### Remarks

This method sets the `MemoryBuffer` property to the `buffer` parameter, the `Count` property to the `buffer` length, and the `Offset` property to zero.

## SocketAsyncEventArgs.SetBuffer(Int32, Int32) method

```csharp
public void SetBuffer (int offset, int count);
```

Sets the data buffer to use with an asynchronous socket method.

Parameters:

- `offset`: The offset, in bytes, in the data buffer where the operation starts.
- `count`: The maximum amount of data, in bytes, to send or receive in the buffer.

Exceptions:

- `ArgumentOutOfRangeException`: An argument was out of range. This exception occurs if the `offset` parameter is less than zero or greater than the length of the array in the `SocketAsyncEventArgs.Buffer` property. This exception also occurs if the `count` parameter is less than zero or greater than the length of the array in the `SocketAsyncEventArgs.Buffer` property minus the `offset` parameter.

#### Remarks
The `offset` and `count` parameters can't be negative numbers. The combination of the `offset` and `count` parameters must be in bounds of the buffer array in the `Buffer` property.

This method sets the `Count` property to the `count` parameter and the `Offset` property to the `offset` parameter. If the `Buffer` property is null, this method ignores the `offset` and `count` parameters and sets the `SocketAsyncEventArgs.Offset` and `SocketAsyncEventArgs.Count` properties to 0.

This method does not change the `Buffer` property.

## SocketAsyncEventArgs.SetBuffer(Byte[], Int32, Int32) method

```csharp
public void SetBuffer (byte[]? buffer, int offset, int count);
```

Sets the data buffer to use with an asynchronous socket method.

Parameters:

- `buffer`: The data buffer to use with an asynchronous socket method.
- `offset`: The offset, in bytes, in the data buffer where the operation starts.
- `count`: The maximum amount of data, in bytes, to send or receive in the buffer.

Exceptions:

- `ArgumentException`: There are ambiguous buffers specified. This exception occurs if the `SocketAsyncEventArgs.Buffer` property is also not null and the `SocketAsyncEventArgs.BufferList` property is also not null.
- `ArgumentOutOfRangeException`: An argument was out of range. This exception occurs if the `offset` parameter is less than zero or greater than the length of the array in the `SocketAsyncEventArgs.Buffer` property. This exception also occurs if the `count` parameter is less than zero or greater than the length of the array in the `SocketAsyncEventArgs.Buffer` property minus the `offset` parameter.

#### Remarks
The `offset` and `count` parameters can't be negative numbers. The combination of the `offset` and `count` parameters must be in bounds of the data array in the `buffer` parameter.

This method sets the `Buffer` property to the `buffer` parameter, the `Count` property to the `count` parameter, and the `Offset` property to the `offset` parameter.

#### Examples
The following code example creates a single large buffer which can be divided up and assigned to `SocketAsyncEventArgs` objects for use with each socket I/O operation. This enables buffers to be easily reused and guards against fragmenting heap memory.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/SocketAsyncEventArgs/Overview/AsyncSocketServer.cs._
## SocketAsyncEventArgs.Completed event

```csharp
public event EventHandler<System.Net.Sockets.SocketAsyncEventArgs>? Completed;
```

The event used to complete an asynchronous operation.

#### Remarks
The `Completed` event provides a way for client applications to complete an asynchronous socket operation. An event handler should be attached to the event within a `SocketAsyncEventArgs` instance when an asynchronous socket operation is initiated, otherwise the application will not be able to determine when the operation completes.

The completion callback delegates referenced by the `Completed` event contains program logic to finish processing the asynchronous socket operation for the client.

When the event is signaled, the application uses the `SocketAsyncEventArgs` object parameter to obtain the status of the completed asynchronous socket operation.
