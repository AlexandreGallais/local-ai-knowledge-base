---
title: "WebSockets support in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/websockets.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# WebSockets support in ASP.NET Core

This article explains how to get started with WebSockets in ASP.NET Core. WebSocket (RFC 6455) is a protocol that enables two-way persistent communication channels over TCP connections. It's used in apps that benefit from fast, real-time communication, such as chat, dashboard, and game apps.

View or download sample code (how to download, how to run).

## Http/2 WebSockets support

Using WebSockets over HTTP/2 takes advantage of new features such as:

* Header compression.
* Multiplexing, which reduces the time and resources needed when making multiple requests to the server.

These supported features are available in Kestrel on all HTTP/2 enabled platforms. The version negotiation is automatic in browsers and Kestrel, so no new APIs are needed.

.NET 7 introduced WebSockets over HTTP/2 support for Kestrel, the SignalR JavaScript client, and SignalR with Blazor WebAssembly.

> **Note:**
> HTTP/2 WebSockets use CONNECT requests rather than GET, so your own routes and controllers may need updating.
> For more information, see Add HTTP/2 WebSockets support for existing controllers in this article.
>
> Chrome, Edge, and Firefox (version 128 and later) have HTTP/2 WebSockets enabled by default. You can verify or change this setting in Firefox by opening `about:config` and locating the `network.http.http2.websockets` preference.

WebSockets were originally designed for HTTP/1.1 but have since been adapted to work over HTTP/2. (RFC 8441)

## SignalR

ASP.NET Core SignalR is a library that simplifies adding real-time web functionality to apps. It uses WebSockets whenever possible.

For most applications, we recommend SignalR rather than raw WebSockets. SignalR:

* Provides transport fallback for environments where WebSockets isn't available.
* Provides a basic <example-value> procedure call app model.
* Has no significant performance disadvantage compared to using raw WebSockets in most scenarios.

WebSockets over HTTP/2 is supported for:

* ASP.NET Core SignalR JavaScript client
* ASP.NET Core SignalR with Blazor WebAssembly

For some apps, gRPC on .NET provides an alternative to WebSockets.

## Prerequisites

* Any OS that supports ASP.NET Core:
  * Windows 7 / Windows Server 2008 or later
  * Linux
  * macOS
* If the app runs on Windows with IIS:
  * Windows 8 / Windows Server 2012 or later
  * IIS 8 / IIS 8 Express
  * WebSockets must be enabled. See the IIS/IIS Express support section.
* If the app runs on HTTP.sys:
  * Windows 8 / Windows Server 2012 or later
* For supported browsers, see Can I use.

## Configure the middleware

Add the WebSockets middleware in `Program.cs`:

```csharp
app.UseWebSockets();
```
The following settings can be configured:

* `Microsoft.AspNetCore.Builder.WebSocketOptions.KeepAliveInterval` - How frequently to send "ping" frames to the client to ensure proxies keep the connection open. The default is two minutes.
* `Microsoft.AspNetCore.Builder.WebSocketOptions.KeepAliveTimeout` - How long to wait for a "pong" frame from the client after sending a "ping" frame. If the timeout is exceeded, the WebSocket connection is aborted and `WebSocket.ReceiveAsync` throws an exception. The default is `Timeout.InfiniteTimeSpan` (disabled). For more information, see Handle client disconnects in this article.
* `Microsoft.AspNetCore.Builder.WebSocketOptions.AllowedOrigins` - A list of allowed Origin header values for WebSocket requests. By default, all origins are allowed. For more information, see WebSocket origin restriction in this article.

```csharp
var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

app.UseWebSockets(webSocketOptions);
```
## Accept WebSocket requests

Somewhere later in the request life cycle (later in `Program.cs` or in an action method, for example) check if it's a WebSocket request and accept the WebSocket request.

The following example is from later in `Program.cs`:

```csharp
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/ws")
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await Echo(webSocket);
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
    else
    {
        await next(context);
    }

});
```
A WebSocket request could come in on any URL, but this sample code only accepts requests for `/ws`.

A similar approach can be taken in a controller method:

```csharp
public class WebSocketController : ControllerBase
{
    [Route("/ws")]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            await Echo(webSocket);
        }
        else
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
```
When using a WebSocket, you **must** keep the middleware pipeline running for the duration of the connection. If you attempt to send or receive a WebSocket message after the middleware pipeline ends, you may get an exception like the following:

```
System.Net.WebSockets.WebSocketException (0x80004005): The remote party closed the WebSocket connection without completing the close handshake. ---> System.ObjectDisposedException: Cannot write to the response body, the response has completed.
Object name: 'HttpResponseStream'.
```

If you're using a background service to write data to a WebSocket, make sure you keep the middleware pipeline running. Do this by using a `System.Threading.Tasks.TaskCompletionSource`1`. Pass the `TaskCompletionSource` to your background service and have it call `System.Threading.Tasks.TaskCompletionSource`1.TrySetResult*` when you finish with the WebSocket. Then `await` the `System.Threading.Tasks.TaskCompletionSource`1.Task` property during the request, as shown in the following example:

