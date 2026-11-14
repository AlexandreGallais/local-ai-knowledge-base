---
title: "ClientWebSocket class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/ClientWebSocket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClientWebSocket class

Namespace: `System.Net.WebSockets`

```csharp
public sealed class ClientWebSocket : System.Net.WebSockets.WebSocket
```

Provides a client for connecting to WebSocket services.

#### Remarks
Some of the classes and class elements in the `WebSockets` namespace are supported on Windows 7, Windows Vista SP2, and Windows Server 2008. However, the only public implementations of client and server WebSockets are supported on Windows 8 and Windows Server 2012. The class elements in the `WebSockets` namespace that are supported on Windows 7, Windows Vista SP2, and Windows Server 2008 are abstract class elements. This allows an application developer to inherit and extend these abstract class classes and class elements with an actual implementation of client WebSockets.

Exactly one send and one receive is supported on each `ClientWebSocket` object in parallel. Issuing multiple sends or multiple receives at the same time (for example, without awaiting, or from multiple threads without synchronization) is *not supported* and will result in an *undefined behavior*. Ensure that the previous operation is awaited (or completed) before issuing the next one. You should serialize the access via whatever mechanism works best for you, for example, by using a lock or a semaphore.

## ClientWebSocket.ClientWebSocket() constructor

```csharp
public ClientWebSocket ();
```

Creates an instance of the `ClientWebSocket` class.

To be added.

## ClientWebSocket.CloseStatus property

```csharp
public override System.Net.WebSockets.WebSocketCloseStatus? CloseStatus { get; }
```

Gets the reason why the close handshake was initiated on `ClientWebSocket` instance.

Returns: The reason why the close handshake was initiated.

To be added.

## ClientWebSocket.CloseStatusDescription property

```csharp
public override string? CloseStatusDescription { get; }
```

Gets a description of the reason why the `ClientWebSocket` instance was closed.

Returns: The description of the reason why the `ClientWebSocket` instance was closed.

To be added.

## ClientWebSocket.HttpResponseHeaders property

```csharp
public System.Collections.Generic.IReadOnlyDictionary<string,System.Collections.Generic.IEnumerable<string>>? HttpResponseHeaders { get; set; }
```

Gets (if `ClientWebSocketOptions.CollectHttpResponseDetails` is set) or sets the upgrade response headers.

Returns: To be added.

The setter can be used to reduce the memory usage of an active WebSocket connection once headers are no longer needed.

## ClientWebSocket.HttpStatusCode property

```csharp
public System.Net.HttpStatusCode HttpStatusCode { get; }
```

Gets the upgrade response status code if `ClientWebSocketOptions.CollectHttpResponseDetails` is set.

Returns: To be added.

To be added.

## ClientWebSocket.Options property

```csharp
public System.Net.WebSockets.ClientWebSocketOptions Options { get; }
```

Gets the WebSocket options for the `ClientWebSocket` instance.

Returns: The WebSocket options for the `ClientWebSocket` instance.

To be added.

## ClientWebSocket.State property

```csharp
public override System.Net.WebSockets.WebSocketState State { get; }
```

Gets the WebSocket state of the `ClientWebSocket` instance.

Returns: The WebSocket state of the `ClientWebSocket` instance.

To be added.

## ClientWebSocket.SubProtocol property

```csharp
public override string? SubProtocol { get; }
```

Gets the supported WebSocket sub-protocol for the `ClientWebSocket` instance.

Returns: The supported WebSocket sub-protocol.

To be added.

## ClientWebSocket.Abort() method

```csharp
public override void Abort ();
```

Aborts the connection and cancels any pending IO operations.

The `ClientWebSocket` cannot be reused once it is aborted.

## ClientWebSocket.CloseAsync(WebSocketCloseStatus, String, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CloseAsync (System.Net.WebSockets.WebSocketCloseStatus closeStatus, string? statusDescription, System.Threading.CancellationToken <example-value>);
```

Closes the `ClientWebSocket` instance as an asynchronous operation.

Parameters:

- `closeStatus`: The WebSocket close status.
- `statusDescription`: A description of the close status.
- `cancellationToken`: A cancellation token used to propagate notification that this  operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after the `ClientWebSocket` instance is closed.

## ClientWebSocket.CloseOutputAsync(WebSocketCloseStatus, String, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CloseOutputAsync (System.Net.WebSockets.WebSocketCloseStatus closeStatus, string? statusDescription, System.Threading.CancellationToken <example-value>);
```

Closes the output for the `ClientWebSocket` instance as an asynchronous operation.

Parameters:

- `closeStatus`: The WebSocket close status.
- `statusDescription`: A description of the close status.
- `cancellationToken`: A cancellation token used to propagate notification that this  operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task` object will complete after the output on the `ClientWebSocket` instance is closed.

## ClientWebSocket.ConnectAsync(Uri, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (Uri uri, System.Threading.CancellationToken <example-value>);
```

Connects to a WebSocket server as an asynchronous operation.

Parameters:

- `uri`: The URI of the WebSocket server to connect to.
- `cancellationToken`: A cancellation token used to propagate notification that the operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `ClientWebSocket.ConnectAsync` method initiates the WebSocket handshake with a remote network destination, and then negotiates the sub-protocol.

