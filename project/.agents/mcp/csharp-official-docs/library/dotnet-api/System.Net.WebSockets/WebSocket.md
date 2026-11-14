---
title: "WebSocket class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocket class

Namespace: `System.Net.WebSockets`

```csharp
public abstract class WebSocket : IDisposable
```

Allows applications to send and receive data after the WebSocket upgrade has completed.

#### Remarks
Some of the classes in the `WebSockets` namespace are supported on Windows 7, Windows Vista SP2, and Windows Server 2008. However, the only public implementations of client and server WebSockets are supported on Windows 8 and Windows Server 2012. The classes and class elements in the `WebSockets` namespace that are supported on Windows 7, Windows Vista SP2, and Windows Server 2008 are abstract classes. This allows an application developer to inherit and extend these abstract classes with an actual implementation of client WebSockets.

Exactly one send and one receive is supported on each `WebSocket` object in parallel. Issuing multiple sends or multiple receives at the same time (for example, without awaiting, or from multiple threads without synchronization) is *not supported* and will result in an *undefined behavior*. Ensure that the previous operation is awaited (or completed) before issuing the next one. Serialize the access via whatever mechanism works best for you, for example, by using a lock or a semaphore.

## WebSocket.WebSocket() constructor

```csharp
protected WebSocket ();
```

Creates an instance of the `WebSocket` class.

To be added.

## WebSocket.CloseStatus property

```csharp
public abstract System.Net.WebSockets.WebSocketCloseStatus? CloseStatus { get; }
```

Indicates the reason why the remote endpoint initiated the close handshake.

Returns: Returns `WebSocketCloseStatus`.

#### Remarks
If the close handshake has not been initiated yet, WebSocketCloseStatus.None is returned.

## WebSocket.CloseStatusDescription property

```csharp
public abstract string? CloseStatusDescription { get; }
```

Allows the remote endpoint to describe the reason why the connection was closed.

Returns: Returns `String`.

To be added.

## WebSocket.DefaultKeepAliveInterval property

```csharp
public static TimeSpan DefaultKeepAliveInterval { get; }
```

Gets the default WebSocket protocol keep-alive interval.

Returns: The default WebSocket protocol keep-alive interval. The typical value for this interval is 30 seconds (as defined by the OS or the .NET platform). It is used to initialize `ClientWebSocketOptions.KeepAliveInterval` value.

To be added.

## WebSocket.State property

```csharp
public abstract System.Net.WebSockets.WebSocketState State { get; }
```

Returns the current state of the WebSocket connection.

Returns: The current state of the WebSocket connection.

To be added.

## WebSocket.SubProtocol property

```csharp
public abstract string? SubProtocol { get; }
```

Gets the subprotocol that was negotiated during the opening handshake.

Returns: The subprotocol that was negotiated during the opening handshake.

To be added.

## WebSocket.Abort() method

```csharp
public abstract void Abort ();
```

Aborts the WebSocket connection and cancels any pending IO operations.

To be added.

## WebSocket.CloseAsync(WebSocketCloseStatus, String, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.Task CloseAsync (System.Net.WebSockets.WebSocketCloseStatus closeStatus, string? statusDescription, System.Threading.CancellationToken <example-value>);
```

Closes the WebSocket connection as an asynchronous operation using the close handshake defined in the WebSocket protocol specification, section 7.

Parameters:

- `closeStatus`: Indicates the reason for closing the WebSocket connection.
- `statusDescription`: Specifies a human readable explanation as to why the connection is closed.
- `cancellationToken`: The token that can be used to propagate notification that operations should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after the WebSocket has been closed.

This method closes the WebSocket connection using the close handshake defined in the WebSocket protocol specification, section 7.

## WebSocket.CloseOutputAsync(WebSocketCloseStatus, String, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.Task CloseOutputAsync (System.Net.WebSockets.WebSocketCloseStatus closeStatus, string? statusDescription, System.Threading.CancellationToken <example-value>);
```

