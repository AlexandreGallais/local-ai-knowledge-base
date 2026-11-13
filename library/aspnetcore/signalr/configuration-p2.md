---
title: "ASP.NET Core SignalR configuration (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR configuration (part 2 of 3)

## Configure client options

In the .NET client and JavaScript client, the client options are configured on the `HubConnectionBuilder` type. In the Java client, the options are configured on the `HttpHubConnectionBuilder` subclass, which contains the builder configuration options and the `HubConnection` itself.

### Configure logging

Logging is configured in the .NET client by using the `ConfigureLogging` method. Logging providers and filters can be registered in the same way as they are on the server. For more information, see the Logging in ASP.NET Core documentation.

> **Note:**
> To register logging providers, you must install the necessary packages. For more information, see the full list of Built-in logging providers.

For example, to enable Console logging, install the `Microsoft.Extensions.Logging.Console` NuGet package. Call the `AddConsole` extension method:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chathub")
    .ConfigureLogging(logging => {
        logging.SetMinimumLevel(LogLevel.Information);
        logging.AddConsole();
    })
    .Build();
```

In the JavaScript client, a similar `configureLogging` method exists. Provide a `LogLevel` value as the minimum level of log messages to produce. Logs are written to the browser console window.

```javascript
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
```

Instead of a `LogLevel` value, you can also provide a `string` value that represents a log level name. This approach is useful when configuring SignalR logging in environments where you don't have access to the `LogLevel` constants.

```javascript
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .configureLogging("warn")
    .build();
```

The following table lists the available log levels. The value you provide to `configureLogging` sets the **minimum** log level for logging. Messages logged at this level, **or the levels listed after it in the table**, are logged.

| String                      | LogLevel               |
| --------------------------- | ---------------------- |
| `trace`                     | `LogLevel.Trace`       |
| `debug`                     | `LogLevel.Debug`       |
| `info` **or** `information` | `LogLevel.Information` |
| `warn` **or** `warning`     | `LogLevel.Warning`     |
| `error`                     | `LogLevel.Error`       |
| `critical`                  | `LogLevel.Critical`    |
| `none`                      | `LogLevel.None`        |

> **Note:**
> To disable logging entirely, specify `signalR.LogLevel.None` in the `configureLogging` method.

For more information on logging, see Logging and diagnostics in ASP.NET Core SignalR.

The SignalR Java client uses the Simple Logging Facade for Java (SLF4J) library for logging. It's a high-level logging API that allows users of the library to choose their own specific logging implementation by bringing in a specific logging dependency. The following code snippet shows how to use `java.util.logging` with the SignalR Java client.

```gradle
implementation 'org.slf4j:slf4j-jdk14:1.7.25'
```

If you don't configure logging in your dependencies, SLF4J loads a default no-operation logger with the following warning message:

```output
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
```

You can safely ignore this message.

### Configure allowed transports

The transports used by SignalR can be configured in the `WithUrl` call (`withUrl` in JavaScript). A bitwise-OR of the values of `HttpTransportType` can be used to restrict the client to only use the specified transports. All transports are enabled by default.

For example, to disable the Server-Sent Events transport, but allow WebSockets and Long Polling connections:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chathub", HttpTransportType.WebSockets | HttpTransportType.LongPolling)
    .Build();
```

In the JavaScript client, transports are configured by setting the `transport` field on the options object provided to `withUrl`:

```javascript
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub", { transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling })
    .build();
```

In this version of the Java client, WebSockets is the only available transport.

In the Java client, the transport is selected by using the `withTransport` method on the `HttpHubConnectionBuilder`. The Java client defaults to using the WebSockets transport.

```java
HubConnection hubConnection = HubConnectionBuilder.create("https://example.com/chathub")
    .withTransport(TransportEnum.WEBSOCKETS)
    .build();
```

> **Note:**
> The SignalR Java client doesn't currently support transport fallback.

### Configure bearer authentication

To provide authentication data along with SignalR requests, use the `AccessTokenProvider` option (`accessTokenFactory` in JavaScript) to specify a function that returns the desired access token. In the .NET client, this access token is passed in as an HTTP "Bearer Authentication" token (using the `Authorization` header with a type of `Bearer`). In the JavaScript client, the access token is used as a Bearer token, **except** in a few cases where browser APIs restrict the ability to apply headers (specifically, in Server-Sent Events and WebSockets requests). In these cases, the access token is provided as a query string value `access_token`.

In the .NET client, the `AccessTokenProvider` option can be specified by using the options delegate in `WithUrl`:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chathub", options => {
        options.AccessTokenProvider = async () => {
            // Get and return the access token.
        };
    })
    .Build();
```

In the JavaScript client, the access token is configured by setting the `accessTokenFactory` field on the options object in `withUrl`:

```javascript
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub", {
        accessTokenFactory: () => {
            // Get and return the access token.
            // This function can return a JavaScript Promise if asynchronous
            // logic is required to retrieve the access token.
        }
    })
    .build();
