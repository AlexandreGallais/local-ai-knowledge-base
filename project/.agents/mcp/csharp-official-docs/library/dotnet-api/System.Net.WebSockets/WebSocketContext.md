---
title: "WebSocketContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketContext class

Namespace: `System.Net.WebSockets`

```csharp
public abstract class WebSocketContext
```

Accesses information in the WebSocket handshake.

To be added.

## WebSocketContext.WebSocketContext() constructor

```csharp
protected WebSocketContext ();
```

Creates an instance of the `WebSocketContext` class.

To be added.

## WebSocketContext.CookieCollection property

```csharp
public abstract System.Net.CookieCollection CookieCollection { get; }
```

Gets the cookies that were passed to the server during the opening handshake.

Returns: Returns `CookieCollection`.

To be added.

## WebSocketContext.Headers property

```csharp
public abstract System.Collections.Specialized.NameValueCollection Headers { get; }
```

Gets the HTTP headers that were sent to the server during the opening handshake.

Returns: Returns `NameValueCollection`.

To be added.

## WebSocketContext.IsAuthenticated property

```csharp
public abstract bool IsAuthenticated { get; }
```

Gets a value that indicates whether the WebSocket client is authenticated.

Returns: `true` if the WebSocket client is authenticated; otherwise, `false`.

To be added.

## WebSocketContext.IsLocal property

```csharp
public abstract bool IsLocal { get; }
```

Gets a value that indicates whether the WebSocket client connected from the local machine.

Returns: `true` if the WebSocket client connected from the local machine; otherwise, `false`.

To be added.

## WebSocketContext.IsSecureConnection property

```csharp
public abstract bool IsSecureConnection { get; }
```

Gets a value that indicates whether the WebSocket connection is secured using Secure Sockets Layer (SSL).

Returns: `true` if the WebSocket connection is secured using SSL; otherwise, `false`.

To be added.

## WebSocketContext.Origin property

```csharp
public abstract string Origin { get; }
```

Gets the value of the Origin HTTP header included in the opening handshake.

Returns: The Origin HTTP header included in the opening handshake.

To be added.

## WebSocketContext.RequestUri property

```csharp
public abstract Uri RequestUri { get; }
```

Gets the URI requested by the WebSocket client.

Returns: The URI requested by the WebSocket client.

To be added.

## WebSocketContext.SecWebSocketKey <example-value>

```csharp
public abstract string SecWebSocketKey { get; }
```

Gets the value of the SecWebSocketKey HTTP header included in the opening handshake.

Returns: The value of the SecWebSocketKey HTTP header included in the opening handshake.

To be added.

## WebSocketContext.SecWebSocketProtocols property

```csharp
public abstract System.Collections.Generic.IEnumerable<string> SecWebSocketProtocols { get; }
```

Gets the value of the SecWebSocketKey HTTP header included in the opening handshake.

Returns: Returns `IEnumerable<T>`.

To be added.

## WebSocketContext.SecWebSocketVersion property

```csharp
public abstract string SecWebSocketVersion { get; }
```

Gets the list of subprotocols requested by the WebSocket client.

Returns: The list of subprotocols requested by the WebSocket client.

To be added.

## WebSocketContext.User property

```csharp
public abstract System.Security.Principal.IPrincipal? User { get; }
```

Gets an object used to obtain identity, authentication information, and security roles for the WebSocket client.

Returns: An object used to obtain identity, authentication information, and security roles for the WebSocket client.

To be added.

## WebSocketContext.WebSocket property

```csharp
public abstract System.Net.WebSockets.WebSocket WebSocket { get; }
```

Gets the WebSocket instance used to interact (send/receive/close/etc) with the WebSocket connection.

Returns: The WebSocket instance used to interact (send/receive/close/etc) with the WebSocket connection.

To be added.
