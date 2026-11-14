---
title: "WebSocket class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocket class (part 2 of 2)

## WebSocket.SendAsync(Byte>, WebSocketMessageType, WebSocketMessageFlags, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask SendAsync (ReadOnlyMemory<byte> buffer, System.Net.WebSockets.WebSocketMessageType messageType, System.Net.WebSockets.WebSocketMessageFlags messageFlags, System.Threading.CancellationToken <example-value>);
```

Sends data over the `WebSocket` connection asynchronously.

Parameters:

- `buffer`: The buffer to be sent over the connection.
- `messageType`: One of the enumeration values that indicates whether the application is sending a binary or text message.
- `messageFlags`: Flags for controlling how the `WebSocket` should send a message.
- `cancellationToken`: The cancellation token to use to cancel the send operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## WebSocket.ThrowOnInvalidState(WebSocketState, WebSocketState[]) method

```csharp
protected static void ThrowOnInvalidState (System.Net.WebSockets.WebSocketState state, params System.Net.WebSockets.WebSocketState[] validStates);
```

Verifies that the connection is in an expected state.

Parameters:

- `state`: The current state of the WebSocket to be tested against the list of valid states.
- `validStates`: List of valid connection states.

To be added.