Initiates or completes the close handshake defined in the WebSocket protocol specification, section 7.

Parameters:

- `closeStatus`: Indicates the reason for closing the WebSocket connection.
- `statusDescription`: Allows applications to specify a human readable explanation as to why the connection is closed.
- `cancellationToken`: The token that can be used to propagate notification that operations should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after the output on the WebSocket has been closed.

## WebSocket.CreateClientBuffer(Int32, Int32) method

```csharp
public static ArraySegment<byte> CreateClientBuffer (int receiveBufferSize, int sendBufferSize);
```

Creates client buffers to use with this `WebSocket` instance.

Parameters:

- `receiveBufferSize`: The size, in bytes, of the client receive buffer.
- `sendBufferSize`: The size, in bytes, of the send buffer.

Returns: An array with the client buffers.

To be added.

## WebSocket.CreateClientWebSocket(Stream, String, Int32, Int32, TimeSpan, Boolean, Byte>) method

```csharp
public static System.Net.WebSockets.WebSocket CreateClientWebSocket (System.IO.Stream innerStream, string? subProtocol, int receiveBufferSize, int sendBufferSize, TimeSpan keepAliveInterval, bool useZeroMaskingKey, ArraySegment<byte> internalBuffer);
```

Allows callers to create a client side WebSocket class which will use the WSPC for framing purposes.

Parameters:

- `innerStream`: The connection to be used for IO operations.
- `subProtocol`: The subprotocol accepted by the client.
- `receiveBufferSize`: The size in bytes of the client WebSocket receive buffer.
- `sendBufferSize`: The size in bytes of the client WebSocket send buffer.
- `keepAliveInterval`: Determines how regularly a frame is sent over the connection as a keep-alive. Applies only when the connection is idle.
- `useZeroMaskingKey`: Indicates whether a random key or a static key (just zeros) should be used for the WebSocket masking.
- `internalBuffer`: Will be used as the internal buffer in the WPC. The size has to be at least `2 * ReceiveBufferSize + SendBufferSize + 256 + 20 (16 on 32-bit)`.

Returns: Returns `WebSocket`.

To be added.

## WebSocket.CreateFromStream(Stream, WebSocketCreationOptions) method

```csharp
public static System.Net.WebSockets.WebSocket CreateFromStream (System.IO.Stream stream, System.Net.WebSockets.WebSocketCreationOptions options);
```

Creates a `WebSocket` that operates on a `Stream` representing a web socket connection.

Parameters:

- `stream`: The `Stream` for the connection.
- `options`: The options with which the websocket must be created.

Returns: The created web socket.

To be added.

## WebSocket.CreateFromStream(Stream, Boolean, String, TimeSpan) method

```csharp
public static System.Net.WebSockets.WebSocket CreateFromStream (System.IO.Stream stream, bool isServer, string? subProtocol, TimeSpan keepAliveInterval);
```

Creates a new `WebSocket` object that operates on the specified stream, which represents a web socket connection.

Parameters:

- `stream`: The stream for the connection.
- `isServer`: `true` to indicate it's the server-side of the connection; `false` if it's the client-side.
- `subProtocol`: The agreed upon sub-protocol that was used when creating the connection.
- `keepAliveInterval`: The keep-alive interval to use, or `Timeout.InfiniteTimeSpan` to disable keep-alives.

Returns: The new web socket.

To be added.

## WebSocket.CreateServerBuffer(Int32) method

```csharp
public static ArraySegment<byte> CreateServerBuffer (int receiveBufferSize);
```

Creates a WebSocket server buffer.

Parameters:

- `receiveBufferSize`: The size, in bytes, of the desired buffer.

Returns: Returns `ArraySegment<T>`.

To be added.

## WebSocket.Dispose() method

```csharp
public abstract void Dispose ();
```

