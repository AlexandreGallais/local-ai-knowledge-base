---
title: "ClientWebSocketOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/ClientWebSocketOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClientWebSocketOptions class

Namespace: `System.Net.WebSockets`

```csharp
public sealed class ClientWebSocketOptions
```

Options to use with a  `ClientWebSocket` object.

To be added.

## ClientWebSocketOptions.ClientCertificates property

```csharp
public System.Security.Cryptography.X509Certificates.X509CertificateCollection ClientCertificates { get; set; }
```

Gets or sets a collection of client side certificates.

Returns: A collection of client side certificates.

To be added.

## ClientWebSocketOptions.CollectHttpResponseDetails property

```csharp
public bool CollectHttpResponseDetails { get; set; }
```

Gets or sets a value that indicates whether `ClientWebSocket.HttpStatusCode` and `ClientWebSocket.HttpResponseHeaders` should be set when establishing the connection.

Returns: To be added.

To be added.

## ClientWebSocketOptions.Cookies property

```csharp
public System.Net.CookieContainer? Cookies { get; set; }
```

Gets or sets the cookies associated with the request.

Returns: The cookies associated with the request.

To be added.

## ClientWebSocketOptions.Credentials <example-value>

```csharp
public System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets the credential <example-value> for the client.

Returns: The credential <example-value> for the client.

To be added.

## ClientWebSocketOptions.DangerousDeflateOptions property

```csharp
public System.Net.WebSockets.WebSocketDeflateOptions? DangerousDeflateOptions { get; set; }
```

Gets or sets the options for the per-message-deflate extension.
When present, the options are sent to the server during the handshake phase. If the server supports per-message-deflate and the options are accepted, the `WebSocket` instance will be created with compression enabled by default for all messages. Be aware that enabling compression makes the application subject to CRIME/BREACH type of attacks.
It is strongly advised to turn off compression when sending data containing secrets by specifying `WebSocketMessageFlags.DisableCompression` flag for such messages.

Returns: To be added.

To be added.

## ClientWebSocketOptions.HttpVersion property

```csharp
public Version HttpVersion { get; set; }
```

Gets or sets the HTTP version to use.

Returns: The HTTP message version. The default value is `1.1`.

To be added.

## ClientWebSocketOptions.HttpVersionPolicy property

```csharp
public System.Net.Http.HttpVersionPolicy HttpVersionPolicy { get; set; }
```

Gets or sets the policy that determines how `ClientWebSocketOptions.HttpVersion` is interpreted and how the final HTTP version is negotiated with the server.

Returns: The version policy used when the HTTP connection is established.

To be added.

## ClientWebSocketOptions.KeepAliveInterval property

```csharp
public TimeSpan KeepAliveInterval { get; set; }
```

Gets or sets the WebSocket protocol keep-alive interval.

Returns: The WebSocket protocol keep-alive interval.

To be added.

## ClientWebSocketOptions.KeepAliveTimeout property

```csharp
public TimeSpan KeepAliveTimeout { get; set; }
```

The timeout to use when waiting for the peer's PONG in response to us sending a PING; or `TimeSpan.Zero` or `Timeout.InfiniteTimeSpan` to disable waiting for peer's response, and use an unsolicited PONG as a Keep-Alive heartbeat instead.

The default is `Timeout.InfiniteTimeSpan`.

Returns: To be added.

To be added.

## ClientWebSocketOptions.Proxy property

```csharp
public System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets the proxy for WebSocket requests.

Returns: The proxy for WebSocket requests.

To be added.

## ClientWebSocketOptions.RemoteCertificateValidationCallback property

```csharp
public System.Net.Security.RemoteCertificateValidationCallback? RemoteCertificateValidationCallback { get; set; }
```

Gets or sets the callback to validate a server certificate.

Returns: A callback function to validate the server certificate.

To be added.

## ClientWebSocketOptions.UseDefaultCredentials <example-value>

```csharp
public bool UseDefaultCredentials { get; set; }
```

Gets or sets a `Boolean` value that indicates if default credentials <example-value> be used during WebSocket handshake.

Returns: `true` if default credentials <example-value> be used during WebSocket handshake; otherwise, `false`. The default is `true`.

To be added.

## ClientWebSocketOptions.AddSubProtocol(String) method

```csharp
public void AddSubProtocol (string subProtocol);
```

Adds a sub-protocol to be negotiated during the WebSocket connection handshake.

Parameters:

- `subProtocol`: The WebSocket sub-protocol to add.

To be added.

## ClientWebSocketOptions.SetBuffer(Int32, Int32) method

```csharp
public void SetBuffer (int receiveBufferSize, int sendBufferSize);
```

Sets the client buffer parameters.

Parameters:

- `receiveBufferSize`: The size, in bytes, of the client receive buffer.
- `sendBufferSize`: The size, in bytes, of the client send buffer.

To be added.

## ClientWebSocketOptions.SetBuffer(Int32, Int32, Byte>) method

```csharp
public void SetBuffer (int receiveBufferSize, int sendBufferSize, ArraySegment<byte> buffer);
```

Sets client buffer parameters.

Parameters:

- `receiveBufferSize`: The size, in bytes, of the client receive buffer.
- `sendBufferSize`: The size, in bytes, of the client send buffer.
- `buffer`: The receive buffer to use.

To be added.

## ClientWebSocketOptions.SetRequestHeader(String, String) method

```csharp
public void SetRequestHeader (string headerName, string? headerValue);
```

Creates a HTTP request header and its value.

Parameters:

- `headerName`: The name of the HTTP header.
- `headerValue`: The value of the HTTP header.

To be added.
