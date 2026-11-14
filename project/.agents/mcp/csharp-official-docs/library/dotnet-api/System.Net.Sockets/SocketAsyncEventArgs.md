---
title: "SocketAsyncEventArgs class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketAsyncEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketAsyncEventArgs class

Namespace: `System.Net.Sockets`

```csharp
public class SocketAsyncEventArgs : EventArgs, IDisposable
```

Represents an asynchronous socket operation.

#### Remarks
The `SocketAsyncEventArgs` class is part of a set of enhancements to the `Socket` class that provide an alternative asynchronous pattern that can be used by specialized high-performance socket applications. This class was specifically designed for network server applications that require high performance. An application can use the enhanced asynchronous pattern exclusively or only in targeted hot areas (for example, when receiving large amounts of data).

The main feature of these enhancements is the avoidance of the repeated allocation and synchronization of objects during high-volume asynchronous socket I/O. The Begin/End design pattern currently implemented by the `Socket` class requires a `IAsyncResult` object be allocated for each asynchronous socket operation.

In the new `Socket` class enhancements, asynchronous socket operations are described by reusable `SocketAsyncEventArgs` objects allocated and maintained by the application. High-performance socket applications know best the amount of overlapped socket operations that must be sustained. The application can create as many of the `SocketAsyncEventArgs` objects that it needs. For example, if a server application needs to have 15 socket accept operations outstanding at all times to support incoming client connection rates, it can allocate 15 reusable `SocketAsyncEventArgs` objects for that purpose.

The pattern for performing an asynchronous socket operation with this class consists of the following steps:

1.  Allocate a new `SocketAsyncEventArgs` context object, or get a free one from an application pool.

2.  Set properties on the context object to the operation about to be performed (the completion callback method, the data buffer, the offset into the buffer, and the maximum amount of data to transfer, for example).

3.  Call the appropriate socket method (xxxAsync) to initiate the asynchronous operation.

4.  If the asynchronous socket method (xxxAsync) returns true, in the callback, query the context properties for completion status.

5.  If the asynchronous socket method (xxxAsync) returns false, the operation completed synchronously. The context properties may be queried for the operation result.

6.  Reuse the context for another operation, put it back in the pool, or discard it.

The lifetime of the new asynchronous socket operation context object is determined by references by the application code and asynchronous I/O references. It is not necessary for the application to retain a reference to an asynchronous socket operation context object after it is submitted as a parameter to one of the asynchronous socket operation methods. It will remain referenced until the completion callback returns. However it is advantageous for the application to retain the reference to the context so that it can be reused for a future asynchronous socket operation.

