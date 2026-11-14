---
title: "HttpListenerContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerContext class

Namespace: `System.Net`

```csharp
public sealed class HttpListenerContext
```

Provides access to the request and response objects used by the `HttpListener` class. This class cannot be inherited.

#### Remarks

This class provides the information related to a client's Hypertext Transfer Protocol (HTTP) request being processed by an `HttpListener` object. This class also has methods that allow an `HttpListener` object to accept a WebSocket connection.

The `HttpListener.GetContext` method returns instances of the `HttpListenerContext` class. To get the object that represents the client request, use the `Request` property. To get the object that represents the response that will be sent to the client by the `HttpListener`, use the `Response` property. To get user information about the client sending the request, such as its login name and whether it has been authenticated, you can query the properties in the `IPrincipal` object returned by the `User` property.

Closing an `HttpListenerContext` object sends the response to the client and frees any resources used by the `HttpListenerContext`. Aborting an `HttpListenerContext` object discards the response to the client if it has not already been sent, and frees any resources used by the `HttpListenerContext`. After closing or aborting an `HttpListenerContext` object, you cannot reference its methods or properties. If you do so, you will receive an `ObjectDisposedException` exception.

#### Examples
The following code example displays the user information for a client request.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerContext.Request property

```csharp
public System.Net.HttpListenerRequest Request { get; }
```

Gets the `HttpListenerRequest` that represents a client's request for a resource.

Returns: An `HttpListenerRequest` object that represents the client request.

#### Remarks
If you close this `HttpListenerContext`, it will send the response to the client, close the `HttpListenerResponse` that contains the response, and close the `HttpListenerRequest` object returned by this property.

#### Examples
The following code example demonstrates calling this method. The `listener` variable holds an `HttpListener` object.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerContext.Response property

```csharp
public System.Net.HttpListenerResponse Response { get; }
```

Gets the `HttpListenerResponse` object that will be sent to the client in response to the client's request.

Returns: An `HttpListenerResponse` object used to send a response back to the client.

#### Remarks
Your application configures the response by setting properties in the `HttpListenerResponse` object returned by this property. After configuring the response, you send it to the client by closing the response, or by closing this `HttpListenerContext` object.

#### Examples
The following code example demonstrates getting the response to a client's request and adding the response body.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerContext.User property

```csharp
public System.Security.Principal.IPrincipal? User { get; }
```

Gets an object used to obtain identity, authentication information, and security roles for the client whose request is represented by this `HttpListenerContext` object.

Returns: An `IPrincipal` object that describes the client, or `null` if the `HttpListener` that supplied this `HttpListenerContext` does not require authentication.

#### Remarks
An `HttpListener` indicates that it requires authentication using the `AuthenticationSchemes` property or by specifying an `AuthenticationSchemeSelector` delegate using the `AuthenticationSchemeSelectorDelegate` property.

To determine the client's login name and authentication information, check the `Identity` property in the object returned by this property.

#### Examples
The following code example demonstrates accessing identity and authentication information about the client, and returning it to the client in the response.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerContext.AcceptWebSocketAsync(String) method

```csharp
public System.Threading.Tasks.Task<System.Net.WebSockets.HttpListenerWebSocketContext> AcceptWebSocketAsync (string? subProtocol);
```

Accepts a WebSocket connection as an asynchronous operation.

Parameters:

- `subProtocol`: The supported WebSocket sub-protocol.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `HttpListenerWebSocketContext` object.

Exceptions:

- `ArgumentException`: `subProtocol` is an empty string

-or-

`subProtocol` contains illegal characters.
- `WebSocketException`: An error occurred when sending the response to complete the WebSocket handshake.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the WebSocket connection has been accepted.

The size of the receive buffer is 16,385 bytes. The WebSocket keep-alive interval is set to the default value of 30,000 (30 seconds).

## HttpListenerContext.AcceptWebSocketAsync(String, TimeSpan) method

```csharp
public System.Threading.Tasks.Task<System.Net.WebSockets.HttpListenerWebSocketContext> AcceptWebSocketAsync (string? subProtocol, TimeSpan keepAliveInterval);
```

Accepts a WebSocket connection specifying the supported WebSocket sub-protocol  and WebSocket keep-alive interval as an asynchronous operation.

Parameters:

- `subProtocol`: The supported WebSocket sub-protocol.
- `keepAliveInterval`: The WebSocket protocol keep-alive interval in milliseconds.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `HttpListenerWebSocketContext` object.

Exceptions:

- `ArgumentException`: `subProtocol` is an empty string

-or-

`subProtocol` contains illegal characters.
- `ArgumentOutOfRangeException`: `keepAliveInterval` is too small.
- `WebSocketException`: An error occurred when sending the response to complete the WebSocket handshake.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the WebSocket connection has been accepted.

The size of the receive buffer is 16,385 bytes.

## HttpListenerContext.AcceptWebSocketAsync(String, Int32, TimeSpan) method

```csharp
public System.Threading.Tasks.Task<System.Net.WebSockets.HttpListenerWebSocketContext> AcceptWebSocketAsync (string? subProtocol, int receiveBufferSize, TimeSpan keepAliveInterval);
```

Accepts a WebSocket connection specifying the supported WebSocket sub-protocol, receive buffer size, and WebSocket keep-alive interval as an asynchronous operation.

Parameters:

- `subProtocol`: The supported WebSocket sub-protocol.
- `receiveBufferSize`: The receive buffer size in bytes.
- `keepAliveInterval`: The WebSocket protocol keep-alive interval in milliseconds.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `HttpListenerWebSocketContext` object.

Exceptions:

- `ArgumentException`: `subProtocol` is an empty string

-or-

`subProtocol` contains illegal characters.
- `ArgumentOutOfRangeException`: `keepAliveInterval` is too small.

-or-

`receiveBufferSize` is less than 16 bytes

-or-

`receiveBufferSize` is greater than 64K bytes.
- `WebSocketException`: An error occurred when sending the response to complete the WebSocket handshake.

#### Remarks
This operation will not block. The returned `Task<T>` > object will complete after the WebSocket connection has been accepted.

## HttpListenerContext.AcceptWebSocketAsync(String, Int32, TimeSpan, Byte>) method

```csharp
public System.Threading.Tasks.Task<System.Net.WebSockets.HttpListenerWebSocketContext> AcceptWebSocketAsync (string? subProtocol, int receiveBufferSize, TimeSpan keepAliveInterval, ArraySegment<byte> internalBuffer);
```

Accepts a WebSocket connection specifying the supported WebSocket sub-protocol, receive buffer size, WebSocket keep-alive interval, and the internal buffer as an asynchronous operation.

Parameters:

- `subProtocol`: The supported WebSocket sub-protocol.
- `receiveBufferSize`: The receive buffer size in bytes.
- `keepAliveInterval`: The WebSocket protocol keep-alive interval in milliseconds.
- `internalBuffer`: An internal buffer to use for this operation.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `HttpListenerWebSocketContext` object.

Exceptions:

- `ArgumentException`: `subProtocol` is an empty string

-or-

`subProtocol` contains illegal characters.
- `ArgumentOutOfRangeException`: `keepAliveInterval` is too small.

-or-

`receiveBufferSize` is less than 16 bytes

-or-

`receiveBufferSize` is greater than 64K bytes.
- `WebSocketException`: An error occurred when sending the response to complete the WebSocket handshake.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the WebSocket connection has been accepted.
