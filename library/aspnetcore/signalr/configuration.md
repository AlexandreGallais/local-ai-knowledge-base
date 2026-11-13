---
title: "ASP.NET Core SignalR configuration (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR configuration

This article describes how to configure client and server options for ASP.NET Core SignalR.

For Blazor SignalR guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor SignalR guidance.

## Configure serialization for encoding messages

ASP.NET Core SignalR supports two protocols for encoding messages: JSON and MessagePack. Each protocol has serialization configuration options.

### JSON serialization options

JSON serialization can be configured on the server by using the `Microsoft.Extensions.DependencyInjection.JsonProtocolDependencyInjectionExtensions.AddJsonProtocol*` extension method. `AddJsonProtocol` can be added after the `Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR*` method in `Startup.ConfigureServices`. The `AddJsonProtocol` method takes a delegate that receives an `options` object. The `Microsoft.AspNetCore.SignalR.JsonHubProtocolOptions.PayloadSerializerOptions` property on that object is a `System.Text.Json` `System.Text.Json.JsonSerializerOptions` object that can be used to configure serialization of arguments and return values. For more information, see the System.Text.Json documentation.

For example, to configure the serializer to not change the casing of property names, rather than the default camel case names, use the following code in the _Program.cs_ file:

```csharp
builder.Services.AddSignalR()
    .AddJsonProtocol(options => {
        options.PayloadSerializerOptions.PropertyNamingPolicy = null;
    });
```

In the .NET client, the same `AddJsonProtocol` extension method exists on `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. The `Microsoft.Extensions.DependencyInjection` namespace must be imported to resolve the extension method:

```csharp
// At the top of the file:
using Microsoft.Extensions.DependencyInjection;

// When constructing your connection:
var connection = new HubConnectionBuilder()
    .AddJsonProtocol(options => {
        options.PayloadSerializerOptions.PropertyNamingPolicy = null;
    })
    .Build();
```

> **Note:**
> It's not possible to configure JSON serialization in the JavaScript client at this time.

#### Switch to Newtonsoft.Json

If your app requires features in the Newtonsoft.Json package that aren't supported in `System.Text.Json`, see Switch to Newtonsoft.Json.

### MessagePack serialization options

MessagePack serialization can be configured by providing a delegate to the `Microsoft.Extensions.DependencyInjection.MsgPackProtocolDependencyInjectionExtensions.AddMessagePackProtocol*` call. For more information, see MessagePack in SignalR.

> **Note:**
> It's not possible to configure MessagePack serialization in the JavaScript client at this time.

## Configure server options

The following table describes options for configuring SignalR hubs.

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `ClientTimeoutInterval` | 30 seconds | The server considers the client disconnected if it doesn't receive a message (including keep-alive) within this interval. It can take longer than this timeout interval for the client to be marked disconnected due to how this feature is implemented. The recommended value is double the `KeepAliveInterval` value. |
| `HandshakeTimeout` | 15 seconds | If the client doesn't send an initial handshake message within this time interval, the connection is closed. This option is an advanced setting that should only be modified if handshake timeout errors are occurring due to severe network latency. For more detail on the handshake process, see the SignalR Hub Protocol Specification. |
| `KeepAliveInterval` | 15 seconds | The interval at which a ping message is automatically sent to keep the connection open. When you change the `KeepAliveInterval` value, change the `ServerTimeout` or `serverTimeoutInMilliseconds` setting on the client. The recommended `ServerTimeout` or `serverTimeoutInMilliseconds` value is double the `KeepAliveInterval` value. |
| `SupportedProtocols` | All installed protocols | Protocols supported by this hub. By default, all protocols registered on the server are allowed. Protocols can be removed from this list to disable specific protocols for individual hubs. |
| `EnableDetailedErrors` | `false` | When this option is enabled (`true`), detailed exception messages are returned to clients when an exception is thrown in a hub method. The default is `false` because these exception messages can contain sensitive information. |
| `StreamBufferCapacity` | 10 | The maximum number of items that can be buffered for client upload streams. When this limit is reached, the processing of invocations is blocked until the server processes stream items. |
| `MaximumReceiveMessageSize` | 32 KB | The maximum size of a single incoming hub message. Increasing the value might increase the risk of Denial of service (DoS) attacks. |
| `MaximumParallelInvocationsPerClient` | 1 | The maximum number of hub methods that each client can call in parallel before queueing. Note that this limit doesn't apply to streaming hub invocations. For more information, see Use hubs in ASP.NET Core SignalR.|
| `DisableImplicitFromServicesParameters` | `false` | Hub method arguments are resolved from dependency injection, if possible. |
| `StatefulReconnectBufferSize` | 100,000 bytes | The maximum number of bytes buffered per connection when stateful reconnect is enabled. This option has no effect unless `AllowStatefulReconnects` is enabled on the hub endpoint. For more information, see Configure stateful reconnect. |

Options can be configured for all hubs by providing an options delegate to the `AddSignalR` call in the _Program.cs_ file.

```csharp
 builder.Services.AddSignalR(hubOptions =>
 {
     hubOptions.EnableDetailedErrors = true;
     hubOptions.KeepAliveInterval = TimeSpan.FromMinutes(1);
 });