Cleans up unmanaged resources for ASP.NET and self-hosted implementations.

To be added.

## WebSocket.IsApplicationTargeting45() method

```csharp
public static bool IsApplicationTargeting45 ();
```

Returns a value that indicates if the WebSocket instance targets .NET Framework 4.5.

Returns: `true` if the `WebSocket` targets .NET Framework 4.5; otherwise, `false`.

To be added.

## WebSocket.IsStateTerminal(WebSocketState) method

```csharp
protected static bool IsStateTerminal (System.Net.WebSockets.WebSocketState state);
```

Returns a value that indicates if the state of the WebSocket instance is closed or aborted.

Parameters:

- `state`: The current state of the WebSocket.

Returns: `true` if the `WebSocket` is closed or aborted; otherwise, `false`.

To be added.

## WebSocket.ReceiveAsync(Byte>, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.Task<System.Net.WebSockets.WebSocketReceiveResult> ReceiveAsync (ArraySegment<byte> buffer, System.Threading.CancellationToken <example-value>);
```

Receives data from the `WebSocket` connection asynchronously.

Parameters:

- `buffer`: References the application buffer that is the storage location for the received data.
- `cancellationToken`: Propagates the notification that operations should be canceled.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `WebSocketReceiveResult` object that represents the received data.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the data has been received on the `WebSocket`.

Exactly one send and one receive is supported on each `WebSocket` object in parallel. Issuing multiple receives at the same time is *not supported* and will result in an *undefined behavior*. You should serialize receive operations via whatever mechanism works best for you, for example, by using a lock or a semaphore.

## WebSocket.ReceiveAsync(Byte>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<System.Net.WebSockets.ValueWebSocketReceiveResult> ReceiveAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value>);
```

Receives data from the `WebSocket` connection asynchronously.

Parameters:

- `buffer`: The application buffer that is the storage location for the received data.
- `cancellationToken`: The cancellation token to use to cancel the receive operation.

Returns: The task object representing the asynchronous operation. The `ValueTask<T>.Result` property on the task object returns a `ValueWebSocketReceiveResult` object that represents the received data.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## WebSocket.RegisterPrefixes() method

```csharp
public static void RegisterPrefixes ();
```

Allows callers to register prefixes for WebSocket requests (ws and wss).

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## WebSocket.SendAsync(Byte>, WebSocketMessageType, Boolean, CancellationToken) method

```csharp
public abstract System.Threading.Tasks.Task SendAsync (ArraySegment<byte> buffer, System.Net.WebSockets.WebSocketMessageType messageType, bool endOfMessage, System.Threading.CancellationToken <example-value>);
```

Sends data over the `WebSocket` connection asynchronously.

Parameters:

- `buffer`: The buffer to be sent over the connection.
- `messageType`: Indicates whether the application is sending a binary or text message.
- `endOfMessage`: Indicates whether the data in "buffer" is the last part of a message.
- `cancellationToken`: The token that propagates the notification that operations should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after the data has been sent on the `WebSocket`.

Exactly one send and one receive is supported on each `WebSocket` object in parallel. Issuing multiple sends at the same time is *not supported* and will result in an *undefined behavior*. You should serialize send operations via whatever mechanism works best for you, for example, by using a lock or a semaphore.

## WebSocket.SendAsync(Byte>, WebSocketMessageType, Boolean, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask SendAsync (ReadOnlyMemory<byte> buffer, System.Net.WebSockets.WebSocketMessageType messageType, bool endOfMessage, System.Threading.CancellationToken <example-value>);
```

Sends data over the `WebSocket` connection asynchronously.

Parameters:

- `buffer`: The buffer to be sent over the connection.
- `messageType`: One of the enumeration values that indicates whether the application is sending a binary or text message.
- `endOfMessage`: `true` to indicate the data in "buffer" is the last part of a message; otherwise, `false`.
- `cancellationToken`: The cancellation token to use to cancel the send operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