```

In the SignalR Java client, you can configure a bearer token to use for authentication by supplying an access token provider to the HttpHubConnectionBuilder. Use withAccessTokenProvider) to provide an RxJava Single\<String>. With a call to Single.defer, you can write logic to produce access tokens for your client.

```java
HubConnection hubConnection = HubConnectionBuilder.create("https://example.com/chathub")
    .withAccessTokenProvider(Single.defer(() -> {
        // Your logic here.
        return Single.just("An Access Token");
    })).build();
```

### Configure timeout and keep-alive options

This section describes other options for configuring timeout and keep-alive behavior.

# .NET

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `WithServerTimeout` | 30 seconds (30,000 milliseconds) | The timeout value for server activity, which is set directly on the `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. If the server doesn't send a message within this interval, the client considers the server disconnected and triggers the `Closed` event (`onclose` in JavaScript). This value must be large enough for a ping message to be sent from the server **and** received by the client within the timeout interval. The recommended value is a number at least double the server's keep-alive interval (`WithKeepAliveInterval`) value to allow time for pings to arrive. |
| `HandshakeTimeout` | 15 seconds | The timeout value for the initial server handshake, which is available on the `HubConnection` object itself. If the server doesn't send a handshake response within this interval, the client cancels the handshake and triggers the `Closed` event (`onclose` in JavaScript). This option is an advanced setting that should be modified only if handshake timeout errors are occurring due to severe network latency. For more detail on the handshake process, see the SignalR Hub Protocol Specification. |
| `WithKeepAliveInterval` | 15 seconds | This value determines the interval at which the client sends ping messages and is set directly on the `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. This setting allows the server to detect hard disconnects, such as when a client unplugs their computer from the network. Sending any message from the client resets the timer to the start of the interval. If the client doesn't send a message within the `ClientTimeoutInterval` set on the server, the server considers the client disconnected. |

In the .NET client, timeout values are specified as `TimeSpan` values.

The following example shows values that are double the default values:

```csharp
var builder = new HubConnectionBuilder()
    .WithUrl(Navigation.ToAbsoluteUri("/chathub"))
    .WithServerTimeout(TimeSpan.FromSeconds(60))
    .WithKeepAliveInterval(TimeSpan.FromSeconds(30))
    .Build();

builder.On<string, string>("ReceiveMessage", (user, message) => ...

await builder.StartAsync();
```

# JavaScript

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `withServerTimeout` | 30 seconds (30,000 milliseconds) | The timeout value for server activity, which is set directly on the `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. If the server doesn't send a message within this interval, the client considers the server disconnected and triggers the `onclose` event. This setting allows the server to detect hard disconnects, such as when a client unplugs their computer from the network. This value must be large enough for a ping message to be sent from the server **and** received by the client within the timeout interval. The recommended value is a number at least double the server's keep-alive interval (`withKeepAliveInterval`) value to allow time for pings to arrive. |
| `withKeepAliveInterval` | 15 seconds (15,000 milliseconds) | This value determines the interval at which the client sends ping messages and is set directly on `Microsoft.AspNetCore.SignalR.Client.HubConnectionBuilder`. This setting allows the server to detect hard disconnects, such as when a client unplugs their computer from the network. Sending any message from the client resets the timer to the start of the interval. If the client doesn't send a message within the `ClientTimeoutInterval` set on the server, the server considers the client disconnected. The ping occurs at most as often as the server pings. If the server pings every five seconds, assigning a value lower than `5000` (5 seconds) pings every five seconds. The default value is 15 seconds. The keep-alive interval should be less than or equal to half the value assigned to the server timeout (`withServerTimeout`). |

The following example shows values that are double the default values:

```javascript
var connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .withServerTimeout(60000)
  .withKeepAliveInterval(30000)
  .build();
```

# Java

| Option | Default value | Description |
| ------ | ------------- | ----------- |
| `getServerTimeout` / `setServerTimeout` | 30 seconds (30,000 milliseconds) | The timeout value for server activity. If the server doesn't send a message within this interval, the client considers the server disconnected and triggers the `onClose` event. This value must be large enough for a ping message to be sent from the server **and** received by the client within the timeout interval. The recommended value is a number at least double the server's `KeepAliveInterval` value to allow time for pings to arrive. |
| `withHandshakeResponseTimeout` | 15 seconds | The timeout value for the initial server handshake. If the server doesn't send a handshake response within this interval, the client cancels the handshake and triggers the `onClose` event. This option is an advanced setting that should be modified only if handshake timeout errors are occurring due to severe network latency. For more detail on the Handshake process, see the SignalR Hub Protocol Specification. |
| `getKeepAliveInterval` / `setKeepAliveInterval` | 15 seconds (15,000 milliseconds) | This value determines the interval at which the client sends ping messages. Sending any message from the client resets the timer to the start of the interval. If the client doesn't send a message within the `ClientTimeoutInterval` set on the server, the server considers the client disconnected. |

---
