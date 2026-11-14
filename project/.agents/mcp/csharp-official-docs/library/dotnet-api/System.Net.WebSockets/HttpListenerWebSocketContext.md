---
title: "HttpListenerWebSocketContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/HttpListenerWebSocketContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerWebSocketContext class

Namespace: `System.Net.WebSockets`

```csharp
public class HttpListenerWebSocketContext : System.Net.WebSockets.WebSocketContext
```

Provides access to information received by the `HttpListener` class when accepting WebSocket connections.

To be added.

## HttpListenerWebSocketContext.CookieCollection property

```csharp
public override System.Net.CookieCollection CookieCollection { get; }
```

Gets the cookies received by the `HttpListener` object in the WebSocket opening handshake.

Returns: The cookies received by the `HttpListener` object.

To be added.

## HttpListenerWebSocketContext.Headers property

```csharp
public override System.Collections.Specialized.NameValueCollection Headers { get; }
```

Gets the HTTP headers received by the `HttpListener` object in the WebSocket opening handshake.

Returns: The HTTP headers received by the `HttpListener` object.

To be added.

## HttpListenerWebSocketContext.IsAuthenticated property

```csharp
public override bool IsAuthenticated { get; }
```

Gets a value that indicates if the WebSocket client is authenticated.

Returns: `true` if the WebSocket client is authenticated; otherwise, `false`.

To be added.

## HttpListenerWebSocketContext.IsLocal property

```csharp
public override bool IsLocal { get; }
```

Gets a value that indicates if the WebSocket client connected from the local machine.

Returns: `true` if the WebSocket client connected from the local machine; otherwise, `false`.

To be added.

## HttpListenerWebSocketContext.IsSecureConnection property

```csharp
public override bool IsSecureConnection { get; }
```

Gets a value that indicates if the WebSocket connection is secured using Secure Sockets Layer (SSL).

Returns: `true` if the WebSocket connection is secured using SSL; otherwise, `false`.

To be added.

## HttpListenerWebSocketContext.Origin property

```csharp
public override string Origin { get; }
```

Gets the value of the Origin HTTP header included in the WebSocket opening handshake.

Returns: The value of the Origin HTTP header.

To be added.

## HttpListenerWebSocketContext.RequestUri property

```csharp
public override Uri RequestUri { get; }
```

Gets the URI requested by the WebSocket client.

Returns: The URI requested by the WebSocket client.

To be added.

## HttpListenerWebSocketContext.SecWebSocketKey <example-value>

```csharp
public override string SecWebSocketKey { get; }
```

Gets the value of the SecWebSocketKey HTTP header included in the WebSocket opening handshake.

Returns: The value of the SecWebSocketKey HTTP header.

To be added.

## HttpListenerWebSocketContext.SecWebSocketProtocols property

```csharp
public override System.Collections.Generic.IEnumerable<string> SecWebSocketProtocols { get; }
```

Gets the list of the Secure WebSocket protocols included in the WebSocket opening handshake.

Returns: The list of the Secure WebSocket protocols.

To be added.

## HttpListenerWebSocketContext.SecWebSocketVersion property

```csharp
public override string SecWebSocketVersion { get; }
```

Gets the list of sub-protocols requested by the WebSocket client.

Returns: The list of sub-protocols requested by the WebSocket client.

To be added.

## HttpListenerWebSocketContext.User property

```csharp
public override System.Security.Principal.IPrincipal User { get; }
```

Gets an object used to obtain identity, authentication information, and security roles for the WebSocket client.

Returns: The identity, authentication information, and security roles for the WebSocket client.

To be added.

## HttpListenerWebSocketContext.WebSocket property

```csharp
public override System.Net.WebSockets.WebSocket WebSocket { get; }
```

Gets the `WebSocket` instance used to send and receive data over the `WebSocket` connection.

Returns: The `WebSocket` instance used to send and receive data over the `WebSocket` connection.

To be added.