```csharp
app.Run(async (context) =>
{
    using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
    var socketFinishedTcs = new TaskCompletionSource<object>();

    BackgroundSocketProcessor.AddSocket(webSocket, socketFinishedTcs);

    await socketFinishedTcs.Task;
});
```
The WebSocket closed exception can also happen when returning too soon from an action method. When accepting a socket in an action method, wait for the code that uses the socket to complete before returning from the action method.

Never use `Task.Wait`, `Task.Result`, or similar blocking calls to wait for the socket to complete, as that can cause serious threading issues. Always use `await`.

## Add HTTP/2 WebSockets support for existing controllers

.NET 7 introduced WebSockets over HTTP/2 support for Kestrel, the SignalR JavaScript client, and SignalR with Blazor WebAssembly. HTTP/2 WebSockets use CONNECT requests rather than GET. If you previously used `[HttpGet("/path")]` on your controller action method for Websocket requests, update it to use `[Route("/path")]` instead.

```csharp
public class WebSocketController : ControllerBase
{
    [Route("/ws")]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            await Echo(webSocket);
        }
        else
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
```

### Compression

> **Warning:**
> Enabling compression over encrypted connections can make an app subject to CRIME/BREACH attacks.
> If sending sensitive information, avoid enabling compression or use `WebSocketMessageFlags.DisableCompression` when calling `WebSocket.SendAsync`.
> This applies to both sides of the WebSocket. Note that the WebSockets API in the browser doesn't have configuration for disabling compression per send.

If compression of messages over WebSockets is desired, then the accept code must specify that it allows compression as follows:

```csharp
using (var webSocket = await context.WebSockets.AcceptWebSocketAsync(
    new WebSocketAcceptContext { DangerousEnableCompression = true }))
{

}
```

`WebSocketAcceptContext.ServerMaxWindowBits` and `WebSocketAcceptContext.DisableServerContextTakeover` are advanced options that control how the compression works.

Compression is negotiated between the client and server when first establishing a connection. You can read more about the negotiation in the Compression Extensions for WebSocket RFC.

> **Note:**
> If the compression negotiation isn't accepted by either the server or client, the connection is still established. However, the connection doesn't use compression when sending and receiving messages.

## Send and receive messages

The `AcceptWebSocketAsync` method upgrades the TCP connection to a WebSocket connection and provides a `System.Net.WebSockets.WebSocket` object. Use the `WebSocket` object to send and receive messages.

The code shown earlier that accepts the WebSocket request passes the `WebSocket` object to an `Echo` method. The code receives a message and immediately sends back the same message. Messages are sent and received in a loop until the client closes the connection:

```csharp
private static async Task Echo(WebSocket webSocket)
{
    var buffer = new byte[1024 * 4];
    var receiveResult = await webSocket.ReceiveAsync(
        new ArraySegment<byte>(buffer), CancellationToken.None);

    while (!receiveResult.CloseStatus.HasValue)
    {
        await webSocket.SendAsync(
            new ArraySegment<byte>(buffer, 0, receiveResult.Count),
            receiveResult.MessageType,
            receiveResult.EndOfMessage,
            CancellationToken.None);

        receiveResult = await webSocket.ReceiveAsync(
            new ArraySegment<byte>(buffer), CancellationToken.None);
    }

    await webSocket.CloseAsync(
        receiveResult.CloseStatus.Value,
        receiveResult.CloseStatusDescription,
        CancellationToken.None);
}
```
When accepting the WebSocket connection before beginning the loop, the middleware pipeline ends. Upon closing the socket, the pipeline unwinds. That is, the request stops moving forward in the pipeline when the WebSocket is accepted. When the loop is finished and the socket is closed, the request proceeds back up the pipeline.

## Handle client disconnects

The server isn't automatically informed when the client disconnects due to loss of connectivity. The server receives a disconnect message only if the client sends it, which can't be done if the internet connection is lost. If you want to take some action when that happens, set a timeout after nothing is received from the client within a certain time window.

If the client isn't always sending messages and you don't want to time out just because the connection goes idle, have the client use a timer to send a ping message every X seconds. On the server, if a message hasn't arrived within 2\*X seconds after the previous one, terminate the connection and report that the client disconnected. Wait for twice the expected time interval to leave extra time for network delays that might hold up the ping message.

### Keep-alive timeout

The WebSockets middleware can be configured with a keep-alive timeout. The keep-alive timeout aborts the WebSocket connection and throws an exception from `WebSocket.ReceiveAsync` if both of the following conditions are met:

* The server sends a ping frame using the WebSocket protocol.
* The client doesn't reply with a pong frame within the specified timeout.

The server automatically sends the ping frame and configures its frequency with `Microsoft.AspNetCore.Builder.WebSocketOptions.KeepAliveInterval`.

The keep-alive timeout setting is useful for detecting connections that might be slow or ungracefully disconnected. The default is `Timeout.InfiniteTimeSpan`, which disables the timeout.

The keep-alive timeout can be configured globally for the WebSocket middleware:

```csharp
app.UseWebSockets(new WebSocketOptions { KeepAliveTimeout = TimeSpan.FromSeconds(15) });
```
Or configured per accepted WebSocket:

```csharp
using var webSocket = await context.WebSockets.AcceptWebSocketAsync(
    new WebSocketAcceptContext { KeepAliveTimeout = TimeSpan.FromSeconds(15) });
```
