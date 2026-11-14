---
title: "SocketShutdown enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketShutdown.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketShutdown enum

Namespace: `System.Net.Sockets`

```csharp
public enum SocketShutdown
```

Defines constants that are used by the `Socket.Shutdown` method.

#### Remarks
The `SocketShutdown` enumeration defines the values that can be passed to the `Socket.Shutdown` method.

## SocketShutdown.Both field

```csharp
Both
```

Disables a `Socket` for both sending and receiving. This field is constant.

## SocketShutdown.Receive field

```csharp
Receive
```

Disables a `Socket` for receiving. This field is constant.

## SocketShutdown.Send field

```csharp
Send
```

Disables a `Socket` for sending. This field is constant.