For plain WebSocket connections, use the `ws://` scheme in the uri. For secure WebSocket connections over TLS/SSL, use the `wss://` scheme.

This operation will not block. The returned `Task` object will complete after the connect request on the `ClientWebSocket` instance has completed.

The WebSocket handshake request has default headers for HTTP/1.1 request:

`Connection: Upgrade`

`Upgrade: websocket`

`Sec-WebSocket-Key: [generated key]`

For HTTP/2 request:

`:protocol: websocket`

By default, HTTP/1.1 will be used. To change HTTP version used or enable HTTP version upgrade/downgrade, see `HttpVersion` option and `HttpVersionPolicy` option.

## ClientWebSocket.ConnectAsync(Uri, HttpMessageInvoker, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (Uri uri, System.Net.Http.HttpMessageInvoker? invoker, System.Threading.CancellationToken <example-value>);
```

Connects to a WebSocket server as an asynchronous operation.

Parameters:

- `uri`: The URI of the WebSocket server to connect to.
- `invoker`: The `HttpMessageInvoker` instance to use for connecting.
- `cancellationToken`: A cancellation token used to propagate notification that the operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## ClientWebSocket.Dispose() method

```csharp
public override void Dispose ();
```

Releases the unmanaged resources used by the `ClientWebSocket` instance.

To be added.

## ClientWebSocket.ReceiveAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<System.Net.WebSockets.WebSocketReceiveResult> ReceiveAsync (ArraySegment<byte> buffer, System.Threading.CancellationToken <example-value>);
```

Receives data on `ClientWebSocket` as an asynchronous operation.

Parameters:

- `buffer`: The buffer to receive the response.
- `cancellationToken`: A cancellation token used to propagate notification that this operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `ClientWebSocket` is not connected.
- `ObjectDisposedException`: The `ClientWebSocket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the receive request on the `ClientWebSocket` instance has completed.

Exactly one send and one receive is supported on each `ClientWebSocket` object in parallel. Issuing multiple receives at the same time is *not supported* and will result in an *undefined behavior*. You should serialize receive operations via whatever mechanism works best for you, for example, by using a lock or a semaphore.

## ClientWebSocket.ReceiveAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<System.Net.WebSockets.ValueWebSocketReceiveResult> ReceiveAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value>);
```

Receives data on `ClientWebSocket` as an asynchronous operation.

Parameters:

- `buffer`: The region of memory to receive the response.
- `cancellationToken`: A cancellation token used to propagate notification that this operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `ClientWebSocket` is not connected.
- `ObjectDisposedException`: The `ClientWebSocket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the receive request on the `ClientWebSocket` instance has completed.

Exactly one send and one receive is supported on each `ClientWebSocket` object in parallel. Issuing multiple receives at the same time is *not supported* and will result in an *undefined behavior*. You should serialize receive operations via whatever mechanism works best for you, for example, by using a lock or a semaphore.

## ClientWebSocket.SendAsync(Byte>, WebSocketMessageType, Boolean, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task SendAsync (ArraySegment<byte> buffer, System.Net.WebSockets.WebSocketMessageType messageType, bool endOfMessage, System.Threading.CancellationToken <example-value>);
```

Sends data on `ClientWebSocket` as an asynchronous operation.

Parameters:

- `buffer`: The buffer containing the message to be sent.
- `messageType`: One of the enumeration values that specifies whether the buffer is clear text or in a binary format.
- `endOfMessage`: `true` to indicate this is the final asynchronous send; otherwise, `false`.
- `cancellationToken`: A cancellation token used to propagate notification that this operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `ClientWebSocket` is not connected.
- `ObjectDisposedException`: The `ClientWebSocket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This operation will not block. The returned `Task` object will complete after the send request on the `ClientWebSocket` instance has completed.

Exactly one send and one receive is supported on each `ClientWebSocket` object in parallel. Issuing multiple sends at the same time is *not supported* and will result in an *undefined behavior*. You should serialize send operations via whatever mechanism works best for you, for example, by using a lock or a semaphore.

## ClientWebSocket.SendAsync(Byte>, WebSocketMessageType, Boolean, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask SendAsync (ReadOnlyMemory<byte> buffer, System.Net.WebSockets.WebSocketMessageType messageType, bool endOfMessage, System.Threading.CancellationToken <example-value>);
```

Sends data on `ClientWebSocket` from a read-only byte memory range as an asynchronous operation.

Parameters:

- `buffer`: The region of memory containing the message to be sent.
- `messageType`: One of the enumeration values that specifies whether the buffer is clear text or in a binary format.
- `endOfMessage`: `true` to indicate this is the final asynchronous send; otherwise, `false`.
- `cancellationToken`: A cancellation token used to propagate notification that this operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `ClientWebSocket` is not connected.
- `ObjectDisposedException`: The `ClientWebSocket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This operation will not block. The returned `Task` object will complete after the send request on the `ClientWebSocket` instance has completed.

Exactly one send and one receive is supported on each `ClientWebSocket` object in parallel. Issuing multiple sends at the same time is *not supported* and will result in an *undefined behavior*. You should serialize send operations via whatever mechanism works best for you, for example, by using a lock or a semaphore.
