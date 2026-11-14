---
title: "SocketsHttpHandler class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/SocketsHttpHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketsHttpHandler class

Namespace: `System.Net.Http`

```csharp
public sealed class SocketsHttpHandler : System.Net.Http.HttpMessageHandler
```

Provides the default message handler used by `HttpClient`.

The `SocketsHttpHandler` class provides the implementation used by higher-level HTTP networking classes such as `HttpClient`. The use of `SocketsHttpHandler` offers a number of advantages:

- A significant performance improvement when compared with the previous implementation.
- The elimination of platform dependencies, which simplifies deployment and servicing. For example, `libcurl` is no longer a dependency on .NET for macOS and Linux.
- Consistent behavior across all .NET platforms.

## SocketsHttpHandler.SocketsHttpHandler() constructor

```csharp
public SocketsHttpHandler ();
```

Creates an instance of a `SocketsHttpHandler` class.

To be added.

## SocketsHttpHandler.ActivityHeadersPropagator property

```csharp
public System.Diagnostics.DistributedContextPropagator? ActivityHeadersPropagator { get; set; }
```

Gets or sets the propagator to use when propagating the distributed trace and context.
Use `null` to disable propagation.

Returns: The default is `DistributedContextPropagator.Current`.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.AllowAutoRedirect property

```csharp
public bool AllowAutoRedirect { get; set; }
```

Gets or sets a value that indicates whether the handler should follow redirection responses.

Returns: `true` if the handler should follow redirection responses; otherwise `false`. The default value is `true`.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
Set `SocketsHttpHandler.AllowAutoRedirect` to `true` if you want the handler to automatically follow HTTP redirection headers to the new location of the resource. The maximum number of redirections to follow is set by the `MaxAutomaticRedirections` property.

If `SocketsHttpHandler.AllowAutoRedirect` is set to `false`, all HTTP responses with an HTTP status code from 300 to 399 are returned to the application.

The Authorization header is cleared on auto-redirects and the handler automatically tries to re-authenticate to the redirected location. No other headers are cleared. In practice, this means that an application can't put custom authentication information into the Authorization header if it is possible to encounter redirection. Instead, the application must implement and register a custom authentication module.

If you are using cookies by specifically adding them to the `Headers` collection, these are not cleared when a redirect is followed, as the handler has no way of knowing what domain a cookie is allowed for. If you want to mimic browser behavior, use the `CookieContainer` class which allows you to specify the target domain for a cookie.

> **Note:**
>  The handler never follows a redirection from HTTPS to HTTP even if `SocketsHttpHandler.AllowAutoRedirect` is set to `true`.

## SocketsHttpHandler.AutomaticDecompression property

```csharp
public System.Net.DecompressionMethods AutomaticDecompression { get; set; }
```

Gets or sets the type of decompression method used by the handler for automatic decompression of the HTTP content response.

Returns: The type of decompression method used by the handler for automatic decompression of the HTTP content response.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
Automatic decompression works only on the top most compression. So if the content is compressed multiple times, only the last compression will be decompressed.
For example, for a response with `Content-Encoding: gzip, br` header that contains content first compressed with gzip and then with Brotli, the content will only be decompressed using Brotli, leaving the still gzipped content in the `Content`.

Setting automatic decompression to anything other than `None` will result in adding `Accept-Encoding` header with the set values into every outgoing `HttpRequestMessage`.

## SocketsHttpHandler.ConnectCallback property

```csharp
public Func<System.Net.Http.SocketsHttpConnectionContext,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<System.IO.Stream>>? ConnectCallback { get; set; }
```

Gets or sets a custom callback used to open new connections.

Returns: A callback method to create a stream.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks

This callback applies only to `Stream` based connections, e.g. HTTP/1.1 and HTTP/2. It is not invoked for HTTP/3 connections that are based on `QuicConnection`.

#### Examples

The following code example sets TCP `KeepAlive` on the underlying `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Http/SocketsHttpHandler/ConnectCallback/program.cs._
## SocketsHttpHandler.ConnectTimeout property

```csharp
public TimeSpan ConnectTimeout { get; set; }
```

Gets or sets the timespan to wait before the connection establishing times out.

Returns: The timespan to wait before the connection establishing times out. The default value is `Timeout.InfiniteTimeSpan`.

Exceptions:

- `ArgumentOutOfRangeException`: The timeout specified is less than or equal to zero and is not `Timeout.InfiniteTimeSpan`

-or-

The timeout specified is greater than `Int32.MaxValue` milliseconds.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.CookieContainer property

```csharp
public System.Net.CookieContainer CookieContainer { get; set; }
```

Gets or sets the managed cookie container object.

Returns: The managed cookie container object.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.Credentials <example-value>

```csharp
public System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets authentication information used by this handler.

Returns: The authentication credentials <example-value> with the handler. The default value is `null`.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.DefaultProxyCredentials <example-value>

```csharp
public System.Net.ICredentials? DefaultProxyCredentials { get; set; }
```

When the default (system) proxy is used, gets or sets the credentials used to submit to the default proxy server for authentication.

Returns: The credentials used to authenticate the user to an authenticating proxy.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

The default proxy is used only when `UseProxy` is set to `true` and `Proxy` is set to `null`.

