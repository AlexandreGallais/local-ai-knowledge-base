---
title: "ASP.NET Core SignalR configuration (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR configuration (part 3 of 3)

### Configure stateful reconnect

SignalR _stateful reconnect_ reduces the perceived downtime of clients that have a temporary disconnect in their network connection, such as when switching network connections or a short temporary loss in access.

Stateful reconnect achieves the perceived downtime by:

* Temporarily buffering data on the server and client.
* Acknowledging messages received (ACK-ing) by both the server and client.
* Recognizing when a connection is up and replaying messages that might be sent while the connection is down.

Stateful reconnect is available in .NET 8 or later.

#### Enable stateful reconnect

You can opt in to stateful reconnect at both the server hub endpoint and the client.

* On the server hub endpoint, update the configuration to enable the `AllowStatefulReconnects` option:

   ```csharp
   app.MapHub<MyHub>("/hubName", options =>
   {
      options.AllowStatefulReconnects = true;
   });
   ```

   Optionally, the maximum buffer size in bytes allowed by the server can be set globally or for a specific hub with the `StatefulReconnectBufferSize` option.

   - Set the `StatefulReconnectBufferSize` option globally:

      ```csharp
      builder.AddSignalR(o => o.StatefulReconnectBufferSize = 1000);
      ```

   - Set the `StatefulReconnectBufferSize` option for a specific hub:

      ```csharp
      builder.AddSignalR().AddHubOptions<MyHub>(o => o.StatefulReconnectBufferSize = 1000);
      ```

   The `StatefulReconnectBufferSize` setting is optional with a default size of 100,000 bytes.

* On the client, update the JavaScript or TypeScript code to enable the `withStatefulReconnect` option:

   ```javascript
   const builder = new signalR.HubConnectionBuilder()
      .withUrl("/hubname")
      .withStatefulReconnect({ bufferSize: 1000 });  // Optional, defaults to 100,000
   const connection = builder.build();
   ```

   The `bufferSize` setting is optional with a default size of 100,000 bytes.

* On the .NET client, update the code to enable the `WithStatefulReconnect` option:

   ```csharp
   var builder = new HubConnectionBuilder()
      .WithUrl("<hub url>")
      .WithStatefulReconnect();
   builder.Services.Configure<HubConnectionOptions>(o => o.StatefulReconnectBufferSize = 1000);
   var hubConnection = builder.Build();
   ```

   The `StatefulReconnectBufferSize` setting is optional with a default size of 100,000 bytes.

### Configure other options

You can configure other options in the `WithUrl` (`withUrl` in JavaScript) method on `HubConnectionBuilder` or on the various configuration APIs on the `HttpHubConnectionBuilder` in the Java client.

# .NET

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `AccessTokenProvider` | `null` | A function that returns a string, which is provided as a Bearer authentication token in HTTP requests. |
| `SkipNegotiation` | `false` | Set this option to `true` to skip the negotiation step. **Note**: This option is available only when the WebSockets transport is the only enabled transport. The setting can't be enabled when using the Azure SignalR Service. |
| `ClientCertificates` | Empty | A collection of Transport Layer Security (TLS) certificates to send to authenticate requests. |
| `Cookies` | Empty | A collection of HTTP cookies to send with every HTTP request. |
| `Credentials` | Empty | The credentials to send with every HTTP request. |
| `CloseTimeout` | 5 seconds | The maximum amount of time the client waits after closing for the server to acknowledge the close request. If the server doesn't acknowledge the close within this time, the client disconnects. **Note**: This setting is available for WebSockets only. |
| `Headers` | Empty | A map of other HTTP headers to send with every HTTP request. |
| `HttpMessageHandlerFactory` | `null` | A delegate that can be used to configure or replace the `HttpMessageHandler` used to send HTTP requests. This delegate must return a non-null value, and it receives the default value as a parameter. You can either modify settings on that default value and return it, or return a new `HttpMessageHandler` instance. **Note**:  - When you replace the handler, be sure to copy the settings you want to keep from the provided handler. Otherwise, the configured options (such as Cookies and Headers) don't apply to the new handler.  - This setting isn't used for WebSocket connections. |
| `Proxy` | `null` | An HTTP proxy to use when sending HTTP requests. |
| `UseDefaultCredentials` | `false` | Set this boolean to send the default credentials for HTTP and WebSockets requests. This option enables the use of Windows authentication. |
| `WebSocketConfiguration` | `null` | A delegate that can be used to configure more WebSocket options. Receives an instance of `System.Net.WebSockets.ClientWebSocketOptions` that can be used to configure the options. |
| `WebSocketFactory` | `null` | A delegate that wraps or replaces the `System.Net.WebSockets.WebSocket` used by the WebSockets transport. The delegate receives a `WebSocketConnectionContext`, which exposes the resolved connection `Uri` and the `HttpConnectionOptions`, plus a `System.Threading.CancellationToken`, and it must return a connected `WebSocket`. **Note**:  - When this delegate is set, it replaces the client's default socket creation, so the delegate is responsible for connecting the socket and for applying any options it needs, such as `WebSocketConfiguration`, `Headers`, and `Cookies`.  - Returning `null` from the delegate throws an `System.InvalidOperationException`. |
| `ApplicationMaxBufferSize` | 1 MB | The maximum number of bytes received from the server that the client buffers before applying backpressure. Increasing this value allows the client to receive larger messages faster without applying backpressure, but can increase memory consumption. |
| `TransportMaxBufferSize` | 1 MB | The maximum number of bytes sent by the user application that the client buffers before observing backpressure. Increasing this value allows the client to buffer larger messages faster without awaiting backpressure, but can increase memory consumption. |

