---
title: "ValueWebSocketReceiveResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/ValueWebSocketReceiveResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueWebSocketReceiveResult struct

Namespace: `System.Net.WebSockets`

```csharp
public readonly struct ValueWebSocketReceiveResult
```

Represents the result of performing a single `WebSocket.ReceiveAsync` operation on a `WebSocket`.

To be added.

## ValueWebSocketReceiveResult.ValueWebSocketReceiveResult(Int32, WebSocketMessageType, Boolean) constructor

```csharp
public ValueWebSocketReceiveResult (int count, System.Net.WebSockets.WebSocketMessageType messageType, bool endOfMessage);
```

Initializes a new instance of the `ValueWebSocketReceiveResult` struct. An instance of this struct represents the result of performing a single `ReceiveAsync` operation on a `WebSocket`.

Parameters:

- `count`: The number of bytes that the `WebSocket` received.
- `messageType`: One of the enumeration values that indicates whether the current message is a UTF-8 message or a binary message.
- `endOfMessage`: `true` to indicate the messsage has been received completely; otherwise, `false`.

To be added.

## ValueWebSocketReceiveResult.Count property

```csharp
public int Count { get; }
```

Gets the number of bytes that the `WebSocket` received.

Returns: The number of bytes that the `WebSocket` received.

To be added.

## ValueWebSocketReceiveResult.EndOfMessage property

```csharp
public bool EndOfMessage { get; }
```

Gets whether the message has been received completely.

Returns: `true` if the message was received completely; otherwise, `false`.

To be added.

## ValueWebSocketReceiveResult.MessageType property

```csharp
public System.Net.WebSockets.WebSocketMessageType MessageType { get; }
```

Gets the type of the current message.

Returns: One of the enumeration values that specifies if the current message is a UTF-8, binary, or close message.

To be added.
