---
title: "SocketFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketFlags enum

Namespace: `System.Net.Sockets`

```csharp
public enum SocketFlags
```

Specifies socket send and receive behaviors.

#### Examples
The following example sends data and specifies `SocketFlags.None`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## SocketFlags.Broadcast field

```csharp
Broadcast
```

Indicates a broadcast packet.

## SocketFlags.ControlDataTruncated field

```csharp
ControlDataTruncated
```

Indicates that the control data did not fit into an internal 64-KB buffer and was truncated.

## SocketFlags.DontRoute field

```csharp
DontRoute
```

Send without using routing tables.

## SocketFlags.Multicast field

```csharp
Multicast
```

Indicates a multicast packet.

## SocketFlags.None field

```csharp
None
```

Use no flags for this call.

## SocketFlags.OutOfBand field

```csharp
OutOfBand
```

Process out-of-band data.

## SocketFlags.Partial field

```csharp
Partial
```

Partial send or receive for message.

## SocketFlags.Peek field

```csharp
Peek
```

Peek at the incoming message.

## SocketFlags.Truncated field

```csharp
Truncated
```

The message was too large to fit into the specified buffer and was truncated.
