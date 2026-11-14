---
title: "WebSocketState enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketState enum

Namespace: `System.Net.WebSockets`

```csharp
public enum WebSocketState
```

Defines the different states a WebSockets instance can be in.

To be added.

## WebSocketState.Aborted field

```csharp
Aborted
```

Indicates that the WebSocket has been aborted.

## WebSocketState.Closed field

```csharp
Closed
```

Indicates the WebSocket close handshake completed gracefully.

## WebSocketState.CloseReceived field

```csharp
CloseReceived
```

A close message was received from the remote endpoint.

## WebSocketState.CloseSent field

```csharp
CloseSent
```

A close message was sent to the remote endpoint.

## WebSocketState.Connecting field

```csharp
Connecting
```

The connection is negotiating the handshake with the remote endpoint.

## WebSocketState.None field

```csharp
None
```

Reserved for future use.

## WebSocketState.Open field

```csharp
Open
```

The initial state after the HTTP handshake has been completed.
