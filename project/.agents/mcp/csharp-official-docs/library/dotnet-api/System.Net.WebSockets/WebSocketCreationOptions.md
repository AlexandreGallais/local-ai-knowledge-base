---
title: "WebSocketCreationOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketCreationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketCreationOptions class

Namespace: `System.Net.WebSockets`

```csharp
public sealed class WebSocketCreationOptions
```

Options that control how a `WebSocket` is created.

To be added.

## WebSocketCreationOptions.WebSocketCreationOptions() constructor

```csharp
public WebSocketCreationOptions ();
```

Creates an instance of the `WebSocketCreationOptions` class.

To be added.

## WebSocketCreationOptions.DangerousDeflateOptions property

```csharp
public System.Net.WebSockets.WebSocketDeflateOptions? DangerousDeflateOptions { get; set; }
```

Gets or sets the agreed upon options for per message deflate.

Returns: The agreed upon options for per message deflate.

Enabling compression makes the application subject to CRIME/BREACH type of attacks. It's strongly advised to turn off compression when sending data containing secrets by specifying `WebSocketMessageFlags.DisableCompression` flag for such messages.

## WebSocketCreationOptions.IsServer property

```csharp
public bool IsServer { get; set; }
```

Defines if this websocket is the server-side of the connection. The default value is `false`.

Returns: To be added.

To be added.

## WebSocketCreationOptions.KeepAliveInterval property

```csharp
public TimeSpan KeepAliveInterval { get; set; }
```

Gets or sets the keep-alive interval to use, or `TimeSpan.Zero` or `Timeout.InfiniteTimeSpan` to disable keep-alives.

Returns: The keep-alive interval to use, or `TimeSpan.Zero` or `Timeout.InfiniteTimeSpan` to disable keep-alives. The default is `TimeSpan.Zero`.

To be added.

## WebSocketCreationOptions.KeepAliveTimeout property

```csharp
public TimeSpan KeepAliveTimeout { get; set; }
```

The timeout to use when waiting for the peer's PONG in response to us sending a PING; or `TimeSpan.Zero` or `Timeout.InfiniteTimeSpan` to disable waiting for peer's response, and use an unsolicited PONG as a Keep-Alive heartbeat instead.

The default is `Timeout.InfiniteTimeSpan`.

Returns: To be added.

To be added.

## WebSocketCreationOptions.SubProtocol property

```csharp
public string? SubProtocol { get; set; }
```

Gets or sets the agreed upon sub-protocol that was used when creating the connection.

Returns: To be added.

To be added.
