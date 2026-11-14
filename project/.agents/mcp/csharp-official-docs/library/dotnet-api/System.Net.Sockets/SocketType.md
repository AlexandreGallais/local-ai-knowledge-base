---
title: "SocketType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketType enum

Namespace: `System.Net.Sockets`

```csharp
public enum SocketType
```

Specifies the type of socket that an instance of the `Socket` class represents.

#### Remarks
Before a `Socket` can send and receive data, it must first be created using an `AddressFamily`, a `SocketType`, and a `ProtocolType`. The `SocketType` enumeration provides several options for defining the type of `Socket` that you intend to open.

> **Note:**
>  `SocketType` sometimes implicitly indicates which `ProtocolType` is used within an `AddressFamily`. For example, when the `SocketType` is `Dgram`, the `ProtocolType` is always `Udp`. When the `SocketType` is `Stream`, the `ProtocolType` is always `Tcp`. If you try to create a `Socket` with an incompatible combination, `Socket` throws a `SocketException`.

#### Examples
The following example uses `Stream` as a parameter to the `Socket` constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/SelectMode/Overview/source.cs._

## SocketType.Dgram field

```csharp
Dgram
```

Supports datagrams, which are connectionless, unreliable messages of a fixed (typically small) maximum length. Messages might be lost or duplicated and might arrive out of order. A `Socket` of type `SocketType.Dgram` requires no connection prior to sending and receiving data, and can communicate with multiple peers. `SocketType.Dgram` uses the Datagram Protocol (`ProtocolType`.`ProtocolType.Udp`) and the `AddressFamily`.`AddressFamily.InterNetwork` address family.

## SocketType.Raw field

```csharp
Raw
```

Supports access to the underlying transport protocol. Using `SocketType.Raw`, you can communicate using protocols like Internet Control Message Protocol (`ProtocolType`.`ProtocolType.Icmp`) and Internet Group Management Protocol (`ProtocolType`.`ProtocolType.Igmp`). Your application must provide a complete IP header when sending. Received datagrams return with the IP header and options intact.

## SocketType.Rdm field

```csharp
Rdm
```

Supports connectionless, message-oriented, reliably delivered messages, and preserves message boundaries in data. Rdm (Reliably Delivered Messages) messages arrive unduplicated and in order. Furthermore, the sender is notified if messages are lost. If you initialize a `Socket` using `SocketType.Rdm`, you do not require a remote host connection before sending and receiving data. With `SocketType.Rdm`, you can communicate with multiple peers.

## SocketType.Seqpacket field

```csharp
Seqpacket
```

Provides connection-oriented and reliable two-way transfer of ordered byte streams across a network. `SocketType.Seqpacket` does not duplicate data, and it preserves boundaries within the data stream. A `Socket` of type `SocketType.Seqpacket` communicates with a single peer and requires a remote host connection before communication can begin.

## SocketType.Stream field

```csharp
Stream
```

Supports reliable, two-way, connection-based byte streams without the duplication of data and without preservation of boundaries. A `Socket` of this type communicates with a single peer and requires a remote host connection before communication can begin. `SocketType.Stream` uses the Transmission Control Protocol (`ProtocolType`.`ProtocolType.Tcp`) and the `AddressFamily`.`AddressFamily.InterNetwork` address family.

## SocketType.Unknown field

```csharp
Unknown
```

Specifies an unknown `Socket` type.
