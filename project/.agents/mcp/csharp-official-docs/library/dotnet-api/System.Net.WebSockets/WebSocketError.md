---
title: "WebSocketError enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketError.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketError enum

Namespace: `System.Net.WebSockets`

```csharp
public enum WebSocketError
```

Contains the list of possible WebSocket errors.

To be added.

## WebSocketError.ConnectionClosedPrematurely field

```csharp
ConnectionClosedPrematurely
```

Indicates that the connection was terminated unexpectedly.

## WebSocketError.Faulted field

```csharp
Faulted
```

Indicates a general error.

## WebSocketError.HeaderError field

```csharp
HeaderError
```

Indicates an error occurred when parsing the HTTP headers during the opening handshake.

## WebSocketError.InvalidMessageType field

```csharp
InvalidMessageType
```

Indicates that a WebSocket frame with an unknown opcode was received.

## WebSocketError.InvalidState field

```csharp
InvalidState
```

Indicates the WebSocket is an invalid state for the given operation (such as being closed or aborted).

## WebSocketError.NativeError field

```csharp
NativeError
```

Indicates that an unknown native error occurred.

## WebSocketError.NotAWebSocket field

```csharp
NotAWebSocket
```

Indicates that the incoming request was not a valid websocket request.

## WebSocketError.Success field

```csharp
Success
```

Indicates that there was no native error information for the exception.

## WebSocketError.UnsupportedProtocol field

```csharp
UnsupportedProtocol
```

Indicates that the client requested an unsupported WebSocket subprotocol.

## WebSocketError.UnsupportedVersion field

```csharp
UnsupportedVersion
```

Indicates that the client requested an unsupported version of the WebSocket protocol.
