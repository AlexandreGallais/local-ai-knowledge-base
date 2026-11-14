---
title: "SocketOptionLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketOptionLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketOptionLevel enum

Namespace: `System.Net.Sockets`

```csharp
public enum SocketOptionLevel
```

Defines socket option levels for the `Socket.SetSocketOption` and `Socket.GetSocketOption` methods.

#### Remarks
The `SocketOptionLevel` enumeration defines the socket option levels that can be passed to the `Socket.SetSocketOption` and `Socket.GetSocketOption` methods. `SocketOptionName` enumerated values are grouped by `SocketOptionLevel`.

#### Examples
The following example uses this enumeration to set socket options.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## SocketOptionLevel.IP field

```csharp
IP
```

`Socket` options apply only to IP sockets.

## SocketOptionLevel.IPv6 field

```csharp
IPv6
```

`Socket` options apply only to IPv6 sockets.

## SocketOptionLevel.Socket field

```csharp
Socket
```

`Socket` options apply to all sockets.

## SocketOptionLevel.Tcp field

```csharp
Tcp
```

`Socket` options apply only to TCP sockets.

## SocketOptionLevel.Udp field

```csharp
Udp
```

`Socket` options apply only to UDP sockets.
