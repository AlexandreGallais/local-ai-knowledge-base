---
title: "SocketsHttpConnectionContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/SocketsHttpConnectionContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketsHttpConnectionContext class

Namespace: `System.Net.Http`

```csharp
public sealed class SocketsHttpConnectionContext
```

Represents the context passed to the `SocketsHttpHandler.ConnectCallback` for a `SocketsHttpHandler` instance. .

To be added.

## SocketsHttpConnectionContext.ConnectionId property

```csharp
public long ConnectionId { get; }
```

To be added.

Returns: To be added.

To be added.

## SocketsHttpConnectionContext.DnsEndPoint property

```csharp
public System.Net.DnsEndPoint DnsEndPoint { get; }
```

Gets the DNS endpoint to be used by the `SocketsHttpHandler.ConnectCallback` to establish the connection.

Returns: To be added.

To be added.

## SocketsHttpConnectionContext.InitialRequestMessage property

```csharp
public System.Net.Http.HttpRequestMessage InitialRequestMessage { get; }
```

Gets the initial HttpRequestMessage that is causing the connection to be created.

Returns: The request message that's causing the connection to be created.

To be added.
