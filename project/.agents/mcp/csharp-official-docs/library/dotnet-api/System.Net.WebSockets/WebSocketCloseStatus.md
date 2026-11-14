---
title: "WebSocketCloseStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketCloseStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketCloseStatus enum

Namespace: `System.Net.WebSockets`

```csharp
public enum WebSocketCloseStatus
```

Represents well known WebSocket close codes as defined in section 11.7 of the WebSocket protocol spec.

To be added.

## WebSocketCloseStatus.Empty field

```csharp
Empty
```

No error specified.

## WebSocketCloseStatus.EndpointUnavailable field

```csharp
EndpointUnavailable
```

(1001) Indicates an endpoint is being removed. Either the server or client will become unavailable.

## WebSocketCloseStatus.InternalServerError field

```csharp
InternalServerError
```

(1011) The connection will be closed by the server because of an error on the server.

## WebSocketCloseStatus.InvalidMessageType field

```csharp
InvalidMessageType
```

(1003) The client or server is terminating the connection because it cannot accept the data type it received.

## WebSocketCloseStatus.InvalidPayloadData field

```csharp
InvalidPayloadData
```

(1007) The client or server is terminating the connection because it has received data inconsistent with the message type.

## WebSocketCloseStatus.MandatoryExtension field

```csharp
MandatoryExtension
```

(1010) The client is terminating the connection because it expected the server to negotiate an extension.

## WebSocketCloseStatus.MessageTooBig field

```csharp
MessageTooBig
```

(1009) The client or server is terminating the connection because it has received a message that is too big for it to process.

## WebSocketCloseStatus.NormalClosure field

```csharp
NormalClosure
```

(1000) The connection has closed after the request was fulfilled.

## WebSocketCloseStatus.PolicyViolation field

```csharp
PolicyViolation
```

(1008) The connection will be closed because an endpoint has received a message that violates its policy.

## WebSocketCloseStatus.ProtocolError field

```csharp
ProtocolError
```

(1002) The client or server is terminating the connection because of a protocol error.