In the .NET client, these options can be modified in the options delegate provided to `WithUrl`:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chathub", options => {
        options.Headers["Foo"] = "Bar";
        options.SkipNegotiation = true;
        options.Transports = HttpTransportType.WebSockets;
        options.Cookies.Add(new Cookie(/* ... */);
        options.ClientCertificates.Add(/* ... */);
    })
    .Build();
```

# JavaScript

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `accessTokenFactory` | `null` | A function that returns a string, which is provided as a Bearer authentication token in HTTP requests. |
| `transport` | `null` | An `Microsoft.AspNetCore.Http.Connections.HttpTransportType` value specifying the transport to use for the connection. |
| `headers` | `null` | A dictionary of headers sent with every HTTP request. **Note**: Sending headers in the browser doesn't work for WebSockets or the `Microsoft.AspNetCore.Http.Connections.HttpTransportType#microsoft-aspnetcore-http-connections-httptransporttype-serversenteventsstream` stream. |
| `logMessageContent` | `null` | Set this option to `true` to log the bytes/chars of messages sent and received by the client. |
| `skipNegotiation` | `false` | Set this option to `true` to skip the negotiation step. **Note**: This option is available only when the WebSockets transport is the only enabled transport. The setting can't be enabled when using the Azure SignalR Service. |
| `withCredentials` | `true` | Specifies whether credentials are sent with the CORS request. Azure App Service uses cookies for sticky sessions and needs this option enabled to work correctly. For more information on CORS with SignalR, see Security considerations in ASP.NET Core SignalR. |
| `timeout` | `100,000` | The timeout value in milliseconds to apply to HTTP requests. **Note**: This option doesn't apply to Long Polling poll requests, EventSource, or WebSockets. |
| `httpClient` | `null` | An `HttpClient` used to make HTTP requests. Provide a custom implementation to inspect or customize the requests made during negotiation and by the Long Polling and Server-Sent Events transports. **Note**: This setting isn't used for WebSocket connections. |

In the JavaScript Client, these options can be provided in a JavaScript object provided to `withUrl`:

```javascript
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub", {
        // "Foo: Bar" will not be sent with WebSockets or Server-Sent Events requests
        headers: { "Foo": "Bar" },
        transport: signalR.HttpTransportType.LongPolling 
    })
    .build();
```

# Java

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `withAccessTokenProvider` | `null` | A function that returns a string, which is provided as a Bearer authentication token in HTTP requests. |
| `shouldSkipNegotiate` | `false` | Set this option to `true` to skip the negotiation step. **Note**: This option is available only when the WebSockets transport is the only enabled transport. The setting can't be enabled when using the Azure SignalR Service. |
| `withHeader` `withHeaders` | Empty | A map of other HTTP headers to send with every HTTP request. |
| `setHttpClientBuilderCallback` | `null` | A callback that receives the `OkHttpClient.Builder` used to construct the HTTP client. Use it for customization such as certificate validation, proxies, and cookies. By default, the client is built with a cookie jar and a read timeout for Long Polling. |

In the Java client, these options can be configured with the methods on the `HttpHubConnectionBuilder` returned from the `HubConnectionBuilder.create("HUB URL")`:

```java
HubConnection hubConnection = HubConnectionBuilder.create("https://example.com/chathub")
        .withHeader("Foo", "Bar")
        .shouldSkipNegotiate(true)
        .withHandshakeResponseTimeout(30*1000)
        .build();
```

---

## Related content

* Get started with ASP.NET Core SignalR
* Use hubs in ASP.NET Core SignalR
* ASP.NET Core SignalR JavaScript client
* ASP.NET Core SignalR .NET client
* Use MessagePack Hub Protocol in SignalR for ASP.NET Core
* ASP.NET Core SignalR supported platforms
