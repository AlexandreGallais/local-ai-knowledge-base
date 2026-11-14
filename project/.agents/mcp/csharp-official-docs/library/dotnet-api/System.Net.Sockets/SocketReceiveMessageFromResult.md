---
title: "SocketReceiveMessageFromResult struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketReceiveMessageFromResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketReceiveMessageFromResult struct

Namespace: `System.Net.Sockets`

```csharp
public struct SocketReceiveMessageFromResult
```

The result of a `SocketTaskExtensions.ReceiveMessageFromAsync` operation.

To be added.

## SocketReceiveMessageFromResult.PacketInformation field

```csharp
public System.Net.Sockets.IPPacketInformation PacketInformation;
```

An `IPPacketInformation` holding address and interface information.

To be added.

## SocketReceiveMessageFromResult.ReceivedBytes field

```csharp
public int ReceivedBytes;
```

The number of bytes received. If the `SocketTaskExtensions.ReceiveMessageFromAsync` operation is unsuccessful, this value will be 0.

To be added.

## SocketReceiveMessageFromResult.RemoteEndPoint field

```csharp
public System.Net.EndPoint RemoteEndPoint;
```

The source `EndPoint`.

To be added.

## SocketReceiveMessageFromResult.SocketFlags field

```csharp
public System.Net.Sockets.SocketFlags SocketFlags;
```

A bitwise combination of the `SocketFlags` values for the received packet.

To be added.