## SocketsHttpHandler.EnableMultipleHttp2Connections property

```csharp
public bool EnableMultipleHttp2Connections { get; set; }
```

Gets or sets a value that indicates whether additional HTTP/2 connections can be established to the same server.

Returns: `true` if additional HTTP/2 connections are allowed to be created; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

Enabling multiple connections to the same server explicitly goes against RFC 9113 - HTTP/2.

## SocketsHttpHandler.EnableMultipleHttp3Connections property

```csharp
public bool EnableMultipleHttp3Connections { get; set; }
```

Gets or sets a value that indicates whether additional HTTP/3 connections can be established to the same server.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

Enabling multiple connections to the same server explicitly goes against RFC 9114 - HTTP/3.

## SocketsHttpHandler.Expect100ContinueTimeout property

```csharp
public TimeSpan Expect100ContinueTimeout { get; set; }
```

Gets or sets the time-out value for server HTTP 100 Continue response.

Returns: The timespan to wait for the HTTP 100 Continue. The default value is 1 second.

Exceptions:

- `ArgumentOutOfRangeException`: The timeout specified is less than or equal to zero and is not `Timeout.InfiniteTimeSpan`

-or-

The timeout specified is greater than `Int32.MaxValue` milliseconds.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
When request contain `Expect: 100-continue` header the server should respond HTTP status `100 Continue` before the client sends the body. `SocketsHttpHandler.Expect100ContinueTimeout` define the timeout for the `100 Continue` server response.

## SocketsHttpHandler.InitialHttp2MaxConcurrentStreams property

```csharp
public int InitialHttp2MaxConcurrentStreams { get; set; }
```

To be added.

Returns: To be added.

To be added.

## SocketsHttpHandler.InitialHttp2StreamWindowSize property

```csharp
public int InitialHttp2StreamWindowSize { get; set; }
```

Defines the initial HTTP2 stream receive window size for all connections opened by the this `SocketsHttpHandler`.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: The provided window size is outside of the supported range.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks

Larger the values may lead to faster download speed, but potentially higher memory footprint.
The property must be set to a value between 65535 and the configured maximum window size, which is 16777216 by default.

## SocketsHttpHandler.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether the handler is supported on the current platform.

Returns: `true` if the handler is supported; otherwise, `false`.

To be added.

## SocketsHttpHandler.KeepAlivePingDelay property

```csharp
public TimeSpan KeepAlivePingDelay { get; set; }
```

Gets or sets the keep alive ping delay.

Returns: The keep alive ping delay. Defaults to `Timeout.InfiniteTimeSpan`.

Exceptions:

- `ArgumentOutOfRangeException`: The provided value is smaller than 1 second and is not `Timeout.InfiniteTimeSpan`

-or-

The provided value is greater than `Int32.MaxValue` milliseconds.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks

The client will send a keep alive ping to the server if it doesn't receive any frames on a connection for this period of time. This property is used together with `KeepAlivePingTimeout` to check whether the connection is broken.

Delay value must be greater than or equal to 1 second. Set to `InfiniteTimeSpan` to disable the keep alive ping.

## SocketsHttpHandler.KeepAlivePingPolicy property

```csharp
public System.Net.Http.HttpKeepAlivePingPolicy KeepAlivePingPolicy { get; set; }
```

Gets or sets the keep alive ping behaviour.

Returns: The keep alive ping behaviour.

Exceptions:

- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
Keep alive pings are sent when a period of inactivity exceeds the configured `KeepAlivePingDelay` value.

## SocketsHttpHandler.KeepAlivePingTimeout property

```csharp
public TimeSpan KeepAlivePingTimeout { get; set; }
```

Gets or sets the keep alive ping timeout.

Returns: The keep alive ping timeout. Defaults to 20 seconds.

Exceptions:

- `ArgumentOutOfRangeException`: The provided value is smaller than 1 second and is not `Timeout.InfiniteTimeSpan`

-or-

The provided value is greater than `Int32.MaxValue` milliseconds.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

#### Remarks
Keep alive pings are sent when a period of inactivity exceeds the configured `KeepAlivePingDelay` value. The client will close the connection if it doesn't receive any frames within the timeout.

Timeout must be greater than or equal to 1 second. Set to `InfiniteTimeSpan` to disable the keep alive ping timeout.

## SocketsHttpHandler.MaxAutomaticRedirections property

```csharp
public int MaxAutomaticRedirections { get; set; }
```

Gets or sets the maximum number of allowed HTTP redirects.

Returns: The maximum number of allowed HTTP redirects.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than or equal to zero.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

To be added.

## SocketsHttpHandler.MaxConnectionsPerServer property

```csharp
public int MaxConnectionsPerServer { get; set; }
```

Gets or sets the maximum number of simultaneous TCP connections allowed to a single server.

Returns: The maximum number of simultaneous TCP connections allowed to a single server.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than or equal to zero.
- `InvalidOperationException`: An operation has already been started on the current instance.
- `ObjectDisposedException`: The current instance has been disposed.

In this context, server means a unique combination of

- IDN host name (as used in the request URI)
- Port
- Value of the Host HTTP header (if present, e.g. when HTTPS is used)
- URI of the HTTP Proxy (if proxy is used).
