---
title: "websockets-keep-alive-timeout"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9/includes/websockets-keep-alive-timeout.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# websockets-keep-alive-timeout

### Keep-Alive Timeout for WebSockets

The WebSockets middleware can now be configured for keep-alive timeouts.

The keep-alive timeout aborts the WebSocket connection and throws an exception from `WebSocket.ReceiveAsync` if both of the following conditions are met:

* The server sends a ping frame using the websocket protocol.
* The client doesn't reply with a pong frame within the specified timeout.

The server automatically sends the ping frame and configures it with `KeepAliveInterval`.

The keep-alive timeout setting is useful for detecting connections that might be slow or ungracefully disconnected.

The keep-alive timeout can be configured globally for the WebSocket middleware:

```csharp
app.UseWebSockets(new WebSocketOptions { KeepAliveTimeout = TimeSpan.FromSeconds(15) });
```

Alternatively, configure the timeout per accepted WebSocket:

```csharp
app.Run(async (context) =>
{
    using var webSocket = await context.WebSockets.AcceptWebSocketAsync(
        new WebSocketAcceptContext { KeepAliveTimeout = TimeSpan.FromSeconds(15) });

    // ...
});
```

For more information, see WebSockets support in ASP.NET Core.