#### Examples
The following code example implements the connection logic for the socket server that uses the `SocketAsyncEventArgs` class. After accepting a connection, all data read from the client is sent back to the client. The read and echo back to the client pattern is continued until the client disconnects. The BufferManager class that is used by this example is displayed in the code example for the `SetBuffer` method. The SocketAsyncEventArgsPool class that is used in this example is displayed in the code example for the `SocketAsyncEventArgs.%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/SocketAsyncEventArgs/Overview/AsyncSocketServer.cs._
## SocketAsyncEventArgs.SocketAsyncEventArgs() constructor

```csharp
public SocketAsyncEventArgs ();
```

Creates an empty `SocketAsyncEventArgs` instance.

Exceptions:

- `NotSupportedException`: The platform is not supported.

#### Remarks
After calling this constructor all properties will have their default values:

- Object references will be null

- Properties that return an integer will return zero.

- The `LastOperation` property will be equal to `None`.

- The `SendPacketsFlags` property will be equal to `UseDefaultWorkerThread`, which specifies no flags will be used.

- The `SocketFlags` property will be equal to `None`.

The caller must set the appropriate properties prior to passing the object to the appropriate asynchronous socket (xxxAsync) method.

#### Examples
The following code example represents a collection of reusable `SocketAsyncEventArgs` objects.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/SocketAsyncEventArgs/Overview/AsyncSocketServer.cs._
## SocketAsyncEventArgs.SocketAsyncEventArgs(Boolean) constructor

```csharp
public SocketAsyncEventArgs (bool unsafeSuppressExecutionContextFlow);
```

Initializes the `SocketAsyncEventArgs`.

Parameters:

- `unsafeSuppressExecutionContextFlow`: Whether to disable the capturing and flow of execution context. Execution context flow should only be disabled if it's handled by higher layers.

To be added.

## SocketAsyncEventArgs.AcceptSocket property

```csharp
public System.Net.Sockets.Socket? AcceptSocket { get; set; }
```

Gets or sets the socket to use or the socket created for accepting a connection with an asynchronous socket method.

Returns: The `Socket` to use or the socket created for accepting a connection with an asynchronous socket method.

#### Remarks
This property can be used to provide an already created `Socket` that will be used for an asynchronous socket accept operation. Upon completion of the accept operation, it is the socket representing the accepted connection. If not supplied (set to null) before calling the `Socket.AcceptAsync` method, a new socket will be created automatically and be accessible in the completion callback with this property.

## SocketAsyncEventArgs.Buffer property

```csharp
public byte[]? Buffer { get; }
```

Gets the data buffer to use with an asynchronous socket method.

Returns: A `Byte` array that represents the data buffer to use with an asynchronous socket method.

#### Remarks
This property gets the data buffer currently associated with the `SocketAsyncEventArgs` instance. To set the buffer, the `SocketAsyncEventArgs.SetBuffer` method must be used.

This property is used with the `Socket.AcceptAsync`, `Socket.ConnectAsync`, `Socket.ReceiveAsync`, `Socket.ReceiveFromAsync`, `Socket.ReceiveMessageFromAsync`, `Socket.SendAsync`, and `Socket.SendToAsync` methods.

## SocketAsyncEventArgs.BufferList property

```csharp
public System.Collections.Generic.IList<ArraySegment<byte>>? BufferList { get; set; }
```

Gets or sets an array of data buffers to use with an asynchronous socket method.

Returns: An `IList` that represents an array of data buffers to use with an asynchronous socket method.

Exceptions:

- `ArgumentException`: There are ambiguous buffers specified on a set operation. This exception occurs if the `SocketAsyncEventArgs.Buffer` property has been set to a non-null value and an attempt was made to set the `SocketAsyncEventArgs.BufferList` property to a non-null value.

#### Remarks
This property is used with the `Socket.ReceiveAsync` and `Socket.SendAsync` methods.

This property is used to provide multiple buffers of data to be sent or to provide multiple buffers in which to store received data for an asynchronous socket operation that can send or receive data. Multiple buffers using the `BufferList` property are supported by the `Socket.ReceiveAsync` and `Socket.SendAsync` methods.

If the `BufferList` property is set to a non-null value, the `Buffer` property must be null and is ignored by the `Socket.ReceiveAsync` and `Socket.SendAsync` methods.

If the `SocketAsyncEventArgs.Buffer` was set to a non-null value and an attempt is made to set the `BufferList` property to a non-null value, an exception is thrown.

If the `BufferList` property is set to a non-null value, the `Socket.ConnectAsync` and `Socket.AcceptAsync` methods will throw an `ArgumentException`.

The `SocketAsyncEventArgs.BufferList` parameter is ignored by the `Socket.DisconnectAsync` and `Socket.SendPacketsAsync` methods.

## SocketAsyncEventArgs.BytesTransferred property

```csharp
public int BytesTransferred { get; }
```

Gets the number of bytes transferred in the socket operation.

Returns: An `Int32` that contains the number of bytes transferred in the socket operation.

#### Remarks
This property provides the number of bytes transferred in an asynchronous socket operation that can receive or send data. If zero is returned from a read operation, the remote end has closed the connection.

This property is set by all asynchronous socket operations except the `Socket.DisconnectAsync` method.

## SocketAsyncEventArgs.ConnectByNameError property

```csharp
public Exception? ConnectByNameError { get; }
```

Gets the exception in the case of a connection failure when a `DnsEndPoint` was used.

Returns: An `Exception` that indicates the cause of the connection error when a `DnsEndPoint` was specified for the `SocketAsyncEventArgs.RemoteEndPoint` property.

#### Remarks
In the case of a connection failure when a `DnsEndPoint` was specified for the `RemoteEndPoint` property, the `ConnectByNameError` property will contain the exception that indicates the detailed cause of the socket error.

When an `IPEndPoint` was specified for the `RemoteEndPoint` property and a connection failure occurs, the `ConnectByNameError` property will be a `null` reference.

The `SocketError` property is always set in the case of a connection failure. The `ConnectByNameError` property contains more information about the failure if it was a failure connecting to a `DnsEndPoint`. If an application is only interested in whether the connect operation succeeded or failed, then the application only needs to check the `SocketError` property.

## SocketAsyncEventArgs.ConnectSocket property

```csharp
public System.Net.Sockets.Socket? ConnectSocket { get; }
```

The created and connected `Socket` object after successful completion of the `ConnectAsync` method.

Returns: The connected `Socket` object.

#### Remarks
After successful completion of the `Socket.ConnectAsync` method, this property contains the newly created and connected `Socket` object.

## SocketAsyncEventArgs.Count property

```csharp
public int Count { get; }
```

Gets the maximum amount of data, in bytes, to send or receive in an asynchronous operation.

Returns: An `Int32` that contains the maximum amount of data, in bytes, to send or receive.

#### Remarks
This property is set by calling the `SocketAsyncEventArgs.SetBuffer` method.

This property is used with the `Socket.AcceptAsync`, `Socket.ConnectAsync`, `Socket.ReceiveAsync`, `Socket.ReceiveFromAsync`, `Socket.ReceiveMessageFromAsync`, `Socket.SendAsync`, and `Socket.SendToAsync` methods.

## SocketAsyncEventArgs.DisconnectReuseSocket property

```csharp
public bool DisconnectReuseSocket { get; set; }
```

Gets or sets a value that specifies if socket can be reused after a disconnect operation.

Returns: A `Boolean` that specifies if socket can be reused after a disconnect operation.

#### Remarks
This property is used to alter the behavior of `Socket.DisconnectAsync` method. If true, a socket disconnected by the `Socket.DisconnectAsync` method can be reused after disconnect completion in subsequent socket accept or connect operations.

## SocketAsyncEventArgs.LastOperation property

```csharp
public System.Net.Sockets.SocketAsyncOperation LastOperation { get; }
```

Gets the type of socket operation most recently performed with this context object.

Returns: A `SocketAsyncOperation` instance that indicates the type of socket operation most recently performed with this context object.

#### Remarks
This property describes the asynchronous socket operation that was most recently completed using this `SocketAsyncEventArgs` object. The value of this property will be `None` until the `SocketAsyncEventArgs` instance is used to begin an asynchronous socket operation. The property will then be set to the type of operation being performed in the methods that take the `SocketAsyncEventArgs` as a parameter. This property more easily facilitates using a single completion callback delegate for multiple kinds of asynchronous socket operations.

This property remains valid in a `SocketAsyncEventArgs` instance until the `SocketAsyncEventArgs` instance is used for another asynchronous socket (xxxAsync) operation.

This property is set by all asynchronous socket (xxxAsync) methods.

Calling an asynchronous socket method (xxxAsync) on the `Socket` class sets this property value. This property is intended for use with the SocketAsyncCallback completion routine implemented by the application.

## SocketAsyncEventArgs.MemoryBuffer property

```csharp
public Memory<byte> MemoryBuffer { get; }
```

Gets the region of memory to use as a buffer with an asynchronous socket method.

Returns: A region of memory that represents the data buffer to use with an asynchronous socket method.

#### Remarks

This property gets the data buffer currently associated with the `SocketAsyncEventArgs` instance. To set the buffer, the `SocketAsyncEventArgs.SetBuffer` method must be used.

This property is used with the `Socket.AcceptAsync`, `Socket.ConnectAsync`, `Socket.ReceiveAsync`, `Socket.ReceiveFromAsync`, `Socket.ReceiveMessageFromAsync`, `Socket.SendAsync`, and `Socket.SendToAsync` methods.

## SocketAsyncEventArgs.Offset property

```csharp
public int Offset { get; }
```

Gets the offset, in bytes, into the data buffer referenced by the `SocketAsyncEventArgs.Buffer` property.

Returns: An `Int32` that contains the offset, in bytes, into the data buffer referenced by the `SocketAsyncEventArgs.Buffer` property.

#### Remarks
This property describes the starting byte offset of data in the `Buffer` property. This value is set by calling the `SocketAsyncEventArgs.SetBuffer` method.

This property does not apply to the `BufferList` property.

This property is used with the `Socket.AcceptAsync`, `Socket.ConnectAsync`, `Socket.ReceiveAsync`, `Socket.ReceiveFromAsync`, `Socket.ReceiveMessageFromAsync`, `Socket.SendAsync`, and `Socket.SendToAsync` methods.

## SocketAsyncEventArgs.ReceiveMessageFromPacketInfo property

```csharp
public System.Net.Sockets.IPPacketInformation ReceiveMessageFromPacketInfo { get; }
```

Gets the IP address and interface of a received packet.

Returns: An `IPPacketInformation` instance that contains the destination IP address and interface of a received packet.

#### Remarks
This property provides information about a packet received using the `Socket.ReceiveMessageFromAsync` method.

This property is used with the `Socket.ReceiveMessageFromAsync` method.
