---
title: "ClientWebSocket class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/ClientWebSocket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClientWebSocket class (part 2 of 2)

## ClientWebSocket.SendAsync(Byte>, WebSocketMessageType, WebSocketMessageFlags, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask SendAsync (ReadOnlyMemory<byte> buffer, System.Net.WebSockets.WebSocketMessageType messageType, System.Net.WebSockets.WebSocketMessageFlags messageFlags, System.Threading.CancellationToken <example-value>);
```

Sends data on `ClientWebSocket` from a read-only byte memory range as an asynchronous operation.

Parameters:

- `buffer`: The region of memory containing the message to be sent.
- `messageType`: One of the enumeration values that specifies whether the buffer is clear text or in a binary format.
- `messageFlags`: A bitwise combination of the enumeration values that specifies how the message will be sent.
- `cancellationToken`: A cancellation token used to propagate notification that this operation should be canceled.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This operation does not block. The returned `Task` object completes after the send request on the `ClientWebSocket` instance has completed.

Exactly one send and one receive is supported on each `ClientWebSocket` object in parallel. Issuing multiple sends at the same time is *not supported* and will result in an *undefined behavior*. You should serialize send operations via whatever mechanism works best for you, for example, by using a lock or a semaphore.
