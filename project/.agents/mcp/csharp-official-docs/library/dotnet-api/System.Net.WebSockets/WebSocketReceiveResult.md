---
title: "WebSocketReceiveResult class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketReceiveResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketReceiveResult class

Namespace: `System.Net.WebSockets`

```csharp
public class WebSocketReceiveResult
```

Represents the result of performing a single ReceiveAsync operation on a WebSocket.

To be added.

## WebSocketReceiveResult.WebSocketReceiveResult(Int32, WebSocketMessageType, Boolean) constructor

```csharp
public WebSocketReceiveResult (int count, System.Net.WebSockets.WebSocketMessageType messageType, bool endOfMessage);
```

Creates an instance of the `WebSocketReceiveResult` class.

Parameters:

- `count`: The number of bytes received.
- `messageType`: The type of message that was received.
- `endOfMessage`: Indicates whether this is the final message.

To be added.

## WebSocketReceiveResult.WebSocketReceiveResult(Int32, WebSocketMessageType, Boolean, WebSocketCloseStatus>, String) constructor

```csharp
public WebSocketReceiveResult (int count, System.Net.WebSockets.WebSocketMessageType messageType, bool endOfMessage, System.Net.WebSockets.WebSocketCloseStatus? closeStatus, string? closeStatusDescription);
```

Creates an instance of the `WebSocketReceiveResult` class.

Parameters:

- `count`: The number of bytes received.
- `messageType`: The type of message that was received.
- `endOfMessage`: Indicates whether this is the final message.
- `closeStatus`: Indicates the `WebSocketCloseStatus` of the connection.
- `closeStatusDescription`: The description of `closeStatus`.

To be added.

## WebSocketReceiveResult.CloseStatus property

```csharp
public System.Net.WebSockets.WebSocketCloseStatus? CloseStatus { get; }
```

Indicates the reason why the remote endpoint initiated the close handshake.

Returns: Returns `WebSocketCloseStatus`.

To be added.

## WebSocketReceiveResult.CloseStatusDescription property

```csharp
public string? CloseStatusDescription { get; }
```

Returns the optional description that describes why the close handshake has been initiated by the remote endpoint.

Returns: Returns `String`.

To be added.

## WebSocketReceiveResult.Count property

```csharp
public int Count { get; }
```

Indicates the number of bytes that the WebSocket received.

Returns: Returns `Int32`.

#### Remarks
Count can be 0 in two cases:

1.  The WebSocket received an empty message. In this case the `CloseStatus` property is None.

2.  The WebSocket received a close message from the remote endpoint. In this case, the `CloseStatus` property is set to a value other than None.

## WebSocketReceiveResult.EndOfMessage property

```csharp
public bool EndOfMessage { get; }
```

Indicates whether the message has been received completely.

Returns: Returns `Boolean`.

To be added.

## WebSocketReceiveResult.MessageType property

```csharp
public System.Net.WebSockets.WebSocketMessageType MessageType { get; }
```

Indicates whether the current message is a UTF-8 message or a binary message.

Returns: Returns `WebSocketMessageType`.

To be added.