```

Options for a single hub override the global options provided in `AddSignalR` and can be configured by using the `Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddHubOptions*` method:

```csharp
builder.Services.AddSignalR().AddHubOptions<ChatHub>(options =>
{
    options.EnableDetailedErrors = true;
});
```

### Implications of increasing or disabling `MaximumReceiveMessageSize`

The default `MaximumReceiveMessageSize` is 32 KB (32,768 bytes). If a client sends a message exceeding this limit, an error is logged and the connection is aborted.

When increasing this limit or setting it to `null` (unlimited), consider the following security and performance implications:

* **Memory consumption and DoS vulnerability**: Each incoming message is buffered in memory by the server before and during deserialization. If multiple clients send large payloads concurrently (or a malicious client floods the hub with oversized messages), server memory can quickly become exhausted. This can lead to heavy Garbage Collection (GC) pauses, thread starvation, or `OutOfMemoryException` crashes.
* **Hub authorization does not eliminate the risk**: While applying `[Authorize]` prevents unauthenticated callers from invoking hub methods, authenticated accounts can still cause denial-of-service issues if message limits are removed or set excessively high.
* **Large payload recommendation**: Avoid sending large files, binary streams, or oversized JSON documents over hub method invocations. Instead, upload large payloads to dedicated HTTP endpoints (such as Minimal APIs or controller actions with streaming support) or directly to cloud blob storage, and transmit only references, IDs, or lightweight notifications across the SignalR hub.
* **Scope limits per hub**: When larger messages are necessary for a specific hub, configure `MaximumReceiveMessageSize` on that specific hub using `AddHubOptions<THub>` rather than modifying it globally across all hubs.

### Configure advanced HTTP options

Use `HttpConnectionDispatcherOptions` to configure advanced settings related to transports and memory buffer management. These options are configured by passing a delegate to the `Microsoft.AspNetCore.Builder.HubEndpointRouteBuilderExtensions.MapHub*` method in `Program.cs`.

```csharp
using Microsoft.AspNetCore.Http.Connections;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddSignalR();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();
app.MapHub<ChatHub>("/chathub", options =>
{
    options.Transports =
        HttpTransportType.WebSockets |
        HttpTransportType.LongPolling;
}
);
app.Run();
```

The following table describes options for configuring ASP.NET Core SignalR's advanced HTTP options.

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `ApplicationMaxBufferSize` | 64 KB | The maximum number of bytes received from the client that the server buffers before applying backpressure. Increasing this value allows the server to receive larger messages faster without applying backpressure, but can increase memory consumption. |
| `TransportMaxBufferSize` | 64 KB | The maximum number of bytes sent by the app that the server buffers before observing backpressure. Increasing this value allows the server to buffer larger messages faster without awaiting backpressure, but can increase memory consumption. |
| `AuthorizationData` | Data automatically gathered from the `Authorize` attributes applied to the Hub class. | A list of `Microsoft.AspNetCore.Authorization.IAuthorizeData` objects used to determine if a client is authorized to connect to the hub. |
| `Transports` | All Transports are enabled. | A bit flags enum of `HttpTransportType` values that can restrict the transports a client can use to connect. |
| `LongPolling` | See Configure Long Polling transport | Options specific to the Long Polling transport. |
| `WebSockets` | See Configure WebSocket transport | Options specific to the WebSockets transport. |
| `MinimumProtocolVersion` | 0 | The minimum version of the negotiation protocol. This value is used to limit clients to newer versions of the protocol. |
| `TransportSendTimeout` | 10 seconds | The maximum amount of time the transport waits for a single send to a client to complete. If a send exceeds this timeout, the connection is closed. Increase this value for clients on slow or unreliable networks that would otherwise be disconnected while a large message is being sent. Setting the value to `TimeSpan.Zero` throws an `System.ArgumentOutOfRangeException`. |
| `CloseOnAuthenticationExpiration` | `false` | Controls authentication expiration tracking, which closes connections when a token expires. |
| `AllowStatefulReconnects` | `false` | Allows a client that negotiates stateful reconnect to resume a connection with the same connection ID after a temporary network interruption. For more information, see Configure stateful reconnect. |

The following advanced HTTP options configure SignalR *authentication refresh*, introduced in .NET 11. Authentication refresh lets a connected client update its authentication credentials without reconnecting. For more information, see SignalR authentication and authorization.

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `EnableAuthenticationRefresh` | `false` | Enables authentication refresh for connections. Enable it together with `CloseOnAuthenticationExpiration` so that connections that aren't refreshed before their token expires are closed. |
| `MaximumAuthenticationExpiration` | `null` | Caps how far in the future a refreshed token's expiration can be set, relative to the time of the refresh. Setting it also gives tokens that have no expiration a known lifetime, which enables automatic refresh. The value must be greater than zero and doesn't apply to Windows authentication. |
| `OnAuthenticationRefresh` | `null` | An optional `Func<AuthenticationRefreshContext, Task<bool>>` callback invoked on each refresh attempt. Return `false` to reject the refresh, which causes the `/refresh` request to fail with an HTTP 403 response. This check runs in addition to the built-in requirement that the refreshed principal map to the same SignalR user. |

#### Configure Long Polling transport

The Long Polling transport has other options that can be configured by using the `LongPolling` property:

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `PollTimeout` | 90 seconds | The maximum amount of time the server waits for a message to send to the client before terminating a single poll request. Decreasing this value causes the client to issue new poll requests more frequently. |

#### Configure WebSocket transport

The WebSocket transport has other options that can be configured by using the `WebSockets` property:

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `CloseTimeout` | 5 seconds | After the server closes, if the client fails to close within this time interval, the connection is terminated. |
| `SubProtocolSelector` | `null` | A delegate that can be used to set the `Sec-WebSocket-Protocol` header to a custom value. The delegate receives the values requested by the client as input and is expected to return the desired value. |
